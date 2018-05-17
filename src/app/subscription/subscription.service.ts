import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { GlobalConfig } from '../global/global.config';
import { IUserSubscription } from './subscription.model';

@Injectable()
export class SubscriptionService {
    private saveUserSubscriptionUrl = GlobalConfig.baseEndpont + GlobalConfig.saveUserSubscription;
    private getUserSubscriptionPageUrl = GlobalConfig.baseEndpont + GlobalConfig.getUserSubscription;
    private removeUserSubscriptionPageUrl = GlobalConfig.baseEndpont + GlobalConfig.removeUserSubscription;

    constructor(private _http: Http) { }

    saveUserSubscription(iUserSubscription: IUserSubscription) {
        return this._http.post(this.saveUserSubscriptionUrl, iUserSubscription)
            .map((response: Response) => { <any>response.json() })
            .catch(this.handleError);
    }
    getPageData(userId: string,moduleId:number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', userId);
        params.set('moduleId', moduleId.toString());
        return this._http.get(this.getUserSubscriptionPageUrl, { search: params }).map((response: Response) => <any>response.json());
    }
    removeSubscription(subscriptionId: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('subscriptionId', subscriptionId.toString());
        return this._http.delete(this.saveUserSubscriptionUrl, { search: params })
            .map((response: Response) => { <any>response.json() })
            .catch(this.handleError);
    }
    private handleError(error: Response): Observable<any> {
        console.log(error);
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

