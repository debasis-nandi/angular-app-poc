import { Injectable } from '@angular/core';
import { GlobalConfig } from '../../global/global.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IExportModel } from './export'
import { ITableHeader } from '../../widgets/datatable/datatable.model'
import { ITabularViewModel } from '../../business-intelligence/competitive-landscape/major-agrochemicals-seeds/major-agrochemicals-seeds.model'

@Injectable()
export class ExcelExportService {

    private baseUrl = GlobalConfig.baseEndpointExport + GlobalConfig.ExcelExportAPI;

    constructor(private http: Http) {
    }

    constructTabularDataForExport(tableHead: ITableHeader[], kpiData: any) {        
        let visibleHeaders: ITableHeader[] = tableHead.filter(header => header.isHidden == false || header.header.toLocaleLowerCase() == 'year');
        var filterdata:any = [];
        for (var i = 0; i < kpiData.length; i++) {
            let customObj = {};
            var rdata = kpiData[i];
            for (var j = 0; j < visibleHeaders.length; j++) {
                var rval = rdata[visibleHeaders[j].header];
                customObj[visibleHeaders[j].headerText] = rval !== null && rval !== undefined && typeof rval === 'string' ? rval.split("|")[0] : rval;
            }
            filterdata.push(customObj);
        }
        return filterdata;
    }

    constructChartDataForExport(tableHead: ITableHeader[], kpiData: any) {
        //let visibleHeaders: ITableHeader[] = tableHead.filter(header => header.isHidden == false || header.header.toLocaleLowerCase() == 'year');
        var filterdata: any = [];
        for (var i = 0; i < kpiData.length; i++) {
            let customObj = {};
            var rdata = kpiData[i];
            for (var j = 0; j < tableHead.length; j++) {
                var rval = rdata[tableHead[j].header];
                customObj[tableHead[j].headerText] = rval !== null && rval !== undefined && typeof rval === 'string' ? rval.split("|")[0] : rval;
            }
            filterdata.push(customObj);
        }
        return filterdata;
    }

    ExcelExportedFilePath(exportda: IExportModel): Observable<string> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl, exportda, options)
            .map(this.extractData)
            //.do()
            .catch(this.handleError);
    }

    private extractData(response: Response) {

        let body = response.json();
        if (body != "") {
            let ext = body.substring(body.lastIndexOf('.') + 1, body.length);
            if (ext.toLowerCase() != "pdf") {
                window.open(GlobalConfig.baseDownLoadedEndPoint + body);
            } else {
                var a = window.document.createElement("a");
                a.href = GlobalConfig.baseEndpointExport + GlobalConfig.DownloadDocApi + "?FileName=" + body;
                a.download = body;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }
        //return body || {};
        return body || Observable.of([]);
    }

    private handleError(error: Response): Observable<any> {
        console.log(error);
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}