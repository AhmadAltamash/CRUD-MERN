import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('firstLogin')
    setUsername('');
    window.location.href = '/';
  };

  return (
    <nav className='nav'>
      <h3 className='userInfo'>
        <span>Welcome, </span>
        <span>{username}</span>
      </h3>
      <Link to='/welcomeadmin'>Home</Link>
      <Link to='/employeelist'>Employee's List</Link>
      <Link to='/addemployee'>Add New Employee</Link>
      <button className='logoutBtn' onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navigation;
