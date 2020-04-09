import React from 'react';
import PropTypes from 'prop-types';
import PageNav from '../PageNav/PageNav';


const MainLayout = ({ children }) => (
  <div>
    <PageNav />
    {children}
    MainLayout
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout; 