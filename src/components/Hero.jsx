import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section>
      <h1 id="intro" className="anim">
        Welcome<br />to your wardrobe
      </h1>
      <p className="anim">
        Do you feel like you have nothing to wear?<br />
        Whimsy wardrobe is here to help you access any brand and type of cloth. You name it!
      </p>
      <button className="anim" id="but">
        <a href="login.htm" style={{ textDecoration: 'none', color: 'inherit' }}>Start Now</a>
      </button>
      <img src="./images/feature.png" alt="Feature" id="feature" className="anim" />
    </section>
  );
}

export default Hero;
