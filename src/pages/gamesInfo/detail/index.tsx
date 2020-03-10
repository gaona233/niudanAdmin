import React from 'react';
import { gamesStore } from '../store'
import moment from 'moment';
import { toJS, observable } from 'mobx';
import { Table, Button, Divider } from 'antd';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
@observer

class GamesInfoDetail extends React.Component<any, any> {
    async componentDidMount() {
        await gamesStore.getGamesInfo();
    }
    columns = [
        {
            title: 'Title',
            dataIndex: 'Title',
            key: 'Title',
        },
        {
            title: '图标',
            dataIndex: 'IconUrl',
            key: 'IconUrl',
            render: (text: string) => <img style={{ width: '100px', objectFit: 'cover' }} src={text} />
        },
        {
            title: '背景图片',
            dataIndex: 'BgUrl',
            key: 'BgUrl',
            render: (text: string) => <img style={{ width: '100px', objectFit: 'cover' }} src={text} />
        }, {
            title: '类型',
            dataIndex: 'TypeId',
            key: 'TypeId',
        }, {
            title: '描述',
            dataIndex: 'Description',
            key: 'Description',
        }, {
            title: '创建时间',
            dataIndex: 'CreateTime',
            render: (text: any) => moment(text.$date).format('YYYY-MM-DD')
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text: any, record: any) => (
                <div style={{ display: 'flex' }}>
                    <Button type={'primary'} onClick={() => {
                        this.props.history.push({
                            pathname: '/demo',
                            query: {
                                name: '两百斤'
                            }
                        })
                    }}>修改</Button>
                    <Divider type="vertical" />
                    <Button type={'primary'}>详情</Button>
                </div>

            )
        }
    ]

    render() {
        console.log(toJS(gamesStore.gamesList));
        const pagination = {
            total: gamesStore.total,
            pageSize: gamesStore.condition.pageSize,
            current: gamesStore.condition.page + 1,
            showSizeChanger: true,
        }
        return (
            'detail'
        );
    }
}


export default withRouter(GamesInfoDetail)
