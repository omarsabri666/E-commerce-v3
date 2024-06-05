import { useQuery } from "@tanstack/react-query";
import { getWishlistItems } from "../api/api";
import WishlistItem from "../componots/WishlistItem";
import Loader from "../componots/Loader";
import { UseData } from "../context/contextP";
import { Link } from "react-router-dom";

function WishList() {
  const {user} = UseData()
  const {
    data: wishlistData,
    isFetching,
    isLoading
  } = useQuery(
    {
      queryFn: getWishlistItems,
      queryKey: ["wishlist"],
    },
    {
      enabled: !!user,
    }
  );



  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
    if (!user)
      return (
        <div className=" flex-col my-10 flex justify-center items-center">
          <h2 className="  text-3xl font-semibold">
            You need to Sign in First
          </h2>
          <Link
            className=" underline text-blue-600 text-2xl font-semibold"
            to="/signin"
          >
            Sign in
          </Link>
        </div>
      );
      if(wishlistData?.data.length === 0) return (
        <div className="  flex flex-col gap-5  justify-center items-center my-20 ">
          {" "}
          <p className="text-omar text-3xl">
            WishList is empty keep looking !
          </p>
          
          <Link className=" bg-black text-white px-8 py-3 rounded-lg font-semibold text-lg" to="/">Keep Looking</Link>
        </div>
      );
  return (
    <div className="max-w-6xl flex-col flex-wrap flex gap-6 px-2 md:px-0 mx-auto my-10">
      {wishlistData?.data && Array.isArray(wishlistData?.data) && (
        wishlistData.data.map((item, i) => (
          <WishlistItem key={i} item={item} />
        ))
      ) }
      <div className="flex items-center justify-around my-5 gap-4"></div>
    </div>
  );
}

export default WishList;

