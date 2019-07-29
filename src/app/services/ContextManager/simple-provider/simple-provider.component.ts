import {Component, OnInit} from '@angular/core';
import {ContextProvider} from '../ContextProvider';
import {ContextManagerService} from '../ContextManager.service';
import {Utils} from '../../../Utils';
import {Context, ContextState} from '../Context';

interface SimpleData extends Context {
  readonly uniqueId: string;
  state: ContextState;
  extraData: string;
  moreData: string;
}

@Component({
  selector: 'app-simple-provider',
  templateUrl: './simple-provider.component.html',
  styleUrls: ['./simple-provider.component.css']
})
export class SimpleProviderComponent extends ContextProvider implements OnInit {
  context: Context;

  constructor(contextManager: ContextManagerService) {
    super(contextManager);
    this.context = {
      uniqueId: Utils.uuid(),
      state: ContextState.Offline,
    } as SimpleData;
    this.contextManager.registerContexts(this.context);
  }

  ngOnInit() {
    this.contextManager.setState(this.context.uniqueId, ContextState.Initializing);
    this.context.extraData = 'Initializing';
    setTimeout(() => {
      this.context.extraData = 'Initialized';
      this.context.moreData = 'Stuff';
      this.contextManager.setState(this.context.uniqueId, ContextState.Online);
    }, 3000);
  }

}
