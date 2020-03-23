import React from 'react';
import { gameDetailsStore } from './store'
import moment from 'moment';
import { toJS, observable } from 'mobx';
import { Table, Button, Divider, Card } from 'antd';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
const queryString = require('query-string');
@observer

class GamesDetailList extends React.Component<any, any> {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    async componentDidMount() {

        const { id } = queryString.parse(window.location.search);
        gameDetailsStore.condition = {
            ...gameDetailsStore.condition,
            id
        }
        await gameDetailsStore.getGamesDetailList();
    }

    columns = [
        {
            title: 'Title',
            dataIndex: 'Title',
            key: 'Title',
        },
        {
            title: '游戏图片',
            dataIndex: 'BgUrl',
            key: 'BgUrl',
            render: (text: string) => <img style={{ width: '100px', objectFit: 'cover' }} src={text} />
        }, {
            title: '开始时间',
            dataIndex: 'StartTime',
            key: 'StartTime',
            render: (text: any) => moment(text.$date).format('YYYY-MM-DD HH:mm')
        }, {
            title: '结束时间',
            dataIndex: 'EndTime',
            key: 'EndTime',
            render: (text: any) => moment(text.$date).format('YYYY-MM-DD HH:mm')
        }, {
            title: '权重',
            dataIndex: 'Index',
            key: 'Index',
        }, {
            title: '创建时间',
            dataIndex: 'CreateTime',
            render: (text: any) => moment(text.$date).format('YYYY-MM-DD HH:mm')
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text: any, record: any) => (
                <div style={{ display: 'flex' }}>
                    <Button type={'primary'} onClick={() => {
                        this.props.history.push({
                            pathname: '/detailListChange',
                            search: `?id=${gameDetailsStore.condition.id}&detailId=${record['_id']}`
                        })
                    }}>修改</Button>
                    <Divider type="vertical" />
                    <Button type={'primary'} onClick={async () => {
                        await gameDetailsStore.delect(record._id)
                    }}>删除</Button>
                </div>

            )
        }
    ]

    render() {
        console.log(toJS(gameDetailsStore.gamesDetailList));
        const pagination = {
            total: gameDetailsStore.total,
            pageSize: gameDetailsStore.condition.pageSize,
            current: gameDetailsStore.condition.page + 1,
            showSizeChanger: true,
        }

        return (
            <div>
                <Card>
                    <Button type="primary" onClick={() => {
                        this.props.history.push({
                            pathname: '/detailListChange',
                            search: `?id=${gameDetailsStore.condition.id}`
                        })
                    }}>添加</Button>
                    <Divider type="vertical" />
                    <Button onClick={() => {
                        this.props.history.push({
                            pathname: `/gamesIntro`,
                        })
                    }}>返回</Button>
                </Card>
                <Table
                    key="_id"
                    loading={gameDetailsStore.loading}
                    columns={this.columns}
                    dataSource={gameDetailsStore.gamesDetailList}
                    pagination={pagination}
                    onChange={({ total, current, pageSize },
                        filters) => {
                        gameDetailsStore.condition = {
                            ...gameDetailsStore.condition,
                            pageSize: pageSize || 10,
                            page: current || 0
                        }
                        gameDetailsStore.getGamesDetailList();
                    }}
                />
            </div>

        );
    }
}


export default withRouter(GamesDetailList)
