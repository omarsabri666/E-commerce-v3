import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createCashOrder, getCartItems } from "../api/api";
import { toast } from "react-toastify";
import { UseData } from "../context/contextP";

function CreateOrder() {
  const queryClient = useQueryClient()
    const {cart,setCart} = UseData()
    const {register,handleSubmit,reset} = useForm()
    const {data:cartData} = useQuery({queryFn:getCartItems,queryKey:["cart",cart]})
  
    const { mutate } = useMutation({
      mutationFn: (d) => createCashOrder(cartData.data._id,d),onSuccess:()=>{
        toast.success("awesome happy shopping");
        setCart(s=>!s)
        reset()
        queryClient.invalidateQueries(["orders"]);
        
          

        
      },onError:()=>{
        toast.error("could not complete order")
      }
    });

  
async function onSubmit(data){

mutate(data)



}
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="   ">
        <h2 className=" text-omar font-bold text-3xl my-5 px-2">complete order</h2>
        <div className=" my-10 flex  max-w-6xl mx-auto   gap-5 flex-col">
          <div className=" flex flex-col justify-center items-center gap-1 ">
            <label className=" text-lg font-bold " htmlFor="details">
              details
            </label>
            <input
              required
              className="   w-1/2 px-5 py-2 text-lg outline bg-slate-100 outline-black focus:outline-none  focus:ring focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white  rounded-lg "
              id="details"
              placeholder="details"
              type="text"
              {...register("details")}
            />
          </div>
          <div className=" flex flex-col justify-center items-center gap-1">
            <label className=" text-lg font-bold " htmlFor="phone">
              phone
            </label>
            <input
              required
              className="  w-1/2 px-5 py-2 text-lg outline bg-slate-100 outline-black focus:outline-none  focus:ring focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white  rounded-lg "
              id="phone"
              placeholder="phone"
              type="tel"
              {...register("phone")}
            />
          </div>
          <div className=" flex flex-col justify-center items-center gap-1">
            <label className=" text-lg font-bold " htmlFor="city">
              City
            </label>
            <input
              required
              className="  w-1/2 px-5 py-2 text-lg outline bg-slate-100 outline-black focus:outline-none  focus:ring focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white  rounded-lg "
              id="city"
              placeholder="city"
              type="text"
              {...register("city")}
            />
          </div>
          <div className=" text-center">
            <button className=" bg-white my-4 w-1/2 text-black font-bold text-lg px-6 py-2 outline outline-black hover:text-white hover:bg-black transition-all rounded-lg">
              Create an order
            </button>
          </div>
        </div>
      </form>
    );
}

export default CreateOrder
