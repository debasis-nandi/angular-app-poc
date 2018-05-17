export interface IMyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean;
    userName: string;
}

export interface IMyEventModal {
    id: number;
    title: string;
    start: Object;
    end: Object;
    allDay: boolean;
    userName: string;
}