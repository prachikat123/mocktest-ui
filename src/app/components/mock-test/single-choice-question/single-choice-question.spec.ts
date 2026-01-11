import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceQuestion } from './single-choice-question';

describe('SingleChoiceQuestion', () => {
  let component: SingleChoiceQuestion;
  let fixture: ComponentFixture<SingleChoiceQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleChoiceQuestion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleChoiceQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
