import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/P_Dashboard'
import Login from './pages/B_Login'
import Register from './pages/P_Register'
import Homepage from './pages/B_Homepage'

function AppContent() {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <div className='container'>
      {!isHomepage && <Header />}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
