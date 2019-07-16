export declare let Infrastructure: {
  clientID: string;
  programName: string;
  amqUri: string;
  subscriptions: Array<any>;
  knownServlets: number;
  debug: boolean;
  initInfrastucture: (basePath: string, sessionID: string, programName: string) => void;
  // Add rest of exposed typed interface here
};
