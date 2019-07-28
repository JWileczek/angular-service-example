import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Context, ContextState} from './Context';

@Injectable({
  providedIn: 'root'
})
export class ContextManagerService {
  private contexts: { [propName: string]: BehaviorSubject<Context> } = {};
  private defaultContext: BehaviorSubject<Context> = new BehaviorSubject(null);

  constructor() {
  }

  public registerContexts(contexts: Context | Context[]): void {
    if (Array.isArray(contexts)) {
      for (const context of contexts) {
        this.contexts[context.uniqueId] = new BehaviorSubject(context);
      }
    } else {
      this.contexts[contexts.uniqueId] = new BehaviorSubject(contexts);
    }
  }

  public setDefaultContext(contextId: string): void {
    const context = this.contexts[contextId];
    if (context == null) {
      throw TypeError(`Context with Id: ${contextId} does not exist to set as default.`);
    }
    const contextObj = context.getValue();
    this.defaultContext.next(contextObj);
  }

  public setState(contextId: string, state: ContextState): void {
    const contextSub = this.contexts[contextId];
    const contextObj = contextSub.getValue();
    contextObj.state = state;

    this.updateContext(contextId, contextObj);
  }

  public updateContext(contextId: string, newContext: Context): void {
    if (contextId !== newContext.uniqueId) {
      throw TypeError('Can only update contexts with matching ids');
    }

    const contextSub = this.contexts[contextId];
    if (contextSub == null) {
      throw TypeError(`Context with Id: ${contextId} does not exist to update. Please register this context.`);
    }
    contextSub.next(newContext);

    // Update default context object if this is also the default context.
    const defaultContext = this.defaultContext.getValue();
    if (defaultContext != null && defaultContext.uniqueId === contextId) {
      this.defaultContext.next(newContext);
    }
  }

  public getDefaultContext(): Context {
    return this.defaultContext.getValue();
  }

  public getDefaultObservable(): Observable<Context> {
    return this.defaultContext.asObservable();
  }

  public getContexts(): Context[] {
    const contextSubs = Object.values(this.contexts);
    return contextSubs.map((sub) => sub.getValue());
  }

  public getContextObservables(): Observable<Context>[] {
    const contextSubs = Object.values(this.contexts);
    return contextSubs.map((sub) => sub.asObservable());
  }

  public getContext(contextId: string): Context {
    return this.contexts[contextId].getValue();
  }

  public getContextObservable(contextId: string): Observable<Context> {
    return this.contexts[contextId].asObservable();
  }

  public removeContext(contextId: string): void {
    if (this.contexts[contextId] != null) {
      // Complete will signal this observable shouldn't produce anymore updates.
      this.contexts[contextId].complete();
      delete this.contexts[contextId];
    }
  }

  public clearContexts(): void {
    // Gracefully complete each context before clearing.
    const contextSubs = Object.values(this.contexts);
    contextSubs.forEach((contextSub) => contextSub.complete());

    this.contexts = {};
  }

}
