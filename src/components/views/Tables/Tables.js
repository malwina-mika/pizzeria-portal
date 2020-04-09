import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Tables.module.scss';


const Tables = ({ id }) => {
  return (
    <div className={styles.component}>
      <h2>Tables view</h2>
      <Link to={`${process.env.PUBLIC_URL}/tables/booking/new`}>New booking</Link>
      <Link to={`${process.env.PUBLIC_URL}/tables/booking/${id}`}>Bookings ID</Link>
      <Link to={`${process.env.PUBLIC_URL}/tables/events/new`}>New event</Link>
      <Link to={`${process.env.PUBLIC_URL}/tables/events/${id}`}>Events ID</Link>
    </div>
  );
};

Tables.propTypes = {
  id: PropTypes.string,
};

export default Tables; 