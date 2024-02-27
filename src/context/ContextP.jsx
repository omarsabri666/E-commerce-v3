import { createContext, useCallback, useContext, useState } from "react";

const contextProvider = createContext()
function ContextP({children}) {
    const [selectedCategory,setSelectedCategory] = useState("")
    const [currentPage,setCurrentPage] = useState(1)
    const [selectedData,setSelectedData] = useState([])
    const [selectedId,setSelectedId] = useState("")
    const [search,setSearch] = useState("")
    const [loadingCart,setLoadingCart] = useState(false)
      const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
      );
      const [token, setToken] = useState(localStorage.getItem("token") || null);
      const [cart,setCart] = useState(false)
      const [userId,setUserId] = useState("")

     const login = useCallback((userData, authToken) => {
       setUser(userData);
       setToken(authToken);
 localStorage.setItem("user", JSON.stringify(userData));
 localStorage.setItem("token", authToken);
       
     }, []);
     console.log(user, token);
        const logout = useCallback (() => {
          setUser(null);
          setToken(null);
           localStorage.removeItem("user");
           localStorage.removeItem("token");
        },[])
          console.log(userId);

    return (
      <contextProvider.Provider
        value={{
          selectedCategory,
          setSelectedCategory,
          currentPage,
          setCurrentPage,
          selectedData,
          setSelectedData,
          selectedId,
          setSelectedId,
          login,
          logout,
          user,
          token,
          loadingCart,
          setLoadingCart,
          cart,
          setCart,
          search,
          setSearch,
          userId,
          setUserId,
        }}
      >
        {children}
      </contextProvider.Provider>
    );
}

export default ContextP;
export function UseData(){
    const context = useContext(contextProvider)
    if(context === undefined ) {
 throw new Error("context in undefined");
    } 
    return context
}