import { observable } from "mobx";
import { InitService } from '../service/base'
export class UserStore {
    private initService = new InitService();
    @observable access_token: string = '';

    async init() {
        const data = await this.initService.getAccessToken();
        this.access_token = data;
    }
}
