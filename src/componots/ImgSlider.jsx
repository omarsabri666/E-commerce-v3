function ImgSlider({ img, setSelectedImg }) {
  function handleClick() {
    setSelectedImg(img)
  }
  return (
    <img onClick={handleClick}
      className=" rounded-md shadow-md  cursor-pointer"
      width={75}
      height={75}
      src={img}
    />
  );
}

export default ImgSlider
