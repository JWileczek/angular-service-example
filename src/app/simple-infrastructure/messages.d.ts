export declare abstract class Message {
  id: string;
  destination: string;
  replyTo: string;

  protected constructor(id: string, destination: string, replyTo: string);
}

export declare class ConfigurationStatusListMsg extends Message {
  configurations: any;

  constructor(destination: string, replyTo: string, configurations: any);
}
