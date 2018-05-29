import { Component, OnInit } from "@angular/core";
import { ConfigService, StorageService, AdminService } from "../../lib";
@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {
  isCollapsed = false;
  groups: any[] = [];
  shop_user_name: string;
  sendProductOrdersNum: number = 0;
  constructor(
    public config: ConfigService,
    public storage: StorageService,
    public admin: AdminService
  ) { }

  async ngOnInit() {
    this.shop_user_name = this.storage.shop_user_name
    this.groups = this.admin.getModuleGroup(this.storage.adminModuleList);
  }

  async getAdminInfo() { }
  async getSendProductOrdersNum() { }

  async logout() {
    // await this.config.fruit.adminLogout();
    localStorage.clear();
    this.config.router.navigateByUrl("/admin/login");
    // window.location.reload();
  }
}
