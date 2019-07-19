export declare class Infrastructure {
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
  constructor();
  initInfrastructure(basePath: string, sessionID: string, programName: string);
}

export declare const Errors;
export declare const Exceptions;
export declare const infrastructure: Infrastructure;
