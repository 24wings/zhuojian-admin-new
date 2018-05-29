import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../../lib";
enum ViewState {
  List = 1,
  Create,
  Update
}
@Component({
  selector: "app-module-page",
  templateUrl: "./module-page.component.html",
  styleUrls: ["./module-page.component.css"]
})
export class ModulePageComponent implements OnInit {
  allChecked: boolean = false;
  indeterminate: boolean = false;
  ViewState = ViewState;
  state = ViewState.List;

  newModule: IModule = {
    name: "",
    user_module_name: "",
    sort: 100,
    parent_id: 10,
    icon_font: "",
    link: ""
  };

  sortMap = {
    name: null,
    age: null,
    address: null
  };
  selectedModule: IModule;
  dataSet: IModule[] = [];

  async getModulePage() {
    this.loading = true;
    let result = await this.admin.getModulePage(
      this.pageIndex - 1,
      this.pageSize
    );
    this.dataSet = result.list;

    this.total = result.total;
    this.loading = false;
  }
  checkAll($event) {
    this.dataSet.forEach(data => (data.checked = true));
  }
  get checkedNum() {
    return 0;
  }

  pageIndex = 1;
  pageSize = 10;
  total = 100;
  loading = true;
  sortValue = null;
  sortKey = null;

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
  }

  constructor(public admin: AdminService) {}

  search($event) {
    console.log(this.sortMap);
  }

  ngOnInit(): void {
    this.getModulePage();
  }
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log("Button ok clicked!");
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
  async createModule() {
    if (!this.newModule.parent_id) delete this.newModule.parent_id;
    this.newModule.user_module_name = this.newModule.name;
    await this.admin.createModule(this.newModule);
    await this.getModulePage();
  }
  async deleteModule(id) {
    this.loading = true;
    await this.admin.deleteModules([id]);
    await this.getModulePage();
    this.loading = false;
  }
  async deleteModules() {
    this.loading = true;
    await this.admin.deleteModules(
      this.dataSet.filter(data => data.checked).map(data => data.id)
    );
    await this.getModulePage();
    this.loading = false;
  }
  async updateModule() {
    this.loading = true;
    await this.admin.updateModule(this.selectedModule.id, this.selectedModule);
    await this.getModulePage();
    this.loading = false;
  }
}
