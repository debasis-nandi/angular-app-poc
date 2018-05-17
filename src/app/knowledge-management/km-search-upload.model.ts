
export class KmSearchUploadModel {

    docId?: number;

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
    documentTypeList?: DocTypeList[];

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
    emailNotification?: number;
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
    moduleid: number;
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

export class KmSaveUploadDocModel {
    DocId?: number;
    DocTitle?: string;
    DocDes?: string;
    DocTags?: string;
    DocType?: number;
    PublicationDate?: string;
    UploadedBy?: string;
    IsClr?: boolean;
    EmailNotification?: number;

    DocModules?: SelectedList[];
    DocRegions?: SelectedList[];
    DocCountries?: SelectedList[];
    RestrictedGroup?: SelectedList[];
    CompetitorsSelected?: SelectedList[];
}

export class SelectedList {
    Value: number;
}

export interface Message {
    severity?: string;
    summary?: string;
    detail?: string;
}