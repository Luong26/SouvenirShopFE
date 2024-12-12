import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.scss'; // Import styles for the navbar

const Navbar = () => {
  const location = useLocation(); // Get the current route
  const currentPath = location.pathname;

  return (
    <div className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link
          to="/"
          className={`${styles.navLink} ${currentPath === '/' ? styles.active : ''}`}
        >
          Dashboard
        </Link>
        <Link
          to="/products"
          className={`${styles.navLink} ${currentPath === '/products' ? styles.active : ''}`}
        >
          Products
        </Link>
        <Link
          to="/orders"
          className={`${styles.navLink} ${currentPath === '/orders' ? styles.active : ''}`}
        >
          Orders
        </Link>
        <Link
          to="/categories"
          className={`${styles.navLink} ${currentPath === '/categories' ? styles.active : ''}`}
        >
          Categories
        </Link>
        <Link
          to="/vouchers"
          className={`${styles.navLink} ${currentPath === '/vouchers' ? styles.active : ''}`}
        >
          Vouchers
        </Link>
        <Link
          to="/accounts"
          className={`${styles.navLink} ${currentPath === '/accounts' ? styles.active : ''}`}
        >
          Accounts
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
