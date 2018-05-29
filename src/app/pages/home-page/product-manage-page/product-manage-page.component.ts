import { Component, OnInit } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';
@Component({
  selector: 'app-product-manage-page',
  templateUrl: './product-manage-page.component.html',
  styleUrls: ['./product-manage-page.component.css']
})
export class ProductManagePageComponent implements OnInit {
  expandKeys = ['1001', '10001'];

  nodes = [
    new NzTreeNode({
      title: '预约',
      key: 'yuyue',
      children: [
        {
          title: '艺术',
          key: 'artic',
          children: [
            {
              title: '音乐',
              key: 'music',
              isLeaf: true,
            },
            {
              title: 'child2',
              key: '10002',
              isLeaf: true,
              checked: true
            }
          ]
        }]
    }),
    new NzTreeNode({
      title: '竞拍',
      key: 'jingpai',
      children: [{
        title: '古董',
        key: '1002',
        children: [
          {
            title: '清朝',
            key: '10021',
            isLeaf: true,

          },
          {
            title: '南宋',
            key: '10022',
            isLeaf: true,
          }
        ]
      }]
    })
  ];

  mouseAction(name: string, e: any): void {
    console.log(name, e);
  }
  allChecked = false;
  indeterminate = false;
  displayData = [];
  data = [
    {
      id: 1,
      name: 'John Brown',
      image: 'https://data.cmswing.com/-Gt309mzF_HwDdxtjxYCdyZ-.jpg?imageView2/1/w/100',
      age: 32,
      update_at: new Date(),
      checked: false,
      disabled: false,
      total: 56,
      view: 238
    },
    {
      id: 1,
      name: 'John Brown',
      image: 'https://data.cmswing.com/-Gt309mzF_HwDdxtjxYCdyZ-.jpg?imageView2/1/w/100',
      age: 32,
      update_at: new Date(),
      checked: false,
      disabled: false,
      total: 56,
      view: 238
    },
    {
      id: 1,
      name: 'John Brown',
      image: 'https://data.cmswing.com/-Gt309mzF_HwDdxtjxYCdyZ-.jpg?imageView2/1/w/100',
      age: 32,
      update_at: new Date(),
      checked: false,
      disabled: false,
      total: 56,
      view: 238
    },
    {
      id: 1,
      name: 'John Brown',
      image: 'https://data.cmswing.com/-Gt309mzF_HwDdxtjxYCdyZ-.jpg?imageView2/1/w/100',
      age: 32,
      update_at: new Date(),
      checked: false,
      disabled: false,
      total: 56,
      view: 238
    },
    {
      id: 1,
      name: 'John Brown',
      image: 'https://data.cmswing.com/-Gt309mzF_HwDdxtjxYCdyZ-.jpg?imageView2/1/w/100',
      age: 32,
      update_at: new Date(),
      checked: false,
      disabled: false,
      total: 56,
      view: 238
    },
    {
      id: 1,
      name: 'John Brown',
      image: 'https://data.cmswing.com/-Gt309mzF_HwDdxtjxYCdyZ-.jpg?imageView2/1/w/100',
      age: 32,
      update_at: new Date(),
      checked: false,
      disabled: false,
      total: 56,
      view: 238
    },
  ];

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
  constructor() { }

  ngOnInit() {
  }

}
