import React from 'react'
import womens from '../Assets/fashon.jpg'
import mens from '../Assets/mens.jpg'
import kids from '../Assets/kids2.jpg'
import Carousel from 'react-bootstrap/Carousel';
import './slider.css'
import { Link } from 'react-router-dom';

const Slider = () => {
  return (
    <Carousel fade>
    <Carousel.Item>
    <img
                  className="d-block w-100"
                  src={womens}
                  alt="First slide"
              />
      <Carousel.Caption>
      <p className="fw-bold fs-1 text-primary">Womens Zone</p>
      
   <Link style={{textDecoration: 'none', color : 'black'}} to='/Womens'><button className="btn  rounded-0 border border-danger btn-lg">Explore Now</button></Link>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img
                  className="d-block w-100"
                  src={mens}
                  alt="second slide"
              />
      <Carousel.Caption>
      <p className="fw-bold fs-1 text-light">Mens Zone</p>
        
        <Link style={{textDecoration: 'none', color : 'black'}} to='/Mens'><button className="btn  rounded-0 border border-danger btn-lg text-light ">Explore Now</button></Link>
  
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item> 

    <img
                  className="d-block w-100"
                  src={kids}
                  alt="third slide"
              />
      <Carousel.Caption>
      <p className="fw-bold fs-1 text-light kids">Kids Zone</p>
        
        <Link style={{textDecoration: 'none', color : 'black'}} to='/Kids'><button className="btn  rounded-0 border border-danger btn-lg ">Explore Now</button></Link>

      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}

export default Slider
