import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Layout
import Header from './components/Header'
// import CoordinatorHeader from './components/C_Header'
// import ParticipantHeader from './components/P_Header'

// Pages
import Homepage from './pages/B_Homepage'
import Login from './pages/B_Login'
import Logout from './pages/B_Logout'
import Register from './pages/P_Register'
import CoordinatorRegister from './pages/C_Register'
import CoordinatorDashboard from './pages/C_Dashboard'
import ParticipantDashboard from './pages/P_Dashboard'
import ViewChallenge from './pages/C_ViewChallenge'
import PickRole from './pages/B_PickRole'
import CreateChallenge from './pages/C_CreateChallenge'
import Leaderboard from './pages/B_Leaderboard'
import UploadResource from './pages/C_UploadResource'

// Logged in users
import PrivateRoute from './components/PrivateRoute'
import './styles/pages.css'

// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import RoleRoute from './components/RoleRoute'

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

            <Route path='/logout' element={<PrivateRoute />}>
              <Route path='/logout' element={<Logout />} />
            </Route>

            <Route path='/coordinator-dashboard' element={
              <RoleRoute>
                <CoordinatorDashboard />
              </RoleRoute>
            } />

            <Route path='/create-challenge' element={
              <RoleRoute>
                <CreateChallenge />
              </RoleRoute>
            } />

            <Route path='/participant-dashboard' element={
              <RoleRoute>
                <ParticipantDashboard />
              </RoleRoute>
            } />

            <Route path='/view-challenge' element={
              <RoleRoute>
                <ViewChallenge />
              </RoleRoute>
            } />

            <Route path='/leaderboard' element={<PrivateRoute />}>
              <Route path='/leaderboard' element={<Leaderboard />} />
            </Route>

            <Route path='/upload-resource' element={<PrivateRoute />}>
              <Route path='/upload-resource' element={<UploadResource />} />
            </Route>

            <Route path='/register-participant' element={
              <RoleRoute>
                <Register />
              </RoleRoute>
            } />

            <Route path='/register-coordinator' element={
              <RoleRoute>
                <CoordinatorRegister />
              </RoleRoute>
            } />

          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App 