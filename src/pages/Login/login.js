import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import './index.scss'
import logo from '@/assets/img/logo.png'
import useStore from '@/store/index'
//  导入路由跳转
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const { loginStore } = useStore()
  const navigate = useNavigate()
  const onFinish = async ({ mobile, code }) => {
    await loginStore.getToken({ mobile, code })
    message.success('登录成功')
    // 编程式导航
    navigate('/', { replace: true })
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        <Form
          initialValues={{ remember: true }}
          labelCol={{ span: 4 }}
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
        >
          <Form.Item
            label="手机号"
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入正确的手机号',
                validateTrigger: 'onBlur',
              },
              {
                required: true,
                message: '请输入手机号!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="验证码"
            name="code"
            rules={[
              {
                len: 6,
                message: '验证码为6位字符',
                validateTrigger: 'onBlur',
              },
              {
                required: true,
                message: '请输入验证码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Checkbox>已知晓协议o_0</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
