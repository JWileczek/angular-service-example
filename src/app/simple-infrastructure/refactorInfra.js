import * as Messages from "./messages.js";

export {Messages}

// Utility function to fully freeze potentially nested enums.
function deepFreeze(object) {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self
  for (let name of propNames) {
    const value = object[name];

    object[name] = value && typeof value === "object" ?
      deepFreeze(value) : value;
  }
  return Object.freeze(object);
}

export const Errors = {
  UNKNOWNERROR: -1,
  JSONERROR: 1,
  UNDEFINEDMESSAGE: 2,
  NODATA: 3,
  INVALIDMESSAGEFORMAT: 4,
  DISCONNECTION: 5,
  ServletErrors: {
    UNKNOWN_ERROR: 1000,
    INFRASTRUCTURE_ERROR: 1001,
    ECLIPSE_INTERFACE_ERROR: 1002,
    SERVLET_ENVIRONMENT_ERROR: 1003
  }
};
deepFreeze(Errors);

export const Exceptions = {
  UNKNOWNERROR:
    {
      errorText: "Unknown Error",
      toString: function () {
        return "Unknown Error";
      },
      errorCode: Errors.UNKNOWNERROR
    },
  JSONERROR:
    {
      errorText: "JSON Converstion Error!",
      toString: function () {
        return "JSON Converstion Error!";
      },
      errorCode: Errors.JSONERROR
    },
  UNDEFINEDMESSAGE:
    {
      errorText: "Undefined Message Type!",
      toString: function () {
        return "Undefined Message Type!";
      },
      errorCode: Errors.UNDEFINEDMESSAGE
    },
  NODATA:
    {
      errorText: "Data Field was empty!",
      toString: function () {
        return "Data Field was empty!";
      },
      errorCode: Errors.NODATA
    },
  INVALIDMESSAGEFORMAT:
    {
      errorText: "Invalid Message Format!",
      toString: function () {
        return "Invalid Message Format!";
      },
      errorCode: Errors.INVALIDMESSAGEFORMAT
    },
  DISCONNECTION:
    {
      errorText: "The connection to the server has been lost! No further Updates will be Processed.",
      toString: function () {
        return "The connection to the server has been lost! No further Updates will be Processed.";
      },
      errorCode: Errors.INVALIDMESSAGEFORMAT
    }
};
deepFreeze(Exceptions);

export class Infrastructure {
  constructor() {
    this.clientID = "";
    this.programName = "";
    this.amqUri = "";
    this.subscriptions = [];
    this.listeners = [];
    this.initialized = [];
    this.knownServlets = 0;
    this.pollTimer = false;
    this.debug = false;
    this.connected = false;
    this.serverConnected = true;
    this.evalCallback = null;
    this.errorHandler = null;
  }

  initInfrastructure(basePath, sessionID, programName) {
    this.clientID = sessionID;
    this.programName = programName;
    var now = new Date().getTime();
    this.amqUri = basePath + "/amq/;jsessionid=" + sessionID + "?clientId=" + sessionID + now;
  }

  static getDownloadLocation(loc, ipOffset, domainSufix) {
    var ipRE = new RegExp("(://)([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)([0-9]{1,3})([^/]*)/");
    var locClone = "" + loc;
    if (ipRE.test(loc)) {
      var locArray = locClone.split(ipRE);
      var domainArray = locArray.slice(0, 5);
      if (ipOffset) {
        domainArray[3] = (parseInt(domainArray[3]) + ipOffset);
      }
      return domainArray.join("");
    } else {
      var dnsRE = new RegExp("(://)([^/^:^.]*)([^/]*)(/)");
      var locArray = locClone.split(dnsRE).slice(0, 4);

      if (domainSufix) {
        locArray[2] = locArray[2] + domainSufix;
      }
      return locArray.join("");
    }
  }

  stopPollTimer() {
    if (this.pollTimer !== false) {
      clearTimeout(this.pollTimer);
    }
  }

  startPollTimer() {
    this.stopPollTimer();
    var self = this;
    this.pollTimer = setTimeout("self.handlePollTimeOut();", 120000);
  }

  handlePollTimeOut() {
    // Removing this as part of PCR 18368 - This seems to not get reset correctly causing
    // popups over and over while actively connected.  Removing this gets rid of them, and
    // all existing failure conditions (killing web server, disconnecting workstation network
    // still works, so it seems like this is not needed
    //Infrastructure.serverConnected=false;
    //Infrastructure.generateTransportErrorPrompt();
    //Infrastructure.stop();
  }

