
export interface IMenu {
    MenuID?: number;
    Sequence?: number;
    Name?: string;
    Url?: string;
    ParentMenu?: string;
    ParentMenuID?: number;
    RoleID?: number;
    Children?: IMenu[];
}