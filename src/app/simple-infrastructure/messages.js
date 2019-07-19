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
  constructor(destination, replyTo, measurands, clientID) {
    super(IDS.MEASURAND_SUBSCRIBE_REQUEST, destination, replyTo);
    this.measurands = measurands;
    this.clientID = clientID;
  }
}

export class MeasurandDeSubscribeRequestMsg extends Message {
  constructor(destination, replyTo, measurands, clientID) {
    super(IDS.MEASURAND_DESUBSCRIBE_REQUEST, destination, replyTo);
    this.measurands = measurands;
    this.clientID = clientID;
  }
}

export class MeasurandAttributeUpdatesMsg extends Message {
  constructor(destination, replyTo, myupdates) {
    super(IDS.MEASURAND_ATTRIBUTE_UPDATE, destination, replyTo, clientID);
    this.myupdates = myupdates;
    this.clientID = clientID;
  }
}

export class HistoryRetrievalRequestMsg extends Message {
  constructor(destination, replyTo, mytype, myattributes, clientID) {
    super(IDS.HISTORY_RETREIVAL_REQUEST, destination, replyTo);
    this.mytype = mytype;
    this.myattributes = myattributes;
    this.clientID = clientID;
  }
}
