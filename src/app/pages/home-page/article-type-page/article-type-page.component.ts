import { Component, OnInit } from "@angular/core";
import { NzMessageService, UploadFile } from "ng-zorro-antd";
import { AdminService, CommonService, MyHttpService } from "../../../lib";
import { Observable } from "rxjs";
enum ViewState {
  List = 1,
  Create,
  Update
}
@Component({
  selector: "app-article-type-page",
  templateUrl: "./article-type-page.component.html",
  styleUrls: ["./article-type-page.component.css"]
})
export class ArticleTypePageComponent implements OnInit {
  loading: boolean = false;
  newUser = {};
  pageIndex = 0;
  pageSize = 10;
  selectedArticle: IArticles;
  allChecked: boolean = false;
  indeterminate: boolean = false;
  ViewState = ViewState;
  newArticleType: IArticleCategroy = {
    name: "",
    images: [],
    sort: 11
  };
  fileList: any[] = [];
  previewImage = "";
  previewVisible = false;
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  dataSet: IArticleCategroy[] = [];
  state = ViewState.List;
  total = 100;
  // 更新
  selectedArticleType: IArticleCategroy;

  constructor(
    public admin: AdminService,
    public common: CommonService,
    private msg: NzMessageService,
    public myHttp: MyHttpService
  ) {}

  ngOnInit() {
    this.getArticleTypePage();
  }
  async getArticleTypePage() {
    let result = await this.admin.getArticleTypePage(
      this.pageIndex,
      this.pageSize
    );
    this.total = result.total;
    this.dataSet = result.list;
  }
  upload = async item => {
    // await this.
    // this.fileList.push({
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // });
    let base64 = await this.common.convertFileToBase64(item.file);
    let result = await this.common.uploadImage(base64);
    this.fileList.push({ url: result.url, uid: result.id, status: "done" });

    return (
      Observable.of({}).subscribe(
        () => {
          let clearUpload = setTimeout(() => {
            let i = this.fileList.findIndex(file => file.status == "uploading");
            if (i >= 0) {
              this.fileList = this.fileList.filter(
                file => file.status != "uploading"
              );
              console.log(this.fileList);
              // clearInterval(clearUpload);
            }
          }, 1000);
          console.log(`success`, this.fileList);
        },
        () => {
          console.log(`error`);
        }
      ),
      () => {
        console.log("process");
      }
    );
  };
  nzData = async file => {
    return await this.common.convertFileToBase64(file);
  };

  beforeUpload = async item => {
    console.log(item);
    return false;
  };
  async createArticleCategory() {
    this.loading = true;
    this.newArticleType.images = this.fileList.map(file => file.url);
    await this.admin.createCategory(this.newArticleType);
    this.state = ViewState.List;
    this.loading = false;
  }

  async deleteArticleCategory(id) {
    await this.admin.deleteCategroy([id]);
    await this.getArticleTypePage();
  }
  async deleteArticleCategorys() {
    await this.admin.deleteCategroy(
      this.dataSet.filter(item => item.checked).map(item => item.id)
    );
    await this.getArticleTypePage();
  }
  async selectArticleType(articleType: IArticleCategroy) {
    this.selectedArticleType = articleType;
    this.fileList = this.selectedArticleType.images.map(url => {
      return { url, status: "done", name: "", uid: Math.random() };
    });
  }
  async updateArticleUpdate() {
    await this.admin.updateArticleTypePage(
      this.selectedArticleType.id,
      this.selectedArticleType
    );
    await this.getArticleTypePage();
  }
}
