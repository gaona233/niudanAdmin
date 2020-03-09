import { InitService } from "../service/base";

const initService: InitService = new InitService();
export async function judgeAccessToke() {
    let access_token = localStorage.getItem('access_token');
    if (!access_token) {
        access_token = await initService.getAccessToken();
    }

    return access_token
}