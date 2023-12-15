export async function getCategories() {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const categories = await response.json();
    return categories;
  }
  
  export async function getProductsFromCategoryAndQuery(categoryId, query) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    const products = await response.json();
    return products;
  }
  
  export async function getProductsFromId(productId) {
    const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const products = await response.json();
    return products;
  }
  