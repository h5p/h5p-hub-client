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
      var searchbar = event.target.parentElement.querySelector('#hub-search-bar');

      // Only searching if the enter key is pressed
      if (_this.typeAheadEnabled || event.which == 13 || event.keyCode == 13) {
        _this.trigger('search', {
          element: searchbar,
          query: searchbar.value
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2ZhMWRhNGZmMjhjYWMzMmU4OTQiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9taXhpbnMvZXZlbnRmdWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3M/NmE3OCIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrLXVpL3NyYy9zY3JpcHRzL2NvbnRyb2xzLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrLXVpL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay11aS9zcmMvc2NyaXB0cy91aS9rZXlib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2tleWJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2Rpc3QuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9uYXZiYXIuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvY29sbGFwc2libGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvZGljdGlvbmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tZXNzYWdlLXZpZXcvbWVzc2FnZS12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2ZldGNoLmpzIl0sIm5hbWVzIjpbImN1cnJ5IiwiZm4iLCJhcml0eSIsImxlbmd0aCIsImYxIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJmMiIsImFyZ3MyIiwiY29uY2F0IiwiY29tcG9zZSIsImZucyIsInJlZHVjZSIsImYiLCJnIiwiZm9yRWFjaCIsImFyciIsIm1hcCIsImZpbHRlciIsInNvbWUiLCJjb250YWlucyIsInZhbHVlIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJ2YWx1ZXMiLCJpbnZlcnNlQm9vbGVhblN0cmluZyIsImJvb2wiLCJ0b1N0cmluZyIsIkV2ZW50ZnVsIiwibGlzdGVuZXJzIiwib24iLCJ0eXBlIiwibGlzdGVuZXIiLCJzY29wZSIsInRyaWdnZXIiLCJwdXNoIiwiZXZlbnQiLCJ0cmlnZ2VycyIsImV2ZXJ5IiwicHJvcGFnYXRlIiwidHlwZXMiLCJldmVudGZ1bCIsIm5ld1R5cGUiLCJzZWxmIiwiZ2V0QXR0cmlidXRlIiwibmFtZSIsImVsIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiYXR0cmlidXRlRXF1YWxzIiwidG9nZ2xlQXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJwYXJlbnQiLCJjaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmVDaGlsZCIsIm9sZENoaWxkIiwiY2xhc3NMaXN0Q29udGFpbnMiLCJjbHMiLCJjbGFzc0xpc3QiLCJub2RlTGlzdFRvQXJyYXkiLCJub2RlTGlzdCIsImhpZGUiLCJzaG93IiwidG9nZ2xlVmlzaWJpbGl0eSIsInZpc2libGUiLCJlbGVtZW50IiwidG9nZ2xlQ2xhc3MiLCJhZGQiLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJzZXR1cCIsImNhY2hlZENvbnRlbnRUeXBlcyIsImZldGNoIiwibWV0aG9kIiwiY3JlZGVudGlhbHMiLCJ0aGVuIiwicmVzdWx0IiwianNvbiIsImlzVmFsaWQiLCJsaWJyYXJpZXMiLCJyZXNwb25zZSIsIm1lc3NhZ2VDb2RlIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJtYWNoaW5lTmFtZSIsImNvbnRlbnRUeXBlcyIsImNvbnRlbnRUeXBlIiwiaWQiLCJucyIsImdldEFqYXhVcmwiLCJib2R5IiwiZm9ybURhdGEiLCJyZWxheUNsaWNrRXZlbnRBcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJpbml0IiwiSHViIiwic3RhdGUiLCJkaWN0aW9uYXJ5Iiwic2VydmljZXMiLCJjb250ZW50VHlwZVNlY3Rpb24iLCJ1cGxvYWRTZWN0aW9uIiwidmlldyIsInNldFBhbmVsVGl0bGUiLCJjbG9zZVBhbmVsIiwic2V0U2VjdGlvblR5cGUiLCJ0b2dnbGVQYW5lbE9wZW4iLCJiaW5kIiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsImluaXRUYWJQYW5lbCIsImdldENvbnRlbnRUeXBlIiwidGl0bGUiLCJzZXRUaXRsZSIsInNlY3Rpb25JZCIsInRhYkNvbmZpZ3MiLCJjb250ZW50IiwiZ2V0RWxlbWVudCIsImNvbmZpZyIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiYWRkQm90dG9tQm9yZGVyIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsIk1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04iLCJpc0VtcHR5IiwidGV4dCIsImhpZGVBbGwiLCJDb250ZW50VHlwZURldGFpbFZpZXciLCJyb290RWxlbWVudCIsImNyZWF0ZVZpZXciLCJidXR0b25CYXIiLCJ1c2VCdXR0b24iLCJpbnN0YWxsQnV0dG9uIiwiYnV0dG9ucyIsImltYWdlIiwib3duZXIiLCJkZXNjcmlwdGlvbiIsImRlbW9CdXR0b24iLCJjYXJvdXNlbCIsImNhcm91c2VsTGlzdCIsImxpY2VuY2VQYW5lbCIsImluc3RhbGxNZXNzYWdlIiwiaW5zdGFsbE1lc3NhZ2VDbG9zZSIsImxhYmVsQmFjayIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImdldCIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwiaW5uZXJUZXh0IiwibGlnaHRib3giLCJjaGlsZEVsZW1lbnRDb3VudCIsInVybCIsImFsdCIsInRodW1ibmFpbCIsInNyYyIsImVsbGlwc2lzIiwidG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCIsImRlc2NyaXB0aW9uRXhwYW5kZWQiLCJzaXplIiwic3Vic3RyIiwiaW5zdGFsbGVkIiwic2hvd0J1dHRvbkJ5U2VsZWN0b3IiLCJyZXN0cmljdGVkIiwiYnV0dG9uIiwiQ29udGVudFR5cGVEZXRhaWwiLCJpbnN0YWxsIiwidXBkYXRlIiwiaW5zdGFsbENvbnRlbnRUeXBlIiwic2V0SXNJbnN0YWxsZWQiLCJzZXRJbnN0YWxsTWVzc2FnZSIsImNhdGNoIiwiZXJyb3JNZXNzYWdlIiwiZXJyb3IiLCJlcnJvckNvZGUiLCJjb25zb2xlIiwicmVzZXQiLCJzZXRJZCIsInNldERlc2NyaXB0aW9uIiwic2V0SW1hZ2UiLCJpY29uIiwic2V0RXhhbXBsZSIsImV4YW1wbGUiLCJzZXRPd25lciIsInNldExpY2VuY2UiLCJsaWNlbnNlIiwic2V0SXNSZXN0cmljdGVkIiwicmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCIsInNjcmVlbnNob3RzIiwiYWRkSW1hZ2VUb0Nhcm91c2VsIiwiZ2V0Um93SWQiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiY29udHJvbHMiLCJmaXJlIiwiaGFzQ2hpbGROb2RlcyIsInJvdyIsImxhc3RDaGlsZCIsInJlbW92ZUVsZW1lbnQiLCJjcmVhdGVDb250ZW50VHlwZVJvdyIsImFkZEVsZW1lbnQiLCJpbmRleCIsImNvbnRlbnRUeXBlUm93VGl0bGVJZCIsImNvbnRlbnRUeXBlUm93RGVzY3JpcHRpb25JZCIsInVzZUJ1dHRvbkNvbmZpZyIsImluc3RhbGxCdXR0b25Db25maWciLCJzdW1tYXJ5IiwiZGlzYWJsZWQiLCJDb250ZW50VHlwZUxpc3QiLCJyZW1vdmVBbGxSb3dzIiwiYWRkUm93IiwidW5zZWxlY3RBbGwiLCJDb250ZW50QnJvd3NlclZpZXciLCJ0eXBlQWhlYWRFbmFibGVkIiwibWVudSIsIm1lbnViYXIiLCJpbnB1dEZpZWxkIiwiZGlzcGxheVNlbGVjdGVkIiwiaW5wdXRCdXR0b24iLCJzZWFyY2hiYXIiLCJ0YXJnZXQiLCJwYXJlbnRFbGVtZW50Iiwid2hpY2giLCJrZXlDb2RlIiwicXVlcnkiLCJmb2N1cyIsIm1lbnV0aXRsZSIsIm1lbnVJZCIsInNlYXJjaFRleHQiLCJhY3Rpb24iLCJtZXNzYWdlVmlldyIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJldmVudE5hbWUiLCJjaG9pY2UiLCJzZWxlY3RlZE5hbWUiLCJtZW51SXRlbXMiLCJzZWxlY3RlZE1lbnVJdGVtIiwidW5kZXJsaW5lIiwiQ29udGVudFR5cGVTZWN0aW9uVGFicyIsIkFMTCIsIk1ZX0NPTlRFTlRfVFlQRVMiLCJNT1NUX1BPUFVMQVIiLCJDb250ZW50VHlwZVNlY3Rpb24iLCJzZWFyY2hTZXJ2aWNlIiwiY29udGVudFR5cGVMaXN0IiwiY29udGVudFR5cGVEZXRhaWwiLCJzZWN0aW9uIiwic2VhcmNoIiwic2VsZWN0TWVudUl0ZW1CeUlkIiwiY2xvc2VEZXRhaWxWaWV3IiwiYXBwbHlTZWFyY2hGaWx0ZXIiLCJjbGVhcklucHV0RmllbGQiLCJ1cGRhdGVEaXNwbGF5U2VsZWN0ZWQiLCJzaG93RGV0YWlsVmlldyIsInRhYiIsImhhc093blByb3BlcnR5IiwiYWRkTWVudUl0ZW0iLCJpbml0TWVudSIsImhhbmRsZUVycm9yIiwiZGlzcGxheU1lc3NhZ2UiLCJzZXREaXNwbGF5U2VsZWN0ZWQiLCJlIiwic29ydE9uIiwiY3RzIiwiZmlsdGVyT3V0UmVzdHJpY3RlZCIsInNvcnRPcmRlciIsImxvYWRCeUlkIiwicmVtb3ZlRGVhY3RpdmF0ZWRTdHlsZUZyb21NZW51IiwiYWRkRGVhY3RpdmF0ZWRTdHlsZVRvTWVudSIsIkFUVFJJQlVURV9EQVRBX0lEIiwiaXNPcGVuIiwiSHViVmlldyIsInJlbmRlclRhYlBhbmVsIiwicmVuZGVyUGFuZWwiLCJleHBhbmRlZCIsInRhYkNvbnRhaW5lckVsZW1lbnQiLCJwYW5lbCIsInNldFRpbWVvdXQiLCJ0YWJsaXN0IiwidGFiTGlzdFdyYXBwZXIiLCJ0YWJJZCIsInRhYlBhbmVsSWQiLCJ0YWJQYW5lbCIsIlNlYXJjaFNlcnZpY2UiLCJmaWx0ZXJCeVF1ZXJ5IiwibXVsdGlTb3J0IiwiY3QiLCJpc0FycmF5Iiwic29ydCIsImN0MSIsImN0MiIsImhhbmRsZVNvcnRUeXBlIiwic29ydE9uUmVzdHJpY3RlZCIsInNvcnRPblByb3BlcnR5Iiwic29ydFNlYXJjaFJlc3VsdHMiLCJwcm9wZXJ0eSIsImZpbHRlcmVkIiwic2NvcmUiLCJnZXRTZWFyY2hTY29yZSIsImEiLCJiIiwicG9wdWxhcml0eSIsInF1ZXJpZXMiLCJzcGxpdCIsInF1ZXJ5U2NvcmVzIiwiZ2V0U2NvcmVGb3JFYWNoUXVlcnkiLCJ0cmltIiwiaGFzU3ViU3RyaW5nIiwiYXJyYXlIYXNTdWJTdHJpbmciLCJrZXl3b3JkcyIsIm5lZWRsZSIsImhheXN0YWNrIiwidW5kZWZpbmVkIiwidG9Mb3dlckNhc2UiLCJzdWJTdHJpbmciLCJzdHJpbmciLCJVcGxvYWRTZWN0aW9uIiwiaDVwVXBsb2FkIiwidGV4dENvbnRlbnQiLCJkYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmaWxlcyIsInVwbG9hZENvbnRlbnQiLCJyZW1vdmVUYWJJbmRleCIsInJlbW92ZVRhYkluZGV4Rm9yQWxsIiwic2V0VGFiSW5kZXhaZXJvIiwiaGFzVGFiSW5kZXgiLCJDb250cm9scyIsInBsdWdpbnMiLCJlbGVtZW50cyIsIm5leHRFbGVtZW50IiwicHJldmlvdXNFbGVtZW50IiwiaW5pdFBsdWdpbnMiLCJmaXJlc0V2ZW50Iiwic2V0VGFiYmFibGUiLCJvbGRFbGVtZW50IiwidGFiYmFibGVFbGVtZW50IiwiaXNMYXN0RWxlbWVudCIsIm5leHRFbCIsImlzRmlyc3RFbGVtZW50IiwicHJldkVsIiwicGx1Z2luIiwiS2V5Ym9hcmQiLCJzZWxlY3RhYmlsaXR5IiwiYm91bmRIYW5kbGVLZXlEb3duIiwiaGFuZGxlS2V5RG93biIsImxpc3RlbkZvcktleURvd24iLCJyZW1vdmVLZXlEb3duTGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2VsZWN0IiwicHJldmVudERlZmF1bHQiLCJBVFRSSUJVVEVfU0laRSIsImRpc2FibGUiLCJlbmFibGUiLCJ0b2dnbGVFbmFibGVkIiwiZW5hYmxlZCIsImhpZGRlbiIsImlzRGlzYWJsZWQiLCJ1cGRhdGVWaWV3IiwicHJldkJ1dHRvbiIsIm5leHRCdXR0b24iLCJsaXN0IiwidG90YWxDb3VudCIsInN0eWxlIiwid2lkdGgiLCJkaXNwbGF5Q291bnQiLCJtYXJnaW5MZWZ0IiwicG9zaXRpb24iLCJvbk5hdmlnYXRpb25CdXR0b25DbGljayIsInVwZGF0ZVN0YXRlIiwiaW5pdEltYWdlIiwidGFyZ2V0SWQiLCJoYW5kbGVEb21VcGRhdGUiLCJyZWNvcmQiLCJhZGRlZE5vZGVzIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJpc1NlbGVjdGVkIiwidW5TZWxlY3RBbGwiLCJhZGRBcmlhU2VsZWN0ZWRPYnNlcnZlciIsInBhbmVsSWQiLCJhbGxQYW5lbHMiLCJzZWxlY3RUYWIiLCJhbGxUYWJzIiwidGFicyIsImtleWJvYXJkIiwib25TZWxlY3QiLCJlbGVtZW50SW5kZXgiLCJmb3JjZVNlbGVjdGVkSW5kZXgiLCJhZGRUYWJJbmRleCIsInVwZGF0ZVRhYmJhYmxlIiwic2VsZWN0ZWRFbGVtZW50IiwibmV4dEluZGV4IiwiY3VycmVudEluZGV4IiwibGFzdEluZGV4IiwicHJldmlvdXNJbmRleCIsInNlbGVjdGVkSW5kZXgiLCJyZXF1aXJlIiwiSDVQIiwiSHViQ2xpZW50IiwiZGVmYXVsdCIsInVuRXhwYW5kIiwib25TZWxlY3RNZW51SXRlbSIsInRvZ2dsZXIiLCJtZW51SXRlbSIsImlzRXhwYW5kZWQiLCJpbml0Q29sbGFwc2libGUiLCJ0YXJnZXRIYW5kbGVyIiwiY29sbGFwc2libGVJZCIsImNvbGxhcHNpYmxlIiwiRGljdGlvbmFyeSIsImtleSIsInJlcGxhY2VtZW50cyIsIk1lc3NhZ2VWaWV3IiwibWVzc2FnZVdyYXBwZXIiLCJkaXNtaXNzaWJsZSIsImNsb3NlQnV0dG9uIiwibWVzc2FnZUNvbnRlbnQiLCJtZXNzYWdlQnV0dG9uIiwic3VwcG9ydCIsInNlYXJjaFBhcmFtcyIsIml0ZXJhYmxlIiwiU3ltYm9sIiwiYmxvYiIsIkJsb2IiLCJhcnJheUJ1ZmZlciIsInZpZXdDbGFzc2VzIiwiaXNEYXRhVmlldyIsIm9iaiIsIkRhdGFWaWV3IiwiaXNQcm90b3R5cGVPZiIsImlzQXJyYXlCdWZmZXJWaWV3IiwiQXJyYXlCdWZmZXIiLCJpc1ZpZXciLCJPYmplY3QiLCJub3JtYWxpemVOYW1lIiwiU3RyaW5nIiwidGVzdCIsIlR5cGVFcnJvciIsIm5vcm1hbGl6ZVZhbHVlIiwiaXRlcmF0b3JGb3IiLCJpdGVtcyIsIml0ZXJhdG9yIiwibmV4dCIsInNoaWZ0IiwiZG9uZSIsIkhlYWRlcnMiLCJoZWFkZXJzIiwiaGVhZGVyIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIm9sZFZhbHVlIiwiaGFzIiwic2V0IiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwia2V5cyIsImVudHJpZXMiLCJjb25zdW1lZCIsImJvZHlVc2VkIiwiZmlsZVJlYWRlclJlYWR5IiwicmVhZGVyIiwib25sb2FkIiwib25lcnJvciIsInJlYWRCbG9iQXNBcnJheUJ1ZmZlciIsIkZpbGVSZWFkZXIiLCJwcm9taXNlIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJyZWFkQmxvYkFzVGV4dCIsInJlYWRBc1RleHQiLCJyZWFkQXJyYXlCdWZmZXJBc1RleHQiLCJidWYiLCJVaW50OEFycmF5IiwiY2hhcnMiLCJpIiwiZnJvbUNoYXJDb2RlIiwiam9pbiIsImJ1ZmZlckNsb25lIiwiYnl0ZUxlbmd0aCIsImJ1ZmZlciIsIkJvZHkiLCJfaW5pdEJvZHkiLCJfYm9keUluaXQiLCJfYm9keVRleHQiLCJfYm9keUJsb2IiLCJfYm9keUZvcm1EYXRhIiwiVVJMU2VhcmNoUGFyYW1zIiwiX2JvZHlBcnJheUJ1ZmZlciIsIkVycm9yIiwicmVqZWN0ZWQiLCJkZWNvZGUiLCJKU09OIiwicGFyc2UiLCJtZXRob2RzIiwibm9ybWFsaXplTWV0aG9kIiwidXBjYXNlZCIsInRvVXBwZXJDYXNlIiwiUmVxdWVzdCIsImlucHV0Iiwib3B0aW9ucyIsIm1vZGUiLCJyZWZlcnJlciIsImNsb25lIiwiZm9ybSIsImJ5dGVzIiwicmVwbGFjZSIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhcnNlSGVhZGVycyIsInJhd0hlYWRlcnMiLCJwcmVQcm9jZXNzZWRIZWFkZXJzIiwibGluZSIsInBhcnRzIiwiUmVzcG9uc2UiLCJib2R5SW5pdCIsInN0YXR1cyIsIm9rIiwic3RhdHVzVGV4dCIsInJlZGlyZWN0U3RhdHVzZXMiLCJyZWRpcmVjdCIsIlJhbmdlRXJyb3IiLCJsb2NhdGlvbiIsInJlcXVlc3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInJlc3BvbnNlVVJMIiwicmVzcG9uc2VUZXh0Iiwib250aW1lb3V0Iiwib3BlbiIsIndpdGhDcmVkZW50aWFscyIsInJlc3BvbnNlVHlwZSIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwicG9seWZpbGwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FB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RDs7QUFXQXVCLFVBQUkzRCxPQUFKLEdBQWMsWUFBVztBQUN2QnJZLGVBQU8sSUFBSTZXLFNBQUosQ0FBYyx3QkFBZCxDQUFQO0FBQ0QsT0FGRDs7QUFJQW1GLFVBQUlLLFNBQUosR0FBZ0IsWUFBVztBQUN6QnJjLGVBQU8sSUFBSTZXLFNBQUosQ0FBYyx3QkFBZCxDQUFQO0FBQ0QsT0FGRDs7QUFJQW1GLFVBQUlNLElBQUosQ0FBU1AsUUFBUXpjLE1BQWpCLEVBQXlCeWMsUUFBUXZYLEdBQWpDLEVBQXNDLElBQXRDOztBQUVBLFVBQUl1WCxRQUFReGMsV0FBUixLQUF3QixTQUE1QixFQUF1QztBQUNyQ3ljLFlBQUlPLGVBQUosR0FBc0IsSUFBdEI7QUFDRDs7QUFFRCxVQUFJLGtCQUFrQlAsR0FBbEIsSUFBeUJ0RyxRQUFRSSxJQUFyQyxFQUEyQztBQUN6Q2tHLFlBQUlRLFlBQUosR0FBbUIsTUFBbkI7QUFDRDs7QUFFRFQsY0FBUXpFLE9BQVIsQ0FBZ0I5YixPQUFoQixDQUF3QixVQUFTTSxLQUFULEVBQWdCd0IsSUFBaEIsRUFBc0I7QUFDNUMwZSxZQUFJUyxnQkFBSixDQUFxQm5mLElBQXJCLEVBQTJCeEIsS0FBM0I7QUFDRCxPQUZEOztBQUlBa2dCLFVBQUlVLElBQUosQ0FBUyxPQUFPWCxRQUFRdkMsU0FBZixLQUE2QixXQUE3QixHQUEyQyxJQUEzQyxHQUFrRHVDLFFBQVF2QyxTQUFuRTtBQUNELEtBdENNLENBQVA7QUF1Q0QsR0F4Q0Q7QUF5Q0FwYyxPQUFLaUMsS0FBTCxDQUFXc2QsUUFBWCxHQUFzQixJQUF0QjtBQUNELENBL2NELEVBK2NHLE9BQU92ZixJQUFQLEtBQWdCLFdBQWhCLEdBQThCQSxJQUE5QixZQS9jSCxFIiwiZmlsZSI6Img1cC1odWItY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdmYTFkYTRmZjI4Y2FjMzJlODk0IiwiLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICpcbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGN1cnJ5ID0gZnVuY3Rpb24oZm4pIHtcbiAgY29uc3QgYXJpdHkgPSBmbi5sZW5ndGg7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKCkge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+PSBhcml0eSkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBmMigpIHtcbiAgICAgICAgY29uc3QgYXJnczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICByZXR1cm4gZjEuYXBwbHkobnVsbCwgYXJncy5jb25jYXQoYXJnczIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIENvbXBvc2UgZnVuY3Rpb25zIHRvZ2V0aGVyLCBleGVjdXRpbmcgZnJvbSByaWdodCB0byBsZWZ0XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbi4uLn0gZm5zXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKC4uLmZucykgPT4gZm5zLnJlZHVjZSgoZiwgZykgPT4gKC4uLmFyZ3MpID0+IGYoZyguLi5hcmdzKSkpO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JFYWNoID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgYXJyLmZvckVhY2goZm4pO1xufSk7XG5cbi8qKlxuICogTWFwcyBhIGZ1bmN0aW9uIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgbWFwID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5tYXAoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZpbHRlciB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBzb21lIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgc29tZSA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuc29tZShmbik7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgYSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSBjdXJyeShmdW5jdGlvbiAodmFsdWUsIGFycikge1xuICByZXR1cm4gYXJyLmluZGV4T2YodmFsdWUpICE9IC0xO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSBzdXBwbGllZCB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgd2l0aG91dCA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZXMsIGFycikge1xuICByZXR1cm4gZmlsdGVyKHZhbHVlID0+ICFjb250YWlucyh2YWx1ZSwgdmFsdWVzKSwgYXJyKVxufSk7XG5cbi8qKlxuICogVGFrZXMgYSBzdHJpbmcgdGhhdCBpcyBlaXRoZXIgJ3RydWUnIG9yICdmYWxzZScgYW5kIHJldHVybnMgdGhlIG9wcG9zaXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJvb2xcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBpbnZlcnNlQm9vbGVhblN0cmluZyA9IGZ1bmN0aW9uIChib29sKSB7XG4gIHJldHVybiAoYm9vbCAhPT0gJ3RydWUnKS50b1N0cmluZygpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9mdW5jdGlvbmFsLmpzIiwiLyoqXG4gKiBAbWl4aW5cbiAqL1xuZXhwb3J0IGNvbnN0IEV2ZW50ZnVsID0gKCkgPT4gKHtcbiAgbGlzdGVuZXJzOiB7fSxcblxuICAvKipcbiAgICogTGlzdGVuIHRvIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbc2NvcGVdXG4gICAqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtFdmVudGZ1bH1cbiAgICovXG4gIG9uOiBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgc2NvcGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZWRlZiB7b2JqZWN0fSBUcmlnZ2VyXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2NvcGVcbiAgICAgKi9cbiAgICBjb25zdCB0cmlnZ2VyID0ge1xuICAgICAgJ2xpc3RlbmVyJzogbGlzdGVuZXIsXG4gICAgICAnc2NvcGUnOiBzY29wZVxuICAgIH07XG5cbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2godHJpZ2dlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogVHJpZ2dlcnMgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHRyaWdnZXI6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtldmVudE5hbWVdIHRoZSBuYW1lIG9mIHRoZSBldmVudCB3aGVuIHByb3BvZ2F0ZWRcbiAgICovXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsLCBuZXdUeXBlKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLnRyaWdnZXIobmV3VHlwZSB8fCB0eXBlLCBldmVudCkpKTtcbiAgfVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9taXhpbnMvZXZlbnRmdWwuanMiLCJpbXBvcnQge2N1cnJ5LCBpbnZlcnNlQm9vbGVhblN0cmluZ30gZnJvbSAnLi9mdW5jdGlvbmFsJ1xuXG4vKipcbiAqIEdldCBhbiBhdHRyaWJ1dGUgdmFsdWUgZnJvbSBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IGVsLmdldEF0dHJpYnV0ZShuYW1lKSk7XG5cbi8qKlxuICogU2V0IGFuIGF0dHJpYnV0ZSBvbiBhIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgdmFsdWUsIGVsKSA9PiBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpKTtcblxuLyoqXG4gKiBSZW1vdmUgYXR0cmlidXRlIGZyb20gaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaGFzQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5oYXNBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZSB0aGF0IGVxdWFsc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgYXR0cmlidXRlRXF1YWxzID0gY3VycnkoKG5hbWUsIHZhbHVlLCBlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpID09PSB2YWx1ZSk7XG5cbi8qKlxuICogVG9nZ2xlcyBhbiBhdHRyaWJ1dGUgYmV0d2VlbiAndHJ1ZScgYW5kICdmYWxzZSc7XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IHtcbiAgY29uc3QgdmFsdWUgPSBnZXRBdHRyaWJ1dGUobmFtZSwgZWwpO1xuICBzZXRBdHRyaWJ1dGUobmFtZSwgaW52ZXJzZUJvb2xlYW5TdHJpbmcodmFsdWUpLCBlbCk7XG59KTtcblxuLyoqXG4gKiBUaGUgYXBwZW5kQ2hpbGQoKSBtZXRob2QgYWRkcyBhIG5vZGUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdCBvZiBjaGlsZHJlbiBvZiBhIHNwZWNpZmllZCBwYXJlbnQgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNoaWxkXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IGFwcGVuZENoaWxkID0gY3VycnkoKHBhcmVudCwgY2hpbGQpID0+IHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCkpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyBhIGRlc2NlbmRhbnQgb2YgdGhlIGVsZW1lbnQgb24gd2hpY2ggaXQgaXMgaW52b2tlZFxuICogdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2Ygc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvciA9IGN1cnJ5KChzZWxlY3RvciwgZWwpID0+IGVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbm9uLWxpdmUgTm9kZUxpc3Qgb2YgYWxsIGVsZW1lbnRzIGRlc2NlbmRlZCBmcm9tIHRoZSBlbGVtZW50IG9uIHdoaWNoIGl0XG4gKiBpcyBpbnZva2VkIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIENTUyBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Tm9kZUxpc3R9XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yQWxsID0gY3VycnkoKHNlbGVjdG9yLCBlbCkgPT4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuXG4vKipcbiAqIFRoZSByZW1vdmVDaGlsZCgpIG1ldGhvZCByZW1vdmVzIGEgY2hpbGQgbm9kZSBmcm9tIHRoZSBET00uIFJldHVybnMgcmVtb3ZlZCBub2RlLlxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gcGFyZW50XG4gKiBAcGFyYW0ge05vZGV9IG9sZENoaWxkXG4gKlxuICogQHJldHVybiB7Tm9kZX1cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUNoaWxkID0gY3VycnkoKHBhcmVudCwgb2xkQ2hpbGQpID0+IHBhcmVudC5yZW1vdmVDaGlsZChvbGRDaGlsZCkpO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIG5vZGUgaGFzIGEgY2xhc3NcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgY2xhc3NMaXN0Q29udGFpbnMgPSBjdXJyeSgoY2xzLCBlbCkgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNscykpO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSBOb2RlTGlzdCB0byBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7Tm9kZUxpc3R9IG5vZGVMaXN0XG4gKlxuICogQHJldHVybiB7Tm9kZVtdfVxuICovXG5leHBvcnQgY29uc3Qgbm9kZUxpc3RUb0FycmF5ID0gbm9kZUxpc3QgPT4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZUxpc3QpO1xuXG4vKipcbiAqIEFkZHMgYXJpYS1oaWRkZW49dHJ1ZSB0byBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQWRkcyBhcmlhLWhpZGRlbj1mYWxzZSB0byBhbiBlbGVtZW50XG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyBhcmlhLWhpZGRlbiBvbiBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gY3VycnkoKHZpc2libGUsIGVsZW1lbnQpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpKTtcblxuLyoqXG4gKiBUb2dnbGVzIGEgY2xhc3Mgb24gYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWRkXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVDbGFzcyA9IGN1cnJ5KChjbHMsIGFkZCwgZWxlbWVudCkgPT4gZWxlbWVudC5jbGFzc0xpc3RbYWRkID8gJ2FkZCcgOiAncmVtb3ZlJ10oY2xzKSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJpbXBvcnQgJy4vdXRpbHMvZmV0Y2gnO1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBDb250ZW50VHlwZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFqb3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWlub3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGF0Y2hWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWFqb3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWlub3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3VtbWFyeVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNyZWF0ZWRBdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHVwZGF0ZWRfQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpc1JlY29tbWVuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9wdWxhcml0eVxuICogQHByb3BlcnR5IHtvYmplY3RbXX0gc2NyZWVuc2hvdHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsaWNlbnNlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXhhbXBsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHR1dG9yaWFsXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBrZXl3b3Jkc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG93bmVyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGluc3RhbGxlZFxuICogQHByb3BlcnR5IHtib29sZWFufSByZXN0cmljdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlNlcnZpY2VzIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcGlSb290VXJsXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7IGFwaVJvb3RVcmwgfSkge1xuICAgIHRoaXMuYXBpUm9vdFVybCA9IGFwaVJvb3RVcmw7XG4gICAgdGhpcy5zZXR1cCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHRoZSBjb250ZW50IHR5cGUgbWV0YWRhdGFcbiAgICovXG4gIHNldHVwKCkge1xuICAgIHRoaXMuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnQtdHlwZS1jYWNoZWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcbiAgICAudGhlbih0aGlzLmlzVmFsaWQpXG4gICAgLnRoZW4oanNvbiA9PiBqc29uLmxpYnJhcmllcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtICB7Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2V9IHJlc3BvbnNlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2U+fVxuICAgKi9cbiAgaXNWYWxpZChyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZS5tZXNzYWdlQ29kZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZVtdPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlcygpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZWRDb250ZW50VHlwZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZWRDb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcbiAgICB9KTtcblxuICAgIC8qcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50X3R5cGVfY2FjaGUvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpOyovXG4gIH1cblxuICAvKipcbiAgICogSW5zdGFsbHMgYSBjb250ZW50IHR5cGUgb24gdGhlIHNlcnZlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgaW5zdGFsbENvbnRlbnRUeXBlKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKG5zLmdldEFqYXhVcmwoJ2xpYnJhcnktaW5zdGFsbCcsIHtpZDogaWR9KSwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgYm9keTogJydcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcbiAgfVxuXG5cbiAgLy8gZm9yIHRlc3Rpbmcgd2l0aCBlcnJvclxuICAvKmluc3RhbGxDb250ZW50VHlwZShpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9bGlicmFyeS1pbnN0YWxsYCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH0qL1xuXG4gIC8qKlxuICAgKiBVcGxvYWRzIGEgY29udGVudCB0eXBlIHRvIHRoZSBzZXJ2ZXIgZm9yIHZhbGlkYXRpb25cbiAgICpcbiAgICogQHBhcmFtIHtGb3JtRGF0YX0gZm9ybURhdGEgRm9ybSBjb250YWluaW5nIHRoZSBoNXAgdGhhdCBzaG91bGQgYmUgdXBsb2FkZWQgYXMgJ2g1cCdcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGpzb24gY29udGFpbmluZyB0aGUgY29udGVudCBqc29uIGFuZCB0aGUgaDVwIGpzb25cbiAgICovXG4gIHVwbG9hZENvbnRlbnQoZm9ybURhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktdXBsb2FkYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgYm9keTogZm9ybURhdGFcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuXG4vKipcbiAqICBUcmFuc2Zvcm1zIGEgRE9NIGNsaWNrIGV2ZW50IGludG8gYW4gRXZlbnRmdWwncyBldmVudFxuICogIEBzZWUgRXZlbnRmdWxcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmcgfCBPYmplY3R9IHR5cGVcbiAqIEBwYXJhbSAge0V2ZW50ZnVsfSBldmVudGZ1bFxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgcmVsYXlDbGlja0V2ZW50QXMgPSBjdXJyeShmdW5jdGlvbih0eXBlLCBldmVudGZ1bCwgZWxlbWVudCkge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGV2ZW50ZnVsLnRyaWdnZXIodHlwZSwge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGlkOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gZG9uJ3QgYnViYmxlXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50O1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCJpbXBvcnQgeyBpbml0Q29sbGFwc2libGUgfSBmcm9tICcuLi91dGlscy9jb2xsYXBzaWJsZSc7XG5cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBpbml0Q29sbGFwc2libGUoZWxlbWVudCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSFpwWlhkQ2IzZzlJakFnTUNBME1EQWdNakkxSWo0TkNpQWdQR1JsWm5NK0RRb2dJQ0FnUEhOMGVXeGxQZzBLSUNBZ0lDQWdMbU5zY3kweElIc05DaUFnSUNBZ0lHWnBiR3c2SUc1dmJtVTdEUW9nSUNBZ0lDQjlEUW9OQ2lBZ0lDQWdJQzVqYkhNdE1pQjdEUW9nSUNBZ0lDQm1hV3hzT2lBall6WmpObU0zT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1zSUM1amJITXROQ0I3RFFvZ0lDQWdJQ0JtYVd4c09pQWpabVptT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1nZXcwS0lDQWdJQ0FnYjNCaFkybDBlVG9nTUM0M093MEtJQ0FnSUNBZ2ZRMEtJQ0FnSUR3dmMzUjViR1UrRFFvZ0lEd3ZaR1ZtY3o0TkNpQWdQSFJwZEd4bFBtTnZiblJsYm5RZ2RIbHdaU0J3YkdGalpXaHZiR1JsY2w4eVBDOTBhWFJzWlQ0TkNpQWdQR2NnYVdROUlreGhlV1Z5WHpJaUlHUmhkR0V0Ym1GdFpUMGlUR0Y1WlhJZ01pSStEUW9nSUNBZ1BHY2dhV1E5SW1OdmJuUmxiblJmZEhsd1pWOXdiR0ZqWldodmJHUmxjaTB4WDJOdmNIa2lJR1JoZEdFdGJtRnRaVDBpWTI5dWRHVnVkQ0IwZVhCbElIQnNZV05sYUc5c1pHVnlMVEVnWTI5d2VTSStEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxURWlJSGRwWkhSb1BTSTBNREFpSUdobGFXZG9kRDBpTWpJMUlpOCtEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxUSWlJSGc5SWpFeE1pNDFNU0lnZVQwaU5ETXVOREVpSUhkcFpIUm9QU0l4TnpZdU9UWWlJR2hsYVdkb2REMGlNVE0xTGpRMUlpQnllRDBpTVRBaUlISjVQU0l4TUNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE16WXVOallpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5URXVORGtpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5qWXVNU0lnWTNrOUlqWXhMams0SWlCeVBTSTBMamd4SWk4K0RRb2dJQ0FnSUNBOFp5QnBaRDBpWDBkeWIzVndYeUlnWkdGMFlTMXVZVzFsUFNJbWJIUTdSM0p2ZFhBbVozUTdJajROQ2lBZ0lDQWdJQ0FnUEdjZ2FXUTlJbDlIY205MWNGOHlJaUJrWVhSaExXNWhiV1U5SWlac2REdEhjbTkxY0NabmREc2lQZzBLSUNBZ0lDQWdJQ0FnSUR4d1lYUm9JR2xrUFNKZlEyOXRjRzkxYm1SZlVHRjBhRjhpSUdSaGRHRXRibUZ0WlQwaUpteDBPME52YlhCdmRXNWtJRkJoZEdnbVozUTdJaUJqYkdGemN6MGlZMnh6TFRRaUlHUTlJazB5TmpNdU1qZ3NPVFV1TWpGRE1qWXdMRGt5TGpBM0xESTFOU3c1TVM0MUxESTBPQzQwTXl3NU1TNDFTREl5TjNZNFNERTVPUzQxYkMweUxqRTNMREV3TGpJMFlUSTFMamcwTERJMUxqZzBMREFzTUN3eExERXhMalE0TFRFdU5qTXNNVGt1T1RNc01Ua3VPVE1zTUN3d0xERXNNVFF1TXprc05TNDFOeXd4T0M0eU5pd3hPQzR5Tml3d0xEQXNNU3cxTGpVeUxERXpMallzTWpNdU1URXNNak11TVRFc01Dd3dMREV0TWk0NE5Dd3hNUzR3TlN3eE9DNDJOU3d4T0M0Mk5Td3dMREFzTVMwNExqQTJMRGN1Tnprc09TdzVMREFzTUN3eExUUXVNVElzTVM0ek4wZ3lNeloyTFRJeGFERXdMalF5WXpjdU16WXNNQ3d4TWk0NE15MHhMall4TERFMkxqUXlMVFZ6TlM0ek9DMDNMalE0TERVdU16Z3RNVE11TkRSRE1qWTRMakl5TERFd01pNHlPU3d5TmpZdU5UY3NPVGd1TXpVc01qWXpMakk0TERrMUxqSXhXbTB0TVRVc01UZGpMVEV1TkRJc01TNHlNaTB6TGprc01TNHlOUzAzTGpReExERXVNalZJTWpNMmRpMHhOR2cxTGpZeVlUa3VOVGNzT1M0MU55d3dMREFzTVN3M0xESXVPVE1zTnk0d05TdzNMakExTERBc01Dd3hMREV1T0RVc05DNDVNa0UyTGpNekxEWXVNek1zTUN3d0xERXNNalE0TGpNeExERXhNaTR5TlZvaUx6NE5DaUFnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpWDFCaGRHaGZJaUJrWVhSaExXNWhiV1U5SWlac2REdFFZWFJvSm1kME95SWdZMnhoYzNNOUltTnNjeTAwSWlCa1BTSk5NakF5TGprc01URTVMakV4WVRndU1USXNPQzR4TWl3d0xEQXNNQzAzTGpJNExEUXVOVEpzTFRFMkxURXVNaklzTnk0eU1pMHpNQzQ1TWtneE56UjJNakpJTVRVemRpMHlNa2d4TXpaMk5UWm9NVGQyTFRJeGFESXhkakl4YURJd0xqTXhZeTB5TGpjeUxEQXROUzB4TGpVekxUY3RNMkV4T1M0eE9Td3hPUzR4T1N3d0xEQXNNUzAwTGpjekxUUXVPRE1zTWpNdU5UZ3NNak11TlRnc01Dd3dMREV0TXkwMkxqWnNNVFl0TWk0eU5tRTRMakV4TERndU1URXNNQ3d4TERBc055NHlOaTB4TVM0M01sb2lMejROQ2lBZ0lDQWdJQ0FnUEM5blBnMEtJQ0FnSUNBZ1BDOW5QZzBLSUNBZ0lDQWdQSEpsWTNRZ1kyeGhjM005SW1Oc2N5MHpJaUI0UFNJeE56Y3VOallpSUhrOUlqVTNMalkySWlCM2FXUjBhRDBpT1RJdU1qZ2lJR2hsYVdkb2REMGlPUzR6T0NJZ2NuZzlJak11TlNJZ2NuazlJak11TlNJdlBnMEtJQ0FnSUR3dlp6NE5DaUFnUEM5blBnMEtQQzl6ZG1jK0RRbz1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBIdWJWaWV3IGZyb20gJy4vaHViLXZpZXcnO1xuaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvbiBmcm9tICcuL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uJztcbmltcG9ydCBVcGxvYWRTZWN0aW9uIGZyb20gJy4vdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24nO1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4vaHViLXNlcnZpY2VzJztcbmltcG9ydCBEaWN0aW9uYXJ5IGZyb20gJy4vdXRpbHMvZGljdGlvbmFyeSc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBIdWJTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRpdGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbklkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGV4cGFuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYXBpUm9vdFVybFxuICovXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEVycm9yTWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlcnJvckNvZGVcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBTZWxlY3RlZEVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpZFxuICovXG4vKipcbiAqIFNlbGVjdCBldmVudFxuICogQGV2ZW50IEh1YiNzZWxlY3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogRXJyb3IgZXZlbnRcbiAqIEBldmVudCBIdWIjZXJyb3JcbiAqIEB0eXBlIHtFcnJvck1lc3NhZ2V9XG4gKi9cbi8qKlxuICogVXBsb2FkIGV2ZW50XG4gKiBAZXZlbnQgSHViI3VwbG9hZFxuICogQHR5cGUge09iamVjdH1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBIdWIjZXJyb3JcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUsIGRpY3Rpb25hcnkpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBTZXR0aW5nIHVwIERpY3Rpb25hcnlcbiAgICBEaWN0aW9uYXJ5LmluaXQoZGljdGlvbmFyeSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gY29udHJvbGxlcnNcbiAgICB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbiA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb24oc3RhdGUsIHRoaXMuc2VydmljZXMpO1xuICAgIHRoaXMudXBsb2FkU2VjdGlvbiA9IG5ldyBVcGxvYWRTZWN0aW9uKHN0YXRlLCB0aGlzLnNlcnZpY2VzKTtcblxuICAgIC8vIHZpZXdzXG4gICAgdGhpcy52aWV3ID0gbmV3IEh1YlZpZXcoc3RhdGUpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGNvbnRyb2xsZXIgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24pO1xuICAgIHRoaXMucHJvcGFnYXRlKFsndXBsb2FkJ10sIHRoaXMudXBsb2FkU2VjdGlvbik7XG5cbiAgICAvLyBoYW5kbGUgZXZlbnRzXG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy5zZXRQYW5lbFRpdGxlLCB0aGlzKTtcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnZpZXcuY2xvc2VQYW5lbCwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcub24oJ3RhYi1jaGFuZ2UnLCB0aGlzLnZpZXcuc2V0U2VjdGlvblR5cGUsIHRoaXMudmlldyk7XG4gICAgdGhpcy52aWV3Lm9uKCdwYW5lbC1jaGFuZ2UnLCB0aGlzLnZpZXcudG9nZ2xlUGFuZWxPcGVuLmJpbmQodGhpcy52aWV3KSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5vbigncmVsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnNlcnZpY2VzLnNldHVwKCk7XG4gICAgICBzZWxmLmNvbnRlbnRUeXBlU2VjdGlvbi5pbml0Q29udGVudFR5cGVMaXN0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmluaXRUYWJQYW5lbChzdGF0ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwcm9taXNlIG9mIGEgY29udGVudCB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBnZXRDb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZSBvZiB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRQYW5lbFRpdGxlKHtpZH0pwqB7XG4gICAgdGhpcy5nZXRDb250ZW50VHlwZShpZCkudGhlbigoe3RpdGxlfSkgPT4gdGhpcy52aWV3LnNldFRpdGxlKHRpdGxlKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSB0YWIgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxuICAgKi9cbiAgaW5pdFRhYlBhbmVsKHsgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnIH0pIHtcbiAgICBjb25zdCB0YWJDb25maWdzID0gW3tcbiAgICAgIHRpdGxlOiAnQ3JlYXRlIENvbnRlbnQnLFxuICAgICAgaWQ6ICdjb250ZW50LXR5cGVzJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMuY29udGVudFR5cGVTZWN0aW9uLmdldEVsZW1lbnQoKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnVXBsb2FkJyxcbiAgICAgIGlkOiAndXBsb2FkJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMudXBsb2FkU2VjdGlvbi5nZXRFbGVtZW50KClcbiAgICB9XTtcblxuICAgIC8vIHNldHMgdGhlIGNvcnJlY3Qgb25lIHNlbGVjdGVkXG4gICAgdGFiQ29uZmlnc1xuICAgICAgLmZpbHRlcihjb25maWcgPT4gY29uZmlnLmlkID09PSBzZWN0aW9uSWQpXG4gICAgICAuZm9yRWFjaChjb25maWcgPT4gY29uZmlnLnNlbGVjdGVkID0gdHJ1ZSk7XG5cbiAgICB0YWJDb25maWdzLmZvckVhY2godGFiQ29uZmlnID0+IHRoaXMudmlldy5hZGRUYWIodGFiQ29uZmlnKSk7XG4gICAgdGhpcy52aWV3LmFkZEJvdHRvbUJvcmRlcigpOyAvLyBBZGRzIGFuIGFuaW1hdGVkIGJvdHRvbSBib3JkZXIgdG8gZWFjaCB0YWJcbiAgICB0aGlzLnZpZXcuaW5pdFRhYlBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IGluIHRoZSB2aWV3XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZXMvbWFpbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCByZW1vdmVDaGlsZCwgaGlkZSwgc2hvdyB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgY3VycnksIGZvckVhY2ggfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiO1xuaW1wb3J0IGluaXRJbWFnZVNjcm9sbGVyIGZyb20gXCJjb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyXCI7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5pbXBvcnQgbm9JY29uIGZyb20gJy4uLy4uL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnJztcbmltcG9ydCBEaWN0aW9uYXJ5IGZyb20gJy4uL3V0aWxzL2RpY3Rpb25hcnknO1xuXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7bnVtYmVyfVxuICovXG5jb25zdCBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OID0gMzAwO1xuXG4vKipcbiAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgaWYgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGVsZW1lbnQsIHZpc2libGUpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBlbXB0eVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbXB0eSA9ICh0ZXh0KSA9PiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSAmJiAodGV4dC5sZW5ndGggPT09IDApO1xuXG5jb25zdCBoaWRlQWxsID0gZm9yRWFjaChoaWRlKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIHZpZXdcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVWaWV3KCk7XG5cbiAgICAvLyBncmFiIHJlZmVyZW5jZXNcbiAgICB0aGlzLmJ1dHRvbkJhciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1iYXInKTtcbiAgICB0aGlzLnVzZUJ1dHRvbiA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tdXNlJyk7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsJyk7XG4gICAgdGhpcy5idXR0b25zID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvckFsbCgnLmJ1dHRvbicpO1xuXG4gICAgdGhpcy5pbWFnZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtdHlwZS1pbWFnZScpO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWRldGFpbHMgLnRpdGxlJyk7XG4gICAgdGhpcy5vd25lciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bmVyJyk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZGV0YWlscyAuc21hbGwnKTtcbiAgICB0aGlzLmRlbW9CdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZW1vLWJ1dHRvbicpO1xuICAgIHRoaXMuY2Fyb3VzZWwgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbCcpO1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0ID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICAgIHRoaXMubGljZW5jZVBhbmVsID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubGljZW5jZS1wYW5lbCcpO1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnN0YWxsLW1lc3NhZ2UnKTtcblxuICAgIC8vIGhpZGUgbWVzc2FnZSBvbiBjbG9zZSBidXR0b24gY2xpY2tcbiAgICBsZXQgaW5zdGFsbE1lc3NhZ2VDbG9zZSA9IHRoaXMuaW5zdGFsbE1lc3NhZ2UucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtY2xvc2UnKTtcbiAgICBpbnN0YWxsTWVzc2FnZUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGlkZSh0aGlzLmluc3RhbGxNZXNzYWdlKSk7XG5cbiAgICAvLyBpbml0IGludGVyYWN0aXZlIGVsZW1lbnRzXG4gICAgaW5pdFBhbmVsKHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICBpbml0SW1hZ2VTY3JvbGxlcih0aGlzLmNhcm91c2VsKTtcblxuICAgIC8vIGZpcmUgZXZlbnRzIG9uIGJ1dHRvbiBjbGlja1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2stYnV0dG9uJykpO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2luc3RhbGwnLCB0aGlzLCB0aGlzLmluc3RhbGxCdXR0b24pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIHZpZXcgYXMgYSBIVE1MRWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZVZpZXcgKCkge1xuICAgIGxldCBsYWJlbEJhY2sgPSAnQmFjayc7IC8vIHRvZG8gdHJhbnNsYXRlIG1lXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYmFjay1idXR0b24gaWNvbi1hcnJvdy10aGlja1wiIGFyaWEtbGFiZWw9XCIke2xhYmVsQmFja31cIiB0YWJpbmRleD1cIjBcIj48L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLXdyYXBwZXJcIj48aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmUgY29udGVudC10eXBlLWltYWdlXCIgc3JjPVwiJHtub0ljb259XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWRldGFpbHNcIj5cbiAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPjwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bmVyXCI+PC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3M9XCJzbWFsbFwiPjwvcD5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbiBkZW1vLWJ1dHRvblwiIHRhcmdldD1cIl9ibGFua1wiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBocmVmPVwiI1wiPkNvbnRlbnQgRGVtbzwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbFwiIHJvbGU9XCJyZWdpb25cIiBkYXRhLXNpemU9XCI1XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIHByZXZpb3VzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGlzYWJsZWQ+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1idXR0b24gbmV4dFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRpc2FibGVkPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgIDxuYXYgY2xhc3M9XCJzY3JvbGxlclwiPlxuICAgICAgICAgIDx1bD48L3VsPlxuICAgICAgICA8L25hdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGhyIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5zdGFsbC1tZXNzYWdlIG1lc3NhZ2UgZGlzbWlzc2libGUgc2ltcGxlIGluZm9cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtY2xvc2UgaWNvbi1jbG9zZVwiPjwvZGl2PlxuICAgICAgICA8aDM+PC9oMz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1iYXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnkgYnV0dG9uLXVzZVwiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBkYXRhLWlkPVwiXCI+VXNlPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGF0YS1pZD1cIlwiPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj4ke0RpY3Rpb25hcnkuZ2V0KCdpbnN0YWxsQnV0dG9uTGFiZWwnKX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnkgYnV0dG9uLWluc3RhbGxpbmdcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48c3BhbiBjbGFzcz1cImljb24tbG9hZGluZy1zZWFyY2ggaWNvbi1zcGluXCI+PC9zcGFuPkluc3RhbGxpbmc8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ncm91cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgbGljZW5jZS1wYW5lbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkZXJcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBhcmlhLWNvbnRyb2xzPVwibGljZW5jZS1wYW5lbFwiPjxzcGFuIGNsYXNzPVwiaWNvbi1hY2NvcmRpb24tYXJyb3dcIj48L3NwYW4+IFRoZSBMaWNlbmNlIEluZm88L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiIGlkPVwibGljZW5jZS1wYW5lbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHktaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBhIG1lc3NhZ2Ugb24gaW5zdGFsbFxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHN1Y2Nlc3NcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICovXG4gIHNldEluc3RhbGxNZXNzYWdlKHsgc3VjY2VzcyA9IHRydWUsIG1lc3NhZ2UgfSl7XG4gICAgdGhpcy5pbnN0YWxsTWVzc2FnZS5xdWVyeVNlbGVjdG9yKCdoMycpLmlubmVyVGV4dCA9IG1lc3NhZ2U7XG4gICAgdGhpcy5pbnN0YWxsTWVzc2FnZS5jbGFzc05hbWUgPSBgaW5zdGFsbC1tZXNzYWdlIGRpc21pc3NpYmxlIG1lc3NhZ2Ugc2ltcGxlICR7c3VjY2VzcyA/ICdpbmZvJyA6ICdlcnJvcid9YDtcbiAgICBzaG93KHRoaXMuaW5zdGFsbE1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGltYWdlcyBmcm9tIHRoZSBjYXJvdXNlbFxuICAgKi9cbiAgcmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCgpIHtcbiAgICB0aGlzLmNhcm91c2VsTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmZvckVhY2gocmVtb3ZlQ2hpbGQodGhpcy5jYXJvdXNlbExpc3QpKTtcbiAgICB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbC1saWdodGJveCcpLmZvckVhY2gocmVtb3ZlQ2hpbGQodGhpcy5jYXJvdXNlbCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpbWFnZSB0byB0aGUgY2Fyb3VzZWxcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGltYWdlXG4gICAqL1xuICBhZGRJbWFnZVRvQ2Fyb3VzZWwoaW1hZ2UpIHtcbiAgICAvLyBhZGQgbGlnaHRib3hcbiAgICBjb25zdCBsaWdodGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxpZ2h0Ym94LmlkID0gYGxpZ2h0Ym94LSR7dGhpcy5jYXJvdXNlbExpc3QuY2hpbGRFbGVtZW50Q291bnR9YDtcbiAgICBsaWdodGJveC5jbGFzc05hbWUgPSAnY2Fyb3VzZWwtbGlnaHRib3gnO1xuICAgIGxpZ2h0Ym94LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGxpZ2h0Ym94LmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBzcmM9XCIke2ltYWdlLnVybH1cIiBhbHQ9XCIke2ltYWdlLmFsdH1cIj5gO1xuICAgIHRoaXMuY2Fyb3VzZWwuYXBwZW5kQ2hpbGQobGlnaHRib3gpO1xuXG4gICAgLy8gYWRkIHRodW1ibmFpbFxuICAgIGNvbnN0IHRodW1ibmFpbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdGh1bWJuYWlsLmNsYXNzTmFtZSA9ICdzbGlkZSc7XG4gICAgdGh1bWJuYWlsLmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIiR7aW1hZ2UudXJsfVwiIGFsdD1cIiR7aW1hZ2UuYWx0fVwiIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBhcmlhLWNvbnRyb2xzPVwiJHtsaWdodGJveC5pZH1cIiAvPmA7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QuYXBwZW5kQ2hpbGQodGh1bWJuYWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICByZXNldCgpIHtcbiAgICBoaWRlKHRoaXMuaW5zdGFsbE1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGltYWdlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAgICovXG4gIHNldEltYWdlKHNyYykge1xuICAgIHRoaXMuaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMgfHwgbm9JY29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldElkKGlkKSB7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gICAgdGhpcy51c2VCdXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBgJHt0aXRsZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovXG4gIHNldERlc2NyaXB0aW9uKHRleHQpIHtcbiAgICBpZih0ZXh0Lmxlbmd0aCA+IE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04pIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGhpcy5lbGxpcHNpcyhNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OLCB0ZXh0KX08c3BhbiBjbGFzcz1cInJlYWQtbW9yZSBsaW5rXCI+UmVhZCBtb3JlPC9zcGFuPmA7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKCcucmVhZC1tb3JlLCAucmVhZC1sZXNzJylcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkKHRleHQpKTtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBSZWFkIGxlc3MgYW5kIFJlYWQgbW9yZSB0ZXh0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICB0b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkKHRleHQpIHtcbiAgICAvLyBmbGlwIGJvb2xlYW5cbiAgICB0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQgPSAhdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkO1xuXG4gICAgaWYodGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkKSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RleHR9PHNwYW4gY2xhc3M9XCJyZWFkLWxlc3MgbGlua1wiPlJlYWQgbGVzczwvc3Bhbj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGhpcy5lbGxpcHNpcyhNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OLCB0ZXh0KX08c3BhbiBjbGFzcz1cInJlYWQtbW9yZSBsaW5rXCI+UmVhZCBtb3JlPC9zcGFuPmA7XG4gICAgfVxuXG4gICAgdGhpcy5kZXNjcmlwdGlvblxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5yZWFkLW1vcmUsIC5yZWFkLWxlc3MnKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkKHRleHQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG9ydGVucyBhIHN0cmluZywgYW5kIHB1dHMgYW4gZWxpcHNpcyBhdCB0aGUgZW5kXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBlbGxpcHNpcyhzaXplLCB0ZXh0KSB7XG4gICAgcmV0dXJuIGAke3RleHQuc3Vic3RyKDAsIHNpemUpfS4uLmA7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbGljZW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKi9cbiAgc2V0TGljZW5jZSh0eXBlKSB7XG4gICAgaWYodHlwZSl7XG4gICAgICB0aGlzLmxpY2VuY2VQYW5lbC5xdWVyeVNlbGVjdG9yKCcucGFuZWwtYm9keS1pbm5lcicpLmlubmVyVGV4dCA9IHR5cGU7XG4gICAgICBzaG93KHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoaWRlKHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbG9uZyBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3duZXJcbiAgICovXG4gIHNldE93bmVyKG93bmVyKSB7XG4gICAgaWYob3duZXIpIHtcbiAgICAgIHRoaXMub3duZXIuaW5uZXJIVE1MID0gYEJ5ICR7b3duZXJ9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLm93bmVyLmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBleGFtcGxlIHVybFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBzZXRFeGFtcGxlKHVybCkge1xuICAgIHRoaXMuZGVtb0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwgfHwgJyMnKTtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuZGVtb0J1dHRvbiwgIWlzRW1wdHkodXJsKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBpZiB0aGUgY29udGVudCB0eXBlIGlzIGluc3RhbGxlZFxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluc3RhbGxlZFxuICAgKi9cbiAgc2V0SXNJbnN0YWxsZWQoaW5zdGFsbGVkKSB7XG4gICAgdGhpcy5zaG93QnV0dG9uQnlTZWxlY3RvcihpbnN0YWxsZWQgPyAnLmJ1dHRvbi11c2UnIDogJy5idXR0b24taW5zdGFsbCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcmtzIGNvbnRlbnQgdHlwZSBhcyByZXN0cmljdGVkLCBkaXNhYmxpbmcgaW5zdGFsbGluZyBhbmQgdXNpbmcgdGhlIGNvbnRlbnQgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSByZXN0cmljdGVkIFRydWUgaWYgY29udGVudCB0eXBlIGlzIHJlc3RyaWN0ZWRcbiAgICovXG4gIHNldElzUmVzdHJpY3RlZChyZXN0cmljdGVkKSB7XG4gICAgdGhpcy51c2VCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHJlc3RyaWN0ZWQgPyAnZGlzYWJsZWQnIDogJycpO1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgcmVzdHJpY3RlZCA/ICdkaXNhYmxlZCcgOiAnJyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgYWxsIGJ1dHRvbnMgYW5kIHNob3dzIHRoZSBidXR0b24gb24gdGhlIHNlbGVjdG9yIGFnYWluXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfXNlbGVjdG9yXG4gICAqL1xuICBzaG93QnV0dG9uQnlTZWxlY3RvcihzZWxlY3Rvcikge1xuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgaWYoYnV0dG9uKSB7XG4gICAgICBoaWRlQWxsKHRoaXMuYnV0dG9ucyk7XG4gICAgICBzaG93KGJ1dHRvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlRGV0YWlsVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXdcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBzZXJ2aWNlcykge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gc2VydmljZXM7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlRGV0YWlsVmlldyhzdGF0ZSk7XG4gICAgdGhpcy52aWV3Lm9uKCdpbnN0YWxsJywgdGhpcy5pbnN0YWxsLCB0aGlzKTtcblxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ2Nsb3NlJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBsb2FkQnlJZChpZCkge1xuICAgIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICAgaW5zdGFsbCh7aWR9KSB7XG4gICAgIC8vIHNldCBzcGlubmVyXG4gICAgIHRoaXMudmlldy5zaG93QnV0dG9uQnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsaW5nJyk7XG5cbiAgICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gdGhpcy5zZXJ2aWNlcy5pbnN0YWxsQ29udGVudFR5cGUoY29udGVudFR5cGUubWFjaGluZU5hbWUpKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IHtcbiAgICAgICAgIHRoaXMudmlldy5zZXRJc0luc3RhbGxlZCh0cnVlKTtcbiAgICAgICAgIHRoaXMudmlldy5zaG93QnV0dG9uQnlTZWxlY3RvcignLmJ1dHRvbi1nZXQnKTtcbiAgICAgICAgIHRoaXMudmlldy5zZXRJbnN0YWxsTWVzc2FnZSh7XG4gICAgICAgICAgIG1lc3NhZ2U6IGAke2NvbnRlbnRUeXBlLnRpdGxlfSBzdWNjZXNzZnVsbHkgaW5zdGFsbGVkIWAsXG4gICAgICAgICB9KTtcbiAgICAgICB9KVxuICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICB0aGlzLnZpZXcuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoJy5idXR0b24taW5zdGFsbCcpO1xuXG4gICAgICAgICAvLyBwcmludCBlcnJvciBtZXNzYWdlXG4gICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gKGVycm9yLmVycm9yQ29kZSkgPyBlcnJvciA6IHtcbiAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgIGVycm9yQ29kZTogJ1JFU1BPTlNFX0ZBSUxFRCcsXG4gICAgICAgICAgIG1lc3NhZ2U6IGAke2lkfSBjb3VsZCBub3QgYmUgaW5zdGFsbGVkISBDb250YWN0IHlvdXIgYWRtaW5pc3RyYXRvci5gLFxuICAgICAgICAgfTtcbiAgICAgICAgIHRoaXMudmlldy5zZXRJbnN0YWxsTWVzc2FnZShlcnJvck1lc3NhZ2UpO1xuXG4gICAgICAgICAvLyBsb2cgd2hvbGUgZXJyb3IgbWVzc2FnZSB0byBjb25zb2xlXG4gICAgICAgICBjb25zb2xlLmVycm9yKCdJbnN0YWxsYXRpb24gZXJyb3InLCBlcnJvcik7XG4gICAgICAgfSk7XG4gICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZpZXcgd2l0aCB0aGUgY29udGVudCB0eXBlIGRhdGFcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZSkge1xuICAgIHRoaXMudmlldy5yZXNldCgpO1xuICAgIHRoaXMudmlldy5zZXRJZChjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG4gICAgdGhpcy52aWV3LnNldFRpdGxlKGNvbnRlbnRUeXBlLnRpdGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0RGVzY3JpcHRpb24oY29udGVudFR5cGUuZGVzY3JpcHRpb24pO1xuICAgIHRoaXMudmlldy5zZXRJbWFnZShjb250ZW50VHlwZS5pY29uKTtcbiAgICB0aGlzLnZpZXcuc2V0RXhhbXBsZShjb250ZW50VHlwZS5leGFtcGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0T3duZXIoY29udGVudFR5cGUub3duZXIpO1xuICAgIHRoaXMudmlldy5zZXRJc0luc3RhbGxlZChjb250ZW50VHlwZS5pbnN0YWxsZWQpO1xuICAgIHRoaXMudmlldy5zZXRMaWNlbmNlKGNvbnRlbnRUeXBlLmxpY2Vuc2UpO1xuICAgIHRoaXMudmlldy5zZXRJc1Jlc3RyaWN0ZWQoY29udGVudFR5cGUucmVzdHJpY3RlZCk7XG5cbiAgICAvLyB1cGRhdGUgY2Fyb3VzZWxcbiAgICB0aGlzLnZpZXcucmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCgpO1xuICAgIGNvbnRlbnRUeXBlLnNjcmVlbnNob3RzLmZvckVhY2godGhpcy52aWV3LmFkZEltYWdlVG9DYXJvdXNlbCwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCByZW1vdmVDaGlsZCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IENvbnRyb2xzIGZyb20gJ2g1cC1zZGstdWkvc3JjL3NjcmlwdHMvY29udHJvbHMnO1xuaW1wb3J0IEtleWJvYXJkIGZyb20gJ2g1cC1zZGstdWkvc3JjL3NjcmlwdHMvdWkva2V5Ym9hcmQnO1xuaW1wb3J0IG5vSWNvbiBmcm9tICcuLi8uLi9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Zyc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgZ2V0Um93SWQgPSBnZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gaW5zdGFsbCBjb250cm9sc1xuICAgIHRoaXMuY29udHJvbHMgPSBuZXcgQ29udHJvbHMoW25ldyBLZXlib2FyZCgpXSk7XG4gICAgdGhpcy5jb250cm9scy5vbignc2VsZWN0JywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5maXJlKCdyb3ctc2VsZWN0ZWQnLCB7XG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LmVsZW1lbnQsXG4gICAgICAgIGlkOiBnZXRSb3dJZChldmVudC5lbGVtZW50KVxuICAgICAgfSlcbiAgICB9KTtcblxuICAgIC8vIGNyZWF0ZSByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Jyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWxpc3QnO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgcm93cyBmcm9tIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgcmVtb3ZlQWxsUm93cygpIHtcbiAgICB3aGlsZSh0aGlzLnJvb3RFbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSl7XG4gICAgICBsZXQgcm93ID0gdGhpcy5yb290RWxlbWVudC5sYXN0Q2hpbGQ7XG5cbiAgICAgIHRoaXMuY29udHJvbHMucmVtb3ZlRWxlbWVudChyb3cpO1xuICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVDaGlsZChyb3cpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcm93XG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICBhZGRSb3coY29udGVudFR5cGUpIHtcbiAgICBjb25zdCByb3cgPSB0aGlzLmNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCB0aGlzKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncm93LXNlbGVjdGVkJywgdGhpcywgcm93KTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgdGhpcy5jb250cm9scy5hZGRFbGVtZW50KHJvdyk7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSBDb250ZW50IFR5cGUgY29uZmlndXJhdGlvbiBhbmQgY3JlYXRlcyBhIHJvdyBkb21cbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gc2NvcGVcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgc2NvcGUpIHtcbiAgICAvLyBjcmVhdGUgaWRzXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykubGVuZ3RoO1xuICAgIGNvbnN0IGNvbnRlbnRUeXBlUm93VGl0bGVJZCA9IGBjb250ZW50LXR5cGUtcm93LXRpdGxlLSR7aW5kZXh9YDtcbiAgICBjb25zdCBjb250ZW50VHlwZVJvd0Rlc2NyaXB0aW9uSWQgPSBgY29udGVudC10eXBlLXJvdy1kZXNjcmlwdGlvbi0ke2luZGV4fWA7XG5cbiAgICAvLyBmaWVsZCBjb25maWd1cmF0aW9uXG4gICAgY29uc3QgdXNlQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnVXNlJywgY2xzOiAnYnV0dG9uLXByaW1hcnknLCBpY29uOiAnJyB9O1xuICAgIGNvbnN0IGluc3RhbGxCdXR0b25Db25maWcgPSB7IHRleHQ6ICdHZXQnLCBjbHM6ICdidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsJywgaWNvbjogJ2ljb24tYXJyb3ctdGhpY2snfTtcbiAgICBjb25zdCBidXR0b24gPSBjb250ZW50VHlwZS5pbnN0YWxsZWQgPyAgdXNlQnV0dG9uQ29uZmlnOiBpbnN0YWxsQnV0dG9uQ29uZmlnO1xuICAgIGNvbnN0IHRpdGxlID0gY29udGVudFR5cGUudGl0bGUgfHwgY29udGVudFR5cGUubWFjaGluZU5hbWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBjb250ZW50VHlwZS5zdW1tYXJ5IHx8ICcnO1xuICAgIGNvbnN0IGltYWdlID0gY29udGVudFR5cGUuaWNvbiB8fCBub0ljb247XG4gICAgY29uc3QgZGlzYWJsZWQgPSBjb250ZW50VHlwZS5yZXN0cmljdGVkID8gJ2Rpc2FibGVkPVwiZGlzYWJsZWRcIicgOiAnJztcblxuICAgIC8vIHJvdyBpdGVtXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC5pZCA9IGBjb250ZW50LXR5cGUtJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1gO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknLCBjb250ZW50VHlwZVJvd1RpdGxlSWQpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JywgY29udGVudFR5cGVSb3dEZXNjcmlwdGlvbklkKTtcblxuICAgIC8vIGNyZWF0ZSBodG1sXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBzcmM9XCIke2ltYWdlfVwiPlxuICAgICAgPGJ1dHRvbiBhcmlhLWRlc2NyaWJlZGJ5PVwiJHtjb250ZW50VHlwZVJvd1RpdGxlSWR9XCIgY2xhc3M9XCJidXR0b24gJHtidXR0b24uY2xzfVwiIGRhdGEtaWQ9XCIke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfVwiIHRhYmluZGV4PVwiMFwiICR7ZGlzYWJsZWR9PlxuICAgICAgICA8c3BhbiBjbGFzcz1cIiR7YnV0dG9uLmljb259XCI+PC9zcGFuPlxuICAgICAgICAke2J1dHRvbi50ZXh0fVxuICAgICAgPC9idXR0b24+XG4gICAgICA8aDQgaWQ9XCIke2NvbnRlbnRUeXBlUm93VGl0bGVJZH1cIj4ke3RpdGxlfTwvaDQ+XG4gICAgICA8ZGl2IGlkPVwiJHtjb250ZW50VHlwZVJvd0Rlc2NyaXB0aW9uSWR9XCIgY2xhc3M9XCJkZXNjcmlwdGlvblwiPiR7ZGVzY3JpcHRpb259PC9kaXY+XG4gICBgO1xuXG4gICAgLy8gaGFuZGxlIHVzZSBidXR0b25cbiAgICBjb25zdCB1c2VCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tcHJpbWFyeScpO1xuICAgIGlmKHVzZUJ1dHRvbil7XG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0Jywgc2NvcGUsIHVzZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlTGlzdFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWxpc3Qtdmlld1wiO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBSb3cgc2VsZWN0ZWQgZXZlbnRcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIFVwZGF0ZSBjb250ZW50IHR5cGUgbGlzdCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGFkZCB0aGUgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlTGlzdFZpZXcoc3RhdGUpO1xuICAgIHRoaXMucHJvcGFnYXRlKFsncm93LXNlbGVjdGVkJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGUgdGhpcyBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGlzIGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgd2l0aCBuZXcgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlcykge1xuICAgIHRoaXMudmlldy5yZW1vdmVBbGxSb3dzKCk7XG4gICAgY29udGVudFR5cGVzLmZvckVhY2godGhpcy52aWV3LmFkZFJvdywgdGhpcy52aWV3KTtcbiAgICB0aGlzLnRyaWdnZXIoJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHt9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZpZXdzIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwiaW1wb3J0IE1lc3NhZ2VWaWV3IGZyb20gXCIuLi9tZXNzYWdlLXZpZXcvbWVzc2FnZS12aWV3XCI7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIHF1ZXJ5U2VsZWN0b3JBbGwgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IGluaXROYXZiYXIgZnJvbSAnY29tcG9uZW50cy9uYXZiYXInO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCB1bnNlbGVjdEFsbCA9IGZvckVhY2gocmVtb3ZlQXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykpO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50QnJvd3NlclZpZXcge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGdlbmVyYWwgY29uZmlndXJhdGlvblxuICAgIHRoaXMudHlwZUFoZWFkRW5hYmxlZCA9IHRydWU7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudHNcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50KHN0YXRlKTtcblxuICAgIC8vIHBpY2sgZWxlbWVudHNcbiAgICB0aGlzLm1lbnUgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25hdicpO1xuICAgIHRoaXMubWVudWJhciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1uYXYnKTtcbiAgICB0aGlzLmlucHV0RmllbGQgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwic2VhcmNoXCJdIGlucHV0Jyk7XG4gICAgdGhpcy5kaXNwbGF5U2VsZWN0ZWQgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItdG9nZ2xlci1zZWxlY3RlZCcpO1xuICAgIGNvbnN0IGlucHV0QnV0dG9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInNlYXJjaFwiXSAuaW5wdXQtZ3JvdXAtYWRkb24nKTtcblxuICAgIC8vIGlucHV0IGZpZWxkXG4gICAgdGhpcy5pbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnQgPT4ge1xuICAgICAgbGV0IHNlYXJjaGJhciA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNodWItc2VhcmNoLWJhcicpO1xuXG4gICAgICAvLyBPbmx5IHNlYXJjaGluZyBpZiB0aGUgZW50ZXIga2V5IGlzIHByZXNzZWRcbiAgICAgIGlmICh0aGlzLnR5cGVBaGVhZEVuYWJsZWQgfHwgZXZlbnQud2hpY2ggPT0gMTMgfHwgZXZlbnQua2V5Q29kZSA9PSAxMykge1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ3NlYXJjaCcsIHtcbiAgICAgICAgICBlbGVtZW50OiBzZWFyY2hiYXIsXG4gICAgICAgICAgcXVlcnk6IHNlYXJjaGJhci52YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGlucHV0IGJ1dHRvblxuICAgIGlucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgIGxldCBzZWFyY2hiYXIgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKTtcblxuICAgICAgIHRoaXMudHJpZ2dlcignc2VhcmNoJywge1xuICAgICAgICAgZWxlbWVudDogc2VhcmNoYmFyLFxuICAgICAgICAgcXVlcnk6IHNlYXJjaGJhci52YWx1ZVxuICAgICAgIH0pO1xuXG4gICAgICAgc2VhcmNoYmFyLmZvY3VzKCk7XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtZW51IGdyb3VwIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlRWxlbWVudChzdGF0ZSkge1xuICAgIGxldCBtZW51dGl0bGUgPSAnQnJvd3NlIGNvbnRlbnQgdHlwZXMnO1xuICAgIGxldCBtZW51SWQgPSAnY29udGVudC10eXBlLWZpbHRlcic7XG4gICAgbGV0IHNlYXJjaFRleHQgPSAnU2VhcmNoIGZvciBDb250ZW50IFR5cGVzJztcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcnO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtZ3JvdXBcIj5cbiAgICAgICAgPG5hdiAgcm9sZT1cIm1lbnViYXJcIiBjbGFzcz1cIm5hdmJhclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItaGVhZGVyXCI+XG4gICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlciBuYXZiYXItdG9nZ2xlci1yaWdodFwiIGFyaWEtY29udHJvbHM9XCIke21lbnVJZH1cIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXItc2VsZWN0ZWRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24tYWNjb3JkaW9uLWFycm93XCI+PC9zcGFuPlxuICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLWJyYW5kXCI+JHttZW51dGl0bGV9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPHVsIGlkPVwiJHttZW51SWR9XCIgY2xhc3M9XCJuYXZiYXItbmF2XCI+PC91bD5cbiAgICAgICAgPC9uYXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCIgcm9sZT1cInNlYXJjaFwiPlxuICAgICAgICAgIDxpbnB1dCBpZD1cImh1Yi1zZWFyY2gtYmFyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXJvdW5kZWRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiJHtzZWFyY2hUZXh0fVwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGljb24tc2VhcmNoXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgZGlzcGxheU1lc3NhZ2UoY29uZmlnKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vIFNldCB0aGUgYWN0aW9uXG4gICAgLy8gVE9ETyAtIHNob3VsZCBiZSB0cmFuc2xhdGFibGVcbiAgICBjb25maWcuYWN0aW9uID0gXCJSZWxvYWRcIjtcblxuICAgIHZhciBtZXNzYWdlVmlldyA9IG5ldyBNZXNzYWdlVmlldyhjb25maWcpO1xuICAgIHZhciBlbGVtZW50ID0gbWVzc2FnZVZpZXcuZ2V0RWxlbWVudCgpO1xuXG4gICAgbWVzc2FnZVZpZXcub24oJ2FjdGlvbi1jbGlja2VkJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5yb290RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgc2VsZi50cmlnZ2VyKCdyZWxvYWQnKTtcbiAgICB9KTtcblxuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VWaWV3LmdldEVsZW1lbnQoKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG1lbnUgaXRlbVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWQgRGV0ZXJtaW5lcyBpZiB0YWIgaXMgYWxyZWFkeSBzZWxlY3RlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIE5hbWUgb2YgZXZlbnQgdGhhdCB0YWIgd2lsbCBmaXJlIG9mZlxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGFkZE1lbnVJdGVtKHsgdGl0bGUsIGlkLCBzZWxlY3RlZCwgZXZlbnROYW1lIH0pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51aXRlbScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgaWQpO1xuICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gdGl0bGU7XG5cbiAgICAvLyBzZXRzIGlmIHRoaXMgbWVudWl0ZW0gc2hvdWxkIGJlIHNlbGVjdGVkXG4gICAgaWYoc2VsZWN0ZWQpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgIHRoaXMuZGlzcGxheVNlbGVjdGVkLmlubmVyVGV4dCA9IHRpdGxlO1xuICAgICAgdGhpcy50cmlnZ2VyKCdtZW51LXNlbGVjdGVkJywge1xuICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICBjaG9pY2U6IGV2ZW50TmFtZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlcignbWVudS1zZWxlY3RlZCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBjaG9pY2U6IGV2ZW50TmFtZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgdG8gbWVudSBiYXJcbiAgICB0aGlzLm1lbnViYXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBpbnB1dCBmaWVsZFxuICAgKi9cbiAgY2xlYXJJbnB1dEZpZWxkKCkge1xuICAgIHRoaXMuaW5wdXRGaWVsZC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBmaWx0ZXJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdGVkTmFtZVxuICAgKi9cbiAgc2V0RGlzcGxheVNlbGVjdGVkKHNlbGVjdGVkTmFtZSkge1xuICAgIHRoaXMuZGlzcGxheVNlbGVjdGVkLmlubmVyVGV4dCA9IHNlbGVjdGVkTmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGEgbWVudSBpdGVtIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2VsZWN0TWVudUl0ZW1CeUlkKGlkKSB7XG4gICAgY29uc3QgbWVudUl0ZW1zID0gdGhpcy5tZW51YmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKTtcbiAgICBjb25zdCBzZWxlY3RlZE1lbnVJdGVtID0gdGhpcy5tZW51YmFyLnF1ZXJ5U2VsZWN0b3IoYFtyb2xlPVwibWVudWl0ZW1cIl1bZGF0YS1pZD1cIiR7aWR9XCJdYCk7XG5cbiAgICBpZihzZWxlY3RlZE1lbnVJdGVtKSB7XG4gICAgICB1bnNlbGVjdEFsbChtZW51SXRlbXMpO1xuICAgICAgc2VsZWN0ZWRNZW51SXRlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoJ21lbnUtc2VsZWN0ZWQnLCB7XG4gICAgICAgIGVsZW1lbnQ6IHNlbGVjdGVkTWVudUl0ZW0sXG4gICAgICAgIGlkOiBzZWxlY3RlZE1lbnVJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpbml0TWVudSgpIHtcbiAgICAvLyBjcmVhdGUgdGhlIHVuZGVybGluZVxuICAgIGNvbnN0IHVuZGVybGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB1bmRlcmxpbmUuY2xhc3NOYW1lID0gJ21lbnVpdGVtLXVuZGVybGluZSc7XG4gICAgdGhpcy5tZW51YmFyLmFwcGVuZENoaWxkKHVuZGVybGluZSk7XG5cbiAgICAvLyBjYWxsIGluaXQgbWVudSBmcm9tIHNka1xuICAgIGluaXROYXZiYXIodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGV4dCBzdHlsZXMgYW5kIHRoZSBtZW51IHVuZGVybGluZVxuICAgKi9cbiAgYWRkRGVhY3RpdmF0ZWRTdHlsZVRvTWVudSgpIHtcbiAgICB0aGlzLm1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnZGVhY3RpdmF0ZWQnKTtcbiAgfVxuICAvKipcbiAgICogUmVzdG9yZXMgdGV4dCBzdHlsZXMgYW5kIHRoZSBtZW51IHVuZGVybGluZVxuICAgKi9cbiAgcmVtb3ZlRGVhY3RpdmF0ZWRTdHlsZUZyb21NZW51KCkge1xuICAgIHRoaXMubWVudS5jbGFzc0xpc3QuYWRkKFwiZGVhY3RpdmF0ZWRcIik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwiaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvblZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLXNlY3Rpb24tdmlld1wiO1xuaW1wb3J0IFNlYXJjaFNlcnZpY2UgZnJvbSBcIi4uL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlXCI7XG5pbXBvcnQgQ29udGVudFR5cGVMaXN0IGZyb20gJy4uL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0JztcbmltcG9ydCBDb250ZW50VHlwZURldGFpbCBmcm9tICcuLi9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBUYWIgc2VjdGlvbiBjb25zdGFudHNcbiAqL1xuY29uc3QgQ29udGVudFR5cGVTZWN0aW9uVGFicyA9IHtcbiAgQUxMOiB7XG4gICAgaWQ6ICdmaWx0ZXItYWxsJyxcbiAgICB0aXRsZTogJ0FsbCcsXG4gICAgZXZlbnROYW1lOiAnYWxsJ1xuICB9LFxuICBNWV9DT05URU5UX1RZUEVTOiB7XG4gICAgaWQ6ICdmaWx0ZXItbXktY29udGVudC10eXBlcycsXG4gICAgdGl0bGU6ICdNeSBDb250ZW50IFR5cGVzJyxcbiAgICBldmVudE5hbWU6ICdteS1jb250ZW50LXR5cGVzJyxcbiAgICBzZWxlY3RlZDogdHJ1ZVxuICB9LFxuICBNT1NUX1BPUFVMQVI6IHtcbiAgICBpZDogJ2ZpbHRlci1tb3N0LXBvcHVsYXInLFxuICAgIHRpdGxlOiAnTW9zdCBQb3B1bGFyJyxcbiAgICBldmVudE5hbWU6ICdtb3N0LXBvcHVsYXInXG4gIH1cbn07XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRUeXBlU2VjdGlvblxuICogQG1peGVzIEV2ZW50ZnVsXG4gKlxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKiBAcGFyYW0ge0h1YlNlcnZpY2VzfSBzZXJ2aWNlc1xuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUsIHNlcnZpY2VzKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb25WaWV3KHN0YXRlKTtcblxuICAgIC8vIGNvbnRyb2xsZXJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZShzZXJ2aWNlcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbCA9IG5ldyBDb250ZW50VHlwZURldGFpbCh7fSwgc2VydmljZXMpO1xuXG4gICAgLy8gRWxlbWVudCBmb3IgaG9sZGluZyBsaXN0IGFuZCBkZXRhaWxzIHZpZXdzXG4gICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY29udGVudC10eXBlLXNlY3Rpb24nKTtcblxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBzZWN0aW9uO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZUxpc3QuZ2V0RWxlbWVudCgpKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVEZXRhaWwuZ2V0RWxlbWVudCgpKTtcblxuICAgIHRoaXMudmlldy5nZXRFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5yb290RWxlbWVudCk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0J10sIHRoaXMuY29udGVudFR5cGVMaXN0KTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCddLCB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsKTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3JlbG9hZCddLCB0aGlzLnZpZXcpO1xuXG4gICAgLy8gcmVnaXN0ZXIgbGlzdGVuZXJzXG4gICAgdGhpcy52aWV3Lm9uKCdzZWFyY2gnLCB0aGlzLnNlYXJjaCwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdzZWFyY2gnLCB0aGlzLnZpZXcuc2VsZWN0TWVudUl0ZW1CeUlkLmJpbmQodGhpcy52aWV3LCBDb250ZW50VHlwZVNlY3Rpb25UYWJzLkFMTC5pZCkpO1xuICAgIC8vIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5yZXNldE1lbnVPbkVudGVyLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy5hcHBseVNlYXJjaEZpbHRlciwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy5jbGVhcklucHV0RmllbGQsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMudXBkYXRlRGlzcGxheVNlbGVjdGVkLCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5vbigncm93LXNlbGVjdGVkJywgdGhpcy5zaG93RGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignc2VsZWN0JywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xuXG4gICAgdGhpcy5pbml0Q29udGVudFR5cGVMaXN0KCk7XG5cbiAgICAvLyBhZGQgbWVudSBpdGVtc1xuICAgIGZvciAoY29uc3QgdGFiIGluIENvbnRlbnRUeXBlU2VjdGlvblRhYnMpIHtcbiAgICAgIGlmIChDb250ZW50VHlwZVNlY3Rpb25UYWJzLmhhc093blByb3BlcnR5KHRhYikpIHtcbiAgICAgICAgdGhpcy52aWV3LmFkZE1lbnVJdGVtKENvbnRlbnRUeXBlU2VjdGlvblRhYnNbdGFiXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudmlldy5pbml0TWVudSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3Qgd2l0aCBhIHNlYXJjaFxuICAgKi9cbiAgaW5pdENvbnRlbnRUeXBlTGlzdCgpIHtcbiAgICAvLyBpbml0aWFsaXplIGJ5IHNlYXJjaFxuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goXCJcIilcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycm9yKSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGVycm9ycyBjb21tdW5pY2F0aW5nIHdpdGggSFVCXG4gICAqL1xuICBoYW5kbGVFcnJvcihlcnJvcikge1xuICAgIC8vIFRPRE8gLSB1c2UgdHJhbnNsYXRpb24gc3lzdGVtOlxuICAgIHRoaXMudmlldy5kaXNwbGF5TWVzc2FnZSh7XG4gICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgdGl0bGU6ICdOb3QgYWJsZSB0byBjb21tdW5pY2F0ZSB3aXRoIGh1Yi4nLFxuICAgICAgY29udGVudDogJ0Vycm9yIG9jY3VyZWQuIFBsZWFzZSB0cnkgYWdhaW4uJ1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGEgc2VhcmNoIGFuZCB1cGRhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcbiAgICovXG4gIHNlYXJjaCh7cXVlcnksIGtleUNvZGV9KSB7XG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChxdWVyeSlcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZGlzcGxheWVkIG5hbWUgb2YgdGhlIHNlbGVjdGVkIGZpbHRlciBmb3IgbW9iaWxlXG4gICAqXG4gICAqIEBwYXJhbSB7U2VsZWN0ZWRFbGVtZW50fSBldmVudFxuICAgKi9cbiAgdXBkYXRlRGlzcGxheVNlbGVjdGVkKGV2ZW50KSB7XG4gICAgdGhpcy52aWV3LnNldERpc3BsYXlTZWxlY3RlZChldmVudC5lbGVtZW50LmlubmVyVGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBzZWFyY2ggZmlsdGVyIGRlcGVuZGluZyBvbiB3aGF0IGV2ZW50IGl0IHJlY2VpdmVzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIEV2ZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlLmNob2ljZSBFdmVudCBuYW1lIG9mIGNob3NlbiB0YWJcbiAgICovXG4gIGFwcGx5U2VhcmNoRmlsdGVyKGUpIHtcbiAgICBzd2l0Y2goZS5jaG9pY2UpIHtcbiAgICAgIGNhc2UgQ29udGVudFR5cGVTZWN0aW9uVGFicy5BTEwuZXZlbnROYW1lOlxuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc29ydE9uKCdyZXN0cmljdGVkJylcbiAgICAgICAgICAudGhlbihjdHMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGN0cykpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBDb250ZW50VHlwZVNlY3Rpb25UYWJzLk1ZX0NPTlRFTlRfVFlQRVMuZXZlbnROYW1lOlxuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UuZmlsdGVyT3V0UmVzdHJpY3RlZCgpXG4gICAgICAgICAgLnRoZW4oY3RzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjdHMpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQ29udGVudFR5cGVTZWN0aW9uVGFicy5NT1NUX1BPUFVMQVIuZXZlbnROYW1lOlxuICAgICAgICBjb25zdCBzb3J0T3JkZXIgPSBbJ3Jlc3RyaWN0ZWQnLCAncG9wdWxhcml0eSddO1xuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2VcbiAgICAgICAgICAuc29ydE9uKHNvcnRPcmRlcilcbiAgICAgICAgICAudGhlbihjdHMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGN0cykpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGlucHV0IGZpZWxkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgY2xlYXJJbnB1dEZpZWxkKHtpZH0pIHtcbiAgICBpZiAoaWQgIT09IENvbnRlbnRUeXBlU2VjdGlvblRhYnMuQUxMLmlkKSB7XG4gICAgICB0aGlzLnZpZXcuY2xlYXJJbnB1dEZpZWxkKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIGRldGFpbCB2aWV3XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2hvd0RldGFpbFZpZXcoe2lkfSkge1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmxvYWRCeUlkKGlkKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLnNob3coKTtcbiAgICB0aGlzLnZpZXcudHlwZUFoZWFkRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudmlldy5yZW1vdmVEZWFjdGl2YXRlZFN0eWxlRnJvbU1lbnUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgY2xvc2VEZXRhaWxWaWV3KCkge1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LnNob3coKVxuICAgIHRoaXMudmlldy50eXBlQWhlYWRFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLnZpZXcuYWRkRGVhY3RpdmF0ZWRTdHlsZVRvTWVudSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxuaW1wb3J0IGluaXRUYWJQYW5lbCBmcm9tIFwiY29tcG9uZW50cy90YWItcGFuZWxcIlxuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4vdXRpbHMvZXZlbnRzJztcbi8qKlxuICogVGFiIGNoYW5nZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjdGFiLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBQYW5lbCBvcGVuIG9yIGNsb3NlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyNwYW5lbC1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9EQVRBX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YlZpZXcjdGFiLWNoYW5nZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJWaWV3IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgdGhpcy5yZW5kZXJUYWJQYW5lbChzdGF0ZSk7XG4gICAgdGhpcy5yZW5kZXJQYW5lbChzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBwYW5lbFxuICAgKi9cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICogQHBhcmFtIHtib29sZWFufSBleHBhbmRlZFxuICAgKi9cbiAgcmVuZGVyUGFuZWwoe3RpdGxlID0gJycsIHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGl0bGUuY2xhc3NOYW1lICs9IFwicGFuZWwtaGVhZGVyIGljb24taHViLWljb25cIjtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWApO1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3BhbmVsLWNoYW5nZScsIHRoaXMsIHRoaXMudGl0bGUpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYm9keS5jbGFzc05hbWUgKz0gXCJwYW5lbC1ib2R5XCI7XG4gICAgdGhpcy5ib2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLmJvZHkuaWQgPSBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSBgcGFuZWwgaDVwLXNlY3Rpb24tJHtzZWN0aW9uSWR9YDtcbiAgICBpZihleHBhbmRlZCl7XG4gICAgICB0aGlzLnBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICB9XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuYm9keSk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSArPSBgaDVwLWh1YiBoNXAtc2RrYDtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuICAgIGluaXRQYW5lbCh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaWYgcGFuZWwgaXMgb3BlbiwgdGhpcyBpcyB1c2VkIGZvciBvdXRlciBib3JkZXIgY29sb3JcbiAgICovXG4gIHRvZ2dsZVBhbmVsT3BlbigpIHtcbiAgICBsZXQgcGFuZWwgPSB0aGlzLnBhbmVsO1xuICAgIGlmKGlzT3BlbihwYW5lbCkpIHtcbiAgICAgIHBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgnb3BlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtwYW5lbC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKS5mb2N1cygpfSwyMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHRhYiBwYW5lbFxuICAgKi9cbiAgcmVuZGVyVGFiUGFuZWwoc3RhdGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnRhYmxpc3QuY2xhc3NOYW1lICs9IFwidGFibGlzdFwiO1xuICAgIHRoaXMudGFibGlzdC5zZXRBdHRyaWJ1dGUgKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgdGhpcy50YWJMaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxpc3QpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5jbGFzc05hbWUgKz0gJ3RhYi1wYW5lbCc7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGFiTGlzdFdyYXBwZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0YWJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcbiAgICovXG4gIGFkZFRhYih7dGl0bGUsIGlkLCBjb250ZW50LCBzZWxlY3RlZCA9IGZhbHNlfSkge1xuICAgIGNvbnN0IHRhYklkID0gYHRhYi0ke2lkfWA7XG4gICAgY29uc3QgdGFiUGFuZWxJZCA9IGB0YWItcGFuZWwtJHtpZH1gO1xuXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0YWIuY2xhc3NOYW1lICs9ICd0YWInO1xuICAgIHRhYi5pZCA9IHRhYklkO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0YWJQYW5lbElkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQudG9TdHJpbmcoKSk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfREFUQV9JRCwgaWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XG4gICAgdGFiLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCd0YWItY2hhbmdlJywgdGhpcywgdGFiKTtcblxuICAgIGNvbnN0IHRhYlBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFiUGFuZWwuaWQgPSB0YWJQYW5lbElkO1xuICAgIHRhYlBhbmVsLmNsYXNzTmFtZSArPSAndGFicGFuZWwnO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJsbGVkYnknLCB0YWJJZCk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghc2VsZWN0ZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xuICAgIHRhYlBhbmVsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKHRhYik7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRhYlBhbmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGFuaW1hdGVkIGJvcmRlciB0byB0aGUgYm90dG9tIG9mIHRoZSB0YWJcbiAgICovXG4gIGFkZEJvdHRvbUJvcmRlcigpIHtcbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcbiAgfVxuXG4gIGluaXRUYWJQYW5lbCgpIHtcbiAgICBpbml0VGFiUGFuZWwodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0U2VjdGlvblR5cGUoe2lkfSkge1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lID0gYGg1cC1zZWN0aW9uLSR7aWR9IHBhbmVsYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwiaW1wb3J0IHtjdXJyeX0gZnJvbSAndXRpbHMvZnVuY3Rpb25hbCdcblxuLyoqXG4gKiBAY2xhc3NcbiAqIFRoZSBTZWFyY2ggU2VydmljZSBnZXRzIGEgY29udGVudCB0eXBlIGZyb20gaHViLXNlcnZpY2VzLmpzXG4gKiBpbiB0aGUgZm9ybSBvZiBhIHByb21pc2UuIEl0IHRoZW4gZ2VuZXJhdGVzIGEgc2NvcmUgYmFzZWRcbiAqIG9uIHRoZSBkaWZmZXJlbnQgd2VpZ2h0aW5ncyBvZiB0aGUgY29udGVudCB0eXBlIGZpZWxkcyBhbmRcbiAqIHNvcnRzIHRoZSByZXN1bHRzIGJhc2VkIG9uIHRoZSBnZW5lcmF0ZWQgc2NvcmUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTZXJ2aWNlc30gc2VydmljZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNlcnZpY2VzKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IHNlcnZpY2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgc2VhcmNoXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW10+fSBBIHByb21pc2Ugb2YgYW4gYXJyYXkgb2YgY29udGVudCB0eXBlc1xuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5KSB7XG4gICAgLy8gQWRkIGNvbnRlbnQgdHlwZXMgdG8gdGhlIHNlYXJjaCBpbmRleFxuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlcygpLnRoZW4oZmlsdGVyQnlRdWVyeShxdWVyeSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlciBhbGwgY29udGVudCB0eXBlcyBieSBnaXZlbiBwcm9wZXJ0eVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0gc29ydE9yZGVyIE9uZSBvciBtb3JlIHByb3BlcnRpZXNcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT58Kn1cbiAgICovXG4gIHNvcnRPbihzb3J0T3JkZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZXMoKVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IG11bHRpU29ydChjb250ZW50VHlwZXMsIHNvcnRPcmRlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlciBvdXQgcmVzdHJpY3RlZCBpZiBpdCBpcyBkZWZpbmVkIGFuZCBmYWxzZVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZVtdPn1cbiAgICovXG4gIGZpbHRlck91dFJlc3RyaWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKClcbiAgICAgIC50aGVuKGN0cyA9PiBjdHMuZmlsdGVyKGN0ID0+ICFjdC5yZXN0cmljdGVkKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTb3J0IG9uIG11bHRpcGxlIHByb3BlcnRpZXNcbiAqXG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlcyBDb250ZW50IHR5cGVzIHRoYXQgc2hvdWxkIGJlIHNvcnRlZFxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHNvcnRPcmRlciBPcmRlciB0aGF0IHNvcnQgcHJvcGVydGllcyBzaG91bGQgYmUgYXBwbGllZFxuICpcbiAqIEByZXR1cm4ge0FycmF5LjxDb250ZW50VHlwZT59IENvbnRlbnQgdHlwZXMgc29ydGVkXG4gKi9cbmNvbnN0IG11bHRpU29ydCA9IChjb250ZW50VHlwZXMsIHNvcnRPcmRlcikgPT4ge1xuICBzb3J0T3JkZXIgPSBBcnJheS5pc0FycmF5KHNvcnRPcmRlcikgPyBzb3J0T3JkZXIgOiBbc29ydE9yZGVyXTtcbiAgcmV0dXJuIGNvbnRlbnRUeXBlcy5zb3J0KChjdDEsIGN0MikgPT4ge1xuICAgIHJldHVybiBoYW5kbGVTb3J0VHlwZShjdDEsIGN0Miwgc29ydE9yZGVyKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIENvbXBhcmVzIHR3byBjb250ZW50IHR5cGVzIGFuZCByZXR1cm5zIGEgc29ydGFibGUgdmFsdWUgZm9yIHRoZW1cbiAqXG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjdDFcbiAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGN0MlxuICogQHBhcmFtIHtzdHJpbmdbXX0gc29ydE9yZGVyIE9yZGVyIHRoYXQgc29ydCBwcm9wZXJ0aWVzIHNob3VsZCBiZSBhcHBsaWVkIGluXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBBIG51bWJlciBpbmRpY2F0aW5nIGhvdyB0byBzb3J0IHRoZSB0d28gY29udGVudCB0eXBlc1xuICovXG5jb25zdCBoYW5kbGVTb3J0VHlwZSA9IChjdDEsIGN0Miwgc29ydE9yZGVyKSA9PiB7XG4gIHN3aXRjaCAoc29ydE9yZGVyWzBdKSB7XG4gICAgY2FzZSAncmVzdHJpY3RlZCc6XG4gICAgICByZXR1cm4gc29ydE9uUmVzdHJpY3RlZChjdDEsIGN0Miwgc29ydE9yZGVyLnNsaWNlKDEpKTtcbiAgICBjYXNlICdwb3B1bGFyaXR5JzpcbiAgICAgIHJldHVybiBzb3J0T25Qcm9wZXJ0eShjdDEsIGN0Miwgc29ydE9yZGVyWzBdLCBzb3J0T3JkZXIuc2xpY2UoMSkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc29ydFNlYXJjaFJlc3VsdHMoY3QxLCBjdDIpO1xuICB9XG59O1xuXG4vKipcbiAqIFNvcnQgcmVzdHJpY3RlZCBjb250ZW50IHR5cGVzLiBSZXN0cmljdGVkIGNvbnRlbnQgdHlwZXMgd2lsbCBiZSBtb3ZlZCB0byB0aGUgYm90dG9tIG9mIHRoZVxuICogbGlzdC4gQ29udGVudCB0eXBlcyB3aXRoIHVuZGVmaW5lZCByZXN0cmljdGVkIHByb3BlcnR5IGFyZSBjb25zaWRlciBub3QgcmVzdHJpY3RlZC5cbiAqXG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjdDFcbiAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGN0MlxuICogQHBhcmFtIHtzdHJpbmdbXX0gc29ydE9yZGVyIE9yZGVyIHRvIGFwcGx5IHNvcnQgcHJvcGVydGllc1xuICpcbiAqIEByZXR1cm4ge251bWJlcn0gQSBzdGFuZGFyZCBjb21wYXJhYmxlIHZhbHVlIGZvciB0aGUgdHdvIGNvbnRlbnQgdHlwZXNcbiAqL1xuY29uc3Qgc29ydE9uUmVzdHJpY3RlZCA9IChjdDEsIGN0Miwgc29ydE9yZGVyKSA9PiB7XG4gIGlmICghY3QxLnJlc3RyaWN0ZWQgPT09ICFjdDIucmVzdHJpY3RlZCkge1xuICAgIGlmIChzb3J0T3JkZXIpIHtcbiAgICAgIHJldHVybiBoYW5kbGVTb3J0VHlwZShjdDEsIGN0Miwgc29ydE9yZGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoY3QxLnJlc3RyaWN0ZWQpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICBlbHNlIGlmIChjdDIucmVzdHJpY3RlZCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxufTtcblxuLyoqXG4gKiBTb3J0IG9uIGEgcHJvcGVydHkuIEFueSB2YWxpZCBwcm9wZXJ0eSBjYW4gYmUgYXBwbGllZC4gSWYgdGhlIGNvbnRlbnQgdHlwZSBkb2VzIG5vdCBoYXZlIHRoZVxuICogc3VwcGxpZWQgcHJvcGVydHkgaXQgd2lsbCBnZXQgbW92ZWQgdG8gdGhlIGJvdHRvbS5cbiAqXG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjdDFcbiAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGN0MlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IHRoYXQgdGhlIGNvbnRlbnQgdHlwZXMgd2lsbCBiZSBzb3J0ZWQgb24sIGVpdGhlclxuICogbnVtZXJpY2FsbHkgb3IgbGV4aWNhbGx5XG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzb3J0T3JkZXIgUmVtYWluaW5nIHNvcnQgb3JkZXIgdG8gYXBwbHkgaWYgdHdvIGNvbnRlbnQgdHlwZXMgaGF2ZSB0aGUgc2FtZVxuICogdmFsdWVcbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgdmFsdWUgaW5kaWNhdGluZyB0aGUgY29tcGFyaXNvbiBiZXR3ZWVuIHRoZSB0d28gY29udGVudCB0eXBlc1xuICovXG5jb25zdCBzb3J0T25Qcm9wZXJ0eSA9IChjdDEsIGN0MiwgcHJvcGVydHksIHNvcnRPcmRlcikgPT4ge1xuICAvLyBQcm9wZXJ0eSBkb2VzIG5vdCBleGlzdCwgbW92ZSB0byBib3R0b21cbiAgaWYgKCFjdDEuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgaWYgKCFjdDIuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgLy8gU29ydCBvbiBwcm9wZXJ0eVxuICBpZiAoY3QxW3Byb3BlcnR5XSA+IGN0Mltwcm9wZXJ0eV0pIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICBlbHNlIGlmIChjdDFbcHJvcGVydHldIDwgY3QyW3Byb3BlcnR5XSkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoc29ydE9yZGVyKSB7XG4gICAgICByZXR1cm4gaGFuZGxlU29ydFR5cGUoY3QxLCBjdDIsIHNvcnRPcmRlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEZpbHRlcnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXMgYmFzZWQgb24gYSBxdWVyeVxuICogQHR5cGUge0Z1bmN0aW9ufVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcbiAqL1xuY29uc3QgZmlsdGVyQnlRdWVyeSA9IGN1cnJ5KGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZXMpIHtcbiAgaWYgKHF1ZXJ5ID09ICcnKSB7XG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlcztcbiAgfVxuXG4gIC8vIEFwcGVuZCBhIHNlYXJjaCBzY29yZSB0byBlYWNoIGNvbnRlbnQgdHlwZVxuICBjb25zdCBmaWx0ZXJlZCA9IGNvbnRlbnRUeXBlcy5tYXAoY29udGVudFR5cGUgPT4ge1xuICAgIGNvbnRlbnRUeXBlLnNjb3JlID0gZ2V0U2VhcmNoU2NvcmUocXVlcnksIGNvbnRlbnRUeXBlKTtcbiAgICByZXR1cm4gY29udGVudFR5cGU7XG4gIH0pLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0LnNjb3JlID4gMCk7XG5cbiAgcmV0dXJuIG11bHRpU29ydChmaWx0ZXJlZCwgWydyZXN0cmljdGVkJywgJ2RlZmF1bHQnXSk7XG59KTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgQXJyYXkuc29ydCgpXG4gKiBDb21wYXJlcyB0d28gY29udGVudCB0eXBlcyBvbiBkaWZmZXJlbnQgY3JpdGVyaWFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBGaXJzdCBjb250ZW50IHR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFNlY29uZCBjb250ZW50IHR5cGVcbiAqIEByZXR1cm4ge2ludH1cbiAqL1xuY29uc3Qgc29ydFNlYXJjaFJlc3VsdHMgPSAoYSxiKSA9PiB7XG4gIGlmICghYS5pbnN0YWxsZWQgJiYgYi5pbnN0YWxsZWQpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmIChhLmluc3RhbGxlZCAmJiAhYi5pbnN0YWxsZWQpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBlbHNlIGlmIChiLnNjb3JlICE9PSBhLnNjb3JlKSB7XG4gICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlO1xuICB9XG5cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGIucG9wdWxhcml0eSAtIGEucG9wdWxhcml0eTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHdlaWdodGluZyBmb3IgZGlmZmVyZW50IHNlYXJjaCB0ZXJtcyBiYXNlZFxuICogb24gZXhpc3RlbmNlIG9mIHN1YnN0cmluZ3NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRlbnRUeXBlXG4gKiBAcmV0dXJuIHtpbnR9XG4gKi9cbiBjb25zdCBnZXRTZWFyY2hTY29yZSA9IGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZSkge1xuICAgbGV0IHF1ZXJpZXMgPSBxdWVyeS5zcGxpdCgnICcpLmZpbHRlcihxdWVyeSA9PiBxdWVyeSAhPT0gJycpO1xuICAgbGV0IHF1ZXJ5U2NvcmVzID0gcXVlcmllcy5tYXAocXVlcnkgPT4gZ2V0U2NvcmVGb3JFYWNoUXVlcnkocXVlcnksIGNvbnRlbnRUeXBlKSk7XG4gICBpZiAocXVlcnlTY29yZXMuaW5kZXhPZigwKSA+IC0xKSB7XG4gICAgIHJldHVybiAwO1xuICAgfVxuICAgcmV0dXJuIHF1ZXJ5U2NvcmVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuIH07XG5cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByZWxldmFuY2Ugc2NvcmUgZm9yIGEgc2luZ2xlIHN0cmluZ1xuICpcbiAqIEBwYXJhbSAge3R5cGV9IHF1ZXJ5ICAgICAgIGRlc2NyaXB0aW9uXG4gKiBAcGFyYW0gIHt0eXBlfSBjb250ZW50VHlwZSBkZXNjcmlwdGlvblxuICogQHJldHVybiB7dHlwZX0gICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAqL1xuY29uc3QgZ2V0U2NvcmVGb3JFYWNoUXVlcnkgPSBmdW5jdGlvbiAocXVlcnksIGNvbnRlbnRUeXBlKSB7XG4gICBxdWVyeSA9IHF1ZXJ5LnRyaW0oKTtcbiAgIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLnRpdGxlKSkge1xuICAgICByZXR1cm4gMTAwO1xuICAgfVxuICAgZWxzZSBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5zdW1tYXJ5KSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuZGVzY3JpcHRpb24pKSB7XG4gICAgIHJldHVybiA1O1xuICAgfVxuICAgZWxzZSBpZiAoYXJyYXlIYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmtleXdvcmRzKSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUubWFjaGluZU5hbWUpKSB7XG4gICAgIHJldHVybiAxO1xuICAgfVxuICAgZWxzZSB7XG4gICAgIHJldHVybiAwO1xuICAgfVxufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBuZWVkbGUgaXMgZm91bmQgaW4gdGhlIGhheXN0YWNrLlxuICogTm90IGNhc2Ugc2Vuc2l0aXZlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5lZWRsZVxuICogQHBhcmFtIHtzdHJpbmd9IGhheXN0YWNrXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdWJTdHJpbmcgPSBmdW5jdGlvbihuZWVkbGUsIGhheXN0YWNrKSB7XG4gIGlmIChoYXlzdGFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGhheXN0YWNrLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24sIGNoZWNrcyBpZiBhcnJheSBoYXMgY29udGFpbnMgYSBzdWJzdHJpbmdcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN1YlN0cmluZ1xuICogQHBhcmFtICB7QXJyYXl9IGFyclxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgYXJyYXlIYXNTdWJTdHJpbmcgPSBmdW5jdGlvbihzdWJTdHJpbmcsIGFycikge1xuICBpZiAoYXJyID09PSB1bmRlZmluZWQgfHwgc3ViU3RyaW5nID09PSAnJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBhcnIuc29tZShzdHJpbmcgPT4gaGFzU3ViU3RyaW5nKHN1YlN0cmluZywgc3RyaW5nKSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJpbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgRGljdGlvbmFyeSBmcm9tICcuLi91dGlscy9kaWN0aW9uYXJ5JztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICpcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xuXG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBzZXJ2aWNlcykge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcblxuICAgIC8vIElucHV0IGVsZW1lbnQgZm9yIHRoZSBINVAgZmlsZVxuICAgIGNvbnN0IGg1cFVwbG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaDVwVXBsb2FkLnNldEF0dHJpYnV0ZSgndHlwZScsICdmaWxlJyk7XG5cbiAgICAvLyBTZW5kcyB0aGUgSDVQIGZpbGUgdG8gdGhlIHBsdWdpblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHVzZUJ1dHRvbi50ZXh0Q29udGVudCA9IERpY3Rpb25hcnkuZ2V0KCd1c2VCdXR0b25MYWJlbCcpO1xuICAgIHVzZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgLy8gQWRkIHRoZSBINVAgZmlsZSB0byBhIGZvcm0sIHJlYWR5IGZvciB0cmFuc3BvcnRhdGlvblxuICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZGF0YS5hcHBlbmQoJ2g1cCcsIGg1cFVwbG9hZC5maWxlc1swXSk7XG5cbiAgICAgIC8vIFVwbG9hZCBjb250ZW50IHRvIHRoZSBwbHVnaW5cbiAgICAgIHRoaXMuc2VydmljZXMudXBsb2FkQ29udGVudChkYXRhKVxuICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAvLyBGaXJlIHRoZSByZWNlaXZlZCBkYXRhIHRvIGFueSBsaXN0ZW5lcnNcbiAgICAgICAgICBzZWxmLnRyaWdnZXIoJ3VwbG9hZCcsIGpzb24pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGg1cFVwbG9hZCk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh1c2VCdXR0b24pO1xuXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUgfSBmcm9tICd1dGlscy9lbGVtZW50cyc7XG5pbXBvcnQgeyBmb3JFYWNoLCB3aXRob3V0IH0gZnJvbSAndXRpbHMvZnVuY3Rpb25hbCc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBDb250cm9scyBFdmVudFxuICogQHR5cGVkZWYge09iamVjdH0gQ29udHJvbHNFdmVudFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBvbGRFbGVtZW50XG4gKi9cbi8qKlxuICogQWRkIGVsZW1lbnQgZXZlbnRcbiAqIEBldmVudCBDb250cm9scyNhZGRFbGVtZW50XG4gKiBAdHlwZSBDb250cm9sc0V2ZW50XG4gKi9cbi8qKlxuICogUmVtb3ZlIGVsZW1lbnQgZXZlbnRcbiAqIEBldmVudCBDb250cm9scyNyZW1vdmVFbGVtZW50XG4gKiBAdHlwZSBDb250cm9sc0V2ZW50XG4gKi9cbi8qKlxuICogUHJldmlvdXMgZWxlbWVudCBldmVudFxuICogQGV2ZW50IENvbnRyb2xzI3ByZXZpb3VzRWxlbWVudFxuICogQHR5cGUgQ29udHJvbHNFdmVudFxuICovXG4vKipcbiAqIE5leHQgZWxlbWVudCBldmVudFxuICogQGV2ZW50IENvbnRyb2xzI25leHRFbGVtZW50XG4gKiBAdHlwZSBDb250cm9sc0V2ZW50XG4gKi9cbi8qKlxuICogU2VsZWN0IG9wdGlvbiBldmVudFxuICogQGV2ZW50IENvbnRyb2xzI3NlbGVjdFxuICogQHR5cGUgQ29udHJvbHNFdmVudFxuICovXG4vKipcbiAqIERyYWcgZWxlbWVudCBldmVudFxuICogQGV2ZW50IENvbnRyb2xzI2RyYWdcbiAqIEB0eXBlIENvbnRyb2xzRXZlbnRcbiAqL1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn0gcmVtb3ZlVGFiSW5kZXhcbiAqL1xuY29uc3QgcmVtb3ZlVGFiSW5kZXggPSByZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn0gcmVtb3ZlVGFiSW5kZXhGb3JBbGxcbiAqL1xuY29uc3QgcmVtb3ZlVGFiSW5kZXhGb3JBbGwgPSBmb3JFYWNoKHJlbW92ZVRhYkluZGV4KTtcbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufSBzZXRUYWJJbmRleFplcm9cbiAqL1xuY29uc3Qgc2V0VGFiSW5kZXhaZXJvID0gc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn0gaGFzVGFiSW5kZXhcbiAqL1xuY29uc3QgaGFzVGFiSW5kZXggPSBoYXNBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbHMge1xuICBjb25zdHJ1Y3RvcihwbHVnaW5zKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvKipcbiAgICAgKkBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IHRhYmJhYmxlRWxlbWVudFxuICAgICAqL1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHBsdWdpbnNcbiAgICAgKi9cbiAgICB0aGlzLnBsdWdpbnMgPSBwbHVnaW5zIHx8IFtdO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtIVE1MRWxlbWVudFtdfSBlbGVtZW50c1xuICAgICAqL1xuICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcblxuICAgIC8vIG1vdmUgdGFiaW5kZXggdG8gbmV4dCBlbGVtZW50XG4gICAgdGhpcy5vbignbmV4dEVsZW1lbnQnLCB0aGlzLm5leHRFbGVtZW50LCB0aGlzKTtcblxuICAgIC8vIG1vdmUgdGFiaW5kZXggdG8gcHJldmlvdXMgZWxlbWVudFxuICAgIHRoaXMub24oJ3ByZXZpb3VzRWxlbWVudCcsIHRoaXMucHJldmlvdXNFbGVtZW50LCB0aGlzKTtcblxuICAgIC8vIGluaXQgcGx1Z2luc1xuICAgIHRoaXMuaW5pdFBsdWdpbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY29udHJvbHMgdG8gYW4gZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICAgKlxuICAgKiBAZmlyZXMgQ29udHJvbHMjYWRkRWxlbWVudFxuICAgKiBAcHVibGljXG4gICAqL1xuICBhZGRFbGVtZW50KGVsKcKge1xuICAgIHRoaXMuZWxlbWVudHMucHVzaChlbCk7XG5cbiAgICB0aGlzLmZpcmVzRXZlbnQoJ2FkZEVsZW1lbnQnLCBlbCk7XG5cbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDEpIHsgLy8gaWYgZmlyc3RcbiAgICAgIHRoaXMuc2V0VGFiYmFibGUoZWwpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQWRkIGNvbnRyb2xzIHRvIGFuIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICpcbiAgICogQGZpcmVzIENvbnRyb2xzI2FkZEVsZW1lbnRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcmVtb3ZlRWxlbWVudChlbCnCoHtcbiAgICB0aGlzLmVsZW1lbnRzID0gd2l0aG91dChbZWxdLCB0aGlzLmVsZW1lbnRzKTtcblxuICAgIC8vIGlmIHJlbW92ZWQgZWxlbWVudCB3YXMgc2VsZWN0ZWRcbiAgICBpZihoYXNUYWJJbmRleChlbCkpIHtcbiAgICAgIHJlbW92ZVRhYkluZGV4KGVsKTtcblxuICAgICAgLy8gc2V0IGZpcnN0IGVsZW1lbnQgc2VsZWN0ZWQgaWYgZXhpc3RzXG4gICAgICBpZih0aGlzLmVsZW1lbnRzWzBdKSB7XG4gICAgICAgIHRoaXMuc2V0VGFiYmFibGUodGhpcy5lbGVtZW50c1swXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5maXJlc0V2ZW50KCdyZW1vdmVFbGVtZW50JywgZWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8RXZlbnRUYXJnZXR9IGVsXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGZpcmVzRXZlbnQodHlwZSwgZWwpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZWxlbWVudHMuaW5kZXhPZihlbCk7XG5cbiAgICB0aGlzLmZpcmUodHlwZSwge1xuICAgICAgZWxlbWVudDogZWwsXG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICBlbGVtZW50czogdGhpcy5lbGVtZW50cyxcbiAgICAgIG9sZEVsZW1lbnQ6IHRoaXMudGFiYmFibGVFbGVtZW50XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0YWJpbmRleCBvbiBhbiBlbGVtZW50LCByZW1vdmUgaXQgZnJvbSBhbGwgb3RoZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbmV4dEVsZW1lbnQoe2luZGV4fSkge1xuICAgIGNvbnN0IGlzTGFzdEVsZW1lbnQgPSBpbmRleCA9PT0gKHRoaXMuZWxlbWVudHMubGVuZ3RoIC0gMSk7XG4gICAgY29uc3QgbmV4dEVsID0gdGhpcy5lbGVtZW50c1tpc0xhc3RFbGVtZW50ID8gMCA6IChpbmRleCArIDEpXTtcblxuICAgIHRoaXMuc2V0VGFiYmFibGUobmV4dEVsKTtcbiAgICBuZXh0RWwuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRhYmluZGV4IG9uIGFuIGVsZW1lbnQsIHJlbW92ZSBpdCBmcm9tIGFsbCBvdGhlcnNcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2V0VGFiYmFibGUoZWwpIHtcbiAgICByZW1vdmVUYWJJbmRleEZvckFsbCh0aGlzLmVsZW1lbnRzKTtcbiAgICBzZXRUYWJJbmRleFplcm8oZWwpO1xuICAgIHRoaXMudGFiYmFibGVFbGVtZW50ID0gZWw7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0YWJpbmRleCBvbiBhbiBlbGVtZW50LCByZW1vdmUgaXQgZnJvbSBhbGwgb3RoZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJldmlvdXNFbGVtZW50KHtpbmRleH0pIHtcbiAgICBjb25zdCBpc0ZpcnN0RWxlbWVudCA9IGluZGV4ID09PSAwO1xuICAgIGNvbnN0IHByZXZFbCA9IHRoaXMuZWxlbWVudHNbaXNGaXJzdEVsZW1lbnQgPyAodGhpcy5lbGVtZW50cy5sZW5ndGggLSAxKSA6IChpbmRleCAtIDEpXTtcblxuICAgIHRoaXMuc2V0VGFiYmFibGUocHJldkVsKTtcbiAgICBwcmV2RWwuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGx1Z2luc1xuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaW5pdFBsdWdpbnMoKcKge1xuICAgIHRoaXMucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uKHBsdWdpbil7XG4gICAgICBpZihwbHVnaW4uaW5pdCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgcGx1Z2luLmluaXQodGhpcyk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay11aS9zcmMvc2NyaXB0cy9jb250cm9scy5qcyIsIi8qKlxuICogQG1peGluXG4gKi9cbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnRmdWx9XG4gICAqL1xuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNjb3BlXG4gICAgICovXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcbiAgICAgICdsaXN0ZW5lcic6IGxpc3RlbmVyLFxuICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAgICovXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUodHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrLXVpL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsIi8qKlxuICogQGNsYXNzXG4gKiBAY2xhc3NkZXNjIEtleWJvYXJkIG5hdmlnYXRpb24gZm9yIGFjY2Vzc2liaWxpdHkgc3VwcG9ydFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2VsZWN0YWJpbGl0eVxuICAgICAqL1xuICAgIHRoaXMuc2VsZWN0YWJpbGl0eSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSW5pdHMgdGhpcyBjbGFzc1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRyb2xzfSBjb250cm9sc1xuICAgKi9cbiAgaW5pdChjb250cm9scynCoHtcbiAgICAvKipcbiAgICAgKiBOZWVkIHRvIGhhdmUgYSBjb21tb24gYmluZGluZyBvZiBoYW5kbGVLZXlEb3duLCBzbyB0aGF0IGl0IGNhbiBiZSBhXG4gICAgICogY29tbW9uIGluc3RhbmNlIHRvIGJlIHVzZWQgZm9yIGFkZEV2ZW50TGlzdGVuZXIgYW5kIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAgICovXG4gICAgdGhpcy5ib3VuZEhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDb250cm9sc31cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRyb2xzID0gY29udHJvbHM7XG4gICAgdGhpcy5jb250cm9scy5vbignYWRkRWxlbWVudCcsIHRoaXMubGlzdGVuRm9yS2V5RG93biwgdGhpcyk7XG4gICAgdGhpcy5jb250cm9scy5vbigncmVtb3ZlRWxlbWVudCcsIHRoaXMucmVtb3ZlS2V5RG93bkxpc3RlbmVyLCB0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgYSBrZXlib2FyZCBwcmVzcyB3aGVuIGVsZW1lbnQgaXMgZm9jdXNlZFxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBsaXN0ZW5Gb3JLZXlEb3duKHtlbGVtZW50fSkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRIYW5kbGVLZXlEb3duKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGEga2V5Ym9hcmQgcHJlc3MgbGlzdGVuZXJcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVtb3ZlS2V5RG93bkxpc3RlbmVyKHtlbGVtZW50fSkge1xuICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRIYW5kbGVLZXlEb3duKTtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyBrZXkgZG93blxuICAgKlxuICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEtleWJvYXJkIGV2ZW50XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgY2FzZSAxMzogLy8gRW50ZXJcbiAgICAgIGNhc2UgMzI6IC8vIFNwYWNlXG4gICAgICAgIHRoaXMuc2VsZWN0KGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM3OiAvLyBMZWZ0IEFycm93XG4gICAgICBjYXNlIDM4OiAvLyBVcCBBcnJvd1xuICAgICAgICB0aGlzLnByZXZpb3VzRWxlbWVudChldmVudC50YXJnZXQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vIFJpZ2h0IEFycm93XG4gICAgICBjYXNlIDQwOiAvLyBEb3duIEFycm93XG4gICAgICAgIHRoaXMubmV4dEVsZW1lbnQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlcyB0aGUgcHJldmlvdXMgZWxlbWVudCBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEV2ZW50VGFyZ2V0fSBlbFxuICAgKiBAZmlyZXMgQ29udHJvbHMjcHJldmlvdXNFbGVtZW50XG4gICAqL1xuICBwcmV2aW91c0VsZW1lbnQoZWwpIHtcbiAgICB0aGlzLmNvbnRyb2xzLmZpcmVzRXZlbnQoJ3ByZXZpb3VzRWxlbWVudCcsIGVsKVxuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlIHRoZSBuZXh0IGVsZW1lbnQgZXZlbnRcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxFdmVudFRhcmdldH0gZWxcbiAgICogQGZpcmVzIENvbnRyb2xzI25leHRFbGVtZW50XG4gICAqL1xuICBuZXh0RWxlbWVudChlbCkge1xuICAgIHRoaXMuY29udHJvbHMuZmlyZXNFdmVudCgnbmV4dEVsZW1lbnQnLCBlbClcbiAgfTtcblxuICAvKipcbiAgICogRmlyZXMgdGhlIHNlbGVjdCBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEhUTUxFbGVtZW50fSBlbFxuICAgKiBAZmlyZXMgQ29udHJvbHMjc2VsZWN0XG4gICAqL1xuICBzZWxlY3QoZWwpe1xuICAgIGlmKHRoaXMuc2VsZWN0YWJpbGl0eSkge1xuICAgICAgaWYodGhpcy5jb250cm9scy5maXJlc0V2ZW50KCdiZWZvcmUtc2VsZWN0JywgZWwpICE9PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNvbnRyb2xzLmZpcmVzRXZlbnQoJ3NlbGVjdCcsIGVsKTtcbiAgICAgICAgdGhpcy5jb250cm9scy5maXJlc0V2ZW50KCdhZnRlci1zZWxlY3QnLCBlbClcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2FibGUgcG9zc2liaWxpdHkgdG8gc2VsZWN0IGEgd29yZCB0cm91Z2ggY2xpY2sgYW5kIHNwYWNlIG9yIGVudGVyXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGRpc2FibGVTZWxlY3RhYmlsaXR5KCkge1xuICAgIHRoaXMuc2VsZWN0YWJpbGl0eSA9IGZhbHNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbmFibGUgcG9zc2liaWxpdHkgdG8gc2VsZWN0IGEgd29yZCB0cm91Z2ggY2xpY2sgYW5kIHNwYWNlIG9yIGVudGVyXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGVuYWJsZVNlbGVjdGFiaWxpdHkoKSB7XG4gICAgdGhpcy5zZWxlY3RhYmlsaXR5ID0gdHJ1ZTtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrLXVpL3NyYy9zY3JpcHRzL3VpL2tleWJvYXJkLmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSwgY2xhc3NMaXN0Q29udGFpbnMsIHF1ZXJ5U2VsZWN0b3IsIG5vZGVMaXN0VG9BcnJheSB9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICovXG5jb25zdCBBVFRSSUJVVEVfU0laRSA9ICdkYXRhLXNpemUnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgZGlzYWJsZSA9IHNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBlbmFibGUgPSByZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBlbmFibGVkXG4gKi9cbmNvbnN0IHRvZ2dsZUVuYWJsZWQgPSAoZWxlbWVudCwgZW5hYmxlZCkgPT4gKGVuYWJsZWQgPyBlbmFibGUgOiBkaXNhYmxlKShlbGVtZW50KTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGhpZGRlblxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gY3VycnkoKGhpZGRlbiwgZWxlbWVudCkgPT4gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGhpZGRlbi50b1N0cmluZygpLCBlbGVtZW50KSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBpc0Rpc2FibGVkID0gaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgdmlld1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICovXG5jb25zdCB1cGRhdGVWaWV3ID0gKGVsZW1lbnQsIHN0YXRlKSA9PiB7XG4gIGNvbnN0IHByZXZCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2aW91cycpO1xuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICBjb25zdCBsaXN0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICBjb25zdCB0b3RhbENvdW50ID0gbGlzdC5jaGlsZEVsZW1lbnRDb3VudDtcblxuICAvLyB1cGRhdGUgbGlzdCBzaXplc1xuICBsaXN0LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gc3RhdGUuZGlzcGxheUNvdW50ICogdG90YWxDb3VudH0lYDtcbiAgbGlzdC5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7c3RhdGUucG9zaXRpb24gKiAoMTAwIC8gc3RhdGUuZGlzcGxheUNvdW50KX0lYDtcblxuICAvLyB1cGRhdGUgaW1hZ2Ugc2l6ZXNcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXG4gICAgLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gdG90YWxDb3VudH0lYCk7XG5cbiAgLy8gdG9nZ2xlIGJ1dHRvbiB2aXNpYmlsaXR5XG4gIFtwcmV2QnV0dG9uLCBuZXh0QnV0dG9uXVxuICAgIC5mb3JFYWNoKHRvZ2dsZVZpc2liaWxpdHkoc3RhdGUuZGlzcGxheUNvdW50ID49IHRvdGFsQ291bnQpKTtcblxuICAvLyB0b2dnbGUgYnV0dG9uIGVuYWJsZSwgZGlzYWJsZWRcbiAgdG9nZ2xlRW5hYmxlZChuZXh0QnV0dG9uLCBzdGF0ZS5wb3NpdGlvbiA+IChzdGF0ZS5kaXNwbGF5Q291bnQgLSB0b3RhbENvdW50KSk7XG4gIHRvZ2dsZUVuYWJsZWQocHJldkJ1dHRvbiwgc3RhdGUucG9zaXRpb24gPCAwKTtcbn07XG5cbi8qKlxuICogSGFuZGxlcyBidXR0b24gY2xpY2tlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYnV0dG9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB1cGRhdGVTdGF0ZVxuICpcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBvbk5hdmlnYXRpb25CdXR0b25DbGljayA9IChlbGVtZW50LCBzdGF0ZSwgYnV0dG9uLCB1cGRhdGVTdGF0ZSkgPT4ge1xuICBpZighaXNEaXNhYmxlZChidXR0b24pKXtcbiAgICB1cGRhdGVTdGF0ZShzdGF0ZSk7XG4gICAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG4gIH1cbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gaW1hZ2VcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpbWFnZVxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGluaXRJbWFnZSA9IGN1cnJ5KChlbGVtZW50LCBpbWFnZSkgPT4ge1xuICBsZXQgdGFyZ2V0SWQgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgbGV0IHRhcmdldCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFyZ2V0SWR9YCk7XG5cbiAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcbiAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpKVxufSk7XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHdoZW4gdGhlIGRvbSBpcyB1cGRhdGVkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSByZWNvcmRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoYW5kbGVEb21VcGRhdGUgPSBjdXJyeSgoZWxlbWVudCwgc3RhdGUsIHJlY29yZCkgPT4ge1xuICAvLyBvbiBhZGQgaW1hZ2UgcnVuIGluaXRpYWxpemF0aW9uXG4gIGlmKHJlY29yZC50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgIG5vZGVMaXN0VG9BcnJheShyZWNvcmQuYWRkZWROb2RlcylcbiAgICAgIC5maWx0ZXIoY2xhc3NMaXN0Q29udGFpbnMoJ3NsaWRlJykpXG4gICAgICAubWFwKHF1ZXJ5U2VsZWN0b3IoJ2ltZycpKVxuICAgICAgLmZvckVhY2goaW5pdEltYWdlKGVsZW1lbnQpKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgdmlld1xuICB1cGRhdGVWaWV3KGVsZW1lbnQsIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxuICAgIHBvc2l0aW9uOiAwXG4gIH0pKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIC8vIGdldCBidXR0b24gaHRtbCBlbGVtZW50c1xuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICBjb25zdCBwcmV2QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMnKTtcblxuICAvKipcbiAgICogQHR5cGVkZWYge29iamVjdH0gSW1hZ2VTY3JvbGxlclN0YXRlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkaXNwbGF5Q291bnRcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHBvc2l0aW9uXG4gICAqL1xuICBjb25zdCBzdGF0ZSA9IHtcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxuICAgIHBvc2l0aW9uOiAwXG4gIH07XG5cbiAgLy8gaW5pdGlhbGl6ZSBidXR0b25zXG4gIG5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBvbk5hdmlnYXRpb25CdXR0b25DbGljayhlbGVtZW50LCBzdGF0ZSwgbmV4dEJ1dHRvbiwgc3RhdGUgPT4gc3RhdGUucG9zaXRpb24tLSkpO1xuICBwcmV2QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2soZWxlbWVudCwgc3RhdGUsIHByZXZCdXR0b24sIHN0YXRlID0+IHN0YXRlLnBvc2l0aW9uKyspKTtcblxuICAvLyBpbml0aWFsaXplIGltYWdlc1xuICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1thcmlhLWNvbnRyb2xzXScpLmZvckVhY2goaW5pdEltYWdlKGVsZW1lbnQpKTtcblxuICAvLyBsaXN0ZW4gZm9yIHVwZGF0ZXMgdG8gZGF0YS1zaXplXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZvckVhY2goaGFuZGxlRG9tVXBkYXRlKGVsZW1lbnQsIHN0YXRlKSkpO1xuXG4gIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwge1xuICAgIHN1YnRyZWU6IHRydWUsXG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbQVRUUklCVVRFX1NJWkVdXG4gIH0pO1xuXG4gIC8vIGluaXRpYWxpemUgcG9zaXRpb25cbiAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlci5qcyIsImltcG9ydCB7c2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIGF0dHJpYnV0ZUVxdWFscywgbm9kZUxpc3RUb0FycmF5fSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcbmltcG9ydCBLZXlib2FyZCBmcm9tICcuLi91dGlscy9rZXlib2FyZCc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaXNTZWxlY3RlZCA9IGF0dHJpYnV0ZUVxdWFscygnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChyZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSk7XG5cbi8qKlxuICogQ2hhbmdlIHRhYiBwYW5lbCB3aGVuIHRhYidzIGFyaWEtc2VsZWN0ZWQgaXMgY2hhbmdlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhYlxuICovXG5jb25zdCBhZGRBcmlhU2VsZWN0ZWRPYnNlcnZlciA9IChlbGVtZW50LCB0YWIpID0+IHtcbiAgLy8gc2V0IG9ic2VydmVyIG9uIHRpdGxlIGZvciBhcmlhLWV4cGFuZGVkXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBsZXQgcGFuZWxJZCA9IHRhYi5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICBsZXQgcGFuZWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3BhbmVsSWR9YCk7XG4gICAgbGV0IGFsbFBhbmVscyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJwYW5lbFwiXScpO1xuXG4gICAgaWYoaXNTZWxlY3RlZCh0YWIpKSB7XG4gICAgICBoaWRlQWxsKGFsbFBhbmVscyk7XG4gICAgICBzaG93KHBhbmVsKTtcbiAgICB9XG4gIH0pO1xuXG4gIG9ic2VydmVyLm9ic2VydmUodGFiLCB7XG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcImFyaWEtc2VsZWN0ZWRcIl1cbiAgfSk7XG59O1xuXG4vKipcbiAqIFNlbGVjdHMgYW4gZWxlbWVudCwgYW5kIHVuc2VsZWN0cyBhbGwgb3RoZXIgdGFic1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gYWxsVGFic1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNlbGVjdFRhYiA9IGN1cnJ5KChhbGxUYWJzLCBlbGVtZW50KSA9PiB7XG4gIHVuU2VsZWN0QWxsKGFsbFRhYnMpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG59KTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0YWJzID0gbm9kZUxpc3RUb0FycmF5KGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJcIl0nKSk7XG4gIGNvbnN0IGtleWJvYXJkID0gbmV3IEtleWJvYXJkKCk7XG5cbiAgLy8gaGFuZGxlIGVudGVyICsgc3BhY2UgY2xpY2tcbiAga2V5Ym9hcmQub25TZWxlY3QgPSBzZWxlY3RUYWIodGFicyk7XG5cbiAgLy8gaW5pdCB0YWJzXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuICAgIGFkZEFyaWFTZWxlY3RlZE9ic2VydmVyKGVsZW1lbnQsIHRhYik7XG5cbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICBsZXQgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGxldCBlbGVtZW50SW5kZXggPSB0YWJzLmluZGV4T2YoZWxlbWVudCk7XG4gICAgICBzZWxlY3RUYWIodGFicywgZWxlbWVudCk7XG4gICAgICBrZXlib2FyZC5mb3JjZVNlbGVjdGVkSW5kZXgoZWxlbWVudEluZGV4KTtcbiAgICB9KTtcblxuICAgIGtleWJvYXJkLmFkZEVsZW1lbnQodGFiKTtcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gJy4vZWxlbWVudHMnO1xuaW1wb3J0IHsgZm9yRWFjaCwgd2l0aG91dCB9IGZyb20gJy4vZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGFkZFRhYkluZGV4ID0gc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHJlbW92ZVRhYkluZGV4ID0gcmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcbiAqIEBmdW5jdGlvblxuICovXG5cbmNvbnN0IHJlbW92ZVRhYkluZGV4Rm9yQWxsID0gZm9yRWFjaChyZW1vdmVUYWJJbmRleCk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhhc1RhYkluZGV4ID0gaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuXG4vKipcbiAqIFNldHMgdGFiaW5kZXggYW5kIGZvY3VzIG9uIGFuIGVsZW1lbnQsIHJlbW92ZSBpdCBmcm9tIGFsbCBvdGhlcnNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqL1xuY29uc3QgdXBkYXRlVGFiYmFibGUgPSAoZWxlbWVudHMsIGluZGV4KSA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkRWxlbWVudCA9IGVsZW1lbnRzW2luZGV4XTtcblxuICBpZihzZWxlY3RlZEVsZW1lbnQpIHtcbiAgICByZW1vdmVUYWJJbmRleEZvckFsbChlbGVtZW50cyk7XG4gICAgYWRkVGFiSW5kZXgoc2VsZWN0ZWRFbGVtZW50KTtcbiAgICBzZWxlY3RlZEVsZW1lbnQuZm9jdXMoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZXRzIHRhYmluZGV4IG9uIGFuIGVsZW1lbnQsIHJlbW92ZSBpdCBmcm9tIGFsbCBvdGhlcnNcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY3VycmVudEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gbGFzdEluZGV4XG4gKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5jb25zdCBuZXh0SW5kZXggPSAoY3VycmVudEluZGV4LCBsYXN0SW5kZXgpID0+IChjdXJyZW50SW5kZXggPT09IGxhc3RJbmRleCkgPyAwIDogKGN1cnJlbnRJbmRleCArIDEpO1xuXG4vKipcbiAqIFNldHMgdGFiaW5kZXggb24gYW4gZWxlbWVudCwgcmVtb3ZlIGl0IGZyb20gYWxsIG90aGVyc1xuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBjdXJyZW50SW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBsYXN0SW5kZXhcbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmNvbnN0IHByZXZpb3VzSW5kZXggPSAoY3VycmVudEluZGV4LCBsYXN0SW5kZXgpID0+IChjdXJyZW50SW5kZXggPT09IDApID8gbGFzdEluZGV4IDogKGN1cnJlbnRJbmRleCAtIDEpO1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcbiAgICAgKi9cbiAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGJvdW5kIGtleSBoYW5kbGVyLCB0aGF0IGNhbiBiZSByZW1vdmVkXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gYm91bmRIYW5kbGVLZXlEb3duXG4gICAgICovXG4gICAgdGhpcy5ib3VuZEhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2VsZWN0ZWRJbmRleFxuICAgICAqL1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGtleWJvYXJkIHN1cHBvcnQgdG8gYW4gZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFkZEVsZW1lbnQoZWxlbWVudCnCoHtcbiAgICB0aGlzLmVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5ib3VuZEhhbmRsZUtleURvd24pO1xuXG4gICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAxKSB7IC8vIGlmIGZpcnN0XG4gICAgICBhZGRUYWJJbmRleChlbGVtZW50KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBjb250cm9scyB0byBhbiBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcmVtb3ZlRWxlbWVudChlbGVtZW50KcKge1xuICAgIHRoaXMuZWxlbWVudHMgPSB3aXRob3V0KFtlbGVtZW50XSwgdGhpcy5lbGVtZW50cyk7XG5cbiAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmJvdW5kSGFuZGxlS2V5RG93bik7XG5cbiAgICAvLyBpZiByZW1vdmVkIGVsZW1lbnQgd2FzIHNlbGVjdGVkXG4gICAgaWYoaGFzVGFiSW5kZXgoZWxlbWVudCkpIHtcbiAgICAgIHJlbW92ZVRhYkluZGV4KGVsZW1lbnQpO1xuXG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgdXBkYXRlVGFiYmFibGUodGhpcy5lbGVtZW50cywgdGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMga2V5IGRvd24sIGFuZCB1cGRhdGVzIHRoZSB0YWIgaW5kZXhcbiAgICpcbiAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBLZXlib2FyZCBldmVudFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgIGNvbnN0IGxhc3RJbmRleCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoIC0gMTtcblxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgIGNhc2UgMTM6IC8vIEVudGVyXG4gICAgICBjYXNlIDMyOiAvLyBTcGFjZVxuICAgICAgICB0aGlzLnNlbGVjdCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzU6IC8vIEVuZFxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNjogLy8gSG9tZVxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzc6IC8vIExlZnQgQXJyb3dcbiAgICAgIGNhc2UgMzg6IC8vIFVwIEFycm93XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHByZXZpb3VzSW5kZXgodGhpcy5zZWxlY3RlZEluZGV4LCBsYXN0SW5kZXgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vIFJpZ2h0IEFycm93XG4gICAgICBjYXNlIDQwOiAvLyBEb3duIEFycm93XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IG5leHRJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgsIGxhc3RJbmRleCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHVwZGF0ZVRhYmJhYmxlKHRoaXMuZWxlbWVudHMsIHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlbGVjdGVkIGluZGV4LCBhbmQgdXBkYXRlcyB0aGUgdGFiIGluZGV4XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKi9cbiAgZm9yY2VTZWxlY3RlZEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgdXBkYXRlVGFiYmFibGUodGhpcy5lbGVtZW50cywgdGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyAnb25TZWxlY3QnIGZ1bmN0aW9uIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgc2VsZWN0KCkge1xuICAgIGlmKHRoaXMub25TZWxlY3QgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uU2VsZWN0KHRoaXMuZWxlbWVudHNbdGhpcy5zZWxlY3RlZEluZGV4XSk7XG4gICAgfVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMva2V5Ym9hcmQuanMiLCJyZXF1aXJlKCcuLi8uLi9zcmMvc3R5bGVzL21haW4uc2NzcycpO1xuXG4vLyBMb2FkIGxpYnJhcnlcbkg1UCA9IEg1UCB8fCB7fTtcbkg1UC5IdWJDbGllbnQgPSByZXF1aXJlKCcuLi9zY3JpcHRzL2h1YicpLmRlZmF1bHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsICBub2RlTGlzdFRvQXJyYXksIHRvZ2dsZUNsYXNzIH0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuaW1wb3J0IHsgaW5pdENvbGxhcHNpYmxlIH0gZnJvbSAnLi4vdXRpbHMvY29sbGFwc2libGUnO1xuaW1wb3J0IEtleWJvYXJkIGZyb20gJy4uL3V0aWxzL2tleWJvYXJkJztcblxuLyoqXG4gKiBVbnNlbGVjdHMgYWxsIGVsZW1lbnRzIGluIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBlbGVtZW50c1xuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChyZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSk7XG5cbi8qKlxuICogU2V0cyB0aGUgYXJpYS1leHBhbmRlZCBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudCB0byBmYWxzZVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuY29uc3QgdW5FeHBhbmQgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBTZWxlY3RzIGFuIGVsZW1lbnQsIGFuZCB1biBzZWxlY3RzIGFsbCBvdGhlciBtZW51IGl0ZW1zXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBtZW51SXRlbXNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBvblNlbGVjdE1lbnVJdGVtID0gKG1lbnVJdGVtcywgZWxlbWVudCkgPT4ge1xuICB1blNlbGVjdEFsbChtZW51SXRlbXMpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG59O1xuXG4vKipcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIC8vIGVsZW1lbnRzXG4gIGNvbnN0IG1lbnVJdGVtcyA9IG5vZGVMaXN0VG9BcnJheShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKSk7XG4gIGNvbnN0IHRvZ2dsZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScpO1xuICBjb25zdCBrZXlib2FyZCA9IG5ldyBLZXlib2FyZCgpO1xuXG4gIGtleWJvYXJkLm9uU2VsZWN0ID0gZWxlbWVudCA9PiB7XG4gICAgb25TZWxlY3RNZW51SXRlbShtZW51SXRlbXMsIGVsZW1lbnQpO1xuICAgIHVuRXhwYW5kKHRvZ2dsZXIpO1xuICB9O1xuXG4gIC8vIG1vdmUgc2VsZWN0XG4gIG1lbnVJdGVtcy5mb3JFYWNoKG1lbnVJdGVtID0+IHtcbiAgICAvLyBhZGQgbW91c2UgY2xpY2sgbGlzdGVuZXJcbiAgICBtZW51SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIGxldCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgbGV0IGVsZW1lbnRJbmRleCA9IG1lbnVJdGVtcy5pbmRleE9mKGVsZW1lbnQpO1xuXG4gICAgICBvblNlbGVjdE1lbnVJdGVtKG1lbnVJdGVtcywgZWxlbWVudCk7XG4gICAgICB1bkV4cGFuZCh0b2dnbGVyKTtcbiAgICAgIGtleWJvYXJkLmZvcmNlU2VsZWN0ZWRJbmRleChlbGVtZW50SW5kZXgpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGtleWJvYXJkIHN1cHBvcnRcbiAgICBrZXlib2FyZC5hZGRFbGVtZW50KG1lbnVJdGVtKTtcbiAgfSk7XG5cbiAgLy8gaW5pdCBjb2xsYXBzZSBhbmQgb3BlblxuICBpbml0Q29sbGFwc2libGUoZWxlbWVudCwgdG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvbmF2YmFyLmpzIiwiaW1wb3J0IHthdHRyaWJ1dGVFcXVhbHMsIHRvZ2dsZUF0dHJpYnV0ZSwgdG9nZ2xlVmlzaWJpbGl0eX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhcmlhLWV4cGFuZGVkPXRydWUgb24gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc0V4cGFuZGVkID0gYXR0cmlidXRlRXF1YWxzKFwiYXJpYS1leHBhbmRlZFwiLCAndHJ1ZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYXJpYS1oaWRkZW4gb24gJ2NvbGxhcHNpYmxlJyB3aGVuIGFyaWEtZXhwYW5kZWQgY2hhbmdlcyBvbiAndG9nZ2xlcicsXG4gKiBhbmQgdG9nZ2xlcyBhcmlhLWV4cGFuZGVkIG9uICd0b2dnbGVyJyBvbiBjbGlja1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFt0YXJnZXRIYW5kbGVyXSBmYWxscyBiYWNrIHRvIHRvZ2dsZVZpc2liaWxpdHkgd2l0aCBhcmlhLWhpZGRlblxuICovXG5leHBvcnQgY29uc3QgaW5pdENvbGxhcHNpYmxlID0gKGVsZW1lbnQsIHRhcmdldEhhbmRsZXIgPSB0b2dnbGVWaXNpYmlsaXR5KSA9PiB7XG4gIC8vIGVsZW1lbnRzXG4gIGNvbnN0IHRvZ2dsZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScpO1xuICBjb25zdCBjb2xsYXBzaWJsZUlkID0gdG9nZ2xlci5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgY29uc3QgY29sbGFwc2libGUgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2NvbGxhcHNpYmxlSWR9YCk7XG5cbiAgLy8gc2V0IG9ic2VydmVyIG9uIHRpdGxlIGZvciBhcmlhLWV4cGFuZGVkXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHRhcmdldEhhbmRsZXIoaXNFeHBhbmRlZCh0b2dnbGVyKSwgY29sbGFwc2libGUpKTtcblxuICBvYnNlcnZlci5vYnNlcnZlKHRvZ2dsZXIsIHtcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW1wiYXJpYS1leHBhbmRlZFwiXVxuICB9KTtcblxuICAvLyBTZXQgY2xpY2sgbGlzdGVuZXIgdGhhdCB0b2dnbGVzIGFyaWEtZXhwYW5kZWRcbiAgdG9nZ2xlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRvZ2dsZUF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgdG9nZ2xlcikpO1xuXG4gIC8vIGluaXRpYWxpemVcbiAgdGFyZ2V0SGFuZGxlcihpc0V4cGFuZGVkKHRvZ2dsZXIpLCBjb2xsYXBzaWJsZSk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2NvbGxhcHNpYmxlLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGljdGlvbmFyeSB7XG5cbiAgc3RhdGljIGluaXQoZGljdGlvbmFyeSkge1xuICAgIERpY3Rpb25hcnkuZGljdGlvbmFyeSA9IGRpY3Rpb25hcnk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc3RyaW5nIGZyb20gdGhlIGRpY3Rpb25hcnkuIE9wdGlvbmFsbHkgcmVwbGFjZSB2YXJpYWJsZXNcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVwbGFjZW1lbnRzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZ2V0KGtleSwgcmVwbGFjZW1lbnRzKSB7XG5cbiAgICAvLyB2YXIgdHJhbnNsYXRpb24gPSBEaWN0aW9uYXJ5LmRpY3Rpb25hcnlba2V5XTtcbiAgICAvL1xuICAgIC8vIC8vIFJlcGxhY2UgcGxhY2Vob2xkZXIgd2l0aCB2YXJpYWJsZXMuXG4gICAgLy8gZm9yICh2YXIgcGxhY2Vob2xkZXIgaW4gcmVwbGFjZW1lbnRzKSB7XG4gICAgLy8gICBpZiAoIXJlcGxhY2VtZW50c1twbGFjZWhvbGRlcl0pIHtcbiAgICAvLyAgICAgY29udGludWU7XG4gICAgLy8gICB9XG4gICAgLy8gICB0cmFuc2xhdGlvbiA9IHRyYW5zbGF0aW9uLnJlcGxhY2UocGxhY2Vob2xkZXIsIHJlcGxhY2VtZW50c1twbGFjZWhvbGRlcl0pO1xuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIHJldHVybiB0cmFuc2xhdGlvbjtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZGljdGlvbmFyeS5qcyIsImltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbGF5Q2xpY2tFdmVudEFzfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlVmlldyB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS50eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS50aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUuY29udGVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlLmFjdGlvbl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzdGF0ZS5kaXNtaXNzYWJsZV1cbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudHNcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50KHN0YXRlKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQobWVzc2FnZSkge1xuICAgIC8vIENyZWF0ZSB3cmFwcGVyOlxuICAgIGNvbnN0IG1lc3NhZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVzc2FnZVdyYXBwZXIuY2xhc3NOYW1lID0gYG1lc3NhZ2UgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XG5cbiAgICAvLyBBZGQgY2xvc2UgYnV0dG9uIGlmIGRpc21pc2FibGVcbiAgICBpZiAobWVzc2FnZS5kaXNtaXNzaWJsZSkge1xuICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XG4gICAgICAvL2Nsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmI3gyNzE1JztcbiAgICAgIC8vIFRPRE9cbiAgICAgIC8vIC0gQWRkIGNsb3NlIGxhYmVsIGZyb20gdHJhbnNsYXRpb25zXG4gICAgICAvLyAtIEFkZCB2aXN1YWxzIGluIENTUyAoZm9udCBpY29uKVxuICAgICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ2Nsb3NlJywgdGhpcywgY2xvc2VCdXR0b24pO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVzc2FnZUNvbnRlbnQuY2xhc3NOYW1lID0gJ21lc3NhZ2UtY29udGVudCc7XG4gICAgbWVzc2FnZUNvbnRlbnQuaW5uZXJIVE1MID0gJzxoMj4nICsgbWVzc2FnZS50aXRsZSArICc8L2gyPicgKyAnPHA+JyArIG1lc3NhZ2UuY29udGVudCArICc8L3A+JztcbiAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGVudCk7XG5cbiAgICBpZiAobWVzc2FnZS5hY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgbWVzc2FnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgbWVzc2FnZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcbiAgICAgIG1lc3NhZ2VCdXR0b24uaW5uZXJIVE1MID0gbWVzc2FnZS5hY3Rpb247XG4gICAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQnV0dG9uKTtcblxuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ2FjdGlvbi1jbGlja2VkJywgdGhpcywgbWVzc2FnZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlldy5qcyIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpXG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCdcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHsgYm9keTogdGhpcy5fYm9keUluaXQgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gICAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcbiAgICB2YXIgcHJlUHJvY2Vzc2VkSGVhZGVycyA9IHJhd0hlYWRlcnMucmVwbGFjZSgvXFxyP1xcbltcXHQgXSsvLCAnICcpXG4gICAgcHJlUHJvY2Vzc2VkSGVhZGVycy5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZmV0Y2guanMiXSwic291cmNlUm9vdCI6IiJ9