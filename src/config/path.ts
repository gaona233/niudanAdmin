import GamesInfo from "pages/gamesInfo/list";
import GamesDetailList from "pages/gamesInfo/detailList";
import UserInfo from "pages/userInfo";
import ListChange from 'pages/gamesInfo/listChange'
import DetailListChange from 'pages/gamesInfo/detailListChange'
import GamesCategory from 'pages/gamesCategory';

export const gamesIntro = '/gamesIntro';
export const gamesDetailList = '/gamesDetailList';
export const gameContro = '/gameContro';
export const gameControDetail = '/gameControDetail/:id';
export const userInfoList = '/userInfo';
export const listChange = '/listChange';
export const detailListChange = '/detailListChange'
export const gamesCategory = '/gamesCategory';

export const router = [{
    path: userInfoList,
    conponemt: UserInfo
},{
    path: listChange,
    conponemt: ListChange
}, {
    path: gamesDetailList,
    conponemt: GamesDetailList
}, {
    path: gamesIntro,
    conponemt: GamesInfo,
}, {
    path: detailListChange,
    conponemt: DetailListChange,
}, {
    path: gamesCategory,
    conponemt: GamesCategory,
}]
