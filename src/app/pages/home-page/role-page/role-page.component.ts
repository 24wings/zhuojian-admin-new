import { Component, OnInit } from "@angular/core";
import { AdminService, StorageService } from "../../../lib";
enum ViewState {
  List = 1,
  Create,
  Update
}
@Component({
  selector: "app-role-page",
  templateUrl: "./role-page.component.html",
  styleUrls: ["./role-page.component.css"]
})
export class RolePageComponent implements OnInit {
  pageIndex = 1;
  ViewState = ViewState;
  state = ViewState.List;
  allChecked = false;
  total: number = 100;
  pageSize: number = 10;
  indeterminate = true;
  dataSet = [];
  selectedRole: IRole;
  groups: {
    checkAll?: boolean;
    indeterminate?: boolean;
    id: number;
    label: string;
    value: number;
    children: { id: number; label: string; value: number; checked: boolean }[];
  }[] = [];
  newRole: IRole = {
    name: "",
    modules_ids: []
  };
  loading: boolean = false;
  modules: IModule[] = [];
  async getModuleGroup() {
    this.modules = await this.admin.getModuleAll();

    let groups = this.admin.getModuleGroup(this.modules);
    this.groups = groups;
  }
  selectRole(role: IRole) {
    this.selectedRole = role;
    if (typeof role.modules_ids == "string")
      role.modules_ids = JSON.parse(role.modules_ids);
    console.log(role.modules_ids);

    role.modules_ids.forEach(id => {
      this.groups.forEach(group => {
        if (group.id == id || group.value == id) {
          group.indeterminate = true;
        }
        group.children.forEach(child => {
          child.id == id || child.value == id ? (child.checked = true) : "";
        });
      });
    });
  }
  updateAllChecked(group): void {
    group.indeterminate = false;
    if (group.children.every(group => group.checked)) {
      group.children.forEach(item => (item.checked = false));
      group.checkAll = false;
    } else {
      group.children.forEach(item => (item.checked = true));
      group.checkAll = true;
    }
  }

  updateSingleChecked(group): void {
    if (
      group.children.every(group => group.checked) ||
      group.children.every(group => !group.checked)
    ) {
      group.checkAll = group.children.every(group => group.checked);
      group.indeterminate = false;
    } else {
      group.indeterminate = true;
    }
  }
  reset() { }
  async createRole() {
    this.newRole.modules_ids = this.checkedModulesIds;
    await this.admin.createRole(this.newRole);
    await this.admin.getRolePage();
    this.state = ViewState.List;
  }
  async getRolePage() {
    this.loading = true;
    let result = await this.admin.getRolePage(
      this.pageIndex - 1,
      this.pageSize
    );
    console.log(result);
    let dataSet = result.list;
    dataSet.forEach(data => {
      let ids: number[] = typeof data.modules_ids == 'string' ? JSON.parse(data.modules_ids) : data.modules_ids;
      console.log(ids, this.modules);
      data.modules_ids_str = ids.map(
        id => this.modules.find(mo => mo.id == id) ? this.modules.find(mo => mo.id == id).name : ''
      );
    });
    this.dataSet = dataSet;
    console.log(dataSet);
    this.total = result.total;
    this.loading = false;
  }
  async deleteRole(role_id) {
    this.loading = true;
    await this.admin.deleteRoles([role_id]);
    await this.getRolePage();
    this.loading = false;
  }
  async deleteRoles() {
    this.loading = true;
    let ids = this.dataSet.filter(data => data.checked).map(data => data.id);
    await this.admin.deleteRoles(ids);
    await this.getRolePage();
    this.loading = false;
  }
  constructor(public admin: AdminService) { }

  async ngOnInit() {
    await this.getModuleGroup();
    this.getRolePage();
  }
  get checkedModulesIds() {
    let moduleIds = [];
    this.groups.forEach(group => {
      if (group.indeterminate || group.checkAll) {
        moduleIds.find(id => id == group.id) ? "" : moduleIds.push(group.id);
      }
      group.children.filter(child => child.checked).forEach(child => {
        moduleIds.find(id => id == child.value) ? "" : moduleIds.push(child.id);
      });
    });
    return moduleIds;
  }
  async updateRole() {
    this.selectedRole.modules_ids = this.checkedModulesIds;
    await this.admin.updateRole(this.selectedRole.id, this.selectedRole);
    await this.getRolePage();
    this.state = this.ViewState.List;
  }
}
