import GamesInfo from "pages/gamesInfo/list";
import GamesInfoDetail from "pages/gamesInfo/detail";
import UserInfo from "pages/userInfo";
import IndexComp from "pages/home";

export const gamesInfo = '/gamesInfo';
export const gamesDetails = `${gamesInfo}/:id'`;
export const gameContro = '/gameContro';
export const gameControDetail = '/gameControDetail/:id';
export const userInfoList = '/userInfo';
export const index = '/'

export const router = [{
    path: gamesInfo,
    conponemt: GamesInfo,
}, {
    path: gamesDetails,
    conponemt: GamesInfoDetail,
}, {
    path: userInfoList,
    conponemt: UserInfo
}, {
    path: index,
    conponemt: IndexComp
}]
