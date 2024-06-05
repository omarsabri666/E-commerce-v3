import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/api";
import Product from "./Product";
import { UseData } from "../context/contextP";
import Loader from "./Loader";
import { useEffect, useRef } from "react";


function ProductList() {
  const divRef = useRef(null);

  const { setCurrentPage, currentPage, search } = UseData();
  const { data, isLoading, error } = useQuery({
    queryFn: () => getProducts(currentPage),
    queryKey: ["products", currentPage],
    // onSuccess: ()=>{
    // window.scrollTo({top:0})
    // },
  });

  const filteredItems = data?.data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

    useEffect(() => {
    if (divRef.current) {
      window.scrollTo({
        top: divRef.current.offsetTop - 200,
        behavior: "smooth",
      });
    }
  }, [currentPage]);
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
        <div
          ref={divRef}
          className=" grid md:grid-cols-4 grid-cols-2 sm:grid-cols-3 md:gap-4  gap-2 "
        >
          {filteredItems?.map((item) => (
            <Product key={item._id} product={item} />
          ))}
        </div>
      ) : (
        <div className=" text-2xl font-semibold text-black">
          could not find an item with that name : {search}
        </div>
      )}
      <div className=" space-x-5 my-5 text-center">
        {currentPage !== 1 && (
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((s) => s - 1)}
            className="   py-2 px-6 text-lg font-semibold bg-transparent outline outline-black  hover:text-white hover:bg-black  transition-all   text-black disabled:opacity-50 disabled:cursor-not-allowed rounded-sm   focus:ring-offset-2 focus:ring-offset-white focus:outline-none focus:ring focus:ring-black  "
          >
            prev Page
          </button>
        )}
        {data?.metadata?.numberOfPages > 1 && (
          <button
            disabled={data?.metadata.numberOfPages === currentPage}
            onClick={() => setCurrentPage((s) => s + 1)}
            className="py-2 px-6 text-lg font-semibold bg-black rounded-sm text-white disabled:opacity-50 disabled:cursor-not-allowed   focus:ring-offset-2 focus:ring-offset-white focus:outline-none focus:ring focus:ring-black "
          >
            Next Page
          </button>
        )}
      </div>
    </>
  );
}

export default ProductList
