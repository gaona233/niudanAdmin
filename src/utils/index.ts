import { UserService } from "../service/base";

const userService: UserService = new UserService();
export async function judgeAccessToke() {
    let access_token = localStorage.getItem('access_token');
    if (!access_token) {
        access_token = await userService.getAccessToken();
    }

    return access_token
}