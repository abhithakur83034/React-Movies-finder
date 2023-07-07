import React from 'react';
import {Carousel,Container} from 'react-bootstrap';


const Slider =(props)=>{
    // console.log('slider',props)
    let {SlideData} = props
    return(
      
     <Container fluid>
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
     </Container>
        
    )
}

export default Slider;