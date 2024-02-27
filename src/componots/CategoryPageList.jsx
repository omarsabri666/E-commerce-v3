import { useNavigate } from "react-router";

function CategoryPageList({ link, id2 }) {
    const navigate = useNavigate()
    
  return (
    <div
      onClick={() => navigate(`/categoryDetails/${link._id}`)}
      className={` flex  justify-center items-center  rounded-lg py-2 cursor-pointer hover:text-omar text-lg transition-all text-center
        ${id2 === link._id ? "bg-omar text-white hover:text-white " : ""}
        
        `}
    >
      {link.name}
    </div>
  );
}

export default CategoryPageList
