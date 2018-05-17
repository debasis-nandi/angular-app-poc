import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-loader',
    templateUrl: 'loader.component.html'
})

export class LoaderComponent {

    @Input() loading: boolean = false;
}