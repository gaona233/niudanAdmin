import { APPID, APP_SERCET } from "../config/app.config";
import BaseService from "base/service";

export class UserService extends BaseService {
    async getAccessToken() {
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APP_SERCET}`
        const data = await this.get(url).then(res => res);
        const { access_token } = data.data;
        if (access_token) {
            localStorage.setItem('access_token', access_token)
        }
        return access_token
    }

    

}