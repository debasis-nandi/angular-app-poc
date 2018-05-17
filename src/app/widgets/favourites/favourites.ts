export interface IFavouritesDetail {
    pageName: string;
    widgetId: number;
    widgetName: string;
    userId: string;
    isFavourite: boolean;
    cropId: number;
    competitorId: number;
    isFavouriteCount: boolean;
    filterType?: string;
    fromYear?: number;
    fromQuarter?: number;
    toYear?: number;
    toQuarter?: number;
}