  generateTransportErrorPrompt() {
    if (confirm("The connection to the server has been lost or become unresponsive.\nRefresh the page to reestablish connection?")) {
      location.reload(true);
    } else {
    }
  }

  /**
   * Add a function that will be called every time an activeMQ response comes back from the server
   * NOTE: that there is no funtionality to remove this handler
   * @param        function that will be called on every poll from to the server
   * @author            Michael Dehmlow
   * @throws       UnknownException
   */
  addPollHandler(func) {
    try {
      amq.addPollHandler(func);
    } catch (e) {
      throw {
        errorCode: Errors.UNKNOWNERROR,
        toString: function () {
          return e.toString();
        }
      };
    }
  }

  /**
   * Evaluate a JSON string into a var
   * @param         JSON text to be converted to a javascript var
   * @return       Converted var with parameters from server
   * @author            Michael Dehmlow
   * @throws       async error
   */
  _evaluate(response, noCatch) {
    var evalJson;
    try {

      evalJson = eval("(" + response + ")");

    } catch (e) {
      if (noCatch)
        return;
      var eString = e.toString();
      var err =
        {
          toString: function () {
            return eString;
          },
          errorCode: Errors.JSONERROR
        }
      this._errror(err);
    }
    return evalJson;
  }

  /**
   * Private method used to send a non synchronous Message
   * @param destination URL of message normally contained in the message
   * @param destination Message var of the message that is to be sent (will be converted to json)
   * @param destination function that will be executed on the completion of this request
   * @return            new activeMQ connection
   * @author            Michael Dehmlow
   * @throws         Sync Error/Async Error
   */
  _sendMessage(id, destination, jsontext, callback, reply, noEval) {

    if (Messages.IDS.LOGOUT == id) {
      this.LoggedOut = true;
    }

    if (noEval == true) {
      evalCallback = callback;
    } else {
      var self = this;
      var evalCallback = function (response) {

        if (response != null) {
          var json = response.firstChild.nodeValue;
        } else {
          self._errror(Errors.UNDEFINEDMESSAGE);
        }
        var evaledJSON = this._evaluate(json);
        if (evaledJSON != null)
          callback(evaledJSON);
      }
    }
    var params = "type=Message&id=" + id + "&destination=" + destination + "&replyTo=" + reply + "&data=" + jsontext;

    if (this.errorHandler != null)
      new Ajax.Request(destination, {
        method: 'post',
        postBody: params,
        onSuccess: evalCallback,
        onFailure: this.errorHandler,
        asynchronous: true
      });
    else
      new Ajax.Request(destination, {
        method: 'post',
        postBody: params,
        onSuccess: evalCallback,
        asynchronous: true
      });

  }

  evalJson(jsonString) {
    var s = "";
    s += jsonString;
    return jsonString.evalJSON(true);
  }

  /**
   * Private method used to send a synchronous /blocking Messages
   * @param destination  URL of message normally contained in the message
   * @param message    Converted Json text of the var that was passed to sendMessage
   * @param callback  Function that will be executed on the completion of this request
   * @author             Michael Dehmlow
   * @throws          Sync Error/Async Error
   */
  _sendSyncMessage(id, destination, jsontext, callback, reply, noEval) {
    if (Messages.IDS.LOGOUT == id) {
      this.LoggedOut = true;
    }

    //Evaluate the returned text so that client doesnt have to  error handling in _evaluate.
    if (noEval == true) {
      var evalCallback = callback;
    } else {
      var self = this;
      var evalCallback = function (response) {

        if (response != null) {
          var json = response.responseText;
        } else {
          self._errror(Errors.UNDEFINEDMESSAGE);
        }
        var evaledJSON = this._evaluate(json);
        if (evaledJSON != null)
          callback(evaledJSON);
      }
    }
    var params = "type=Message&id=" + id + "&destination=" + destination + "&replyTo=" + reply + "&data=" + jsontext;

    if (this.errorHandler != null)
      new Ajax.Request(destination, {
        method: 'post',
        postBody: params,
        onSuccess: evalCallback,
        onFailure: this.errorHandler,
        asynchronous: false
      });
    else
      new Ajax.Request(destination, {
        method: 'post',
        postBody: params,
        onSuccess: evalCallback,
        asynchronous: false
      });

  }

