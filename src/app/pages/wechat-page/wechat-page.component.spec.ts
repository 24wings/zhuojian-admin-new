import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WechatPageComponent } from './wechat-page.component';

describe('WechatPageComponent', () => {
  let component: WechatPageComponent;
  let fixture: ComponentFixture<WechatPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WechatPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WechatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
