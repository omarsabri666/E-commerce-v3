

import { UseData } from "../context/contextP";


function CategoryLink({data,setToggle}) {

    const { selectedCategory, setSearch , setSelectedCategory,} =
      UseData();
   const {_id : id} = data

    
    
    
  
  
   
  async function  handleClick(){

setSelectedCategory(id)
setSearch("")
setToggle(false)


   }

   


   
    return (
      <li
        onClick={handleClick}
        className={` flex  justify-center items-center  rounded-lg py-2 cursor-pointer hover:text-omar  transition-all text-center
        ${selectedCategory === id ? "bg-omar text-white hover:text-white " : ""}
        ${
          data?.name === "Music" ||
          data?.name === "SuperMarket" ||
          data?.name === "Baby & Toys" ||
          data?.name === "Home" ||
          data?.name === "Books" ||
          data?.name === "Beauty & Health" ||
          data?.name === "Mobiles"
            ? "hidden"
            : ""
        }
        
        `}
      >
        {data.name}
      </li>
    );
}

export default CategoryLink
