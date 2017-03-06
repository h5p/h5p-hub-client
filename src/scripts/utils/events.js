import { curry } from "utils/functional";

export const relayClickEventAs = curry(function(type, eventful, element) {
  element.addEventListener('click', event => {
    eventful.fire(type, {
      element: element,
      id: element.getAttribute('data-id')
    }, false);

    event.preventDefault();
  });

  return element;
});