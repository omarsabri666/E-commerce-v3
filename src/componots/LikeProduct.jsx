import { useNavigate } from "react-router";
import { formatPriceInEGP } from "../helper/helper";
import { Link } from "react-router-dom";

function LikeProduct({product,img}) {
    console.log(product)
    const navigate = useNavigate()
    function goSomewhere(){
        img("")
        navigate(`/productDetails/${product._id}`);
    }
       function cutText(text) {
        const maxLength = 34
         
         if (text.length >= maxLength) {
           return text.slice(0, maxLength);
         } else {
           return text;
         }
       }
    return (
      <div className="  flex border   text-center  px-16  shadow-lg max-h-max flex-wrap flex-col gap-2 justify-center items-center my-10">
        <div className=" relative ">
          <img
            onClick={goSomewhere}
            width={200}
            className=" cursor-pointer"
            src={product.imageCover}
            alt={`${product.title} img`}
          />
          {product.priceAfterDiscount ? (
            <div className=" bg-omar absolute top-1 right-1 w-10 h-10 flex justify-center items-center  rounded-full">
              <p className=" text-white font-bold  ">
                {(
                  -(
                    (product.price - product.priceAfterDiscount) /
                    product.price
                  ) * 100
                ).toFixed(0)}
                %
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <Link
          onClick={goSomewhere}
          to={`/productDetails/${product._id}`}
          className=" cursor-pointer underline text-blue-600"
        >
          {cutText(product.title)}
        </Link>
        {product.priceAfterDiscount ? (
          <div className="gap-5 py-2  text-sm  justify-center items-center   text-center   flex">
            <h4 className="text-omar font-semibold">
              {formatPriceInEGP(product?.priceAfterDiscount)}
            </h4>
            <h4 className="line-through text-gray-600">
              {formatPriceInEGP(product?.price)}
            </h4>
          </div>
        ) : (
          <h4 className=" font-bold  py-3 ">
            {formatPriceInEGP(product.price)}
          </h4>
        )}
      </div>
    );
}

export default LikeProduct
