import { Injectable } from "@angular/core";
import { MyHttpService } from "./http.service";
@Injectable()
export class M2Service {
  m2Api = {
    m2Login: "/admin/m2-login"
  };

  m2Login(shop_id, password) {
    return this.http.Post(this.m2Api.m2Login, { shop_id, password });
  }

  constructor(public http: MyHttpService) {}
}
