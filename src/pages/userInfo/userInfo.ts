
import { action, computed, observable } from "mobx";
import { User } from '../../models/user';
import { UserService } from '../../service/user';
import { PagingBaseParams } from "../../models/base";
import { inject } from "mobx-react";
const defaultCondition: PagingBaseParams = {
    page: 0,
    pageSize: 10
}
class UserInfoStore {
    private userService = new UserService();
    @observable userInfoList: User[];
    @observable condition = defaultCondition;
    @observable loading: boolean = true;
    @observable total: number = 0;
    @action.bound
    async getUserInfo() {
        const { data, total } = await this.userService.getUserInfo({ ...this.condition });
        const dataNew = data.map((res: any) => {
            return (new Function("return " + res))();
        })
        this.userInfoList = [...dataNew];
        this.total = total;
        this.loading = false;
        console.log('data', this.userInfoList, dataNew, data)
    }
}

export const userInfoStore = new UserInfoStore()