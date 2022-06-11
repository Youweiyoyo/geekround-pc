import history from '@/utils/history'
import { lazy, Suspense } from 'react'
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from 'react-router-dom'
import './App.css'
// 路由懒加载
const LayOut = lazy(() => import('@/pages/Layout/layout'))
const Publish = lazy(() => import('./pages/Publish/publish'))
const Article = lazy(() => import('./pages/Article/article'))
const AuthRouter = lazy(() => import('@/components/AuthComponent'))
const Login = lazy(() => import('@/pages/Login/login'))
const Home = lazy(() => import('@/pages/Home/home'))

function App() {
  return (
    <HistoryRouter history={history}>
      <Suspense>
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
      </Suspense>
    </HistoryRouter>
  )
}

export default App
