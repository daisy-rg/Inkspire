import React from 'react';
import './Footer.css';
function Footer(){
    return(
        
        <div className="footer-container">
          <div className="footer-columns">
            <div>
              <h3>Company</h3>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/press">Press</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3>Resources</h3>
              <ul>
                <li><a href="/help">Help Center</a></li>
                <li><a href="/status">System Status</a></li>
                <li><a href="/text-to-speech">Text to Speech</a></li>
              </ul>
            </div>
            <div>
              <h3>Legal</h3>
              <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/rules">Rules</a></li>
                <li><a href="/terms">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3>Connect</h3>
              <ul>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          

          <div className="footer-bottom">
            <p>© 2025 Company Name. All rights reserved.</p>
            <div className="payment-icons">
              <a href="#">Visa</a>
              <a href="#">Mastercard</a>
              <a href="#">PayPal</a>
              <a href="#">Apple Pay</a>
            </div>
          </div>
        </div>
      

    );
}

export default Footer;