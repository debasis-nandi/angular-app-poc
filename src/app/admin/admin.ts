//export interface IUser {
//    Id: number,
//    FirstName: string,
//    LastName: string,
//    Email: string,
//    UserName: string,
//    RoleId: number,
//}

export interface MasterForm {
    id: number;
    formName: string;
    //FormTableName: string;
    searchField: string,
    maxCol: number,
    masterFormMapping: masterFormMapping[],
    dropDownData: dropDownData[],
    gridRecord: gridData[]

}

export interface masterFormMapping {
    formFieldId: number;
    sequenceNumber: number;
    inputField: string;
    controlName: string;
    isRequired: boolean;
    minLength: number;
    maxLength: number;
    defaultShowSelected: any;
    defaultSelected: any;
    multiSelected: string[];
    validationMessage: string;
    duplicateAllowed: boolean;
    containsIsActiveField: boolean;
}
export interface dropDownData {
    dropDownId: number;
    data: Datas[]

}

export interface Datas {
    [key: string]: string[];
}

export interface gridData {
    [key: string]: string;
}

export interface IQuery {
    type?: number;
    title?: string;
    description?: string;
    createdBy?: string;
}