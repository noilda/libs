import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'noilda-live-pulsar',
  templateUrl: './live-pulsar.component.html',
  styleUrls: ['./live-pulsar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LivePulsarComponent {
  @Input() label = 'Live';
  @Input() color: string | null = null;
  @Input() set type(type: ILivePulsarType) {
    this.color = this.typesColors[type];
  }
  typesColors = {
    NEUTRAL: '#cad2c9',
    SUCCESS: '#55dc53',
    WARNING: '#fb7d09',
    ERROR: '#ff1800',
  };
}

export type ILivePulsarType = 'NEUTRAL' | 'SUCCESS' | 'WARNING' | 'ERROR'

