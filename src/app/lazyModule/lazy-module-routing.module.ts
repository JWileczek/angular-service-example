import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {LazyMsgComponent} from './lazy-msg/lazy-msg.component';
import {SingletonMsgComponent} from './singleton-msg/singleton-msg.component';

const routes: Routes = [
  {
    path: 'singleton',
    component: SingletonMsgComponent
  },
  {
    path: '',
    component: LazyMsgComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyModuleRoutingModule {
}
