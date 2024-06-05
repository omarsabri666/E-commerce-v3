// export  function (price) {
//   const formattedPrice = `EGP ${price.toFixed(2)}`;
//   return formattedPrice;
// }
export function formatPriceInEGP(price) {
  const usdPrice = price / 50;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(usdPrice);
}