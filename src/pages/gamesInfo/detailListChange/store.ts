
import { action, computed, observable, toJS } from "mobx";
import { GamesService } from 'service/games';
import {  CreateActivityDetails } from 'models/games';
import { changeStringToJson } from "utils";
import { message } from "antd";
import moment from "moment";

const defaultGame = {
    ActivityId: '',
    BgUrl: '',
    CreateTime: '',
    Detail: '',
    EndTime: null,
    StartTime: null,
    Index: '',
    Title: ''
}

class GameDetailStore {
    private gamesService = new GamesService();
    @observable gameDetail: CreateActivityDetails = defaultGame;
    @observable changedId: string;
    @observable loading: boolean = false;
    @observable fileName: string = '';
    @observable uploadUrl: string;
    @action.bound
    async getGameListDetail() {
        const data = await this.gamesService.getActivityDetailsById(this.changedId) as any;
        const dataNew = await changeStringToJson(data[0]) as any;
        this.uploadUrl = dataNew.BgUrl;
        if (dataNew.BgUrl.indexOf('cloud://') >= 0) {
            this.uploadUrl = await this.getFileUrl(dataNew.BgUrl)
        }
        dataNew.EndTime = moment(dataNew.EndTime);
        dataNew.StartTime = moment(dataNew.StartTime);
        this.gameDetail = dataNew;
        console.log(' this.uploadUrl =', this.gameDetail)

    }

    @action.bound
    async uploadFile(params: any) {
        try {
            const data = await this.gamesService.uploadFile({ ...params });
            if (data.errcode == 0) {
                const response = (new Function("return " + data.resp_data))();
                console.log('data', response);
                const fileID = response.fileID;
                this.gameDetail.BgUrl = fileID;
                const url = await this.getFileUrl(fileID);
                this.uploadUrl = url;
            } else {
                throw new Error('上传失败')
            }
        } catch (error) {

        }

    }

    @action.bound
    async getFileUrl(fileID: string) {
        try {
            const data = await this.gamesService.getFileUrl(fileID);
            console.log('fileID', data);
            return data.file_list[0].download_url
        } catch (error) {
            throw new Error('获取上传链接失败')
        }

    }


    @action.bound
    async update() {
        try {
            const data = await this.gamesService.updateActivityDetails(this.gameDetail);
            if (data.errcode === 0) {
                message.success('修改成功')
            } else {
                throw new Error('添加失败')
            }
        } catch (error) {
            throw new Error(error.message)
        }

    }

    @action.bound
    async add() {
        try {
            const data = await this.gamesService.addActivityDetails(this.gameDetail);
            if (data.errcode === 0) {
                message.success('添加成功')
            } else {
                throw new Error('添加失败')
            }
        } catch (error) {
            throw new Error(error.message)
        }

    }
}

export const gamesStore = new GameDetailStore()