import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import { defaultMenu } from 'config/menu';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';
const { Header, Sider, Content } = Layout;


class LayOutComp extends React.Component<any, any> {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const pathName = window.location.pathname || '';
    console.log('pathname', pathName, this.props.children)
    return (
      <Layout className='body'>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <h1 className='logol'>扭蛋后台</h1>
          <Menu theme="dark" mode="inline"
            defaultOpenKeys={defaultMenu.map(item => item.path)}
            defaultSelectedKeys={[pathName]}>
            {
              defaultMenu.map(res => (
                <Menu.Item key={res.path} onClick={() => { this.props.history.push(res.path); }}>
                  {React.createElement(res.iconComp, { key: `${res.path}--menu` })}
                  <span>{res.title}</span>
                </Menu.Item>
              ))
            }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: '0 30px' }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              background: "#fff",

            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(LayOutComp)

