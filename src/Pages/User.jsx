import { AiFillIdcard, AiOutlineMail } from "react-icons/ai";
import { UseData } from "../context/contextP";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function User() {
    const { user, logout,cart } = UseData();
    const queryClient = useQueryClient() 
 const navigate = useNavigate()
    


   async function handleClick(){
queryClient.invalidateQueries(["cart",cart])
queryClient.invalidateQueries(["wishlist",cart])
  queryClient.cancelQueries({ queryKey: ["cart"] });
  queryClient.invalidateQueries(["cart"]);
  queryClient.invalidateQueries(["wishlist"]);
  queryClient.cancelQueries(["wishlist"]);
  queryClient.refetchQueries(["wishlist"]);
  queryClient.refetchQueries(["cart",cart]);
  queryClient.refetchQueries(["cart"]);
      logout()
      navigate("/")

    }
  // if(!user) return redirect("signin")

    return (
      <div className=" max-w-6xl mx-auto  gap-10 flex flex-col my-10">
        <div className=" flex  flex-col  items-start">
          <div className=" text-lg flex gap-3 items-center  font-semibold">
            <i className=" text-4xl">
              <AiFillIdcard />
            </i>{" "}
            <h2> {user?.name}</h2>
          </div>
          <div className=" text-lg flex items-center gap-3 font-semibold ">
            <i className=" text-4xl">
              <AiOutlineMail />
            </i>
            <h2>
              <span>{user?.email}</span>
            </h2>
          </div>
        </div>
        <ul className=" w-fit  shadow-lg rounded-lg  border-2 border-gray-200  flex flex-col gap-2">
          
           
            {/* <Link className=" text-lg hover:text-omar transition-all px-6 py-2 font-semibold" to="/address">
             My addresse
            </Link> */}
            <button onClick={handleClick} className=" bg-omar text-white font-semibold text-lg px-6 py-2 rounded-lg">Sign Out</button>
            
        </ul>
      </div>
    );
}

export default User
