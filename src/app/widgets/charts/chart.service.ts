import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import {Observable} from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { IPage, IServiceParams, IInisghts } from './chart';
import { GlobalConfig } from '../../global/global.config';

@Injectable()

export class ChartService {

    //private baseUrl = 'http://localhost:56833/api/CropCorn';
    private baseUrl = GlobalConfig.baseEndpont + GlobalConfig.competitorPagesApi;
    private saveInsightUrl = GlobalConfig.baseEndpont + GlobalConfig.saveInsight;

    constructor(private http: Http) { }

    getData(serviceParams: IServiceParams): Observable<IPage> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl, serviceParams, options)
            .map(this.extractData)
            //.do(consoleData => console.log('ChartsData: ' + consoleData.pageDataMapper.widgets[0].underlyingChartDataViewModel.tableHeaders[0].header))
            .catch(this.handleError);
    }

    getChartSpecificData(serviceParams: IServiceParams): Observable<IPage> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl, serviceParams, options)
            .map(this.extractData)
            //.do(consoleData => console.log('ChartsData: ' + consoleData.pageDataMapper.widgets[0].underlyingChartDataViewModel.tableHeaders[0].header))
            .catch(this.handleError);
    }

    getMockData(): Observable<IPage> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            //.do(consoleData => console.log('ChartsData: ' + consoleData.pageDataMapper.widgets[0].underlyingChartDataViewModel.tableHeaders[0].header))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body || {};

        //let obj = JSON.parse(body)
        //return obj || [];
    }

    private handleError(error: Response): Observable<any> {
        console.log(error);
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
    updateInsightData(insight: IInisghts): Observable<any> {
        return this.http.post(this.saveInsightUrl, insight).map((response: Response) => { });
    }
}