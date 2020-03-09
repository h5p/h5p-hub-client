import React from 'react';

import './Item.scss';

const Item = ({image, title, buttonLabel, onAction}) => {
  return (
    <div className="grid-item">

      <div
        className='image'
        style={{backgroundImage: `url("${image.src}")`}}>
      </div>

      <div className="grid-item-title">
        { title }
      </div>
      
    </div>
  );
};

export default Item;