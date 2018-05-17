import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { IAuthoriseViewModel, IAuthorise } from './authorise';
import { GlobalConfig } from '../../global/global.config';
@Injectable()

export class AuthoriseService {

    private updateUrl = GlobalConfig.baseEndpont + GlobalConfig.updateAuthoriseUser;
    private getDataUrl = GlobalConfig.baseEndpont + GlobalConfig.getUserAuthorisePageData;
    
    constructor(private http: Http) { }

    updateUser(userdetails: IAuthorise): Observable<string> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.updateUrl, userdetails, options)
            .map(this.extractData)
            .do(data =>
                console.log(/*'createProduct: ' + JSON.stringify(data)*/)
            )
            .catch(this.handleError);
    }


    getPageData(): Observable<IAuthoriseViewModel[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.getDataUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    

    private extractData(response: Response) {
        let body = response.json();
        return body;
    }

    private handleError(error: Response): Observable<any> {
        console.log(error);
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}