import React, { useEffect } from 'react';
import Navigation from './Navigation';

function WelcomePage() {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      window.location.href = '/';
    }
  }, []);
  console.log(token)

  return (
    <>
      <Navigation/>
      <div className="container">
        <video autoPlay loop muted src="/video.mp4" width={600}></video>
      </div>
    </>
  );
}

export default WelcomePage