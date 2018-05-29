import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleVerifyPageComponent } from './article-verify-page.component';

describe('ArticleVerifyPageComponent', () => {
  let component: ArticleVerifyPageComponent;
  let fixture: ComponentFixture<ArticleVerifyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleVerifyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleVerifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
