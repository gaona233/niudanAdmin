import GamesInfo from "pages/gamesInfo";
import UserInfo from "pages/userInfo";
import IndexComp from "pages/home";

export const gamesInfo = '/gamesInfo';
export const gamesDetails = '/gamesDetail:id';
export const gameContro = '/gameContro';
export const gameControDetail = '/gameControDetail:id';
export const userInfoList = '/userInfo';
export const index = '/'

export const router = [{
    path: gamesInfo,
    conponemt: GamesInfo,
}, {
    path: userInfoList,
    conponemt: UserInfo
}, {
    path: index,
    conponemt: IndexComp
}]
