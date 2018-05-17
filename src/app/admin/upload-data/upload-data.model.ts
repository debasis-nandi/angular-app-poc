
export interface IUploadData {
    moduleId?: number;
    uploadDataModuleList?: IUploadDataModule;
}

export interface IUploadDataModule {
    id: number;
    name: string;
    templateFileName: string;
}
