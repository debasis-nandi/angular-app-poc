import { NgModule } from '@angular/core';
import { FavouritesComponent } from './favourites.component'
import { FavouritesService } from './favourites.service'

import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { httpFactory } from '../../http-interceptor/http.factory';

@NgModule({
    imports:
    [
       
    ],
    exports: [
        FavouritesComponent
           ],
    declarations: [
        FavouritesComponent
    ],
    providers: [
        FavouritesService,
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, Router] }
    ]
})
export class FavouriteModule { }