
import { action, computed, observable, toJS } from "mobx";
import { GamesService } from 'service/games';
import { Games, ChangeGames, ActivitySpeciesCollection } from 'models/games';
import { changeStringToJson } from "utils";
import { message } from "antd";

const defaultGame = {
    BgUrl: '',
    CreateTime: '',
    Description: '',
    IconUrl: '',
    Title: '',
    TypeId: '',
}

class GameDetailStore {
    private gamesService = new GamesService();
    @observable gameDetail: ChangeGames = defaultGame;
    @observable changedId: string;
    @observable loading: boolean = false;
    @observable fileName: string = '';
    @observable typeLIst: ActivitySpeciesCollection[];
    @observable uploadUrl: string;
    @action.bound
    async getGameListDetail() {
        const data = await this.gamesService.getActivityInfoDetail(this.changedId) as any
        const dataNew = await changeStringToJson(data.data[0]) as any;
        this.gameDetail = dataNew;
        this.uploadUrl = this.gameDetail.BgUrl;
        if (this.gameDetail.BgUrl.indexOf('cloud://') >= 0) {
            this.uploadUrl = await this.getFileUrl(this.gameDetail.BgUrl)
        }
        console.log('    this.uploadUrl =', this.uploadUrl)

    }


    @action.bound
    async getActivitySpeciesCollectionAll() {
        const data = await this.gamesService.getActivitySpeciesCollectionAll();
        this.typeLIst = data;
        console.log('+++', toJS(this.typeLIst))
    }

    @action.bound
    async uploadFile(params: any) {
        try {
            const data = await this.gamesService.uploadFile({ ...params });
            if (data.errcode == 0) {
                const response = (new Function("return " + data.resp_data))();
                const fileID = response.fileID;
                this.gameDetail = {
                    ...this.gameDetail,
                    BgUrl: fileID
                }
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
            const data = await this.gamesService.updateActivityInfoDetail(this.gameDetail);
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
            const data = await this.gamesService.addActivityInfoDetail(this.gameDetail);
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