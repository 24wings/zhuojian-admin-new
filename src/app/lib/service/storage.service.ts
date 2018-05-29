import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
  set user(obj: IUser) {
    localStorage.setItem("user", JSON.stringify(obj));
  }
  set shop_id(shop) {
    localStorage.setItem('shop_id', shop)
  }
  get shop_id() {
    return localStorage.getItem('shop_id');
  }
  set shop_user_name(user_name: string) {
    localStorage.setItem('shop_user_name', user_name)
  }
  get shop_user_name() {
    return localStorage.getItem('shop_user_name');
  }

  get user(): IUser | null {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
  }

  get adminModuleList(): IModule[] {
    return localStorage.getItem("module-list")
      ? JSON.parse(localStorage.getItem("module-list"))
      : [];
  }
  set adminModuleList(modules: IModule[]) {
    localStorage.setItem("module-list", JSON.stringify(modules));
  }

  constructor() { }
}
