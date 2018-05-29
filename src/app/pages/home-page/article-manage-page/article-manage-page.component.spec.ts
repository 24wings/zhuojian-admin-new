import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleManagePageComponent } from './article-manage-page.component';

describe('ArticleManagePageComponent', () => {
  let component: ArticleManagePageComponent;
  let fixture: ComponentFixture<ArticleManagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleManagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
