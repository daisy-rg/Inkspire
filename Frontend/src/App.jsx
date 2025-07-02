import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { createContext, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Signup from './components/Signup'
import Write from './components/Write'
import Postlist from './pages/Postlist'
import FullPost from './components/Fullpost'

export const AuthContext = createContext()

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(token)
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, handleLogin, handleLogout }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={!token ? <Signup /> : <Navigate to="/" />} />
          <Route path="/write" element={token ? <Write /> : <Navigate to="/signin" />} />
          <Route path="/get-started" element={<Signup />} />
          <Route path="/start" element={<Postlist />} />
          <Route path="/posts/:postId" element={<FullPost />} />
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  )
}

export default App
