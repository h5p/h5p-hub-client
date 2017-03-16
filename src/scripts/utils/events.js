import { curry } from "utils/functional";

/**
 *  Transforms a DOM click event into an EventDispatcher's event
 *  @see EventDispatcher
 *
 * @param  {string | Object} type
 * @param  {EventDispatcher} dispatcher
 * @param  {HTMLElement} element
 * @return {HTMLElement}
 */
export const relayClickEventAs = curry(function(type, dispatcher, element) {
  element.addEventListener('click', event => {
    dispatcher.fire(type, {
      element: element,
      id: element.getAttribute('data-id')
    }, false);

    // don't bubble
    event.stopPropagation();
  });

  return element;
});
