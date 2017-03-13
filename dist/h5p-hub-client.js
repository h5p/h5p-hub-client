/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @mixin
 */
var Eventful = exports.Eventful = function Eventful() {
  return {
    listeners: {},

    /**
     * Listen to event
     *
     * @param {string} type
     * @param {function} listener
     * @param {object} [scope]
     *
     * @function
     * @return {Eventful}
     */
    on: function on(type, listener, scope) {
      /**
       * @typedef {object} Trigger
       * @property {function} listener
       * @property {object} scope
       */
      var trigger = {
        'listener': listener,
        'scope': scope
      };

      this.listeners[type] = this.listeners[type] || [];
      this.listeners[type].push(trigger);

      return this;
    },

    /**
     * Fire event. If any of the listeners returns false, return false
     *
     * @param {string} type
     * @param {object} [event]
     *
     * @function
     * @return {boolean}
     */
    fire: function fire(type, event) {
      var triggers = this.listeners[type] || [];

      return triggers.every(function (trigger) {
        return trigger.listener.call(trigger.scope || this, event) !== false;
      });
    },

    /**
     * Listens for events on another Eventful, and propagate it trough this Eventful
     *
     * @param {string[]} types
     * @param {Eventful} eventful
     */
    propagate: function propagate(types, eventful) {
      var self = this;
      types.forEach(function (type) {
        return eventful.on(type, function (event) {
          return self.fire(type, event);
        });
      });
    }
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns a curried version of a function
 *
 * @param {function} fn
 *
 * @public
 *
 * @return {function}
 */
var curry = exports.curry = function curry(fn) {
  var arity = fn.length;

  return function f1() {
    var args = Array.prototype.slice.call(arguments, 0);
    if (args.length >= arity) {
      return fn.apply(null, args);
    } else {
      return function f2() {
        var args2 = Array.prototype.slice.call(arguments, 0);
        return f1.apply(null, args.concat(args2));
      };
    }
  };
};

/**
 * Compose functions together, executing from right to left
 *
 * @param {function...} fns
 *
 * @function
 * @public
 *
 * @return {function}
 */
var compose = exports.compose = function compose() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduce(function (f, g) {
    return function () {
      return f(g.apply(undefined, arguments));
    };
  });
};

/**
 * Applies a function to each element in an array
 *
 * @param {function} fn
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
var forEach = exports.forEach = curry(function (fn, arr) {
  arr.forEach(fn);
});

/**
 * Maps a function to an array
 *
 * @param {function} fn
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
var map = exports.map = curry(function (fn, arr) {
  return arr.map(fn);
});

/**
 * Applies a filter to an array
 *
 * @param {function} fn
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
var filter = exports.filter = curry(function (fn, arr) {
  return arr.filter(fn);
});

/**
 * Applies a some to an array
 *
 * @param {function} fn
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
var some = exports.some = curry(function (fn, arr) {
  return arr.some(fn);
});

/**
 * Returns true if an array contains a value
 *
 * @param {*} value
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
var contains = exports.contains = curry(function (value, arr) {
  return arr.indexOf(value) != -1;
});

/**
 * Returns an array without the supplied values
 *
 * @param {Array} values
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
var without = exports.without = curry(function (values, arr) {
  return filter(function (value) {
    return !contains(value, values);
  }, arr);
});

/**
 * Takes a string that is either 'true' or 'false' and returns the opposite
 *
 * @param {string} bool
 *
 * @public
 * @return {string}
 */
var inverseBooleanString = exports.inverseBooleanString = function inverseBooleanString(bool) {
  return (bool !== 'true').toString();
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAllChildren = exports.querySelectorAll = exports.querySelector = exports.appendChild = exports.toggleAttribute = exports.attributeEquals = exports.hasAttribute = exports.removeAttribute = exports.setAttribute = exports.getAttribute = undefined;

var _functional = __webpack_require__(1);

/**
 * Get an attribute value from element
 *
 * @param {string} name
 * @param {HTMLElement} el
 *
 * @function
 * @return {string}
 */
var getAttribute = exports.getAttribute = (0, _functional.curry)(function (name, el) {
  return el.getAttribute(name);
});

/**
 * Set an attribute on a html element
 *
 * @param {string} name
 * @param {string} value
 * @param {HTMLElement} el
 *
 * @function
 */
var setAttribute = exports.setAttribute = (0, _functional.curry)(function (name, value, el) {
  el.setAttribute(name, value);
});

/**
 * Remove attribute from html element
 *
 * @param {string} name
 * @param {HTMLElement} el
 *
 * @function
 */
var removeAttribute = exports.removeAttribute = (0, _functional.curry)(function (name, el) {
  el.removeAttribute(name);
});

/**
 * Check if element has an attribute
 *
 * @param {string} name
 * @param {HTMLElement} el
 *
 * @function
 * @return {boolean}
 */
var hasAttribute = exports.hasAttribute = (0, _functional.curry)(function (name, el) {
  return el.hasAttribute(name);
});

/**
 * Check if element has an attribute that equals
 *
 * @param {string} name
 * @param {string} value
 * @param {HTMLElement} el
 *
 * @function
 * @return {boolean}
 */
var attributeEquals = exports.attributeEquals = (0, _functional.curry)(function (name, value, el) {
  return el.getAttribute(name) === value;
});

/**
 * Toggles an attribute between 'true' and 'false';
 *
 * @param {string} name
 * @param {HTMLElement} el
 *
 * @function
 */
var toggleAttribute = exports.toggleAttribute = (0, _functional.curry)(function (name, el) {
  var value = getAttribute(name, el);
  setAttribute(name, (0, _functional.inverseBooleanString)(value), el);
});

/**
 * The appendChild() method adds a node to the end of the list of children of a specified parent node.
 *
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 *
 * @function
 * @return {HTMLElement}
 */
var appendChild = exports.appendChild = (0, _functional.curry)(function (parent, child) {
  return parent.appendChild(child);
});

/**
 * Returns the first element that is a descendant of the element on which it is invoked
 * that matches the specified group of selectors.
 *
 * @param {string} selector
 * @param {HTMLElement} el
 *
 * @function
 * @return {HTMLElement}
 */
var querySelector = exports.querySelector = (0, _functional.curry)(function (selector, el) {
  return el.querySelector(selector);
});

/**
 * Returns a non-live NodeList of all elements descended from the element on which it
 * is invoked that matches the specified group of CSS selectors.
 *
 * @param {string} selector
 * @param {HTMLElement} el
 *
 * @function
 * @return {NodeList}
 */
var querySelectorAll = exports.querySelectorAll = (0, _functional.curry)(function (selector, el) {
  return el.querySelectorAll(selector);
});

/**
 * Removes
 *
 * @param {HTMLElement} el
 *
 * @return {HTMLElement}
 */
var removeAllChildren = exports.removeAllChildren = function removeAllChildren(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }return el;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {object} ContentType
 * @property {string} machineName
 * @property {string} majorVersion
 * @property {string} minorVersion
 * @property {string} patchVersion
 * @property {string} h5pMajorVersion
 * @property {string} h5pMinorVersion
 * @property {string} summary
 * @property {string} description
 * @property {string} icon
 * @property {string} createdAt
 * @property {string} updated_At
 * @property {string} isRecommended
 * @property {string} popularity
 * @property {object[]} screenshots
 * @property {string} license
 * @property {string} example
 * @property {string} tutorial
 * @property {string[]} keywords
 * @property {string} owner
 * @property {boolean} installed
 * @property {boolean} restricted
 */
var HubServices = function () {
  /**
   * @param {string} apiRootUrl
   */
  function HubServices(_ref) {
    var apiRootUrl = _ref.apiRootUrl;

    _classCallCheck(this, HubServices);

    this.apiRootUrl = apiRootUrl;

    if (!window.cachedContentTypes) {
      // TODO remove this when done testing for errors
      // window.cachedContentTypes = fetch(`${this.apiRootUrl}errors/NO_RESPONSE.json`, {

      window.cachedContentTypes = fetch(this.apiRootUrl + 'content-type-cache', {
        method: 'GET',
        credentials: 'include'
      }).then(function (result) {
        return result.json();
      }).then(this.isValid).then(function (json) {
        return json.libraries;
      });
    }
  }

  /**
   *
   * @param  {ContentType[]|ErrorMessage} response
   * @return {Promise<ContentType[]|ErrorMessage>}
   */


  _createClass(HubServices, [{
    key: 'isValid',
    value: function isValid(response) {
      if (response.messageCode) {
        return Promise.reject(response);
      } else {
        return Promise.resolve(response);
      }
    }

    /**
     * Returns a list of content types
     *
     * @return {Promise.<ContentType[]>}
     */

  }, {
    key: 'contentTypes',
    value: function contentTypes() {
      return window.cachedContentTypes;
    }

    /**
     * Returns a Content Type
     *
     * @param {string} machineName
     *
     * @return {Promise.<ContentType>}
     */

  }, {
    key: 'contentType',
    value: function contentType(machineName) {
      return window.cachedContentTypes.then(function (contentTypes) {
        return contentTypes.filter(function (contentType) {
          return contentType.machineName === machineName;
        })[0];
      });

      /*return fetch(`${this.apiRootUrl}content_type_cache/${id}`, {
        method: 'GET',
        credentials: 'include'
      }).then(result => result.json());*/
    }

    /**
     * Installs a content type on the server
     *
     * @param {string} id
     *
     * @return {Promise.<ContentType>}
     */

  }, {
    key: 'installContentType',
    value: function installContentType(id) {
      return fetch(ns.getAjaxUrl('library-install', { id: id }), {
        method: 'POST',
        credentials: 'include',
        body: ''
      }).then(function (result) {
        return result.json();
      });
    }

    /**
     * Uploads a content type to the server for validation
     *
     * @param {FormData} formData Form containing the h5p that should be uploaded as 'h5p'
     *
     * @return {Promise} Returns the promise of a json containing the content json and the h5p json
     */

  }, {
    key: 'uploadContent',
    value: function uploadContent(formData) {
      return fetch(this.apiRootUrl + 'library-upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      }).then(function (result) {
        return result.json();
      });
    }
  }]);

  return HubServices;
}();

exports.default = HubServices;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderErrorMessage;
/**
 * @param  {string}   config.type         type of the message: info, success, error
 * @param  {boolean}  config.dismissible  whether the message can be dismissed
 * @param  {string}   config.content      message content usually a 'h3' and a 'p'
 * @return {HTMLElement} div containing the message element
 */

//TODO handle strings, html, badly formed object
function renderErrorMessage(message) {
  // console.log(message);
  var closeButton = document.createElement('div');
  closeButton.className = 'close';
  closeButton.innerHTML = '&#x2715';

  var messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.innerHTML = '<h1>' + message.title + '</h1>' + '<p>' + message.content + '</p>';

  var messageWrapper = document.createElement('div');
  messageWrapper.className = 'message' + ' ' + ('' + message.type) + (message.dismissible ? ' dismissible' : '');
  messageWrapper.appendChild(closeButton);
  messageWrapper.appendChild(messageContent);

  if (message.button !== undefined) {
    var messageButton = document.createElement('button');
    messageButton.className = 'button';
    messageButton.innerHTML = message.button;
    messageWrapper.appendChild(messageButton);
  }

  console.log(messageWrapper);
  return messageWrapper;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relayClickEventAs = undefined;

var _functional = __webpack_require__(1);

/**
 *  Transforms a DOM click event into an Eventful's event
 *  @see Eventful
 *
 * @param  {string | Object} type
 * @param  {Eventful} eventful
 * @param  {HTMLElement} element
 * @return {HTMLElement}
 */
var relayClickEventAs = exports.relayClickEventAs = (0, _functional.curry)(function (type, eventful, element) {
  element.addEventListener('click', function (event) {
    eventful.fire(type, {
      element: element,
      id: element.getAttribute('data-id')
    }, false);

    // don't bubble
    event.stopPropagation();
  });

  return element;
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

/**
 * @type {function}
 */
var isExpanded = (0, _elements.attributeEquals)("aria-expanded", 'true');

/**
 * @type {function}
 */
var hide = (0, _elements.setAttribute)('aria-hidden', 'true');

/**
 * @type {function}
 */
var show = (0, _elements.setAttribute)('aria-hidden', 'false');

/**
 * Toggles the body visibility
 *
 * @param {HTMLElement} bodyElement
 * @param {boolean} isExpanded
 */
var toggleBodyVisibility = function toggleBodyVisibility(bodyElement, isExpanded) {
  if (!isExpanded) {
    hide(bodyElement);
    //bodyElement.style.height = "0";
  } else /*if(bodyElement.scrollHeight > 0)*/{
      show(bodyElement);
      //bodyElement.style.height = `${bodyElement.scrollHeight}px`;
    }
};

/**
 * Handles changes to aria-expanded
 *
 * @param {HTMLElement} bodyElement
 * @param {MutationRecord} event
 *
 * @function
 */
var onAriaExpandedChange = (0, _functional.curry)(function (bodyElement, event) {
  toggleBodyVisibility(bodyElement, isExpanded(event.target));
});

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
function init(element) {
  var titleEl = element.querySelector('[aria-expanded]');
  var bodyId = titleEl.getAttribute('aria-controls');
  var bodyEl = element.querySelector('#' + bodyId);

  if (titleEl) {
    // set observer on title for aria-expanded
    var observer = new MutationObserver((0, _functional.forEach)(onAriaExpandedChange(bodyEl)));

    observer.observe(titleEl, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["aria-expanded"]
    });

    // Set click listener that toggles aria-expanded
    titleEl.addEventListener('click', function (event) {
      (0, _elements.toggleAttribute)("aria-expanded", event.target);
    });

    toggleBodyVisibility(bodyEl, isExpanded(titleEl));
  }

  return element;
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjI1Ij4NCiAgPGRlZnM+DQogICAgPHN0eWxlPg0KICAgICAgLmNscy0xIHsNCiAgICAgIGZpbGw6IG5vbmU7DQogICAgICB9DQoNCiAgICAgIC5jbHMtMiB7DQogICAgICBmaWxsOiAjYzZjNmM3Ow0KICAgICAgfQ0KDQogICAgICAuY2xzLTMsIC5jbHMtNCB7DQogICAgICBmaWxsOiAjZmZmOw0KICAgICAgfQ0KDQogICAgICAuY2xzLTMgew0KICAgICAgb3BhY2l0eTogMC43Ow0KICAgICAgfQ0KICAgIDwvc3R5bGU+DQogIDwvZGVmcz4NCiAgPHRpdGxlPmNvbnRlbnQgdHlwZSBwbGFjZWhvbGRlcl8yPC90aXRsZT4NCiAgPGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+DQogICAgPGcgaWQ9ImNvbnRlbnRfdHlwZV9wbGFjZWhvbGRlci0xX2NvcHkiIGRhdGEtbmFtZT0iY29udGVudCB0eXBlIHBsYWNlaG9sZGVyLTEgY29weSI+DQogICAgICA8cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1Ii8+DQogICAgICA8cmVjdCBjbGFzcz0iY2xzLTIiIHg9IjExMi41MSIgeT0iNDMuNDEiIHdpZHRoPSIxNzYuOTYiIGhlaWdodD0iMTM1LjQ1IiByeD0iMTAiIHJ5PSIxMCIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxMzYuNjYiIGN5PSI2MS45OCIgcj0iNC44MSIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxNTEuNDkiIGN5PSI2MS45OCIgcj0iNC44MSIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxNjYuMSIgY3k9IjYxLjk4IiByPSI0LjgxIi8+DQogICAgICA8ZyBpZD0iX0dyb3VwXyIgZGF0YS1uYW1lPSImbHQ7R3JvdXAmZ3Q7Ij4NCiAgICAgICAgPGcgaWQ9Il9Hcm91cF8yIiBkYXRhLW5hbWU9IiZsdDtHcm91cCZndDsiPg0KICAgICAgICAgIDxwYXRoIGlkPSJfQ29tcG91bmRfUGF0aF8iIGRhdGEtbmFtZT0iJmx0O0NvbXBvdW5kIFBhdGgmZ3Q7IiBjbGFzcz0iY2xzLTQiIGQ9Ik0yNjMuMjgsOTUuMjFDMjYwLDkyLjA3LDI1NSw5MS41LDI0OC40Myw5MS41SDIyN3Y4SDE5OS41bC0yLjE3LDEwLjI0YTI1Ljg0LDI1Ljg0LDAsMCwxLDExLjQ4LTEuNjMsMTkuOTMsMTkuOTMsMCwwLDEsMTQuMzksNS41NywxOC4yNiwxOC4yNiwwLDAsMSw1LjUyLDEzLjYsMjMuMTEsMjMuMTEsMCwwLDEtMi44NCwxMS4wNSwxOC42NSwxOC42NSwwLDAsMS04LjA2LDcuNzksOSw5LDAsMCwxLTQuMTIsMS4zN0gyMzZ2LTIxaDEwLjQyYzcuMzYsMCwxMi44My0xLjYxLDE2LjQyLTVzNS4zOC03LjQ4LDUuMzgtMTMuNDRDMjY4LjIyLDEwMi4yOSwyNjYuNTcsOTguMzUsMjYzLjI4LDk1LjIxWm0tMTUsMTdjLTEuNDIsMS4yMi0zLjksMS4yNS03LjQxLDEuMjVIMjM2di0xNGg1LjYyYTkuNTcsOS41NywwLDAsMSw3LDIuOTMsNy4wNSw3LjA1LDAsMCwxLDEuODUsNC45MkE2LjMzLDYuMzMsMCwwLDEsMjQ4LjMxLDExMi4yNVoiLz4NCiAgICAgICAgICA8cGF0aCBpZD0iX1BhdGhfIiBkYXRhLW5hbWU9IiZsdDtQYXRoJmd0OyIgY2xhc3M9ImNscy00IiBkPSJNMjAyLjksMTE5LjExYTguMTIsOC4xMiwwLDAsMC03LjI4LDQuNTJsLTE2LTEuMjIsNy4yMi0zMC45MkgxNzR2MjJIMTUzdi0yMkgxMzZ2NTZoMTd2LTIxaDIxdjIxaDIwLjMxYy0yLjcyLDAtNS0xLjUzLTctM2ExOS4xOSwxOS4xOSwwLDAsMS00LjczLTQuODMsMjMuNTgsMjMuNTgsMCwwLDEtMy02LjZsMTYtMi4yNmE4LjExLDguMTEsMCwxLDAsNy4yNi0xMS43MloiLz4NCiAgICAgICAgPC9nPg0KICAgICAgPC9nPg0KICAgICAgPHJlY3QgY2xhc3M9ImNscy0zIiB4PSIxNzcuNjYiIHk9IjU3LjY2IiB3aWR0aD0iOTIuMjgiIGhlaWdodD0iOS4zOCIgcng9IjMuNSIgcnk9IjMuNSIvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hubView = __webpack_require__(16);

var _hubView2 = _interopRequireDefault(_hubView);

var _contentTypeSection = __webpack_require__(15);

var _contentTypeSection2 = _interopRequireDefault(_contentTypeSection);

var _uploadSection = __webpack_require__(18);

var _uploadSection2 = _interopRequireDefault(_uploadSection);

var _hubServices = __webpack_require__(3);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _eventful = __webpack_require__(0);

var _errors = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {object} HubState
 * @property {string} title
 * @property {string} sectionId
 * @property {boolean} expanded
 * @property {string} apiRootUrl
 */
/**
 * @typedef {object} ErrorMessage
 * @property {string} message
 * @property {string} errorCode
 */
/**
 * @typedef {object} SelectedElement
 * @property {HTMLElement} element
 * @property {string} id
 */
/**
 * Select event
 * @event Hub#select
 * @type {SelectedElement}
 */
/**
 * Error event
 * @event Hub#error
 * @type {ErrorMessage}
 */
/**
 * Upload event
 * @event Hub#upload
 * @type {Object}
 */
/**
 * @class
 * @mixes Eventful
 * @fires Hub#select
 * @fires Hub#error
 * @fires Hub#upload
 */
var Hub = function () {
  /**
   * @param {HubState} state
   */
  function Hub(state) {
    _classCallCheck(this, Hub);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // controllers
    this.contentTypeSection = new _contentTypeSection2.default(state);
    this.uploadSection = new _uploadSection2.default(state);

    // views
    this.view = new _hubView2.default(state);

    // services
    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

    // propagate controller events
    this.propagate(['select', 'error'], this.contentTypeSection);
    this.propagate(['upload'], this.uploadSection);

    // handle events
    this.on('select', this.setPanelTitle, this);
    this.on('select', this.view.closePanel, this.view);
    this.view.on('tab-change', this.view.setSectionType, this.view);
    this.view.on('panel-change', this.view.togglePanelOpen.bind(this.view), this.view);

    this.initTabPanel(state);
  }

  /**
   * Returns the promise of a content type
   * @param {string} machineName
   * @return {Promise.<ContentType>}
   */


  _createClass(Hub, [{
    key: 'getContentType',
    value: function getContentType(machineName) {
      return this.services.contentType(machineName);
    }

    /**
     * Sets the title of the panel
     *
     * @param {string} id
     */

  }, {
    key: 'setPanelTitle',
    value: function setPanelTitle(_ref) {
      var _this = this;

      var id = _ref.id;

      this.getContentType(id).then(function (_ref2) {
        var title = _ref2.title;
        return _this.view.setTitle(title);
      });
    }

    /**
     * Initiates the tab panel
     *
     * @param {string} sectionId
     */

  }, {
    key: 'initTabPanel',
    value: function initTabPanel(_ref3) {
      var _this2 = this;

      var _ref3$sectionId = _ref3.sectionId,
          sectionId = _ref3$sectionId === undefined ? 'content-types' : _ref3$sectionId;

      var tabConfigs = [{
        title: 'Create Content',
        id: 'content-types',
        content: this.contentTypeSection.getElement()
      }, {
        title: 'Upload',
        id: 'upload',
        content: this.uploadSection.getElement()
      }];

      // sets the correct one selected
      tabConfigs.filter(function (config) {
        return config.id === sectionId;
      }).forEach(function (config) {
        return config.selected = true;
      });

      tabConfigs.forEach(function (tabConfig) {
        return _this2.view.addTab(tabConfig);
      });
      this.view.addBottomBorder(); // Adds an animated bottom border to each tab
      this.view.initTabPanel();
    }

    /**
     * Returns the root element in the view
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'getElement',
    value: function getElement() {
      return this.view.getElement();
    }
  }]);

  return Hub;
}();

exports.default = Hub;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

var _eventful = __webpack_require__(0);

var _panel = __webpack_require__(6);

var _panel2 = _interopRequireDefault(_panel);

var _imageScroller = __webpack_require__(19);

var _imageScroller2 = _interopRequireDefault(_imageScroller);

var _events = __webpack_require__(5);

var _contentTypePlaceholder = __webpack_require__(7);

var _contentTypePlaceholder2 = _interopRequireDefault(_contentTypePlaceholder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @constant {string}
 */
var ATTRIBUTE_CONTENT_TYPE_ID = 'data-id';

/**
 * @function
 */
var _hide = (0, _elements.setAttribute)('aria-hidden', 'true');

/**
 * @function
 */
var _show = (0, _elements.setAttribute)('aria-hidden', 'false');

/**
 * Toggles the visibility if an element
 *
 * @param {HTMLElement} element
 * @param {boolean} visible
 */
var toggleVisibility = function toggleVisibility(element, visible) {
  return (visible ? _show : _hide)(element);
};

/**
 * Checks if a string is empty
 *
 * @param {string} text
 *
 * @return {boolean}
 */
var isEmpty = function isEmpty(text) {
  return typeof text === 'string' && text.length === 0;
};

/**
 * @class
 * @mixes Eventful
 */

var ContentTypeDetailView = function () {
  function ContentTypeDetailView(state) {
    _classCallCheck(this, ContentTypeDetailView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // back button
    var backButtonElement = document.createElement('div');
    backButtonElement.className = 'back-button icon-arrow-thick';
    (0, _events.relayClickEventAs)('close', this, backButtonElement);

    // image
    this.image = document.createElement('img');
    this.image.className = 'img-responsive';

    var imageWrapperElement = document.createElement('div');
    imageWrapperElement.className = 'image-wrapper';
    imageWrapperElement.appendChild(this.image);

    // title
    this.title = document.createElement('h3');

    // author
    this.author = document.createElement('div');
    this.author.className = 'author';
    this.author.innerHTML = 'by Joubel'; // TODO Make dynamic

    // description
    this.description = document.createElement('p');
    this.description.className = 'small';

    // demo button
    this.demoButton = document.createElement('a');
    this.demoButton.className = 'button';
    this.demoButton.innerHTML = 'Content Demo';
    this.demoButton.setAttribute('target', '_blank');
    _hide(this.demoButton);

    var textDetails = document.createElement('div');
    textDetails.className = 'text-details';
    textDetails.appendChild(this.title);
    textDetails.appendChild(this.author);
    textDetails.appendChild(this.description);
    textDetails.appendChild(this.demoButton);

    var detailsElement = document.createElement('div');
    detailsElement.className = 'container';
    detailsElement.appendChild(imageWrapperElement);
    detailsElement.appendChild(textDetails);

    // use button
    this.useButton = document.createElement('span');
    this.useButton.className = 'button button-primary';
    this.useButton.innerHTML = 'Use';
    _hide(this.useButton);
    (0, _events.relayClickEventAs)('select', this, this.useButton);

    // install button
    this.installButton = document.createElement('span');
    this.installButton.className = 'button button-inverse-primary';
    this.installButton.innerHTML = 'Install';
    _hide(this.installButton);
    (0, _events.relayClickEventAs)('install', this, this.installButton);

    var buttonBar = document.createElement('div');
    buttonBar.className = 'button-bar';
    buttonBar.appendChild(this.useButton);
    buttonBar.appendChild(this.installButton);

    // licence panel
    var licencePanel = this.createPanel('The Licence Info', 'ipsum lorum', 'licence-panel');
    var pluginsPanel = this.createPanel('Available plugins', 'ipsum lorum', 'plugins-panel');
    var publisherPanel = this.createPanel('Publisher Info', 'ipsum lorum', 'publisher-panel');

    // panel group
    var panelGroupElement = document.createElement('div');
    panelGroupElement.className = 'panel-group';
    panelGroupElement.appendChild(licencePanel);
    panelGroupElement.appendChild(pluginsPanel);
    panelGroupElement.appendChild(publisherPanel);

    // images
    this.carousel = document.createElement('div');
    this.carousel.setAttribute('role', 'region');
    this.carousel.setAttribute('data-size', '5');
    this.carousel.innerHTML = "<div class=\"carousel\" role=\"region\" data-size=\"5\">\n    <span class=\"carousel-button previous\" aria-hidden=\"true\">&larr;</span>\n    <span class=\"carousel-button next\" aria-hidden=\"true\">&rarr;</span>\n    <nav class=\"scroller\"><ul></ul></nav>";

    (0, _imageScroller2.default)(this.carousel);

    this.thumbnailList = this.carousel.querySelector('ul');

    // add root element
    this.rootElement = document.createElement('div');
    this.rootElement.className = 'content-type-detail';
    this.rootElement.setAttribute('aria-hidden', 'true');
    this.rootElement.appendChild(backButtonElement);
    this.rootElement.appendChild(detailsElement);
    this.rootElement.appendChild(buttonBar);
    this.rootElement.appendChild(this.carousel);
    this.rootElement.appendChild(panelGroupElement);
  }

  /**
   * Creates a panel
   *
   * @param {string} title
   * @param {string} body
   * @param {string} bodyId
   *
   * @return {HTMLElement}
   */


  _createClass(ContentTypeDetailView, [{
    key: "createPanel",
    value: function createPanel(title, body, bodyId) {
      var headerEl = document.createElement('div');
      headerEl.className = 'panel-header';
      headerEl.setAttribute('aria-expanded', 'false');
      headerEl.setAttribute('aria-controls', bodyId);
      headerEl.innerHTML = title;

      var bodyInnerEl = document.createElement('div');
      bodyInnerEl.className = 'panel-body-inner';
      bodyInnerEl.innerHTML = body;

      var bodyEl = document.createElement('div');
      bodyEl.className = 'panel-body';
      bodyEl.id = bodyId;
      bodyEl.setAttribute('aria-hidden', 'true');
      bodyEl.appendChild(bodyInnerEl);

      var panelEl = document.createElement('div');
      panelEl.className = 'panel';
      panelEl.appendChild(headerEl);
      panelEl.appendChild(bodyEl);

      (0, _panel2.default)(panelEl);

      return panelEl;
    }

    /**
     * Removes all images from the carousel
     */

  }, {
    key: "removeAllImagesInCarousel",
    value: function removeAllImagesInCarousel() {
      this.thumbnailList.querySelectorAll('li').forEach((0, _elements.removeChild)(this.thumbnailList));
      this.carousel.querySelectorAll('.carousel-lightbox').forEach((0, _elements.removeChild)(this.carousel));
    }

    /**
     * Add image to the carousel
     *
     * @param {object} image
     */

  }, {
    key: "addImageToCarousel",
    value: function addImageToCarousel(image) {
      // add lightbox
      var lightbox = document.createElement('div');
      lightbox.id = "lightbox-" + this.thumbnailList.childElementCount;
      lightbox.className = 'carousel-lightbox';
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.innerHTML = "<img class=\"img-responsive\" src=\"" + image.url + "\" alt=\"" + image.alt + "\">";
      this.carousel.appendChild(lightbox);

      // add thumbnail
      var thumbnail = document.createElement('li');
      thumbnail.className = 'slide';
      thumbnail.innerHTML = "<img src=\"" + image.url + "\" alt=\"" + image.alt + "\" class=\"img-responsive\" aria-controls=\"" + lightbox.id + "\" />";
      this.thumbnailList.appendChild(thumbnail);
    }

    /**
     * Sets the image
     *
     * @param {string} src
     */

  }, {
    key: "setImage",
    value: function setImage(src) {
      this.image.setAttribute('src', src || _contentTypePlaceholder2.default);
    }

    /**
     * Sets the title
     *
     * @param {string} id
     */

  }, {
    key: "setId",
    value: function setId(id) {
      this.installButton.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, id);
      this.useButton.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, id);
    }

    /**
     * Sets the title
     *
     * @param {string} title
     */

  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.title.innerHTML = title;
    }

    /**
     * Sets the long description
     *
     * @param {string} text
     */

  }, {
    key: "setDescription",
    value: function setDescription(text) {
      this.description.innerHTML = text;
    }

    /**
     * Sets the example url
     *
     * @param {string} url
     */

  }, {
    key: "setExample",
    value: function setExample(url) {
      this.demoButton.setAttribute('href', url || '#');
      toggleVisibility(this.demoButton, !isEmpty(url));
    }

    /**
     * Sets if the content type is installed
     *
     * @param {boolean} installed
     */

  }, {
    key: "setIsInstalled",
    value: function setIsInstalled(installed) {
      toggleVisibility(this.useButton, installed);
      toggleVisibility(this.installButton, !installed);
    }

    /**
     * Hides the root element
     */

  }, {
    key: "hide",
    value: function hide() {
      _hide(this.rootElement);
    }

    /**
     * Shows the root element
     */

  }, {
    key: "show",
    value: function show() {
      _show(this.rootElement);
    }

    /**
     * Returns the root html element
     * @return {HTMLElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.rootElement;
    }
  }]);

  return ContentTypeDetailView;
}();

exports.default = ContentTypeDetailView;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeDetailView = __webpack_require__(10);

var _contentTypeDetailView2 = _interopRequireDefault(_contentTypeDetailView);

var _hubServices = __webpack_require__(3);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _eventful = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @mixes Eventful
 */
var ContentTypeDetail = function () {
  function ContentTypeDetail(state) {
    _classCallCheck(this, ContentTypeDetail);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // services
    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

    // views
    this.view = new _contentTypeDetailView2.default(state);
    this.view.on('install', this.install, this);

    // propagate events
    this.propagate(['close', 'select'], this.view);
  }

  /**
   * Hides the detail view
   */


  _createClass(ContentTypeDetail, [{
    key: "hide",
    value: function hide() {
      this.view.hide();
    }

    /**
     * Shows the detail view
     */

  }, {
    key: "show",
    value: function show() {
      this.view.show();
    }

    /**
     * Loads a Content Type description
     *
     * @param {string} id
     *
     * @return {Promise.<ContentType>}
     */

  }, {
    key: "loadById",
    value: function loadById(id) {
      this.services.contentType(id).then(this.update.bind(this));
    }

    /**
     * Loads a Content Type description
     *
     * @param {string} id
     *
     * @return {Promise.<ContentType>}
     */

  }, {
    key: "install",
    value: function install(_ref) {
      var _this = this;

      var id = _ref.id;

      return this.services.contentType(id).then(function (contentType) {
        return contentType.machineName;
      }).then(function (machineName) {
        return _this.services.installContentType(machineName);
      }).then(function (contentType) {
        return console.debug('TODO, gui updates');
      });
    }

    /**
     * Updates the view with the content type data
     *
     * @param {ContentType} contentType
     */

  }, {
    key: "update",
    value: function update(contentType) {
      this.view.setId(contentType.machineName);
      this.view.setTitle(contentType.title);
      this.view.setDescription(contentType.description);
      this.view.setImage(contentType.icon);
      this.view.setExample(contentType.example);
      this.view.setIsInstalled(!!contentType.installed);

      // update carousel
      this.view.removeAllImagesInCarousel();
      contentType.screenshots.forEach(this.view.addImageToCarousel, this.view);
    }

    /**
     * Returns the root html element
     *
     * @return {HTMLElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.view.getElement();
    }
  }]);

  return ContentTypeDetail;
}();

exports.default = ContentTypeDetail;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functional = __webpack_require__(1);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(0);

var _events = __webpack_require__(5);

var _contentTypePlaceholder = __webpack_require__(7);

var _contentTypePlaceholder2 = _interopRequireDefault(_contentTypePlaceholder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @function
 */
var _hide = (0, _elements.setAttribute)('aria-hidden', 'true');

/**
 * @function
 */
var _show = (0, _elements.setAttribute)('aria-hidden', 'false');

/**
 * @class
 * @mixes Eventful
 * @fires Hub#select
 * @fires ContentTypeList#row-selected
 */

var ContentTypeListView = function () {
  function ContentTypeListView(state) {
    _classCallCheck(this, ContentTypeListView);

    this.state = state;

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // create root element
    this.rootElement = document.createElement('ul');
    this.rootElement.className = 'content-type-list';
  }

  /**
   * Hides the root element
   */


  _createClass(ContentTypeListView, [{
    key: "hide",
    value: function hide() {
      _hide(this.rootElement);
    }

    /**
     * Shows the root element
     */

  }, {
    key: "show",
    value: function show() {
      _show(this.rootElement);
    }

    /**
     * Removes all rows from root element
     */

  }, {
    key: "removeAllRows",
    value: function removeAllRows() {
      while (this.rootElement.hasChildNodes()) {
        this.rootElement.removeChild(this.rootElement.lastChild);
      }
    }

    /**
     * Adds a row
     *
     * @param {ContentType} contentType
     */

  }, {
    key: "addRow",
    value: function addRow(contentType) {
      var row = this.createContentTypeRow(contentType, this);
      (0, _events.relayClickEventAs)('row-selected', this, row);
      this.rootElement.appendChild(row);
    }

    /**
     * Takes a Content Type configuration and creates a row dom
     *
     * @param {ContentType} contentType
     * @param {Eventful} scope
     *
     * @return {HTMLElement}
     */

  }, {
    key: "createContentTypeRow",
    value: function createContentTypeRow(contentType, scope) {
      // row item
      var element = document.createElement('li');
      element.id = "content-type-" + contentType.machineName;
      element.setAttribute('data-id', contentType.machineName);

      // create button config
      var useButtonConfig = { text: 'Use', cls: 'button-primary' };
      var installButtonConfig = { text: 'install', cls: 'button-inverse-primary' };
      var button = contentType.installed ? useButtonConfig : installButtonConfig;

      var title = contentType.title || contentType.machineName;
      var description = contentType.summary || '';

      var image = contentType.icon || _contentTypePlaceholder2.default;

      // create html
      element.innerHTML = "\n      <img class=\"img-responsive\" src=\"" + image + "\">\n      <span class=\"button " + button.cls + "\" data-id=\"" + contentType.machineName + "\" tabindex=\"0\">" + button.text + "</span>\n      <h4>" + title + "</h4>\n      <div class=\"description\">" + description + "</div>\n   ";

      // handle use button
      var useButton = element.querySelector('.button-primary');
      if (useButton) {
        (0, _events.relayClickEventAs)('select', scope, useButton);
      }

      return element;
    }

    /**
     * Returns the root element
     *
     * @return {HTMLElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.rootElement;
    }
  }]);

  return ContentTypeListView;
}();

exports.default = ContentTypeListView;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeListView = __webpack_require__(12);

var _contentTypeListView2 = _interopRequireDefault(_contentTypeListView);

var _eventful = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Row selected event
 * @event ContentTypeList#row-selected
 * @type {SelectedElement}
 */
/**
 * Update content type list event
 * @event ContentTypeList#update-content-type-list
 * @type {SelectedElement}
 */
/**
 * @class
 * @mixes Eventful
 * @fires Hub#select
 * @fires ContentTypeList#row-selected
 * @fires ContentTypeList#update-content-type-list
 */
var ContentTypeList = function () {
  function ContentTypeList(state) {
    _classCallCheck(this, ContentTypeList);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // add the view
    this.view = new _contentTypeListView2.default(state);
    this.propagate(['row-selected', 'select'], this.view);
  }

  /**
   * Hide this element
   */


  _createClass(ContentTypeList, [{
    key: 'hide',
    value: function hide() {
      this.view.hide();
    }

    /**
     * Show this element
     */

  }, {
    key: 'show',
    value: function show() {
      this.view.show();
    }

    /**
     * Update the list with new content types
     *
     * @param {ContentType[]} contentTypes
     */

  }, {
    key: 'update',
    value: function update(contentTypes) {
      this.view.removeAllRows();
      contentTypes.forEach(this.view.addRow, this.view);
      this.fire('update-content-type-list', {});
    }

    /**
     * Returns the views root element
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'getElement',
    value: function getElement() {
      return this.view.getElement();
    }
  }]);

  return ContentTypeList;
}();

exports.default = ContentTypeList;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventful = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ContentBrowserView
 * @mixes Eventful
 */
var ContentBrowserView = function () {
  /**
   * @constructor
   * @param {object} state
   */
  function ContentBrowserView(state) {
    _classCallCheck(this, ContentBrowserView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // create elements
    var menu = this.createMenuElement();
    var inputGroup = this.createInputGroupElement();

    // menu group
    var menuGroup = document.createElement('div');
    menuGroup.className = 'menu-group';
    menuGroup.appendChild(menu);
    menuGroup.appendChild(inputGroup);

    // root element
    this.rootElement = document.createElement('div');
    this.rootElement.appendChild(menuGroup);
  }

  /**
   * Adds a menu item
   *
   * @param {string} text
   *
   * @return {HTMLElement}
   */


  _createClass(ContentBrowserView, [{
    key: 'addMenuItem',
    value: function addMenuItem(text) {
      var _this = this;

      var element = document.createElement('li');
      element.setAttribute('role', 'menuitem');
      element.innerHTML = text;

      element.addEventListener('click', function (event) {
        _this.fire('menu-selected', {
          element: event.target
        });
      });

      // sets first to be selected
      if (this.menuBarElement.childElementCount < 1) {
        element.setAttribute('aria-selected', 'true');
      }

      // add to menu bar
      this.menuBarElement.appendChild(element);

      return element;
    }

    /**
     * Creates the menu bar element
     *
     * @return {Element}
     */

  }, {
    key: 'createMenuElement',
    value: function createMenuElement() {
      this.menuBarElement = document.createElement('ul');
      this.menuBarElement.setAttribute('role', 'menubar');
      this.menuBarElement.className = 'h5p-menu';

      var navElement = document.createElement('nav');
      navElement.appendChild(this.menuBarElement);

      var title = document.createElement('div');
      title.className = "menu-title";
      title.innerHTML = "Browse content types";

      var menu = document.createElement('div');
      menu.className = "menu";
      menu.appendChild(title);
      menu.appendChild(navElement);

      return menu;
    }

    /**
     * Creates the input group used for search
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'createInputGroupElement',
    value: function createInputGroupElement() {
      var _this2 = this;

      // input field
      var inputField = document.createElement('input');
      inputField.id = "hub-search-bar";
      inputField.className = 'form-control form-control-rounded';
      inputField.setAttribute('type', 'text');
      inputField.setAttribute('placeholder', "Search for Content Types");
      inputField.addEventListener('keyup', function (event) {
        _this2.fire('search', {
          element: event.target,
          query: event.target.value
        });
      });

      // input button
      var inputButton = document.createElement('div');
      inputButton.className = 'input-group-addon icon-search';
      inputButton.onclick = function () {
        this.parentElement.querySelector('#search-bar').focus();
      };

      // input group
      var inputGroup = document.createElement('div');
      inputGroup.className = 'input-group';
      inputGroup.appendChild(inputField);
      inputGroup.appendChild(inputButton);

      return inputGroup;
    }

    /**
     * Returns the root element of the content browser
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'getElement',
    value: function getElement() {
      return this.rootElement;
    }
  }]);

  return ContentBrowserView;
}();

exports.default = ContentBrowserView;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeSectionView = __webpack_require__(14);

var _contentTypeSectionView2 = _interopRequireDefault(_contentTypeSectionView);

var _searchService = __webpack_require__(17);

var _searchService2 = _interopRequireDefault(_searchService);

var _contentTypeList = __webpack_require__(13);

var _contentTypeList2 = _interopRequireDefault(_contentTypeList);

var _contentTypeDetail = __webpack_require__(11);

var _contentTypeDetail2 = _interopRequireDefault(_contentTypeDetail);

var _eventful = __webpack_require__(0);

var _errors = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ContentTypeSection
 * @mixes Eventful
 *
 * @fires Hub#select
 */
var ContentTypeSection = function () {
  /**
   * @param {HubState} state
   */
  function ContentTypeSection(state) {
    var _this = this;

    _classCallCheck(this, ContentTypeSection);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // add view
    this.view = new _contentTypeSectionView2.default(state);

    // controller
    this.searchService = new _searchService2.default({ apiRootUrl: state.apiRootUrl });
    this.contentTypeList = new _contentTypeList2.default();
    this.contentTypeDetail = new _contentTypeDetail2.default({ apiRootUrl: state.apiRootUrl });

    // add menu items
    ['My Content Types', 'Newest', 'Most Popular', 'Recommended'].forEach(function (menuText) {
      return _this.view.addMenuItem(menuText);
    });

    // Element for holding list and details views
    var section = document.createElement('div');
    section.classList.add('content-type-section');

    this.rootElement = section;
    this.rootElement.appendChild(this.contentTypeList.getElement());
    this.rootElement.appendChild(this.contentTypeDetail.getElement());

    this.view.getElement().appendChild(this.rootElement);

    // propagate events
    this.propagate(['select', 'update-content-type-list'], this.contentTypeList);
    this.propagate(['select'], this.contentTypeDetail);

    // register listeners
    this.view.on('search', this.search, this);
    this.view.on('menu-selected', this.applySearchFilter, this);
    this.contentTypeList.on('row-selected', this.showDetailView, this);
    this.contentTypeDetail.on('close', this.closeDetailView, this);
    this.contentTypeDetail.on('select', this.closeDetailView, this);

    this.initContentTypeList();
  }

  /**
   * Initiates the content type list with a search
   */


  _createClass(ContentTypeSection, [{
    key: "initContentTypeList",
    value: function initContentTypeList() {
      var _this2 = this;

      // initialize by search
      this.searchService.search("").then(function (contentTypes) {
        return _this2.contentTypeList.update(contentTypes);
      }).catch(function (error) {
        return _this2.fire('error', error);
      });
    }

    /**
     * Executes a search and updates the content type list
     *
     * @param {string} query
     */

  }, {
    key: "search",
    value: function search(_ref) {
      var _this3 = this;

      var query = _ref.query;

      this.searchService.search(query).then(function (contentTypes) {
        return _this3.contentTypeList.update(contentTypes);
      });
    }

    /**
     * Should apply a search filter
     */

  }, {
    key: "applySearchFilter",
    value: function applySearchFilter() {
      console.debug('ContentTypeSection: menu was clicked!', event);
    }

    /**
     * Shows detail view
     *
     * @param {string} id
     */

  }, {
    key: "showDetailView",
    value: function showDetailView(_ref2) {
      var id = _ref2.id;

      this.contentTypeList.hide();
      this.contentTypeDetail.loadById(id);
      this.contentTypeDetail.show();
    }

    /**
     * Close detail view
     */

  }, {
    key: "closeDetailView",
    value: function closeDetailView() {
      this.contentTypeDetail.hide();
      this.contentTypeList.show();
    }

    /**
     * Returns the element
     *
     * @return {HTMLElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.view.getElement();
    }
  }]);

  return ContentTypeSection;
}();

exports.default = ContentTypeSection;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _panel = __webpack_require__(6);

var _panel2 = _interopRequireDefault(_panel);

var _tabPanel = __webpack_require__(20);

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _functional = __webpack_require__(1);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(0);

var _events = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Tab change event
 * @event HubView#tab-change
 * @type {SelectedElement}
 */
/**
 * Panel open or close event
 * @event HubView#panel-change
 * @type {SelectedElement}
 */
/**
 * @constant {string}
 */
var ATTRIBUTE_DATA_ID = 'data-id';

/**
 * @function
 */
var isOpen = (0, _elements.hasAttribute)('open');

/**
 * @class
 * @mixes Eventful
 * @fires HubView#tab-change
 */

var HubView = function () {
  /**
   * @param {HubState} state
   */
  function HubView(state) {
    _classCallCheck(this, HubView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    this.renderTabPanel(state);
    this.renderPanel(state);
  }

  /**
   * Closes the panel
   */


  _createClass(HubView, [{
    key: "closePanel",
    value: function closePanel() {
      this.title.setAttribute('aria-expanded', 'false');
    }

    /**
     * Sets the title
     *
     * @param {string} title
     */

  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.title.innerHTML = title;
    }

    /**
     * Creates the dom for the panel
     *
     * @param {string} title
     * @param {string} sectionId
     * @param {boolean} expanded
     */

  }, {
    key: "renderPanel",
    value: function renderPanel(_ref) {
      var _ref$title = _ref.title,
          title = _ref$title === undefined ? '' : _ref$title,
          _ref$sectionId = _ref.sectionId,
          sectionId = _ref$sectionId === undefined ? 'content-types' : _ref$sectionId,
          _ref$expanded = _ref.expanded,
          expanded = _ref$expanded === undefined ? false : _ref$expanded;

      /**
       * @type {HTMLElement}
       */
      this.title = document.createElement('div');
      this.title.className += "panel-header icon-hub-icon";
      this.title.setAttribute('aria-expanded', (!!expanded).toString());
      this.title.setAttribute('aria-controls', "panel-body-" + sectionId);
      this.title.innerHTML = title;
      (0, _events.relayClickEventAs)('panel-change', this, this.title);

      /**
       * @type {HTMLElement}
       */
      this.body = document.createElement('div');
      this.body.className += "panel-body";
      this.body.setAttribute('aria-hidden', (!expanded).toString());
      this.body.id = "panel-body-" + sectionId;
      this.body.appendChild(this.tabContainerElement);

      /**
       * @type {HTMLElement}
       */
      this.panel = document.createElement('div');
      this.panel.className += "panel h5p-section-" + sectionId;
      if (expanded) {
        this.panel.setAttribute('open', '');
      }
      this.panel.appendChild(this.title);
      this.panel.appendChild(this.body);
      /**
       * @type {HTMLElement}
       */
      this.rootElement = document.createElement('div');
      this.rootElement.className += "h5p h5p-hub";
      this.rootElement.appendChild(this.panel);
      (0, _panel2.default)(this.rootElement);
    }

    /**
     * Set if panel is open, this is used for outer border color
     */

  }, {
    key: "togglePanelOpen",
    value: function togglePanelOpen() {
      var panel = this.panel;
      if (isOpen(panel)) {
        panel.removeAttribute('open');
      } else {
        panel.setAttribute('open', '');
        setTimeout(function () {
          panel.querySelector('#hub-search-bar').focus();
        }, 20);
      }
    }

    /**
     * Creates the dom for the tab panel
     */

  }, {
    key: "renderTabPanel",
    value: function renderTabPanel(state) {
      /**
       * @type {HTMLElement}
       */
      this.tablist = document.createElement('ul');
      this.tablist.className += "tablist";
      this.tablist.setAttribute('role', 'tablist');

      /**
       * @type {HTMLElement}
       */
      this.tabListWrapper = document.createElement('nav');
      this.tabListWrapper.appendChild(this.tablist);

      /**
       * @type {HTMLElement}
       */
      this.tabContainerElement = document.createElement('div');
      this.tabContainerElement.className += 'tab-panel';
      this.tabContainerElement.appendChild(this.tabListWrapper);
    }

    /**
     * Adds a tab
     *
     * @param {string} title
     * @param {string} id
     * @param {HTMLElement} content
     * @param {boolean} selected
     */

  }, {
    key: "addTab",
    value: function addTab(_ref2) {
      var title = _ref2.title,
          id = _ref2.id,
          content = _ref2.content,
          _ref2$selected = _ref2.selected,
          selected = _ref2$selected === undefined ? false : _ref2$selected;

      var tabId = "tab-" + id;
      var tabPanelId = "tab-panel-" + id;

      var tab = document.createElement('li');
      tab.className += 'tab';
      tab.id = tabId;
      tab.setAttribute('aria-controls', tabPanelId);
      tab.setAttribute('aria-selected', selected.toString());
      tab.setAttribute(ATTRIBUTE_DATA_ID, id);
      tab.setAttribute('role', 'tab');
      tab.innerHTML = title;
      (0, _events.relayClickEventAs)('tab-change', this, tab);

      var tabPanel = document.createElement('div');
      tabPanel.id = tabPanelId;
      tabPanel.className += 'tabpanel';
      tabPanel.setAttribute('aria-lablledby', tabId);
      tabPanel.setAttribute('aria-hidden', (!selected).toString());
      tabPanel.setAttribute('role', 'tabpanel');
      tabPanel.appendChild(content);

      this.tablist.appendChild(tab);
      this.tabContainerElement.appendChild(tabPanel);
    }

    /**
     * Adds an animated border to the bottom of the tab
     */

  }, {
    key: "addBottomBorder",
    value: function addBottomBorder() {
      this.tablist.appendChild(document.createElement('span'));
    }
  }, {
    key: "initTabPanel",
    value: function initTabPanel() {
      (0, _tabPanel2.default)(this.tabContainerElement);
    }

    /**
     * Sets the section
     *
     * @param {string} id
     */

  }, {
    key: "setSectionType",
    value: function setSectionType(_ref3) {
      var id = _ref3.id;

      this.panel.className = "h5p-section-" + id + " panel";
    }

    /**
     * Returns the root html element
     *
     * @return {HTMLElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.rootElement;
    }
  }]);

  return HubView;
}();

exports.default = HubView;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functional = __webpack_require__(1);

var _hubServices = __webpack_require__(3);

var _hubServices2 = _interopRequireDefault(_hubServices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * The Search Service gets a content type from hub-services.js
 * in the form of a promise. It then generates a score based
 * on the different weightings of the content type fields and
 * sorts the results based on the generated score.
 */
var SearchService = function () {
  /**
   * @param {Object} state
   * @param {string} state.apiRootUrl
   */
  function SearchService(state) {
    _classCallCheck(this, SearchService);

    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

    // Add content types to the search index
    this.contentTypes = this.services.contentTypes();
  }

  /**
   * Performs a search
   *
   * @param {String} query
   *
   * @return {Promise<ContentType[]>} A promise of an array of content types
   */


  _createClass(SearchService, [{
    key: 'search',
    value: function search(query) {
      return this.contentTypes.then(filterByQuery(query));
    }
  }]);

  return SearchService;
}();

/**
 * Filters a list of content types based on a query
 * @type {Function}
 *
 * @param {string} query
 * @param {ContentType[]} contentTypes
 */


exports.default = SearchService;
var filterByQuery = (0, _functional.curry)(function (query, contentTypes) {
  if (query == '') {
    return contentTypes;
  }

  // Append a search score to each content type
  contentTypes = contentTypes.map(function (contentType) {
    return {
      contentType: contentType,
      score: 0
    };
  });

  // Tokenize query and sanitize
  var queries = query.split(' ').filter(function (query) {
    return query !== '';
  });

  // Loop through queries and generate a relevance score
  for (var i = 0; i < queries.length; i++) {
    if (i > 0) {
      // Search a smaller subset each time
      contentTypes = contentTypes.filter(function (result) {
        return result.score > 0;
      });
    }
    contentTypes.forEach(function (contentType) {
      return contentType.score = getSearchScore(queries[i], contentType.contentType);
    });
  }

  return contentTypes.filter(function (result) {
    return result.score > 0;
  }).sort(sortSearchResults) // Sort by installed, relevance and popularity
  .map(function (result) {
    return result.contentType;
  }); // Unwrap result object;
});

/**
 * Callback for Array.sort()
 * Compares two content types on different criteria
 *
 * @param {Object} a First content type
 * @param {Object} b Second content type
 * @return {int}
 */
var sortSearchResults = function sortSearchResults(a, b) {
  if (!a.contentType.installed && b.contentType.installed) {
    return 1;
  } else if (b.score !== a.score) {
    return b.score - a.score;
  } else {
    return b.contentType.popularity - a.contentType.popularity;
  }
};

/**
 * Calculates weighting for different search terms based
 * on existence of substrings
 *
 * @param  {string} query
 * @param  {Object} contentType
 * @return {int}
 */
var getSearchScore = function getSearchScore(query, contentType) {
  console.log(contentType);
  query = query.trim();
  var score = 0;
  if (hasSubString(query, contentType.title)) {
    score += 100;
  }
  if (hasSubString(query, contentType.summary)) {
    score += 5;
  }
  if (hasSubString(query, contentType.description)) {
    score += 5;
  }
  if (arrayHasSubString(query, contentType.keywords)) {
    score += 5;
  }
  return score;
};

/**
 * Checks if a needle is found in the haystack.
 * Not case sensitive
 *
 * @param {string} needle
 * @param {string} haystack
 * @return {boolean}
 */
var hasSubString = function hasSubString(needle, haystack) {
  if (haystack === undefined) {
    return false;
  }

  return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
};

/**
 * Helper function, checks if array has contains a substring
 *
 * @param  {String} subString
 * @param  {Array} arr
 * @return {boolean}
 */
var arrayHasSubString = function arrayHasSubString(subString, arr) {
  if (arr === undefined || subString === '') {
    return false;
  }

  return arr.some(function (string) {
    return hasSubString(subString, string);
  });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hubServices = __webpack_require__(3);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _eventful = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @mixes Eventful
 *
 * @fires Hub#upload
 */
var UploadSection = function () {
  function UploadSection(state) {
    var _this = this;

    _classCallCheck(this, UploadSection);

    var self = this;
    _extends(this, (0, _eventful.Eventful)());

    // services
    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

    // Input element for the H5P file
    var h5pUpload = document.createElement('input');
    h5pUpload.setAttribute('type', 'file');

    // Sends the H5P file to the plugin
    var useButton = document.createElement('button');
    useButton.textContent = 'Use';
    useButton.addEventListener('click', function () {

      // Add the H5P file to a form, ready for transportation
      var data = new FormData();
      data.append('h5p', h5pUpload.files[0]);

      // Upload content to the plugin
      _this.services.uploadContent(data).then(function (json) {
        // Fire the received data to any listeners
        self.fire('upload', json);
      });
    });

    var element = document.createElement('div');
    element.appendChild(h5pUpload);
    element.appendChild(useButton);

    this.rootElement = element;
  }

  _createClass(UploadSection, [{
    key: 'getElement',
    value: function getElement() {
      return this.rootElement;
    }
  }]);

  return UploadSection;
}();

exports.default = UploadSection;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

/**
 * @constant
 */
var ATTRIBUTE_SIZE = 'data-size';

/**
 * @type {function}
 */
var disable = (0, _elements.setAttribute)('disabled', '');

/**
 * @type {function}
 */
var enable = (0, _elements.removeAttribute)('disabled');

/**
 * @param {HTMLElement} element
 * @param {boolean} enabled
 */
var toggleEnabled = function toggleEnabled(element, enabled) {
  return (enabled ? enable : disable)(element);
};

/**
 * @param {HTMLElement} element
 * @param {boolean} hidden
 */
var toggleVisibility = (0, _functional.curry)(function (hidden, element) {
  return (0, _elements.setAttribute)('aria-hidden', hidden.toString(), element);
});

/**
 * @type {function}
 */
var isDisabled = (0, _elements.hasAttribute)('disabled');

/**
 * Update the view
 *
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 */
var updateView = function updateView(element, state) {
  var prevButton = element.querySelector('.previous');
  var nextButton = element.querySelector('.next');
  var list = element.querySelector('ul');
  var totalCount = list.childElementCount;

  // update list sizes
  list.style.width = 100 / state.displayCount * totalCount + '%';
  list.style.marginLeft = state.position * (100 / state.displayCount) + '%';

  // update image sizes
  element.querySelectorAll('li').forEach(function (element) {
    return element.style.width = 100 / totalCount + '%';
  });

  // toggle button visibility
  [prevButton, nextButton].forEach(toggleVisibility(state.displayCount >= totalCount));

  // toggle button enable, disabled
  toggleEnabled(nextButton, state.position > state.displayCount - totalCount);
  toggleEnabled(prevButton, state.position < 0);
};

/**
 * Handles button clicked
 *
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 * @param {function} updateState
 * @param {Event}
 * @type {function}
 */
var onButtonClick = (0, _functional.curry)(function (element, state, updateState, event) {
  if (!isDisabled(event.target)) {
    updateState(state);
    updateView(element, state);
  }
});

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
function init(element) {
  /**
   * @typedef {object} ImageScrollerState
   * @property {number} displayCount
   * @property {number} position
   */
  var state = {
    displayCount: element.getAttribute(ATTRIBUTE_SIZE) || 5,
    position: 0
  };

  // initialize buttons
  element.querySelector('.next').addEventListener('click', onButtonClick(element, state, function (state) {
    return state.position--;
  }));
  element.querySelector('.previous').addEventListener('click', onButtonClick(element, state, function (state) {
    return state.position++;
  }));

  // initialize images
  element.querySelectorAll('[aria-controls]').forEach(function (image) {
    var targetId = image.getAttribute('aria-controls');
    var target = element.querySelector('#' + targetId);

    target.addEventListener('click', function (event) {
      return target.setAttribute('aria-hidden', 'true');
    });
    image.addEventListener('click', function (event) {
      return target.setAttribute('aria-hidden', 'false');
    });
  });

  // listen for updates to data-size
  var observer = new MutationObserver((0, _functional.forEach)(function (record) {
    updateView(element, _extends(state, {
      position: 0,
      displayCount: element.getAttribute(ATTRIBUTE_SIZE)
    }));
  }));

  observer.observe(element, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [ATTRIBUTE_SIZE]
  });

  // initialize position
  updateView(element, state);

  return element;
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

/**
 * @type {function}
 */
var hideAll = (0, _functional.forEach)((0, _elements.setAttribute)('aria-hidden', 'true'));

/**
 * @type {function}
 */
var show = (0, _elements.setAttribute)('aria-hidden', 'false');

/**
 * @type {function}
 */
var unSelectAll = (0, _functional.forEach)((0, _elements.setAttribute)('aria-selected', 'false'));

/**
 * Initiates a tab panel
 *
 * @param {HTMLElement} element
 */
function init(element) {
  var tabs = element.querySelectorAll('[role="tab"]');
  var tabPanels = element.querySelectorAll('[role="tabpanel"]');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {

      unSelectAll(tabs);
      event.target.setAttribute('aria-selected', 'true');

      hideAll(tabPanels);

      var tabPanelId = event.target.getAttribute('aria-controls');
      show(element.querySelector('#' + tabPanelId));
    });
  });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(8).default;
H5P.HubClient.renderErrorMessage = __webpack_require__(4).default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjc2NzRlNmQwZGQ4NmE0OWE3MWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi1zZXJ2aWNlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvbWFpbi5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyLmpzIiwid2VicGFjazovLy8uLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudHJpZXMvZGlzdC5qcyJdLCJuYW1lcyI6WyJFdmVudGZ1bCIsImxpc3RlbmVycyIsIm9uIiwidHlwZSIsImxpc3RlbmVyIiwic2NvcGUiLCJ0cmlnZ2VyIiwicHVzaCIsImZpcmUiLCJldmVudCIsInRyaWdnZXJzIiwiZXZlcnkiLCJjYWxsIiwicHJvcGFnYXRlIiwidHlwZXMiLCJldmVudGZ1bCIsInNlbGYiLCJmb3JFYWNoIiwiY3VycnkiLCJmbiIsImFyaXR5IiwibGVuZ3RoIiwiZjEiLCJhcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsImFwcGx5IiwiZjIiLCJhcmdzMiIsImNvbmNhdCIsImNvbXBvc2UiLCJmbnMiLCJyZWR1Y2UiLCJmIiwiZyIsImFyciIsIm1hcCIsImZpbHRlciIsInNvbWUiLCJjb250YWlucyIsInZhbHVlIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJ2YWx1ZXMiLCJpbnZlcnNlQm9vbGVhblN0cmluZyIsImJvb2wiLCJ0b1N0cmluZyIsImdldEF0dHJpYnV0ZSIsIm5hbWUiLCJlbCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsImF0dHJpYnV0ZUVxdWFscyIsInRvZ2dsZUF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicGFyZW50IiwiY2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJoYXNDaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJsYXN0Q2hpbGQiLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJ3aW5kb3ciLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZXMiLCJjb250ZW50VHlwZSIsImlkIiwibnMiLCJnZXRBamF4VXJsIiwiYm9keSIsImZvcm1EYXRhIiwicmVuZGVyRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNsb3NlQnV0dG9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibWVzc2FnZUNvbnRlbnQiLCJ0aXRsZSIsImNvbnRlbnQiLCJtZXNzYWdlV3JhcHBlciIsImRpc21pc3NpYmxlIiwiYnV0dG9uIiwidW5kZWZpbmVkIiwibWVzc2FnZUJ1dHRvbiIsImNvbnNvbGUiLCJsb2ciLCJyZWxheUNsaWNrRXZlbnRBcyIsImVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic3RvcFByb3BhZ2F0aW9uIiwiaW5pdCIsImlzRXhwYW5kZWQiLCJoaWRlIiwic2hvdyIsInRvZ2dsZUJvZHlWaXNpYmlsaXR5IiwiYm9keUVsZW1lbnQiLCJvbkFyaWFFeHBhbmRlZENoYW5nZSIsInRhcmdldCIsInRpdGxlRWwiLCJib2R5SWQiLCJib2R5RWwiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiYXR0cmlidXRlRmlsdGVyIiwiSHViIiwic3RhdGUiLCJjb250ZW50VHlwZVNlY3Rpb24iLCJ1cGxvYWRTZWN0aW9uIiwidmlldyIsInNlcnZpY2VzIiwic2V0UGFuZWxUaXRsZSIsImNsb3NlUGFuZWwiLCJzZXRTZWN0aW9uVHlwZSIsInRvZ2dsZVBhbmVsT3BlbiIsImJpbmQiLCJpbml0VGFiUGFuZWwiLCJnZXRDb250ZW50VHlwZSIsInNldFRpdGxlIiwic2VjdGlvbklkIiwidGFiQ29uZmlncyIsImdldEVsZW1lbnQiLCJjb25maWciLCJzZWxlY3RlZCIsImFkZFRhYiIsInRhYkNvbmZpZyIsImFkZEJvdHRvbUJvcmRlciIsIkFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQiLCJ0b2dnbGVWaXNpYmlsaXR5IiwidmlzaWJsZSIsImlzRW1wdHkiLCJ0ZXh0IiwiQ29udGVudFR5cGVEZXRhaWxWaWV3IiwiYmFja0J1dHRvbkVsZW1lbnQiLCJpbWFnZSIsImltYWdlV3JhcHBlckVsZW1lbnQiLCJhdXRob3IiLCJkZXNjcmlwdGlvbiIsImRlbW9CdXR0b24iLCJ0ZXh0RGV0YWlscyIsImRldGFpbHNFbGVtZW50IiwidXNlQnV0dG9uIiwiaW5zdGFsbEJ1dHRvbiIsImJ1dHRvbkJhciIsImxpY2VuY2VQYW5lbCIsImNyZWF0ZVBhbmVsIiwicGx1Z2luc1BhbmVsIiwicHVibGlzaGVyUGFuZWwiLCJwYW5lbEdyb3VwRWxlbWVudCIsImNhcm91c2VsIiwidGh1bWJuYWlsTGlzdCIsInJvb3RFbGVtZW50IiwiaGVhZGVyRWwiLCJib2R5SW5uZXJFbCIsInBhbmVsRWwiLCJsaWdodGJveCIsImNoaWxkRWxlbWVudENvdW50IiwidXJsIiwiYWx0IiwidGh1bWJuYWlsIiwic3JjIiwiaW5zdGFsbGVkIiwiQ29udGVudFR5cGVEZXRhaWwiLCJpbnN0YWxsIiwidXBkYXRlIiwiaW5zdGFsbENvbnRlbnRUeXBlIiwiZGVidWciLCJzZXRJZCIsInNldERlc2NyaXB0aW9uIiwic2V0SW1hZ2UiLCJpY29uIiwic2V0RXhhbXBsZSIsImV4YW1wbGUiLCJzZXRJc0luc3RhbGxlZCIsInJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwiLCJzY3JlZW5zaG90cyIsImFkZEltYWdlVG9DYXJvdXNlbCIsIkNvbnRlbnRUeXBlTGlzdFZpZXciLCJyb3ciLCJjcmVhdGVDb250ZW50VHlwZVJvdyIsInVzZUJ1dHRvbkNvbmZpZyIsImNscyIsImluc3RhbGxCdXR0b25Db25maWciLCJzdW1tYXJ5IiwiQ29udGVudFR5cGVMaXN0IiwicmVtb3ZlQWxsUm93cyIsImFkZFJvdyIsIkNvbnRlbnRCcm93c2VyVmlldyIsIm1lbnUiLCJjcmVhdGVNZW51RWxlbWVudCIsImlucHV0R3JvdXAiLCJjcmVhdGVJbnB1dEdyb3VwRWxlbWVudCIsIm1lbnVHcm91cCIsIm1lbnVCYXJFbGVtZW50IiwibmF2RWxlbWVudCIsImlucHV0RmllbGQiLCJxdWVyeSIsImlucHV0QnV0dG9uIiwib25jbGljayIsInBhcmVudEVsZW1lbnQiLCJmb2N1cyIsIkNvbnRlbnRUeXBlU2VjdGlvbiIsInNlYXJjaFNlcnZpY2UiLCJjb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZURldGFpbCIsImFkZE1lbnVJdGVtIiwibWVudVRleHQiLCJzZWN0aW9uIiwiY2xhc3NMaXN0IiwiYWRkIiwic2VhcmNoIiwiYXBwbHlTZWFyY2hGaWx0ZXIiLCJzaG93RGV0YWlsVmlldyIsImNsb3NlRGV0YWlsVmlldyIsImluaXRDb250ZW50VHlwZUxpc3QiLCJjYXRjaCIsImVycm9yIiwibG9hZEJ5SWQiLCJBVFRSSUJVVEVfREFUQV9JRCIsImlzT3BlbiIsIkh1YlZpZXciLCJyZW5kZXJUYWJQYW5lbCIsInJlbmRlclBhbmVsIiwiZXhwYW5kZWQiLCJ0YWJDb250YWluZXJFbGVtZW50IiwicGFuZWwiLCJzZXRUaW1lb3V0IiwidGFibGlzdCIsInRhYkxpc3RXcmFwcGVyIiwidGFiSWQiLCJ0YWJQYW5lbElkIiwidGFiIiwidGFiUGFuZWwiLCJTZWFyY2hTZXJ2aWNlIiwiZmlsdGVyQnlRdWVyeSIsInNjb3JlIiwicXVlcmllcyIsInNwbGl0IiwiaSIsImdldFNlYXJjaFNjb3JlIiwic29ydCIsInNvcnRTZWFyY2hSZXN1bHRzIiwiYSIsImIiLCJwb3B1bGFyaXR5IiwidHJpbSIsImhhc1N1YlN0cmluZyIsImFycmF5SGFzU3ViU3RyaW5nIiwia2V5d29yZHMiLCJuZWVkbGUiLCJoYXlzdGFjayIsInRvTG93ZXJDYXNlIiwic3ViU3RyaW5nIiwic3RyaW5nIiwiVXBsb2FkU2VjdGlvbiIsImg1cFVwbG9hZCIsInRleHRDb250ZW50IiwiZGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiZmlsZXMiLCJ1cGxvYWRDb250ZW50IiwiQVRUUklCVVRFX1NJWkUiLCJkaXNhYmxlIiwiZW5hYmxlIiwidG9nZ2xlRW5hYmxlZCIsImVuYWJsZWQiLCJoaWRkZW4iLCJpc0Rpc2FibGVkIiwidXBkYXRlVmlldyIsInByZXZCdXR0b24iLCJuZXh0QnV0dG9uIiwibGlzdCIsInRvdGFsQ291bnQiLCJzdHlsZSIsIndpZHRoIiwiZGlzcGxheUNvdW50IiwibWFyZ2luTGVmdCIsInBvc2l0aW9uIiwib25CdXR0b25DbGljayIsInVwZGF0ZVN0YXRlIiwidGFyZ2V0SWQiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiaGlkZUFsbCIsInVuU2VsZWN0QWxsIiwidGFicyIsInRhYlBhbmVscyIsInJlcXVpcmUiLCJINVAiLCJIdWJDbGllbnQiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztB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WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjc2NzRlNmQwZGQ4NmE0OWE3MWIiLCIvKipcclxuICogQG1peGluXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRXZlbnRmdWwgPSAoKSA9PiAoe1xyXG4gIGxpc3RlbmVyczoge30sXHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3RlbiB0byBldmVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbc2NvcGVdXHJcbiAgICpcclxuICAgKiBAZnVuY3Rpb25cclxuICAgKiBAcmV0dXJuIHtFdmVudGZ1bH1cclxuICAgKi9cclxuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlZGVmIHtvYmplY3R9IFRyaWdnZXJcclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXHJcbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2NvcGVcclxuICAgICAqL1xyXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcclxuICAgICAgJ2xpc3RlbmVyJzogbGlzdGVuZXIsXHJcbiAgICAgICdzY29wZSc6IHNjb3BlXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XHJcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxyXG4gICAqXHJcbiAgICogQGZ1bmN0aW9uXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBmaXJlOiBmdW5jdGlvbih0eXBlLCBldmVudCkge1xyXG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcclxuXHJcbiAgICByZXR1cm4gdHJpZ2dlcnMuZXZlcnkoZnVuY3Rpb24odHJpZ2dlcikge1xyXG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3RlbnMgZm9yIGV2ZW50cyBvbiBhbm90aGVyIEV2ZW50ZnVsLCBhbmQgcHJvcGFnYXRlIGl0IHRyb3VnaCB0aGlzIEV2ZW50ZnVsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB0eXBlc1xyXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IGV2ZW50ZnVsXHJcbiAgICovXHJcbiAgcHJvcGFnYXRlOiBmdW5jdGlvbih0eXBlcywgZXZlbnRmdWwpIHtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUodHlwZSwgZXZlbnQpKSk7XHJcbiAgfVxyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9taXhpbnMvZXZlbnRmdWwuanMiLCIvKipcclxuICogUmV0dXJucyBhIGN1cnJpZWQgdmVyc2lvbiBvZiBhIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXHJcbiAqXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY3VycnkgPSBmdW5jdGlvbihmbikge1xyXG4gIGNvbnN0IGFyaXR5ID0gZm4ubGVuZ3RoO1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gZjEoKSB7XHJcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA+PSBhcml0eSkge1xyXG4gICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJncyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGYyKCkge1xyXG4gICAgICAgIGNvbnN0IGFyZ3MyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuICAgICAgICByZXR1cm4gZjEuYXBwbHkobnVsbCwgYXJncy5jb25jYXQoYXJnczIpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcG9zZSBmdW5jdGlvbnMgdG9nZXRoZXIsIGV4ZWN1dGluZyBmcm9tIHJpZ2h0IHRvIGxlZnRcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbi4uLn0gZm5zXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNvbXBvc2UgPSAoLi4uZm5zKSA9PiBmbnMucmVkdWNlKChmLCBnKSA9PiAoLi4uYXJncykgPT4gZihnKC4uLmFyZ3MpKSk7XHJcblxyXG4vKipcclxuICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggZWxlbWVudCBpbiBhbiBhcnJheVxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZm9yRWFjaCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XHJcbiAgYXJyLmZvckVhY2goZm4pO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBNYXBzIGEgZnVuY3Rpb24gdG8gYW4gYXJyYXlcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1hcCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XHJcbiAgcmV0dXJuIGFyci5tYXAoZm4pO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBBcHBsaWVzIGEgZmlsdGVyIHRvIGFuIGFycmF5XHJcbiAqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xyXG4gIHJldHVybiBhcnIuZmlsdGVyKGZuKTtcclxufSk7XHJcblxyXG4vKipcclxuICogQXBwbGllcyBhIHNvbWUgdG8gYW4gYXJyYXlcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNvbWUgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xyXG4gIHJldHVybiBhcnIuc29tZShmbik7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBhbiBhcnJheSBjb250YWlucyBhIHZhbHVlXHJcbiAqXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICogQHBhcmFtIHtBcnJheX0gYXJyXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNvbnRhaW5zID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlLCBhcnIpIHtcclxuICByZXR1cm4gYXJyLmluZGV4T2YodmFsdWUpICE9IC0xO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGFycmF5IHdpdGhvdXQgdGhlIHN1cHBsaWVkIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcclxuICogQHBhcmFtIHtBcnJheX0gYXJyXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHdpdGhvdXQgPSBjdXJyeShmdW5jdGlvbiAodmFsdWVzLCBhcnIpIHtcclxuICByZXR1cm4gZmlsdGVyKHZhbHVlID0+ICFjb250YWlucyh2YWx1ZSwgdmFsdWVzKSwgYXJyKVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBhIHN0cmluZyB0aGF0IGlzIGVpdGhlciAndHJ1ZScgb3IgJ2ZhbHNlJyBhbmQgcmV0dXJucyB0aGUgb3Bwb3NpdGVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGJvb2xcclxuICpcclxuICogQHB1YmxpY1xyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaW52ZXJzZUJvb2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoYm9vbCkge1xyXG4gIHJldHVybiAoYm9vbCAhPT0gJ3RydWUnKS50b1N0cmluZygpO1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsImltcG9ydCB7Y3VycnksIGludmVyc2VCb29sZWFuU3RyaW5nfSBmcm9tICcuL2Z1bmN0aW9uYWwnXHJcblxyXG4vKipcclxuICogR2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmcm9tIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcclxuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgYW4gYXR0cmlidXRlIG9uIGEgaHRtbCBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBzZXRBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGVsKSB7XHJcbiAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcclxufSk7XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIGh0bWwgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCByZW1vdmVBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcclxuICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBoYXNBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcclxuICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKG5hbWUpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGUgdGhhdCBlcXVhbHNcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUVxdWFscyA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZWwpIHtcclxuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpID09PSB2YWx1ZTtcclxufSk7XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyBhbiBhdHRyaWJ1dGUgYmV0d2VlbiAndHJ1ZScgYW5kICdmYWxzZSc7XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRvZ2dsZUF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xyXG4gIGNvbnN0IHZhbHVlID0gZ2V0QXR0cmlidXRlKG5hbWUsIGVsKTtcclxuICBzZXRBdHRyaWJ1dGUobmFtZSwgaW52ZXJzZUJvb2xlYW5TdHJpbmcodmFsdWUpLCBlbCk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBhcHBlbmRDaGlsZCgpIG1ldGhvZCBhZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0IG9mIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWVkIHBhcmVudCBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGFwcGVuZENoaWxkID0gY3VycnkoZnVuY3Rpb24gKHBhcmVudCwgY2hpbGQpIHtcclxuICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcclxufSk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIGEgZGVzY2VuZGFudCBvZiB0aGUgZWxlbWVudCBvbiB3aGljaCBpdCBpcyBpbnZva2VkXHJcbiAqIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIHNlbGVjdG9ycy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yID0gY3VycnkoZnVuY3Rpb24gKHNlbGVjdG9yLCBlbCkge1xyXG4gIHJldHVybiBlbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxufSk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIG5vbi1saXZlIE5vZGVMaXN0IG9mIGFsbCBlbGVtZW50cyBkZXNjZW5kZWQgZnJvbSB0aGUgZWxlbWVudCBvbiB3aGljaCBpdFxyXG4gKiBpcyBpbnZva2VkIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIENTUyBzZWxlY3RvcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7Tm9kZUxpc3R9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvckFsbCA9IGN1cnJ5KGZ1bmN0aW9uIChzZWxlY3RvciwgZWwpIHtcclxuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXNcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlQWxsQ2hpbGRyZW4gPSBmdW5jdGlvbiAoZWwpIHtcclxuICB3aGlsZShlbC5oYXNDaGlsZE5vZGVzKCkpIGVsLnJlbW92ZUNoaWxkKGVsLmxhc3RDaGlsZCk7XHJcbiAgcmV0dXJuIGVsO1xyXG59O1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIi8qKlxyXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBDb250ZW50VHlwZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFjaGluZU5hbWVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ham9yVmVyc2lvblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWlub3JWZXJzaW9uXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwYXRjaFZlcnNpb25cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1ham9yVmVyc2lvblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWlub3JWZXJzaW9uXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzdW1tYXJ5XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkZXNjcmlwdGlvblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWNvblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3JlYXRlZEF0XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVkX0F0XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpc1JlY29tbWVuZGVkXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwb3B1bGFyaXR5XHJcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHNjcmVlbnNob3RzXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsaWNlbnNlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBleGFtcGxlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0dXRvcmlhbFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBrZXl3b3Jkc1xyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gb3duZXJcclxuICogQHByb3BlcnR5IHtib29sZWFufSBpbnN0YWxsZWRcclxuICogQHByb3BlcnR5IHtib29sZWFufSByZXN0cmljdGVkXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFwaVJvb3RVcmxcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih7IGFwaVJvb3RVcmwgfSkge1xyXG4gICAgdGhpcy5hcGlSb290VXJsID0gYXBpUm9vdFVybDtcclxuXHJcbiAgICBpZighd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyl7XHJcbiAgICAgIC8vIFRPRE8gcmVtb3ZlIHRoaXMgd2hlbiBkb25lIHRlc3RpbmcgZm9yIGVycm9yc1xyXG4gICAgICAvLyB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWVycm9ycy9OT19SRVNQT05TRS5qc29uYCwge1xyXG5cclxuICAgICAgd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50LXR5cGUtY2FjaGVgLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxyXG4gICAgICAudGhlbih0aGlzLmlzVmFsaWQpXHJcbiAgICAgIC50aGVuKGpzb24gPT4ganNvbi5saWJyYXJpZXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtDb250ZW50VHlwZVtdfEVycm9yTWVzc2FnZX0gcmVzcG9uc2VcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cclxuICAgKi9cclxuICBpc1ZhbGlkKHJlc3BvbnNlKSB7XHJcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlW10+fVxyXG4gICAqL1xyXG4gIGNvbnRlbnRUeXBlcygpIHtcclxuICAgIHJldHVybiB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XHJcbiAgICovXHJcbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcclxuICAgIHJldHVybiB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzLnRoZW4oY29udGVudFR5cGVzID0+IHtcclxuICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50X3R5cGVfY2FjaGUvJHtpZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcclxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpOyovXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnN0YWxscyBhIGNvbnRlbnQgdHlwZSBvbiB0aGUgc2VydmVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cclxuICAgKi9cclxuICBpbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChucy5nZXRBamF4VXJsKCdsaWJyYXJ5LWluc3RhbGwnLCB7aWQ6IGlkfSksIHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXHJcbiAgICAgIGJvZHk6ICcnXHJcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwbG9hZHMgYSBjb250ZW50IHR5cGUgdG8gdGhlIHNlcnZlciBmb3IgdmFsaWRhdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGb3JtRGF0YX0gZm9ybURhdGEgRm9ybSBjb250YWluaW5nIHRoZSBoNXAgdGhhdCBzaG91bGQgYmUgdXBsb2FkZWQgYXMgJ2g1cCdcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBqc29uIGNvbnRhaW5pbmcgdGhlIGNvbnRlbnQganNvbiBhbmQgdGhlIGg1cCBqc29uXHJcbiAgICovXHJcbiAgdXBsb2FkQ29udGVudChmb3JtRGF0YSkge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1saWJyYXJ5LXVwbG9hZGAsIHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXHJcbiAgICAgIGJvZHk6IGZvcm1EYXRhXHJcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwiLyoqXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcudHlwZSAgICAgICAgIHR5cGUgb2YgdGhlIG1lc3NhZ2U6IGluZm8sIHN1Y2Nlc3MsIGVycm9yXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59ICBjb25maWcuZGlzbWlzc2libGUgIHdoZXRoZXIgdGhlIG1lc3NhZ2UgY2FuIGJlIGRpc21pc3NlZFxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLmNvbnRlbnQgICAgICBtZXNzYWdlIGNvbnRlbnQgdXN1YWxseSBhICdoMycgYW5kIGEgJ3AnXHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBkaXYgY29udGFpbmluZyB0aGUgbWVzc2FnZSBlbGVtZW50XHJcbiAqL1xyXG5cclxuLy9UT0RPIGhhbmRsZSBzdHJpbmdzLCBodG1sLCBiYWRseSBmb3JtZWQgb2JqZWN0XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlckVycm9yTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSAnY2xvc2UnO1xyXG4gIGNsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmI3gyNzE1JztcclxuXHJcbiAgY29uc3QgbWVzc2FnZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBtZXNzYWdlQ29udGVudC5jbGFzc05hbWUgPSAnbWVzc2FnZS1jb250ZW50JztcclxuICBtZXNzYWdlQ29udGVudC5pbm5lckhUTUwgPSAnPGgxPicgKyBtZXNzYWdlLnRpdGxlICsgJzwvaDE+JyArICc8cD4nICsgbWVzc2FnZS5jb250ZW50ICsgJzwvcD4nO1xyXG5cclxuICBjb25zdCBtZXNzYWdlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIG1lc3NhZ2VXcmFwcGVyLmNsYXNzTmFtZSA9ICdtZXNzYWdlJyArICcgJyArIGAke21lc3NhZ2UudHlwZX1gICsgKG1lc3NhZ2UuZGlzbWlzc2libGUgPyAnIGRpc21pc3NpYmxlJyA6ICcnKTtcclxuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XHJcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUNvbnRlbnQpO1xyXG5cclxuICBpZiAobWVzc2FnZS5idXR0b24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgY29uc3QgbWVzc2FnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgbWVzc2FnZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcclxuICAgIG1lc3NhZ2VCdXR0b24uaW5uZXJIVE1MID0gbWVzc2FnZS5idXR0b247XHJcbiAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQnV0dG9uKTtcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKG1lc3NhZ2VXcmFwcGVyKTtcclxuICByZXR1cm4gbWVzc2FnZVdyYXBwZXI7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcclxuXHJcbi8qKlxyXG4gKiAgVHJhbnNmb3JtcyBhIERPTSBjbGljayBldmVudCBpbnRvIGFuIEV2ZW50ZnVsJ3MgZXZlbnRcclxuICogIEBzZWUgRXZlbnRmdWxcclxuICpcclxuICogQHBhcmFtICB7c3RyaW5nIHwgT2JqZWN0fSB0eXBlXHJcbiAqIEBwYXJhbSAge0V2ZW50ZnVsfSBldmVudGZ1bFxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBjb25zdCByZWxheUNsaWNrRXZlbnRBcyA9IGN1cnJ5KGZ1bmN0aW9uKHR5cGUsIGV2ZW50ZnVsLCBlbGVtZW50KSB7XHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgIGV2ZW50ZnVsLmZpcmUodHlwZSwge1xyXG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICBpZDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxyXG4gICAgfSwgZmFsc2UpO1xyXG5cclxuICAgIC8vIGRvbid0IGJ1YmJsZVxyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBlbGVtZW50O1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGUsIGF0dHJpYnV0ZUVxdWFscywgdG9nZ2xlQXR0cmlidXRlfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XHJcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IGlzRXhwYW5kZWQgPSBhdHRyaWJ1dGVFcXVhbHMoXCJhcmlhLWV4cGFuZGVkXCIsICd0cnVlJyk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyB0aGUgYm9keSB2aXNpYmlsaXR5XHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJvZHlFbGVtZW50XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNFeHBhbmRlZFxyXG4gKi9cclxuY29uc3QgdG9nZ2xlQm9keVZpc2liaWxpdHkgPSBmdW5jdGlvbihib2R5RWxlbWVudCwgaXNFeHBhbmRlZCkge1xyXG4gIGlmKCFpc0V4cGFuZGVkKSB7XHJcbiAgICBoaWRlKGJvZHlFbGVtZW50KTtcclxuICAgIC8vYm9keUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XHJcbiAgfVxyXG4gIGVsc2UgLyppZihib2R5RWxlbWVudC5zY3JvbGxIZWlnaHQgPiAwKSovIHtcclxuICAgIHNob3coYm9keUVsZW1lbnQpO1xyXG4gICAgLy9ib2R5RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtib2R5RWxlbWVudC5zY3JvbGxIZWlnaHR9cHhgO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIGNoYW5nZXMgdG8gYXJpYS1leHBhbmRlZFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBib2R5RWxlbWVudFxyXG4gKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBldmVudFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IG9uQXJpYUV4cGFuZGVkQ2hhbmdlID0gY3VycnkoZnVuY3Rpb24oYm9keUVsZW1lbnQsIGV2ZW50KSB7XHJcbiAgdG9nZ2xlQm9keVZpc2liaWxpdHkoYm9keUVsZW1lbnQsIGlzRXhwYW5kZWQoZXZlbnQudGFyZ2V0KSk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xyXG4gIGNvbnN0IHRpdGxlRWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWV4cGFuZGVkXScpO1xyXG4gIGNvbnN0IGJvZHlJZCA9IHRpdGxlRWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XHJcbiAgY29uc3QgYm9keUVsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2R5SWR9YCk7XHJcblxyXG4gIGlmKHRpdGxlRWwpIHtcclxuICAgIC8vIHNldCBvYnNlcnZlciBvbiB0aXRsZSBmb3IgYXJpYS1leHBhbmRlZFxyXG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZm9yRWFjaChvbkFyaWFFeHBhbmRlZENoYW5nZShib2R5RWwpKSk7XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0aXRsZUVsLCB7XHJcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxyXG4gICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcImFyaWEtZXhwYW5kZWRcIl1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNldCBjbGljayBsaXN0ZW5lciB0aGF0IHRvZ2dsZXMgYXJpYS1leHBhbmRlZFxyXG4gICAgdGl0bGVFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHRvZ2dsZUF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgZXZlbnQudGFyZ2V0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRvZ2dsZUJvZHlWaXNpYmlsaXR5KGJvZHlFbCwgaXNFeHBhbmRlZCh0aXRsZUVsKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZWxlbWVudDtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSFpwWlhkQ2IzZzlJakFnTUNBME1EQWdNakkxSWo0TkNpQWdQR1JsWm5NK0RRb2dJQ0FnUEhOMGVXeGxQZzBLSUNBZ0lDQWdMbU5zY3kweElIc05DaUFnSUNBZ0lHWnBiR3c2SUc1dmJtVTdEUW9nSUNBZ0lDQjlEUW9OQ2lBZ0lDQWdJQzVqYkhNdE1pQjdEUW9nSUNBZ0lDQm1hV3hzT2lBall6WmpObU0zT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1zSUM1amJITXROQ0I3RFFvZ0lDQWdJQ0JtYVd4c09pQWpabVptT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1nZXcwS0lDQWdJQ0FnYjNCaFkybDBlVG9nTUM0M093MEtJQ0FnSUNBZ2ZRMEtJQ0FnSUR3dmMzUjViR1UrRFFvZ0lEd3ZaR1ZtY3o0TkNpQWdQSFJwZEd4bFBtTnZiblJsYm5RZ2RIbHdaU0J3YkdGalpXaHZiR1JsY2w4eVBDOTBhWFJzWlQ0TkNpQWdQR2NnYVdROUlreGhlV1Z5WHpJaUlHUmhkR0V0Ym1GdFpUMGlUR0Y1WlhJZ01pSStEUW9nSUNBZ1BHY2dhV1E5SW1OdmJuUmxiblJmZEhsd1pWOXdiR0ZqWldodmJHUmxjaTB4WDJOdmNIa2lJR1JoZEdFdGJtRnRaVDBpWTI5dWRHVnVkQ0IwZVhCbElIQnNZV05sYUc5c1pHVnlMVEVnWTI5d2VTSStEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxURWlJSGRwWkhSb1BTSTBNREFpSUdobGFXZG9kRDBpTWpJMUlpOCtEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxUSWlJSGc5SWpFeE1pNDFNU0lnZVQwaU5ETXVOREVpSUhkcFpIUm9QU0l4TnpZdU9UWWlJR2hsYVdkb2REMGlNVE0xTGpRMUlpQnllRDBpTVRBaUlISjVQU0l4TUNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE16WXVOallpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5URXVORGtpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5qWXVNU0lnWTNrOUlqWXhMams0SWlCeVBTSTBMamd4SWk4K0RRb2dJQ0FnSUNBOFp5QnBaRDBpWDBkeWIzVndYeUlnWkdGMFlTMXVZVzFsUFNJbWJIUTdSM0p2ZFhBbVozUTdJajROQ2lBZ0lDQWdJQ0FnUEdjZ2FXUTlJbDlIY205MWNGOHlJaUJrWVhSaExXNWhiV1U5SWlac2REdEhjbTkxY0NabmREc2lQZzBLSUNBZ0lDQWdJQ0FnSUR4d1lYUm9JR2xrUFNKZlEyOXRjRzkxYm1SZlVHRjBhRjhpSUdSaGRHRXRibUZ0WlQwaUpteDBPME52YlhCdmRXNWtJRkJoZEdnbVozUTdJaUJqYkdGemN6MGlZMnh6TFRRaUlHUTlJazB5TmpNdU1qZ3NPVFV1TWpGRE1qWXdMRGt5TGpBM0xESTFOU3c1TVM0MUxESTBPQzQwTXl3NU1TNDFTREl5TjNZNFNERTVPUzQxYkMweUxqRTNMREV3TGpJMFlUSTFMamcwTERJMUxqZzBMREFzTUN3eExERXhMalE0TFRFdU5qTXNNVGt1T1RNc01Ua3VPVE1zTUN3d0xERXNNVFF1TXprc05TNDFOeXd4T0M0eU5pd3hPQzR5Tml3d0xEQXNNU3cxTGpVeUxERXpMallzTWpNdU1URXNNak11TVRFc01Dd3dMREV0TWk0NE5Dd3hNUzR3TlN3eE9DNDJOU3d4T0M0Mk5Td3dMREFzTVMwNExqQTJMRGN1Tnprc09TdzVMREFzTUN3eExUUXVNVElzTVM0ek4wZ3lNeloyTFRJeGFERXdMalF5WXpjdU16WXNNQ3d4TWk0NE15MHhMall4TERFMkxqUXlMVFZ6TlM0ek9DMDNMalE0TERVdU16Z3RNVE11TkRSRE1qWTRMakl5TERFd01pNHlPU3d5TmpZdU5UY3NPVGd1TXpVc01qWXpMakk0TERrMUxqSXhXbTB0TVRVc01UZGpMVEV1TkRJc01TNHlNaTB6TGprc01TNHlOUzAzTGpReExERXVNalZJTWpNMmRpMHhOR2cxTGpZeVlUa3VOVGNzT1M0MU55d3dMREFzTVN3M0xESXVPVE1zTnk0d05TdzNMakExTERBc01Dd3hMREV1T0RVc05DNDVNa0UyTGpNekxEWXVNek1zTUN3d0xERXNNalE0TGpNeExERXhNaTR5TlZvaUx6NE5DaUFnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpWDFCaGRHaGZJaUJrWVhSaExXNWhiV1U5SWlac2REdFFZWFJvSm1kME95SWdZMnhoYzNNOUltTnNjeTAwSWlCa1BTSk5NakF5TGprc01URTVMakV4WVRndU1USXNPQzR4TWl3d0xEQXNNQzAzTGpJNExEUXVOVEpzTFRFMkxURXVNaklzTnk0eU1pMHpNQzQ1TWtneE56UjJNakpJTVRVemRpMHlNa2d4TXpaMk5UWm9NVGQyTFRJeGFESXhkakl4YURJd0xqTXhZeTB5TGpjeUxEQXROUzB4TGpVekxUY3RNMkV4T1M0eE9Td3hPUzR4T1N3d0xEQXNNUzAwTGpjekxUUXVPRE1zTWpNdU5UZ3NNak11TlRnc01Dd3dMREV0TXkwMkxqWnNNVFl0TWk0eU5tRTRMakV4TERndU1URXNNQ3d4TERBc055NHlOaTB4TVM0M01sb2lMejROQ2lBZ0lDQWdJQ0FnUEM5blBnMEtJQ0FnSUNBZ1BDOW5QZzBLSUNBZ0lDQWdQSEpsWTNRZ1kyeGhjM005SW1Oc2N5MHpJaUI0UFNJeE56Y3VOallpSUhrOUlqVTNMalkySWlCM2FXUjBhRDBpT1RJdU1qZ2lJR2hsYVdkb2REMGlPUzR6T0NJZ2NuZzlJak11TlNJZ2NuazlJak11TlNJdlBnMEtJQ0FnSUR3dlp6NE5DaUFnUEM5blBnMEtQQzl6ZG1jK0RRbz1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBIdWJWaWV3IGZyb20gJy4vaHViLXZpZXcnO1xyXG5pbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uIGZyb20gJy4vY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24nO1xyXG5pbXBvcnQgVXBsb2FkU2VjdGlvbiBmcm9tICcuL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uJztcclxuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4vaHViLXNlcnZpY2VzJztcclxuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XHJcbmltcG9ydCB7cmVuZGVyRXJyb3JNZXNzYWdlfSBmcm9tICcuL3V0aWxzL2Vycm9ycyc7XHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBIdWJTdGF0ZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGl0bGVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb25JZFxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGV4cGFuZGVkXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhcGlSb290VXJsXHJcbiAqL1xyXG4vKipcclxuICogQHR5cGVkZWYge29iamVjdH0gRXJyb3JNZXNzYWdlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXNzYWdlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlcnJvckNvZGVcclxuICovXHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBTZWxlY3RlZEVsZW1lbnRcclxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRcclxuICovXHJcbi8qKlxyXG4gKiBTZWxlY3QgZXZlbnRcclxuICogQGV2ZW50IEh1YiNzZWxlY3RcclxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cclxuICovXHJcbi8qKlxyXG4gKiBFcnJvciBldmVudFxyXG4gKiBAZXZlbnQgSHViI2Vycm9yXHJcbiAqIEB0eXBlIHtFcnJvck1lc3NhZ2V9XHJcbiAqL1xyXG4vKipcclxuICogVXBsb2FkIGV2ZW50XHJcbiAqIEBldmVudCBIdWIjdXBsb2FkXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxyXG4gKiBAZmlyZXMgSHViI2Vycm9yXHJcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWIge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgLy8gY29udHJvbGxlcnNcclxuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uID0gbmV3IENvbnRlbnRUeXBlU2VjdGlvbihzdGF0ZSk7XHJcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSk7XHJcblxyXG4gICAgLy8gdmlld3NcclxuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcclxuXHJcbiAgICAvLyBzZXJ2aWNlc1xyXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XHJcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHByb3BhZ2F0ZSBjb250cm9sbGVyIGV2ZW50c1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAnZXJyb3InXSwgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24pO1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWyd1cGxvYWQnXSwgdGhpcy51cGxvYWRTZWN0aW9uKTtcclxuXHJcbiAgICAvLyBoYW5kbGUgZXZlbnRzXHJcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnNldFBhbmVsVGl0bGUsIHRoaXMpO1xyXG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy52aWV3LmNsb3NlUGFuZWwsIHRoaXMudmlldyk7XHJcbiAgICB0aGlzLnZpZXcub24oJ3RhYi1jaGFuZ2UnLCB0aGlzLnZpZXcuc2V0U2VjdGlvblR5cGUsIHRoaXMudmlldyk7XHJcbiAgICB0aGlzLnZpZXcub24oJ3BhbmVsLWNoYW5nZScsIHRoaXMudmlldy50b2dnbGVQYW5lbE9wZW4uYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xyXG5cclxuICAgIHRoaXMuaW5pdFRhYlBhbmVsKHN0YXRlKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGNvbnRlbnQgdHlwZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxyXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cclxuICAgKi9cclxuICBnZXRDb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUobWFjaGluZU5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdGl0bGUgb2YgdGhlIHBhbmVsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBzZXRQYW5lbFRpdGxlKHtpZH0pwqB7XHJcbiAgICB0aGlzLmdldENvbnRlbnRUeXBlKGlkKS50aGVuKCh7dGl0bGV9KSA9PiB0aGlzLnZpZXcuc2V0VGl0bGUodGl0bGUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYXRlcyB0aGUgdGFiIHBhbmVsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbklkXHJcbiAgICovXHJcbiAgaW5pdFRhYlBhbmVsKHsgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnIH0pIHtcclxuICAgIGNvbnN0IHRhYkNvbmZpZ3MgPSBbe1xyXG4gICAgICB0aXRsZTogJ0NyZWF0ZSBDb250ZW50JyxcclxuICAgICAgaWQ6ICdjb250ZW50LXR5cGVzJyxcclxuICAgICAgY29udGVudDogdGhpcy5jb250ZW50VHlwZVNlY3Rpb24uZ2V0RWxlbWVudCgpLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdVcGxvYWQnLFxyXG4gICAgICBpZDogJ3VwbG9hZCcsXHJcbiAgICAgIGNvbnRlbnQ6IHRoaXMudXBsb2FkU2VjdGlvbi5nZXRFbGVtZW50KClcclxuICAgIH1dO1xyXG5cclxuICAgIC8vIHNldHMgdGhlIGNvcnJlY3Qgb25lIHNlbGVjdGVkXHJcbiAgICB0YWJDb25maWdzXHJcbiAgICAgIC5maWx0ZXIoY29uZmlnID0+IGNvbmZpZy5pZCA9PT0gc2VjdGlvbklkKVxyXG4gICAgICAuZm9yRWFjaChjb25maWcgPT4gY29uZmlnLnNlbGVjdGVkID0gdHJ1ZSk7XHJcblxyXG4gICAgdGFiQ29uZmlncy5mb3JFYWNoKHRhYkNvbmZpZyA9PiB0aGlzLnZpZXcuYWRkVGFiKHRhYkNvbmZpZykpO1xyXG4gICAgdGhpcy52aWV3LmFkZEJvdHRvbUJvcmRlcigpOyAvLyBBZGRzIGFuIGFuaW1hdGVkIGJvdHRvbSBib3JkZXIgdG8gZWFjaCB0YWJcclxuICAgIHRoaXMudmlldy5pbml0VGFiUGFuZWwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBpbiB0aGUgdmlld1xyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWIuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIHJlbW92ZUNoaWxkIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XHJcbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcclxuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5pbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCI7XHJcbmltcG9ydCBpbml0SW1hZ2VTY3JvbGxlciBmcm9tIFwiY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlclwiO1xyXG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XHJcbmltcG9ydCBub0ljb24gZnJvbSAnLi4vLi4vaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmcnO1xyXG5cclxuLyoqXHJcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxyXG4gKi9cclxuY29uc3QgQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCA9ICdkYXRhLWlkJztcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBpZiBhbiBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXHJcbiAqL1xyXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGVsZW1lbnQsIHZpc2libGUpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBlbXB0eVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuY29uc3QgaXNFbXB0eSA9ICh0ZXh0KSA9PiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSAmJiAodGV4dC5sZW5ndGggPT09IDApO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsVmlldyB7XHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgLy8gYmFjayBidXR0b25cclxuICAgIGNvbnN0IGJhY2tCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBiYWNrQnV0dG9uRWxlbWVudC5jbGFzc05hbWUgPSAnYmFjay1idXR0b24gaWNvbi1hcnJvdy10aGljayc7XHJcbiAgICByZWxheUNsaWNrRXZlbnRBcygnY2xvc2UnLCB0aGlzLCBiYWNrQnV0dG9uRWxlbWVudCk7XHJcblxyXG4gICAgLy8gaW1hZ2VcclxuICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIHRoaXMuaW1hZ2UuY2xhc3NOYW1lID0gJ2ltZy1yZXNwb25zaXZlJztcclxuXHJcbiAgICBjb25zdCBpbWFnZVdyYXBwZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpbWFnZVdyYXBwZXJFbGVtZW50LmNsYXNzTmFtZSA9ICdpbWFnZS13cmFwcGVyJztcclxuICAgIGltYWdlV3JhcHBlckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pbWFnZSk7XHJcblxyXG4gICAgLy8gdGl0bGVcclxuICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xyXG5cclxuICAgIC8vIGF1dGhvclxyXG4gICAgdGhpcy5hdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuYXV0aG9yLmNsYXNzTmFtZSA9ICdhdXRob3InO1xyXG4gICAgdGhpcy5hdXRob3IuaW5uZXJIVE1MID0gJ2J5IEpvdWJlbCc7IC8vIFRPRE8gTWFrZSBkeW5hbWljXHJcblxyXG4gICAgLy8gZGVzY3JpcHRpb25cclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uLmNsYXNzTmFtZSA9ICdzbWFsbCc7XHJcblxyXG4gICAgLy8gZGVtbyBidXR0b25cclxuICAgIHRoaXMuZGVtb0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIHRoaXMuZGVtb0J1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcclxuICAgIHRoaXMuZGVtb0J1dHRvbi5pbm5lckhUTUwgPSAnQ29udGVudCBEZW1vJztcclxuICAgIHRoaXMuZGVtb0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuICAgIGhpZGUodGhpcy5kZW1vQnV0dG9uKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0RGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGV4dERldGFpbHMuY2xhc3NOYW1lID0gJ3RleHQtZGV0YWlscyc7XHJcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcclxuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMuYXV0aG9yKTtcclxuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMuZGVzY3JpcHRpb24pO1xyXG4gICAgdGV4dERldGFpbHMuYXBwZW5kQ2hpbGQodGhpcy5kZW1vQnV0dG9uKTtcclxuXHJcbiAgICBjb25zdCBkZXRhaWxzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGV0YWlsc0VsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XHJcbiAgICBkZXRhaWxzRWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZVdyYXBwZXJFbGVtZW50KTtcclxuICAgIGRldGFpbHNFbGVtZW50LmFwcGVuZENoaWxkKHRleHREZXRhaWxzKTtcclxuXHJcbiAgICAvLyB1c2UgYnV0dG9uXHJcbiAgICB0aGlzLnVzZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHRoaXMudXNlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24gYnV0dG9uLXByaW1hcnknO1xyXG4gICAgdGhpcy51c2VCdXR0b24uaW5uZXJIVE1MID0gJ1VzZSc7XHJcbiAgICBoaWRlKHRoaXMudXNlQnV0dG9uKTtcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XHJcblxyXG4gICAgLy8gaW5zdGFsbCBidXR0b25cclxuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnknO1xyXG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLmlubmVySFRNTCA9ICdJbnN0YWxsJztcclxuICAgIGhpZGUodGhpcy5pbnN0YWxsQnV0dG9uKTtcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdpbnN0YWxsJywgdGhpcywgdGhpcy5pbnN0YWxsQnV0dG9uKTtcclxuXHJcbiAgICBjb25zdCBidXR0b25CYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJ1dHRvbkJhci5jbGFzc05hbWUgPSAnYnV0dG9uLWJhcic7XHJcbiAgICBidXR0b25CYXIuYXBwZW5kQ2hpbGQodGhpcy51c2VCdXR0b24pO1xyXG4gICAgYnV0dG9uQmFyLmFwcGVuZENoaWxkKHRoaXMuaW5zdGFsbEJ1dHRvbik7XHJcblxyXG4gICAgLy8gbGljZW5jZSBwYW5lbFxyXG4gICAgY29uc3QgbGljZW5jZVBhbmVsID0gdGhpcy5jcmVhdGVQYW5lbCgnVGhlIExpY2VuY2UgSW5mbycsICdpcHN1bSBsb3J1bScsICdsaWNlbmNlLXBhbmVsJyk7XHJcbiAgICBjb25zdCBwbHVnaW5zUGFuZWwgPSB0aGlzLmNyZWF0ZVBhbmVsKCdBdmFpbGFibGUgcGx1Z2lucycsICdpcHN1bSBsb3J1bScsICdwbHVnaW5zLXBhbmVsJyk7XHJcbiAgICBjb25zdCBwdWJsaXNoZXJQYW5lbCA9IHRoaXMuY3JlYXRlUGFuZWwoJ1B1Ymxpc2hlciBJbmZvJywgJ2lwc3VtIGxvcnVtJywgJ3B1Ymxpc2hlci1wYW5lbCcpO1xyXG5cclxuICAgIC8vIHBhbmVsIGdyb3VwXHJcbiAgICBjb25zdCBwYW5lbEdyb3VwRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcGFuZWxHcm91cEVsZW1lbnQuY2xhc3NOYW1lID0gJ3BhbmVsLWdyb3VwJztcclxuICAgIHBhbmVsR3JvdXBFbGVtZW50LmFwcGVuZENoaWxkKGxpY2VuY2VQYW5lbCk7XHJcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5hcHBlbmRDaGlsZChwbHVnaW5zUGFuZWwpO1xyXG4gICAgcGFuZWxHcm91cEVsZW1lbnQuYXBwZW5kQ2hpbGQocHVibGlzaGVyUGFuZWwpO1xyXG5cclxuICAgIC8vIGltYWdlc1xyXG4gICAgdGhpcy5jYXJvdXNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jYXJvdXNlbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncmVnaW9uJyk7XHJcbiAgICB0aGlzLmNhcm91c2VsLnNldEF0dHJpYnV0ZSgnZGF0YS1zaXplJywgJzUnKTtcclxuICAgIHRoaXMuY2Fyb3VzZWwuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjYXJvdXNlbFwiIHJvbGU9XCJyZWdpb25cIiBkYXRhLXNpemU9XCI1XCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWJ1dHRvbiBwcmV2aW91c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZsYXJyOzwvc3Bhbj5cclxuICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIG5leHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj4mcmFycjs8L3NwYW4+XHJcbiAgICA8bmF2IGNsYXNzPVwic2Nyb2xsZXJcIj48dWw+PC91bD48L25hdj5gO1xyXG5cclxuICAgIGluaXRJbWFnZVNjcm9sbGVyKHRoaXMuY2Fyb3VzZWwpO1xyXG5cclxuICAgIHRoaXMudGh1bWJuYWlsTGlzdCA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcigndWwnKTtcclxuXHJcbiAgICAvLyBhZGQgcm9vdCBlbGVtZW50XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtZGV0YWlsJztcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKGJhY2tCdXR0b25FbGVtZW50KTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoZGV0YWlsc0VsZW1lbnQpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChidXR0b25CYXIpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhcm91c2VsKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocGFuZWxHcm91cEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIHBhbmVsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5SWRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGNyZWF0ZVBhbmVsKHRpdGxlLCBib2R5LCBib2R5SWQpIHtcclxuICAgIGNvbnN0IGhlYWRlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBoZWFkZXJFbC5jbGFzc05hbWUgPSAncGFuZWwtaGVhZGVyJztcclxuICAgIGhlYWRlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xyXG4gICAgaGVhZGVyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgYm9keUlkKTtcclxuICAgIGhlYWRlckVsLmlubmVySFRNTCA9IHRpdGxlO1xyXG5cclxuICAgIGNvbnN0IGJvZHlJbm5lckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBib2R5SW5uZXJFbC5jbGFzc05hbWUgPSAncGFuZWwtYm9keS1pbm5lcic7XHJcbiAgICBib2R5SW5uZXJFbC5pbm5lckhUTUwgPSBib2R5O1xyXG5cclxuICAgIGNvbnN0IGJvZHlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYm9keUVsLmNsYXNzTmFtZSA9ICdwYW5lbC1ib2R5JztcclxuICAgIGJvZHlFbC5pZCA9IGJvZHlJZDtcclxuICAgIGJvZHlFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgIGJvZHlFbC5hcHBlbmRDaGlsZChib2R5SW5uZXJFbCk7XHJcblxyXG4gICAgY29uc3QgcGFuZWxFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcGFuZWxFbC5jbGFzc05hbWUgPSAncGFuZWwnO1xyXG4gICAgcGFuZWxFbC5hcHBlbmRDaGlsZChoZWFkZXJFbCk7XHJcbiAgICBwYW5lbEVsLmFwcGVuZENoaWxkKGJvZHlFbCk7XHJcblxyXG4gICAgaW5pdFBhbmVsKHBhbmVsRWwpO1xyXG5cclxuICAgIHJldHVybiBwYW5lbEVsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgaW1hZ2VzIGZyb20gdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCgpIHtcclxuICAgIHRoaXMudGh1bWJuYWlsTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmZvckVhY2gocmVtb3ZlQ2hpbGQodGhpcy50aHVtYm5haWxMaXN0KSk7XHJcbiAgICB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbC1saWdodGJveCcpLmZvckVhY2gocmVtb3ZlQ2hpbGQodGhpcy5jYXJvdXNlbCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGltYWdlIHRvIHRoZSBjYXJvdXNlbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGltYWdlXHJcbiAgICovXHJcbiAgYWRkSW1hZ2VUb0Nhcm91c2VsKGltYWdlKSB7XHJcbiAgICAvLyBhZGQgbGlnaHRib3hcclxuICAgIGNvbnN0IGxpZ2h0Ym94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBsaWdodGJveC5pZCA9IGBsaWdodGJveC0ke3RoaXMudGh1bWJuYWlsTGlzdC5jaGlsZEVsZW1lbnRDb3VudH1gO1xyXG4gICAgbGlnaHRib3guY2xhc3NOYW1lID0gJ2Nhcm91c2VsLWxpZ2h0Ym94JztcclxuICAgIGxpZ2h0Ym94LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG4gICAgbGlnaHRib3guaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cIiR7aW1hZ2UudXJsfVwiIGFsdD1cIiR7aW1hZ2UuYWx0fVwiPmA7XHJcbiAgICB0aGlzLmNhcm91c2VsLmFwcGVuZENoaWxkKGxpZ2h0Ym94KTtcclxuXHJcbiAgICAvLyBhZGQgdGh1bWJuYWlsXHJcbiAgICBjb25zdCB0aHVtYm5haWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgdGh1bWJuYWlsLmNsYXNzTmFtZSA9ICdzbGlkZSc7XHJcbiAgICB0aHVtYm5haWwuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHtpbWFnZS51cmx9XCIgYWx0PVwiJHtpbWFnZS5hbHR9XCIgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIGFyaWEtY29udHJvbHM9XCIke2xpZ2h0Ym94LmlkfVwiIC8+YDtcclxuICAgIHRoaXMudGh1bWJuYWlsTGlzdC5hcHBlbmRDaGlsZCh0aHVtYm5haWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgaW1hZ2VcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcclxuICAgKi9cclxuICBzZXRJbWFnZShzcmMpIHtcclxuICAgIHRoaXMuaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMgfHwgbm9JY29uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHRpdGxlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBzZXRJZChpZCkge1xyXG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XHJcbiAgICB0aGlzLnVzZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdGl0bGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxyXG4gICAqL1xyXG4gIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgbG9uZyBkZXNjcmlwdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgKi9cclxuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IHRleHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBleGFtcGxlIHVybFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxyXG4gICAqL1xyXG4gIHNldEV4YW1wbGUodXJsKSB7XHJcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XHJcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuZGVtb0J1dHRvbiwgIWlzRW1wdHkodXJsKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGlmIHRoZSBjb250ZW50IHR5cGUgaXMgaW5zdGFsbGVkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluc3RhbGxlZFxyXG4gICAqL1xyXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xyXG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLnVzZUJ1dHRvbiwgaW5zdGFsbGVkKTtcclxuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy5pbnN0YWxsQnV0dG9uLCAhaW5zdGFsbGVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICBoaWRlKCkge1xyXG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICBzaG93KCkge1xyXG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVEZXRhaWxWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlld1wiO1xyXG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSBcIi4uL2h1Yi1zZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XHJcblxyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWwge1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIHNlcnZpY2VzXHJcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcclxuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gdmlld3NcclxuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlRGV0YWlsVmlldyhzdGF0ZSk7XHJcbiAgICB0aGlzLnZpZXcub24oJ2luc3RhbGwnLCB0aGlzLmluc3RhbGwsIHRoaXMpO1xyXG5cclxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcclxuICAgIHRoaXMucHJvcGFnYXRlKFsnY2xvc2UnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlcyB0aGUgZGV0YWlsIHZpZXdcclxuICAgKi9cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy52aWV3LmhpZGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRoZSBkZXRhaWwgdmlld1xyXG4gICAqL1xyXG4gIHNob3coKSB7XHJcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxyXG4gICAqL1xyXG4gIGxvYWRCeUlkKGlkKSB7XHJcbiAgICB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxyXG4gICAgICAudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxyXG4gICAqL1xyXG4gICBpbnN0YWxsKHtpZH0pIHtcclxuICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcclxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKVxyXG4gICAgICAgLnRoZW4obWFjaGluZU5hbWUgPT4gdGhpcy5zZXJ2aWNlcy5pbnN0YWxsQ29udGVudFR5cGUobWFjaGluZU5hbWUpKVxyXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gY29uc29sZS5kZWJ1ZygnVE9ETywgZ3VpIHVwZGF0ZXMnKSlcclxuICAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGNvbnRlbnQgdHlwZSBkYXRhXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxyXG4gICAqL1xyXG4gIHVwZGF0ZShjb250ZW50VHlwZSkge1xyXG4gICAgdGhpcy52aWV3LnNldElkKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcclxuICAgIHRoaXMudmlldy5zZXRUaXRsZShjb250ZW50VHlwZS50aXRsZSk7XHJcbiAgICB0aGlzLnZpZXcuc2V0RGVzY3JpcHRpb24oY29udGVudFR5cGUuZGVzY3JpcHRpb24pO1xyXG4gICAgdGhpcy52aWV3LnNldEltYWdlKGNvbnRlbnRUeXBlLmljb24pO1xyXG4gICAgdGhpcy52aWV3LnNldEV4YW1wbGUoY29udGVudFR5cGUuZXhhbXBsZSk7XHJcbiAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQoISFjb250ZW50VHlwZS5pbnN0YWxsZWQpO1xyXG5cclxuICAgIC8vIHVwZGF0ZSBjYXJvdXNlbFxyXG4gICAgdGhpcy52aWV3LnJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwoKTtcclxuICAgIGNvbnRlbnRUeXBlLnNjcmVlbnNob3RzLmZvckVhY2godGhpcy52aWV3LmFkZEltYWdlVG9DYXJvdXNlbCwgdGhpcy52aWV3KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBnZXRFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcclxuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIHJlbW92ZUNoaWxkIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcclxuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xyXG5pbXBvcnQgbm9JY29uIGZyb20gJy4uLy4uL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnJztcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxyXG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0VmlldyB7XHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuXHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSByb290IGVsZW1lbnRcclxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWxpc3QnO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxyXG4gICAqL1xyXG4gIGhpZGUoKSB7XHJcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxyXG4gICAqL1xyXG4gIHNob3coKSB7XHJcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgcm93cyBmcm9tIHJvb3QgZWxlbWVudFxyXG4gICAqL1xyXG4gIHJlbW92ZUFsbFJvd3MoKSB7XHJcbiAgICB3aGlsZSh0aGlzLnJvb3RFbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSApe1xyXG4gICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMucm9vdEVsZW1lbnQubGFzdENoaWxkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSByb3dcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXHJcbiAgICovXHJcbiAgYWRkUm93KGNvbnRlbnRUeXBlKSB7XHJcbiAgICBjb25zdCByb3cgPSB0aGlzLmNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCB0aGlzKTtcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLCByb3cpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChyb3cpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUYWtlcyBhIENvbnRlbnQgVHlwZSBjb25maWd1cmF0aW9uIGFuZCBjcmVhdGVzIGEgcm93IGRvbVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcclxuICAgKiBAcGFyYW0ge0V2ZW50ZnVsfSBzY29wZVxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHNjb3BlKSB7XHJcbiAgICAvLyByb3cgaXRlbVxyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICBlbGVtZW50LmlkID0gYGNvbnRlbnQtdHlwZS0ke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfWA7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgYnV0dG9uIGNvbmZpZ1xyXG4gICAgY29uc3QgdXNlQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnVXNlJywgY2xzOiAnYnV0dG9uLXByaW1hcnknIH07XHJcbiAgICBjb25zdCBpbnN0YWxsQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnaW5zdGFsbCcsIGNsczogJ2J1dHRvbi1pbnZlcnNlLXByaW1hcnknfTtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRlbnRUeXBlLmluc3RhbGxlZCA/ICB1c2VCdXR0b25Db25maWc6IGluc3RhbGxCdXR0b25Db25maWc7XHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSBjb250ZW50VHlwZS50aXRsZSB8fCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gY29udGVudFR5cGUuc3VtbWFyeSB8fCAnJztcclxuXHJcbiAgICBjb25zdCBpbWFnZSA9IGNvbnRlbnRUeXBlLmljb24gfHwgbm9JY29uO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBodG1sXHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZX1cIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gJHtidXR0b24uY2xzfVwiIGRhdGEtaWQ9XCIke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfVwiIHRhYmluZGV4PVwiMFwiPiR7YnV0dG9uLnRleHR9PC9zcGFuPlxyXG4gICAgICA8aDQ+JHt0aXRsZX08L2g0PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke2Rlc2NyaXB0aW9ufTwvZGl2PlxyXG4gICBgO1xyXG5cclxuICAgIC8vIGhhbmRsZSB1c2UgYnV0dG9uXHJcbiAgICBjb25zdCB1c2VCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tcHJpbWFyeScpO1xyXG4gICAgaWYodXNlQnV0dG9uKXtcclxuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHNjb3BlLCB1c2VCdXR0b24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBnZXRFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZUxpc3RWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1saXN0LXZpZXdcIjtcclxuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcclxuXHJcbi8qKlxyXG4gKiBSb3cgc2VsZWN0ZWQgZXZlbnRcclxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcclxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cclxuICovXHJcbi8qKlxyXG4gKiBVcGRhdGUgY29udGVudCB0eXBlIGxpc3QgZXZlbnRcclxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcclxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cclxuICovXHJcbi8qKlxyXG4gKiBAY2xhc3NcclxuICogQG1peGVzIEV2ZW50ZnVsXHJcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XHJcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXHJcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3QjdXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3Qge1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIGFkZCB0aGUgdmlld1xyXG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVMaXN0VmlldyhzdGF0ZSk7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3Jvdy1zZWxlY3RlZCcsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGUgdGhpcyBlbGVtZW50XHJcbiAgICovXHJcbiAgaGlkZSgpIHtcclxuICAgIHRoaXMudmlldy5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IHRoaXMgZWxlbWVudFxyXG4gICAqL1xyXG4gIHNob3coKSB7XHJcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBsaXN0IHdpdGggbmV3IGNvbnRlbnQgdHlwZXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXHJcbiAgICovXHJcbiAgdXBkYXRlKGNvbnRlbnRUeXBlcykge1xyXG4gICAgdGhpcy52aWV3LnJlbW92ZUFsbFJvd3MoKTtcclxuICAgIGNvbnRlbnRUeXBlcy5mb3JFYWNoKHRoaXMudmlldy5hZGRSb3csIHRoaXMudmlldyk7XHJcbiAgICB0aGlzLmZpcmUoJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHt9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSB2aWV3cyByb290IGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJpbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcclxuICogQG1peGVzIEV2ZW50ZnVsXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50QnJvd3NlclZpZXcge1xyXG4gIC8qKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xyXG4gICAgY29uc3QgbWVudSA9IHRoaXMuY3JlYXRlTWVudUVsZW1lbnQoKTtcclxuICAgIGNvbnN0IGlucHV0R3JvdXAgPSB0aGlzLmNyZWF0ZUlucHV0R3JvdXBFbGVtZW50KCk7XHJcblxyXG4gICAgLy8gbWVudSBncm91cFxyXG4gICAgY29uc3QgbWVudUdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBtZW51R3JvdXAuY2xhc3NOYW1lID0gJ21lbnUtZ3JvdXAnO1xyXG4gICAgbWVudUdyb3VwLmFwcGVuZENoaWxkKG1lbnUpO1xyXG4gICAgbWVudUdyb3VwLmFwcGVuZENoaWxkKGlucHV0R3JvdXApO1xyXG5cclxuICAgIC8vIHJvb3QgZWxlbWVudFxyXG4gICAgdGhpcy5yb290RWxlbWVudCAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQobWVudUdyb3VwKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBtZW51IGl0ZW1cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBhZGRNZW51SXRlbSh0ZXh0KSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnVpdGVtJyk7XHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XHJcblxyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgdGhpcy5maXJlKCdtZW51LXNlbGVjdGVkJywge1xyXG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LnRhcmdldFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHNldHMgZmlyc3QgdG8gYmUgc2VsZWN0ZWRcclxuICAgIGlmKHRoaXMubWVudUJhckVsZW1lbnQuY2hpbGRFbGVtZW50Q291bnQgPCAxKSB7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgdG8gbWVudSBiYXJcclxuICAgIHRoaXMubWVudUJhckVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSBtZW51IGJhciBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtFbGVtZW50fVxyXG4gICAqL1xyXG4gIGNyZWF0ZU1lbnVFbGVtZW50KCkge1xyXG4gICAgdGhpcy5tZW51QmFyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51YmFyJyk7XHJcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50LmNsYXNzTmFtZSA9ICdoNXAtbWVudSc7XHJcblxyXG4gICAgY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xyXG4gICAgbmF2RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLm1lbnVCYXJFbGVtZW50KTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGl0bGUuY2xhc3NOYW1lID0gXCJtZW51LXRpdGxlXCI7XHJcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBcIkJyb3dzZSBjb250ZW50IHR5cGVzXCI7XHJcblxyXG4gICAgY29uc3QgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbWVudS5jbGFzc05hbWUgPSBcIm1lbnVcIjtcclxuICAgIG1lbnUuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgbWVudS5hcHBlbmRDaGlsZChuYXZFbGVtZW50KTtcclxuXHJcbiAgICByZXR1cm4gbWVudTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIGlucHV0IGdyb3VwIHVzZWQgZm9yIHNlYXJjaFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQoKSB7XHJcbiAgICAvLyBpbnB1dCBmaWVsZFxyXG4gICAgY29uc3QgaW5wdXRGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICBpbnB1dEZpZWxkLmlkID0gXCJodWItc2VhcmNoLWJhclwiO1xyXG4gICAgaW5wdXRGaWVsZC5jbGFzc05hbWUgPSAnZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1yb3VuZGVkJztcclxuICAgIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIFwiU2VhcmNoIGZvciBDb250ZW50IFR5cGVzXCIpO1xyXG4gICAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcclxuICAgICAgdGhpcy5maXJlKCdzZWFyY2gnLCB7XHJcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxyXG4gICAgICAgIHF1ZXJ5OiBldmVudC50YXJnZXQudmFsdWVcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBpbnB1dCBidXR0b25cclxuICAgIGNvbnN0IGlucHV0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpbnB1dEJ1dHRvbi5jbGFzc05hbWUgPSAnaW5wdXQtZ3JvdXAtYWRkb24gaWNvbi1zZWFyY2gnO1xyXG4gICAgaW5wdXRCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1iYXInKS5mb2N1cygpXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGlucHV0IGdyb3VwXHJcbiAgICBjb25zdCBpbnB1dEdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpbnB1dEdyb3VwLmNsYXNzTmFtZSA9ICdpbnB1dC1ncm91cCc7XHJcbiAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0RmllbGQpO1xyXG4gICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEJ1dHRvbik7XHJcblxyXG4gICAgcmV0dXJuIGlucHV0R3JvdXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgb2YgdGhlIGNvbnRlbnQgYnJvd3NlclxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwiaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvblZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLXNlY3Rpb24tdmlld1wiO1xyXG5pbXBvcnQgU2VhcmNoU2VydmljZSBmcm9tIFwiLi4vc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2VcIjtcclxuaW1wb3J0IENvbnRlbnRUeXBlTGlzdCBmcm9tICcuLi9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdCc7XHJcbmltcG9ydCBDb250ZW50VHlwZURldGFpbCBmcm9tICcuLi9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xyXG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMvZXJyb3JzJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKlxyXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIGFkZCB2aWV3XHJcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uVmlldyhzdGF0ZSk7XHJcblxyXG4gICAgLy8gY29udHJvbGxlclxyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2UoeyBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsIH0pO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsID0gbmV3IENvbnRlbnRUeXBlRGV0YWlsKHsgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybCB9KTtcclxuXHJcbiAgICAvLyBhZGQgbWVudSBpdGVtc1xyXG4gICAgWydNeSBDb250ZW50IFR5cGVzJywgJ05ld2VzdCcsICdNb3N0IFBvcHVsYXInLCAnUmVjb21tZW5kZWQnXVxyXG4gICAgICAuZm9yRWFjaChtZW51VGV4dCA9PiB0aGlzLnZpZXcuYWRkTWVudUl0ZW0obWVudVRleHQpKTtcclxuXHJcbiAgICAvLyBFbGVtZW50IGZvciBob2xkaW5nIGxpc3QgYW5kIGRldGFpbHMgdmlld3NcclxuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY29udGVudC10eXBlLXNlY3Rpb24nKTtcclxuXHJcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gc2VjdGlvbjtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZUxpc3QuZ2V0RWxlbWVudCgpKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZURldGFpbC5nZXRFbGVtZW50KCkpO1xyXG5cclxuICAgIHRoaXMudmlldy5nZXRFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5yb290RWxlbWVudCk7XHJcblxyXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0J10sIHRoaXMuY29udGVudFR5cGVMaXN0KTtcclxuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0J10sIHRoaXMuY29udGVudFR5cGVEZXRhaWwpO1xyXG5cclxuICAgIC8vIHJlZ2lzdGVyIGxpc3RlbmVyc1xyXG4gICAgdGhpcy52aWV3Lm9uKCdzZWFyY2gnLCB0aGlzLnNlYXJjaCwgdGhpcyk7XHJcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmFwcGx5U2VhcmNoRmlsdGVyLCB0aGlzKTtcclxuICAgIHRoaXMuY29udGVudFR5cGVMaXN0Lm9uKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLnNob3dEZXRhaWxWaWV3LCB0aGlzKTtcclxuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwub24oJ2Nsb3NlJywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignc2VsZWN0JywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuaW5pdENvbnRlbnRUeXBlTGlzdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdCB3aXRoIGEgc2VhcmNoXHJcbiAgICovXHJcbiAgaW5pdENvbnRlbnRUeXBlTGlzdCgpIHtcclxuICAgIC8vIGluaXRpYWxpemUgYnkgc2VhcmNoXHJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKFwiXCIpXHJcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZmlyZSgnZXJyb3InLCBlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhlY3V0ZXMgYSBzZWFyY2ggYW5kIHVwZGF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcclxuICAgKi9cclxuICBzZWFyY2goe3F1ZXJ5fSkge1xyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChxdWVyeSlcclxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3VsZCBhcHBseSBhIHNlYXJjaCBmaWx0ZXJcclxuICAgKi9cclxuICBhcHBseVNlYXJjaEZpbHRlcigpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0NvbnRlbnRUeXBlU2VjdGlvbjogbWVudSB3YXMgY2xpY2tlZCEnLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93cyBkZXRhaWwgdmlld1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICovXHJcbiAgc2hvd0RldGFpbFZpZXcoe2lkfSkge1xyXG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QuaGlkZSgpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5sb2FkQnlJZChpZCk7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLnNob3coKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZSBkZXRhaWwgdmlld1xyXG4gICAqL1xyXG4gIGNsb3NlRGV0YWlsVmlldygpIHtcclxuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuaGlkZSgpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Quc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxyXG5pbXBvcnQgaW5pdFRhYlBhbmVsIGZyb20gXCJjb21wb25lbnRzL3RhYi1wYW5lbFwiXHJcbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcclxuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcclxuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuL3V0aWxzL2V2ZW50cyc7XHJcbi8qKlxyXG4gKiBUYWIgY2hhbmdlIGV2ZW50XHJcbiAqIEBldmVudCBIdWJWaWV3I3RhYi1jaGFuZ2VcclxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cclxuICovXHJcbi8qKlxyXG4gKiBQYW5lbCBvcGVuIG9yIGNsb3NlIGV2ZW50XHJcbiAqIEBldmVudCBIdWJWaWV3I3BhbmVsLWNoYW5nZVxyXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxyXG4gKi9cclxuLyoqXHJcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxyXG4gKi9cclxuY29uc3QgQVRUUklCVVRFX0RBVEFfSUQgPSAnZGF0YS1pZCc7XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3NcclxuICogQG1peGVzIEV2ZW50ZnVsXHJcbiAqIEBmaXJlcyBIdWJWaWV3I3RhYi1jaGFuZ2VcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlZpZXcge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJUYWJQYW5lbChzdGF0ZSk7XHJcbiAgICB0aGlzLnJlbmRlclBhbmVsKHN0YXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlcyB0aGUgcGFuZWxcclxuICAgKi9cclxuICBjbG9zZVBhbmVsKCkge1xyXG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdGl0bGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxyXG4gICAqL1xyXG4gIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgcGFuZWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4cGFuZGVkXHJcbiAgICovXHJcbiAgcmVuZGVyUGFuZWwoe3RpdGxlID0gJycsIHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnRpdGxlLmNsYXNzTmFtZSArPSBcInBhbmVsLWhlYWRlciBpY29uLWh1Yi1pY29uXCI7XHJcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcclxuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YCk7XHJcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xyXG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3BhbmVsLWNoYW5nZScsIHRoaXMsIHRoaXMudGl0bGUpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuYm9keS5jbGFzc05hbWUgKz0gXCJwYW5lbC1ib2R5XCI7XHJcbiAgICB0aGlzLmJvZHkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xyXG4gICAgdGhpcy5ib2R5LmlkID0gYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YDtcclxuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSBgcGFuZWwgaDVwLXNlY3Rpb24tJHtzZWN0aW9uSWR9YDtcclxuICAgIGlmKGV4cGFuZGVkKXtcclxuICAgICAgdGhpcy5wYW5lbC5zZXRBdHRyaWJ1dGUoJ29wZW4nLCAnJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xyXG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmJvZHkpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lICs9IGBoNXAgaDVwLWh1YmA7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xyXG4gICAgaW5pdFBhbmVsKHRoaXMucm9vdEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGlmIHBhbmVsIGlzIG9wZW4sIHRoaXMgaXMgdXNlZCBmb3Igb3V0ZXIgYm9yZGVyIGNvbG9yXHJcbiAgICovXHJcbiAgdG9nZ2xlUGFuZWxPcGVuKCkge1xyXG4gICAgbGV0IHBhbmVsID0gdGhpcy5wYW5lbDtcclxuICAgIGlmKGlzT3BlbihwYW5lbCkpIHtcclxuICAgICAgcGFuZWwucmVtb3ZlQXR0cmlidXRlKCdvcGVuJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cGFuZWwucXVlcnlTZWxlY3RvcignI2h1Yi1zZWFyY2gtYmFyJykuZm9jdXMoKX0sMjApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgdGFiIHBhbmVsXHJcbiAgICovXHJcbiAgcmVuZGVyVGFiUGFuZWwoc3RhdGUpIHtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRhYmxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgdGhpcy50YWJsaXN0LmNsYXNzTmFtZSArPSBcInRhYmxpc3RcIjtcclxuICAgIHRoaXMudGFibGlzdC5zZXRBdHRyaWJ1dGUgKCdyb2xlJywgJ3RhYmxpc3QnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgdGhpcy50YWJMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xyXG4gICAgdGhpcy50YWJMaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxpc3QpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5jbGFzc05hbWUgKz0gJ3RhYi1wYW5lbCc7XHJcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50YWJMaXN0V3JhcHBlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgdGFiXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50XHJcbiAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIGFkZFRhYih7dGl0bGUsIGlkLCBjb250ZW50LCBzZWxlY3RlZCA9IGZhbHNlfSkge1xyXG4gICAgY29uc3QgdGFiSWQgPSBgdGFiLSR7aWR9YDtcclxuICAgIGNvbnN0IHRhYlBhbmVsSWQgPSBgdGFiLXBhbmVsLSR7aWR9YDtcclxuXHJcbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgdGFiLmNsYXNzTmFtZSArPSAndGFiJztcclxuICAgIHRhYi5pZCA9IHRhYklkO1xyXG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRhYlBhbmVsSWQpO1xyXG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHNlbGVjdGVkLnRvU3RyaW5nKCkpO1xyXG4gICAgdGFiLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfREFUQV9JRCwgaWQpO1xyXG4gICAgdGFiLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWInKTtcclxuICAgIHRhYi5pbm5lckhUTUwgPSB0aXRsZTtcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCd0YWItY2hhbmdlJywgdGhpcywgdGFiKTtcclxuXHJcbiAgICBjb25zdCB0YWJQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGFiUGFuZWwuaWQgPSB0YWJQYW5lbElkO1xyXG4gICAgdGFiUGFuZWwuY2xhc3NOYW1lICs9ICd0YWJwYW5lbCc7XHJcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFibGxlZGJ5JywgdGFiSWQpO1xyXG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghc2VsZWN0ZWQpLnRvU3RyaW5nKCkpO1xyXG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYnBhbmVsJyk7XHJcbiAgICB0YWJQYW5lbC5hcHBlbmRDaGlsZChjb250ZW50KTtcclxuXHJcbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQodGFiKTtcclxuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0YWJQYW5lbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGFuIGFuaW1hdGVkIGJvcmRlciB0byB0aGUgYm90dG9tIG9mIHRoZSB0YWJcclxuICAgKi9cclxuICBhZGRCb3R0b21Cb3JkZXIoKSB7XHJcbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcclxuICB9XHJcblxyXG4gIGluaXRUYWJQYW5lbCgpIHtcclxuICAgIGluaXRUYWJQYW5lbCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgc2VjdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICovXHJcbiAgc2V0U2VjdGlvblR5cGUoe2lkfSkge1xyXG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgPSBgaDVwLXNlY3Rpb24tJHtpZH0gcGFuZWxgO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJpbXBvcnQge2N1cnJ5fSBmcm9tICd1dGlscy9mdW5jdGlvbmFsJ1xyXG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSAnLi4vaHViLXNlcnZpY2VzJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3NcclxuICogVGhlIFNlYXJjaCBTZXJ2aWNlIGdldHMgYSBjb250ZW50IHR5cGUgZnJvbSBodWItc2VydmljZXMuanNcclxuICogaW4gdGhlIGZvcm0gb2YgYSBwcm9taXNlLiBJdCB0aGVuIGdlbmVyYXRlcyBhIHNjb3JlIGJhc2VkXHJcbiAqIG9uIHRoZSBkaWZmZXJlbnQgd2VpZ2h0aW5ncyBvZiB0aGUgY29udGVudCB0eXBlIGZpZWxkcyBhbmRcclxuICogc29ydHMgdGhlIHJlc3VsdHMgYmFzZWQgb24gdGhlIGdlbmVyYXRlZCBzY29yZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS5hcGlSb290VXJsXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xyXG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBZGQgY29udGVudCB0eXBlcyB0byB0aGUgc2VhcmNoIGluZGV4XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlcyA9IHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtcyBhIHNlYXJjaFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW10+fSBBIHByb21pc2Ugb2YgYW4gYXJyYXkgb2YgY29udGVudCB0eXBlc1xyXG4gICAqL1xyXG4gIHNlYXJjaChxdWVyeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29udGVudFR5cGVzLnRoZW4oZmlsdGVyQnlRdWVyeShxdWVyeSkpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbHRlcnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXMgYmFzZWQgb24gYSBxdWVyeVxyXG4gKiBAdHlwZSB7RnVuY3Rpb259XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxyXG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xyXG4gKi9cclxuY29uc3QgZmlsdGVyQnlRdWVyeSA9IGN1cnJ5KGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZXMpIHtcclxuICBpZiAocXVlcnkgPT0gJycpIHtcclxuICAgIHJldHVybiBjb250ZW50VHlwZXM7XHJcbiAgfVxyXG5cclxuICAvLyBBcHBlbmQgYSBzZWFyY2ggc2NvcmUgdG8gZWFjaCBjb250ZW50IHR5cGVcclxuICBjb250ZW50VHlwZXMgPSBjb250ZW50VHlwZXMubWFwKGNvbnRlbnRUeXBlID0+XHJcbiAgICAoe1xyXG4gICAgICBjb250ZW50VHlwZTogY29udGVudFR5cGUsXHJcbiAgICAgIHNjb3JlOiAwXHJcbiAgICB9KVxyXG4gICk7XHJcblxyXG4gIC8vIFRva2VuaXplIHF1ZXJ5IGFuZCBzYW5pdGl6ZVxyXG4gIGxldCBxdWVyaWVzID0gcXVlcnkuc3BsaXQoJyAnKS5maWx0ZXIocXVlcnkgPT4gcXVlcnkgIT09ICcnKTtcclxuXHJcbiAgLy8gTG9vcCB0aHJvdWdoIHF1ZXJpZXMgYW5kIGdlbmVyYXRlIGEgcmVsZXZhbmNlIHNjb3JlXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVyaWVzLmxlbmd0aDsgaSArKykge1xyXG4gICAgaWYgKGkgPiAwKSB7IC8vIFNlYXJjaCBhIHNtYWxsZXIgc3Vic2V0IGVhY2ggdGltZVxyXG4gICAgICBjb250ZW50VHlwZXMgPSBjb250ZW50VHlwZXMuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc2NvcmUgPiAwKTtcclxuICAgIH1cclxuICAgIGNvbnRlbnRUeXBlcy5mb3JFYWNoKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLnNjb3JlID0gZ2V0U2VhcmNoU2NvcmUocXVlcmllc1tpXSwgY29udGVudFR5cGUuY29udGVudFR5cGUpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb250ZW50VHlwZXNcclxuICAgIC5maWx0ZXIocmVzdWx0ID0+IHJlc3VsdC5zY29yZSA+IDApXHJcbiAgICAuc29ydChzb3J0U2VhcmNoUmVzdWx0cykgLy8gU29ydCBieSBpbnN0YWxsZWQsIHJlbGV2YW5jZSBhbmQgcG9wdWxhcml0eVxyXG4gICAgLm1hcChyZXN1bHQgPT4gcmVzdWx0LmNvbnRlbnRUeXBlKTsgLy8gVW53cmFwIHJlc3VsdCBvYmplY3Q7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIENhbGxiYWNrIGZvciBBcnJheS5zb3J0KClcclxuICogQ29tcGFyZXMgdHdvIGNvbnRlbnQgdHlwZXMgb24gZGlmZmVyZW50IGNyaXRlcmlhXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIEZpcnN0IGNvbnRlbnQgdHlwZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gYiBTZWNvbmQgY29udGVudCB0eXBlXHJcbiAqIEByZXR1cm4ge2ludH1cclxuICovXHJcbmNvbnN0IHNvcnRTZWFyY2hSZXN1bHRzID0gKGEsYikgPT4ge1xyXG4gIGlmICghYS5jb250ZW50VHlwZS5pbnN0YWxsZWQgJiYgYi5jb250ZW50VHlwZS5pbnN0YWxsZWQpIHtcclxuICAgIHJldHVybiAxO1xyXG4gIH1cclxuXHJcbiAgZWxzZSBpZiAoYi5zY29yZSAhPT0gYS5zY29yZSkge1xyXG4gICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlO1xyXG4gIH1cclxuXHJcbiAgZWxzZSB7XHJcbiAgICByZXR1cm4gYi5jb250ZW50VHlwZS5wb3B1bGFyaXR5IC0gYS5jb250ZW50VHlwZS5wb3B1bGFyaXR5O1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHdlaWdodGluZyBmb3IgZGlmZmVyZW50IHNlYXJjaCB0ZXJtcyBiYXNlZFxyXG4gKiBvbiBleGlzdGVuY2Ugb2Ygc3Vic3RyaW5nc1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHF1ZXJ5XHJcbiAqIEBwYXJhbSAge09iamVjdH0gY29udGVudFR5cGVcclxuICogQHJldHVybiB7aW50fVxyXG4gKi9cclxuIGNvbnN0IGdldFNlYXJjaFNjb3JlID0gZnVuY3Rpb24ocXVlcnksIGNvbnRlbnRUeXBlKSB7XHJcbiAgIGNvbnNvbGUubG9nKGNvbnRlbnRUeXBlKTtcclxuICAgcXVlcnkgPSBxdWVyeS50cmltKCk7XHJcbiAgIGxldCBzY29yZSA9IDA7XHJcbiAgIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLnRpdGxlKSkge1xyXG4gICAgIHNjb3JlICs9IDEwMDtcclxuICAgfVxyXG4gICBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5zdW1tYXJ5KSkge1xyXG4gICAgIHNjb3JlICs9IDU7XHJcbiAgIH1cclxuICAgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuZGVzY3JpcHRpb24pKSB7XHJcbiAgICAgc2NvcmUgKz0gNTtcclxuICAgfVxyXG4gICBpZiAoYXJyYXlIYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmtleXdvcmRzKSkge1xyXG4gICAgICAgc2NvcmUgKz0gNTtcclxuICAgfVxyXG4gICByZXR1cm4gc2NvcmU7XHJcbiB9O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIG5lZWRsZSBpcyBmb3VuZCBpbiB0aGUgaGF5c3RhY2suXHJcbiAqIE5vdCBjYXNlIHNlbnNpdGl2ZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmVlZGxlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXlzdGFja1xyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuY29uc3QgaGFzU3ViU3RyaW5nID0gZnVuY3Rpb24obmVlZGxlLCBoYXlzdGFjaykge1xyXG4gIGlmIChoYXlzdGFjayA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaGF5c3RhY2sudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5lZWRsZS50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XHJcbn07XHJcblxyXG4vKipcclxuICogSGVscGVyIGZ1bmN0aW9uLCBjaGVja3MgaWYgYXJyYXkgaGFzIGNvbnRhaW5zIGEgc3Vic3RyaW5nXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gc3ViU3RyaW5nXHJcbiAqIEBwYXJhbSAge0FycmF5fSBhcnJcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmNvbnN0IGFycmF5SGFzU3ViU3RyaW5nID0gZnVuY3Rpb24oc3ViU3RyaW5nLCBhcnIpIHtcclxuICBpZiAoYXJyID09PSB1bmRlZmluZWQgfHwgc3ViU3RyaW5nID09PSAnJykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGFyci5zb21lKHN0cmluZyA9PiBoYXNTdWJTdHJpbmcoc3ViU3RyaW5nLCBzdHJpbmcpKTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJpbXBvcnQgSHViU2VydmljZXMgZnJvbSAnLi4vaHViLXNlcnZpY2VzJztcclxuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICpcclxuICogQGZpcmVzIEh1YiN1cGxvYWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xyXG5cclxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIHNlcnZpY2VzXHJcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcclxuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSW5wdXQgZWxlbWVudCBmb3IgdGhlIEg1UCBmaWxlXHJcbiAgICBjb25zdCBoNXBVcGxvYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgaDVwVXBsb2FkLnNldEF0dHJpYnV0ZSgndHlwZScsICdmaWxlJyk7XHJcblxyXG4gICAgLy8gU2VuZHMgdGhlIEg1UCBmaWxlIHRvIHRoZSBwbHVnaW5cclxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdXNlQnV0dG9uLnRleHRDb250ZW50ID0gJ1VzZSc7XHJcbiAgICB1c2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblxyXG4gICAgICAvLyBBZGQgdGhlIEg1UCBmaWxlIHRvIGEgZm9ybSwgcmVhZHkgZm9yIHRyYW5zcG9ydGF0aW9uXHJcbiAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgZGF0YS5hcHBlbmQoJ2g1cCcsIGg1cFVwbG9hZC5maWxlc1swXSk7XHJcblxyXG4gICAgICAvLyBVcGxvYWQgY29udGVudCB0byB0aGUgcGx1Z2luXHJcbiAgICAgIHRoaXMuc2VydmljZXMudXBsb2FkQ29udGVudChkYXRhKVxyXG4gICAgICAgIC50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgLy8gRmlyZSB0aGUgcmVjZWl2ZWQgZGF0YSB0byBhbnkgbGlzdGVuZXJzXHJcbiAgICAgICAgICBzZWxmLmZpcmUoJ3VwbG9hZCcsIGpzb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChoNXBVcGxvYWQpO1xyXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh1c2VCdXR0b24pO1xyXG5cclxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBlbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUgfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XHJcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xyXG5cclxuLyoqXHJcbiAqIEBjb25zdGFudFxyXG4gKi9cclxuY29uc3QgQVRUUklCVVRFX1NJWkUgPSAnZGF0YS1zaXplJztcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBkaXNhYmxlID0gc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBlbmFibGUgPSByZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWRcclxuICovXHJcbmNvbnN0IHRvZ2dsZUVuYWJsZWQgPSAoZWxlbWVudCwgZW5hYmxlZCkgPT4gKGVuYWJsZWQgPyBlbmFibGUgOiBkaXNhYmxlKShlbGVtZW50KTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlkZGVuXHJcbiAqL1xyXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gY3VycnkoKGhpZGRlbiwgZWxlbWVudCkgPT4gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGhpZGRlbi50b1N0cmluZygpLCBlbGVtZW50KSk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3QgaXNEaXNhYmxlZCA9IGhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgdGhlIHZpZXdcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0ge0ltYWdlU2Nyb2xsZXJTdGF0ZX0gc3RhdGVcclxuICovXHJcbmNvbnN0IHVwZGF0ZVZpZXcgPSAoZWxlbWVudCwgc3RhdGUpID0+IHtcclxuICBjb25zdCBwcmV2QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMnKTtcclxuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xyXG4gIGNvbnN0IGxpc3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XHJcbiAgY29uc3QgdG90YWxDb3VudCA9IGxpc3QuY2hpbGRFbGVtZW50Q291bnQ7XHJcblxyXG4gIC8vIHVwZGF0ZSBsaXN0IHNpemVzXHJcbiAgbGlzdC5zdHlsZS53aWR0aCA9IGAkezEwMCAvIHN0YXRlLmRpc3BsYXlDb3VudCAqIHRvdGFsQ291bnR9JWA7XHJcbiAgbGlzdC5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7c3RhdGUucG9zaXRpb24gKiAoMTAwIC8gc3RhdGUuZGlzcGxheUNvdW50KX0lYDtcclxuXHJcbiAgLy8gdXBkYXRlIGltYWdlIHNpemVzXHJcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXHJcbiAgICAuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHsxMDAgLyB0b3RhbENvdW50fSVgKTtcclxuXHJcbiAgLy8gdG9nZ2xlIGJ1dHRvbiB2aXNpYmlsaXR5XHJcbiAgW3ByZXZCdXR0b24sIG5leHRCdXR0b25dXHJcbiAgICAuZm9yRWFjaCh0b2dnbGVWaXNpYmlsaXR5KHN0YXRlLmRpc3BsYXlDb3VudCA+PSB0b3RhbENvdW50KSk7XHJcblxyXG4gIC8vIHRvZ2dsZSBidXR0b24gZW5hYmxlLCBkaXNhYmxlZFxyXG4gIHRvZ2dsZUVuYWJsZWQobmV4dEJ1dHRvbiwgc3RhdGUucG9zaXRpb24gPiAoc3RhdGUuZGlzcGxheUNvdW50IC0gdG90YWxDb3VudCkpO1xyXG4gIHRvZ2dsZUVuYWJsZWQocHJldkJ1dHRvbiwgc3RhdGUucG9zaXRpb24gPCAwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIGJ1dHRvbiBjbGlja2VkXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHVwZGF0ZVN0YXRlXHJcbiAqIEBwYXJhbSB7RXZlbnR9XHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IG9uQnV0dG9uQ2xpY2sgPSBjdXJyeSgoZWxlbWVudCwgc3RhdGUsIHVwZGF0ZVN0YXRlLCBldmVudCkgPT4ge1xyXG4gIGlmKCFpc0Rpc2FibGVkKGV2ZW50LnRhcmdldCkpe1xyXG4gICAgdXBkYXRlU3RhdGUoc3RhdGUpO1xyXG4gICAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcclxuICAvKipcclxuICAgKiBAdHlwZWRlZiB7b2JqZWN0fSBJbWFnZVNjcm9sbGVyU3RhdGVcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gZGlzcGxheUNvdW50XHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHBvc2l0aW9uXHJcbiAgICovXHJcbiAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxyXG4gICAgcG9zaXRpb246IDBcclxuICB9O1xyXG5cclxuICAvLyBpbml0aWFsaXplIGJ1dHRvbnNcclxuICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkJ1dHRvbkNsaWNrKGVsZW1lbnQsIHN0YXRlLCBzdGF0ZSA9PiBzdGF0ZS5wb3NpdGlvbi0tKSk7XHJcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQnV0dG9uQ2xpY2soZWxlbWVudCwgc3RhdGUsIHN0YXRlID0+IHN0YXRlLnBvc2l0aW9uKyspKTtcclxuXHJcbiAgLy8gaW5pdGlhbGl6ZSBpbWFnZXNcclxuICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1thcmlhLWNvbnRyb2xzXScpXHJcbiAgICAuZm9yRWFjaChpbWFnZSA9PiB7XHJcbiAgICAgIGxldCB0YXJnZXRJZCA9IGltYWdlLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0YXJnZXRJZH1gKTtcclxuXHJcbiAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XHJcbiAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKSlcclxuICAgIH0pO1xyXG5cclxuICAvLyBsaXN0ZW4gZm9yIHVwZGF0ZXMgdG8gZGF0YS1zaXplXHJcbiAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZm9yRWFjaChyZWNvcmQgPT4ge1xyXG4gICAgdXBkYXRlVmlldyhlbGVtZW50LCBPYmplY3QuYXNzaWduKHN0YXRlLCB7XHJcbiAgICAgIHBvc2l0aW9uOiAwLFxyXG4gICAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKVxyXG4gICAgfSkpO1xyXG4gIH0pKTtcclxuXHJcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCB7XHJcbiAgICBzdWJ0cmVlOiB0cnVlLFxyXG4gICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxyXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbQVRUUklCVVRFX1NJWkVdXHJcbiAgfSk7XHJcblxyXG4gIC8vIGluaXRpYWxpemUgcG9zaXRpb25cclxuICB1cGRhdGVWaWV3KGVsZW1lbnQsIHN0YXRlKTtcclxuXHJcbiAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xyXG5pbXBvcnQge2ZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKSk7XHJcblxyXG4vKipcclxuICogSW5pdGlhdGVzIGEgdGFiIHBhbmVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xyXG4gIGNvbnN0IHRhYnMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFiXCJdJyk7XHJcbiAgY29uc3QgdGFiUGFuZWxzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYnBhbmVsXCJdJyk7XHJcblxyXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xyXG4gICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICB1blNlbGVjdEFsbCh0YWJzKTtcclxuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XHJcblxyXG4gICAgICBoaWRlQWxsKHRhYlBhbmVscyk7XHJcblxyXG4gICAgICBsZXQgdGFiUGFuZWxJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcclxuICAgICAgc2hvdyhlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhYlBhbmVsSWR9YCkpO1xyXG4gICAgfSk7XHJcbiAgfSlcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJyZXF1aXJlKCcuLi8uLi9zcmMvc3R5bGVzL21haW4uc2NzcycpO1xyXG5cclxuLy8gTG9hZCBsaWJyYXJ5XHJcbkg1UCA9IEg1UCB8fCB7fTtcclxuSDVQLkh1YkNsaWVudCA9IHJlcXVpcmUoJy4uL3NjcmlwdHMvaHViJykuZGVmYXVsdDtcclxuSDVQLkh1YkNsaWVudC5yZW5kZXJFcnJvck1lc3NhZ2UgPSByZXF1aXJlKCcuLi9zY3JpcHRzL3V0aWxzL2Vycm9ycycpLmRlZmF1bHQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwic291cmNlUm9vdCI6IiJ9