  /**
   * Send a message to a to the url specified in the message
   *
   * @param         message js object of type message must have fields
   * @param             synchronized
   *
   * @author            Michael Dehmlow
   */
  sendMessage(message, synced, callback, noEval) {
    if (!this.connected) {
      if (this.debug === true)
        alert("Infrastructure is not connected");
      return;
    }
    if (message) {
      //turn var into json
      try {
        var jsontext = (Object.toJSON(message));
      } catch (e) {
        throw Exceptions.JSONERROR;
      }
      //end turn var into json
      if (message.destination != null && message.id != null) {
        if (!synced) {
          this._sendMessage(message.id, message.destination, jsontext, callback, message.replyTo, noEval);
        } else {
          this._sendSyncMessage(message.id, message.destination, jsontext, callback, message.replyTo, noEval);
        }
      } else {
        throw ({
          errorCode: Errors.INVALIDMESSAGEFORMAT,
          toString: function () {
            return "Invalid Message Format-- Message Must Have an ID and Destination";
          }
        });
      }
    } else {
      throw (Exceptions.INVALIDMESSAGEFORMAT());
    }
  }

  /**
   * Private method used to handle errors if no errorcode is specified errorCode of -1 unknown error is expressed
   * Note if the setErrorHandler funciton has not been called then an alert with the exception will occur
   * @param    e error should contain the field error code null will be passed with and erro code of -1
   * @author     Michael Dehmlow
   */
  _errror(e) {
    var err = e;
    this.stop();
    if (e.errorCode == null) {
      err =
        {
          toString: function () {
            return "Unknown Error"
          },
          errorCode: -1
        }
    }
    err.errorText = err.errorText + " ";
    if (this.errorHandler != null)
      this.errorHandler(err);
    else
      alert("Error:" + Object.toJSON(e));
  }

  /**
   * Add a listener to for a specific data group
   * Note:
   *
   * @param id    the message id NOTE MUST BE UNIQUE
   * @param topic    the topic
   * @param id    the message id NOTE MUST BE UNIQUE
   * @author            Michael Dehmlow
   */
  setListener(id, topic, handler) {
    var listenerObj = {'id': id, 'topic': topic, 'handler': handler};
    this.listeners.push(listenerObj);
    this.subscriptions[topic] = topic;
    var self = this;
    var evaluatedHandler = function (message) {
      var msgObj = self._evaluate(message);
      if (msgObj.id == Messages.IDS.SERVLET_ERROR) {
        self.stop();
      }
      handler(msgObj);
    };
    amq.addListener(id, ("topic://" + topic), evaluatedHandler);
  }

  resubscribe() {
    var listenersCopy = this.listeners.slice(0);
    this.listeners = [];
    for (var i = 0; i < listenersCopy.length; i++) {
      this.setListener(listenersCopy[i].id, listenersCopy[i].topic, listenersCopy[i].handler);
    }
  }

  /**
   * Remove all listeners froma a topic and send the client close connection message
   *
   * @author            Michael Dehmlow
   */
  disconnect(id, topic, handler) {
    this.setErrorHandler(function () {
    });


    for (var i = 0; i < this.subscriptions.size; i++) {
      //Note that the id does not matter in this case only the
      this.removeListener(1, this.subscriptions[i]);
    }
    for (var i = 0; i < this.initialized.length; i++) {
      //Note that the id does not matter in this case only the topic
      var m = new Messages.ClientCloseMsg(this.initialized[i], this.clientID);
      this.sendMessage(m, true, (function () {
      }));
    }
    if (this.debug === true) {
      if (!confirm("Do you want to close the window Now?"))
        return false;
    }
    this.connected = false;
  }

  stop() {
    //Note: This is a Javascript trick I'm simply overwritting the sendpoll function with false
    //if any polls are outstanding the next poll will be unable to initiate a new poll.
    amq.sendPoll = false;

    this.connected = false;
  }

  /**
   * Remove a listener from the id and topic
   * NOTE: By calling this method the callback for id is deleted AND
   *  the topic is unsubscribed
   *
   * @param         id      The id of the callback which is to be deleted
   * @param         topic   The topic which will be unlistened to
   * @author            Michael Dehmlow
   */
  removeListener(id, topic) {
    this.subscriptions.splice(topic);
    amq.removeListener(id, ("topic://" + topic));
  }

