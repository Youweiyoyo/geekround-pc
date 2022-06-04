import { Card } from 'antd'
import './index.scss'
import logo from '@/assets/img/logo.png'
export default function Login() {
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
      </Card>
    </div>
  )
}
