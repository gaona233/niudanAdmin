import { InitService } from "../service/base";

const initService: InitService = new InitService();
export async function judgeAccessToke() {
    let access_token = localStorage.getItem('access_token');
    if (!access_token) {
        access_token = await initService.getAccessToken();
    }

    return access_token
}

export async function changeStringToJson(data: string) {
    return (new Function("return " + data))()
}

export async function judgeIsFromCloud(url: string) {
    return url.indexOf('cloud://') >= 0
}