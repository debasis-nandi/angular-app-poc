
export class IAboutTeam {
    id?: number;
    teamInfo?: string;
    updatedBy?: string;
}
export interface IAboutTeamViewModel {
    id: number;
    definition: string;
    userId: string;
}
export interface aboutTeamData {
    data: IAboutTeamViewModel[];
}