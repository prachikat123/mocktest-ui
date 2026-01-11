import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSubject } from './test-subject';

describe('TestSubject', () => {
  let component: TestSubject;
  let fixture: ComponentFixture<TestSubject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSubject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSubject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
