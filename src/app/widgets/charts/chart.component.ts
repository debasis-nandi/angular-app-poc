import { Component, Input} from '@angular/core';
import * as FusionCharts from 'fusioncharts';
import { IChartComponentViewModel } from './chart';

@Component({
    moduleId: module.id,
    selector: 'my-chart',
    templateUrl: 'chart.component.html'

})
export class ChartComponent {

    @Input() charts: IChartComponentViewModel[];
    @Input() chartId: number;

    constructor() {
        FusionCharts.ready(function () {
        });
    }



}




