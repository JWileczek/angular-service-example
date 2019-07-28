import {ContextManagerService} from './ContextManager.service';
import {Context} from './Context';

export abstract class ContextProvider {
  protected context: Context | Array<Context>;
  protected contextManager: ContextManagerService;

  protected constructor(contextManager: ContextManagerService) {
    this.contextManager = contextManager;
  }
}
