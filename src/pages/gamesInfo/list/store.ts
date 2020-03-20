
import { action, computed, observable } from "mobx";
import { PagingBaseParams } from "models/base";
import { GamesService } from "service/games";
import { Games } from "models/games";
import { commonStore } from "../store";
import { judgeIsFromCloud, changeStringToJson } from "utils";

const defaultCondition: PagingBaseParams = {
    page: 0,
    pageSize: 10
}

class GamesInfoStore {
    private gamesService = new GamesService();
    @observable gamesList: Games[];
    @observable condition = defaultCondition;
    @observable loading: boolean = true;
    @observable total: number = 0;
    @action.bound
    async getGamesInfo() {
        const { data, total } = await this.gamesService.getGames({ ...this.condition });
        let dataNew: Games[] = [];
        for (let i = 0; i < data.length; i++) {

            const source = await changeStringToJson(data[i]);
            source.key = source['_id'];
            const isCloud = await judgeIsFromCloud(source.BgUrl);
            console.log('isCloud', isCloud)
            if (isCloud) {
                source.BgUrl = await commonStore.getFileUrl(source.BgUrl);
            }
            console.log('source.BgUrl ', source)
            dataNew.push(source)
        }
        this.gamesList = [...dataNew];
        this.total = total;
        this.loading = false;

    }

}

export const gamesStore = new GamesInfoStore()