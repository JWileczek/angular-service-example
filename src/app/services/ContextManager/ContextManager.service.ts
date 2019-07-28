import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Context, ContextState} from './Context';

@Injectable({
  providedIn: 'root'
})
export class ContextManagerService {
  private contexts = {};
  private defaultContext: BehaviorSubject<Context> = new BehaviorSubject(null);

  constructor() {
  }

  public registerContexts(contexts: Context | Context[]): void {
    if (Array.isArray(contexts)) {
      for (const context of contexts) {
        this.contexts[context.uniqueId] = context;
      }
    } else {
      this.contexts[contexts.uniqueId] = contexts;
    }
  }

  public setDefaultContext(contextId: string) {
    const context = this.contexts[contextId];
    if (context == null) {
      throw Error(`Context with Id: ${contextId} does not exist to set as default.`);
    }
    this.defaultContext.next(context);
  }

  public setState(contextId: string, state: ContextState) {
    const context = this.contexts[contextId];
    context.state = state;
    if (this.defaultContext.getValue() && this.defaultContext.getValue().uniqueId === contextId) {
      this.defaultContext.next(context);
    }
  }

  public getDefaultContext(): Observable<Context> {
    return this.defaultContext.asObservable();
  }

  public getContexts(): Context[] {
    return Object.values(this.contexts);
  }

}
