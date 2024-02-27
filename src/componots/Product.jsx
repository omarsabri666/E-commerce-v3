import {  useState } from "react";
import { formatPriceInEGP } from "../helper/helper";
import { AiFillHeart, AiOutlineShopping } from "react-icons/ai";

import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCartItems, addWishlistItems, getCartItems } from "../api/api";
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
    async function handleAddToCart(e){
        e.stopPropagation();
        AddtoToCart()

        


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
          className="flex shadow-xl  h-96 sm:h-auto  relative flex-wrap md:flex-nowrap rounded-lg cursor-pointer flex-col mx-4 md:mx-0 bg-gray-50 justify-center items-center"
        >
          <img
            className="py-1 px-4 w-full rounded-lg"
            width={120}
            height={120}
            src={product.imageCover}
            alt={`${product.title}img`}
          />
          {product.priceAfterDiscount ? (
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
          )}

          <h2>{product.category.name}</h2>
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
              <h4 className="text-omar   text-xl font-semibold md:text-base ">
                {formatPriceInEGP(product.priceAfterDiscount)}
              </h4>
              <h4 className="line-through text-sm  md:text-base  text-gray-500">
                {formatPriceInEGP(product.price)}
              </h4>
            </div>
          )}

          {token && (
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
          )}
        </div>
        <Tooltip id="my-tooltip" />
      </div>
    );
}

export default Product
