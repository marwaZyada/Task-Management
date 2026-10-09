import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiProblem } from './api-problem';

describe('ApiProblem', () => {
  let component: ApiProblem;
  let fixture: ComponentFixture<ApiProblem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiProblem],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiProblem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
