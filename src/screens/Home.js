import React, { useState } from 'react';
import '../App.css';

export default function LoginScreen() {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (

    <div className="container">
      <h1>Home</h1>
      <div className="rainbow-box"></div>
      <div
        className={`box ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Pedro
      </div>
  </div>
  );
}