import {  useState } from "react";
import { formatPriceInEGP } from "../helper/helper";
import { AiFillHeart, AiOutlineShopping } from "react-icons/ai";

import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOneItem, addCartItems, addWishlistItems, getCartItems } from "../api/api";
import { UseData } from "../context/contextP";
import { toast } from "react-toastify";

function Product({product}) {
    const [expandTitle,setExpandText] = useState(false)
    const {selectedCategory,cart,user,token} = UseData()
    
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    
   const { data: cartData } = useQuery(
     { queryFn: getCartItems, queryKey: ["cart", cart] },
     {
       enabled: !token && !user,
     }
   );

       
    const test1 =
      cartData?.data?.products?.map((item) => item.product.id) || "";


    const isInCart = test1.includes(product._id)

    const  maxLength = 19
    function cutText(text){
        if(expandTitle) return text
         if(text.length >=maxLength) {
           return   text.slice(0,maxLength)

        } else {
            return text
        }

    }
    function handleNav(e){
        e.stopPropagation();
        
        navigate(`productDetails/${product._id}`)
        
        
    }
    const { mutate: AddtoToCart } = useMutation({
      mutationFn: () => addCartItems(product._id),
      onSuccess:()=>{
        queryClient.invalidateQueries(["cart",cart])
        queryClient.invalidateQueries(["products/category", selectedCategory]);
        toast.success("item was added to cart")

      } ,onError:()=>{
         toast.error("could not add item to cart");
      }
    });
      const { mutate: deleteMutate } = useMutation({
        mutationFn: () => DeleteOneItem(product._id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
          toast.info("item was deleted from cart "); //   queryClient.invalidateQueries
        },
        onError: () => {
          toast.error("could not delete item cart ");
        },
      });
    async function handleAddToCart(e){
        e.stopPropagation();
        AddtoToCart()

        


    }
    async function handleDeleteFromCart(e){
        e.stopPropagation();
        deleteMutate()

        


    }
     const { mutate: addToWishlist } = useMutation({
       mutationFn: () => addWishlistItems(product._id),
       onSuccess: () => {
         queryClient.invalidateQueries(["wishlist"]);
         toast.success("item was added to wishlist")
       },onError:()=>{
        toast.error("could not add item to wishlist");
       }
     });
     const { data: wishlistItems } = useQuery(
       { queryFn: getCartItems, queryKey: ["wishlist"] },
       {
         enabled: !token && !user,
       }
     );
   async  function handleAddToWishList(e){
        e.stopPropagation();
addToWishlist()
        


    }
//    const isInWishlist =  wishlistItems?.data?.map(item=> item.id) || "";
const isInWishlist = Array.isArray(wishlistItems?.data)
  ? wishlistItems.data.map((item) => item.id)
  : [];
   const checkForWishlist = isInWishlist?.includes(product._id)  ;
  //  const discountAmount =
  //  const discountPercentage = (discountAmount / originalPrice) * 100;


    return (
      <div className=" relative group">
        <div
          onClick={handleNav}
          className="flex  p-2 shadow-sm  h-96 sm:h-auto justify-center items-center sm:items-start sm:justify-normal  relative  md:flex-nowrap rounded-lg cursor-pointer flex-col mx-4 md:mx-0 bg-gray-50 "
        >
          <div className="  relative">
            <img
              className=" rounded-md w-full "
              width={120}
              height={120}
              src={product.imageCover}
              alt={`${product.title}img`}
            />
            <div className=" flex flex-col gap-2 absolute left-3 top-7">
              {product.priceAfterDiscount ? (
                <span className=" bg-white font-bold text-[12px] text-black px-2">
                  -{" "}
                  {(
                    ((product.price - product.priceAfterDiscount) /
                      product.price) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* {product.priceAfterDiscount ? (
            <div className=" bg-omar absolute top-4 right-2 w-10 h-10 flex justify-center items-center  rounded-full">
              <p className=" text-white font-bold  ">
                {(
                  -(
                    (product.price - product.priceAfterDiscount) /
                    product.price
                  ) * 100
                ).toFixed(0)}
                %
              </p>
            </div>
          ) : (
            ""
          )} */}

          {/* <h2>{product.category.name}</h2> */}
          <div className=" my-2 flex sm:flex-row flex-col gap-1 w-full items-center justify-between">
            {product.title.length >= maxLength ? (
              <h3>
                {cutText(product.title)}{" "}
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={`${
                    expandTitle ? "show less" : "show more"
                  }`}
                  data-tooltip-place="right"
                  size={20}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandText((s) => !s);
                  }}
                >
                  ...
                </span>
              </h3>
            ) : (
              <h3>{product.title}</h3>
            )}
            {!product.priceAfterDiscount ? (
              <h4 className="  text-xl font-semibold md:text-base  py-2">
                {formatPriceInEGP(product.price)}
              </h4>
            ) : (
              <div className="gap-5 py-2 justify-center items-center  flex-col sm:flex-row flex-wrap   flex">
                <h4 className="   text-xl font-semibold md:text-base ">
                  {formatPriceInEGP(product.priceAfterDiscount)}
                </h4>
                {/* <h4 className="line-through text-sm  md:text-base  text-gray-500">
                  {formatPriceInEGP(product.price)}
                </h4> */}
              </div>
            )}
          </div>

          {/* {token && (
            <div className="opacity-0 absolute -left-2 hidden group-hover:opacity-100 transition-all ease-linear duration-800 translate-y-full gap-1 group-hover:translate-y-0 group-hover:flex top-0 items-center justify-center flex-col  ">
              {!isInCart && (
                <button
                  onClick={handleAddToCart}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Add to cart"
                  data-tooltip-place="right"
                  className=" bg-gray-700 text-white py-2 px-2 rounded"
                >
                  <AiOutlineShopping size={20} />
                </button>
              )}
              {!checkForWishlist && (
                <button className="bg-gray-700  text-white py-2 px-2 rounded">
                  <AiFillHeart
                    onClick={handleAddToWishList}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Add to wish List"
                    data-tooltip-place="right"
                    size={20}
                  />
                </button>
              )}
            </div>
          )} */}

          {token && (
            <div className=" flex items-center w-full my-2  flex-row   gap-2">
              {!checkForWishlist && (
                <button className="bg-black  text-white py-2 px-2 ">
                  <AiFillHeart
                    onClick={handleAddToWishList}
                 
                    size={20}
                  />
                </button>
              )}
              {!isInCart && (
                <button
                  onClick={handleAddToCart}
                  className="  text-black  w-full py-2 px-2 border border-gray-200  rounded-sm"
                >
                  Add to cart
                </button>
              )}
              {isInCart && (
                <button
                  onClick={handleDeleteFromCart}
                  className="  text-black  w-full py-2 px-2 border border-gray-200  rounded-sm"
                >
                  Remove from cart{" "}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
}

export default Product
