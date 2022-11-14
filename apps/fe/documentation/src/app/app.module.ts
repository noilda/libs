import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { VLivePulsarComponent } from './views/v-live-pulsar/v-live-pulsar.component';
import {LivePulsarModule} from "@noilda/live-pulsar"
@NgModule({
  declarations: [AppComponent,  VLivePulsarComponent],
  imports: [
    BrowserModule,
    LivePulsarModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
