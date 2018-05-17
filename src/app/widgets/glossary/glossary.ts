export interface IGlossaryViewModel {
    termId: number;
    term: string;
    definition: string;
    userId: string;
}

export interface IALphabetCount {
    [key: string]: number;
}

export interface glossaryData {
    data: IGlossaryViewModel[];
    alphabetcount: IALphabetCount;
}
