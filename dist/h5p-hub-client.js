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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeListToArray = exports.classListContains = exports.removeChild = exports.querySelectorAll = exports.querySelector = exports.appendChild = exports.toggleAttribute = exports.attributeEquals = exports.hasAttribute = exports.removeAttribute = exports.setAttribute = exports.getAttribute = undefined;

var _functional = __webpack_require__(0);

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
  return el.setAttribute(name, value);
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
  return el.removeAttribute(name);
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
 * The removeChild() method removes a child node from the DOM. Returns removed node.
 *
 * @param {Node} parent
 * @param {Node} oldChild
 *
 * @return {Node}
 */
var removeChild = exports.removeChild = (0, _functional.curry)(function (parent, oldChild) {
  return parent.removeChild(oldChild);
});

/**
 * Returns true if a node has a class
 *
 * @param {string} cls
 * @param {HTMLElement} el
 *
 * @function
 */
var classListContains = exports.classListContains = (0, _functional.curry)(function (cls, el) {
  return el.classList.contains(cls);
});

/**
 * Transforms a NodeList to an Array
 *
 * @param {NodeList} nodeList
 *
 * @return {Node[]}
 */
var nodeListToArray = exports.nodeListToArray = function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
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

var _functional = __webpack_require__(0);

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

var _functional = __webpack_require__(0);

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

var _eventful = __webpack_require__(1);

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

throw new Error("Module build failed: Error\n    at /Users/timothylim/repos/development/h5p-hub-client/node_modules/webpack/lib/NormalModule.js:141:35\n    at /Users/timothylim/repos/development/h5p-hub-client/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /Users/timothylim/repos/development/h5p-hub-client/node_modules/loader-runner/lib/LoaderRunner.js:230:18\n    at context.callback (/Users/timothylim/repos/development/h5p-hub-client/node_modules/loader-runner/lib/LoaderRunner.js:111:13)\n    at Object.asyncSassJobQueue.push [as callback] (/Users/timothylim/repos/development/h5p-hub-client/node_modules/sass-loader/lib/loader.js:57:13)\n    at Object.<anonymous> (/Users/timothylim/repos/development/h5p-hub-client/node_modules/async/dist/async.js:2237:31)\n    at apply (/Users/timothylim/repos/development/h5p-hub-client/node_modules/async/dist/async.js:20:25)\n    at Object.<anonymous> (/Users/timothylim/repos/development/h5p-hub-client/node_modules/async/dist/async.js:56:12)\n    at Object.callback (/Users/timothylim/repos/development/h5p-hub-client/node_modules/async/dist/async.js:843:16)\n    at options.error (/Users/timothylim/repos/development/h5p-hub-client/node_modules/node-sass/lib/index.js:294:32)");

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

var _functional = __webpack_require__(0);

var _eventful = __webpack_require__(1);

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
 * @constant {number}
 */
