import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './layout.scss'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import useStore from '@/store'
const { Header, Sider } = Layout
function LayOut() {
  //  通过 useLocation HOOK 获取 路由路径名称
  const { pathname } = useLocation()
  const { userStore, loginStore, channelStore } = useStore()
  const navigate = useNavigate()
  useEffect(() => {
    userStore.getUserInfo()
    channelStore.loadChannelList()
  }, [userStore, channelStore])
  const onConfirm = () => {
    //  清除 token 路由跳转到登录页
    loginStore.loginOut()
    navigate('/login')
  }
  const items = [
    {
      label: <Link to="/home">数据管理</Link>,
      key: '/home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/publish">发布管理</Link>,
      key: '/publish',
      icon: <DiffOutlined />,
    },
    {
      label: <Link to="/article">文章管理</Link>,
      key: '/article',
      icon: <EditOutlined />,
    },
  ]
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
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
              <Link to="/home">数据管理</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="2">
              <Link to="/publish">发布管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="3">
              <Link to="/article">文章管理</Link>
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
export default observer(LayOut)
