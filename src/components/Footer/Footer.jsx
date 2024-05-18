import React from 'react'
import './footer.css'
import footer_logo from '../Assets/logo_big.png'


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOFY</p>
      </div>
      <ul className='footer-links'>
        <li>Company</li>
        <li>Products</li>
        <li>Enquries</li>
        <li>About Us</li>
        <li>Careers</li>
      </ul>
      <div className="footer-copyright">
        <hr/>
        <p>Copyright @2024 - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer;
