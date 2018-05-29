import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
declare var G2: any;
declare var DataSet: any;
@Component({
  selector: 'app-article-analysis-page',
  templateUrl: './article-analysis-page.component.html',
  styleUrls: ['./article-analysis-page.component.css']
})
export class ArticleAnalysisPageComponent implements OnInit, AfterContentInit, AfterViewInit {
  showLoadingMore: boolean = true;
  loadingMore: boolean = false;
  dataSet = [
    {
      key: '文章数量',
      values: [128, 69, 56, 30, 26, 12, 11, 9, 8, 5, 4, 1, 1, 0]
    },
    {
      key: '评论数量',
      values: [77, 42, 36, 17, 55, 3, 4, 3, 0, 0, 2, 0, 1, 0]
    },
    {
      key: '文章数量',
      values: [128, 69, 56, 30, 26, 12, 11, 9, 8, 5, 4, 1, 1, 0]
    },
    {
      key: '评论数量',
      values: [77, 42, 36, 17, 55, 3, 4, 3, 0, 0, 2, 0, 1, 0]
    },

  ];
  hasMore = true;

  loading: boolean = false;
  constructor() { }

  ngOnInit() {
    // this.renderChart();
  }
  renderChart() {

    var data = [{ year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 }];
    var chart = new G2.Chart({
      container: 'mountNode',
      forceFit: true,
      height: 400,
      width: '100%'
    });
    chart.source(data);
    chart.scale('value', {
      min: 0
    });
    chart.scale('year', {
      range: [0, 1]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line().position('year*value');
    chart.point().position('year*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart.render();
  }
  ngAfterContentInit() {

  }
  ngAfterViewInit() {
    this.renderChart();
    this.renderCategoryCharts();
  }

  renderCategoryCharts() {

    var _DataSet = DataSet,
      DataView = _DataSet.DataView;

    var data = [
      { item: '诗歌', count: 40 },
      { item: '小说', count: 21 },
      { item: '随笔', count: 17 },
      { item: '散文', count: 13 },
      { item: '情感', count: 9 },
      { item: '历史', count: 9 },
      { item: '生活', count: 10 },
      { item: '青春', count: 12 },
      { item: '热点', count: 15 }
    ];
    var dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    var chart = new G2.Chart({
      container: 'category',
      forceFit: true,
      height: 400
    });
    chart.source(dv, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + '%';
          return val;
        }
      }
    });
    chart.coord('theta', {
      radius: 0.75
    });
    chart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    chart.intervalStack().position('percent').color('item').label('percent', {
      formatter: function formatter(val, item) {
        return item.point.item + ': ' + val;
      }
    }).tooltip('item*percent', function (item, percent) {
      percent = percent * 100 + '%';
      return {
        name: item,
        value: percent
      };
    }).style({
      lineWidth: 1,
      stroke: '#fff'
    });
    chart.render();
  }
  onScroll(): void {
    if (this.loading) return;
    this.loading = true;
    if (this.dataSet.length > 14) {
      // this.msg.warning('Infinite List loaded all');
      this.hasMore = false;
      this.loading = false;
      return;
    }

  }
  onLoadMore() {
    this.dataSet.push(...JSON.parse(JSON.stringify(this.dataSet)));
  }
}
