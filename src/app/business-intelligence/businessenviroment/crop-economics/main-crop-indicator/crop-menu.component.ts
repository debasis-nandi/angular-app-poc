
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-crop-menu',
    templateUrl: 'crop-menu.component.html',
    
})

export class CropMenuComponent implements OnInit {
    
    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
    
    }

    ngOnChanges() {
    }
 
}


