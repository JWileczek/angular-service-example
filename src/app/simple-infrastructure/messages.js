export const IDS = {
  CONFIGURATIONSTATUSLIST: "CONFIGURATIONSTATUSLIST",
  SERVLET_ERROR: "SERVLET_ERROR",
  CLIENTCLOSE: "CLIENTCLOSE",
  LOGOUT: "LOGOUT",
  MEASURAND_SUBSCRIBE_REQUEST: "MEASURAND_SUBSCRIBE_REQUEST",
  MEASURAND_DESUBSCRIBE_REQUEST: "MEASURAND_DESUBSCRIBE_REQUEST",
  MEASURAND_ATTRIBUTE_UPDATE: "MEASURAND_ATTRIBUTE_UPDATE",
  DOM_FILE_REQUEST: "DOM_FILE_REQUEST",
  FILE_LIST_REQUEST: "FILE_LIST_REQUEST",
  FILE_LIST_RESPONSE: "FILE_LIST_RESPONSE",
  HISTORY_RETREIVAL_REQUEST: "HISTORY_RETREIVAL_REQUEST",
  FILE_UPDATE_MESSAGE: "FILE_UPDATE_MESSAGE",
  RTL_INIT_REQUEST: "RTL_INIT_REQUEST",
  RTL_UPDATE: "RTL_UPDATE",
  FSW_INIT_REQUEST: "FSW_INIT_REQUEST",
  FSW_UPDATE: "FSW_UPDATE",
  CECIL_PROC_OUTPUT_UPDATE: "CECIL_PROC_OUTPUT_UPDATE",
  CECIL_PROC_STATUS_UPDATE: "CECIL_PROC_STATUS_UPDATE",
  CECIL_KEYPRESS_UPDATE: "CECIL_KEYPRESS_UPDATE",
  CECIL_INIT_REQUEST: "CECIL_INIT_REQUEST",
  CECIL_LINE_STATUS_UPDATE: "CECIL_LINE_STATUS_UPDATE",
  CECIL_STOP_REQUEST: "CECIL_STOP_REQUEST",
  TRANSPORT_INTERRUPTED: "TRANSPORT_INTERRUPTED",
  TRANSPORT_INTERRUPTED_STP: "TRANSPORT_INTERRUPTED_STP",
};
Object.freeze(IDS);

export const MessageFactory = {
  _registeredTypes: new Map(),

  register(messageID, messageClass) {
    if (!(this._registeredTypes.has(messageID) && messageClass.prototype instanceof Message)) {
      this._registeredTypes.set(messageID, messageClass);
    } else {
      console.log(`Class for messageID: ${messageID} already registered with Factory.`);
    }
  },

  create(messageID, messagePayload) {
    if (!this._registeredTypes.has(messageID)) {
      console.error("Attempting to create undefined message!");
      return null;
    }
    let clazz = this._registeredTypes.get(messageID);
    return new clazz(...messagePayload);
  },
};
// A sealed object can't have any properties/methods added or removed
// Modifiable properties can still be used and changed however.
Object.seal(MessageFactory);

export class Message {
  constructor(id, destination, replyTo) {
    this.id = id;
    this.destination = destination;
    this.replyTo = replyTo;
  }
}

export class ConfigurationStatusListMsg extends Message {
  constructor(destination, replyTo, configurations) {
    super(
      IDS.CONFIGURATIONSTATUSLIST,
      destination,
      replyTo,
    );
    this.configurations = configurations;
  }
}

export class ServletErrorMsg extends Message {
  constructor(destination, replyTo, errorCode, errorMessage) {
    super(
      IDS.SERVLET_ERROR,
      destination,
      replyTo,
    );
    this._myMessage = errorMessage;
    this._myErrorCode = errorCode;
  }
}


export class ClientCloseMsg extends Message {
  constructor(destination, replyTo) {
    super(IDS.CLIENTCLOSE, destination, replyTo);
  }
}


export class LogoutMsg extends Message {
  constructor(destination, replyTo) {
    super(IDS.LOGOUT, destination, replyTo);
  }
}


