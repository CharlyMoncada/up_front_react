import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import Img from 'react-image'

import './carousel.css';

class CarouselImage extends Component{
    
    render() {
        
        return (
            <Carousel autoplay>
            <div className="carouselImg">
                <Img className="bg" src={'https://lh3.googleusercontent.com/DAXBgPdpCmsJzpMIstcyg1tWmcdLI3OpIA1V9If-Is4C_gBfkJ5k5jWCkRAhewHuttE'} alt="Logo1" width={1000}  height={300} mode='fit'/>;
            </div>
            <div className="carouselImg">
                <Img className='bg' src={'https://www.cascadewellness.com/wp-content/uploads/2012/11/book-Appointment-copy-size.png'} alt="Logo2" align="center" width={1000}  height={300} mode='fit'/>;
            </div>
            <div className="carouselImg">
                <Img className='bg' src={'http://parktrent.com.au/wp-content/uploads/2015/05/Book-Appointment-Button.png'} alt="Logo3" align="center" width={1000}  height={300} mode='fit' />;
            </div>
          </Carousel>
        );
    }
}

export default CarouselImage;