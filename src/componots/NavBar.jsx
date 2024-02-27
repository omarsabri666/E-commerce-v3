import { AnimatePresence } from "framer-motion";

import { MdOutlineAccountCircle, MdOutlineKeyboardArrowDown } from "react-icons/md";
import NavSlider from "./NavSlider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { BsFillBagCheckFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { getCartItems, getWishlistItems } from "../api/api";
import { UseData } from "../context/contextP";
import { useQuery } from "@tanstack/react-query";

function NavBar() {
  const {cart,user} = UseData()

  const location = useLocation()


const navigate = useNavigate()
  const { data } = useQuery(
    { queryFn: getCartItems, queryKey: ["cart", cart], onSuccess: () => {} },
    {
      enabled: !!user
    }
  );
  



  const { data: wishlistData } = useQuery(
    {
      queryFn: getWishlistItems,
      queryKey: ["wishlist"],
    },
    {
      enabled: !!user
    }
  );


    return (
      <header className=" shadow-xl   h-auto  md:h-auto flex flex-col  bg-[#232f3e] sticky  top-0  z-20   ">
        <nav className="flex justify-between px-10 text-white py-2">
          <AnimatePresence>
            <NavSlider />
          </AnimatePresence>
          {user && (
            <button
              onClick={() => navigate("user")}
              className=" flex hover:text-omar transition-all items-center gap-1"
            >
              {" "}
              <MdOutlineAccountCircle /> {user ? user.name : "my Account"}{" "}
              <MdOutlineKeyboardArrowDown />
            </button>
          )}
        </nav>
        <nav className=" flex justify-between  text-white  relative  py-7 px-10 md:px-10 md:py-0   items-center">
          <Link to="/">
            <h1 className=" text-3xl font-bold cursor-pointer">Trendify</h1>
          </Link>
         

          <ul className=" flex  gap-6 px-2">
            {!user && (
              <li className=" flex flex-wrap  md:flex-nowrap  items-center gap-1">
                <Link
                  to="signIn"
                  className=" hover:text-omar  font-semibold transition-all"
                >
                  Sign in{" "}
                </Link>{" "}
                <span>or</span>{" "}
                <Link
                  to="signUp"
                  className=" hover:text-omar  font-semibold transition-all"
                >
                  Register
                </Link>
              </li>
            )}
            <li className=" flex items-center flex-wrap  px-4 md:px-0  md:flex-nowrap   gap-3">
              hotLine :{" "}
              <a
                className="  hover:text-omar transition-all"
                href="tel:+201554776534"
              >
                01554776534
              </a>
            </li>
          </ul>

          
         
        </nav>    
        <div className=" flex justify-around">
          {location.pathname === "/" && (
            <div className="   sm:px-0 sm:w-1/2  px-6 self-center justify-self-center py-3 ">
              <SearchBar />
            </div>
          )}
         
          <div
            className={`flex gap-9        items-start py-4   ${
              location.pathname === "/"
                ? "justify-around "
                : "      justify-end  w-full px-8  "
            }`}
          >
            <div className=" rounded-full relative flex justify-center items-center w-12 h-12 bg-omar">
              <i className=" text-white    ">
                <Link to="cart">
                  <BsFillBagCheckFill size={25} />
                </Link>
                {data?.numOfCartItems > 0 && user && (
                  <div className="absolute -top-2 -right-6 bg-white  rounded-full w-8 h-8 flex justify-center items-center">
                    {
                      <span className=" text-lg font-semibold text-black ">
                        {data?.numOfCartItems}
                      </span>
                    }
                  </div>
                )}
              </i>
            </div>

            <i className="  hover:text-omar transition-all  text-white   py-1 ">
              <Link to="wishlist">
                <AiFillHeart size={35} />
              </Link>
            </i>
          </div>
        </div>
      </header>
    );
}

export default NavBar
