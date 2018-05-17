import { IActions, IFilters } from '../../../widgets/charts/chart';
import { ITableHeader } from '../../../widgets/datatable/datatable.model';


export interface ITabularViewModel {
    widget?: IWidget[];
    tableHead?: ITableHeader[];
    kpiData?: any;
    actions: IActions[];
    filters: IFilters[];
    ciNewsData: INewsData[];
}

export interface IWidget {
    widgetDetailId?: number;
    name?: string;
    widgetType?: string;
    pageWidgetMapperId?: number;
    keyNames?: string;
    keyValues?: string;
}


export interface INewsData {
    Id: number;
    typeId: number;
    Name: string;
    SubNewsTypeId: number;
    SubNewsType: string;
    PublishedDate: string;
    Title: string;
    Description?: string;
    SourceName?: string;
    ModuleID: number;
    ModuleName: string;
    SourceLink?: string;
    RegionId: number;
    RegionName: string;
    uploadedBy: string;
    UserName: string;
    listnewstype: INewsType[];
}

export interface INewsType {
    newsTypeId: number;
    newsTypeName: string;
}