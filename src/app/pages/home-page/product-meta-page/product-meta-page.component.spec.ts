import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMetaPageComponent } from './product-meta-page.component';

describe('ProductMetaPageComponent', () => {
  let component: ProductMetaPageComponent;
  let fixture: ComponentFixture<ProductMetaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMetaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMetaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
