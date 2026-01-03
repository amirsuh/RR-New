import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveChartComponent } from './interactive-chart-component';

describe('InteractiveChartComponent', () => {
  let component: InteractiveChartComponent;
  let fixture: ComponentFixture<InteractiveChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
