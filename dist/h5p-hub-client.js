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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
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
     * Triggers event. If any of the listeners returns false, return false
     *
     * @param {string} type
     * @param {object} [event]
     *
     * @function
     * @return {boolean}
     */
    trigger: function trigger(type, event) {
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
     * @param {String} [eventName] the name of the event when propogated
     */
    propagate: function propagate(types, eventful, newType) {
      var self = this;
      types.forEach(function (type) {
        return eventful.on(type, function (event) {
          return self.trigger(newType || type, event);
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
exports.toggleClass = exports.toggleVisibility = exports.show = exports.hide = exports.nodeListToArray = exports.classListContains = exports.removeChild = exports.querySelectorAll = exports.querySelector = exports.appendChild = exports.toggleAttribute = exports.attributeEquals = exports.hasAttribute = exports.removeAttribute = exports.setAttribute = exports.getAttribute = undefined;

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

/**
 * Adds aria-hidden=true to an element
 *
 * @param {HTMLElement} element
 * @function
 */
var hide = exports.hide = setAttribute('aria-hidden', 'true');

/**
 * Adds aria-hidden=false to an element
 * @function
 */
var show = exports.show = setAttribute('aria-hidden', 'false');

/**
 * Toggles aria-hidden on an element
 *
 * @param {boolean} visible
 * @param {HTMLElement} element
 */
var toggleVisibility = exports.toggleVisibility = (0, _functional.curry)(function (visible, element) {
  return (visible ? show : hide)(element);
});

/**
 * Toggles a class on an element
 *
 * @param {string} cls
 * @param {boolean} add
 * @param {HTMLElement} element
 */
var toggleClass = exports.toggleClass = (0, _functional.curry)(function (cls, add, element) {
  return element.classList[add ? 'add' : 'remove'](cls);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(45);

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
    this.setup();
  }

  /**
   * Fetch the content type metadata
   */


  _createClass(HubServices, [{
    key: 'setup',
    value: function setup() {
      this.cachedContentTypes = fetch(this.apiRootUrl + 'content-type-cache', {
        method: 'GET',
        credentials: 'include'
      }).then(function (result) {
        return result.json();
      }).then(this.isValid).then(function (json) {
        return json.libraries;
      });
    }

    /**
     *
     * @param  {ContentType[]|ErrorMessage} response
     * @return {Promise<ContentType[]|ErrorMessage>}
     */

  }, {
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
      return this.cachedContentTypes;
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
      return this.cachedContentTypes.then(function (contentTypes) {
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

    // for testing with error
    /*installContentType(id) {
      return fetch(`${this.apiRootUrl}library-install`, {
        method: 'GET',
        credentials: 'include'
      })
        .then(result => result.json())
        .then(result => {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              return resolve(result);
            }, 1000);
          });
        });
    }*/

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
    eventful.trigger(type, {
      element: element,
      id: element.getAttribute('data-id')
    }, false);

    // don't bubble
    event.stopPropagation();
  });

  return element;
});

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _collapsible = __webpack_require__(42);

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
function init(element) {
  (0, _collapsible.initCollapsible)(element);
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

var _dictionary = __webpack_require__(43);

var _dictionary2 = _interopRequireDefault(_dictionary);

var _eventful = __webpack_require__(1);

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
  function Hub(state, dictionary) {
    _classCallCheck(this, Hub);

    // add event system
    _extends(this, (0, _eventful.Eventful)());
    var self = this;

    // Setting up Dictionary
    _dictionary2.default.init(dictionary);

    // services
    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

    // controllers
    this.contentTypeSection = new _contentTypeSection2.default(state, this.services);
    this.uploadSection = new _uploadSection2.default(state, this.services);

    // views
    this.view = new _hubView2.default(state);

    // propagate controller events
    this.propagate(['select'], this.contentTypeSection);
    this.propagate(['upload'], this.uploadSection);

    // handle events
    this.on('select', this.setPanelTitle, this);
    this.on('select', this.view.closePanel, this.view);
    this.view.on('tab-change', this.view.setSectionType, this.view);
    this.view.on('panel-change', this.view.togglePanelOpen.bind(this.view), this.view);
    this.contentTypeSection.on('reload', function () {
      self.services.setup();
      self.contentTypeSection.initContentTypeList();
    });

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

var _functional = __webpack_require__(0);

var _eventful = __webpack_require__(1);

var _panel = __webpack_require__(6);

var _panel2 = _interopRequireDefault(_panel);

var _imageScroller = __webpack_require__(22);

var _imageScroller2 = _interopRequireDefault(_imageScroller);

var _events = __webpack_require__(4);

var _contentTypePlaceholder = __webpack_require__(7);

var _contentTypePlaceholder2 = _interopRequireDefault(_contentTypePlaceholder);

var _dictionary = __webpack_require__(43);

var _dictionary2 = _interopRequireDefault(_dictionary);

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
 * Toggles the visibility if an element
 *
 * @param {HTMLElement} element
 * @param {boolean} visible
 */
var toggleVisibility = function toggleVisibility(element, visible) {
  return (visible ? _elements.show : _elements.hide)(element);
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

var hideAll = (0, _functional.forEach)(_elements.hide);

/**
 * @class
 * @mixes Eventful
 */

var ContentTypeDetailView = function () {
  function ContentTypeDetailView(state) {
    var _this = this;

    _classCallCheck(this, ContentTypeDetailView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // create view
    this.rootElement = this.createView();

    // grab references
    this.buttonBar = this.rootElement.querySelector('.button-bar');
    this.useButton = this.buttonBar.querySelector('.button-use');
    this.installButton = this.buttonBar.querySelector('.button-install');
    this.buttons = this.buttonBar.querySelectorAll('.button');

    this.image = this.rootElement.querySelector('.content-type-image');
    this.title = this.rootElement.querySelector('.text-details .title');
    this.owner = this.rootElement.querySelector('.owner');
    this.description = this.rootElement.querySelector('.text-details .small');
    this.demoButton = this.rootElement.querySelector('.demo-button');
    this.carousel = this.rootElement.querySelector('.carousel');
    this.carouselList = this.carousel.querySelector('ul');
    this.licencePanel = this.rootElement.querySelector('.licence-panel');
    this.installMessage = this.rootElement.querySelector('.install-message');

    // hide message on close button click
    var installMessageClose = this.installMessage.querySelector('.message-close');
    installMessageClose.addEventListener('click', function () {
      return (0, _elements.hide)(_this.installMessage);
    });

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
      var labelBack = 'Back'; // todo translate me
      var element = document.createElement('div');
      element.className = 'content-type-detail';
      element.setAttribute('aria-hidden', 'true');
      element.innerHTML = "\n      <button class=\"back-button icon-arrow-thick\" aria-label=\"" + labelBack + "\" tabindex=\"0\"></button>\n      <div class=\"container\">\n        <div class=\"image-wrapper\"><img class=\"img-responsive content-type-image\" src=\"" + _contentTypePlaceholder2.default + "\"></div>\n        <div class=\"text-details\">\n          <h2 class=\"title\"></h2>\n          <div class=\"owner\"></div>\n          <p class=\"small\"></p>\n          <a class=\"button demo-button\" target=\"_blank\" aria-hidden=\"false\" href=\"#\">Content Demo</a>\n        </div>\n      </div>\n      <div class=\"carousel\" role=\"region\" data-size=\"5\">\n        <span class=\"carousel-button previous\" aria-hidden=\"true\" disabled><span class=\"icon-arrow-thick\"></span></span>\n        <span class=\"carousel-button next\" aria-hidden=\"true\" disabled><span class=\"icon-arrow-thick\"></span></span>\n        <nav class=\"scroller\">\n          <ul></ul>\n        </nav>\n      </div>\n      <hr />\n      <div class=\"install-message message dismissible simple info\" aria-hidden=\"true\">\n        <div class=\"message-close icon-close\"></div>\n        <h3></h3>\n      </div>\n      <div class=\"button-bar\">\n        <span class=\"button button-primary button-use\" aria-hidden=\"false\" data-id=\"\">Use</span>\n        <span class=\"button button-inverse-primary button-install\" aria-hidden=\"true\" data-id=\"\"><span class=\"icon-arrow-thick\"></span>" + _dictionary2.default.get('installButtonLabel') + "</span>\n        <span class=\"button button-inverse-primary button-installing\" aria-hidden=\"true\"><span class=\"icon-loading-search icon-spin\"></span>Installing</span>\n      </div>\n      <div class=\"panel-group\">\n        <div class=\"panel licence-panel\" aria-hidden=\"true\">\n          <div class=\"panel-header\" aria-expanded=\"false\" aria-controls=\"licence-panel\"><span class=\"icon-accordion-arrow\"></span> The Licence Info</div>\n          <div class=\"panel-body\" id=\"licence-panel\" aria-hidden=\"true\">\n            <div class=\"panel-body-inner\"></div>\n          </div>\n        </div>\n      </div>";

      return element;
    }

    /**
     * Sets a message on install
     *
     * @param {boolean} success
     * @param {string} message
     */

  }, {
    key: "setInstallMessage",
    value: function setInstallMessage(_ref) {
      var _ref$success = _ref.success,
          success = _ref$success === undefined ? true : _ref$success,
          message = _ref.message;

      this.installMessage.querySelector('h3').innerText = message;
      this.installMessage.className = "install-message dismissible message simple " + (success ? 'info' : 'error');
      (0, _elements.show)(this.installMessage);
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
     * Resets the detail view
     */

  }, {
    key: "reset",
    value: function reset() {
      (0, _elements.hide)(this.installMessage);
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
      var _this2 = this;

      if (text.length > MAX_TEXT_SIZE_DESCRIPTION) {
        this.description.innerHTML = this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text) + "<span class=\"read-more link\">Read more</span>";
        this.description.querySelector('.read-more, .read-less').addEventListener('click', function () {
          return _this2.toggleDescriptionExpanded(text);
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
      var _this3 = this;

      // flip boolean
      this.descriptionExpanded = !this.descriptionExpanded;

      if (this.descriptionExpanded) {
        this.description.innerHTML = text + "<span class=\"read-less link\">Read less</span>";
      } else {
        this.description.innerHTML = this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text) + "<span class=\"read-more link\">Read more</span>";
      }

      this.description.querySelector('.read-more, .read-less').addEventListener('click', function () {
        return _this3.toggleDescriptionExpanded(text);
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
        (0, _elements.show)(this.licencePanel);
      } else {
        (0, _elements.hide)(this.licencePanel);
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
      this.showButtonBySelector(installed ? '.button-use' : '.button-install');
    }

    /**
     * Marks content type as restricted, disabling installing and using the content type.
     *
     * @param {boolean} restricted True if content type is restricted
     */

  }, {
    key: "setIsRestricted",
    value: function setIsRestricted(restricted) {
      this.useButton.setAttribute('disabled', restricted ? 'disabled' : '');
      this.installButton.setAttribute('disabled', restricted ? 'disabled' : '');
    }

    /**
     * Hides all buttons and shows the button on the selector again
     *
     * @param {string}selector
     */

  }, {
    key: "showButtonBySelector",
    value: function showButtonBySelector(selector) {
      var button = this.buttonBar.querySelector(selector);

      if (button) {
        hideAll(this.buttons);
        (0, _elements.show)(button);
      }
    }

    /**
     * Hides the root element
     */

  }, {
    key: "hide",
    value: function hide() {
      (0, _elements.hide)(this.rootElement);
    }

    /**
     * Shows the root element
     */

  }, {
    key: "show",
    value: function show() {
      (0, _elements.show)(this.rootElement);
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

var _eventful = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @mixes Eventful
 */
var ContentTypeDetail = function () {
  function ContentTypeDetail(state, services) {
    _classCallCheck(this, ContentTypeDetail);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // services
    this.services = services;

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
    key: 'hide',
    value: function hide() {
      this.view.hide();
    }

    /**
     * Shows the detail view
     */

  }, {
    key: 'show',
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
    key: 'loadById',
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
    key: 'install',
    value: function install(_ref) {
      var _this = this;

      var id = _ref.id;

      // set spinner
      this.view.showButtonBySelector('.button-installing');

      return this.services.contentType(id).then(function (contentType) {
        return _this.services.installContentType(contentType.machineName);
      }).then(function (contentType) {
        _this.view.setIsInstalled(true);
        _this.view.showButtonBySelector('.button-get');
        _this.view.setInstallMessage({
          message: contentType.title + ' successfully installed!'
        });
      }).catch(function (error) {
        _this.view.showButtonBySelector('.button-install');

        // print error message
        var errorMessage = error.errorCode ? error : {
          success: false,
          errorCode: 'RESPONSE_FAILED',
          message: id + ' could not be installed! Contact your administrator.'
        };
        _this.view.setInstallMessage(errorMessage);

        // log whole error message to console
        console.error('Installation error', error);
      });
    }

    /**
     * Updates the view with the content type data
     *
     * @param {ContentType} contentType
     */

  }, {
    key: 'update',
    value: function update(contentType) {
      this.view.reset();
      this.view.setId(contentType.machineName);
      this.view.setTitle(contentType.title);
      this.view.setDescription(contentType.description);
      this.view.setImage(contentType.icon);
      this.view.setExample(contentType.example);
      this.view.setOwner(contentType.owner);
      this.view.setIsInstalled(contentType.installed);
      this.view.setLicence(contentType.license);
      this.view.setIsRestricted(contentType.restricted);

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
    key: 'getElement',
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

var _events = __webpack_require__(4);

var _controls = __webpack_require__(19);

var _controls2 = _interopRequireDefault(_controls);

var _keyboard = __webpack_require__(21);

var _keyboard2 = _interopRequireDefault(_keyboard);

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
 * @function
 */
var getRowId = (0, _elements.getAttribute)('data-id');

/**
 * @class
 * @mixes Eventful
 * @fires Hub#select
 * @fires ContentTypeList#row-selected
 */

var ContentTypeListView = function () {
  function ContentTypeListView(state) {
    var _this = this;

    _classCallCheck(this, ContentTypeListView);

    this.state = state;

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // install controls
    this.controls = new _controls2.default([new _keyboard2.default()]);
    this.controls.on('select', function (event) {
      _this.fire('row-selected', {
        element: event.element,
        id: getRowId(event.element)
      });
    });

    // create root element
    this.rootElement = document.createElement('ul');
    this.rootElement.setAttribute('role', 'list');
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
        var row = this.rootElement.lastChild;

        this.controls.removeElement(row);
        this.rootElement.removeChild(row);
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
      this.controls.addElement(row);
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
      // create ids
      var index = this.rootElement.querySelectorAll('li').length;
      var contentTypeRowTitleId = "content-type-row-title-" + index;
      var contentTypeRowDescriptionId = "content-type-row-description-" + index;

      // field configuration
      var useButtonConfig = { text: 'Use', cls: 'button-primary', icon: '' };
      var installButtonConfig = { text: 'Get', cls: 'button-inverse-primary button-install', icon: 'icon-arrow-thick' };
      var button = contentType.installed ? useButtonConfig : installButtonConfig;
      var title = contentType.title || contentType.machineName;
      var description = contentType.summary || '';
      var image = contentType.icon || _contentTypePlaceholder2.default;
      var disabled = contentType.restricted ? 'disabled="disabled"' : '';

      // row item
      var element = document.createElement('li');
      element.id = "content-type-" + contentType.machineName;
      element.setAttribute('data-id', contentType.machineName);
      element.setAttribute('aria-labelledby', contentTypeRowTitleId);
      element.setAttribute('aria-describedby', contentTypeRowDescriptionId);

      // create html
      element.innerHTML = "\n      <img class=\"img-responsive\" src=\"" + image + "\">\n      <button aria-describedby=\"" + contentTypeRowTitleId + "\" class=\"button " + button.cls + "\" data-id=\"" + contentType.machineName + "\" tabindex=\"0\" " + disabled + ">\n        <span class=\"" + button.icon + "\"></span>\n        " + button.text + "\n      </button>\n      <h4 id=\"" + contentTypeRowTitleId + "\">" + title + "</h4>\n      <div id=\"" + contentTypeRowDescriptionId + "\" class=\"description\">" + description + "</div>\n   ";

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
      this.trigger('update-content-type-list', {});
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

var _messageView = __webpack_require__(44);

var _messageView2 = _interopRequireDefault(_messageView);

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(0);

var _events = __webpack_require__(4);

var _navbar = __webpack_require__(41);

var _navbar2 = _interopRequireDefault(_navbar);

var _eventful = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @param {HTMLElement[]} elements
 * @function
 */
var unselectAll = (0, _functional.forEach)((0, _elements.removeAttribute)('aria-selected'));

/**
 * @constant {number}
 */
var KEY_CODE_TAB = 9;

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
    var _this = this;

    _classCallCheck(this, ContentBrowserView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // general configuration
    this.typeAheadEnabled = true;

    // create elements
    this.rootElement = this.createElement(state);

    // pick elements
    this.menu = this.rootElement.querySelector('nav');
    this.menubar = this.rootElement.querySelector('.navbar-nav');
    this.inputField = this.rootElement.querySelector('[role="search"] input');
    this.displaySelected = this.rootElement.querySelector('.navbar-toggler-selected');
    var inputButton = this.rootElement.querySelector('[role="search"] .input-group-addon');

    // input field
    this.inputField.addEventListener('keyup', function (event) {
      // if not tab event
      if (event.keyCode != KEY_CODE_TAB) {
        var searchbar = event.target.parentElement.querySelector('#hub-search-bar');

        // Only searching if the enter key is pressed
        if (_this.typeAheadEnabled || event.which == 13 || event.keyCode == 13) {
          _this.trigger('search', {
            element: searchbar,
            query: searchbar.value
          });
        }
      }
    });

    // input button
    inputButton.addEventListener('click', function (event) {
      var searchbar = event.target.parentElement.querySelector('#hub-search-bar');

      _this.trigger('search', {
        element: searchbar,
        query: searchbar.value
      });

      searchbar.focus();
    });
  }

  /**
   * Creates the menu group element
   *
   * @param {object} state
   *
   * @return {HTMLElement}
   */


  _createClass(ContentBrowserView, [{
    key: "createElement",
    value: function createElement(state) {
      var menutitle = 'Browse content types';
      var menuId = 'content-type-filter';
      var searchText = 'Search for Content Types';

      // create element
      var element = document.createElement('div');
      element.className = 'content-type-section-view';
      element.innerHTML = "\n      <div class=\"menu-group\">\n        <nav  role=\"menubar\" class=\"navbar\">\n          <div class=\"navbar-header\">\n             <span class=\"navbar-toggler navbar-toggler-right\" aria-controls=\"" + menuId + "\" aria-expanded=\"false\">\n               <span class=\"navbar-toggler-selected\"></span>\n               <span class=\"icon-accordion-arrow\"></span>\n             </span>\n            <span class=\"navbar-brand\">" + menutitle + "</span>\n          </div>\n\n          <ul id=\"" + menuId + "\" class=\"navbar-nav\"></ul>\n        </nav>\n\n        <div class=\"input-group\" role=\"search\">\n          <input id=\"hub-search-bar\" class=\"form-control form-control-rounded\" type=\"text\" placeholder=\"" + searchText + "\" />\n          <div class=\"input-group-addon icon-search\"></div>\n        </div>\n      </div>";

      return element;
    }
  }, {
    key: "displayMessage",
    value: function displayMessage(config) {
      var self = this;
      // Set the action
      // TODO - should be translatable
      config.action = "Reload";

      var messageView = new _messageView2.default(config);
      var element = messageView.getElement();

      messageView.on('action-clicked', function () {
        self.rootElement.classList.remove('error');
        element.parentNode.removeChild(element);
        self.trigger('reload');
      });

      this.rootElement.classList.add('error');
      this.rootElement.appendChild(messageView.getElement());
    }

    /**
     * Adds a menu item
     *
     * @param {string} title
     * @param {string} id
     * @param {boolean} selected Determines if tab is already selected
     * @param {string} eventName Name of event that tab will fire off
     *
     * @return {HTMLElement}
     */

  }, {
    key: "addMenuItem",
    value: function addMenuItem(_ref) {
      var _this2 = this;

      var title = _ref.title,
          id = _ref.id,
          selected = _ref.selected,
          eventName = _ref.eventName;

      var element = document.createElement('li');
      element.setAttribute('role', 'menuitem');
      element.setAttribute('data-id', id);
      element.innerText = title;

      // sets if this menuitem should be selected
      if (selected) {
        element.setAttribute('aria-selected', 'true');
        this.displaySelected.innerText = title;
        this.trigger('menu-selected', {
          element: element,
          choice: eventName
        });
      }

      element.addEventListener('click', function (event) {
        _this2.trigger('menu-selected', {
          element: event.target,
          choice: eventName
        });
      });

      // add to menu bar
      this.menubar.appendChild(element);
      return element;
    }

    /**
     * Clears the input field
     */

  }, {
    key: "clearInputField",
    value: function clearInputField() {
      this.inputField.value = '';
    }

    /**
     * Sets the name of the currently selected filter
     *
     * @param {string} selectedName
     */

  }, {
    key: "setDisplaySelected",
    value: function setDisplaySelected(selectedName) {
      this.displaySelected.innerText = selectedName;
    }

    /**
     * Selects a menu item by id
     *
     * @param {string} id
     */

  }, {
    key: "selectMenuItemById",
    value: function selectMenuItemById(id) {
      var menuItems = this.menubar.querySelectorAll('[role="menuitem"]');
      var selectedMenuItem = this.menubar.querySelector("[role=\"menuitem\"][data-id=\"" + id + "\"]");

      if (selectedMenuItem) {
        unselectAll(menuItems);
        selectedMenuItem.setAttribute('aria-selected', 'true');

        this.trigger('menu-selected', {
          element: selectedMenuItem,
          id: selectedMenuItem.getAttribute('data-id')
        });
      }
    }
  }, {
    key: "initMenu",
    value: function initMenu() {
      // create the underline
      var underline = document.createElement('span');
      underline.className = 'menuitem-underline';
      this.menubar.appendChild(underline);

      // call init menu from sdk
      (0, _navbar2.default)(this.rootElement);
    }

    /**
     * Hides text styles and the menu underline
     */

  }, {
    key: "addDeactivatedStyleToMenu",
    value: function addDeactivatedStyleToMenu() {
      this.menu.classList.remove('deactivated');
    }
    /**
     * Restores text styles and the menu underline
     */

  }, {
    key: "removeDeactivatedStyleFromMenu",
    value: function removeDeactivatedStyleFromMenu() {
      this.menu.classList.add("deactivated");
    }

    /**
     * Returns the root element of the content browser
     *
     * @return {HTMLElement}
     */

  }, {
    key: "getElement",
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Tab section constants
 */
var ContentTypeSectionTabs = {
  ALL: {
    id: 'filter-all',
    title: 'All',
    eventName: 'all'
  },
  MY_CONTENT_TYPES: {
    id: 'filter-my-content-types',
    title: 'My Content Types',
    eventName: 'my-content-types',
    selected: true
  },
  MOST_POPULAR: {
    id: 'filter-most-popular',
    title: 'Most Popular',
    eventName: 'most-popular'
  }
};

/**
 * @class ContentTypeSection
 * @mixes Eventful
 *
 * @fires Hub#select
 */

var ContentTypeSection = function () {
  /**
   * @param {object} state
   * @param {HubServices} services
   */
  function ContentTypeSection(state, services) {
    _classCallCheck(this, ContentTypeSection);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // add view
    this.view = new _contentTypeSectionView2.default(state);

    // controller
    this.searchService = new _searchService2.default(services);
    this.contentTypeList = new _contentTypeList2.default();
    this.contentTypeDetail = new _contentTypeDetail2.default({}, services);

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
    this.propagate(['reload'], this.view);

    // register listeners
    this.view.on('search', this.search, this);
    this.view.on('search', this.view.selectMenuItemById.bind(this.view, ContentTypeSectionTabs.ALL.id));
    // this.view.on('search', this.resetMenuOnEnter, this);
    this.view.on('menu-selected', this.closeDetailView, this);
    this.view.on('menu-selected', this.applySearchFilter, this);
    this.view.on('menu-selected', this.clearInputField, this);
    this.view.on('menu-selected', this.updateDisplaySelected, this);
    this.contentTypeList.on('row-selected', this.showDetailView, this);
    this.contentTypeDetail.on('close', this.closeDetailView, this);
    this.contentTypeDetail.on('select', this.closeDetailView, this);

    this.initContentTypeList();

    // add menu items
    for (var tab in ContentTypeSectionTabs) {
      if (ContentTypeSectionTabs.hasOwnProperty(tab)) {
        this.view.addMenuItem(ContentTypeSectionTabs[tab]);
      }
    }

    this.view.initMenu();
  }

  /**
   * Initiates the content type list with a search
   */


  _createClass(ContentTypeSection, [{
    key: "initContentTypeList",
    value: function initContentTypeList() {
      var _this = this;

      // initialize by search
      this.searchService.search("").then(function (contentTypes) {
        return _this.contentTypeList.update(contentTypes);
      }).catch(function (error) {
        return _this.handleError(error);
      });
    }

    /**
     * Handle errors communicating with HUB
     */

  }, {
    key: "handleError",
    value: function handleError(error) {
      // TODO - use translation system:
      this.view.displayMessage({
        type: 'error',
        title: 'Not able to communicate with hub.',
        content: 'Error occured. Please try again.'
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
      var _this2 = this;

      var query = _ref.query,
          keyCode = _ref.keyCode;

      this.searchService.search(query).then(function (contentTypes) {
        return _this2.contentTypeList.update(contentTypes);
      });
    }

    /**
     * Updates the displayed name of the selected filter for mobile
     *
     * @param {SelectedElement} event
     */

  }, {
    key: "updateDisplaySelected",
    value: function updateDisplaySelected(event) {
      this.view.setDisplaySelected(event.element.innerText);
    }

    /**
     * Applies search filter depending on what event it receives
     *
     * @param {Object} e Event
     * @param {string} e.choice Event name of chosen tab
     */

  }, {
    key: "applySearchFilter",
    value: function applySearchFilter(e) {
      var _this3 = this;

      switch (e.choice) {
        case ContentTypeSectionTabs.ALL.eventName:
          this.searchService.sortOn('restricted').then(function (cts) {
            return _this3.contentTypeList.update(cts);
          });
          break;

        case ContentTypeSectionTabs.MY_CONTENT_TYPES.eventName:
          this.searchService.filterOutRestricted().then(function (cts) {
            return _this3.contentTypeList.update(cts);
          });
          break;

        case ContentTypeSectionTabs.MOST_POPULAR.eventName:
          var sortOrder = ['restricted', 'popularity'];
          this.searchService.sortOn(sortOrder).then(function (cts) {
            return _this3.contentTypeList.update(cts);
          });
          break;
      }
    }

    /**
     * Clears the input field
     *
     * @param {string} id
     */

  }, {
    key: "clearInputField",
    value: function clearInputField(_ref2) {
      var id = _ref2.id;

      if (id !== ContentTypeSectionTabs.ALL.id) {
        this.view.clearInputField();
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
      this.view.typeAheadEnabled = false;
      this.view.removeDeactivatedStyleFromMenu();
    }

    /**
     * Close detail view
     */

  }, {
    key: "closeDetailView",
    value: function closeDetailView() {
      this.contentTypeDetail.hide();
      this.contentTypeList.show();
      this.view.typeAheadEnabled = true;
      this.view.addDeactivatedStyleToMenu();
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

var _tabPanel = __webpack_require__(23);

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _functional = __webpack_require__(0);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(1);

var _events = __webpack_require__(4);

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
      this.rootElement.className += "h5p-hub h5p-sdk";
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
   * @param {HubServices} services
   */
  function SearchService(services) {
    _classCallCheck(this, SearchService);

    this.services = services;
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
      // Add content types to the search index
      return this.services.contentTypes().then(filterByQuery(query));
    }

    /**
     * Filter all content types by given property
     *
     * @param {string|Array} sortOrder One or more properties
     *
     * @return {Promise.<ContentType[]>|*}
     */

  }, {
    key: 'sortOn',
    value: function sortOn(sortOrder) {
      return this.services.contentTypes().then(function (contentTypes) {
        return multiSort(contentTypes, sortOrder);
      });
    }

    /**
     * Filter out restricted if it is defined and false
     *
     * @return {Promise.<ContentType[]>}
     */

  }, {
    key: 'filterOutRestricted',
    value: function filterOutRestricted() {
      return this.services.contentTypes().then(function (cts) {
        return cts.filter(function (ct) {
          return !ct.restricted;
        });
      });
    }
  }]);

  return SearchService;
}();

/**
 * Sort on multiple properties
 *
 * @param {ContentType[]} contentTypes Content types that should be sorted
 * @param {string|string[]} sortOrder Order that sort properties should be applied
 *
 * @return {Array.<ContentType>} Content types sorted
 */


exports.default = SearchService;
var multiSort = function multiSort(contentTypes, sortOrder) {
  sortOrder = Array.isArray(sortOrder) ? sortOrder : [sortOrder];
  return contentTypes.sort(function (ct1, ct2) {
    return handleSortType(ct1, ct2, sortOrder);
  });
};

/**
 * Compares two content types and returns a sortable value for them
 *
 * @param {ContentType} ct1
 * @param {ContentType} ct2
 * @param {string[]} sortOrder Order that sort properties should be applied in
 *
 * @return {number} A number indicating how to sort the two content types
 */
var handleSortType = function handleSortType(ct1, ct2, sortOrder) {
  switch (sortOrder[0]) {
    case 'restricted':
      return sortOnRestricted(ct1, ct2, sortOrder.slice(1));
    case 'popularity':
      return sortOnProperty(ct1, ct2, sortOrder[0], sortOrder.slice(1));
    default:
      return sortSearchResults(ct1, ct2);
  }
};

/**
 * Sort restricted content types. Restricted content types will be moved to the bottom of the
 * list. Content types with undefined restricted property are consider not restricted.
 *
 * @param {ContentType} ct1
 * @param {ContentType} ct2
 * @param {string[]} sortOrder Order to apply sort properties
 *
 * @return {number} A standard comparable value for the two content types
 */
var sortOnRestricted = function sortOnRestricted(ct1, ct2, sortOrder) {
  if (!ct1.restricted === !ct2.restricted) {
    if (sortOrder) {
      return handleSortType(ct1, ct2, sortOrder);
    } else {
      return 0;
    }
  } else if (ct1.restricted) {
    return 1;
  } else if (ct2.restricted) {
    return -1;
  }
};

/**
 * Sort on a property. Any valid property can be applied. If the content type does not have the
 * supplied property it will get moved to the bottom.
 *
 * @param {ContentType} ct1
 * @param {ContentType} ct2
 * @param {string} property Property that the content types will be sorted on, either
 * numerically or lexically
 * @param {string[]} sortOrder Remaining sort order to apply if two content types have the same
 * value
 *
 * @return {number} A value indicating the comparison between the two content types
 */
var sortOnProperty = function sortOnProperty(ct1, ct2, property, sortOrder) {
  // Property does not exist, move to bottom
  if (!ct1.hasOwnProperty(property)) {
    return 1;
  }
  if (!ct2.hasOwnProperty(property)) {
    return -1;
  }

  // Sort on property
  if (ct1[property] > ct2[property]) {
    return 1;
  } else if (ct1[property] < ct2[property]) {
    return -1;
  } else {
    if (sortOrder) {
      return handleSortType(ct1, ct2, sortOrder);
    } else {
      return 0;
    }
  }
};

/**
 * Filters a list of content types based on a query
 * @type {Function}
 *
 * @param {string} query
 * @param {ContentType[]} contentTypes
 */
var filterByQuery = (0, _functional.curry)(function (query, contentTypes) {
  if (query == '') {
    return contentTypes;
  }

  // Append a search score to each content type
  var filtered = contentTypes.map(function (contentType) {
    contentType.score = getSearchScore(query, contentType);
    return contentType;
  }).filter(function (result) {
    return result.score > 0;
  });

  return multiSort(filtered, ['restricted', 'default']);
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
  if (!a.installed && b.installed) {
    return 1;
  }

  if (a.installed && !b.installed) {
    return -1;
  } else if (b.score !== a.score) {
    return b.score - a.score;
  } else {
    return b.popularity - a.popularity;
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
  } else if (hasSubString(query, contentType.machineName)) {
    return 1;
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

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventful = __webpack_require__(1);

var _dictionary = __webpack_require__(43);

var _dictionary2 = _interopRequireDefault(_dictionary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @mixes Eventful
 *
 * @fires Hub#upload
 */
var UploadSection = function () {
  function UploadSection(state, services) {
    var _this = this;

    _classCallCheck(this, UploadSection);

    var self = this;
    _extends(this, (0, _eventful.Eventful)());

    // services
    this.services = services;

    // Input element for the H5P file
    var h5pUpload = document.createElement('input');
    h5pUpload.setAttribute('type', 'file');

    // Sends the H5P file to the plugin
    var useButton = document.createElement('button');
    useButton.textContent = _dictionary2.default.get('useButtonLabel');
    useButton.addEventListener('click', function () {

      // Add the H5P file to a form, ready for transportation
      var data = new FormData();
      data.append('h5p', h5pUpload.files[0]);

      // Upload content to the plugin
      _this.services.uploadContent(data).then(function (json) {
        // Fire the received data to any listeners
        self.trigger('upload', json);
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(0);

var _eventful = __webpack_require__(20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controls Event
 * @typedef {Object} ControlsEvent
 * @property {HTMLElement} element
 * @property {number} index
 * @property {HTMLElement[]} elements
 * @property {HTMLElement} oldElement
 */
/**
 * Add element event
 * @event Controls#addElement
 * @type ControlsEvent
 */
/**
 * Remove element event
 * @event Controls#removeElement
 * @type ControlsEvent
 */
/**
 * Previous element event
 * @event Controls#previousElement
 * @type ControlsEvent
 */
/**
 * Next element event
 * @event Controls#nextElement
 * @type ControlsEvent
 */
/**
 * Select option event
 * @event Controls#select
 * @type ControlsEvent
 */
/**
 * Drag element event
 * @event Controls#drag
 * @type ControlsEvent
 */

/**
 * @type {function} removeTabIndex
 */
var removeTabIndex = (0, _elements.removeAttribute)('tabindex');
/**
 * @type {function} removeTabIndexForAll
 */
var removeTabIndexForAll = (0, _functional.forEach)(removeTabIndex);
/**
 * @type {function} setTabIndexZero
 */
var setTabIndexZero = (0, _elements.setAttribute)('tabindex', '0');
/**
 * @type {function} hasTabIndex
 */
var hasTabIndex = (0, _elements.hasAttribute)('tabindex');

/**
 * @class
 * @mixes Eventful
 */

var Controls = function () {
  function Controls(plugins) {
    _classCallCheck(this, Controls);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    /**
     *@property {HTMLElement} tabbableElement
     */
    /**
     * @property {object[]} plugins
     */
    this.plugins = plugins || [];

    /**
     * @property {HTMLElement[]} elements
     */
    this.elements = [];

    // move tabindex to next element
    this.on('nextElement', this.nextElement, this);

    // move tabindex to previous element
    this.on('previousElement', this.previousElement, this);

    // init plugins
    this.initPlugins();
  }

  /**
   * Add controls to an element
   *
   * @param {HTMLElement} el
   *
   * @fires Controls#addElement
   * @public
   */


  _createClass(Controls, [{
    key: 'addElement',
    value: function addElement(el) {
      this.elements.push(el);

      this.firesEvent('addElement', el);

      if (this.elements.length === 1) {
        // if first
        this.setTabbable(el);
      }
    }
  }, {
    key: 'removeElement',


    /**
     * Add controls to an element
     *
     * @param {HTMLElement} el
     *
     * @fires Controls#addElement
     * @public
     */
    value: function removeElement(el) {
      this.elements = (0, _functional.without)([el], this.elements);

      // if removed element was selected
      if (hasTabIndex(el)) {
        removeTabIndex(el);

        // set first element selected if exists
        if (this.elements[0]) {
          this.setTabbable(this.elements[0]);
        }
      }

      this.firesEvent('removeElement', el);
    }
  }, {
    key: 'firesEvent',


    /**
     * Fire event
     *
     * @param {string} type
     * @param {HTMLElement|EventTarget} el
     *
     * @public
     */
    value: function firesEvent(type, el) {
      var index = this.elements.indexOf(el);

      this.fire(type, {
        element: el,
        index: index,
        elements: this.elements,
        oldElement: this.tabbableElement
      });
    }

    /**
     * Sets tabindex on an element, remove it from all others
     *
     * @param {number} index
     *
     * @private
     */

  }, {
    key: 'nextElement',
    value: function nextElement(_ref) {
      var index = _ref.index;

      var isLastElement = index === this.elements.length - 1;
      var nextEl = this.elements[isLastElement ? 0 : index + 1];

      this.setTabbable(nextEl);
      nextEl.focus();
    }

    /**
     * Sets tabindex on an element, remove it from all others
     *
     * @param {HTMLElement} el
     * @public
     */

  }, {
    key: 'setTabbable',
    value: function setTabbable(el) {
      removeTabIndexForAll(this.elements);
      setTabIndexZero(el);
      this.tabbableElement = el;
    }

    /**
     * Sets tabindex on an element, remove it from all others
     *
     * @param {number} index
     *
     * @private
     */

  }, {
    key: 'previousElement',
    value: function previousElement(_ref2) {
      var index = _ref2.index;

      var isFirstElement = index === 0;
      var prevEl = this.elements[isFirstElement ? this.elements.length - 1 : index - 1];

      this.setTabbable(prevEl);
      prevEl.focus();
    }

    /**
     * Initializes the plugins
     *
     * @private
     */

  }, {
    key: 'initPlugins',
    value: function initPlugins() {
      this.plugins.forEach(function (plugin) {
        if (plugin.init !== undefined) {
          plugin.init(this);
        }
      }, this);
    }
  }]);

  return Controls;
}();

exports.default = Controls;

/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @classdesc Keyboard navigation for accessibility support
 */
var Keyboard = function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    /**
     * @property {boolean} selectability
     */
    this.selectability = true;
  }

  /**
   * Inits this class
   *
   * @param {Controls} controls
   */


  _createClass(Keyboard, [{
    key: 'init',
    value: function init(controls) {
      /**
       * Need to have a common binding of handleKeyDown, so that it can be a
       * common instance to be used for addEventListener and removeEventListener
       * @type {function}
       */
      this.boundHandleKeyDown = this.handleKeyDown.bind(this);

      /**
       * @type {Controls}
       */
      this.controls = controls;
      this.controls.on('addElement', this.listenForKeyDown, this);
      this.controls.on('removeElement', this.removeKeyDownListener, this);
    }
  }, {
    key: 'listenForKeyDown',


    /**
     * Listens for a keyboard press when element is focused
     *
     * @param {HTMLElement} element
     * @private
     */
    value: function listenForKeyDown(_ref) {
      var element = _ref.element;

      element.addEventListener('keydown', this.boundHandleKeyDown);
    }
  }, {
    key: 'removeKeyDownListener',


    /**
     * Remove a keyboard press listener
     *
     * @param {HTMLElement} element
     * @private
     */
    value: function removeKeyDownListener(_ref2) {
      var element = _ref2.element;

      element.removeEventListener('keydown', this.boundHandleKeyDown);
    }
  }, {
    key: 'handleKeyDown',


    /**
     * Handles key down
     *
     * @param {KeyboardEvent} event Keyboard event
     * @private
     */
    value: function handleKeyDown(event) {
      switch (event.which) {
        case 13: // Enter
        case 32:
          // Space
          this.select(event.target);
          event.preventDefault();
          break;

        case 37: // Left Arrow
        case 38:
          // Up Arrow
          this.previousElement(event.target);
          event.preventDefault();
          break;
        case 39: // Right Arrow
        case 40:
          // Down Arrow
          this.nextElement(event.target);
          event.preventDefault();
          break;
      }
    }
  }, {
    key: 'previousElement',


    /**
     * Fires the previous element event
     *
     * @param {HTMLElement|EventTarget} el
     * @fires Controls#previousElement
     */
    value: function previousElement(el) {
      this.controls.firesEvent('previousElement', el);
    }
  }, {
    key: 'nextElement',


    /**
     * Fire the next element event
     *
     * @param {HTMLElement|EventTarget} el
     * @fires Controls#nextElement
     */
    value: function nextElement(el) {
      this.controls.firesEvent('nextElement', el);
    }
  }, {
    key: 'select',


    /**
     * Fires the select event
     *
     * @param {EventTarget|HTMLElement} el
     * @fires Controls#select
     */
    value: function select(el) {
      if (this.selectability) {
        if (this.controls.firesEvent('before-select', el) !== false) {
          this.controls.firesEvent('select', el);
          this.controls.firesEvent('after-select', el);
        }
      }
    }
  }, {
    key: 'disableSelectability',


    /**
     * Disable possibility to select a word trough click and space or enter
     *
     * @public
     */
    value: function disableSelectability() {
      this.selectability = false;
    }
  }, {
    key: 'enableSelectability',


    /**
     * Enable possibility to select a word trough click and space or enter
     *
     * @public
     */
    value: function enableSelectability() {
      this.selectability = true;
    }
  }]);

  return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 22 */
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
 * @param {HTMLElement} button
 * @param {function} updateState
 *
 * @function
 */
var onNavigationButtonClick = function onNavigationButtonClick(element, state, button, updateState) {
  if (!isDisabled(button)) {
    updateState(state);
    updateView(element, state);
  }
};

/**
 * Initializes an image
 *
 * @param {HTMLElement} element
 * @param {HTMLElement} image
 * @function
 */
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
  // get button html elements
  var nextButton = element.querySelector('.next');
  var prevButton = element.querySelector('.previous');

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
  nextButton.addEventListener('click', function () {
    return onNavigationButtonClick(element, state, nextButton, function (state) {
      return state.position--;
    });
  });
  prevButton.addEventListener('click', function () {
    return onNavigationButtonClick(element, state, prevButton, function (state) {
      return state.position++;
    });
  });

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(0);

var _keyboard = __webpack_require__(25);

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 */
var hideAll = (0, _functional.forEach)((0, _elements.setAttribute)('aria-hidden', 'true'));

/**
 * @function
 */
var show = (0, _elements.setAttribute)('aria-hidden', 'false');

/**
 * @function
 */
var isSelected = (0, _elements.attributeEquals)('aria-selected', 'true');

/**
 * @function
 */
var unSelectAll = (0, _functional.forEach)((0, _elements.removeAttribute)('aria-selected'));

/**
 * Change tab panel when tab's aria-selected is changed
 *
 * @param {HTMLElement} element
 * @param {HTMLElement} tab
 */
var addAriaSelectedObserver = function addAriaSelectedObserver(element, tab) {
  // set observer on title for aria-expanded
  var observer = new MutationObserver(function () {
    var panelId = tab.getAttribute('aria-controls');
    var panel = element.querySelector('#' + panelId);
    var allPanels = element.querySelectorAll('[role="tabpanel"]');

    if (isSelected(tab)) {
      hideAll(allPanels);
      show(panel);
    }
  });

  observer.observe(tab, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["aria-selected"]
  });
};

/**
 * Selects an element, and unselects all other tabs
 *
 * @param {HTMLElement[]} allTabs
 * @param {HTMLElement} element
 * @function
 */
var selectTab = (0, _functional.curry)(function (allTabs, element) {
  unSelectAll(allTabs);
  element.setAttribute('aria-selected', 'true');
});

/**
 * Initiates a tab panel
 *
 * @param {HTMLElement} element
 */
function init(element) {
  var tabs = (0, _elements.nodeListToArray)(element.querySelectorAll('[role="tab"]'));
  var keyboard = new _keyboard2.default();

  // handle enter + space click
  keyboard.onSelect = selectTab(tabs);

  // init tabs
  tabs.forEach(function (tab) {
    addAriaSelectedObserver(element, tab);

    tab.addEventListener('click', function (event) {
      var element = event.target;
      var elementIndex = tabs.indexOf(element);
      selectTab(tabs, element);
      keyboard.forceSelectedIndex(elementIndex);
    });

    keyboard.addElement(tab);
  });
}

/***/ }),
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @param {HTMLElement} element
 * @function
 */
var addTabIndex = (0, _elements.setAttribute)('tabindex', '0');

/**
 * @param {HTMLElement} element
 * @function
 */
var removeTabIndex = (0, _elements.removeAttribute)('tabindex');

/**
 * @param {HTMLElement[]} elements
 * @function
 */

var removeTabIndexForAll = (0, _functional.forEach)(removeTabIndex);

/**
 * @param {HTMLElement} element
 * @function
 */
var hasTabIndex = (0, _elements.hasAttribute)('tabindex');

/**
 * Sets tabindex and focus on an element, remove it from all others
 *
 * @param {HTMLElement[]} elements
 * @param {number} index
 */
var updateTabbable = function updateTabbable(elements, index) {
  var selectedElement = elements[index];

  if (selectedElement) {
    removeTabIndexForAll(elements);
    addTabIndex(selectedElement);
    selectedElement.focus();
  }
};

/**
 * Sets tabindex on an element, remove it from all others
 *
 * @param {number} currentIndex
 * @param {number} lastIndex
 *
 * @return {number}
 */
var nextIndex = function nextIndex(currentIndex, lastIndex) {
  return currentIndex === lastIndex ? 0 : currentIndex + 1;
};

/**
 * Sets tabindex on an element, remove it from all others
 *
 * @param {number} currentIndex
 * @param {number} lastIndex
 *
 * @return {number}
 */
var previousIndex = function previousIndex(currentIndex, lastIndex) {
  return currentIndex === 0 ? lastIndex : currentIndex - 1;
};

/**
 * @class
 */

var Keyboard = function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    /**
     * @property {HTMLElement[]} elements
     */
    this.elements = [];
    /**
     * Creates a bound key handler, that can be removed
     * @property {function} boundHandleKeyDown
     */
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    /**
     * @property {number} selectedIndex
     */
    this.selectedIndex = 0;
  }

  /**
   * Add keyboard support to an element
   *
   * @param {HTMLElement} element
   *
   * @public
   */


  _createClass(Keyboard, [{
    key: 'addElement',
    value: function addElement(element) {
      this.elements.push(element);
      element.addEventListener('keydown', this.boundHandleKeyDown);

      if (this.elements.length === 1) {
        // if first
        addTabIndex(element);
      }
    }
  }, {
    key: 'removeElement',


    /**
     * Add controls to an element
     *
     * @param {HTMLElement} element
     *
     * @public
     */
    value: function removeElement(element) {
      this.elements = (0, _functional.without)([element], this.elements);

      element.removeEventListener('keydown', this.boundHandleKeyDown);

      // if removed element was selected
      if (hasTabIndex(element)) {
        removeTabIndex(element);

        this.selectedIndex = 0;
        updateTabbable(this.elements, this.selectedIndex);
      }
    }
  }, {
    key: 'handleKeyDown',


    /**
     * Handles key down, and updates the tab index
     *
     * @param {KeyboardEvent} event Keyboard event
     *
     * @private
     */
    value: function handleKeyDown(event) {
      var lastIndex = this.elements.length - 1;

      switch (event.which) {
        case 13: // Enter
        case 32:
          // Space
          this.select();
          event.preventDefault();
          break;
        case 35:
          // End
          this.selectedIndex = lastIndex;
          event.preventDefault();
          break;
        case 36:
          // Home
          this.selectedIndex = 0;
          event.preventDefault();
          break;
        case 37: // Left Arrow
        case 38:
          // Up Arrow
          this.selectedIndex = previousIndex(this.selectedIndex, lastIndex);
          event.preventDefault();
          break;
        case 39: // Right Arrow
        case 40:
          // Down Arrow
          this.selectedIndex = nextIndex(this.selectedIndex, lastIndex);
          event.preventDefault();
          break;
      }

      updateTabbable(this.elements, this.selectedIndex);
    }
  }, {
    key: 'forceSelectedIndex',


    /**
     * Sets the selected index, and updates the tab index
     *
     * @param {number} index
     */
    value: function forceSelectedIndex(index) {
      this.selectedIndex = index;
      updateTabbable(this.elements, this.selectedIndex);
    }

    /**
     * Triggers 'onSelect' function if it exists
     */

  }, {
    key: 'select',
    value: function select() {
      if (this.onSelect != undefined) {
        this.onSelect(this.elements[this.selectedIndex]);
      }
    }
  }]);

  return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(8).default;

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(0);

var _collapsible = __webpack_require__(42);

var _keyboard = __webpack_require__(25);

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Unselects all elements in an array
 *
 * @param {HTMLElement[]} elements
 * @function
 */
var unSelectAll = (0, _functional.forEach)((0, _elements.removeAttribute)('aria-selected'));

/**
 * Sets the aria-expanded attribute on an element to false
 *
 * @param {HTMLElement} element
 */
var unExpand = (0, _elements.setAttribute)('aria-expanded', 'false');

/**
 * Selects an element, and un selects all other menu items
 *
 * @param {HTMLElement[]} menuItems
 * @param {HTMLElement} element
 * @function
 */
var onSelectMenuItem = function onSelectMenuItem(menuItems, element) {
  unSelectAll(menuItems);
  element.setAttribute('aria-selected', 'true');
};

/**
 * Initiates a tab panel
 *
 * @param {HTMLElement} element
 */
function init(element) {
  // elements
  var menuItems = (0, _elements.nodeListToArray)(element.querySelectorAll('[role="menuitem"]'));
  var toggler = element.querySelector('[aria-controls][aria-expanded]');
  var keyboard = new _keyboard2.default();

  keyboard.onSelect = function (element) {
    onSelectMenuItem(menuItems, element);
    unExpand(toggler);
  };

  // move select
  menuItems.forEach(function (menuItem) {
    // add mouse click listener
    menuItem.addEventListener('click', function (event) {
      var element = event.target;
      var elementIndex = menuItems.indexOf(element);

      onSelectMenuItem(menuItems, element);
      unExpand(toggler);
      keyboard.forceSelectedIndex(elementIndex);
    });

    // add keyboard support
    keyboard.addElement(menuItem);
  });

  // init collapse and open
  (0, _collapsible.initCollapsible)(element, (0, _elements.toggleClass)('collapsed'));
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initCollapsible = undefined;

var _elements = __webpack_require__(2);

/**
 * Returns true if aria-expanded=true on element
 *
 * @param {HTMLElement} element
 * @function
 */
var isExpanded = (0, _elements.attributeEquals)("aria-expanded", 'true');

/**
 * Toggles aria-hidden on 'collapsible' when aria-expanded changes on 'toggler',
 * and toggles aria-expanded on 'toggler' on click
 *
 * @param {HTMLElement} element
 * @param {function} [targetHandler] falls back to toggleVisibility with aria-hidden
 */
var initCollapsible = exports.initCollapsible = function initCollapsible(element) {
  var targetHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _elements.toggleVisibility;

  // elements
  var toggler = element.querySelector('[aria-controls][aria-expanded]');
  var collapsibleId = toggler.getAttribute('aria-controls');
  var collapsible = element.querySelector('#' + collapsibleId);

  // set observer on title for aria-expanded
  var observer = new MutationObserver(function () {
    return targetHandler(isExpanded(toggler), collapsible);
  });

  observer.observe(toggler, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ["aria-expanded"]
  });

  // Set click listener that toggles aria-expanded
  toggler.addEventListener('click', function () {
    return (0, _elements.toggleAttribute)("aria-expanded", toggler);
  });

  // initialize
  targetHandler(isExpanded(toggler), collapsible);
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dictionary = function () {
  function Dictionary() {
    _classCallCheck(this, Dictionary);
  }

  _createClass(Dictionary, null, [{
    key: "init",
    value: function init(dictionary) {
      Dictionary.dictionary = dictionary;
    }

    /**
     * Get a string from the dictionary. Optionally replace variables
     * @param {string} key
     * @param {Object} replacements
     * @returns {string}
     */

  }, {
    key: "get",
    value: function get(key, replacements) {

      // var translation = Dictionary.dictionary[key];
      //
      // // Replace placeholder with variables.
      // for (var placeholder in replacements) {
      //   if (!replacements[placeholder]) {
      //     continue;
      //   }
      //   translation = translation.replace(placeholder, replacements[placeholder]);
      // }
      //
      // return translation;
    }
  }]);

  return Dictionary;
}();

exports.default = Dictionary;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventful = __webpack_require__(1);

var _events = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ContentBrowserView
 * @mixes Eventful
 */
var MessageView = function () {
  /**
   * @constructor
   * @param {Object} state
   * @param {string} state.type
   * @param {string} state.title
   * @param {string} state.content
   * @param {string} [state.action]
   * @param {string} [state.dismissable]
   */
  function MessageView(state) {
    _classCallCheck(this, MessageView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // create elements
    this.rootElement = this.createElement(state);
  }

  _createClass(MessageView, [{
    key: 'createElement',
    value: function createElement(message) {
      // Create wrapper:
      var messageWrapper = document.createElement('div');
      messageWrapper.className = 'message ' + message.type + (message.dismissible ? ' dismissible' : '');

      // Add close button if dismisable
      if (message.dismissible) {
        var closeButton = document.createElement('div');
        closeButton.className = 'close';
        //closeButton.innerHTML = '&#x2715';
        // TODO
        // - Add close label from translations
        // - Add visuals in CSS (font icon)
        messageWrapper.appendChild(closeButton);
        (0, _events.relayClickEventAs)('close', this, closeButton);
      }

      var messageContent = document.createElement('div');
      messageContent.className = 'message-content';
      messageContent.innerHTML = '<h2>' + message.title + '</h2>' + '<p>' + message.content + '</p>';
      messageWrapper.appendChild(messageContent);

      if (message.action !== undefined) {
        var messageButton = document.createElement('button');
        messageButton.className = 'button';
        messageButton.innerHTML = message.action;
        messageWrapper.appendChild(messageButton);

        (0, _events.relayClickEventAs)('action-clicked', this, messageButton);
      }

      return messageWrapper;
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

  return MessageView;
}();

exports.default = MessageView;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ',' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, { body: this._bodyInit });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWFhNDAxMjU1MDBlZmNkOWRhM2QiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9taXhpbnMvZXZlbnRmdWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3M/NmE3OCIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrLXVpL3NyYy9zY3JpcHRzL2NvbnRyb2xzLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrLXVpL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay11aS9zcmMvc2NyaXB0cy91aS9rZXlib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2tleWJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2Rpc3QuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9uYXZiYXIuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvY29sbGFwc2libGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvZGljdGlvbmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tZXNzYWdlLXZpZXcvbWVzc2FnZS12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2ZldGNoLmpzIl0sIm5hbWVzIjpbImN1cnJ5IiwiZm4iLCJhcml0eSIsImxlbmd0aCIsImYxIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJmMiIsImFyZ3MyIiwiY29uY2F0IiwiY29tcG9zZSIsImZucyIsInJlZHVjZSIsImYiLCJnIiwiZm9yRWFjaCIsImFyciIsIm1hcCIsImZpbHRlciIsInNvbWUiLCJjb250YWlucyIsInZhbHVlIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJ2YWx1ZXMiLCJpbnZlcnNlQm9vbGVhblN0cmluZyIsImJvb2wiLCJ0b1N0cmluZyIsIkV2ZW50ZnVsIiwibGlzdGVuZXJzIiwib24iLCJ0eXBlIiwibGlzdGVuZXIiLCJzY29wZSIsInRyaWdnZXIiLCJwdXNoIiwiZXZlbnQiLCJ0cmlnZ2VycyIsImV2ZXJ5IiwicHJvcGFnYXRlIiwidHlwZXMiLCJldmVudGZ1bCIsIm5ld1R5cGUiLCJzZWxmIiwiZ2V0QXR0cmlidXRlIiwibmFtZSIsImVsIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiYXR0cmlidXRlRXF1YWxzIiwidG9nZ2xlQXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJwYXJlbnQiLCJjaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmVDaGlsZCIsIm9sZENoaWxkIiwiY2xhc3NMaXN0Q29udGFpbnMiLCJjbHMiLCJjbGFzc0xpc3QiLCJub2RlTGlzdFRvQXJyYXkiLCJub2RlTGlzdCIsImhpZGUiLCJzaG93IiwidG9nZ2xlVmlzaWJpbGl0eSIsInZpc2libGUiLCJlbGVtZW50IiwidG9nZ2xlQ2xhc3MiLCJhZGQiLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJzZXR1cCIsImNhY2hlZENvbnRlbnRUeXBlcyIsImZldGNoIiwibWV0aG9kIiwiY3JlZGVudGlhbHMiLCJ0aGVuIiwicmVzdWx0IiwianNvbiIsImlzVmFsaWQiLCJsaWJyYXJpZXMiLCJyZXNwb25zZSIsIm1lc3NhZ2VDb2RlIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJtYWNoaW5lTmFtZSIsImNvbnRlbnRUeXBlcyIsImNvbnRlbnRUeXBlIiwiaWQiLCJucyIsImdldEFqYXhVcmwiLCJib2R5IiwiZm9ybURhdGEiLCJyZWxheUNsaWNrRXZlbnRBcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJpbml0IiwiSHViIiwic3RhdGUiLCJkaWN0aW9uYXJ5Iiwic2VydmljZXMiLCJjb250ZW50VHlwZVNlY3Rpb24iLCJ1cGxvYWRTZWN0aW9uIiwidmlldyIsInNldFBhbmVsVGl0bGUiLCJjbG9zZVBhbmVsIiwic2V0U2VjdGlvblR5cGUiLCJ0b2dnbGVQYW5lbE9wZW4iLCJiaW5kIiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsImluaXRUYWJQYW5lbCIsImdldENvbnRlbnRUeXBlIiwidGl0bGUiLCJzZXRUaXRsZSIsInNlY3Rpb25JZCIsInRhYkNvbmZpZ3MiLCJjb250ZW50IiwiZ2V0RWxlbWVudCIsImNvbmZpZyIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiYWRkQm90dG9tQm9yZGVyIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsIk1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04iLCJpc0VtcHR5IiwidGV4dCIsImhpZGVBbGwiLCJDb250ZW50VHlwZURldGFpbFZpZXciLCJyb290RWxlbWVudCIsImNyZWF0ZVZpZXciLCJidXR0b25CYXIiLCJ1c2VCdXR0b24iLCJpbnN0YWxsQnV0dG9uIiwiYnV0dG9ucyIsImltYWdlIiwib3duZXIiLCJkZXNjcmlwdGlvbiIsImRlbW9CdXR0b24iLCJjYXJvdXNlbCIsImNhcm91c2VsTGlzdCIsImxpY2VuY2VQYW5lbCIsImluc3RhbGxNZXNzYWdlIiwiaW5zdGFsbE1lc3NhZ2VDbG9zZSIsImxhYmVsQmFjayIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImdldCIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwiaW5uZXJUZXh0IiwibGlnaHRib3giLCJjaGlsZEVsZW1lbnRDb3VudCIsInVybCIsImFsdCIsInRodW1ibmFpbCIsInNyYyIsImVsbGlwc2lzIiwidG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCIsImRlc2NyaXB0aW9uRXhwYW5kZWQiLCJzaXplIiwic3Vic3RyIiwiaW5zdGFsbGVkIiwic2hvd0J1dHRvbkJ5U2VsZWN0b3IiLCJyZXN0cmljdGVkIiwiYnV0dG9uIiwiQ29udGVudFR5cGVEZXRhaWwiLCJpbnN0YWxsIiwidXBkYXRlIiwiaW5zdGFsbENvbnRlbnRUeXBlIiwic2V0SXNJbnN0YWxsZWQiLCJzZXRJbnN0YWxsTWVzc2FnZSIsImNhdGNoIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3IiLCJlcnJvckNvZGUiLCJjb25zb2xlIiwicmVzZXQiLCJzZXRJZCIsInNldERlc2NyaXB0aW9uIiwic2V0SW1hZ2UiLCJpY29uIiwic2V0RXhhbXBsZSIsImV4YW1wbGUiLCJzZXRPd25lciIsInNldExpY2VuY2UiLCJsaWNlbnNlIiwic2V0SXNSZXN0cmljdGVkIiwicmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCIsInNjcmVlbnNob3RzIiwiYWRkSW1hZ2VUb0Nhcm91c2VsIiwiZ2V0Um93SWQiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiY29udHJvbHMiLCJmaXJlIiwiaGFzQ2hpbGROb2RlcyIsInJvdyIsImxhc3RDaGlsZCIsInJlbW92ZUVsZW1lbnQiLCJjcmVhdGVDb250ZW50VHlwZVJvdyIsImFkZEVsZW1lbnQiLCJpbmRleCIsImNvbnRlbnRUeXBlUm93VGl0bGVJZCIsImNvbnRlbnRUeXBlUm93RGVzY3JpcHRpb25JZCIsInVzZUJ1dHRvbkNvbmZpZyIsImluc3RhbGxCdXR0b25Db25maWciLCJzdW1tYXJ5IiwiZGlzYWJsZWQiLCJDb250ZW50VHlwZUxpc3QiLCJyZW1vdmVBbGxSb3dzIiwiYWRkUm93IiwidW5zZWxlY3RBbGwiLCJLRVlfQ09ERV9UQUIiLCJDb250ZW50QnJvd3NlclZpZXciLCJ0eXBlQWhlYWRFbmFibGVkIiwibWVudSIsIm1lbnViYXIiLCJpbnB1dEZpZWxkIiwiZGlzcGxheVNlbGVjdGVkIiwiaW5wdXRCdXR0b24iLCJrZXlDb2RlIiwic2VhcmNoYmFyIiwidGFyZ2V0IiwicGFyZW50RWxlbWVudCIsIndoaWNoIiwicXVlcnkiLCJmb2N1cyIsIm1lbnV0aXRsZSIsIm1lbnVJZCIsInNlYXJjaFRleHQiLCJhY3Rpb24iLCJtZXNzYWdlVmlldyIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJldmVudE5hbWUiLCJjaG9pY2UiLCJzZWxlY3RlZE5hbWUiLCJtZW51SXRlbXMiLCJzZWxlY3RlZE1lbnVJdGVtIiwidW5kZXJsaW5lIiwiQ29udGVudFR5cGVTZWN0aW9uVGFicyIsIkFMTCIsIk1ZX0NPTlRFTlRfVFlQRVMiLCJNT1NUX1BPUFVMQVIiLCJDb250ZW50VHlwZVNlY3Rpb24iLCJzZWFyY2hTZXJ2aWNlIiwiY29udGVudFR5cGVMaXN0IiwiY29udGVudFR5cGVEZXRhaWwiLCJzZWN0aW9uIiwic2VhcmNoIiwic2VsZWN0TWVudUl0ZW1CeUlkIiwiY2xvc2VEZXRhaWxWaWV3IiwiYXBwbHlTZWFyY2hGaWx0ZXIiLCJjbGVhcklucHV0RmllbGQiLCJ1cGRhdGVEaXNwbGF5U2VsZWN0ZWQiLCJzaG93RGV0YWlsVmlldyIsInRhYiIsImhhc093blByb3BlcnR5IiwiYWRkTWVudUl0ZW0iLCJpbml0TWVudSIsImhhbmRsZUVycm9yIiwiZGlzcGxheU1lc3NhZ2UiLCJzZXREaXNwbGF5U2VsZWN0ZWQiLCJlIiwic29ydE9uIiwiY3RzIiwiZmlsdGVyT3V0UmVzdHJpY3RlZCIsInNvcnRPcmRlciIsImxvYWRCeUlkIiwicmVtb3ZlRGVhY3RpdmF0ZWRTdHlsZUZyb21NZW51IiwiYWRkRGVhY3RpdmF0ZWRTdHlsZVRvTWVudSIsIkFUVFJJQlVURV9EQVRBX0lEIiwiaXNPcGVuIiwiSHViVmlldyIsInJlbmRlclRhYlBhbmVsIiwicmVuZGVyUGFuZWwiLCJleHBhbmRlZCIsInRhYkNvbnRhaW5lckVsZW1lbnQiLCJwYW5lbCIsInNldFRpbWVvdXQiLCJ0YWJsaXN0IiwidGFiTGlzdFdyYXBwZXIiLCJ0YWJJZCIsInRhYlBhbmVsSWQiLCJ0YWJQYW5lbCIsIlNlYXJjaFNlcnZpY2UiLCJmaWx0ZXJCeVF1ZXJ5IiwibXVsdGlTb3J0IiwiY3QiLCJpc0FycmF5Iiwic29ydCIsImN0MSIsImN0MiIsImhhbmRsZVNvcnRUeXBlIiwic29ydE9uUmVzdHJpY3RlZCIsInNvcnRPblByb3BlcnR5Iiwic29ydFNlYXJjaFJlc3VsdHMiLCJwcm9wZXJ0eSIsImZpbHRlcmVkIiwic2NvcmUiLCJnZXRTZWFyY2hTY29yZSIsImEiLCJiIiwicG9wdWxhcml0eSIsInF1ZXJpZXMiLCJzcGxpdCIsInF1ZXJ5U2NvcmVzIiwiZ2V0U2NvcmVGb3JFYWNoUXVlcnkiLCJ0cmltIiwiaGFzU3ViU3RyaW5nIiwiYXJyYXlIYXNTdWJTdHJpbmciLCJrZXl3b3JkcyIsIm5lZWRsZSIsImhheXN0YWNrIiwidW5kZWZpbmVkIiwidG9Mb3dlckNhc2UiLCJzdWJTdHJpbmciLCJzdHJpbmciLCJVcGxvYWRTZWN0aW9uIiwiaDVwVXBsb2FkIiwidGV4dENvbnRlbnQiLCJkYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmaWxlcyIsInVwbG9hZENvbnRlbnQiLCJyZW1vdmVUYWJJbmRleCIsInJlbW92ZVRhYkluZGV4Rm9yQWxsIiwic2V0VGFiSW5kZXhaZXJvIiwiaGFzVGFiSW5kZXgiLCJDb250cm9scyIsInBsdWdpbnMiLCJlbGVtZW50cyIsIm5leHRFbGVtZW50IiwicHJldmlvdXNFbGVtZW50IiwiaW5pdFBsdWdpbnMiLCJmaXJlc0V2ZW50Iiwic2V0VGFiYmFibGUiLCJvbGRFbGVtZW50IiwidGFiYmFibGVFbGVtZW50IiwiaXNMYXN0RWxlbWVudCIsIm5leHRFbCIsImlzRmlyc3RFbGVtZW50IiwicHJldkVsIiwicGx1Z2luIiwiS2V5Ym9hcmQiLCJzZWxlY3RhYmlsaXR5IiwiYm91bmRIYW5kbGVLZXlEb3duIiwiaGFuZGxlS2V5RG93biIsImxpc3RlbkZvcktleURvd24iLCJyZW1vdmVLZXlEb3duTGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2VsZWN0IiwicHJldmVudERlZmF1bHQiLCJBVFRSSUJVVEVfU0laRSIsImRpc2FibGUiLCJlbmFibGUiLCJ0b2dnbGVFbmFibGVkIiwiZW5hYmxlZCIsImhpZGRlbiIsImlzRGlzYWJsZWQiLCJ1cGRhdGVWaWV3IiwicHJldkJ1dHRvbiIsIm5leHRCdXR0b24iLCJsaXN0IiwidG90YWxDb3VudCIsInN0eWxlIiwid2lkdGgiLCJkaXNwbGF5Q291bnQiLCJtYXJnaW5MZWZ0IiwicG9zaXRpb24iLCJvbk5hdmlnYXRpb25CdXR0b25DbGljayIsInVwZGF0ZVN0YXRlIiwiaW5pdEltYWdlIiwidGFyZ2V0SWQiLCJoYW5kbGVEb21VcGRhdGUiLCJyZWNvcmQiLCJhZGRlZE5vZGVzIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJpc1NlbGVjdGVkIiwidW5TZWxlY3RBbGwiLCJhZGRBcmlhU2VsZWN0ZWRPYnNlcnZlciIsInBhbmVsSWQiLCJhbGxQYW5lbHMiLCJzZWxlY3RUYWIiLCJhbGxUYWJzIiwidGFicyIsImtleWJvYXJkIiwib25TZWxlY3QiLCJlbGVtZW50SW5kZXgiLCJmb3JjZVNlbGVjdGVkSW5kZXgiLCJhZGRUYWJJbmRleCIsInVwZGF0ZVRhYmJhYmxlIiwic2VsZWN0ZWRFbGVtZW50IiwibmV4dEluZGV4IiwiY3VycmVudEluZGV4IiwibGFzdEluZGV4IiwicHJldmlvdXNJbmRleCIsInNlbGVjdGVkSW5kZXgiLCJyZXF1aXJlIiwiSDVQIiwiSHViQ2xpZW50IiwiZGVmYXVsdCIsInVuRXhwYW5kIiwib25TZWxlY3RNZW51SXRlbSIsInRvZ2dsZXIiLCJtZW51SXRlbSIsImlzRXhwYW5kZWQiLCJpbml0Q29sbGFwc2libGUiLCJ0YXJnZXRIYW5kbGVyIiwiY29sbGFwc2libGVJZCIsImNvbGxhcHNpYmxlIiwiRGljdGlvbmFyeSIsImtleSIsInJlcGxhY2VtZW50cyIsIk1lc3NhZ2VWaWV3IiwibWVzc2FnZVdyYXBwZXIiLCJkaXNtaXNzaWJsZSIsImNsb3NlQnV0dG9uIiwibWVzc2FnZUNvbnRlbnQiLCJtZXNzYWdlQnV0dG9uIiwic3VwcG9ydCIsInNlYXJjaFBhcmFtcyIsIml0ZXJhYmxlIiwiU3ltYm9sIiwiYmxvYiIsIkJsb2IiLCJhcnJheUJ1ZmZlciIsInZpZXdDbGFzc2VzIiwiaXNEYXRhVmlldyIsIm9iaiIsIkRhdGFWaWV3IiwiaXNQcm90b3R5cGVPZiIsImlzQXJyYXlCdWZmZXJWaWV3IiwiQXJyYXlCdWZmZXIiLCJpc1ZpZXciLCJPYmplY3QiLCJub3JtYWxpemVOYW1lIiwiU3RyaW5nIiwidGVzdCIsIlR5cGVFcnJvciIsIm5vcm1hbGl6ZVZhbHVlIiwiaXRlcmF0b3JGb3IiLCJpdGVtcyIsIml0ZXJhdG9yIiwibmV4dCIsInNoaWZ0IiwiZG9uZSIsIkhlYWRlcnMiLCJoZWFkZXJzIiwiaGVhZGVyIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIm9sZFZhbHVlIiwiaGFzIiwic2V0IiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwia2V5cyIsImVudHJpZXMiLCJjb25zdW1lZCIsImJvZHlVc2VkIiwiZmlsZVJlYWRlclJlYWR5IiwicmVhZGVyIiwib25sb2FkIiwib25lcnJvciIsInJlYWRCbG9iQXNBcnJheUJ1ZmZlciIsIkZpbGVSZWFkZXIiLCJwcm9taXNlIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJyZWFkQmxvYkFzVGV4dCIsInJlYWRBc1RleHQiLCJyZWFkQXJyYXlCdWZmZXJBc1RleHQiLCJidWYiLCJVaW50OEFycmF5IiwiY2hhcnMiLCJpIiwiZnJvbUNoYXJDb2RlIiwiam9pbiIsImJ1ZmZlckNsb25lIiwiYnl0ZUxlbmd0aCIsImJ1ZmZlciIsIkJvZHkiLCJfaW5pdEJvZHkiLCJfYm9keUluaXQiLCJfYm9keVRleHQiLCJfYm9keUJsb2IiLCJfYm9keUZvcm1EYXRhIiwiVVJMU2VhcmNoUGFyYW1zIiwiX2JvZHlBcnJheUJ1ZmZlciIsIkVycm9yIiwicmVqZWN0ZWQiLCJkZWNvZGUiLCJKU09OIiwicGFyc2UiLCJtZXRob2RzIiwibm9ybWFsaXplTWV0aG9kIiwidXBjYXNlZCIsInRvVXBwZXJDYXNlIiwiUmVxdWVzdCIsImlucHV0Iiwib3B0aW9ucyIsIm1vZGUiLCJyZWZlcnJlciIsImNsb25lIiwiZm9ybSIsImJ5dGVzIiwicmVwbGFjZSIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhcnNlSGVhZGVycyIsInJhd0hlYWRlcnMiLCJwcmVQcm9jZXNzZWRIZWFkZXJzIiwibGluZSIsInBhcnRzIiwiUmVzcG9uc2UiLCJib2R5SW5pdCIsInN0YXR1cyIsIm9rIiwic3RhdHVzVGV4dCIsInJlZGlyZWN0U3RhdHVzZXMiLCJyZWRpcmVjdCIsIlJhbmdlRXJyb3IiLCJsb2NhdGlvbiIsInJlcXVlc3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInJlc3BvbnNlVVJMIiwicmVzcG9uc2VUZXh0Iiwib250aW1lb3V0Iiwib3BlbiIsIndpdGhDcmVkZW50aWFscyIsInJlc3BvbnNlVHlwZSIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwicG9seWZpbGwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFD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dC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhYWE0MDEyNTUwMGVmY2Q5ZGEzZCIsIi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgdmVyc2lvbiBvZiBhIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjdXJyeSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGNvbnN0IGFyaXR5ID0gZm4ubGVuZ3RoO1xuXG4gIHJldHVybiBmdW5jdGlvbiBmMSgpIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBpZiAoYXJncy5sZW5ndGggPj0gYXJpdHkpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZjIoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgcmV0dXJuIGYxLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KGFyZ3MyKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBDb21wb3NlIGZ1bmN0aW9ucyB0b2dldGhlciwgZXhlY3V0aW5nIGZyb20gcmlnaHQgdG8gbGVmdFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24uLi59IGZuc1xuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29tcG9zZSA9ICguLi5mbnMpID0+IGZucy5yZWR1Y2UoKGYsIGcpID0+ICguLi5hcmdzKSA9PiBmKGcoLi4uYXJncykpKTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBlbGVtZW50IGluIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZm9yRWFjaCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIGFyci5mb3JFYWNoKGZuKTtcbn0pO1xuXG4vKipcbiAqIE1hcHMgYSBmdW5jdGlvbiB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IG1hcCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIubWFwKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmaWx0ZXIgdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLmZpbHRlcihmbik7XG59KTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgc29tZSB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHNvbWUgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLnNvbWUoZm4pO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgdmFsdWVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnRhaW5zID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5pbmRleE9mKHZhbHVlKSAhPSAtMTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgc3VwcGxpZWQgdmFsdWVzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHdpdGhvdXQgPSBjdXJyeShmdW5jdGlvbiAodmFsdWVzLCBhcnIpIHtcbiAgcmV0dXJuIGZpbHRlcih2YWx1ZSA9PiAhY29udGFpbnModmFsdWUsIHZhbHVlcyksIGFycilcbn0pO1xuXG4vKipcbiAqIFRha2VzIGEgc3RyaW5nIHRoYXQgaXMgZWl0aGVyICd0cnVlJyBvciAnZmFsc2UnIGFuZCByZXR1cm5zIHRoZSBvcHBvc2l0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBib29sXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgaW52ZXJzZUJvb2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoYm9vbCkge1xuICByZXR1cm4gKGJvb2wgIT09ICd0cnVlJykudG9TdHJpbmcoKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIi8qKlxuICogQG1peGluXG4gKi9cbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnRmdWx9XG4gICAqL1xuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNjb3BlXG4gICAgICovXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcbiAgICAgICdsaXN0ZW5lcic6IGxpc3RlbmVyLFxuICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIGV2ZW50LiBJZiBhbnkgb2YgdGhlIGxpc3RlbmVycyByZXR1cm5zIGZhbHNlLCByZXR1cm4gZmFsc2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtvYmplY3R9IFtldmVudF1cbiAgICpcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICB0cmlnZ2VyOiBmdW5jdGlvbih0eXBlLCBldmVudCkge1xuICAgIGNvbnN0IHRyaWdnZXJzID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XG5cbiAgICByZXR1cm4gdHJpZ2dlcnMuZXZlcnkoZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgcmV0dXJuIHRyaWdnZXIubGlzdGVuZXIuY2FsbCh0cmlnZ2VyLnNjb3BlIHx8IHRoaXMsIGV2ZW50KSAhPT0gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIExpc3RlbnMgZm9yIGV2ZW50cyBvbiBhbm90aGVyIEV2ZW50ZnVsLCBhbmQgcHJvcGFnYXRlIGl0IHRyb3VnaCB0aGlzIEV2ZW50ZnVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IHR5cGVzXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IGV2ZW50ZnVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZXZlbnROYW1lXSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgd2hlbiBwcm9wb2dhdGVkXG4gICAqL1xuICBwcm9wYWdhdGU6IGZ1bmN0aW9uKHR5cGVzLCBldmVudGZ1bCwgbmV3VHlwZSkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICB0eXBlcy5mb3JFYWNoKHR5cGUgPT4gZXZlbnRmdWwub24odHlwZSwgZXZlbnQgPT4gc2VsZi50cmlnZ2VyKG5ld1R5cGUgfHwgdHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwiaW1wb3J0IHtjdXJyeSwgaW52ZXJzZUJvb2xlYW5TdHJpbmd9IGZyb20gJy4vZnVuY3Rpb25hbCdcblxuLyoqXG4gKiBHZXQgYW4gYXR0cmlidXRlIHZhbHVlIGZyb20gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0QXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIFNldCBhbiBhdHRyaWJ1dGUgb24gYSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2V0QXR0cmlidXRlID0gY3VycnkoKG5hbWUsIHZhbHVlLCBlbCkgPT4gZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSk7XG5cbi8qKlxuICogUmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0F0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwuaGFzQXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGUgdGhhdCBlcXVhbHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUVxdWFscyA9IGN1cnJ5KChuYW1lLCB2YWx1ZSwgZWwpID0+IGVsLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWUpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYW4gYXR0cmlidXRlIGJldHdlZW4gJ3RydWUnIGFuZCAnZmFsc2UnO1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiB7XG4gIGNvbnN0IHZhbHVlID0gZ2V0QXR0cmlidXRlKG5hbWUsIGVsKTtcbiAgc2V0QXR0cmlidXRlKG5hbWUsIGludmVyc2VCb29sZWFuU3RyaW5nKHZhbHVlKSwgZWwpO1xufSk7XG5cbi8qKlxuICogVGhlIGFwcGVuZENoaWxkKCkgbWV0aG9kIGFkZHMgYSBub2RlIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3Qgb2YgY2hpbGRyZW4gb2YgYSBzcGVjaWZpZWQgcGFyZW50IG5vZGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjaGlsZFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBhcHBlbmRDaGlsZCA9IGN1cnJ5KChwYXJlbnQsIGNoaWxkKSA9PiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgYSBkZXNjZW5kYW50IG9mIHRoZSBlbGVtZW50IG9uIHdoaWNoIGl0IGlzIGludm9rZWRcbiAqIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIHNlbGVjdG9ycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3IgPSBjdXJyeSgoc2VsZWN0b3IsIGVsKSA9PiBlbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5vbi1saXZlIE5vZGVMaXN0IG9mIGFsbCBlbGVtZW50cyBkZXNjZW5kZWQgZnJvbSB0aGUgZWxlbWVudCBvbiB3aGljaCBpdFxuICogaXMgaW52b2tlZCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBDU1Mgc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge05vZGVMaXN0fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvckFsbCA9IGN1cnJ5KChzZWxlY3RvciwgZWwpID0+IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcblxuLyoqXG4gKiBUaGUgcmVtb3ZlQ2hpbGQoKSBtZXRob2QgcmVtb3ZlcyBhIGNoaWxkIG5vZGUgZnJvbSB0aGUgRE9NLiBSZXR1cm5zIHJlbW92ZWQgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IHBhcmVudFxuICogQHBhcmFtIHtOb2RlfSBvbGRDaGlsZFxuICpcbiAqIEByZXR1cm4ge05vZGV9XG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVDaGlsZCA9IGN1cnJ5KChwYXJlbnQsIG9sZENoaWxkKSA9PiBwYXJlbnQucmVtb3ZlQ2hpbGQob2xkQ2hpbGQpKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBub2RlIGhhcyBhIGNsYXNzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGNsYXNzTGlzdENvbnRhaW5zID0gY3VycnkoKGNscywgZWwpID0+IGVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMpKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgTm9kZUxpc3QgdG8gYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge05vZGVMaXN0fSBub2RlTGlzdFxuICpcbiAqIEByZXR1cm4ge05vZGVbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IG5vZGVMaXN0VG9BcnJheSA9IG5vZGVMaXN0ID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVMaXN0KTtcblxuLyoqXG4gKiBBZGRzIGFyaWEtaGlkZGVuPXRydWUgdG8gYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEFkZHMgYXJpYS1oaWRkZW49ZmFsc2UgdG8gYW4gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYXJpYS1oaWRkZW4gb24gYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IGN1cnJ5KCh2aXNpYmxlLCBlbGVtZW50KSA9PiAodmlzaWJsZSA/IHNob3cgOiBoaWRlKShlbGVtZW50KSk7XG5cbi8qKlxuICogVG9nZ2xlcyBhIGNsYXNzIG9uIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFkZFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlQ2xhc3MgPSBjdXJyeSgoY2xzLCBhZGQsIGVsZW1lbnQpID0+IGVsZW1lbnQuY2xhc3NMaXN0W2FkZCA/ICdhZGQnIDogJ3JlbW92ZSddKGNscykpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwiaW1wb3J0ICcuL3V0aWxzL2ZldGNoJztcbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gQ29udGVudFR5cGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGNoVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN1bW1hcnlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjcmVhdGVkQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVkX0F0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaXNSZWNvbW1lbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBvcHVsYXJpdHlcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHNjcmVlbnNob3RzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGljZW5zZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV4YW1wbGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0dXRvcmlhbFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0ga2V5d29yZHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvd25lclxuICogQHByb3BlcnR5IHtib29sZWFufSBpbnN0YWxsZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVzdHJpY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBhcGlSb290VXJsIH0pIHtcbiAgICB0aGlzLmFwaVJvb3RVcmwgPSBhcGlSb290VXJsO1xuICAgIHRoaXMuc2V0dXAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCB0aGUgY29udGVudCB0eXBlIG1ldGFkYXRhXG4gICAqL1xuICBzZXR1cCgpIHtcbiAgICB0aGlzLmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50LXR5cGUtY2FjaGVgLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pXG4gICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgLnRoZW4odGhpcy5pc1ZhbGlkKVxuICAgIC50aGVuKGpzb24gPT4ganNvbi5saWJyYXJpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSAge0NvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cbiAgICovXG4gIGlzVmFsaWQocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT59XG4gICAqL1xuICBjb250ZW50VHlwZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVkQ29udGVudFR5cGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBDb250ZW50IFR5cGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVkQ29udGVudFR5cGVzLnRoZW4oY29udGVudFR5cGVzID0+IHtcbiAgICAgIHJldHVybiBjb250ZW50VHlwZXMuZmlsdGVyKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lID09PSBtYWNoaW5lTmFtZSlbMF07XG4gICAgfSk7XG5cbiAgICAvKnJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9Y29udGVudF90eXBlX2NhY2hlLyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTsqL1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbGxzIGEgY29udGVudCB0eXBlIG9uIHRoZSBzZXJ2ZXJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGluc3RhbGxDb250ZW50VHlwZShpZCkge1xuICAgIHJldHVybiBmZXRjaChucy5nZXRBamF4VXJsKCdsaWJyYXJ5LWluc3RhbGwnLCB7aWQ6IGlkfSksIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6ICcnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XG4gIH1cblxuXG4gIC8vIGZvciB0ZXN0aW5nIHdpdGggZXJyb3JcbiAgLyppbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktaW5zdGFsbGAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9Ki9cblxuICAvKipcbiAgICogVXBsb2FkcyBhIGNvbnRlbnQgdHlwZSB0byB0aGUgc2VydmVyIGZvciB2YWxpZGF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7Rm9ybURhdGF9IGZvcm1EYXRhIEZvcm0gY29udGFpbmluZyB0aGUgaDVwIHRoYXQgc2hvdWxkIGJlIHVwbG9hZGVkIGFzICdoNXAnXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBqc29uIGNvbnRhaW5pbmcgdGhlIGNvbnRlbnQganNvbiBhbmQgdGhlIGg1cCBqc29uXG4gICAqL1xuICB1cGxvYWRDb250ZW50KGZvcm1EYXRhKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1saWJyYXJ5LXVwbG9hZGAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6IGZvcm1EYXRhXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi1zZXJ2aWNlcy5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcblxuLyoqXG4gKiAgVHJhbnNmb3JtcyBhIERPTSBjbGljayBldmVudCBpbnRvIGFuIEV2ZW50ZnVsJ3MgZXZlbnRcbiAqICBAc2VlIEV2ZW50ZnVsXG4gKlxuICogQHBhcmFtICB7c3RyaW5nIHwgT2JqZWN0fSB0eXBlXG4gKiBAcGFyYW0gIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbGF5Q2xpY2tFdmVudEFzID0gY3VycnkoZnVuY3Rpb24odHlwZSwgZXZlbnRmdWwsIGVsZW1lbnQpIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBldmVudGZ1bC50cmlnZ2VyKHR5cGUsIHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBpZDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIGRvbid0IGJ1YmJsZVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICByZXR1cm4gZWxlbWVudDtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwiaW1wb3J0IHsgaW5pdENvbGxhcHNpYmxlIH0gZnJvbSAnLi4vdXRpbHMvY29sbGFwc2libGUnO1xuXG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgaW5pdENvbGxhcHNpYmxlKGVsZW1lbnQpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvcGFuZWwuanMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ01DQTBNREFnTWpJMUlqNE5DaUFnUEdSbFpuTStEUW9nSUNBZ1BITjBlV3hsUGcwS0lDQWdJQ0FnTG1Oc2N5MHhJSHNOQ2lBZ0lDQWdJR1pwYkd3NklHNXZibVU3RFFvZ0lDQWdJQ0I5RFFvTkNpQWdJQ0FnSUM1amJITXRNaUI3RFFvZ0lDQWdJQ0JtYVd4c09pQWpZelpqTm1NM093MEtJQ0FnSUNBZ2ZRMEtEUW9nSUNBZ0lDQXVZMnh6TFRNc0lDNWpiSE10TkNCN0RRb2dJQ0FnSUNCbWFXeHNPaUFqWm1abU93MEtJQ0FnSUNBZ2ZRMEtEUW9nSUNBZ0lDQXVZMnh6TFRNZ2V3MEtJQ0FnSUNBZ2IzQmhZMmwwZVRvZ01DNDNPdzBLSUNBZ0lDQWdmUTBLSUNBZ0lEd3ZjM1I1YkdVK0RRb2dJRHd2WkdWbWN6NE5DaUFnUEhScGRHeGxQbU52Ym5SbGJuUWdkSGx3WlNCd2JHRmpaV2h2YkdSbGNsOHlQQzkwYVhSc1pUNE5DaUFnUEdjZ2FXUTlJa3hoZVdWeVh6SWlJR1JoZEdFdGJtRnRaVDBpVEdGNVpYSWdNaUkrRFFvZ0lDQWdQR2NnYVdROUltTnZiblJsYm5SZmRIbHdaVjl3YkdGalpXaHZiR1JsY2kweFgyTnZjSGtpSUdSaGRHRXRibUZ0WlQwaVkyOXVkR1Z1ZENCMGVYQmxJSEJzWVdObGFHOXNaR1Z5TFRFZ1kyOXdlU0krRFFvZ0lDQWdJQ0E4Y21WamRDQmpiR0Z6Y3owaVkyeHpMVEVpSUhkcFpIUm9QU0kwTURBaUlHaGxhV2RvZEQwaU1qSTFJaTgrRFFvZ0lDQWdJQ0E4Y21WamRDQmpiR0Z6Y3owaVkyeHpMVElpSUhnOUlqRXhNaTQxTVNJZ2VUMGlORE11TkRFaUlIZHBaSFJvUFNJeE56WXVPVFlpSUdobGFXZG9kRDBpTVRNMUxqUTFJaUJ5ZUQwaU1UQWlJSEo1UFNJeE1DSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhNell1TmpZaUlHTjVQU0kyTVM0NU9DSWdjajBpTkM0NE1TSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhOVEV1TkRraUlHTjVQU0kyTVM0NU9DSWdjajBpTkM0NE1TSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhOall1TVNJZ1kzazlJall4TGprNElpQnlQU0kwTGpneElpOCtEUW9nSUNBZ0lDQThaeUJwWkQwaVgwZHliM1Z3WHlJZ1pHRjBZUzF1WVcxbFBTSW1iSFE3UjNKdmRYQW1aM1E3SWo0TkNpQWdJQ0FnSUNBZ1BHY2dhV1E5SWw5SGNtOTFjRjh5SWlCa1lYUmhMVzVoYldVOUlpWnNkRHRIY205MWNDWm5kRHNpUGcwS0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdsa1BTSmZRMjl0Y0c5MWJtUmZVR0YwYUY4aUlHUmhkR0V0Ym1GdFpUMGlKbXgwTzBOdmJYQnZkVzVrSUZCaGRHZ21aM1E3SWlCamJHRnpjejBpWTJ4ekxUUWlJR1E5SWsweU5qTXVNamdzT1RVdU1qRkRNall3TERreUxqQTNMREkxTlN3NU1TNDFMREkwT0M0ME15dzVNUzQxU0RJeU4zWTRTREU1T1M0MWJDMHlMakUzTERFd0xqSTBZVEkxTGpnMExESTFMamcwTERBc01Dd3hMREV4TGpRNExURXVOak1zTVRrdU9UTXNNVGt1T1RNc01Dd3dMREVzTVRRdU16a3NOUzQxTnl3eE9DNHlOaXd4T0M0eU5pd3dMREFzTVN3MUxqVXlMREV6TGpZc01qTXVNVEVzTWpNdU1URXNNQ3d3TERFdE1pNDROQ3d4TVM0d05Td3hPQzQyTlN3eE9DNDJOU3d3TERBc01TMDRMakEyTERjdU56a3NPU3c1TERBc01Dd3hMVFF1TVRJc01TNHpOMGd5TXpaMkxUSXhhREV3TGpReVl6Y3VNellzTUN3eE1pNDRNeTB4TGpZeExERTJMalF5TFRWek5TNHpPQzAzTGpRNExEVXVNemd0TVRNdU5EUkRNalk0TGpJeUxERXdNaTR5T1N3eU5qWXVOVGNzT1RndU16VXNNall6TGpJNExEazFMakl4V20wdE1UVXNNVGRqTFRFdU5ESXNNUzR5TWkwekxqa3NNUzR5TlMwM0xqUXhMREV1TWpWSU1qTTJkaTB4TkdnMUxqWXlZVGt1TlRjc09TNDFOeXd3TERBc01TdzNMREl1T1RNc055NHdOU3czTGpBMUxEQXNNQ3d4TERFdU9EVXNOQzQ1TWtFMkxqTXpMRFl1TXpNc01Dd3dMREVzTWpRNExqTXhMREV4TWk0eU5Wb2lMejROQ2lBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JwWkQwaVgxQmhkR2hmSWlCa1lYUmhMVzVoYldVOUlpWnNkRHRRWVhSb0ptZDBPeUlnWTJ4aGMzTTlJbU5zY3kwMElpQmtQU0pOTWpBeUxqa3NNVEU1TGpFeFlUZ3VNVElzT0M0eE1pd3dMREFzTUMwM0xqSTRMRFF1TlRKc0xURTJMVEV1TWpJc055NHlNaTB6TUM0NU1rZ3hOelIyTWpKSU1UVXpkaTB5TWtneE16WjJOVFpvTVRkMkxUSXhhREl4ZGpJeGFESXdMak14WXkweUxqY3lMREF0TlMweExqVXpMVGN0TTJFeE9TNHhPU3d4T1M0eE9Td3dMREFzTVMwMExqY3pMVFF1T0RNc01qTXVOVGdzTWpNdU5UZ3NNQ3d3TERFdE15MDJMalpzTVRZdE1pNHlObUU0TGpFeExEZ3VNVEVzTUN3eExEQXNOeTR5TmkweE1TNDNNbG9pTHo0TkNpQWdJQ0FnSUNBZ1BDOW5QZzBLSUNBZ0lDQWdQQzluUGcwS0lDQWdJQ0FnUEhKbFkzUWdZMnhoYzNNOUltTnNjeTB6SWlCNFBTSXhOemN1TmpZaUlIazlJalUzTGpZMklpQjNhV1IwYUQwaU9USXVNamdpSUdobGFXZG9kRDBpT1M0ek9DSWdjbmc5SWpNdU5TSWdjbms5SWpNdU5TSXZQZzBLSUNBZ0lEd3ZaejROQ2lBZ1BDOW5QZzBLUEM5emRtYytEUW89XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Z1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgSHViVmlldyBmcm9tICcuL2h1Yi12aWV3JztcbmltcG9ydCBDb250ZW50VHlwZVNlY3Rpb24gZnJvbSAnLi9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbic7XG5pbXBvcnQgVXBsb2FkU2VjdGlvbiBmcm9tICcuL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uJztcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tICcuL2h1Yi1zZXJ2aWNlcyc7XG5pbXBvcnQgRGljdGlvbmFyeSBmcm9tICcuL3V0aWxzL2RpY3Rpb25hcnknO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gSHViU3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aXRsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb25JZFxuICogQHByb3BlcnR5IHtib29sZWFufSBleHBhbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFwaVJvb3RVcmxcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBFcnJvck1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXJyb3JDb2RlXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gU2VsZWN0ZWRFbGVtZW50XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRcbiAqL1xuLyoqXG4gKiBTZWxlY3QgZXZlbnRcbiAqIEBldmVudCBIdWIjc2VsZWN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEVycm9yIGV2ZW50XG4gKiBAZXZlbnQgSHViI2Vycm9yXG4gKiBAdHlwZSB7RXJyb3JNZXNzYWdlfVxuICovXG4vKipcbiAqIFVwbG9hZCBldmVudFxuICogQGV2ZW50IEh1YiN1cGxvYWRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgSHViI2Vycm9yXG4gKiBAZmlyZXMgSHViI3VwbG9hZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWIge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBkaWN0aW9uYXJ5KSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gU2V0dGluZyB1cCBEaWN0aW9uYXJ5XG4gICAgRGljdGlvbmFyeS5pbml0KGRpY3Rpb25hcnkpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIGNvbnRyb2xsZXJzXG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24gPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uKHN0YXRlLCB0aGlzLnNlcnZpY2VzKTtcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSwgdGhpcy5zZXJ2aWNlcyk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcblxuICAgIC8vIHByb3BhZ2F0ZSBjb250cm9sbGVyIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0J10sIHRoaXMuY29udGVudFR5cGVTZWN0aW9uKTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3VwbG9hZCddLCB0aGlzLnVwbG9hZFNlY3Rpb24pO1xuXG4gICAgLy8gaGFuZGxlIGV2ZW50c1xuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMuc2V0UGFuZWxUaXRsZSwgdGhpcyk7XG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy52aWV3LmNsb3NlUGFuZWwsIHRoaXMudmlldyk7XG4gICAgdGhpcy52aWV3Lm9uKCd0YWItY2hhbmdlJywgdGhpcy52aWV3LnNldFNlY3Rpb25UeXBlLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMudmlldy5vbigncGFuZWwtY2hhbmdlJywgdGhpcy52aWV3LnRvZ2dsZVBhbmVsT3Blbi5iaW5kKHRoaXMudmlldyksIHRoaXMudmlldyk7XG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24ub24oJ3JlbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5zZXJ2aWNlcy5zZXR1cCgpO1xuICAgICAgc2VsZi5jb250ZW50VHlwZVNlY3Rpb24uaW5pdENvbnRlbnRUeXBlTGlzdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbml0VGFiUGFuZWwoc3RhdGUpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGNvbnRlbnQgdHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgZ2V0Q29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShtYWNoaW5lTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGUgb2YgdGhlIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0UGFuZWxUaXRsZSh7aWR9KcKge1xuICAgIHRoaXMuZ2V0Q29udGVudFR5cGUoaWQpLnRoZW4oKHt0aXRsZX0pID0+IHRoaXMudmlldy5zZXRUaXRsZSh0aXRsZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgdGFiIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICovXG4gIGluaXRUYWJQYW5lbCh7IHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJyB9KSB7XG4gICAgY29uc3QgdGFiQ29uZmlncyA9IFt7XG4gICAgICB0aXRsZTogJ0NyZWF0ZSBDb250ZW50JyxcbiAgICAgIGlkOiAnY29udGVudC10eXBlcycsXG4gICAgICBjb250ZW50OiB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5nZXRFbGVtZW50KCksXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1VwbG9hZCcsXG4gICAgICBpZDogJ3VwbG9hZCcsXG4gICAgICBjb250ZW50OiB0aGlzLnVwbG9hZFNlY3Rpb24uZ2V0RWxlbWVudCgpXG4gICAgfV07XG5cbiAgICAvLyBzZXRzIHRoZSBjb3JyZWN0IG9uZSBzZWxlY3RlZFxuICAgIHRhYkNvbmZpZ3NcbiAgICAgIC5maWx0ZXIoY29uZmlnID0+IGNvbmZpZy5pZCA9PT0gc2VjdGlvbklkKVxuICAgICAgLmZvckVhY2goY29uZmlnID0+IGNvbmZpZy5zZWxlY3RlZCA9IHRydWUpO1xuXG4gICAgdGFiQ29uZmlncy5mb3JFYWNoKHRhYkNvbmZpZyA9PiB0aGlzLnZpZXcuYWRkVGFiKHRhYkNvbmZpZykpO1xuICAgIHRoaXMudmlldy5hZGRCb3R0b21Cb3JkZXIoKTsgLy8gQWRkcyBhbiBhbmltYXRlZCBib3R0b20gYm9yZGVyIHRvIGVhY2ggdGFiXG4gICAgdGhpcy52aWV3LmluaXRUYWJQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBpbiB0aGUgdmlld1xuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3R5bGVzL21haW4uc2Nzc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSwgcmVtb3ZlQ2hpbGQsIGhpZGUsIHNob3cgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IGN1cnJ5LCBmb3JFYWNoIH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIjtcbmltcG9ydCBpbml0SW1hZ2VTY3JvbGxlciBmcm9tIFwiY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlclwiO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IG5vSWNvbiBmcm9tICcuLi8uLi9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Zyc7XG5pbXBvcnQgRGljdGlvbmFyeSBmcm9tICcuLi91dGlscy9kaWN0aW9uYXJ5JztcblxuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCA9ICdkYXRhLWlkJztcblxuLyoqXG4gKiBAY29uc3RhbnQge251bWJlcn1cbiAqL1xuY29uc3QgTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiA9IDMwMDtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IGlmIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGVcbiAqL1xuY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IChlbGVtZW50LCB2aXNpYmxlKSA9PiAodmlzaWJsZSA/IHNob3cgOiBoaWRlKShlbGVtZW50KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdHJpbmcgaXMgZW1wdHlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRW1wdHkgPSAodGV4dCkgPT4gKHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJykgJiYgKHRleHQubGVuZ3RoID09PSAwKTtcblxuY29uc3QgaGlkZUFsbCA9IGZvckVhY2goaGlkZSk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWxWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSB2aWV3XG4gICAgdGhpcy5yb290RWxlbWVudCA9IHRoaXMuY3JlYXRlVmlldygpO1xuXG4gICAgLy8gZ3JhYiByZWZlcmVuY2VzXG4gICAgdGhpcy5idXR0b25CYXIgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tYmFyJyk7XG4gICAgdGhpcy51c2VCdXR0b24gPSB0aGlzLmJ1dHRvbkJhci5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXVzZScpO1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24taW5zdGFsbCcpO1xuICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idXR0b24nKTtcblxuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LXR5cGUtaW1hZ2UnKTtcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kZXRhaWxzIC50aXRsZScpO1xuICAgIHRoaXMub3duZXIgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd25lcicpO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWRldGFpbHMgLnNtYWxsJyk7XG4gICAgdGhpcy5kZW1vQnV0dG9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZGVtby1idXR0b24nKTtcbiAgICB0aGlzLmNhcm91c2VsID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWwnKTtcbiAgICB0aGlzLmNhcm91c2VsTGlzdCA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcigndWwnKTtcbiAgICB0aGlzLmxpY2VuY2VQYW5lbCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmxpY2VuY2UtcGFuZWwnKTtcbiAgICB0aGlzLmluc3RhbGxNZXNzYWdlID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW5zdGFsbC1tZXNzYWdlJyk7XG5cbiAgICAvLyBoaWRlIG1lc3NhZ2Ugb24gY2xvc2UgYnV0dG9uIGNsaWNrXG4gICAgbGV0IGluc3RhbGxNZXNzYWdlQ2xvc2UgPSB0aGlzLmluc3RhbGxNZXNzYWdlLnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlLWNsb3NlJyk7XG4gICAgaW5zdGFsbE1lc3NhZ2VDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGhpZGUodGhpcy5pbnN0YWxsTWVzc2FnZSkpO1xuXG4gICAgLy8gaW5pdCBpbnRlcmFjdGl2ZSBlbGVtZW50c1xuICAgIGluaXRQYW5lbCh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgaW5pdEltYWdlU2Nyb2xsZXIodGhpcy5jYXJvdXNlbCk7XG5cbiAgICAvLyBmaXJlIGV2ZW50cyBvbiBidXR0b24gY2xpY2tcbiAgICByZWxheUNsaWNrRXZlbnRBcygnY2xvc2UnLCB0aGlzLCB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrLWJ1dHRvbicpKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0JywgdGhpcywgdGhpcy51c2VCdXR0b24pO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdpbnN0YWxsJywgdGhpcywgdGhpcy5pbnN0YWxsQnV0dG9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSB2aWV3IGFzIGEgSFRNTEVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVWaWV3ICgpIHtcbiAgICBsZXQgbGFiZWxCYWNrID0gJ0JhY2snOyAvLyB0b2RvIHRyYW5zbGF0ZSBtZVxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtZGV0YWlsJztcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJhY2stYnV0dG9uIGljb24tYXJyb3ctdGhpY2tcIiBhcmlhLWxhYmVsPVwiJHtsYWJlbEJhY2t9XCIgdGFiaW5kZXg9XCIwXCI+PC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS13cmFwcGVyXCI+PGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlIGNvbnRlbnQtdHlwZS1pbWFnZVwiIHNyYz1cIiR7bm9JY29ufVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1kZXRhaWxzXCI+XG4gICAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj48L2gyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd25lclwiPjwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzPVwic21hbGxcIj48L3A+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidXR0b24gZGVtby1idXR0b25cIiB0YXJnZXQ9XCJfYmxhbmtcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgaHJlZj1cIiNcIj5Db250ZW50IERlbW88L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2Fyb3VzZWxcIiByb2xlPVwicmVnaW9uXCIgZGF0YS1zaXplPVwiNVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWJ1dHRvbiBwcmV2aW91c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRpc2FibGVkPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIG5leHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkaXNhYmxlZD48c3BhbiBjbGFzcz1cImljb24tYXJyb3ctdGhpY2tcIj48L3NwYW4+PC9zcGFuPlxuICAgICAgICA8bmF2IGNsYXNzPVwic2Nyb2xsZXJcIj5cbiAgICAgICAgICA8dWw+PC91bD5cbiAgICAgICAgPC9uYXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxociAvPlxuICAgICAgPGRpdiBjbGFzcz1cImluc3RhbGwtbWVzc2FnZSBtZXNzYWdlIGRpc21pc3NpYmxlIHNpbXBsZSBpbmZvXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlLWNsb3NlIGljb24tY2xvc2VcIj48L2Rpdj5cbiAgICAgICAgPGgzPjwvaDM+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tYmFyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1wcmltYXJ5IGJ1dHRvbi11c2VcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgZGF0YS1pZD1cIlwiPlVzZTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLWludmVyc2UtcHJpbWFyeSBidXR0b24taW5zdGFsbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRhdGEtaWQ9XCJcIj48c3BhbiBjbGFzcz1cImljb24tYXJyb3ctdGhpY2tcIj48L3NwYW4+JHtEaWN0aW9uYXJ5LmdldCgnaW5zdGFsbEJ1dHRvbkxhYmVsJyl9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsaW5nXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHNwYW4gY2xhc3M9XCJpY29uLWxvYWRpbmctc2VhcmNoIGljb24tc3BpblwiPjwvc3Bhbj5JbnN0YWxsaW5nPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZ3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIGxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGVyXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1jb250cm9scz1cImxpY2VuY2UtcGFuZWxcIj48c3BhbiBjbGFzcz1cImljb24tYWNjb3JkaW9uLWFycm93XCI+PC9zcGFuPiBUaGUgTGljZW5jZSBJbmZvPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIiBpZD1cImxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5LWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBtZXNzYWdlIG9uIGluc3RhbGxcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBzdWNjZXNzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAqL1xuICBzZXRJbnN0YWxsTWVzc2FnZSh7IHN1Y2Nlc3MgPSB0cnVlLCBtZXNzYWdlIH0pe1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UucXVlcnlTZWxlY3RvcignaDMnKS5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UuY2xhc3NOYW1lID0gYGluc3RhbGwtbWVzc2FnZSBkaXNtaXNzaWJsZSBtZXNzYWdlIHNpbXBsZSAke3N1Y2Nlc3MgPyAnaW5mbycgOiAnZXJyb3InfWA7XG4gICAgc2hvdyh0aGlzLmluc3RhbGxNZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBpbWFnZXMgZnJvbSB0aGUgY2Fyb3VzZWxcbiAgICovXG4gIHJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwoKSB7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWxMaXN0KSk7XG4gICAgdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWwtbGlnaHRib3gnKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaW1hZ2UgdG8gdGhlIGNhcm91c2VsXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbWFnZVxuICAgKi9cbiAgYWRkSW1hZ2VUb0Nhcm91c2VsKGltYWdlKSB7XG4gICAgLy8gYWRkIGxpZ2h0Ym94XG4gICAgY29uc3QgbGlnaHRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsaWdodGJveC5pZCA9IGBsaWdodGJveC0ke3RoaXMuY2Fyb3VzZWxMaXN0LmNoaWxkRWxlbWVudENvdW50fWA7XG4gICAgbGlnaHRib3guY2xhc3NOYW1lID0gJ2Nhcm91c2VsLWxpZ2h0Ym94JztcbiAgICBsaWdodGJveC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBsaWdodGJveC5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZS51cmx9XCIgYWx0PVwiJHtpbWFnZS5hbHR9XCI+YDtcbiAgICB0aGlzLmNhcm91c2VsLmFwcGVuZENoaWxkKGxpZ2h0Ym94KTtcblxuICAgIC8vIGFkZCB0aHVtYm5haWxcbiAgICBjb25zdCB0aHVtYm5haWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRodW1ibmFpbC5jbGFzc05hbWUgPSAnc2xpZGUnO1xuICAgIHRodW1ibmFpbC5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ltYWdlLnVybH1cIiBhbHQ9XCIke2ltYWdlLmFsdH1cIiBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgYXJpYS1jb250cm9scz1cIiR7bGlnaHRib3guaWR9XCIgLz5gO1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0LmFwcGVuZENoaWxkKHRodW1ibmFpbCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgaGlkZSh0aGlzLmluc3RhbGxNZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbWFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gICAqL1xuICBzZXRJbWFnZShzcmMpIHtcbiAgICB0aGlzLmltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjIHx8IG5vSWNvbik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRJZChpZCkge1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICAgIHRoaXMudXNlQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gYCR7dGl0bGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XG4gICAgaWYodGV4dC5sZW5ndGggPiBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OKSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9PHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvblxuICAgICAgICAucXVlcnlTZWxlY3RvcignLnJlYWQtbW9yZSwgLnJlYWQtbGVzcycpXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgUmVhZCBsZXNzIGFuZCBSZWFkIG1vcmUgdGV4dFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgdG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSB7XG4gICAgLy8gZmxpcCBib29sZWFuXG4gICAgdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkID0gIXRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZDtcblxuICAgIGlmKHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCkge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0ZXh0fTxzcGFuIGNsYXNzPVwicmVhZC1sZXNzIGxpbmtcIj5SZWFkIGxlc3M8L3NwYW4+YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9PHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgIH1cblxuICAgIHRoaXMuZGVzY3JpcHRpb25cbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcucmVhZC1tb3JlLCAucmVhZC1sZXNzJylcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvcnRlbnMgYSBzdHJpbmcsIGFuZCBwdXRzIGFuIGVsaXBzaXMgYXQgdGhlIGVuZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgZWxsaXBzaXMoc2l6ZSwgdGV4dCkge1xuICAgIHJldHVybiBgJHt0ZXh0LnN1YnN0cigwLCBzaXplKX0uLi5gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxpY2VuY2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICovXG4gIHNldExpY2VuY2UodHlwZSkge1xuICAgIGlmKHR5cGUpe1xuICAgICAgdGhpcy5saWNlbmNlUGFuZWwucXVlcnlTZWxlY3RvcignLnBhbmVsLWJvZHktaW5uZXInKS5pbm5lclRleHQgPSB0eXBlO1xuICAgICAgc2hvdyh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlkZSh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyXG4gICAqL1xuICBzZXRPd25lcihvd25lcikge1xuICAgIGlmKG93bmVyKSB7XG4gICAgICB0aGlzLm93bmVyLmlubmVySFRNTCA9IGBCeSAke293bmVyfWA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5vd25lci5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZXhhbXBsZSB1cmxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgc2V0RXhhbXBsZSh1cmwpIHtcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmRlbW9CdXR0b24sICFpc0VtcHR5KHVybCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgaWYgdGhlIGNvbnRlbnQgdHlwZSBpcyBpbnN0YWxsZWRcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBpbnN0YWxsZWRcbiAgICovXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xuICAgIHRoaXMuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoaW5zdGFsbGVkID8gJy5idXR0b24tdXNlJyA6ICcuYnV0dG9uLWluc3RhbGwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrcyBjb250ZW50IHR5cGUgYXMgcmVzdHJpY3RlZCwgZGlzYWJsaW5nIGluc3RhbGxpbmcgYW5kIHVzaW5nIHRoZSBjb250ZW50IHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVzdHJpY3RlZCBUcnVlIGlmIGNvbnRlbnQgdHlwZSBpcyByZXN0cmljdGVkXG4gICAqL1xuICBzZXRJc1Jlc3RyaWN0ZWQocmVzdHJpY3RlZCkge1xuICAgIHRoaXMudXNlQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCByZXN0cmljdGVkID8gJ2Rpc2FibGVkJyA6ICcnKTtcbiAgICB0aGlzLmluc3RhbGxCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHJlc3RyaWN0ZWQgPyAnZGlzYWJsZWQnIDogJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIGFsbCBidXR0b25zIGFuZCBzaG93cyB0aGUgYnV0dG9uIG9uIHRoZSBzZWxlY3RvciBhZ2FpblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ31zZWxlY3RvclxuICAgKi9cbiAgc2hvd0J1dHRvbkJ5U2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmJ1dHRvbkJhci5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmKGJ1dHRvbikge1xuICAgICAgaGlkZUFsbCh0aGlzLmJ1dHRvbnMpO1xuICAgICAgc2hvdyhidXR0b24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZURldGFpbFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWRldGFpbC12aWV3XCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWwge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSwgc2VydmljZXMpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IHNlcnZpY2VzO1xuXG4gICAgLy8gdmlld3NcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZURldGFpbFZpZXcoc3RhdGUpO1xuICAgIHRoaXMudmlldy5vbignaW5zdGFsbCcsIHRoaXMuaW5zdGFsbCwgdGhpcyk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydjbG9zZScsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgbG9hZEJ5SWQoaWQpIHtcbiAgICB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgLnRoZW4odGhpcy51cGRhdGUuYmluZCh0aGlzKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgIGluc3RhbGwoe2lkfSkge1xuICAgICAvLyBzZXQgc3Bpbm5lclxuICAgICB0aGlzLnZpZXcuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoJy5idXR0b24taW5zdGFsbGluZycpO1xuXG4gICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IHRoaXMuc2VydmljZXMuaW5zdGFsbENvbnRlbnRUeXBlKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKSlcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiB7XG4gICAgICAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQodHJ1ZSk7XG4gICAgICAgICB0aGlzLnZpZXcuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoJy5idXR0b24tZ2V0Jyk7XG4gICAgICAgICB0aGlzLnZpZXcuc2V0SW5zdGFsbE1lc3NhZ2Uoe1xuICAgICAgICAgICBtZXNzYWdlOiBgJHtjb250ZW50VHlwZS50aXRsZX0gc3VjY2Vzc2Z1bGx5IGluc3RhbGxlZCFgLFxuICAgICAgICAgfSk7XG4gICAgICAgfSlcbiAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgdGhpcy52aWV3LnNob3dCdXR0b25CeVNlbGVjdG9yKCcuYnV0dG9uLWluc3RhbGwnKTtcblxuICAgICAgICAgLy8gcHJpbnQgZXJyb3IgbWVzc2FnZVxuICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IChlcnJvci5lcnJvckNvZGUpID8gZXJyb3IgOiB7XG4gICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICBlcnJvckNvZGU6ICdSRVNQT05TRV9GQUlMRUQnLFxuICAgICAgICAgICBtZXNzYWdlOiBgJHtpZH0gY291bGQgbm90IGJlIGluc3RhbGxlZCEgQ29udGFjdCB5b3VyIGFkbWluaXN0cmF0b3IuYCxcbiAgICAgICAgIH07XG4gICAgICAgICB0aGlzLnZpZXcuc2V0SW5zdGFsbE1lc3NhZ2UoZXJyb3JNZXNzYWdlKTtcblxuICAgICAgICAgLy8gbG9nIHdob2xlIGVycm9yIG1lc3NhZ2UgdG8gY29uc29sZVxuICAgICAgICAgY29uc29sZS5lcnJvcignSW5zdGFsbGF0aW9uIGVycm9yJywgZXJyb3IpO1xuICAgICAgIH0pO1xuICAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGNvbnRlbnQgdHlwZSBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICB1cGRhdGUoY29udGVudFR5cGUpIHtcbiAgICB0aGlzLnZpZXcucmVzZXQoKTtcbiAgICB0aGlzLnZpZXcuc2V0SWQoY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuICAgIHRoaXMudmlldy5zZXRUaXRsZShjb250ZW50VHlwZS50aXRsZSk7XG4gICAgdGhpcy52aWV3LnNldERlc2NyaXB0aW9uKGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uKTtcbiAgICB0aGlzLnZpZXcuc2V0SW1hZ2UoY29udGVudFR5cGUuaWNvbik7XG4gICAgdGhpcy52aWV3LnNldEV4YW1wbGUoY29udGVudFR5cGUuZXhhbXBsZSk7XG4gICAgdGhpcy52aWV3LnNldE93bmVyKGNvbnRlbnRUeXBlLm93bmVyKTtcbiAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQoY29udGVudFR5cGUuaW5zdGFsbGVkKTtcbiAgICB0aGlzLnZpZXcuc2V0TGljZW5jZShjb250ZW50VHlwZS5saWNlbnNlKTtcbiAgICB0aGlzLnZpZXcuc2V0SXNSZXN0cmljdGVkKGNvbnRlbnRUeXBlLnJlc3RyaWN0ZWQpO1xuXG4gICAgLy8gdXBkYXRlIGNhcm91c2VsXG4gICAgdGhpcy52aWV3LnJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwoKTtcbiAgICBjb250ZW50VHlwZS5zY3JlZW5zaG90cy5mb3JFYWNoKHRoaXMudmlldy5hZGRJbWFnZVRvQ2Fyb3VzZWwsIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSwgcmVtb3ZlQ2hpbGQgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBDb250cm9scyBmcm9tICdoNXAtc2RrLXVpL3NyYy9zY3JpcHRzL2NvbnRyb2xzJztcbmltcG9ydCBLZXlib2FyZCBmcm9tICdoNXAtc2RrLXVpL3NyYy9zY3JpcHRzL3VpL2tleWJvYXJkJztcbmltcG9ydCBub0ljb24gZnJvbSAnLi4vLi4vaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmcnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGdldFJvd0lkID0gZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3RWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGluc3RhbGwgY29udHJvbHNcbiAgICB0aGlzLmNvbnRyb2xzID0gbmV3IENvbnRyb2xzKFtuZXcgS2V5Ym9hcmQoKV0pO1xuICAgIHRoaXMuY29udHJvbHMub24oJ3NlbGVjdCcsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgncm93LXNlbGVjdGVkJywge1xuICAgICAgICBlbGVtZW50OiBldmVudC5lbGVtZW50LFxuICAgICAgICBpZDogZ2V0Um93SWQoZXZlbnQuZWxlbWVudClcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICAvLyBjcmVhdGUgcm9vdCBlbGVtZW50XG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbGlzdCcpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1saXN0JztcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHJvd3MgZnJvbSByb290IGVsZW1lbnRcbiAgICovXG4gIHJlbW92ZUFsbFJvd3MoKSB7XG4gICAgd2hpbGUodGhpcy5yb290RWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpe1xuICAgICAgbGV0IHJvdyA9IHRoaXMucm9vdEVsZW1lbnQubGFzdENoaWxkO1xuXG4gICAgICB0aGlzLmNvbnRyb2xzLnJlbW92ZUVsZW1lbnQocm93KTtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlQ2hpbGQocm93KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHJvd1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgYWRkUm93KGNvbnRlbnRUeXBlKSB7XG4gICAgY29uc3Qgcm93ID0gdGhpcy5jcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgdGhpcyk7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3Jvdy1zZWxlY3RlZCcsIHRoaXMsIHJvdyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChyb3cpO1xuICAgIHRoaXMuY29udHJvbHMuYWRkRWxlbWVudChyb3cpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgQ29udGVudCBUeXBlIGNvbmZpZ3VyYXRpb24gYW5kIGNyZWF0ZXMgYSByb3cgZG9tXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IHNjb3BlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHNjb3BlKSB7XG4gICAgLy8gY3JlYXRlIGlkc1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmxlbmd0aDtcbiAgICBjb25zdCBjb250ZW50VHlwZVJvd1RpdGxlSWQgPSBgY29udGVudC10eXBlLXJvdy10aXRsZS0ke2luZGV4fWA7XG4gICAgY29uc3QgY29udGVudFR5cGVSb3dEZXNjcmlwdGlvbklkID0gYGNvbnRlbnQtdHlwZS1yb3ctZGVzY3JpcHRpb24tJHtpbmRleH1gO1xuXG4gICAgLy8gZmllbGQgY29uZmlndXJhdGlvblxuICAgIGNvbnN0IHVzZUJ1dHRvbkNvbmZpZyA9IHsgdGV4dDogJ1VzZScsIGNsczogJ2J1dHRvbi1wcmltYXJ5JywgaWNvbjogJycgfTtcbiAgICBjb25zdCBpbnN0YWxsQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnR2V0JywgY2xzOiAnYnV0dG9uLWludmVyc2UtcHJpbWFyeSBidXR0b24taW5zdGFsbCcsIGljb246ICdpY29uLWFycm93LXRoaWNrJ307XG4gICAgY29uc3QgYnV0dG9uID0gY29udGVudFR5cGUuaW5zdGFsbGVkID8gIHVzZUJ1dHRvbkNvbmZpZzogaW5zdGFsbEJ1dHRvbkNvbmZpZztcbiAgICBjb25zdCB0aXRsZSA9IGNvbnRlbnRUeXBlLnRpdGxlIHx8IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gY29udGVudFR5cGUuc3VtbWFyeSB8fCAnJztcbiAgICBjb25zdCBpbWFnZSA9IGNvbnRlbnRUeXBlLmljb24gfHwgbm9JY29uO1xuICAgIGNvbnN0IGRpc2FibGVkID0gY29udGVudFR5cGUucmVzdHJpY3RlZCA/ICdkaXNhYmxlZD1cImRpc2FibGVkXCInIDogJyc7XG5cbiAgICAvLyByb3cgaXRlbVxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuaWQgPSBgY29udGVudC10eXBlLSR7Y29udGVudFR5cGUubWFjaGluZU5hbWV9YDtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgY29udGVudFR5cGVSb3dUaXRsZUlkKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIGNvbnRlbnRUeXBlUm93RGVzY3JpcHRpb25JZCk7XG5cbiAgICAvLyBjcmVhdGUgaHRtbFxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZX1cIj5cbiAgICAgIDxidXR0b24gYXJpYS1kZXNjcmliZWRieT1cIiR7Y29udGVudFR5cGVSb3dUaXRsZUlkfVwiIGNsYXNzPVwiYnV0dG9uICR7YnV0dG9uLmNsc31cIiBkYXRhLWlkPVwiJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1cIiB0YWJpbmRleD1cIjBcIiAke2Rpc2FibGVkfT5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCIke2J1dHRvbi5pY29ufVwiPjwvc3Bhbj5cbiAgICAgICAgJHtidXR0b24udGV4dH1cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGg0IGlkPVwiJHtjb250ZW50VHlwZVJvd1RpdGxlSWR9XCI+JHt0aXRsZX08L2g0PlxuICAgICAgPGRpdiBpZD1cIiR7Y29udGVudFR5cGVSb3dEZXNjcmlwdGlvbklkfVwiIGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke2Rlc2NyaXB0aW9ufTwvZGl2PlxuICAgYDtcblxuICAgIC8vIGhhbmRsZSB1c2UgYnV0dG9uXG4gICAgY29uc3QgdXNlQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXByaW1hcnknKTtcbiAgICBpZih1c2VCdXR0b24pe1xuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHNjb3BlLCB1c2VCdXR0b24pO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZUxpc3RWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1saXN0LXZpZXdcIjtcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogUm93IHNlbGVjdGVkIGV2ZW50XG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBVcGRhdGUgY29udGVudCB0eXBlIGxpc3QgZXZlbnRcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3QjdXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3QjdXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdGhlIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZUxpc3RWaWV3KHN0YXRlKTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3Jvdy1zZWxlY3RlZCcsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoaXMgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgdGhpcyBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBsaXN0IHdpdGggbmV3IGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZXMpIHtcbiAgICB0aGlzLnZpZXcucmVtb3ZlQWxsUm93cygpO1xuICAgIGNvbnRlbnRUeXBlcy5mb3JFYWNoKHRoaXMudmlldy5hZGRSb3csIHRoaXMudmlldyk7XG4gICAgdGhpcy50cmlnZ2VyKCd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnLCB7fSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2aWV3cyByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsImltcG9ydCBNZXNzYWdlVmlldyBmcm9tIFwiLi4vbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlld1wiO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlLCBxdWVyeVNlbGVjdG9yQWxsIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBpbml0TmF2YmFyIGZyb20gJ2NvbXBvbmVudHMvbmF2YmFyJztcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgdW5zZWxlY3RBbGwgPSBmb3JFYWNoKHJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpKTtcblxuLyoqXG4gKiBAY29uc3RhbnQge251bWJlcn1cbiAqL1xuY29uc3QgS0VZX0NPREVfVEFCID0gOTtcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3XG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3IHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBnZW5lcmFsIGNvbmZpZ3VyYXRpb25cbiAgICB0aGlzLnR5cGVBaGVhZEVuYWJsZWQgPSB0cnVlO1xuXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRzXG4gICAgdGhpcy5yb290RWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudChzdGF0ZSk7XG5cbiAgICAvLyBwaWNrIGVsZW1lbnRzXG4gICAgdGhpcy5tZW51ID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCduYXYnKTtcbiAgICB0aGlzLm1lbnViYXIgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItbmF2Jyk7XG4gICAgdGhpcy5pbnB1dEZpZWxkID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInNlYXJjaFwiXSBpbnB1dCcpO1xuICAgIHRoaXMuZGlzcGxheVNlbGVjdGVkID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXRvZ2dsZXItc2VsZWN0ZWQnKTtcbiAgICBjb25zdCBpbnB1dEJ1dHRvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignW3JvbGU9XCJzZWFyY2hcIl0gLmlucHV0LWdyb3VwLWFkZG9uJyk7XG5cbiAgICAvLyBpbnB1dCBmaWVsZFxuICAgIHRoaXMuaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcbiAgICAgIC8vIGlmIG5vdCB0YWIgZXZlbnRcbiAgICAgIGlmKGV2ZW50LmtleUNvZGUgIT0gS0VZX0NPREVfVEFCKSB7XG4gICAgICAgIGxldCBzZWFyY2hiYXIgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKTtcblxuICAgICAgICAvLyBPbmx5IHNlYXJjaGluZyBpZiB0aGUgZW50ZXIga2V5IGlzIHByZXNzZWRcbiAgICAgICAgaWYgKHRoaXMudHlwZUFoZWFkRW5hYmxlZCB8fCBldmVudC53aGljaCA9PSAxMyB8fCBldmVudC5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyKCdzZWFyY2gnLCB7XG4gICAgICAgICAgICBlbGVtZW50OiBzZWFyY2hiYXIsXG4gICAgICAgICAgICBxdWVyeTogc2VhcmNoYmFyLnZhbHVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGlucHV0IGJ1dHRvblxuICAgIGlucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgIGxldCBzZWFyY2hiYXIgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKTtcblxuICAgICAgIHRoaXMudHJpZ2dlcignc2VhcmNoJywge1xuICAgICAgICAgZWxlbWVudDogc2VhcmNoYmFyLFxuICAgICAgICAgcXVlcnk6IHNlYXJjaGJhci52YWx1ZVxuICAgICAgIH0pO1xuXG4gICAgICAgc2VhcmNoYmFyLmZvY3VzKCk7XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtZW51IGdyb3VwIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlRWxlbWVudChzdGF0ZSkge1xuICAgIGxldCBtZW51dGl0bGUgPSAnQnJvd3NlIGNvbnRlbnQgdHlwZXMnO1xuICAgIGxldCBtZW51SWQgPSAnY29udGVudC10eXBlLWZpbHRlcic7XG4gICAgbGV0IHNlYXJjaFRleHQgPSAnU2VhcmNoIGZvciBDb250ZW50IFR5cGVzJztcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcnO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtZ3JvdXBcIj5cbiAgICAgICAgPG5hdiAgcm9sZT1cIm1lbnViYXJcIiBjbGFzcz1cIm5hdmJhclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItaGVhZGVyXCI+XG4gICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlciBuYXZiYXItdG9nZ2xlci1yaWdodFwiIGFyaWEtY29udHJvbHM9XCIke21lbnVJZH1cIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXItc2VsZWN0ZWRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24tYWNjb3JkaW9uLWFycm93XCI+PC9zcGFuPlxuICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLWJyYW5kXCI+JHttZW51dGl0bGV9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPHVsIGlkPVwiJHttZW51SWR9XCIgY2xhc3M9XCJuYXZiYXItbmF2XCI+PC91bD5cbiAgICAgICAgPC9uYXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCIgcm9sZT1cInNlYXJjaFwiPlxuICAgICAgICAgIDxpbnB1dCBpZD1cImh1Yi1zZWFyY2gtYmFyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXJvdW5kZWRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiJHtzZWFyY2hUZXh0fVwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGljb24tc2VhcmNoXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgZGlzcGxheU1lc3NhZ2UoY29uZmlnKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vIFNldCB0aGUgYWN0aW9uXG4gICAgLy8gVE9ETyAtIHNob3VsZCBiZSB0cmFuc2xhdGFibGVcbiAgICBjb25maWcuYWN0aW9uID0gXCJSZWxvYWRcIjtcblxuICAgIHZhciBtZXNzYWdlVmlldyA9IG5ldyBNZXNzYWdlVmlldyhjb25maWcpO1xuICAgIHZhciBlbGVtZW50ID0gbWVzc2FnZVZpZXcuZ2V0RWxlbWVudCgpO1xuXG4gICAgbWVzc2FnZVZpZXcub24oJ2FjdGlvbi1jbGlja2VkJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5yb290RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgc2VsZi50cmlnZ2VyKCdyZWxvYWQnKTtcbiAgICB9KTtcblxuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VWaWV3LmdldEVsZW1lbnQoKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG1lbnUgaXRlbVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWQgRGV0ZXJtaW5lcyBpZiB0YWIgaXMgYWxyZWFkeSBzZWxlY3RlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIE5hbWUgb2YgZXZlbnQgdGhhdCB0YWIgd2lsbCBmaXJlIG9mZlxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGFkZE1lbnVJdGVtKHsgdGl0bGUsIGlkLCBzZWxlY3RlZCwgZXZlbnROYW1lIH0pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51aXRlbScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgaWQpO1xuICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gdGl0bGU7XG5cbiAgICAvLyBzZXRzIGlmIHRoaXMgbWVudWl0ZW0gc2hvdWxkIGJlIHNlbGVjdGVkXG4gICAgaWYoc2VsZWN0ZWQpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgIHRoaXMuZGlzcGxheVNlbGVjdGVkLmlubmVyVGV4dCA9IHRpdGxlO1xuICAgICAgdGhpcy50cmlnZ2VyKCdtZW51LXNlbGVjdGVkJywge1xuICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICBjaG9pY2U6IGV2ZW50TmFtZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlcignbWVudS1zZWxlY3RlZCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBjaG9pY2U6IGV2ZW50TmFtZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgdG8gbWVudSBiYXJcbiAgICB0aGlzLm1lbnViYXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBpbnB1dCBmaWVsZFxuICAgKi9cbiAgY2xlYXJJbnB1dEZpZWxkKCkge1xuICAgIHRoaXMuaW5wdXRGaWVsZC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBmaWx0ZXJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdGVkTmFtZVxuICAgKi9cbiAgc2V0RGlzcGxheVNlbGVjdGVkKHNlbGVjdGVkTmFtZSkge1xuICAgIHRoaXMuZGlzcGxheVNlbGVjdGVkLmlubmVyVGV4dCA9IHNlbGVjdGVkTmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGEgbWVudSBpdGVtIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2VsZWN0TWVudUl0ZW1CeUlkKGlkKSB7XG4gICAgY29uc3QgbWVudUl0ZW1zID0gdGhpcy5tZW51YmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKTtcbiAgICBjb25zdCBzZWxlY3RlZE1lbnVJdGVtID0gdGhpcy5tZW51YmFyLnF1ZXJ5U2VsZWN0b3IoYFtyb2xlPVwibWVudWl0ZW1cIl1bZGF0YS1pZD1cIiR7aWR9XCJdYCk7XG5cbiAgICBpZihzZWxlY3RlZE1lbnVJdGVtKSB7XG4gICAgICB1bnNlbGVjdEFsbChtZW51SXRlbXMpO1xuICAgICAgc2VsZWN0ZWRNZW51SXRlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoJ21lbnUtc2VsZWN0ZWQnLCB7XG4gICAgICAgIGVsZW1lbnQ6IHNlbGVjdGVkTWVudUl0ZW0sXG4gICAgICAgIGlkOiBzZWxlY3RlZE1lbnVJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpbml0TWVudSgpIHtcbiAgICAvLyBjcmVhdGUgdGhlIHVuZGVybGluZVxuICAgIGNvbnN0IHVuZGVybGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB1bmRlcmxpbmUuY2xhc3NOYW1lID0gJ21lbnVpdGVtLXVuZGVybGluZSc7XG4gICAgdGhpcy5tZW51YmFyLmFwcGVuZENoaWxkKHVuZGVybGluZSk7XG5cbiAgICAvLyBjYWxsIGluaXQgbWVudSBmcm9tIHNka1xuICAgIGluaXROYXZiYXIodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGV4dCBzdHlsZXMgYW5kIHRoZSBtZW51IHVuZGVybGluZVxuICAgKi9cbiAgYWRkRGVhY3RpdmF0ZWRTdHlsZVRvTWVudSgpIHtcbiAgICB0aGlzLm1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnZGVhY3RpdmF0ZWQnKTtcbiAgfVxuICAvKipcbiAgICogUmVzdG9yZXMgdGV4dCBzdHlsZXMgYW5kIHRoZSBtZW51IHVuZGVybGluZVxuICAgKi9cbiAgcmVtb3ZlRGVhY3RpdmF0ZWRTdHlsZUZyb21NZW51KCkge1xuICAgIHRoaXMubWVudS5jbGFzc0xpc3QuYWRkKFwiZGVhY3RpdmF0ZWRcIik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwiaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvblZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLXNlY3Rpb24tdmlld1wiO1xuaW1wb3J0IFNlYXJjaFNlcnZpY2UgZnJvbSBcIi4uL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlXCI7XG5pbXBvcnQgQ29udGVudFR5cGVMaXN0IGZyb20gJy4uL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0JztcbmltcG9ydCBDb250ZW50VHlwZURldGFpbCBmcm9tICcuLi9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBUYWIgc2VjdGlvbiBjb25zdGFudHNcbiAqL1xuY29uc3QgQ29udGVudFR5cGVTZWN0aW9uVGFicyA9IHtcbiAgQUxMOiB7XG4gICAgaWQ6ICdmaWx0ZXItYWxsJyxcbiAgICB0aXRsZTogJ0FsbCcsXG4gICAgZXZlbnROYW1lOiAnYWxsJ1xuICB9LFxuICBNWV9DT05URU5UX1RZUEVTOiB7XG4gICAgaWQ6ICdmaWx0ZXItbXktY29udGVudC10eXBlcycsXG4gICAgdGl0bGU6ICdNeSBDb250ZW50IFR5cGVzJyxcbiAgICBldmVudE5hbWU6ICdteS1jb250ZW50LXR5cGVzJyxcbiAgICBzZWxlY3RlZDogdHJ1ZVxuICB9LFxuICBNT1NUX1BPUFVMQVI6IHtcbiAgICBpZDogJ2ZpbHRlci1tb3N0LXBvcHVsYXInLFxuICAgIHRpdGxlOiAnTW9zdCBQb3B1bGFyJyxcbiAgICBldmVudE5hbWU6ICdtb3N0LXBvcHVsYXInXG4gIH1cbn07XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRUeXBlU2VjdGlvblxuICogQG1peGVzIEV2ZW50ZnVsXG4gKlxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKiBAcGFyYW0ge0h1YlNlcnZpY2VzfSBzZXJ2aWNlc1xuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUsIHNlcnZpY2VzKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb25WaWV3KHN0YXRlKTtcblxuICAgIC8vIGNvbnRyb2xsZXJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZShzZXJ2aWNlcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbCA9IG5ldyBDb250ZW50VHlwZURldGFpbCh7fSwgc2VydmljZXMpO1xuXG4gICAgLy8gRWxlbWVudCBmb3IgaG9sZGluZyBsaXN0IGFuZCBkZXRhaWxzIHZpZXdzXG4gICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY29udGVudC10eXBlLXNlY3Rpb24nKTtcblxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBzZWN0aW9uO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZUxpc3QuZ2V0RWxlbWVudCgpKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVEZXRhaWwuZ2V0RWxlbWVudCgpKTtcblxuICAgIHRoaXMudmlldy5nZXRFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5yb290RWxlbWVudCk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0J10sIHRoaXMuY29udGVudFR5cGVMaXN0KTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCddLCB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsKTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3JlbG9hZCddLCB0aGlzLnZpZXcpO1xuXG4gICAgLy8gcmVnaXN0ZXIgbGlzdGVuZXJzXG4gICAgdGhpcy52aWV3Lm9uKCdzZWFyY2gnLCB0aGlzLnNlYXJjaCwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdzZWFyY2gnLCB0aGlzLnZpZXcuc2VsZWN0TWVudUl0ZW1CeUlkLmJpbmQodGhpcy52aWV3LCBDb250ZW50VHlwZVNlY3Rpb25UYWJzLkFMTC5pZCkpO1xuICAgIC8vIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5yZXNldE1lbnVPbkVudGVyLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy5hcHBseVNlYXJjaEZpbHRlciwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy5jbGVhcklucHV0RmllbGQsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMudXBkYXRlRGlzcGxheVNlbGVjdGVkLCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5vbigncm93LXNlbGVjdGVkJywgdGhpcy5zaG93RGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignc2VsZWN0JywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xuXG4gICAgdGhpcy5pbml0Q29udGVudFR5cGVMaXN0KCk7XG5cbiAgICAvLyBhZGQgbWVudSBpdGVtc1xuICAgIGZvciAobGV0IHRhYiBpbiBDb250ZW50VHlwZVNlY3Rpb25UYWJzKSB7XG4gICAgICBpZiAoQ29udGVudFR5cGVTZWN0aW9uVGFicy5oYXNPd25Qcm9wZXJ0eSh0YWIpKSB7XG4gICAgICAgIHRoaXMudmlldy5hZGRNZW51SXRlbShDb250ZW50VHlwZVNlY3Rpb25UYWJzW3RhYl0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudmlldy5pbml0TWVudSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3Qgd2l0aCBhIHNlYXJjaFxuICAgKi9cbiAgaW5pdENvbnRlbnRUeXBlTGlzdCgpIHtcbiAgICAvLyBpbml0aWFsaXplIGJ5IHNlYXJjaFxuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goXCJcIilcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycm9yKSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGVycm9ycyBjb21tdW5pY2F0aW5nIHdpdGggSFVCXG4gICAqL1xuICBoYW5kbGVFcnJvcihlcnJvcikge1xuICAgIC8vIFRPRE8gLSB1c2UgdHJhbnNsYXRpb24gc3lzdGVtOlxuICAgIHRoaXMudmlldy5kaXNwbGF5TWVzc2FnZSh7XG4gICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgdGl0bGU6ICdOb3QgYWJsZSB0byBjb21tdW5pY2F0ZSB3aXRoIGh1Yi4nLFxuICAgICAgY29udGVudDogJ0Vycm9yIG9jY3VyZWQuIFBsZWFzZSB0cnkgYWdhaW4uJ1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGEgc2VhcmNoIGFuZCB1cGRhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcbiAgICovXG4gIHNlYXJjaCh7cXVlcnksIGtleUNvZGV9KSB7XG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChxdWVyeSlcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZGlzcGxheWVkIG5hbWUgb2YgdGhlIHNlbGVjdGVkIGZpbHRlciBmb3IgbW9iaWxlXG4gICAqXG4gICAqIEBwYXJhbSB7U2VsZWN0ZWRFbGVtZW50fSBldmVudFxuICAgKi9cbiAgdXBkYXRlRGlzcGxheVNlbGVjdGVkKGV2ZW50KSB7XG4gICAgdGhpcy52aWV3LnNldERpc3BsYXlTZWxlY3RlZChldmVudC5lbGVtZW50LmlubmVyVGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBzZWFyY2ggZmlsdGVyIGRlcGVuZGluZyBvbiB3aGF0IGV2ZW50IGl0IHJlY2VpdmVzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIEV2ZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlLmNob2ljZSBFdmVudCBuYW1lIG9mIGNob3NlbiB0YWJcbiAgICovXG4gIGFwcGx5U2VhcmNoRmlsdGVyKGUpIHtcbiAgICBzd2l0Y2goZS5jaG9pY2UpIHtcbiAgICAgIGNhc2UgQ29udGVudFR5cGVTZWN0aW9uVGFicy5BTEwuZXZlbnROYW1lOlxuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc29ydE9uKCdyZXN0cmljdGVkJylcbiAgICAgICAgICAudGhlbihjdHMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGN0cykpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBDb250ZW50VHlwZVNlY3Rpb25UYWJzLk1ZX0NPTlRFTlRfVFlQRVMuZXZlbnROYW1lOlxuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UuZmlsdGVyT3V0UmVzdHJpY3RlZCgpXG4gICAgICAgICAgLnRoZW4oY3RzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjdHMpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQ29udGVudFR5cGVTZWN0aW9uVGFicy5NT1NUX1BPUFVMQVIuZXZlbnROYW1lOlxuICAgICAgICBjb25zdCBzb3J0T3JkZXIgPSBbJ3Jlc3RyaWN0ZWQnLCAncG9wdWxhcml0eSddO1xuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2VcbiAgICAgICAgICAuc29ydE9uKHNvcnRPcmRlcilcbiAgICAgICAgICAudGhlbihjdHMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGN0cykpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGlucHV0IGZpZWxkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgY2xlYXJJbnB1dEZpZWxkKHtpZH0pIHtcbiAgICBpZiAoaWQgIT09IENvbnRlbnRUeXBlU2VjdGlvblRhYnMuQUxMLmlkKSB7XG4gICAgICB0aGlzLnZpZXcuY2xlYXJJbnB1dEZpZWxkKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIGRldGFpbCB2aWV3XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2hvd0RldGFpbFZpZXcoe2lkfSkge1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmxvYWRCeUlkKGlkKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLnNob3coKTtcbiAgICB0aGlzLnZpZXcudHlwZUFoZWFkRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudmlldy5yZW1vdmVEZWFjdGl2YXRlZFN0eWxlRnJvbU1lbnUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgY2xvc2VEZXRhaWxWaWV3KCkge1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LnNob3coKVxuICAgIHRoaXMudmlldy50eXBlQWhlYWRFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnZpZXcuYWRkRGVhY3RpdmF0ZWRTdHlsZVRvTWVudSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxuaW1wb3J0IGluaXRUYWJQYW5lbCBmcm9tIFwiY29tcG9uZW50cy90YWItcGFuZWxcIlxuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4vdXRpbHMvZXZlbnRzJztcbi8qKlxuICogVGFiIGNoYW5nZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjdGFiLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBQYW5lbCBvcGVuIG9yIGNsb3NlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyNwYW5lbC1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9EQVRBX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YlZpZXcjdGFiLWNoYW5nZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJWaWV3IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgdGhpcy5yZW5kZXJUYWJQYW5lbChzdGF0ZSk7XG4gICAgdGhpcy5yZW5kZXJQYW5lbChzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBwYW5lbFxuICAgKi9cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICogQHBhcmFtIHtib29sZWFufSBleHBhbmRlZFxuICAgKi9cbiAgcmVuZGVyUGFuZWwoe3RpdGxlID0gJycsIHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGl0bGUuY2xhc3NOYW1lICs9IFwicGFuZWwtaGVhZGVyIGljb24taHViLWljb25cIjtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWApO1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3BhbmVsLWNoYW5nZScsIHRoaXMsIHRoaXMudGl0bGUpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYm9keS5jbGFzc05hbWUgKz0gXCJwYW5lbC1ib2R5XCI7XG4gICAgdGhpcy5ib2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLmJvZHkuaWQgPSBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSBgcGFuZWwgaDVwLXNlY3Rpb24tJHtzZWN0aW9uSWR9YDtcbiAgICBpZihleHBhbmRlZCl7XG4gICAgICB0aGlzLnBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICB9XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuYm9keSk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSArPSBgaDVwLWh1YiBoNXAtc2RrYDtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuICAgIGluaXRQYW5lbCh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaWYgcGFuZWwgaXMgb3BlbiwgdGhpcyBpcyB1c2VkIGZvciBvdXRlciBib3JkZXIgY29sb3JcbiAgICovXG4gIHRvZ2dsZVBhbmVsT3BlbigpIHtcbiAgICBsZXQgcGFuZWwgPSB0aGlzLnBhbmVsO1xuICAgIGlmKGlzT3BlbihwYW5lbCkpIHtcbiAgICAgIHBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgnb3BlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtwYW5lbC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKS5mb2N1cygpfSwyMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHRhYiBwYW5lbFxuICAgKi9cbiAgcmVuZGVyVGFiUGFuZWwoc3RhdGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnRhYmxpc3QuY2xhc3NOYW1lICs9IFwidGFibGlzdFwiO1xuICAgIHRoaXMudGFibGlzdC5zZXRBdHRyaWJ1dGUgKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgdGhpcy50YWJMaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxpc3QpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5jbGFzc05hbWUgKz0gJ3RhYi1wYW5lbCc7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGFiTGlzdFdyYXBwZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0YWJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcbiAgICovXG4gIGFkZFRhYih7dGl0bGUsIGlkLCBjb250ZW50LCBzZWxlY3RlZCA9IGZhbHNlfSkge1xuICAgIGNvbnN0IHRhYklkID0gYHRhYi0ke2lkfWA7XG4gICAgY29uc3QgdGFiUGFuZWxJZCA9IGB0YWItcGFuZWwtJHtpZH1gO1xuXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0YWIuY2xhc3NOYW1lICs9ICd0YWInO1xuICAgIHRhYi5pZCA9IHRhYklkO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0YWJQYW5lbElkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQudG9TdHJpbmcoKSk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfREFUQV9JRCwgaWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XG4gICAgdGFiLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCd0YWItY2hhbmdlJywgdGhpcywgdGFiKTtcblxuICAgIGNvbnN0IHRhYlBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFiUGFuZWwuaWQgPSB0YWJQYW5lbElkO1xuICAgIHRhYlBhbmVsLmNsYXNzTmFtZSArPSAndGFicGFuZWwnO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJsbGVkYnknLCB0YWJJZCk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghc2VsZWN0ZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xuICAgIHRhYlBhbmVsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKHRhYik7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRhYlBhbmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGFuaW1hdGVkIGJvcmRlciB0byB0aGUgYm90dG9tIG9mIHRoZSB0YWJcbiAgICovXG4gIGFkZEJvdHRvbUJvcmRlcigpIHtcbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcbiAgfVxuXG4gIGluaXRUYWJQYW5lbCgpIHtcbiAgICBpbml0VGFiUGFuZWwodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0U2VjdGlvblR5cGUoe2lkfSkge1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lID0gYGg1cC1zZWN0aW9uLSR7aWR9IHBhbmVsYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwiaW1wb3J0IHtjdXJyeX0gZnJvbSAndXRpbHMvZnVuY3Rpb25hbCdcblxuLyoqXG4gKiBAY2xhc3NcbiAqIFRoZSBTZWFyY2ggU2VydmljZSBnZXRzIGEgY29udGVudCB0eXBlIGZyb20gaHViLXNlcnZpY2VzLmpzXG4gKiBpbiB0aGUgZm9ybSBvZiBhIHByb21pc2UuIEl0IHRoZW4gZ2VuZXJhdGVzIGEgc2NvcmUgYmFzZWRcbiAqIG9uIHRoZSBkaWZmZXJlbnQgd2VpZ2h0aW5ncyBvZiB0aGUgY29udGVudCB0eXBlIGZpZWxkcyBhbmRcbiAqIHNvcnRzIHRoZSByZXN1bHRzIGJhc2VkIG9uIHRoZSBnZW5lcmF0ZWQgc2NvcmUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTZXJ2aWNlc30gc2VydmljZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNlcnZpY2VzKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IHNlcnZpY2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgc2VhcmNoXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW10+fSBBIHByb21pc2Ugb2YgYW4gYXJyYXkgb2YgY29udGVudCB0eXBlc1xuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5KSB7XG4gICAgLy8gQWRkIGNvbnRlbnQgdHlwZXMgdG8gdGhlIHNlYXJjaCBpbmRleFxuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlcygpLnRoZW4oZmlsdGVyQnlRdWVyeShxdWVyeSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlciBhbGwgY29udGVudCB0eXBlcyBieSBnaXZlbiBwcm9wZXJ0eVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0gc29ydE9yZGVyIE9uZSBvciBtb3JlIHByb3BlcnRpZXNcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT58Kn1cbiAgICovXG4gIHNvcnRPbihzb3J0T3JkZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZXMoKVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IG11bHRpU29ydChjb250ZW50VHlwZXMsIHNvcnRPcmRlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlciBvdXQgcmVzdHJpY3RlZCBpZiBpdCBpcyBkZWZpbmVkIGFuZCBmYWxzZVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZVtdPn1cbiAgICovXG4gIGZpbHRlck91dFJlc3RyaWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKClcbiAgICAgIC50aGVuKGN0cyA9PiBjdHMuZmlsdGVyKGN0ID0+ICFjdC5yZXN0cmljdGVkKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTb3J0IG9uIG11bHRpcGxlIHByb3BlcnRpZXNcbiAqXG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlcyBDb250ZW50IHR5cGVzIHRoYXQgc2hvdWxkIGJlIHNvcnRlZFxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHNvcnRPcmRlciBPcmRlciB0aGF0IHNvcnQgcHJvcGVydGllcyBzaG91bGQgYmUgYXBwbGllZFxuICpcbiAqIEByZXR1cm4ge0FycmF5LjxDb250ZW50VHlwZT59IENvbnRlbnQgdHlwZXMgc29ydGVkXG4gKi9cbmNvbnN0IG11bHRpU29ydCA9IChjb250ZW50VHlwZXMsIHNvcnRPcmRlcikgPT4ge1xuICBzb3J0T3JkZXIgPSBBcnJheS5pc0FycmF5KHNvcnRPcmRlcikgPyBzb3J0T3JkZXIgOiBbc29ydE9yZGVyXTtcbiAgcmV0dXJuIGNvbnRlbnRUeXBlcy5zb3J0KChjdDEsIGN0MikgPT4ge1xuICAgIHJldHVybiBoYW5kbGVTb3J0VHlwZShjdDEsIGN0Miwgc29ydE9yZGVyKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIENvbXBhcmVzIHR3byBjb250ZW50IHR5cGVzIGFuZCByZXR1cm5zIGEgc29ydGFibGUgdmFsdWUgZm9yIHRoZW1cbiAqXG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjdDFcbiAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGN0MlxuICogQHBhcmFtIHtzdHJpbmdbXX0gc29ydE9yZGVyIE9yZGVyIHRoYXQgc29ydCBwcm9wZXJ0aWVzIHNob3VsZCBiZSBhcHBsaWVkIGluXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBBIG51bWJlciBpbmRpY2F0aW5nIGhvdyB0byBzb3J0IHRoZSB0d28gY29udGVudCB0eXBlc1xuICovXG5jb25zdCBoYW5kbGVTb3J0VHlwZSA9IChjdDEsIGN0Miwgc29ydE9yZGVyKSA9PiB7XG4gIHN3aXRjaCAoc29ydE9yZGVyWzBdKSB7XG4gICAgY2FzZSAncmVzdHJpY3RlZCc6XG4gICAgICByZXR1cm4gc29ydE9uUmVzdHJpY3RlZChjdDEsIGN0Miwgc29ydE9yZGVyLnNsaWNlKDEpKTtcbiAgICBjYXNlICdwb3B1bGFyaXR5JzpcbiAgICAgIHJldHVybiBzb3J0T25Qcm9wZXJ0eShjdDEsIGN0Miwgc29ydE9yZGVyWzBdLCBzb3J0T3JkZXIuc2xpY2UoMSkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc29ydFNlYXJjaFJlc3VsdHMoY3QxLCBjdDIpO1xuICB9XG59O1xuXG4vKipcbiAqIFNvcnQgcmVzdHJpY3RlZCBjb250ZW50IHR5cGVzLiBSZXN0cmljdGVkIGNvbnRlbnQgdHlwZXMgd2lsbCBiZSBtb3ZlZCB0byB0aGUgYm90dG9tIG9mIHRoZVxuICogbGlzdC4gQ29udGVudCB0eXBlcyB3aXRoIHVuZGVmaW5lZCByZXN0cmljdGVkIHByb3BlcnR5IGFyZSBjb25zaWRlciBub3QgcmVzdHJpY3RlZC5cbiAqXG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjdDFcbiAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGN0MlxuICogQHBhcmFtIHtzdHJpbmdbXX0gc29ydE9yZGVyIE9yZGVyIHRvIGFwcGx5IHNvcnQgcHJvcGVydGllc1xuICpcbiAqIEByZXR1cm4ge251bWJlcn0gQSBzdGFuZGFyZCBjb21wYXJhYmxlIHZhbHVlIGZvciB0aGUgdHdvIGNvbnRlbnQgdHlwZXNcbiAqL1xuY29uc3Qgc29ydE9uUmVzdHJpY3RlZCA9IChjdDEsIGN0Miwgc29ydE9yZGVyKSA9PiB7XG4gIGlmICghY3QxLnJlc3RyaWN0ZWQgPT09ICFjdDIucmVzdHJpY3RlZCkge1xuICAgIGlmIChzb3J0T3JkZXIpIHtcbiAgICAgIHJldHVybiBoYW5kbGVTb3J0VHlwZShjdDEsIGN0Miwgc29ydE9yZGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoY3QxLnJlc3RyaWN0ZWQpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICBlbHNlIGlmIChjdDIucmVzdHJpY3RlZCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxufTtcblxuLyoqXG4gKiBTb3J0IG9uIGEgcHJvcGVydHkuIEFueSB2YWxpZCBwcm9wZXJ0eSBjYW4gYmUgYXBwbGllZC4gSWYgdGhlIGNvbnRlbnQgdHlwZSBkb2VzIG5vdCBoYXZlIHRoZVxuICogc3VwcGxpZWQgcHJvcGVydHkgaXQgd2lsbCBnZXQgbW92ZWQgdG8gdGhlIGJvdHRvbS5cbiAqXG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjdDFcbiAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGN0MlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IHRoYXQgdGhlIGNvbnRlbnQgdHlwZXMgd2lsbCBiZSBzb3J0ZWQgb24sIGVpdGhlclxuICogbnVtZXJpY2FsbHkgb3IgbGV4aWNhbGx5XG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzb3J0T3JkZXIgUmVtYWluaW5nIHNvcnQgb3JkZXIgdG8gYXBwbHkgaWYgdHdvIGNvbnRlbnQgdHlwZXMgaGF2ZSB0aGUgc2FtZVxuICogdmFsdWVcbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgdmFsdWUgaW5kaWNhdGluZyB0aGUgY29tcGFyaXNvbiBiZXR3ZWVuIHRoZSB0d28gY29udGVudCB0eXBlc1xuICovXG5jb25zdCBzb3J0T25Qcm9wZXJ0eSA9IChjdDEsIGN0MiwgcHJvcGVydHksIHNvcnRPcmRlcikgPT4ge1xuICAvLyBQcm9wZXJ0eSBkb2VzIG5vdCBleGlzdCwgbW92ZSB0byBib3R0b21cbiAgaWYgKCFjdDEuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgaWYgKCFjdDIuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgLy8gU29ydCBvbiBwcm9wZXJ0eVxuICBpZiAoY3QxW3Byb3BlcnR5XSA+IGN0Mltwcm9wZXJ0eV0pIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICBlbHNlIGlmIChjdDFbcHJvcGVydHldIDwgY3QyW3Byb3BlcnR5XSkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoc29ydE9yZGVyKSB7XG4gICAgICByZXR1cm4gaGFuZGxlU29ydFR5cGUoY3QxLCBjdDIsIHNvcnRPcmRlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEZpbHRlcnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXMgYmFzZWQgb24gYSBxdWVyeVxuICogQHR5cGUge0Z1bmN0aW9ufVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcbiAqL1xuY29uc3QgZmlsdGVyQnlRdWVyeSA9IGN1cnJ5KGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZXMpIHtcbiAgaWYgKHF1ZXJ5ID09ICcnKSB7XG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlcztcbiAgfVxuXG4gIC8vIEFwcGVuZCBhIHNlYXJjaCBzY29yZSB0byBlYWNoIGNvbnRlbnQgdHlwZVxuICBjb25zdCBmaWx0ZXJlZCA9IGNvbnRlbnRUeXBlcy5tYXAoY29udGVudFR5cGUgPT4ge1xuICAgIGNvbnRlbnRUeXBlLnNjb3JlID0gZ2V0U2VhcmNoU2NvcmUocXVlcnksIGNvbnRlbnRUeXBlKTtcbiAgICByZXR1cm4gY29udGVudFR5cGU7XG4gIH0pLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0LnNjb3JlID4gMCk7XG5cbiAgcmV0dXJuIG11bHRpU29ydChmaWx0ZXJlZCwgWydyZXN0cmljdGVkJywgJ2RlZmF1bHQnXSk7XG59KTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgQXJyYXkuc29ydCgpXG4gKiBDb21wYXJlcyB0d28gY29udGVudCB0eXBlcyBvbiBkaWZmZXJlbnQgY3JpdGVyaWFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBGaXJzdCBjb250ZW50IHR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFNlY29uZCBjb250ZW50IHR5cGVcbiAqIEByZXR1cm4ge2ludH1cbiAqL1xuY29uc3Qgc29ydFNlYXJjaFJlc3VsdHMgPSAoYSxiKSA9PiB7XG4gIGlmICghYS5pbnN0YWxsZWQgJiYgYi5pbnN0YWxsZWQpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmIChhLmluc3RhbGxlZCAmJiAhYi5pbnN0YWxsZWQpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBlbHNlIGlmIChiLnNjb3JlICE9PSBhLnNjb3JlKSB7XG4gICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlO1xuICB9XG5cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGIucG9wdWxhcml0eSAtIGEucG9wdWxhcml0eTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHdlaWdodGluZyBmb3IgZGlmZmVyZW50IHNlYXJjaCB0ZXJtcyBiYXNlZFxuICogb24gZXhpc3RlbmNlIG9mIHN1YnN0cmluZ3NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRlbnRUeXBlXG4gKiBAcmV0dXJuIHtpbnR9XG4gKi9cbiBjb25zdCBnZXRTZWFyY2hTY29yZSA9IGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZSkge1xuICAgbGV0IHF1ZXJpZXMgPSBxdWVyeS5zcGxpdCgnICcpLmZpbHRlcihxdWVyeSA9PiBxdWVyeSAhPT0gJycpO1xuICAgbGV0IHF1ZXJ5U2NvcmVzID0gcXVlcmllcy5tYXAocXVlcnkgPT4gZ2V0U2NvcmVGb3JFYWNoUXVlcnkocXVlcnksIGNvbnRlbnRUeXBlKSk7XG4gICBpZiAocXVlcnlTY29yZXMuaW5kZXhPZigwKSA+IC0xKSB7XG4gICAgIHJldHVybiAwO1xuICAgfVxuICAgcmV0dXJuIHF1ZXJ5U2NvcmVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuIH07XG5cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByZWxldmFuY2Ugc2NvcmUgZm9yIGEgc2luZ2xlIHN0cmluZ1xuICpcbiAqIEBwYXJhbSAge3R5cGV9IHF1ZXJ5ICAgICAgIGRlc2NyaXB0aW9uXG4gKiBAcGFyYW0gIHt0eXBlfSBjb250ZW50VHlwZSBkZXNjcmlwdGlvblxuICogQHJldHVybiB7dHlwZX0gICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAqL1xuY29uc3QgZ2V0U2NvcmVGb3JFYWNoUXVlcnkgPSBmdW5jdGlvbiAocXVlcnksIGNvbnRlbnRUeXBlKSB7XG4gICBxdWVyeSA9IHF1ZXJ5LnRyaW0oKTtcbiAgIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLnRpdGxlKSkge1xuICAgICByZXR1cm4gMTAwO1xuICAgfVxuICAgZWxzZSBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5zdW1tYXJ5KSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuZGVzY3JpcHRpb24pKSB7XG4gICAgIHJldHVybiA1O1xuICAgfVxuICAgZWxzZSBpZiAoYXJyYXlIYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmtleXdvcmRzKSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUubWFjaGluZU5hbWUpKSB7XG4gICAgIHJldHVybiAxO1xuICAgfVxuICAgZWxzZSB7XG4gICAgIHJldHVybiAwO1xuICAgfVxufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBuZWVkbGUgaXMgZm91bmQgaW4gdGhlIGhheXN0YWNrLlxuICogTm90IGNhc2Ugc2Vuc2l0aXZlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5lZWRsZVxuICogQHBhcmFtIHtzdHJpbmd9IGhheXN0YWNrXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdWJTdHJpbmcgPSBmdW5jdGlvbihuZWVkbGUsIGhheXN0YWNrKSB7XG4gIGlmIChoYXlzdGFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGhheXN0YWNrLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24sIGNoZWNrcyBpZiBhcnJheSBoYXMgY29udGFpbnMgYSBzdWJzdHJpbmdcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN1YlN0cmluZ1xuICogQHBhcmFtICB7QXJyYXl9IGFyclxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgYXJyYXlIYXNTdWJTdHJpbmcgPSBmdW5jdGlvbihzdWJTdHJpbmcsIGFycikge1xuICBpZiAoYXJyID09PSB1bmRlZmluZWQgfHwgc3ViU3RyaW5nID09PSAnJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBhcnIuc29tZShzdHJpbmcgPT4gaGFzU3ViU3RyaW5nKHN1YlN0cmluZywgc3RyaW5nKSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJpbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgRGljdGlvbmFyeSBmcm9tICcuLi91dGlscy9kaWN0aW9uYXJ5JztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICpcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xuXG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBzZXJ2aWNlcykge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcblxuICAgIC8vIElucHV0IGVsZW1lbnQgZm9yIHRoZSBINVAgZmlsZVxuICAgIGNvbnN0IGg1cFVwbG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaDVwVXBsb2FkLnNldEF0dHJpYnV0ZSgndHlwZScsICdmaWxlJyk7XG5cbiAgICAvLyBTZW5kcyB0aGUgSDVQIGZpbGUgdG8gdGhlIHBsdWdpblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHVzZUJ1dHRvbi50ZXh0Q29udGVudCA9IERpY3Rpb25hcnkuZ2V0KCd1c2VCdXR0b25MYWJlbCcpO1xuICAgIHVzZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgLy8gQWRkIHRoZSBINVAgZmlsZSB0byBhIGZvcm0sIHJlYWR5IGZvciB0cmFuc3BvcnRhdGlvblxuICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZGF0YS5hcHBlbmQoJ2g1cCcsIGg1cFVwbG9hZC5maWxlc1swXSk7XG5cbiAgICAgIC8vIFVwbG9hZCBjb250ZW50IHRvIHRoZSBwbHVnaW5cbiAgICAgIHRoaXMuc2VydmljZXMudXBsb2FkQ29udGVudChkYXRhKVxuICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAvLyBGaXJlIHRoZSByZWNlaXZlZCBkYXRhIHRvIGFueSBsaXN0ZW5lcnNcbiAgICAgICAgICBzZWxmLnRyaWdnZXIoJ3VwbG9hZCcsIGpzb24pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGg1cFVwbG9hZCk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh1c2VCdXR0b24pO1xuXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUgfSBmcm9tICd1dGlscy9lbGVtZW50cyc7XG5pbXBvcnQgeyBmb3JFYWNoLCB3aXRob3V0IH0gZnJvbSAndXRpbHMvZnVuY3Rpb25hbCc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBDb250cm9scyBFdmVudFxuICogQHR5cGVkZWYge09iamVjdH0gQ29udHJvbHNFdmVudFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBvbGRFbGVtZW50XG4gKi9cbi8qKlxuICogQWRkIGVsZW1lbnQgZXZlbnRcbiAqIEBldmVudCBDb250cm9scyNhZGRFbGVtZW50XG4gKiBAdHlwZSBDb250cm9sc0V2ZW50XG4gKi9cbi8qKlxuICogUmVtb3ZlIGVsZW1lbnQgZXZlbnRcbiAqIEBldmVudCBDb250cm9scyNyZW1vdmVFbGVtZW50XG4gKiBAdHlwZSBDb250cm9sc0V2ZW50XG4gKi9cbi8qKlxuICogUHJldmlvdXMgZWxlbWVudCBldmVudFxuICogQGV2ZW50IENvbnRyb2xzI3ByZXZpb3VzRWxlbWVudFxuICogQHR5cGUgQ29udHJvbHNFdmVudFxuICovXG4vKipcbiAqIE5leHQgZWxlbWVudCBldmVudFxuICogQGV2ZW50IENvbnRyb2xzI25leHRFbGVtZW50XG4gKiBAdHlwZSBDb250cm9sc0V2ZW50XG4gKi9cbi8qKlxuICogU2VsZWN0IG9wdGlvbiBldmVudFxuICogQGV2ZW50IENvbnRyb2xzI3NlbGVjdFxuICogQHR5cGUgQ29udHJvbHNFdmVudFxuICovXG4vKipcbiAqIERyYWcgZWxlbWVudCBldmVudFxuICogQGV2ZW50IENvbnRyb2xzI2RyYWdcbiAqIEB0eXBlIENvbnRyb2xzRXZlbnRcbiAqL1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn0gcmVtb3ZlVGFiSW5kZXhcbiAqL1xuY29uc3QgcmVtb3ZlVGFiSW5kZXggPSByZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn0gcmVtb3ZlVGFiSW5kZXhGb3JBbGxcbiAqL1xuY29uc3QgcmVtb3ZlVGFiSW5kZXhGb3JBbGwgPSBmb3JFYWNoKHJlbW92ZVRhYkluZGV4KTtcbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufSBzZXRUYWJJbmRleFplcm9cbiAqL1xuY29uc3Qgc2V0VGFiSW5kZXhaZXJvID0gc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn0gaGFzVGFiSW5kZXhcbiAqL1xuY29uc3QgaGFzVGFiSW5kZXggPSBoYXNBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbHMge1xuICBjb25zdHJ1Y3RvcihwbHVnaW5zKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvKipcbiAgICAgKkBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IHRhYmJhYmxlRWxlbWVudFxuICAgICAqL1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHBsdWdpbnNcbiAgICAgKi9cbiAgICB0aGlzLnBsdWdpbnMgPSBwbHVnaW5zIHx8IFtdO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtIVE1MRWxlbWVudFtdfSBlbGVtZW50c1xuICAgICAqL1xuICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcblxuICAgIC8vIG1vdmUgdGFiaW5kZXggdG8gbmV4dCBlbGVtZW50XG4gICAgdGhpcy5vbignbmV4dEVsZW1lbnQnLCB0aGlzLm5leHRFbGVtZW50LCB0aGlzKTtcblxuICAgIC8vIG1vdmUgdGFiaW5kZXggdG8gcHJldmlvdXMgZWxlbWVudFxuICAgIHRoaXMub24oJ3ByZXZpb3VzRWxlbWVudCcsIHRoaXMucHJldmlvdXNFbGVtZW50LCB0aGlzKTtcblxuICAgIC8vIGluaXQgcGx1Z2luc1xuICAgIHRoaXMuaW5pdFBsdWdpbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY29udHJvbHMgdG8gYW4gZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICAgKlxuICAgKiBAZmlyZXMgQ29udHJvbHMjYWRkRWxlbWVudFxuICAgKiBAcHVibGljXG4gICAqL1xuICBhZGRFbGVtZW50KGVsKcKge1xuICAgIHRoaXMuZWxlbWVudHMucHVzaChlbCk7XG5cbiAgICB0aGlzLmZpcmVzRXZlbnQoJ2FkZEVsZW1lbnQnLCBlbCk7XG5cbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDEpIHsgLy8gaWYgZmlyc3RcbiAgICAgIHRoaXMuc2V0VGFiYmFibGUoZWwpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQWRkIGNvbnRyb2xzIHRvIGFuIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICpcbiAgICogQGZpcmVzIENvbnRyb2xzI2FkZEVsZW1lbnRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcmVtb3ZlRWxlbWVudChlbCnCoHtcbiAgICB0aGlzLmVsZW1lbnRzID0gd2l0aG91dChbZWxdLCB0aGlzLmVsZW1lbnRzKTtcblxuICAgIC8vIGlmIHJlbW92ZWQgZWxlbWVudCB3YXMgc2VsZWN0ZWRcbiAgICBpZihoYXNUYWJJbmRleChlbCkpIHtcbiAgICAgIHJlbW92ZVRhYkluZGV4KGVsKTtcblxuICAgICAgLy8gc2V0IGZpcnN0IGVsZW1lbnQgc2VsZWN0ZWQgaWYgZXhpc3RzXG4gICAgICBpZih0aGlzLmVsZW1lbnRzWzBdKSB7XG4gICAgICAgIHRoaXMuc2V0VGFiYmFibGUodGhpcy5lbGVtZW50c1swXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5maXJlc0V2ZW50KCdyZW1vdmVFbGVtZW50JywgZWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8RXZlbnRUYXJnZXR9IGVsXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGZpcmVzRXZlbnQodHlwZSwgZWwpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZWxlbWVudHMuaW5kZXhPZihlbCk7XG5cbiAgICB0aGlzLmZpcmUodHlwZSwge1xuICAgICAgZWxlbWVudDogZWwsXG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICBlbGVtZW50czogdGhpcy5lbGVtZW50cyxcbiAgICAgIG9sZEVsZW1lbnQ6IHRoaXMudGFiYmFibGVFbGVtZW50XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0YWJpbmRleCBvbiBhbiBlbGVtZW50LCByZW1vdmUgaXQgZnJvbSBhbGwgb3RoZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbmV4dEVsZW1lbnQoe2luZGV4fSkge1xuICAgIGNvbnN0IGlzTGFzdEVsZW1lbnQgPSBpbmRleCA9PT0gKHRoaXMuZWxlbWVudHMubGVuZ3RoIC0gMSk7XG4gICAgY29uc3QgbmV4dEVsID0gdGhpcy5lbGVtZW50c1tpc0xhc3RFbGVtZW50ID8gMCA6IChpbmRleCArIDEpXTtcblxuICAgIHRoaXMuc2V0VGFiYmFibGUobmV4dEVsKTtcbiAgICBuZXh0RWwuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRhYmluZGV4IG9uIGFuIGVsZW1lbnQsIHJlbW92ZSBpdCBmcm9tIGFsbCBvdGhlcnNcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2V0VGFiYmFibGUoZWwpIHtcbiAgICByZW1vdmVUYWJJbmRleEZvckFsbCh0aGlzLmVsZW1lbnRzKTtcbiAgICBzZXRUYWJJbmRleFplcm8oZWwpO1xuICAgIHRoaXMudGFiYmFibGVFbGVtZW50ID0gZWw7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0YWJpbmRleCBvbiBhbiBlbGVtZW50LCByZW1vdmUgaXQgZnJvbSBhbGwgb3RoZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJldmlvdXNFbGVtZW50KHtpbmRleH0pIHtcbiAgICBjb25zdCBpc0ZpcnN0RWxlbWVudCA9IGluZGV4ID09PSAwO1xuICAgIGNvbnN0IHByZXZFbCA9IHRoaXMuZWxlbWVudHNbaXNGaXJzdEVsZW1lbnQgPyAodGhpcy5lbGVtZW50cy5sZW5ndGggLSAxKSA6IChpbmRleCAtIDEpXTtcblxuICAgIHRoaXMuc2V0VGFiYmFibGUocHJldkVsKTtcbiAgICBwcmV2RWwuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGx1Z2luc1xuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaW5pdFBsdWdpbnMoKcKge1xuICAgIHRoaXMucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uKHBsdWdpbil7XG4gICAgICBpZihwbHVnaW4uaW5pdCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgcGx1Z2luLmluaXQodGhpcyk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay11aS9zcmMvc2NyaXB0cy9jb250cm9scy5qcyIsIi8qKlxuICogQG1peGluXG4gKi9cbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnRmdWx9XG4gICAqL1xuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNjb3BlXG4gICAgICovXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcbiAgICAgICdsaXN0ZW5lcic6IGxpc3RlbmVyLFxuICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAgICovXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUodHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrLXVpL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsIi8qKlxuICogQGNsYXNzXG4gKiBAY2xhc3NkZXNjIEtleWJvYXJkIG5hdmlnYXRpb24gZm9yIGFjY2Vzc2liaWxpdHkgc3VwcG9ydFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2VsZWN0YWJpbGl0eVxuICAgICAqL1xuICAgIHRoaXMuc2VsZWN0YWJpbGl0eSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSW5pdHMgdGhpcyBjbGFzc1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRyb2xzfSBjb250cm9sc1xuICAgKi9cbiAgaW5pdChjb250cm9scynCoHtcbiAgICAvKipcbiAgICAgKiBOZWVkIHRvIGhhdmUgYSBjb21tb24gYmluZGluZyBvZiBoYW5kbGVLZXlEb3duLCBzbyB0aGF0IGl0IGNhbiBiZSBhXG4gICAgICogY29tbW9uIGluc3RhbmNlIHRvIGJlIHVzZWQgZm9yIGFkZEV2ZW50TGlzdGVuZXIgYW5kIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAgICovXG4gICAgdGhpcy5ib3VuZEhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDb250cm9sc31cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRyb2xzID0gY29udHJvbHM7XG4gICAgdGhpcy5jb250cm9scy5vbignYWRkRWxlbWVudCcsIHRoaXMubGlzdGVuRm9yS2V5RG93biwgdGhpcyk7XG4gICAgdGhpcy5jb250cm9scy5vbigncmVtb3ZlRWxlbWVudCcsIHRoaXMucmVtb3ZlS2V5RG93bkxpc3RlbmVyLCB0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgYSBrZXlib2FyZCBwcmVzcyB3aGVuIGVsZW1lbnQgaXMgZm9jdXNlZFxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBsaXN0ZW5Gb3JLZXlEb3duKHtlbGVtZW50fSkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRIYW5kbGVLZXlEb3duKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGEga2V5Ym9hcmQgcHJlc3MgbGlzdGVuZXJcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVtb3ZlS2V5RG93bkxpc3RlbmVyKHtlbGVtZW50fSkge1xuICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRIYW5kbGVLZXlEb3duKTtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyBrZXkgZG93blxuICAgKlxuICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEtleWJvYXJkIGV2ZW50XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgY2FzZSAxMzogLy8gRW50ZXJcbiAgICAgIGNhc2UgMzI6IC8vIFNwYWNlXG4gICAgICAgIHRoaXMuc2VsZWN0KGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM3OiAvLyBMZWZ0IEFycm93XG4gICAgICBjYXNlIDM4OiAvLyBVcCBBcnJvd1xuICAgICAgICB0aGlzLnByZXZpb3VzRWxlbWVudChldmVudC50YXJnZXQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vIFJpZ2h0IEFycm93XG4gICAgICBjYXNlIDQwOiAvLyBEb3duIEFycm93XG4gICAgICAgIHRoaXMubmV4dEVsZW1lbnQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlcyB0aGUgcHJldmlvdXMgZWxlbWVudCBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEV2ZW50VGFyZ2V0fSBlbFxuICAgKiBAZmlyZXMgQ29udHJvbHMjcHJldmlvdXNFbGVtZW50XG4gICAqL1xuICBwcmV2aW91c0VsZW1lbnQoZWwpIHtcbiAgICB0aGlzLmNvbnRyb2xzLmZpcmVzRXZlbnQoJ3ByZXZpb3VzRWxlbWVudCcsIGVsKVxuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlIHRoZSBuZXh0IGVsZW1lbnQgZXZlbnRcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxFdmVudFRhcmdldH0gZWxcbiAgICogQGZpcmVzIENvbnRyb2xzI25leHRFbGVtZW50XG4gICAqL1xuICBuZXh0RWxlbWVudChlbCkge1xuICAgIHRoaXMuY29udHJvbHMuZmlyZXNFdmVudCgnbmV4dEVsZW1lbnQnLCBlbClcbiAgfTtcblxuICAvKipcbiAgICogRmlyZXMgdGhlIHNlbGVjdCBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEhUTUxFbGVtZW50fSBlbFxuICAgKiBAZmlyZXMgQ29udHJvbHMjc2VsZWN0XG4gICAqL1xuICBzZWxlY3QoZWwpe1xuICAgIGlmKHRoaXMuc2VsZWN0YWJpbGl0eSkge1xuICAgICAgaWYodGhpcy5jb250cm9scy5maXJlc0V2ZW50KCdiZWZvcmUtc2VsZWN0JywgZWwpICE9PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNvbnRyb2xzLmZpcmVzRXZlbnQoJ3NlbGVjdCcsIGVsKTtcbiAgICAgICAgdGhpcy5jb250cm9scy5maXJlc0V2ZW50KCdhZnRlci1zZWxlY3QnLCBlbClcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2FibGUgcG9zc2liaWxpdHkgdG8gc2VsZWN0IGEgd29yZCB0cm91Z2ggY2xpY2sgYW5kIHNwYWNlIG9yIGVudGVyXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGRpc2FibGVTZWxlY3RhYmlsaXR5KCkge1xuICAgIHRoaXMuc2VsZWN0YWJpbGl0eSA9IGZhbHNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbmFibGUgcG9zc2liaWxpdHkgdG8gc2VsZWN0IGEgd29yZCB0cm91Z2ggY2xpY2sgYW5kIHNwYWNlIG9yIGVudGVyXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGVuYWJsZVNlbGVjdGFiaWxpdHkoKSB7XG4gICAgdGhpcy5zZWxlY3RhYmlsaXR5ID0gdHJ1ZTtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrLXVpL3NyYy9zY3JpcHRzL3VpL2tleWJvYXJkLmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSwgY2xhc3NMaXN0Q29udGFpbnMsIHF1ZXJ5U2VsZWN0b3IsIG5vZGVMaXN0VG9BcnJheSB9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICovXG5jb25zdCBBVFRSSUJVVEVfU0laRSA9ICdkYXRhLXNpemUnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgZGlzYWJsZSA9IHNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBlbmFibGUgPSByZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBlbmFibGVkXG4gKi9cbmNvbnN0IHRvZ2dsZUVuYWJsZWQgPSAoZWxlbWVudCwgZW5hYmxlZCkgPT4gKGVuYWJsZWQgPyBlbmFibGUgOiBkaXNhYmxlKShlbGVtZW50KTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGhpZGRlblxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gY3VycnkoKGhpZGRlbiwgZWxlbWVudCkgPT4gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGhpZGRlbi50b1N0cmluZygpLCBlbGVtZW50KSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBpc0Rpc2FibGVkID0gaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgdmlld1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICovXG5jb25zdCB1cGRhdGVWaWV3ID0gKGVsZW1lbnQsIHN0YXRlKSA9PiB7XG4gIGNvbnN0IHByZXZCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2aW91cycpO1xuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICBjb25zdCBsaXN0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICBjb25zdCB0b3RhbENvdW50ID0gbGlzdC5jaGlsZEVsZW1lbnRDb3VudDtcblxuICAvLyB1cGRhdGUgbGlzdCBzaXplc1xuICBsaXN0LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gc3RhdGUuZGlzcGxheUNvdW50ICogdG90YWxDb3VudH0lYDtcbiAgbGlzdC5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7c3RhdGUucG9zaXRpb24gKiAoMTAwIC8gc3RhdGUuZGlzcGxheUNvdW50KX0lYDtcblxuICAvLyB1cGRhdGUgaW1hZ2Ugc2l6ZXNcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXG4gICAgLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gdG90YWxDb3VudH0lYCk7XG5cbiAgLy8gdG9nZ2xlIGJ1dHRvbiB2aXNpYmlsaXR5XG4gIFtwcmV2QnV0dG9uLCBuZXh0QnV0dG9uXVxuICAgIC5mb3JFYWNoKHRvZ2dsZVZpc2liaWxpdHkoc3RhdGUuZGlzcGxheUNvdW50ID49IHRvdGFsQ291bnQpKTtcblxuICAvLyB0b2dnbGUgYnV0dG9uIGVuYWJsZSwgZGlzYWJsZWRcbiAgdG9nZ2xlRW5hYmxlZChuZXh0QnV0dG9uLCBzdGF0ZS5wb3NpdGlvbiA+IChzdGF0ZS5kaXNwbGF5Q291bnQgLSB0b3RhbENvdW50KSk7XG4gIHRvZ2dsZUVuYWJsZWQocHJldkJ1dHRvbiwgc3RhdGUucG9zaXRpb24gPCAwKTtcbn07XG5cbi8qKlxuICogSGFuZGxlcyBidXR0b24gY2xpY2tlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYnV0dG9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB1cGRhdGVTdGF0ZVxuICpcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBvbk5hdmlnYXRpb25CdXR0b25DbGljayA9IChlbGVtZW50LCBzdGF0ZSwgYnV0dG9uLCB1cGRhdGVTdGF0ZSkgPT4ge1xuICBpZighaXNEaXNhYmxlZChidXR0b24pKXtcbiAgICB1cGRhdGVTdGF0ZShzdGF0ZSk7XG4gICAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG4gIH1cbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gaW1hZ2VcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpbWFnZVxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGluaXRJbWFnZSA9IGN1cnJ5KChlbGVtZW50LCBpbWFnZSkgPT4ge1xuICBsZXQgdGFyZ2V0SWQgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgbGV0IHRhcmdldCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFyZ2V0SWR9YCk7XG5cbiAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcbiAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpKVxufSk7XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHdoZW4gdGhlIGRvbSBpcyB1cGRhdGVkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSByZWNvcmRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoYW5kbGVEb21VcGRhdGUgPSBjdXJyeSgoZWxlbWVudCwgc3RhdGUsIHJlY29yZCkgPT4ge1xuICAvLyBvbiBhZGQgaW1hZ2UgcnVuIGluaXRpYWxpemF0aW9uXG4gIGlmKHJlY29yZC50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgIG5vZGVMaXN0VG9BcnJheShyZWNvcmQuYWRkZWROb2RlcylcbiAgICAgIC5maWx0ZXIoY2xhc3NMaXN0Q29udGFpbnMoJ3NsaWRlJykpXG4gICAgICAubWFwKHF1ZXJ5U2VsZWN0b3IoJ2ltZycpKVxuICAgICAgLmZvckVhY2goaW5pdEltYWdlKGVsZW1lbnQpKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgdmlld1xuICB1cGRhdGVWaWV3KGVsZW1lbnQsIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxuICAgIHBvc2l0aW9uOiAwXG4gIH0pKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIC8vIGdldCBidXR0b24gaHRtbCBlbGVtZW50c1xuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICBjb25zdCBwcmV2QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMnKTtcblxuICAvKipcbiAgICogQHR5cGVkZWYge29iamVjdH0gSW1hZ2VTY3JvbGxlclN0YXRlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkaXNwbGF5Q291bnRcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHBvc2l0aW9uXG4gICAqL1xuICBjb25zdCBzdGF0ZSA9IHtcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxuICAgIHBvc2l0aW9uOiAwXG4gIH07XG5cbiAgLy8gaW5pdGlhbGl6ZSBidXR0b25zXG4gIG5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBvbk5hdmlnYXRpb25CdXR0b25DbGljayhlbGVtZW50LCBzdGF0ZSwgbmV4dEJ1dHRvbiwgc3RhdGUgPT4gc3RhdGUucG9zaXRpb24tLSkpO1xuICBwcmV2QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2soZWxlbWVudCwgc3RhdGUsIHByZXZCdXR0b24sIHN0YXRlID0+IHN0YXRlLnBvc2l0aW9uKyspKTtcblxuICAvLyBpbml0aWFsaXplIGltYWdlc1xuICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1thcmlhLWNvbnRyb2xzXScpLmZvckVhY2goaW5pdEltYWdlKGVsZW1lbnQpKTtcblxuICAvLyBsaXN0ZW4gZm9yIHVwZGF0ZXMgdG8gZGF0YS1zaXplXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZvckVhY2goaGFuZGxlRG9tVXBkYXRlKGVsZW1lbnQsIHN0YXRlKSkpO1xuXG4gIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwge1xuICAgIHN1YnRyZWU6IHRydWUsXG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbQVRUUklCVVRFX1NJWkVdXG4gIH0pO1xuXG4gIC8vIGluaXRpYWxpemUgcG9zaXRpb25cbiAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlci5qcyIsImltcG9ydCB7c2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIGF0dHJpYnV0ZUVxdWFscywgbm9kZUxpc3RUb0FycmF5fSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcbmltcG9ydCBLZXlib2FyZCBmcm9tICcuLi91dGlscy9rZXlib2FyZCc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaXNTZWxlY3RlZCA9IGF0dHJpYnV0ZUVxdWFscygnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChyZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSk7XG5cbi8qKlxuICogQ2hhbmdlIHRhYiBwYW5lbCB3aGVuIHRhYidzIGFyaWEtc2VsZWN0ZWQgaXMgY2hhbmdlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhYlxuICovXG5jb25zdCBhZGRBcmlhU2VsZWN0ZWRPYnNlcnZlciA9IChlbGVtZW50LCB0YWIpID0+IHtcbiAgLy8gc2V0IG9ic2VydmVyIG9uIHRpdGxlIGZvciBhcmlhLWV4cGFuZGVkXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBsZXQgcGFuZWxJZCA9IHRhYi5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICBsZXQgcGFuZWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3BhbmVsSWR9YCk7XG4gICAgbGV0IGFsbFBhbmVscyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJwYW5lbFwiXScpO1xuXG4gICAgaWYoaXNTZWxlY3RlZCh0YWIpKSB7XG4gICAgICBoaWRlQWxsKGFsbFBhbmVscyk7XG4gICAgICBzaG93KHBhbmVsKTtcbiAgICB9XG4gIH0pO1xuXG4gIG9ic2VydmVyLm9ic2VydmUodGFiLCB7XG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcImFyaWEtc2VsZWN0ZWRcIl1cbiAgfSk7XG59O1xuXG4vKipcbiAqIFNlbGVjdHMgYW4gZWxlbWVudCwgYW5kIHVuc2VsZWN0cyBhbGwgb3RoZXIgdGFic1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gYWxsVGFic1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNlbGVjdFRhYiA9IGN1cnJ5KChhbGxUYWJzLCBlbGVtZW50KSA9PiB7XG4gIHVuU2VsZWN0QWxsKGFsbFRhYnMpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG59KTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0YWJzID0gbm9kZUxpc3RUb0FycmF5KGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJcIl0nKSk7XG4gIGNvbnN0IGtleWJvYXJkID0gbmV3IEtleWJvYXJkKCk7XG5cbiAgLy8gaGFuZGxlIGVudGVyICsgc3BhY2UgY2xpY2tcbiAga2V5Ym9hcmQub25TZWxlY3QgPSBzZWxlY3RUYWIodGFicyk7XG5cbiAgLy8gaW5pdCB0YWJzXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuICAgIGFkZEFyaWFTZWxlY3RlZE9ic2VydmVyKGVsZW1lbnQsIHRhYik7XG5cbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICBsZXQgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGxldCBlbGVtZW50SW5kZXggPSB0YWJzLmluZGV4T2YoZWxlbWVudCk7XG4gICAgICBzZWxlY3RUYWIodGFicywgZWxlbWVudCk7XG4gICAgICBrZXlib2FyZC5mb3JjZVNlbGVjdGVkSW5kZXgoZWxlbWVudEluZGV4KTtcbiAgICB9KTtcblxuICAgIGtleWJvYXJkLmFkZEVsZW1lbnQodGFiKTtcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gJy4vZWxlbWVudHMnO1xuaW1wb3J0IHsgZm9yRWFjaCwgd2l0aG91dCB9IGZyb20gJy4vZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGFkZFRhYkluZGV4ID0gc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHJlbW92ZVRhYkluZGV4ID0gcmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcbiAqIEBmdW5jdGlvblxuICovXG5cbmNvbnN0IHJlbW92ZVRhYkluZGV4Rm9yQWxsID0gZm9yRWFjaChyZW1vdmVUYWJJbmRleCk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhhc1RhYkluZGV4ID0gaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuXG4vKipcbiAqIFNldHMgdGFiaW5kZXggYW5kIGZvY3VzIG9uIGFuIGVsZW1lbnQsIHJlbW92ZSBpdCBmcm9tIGFsbCBvdGhlcnNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqL1xuY29uc3QgdXBkYXRlVGFiYmFibGUgPSAoZWxlbWVudHMsIGluZGV4KSA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkRWxlbWVudCA9IGVsZW1lbnRzW2luZGV4XTtcblxuICBpZihzZWxlY3RlZEVsZW1lbnQpIHtcbiAgICByZW1vdmVUYWJJbmRleEZvckFsbChlbGVtZW50cyk7XG4gICAgYWRkVGFiSW5kZXgoc2VsZWN0ZWRFbGVtZW50KTtcbiAgICBzZWxlY3RlZEVsZW1lbnQuZm9jdXMoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZXRzIHRhYmluZGV4IG9uIGFuIGVsZW1lbnQsIHJlbW92ZSBpdCBmcm9tIGFsbCBvdGhlcnNcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY3VycmVudEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gbGFzdEluZGV4XG4gKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5jb25zdCBuZXh0SW5kZXggPSAoY3VycmVudEluZGV4LCBsYXN0SW5kZXgpID0+IChjdXJyZW50SW5kZXggPT09IGxhc3RJbmRleCkgPyAwIDogKGN1cnJlbnRJbmRleCArIDEpO1xuXG4vKipcbiAqIFNldHMgdGFiaW5kZXggb24gYW4gZWxlbWVudCwgcmVtb3ZlIGl0IGZyb20gYWxsIG90aGVyc1xuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBjdXJyZW50SW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBsYXN0SW5kZXhcbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmNvbnN0IHByZXZpb3VzSW5kZXggPSAoY3VycmVudEluZGV4LCBsYXN0SW5kZXgpID0+IChjdXJyZW50SW5kZXggPT09IDApID8gbGFzdEluZGV4IDogKGN1cnJlbnRJbmRleCAtIDEpO1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcbiAgICAgKi9cbiAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGJvdW5kIGtleSBoYW5kbGVyLCB0aGF0IGNhbiBiZSByZW1vdmVkXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gYm91bmRIYW5kbGVLZXlEb3duXG4gICAgICovXG4gICAgdGhpcy5ib3VuZEhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2VsZWN0ZWRJbmRleFxuICAgICAqL1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGtleWJvYXJkIHN1cHBvcnQgdG8gYW4gZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFkZEVsZW1lbnQoZWxlbWVudCnCoHtcbiAgICB0aGlzLmVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5ib3VuZEhhbmRsZUtleURvd24pO1xuXG4gICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAxKSB7IC8vIGlmIGZpcnN0XG4gICAgICBhZGRUYWJJbmRleChlbGVtZW50KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBjb250cm9scyB0byBhbiBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcmVtb3ZlRWxlbWVudChlbGVtZW50KcKge1xuICAgIHRoaXMuZWxlbWVudHMgPSB3aXRob3V0KFtlbGVtZW50XSwgdGhpcy5lbGVtZW50cyk7XG5cbiAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmJvdW5kSGFuZGxlS2V5RG93bik7XG5cbiAgICAvLyBpZiByZW1vdmVkIGVsZW1lbnQgd2FzIHNlbGVjdGVkXG4gICAgaWYoaGFzVGFiSW5kZXgoZWxlbWVudCkpIHtcbiAgICAgIHJlbW92ZVRhYkluZGV4KGVsZW1lbnQpO1xuXG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgdXBkYXRlVGFiYmFibGUodGhpcy5lbGVtZW50cywgdGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMga2V5IGRvd24sIGFuZCB1cGRhdGVzIHRoZSB0YWIgaW5kZXhcbiAgICpcbiAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBLZXlib2FyZCBldmVudFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgIGNvbnN0IGxhc3RJbmRleCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoIC0gMTtcblxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgIGNhc2UgMTM6IC8vIEVudGVyXG4gICAgICBjYXNlIDMyOiAvLyBTcGFjZVxuICAgICAgICB0aGlzLnNlbGVjdCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzU6IC8vIEVuZFxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNjogLy8gSG9tZVxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzc6IC8vIExlZnQgQXJyb3dcbiAgICAgIGNhc2UgMzg6IC8vIFVwIEFycm93XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHByZXZpb3VzSW5kZXgodGhpcy5zZWxlY3RlZEluZGV4LCBsYXN0SW5kZXgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vIFJpZ2h0IEFycm93XG4gICAgICBjYXNlIDQwOiAvLyBEb3duIEFycm93XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IG5leHRJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgsIGxhc3RJbmRleCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHVwZGF0ZVRhYmJhYmxlKHRoaXMuZWxlbWVudHMsIHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlbGVjdGVkIGluZGV4LCBhbmQgdXBkYXRlcyB0aGUgdGFiIGluZGV4XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKi9cbiAgZm9yY2VTZWxlY3RlZEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgdXBkYXRlVGFiYmFibGUodGhpcy5lbGVtZW50cywgdGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyAnb25TZWxlY3QnIGZ1bmN0aW9uIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgc2VsZWN0KCkge1xuICAgIGlmKHRoaXMub25TZWxlY3QgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uU2VsZWN0KHRoaXMuZWxlbWVudHNbdGhpcy5zZWxlY3RlZEluZGV4XSk7XG4gICAgfVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMva2V5Ym9hcmQuanMiLCJyZXF1aXJlKCcuLi8uLi9zcmMvc3R5bGVzL21haW4uc2NzcycpO1xuXG4vLyBMb2FkIGxpYnJhcnlcbkg1UCA9IEg1UCB8fCB7fTtcbkg1UC5IdWJDbGllbnQgPSByZXF1aXJlKCcuLi9zY3JpcHRzL2h1YicpLmRlZmF1bHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsICBub2RlTGlzdFRvQXJyYXksIHRvZ2dsZUNsYXNzIH0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuaW1wb3J0IHsgaW5pdENvbGxhcHNpYmxlIH0gZnJvbSAnLi4vdXRpbHMvY29sbGFwc2libGUnO1xuaW1wb3J0IEtleWJvYXJkIGZyb20gJy4uL3V0aWxzL2tleWJvYXJkJztcblxuLyoqXG4gKiBVbnNlbGVjdHMgYWxsIGVsZW1lbnRzIGluIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBlbGVtZW50c1xuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChyZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSk7XG5cbi8qKlxuICogU2V0cyB0aGUgYXJpYS1leHBhbmRlZCBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudCB0byBmYWxzZVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuY29uc3QgdW5FeHBhbmQgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBTZWxlY3RzIGFuIGVsZW1lbnQsIGFuZCB1biBzZWxlY3RzIGFsbCBvdGhlciBtZW51IGl0ZW1zXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBtZW51SXRlbXNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBvblNlbGVjdE1lbnVJdGVtID0gKG1lbnVJdGVtcywgZWxlbWVudCkgPT4ge1xuICB1blNlbGVjdEFsbChtZW51SXRlbXMpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG59O1xuXG4vKipcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIC8vIGVsZW1lbnRzXG4gIGNvbnN0IG1lbnVJdGVtcyA9IG5vZGVMaXN0VG9BcnJheShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKSk7XG4gIGNvbnN0IHRvZ2dsZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScpO1xuICBjb25zdCBrZXlib2FyZCA9IG5ldyBLZXlib2FyZCgpO1xuXG4gIGtleWJvYXJkLm9uU2VsZWN0ID0gZWxlbWVudCA9PiB7XG4gICAgb25TZWxlY3RNZW51SXRlbShtZW51SXRlbXMsIGVsZW1lbnQpO1xuICAgIHVuRXhwYW5kKHRvZ2dsZXIpO1xuICB9O1xuXG4gIC8vIG1vdmUgc2VsZWN0XG4gIG1lbnVJdGVtcy5mb3JFYWNoKG1lbnVJdGVtID0+IHtcbiAgICAvLyBhZGQgbW91c2UgY2xpY2sgbGlzdGVuZXJcbiAgICBtZW51SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIGxldCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgbGV0IGVsZW1lbnRJbmRleCA9IG1lbnVJdGVtcy5pbmRleE9mKGVsZW1lbnQpO1xuXG4gICAgICBvblNlbGVjdE1lbnVJdGVtKG1lbnVJdGVtcywgZWxlbWVudCk7XG4gICAgICB1bkV4cGFuZCh0b2dnbGVyKTtcbiAgICAgIGtleWJvYXJkLmZvcmNlU2VsZWN0ZWRJbmRleChlbGVtZW50SW5kZXgpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGtleWJvYXJkIHN1cHBvcnRcbiAgICBrZXlib2FyZC5hZGRFbGVtZW50KG1lbnVJdGVtKTtcbiAgfSk7XG5cbiAgLy8gaW5pdCBjb2xsYXBzZSBhbmQgb3BlblxuICBpbml0Q29sbGFwc2libGUoZWxlbWVudCwgdG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvbmF2YmFyLmpzIiwiaW1wb3J0IHthdHRyaWJ1dGVFcXVhbHMsIHRvZ2dsZUF0dHJpYnV0ZSwgdG9nZ2xlVmlzaWJpbGl0eX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhcmlhLWV4cGFuZGVkPXRydWUgb24gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc0V4cGFuZGVkID0gYXR0cmlidXRlRXF1YWxzKFwiYXJpYS1leHBhbmRlZFwiLCAndHJ1ZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYXJpYS1oaWRkZW4gb24gJ2NvbGxhcHNpYmxlJyB3aGVuIGFyaWEtZXhwYW5kZWQgY2hhbmdlcyBvbiAndG9nZ2xlcicsXG4gKiBhbmQgdG9nZ2xlcyBhcmlhLWV4cGFuZGVkIG9uICd0b2dnbGVyJyBvbiBjbGlja1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFt0YXJnZXRIYW5kbGVyXSBmYWxscyBiYWNrIHRvIHRvZ2dsZVZpc2liaWxpdHkgd2l0aCBhcmlhLWhpZGRlblxuICovXG5leHBvcnQgY29uc3QgaW5pdENvbGxhcHNpYmxlID0gKGVsZW1lbnQsIHRhcmdldEhhbmRsZXIgPSB0b2dnbGVWaXNpYmlsaXR5KSA9PiB7XG4gIC8vIGVsZW1lbnRzXG4gIGNvbnN0IHRvZ2dsZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScpO1xuICBjb25zdCBjb2xsYXBzaWJsZUlkID0gdG9nZ2xlci5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgY29uc3QgY29sbGFwc2libGUgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2NvbGxhcHNpYmxlSWR9YCk7XG5cbiAgLy8gc2V0IG9ic2VydmVyIG9uIHRpdGxlIGZvciBhcmlhLWV4cGFuZGVkXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHRhcmdldEhhbmRsZXIoaXNFeHBhbmRlZCh0b2dnbGVyKSwgY29sbGFwc2libGUpKTtcblxuICBvYnNlcnZlci5vYnNlcnZlKHRvZ2dsZXIsIHtcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW1wiYXJpYS1leHBhbmRlZFwiXVxuICB9KTtcblxuICAvLyBTZXQgY2xpY2sgbGlzdGVuZXIgdGhhdCB0b2dnbGVzIGFyaWEtZXhwYW5kZWRcbiAgdG9nZ2xlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRvZ2dsZUF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgdG9nZ2xlcikpO1xuXG4gIC8vIGluaXRpYWxpemVcbiAgdGFyZ2V0SGFuZGxlcihpc0V4cGFuZGVkKHRvZ2dsZXIpLCBjb2xsYXBzaWJsZSk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2NvbGxhcHNpYmxlLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGljdGlvbmFyeSB7XG5cbiAgc3RhdGljIGluaXQoZGljdGlvbmFyeSkge1xuICAgIERpY3Rpb25hcnkuZGljdGlvbmFyeSA9IGRpY3Rpb25hcnk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc3RyaW5nIGZyb20gdGhlIGRpY3Rpb25hcnkuIE9wdGlvbmFsbHkgcmVwbGFjZSB2YXJpYWJsZXNcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVwbGFjZW1lbnRzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZ2V0KGtleSwgcmVwbGFjZW1lbnRzKSB7XG5cbiAgICAvLyB2YXIgdHJhbnNsYXRpb24gPSBEaWN0aW9uYXJ5LmRpY3Rpb25hcnlba2V5XTtcbiAgICAvL1xuICAgIC8vIC8vIFJlcGxhY2UgcGxhY2Vob2xkZXIgd2l0aCB2YXJpYWJsZXMuXG4gICAgLy8gZm9yICh2YXIgcGxhY2Vob2xkZXIgaW4gcmVwbGFjZW1lbnRzKSB7XG4gICAgLy8gICBpZiAoIXJlcGxhY2VtZW50c1twbGFjZWhvbGRlcl0pIHtcbiAgICAvLyAgICAgY29udGludWU7XG4gICAgLy8gICB9XG4gICAgLy8gICB0cmFuc2xhdGlvbiA9IHRyYW5zbGF0aW9uLnJlcGxhY2UocGxhY2Vob2xkZXIsIHJlcGxhY2VtZW50c1twbGFjZWhvbGRlcl0pO1xuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIHJldHVybiB0cmFuc2xhdGlvbjtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZGljdGlvbmFyeS5qcyIsImltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbGF5Q2xpY2tFdmVudEFzfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlVmlldyB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS50eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS50aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUuY29udGVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlLmFjdGlvbl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzdGF0ZS5kaXNtaXNzYWJsZV1cbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudHNcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50KHN0YXRlKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQobWVzc2FnZSkge1xuICAgIC8vIENyZWF0ZSB3cmFwcGVyOlxuICAgIGNvbnN0IG1lc3NhZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVzc2FnZVdyYXBwZXIuY2xhc3NOYW1lID0gYG1lc3NhZ2UgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XG5cbiAgICAvLyBBZGQgY2xvc2UgYnV0dG9uIGlmIGRpc21pc2FibGVcbiAgICBpZiAobWVzc2FnZS5kaXNtaXNzaWJsZSkge1xuICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XG4gICAgICAvL2Nsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmI3gyNzE1JztcbiAgICAgIC8vIFRPRE9cbiAgICAgIC8vIC0gQWRkIGNsb3NlIGxhYmVsIGZyb20gdHJhbnNsYXRpb25zXG4gICAgICAvLyAtIEFkZCB2aXN1YWxzIGluIENTUyAoZm9udCBpY29uKVxuICAgICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ2Nsb3NlJywgdGhpcywgY2xvc2VCdXR0b24pO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVzc2FnZUNvbnRlbnQuY2xhc3NOYW1lID0gJ21lc3NhZ2UtY29udGVudCc7XG4gICAgbWVzc2FnZUNvbnRlbnQuaW5uZXJIVE1MID0gJzxoMj4nICsgbWVzc2FnZS50aXRsZSArICc8L2gyPicgKyAnPHA+JyArIG1lc3NhZ2UuY29udGVudCArICc8L3A+JztcbiAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGVudCk7XG5cbiAgICBpZiAobWVzc2FnZS5hY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgbWVzc2FnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgbWVzc2FnZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcbiAgICAgIG1lc3NhZ2VCdXR0b24uaW5uZXJIVE1MID0gbWVzc2FnZS5hY3Rpb247XG4gICAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQnV0dG9uKTtcblxuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ2FjdGlvbi1jbGlja2VkJywgdGhpcywgbWVzc2FnZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlldy5qcyIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpXG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCdcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHsgYm9keTogdGhpcy5fYm9keUluaXQgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gICAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcbiAgICB2YXIgcHJlUHJvY2Vzc2VkSGVhZGVycyA9IHJhd0hlYWRlcnMucmVwbGFjZSgvXFxyP1xcbltcXHQgXSsvLCAnICcpXG4gICAgcHJlUHJvY2Vzc2VkSGVhZGVycy5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZmV0Y2guanMiXSwic291cmNlUm9vdCI6IiJ9