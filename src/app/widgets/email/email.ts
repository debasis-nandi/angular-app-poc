export interface IEmailDetail {
    dataType: string;
    name: string; // for email
    subject: string;
    description: string;
    worldMapImageData: string;
    documenturl: string;
    sourceurl: string;
    competitorName: string;
    source: string;
    lastUpdated: string;
    firstName: string;
    lastName: string;
    selectedFilters: string;
    chartData: IChartDetail;
    newsData: INewsDetail;
    documentData: IDocumentDetail;
}

export interface IChartDetail {
    chartName: string;
    userName: string;
    toUserName: string; 
    roleId?: number;
}

export interface INewsDetail {
    title: string;
    description: string;
    subNewsType: string;  
    sourceName: string;
    publishedDate: Date;
}

export interface IDocumentDetail {
    title: string;
    description: string;
    documentName: string;
}