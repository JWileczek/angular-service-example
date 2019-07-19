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
  evalCallback: any;
  errorHandler: any;

  static getDownloadLocation(loc: string, ipOffset, domainSufix);

  initInfrastructure(basePath: string, sessionID: string, programName: string);

  sendMessage(message: Messages.Message, synced: boolean, callback: any, noEval: boolean);

  setListener(id: string, topic: string, handler: any);
}

export {Messages};
export declare const Errors;
export declare const Exceptions;
export declare const infrastructure: Infrastructure;
