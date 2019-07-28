export enum ContextState {
  Online = 0 as number,
  Offline = 1 as number,
  Initializing = 2 as number,
}

export interface Context {
  readonly uniqueId: string;
  state: ContextState;
  // This is known as a index signature saying a context can have additional string properties that link to any data.
  // Alternatively you could create extended interfaces in each of the context providers fully describing data.
  [propName: string]: any;
}
