import {async} from '@angular/core/testing';
import {ContextManagerService} from './ContextManager.service';
import {Context, ContextState} from './Context';

describe('ContextManagerService', () => {
  let contextManagerService;

  it(`should provide full list of registered contexts`, async(() => {
    contextManagerService = new ContextManagerService();
    expect(contextManagerService.getContexts().length).toEqual(0);
    const initalContexts: Array<Context> = [{
      uniqueId: 'First Context',
      state: ContextState.Online
    }, {
      uniqueId: 'Second Context',
      state: ContextState.Initializing
    }];
    contextManagerService.registerContexts(initalContexts);
    expect(contextManagerService.getContexts().length).toEqual(2);
    const laterContext = {
      uniqueId: 'ThirdContext',
      state: ContextState.Offline
    } as Context;
    contextManagerService.registerContexts(laterContext);
    expect(contextManagerService.getContexts().length).toEqual(3);
  }));

  it(`should allow default context to be set`, async(() => {
    contextManagerService = new ContextManagerService();
    let dContext;
    let expectedContext = null;
    contextManagerService.getDefaultContext().subscribe((defaultContext) => {
      dContext = defaultContext;
      expect(dContext).toEqual(expectedContext);
    });
    expectedContext = {
      uniqueId: 'Default Context',
      state: ContextState.Offline
    } as Context;
    contextManagerService.registerContexts(expectedContext);
    contextManagerService.setDefaultContext(expectedContext.uniqueId);
  }));

  it(`contexts in list should update after state change`, async(() => {
    contextManagerService = new ContextManagerService();
    const initalContexts: Array<Context> = [{
      uniqueId: 'First Context',
      state: ContextState.Online
    }, {
      uniqueId: 'Second Context',
      state: ContextState.Initializing
    }];
    contextManagerService.registerContexts(initalContexts);
    contextManagerService.setState(initalContexts[1].uniqueId, ContextState.Online);
    // Check that state was actually updated.
    expect(contextManagerService.getContexts()[1].state).toEqual(ContextState.Online);
  }));

  it(`Ensure update after state change of default.`, async(() => {
    contextManagerService = new ContextManagerService();
    let dContext;
    let expectedContext = null;
    contextManagerService.getDefaultContext().subscribe((defaultContext) => {
      dContext = defaultContext;
      expect(dContext).toEqual(expectedContext);
    });
    const initalContexts: Array<Context> = [{
      uniqueId: 'First Context',
      state: ContextState.Online
    }, {
      uniqueId: 'Second Context',
      state: ContextState.Initializing
    }];
    expectedContext = initalContexts[1];
    contextManagerService.registerContexts(initalContexts);
    contextManagerService.setDefaultContext(expectedContext.uniqueId);
    contextManagerService.setState(expectedContext.uniqueId, ContextState.Offline);
  }));

  it(`Ensure no update after non-default state change.`, async(() => {
    contextManagerService = new ContextManagerService();
    let dContext = null;
    let expectedContext = null;
    contextManagerService.getDefaultContext().subscribe((defaultContext) => {
      dContext = defaultContext;
      expect(dContext).toEqual(expectedContext);
    });
    const initalContexts: Array<Context> = [{
      uniqueId: 'First Context',
      state: ContextState.Online
    }, {
      uniqueId: 'Second Context',
      state: ContextState.Initializing
    }];
    expectedContext = initalContexts[1];
    contextManagerService.registerContexts(initalContexts);
    contextManagerService.setDefaultContext(expectedContext.uniqueId);
    contextManagerService.setState(initalContexts[0].uniqueId, ContextState.Offline);
    expect(dContext).toEqual(expectedContext);
    expect(contextManagerService.getContexts()[0].state).toEqual(ContextState.Offline);
  }));
});
