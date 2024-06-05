import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import usePassord from "../customHooks/usePassword";
import {AiFillEyeInvisible}from "react-icons/ai"
import { AiFillEye } from "react-icons/ai";
import { api } from "../api/api";

function SignUp() {
    const {handleSubmit,register,reset,formState:{errors},getValues} = useForm()
      const [error, setError] = useState("");
      const [work, setWork] = useState("");
      const [loading, setLoading] = useState(false);
      const {togglePassword,togglePasswordVis,togglePasswordVis2,togglePassword2} = usePassord()
      
     async function onSubmit(data){
        if(data.password !== data.rePassword) return setError("password and confirm password should match !")

 async function handleSignUp() {
     setLoading(true)
   try {
     const res = await api.post(`/api/v1/auth/signup`, {
       name: data.name,
       email: data.email,
       password: data.password,
       rePassword: data.rePassword,
       phone: data.phone,
     });
     if (res.data.message === "success") {
         setError("")
         setWork("email was created successfully ");
         reset()
         setLoading(false)
         return res.data;
    } 
   } catch (err) {
    setLoading(false)
    setError(err.response.data.message);
   }
}
handleSignUp()
      }
    return (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="  px-4 md:px-0    my-16 "
        >
          <div className="  max-w-4xl  rounded-lg  mx-auto  shadow-md">
            <div className=" px-4 md:px-0 gap-2 max-w-3xl mx-auto  flex-wrap flex flex-col">
              <h2 className=" text-center text-xl font-bold">Sign Up</h2>
              <div className=" flex flex-wrap gap-4">
                <div className=" flex flex-col w-full gap-1">
                  <label className=" font-semibold" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    required
                    className="  py-2  rounded-lg  px-4  outline outline-gray-300      focus:outline-none focus:ring focus:ring-orange-300  "
                    placeholder="E.G omar sabry"
                    id="name"
                    type="text"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className=" flex flex-col w-full gap-1">
                  <label className=" font-semibold" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    required
                    className="  py-2  rounded-lg  px-4 outline outline-gray-300  focus:outline-none focus:ring focus:ring-orange-300  "
                    placeholder="Example@gmail.com"
                    id="email"
                    type="email"
                    {...register("email")}
                  />
                </div>
              </div>
              <div></div>
              <div className=" w-full flex flex-col gap-1">
                <label className="  font-semibold" htmlFor="password">
                  password
                </label>
                <div className="  relative">
                  <input
                    required
                    minLength={7}
                    maxLength={50}
                    className=" py-2  px-4 rounded-lg  w-full outline outline-gray-300  focus:outline-none focus:ring focus:ring-orange-300  "
                    id="password"
                    placeholder="your Password"
                    type={togglePassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      validate: (value) =>
                        value === getValues("rePassword") ||
                        "Passwords do not match",
                    })}
                  />

                  <button
                    type="button"
                    className=" text-xl transform -translate-y-1/2 absolute right-2 top-1/2"
                    onClick={togglePasswordVis}
                  >
                    {togglePassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </button>
                </div>
              </div>
              <div className=" flex flex-col gap-1">
                <label className="  font-semibold" htmlFor="rePassword">
                  Confirm password
                </label>
                <div className=" relative">
                  <input
                    required
                    minLength={7}
                    maxLength={50}
                    className=" py-2  px-4 rounded-lg w-full outline outline-gray-300   focus:outline-none focus:ring focus:ring-orange-300  "
                    id="rePassword"
                    placeholder="Confirm Password"
                    type={togglePassword2 ? "text" : "password"}
                    {...register("rePassword", {
                      required: "confirm password is required ",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    className=" text-xl transform -translate-y-1/2 absolute right-2 top-1/2"
                    onClick={togglePasswordVis2}
                  >
                    {togglePassword2 ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </button>
                </div>
                {errors.rePassword && (
                  <span className="text-red-600  my-1 -bottom-4 left-0">
                    {errors.rePassword.message}
                  </span>
                )}
              </div>
              <div className=" flex flex-col gap-1">
                <label className="  font-semibold" htmlFor="phone">
                  phone
                </label>
                <input
                  required
                  minLength={7}
                  maxLength={50}
                  className=" py-2  px-4 rounded-lg  outline outline-gray-300  focus:outline-none focus:ring focus:ring-orange-300  "
                  id="phone"
                  placeholder="phone"
                  type="number"
                  {...register("phone")}
                />
              </div>
              <div></div>
              <button
                disabled={loading}
                type="submit"
                className=" bg-orange-600 py-2 px-4  my-4 text-center shadow-md rounded-lg text-white  hover:bg-orange-700 transition-colors"
              >
                Sign Up
              </button>

              <div className=" justify-end  self-end">
                <h3 className=" my-4 ">
                  <Link
                    className=" cursor-pointer font-semibold text-blue-600"
                    to="/signIn"
                  >
                    {" "}
                    sign in{" "}
                  </Link>{" "}
                </h3>
              </div>

              {error && (
                <div className="  mb-10 ">
                  <h2 className=" text-red-600 text-xl font-bold text-center my-4">
                    Error message : {error}
                  </h2>
                </div>
              )}
              {work && (
                <div className="  mb-10 ">
                  <h2 className=" text-green-600 text-xl font-bold text-center my-4">
                    {work}
                  </h2>
                </div>
              )}
            </div>
          </div>
        </form>
      </>
    );
}

export default SignUp
