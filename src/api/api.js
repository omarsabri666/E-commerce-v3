import  axios  from "axios";
export const api = axios.create({
  baseURL: "https://ecommerce.routemisr.com",
});
export async function getCategory(){
    try{

        const res = await  api.get("/api/v1/categories")
        return res.data
    } catch(err){
        throw new Error("could not get categories")
    }

 }
export async function selectCategory(category){
    try {
      const res = await api.get(`/api/v1/products?category[in]=${category}`);
      return res.data;
    } catch (err) {
      throw new Error("could not get categories");
    }


 }
export async function getProducts(page = 1){
    try{

        const res = await api.get(`/api/v1/products?page=${page}`);
        return res.data
    } catch(err){
        throw new Error("could not get categories")
    }

 }
export async function getOneProduct(id){
    try{

        const res = await api.get(`/api/v1/products/${id}`);
        return res.data
    } catch(err){
        throw new Error("could not get categories")
    }

 }
// export async function handleSignUp(){
//     try{

//         const res = await api.post(`/api/v1/auth/signup`);
//         return res.data
//     } catch(err){
//         throw new Error("could not sign Up ")
//     }

//  }
console.log(localStorage.getItem("token"));

export async function getCartItems() {
  try {
    const response = await api.get("/api/v1/cart", {
      headers: {
        token: `${localStorage.getItem("token")}`,
      },
    });
console.log(response.data)

    return  response.data;
  } catch (error) {
    // Handle any errors
    console.log(error);
    throw error;
  }
}
export async function addCartItems(id) {
  try {
    const response = await api.post(
      "/api/v1/cart",
      {
        productId: id,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.data);
    throw error;
  }
}
export async function DeleteOneItem(id) {
  try {
    const response = await api.delete(
      `/api/v1/cart/${id}` ,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle any errors
    console.log(error.data);
    throw error;
  }
}
export async function clearCart() {
  try {
    const response = await api.delete(
      `/api/v1/cart` ,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle any errors
    console.log(error.data);
    throw error;
  }
}
export async function updateCartItem(n,id) {
  try {
    const response = await api.put(
      `/api/v1/cart/${id}` ,{
        count : n

      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle any errors
    console.log(error.data);
    throw error;
  }
}
export async function addWishlistItems(id) {
  try {
    const response = await api.post(
      "/api/v1/wishlist",
      {
        productId: id,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle any errors
    console.log(error.data);
    throw error;
  }
}
export async function getWishlistItems() {
  try {
    const response = await api.get(
      "/api/v1/wishlist",

      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle any errors
    console.log(error.data);
    throw error;
  }
}
export async function deleteWishlistItem(id) {
  try {
    const response = await api.delete(
      `/api/v1/wishlist/${id}`,
      
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle any errors
    console.log(error.data);
    throw error;
  }
}
export async function addAddress(data) {
  try {
    const response = await api.post(
      `/api/v1/addresses`,
      {
        name: data.name,
        details: data.details,
        phone: data.phone,
        city: data.city,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle any errors
    console.log(error.data);
    throw error;
  }
}
export async function getAddresses() {
  try {
    const response = await api.get(
      `/api/v1/addresses`,

      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle any errors
    console.log(error.data);
    throw error;
  }
}
export async function getAllOrders(id) {
  try {
    const response = await api.get(
      `/api/v1/orders/user/${id}`
      
    );

    return response.data;
  } catch (error) {
    // Handle any errors
    console.log(error.data);
    throw error;
  }
}
export async function deleteAddress(id) {
  try {
    const response = await api.delete(
      `/api/v1/addresses/${id}`,

      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle any errors
    console.log(error.data);
    throw error;
  }
}
export async function createCashOrder(id,data) {
  try {
    const response = await api.post(
      `/api/v1/orders/${id}`,{
        
    shippingAddress:{
        details: data.details,
        phone: data.phone,
        city: data.cityCairo
        },
},

      

      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle any errors
    console.log(error.data);
    throw error;
  }
}
