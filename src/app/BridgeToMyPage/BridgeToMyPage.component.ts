
import { IUser, IUserDetails } from '../login/login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { GlobalConfig } from '../global/global.config';
import { GlobalUtil } from '../global/global.util';

import '../adal-service/adal';

// Instantiate the ADAL AuthenticationContext
declare var AuthenticationContext: any;

@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: 'BridgeToMyPage.component.html'
})

export class BridgeToMyPageComponent {

    data: IUserDetails = {};
    errorMessage: string;
    user: IUser = { username: "", password: "" };
    errorMsg: string = '';
    loading: boolean = false;
    logoPath: string = GlobalConfig.loginLogo;
    isAadAuth: boolean = GlobalConfig.isAadAuth;
    userInfo: IUserDetails = {};

    constructor(private loginService: LoginService, private router: Router) {

        this.userInfo = GlobalUtil.getAppSession("UserInfo");

        //Fill session.
        this.loginService.getUserInfo(this.userInfo).subscribe(
            info => {
                var tempUserInfo = info;
                this.userInfo.region = tempUserInfo.region;
                this.userInfo.regionId = tempUserInfo.regionId;
                this.userInfo.accessLevel = tempUserInfo.accessLevel;
                this.userInfo.roles = tempUserInfo.userRoles.map(x => x.role);
                this.userInfo.userGroup = tempUserInfo.userGroup;
                this.userInfo.email = tempUserInfo.email;
                this.userInfo.userRoles = tempUserInfo.userRoles;

                GlobalUtil.setAppSession("UserInfo", this.userInfo);
                GlobalConfig.environment = this.userInfo.environment;

                //Call mypage.
                //this.router.navigateByUrl('layout/mypage');
                if (GlobalUtil.getAppSession("RequestedUrl")) {
                    this.router.navigateByUrl(GlobalUtil.getAppSession("RequestedUrl"));
                }
                else {
                    this.router.navigateByUrl('layout/mypage');
                }
            },
            error => {
            });




    }

}