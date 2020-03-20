import { gameContro, userInfoList, gamesIntro, gamesCategory } from "./path";
import { UserOutlined, DatabaseOutlined, LaptopOutlined } from '@ant-design/icons';
export const defaultMenu = [{
    path: userInfoList,
    title: '用户信息',
    iconComp: UserOutlined
}, {
    path: gamesIntro,
    title: '游戏信息',
    iconComp: LaptopOutlined
}, {
    path: gamesCategory,
    title: '游戏分类',
    iconComp: DatabaseOutlined
}]