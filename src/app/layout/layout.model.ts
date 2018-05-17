
export interface IFootNote {
    pageName?: string;
    footnoteText?: string;
    competitorId?: number;
    cropId?: number;
}

export interface IUserNotification {
    userId?: string;
    isDeactive?: number;
    totalActiveNotification?: number;
    notificationList?: INotificationList[];
    deActivateList?: any;
}

export interface INotificationList {
    id: number;
    notificationId: number;
    userId: string;
    description: string;
    isActive: boolean;
}

export interface IDeActivateList {
    notificationId?: number;
}
