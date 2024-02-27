import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../api/api";
import CategoryLink from "./CategoryLink";
import { UseData } from "../context/contextP";
import {  useState } from "react";
import { AiOutlineCloseCircle, AiOutlineMenu } from "react-icons/ai";
import { AnimatePresence,motion } from "framer-motion";
import Loader from "./Loader";

function Category() {
     const {
      selectedCategory,
      setSelectedCategory,
   
    } = UseData();
    const [toggle,setToggle] = useState(false)
    
    const {data,isLoading,error} = useQuery({
        queryFn : getCategory ,
        queryKey : ["AllCategory"]
    },{
        staleTime : 3000000
    })

function handleClick(){
  setToggle(false);
  setSelectedCategory("");
}
 if (isLoading)
   return (
     <div className=" ">
       <Loader />
     </div>
   );
 if (error)
   return (
     <div className=" text-red-500 font-bold text-2xl flex justify-center items-center">
       <p>Error {error.message}</p>
     </div>
   );

    return (
      <>
        <div className=" md:flex flex-col    hidden     h-full w-fit sticky top-0 ">
          <h2
            role="button"
            onClick={()=> setSelectedCategory("")}
            className={`  flex items-center  py-2 px-8  font-semibold cursor-pointer rounded-md ${
              selectedCategory === "" ? " bg-omar text-white" : " text-black"
            } `}
          >
            All Categories
          </h2>
          <ul className="  row-span-full  h-full static md:static top-0 my-2 flex flex-col">
            {data?.data.map((link) => (
              <CategoryLink key={link._id} data={link} />
            ))}
          </ul>
        </div>
        <button
          role="toggle"
          aria-label=" toggle category link"
          className=" md:hidden text-4xl px-5 py-2 my-2"
          onClick={() => setToggle((s) => !s)}
        >
          {!toggle ? <AiOutlineMenu /> : <AiOutlineCloseCircle />}
        </button>
        <AnimatePresence>
          {toggle && (
            <motion.div
              initial={{ y: -1000 }}
              animate={{ y: 0 ,transition:{duration:0.4}}}
              exit={{ y: -1000,transition:{duration:0.3} }}
              className=" md:hidden flex-col    flex     h-full w-fit sticky top-0 "
            >
              <h2
                role="button"
                onClick={handleClick}
                className={`  flex items-center  py-2 px-8  font-semibold cursor-pointer rounded-md ${
                  selectedCategory === ""
                    ? " bg-omar text-white"
                    : " text-black"
                } `}
              >
                All Categories
              </h2>
              <ul className=" gap-1 row-span-full  h-full static md:static top-0 my-2 flex flex-col">
                {data?.data.map((link) => (
                  <CategoryLink setToggle={setToggle} key={link._id} data={link} />
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
}

export default Category
