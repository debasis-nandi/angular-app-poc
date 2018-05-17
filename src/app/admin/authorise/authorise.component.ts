import { Component, Input, ViewEncapsulation} from '@angular/core';
import { IAuthoriseViewModel, IAuthorise, RestrictedList } from './authorise';
import { GlobalUtil } from '../../global/global.util';
import { AuthoriseService } from './authorise.service';

@Component({
    moduleId: module.id,
    templateUrl: 'authorise.component.html',
    styleUrls: ['authorise.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class AuthoriseComponent {
    //isAdmin: boolean = true;
    isPortalAdmin: boolean = GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" ? true : false;
    loading: boolean = false;
    isUpdateDisable: boolean = true;
    errorMessage: string;
    roleData: any;
    regionData: any;
    completeData: any;    
    gridData: any;
    tIdSuggestions: string[] = [];
    filteredTIds: string[] = [];
    model: IAuthorise = { tId: '', roleId: 0, regionId: 0, firstName: '', lastName: '', emailId: '', restrictedGroup: [] };

    styleClass: string = 'ui-datatable table table-hover comp-table wrapOff';
    statusClass = {
        green1: true,
        mandatory: false
    }
    statusDesc: string;
    regionVisible: boolean = false;
    errorTermMsg: string;
    restrictedGroupList?: RestrictedList[];
    
    constructor(private authoriseService: AuthoriseService) {
    }

    ngOnInit() {
        this.loading = true;
        //console.log(GlobalUtil.getAppSession("UserInfo").roles[0]);
        //this.isAdmin = GlobalUtil.getAppSession("UserInfo").roles[0] == "Administrator" ? true : false;
        this.getPageData();        
    }

    getPageData(): void {
        this.authoriseService.getPageData().subscribe(result => {
            this.roleData = result["roleData"];
            this.regionData = result["regionData"];
            if (this.isPortalAdmin == false) {
                this.roleData = this.roleData.filter((x: any) => x.roleName != "Portal Admin");
            }
            this.completeData = result["completeData"];
            //this.tIdSuggestions = this.completeData["tId"];
            this.tIdSuggestions = this.completeData.map((a:any) => a.tId);
            this.gridData = result["gridData"];
            this.restrictedGroupList = result["restrictedGroupList"];
            this.loading = false;
        });
    }

    filterTIds(event: any) {
        this.filteredTIds = [];
        for (let i = 0; i < this.tIdSuggestions.length; i++) {
            let ID = this.tIdSuggestions[i];
            if (ID.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {               
                    this.filteredTIds.push(ID);                
            }
        }

        if (this.filteredTIds.length == 0) {
            this.isUpdateDisable = true;
            this.regionVisible = false;
        }
        else {
            //this.isUpdateDisable = false;
        }
    }

    ontIdchange(event: any) {
        this.isUpdateDisable = false;
        let filterData: any = this.completeData.filter((x: any) => x["tId"] == event)[0];
        this.model.roleId = +filterData["roleId"];
        if (!this.isPortalAdmin) {
            if (this.model.roleId == 1) {
                this.model.roleId = 2;
            }
        }
        this.model.firstName = filterData["firstName"];
        this.model.lastName = filterData["lastName"];
        this.model.emailId = filterData["userName"];
        if (this.model.roleId == 3) {
            this.regionVisible = true;
            this.model.regionId = filterData["regionId"];
        }
        else {
            this.regionVisible = false;
        }
        
        if (filterData["groupId"]) {
            let restrictedGroup = filterData["groupId"].split(',');
            this.model.restrictedGroup = restrictedGroup;
        }
        else {
            this.model.restrictedGroup = null;
        }

    }

    onRoleChange(event: any) {
        if (event == 3) {
            this.regionVisible = true;
            this.model.regionId = this.regionData[0]["regionId"];
        }
        else
            this.regionVisible = false;
    }

    Update() {
        this.loading = true;
        if (this.model.roleId != 3) {
            this.model.regionId = 0;
        }
        this.authoriseService.updateUser(this.model).subscribe(x => {
            this.statusDesc = x;          

            if (this.statusDesc.indexOf('exist') > -1) {
                this.statusClass = {
                    green1: false,
                    mandatory: true
                }
            }
            else {
                this.statusClass = {
                    green1: true,
                    mandatory: false
                }
            }
            setTimeout(() => {
                this.statusDesc = "";
            }, 3000);

            this.authoriseService.getPageData().subscribe(result => {
                this.completeData = result["completeData"];
                this.tIdSuggestions = this.completeData.map((a: any) => a.tId);
                this.gridData = result["gridData"];
            });
            this.Reset();
            this.loading = false;  
        },
            error => this.errorTermMsg = <any>error
        );              
          
    }

    Reset() {        
        this.model = { tId: '', roleId: 0, regionId: 0, firstName: '', lastName: '', emailId: '', restrictedGroup: [] };
        this.isUpdateDisable = true;
        this.regionVisible = false;
        this.filteredTIds = [];
    }
    
}
