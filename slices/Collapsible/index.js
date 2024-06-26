/**
 * @typedef {import("@prismicio/client").Content.CollapsibleSlice} CollapsibleSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CollapsibleSlice>} CollapsibleProps
 * @param {CollapsibleProps}
 */

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Slider  from "react-slick";
import React, { useRef } from 'react';

const Collapsible = ({ slice }) => {

  const sliderRef = useRef();
  
  function toggleClass(event) {
    if (event.target.parentElement.getElementsByClassName('collapsible-content')[0]?.innerHTML.length > 0 ){
      var element = document.getElementById(slice.id);
      if (element.classList.contains("open-home")){
        element.classList.remove('open-home')
      } else{
        element.classList.toggle("open");
      }
    }
  }

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  function next () {
    sliderRef.current.slickNext();
  }

  console.log(slice.primary.title)


  return (
    <div className={`collapsible ${slice.primary.title == 'welkom' && 'open open-home'}`} id={slice.id}>
      <div className="trigger" onClick={toggleClass}>{slice.primary.title}<div className="line"></div></div>
      <div className="collapsible-content">
        {slice.primary.imageslideshow != true ?
          <>
            {slice.items.map((item,i) => {
              return(
                <>
                  {item.text &&
                    <div className="column">
                      <PrismicRichText field={item.text}/>
                    </div>
                  }
                  {item.image.url &&
                  <div className="column" >
                    <PrismicNextImage field={item.image} />
                  </div>
                  }
                </>
              )
            })}
          </>
        :
        <>
          <div className="column">
            {slice.items.map((item,i) => {
              return(
                <>
                {item.text &&
                  <PrismicRichText field={item.text}/>
                }
                </>
              )
            })}
          </div>
          <div className="column">
            <Slider {...settings} ref={sliderRef}>
              {slice.items.map((item,i) => {
                return(
                  <div className="image slide-image" onClick={next}>
                    {item.image.url &&
                      <PrismicNextImage field={item.image} />
                    }
                  </div>
                )
              })}
            </Slider>
          </div>
        </>
        }
      </div>
    </div>
  );
};

export default Collapsible;
