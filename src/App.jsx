

import "react-toastify/dist/ReactToastify.css";



import "./index.css";
import AppLayout from "./Pages/AppLayout";


import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductDetails from "./componots/ProductDetails"
import Home from "./Pages/Home"
import { lazy } from "react";
const User = lazy(()=> import("./Pages/User"))
const Cart = lazy(()=> import("./Pages/Cart"))
const WishList = lazy(()=> import("./Pages/WishList"))
const CreateOrder = lazy(()=> import("./Pages/CreateOrder"))
const SignUp = lazy(()=> import("./Pages/SignUp"))
const SignIn = lazy(()=> import("./Pages/SignIn"))
const CategoryPage = lazy(()=> import("./Pages/CategoryPage"))
const Address = lazy(()=> import("./Pages/Address"))





function App() {
  const router = createBrowserRouter([{
   
    element: <AppLayout/>,
    children:[{
      path : "/",
      element : <Home/>


    },
  {
    path : "productDetails/:id",
    element: <ProductDetails/>
  },{
    path : "categoryDetails/:id2",
    element : <CategoryPage/>

  },{
    path: "signUp",
    element:<SignUp/>
  },{
    path:"signIn",
    element : <SignIn/>
  },{
    path:"cart",
    element : <Cart/>
  },{
    path:"wishlist",
    element:<WishList/>
  },{
    path : "checkout",
    element: <CreateOrder/>
  },{
    path : "user",
    element:<User/>
  },{
    path:"address",
    element:<Address/>
  },




]

  }])
 
 
  


  return (
  
      
       
 <RouterProvider router={router}/>
    
   
  );
}

export default App;
