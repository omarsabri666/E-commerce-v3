// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { addAddress, getAddresses } from "../api/api";
// import AddressMap from "../componots/AddressMap";
// import Loader from "../componots/Loader";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";

// function Address() {
//      const { register, reset, handleSubmit } = useForm();
//      const [showForm, setShowForm] = useState(false);
//      const queryClient = useQueryClient();
//     const { data , isLoading , isRefetching } = useQuery({ queryFn: getAddresses , queryKey:["address"]});
//     const { mutate: addMutate } = useMutation({
//       mutationFn: (d) => addAddress(d),
//       onSuccess: () => {
//         queryClient.invalidateQueries(["address"]);
//         toast.success("address was added ");
//         reset()
//         setShowForm(false)
//       },
//     });
//     async function onSubmit(data) {
//       addMutate(data);
//     }
//     if(isRefetching) return  <div className=" flex items-center justify-center">
//       <Loader />
//     </div>;
//     if(isLoading) return (
//       <div className=" flex items-center justify-center">
//         <Loader />
//       </div>
//     );


//     return (
//       <div className=" mx-auto  max-w-6xl flex flex-col justify-center px-4 md:px-0  items-center sm:items-start  sm:justify-start">
//         <div className=" flex flex-col   gap-4 my-10">
//           {data?.data.map((address) => (
//             <AddressMap key={address._id} address={address} />
//           ))}
//         </div>
//         <button
//           onClick={() => setShowForm((s) => !s)}
//           className=" my-4  bg-white outline font-bold text-lg rounded-md outline-black text-black hover:text-white hover:bg-black transition-all px-6 py-2"
//         >
//           {showForm ? "cancel" : "Add Address"}{" "}
//         </button>
//         {showForm && (
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className=" flex flex-wrap gap-10  items-center flex-col"
//           >
//             <div className=" flex gap-4 items-center ">
//               <div className=" flex flex-col gap-1">
//                 <label className=" text-lg font-bold " htmlFor="name">
//                   Name
//                 </label>
//                 <input
//                   required
//                   className=" px-5 py-2 text-lg outline bg-slate-100 outline-black focus:outline-none  focus:ring focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white  rounded-lg "
//                   id="name"
//                   placeholder="Home or Work"
//                   type="text"
//                   {...register("name")}
//                 />
//               </div>
//               <div className=" flex flex-col gap-1">
//                 <label className=" text-lg font-bold " htmlFor="details">
//                   details
//                 </label>
//                 <input
//                   required
//                   className=" px-5 py-2 text-lg outline bg-slate-100 outline-black focus:outline-none  focus:ring focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white  rounded-lg "
//                   id="details"
//                   placeholder="Home details"
//                   type="text"
//                   {...register("details")}
//                 />
//               </div>
//             </div>
//             <div className=" flex gap-4 items-center ">
//               <div className=" flex flex-col gap-1">
//                 <label className=" text-lg font-bold " htmlFor="phone">
//                   Phone
//                 </label>
//                 <input
//                   required
//                   className=" px-5 py-2 text-lg outline bg-slate-100 outline-black focus:outline-none  focus:ring focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white  rounded-lg "
//                   id="phone"
//                   placeholder="Phone number"
//                   type="tel"
//                   {...register("phone")}
//                 />
//               </div>
//               <div className=" flex flex-col gap-1">
//                 <label className=" text-lg font-bold " htmlFor="city">
//                   City
//                 </label>
//                 <input
//                   required
//                   className=" px-5 py-2 text-lg outline bg-slate-100 outline-black focus:outline-none  focus:ring focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white  rounded-lg "
//                   id="city"
//                   placeholder="City"
//                   type="text"
//                   {...register("city")}
//                 />
//               </div>
//             </div>
//             <button className=" bg-white my-4 text-black font-bold text-lg px-6 py-2 outline outline-black hover:text-white hover:bg-black transition-all rounded-full">
//               Submit
//             </button>
//           </form>
//         )}
//       </div>
//     );
// }

// export default Address
