
import { Component, OnInit } from '@angular/core';

import { UserTrackingService } from './usertracking.service';

@Component({
    moduleId: module.id,
    selector: 'my-tracking',
    templateUrl: 'usertracking.component.html',
    providers: [UserTrackingService]
})

export class UserTrackingComponent implements OnInit {

    constructor(private service: UserTrackingService) { }

    ngOnInit() {
    }
    
    onSubmit(): void {
        //debugger;
        var url: string = "http://localhost:56833/api/UserTracking/LogUserAction";
        this.service.get(url).subscribe(result => {
            //debugger;
            var dd = result;
        });
    }

}

