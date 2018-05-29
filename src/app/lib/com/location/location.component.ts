import { Component, OnInit, AfterContentInit, Input } from "@angular/core";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"]
})
export class LocationComponent implements OnInit, AfterContentInit {
  @Input() location: { lng: any; lat: any };
  constructor() {}
  ngAfterContentInit() {
    var map = new BMap.Map("allmap");
    let point = new BMap.Point(this.location.lng, this.location.lat);
    var marker = new BMap.Marker(point); // 创建标注
    map.addOverlay(marker);
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);
  }

  ngOnInit() {
    // 百度地图API功能
    // 用经纬度设置地图中心点
    // function theLocation(){
    // 	if(document.getElementById("longitude").value != "" && document.getElementById("latitude").value != ""){
    // 		map.clearOverlays();
    // 		var new_point = new BMap.Point(document.getElementById("longitude").value,document.getElementById("latitude").value);
    // 		var marker = new BMap.Marker(new_point);  // 创建标注
    // 		map.addOverlay(marker);              // 将标注添加到地图中
    // 		map.panTo(new_point);
    // 	}
    // }
  }
}
