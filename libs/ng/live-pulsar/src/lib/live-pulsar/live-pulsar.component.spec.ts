import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePulsarComponent } from './live-pulsar.component';

describe('LivePulsarComponent', () => {
  let component: LivePulsarComponent;
  let fixture: ComponentFixture<LivePulsarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivePulsarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LivePulsarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
