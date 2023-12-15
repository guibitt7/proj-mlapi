import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { FaStore } from 'react-icons/fa';
import styles from '../modules/Header.module.css';
import MenuBar from './Menu/Menu';

function Header() {
  const [hiddenMenu, setHiddenMenu] = useState(false);

  return (
    <header className={ styles.header }>
      <h1>
        <FaStore />
        JEG
      </h1>
      <nav className={ styles.nav }>
        <Link to="/"><AiOutlineHome /></Link>
        <button
          type="button"
          className={ styles.navButton }
          onClick={ () => setHiddenMenu(!hiddenMenu) }
        >
          <MdOutlineLocalGroceryStore />
        </button>
      </nav>
      <aside
        className={ hiddenMenu ? styles.activeMenu : styles.menu }
      >
        <div className={ styles.menuContainer }>
          <MenuBar setHiddenMenu={ setHiddenMenu } hiddenMenu={ hiddenMenu } />
        </div>
      </aside>
    </header>
  );
}

export default Header;