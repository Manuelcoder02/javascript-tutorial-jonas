// Exporting module
console.log('Exporting module');

const shippingCost = 0;
const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart`);
};

const totalPrice = 237;
const totalQuantity = 20;

export { totalPrice, totalQuantity };
