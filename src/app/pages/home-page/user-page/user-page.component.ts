import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../../lib";
enum ViewState {
  List = 1,
  Create,
  Update
}
@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.css"]
})
export class UserPageComponent implements OnInit {
  indeterminate: boolean = false;
  ViewState = ViewState;
  pageIndex: number = 0;
  pageSize: number = 10;
  loading: boolean = true;
  dataSet: IUser[] = [];
  total: number = 10;
  state = ViewState.List;
  confirmPassword: string = "";
  newUser: IUser = {
    nickname: "",
    password: "",
    role_id: 1
  };
  selectedUser: IUser;
  allChecked: boolean = false;
  checkAll() {
    if (this.dataSet.every(user => user.checked)) {
      this.dataSet.forEach(user => (user.checked = true));
    } else {
      this.dataSet.forEach(user => (user.checked = false));
    }
  }
  roles: IRole[] = [];
  constructor(public admin: AdminService) { }
  async getUserPage() {
    this.loading = true;
    let result = await this.admin.getUserPage(this.pageIndex, this.pageSize);
    this.total = result.total;

    let list: IUser[] = result.list;
    list.forEach(user => {
      let role = this.roles.find(role => role.id == user.role_id);
      user.role = role ? role.name : "未知类型";
    });
    this.dataSet = list;
    this.loading;
    this.loading = false;
  }
  async getRoleAll() {
    this.roles = await this.admin.getRoleAll();
  }

  async createUser() {
    if (this.newUser.password != this.confirmPassword) {
      return this.admin.createMessage("error", "密码不一致");
    }
    await this.admin.createUser(this.newUser);
    await this.getUserPage();
    this.state = ViewState.List;
  }
  async deleteUser(user_id: number) {
    this.loading = true;
    await this.admin.deleteUser(user_id);
    await this.getUserPage();
    this.loading = false;
  }
  async deleteUsers() {
    this.loading = true;
    await this.admin.deleteUsers(
      this.dataSet.filter(user => user.checked).map(user => user.id)
    );
    await this.getUserPage();
    this.loading = false;
  }
  async ngOnInit() {
    await this.getRoleAll();
    await this.getUserPage();
  }

  async updateUser() {
    this.loading = true;
    if (this.confirmPassword != this.selectedUser.password) {
      return this.admin.createMessage("error", "密码不一致");
    }
    await this.admin.updateUser(this.selectedUser.id, this.selectedUser);
    await this.getUserPage();
    this.loading = false;
  }
}
