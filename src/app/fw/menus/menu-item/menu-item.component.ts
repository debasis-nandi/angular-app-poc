﻿import {Component, Input, OnInit} from '@angular/core';
import { MenuItem } from '../../services/menu.service';
@Component({
    moduleId: module.id,
    selector: 'fw-menu-item',
    templateUrl: 'menu-item.component.html',
    styleUrls: ['menu-item.component.css']
})

export class MenuItemComponent implements OnInit {
    @Input() item: MenuItem;
    constructor() { }
    ngOnInit() {
    }
}