import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {EagerMsgComponent} from './eager-msg/eager-msg.component';
import {EagerModuleRoutingModule} from './eager-module-routing.module';

@NgModule({
  declarations: [EagerMsgComponent],
  imports: [
    CommonModule,
    EagerModuleRoutingModule
  ],
  providers: []
})
export class EagerModuleModule {
}
