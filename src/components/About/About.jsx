import React from 'react'
import './about.css'

const About = () => {
  return (
    <div className='about'>
        <div className="aboutUs">
        <h2>About Us <hr /></h2>
      <p>Wellcome to Shofy, india's favorite shopping destination, we're thrilled to have you here.Our mission is to provide you with the best online shopping experience possible.</p>
        </div>
      <div className="ourstory">
        <h2>Our Story <hr /></h2>

        <p>Shofy was founded in 2024 with the vision of revolutionizing the way people shop online. Our team of passionate developers and designers came together to create a platform that offers convenience, reliability, and a wide selection of products.</p>
      </div>
      <div className='ourmission'>
<h2>Our Mission <hr /></h2>
<p>At Shofy,our mission is to make online shopping effortless and enjoyable for everyone. We strive to provide a seamless experience from browsing to checkout, with top-notch customer service every step of the way.</p>
      </div>
      <div className="contactUs">
        <h3>Contact Us <hr /></h3>
        <p>Have a question or feedback? We'd love to hear from you! Feel free to reach out to us at <span className='fw-bold text-danger'>shofy@email.com</span>  or through our social media channels.</p>
      </div>

      <div className='thanku'>
        <h1>THANK YOU <hr /></h1>
        <p>Thank you for choosing Shofy for your online shopping needs. We're committed to continually improving our platform to serve you better. Happy shopping!</p>
      </div>

      <div className='developer'>
        <h2>Developed by : <span>Thippesh</span></h2>
        <p><a href="https://github.com/THIPPESH57" target='_blank'>GitHub</a></p>
        <p><a href="https://www.linkedin.com/in/thippeshsv/" target='_blank'>LinkedIn</a></p>
      </div>
    </div>
  )
}

export default About
