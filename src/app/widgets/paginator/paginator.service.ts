import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import * as _ from 'underscore';
import { GlobalConfig } from '../../global/global.config';
import { SearchModel } from '../../search/search.model';


@Injectable()
export class PaginatorService {

    constructor(private _http: Http) { }

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = GlobalConfig.rowsPerPage) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    get(url: string): Observable<any> {
        let headers = this.handleHeaders();
        let options = new RequestOptions({ headers: headers });
        return this._http.get(url, options)
            .map((response: Response) => response.json());
    }

    post(url: string, model: any): Observable<SearchModel> {
        let body = JSON.stringify(model);
        let headers = this.handleHeaders();
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response: Response) => response.json());
    }

    delete(url: string, id: any): Observable<boolean> {
        let headers = this.handleHeaders();
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url + '/' + id, options)
            .map((response: Response) => response.json());
    }

    private handleHeaders(): Headers {
        return new Headers({
            'Content-Type': 'application/json'
        });
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }

}