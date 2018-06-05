import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MyHttpService } from "./http.service";
import { NzMessageService } from "ng-zorro-antd";
import { CommonService } from "./common.service";
import { ElectronService } from "./electron.service";
@Injectable()
export class AdminService {
  adminApi = {
    login: "/admin/login",
    systemModule: {
      getModulePage: "/admin/get-modulePage",
      creatModule: "/admin/creat-module", //
      deleteModule: "/admin/delete-module",
      updateModule: "/admin/update-module",
      findModule: "/admin/find-module",
      creatRole: "/admin/creat-role",
      deleteRole: "/admin/delete-role",
      updateRole: "/admin/update-role",
      findRole: "/admin/find-role",
      getRolePage: "/admin/get-role",
      getModuleAll: "/admin/get-module-all",
      creatUser: "/admin/creat-user",
      deleteUser: "/admin/delete-user",
      updateUser: "/admin/update-user",
      getUserList: "/admin/get-user-list",
      getRoleAll: "/admin/get-all-role"
    },
    articleModule: {
      createCategroy: "/admin/create-article-categroy", //新增文章分组
      getArticleTypePage: "/admin/article/get-article-type-page",
      updateCategroy: "/admin/update-article-categroy", //更新文章组

      verifyArticlePage: "/admin/article/verify-article-page",
      deleteCategroy: "/admin/delete-article-categroy", //删除文章分组
      //
      GetArticles: "/admin/get-articles-list", //文章列表
      createArticles: "/admin/create-articles", //新增文章
      deleteArticles: "/admin/delete-articles", //删除文章
      updateArticles: "/admin/update-articles", //更新文章
      getArticleTypeAll: "/admin/get-article-categroy-all",
      recommandArticle: "/admin/recommand-article", //推荐文章  post   articles_id ,is_recommand:boolean
      passArticle: "/admin/pass-article", //通过文章审核
      refuseArticle: "/admin/refuse-article" //文章审核不通过
    }
  };

  passArticle(articles_id: string) {
    return this.api.Post(this.adminApi.articleModule.passArticle, {
      articles_id
    });
  }
  refuseArticle(articles_id: string) {
    return this.api.Post(this.adminApi.articleModule.refuseArticle, {
      articles_id
    });
  }
  recommandArticle(articles_id, is_recommand: boolean) {
    return this.api.Post(this.adminApi.articleModule.recommandArticle, {
      articles_id,
      is_recommand
    });
  }
  needElectronVersionTip = `该功能只在桌面版本中使用,请去下载桌面  http://www.airuanjain.vip/base.rar`;
  get isElectron(): boolean {
    return !!remote;
  }
  updateArticle(articles_id: number, article: IArticles) {
    if (Array.isArray(article.images)) {
      article.images = article.images.join(",");
    }
    return this.api.Post(this.adminApi.articleModule.updateArticles, article, {
      params: { articles_id }
    });
  }
  createArticles(article: IArticles) {
    if (Array.isArray(article.images)) {
      article.images = article.images.join(",");
    }
    return this.api.Post(this.adminApi.articleModule.createArticles, article);
  }
  verifyArticlePage(page = 0, pageSize = 10, keyword?: string) {
    return this.api.Get(this.adminApi.articleModule.verifyArticlePage, {
      params: { page, pageSize, keyword }
    });
  }
  deleteCategroy(article_categroy_ids: number[]) {
    return this.api.Post(this.adminApi.articleModule.deleteCategroy, {
      article_categroy_ids
    });
  }
  updateArticleTypePage(categroys_id: number, articleType: IArticleCategroy) {
    articleType.images = Array.isArray(articleType.images)
      ? articleType.images.join(",")
      : (articleType.images as any);
    return this.api.Post(
      this.adminApi.articleModule.updateCategroy,
      articleType,
      { params: { categroys_id } }
    );
  }

  createCategory(newCategory) {
    if (newCategory.images) {
      newCategory.images = newCategory.images.join(",");
    } else {
      newCategory.images = [].join(",");
    }
    return this.api.Post(
      this.adminApi.articleModule.createCategroy,
      newCategory
    );
  }

