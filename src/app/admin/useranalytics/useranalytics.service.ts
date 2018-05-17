import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { GlobalConfig } from '../../global/global.config';
import { IUserAnalytics, IUserAnalyticsSearchParams } from './useranalytics.model';
import { IServiceParams } from '../../widgets/charts/chart';

@Injectable()
export class UserAnalyticsService {

    private getUserAnalyticsUrl = GlobalConfig.baseEndpont + GlobalConfig.userAnalyticsApi;
    private getUserAnalyticsPageUrl = GlobalConfig.baseEndpont + GlobalConfig.getUserAnalytics;
    constructor(private _http: Http) { }
    postUserAnalytics(userAnalytics: IUserAnalytics) {
        return this._http.post(this.getUserAnalyticsUrl, userAnalytics)
            .map((response: Response) => { <any>response.json() })
            .catch(this.handleError);
    }
    private handleError(error: Response): Observable<any> {
        console.log(error);
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    getPageData(iUserAnalyticsSearchParams: IUserAnalyticsSearchParams) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('fromDate', iUserAnalyticsSearchParams.fromDate.toDateString());
        params.set('toDate', iUserAnalyticsSearchParams.toDate.toDateString());
        params.set('regionId', iUserAnalyticsSearchParams.regionId.toString());

        return this._http.get(this.getUserAnalyticsPageUrl, { search: params }).map((response: Response) => <any>response.json());
    }
   
}