import { GlobalConfig, Constants } from '../global/global.config';

export class GlobalUtil {

    public static setSession(key: string, value: any): void {
        sessionStorage.setItem(key, value);
    }

    public static getSession(key: string): any {
        return sessionStorage.getItem(key);
    }

    public static clearSession(key: string): void {
        sessionStorage.removeItem(key);
    }

    public static setAppSession(key: string, value: any): void {
        //sessionStorage.setItem(key, JSON.stringify(value));
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static getAppSession(key: string): any {
        //return JSON.parse(sessionStorage.getItem(key));
        return JSON.parse(localStorage.getItem(key));
    }

    public static clearAppSession(key: string): void {
        //sessionStorage.clear();
        //localStorage.clear();
        localStorage.removeItem(key);
    }

    public static getBasePath(key: string): string {
        let completeUrl = "";
        completeUrl = "http://" + window.location.hostname;
        if (window.location.port != "" && window.location.port != null && window.location.port.trim().length > 0) {
            completeUrl += ":" + window.location.port;
        }
        completeUrl += window.location.pathname;
        if (GlobalConfig.environment == Constants.qaEnvironment) {
            completeUrl += "src/";
        }
        return completeUrl;
        //evs01tst05/syngentatest/
    }

    public static getFileExtension(fileName: string): string {
        return fileName.split('.').pop();
    }
    public static getFormattedDate():string {
        let d = new Date();
        let cDate = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
        return cDate;
    }

    public static getCurrentDate(): string {
        let d = new Date();
        let cDate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
        return cDate;
    }

    public static GroupBy(propName: string, arrayToGroup: Array<any>): any {
        return arrayToGroup.reduce(function (groups, item) {
            var val = item[propName];
            groups[val] = groups[val] || [];
            groups[val].push(item);
            return groups;
        }, {});
    }

}