import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
//import { IUserUI } from '../Model/UserUI';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { MasterForm } from './admin';

@Injectable()
export class AdminService {
    _UserUIUrl: string;
    sub: any;
    _check: any;
    constructor(private _http: Http) { }


    getForm(url: string, form: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get(url + "?id=" + form,options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    saveForm(url: string, model: any): Observable<any> 
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    updateForm(url: string, model: any, updateid: number): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + "?id=" + updateid, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    saveQueryData(url: string, model: any): Observable<any> {
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, model, options)
            .map(res => { return res });
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}