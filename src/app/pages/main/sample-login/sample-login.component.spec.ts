import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleLoginComponent } from './sample-login.component';

describe('SampleLoginComponent', () => {
  let component: SampleLoginComponent;
  let fixture: ComponentFixture<SampleLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
