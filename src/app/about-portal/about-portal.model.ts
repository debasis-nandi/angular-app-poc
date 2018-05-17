
export class IAboutPortal {
    id?: number;
    portalInfo?: string;
    updatedBy?: string;
}

export interface IAboutPortalViewModel {
    termId: number;
    term: string;
    definition: string;
    userId: string;
}

export interface aboutPortalData {
    data: IAboutPortalViewModel[];
}