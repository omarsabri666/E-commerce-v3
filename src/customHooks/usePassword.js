import { useState } from "react";

function usePassord(){
    const [togglePassword,setTogglePassword] = useState(false)
    function togglePasswordVis(){
        setTogglePassword(s=>!s)
    }
    const [togglePassword2,setTogglePassword2] = useState(false)
    function togglePasswordVis2(){
        setTogglePassword2(s=>!s)
    }
return {togglePassword,togglePasswordVis,togglePassword2,togglePasswordVis2}
}
export default usePassord