var MAX_TEXT_SIZE_DESCRIPTION = 300;

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

    // create view
    this.rootElement = this.createView();

    // grab references
    this.useButton = this.rootElement.querySelector('.button-use');
    this.installButton = this.rootElement.querySelector('.button-install');
    this.image = this.rootElement.querySelector('.content-type-image');
    this.title = this.rootElement.querySelector('.text-details h3');
    this.owner = this.rootElement.querySelector('.owner');
    this.description = this.rootElement.querySelector('.text-details .small');
    this.demoButton = this.rootElement.querySelector('.demo-button');
    this.carousel = this.rootElement.querySelector('.carousel');
    this.carouselList = this.carousel.querySelector('ul');
    this.licencePanel = this.rootElement.querySelector('.licence-panel');

    // init interactive elements
    (0, _panel2.default)(this.licencePanel);
    (0, _imageScroller2.default)(this.carousel);

    // fire events on button click
    (0, _events.relayClickEventAs)('close', this, this.rootElement.querySelector('.back-button'));
    (0, _events.relayClickEventAs)('select', this, this.useButton);
    (0, _events.relayClickEventAs)('install', this, this.installButton);
  }

  /**
   * Creates the view as a HTMLElement
   *
   * @return {HTMLElement}
   */


  _createClass(ContentTypeDetailView, [{
    key: "createView",
    value: function createView() {
      var element = document.createElement('div');
      element.className = 'content-type-detail';
      element.setAttribute('aria-hidden', 'true');
      element.innerHTML = "\n      <div class=\"back-button icon-arrow-thick\"></div>\n      <div class=\"container\">\n        <div class=\"image-wrapper\"><img class=\"img-responsive content-type-image\" src=\"" + _contentTypePlaceholder2.default + "\"></div>\n        <div class=\"text-details\">\n          <h3></h3>\n          <div class=\"owner\"></div>\n          <p class=\"small\"></p>\n          <a class=\"button demo-button\" target=\"_blank\" aria-hidden=\"false\" href=\"https://h5p.org/chart\">Content Demo</a>\n        </div>\n      </div>\n      <div class=\"carousel\" role=\"region\" data-size=\"5\">\n        <span class=\"carousel-button previous\" aria-hidden=\"true\" disabled><span class=\"icon-arrow-thick\"></span></span>\n        <span class=\"carousel-button next\" aria-hidden=\"true\" disabled><span class=\"icon-arrow-thick\"></span></span>\n        <nav class=\"scroller\">\n          <ul></ul>\n        </nav>\n      </div>\n      <hr />\n      <div class=\"button-bar\">\n        <span class=\"button button-primary button-use\" aria-hidden=\"false\" data-id=\"H5P.Chart\">Use</span>\n        <span class=\"button button-inverse-primary button-install\" aria-hidden=\"true\" data-id=\"H5P.Chart\"><span class=\"icon-arrow-thick\"></span>Install</span>\n      </div>\n      <div class=\"panel-group\">\n        <div class=\"panel licence-panel\" aria-hidden=\"true\">\n          <div class=\"panel-header\" aria-expanded=\"false\" aria-controls=\"licence-panel\"><span class=\"icon-accordion-arrow\"></span> The Licence Info</div>\n          <div class=\"panel-body\" id=\"licence-panel\" aria-hidden=\"true\">\n            <div class=\"panel-body-inner\"></div>\n          </div>\n        </div>\n      </div>";

      return element;
    }

    /**
     * Removes all images from the carousel
     */

  }, {
    key: "removeAllImagesInCarousel",
    value: function removeAllImagesInCarousel() {
      this.carouselList.querySelectorAll('li').forEach((0, _elements.removeChild)(this.carouselList));
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
      lightbox.id = "lightbox-" + this.carouselList.childElementCount;
      lightbox.className = 'carousel-lightbox';
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.innerHTML = "<img class=\"img-responsive\" src=\"" + image.url + "\" alt=\"" + image.alt + "\">";
      this.carousel.appendChild(lightbox);

      // add thumbnail
      var thumbnail = document.createElement('li');
      thumbnail.className = 'slide';
      thumbnail.innerHTML = "<img src=\"" + image.url + "\" alt=\"" + image.alt + "\" class=\"img-responsive\" aria-controls=\"" + lightbox.id + "\" />";
      this.carouselList.appendChild(thumbnail);
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
      this.title.innerHTML = "" + title;
    }

    /**
     * Sets the long description
     *
     * @param {string} text
     */

  }, {
    key: "setDescription",
    value: function setDescription(text) {
      var _this = this;

      if (text.length > MAX_TEXT_SIZE_DESCRIPTION) {
        this.description.innerHTML = this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text) + " <span class=\"read-more link\">Read more</span>";
        this.description.querySelector('.read-more, .read-less').addEventListener('click', function () {
          return _this.toggleDescriptionExpanded(text);
        });
        this.descriptionExpanded = false;
      } else {
        this.description.innerText = text;
      }
    }

    /**
     * Toggles Read less and Read more text
     *
     * @param {string} text
     */

  }, {
    key: "toggleDescriptionExpanded",
    value: function toggleDescriptionExpanded(text) {
      var _this2 = this;

      // flip boolean
      this.descriptionExpanded = !this.descriptionExpanded;

      if (this.descriptionExpanded) {
        this.description.innerHTML = text + " <span class=\"read-less link\">Read less</span>";
      } else {
        this.description.innerHTML = this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text) + " <span class=\"read-more link\">Read more</span>";
      }

      this.description.querySelector('.read-more, .read-less').addEventListener('click', function () {
        return _this2.toggleDescriptionExpanded(text);
      });
    }

    /**
     * Shortens a string, and puts an elipsis at the end
     *
     * @param {number} size
     * @param {string} text
     */

  }, {
    key: "ellipsis",
    value: function ellipsis(size, text) {
      return text.substr(0, size) + "...";
    }

    /**
     * Sets the licence
     *
     * @param {string} type
     */

  }, {
    key: "setLicence",
    value: function setLicence(type) {
      if (type) {
        this.licencePanel.querySelector('.panel-body-inner').innerText = type;
        _show(this.licencePanel);
      } else {
        _hide(this.licencePanel);
      }
    }

    /**
     * Sets the long description
     *
     * @param {string} owner
     */

  }, {
    key: "setOwner",
    value: function setOwner(owner) {
      if (owner) {
        this.owner.innerHTML = "By " + owner;
      } else {
        this.owner.innerHTML = '';
      }
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

var _eventful = __webpack_require__(1);

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
        return console.debug('TODO, gui updates', contentType);
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
      this.view.setOwner(contentType.owner);
      this.view.setIsInstalled(!!contentType.installed);
      this.view.setLicence(contentType.license);

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

var _functional = __webpack_require__(0);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(1);

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
      var useButtonConfig = { text: 'Use', cls: 'button-primary', icon: '' };
      var installButtonConfig = { text: 'install', cls: 'button-inverse-primary button-install', icon: 'icon-arrow-thick' };
      var button = contentType.installed ? useButtonConfig : installButtonConfig;

      var title = contentType.title || contentType.machineName;
      var description = contentType.summary || '';

      var image = contentType.icon || _contentTypePlaceholder2.default;

      // create html
      element.innerHTML = "\n      <img class=\"img-responsive\" src=\"" + image + "\">\n      <span class=\"button " + button.cls + "\" data-id=\"" + contentType.machineName + "\" tabindex=\"0\"><span class=\"" + button.icon + "\"></span>" + button.text + "</span>\n      <h4>" + title + "</h4>\n      <div class=\"description\">" + description + "</div>\n   ";

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

var _eventful = __webpack_require__(1);

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

var _elements = __webpack_require__(2);

var _menu = __webpack_require__(20);

var _menu2 = _interopRequireDefault(_menu);

var _eventful = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    this.menu = this.createMenuElement();
    this.inputGroup = this.createInputGroupElement();

    // menu group
    var menuGroup = document.createElement('div');
    menuGroup.className = 'menu-group';
    menuGroup.appendChild(this.menu);
    menuGroup.appendChild(this.inputGroup);

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
      if (this.menuBarElement.childElementCount == 1) {
        element.setAttribute('aria-selected', 'true');
      }

      // add to menu bar
      this.menuBarElement.appendChild(element);

      return element;
    }

    /**
     * Adds an animated border to the bottom of the tab
     */

  }, {
    key: 'addBottomBorder',
    value: function addBottomBorder() {
      this.menuBarElement.appendChild(document.createElement('span'));
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
     * Clears the input field
     */

  }, {
    key: 'clearInputField',
    value: function clearInputField() {
      this.inputGroup.querySelector('#hub-search-bar').value = '';
    }

    /**
     * Checks if a menu item is the first child in the menu
     *
     * @param  {HTMLElement} menuItem
     * @return {boolean}
     */

  }, {
    key: 'isFirstMenuItem',
    value: function isFirstMenuItem(menuItem) {
      return menuItem === this.menu.querySelectorAll('[role="menuitem"]')[0];
    }

    /**
     * Ensures the first menu item is selected
     */

  }, {
    key: 'resetMenuSelection',
    value: function resetMenuSelection() {
      var _this3 = this;

      this.menu.querySelectorAll('[role="menuitem"]').forEach(function (menuItem) {
        return menuItem.setAttribute('aria-selected', _this3.isFirstMenuItem(menuItem).toString());
      });
    }
  }, {
    key: 'initMenu',
    value: function initMenu() {
      (0, _menu2.default)(this.rootElement);
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

var _eventful = __webpack_require__(1);

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
    ['All', 'My Content Types', 'Most Popular'].forEach(function (menuText) {
      return _this.view.addMenuItem(menuText);
    });
    this.view.addBottomBorder();
    this.view.initMenu();

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
    this.view.on('search', this.resetMenuSelection, this);
    this.view.on('menu-selected', this.applySearchFilter, this);
    this.view.on('menu-selected', this.clearInputField, this);
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
     *  Ensures the first menu element is selected
     */

  }, {
    key: "resetMenuSelection",
    value: function resetMenuSelection() {
      this.view.resetMenuSelection();
    }

    /**
     * Should apply a search filter
     */

  }, {
    key: "applySearchFilter",
    value: function applySearchFilter() {
      console.debug('ContentTypeSection: menu was clicked!', event);
    }
  }, {
    key: "clearInputField",
    value: function clearInputField(_ref2) {
      var element = _ref2.element;

      if (!this.view.isFirstMenuItem(element)) {
        this.view.clearInputField(element);
      }
    }

    /**
     * Shows detail view
     *
     * @param {string} id
     */

  }, {
    key: "showDetailView",
    value: function showDetailView(_ref3) {
      var id = _ref3.id;

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

var _tabPanel = __webpack_require__(21);

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _functional = __webpack_require__(0);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(1);

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

var _functional = __webpack_require__(0);

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
  return contentTypes.map(function (contentType) {
    return {
      contentType: contentType,
      score: getSearchScore(query, contentType)
    };
  }).filter(function (result) {
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
  }

  if (a.contentType.installed && !b.contentType.installed) {
    return -1;
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
  var queries = query.split(' ').filter(function (query) {
    return query !== '';
  });
  var queryScores = queries.map(function (query) {
    return getScoreForEachQuery(query, contentType);
  });
  if (queryScores.indexOf(0) > -1) {
    return 0;
  }
  return queryScores.reduce(function (a, b) {
    return a + b;
  }, 0);
};

/**
 * Generates a relevance score for a single string
 *
 * @param  {type} query       description
 * @param  {type} contentType description
 * @return {type}             description
 */
var getScoreForEachQuery = function getScoreForEachQuery(query, contentType) {
  query = query.trim();
  if (hasSubString(query, contentType.title)) {
    return 100;
  } else if (hasSubString(query, contentType.summary)) {
    return 5;
  } else if (hasSubString(query, contentType.description)) {
    return 5;
  } else if (arrayHasSubString(query, contentType.keywords)) {
    return 5;
  } else {
    return 0;
  }
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

var AddNumber = function AddNumber(a, b) {
  return a + b;
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

var _eventful = __webpack_require__(1);

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

var _functional = __webpack_require__(0);

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
 * @function
 */
var onNavigationButtonClick = (0, _functional.curry)(function (element, state, updateState, event) {
  if (!isDisabled(event.target)) {
    updateState(state);
    updateView(element, state);
  }
});

var initImage = (0, _functional.curry)(function (element, image) {
  var targetId = image.getAttribute('aria-controls');
  var target = element.querySelector('#' + targetId);

  target.addEventListener('click', function (event) {
    return target.setAttribute('aria-hidden', 'true');
  });
  image.addEventListener('click', function (event) {
    return target.setAttribute('aria-hidden', 'false');
  });
});

/**
 * Callback for when the dom is updated
 *
 * @param {HTMLElement} element
 * @param {ImageScrollerState} state
 * @param {MutationRecord} record
 * @function
 */
var handleDomUpdate = (0, _functional.curry)(function (element, state, record) {
  // on add image run initialization
  if (record.type === 'childList') {
    (0, _elements.nodeListToArray)(record.addedNodes).filter((0, _elements.classListContains)('slide')).map((0, _elements.querySelector)('img')).forEach(initImage(element));
  }

  // update the view
  updateView(element, _extends(state, {
    displayCount: element.getAttribute(ATTRIBUTE_SIZE) || 5,
    position: 0
  }));
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
  element.querySelector('.next').addEventListener('click', onNavigationButtonClick(element, state, function (state) {
    return state.position--;
  }));
  element.querySelector('.previous').addEventListener('click', onNavigationButtonClick(element, state, function (state) {
    return state.position++;
  }));

  // initialize images
  element.querySelectorAll('[aria-controls]').forEach(initImage(element));

  // listen for updates to data-size
  var observer = new MutationObserver((0, _functional.forEach)(handleDomUpdate(element, state)));

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

var _functional = __webpack_require__(0);

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
  var menuItems = element.querySelectorAll('[role="menuitem"]');

  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener('click', function (event) {
      console.log('click');
      unSelectAll(menuItems);
      event.target.setAttribute('aria-selected', 'true');
    });
  });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(0);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(8).default;
H5P.HubClient.renderErrorMessage = __webpack_require__(4).default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzAxNjk2Y2NmNGE1OTNmZTRiZDgiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9taXhpbnMvZXZlbnRmdWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL21lbnUuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudHJpZXMvZGlzdC5qcyJdLCJuYW1lcyI6WyJjdXJyeSIsImZuIiwiYXJpdHkiLCJsZW5ndGgiLCJmMSIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFwcGx5IiwiZjIiLCJhcmdzMiIsImNvbmNhdCIsImNvbXBvc2UiLCJmbnMiLCJyZWR1Y2UiLCJmIiwiZyIsImZvckVhY2giLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJFdmVudGZ1bCIsImxpc3RlbmVycyIsIm9uIiwidHlwZSIsImxpc3RlbmVyIiwic2NvcGUiLCJ0cmlnZ2VyIiwicHVzaCIsImZpcmUiLCJldmVudCIsInRyaWdnZXJzIiwiZXZlcnkiLCJwcm9wYWdhdGUiLCJ0eXBlcyIsImV2ZW50ZnVsIiwic2VsZiIsImdldEF0dHJpYnV0ZSIsIm5hbWUiLCJlbCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsImF0dHJpYnV0ZUVxdWFscyIsInRvZ2dsZUF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicGFyZW50IiwiY2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlQ2hpbGQiLCJvbGRDaGlsZCIsImNsYXNzTGlzdENvbnRhaW5zIiwiY2xzIiwiY2xhc3NMaXN0Iiwibm9kZUxpc3RUb0FycmF5Iiwibm9kZUxpc3QiLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJ3aW5kb3ciLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZXMiLCJjb250ZW50VHlwZSIsImlkIiwibnMiLCJnZXRBamF4VXJsIiwiYm9keSIsImZvcm1EYXRhIiwicmVuZGVyRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNsb3NlQnV0dG9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibWVzc2FnZUNvbnRlbnQiLCJ0aXRsZSIsImNvbnRlbnQiLCJtZXNzYWdlV3JhcHBlciIsImRpc21pc3NpYmxlIiwiYnV0dG9uIiwidW5kZWZpbmVkIiwibWVzc2FnZUJ1dHRvbiIsInJlbGF5Q2xpY2tFdmVudEFzIiwiZWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJpbml0IiwiaXNFeHBhbmRlZCIsImhpZGUiLCJzaG93IiwidG9nZ2xlQm9keVZpc2liaWxpdHkiLCJib2R5RWxlbWVudCIsIm9uQXJpYUV4cGFuZGVkQ2hhbmdlIiwidGFyZ2V0IiwidGl0bGVFbCIsImJvZHlJZCIsImJvZHlFbCIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJIdWIiLCJzdGF0ZSIsImNvbnRlbnRUeXBlU2VjdGlvbiIsInVwbG9hZFNlY3Rpb24iLCJ2aWV3Iiwic2VydmljZXMiLCJzZXRQYW5lbFRpdGxlIiwiY2xvc2VQYW5lbCIsInNldFNlY3Rpb25UeXBlIiwidG9nZ2xlUGFuZWxPcGVuIiwiYmluZCIsImluaXRUYWJQYW5lbCIsImdldENvbnRlbnRUeXBlIiwic2V0VGl0bGUiLCJzZWN0aW9uSWQiLCJ0YWJDb25maWdzIiwiZ2V0RWxlbWVudCIsImNvbmZpZyIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiYWRkQm90dG9tQm9yZGVyIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsIk1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04iLCJ0b2dnbGVWaXNpYmlsaXR5IiwidmlzaWJsZSIsImlzRW1wdHkiLCJ0ZXh0IiwiQ29udGVudFR5cGVEZXRhaWxWaWV3Iiwicm9vdEVsZW1lbnQiLCJjcmVhdGVWaWV3IiwidXNlQnV0dG9uIiwiaW5zdGFsbEJ1dHRvbiIsImltYWdlIiwib3duZXIiLCJkZXNjcmlwdGlvbiIsImRlbW9CdXR0b24iLCJjYXJvdXNlbCIsImNhcm91c2VsTGlzdCIsImxpY2VuY2VQYW5lbCIsImxpZ2h0Ym94IiwiY2hpbGRFbGVtZW50Q291bnQiLCJ1cmwiLCJhbHQiLCJ0aHVtYm5haWwiLCJzcmMiLCJlbGxpcHNpcyIsInRvZ2dsZURlc2NyaXB0aW9uRXhwYW5kZWQiLCJkZXNjcmlwdGlvbkV4cGFuZGVkIiwiaW5uZXJUZXh0Iiwic2l6ZSIsInN1YnN0ciIsImluc3RhbGxlZCIsIkNvbnRlbnRUeXBlRGV0YWlsIiwiaW5zdGFsbCIsInVwZGF0ZSIsImluc3RhbGxDb250ZW50VHlwZSIsImNvbnNvbGUiLCJkZWJ1ZyIsInNldElkIiwic2V0RGVzY3JpcHRpb24iLCJzZXRJbWFnZSIsImljb24iLCJzZXRFeGFtcGxlIiwiZXhhbXBsZSIsInNldE93bmVyIiwic2V0SXNJbnN0YWxsZWQiLCJzZXRMaWNlbmNlIiwibGljZW5zZSIsInJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwiLCJzY3JlZW5zaG90cyIsImFkZEltYWdlVG9DYXJvdXNlbCIsIkNvbnRlbnRUeXBlTGlzdFZpZXciLCJoYXNDaGlsZE5vZGVzIiwibGFzdENoaWxkIiwicm93IiwiY3JlYXRlQ29udGVudFR5cGVSb3ciLCJ1c2VCdXR0b25Db25maWciLCJpbnN0YWxsQnV0dG9uQ29uZmlnIiwic3VtbWFyeSIsIkNvbnRlbnRUeXBlTGlzdCIsInJlbW92ZUFsbFJvd3MiLCJhZGRSb3ciLCJDb250ZW50QnJvd3NlclZpZXciLCJtZW51IiwiY3JlYXRlTWVudUVsZW1lbnQiLCJpbnB1dEdyb3VwIiwiY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQiLCJtZW51R3JvdXAiLCJtZW51QmFyRWxlbWVudCIsIm5hdkVsZW1lbnQiLCJpbnB1dEZpZWxkIiwicXVlcnkiLCJpbnB1dEJ1dHRvbiIsIm9uY2xpY2siLCJwYXJlbnRFbGVtZW50IiwiZm9jdXMiLCJtZW51SXRlbSIsImlzRmlyc3RNZW51SXRlbSIsIkNvbnRlbnRUeXBlU2VjdGlvbiIsInNlYXJjaFNlcnZpY2UiLCJjb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZURldGFpbCIsImFkZE1lbnVJdGVtIiwibWVudVRleHQiLCJpbml0TWVudSIsInNlY3Rpb24iLCJhZGQiLCJzZWFyY2giLCJyZXNldE1lbnVTZWxlY3Rpb24iLCJhcHBseVNlYXJjaEZpbHRlciIsImNsZWFySW5wdXRGaWVsZCIsInNob3dEZXRhaWxWaWV3IiwiY2xvc2VEZXRhaWxWaWV3IiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsImNhdGNoIiwiZXJyb3IiLCJsb2FkQnlJZCIsIkFUVFJJQlVURV9EQVRBX0lEIiwiaXNPcGVuIiwiSHViVmlldyIsInJlbmRlclRhYlBhbmVsIiwicmVuZGVyUGFuZWwiLCJleHBhbmRlZCIsInRhYkNvbnRhaW5lckVsZW1lbnQiLCJwYW5lbCIsInNldFRpbWVvdXQiLCJ0YWJsaXN0IiwidGFiTGlzdFdyYXBwZXIiLCJ0YWJJZCIsInRhYlBhbmVsSWQiLCJ0YWIiLCJ0YWJQYW5lbCIsIlNlYXJjaFNlcnZpY2UiLCJmaWx0ZXJCeVF1ZXJ5Iiwic2NvcmUiLCJnZXRTZWFyY2hTY29yZSIsInNvcnQiLCJzb3J0U2VhcmNoUmVzdWx0cyIsImEiLCJiIiwicG9wdWxhcml0eSIsInF1ZXJpZXMiLCJzcGxpdCIsInF1ZXJ5U2NvcmVzIiwiZ2V0U2NvcmVGb3JFYWNoUXVlcnkiLCJ0cmltIiwiaGFzU3ViU3RyaW5nIiwiYXJyYXlIYXNTdWJTdHJpbmciLCJrZXl3b3JkcyIsIm5lZWRsZSIsImhheXN0YWNrIiwidG9Mb3dlckNhc2UiLCJzdWJTdHJpbmciLCJzdHJpbmciLCJBZGROdW1iZXIiLCJVcGxvYWRTZWN0aW9uIiwiaDVwVXBsb2FkIiwidGV4dENvbnRlbnQiLCJkYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmaWxlcyIsInVwbG9hZENvbnRlbnQiLCJBVFRSSUJVVEVfU0laRSIsImRpc2FibGUiLCJlbmFibGUiLCJ0b2dnbGVFbmFibGVkIiwiZW5hYmxlZCIsImhpZGRlbiIsImlzRGlzYWJsZWQiLCJ1cGRhdGVWaWV3IiwicHJldkJ1dHRvbiIsIm5leHRCdXR0b24iLCJsaXN0IiwidG90YWxDb3VudCIsInN0eWxlIiwid2lkdGgiLCJkaXNwbGF5Q291bnQiLCJtYXJnaW5MZWZ0IiwicG9zaXRpb24iLCJvbk5hdmlnYXRpb25CdXR0b25DbGljayIsInVwZGF0ZVN0YXRlIiwiaW5pdEltYWdlIiwidGFyZ2V0SWQiLCJoYW5kbGVEb21VcGRhdGUiLCJyZWNvcmQiLCJhZGRlZE5vZGVzIiwic3VidHJlZSIsImNoaWxkTGlzdCIsInVuU2VsZWN0QWxsIiwibWVudUl0ZW1zIiwibG9nIiwiaGlkZUFsbCIsInRhYnMiLCJ0YWJQYW5lbHMiLCJyZXF1aXJlIiwiSDVQIiwiSHViQ2xpZW50Iiwi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VEQ7QUFVRCxHQVhEO0FBWUQsQzs7Ozs7Ozs7O0FDdkNELG1CQUFBa0UsQ0FBUSxDQUFSOztBQUVBO0FBQ0FDLE1BQU1BLE9BQU8sRUFBYjtBQUNBQSxJQUFJQyxTQUFKLEdBQWdCLG1CQUFBRixDQUFRLENBQVIsRUFBMEJHLE9BQTFDO0FBQ0FGLElBQUlDLFNBQUosQ0FBYzFPLGtCQUFkLEdBQW1DLG1CQUFBd08sQ0FBUSxDQUFSLEVBQW1DRyxPQUF0RSxDIiwiZmlsZSI6Img1cC1odWItY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDcwMTY5NmNjZjRhNTkzZmU0YmQ4IiwiLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICpcbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGN1cnJ5ID0gZnVuY3Rpb24oZm4pIHtcbiAgY29uc3QgYXJpdHkgPSBmbi5sZW5ndGg7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKCkge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+PSBhcml0eSkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBmMigpIHtcbiAgICAgICAgY29uc3QgYXJnczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICByZXR1cm4gZjEuYXBwbHkobnVsbCwgYXJncy5jb25jYXQoYXJnczIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIENvbXBvc2UgZnVuY3Rpb25zIHRvZ2V0aGVyLCBleGVjdXRpbmcgZnJvbSByaWdodCB0byBsZWZ0XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbi4uLn0gZm5zXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKC4uLmZucykgPT4gZm5zLnJlZHVjZSgoZiwgZykgPT4gKC4uLmFyZ3MpID0+IGYoZyguLi5hcmdzKSkpO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JFYWNoID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgYXJyLmZvckVhY2goZm4pO1xufSk7XG5cbi8qKlxuICogTWFwcyBhIGZ1bmN0aW9uIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgbWFwID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5tYXAoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZpbHRlciB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBzb21lIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgc29tZSA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuc29tZShmbik7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgYSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSBjdXJyeShmdW5jdGlvbiAodmFsdWUsIGFycikge1xuICByZXR1cm4gYXJyLmluZGV4T2YodmFsdWUpICE9IC0xO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSBzdXBwbGllZCB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgd2l0aG91dCA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZXMsIGFycikge1xuICByZXR1cm4gZmlsdGVyKHZhbHVlID0+ICFjb250YWlucyh2YWx1ZSwgdmFsdWVzKSwgYXJyKVxufSk7XG5cbi8qKlxuICogVGFrZXMgYSBzdHJpbmcgdGhhdCBpcyBlaXRoZXIgJ3RydWUnIG9yICdmYWxzZScgYW5kIHJldHVybnMgdGhlIG9wcG9zaXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJvb2xcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBpbnZlcnNlQm9vbGVhblN0cmluZyA9IGZ1bmN0aW9uIChib29sKSB7XG4gIHJldHVybiAoYm9vbCAhPT0gJ3RydWUnKS50b1N0cmluZygpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9mdW5jdGlvbmFsLmpzIiwiLyoqXG4gKiBAbWl4aW5cbiAqL1xuZXhwb3J0IGNvbnN0IEV2ZW50ZnVsID0gKCkgPT4gKHtcbiAgbGlzdGVuZXJzOiB7fSxcblxuICAvKipcbiAgICogTGlzdGVuIHRvIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbc2NvcGVdXG4gICAqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtFdmVudGZ1bH1cbiAgICovXG4gIG9uOiBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgc2NvcGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZWRlZiB7b2JqZWN0fSBUcmlnZ2VyXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2NvcGVcbiAgICAgKi9cbiAgICBjb25zdCB0cmlnZ2VyID0ge1xuICAgICAgJ2xpc3RlbmVyJzogbGlzdGVuZXIsXG4gICAgICAnc2NvcGUnOiBzY29wZVxuICAgIH07XG5cbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2godHJpZ2dlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogRmlyZSBldmVudC4gSWYgYW55IG9mIHRoZSBsaXN0ZW5lcnMgcmV0dXJucyBmYWxzZSwgcmV0dXJuIGZhbHNlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZXZlbnRdXG4gICAqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgZmlyZTogZnVuY3Rpb24odHlwZSwgZXZlbnQpIHtcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuXG4gICAgcmV0dXJuIHRyaWdnZXJzLmV2ZXJ5KGZ1bmN0aW9uKHRyaWdnZXIpIHtcbiAgICAgIHJldHVybiB0cmlnZ2VyLmxpc3RlbmVyLmNhbGwodHJpZ2dlci5zY29wZSB8fCB0aGlzLCBldmVudCkgIT09IGZhbHNlO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIGZvciBldmVudHMgb24gYW5vdGhlciBFdmVudGZ1bCwgYW5kIHByb3BhZ2F0ZSBpdCB0cm91Z2ggdGhpcyBFdmVudGZ1bFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB0eXBlc1xuICAgKiBAcGFyYW0ge0V2ZW50ZnVsfSBldmVudGZ1bFxuICAgKi9cbiAgcHJvcGFnYXRlOiBmdW5jdGlvbih0eXBlcywgZXZlbnRmdWwpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgdHlwZXMuZm9yRWFjaCh0eXBlID0+IGV2ZW50ZnVsLm9uKHR5cGUsIGV2ZW50ID0+IHNlbGYuZmlyZSh0eXBlLCBldmVudCkpKTtcbiAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwiaW1wb3J0IHtjdXJyeSwgaW52ZXJzZUJvb2xlYW5TdHJpbmd9IGZyb20gJy4vZnVuY3Rpb25hbCdcblxuLyoqXG4gKiBHZXQgYW4gYXR0cmlidXRlIHZhbHVlIGZyb20gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0QXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIFNldCBhbiBhdHRyaWJ1dGUgb24gYSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2V0QXR0cmlidXRlID0gY3VycnkoKG5hbWUsIHZhbHVlLCBlbCkgPT4gZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSk7XG5cbi8qKlxuICogUmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0F0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwuaGFzQXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGUgdGhhdCBlcXVhbHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUVxdWFscyA9IGN1cnJ5KChuYW1lLCB2YWx1ZSwgZWwpID0+IGVsLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWUpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYW4gYXR0cmlidXRlIGJldHdlZW4gJ3RydWUnIGFuZCAnZmFsc2UnO1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiB7XG4gIGNvbnN0IHZhbHVlID0gZ2V0QXR0cmlidXRlKG5hbWUsIGVsKTtcbiAgc2V0QXR0cmlidXRlKG5hbWUsIGludmVyc2VCb29sZWFuU3RyaW5nKHZhbHVlKSwgZWwpO1xufSk7XG5cbi8qKlxuICogVGhlIGFwcGVuZENoaWxkKCkgbWV0aG9kIGFkZHMgYSBub2RlIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3Qgb2YgY2hpbGRyZW4gb2YgYSBzcGVjaWZpZWQgcGFyZW50IG5vZGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjaGlsZFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBhcHBlbmRDaGlsZCA9IGN1cnJ5KChwYXJlbnQsIGNoaWxkKSA9PiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgYSBkZXNjZW5kYW50IG9mIHRoZSBlbGVtZW50IG9uIHdoaWNoIGl0IGlzIGludm9rZWRcbiAqIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIHNlbGVjdG9ycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3IgPSBjdXJyeSgoc2VsZWN0b3IsIGVsKSA9PiBlbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5vbi1saXZlIE5vZGVMaXN0IG9mIGFsbCBlbGVtZW50cyBkZXNjZW5kZWQgZnJvbSB0aGUgZWxlbWVudCBvbiB3aGljaCBpdFxuICogaXMgaW52b2tlZCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBDU1Mgc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge05vZGVMaXN0fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvckFsbCA9IGN1cnJ5KChzZWxlY3RvciwgZWwpID0+IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcblxuLyoqXG4gKiBUaGUgcmVtb3ZlQ2hpbGQoKSBtZXRob2QgcmVtb3ZlcyBhIGNoaWxkIG5vZGUgZnJvbSB0aGUgRE9NLiBSZXR1cm5zIHJlbW92ZWQgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IHBhcmVudFxuICogQHBhcmFtIHtOb2RlfSBvbGRDaGlsZFxuICpcbiAqIEByZXR1cm4ge05vZGV9XG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVDaGlsZCA9IGN1cnJ5KChwYXJlbnQsIG9sZENoaWxkKSA9PiBwYXJlbnQucmVtb3ZlQ2hpbGQob2xkQ2hpbGQpKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBub2RlIGhhcyBhIGNsYXNzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGNsYXNzTGlzdENvbnRhaW5zID0gY3VycnkoKGNscywgZWwpID0+IGVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMpKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgTm9kZUxpc3QgdG8gYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge05vZGVMaXN0fSBub2RlTGlzdFxuICpcbiAqIEByZXR1cm4ge05vZGVbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IG5vZGVMaXN0VG9BcnJheSA9IG5vZGVMaXN0ID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVMaXN0KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gQ29udGVudFR5cGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGNoVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN1bW1hcnlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjcmVhdGVkQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVkX0F0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaXNSZWNvbW1lbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBvcHVsYXJpdHlcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHNjcmVlbnNob3RzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGljZW5zZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV4YW1wbGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0dXRvcmlhbFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0ga2V5d29yZHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvd25lclxuICogQHByb3BlcnR5IHtib29sZWFufSBpbnN0YWxsZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVzdHJpY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBhcGlSb290VXJsIH0pIHtcbiAgICB0aGlzLmFwaVJvb3RVcmwgPSBhcGlSb290VXJsO1xuXG4gICAgaWYoIXdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMpe1xuICAgICAgLy8gVE9ETyByZW1vdmUgdGhpcyB3aGVuIGRvbmUgdGVzdGluZyBmb3IgZXJyb3JzXG4gICAgICAvLyB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWVycm9ycy9OT19SRVNQT05TRS5qc29uYCwge1xuXG4gICAgICB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnQtdHlwZS1jYWNoZWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxuICAgICAgLnRoZW4odGhpcy5pc1ZhbGlkKVxuICAgICAgLnRoZW4oanNvbiA9PiBqc29uLmxpYnJhcmllcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSAge0NvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cbiAgICovXG4gIGlzVmFsaWQocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT59XG4gICAqL1xuICBjb250ZW50VHlwZXMoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcy50aGVuKGNvbnRlbnRUeXBlcyA9PiB7XG4gICAgICByZXR1cm4gY29udGVudFR5cGVzLmZpbHRlcihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSA9PT0gbWFjaGluZU5hbWUpWzBdO1xuICAgIH0pO1xuXG4gICAgLypyZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnRfdHlwZV9jYWNoZS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7Ki9cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YWxscyBhIGNvbnRlbnQgdHlwZSBvbiB0aGUgc2VydmVyXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBpbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2gobnMuZ2V0QWpheFVybCgnbGlicmFyeS1pbnN0YWxsJywge2lkOiBpZH0pLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBib2R5OiAnJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZHMgYSBjb250ZW50IHR5cGUgdG8gdGhlIHNlcnZlciBmb3IgdmFsaWRhdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge0Zvcm1EYXRhfSBmb3JtRGF0YSBGb3JtIGNvbnRhaW5pbmcgdGhlIGg1cCB0aGF0IHNob3VsZCBiZSB1cGxvYWRlZCBhcyAnaDVwJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXR1cm5zIHRoZSBwcm9taXNlIG9mIGEganNvbiBjb250YWluaW5nIHRoZSBjb250ZW50IGpzb24gYW5kIHRoZSBoNXAganNvblxuICAgKi9cbiAgdXBsb2FkQ29udGVudChmb3JtRGF0YSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9bGlicmFyeS11cGxvYWRgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBib2R5OiBmb3JtRGF0YVxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItc2VydmljZXMuanMiLCIvKipcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcudHlwZSAgICAgICAgIHR5cGUgb2YgdGhlIG1lc3NhZ2U6IGluZm8sIHN1Y2Nlc3MsIGVycm9yXG4gKiBAcGFyYW0gIHtib29sZWFufSAgY29uZmlnLmRpc21pc3NpYmxlICB3aGV0aGVyIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNtaXNzZWRcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcuY29udGVudCAgICAgIG1lc3NhZ2UgY29udGVudCB1c3VhbGx5IGEgJ2gzJyBhbmQgYSAncCdcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBkaXYgY29udGFpbmluZyB0aGUgbWVzc2FnZSBlbGVtZW50XG4gKi9cblxuLy9UT0RPIGhhbmRsZSBzdHJpbmdzLCBodG1sLCBiYWRseSBmb3JtZWQgb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJFcnJvck1lc3NhZ2UobWVzc2FnZSkge1xuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSAnY2xvc2UnO1xuICBjbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJiN4MjcxNSc7XG5cbiAgY29uc3QgbWVzc2FnZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWVzc2FnZUNvbnRlbnQuY2xhc3NOYW1lID0gJ21lc3NhZ2UtY29udGVudCc7XG4gIG1lc3NhZ2VDb250ZW50LmlubmVySFRNTCA9ICc8aDE+JyArIG1lc3NhZ2UudGl0bGUgKyAnPC9oMT4nICsgJzxwPicgKyBtZXNzYWdlLmNvbnRlbnQgKyAnPC9wPic7XG5cbiAgY29uc3QgbWVzc2FnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWVzc2FnZVdyYXBwZXIuY2xhc3NOYW1lID0gJ21lc3NhZ2UnICsgJyAnICsgYCR7bWVzc2FnZS50eXBlfWAgKyAobWVzc2FnZS5kaXNtaXNzaWJsZSA/ICcgZGlzbWlzc2libGUnIDogJycpO1xuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VDb250ZW50KTtcblxuICBpZiAobWVzc2FnZS5idXR0b24gIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IG1lc3NhZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBtZXNzYWdlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24nO1xuICAgIG1lc3NhZ2VCdXR0b24uaW5uZXJIVE1MID0gbWVzc2FnZS5idXR0b247XG4gICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUJ1dHRvbik7XG4gIH1cblxuICByZXR1cm4gbWVzc2FnZVdyYXBwZXI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXJyb3JzLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuXG4vKipcbiAqICBUcmFuc2Zvcm1zIGEgRE9NIGNsaWNrIGV2ZW50IGludG8gYW4gRXZlbnRmdWwncyBldmVudFxuICogIEBzZWUgRXZlbnRmdWxcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmcgfCBPYmplY3R9IHR5cGVcbiAqIEBwYXJhbSAge0V2ZW50ZnVsfSBldmVudGZ1bFxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgcmVsYXlDbGlja0V2ZW50QXMgPSBjdXJyeShmdW5jdGlvbih0eXBlLCBldmVudGZ1bCwgZWxlbWVudCkge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGV2ZW50ZnVsLmZpcmUodHlwZSwge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGlkOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gZG9uJ3QgYnViYmxlXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50O1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZSwgYXR0cmlidXRlRXF1YWxzLCB0b2dnbGVBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaXNFeHBhbmRlZCA9IGF0dHJpYnV0ZUVxdWFscyhcImFyaWEtZXhwYW5kZWRcIiwgJ3RydWUnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgYm9keSB2aXNpYmlsaXR5XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYm9keUVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNFeHBhbmRlZFxuICovXG5jb25zdCB0b2dnbGVCb2R5VmlzaWJpbGl0eSA9IGZ1bmN0aW9uKGJvZHlFbGVtZW50LCBpc0V4cGFuZGVkKSB7XG4gIGlmKCFpc0V4cGFuZGVkKSB7XG4gICAgaGlkZShib2R5RWxlbWVudCk7XG4gICAgLy9ib2R5RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIjBcIjtcbiAgfVxuICBlbHNlIC8qaWYoYm9keUVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gMCkqLyB7XG4gICAgc2hvdyhib2R5RWxlbWVudCk7XG4gICAgLy9ib2R5RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtib2R5RWxlbWVudC5zY3JvbGxIZWlnaHR9cHhgO1xuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgY2hhbmdlcyB0byBhcmlhLWV4cGFuZGVkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYm9keUVsZW1lbnRcbiAqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IGV2ZW50XG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG9uQXJpYUV4cGFuZGVkQ2hhbmdlID0gY3VycnkoZnVuY3Rpb24oYm9keUVsZW1lbnQsIGV2ZW50KSB7XG4gIHRvZ2dsZUJvZHlWaXNpYmlsaXR5KGJvZHlFbGVtZW50LCBpc0V4cGFuZGVkKGV2ZW50LnRhcmdldCkpO1xufSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgY29uc3QgdGl0bGVFbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtZXhwYW5kZWRdJyk7XG4gIGNvbnN0IGJvZHlJZCA9IHRpdGxlRWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gIGNvbnN0IGJvZHlFbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9keUlkfWApO1xuXG4gIGlmKHRpdGxlRWwpIHtcbiAgICAvLyBzZXQgb2JzZXJ2ZXIgb24gdGl0bGUgZm9yIGFyaWEtZXhwYW5kZWRcbiAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmb3JFYWNoKG9uQXJpYUV4cGFuZGVkQ2hhbmdlKGJvZHlFbCkpKTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUodGl0bGVFbCwge1xuICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgICAgYXR0cmlidXRlRmlsdGVyOiBbXCJhcmlhLWV4cGFuZGVkXCJdXG4gICAgfSk7XG5cbiAgICAvLyBTZXQgY2xpY2sgbGlzdGVuZXIgdGhhdCB0b2dnbGVzIGFyaWEtZXhwYW5kZWRcbiAgICB0aXRsZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHRvZ2dsZUF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgZXZlbnQudGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIHRvZ2dsZUJvZHlWaXNpYmlsaXR5KGJvZHlFbCwgaXNFeHBhbmRlZCh0aXRsZUVsKSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIWnBaWGRDYjNnOUlqQWdNQ0EwTURBZ01qSTFJajROQ2lBZ1BHUmxabk0rRFFvZ0lDQWdQSE4wZVd4bFBnMEtJQ0FnSUNBZ0xtTnNjeTB4SUhzTkNpQWdJQ0FnSUdacGJHdzZJRzV2Ym1VN0RRb2dJQ0FnSUNCOURRb05DaUFnSUNBZ0lDNWpiSE10TWlCN0RRb2dJQ0FnSUNCbWFXeHNPaUFqWXpaak5tTTNPdzBLSUNBZ0lDQWdmUTBLRFFvZ0lDQWdJQ0F1WTJ4ekxUTXNJQzVqYkhNdE5DQjdEUW9nSUNBZ0lDQm1hV3hzT2lBalptWm1PdzBLSUNBZ0lDQWdmUTBLRFFvZ0lDQWdJQ0F1WTJ4ekxUTWdldzBLSUNBZ0lDQWdiM0JoWTJsMGVUb2dNQzQzT3cwS0lDQWdJQ0FnZlEwS0lDQWdJRHd2YzNSNWJHVStEUW9nSUR3dlpHVm1jejROQ2lBZ1BIUnBkR3hsUG1OdmJuUmxiblFnZEhsd1pTQndiR0ZqWldodmJHUmxjbDh5UEM5MGFYUnNaVDROQ2lBZ1BHY2dhV1E5SWt4aGVXVnlYeklpSUdSaGRHRXRibUZ0WlQwaVRHRjVaWElnTWlJK0RRb2dJQ0FnUEdjZ2FXUTlJbU52Ym5SbGJuUmZkSGx3WlY5d2JHRmpaV2h2YkdSbGNpMHhYMk52Y0hraUlHUmhkR0V0Ym1GdFpUMGlZMjl1ZEdWdWRDQjBlWEJsSUhCc1lXTmxhRzlzWkdWeUxURWdZMjl3ZVNJK0RRb2dJQ0FnSUNBOGNtVmpkQ0JqYkdGemN6MGlZMnh6TFRFaUlIZHBaSFJvUFNJME1EQWlJR2hsYVdkb2REMGlNakkxSWk4K0RRb2dJQ0FnSUNBOGNtVmpkQ0JqYkdGemN6MGlZMnh6TFRJaUlIZzlJakV4TWk0MU1TSWdlVDBpTkRNdU5ERWlJSGRwWkhSb1BTSXhOell1T1RZaUlHaGxhV2RvZEQwaU1UTTFMalExSWlCeWVEMGlNVEFpSUhKNVBTSXhNQ0l2UGcwS0lDQWdJQ0FnUEdOcGNtTnNaU0JqYkdGemN6MGlZMnh6TFRNaUlHTjRQU0l4TXpZdU5qWWlJR041UFNJMk1TNDVPQ0lnY2owaU5DNDRNU0l2UGcwS0lDQWdJQ0FnUEdOcGNtTnNaU0JqYkdGemN6MGlZMnh6TFRNaUlHTjRQU0l4TlRFdU5Ea2lJR041UFNJMk1TNDVPQ0lnY2owaU5DNDRNU0l2UGcwS0lDQWdJQ0FnUEdOcGNtTnNaU0JqYkdGemN6MGlZMnh6TFRNaUlHTjRQU0l4TmpZdU1TSWdZM2s5SWpZeExqazRJaUJ5UFNJMExqZ3hJaTgrRFFvZ0lDQWdJQ0E4WnlCcFpEMGlYMGR5YjNWd1h5SWdaR0YwWVMxdVlXMWxQU0ltYkhRN1IzSnZkWEFtWjNRN0lqNE5DaUFnSUNBZ0lDQWdQR2NnYVdROUlsOUhjbTkxY0Y4eUlpQmtZWFJoTFc1aGJXVTlJaVpzZER0SGNtOTFjQ1puZERzaVBnMEtJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHbGtQU0pmUTI5dGNHOTFibVJmVUdGMGFGOGlJR1JoZEdFdGJtRnRaVDBpSm14ME8wTnZiWEJ2ZFc1a0lGQmhkR2dtWjNRN0lpQmpiR0Z6Y3owaVkyeHpMVFFpSUdROUlrMHlOak11TWpnc09UVXVNakZETWpZd0xEa3lMakEzTERJMU5TdzVNUzQxTERJME9DNDBNeXc1TVM0MVNESXlOM1k0U0RFNU9TNDFiQzB5TGpFM0xERXdMakkwWVRJMUxqZzBMREkxTGpnMExEQXNNQ3d4TERFeExqUTRMVEV1TmpNc01Ua3VPVE1zTVRrdU9UTXNNQ3d3TERFc01UUXVNemtzTlM0MU55d3hPQzR5Tml3eE9DNHlOaXd3TERBc01TdzFMalV5TERFekxqWXNNak11TVRFc01qTXVNVEVzTUN3d0xERXRNaTQ0TkN3eE1TNHdOU3d4T0M0Mk5Td3hPQzQyTlN3d0xEQXNNUzA0TGpBMkxEY3VOemtzT1N3NUxEQXNNQ3d4TFRRdU1USXNNUzR6TjBneU16WjJMVEl4YURFd0xqUXlZemN1TXpZc01Dd3hNaTQ0TXkweExqWXhMREUyTGpReUxUVnpOUzR6T0MwM0xqUTRMRFV1TXpndE1UTXVORFJETWpZNExqSXlMREV3TWk0eU9Td3lOall1TlRjc09UZ3VNelVzTWpZekxqSTRMRGsxTGpJeFdtMHRNVFVzTVRkakxURXVORElzTVM0eU1pMHpMamtzTVM0eU5TMDNMalF4TERFdU1qVklNak0yZGkweE5HZzFMall5WVRrdU5UY3NPUzQxTnl3d0xEQXNNU3czTERJdU9UTXNOeTR3TlN3M0xqQTFMREFzTUN3eExERXVPRFVzTkM0NU1rRTJMak16TERZdU16TXNNQ3d3TERFc01qUTRMak14TERFeE1pNHlOVm9pTHo0TkNpQWdJQ0FnSUNBZ0lDQThjR0YwYUNCcFpEMGlYMUJoZEdoZklpQmtZWFJoTFc1aGJXVTlJaVpzZER0UVlYUm9KbWQwT3lJZ1kyeGhjM005SW1Oc2N5MDBJaUJrUFNKTk1qQXlMamtzTVRFNUxqRXhZVGd1TVRJc09DNHhNaXd3TERBc01DMDNMakk0TERRdU5USnNMVEUyTFRFdU1qSXNOeTR5TWkwek1DNDVNa2d4TnpSMk1qSklNVFV6ZGkweU1rZ3hNeloyTlRab01UZDJMVEl4YURJeGRqSXhhREl3TGpNeFl5MHlMamN5TERBdE5TMHhMalV6TFRjdE0yRXhPUzR4T1N3eE9TNHhPU3d3TERBc01TMDBMamN6TFRRdU9ETXNNak11TlRnc01qTXVOVGdzTUN3d0xERXRNeTAyTGpac01UWXRNaTR5Tm1FNExqRXhMRGd1TVRFc01Dd3hMREFzTnk0eU5pMHhNUzQzTWxvaUx6NE5DaUFnSUNBZ0lDQWdQQzluUGcwS0lDQWdJQ0FnUEM5blBnMEtJQ0FnSUNBZ1BISmxZM1FnWTJ4aGMzTTlJbU5zY3kweklpQjRQU0l4TnpjdU5qWWlJSGs5SWpVM0xqWTJJaUIzYVdSMGFEMGlPVEl1TWpnaUlHaGxhV2RvZEQwaU9TNHpPQ0lnY25nOUlqTXVOU0lnY25rOUlqTXVOU0l2UGcwS0lDQWdJRHd2Wno0TkNpQWdQQzluUGcwS1BDOXpkbWMrRFFvPVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmdcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEh1YlZpZXcgZnJvbSAnLi9odWItdmlldyc7XG5pbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uIGZyb20gJy4vY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24nO1xuaW1wb3J0IFVwbG9hZFNlY3Rpb24gZnJvbSAnLi91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbic7XG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSAnLi9odWItc2VydmljZXMnO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi91dGlscy9lcnJvcnMnO1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBIdWJTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRpdGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbklkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGV4cGFuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYXBpUm9vdFVybFxuICovXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEVycm9yTWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlcnJvckNvZGVcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBTZWxlY3RlZEVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpZFxuICovXG4vKipcbiAqIFNlbGVjdCBldmVudFxuICogQGV2ZW50IEh1YiNzZWxlY3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogRXJyb3IgZXZlbnRcbiAqIEBldmVudCBIdWIjZXJyb3JcbiAqIEB0eXBlIHtFcnJvck1lc3NhZ2V9XG4gKi9cbi8qKlxuICogVXBsb2FkIGV2ZW50XG4gKiBAZXZlbnQgSHViI3VwbG9hZFxuICogQHR5cGUge09iamVjdH1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBIdWIjZXJyb3JcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNvbnRyb2xsZXJzXG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24gPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uKHN0YXRlKTtcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBwcm9wYWdhdGUgY29udHJvbGxlciBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCcsICdlcnJvciddLCB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbik7XG4gICAgdGhpcy5wcm9wYWdhdGUoWyd1cGxvYWQnXSwgdGhpcy51cGxvYWRTZWN0aW9uKTtcblxuICAgIC8vIGhhbmRsZSBldmVudHNcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnNldFBhbmVsVGl0bGUsIHRoaXMpO1xuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMudmlldy5jbG9zZVBhbmVsLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMudmlldy5vbigndGFiLWNoYW5nZScsIHRoaXMudmlldy5zZXRTZWN0aW9uVHlwZSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcub24oJ3BhbmVsLWNoYW5nZScsIHRoaXMudmlldy50b2dnbGVQYW5lbE9wZW4uYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xuXG4gICAgdGhpcy5pbml0VGFiUGFuZWwoc3RhdGUpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGNvbnRlbnQgdHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgZ2V0Q29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShtYWNoaW5lTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGUgb2YgdGhlIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0UGFuZWxUaXRsZSh7aWR9KcKge1xuICAgIHRoaXMuZ2V0Q29udGVudFR5cGUoaWQpLnRoZW4oKHt0aXRsZX0pID0+IHRoaXMudmlldy5zZXRUaXRsZSh0aXRsZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgdGFiIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICovXG4gIGluaXRUYWJQYW5lbCh7IHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJyB9KSB7XG4gICAgY29uc3QgdGFiQ29uZmlncyA9IFt7XG4gICAgICB0aXRsZTogJ0NyZWF0ZSBDb250ZW50JyxcbiAgICAgIGlkOiAnY29udGVudC10eXBlcycsXG4gICAgICBjb250ZW50OiB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5nZXRFbGVtZW50KCksXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1VwbG9hZCcsXG4gICAgICBpZDogJ3VwbG9hZCcsXG4gICAgICBjb250ZW50OiB0aGlzLnVwbG9hZFNlY3Rpb24uZ2V0RWxlbWVudCgpXG4gICAgfV07XG5cbiAgICAvLyBzZXRzIHRoZSBjb3JyZWN0IG9uZSBzZWxlY3RlZFxuICAgIHRhYkNvbmZpZ3NcbiAgICAgIC5maWx0ZXIoY29uZmlnID0+IGNvbmZpZy5pZCA9PT0gc2VjdGlvbklkKVxuICAgICAgLmZvckVhY2goY29uZmlnID0+IGNvbmZpZy5zZWxlY3RlZCA9IHRydWUpO1xuXG4gICAgdGFiQ29uZmlncy5mb3JFYWNoKHRhYkNvbmZpZyA9PiB0aGlzLnZpZXcuYWRkVGFiKHRhYkNvbmZpZykpO1xuICAgIHRoaXMudmlldy5hZGRCb3R0b21Cb3JkZXIoKTsgLy8gQWRkcyBhbiBhbmltYXRlZCBib3R0b20gYm9yZGVyIHRvIGVhY2ggdGFiXG4gICAgdGhpcy52aWV3LmluaXRUYWJQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBpbiB0aGUgdmlld1xuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi5qcyIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCByZW1vdmVDaGlsZCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiO1xuaW1wb3J0IGluaXRJbWFnZVNjcm9sbGVyIGZyb20gXCJjb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyXCI7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5pbXBvcnQgbm9JY29uIGZyb20gJy4uLy4uL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnJztcblxuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCA9ICdkYXRhLWlkJztcblxuLyoqXG4gKiBAY29uc3RhbnQge251bWJlcn1cbiAqL1xuY29uc3QgTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiA9IDMwMDtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgaWYgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGVsZW1lbnQsIHZpc2libGUpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBlbXB0eVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbXB0eSA9ICh0ZXh0KSA9PiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSAmJiAodGV4dC5sZW5ndGggPT09IDApO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsVmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgdmlld1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZVZpZXcoKTtcblxuICAgIC8vIGdyYWIgcmVmZXJlbmNlc1xuICAgIHRoaXMudXNlQnV0dG9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXVzZScpO1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsJyk7XG4gICAgdGhpcy5pbWFnZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtdHlwZS1pbWFnZScpO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWRldGFpbHMgaDMnKTtcbiAgICB0aGlzLm93bmVyID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3duZXInKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kZXRhaWxzIC5zbWFsbCcpO1xuICAgIHRoaXMuZGVtb0J1dHRvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRlbW8tYnV0dG9uJyk7XG4gICAgdGhpcy5jYXJvdXNlbCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcm91c2VsJyk7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QgPSB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gICAgdGhpcy5saWNlbmNlUGFuZWwgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saWNlbmNlLXBhbmVsJyk7XG5cbiAgICAvLyBpbml0IGludGVyYWN0aXZlIGVsZW1lbnRzXG4gICAgaW5pdFBhbmVsKHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICBpbml0SW1hZ2VTY3JvbGxlcih0aGlzLmNhcm91c2VsKTtcblxuICAgIC8vIGZpcmUgZXZlbnRzIG9uIGJ1dHRvbiBjbGlja1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2stYnV0dG9uJykpO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2luc3RhbGwnLCB0aGlzLCB0aGlzLmluc3RhbGxCdXR0b24pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIHZpZXcgYXMgYSBIVE1MRWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZVZpZXcgKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtZGV0YWlsJztcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJhY2stYnV0dG9uIGljb24tYXJyb3ctdGhpY2tcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLXdyYXBwZXJcIj48aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmUgY29udGVudC10eXBlLWltYWdlXCIgc3JjPVwiJHtub0ljb259XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWRldGFpbHNcIj5cbiAgICAgICAgICA8aDM+PC9oMz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3duZXJcIj48L2Rpdj5cbiAgICAgICAgICA8cCBjbGFzcz1cInNtYWxsXCI+PC9wPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnV0dG9uIGRlbW8tYnV0dG9uXCIgdGFyZ2V0PVwiX2JsYW5rXCIgYXJpYS1oaWRkZW49XCJmYWxzZVwiIGhyZWY9XCJodHRwczovL2g1cC5vcmcvY2hhcnRcIj5Db250ZW50IERlbW88L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2Fyb3VzZWxcIiByb2xlPVwicmVnaW9uXCIgZGF0YS1zaXplPVwiNVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWJ1dHRvbiBwcmV2aW91c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRpc2FibGVkPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIG5leHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkaXNhYmxlZD48c3BhbiBjbGFzcz1cImljb24tYXJyb3ctdGhpY2tcIj48L3NwYW4+PC9zcGFuPlxuICAgICAgICA8bmF2IGNsYXNzPVwic2Nyb2xsZXJcIj5cbiAgICAgICAgICA8dWw+PC91bD5cbiAgICAgICAgPC9uYXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxociAvPlxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1iYXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnkgYnV0dG9uLXVzZVwiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBkYXRhLWlkPVwiSDVQLkNoYXJ0XCI+VXNlPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGF0YS1pZD1cIkg1UC5DaGFydFwiPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj5JbnN0YWxsPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZ3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIGxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGVyXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1jb250cm9scz1cImxpY2VuY2UtcGFuZWxcIj48c3BhbiBjbGFzcz1cImljb24tYWNjb3JkaW9uLWFycm93XCI+PC9zcGFuPiBUaGUgTGljZW5jZSBJbmZvPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIiBpZD1cImxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5LWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGltYWdlcyBmcm9tIHRoZSBjYXJvdXNlbFxuICAgKi9cbiAgcmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCgpIHtcbiAgICB0aGlzLmNhcm91c2VsTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmZvckVhY2gocmVtb3ZlQ2hpbGQodGhpcy5jYXJvdXNlbExpc3QpKTtcbiAgICB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbC1saWdodGJveCcpLmZvckVhY2gocmVtb3ZlQ2hpbGQodGhpcy5jYXJvdXNlbCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpbWFnZSB0byB0aGUgY2Fyb3VzZWxcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGltYWdlXG4gICAqL1xuICBhZGRJbWFnZVRvQ2Fyb3VzZWwoaW1hZ2UpIHtcbiAgICAvLyBhZGQgbGlnaHRib3hcbiAgICBjb25zdCBsaWdodGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxpZ2h0Ym94LmlkID0gYGxpZ2h0Ym94LSR7dGhpcy5jYXJvdXNlbExpc3QuY2hpbGRFbGVtZW50Q291bnR9YDtcbiAgICBsaWdodGJveC5jbGFzc05hbWUgPSAnY2Fyb3VzZWwtbGlnaHRib3gnO1xuICAgIGxpZ2h0Ym94LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGxpZ2h0Ym94LmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBzcmM9XCIke2ltYWdlLnVybH1cIiBhbHQ9XCIke2ltYWdlLmFsdH1cIj5gO1xuICAgIHRoaXMuY2Fyb3VzZWwuYXBwZW5kQ2hpbGQobGlnaHRib3gpO1xuXG4gICAgLy8gYWRkIHRodW1ibmFpbFxuICAgIGNvbnN0IHRodW1ibmFpbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdGh1bWJuYWlsLmNsYXNzTmFtZSA9ICdzbGlkZSc7XG4gICAgdGh1bWJuYWlsLmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIiR7aW1hZ2UudXJsfVwiIGFsdD1cIiR7aW1hZ2UuYWx0fVwiIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBhcmlhLWNvbnRyb2xzPVwiJHtsaWdodGJveC5pZH1cIiAvPmA7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QuYXBwZW5kQ2hpbGQodGh1bWJuYWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbWFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gICAqL1xuICBzZXRJbWFnZShzcmMpIHtcbiAgICB0aGlzLmltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjIHx8IG5vSWNvbik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRJZChpZCkge1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICAgIHRoaXMudXNlQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gYCR7dGl0bGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XG4gICAgaWYodGV4dC5sZW5ndGggPiBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OKSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9IDxzcGFuIGNsYXNzPVwicmVhZC1tb3JlIGxpbmtcIj5SZWFkIG1vcmU8L3NwYW4+YDtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25cbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5yZWFkLW1vcmUsIC5yZWFkLWxlc3MnKVxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZURlc2NyaXB0aW9uRXhwYW5kZWQodGV4dCkpO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIFJlYWQgbGVzcyBhbmQgUmVhZCBtb3JlIHRleHRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovXG4gIHRvZ2dsZURlc2NyaXB0aW9uRXhwYW5kZWQodGV4dCkge1xuICAgIC8vIGZsaXAgYm9vbGVhblxuICAgIHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCA9ICF0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQ7XG5cbiAgICBpZih0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQpIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGV4dH0gPHNwYW4gY2xhc3M9XCJyZWFkLWxlc3MgbGlua1wiPlJlYWQgbGVzczwvc3Bhbj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGhpcy5lbGxpcHNpcyhNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OLCB0ZXh0KX0gPHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgIH1cblxuICAgIHRoaXMuZGVzY3JpcHRpb25cbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcucmVhZC1tb3JlLCAucmVhZC1sZXNzJylcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvcnRlbnMgYSBzdHJpbmcsIGFuZCBwdXRzIGFuIGVsaXBzaXMgYXQgdGhlIGVuZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgZWxsaXBzaXMoc2l6ZSwgdGV4dCkge1xuICAgIHJldHVybiBgJHt0ZXh0LnN1YnN0cigwLCBzaXplKX0uLi5gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxpY2VuY2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICovXG4gIHNldExpY2VuY2UodHlwZSkge1xuICAgIGlmKHR5cGUpe1xuICAgICAgdGhpcy5saWNlbmNlUGFuZWwucXVlcnlTZWxlY3RvcignLnBhbmVsLWJvZHktaW5uZXInKS5pbm5lclRleHQgPSB0eXBlO1xuICAgICAgc2hvdyh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlkZSh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyXG4gICAqL1xuICBzZXRPd25lcihvd25lcikge1xuICAgIGlmKG93bmVyKSB7XG4gICAgICB0aGlzLm93bmVyLmlubmVySFRNTCA9IGBCeSAke293bmVyfWA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5vd25lci5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZXhhbXBsZSB1cmxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgc2V0RXhhbXBsZSh1cmwpIHtcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmRlbW9CdXR0b24sICFpc0VtcHR5KHVybCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgaWYgdGhlIGNvbnRlbnQgdHlwZSBpcyBpbnN0YWxsZWRcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBpbnN0YWxsZWRcbiAgICovXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy51c2VCdXR0b24sIGluc3RhbGxlZCk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmluc3RhbGxCdXR0b24sICFpbnN0YWxsZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZURldGFpbFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWRldGFpbC12aWV3XCI7XG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSBcIi4uL2h1Yi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsIHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlRGV0YWlsVmlldyhzdGF0ZSk7XG4gICAgdGhpcy52aWV3Lm9uKCdpbnN0YWxsJywgdGhpcy5pbnN0YWxsLCB0aGlzKTtcblxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ2Nsb3NlJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBsb2FkQnlJZChpZCkge1xuICAgIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICAgaW5zdGFsbCh7aWR9KSB7XG4gICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKVxuICAgICAgIC50aGVuKG1hY2hpbmVOYW1lID0+IHRoaXMuc2VydmljZXMuaW5zdGFsbENvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSlcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiBjb25zb2xlLmRlYnVnKCdUT0RPLCBndWkgdXBkYXRlcycsIGNvbnRlbnRUeXBlKSlcbiAgIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdmlldyB3aXRoIHRoZSBjb250ZW50IHR5cGUgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlKSB7XG4gICAgdGhpcy52aWV3LnNldElkKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcbiAgICB0aGlzLnZpZXcuc2V0VGl0bGUoY29udGVudFR5cGUudGl0bGUpO1xuICAgIHRoaXMudmlldy5zZXREZXNjcmlwdGlvbihjb250ZW50VHlwZS5kZXNjcmlwdGlvbik7XG4gICAgdGhpcy52aWV3LnNldEltYWdlKGNvbnRlbnRUeXBlLmljb24pO1xuICAgIHRoaXMudmlldy5zZXRFeGFtcGxlKGNvbnRlbnRUeXBlLmV4YW1wbGUpO1xuICAgIHRoaXMudmlldy5zZXRPd25lcihjb250ZW50VHlwZS5vd25lcik7XG4gICAgdGhpcy52aWV3LnNldElzSW5zdGFsbGVkKCEhY29udGVudFR5cGUuaW5zdGFsbGVkKTtcbiAgICB0aGlzLnZpZXcuc2V0TGljZW5jZShjb250ZW50VHlwZS5saWNlbnNlKTtcblxuICAgIC8vIHVwZGF0ZSBjYXJvdXNlbFxuICAgIHRoaXMudmlldy5yZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsKCk7XG4gICAgY29udGVudFR5cGUuc2NyZWVuc2hvdHMuZm9yRWFjaCh0aGlzLnZpZXcuYWRkSW1hZ2VUb0Nhcm91c2VsLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIHJlbW92ZUNoaWxkIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5pbXBvcnQgbm9JY29uIGZyb20gJy4uLy4uL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgcm9vdCBlbGVtZW50XG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWxpc3QnO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgcm93cyBmcm9tIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgcmVtb3ZlQWxsUm93cygpIHtcbiAgICB3aGlsZSh0aGlzLnJvb3RFbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSApe1xuICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLnJvb3RFbGVtZW50Lmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSByb3dcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICovXG4gIGFkZFJvdyhjb250ZW50VHlwZSkge1xuICAgIGNvbnN0IHJvdyA9IHRoaXMuY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHRoaXMpO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLCByb3cpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocm93KVxuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgQ29udGVudCBUeXBlIGNvbmZpZ3VyYXRpb24gYW5kIGNyZWF0ZXMgYSByb3cgZG9tXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IHNjb3BlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHNjb3BlKSB7XG4gICAgLy8gcm93IGl0ZW1cbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBlbGVtZW50LmlkID0gYGNvbnRlbnQtdHlwZS0ke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfWA7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG5cbiAgICAvLyBjcmVhdGUgYnV0dG9uIGNvbmZpZ1xuICAgIGNvbnN0IHVzZUJ1dHRvbkNvbmZpZyA9IHsgdGV4dDogJ1VzZScsIGNsczogJ2J1dHRvbi1wcmltYXJ5JywgaWNvbjogJycgfTtcbiAgICBjb25zdCBpbnN0YWxsQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnaW5zdGFsbCcsIGNsczogJ2J1dHRvbi1pbnZlcnNlLXByaW1hcnkgYnV0dG9uLWluc3RhbGwnLCBpY29uOiAnaWNvbi1hcnJvdy10aGljayd9O1xuICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRlbnRUeXBlLmluc3RhbGxlZCA/ICB1c2VCdXR0b25Db25maWc6IGluc3RhbGxCdXR0b25Db25maWc7XG5cbiAgICBjb25zdCB0aXRsZSA9IGNvbnRlbnRUeXBlLnRpdGxlIHx8IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gY29udGVudFR5cGUuc3VtbWFyeSB8fCAnJztcblxuICAgIGNvbnN0IGltYWdlID0gY29udGVudFR5cGUuaWNvbiB8fCBub0ljb247XG5cbiAgICAvLyBjcmVhdGUgaHRtbFxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZX1cIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uICR7YnV0dG9uLmNsc31cIiBkYXRhLWlkPVwiJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1cIiB0YWJpbmRleD1cIjBcIj48c3BhbiBjbGFzcz1cIiR7YnV0dG9uLmljb259XCI+PC9zcGFuPiR7YnV0dG9uLnRleHR9PC9zcGFuPlxuICAgICAgPGg0PiR7dGl0bGV9PC9oND5cbiAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPiR7ZGVzY3JpcHRpb259PC9kaXY+XG4gICBgO1xuXG4gICAgLy8gaGFuZGxlIHVzZSBidXR0b25cbiAgICBjb25zdCB1c2VCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tcHJpbWFyeScpO1xuICAgIGlmKHVzZUJ1dHRvbil7XG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0Jywgc2NvcGUsIHVzZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlTGlzdFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWxpc3Qtdmlld1wiO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBSb3cgc2VsZWN0ZWQgZXZlbnRcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIFVwZGF0ZSBjb250ZW50IHR5cGUgbGlzdCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGFkZCB0aGUgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlTGlzdFZpZXcoc3RhdGUpO1xuICAgIHRoaXMucHJvcGFnYXRlKFsncm93LXNlbGVjdGVkJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGUgdGhpcyBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGlzIGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgd2l0aCBuZXcgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlcykge1xuICAgIHRoaXMudmlldy5yZW1vdmVBbGxSb3dzKCk7XG4gICAgY29udGVudFR5cGVzLmZvckVhY2godGhpcy52aWV3LmFkZFJvdywgdGhpcy52aWV3KTtcbiAgICB0aGlzLmZpcmUoJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHt9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZpZXdzIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSwgcXVlcnlTZWxlY3RvckFsbCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IGluaXRNZW51IGZyb20gJ2NvbXBvbmVudHMvbWVudSc7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50QnJvd3NlclZpZXcge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xuICAgIHRoaXMubWVudSA9IHRoaXMuY3JlYXRlTWVudUVsZW1lbnQoKTtcbiAgICB0aGlzLmlucHV0R3JvdXAgPSB0aGlzLmNyZWF0ZUlucHV0R3JvdXBFbGVtZW50KCk7XG5cbiAgICAvLyBtZW51IGdyb3VwXG4gICAgY29uc3QgbWVudUdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVudUdyb3VwLmNsYXNzTmFtZSA9ICdtZW51LWdyb3VwJztcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQodGhpcy5tZW51KTtcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQodGhpcy5pbnB1dEdyb3VwKTtcblxuICAgIC8vIHJvb3QgZWxlbWVudFxuICAgIHRoaXMucm9vdEVsZW1lbnQgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChtZW51R3JvdXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBtZW51IGl0ZW1cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBhZGRNZW51SXRlbSh0ZXh0KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWl0ZW0nKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5maXJlKCdtZW51LXNlbGVjdGVkJywge1xuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXRcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0cyBmaXJzdCB0byBiZSBzZWxlY3RlZFxuICAgIGlmKHRoaXMubWVudUJhckVsZW1lbnQuY2hpbGRFbGVtZW50Q291bnQgPT0gMSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0byBtZW51IGJhclxuICAgIHRoaXMubWVudUJhckVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGFuaW1hdGVkIGJvcmRlciB0byB0aGUgYm90dG9tIG9mIHRoZSB0YWJcbiAgICovXG4gIGFkZEJvdHRvbUJvcmRlcigpIHtcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgbWVudSBiYXIgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlTWVudUVsZW1lbnQoKSB7XG4gICAgdGhpcy5tZW51QmFyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5tZW51QmFyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWJhcicpO1xuICAgIHRoaXMubWVudUJhckVsZW1lbnQuY2xhc3NOYW1lID0gJ2g1cC1tZW51JztcblxuICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubWVudUJhckVsZW1lbnQpO1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aXRsZS5jbGFzc05hbWUgPSBcIm1lbnUtdGl0bGVcIjtcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBcIkJyb3dzZSBjb250ZW50IHR5cGVzXCI7XG5cbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVudS5jbGFzc05hbWUgPSBcIm1lbnVcIjtcbiAgICBtZW51LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBtZW51LmFwcGVuZENoaWxkKG5hdkVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIG1lbnU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgaW5wdXQgZ3JvdXAgdXNlZCBmb3Igc2VhcmNoXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQoKSB7XG4gICAgLy8gaW5wdXQgZmllbGRcbiAgICBjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dEZpZWxkLmlkID0gXCJodWItc2VhcmNoLWJhclwiO1xuICAgIGlucHV0RmllbGQuY2xhc3NOYW1lID0gJ2Zvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtcm91bmRlZCc7XG4gICAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIFwiU2VhcmNoIGZvciBDb250ZW50IFR5cGVzXCIpO1xuICAgIGlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICB0aGlzLmZpcmUoJ3NlYXJjaCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBxdWVyeTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGlucHV0IGJ1dHRvblxuICAgIGNvbnN0IGlucHV0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5wdXRCdXR0b24uY2xhc3NOYW1lID0gJ2lucHV0LWdyb3VwLWFkZG9uIGljb24tc2VhcmNoJztcbiAgICBpbnB1dEJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1iYXInKS5mb2N1cygpXG4gICAgfTtcblxuICAgIC8vIGlucHV0IGdyb3VwXG4gICAgY29uc3QgaW5wdXRHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gJ2lucHV0LWdyb3VwJztcbiAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0RmllbGQpO1xuICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRCdXR0b24pO1xuXG4gICAgcmV0dXJuIGlucHV0R3JvdXA7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBpbnB1dCBmaWVsZFxuICAgKi9cbiAgY2xlYXJJbnB1dEZpZWxkKCkge1xuICAgIHRoaXMuaW5wdXRHcm91cC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKS52YWx1ZT0nJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBtZW51IGl0ZW0gaXMgdGhlIGZpcnN0IGNoaWxkIGluIHRoZSBtZW51XG4gICAqXG4gICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBtZW51SXRlbVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNGaXJzdE1lbnVJdGVtKG1lbnVJdGVtKSB7XG4gICAgcmV0dXJuIG1lbnVJdGVtID09PSB0aGlzLm1lbnUucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJtZW51aXRlbVwiXScpWzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhlIGZpcnN0IG1lbnUgaXRlbSBpcyBzZWxlY3RlZFxuICAgKi9cbiAgcmVzZXRNZW51U2VsZWN0aW9uKCkge1xuICAgIHRoaXMubWVudS5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cIm1lbnVpdGVtXCJdJylcbiAgICAgIC5mb3JFYWNoKG1lbnVJdGVtID0+XG4gICAgICAgIG1lbnVJdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHRoaXMuaXNGaXJzdE1lbnVJdGVtKG1lbnVJdGVtKS50b1N0cmluZygpKVxuICAgICAgKTtcbiAgfVxuXG4gIGluaXRNZW51KCkge1xuICAgIGluaXRNZW51KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsImltcG9ydCBDb250ZW50VHlwZVNlY3Rpb25WaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXdcIjtcbmltcG9ydCBTZWFyY2hTZXJ2aWNlIGZyb20gXCIuLi9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZVwiO1xuaW1wb3J0IENvbnRlbnRUeXBlTGlzdCBmcm9tICcuLi9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdCc7XG5pbXBvcnQgQ29udGVudFR5cGVEZXRhaWwgZnJvbSAnLi4vY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsJztcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMvZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb25WaWV3KHN0YXRlKTtcblxuICAgIC8vIGNvbnRyb2xsZXJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZSh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbCA9IG5ldyBDb250ZW50VHlwZURldGFpbCh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XG5cbiAgICAvLyBhZGQgbWVudSBpdGVtc1xuICAgIFsnQWxsJywgJ015IENvbnRlbnQgVHlwZXMnLCAnTW9zdCBQb3B1bGFyJ11cbiAgICAgIC5mb3JFYWNoKG1lbnVUZXh0ID0+IHRoaXMudmlldy5hZGRNZW51SXRlbShtZW51VGV4dCkpO1xuICAgIHRoaXMudmlldy5hZGRCb3R0b21Cb3JkZXIoKTtcbiAgICB0aGlzLnZpZXcuaW5pdE1lbnUoKTtcblxuICAgIC8vIEVsZW1lbnQgZm9yIGhvbGRpbmcgbGlzdCBhbmQgZGV0YWlscyB2aWV3c1xuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtdHlwZS1zZWN0aW9uJyk7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gc2VjdGlvbjtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVMaXN0LmdldEVsZW1lbnQoKSk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmdldEVsZW1lbnQoKSk7XG5cbiAgICB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCddLCB0aGlzLmNvbnRlbnRUeXBlTGlzdCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XG5cbiAgICAvLyByZWdpc3RlciBsaXN0ZW5lcnNcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMuc2VhcmNoLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMucmVzZXRNZW51U2VsZWN0aW9uLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmFwcGx5U2VhcmNoRmlsdGVyLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmNsZWFySW5wdXRGaWVsZCwgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Qub24oJ3Jvdy1zZWxlY3RlZCcsIHRoaXMuc2hvd0RldGFpbFZpZXcsIHRoaXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwub24oJ2Nsb3NlJywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwub24oJ3NlbGVjdCcsIHRoaXMuY2xvc2VEZXRhaWxWaWV3LCB0aGlzKTtcblxuICAgIHRoaXMuaW5pdENvbnRlbnRUeXBlTGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3Qgd2l0aCBhIHNlYXJjaFxuICAgKi9cbiAgaW5pdENvbnRlbnRUeXBlTGlzdCgpIHtcbiAgICAvLyBpbml0aWFsaXplIGJ5IHNlYXJjaFxuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goXCJcIilcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmZpcmUoJ2Vycm9yJywgZXJyb3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBhIHNlYXJjaCBhbmQgdXBkYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3RcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XG4gICAqL1xuICBzZWFyY2goe3F1ZXJ5fSkge1xuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2gocXVlcnkpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpO1xuICB9XG5cbiAgLyoqXG4gICAqICBFbnN1cmVzIHRoZSBmaXJzdCBtZW51IGVsZW1lbnQgaXMgc2VsZWN0ZWRcbiAgICovXG4gIHJlc2V0TWVudVNlbGVjdGlvbigpIHtcbiAgICB0aGlzLnZpZXcucmVzZXRNZW51U2VsZWN0aW9uKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGFwcGx5IGEgc2VhcmNoIGZpbHRlclxuICAgKi9cbiAgYXBwbHlTZWFyY2hGaWx0ZXIoKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnQ29udGVudFR5cGVTZWN0aW9uOiBtZW51IHdhcyBjbGlja2VkIScsIGV2ZW50KTtcbiAgfVxuXG4gIGNsZWFySW5wdXRGaWVsZCh7ZWxlbWVudH0pIHtcbiAgICBpZiAoIXRoaXMudmlldy5pc0ZpcnN0TWVudUl0ZW0oZWxlbWVudCkpIHtcbiAgICAgIHRoaXMudmlldy5jbGVhcklucHV0RmllbGQoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIGRldGFpbCB2aWV3XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2hvd0RldGFpbFZpZXcoe2lkfSkge1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmxvYWRCeUlkKGlkKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLnNob3coKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENsb3NlIGRldGFpbCB2aWV3XG4gICAqL1xuICBjbG9zZURldGFpbFZpZXcoKSB7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5oaWRlKCk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Quc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxuaW1wb3J0IGluaXRUYWJQYW5lbCBmcm9tIFwiY29tcG9uZW50cy90YWItcGFuZWxcIlxuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4vdXRpbHMvZXZlbnRzJztcbi8qKlxuICogVGFiIGNoYW5nZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjdGFiLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBQYW5lbCBvcGVuIG9yIGNsb3NlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyNwYW5lbC1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9EQVRBX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YlZpZXcjdGFiLWNoYW5nZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJWaWV3IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgdGhpcy5yZW5kZXJUYWJQYW5lbChzdGF0ZSk7XG4gICAgdGhpcy5yZW5kZXJQYW5lbChzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBwYW5lbFxuICAgKi9cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICogQHBhcmFtIHtib29sZWFufSBleHBhbmRlZFxuICAgKi9cbiAgcmVuZGVyUGFuZWwoe3RpdGxlID0gJycsIHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGl0bGUuY2xhc3NOYW1lICs9IFwicGFuZWwtaGVhZGVyIGljb24taHViLWljb25cIjtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWApO1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3BhbmVsLWNoYW5nZScsIHRoaXMsIHRoaXMudGl0bGUpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYm9keS5jbGFzc05hbWUgKz0gXCJwYW5lbC1ib2R5XCI7XG4gICAgdGhpcy5ib2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLmJvZHkuaWQgPSBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSBgcGFuZWwgaDVwLXNlY3Rpb24tJHtzZWN0aW9uSWR9YDtcbiAgICBpZihleHBhbmRlZCl7XG4gICAgICB0aGlzLnBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICB9XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuYm9keSk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSArPSBgaDVwIGg1cC1odWJgO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gICAgaW5pdFBhbmVsKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpZiBwYW5lbCBpcyBvcGVuLCB0aGlzIGlzIHVzZWQgZm9yIG91dGVyIGJvcmRlciBjb2xvclxuICAgKi9cbiAgdG9nZ2xlUGFuZWxPcGVuKCkge1xuICAgIGxldCBwYW5lbCA9IHRoaXMucGFuZWw7XG4gICAgaWYoaXNPcGVuKHBhbmVsKSkge1xuICAgICAgcGFuZWwucmVtb3ZlQXR0cmlidXRlKCdvcGVuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3BhbmVsLnF1ZXJ5U2VsZWN0b3IoJyNodWItc2VhcmNoLWJhcicpLmZvY3VzKCl9LDIwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgdGFiIHBhbmVsXG4gICAqL1xuICByZW5kZXJUYWJQYW5lbChzdGF0ZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYmxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMudGFibGlzdC5jbGFzc05hbWUgKz0gXCJ0YWJsaXN0XCI7XG4gICAgdGhpcy50YWJsaXN0LnNldEF0dHJpYnV0ZSAoJ3JvbGUnLCAndGFibGlzdCcpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKHRoaXMudGFibGlzdCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmNsYXNzTmFtZSArPSAndGFiLXBhbmVsJztcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50YWJMaXN0V3JhcHBlcik7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHRhYlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRlbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxuICAgKi9cbiAgYWRkVGFiKHt0aXRsZSwgaWQsIGNvbnRlbnQsIHNlbGVjdGVkID0gZmFsc2V9KSB7XG4gICAgY29uc3QgdGFiSWQgPSBgdGFiLSR7aWR9YDtcbiAgICBjb25zdCB0YWJQYW5lbElkID0gYHRhYi1wYW5lbC0ke2lkfWA7XG5cbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRhYi5jbGFzc05hbWUgKz0gJ3RhYic7XG4gICAgdGFiLmlkID0gdGFiSWQ7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRhYlBhbmVsSWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBzZWxlY3RlZC50b1N0cmluZygpKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKEFUVFJJQlVURV9EQVRBX0lELCBpZCk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWInKTtcbiAgICB0YWIuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3RhYi1jaGFuZ2UnLCB0aGlzLCB0YWIpO1xuXG4gICAgY29uc3QgdGFiUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YWJQYW5lbC5pZCA9IHRhYlBhbmVsSWQ7XG4gICAgdGFiUGFuZWwuY2xhc3NOYW1lICs9ICd0YWJwYW5lbCc7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmxsZWRieScsIHRhYklkKTtcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgKCFzZWxlY3RlZCkudG9TdHJpbmcoKSk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYnBhbmVsJyk7XG4gICAgdGFiUGFuZWwuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQodGFiKTtcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGFiUGFuZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gYW5pbWF0ZWQgYm9yZGVyIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhYlxuICAgKi9cbiAgYWRkQm90dG9tQm9yZGVyKCkge1xuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpO1xuICB9XG5cbiAgaW5pdFRhYlBhbmVsKCkge1xuICAgIGluaXRUYWJQYW5lbCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRTZWN0aW9uVHlwZSh7aWR9KSB7XG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgPSBgaDVwLXNlY3Rpb24tJHtpZH0gcGFuZWxgO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJpbXBvcnQge2N1cnJ5fSBmcm9tICd1dGlscy9mdW5jdGlvbmFsJ1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4uL2h1Yi1zZXJ2aWNlcyc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBUaGUgU2VhcmNoIFNlcnZpY2UgZ2V0cyBhIGNvbnRlbnQgdHlwZSBmcm9tIGh1Yi1zZXJ2aWNlcy5qc1xuICogaW4gdGhlIGZvcm0gb2YgYSBwcm9taXNlLiBJdCB0aGVuIGdlbmVyYXRlcyBhIHNjb3JlIGJhc2VkXG4gKiBvbiB0aGUgZGlmZmVyZW50IHdlaWdodGluZ3Mgb2YgdGhlIGNvbnRlbnQgdHlwZSBmaWVsZHMgYW5kXG4gKiBzb3J0cyB0aGUgcmVzdWx0cyBiYXNlZCBvbiB0aGUgZ2VuZXJhdGVkIHNjb3JlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUuYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIEFkZCBjb250ZW50IHR5cGVzIHRvIHRoZSBzZWFyY2ggaW5kZXhcbiAgICB0aGlzLmNvbnRlbnRUeXBlcyA9IHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBzZWFyY2hcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXT59IEEgcHJvbWlzZSBvZiBhbiBhcnJheSBvZiBjb250ZW50IHR5cGVzXG4gICAqL1xuICBzZWFyY2gocXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50VHlwZXMudGhlbihmaWx0ZXJCeVF1ZXJ5KHF1ZXJ5KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBGaWx0ZXJzIGEgbGlzdCBvZiBjb250ZW50IHR5cGVzIGJhc2VkIG9uIGEgcXVlcnlcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcbiAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gKi9cbmNvbnN0IGZpbHRlckJ5UXVlcnkgPSBjdXJyeShmdW5jdGlvbihxdWVyeSwgY29udGVudFR5cGVzKSB7XG4gIGlmIChxdWVyeSA9PSAnJykge1xuICAgIHJldHVybiBjb250ZW50VHlwZXM7XG4gIH1cblxuICAvLyBBcHBlbmQgYSBzZWFyY2ggc2NvcmUgdG8gZWFjaCBjb250ZW50IHR5cGVcbiAgcmV0dXJuIGNvbnRlbnRUeXBlcy5tYXAoY29udGVudFR5cGUgPT5cbiAgICAoe1xuICAgICAgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgc2NvcmU6IGdldFNlYXJjaFNjb3JlKHF1ZXJ5LCBjb250ZW50VHlwZSlcbiAgICB9KSlcbiAgICAuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc2NvcmUgPiAwKVxuICAgIC5zb3J0KHNvcnRTZWFyY2hSZXN1bHRzKSAvLyBTb3J0IGJ5IGluc3RhbGxlZCwgcmVsZXZhbmNlIGFuZCBwb3B1bGFyaXR5XG4gICAgLm1hcChyZXN1bHQgPT4gcmVzdWx0LmNvbnRlbnRUeXBlKTsgLy8gVW53cmFwIHJlc3VsdCBvYmplY3Q7XG59KTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgQXJyYXkuc29ydCgpXG4gKiBDb21wYXJlcyB0d28gY29udGVudCB0eXBlcyBvbiBkaWZmZXJlbnQgY3JpdGVyaWFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBGaXJzdCBjb250ZW50IHR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFNlY29uZCBjb250ZW50IHR5cGVcbiAqIEByZXR1cm4ge2ludH1cbiAqL1xuY29uc3Qgc29ydFNlYXJjaFJlc3VsdHMgPSAoYSxiKSA9PiB7XG4gIGlmICghYS5jb250ZW50VHlwZS5pbnN0YWxsZWQgJiYgYi5jb250ZW50VHlwZS5pbnN0YWxsZWQpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmIChhLmNvbnRlbnRUeXBlLmluc3RhbGxlZCAmJiAhYi5jb250ZW50VHlwZS5pbnN0YWxsZWQpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBlbHNlIGlmIChiLnNjb3JlICE9PSBhLnNjb3JlKSB7XG4gICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlO1xuICB9XG5cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGIuY29udGVudFR5cGUucG9wdWxhcml0eSAtIGEuY29udGVudFR5cGUucG9wdWxhcml0eTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHdlaWdodGluZyBmb3IgZGlmZmVyZW50IHNlYXJjaCB0ZXJtcyBiYXNlZFxuICogb24gZXhpc3RlbmNlIG9mIHN1YnN0cmluZ3NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRlbnRUeXBlXG4gKiBAcmV0dXJuIHtpbnR9XG4gKi9cbiBjb25zdCBnZXRTZWFyY2hTY29yZSA9IGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZSkge1xuICAgbGV0IHF1ZXJpZXMgPSBxdWVyeS5zcGxpdCgnICcpLmZpbHRlcihxdWVyeSA9PiBxdWVyeSAhPT0gJycpO1xuICAgbGV0IHF1ZXJ5U2NvcmVzID0gcXVlcmllcy5tYXAocXVlcnkgPT4gZ2V0U2NvcmVGb3JFYWNoUXVlcnkocXVlcnksIGNvbnRlbnRUeXBlKSk7XG4gICBpZiAocXVlcnlTY29yZXMuaW5kZXhPZigwKSA+IC0xKSB7XG4gICAgIHJldHVybiAwO1xuICAgfVxuICAgcmV0dXJuIHF1ZXJ5U2NvcmVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuIH07XG5cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByZWxldmFuY2Ugc2NvcmUgZm9yIGEgc2luZ2xlIHN0cmluZ1xuICpcbiAqIEBwYXJhbSAge3R5cGV9IHF1ZXJ5ICAgICAgIGRlc2NyaXB0aW9uXG4gKiBAcGFyYW0gIHt0eXBlfSBjb250ZW50VHlwZSBkZXNjcmlwdGlvblxuICogQHJldHVybiB7dHlwZX0gICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAqL1xuY29uc3QgZ2V0U2NvcmVGb3JFYWNoUXVlcnkgPSBmdW5jdGlvbiAocXVlcnksIGNvbnRlbnRUeXBlKSB7XG4gICBxdWVyeSA9IHF1ZXJ5LnRyaW0oKTtcbiAgIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLnRpdGxlKSkge1xuICAgICByZXR1cm4gMTAwO1xuICAgfVxuICAgZWxzZSBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5zdW1tYXJ5KSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuZGVzY3JpcHRpb24pKSB7XG4gICAgIHJldHVybiA1O1xuICAgfVxuICAgZWxzZSBpZiAoYXJyYXlIYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmtleXdvcmRzKSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2Uge1xuICAgICByZXR1cm4gMDtcbiAgIH1cbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbmVlZGxlIGlzIGZvdW5kIGluIHRoZSBoYXlzdGFjay5cbiAqIE5vdCBjYXNlIHNlbnNpdGl2ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuZWVkbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXlzdGFja1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaGFzU3ViU3RyaW5nID0gZnVuY3Rpb24obmVlZGxlLCBoYXlzdGFjaykge1xuICBpZiAoaGF5c3RhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBoYXlzdGFjay50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlLnRvTG93ZXJDYXNlKCkpICE9PSAtMTtcbn07XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uLCBjaGVja3MgaWYgYXJyYXkgaGFzIGNvbnRhaW5zIGEgc3Vic3RyaW5nXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBzdWJTdHJpbmdcbiAqIEBwYXJhbSAge0FycmF5fSBhcnJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGFycmF5SGFzU3ViU3RyaW5nID0gZnVuY3Rpb24oc3ViU3RyaW5nLCBhcnIpIHtcbiAgaWYgKGFyciA9PT0gdW5kZWZpbmVkIHx8IHN1YlN0cmluZyA9PT0gJycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYXJyLnNvbWUoc3RyaW5nID0+IGhhc1N1YlN0cmluZyhzdWJTdHJpbmcsIHN0cmluZykpO1xufTtcblxuY29uc3QgQWRkTnVtYmVyPWZ1bmN0aW9uKGEsYilcbntcbiAgcmV0dXJuIGErYjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwiaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4uL2h1Yi1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3VwbG9hZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRTZWN0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gSW5wdXQgZWxlbWVudCBmb3IgdGhlIEg1UCBmaWxlXG4gICAgY29uc3QgaDVwVXBsb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBoNXBVcGxvYWQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2ZpbGUnKTtcblxuICAgIC8vIFNlbmRzIHRoZSBINVAgZmlsZSB0byB0aGUgcGx1Z2luXG4gICAgY29uc3QgdXNlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdXNlQnV0dG9uLnRleHRDb250ZW50ID0gJ1VzZSc7XG4gICAgdXNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAvLyBBZGQgdGhlIEg1UCBmaWxlIHRvIGEgZm9ybSwgcmVhZHkgZm9yIHRyYW5zcG9ydGF0aW9uXG4gICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBkYXRhLmFwcGVuZCgnaDVwJywgaDVwVXBsb2FkLmZpbGVzWzBdKTtcblxuICAgICAgLy8gVXBsb2FkIGNvbnRlbnQgdG8gdGhlIHBsdWdpblxuICAgICAgdGhpcy5zZXJ2aWNlcy51cGxvYWRDb250ZW50KGRhdGEpXG4gICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgIC8vIEZpcmUgdGhlIHJlY2VpdmVkIGRhdGEgdG8gYW55IGxpc3RlbmVyc1xuICAgICAgICAgIHNlbGYuZmlyZSgndXBsb2FkJywganNvbik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaDVwVXBsb2FkKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHVzZUJ1dHRvbik7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSwgY2xhc3NMaXN0Q29udGFpbnMsIHF1ZXJ5U2VsZWN0b3IsIG5vZGVMaXN0VG9BcnJheSB9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICovXG5jb25zdCBBVFRSSUJVVEVfU0laRSA9ICdkYXRhLXNpemUnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgZGlzYWJsZSA9IHNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBlbmFibGUgPSByZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBlbmFibGVkXG4gKi9cbmNvbnN0IHRvZ2dsZUVuYWJsZWQgPSAoZWxlbWVudCwgZW5hYmxlZCkgPT4gKGVuYWJsZWQgPyBlbmFibGUgOiBkaXNhYmxlKShlbGVtZW50KTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGhpZGRlblxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gY3VycnkoKGhpZGRlbiwgZWxlbWVudCkgPT4gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGhpZGRlbi50b1N0cmluZygpLCBlbGVtZW50KSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBpc0Rpc2FibGVkID0gaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgdmlld1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICovXG5jb25zdCB1cGRhdGVWaWV3ID0gKGVsZW1lbnQsIHN0YXRlKSA9PiB7XG4gIGNvbnN0IHByZXZCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2aW91cycpO1xuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICBjb25zdCBsaXN0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICBjb25zdCB0b3RhbENvdW50ID0gbGlzdC5jaGlsZEVsZW1lbnRDb3VudDtcblxuICAvLyB1cGRhdGUgbGlzdCBzaXplc1xuICBsaXN0LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gc3RhdGUuZGlzcGxheUNvdW50ICogdG90YWxDb3VudH0lYDtcbiAgbGlzdC5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7c3RhdGUucG9zaXRpb24gKiAoMTAwIC8gc3RhdGUuZGlzcGxheUNvdW50KX0lYDtcblxuICAvLyB1cGRhdGUgaW1hZ2Ugc2l6ZXNcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXG4gICAgLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gdG90YWxDb3VudH0lYCk7XG5cbiAgLy8gdG9nZ2xlIGJ1dHRvbiB2aXNpYmlsaXR5XG4gIFtwcmV2QnV0dG9uLCBuZXh0QnV0dG9uXVxuICAgIC5mb3JFYWNoKHRvZ2dsZVZpc2liaWxpdHkoc3RhdGUuZGlzcGxheUNvdW50ID49IHRvdGFsQ291bnQpKTtcblxuICAvLyB0b2dnbGUgYnV0dG9uIGVuYWJsZSwgZGlzYWJsZWRcbiAgdG9nZ2xlRW5hYmxlZChuZXh0QnV0dG9uLCBzdGF0ZS5wb3NpdGlvbiA+IChzdGF0ZS5kaXNwbGF5Q291bnQgLSB0b3RhbENvdW50KSk7XG4gIHRvZ2dsZUVuYWJsZWQocHJldkJ1dHRvbiwgc3RhdGUucG9zaXRpb24gPCAwKTtcbn07XG5cbi8qKlxuICogSGFuZGxlcyBidXR0b24gY2xpY2tlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gdXBkYXRlU3RhdGVcbiAqIEBwYXJhbSB7RXZlbnR9XG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2sgPSBjdXJyeSgoZWxlbWVudCwgc3RhdGUsIHVwZGF0ZVN0YXRlLCBldmVudCkgPT4ge1xuICBpZighaXNEaXNhYmxlZChldmVudC50YXJnZXQpKXtcbiAgICB1cGRhdGVTdGF0ZShzdGF0ZSk7XG4gICAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG4gIH1cbn0pO1xuXG5jb25zdCBpbml0SW1hZ2UgPSBjdXJyeSgoZWxlbWVudCwgaW1hZ2UpID0+IHtcbiAgbGV0IHRhcmdldElkID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gIGxldCB0YXJnZXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhcmdldElkfWApO1xuXG4gIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XG4gIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKSlcbn0pO1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciB3aGVuIHRoZSBkb20gaXMgdXBkYXRlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gcmVjb3JkXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGFuZGxlRG9tVXBkYXRlID0gY3VycnkoKGVsZW1lbnQsIHN0YXRlLCByZWNvcmQpID0+IHtcbiAgLy8gb24gYWRkIGltYWdlIHJ1biBpbml0aWFsaXphdGlvblxuICBpZihyZWNvcmQudHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICBub2RlTGlzdFRvQXJyYXkocmVjb3JkLmFkZGVkTm9kZXMpXG4gICAgICAuZmlsdGVyKGNsYXNzTGlzdENvbnRhaW5zKCdzbGlkZScpKVxuICAgICAgLm1hcChxdWVyeVNlbGVjdG9yKCdpbWcnKSlcbiAgICAgIC5mb3JFYWNoKGluaXRJbWFnZShlbGVtZW50KSk7XG4gIH1cblxuICAvLyB1cGRhdGUgdGhlIHZpZXdcbiAgdXBkYXRlVmlldyhlbGVtZW50LCBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgZGlzcGxheUNvdW50OiBlbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfU0laRSkgfHwgNSxcbiAgICBwb3NpdGlvbjogMFxuICB9KSk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICAvKipcbiAgICogQHR5cGVkZWYge29iamVjdH0gSW1hZ2VTY3JvbGxlclN0YXRlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkaXNwbGF5Q291bnRcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHBvc2l0aW9uXG4gICAqL1xuICBjb25zdCBzdGF0ZSA9IHtcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxuICAgIHBvc2l0aW9uOiAwXG4gIH07XG5cbiAgLy8gaW5pdGlhbGl6ZSBidXR0b25zXG4gIGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrKGVsZW1lbnQsIHN0YXRlLCBzdGF0ZSA9PiBzdGF0ZS5wb3NpdGlvbi0tKSk7XG4gIGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXZpb3VzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk5hdmlnYXRpb25CdXR0b25DbGljayhlbGVtZW50LCBzdGF0ZSwgc3RhdGUgPT4gc3RhdGUucG9zaXRpb24rKykpO1xuXG4gIC8vIGluaXRpYWxpemUgaW1hZ2VzXG4gIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2FyaWEtY29udHJvbHNdJykuZm9yRWFjaChpbml0SW1hZ2UoZWxlbWVudCkpO1xuXG4gIC8vIGxpc3RlbiBmb3IgdXBkYXRlcyB0byBkYXRhLXNpemVcbiAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZm9yRWFjaChoYW5kbGVEb21VcGRhdGUoZWxlbWVudCwgc3RhdGUpKSk7XG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCB7XG4gICAgc3VidHJlZTogdHJ1ZSxcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtBVFRSSUJVVEVfU0laRV1cbiAgfSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBwb3NpdGlvblxuICB1cGRhdGVWaWV3KGVsZW1lbnQsIHN0YXRlKTtcblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyLmpzIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Zm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCBtZW51SXRlbXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKTtcblxuICBtZW51SXRlbXMuZm9yRWFjaChtZW51SXRlbSA9PiB7XG4gICAgbWVudUl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjbGljaycpO1xuICAgICAgdW5TZWxlY3RBbGwobWVudUl0ZW1zKTtcbiAgICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgIH0pO1xuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9tZW51LmpzIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Zm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBoaWRlQWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0YWJzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYlwiXScpO1xuICBjb25zdCB0YWJQYW5lbHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFicGFuZWxcIl0nKTtcblxuICB0YWJzLmZvckVhY2godGFiID0+IHtcbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgdW5TZWxlY3RBbGwodGFicyk7XG4gICAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcblxuICAgICAgaGlkZUFsbCh0YWJQYW5lbHMpO1xuXG4gICAgICBsZXQgdGFiUGFuZWxJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICAgIHNob3coZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0YWJQYW5lbElkfWApKTtcbiAgICB9KTtcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwicmVxdWlyZSgnLi4vLi4vc3JjL3N0eWxlcy9tYWluLnNjc3MnKTtcblxuLy8gTG9hZCBsaWJyYXJ5XG5INVAgPSBINVAgfHwge307XG5INVAuSHViQ2xpZW50ID0gcmVxdWlyZSgnLi4vc2NyaXB0cy9odWInKS5kZWZhdWx0O1xuSDVQLkh1YkNsaWVudC5yZW5kZXJFcnJvck1lc3NhZ2UgPSByZXF1aXJlKCcuLi9zY3JpcHRzL3V0aWxzL2Vycm9ycycpLmRlZmF1bHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==