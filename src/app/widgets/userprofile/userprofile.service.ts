import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { GlobalConfig } from '../../global/global.config';
import { IUserProfile } from './userprofile.model';

@Injectable()
export class UserProfileService {
    private getUserProfileUrl = GlobalConfig.baseEndpont + GlobalConfig.getUserProfile;

    constructor(private _http: Http) { }

    getUserProfile(userId: string): Observable<IUserProfile> {
        let params: URLSearchParams = new URLSearchParams();
        params.set("userId", userId)
        return this._http.get(this.getUserProfileUrl, { search: params }).map((response: Response) => <IUserProfile>response.json());
    }
}