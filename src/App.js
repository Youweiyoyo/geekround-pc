import history from '@/utils/history'
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from 'react-router-dom'
import './App.css'
import LayOut from '@/pages/Layout/layout'
import Login from '@/pages/Login/login'
import Home from '@/pages/Home/home'
import Publish from './pages/Publish/publish'
import Article from './pages/Article/article'
import AuthRouter from '@/components/AuthComponent'

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/"
            element={
              <AuthRouter>
                <LayOut />
              </AuthRouter>
            }
          >
            <Route index path="home" element={<Home />}></Route>
            <Route path="article" element={<Article />}></Route>
            <Route path="publish" element={<Publish />}></Route>
          </Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App
