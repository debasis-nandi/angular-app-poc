import { ITableHeader } from '../widgets/datatable/datatable.model';
import { IActions, IFilters } from '../widgets/charts/chart';
export interface IUserSubscription {
    subscriptionId?: number;
    userId: string;
    moduleId: number;
    cropId?: number;
    competitorId?: number;
    regionId?: number;
    territoryId?: number;
    countryId?: number;
    emailNotification: boolean;
    isActive?: boolean;
}
export interface IUserSubscriptionDetails {
    id?: number;
    userId: string;
    moduleId: number;
    cropId?: number;
    competitorId?: number;
    regionId?: number;
    territoryId?: number;
    countryId?: number;
    moduleName?: string;
    notificationFor?: string;
    emailNotification: boolean;
    isActive?: boolean;
}

export interface IFilterData {
    modules?: Array<Object>;
    crops?: Array<Object>;
    competitors?: Array<Object>,
    regions?: Array<Object>,
    territories?: Array<Object>,
    countries?: Array<Object>
}
export interface ITabularViewModel {
    kpiData?: Array<{ filterControlMappingId: number, filterName: string, label: string, labelId: number, parent1Id?: number, parent2Id?: number }>;
    kpiSourceData?: IUserSubscriptionDetails[];
    financialSummery?: any;
}