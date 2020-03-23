import React from 'react';
import PropTypes from 'prop-types';

import ContentList from '../ContentList/ContentList';

import './SelectionsList.scss';

const SelectionsList = ({title, itemsPromise, actionLabel, onAction, onSelect}) => {
  return (
    <div className="content-selection-list">
      <div className="header">
        <div className="title">{title}</div>
        <a className="action" href="#" onClick={onAction}>{actionLabel}</a>
      </div>

      <ContentList 
        itemsPromise={itemsPromise}
        type="grid"
        visible={true}
        showPagination={false}
        onSelect={onSelect}
      />
    </div>
  );
};

SelectionsList.propTypes = {
  title: PropTypes.string.isRequired,
  itemsPromise: PropTypes.func.isRequired,
  actionLabel: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SelectionsList;