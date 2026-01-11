import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceQuestion } from './multiple-choice-question';

describe('MultipleChoiceQuestion', () => {
  let component: MultipleChoiceQuestion;
  let fixture: ComponentFixture<MultipleChoiceQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleChoiceQuestion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleChoiceQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
