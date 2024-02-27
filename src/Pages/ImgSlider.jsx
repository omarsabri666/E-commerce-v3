function ImgSlider({ img }) {
  return (
    <div className="relative  grid grid-cols-2 h-[80vh]">
      {/* Background image with brightness filter */}
      <div
        style={{
          backgroundImage: `url("${img.img}")`,
          filter: "brightness(30%)",
        }}
        className="absolute bg-cover bg-center inset-0"
      ></div>

      {/* Container for text */}
      <div className="absolute px-3 inset-0 grid grid-cols-2">
        <div className=" flex gap-4 col-span-2 md:col-auto text-white text-center md:text-left  flex-col justify-center items-center">
          <h2 className="text-5xl font-semibold font-abc">{img.hidder}</h2>
          <h4 className="text-3xl text-gray-200 font-abc font-semibold">{img.sub}</h4>
          <a className=" px-6 py-2 inline-flex bg-omar font-semibold  hover:bg-orange-700  transition-all text-white rounded-full" href="#main">Shop Now</a>
        </div>
      </div>
    </div>
  );
}

export default ImgSlider;
