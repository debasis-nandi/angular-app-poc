import { GlobalUtil } from '../global/global.util';
import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { GlobalConfig, Constants } from '../global/global.config';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../login/login.service';
import { IUser, IUserDetails } from '../login/login';

// Instantiate the ADAL AuthenticationContext
declare var AuthenticationContext: any;

@Injectable()

export class OAuthCallbackHandler implements CanActivate {
    userInfo: IUserDetails = {};

    constructor(private router: Router, private loginService: LoginService) {
        AuthenticationContext = new AuthenticationContext(GlobalConfig.adalConfig());
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        AuthenticationContext.handleWindowCallback();

        if (AuthenticationContext._user) {
            GlobalUtil.setSession("IsAppAuthenticated", true);

            //Moved this code from OAuthCallbackComponent to resolve null in url issue'.
            var userProfile = AuthenticationContext._user["profile"];
            if (userProfile) {
                GlobalUtil.setAppSession("userProfile", userProfile);
                var data: IUserDetails = {};
                
                data.userName = userProfile.given_name + ' ' + userProfile.family_name;
                data.firstName = userProfile.given_name;
                data.lastName = userProfile.family_name;
                data.validUser = true;
                data.imageUrl = "./app/assets/images/profile-pic.png";
                data.token = JSON.stringify(userProfile);

                //Fill details according to environment.
                if (GlobalConfig.environment == Constants.qaEnvironment || GlobalConfig.environment == Constants.devEnvironment) {
                    data.userId = userProfile.oid;
                    data.id = userProfile.oid;
                    data.tid = userProfile.oid;
                    data.email = userProfile.name.split('/')[1];
                    data.region = userProfile.name.split('/')[2];
                }
                else {
                    data.userId = userProfile.upn;
                    data.id = userProfile.upn;
                    data.tid = userProfile.upn;
                   // data.region = userProfile.locality.split('\')[0];
                    data.region = userProfile.locality.split('\\')[0];
                    data.email = userProfile.WindowsAccountName;
                }

                GlobalUtil.setAppSession("UserInfo", data);
                window.location.href = GlobalConfig.urlForBridgeToMyPage;
            }

            return true;
        }
        else {
            if (AuthenticationContext._user == undefined) {
                AuthenticationContext = new AuthenticationContext(GlobalConfig.adalConfig());
            }
            this.router.navigate(['login']);
            return false;
        }
    }

    adalConfig(): any {
        return {
            tenant: 'synclientaad.com',
            clientId: '3cbba47b-f30f-4bf5-9b04-c05bb89cccee',
            redirectUri: window.location.origin + '/',
            postLogoutRedirectUri: window.location.origin + '/',
            tenantId: '34d8d078-1dd9-479c-9dcb-838a670081b3'
        };
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