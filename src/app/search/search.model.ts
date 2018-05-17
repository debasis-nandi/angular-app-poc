
export interface DataItems {
    
    Id: number;
    ChartId: number;
    PageId: number;
    CompetitorId: number;
    CropId: number;
    ChartName: string;
    PageName: string;
    CompetitorName: string;
    CropName: string;

    Title: string;
    Description: string;
    Tags: string;
    DocType: string;
    IsRestricted: boolean;
    PublicationDate: Date;
    Uploadby: string;
    AttachmentOriginalName: string;
    AttachmentUniqueName: string;
    DocModules: any;
    DocRegions: any;
    DocCountries: any;
    Type: string;
    SourceName: string;
    SourceLink: string;
    TypeName: string;
    SubType: string;
    ChartYear: number;
}

export interface ElasticResponseData {
    templateType: string;
    type: string;
    typeName: string;
    count: string;
    data: DataItems[];
}

export interface SearchModel {
    elasticResponseData: ElasticResponseData[];
}