import { EditorClasses } from '../widgets/tinymce/tinymce.directive';

export interface IInsights {
    insightId?: number,
    insightData: string,
    pageName: string,
    appliedFilterId?: number,
    widgetDetailIds: string,
    appliedFilters?: Array<IInsightsFilters>,
    appliedFiltersDisplay?:string,
    identificationFlag: string,
    author: string,
    updatedBy: string,
    updatedDate?: Date,
    isActive: boolean,
    insightTitle?:string
}
export interface InsightStatus {
    statusCode?: number,
    statusDescription?: string,
    updatedDate?: Date,
    insightId?: number
    insightTitle?: string
}

export interface IInsightsFilters {
    filterName: string,
    filterValue: string
}
export interface ChartInsights {
    EditorId?: any,
    iInsights: IInsights,
    insightsData: string,
    insightsClasses: EditorClasses[],
    initInsightsEditor: boolean,
    widgetId: number
}

export interface IInsightViewModel {
    pageInsightList: IInsights[],
    widgetInsightList: IWidgetInsights[]
}

export interface IWidgetInsights {
    widgetId:number,
    insightList: IInsights[]
}


