import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { GlobalConfig } from '../global/global.config';

@Injectable()

export class AdalService {

    //private baseUrl = 'http://localhost:56833/api/CropCorn/Login';
    //private baseUrl = 'http://localhost:56833/api/cifinancials/pagebind';

    private baseUrl = "https://graph.windows.net/synclientaad.com//users/af9d410a-2cde-4d40-87de-2dcdaf984810";

    constructor(private http: Http) { }

    getUserDetails(userObjectId: any): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl, options)
            .map(this.extractData)
            .do(data =>
                console.log(/*'createProduct: ' + JSON.stringify(data)*/)
            )
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