  /**
   * Sets the Error Handler for use when errors occur
   *
   * @param         handler    the funtion which should be called when an error occurs
   * @author            Michael Dehmlow
   */
  setErrorHandler(handler) {

    this.errorHandler = function (e) {
      if (e == null) {
        var error = {};
        error.errorCode = 0;
        error.errorText = "Unknown Error";
        try {
          if (this.pollTimer !== false) {
            clearTimeout(this.pollTimer);
          }
        } catch (e) {
        }
        handler(error);

      } else {
        try {
          if (this.pollTimer !== false) {
            clearTimeout(this.pollTimer);
          }
        } catch (e) {
        }

        handler(e);
      }
    }
  }

  connectionError() {
    this.serverConnected = false;
    this.generateTransportErrorPrompt();
    this.errorHandler(Exceptions.DISCONNECTION);
    this.stop();

  }

  /**
   * Connect to the infrastructure
   * NOTE: This method is not does nothing for
   *
   * @return            new activeMQ connection
   * @author            Michael Dehmlow
   */
  connect() {

    amq.init({
      uri: this.amqUri,
      logging: true,
      timeout: 20,
      pollDelay: 1,
      clientId: (new Date()).getTime().toString()
    });
    amq.setFailure(this.connectionError);
    this.connected = true;
    //amq._startPolling();
    //new Ajax.Request("ConnectionServlet", { method: 'get', onSuccess: connectCallback, onFailure: Infrastructure.errorHandler, asynchronous: false});

  }

  sendInitMessage(servletURL) {
    if (this.errorHandler != null)
      new Ajax.Request((servletURL + '?type=Init'), {
        method: 'get',
        onSuccess: this.evalCallback,
        onFailure: this.errorHandler,
        asynchronous: false
      });
    else
      new Ajax.Request((servletURL + '?type=Init'), {
        method: 'get',
        onSuccess: this.evalCallback,
        asynchronous: false
      });

  }

  /**
   * Remove a listener from the id and topic
   * NOTE: This method should be called before any communcation
   *
   * @param         servletURL      The Url of the servlet which needs to be initialized
   * @param         params     The parameters which will be sent to the servlet separated by & signs assigned using equals:
   *                  For example: 'ClientID=ClientID &message=messageText &type=typex'
   * @param         callback   The call back of a successful response:
   * @return            new activeMQ connection
   * @author            Michael Dehmlow
   */
  initialize(servletURL, callback) {
    this.initialized[this.knownServlets++] = servletURL;

    var self = this;
    this.evalCallback = function (response) {

      if (response != null) {
        var json = response.responseText;

        //fix because sometimes tomcat will return a "" on the first poll
        if ("" == json && self.retried == undefined) {
          self.retried = true;
          self.sendInitMessage(servletURL);
          return;
        }
        //end fix for tomcat bug.
      } else {
        self._errror(Errors.UNDEFINEDMESSAGE);
      }

      var evaledJSON = self._evaluate(json);

      if (evaledJSON != null)
        callback(evaledJSON);
    };

    this.sendInitMessage(servletURL);

    return "Message Sent";
  }

  /**
   * Request a list of files of a specific type from the server
   * NOTE: The call back to this method will be passed an array of updates not the original message
   *
   * @param         servletURL      The Url of the servlet which needs to be initialized
   * @param         callback   The call back of a successful response:
   * @param         type  the type of file which the client wants to recieve.
   * @param         path  the the path of the request may be a uri or a config name
   *                    in the case of history config filter file requests.
   * @return            void but for call back on sucessful response which will be passed an array of files
   * @author            Michael Dehmlow
   */
  RequestFileList(servletURL, callback, type, path) {

    var m = new Messages.FileListRequestMsg(servletURL, this.clientID, type, path);
    this.sendMessage(m, true, function (r) {
      if (r.id == Messages.IDS.IDS.FILE_LIST_RESPONSE) {
        callback(r.fileList);
      } else {
        throw r;
      }
    });
  }

  RtlInitRequest(servletURL, callback) {
    var m = new Messages.RtlInitRequestMsg(servletURL, this.clientID);
    this.sendMessage(m, true, function (r) {
      if (r.id == Messages.IDS.RTL_UPDATE) {
        callback(r);
      } else {
        throw r;
      }
    });
  }

