import { PagingBaseParams } from "./base";

export interface Games {
    BgUrl: string,
    CreateTime: string,
    Description: string,
    IconUrl: string,
    Title: string,
    TypeId: string,
    _id: string,
}

export interface ChangeGames {
    BgUrl: string,
    CreateTime: string,
    Description: string,
    IconUrl: string,
    Title: string,
    TypeId: string,
    _id?: string
}


export interface GetGamesDetailParams extends PagingBaseParams {
    id: string
}

export interface ActivityDetails {
    _id: string,
    ActivityId: string,
    BgUrl: string,
    CreateTime: string,
    Detail: string,
    EndTime: string,
    StartTime: string,
    Title: string,
    Index: string
}

export interface CreateActivityDetails {
    _id?: string,
    ActivityId: string,
    BgUrl: string,
    CreateTime: string,
    Detail: string,
    EndTime: any,
    StartTime: any,
    Title: string,
    Index: string
}

export interface ActivitySpeciesCollection {
    Abbreviation: string,
    Company: string,
    CreateTime: any,
    Name: string,
    _id: string,
}

export interface ChangedActivitySpeciesCollection {
    Abbreviation: string,
    Company: string,
    CreateTime: any,
    Name: string,
    _id?: string,
}