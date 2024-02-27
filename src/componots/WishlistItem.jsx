import { AiFillDelete } from "react-icons/ai";
import { formatPriceInEGP } from "../helper/helper";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartItems, deleteWishlistItem } from "../api/api";
import { toast } from "react-toastify";

function WishlistItem({item}) {
    const queryClient = useQueryClient()
const navigate = useNavigate()
 const { mutate: deleteWishlist ,isLoading } = useMutation({
   mutationFn: () => deleteWishlistItem(item.id),
   onSuccess: () => {
     queryClient.invalidateQueries(["wishlist"]);
     toast.info("item was deleted ")
   },onError:()=>{
    toast.error("could not delete item ")
   }
 });
 const { mutate, } = useMutation({
   mutationFn: () => addCartItems(item.id),
   onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ["cart"] });
 
     toast.success("item was added to cart")
     //   queryClient.invalidateQueries
   }, onError:()=>{
    toast.error("could not add item to cart")
   }
 });
 async function deleteWishlistItems() {
   deleteWishlist();
 }
    return (
      <div className=" flex    justify-around items-center">
        <div
          onClick={() => navigate(`/productDetails/${item.id}`)}
          className="  items-center flex-col sm:flex-row  cursor-pointer flex   sm:gap-10"
        >
          <img
            src={item.imageCover}
            className="  md:w-40 md:h-40 rounded-lg shadow-xl  w-24 h-28"
            alt={`${item.title}img`}
          />
          <div className="  w-10  md:w-36  ">
            <h2>{item.title}</h2>
          </div>
        </div>

        <h3 className=" text-omar font-bold">{formatPriceInEGP(item.price)}</h3>
        <div className="   flex-wrap  flex gap-1 md:gap-8 items-center">
          <button
            aria-label="delete button"
            disabled={isLoading}
            onClick={deleteWishlistItems}
            className=" text-red-600 text-3xl"
          >
            <AiFillDelete />
          </button>
          <button
            onClick={mutate}
            className="  outline outline-[#ff3c20]   hover:text-white hover:bg-omar transition-all  rounded-full text-black text-lg font-bold px-4 py-2 md:px-8 md:py-3"
          >
            Add To Cart
          </button>
        </div>
      </div>
    );
   
}

export default WishlistItem
