import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { Http, RequestOptions, RequestOptionsArgs } from "@angular/http";
import { MyHttpService } from "./http.service";
import { StorageService } from "./storage.service";
@Injectable()
export class PcClientService {
  get pcIp() {
    return "http://47.100.23.203";
  }

  get shop_id() {
    return localStorage.getItem("shop_id");
  }
  set shop_id(str: string) {
    localStorage.setItem("shop_id", str);
  }
  pcClientApi = {
    login: "/pc/login",
    listMaterials: "/pc/list-shop-materials",
    createMaterial: "/create-material",
    uploadImage: "/common/upload/image",
    listCouponAndMaterialByShopId: "/pc/list-coupin-and-material-by-shop_id",
    getTicketsByKeyword: "/pc/get-tickets-by-keyword",
    uploadShopImage: "/api/shop/upload-image",
    getShopImages: "/api/shop/get-shop-images" // ?shop_id  body:
  };

  getTicketsByKeyword(keyword: string) {
    return this.http.Get(this.pcClientApi.getTicketsByKeyword, {
      params: { keyword, shop_id: this.storage.shop_id }
    });
  }

  async uploadShopImage(base64: string) {
    return await this.http.Post(
      this.pcClientApi.uploadShopImage,
      {
        base64
      },
      { params: { shop_id: this.shop_id } }
    );
  }

  /**
   * 
   *  .get("/auth", home.index)
    .get("/", home.index)
    .get("/authUrl", home.getAuthUrl)
    .post("/test/upload", home.uploadBase64Test)
    .get("/getImage", home.getImage)
    .get("/getAuthCode", home.sendAuthCode)
    .post("/signup", home.signup)
    .post("/create-material", home.createMaterial)
    .get("/material", home.getMaterial)
    .get("/pc/list-shop-materials", home.listMaterial)
    .post("/pc/update-shop-material", home.updateMaterial)
    .get("/pc/get-shop-tickets", home.getShopTickets)
    .get("/pc/get-tickets-by-keyword", home.getTciketsByKeyword);
   * 
   */
  listCouponAndMaterialByShopId() {
    return this.http.Get(this.pcClientApi.listCouponAndMaterialByShopId, {
      params: { shop_id: this.shop_id }
    });
  }

  /** base64数据 */
  url2Qrcode(url: string): Promise<string> {
    return this.http.Post(`/api.url2Qrcode.go`, { url });
  }
  login(shop_id: string, password: string) {
    return this.http.Post(this.pcClientApi.login, {
      shop_id,
      password
    });
  }
  getShopImages() {
    return this.http.Get(this.pcClientApi.getShopImages, {
      params: { shop_id: this.shop_id }
    });
  }

  /**发送验证码 */
  async getAuthCode(phone: string) {
    return await this.http.Post("/sale.signupAuthCode.go", {
      phone
    });
  }
  async listMaterials(page: number = 0, size: number = 10) {
    return this.http.Get(this.pcClientApi.listMaterials, {
      params: { shop_id: this.shop_id, page, size }
    });
  }
  async createMaterial(material: IMaterial) {
    material.shopuser_id = this.storage.shop_id as any;
    return this.http.Post(this.pcClientApi.createMaterial, {
      shopuser_id: this.storage.shop_id,
      home_image_url: material.home_image_url,
      ticket_image_url: material.ticket_image_url,
      share_image_url: material.share_image_url,
      coupon_id: material.coupon_id2,
      theme_type: material.theme_type
    });
  }
  async uploadBase64(base64: string) {
    return this.http.Post(this.pcClientApi.uploadImage, { base64 });
  }

  constructor(public http: MyHttpService, public storage: StorageService) {}
}
