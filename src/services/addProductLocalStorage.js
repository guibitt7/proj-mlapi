export default function addProductLocalStorage(product) {
    localStorage.setItem('cart', JSON.stringify(product));
  }
  