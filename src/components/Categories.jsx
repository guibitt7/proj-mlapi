import React, { useContext } from 'react';
import styles from '../modules/Categories.module.css';
import OnlineStoreContext from '../context/OnlineStoreContext';

function Categories() {
  const { categories,
    searchProductByCategory, selectedCategory } = useContext(OnlineStoreContext);
  return (
    <aside className={ styles.Categories }>
      <h2>Categorias</h2>
      {categories.map((category) => (
        <button
          key={ category.id }
          data-testid="category"
          id={ category.id }
          type="button"
          className={ selectedCategory === category.id ? styles.selected : '' }
          onClick={ searchProductByCategory }
        >
          { category.name }
        </button>
      ))}
    </aside>
  );
}

export default Categories;