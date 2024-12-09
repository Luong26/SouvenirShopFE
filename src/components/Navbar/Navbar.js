import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss'; // Import styles for the navbar

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>
          Dashboard
        </Link>
        <Link to="/products" className={styles.navLink}>
          Products
        </Link>
        <Link to="/orders" className={styles.navLink}>
          Orders
        </Link>
        <Link to="/categories" className={styles.navLink}>
          Categories
        </Link>
        <Link to="/vouchers" className={styles.navLink}>
          Vouchers
        </Link>
        <Link to="/accounts" className={styles.navLink}>
          Accounts
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
