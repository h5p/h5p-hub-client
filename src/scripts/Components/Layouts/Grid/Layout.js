import React from 'react';

const Layout = ({children}) => {
  return (
    <div className="grid-layout">
      {children}
    </div>
  );
};

export default Layout;