export const Messages = {
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
  TRANSPORT_INTERRUPTED_STP: "TRANSPORT_INTERRUPTED_STP"
};
Object.freeze(Messages);

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
    return new clazz(messagePayload);
  }
};
Object.seal(MessageFactory);

export class Message {
  constructor({id, destination, replyTo}) {
    this.id = id;
    this.destination = destination;
    this.replyTo = replyTo;
  }
}

export class ConfigurationStatusListMsg extends Message {
  constructor({destination, replyTo, configurations}) {
    super({
      id: Messages.CONFIGURATIONSTATUSLIST,
      destination,
      replyTo
    });
    this.configurations = configurations;
  }
}

MessageFactory.register(Messages.CONFIGURATIONSTATUSLIST, ConfigurationStatusListMsg);

export class ServletErrorMsg extends Message {
  constructor({destination, replyTo, errorCode, errorMessage}) {
    super({
      id: Messages.SERVLET_ERROR,
      destination,
      replyTo
    });
    this._myMessage = errorMessage;
    this._myErrorCode = errorCode;
  }
}

MessageFactory.register(Messages.SERVLET_ERROR, ServletErrorMsg);


export class ClientCloseMsg extends Message {
  constructor({destination, replyTo}) {
    super({
      id: Messages.CLIENTCLOSE,
      destination,
      replyTo
    });
  }
}

MessageFactory.register(Messages.CLIENTCLOSE, ClientCloseMsg);


export class LogoutMsg extends Message {
  constructor({destination, replyTo}) {
    super({
      id: Messages.LOGOUT,
      destination,
      replyTo
    });
  }
}

MessageFactory.register(Messages.LOGOUT, LogoutMsg);


export class RtlInitRequestMsg extends Message {
  constructor({destination, replyTo}) {
    super({
      id: Messages.RTL_INIT_REQUEST,
      destination,
      replyTo
    });
  }
}

MessageFactory.register(Messages.RTL_INIT_REQUEST, RtlInitRequestMsg);


export class FswInitRequestMsg extends Message {
  constructor({destination, replyTo}) {
    super({
      id: Messages.FSW_INIT_REQUEST,
      destination,
      replyTo
    });
  }
}

MessageFactory.register(Messages.FSW_INIT_REQUEST, FswInitRequestMsg);


export class CecilInitRequestMsg extends Message {
  constructor({destination, replyTo, instanceType, instanceNum}) {
    super({
      id: Messages.CECIL_INIT_REQUEST,
      destination,
      replyTo
    });
    this.instanceType = instanceType;
    this.instanceNum = instanceNum;
  }
}

MessageFactory.register(Messages.CECIL_INIT_REQUEST, CecilInitRequestMsg);


export class CecilStopRequestMsg extends Message {
  constructor({destination, replyTo, instanceType, instanceNum}) {
    super({
      id: Messages.CECIL_STOP_REQUEST,
      destination,
      replyTo
    });
    this.instanceType = instanceType;
    this.instanceNum = instanceNum;
  }
}

MessageFactory.register(Messages.CECIL_STOP_REQUEST, CecilStopRequestMsg);


export class FileListRequestMsg extends Message {
  constructor({destination, replyTo, type, path}) {
    super({
      id: Messages.FILE_LIST_REQUEST,
      destination,
      replyTo
    });
    this.type = type;
    this.path = path;
  }
}

MessageFactory.register(Messages.FILE_LIST_REQUEST, FileListRequestMsg);


export class DomFileRequest extends Message {
  constructor({destination, replyTo, type, file, dir}) {
    super({
      id: Messages.DOM_FILE_REQUEST,
      destination,
      replyTo
    });
    this.type = type;
    this.file = file;
    this.dir = dir;
  }
}

MessageFactory.register(Messages.DOM_FILE_REQUEST, DomFileRequest);


export class MeasurandSubscribeRequestMsg extends Message {
  constructor({destination, replyTo, measurands}) {
    super({
      id: Messages.MEASURAND_SUBSCRIBE_REQUEST,
      destination,
      replyTo
    });
    this.measurands = measurands;
  }
}

MessageFactory.register(Messages.MEASURAND_SUBSCRIBE_REQUEST, MeasurandSubscribeRequestMsg);


export class MeasurandDeSubscribeRequestMsg extends Message {
  constructor({destination, replyTo, measurands}) {
    super({
      id: Messages.MEASURAND_DESUBSCRIBE_REQUEST,
      destination,
      replyTo
    });
    this.measurands = measurands;
  }
}

MessageFactory.register(Messages.MEASURAND_DESUBSCRIBE_REQUEST, MeasurandDeSubscribeRequestMsg);


export class MeasurandAttributeUpdatesMsg extends Message {
  constructor({destination, replyTo, myupdates}) {
    super({
      id: Messages.MEASURAND_ATTRIBUTE_UPDATE,
      destination,
      replyTo
    });
    this.myupdates = myupdates;
  }
}

MessageFactory.register(Messages.MEASURAND_ATTRIBUTE_UPDATE, MeasurandAttributeUpdatesMsg);


export class HistoryRetrievalRequestMsg extends Message {
  constructor({destination, replyTo, mytype, myattributes}) {
    super({
      id: Messages.HISTORY_RETREIVAL_REQUEST,
      destination,
      replyTo
    });
    this.mytype = mytype;
    this.myattributes = myattributes;
  }
}

MessageFactory.register(Messages.HISTORY_RETREIVAL_REQUEST, HistoryRetrievalRequestMsg);

