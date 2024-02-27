import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/api";
import Product from "./Product";
import { UseData } from "../context/contextP";
import Loader from "./Loader";


function ProductList() {
  
    const {setCurrentPage,currentPage,search} = UseData()
    const { data, isLoading , error } = useQuery(
      {
        queryFn: () => getProducts(currentPage),
        queryKey: ["products", currentPage],
        // onSuccess: ()=>{
        // window.scrollTo({top:0})
        // },
      }
      
    
        
      
    );

     const filteredItems = data?.data.filter((item) =>
       item.title.toLowerCase().includes(search.toLowerCase())
     );
    

  if (isLoading)
    return (
      <div className=" flex justify-center items-center">
        <Loader />;
      </div>
    );
  if (error)
    return (
      <div className=" flex justify-center text-red-500 text-2xl items-center">
       <p>error : {error.message}</p>
      </div>
    );
    return (
      <>
        {filteredItems?.length ? (
          <div  className=" grid md:grid-cols-4 grid-cols-2 sm:grid-cols-3 md:gap-4  gap-1 ">
            {filteredItems?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        ) : (
          <div className=" text-2xl font-semibold text-omar">
            could not find an item with that name : {search}
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

export default ProductList
