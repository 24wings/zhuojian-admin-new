import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-meta-page',
  templateUrl: './product-meta-page.component.html',
  styleUrls: ['./product-meta-page.component.css']
})
export class ProductMetaPageComponent implements OnInit {
  position = 'top';
  tabs = [
    { groupName: '音乐', children: [{ key: 'music_type', type: 'select', chooses: [] }] },
    { groupName: '音乐', children: [{ key: 'music_type', type: 'select', chooses: [] }] },
    { groupName: '音乐', children: [{ key: 'music_type', type: 'select', chooses: [] }] },
    { groupName: '音乐', children: [{ key: 'music_type', type: 'select', chooses: [] }] },
    { groupName: '音乐', children: [{ key: 'music_type', type: 'select', chooses: [] }] },
    { groupName: '音乐', children: [{ key: 'music_type', type: 'select', chooses: [] }] },
    { groupName: '音乐', children: [{ key: 'music_type', type: 'select', chooses: [] }] },
    { groupName: '音乐', children: [{ key: 'music_type', type: 'select', chooses: [] }] },
  ];
  options = [
    { value: 'top', label: 'top' },
    { value: 'left', label: 'left' },
    { value: 'right', label: 'right' },
    { value: 'bottom', label: 'bottom' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
