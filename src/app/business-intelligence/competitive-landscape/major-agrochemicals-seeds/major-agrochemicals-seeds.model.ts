
import { ITableHeader } from '../../../widgets/datatable/datatable.model';
import { IActions, IFilters } from '../../../widgets/charts/chart';

export interface ITabularViewModel {
    widget?: IWidget[];
    tableHead?: ITableHeader[];
    kpiData?: any;
    financialSummery?: any;
    companySnapshot?: any;
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

export interface IKPIData {
    companyName?: string;
    year?: number;
    totalAgribusinessSales?: any;
    ebit?: any;
    ebitMargin?: any;
    rnDexpenses?: any;
    rnDexpensesAsPercentageSales?: any;
    totalAgriBusinessSalesIndicator?: any;
    ebitIndicator?: any;
    ebitMarginIndicator?: any;
    rndEexpensesIndicator?: any;
    rndExpensesAsPercentageSalesIndicator?: any;
}

export interface ICompanySnapshotDescription {
    competitorId?: number;
    competitorName?: string;
    description?: string;
    companyInfo?: string;
}
