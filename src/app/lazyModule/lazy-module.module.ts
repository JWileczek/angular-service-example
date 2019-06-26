import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {LazyMsgComponent} from './lazy-msg/lazy-msg.component';
import {LazyModuleRoutingModule} from './lazy-module-routing.module';
import {SingletonMsgComponent} from './singleton-msg/singleton-msg.component';

@NgModule({
  declarations: [LazyMsgComponent, SingletonMsgComponent],
  imports: [
    CommonModule,
    LazyModuleRoutingModule
  ],
  providers: []
})
export class LazyModuleModule {
}
