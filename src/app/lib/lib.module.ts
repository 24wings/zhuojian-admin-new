import { NgModule, ModuleWithProviders } from "@angular/core";
// import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from "@angular/router";
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { CommonService, ConfigService, PcClientService } from "./service";
// import { MoneyPipe, ArrTruePipe } from './pipe';
import { BackDirective, BgImgDirective } from "./directive";
import { TitleComponent } from "./com/title/title.component";
import { TransitionComponent } from "./com/transition/transition.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ImageViewerDirective } from "./directive/image-viewer.directive";
import { AdminService } from "./service/admin.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { ContentTypeInterceptor } from "./service/http-interceptor";
import { EditormdService } from "./service/editormd.service";

import { LocationComponent } from "./com/location/location.component";

import { MyHttpService } from "./service/http.service";
import { StorageService } from "./service/storage.service";
import { M2Service } from "./service/m2.service";
import { ElectronService } from './service/electron.service';
@NgModule({
  imports: [
    // BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [
    TitleComponent,
    TransitionComponent,
    BgImgDirective,
    BackDirective,
    ImageViewerDirective,
    LocationComponent
  ],
  exports: [
    LocationComponent,
    HttpModule,
    FormsModule,
    JsonpModule,
    TitleComponent,
    TransitionComponent,
    BgImgDirective,
    BackDirective,
    ImageViewerDirective,

  ],
  providers: [
    ConfigService,
    CommonService,

    AdminService,
    // MoneyPipe,
    // ArrTruePipe,
    BackDirective,
    BgImgDirective,
    ImageViewerDirective,
    MyHttpService,
    EditormdService,
    StorageService,
    M2Service,
    ElectronService
  ]
})
export class LibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LibModule,
      providers: [
        ConfigService,
        CommonService,
        // MoneyPipe,
        // ArrTruePipe,
        BackDirective,
        BgImgDirective,
        ImageViewerDirective,

        PcClientService,
        MyHttpService,
        EditormdService,
        StorageService,
        M2Service,
        ElectronService

      ]
    };
  }
}
