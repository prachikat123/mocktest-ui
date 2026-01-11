import { TestBed } from '@angular/core/testing';
import { MockTestService } from './mock-test.service';




describe('MockTest', () => {
  let service: MockTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