export class RtlInitRequestMsg extends Message {
  constructor(destination, replyTo) {
    super(IDS.RTL_INIT_REQUEST, destination, replyTo);
  }
}


export class FswInitRequestMsg extends Message {
  constructor(destination, replyTo) {
    super(IDS.FSW_INIT_REQUEST, destination, replyTo);
  }
}


export class CecilInitRequestMsg extends Message {
  constructor(destination, replyTo, instanceType, instanceNum) {
    super(IDS.CECIL_INIT_REQUEST, destination, replyTo);
    this.instanceType = instanceType;
    this.instanceNum = instanceNum;
  }
}


export class CecilStopRequestMsg extends Message {
  constructor(destination, replyTo, instanceType, instanceNum) {
    super(IDS.CECIL_STOP_REQUEST, destination, replyTo);
    this.instanceType = instanceType;
    this.instanceNum = instanceNum;
  }
}


export class FileListRequestMsg extends Message {
  constructor(destination, replyTo, type, path) {
    super(IDS.FILE_LIST_REQUEST, destination, replyTo);
    this.type = type;
    this.path = path;
  }
}


export class DomFileRequestMsg extends Message {
  constructor(destination, replyTo, type, file, dir) {
    super(IDS.DOM_FILE_REQUEST, destination, replyTo);
    this.type = type;
    this.file = file;
    this.dir = dir;
  }
}


export class MeasurandSubscribeRequestMsg extends Message {
  constructor(destination, replyTo, measurands) {
    super(IDS.MEASURAND_SUBSCRIBE_REQUEST, destination, replyTo);
    this.measurands = measurands;
  }
}


export class MeasurandDeSubscribeRequestMsg extends Message {
  constructor(destination, replyTo, measurands) {
    super(IDS.MEASURAND_DESUBSCRIBE_REQUEST, destination, replyTo);
    this.measurands = measurands;
  }
}


export class MeasurandAttributeUpdatesMsg extends Message {
  constructor(destination, replyTo, myupdates) {
    super(IDS.MEASURAND_ATTRIBUTE_UPDATE, destination, replyTo);
    this.myupdates = myupdates;
  }
}


export class HistoryRetrievalRequestMsg extends Message {
  constructor(destination, replyTo, mytype, myattributes) {
    super(IDS.HISTORY_RETREIVAL_REQUEST, destination, replyTo);
    this.mytype = mytype;
    this.myattributes = myattributes;
  }
}


MessageFactory.register(IDS.SERVLET_ERROR, ServletErrorMsg);
MessageFactory.register(IDS.CLIENTCLOSE, ClientCloseMsg);
MessageFactory.register(IDS.CONFIGURATIONSTATUSLIST, ConfigurationStatusListMsg);
MessageFactory.register(IDS.RTL_INIT_REQUEST, RtlInitRequestMsg);
MessageFactory.register(IDS.LOGOUT, LogoutMsg);
MessageFactory.register(IDS.CECIL_INIT_REQUEST, CecilInitRequestMsg);
MessageFactory.register(IDS.FSW_INIT_REQUEST, FswInitRequestMsg);
MessageFactory.register(IDS.CECIL_STOP_REQUEST, CecilStopRequestMsg);
MessageFactory.register(IDS.FILE_LIST_REQUEST, FileListRequestMsg);
MessageFactory.register(IDS.DOM_FILE_REQUEST, DomFileRequestMsg);
MessageFactory.register(IDS.MEASURAND_SUBSCRIBE_REQUEST, MeasurandSubscribeRequestMsg);
MessageFactory.register(IDS.MEASURAND_DESUBSCRIBE_REQUEST, MeasurandDeSubscribeRequestMsg);
MessageFactory.register(IDS.MEASURAND_ATTRIBUTE_UPDATE, MeasurandAttributeUpdatesMsg);
MessageFactory.register(IDS.HISTORY_RETREIVAL_REQUEST, HistoryRetrievalRequestMsg);
