
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { MenuService } from './menu.service';
import { IMenu } from './menu.model';
import { GlobalConfig } from '../../global/global.config';
import { GlobalUtil } from '../../global/global.util';

@Component({
    moduleId: module.id,
    selector: 'my-menu',
    templateUrl: 'menu.component.html',
    providers: [MenuService]
})

export class MenuComponent implements OnInit {

    @Input() menuItems: IMenu[];
    isToogle: boolean = false;
    styles: any = {'display':'none'};
    isOpenClose: any = 'hamburger is-closed animated fadeInLeft';
    loading: boolean = false;
    cssToggled: string = 'hidden-md hidden-sm hidden-lg visible-xs';
    userName: string;
    userRole: string;

    endPoint: string = GlobalConfig.baseEndpont + GlobalConfig.menuApi;

    constructor(private service: MenuService, private router: Router) {
    }

    ngOnInit() {
        this.loading = true;
        this.getMenuItems();
        this.loading = false;
    }

    getMenuItems(): void {
        this.userRole = GlobalUtil.getAppSession("UserInfo").roles[0];
        this.userName = GlobalUtil.getAppSession("UserInfo") ? GlobalUtil.getAppSession("UserInfo").userName.split('@')[0].split('.')[0] : "";

        var url = this.endPoint.replace("{0}", this.userRole);
        this.service.get(url).subscribe(result => {
            this.menuItems = result;
        });
    }
    downloadAdminGuide() {
        this.loading = true;
        var a = window.document.createElement("a");
        a.href = GlobalConfig.baseEndpointExport + GlobalConfig.DownloadDocApi + "?FileName=" + GlobalConfig.adminGuideFileName;
        a.download = GlobalConfig.adminGuideFileName;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.loading = false;
    }

    onLogout() {
        GlobalUtil.clearAppSession("UserInfo");
        GlobalUtil.clearAppSession("RequestedUrl");
        this.router.navigateByUrl('login');
    }

    private toogleClass(event:any): void {
        //debugger;
        var target = event.currentTarget;
        var flag = target.classList.contains('is-closed') ? true : false;
        this.isToogle = flag;
        this.styles = { 'display': flag ? 'block' : 'none' };
        this.isOpenClose = flag ? 'hamburger is-open animated fadeInLeft' : 'hamburger is-closed animated fadeInLeft';
        this.cssToggled = flag ? 'hidden-md hidden-sm hidden-lg visible-xs toggled' : 'hidden-md hidden-sm hidden-lg visible-xs';
    }

    onScroll(event: any) {
        let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
       
        if (scrollTop >= 97) {
            var myMenuH: HTMLElement = document.getElementById("myMenuH");
            if (myMenuH.classList.contains("affix-top")) {
                myMenuH.classList.remove("affix-top");
                myMenuH.classList.add("affix");
            }
            //.classList.remove("")
        }
        else
        {
            var myMenuH: HTMLElement = document.getElementById("myMenuH");
            if (myMenuH.classList.contains("affix")) {
                myMenuH.classList.remove("affix");
                myMenuH.classList.add("affix-top");
            }
        }
    }
}

