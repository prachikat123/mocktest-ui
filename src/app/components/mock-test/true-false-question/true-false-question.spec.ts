import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseQuestion } from './true-false-question';

describe('TrueFalseQuestion', () => {
  let component: TrueFalseQuestion;
  let fixture: ComponentFixture<TrueFalseQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseQuestion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueFalseQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
