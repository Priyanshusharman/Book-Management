// src/components/Navbar.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../css/Navbar.css'; // Import the CSS file

const Navbar = ({ keyword, setKeyword }) => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const bookspage =(e)=>{
    navigate("/")
  }
  return (
    <nav className="navbar">
      <h1 className="navbar-title" onClick={bookspage}>Book Management</h1>
      <form className="navbar-search">
        <input
        className='search-area'
          type="text"
          placeholder="Search books..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      <div className="navbar-auth">
        {user ? (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="login-button">Login</Link>
            {/* <Link to="/register" className="register-button">Register</Link> */}
          </>
        )}
      </div>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      {menuOpen && (
        <div className="dropdown-menu">
          {user ? (
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="login-button">Login</Link>
              <Link to="/register" className="register-button">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
