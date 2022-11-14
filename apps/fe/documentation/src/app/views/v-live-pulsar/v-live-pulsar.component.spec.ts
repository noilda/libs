import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VLivePulsarComponent } from './v-live-pulsar.component';

describe('VLivePulsarComponent', () => {
  let component: VLivePulsarComponent;
  let fixture: ComponentFixture<VLivePulsarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VLivePulsarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VLivePulsarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
