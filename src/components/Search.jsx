import React, { useContext, useState } from 'react';
import OnlineStoreContext from '../context/OnlineStoreContext';

function Search() {
  const [search, setSearch] = useState('');
  const { searchProduct } = useContext(OnlineStoreContext);

  const sumbitSearch = () => {
    searchProduct(search, '');
    setSearch('');
  };

  return (
    <>
      <div>
        <input
          data-testid="query-input"
          name="search"
          type="text"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
          placeholder="Faça sua pesquisa"
        />
      </div>
      <button
        onClick={ sumbitSearch }
        type="button"
        data-testid="query-button"
      >
        Buscar
      </button>
    </>
  );
}

export default Search;