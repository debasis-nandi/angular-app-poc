
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-competitormenu',
    templateUrl: 'competitormenu.component.html',
    
})

export class CompetitorMenuComponent implements OnInit {
    
    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
    
    }

    ngOnChanges() {
    }
 
}


