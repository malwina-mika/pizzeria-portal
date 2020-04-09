import React from 'react';
import styles from './Waiter.module.scss';
import { Link } from 'react-router-dom';

const Waiter = () => {
  return (
    <div className={styles.component}>
      <h2>Waiter view</h2>
      <Link exact to={`${process.env.PUBLIC_URL}/waiter/order/new`} activeClassName='active'>New order</Link>
      <Link exact to={`${process.env.PUBLIC_URL}/waiter/order/:id`} activeClassName='active'>Order Id</Link>
    </div>
  );
};



export default Waiter; 