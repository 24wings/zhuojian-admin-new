import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { registerLocaleData } from "@angular/common";
// import zh from "@angular/common/locales/zh";
// registerLocaleData(zh);
import { RouterModule } from "@angular/router";
import { LibModule } from "./lib";
import {
  NgZorroAntdModule,
  NzLayoutModule,
  NzTableModule,
  NzFormModule,
  NzInputModule,
  // NzCardModule,
  NzCheckboxModule,
  // NzUtilModule,
  NzAlertModule
} from "ng-zorro-antd";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { WechatPageComponent } from "./pages/wechat-page/wechat-page.component";
import { StrKeyPipe } from "./pipe/str-key.pipe";

import { RolePageComponent } from "./pages/home-page/role-page/role-page.component";
import { ModulePageComponent } from "./pages/home-page/module-page/module-page.component";
import { MaterialPageComponent } from "./pages/home-page/material-page/material-page.component";
import { UserPageComponent } from "./pages/home-page/user-page/user-page.component";
import { ArticleManagePageComponent } from "./pages/home-page/article-manage-page/article-manage-page.component";
import { ArticleVerifyPageComponent } from "./pages/home-page/article-verify-page/article-verify-page.component";
import { ArticleTypePageComponent } from "./pages/home-page/article-type-page/article-type-page.component";
import { ArticleAnalysisPageComponent } from "./pages/home-page/article-analysis-page/article-analysis-page.component";
import { ProductMetaPageComponent } from "./pages/home-page/product-meta-page/product-meta-page.component";
import { ProductManagePageComponent } from "./pages/home-page/product-manage-page/product-manage-page.component";
import { HirePageComponent } from "./pages/home-page/hire-page/hire-page.component";
import { SignupPageComponent } from "./pages/signup-page/signup-page.component";
import { Theme1Component } from "./com/theme1/theme1.component";
import { Theme2Component } from "./com/theme2/theme2.component";
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    WechatPageComponent,
    StrKeyPipe,
    RolePageComponent,
    ModulePageComponent,
    MaterialPageComponent,
    UserPageComponent,
    ArticleManagePageComponent,
    ArticleVerifyPageComponent,
    ArticleTypePageComponent,
    ArticleAnalysisPageComponent,
    ProductMetaPageComponent,
    ProductManagePageComponent,
    HirePageComponent,
    SignupPageComponent,
    Theme1Component,
    Theme2Component
  ],
  imports: [
    // NzCardModule,
    // NzAlertModule,
    // NzCheckboxModule,
    // NzFormModule,

    FormsModule,
    // NzInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    LibModule.forRoot(),
    BrowserModule,
    // NzTableModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "/admin/login", pathMatch: "full" },
      { path: "admin/login", component: LoginPageComponent },
      { path: "admin/signup", component: SignupPageComponent },
      {
        path: "admin",
        component: HomePageComponent,
        children: [
          {
            path: "system/role",
            component: RolePageComponent
          },
          {
            path: "system/module",
            component: ModulePageComponent
          },

          {
            path: "system/user",
            component: UserPageComponent
          },
          {
            path: "article/article-type",
            component: ArticleTypePageComponent
          },
          {
            path: "article/article-manage",
            component: ArticleManagePageComponent
          },
          {
            path: "article/article-verify",
            component: ArticleVerifyPageComponent
          },
          {
            path: "article/article-analysis",
            component: ArticleAnalysisPageComponent
          },
          //商城
          {
            path: "shop/product-manage",
            component: ProductManagePageComponent
          },
          {
            path: "shop/product-meta",
            component: ProductMetaPageComponent
          },
          {
            path: "shop/order",
            component: ProductManagePageComponent
          },
          // 活动
          {
            path: "activity/material",
            component: MaterialPageComponent
          },
          {
            path: "activity/hire",
            component: HirePageComponent
          }
        ]
      }
    ])
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
