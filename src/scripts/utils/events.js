import { curry } from "utils/functional";

export const relayClickEventAs = curry(function(type, eventful, element) {
  element.addEventListener('click', event => {
    eventful.fire(type, {
      element: element,
      id: element.getAttribute('data-id')
    }, false);

    // don't bubble
    event.stopPropagation();
  });

  return element;
});