  getArticlePage(
    page: number = 0,
    pageSize = 10,
    option?: {
      keyword?: string;
      startTime?: Date;
      endTime?: Date;
      article_categroy_id?: number;
      type?: number;

      sorter?: any;
    }
  ) {
    if (option) {
      if (!option.keyword) delete option.keyword;
      if (!option.startTime) delete option.startTime;
      if (!option.endTime) delete option.endTime;
      if (!option.article_categroy_id) delete option.article_categroy_id;
    }
    return this.api.Get(this.adminApi.articleModule.GetArticles, {
      params: { page, pageSize, option }
    });
  }
  getArticleTypePage(page: number = 0, pageSize = 10) {
    return this.api.Get(this.adminApi.articleModule.getArticleTypePage, {
      params: { page, pageSize }
    });
  }
  getArticleTypeAll() {
    return this.api.Get(this.adminApi.articleModule.getArticleTypeAll);
  }
  getModuleGroup(modules: IModule[]) {
    let groups = [];

    modules.forEach(modu => {
      let isChild = modules.find(mcurrent => mcurrent.id == modu.parent_id);
      /**
       * 属于子模块并且子模块已存在分组中
       * 此时
       *
       */

      let existGroup = groups.find(
        group => group.id + "" == modu.parent_id + ""
      );
      groups.find(group => {
        // console.log(group.id, modu.id);
        return group.id == modu.id;
      });
      // ), groups)};
      if (isChild && existGroup) {
        // console.log(`pushc child`);
        existGroup.children.push({
          label: modu.name,
          value: modu.id,
          id: modu.id,
          link: modu.link,
          checked: false
        });
      } else {
        groups.push({
          id: modu.id,
          value: modu.id,
          label: modu.name,
          link: modu.link,
          checkdAll: false,
          children: []
        });
        console.log(groups);
      }
    });
    return groups;
  }

  async login(username, password) {
    return this.api.Post(
      this.adminApi.login,
      // "/pc/login",

      { username, password }
    );
  }

  updateUser(user_id, user) {
    if (user.id) {
      delete user.id;
    }
    if (user.updated_at) {
      delete user.updated_at;
    }
    delete user.created_at;
    return this.api.Post(this.adminApi.systemModule.updateUser, user, {
      params: { user_id }
    });
  }

  getRolePage(page = 0, pageSize = 10) {
    return this.api.Get(this.adminApi.systemModule.getRolePage, {
      params: { page, pageSize }
    });
  }
  getRoleAll() {
    return this.api.Get(this.adminApi.systemModule.getRoleAll, { params: {} });
  }

  getModuleAll() {
    return this.api.Get(this.adminApi.systemModule.getModuleAll);
  }
  async updateModule(module_id, module: IModule) {
    if (module.id) delete module.id;
    return this.api.Post(this.adminApi.systemModule.updateModule, module, {
      params: { module_id }
    });
  }

  getUserPage(page = 0, pageSize = 10) {
    return this.api.Get(this.adminApi.systemModule.getUserList, {
      params: { page, pageSize }
    });
  }
  deleteUser(user_id: number) {
    return this.api.Post(this.adminApi.systemModule.deleteUser, {
      user_ids: [user_id]
    });
  }
  deleteUsers(user_ids: number[]) {
    return this.api.Post(this.adminApi.systemModule.deleteUser, { user_ids });
  }

  async deleteRoles(role_ids: number[]) {
    return this.api.Post(this.adminApi.systemModule.deleteRole, { role_ids });
  }
  createModule(module: IModule) {
    return this.api.Post(this.adminApi.systemModule.creatModule, module);
  }
  createRole(newRole: IRole) {
    this.api.Post(this.adminApi.systemModule.creatRole, newRole);
  }
  createUser(user: IUser) {
    this.api.Post(this.adminApi.systemModule.creatUser, user);
  }
  deleteModules(module_ids: number[]) {
    return this.api.Post(this.adminApi.systemModule.deleteModule, {
      module_ids
    });
  }
  updateRole(role_id, role) {
    if (Array.isArray(role.modules_ids)) {
      role.modules_ids = JSON.stringify(role.modules_ids) as any;
    }
    if (role.id) {
      delete role.id;
    }

    return this.api.Post(this.adminApi.systemModule.updateRole, role, {
      params: { role_id }
    });
  }

  getModulePage(page = 0, pageSize = 10) {
    return this.api.Get(this.adminApi.systemModule.getModulePage, {
      params: { page, pageSize }
    });
  }

  logout() {
    localStorage.clear();
    return this.router.navigateByUrl("/admin/signin");
  }
  goAdminHome() {
    return this.router.navigateByUrl("/admin");
  }
  get admin() {
    return JSON.parse(localStorage.getItem("admin"));
  }
  createMessage(type: "error" | "success" | "warning", text) {
    return this._message.create(type, `这是一条${text}提示`);
  }
  async downloadMaterialQrcode(url: string) {
    let data = await this.common.getQrcode(url);
    if (this.isElectron) {
      let { filePaths } = await this.electron.dialogFile({
        properties: ["openDirectory"]
      });
      console.log(filePaths);
    } else {
      this._message.create("error", this.needElectronVersionTip);
    }
  }
  getImageMaterials() {
    return this.api.localGetJSON("/assets/material.json");
  }
  constructor(
    private api: MyHttpService,
    public router: Router,
    public _message: NzMessageService,
    public common: CommonService,
    public electron: ElectronService
  ) {}
}
