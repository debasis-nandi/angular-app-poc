import { ITableHeader } from '../../widgets/datatable/datatable.model';
import { IActions, IFilters } from '../../widgets/charts/chart';
export interface IUserAnalytics {
    userId: string;
    pageName: string;
    regionId: number;
}
export interface IUserAnalyticsSearchParams {
    fromDate: Date,
    toDate: Date,
    regionId:number
}
export interface ITabularViewModel {
    tableHead?: ITableHeader[];
    kpiData?: any;
    actions: IActions[];
    filters: IFilters[];  
}
export interface IUserAnalyticsUIData {
    ModuleName: string,
    Pages: string[],
    UniqueUsers: number[]
}