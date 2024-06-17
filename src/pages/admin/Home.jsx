import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  };

  return (
    <div className="">
      <section className=" mb-10">
        <h1 className=" font-medium mb-2">New Arrival</h1>
        <div className=" h-[200px]">
          {/* <h3 className='text-[#fff]'>New Arrival</h3> */}
          <div className=" w-full bg-white rounded-md">
            <div className="slider-container max-w-full pt-3 pb-2">
              <Slider {...settings}>
                <div>
                  <img
                    src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
                    alt="img"
                    className=" h-[180px] w-[130px]"
                  />
                </div>
                <div>
                  <img
                    src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
                    alt="img"
                    className=" h-[180px] w-[130px]"
                  />
                </div>
                <div>
                  <img
                    src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
                    alt="img"
                    className=" h-[180px] w-[130px]"
                  />
                </div>
                <div>
                  <img
                    src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
                    alt="img"
                    className=" h-[180px] w-[130px]"
                  />
                </div>
                <div>
                  <img
                    src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
                    alt="img"
                    className=" h-[180px] w-[130px]"
                  />
                </div>
                <div>
                  <img
                    src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
                    alt="img"
                    className=" h-[180px] w-[130px]"
                  />
                </div>
                <div>
                  <img
                    src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
                    alt="img"
                    className=" h-[180px] w-[130px]"
                  />
                </div>
                <div>
                  <img
                    src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
                    alt="img"
                    className=" h-[180px] w-[130px]"
                  />
                </div>
                <div>
                  <img
                    src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
                    alt="img"
                    className=" h-[180px] w-[130px]"
                  />
                </div>
                <div>
                  <img
                    src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
                    alt="img"
                    className=" h-[180px] w-[130px]"
                  />
                </div>
                <div>
                  <img
                    src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
                    alt="img"
                    className=" h-[180px] w-[130px]"
                  />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>
      <section className=" mb-10">
        <h1 className=" font-medium mb-2">Recommended For You</h1>
        <div>
          {/* <h3 className='text-[#fff]'>New Arrival</h3> */}
          <div className=" w-full">
            <div className="max-w-full pt-3 pb-2">
              <div className="flex gap-10 flex-wrap w-[100%] overflow-x-hidden">
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" mb-10">
        <h1 className=" font-medium mb-2">Top Trending</h1>
        <div>
          {/* <h3 className='text-[#fff]'>New Arrival</h3> */}
          <div className=" w-full">
            <div className="max-w-full pt-3 pb-2">
              <div className="flex gap-10 flex-wrap w-[100%] overflow-x-hidden">
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
                <div className=" bg-white w-[160px] px-4 pt-4 rounded-md">
                  <img
                    src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                    alt="img"
                    className=" h-[180px] w-[130px] rounded-sm mb-2"
                  />
                  <h4 className=" text-[14px]">Don’t Make Me think</h4>
                  <p className=" text-[12px] pb-3">Steve Krug, 2000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
