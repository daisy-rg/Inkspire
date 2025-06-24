import React from 'react';

import './Hero.css';

const Hero = () => {
  return (
    <section className="lead">
      <h1 id="intro" className="anim">
        Human<br />stories & ideas
      </h1>
      <p className="anim">
        A place to read,write and deepen your understanding<br />
      Why whisper when you can roar?Share your voice with the world!
      </p>
      <button className="anim" id="but">
        <a href="login.htm" style={{ textDecoration: 'none', color: 'inherit' }}>Start reading</a>
      </button>
        <img className="anim" src="https://i.pinimg.com/736x/52/85/8e/52858ec78a416e8f4856e482c6c9ac59.jpg"></img>
     
    </section>
  );
}

export default Hero;
