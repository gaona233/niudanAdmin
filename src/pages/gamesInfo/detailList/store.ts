
import { action, computed, observable } from "mobx";
import { GamesService } from "service/games";
import { Games, GetGamesDetailParams } from "models/games";
import { changeStringToJson, judgeIsFromCloud } from "utils";
import { commonStore } from "../store";
import { message } from "antd";
const defaultCondition: GetGamesDetailParams = {
    page: 0,
    pageSize: 10,
    id: ''
}

class GamesDetailInfoStore {
    private gamesService = new GamesService();
    @observable gamesDetailList: Games[];
    @observable condition: GetGamesDetailParams = defaultCondition;
    @observable loading: boolean = true;
    @observable total: number = 0;
    @action.bound

    async getGamesDetailList() {
        const { data, total } = await this.gamesService.getGameDetailsList({ ...this.condition });
        let dataNew: Games[] = [];
        for (let i = 0; i < data.length; i++) {
            let source = await changeStringToJson(data[i]);
            source.key = source['_id'];
            const isCloudImg = await judgeIsFromCloud(source.BgUrl)
            if (isCloudImg) {

                source.BgUrl = await commonStore.getFileUrl(source.BgUrl)
            }
            dataNew.push(source)
        }
        this.gamesDetailList = [...dataNew];
        this.total = total;
        this.loading = false;
    }

    async delect(id: string) {
        try {
            const data = await this.gamesService.delectActivityDetails(id);
            if (data.errcode !== 0) {
                throw new Error(data.errmsg)
            }
            console.log('data', data)
            message.success('删除成功');
            await this.getGamesDetailList();
        } catch (error) {

        }
    }


}

export const gameDetailsStore = new GamesDetailInfoStore()