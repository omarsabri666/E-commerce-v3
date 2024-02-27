import { UseData } from "../context/contextP";

function SearchBar() {
  const {search,setSearch} = UseData()
    return (
      <div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" focus:outline-none  hidden md:block  w-full shadow-lg focus:ring focus:ring-[#ff3c20] py-2 px-4 bg-slate-100  rounded-lg "
          placeholder="Search"
          type="text"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className= {`focus:outline-none  block md:hidden  w-full shadow-lg focus:ring focus:ring-[#ff3c20] py-2 px-4 bg-slate-100  rounded-lg`}
          placeholder="Search"
          type="text"
        />
      </div>
    );
}

export default SearchBar
