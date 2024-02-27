// export  function (price) {
//   const formattedPrice = `EGP ${price.toFixed(2)}`;
//   return formattedPrice;
// }
export function formatPriceInEGP(price) {
  const formatter = new Intl.NumberFormat("eng-EG", {
    style: "currency",
    currency: "EGP",
  });

  return formatter.format(price);
}