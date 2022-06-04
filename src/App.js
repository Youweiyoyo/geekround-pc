import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/pages/Layout/layout'
import Login from '@/pages/Login/login'
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
          <Route path="/" element={<Layout />}>
            loyOut
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
