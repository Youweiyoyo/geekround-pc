import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './layout.scss'
import { Outlet, Link, useLocation } from 'react-router-dom'
const { Header, Sider } = Layout
export default function LayOut() {
  const { pathname } = useLocation()
  const items = [
    { label: <Link to="/home">数据管理</Link>, key: '/home' },
    { label: <Link to="/publish">发布管理</Link>, key: '/publish' },
    { label: <Link to="/article">文章管理</Link>, key: '/article' },
  ]
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">user.name</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            items={items}
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {/* antD 4.20可用，之后的版本报警告 */}
            {/* <Menu.Item icon={<HomeOutlined />} key="1">
              数据概览
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="2">
              内容管理
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="3">
              发布文章
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
