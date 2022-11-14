import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'noilda-bar-loader',
  templateUrl: './bar-loader.component.html',
  styleUrls: ['./bar-loader.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class BarLoaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
