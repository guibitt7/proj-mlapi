import React, { useContext } from 'react';
import { CgCloseR } from 'react-icons/cg';
import OnlineStoreContext from '../context/OnlineStoreContext';
import styles from '../modules/CategoriesCL.module.css';
import Aside from './Aside';

function CategoriesCL() {
  const {
    categories, selectedCategory, setHiddenMenu,
    searchProductByCategory } = useContext(OnlineStoreContext);

  return (
    <div
      className={ styles.categoriesMobileContainer }
    >
      <section style={ { position: 'relative' } }>
        <h2>Categorias</h2>
        <CgCloseR className={ styles.close } onClick={ () => setHiddenMenu(true) } />
      </section>
      <section className={ styles.categoriesActions }>
        <Aside />
        <div>
          {categories.map((category) => (
            <button
              key={ category.id }
              id={ category.id }
              className={
                category.id === selectedCategory
                  ? styles.selected && styles.categoryMobile : styles.categoryMobile
              }
              type="button"
              onClick={ searchProductByCategory }
            >
              { category.name }
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}

export default CategoriesCL;