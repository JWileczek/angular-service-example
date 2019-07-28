import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EagerModuleModule} from './eagerModule/eager-module.module';
import {AppConfigService} from './app.config';
import {SimpleProviderComponent} from './simple-provider/simple-provider.component';

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    SimpleProviderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EagerModuleModule,
    AppRoutingModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService], multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
