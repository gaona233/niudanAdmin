import React from 'react';
import { UserService } from 'service/base';
import { GamesService } from 'service/games';
export default class GamesInfo extends React.Component {
    userService: UserService;
    gamesService: GamesService;
    constructor(props: any) {
        super(props);
        this.userService = new UserService();
        this.gamesService = new GamesService();
    }
    async componentDidMount() {
        const games = await this.gamesService.getActivityInfo({ page: 1, pageSize: 10 });
    }
    render() {
        return ('gamesInfo');
    }
}

