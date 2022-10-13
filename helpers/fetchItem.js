const itemURL = (id) => `https://api.mercadolibre.com/items/${id}`;

const fetchItem = (item) => {
  const url = itemURL(item);
  const result = fetch(url)
    .then((data) => data.json())
    .catch(() => new Error('You must provide an url'));
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
