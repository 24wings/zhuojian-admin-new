import { TestBed, inject } from '@angular/core/testing';

import { EditormdService } from './editormd.service';

describe('EditormdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditormdService]
    });
  });

  it('should be created', inject([EditormdService], (service: EditormdService) => {
    expect(service).toBeTruthy();
  }));
});
