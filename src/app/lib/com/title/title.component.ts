import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Route, NavigationEnd } from '@angular/router';
import { ConfigService } from '../../service/config.service';
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  currentRoute: Route;
  currentSecondRoute: Route;
  constructor(public config: ConfigService, public title: Title) {
    this.logRouter();
    this.config.route.queryParamMap.forEach(rtn => console.log(rtn));
    this.config.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.logRouter();
      }
    });

  }

  ngOnInit() {
  }
  logRouter() {
    let paths = location.pathname.split('/');//.filter(path => path !== '/' && path !== '');

    // console.log(paths);
    this.currentRoute = this.config.router.config.find(route => route.path === paths[0]);

    this.changeTitle(this.currentRoute.data ? this.currentRoute.data.title : '');
    if (this.currentRoute && this.currentRoute.children) {
      console.log('寻找二级路由');
      this.currentSecondRoute =
        this.currentRoute.children.find(secondRoute => secondRoute.path === paths[1])
        || this.currentRoute.children.find(secondRoute => secondRoute.path === '');
      this.changeTitle(this.currentSecondRoute.data ? this.currentSecondRoute.data.title : '');
    }

  }
  changeTitle(title: string) {
    this.title.setTitle(title)

  }
}
