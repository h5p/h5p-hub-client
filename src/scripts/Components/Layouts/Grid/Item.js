import React from 'react';

const Item = ({image, title, buttonLabel, onAction}) => {
  return (
    <div className="grid-item">
      <div className="grid-item-title">
        { title }
      </div>
    </div>
  );
};

export default Item;