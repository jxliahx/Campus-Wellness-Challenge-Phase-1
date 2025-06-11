import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Homepage from './pages/B_Homepage'
import Login from './pages/B_Login'
import Register from './pages/P_Register'
import CoordinatorRegister from './pages/C_Register'
import CoordinatorDashboard from './pages/C_Dashboard'
import ParticipantDashboard from './pages/P_Dashboard'
import PickRole from './pages/B_PickRole'
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
            <Route path='/coordinator-register' element={<CoordinatorRegister />} />
            <Route path='/pick-role' element={<PickRole />} />
            <Route path='/coordinator-dashboard' element={<PrivateRoute />}>
              <Route path='/coordinator-dashboard' element={<CoordinatorDashboard />} />
            </Route>
            <Route path='/participant-dashboard' element={<PrivateRoute />}>
              <Route path='/participant-dashboard' element={<ParticipantDashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App 