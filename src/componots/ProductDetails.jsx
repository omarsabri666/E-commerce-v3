import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOneItem, addCartItems, addWishlistItems, deleteWishlistItem, getCartItems, getOneProduct, getWishlistItems, selectCategory } from "../api/api";
import { useParams } from "react-router";
import {   useEffect, useState } from "react";
import ImgSlider from "./ImgSlider";
import Rating from "./Rating";
import { formatPriceInEGP } from "../helper/helper";
import { Tooltip } from "react-tooltip";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { UseData } from "../context/contextP";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LikeProduct from "./LikeProduct";
import { ThreeDots } from "react-loader-spinner";
import  Modal  from "./Modal";

 const settings = {
   infinite: true,
   speed: 500,
   slidesToShow: 4,
   slidesToScroll: 4,
   autoplay: true,
   arrows: true,

   swipeToSlide: true,
   swipe: true,
   responsive: [
     {
       breakpoint: 1024, // screens between 1024px and 768px
       settings: {
         slidesToShow: 3,
         slidesToScroll: 3,
       },
     },
     {
       breakpoint: 768, // screens between 768px and 480px
       settings: {
         slidesToShow: 2,
         slidesToScroll: 2,
       },
     },
     {
       breakpoint: 480, // screens below 480px
       settings: {
         slidesToShow: 1,
         slidesToScroll: 1,
       },
     },
   ],
 };
