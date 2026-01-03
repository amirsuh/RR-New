import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehVsSignal } from './beh-vs-signal';

describe('BehVsSignal', () => {
  let component: BehVsSignal;
  let fixture: ComponentFixture<BehVsSignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BehVsSignal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehVsSignal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
