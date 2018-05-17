import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Insight } from './datalist.model';
import { IInsights } from '../insights.model'

import { Observable } from 'rxjs/Observable';
import { GlobalConfig } from '../../global/global.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataListService {
    private getInsightsUrl = GlobalConfig.baseEndpont + GlobalConfig.getInsight;
    constructor(private _http: Http) { }

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