  FswInitRequest(servletURL, callback) {
    var m = new Messages.FswInitRequestMsg(servletURL, this.clientID);
    this.sendMessage(m, true, function (r) {
      if (r.id == Messages.IDS.FSW_UPDATE) {
        callback(r);
      } else {
        throw r;
      }
    });
  }

  CecilInitRequest(servletURL, instanceType, instanceNum) {
    var m = new Messages.CecilInitRequestMsg(servletURL, this.clientID, instanceType, instanceNum);
    this.sendMessage(m, false, function (r) {
    });
  }

  CecilStopRequest(servletURL, instanceType, instanceNum) {
    var m = new Messages.CecilStopRequestMsg(servletURL, this.clientID, instanceType, instanceNum);
    this.sendMessage(m, false, function (r) {
    });
  }

  ShowMenu(event, callback, left, top) {

    if (document.getElementById("popupTabMenu") != null) {
      document.getElementById("popupTabMenu").remove();
    }

    var menu = document.createElement("div");
    menu.id = "popupTabMenu";
    menu.setAttribute('class', 'dropdownTabMenu');
    document.body.appendChild(menu);

    var popupTabMenu = document.getElementById("popupTabMenu");
    popupTabMenu.style.top = top + 'px';
    popupTabMenu.style.left = left + 'px';

    var aTLM = document.createElement('li');
    aTLM.id = "aTLM";
    aTLM.addEventListener("click", tabMenuClickAction);
    aTLM.setAttribute("clickAction", "tlm");
    aTLM.setAttribute("callback", callback);
    var textTLM = document.createTextNode("Open a Telemetry Page");
    aTLM.appendChild(textTLM);

    var aPlot = document.createElement('li');
    aPlot.id = "aPlot";
    aPlot.addEventListener("click", tabMenuClickAction);
    aPlot.setAttribute("clickAction", "plot");
    aPlot.setAttribute("callback", callback);
    var textPlot = document.createTextNode("Open a Plot");
    aPlot.appendChild(textPlot);

    var aMimic = document.createElement('li');
    aMimic.id = "aMimic";
    aMimic.addEventListener("click", tabMenuClickAction);
    aMimic.setAttribute("clickAction", "mimics");
    aMimic.setAttribute("callback", callback);
    var textMimic = document.createTextNode("Open a Mimics Display");
    aMimic.appendChild(textMimic);

    popupTabMenu.appendChild(aTLM);
    popupTabMenu.appendChild(aPlot);
    popupTabMenu.appendChild(aMimic);

    popupTabMenu.style.visibility = 'visible';
  }

  RequestDomFile(servletURL, callback, filename, type, dir)//path
  {
    if (!dir) {
      dir = "";
    }
    var filename_clean = encodeURIComponent(filename);

    var m = Messages.DomFileRequestMsg(servletURL, this.clientID, type, filename_clean, dir);
    var self = this;
    var breakpointcallback = function (m) {
      try {

        var json = m.responseText;
        var evaledJSON = self._evaluate(json, true);
        //what if the server wants to give us an error?:
        if (evaledJSON.id == 'SERVLET_ERROR') {
          self._errror(evaledJSON);
          return;
        }

      } catch (exception) {
        //everything went fine just checking for an error
      }
      callback(m);
    };
    this.sendMessage(m, true, breakpointcallback, true);
  }

  get Topics() {
    var ROOT = "ECLIPSE";
    var PROGRAM_NAME = this.programName;
    var DELIM = ".";
    return {
      buildDataGroup: function (base) {
        return ROOT + DELIM + PROGRAM_NAME + DELIM + base;
      },
      CONFIGURATION_STATUS_UPDATE: (ROOT + DELIM + PROGRAM_NAME + DELIM + "ConfigStatus" + DELIM + "ConfigurationList"),
      CLIENT_RESPOND_ID: (ROOT + DELIM + PROGRAM_NAME + DELIM + "Clients" + DELIM), //TODO add cookie getting action
      TRANSPORT_INTERRUPTED_TOPIC: "TransportInterruptedTopic"
    }//JSESSIONID
  }

}

// Handles the global use-case for Infrastructure class. Module code is only run once during first import of the module
// regardless of how many times it is imported. Other global libraries like D3 and lodash follow this same pattern.
export const infrastructure = new Infrastructure();
window.Infrastructure = {
  Messages,
  Infrastructure,
  infrastructure,
  Errors,
  Exceptions
};

// Alternatively just expose global variable to window.
//window.infrastructure = infrastructure;

