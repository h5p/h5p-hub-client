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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
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
exports.toggleVisibility = exports.show = exports.hide = exports.nodeListToArray = exports.classListContains = exports.removeChild = exports.querySelectorAll = exports.querySelector = exports.appendChild = exports.toggleAttribute = exports.attributeEquals = exports.hasAttribute = exports.removeAttribute = exports.setAttribute = exports.getAttribute = undefined;

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

var _aria = __webpack_require__(7);

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
function init(element) {
  (0, _aria.initCollapsible)(element);
}

/***/ }),
/* 7 */
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
 */
var initCollapsible = exports.initCollapsible = function initCollapsible(element) {
  // elements
  var toggler = element.querySelector('[aria-controls][aria-expanded]');
  var collapsibleId = toggler.getAttribute('aria-controls');
  var collapsible = element.querySelector('#' + collapsibleId);

  // set observer on title for aria-expanded
  var observer = new MutationObserver(function () {
    return (0, _elements.toggleVisibility)(isExpanded(toggler), collapsible);
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
  (0, _elements.toggleVisibility)(isExpanded(toggler), collapsible);
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjI1Ij4NCiAgPGRlZnM+DQogICAgPHN0eWxlPg0KICAgICAgLmNscy0xIHsNCiAgICAgIGZpbGw6IG5vbmU7DQogICAgICB9DQoNCiAgICAgIC5jbHMtMiB7DQogICAgICBmaWxsOiAjYzZjNmM3Ow0KICAgICAgfQ0KDQogICAgICAuY2xzLTMsIC5jbHMtNCB7DQogICAgICBmaWxsOiAjZmZmOw0KICAgICAgfQ0KDQogICAgICAuY2xzLTMgew0KICAgICAgb3BhY2l0eTogMC43Ow0KICAgICAgfQ0KICAgIDwvc3R5bGU+DQogIDwvZGVmcz4NCiAgPHRpdGxlPmNvbnRlbnQgdHlwZSBwbGFjZWhvbGRlcl8yPC90aXRsZT4NCiAgPGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+DQogICAgPGcgaWQ9ImNvbnRlbnRfdHlwZV9wbGFjZWhvbGRlci0xX2NvcHkiIGRhdGEtbmFtZT0iY29udGVudCB0eXBlIHBsYWNlaG9sZGVyLTEgY29weSI+DQogICAgICA8cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1Ii8+DQogICAgICA8cmVjdCBjbGFzcz0iY2xzLTIiIHg9IjExMi41MSIgeT0iNDMuNDEiIHdpZHRoPSIxNzYuOTYiIGhlaWdodD0iMTM1LjQ1IiByeD0iMTAiIHJ5PSIxMCIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxMzYuNjYiIGN5PSI2MS45OCIgcj0iNC44MSIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxNTEuNDkiIGN5PSI2MS45OCIgcj0iNC44MSIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxNjYuMSIgY3k9IjYxLjk4IiByPSI0LjgxIi8+DQogICAgICA8ZyBpZD0iX0dyb3VwXyIgZGF0YS1uYW1lPSImbHQ7R3JvdXAmZ3Q7Ij4NCiAgICAgICAgPGcgaWQ9Il9Hcm91cF8yIiBkYXRhLW5hbWU9IiZsdDtHcm91cCZndDsiPg0KICAgICAgICAgIDxwYXRoIGlkPSJfQ29tcG91bmRfUGF0aF8iIGRhdGEtbmFtZT0iJmx0O0NvbXBvdW5kIFBhdGgmZ3Q7IiBjbGFzcz0iY2xzLTQiIGQ9Ik0yNjMuMjgsOTUuMjFDMjYwLDkyLjA3LDI1NSw5MS41LDI0OC40Myw5MS41SDIyN3Y4SDE5OS41bC0yLjE3LDEwLjI0YTI1Ljg0LDI1Ljg0LDAsMCwxLDExLjQ4LTEuNjMsMTkuOTMsMTkuOTMsMCwwLDEsMTQuMzksNS41NywxOC4yNiwxOC4yNiwwLDAsMSw1LjUyLDEzLjYsMjMuMTEsMjMuMTEsMCwwLDEtMi44NCwxMS4wNSwxOC42NSwxOC42NSwwLDAsMS04LjA2LDcuNzksOSw5LDAsMCwxLTQuMTIsMS4zN0gyMzZ2LTIxaDEwLjQyYzcuMzYsMCwxMi44My0xLjYxLDE2LjQyLTVzNS4zOC03LjQ4LDUuMzgtMTMuNDRDMjY4LjIyLDEwMi4yOSwyNjYuNTcsOTguMzUsMjYzLjI4LDk1LjIxWm0tMTUsMTdjLTEuNDIsMS4yMi0zLjksMS4yNS03LjQxLDEuMjVIMjM2di0xNGg1LjYyYTkuNTcsOS41NywwLDAsMSw3LDIuOTMsNy4wNSw3LjA1LDAsMCwxLDEuODUsNC45MkE2LjMzLDYuMzMsMCwwLDEsMjQ4LjMxLDExMi4yNVoiLz4NCiAgICAgICAgICA8cGF0aCBpZD0iX1BhdGhfIiBkYXRhLW5hbWU9IiZsdDtQYXRoJmd0OyIgY2xhc3M9ImNscy00IiBkPSJNMjAyLjksMTE5LjExYTguMTIsOC4xMiwwLDAsMC03LjI4LDQuNTJsLTE2LTEuMjIsNy4yMi0zMC45MkgxNzR2MjJIMTUzdi0yMkgxMzZ2NTZoMTd2LTIxaDIxdjIxaDIwLjMxYy0yLjcyLDAtNS0xLjUzLTctM2ExOS4xOSwxOS4xOSwwLDAsMS00LjczLTQuODMsMjMuNTgsMjMuNTgsMCwwLDEtMy02LjZsMTYtMi4yNmE4LjExLDguMTEsMCwxLDAsNy4yNi0xMS43MloiLz4NCiAgICAgICAgPC9nPg0KICAgICAgPC9nPg0KICAgICAgPHJlY3QgY2xhc3M9ImNscy0zIiB4PSIxNzcuNjYiIHk9IjU3LjY2IiB3aWR0aD0iOTIuMjgiIGhlaWdodD0iOS4zOCIgcng9IjMuNSIgcnk9IjMuNSIvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hubView = __webpack_require__(17);

var _hubView2 = _interopRequireDefault(_hubView);

var _contentTypeSection = __webpack_require__(16);

var _contentTypeSection2 = _interopRequireDefault(_contentTypeSection);

var _uploadSection = __webpack_require__(19);

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
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
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

var _imageScroller = __webpack_require__(20);

var _imageScroller2 = _interopRequireDefault(_imageScroller);

var _events = __webpack_require__(5);

var _contentTypePlaceholder = __webpack_require__(8);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeDetailView = __webpack_require__(11);

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
/* 13 */
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

var _contentTypePlaceholder = __webpack_require__(8);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeListView = __webpack_require__(13);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = __webpack_require__(2);

var _menu = __webpack_require__(21);

var _menu2 = _interopRequireDefault(_menu);

var _eventful = __webpack_require__(0);

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
    var _this = this;

    _classCallCheck(this, ContentBrowserView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // create elements
    this.rootElement = this.createElement(state);

    // pick elements
    this.menubar = this.rootElement.querySelector('.navbar-nav');
    this.inputField = this.rootElement.querySelector('[role="search"] input');
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
    key: 'createElement',
    value: function createElement(state) {
      var menutitle = 'Browse content types';
      var menuId = 'content-type-filter';
      var searchText = 'Search for Content Types';

      // create element
      var element = document.createElement('div');
      element.innerHTML = '\n      <div class="menu-group">\n        <nav  role="menubar" class="navbar">\n          <div class="navbar-header">\n              <span class="navbar-toggler navbar-toggler-right" aria-controls="' + menuId + '" aria-expanded="false">\n               <span class="icon-accordion-arrow"></span>\n             </span>\n            <span class="navbar-brand">' + menutitle + '</span>\n          </div>\n\n          <ul id="' + menuId + '" class="navbar-nav" aria-hidden="true"></ul>\n        </nav>\n        \n        <div class="input-group" role="search">\n          <input id="hub-search-bar" class="form-control form-control-rounded" type="text" placeholder="' + searchText + '" />\n          <div class="input-group-addon icon-search"></div>\n        </div>\n      </div>';

      return element;
    }

    /**
     * Adds a menu item
     *
     * @param {string} text
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'addMenuItem',
    value: function addMenuItem(text) {
      var _this2 = this;

      var element = document.createElement('li');
      element.setAttribute('role', 'menuitem');
      element.innerHTML = text;

      element.addEventListener('click', function (event) {
        _this2.fire('menu-selected', {
          element: event.target
        });
      });

      // sets first to be selected
      if (this.menubar.childElementCount == 1) {
        element.setAttribute('aria-selected', 'true');
      }

      // add to menu bar
      this.menubar.appendChild(element);
      return element;
    }

    /**
     * Clears the input field
     */

  }, {
    key: 'clearInputField',
    value: function clearInputField() {
      this.inputField.value = '';
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
      return menuItem === this.menubar.querySelectorAll('[role="menuitem"]')[0];
    }

    /**
     * Ensures the first menu item is selected
     */

  }, {
    key: 'resetMenuSelection',
    value: function resetMenuSelection() {
      var _this3 = this;

      this.menubar.querySelectorAll('[role="menuitem"]').forEach(function (menuItem) {
        return menuItem.setAttribute('aria-selected', _this3.isFirstMenuItem(menuItem).toString());
      });
    }
  }, {
    key: 'initMenu',
    value: function initMenu() {
      var underline = document.createElement('span');
      underline.className = 'menuitem-underline';
      this.menubar.appendChild(underline);
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeSectionView = __webpack_require__(15);

var _contentTypeSectionView2 = _interopRequireDefault(_contentTypeSectionView);

var _searchService = __webpack_require__(18);

var _searchService2 = _interopRequireDefault(_searchService);

var _contentTypeList = __webpack_require__(14);

var _contentTypeList2 = _interopRequireDefault(_contentTypeList);

var _contentTypeDetail = __webpack_require__(12);

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

    this.typeAheadEnabled = true;

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
    this.view.on('search', this.resetMenuOnEnter, this);
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

      var query = _ref.query,
          keyCode = _ref.keyCode;

      if (this.typeAheadEnabled || keyCode === 13) {
        // Search automatically or on 'enter'
        this.searchService.search(query).then(function (contentTypes) {
          return _this3.contentTypeList.update(contentTypes);
        });
      }
    }

    /**
     *  Ensures the first menu element is selected
     */

  }, {
    key: "resetMenuSelection",
    value: function resetMenuSelection() {
      this.view.resetMenuSelection();
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
     */

  }, {
    key: "applySearchFilter",
    value: function applySearchFilter() {
      console.debug('ContentTypeSection: menu was clicked!', event);
    }
  }, {
    key: "clearInputField",
    value: function clearInputField(_ref3) {
      var element = _ref3.element;

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _panel = __webpack_require__(6);

var _panel2 = _interopRequireDefault(_panel);

var _tabPanel = __webpack_require__(22);

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
/* 18 */
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
/* 19 */
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
/* 20 */
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
 * @param {HTMLElement} button
 * @param {function} updateState
 * @param {Event}
 * @function
 */
var onNavigationButtonClick = (0, _functional.curry)(function (element, state, button, updateState, event) {
  if (!isDisabled(button)) {
    updateState(state);
    updateView(element, state);
  }
});

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
  nextButton.addEventListener('click', onNavigationButtonClick(element, state, nextButton, function (state) {
    return state.position--;
  }));
  prevButton.addEventListener('click', onNavigationButtonClick(element, state, prevButton, function (state) {
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

var _aria = __webpack_require__(7);

/**
 * Unselects all elements in an array
 *
 * @param {HTMLElement[]} elements
 * @function
 */
var unSelectAll = (0, _functional.forEach)((0, _elements.setAttribute)('aria-selected', 'false'));

/**
 * Sets the aria-expanded attribute on an element to false
 *
 * @param {HTMLElement} element
 */
var unExpand = (0, _elements.setAttribute)('aria-expanded', 'false');

/**
 * Initiates a tab panel
 *
 * @param {HTMLElement} element
 */
function init(element) {
  // elements
  var menuItems = element.querySelectorAll('[role="menuitem"]');
  var toggler = element.querySelector('[aria-controls][aria-expanded]');

  // move select
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener('click', function (event) {
      unSelectAll(menuItems);
      event.target.setAttribute('aria-selected', 'true');
      unExpand(toggler);
    });
  });

  // init collapse and open
  (0, _aria.initCollapsible)(element);
}

/***/ }),
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(9).default;
H5P.HubClient.renderErrorMessage = __webpack_require__(4).default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGQ0YThhMzZhNjUwZWZhMjAwNjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9hcmlhLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3M/NmE3OCIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9tZW51LmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwibmFtZXMiOlsiRXZlbnRmdWwiLCJsaXN0ZW5lcnMiLCJvbiIsInR5cGUiLCJsaXN0ZW5lciIsInNjb3BlIiwidHJpZ2dlciIsInB1c2giLCJmaXJlIiwiZXZlbnQiLCJ0cmlnZ2VycyIsImV2ZXJ5IiwiY2FsbCIsInByb3BhZ2F0ZSIsInR5cGVzIiwiZXZlbnRmdWwiLCJzZWxmIiwiZm9yRWFjaCIsImN1cnJ5IiwiZm4iLCJhcml0eSIsImxlbmd0aCIsImYxIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJhcmd1bWVudHMiLCJhcHBseSIsImYyIiwiYXJnczIiLCJjb25jYXQiLCJjb21wb3NlIiwiZm5zIiwicmVkdWNlIiwiZiIsImciLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJuYW1lIiwiZWwiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJhdHRyaWJ1dGVFcXVhbHMiLCJ0b2dnbGVBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInBhcmVudCIsImNoaWxkIiwicXVlcnlTZWxlY3RvciIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZUNoaWxkIiwib2xkQ2hpbGQiLCJjbGFzc0xpc3RDb250YWlucyIsImNscyIsImNsYXNzTGlzdCIsIm5vZGVMaXN0VG9BcnJheSIsIm5vZGVMaXN0IiwiaGlkZSIsInNob3ciLCJ0b2dnbGVWaXNpYmlsaXR5IiwidmlzaWJsZSIsImVsZW1lbnQiLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJ3aW5kb3ciLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZXMiLCJjb250ZW50VHlwZSIsImlkIiwibnMiLCJnZXRBamF4VXJsIiwiYm9keSIsImZvcm1EYXRhIiwicmVuZGVyRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNsb3NlQnV0dG9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibWVzc2FnZUNvbnRlbnQiLCJ0aXRsZSIsImNvbnRlbnQiLCJtZXNzYWdlV3JhcHBlciIsImRpc21pc3NpYmxlIiwiYnV0dG9uIiwidW5kZWZpbmVkIiwibWVzc2FnZUJ1dHRvbiIsInJlbGF5Q2xpY2tFdmVudEFzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0b3BQcm9wYWdhdGlvbiIsImluaXQiLCJpc0V4cGFuZGVkIiwiaW5pdENvbGxhcHNpYmxlIiwidG9nZ2xlciIsImNvbGxhcHNpYmxlSWQiLCJjb2xsYXBzaWJsZSIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJIdWIiLCJzdGF0ZSIsImNvbnRlbnRUeXBlU2VjdGlvbiIsInVwbG9hZFNlY3Rpb24iLCJ2aWV3Iiwic2VydmljZXMiLCJzZXRQYW5lbFRpdGxlIiwiY2xvc2VQYW5lbCIsInNldFNlY3Rpb25UeXBlIiwidG9nZ2xlUGFuZWxPcGVuIiwiYmluZCIsImluaXRUYWJQYW5lbCIsImdldENvbnRlbnRUeXBlIiwic2V0VGl0bGUiLCJzZWN0aW9uSWQiLCJ0YWJDb25maWdzIiwiZ2V0RWxlbWVudCIsImNvbmZpZyIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiYWRkQm90dG9tQm9yZGVyIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsIk1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04iLCJpc0VtcHR5IiwidGV4dCIsIkNvbnRlbnRUeXBlRGV0YWlsVmlldyIsInJvb3RFbGVtZW50IiwiY3JlYXRlVmlldyIsInVzZUJ1dHRvbiIsImluc3RhbGxCdXR0b24iLCJpbWFnZSIsIm93bmVyIiwiZGVzY3JpcHRpb24iLCJkZW1vQnV0dG9uIiwiY2Fyb3VzZWwiLCJjYXJvdXNlbExpc3QiLCJsaWNlbmNlUGFuZWwiLCJsaWdodGJveCIsImNoaWxkRWxlbWVudENvdW50IiwidXJsIiwiYWx0IiwidGh1bWJuYWlsIiwic3JjIiwiZWxsaXBzaXMiLCJ0b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkIiwiZGVzY3JpcHRpb25FeHBhbmRlZCIsImlubmVyVGV4dCIsInNpemUiLCJzdWJzdHIiLCJpbnN0YWxsZWQiLCJDb250ZW50VHlwZURldGFpbCIsImluc3RhbGwiLCJ1cGRhdGUiLCJpbnN0YWxsQ29udGVudFR5cGUiLCJjb25zb2xlIiwiZGVidWciLCJzZXRJZCIsInNldERlc2NyaXB0aW9uIiwic2V0SW1hZ2UiLCJpY29uIiwic2V0RXhhbXBsZSIsImV4YW1wbGUiLCJzZXRPd25lciIsInNldElzSW5zdGFsbGVkIiwic2V0TGljZW5jZSIsImxpY2Vuc2UiLCJyZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsIiwic2NyZWVuc2hvdHMiLCJhZGRJbWFnZVRvQ2Fyb3VzZWwiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiaGFzQ2hpbGROb2RlcyIsImxhc3RDaGlsZCIsInJvdyIsImNyZWF0ZUNvbnRlbnRUeXBlUm93IiwidXNlQnV0dG9uQ29uZmlnIiwiaW5zdGFsbEJ1dHRvbkNvbmZpZyIsInN1bW1hcnkiLCJDb250ZW50VHlwZUxpc3QiLCJyZW1vdmVBbGxSb3dzIiwiYWRkUm93IiwiQ29udGVudEJyb3dzZXJWaWV3IiwibWVudWJhciIsImlucHV0RmllbGQiLCJpbnB1dEJ1dHRvbiIsInRhcmdldCIsInF1ZXJ5Iiwia2V5Q29kZSIsIndoaWNoIiwic2VhcmNoYmFyIiwicGFyZW50RWxlbWVudCIsImZvY3VzIiwibWVudXRpdGxlIiwibWVudUlkIiwic2VhcmNoVGV4dCIsIm1lbnVJdGVtIiwiaXNGaXJzdE1lbnVJdGVtIiwidW5kZXJsaW5lIiwiQ29udGVudFR5cGVTZWN0aW9uIiwidHlwZUFoZWFkRW5hYmxlZCIsInNlYXJjaFNlcnZpY2UiLCJjb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZURldGFpbCIsImFkZE1lbnVJdGVtIiwibWVudVRleHQiLCJpbml0TWVudSIsInNlY3Rpb24iLCJhZGQiLCJzZWFyY2giLCJyZXNldE1lbnVTZWxlY3Rpb24iLCJyZXNldE1lbnVPbkVudGVyIiwiYXBwbHlTZWFyY2hGaWx0ZXIiLCJjbGVhcklucHV0RmllbGQiLCJzaG93RGV0YWlsVmlldyIsImNsb3NlRGV0YWlsVmlldyIsImluaXRDb250ZW50VHlwZUxpc3QiLCJjYXRjaCIsImVycm9yIiwibG9hZEJ5SWQiLCJBVFRSSUJVVEVfREFUQV9JRCIsImlzT3BlbiIsIkh1YlZpZXciLCJyZW5kZXJUYWJQYW5lbCIsInJlbmRlclBhbmVsIiwiZXhwYW5kZWQiLCJ0YWJDb250YWluZXJFbGVtZW50IiwicGFuZWwiLCJzZXRUaW1lb3V0IiwidGFibGlzdCIsInRhYkxpc3RXcmFwcGVyIiwidGFiSWQiLCJ0YWJQYW5lbElkIiwidGFiIiwidGFiUGFuZWwiLCJTZWFyY2hTZXJ2aWNlIiwiZmlsdGVyQnlRdWVyeSIsInNjb3JlIiwiZ2V0U2VhcmNoU2NvcmUiLCJzb3J0Iiwic29ydFNlYXJjaFJlc3VsdHMiLCJhIiwiYiIsInBvcHVsYXJpdHkiLCJxdWVyaWVzIiwic3BsaXQiLCJxdWVyeVNjb3JlcyIsImdldFNjb3JlRm9yRWFjaFF1ZXJ5IiwidHJpbSIsImhhc1N1YlN0cmluZyIsImFycmF5SGFzU3ViU3RyaW5nIiwia2V5d29yZHMiLCJuZWVkbGUiLCJoYXlzdGFjayIsInRvTG93ZXJDYXNlIiwic3ViU3RyaW5nIiwic3RyaW5nIiwiQWRkTnVtYmVyIiwiVXBsb2FkU2VjdGlvbiIsImg1cFVwbG9hZCIsInRleHRDb250ZW50IiwiZGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiZmlsZXMiLCJ1cGxvYWRDb250ZW50IiwiQVRUUklCVVRFX1NJWkUiLCJkaXNhYmxlIiwiZW5hYmxlIiwidG9nZ2xlRW5hYmxlZCIsImVuYWJsZWQiLCJoaWRkZW4iLCJpc0Rpc2FibGVkIiwidXBkYXRlVmlldyIsInByZXZCdXR0b24iLCJuZXh0QnV0dG9uIiwibGlzdCIsInRvdGFsQ291bnQiLCJzdHlsZSIsIndpZHRoIiwiZGlzcGxheUNvdW50IiwibWFyZ2luTGVmdCIsInBvc2l0aW9uIiwib25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2siLCJ1cGRhdGVTdGF0ZSIsImluaXRJbWFnZSIsInRhcmdldElkIiwiaGFuZGxlRG9tVXBkYXRlIiwicmVjb3JkIiwiYWRkZWROb2RlcyIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJ1blNlbGVjdEFsbCIsInVuRXhwYW5kIiwibWVudUl0ZW1zIiwiaGlkZUFsbCIsInRhYnMiLCJ0YWJQYW5lbHMiLCJyZXF1aXJlIiwiSDVQIiwiSHViQ2xpZW50IiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUE7OztBQUdPLElBQU1BLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxTQUFPO0FBQzdCQyxlQUFXLEVBRGtCOztBQUc3Qjs7Ozs7Ozs7OztBQVVBQyxRQUFJLFlBQVNDLElBQVQsRUFBZUMsUUFBZixFQUF5QkMsS0FBekIsRUFBZ0M7QUFDbEM7Ozs7O0FBS0EsVUFBTUMsVUFBVTtBQUNkLG9CQUFZRixRQURFO0FBRWQsaUJBQVNDO0FBRkssT0FBaEI7O0FBS0EsV0FBS0osU0FBTCxDQUFlRSxJQUFmLElBQXVCLEtBQUtGLFNBQUwsQ0FBZUUsSUFBZixLQUF3QixFQUEvQztBQUNBLFdBQUtGLFNBQUwsQ0FBZUUsSUFBZixFQUFxQkksSUFBckIsQ0FBMEJELE9BQTFCOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBNUI0Qjs7QUE4QjdCOzs7Ozs7Ozs7QUFTQUUsVUFBTSxjQUFTTCxJQUFULEVBQWVNLEtBQWYsRUFBc0I7QUFDMUIsVUFBTUMsV0FBVyxLQUFLVCxTQUFMLENBQWVFLElBQWYsS0FBd0IsRUFBekM7O0FBRUEsYUFB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RixJQUFJQyxTQUFKLENBQWNyTyxrQkFBZCxHQUFtQyxtQkFBQW1PLENBQVEsQ0FBUixFQUFtQ0csT0FBdEUsQyIsImZpbGUiOiJoNXAtaHViLWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwZDRhOGEzNmE2NTBlZmEyMDA2MyIsIi8qKlxuICogQG1peGluXG4gKi9cbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnRmdWx9XG4gICAqL1xuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNjb3BlXG4gICAgICovXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcbiAgICAgICdsaXN0ZW5lcic6IGxpc3RlbmVyLFxuICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAgICovXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUodHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsIi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgdmVyc2lvbiBvZiBhIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjdXJyeSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGNvbnN0IGFyaXR5ID0gZm4ubGVuZ3RoO1xuXG4gIHJldHVybiBmdW5jdGlvbiBmMSgpIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBpZiAoYXJncy5sZW5ndGggPj0gYXJpdHkpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZjIoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgcmV0dXJuIGYxLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KGFyZ3MyKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBDb21wb3NlIGZ1bmN0aW9ucyB0b2dldGhlciwgZXhlY3V0aW5nIGZyb20gcmlnaHQgdG8gbGVmdFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24uLi59IGZuc1xuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29tcG9zZSA9ICguLi5mbnMpID0+IGZucy5yZWR1Y2UoKGYsIGcpID0+ICguLi5hcmdzKSA9PiBmKGcoLi4uYXJncykpKTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBlbGVtZW50IGluIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZm9yRWFjaCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIGFyci5mb3JFYWNoKGZuKTtcbn0pO1xuXG4vKipcbiAqIE1hcHMgYSBmdW5jdGlvbiB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IG1hcCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIubWFwKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmaWx0ZXIgdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLmZpbHRlcihmbik7XG59KTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgc29tZSB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHNvbWUgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLnNvbWUoZm4pO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgdmFsdWVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnRhaW5zID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5pbmRleE9mKHZhbHVlKSAhPSAtMTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgc3VwcGxpZWQgdmFsdWVzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHdpdGhvdXQgPSBjdXJyeShmdW5jdGlvbiAodmFsdWVzLCBhcnIpIHtcbiAgcmV0dXJuIGZpbHRlcih2YWx1ZSA9PiAhY29udGFpbnModmFsdWUsIHZhbHVlcyksIGFycilcbn0pO1xuXG4vKipcbiAqIFRha2VzIGEgc3RyaW5nIHRoYXQgaXMgZWl0aGVyICd0cnVlJyBvciAnZmFsc2UnIGFuZCByZXR1cm5zIHRoZSBvcHBvc2l0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBib29sXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgaW52ZXJzZUJvb2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoYm9vbCkge1xuICByZXR1cm4gKGJvb2wgIT09ICd0cnVlJykudG9TdHJpbmcoKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsImltcG9ydCB7Y3VycnksIGludmVyc2VCb29sZWFuU3RyaW5nfSBmcm9tICcuL2Z1bmN0aW9uYWwnXG5cbi8qKlxuICogR2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmcm9tIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBTZXQgYW4gYXR0cmlidXRlIG9uIGEgaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHNldEF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCB2YWx1ZSwgZWwpID0+IGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkpO1xuXG4vKipcbiAqIFJlbW92ZSBhdHRyaWJ1dGUgZnJvbSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBoYXNBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IGVsLmhhc0F0dHJpYnV0ZShuYW1lKSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlIHRoYXQgZXF1YWxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVFcXVhbHMgPSBjdXJyeSgobmFtZSwgdmFsdWUsIGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IHZhbHVlKTtcblxuLyoqXG4gKiBUb2dnbGVzIGFuIGF0dHJpYnV0ZSBiZXR3ZWVuICd0cnVlJyBhbmQgJ2ZhbHNlJztcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IGdldEF0dHJpYnV0ZShuYW1lLCBlbCk7XG4gIHNldEF0dHJpYnV0ZShuYW1lLCBpbnZlcnNlQm9vbGVhblN0cmluZyh2YWx1ZSksIGVsKTtcbn0pO1xuXG4vKipcbiAqIFRoZSBhcHBlbmRDaGlsZCgpIG1ldGhvZCBhZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0IG9mIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWVkIHBhcmVudCBub2RlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgYXBwZW5kQ2hpbGQgPSBjdXJyeSgocGFyZW50LCBjaGlsZCkgPT4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIGEgZGVzY2VuZGFudCBvZiB0aGUgZWxlbWVudCBvbiB3aGljaCBpdCBpcyBpbnZva2VkXG4gKiB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yID0gY3VycnkoKHNlbGVjdG9yLCBlbCkgPT4gZWwucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpO1xuXG4vKipcbiAqIFJldHVybnMgYSBub24tbGl2ZSBOb2RlTGlzdCBvZiBhbGwgZWxlbWVudHMgZGVzY2VuZGVkIGZyb20gdGhlIGVsZW1lbnQgb24gd2hpY2ggaXRcbiAqIGlzIGludm9rZWQgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2YgQ1NTIHNlbGVjdG9ycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtOb2RlTGlzdH1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3JBbGwgPSBjdXJyeSgoc2VsZWN0b3IsIGVsKSA9PiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG5cbi8qKlxuICogVGhlIHJlbW92ZUNoaWxkKCkgbWV0aG9kIHJlbW92ZXMgYSBjaGlsZCBub2RlIGZyb20gdGhlIERPTS4gUmV0dXJucyByZW1vdmVkIG5vZGUuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBwYXJlbnRcbiAqIEBwYXJhbSB7Tm9kZX0gb2xkQ2hpbGRcbiAqXG4gKiBAcmV0dXJuIHtOb2RlfVxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2hpbGQgPSBjdXJyeSgocGFyZW50LCBvbGRDaGlsZCkgPT4gcGFyZW50LnJlbW92ZUNoaWxkKG9sZENoaWxkKSk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgbm9kZSBoYXMgYSBjbGFzc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbHNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBjbGFzc0xpc3RDb250YWlucyA9IGN1cnJ5KChjbHMsIGVsKSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xzKSk7XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIE5vZGVMaXN0IHRvIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtOb2RlTGlzdH0gbm9kZUxpc3RcbiAqXG4gKiBAcmV0dXJuIHtOb2RlW119XG4gKi9cbmV4cG9ydCBjb25zdCBub2RlTGlzdFRvQXJyYXkgPSBub2RlTGlzdCA9PiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChub2RlTGlzdCk7XG5cbi8qKlxuICogQWRkcyBhcmlhLWhpZGRlbj10cnVlIHRvIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBBZGRzIGFyaWEtaGlkZGVuPWZhbHNlIHRvIGFuIGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBUb2dnbGVzIGFyaWEtaGlkZGVuIG9uIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSBjdXJyeSgodmlzaWJsZSwgZWxlbWVudCkgPT4gKHZpc2libGUgPyBzaG93IDogaGlkZSkoZWxlbWVudCkpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwiLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBDb250ZW50VHlwZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFqb3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWlub3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGF0Y2hWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWFqb3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWlub3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3VtbWFyeVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNyZWF0ZWRBdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHVwZGF0ZWRfQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpc1JlY29tbWVuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9wdWxhcml0eVxuICogQHByb3BlcnR5IHtvYmplY3RbXX0gc2NyZWVuc2hvdHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsaWNlbnNlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXhhbXBsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHR1dG9yaWFsXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBrZXl3b3Jkc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG93bmVyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGluc3RhbGxlZFxuICogQHByb3BlcnR5IHtib29sZWFufSByZXN0cmljdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlNlcnZpY2VzIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcGlSb290VXJsXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7IGFwaVJvb3RVcmwgfSkge1xuICAgIHRoaXMuYXBpUm9vdFVybCA9IGFwaVJvb3RVcmw7XG5cbiAgICBpZighd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyl7XG4gICAgICAvLyBUT0RPIHJlbW92ZSB0aGlzIHdoZW4gZG9uZSB0ZXN0aW5nIGZvciBlcnJvcnNcbiAgICAgIC8vIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMgPSBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9ZXJyb3JzL05PX1JFU1BPTlNFLmpzb25gLCB7XG5cbiAgICAgIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMgPSBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9Y29udGVudC10eXBlLWNhY2hlYCwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgICAudGhlbih0aGlzLmlzVmFsaWQpXG4gICAgICAudGhlbihqc29uID0+IGpzb24ubGlicmFyaWVzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtICB7Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2V9IHJlc3BvbnNlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2U+fVxuICAgKi9cbiAgaXNWYWxpZChyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZS5tZXNzYWdlQ29kZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZVtdPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlcygpIHtcbiAgICByZXR1cm4gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgQ29udGVudCBUeXBlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBjb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xuICAgIHJldHVybiB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzLnRoZW4oY29udGVudFR5cGVzID0+IHtcbiAgICAgIHJldHVybiBjb250ZW50VHlwZXMuZmlsdGVyKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lID09PSBtYWNoaW5lTmFtZSlbMF07XG4gICAgfSk7XG5cbiAgICAvKnJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9Y29udGVudF90eXBlX2NhY2hlLyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTsqL1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbGxzIGEgY29udGVudCB0eXBlIG9uIHRoZSBzZXJ2ZXJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGluc3RhbGxDb250ZW50VHlwZShpZCkge1xuICAgIHJldHVybiBmZXRjaChucy5nZXRBamF4VXJsKCdsaWJyYXJ5LWluc3RhbGwnLCB7aWQ6IGlkfSksIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6ICcnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkcyBhIGNvbnRlbnQgdHlwZSB0byB0aGUgc2VydmVyIGZvciB2YWxpZGF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7Rm9ybURhdGF9IGZvcm1EYXRhIEZvcm0gY29udGFpbmluZyB0aGUgaDVwIHRoYXQgc2hvdWxkIGJlIHVwbG9hZGVkIGFzICdoNXAnXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBqc29uIGNvbnRhaW5pbmcgdGhlIGNvbnRlbnQganNvbiBhbmQgdGhlIGg1cCBqc29uXG4gICAqL1xuICB1cGxvYWRDb250ZW50KGZvcm1EYXRhKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1saWJyYXJ5LXVwbG9hZGAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6IGZvcm1EYXRhXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi1zZXJ2aWNlcy5qcyIsIi8qKlxuICogQHBhcmFtICB7c3RyaW5nfSAgIGNvbmZpZy50eXBlICAgICAgICAgdHlwZSBvZiB0aGUgbWVzc2FnZTogaW5mbywgc3VjY2VzcywgZXJyb3JcbiAqIEBwYXJhbSAge2Jvb2xlYW59ICBjb25maWcuZGlzbWlzc2libGUgIHdoZXRoZXIgdGhlIG1lc3NhZ2UgY2FuIGJlIGRpc21pc3NlZFxuICogQHBhcmFtICB7c3RyaW5nfSAgIGNvbmZpZy5jb250ZW50ICAgICAgbWVzc2FnZSBjb250ZW50IHVzdWFsbHkgYSAnaDMnIGFuZCBhICdwJ1xuICogQHJldHVybiB7SFRNTEVsZW1lbnR9IGRpdiBjb250YWluaW5nIHRoZSBtZXNzYWdlIGVsZW1lbnRcbiAqL1xuXG4vL1RPRE8gaGFuZGxlIHN0cmluZ3MsIGh0bWwsIGJhZGx5IGZvcm1lZCBvYmplY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlckVycm9yTWVzc2FnZShtZXNzYWdlKSB7XG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XG4gIGNsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmI3gyNzE1JztcblxuICBjb25zdCBtZXNzYWdlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtZXNzYWdlQ29udGVudC5jbGFzc05hbWUgPSAnbWVzc2FnZS1jb250ZW50JztcbiAgbWVzc2FnZUNvbnRlbnQuaW5uZXJIVE1MID0gJzxoMT4nICsgbWVzc2FnZS50aXRsZSArICc8L2gxPicgKyAnPHA+JyArIG1lc3NhZ2UuY29udGVudCArICc8L3A+JztcblxuICBjb25zdCBtZXNzYWdlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtZXNzYWdlV3JhcHBlci5jbGFzc05hbWUgPSAnbWVzc2FnZScgKyAnICcgKyBgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUNvbnRlbnQpO1xuXG4gIGlmIChtZXNzYWdlLmJ1dHRvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbWVzc2FnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG1lc3NhZ2VCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbic7XG4gICAgbWVzc2FnZUJ1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlLmJ1dHRvbjtcbiAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQnV0dG9uKTtcbiAgfVxuXG4gIHJldHVybiBtZXNzYWdlV3JhcHBlcjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5cbi8qKlxuICogIFRyYW5zZm9ybXMgYSBET00gY2xpY2sgZXZlbnQgaW50byBhbiBFdmVudGZ1bCdzIGV2ZW50XG4gKiAgQHNlZSBFdmVudGZ1bFxuICpcbiAqIEBwYXJhbSAge3N0cmluZyB8IE9iamVjdH0gdHlwZVxuICogQHBhcmFtICB7RXZlbnRmdWx9IGV2ZW50ZnVsXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCByZWxheUNsaWNrRXZlbnRBcyA9IGN1cnJ5KGZ1bmN0aW9uKHR5cGUsIGV2ZW50ZnVsLCBlbGVtZW50KSB7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgZXZlbnRmdWwuZmlyZSh0eXBlLCB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgaWQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJylcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBkb24ndCBidWJibGVcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsImltcG9ydCB7aW5pdENvbGxhcHNpYmxlfSBmcm9tICcuLi91dGlscy9hcmlhJztcblxuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIGluaXRDb2xsYXBzaWJsZShlbGVtZW50KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwiaW1wb3J0IHthdHRyaWJ1dGVFcXVhbHMsIHRvZ2dsZUF0dHJpYnV0ZSwgdG9nZ2xlVmlzaWJpbGl0eX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhcmlhLWV4cGFuZGVkPXRydWUgb24gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc0V4cGFuZGVkID0gYXR0cmlidXRlRXF1YWxzKFwiYXJpYS1leHBhbmRlZFwiLCAndHJ1ZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYXJpYS1oaWRkZW4gb24gJ2NvbGxhcHNpYmxlJyB3aGVuIGFyaWEtZXhwYW5kZWQgY2hhbmdlcyBvbiAndG9nZ2xlcicsXG4gKiBhbmQgdG9nZ2xlcyBhcmlhLWV4cGFuZGVkIG9uICd0b2dnbGVyJyBvbiBjbGlja1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRDb2xsYXBzaWJsZSA9IChlbGVtZW50KSA9PiB7XG4gIC8vIGVsZW1lbnRzXG4gIGNvbnN0IHRvZ2dsZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScpO1xuICBjb25zdCBjb2xsYXBzaWJsZUlkID0gdG9nZ2xlci5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgY29uc3QgY29sbGFwc2libGUgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2NvbGxhcHNpYmxlSWR9YCk7XG5cbiAgLy8gc2V0IG9ic2VydmVyIG9uIHRpdGxlIGZvciBhcmlhLWV4cGFuZGVkXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHRvZ2dsZVZpc2liaWxpdHkoaXNFeHBhbmRlZCh0b2dnbGVyKSwgY29sbGFwc2libGUpKTtcblxuICBvYnNlcnZlci5vYnNlcnZlKHRvZ2dsZXIsIHtcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW1wiYXJpYS1leHBhbmRlZFwiXVxuICB9KTtcblxuICAvLyBTZXQgY2xpY2sgbGlzdGVuZXIgdGhhdCB0b2dnbGVzIGFyaWEtZXhwYW5kZWRcbiAgdG9nZ2xlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRvZ2dsZUF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgdG9nZ2xlcikpO1xuXG4gIC8vIGluaXRpYWxpemVcbiAgdG9nZ2xlVmlzaWJpbGl0eShpc0V4cGFuZGVkKHRvZ2dsZXIpLCBjb2xsYXBzaWJsZSk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2FyaWEuanMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ01DQTBNREFnTWpJMUlqNE5DaUFnUEdSbFpuTStEUW9nSUNBZ1BITjBlV3hsUGcwS0lDQWdJQ0FnTG1Oc2N5MHhJSHNOQ2lBZ0lDQWdJR1pwYkd3NklHNXZibVU3RFFvZ0lDQWdJQ0I5RFFvTkNpQWdJQ0FnSUM1amJITXRNaUI3RFFvZ0lDQWdJQ0JtYVd4c09pQWpZelpqTm1NM093MEtJQ0FnSUNBZ2ZRMEtEUW9nSUNBZ0lDQXVZMnh6TFRNc0lDNWpiSE10TkNCN0RRb2dJQ0FnSUNCbWFXeHNPaUFqWm1abU93MEtJQ0FnSUNBZ2ZRMEtEUW9nSUNBZ0lDQXVZMnh6TFRNZ2V3MEtJQ0FnSUNBZ2IzQmhZMmwwZVRvZ01DNDNPdzBLSUNBZ0lDQWdmUTBLSUNBZ0lEd3ZjM1I1YkdVK0RRb2dJRHd2WkdWbWN6NE5DaUFnUEhScGRHeGxQbU52Ym5SbGJuUWdkSGx3WlNCd2JHRmpaV2h2YkdSbGNsOHlQQzkwYVhSc1pUNE5DaUFnUEdjZ2FXUTlJa3hoZVdWeVh6SWlJR1JoZEdFdGJtRnRaVDBpVEdGNVpYSWdNaUkrRFFvZ0lDQWdQR2NnYVdROUltTnZiblJsYm5SZmRIbHdaVjl3YkdGalpXaHZiR1JsY2kweFgyTnZjSGtpSUdSaGRHRXRibUZ0WlQwaVkyOXVkR1Z1ZENCMGVYQmxJSEJzWVdObGFHOXNaR1Z5TFRFZ1kyOXdlU0krRFFvZ0lDQWdJQ0E4Y21WamRDQmpiR0Z6Y3owaVkyeHpMVEVpSUhkcFpIUm9QU0kwTURBaUlHaGxhV2RvZEQwaU1qSTFJaTgrRFFvZ0lDQWdJQ0E4Y21WamRDQmpiR0Z6Y3owaVkyeHpMVElpSUhnOUlqRXhNaTQxTVNJZ2VUMGlORE11TkRFaUlIZHBaSFJvUFNJeE56WXVPVFlpSUdobGFXZG9kRDBpTVRNMUxqUTFJaUJ5ZUQwaU1UQWlJSEo1UFNJeE1DSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhNell1TmpZaUlHTjVQU0kyTVM0NU9DSWdjajBpTkM0NE1TSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhOVEV1TkRraUlHTjVQU0kyTVM0NU9DSWdjajBpTkM0NE1TSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhOall1TVNJZ1kzazlJall4TGprNElpQnlQU0kwTGpneElpOCtEUW9nSUNBZ0lDQThaeUJwWkQwaVgwZHliM1Z3WHlJZ1pHRjBZUzF1WVcxbFBTSW1iSFE3UjNKdmRYQW1aM1E3SWo0TkNpQWdJQ0FnSUNBZ1BHY2dhV1E5SWw5SGNtOTFjRjh5SWlCa1lYUmhMVzVoYldVOUlpWnNkRHRIY205MWNDWm5kRHNpUGcwS0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdsa1BTSmZRMjl0Y0c5MWJtUmZVR0YwYUY4aUlHUmhkR0V0Ym1GdFpUMGlKbXgwTzBOdmJYQnZkVzVrSUZCaGRHZ21aM1E3SWlCamJHRnpjejBpWTJ4ekxUUWlJR1E5SWsweU5qTXVNamdzT1RVdU1qRkRNall3TERreUxqQTNMREkxTlN3NU1TNDFMREkwT0M0ME15dzVNUzQxU0RJeU4zWTRTREU1T1M0MWJDMHlMakUzTERFd0xqSTBZVEkxTGpnMExESTFMamcwTERBc01Dd3hMREV4TGpRNExURXVOak1zTVRrdU9UTXNNVGt1T1RNc01Dd3dMREVzTVRRdU16a3NOUzQxTnl3eE9DNHlOaXd4T0M0eU5pd3dMREFzTVN3MUxqVXlMREV6TGpZc01qTXVNVEVzTWpNdU1URXNNQ3d3TERFdE1pNDROQ3d4TVM0d05Td3hPQzQyTlN3eE9DNDJOU3d3TERBc01TMDRMakEyTERjdU56a3NPU3c1TERBc01Dd3hMVFF1TVRJc01TNHpOMGd5TXpaMkxUSXhhREV3TGpReVl6Y3VNellzTUN3eE1pNDRNeTB4TGpZeExERTJMalF5TFRWek5TNHpPQzAzTGpRNExEVXVNemd0TVRNdU5EUkRNalk0TGpJeUxERXdNaTR5T1N3eU5qWXVOVGNzT1RndU16VXNNall6TGpJNExEazFMakl4V20wdE1UVXNNVGRqTFRFdU5ESXNNUzR5TWkwekxqa3NNUzR5TlMwM0xqUXhMREV1TWpWSU1qTTJkaTB4TkdnMUxqWXlZVGt1TlRjc09TNDFOeXd3TERBc01TdzNMREl1T1RNc055NHdOU3czTGpBMUxEQXNNQ3d4TERFdU9EVXNOQzQ1TWtFMkxqTXpMRFl1TXpNc01Dd3dMREVzTWpRNExqTXhMREV4TWk0eU5Wb2lMejROQ2lBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JwWkQwaVgxQmhkR2hmSWlCa1lYUmhMVzVoYldVOUlpWnNkRHRRWVhSb0ptZDBPeUlnWTJ4aGMzTTlJbU5zY3kwMElpQmtQU0pOTWpBeUxqa3NNVEU1TGpFeFlUZ3VNVElzT0M0eE1pd3dMREFzTUMwM0xqSTRMRFF1TlRKc0xURTJMVEV1TWpJc055NHlNaTB6TUM0NU1rZ3hOelIyTWpKSU1UVXpkaTB5TWtneE16WjJOVFpvTVRkMkxUSXhhREl4ZGpJeGFESXdMak14WXkweUxqY3lMREF0TlMweExqVXpMVGN0TTJFeE9TNHhPU3d4T1M0eE9Td3dMREFzTVMwMExqY3pMVFF1T0RNc01qTXVOVGdzTWpNdU5UZ3NNQ3d3TERFdE15MDJMalpzTVRZdE1pNHlObUU0TGpFeExEZ3VNVEVzTUN3eExEQXNOeTR5TmkweE1TNDNNbG9pTHo0TkNpQWdJQ0FnSUNBZ1BDOW5QZzBLSUNBZ0lDQWdQQzluUGcwS0lDQWdJQ0FnUEhKbFkzUWdZMnhoYzNNOUltTnNjeTB6SWlCNFBTSXhOemN1TmpZaUlIazlJalUzTGpZMklpQjNhV1IwYUQwaU9USXVNamdpSUdobGFXZG9kRDBpT1M0ek9DSWdjbmc5SWpNdU5TSWdjbms5SWpNdU5TSXZQZzBLSUNBZ0lEd3ZaejROQ2lBZ1BDOW5QZzBLUEM5emRtYytEUW89XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Z1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgSHViVmlldyBmcm9tICcuL2h1Yi12aWV3JztcbmltcG9ydCBDb250ZW50VHlwZVNlY3Rpb24gZnJvbSAnLi9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbic7XG5pbXBvcnQgVXBsb2FkU2VjdGlvbiBmcm9tICcuL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uJztcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tICcuL2h1Yi1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7cmVuZGVyRXJyb3JNZXNzYWdlfSBmcm9tICcuL3V0aWxzL2Vycm9ycyc7XG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEh1YlN0YXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGl0bGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZXhwYW5kZWRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhcGlSb290VXJsXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gRXJyb3JNZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVycm9yQ29kZVxuICovXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFNlbGVjdGVkRWxlbWVudFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlkXG4gKi9cbi8qKlxuICogU2VsZWN0IGV2ZW50XG4gKiBAZXZlbnQgSHViI3NlbGVjdFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBFcnJvciBldmVudFxuICogQGV2ZW50IEh1YiNlcnJvclxuICogQHR5cGUge0Vycm9yTWVzc2FnZX1cbiAqL1xuLyoqXG4gKiBVcGxvYWQgZXZlbnRcbiAqIEBldmVudCBIdWIjdXBsb2FkXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIEh1YiNlcnJvclxuICogQGZpcmVzIEh1YiN1cGxvYWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY29udHJvbGxlcnNcbiAgICB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbiA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb24oc3RhdGUpO1xuICAgIHRoaXMudXBsb2FkU2VjdGlvbiA9IG5ldyBVcGxvYWRTZWN0aW9uKHN0YXRlKTtcblxuICAgIC8vIHZpZXdzXG4gICAgdGhpcy52aWV3ID0gbmV3IEh1YlZpZXcoc3RhdGUpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIHByb3BhZ2F0ZSBjb250cm9sbGVyIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ2Vycm9yJ10sIHRoaXMuY29udGVudFR5cGVTZWN0aW9uKTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3VwbG9hZCddLCB0aGlzLnVwbG9hZFNlY3Rpb24pO1xuXG4gICAgLy8gaGFuZGxlIGV2ZW50c1xuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMuc2V0UGFuZWxUaXRsZSwgdGhpcyk7XG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy52aWV3LmNsb3NlUGFuZWwsIHRoaXMudmlldyk7XG4gICAgdGhpcy52aWV3Lm9uKCd0YWItY2hhbmdlJywgdGhpcy52aWV3LnNldFNlY3Rpb25UeXBlLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMudmlldy5vbigncGFuZWwtY2hhbmdlJywgdGhpcy52aWV3LnRvZ2dsZVBhbmVsT3Blbi5iaW5kKHRoaXMudmlldyksIHRoaXMudmlldyk7XG5cbiAgICB0aGlzLmluaXRUYWJQYW5lbChzdGF0ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwcm9taXNlIG9mIGEgY29udGVudCB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBnZXRDb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZSBvZiB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRQYW5lbFRpdGxlKHtpZH0pwqB7XG4gICAgdGhpcy5nZXRDb250ZW50VHlwZShpZCkudGhlbigoe3RpdGxlfSkgPT4gdGhpcy52aWV3LnNldFRpdGxlKHRpdGxlKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSB0YWIgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxuICAgKi9cbiAgaW5pdFRhYlBhbmVsKHsgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnIH0pIHtcbiAgICBjb25zdCB0YWJDb25maWdzID0gW3tcbiAgICAgIHRpdGxlOiAnQ3JlYXRlIENvbnRlbnQnLFxuICAgICAgaWQ6ICdjb250ZW50LXR5cGVzJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMuY29udGVudFR5cGVTZWN0aW9uLmdldEVsZW1lbnQoKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnVXBsb2FkJyxcbiAgICAgIGlkOiAndXBsb2FkJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMudXBsb2FkU2VjdGlvbi5nZXRFbGVtZW50KClcbiAgICB9XTtcblxuICAgIC8vIHNldHMgdGhlIGNvcnJlY3Qgb25lIHNlbGVjdGVkXG4gICAgdGFiQ29uZmlnc1xuICAgICAgLmZpbHRlcihjb25maWcgPT4gY29uZmlnLmlkID09PSBzZWN0aW9uSWQpXG4gICAgICAuZm9yRWFjaChjb25maWcgPT4gY29uZmlnLnNlbGVjdGVkID0gdHJ1ZSk7XG5cbiAgICB0YWJDb25maWdzLmZvckVhY2godGFiQ29uZmlnID0+IHRoaXMudmlldy5hZGRUYWIodGFiQ29uZmlnKSk7XG4gICAgdGhpcy52aWV3LmFkZEJvdHRvbUJvcmRlcigpOyAvLyBBZGRzIGFuIGFuaW1hdGVkIGJvdHRvbSBib3JkZXIgdG8gZWFjaCB0YWJcbiAgICB0aGlzLnZpZXcuaW5pdFRhYlBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IGluIHRoZSB2aWV3XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZXMvbWFpbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSwgcmVtb3ZlQ2hpbGQgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIjtcbmltcG9ydCBpbml0SW1hZ2VTY3JvbGxlciBmcm9tIFwiY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlclwiO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IG5vSWNvbiBmcm9tICcuLi8uLi9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Zyc7XG5cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQgPSAnZGF0YS1pZCc7XG5cbi8qKlxuICogQGNvbnN0YW50IHtudW1iZXJ9XG4gKi9cbmNvbnN0IE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04gPSAzMDA7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IGlmIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGVcbiAqL1xuY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IChlbGVtZW50LCB2aXNpYmxlKSA9PiAodmlzaWJsZSA/IHNob3cgOiBoaWRlKShlbGVtZW50KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdHJpbmcgaXMgZW1wdHlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRW1wdHkgPSAodGV4dCkgPT4gKHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJykgJiYgKHRleHQubGVuZ3RoID09PSAwKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIHZpZXdcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVWaWV3KCk7XG5cbiAgICAvLyBncmFiIHJlZmVyZW5jZXNcbiAgICB0aGlzLnVzZUJ1dHRvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi11c2UnKTtcbiAgICB0aGlzLmluc3RhbGxCdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24taW5zdGFsbCcpO1xuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LXR5cGUtaW1hZ2UnKTtcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kZXRhaWxzIGgzJyk7XG4gICAgdGhpcy5vd25lciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bmVyJyk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZGV0YWlscyAuc21hbGwnKTtcbiAgICB0aGlzLmRlbW9CdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZW1vLWJ1dHRvbicpO1xuICAgIHRoaXMuY2Fyb3VzZWwgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbCcpO1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0ID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICAgIHRoaXMubGljZW5jZVBhbmVsID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubGljZW5jZS1wYW5lbCcpO1xuXG4gICAgLy8gaW5pdCBpbnRlcmFjdGl2ZSBlbGVtZW50c1xuICAgIGluaXRQYW5lbCh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgaW5pdEltYWdlU2Nyb2xsZXIodGhpcy5jYXJvdXNlbCk7XG5cbiAgICAvLyBmaXJlIGV2ZW50cyBvbiBidXR0b24gY2xpY2tcbiAgICByZWxheUNsaWNrRXZlbnRBcygnY2xvc2UnLCB0aGlzLCB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrLWJ1dHRvbicpKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0JywgdGhpcywgdGhpcy51c2VCdXR0b24pO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdpbnN0YWxsJywgdGhpcywgdGhpcy5pbnN0YWxsQnV0dG9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSB2aWV3IGFzIGEgSFRNTEVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVWaWV3ICgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWRldGFpbCc7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJiYWNrLWJ1dHRvbiBpY29uLWFycm93LXRoaWNrXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS13cmFwcGVyXCI+PGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlIGNvbnRlbnQtdHlwZS1pbWFnZVwiIHNyYz1cIiR7bm9JY29ufVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1kZXRhaWxzXCI+XG4gICAgICAgICAgPGgzPjwvaDM+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bmVyXCI+PC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3M9XCJzbWFsbFwiPjwvcD5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbiBkZW1vLWJ1dHRvblwiIHRhcmdldD1cIl9ibGFua1wiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBocmVmPVwiaHR0cHM6Ly9oNXAub3JnL2NoYXJ0XCI+Q29udGVudCBEZW1vPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhcm91c2VsXCIgcm9sZT1cInJlZ2lvblwiIGRhdGEtc2l6ZT1cIjVcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1idXR0b24gcHJldmlvdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkaXNhYmxlZD48c3BhbiBjbGFzcz1cImljb24tYXJyb3ctdGhpY2tcIj48L3NwYW4+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWJ1dHRvbiBuZXh0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGlzYWJsZWQ+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgPG5hdiBjbGFzcz1cInNjcm9sbGVyXCI+XG4gICAgICAgICAgPHVsPjwvdWw+XG4gICAgICAgIDwvbmF2PlxuICAgICAgPC9kaXY+XG4gICAgICA8aHIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tYmFyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1wcmltYXJ5IGJ1dHRvbi11c2VcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgZGF0YS1pZD1cIkg1UC5DaGFydFwiPlVzZTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLWludmVyc2UtcHJpbWFyeSBidXR0b24taW5zdGFsbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRhdGEtaWQ9XCJINVAuQ2hhcnRcIj48c3BhbiBjbGFzcz1cImljb24tYXJyb3ctdGhpY2tcIj48L3NwYW4+SW5zdGFsbDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWdyb3VwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBsaWNlbmNlLXBhbmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRlclwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGFyaWEtY29udHJvbHM9XCJsaWNlbmNlLXBhbmVsXCI+PHNwYW4gY2xhc3M9XCJpY29uLWFjY29yZGlvbi1hcnJvd1wiPjwvc3Bhbj4gVGhlIExpY2VuY2UgSW5mbzwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCIgaWQ9XCJsaWNlbmNlLXBhbmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keS1pbm5lclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBpbWFnZXMgZnJvbSB0aGUgY2Fyb3VzZWxcbiAgICovXG4gIHJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwoKSB7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWxMaXN0KSk7XG4gICAgdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWwtbGlnaHRib3gnKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaW1hZ2UgdG8gdGhlIGNhcm91c2VsXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbWFnZVxuICAgKi9cbiAgYWRkSW1hZ2VUb0Nhcm91c2VsKGltYWdlKSB7XG4gICAgLy8gYWRkIGxpZ2h0Ym94XG4gICAgY29uc3QgbGlnaHRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsaWdodGJveC5pZCA9IGBsaWdodGJveC0ke3RoaXMuY2Fyb3VzZWxMaXN0LmNoaWxkRWxlbWVudENvdW50fWA7XG4gICAgbGlnaHRib3guY2xhc3NOYW1lID0gJ2Nhcm91c2VsLWxpZ2h0Ym94JztcbiAgICBsaWdodGJveC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBsaWdodGJveC5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZS51cmx9XCIgYWx0PVwiJHtpbWFnZS5hbHR9XCI+YDtcbiAgICB0aGlzLmNhcm91c2VsLmFwcGVuZENoaWxkKGxpZ2h0Ym94KTtcblxuICAgIC8vIGFkZCB0aHVtYm5haWxcbiAgICBjb25zdCB0aHVtYm5haWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRodW1ibmFpbC5jbGFzc05hbWUgPSAnc2xpZGUnO1xuICAgIHRodW1ibmFpbC5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ltYWdlLnVybH1cIiBhbHQ9XCIke2ltYWdlLmFsdH1cIiBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgYXJpYS1jb250cm9scz1cIiR7bGlnaHRib3guaWR9XCIgLz5gO1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0LmFwcGVuZENoaWxkKHRodW1ibmFpbCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgaW1hZ2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICAgKi9cbiAgc2V0SW1hZ2Uoc3JjKSB7XG4gICAgdGhpcy5pbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyB8fCBub0ljb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0SWQoaWQpIHtcbiAgICB0aGlzLmluc3RhbGxCdXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGlkKTtcbiAgICB0aGlzLnVzZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKi9cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IGAke3RpdGxlfWA7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbG9uZyBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgc2V0RGVzY3JpcHRpb24odGV4dCkge1xuICAgIGlmKHRleHQubGVuZ3RoID4gTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTikge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0aGlzLmVsbGlwc2lzKE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04sIHRleHQpfSA8c3BhbiBjbGFzcz1cInJlYWQtbW9yZSBsaW5rXCI+UmVhZCBtb3JlPC9zcGFuPmA7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKCcucmVhZC1tb3JlLCAucmVhZC1sZXNzJylcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkKHRleHQpKTtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBSZWFkIGxlc3MgYW5kIFJlYWQgbW9yZSB0ZXh0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICB0b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkKHRleHQpIHtcbiAgICAvLyBmbGlwIGJvb2xlYW5cbiAgICB0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQgPSAhdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkO1xuXG4gICAgaWYodGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkKSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RleHR9IDxzcGFuIGNsYXNzPVwicmVhZC1sZXNzIGxpbmtcIj5SZWFkIGxlc3M8L3NwYW4+YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9IDxzcGFuIGNsYXNzPVwicmVhZC1tb3JlIGxpbmtcIj5SZWFkIG1vcmU8L3NwYW4+YDtcbiAgICB9XG5cbiAgICB0aGlzLmRlc2NyaXB0aW9uXG4gICAgICAucXVlcnlTZWxlY3RvcignLnJlYWQtbW9yZSwgLnJlYWQtbGVzcycpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZURlc2NyaXB0aW9uRXhwYW5kZWQodGV4dCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3J0ZW5zIGEgc3RyaW5nLCBhbmQgcHV0cyBhbiBlbGlwc2lzIGF0IHRoZSBlbmRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNpemVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovXG4gIGVsbGlwc2lzKHNpemUsIHRleHQpIHtcbiAgICByZXR1cm4gYCR7dGV4dC5zdWJzdHIoMCwgc2l6ZSl9Li4uYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsaWNlbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqL1xuICBzZXRMaWNlbmNlKHR5cGUpIHtcbiAgICBpZih0eXBlKXtcbiAgICAgIHRoaXMubGljZW5jZVBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5wYW5lbC1ib2R5LWlubmVyJykuaW5uZXJUZXh0ID0gdHlwZTtcbiAgICAgIHNob3codGhpcy5saWNlbmNlUGFuZWwpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGhpZGUodGhpcy5saWNlbmNlUGFuZWwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvd25lclxuICAgKi9cbiAgc2V0T3duZXIob3duZXIpIHtcbiAgICBpZihvd25lcikge1xuICAgICAgdGhpcy5vd25lci5pbm5lckhUTUwgPSBgQnkgJHtvd25lcn1gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMub3duZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGV4YW1wbGUgdXJsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICovXG4gIHNldEV4YW1wbGUodXJsKSB7XG4gICAgdGhpcy5kZW1vQnV0dG9uLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCB8fCAnIycpO1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy5kZW1vQnV0dG9uLCAhaXNFbXB0eSh1cmwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGlmIHRoZSBjb250ZW50IHR5cGUgaXMgaW5zdGFsbGVkXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5zdGFsbGVkXG4gICAqL1xuICBzZXRJc0luc3RhbGxlZChpbnN0YWxsZWQpIHtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMudXNlQnV0dG9uLCBpbnN0YWxsZWQpO1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy5pbnN0YWxsQnV0dG9uLCAhaW5zdGFsbGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVEZXRhaWxWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlld1wiO1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gXCIuLi9odWItc2VydmljZXNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gdmlld3NcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZURldGFpbFZpZXcoc3RhdGUpO1xuICAgIHRoaXMudmlldy5vbignaW5zdGFsbCcsIHRoaXMuaW5zdGFsbCwgdGhpcyk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydjbG9zZScsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgbG9hZEJ5SWQoaWQpIHtcbiAgICB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgLnRoZW4odGhpcy51cGRhdGUuYmluZCh0aGlzKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgIGluc3RhbGwoe2lkfSkge1xuICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSlcbiAgICAgICAudGhlbihtYWNoaW5lTmFtZSA9PiB0aGlzLnNlcnZpY2VzLmluc3RhbGxDb250ZW50VHlwZShtYWNoaW5lTmFtZSkpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gY29uc29sZS5kZWJ1ZygnVE9ETywgZ3VpIHVwZGF0ZXMnLCBjb250ZW50VHlwZSkpXG4gICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZpZXcgd2l0aCB0aGUgY29udGVudCB0eXBlIGRhdGFcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZSkge1xuICAgIHRoaXMudmlldy5zZXRJZChjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG4gICAgdGhpcy52aWV3LnNldFRpdGxlKGNvbnRlbnRUeXBlLnRpdGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0RGVzY3JpcHRpb24oY29udGVudFR5cGUuZGVzY3JpcHRpb24pO1xuICAgIHRoaXMudmlldy5zZXRJbWFnZShjb250ZW50VHlwZS5pY29uKTtcbiAgICB0aGlzLnZpZXcuc2V0RXhhbXBsZShjb250ZW50VHlwZS5leGFtcGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0T3duZXIoY29udGVudFR5cGUub3duZXIpO1xuICAgIHRoaXMudmlldy5zZXRJc0luc3RhbGxlZCghIWNvbnRlbnRUeXBlLmluc3RhbGxlZCk7XG4gICAgdGhpcy52aWV3LnNldExpY2VuY2UoY29udGVudFR5cGUubGljZW5zZSk7XG5cbiAgICAvLyB1cGRhdGUgY2Fyb3VzZWxcbiAgICB0aGlzLnZpZXcucmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCgpO1xuICAgIGNvbnRlbnRUeXBlLnNjcmVlbnNob3RzLmZvckVhY2godGhpcy52aWV3LmFkZEltYWdlVG9DYXJvdXNlbCwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCByZW1vdmVDaGlsZCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IG5vSWNvbiBmcm9tICcuLi8uLi9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Zyc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIHJvb3QgZWxlbWVudFxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1saXN0JztcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHJvd3MgZnJvbSByb290IGVsZW1lbnRcbiAgICovXG4gIHJlbW92ZUFsbFJvd3MoKSB7XG4gICAgd2hpbGUodGhpcy5yb290RWxlbWVudC5oYXNDaGlsZE5vZGVzKCkgKXtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5yb290RWxlbWVudC5sYXN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcm93XG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICBhZGRSb3coY29udGVudFR5cGUpIHtcbiAgICBjb25zdCByb3cgPSB0aGlzLmNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCB0aGlzKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncm93LXNlbGVjdGVkJywgdGhpcywgcm93KTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHJvdylcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIENvbnRlbnQgVHlwZSBjb25maWd1cmF0aW9uIGFuZCBjcmVhdGVzIGEgcm93IGRvbVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKiBAcGFyYW0ge0V2ZW50ZnVsfSBzY29wZVxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCBzY29wZSkge1xuICAgIC8vIHJvdyBpdGVtXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC5pZCA9IGBjb250ZW50LXR5cGUtJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1gO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuXG4gICAgLy8gY3JlYXRlIGJ1dHRvbiBjb25maWdcbiAgICBjb25zdCB1c2VCdXR0b25Db25maWcgPSB7IHRleHQ6ICdVc2UnLCBjbHM6ICdidXR0b24tcHJpbWFyeScsIGljb246ICcnIH07XG4gICAgY29uc3QgaW5zdGFsbEJ1dHRvbkNvbmZpZyA9IHsgdGV4dDogJ2luc3RhbGwnLCBjbHM6ICdidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsJywgaWNvbjogJ2ljb24tYXJyb3ctdGhpY2snfTtcbiAgICBjb25zdCBidXR0b24gPSBjb250ZW50VHlwZS5pbnN0YWxsZWQgPyAgdXNlQnV0dG9uQ29uZmlnOiBpbnN0YWxsQnV0dG9uQ29uZmlnO1xuXG4gICAgY29uc3QgdGl0bGUgPSBjb250ZW50VHlwZS50aXRsZSB8fCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGNvbnRlbnRUeXBlLnN1bW1hcnkgfHwgJyc7XG5cbiAgICBjb25zdCBpbWFnZSA9IGNvbnRlbnRUeXBlLmljb24gfHwgbm9JY29uO1xuXG4gICAgLy8gY3JlYXRlIGh0bWxcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cIiR7aW1hZ2V9XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiAke2J1dHRvbi5jbHN9XCIgZGF0YS1pZD1cIiR7Y29udGVudFR5cGUubWFjaGluZU5hbWV9XCIgdGFiaW5kZXg9XCIwXCI+PHNwYW4gY2xhc3M9XCIke2J1dHRvbi5pY29ufVwiPjwvc3Bhbj4ke2J1dHRvbi50ZXh0fTwvc3Bhbj5cbiAgICAgIDxoND4ke3RpdGxlfTwvaDQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke2Rlc2NyaXB0aW9ufTwvZGl2PlxuICAgYDtcblxuICAgIC8vIGhhbmRsZSB1c2UgYnV0dG9uXG4gICAgY29uc3QgdXNlQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXByaW1hcnknKTtcbiAgICBpZih1c2VCdXR0b24pe1xuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHNjb3BlLCB1c2VCdXR0b24pO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZUxpc3RWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1saXN0LXZpZXdcIjtcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogUm93IHNlbGVjdGVkIGV2ZW50XG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBVcGRhdGUgY29udGVudCB0eXBlIGxpc3QgZXZlbnRcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3QjdXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3QjdXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdGhlIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZUxpc3RWaWV3KHN0YXRlKTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3Jvdy1zZWxlY3RlZCcsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoaXMgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgdGhpcyBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBsaXN0IHdpdGggbmV3IGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZXMpIHtcbiAgICB0aGlzLnZpZXcucmVtb3ZlQWxsUm93cygpO1xuICAgIGNvbnRlbnRUeXBlcy5mb3JFYWNoKHRoaXMudmlldy5hZGRSb3csIHRoaXMudmlldyk7XG4gICAgdGhpcy5maXJlKCd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnLCB7fSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2aWV3cyByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUsIHF1ZXJ5U2VsZWN0b3JBbGwgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCBpbml0TWVudSBmcm9tICdjb21wb25lbnRzL21lbnUnO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3XG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3IHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudHNcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50KHN0YXRlKTtcblxuICAgIC8vIHBpY2sgZWxlbWVudHNcbiAgICB0aGlzLm1lbnViYXIgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItbmF2Jyk7XG4gICAgdGhpcy5pbnB1dEZpZWxkID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInNlYXJjaFwiXSBpbnB1dCcpO1xuICAgIGNvbnN0IGlucHV0QnV0dG9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInNlYXJjaFwiXSAuaW5wdXQtZ3JvdXAtYWRkb24nKTtcblxuICAgIC8vIGlucHV0IGZpZWxkXG4gICAgdGhpcy5pbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5maXJlKCdzZWFyY2gnLCB7XG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LnRhcmdldCxcbiAgICAgICAgcXVlcnk6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgICAga2V5Q29kZTogZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbnB1dCBidXR0b25cbiAgICBpbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICBsZXQgc2VhcmNoYmFyID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignI2h1Yi1zZWFyY2gtYmFyJyk7XG5cbiAgICAgICB0aGlzLmZpcmUoJ3NlYXJjaCcsIHtcbiAgICAgICAgIGVsZW1lbnQ6IHNlYXJjaGJhcixcbiAgICAgICAgIHF1ZXJ5OiBzZWFyY2hiYXIudmFsdWUsXG4gICAgICAgICBrZXlDb2RlOiAxMyAvLyBBY3QgbGlrZSBhbiAnZW50ZXInIGtleSBwcmVzc1xuICAgICAgIH0pO1xuXG4gICAgICAgc2VhcmNoYmFyLmZvY3VzKCk7XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtZW51IGdyb3VwIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlRWxlbWVudChzdGF0ZSkge1xuICAgIGxldCBtZW51dGl0bGUgPSAnQnJvd3NlIGNvbnRlbnQgdHlwZXMnO1xuICAgIGxldCBtZW51SWQgPSAnY29udGVudC10eXBlLWZpbHRlcic7XG4gICAgbGV0IHNlYXJjaFRleHQgPSAnU2VhcmNoIGZvciBDb250ZW50IFR5cGVzJztcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtZ3JvdXBcIj5cbiAgICAgICAgPG5hdiAgcm9sZT1cIm1lbnViYXJcIiBjbGFzcz1cIm5hdmJhclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXIgbmF2YmFyLXRvZ2dsZXItcmlnaHRcIiBhcmlhLWNvbnRyb2xzPVwiJHttZW51SWR9XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24tYWNjb3JkaW9uLWFycm93XCI+PC9zcGFuPlxuICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLWJyYW5kXCI+JHttZW51dGl0bGV9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPHVsIGlkPVwiJHttZW51SWR9XCIgY2xhc3M9XCJuYXZiYXItbmF2XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC91bD5cbiAgICAgICAgPC9uYXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIiByb2xlPVwic2VhcmNoXCI+XG4gICAgICAgICAgPGlucHV0IGlkPVwiaHViLXNlYXJjaC1iYXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtcm91bmRlZFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCIke3NlYXJjaFRleHR9XCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaWNvbi1zZWFyY2hcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG1lbnUgaXRlbVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGFkZE1lbnVJdGVtKHRleHQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51aXRlbScpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcblxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICB0aGlzLmZpcmUoJ21lbnUtc2VsZWN0ZWQnLCB7XG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LnRhcmdldFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBzZXRzIGZpcnN0IHRvIGJlIHNlbGVjdGVkXG4gICAgaWYodGhpcy5tZW51YmFyLmNoaWxkRWxlbWVudENvdW50ID09IDEpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdG8gbWVudSBiYXJcbiAgICB0aGlzLm1lbnViYXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBpbnB1dCBmaWVsZFxuICAgKi9cbiAgY2xlYXJJbnB1dEZpZWxkKCkge1xuICAgIHRoaXMuaW5wdXRGaWVsZC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIG1lbnUgaXRlbSBpcyB0aGUgZmlyc3QgY2hpbGQgaW4gdGhlIG1lbnVcbiAgICpcbiAgICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG1lbnVJdGVtXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc0ZpcnN0TWVudUl0ZW0obWVudUl0ZW0pIHtcbiAgICByZXR1cm4gbWVudUl0ZW0gPT09IHRoaXMubWVudWJhci5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cIm1lbnVpdGVtXCJdJylbMF07XG4gIH1cblxuICAvKipcbiAgICogRW5zdXJlcyB0aGUgZmlyc3QgbWVudSBpdGVtIGlzIHNlbGVjdGVkXG4gICAqL1xuICByZXNldE1lbnVTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5tZW51YmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKVxuICAgICAgLmZvckVhY2gobWVudUl0ZW0gPT5cbiAgICAgICAgbWVudUl0ZW0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgdGhpcy5pc0ZpcnN0TWVudUl0ZW0obWVudUl0ZW0pLnRvU3RyaW5nKCkpXG4gICAgICApO1xuICB9XG5cbiAgaW5pdE1lbnUoKSB7XG4gICAgY29uc3QgdW5kZXJsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHVuZGVybGluZS5jbGFzc05hbWUgPSAnbWVudWl0ZW0tdW5kZXJsaW5lJztcbiAgICB0aGlzLm1lbnViYXIuYXBwZW5kQ2hpbGQodW5kZXJsaW5lKTtcbiAgICBpbml0TWVudSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgb2YgdGhlIGNvbnRlbnQgYnJvd3NlclxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJpbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3XCI7XG5pbXBvcnQgU2VhcmNoU2VydmljZSBmcm9tIFwiLi4vc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2VcIjtcbmltcG9ydCBDb250ZW50VHlwZUxpc3QgZnJvbSAnLi4vY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QnO1xuaW1wb3J0IENvbnRlbnRUeXBlRGV0YWlsIGZyb20gJy4uL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbCc7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4uL3V0aWxzL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRUeXBlU2VjdGlvblxuICogQG1peGVzIEV2ZW50ZnVsXG4gKlxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgdGhpcy50eXBlQWhlYWRFbmFibGVkID0gdHJ1ZTtcblxuICAgIC8vIGFkZCB2aWV3XG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRlbnRUeXBlU2VjdGlvblZpZXcoc3RhdGUpO1xuXG4gICAgLy8gY29udHJvbGxlclxuICAgIHRoaXMuc2VhcmNoU2VydmljZSA9IG5ldyBTZWFyY2hTZXJ2aWNlKHsgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybCB9KTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdCA9IG5ldyBDb250ZW50VHlwZUxpc3QoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsID0gbmV3IENvbnRlbnRUeXBlRGV0YWlsKHsgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybCB9KTtcblxuICAgIC8vIGFkZCBtZW51IGl0ZW1zXG4gICAgWydBbGwnLCAnTXkgQ29udGVudCBUeXBlcycsICdNb3N0IFBvcHVsYXInXVxuICAgICAgLmZvckVhY2gobWVudVRleHQgPT4gdGhpcy52aWV3LmFkZE1lbnVJdGVtKG1lbnVUZXh0KSk7XG4gICAgdGhpcy52aWV3LmluaXRNZW51KCk7XG5cbiAgICAvLyBFbGVtZW50IGZvciBob2xkaW5nIGxpc3QgYW5kIGRldGFpbHMgdmlld3NcbiAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdjb250ZW50LXR5cGUtc2VjdGlvbicpO1xuXG4gICAgdGhpcy5yb290RWxlbWVudCA9IHNlY3Rpb247XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlTGlzdC5nZXRFbGVtZW50KCkpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZURldGFpbC5nZXRFbGVtZW50KCkpO1xuXG4gICAgdGhpcy52aWV3LmdldEVsZW1lbnQoKS5hcHBlbmRDaGlsZCh0aGlzLnJvb3RFbGVtZW50KTtcblxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCcsICd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnXSwgdGhpcy5jb250ZW50VHlwZUxpc3QpO1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0J10sIHRoaXMuY29udGVudFR5cGVEZXRhaWwpO1xuXG4gICAgLy8gcmVnaXN0ZXIgbGlzdGVuZXJzXG4gICAgdGhpcy52aWV3Lm9uKCdzZWFyY2gnLCB0aGlzLnNlYXJjaCwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdzZWFyY2gnLCB0aGlzLnJlc2V0TWVudVNlbGVjdGlvbiwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdzZWFyY2gnLCB0aGlzLnJlc2V0TWVudU9uRW50ZXIsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMuYXBwbHlTZWFyY2hGaWx0ZXIsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMuY2xlYXJJbnB1dEZpZWxkLCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5vbigncm93LXNlbGVjdGVkJywgdGhpcy5zaG93RGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignc2VsZWN0JywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xuXG4gICAgdGhpcy5pbml0Q29udGVudFR5cGVMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdCB3aXRoIGEgc2VhcmNoXG4gICAqL1xuICBpbml0Q29udGVudFR5cGVMaXN0KCkge1xuICAgIC8vIGluaXRpYWxpemUgYnkgc2VhcmNoXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChcIlwiKVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKVxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZmlyZSgnZXJyb3InLCBlcnJvcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGEgc2VhcmNoIGFuZCB1cGRhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcbiAgICovXG4gIHNlYXJjaCh7cXVlcnksIGtleUNvZGV9KSB7XG4gICAgaWYgKHRoaXMudHlwZUFoZWFkRW5hYmxlZCB8fCBrZXlDb2RlID09PSAxMykgeyAvLyBTZWFyY2ggYXV0b21hdGljYWxseSBvciBvbiAnZW50ZXInXG4gICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KVxuICAgICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgRW5zdXJlcyB0aGUgZmlyc3QgbWVudSBlbGVtZW50IGlzIHNlbGVjdGVkXG4gICAqL1xuICByZXNldE1lbnVTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy52aWV3LnJlc2V0TWVudVNlbGVjdGlvbigpO1xuICB9XG5cbiAgcmVzZXRNZW51T25FbnRlcih7a2V5Q29kZX0pIHtcbiAgICBpZiAoa2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHRoaXMuY2xvc2VEZXRhaWxWaWV3KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNob3VsZCBhcHBseSBhIHNlYXJjaCBmaWx0ZXJcbiAgICovXG4gIGFwcGx5U2VhcmNoRmlsdGVyKCkge1xuICAgIGNvbnNvbGUuZGVidWcoJ0NvbnRlbnRUeXBlU2VjdGlvbjogbWVudSB3YXMgY2xpY2tlZCEnLCBldmVudCk7XG4gIH1cblxuICBjbGVhcklucHV0RmllbGQoe2VsZW1lbnR9KSB7XG4gICAgaWYgKCF0aGlzLnZpZXcuaXNGaXJzdE1lbnVJdGVtKGVsZW1lbnQpKSB7XG4gICAgICB0aGlzLnZpZXcuY2xlYXJJbnB1dEZpZWxkKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyBkZXRhaWwgdmlld1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNob3dEZXRhaWxWaWV3KHtpZH0pIHtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5oaWRlKCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5sb2FkQnlJZChpZCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5zaG93KCk7XG4gICAgdGhpcy50eXBlQWhlYWRFbmFibGVkID0gZmFsc2U7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDbG9zZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgY2xvc2VEZXRhaWxWaWV3KCkge1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LnNob3coKTtcbiAgICB0aGlzLnR5cGVBaGVhZEVuYWJsZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxuaW1wb3J0IGluaXRUYWJQYW5lbCBmcm9tIFwiY29tcG9uZW50cy90YWItcGFuZWxcIlxuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4vdXRpbHMvZXZlbnRzJztcbi8qKlxuICogVGFiIGNoYW5nZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjdGFiLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBQYW5lbCBvcGVuIG9yIGNsb3NlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyNwYW5lbC1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9EQVRBX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YlZpZXcjdGFiLWNoYW5nZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJWaWV3IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgdGhpcy5yZW5kZXJUYWJQYW5lbChzdGF0ZSk7XG4gICAgdGhpcy5yZW5kZXJQYW5lbChzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBwYW5lbFxuICAgKi9cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICogQHBhcmFtIHtib29sZWFufSBleHBhbmRlZFxuICAgKi9cbiAgcmVuZGVyUGFuZWwoe3RpdGxlID0gJycsIHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGl0bGUuY2xhc3NOYW1lICs9IFwicGFuZWwtaGVhZGVyIGljb24taHViLWljb25cIjtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWApO1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3BhbmVsLWNoYW5nZScsIHRoaXMsIHRoaXMudGl0bGUpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYm9keS5jbGFzc05hbWUgKz0gXCJwYW5lbC1ib2R5XCI7XG4gICAgdGhpcy5ib2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLmJvZHkuaWQgPSBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSBgcGFuZWwgaDVwLXNlY3Rpb24tJHtzZWN0aW9uSWR9YDtcbiAgICBpZihleHBhbmRlZCl7XG4gICAgICB0aGlzLnBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICB9XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuYm9keSk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSArPSBgaDVwIGg1cC1odWJgO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gICAgaW5pdFBhbmVsKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpZiBwYW5lbCBpcyBvcGVuLCB0aGlzIGlzIHVzZWQgZm9yIG91dGVyIGJvcmRlciBjb2xvclxuICAgKi9cbiAgdG9nZ2xlUGFuZWxPcGVuKCkge1xuICAgIGxldCBwYW5lbCA9IHRoaXMucGFuZWw7XG4gICAgaWYoaXNPcGVuKHBhbmVsKSkge1xuICAgICAgcGFuZWwucmVtb3ZlQXR0cmlidXRlKCdvcGVuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3BhbmVsLnF1ZXJ5U2VsZWN0b3IoJyNodWItc2VhcmNoLWJhcicpLmZvY3VzKCl9LDIwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgdGFiIHBhbmVsXG4gICAqL1xuICByZW5kZXJUYWJQYW5lbChzdGF0ZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYmxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMudGFibGlzdC5jbGFzc05hbWUgKz0gXCJ0YWJsaXN0XCI7XG4gICAgdGhpcy50YWJsaXN0LnNldEF0dHJpYnV0ZSAoJ3JvbGUnLCAndGFibGlzdCcpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKHRoaXMudGFibGlzdCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmNsYXNzTmFtZSArPSAndGFiLXBhbmVsJztcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50YWJMaXN0V3JhcHBlcik7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHRhYlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRlbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxuICAgKi9cbiAgYWRkVGFiKHt0aXRsZSwgaWQsIGNvbnRlbnQsIHNlbGVjdGVkID0gZmFsc2V9KSB7XG4gICAgY29uc3QgdGFiSWQgPSBgdGFiLSR7aWR9YDtcbiAgICBjb25zdCB0YWJQYW5lbElkID0gYHRhYi1wYW5lbC0ke2lkfWA7XG5cbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRhYi5jbGFzc05hbWUgKz0gJ3RhYic7XG4gICAgdGFiLmlkID0gdGFiSWQ7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRhYlBhbmVsSWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBzZWxlY3RlZC50b1N0cmluZygpKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKEFUVFJJQlVURV9EQVRBX0lELCBpZCk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWInKTtcbiAgICB0YWIuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3RhYi1jaGFuZ2UnLCB0aGlzLCB0YWIpO1xuXG4gICAgY29uc3QgdGFiUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YWJQYW5lbC5pZCA9IHRhYlBhbmVsSWQ7XG4gICAgdGFiUGFuZWwuY2xhc3NOYW1lICs9ICd0YWJwYW5lbCc7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmxsZWRieScsIHRhYklkKTtcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgKCFzZWxlY3RlZCkudG9TdHJpbmcoKSk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYnBhbmVsJyk7XG4gICAgdGFiUGFuZWwuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQodGFiKTtcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGFiUGFuZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gYW5pbWF0ZWQgYm9yZGVyIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhYlxuICAgKi9cbiAgYWRkQm90dG9tQm9yZGVyKCkge1xuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpO1xuICB9XG5cbiAgaW5pdFRhYlBhbmVsKCkge1xuICAgIGluaXRUYWJQYW5lbCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRTZWN0aW9uVHlwZSh7aWR9KSB7XG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgPSBgaDVwLXNlY3Rpb24tJHtpZH0gcGFuZWxgO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJpbXBvcnQge2N1cnJ5fSBmcm9tICd1dGlscy9mdW5jdGlvbmFsJ1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4uL2h1Yi1zZXJ2aWNlcyc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBUaGUgU2VhcmNoIFNlcnZpY2UgZ2V0cyBhIGNvbnRlbnQgdHlwZSBmcm9tIGh1Yi1zZXJ2aWNlcy5qc1xuICogaW4gdGhlIGZvcm0gb2YgYSBwcm9taXNlLiBJdCB0aGVuIGdlbmVyYXRlcyBhIHNjb3JlIGJhc2VkXG4gKiBvbiB0aGUgZGlmZmVyZW50IHdlaWdodGluZ3Mgb2YgdGhlIGNvbnRlbnQgdHlwZSBmaWVsZHMgYW5kXG4gKiBzb3J0cyB0aGUgcmVzdWx0cyBiYXNlZCBvbiB0aGUgZ2VuZXJhdGVkIHNjb3JlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUuYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIEFkZCBjb250ZW50IHR5cGVzIHRvIHRoZSBzZWFyY2ggaW5kZXhcbiAgICB0aGlzLmNvbnRlbnRUeXBlcyA9IHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBzZWFyY2hcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXT59IEEgcHJvbWlzZSBvZiBhbiBhcnJheSBvZiBjb250ZW50IHR5cGVzXG4gICAqL1xuICBzZWFyY2gocXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50VHlwZXMudGhlbihmaWx0ZXJCeVF1ZXJ5KHF1ZXJ5KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBGaWx0ZXJzIGEgbGlzdCBvZiBjb250ZW50IHR5cGVzIGJhc2VkIG9uIGEgcXVlcnlcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcbiAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gKi9cbmNvbnN0IGZpbHRlckJ5UXVlcnkgPSBjdXJyeShmdW5jdGlvbihxdWVyeSwgY29udGVudFR5cGVzKSB7XG4gIGlmIChxdWVyeSA9PSAnJykge1xuICAgIHJldHVybiBjb250ZW50VHlwZXM7XG4gIH1cblxuICAvLyBBcHBlbmQgYSBzZWFyY2ggc2NvcmUgdG8gZWFjaCBjb250ZW50IHR5cGVcbiAgcmV0dXJuIGNvbnRlbnRUeXBlcy5tYXAoY29udGVudFR5cGUgPT5cbiAgICAoe1xuICAgICAgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgc2NvcmU6IGdldFNlYXJjaFNjb3JlKHF1ZXJ5LCBjb250ZW50VHlwZSlcbiAgICB9KSlcbiAgICAuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc2NvcmUgPiAwKVxuICAgIC5zb3J0KHNvcnRTZWFyY2hSZXN1bHRzKSAvLyBTb3J0IGJ5IGluc3RhbGxlZCwgcmVsZXZhbmNlIGFuZCBwb3B1bGFyaXR5XG4gICAgLm1hcChyZXN1bHQgPT4gcmVzdWx0LmNvbnRlbnRUeXBlKTsgLy8gVW53cmFwIHJlc3VsdCBvYmplY3Q7XG59KTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgQXJyYXkuc29ydCgpXG4gKiBDb21wYXJlcyB0d28gY29udGVudCB0eXBlcyBvbiBkaWZmZXJlbnQgY3JpdGVyaWFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBGaXJzdCBjb250ZW50IHR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFNlY29uZCBjb250ZW50IHR5cGVcbiAqIEByZXR1cm4ge2ludH1cbiAqL1xuY29uc3Qgc29ydFNlYXJjaFJlc3VsdHMgPSAoYSxiKSA9PiB7XG4gIGlmICghYS5jb250ZW50VHlwZS5pbnN0YWxsZWQgJiYgYi5jb250ZW50VHlwZS5pbnN0YWxsZWQpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmIChhLmNvbnRlbnRUeXBlLmluc3RhbGxlZCAmJiAhYi5jb250ZW50VHlwZS5pbnN0YWxsZWQpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBlbHNlIGlmIChiLnNjb3JlICE9PSBhLnNjb3JlKSB7XG4gICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlO1xuICB9XG5cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGIuY29udGVudFR5cGUucG9wdWxhcml0eSAtIGEuY29udGVudFR5cGUucG9wdWxhcml0eTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHdlaWdodGluZyBmb3IgZGlmZmVyZW50IHNlYXJjaCB0ZXJtcyBiYXNlZFxuICogb24gZXhpc3RlbmNlIG9mIHN1YnN0cmluZ3NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRlbnRUeXBlXG4gKiBAcmV0dXJuIHtpbnR9XG4gKi9cbiBjb25zdCBnZXRTZWFyY2hTY29yZSA9IGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZSkge1xuICAgbGV0IHF1ZXJpZXMgPSBxdWVyeS5zcGxpdCgnICcpLmZpbHRlcihxdWVyeSA9PiBxdWVyeSAhPT0gJycpO1xuICAgbGV0IHF1ZXJ5U2NvcmVzID0gcXVlcmllcy5tYXAocXVlcnkgPT4gZ2V0U2NvcmVGb3JFYWNoUXVlcnkocXVlcnksIGNvbnRlbnRUeXBlKSk7XG4gICBpZiAocXVlcnlTY29yZXMuaW5kZXhPZigwKSA+IC0xKSB7XG4gICAgIHJldHVybiAwO1xuICAgfVxuICAgcmV0dXJuIHF1ZXJ5U2NvcmVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuIH07XG5cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByZWxldmFuY2Ugc2NvcmUgZm9yIGEgc2luZ2xlIHN0cmluZ1xuICpcbiAqIEBwYXJhbSAge3R5cGV9IHF1ZXJ5ICAgICAgIGRlc2NyaXB0aW9uXG4gKiBAcGFyYW0gIHt0eXBlfSBjb250ZW50VHlwZSBkZXNjcmlwdGlvblxuICogQHJldHVybiB7dHlwZX0gICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAqL1xuY29uc3QgZ2V0U2NvcmVGb3JFYWNoUXVlcnkgPSBmdW5jdGlvbiAocXVlcnksIGNvbnRlbnRUeXBlKSB7XG4gICBxdWVyeSA9IHF1ZXJ5LnRyaW0oKTtcbiAgIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLnRpdGxlKSkge1xuICAgICByZXR1cm4gMTAwO1xuICAgfVxuICAgZWxzZSBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5zdW1tYXJ5KSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuZGVzY3JpcHRpb24pKSB7XG4gICAgIHJldHVybiA1O1xuICAgfVxuICAgZWxzZSBpZiAoYXJyYXlIYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmtleXdvcmRzKSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2Uge1xuICAgICByZXR1cm4gMDtcbiAgIH1cbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbmVlZGxlIGlzIGZvdW5kIGluIHRoZSBoYXlzdGFjay5cbiAqIE5vdCBjYXNlIHNlbnNpdGl2ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuZWVkbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXlzdGFja1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaGFzU3ViU3RyaW5nID0gZnVuY3Rpb24obmVlZGxlLCBoYXlzdGFjaykge1xuICBpZiAoaGF5c3RhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBoYXlzdGFjay50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlLnRvTG93ZXJDYXNlKCkpICE9PSAtMTtcbn07XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uLCBjaGVja3MgaWYgYXJyYXkgaGFzIGNvbnRhaW5zIGEgc3Vic3RyaW5nXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBzdWJTdHJpbmdcbiAqIEBwYXJhbSAge0FycmF5fSBhcnJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGFycmF5SGFzU3ViU3RyaW5nID0gZnVuY3Rpb24oc3ViU3RyaW5nLCBhcnIpIHtcbiAgaWYgKGFyciA9PT0gdW5kZWZpbmVkIHx8IHN1YlN0cmluZyA9PT0gJycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYXJyLnNvbWUoc3RyaW5nID0+IGhhc1N1YlN0cmluZyhzdWJTdHJpbmcsIHN0cmluZykpO1xufTtcblxuY29uc3QgQWRkTnVtYmVyPWZ1bmN0aW9uKGEsYilcbntcbiAgcmV0dXJuIGErYjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwiaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4uL2h1Yi1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3VwbG9hZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRTZWN0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gSW5wdXQgZWxlbWVudCBmb3IgdGhlIEg1UCBmaWxlXG4gICAgY29uc3QgaDVwVXBsb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBoNXBVcGxvYWQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2ZpbGUnKTtcblxuICAgIC8vIFNlbmRzIHRoZSBINVAgZmlsZSB0byB0aGUgcGx1Z2luXG4gICAgY29uc3QgdXNlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdXNlQnV0dG9uLnRleHRDb250ZW50ID0gJ1VzZSc7XG4gICAgdXNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAvLyBBZGQgdGhlIEg1UCBmaWxlIHRvIGEgZm9ybSwgcmVhZHkgZm9yIHRyYW5zcG9ydGF0aW9uXG4gICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBkYXRhLmFwcGVuZCgnaDVwJywgaDVwVXBsb2FkLmZpbGVzWzBdKTtcblxuICAgICAgLy8gVXBsb2FkIGNvbnRlbnQgdG8gdGhlIHBsdWdpblxuICAgICAgdGhpcy5zZXJ2aWNlcy51cGxvYWRDb250ZW50KGRhdGEpXG4gICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgIC8vIEZpcmUgdGhlIHJlY2VpdmVkIGRhdGEgdG8gYW55IGxpc3RlbmVyc1xuICAgICAgICAgIHNlbGYuZmlyZSgndXBsb2FkJywganNvbik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaDVwVXBsb2FkKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHVzZUJ1dHRvbik7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSwgY2xhc3NMaXN0Q29udGFpbnMsIHF1ZXJ5U2VsZWN0b3IsIG5vZGVMaXN0VG9BcnJheSB9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICovXG5jb25zdCBBVFRSSUJVVEVfU0laRSA9ICdkYXRhLXNpemUnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgZGlzYWJsZSA9IHNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBlbmFibGUgPSByZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBlbmFibGVkXG4gKi9cbmNvbnN0IHRvZ2dsZUVuYWJsZWQgPSAoZWxlbWVudCwgZW5hYmxlZCkgPT4gKGVuYWJsZWQgPyBlbmFibGUgOiBkaXNhYmxlKShlbGVtZW50KTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGhpZGRlblxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gY3VycnkoKGhpZGRlbiwgZWxlbWVudCkgPT4gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGhpZGRlbi50b1N0cmluZygpLCBlbGVtZW50KSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBpc0Rpc2FibGVkID0gaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgdmlld1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICovXG5jb25zdCB1cGRhdGVWaWV3ID0gKGVsZW1lbnQsIHN0YXRlKSA9PiB7XG4gIGNvbnN0IHByZXZCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2aW91cycpO1xuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICBjb25zdCBsaXN0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICBjb25zdCB0b3RhbENvdW50ID0gbGlzdC5jaGlsZEVsZW1lbnRDb3VudDtcblxuICAvLyB1cGRhdGUgbGlzdCBzaXplc1xuICBsaXN0LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gc3RhdGUuZGlzcGxheUNvdW50ICogdG90YWxDb3VudH0lYDtcbiAgbGlzdC5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7c3RhdGUucG9zaXRpb24gKiAoMTAwIC8gc3RhdGUuZGlzcGxheUNvdW50KX0lYDtcblxuICAvLyB1cGRhdGUgaW1hZ2Ugc2l6ZXNcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXG4gICAgLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gdG90YWxDb3VudH0lYCk7XG5cbiAgLy8gdG9nZ2xlIGJ1dHRvbiB2aXNpYmlsaXR5XG4gIFtwcmV2QnV0dG9uLCBuZXh0QnV0dG9uXVxuICAgIC5mb3JFYWNoKHRvZ2dsZVZpc2liaWxpdHkoc3RhdGUuZGlzcGxheUNvdW50ID49IHRvdGFsQ291bnQpKTtcblxuICAvLyB0b2dnbGUgYnV0dG9uIGVuYWJsZSwgZGlzYWJsZWRcbiAgdG9nZ2xlRW5hYmxlZChuZXh0QnV0dG9uLCBzdGF0ZS5wb3NpdGlvbiA+IChzdGF0ZS5kaXNwbGF5Q291bnQgLSB0b3RhbENvdW50KSk7XG4gIHRvZ2dsZUVuYWJsZWQocHJldkJ1dHRvbiwgc3RhdGUucG9zaXRpb24gPCAwKTtcbn07XG5cbi8qKlxuICogSGFuZGxlcyBidXR0b24gY2xpY2tlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYnV0dG9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB1cGRhdGVTdGF0ZVxuICogQHBhcmFtIHtFdmVudH1cbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBvbk5hdmlnYXRpb25CdXR0b25DbGljayA9IGN1cnJ5KChlbGVtZW50LCBzdGF0ZSwgYnV0dG9uLCB1cGRhdGVTdGF0ZSwgZXZlbnQpID0+IHtcbiAgaWYoIWlzRGlzYWJsZWQoYnV0dG9uKSl7XG4gICAgdXBkYXRlU3RhdGUoc3RhdGUpO1xuICAgIHVwZGF0ZVZpZXcoZWxlbWVudCwgc3RhdGUpO1xuICB9XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBpbWFnZVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGltYWdlXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaW5pdEltYWdlID0gY3VycnkoKGVsZW1lbnQsIGltYWdlKSA9PiB7XG4gIGxldCB0YXJnZXRJZCA9IGltYWdlLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICBsZXQgdGFyZ2V0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0YXJnZXRJZH1gKTtcblxuICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJykpO1xuICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJykpXG59KTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3Igd2hlbiB0aGUgZG9tIGlzIHVwZGF0ZWRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0ltYWdlU2Nyb2xsZXJTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IHJlY29yZFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhhbmRsZURvbVVwZGF0ZSA9IGN1cnJ5KChlbGVtZW50LCBzdGF0ZSwgcmVjb3JkKSA9PiB7XG4gIC8vIG9uIGFkZCBpbWFnZSBydW4gaW5pdGlhbGl6YXRpb25cbiAgaWYocmVjb3JkLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG4gICAgbm9kZUxpc3RUb0FycmF5KHJlY29yZC5hZGRlZE5vZGVzKVxuICAgICAgLmZpbHRlcihjbGFzc0xpc3RDb250YWlucygnc2xpZGUnKSlcbiAgICAgIC5tYXAocXVlcnlTZWxlY3RvcignaW1nJykpXG4gICAgICAuZm9yRWFjaChpbml0SW1hZ2UoZWxlbWVudCkpO1xuICB9XG5cbiAgLy8gdXBkYXRlIHRoZSB2aWV3XG4gIHVwZGF0ZVZpZXcoZWxlbWVudCwgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgIGRpc3BsYXlDb3VudDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUklCVVRFX1NJWkUpIHx8IDUsXG4gICAgcG9zaXRpb246IDBcbiAgfSkpO1xufSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgLy8gZ2V0IGJ1dHRvbiBodG1sIGVsZW1lbnRzXG4gIGNvbnN0IG5leHRCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0Jyk7XG4gIGNvbnN0IHByZXZCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2aW91cycpO1xuXG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7b2JqZWN0fSBJbWFnZVNjcm9sbGVyU3RhdGVcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGRpc3BsYXlDb3VudFxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcG9zaXRpb25cbiAgICovXG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIGRpc3BsYXlDb3VudDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUklCVVRFX1NJWkUpIHx8IDUsXG4gICAgcG9zaXRpb246IDBcbiAgfTtcblxuICAvLyBpbml0aWFsaXplIGJ1dHRvbnNcbiAgbmV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrKGVsZW1lbnQsIHN0YXRlLCBuZXh0QnV0dG9uLCBzdGF0ZSA9PiBzdGF0ZS5wb3NpdGlvbi0tKSk7XG4gIHByZXZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk5hdmlnYXRpb25CdXR0b25DbGljayhlbGVtZW50LCBzdGF0ZSwgcHJldkJ1dHRvbiwgc3RhdGUgPT4gc3RhdGUucG9zaXRpb24rKykpO1xuXG4gIC8vIGluaXRpYWxpemUgaW1hZ2VzXG4gIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2FyaWEtY29udHJvbHNdJykuZm9yRWFjaChpbml0SW1hZ2UoZWxlbWVudCkpO1xuXG4gIC8vIGxpc3RlbiBmb3IgdXBkYXRlcyB0byBkYXRhLXNpemVcbiAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZm9yRWFjaChoYW5kbGVEb21VcGRhdGUoZWxlbWVudCwgc3RhdGUpKSk7XG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCB7XG4gICAgc3VidHJlZTogdHJ1ZSxcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtBVFRSSUJVVEVfU0laRV1cbiAgfSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBwb3NpdGlvblxuICB1cGRhdGVWaWV3KGVsZW1lbnQsIHN0YXRlKTtcblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyLmpzIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGUsIHRvZ2dsZUF0dHJpYnV0ZSwgaGlkZSwgc2hvdywgdG9nZ2xlVmlzaWJpbGl0eX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtjdXJyeSwgZm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5pbXBvcnQgeyBpbml0Q29sbGFwc2libGUgfSBmcm9tICcuLi91dGlscy9hcmlhJztcblxuLyoqXG4gKiBVbnNlbGVjdHMgYWxsIGVsZW1lbnRzIGluIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBlbGVtZW50c1xuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKSk7XG5cbi8qKlxuICogU2V0cyB0aGUgYXJpYS1leHBhbmRlZCBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudCB0byBmYWxzZVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuY29uc3QgdW5FeHBhbmQgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICAvLyBlbGVtZW50c1xuICBjb25zdCBtZW51SXRlbXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKTtcbiAgY29uc3QgdG9nZ2xlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtY29udHJvbHNdW2FyaWEtZXhwYW5kZWRdJyk7XG5cbiAgLy8gbW92ZSBzZWxlY3RcbiAgbWVudUl0ZW1zLmZvckVhY2gobWVudUl0ZW0gPT4ge1xuICAgIG1lbnVJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgdW5TZWxlY3RBbGwobWVudUl0ZW1zKTtcbiAgICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgdW5FeHBhbmQodG9nZ2xlcik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGluaXQgY29sbGFwc2UgYW5kIG9wZW5cbiAgaW5pdENvbGxhcHNpYmxlKGVsZW1lbnQpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9tZW51LmpzIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Zm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBoaWRlQWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0YWJzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYlwiXScpO1xuICBjb25zdCB0YWJQYW5lbHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFicGFuZWxcIl0nKTtcblxuICB0YWJzLmZvckVhY2godGFiID0+IHtcbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgdW5TZWxlY3RBbGwodGFicyk7XG4gICAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcblxuICAgICAgaGlkZUFsbCh0YWJQYW5lbHMpO1xuXG4gICAgICBsZXQgdGFiUGFuZWxJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICAgIHNob3coZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0YWJQYW5lbElkfWApKTtcbiAgICB9KTtcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwicmVxdWlyZSgnLi4vLi4vc3JjL3N0eWxlcy9tYWluLnNjc3MnKTtcblxuLy8gTG9hZCBsaWJyYXJ5XG5INVAgPSBINVAgfHwge307XG5INVAuSHViQ2xpZW50ID0gcmVxdWlyZSgnLi4vc2NyaXB0cy9odWInKS5kZWZhdWx0O1xuSDVQLkh1YkNsaWVudC5yZW5kZXJFcnJvck1lc3NhZ2UgPSByZXF1aXJlKCcuLi9zY3JpcHRzL3V0aWxzL2Vycm9ycycpLmRlZmF1bHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==