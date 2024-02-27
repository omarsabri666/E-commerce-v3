import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiFillDelete } from "react-icons/ai";
import {  deleteAddress } from "../api/api";
import { toast } from "react-toastify";

function AddressMap({address}) {
  
    const queryClient = useQueryClient()
  const { mutate } = useMutation({ mutationFn:()=> deleteAddress(address._id),onSuccess:()=>{
queryClient.invalidateQueries(["address"]);
toast.info("address was deleted ")
  },
onError:()=>{
    toast.error("could not delete address")
}});


    return (
      <div className=" flex  gap-1 justify-center flex-col    ">
        <div className=" flex flex-col w-fit border-2 rounded-xl border-gray-200  ">
          <h1 className=" px-3  text-lg font-bold ">Type : {address.name}</h1>
          <h2 className=" px-3  text-lg font-bold">City: {address.city}</h2>
          <h3 className=" px-3  pb-1 text-lg font-bold">
            Phone: {address.phone}
          </h3>
          <button
            onClick={mutate}
            className="  bg-white w-fit hover:bg-omar  transition-all hover:text-white  mx-2   mt-3 mb-2 outline outline-[#ff3c20] rounded-full  px-6 py-2 text-2xl text-black"
          >
            <AiFillDelete />
          </button>
        </div>
       
      </div>
    );
}

export default AddressMap
