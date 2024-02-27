import { useEffect, useState } from "react";
import { AnimatePresence , motion } from "framer-motion";

function NavSlider() {
    const slides = [
      {
        text: " Free Shipping on all Orders no minimum purchases required*",
      }, {
        text : "Use code Messi2023 to get 10% off"
      },{
        text : "Gift every single day on weekends"
      }
    ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = 3; // Replace with the actual number of slides
  useEffect(()=>{
     const interval = setInterval(() => {
       setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
     }, 5000); // Adjust the interval duration as needed (in milliseconds)

     return () => clearInterval(interval);
  },[currentSlideIndex])
  return (
    <motion.div  className=" hidden md:block" initial={{ y: -1000 }} animate={{ y: 0 }} exit={{ y: -1000 }}>
      <AnimatePresence>
        <motion.p
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          exit={{ y: -1000 }}
          className=" hover:text-omar transition-all"
        >
          {slides[currentSlideIndex].text}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
 
    
}

export default NavSlider
