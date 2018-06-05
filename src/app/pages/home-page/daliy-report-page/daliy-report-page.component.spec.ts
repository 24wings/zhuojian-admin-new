import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaliyReportPageComponent } from './daliy-report-page.component';

describe('DaliyReportPageComponent', () => {
  let component: DaliyReportPageComponent;
  let fixture: ComponentFixture<DaliyReportPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaliyReportPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaliyReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
