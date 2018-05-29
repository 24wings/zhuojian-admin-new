import { Component, OnInit, AfterContentInit } from "@angular/core";
import {
  AdminService,
  CommonService,
  MyHttpService,
  EditormdService,
  StorageService
} from "../../../lib";
import { UploadFile } from "ng-zorro-antd";
import { Observable } from "rxjs";
import * as $ from "jquery";
enum ViewState {
  List = 1,
  Create,
  Update
}
@Component({
  selector: "app-article-manage-page",
  templateUrl: "./article-manage-page.component.html",
  styleUrls: ["./article-manage-page.component.css"]
})
export class ArticleManagePageComponent implements OnInit, AfterContentInit {
  editor: EditorClass;
  ViewState = ViewState;
  state = ViewState.List;
  dateRange = [];
  dataSet: any[] = [];

  author: string = "";
  fileList: any[] = [];

  total: number = 20;
  previewImage = "";
  loading: boolean = false;
  previewVisible = false;

  editNewArticleDate: boolean = false;
  newArticle: IArticles = {
    article_categroy_id: 0,
    title: "",
    images: [],
    content: "",
    created_at: new Date(),
    is_recommand: false,
    content_md: ""
  };
  is_recommand: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 10;
  keyword: string = "";
  articleTypes: IArticleCategroy[] = [];
  selectedArticle: IArticles;
  selectedArticleCategoryId: number;

  constructor(
    public admin: AdminService,
    public common: CommonService,
    public myHttp: MyHttpService,
    public editorService: EditormdService,
    public storage: StorageService
  ) {
    this.author = this.storage.user.nickname || this.storage.user.username;
  }

  async ngOnInit() {
    await this.getArticleTypeAll();
    await this.getArticlePage();
  }
  async createArticle() {
    let newArticle = await this.admin.createArticles(this.newArticle);
    await this.getArticlePage();
  }
  async getArticlePage() {
    let result = await this.admin.getArticlePage(
      this.pageIndex - 1,
      this.pageSize,
      {
        keyword: this.keyword,
        startTime: this.dateRange.length > 0 ? this.dateRange[0] : "",
        endTime: this.dateRange.length > 1 ? this.dateRange[1] : "",
        article_categroy_id: this.selectedArticleCategoryId
          ? this.selectedArticleCategoryId
          : ("" as any)
      }
    );
    this.dataSet = result.rows;
    this.total = result.count;
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
    this.fileList.push({ url: result.url, uid: result.id });

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
  async ngAfterContentInit() {}

  deleteArticle(article_id) {}
  deleteArticles() {}
  async initEditor(content_md?: string) {
    let md;
    if (content_md) {
      md = content_md;
    } else {
      md = await this.myHttp
        .localGet("/assets/test.md")
        .then(rtn => rtn.text());
    }
    console.log(md);
    setTimeout(async () => {
      this.editor = await this.editorService.initEditor("test-editormd", md);
    }, 1000);
  }
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };
  async getArticleTypeAll() {
    this.articleTypes = await this.admin.getArticleTypeAll();
  }
  public checkNewArticle(): { ok: boolean; data?: string } {
    if (this.newArticle.article_categroy_id == 0) {
      return { ok: false, data: "请选择文章类别" };
    }

    return { ok: true, data: "" };
  }
  selectArticle(article: IArticles) {
    this.state = ViewState.Update;
    this.selectedArticle = article;
    this.fileList = (article.images ? (article.images as string[]) : [])
      // .split(",")
      .filter(url => url)
      .map((url, i) => {
        return { url, uid: i, status: "done" };
      });

    this.initEditor(this.selectedArticle.content_md);
  }
  public async publishArticle() {
    let validator = this.checkNewArticle();
    if (validator.ok) {
      this.newArticle.images = this.fileList.map(file => file.url);
      this.newArticle.content = this.editor.getHTML();
      this.newArticle.content_md = this.editor.getMarkdown();
      console.log(this.newArticle);
      await this.admin.createArticles(this.newArticle);
      await this.getArticlePage();
      this.state = ViewState.List;
    } else {
      this.admin._message.error(validator.data);
    }
  }
  async updateArticle() {
    this.selectedArticle.content_md = this.editor.getMarkdown();
    this.selectedArticle.content = this.editor.getHTML();
    this.selectedArticle.images = this.fileList.map(file => file.url).join(",");
    await this.admin.updateArticle(
      this.selectedArticle.id,
      this.selectedArticle
    );
    await this.admin.getArticlePage();
    this.state = ViewState.List;
  }
  async toggleRecommand(articles_id, is_recommand) {
    await this.admin.recommandArticle(articles_id, is_recommand);
    await this.getArticlePage();
  }
}
