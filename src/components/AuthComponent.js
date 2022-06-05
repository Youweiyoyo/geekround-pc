// 高阶组件： 把一个组件当成另一个组件的参数传入
// 通过一定的判断，返回新的组件
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

export default function AuthComponent({ children }) {
  const token = getToken()

  //  token 存在返回子组件
  if (token) {
    return <>{children}</>
  } else {
    // 否则重定向到登录页
    return (
      <>
        <Navigate to="/login" replace></Navigate>
      </>
    )
  }
}
