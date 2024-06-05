import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteOneItem, updateCartItem } from "../api/api";

import { formatPriceInEGP } from "../helper/helper";
import {AiFillDelete} from "react-icons/ai"
import { useNavigate } from "react-router";

import { toast } from "react-toastify";
import Loader from "../componots/Loader";
import { ThreeDots } from "react-loader-spinner";
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
            className="  md:w-40 md:h-40 rounded-lg shadow-sm  w-24 h-28"
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
            }     text-white w-10 h-10   flex justify-center items-center p-0 m-0   disabled:opacity-50    rounded-full`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.19993 10.8L9.26856 10.8H9.99993H10.3999L10.7999 10.8L16.3999 10.8C16.6121 10.8 16.8156 10.7157 16.9656 10.5657C17.1156 10.4157 17.1999 10.2122 17.1999 10C17.1999 9.78785 17.1156 9.58437 16.9656 9.43434C16.8156 9.28431 16.6121 9.20002 16.3999 9.20002H10.7999L10.5656 9.20003L9.99993 9.20002L9.43424 9.20002L9.19993 9.20003L3.59993 9.20002C3.38775 9.20002 3.18427 9.28431 3.03424 9.43434C2.88421 9.58437 2.79993 9.78785 2.79993 10C2.79993 10.2122 2.88421 10.4157 3.03424 10.5657C3.18427 10.7157 3.38775 10.8 3.59993 10.8L9.19993 10.8Z"
                fill="black"
              />
            </svg>
          </button>
          <span className=" font-semibold text-lg">
            {isUpdateing || isDeleting ? (
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
              item.count
            )}
          </span>
          <button
            aria-label="increase item by 1"
            disabled={isUpdateing}
            onClick={() => updateCart(item.count + 1)}
            className={`text-2xl font-semibold text-center ${
              isUpdateing ? "cursor-progress" : ""
            }     text-white w-10 h-10   flex justify-center items-center p-0 m-0   disabled:opacity-50    rounded-full`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.20005 16.4C9.20005 16.6122 9.28433 16.8157 9.43436 16.9657C9.58439 17.1157 9.78788 17.2 10 17.2C10.2122 17.2 10.4157 17.1157 10.5657 16.9657C10.7158 16.8157 10.8 16.6122 10.8 16.4V10.8H16.4C16.6122 10.8 16.8157 10.7157 16.9657 10.5657C17.1158 10.4157 17.2 10.2122 17.2 10C17.2 9.78784 17.1158 9.58436 16.9657 9.43433C16.8157 9.2843 16.6122 9.20002 16.4 9.20002H10.8V3.60002C10.8 3.38785 10.7158 3.18436 10.5657 3.03433C10.4157 2.8843 10.2122 2.80002 10 2.80002C9.78788 2.80002 9.58439 2.8843 9.43436 3.03433C9.28433 3.18436 9.20005 3.38785 9.20005 3.60002V9.20002H3.60005C3.38788 9.20002 3.18439 9.2843 3.03436 9.43433C2.88433 9.58436 2.80005 9.78784 2.80005 10C2.80005 10.2122 2.88433 10.4157 3.03436 10.5657C3.18439 10.7157 3.38788 10.8 3.60005 10.8H9.20005V16.4Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
        <h3 className=" text-black font-bold">
          {formatPriceInEGP(item.price * item.count)}
        </h3>
        <button
          aria-label="delete button"
          disabled={isDeleting}
          onClick={deleteItem}
          className=" text-black disabled:opacity-50 text-3xl"
        >
          <AiFillDelete />
        </button>
      </div>
    );
}

export default CartItem
