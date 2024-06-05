import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseData } from "../context/contextP";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import usePassord from "../customHooks/usePassword";
import { toast } from "react-toastify";

function SignIn() {
  const queryClient = useQueryClient()
    const {togglePassword2,togglePasswordVis2} = usePassord()
    const {login,cart} = UseData()
    const [error,setError] = useState("")
    const [work,setWork] = useState("")
    const navigate = useNavigate()
    async function handleSignIn(data) {
   try {
     const res = await api.post(`/api/v1/auth/signin`, {
       email: data.email,
       password: data.Password,
     });
     setError("")
     const {user,token} = res.data
     login(user,token)
    navigate("/");
     setWork("signed in successfully ");
     return res.data;
   } catch (err) {
     setError(err.response.data.message);
     setWork("")
   }
}
    const {handleSubmit,register} = useForm()
    const {mutate,isLoading} = useMutation({mutationFn :  handleSignIn,onSuccess:()=>{
      toast.success("signed in successfully");
     
        
    } })
   
    async function  onSubmit(data){
     
          mutate(data)
          queryClient.invalidateQueries(["cart", cart]);
          queryClient.invalidateQueries(["wishlist", cart]);
          queryClient.cancelQueries({ queryKey: ["cart"] });
          queryClient.invalidateQueries(["cart"]);
          queryClient.invalidateQueries(["wishlist"]);
          queryClient.cancelQueries(["wishlist"]);
          queryClient.refetchQueries(["wishlist"]);
          queryClient.refetchQueries(["cart", cart]);
     
 
}

    
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="  px-4 md:px-0     my-16 "
      >
        <div className="  max-w-xl  rounded-lg  mx-auto  shadow-md ">
          <div className=" px-2 md:px-0 gap-2 max-w-lg mx-auto  flex-wrap flex flex-col">
            <h2 className=" text-center text-xl font-bold">Login</h2>
            <div className=" flex flex-col gap-1">
              <label className=" font-semibold" htmlFor="email">
                Email Address
              </label>
              <input
                defaultValue="morasabri422@gmail.com"
                className="  py-2  rounded-lg  px-4  outline outline-gray-300    focus:outline-none focus:ring focus:ring-orange-300  "
                placeholder="Example@gmail.com"
                id="email"
                type="email"
                {...register("email")}
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className="  font-semibold" htmlFor="password">
                password
              </label>
              <div className=" relative">
                <input
                  defaultValue="123456789"
                  className=" py-2  px-4 rounded-lg w-full  outline outline-gray-300      focus:outline-none focus:ring focus:ring-orange-300  "
                  id="password"
                  placeholder="your Password"
                  type={togglePassword2 ? "text" : "password"}
                  {...register("Password")}
                />
                <button
                  type="button"
                  className=" text-xl transform -translate-y-1/2 absolute right-2 top-1/2"
                  onClick={togglePasswordVis2}
                >
                  {togglePassword2 ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>
            </div>
            <div></div>
            <button
              disabled={isLoading}
              type="submit"
              className=" bg-orange-600 py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed  my-4 text-center shadow-md rounded-lg text-white  hover:bg-orange-700 transition-colors"
            >
              login
            </button>

            <div className=" justify-end  self-end">
              <h3 className=" my-4 ">
                dont have an account ?
                <Link className=" cursor-pointer text-blue-500" to="/signUp">
                  {" "}
                  sign up{" "}
                </Link>{" "}
              </h3>
            </div>
            {error && (
              <div className="  justify-center  items-center ">
                <h2 className=" text-red-600 text-center my-4">{error}</h2>
              </div>
            )}
            {work && (
              <div className="  justify-center  items-center ">
                <h2 className=" text-green-600 text-center my-4">{work}</h2>
              </div>
            )}
          </div>
        </div>
      </form>
    );
}

export default SignIn
