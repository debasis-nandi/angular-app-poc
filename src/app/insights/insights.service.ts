import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { GlobalConfig } from '../global/global.config';
import { IInsights,InsightStatus} from './insights.model'
@Injectable()
export class InsightsService {
    private saveInsightsUrl = GlobalConfig.baseEndpont + GlobalConfig.saveInsight;
    private getInsightsUrl = GlobalConfig.baseEndpont + GlobalConfig.getInsight;

    constructor(private _http: Http) { }

    saveInsights(_iInsights: IInsights): Observable<InsightStatus> {
        return this._http.post(this.saveInsightsUrl, _iInsights)
            .map((response: Response) => {
              return  <InsightStatus>response.json()
            })
            .catch(this.handleError);
    }

    getInsights(_iInsights: IInsights) {
        return this._http.post(this.getInsightsUrl, _iInsights)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body || {};
    }
    
    private handleError(error: Response): Observable<any> {
        console.log(error);
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

