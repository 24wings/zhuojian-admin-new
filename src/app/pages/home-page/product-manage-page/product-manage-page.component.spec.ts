import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagePageComponent } from './product-manage-page.component';

describe('ProductManagePageComponent', () => {
  let component: ProductManagePageComponent;
  let fixture: ComponentFixture<ProductManagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductManagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
