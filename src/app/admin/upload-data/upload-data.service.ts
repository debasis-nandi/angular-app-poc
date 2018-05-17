
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class UploadDataService {

    constructor(private _http: Http) { }

    get(url: string): Observable<any> {
        let headers = this.handleHeaders();
        let options = new RequestOptions({ headers: headers });
        return this._http.get(url, options)
            .map((response: Response) => response.json());
    }

    postUploadData(url: string, formData: any, moduleId: number, isUpdate: boolean, userRegion: string): Observable<any> {
        //let headers = new Headers({
        //    'ModuleId': moduleId
        //});
        let params: URLSearchParams = new URLSearchParams();
        params.set('isUpdate', isUpdate.toString());
        params.set('moduleId', moduleId.toString());
        params.set('userRegion', userRegion.toString());
       // let options = new RequestOptions({ headers: headers });
        return this._http.post(url, formData, {search:params})
            .map((response: Response) =>
            {
                return response.json()
            });
    }

    private handleHeaders(): Headers {
        return new Headers({
            'Content-Type': 'application/json'
        });
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }
}
