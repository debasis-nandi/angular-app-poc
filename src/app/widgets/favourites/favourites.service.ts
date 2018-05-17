import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalConfig } from '../../global/global.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IFavouritesDetail } from './favourites';

@Injectable()
export class FavouritesService {
    private _baseUrl = GlobalConfig.baseEndpont + GlobalConfig.favouritesApi;

    constructor(private _http: Http) { }

    saveFavourites(_IFavourites: IFavouritesDetail): Observable<number> {
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._baseUrl, _IFavourites, options)
            .map(this.extractData)            
            .catch(this.handleError);
    }
    private extractData(response: Response) {
        
        let body = response.json();
        return body || {};
    }

    private handleError(error: Response): Observable<any> {
        
        console.log(error);
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }    
}