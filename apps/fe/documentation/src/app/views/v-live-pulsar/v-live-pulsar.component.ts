import { Component, OnInit } from '@angular/core';
import { ILivePulsarType } from '@noilda/live-pulsar';

@Component({
  selector: 'noilda-v-live-pulsar',
  templateUrl: './v-live-pulsar.component.html',
  styleUrls: ['./v-live-pulsar.component.scss'],
})
export class VLivePulsarComponent implements OnInit {
  type: ILivePulsarType = 'SUCCESS';

  ngOnInit(): void {
    setInterval(() => {
      this.type = ['NEUTRAL', 'SUCCESS', 'WARNING', 'ERROR'][
        Math.floor(Math.random() * 4)
      ] as ILivePulsarType;
    }, 2000);
  }
}

