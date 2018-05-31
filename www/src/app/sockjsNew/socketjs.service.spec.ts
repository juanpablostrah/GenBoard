import { TestBed, inject } from '@angular/core/testing';

import { SocketjsService } from './socketjs.service';

describe('SocketjsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketjsService]
    });
  });

  it('should be created', inject([SocketjsService], (service: SocketjsService) => {
    expect(service).toBeTruthy();
  }));
});
