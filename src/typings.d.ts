/// <reference path="./typings/editormd.d.ts" />
/// <reference types="electron" />
/* SystemJS module definition */
// import 'jquery';
// declare var $: JQueryStatic;

declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var remote: Electron.Remote;
declare type OpenDialogOptions = Electron.OpenDialogOptions;

declare var wx: any;
declare var WeixinJSBridge: any;

interface Admin {
  _id?: string;
  nickname: string;
  phone: string;
  password: string;
  repassword?: string;
}

declare var BMap: any;

interface IMaterial {
  coupon_id?: number;
  coupon_id2?: number;
  created_at?: Date;
  home_image_url?: string;
  id?: number;
  share_image_url?: string;
  shop_phone?: string;
  shopuser_id?: number;
  ticket_image_url?: string;
  updated_at?: Date;
  reg_give?: boolean;
  can_share?: boolean;
  can_give_other?: boolean;
  theme_type: number;
}

interface IModule {
  id?: number;
  name?: string; //选择的模块分类，用户下拉选择
  parent_id?: number;
  parent?: string;
  user_module_name?: string; //栏目名称 用户自定义；
  key_word?: string;
  link?: string;
  sort?: number; //排序
  icon_font?: string;
  can_delete?: boolean;
  checked?: boolean;
}

interface IRole {
  id?: number;
  name?: string;
  modules_ids?: number[];
  modules_ids_str?: string[];
}

interface IUser {
  id?: number;
  phone?: string;
  username?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
  nickname?: string;
  checked?: boolean;
  role_id?: number;
  role?: any;
}
