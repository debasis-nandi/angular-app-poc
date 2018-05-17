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
export class MASNewsService {

    constructor(private _http: Http) { }

    private _baseUrl = GlobalConfig.baseEndpont + GlobalConfig.CiNewsApi;

    get(ModuleId: any): Observable<any> {
        return this._http.get(this._baseUrl + '/' + ModuleId)
            .map(this.extractData)
            //.do(data => console.log(data))
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

    getUrlInfo(url: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('url', url);
        params.set('isValid', "true");
        return this._http.get(GlobalConfig.baseEndpont + GlobalConfig.GetUrlExists, { search: params }).map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    getPageData(pageParamsObject: IServiceParams) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(GlobalConfig.baseEndpont + GlobalConfig.CiNewsApi, pageParamsObject, options).map((response: Response) => <any>response.json());
    }
}