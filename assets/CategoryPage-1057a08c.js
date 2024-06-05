import{a as i,j as a,u as o,q as n}from"./index-4d8e1c40.js";function c({link:e,id2:r}){const t=i();return a.jsx("div",{onClick:()=>t(`/categoryDetails/${e._id}`),className:` flex  justify-center items-center  rounded-lg py-2 cursor-pointer hover:text-omar text-lg transition-all text-center
        ${r===e._id?"bg-omar text-white hover:text-white ":""}
        
        `,children:e.name})}function d(){const e=o(),{id2:r}=n(),t=e.getQueryData(["AllCategory"]);return a.jsx("div",{className:" max-w-6xl mx-auto grid my-10 grid-cols-5",children:a.jsx("div",{className:"  col-span-5 grid gap-4 grid-cols-5",children:t==null?void 0:t.data.map(s=>a.jsx(c,{id2:r,link:s},s._id))})})}export{d as default};
