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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
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
     * @param {String} [eventName] the name of the event when propogated
     */
    propagate: function propagate(types, eventful, newType) {
      var self = this;
      types.forEach(function (type) {
        return eventful.on(type, function (event) {
          return self.fire(newType || type, event);
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
exports.default = init;

var _aria = __webpack_require__(6);

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
/* 6 */
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

var _hubView = __webpack_require__(17);

var _hubView2 = _interopRequireDefault(_hubView);

var _contentTypeSection = __webpack_require__(15);

var _contentTypeSection2 = _interopRequireDefault(_contentTypeSection);

var _uploadSection = __webpack_require__(20);

var _uploadSection2 = _interopRequireDefault(_uploadSection);

var _hubServices = __webpack_require__(16);

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
    var self = this;

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

var _functional = __webpack_require__(1);

var _eventful = __webpack_require__(0);

var _panel = __webpack_require__(5);

var _panel2 = _interopRequireDefault(_panel);

var _imageScroller = __webpack_require__(22);

var _imageScroller2 = _interopRequireDefault(_imageScroller);

var _events = __webpack_require__(3);

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
      var element = document.createElement('div');
      element.className = 'content-type-detail';
      element.setAttribute('aria-hidden', 'true');
      element.innerHTML = "\n      <div class=\"back-button icon-arrow-thick\"></div>\n      <div class=\"container\">\n        <div class=\"image-wrapper\"><img class=\"img-responsive content-type-image\" src=\"" + _contentTypePlaceholder2.default + "\"></div>\n        <div class=\"text-details\">\n          <h2 class=\"title\"></h2>\n          <div class=\"owner\"></div>\n          <p class=\"small\"></p>\n          <a class=\"button demo-button\" target=\"_blank\" aria-hidden=\"false\" href=\"#\">Content Demo</a>\n        </div>\n      </div>\n      <div class=\"carousel\" role=\"region\" data-size=\"5\">\n        <span class=\"carousel-button previous\" aria-hidden=\"true\" disabled><span class=\"icon-arrow-thick\"></span></span>\n        <span class=\"carousel-button next\" aria-hidden=\"true\" disabled><span class=\"icon-arrow-thick\"></span></span>\n        <nav class=\"scroller\">\n          <ul></ul>\n        </nav>\n      </div>\n      <hr />\n      <div class=\"install-message message dismissible simple info\" aria-hidden=\"true\">\n        <div class=\"message-close icon-close\"></div>\n        <h3></h3>\n      </div>\n      <div class=\"button-bar\">\n        <span class=\"button button-primary button-use\" aria-hidden=\"false\" data-id=\"\">Use</span>\n        <span class=\"button button-inverse-primary button-install\" aria-hidden=\"true\" data-id=\"\"><span class=\"icon-arrow-thick\"></span>Install</span>\n        <span class=\"button button-inverse-primary button-installing\" aria-hidden=\"true\"><span class=\"icon-loading-search icon-spin\"></span>Installing</span>\n      </div>\n      <div class=\"panel-group\">\n        <div class=\"panel licence-panel\" aria-hidden=\"true\">\n          <div class=\"panel-header\" aria-expanded=\"false\" aria-controls=\"licence-panel\"><span class=\"icon-accordion-arrow\"></span> The Licence Info</div>\n          <div class=\"panel-body\" id=\"licence-panel\" aria-hidden=\"true\">\n            <div class=\"panel-body-inner\"></div>\n          </div>\n        </div>\n      </div>";

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

var _eventful = __webpack_require__(0);

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

var _functional = __webpack_require__(1);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(0);

var _events = __webpack_require__(3);

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
      var installButtonConfig = { text: 'Get', cls: 'button-inverse-primary button-install', icon: 'icon-arrow-thick' };
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

var _messageView = __webpack_require__(18);

var _messageView2 = _interopRequireDefault(_messageView);

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

var _events = __webpack_require__(3);

var _menu = __webpack_require__(23);

var _menu2 = _interopRequireDefault(_menu);

var _eventful = __webpack_require__(0);

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
      element.className = 'content-type-section-view';
      element.innerHTML = "\n      <div class=\"menu-group\">\n        <nav  role=\"menubar\" class=\"navbar\">\n          <div class=\"navbar-header\">\n             <span class=\"navbar-toggler navbar-toggler-right\" aria-controls=\"" + menuId + "\" aria-expanded=\"false\">\n               <span class=\"navbar-toggler-selected\"></span>\n               <span class=\"icon-accordion-arrow\"></span>\n             </span>\n            <span class=\"navbar-brand\">" + menutitle + "</span>\n          </div>\n\n          <ul id=\"" + menuId + "\" class=\"navbar-nav\" aria-hidden=\"true\"></ul>\n        </nav>\n\n        <div class=\"input-group\" role=\"search\">\n          <input id=\"hub-search-bar\" class=\"form-control form-control-rounded\" type=\"text\" placeholder=\"" + searchText + "\" />\n          <div class=\"input-group-addon icon-search\"></div>\n        </div>\n      </div>";

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
        self.fire('reload');
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
      }

      element.addEventListener('click', function (event) {
        _this2.fire('menu-selected', {
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
      (0, _menu2.default)(this.rootElement);
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

var _searchService = __webpack_require__(19);

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
    eventName: 'most-popular',
    filterProperty: 'popularity'
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
   * @param {HubState} state
   */
  function ContentTypeSection(state, services) {
    _classCallCheck(this, ContentTypeSection);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    this.typeAheadEnabled = true;

    // add view
    this.view = new _contentTypeSectionView2.default(state);

    // controller
    this.searchService = new _searchService2.default(services);
    this.contentTypeList = new _contentTypeList2.default();
    this.contentTypeDetail = new _contentTypeDetail2.default(services);

    // add menu items
    for (var tab in ContentTypeSectionTabs) {
      if (ContentTypeSectionTabs.hasOwnProperty(tab)) {
        this.view.addMenuItem(ContentTypeSectionTabs[tab]);
      }
    }
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
    this.propagate(['reload'], this.view);

    // register listeners
    this.view.on('search', this.search, this);
    this.view.on('search', this.view.selectMenuItemById.bind(this.view, ContentTypeSectionTabs.ALL.id));
    this.view.on('search', this.resetMenuOnEnter, this);
    this.view.on('menu-selected', this.applySearchFilter, this);
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
        case ContentTypeSectionTabs.MOST_POPULAR.eventName:
          // Filter on tab's filter property, then update content type list
          this.searchService.filter(ContentTypeSectionTabs.MOST_POPULAR.filterProperty).then(function (cts) {
            _this3.contentTypeList.update(cts);
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
    value: function clearInputField(_ref3) {
      var id = _ref3.id;

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(21);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _panel = __webpack_require__(5);

var _panel2 = _interopRequireDefault(_panel);

var _tabPanel = __webpack_require__(24);

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _functional = __webpack_require__(1);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(0);

var _events = __webpack_require__(3);

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
      this.rootElement.className += "h5p h5p-hub h5p-sdk";
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventful = __webpack_require__(0);

var _events = __webpack_require__(3);

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
      messageContent.innerHTML = '<h1>' + message.title + '</h1>' + '<p>' + message.content + '</p>';
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functional = __webpack_require__(1);

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
     * @param property
     * @return {Promise.<ContentType[]>|*}
     */

  }, {
    key: 'filter',
    value: function filter(property) {
      return this.services.contentTypes().then(function (contentTypes) {
        return contentTypes.sort(function (ct1, ct2) {

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
            return 0;
          }
        });
      });
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
/* 20 */
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
/* 21 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

var _aria = __webpack_require__(6);

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
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(8).default;
H5P.HubClient.renderErrorMessage = __webpack_require__(4).default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWM1YmVlOTZjNDk0MjdiMmM0ZTQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwid2VicGFjazovLy8uLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvYXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvbWFpbi5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21lc3NhZ2Utdmlldy9tZXNzYWdlLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyLmpzIiwid2VicGFjazovLy8uLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9tZW51LmpzIiwid2VicGFjazovLy8uLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudHJpZXMvZGlzdC5qcyJdLCJuYW1lcyI6WyJFdmVudGZ1bCIsImxpc3RlbmVycyIsIm9uIiwidHlwZSIsImxpc3RlbmVyIiwic2NvcGUiLCJ0cmlnZ2VyIiwicHVzaCIsImZpcmUiLCJldmVudCIsInRyaWdnZXJzIiwiZXZlcnkiLCJjYWxsIiwicHJvcGFnYXRlIiwidHlwZXMiLCJldmVudGZ1bCIsIm5ld1R5cGUiLCJzZWxmIiwiZm9yRWFjaCIsImN1cnJ5IiwiZm4iLCJhcml0eSIsImxlbmd0aCIsImYxIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJhcmd1bWVudHMiLCJhcHBseSIsImYyIiwiYXJnczIiLCJjb25jYXQiLCJjb21wb3NlIiwiZm5zIiwicmVkdWNlIiwiZiIsImciLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJuYW1lIiwiZWwiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJhdHRyaWJ1dGVFcXVhbHMiLCJ0b2dnbGVBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInBhcmVudCIsImNoaWxkIiwicXVlcnlTZWxlY3RvciIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZUNoaWxkIiwib2xkQ2hpbGQiLCJjbGFzc0xpc3RDb250YWlucyIsImNscyIsImNsYXNzTGlzdCIsIm5vZGVMaXN0VG9BcnJheSIsIm5vZGVMaXN0IiwiaGlkZSIsInNob3ciLCJ0b2dnbGVWaXNpYmlsaXR5IiwidmlzaWJsZSIsImVsZW1lbnQiLCJyZWxheUNsaWNrRXZlbnRBcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJpZCIsInN0b3BQcm9wYWdhdGlvbiIsInJlbmRlckVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjbG9zZUJ1dHRvbiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsIm1lc3NhZ2VDb250ZW50IiwidGl0bGUiLCJjb250ZW50IiwibWVzc2FnZVdyYXBwZXIiLCJkaXNtaXNzaWJsZSIsImJ1dHRvbiIsInVuZGVmaW5lZCIsIm1lc3NhZ2VCdXR0b24iLCJpbml0IiwiaXNFeHBhbmRlZCIsImluaXRDb2xsYXBzaWJsZSIsInRvZ2dsZXIiLCJjb2xsYXBzaWJsZUlkIiwiY29sbGFwc2libGUiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiYXR0cmlidXRlRmlsdGVyIiwiSHViIiwic3RhdGUiLCJzZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJjb250ZW50VHlwZVNlY3Rpb24iLCJ1cGxvYWRTZWN0aW9uIiwidmlldyIsInNldFBhbmVsVGl0bGUiLCJjbG9zZVBhbmVsIiwic2V0U2VjdGlvblR5cGUiLCJ0b2dnbGVQYW5lbE9wZW4iLCJiaW5kIiwic2V0dXAiLCJpbml0Q29udGVudFR5cGVMaXN0IiwiaW5pdFRhYlBhbmVsIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZSIsImdldENvbnRlbnRUeXBlIiwidGhlbiIsInNldFRpdGxlIiwic2VjdGlvbklkIiwidGFiQ29uZmlncyIsImdldEVsZW1lbnQiLCJjb25maWciLCJzZWxlY3RlZCIsImFkZFRhYiIsInRhYkNvbmZpZyIsImFkZEJvdHRvbUJvcmRlciIsIkFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQiLCJNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OIiwiaXNFbXB0eSIsInRleHQiLCJoaWRlQWxsIiwiQ29udGVudFR5cGVEZXRhaWxWaWV3Iiwicm9vdEVsZW1lbnQiLCJjcmVhdGVWaWV3IiwiYnV0dG9uQmFyIiwidXNlQnV0dG9uIiwiaW5zdGFsbEJ1dHRvbiIsImJ1dHRvbnMiLCJpbWFnZSIsIm93bmVyIiwiZGVzY3JpcHRpb24iLCJkZW1vQnV0dG9uIiwiY2Fyb3VzZWwiLCJjYXJvdXNlbExpc3QiLCJsaWNlbmNlUGFuZWwiLCJpbnN0YWxsTWVzc2FnZSIsImluc3RhbGxNZXNzYWdlQ2xvc2UiLCJzdWNjZXNzIiwiaW5uZXJUZXh0IiwibGlnaHRib3giLCJjaGlsZEVsZW1lbnRDb3VudCIsInVybCIsImFsdCIsInRodW1ibmFpbCIsInNyYyIsImVsbGlwc2lzIiwidG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCIsImRlc2NyaXB0aW9uRXhwYW5kZWQiLCJzaXplIiwic3Vic3RyIiwiaW5zdGFsbGVkIiwic2hvd0J1dHRvbkJ5U2VsZWN0b3IiLCJDb250ZW50VHlwZURldGFpbCIsImluc3RhbGwiLCJ1cGRhdGUiLCJpbnN0YWxsQ29udGVudFR5cGUiLCJzZXRJc0luc3RhbGxlZCIsInNldEluc3RhbGxNZXNzYWdlIiwiY2F0Y2giLCJlcnJvck1lc3NhZ2UiLCJlcnJvciIsImVycm9yQ29kZSIsImNvbnNvbGUiLCJyZXNldCIsInNldElkIiwic2V0RGVzY3JpcHRpb24iLCJzZXRJbWFnZSIsImljb24iLCJzZXRFeGFtcGxlIiwiZXhhbXBsZSIsInNldE93bmVyIiwic2V0TGljZW5jZSIsImxpY2Vuc2UiLCJyZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsIiwic2NyZWVuc2hvdHMiLCJhZGRJbWFnZVRvQ2Fyb3VzZWwiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiaGFzQ2hpbGROb2RlcyIsImxhc3RDaGlsZCIsInJvdyIsImNyZWF0ZUNvbnRlbnRUeXBlUm93IiwidXNlQnV0dG9uQ29uZmlnIiwiaW5zdGFsbEJ1dHRvbkNvbmZpZyIsInN1bW1hcnkiLCJDb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZXMiLCJyZW1vdmVBbGxSb3dzIiwiYWRkUm93IiwidW5zZWxlY3RBbGwiLCJDb250ZW50QnJvd3NlclZpZXciLCJtZW51YmFyIiwiaW5wdXRGaWVsZCIsImRpc3BsYXlTZWxlY3RlZCIsImlucHV0QnV0dG9uIiwidGFyZ2V0IiwicXVlcnkiLCJrZXlDb2RlIiwid2hpY2giLCJzZWFyY2hiYXIiLCJwYXJlbnRFbGVtZW50IiwiZm9jdXMiLCJtZW51dGl0bGUiLCJtZW51SWQiLCJzZWFyY2hUZXh0IiwiYWN0aW9uIiwibWVzc2FnZVZpZXciLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwiYWRkIiwiZXZlbnROYW1lIiwiY2hvaWNlIiwic2VsZWN0ZWROYW1lIiwibWVudUl0ZW1zIiwic2VsZWN0ZWRNZW51SXRlbSIsInVuZGVybGluZSIsIkNvbnRlbnRUeXBlU2VjdGlvblRhYnMiLCJBTEwiLCJNWV9DT05URU5UX1RZUEVTIiwiTU9TVF9QT1BVTEFSIiwiZmlsdGVyUHJvcGVydHkiLCJDb250ZW50VHlwZVNlY3Rpb24iLCJ0eXBlQWhlYWRFbmFibGVkIiwic2VhcmNoU2VydmljZSIsImNvbnRlbnRUeXBlTGlzdCIsImNvbnRlbnRUeXBlRGV0YWlsIiwidGFiIiwiaGFzT3duUHJvcGVydHkiLCJhZGRNZW51SXRlbSIsImluaXRNZW51Iiwic2VjdGlvbiIsInNlYXJjaCIsInNlbGVjdE1lbnVJdGVtQnlJZCIsInJlc2V0TWVudU9uRW50ZXIiLCJhcHBseVNlYXJjaEZpbHRlciIsImNsZWFySW5wdXRGaWVsZCIsInVwZGF0ZURpc3BsYXlTZWxlY3RlZCIsInNob3dEZXRhaWxWaWV3IiwiY2xvc2VEZXRhaWxWaWV3IiwiaGFuZGxlRXJyb3IiLCJkaXNwbGF5TWVzc2FnZSIsInNldERpc3BsYXlTZWxlY3RlZCIsImUiLCJjdHMiLCJsb2FkQnlJZCIsIkh1YlNlcnZpY2VzIiwiY2FjaGVkQ29udGVudFR5cGVzIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibnMiLCJnZXRBamF4VXJsIiwiYm9keSIsImZvcm1EYXRhIiwiQVRUUklCVVRFX0RBVEFfSUQiLCJpc09wZW4iLCJIdWJWaWV3IiwicmVuZGVyVGFiUGFuZWwiLCJyZW5kZXJQYW5lbCIsImV4cGFuZGVkIiwidGFiQ29udGFpbmVyRWxlbWVudCIsInBhbmVsIiwic2V0VGltZW91dCIsInRhYmxpc3QiLCJ0YWJMaXN0V3JhcHBlciIsInRhYklkIiwidGFiUGFuZWxJZCIsInRhYlBhbmVsIiwiTWVzc2FnZVZpZXciLCJTZWFyY2hTZXJ2aWNlIiwiZmlsdGVyQnlRdWVyeSIsInByb3BlcnR5Iiwic29ydCIsImN0MSIsImN0MiIsInNjb3JlIiwiZ2V0U2VhcmNoU2NvcmUiLCJzb3J0U2VhcmNoUmVzdWx0cyIsImEiLCJiIiwicG9wdWxhcml0eSIsInF1ZXJpZXMiLCJzcGxpdCIsInF1ZXJ5U2NvcmVzIiwiZ2V0U2NvcmVGb3JFYWNoUXVlcnkiLCJ0cmltIiwiaGFzU3ViU3RyaW5nIiwiYXJyYXlIYXNTdWJTdHJpbmciLCJrZXl3b3JkcyIsIm5lZWRsZSIsImhheXN0YWNrIiwidG9Mb3dlckNhc2UiLCJzdWJTdHJpbmciLCJzdHJpbmciLCJBZGROdW1iZXIiLCJVcGxvYWRTZWN0aW9uIiwiaDVwVXBsb2FkIiwidGV4dENvbnRlbnQiLCJkYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmaWxlcyIsInVwbG9hZENvbnRlbnQiLCJzdXBwb3J0Iiwic2VhcmNoUGFyYW1zIiwiaXRlcmFibGUiLCJTeW1ib2wiLCJibG9iIiwiQmxvYiIsImFycmF5QnVmZmVyIiwidmlld0NsYXNzZXMiLCJpc0RhdGFWaWV3Iiwib2JqIiwiRGF0YVZpZXciLCJpc1Byb3RvdHlwZU9mIiwiaXNBcnJheUJ1ZmZlclZpZXciLCJBcnJheUJ1ZmZlciIsImlzVmlldyIsIk9iamVjdCIsIm5vcm1hbGl6ZU5hbWUiLCJTdHJpbmciLCJ0ZXN0IiwiVHlwZUVycm9yIiwibm9ybWFsaXplVmFsdWUiLCJpdGVyYXRvckZvciIsIml0ZW1zIiwiaXRlcmF0b3IiLCJuZXh0Iiwic2hpZnQiLCJkb25lIiwiSGVhZGVycyIsImhlYWRlcnMiLCJpc0FycmF5IiwiaGVhZGVyIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIm9sZFZhbHVlIiwiZ2V0IiwiaGFzIiwic2V0IiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwia2V5cyIsImVudHJpZXMiLCJjb25zdW1lZCIsImJvZHlVc2VkIiwiZmlsZVJlYWRlclJlYWR5IiwicmVhZGVyIiwib25sb2FkIiwib25lcnJvciIsInJlYWRCbG9iQXNBcnJheUJ1ZmZlciIsIkZpbGVSZWFkZXIiLCJwcm9taXNlIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJyZWFkQmxvYkFzVGV4dCIsInJlYWRBc1RleHQiLCJyZWFkQXJyYXlCdWZmZXJBc1RleHQiLCJidWYiLCJVaW50OEFycmF5IiwiY2hhcnMiLCJpIiwiZnJvbUNoYXJDb2RlIiwiam9pbiIsImJ1ZmZlckNsb25lIiwiYnl0ZUxlbmd0aCIsImJ1ZmZlciIsIkJvZHkiLCJfaW5pdEJvZHkiLCJfYm9keUluaXQiLCJfYm9keVRleHQiLCJfYm9keUJsb2IiLCJfYm9keUZvcm1EYXRhIiwiVVJMU2VhcmNoUGFyYW1zIiwiX2JvZHlBcnJheUJ1ZmZlciIsIkVycm9yIiwicmVqZWN0ZWQiLCJkZWNvZGUiLCJKU09OIiwicGFyc2UiLCJtZXRob2RzIiwibm9ybWFsaXplTWV0aG9kIiwidXBjYXNlZCIsInRvVXBwZXJDYXNlIiwiUmVxdWVzdCIsImlucHV0Iiwib3B0aW9ucyIsIm1vZGUiLCJyZWZlcnJlciIsImNsb25lIiwiZm9ybSIsImJ5dGVzIiwicmVwbGFjZSIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhcnNlSGVhZGVycyIsInJhd0hlYWRlcnMiLCJwcmVQcm9jZXNzZWRIZWFkZXJzIiwibGluZSIsInBhcnRzIiwia2V5IiwiUmVzcG9uc2UiLCJib2R5SW5pdCIsInN0YXR1cyIsIm9rIiwic3RhdHVzVGV4dCIsInJlZGlyZWN0U3RhdHVzZXMiLCJyZWRpcmVjdCIsIlJhbmdlRXJyb3IiLCJsb2NhdGlvbiIsInJlcXVlc3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInJlc3BvbnNlVVJMIiwicmVzcG9uc2VUZXh0Iiwib250aW1lb3V0Iiwib3BlbiIsIndpdGhDcmVkZW50aWFscyIsInJlc3BvbnNlVHlwZSIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwicG9seWZpbGwiLCJBVFRSSUJVVEVfU0laRSIsImRpc2FibGUiLCJlbmFibGUiLCJ0b2dnbGVFbmFibGVkIiwiZW5hYmxlZCIsImhpZGRlbiIsImlzRGlzYWJsZWQiLCJ1cGRhdGVWaWV3IiwicHJldkJ1dHRvbiIsIm5leHRCdXR0b24iLCJsaXN0IiwidG90YWxDb3VudCIsInN0eWxlIiwid2lkdGgiLCJkaXNwbGF5Q291bnQiLCJtYXJnaW5MZWZ0IiwicG9zaXRpb24iLCJvbk5hdmlnYXRpb25CdXR0b25DbGljayIsInVwZGF0ZVN0YXRlIiwiaW5pdEltYWdlIiwidGFyZ2V0SWQiLCJoYW5kbGVEb21VcGRhdGUiLCJyZWNvcmQiLCJhZGRlZE5vZGVzIiwic3VidHJlZSIsImNoaWxkTGlzdCIsInVuU2VsZWN0QWxsIiwidW5FeHBhbmQiLCJtZW51SXRlbSIsInRhYnMiLCJ0YWJQYW5lbHMiLCJyZXF1aXJlIiwiSDVQIiwiSHViQ2xpZW50IiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUE7OztBQUdPLElBQU1BLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxTQUFPO0FBQzdCQyxlQUFXLEVBRGtCOztBQUc3Qjs7Ozs7Ozs7OztBQVVBQyxRQUFJLFlBQVNDLElBQVQsRUFBZUMsUUFBZixFQUF5QkMsS0FBekIsRUFBZ0M7QUFDbEM7Ozs7O0FBS0EsVUFBTUMsVUFBVTtBQUNkLG9CQUFZRixRQURFO0FBRWQsaUJBQVNDO0FBRkssT0FBaEI7O0FBS0EsV0FBS0osU0FBTCxDQUFlRSxJQUFmLElBQXVCLEtBQUtGLFNBQUwsQ0FBZUUsSUFBZixLQUF3QixFQUEvQztBQUNBLFdBQUtGLFNBQUwsQ0FBZUUsSUFBZixFQUFxQkksSUFBckIsQ0FBMEJELE9BQTFCOztB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QUFNNE0sTUFBTixDQUFhaEssWUFBYixDQUEwQixlQUExQixFQUEyQyxNQUEzQzs7QUFFQXNGLGNBQVFrVixTQUFSOztBQUVBLFVBQUl4TCxhQUFhNVIsTUFBTTRNLE1BQU4sQ0FBYW5LLFlBQWIsQ0FBMEIsZUFBMUIsQ0FBakI7QUFDQXNCLFdBQUtHLFFBQVFkLGFBQVIsT0FBMEJ3TyxVQUExQixDQUFMO0FBQ0QsS0FURDtBQVVELEdBWEQ7QUFZRCxDOzs7Ozs7Ozs7QUN2Q0QsbUJBQUF5TCxDQUFRLENBQVI7O0FBRUE7QUFDQUMsTUFBTUEsT0FBTyxFQUFiO0FBQ0FBLElBQUlDLFNBQUosR0FBZ0IsbUJBQUFGLENBQVEsQ0FBUixFQUEwQkcsT0FBMUM7QUFDQUYsSUFBSUMsU0FBSixDQUFjaFosa0JBQWQsR0FBbUMsbUJBQUE4WSxDQUFRLENBQVIsRUFBbUNHLE9BQXRFLEMiLCJmaWxlIjoiaDVwLWh1Yi1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWM1YmVlOTZjNDk0MjdiMmM0ZTQiLCIvKipcclxuICogQG1peGluXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRXZlbnRmdWwgPSAoKSA9PiAoe1xyXG4gIGxpc3RlbmVyczoge30sXHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3RlbiB0byBldmVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbc2NvcGVdXHJcbiAgICpcclxuICAgKiBAZnVuY3Rpb25cclxuICAgKiBAcmV0dXJuIHtFdmVudGZ1bH1cclxuICAgKi9cclxuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlZGVmIHtvYmplY3R9IFRyaWdnZXJcclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXHJcbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2NvcGVcclxuICAgICAqL1xyXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcclxuICAgICAgJ2xpc3RlbmVyJzogbGlzdGVuZXIsXHJcbiAgICAgICdzY29wZSc6IHNjb3BlXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XHJcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxyXG4gICAqXHJcbiAgICogQGZ1bmN0aW9uXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBmaXJlOiBmdW5jdGlvbih0eXBlLCBldmVudCkge1xyXG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcclxuXHJcbiAgICByZXR1cm4gdHJpZ2dlcnMuZXZlcnkoZnVuY3Rpb24odHJpZ2dlcikge1xyXG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3RlbnMgZm9yIGV2ZW50cyBvbiBhbm90aGVyIEV2ZW50ZnVsLCBhbmQgcHJvcGFnYXRlIGl0IHRyb3VnaCB0aGlzIEV2ZW50ZnVsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB0eXBlc1xyXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IGV2ZW50ZnVsXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtldmVudE5hbWVdIHRoZSBuYW1lIG9mIHRoZSBldmVudCB3aGVuIHByb3BvZ2F0ZWRcclxuICAgKi9cclxuICBwcm9wYWdhdGU6IGZ1bmN0aW9uKHR5cGVzLCBldmVudGZ1bCwgbmV3VHlwZSkge1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgdHlwZXMuZm9yRWFjaCh0eXBlID0+IGV2ZW50ZnVsLm9uKHR5cGUsIGV2ZW50ID0+IHNlbGYuZmlyZShuZXdUeXBlIHx8IHR5cGUsIGV2ZW50KSkpO1xyXG4gIH1cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsIi8qKlxyXG4gKiBSZXR1cm5zIGEgY3VycmllZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjdXJyeSA9IGZ1bmN0aW9uKGZuKSB7XHJcbiAgY29uc3QgYXJpdHkgPSBmbi5sZW5ndGg7XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiBmMSgpIHtcclxuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG4gICAgaWYgKGFyZ3MubGVuZ3RoID49IGFyaXR5KSB7XHJcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmdzKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gZjIoKSB7XHJcbiAgICAgICAgY29uc3QgYXJnczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG4gICAgICAgIHJldHVybiBmMS5hcHBseShudWxsLCBhcmdzLmNvbmNhdChhcmdzMikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wb3NlIGZ1bmN0aW9ucyB0b2dldGhlciwgZXhlY3V0aW5nIGZyb20gcmlnaHQgdG8gbGVmdFxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uLi4ufSBmbnNcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY29tcG9zZSA9ICguLi5mbnMpID0+IGZucy5yZWR1Y2UoKGYsIGcpID0+ICguLi5hcmdzKSA9PiBmKGcoLi4uYXJncykpKTtcclxuXHJcbi8qKlxyXG4gKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBlbGVtZW50IGluIGFuIGFycmF5XHJcbiAqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBmb3JFYWNoID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcclxuICBhcnIuZm9yRWFjaChmbik7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIE1hcHMgYSBmdW5jdGlvbiB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWFwID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcclxuICByZXR1cm4gYXJyLm1hcChmbik7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEFwcGxpZXMgYSBmaWx0ZXIgdG8gYW4gYXJyYXlcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XHJcbiAgcmV0dXJuIGFyci5maWx0ZXIoZm4pO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBBcHBsaWVzIGEgc29tZSB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc29tZSA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XHJcbiAgcmV0dXJuIGFyci5zb21lKGZuKTtcclxufSk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgdmFsdWVcclxuICpcclxuICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSBjdXJyeShmdW5jdGlvbiAodmFsdWUsIGFycikge1xyXG4gIHJldHVybiBhcnIuaW5kZXhPZih2YWx1ZSkgIT0gLTE7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgc3VwcGxpZWQgdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlc1xyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgd2l0aG91dCA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZXMsIGFycikge1xyXG4gIHJldHVybiBmaWx0ZXIodmFsdWUgPT4gIWNvbnRhaW5zKHZhbHVlLCB2YWx1ZXMpLCBhcnIpXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFRha2VzIGEgc3RyaW5nIHRoYXQgaXMgZWl0aGVyICd0cnVlJyBvciAnZmFsc2UnIGFuZCByZXR1cm5zIHRoZSBvcHBvc2l0ZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYm9vbFxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBpbnZlcnNlQm9vbGVhblN0cmluZyA9IGZ1bmN0aW9uIChib29sKSB7XHJcbiAgcmV0dXJuIChib29sICE9PSAndHJ1ZScpLnRvU3RyaW5nKCk7XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9mdW5jdGlvbmFsLmpzIiwiaW1wb3J0IHtjdXJyeSwgaW52ZXJzZUJvb2xlYW5TdHJpbmd9IGZyb20gJy4vZnVuY3Rpb25hbCdcclxuXHJcbi8qKlxyXG4gKiBHZXQgYW4gYXR0cmlidXRlIHZhbHVlIGZyb20gZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldEF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpKTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgYW4gYXR0cmlidXRlIG9uIGEgaHRtbCBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBzZXRBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgdmFsdWUsIGVsKSA9PiBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpKTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYXR0cmlidXRlIGZyb20gaHRtbCBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlbW92ZUF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpKTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaGFzQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5oYXNBdHRyaWJ1dGUobmFtZSkpO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZSB0aGF0IGVxdWFsc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYXR0cmlidXRlRXF1YWxzID0gY3VycnkoKG5hbWUsIHZhbHVlLCBlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpID09PSB2YWx1ZSk7XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyBhbiBhdHRyaWJ1dGUgYmV0d2VlbiAndHJ1ZScgYW5kICdmYWxzZSc7XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRvZ2dsZUF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gZ2V0QXR0cmlidXRlKG5hbWUsIGVsKTtcclxuICBzZXRBdHRyaWJ1dGUobmFtZSwgaW52ZXJzZUJvb2xlYW5TdHJpbmcodmFsdWUpLCBlbCk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBhcHBlbmRDaGlsZCgpIG1ldGhvZCBhZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0IG9mIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWVkIHBhcmVudCBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGFwcGVuZENoaWxkID0gY3VycnkoKHBhcmVudCwgY2hpbGQpID0+IHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCkpO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyBhIGRlc2NlbmRhbnQgb2YgdGhlIGVsZW1lbnQgb24gd2hpY2ggaXQgaXMgaW52b2tlZFxyXG4gKiB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBzZWxlY3RvcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvciA9IGN1cnJ5KChzZWxlY3RvciwgZWwpID0+IGVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgbm9uLWxpdmUgTm9kZUxpc3Qgb2YgYWxsIGVsZW1lbnRzIGRlc2NlbmRlZCBmcm9tIHRoZSBlbGVtZW50IG9uIHdoaWNoIGl0XHJcbiAqIGlzIGludm9rZWQgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2YgQ1NTIHNlbGVjdG9ycy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJuIHtOb2RlTGlzdH1cclxuICovXHJcbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yQWxsID0gY3VycnkoKHNlbGVjdG9yLCBlbCkgPT4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xyXG5cclxuLyoqXHJcbiAqIFRoZSByZW1vdmVDaGlsZCgpIG1ldGhvZCByZW1vdmVzIGEgY2hpbGQgbm9kZSBmcm9tIHRoZSBET00uIFJldHVybnMgcmVtb3ZlZCBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IHBhcmVudFxyXG4gKiBAcGFyYW0ge05vZGV9IG9sZENoaWxkXHJcbiAqXHJcbiAqIEByZXR1cm4ge05vZGV9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2hpbGQgPSBjdXJyeSgocGFyZW50LCBvbGRDaGlsZCkgPT4gcGFyZW50LnJlbW92ZUNoaWxkKG9sZENoaWxkKSk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIGEgbm9kZSBoYXMgYSBjbGFzc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xzXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNsYXNzTGlzdENvbnRhaW5zID0gY3VycnkoKGNscywgZWwpID0+IGVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMpKTtcclxuXHJcbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIGEgTm9kZUxpc3QgdG8gYW4gQXJyYXlcclxuICpcclxuICogQHBhcmFtIHtOb2RlTGlzdH0gbm9kZUxpc3RcclxuICpcclxuICogQHJldHVybiB7Tm9kZVtdfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG5vZGVMaXN0VG9BcnJheSA9IG5vZGVMaXN0ID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVMaXN0KTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFyaWEtaGlkZGVuPXRydWUgdG8gYW4gZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFyaWEtaGlkZGVuPWZhbHNlIHRvIGFuIGVsZW1lbnRcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcclxuXHJcbi8qKlxyXG4gKiBUb2dnbGVzIGFyaWEtaGlkZGVuIG9uIGFuIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICovXHJcbmV4cG9ydCBjb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gY3VycnkoKHZpc2libGUsIGVsZW1lbnQpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xyXG5cclxuLyoqXHJcbiAqICBUcmFuc2Zvcm1zIGEgRE9NIGNsaWNrIGV2ZW50IGludG8gYW4gRXZlbnRmdWwncyBldmVudFxyXG4gKiAgQHNlZSBFdmVudGZ1bFxyXG4gKlxyXG4gKiBAcGFyYW0gIHtzdHJpbmcgfCBPYmplY3R9IHR5cGVcclxuICogQHBhcmFtICB7RXZlbnRmdWx9IGV2ZW50ZnVsXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlbGF5Q2xpY2tFdmVudEFzID0gY3VycnkoZnVuY3Rpb24odHlwZSwgZXZlbnRmdWwsIGVsZW1lbnQpIHtcclxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgZXZlbnRmdWwuZmlyZSh0eXBlLCB7XHJcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXHJcbiAgICAgIGlkOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXHJcbiAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgLy8gZG9uJ3QgYnViYmxlXHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGVsZW1lbnQ7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCIvKipcclxuICogQHBhcmFtICB7c3RyaW5nfSAgIGNvbmZpZy50eXBlICAgICAgICAgdHlwZSBvZiB0aGUgbWVzc2FnZTogaW5mbywgc3VjY2VzcywgZXJyb3JcclxuICogQHBhcmFtICB7Ym9vbGVhbn0gIGNvbmZpZy5kaXNtaXNzaWJsZSAgd2hldGhlciB0aGUgbWVzc2FnZSBjYW4gYmUgZGlzbWlzc2VkXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcuY29udGVudCAgICAgIG1lc3NhZ2UgY29udGVudCB1c3VhbGx5IGEgJ2gzJyBhbmQgYSAncCdcclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9IGRpdiBjb250YWluaW5nIHRoZSBtZXNzYWdlIGVsZW1lbnRcclxuICovXHJcblxyXG4vL1RPRE8gaGFuZGxlIHN0cmluZ3MsIGh0bWwsIGJhZGx5IGZvcm1lZCBvYmplY3RcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyRXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XHJcbiAgY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyYjeDI3MTUnO1xyXG5cclxuICBjb25zdCBtZXNzYWdlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIG1lc3NhZ2VDb250ZW50LmNsYXNzTmFtZSA9ICdtZXNzYWdlLWNvbnRlbnQnO1xyXG4gIG1lc3NhZ2VDb250ZW50LmlubmVySFRNTCA9ICc8aDE+JyArIG1lc3NhZ2UudGl0bGUgKyAnPC9oMT4nICsgJzxwPicgKyBtZXNzYWdlLmNvbnRlbnQgKyAnPC9wPic7XHJcblxyXG4gIGNvbnN0IG1lc3NhZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbWVzc2FnZVdyYXBwZXIuY2xhc3NOYW1lID0gJ21lc3NhZ2UnICsgJyAnICsgYCR7bWVzc2FnZS50eXBlfWAgKyAobWVzc2FnZS5kaXNtaXNzaWJsZSA/ICcgZGlzbWlzc2libGUnIDogJycpO1xyXG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcclxuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGVudCk7XHJcblxyXG4gIGlmIChtZXNzYWdlLmJ1dHRvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBtZXNzYWdlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24nO1xyXG4gICAgbWVzc2FnZUJ1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlLmJ1dHRvbjtcclxuICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VCdXR0b24pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJpbXBvcnQge2luaXRDb2xsYXBzaWJsZX0gZnJvbSAnLi4vdXRpbHMvYXJpYSc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xyXG4gIGluaXRDb2xsYXBzaWJsZShlbGVtZW50KTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsImltcG9ydCB7YXR0cmlidXRlRXF1YWxzLCB0b2dnbGVBdHRyaWJ1dGUsIHRvZ2dsZVZpc2liaWxpdHl9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYXJpYS1leHBhbmRlZD10cnVlIG9uIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IGlzRXhwYW5kZWQgPSBhdHRyaWJ1dGVFcXVhbHMoXCJhcmlhLWV4cGFuZGVkXCIsICd0cnVlJyk7XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyBhcmlhLWhpZGRlbiBvbiAnY29sbGFwc2libGUnIHdoZW4gYXJpYS1leHBhbmRlZCBjaGFuZ2VzIG9uICd0b2dnbGVyJyxcclxuICogYW5kIHRvZ2dsZXMgYXJpYS1leHBhbmRlZCBvbiAndG9nZ2xlcicgb24gY2xpY2tcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGluaXRDb2xsYXBzaWJsZSA9IChlbGVtZW50KSA9PiB7XHJcbiAgLy8gZWxlbWVudHNcclxuICBjb25zdCB0b2dnbGVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1jb250cm9sc11bYXJpYS1leHBhbmRlZF0nKTtcclxuICBjb25zdCBjb2xsYXBzaWJsZUlkID0gdG9nZ2xlci5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcclxuICBjb25zdCBjb2xsYXBzaWJsZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y29sbGFwc2libGVJZH1gKTtcclxuXHJcbiAgLy8gc2V0IG9ic2VydmVyIG9uIHRpdGxlIGZvciBhcmlhLWV4cGFuZGVkXHJcbiAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdG9nZ2xlVmlzaWJpbGl0eShpc0V4cGFuZGVkKHRvZ2dsZXIpLCBjb2xsYXBzaWJsZSkpO1xyXG5cclxuICBvYnNlcnZlci5vYnNlcnZlKHRvZ2dsZXIsIHtcclxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcclxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW1wiYXJpYS1leHBhbmRlZFwiXVxyXG4gIH0pO1xyXG5cclxuICAvLyBTZXQgY2xpY2sgbGlzdGVuZXIgdGhhdCB0b2dnbGVzIGFyaWEtZXhwYW5kZWRcclxuICB0b2dnbGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlQXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCB0b2dnbGVyKSk7XHJcblxyXG4gIC8vIGluaXRpYWxpemVcclxuICB0b2dnbGVWaXNpYmlsaXR5KGlzRXhwYW5kZWQodG9nZ2xlciksIGNvbGxhcHNpYmxlKTtcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2FyaWEuanMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ01DQTBNREFnTWpJMUlqNE5DaUFnUEdSbFpuTStEUW9nSUNBZ1BITjBlV3hsUGcwS0lDQWdJQ0FnTG1Oc2N5MHhJSHNOQ2lBZ0lDQWdJR1pwYkd3NklHNXZibVU3RFFvZ0lDQWdJQ0I5RFFvTkNpQWdJQ0FnSUM1amJITXRNaUI3RFFvZ0lDQWdJQ0JtYVd4c09pQWpZelpqTm1NM093MEtJQ0FnSUNBZ2ZRMEtEUW9nSUNBZ0lDQXVZMnh6TFRNc0lDNWpiSE10TkNCN0RRb2dJQ0FnSUNCbWFXeHNPaUFqWm1abU93MEtJQ0FnSUNBZ2ZRMEtEUW9nSUNBZ0lDQXVZMnh6TFRNZ2V3MEtJQ0FnSUNBZ2IzQmhZMmwwZVRvZ01DNDNPdzBLSUNBZ0lDQWdmUTBLSUNBZ0lEd3ZjM1I1YkdVK0RRb2dJRHd2WkdWbWN6NE5DaUFnUEhScGRHeGxQbU52Ym5SbGJuUWdkSGx3WlNCd2JHRmpaV2h2YkdSbGNsOHlQQzkwYVhSc1pUNE5DaUFnUEdjZ2FXUTlJa3hoZVdWeVh6SWlJR1JoZEdFdGJtRnRaVDBpVEdGNVpYSWdNaUkrRFFvZ0lDQWdQR2NnYVdROUltTnZiblJsYm5SZmRIbHdaVjl3YkdGalpXaHZiR1JsY2kweFgyTnZjSGtpSUdSaGRHRXRibUZ0WlQwaVkyOXVkR1Z1ZENCMGVYQmxJSEJzWVdObGFHOXNaR1Z5TFRFZ1kyOXdlU0krRFFvZ0lDQWdJQ0E4Y21WamRDQmpiR0Z6Y3owaVkyeHpMVEVpSUhkcFpIUm9QU0kwTURBaUlHaGxhV2RvZEQwaU1qSTFJaTgrRFFvZ0lDQWdJQ0E4Y21WamRDQmpiR0Z6Y3owaVkyeHpMVElpSUhnOUlqRXhNaTQxTVNJZ2VUMGlORE11TkRFaUlIZHBaSFJvUFNJeE56WXVPVFlpSUdobGFXZG9kRDBpTVRNMUxqUTFJaUJ5ZUQwaU1UQWlJSEo1UFNJeE1DSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhNell1TmpZaUlHTjVQU0kyTVM0NU9DSWdjajBpTkM0NE1TSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhOVEV1TkRraUlHTjVQU0kyTVM0NU9DSWdjajBpTkM0NE1TSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhOall1TVNJZ1kzazlJall4TGprNElpQnlQU0kwTGpneElpOCtEUW9nSUNBZ0lDQThaeUJwWkQwaVgwZHliM1Z3WHlJZ1pHRjBZUzF1WVcxbFBTSW1iSFE3UjNKdmRYQW1aM1E3SWo0TkNpQWdJQ0FnSUNBZ1BHY2dhV1E5SWw5SGNtOTFjRjh5SWlCa1lYUmhMVzVoYldVOUlpWnNkRHRIY205MWNDWm5kRHNpUGcwS0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdsa1BTSmZRMjl0Y0c5MWJtUmZVR0YwYUY4aUlHUmhkR0V0Ym1GdFpUMGlKbXgwTzBOdmJYQnZkVzVrSUZCaGRHZ21aM1E3SWlCamJHRnpjejBpWTJ4ekxUUWlJR1E5SWsweU5qTXVNamdzT1RVdU1qRkRNall3TERreUxqQTNMREkxTlN3NU1TNDFMREkwT0M0ME15dzVNUzQxU0RJeU4zWTRTREU1T1M0MWJDMHlMakUzTERFd0xqSTBZVEkxTGpnMExESTFMamcwTERBc01Dd3hMREV4TGpRNExURXVOak1zTVRrdU9UTXNNVGt1T1RNc01Dd3dMREVzTVRRdU16a3NOUzQxTnl3eE9DNHlOaXd4T0M0eU5pd3dMREFzTVN3MUxqVXlMREV6TGpZc01qTXVNVEVzTWpNdU1URXNNQ3d3TERFdE1pNDROQ3d4TVM0d05Td3hPQzQyTlN3eE9DNDJOU3d3TERBc01TMDRMakEyTERjdU56a3NPU3c1TERBc01Dd3hMVFF1TVRJc01TNHpOMGd5TXpaMkxUSXhhREV3TGpReVl6Y3VNellzTUN3eE1pNDRNeTB4TGpZeExERTJMalF5TFRWek5TNHpPQzAzTGpRNExEVXVNemd0TVRNdU5EUkRNalk0TGpJeUxERXdNaTR5T1N3eU5qWXVOVGNzT1RndU16VXNNall6TGpJNExEazFMakl4V20wdE1UVXNNVGRqTFRFdU5ESXNNUzR5TWkwekxqa3NNUzR5TlMwM0xqUXhMREV1TWpWSU1qTTJkaTB4TkdnMUxqWXlZVGt1TlRjc09TNDFOeXd3TERBc01TdzNMREl1T1RNc055NHdOU3czTGpBMUxEQXNNQ3d4TERFdU9EVXNOQzQ1TWtFMkxqTXpMRFl1TXpNc01Dd3dMREVzTWpRNExqTXhMREV4TWk0eU5Wb2lMejROQ2lBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JwWkQwaVgxQmhkR2hmSWlCa1lYUmhMVzVoYldVOUlpWnNkRHRRWVhSb0ptZDBPeUlnWTJ4aGMzTTlJbU5zY3kwMElpQmtQU0pOTWpBeUxqa3NNVEU1TGpFeFlUZ3VNVElzT0M0eE1pd3dMREFzTUMwM0xqSTRMRFF1TlRKc0xURTJMVEV1TWpJc055NHlNaTB6TUM0NU1rZ3hOelIyTWpKSU1UVXpkaTB5TWtneE16WjJOVFpvTVRkMkxUSXhhREl4ZGpJeGFESXdMak14WXkweUxqY3lMREF0TlMweExqVXpMVGN0TTJFeE9TNHhPU3d4T1M0eE9Td3dMREFzTVMwMExqY3pMVFF1T0RNc01qTXVOVGdzTWpNdU5UZ3NNQ3d3TERFdE15MDJMalpzTVRZdE1pNHlObUU0TGpFeExEZ3VNVEVzTUN3eExEQXNOeTR5TmkweE1TNDNNbG9pTHo0TkNpQWdJQ0FnSUNBZ1BDOW5QZzBLSUNBZ0lDQWdQQzluUGcwS0lDQWdJQ0FnUEhKbFkzUWdZMnhoYzNNOUltTnNjeTB6SWlCNFBTSXhOemN1TmpZaUlIazlJalUzTGpZMklpQjNhV1IwYUQwaU9USXVNamdpSUdobGFXZG9kRDBpT1M0ek9DSWdjbmc5SWpNdU5TSWdjbms5SWpNdU5TSXZQZzBLSUNBZ0lEd3ZaejROQ2lBZ1BDOW5QZzBLUEM5emRtYytEUW89XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Z1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgSHViVmlldyBmcm9tICcuL2h1Yi12aWV3JztcclxuaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvbiBmcm9tICcuL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uJztcclxuaW1wb3J0IFVwbG9hZFNlY3Rpb24gZnJvbSAnLi91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbic7XHJcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tICcuL2h1Yi1zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi91dGlscy9lcnJvcnMnO1xyXG4vKipcclxuICogQHR5cGVkZWYge29iamVjdH0gSHViU3RhdGVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRpdGxlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWN0aW9uSWRcclxuICogQHByb3BlcnR5IHtib29sZWFufSBleHBhbmRlZFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYXBpUm9vdFVybFxyXG4gKi9cclxuLyoqXHJcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEVycm9yTWVzc2FnZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWVzc2FnZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXJyb3JDb2RlXHJcbiAqL1xyXG4vKipcclxuICogQHR5cGVkZWYge29iamVjdH0gU2VsZWN0ZWRFbGVtZW50XHJcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlkXHJcbiAqL1xyXG4vKipcclxuICogU2VsZWN0IGV2ZW50XHJcbiAqIEBldmVudCBIdWIjc2VsZWN0XHJcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XHJcbiAqL1xyXG4vKipcclxuICogRXJyb3IgZXZlbnRcclxuICogQGV2ZW50IEh1YiNlcnJvclxyXG4gKiBAdHlwZSB7RXJyb3JNZXNzYWdlfVxyXG4gKi9cclxuLyoqXHJcbiAqIFVwbG9hZCBldmVudFxyXG4gKiBAZXZlbnQgSHViI3VwbG9hZFxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuLyoqXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICogQGZpcmVzIEh1YiNzZWxlY3RcclxuICogQGZpcmVzIEh1YiNlcnJvclxyXG4gKiBAZmlyZXMgSHViI3VwbG9hZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8vIHNlcnZpY2VzXHJcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcclxuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gY29udHJvbGxlcnNcclxuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uID0gbmV3IENvbnRlbnRUeXBlU2VjdGlvbihzdGF0ZSwgdGhpcy5zZXJ2aWNlcyk7XHJcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSwgdGhpcy5zZXJ2aWNlcyk7XHJcblxyXG4gICAgLy8gdmlld3NcclxuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcclxuXHJcbiAgICAvLyBwcm9wYWdhdGUgY29udHJvbGxlciBldmVudHNcclxuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0J10sIHRoaXMuY29udGVudFR5cGVTZWN0aW9uKTtcclxuICAgIHRoaXMucHJvcGFnYXRlKFsndXBsb2FkJ10sIHRoaXMudXBsb2FkU2VjdGlvbik7XHJcblxyXG4gICAgLy8gaGFuZGxlIGV2ZW50c1xyXG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy5zZXRQYW5lbFRpdGxlLCB0aGlzKTtcclxuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMudmlldy5jbG9zZVBhbmVsLCB0aGlzLnZpZXcpO1xyXG4gICAgdGhpcy52aWV3Lm9uKCd0YWItY2hhbmdlJywgdGhpcy52aWV3LnNldFNlY3Rpb25UeXBlLCB0aGlzLnZpZXcpO1xyXG4gICAgdGhpcy52aWV3Lm9uKCdwYW5lbC1jaGFuZ2UnLCB0aGlzLnZpZXcudG9nZ2xlUGFuZWxPcGVuLmJpbmQodGhpcy52aWV3KSwgdGhpcy52aWV3KTtcclxuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uLm9uKCdyZWxvYWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgc2VsZi5zZXJ2aWNlcy5zZXR1cCgpO1xyXG4gICAgICBzZWxmLmNvbnRlbnRUeXBlU2VjdGlvbi5pbml0Q29udGVudFR5cGVMaXN0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmluaXRUYWJQYW5lbChzdGF0ZSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBjb250ZW50IHR5cGVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XHJcbiAgICovXHJcbiAgZ2V0Q29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHRpdGxlIG9mIHRoZSBwYW5lbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICovXHJcbiAgc2V0UGFuZWxUaXRsZSh7aWR9KcKge1xyXG4gICAgdGhpcy5nZXRDb250ZW50VHlwZShpZCkudGhlbigoe3RpdGxlfSkgPT4gdGhpcy52aWV3LnNldFRpdGxlKHRpdGxlKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWF0ZXMgdGhlIHRhYiBwYW5lbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxyXG4gICAqL1xyXG4gIGluaXRUYWJQYW5lbCh7IHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJyB9KSB7XHJcbiAgICBjb25zdCB0YWJDb25maWdzID0gW3tcclxuICAgICAgdGl0bGU6ICdDcmVhdGUgQ29udGVudCcsXHJcbiAgICAgIGlkOiAnY29udGVudC10eXBlcycsXHJcbiAgICAgIGNvbnRlbnQ6IHRoaXMuY29udGVudFR5cGVTZWN0aW9uLmdldEVsZW1lbnQoKSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRpdGxlOiAnVXBsb2FkJyxcclxuICAgICAgaWQ6ICd1cGxvYWQnLFxyXG4gICAgICBjb250ZW50OiB0aGlzLnVwbG9hZFNlY3Rpb24uZ2V0RWxlbWVudCgpXHJcbiAgICB9XTtcclxuXHJcbiAgICAvLyBzZXRzIHRoZSBjb3JyZWN0IG9uZSBzZWxlY3RlZFxyXG4gICAgdGFiQ29uZmlnc1xyXG4gICAgICAuZmlsdGVyKGNvbmZpZyA9PiBjb25maWcuaWQgPT09IHNlY3Rpb25JZClcclxuICAgICAgLmZvckVhY2goY29uZmlnID0+IGNvbmZpZy5zZWxlY3RlZCA9IHRydWUpO1xyXG5cclxuICAgIHRhYkNvbmZpZ3MuZm9yRWFjaCh0YWJDb25maWcgPT4gdGhpcy52aWV3LmFkZFRhYih0YWJDb25maWcpKTtcclxuICAgIHRoaXMudmlldy5hZGRCb3R0b21Cb3JkZXIoKTsgLy8gQWRkcyBhbiBhbmltYXRlZCBib3R0b20gYm9yZGVyIHRvIGVhY2ggdGFiXHJcbiAgICB0aGlzLnZpZXcuaW5pdFRhYlBhbmVsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgaW4gdGhlIHZpZXdcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZXMvbWFpbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCByZW1vdmVDaGlsZCwgaGlkZSwgc2hvdyB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xyXG5pbXBvcnQgeyBjdXJyeSwgZm9yRWFjaCB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XHJcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcclxuaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiO1xyXG5pbXBvcnQgaW5pdEltYWdlU2Nyb2xsZXIgZnJvbSBcImNvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXJcIjtcclxuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xyXG5pbXBvcnQgbm9JY29uIGZyb20gJy4uLy4uL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnJztcclxuXHJcbi8qKlxyXG4gKiBAY29uc3RhbnQge3N0cmluZ31cclxuICovXHJcbmNvbnN0IEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQgPSAnZGF0YS1pZCc7XHJcblxyXG4vKipcclxuICogQGNvbnN0YW50IHtudW1iZXJ9XHJcbiAqL1xyXG5jb25zdCBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OID0gMzAwO1xyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgaWYgYW4gZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxyXG4gKi9cclxuY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IChlbGVtZW50LCB2aXNpYmxlKSA9PiAodmlzaWJsZSA/IHNob3cgOiBoaWRlKShlbGVtZW50KTtcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYSBzdHJpbmcgaXMgZW1wdHlcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICpcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmNvbnN0IGlzRW1wdHkgPSAodGV4dCkgPT4gKHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJykgJiYgKHRleHQubGVuZ3RoID09PSAwKTtcclxuXHJcbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKGhpZGUpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsVmlldyB7XHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHZpZXdcclxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZVZpZXcoKTtcclxuXHJcbiAgICAvLyBncmFiIHJlZmVyZW5jZXNcclxuICAgIHRoaXMuYnV0dG9uQmFyID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLWJhcicpO1xyXG4gICAgdGhpcy51c2VCdXR0b24gPSB0aGlzLmJ1dHRvbkJhci5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXVzZScpO1xyXG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsJyk7XHJcbiAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmJ1dHRvbkJhci5xdWVyeVNlbGVjdG9yQWxsKCcuYnV0dG9uJyk7XHJcblxyXG4gICAgdGhpcy5pbWFnZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtdHlwZS1pbWFnZScpO1xyXG4gICAgdGhpcy50aXRsZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZGV0YWlscyAudGl0bGUnKTtcclxuICAgIHRoaXMub3duZXIgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd25lcicpO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZGV0YWlscyAuc21hbGwnKTtcclxuICAgIHRoaXMuZGVtb0J1dHRvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRlbW8tYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNhcm91c2VsID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWwnKTtcclxuICAgIHRoaXMuY2Fyb3VzZWxMaXN0ID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xyXG4gICAgdGhpcy5saWNlbmNlUGFuZWwgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saWNlbmNlLXBhbmVsJyk7XHJcbiAgICB0aGlzLmluc3RhbGxNZXNzYWdlID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW5zdGFsbC1tZXNzYWdlJyk7XHJcblxyXG4gICAgLy8gaGlkZSBtZXNzYWdlIG9uIGNsb3NlIGJ1dHRvbiBjbGlja1xyXG4gICAgbGV0IGluc3RhbGxNZXNzYWdlQ2xvc2UgPSB0aGlzLmluc3RhbGxNZXNzYWdlLnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlLWNsb3NlJyk7XHJcbiAgICBpbnN0YWxsTWVzc2FnZUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGlkZSh0aGlzLmluc3RhbGxNZXNzYWdlKSk7XHJcblxyXG4gICAgLy8gaW5pdCBpbnRlcmFjdGl2ZSBlbGVtZW50c1xyXG4gICAgaW5pdFBhbmVsKHRoaXMubGljZW5jZVBhbmVsKTtcclxuICAgIGluaXRJbWFnZVNjcm9sbGVyKHRoaXMuY2Fyb3VzZWwpO1xyXG5cclxuICAgIC8vIGZpcmUgZXZlbnRzIG9uIGJ1dHRvbiBjbGlja1xyXG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2Nsb3NlJywgdGhpcywgdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYmFjay1idXR0b24nKSk7XHJcbiAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0JywgdGhpcywgdGhpcy51c2VCdXR0b24pO1xyXG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2luc3RhbGwnLCB0aGlzLCB0aGlzLmluc3RhbGxCdXR0b24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgdmlldyBhcyBhIEhUTUxFbGVtZW50XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBjcmVhdGVWaWV3ICgpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFjay1idXR0b24gaWNvbi1hcnJvdy10aGlja1wiPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLXdyYXBwZXJcIj48aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmUgY29udGVudC10eXBlLWltYWdlXCIgc3JjPVwiJHtub0ljb259XCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtZGV0YWlsc1wiPlxyXG4gICAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj48L2gyPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bmVyXCI+PC9kaXY+XHJcbiAgICAgICAgICA8cCBjbGFzcz1cInNtYWxsXCI+PC9wPlxyXG4gICAgICAgICAgPGEgY2xhc3M9XCJidXR0b24gZGVtby1idXR0b25cIiB0YXJnZXQ9XCJfYmxhbmtcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgaHJlZj1cIiNcIj5Db250ZW50IERlbW88L2E+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2Fyb3VzZWxcIiByb2xlPVwicmVnaW9uXCIgZGF0YS1zaXplPVwiNVwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIHByZXZpb3VzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGlzYWJsZWQ+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWJ1dHRvbiBuZXh0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGlzYWJsZWQ+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPjwvc3Bhbj5cclxuICAgICAgICA8bmF2IGNsYXNzPVwic2Nyb2xsZXJcIj5cclxuICAgICAgICAgIDx1bD48L3VsPlxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGhyIC8+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnN0YWxsLW1lc3NhZ2UgbWVzc2FnZSBkaXNtaXNzaWJsZSBzaW1wbGUgaW5mb1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlLWNsb3NlIGljb24tY2xvc2VcIj48L2Rpdj5cclxuICAgICAgICA8aDM+PC9oMz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tYmFyXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnkgYnV0dG9uLXVzZVwiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBkYXRhLWlkPVwiXCI+VXNlPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnkgYnV0dG9uLWluc3RhbGxcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkYXRhLWlkPVwiXCI+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPkluc3RhbGw8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLWludmVyc2UtcHJpbWFyeSBidXR0b24taW5zdGFsbGluZ1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxzcGFuIGNsYXNzPVwiaWNvbi1sb2FkaW5nLXNlYXJjaCBpY29uLXNwaW5cIj48L3NwYW4+SW5zdGFsbGluZzwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ncm91cFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBsaWNlbmNlLXBhbmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGVyXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1jb250cm9scz1cImxpY2VuY2UtcGFuZWxcIj48c3BhbiBjbGFzcz1cImljb24tYWNjb3JkaW9uLWFycm93XCI+PC9zcGFuPiBUaGUgTGljZW5jZSBJbmZvPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiIGlkPVwibGljZW5jZS1wYW5lbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keS1pbm5lclwiPjwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PmA7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGEgbWVzc2FnZSBvbiBpbnN0YWxsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHN1Y2Nlc3NcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxyXG4gICAqL1xyXG4gIHNldEluc3RhbGxNZXNzYWdlKHsgc3VjY2VzcyA9IHRydWUsIG1lc3NhZ2UgfSl7XHJcbiAgICB0aGlzLmluc3RhbGxNZXNzYWdlLnF1ZXJ5U2VsZWN0b3IoJ2gzJykuaW5uZXJUZXh0ID0gbWVzc2FnZTtcclxuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UuY2xhc3NOYW1lID0gYGluc3RhbGwtbWVzc2FnZSBkaXNtaXNzaWJsZSBtZXNzYWdlIHNpbXBsZSAke3N1Y2Nlc3MgPyAnaW5mbycgOiAnZXJyb3InfWA7XHJcbiAgICBzaG93KHRoaXMuaW5zdGFsbE1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgaW1hZ2VzIGZyb20gdGhlIGNhcm91c2VsXHJcbiAgICovXHJcbiAgcmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCgpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWxMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykuZm9yRWFjaChyZW1vdmVDaGlsZCh0aGlzLmNhcm91c2VsTGlzdCkpO1xyXG4gICAgdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWwtbGlnaHRib3gnKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWwpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBpbWFnZSB0byB0aGUgY2Fyb3VzZWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbWFnZVxyXG4gICAqL1xyXG4gIGFkZEltYWdlVG9DYXJvdXNlbChpbWFnZSkge1xyXG4gICAgLy8gYWRkIGxpZ2h0Ym94XHJcbiAgICBjb25zdCBsaWdodGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbGlnaHRib3guaWQgPSBgbGlnaHRib3gtJHt0aGlzLmNhcm91c2VsTGlzdC5jaGlsZEVsZW1lbnRDb3VudH1gO1xyXG4gICAgbGlnaHRib3guY2xhc3NOYW1lID0gJ2Nhcm91c2VsLWxpZ2h0Ym94JztcclxuICAgIGxpZ2h0Ym94LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG4gICAgbGlnaHRib3guaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cIiR7aW1hZ2UudXJsfVwiIGFsdD1cIiR7aW1hZ2UuYWx0fVwiPmA7XHJcbiAgICB0aGlzLmNhcm91c2VsLmFwcGVuZENoaWxkKGxpZ2h0Ym94KTtcclxuXHJcbiAgICAvLyBhZGQgdGh1bWJuYWlsXHJcbiAgICBjb25zdCB0aHVtYm5haWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgdGh1bWJuYWlsLmNsYXNzTmFtZSA9ICdzbGlkZSc7XHJcbiAgICB0aHVtYm5haWwuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHtpbWFnZS51cmx9XCIgYWx0PVwiJHtpbWFnZS5hbHR9XCIgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIGFyaWEtY29udHJvbHM9XCIke2xpZ2h0Ym94LmlkfVwiIC8+YDtcclxuICAgIHRoaXMuY2Fyb3VzZWxMaXN0LmFwcGVuZENoaWxkKHRodW1ibmFpbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldHMgdGhlIGRldGFpbCB2aWV3XHJcbiAgICovXHJcbiAgcmVzZXQoKSB7XHJcbiAgICBoaWRlKHRoaXMuaW5zdGFsbE1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgaW1hZ2VcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcclxuICAgKi9cclxuICBzZXRJbWFnZShzcmMpIHtcclxuICAgIHRoaXMuaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMgfHwgbm9JY29uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHRpdGxlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBzZXRJZChpZCkge1xyXG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XHJcbiAgICB0aGlzLnVzZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdGl0bGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxyXG4gICAqL1xyXG4gIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IGAke3RpdGxlfWA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gICAqL1xyXG4gIHNldERlc2NyaXB0aW9uKHRleHQpIHtcclxuICAgIGlmKHRleHQubGVuZ3RoID4gTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTikge1xyXG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9PHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xyXG4gICAgICB0aGlzLmRlc2NyaXB0aW9uXHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5yZWFkLW1vcmUsIC5yZWFkLWxlc3MnKVxyXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XHJcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gdGV4dDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZXMgUmVhZCBsZXNzIGFuZCBSZWFkIG1vcmUgdGV4dFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgKi9cclxuICB0b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkKHRleHQpIHtcclxuICAgIC8vIGZsaXAgYm9vbGVhblxyXG4gICAgdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkID0gIXRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZDtcclxuXHJcbiAgICBpZih0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQpIHtcclxuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0ZXh0fTxzcGFuIGNsYXNzPVwicmVhZC1sZXNzIGxpbmtcIj5SZWFkIGxlc3M8L3NwYW4+YDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9PHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZGVzY3JpcHRpb25cclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5yZWFkLW1vcmUsIC5yZWFkLWxlc3MnKVxyXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZURlc2NyaXB0aW9uRXhwYW5kZWQodGV4dCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvcnRlbnMgYSBzdHJpbmcsIGFuZCBwdXRzIGFuIGVsaXBzaXMgYXQgdGhlIGVuZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNpemVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gICAqL1xyXG4gIGVsbGlwc2lzKHNpemUsIHRleHQpIHtcclxuICAgIHJldHVybiBgJHt0ZXh0LnN1YnN0cigwLCBzaXplKX0uLi5gO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgbGljZW5jZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgKi9cclxuICBzZXRMaWNlbmNlKHR5cGUpIHtcclxuICAgIGlmKHR5cGUpe1xyXG4gICAgICB0aGlzLmxpY2VuY2VQYW5lbC5xdWVyeVNlbGVjdG9yKCcucGFuZWwtYm9keS1pbm5lcicpLmlubmVyVGV4dCA9IHR5cGU7XHJcbiAgICAgIHNob3codGhpcy5saWNlbmNlUGFuZWwpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGhpZGUodGhpcy5saWNlbmNlUGFuZWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgbG9uZyBkZXNjcmlwdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyXHJcbiAgICovXHJcbiAgc2V0T3duZXIob3duZXIpIHtcclxuICAgIGlmKG93bmVyKSB7XHJcbiAgICAgIHRoaXMub3duZXIuaW5uZXJIVE1MID0gYEJ5ICR7b3duZXJ9YDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLm93bmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgZXhhbXBsZSB1cmxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcclxuICAgKi9cclxuICBzZXRFeGFtcGxlKHVybCkge1xyXG4gICAgdGhpcy5kZW1vQnV0dG9uLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCB8fCAnIycpO1xyXG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmRlbW9CdXR0b24sICFpc0VtcHR5KHVybCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBpZiB0aGUgY29udGVudCB0eXBlIGlzIGluc3RhbGxlZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBpbnN0YWxsZWRcclxuICAgKi9cclxuICBzZXRJc0luc3RhbGxlZChpbnN0YWxsZWQpIHtcclxuICAgIHRoaXMuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoaW5zdGFsbGVkID8gJy5idXR0b24tdXNlJyA6ICcuYnV0dG9uLWluc3RhbGwnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGVzIGFsbCBidXR0b25zIGFuZCBzaG93cyB0aGUgYnV0dG9uIG9uIHRoZSBzZWxlY3RvciBhZ2FpblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9c2VsZWN0b3JcclxuICAgKi9cclxuICBzaG93QnV0dG9uQnlTZWxlY3RvcihzZWxlY3Rvcikge1xyXG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcblxyXG4gICAgaWYoYnV0dG9uKSB7XHJcbiAgICAgIGhpZGVBbGwodGhpcy5idXR0b25zKTtcclxuICAgICAgc2hvdyhidXR0b24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxyXG4gICAqL1xyXG4gIGhpZGUoKSB7XHJcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxyXG4gICAqL1xyXG4gIHNob3coKSB7XHJcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBnZXRFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZURldGFpbFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWRldGFpbC12aWV3XCI7XHJcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3NcclxuICogQG1peGVzIEV2ZW50ZnVsXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbCB7XHJcbiAgY29uc3RydWN0b3Ioc3RhdGUsIHNlcnZpY2VzKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIHNlcnZpY2VzXHJcbiAgICB0aGlzLnNlcnZpY2VzID0gc2VydmljZXM7XHJcblxyXG4gICAgLy8gdmlld3NcclxuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlRGV0YWlsVmlldyhzdGF0ZSk7XHJcbiAgICB0aGlzLnZpZXcub24oJ2luc3RhbGwnLCB0aGlzLmluc3RhbGwsIHRoaXMpO1xyXG5cclxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcclxuICAgIHRoaXMucHJvcGFnYXRlKFsnY2xvc2UnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlcyB0aGUgZGV0YWlsIHZpZXdcclxuICAgKi9cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy52aWV3LmhpZGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRoZSBkZXRhaWwgdmlld1xyXG4gICAqL1xyXG4gIHNob3coKSB7XHJcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxyXG4gICAqL1xyXG4gIGxvYWRCeUlkKGlkKSB7XHJcbiAgICB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxyXG4gICAgICAudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxyXG4gICAqL1xyXG4gICBpbnN0YWxsKHtpZH0pIHtcclxuICAgICAvLyBzZXQgc3Bpbm5lclxyXG4gICAgIHRoaXMudmlldy5zaG93QnV0dG9uQnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsaW5nJyk7XHJcblxyXG4gICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxyXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gdGhpcy5zZXJ2aWNlcy5pbnN0YWxsQ29udGVudFR5cGUoY29udGVudFR5cGUubWFjaGluZU5hbWUpKVxyXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4ge1xyXG4gICAgICAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQodHJ1ZSk7XHJcbiAgICAgICAgIHRoaXMudmlldy5zaG93QnV0dG9uQnlTZWxlY3RvcignLmJ1dHRvbi1nZXQnKTtcclxuICAgICAgICAgdGhpcy52aWV3LnNldEluc3RhbGxNZXNzYWdlKHtcclxuICAgICAgICAgICBtZXNzYWdlOiBgJHtjb250ZW50VHlwZS50aXRsZX0gc3VjY2Vzc2Z1bGx5IGluc3RhbGxlZCFgLFxyXG4gICAgICAgICB9KTtcclxuICAgICAgIH0pXHJcbiAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICB0aGlzLnZpZXcuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoJy5idXR0b24taW5zdGFsbCcpO1xyXG5cclxuICAgICAgICAgLy8gcHJpbnQgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gKGVycm9yLmVycm9yQ29kZSkgPyBlcnJvciA6IHtcclxuICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICBlcnJvckNvZGU6ICdSRVNQT05TRV9GQUlMRUQnLFxyXG4gICAgICAgICAgIG1lc3NhZ2U6IGAke2lkfSBjb3VsZCBub3QgYmUgaW5zdGFsbGVkISBDb250YWN0IHlvdXIgYWRtaW5pc3RyYXRvci5gLFxyXG4gICAgICAgICB9O1xyXG4gICAgICAgICB0aGlzLnZpZXcuc2V0SW5zdGFsbE1lc3NhZ2UoZXJyb3JNZXNzYWdlKTtcclxuXHJcbiAgICAgICAgIC8vIGxvZyB3aG9sZSBlcnJvciBtZXNzYWdlIHRvIGNvbnNvbGVcclxuICAgICAgICAgY29uc29sZS5lcnJvcignSW5zdGFsbGF0aW9uIGVycm9yJywgZXJyb3IpO1xyXG4gICAgICAgfSk7XHJcbiAgIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgdmlldyB3aXRoIHRoZSBjb250ZW50IHR5cGUgZGF0YVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcclxuICAgKi9cclxuICB1cGRhdGUoY29udGVudFR5cGUpIHtcclxuICAgIHRoaXMudmlldy5yZXNldCgpO1xyXG4gICAgdGhpcy52aWV3LnNldElkKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcclxuICAgIHRoaXMudmlldy5zZXRUaXRsZShjb250ZW50VHlwZS50aXRsZSk7XHJcbiAgICB0aGlzLnZpZXcuc2V0RGVzY3JpcHRpb24oY29udGVudFR5cGUuZGVzY3JpcHRpb24pO1xyXG4gICAgdGhpcy52aWV3LnNldEltYWdlKGNvbnRlbnRUeXBlLmljb24pO1xyXG4gICAgdGhpcy52aWV3LnNldEV4YW1wbGUoY29udGVudFR5cGUuZXhhbXBsZSk7XHJcbiAgICB0aGlzLnZpZXcuc2V0T3duZXIoY29udGVudFR5cGUub3duZXIpO1xyXG4gICAgdGhpcy52aWV3LnNldElzSW5zdGFsbGVkKGNvbnRlbnRUeXBlLmluc3RhbGxlZCk7XHJcbiAgICB0aGlzLnZpZXcuc2V0TGljZW5jZShjb250ZW50VHlwZS5saWNlbnNlKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgY2Fyb3VzZWxcclxuICAgIHRoaXMudmlldy5yZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsKCk7XHJcbiAgICBjb250ZW50VHlwZS5zY3JlZW5zaG90cy5mb3JFYWNoKHRoaXMudmlldy5hZGRJbWFnZVRvQ2Fyb3VzZWwsIHRoaXMudmlldyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XHJcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCByZW1vdmVDaGlsZCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XHJcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcclxuaW1wb3J0IG5vSWNvbiBmcm9tICcuLi8uLi9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Zyc7XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICogQGZpcmVzIEh1YiNzZWxlY3RcclxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdFZpZXcge1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcblxyXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgcm9vdCBlbGVtZW50XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1saXN0JztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICBoaWRlKCkge1xyXG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICBzaG93KCkge1xyXG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYWxsIHJvd3MgZnJvbSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICByZW1vdmVBbGxSb3dzKCkge1xyXG4gICAgd2hpbGUodGhpcy5yb290RWxlbWVudC5oYXNDaGlsZE5vZGVzKCkgKXtcclxuICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLnJvb3RFbGVtZW50Lmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgcm93XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxyXG4gICAqL1xyXG4gIGFkZFJvdyhjb250ZW50VHlwZSkge1xyXG4gICAgY29uc3Qgcm93ID0gdGhpcy5jcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgdGhpcyk7XHJcbiAgICByZWxheUNsaWNrRXZlbnRBcygncm93LXNlbGVjdGVkJywgdGhpcywgcm93KTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocm93KVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGFrZXMgYSBDb250ZW50IFR5cGUgY29uZmlndXJhdGlvbiBhbmQgY3JlYXRlcyBhIHJvdyBkb21cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXHJcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gc2NvcGVcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCBzY29wZSkge1xyXG4gICAgLy8gcm93IGl0ZW1cclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgZWxlbWVudC5pZCA9IGBjb250ZW50LXR5cGUtJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1gO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGJ1dHRvbiBjb25maWdcclxuICAgIGNvbnN0IHVzZUJ1dHRvbkNvbmZpZyA9IHsgdGV4dDogJ1VzZScsIGNsczogJ2J1dHRvbi1wcmltYXJ5JywgaWNvbjogJycgfTtcclxuICAgIGNvbnN0IGluc3RhbGxCdXR0b25Db25maWcgPSB7IHRleHQ6ICdHZXQnLCBjbHM6ICdidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsJywgaWNvbjogJ2ljb24tYXJyb3ctdGhpY2snfTtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRlbnRUeXBlLmluc3RhbGxlZCA/ICB1c2VCdXR0b25Db25maWc6IGluc3RhbGxCdXR0b25Db25maWc7XHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSBjb250ZW50VHlwZS50aXRsZSB8fCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gY29udGVudFR5cGUuc3VtbWFyeSB8fCAnJztcclxuXHJcbiAgICBjb25zdCBpbWFnZSA9IGNvbnRlbnRUeXBlLmljb24gfHwgbm9JY29uO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBodG1sXHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZX1cIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gJHtidXR0b24uY2xzfVwiIGRhdGEtaWQ9XCIke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfVwiIHRhYmluZGV4PVwiMFwiPjxzcGFuIGNsYXNzPVwiJHtidXR0b24uaWNvbn1cIj48L3NwYW4+JHtidXR0b24udGV4dH08L3NwYW4+XHJcbiAgICAgIDxoND4ke3RpdGxlfTwvaDQ+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPiR7ZGVzY3JpcHRpb259PC9kaXY+XHJcbiAgIGA7XHJcblxyXG4gICAgLy8gaGFuZGxlIHVzZSBidXR0b25cclxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1wcmltYXJ5Jyk7XHJcbiAgICBpZih1c2VCdXR0b24pe1xyXG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0Jywgc2NvcGUsIHVzZUJ1dHRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlTGlzdFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWxpc3Qtdmlld1wiO1xyXG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5cclxuLyoqXHJcbiAqIFJvdyBzZWxlY3RlZCBldmVudFxyXG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxyXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxyXG4gKi9cclxuLyoqXHJcbiAqIFVwZGF0ZSBjb250ZW50IHR5cGUgbGlzdCBldmVudFxyXG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxyXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxyXG4gKi9cclxuLyoqXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICogQGZpcmVzIEh1YiNzZWxlY3RcclxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcclxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdCB7XHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgLy8gYWRkIHRoZSB2aWV3XHJcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZUxpc3RWaWV3KHN0YXRlKTtcclxuICAgIHRoaXMucHJvcGFnYXRlKFsncm93LXNlbGVjdGVkJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZSB0aGlzIGVsZW1lbnRcclxuICAgKi9cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy52aWV3LmhpZGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgdGhpcyBlbGVtZW50XHJcbiAgICovXHJcbiAgc2hvdygpIHtcclxuICAgIHRoaXMudmlldy5zaG93KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgd2l0aCBuZXcgY29udGVudCB0eXBlc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcclxuICAgKi9cclxuICB1cGRhdGUoY29udGVudFR5cGVzKSB7XHJcbiAgICB0aGlzLnZpZXcucmVtb3ZlQWxsUm93cygpO1xyXG4gICAgY29udGVudFR5cGVzLmZvckVhY2godGhpcy52aWV3LmFkZFJvdywgdGhpcy52aWV3KTtcclxuICAgIHRoaXMuZmlyZSgndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0Jywge30pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHZpZXdzIHJvb3QgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsImltcG9ydCBNZXNzYWdlVmlldyBmcm9tIFwiLi4vbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlld1wiO1xyXG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIHF1ZXJ5U2VsZWN0b3JBbGwgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcclxuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XHJcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcclxuaW1wb3J0IGluaXRNZW51IGZyb20gJ2NvbXBvbmVudHMvbWVudSc7XHJcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuY29uc3QgdW5zZWxlY3RBbGwgPSBmb3JFYWNoKHJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3XHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3IHtcclxuICAvKipcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xyXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgZWxlbWVudHNcclxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoc3RhdGUpO1xyXG5cclxuICAgIC8vIHBpY2sgZWxlbWVudHNcclxuICAgIHRoaXMubWVudWJhciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1uYXYnKTtcclxuICAgIHRoaXMuaW5wdXRGaWVsZCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignW3JvbGU9XCJzZWFyY2hcIl0gaW5wdXQnKTtcclxuICAgIHRoaXMuZGlzcGxheVNlbGVjdGVkID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXRvZ2dsZXItc2VsZWN0ZWQnKTtcclxuICAgIGNvbnN0IGlucHV0QnV0dG9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInNlYXJjaFwiXSAuaW5wdXQtZ3JvdXAtYWRkb24nKTtcclxuXHJcbiAgICAvLyBpbnB1dCBmaWVsZFxyXG4gICAgdGhpcy5pbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnQgPT4ge1xyXG4gICAgICB0aGlzLmZpcmUoJ3NlYXJjaCcsIHtcclxuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXQsXHJcbiAgICAgICAgcXVlcnk6IGV2ZW50LnRhcmdldC52YWx1ZSxcclxuICAgICAgICBrZXlDb2RlOiBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gaW5wdXQgYnV0dG9uXHJcbiAgICBpbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgIGxldCBzZWFyY2hiYXIgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKTtcclxuXHJcbiAgICAgICB0aGlzLmZpcmUoJ3NlYXJjaCcsIHtcclxuICAgICAgICAgZWxlbWVudDogc2VhcmNoYmFyLFxyXG4gICAgICAgICBxdWVyeTogc2VhcmNoYmFyLnZhbHVlLFxyXG4gICAgICAgICBrZXlDb2RlOiAxMyAvLyBBY3QgbGlrZSBhbiAnZW50ZXInIGtleSBwcmVzc1xyXG4gICAgICAgfSk7XHJcblxyXG4gICAgICAgc2VhcmNoYmFyLmZvY3VzKCk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgbWVudSBncm91cCBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGNyZWF0ZUVsZW1lbnQoc3RhdGUpIHtcclxuICAgIGxldCBtZW51dGl0bGUgPSAnQnJvd3NlIGNvbnRlbnQgdHlwZXMnO1xyXG4gICAgbGV0IG1lbnVJZCA9ICdjb250ZW50LXR5cGUtZmlsdGVyJztcclxuICAgIGxldCBzZWFyY2hUZXh0ID0gJ1NlYXJjaCBmb3IgQ29udGVudCBUeXBlcyc7XHJcblxyXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcnO1xyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtZW51LWdyb3VwXCI+XHJcbiAgICAgICAgPG5hdiAgcm9sZT1cIm1lbnViYXJcIiBjbGFzcz1cIm5hdmJhclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhci1oZWFkZXJcIj5cclxuICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXIgbmF2YmFyLXRvZ2dsZXItcmlnaHRcIiBhcmlhLWNvbnRyb2xzPVwiJHttZW51SWR9XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XHJcbiAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXItc2VsZWN0ZWRcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1hY2NvcmRpb24tYXJyb3dcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLWJyYW5kXCI+JHttZW51dGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPHVsIGlkPVwiJHttZW51SWR9XCIgY2xhc3M9XCJuYXZiYXItbmF2XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC91bD5cclxuICAgICAgICA8L25hdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCIgcm9sZT1cInNlYXJjaFwiPlxyXG4gICAgICAgICAgPGlucHV0IGlkPVwiaHViLXNlYXJjaC1iYXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtcm91bmRlZFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCIke3NlYXJjaFRleHR9XCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpY29uLXNlYXJjaFwiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5gO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheU1lc3NhZ2UoY29uZmlnKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAvLyBTZXQgdGhlIGFjdGlvblxyXG4gICAgLy8gVE9ETyAtIHNob3VsZCBiZSB0cmFuc2xhdGFibGVcclxuICAgIGNvbmZpZy5hY3Rpb24gPSBcIlJlbG9hZFwiO1xyXG5cclxuICAgIHZhciBtZXNzYWdlVmlldyA9IG5ldyBNZXNzYWdlVmlldyhjb25maWcpO1xyXG4gICAgdmFyIGVsZW1lbnQgPSBtZXNzYWdlVmlldy5nZXRFbGVtZW50KCk7XHJcblxyXG4gICAgbWVzc2FnZVZpZXcub24oJ2FjdGlvbi1jbGlja2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBzZWxmLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XHJcbiAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgICAgc2VsZi5maXJlKCdyZWxvYWQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZVZpZXcuZ2V0RWxlbWVudCgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBtZW51IGl0ZW1cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWQgRGV0ZXJtaW5lcyBpZiB0YWIgaXMgYWxyZWFkeSBzZWxlY3RlZFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiBldmVudCB0aGF0IHRhYiB3aWxsIGZpcmUgb2ZmXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBhZGRNZW51SXRlbSh7IHRpdGxlLCBpZCwgc2VsZWN0ZWQsIGV2ZW50TmFtZSB9KSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnVpdGVtJyk7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGlkKTtcclxuICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gdGl0bGU7XHJcblxyXG4gICAgLy8gc2V0cyBpZiB0aGlzIG1lbnVpdGVtIHNob3VsZCBiZSBzZWxlY3RlZFxyXG4gICAgaWYoc2VsZWN0ZWQpIHtcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xyXG4gICAgICB0aGlzLmRpc3BsYXlTZWxlY3RlZC5pbm5lclRleHQgPSB0aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICB0aGlzLmZpcmUoJ21lbnUtc2VsZWN0ZWQnLCB7XHJcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxyXG4gICAgICAgIGNob2ljZTogZXZlbnROYW1lXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gYWRkIHRvIG1lbnUgYmFyXHJcbiAgICB0aGlzLm1lbnViYXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFycyB0aGUgaW5wdXQgZmllbGRcclxuICAgKi9cclxuICBjbGVhcklucHV0RmllbGQoKSB7XHJcbiAgICB0aGlzLmlucHV0RmllbGQudmFsdWUgPSAnJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBmaWx0ZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RlZE5hbWVcclxuICAgKi9cclxuICBzZXREaXNwbGF5U2VsZWN0ZWQoc2VsZWN0ZWROYW1lKSB7XHJcbiAgICB0aGlzLmRpc3BsYXlTZWxlY3RlZC5pbm5lclRleHQgPSBzZWxlY3RlZE5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWxlY3RzIGEgbWVudSBpdGVtIGJ5IGlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBzZWxlY3RNZW51SXRlbUJ5SWQoaWQpIHtcclxuICAgIGNvbnN0IG1lbnVJdGVtcyA9IHRoaXMubWVudWJhci5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cIm1lbnVpdGVtXCJdJyk7XHJcbiAgICBjb25zdCBzZWxlY3RlZE1lbnVJdGVtID0gdGhpcy5tZW51YmFyLnF1ZXJ5U2VsZWN0b3IoYFtyb2xlPVwibWVudWl0ZW1cIl1bZGF0YS1pZD1cIiR7aWR9XCJdYCk7XHJcblxyXG4gICAgaWYoc2VsZWN0ZWRNZW51SXRlbSkge1xyXG4gICAgICB1bnNlbGVjdEFsbChtZW51SXRlbXMpO1xyXG4gICAgICBzZWxlY3RlZE1lbnVJdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XHJcblxyXG4gICAgICB0aGlzLmZpcmUoJ21lbnUtc2VsZWN0ZWQnLCB7XHJcbiAgICAgICAgZWxlbWVudDogc2VsZWN0ZWRNZW51SXRlbSxcclxuICAgICAgICBpZDogc2VsZWN0ZWRNZW51SXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXRNZW51KCkge1xyXG4gICAgLy8gY3JlYXRlIHRoZSB1bmRlcmxpbmVcclxuICAgIGNvbnN0IHVuZGVybGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHVuZGVybGluZS5jbGFzc05hbWUgPSAnbWVudWl0ZW0tdW5kZXJsaW5lJztcclxuICAgIHRoaXMubWVudWJhci5hcHBlbmRDaGlsZCh1bmRlcmxpbmUpO1xyXG5cclxuICAgIC8vIGNhbGwgaW5pdCBtZW51IGZyb20gc2RrXHJcbiAgICBpbml0TWVudSh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBnZXRFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJpbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3XCI7XHJcbmltcG9ydCBTZWFyY2hTZXJ2aWNlIGZyb20gXCIuLi9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZVwiO1xyXG5pbXBvcnQgQ29udGVudFR5cGVMaXN0IGZyb20gJy4uL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0JztcclxuaW1wb3J0IENvbnRlbnRUeXBlRGV0YWlsIGZyb20gJy4uL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbCc7XHJcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XHJcbmltcG9ydCB7cmVuZGVyRXJyb3JNZXNzYWdlfSBmcm9tICcuLi91dGlscy9lcnJvcnMnO1xyXG5cclxuLyoqXHJcbiAqIFRhYiBzZWN0aW9uIGNvbnN0YW50c1xyXG4gKi9cclxuY29uc3QgQ29udGVudFR5cGVTZWN0aW9uVGFicyA9IHtcclxuICBBTEw6IHtcclxuICAgIGlkOiAnZmlsdGVyLWFsbCcsXHJcbiAgICB0aXRsZTogJ0FsbCcsXHJcbiAgICBldmVudE5hbWU6ICdhbGwnXHJcbiAgfSxcclxuICBNWV9DT05URU5UX1RZUEVTOiB7XHJcbiAgICBpZDogJ2ZpbHRlci1teS1jb250ZW50LXR5cGVzJyxcclxuICAgIHRpdGxlOiAnTXkgQ29udGVudCBUeXBlcycsXHJcbiAgICBldmVudE5hbWU6ICdteS1jb250ZW50LXR5cGVzJyxcclxuICAgIHNlbGVjdGVkOiB0cnVlXHJcbiAgfSxcclxuICBNT1NUX1BPUFVMQVI6IHtcclxuICAgIGlkOiAnZmlsdGVyLW1vc3QtcG9wdWxhcicsXHJcbiAgICB0aXRsZTogJ01vc3QgUG9wdWxhcicsXHJcbiAgICBldmVudE5hbWU6ICdtb3N0LXBvcHVsYXInLFxyXG4gICAgZmlsdGVyUHJvcGVydHk6ICdwb3B1bGFyaXR5J1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKlxyXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBzZXJ2aWNlcykge1xyXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcclxuXHJcbiAgICB0aGlzLnR5cGVBaGVhZEVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIC8vIGFkZCB2aWV3XHJcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uVmlldyhzdGF0ZSk7XHJcblxyXG4gICAgLy8gY29udHJvbGxlclxyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2Uoc2VydmljZXMpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsID0gbmV3IENvbnRlbnRUeXBlRGV0YWlsKHNlcnZpY2VzKTtcclxuXHJcbiAgICAvLyBhZGQgbWVudSBpdGVtc1xyXG4gICAgZm9yIChjb25zdCB0YWIgaW4gQ29udGVudFR5cGVTZWN0aW9uVGFicykge1xyXG4gICAgICBpZiAoQ29udGVudFR5cGVTZWN0aW9uVGFicy5oYXNPd25Qcm9wZXJ0eSh0YWIpKSB7XHJcbiAgICAgICAgdGhpcy52aWV3LmFkZE1lbnVJdGVtKENvbnRlbnRUeXBlU2VjdGlvblRhYnNbdGFiXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMudmlldy5pbml0TWVudSgpO1xyXG5cclxuICAgIC8vIEVsZW1lbnQgZm9yIGhvbGRpbmcgbGlzdCBhbmQgZGV0YWlscyB2aWV3c1xyXG4gICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdjb250ZW50LXR5cGUtc2VjdGlvbicpO1xyXG5cclxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBzZWN0aW9uO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlTGlzdC5nZXRFbGVtZW50KCkpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmdldEVsZW1lbnQoKSk7XHJcblxyXG4gICAgdGhpcy52aWV3LmdldEVsZW1lbnQoKS5hcHBlbmRDaGlsZCh0aGlzLnJvb3RFbGVtZW50KTtcclxuXHJcbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXHJcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCcsICd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnXSwgdGhpcy5jb250ZW50VHlwZUxpc3QpO1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3JlbG9hZCddLCB0aGlzLnZpZXcpO1xyXG5cclxuICAgIC8vIHJlZ2lzdGVyIGxpc3RlbmVyc1xyXG4gICAgdGhpcy52aWV3Lm9uKCdzZWFyY2gnLCB0aGlzLnNlYXJjaCwgdGhpcyk7XHJcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMudmlldy5zZWxlY3RNZW51SXRlbUJ5SWQuYmluZCh0aGlzLnZpZXcsIENvbnRlbnRUeXBlU2VjdGlvblRhYnMuQUxMLmlkKSk7XHJcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMucmVzZXRNZW51T25FbnRlciwgdGhpcyk7XHJcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmFwcGx5U2VhcmNoRmlsdGVyLCB0aGlzKTtcclxuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMuY2xlYXJJbnB1dEZpZWxkLCB0aGlzKTtcclxuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMudXBkYXRlRGlzcGxheVNlbGVjdGVkLCB0aGlzKTtcclxuICAgIHRoaXMuY29udGVudFR5cGVMaXN0Lm9uKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLnNob3dEZXRhaWxWaWV3LCB0aGlzKTtcclxuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwub24oJ2Nsb3NlJywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignc2VsZWN0JywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuaW5pdENvbnRlbnRUeXBlTGlzdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdCB3aXRoIGEgc2VhcmNoXHJcbiAgICovXHJcbiAgaW5pdENvbnRlbnRUeXBlTGlzdCgpIHtcclxuICAgIC8vIGluaXRpYWxpemUgYnkgc2VhcmNoXHJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKFwiXCIpXHJcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZSBlcnJvcnMgY29tbXVuaWNhdGluZyB3aXRoIEhVQlxyXG4gICAqL1xyXG4gIGhhbmRsZUVycm9yKGVycm9yKSB7XHJcbiAgICAvLyBUT0RPIC0gdXNlIHRyYW5zbGF0aW9uIHN5c3RlbTpcclxuICAgIHRoaXMudmlldy5kaXNwbGF5TWVzc2FnZSh7XHJcbiAgICAgIHR5cGU6ICdlcnJvcicsXHJcbiAgICAgIHRpdGxlOiAnTm90IGFibGUgdG8gY29tbXVuaWNhdGUgd2l0aCBodWIuJyxcclxuICAgICAgY29udGVudDogJ0Vycm9yIG9jY3VyZWQuIFBsZWFzZSB0cnkgYWdhaW4uJ1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlcyBhIHNlYXJjaCBhbmQgdXBkYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3RcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxyXG4gICAqL1xyXG4gIHNlYXJjaCh7cXVlcnksIGtleUNvZGV9KSB7XHJcbiAgICBpZiAodGhpcy50eXBlQWhlYWRFbmFibGVkIHx8IGtleUNvZGUgPT09IDEzKSB7IC8vIFNlYXJjaCBhdXRvbWF0aWNhbGx5IG9yIG9uICdlbnRlcidcclxuICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChxdWVyeSlcclxuICAgICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgZGlzcGxheWVkIG5hbWUgb2YgdGhlIHNlbGVjdGVkIGZpbHRlciBmb3IgbW9iaWxlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1NlbGVjdGVkRWxlbWVudH0gZXZlbnRcclxuICAgKi9cclxuICB1cGRhdGVEaXNwbGF5U2VsZWN0ZWQoZXZlbnQpIHtcclxuICAgIHRoaXMudmlldy5zZXREaXNwbGF5U2VsZWN0ZWQoZXZlbnQuZWxlbWVudC5pbm5lclRleHQpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRNZW51T25FbnRlcih7a2V5Q29kZX0pIHtcclxuICAgIGlmIChrZXlDb2RlID09PSAxMykge1xyXG4gICAgICB0aGlzLmNsb3NlRGV0YWlsVmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwbGllcyBzZWFyY2ggZmlsdGVyIGRlcGVuZGluZyBvbiB3aGF0IGV2ZW50IGl0IHJlY2VpdmVzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBFdmVudFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlLmNob2ljZSBFdmVudCBuYW1lIG9mIGNob3NlbiB0YWJcclxuICAgKi9cclxuICBhcHBseVNlYXJjaEZpbHRlcihlKSB7XHJcbiAgICBzd2l0Y2goZS5jaG9pY2UpIHtcclxuICAgICAgY2FzZSBDb250ZW50VHlwZVNlY3Rpb25UYWJzLk1PU1RfUE9QVUxBUi5ldmVudE5hbWU6XHJcbiAgICAgICAgLy8gRmlsdGVyIG9uIHRhYidzIGZpbHRlciBwcm9wZXJ0eSwgdGhlbiB1cGRhdGUgY29udGVudCB0eXBlIGxpc3RcclxuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2VcclxuICAgICAgICAgIC5maWx0ZXIoQ29udGVudFR5cGVTZWN0aW9uVGFicy5NT1NUX1BPUFVMQVIuZmlsdGVyUHJvcGVydHkpXHJcbiAgICAgICAgICAudGhlbihjdHMgPT4ge3RoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjdHMpfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXJzIHRoZSBpbnB1dCBmaWVsZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICovXHJcbiAgY2xlYXJJbnB1dEZpZWxkKHtpZH0pIHtcclxuICAgIGlmIChpZCAhPT0gQ29udGVudFR5cGVTZWN0aW9uVGFicy5BTEwuaWQpIHtcclxuICAgICAgdGhpcy52aWV3LmNsZWFySW5wdXRGaWVsZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3MgZGV0YWlsIHZpZXdcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqL1xyXG4gIHNob3dEZXRhaWxWaWV3KHtpZH0pIHtcclxuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LmhpZGUoKTtcclxuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwubG9hZEJ5SWQoaWQpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5zaG93KCk7XHJcbiAgICB0aGlzLnR5cGVBaGVhZEVuYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZSBkZXRhaWwgdmlld1xyXG4gICAqL1xyXG4gIGNsb3NlRGV0YWlsVmlldygpIHtcclxuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuaGlkZSgpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Quc2hvdygpO1xyXG4gICAgdGhpcy50eXBlQWhlYWRFbmFibGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJpbXBvcnQgJy4vdXRpbHMvZmV0Y2gnO1xyXG4vKipcclxuICogQHR5cGVkZWYge29iamVjdH0gQ29udGVudFR5cGVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1hY2hpbmVOYW1lXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWpvclZlcnNpb25cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1pbm9yVmVyc2lvblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGF0Y2hWZXJzaW9uXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBoNXBNYWpvclZlcnNpb25cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1pbm9yVmVyc2lvblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3VtbWFyeVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZGVzY3JpcHRpb25cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGljb25cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNyZWF0ZWRBdFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdXBkYXRlZF9BdFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaXNSZWNvbW1lbmRlZFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9wdWxhcml0eVxyXG4gKiBAcHJvcGVydHkge29iamVjdFtdfSBzY3JlZW5zaG90c1xyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGljZW5zZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXhhbXBsZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdHV0b3JpYWxcclxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0ga2V5d29yZHNcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IG93bmVyXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaW5zdGFsbGVkXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVzdHJpY3RlZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViU2VydmljZXMge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcGlSb290VXJsXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoeyBhcGlSb290VXJsIH0pIHtcclxuICAgIHRoaXMuYXBpUm9vdFVybCA9IGFwaVJvb3RVcmw7XHJcbiAgICB0aGlzLnNldHVwKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCB0aGUgY29udGVudCB0eXBlIG1ldGFkYXRhXHJcbiAgICovXHJcbiAgc2V0dXAoKSB7XHJcbiAgICB0aGlzLmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50LXR5cGUtY2FjaGVgLCB7XHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcclxuICAgIH0pXHJcbiAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcclxuICAgIC50aGVuKHRoaXMuaXNWYWxpZClcclxuICAgIC50aGVuKGpzb24gPT4ganNvbi5saWJyYXJpZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtDb250ZW50VHlwZVtdfEVycm9yTWVzc2FnZX0gcmVzcG9uc2VcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cclxuICAgKi9cclxuICBpc1ZhbGlkKHJlc3BvbnNlKSB7XHJcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlW10+fVxyXG4gICAqL1xyXG4gIGNvbnRlbnRUeXBlcygpIHtcclxuICAgIHJldHVybiB0aGlzLmNhY2hlZENvbnRlbnRUeXBlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBDb250ZW50IFR5cGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxyXG4gICAqXHJcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxyXG4gICAqL1xyXG4gIGNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYWNoZWRDb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xyXG4gICAgICByZXR1cm4gY29udGVudFR5cGVzLmZpbHRlcihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSA9PT0gbWFjaGluZU5hbWUpWzBdO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLypyZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnRfdHlwZV9jYWNoZS8ke2lkfWAsIHtcclxuICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xyXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7Ki9cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluc3RhbGxzIGEgY29udGVudCB0eXBlIG9uIHRoZSBzZXJ2ZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxyXG4gICAqL1xyXG4gIGluc3RhbGxDb250ZW50VHlwZShpZCkge1xyXG4gICAgcmV0dXJuIGZldGNoKG5zLmdldEFqYXhVcmwoJ2xpYnJhcnktaW5zdGFsbCcsIHtpZDogaWR9KSwge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcclxuICAgICAgYm9keTogJydcclxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIGZvciB0ZXN0aW5nIHdpdGggZXJyb3JcclxuICAvKmluc3RhbGxDb250ZW50VHlwZShpZCkge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1saWJyYXJ5LWluc3RhbGxgLCB7XHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcclxuICAgIH0pXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfSovXHJcblxyXG4gIC8qKlxyXG4gICAqIFVwbG9hZHMgYSBjb250ZW50IHR5cGUgdG8gdGhlIHNlcnZlciBmb3IgdmFsaWRhdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGb3JtRGF0YX0gZm9ybURhdGEgRm9ybSBjb250YWluaW5nIHRoZSBoNXAgdGhhdCBzaG91bGQgYmUgdXBsb2FkZWQgYXMgJ2g1cCdcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBqc29uIGNvbnRhaW5pbmcgdGhlIGNvbnRlbnQganNvbiBhbmQgdGhlIGg1cCBqc29uXHJcbiAgICovXHJcbiAgdXBsb2FkQ29udGVudChmb3JtRGF0YSkge1xyXG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1saWJyYXJ5LXVwbG9hZGAsIHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXHJcbiAgICAgIGJvZHk6IGZvcm1EYXRhXHJcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwiaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiXHJcbmltcG9ydCBpbml0VGFiUGFuZWwgZnJvbSBcImNvbXBvbmVudHMvdGFiLXBhbmVsXCJcclxuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xyXG5pbXBvcnQgeyBhdHRyaWJ1dGVFcXVhbHMsIGdldEF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4vdXRpbHMvZXZlbnRzJztcclxuLyoqXHJcbiAqIFRhYiBjaGFuZ2UgZXZlbnRcclxuICogQGV2ZW50IEh1YlZpZXcjdGFiLWNoYW5nZVxyXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxyXG4gKi9cclxuLyoqXHJcbiAqIFBhbmVsIG9wZW4gb3IgY2xvc2UgZXZlbnRcclxuICogQGV2ZW50IEh1YlZpZXcjcGFuZWwtY2hhbmdlXHJcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XHJcbiAqL1xyXG4vKipcclxuICogQGNvbnN0YW50IHtzdHJpbmd9XHJcbiAqL1xyXG5jb25zdCBBVFRSSUJVVEVfREFUQV9JRCA9ICdkYXRhLWlkJztcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IGlzT3BlbiA9IGhhc0F0dHJpYnV0ZSgnb3BlbicpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICogQGZpcmVzIEh1YlZpZXcjdGFiLWNoYW5nZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViVmlldyB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xyXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlclRhYlBhbmVsKHN0YXRlKTtcclxuICAgIHRoaXMucmVuZGVyUGFuZWwoc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIHRoZSBwYW5lbFxyXG4gICAqL1xyXG4gIGNsb3NlUGFuZWwoKSB7XHJcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSB0aXRsZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcbiAgICovXHJcbiAgc2V0VGl0bGUodGl0bGUpIHtcclxuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSBwYW5lbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwYW5kZWRcclxuICAgKi9cclxuICByZW5kZXJQYW5lbCh7dGl0bGUgPSAnJywgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnLCBleHBhbmRlZCA9IGZhbHNlfSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMudGl0bGUuY2xhc3NOYW1lICs9IFwicGFuZWwtaGVhZGVyIGljb24taHViLWljb25cIjtcclxuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgKCEhZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xyXG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gKTtcclxuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XHJcbiAgICByZWxheUNsaWNrRXZlbnRBcygncGFuZWwtY2hhbmdlJywgdGhpcywgdGhpcy50aXRsZSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5ib2R5LmNsYXNzTmFtZSArPSBcInBhbmVsLWJvZHlcIjtcclxuICAgIHRoaXMuYm9keS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgKCFleHBhbmRlZCkudG9TdHJpbmcoKSk7XHJcbiAgICB0aGlzLmJvZHkuaWQgPSBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lICs9IGBwYW5lbCBoNXAtc2VjdGlvbi0ke3NlY3Rpb25JZH1gO1xyXG4gICAgaWYoZXhwYW5kZWQpe1xyXG4gICAgICB0aGlzLnBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcclxuICAgIH1cclxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XHJcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuYm9keSk7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgKz0gYGg1cCBoNXAtaHViIGg1cC1zZGtgO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBhbmVsKTtcclxuICAgIGluaXRQYW5lbCh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBpZiBwYW5lbCBpcyBvcGVuLCB0aGlzIGlzIHVzZWQgZm9yIG91dGVyIGJvcmRlciBjb2xvclxyXG4gICAqL1xyXG4gIHRvZ2dsZVBhbmVsT3BlbigpIHtcclxuICAgIGxldCBwYW5lbCA9IHRoaXMucGFuZWw7XHJcbiAgICBpZihpc09wZW4ocGFuZWwpKSB7XHJcbiAgICAgIHBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgnb3BlbicpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3BhbmVsLnF1ZXJ5U2VsZWN0b3IoJyNodWItc2VhcmNoLWJhcicpLmZvY3VzKCl9LDIwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHRhYiBwYW5lbFxyXG4gICAqL1xyXG4gIHJlbmRlclRhYlBhbmVsKHN0YXRlKSB7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgdGhpcy50YWJsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIHRoaXMudGFibGlzdC5jbGFzc05hbWUgKz0gXCJ0YWJsaXN0XCI7XHJcbiAgICB0aGlzLnRhYmxpc3Quc2V0QXR0cmlidXRlICgncm9sZScsICd0YWJsaXN0Jyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcclxuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy50YWJsaXN0KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuY2xhc3NOYW1lICs9ICd0YWItcGFuZWwnO1xyXG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGFiTGlzdFdyYXBwZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHRhYlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGVudFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcclxuICAgKi9cclxuICBhZGRUYWIoe3RpdGxlLCBpZCwgY29udGVudCwgc2VsZWN0ZWQgPSBmYWxzZX0pIHtcclxuICAgIGNvbnN0IHRhYklkID0gYHRhYi0ke2lkfWA7XHJcbiAgICBjb25zdCB0YWJQYW5lbElkID0gYHRhYi1wYW5lbC0ke2lkfWA7XHJcblxyXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIHRhYi5jbGFzc05hbWUgKz0gJ3RhYic7XHJcbiAgICB0YWIuaWQgPSB0YWJJZDtcclxuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0YWJQYW5lbElkKTtcclxuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBzZWxlY3RlZC50b1N0cmluZygpKTtcclxuICAgIHRhYi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0RBVEFfSUQsIGlkKTtcclxuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XHJcbiAgICB0YWIuaW5uZXJIVE1MID0gdGl0bGU7XHJcbiAgICByZWxheUNsaWNrRXZlbnRBcygndGFiLWNoYW5nZScsIHRoaXMsIHRhYik7XHJcblxyXG4gICAgY29uc3QgdGFiUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRhYlBhbmVsLmlkID0gdGFiUGFuZWxJZDtcclxuICAgIHRhYlBhbmVsLmNsYXNzTmFtZSArPSAndGFicGFuZWwnO1xyXG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmxsZWRieScsIHRhYklkKTtcclxuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIXNlbGVjdGVkKS50b1N0cmluZygpKTtcclxuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xyXG4gICAgdGFiUGFuZWwuYXBwZW5kQ2hpbGQoY29udGVudCk7XHJcblxyXG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKHRhYik7XHJcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGFiUGFuZWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhbiBhbmltYXRlZCBib3JkZXIgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFiXHJcbiAgICovXHJcbiAgYWRkQm90dG9tQm9yZGVyKCkge1xyXG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSk7XHJcbiAgfVxyXG5cclxuICBpbml0VGFiUGFuZWwoKSB7XHJcbiAgICBpbml0VGFiUGFuZWwodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHNlY3Rpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqL1xyXG4gIHNldFNlY3Rpb25UeXBlKHtpZH0pIHtcclxuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lID0gYGg1cC1zZWN0aW9uLSR7aWR9IHBhbmVsYDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBnZXRFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwiaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcclxuaW1wb3J0IHtyZWxheUNsaWNrRXZlbnRBc30gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3XHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZVZpZXcge1xyXG4gIC8qKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS50eXBlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLnRpdGxlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLmNvbnRlbnRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlLmFjdGlvbl1cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlLmRpc21pc3NhYmxlXVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xyXG4gICAgdGhpcy5yb290RWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudChzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVFbGVtZW50KG1lc3NhZ2UpIHtcclxuICAgIC8vIENyZWF0ZSB3cmFwcGVyOlxyXG4gICAgY29uc3QgbWVzc2FnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG1lc3NhZ2VXcmFwcGVyLmNsYXNzTmFtZSA9IGBtZXNzYWdlICR7bWVzc2FnZS50eXBlfWAgKyAobWVzc2FnZS5kaXNtaXNzaWJsZSA/ICcgZGlzbWlzc2libGUnIDogJycpO1xyXG5cclxuICAgIC8vIEFkZCBjbG9zZSBidXR0b24gaWYgZGlzbWlzYWJsZVxyXG4gICAgaWYgKG1lc3NhZ2UuZGlzbWlzc2libGUpIHtcclxuICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2Nsb3NlJztcclxuICAgICAgLy9jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJiN4MjcxNSc7XHJcbiAgICAgIC8vIFRPRE9cclxuICAgICAgLy8gLSBBZGQgY2xvc2UgbGFiZWwgZnJvbSB0cmFuc2xhdGlvbnNcclxuICAgICAgLy8gLSBBZGQgdmlzdWFscyBpbiBDU1MgKGZvbnQgaWNvbilcclxuICAgICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xyXG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnY2xvc2UnLCB0aGlzLCBjbG9zZUJ1dHRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWVzc2FnZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG1lc3NhZ2VDb250ZW50LmNsYXNzTmFtZSA9ICdtZXNzYWdlLWNvbnRlbnQnO1xyXG4gICAgbWVzc2FnZUNvbnRlbnQuaW5uZXJIVE1MID0gJzxoMT4nICsgbWVzc2FnZS50aXRsZSArICc8L2gxPicgKyAnPHA+JyArIG1lc3NhZ2UuY29udGVudCArICc8L3A+JztcclxuICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VDb250ZW50KTtcclxuXHJcbiAgICBpZiAobWVzc2FnZS5hY3Rpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgIG1lc3NhZ2VCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbic7XHJcbiAgICAgIG1lc3NhZ2VCdXR0b24uaW5uZXJIVE1MID0gbWVzc2FnZS5hY3Rpb247XHJcbiAgICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VCdXR0b24pO1xyXG5cclxuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ2FjdGlvbi1jbGlja2VkJywgdGhpcywgbWVzc2FnZUJ1dHRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlldy5qcyIsImltcG9ydCB7Y3Vycnl9IGZyb20gJ3V0aWxzL2Z1bmN0aW9uYWwnXHJcblxyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIFRoZSBTZWFyY2ggU2VydmljZSBnZXRzIGEgY29udGVudCB0eXBlIGZyb20gaHViLXNlcnZpY2VzLmpzXHJcbiAqIGluIHRoZSBmb3JtIG9mIGEgcHJvbWlzZS4gSXQgdGhlbiBnZW5lcmF0ZXMgYSBzY29yZSBiYXNlZFxyXG4gKiBvbiB0aGUgZGlmZmVyZW50IHdlaWdodGluZ3Mgb2YgdGhlIGNvbnRlbnQgdHlwZSBmaWVsZHMgYW5kXHJcbiAqIHNvcnRzIHRoZSByZXN1bHRzIGJhc2VkIG9uIHRoZSBnZW5lcmF0ZWQgc2NvcmUuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hTZXJ2aWNlIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUuYXBpUm9vdFVybFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHNlcnZpY2VzKSB7XHJcbiAgICB0aGlzLnNlcnZpY2VzID0gc2VydmljZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtcyBhIHNlYXJjaFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW10+fSBBIHByb21pc2Ugb2YgYW4gYXJyYXkgb2YgY29udGVudCB0eXBlc1xyXG4gICAqL1xyXG4gIHNlYXJjaChxdWVyeSkge1xyXG4gICAgLy8gQWRkIGNvbnRlbnQgdHlwZXMgdG8gdGhlIHNlYXJjaCBpbmRleFxyXG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKCkudGhlbihmaWx0ZXJCeVF1ZXJ5KHF1ZXJ5KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgYWxsIGNvbnRlbnQgdHlwZXMgYnkgZ2l2ZW4gcHJvcGVydHlcclxuICAgKlxyXG4gICAqIEBwYXJhbSBwcm9wZXJ0eVxyXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlW10+fCp9XHJcbiAgICovXHJcbiAgZmlsdGVyKHByb3BlcnR5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZXMoKVxyXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gY29udGVudFR5cGVzLnNvcnQoKGN0MSwgY3QyKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIFByb3BlcnR5IGRvZXMgbm90IGV4aXN0LCBtb3ZlIHRvIGJvdHRvbVxyXG4gICAgICAgIGlmICghY3QxLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWN0Mi5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNvcnQgb24gcHJvcGVydHlcclxuICAgICAgICBpZiAoY3QxW3Byb3BlcnR5XSA+IGN0Mltwcm9wZXJ0eV0pIHtcclxuICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdDFbcHJvcGVydHldIDwgY3QyW3Byb3BlcnR5XSkge1xyXG4gICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbHRlcnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXMgYmFzZWQgb24gYSBxdWVyeVxyXG4gKiBAdHlwZSB7RnVuY3Rpb259XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxyXG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xyXG4gKi9cclxuY29uc3QgZmlsdGVyQnlRdWVyeSA9IGN1cnJ5KGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZXMpIHtcclxuICBpZiAocXVlcnkgPT0gJycpIHtcclxuICAgIHJldHVybiBjb250ZW50VHlwZXM7XHJcbiAgfVxyXG5cclxuICAvLyBBcHBlbmQgYSBzZWFyY2ggc2NvcmUgdG8gZWFjaCBjb250ZW50IHR5cGVcclxuICByZXR1cm4gY29udGVudFR5cGVzLm1hcChjb250ZW50VHlwZSA9PlxyXG4gICAgKHtcclxuICAgICAgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlLFxyXG4gICAgICBzY29yZTogZ2V0U2VhcmNoU2NvcmUocXVlcnksIGNvbnRlbnRUeXBlKVxyXG4gICAgfSkpXHJcbiAgICAuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc2NvcmUgPiAwKVxyXG4gICAgLnNvcnQoc29ydFNlYXJjaFJlc3VsdHMpIC8vIFNvcnQgYnkgaW5zdGFsbGVkLCByZWxldmFuY2UgYW5kIHBvcHVsYXJpdHlcclxuICAgIC5tYXAocmVzdWx0ID0+IHJlc3VsdC5jb250ZW50VHlwZSk7IC8vIFVud3JhcCByZXN1bHQgb2JqZWN0O1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsYmFjayBmb3IgQXJyYXkuc29ydCgpXHJcbiAqIENvbXBhcmVzIHR3byBjb250ZW50IHR5cGVzIG9uIGRpZmZlcmVudCBjcml0ZXJpYVxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gYSBGaXJzdCBjb250ZW50IHR5cGVcclxuICogQHBhcmFtIHtPYmplY3R9IGIgU2Vjb25kIGNvbnRlbnQgdHlwZVxyXG4gKiBAcmV0dXJuIHtpbnR9XHJcbiAqL1xyXG5jb25zdCBzb3J0U2VhcmNoUmVzdWx0cyA9IChhLGIpID0+IHtcclxuICBpZiAoIWEuY29udGVudFR5cGUuaW5zdGFsbGVkICYmIGIuY29udGVudFR5cGUuaW5zdGFsbGVkKSB7XHJcbiAgICByZXR1cm4gMTtcclxuICB9XHJcblxyXG4gIGlmIChhLmNvbnRlbnRUeXBlLmluc3RhbGxlZCAmJiAhYi5jb250ZW50VHlwZS5pbnN0YWxsZWQpIHtcclxuICAgIHJldHVybiAtMTtcclxuICB9XHJcblxyXG4gIGVsc2UgaWYgKGIuc2NvcmUgIT09IGEuc2NvcmUpIHtcclxuICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZTtcclxuICB9XHJcblxyXG4gIGVsc2Uge1xyXG4gICAgcmV0dXJuIGIuY29udGVudFR5cGUucG9wdWxhcml0eSAtIGEuY29udGVudFR5cGUucG9wdWxhcml0eTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB3ZWlnaHRpbmcgZm9yIGRpZmZlcmVudCBzZWFyY2ggdGVybXMgYmFzZWRcclxuICogb24gZXhpc3RlbmNlIG9mIHN1YnN0cmluZ3NcclxuICpcclxuICogQHBhcmFtICB7c3RyaW5nfSBxdWVyeVxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRlbnRUeXBlXHJcbiAqIEByZXR1cm4ge2ludH1cclxuICovXHJcbiBjb25zdCBnZXRTZWFyY2hTY29yZSA9IGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZSkge1xyXG4gICBsZXQgcXVlcmllcyA9IHF1ZXJ5LnNwbGl0KCcgJykuZmlsdGVyKHF1ZXJ5ID0+IHF1ZXJ5ICE9PSAnJyk7XHJcbiAgIGxldCBxdWVyeVNjb3JlcyA9IHF1ZXJpZXMubWFwKHF1ZXJ5ID0+IGdldFNjb3JlRm9yRWFjaFF1ZXJ5KHF1ZXJ5LCBjb250ZW50VHlwZSkpO1xyXG4gICBpZiAocXVlcnlTY29yZXMuaW5kZXhPZigwKSA+IC0xKSB7XHJcbiAgICAgcmV0dXJuIDA7XHJcbiAgIH1cclxuICAgcmV0dXJuIHF1ZXJ5U2NvcmVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xyXG4gfTtcclxuXHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGEgcmVsZXZhbmNlIHNjb3JlIGZvciBhIHNpbmdsZSBzdHJpbmdcclxuICpcclxuICogQHBhcmFtICB7dHlwZX0gcXVlcnkgICAgICAgZGVzY3JpcHRpb25cclxuICogQHBhcmFtICB7dHlwZX0gY29udGVudFR5cGUgZGVzY3JpcHRpb25cclxuICogQHJldHVybiB7dHlwZX0gICAgICAgICAgICAgZGVzY3JpcHRpb25cclxuICovXHJcbmNvbnN0IGdldFNjb3JlRm9yRWFjaFF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5LCBjb250ZW50VHlwZSkge1xyXG4gICBxdWVyeSA9IHF1ZXJ5LnRyaW0oKTtcclxuICAgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUudGl0bGUpKSB7XHJcbiAgICAgcmV0dXJuIDEwMDtcclxuICAgfVxyXG4gICBlbHNlIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLnN1bW1hcnkpKSB7XHJcbiAgICAgcmV0dXJuIDU7XHJcbiAgIH1cclxuICAgZWxzZSBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5kZXNjcmlwdGlvbikpIHtcclxuICAgICByZXR1cm4gNTtcclxuICAgfVxyXG4gICBlbHNlIGlmIChhcnJheUhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUua2V5d29yZHMpKSB7XHJcbiAgICAgcmV0dXJuIDU7XHJcbiAgIH1cclxuICAgZWxzZSB7XHJcbiAgICAgcmV0dXJuIDA7XHJcbiAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYSBuZWVkbGUgaXMgZm91bmQgaW4gdGhlIGhheXN0YWNrLlxyXG4gKiBOb3QgY2FzZSBzZW5zaXRpdmVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5lZWRsZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaGF5c3RhY2tcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmNvbnN0IGhhc1N1YlN0cmluZyA9IGZ1bmN0aW9uKG5lZWRsZSwgaGF5c3RhY2spIHtcclxuICBpZiAoaGF5c3RhY2sgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGhheXN0YWNrLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhlbHBlciBmdW5jdGlvbiwgY2hlY2tzIGlmIGFycmF5IGhhcyBjb250YWlucyBhIHN1YnN0cmluZ1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN1YlN0cmluZ1xyXG4gKiBAcGFyYW0gIHtBcnJheX0gYXJyXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5jb25zdCBhcnJheUhhc1N1YlN0cmluZyA9IGZ1bmN0aW9uKHN1YlN0cmluZywgYXJyKSB7XHJcbiAgaWYgKGFyciA9PT0gdW5kZWZpbmVkIHx8IHN1YlN0cmluZyA9PT0gJycpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhcnIuc29tZShzdHJpbmcgPT4gaGFzU3ViU3RyaW5nKHN1YlN0cmluZywgc3RyaW5nKSk7XHJcbn07XHJcblxyXG5jb25zdCBBZGROdW1iZXI9ZnVuY3Rpb24oYSxiKVxyXG57XHJcbiAgcmV0dXJuIGErYjtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsImltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3NcclxuICogQG1peGVzIEV2ZW50ZnVsXHJcbiAqXHJcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRTZWN0aW9uIHtcclxuXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUsIHNlcnZpY2VzKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgLy8gc2VydmljZXNcclxuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcclxuXHJcbiAgICAvLyBJbnB1dCBlbGVtZW50IGZvciB0aGUgSDVQIGZpbGVcclxuICAgIGNvbnN0IGg1cFVwbG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICBoNXBVcGxvYWQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2ZpbGUnKTtcclxuXHJcbiAgICAvLyBTZW5kcyB0aGUgSDVQIGZpbGUgdG8gdGhlIHBsdWdpblxyXG4gICAgY29uc3QgdXNlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB1c2VCdXR0b24udGV4dENvbnRlbnQgPSAnVXNlJztcclxuICAgIHVzZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHJcbiAgICAgIC8vIEFkZCB0aGUgSDVQIGZpbGUgdG8gYSBmb3JtLCByZWFkeSBmb3IgdHJhbnNwb3J0YXRpb25cclxuICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICBkYXRhLmFwcGVuZCgnaDVwJywgaDVwVXBsb2FkLmZpbGVzWzBdKTtcclxuXHJcbiAgICAgIC8vIFVwbG9hZCBjb250ZW50IHRvIHRoZSBwbHVnaW5cclxuICAgICAgdGhpcy5zZXJ2aWNlcy51cGxvYWRDb250ZW50KGRhdGEpXHJcbiAgICAgICAgLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAvLyBGaXJlIHRoZSByZWNlaXZlZCBkYXRhIHRvIGFueSBsaXN0ZW5lcnNcclxuICAgICAgICAgIHNlbGYuZmlyZSgndXBsb2FkJywganNvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGg1cFVwbG9hZCk7XHJcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHVzZUJ1dHRvbik7XHJcblxyXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwiKGZ1bmN0aW9uKHNlbGYpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGlmIChzZWxmLmZldGNoKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIHZhciBzdXBwb3J0ID0ge1xyXG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxyXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXHJcbiAgICBibG9iOiAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJiAnQmxvYicgaW4gc2VsZiAmJiAoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbmV3IEJsb2IoKVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9KSgpLFxyXG4gICAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gc2VsZixcclxuICAgIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcclxuICB9XHJcblxyXG4gIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyKSB7XHJcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXHJcbiAgICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxyXG4gICAgICAnW29iamVjdCBVaW50OEFycmF5XScsXHJcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXHJcbiAgICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcclxuICAgICAgJ1tvYmplY3QgVWludDE2QXJyYXldJyxcclxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxyXG4gICAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxyXG4gICAgICAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcclxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcclxuICAgIF1cclxuXHJcbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICByZXR1cm4gb2JqICYmIERhdGFWaWV3LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKG9iailcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPSBBcnJheUJ1ZmZlci5pc1ZpZXcgfHwgZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSlcclxuICAgIH1cclxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLlxcXl9gfH5dL2kudGVzdChuYW1lKSkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWVcclxuICB9XHJcblxyXG4gIC8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XHJcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcclxuICAgIHZhciBpdGVyYXRvciA9IHtcclxuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxyXG4gICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcclxuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBpdGVyYXRvclxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGl0ZXJhdG9yXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcclxuICAgIHRoaXMubWFwID0ge31cclxuXHJcbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcclxuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXHJcbiAgICAgIH0sIHRoaXMpXHJcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcclxuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlcikge1xyXG4gICAgICAgIHRoaXMuYXBwZW5kKGhlYWRlclswXSwgaGVhZGVyWzFdKVxyXG4gICAgICB9LCB0aGlzKVxyXG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XHJcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXHJcbiAgICAgIH0sIHRoaXMpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xyXG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcclxuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXHJcbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLm1hcFtuYW1lXVxyXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXHJcbiAgfVxyXG5cclxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cclxuICB9XHJcblxyXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXHJcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcclxuICB9XHJcblxyXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVOYW1lKG5hbWUpKVxyXG4gIH1cclxuXHJcbiAgSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXHJcbiAgfVxyXG5cclxuICBIZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcclxuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcclxuICAgICAgaWYgKHRoaXMubWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzLm1hcFtuYW1lXSwgbmFtZSwgdGhpcylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGl0ZW1zID0gW11cclxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXHJcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXHJcbiAgfVxyXG5cclxuICBIZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpdGVtcyA9IFtdXHJcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcclxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcclxuICB9XHJcblxyXG4gIEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpdGVtcyA9IFtdXHJcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxyXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxyXG4gIH1cclxuXHJcbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcclxuICAgIEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XHJcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJykpXHJcbiAgICB9XHJcbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxyXG4gICAgICB9XHJcbiAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNBcnJheUJ1ZmZlcihibG9iKSB7XHJcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxyXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxyXG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXHJcbiAgICByZXR1cm4gcHJvbWlzZVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xyXG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcclxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcclxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXHJcbiAgICByZXR1cm4gcHJvbWlzZVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xyXG4gICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYpXHJcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoYXJzLmpvaW4oJycpXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBidWZmZXJDbG9uZShidWYpIHtcclxuICAgIGlmIChidWYuc2xpY2UpIHtcclxuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcclxuICAgICAgdmlldy5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmKSlcclxuICAgICAgcmV0dXJuIHZpZXcuYnVmZmVyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBCb2R5KCkge1xyXG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXHJcblxyXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XHJcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxyXG4gICAgICBpZiAoIWJvZHkpIHtcclxuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5XHJcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcclxuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHlcclxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XHJcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxyXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xyXG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpXHJcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xyXG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKVxyXG4gICAgICAgIC8vIElFIDEwLTExIGNhbid0IGhhbmRsZSBhIERhdGFWaWV3IGJvZHkuXHJcbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcclxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIChBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSB8fCBpc0FycmF5QnVmZmVyVmlldyhib2R5KSkpIHtcclxuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgQm9keUluaXQgdHlwZScpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcclxuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXHJcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcclxuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xyXG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxyXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHJlamVjdGVkXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcclxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pKVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcclxuICAgICAgaWYgKHJlamVjdGVkKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xyXG4gICAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcclxuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcclxuICB2YXIgbWV0aG9kcyA9IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnLCAnUE9TVCcsICdQVVQnXVxyXG5cclxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XHJcbiAgICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXHJcbiAgICByZXR1cm4gKG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xKSA/IHVwY2FzZWQgOiBtZXRob2RcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keVxyXG5cclxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcclxuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybFxyXG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcclxuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcclxuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXHJcbiAgICAgIHRoaXMubW9kZSA9IGlucHV0Lm1vZGVcclxuICAgICAgaWYgKCFib2R5ICYmIGlucHV0Ll9ib2R5SW5pdCAhPSBudWxsKSB7XHJcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxyXG4gICAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dClcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdvbWl0J1xyXG4gICAgaWYgKG9wdGlvbnMuaGVhZGVycyB8fCAhdGhpcy5oZWFkZXJzKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcclxuICAgIH1cclxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKVxyXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXHJcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbFxyXG5cclxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxyXG4gICAgfVxyXG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcclxuICB9XHJcblxyXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcywgeyBib2R5OiB0aGlzLl9ib2R5SW5pdCB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcclxuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKClcclxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xyXG4gICAgICBpZiAoYnl0ZXMpIHtcclxuICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpXHJcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXHJcbiAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpXHJcbiAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGZvcm1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XHJcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcclxuICAgIC8vIFJlcGxhY2UgaW5zdGFuY2VzIG9mIFxcclxcbiBhbmQgXFxuIGZvbGxvd2VkIGJ5IGF0IGxlYXN0IG9uZSBzcGFjZSBvciBob3Jpem9udGFsIHRhYiB3aXRoIGEgc3BhY2VcclxuICAgIC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMwI3NlY3Rpb24tMy4yXHJcbiAgICB2YXIgcHJlUHJvY2Vzc2VkSGVhZGVycyA9IHJhd0hlYWRlcnMucmVwbGFjZSgvXFxyP1xcbltcXHQgXSsvLCAnICcpXHJcbiAgICBwcmVQcm9jZXNzZWRIZWFkZXJzLnNwbGl0KC9cXHI/XFxuLykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKVxyXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcclxuICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLmpvaW4oJzonKS50cmltKClcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGhlYWRlcnNcclxuICB9XHJcblxyXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcclxuXHJcbiAgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcclxuICAgIGlmICghb3B0aW9ucykge1xyXG4gICAgICBvcHRpb25zID0ge31cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcclxuICAgIHRoaXMuc3RhdHVzID0gJ3N0YXR1cycgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzIDogMjAwXHJcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXHJcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSydcclxuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcclxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcclxuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KVxyXG4gIH1cclxuXHJcbiAgQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcclxuXHJcbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XHJcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXHJcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcclxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcclxuICAgICAgdXJsOiB0aGlzLnVybFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KVxyXG4gICAgcmVzcG9uc2UudHlwZSA9ICdlcnJvcidcclxuICAgIHJldHVybiByZXNwb25zZVxyXG4gIH1cclxuXHJcbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXHJcblxyXG4gIFJlc3BvbnNlLnJlZGlyZWN0ID0gZnVuY3Rpb24odXJsLCBzdGF0dXMpIHtcclxuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcclxuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogc3RhdHVzLCBoZWFkZXJzOiB7bG9jYXRpb246IHVybH19KVxyXG4gIH1cclxuXHJcbiAgc2VsZi5IZWFkZXJzID0gSGVhZGVyc1xyXG4gIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3RcclxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcclxuXHJcbiAgc2VsZi5mZXRjaCA9IGZ1bmN0aW9uKGlucHV0LCBpbml0KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXHJcbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxyXG5cclxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxyXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXHJcbiAgICAgICAgICBoZWFkZXJzOiBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXHJcbiAgICAgICAgdmFyIGJvZHkgPSAncmVzcG9uc2UnIGluIHhociA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHRcclxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcclxuICAgICAgfVxyXG5cclxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcclxuICAgICAgfVxyXG5cclxuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKVxyXG5cclxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xyXG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIgJiYgc3VwcG9ydC5ibG9iKSB7XHJcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcclxuICAgIH0pXHJcbiAgfVxyXG4gIHNlbGYuZmV0Y2gucG9seWZpbGwgPSB0cnVlXHJcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZmV0Y2guanMiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlLCBjbGFzc0xpc3RDb250YWlucywgcXVlcnlTZWxlY3Rvciwgbm9kZUxpc3RUb0FycmF5IH0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xyXG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcclxuXHJcbi8qKlxyXG4gKiBAY29uc3RhbnRcclxuICovXHJcbmNvbnN0IEFUVFJJQlVURV9TSVpFID0gJ2RhdGEtc2l6ZSc7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3QgZGlzYWJsZSA9IHNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3QgZW5hYmxlID0gcmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtib29sZWFufSBlbmFibGVkXHJcbiAqL1xyXG5jb25zdCB0b2dnbGVFbmFibGVkID0gKGVsZW1lbnQsIGVuYWJsZWQpID0+IChlbmFibGVkID8gZW5hYmxlIDogZGlzYWJsZSkoZWxlbWVudCk7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGhpZGRlblxyXG4gKi9cclxuY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IGN1cnJ5KChoaWRkZW4sIGVsZW1lbnQpID0+IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBoaWRkZW4udG9TdHJpbmcoKSwgZWxlbWVudCkpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IGlzRGlzYWJsZWQgPSBoYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcblxyXG4vKipcclxuICogVXBkYXRlIHRoZSB2aWV3XHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXHJcbiAqL1xyXG5jb25zdCB1cGRhdGVWaWV3ID0gKGVsZW1lbnQsIHN0YXRlKSA9PiB7XHJcbiAgY29uc3QgcHJldkJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXZpb3VzJyk7XHJcbiAgY29uc3QgbmV4dEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQnKTtcclxuICBjb25zdCBsaXN0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xyXG4gIGNvbnN0IHRvdGFsQ291bnQgPSBsaXN0LmNoaWxkRWxlbWVudENvdW50O1xyXG5cclxuICAvLyB1cGRhdGUgbGlzdCBzaXplc1xyXG4gIGxpc3Quc3R5bGUud2lkdGggPSBgJHsxMDAgLyBzdGF0ZS5kaXNwbGF5Q291bnQgKiB0b3RhbENvdW50fSVgO1xyXG4gIGxpc3Quc3R5bGUubWFyZ2luTGVmdCA9IGAke3N0YXRlLnBvc2l0aW9uICogKDEwMCAvIHN0YXRlLmRpc3BsYXlDb3VudCl9JWA7XHJcblxyXG4gIC8vIHVwZGF0ZSBpbWFnZSBzaXplc1xyXG4gIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGknKVxyXG4gICAgLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gdG90YWxDb3VudH0lYCk7XHJcblxyXG4gIC8vIHRvZ2dsZSBidXR0b24gdmlzaWJpbGl0eVxyXG4gIFtwcmV2QnV0dG9uLCBuZXh0QnV0dG9uXVxyXG4gICAgLmZvckVhY2godG9nZ2xlVmlzaWJpbGl0eShzdGF0ZS5kaXNwbGF5Q291bnQgPj0gdG90YWxDb3VudCkpO1xyXG5cclxuICAvLyB0b2dnbGUgYnV0dG9uIGVuYWJsZSwgZGlzYWJsZWRcclxuICB0b2dnbGVFbmFibGVkKG5leHRCdXR0b24sIHN0YXRlLnBvc2l0aW9uID4gKHN0YXRlLmRpc3BsYXlDb3VudCAtIHRvdGFsQ291bnQpKTtcclxuICB0b2dnbGVFbmFibGVkKHByZXZCdXR0b24sIHN0YXRlLnBvc2l0aW9uIDwgMCk7XHJcbn07XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBidXR0b24gY2xpY2tlZFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBidXR0b25cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gdXBkYXRlU3RhdGVcclxuICogQHBhcmFtIHtFdmVudH1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5jb25zdCBvbk5hdmlnYXRpb25CdXR0b25DbGljayA9IGN1cnJ5KChlbGVtZW50LCBzdGF0ZSwgYnV0dG9uLCB1cGRhdGVTdGF0ZSwgZXZlbnQpID0+IHtcclxuICBpZighaXNEaXNhYmxlZChidXR0b24pKXtcclxuICAgIHVwZGF0ZVN0YXRlKHN0YXRlKTtcclxuICAgIHVwZGF0ZVZpZXcoZWxlbWVudCwgc3RhdGUpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZXMgYW4gaW1hZ2VcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpbWFnZVxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IGluaXRJbWFnZSA9IGN1cnJ5KChlbGVtZW50LCBpbWFnZSkgPT4ge1xyXG4gIGxldCB0YXJnZXRJZCA9IGltYWdlLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xyXG4gIGxldCB0YXJnZXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhcmdldElkfWApO1xyXG5cclxuICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJykpO1xyXG4gIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKSlcclxufSk7XHJcblxyXG4vKipcclxuICogQ2FsbGJhY2sgZm9yIHdoZW4gdGhlIGRvbSBpcyB1cGRhdGVkXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXHJcbiAqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IHJlY29yZFxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IGhhbmRsZURvbVVwZGF0ZSA9IGN1cnJ5KChlbGVtZW50LCBzdGF0ZSwgcmVjb3JkKSA9PiB7XHJcbiAgLy8gb24gYWRkIGltYWdlIHJ1biBpbml0aWFsaXphdGlvblxyXG4gIGlmKHJlY29yZC50eXBlID09PSAnY2hpbGRMaXN0Jykge1xyXG4gICAgbm9kZUxpc3RUb0FycmF5KHJlY29yZC5hZGRlZE5vZGVzKVxyXG4gICAgICAuZmlsdGVyKGNsYXNzTGlzdENvbnRhaW5zKCdzbGlkZScpKVxyXG4gICAgICAubWFwKHF1ZXJ5U2VsZWN0b3IoJ2ltZycpKVxyXG4gICAgICAuZm9yRWFjaChpbml0SW1hZ2UoZWxlbWVudCkpO1xyXG4gIH1cclxuXHJcbiAgLy8gdXBkYXRlIHRoZSB2aWV3XHJcbiAgdXBkYXRlVmlldyhlbGVtZW50LCBPYmplY3QuYXNzaWduKHN0YXRlLCB7XHJcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxyXG4gICAgcG9zaXRpb246IDBcclxuICB9KSk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xyXG4gIC8vIGdldCBidXR0b24gaHRtbCBlbGVtZW50c1xyXG4gIGNvbnN0IG5leHRCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0Jyk7XHJcbiAgY29uc3QgcHJldkJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXZpb3VzJyk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEB0eXBlZGVmIHtvYmplY3R9IEltYWdlU2Nyb2xsZXJTdGF0ZVxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkaXNwbGF5Q291bnRcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcG9zaXRpb25cclxuICAgKi9cclxuICBjb25zdCBzdGF0ZSA9IHtcclxuICAgIGRpc3BsYXlDb3VudDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUklCVVRFX1NJWkUpIHx8IDUsXHJcbiAgICBwb3NpdGlvbjogMFxyXG4gIH07XHJcblxyXG4gIC8vIGluaXRpYWxpemUgYnV0dG9uc1xyXG4gIG5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk5hdmlnYXRpb25CdXR0b25DbGljayhlbGVtZW50LCBzdGF0ZSwgbmV4dEJ1dHRvbiwgc3RhdGUgPT4gc3RhdGUucG9zaXRpb24tLSkpO1xyXG4gIHByZXZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk5hdmlnYXRpb25CdXR0b25DbGljayhlbGVtZW50LCBzdGF0ZSwgcHJldkJ1dHRvbiwgc3RhdGUgPT4gc3RhdGUucG9zaXRpb24rKykpO1xyXG5cclxuICAvLyBpbml0aWFsaXplIGltYWdlc1xyXG4gIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2FyaWEtY29udHJvbHNdJykuZm9yRWFjaChpbml0SW1hZ2UoZWxlbWVudCkpO1xyXG5cclxuICAvLyBsaXN0ZW4gZm9yIHVwZGF0ZXMgdG8gZGF0YS1zaXplXHJcbiAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZm9yRWFjaChoYW5kbGVEb21VcGRhdGUoZWxlbWVudCwgc3RhdGUpKSk7XHJcblxyXG4gIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwge1xyXG4gICAgc3VidHJlZTogdHJ1ZSxcclxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcclxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW0FUVFJJQlVURV9TSVpFXVxyXG4gIH0pO1xyXG5cclxuICAvLyBpbml0aWFsaXplIHBvc2l0aW9uXHJcbiAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XHJcblxyXG4gIHJldHVybiBlbGVtZW50O1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyLmpzIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGUsIHRvZ2dsZUF0dHJpYnV0ZSwgaGlkZSwgc2hvdywgdG9nZ2xlVmlzaWJpbGl0eX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xyXG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcclxuaW1wb3J0IHsgaW5pdENvbGxhcHNpYmxlIH0gZnJvbSAnLi4vdXRpbHMvYXJpYSc7XHJcblxyXG4vKipcclxuICogVW5zZWxlY3RzIGFsbCBlbGVtZW50cyBpbiBhbiBhcnJheVxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBhcmlhLWV4cGFuZGVkIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50IHRvIGZhbHNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICovXHJcbmNvbnN0IHVuRXhwYW5kID0gc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XHJcblxyXG4vKipcclxuICogSW5pdGlhdGVzIGEgdGFiIHBhbmVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xyXG4gIC8vIGVsZW1lbnRzXHJcbiAgY29uc3QgbWVudUl0ZW1zID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cIm1lbnVpdGVtXCJdJyk7XHJcbiAgY29uc3QgdG9nZ2xlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtY29udHJvbHNdW2FyaWEtZXhwYW5kZWRdJyk7XHJcblxyXG4gIC8vIG1vdmUgc2VsZWN0XHJcbiAgbWVudUl0ZW1zLmZvckVhY2gobWVudUl0ZW0gPT4ge1xyXG4gICAgbWVudUl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgIHVuU2VsZWN0QWxsKG1lbnVJdGVtcyk7XHJcbiAgICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xyXG4gICAgICB1bkV4cGFuZCh0b2dnbGVyKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICAvLyBpbml0IGNvbGxhcHNlIGFuZCBvcGVuXHJcbiAgaW5pdENvbGxhcHNpYmxlKGVsZW1lbnQpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9tZW51LmpzIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcclxuaW1wb3J0IHtmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBoaWRlQWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCB1blNlbGVjdEFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJykpO1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcclxuICBjb25zdCB0YWJzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYlwiXScpO1xyXG4gIGNvbnN0IHRhYlBhbmVscyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJwYW5lbFwiXScpO1xyXG5cclxuICB0YWJzLmZvckVhY2godGFiID0+IHtcclxuICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuICAgICAgdW5TZWxlY3RBbGwodGFicyk7XHJcbiAgICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xyXG5cclxuICAgICAgaGlkZUFsbCh0YWJQYW5lbHMpO1xyXG5cclxuICAgICAgbGV0IHRhYlBhbmVsSWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XHJcbiAgICAgIHNob3coZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0YWJQYW5lbElkfWApKTtcclxuICAgIH0pO1xyXG4gIH0pXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3RhYi1wYW5lbC5qcyIsInJlcXVpcmUoJy4uLy4uL3NyYy9zdHlsZXMvbWFpbi5zY3NzJyk7XHJcblxyXG4vLyBMb2FkIGxpYnJhcnlcclxuSDVQID0gSDVQIHx8IHt9O1xyXG5INVAuSHViQ2xpZW50ID0gcmVxdWlyZSgnLi4vc2NyaXB0cy9odWInKS5kZWZhdWx0O1xyXG5INVAuSHViQ2xpZW50LnJlbmRlckVycm9yTWVzc2FnZSA9IHJlcXVpcmUoJy4uL3NjcmlwdHMvdXRpbHMvZXJyb3JzJykuZGVmYXVsdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudHJpZXMvZGlzdC5qcyJdLCJzb3VyY2VSb290IjoiIn0=