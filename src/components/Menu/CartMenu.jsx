import React, { useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PropTypes from 'prop-types';
import OnlineStoreContext from '../../context/OnlineStoreContext';
import styles from '../../modules/MenuBar.module.css';

function CartMenu({ push }) {
  const { cartList, setCartList } = useContext(OnlineStoreContext);

  const MAX_NAME_IN_CART_LENGTH = 20;

  const handleRemoveItem = (item) => {
    const newCartList = cartList.filter((cartItem) => cartItem.id !== item.id);
    setCartList(newCartList);
  };

  return (
    <div>
      <ul className={ styles.listCart }>
        { cartList.length > 0 ? cartList.map((item) => (
          <li key={ item.id } className={ styles.itensCart }>
            <AiOutlineClose
              className={ styles.deleteItem }
              onClick={ () => handleRemoveItem(item) }
            />
            <div className={ styles.imgContent }>
              <img src={ item.thumbnail } alt={ item.title } />
              <span className={ styles.quantity }>{item.quantity}</span>
            </div>
            <span>{`${item.title.substr(0, MAX_NAME_IN_CART_LENGTH)}...`}</span>
            <span>{`R$ ${item.price}`}</span>
          </li>
        )) : <p>Não há itens no seu carrinho!</p>}
      </ul>
      <span className={ styles.totalPrices }>
        {`Total: R$ ${cartList.reduce((acc, item) => acc + item.price, 0)}`}
      </span>
      <button
        type="button"
        onClick={ () => push() }
        className={ styles.buttonCheckout }
      >
        Finalizar compra
      </button>
    </div>
  );
}

CartMenu.propTypes = {
  push: PropTypes.func.isRequired,
};

export default CartMenu;