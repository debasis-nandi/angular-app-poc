
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IServiceParams } from '../../../widgets/charts/chart';
import { GlobalConfig } from '../../../global/global.config';

@Injectable()
export class MajorAgrochemicalsSeedsService {

    url: string = GlobalConfig.baseEndpont + GlobalConfig.kpiDataEndpoint;
    
    constructor(private _http: Http) { }
    
    getPageData(pageParamsObject: IServiceParams) {
        //debugger;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.url, pageParamsObject, options).map((response: Response) => <any>response.json());
    }   
    
}