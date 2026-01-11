import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelDialog } from './level-dialog';

describe('LevelDialog', () => {
  let component: LevelDialog;
  let fixture: ComponentFixture<LevelDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
