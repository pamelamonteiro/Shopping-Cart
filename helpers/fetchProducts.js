const productsURL = (item) => `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;

const fetchProducts = (item) => {
  const url = productsURL(item);
  const result = fetch(url)
  .then((data) => data.json())
  .then((responseJson) => responseJson)
  .catch(() => new Error('You must provide an url'));
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
