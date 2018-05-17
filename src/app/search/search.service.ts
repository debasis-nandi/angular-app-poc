
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class SearchService {

    constructor(private _http: Http) { }

    get(url: string): Observable<any> {
        let headers = this.handleHeaders();
        let options = new RequestOptions({ headers: headers });
        return this._http.get(url, options)
            .map((response: Response) => response.json());
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