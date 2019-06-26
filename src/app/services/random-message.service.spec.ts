import {TestBed} from '@angular/core/testing';

import {RandomMsgService} from './random-message.service';

describe('RandomMsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomMsgService = TestBed.get(RandomMsgService);
    expect(service).toBeTruthy();
  });
});
