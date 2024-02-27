import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Rating({ rating }) {
  const fullStars = Math.floor(rating); // Get the integer part of the rating
  const hasHalfStar = rating % 1 !== 0; // Check if there is a half star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar color="#eab308" key={i} />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt color="#eab308" key={fullStars} />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar color="#eab308" key={fullStars + 1 + i} />);
  }

  return <div className=" font-bold   flex items-center"> {rating}  {stars}</div>;
}

export default Rating;
