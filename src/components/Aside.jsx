import React, { useContext, useEffect, useState } from 'react';
import OnlineStoreContext from '../context/OnlineStoreContext';

function Aside() {
  const [order, setOrder] = useState('');
  const { productList, setProductList } = useContext(OnlineStoreContext);

  useEffect(() => {
    if (productList) {
      if (order === 'sale') {
        const sortedList = productList.sort((a, b) => b.sold_quantity - a.sold_quantity);
        setProductList([...sortedList]);
      } else if (order === 'asc') {
        const sortedList2 = productList.sort((a, b) => a.price - b.price);
        setProductList([...sortedList2]);
      } else if (order === 'desc') {
        const sortedList3 = productList.sort((a, b) => b.price - a.price);
        setProductList([...sortedList3]);
      }
    }
  }, [order, productList, setProductList]);

  return (
    <aside>
      <label htmlFor="order">
        Ordernar por
        <br />
        <select
          name="order"
          id="order"
          value={ order }
          onChange={ ({ target }) => setOrder(target.value) }
        >
          <option value="" disabled>Selecione</option>
          <option value="sale">Mais vendidos</option>
          <option value="desc">Maior preço</option>
          <option value="asc">Menor preço</option>
        </select>
      </label>
    </aside>
  );
}

export default Aside;