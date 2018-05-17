
import { IUser, IUserDetails, IUserInfo } from './login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { GlobalConfig } from '../global/global.config';
import { GlobalUtil } from '../global/global.util';

import '../adal-service/adal';

// Instantiate the ADAL AuthenticationContext
declare var AuthenticationContext: any;

@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent {

    data: IUserDetails = {};
    errorMessage: string;
    user: IUser = { username: "", password: "" };
    errorMsg: string = '';
    loading: boolean = false;
    logoPath: string = GlobalConfig.loginLogo;
    isAadAuth: boolean = GlobalConfig.isAadAuth;
    userInfo: IUserInfo = {};

    constructor(private loginService: LoginService, private router: Router) {
        if (this.isAadAuth) {
            var isAppAuthenticated = GlobalUtil.getSession("IsAppAuthenticated");
            if (!isAppAuthenticated) {
                AuthenticationContext = new AuthenticationContext(GlobalConfig.adalConfig());
                AuthenticationContext.config.redirectUri = GlobalConfig.redirectUri;
                AuthenticationContext.login();
            }
        }

    }

    Submit(): void {
        //console.log(this.user.username);
        this.loading = true;
        this.loginService.getUserDetails(this.user)
            .subscribe(data => {
                this.data = data;
                GlobalUtil.setAppSession("UserInfo", data);
                GlobalConfig.environment = data.environment;
                this.redirect(data);
            },
            error => this.errorMessage = <any>error
            );
    }

    redirect(data: IUserDetails): void {
        if (data.validUser == true) {
            if (GlobalUtil.getAppSession("RequestedUrl"))
                this.router.navigateByUrl(GlobalUtil.getAppSession("RequestedUrl"));
            else
                this.router.navigateByUrl('layout/mypage');
        }
        else {
            this.errorMsg = data.message;
            this.loading = false;
        }
    }

}