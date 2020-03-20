import React from 'react';
import { gamesCategoryStore } from './store'
import moment from 'moment';
import { toJS, observable } from 'mobx';
import { Table, Button, Divider, Card, Modal, Form, Input, message } from 'antd';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { ChangedActivitySpeciesCollection } from 'models/games';

const defaultAddData: ChangedActivitySpeciesCollection = {
	Abbreviation: '',
	Company: '',
	CreateTime: new Date(),
	Name: ""
}
@observer
class GamesCategory extends React.Component<any, any> {
	async componentDidMount() {
		await gamesCategoryStore.getGamesCategory();
	}

	columns = [
		{
			title: '中文名称',
			dataIndex: 'Name',
			key: 'Name',
		},
		{
			title: '缩写',
			dataIndex: 'Abbreviation',
			key: 'Abbreviation',
		}, {
			title: '公司',
			dataIndex: 'Company',
			key: 'Company',
		}, {
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			render: (text: any, record: any) => (
				<div style={{ display: 'flex' }}>
					<Button type={'primary'} onClick={() => {
						gamesCategoryStore.isEdit = true;
						gamesCategoryStore.visible = true;
						gamesCategoryStore.changedData = { ...record };
						console.log('gamesCategoryStore.changedData ', gamesCategoryStore.changedData)
					}}>修改</Button>
				</div>

			)
		}
	];

	layout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 20 },
	};
	tailLayout = {
		wrapperCol: { offset: 4, span: 20 },
	};


	submit = async (values) => {
		try {
			console.log('e', values)
			gamesCategoryStore.changedData = {
				...gamesCategoryStore.changedData,
				...values
			};
			if (gamesCategoryStore.isEdit) {
				await gamesCategoryStore.update()
			} else {
				await gamesCategoryStore.add()
			}
			gamesCategoryStore.visible = false;
			gamesCategoryStore.getGamesCategory();
		} catch (error) {
			message.error(error.message)
		}
	}
	changeModel = () => {
		return (<Modal
			visible={gamesCategoryStore.visible}
			onCancel={() => gamesCategoryStore.visible = false}
			footer={null}
		>
			<Form
				{...this.layout}
				name="basic"
				initialValues={{ ...gamesCategoryStore.changedData }}
				onFinish={this.submit}
				style={{ padding: '20px 0' }}>
				<Form.Item
					name="Name"
					label="名称"
					rules={[{ required: true, message: '名称必填' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="Abbreviation"
					label="缩写"
					rules={[{ required: true, message: '缩写必填--注意大小写以及长度' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="Company"
					label="公司"
					rules={[{ required: true, message: '公司必填' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item  {...this.tailLayout}>
					<Button type="primary" htmlType="submit">确定</Button>
					<Divider type="vertical" />
					<Button type="default" onClick={() => {
						gamesCategoryStore.visible = false;
					}}>返回</Button>
				</Form.Item>
			</Form>
		</Modal>)
	}

	render() {
		console.log(toJS(gamesCategoryStore.gamesList));
		if (!gamesCategoryStore.gamesList) {
			return null
		}
		return (
			<div>
				<Card>
					<Button type="primary" onClick={() => {
						gamesCategoryStore.visible = true;
						gamesCategoryStore.changedData = defaultAddData;
						gamesCategoryStore.isEdit = false;
					}}>添加</Button>
				</Card>
				<Table
					key="_id"
					loading={gamesCategoryStore.loading}
					columns={this.columns}
					dataSource={gamesCategoryStore.gamesList}
					pagination={false}
				/>
				{this.changeModel()}
			</div>


		);
	}
}


export default withRouter(GamesCategory) 
