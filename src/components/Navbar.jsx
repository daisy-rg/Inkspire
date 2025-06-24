import { React } from "react";
import { Link } from "react-router-dom";


function Navbar(){
    return (
 <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <h1 className="header-logo">Inkspire</h1>
        </div>
        
        <nav className="header-nav">
          <a href="#" className="header-link">Our story</a>
          <a href="#" className="header-link">Write</a>
          <a href="#" className="header-link">Sign in</a>
          <button className="header-button">
            Get started
          </button>
        </nav>
      </div>
    </header> 
        
    );
}
export default Navbar;