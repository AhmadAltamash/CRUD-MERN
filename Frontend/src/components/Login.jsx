import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [admin, setAdmin] = useState({
    username: '',
    password: ''
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { ...admin });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('firstLogin', true);
      localStorage.setItem('username', admin.username)
      window.location.href = '/welcomeadmin';
    } catch (error) {
      alert('Username/password Invalid')
      console.error("Login failed: ", error.response ? error.response.data : error.message);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="login">
      <form className="form" onSubmit={loginHandler}>
        <p className="form-title">Log in to your account</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            value={admin.username}
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={admin.password}
            required
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="submit">
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
