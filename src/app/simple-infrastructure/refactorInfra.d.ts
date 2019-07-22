import * as Messages from './messages';

export declare class Infrastructure {
  constructor();

  clientID: string;
  programName: string;
  amqUri: string;
  subscriptions: Array<any>;
  listeners: Array<any>;
  initialized: Array<any>;
  knownServlets: number;
  pollTimer: boolean;
  debug: boolean;
  connected: boolean;
  serverConnected: boolean;
  evalCallback: (response: any) => void;
  errorHandler: (e: any) => void;

  static getDownloadLocation(loc: string, ipOffset, domainSufix);
  initInfrastructure(basePath: string, sessionID: string, programName: string);

  sendInitMessage(servletURL: string);
  sendMessage(message: Messages.Message, synced: boolean, callback: any, noEval: boolean);
  setListener(id: string, topic: string, handler: any);

  setErrorHandler(handler: (e: any) => void);

  addPollHandler(func: any);

  private _evaluate(response: any, noCatch: boolean);

  private _sendMessage(id, destination, jsontext, callback, reply, noEval);

  private _sendSyncMessage(id, destination, jsontext, callback, reply, noEval);

  private _error(e: any);
}

export {Messages};
export declare const Errors;
export declare const Exceptions;
