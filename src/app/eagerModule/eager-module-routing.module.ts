import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {EagerMsgComponent} from './eager-msg/eager-msg.component';

const routes: Routes = [
  {
    path: 'eager',
    component: EagerMsgComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EagerModuleRoutingModule {
}
