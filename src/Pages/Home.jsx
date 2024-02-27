import Category from "../componots/Category";
import ProductList from "../componots/ProductList";
import { UseData } from "../context/contextP";
import { Suspense, lazy } from "react";
import Loader from "../componots/Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import happy from "../../public/priscilla-du-preez-nF8xhLMmg0c-unsplash.webp"
import customers from "../../public/helena-lopes-e3OUQGT9bWU-unsplash.webp"
import cam from "../../public/philipp-m-PEZ3C-1DNe8-unsplash.webp"

import ImgSlider from "./ImgSlider";


const ProductList2 = lazy(()=> import("../componots/ProductList2"))
 const settings = {
  
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
   autoplay: true,
  
   fade: true,
   swipeToSlide: true,
   
 };
const loops = [
  {
    img: customers,
    hidder: "Discover a World of Style",
    sub: "Explore the Latest Trends with Trendify",
  },
  {
    img: cam,
    hidder: "Elevate Your Wardrobe",
    sub: "Shop Our Exclusive Collection for Timeless Elegance",
  },
  {
    img: happy,
    hidder: "Join the Trendify Family",
    sub: "Where Fashion Meets Functionality - Experience Style that Speaks to You",
  },
];
function Home() {
  const {selectedCategory} = UseData()
    return (
      <div className="">
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-5">
            <Slider {...settings}>
              {loops.map((img, i) => (
                <ImgSlider key={i} img={img} />
              ))}
            </Slider>
          </div>
          <div className="md:sticky mx-auto max-w-6xl md:block md:top-52 my-10 static col-span-5 md:col-span-1    block   h-fit">
            <Category />
          </div>
          <div id="main" className=" mx-auto max-w-6xl col-span-5 md:col-span-4">
            {!selectedCategory && <ProductList />}
            {selectedCategory && (
              <Suspense
                fallback={
                  <div>
                    <Loader />
                  </div>
                }
              >
                <ProductList2 />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    );
}

export default Home
