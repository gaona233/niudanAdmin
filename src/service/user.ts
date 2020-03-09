import BaseService from "../base/service";
import { judgeAccessToke } from "../utils/index";
import { PagingBaseParams } from "../models/base";
import { Base_Url, Base_Env } from "../config/app.config";

export class UserService extends BaseService {
	access_token: string;
	constructor() {
		super();
		this.access_token = localStorage.getItem('access_token') || "";
	}

	async getUserInfo(condition: PagingBaseParams) {
		const url = `${Base_Url}?access_token=${this.access_token}`;
		const query = `db.collection("User").limit(${condition.pageSize}).skip(${condition.page}).get()`
		const data = await this.post(url, { env: 'dev-9ob4t', query }).then(res => res);
		return {
			data: data.data.data,
			total: data.data.pager.Total
		}
	}

}