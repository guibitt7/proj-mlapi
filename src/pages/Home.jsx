import React, { useContext } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import Product from '../components/Product';
import Categories from '../components/Categories';
import styles from '../modules/Home.module.css';
import OnlineStoreContext from '../context/OnlineStoreContext';
import CategoriesMobile from '../components/CategoriesCL';
import Search from '../components/Search';
import Aside from '../components/Aside';

function Home() {
  const {
    productList, isFetching, noProductsFound,
    searchProductByCategory, handleClick,
    hiddenMenu, setHiddenMenu } = useContext(OnlineStoreContext);

  const showProducts = () => productList.map((item) => (
    <Product
      productName={ item.title }
      productImage={ item.thumbnail }
      productPrice={ item.price }
      handleClick={ handleClick }
      productId={ item.id }
      freeShipping={ item.shipping.free_shipping }
      key={ item.id }
    />
  ));

  return (
    
    <div className={ styles.container }>
      <BsFillArrowUpCircleFill
        className={ styles.scroll }
        onClick={ () => window.scrollTo(0, 0) }
      />
      { !hiddenMenu ? <CategoriesMobile /> : (
        <section className={ styles.main }>
          <div className={ styles.categoriesContainer }>
            <Categories
              searchProductByCategory={ searchProductByCategory }
            />
          </div>
          <div className={ styles.productsGrid }>
            <section className={ styles.inputContainer }>
              <HiOutlineMenuAlt2 onClick={ () => setHiddenMenu(false) } tabIndex="0" />
              <Search />
            </section>
            <div className={ styles.productsContainer }>
              { noProductsFound && (
                <p className={ styles.notFound }>Nenhum produto foi encontrado</p>
              )}
              { isFetching ? (
                <p className={ styles.fetching }>
                  <AiOutlineLoading3Quarters />
                  <span>Carregando...</span>
                </p>)
                : productList && showProducts() }
              { productList.length !== 0 && <Aside />}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
