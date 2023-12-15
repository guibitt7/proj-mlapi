import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import addProductLocalStorage from '../services/addProductLocalStorage';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import OnlineStoreContext from './OnlineStoreContext';

function OnlineStoreProvider({ children }) {
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem('cart')) || [],
  );
  const [cartLength, setCartLength] = useState(
    JSON.parse(localStorage.getItem('lengthCart')) || 0,
  );
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [hiddenMenu, setHiddenMenu] = useState(true);
  const [noProductsFound, setNoProductsFound] = useState(false);
  ;

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesByApi = await getCategories();
      setCategories(categoriesByApi);
    };
    fetchCategories();
  }, []);

  const searchProduct = async (search, searchCategorie) => {
    setIsFetching(true);
    const resultSearch = await getProductsFromCategoryAndQuery(
      searchCategorie,
      search,
    );
    setProductList(resultSearch.results);
    setIsFetching(false);
    return resultSearch.results.length === 0
      ? setNoProductsFound(true) : setNoProductsFound(false);
  };

  const searchProductByCategory = async ({ target }) => {
    setIsFetching(true);
    setHiddenMenu(true);
    const searchCategorie = target.id;
    setSelectedCategory(searchCategorie);
    const resultSearch = await getProductsFromCategoryAndQuery(
      searchCategorie,
      '',
    );
    setProductList(resultSearch.results);
    setIsFetching(false);
    return resultSearch.results.length === 0
      ? setNoProductsFound(true) : setNoProductsFound(false);
  };

  const handleClick = useCallback(async ({ target }) => {
    const itemId = target.id;
    const product = productList.find((item) => item.id === itemId);
    const newProduct = {
      ...product,
      quantity: 1,
    };
    const checkIncludesListCart = cartList.some((item) => item.id === itemId);
    if (!checkIncludesListCart) return setCartList([...cartList, { ...newProduct }]);
    const productSelect = cartList.find((item) => item.id === itemId);
    productSelect.quantity += 1;
    setCartList([...cartList]);
    localStorage.setItem('lengthCart', JSON.stringify(cartLength));
  }, [cartList, cartLength, productList]);

  useEffect(() => {
    const changeQuantityCart = () => {
      const length = cartList.reduce((acc, item) => acc + item.quantity, 0);
      localStorage.setItem('lengthCart', JSON.stringify(cartLength));
      setCartLength(length);
    };
    addProductLocalStorage(cartList);
    changeQuantityCart();
  }, [cartLength, cartList]);

  const checkProducts = () => {
    const products = cartList.filter((product) => product.quantity > 0);
    setCartList(products);
  };

  const decrementQuantity = ({ target }) => {
    const itemId = target.id;
    const productSelect = cartList.find((item) => item.id === itemId);
    productSelect.quantity -= 1;
    setCartList([...cartList]);
    checkProducts();
  };



  return (
    <OnlineStoreContext.Provider
      value={
        { cartLength,
          handleClick,
          decrementQuantity,
          cartList,
          productList,
          setProductList,
          isFetching,
          categories,
          selectedCategory,
          setCartList,
          searchProduct,
          hiddenMenu,
          setHiddenMenu,
          noProductsFound,
          searchProductByCategory }
      }
    >
      {children}
    </OnlineStoreContext.Provider>
  );
}

OnlineStoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OnlineStoreProvider;