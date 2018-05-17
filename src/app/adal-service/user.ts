export interface UserDetails {
    UserId?: string;
    ValidUser?: string;
    Message?: string;
    UserName?: string;
    Email?: string;
    Roles?: string[];
    Environment?: string;
    UserGroup?: IUserGroup[];
    UserToken?: any;
}

export interface IUserGroup {
    GroupId?: string;
    GroupName?: string;
}