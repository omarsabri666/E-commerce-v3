import{U as c,u as n,a as x,j as e,A as d,b as o}from"./index-4d8e1c40.js";function h(){const{user:i,logout:a,cart:l}=c(),s=n(),t=x();async function r(){s.invalidateQueries(["cart",l]),s.invalidateQueries(["wishlist",l]),s.cancelQueries({queryKey:["cart"]}),s.invalidateQueries(["cart"]),s.invalidateQueries(["wishlist"]),s.cancelQueries(["wishlist"]),s.refetchQueries(["wishlist"]),s.refetchQueries(["cart",l]),s.refetchQueries(["cart"]),a(),t("/")}return e.jsxs("div",{className:" max-w-6xl mx-auto  gap-10 flex flex-col my-10",children:[e.jsxs("div",{className:" flex  flex-col  items-start",children:[e.jsxs("div",{className:" text-lg flex gap-3 items-center  font-semibold",children:[e.jsx("i",{className:" text-4xl",children:e.jsx(d,{})})," ",e.jsxs("h2",{children:[" ",i==null?void 0:i.name]})]}),e.jsxs("div",{className:" text-lg flex items-center gap-3 font-semibold ",children:[e.jsx("i",{className:" text-4xl",children:e.jsx(o,{})}),e.jsx("h2",{children:e.jsx("span",{children:i==null?void 0:i.email})})]})]}),e.jsx("ul",{className:" w-fit  shadow-lg rounded-lg  border-2 border-gray-200  flex flex-col gap-2",children:e.jsx("button",{onClick:r,className:" bg-omar text-white font-semibold text-lg px-6 py-2 rounded-lg",children:"Sign Out"})})]})}export{h as default};