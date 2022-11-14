import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivePulsarComponent } from './live-pulsar/live-pulsar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LivePulsarComponent],
  exports: [LivePulsarComponent],
})
export class LivePulsarModule {}
