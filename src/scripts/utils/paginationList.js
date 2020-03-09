import React from 'react';
import variables from '../../styles/base/_variables.scss';



export const paginationList = (selectedString, pages, ) => {

  const selected = parseInt(selectedString);
  const listElements = [];

  const screenSmall = parseInt(variables.screenSmall);

  const noDotsLimit = 7; //If the number of pages are this number or below all numbers will be shown.
  const numbersInBeginning = 5; //If the selected page is below this number, all pages up and included this number will be shown.
  const numbersInEnd = 3; //How close to the end the selected page must be to show selected-1 and to end. 

  const dots = (key) => (
    <li id='dots' disabled={true} key={'dots: ' + key} className="dots">
      <div className="dots-text">
        ...
      </div>
    </li>);

  const numberElement = (page) => (
    <li key={page.toString()} className="list-element">
      <a href="#"
        id={page.toString()}
        aria-label={`Page ${page} ${page == selected ? ", current page" : ''}`}
        aria-current={page == selected}
      >
        {page}
      </a>
    </li>);

  const arrow = (direction, active) => (
    <li key={direction} className={`list-element ${active ? '' : "disabled"}`} >
      <a href="#" id={direction}
        disabled={!active}
        aria-label={`Go to ${direction == '-1' ? 'previous' : 'next'} page`}
      >
        {direction == '-1' ? '<' : '>'}
      </a>
    </li>
  );

  //Previous button
  if (selected > 1) {
    listElements.push(arrow('-1', true));
  }
  else {
    listElements.push(arrow('-1', false));
  }

  //Pages

  //Don't have enough pages to create dots
  if (pages <= noDotsLimit && window.screen.width > screenSmall) {
    for (let i = 1; i <= pages; i++) {
      listElements.push(numberElement(i));
    }
  }

  else {
    //Small screen
    if (window.screen.width < screenSmall) {
      for (let i = selected - 1; i < (selected + 2); i++) {
        if (i > 0 && i <= pages) {
          listElements.push(numberElement(i));
        }

      }
    }

    //Close to beginning
    else if (selected < numbersInBeginning) {
      for (let i = 1; i < numbersInBeginning + 1; i++) {
        listElements.push(numberElement(i));
      }
      listElements.push(dots('end'));
      listElements.push(numberElement(pages));
    }

    //Close to end
    else if (selected > pages - numbersInEnd) {
      listElements.push(numberElement(1));
      listElements.push(dots('beginning'));
      for (let i = pages - numbersInEnd - 1; i <= pages; i++) {
        listElements.push(numberElement(i));
      }
    }

    //In the middle
    else {
      listElements.push(numberElement(1));
      listElements.push(dots('beginning'));
      for (let i = selected - 1; i < (selected + 2); i++) {
        listElements.push(numberElement(i));
      }
      listElements.push(dots('end'));
      listElements.push(numberElement(pages));
    }
  }
  //Next button
  if (selected < pages) {
    listElements.push(arrow('+1', true));
  } else {
    listElements.push(arrow('+1', false));
  }
  return listElements;
};