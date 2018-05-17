import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IEmailDetail, IChartDetail } from './email';
import { Observable } from 'rxjs/Observable';
import { GlobalConfig } from '../../global/global.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';




@Injectable()
export class EmailService {

    //_baseUrl: string = 'http://localhost:56833/api/Email/sendmail';

    private _baseUrl = GlobalConfig.baseEndpont + GlobalConfig.emailApi;

    constructor(private _http: Http) { }

    sendMail(_emaildetails: IEmailDetail): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._baseUrl, _emaildetails , options)
            .map(this.extractData)
            //.do(data => console.log('emailSent: ' + JSON.stringify(data)))
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