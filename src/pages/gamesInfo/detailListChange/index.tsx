import React from 'react';
import { gamesStore } from './store'
import moment from 'moment';
import { toJS, observable } from 'mobx';
import { Table, Button, Divider, Form, Input, Checkbox, Upload, Select, message, DatePicker, InputNumber } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { ActivitySpeciesCollection } from '../../../models/games';
const queryString = require('query-string');
const { TextArea } = Input;
// import styles from '../index.module.css';
const Option = Select.Option;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
};
const formTailLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16, offset: 4 },
};

@inject('user')
@observer
class DetailListChange extends React.Component<any, any> {

	async componentDidMount() {
		const { detailId, id } = queryString.parse(window.location.search);
		gamesStore.gameDetail.ActivityId = id;
		if (detailId) {
			gamesStore.changedId = detailId;
			await gamesStore.getGameListDetail();
		}
	}

	handleSubmit = async (values: any) => {
		try {
			gamesStore.gameDetail = {
				...gamesStore.gameDetail,
				...values,
				StartTime: new Date(values.StartTime),
				EndTime: new Date(values.EndTime),
				Detail: (gamesStore.gameDetail.Detail as any).toHTML()
			}
			if (!gamesStore.gameDetail.BgUrl) {
				message.error('背景图片必填');
			}
			if (gamesStore.changedId) {
				await gamesStore.update();
			} else {
				await gamesStore.add();
			}
			this.geBack();
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

	handleEditorChange = (data: any) => {
		gamesStore.gameDetail.Detail = data

	}

	geBack = () => {
		// this.props.history.push({
		// 	pathname: `/gamesDetailList?id=${gamesStore.gameDetail.ActivityId}`
		// })

		this.props.history.go(-1);
	}


	render() {
		if (!gamesStore.gameDetail || (gamesStore.changedId && !gamesStore.gameDetail.Title)) {
			return null
		}

		return (
			<div style={{ background: "#fff" }}>
				<Form name="list_change" onFinish={this.handleSubmit} initialValues={{
					...gamesStore.gameDetail
				}}>
					<Form.Item
						{...formItemLayout}
						name="Title"
						label="活动名称"
						rules={[
							{
								required: true,
								message: '活动名称必填',
							},
						]}
					>
						<Input placeholder="活动名称" />
					</Form.Item>
					<Form.Item
						{...formItemLayout}
						name="Index"
						label="权重"
						rules={[
							{
								required: true,
								message: '权重必填',
							},
						]}
					>
						<InputNumber />
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
								const fileReader = new FileReader();
								fileReader.readAsDataURL(file);
								fileReader.onload = function (e) {
									gamesStore.uploadFile({ file: fileReader.result, name: file.name });
								};
								return false
							}}
						>
							{gamesStore.uploadUrl ? <img src={gamesStore.uploadUrl} alt="avatar" style={{ width: '100%' }} /> : this.uploadButton}
						</Upload>
					</Form.Item>

					<Form.Item
						{...formItemLayout}
						name="StartTime"
						label="开始时间"
						rules={[
							{
								required: true,
								message: '开始时间必填',
							},
						]}
					>
						<DatePicker
							allowClear
							format="YYYY-MM-DD HH:mm"
							placeholder="开始时间"
							showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
						/>
					</Form.Item>

					<Form.Item
						{...formItemLayout}
						name="EndTime"
						label="结束时间"
						rules={[
							{
								required: true,
								message: '结束时间必填',
							},
						]}
					>
						<DatePicker
							allowClear
							format="YYYY-MM-DD HH:mm"
							showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
							placeholder="结束时间"
						/>
					</Form.Item>
					<Form.Item
						{...formItemLayout}
						label="游戏描述"
					>
						<div className="my-component" style={{ border: '1px solid #333' }}>
							<BraftEditor
								onChange={this.handleEditorChange}
								defaultValue={BraftEditor.createEditorState(gamesStore.gameDetail.Detail)}
							/>
						</div>
					</Form.Item>
					<Form.Item {...formTailLayout}>
						<Button type="primary" htmlType="submit">
							提交
         				</Button>
						<Divider type="vertical" />
						<Button type="default" onClick={() => this.geBack()}>
							返回
         				</Button>
					</Form.Item>
				</Form >
			</div>
		)
	}
}


export default withRouter(DetailListChange)
