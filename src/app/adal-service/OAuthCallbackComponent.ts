import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { GlobalConfig } from '../global/global.config';
import { GlobalUtil } from '../global/global.util';

//import { AdalService } from './../services/adal.service';

import { IUser, IUserDetails, IUserInfo } from '../login/login';
import { LoginService } from '../login/login.service';

// Instantiate the ADAL AuthenticationContext
declare var AuthenticationContext: any;

@Component({
    template: '<div></div>',
    providers: [LoginService]
})

export class OAuthCallbackComponent implements OnInit {

    data: IUserDetails = {};
    userInfo: IUserInfo = {};

    constructor(private router: Router, private loginService: LoginService) {
        
        if (AuthenticationContext) {
            AuthenticationContext.config.redirectUri = GlobalConfig.redirectUri;
            var token = AuthenticationContext.getCachedToken(GlobalConfig.clientId);
            if (token) {
                //var userProfile = AuthenticationContext._user["profile"];
                //debugger;
                ////this.data.email = userProfile.unique_name;
                ////this.data.userName = userProfile.given_name + ' ' + userProfile.family_name;
                //this.data.email = userProfile.unique_name;
                //this.data.userName = userProfile.given_name + ' ' + userProfile.family_name;
                //this.data.userId = userProfile.oid;
                //this.data.tid = userProfile.tid;
                //this.data.firstName = userProfile.given_name;
                //this.data.lastName = userProfile.family_name;
                //this.data.userToken = token;
                //this.data.validUser = true;
                //this.data.imageUrl = "./app/assets/images/profile-pic.png";

                //this.data.region = "Global";
                //this.data.regionId = 27;
                //this.data.roles = ['User'];
                //GlobalUtil.setAppSession("UserInfo", this.data);

                //this.userInfo.id = userProfile.oid;
                //this.userInfo.email = userProfile.unique_name;
                //this.userInfo.firstName = userProfile.given_name;
                //this.userInfo.lastName = userProfile.family_name;
                //this.userInfo.token = token;
                //this.userInfo.tid = userProfile.tid;

                
                /*this.loginService.getUserInfo(this.userInfo).subscribe(
                    info => {
                        this.userInfo = info;
                        this.data.region = this.userInfo.region;
                        this.data.regionId = this.userInfo.regionId;
                        this.data.accessLevel = this.userInfo.accessLevel;
                        this.data.roles = this.userInfo.userRoles.map(x => x.role);
                        this.data.userGroup = this.userInfo.userGroup;
                        
                        GlobalUtil.setAppSession("UserInfo", this.data);
                        GlobalConfig.environment = this.data.environment;

                        if (GlobalUtil.getAppSession("RequestedUrl"))
                            this.router.navigateByUrl(GlobalUtil.getAppSession("RequestedUrl"));
                        else
                            this.router.navigateByUrl('layout/mypage');
                    },
                    error => {
                        debugger;
                    });*/

            }

        }
    }

    ngOnInit() {

        /*if (AuthenticationContext._user) {
            //this.router.navigate(['mypage']);
            //this.router.navigate(['login']);
        } else {
            //this.router.navigate(['mypage']);
            //this.router.navigate(['login']);
        }*/

    }

    /*adalConfig(): any {
        return {
            tenant: 'synclientaad.com',
            clientId: '3cbba47b-f30f-4bf5-9b04-c05bb89cccee',
            redirectUri: window.location.origin + '/',
            postLogoutRedirectUri: window.location.origin + '/'
        };
    }*/

    /*adalConfig(): any {
        return {
            tenant: 'synclientaad.com',
            clientId: '3cbba47b-f30f-4bf5-9b04-c05bb89cccee',
            redirectUri: window.location.origin + '/',
            postLogoutRedirectUri: window.location.origin + '/',
            tenantId: '34d8d078-1dd9-479c-9dcb-838a670081b3'
        };
    }*/

} 