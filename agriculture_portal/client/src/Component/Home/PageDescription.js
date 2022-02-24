import React from "react";
import icon1 from "../../Image/agronomy.png";
import icon2 from "../../Image/agriculture.png";
import icon3 from "../../Image/farm.png";
import icon4 from "../../Image/food.png";
import icon5 from "../../Image/tractor.png";
export default function PageDescription() {
  return (
    <>
      <div className="d-flex flex-row justify-content-around flex-wrap bd-highlight m-5">
        <div className="p-3 flex-fill bd-highlight box1">
          <h1 className='display-4' style={{ fontWeight: '800' }}>
          <span style={{ color: "#28ca2f" }}>AgriCom</span> Farm Ecology Products
            </h1>
        </div>
        <div className="d-flex justify-content-sm-center flex-column bd-highlight">
          <div className="text-center box bd-highlight pb-3">
            <h4>
              Smells racy free announcing than durable zesty smart exotic far
              feel. Screamin' affordable secret way absolutely.
            </h4>
          </div>
          <div className="box bd-highlight text-justify pb-3">
            <h5 className="text-secondary" style={{ fontWeight: '300' }}>
              Evulates vast a real proven works discount secure care. Market invigorate a awesome handcrafted bigger comes newer recommended lifetime. Odor to yummy high racy bonus soaking mouthwatering. First superior full-bodied drink. Like outstanding odor economical deal clinically
            </h5>
          </div>
          <div className="box d-flex flex-row bd-highlight flex-wrap justify-content-around">
            <a className="text-center icon">
              <img src={icon1} className='m-2' width='70px' />
              <h5 style={{ fontWeight: '500' }}>Agriculture Products</h5>
            </a>
            <a className="text-center icon">
              <img src={icon2} className='m-2' width='70px' />
              <h5 style={{ fontWeight: '500' }}>Modern Techniques</h5>
            </a>
            <a className="text-center icon">
              <img src={icon3} className='m-2' width='70px' />
              <h5 style={{ fontWeight: '500' }}>Farm Factory</h5>
            </a>
            <a className="text-center icon">
              <img src={icon4} className='m-2' width='70px' />
              <h5 style={{ fontWeight: '500' }}>Fresh Vegetables</h5>
            </a>
            <a className="text-center icon">
              <img src={icon5} className='m-2' width='70px' />
              <h5 style={{ fontWeight: '500' }}>Rent Machines</h5>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
