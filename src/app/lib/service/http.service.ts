import { Injectable } from "@angular/core";

import { NzMessageService } from "ng-zorro-antd";
import {
  Http,
  RequestOptions,
  RequestOptionsArgs,
  Headers
} from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FindValueSubscriber } from "rxjs/operators/find";

@Injectable()
export class MyHttpService {
  isMock: boolean = false;
  isDev: boolean = false;
  get ip() {
    return this.isDev ? this.localIp : this.serverIp;
  }
  localIp = "http://192.168.1.167";
  serverIp = "http://47.100.23.203";
  Get(url: string, options?: RequestOptionsArgs) {
    console.log(url);
    // url =
    //   url.startsWith("http") || url.startsWith("/assets")     ? url
    //     : `${this.ip}${url}`;
    if (this.isMock) {
      return this.mockGet(url);
    }

    return this.http
      .get(`${this.ip}${url}`, options)
      .toPromise()
      .then(rtn => {
        let result = rtn.json() as any;
        if (result.ok) {
          return result.data;
        } else {
          return this.createMessage("error", result.data) && false;
        }
      });
  }
  Post(url: string, body: any, options?: RequestOptionsArgs): Promise<any> {
    // console.log(url);
    // url = url.startsWith("http") ? url : `${this.ip}${url}`;
    if (this.isMock) {
      return this.mockGet(url);
    }

    // options = options ? options : {};
    if (!options) options = { headers: new Headers() };
    options.headers = new Headers();
    options.headers.set("content-type", "application/json");
    console.log(options);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "my-auth-token"
    });
    // options.withCredentials = true;
    return this.http
      .post(`${this.ip}${url}`, body, options)
      .toPromise()
      .then(rtn => {
        let result = rtn.json() as any;
        return result.ok
          ? result.data
          : this.createMessage("error", result.data) && false;
      });
  }

  Delete(url: string, options?: RequestOptionsArgs) {
    url = url.startsWith("http") ? url : `${this.ip}${url}`;
    options = options ? options : {};

    // options.withCredentials = true;
    return this.http
      .delete(`${this.ip}${url}`)
      .toPromise()
      .then(rtn => {
        let result = rtn as any;
        return result.ok
          ? result.data
          : this.createMessage("error", result.data);
      });
  }

  Put(url: string, body, options?: RequestOptionsArgs) {
    url = url.startsWith("http") ? url : `${this.ip}${url}`;
    options = options ? options : {};
    // options.withCredentials = true;
    return this.http
      .put(`${this.ip}${url}`, body)
      .toPromise()
      .then(rtn => {
        let result = rtn as any;
        return result.ok
          ? result.data
          : this.createMessage("error", result.data);
      });
  }

  localGet(url: string) {
    return this.http.get(url).toPromise();
  }
  localGetJSON(url: string) {
    return this.http
      .get(url)
      .toPromise()
      .then(rtn => rtn.json());
  }
  mockGet(url: string) {
    return this.http
      .get("/assets/mock" + url + ".json")
      .toPromise()
      .then(rtn => rtn.json())
      .then(rtn => rtn.data);
  }

  createMessage(type: "error" | "success" | "warning", text) {
    return this._message.create(type, `这是一条${text}提示`);
  }
  constructor(public http: Http, private _message: NzMessageService) {}
}
