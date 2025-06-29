import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#9aacf9", height: '98px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30px', position: 'absolute', right: '0%', zIndex: 1 ,}}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#9aacf9", height: '98px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px',}}
      onClick={onClick}
    ></div>
  );
}

function LargeNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#1B283A50", height: '52px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30px', position: 'absolute', right: '2%', zIndex: 1 }}
      onClick={onClick}
    ></div>
  );
}

function LargePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#1B283A50", height: '52px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30px', position: 'absolute', left: '2%', zIndex: 1 }}
      onClick={onClick}
    ></div>
  );
}

const PropertyDetailsImgSlider = ({ slideImgArr}) => {
  const [nav1, setNav1] = useState()
  const [nav2, setNav2] = useState()
  let slider1 = useRef(null);
  let slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  return (
    <div className='w-full lg:w-3/5'>
      {
        slideImgArr?.length > 1 ?  <Slider
        asNavFor={nav2}
        ref={slider1}
        nextArrow={<LargeNextArrow />}
        prevArrow={<LargePrevArrow />}
        initialSlide={0}
      >
        {
          slideImgArr?.map((item, index) => (
            <div className='w-full h-[350px] lg:h-[500px] md:h-[500px] slider_img_div' key={index}>
              <img src={item} alt="" className="w-full h-full slider_img" />
            </div>

          ))
        }

      </Slider>
      :
      <div className='w-full h-[350px] lg:h-[500px] md:h-[500px] slider_img_div' >
              <img  src={slideImgArr[0]} alt="" className="w-full h-full slider_img" />
            </div>
      }
     

      <div className={` hidden sm:block ${slideImgArr?.length == 1 ? 'w-2/12 mt-2' : slideImgArr?.length == 2 ? 'w-2/6 pl-4' :  slideImgArr?.length == 3 ? 'w-1/2 pl-4'  :  slideImgArr?.length == 4 ? 'w-4/5 pl-4' : 'w-full pl-5'}`}>
        {
          slideImgArr?.length > 1 ? <Slider
            asNavFor={nav1}
            ref={slider2}
            slidesToShow={slideImgArr?.length}
            swipeToSlide={true}
            focusOnSelect={true}
            nextArrow={ <SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
          >
            {
              slideImgArr?.map((item, index) => (
                <div className=' h-[95px] ps-2  mt-[2px]' key={index}>
                  <img src={item} className="grid_img" />
                </div>
              ))
            }
          </Slider>
          :
          <div className=' h-[95px] ps-2  mt-[2px]'>
          <img src={slideImgArr[0]} className="grid_img" />
        </div>
        }

      </div>
    </div>
  );
};

export default PropertyDetailsImgSlider;
