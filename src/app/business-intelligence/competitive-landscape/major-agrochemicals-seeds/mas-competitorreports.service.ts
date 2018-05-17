import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { INewsData } from './mas-news.model';
import { GlobalConfig, Page } from '../../../global/global.config';
import { GlobalUtil } from '../../../global/global.util';
import { IServiceParams } from '../../../widgets/charts/chart';


@Injectable()
export class MASCompetitorReportsService {

    constructor(private _http: Http) { }

    private _baseUrl = GlobalConfig.baseEndpont + GlobalConfig.CiCompetitorReportApi;
    private _baseUrlget = GlobalConfig.baseEndpont + GlobalConfig.CiCompetitorReportget;

    getPageData(pageParamsObject: IServiceParams) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._baseUrl, pageParamsObject, options).map((response: Response) => <any>response.json());
    }

    get(CompetitorId: any): Observable<any> {
        return this._http.get(this._baseUrlget + '/' + CompetitorId)
            .map(this.extractData)            
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body || {};
    }

    private handleError(error: Response): Observable<any> {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}