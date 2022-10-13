let totalPrice = 0;
const cartList = document.getElementsByClassName('cart')[0];

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createTotalPrice() {
  const tagPrice = document.getElementsByClassName('total-price')[0];
  tagPrice.innerText = totalPrice;
}

function getallPrices() {
  const total = document.querySelectorAll('.price');
  return total;
}

function updateTotalPrice() {
  const total = getallPrices();
  totalPrice = 0;
  total.forEach((price) => {
    const priceAsNumber = price.innerText * 1;
    totalPrice += priceAsNumber;
  });
  // resolvido seguindo a sugestão do https://stackoverflow.com/questions/17555999/tofixed-not-for-0
  const tagPrice = document.getElementsByClassName('total-price')[0];
  tagPrice.textContent = parseFloat(totalPrice.toFixed(2));
}

function cartItemClickListener(event) {
  event.target.remove();
  updateTotalPrice();
  saveCartItems(cartList.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerHTML = `SKU: ${sku} | NAME: ${name} | PRICE: $<span class='price'>${salePrice}</span>`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addToCart = (event) => {
  const id = event.target.parentElement.firstChild.innerText;
  const ol = document.getElementsByClassName('cart__items');
  fetchItem(id)
    .then((data) => {
      const info = {
        sku: data.id,
        name: data.title,
        salePrice: data.price,
      };
      const itemCart = createCartItemElement(info);
      ol[0].appendChild(itemCart);
      updateTotalPrice();
    })
    .then(() => saveCartItems(cartList.innerHTML));
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', addToCart);
  section.appendChild(button);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const productsList = (item) => {
  fetchProducts(item)
    .then((result) => result.results.forEach((element) => {
      const productData = {
        image: element.thumbnail,
        sku: element.id,
        name: element.title,
      };
      const section = document.getElementsByClassName('items');
      const productCard = createProductItemElement(productData);
      productCard.classList.add('item');
      section[0].appendChild(productCard);
    }));
};

function removeCart() {
  const list = document.getElementsByClassName('cart__items')[0];
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  updateTotalPrice();
  saveCartItems(cartList.innerHTML);
}

productsList('computador');

window.onload = () => {
  createTotalPrice();
  const clearCart = document.getElementsByClassName('empty-cart')[0];
  clearCart.addEventListener('click', removeCart);
  if (localStorage.length !== 0) {
    const loadCartList = document.getElementsByClassName('cart')[0];
    loadCartList.innerHTML = JSON.parse(getSavedCartItems());
    updateTotalPrice();
    const loadList = document.querySelectorAll('.cart__item');
    loadList.forEach((element) => element.addEventListener('click', cartItemClickListener));
    const loadClearCart = document.getElementsByClassName('empty-cart')[0];
    loadClearCart.addEventListener('click', removeCart);
  }
};
