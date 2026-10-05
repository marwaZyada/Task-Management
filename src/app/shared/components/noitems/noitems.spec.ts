import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Noitems } from './noitems';

describe('Noitems', () => {
  let component: Noitems;
  let fixture: ComponentFixture<Noitems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Noitems],
    }).compileComponents();

    fixture = TestBed.createComponent(Noitems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
