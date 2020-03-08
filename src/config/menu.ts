import { gameContro, userInfoList, gamesInfo } from "./path";
import { UserOutlined, DatabaseOutlined, LaptopOutlined } from '@ant-design/icons';
export const defaultMenu = [{
    path: userInfoList,
    title: '用户信息',
    iconComp: UserOutlined
}, {
    path: gameContro,
    title: '游戏推荐',
    iconComp: DatabaseOutlined
}, {
    path: gamesInfo,
    title: '游戏信息',
    iconComp: LaptopOutlined
}]