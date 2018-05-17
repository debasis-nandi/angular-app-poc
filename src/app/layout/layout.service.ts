import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IFootNote} from './layout.model';
import { GlobalConfig } from '../global/global.config';
import { GlobalUtil } from '../global/global.util';
import { IServiceParams } from '../widgets/charts/chart';

@Injectable()
export class LayoutService {

    constructor(private _http: Http) { }
    private getFootnoteUrl = GlobalConfig.baseEndpont + GlobalConfig.getFootnote;
    private saveFootnoteUrl = GlobalConfig.baseEndpont + GlobalConfig.saveFootnote;
    private getUserProfileUrl = GlobalConfig.baseEndpont + GlobalConfig.getUserProfile;
    
    saveFootnote(footnote: IFootNote): Observable<any> {
        return this._http.post(this.saveFootnoteUrl, footnote).map((response: Response) => <any>response.json());
    }

    /*getData(): Observable<any> {
        console.log("Here");
        // Parameters obj-
        let params: URLSearchParams = new URLSearchParams();
        params.set('pageName', GlobalUtil.getSession("pagename"));

        return this._http.get(this.getFootnoteUrl, { search: params })
            .map((response: Response) => {
            debugger;
            console.log(response.json());
            response.json();
        });
    }*/
    
    getData(): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('pageName', GlobalUtil.getSession("pagename"));
        return this._http.get(this.getFootnoteUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getNotification(url: string): Observable<any> {
        let headers = this.handleHeaders();
        let options = new RequestOptions({ headers: headers });
        return this._http.get(url, options)
            .map((response: Response) => response.json());
    }

    setNotification(url: string, formData: FormData): Observable<any> {
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, formData, options)
            .map(res => { res.json() });
    }

    killUserToken(userId: string) {
        var killTokenUrl = GlobalConfig.baseEndpont + GlobalConfig.killUserTokenApi;
        let params: URLSearchParams = new URLSearchParams();
        params.set('UserId', userId);
        return this._http.delete(killTokenUrl, { search: params })
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

    private handleHeaders(): Headers {
        return new Headers({
            'Content-Type': 'application/json'
        });
    }

}