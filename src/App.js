import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/pages/Layout/layout'
import Login from '@/pages/Login/login'
import AuthRouter from '@/components/AuthComponent'
import { Button } from 'antd'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Button type="primary">Primary Button</Button>
        <Routes>
          <Route path="/login" element={<Login />}>
            login
          </Route>
          <Route
            path="/"
            element={
              <AuthRouter>
                <Layout />
              </AuthRouter>
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
