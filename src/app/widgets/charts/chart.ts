import { IWidgetInsights } from '../../insights/insights.model';

export interface IPage {
    pageDataMapper: IPageDataMapper;
    pageDataMapperFilterResult: IPageDataMapper;
}

export interface IPageDataMapper {
    widgets: IWidgets[];
    actions: IActions[];
    filters: IFilters[];
    exports: IExports[];
    filtersRelation: IFilterRelation[];
    insightTypeId: number;
}

export interface IWidgets {
    widgetId: number;
    realWidgetIdForMyPage: number;
    widgetName: string;
    widgetType: string;
    cropId: number;
    competitorId: number;
    chartComponentViewModel: IChartComponentViewModel;
    insightData: string;
    insightLastUpdated: string;
    sortOrder: number;
    sourceName: string;
    sourceLink: string;
    lastUpdated: string;
    //New property added by negi
    underlyingChartDataViewModel: IUnderlyingChartDataViewModel;
    widgetActionViewModelList: IActions[];
    widgetFilters: IFilters[];

    blankCompetitors: number[]; // to show competitors having no data against the selected filters
    cropComparisonIds: number[];
    chartPlottedOn: string;
    insightsList: IWidgetInsights;
    insightHeader: string;
    showInsightHeader: boolean;
    pageNameToShow: string;


}

//New Interface added by negi
export interface IUnderlyingChartDataViewModel {
    tableHeaders: IUnderlyingChartTableHeaders[];
    tableRows: Object[];
}

//New Interface added by negi
export interface IUnderlyingChartTableHeaders {
    header?: string;
    headerName?: string;
    headerOrder?: number;
    isHyperLink?: boolean;
    isGrowthIndicator?: boolean;
    hyperLinkPath?: string;
}

export interface IActions {
    actionName: string;
    iconUrl: string;
    iconClass: string;
    sortOrder: number;
}

export interface IFilters {
    id: number;
    filterType: string;
    filterName: string;
    filterData: Object[];
    sortOrder: number;
    selectedData: any;
    isVisible: boolean;
    childControlMappingId: number;

}

export interface IExports {
    id: number;
    exportType: string;
    exportName: string;
    exportData: Object[];
    sortOrder: number;
    selectedData: any;
    isVisible: boolean;
    childControlMappingId: number;

}

export interface IFilterRelation {
    kpiId: number;
    cropId: number;
    cropName: string;
    regionId: number;
    territoryId: number;
    countryId: number;
    sourceId: number;
    regionShade: string;
    territoryShade: string;
    maxYear: string;
    minYear: string;
    defaultValue: number[];
    regionName: string;
    territoryName: string;
    countryName: string;
    sourceName: string;
    defaultSourceId: number;
    widgetId: number;
    widgetName: string;
}

export interface IChartViewModel {
    chart: IFusionChartProperty;
    categories: ICategories[];
    dataset: IParentDataset[];

}

export interface IChartComponentViewModel {
    chartViewModel: IChartViewModel;
    chartType: string;
    chartWidth: string;
    chartHeight: string;
}

export interface IFusionChartProperty {
    caption: string;
    xAxisname: string;
    yAxisName: string;
}

export interface ICategories {
    category: ICategory[];
}

export interface ICategory {
    label: string;
}


export interface IParentDataset {
    dataset: IChartDataset[];

}

export interface IChartDataset {
    seriesName: string;
    data: IChartData[];

}

export interface IChartData {
    value: string;
}

export interface IServiceParams {
    pageName: string;
    companyId: number;
    cropId: number;
    selectedFilter: IFilters[];
    isSearchRedirct?: boolean;
    userId?: string;
    widgetId?: number;
    regionName?: string;
}

export interface IInisghts {
    insightData?: string;
    widgetDetailId?: string;
}

export interface IFavoriteWidget {
    widgetId: number,
    widgetName: string
}

export interface ISelectedFilters
{
    filterName: string;
    selectedValues: string;
}


