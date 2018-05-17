
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { GlobalConfig } from '../global/global.config';
import { GlobalUtil } from '../global/global.util';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        var isAuthenticated = GlobalUtil.getAppSession("UserInfo") ? true : false;
        if (isAuthenticated) {
            return true;
        }
        else {
            GlobalUtil.setAppSession("RequestedUrl", state.url);
            this.router.navigate(['/login']); // session empty then redirect to login page
            return false;
        }
    }
}
