
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers, XHRBackend } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { GlobalUtil } from '../global/global.util';
import { GlobalConfig } from '../global/global.config';

declare var AuthenticationContext: any;

@Injectable()
export class InterceptedHttp extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private router: Router) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
        //return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
        //return super.get(url, options);
    }
    
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
        //return super.post(url, body, options);
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
        //return super.put(url, body, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
        //return super.delete(url, options);
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        //options.headers.append('UserId', GlobalUtil.getAppSession("UserInfo").userId);
        //options.headers.append('UserAuthToken', GlobalUtil.getAppSession("UserInfo").userToken);
        if (GlobalUtil.getAppSession("UserInfo").userRoles) {
            options.headers.append('RoleId', GlobalUtil.getAppSession("UserInfo").userRoles[0].id);
        }

        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if ((err.status == 401 || err.status == 403)) {
                //return Observable.empty();
                GlobalUtil.clearAppSession("UserInfo");
                GlobalUtil.clearAppSession("RequestedUrl");

                if (GlobalConfig.isAadAuth) {
                    GlobalUtil.clearSession("IsAppAuthenticated");
                    if (AuthenticationContext._user == undefined) {
                        AuthenticationContext = new AuthenticationContext(GlobalConfig.adalConfig());
                    }
                    AuthenticationContext.logOut();
                }
                else {
                    this.router.navigateByUrl('login');
                }
            }

            return Observable.throw(err);
        });
    }

}