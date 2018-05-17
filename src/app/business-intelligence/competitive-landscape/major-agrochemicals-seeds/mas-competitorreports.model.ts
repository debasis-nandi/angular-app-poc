import { IActions, IFilters } from '../../../widgets/charts/chart';
import { ITableHeader } from '../../../widgets/datatable/datatable.model';


export interface ITabularViewModel {
    widget?: IWidget[];
    tableHead?: ITableHeader[];
    kpiData?: any;
    actions: IActions[];
    filters: IFilters[];
}

export interface IWidget {
    widgetDetailId?: number;
    name?: string;
    widgetType?: string;
    pageWidgetMapperId?: number;
    keyNames?: string;
    keyValues?: string;
}


export interface ICompetitorReportData {
    keyword?: string;

    uploadedDateTime?: Date[];
    uploadPeriod?: DateRange;

    publicationDate?: Date[];
    publicationPeriod?: DateRange;

    docModules?: any;
    docSelectedModules?: any;
    moduleList?: ModuleList[];

    docRegions?: any;
    docSelectedRegions?: any;
    regionList?: RegionList[];

    docCountries?: any;
    docSelectedCountries?: any;
    countryList?: CountryList[];

    docType?: any;
    docSelectedType?: any;
    docTypeList?: DocTypeList[];

    uploadby?: any;
    upLoadedByList?: UploadedByList[];

    docRestrictedGroup?: any;
    docSelectedRestrictedGroup?: any;
    restrictedGroupList?: RestrictedList[];

    docCompetitors?: any;
    docSelectedCompetitors?: any;
    competitorsList?: CompetitorsList[];

    title?: string;
    description?: string;
    tags?: string;
    uploadPublicationDate?: Date;

    isReset?: boolean;
    isClr?: boolean; 
}

export class ModuleList {
    id: number;
    value: number;
    label: string;
}

export class RegionList {
    value: number;
    label: string;
}

export class CountryList {
    value: number;
    label: string;
}

export class DocTypeList {
    value: number;
    label: string;
}

export class UploadedByList {
    value: string;
    label: string;
}

export class RestrictedList {
    value: number;
    label: string;
}

export class CompetitorsList {
    value: number;
    label: string;
}

export class DateRange {
    beginDate: any;
    endDate: any;
}
