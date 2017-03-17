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
/* 5 */
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

var _eventful = __webpack_require__(1);

var _errors = __webpack_require__(5);

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

var _functional = __webpack_require__(0);

var _eventful = __webpack_require__(1);

var _panel = __webpack_require__(6);

var _panel2 = _interopRequireDefault(_panel);

var _imageScroller = __webpack_require__(22);

var _imageScroller2 = _interopRequireDefault(_imageScroller);

var _events = __webpack_require__(4);

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
      element.innerHTML = "\n      <button class=\"back-button icon-arrow-thick\" aria-label=\"" + labelBack + "\" tabindex=\"0\"></button>\n      <div class=\"container\">\n        <div class=\"image-wrapper\"><img class=\"img-responsive content-type-image\" src=\"" + _contentTypePlaceholder2.default + "\"></div>\n        <div class=\"text-details\">\n          <h2 class=\"title\"></h2>\n          <div class=\"owner\"></div>\n          <p class=\"small\"></p>\n          <a class=\"button demo-button\" target=\"_blank\" aria-hidden=\"false\" href=\"#\">Content Demo</a>\n        </div>\n      </div>\n      <div class=\"carousel\" role=\"region\" data-size=\"5\">\n        <span class=\"carousel-button previous\" aria-hidden=\"true\" disabled><span class=\"icon-arrow-thick\"></span></span>\n        <span class=\"carousel-button next\" aria-hidden=\"true\" disabled><span class=\"icon-arrow-thick\"></span></span>\n        <nav class=\"scroller\">\n          <ul></ul>\n        </nav>\n      </div>\n      <hr />\n      <div class=\"install-message message dismissible simple info\" aria-hidden=\"true\">\n        <div class=\"message-close icon-close\"></div>\n        <h3></h3>\n      </div>\n      <div class=\"button-bar\">\n        <span class=\"button button-primary button-use\" aria-hidden=\"false\" data-id=\"\">Use</span>\n        <span class=\"button button-inverse-primary button-install\" aria-hidden=\"true\" data-id=\"\"><span class=\"icon-arrow-thick\"></span>Install</span>\n        <span class=\"button button-inverse-primary button-installing\" aria-hidden=\"true\"><span class=\"icon-loading-search icon-spin\"></span>Installing</span>\n      </div>\n      <div class=\"panel-group\">\n        <div class=\"panel licence-panel\" aria-hidden=\"true\">\n          <div class=\"panel-header\" aria-expanded=\"false\" aria-controls=\"licence-panel\"><span class=\"icon-accordion-arrow\"></span> The Licence Info</div>\n          <div class=\"panel-body\" id=\"licence-panel\" aria-hidden=\"true\">\n            <div class=\"panel-body-inner\"></div>\n          </div>\n        </div>\n      </div>";

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

      // set spinner
      this.view.showButtonBySelector('.button-installing');

      return this.services.contentType(id).then(function (contentType) {
        return _this.services.installContentType(contentType.machineName);
      }).then(function (contentType) {
        _this.view.setIsInstalled(true);
        _this.view.showButtonBySelector('.button-get');
        _this.view.setInstallMessage({
          message: contentType.title + " successfully installed!"
        });
      }).catch(function (error) {
        _this.view.showButtonBySelector('.button-install');

        // print error message
        var errorMessage = error.errorCode ? error : {
          success: false,
          errorCode: 'RESPONSE_FAILED',
          message: id + " could not be installed! Contact your administrator."
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
    key: "update",
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

      // row item
      var element = document.createElement('li');
      element.id = "content-type-" + contentType.machineName;
      element.setAttribute('data-id', contentType.machineName);
      element.setAttribute('aria-labelledby', contentTypeRowTitleId);
      element.setAttribute('aria-describedby', contentTypeRowDescriptionId);

      // create html
      element.innerHTML = "\n      <img class=\"img-responsive\" src=\"" + image + "\">\n      <button aria-describedby=\"" + contentTypeRowTitleId + "\" class=\"button " + button.cls + "\" data-id=\"" + contentType.machineName + "\" tabindex=\"0\">\n        <span class=\"" + button.icon + "\"></span>\n        " + button.text + "\n      </button>\n      <h4 id=\"" + contentTypeRowTitleId + "\">" + title + "</h4>\n      <div id=\"" + contentTypeRowDescriptionId + "\" class=\"description\">" + description + "</div>\n   ";

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

    // create elements
    this.rootElement = this.createElement(state);

    // pick elements
    this.menubar = this.rootElement.querySelector('.navbar-nav');
    this.inputField = this.rootElement.querySelector('[role="search"] input');
    this.displaySelected = this.rootElement.querySelector('.navbar-toggler-selected');
    var inputButton = this.rootElement.querySelector('[role="search"] .input-group-addon');

    // input field
    this.inputField.addEventListener('keyup', function (event) {
      _this.fire('search', {
        element: event.target,
        query: event.target.value,
        keyCode: event.which || event.keyCode
      });
    });

    // input button
    inputButton.addEventListener('click', function (event) {
      var searchbar = event.target.parentElement.querySelector('#hub-search-bar');

      _this.fire('search', {
        element: searchbar,
        query: searchbar.value,
        keyCode: 13 // Act like an 'enter' key press
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
      element.innerHTML = "\n      <div class=\"menu-group\">\n        <nav  role=\"menubar\" class=\"navbar\">\n          <div class=\"navbar-header\">\n             <span class=\"navbar-toggler navbar-toggler-right\" aria-controls=\"" + menuId + "\" aria-expanded=\"false\">\n               <span class=\"navbar-toggler-selected\"></span>\n               <span class=\"icon-accordion-arrow\"></span>\n             </span>\n            <span class=\"navbar-brand\">" + menutitle + "</span>\n          </div>\n\n          <ul id=\"" + menuId + "\" class=\"navbar-nav\"></ul>\n        </nav>\n        \n        <div class=\"input-group\" role=\"search\">\n          <input id=\"hub-search-bar\" class=\"form-control form-control-rounded\" type=\"text\" placeholder=\"" + searchText + "\" />\n          <div class=\"input-group-addon icon-search\"></div>\n        </div>\n      </div>";

      return element;
    }

    /**
     * Adds a menu item
     *
     * @param {string} title
     * @param {string} id
     * @param {boolean} id
     *
     * @return {HTMLElement}
     */

  }, {
    key: "addMenuItem",
    value: function addMenuItem(_ref) {
      var title = _ref.title,
          id = _ref.id,
          selected = _ref.selected;

      var element = document.createElement('li');
      element.setAttribute('role', 'menuitem');
      element.setAttribute('data-id', id);
      element.innerText = title;

      // sets if this menuitem should be selected
      if (selected) {
        element.setAttribute('aria-selected', 'true');
        this.displaySelected.innerText = title;
      }

      (0, _events.relayClickEventAs)('menu-selected', this, element);

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

        this.fire('menu-selected', {
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

var _errors = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @constant {string}
 */
var ID_FILTER_ALL = 'filter-all';

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
    _classCallCheck(this, ContentTypeSection);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    this.typeAheadEnabled = true;

    // add view
    this.view = new _contentTypeSectionView2.default(state);

    // controller
    this.searchService = new _searchService2.default({ apiRootUrl: state.apiRootUrl });
    this.contentTypeList = new _contentTypeList2.default();
    this.contentTypeDetail = new _contentTypeDetail2.default({ apiRootUrl: state.apiRootUrl });

    // configuration for filters
    var filterConfigs = [{
      title: 'All',
      id: ID_FILTER_ALL
    }, {
      title: 'My Content Types',
      id: 'filter-my-content-types',
      selected: true
    }, {
      title: 'Most Popular',
      id: 'filter-most-popular'
    }];

    // add menu items
    filterConfigs.forEach(this.view.addMenuItem, this.view);
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
    this.view.on('search', this.view.selectMenuItemById.bind(this.view, ID_FILTER_ALL));
    this.view.on('search', this.resetMenuOnEnter, this);
    this.view.on('menu-select ed', this.applySearchFilter, this);
    this.view.on('menu-selected', this.clearInputField, this);
    this.view.on('menu-selected', this.updateDisplaySelected, this);
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
      var _this = this;

      // initialize by search
      this.searchService.search("").then(function (contentTypes) {
        return _this.contentTypeList.update(contentTypes);
      }).catch(function (error) {
        return _this.fire('error', error);
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

      if (this.typeAheadEnabled || keyCode === 13) {
        // Search automatically or on 'enter'
        this.searchService.search(query).then(function (contentTypes) {
          return _this2.contentTypeList.update(contentTypes);
        });
      }
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
  }, {
    key: "resetMenuOnEnter",
    value: function resetMenuOnEnter(_ref2) {
      var keyCode = _ref2.keyCode;

      if (keyCode === 13) {
        this.closeDetailView();
      }
    }

    /**
     * Should apply a search filter
     * @param {SelectedElement} event
     */

  }, {
    key: "applySearchFilter",
    value: function applySearchFilter(event) {
      console.debug('ContentTypeSection: menu was clicked!', event);
    }

    /**
     * Clears the input field
     *
     * @param {string} id
     */

  }, {
    key: "clearInputField",
    value: function clearInputField(_ref3) {
      var id = _ref3.id;

      if (id !== ID_FILTER_ALL) {
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
    value: function showDetailView(_ref4) {
      var id = _ref4.id;

      this.contentTypeList.hide();
      this.contentTypeDetail.loadById(id);
      this.contentTypeDetail.show();
      this.typeAheadEnabled = false;
    }

    /**
     * Close detail view
     */

  }, {
    key: "closeDetailView",
    value: function closeDetailView() {
      this.contentTypeDetail.hide();
      this.contentTypeList.show();
      this.typeAheadEnabled = true;
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
H5P.HubClient.renderErrorMessage = __webpack_require__(5).default;

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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzZjMzJhMDJjNmRkZTY0NTkyY2QiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9taXhpbnMvZXZlbnRmdWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvbWFpbi5zY3NzPzZhNzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay11aS9zcmMvc2NyaXB0cy9jb250cm9scy5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay11aS9zcmMvc2NyaXB0cy9taXhpbnMvZXZlbnRmdWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGstdWkvc3JjL3NjcmlwdHMvdWkva2V5Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3RhYi1wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9rZXlib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9kaXN0LmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvbmF2YmFyLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2NvbGxhcHNpYmxlLmpzIl0sIm5hbWVzIjpbImN1cnJ5IiwiZm4iLCJhcml0eSIsImxlbmd0aCIsImYxIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJmMiIsImFyZ3MyIiwiY29uY2F0IiwiY29tcG9zZSIsImZucyIsInJlZHVjZSIsImYiLCJnIiwiZm9yRWFjaCIsImFyciIsIm1hcCIsImZpbHRlciIsInNvbWUiLCJjb250YWlucyIsInZhbHVlIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJ2YWx1ZXMiLCJpbnZlcnNlQm9vbGVhblN0cmluZyIsImJvb2wiLCJ0b1N0cmluZyIsIkV2ZW50ZnVsIiwibGlzdGVuZXJzIiwib24iLCJ0eXBlIiwibGlzdGVuZXIiLCJzY29wZSIsInRyaWdnZXIiLCJwdXNoIiwiZmlyZSIsImV2ZW50IiwidHJpZ2dlcnMiLCJldmVyeSIsInByb3BhZ2F0ZSIsInR5cGVzIiwiZXZlbnRmdWwiLCJzZWxmIiwiZ2V0QXR0cmlidXRlIiwibmFtZSIsImVsIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiYXR0cmlidXRlRXF1YWxzIiwidG9nZ2xlQXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJwYXJlbnQiLCJjaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmVDaGlsZCIsIm9sZENoaWxkIiwiY2xhc3NMaXN0Q29udGFpbnMiLCJjbHMiLCJjbGFzc0xpc3QiLCJub2RlTGlzdFRvQXJyYXkiLCJub2RlTGlzdCIsImhpZGUiLCJzaG93IiwidG9nZ2xlVmlzaWJpbGl0eSIsInZpc2libGUiLCJlbGVtZW50IiwidG9nZ2xlQ2xhc3MiLCJhZGQiLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJ3aW5kb3ciLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZXMiLCJjb250ZW50VHlwZSIsImlkIiwibnMiLCJnZXRBamF4VXJsIiwiYm9keSIsImZvcm1EYXRhIiwicmVsYXlDbGlja0V2ZW50QXMiLCJhZGRFdmVudExpc3RlbmVyIiwic3RvcFByb3BhZ2F0aW9uIiwicmVuZGVyRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNsb3NlQnV0dG9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibWVzc2FnZUNvbnRlbnQiLCJ0aXRsZSIsImNvbnRlbnQiLCJtZXNzYWdlV3JhcHBlciIsImRpc21pc3NpYmxlIiwiYnV0dG9uIiwidW5kZWZpbmVkIiwibWVzc2FnZUJ1dHRvbiIsImluaXQiLCJIdWIiLCJzdGF0ZSIsImNvbnRlbnRUeXBlU2VjdGlvbiIsInVwbG9hZFNlY3Rpb24iLCJ2aWV3Iiwic2VydmljZXMiLCJzZXRQYW5lbFRpdGxlIiwiY2xvc2VQYW5lbCIsInNldFNlY3Rpb25UeXBlIiwidG9nZ2xlUGFuZWxPcGVuIiwiYmluZCIsImluaXRUYWJQYW5lbCIsImdldENvbnRlbnRUeXBlIiwic2V0VGl0bGUiLCJzZWN0aW9uSWQiLCJ0YWJDb25maWdzIiwiZ2V0RWxlbWVudCIsImNvbmZpZyIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiYWRkQm90dG9tQm9yZGVyIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsIk1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04iLCJpc0VtcHR5IiwidGV4dCIsImhpZGVBbGwiLCJDb250ZW50VHlwZURldGFpbFZpZXciLCJyb290RWxlbWVudCIsImNyZWF0ZVZpZXciLCJidXR0b25CYXIiLCJ1c2VCdXR0b24iLCJpbnN0YWxsQnV0dG9uIiwiYnV0dG9ucyIsImltYWdlIiwib3duZXIiLCJkZXNjcmlwdGlvbiIsImRlbW9CdXR0b24iLCJjYXJvdXNlbCIsImNhcm91c2VsTGlzdCIsImxpY2VuY2VQYW5lbCIsImluc3RhbGxNZXNzYWdlIiwiaW5zdGFsbE1lc3NhZ2VDbG9zZSIsImxhYmVsQmFjayIsInN1Y2Nlc3MiLCJpbm5lclRleHQiLCJsaWdodGJveCIsImNoaWxkRWxlbWVudENvdW50IiwidXJsIiwiYWx0IiwidGh1bWJuYWlsIiwic3JjIiwiZWxsaXBzaXMiLCJ0b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkIiwiZGVzY3JpcHRpb25FeHBhbmRlZCIsInNpemUiLCJzdWJzdHIiLCJpbnN0YWxsZWQiLCJzaG93QnV0dG9uQnlTZWxlY3RvciIsIkNvbnRlbnRUeXBlRGV0YWlsIiwiaW5zdGFsbCIsInVwZGF0ZSIsImluc3RhbGxDb250ZW50VHlwZSIsInNldElzSW5zdGFsbGVkIiwic2V0SW5zdGFsbE1lc3NhZ2UiLCJjYXRjaCIsImVycm9yTWVzc2FnZSIsImVycm9yIiwiZXJyb3JDb2RlIiwiY29uc29sZSIsInJlc2V0Iiwic2V0SWQiLCJzZXREZXNjcmlwdGlvbiIsInNldEltYWdlIiwiaWNvbiIsInNldEV4YW1wbGUiLCJleGFtcGxlIiwic2V0T3duZXIiLCJzZXRMaWNlbmNlIiwibGljZW5zZSIsInJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwiLCJzY3JlZW5zaG90cyIsImFkZEltYWdlVG9DYXJvdXNlbCIsImdldFJvd0lkIiwiQ29udGVudFR5cGVMaXN0VmlldyIsImNvbnRyb2xzIiwiaGFzQ2hpbGROb2RlcyIsInJvdyIsImxhc3RDaGlsZCIsInJlbW92ZUVsZW1lbnQiLCJjcmVhdGVDb250ZW50VHlwZVJvdyIsImFkZEVsZW1lbnQiLCJpbmRleCIsImNvbnRlbnRUeXBlUm93VGl0bGVJZCIsImNvbnRlbnRUeXBlUm93RGVzY3JpcHRpb25JZCIsInVzZUJ1dHRvbkNvbmZpZyIsImluc3RhbGxCdXR0b25Db25maWciLCJzdW1tYXJ5IiwiQ29udGVudFR5cGVMaXN0IiwicmVtb3ZlQWxsUm93cyIsImFkZFJvdyIsInVuc2VsZWN0QWxsIiwiQ29udGVudEJyb3dzZXJWaWV3IiwibWVudWJhciIsImlucHV0RmllbGQiLCJkaXNwbGF5U2VsZWN0ZWQiLCJpbnB1dEJ1dHRvbiIsInRhcmdldCIsInF1ZXJ5Iiwia2V5Q29kZSIsIndoaWNoIiwic2VhcmNoYmFyIiwicGFyZW50RWxlbWVudCIsImZvY3VzIiwibWVudXRpdGxlIiwibWVudUlkIiwic2VhcmNoVGV4dCIsInNlbGVjdGVkTmFtZSIsIm1lbnVJdGVtcyIsInNlbGVjdGVkTWVudUl0ZW0iLCJ1bmRlcmxpbmUiLCJJRF9GSUxURVJfQUxMIiwiQ29udGVudFR5cGVTZWN0aW9uIiwidHlwZUFoZWFkRW5hYmxlZCIsInNlYXJjaFNlcnZpY2UiLCJjb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZURldGFpbCIsImZpbHRlckNvbmZpZ3MiLCJhZGRNZW51SXRlbSIsImluaXRNZW51Iiwic2VjdGlvbiIsInNlYXJjaCIsInNlbGVjdE1lbnVJdGVtQnlJZCIsInJlc2V0TWVudU9uRW50ZXIiLCJhcHBseVNlYXJjaEZpbHRlciIsImNsZWFySW5wdXRGaWVsZCIsInVwZGF0ZURpc3BsYXlTZWxlY3RlZCIsInNob3dEZXRhaWxWaWV3IiwiY2xvc2VEZXRhaWxWaWV3IiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsInNldERpc3BsYXlTZWxlY3RlZCIsImRlYnVnIiwibG9hZEJ5SWQiLCJBVFRSSUJVVEVfREFUQV9JRCIsImlzT3BlbiIsIkh1YlZpZXciLCJyZW5kZXJUYWJQYW5lbCIsInJlbmRlclBhbmVsIiwiZXhwYW5kZWQiLCJ0YWJDb250YWluZXJFbGVtZW50IiwicGFuZWwiLCJzZXRUaW1lb3V0IiwidGFibGlzdCIsInRhYkxpc3RXcmFwcGVyIiwidGFiSWQiLCJ0YWJQYW5lbElkIiwidGFiIiwidGFiUGFuZWwiLCJTZWFyY2hTZXJ2aWNlIiwiZmlsdGVyQnlRdWVyeSIsInNjb3JlIiwiZ2V0U2VhcmNoU2NvcmUiLCJzb3J0Iiwic29ydFNlYXJjaFJlc3VsdHMiLCJhIiwiYiIsInBvcHVsYXJpdHkiLCJxdWVyaWVzIiwic3BsaXQiLCJxdWVyeVNjb3JlcyIsImdldFNjb3JlRm9yRWFjaFF1ZXJ5IiwidHJpbSIsImhhc1N1YlN0cmluZyIsImFycmF5SGFzU3ViU3RyaW5nIiwia2V5d29yZHMiLCJuZWVkbGUiLCJoYXlzdGFjayIsInRvTG93ZXJDYXNlIiwic3ViU3RyaW5nIiwic3RyaW5nIiwiQWRkTnVtYmVyIiwiVXBsb2FkU2VjdGlvbiIsImg1cFVwbG9hZCIsInRleHRDb250ZW50IiwiZGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiZmlsZXMiLCJ1cGxvYWRDb250ZW50IiwicmVtb3ZlVGFiSW5kZXgiLCJyZW1vdmVUYWJJbmRleEZvckFsbCIsInNldFRhYkluZGV4WmVybyIsImhhc1RhYkluZGV4IiwiQ29udHJvbHMiLCJwbHVnaW5zIiwiZWxlbWVudHMiLCJuZXh0RWxlbWVudCIsInByZXZpb3VzRWxlbWVudCIsImluaXRQbHVnaW5zIiwiZmlyZXNFdmVudCIsInNldFRhYmJhYmxlIiwib2xkRWxlbWVudCIsInRhYmJhYmxlRWxlbWVudCIsImlzTGFzdEVsZW1lbnQiLCJuZXh0RWwiLCJpc0ZpcnN0RWxlbWVudCIsInByZXZFbCIsInBsdWdpbiIsIktleWJvYXJkIiwic2VsZWN0YWJpbGl0eSIsImJvdW5kSGFuZGxlS2V5RG93biIsImhhbmRsZUtleURvd24iLCJsaXN0ZW5Gb3JLZXlEb3duIiwicmVtb3ZlS2V5RG93bkxpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNlbGVjdCIsInByZXZlbnREZWZhdWx0IiwiQVRUUklCVVRFX1NJWkUiLCJkaXNhYmxlIiwiZW5hYmxlIiwidG9nZ2xlRW5hYmxlZCIsImVuYWJsZWQiLCJoaWRkZW4iLCJpc0Rpc2FibGVkIiwidXBkYXRlVmlldyIsInByZXZCdXR0b24iLCJuZXh0QnV0dG9uIiwibGlzdCIsInRvdGFsQ291bnQiLCJzdHlsZSIsIndpZHRoIiwiZGlzcGxheUNvdW50IiwibWFyZ2luTGVmdCIsInBvc2l0aW9uIiwib25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2siLCJ1cGRhdGVTdGF0ZSIsImluaXRJbWFnZSIsInRhcmdldElkIiwiaGFuZGxlRG9tVXBkYXRlIiwicmVjb3JkIiwiYWRkZWROb2RlcyIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiYXR0cmlidXRlRmlsdGVyIiwiaXNTZWxlY3RlZCIsInVuU2VsZWN0QWxsIiwiYWRkQXJpYVNlbGVjdGVkT2JzZXJ2ZXIiLCJwYW5lbElkIiwiYWxsUGFuZWxzIiwic2VsZWN0VGFiIiwiYWxsVGFicyIsInRhYnMiLCJrZXlib2FyZCIsIm9uU2VsZWN0IiwiZWxlbWVudEluZGV4IiwiZm9yY2VTZWxlY3RlZEluZGV4IiwiYWRkVGFiSW5kZXgiLCJ1cGRhdGVUYWJiYWJsZSIsInNlbGVjdGVkRWxlbWVudCIsIm5leHRJbmRleCIsImN1cnJlbnRJbmRleCIsImxhc3RJbmRleCIsInByZXZpb3VzSW5kZXgiLCJzZWxlY3RlZEluZGV4IiwicmVxdWlyZSIsIkg1UCIsIkh1YkNsaWVudCIsImRlZmF1bHQiLCJ1bkV4cGFuZCIsIm9uU2VsZWN0TWVudUl0ZW0iLCJ0b2dnbGVyIiwibWVudUl0ZW0iLCJpc0V4cGFuZGVkIiwiaW5pdENvbGxhcHNpYmxlIiwidGFyZ2V0SGFuZGxlciIsImNvbGxhcHNpYmxlSWQiLCJjb2xsYXBzaWJsZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUE7Ozs7Ozs7OztBQVNPLElBQU1BLHdC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QUEsTUFBckNzVSxhQUFxQzs7QUFDNUU7QUFDQSxNQUFNSixVQUFVbFUsUUFBUWQsYUFBUixDQUFzQixnQ0FBdEIsQ0FBaEI7QUFDQSxNQUFNcVYsZ0JBQWdCTCxRQUFRM1YsWUFBUixDQUFxQixlQUFyQixDQUF0QjtBQUNBLE1BQU1pVyxjQUFjeFUsUUFBUWQsYUFBUixPQUEwQnFWLGFBQTFCLENBQXBCOztBQUVBO0FBQ0EsTUFBSXZDLFdBQVcsSUFBSUMsZ0JBQUosQ0FBcUI7QUFBQSxXQUFNcUMsY0FBY0YsV0FBV0YsT0FBWCxDQUFkLEVBQW1DTSxXQUFuQyxDQUFOO0FBQUEsR0FBckIsQ0FBZjs7QUFFQXhDLFdBQVNFLE9BQVQsQ0FBaUJnQyxPQUFqQixFQUEwQjtBQUN4QjdCLGdCQUFZLElBRFk7QUFFeEJDLHVCQUFtQixJQUZLO0FBR3hCQyxxQkFBaUIsQ0FBQyxlQUFEO0FBSE8sR0FBMUI7O0FBTUE7QUFDQTJCLFVBQVFyUyxnQkFBUixDQUF5QixPQUF6QixFQUFrQztBQUFBLFdBQU0sK0JBQWdCLGVBQWhCLEVBQWlDcVMsT0FBakMsQ0FBTjtBQUFBLEdBQWxDOztBQUVBO0FBQ0FJLGdCQUFjRixXQUFXRixPQUFYLENBQWQsRUFBbUNNLFdBQW5DO0FBQ0QsQ0FwQk0sQyIsImZpbGUiOiJoNXAtaHViLWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3NmMzMmEwMmM2ZGRlNjQ1OTJjZCIsIi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgdmVyc2lvbiBvZiBhIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjdXJyeSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGNvbnN0IGFyaXR5ID0gZm4ubGVuZ3RoO1xuXG4gIHJldHVybiBmdW5jdGlvbiBmMSgpIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBpZiAoYXJncy5sZW5ndGggPj0gYXJpdHkpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZjIoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgcmV0dXJuIGYxLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KGFyZ3MyKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBDb21wb3NlIGZ1bmN0aW9ucyB0b2dldGhlciwgZXhlY3V0aW5nIGZyb20gcmlnaHQgdG8gbGVmdFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24uLi59IGZuc1xuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29tcG9zZSA9ICguLi5mbnMpID0+IGZucy5yZWR1Y2UoKGYsIGcpID0+ICguLi5hcmdzKSA9PiBmKGcoLi4uYXJncykpKTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBlbGVtZW50IGluIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZm9yRWFjaCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIGFyci5mb3JFYWNoKGZuKTtcbn0pO1xuXG4vKipcbiAqIE1hcHMgYSBmdW5jdGlvbiB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IG1hcCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIubWFwKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmaWx0ZXIgdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLmZpbHRlcihmbik7XG59KTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgc29tZSB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHNvbWUgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLnNvbWUoZm4pO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgdmFsdWVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnRhaW5zID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5pbmRleE9mKHZhbHVlKSAhPSAtMTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgc3VwcGxpZWQgdmFsdWVzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHdpdGhvdXQgPSBjdXJyeShmdW5jdGlvbiAodmFsdWVzLCBhcnIpIHtcbiAgcmV0dXJuIGZpbHRlcih2YWx1ZSA9PiAhY29udGFpbnModmFsdWUsIHZhbHVlcyksIGFycilcbn0pO1xuXG4vKipcbiAqIFRha2VzIGEgc3RyaW5nIHRoYXQgaXMgZWl0aGVyICd0cnVlJyBvciAnZmFsc2UnIGFuZCByZXR1cm5zIHRoZSBvcHBvc2l0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBib29sXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgaW52ZXJzZUJvb2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoYm9vbCkge1xuICByZXR1cm4gKGJvb2wgIT09ICd0cnVlJykudG9TdHJpbmcoKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIi8qKlxuICogQG1peGluXG4gKi9cbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnRmdWx9XG4gICAqL1xuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNjb3BlXG4gICAgICovXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcbiAgICAgICdsaXN0ZW5lcic6IGxpc3RlbmVyLFxuICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAgICovXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUodHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsImltcG9ydCB7Y3VycnksIGludmVyc2VCb29sZWFuU3RyaW5nfSBmcm9tICcuL2Z1bmN0aW9uYWwnXG5cbi8qKlxuICogR2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmcm9tIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBTZXQgYW4gYXR0cmlidXRlIG9uIGEgaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHNldEF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCB2YWx1ZSwgZWwpID0+IGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkpO1xuXG4vKipcbiAqIFJlbW92ZSBhdHRyaWJ1dGUgZnJvbSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBoYXNBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IGVsLmhhc0F0dHJpYnV0ZShuYW1lKSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlIHRoYXQgZXF1YWxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVFcXVhbHMgPSBjdXJyeSgobmFtZSwgdmFsdWUsIGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IHZhbHVlKTtcblxuLyoqXG4gKiBUb2dnbGVzIGFuIGF0dHJpYnV0ZSBiZXR3ZWVuICd0cnVlJyBhbmQgJ2ZhbHNlJztcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IGdldEF0dHJpYnV0ZShuYW1lLCBlbCk7XG4gIHNldEF0dHJpYnV0ZShuYW1lLCBpbnZlcnNlQm9vbGVhblN0cmluZyh2YWx1ZSksIGVsKTtcbn0pO1xuXG4vKipcbiAqIFRoZSBhcHBlbmRDaGlsZCgpIG1ldGhvZCBhZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0IG9mIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWVkIHBhcmVudCBub2RlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgYXBwZW5kQ2hpbGQgPSBjdXJyeSgocGFyZW50LCBjaGlsZCkgPT4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIGEgZGVzY2VuZGFudCBvZiB0aGUgZWxlbWVudCBvbiB3aGljaCBpdCBpcyBpbnZva2VkXG4gKiB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yID0gY3VycnkoKHNlbGVjdG9yLCBlbCkgPT4gZWwucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpO1xuXG4vKipcbiAqIFJldHVybnMgYSBub24tbGl2ZSBOb2RlTGlzdCBvZiBhbGwgZWxlbWVudHMgZGVzY2VuZGVkIGZyb20gdGhlIGVsZW1lbnQgb24gd2hpY2ggaXRcbiAqIGlzIGludm9rZWQgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2YgQ1NTIHNlbGVjdG9ycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtOb2RlTGlzdH1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3JBbGwgPSBjdXJyeSgoc2VsZWN0b3IsIGVsKSA9PiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG5cbi8qKlxuICogVGhlIHJlbW92ZUNoaWxkKCkgbWV0aG9kIHJlbW92ZXMgYSBjaGlsZCBub2RlIGZyb20gdGhlIERPTS4gUmV0dXJucyByZW1vdmVkIG5vZGUuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBwYXJlbnRcbiAqIEBwYXJhbSB7Tm9kZX0gb2xkQ2hpbGRcbiAqXG4gKiBAcmV0dXJuIHtOb2RlfVxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2hpbGQgPSBjdXJyeSgocGFyZW50LCBvbGRDaGlsZCkgPT4gcGFyZW50LnJlbW92ZUNoaWxkKG9sZENoaWxkKSk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgbm9kZSBoYXMgYSBjbGFzc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbHNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBjbGFzc0xpc3RDb250YWlucyA9IGN1cnJ5KChjbHMsIGVsKSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xzKSk7XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIE5vZGVMaXN0IHRvIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtOb2RlTGlzdH0gbm9kZUxpc3RcbiAqXG4gKiBAcmV0dXJuIHtOb2RlW119XG4gKi9cbmV4cG9ydCBjb25zdCBub2RlTGlzdFRvQXJyYXkgPSBub2RlTGlzdCA9PiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChub2RlTGlzdCk7XG5cbi8qKlxuICogQWRkcyBhcmlhLWhpZGRlbj10cnVlIHRvIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBBZGRzIGFyaWEtaGlkZGVuPWZhbHNlIHRvIGFuIGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBUb2dnbGVzIGFyaWEtaGlkZGVuIG9uIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSBjdXJyeSgodmlzaWJsZSwgZWxlbWVudCkgPT4gKHZpc2libGUgPyBzaG93IDogaGlkZSkoZWxlbWVudCkpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYSBjbGFzcyBvbiBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNsc1xuICogQHBhcmFtIHtib29sZWFufSBhZGRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUNsYXNzID0gY3VycnkoKGNscywgYWRkLCBlbGVtZW50KSA9PiBlbGVtZW50LmNsYXNzTGlzdFthZGQgPyAnYWRkJyA6ICdyZW1vdmUnXShjbHMpKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gQ29udGVudFR5cGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGNoVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN1bW1hcnlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjcmVhdGVkQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVkX0F0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaXNSZWNvbW1lbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBvcHVsYXJpdHlcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHNjcmVlbnNob3RzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGljZW5zZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV4YW1wbGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0dXRvcmlhbFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0ga2V5d29yZHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvd25lclxuICogQHByb3BlcnR5IHtib29sZWFufSBpbnN0YWxsZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVzdHJpY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBhcGlSb290VXJsIH0pIHtcbiAgICB0aGlzLmFwaVJvb3RVcmwgPSBhcGlSb290VXJsO1xuXG4gICAgaWYoIXdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMpe1xuICAgICAgLy8gVE9ETyByZW1vdmUgdGhpcyB3aGVuIGRvbmUgdGVzdGluZyBmb3IgZXJyb3JzXG4gICAgICAvLyB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWVycm9ycy9OT19SRVNQT05TRS5qc29uYCwge1xuXG4gICAgICB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnQtdHlwZS1jYWNoZWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxuICAgICAgLnRoZW4odGhpcy5pc1ZhbGlkKVxuICAgICAgLnRoZW4oanNvbiA9PiBqc29uLmxpYnJhcmllcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSAge0NvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cbiAgICovXG4gIGlzVmFsaWQocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT59XG4gICAqL1xuICBjb250ZW50VHlwZXMoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcy50aGVuKGNvbnRlbnRUeXBlcyA9PiB7XG4gICAgICByZXR1cm4gY29udGVudFR5cGVzLmZpbHRlcihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSA9PT0gbWFjaGluZU5hbWUpWzBdO1xuICAgIH0pO1xuXG4gICAgLypyZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnRfdHlwZV9jYWNoZS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7Ki9cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YWxscyBhIGNvbnRlbnQgdHlwZSBvbiB0aGUgc2VydmVyXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBpbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2gobnMuZ2V0QWpheFVybCgnbGlicmFyeS1pbnN0YWxsJywge2lkOiBpZH0pLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBib2R5OiAnJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xuICB9XG5cblxuICAvLyBmb3IgdGVzdGluZyB3aXRoIGVycm9yXG4gIC8qaW5zdGFsbENvbnRlbnRUeXBlKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1saWJyYXJ5LWluc3RhbGxgLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfSovXG5cbiAgLyoqXG4gICAqIFVwbG9hZHMgYSBjb250ZW50IHR5cGUgdG8gdGhlIHNlcnZlciBmb3IgdmFsaWRhdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge0Zvcm1EYXRhfSBmb3JtRGF0YSBGb3JtIGNvbnRhaW5pbmcgdGhlIGg1cCB0aGF0IHNob3VsZCBiZSB1cGxvYWRlZCBhcyAnaDVwJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXR1cm5zIHRoZSBwcm9taXNlIG9mIGEganNvbiBjb250YWluaW5nIHRoZSBjb250ZW50IGpzb24gYW5kIHRoZSBoNXAganNvblxuICAgKi9cbiAgdXBsb2FkQ29udGVudChmb3JtRGF0YSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9bGlicmFyeS11cGxvYWRgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBib2R5OiBmb3JtRGF0YVxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItc2VydmljZXMuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5cbi8qKlxuICogIFRyYW5zZm9ybXMgYSBET00gY2xpY2sgZXZlbnQgaW50byBhbiBFdmVudGZ1bCdzIGV2ZW50XG4gKiAgQHNlZSBFdmVudGZ1bFxuICpcbiAqIEBwYXJhbSAge3N0cmluZyB8IE9iamVjdH0gdHlwZVxuICogQHBhcmFtICB7RXZlbnRmdWx9IGV2ZW50ZnVsXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCByZWxheUNsaWNrRXZlbnRBcyA9IGN1cnJ5KGZ1bmN0aW9uKHR5cGUsIGV2ZW50ZnVsLCBlbGVtZW50KSB7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgZXZlbnRmdWwuZmlyZSh0eXBlLCB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgaWQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJylcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBkb24ndCBidWJibGVcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsIi8qKlxuICogQHBhcmFtICB7c3RyaW5nfSAgIGNvbmZpZy50eXBlICAgICAgICAgdHlwZSBvZiB0aGUgbWVzc2FnZTogaW5mbywgc3VjY2VzcywgZXJyb3JcbiAqIEBwYXJhbSAge2Jvb2xlYW59ICBjb25maWcuZGlzbWlzc2libGUgIHdoZXRoZXIgdGhlIG1lc3NhZ2UgY2FuIGJlIGRpc21pc3NlZFxuICogQHBhcmFtICB7c3RyaW5nfSAgIGNvbmZpZy5jb250ZW50ICAgICAgbWVzc2FnZSBjb250ZW50IHVzdWFsbHkgYSAnaDMnIGFuZCBhICdwJ1xuICogQHJldHVybiB7SFRNTEVsZW1lbnR9IGRpdiBjb250YWluaW5nIHRoZSBtZXNzYWdlIGVsZW1lbnRcbiAqL1xuXG4vL1RPRE8gaGFuZGxlIHN0cmluZ3MsIGh0bWwsIGJhZGx5IGZvcm1lZCBvYmplY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlckVycm9yTWVzc2FnZShtZXNzYWdlKSB7XG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XG4gIGNsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmI3gyNzE1JztcblxuICBjb25zdCBtZXNzYWdlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtZXNzYWdlQ29udGVudC5jbGFzc05hbWUgPSAnbWVzc2FnZS1jb250ZW50JztcbiAgbWVzc2FnZUNvbnRlbnQuaW5uZXJIVE1MID0gJzxoMT4nICsgbWVzc2FnZS50aXRsZSArICc8L2gxPicgKyAnPHA+JyArIG1lc3NhZ2UuY29udGVudCArICc8L3A+JztcblxuICBjb25zdCBtZXNzYWdlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtZXNzYWdlV3JhcHBlci5jbGFzc05hbWUgPSAnbWVzc2FnZScgKyAnICcgKyBgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUNvbnRlbnQpO1xuXG4gIGlmIChtZXNzYWdlLmJ1dHRvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbWVzc2FnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG1lc3NhZ2VCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbic7XG4gICAgbWVzc2FnZUJ1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlLmJ1dHRvbjtcbiAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQnV0dG9uKTtcbiAgfVxuXG4gIHJldHVybiBtZXNzYWdlV3JhcHBlcjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJpbXBvcnQgeyBpbml0Q29sbGFwc2libGUgfSBmcm9tICcuLi91dGlscy9jb2xsYXBzaWJsZSc7XG5cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBpbml0Q29sbGFwc2libGUoZWxlbWVudCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSFpwWlhkQ2IzZzlJakFnTUNBME1EQWdNakkxSWo0TkNpQWdQR1JsWm5NK0RRb2dJQ0FnUEhOMGVXeGxQZzBLSUNBZ0lDQWdMbU5zY3kweElIc05DaUFnSUNBZ0lHWnBiR3c2SUc1dmJtVTdEUW9nSUNBZ0lDQjlEUW9OQ2lBZ0lDQWdJQzVqYkhNdE1pQjdEUW9nSUNBZ0lDQm1hV3hzT2lBall6WmpObU0zT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1zSUM1amJITXROQ0I3RFFvZ0lDQWdJQ0JtYVd4c09pQWpabVptT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1nZXcwS0lDQWdJQ0FnYjNCaFkybDBlVG9nTUM0M093MEtJQ0FnSUNBZ2ZRMEtJQ0FnSUR3dmMzUjViR1UrRFFvZ0lEd3ZaR1ZtY3o0TkNpQWdQSFJwZEd4bFBtTnZiblJsYm5RZ2RIbHdaU0J3YkdGalpXaHZiR1JsY2w4eVBDOTBhWFJzWlQ0TkNpQWdQR2NnYVdROUlreGhlV1Z5WHpJaUlHUmhkR0V0Ym1GdFpUMGlUR0Y1WlhJZ01pSStEUW9nSUNBZ1BHY2dhV1E5SW1OdmJuUmxiblJmZEhsd1pWOXdiR0ZqWldodmJHUmxjaTB4WDJOdmNIa2lJR1JoZEdFdGJtRnRaVDBpWTI5dWRHVnVkQ0IwZVhCbElIQnNZV05sYUc5c1pHVnlMVEVnWTI5d2VTSStEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxURWlJSGRwWkhSb1BTSTBNREFpSUdobGFXZG9kRDBpTWpJMUlpOCtEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxUSWlJSGc5SWpFeE1pNDFNU0lnZVQwaU5ETXVOREVpSUhkcFpIUm9QU0l4TnpZdU9UWWlJR2hsYVdkb2REMGlNVE0xTGpRMUlpQnllRDBpTVRBaUlISjVQU0l4TUNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE16WXVOallpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5URXVORGtpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5qWXVNU0lnWTNrOUlqWXhMams0SWlCeVBTSTBMamd4SWk4K0RRb2dJQ0FnSUNBOFp5QnBaRDBpWDBkeWIzVndYeUlnWkdGMFlTMXVZVzFsUFNJbWJIUTdSM0p2ZFhBbVozUTdJajROQ2lBZ0lDQWdJQ0FnUEdjZ2FXUTlJbDlIY205MWNGOHlJaUJrWVhSaExXNWhiV1U5SWlac2REdEhjbTkxY0NabmREc2lQZzBLSUNBZ0lDQWdJQ0FnSUR4d1lYUm9JR2xrUFNKZlEyOXRjRzkxYm1SZlVHRjBhRjhpSUdSaGRHRXRibUZ0WlQwaUpteDBPME52YlhCdmRXNWtJRkJoZEdnbVozUTdJaUJqYkdGemN6MGlZMnh6TFRRaUlHUTlJazB5TmpNdU1qZ3NPVFV1TWpGRE1qWXdMRGt5TGpBM0xESTFOU3c1TVM0MUxESTBPQzQwTXl3NU1TNDFTREl5TjNZNFNERTVPUzQxYkMweUxqRTNMREV3TGpJMFlUSTFMamcwTERJMUxqZzBMREFzTUN3eExERXhMalE0TFRFdU5qTXNNVGt1T1RNc01Ua3VPVE1zTUN3d0xERXNNVFF1TXprc05TNDFOeXd4T0M0eU5pd3hPQzR5Tml3d0xEQXNNU3cxTGpVeUxERXpMallzTWpNdU1URXNNak11TVRFc01Dd3dMREV0TWk0NE5Dd3hNUzR3TlN3eE9DNDJOU3d4T0M0Mk5Td3dMREFzTVMwNExqQTJMRGN1Tnprc09TdzVMREFzTUN3eExUUXVNVElzTVM0ek4wZ3lNeloyTFRJeGFERXdMalF5WXpjdU16WXNNQ3d4TWk0NE15MHhMall4TERFMkxqUXlMVFZ6TlM0ek9DMDNMalE0TERVdU16Z3RNVE11TkRSRE1qWTRMakl5TERFd01pNHlPU3d5TmpZdU5UY3NPVGd1TXpVc01qWXpMakk0TERrMUxqSXhXbTB0TVRVc01UZGpMVEV1TkRJc01TNHlNaTB6TGprc01TNHlOUzAzTGpReExERXVNalZJTWpNMmRpMHhOR2cxTGpZeVlUa3VOVGNzT1M0MU55d3dMREFzTVN3M0xESXVPVE1zTnk0d05TdzNMakExTERBc01Dd3hMREV1T0RVc05DNDVNa0UyTGpNekxEWXVNek1zTUN3d0xERXNNalE0TGpNeExERXhNaTR5TlZvaUx6NE5DaUFnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpWDFCaGRHaGZJaUJrWVhSaExXNWhiV1U5SWlac2REdFFZWFJvSm1kME95SWdZMnhoYzNNOUltTnNjeTAwSWlCa1BTSk5NakF5TGprc01URTVMakV4WVRndU1USXNPQzR4TWl3d0xEQXNNQzAzTGpJNExEUXVOVEpzTFRFMkxURXVNaklzTnk0eU1pMHpNQzQ1TWtneE56UjJNakpJTVRVemRpMHlNa2d4TXpaMk5UWm9NVGQyTFRJeGFESXhkakl4YURJd0xqTXhZeTB5TGpjeUxEQXROUzB4TGpVekxUY3RNMkV4T1M0eE9Td3hPUzR4T1N3d0xEQXNNUzAwTGpjekxUUXVPRE1zTWpNdU5UZ3NNak11TlRnc01Dd3dMREV0TXkwMkxqWnNNVFl0TWk0eU5tRTRMakV4TERndU1URXNNQ3d4TERBc055NHlOaTB4TVM0M01sb2lMejROQ2lBZ0lDQWdJQ0FnUEM5blBnMEtJQ0FnSUNBZ1BDOW5QZzBLSUNBZ0lDQWdQSEpsWTNRZ1kyeGhjM005SW1Oc2N5MHpJaUI0UFNJeE56Y3VOallpSUhrOUlqVTNMalkySWlCM2FXUjBhRDBpT1RJdU1qZ2lJR2hsYVdkb2REMGlPUzR6T0NJZ2NuZzlJak11TlNJZ2NuazlJak11TlNJdlBnMEtJQ0FnSUR3dlp6NE5DaUFnUEM5blBnMEtQQzl6ZG1jK0RRbz1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBIdWJWaWV3IGZyb20gJy4vaHViLXZpZXcnO1xuaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvbiBmcm9tICcuL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uJztcbmltcG9ydCBVcGxvYWRTZWN0aW9uIGZyb20gJy4vdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24nO1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4vaHViLXNlcnZpY2VzJztcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4vdXRpbHMvZXJyb3JzJztcbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gSHViU3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aXRsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb25JZFxuICogQHByb3BlcnR5IHtib29sZWFufSBleHBhbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFwaVJvb3RVcmxcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBFcnJvck1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXJyb3JDb2RlXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gU2VsZWN0ZWRFbGVtZW50XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRcbiAqL1xuLyoqXG4gKiBTZWxlY3QgZXZlbnRcbiAqIEBldmVudCBIdWIjc2VsZWN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEVycm9yIGV2ZW50XG4gKiBAZXZlbnQgSHViI2Vycm9yXG4gKiBAdHlwZSB7RXJyb3JNZXNzYWdlfVxuICovXG4vKipcbiAqIFVwbG9hZCBldmVudFxuICogQGV2ZW50IEh1YiN1cGxvYWRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgSHViI2Vycm9yXG4gKiBAZmlyZXMgSHViI3VwbG9hZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWIge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjb250cm9sbGVyc1xuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uID0gbmV3IENvbnRlbnRUeXBlU2VjdGlvbihzdGF0ZSk7XG4gICAgdGhpcy51cGxvYWRTZWN0aW9uID0gbmV3IFVwbG9hZFNlY3Rpb24oc3RhdGUpO1xuXG4gICAgLy8gdmlld3NcbiAgICB0aGlzLnZpZXcgPSBuZXcgSHViVmlldyhzdGF0ZSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gcHJvcGFnYXRlIGNvbnRyb2xsZXIgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAnZXJyb3InXSwgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24pO1xuICAgIHRoaXMucHJvcGFnYXRlKFsndXBsb2FkJ10sIHRoaXMudXBsb2FkU2VjdGlvbik7XG5cbiAgICAvLyBoYW5kbGUgZXZlbnRzXG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy5zZXRQYW5lbFRpdGxlLCB0aGlzKTtcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnZpZXcuY2xvc2VQYW5lbCwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcub24oJ3RhYi1jaGFuZ2UnLCB0aGlzLnZpZXcuc2V0U2VjdGlvblR5cGUsIHRoaXMudmlldyk7XG4gICAgdGhpcy52aWV3Lm9uKCdwYW5lbC1jaGFuZ2UnLCB0aGlzLnZpZXcudG9nZ2xlUGFuZWxPcGVuLmJpbmQodGhpcy52aWV3KSwgdGhpcy52aWV3KTtcblxuICAgIHRoaXMuaW5pdFRhYlBhbmVsKHN0YXRlKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBjb250ZW50IHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGdldENvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUobWFjaGluZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlIG9mIHRoZSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldFBhbmVsVGl0bGUoe2lkfSnCoHtcbiAgICB0aGlzLmdldENvbnRlbnRUeXBlKGlkKS50aGVuKCh7dGl0bGV9KSA9PiB0aGlzLnZpZXcuc2V0VGl0bGUodGl0bGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIHRhYiBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbklkXG4gICAqL1xuICBpbml0VGFiUGFuZWwoeyBzZWN0aW9uSWQgPSAnY29udGVudC10eXBlcycgfSkge1xuICAgIGNvbnN0IHRhYkNvbmZpZ3MgPSBbe1xuICAgICAgdGl0bGU6ICdDcmVhdGUgQ29udGVudCcsXG4gICAgICBpZDogJ2NvbnRlbnQtdHlwZXMnLFxuICAgICAgY29udGVudDogdGhpcy5jb250ZW50VHlwZVNlY3Rpb24uZ2V0RWxlbWVudCgpLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdVcGxvYWQnLFxuICAgICAgaWQ6ICd1cGxvYWQnLFxuICAgICAgY29udGVudDogdGhpcy51cGxvYWRTZWN0aW9uLmdldEVsZW1lbnQoKVxuICAgIH1dO1xuXG4gICAgLy8gc2V0cyB0aGUgY29ycmVjdCBvbmUgc2VsZWN0ZWRcbiAgICB0YWJDb25maWdzXG4gICAgICAuZmlsdGVyKGNvbmZpZyA9PiBjb25maWcuaWQgPT09IHNlY3Rpb25JZClcbiAgICAgIC5mb3JFYWNoKGNvbmZpZyA9PiBjb25maWcuc2VsZWN0ZWQgPSB0cnVlKTtcblxuICAgIHRhYkNvbmZpZ3MuZm9yRWFjaCh0YWJDb25maWcgPT4gdGhpcy52aWV3LmFkZFRhYih0YWJDb25maWcpKTtcbiAgICB0aGlzLnZpZXcuYWRkQm90dG9tQm9yZGVyKCk7IC8vIEFkZHMgYW4gYW5pbWF0ZWQgYm90dG9tIGJvcmRlciB0byBlYWNoIHRhYlxuICAgIHRoaXMudmlldy5pbml0VGFiUGFuZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWIuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIHJlbW92ZUNoaWxkLCBoaWRlLCBzaG93IH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBjdXJyeSwgZm9yRWFjaCB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCI7XG5pbXBvcnQgaW5pdEltYWdlU2Nyb2xsZXIgZnJvbSBcImNvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXJcIjtcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBub0ljb24gZnJvbSAnLi4vLi4vaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmcnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7bnVtYmVyfVxuICovXG5jb25zdCBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OID0gMzAwO1xuXG4vKipcbiAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgaWYgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGVsZW1lbnQsIHZpc2libGUpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBlbXB0eVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbXB0eSA9ICh0ZXh0KSA9PiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSAmJiAodGV4dC5sZW5ndGggPT09IDApO1xuXG5jb25zdCBoaWRlQWxsID0gZm9yRWFjaChoaWRlKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIHZpZXdcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVWaWV3KCk7XG5cbiAgICAvLyBncmFiIHJlZmVyZW5jZXNcbiAgICB0aGlzLmJ1dHRvbkJhciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1iYXInKTtcbiAgICB0aGlzLnVzZUJ1dHRvbiA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tdXNlJyk7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsJyk7XG4gICAgdGhpcy5idXR0b25zID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvckFsbCgnLmJ1dHRvbicpO1xuXG4gICAgdGhpcy5pbWFnZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtdHlwZS1pbWFnZScpO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWRldGFpbHMgLnRpdGxlJyk7XG4gICAgdGhpcy5vd25lciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bmVyJyk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZGV0YWlscyAuc21hbGwnKTtcbiAgICB0aGlzLmRlbW9CdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZW1vLWJ1dHRvbicpO1xuICAgIHRoaXMuY2Fyb3VzZWwgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbCcpO1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0ID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICAgIHRoaXMubGljZW5jZVBhbmVsID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubGljZW5jZS1wYW5lbCcpO1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnN0YWxsLW1lc3NhZ2UnKTtcblxuICAgIC8vIGhpZGUgbWVzc2FnZSBvbiBjbG9zZSBidXR0b24gY2xpY2tcbiAgICBsZXQgaW5zdGFsbE1lc3NhZ2VDbG9zZSA9IHRoaXMuaW5zdGFsbE1lc3NhZ2UucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtY2xvc2UnKTtcbiAgICBpbnN0YWxsTWVzc2FnZUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGlkZSh0aGlzLmluc3RhbGxNZXNzYWdlKSk7XG5cbiAgICAvLyBpbml0IGludGVyYWN0aXZlIGVsZW1lbnRzXG4gICAgaW5pdFBhbmVsKHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICBpbml0SW1hZ2VTY3JvbGxlcih0aGlzLmNhcm91c2VsKTtcblxuICAgIC8vIGZpcmUgZXZlbnRzIG9uIGJ1dHRvbiBjbGlja1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2stYnV0dG9uJykpO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2luc3RhbGwnLCB0aGlzLCB0aGlzLmluc3RhbGxCdXR0b24pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIHZpZXcgYXMgYSBIVE1MRWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZVZpZXcgKCkge1xuICAgIGxldCBsYWJlbEJhY2sgPSAnQmFjayc7IC8vIHRvZG8gdHJhbnNsYXRlIG1lXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYmFjay1idXR0b24gaWNvbi1hcnJvdy10aGlja1wiIGFyaWEtbGFiZWw9XCIke2xhYmVsQmFja31cIiB0YWJpbmRleD1cIjBcIj48L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLXdyYXBwZXJcIj48aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmUgY29udGVudC10eXBlLWltYWdlXCIgc3JjPVwiJHtub0ljb259XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWRldGFpbHNcIj5cbiAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPjwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bmVyXCI+PC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3M9XCJzbWFsbFwiPjwvcD5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbiBkZW1vLWJ1dHRvblwiIHRhcmdldD1cIl9ibGFua1wiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBocmVmPVwiI1wiPkNvbnRlbnQgRGVtbzwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbFwiIHJvbGU9XCJyZWdpb25cIiBkYXRhLXNpemU9XCI1XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIHByZXZpb3VzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGlzYWJsZWQ+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1idXR0b24gbmV4dFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRpc2FibGVkPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgIDxuYXYgY2xhc3M9XCJzY3JvbGxlclwiPlxuICAgICAgICAgIDx1bD48L3VsPlxuICAgICAgICA8L25hdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGhyIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5zdGFsbC1tZXNzYWdlIG1lc3NhZ2UgZGlzbWlzc2libGUgc2ltcGxlIGluZm9cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtY2xvc2UgaWNvbi1jbG9zZVwiPjwvZGl2PlxuICAgICAgICA8aDM+PC9oMz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1iYXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnkgYnV0dG9uLXVzZVwiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBkYXRhLWlkPVwiXCI+VXNlPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGF0YS1pZD1cIlwiPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj5JbnN0YWxsPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsaW5nXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHNwYW4gY2xhc3M9XCJpY29uLWxvYWRpbmctc2VhcmNoIGljb24tc3BpblwiPjwvc3Bhbj5JbnN0YWxsaW5nPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZ3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIGxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGVyXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1jb250cm9scz1cImxpY2VuY2UtcGFuZWxcIj48c3BhbiBjbGFzcz1cImljb24tYWNjb3JkaW9uLWFycm93XCI+PC9zcGFuPiBUaGUgTGljZW5jZSBJbmZvPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIiBpZD1cImxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5LWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBtZXNzYWdlIG9uIGluc3RhbGxcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBzdWNjZXNzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAqL1xuICBzZXRJbnN0YWxsTWVzc2FnZSh7IHN1Y2Nlc3MgPSB0cnVlLCBtZXNzYWdlIH0pe1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UucXVlcnlTZWxlY3RvcignaDMnKS5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UuY2xhc3NOYW1lID0gYGluc3RhbGwtbWVzc2FnZSBkaXNtaXNzaWJsZSBtZXNzYWdlIHNpbXBsZSAke3N1Y2Nlc3MgPyAnaW5mbycgOiAnZXJyb3InfWA7XG4gICAgc2hvdyh0aGlzLmluc3RhbGxNZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBpbWFnZXMgZnJvbSB0aGUgY2Fyb3VzZWxcbiAgICovXG4gIHJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwoKSB7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWxMaXN0KSk7XG4gICAgdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWwtbGlnaHRib3gnKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaW1hZ2UgdG8gdGhlIGNhcm91c2VsXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbWFnZVxuICAgKi9cbiAgYWRkSW1hZ2VUb0Nhcm91c2VsKGltYWdlKSB7XG4gICAgLy8gYWRkIGxpZ2h0Ym94XG4gICAgY29uc3QgbGlnaHRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsaWdodGJveC5pZCA9IGBsaWdodGJveC0ke3RoaXMuY2Fyb3VzZWxMaXN0LmNoaWxkRWxlbWVudENvdW50fWA7XG4gICAgbGlnaHRib3guY2xhc3NOYW1lID0gJ2Nhcm91c2VsLWxpZ2h0Ym94JztcbiAgICBsaWdodGJveC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBsaWdodGJveC5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZS51cmx9XCIgYWx0PVwiJHtpbWFnZS5hbHR9XCI+YDtcbiAgICB0aGlzLmNhcm91c2VsLmFwcGVuZENoaWxkKGxpZ2h0Ym94KTtcblxuICAgIC8vIGFkZCB0aHVtYm5haWxcbiAgICBjb25zdCB0aHVtYm5haWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRodW1ibmFpbC5jbGFzc05hbWUgPSAnc2xpZGUnO1xuICAgIHRodW1ibmFpbC5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ltYWdlLnVybH1cIiBhbHQ9XCIke2ltYWdlLmFsdH1cIiBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgYXJpYS1jb250cm9scz1cIiR7bGlnaHRib3guaWR9XCIgLz5gO1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0LmFwcGVuZENoaWxkKHRodW1ibmFpbCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgaGlkZSh0aGlzLmluc3RhbGxNZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbWFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gICAqL1xuICBzZXRJbWFnZShzcmMpIHtcbiAgICB0aGlzLmltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjIHx8IG5vSWNvbik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRJZChpZCkge1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICAgIHRoaXMudXNlQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gYCR7dGl0bGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XG4gICAgaWYodGV4dC5sZW5ndGggPiBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OKSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9PHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvblxuICAgICAgICAucXVlcnlTZWxlY3RvcignLnJlYWQtbW9yZSwgLnJlYWQtbGVzcycpXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgUmVhZCBsZXNzIGFuZCBSZWFkIG1vcmUgdGV4dFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgdG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSB7XG4gICAgLy8gZmxpcCBib29sZWFuXG4gICAgdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkID0gIXRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZDtcblxuICAgIGlmKHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCkge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0ZXh0fTxzcGFuIGNsYXNzPVwicmVhZC1sZXNzIGxpbmtcIj5SZWFkIGxlc3M8L3NwYW4+YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9PHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgIH1cblxuICAgIHRoaXMuZGVzY3JpcHRpb25cbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcucmVhZC1tb3JlLCAucmVhZC1sZXNzJylcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvcnRlbnMgYSBzdHJpbmcsIGFuZCBwdXRzIGFuIGVsaXBzaXMgYXQgdGhlIGVuZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgZWxsaXBzaXMoc2l6ZSwgdGV4dCkge1xuICAgIHJldHVybiBgJHt0ZXh0LnN1YnN0cigwLCBzaXplKX0uLi5gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxpY2VuY2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICovXG4gIHNldExpY2VuY2UodHlwZSkge1xuICAgIGlmKHR5cGUpe1xuICAgICAgdGhpcy5saWNlbmNlUGFuZWwucXVlcnlTZWxlY3RvcignLnBhbmVsLWJvZHktaW5uZXInKS5pbm5lclRleHQgPSB0eXBlO1xuICAgICAgc2hvdyh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlkZSh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyXG4gICAqL1xuICBzZXRPd25lcihvd25lcikge1xuICAgIGlmKG93bmVyKSB7XG4gICAgICB0aGlzLm93bmVyLmlubmVySFRNTCA9IGBCeSAke293bmVyfWA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5vd25lci5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZXhhbXBsZSB1cmxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgc2V0RXhhbXBsZSh1cmwpIHtcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmRlbW9CdXR0b24sICFpc0VtcHR5KHVybCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgaWYgdGhlIGNvbnRlbnQgdHlwZSBpcyBpbnN0YWxsZWRcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBpbnN0YWxsZWRcbiAgICovXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xuICAgIHRoaXMuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoaW5zdGFsbGVkID8gJy5idXR0b24tdXNlJyA6ICcuYnV0dG9uLWluc3RhbGwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyBhbGwgYnV0dG9ucyBhbmQgc2hvd3MgdGhlIGJ1dHRvbiBvbiB0aGUgc2VsZWN0b3IgYWdhaW5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9c2VsZWN0b3JcbiAgICovXG4gIHNob3dCdXR0b25CeVNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICBpZihidXR0b24pIHtcbiAgICAgIGhpZGVBbGwodGhpcy5idXR0b25zKTtcbiAgICAgIHNob3coYnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlRGV0YWlsVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXdcIjtcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tIFwiLi4vaHViLXNlcnZpY2VzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWwge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIHZpZXdzXG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVEZXRhaWxWaWV3KHN0YXRlKTtcbiAgICB0aGlzLnZpZXcub24oJ2luc3RhbGwnLCB0aGlzLmluc3RhbGwsIHRoaXMpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnY2xvc2UnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGxvYWRCeUlkKGlkKSB7XG4gICAgdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcbiAgICAgIC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpXG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gICBpbnN0YWxsKHtpZH0pIHtcbiAgICAgLy8gc2V0IHNwaW5uZXJcbiAgICAgdGhpcy52aWV3LnNob3dCdXR0b25CeVNlbGVjdG9yKCcuYnV0dG9uLWluc3RhbGxpbmcnKTtcblxuICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiB0aGlzLnNlcnZpY2VzLmluc3RhbGxDb250ZW50VHlwZShjb250ZW50VHlwZS5tYWNoaW5lTmFtZSkpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4ge1xuICAgICAgICAgdGhpcy52aWV3LnNldElzSW5zdGFsbGVkKHRydWUpO1xuICAgICAgICAgdGhpcy52aWV3LnNob3dCdXR0b25CeVNlbGVjdG9yKCcuYnV0dG9uLWdldCcpO1xuICAgICAgICAgdGhpcy52aWV3LnNldEluc3RhbGxNZXNzYWdlKHtcbiAgICAgICAgICAgbWVzc2FnZTogYCR7Y29udGVudFR5cGUudGl0bGV9IHN1Y2Nlc3NmdWxseSBpbnN0YWxsZWQhYCxcbiAgICAgICAgIH0pO1xuICAgICAgIH0pXG4gICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgIHRoaXMudmlldy5zaG93QnV0dG9uQnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsJyk7XG5cbiAgICAgICAgIC8vIHByaW50IGVycm9yIG1lc3NhZ2VcbiAgICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAoZXJyb3IuZXJyb3JDb2RlKSA/IGVycm9yIDoge1xuICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgZXJyb3JDb2RlOiAnUkVTUE9OU0VfRkFJTEVEJyxcbiAgICAgICAgICAgbWVzc2FnZTogYCR7aWR9IGNvdWxkIG5vdCBiZSBpbnN0YWxsZWQhIENvbnRhY3QgeW91ciBhZG1pbmlzdHJhdG9yLmAsXG4gICAgICAgICB9O1xuICAgICAgICAgdGhpcy52aWV3LnNldEluc3RhbGxNZXNzYWdlKGVycm9yTWVzc2FnZSk7XG5cbiAgICAgICAgIC8vIGxvZyB3aG9sZSBlcnJvciBtZXNzYWdlIHRvIGNvbnNvbGVcbiAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luc3RhbGxhdGlvbiBlcnJvcicsIGVycm9yKTtcbiAgICAgICB9KTtcbiAgIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdmlldyB3aXRoIHRoZSBjb250ZW50IHR5cGUgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlKSB7XG4gICAgdGhpcy52aWV3LnJlc2V0KCk7XG4gICAgdGhpcy52aWV3LnNldElkKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcbiAgICB0aGlzLnZpZXcuc2V0VGl0bGUoY29udGVudFR5cGUudGl0bGUpO1xuICAgIHRoaXMudmlldy5zZXREZXNjcmlwdGlvbihjb250ZW50VHlwZS5kZXNjcmlwdGlvbik7XG4gICAgdGhpcy52aWV3LnNldEltYWdlKGNvbnRlbnRUeXBlLmljb24pO1xuICAgIHRoaXMudmlldy5zZXRFeGFtcGxlKGNvbnRlbnRUeXBlLmV4YW1wbGUpO1xuICAgIHRoaXMudmlldy5zZXRPd25lcihjb250ZW50VHlwZS5vd25lcik7XG4gICAgdGhpcy52aWV3LnNldElzSW5zdGFsbGVkKGNvbnRlbnRUeXBlLmluc3RhbGxlZCk7XG4gICAgdGhpcy52aWV3LnNldExpY2VuY2UoY29udGVudFR5cGUubGljZW5zZSk7XG5cbiAgICAvLyB1cGRhdGUgY2Fyb3VzZWxcbiAgICB0aGlzLnZpZXcucmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCgpO1xuICAgIGNvbnRlbnRUeXBlLnNjcmVlbnNob3RzLmZvckVhY2godGhpcy52aWV3LmFkZEltYWdlVG9DYXJvdXNlbCwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCByZW1vdmVDaGlsZCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IENvbnRyb2xzIGZyb20gJ2g1cC1zZGstdWkvc3JjL3NjcmlwdHMvY29udHJvbHMnO1xuaW1wb3J0IEtleWJvYXJkIGZyb20gJ2g1cC1zZGstdWkvc3JjL3NjcmlwdHMvdWkva2V5Ym9hcmQnO1xuaW1wb3J0IG5vSWNvbiBmcm9tICcuLi8uLi9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Zyc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgZ2V0Um93SWQgPSBnZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gaW5zdGFsbCBjb250cm9sc1xuICAgIHRoaXMuY29udHJvbHMgPSBuZXcgQ29udHJvbHMoW25ldyBLZXlib2FyZCgpXSk7XG4gICAgdGhpcy5jb250cm9scy5vbignc2VsZWN0JywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5maXJlKCdyb3ctc2VsZWN0ZWQnLCB7XG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LmVsZW1lbnQsXG4gICAgICAgIGlkOiBnZXRSb3dJZChldmVudC5lbGVtZW50KVxuICAgICAgfSlcbiAgICB9KTtcblxuICAgIC8vIGNyZWF0ZSByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Jyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWxpc3QnO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgcm93cyBmcm9tIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgcmVtb3ZlQWxsUm93cygpIHtcbiAgICB3aGlsZSh0aGlzLnJvb3RFbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSl7XG4gICAgICBsZXQgcm93ID0gdGhpcy5yb290RWxlbWVudC5sYXN0Q2hpbGQ7XG5cbiAgICAgIHRoaXMuY29udHJvbHMucmVtb3ZlRWxlbWVudChyb3cpO1xuICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVDaGlsZChyb3cpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcm93XG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICBhZGRSb3coY29udGVudFR5cGUpIHtcbiAgICBjb25zdCByb3cgPSB0aGlzLmNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCB0aGlzKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncm93LXNlbGVjdGVkJywgdGhpcywgcm93KTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgdGhpcy5jb250cm9scy5hZGRFbGVtZW50KHJvdyk7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSBDb250ZW50IFR5cGUgY29uZmlndXJhdGlvbiBhbmQgY3JlYXRlcyBhIHJvdyBkb21cbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gc2NvcGVcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgc2NvcGUpIHtcbiAgICAvLyBjcmVhdGUgaWRzXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykubGVuZ3RoO1xuICAgIGNvbnN0IGNvbnRlbnRUeXBlUm93VGl0bGVJZCA9IGBjb250ZW50LXR5cGUtcm93LXRpdGxlLSR7aW5kZXh9YDtcbiAgICBjb25zdCBjb250ZW50VHlwZVJvd0Rlc2NyaXB0aW9uSWQgPSBgY29udGVudC10eXBlLXJvdy1kZXNjcmlwdGlvbi0ke2luZGV4fWA7XG5cbiAgICAvLyBmaWVsZCBjb25maWd1cmF0aW9uXG4gICAgY29uc3QgdXNlQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnVXNlJywgY2xzOiAnYnV0dG9uLXByaW1hcnknLCBpY29uOiAnJyB9O1xuICAgIGNvbnN0IGluc3RhbGxCdXR0b25Db25maWcgPSB7IHRleHQ6ICdHZXQnLCBjbHM6ICdidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsJywgaWNvbjogJ2ljb24tYXJyb3ctdGhpY2snfTtcbiAgICBjb25zdCBidXR0b24gPSBjb250ZW50VHlwZS5pbnN0YWxsZWQgPyAgdXNlQnV0dG9uQ29uZmlnOiBpbnN0YWxsQnV0dG9uQ29uZmlnO1xuICAgIGNvbnN0IHRpdGxlID0gY29udGVudFR5cGUudGl0bGUgfHwgY29udGVudFR5cGUubWFjaGluZU5hbWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBjb250ZW50VHlwZS5zdW1tYXJ5IHx8ICcnO1xuICAgIGNvbnN0IGltYWdlID0gY29udGVudFR5cGUuaWNvbiB8fCBub0ljb247XG5cbiAgICAvLyByb3cgaXRlbVxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuaWQgPSBgY29udGVudC10eXBlLSR7Y29udGVudFR5cGUubWFjaGluZU5hbWV9YDtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgY29udGVudFR5cGVSb3dUaXRsZUlkKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIGNvbnRlbnRUeXBlUm93RGVzY3JpcHRpb25JZCk7XG5cbiAgICAvLyBjcmVhdGUgaHRtbFxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZX1cIj5cbiAgICAgIDxidXR0b24gYXJpYS1kZXNjcmliZWRieT1cIiR7Y29udGVudFR5cGVSb3dUaXRsZUlkfVwiIGNsYXNzPVwiYnV0dG9uICR7YnV0dG9uLmNsc31cIiBkYXRhLWlkPVwiJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1cIiB0YWJpbmRleD1cIjBcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCIke2J1dHRvbi5pY29ufVwiPjwvc3Bhbj5cbiAgICAgICAgJHtidXR0b24udGV4dH1cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGg0IGlkPVwiJHtjb250ZW50VHlwZVJvd1RpdGxlSWR9XCI+JHt0aXRsZX08L2g0PlxuICAgICAgPGRpdiBpZD1cIiR7Y29udGVudFR5cGVSb3dEZXNjcmlwdGlvbklkfVwiIGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke2Rlc2NyaXB0aW9ufTwvZGl2PlxuICAgYDtcblxuICAgIC8vIGhhbmRsZSB1c2UgYnV0dG9uXG4gICAgY29uc3QgdXNlQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXByaW1hcnknKTtcbiAgICBpZih1c2VCdXR0b24pe1xuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHNjb3BlLCB1c2VCdXR0b24pO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZUxpc3RWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1saXN0LXZpZXdcIjtcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogUm93IHNlbGVjdGVkIGV2ZW50XG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBVcGRhdGUgY29udGVudCB0eXBlIGxpc3QgZXZlbnRcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3QjdXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3QjdXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdGhlIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZUxpc3RWaWV3KHN0YXRlKTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3Jvdy1zZWxlY3RlZCcsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoaXMgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgdGhpcyBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBsaXN0IHdpdGggbmV3IGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZXMpIHtcbiAgICB0aGlzLnZpZXcucmVtb3ZlQWxsUm93cygpO1xuICAgIGNvbnRlbnRUeXBlcy5mb3JFYWNoKHRoaXMudmlldy5hZGRSb3csIHRoaXMudmlldyk7XG4gICAgdGhpcy5maXJlKCd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnLCB7fSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2aWV3cyByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSwgcXVlcnlTZWxlY3RvckFsbCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5pbXBvcnQgaW5pdE5hdmJhciBmcm9tICdjb21wb25lbnRzL25hdmJhcic7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBlbGVtZW50c1xuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHVuc2VsZWN0QWxsID0gZm9yRWFjaChyZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSk7XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRCcm93c2VyVmlld1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRCcm93c2VyVmlldyB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRzXG4gICAgdGhpcy5yb290RWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudChzdGF0ZSk7XG5cbiAgICAvLyBwaWNrIGVsZW1lbnRzXG4gICAgdGhpcy5tZW51YmFyID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLW5hdicpO1xuICAgIHRoaXMuaW5wdXRGaWVsZCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignW3JvbGU9XCJzZWFyY2hcIl0gaW5wdXQnKTtcbiAgICB0aGlzLmRpc3BsYXlTZWxlY3RlZCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci10b2dnbGVyLXNlbGVjdGVkJyk7XG4gICAgY29uc3QgaW5wdXRCdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwic2VhcmNoXCJdIC5pbnB1dC1ncm91cC1hZGRvbicpO1xuXG4gICAgLy8gaW5wdXQgZmllbGRcbiAgICB0aGlzLmlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICB0aGlzLmZpcmUoJ3NlYXJjaCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBxdWVyeTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgICBrZXlDb2RlOiBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGlucHV0IGJ1dHRvblxuICAgIGlucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgIGxldCBzZWFyY2hiYXIgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKTtcblxuICAgICAgIHRoaXMuZmlyZSgnc2VhcmNoJywge1xuICAgICAgICAgZWxlbWVudDogc2VhcmNoYmFyLFxuICAgICAgICAgcXVlcnk6IHNlYXJjaGJhci52YWx1ZSxcbiAgICAgICAgIGtleUNvZGU6IDEzIC8vIEFjdCBsaWtlIGFuICdlbnRlcicga2V5IHByZXNzXG4gICAgICAgfSk7XG5cbiAgICAgICBzZWFyY2hiYXIuZm9jdXMoKTtcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIG1lbnUgZ3JvdXAgZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVFbGVtZW50KHN0YXRlKSB7XG4gICAgbGV0IG1lbnV0aXRsZSA9ICdCcm93c2UgY29udGVudCB0eXBlcyc7XG4gICAgbGV0IG1lbnVJZCA9ICdjb250ZW50LXR5cGUtZmlsdGVyJztcbiAgICBsZXQgc2VhcmNoVGV4dCA9ICdTZWFyY2ggZm9yIENvbnRlbnQgVHlwZXMnO1xuXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwibWVudS1ncm91cFwiPlxuICAgICAgICA8bmF2ICByb2xlPVwibWVudWJhclwiIGNsYXNzPVwibmF2YmFyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhci1oZWFkZXJcIj5cbiAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdmJhci10b2dnbGVyIG5hdmJhci10b2dnbGVyLXJpZ2h0XCIgYXJpYS1jb250cm9scz1cIiR7bWVudUlkfVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlci1zZWxlY3RlZFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1hY2NvcmRpb24tYXJyb3dcIj48L3NwYW4+XG4gICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItYnJhbmRcIj4ke21lbnV0aXRsZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8dWwgaWQ9XCIke21lbnVJZH1cIiBjbGFzcz1cIm5hdmJhci1uYXZcIj48L3VsPlxuICAgICAgICA8L25hdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiIHJvbGU9XCJzZWFyY2hcIj5cbiAgICAgICAgICA8aW5wdXQgaWQ9XCJodWItc2VhcmNoLWJhclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1yb3VuZGVkXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiR7c2VhcmNoVGV4dH1cIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpY29uLXNlYXJjaFwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbWVudSBpdGVtXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtib29sZWFufSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGFkZE1lbnVJdGVtKHsgdGl0bGUsIGlkLCBzZWxlY3RlZCB9KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWl0ZW0nKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGlkKTtcbiAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRpdGxlO1xuXG4gICAgLy8gc2V0cyBpZiB0aGlzIG1lbnVpdGVtIHNob3VsZCBiZSBzZWxlY3RlZFxuICAgIGlmKHNlbGVjdGVkKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICB0aGlzLmRpc3BsYXlTZWxlY3RlZC5pbm5lclRleHQgPSB0aXRsZTtcbiAgICB9XG5cbiAgICByZWxheUNsaWNrRXZlbnRBcygnbWVudS1zZWxlY3RlZCcsIHRoaXMsIGVsZW1lbnQpO1xuXG4gICAgLy8gYWRkIHRvIG1lbnUgYmFyXG4gICAgdGhpcy5tZW51YmFyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgaW5wdXQgZmllbGRcbiAgICovXG4gIGNsZWFySW5wdXRGaWVsZCgpIHtcbiAgICB0aGlzLmlucHV0RmllbGQudmFsdWUgPSAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZmlsdGVyXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RlZE5hbWVcbiAgICovXG4gIHNldERpc3BsYXlTZWxlY3RlZChzZWxlY3RlZE5hbWUpIHtcbiAgICB0aGlzLmRpc3BsYXlTZWxlY3RlZC5pbm5lclRleHQgPSBzZWxlY3RlZE5hbWU7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyBhIG1lbnUgaXRlbSBieSBpZFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNlbGVjdE1lbnVJdGVtQnlJZChpZCkge1xuICAgIGNvbnN0IG1lbnVJdGVtcyA9IHRoaXMubWVudWJhci5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cIm1lbnVpdGVtXCJdJyk7XG4gICAgY29uc3Qgc2VsZWN0ZWRNZW51SXRlbSA9IHRoaXMubWVudWJhci5xdWVyeVNlbGVjdG9yKGBbcm9sZT1cIm1lbnVpdGVtXCJdW2RhdGEtaWQ9XCIke2lkfVwiXWApO1xuXG4gICAgaWYoc2VsZWN0ZWRNZW51SXRlbSkge1xuICAgICAgdW5zZWxlY3RBbGwobWVudUl0ZW1zKTtcbiAgICAgIHNlbGVjdGVkTWVudUl0ZW0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcblxuICAgICAgdGhpcy5maXJlKCdtZW51LXNlbGVjdGVkJywge1xuICAgICAgICBlbGVtZW50OiBzZWxlY3RlZE1lbnVJdGVtLFxuICAgICAgICBpZDogc2VsZWN0ZWRNZW51SXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdE1lbnUoKSB7XG4gICAgLy8gY3JlYXRlIHRoZSB1bmRlcmxpbmVcbiAgICBjb25zdCB1bmRlcmxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdW5kZXJsaW5lLmNsYXNzTmFtZSA9ICdtZW51aXRlbS11bmRlcmxpbmUnO1xuICAgIHRoaXMubWVudWJhci5hcHBlbmRDaGlsZCh1bmRlcmxpbmUpO1xuXG4gICAgLy8gY2FsbCBpbml0IG1lbnUgZnJvbSBzZGtcbiAgICBpbml0TmF2YmFyKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsImltcG9ydCBDb250ZW50VHlwZVNlY3Rpb25WaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXdcIjtcbmltcG9ydCBTZWFyY2hTZXJ2aWNlIGZyb20gXCIuLi9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZVwiO1xuaW1wb3J0IENvbnRlbnRUeXBlTGlzdCBmcm9tICcuLi9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdCc7XG5pbXBvcnQgQ29udGVudFR5cGVEZXRhaWwgZnJvbSAnLi4vY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsJztcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMvZXJyb3JzJztcblxuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgSURfRklMVEVSX0FMTCA9ICdmaWx0ZXItYWxsJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICB0aGlzLnR5cGVBaGVhZEVuYWJsZWQgPSB0cnVlO1xuXG4gICAgLy8gYWRkIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uVmlldyhzdGF0ZSk7XG5cbiAgICAvLyBjb250cm9sbGVyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2UoeyBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsIH0pO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0ID0gbmV3IENvbnRlbnRUeXBlTGlzdCgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwgPSBuZXcgQ29udGVudFR5cGVEZXRhaWwoeyBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsIH0pO1xuXG4gICAgLy8gY29uZmlndXJhdGlvbiBmb3IgZmlsdGVyc1xuICAgIGNvbnN0IGZpbHRlckNvbmZpZ3MgPSBbe1xuICAgICAgICB0aXRsZTogJ0FsbCcsXG4gICAgICAgIGlkOiBJRF9GSUxURVJfQUxMLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdNeSBDb250ZW50IFR5cGVzJyxcbiAgICAgICAgaWQ6ICdmaWx0ZXItbXktY29udGVudC10eXBlcycsXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ01vc3QgUG9wdWxhcicsXG4gICAgICAgIGlkOiAnZmlsdGVyLW1vc3QtcG9wdWxhcicsXG4gICAgICB9XTtcblxuICAgIC8vIGFkZCBtZW51IGl0ZW1zXG4gICAgZmlsdGVyQ29uZmlncy5mb3JFYWNoKHRoaXMudmlldy5hZGRNZW51SXRlbSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcuaW5pdE1lbnUoKTtcblxuICAgIC8vIEVsZW1lbnQgZm9yIGhvbGRpbmcgbGlzdCBhbmQgZGV0YWlscyB2aWV3c1xuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtdHlwZS1zZWN0aW9uJyk7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gc2VjdGlvbjtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVMaXN0LmdldEVsZW1lbnQoKSk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmdldEVsZW1lbnQoKSk7XG5cbiAgICB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCddLCB0aGlzLmNvbnRlbnRUeXBlTGlzdCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XG5cbiAgICAvLyByZWdpc3RlciBsaXN0ZW5lcnNcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMuc2VhcmNoLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMudmlldy5zZWxlY3RNZW51SXRlbUJ5SWQuYmluZCh0aGlzLnZpZXcsIElEX0ZJTFRFUl9BTEwpKTtcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMucmVzZXRNZW51T25FbnRlciwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdCBlZCcsIHRoaXMuYXBwbHlTZWFyY2hGaWx0ZXIsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMuY2xlYXJJbnB1dEZpZWxkLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLnVwZGF0ZURpc3BsYXlTZWxlY3RlZCwgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Qub24oJ3Jvdy1zZWxlY3RlZCcsIHRoaXMuc2hvd0RldGFpbFZpZXcsIHRoaXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwub24oJ2Nsb3NlJywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwub24oJ3NlbGVjdCcsIHRoaXMuY2xvc2VEZXRhaWxWaWV3LCB0aGlzKTtcblxuICAgIHRoaXMuaW5pdENvbnRlbnRUeXBlTGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3Qgd2l0aCBhIHNlYXJjaFxuICAgKi9cbiAgaW5pdENvbnRlbnRUeXBlTGlzdCgpIHtcbiAgICAvLyBpbml0aWFsaXplIGJ5IHNlYXJjaFxuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goXCJcIilcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmZpcmUoJ2Vycm9yJywgZXJyb3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBhIHNlYXJjaCBhbmQgdXBkYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3RcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XG4gICAqL1xuICBzZWFyY2goe3F1ZXJ5LCBrZXlDb2RlfSkge1xuICAgIGlmICh0aGlzLnR5cGVBaGVhZEVuYWJsZWQgfHwga2V5Q29kZSA9PT0gMTMpIHsgLy8gU2VhcmNoIGF1dG9tYXRpY2FsbHkgb3Igb24gJ2VudGVyJ1xuICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChxdWVyeSlcbiAgICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZGlzcGxheWVkIG5hbWUgb2YgdGhlIHNlbGVjdGVkIGZpbHRlciBmb3IgbW9iaWxlXG4gICAqXG4gICAqIEBwYXJhbSB7U2VsZWN0ZWRFbGVtZW50fSBldmVudFxuICAgKi9cbiAgdXBkYXRlRGlzcGxheVNlbGVjdGVkKGV2ZW50KSB7XG4gICAgdGhpcy52aWV3LnNldERpc3BsYXlTZWxlY3RlZChldmVudC5lbGVtZW50LmlubmVyVGV4dCk7XG4gIH1cblxuICByZXNldE1lbnVPbkVudGVyKHtrZXlDb2RlfSkge1xuICAgIGlmIChrZXlDb2RlID09PSAxMykge1xuICAgICAgdGhpcy5jbG9zZURldGFpbFZpZXcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGFwcGx5IGEgc2VhcmNoIGZpbHRlclxuICAgKiBAcGFyYW0ge1NlbGVjdGVkRWxlbWVudH0gZXZlbnRcbiAgICovXG4gIGFwcGx5U2VhcmNoRmlsdGVyKGV2ZW50KSB7XG4gICAgY29uc29sZS5kZWJ1ZygnQ29udGVudFR5cGVTZWN0aW9uOiBtZW51IHdhcyBjbGlja2VkIScsIGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGlucHV0IGZpZWxkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgY2xlYXJJbnB1dEZpZWxkKHtpZH0pIHtcbiAgICBpZiAoaWQgIT09IElEX0ZJTFRFUl9BTEwpIHtcbiAgICAgIHRoaXMudmlldy5jbGVhcklucHV0RmllbGQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgZGV0YWlsIHZpZXdcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzaG93RGV0YWlsVmlldyh7aWR9KSB7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwubG9hZEJ5SWQoaWQpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuc2hvdygpO1xuICAgIHRoaXMudHlwZUFoZWFkRW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cblxuICAvKipcbiAgICogQ2xvc2UgZGV0YWlsIHZpZXdcbiAgICovXG4gIGNsb3NlRGV0YWlsVmlldygpIHtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5zaG93KCk7XG4gICAgdGhpcy50eXBlQWhlYWRFbmFibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJpbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCJcbmltcG9ydCBpbml0VGFiUGFuZWwgZnJvbSBcImNvbXBvbmVudHMvdGFiLXBhbmVsXCJcbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IGF0dHJpYnV0ZUVxdWFscywgZ2V0QXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuL3V0aWxzL2V2ZW50cyc7XG4vKipcbiAqIFRhYiBjaGFuZ2UgZXZlbnRcbiAqIEBldmVudCBIdWJWaWV3I3RhYi1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogUGFuZWwgb3BlbiBvciBjbG9zZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjcGFuZWwtY2hhbmdlXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfREFUQV9JRCA9ICdkYXRhLWlkJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaXNPcGVuID0gaGFzQXR0cmlidXRlKCdvcGVuJyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWJWaWV3I3RhYi1jaGFuZ2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViVmlldyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIHRoaXMucmVuZGVyVGFiUGFuZWwoc3RhdGUpO1xuICAgIHRoaXMucmVuZGVyUGFuZWwoc3RhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgcGFuZWxcbiAgICovXG4gIGNsb3NlUGFuZWwoKSB7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKi9cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbklkXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwYW5kZWRcbiAgICovXG4gIHJlbmRlclBhbmVsKHt0aXRsZSA9ICcnLCBzZWN0aW9uSWQgPSAnY29udGVudC10eXBlcycsIGV4cGFuZGVkID0gZmFsc2V9KSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRpdGxlLmNsYXNzTmFtZSArPSBcInBhbmVsLWhlYWRlciBpY29uLWh1Yi1pY29uXCI7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAoISFleHBhbmRlZCkudG9TdHJpbmcoKSk7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gKTtcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdwYW5lbC1jaGFuZ2UnLCB0aGlzLCB0aGlzLnRpdGxlKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmJvZHkuY2xhc3NOYW1lICs9IFwicGFuZWwtYm9keVwiO1xuICAgIHRoaXMuYm9keS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgKCFleHBhbmRlZCkudG9TdHJpbmcoKSk7XG4gICAgdGhpcy5ib2R5LmlkID0gYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YDtcbiAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgKz0gYHBhbmVsIGg1cC1zZWN0aW9uLSR7c2VjdGlvbklkfWA7XG4gICAgaWYoZXhwYW5kZWQpe1xuICAgICAgdGhpcy5wYW5lbC5zZXRBdHRyaWJ1dGUoJ29wZW4nLCAnJyk7XG4gICAgfVxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmJvZHkpO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgKz0gYGg1cCBoNXAtaHViYDtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuICAgIGluaXRQYW5lbCh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaWYgcGFuZWwgaXMgb3BlbiwgdGhpcyBpcyB1c2VkIGZvciBvdXRlciBib3JkZXIgY29sb3JcbiAgICovXG4gIHRvZ2dsZVBhbmVsT3BlbigpIHtcbiAgICBsZXQgcGFuZWwgPSB0aGlzLnBhbmVsO1xuICAgIGlmKGlzT3BlbihwYW5lbCkpIHtcbiAgICAgIHBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgnb3BlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtwYW5lbC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKS5mb2N1cygpfSwyMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHRhYiBwYW5lbFxuICAgKi9cbiAgcmVuZGVyVGFiUGFuZWwoc3RhdGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnRhYmxpc3QuY2xhc3NOYW1lICs9IFwidGFibGlzdFwiO1xuICAgIHRoaXMudGFibGlzdC5zZXRBdHRyaWJ1dGUgKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgdGhpcy50YWJMaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxpc3QpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5jbGFzc05hbWUgKz0gJ3RhYi1wYW5lbCc7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGFiTGlzdFdyYXBwZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0YWJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcbiAgICovXG4gIGFkZFRhYih7dGl0bGUsIGlkLCBjb250ZW50LCBzZWxlY3RlZCA9IGZhbHNlfSkge1xuICAgIGNvbnN0IHRhYklkID0gYHRhYi0ke2lkfWA7XG4gICAgY29uc3QgdGFiUGFuZWxJZCA9IGB0YWItcGFuZWwtJHtpZH1gO1xuXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0YWIuY2xhc3NOYW1lICs9ICd0YWInO1xuICAgIHRhYi5pZCA9IHRhYklkO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0YWJQYW5lbElkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQudG9TdHJpbmcoKSk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfREFUQV9JRCwgaWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XG4gICAgdGFiLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCd0YWItY2hhbmdlJywgdGhpcywgdGFiKTtcblxuICAgIGNvbnN0IHRhYlBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFiUGFuZWwuaWQgPSB0YWJQYW5lbElkO1xuICAgIHRhYlBhbmVsLmNsYXNzTmFtZSArPSAndGFicGFuZWwnO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJsbGVkYnknLCB0YWJJZCk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghc2VsZWN0ZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xuICAgIHRhYlBhbmVsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKHRhYik7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRhYlBhbmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGFuaW1hdGVkIGJvcmRlciB0byB0aGUgYm90dG9tIG9mIHRoZSB0YWJcbiAgICovXG4gIGFkZEJvdHRvbUJvcmRlcigpIHtcbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcbiAgfVxuXG4gIGluaXRUYWJQYW5lbCgpIHtcbiAgICBpbml0VGFiUGFuZWwodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0U2VjdGlvblR5cGUoe2lkfSkge1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lID0gYGg1cC1zZWN0aW9uLSR7aWR9IHBhbmVsYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwiaW1wb3J0IHtjdXJyeX0gZnJvbSAndXRpbHMvZnVuY3Rpb25hbCdcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tICcuLi9odWItc2VydmljZXMnO1xuXG4vKipcbiAqIEBjbGFzc1xuICogVGhlIFNlYXJjaCBTZXJ2aWNlIGdldHMgYSBjb250ZW50IHR5cGUgZnJvbSBodWItc2VydmljZXMuanNcbiAqIGluIHRoZSBmb3JtIG9mIGEgcHJvbWlzZS4gSXQgdGhlbiBnZW5lcmF0ZXMgYSBzY29yZSBiYXNlZFxuICogb24gdGhlIGRpZmZlcmVudCB3ZWlnaHRpbmdzIG9mIHRoZSBjb250ZW50IHR5cGUgZmllbGRzIGFuZFxuICogc29ydHMgdGhlIHJlc3VsdHMgYmFzZWQgb24gdGhlIGdlbmVyYXRlZCBzY29yZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoU2VydmljZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLmFwaVJvb3RVcmxcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBBZGQgY29udGVudCB0eXBlcyB0byB0aGUgc2VhcmNoIGluZGV4XG4gICAgdGhpcy5jb250ZW50VHlwZXMgPSB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgc2VhcmNoXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW10+fSBBIHByb21pc2Ugb2YgYW4gYXJyYXkgb2YgY29udGVudCB0eXBlc1xuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFR5cGVzLnRoZW4oZmlsdGVyQnlRdWVyeShxdWVyeSkpO1xuICB9XG59XG5cbi8qKlxuICogRmlsdGVycyBhIGxpc3Qgb2YgY29udGVudCB0eXBlcyBiYXNlZCBvbiBhIHF1ZXJ5XG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICovXG5jb25zdCBmaWx0ZXJCeVF1ZXJ5ID0gY3VycnkoZnVuY3Rpb24ocXVlcnksIGNvbnRlbnRUeXBlcykge1xuICBpZiAocXVlcnkgPT0gJycpIHtcbiAgICByZXR1cm4gY29udGVudFR5cGVzO1xuICB9XG5cbiAgLy8gQXBwZW5kIGEgc2VhcmNoIHNjb3JlIHRvIGVhY2ggY29udGVudCB0eXBlXG4gIHJldHVybiBjb250ZW50VHlwZXMubWFwKGNvbnRlbnRUeXBlID0+XG4gICAgKHtcbiAgICAgIGNvbnRlbnRUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIHNjb3JlOiBnZXRTZWFyY2hTY29yZShxdWVyeSwgY29udGVudFR5cGUpXG4gICAgfSkpXG4gICAgLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0LnNjb3JlID4gMClcbiAgICAuc29ydChzb3J0U2VhcmNoUmVzdWx0cykgLy8gU29ydCBieSBpbnN0YWxsZWQsIHJlbGV2YW5jZSBhbmQgcG9wdWxhcml0eVxuICAgIC5tYXAocmVzdWx0ID0+IHJlc3VsdC5jb250ZW50VHlwZSk7IC8vIFVud3JhcCByZXN1bHQgb2JqZWN0O1xufSk7XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIEFycmF5LnNvcnQoKVxuICogQ29tcGFyZXMgdHdvIGNvbnRlbnQgdHlwZXMgb24gZGlmZmVyZW50IGNyaXRlcmlhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgRmlyc3QgY29udGVudCB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gYiBTZWNvbmQgY29udGVudCB0eXBlXG4gKiBAcmV0dXJuIHtpbnR9XG4gKi9cbmNvbnN0IHNvcnRTZWFyY2hSZXN1bHRzID0gKGEsYikgPT4ge1xuICBpZiAoIWEuY29udGVudFR5cGUuaW5zdGFsbGVkICYmIGIuY29udGVudFR5cGUuaW5zdGFsbGVkKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAoYS5jb250ZW50VHlwZS5pbnN0YWxsZWQgJiYgIWIuY29udGVudFR5cGUuaW5zdGFsbGVkKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgZWxzZSBpZiAoYi5zY29yZSAhPT0gYS5zY29yZSkge1xuICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZTtcbiAgfVxuXG4gIGVsc2Uge1xuICAgIHJldHVybiBiLmNvbnRlbnRUeXBlLnBvcHVsYXJpdHkgLSBhLmNvbnRlbnRUeXBlLnBvcHVsYXJpdHk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB3ZWlnaHRpbmcgZm9yIGRpZmZlcmVudCBzZWFyY2ggdGVybXMgYmFzZWRcbiAqIG9uIGV4aXN0ZW5jZSBvZiBzdWJzdHJpbmdzXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBxdWVyeVxuICogQHBhcmFtICB7T2JqZWN0fSBjb250ZW50VHlwZVxuICogQHJldHVybiB7aW50fVxuICovXG4gY29uc3QgZ2V0U2VhcmNoU2NvcmUgPSBmdW5jdGlvbihxdWVyeSwgY29udGVudFR5cGUpIHtcbiAgIGxldCBxdWVyaWVzID0gcXVlcnkuc3BsaXQoJyAnKS5maWx0ZXIocXVlcnkgPT4gcXVlcnkgIT09ICcnKTtcbiAgIGxldCBxdWVyeVNjb3JlcyA9IHF1ZXJpZXMubWFwKHF1ZXJ5ID0+IGdldFNjb3JlRm9yRWFjaFF1ZXJ5KHF1ZXJ5LCBjb250ZW50VHlwZSkpO1xuICAgaWYgKHF1ZXJ5U2NvcmVzLmluZGV4T2YoMCkgPiAtMSkge1xuICAgICByZXR1cm4gMDtcbiAgIH1cbiAgIHJldHVybiBxdWVyeVNjb3Jlcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbiB9O1xuXG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmVsZXZhbmNlIHNjb3JlIGZvciBhIHNpbmdsZSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0gIHt0eXBlfSBxdWVyeSAgICAgICBkZXNjcmlwdGlvblxuICogQHBhcmFtICB7dHlwZX0gY29udGVudFR5cGUgZGVzY3JpcHRpb25cbiAqIEByZXR1cm4ge3R5cGV9ICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gKi9cbmNvbnN0IGdldFNjb3JlRm9yRWFjaFF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5LCBjb250ZW50VHlwZSkge1xuICAgcXVlcnkgPSBxdWVyeS50cmltKCk7XG4gICBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS50aXRsZSkpIHtcbiAgICAgcmV0dXJuIDEwMDtcbiAgIH1cbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuc3VtbWFyeSkpIHtcbiAgICAgcmV0dXJuIDU7XG4gICB9XG4gICBlbHNlIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uKSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2UgaWYgKGFycmF5SGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5rZXl3b3JkcykpIHtcbiAgICAgcmV0dXJuIDU7XG4gICB9XG4gICBlbHNlIHtcbiAgICAgcmV0dXJuIDA7XG4gICB9XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG5lZWRsZSBpcyBmb3VuZCBpbiB0aGUgaGF5c3RhY2suXG4gKiBOb3QgY2FzZSBzZW5zaXRpdmVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmVlZGxlXG4gKiBAcGFyYW0ge3N0cmluZ30gaGF5c3RhY2tcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGhhc1N1YlN0cmluZyA9IGZ1bmN0aW9uKG5lZWRsZSwgaGF5c3RhY2spIHtcbiAgaWYgKGhheXN0YWNrID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaGF5c3RhY2sudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5lZWRsZS50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiwgY2hlY2tzIGlmIGFycmF5IGhhcyBjb250YWlucyBhIHN1YnN0cmluZ1xuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gc3ViU3RyaW5nXG4gKiBAcGFyYW0gIHtBcnJheX0gYXJyXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBhcnJheUhhc1N1YlN0cmluZyA9IGZ1bmN0aW9uKHN1YlN0cmluZywgYXJyKSB7XG4gIGlmIChhcnIgPT09IHVuZGVmaW5lZCB8fCBzdWJTdHJpbmcgPT09ICcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGFyci5zb21lKHN0cmluZyA9PiBoYXNTdWJTdHJpbmcoc3ViU3RyaW5nLCBzdHJpbmcpKTtcbn07XG5cbmNvbnN0IEFkZE51bWJlcj1mdW5jdGlvbihhLGIpXG57XG4gIHJldHVybiBhK2I7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsImltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tICcuLi9odWItc2VydmljZXMnO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKlxuICogQGZpcmVzIEh1YiN1cGxvYWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkU2VjdGlvbiB7XG5cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIElucHV0IGVsZW1lbnQgZm9yIHRoZSBINVAgZmlsZVxuICAgIGNvbnN0IGg1cFVwbG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaDVwVXBsb2FkLnNldEF0dHJpYnV0ZSgndHlwZScsICdmaWxlJyk7XG5cbiAgICAvLyBTZW5kcyB0aGUgSDVQIGZpbGUgdG8gdGhlIHBsdWdpblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHVzZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdVc2UnO1xuICAgIHVzZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgLy8gQWRkIHRoZSBINVAgZmlsZSB0byBhIGZvcm0sIHJlYWR5IGZvciB0cmFuc3BvcnRhdGlvblxuICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZGF0YS5hcHBlbmQoJ2g1cCcsIGg1cFVwbG9hZC5maWxlc1swXSk7XG5cbiAgICAgIC8vIFVwbG9hZCBjb250ZW50IHRvIHRoZSBwbHVnaW5cbiAgICAgIHRoaXMuc2VydmljZXMudXBsb2FkQ29udGVudChkYXRhKVxuICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAvLyBGaXJlIHRoZSByZWNlaXZlZCBkYXRhIHRvIGFueSBsaXN0ZW5lcnNcbiAgICAgICAgICBzZWxmLmZpcmUoJ3VwbG9hZCcsIGpzb24pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGg1cFVwbG9hZCk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh1c2VCdXR0b24pO1xuXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUgfSBmcm9tICd1dGlscy9lbGVtZW50cyc7XG5pbXBvcnQgeyBmb3JFYWNoLCB3aXRob3V0IH0gZnJvbSAndXRpbHMvZnVuY3Rpb25hbCc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBDb250cm9scyBFdmVudFxuICogQHR5cGVkZWYge09iamVjdH0gQ29udHJvbHNFdmVudFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGluZGV4XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBvbGRFbGVtZW50XG4gKi9cbi8qKlxuICogQWRkIGVsZW1lbnQgZXZlbnRcbiAqIEBldmVudCBDb250cm9scyNhZGRFbGVtZW50XG4gKiBAdHlwZSBDb250cm9sc0V2ZW50XG4gKi9cbi8qKlxuICogUmVtb3ZlIGVsZW1lbnQgZXZlbnRcbiAqIEBldmVudCBDb250cm9scyNyZW1vdmVFbGVtZW50XG4gKiBAdHlwZSBDb250cm9sc0V2ZW50XG4gKi9cbi8qKlxuICogUHJldmlvdXMgZWxlbWVudCBldmVudFxuICogQGV2ZW50IENvbnRyb2xzI3ByZXZpb3VzRWxlbWVudFxuICogQHR5cGUgQ29udHJvbHNFdmVudFxuICovXG4vKipcbiAqIE5leHQgZWxlbWVudCBldmVudFxuICogQGV2ZW50IENvbnRyb2xzI25leHRFbGVtZW50XG4gKiBAdHlwZSBDb250cm9sc0V2ZW50XG4gKi9cbi8qKlxuICogU2VsZWN0IG9wdGlvbiBldmVudFxuICogQGV2ZW50IENvbnRyb2xzI3NlbGVjdFxuICogQHR5cGUgQ29udHJvbHNFdmVudFxuICovXG4vKipcbiAqIERyYWcgZWxlbWVudCBldmVudFxuICogQGV2ZW50IENvbnRyb2xzI2RyYWdcbiAqIEB0eXBlIENvbnRyb2xzRXZlbnRcbiAqL1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn0gcmVtb3ZlVGFiSW5kZXhcbiAqL1xuY29uc3QgcmVtb3ZlVGFiSW5kZXggPSByZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn0gcmVtb3ZlVGFiSW5kZXhGb3JBbGxcbiAqL1xuY29uc3QgcmVtb3ZlVGFiSW5kZXhGb3JBbGwgPSBmb3JFYWNoKHJlbW92ZVRhYkluZGV4KTtcbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufSBzZXRUYWJJbmRleFplcm9cbiAqL1xuY29uc3Qgc2V0VGFiSW5kZXhaZXJvID0gc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn0gaGFzVGFiSW5kZXhcbiAqL1xuY29uc3QgaGFzVGFiSW5kZXggPSBoYXNBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbHMge1xuICBjb25zdHJ1Y3RvcihwbHVnaW5zKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvKipcbiAgICAgKkBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IHRhYmJhYmxlRWxlbWVudFxuICAgICAqL1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHBsdWdpbnNcbiAgICAgKi9cbiAgICB0aGlzLnBsdWdpbnMgPSBwbHVnaW5zIHx8IFtdO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtIVE1MRWxlbWVudFtdfSBlbGVtZW50c1xuICAgICAqL1xuICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcblxuICAgIC8vIG1vdmUgdGFiaW5kZXggdG8gbmV4dCBlbGVtZW50XG4gICAgdGhpcy5vbignbmV4dEVsZW1lbnQnLCB0aGlzLm5leHRFbGVtZW50LCB0aGlzKTtcblxuICAgIC8vIG1vdmUgdGFiaW5kZXggdG8gcHJldmlvdXMgZWxlbWVudFxuICAgIHRoaXMub24oJ3ByZXZpb3VzRWxlbWVudCcsIHRoaXMucHJldmlvdXNFbGVtZW50LCB0aGlzKTtcblxuICAgIC8vIGluaXQgcGx1Z2luc1xuICAgIHRoaXMuaW5pdFBsdWdpbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY29udHJvbHMgdG8gYW4gZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICAgKlxuICAgKiBAZmlyZXMgQ29udHJvbHMjYWRkRWxlbWVudFxuICAgKiBAcHVibGljXG4gICAqL1xuICBhZGRFbGVtZW50KGVsKcKge1xuICAgIHRoaXMuZWxlbWVudHMucHVzaChlbCk7XG5cbiAgICB0aGlzLmZpcmVzRXZlbnQoJ2FkZEVsZW1lbnQnLCBlbCk7XG5cbiAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDEpIHsgLy8gaWYgZmlyc3RcbiAgICAgIHRoaXMuc2V0VGFiYmFibGUoZWwpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQWRkIGNvbnRyb2xzIHRvIGFuIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICpcbiAgICogQGZpcmVzIENvbnRyb2xzI2FkZEVsZW1lbnRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcmVtb3ZlRWxlbWVudChlbCnCoHtcbiAgICB0aGlzLmVsZW1lbnRzID0gd2l0aG91dChbZWxdLCB0aGlzLmVsZW1lbnRzKTtcblxuICAgIC8vIGlmIHJlbW92ZWQgZWxlbWVudCB3YXMgc2VsZWN0ZWRcbiAgICBpZihoYXNUYWJJbmRleChlbCkpIHtcbiAgICAgIHJlbW92ZVRhYkluZGV4KGVsKTtcblxuICAgICAgLy8gc2V0IGZpcnN0IGVsZW1lbnQgc2VsZWN0ZWQgaWYgZXhpc3RzXG4gICAgICBpZih0aGlzLmVsZW1lbnRzWzBdKSB7XG4gICAgICAgIHRoaXMuc2V0VGFiYmFibGUodGhpcy5lbGVtZW50c1swXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5maXJlc0V2ZW50KCdyZW1vdmVFbGVtZW50JywgZWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8RXZlbnRUYXJnZXR9IGVsXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGZpcmVzRXZlbnQodHlwZSwgZWwpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZWxlbWVudHMuaW5kZXhPZihlbCk7XG5cbiAgICB0aGlzLmZpcmUodHlwZSwge1xuICAgICAgZWxlbWVudDogZWwsXG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICBlbGVtZW50czogdGhpcy5lbGVtZW50cyxcbiAgICAgIG9sZEVsZW1lbnQ6IHRoaXMudGFiYmFibGVFbGVtZW50XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0YWJpbmRleCBvbiBhbiBlbGVtZW50LCByZW1vdmUgaXQgZnJvbSBhbGwgb3RoZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbmV4dEVsZW1lbnQoe2luZGV4fSkge1xuICAgIGNvbnN0IGlzTGFzdEVsZW1lbnQgPSBpbmRleCA9PT0gKHRoaXMuZWxlbWVudHMubGVuZ3RoIC0gMSk7XG4gICAgY29uc3QgbmV4dEVsID0gdGhpcy5lbGVtZW50c1tpc0xhc3RFbGVtZW50ID8gMCA6IChpbmRleCArIDEpXTtcblxuICAgIHRoaXMuc2V0VGFiYmFibGUobmV4dEVsKTtcbiAgICBuZXh0RWwuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRhYmluZGV4IG9uIGFuIGVsZW1lbnQsIHJlbW92ZSBpdCBmcm9tIGFsbCBvdGhlcnNcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2V0VGFiYmFibGUoZWwpIHtcbiAgICByZW1vdmVUYWJJbmRleEZvckFsbCh0aGlzLmVsZW1lbnRzKTtcbiAgICBzZXRUYWJJbmRleFplcm8oZWwpO1xuICAgIHRoaXMudGFiYmFibGVFbGVtZW50ID0gZWw7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0YWJpbmRleCBvbiBhbiBlbGVtZW50LCByZW1vdmUgaXQgZnJvbSBhbGwgb3RoZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJldmlvdXNFbGVtZW50KHtpbmRleH0pIHtcbiAgICBjb25zdCBpc0ZpcnN0RWxlbWVudCA9IGluZGV4ID09PSAwO1xuICAgIGNvbnN0IHByZXZFbCA9IHRoaXMuZWxlbWVudHNbaXNGaXJzdEVsZW1lbnQgPyAodGhpcy5lbGVtZW50cy5sZW5ndGggLSAxKSA6IChpbmRleCAtIDEpXTtcblxuICAgIHRoaXMuc2V0VGFiYmFibGUocHJldkVsKTtcbiAgICBwcmV2RWwuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGx1Z2luc1xuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaW5pdFBsdWdpbnMoKcKge1xuICAgIHRoaXMucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uKHBsdWdpbil7XG4gICAgICBpZihwbHVnaW4uaW5pdCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgcGx1Z2luLmluaXQodGhpcyk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay11aS9zcmMvc2NyaXB0cy9jb250cm9scy5qcyIsIi8qKlxuICogQG1peGluXG4gKi9cbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnRmdWx9XG4gICAqL1xuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNjb3BlXG4gICAgICovXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcbiAgICAgICdsaXN0ZW5lcic6IGxpc3RlbmVyLFxuICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAgICovXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUodHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrLXVpL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsIi8qKlxuICogQGNsYXNzXG4gKiBAY2xhc3NkZXNjIEtleWJvYXJkIG5hdmlnYXRpb24gZm9yIGFjY2Vzc2liaWxpdHkgc3VwcG9ydFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2VsZWN0YWJpbGl0eVxuICAgICAqL1xuICAgIHRoaXMuc2VsZWN0YWJpbGl0eSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSW5pdHMgdGhpcyBjbGFzc1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRyb2xzfSBjb250cm9sc1xuICAgKi9cbiAgaW5pdChjb250cm9scynCoHtcbiAgICAvKipcbiAgICAgKiBOZWVkIHRvIGhhdmUgYSBjb21tb24gYmluZGluZyBvZiBoYW5kbGVLZXlEb3duLCBzbyB0aGF0IGl0IGNhbiBiZSBhXG4gICAgICogY29tbW9uIGluc3RhbmNlIHRvIGJlIHVzZWQgZm9yIGFkZEV2ZW50TGlzdGVuZXIgYW5kIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAgICovXG4gICAgdGhpcy5ib3VuZEhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDb250cm9sc31cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRyb2xzID0gY29udHJvbHM7XG4gICAgdGhpcy5jb250cm9scy5vbignYWRkRWxlbWVudCcsIHRoaXMubGlzdGVuRm9yS2V5RG93biwgdGhpcyk7XG4gICAgdGhpcy5jb250cm9scy5vbigncmVtb3ZlRWxlbWVudCcsIHRoaXMucmVtb3ZlS2V5RG93bkxpc3RlbmVyLCB0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgYSBrZXlib2FyZCBwcmVzcyB3aGVuIGVsZW1lbnQgaXMgZm9jdXNlZFxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBsaXN0ZW5Gb3JLZXlEb3duKHtlbGVtZW50fSkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRIYW5kbGVLZXlEb3duKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGEga2V5Ym9hcmQgcHJlc3MgbGlzdGVuZXJcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVtb3ZlS2V5RG93bkxpc3RlbmVyKHtlbGVtZW50fSkge1xuICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRIYW5kbGVLZXlEb3duKTtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyBrZXkgZG93blxuICAgKlxuICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEtleWJvYXJkIGV2ZW50XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgY2FzZSAxMzogLy8gRW50ZXJcbiAgICAgIGNhc2UgMzI6IC8vIFNwYWNlXG4gICAgICAgIHRoaXMuc2VsZWN0KGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM3OiAvLyBMZWZ0IEFycm93XG4gICAgICBjYXNlIDM4OiAvLyBVcCBBcnJvd1xuICAgICAgICB0aGlzLnByZXZpb3VzRWxlbWVudChldmVudC50YXJnZXQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vIFJpZ2h0IEFycm93XG4gICAgICBjYXNlIDQwOiAvLyBEb3duIEFycm93XG4gICAgICAgIHRoaXMubmV4dEVsZW1lbnQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlcyB0aGUgcHJldmlvdXMgZWxlbWVudCBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fEV2ZW50VGFyZ2V0fSBlbFxuICAgKiBAZmlyZXMgQ29udHJvbHMjcHJldmlvdXNFbGVtZW50XG4gICAqL1xuICBwcmV2aW91c0VsZW1lbnQoZWwpIHtcbiAgICB0aGlzLmNvbnRyb2xzLmZpcmVzRXZlbnQoJ3ByZXZpb3VzRWxlbWVudCcsIGVsKVxuICB9O1xuXG4gIC8qKlxuICAgKiBGaXJlIHRoZSBuZXh0IGVsZW1lbnQgZXZlbnRcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxFdmVudFRhcmdldH0gZWxcbiAgICogQGZpcmVzIENvbnRyb2xzI25leHRFbGVtZW50XG4gICAqL1xuICBuZXh0RWxlbWVudChlbCkge1xuICAgIHRoaXMuY29udHJvbHMuZmlyZXNFdmVudCgnbmV4dEVsZW1lbnQnLCBlbClcbiAgfTtcblxuICAvKipcbiAgICogRmlyZXMgdGhlIHNlbGVjdCBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEhUTUxFbGVtZW50fSBlbFxuICAgKiBAZmlyZXMgQ29udHJvbHMjc2VsZWN0XG4gICAqL1xuICBzZWxlY3QoZWwpe1xuICAgIGlmKHRoaXMuc2VsZWN0YWJpbGl0eSkge1xuICAgICAgaWYodGhpcy5jb250cm9scy5maXJlc0V2ZW50KCdiZWZvcmUtc2VsZWN0JywgZWwpICE9PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNvbnRyb2xzLmZpcmVzRXZlbnQoJ3NlbGVjdCcsIGVsKTtcbiAgICAgICAgdGhpcy5jb250cm9scy5maXJlc0V2ZW50KCdhZnRlci1zZWxlY3QnLCBlbClcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2FibGUgcG9zc2liaWxpdHkgdG8gc2VsZWN0IGEgd29yZCB0cm91Z2ggY2xpY2sgYW5kIHNwYWNlIG9yIGVudGVyXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGRpc2FibGVTZWxlY3RhYmlsaXR5KCkge1xuICAgIHRoaXMuc2VsZWN0YWJpbGl0eSA9IGZhbHNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbmFibGUgcG9zc2liaWxpdHkgdG8gc2VsZWN0IGEgd29yZCB0cm91Z2ggY2xpY2sgYW5kIHNwYWNlIG9yIGVudGVyXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGVuYWJsZVNlbGVjdGFiaWxpdHkoKSB7XG4gICAgdGhpcy5zZWxlY3RhYmlsaXR5ID0gdHJ1ZTtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrLXVpL3NyYy9zY3JpcHRzL3VpL2tleWJvYXJkLmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSwgY2xhc3NMaXN0Q29udGFpbnMsIHF1ZXJ5U2VsZWN0b3IsIG5vZGVMaXN0VG9BcnJheSB9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICovXG5jb25zdCBBVFRSSUJVVEVfU0laRSA9ICdkYXRhLXNpemUnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgZGlzYWJsZSA9IHNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBlbmFibGUgPSByZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBlbmFibGVkXG4gKi9cbmNvbnN0IHRvZ2dsZUVuYWJsZWQgPSAoZWxlbWVudCwgZW5hYmxlZCkgPT4gKGVuYWJsZWQgPyBlbmFibGUgOiBkaXNhYmxlKShlbGVtZW50KTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGhpZGRlblxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gY3VycnkoKGhpZGRlbiwgZWxlbWVudCkgPT4gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGhpZGRlbi50b1N0cmluZygpLCBlbGVtZW50KSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBpc0Rpc2FibGVkID0gaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgdmlld1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICovXG5jb25zdCB1cGRhdGVWaWV3ID0gKGVsZW1lbnQsIHN0YXRlKSA9PiB7XG4gIGNvbnN0IHByZXZCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2aW91cycpO1xuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICBjb25zdCBsaXN0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICBjb25zdCB0b3RhbENvdW50ID0gbGlzdC5jaGlsZEVsZW1lbnRDb3VudDtcblxuICAvLyB1cGRhdGUgbGlzdCBzaXplc1xuICBsaXN0LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gc3RhdGUuZGlzcGxheUNvdW50ICogdG90YWxDb3VudH0lYDtcbiAgbGlzdC5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7c3RhdGUucG9zaXRpb24gKiAoMTAwIC8gc3RhdGUuZGlzcGxheUNvdW50KX0lYDtcblxuICAvLyB1cGRhdGUgaW1hZ2Ugc2l6ZXNcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXG4gICAgLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gdG90YWxDb3VudH0lYCk7XG5cbiAgLy8gdG9nZ2xlIGJ1dHRvbiB2aXNpYmlsaXR5XG4gIFtwcmV2QnV0dG9uLCBuZXh0QnV0dG9uXVxuICAgIC5mb3JFYWNoKHRvZ2dsZVZpc2liaWxpdHkoc3RhdGUuZGlzcGxheUNvdW50ID49IHRvdGFsQ291bnQpKTtcblxuICAvLyB0b2dnbGUgYnV0dG9uIGVuYWJsZSwgZGlzYWJsZWRcbiAgdG9nZ2xlRW5hYmxlZChuZXh0QnV0dG9uLCBzdGF0ZS5wb3NpdGlvbiA+IChzdGF0ZS5kaXNwbGF5Q291bnQgLSB0b3RhbENvdW50KSk7XG4gIHRvZ2dsZUVuYWJsZWQocHJldkJ1dHRvbiwgc3RhdGUucG9zaXRpb24gPCAwKTtcbn07XG5cbi8qKlxuICogSGFuZGxlcyBidXR0b24gY2xpY2tlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYnV0dG9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB1cGRhdGVTdGF0ZVxuICpcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBvbk5hdmlnYXRpb25CdXR0b25DbGljayA9IChlbGVtZW50LCBzdGF0ZSwgYnV0dG9uLCB1cGRhdGVTdGF0ZSkgPT4ge1xuICBpZighaXNEaXNhYmxlZChidXR0b24pKXtcbiAgICB1cGRhdGVTdGF0ZShzdGF0ZSk7XG4gICAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG4gIH1cbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gaW1hZ2VcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpbWFnZVxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGluaXRJbWFnZSA9IGN1cnJ5KChlbGVtZW50LCBpbWFnZSkgPT4ge1xuICBsZXQgdGFyZ2V0SWQgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgbGV0IHRhcmdldCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFyZ2V0SWR9YCk7XG5cbiAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcbiAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpKVxufSk7XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHdoZW4gdGhlIGRvbSBpcyB1cGRhdGVkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSByZWNvcmRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoYW5kbGVEb21VcGRhdGUgPSBjdXJyeSgoZWxlbWVudCwgc3RhdGUsIHJlY29yZCkgPT4ge1xuICAvLyBvbiBhZGQgaW1hZ2UgcnVuIGluaXRpYWxpemF0aW9uXG4gIGlmKHJlY29yZC50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgIG5vZGVMaXN0VG9BcnJheShyZWNvcmQuYWRkZWROb2RlcylcbiAgICAgIC5maWx0ZXIoY2xhc3NMaXN0Q29udGFpbnMoJ3NsaWRlJykpXG4gICAgICAubWFwKHF1ZXJ5U2VsZWN0b3IoJ2ltZycpKVxuICAgICAgLmZvckVhY2goaW5pdEltYWdlKGVsZW1lbnQpKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgdmlld1xuICB1cGRhdGVWaWV3KGVsZW1lbnQsIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxuICAgIHBvc2l0aW9uOiAwXG4gIH0pKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIC8vIGdldCBidXR0b24gaHRtbCBlbGVtZW50c1xuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICBjb25zdCBwcmV2QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMnKTtcblxuICAvKipcbiAgICogQHR5cGVkZWYge29iamVjdH0gSW1hZ2VTY3JvbGxlclN0YXRlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkaXNwbGF5Q291bnRcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHBvc2l0aW9uXG4gICAqL1xuICBjb25zdCBzdGF0ZSA9IHtcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxuICAgIHBvc2l0aW9uOiAwXG4gIH07XG5cbiAgLy8gaW5pdGlhbGl6ZSBidXR0b25zXG4gIG5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBvbk5hdmlnYXRpb25CdXR0b25DbGljayhlbGVtZW50LCBzdGF0ZSwgbmV4dEJ1dHRvbiwgc3RhdGUgPT4gc3RhdGUucG9zaXRpb24tLSkpO1xuICBwcmV2QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2soZWxlbWVudCwgc3RhdGUsIHByZXZCdXR0b24sIHN0YXRlID0+IHN0YXRlLnBvc2l0aW9uKyspKTtcblxuICAvLyBpbml0aWFsaXplIGltYWdlc1xuICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1thcmlhLWNvbnRyb2xzXScpLmZvckVhY2goaW5pdEltYWdlKGVsZW1lbnQpKTtcblxuICAvLyBsaXN0ZW4gZm9yIHVwZGF0ZXMgdG8gZGF0YS1zaXplXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZvckVhY2goaGFuZGxlRG9tVXBkYXRlKGVsZW1lbnQsIHN0YXRlKSkpO1xuXG4gIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwge1xuICAgIHN1YnRyZWU6IHRydWUsXG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbQVRUUklCVVRFX1NJWkVdXG4gIH0pO1xuXG4gIC8vIGluaXRpYWxpemUgcG9zaXRpb25cbiAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlci5qcyIsImltcG9ydCB7c2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIGF0dHJpYnV0ZUVxdWFscywgbm9kZUxpc3RUb0FycmF5fSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcbmltcG9ydCBLZXlib2FyZCBmcm9tICcuLi91dGlscy9rZXlib2FyZCc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaXNTZWxlY3RlZCA9IGF0dHJpYnV0ZUVxdWFscygnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChyZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSk7XG5cbi8qKlxuICogQ2hhbmdlIHRhYiBwYW5lbCB3aGVuIHRhYidzIGFyaWEtc2VsZWN0ZWQgaXMgY2hhbmdlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhYlxuICovXG5jb25zdCBhZGRBcmlhU2VsZWN0ZWRPYnNlcnZlciA9IChlbGVtZW50LCB0YWIpID0+IHtcbiAgLy8gc2V0IG9ic2VydmVyIG9uIHRpdGxlIGZvciBhcmlhLWV4cGFuZGVkXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBsZXQgcGFuZWxJZCA9IHRhYi5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICBsZXQgcGFuZWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3BhbmVsSWR9YCk7XG4gICAgbGV0IGFsbFBhbmVscyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJwYW5lbFwiXScpO1xuXG4gICAgaWYoaXNTZWxlY3RlZCh0YWIpKSB7XG4gICAgICBoaWRlQWxsKGFsbFBhbmVscyk7XG4gICAgICBzaG93KHBhbmVsKTtcbiAgICB9XG4gIH0pO1xuXG4gIG9ic2VydmVyLm9ic2VydmUodGFiLCB7XG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcImFyaWEtc2VsZWN0ZWRcIl1cbiAgfSk7XG59O1xuXG4vKipcbiAqIFNlbGVjdHMgYW4gZWxlbWVudCwgYW5kIHVuc2VsZWN0cyBhbGwgb3RoZXIgdGFic1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gYWxsVGFic1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNlbGVjdFRhYiA9IGN1cnJ5KChhbGxUYWJzLCBlbGVtZW50KSA9PiB7XG4gIHVuU2VsZWN0QWxsKGFsbFRhYnMpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG59KTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0YWJzID0gbm9kZUxpc3RUb0FycmF5KGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJcIl0nKSk7XG4gIGNvbnN0IGtleWJvYXJkID0gbmV3IEtleWJvYXJkKCk7XG5cbiAgLy8gaGFuZGxlIGVudGVyICsgc3BhY2UgY2xpY2tcbiAga2V5Ym9hcmQub25TZWxlY3QgPSBzZWxlY3RUYWIodGFicyk7XG5cbiAgLy8gaW5pdCB0YWJzXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuICAgIGFkZEFyaWFTZWxlY3RlZE9ic2VydmVyKGVsZW1lbnQsIHRhYik7XG5cbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICBsZXQgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGxldCBlbGVtZW50SW5kZXggPSB0YWJzLmluZGV4T2YoZWxlbWVudCk7XG4gICAgICBzZWxlY3RUYWIodGFicywgZWxlbWVudCk7XG4gICAgICBrZXlib2FyZC5mb3JjZVNlbGVjdGVkSW5kZXgoZWxlbWVudEluZGV4KTtcbiAgICB9KTtcblxuICAgIGtleWJvYXJkLmFkZEVsZW1lbnQodGFiKTtcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gJy4vZWxlbWVudHMnO1xuaW1wb3J0IHsgZm9yRWFjaCwgd2l0aG91dCB9IGZyb20gJy4vZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGFkZFRhYkluZGV4ID0gc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHJlbW92ZVRhYkluZGV4ID0gcmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcbiAqIEBmdW5jdGlvblxuICovXG5cbmNvbnN0IHJlbW92ZVRhYkluZGV4Rm9yQWxsID0gZm9yRWFjaChyZW1vdmVUYWJJbmRleCk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhhc1RhYkluZGV4ID0gaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuXG4vKipcbiAqIFNldHMgdGFiaW5kZXggYW5kIGZvY3VzIG9uIGFuIGVsZW1lbnQsIHJlbW92ZSBpdCBmcm9tIGFsbCBvdGhlcnNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqL1xuY29uc3QgdXBkYXRlVGFiYmFibGUgPSAoZWxlbWVudHMsIGluZGV4KSA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkRWxlbWVudCA9IGVsZW1lbnRzW2luZGV4XTtcblxuICBpZihzZWxlY3RlZEVsZW1lbnQpIHtcbiAgICByZW1vdmVUYWJJbmRleEZvckFsbChlbGVtZW50cyk7XG4gICAgYWRkVGFiSW5kZXgoc2VsZWN0ZWRFbGVtZW50KTtcbiAgICBzZWxlY3RlZEVsZW1lbnQuZm9jdXMoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZXRzIHRhYmluZGV4IG9uIGFuIGVsZW1lbnQsIHJlbW92ZSBpdCBmcm9tIGFsbCBvdGhlcnNcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY3VycmVudEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gbGFzdEluZGV4XG4gKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5jb25zdCBuZXh0SW5kZXggPSAoY3VycmVudEluZGV4LCBsYXN0SW5kZXgpID0+IChjdXJyZW50SW5kZXggPT09IGxhc3RJbmRleCkgPyAwIDogKGN1cnJlbnRJbmRleCArIDEpO1xuXG4vKipcbiAqIFNldHMgdGFiaW5kZXggb24gYW4gZWxlbWVudCwgcmVtb3ZlIGl0IGZyb20gYWxsIG90aGVyc1xuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBjdXJyZW50SW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBsYXN0SW5kZXhcbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmNvbnN0IHByZXZpb3VzSW5kZXggPSAoY3VycmVudEluZGV4LCBsYXN0SW5kZXgpID0+IChjdXJyZW50SW5kZXggPT09IDApID8gbGFzdEluZGV4IDogKGN1cnJlbnRJbmRleCAtIDEpO1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcbiAgICAgKi9cbiAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGJvdW5kIGtleSBoYW5kbGVyLCB0aGF0IGNhbiBiZSByZW1vdmVkXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gYm91bmRIYW5kbGVLZXlEb3duXG4gICAgICovXG4gICAgdGhpcy5ib3VuZEhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKTtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2VsZWN0ZWRJbmRleFxuICAgICAqL1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGtleWJvYXJkIHN1cHBvcnQgdG8gYW4gZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFkZEVsZW1lbnQoZWxlbWVudCnCoHtcbiAgICB0aGlzLmVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5ib3VuZEhhbmRsZUtleURvd24pO1xuXG4gICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09PSAxKSB7IC8vIGlmIGZpcnN0XG4gICAgICBhZGRUYWJJbmRleChlbGVtZW50KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBjb250cm9scyB0byBhbiBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcmVtb3ZlRWxlbWVudChlbGVtZW50KcKge1xuICAgIHRoaXMuZWxlbWVudHMgPSB3aXRob3V0KFtlbGVtZW50XSwgdGhpcy5lbGVtZW50cyk7XG5cbiAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmJvdW5kSGFuZGxlS2V5RG93bik7XG5cbiAgICAvLyBpZiByZW1vdmVkIGVsZW1lbnQgd2FzIHNlbGVjdGVkXG4gICAgaWYoaGFzVGFiSW5kZXgoZWxlbWVudCkpIHtcbiAgICAgIHJlbW92ZVRhYkluZGV4KGVsZW1lbnQpO1xuXG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgdXBkYXRlVGFiYmFibGUodGhpcy5lbGVtZW50cywgdGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMga2V5IGRvd24sIGFuZCB1cGRhdGVzIHRoZSB0YWIgaW5kZXhcbiAgICpcbiAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBLZXlib2FyZCBldmVudFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgIGNvbnN0IGxhc3RJbmRleCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoIC0gMTtcblxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgIGNhc2UgMTM6IC8vIEVudGVyXG4gICAgICBjYXNlIDMyOiAvLyBTcGFjZVxuICAgICAgICB0aGlzLnNlbGVjdCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzU6IC8vIEVuZFxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNjogLy8gSG9tZVxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzc6IC8vIExlZnQgQXJyb3dcbiAgICAgIGNhc2UgMzg6IC8vIFVwIEFycm93XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHByZXZpb3VzSW5kZXgodGhpcy5zZWxlY3RlZEluZGV4LCBsYXN0SW5kZXgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vIFJpZ2h0IEFycm93XG4gICAgICBjYXNlIDQwOiAvLyBEb3duIEFycm93XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IG5leHRJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgsIGxhc3RJbmRleCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHVwZGF0ZVRhYmJhYmxlKHRoaXMuZWxlbWVudHMsIHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlbGVjdGVkIGluZGV4LCBhbmQgdXBkYXRlcyB0aGUgdGFiIGluZGV4XG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKi9cbiAgZm9yY2VTZWxlY3RlZEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgdXBkYXRlVGFiYmFibGUodGhpcy5lbGVtZW50cywgdGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyAnb25TZWxlY3QnIGZ1bmN0aW9uIGlmIGl0IGV4aXN0c1xuICAgKi9cbiAgc2VsZWN0KCkge1xuICAgIGlmKHRoaXMub25TZWxlY3QgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uU2VsZWN0KHRoaXMuZWxlbWVudHNbdGhpcy5zZWxlY3RlZEluZGV4XSk7XG4gICAgfVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMva2V5Ym9hcmQuanMiLCJyZXF1aXJlKCcuLi8uLi9zcmMvc3R5bGVzL21haW4uc2NzcycpO1xuXG4vLyBMb2FkIGxpYnJhcnlcbkg1UCA9IEg1UCB8fCB7fTtcbkg1UC5IdWJDbGllbnQgPSByZXF1aXJlKCcuLi9zY3JpcHRzL2h1YicpLmRlZmF1bHQ7XG5INVAuSHViQ2xpZW50LnJlbmRlckVycm9yTWVzc2FnZSA9IHJlcXVpcmUoJy4uL3NjcmlwdHMvdXRpbHMvZXJyb3JzJykuZGVmYXVsdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnRyaWVzL2Rpc3QuanMiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSwgIG5vZGVMaXN0VG9BcnJheSwgdG9nZ2xlQ2xhc3MgfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5pbXBvcnQgeyBpbml0Q29sbGFwc2libGUgfSBmcm9tICcuLi91dGlscy9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgS2V5Ym9hcmQgZnJvbSAnLi4vdXRpbHMva2V5Ym9hcmQnO1xuXG4vKipcbiAqIFVuc2VsZWN0cyBhbGwgZWxlbWVudHMgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBhcmlhLWV4cGFuZGVkIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50IHRvIGZhbHNlXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5jb25zdCB1bkV4cGFuZCA9IHNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG4vKipcbiAqIFNlbGVjdHMgYW4gZWxlbWVudCwgYW5kIHVuIHNlbGVjdHMgYWxsIG90aGVyIG1lbnUgaXRlbXNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IG1lbnVJdGVtc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG9uU2VsZWN0TWVudUl0ZW0gPSAobWVudUl0ZW1zLCBlbGVtZW50KSA9PiB7XG4gIHVuU2VsZWN0QWxsKG1lbnVJdGVtcyk7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbn07XG5cbi8qKlxuICogSW5pdGlhdGVzIGEgdGFiIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgLy8gZWxlbWVudHNcbiAgY29uc3QgbWVudUl0ZW1zID0gbm9kZUxpc3RUb0FycmF5KGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJtZW51aXRlbVwiXScpKTtcbiAgY29uc3QgdG9nZ2xlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtY29udHJvbHNdW2FyaWEtZXhwYW5kZWRdJyk7XG4gIGNvbnN0IGtleWJvYXJkID0gbmV3IEtleWJvYXJkKCk7XG5cbiAga2V5Ym9hcmQub25TZWxlY3QgPSBlbGVtZW50ID0+IHtcbiAgICBvblNlbGVjdE1lbnVJdGVtKG1lbnVJdGVtcywgZWxlbWVudCk7XG4gICAgdW5FeHBhbmQodG9nZ2xlcik7XG4gIH07XG5cbiAgLy8gbW92ZSBzZWxlY3RcbiAgbWVudUl0ZW1zLmZvckVhY2gobWVudUl0ZW0gPT4ge1xuICAgIC8vIGFkZCBtb3VzZSBjbGljayBsaXN0ZW5lclxuICAgIG1lbnVJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgbGV0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICBsZXQgZWxlbWVudEluZGV4ID0gbWVudUl0ZW1zLmluZGV4T2YoZWxlbWVudCk7XG5cbiAgICAgIG9uU2VsZWN0TWVudUl0ZW0obWVudUl0ZW1zLCBlbGVtZW50KTtcbiAgICAgIHVuRXhwYW5kKHRvZ2dsZXIpO1xuICAgICAga2V5Ym9hcmQuZm9yY2VTZWxlY3RlZEluZGV4KGVsZW1lbnRJbmRleCk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQga2V5Ym9hcmQgc3VwcG9ydFxuICAgIGtleWJvYXJkLmFkZEVsZW1lbnQobWVudUl0ZW0pO1xuICB9KTtcblxuICAvLyBpbml0IGNvbGxhcHNlIGFuZCBvcGVuXG4gIGluaXRDb2xsYXBzaWJsZShlbGVtZW50LCB0b2dnbGVDbGFzcygnY29sbGFwc2VkJykpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9uYXZiYXIuanMiLCJpbXBvcnQge2F0dHJpYnV0ZUVxdWFscywgdG9nZ2xlQXR0cmlidXRlLCB0b2dnbGVWaXNpYmlsaXR5fSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFyaWEtZXhwYW5kZWQ9dHJ1ZSBvbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGlzRXhwYW5kZWQgPSBhdHRyaWJ1dGVFcXVhbHMoXCJhcmlhLWV4cGFuZGVkXCIsICd0cnVlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyBhcmlhLWhpZGRlbiBvbiAnY29sbGFwc2libGUnIHdoZW4gYXJpYS1leHBhbmRlZCBjaGFuZ2VzIG9uICd0b2dnbGVyJyxcbiAqIGFuZCB0b2dnbGVzIGFyaWEtZXhwYW5kZWQgb24gJ3RvZ2dsZXInIG9uIGNsaWNrXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtmdW5jdGlvbn0gW3RhcmdldEhhbmRsZXJdIGZhbGxzIGJhY2sgdG8gdG9nZ2xlVmlzaWJpbGl0eSB3aXRoIGFyaWEtaGlkZGVuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0Q29sbGFwc2libGUgPSAoZWxlbWVudCwgdGFyZ2V0SGFuZGxlciA9IHRvZ2dsZVZpc2liaWxpdHkpID0+IHtcbiAgLy8gZWxlbWVudHNcbiAgY29uc3QgdG9nZ2xlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtY29udHJvbHNdW2FyaWEtZXhwYW5kZWRdJyk7XG4gIGNvbnN0IGNvbGxhcHNpYmxlSWQgPSB0b2dnbGVyLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICBjb25zdCBjb2xsYXBzaWJsZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y29sbGFwc2libGVJZH1gKTtcblxuICAvLyBzZXQgb2JzZXJ2ZXIgb24gdGl0bGUgZm9yIGFyaWEtZXhwYW5kZWRcbiAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdGFyZ2V0SGFuZGxlcihpc0V4cGFuZGVkKHRvZ2dsZXIpLCBjb2xsYXBzaWJsZSkpO1xuXG4gIG9ic2VydmVyLm9ic2VydmUodG9nZ2xlciwge1xuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbXCJhcmlhLWV4cGFuZGVkXCJdXG4gIH0pO1xuXG4gIC8vIFNldCBjbGljayBsaXN0ZW5lciB0aGF0IHRvZ2dsZXMgYXJpYS1leHBhbmRlZFxuICB0b2dnbGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlQXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCB0b2dnbGVyKSk7XG5cbiAgLy8gaW5pdGlhbGl6ZVxuICB0YXJnZXRIYW5kbGVyKGlzRXhwYW5kZWQodG9nZ2xlciksIGNvbGxhcHNpYmxlKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvY29sbGFwc2libGUuanMiXSwic291cmNlUm9vdCI6IiJ9