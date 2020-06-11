import { Component, OnInit } from '@angular/core';
import { ChartsModule, Label, MultiDataSet } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  public doughnutChartLabels: Label[] = ['Traumatología', 'Medicina General', 'Cirugía'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [ '2014', '2015','2016', '2017', '2018', '2019', '2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Radiografías' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Análisis de sangre' }
  ];



  constructor() { }

  ngOnInit(): void {
  }

}
