import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { IGlossaryViewModel } from './glossary';
import { GlobalConfig } from '../../global/global.config';
@Injectable()

export class GlossaryService {

    private baseUrl = GlobalConfig.baseEndpont + GlobalConfig.updateGlossary;//add glossary api
    private gettermsurl = GlobalConfig.baseEndpont + GlobalConfig.viewGlossary;
    private deletetermsurl = GlobalConfig.baseEndpont + GlobalConfig.deleteGlossary;
    constructor(private http: Http) { }
    addGlossary(glossary: IGlossaryViewModel): Observable<number> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl, glossary, options)
            .map(this.extractData)
            .do(data =>
                console.log(/*'createProduct: ' + JSON.stringify(data)*/)
            )
            .catch(this.handleError);
    }


    getterms(start: number, end: number, firsttimecall: boolean): Observable<any>
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.gettermsurl + "?start=" + start +"&end="+end+ "&id=" + firsttimecall, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteGlossary(id: string): Observable<number> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.deletetermsurl + '/' + id, options)
            .map(this.extractData)
            .do(data =>
                console.log(/*'createProduct: ' + JSON.stringify(data)*/)
            )
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body;
    }

    private handleError(error: Response): Observable<any> {
        console.log(error);
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}