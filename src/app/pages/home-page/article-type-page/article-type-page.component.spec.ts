import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTypePageComponent } from './article-type-page.component';

describe('ArticleTypePageComponent', () => {
  let component: ArticleTypePageComponent;
  let fixture: ComponentFixture<ArticleTypePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleTypePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
