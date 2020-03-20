import React from 'react';
import { userInfoStore } from './userInfo'
import { inject, observer } from 'mobx-react';
import { Table } from 'antd';
import moment from 'moment';
import { toJS } from 'mobx';
import { withRouter } from 'react-router';
@inject('user')
@observer
class UserInfo extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    async  componentDidMount() {
        await userInfoStore.getUserInfo();
    }
    columns = [
        {
            title: '头像',
            dataIndex: 'AvatarUrl',
            key: 'AvatarUrl',
            render: (text: string) => (
                <img src={text} />
            )
        },
        {
            title: '昵称',
            dataIndex: 'NickName',
            key: 'NickName',
        },
        {
            title: '城市',
            dataIndex: 'City',
            key: 'City',
            render: (text: string, record: any) => (
                <span>{record.Province}--{text}</span>
            )
        }, {
            title: '性别',
            dataIndex: 'Gender',
            key: 'Gender',
            render: (text: number) => text == 2 ? '女' : "男"
        }, {
            title: 'openId',
            dataIndex: 'openId',
            key: 'openId',
        }, {
            title: '创建时间',
            dataIndex: 'CreateTime',
            key: 'CreateTime',
            render: (text: any) => moment(text.$date).format('YYYY-MM-DD')
        }
    ]

    render() {
        console.log(toJS(userInfoStore.userInfoList));
        const pagination = {
            total: userInfoStore.total,
            pageSize: userInfoStore.condition.pageSize,
            current: userInfoStore.condition.page + 1,
            showSizeChanger: true,
        }
        return (
            <Table
                key="_id"
                loading={userInfoStore.loading}
                columns={this.columns}
                dataSource={userInfoStore.userInfoList}
                pagination={pagination}
                onChange={({ total, current, pageSize },
                    filters) => {
                    userInfoStore.condition = {
                        ...userInfoStore.condition,
                        pageSize: pageSize || 10,
                        page: current || 0
                    }
                    userInfoStore.getUserInfo();

                }}
            />

        );
    }
}

export default withRouter(UserInfo)

