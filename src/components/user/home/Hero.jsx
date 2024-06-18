import React from "react";
import { Button, Carousel } from "antd";
import mainBg1 from "../../../assets/main_bg1.jpg";
import mainBg2 from "../../../assets/main_bg2.jpg";
import mainBg3 from "../../../assets/main_bg3.jpg";

const Hero = () => {
  return (
    <>
      <Carousel autoplay>
          <div className="text-white slide-1 h-[90vh]">
            <div className="w-[90%] mx-auto pt-[300px]">
                <h2 className=" text-5xl font-semibold mb-6">
                    Discover Your Next Great Read
                </h2>
                <div className="w-[690px] leading-[2.4] mb-6">
                    <p className=" text-[16px]">Find, borrow, and enjoy a world of books from the comfort of your home. Explore our vast collection of titles and genres today.Unlock the door to endless stories and knowledge. Rent your favorite books and get them delivered right to your doorstep.</p>
                </div>
                <Button size={"large"} className=" bg-transparent text-white">Explore Now</Button>
            </div>
          </div>
          <div className="text-white slide-2 h-[90vh]">
            <div className="w-[90%] mx-auto pt-[300px]">
                <h2 className=" text-5xl font-semibold mb-6">
                    Discover Your Next Great Read
                </h2>
                <div className="w-[690px] leading-[2.4] mb-6">
                    <p className=" text-[16px]">Find, borrow, and enjoy a world of books from the comfort of your home. Explore our vast collection of titles and genres today.Unlock the door to endless stories and knowledge. Rent your favorite books and get them delivered right to your doorstep.</p>
                </div>
                <Button size={"large"} className=" bg-transparent text-white">Explore Now</Button>
            </div>
          </div>
          <div className="text-white slide-3 h-[90vh]">
            <div className="w-[90%] mx-auto pt-[300px]">
                <h2 className=" text-5xl font-semibold mb-6">
                    Discover Your Next Great Read
                </h2>
                <div className="w-[690px] leading-[2.4] mb-6">
                    <p className=" text-[16px]">Find, borrow, and enjoy a world of books from the comfort of your home. Explore our vast collection of titles and genres today.Unlock the door to endless stories and knowledge. Rent your favorite books and get them delivered right to your doorstep.</p>
                </div>
                <Button size={"large"} className=" bg-transparent text-white">Explore Now</Button>
            </div>
          </div>
        
      </Carousel>
    </>
  );
};

export default Hero;
