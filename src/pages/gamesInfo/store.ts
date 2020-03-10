
import { action, computed, observable } from "mobx";
import { User } from '../../models/user';
import { PagingBaseParams } from "../../models/base";
import { GamesService } from "../../service/games";
import { Games } from "../../models/games";
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
        const dataNew = data.map((res: any) => {
            const source = (new Function("return " + res))();
            source.key = source['_id'];
            return source
        })
        this.gamesList = [...dataNew];
        this.total = total;
        this.loading = false;
    }
}

export const gamesStore = new GamesInfoStore()