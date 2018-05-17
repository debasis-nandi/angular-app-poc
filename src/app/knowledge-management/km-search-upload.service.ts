
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchModel } from '../search/search.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class KmSearchService {

    constructor(private _http: Http) { }

    get(url: string): Observable<any> {
        let headers = this.handleHeaders();
        let options = new RequestOptions({ headers: headers });
        return this._http.get(url, options)
            .map((response: Response) => response.json());
    }
    getDocumentById(url: string, docId: string): Observable<any> {
        let headers = this.handleHeaders();
        let options = new RequestOptions({ headers: headers });
        return this._http.get(url + '/' + docId, options)
            .map((response: Response) => response.json());
    }
    getRecentDocs(url: string): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('DocumentId', "");
        params.set('TotalCount', "0");
        return this._http.get(url, { search: params })
            .map((response: Response) => response.json());
    }
    post(url: string, model: any): Observable<SearchModel> {
        let body = JSON.stringify(model);
        let headers = this.handleHeaders();
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response: Response) => response.json());
    }

    saveUploadDoc(url: string, formData: FormData): Observable<any> {
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, formData, options)
            .map(res => { res.json() });
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