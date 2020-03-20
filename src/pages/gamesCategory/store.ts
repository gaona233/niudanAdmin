
import { action, observable } from "mobx";
import { GamesService } from "service/games";
import { ActivitySpeciesCollection, ChangedActivitySpeciesCollection } from "models/games";
import { message } from "antd";


class GamesCategoryStore {
    private gamesService = new GamesService();
    @observable gamesList: ActivitySpeciesCollection[] = [];
    @observable loading: boolean = true;
    @observable visible: boolean = false;
    @observable changedData: ChangedActivitySpeciesCollection;
    @observable isEdit: boolean = false
    @action.bound
    async getGamesCategory() {
        const data = await this.gamesService.getActivitySpeciesCollection();
        this.gamesList = [...data];

        this.loading = false;
    }

    async add() {
        const data = await this.gamesService.addActivitySpeciesCollection(this.changedData);
        if (data.errcode === 0) {
            message.success('添加成功')
        } else {
            throw new Error('添加失败')
        }
    }

    async update() {
        const data = await this.gamesService.updateActivitySpeciesCollection(this.changedData);
        if (data.errcode === 0) {
            message.success('更新成功')
        } else {
            throw new Error('更新失败')
        }
    }

}

export const gamesCategoryStore = new GamesCategoryStore()