function ProductDetails() {

  
const {cart,token} = UseData()

    const {id} = useParams()
    const {data,isLoading:isLoadingProduct,isError} = useQuery({queryFn:()=>getOneProduct(id),queryKey:["productDetails",id]})
    
    const {data:cartData, isRefetching,error} = useQuery({queryFn:getCartItems,queryKey:["cart",cart]})
const{data:likeProduct,isLoading:isLo}= useQuery({queryFn:()=>selectCategory(data?.data.category._id),queryKey:["likeProduct",data?.data?.category?._id]})
    const [selectedImg, setSelectedImg] = useState(
      () => data?.data?.imageCover || ""
    );
    const queryClient = useQueryClient()
    const [showFirstTime, setShowFirstTime] = useState(false);
     useEffect(() => {
       const timer = setTimeout(() => {
         setShowFirstTime(true);
       }, 6000);

       // Cleanup the timeout when the component unmounts
       return () => clearTimeout(timer);
     }, []);
    
    const {mutate,isLoading,} = useMutation({mutationFn:()=>addCartItems(id) ,onSuccess:()=>{

queryClient.invalidateQueries({ queryKey: ["cart"] });
    toast.success("item added to cart ");

    },onError:()=>{
         toast.error("could not add item to the cart ");
    }})
    const {mutate:deleteMutate,isLoading:isLoadingCartDelete} = useMutation({mutationFn:()=>DeleteOneItem(id) ,onSuccess:()=>{

   
queryClient.invalidateQueries({ queryKey: ["cart"] }); 
toast.info("item was deleted from cart ");    //   queryClient.invalidateQueries

    },onError:()=>{
        toast.error("could not delete item cart "); 
    }})



    
    const test1 =  cartData?.data?.products?.map(item=> item.product.id) || ""
    
   
    
    const isInCart = test1.includes(id);
 
    const { mutate: addToWishlist ,isLoading:isLoadingWish} = useMutation({
      mutationFn: () => addWishlistItems(id),
      onSuccess:()=>{
        queryClient.invalidateQueries(["wishlist"]);
        toast.success("item added to wishlist ")
      }
      ,onError:()=>{
        toast.error("could not add item to the wishlist ");
      }
    });
    const { mutate: deleteWishlist,isLoading:isLoadingDeleteWish } = useMutation({
      mutationFn: () => deleteWishlistItem(id),
      onSuccess: () => {
        queryClient.invalidateQueries(["wishlist"]);
        toast.info("item was deleted from wishlist ");
      },onError:()=>{
        toast.error("could not  delete item from wishlist ");
      }
    });

   async function addItemsToWishlist(){
    addToWishlist();

   }
   async function deleteWishlistItems(){
    deleteWishlist()

   }
   const { data: wishlistData ,isRefetching:isFetchingWish } = useQuery({
     queryFn: getWishlistItems,
     queryKey:["wishlist"]
   });
//  const wishlistIds =  wishlistData?.data.map(item=>item.id) || ""
const isInWishlist = Array.isArray(wishlistData?.data)
  ? wishlistData.data.map((item) => item.id)
  : [];
 const checkInInWishlist = isInWishlist.includes(id) || ""
 useEffect(() => {
   window.scrollTo({ top: 0}); // Use 'smooth' for smooth scrolling
 }, [id]);

    const mainImgSrc = selectedImg || data?.data.imageCover;
    const [isOpen, setIsOpen] = useState(true);
    if (isLoadingProduct || isLo) return <div className=" flex justify-center items-center"><Loader/></div>
    if(isError) return <div className=" text-red-500 font-bold text-2xl flex justify-center items-center">
      <p>Error {error.message}</p>
    </div>
      return (
        <>
          <div className=" my-10  grid overflow-x-hidden   mx-7 md:flex font-abc  md:justify-around  md:mx-0 grid-cols-1 gap-6   ">
            <div className=" col-span-2 md:items-center md:justify-center flex-col-reverse md:flex-row  md:basis-1/2 gap-4 flex ">
              <div className=" flex  flex-wrap  justify-center items-center gap-1 md:flex-col ">
                {data?.data.images?.map((img, i) => (
                  <ImgSlider
                    setSelectedImg={setSelectedImg}
                    key={i}
                    img={img}
                  />
                ))}
              </div>
              <div className=" md:h-[80%]  flex justify-center  rounded-md  ">
                <img
                  className=" sm:w-96 md:h-full  rounded-md    w-full    "
                  src={mainImgSrc}
                  alt={`${data?.data?.title} img`}
                />
              </div>
            </div>
            <div className=" md:items-start items-center md:basis-1/2   justify-center  flex flex-col ">
              <div className=" flex flex-col gap-4">
                {/* <h1 className=" text-4xl font-bold text-omar my-4">
                {data?.data?.category?.name}
              </h1> */}
                <div className=" flex justify-around items-center">
                  <h2 className="   text-xl  text-gray-800">
                    {data?.data?.title}
                  </h2>
                  <h3 className="      text-xl text-gray-800">
                    {data?.data?.brand?.name}
                  </h3>
                </div>
                <div className=" flex justify-around gap-2 flex-col md:flex-row items-center  border-b-2 ">
                  {!data?.data?.priceAfterDiscount ? (
                    <h4 className="text-black text-xl font-semibold py-2">
                      {formatPriceInEGP(data?.data?.price)}
                    </h4>
                  ) : (
                    <div className="gap-5 py-2 text-xl   flex">
                      <h4 className="text-black font-semibold">
                        {formatPriceInEGP(data?.data?.priceAfterDiscount)}
                      </h4>
                      <h4 className="line-through text-gray-600">
                        {formatPriceInEGP(data?.data?.price)}
                      </h4>
                    </div>
                  )}
                  <h4 className=" flex  gap-1   items-center ">
                    <Rating rating={data?.data?.ratingsAverage} />

                    <span
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={`was rated by ${data?.data.ratingsQuantity} users`}
                      data-tooltip-place="top"
                      className=" cursor-help text-sm text-gray-500 font-semibold"
                    >
                      ( {data?.data?.ratingsQuantity} out of
                    </span>
                    <span
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={`was bought by ${data?.data?.sold} users`}
                      data-tooltip-place="top"
                      className="  cursor-help text-sm px-0.5 text-gray-500 font-semibold"
                    >
                      {data?.data?.sold} )
                    </span>
                  </h4>
                </div>
              </div>
              <div className=" flex flex-col gap-2 my-5   ">
                <h3 className="  font-bold text-lg">description : </h3>

                <p className=" border-b-2  w-full  md:w-2/3  ">
                  {" "}
                  {data?.data?.description}
                </p>
              </div>

              {/* <h5>{formatPriceInEGP(data?.data?.priceAfterDiscount)}</h5> */}
              <div className=" my-2 flex gap-6 flex-col ">
                {token && (
                  <div className=" flex items-center gap-5">
                    {!isRefetching ? (
                      <div>
                        {!isInCart && (
                          <button
                            disabled={isLoading}
                            onClick={() => mutate({})}
                            className=" py-2 px-6 bg-black  transition-all text-white  font-semibold rounded-sm"
                          >
                            {isLoading ? (
                              <ThreeDots
                                visible={true}
                                height="24"
                                width="82"
                                color="#ffffff"
                                secondaryColor="#EFE6E3"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                            ) : (
                              " Add To Cart"
                            )}
                          </button>
                        )}
                        {isInCart && (
                          <button
                            onClick={deleteMutate}
                            className="py-2 px-6 bg-black  transition-all text-white  font-semibold rounded-sm"
                          >
                            {" "}
                            {isLoadingCartDelete ? (
                              <ThreeDots
                                visible={true}
                                height="24"
                                width="82"
                                color="#ffffff"
                                secondaryColor="#EFE6E3"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                            ) : (
                              " Delete Item"
                            )}{" "}
                          </button>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    {!isFetchingWish ? (
                      <div>
                        {!checkInInWishlist ? (
                          <button
                            onClick={addItemsToWishlist}
                            className=" py-2 px-6 bg-white  outline-2  outline  outline-gray-200 hover:outline-gray-300 transition-all text-gray-700  font-semibold rounded-sm"
                          >
                            {isLoadingWish ? (
                              <ThreeDots
                                visible={true}
                                height="24"
                                width="82"
                                color="black"
                                secondaryColor="black"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                            ) : (
                              "                            Add To Wish List"
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={deleteWishlistItems}
                            className=" py-2 px-6 bg-white  outline-2  outline  outline-gray-200 hover:outline-gray-300 transition-all text-gray-700  font-semibold rounded-sm"
                          >
                            {isLoadingDeleteWish ? (
                              <ThreeDots
                                visible={true}
                                height="24"
                                width="100"
                                color="black"
                                secondaryColor="black"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                            ) : (
                              "  Delete from wishlist"
                            )}{" "}
                          </button>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
                {/* {!token && (
                  <h2 className=" text-omar font-semibold text-3xl ">
                    you need to Sign in to Add items to cart !
                  </h2>
                )} */}
              </div>
            </div>
            <Tooltip id="my-tooltip" />
          </div>
          <div className="   mx-4">
            <h2 className=" mt-24 text-xl font-bold text-black">
              Products you might like
            </h2>
            <Slider {...settings}>
              {likeProduct?.data.map((product) => (
                <LikeProduct
                  img={setSelectedImg}
                  key={product.id}
                  product={product}
                />
              ))}
            </Slider>
          </div>

{
  (!token&& showFirstTime) && <Modal isOpen={isOpen}  setIsOpen={setIsOpen}/>
}
        </>
      );
}


export default ProductDetails
