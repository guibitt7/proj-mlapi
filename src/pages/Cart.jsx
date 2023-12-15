import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import styles from '../modules/Cart.module.css';
import OnlineStoreContext from '../context/OnlineStoreContext';

function Cart() {
  const history = useHistory();

  const { cartList, handleClick, decrementQuantity } = useContext(OnlineStoreContext);

  return (
    <div className={ styles.container }>
      <section className={ styles.container_title }>
        <AiOutlineShoppingCart className={ styles.container_title_icon } />
        <h1>Carrinho de Compras</h1>
      </section>

      <main className={ styles.main }>
        { cartList.length > 0 ? (
          cartList.map((product) => (
            <div className={ styles.product } key={ product.id }>
              <img src={ product.thumbnail } alt={ product.title } />
              <p data-testid="shopping-cart-product-name">
                { product.title }
              </p>
              <p className={ styles.price }>
                {` ${Number(product.price).toLocaleString(
                  'pt-BR', { style: 'currency', currency: 'BRL' },
                )}`}
              </p>
              <section className={ styles.quantity }>
                <button
                  id={ product.id }
                  type="button"
                  onClick={ decrementQuantity }
                  data-testid="product-decrease-quantity"
                  disabled={ product.quantity === 0 }
                >
                  -
                </button>
                <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
                <button
                  id={ product.id }
                  type="button"
                  onClick={ handleClick }
                  data-testid="product-increase-quantity"
                  disabled={ product.quantity >= product.available_quantity }
                >
                  +
                </button>
              </section>
            </div>
          ))
        ) : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </main>

      <section className={ styles.final }>
        <h2>
          Valor total da compra:
          {cartList.reduce(
            (acc, item) => (acc + (item.price * item.quantity)), 0,
          ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </h2>
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ () => history.push('/checkout') }
          disabled={ cartList.length === 0 }
        >
          Finalizar a compra
        </button>
      </section>
    </div>
  );
}

export default Cart;