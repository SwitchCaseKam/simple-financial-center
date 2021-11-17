import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() public dates: string[] = [];
  @Input() public values: number[][] = [];
  @Input() public title: string = '';
  @Input() public type: string = '';
  @Input() public name: string[] = [''];

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
    this.values.forEach((chartData, index) => {
      this.graph.data.push({ x: this.dates, y: chartData, type: this.type, name: this.name[index]});
    });
    this.graph.layout.title = this.title;
  }
}
