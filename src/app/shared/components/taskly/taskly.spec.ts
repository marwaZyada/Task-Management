import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taskly } from './taskly';

describe('Taskly', () => {
  let component: Taskly;
  let fixture: ComponentFixture<Taskly>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taskly],
    }).compileComponents();

    fixture = TestBed.createComponent(Taskly);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
