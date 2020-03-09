import BaseService from "base/service";
import { judgeAccessToke } from "utils/index";
import { PagingBaseParams } from "models/base";

export class GamesService extends BaseService {
    access_token: string;
    constructor() {
        super();
        judgeAccessToke().then(res => this.access_token = res || '');
    }

    async getActivityInfo(condition: PagingBaseParams) {
        const url = `https://api.weixin.qq.com/tcb/databasequery?access_token=${this.access_token}`;
        const query = `db.collection("ActivityInfo").limit(10).skip(1).get()`
        const data = await this.post(url, { env: 'dev-9ob4t', query }).then(res => res);
        console.log('getActivityInfo', data)
    }

}