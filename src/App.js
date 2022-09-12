import { Routes, Route, useNavigate, HashRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useEffect } from 'react'

import Home from './pages/Home'
import { Login } from './components'
import { fetchUser } from './utils/fetchUser'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const user = fetchUser()
    if (!user) {
      navigate('/login')
    }
  }, [])
  
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <HashRouter>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/*' element={<Home />}></Route>  
      </HashRouter>
    </GoogleOAuthProvider>
  );
}

export default App;