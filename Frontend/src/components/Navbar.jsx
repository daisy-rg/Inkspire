import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../App'
import './Navbar.css'

function Navbar() {
  const { token, user, handleLogout } = useContext(AuthContext)

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/" className="header-logo">Inkspire</Link>
        </div>

        <nav className="header-nav">
          <Link to="/story" className="header-link">Our Story</Link>
          {token && <Link to="/write" className="header-link">Write</Link>}
          {token ? (
            <>
              <span className="header-username">{user?.username}</span>
              <button onClick={handleLogout} className="header-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="header-link">Sign In</Link>
              <Link to="/get-started">
                <button className="header-button">Get Started</button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar