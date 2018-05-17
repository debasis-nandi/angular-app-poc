import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { IUser, IUserDetails, IUserInfo } from '../login//login';
import { GlobalConfig } from '../global/global.config';
import { GlobalUtil } from '../global/global.util';

@Injectable()
export class BridgeToMyPageService {

    //private baseUrl = 'http://localhost:56833/api/CropCorn/Login';
    //private baseUrl = 'http://localhost:56833/api/cifinancials/pagebind';

    private baseUrl = GlobalConfig.baseEndpont + GlobalConfig.loginApi;
    private getSetUserInfoUrl = GlobalConfig.baseEndpont + GlobalConfig.getSetUserInfoApi;

    constructor(private http: Http) {
    }

    getUserDetails(user: IUser): Observable<IUserDetails> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl, user, options)
            .map(this.extractData)
            .do(data =>
                console.log(/*'createProduct: ' + JSON.stringify(data)*/)
            )
            .catch(this.handleError);
    }

    getUserInfo(userInfo: IUserInfo): Observable<IUserInfo> {
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.getSetUserInfoUrl, userInfo, options)
            .map(this.extractData)
            .do(data => {
                //console.log()
            }).catch(this.handleError);
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