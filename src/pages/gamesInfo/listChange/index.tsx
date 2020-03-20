import React from 'react';
import { gamesStore } from './store'
import moment from 'moment';
import { toJS, observable } from 'mobx';
import { Table, Button, Divider, Form, Input, Checkbox, Upload, Select, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Games, ActivitySpeciesCollection } from 'models/games';
import { Base_Env } from 'config/app.config';
const queryString = require('query-string');
const { TextArea } = Input;
// import styles from '../index.module.css';
const Option = Select.Option;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 12 },
};
const formTailLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 12, offset: 4 },
};

@inject('user')
@observer
class ListChange extends React.Component<any, any> {

	async componentDidMount() {
		const { id } = queryString.parse(window.location.search);
		if (id) {
			gamesStore.changedId = id;
			await gamesStore.getGameListDetail();
		}
		await gamesStore.getActivitySpeciesCollectionAll();
	}

	handleSubmit = async (values: any) => {
		try {
			gamesStore.gameDetail = {
				...gamesStore.gameDetail,
				...values
			}
			console.log('-----', gamesStore.gameDetail)
			if (!gamesStore.gameDetail.BgUrl) {
				message.error('背景图片必填');
				return false;
			}
			if (gamesStore.changedId) {
				await gamesStore.update();
			} else {
				await gamesStore.add()
			}
		} catch (error) {
			message.error(error.message)
		}


	}

	uploadButton = (
		<div>
			{gamesStore.loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div className="ant-upload-text">Upload</div>
		</div>
	);

	render() {
		if (!gamesStore.gameDetail || (gamesStore.changedId && !gamesStore.gameDetail.Title)) {
			return null
		}
		return (<Form name="list_change" onFinish={this.handleSubmit} initialValues={{ ...gamesStore.gameDetail }}>
			<Form.Item
				{...formItemLayout}
				name="Title"
				label="游戏名称"
				rules={[
					{
						required: true,
						message: '游戏名称必填',
					},
				]}
			>
				<Input placeholder="游戏名称" />
			</Form.Item>

			<Form.Item
				{...formItemLayout}
				name="TypeId"
				label="游戏类型"
				rules={[
					{
						required: true,
						message: '游戏类型必填',
					},
				]}
			>
				<Select
					placeholder="请选择游戏类型"
					allowClear
				>
					{
						gamesStore.typeLIst && gamesStore.typeLIst.map((res: ActivitySpeciesCollection) => (
							<Option key={res._id} value={res._id}>{res.Name}</Option>
						))
					}

				</Select>
			</Form.Item>

			<Form.Item
				{...formItemLayout}
				label="图片背景"
			>
				<Upload
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					beforeUpload={(file) => {
						gamesStore.loading = true;
						gamesStore.uploadUrl = '';
						const fileReader = new FileReader();
						fileReader.readAsDataURL(file);
						fileReader.onload = async (e) => {
							await gamesStore.uploadFile({ file: fileReader.result, name: file.name });
							gamesStore.loading = false;
						};
						return false
					}}
				>
					{gamesStore.uploadUrl ? <img src={gamesStore.uploadUrl} alt="avatar" style={{ width: '100%' }} /> : this.uploadButton}
				</Upload>
			</Form.Item>
			<Form.Item
				{...formItemLayout}
				name="Description"
				label="游戏描述"
				rules={[
					{
						required: true,
						message: '游戏描述必填',
					},
				]}
			>
				<TextArea rows={4} placeholder="游戏描述" />
			</Form.Item>
			<Form.Item {...formTailLayout}>
				<Button type="primary" htmlType="submit">
					提交
         		</Button>
				<Divider type="vertical" />
				<Button type="default" onClick={() => {
					this.props.history.push({
						pathname: `/gamesIntro`
					})
				}}>
					返回
         		</Button>
			</Form.Item>
		</Form >
		)
	}
}


export default withRouter(ListChange)
