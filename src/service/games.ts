import BaseService from "../base/service";
import { judgeAccessToke, changeStringToJson } from "../utils/index";
import { PagingBaseParams } from "../models/base";
import { Base_Url, Base_Env, Base_Url_Update, Base_Url_Add, Base_Url_delect } from "../config/app.config";
import { GetGamesDetailParams, ChangeGames, CreateActivityDetails, ChangedActivitySpeciesCollection } from "models/games";

export class GamesService extends BaseService {
    access_token: string;
    constructor() {
        super();
        this.access_token = localStorage.getItem('access_token') || "";
    }

    async getGames(condition: PagingBaseParams) {
        const url = `${Base_Url}?access_token=${this.access_token}`;
        const query = `db.collection("ActivityInfo").limit(${condition.pageSize}).skip(${condition.page}).get()`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res);
        return {
            data: data.data.data,
            total: data.data.pager.Total
        }
    }

    async getGameDetailsList(condition: GetGamesDetailParams) {
        const url = `${Base_Url}?access_token=${this.access_token}`;
        const query = `db.collection('ActivityDetails').where({ActivityId:'${condition.id}'}).orderBy('index', 'desc').limit(${condition.pageSize}).skip(${condition.page}).get()`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res);
        return {
            data: data.data.data,
            total: data.data.pager.Total
        }
    }

    async getActivityInfoDetail(id: string) {
        const url = `${Base_Url}?access_token=${this.access_token}`;
        const query = `db.collection('ActivityInfo').where({_id:'${id}'}).get()`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res.data);
        return data
    }

    async uploadFile(params: any) {
        const uploadUrl = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${this.access_token}&env=${Base_Env}&name=upload`
        const data = await this.post(uploadUrl, { ...params }).then(res => res.data);
        return data
    }

    async getFileUrl(cloudId: string) {
        const uploadUrl = `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${this.access_token}`
        const condition = {
            "env": Base_Env,
            "file_list": [
                {
                    "fileid": cloudId,
                    "max_age": 7200
                }
            ]
        }
        const data = await this.post(uploadUrl, { ...condition }).then(res => res.data);
        return data
    }


    async getActivitySpeciesCollectionAll() {
        const url = `${Base_Url}?access_token=${this.access_token}`;
        const query = `db.collection('ActivitySpeciesCollection').limit(20).skip(${0}).get()`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res);
        let list: any[] = [];
        (data.data.data as any).map(async (res: any) => {
            list.push(await changeStringToJson(res));
        })
        return list
    }

    async updateActivityInfoDetail(params: ChangeGames) {
        const url = `${Base_Url_Update}?access_token=${this.access_token}`;
        const id = params._id;
        delete params._id;
        delete params.CreateTime
        const query = `db.collection('ActivityInfo').where({_id:'${id}'}).update({data:${JSON.stringify(params)}})`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res.data);
        return data
    }

    async addActivityInfoDetail(params: ChangeGames) {
        const url = `${Base_Url_Add}?access_token=${this.access_token}`;
        delete params._id;
        params.CreateTime = new Date() as any;
        const query = `db.collection('ActivityInfo').add({data:${JSON.stringify(params)}})`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res.data);
        return data
    }


    async getActivityDetailsById(id: string) {
        const url = `${Base_Url}?access_token=${this.access_token}`;
        const query = `db.collection('ActivityDetails').where({_id:'${id}'}).get()`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res.data.data);
        return data
    }

    async updateActivityDetails(params: CreateActivityDetails) {
        const url = `${Base_Url_Update}?access_token=${this.access_token}`;
        const id = params._id;
        delete params._id;
        delete params.CreateTime
        const query = `db.collection('ActivityDetails').where({_id:'${id}'}).update({data:${JSON.stringify(params)}})`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res.data);
        return data
    }


    async addActivityDetails(params: CreateActivityDetails) {
        const url = `${Base_Url_Add}?access_token=${this.access_token}`;
        delete params._id;
        params.CreateTime = new Date() as any;
        const query = `db.collection('ActivityDetails').add({data:${JSON.stringify(params)}})`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res.data);
        return data
    }

    async delectActivityDetails(id: string) {
        const url = `${Base_Url_delect}?access_token=${this.access_token}`;
        const query = `db.collection('ActivityDetails').where({_id:'${id}'}).remove()`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res.data);
        return data
    }


    async getActivitySpeciesCollection() {
        const url = `${Base_Url}?access_token=${this.access_token}`;
        const query = `db.collection('ActivitySpeciesCollection').get()`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res.data);
        let list: any[] = [];
        (data.data as any).map(async (res: any) => {
            const source = await changeStringToJson(res);
            source.key = source._id
            list.push(source);
        })
        return list
    }

    async updateActivitySpeciesCollection(params: ChangedActivitySpeciesCollection) {
        const url = `${Base_Url_Update}?access_token=${this.access_token}`;
        const id = params._id;
        delete params._id;
        delete params.CreateTime
        const query = `db.collection('ActivitySpeciesCollection').where({_id:'${id}'}).update({data:${JSON.stringify(params)}})`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res.data);
        return data
    }


    async addActivitySpeciesCollection(params: ChangedActivitySpeciesCollection) {
        const url = `${Base_Url_Add}?access_token=${this.access_token}`;
        delete params._id;
        params.CreateTime = new Date() as any;
        const query = `db.collection('ActivitySpeciesCollection').add({data:${JSON.stringify(params)}})`
        const data = await this.post(url, { env: Base_Env, query }).then(res => res.data);
        return data
    }


}