import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HirePageComponent } from './hire-page.component';

describe('HirePageComponent', () => {
  let component: HirePageComponent;
  let fixture: ComponentFixture<HirePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HirePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
