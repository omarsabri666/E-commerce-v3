import { useQuery } from "@tanstack/react-query";
import {  selectCategory } from "../api/api";
import Product from "./Product";
import { UseData } from "../context/contextP";
import Loader from "./Loader";
import {PiSmileySadDuotone} from "react-icons/pi"

function ProductList2() {
  const { setCurrentPage, currentPage, selectedCategory,search } = UseData();
  const { data, isLoading  } = useQuery(
    {
      queryFn: () => selectCategory(selectedCategory),
      queryKey: ["products/category", selectedCategory],
    },
    {
        staleTime:0
    }
  
  );
       const filteredItems = data?.data.filter((item) =>
         item.title.toLowerCase().includes(search.toLowerCase())
       );
 
  if (isLoading) return <div className=" flex justify-center items-center">

   <Loader />;
  </div>
//   if (isRefetching)
//     return (
//       <div className=" flex justify-center items-center">
//         <Loader />;
//       </div>
//     );
  if(!data?.results) return (
    <div className=" flex flex-col items-center text-center gap-4 justify-center my-10">
      <h1 className=" text-3xl text-omar font-bold">
        Oops, we don&apos;t have any items in this category.{" "}
      </h1>
      <i className=" text-omar">
        
          <PiSmileySadDuotone size={60} />
      
      </i>
    </div>
  );
  return (
    <>
      {filteredItems?.length ? (
        <div className=" grid md:grid-cols-4 grid-cols-2 sm:grid-cols-3 md:gap-4  gap-2 ">
          {filteredItems?.map((item) => (
            <Product key={item._id} product={item} />
          ))}
        </div>
      ) : (
        <div className=" text-2xl text-center flex justify-center items-center font-semibold text-omar">
          <p> could not find an item with that name : {search}</p>
        </div>
      )}
      <div className=" space-x-5 my-5 text-center">
        {currentPage !== 1 && (
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((s) => s - 1)}
            className="   py-2 px-6 text-lg font-semibold bg-omar rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed   focus:ring-offset-2 focus:ring-offset-white focus:outline-none focus:ring focus:ring-amber-400  "
          >
            prev Page
          </button>
        )}
        {data?.metadata?.numberOfPages > 1 && (
          <button
            disabled={data?.metadata.numberOfPages === currentPage}
            onClick={() => setCurrentPage((s) => s + 1)}
            className="py-2 px-6 text-lg font-semibold bg-omar rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed   focus:ring-offset-2 focus:ring-offset-white focus:outline-none focus:ring focus:ring-amber-400 "
          >
            Next Page
          </button>
        )}
      </div>
    </>
  );
}

export default ProductList2;
