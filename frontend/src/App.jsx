import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Homepage from './pages/B_Homepage'
import Login from './pages/B_Login'
import Register from './pages/C_Register'
import PRegister from './pages/P_Register'
import Dashboard from './pages/P_Dashboard'
import Leaderboard from './pages/B_Leaderboard'
import PrivateRoute from './components/PrivateRoute'
import './styles/pages.css'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/pregister' element={<PRegister />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App 