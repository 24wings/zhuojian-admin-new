import { Component, OnInit } from "@angular/core";

import { PcClientService, CommonService, AdminService } from "../../../lib";
import * as $ from "jquery";
import { ENGINE_METHOD_DIGESTS } from "constants";

declare var document: any;
declare var window: any;
enum ViewState {
  ListMaterial,
  ListTickets,
  CreateMaterial
}
@Component({
  selector: "app-material-page",
  templateUrl: "./material-page.component.html",
  styleUrls: ["./material-page.component.css"]
})
export class MaterialPageComponent implements OnInit {
  mode = 1;
  showLinkModal: boolean = false;
  showLinkModal2: boolean = false;
  showLinkModal3: boolean = false;
  showFileModal: boolean = false;
  state = ViewState.ListMaterial;
  keyword: string = "";
  ViewState = ViewState;
  pageIndex: number = 0;
  pageSize = 10;
  loading: boolean = true;
  total = 1;
  dataSet = [];
  images: any[] = [];
  showPublishModal: boolean = false;
  selectedTheme = 1;
  ticketsDataSet = [];

  selectedMaterial = {
    home_image_urls: [],
    ticket_image_urls: [],
    share_image_url: ""
  };
  imageGroups: any[] = [];
  constructor(
    public pcClient: PcClientService,
    public common: CommonService,
    public admin: AdminService
  ) {}

  async ngOnInit() {
    await this.searchData();
    await this.searchTickets();
    await this.getImageMaterials();
  }
  usersClaimGroup: {
    user_id?: number;
    user_name: string;
    can_give_other: boolean;
    home_image_url: string;
    shop_phone: any;
    children: any[];
  }[] = [];

  listMaterials() {}

  removeHomeImageUrl(home_image_url) {
    let i = this.selectedMaterial.home_image_urls.findIndex(
      url => url == home_image_url
    );
    this.selectedMaterial.home_image_urls.splice(i, 1);
  }

  async searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }

    let result = await this.pcClient.listCouponAndMaterialByShopId();
    // result.total = result.total;
    this.dataSet = result;
    console.log(this.dataSet);
    this.loading = false;
  }
  async modifyHomeImageUrl() {
    let base64 = await this.common.selectFile();
    let result = await this.common.uploadImage(base64);
    this.selectedMaterial.home_image_urls.push(result.url);
  }
  selectMaterial(material) {
    this.selectedMaterial = material;
    this.selectedTheme = this.selectedMaterial["theme_type"];
    // if (!this.selectedMaterial.home_image_urls)
    // this.selectedMaterial.home_image_urls.push(`http://store.airuanjian.vip/material/02.png`);
    if (!this.selectedMaterial.share_image_url)
      this.selectedMaterial.share_image_url = `http://store.airuanjian.vip/material/default-share-image-url.png`;
    // if (!this.selectedMaterial.ticket_image_url)
    // this.selectedMaterial.ticket_image_url = `http://store.airuanjian.vip/material/04.png`;
  }
  async modifyTicketImageUrl() {
    let base64 = await this.common.selectFile();
    let result = await this.common.uploadImage(base64);
    this.selectedMaterial.ticket_image_urls.push(result.url);
  }
  async modifyShareImageUrl() {
    let base64 = await this.common.selectFile();
    let result = await this.common.uploadImage(base64);
    this.selectedMaterial.share_image_url = result.url;
  }
  async beforeUpload(file: File) {
    return true;
  }

  async handleChange(info: { file: any }, type: 1 | 2 | 3) {
    console.log(info.file);
    if (info.file.status === "uploading") {
      this.loading = true;
    }

    let base64 = await this.common.convertFileToBase64(info.file.originFileObj);
    this.loading = false;
    let result = await this.common.uploadImage(base64);
    switch (type) {
      case 1:
        this.selectedMaterial.home_image_urls.push(result.url);
        break;
      case 2:
        this.selectedMaterial.ticket_image_urls.push(result.url);
        break;
      default:
        this.selectedMaterial.share_image_url = result.url;
        break;
    }
  }
  changeMode($event) {
    console.log((this.mode = $event + 1));
  }
  async createMaterial() {
    console.log(this.selectedMaterial);
    this.loading = true;
    this.selectedMaterial[
      "home_image_url"
    ] = this.selectedMaterial.home_image_urls.join(",");
    this.selectedMaterial[
      "ticket_image_url"
    ] = this.selectedMaterial.ticket_image_urls.join(",");
    this.selectedMaterial["theme_type"] = this.selectedTheme;
    console.log(this.selectedMaterial);
    await this.pcClient.createMaterial(this.selectedMaterial);

    await this.searchData();
    this.state = ViewState.ListMaterial;
    this.loading = false;
  }
  async downloadMaterialQrcode(material_id) {
    let base64 = await this.common.getQrcode(
      `http://www.airuanjian.vip/authUrl?material_id=${material_id}`
    );
    let result = await this.common.uploadImage(base64);
    var $a = document.createElement("a");
    $a.setAttribute("href", result.url);
    $a.setAttribute("download", "");
    $a.click();
  }
  async searchTickets() {
    let result = await this.pcClient.getTicketsByKeyword(this.keyword);
    let { users, claims } = result;
    users.forEach(user => {
      claims.forEach(claim => {
        if (claim.member_id == user.user_id) {
          user.children ? user.children.push(claim) : (user.children = [claim]);
        }
      });
    });
    this.usersClaimGroup = users;
    // debugger;
    console.log(this.usersClaimGroup);
  }
  async getImageMaterials() {
    let result = await this.admin.getImageMaterials();
    this.imageGroups = result.data;
    this.selectImageGroup();
  }
  selectImageGroup(name?) {
    if (name) {
      this.images = this.imageGroups.find(
        group => group.groupName == name
      ).children;
    } else {
      let images = [];
      this.imageGroups.forEach(group =>
        group.children.forEach(image => images.push(image))
      );
      this.images = images;
    }
  }
  copyText(text: string) {
    let textareaEl = document.createElement("textarea");
    textareaEl.value = text;
    textareaEl.innerText = text;
    document.body.append(textareaEl);
    textareaEl.select(); // 选择对象
    document.execCommand("Copy");
    alert("复制成功");
  }
}
