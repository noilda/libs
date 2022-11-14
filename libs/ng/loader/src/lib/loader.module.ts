import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarLoaderComponent } from '../templates/bar-loader/bar-loader.component';

@NgModule({
  declarations: [BarLoaderComponent],
  imports: [CommonModule],
  exports: [BarLoaderComponent],
})
export class LoaderModule {}
