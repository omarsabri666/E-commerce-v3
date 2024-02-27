import {  useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import CategoryPageList from "../componots/CategoryPageList";

function CategoryPage() {
    const queryClient = useQueryClient()
    const {id2} = useParams()


  const categoryData =   queryClient.getQueryData(["AllCategory"]);
   
    return (
      <div className=" max-w-6xl mx-auto grid my-10 grid-cols-5">
        <div className="  col-span-5 grid gap-4 grid-cols-5">
          {categoryData?.data.map((link) => (
            <CategoryPageList id2={id2} key={link._id} link={link} />
          ))}
        </div>
      </div>
    );
}

export default CategoryPage
