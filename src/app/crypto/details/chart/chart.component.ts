import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() dates: string[] = [];
  @Input() cryptoIndicatorValues: number[][] = [];
  @Input() title: string = '';
  @Input() type: string = '';

  public graph = {
    data: [{ x: ['0'], y: [0], type: this.type, name: ''}],
    layout: {title: `${this.title}`}
  };

  constructor() { }

  public ngOnInit(): void {
    this.prepareChartsData();  
  }

  private prepareChartsData(): void {
    this.graph.data = [];
    let name = '';
    this.cryptoIndicatorValues.forEach((chartData, index) => {
      if (this.cryptoIndicatorValues.length > 1) {
        if (index === 0) { name = 'highs'};
        if (index === 1) { name = 'lows'};
      }
      this.graph.data.push({ x: this.dates, y: chartData, type: this.type, name: name});
    });
    this.graph.layout.title = this.title;
  }
}
