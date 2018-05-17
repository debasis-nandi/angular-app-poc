import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IMyEvent } from './event-calendar';
import { Observable } from 'rxjs/Observable';
import { GlobalConfig } from '../../global/global.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';




@Injectable()
export class EventCalendarService {

    //_baseUrl: string = 'http://localhost:56833/api/Email/sendmail';

    private _baseUrl = GlobalConfig.baseEndpont + GlobalConfig.eventCalendarSave;
    private _baseUrlGet = GlobalConfig.baseEndpont + GlobalConfig.eventCalendarGet;
    private _baseUrlDelete = GlobalConfig.baseEndpont + GlobalConfig.eventCalendarDelete;

    constructor(private _http: Http) { }

    saveEvent(event: IMyEvent): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._baseUrl, event, options)
            .map(this.extractData)
            //.do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getData(selectedDate: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this._baseUrlGet + '/' + selectedDate)
            .map(this.extractData)
            //.do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteData(id: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._baseUrlDelete + '/' + id, options)
            .map(this.extractData)
            //.do(data => console.log(JSON.stringify(data)))
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