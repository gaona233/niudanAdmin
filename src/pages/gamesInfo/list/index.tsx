import React from 'react';
import { gamesStore } from './store'
import moment from 'moment';
import { toJS, observable } from 'mobx';
import { Table, Button, Divider, Card } from 'antd';
import { observer } from 'mobx-react';
import styles from '../index.module.css';
import { commonStore } from '../store'
import { judgeIsFromCloud } from 'utils';
import { withRouter } from 'react-router';

@observer
class GamesInfo extends React.Component<any, any> {
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
            render: (text: any) => <p className={styles.textStyle}>{text}</p>
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
                            pathname: '/listChange',
                            search: `?id=${record['_id']}`
                        })
                    }}>修改</Button>
                    <Divider type="vertical" />
                    <Button type={'primary'} onClick={() => {
                          this.props.history.push({
                            pathname: '/GamesDetailList',
                            search: `?id=${record['_id']}`
                        })
                    }}>详情</Button>
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
        if (!gamesStore.gamesList) {
            return null
        }
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={() => {
                        this.props.history.push({
                            pathname: `/listChange`
                        });
                        this.props.history.go();
                    }}>添加</Button>
                </Card>
                <Table
                    key="Title"
                    loading={gamesStore.loading}
                    columns={this.columns}
                    dataSource={gamesStore.gamesList}
                    pagination={pagination}
                    onChange={({ total, current, pageSize },
                        filters) => {
                        gamesStore.condition = {
                            ...gamesStore.condition,
                            pageSize: pageSize || 10,
                            page: current || 0
                        }
                        gamesStore.getGamesInfo();
                    }}
                />
            </div>


        );
    }
}


export default withRouter(GamesInfo) 
