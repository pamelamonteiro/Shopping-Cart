const saveCartItems = (cartList) => {
  localStorage.setItem('cartItems', JSON.stringify(cartList));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
