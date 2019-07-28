import {async} from '@angular/core/testing';
import {ContextManagerService} from './ContextManager.service';
import {Context, ContextState} from './Context';

describe('ContextManagerService', () => {
  let contextManagerService;
  let initialContexts;

  beforeEach(() => {
    contextManagerService = new ContextManagerService();
    initialContexts = [{
      uniqueId: 'First Context',
      state: ContextState.Online
    }, {
      uniqueId: 'Second Context',
      state: ContextState.Initializing
    }];
    contextManagerService.registerContexts(initialContexts);
  });

  it(`Should have a null default context at initialization.`, async(() => {
    expect(contextManagerService.getDefaultContext()).toEqual(null);
  }));

  it(`Should provide full list of registered contexts`, async(() => {
    expect(contextManagerService.getContexts().length).toEqual(2);
    const laterContext = {
      uniqueId: 'Third Context',
      state: ContextState.Offline
    } as Context;
    contextManagerService.registerContexts(laterContext);
    expect(contextManagerService.getContexts().length).toEqual(3);
  }));

  it(`Should allow default context to be set`, async(() => {
    let dContext;
    let expectedContext = null;
    contextManagerService.getDefaultObservable().subscribe((defaultContext) => {
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

  it(`Contexts in list should update after state change`, async(() => {
    contextManagerService.setState(initialContexts[1].uniqueId, ContextState.Online);
    // Check that state was actually updated.
    expect(contextManagerService.getContexts()[1].state).toEqual(ContextState.Online);
  }));

  it(`Ensure update after state change of default.`, async(() => {
    let dContext;
    let expectedContext = null;
    contextManagerService.getDefaultObservable().subscribe((defaultContext) => {
      dContext = defaultContext;
      expect(dContext).toEqual(expectedContext);
    });
    expectedContext = initialContexts[1];
    contextManagerService.registerContexts(initialContexts);
    contextManagerService.setDefaultContext(expectedContext.uniqueId);
    contextManagerService.setState(expectedContext.uniqueId, ContextState.Offline);
  }));

  it(`Ensure no update to default after non-default context state change.`, async(() => {
    let dContext = null;
    let expectedContext = null;
    contextManagerService.getDefaultObservable().subscribe((defaultContext) => {
      dContext = defaultContext;
      expect(dContext).toEqual(expectedContext);
    });
    expectedContext = initialContexts[1];
    contextManagerService.registerContexts(initialContexts);
    contextManagerService.setDefaultContext(expectedContext.uniqueId);
    contextManagerService.setState(initialContexts[0].uniqueId, ContextState.Offline);
    expect(dContext).toEqual(expectedContext);
    expect(contextManagerService.getContexts()[0].state).toEqual(ContextState.Offline);
  }));

  it(`Should be able to remove context with valid Id`, async(() => {
    expect(contextManagerService.getContexts().length).toEqual(2);

    contextManagerService.removeContext(initialContexts[0].uniqueId);
    expect(contextManagerService.getContexts().length).toEqual(1);
  }));

  it(`Should update context with valid Id, and notify subscribers`, async(() => {
    expect(contextManagerService.getContexts().length).toEqual(2);
    const laterContext = {
      uniqueId: 'Third Context',
      state: ContextState.Offline
    } as Context;
    const expectedContext = laterContext;
    let expectedUpdateCount = 0;
    let realUpdateCount = 0;
    contextManagerService.registerContexts(laterContext);
    contextManagerService.getContextObservable(laterContext.uniqueId).subscribe((context) => {
      expect(context).toEqual(expectedContext);
      expect(realUpdateCount++).toEqual(expectedUpdateCount);
    });

    laterContext.extraData = 'More Data';
    expectedUpdateCount += 1;
    contextManagerService.updateContext(laterContext.uniqueId, laterContext);
  }));

  it(`Should error when updating invalid context.`, async(() => {
    expect(contextManagerService.getContexts().length).toEqual(2);
    const laterContext = {
      uniqueId: 'Third Context',
      state: ContextState.Offline
    } as Context;
    expect(() => {
      contextManagerService.updateContext(laterContext.uniqueId, initialContexts[0]);
    }).toThrowError(TypeError);
    expect(() => {
      contextManagerService.updateContext(laterContext.uniqueId, laterContext);
    }).toThrowError(TypeError);
  }));

  it(`Should clear contexts.`, async(() => {
    expect(contextManagerService.getContexts().length).toEqual(2);
    contextManagerService.clearContexts();
    expect(contextManagerService.getContexts().length).toEqual(0);
  }));
});
