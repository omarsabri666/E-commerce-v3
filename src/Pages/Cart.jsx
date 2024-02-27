import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, getCartItems } from "../api/api";
import CartItem from "./CartItem";
import Loader from "../componots/Loader";
import { UseData } from "../context/contextP";
import { formatPriceInEGP } from "../helper/helper";
import { toast } from "react-toastify";
import img from "../../public/empty-cart.17f48bd13327a233e04a.webp"
import { Link } from "react-router-dom";

function Cart() {
  const queryClient = useQueryClient();


  const { setCart, cart, user } = UseData();
  const { data, isLoading, isRefetching, refetch } = useQuery(
    {
      queryFn: getCartItems,
      queryKey: ["cart", cart],
    },
    {
      enabled: !!user
   
    }
  );


   async function clearCart() {
    try {
      const response = await api.delete(`/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      // Handle any errors
      console.log(error.data);
      throw error;
    }
  }


   const { mutate } = useMutation({
     mutationFn: clearCart,
     onSuccess: () => {
      queryClient.cancelQueries({queryKey:["cart"]})
      queryClient.invalidateQueries(["cart"])
       toast.info("cart was cleared");
       refetch()
       setCart(s=>!s)
     },
     onError: () => {
       
         toast.error("could not clear cart");
         queryClient.invalidateQueries(["cart"]);
      
     },
     onSettled: () => {
       queryClient.invalidateQueries(["cart"]);
     },
     onMutate:()=>{
      queryClient.invalidateQueries(["cart"])
     }
   });
  if (isLoading)
    return (
      <div className=" flex items-center justify-center">
        <Loader />
      </div>
    );

  //Request failed with status code 404 error is
  if (isRefetching)
    return (
      <div className=" flex items-center justify-center">
        <Loader />
      </div>
    );
  if(!user) return <div className=" flex-col my-10 flex justify-center items-center">

    <h2 className="  text-3xl font-semibold">You need to Sign in First</h2>
    <Link className=" underline text-blue-600 text-2xl font-semibold" to="/signin">Sign in</Link>
    
  </div>
  if (!data?.numOfCartItems)
    return <div className=" flex gap-2 flex-col items-center justify-center">
      <img src={img} alt="empty cart img" />
      <h1 className=" text-omar font-bold  text-3xl">your cart is Empty</h1>
      <Link className=" bg-black text-white px-6 py-2 rounded-xl my-4 font-semibold " to="/">Keep Looking</Link>
    </div>;
  return (
    <div className=" max-w-6xl flex-col flex   gap-6 mx-auto my-10">
      {data?.data.products.map((item, i) => (
        <CartItem key={i} item={item} />
      ))}
      <div className=" flex items-center justify-around my-5 gap-4">
        <div className=" flex   items-center gap-4">
          <h2 className=" font-bold text-lg">Total Cart : </h2>
          <h3 className=" text-omar font-bold text-lg">
            {formatPriceInEGP(data?.data.totalCartPrice)}
          </h3>
        </div>
        <div className="   flex gap-2 ">
          <button
            onClick={mutate}
            className=" bg-red-600 text-center hover:bg-red-800  transition-all px-4 py-2  md:px-8 md:py-3 text-white font-semibold text-lg rounded-lg"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className=" hover:bg-black outline px-4 py-2 outline-black text-lg font-bold hover:text-white transition-all md:px-10 md:py-4 rounded-lg  text-black"
          >
            Check Out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart
