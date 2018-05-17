export interface IUser {
    username: string;
    password: string;
}

export interface IUserDetails {
    validUser?: boolean;
    message?: string;
    userName?: string;
    environment?: string;
    roles?: string[];
    userId?: string;
    email?: string;
    userGroup?: IUserGroup[];
    userToken?: any;
    region?: string;
    regionId?: number;
    imageUrl?: string;
    firstName?: string;
    lastName?: string;
    tid?: string;
    accessLevel?: string;

    id?: string;
    token?: string;
    userRoles?: IUserRole[];
}

export interface IUserInfo {
    id?: string;
    email?: string;
    region?: string;
    regionId?: number;
    tid?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    accessLevel?: string;
    userRoles?: IUserRole[];
    userGroup?: IUserGroup[];
}

export class IUserGroup {
    groupId: number;
    groupName: string;
}

export class IUserRole {
    id: string;
    role: string;
}