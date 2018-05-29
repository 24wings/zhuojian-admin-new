import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

interface LoginOption {
  label: string;
  value: {
    url: string;
  };
}
import {
  AdminService,
  StorageService,
  M2Service,
  MyHttpService,
  ElectronService
} from "../../lib";
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  username: string = "";
  password: string = "";
  selectedLoginOption: LoginOption;
  isElectron: boolean = !!this.electron.remote;

  loginOptions: LoginOption[] = [
    {
      label: "邦为营销平台",
      value: { url: "http://47.100.23.203/pc/login" }
    },
    {
      label: "邦为CMS",
      value: { url: "http://192.168.1.167/admin/login" }
    }
  ];
  constructor(
    private fb: FormBuilder,
    public admin: AdminService,
    public router: Router,
    public storage: StorageService,
    public m2: M2Service,
    public http: MyHttpService,
    public lowHttp: Http,
    public electron: ElectronService
  ) {}

  modules: IModule[] = [];

  async ngOnInit() {
    this.selectedLoginOption = this.loginOptions[0];
  }
  async login() {
    this.cmsLogin();
  }

  async cmsLogin() {
    let result;
    if (this.http.isMock) {
      if (/admin/.test(this.username)) {
        result = await this.admin.login(this.username, this.password);
      } else {
        result = {
          user: {},
          modules: [
            {
              id: 11,
              name: "\u6d3b\u52a8\u7ba1\u7406",
              parent_id: 0,
              created_at: "",
              updated_at: "",
              user_module_name: "",
              key_word: "",
              link: "/admin/activity",
              sort: "",
              icon_font: "",
              can_delete: 1
            },
            {
              id: 12,
              name: "\u4f18\u60e0\u5238",
              parent_id: 11,
              created_at: "",
              updated_at: "",
              user_module_name: "",
              key_word: "",
              link: "/admin/activity/material",
              sort: "",
              icon_font: "",
              can_delete: 1
            },
            {
              id: 13,
              name: "\u62db\u8058",
              parent_id: 11,
              created_at: "",
              updated_at: "",
              user_module_name: "",
              key_word: "",
              link: "/admin/activity/hire",
              sort: "",
              icon_font: "",
              can_delete: 1
            }
          ]
        };
      }
      this.storage.adminModuleList = result.modules;
      this.storage.shop_id = result.user_id;
      this.storage.shop_user_name = result.user_name;

      let module = result.modules.find(
        module => !!module.link && module.parent_id
      );
      this.router.navigateByUrl(module.link);
    } else {
      if (!this.selectedLoginOption)
        this.selectedLoginOption = this.loginOptions[0];
      let result = await this.lowHttp
        .post(this.selectedLoginOption.value.url, {
          username: this.username,
          password: this.password
        })
        .toPromise()
        .then(rtn => rtn.json());
      if (result.ok) {
        console.log(result);

        this.storage.adminModuleList = result.data.modules;
        this.storage.shop_id = result.data.user.user_id;
        this.storage.shop_user_name = result.data.user.user_name;

        let module = result.data.modules.find(
          module => !!module.link && module.parent_id
        );
        this.router.navigateByUrl(module.link);
      } else {
        alert(result.data);
      }
    }
  }
}
