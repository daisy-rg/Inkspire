
import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
  
      <div className="hero-content">
        <div className="hero-text-container">
          <h1 className="hero-title">
            Human<br />
            stories & ideas
          </h1>
          
          <p className="hero-subtitle">
            A place to read, write, and deepen your understanding
          </p>
          
          <button className="hero-button">
            Start reading
          </button>
        </div>
      </div>
      
      {/* Bottom border line */}
      <div className="hero-border"></div>
    </section>
  );
};

export default Hero;
