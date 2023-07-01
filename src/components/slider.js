import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


const Slider =(props)=>{
    // console.log('slider',props)
    let {SlideData} = props
    return(
      
      <Carousel>
      {SlideData?.length !== 0 && SlideData?.map((item, index)=>{
          return(
              <Carousel.Item key={index}>
              <img
              className="d-block w-100"
              src={item?.posterUrl}
              alt=" slide"
              height="500"
              width="100%"
              />
              <Carousel.Caption>
             <h3>{item.title} </h3>
              
              <p>{item.actors}</p>
              </Carousel.Caption>
          </Carousel.Item>
          )
        })}  
        </Carousel>
        
    )
}

export default Slider;