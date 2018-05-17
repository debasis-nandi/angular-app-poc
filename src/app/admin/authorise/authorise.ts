
export interface IAuthoriseViewModel {
    tId: string;
    roleName: string;
    roleId: number;
    firstName: string;
    lastName: string;
    emailId: string;
}

export interface IAuthorise {
    tId: string;
    roleId: number;
    regionId: number;
    firstName: string;
    lastName: string;
    emailId: string;
    restrictedGroup: SelectedList[];
}

export class RestrictedList {
    value: number;
    label: string;
}

export class SelectedList {
    value: number;
}