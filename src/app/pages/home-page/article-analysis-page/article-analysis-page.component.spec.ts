import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAnalysisPageComponent } from './article-analysis-page.component';

describe('ArticleAnalysisPageComponent', () => {
  let component: ArticleAnalysisPageComponent;
  let fixture: ComponentFixture<ArticleAnalysisPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleAnalysisPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAnalysisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
