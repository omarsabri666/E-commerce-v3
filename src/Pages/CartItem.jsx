import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteOneItem, updateCartItem } from "../api/api";

import { formatPriceInEGP } from "../helper/helper";
import {AiFillDelete} from "react-icons/ai"
import { useNavigate } from "react-router";

import { toast } from "react-toastify";
function CartItem({item}) {


const navigate = useNavigate()
     
        const queryClient = useQueryClient()
        async function handleDec(){
            if(item.count === 1 ) {
                return deleteItem()
            } else {
updateCart(item.count - 1)
            }
        }
       
    const {mutate:deleteItem,isLoading:isDeleting} = useMutation({mutationFn:()=> DeleteOneItem(item.product.id) ,onSuccess:()=>{ queryClient.invalidateQueries({queryKey:["cart"]})
    toast.info("item was deleted")

    }, onError:()=>{
      toast.error("could not delete item")
    }})
    const {mutate:updateCart,isLoading:isUpdateing,} = useMutation({mutationFn:(n)=> updateCartItem(n,item.product.id),onSuccess:()=>{ queryClient.invalidateQueries({queryKey:["cart"]})

    },onError:()=>{
      
    }})
    // if(isDeleting || isUpdateing) return <div className=" flex items-center justify-center"><Loader/></div>
    
    return (
      <div className=" flex flex-row   justify-around items-center">
        <div
          onClick={() => navigate(`/productDetails/${item.product.id}`)}
          className="  items-center  cursor-pointer flex-wrap flex   md:gap-10"
        >
          <img
            src={item.product.imageCover}
          
            className="  md:w-40 md:h-40 rounded-lg shadow-xl  w-24 h-28"
            alt={`${item.product.title}img`}
          />
          <div className="      md:w-36  ">
            <h2>{item.product.title}</h2>
          </div>
        </div>
        <div className=" space-x-3   flex items-center">
          <button
            aria-label="decrease item by 1"
            disabled={isUpdateing}
            onClick={handleDec}
            className={`text-2xl font-semibold text-center ${
              isUpdateing ? "cursor-progress" : ""
            } bg-omar  pb-1  text-white w-10 h-10   disabled:opacity-50    rounded-full`}
          >
            -
          </button>
          <span className=" font-semibold text-lg">{item.count}</span>
          <button
            aria-label="increase item by 1"
            disabled={isUpdateing}
            onClick={() => updateCart(item.count + 1)}
            className={`text-2xl font-semibold text-center ${
              isUpdateing ? "cursor-progress" : ""
            } bg-omar  pb-1  text-white w-10 h-10   disabled:opacity-50    rounded-full`}
          >
            +
          </button>
        </div>
        <h3 className=" text-omar font-bold">
          {formatPriceInEGP(item.price * item.count)}
        </h3>
        <button
          aria-label="delete button"
          disabled={isDeleting}
          onClick={deleteItem}
          className=" text-red-600 disabled:opacity-50 text-3xl"
        >
          <AiFillDelete />
        </button>
      </div>
    );
}

export default CartItem
