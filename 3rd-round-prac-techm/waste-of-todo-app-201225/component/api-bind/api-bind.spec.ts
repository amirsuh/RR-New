import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiBind } from './api-bind';

describe('ApiBind', () => {
  let component: ApiBind;
  let fixture: ComponentFixture<ApiBind>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiBind]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiBind);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
