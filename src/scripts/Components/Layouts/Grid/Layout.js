import React from 'react';

import './Layout.scss';

const Layout = ({children}) => {
  return (
    <div className="grid-layout">
      {children}
    </div>
  );
};

export default Layout;