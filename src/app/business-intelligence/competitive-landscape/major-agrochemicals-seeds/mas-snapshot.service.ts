
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ICompanySnapshotDescription, IPageParams } from './mas-snapshot.model';
import { GlobalConfig } from '../../../global/global.config';
import { GlobalUtil } from '../../../global/global.util';
import { IServiceParams } from '../../../widgets/charts/chart';

@Injectable()
export class MASSnapshotService {
    
    constructor(private _http: Http) { }

    get(url: string): Observable<any> {
        return this._http.get(url).map((response: Response) => <any>response.json());
    }   

    setSnapshotData(snapshotDescription: ICompanySnapshotDescription): Observable<any> {
        return this._http.post(GlobalConfig.baseEndpont + GlobalConfig.updateSnapshotDescription, snapshotDescription).map((response: Response) => <any>response.json());
    }

    getPageData(pageParamsObject: IServiceParams) {        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(GlobalConfig.baseEndpont + GlobalConfig.snapshotPageLoad, pageParamsObject, options).map((response: Response) => <any>response.json());
    }    
       
}