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
   * @param {object} state
   * @param {HubServices} services
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
    this.contentTypeDetail = new _contentTypeDetail2.default({}, services);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTFhM2M1YTRmOTlkZTVkMjI2MzUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2FyaWEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL21haW4uc2Nzcz82YTc4Iiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21lc3NhZ2Utdmlldy9tZXNzYWdlLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL21lbnUuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudHJpZXMvZGlzdC5qcyJdLCJuYW1lcyI6WyJFdmVudGZ1bCIsImxpc3RlbmVycyIsIm9uIiwidHlwZSIsImxpc3RlbmVyIiwic2NvcGUiLCJ0cmlnZ2VyIiwicHVzaCIsImZpcmUiLCJldmVudCIsInRyaWdnZXJzIiwiZXZlcnkiLCJjYWxsIiwicHJvcGFnYXRlIiwidHlwZXMiLCJldmVudGZ1bCIsIm5ld1R5cGUiLCJzZWxmIiwiZm9yRWFjaCIsImN1cnJ5IiwiZm4iLCJhcml0eSIsImxlbmd0aCIsImYxIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJhcmd1bWVudHMiLCJhcHBseSIsImYyIiwiYXJnczIiLCJjb25jYXQiLCJjb21wb3NlIiwiZm5zIiwicmVkdWNlIiwiZiIsImciLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJuYW1lIiwiZWwiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJhdHRyaWJ1dGVFcXVhbHMiLCJ0b2dnbGVBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInBhcmVudCIsImNoaWxkIiwicXVlcnlTZWxlY3RvciIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZUNoaWxkIiwib2xkQ2hpbGQiLCJjbGFzc0xpc3RDb250YWlucyIsImNscyIsImNsYXNzTGlzdCIsIm5vZGVMaXN0VG9BcnJheSIsIm5vZGVMaXN0IiwiaGlkZSIsInNob3ciLCJ0b2dnbGVWaXNpYmlsaXR5IiwidmlzaWJsZSIsImVsZW1lbnQiLCJyZWxheUNsaWNrRXZlbnRBcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJpZCIsInN0b3BQcm9wYWdhdGlvbiIsInJlbmRlckVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjbG9zZUJ1dHRvbiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsIm1lc3NhZ2VDb250ZW50IiwidGl0bGUiLCJjb250ZW50IiwibWVzc2FnZVdyYXBwZXIiLCJkaXNtaXNzaWJsZSIsImJ1dHRvbiIsInVuZGVmaW5lZCIsIm1lc3NhZ2VCdXR0b24iLCJpbml0IiwiaXNFeHBhbmRlZCIsImluaXRDb2xsYXBzaWJsZSIsInRvZ2dsZXIiLCJjb2xsYXBzaWJsZUlkIiwiY29sbGFwc2libGUiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiYXR0cmlidXRlRmlsdGVyIiwiSHViIiwic3RhdGUiLCJzZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJjb250ZW50VHlwZVNlY3Rpb24iLCJ1cGxvYWRTZWN0aW9uIiwidmlldyIsInNldFBhbmVsVGl0bGUiLCJjbG9zZVBhbmVsIiwic2V0U2VjdGlvblR5cGUiLCJ0b2dnbGVQYW5lbE9wZW4iLCJiaW5kIiwic2V0dXAiLCJpbml0Q29udGVudFR5cGVMaXN0IiwiaW5pdFRhYlBhbmVsIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZSIsImdldENvbnRlbnRUeXBlIiwidGhlbiIsInNldFRpdGxlIiwic2VjdGlvbklkIiwidGFiQ29uZmlncyIsImdldEVsZW1lbnQiLCJjb25maWciLCJzZWxlY3RlZCIsImFkZFRhYiIsInRhYkNvbmZpZyIsImFkZEJvdHRvbUJvcmRlciIsIkFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQiLCJNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OIiwiaXNFbXB0eSIsInRleHQiLCJoaWRlQWxsIiwiQ29udGVudFR5cGVEZXRhaWxWaWV3Iiwicm9vdEVsZW1lbnQiLCJjcmVhdGVWaWV3IiwiYnV0dG9uQmFyIiwidXNlQnV0dG9uIiwiaW5zdGFsbEJ1dHRvbiIsImJ1dHRvbnMiLCJpbWFnZSIsIm93bmVyIiwiZGVzY3JpcHRpb24iLCJkZW1vQnV0dG9uIiwiY2Fyb3VzZWwiLCJjYXJvdXNlbExpc3QiLCJsaWNlbmNlUGFuZWwiLCJpbnN0YWxsTWVzc2FnZSIsImluc3RhbGxNZXNzYWdlQ2xvc2UiLCJzdWNjZXNzIiwiaW5uZXJUZXh0IiwibGlnaHRib3giLCJjaGlsZEVsZW1lbnRDb3VudCIsInVybCIsImFsdCIsInRodW1ibmFpbCIsInNyYyIsImVsbGlwc2lzIiwidG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCIsImRlc2NyaXB0aW9uRXhwYW5kZWQiLCJzaXplIiwic3Vic3RyIiwiaW5zdGFsbGVkIiwic2hvd0J1dHRvbkJ5U2VsZWN0b3IiLCJDb250ZW50VHlwZURldGFpbCIsImluc3RhbGwiLCJ1cGRhdGUiLCJpbnN0YWxsQ29udGVudFR5cGUiLCJzZXRJc0luc3RhbGxlZCIsInNldEluc3RhbGxNZXNzYWdlIiwiY2F0Y2giLCJlcnJvck1lc3NhZ2UiLCJlcnJvciIsImVycm9yQ29kZSIsImNvbnNvbGUiLCJyZXNldCIsInNldElkIiwic2V0RGVzY3JpcHRpb24iLCJzZXRJbWFnZSIsImljb24iLCJzZXRFeGFtcGxlIiwiZXhhbXBsZSIsInNldE93bmVyIiwic2V0TGljZW5jZSIsImxpY2Vuc2UiLCJyZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsIiwic2NyZWVuc2hvdHMiLCJhZGRJbWFnZVRvQ2Fyb3VzZWwiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiaGFzQ2hpbGROb2RlcyIsImxhc3RDaGlsZCIsInJvdyIsImNyZWF0ZUNvbnRlbnRUeXBlUm93IiwidXNlQnV0dG9uQ29uZmlnIiwiaW5zdGFsbEJ1dHRvbkNvbmZpZyIsInN1bW1hcnkiLCJDb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZXMiLCJyZW1vdmVBbGxSb3dzIiwiYWRkUm93IiwidW5zZWxlY3RBbGwiLCJDb250ZW50QnJvd3NlclZpZXciLCJtZW51YmFyIiwiaW5wdXRGaWVsZCIsImRpc3BsYXlTZWxlY3RlZCIsImlucHV0QnV0dG9uIiwidGFyZ2V0IiwicXVlcnkiLCJrZXlDb2RlIiwid2hpY2giLCJzZWFyY2hiYXIiLCJwYXJlbnRFbGVtZW50IiwiZm9jdXMiLCJtZW51dGl0bGUiLCJtZW51SWQiLCJzZWFyY2hUZXh0IiwiYWN0aW9uIiwibWVzc2FnZVZpZXciLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwiYWRkIiwiZXZlbnROYW1lIiwiY2hvaWNlIiwic2VsZWN0ZWROYW1lIiwibWVudUl0ZW1zIiwic2VsZWN0ZWRNZW51SXRlbSIsInVuZGVybGluZSIsIkNvbnRlbnRUeXBlU2VjdGlvblRhYnMiLCJBTEwiLCJNWV9DT05URU5UX1RZUEVTIiwiTU9TVF9QT1BVTEFSIiwiZmlsdGVyUHJvcGVydHkiLCJDb250ZW50VHlwZVNlY3Rpb24iLCJ0eXBlQWhlYWRFbmFibGVkIiwic2VhcmNoU2VydmljZSIsImNvbnRlbnRUeXBlTGlzdCIsImNvbnRlbnRUeXBlRGV0YWlsIiwidGFiIiwiaGFzT3duUHJvcGVydHkiLCJhZGRNZW51SXRlbSIsImluaXRNZW51Iiwic2VjdGlvbiIsInNlYXJjaCIsInNlbGVjdE1lbnVJdGVtQnlJZCIsInJlc2V0TWVudU9uRW50ZXIiLCJhcHBseVNlYXJjaEZpbHRlciIsImNsZWFySW5wdXRGaWVsZCIsInVwZGF0ZURpc3BsYXlTZWxlY3RlZCIsInNob3dEZXRhaWxWaWV3IiwiY2xvc2VEZXRhaWxWaWV3IiwiaGFuZGxlRXJyb3IiLCJkaXNwbGF5TWVzc2FnZSIsInNldERpc3BsYXlTZWxlY3RlZCIsImUiLCJjdHMiLCJsb2FkQnlJZCIsIkh1YlNlcnZpY2VzIiwiY2FjaGVkQ29udGVudFR5cGVzIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibnMiLCJnZXRBamF4VXJsIiwiYm9keSIsImZvcm1EYXRhIiwiQVRUUklCVVRFX0RBVEFfSUQiLCJpc09wZW4iLCJIdWJWaWV3IiwicmVuZGVyVGFiUGFuZWwiLCJyZW5kZXJQYW5lbCIsImV4cGFuZGVkIiwidGFiQ29udGFpbmVyRWxlbWVudCIsInBhbmVsIiwic2V0VGltZW91dCIsInRhYmxpc3QiLCJ0YWJMaXN0V3JhcHBlciIsInRhYklkIiwidGFiUGFuZWxJZCIsInRhYlBhbmVsIiwiTWVzc2FnZVZpZXciLCJTZWFyY2hTZXJ2aWNlIiwiZmlsdGVyQnlRdWVyeSIsInByb3BlcnR5Iiwic29ydCIsImN0MSIsImN0MiIsInNjb3JlIiwiZ2V0U2VhcmNoU2NvcmUiLCJzb3J0U2VhcmNoUmVzdWx0cyIsImEiLCJiIiwicG9wdWxhcml0eSIsInF1ZXJpZXMiLCJzcGxpdCIsInF1ZXJ5U2NvcmVzIiwiZ2V0U2NvcmVGb3JFYWNoUXVlcnkiLCJ0cmltIiwiaGFzU3ViU3RyaW5nIiwiYXJyYXlIYXNTdWJTdHJpbmciLCJrZXl3b3JkcyIsIm5lZWRsZSIsImhheXN0YWNrIiwidG9Mb3dlckNhc2UiLCJzdWJTdHJpbmciLCJzdHJpbmciLCJBZGROdW1iZXIiLCJVcGxvYWRTZWN0aW9uIiwiaDVwVXBsb2FkIiwidGV4dENvbnRlbnQiLCJkYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmaWxlcyIsInVwbG9hZENvbnRlbnQiLCJzdXBwb3J0Iiwic2VhcmNoUGFyYW1zIiwiaXRlcmFibGUiLCJTeW1ib2wiLCJibG9iIiwiQmxvYiIsImFycmF5QnVmZmVyIiwidmlld0NsYXNzZXMiLCJpc0RhdGFWaWV3Iiwib2JqIiwiRGF0YVZpZXciLCJpc1Byb3RvdHlwZU9mIiwiaXNBcnJheUJ1ZmZlclZpZXciLCJBcnJheUJ1ZmZlciIsImlzVmlldyIsIk9iamVjdCIsIm5vcm1hbGl6ZU5hbWUiLCJTdHJpbmciLCJ0ZXN0IiwiVHlwZUVycm9yIiwibm9ybWFsaXplVmFsdWUiLCJpdGVyYXRvckZvciIsIml0ZW1zIiwiaXRlcmF0b3IiLCJuZXh0Iiwic2hpZnQiLCJkb25lIiwiSGVhZGVycyIsImhlYWRlcnMiLCJpc0FycmF5IiwiaGVhZGVyIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIm9sZFZhbHVlIiwiZ2V0IiwiaGFzIiwic2V0IiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwia2V5cyIsImVudHJpZXMiLCJjb25zdW1lZCIsImJvZHlVc2VkIiwiZmlsZVJlYWRlclJlYWR5IiwicmVhZGVyIiwib25sb2FkIiwib25lcnJvciIsInJlYWRCbG9iQXNBcnJheUJ1ZmZlciIsIkZpbGVSZWFkZXIiLCJwcm9taXNlIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJyZWFkQmxvYkFzVGV4dCIsInJlYWRBc1RleHQiLCJyZWFkQXJyYXlCdWZmZXJBc1RleHQiLCJidWYiLCJVaW50OEFycmF5IiwiY2hhcnMiLCJpIiwiZnJvbUNoYXJDb2RlIiwiam9pbiIsImJ1ZmZlckNsb25lIiwiYnl0ZUxlbmd0aCIsImJ1ZmZlciIsIkJvZHkiLCJfaW5pdEJvZHkiLCJfYm9keUluaXQiLCJfYm9keVRleHQiLCJfYm9keUJsb2IiLCJfYm9keUZvcm1EYXRhIiwiVVJMU2VhcmNoUGFyYW1zIiwiX2JvZHlBcnJheUJ1ZmZlciIsIkVycm9yIiwicmVqZWN0ZWQiLCJkZWNvZGUiLCJKU09OIiwicGFyc2UiLCJtZXRob2RzIiwibm9ybWFsaXplTWV0aG9kIiwidXBjYXNlZCIsInRvVXBwZXJDYXNlIiwiUmVxdWVzdCIsImlucHV0Iiwib3B0aW9ucyIsIm1vZGUiLCJyZWZlcnJlciIsImNsb25lIiwiZm9ybSIsImJ5dGVzIiwicmVwbGFjZSIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhcnNlSGVhZGVycyIsInJhd0hlYWRlcnMiLCJwcmVQcm9jZXNzZWRIZWFkZXJzIiwibGluZSIsInBhcnRzIiwia2V5IiwiUmVzcG9uc2UiLCJib2R5SW5pdCIsInN0YXR1cyIsIm9rIiwic3RhdHVzVGV4dCIsInJlZGlyZWN0U3RhdHVzZXMiLCJyZWRpcmVjdCIsIlJhbmdlRXJyb3IiLCJsb2NhdGlvbiIsInJlcXVlc3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInJlc3BvbnNlVVJMIiwicmVzcG9uc2VUZXh0Iiwib250aW1lb3V0Iiwib3BlbiIsIndpdGhDcmVkZW50aWFscyIsInJlc3BvbnNlVHlwZSIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwicG9seWZpbGwiLCJBVFRSSUJVVEVfU0laRSIsImRpc2FibGUiLCJlbmFibGUiLCJ0b2dnbGVFbmFibGVkIiwiZW5hYmxlZCIsImhpZGRlbiIsImlzRGlzYWJsZWQiLCJ1cGRhdGVWaWV3IiwicHJldkJ1dHRvbiIsIm5leHRCdXR0b24iLCJsaXN0IiwidG90YWxDb3VudCIsInN0eWxlIiwid2lkdGgiLCJkaXNwbGF5Q291bnQiLCJtYXJnaW5MZWZ0IiwicG9zaXRpb24iLCJvbk5hdmlnYXRpb25CdXR0b25DbGljayIsInVwZGF0ZVN0YXRlIiwiaW5pdEltYWdlIiwidGFyZ2V0SWQiLCJoYW5kbGVEb21VcGRhdGUiLCJyZWNvcmQiLCJhZGRlZE5vZGVzIiwic3VidHJlZSIsImNoaWxkTGlzdCIsInVuU2VsZWN0QWxsIiwidW5FeHBhbmQiLCJtZW51SXRlbSIsInRhYnMiLCJ0YWJQYW5lbHMiLCJyZXF1aXJlIiwiSDVQIiwiSHViQ2xpZW50IiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUE7OztBQUdPLElBQU1BLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxTQUFPO0FBQzdCQyxlQUFXLEVBRGtCOztBQUc3Qjs7Ozs7Ozs7OztBQVVBQyxRQUFJLFlBQVNDLElBQVQsRUFBZUMsUUFBZixFQUF5QkMsS0FBekIsRUFBZ0M7QUFDbEM7Ozs7O0FBS0EsVUFBTUMsVUFBVTtBQUNkLG9CQUFZRixRQURFO0FBRWQsaUJBQVNDO0FBRkssT0FBaEI7O0FBS0EsV0FBS0osU0FBTCxDQUFlRSxJQUFmLElBQXVCLEtBQUtGLFNBQUwsQ0FBZUUsSUFBZixLQUF3QixFQUEvQztBQUNBLFdBQUtGLFNBQUwsQ0FBZUUsSUFBZixFQUFxQkksSUFBckIsQ0FBMEJELE9BQTFCOztBQUVBLGFBQU8s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QU4sQ0FBYWhLLFlBQWIsQ0FBMEIsZUFBMUIsRUFBMkMsTUFBM0M7O0FBRUFzRixjQUFRa1YsU0FBUjs7QUFFQSxVQUFJeEwsYUFBYTVSLE1BQU00TSxNQUFOLENBQWFuSyxZQUFiLENBQTBCLGVBQTFCLENBQWpCO0FBQ0FzQixXQUFLRyxRQUFRZCxhQUFSLE9BQTBCd08sVUFBMUIsQ0FBTDtBQUNELEtBVEQ7QUFVRCxHQVhEO0FBWUQsQzs7Ozs7Ozs7O0FDdkNELG1CQUFBeUwsQ0FBUSxDQUFSOztBQUVBO0FBQ0FDLE1BQU1BLE9BQU8sRUFBYjtBQUNBQSxJQUFJQyxTQUFKLEdBQWdCLG1CQUFBRixDQUFRLENBQVIsRUFBMEJHLE9BQTFDO0FBQ0FGLElBQUlDLFNBQUosQ0FBY2haLGtCQUFkLEdBQW1DLG1CQUFBOFksQ0FBUSxDQUFSLEVBQW1DRyxPQUF0RSxDIiwiZmlsZSI6Img1cC1odWItY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGUxYTNjNWE0Zjk5ZGU1ZDIyNjM1IiwiLyoqXG4gKiBAbWl4aW5cbiAqL1xuZXhwb3J0IGNvbnN0IEV2ZW50ZnVsID0gKCkgPT4gKHtcbiAgbGlzdGVuZXJzOiB7fSxcblxuICAvKipcbiAgICogTGlzdGVuIHRvIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbc2NvcGVdXG4gICAqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtFdmVudGZ1bH1cbiAgICovXG4gIG9uOiBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgc2NvcGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZWRlZiB7b2JqZWN0fSBUcmlnZ2VyXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2NvcGVcbiAgICAgKi9cbiAgICBjb25zdCB0cmlnZ2VyID0ge1xuICAgICAgJ2xpc3RlbmVyJzogbGlzdGVuZXIsXG4gICAgICAnc2NvcGUnOiBzY29wZVxuICAgIH07XG5cbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2godHJpZ2dlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogRmlyZSBldmVudC4gSWYgYW55IG9mIHRoZSBsaXN0ZW5lcnMgcmV0dXJucyBmYWxzZSwgcmV0dXJuIGZhbHNlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZXZlbnRdXG4gICAqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgZmlyZTogZnVuY3Rpb24odHlwZSwgZXZlbnQpIHtcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuXG4gICAgcmV0dXJuIHRyaWdnZXJzLmV2ZXJ5KGZ1bmN0aW9uKHRyaWdnZXIpIHtcbiAgICAgIHJldHVybiB0cmlnZ2VyLmxpc3RlbmVyLmNhbGwodHJpZ2dlci5zY29wZSB8fCB0aGlzLCBldmVudCkgIT09IGZhbHNlO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIGZvciBldmVudHMgb24gYW5vdGhlciBFdmVudGZ1bCwgYW5kIHByb3BhZ2F0ZSBpdCB0cm91Z2ggdGhpcyBFdmVudGZ1bFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB0eXBlc1xuICAgKiBAcGFyYW0ge0V2ZW50ZnVsfSBldmVudGZ1bFxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2V2ZW50TmFtZV0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHdoZW4gcHJvcG9nYXRlZFxuICAgKi9cbiAgcHJvcGFnYXRlOiBmdW5jdGlvbih0eXBlcywgZXZlbnRmdWwsIG5ld1R5cGUpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgdHlwZXMuZm9yRWFjaCh0eXBlID0+IGV2ZW50ZnVsLm9uKHR5cGUsIGV2ZW50ID0+IHNlbGYuZmlyZShuZXdUeXBlIHx8IHR5cGUsIGV2ZW50KSkpO1xuICB9XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsIi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgdmVyc2lvbiBvZiBhIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjdXJyeSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGNvbnN0IGFyaXR5ID0gZm4ubGVuZ3RoO1xuXG4gIHJldHVybiBmdW5jdGlvbiBmMSgpIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBpZiAoYXJncy5sZW5ndGggPj0gYXJpdHkpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZjIoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgcmV0dXJuIGYxLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KGFyZ3MyKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBDb21wb3NlIGZ1bmN0aW9ucyB0b2dldGhlciwgZXhlY3V0aW5nIGZyb20gcmlnaHQgdG8gbGVmdFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24uLi59IGZuc1xuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29tcG9zZSA9ICguLi5mbnMpID0+IGZucy5yZWR1Y2UoKGYsIGcpID0+ICguLi5hcmdzKSA9PiBmKGcoLi4uYXJncykpKTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBlbGVtZW50IGluIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZm9yRWFjaCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIGFyci5mb3JFYWNoKGZuKTtcbn0pO1xuXG4vKipcbiAqIE1hcHMgYSBmdW5jdGlvbiB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IG1hcCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIubWFwKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmaWx0ZXIgdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLmZpbHRlcihmbik7XG59KTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgc29tZSB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHNvbWUgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLnNvbWUoZm4pO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgdmFsdWVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnRhaW5zID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5pbmRleE9mKHZhbHVlKSAhPSAtMTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgc3VwcGxpZWQgdmFsdWVzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHdpdGhvdXQgPSBjdXJyeShmdW5jdGlvbiAodmFsdWVzLCBhcnIpIHtcbiAgcmV0dXJuIGZpbHRlcih2YWx1ZSA9PiAhY29udGFpbnModmFsdWUsIHZhbHVlcyksIGFycilcbn0pO1xuXG4vKipcbiAqIFRha2VzIGEgc3RyaW5nIHRoYXQgaXMgZWl0aGVyICd0cnVlJyBvciAnZmFsc2UnIGFuZCByZXR1cm5zIHRoZSBvcHBvc2l0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBib29sXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgaW52ZXJzZUJvb2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoYm9vbCkge1xuICByZXR1cm4gKGJvb2wgIT09ICd0cnVlJykudG9TdHJpbmcoKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsImltcG9ydCB7Y3VycnksIGludmVyc2VCb29sZWFuU3RyaW5nfSBmcm9tICcuL2Z1bmN0aW9uYWwnXG5cbi8qKlxuICogR2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmcm9tIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBTZXQgYW4gYXR0cmlidXRlIG9uIGEgaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHNldEF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCB2YWx1ZSwgZWwpID0+IGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkpO1xuXG4vKipcbiAqIFJlbW92ZSBhdHRyaWJ1dGUgZnJvbSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBoYXNBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IGVsLmhhc0F0dHJpYnV0ZShuYW1lKSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlIHRoYXQgZXF1YWxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVFcXVhbHMgPSBjdXJyeSgobmFtZSwgdmFsdWUsIGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IHZhbHVlKTtcblxuLyoqXG4gKiBUb2dnbGVzIGFuIGF0dHJpYnV0ZSBiZXR3ZWVuICd0cnVlJyBhbmQgJ2ZhbHNlJztcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IGdldEF0dHJpYnV0ZShuYW1lLCBlbCk7XG4gIHNldEF0dHJpYnV0ZShuYW1lLCBpbnZlcnNlQm9vbGVhblN0cmluZyh2YWx1ZSksIGVsKTtcbn0pO1xuXG4vKipcbiAqIFRoZSBhcHBlbmRDaGlsZCgpIG1ldGhvZCBhZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0IG9mIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWVkIHBhcmVudCBub2RlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgYXBwZW5kQ2hpbGQgPSBjdXJyeSgocGFyZW50LCBjaGlsZCkgPT4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIGEgZGVzY2VuZGFudCBvZiB0aGUgZWxlbWVudCBvbiB3aGljaCBpdCBpcyBpbnZva2VkXG4gKiB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yID0gY3VycnkoKHNlbGVjdG9yLCBlbCkgPT4gZWwucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpO1xuXG4vKipcbiAqIFJldHVybnMgYSBub24tbGl2ZSBOb2RlTGlzdCBvZiBhbGwgZWxlbWVudHMgZGVzY2VuZGVkIGZyb20gdGhlIGVsZW1lbnQgb24gd2hpY2ggaXRcbiAqIGlzIGludm9rZWQgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2YgQ1NTIHNlbGVjdG9ycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtOb2RlTGlzdH1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3JBbGwgPSBjdXJyeSgoc2VsZWN0b3IsIGVsKSA9PiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG5cbi8qKlxuICogVGhlIHJlbW92ZUNoaWxkKCkgbWV0aG9kIHJlbW92ZXMgYSBjaGlsZCBub2RlIGZyb20gdGhlIERPTS4gUmV0dXJucyByZW1vdmVkIG5vZGUuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBwYXJlbnRcbiAqIEBwYXJhbSB7Tm9kZX0gb2xkQ2hpbGRcbiAqXG4gKiBAcmV0dXJuIHtOb2RlfVxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2hpbGQgPSBjdXJyeSgocGFyZW50LCBvbGRDaGlsZCkgPT4gcGFyZW50LnJlbW92ZUNoaWxkKG9sZENoaWxkKSk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgbm9kZSBoYXMgYSBjbGFzc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbHNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBjbGFzc0xpc3RDb250YWlucyA9IGN1cnJ5KChjbHMsIGVsKSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xzKSk7XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIE5vZGVMaXN0IHRvIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtOb2RlTGlzdH0gbm9kZUxpc3RcbiAqXG4gKiBAcmV0dXJuIHtOb2RlW119XG4gKi9cbmV4cG9ydCBjb25zdCBub2RlTGlzdFRvQXJyYXkgPSBub2RlTGlzdCA9PiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChub2RlTGlzdCk7XG5cbi8qKlxuICogQWRkcyBhcmlhLWhpZGRlbj10cnVlIHRvIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBBZGRzIGFyaWEtaGlkZGVuPWZhbHNlIHRvIGFuIGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBUb2dnbGVzIGFyaWEtaGlkZGVuIG9uIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSBjdXJyeSgodmlzaWJsZSwgZWxlbWVudCkgPT4gKHZpc2libGUgPyBzaG93IDogaGlkZSkoZWxlbWVudCkpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuXG4vKipcbiAqICBUcmFuc2Zvcm1zIGEgRE9NIGNsaWNrIGV2ZW50IGludG8gYW4gRXZlbnRmdWwncyBldmVudFxuICogIEBzZWUgRXZlbnRmdWxcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmcgfCBPYmplY3R9IHR5cGVcbiAqIEBwYXJhbSAge0V2ZW50ZnVsfSBldmVudGZ1bFxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgcmVsYXlDbGlja0V2ZW50QXMgPSBjdXJyeShmdW5jdGlvbih0eXBlLCBldmVudGZ1bCwgZWxlbWVudCkge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGV2ZW50ZnVsLmZpcmUodHlwZSwge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGlkOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gZG9uJ3QgYnViYmxlXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50O1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCIvKipcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcudHlwZSAgICAgICAgIHR5cGUgb2YgdGhlIG1lc3NhZ2U6IGluZm8sIHN1Y2Nlc3MsIGVycm9yXG4gKiBAcGFyYW0gIHtib29sZWFufSAgY29uZmlnLmRpc21pc3NpYmxlICB3aGV0aGVyIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNtaXNzZWRcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcuY29udGVudCAgICAgIG1lc3NhZ2UgY29udGVudCB1c3VhbGx5IGEgJ2gzJyBhbmQgYSAncCdcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBkaXYgY29udGFpbmluZyB0aGUgbWVzc2FnZSBlbGVtZW50XG4gKi9cblxuLy9UT0RPIGhhbmRsZSBzdHJpbmdzLCBodG1sLCBiYWRseSBmb3JtZWQgb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJFcnJvck1lc3NhZ2UobWVzc2FnZSkge1xuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSAnY2xvc2UnO1xuICBjbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJiN4MjcxNSc7XG5cbiAgY29uc3QgbWVzc2FnZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWVzc2FnZUNvbnRlbnQuY2xhc3NOYW1lID0gJ21lc3NhZ2UtY29udGVudCc7XG4gIG1lc3NhZ2VDb250ZW50LmlubmVySFRNTCA9ICc8aDE+JyArIG1lc3NhZ2UudGl0bGUgKyAnPC9oMT4nICsgJzxwPicgKyBtZXNzYWdlLmNvbnRlbnQgKyAnPC9wPic7XG5cbiAgY29uc3QgbWVzc2FnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWVzc2FnZVdyYXBwZXIuY2xhc3NOYW1lID0gJ21lc3NhZ2UnICsgJyAnICsgYCR7bWVzc2FnZS50eXBlfWAgKyAobWVzc2FnZS5kaXNtaXNzaWJsZSA/ICcgZGlzbWlzc2libGUnIDogJycpO1xuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VDb250ZW50KTtcblxuICBpZiAobWVzc2FnZS5idXR0b24gIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IG1lc3NhZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBtZXNzYWdlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24nO1xuICAgIG1lc3NhZ2VCdXR0b24uaW5uZXJIVE1MID0gbWVzc2FnZS5idXR0b247XG4gICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUJ1dHRvbik7XG4gIH1cblxuICByZXR1cm4gbWVzc2FnZVdyYXBwZXI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXJyb3JzLmpzIiwiaW1wb3J0IHtpbml0Q29sbGFwc2libGV9IGZyb20gJy4uL3V0aWxzL2FyaWEnO1xuXG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgaW5pdENvbGxhcHNpYmxlKGVsZW1lbnQpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvcGFuZWwuanMiLCJpbXBvcnQge2F0dHJpYnV0ZUVxdWFscywgdG9nZ2xlQXR0cmlidXRlLCB0b2dnbGVWaXNpYmlsaXR5fSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFyaWEtZXhwYW5kZWQ9dHJ1ZSBvbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGlzRXhwYW5kZWQgPSBhdHRyaWJ1dGVFcXVhbHMoXCJhcmlhLWV4cGFuZGVkXCIsICd0cnVlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyBhcmlhLWhpZGRlbiBvbiAnY29sbGFwc2libGUnIHdoZW4gYXJpYS1leHBhbmRlZCBjaGFuZ2VzIG9uICd0b2dnbGVyJyxcbiAqIGFuZCB0b2dnbGVzIGFyaWEtZXhwYW5kZWQgb24gJ3RvZ2dsZXInIG9uIGNsaWNrXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgY29uc3QgaW5pdENvbGxhcHNpYmxlID0gKGVsZW1lbnQpID0+IHtcbiAgLy8gZWxlbWVudHNcbiAgY29uc3QgdG9nZ2xlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtY29udHJvbHNdW2FyaWEtZXhwYW5kZWRdJyk7XG4gIGNvbnN0IGNvbGxhcHNpYmxlSWQgPSB0b2dnbGVyLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICBjb25zdCBjb2xsYXBzaWJsZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y29sbGFwc2libGVJZH1gKTtcblxuICAvLyBzZXQgb2JzZXJ2ZXIgb24gdGl0bGUgZm9yIGFyaWEtZXhwYW5kZWRcbiAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdG9nZ2xlVmlzaWJpbGl0eShpc0V4cGFuZGVkKHRvZ2dsZXIpLCBjb2xsYXBzaWJsZSkpO1xuXG4gIG9ic2VydmVyLm9ic2VydmUodG9nZ2xlciwge1xuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbXCJhcmlhLWV4cGFuZGVkXCJdXG4gIH0pO1xuXG4gIC8vIFNldCBjbGljayBsaXN0ZW5lciB0aGF0IHRvZ2dsZXMgYXJpYS1leHBhbmRlZFxuICB0b2dnbGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlQXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCB0b2dnbGVyKSk7XG5cbiAgLy8gaW5pdGlhbGl6ZVxuICB0b2dnbGVWaXNpYmlsaXR5KGlzRXhwYW5kZWQodG9nZ2xlciksIGNvbGxhcHNpYmxlKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvYXJpYS5qcyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSFpwWlhkQ2IzZzlJakFnTUNBME1EQWdNakkxSWo0TkNpQWdQR1JsWm5NK0RRb2dJQ0FnUEhOMGVXeGxQZzBLSUNBZ0lDQWdMbU5zY3kweElIc05DaUFnSUNBZ0lHWnBiR3c2SUc1dmJtVTdEUW9nSUNBZ0lDQjlEUW9OQ2lBZ0lDQWdJQzVqYkhNdE1pQjdEUW9nSUNBZ0lDQm1hV3hzT2lBall6WmpObU0zT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1zSUM1amJITXROQ0I3RFFvZ0lDQWdJQ0JtYVd4c09pQWpabVptT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1nZXcwS0lDQWdJQ0FnYjNCaFkybDBlVG9nTUM0M093MEtJQ0FnSUNBZ2ZRMEtJQ0FnSUR3dmMzUjViR1UrRFFvZ0lEd3ZaR1ZtY3o0TkNpQWdQSFJwZEd4bFBtTnZiblJsYm5RZ2RIbHdaU0J3YkdGalpXaHZiR1JsY2w4eVBDOTBhWFJzWlQ0TkNpQWdQR2NnYVdROUlreGhlV1Z5WHpJaUlHUmhkR0V0Ym1GdFpUMGlUR0Y1WlhJZ01pSStEUW9nSUNBZ1BHY2dhV1E5SW1OdmJuUmxiblJmZEhsd1pWOXdiR0ZqWldodmJHUmxjaTB4WDJOdmNIa2lJR1JoZEdFdGJtRnRaVDBpWTI5dWRHVnVkQ0IwZVhCbElIQnNZV05sYUc5c1pHVnlMVEVnWTI5d2VTSStEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxURWlJSGRwWkhSb1BTSTBNREFpSUdobGFXZG9kRDBpTWpJMUlpOCtEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxUSWlJSGc5SWpFeE1pNDFNU0lnZVQwaU5ETXVOREVpSUhkcFpIUm9QU0l4TnpZdU9UWWlJR2hsYVdkb2REMGlNVE0xTGpRMUlpQnllRDBpTVRBaUlISjVQU0l4TUNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE16WXVOallpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5URXVORGtpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5qWXVNU0lnWTNrOUlqWXhMams0SWlCeVBTSTBMamd4SWk4K0RRb2dJQ0FnSUNBOFp5QnBaRDBpWDBkeWIzVndYeUlnWkdGMFlTMXVZVzFsUFNJbWJIUTdSM0p2ZFhBbVozUTdJajROQ2lBZ0lDQWdJQ0FnUEdjZ2FXUTlJbDlIY205MWNGOHlJaUJrWVhSaExXNWhiV1U5SWlac2REdEhjbTkxY0NabmREc2lQZzBLSUNBZ0lDQWdJQ0FnSUR4d1lYUm9JR2xrUFNKZlEyOXRjRzkxYm1SZlVHRjBhRjhpSUdSaGRHRXRibUZ0WlQwaUpteDBPME52YlhCdmRXNWtJRkJoZEdnbVozUTdJaUJqYkdGemN6MGlZMnh6TFRRaUlHUTlJazB5TmpNdU1qZ3NPVFV1TWpGRE1qWXdMRGt5TGpBM0xESTFOU3c1TVM0MUxESTBPQzQwTXl3NU1TNDFTREl5TjNZNFNERTVPUzQxYkMweUxqRTNMREV3TGpJMFlUSTFMamcwTERJMUxqZzBMREFzTUN3eExERXhMalE0TFRFdU5qTXNNVGt1T1RNc01Ua3VPVE1zTUN3d0xERXNNVFF1TXprc05TNDFOeXd4T0M0eU5pd3hPQzR5Tml3d0xEQXNNU3cxTGpVeUxERXpMallzTWpNdU1URXNNak11TVRFc01Dd3dMREV0TWk0NE5Dd3hNUzR3TlN3eE9DNDJOU3d4T0M0Mk5Td3dMREFzTVMwNExqQTJMRGN1Tnprc09TdzVMREFzTUN3eExUUXVNVElzTVM0ek4wZ3lNeloyTFRJeGFERXdMalF5WXpjdU16WXNNQ3d4TWk0NE15MHhMall4TERFMkxqUXlMVFZ6TlM0ek9DMDNMalE0TERVdU16Z3RNVE11TkRSRE1qWTRMakl5TERFd01pNHlPU3d5TmpZdU5UY3NPVGd1TXpVc01qWXpMakk0TERrMUxqSXhXbTB0TVRVc01UZGpMVEV1TkRJc01TNHlNaTB6TGprc01TNHlOUzAzTGpReExERXVNalZJTWpNMmRpMHhOR2cxTGpZeVlUa3VOVGNzT1M0MU55d3dMREFzTVN3M0xESXVPVE1zTnk0d05TdzNMakExTERBc01Dd3hMREV1T0RVc05DNDVNa0UyTGpNekxEWXVNek1zTUN3d0xERXNNalE0TGpNeExERXhNaTR5TlZvaUx6NE5DaUFnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpWDFCaGRHaGZJaUJrWVhSaExXNWhiV1U5SWlac2REdFFZWFJvSm1kME95SWdZMnhoYzNNOUltTnNjeTAwSWlCa1BTSk5NakF5TGprc01URTVMakV4WVRndU1USXNPQzR4TWl3d0xEQXNNQzAzTGpJNExEUXVOVEpzTFRFMkxURXVNaklzTnk0eU1pMHpNQzQ1TWtneE56UjJNakpJTVRVemRpMHlNa2d4TXpaMk5UWm9NVGQyTFRJeGFESXhkakl4YURJd0xqTXhZeTB5TGpjeUxEQXROUzB4TGpVekxUY3RNMkV4T1M0eE9Td3hPUzR4T1N3d0xEQXNNUzAwTGpjekxUUXVPRE1zTWpNdU5UZ3NNak11TlRnc01Dd3dMREV0TXkwMkxqWnNNVFl0TWk0eU5tRTRMakV4TERndU1URXNNQ3d4TERBc055NHlOaTB4TVM0M01sb2lMejROQ2lBZ0lDQWdJQ0FnUEM5blBnMEtJQ0FnSUNBZ1BDOW5QZzBLSUNBZ0lDQWdQSEpsWTNRZ1kyeGhjM005SW1Oc2N5MHpJaUI0UFNJeE56Y3VOallpSUhrOUlqVTNMalkySWlCM2FXUjBhRDBpT1RJdU1qZ2lJR2hsYVdkb2REMGlPUzR6T0NJZ2NuZzlJak11TlNJZ2NuazlJak11TlNJdlBnMEtJQ0FnSUR3dlp6NE5DaUFnUEM5blBnMEtQQzl6ZG1jK0RRbz1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBIdWJWaWV3IGZyb20gJy4vaHViLXZpZXcnO1xuaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvbiBmcm9tICcuL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uJztcbmltcG9ydCBVcGxvYWRTZWN0aW9uIGZyb20gJy4vdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24nO1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4vaHViLXNlcnZpY2VzJztcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4vdXRpbHMvZXJyb3JzJztcbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gSHViU3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aXRsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb25JZFxuICogQHByb3BlcnR5IHtib29sZWFufSBleHBhbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFwaVJvb3RVcmxcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBFcnJvck1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXJyb3JDb2RlXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gU2VsZWN0ZWRFbGVtZW50XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRcbiAqL1xuLyoqXG4gKiBTZWxlY3QgZXZlbnRcbiAqIEBldmVudCBIdWIjc2VsZWN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEVycm9yIGV2ZW50XG4gKiBAZXZlbnQgSHViI2Vycm9yXG4gKiBAdHlwZSB7RXJyb3JNZXNzYWdlfVxuICovXG4vKipcbiAqIFVwbG9hZCBldmVudFxuICogQGV2ZW50IEh1YiN1cGxvYWRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgSHViI2Vycm9yXG4gKiBAZmlyZXMgSHViI3VwbG9hZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWIge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIGNvbnRyb2xsZXJzXG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24gPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uKHN0YXRlLCB0aGlzLnNlcnZpY2VzKTtcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSwgdGhpcy5zZXJ2aWNlcyk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcblxuICAgIC8vIHByb3BhZ2F0ZSBjb250cm9sbGVyIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0J10sIHRoaXMuY29udGVudFR5cGVTZWN0aW9uKTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3VwbG9hZCddLCB0aGlzLnVwbG9hZFNlY3Rpb24pO1xuXG4gICAgLy8gaGFuZGxlIGV2ZW50c1xuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMuc2V0UGFuZWxUaXRsZSwgdGhpcyk7XG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy52aWV3LmNsb3NlUGFuZWwsIHRoaXMudmlldyk7XG4gICAgdGhpcy52aWV3Lm9uKCd0YWItY2hhbmdlJywgdGhpcy52aWV3LnNldFNlY3Rpb25UeXBlLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMudmlldy5vbigncGFuZWwtY2hhbmdlJywgdGhpcy52aWV3LnRvZ2dsZVBhbmVsT3Blbi5iaW5kKHRoaXMudmlldyksIHRoaXMudmlldyk7XG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24ub24oJ3JlbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5zZXJ2aWNlcy5zZXR1cCgpO1xuICAgICAgc2VsZi5jb250ZW50VHlwZVNlY3Rpb24uaW5pdENvbnRlbnRUeXBlTGlzdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbml0VGFiUGFuZWwoc3RhdGUpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGNvbnRlbnQgdHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgZ2V0Q29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShtYWNoaW5lTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGUgb2YgdGhlIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0UGFuZWxUaXRsZSh7aWR9KcKge1xuICAgIHRoaXMuZ2V0Q29udGVudFR5cGUoaWQpLnRoZW4oKHt0aXRsZX0pID0+IHRoaXMudmlldy5zZXRUaXRsZSh0aXRsZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgdGFiIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICovXG4gIGluaXRUYWJQYW5lbCh7IHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJyB9KSB7XG4gICAgY29uc3QgdGFiQ29uZmlncyA9IFt7XG4gICAgICB0aXRsZTogJ0NyZWF0ZSBDb250ZW50JyxcbiAgICAgIGlkOiAnY29udGVudC10eXBlcycsXG4gICAgICBjb250ZW50OiB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5nZXRFbGVtZW50KCksXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1VwbG9hZCcsXG4gICAgICBpZDogJ3VwbG9hZCcsXG4gICAgICBjb250ZW50OiB0aGlzLnVwbG9hZFNlY3Rpb24uZ2V0RWxlbWVudCgpXG4gICAgfV07XG5cbiAgICAvLyBzZXRzIHRoZSBjb3JyZWN0IG9uZSBzZWxlY3RlZFxuICAgIHRhYkNvbmZpZ3NcbiAgICAgIC5maWx0ZXIoY29uZmlnID0+IGNvbmZpZy5pZCA9PT0gc2VjdGlvbklkKVxuICAgICAgLmZvckVhY2goY29uZmlnID0+IGNvbmZpZy5zZWxlY3RlZCA9IHRydWUpO1xuXG4gICAgdGFiQ29uZmlncy5mb3JFYWNoKHRhYkNvbmZpZyA9PiB0aGlzLnZpZXcuYWRkVGFiKHRhYkNvbmZpZykpO1xuICAgIHRoaXMudmlldy5hZGRCb3R0b21Cb3JkZXIoKTsgLy8gQWRkcyBhbiBhbmltYXRlZCBib3R0b20gYm9yZGVyIHRvIGVhY2ggdGFiXG4gICAgdGhpcy52aWV3LmluaXRUYWJQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBpbiB0aGUgdmlld1xuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3R5bGVzL21haW4uc2Nzc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSwgcmVtb3ZlQ2hpbGQsIGhpZGUsIHNob3cgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IGN1cnJ5LCBmb3JFYWNoIH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIjtcbmltcG9ydCBpbml0SW1hZ2VTY3JvbGxlciBmcm9tIFwiY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlclwiO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IG5vSWNvbiBmcm9tICcuLi8uLi9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Zyc7XG5cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQgPSAnZGF0YS1pZCc7XG5cbi8qKlxuICogQGNvbnN0YW50IHtudW1iZXJ9XG4gKi9cbmNvbnN0IE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04gPSAzMDA7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBpZiBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXG4gKi9cbmNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSAoZWxlbWVudCwgdmlzaWJsZSkgPT4gKHZpc2libGUgPyBzaG93IDogaGlkZSkoZWxlbWVudCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RyaW5nIGlzIGVtcHR5XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc0VtcHR5ID0gKHRleHQpID0+ICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycpICYmICh0ZXh0Lmxlbmd0aCA9PT0gMCk7XG5cbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKGhpZGUpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsVmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgdmlld1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZVZpZXcoKTtcblxuICAgIC8vIGdyYWIgcmVmZXJlbmNlc1xuICAgIHRoaXMuYnV0dG9uQmFyID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLWJhcicpO1xuICAgIHRoaXMudXNlQnV0dG9uID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvcignLmJ1dHRvbi11c2UnKTtcbiAgICB0aGlzLmluc3RhbGxCdXR0b24gPSB0aGlzLmJ1dHRvbkJhci5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLWluc3RhbGwnKTtcbiAgICB0aGlzLmJ1dHRvbnMgPSB0aGlzLmJ1dHRvbkJhci5xdWVyeVNlbGVjdG9yQWxsKCcuYnV0dG9uJyk7XG5cbiAgICB0aGlzLmltYWdlID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC10eXBlLWltYWdlJyk7XG4gICAgdGhpcy50aXRsZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZGV0YWlscyAudGl0bGUnKTtcbiAgICB0aGlzLm93bmVyID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3duZXInKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kZXRhaWxzIC5zbWFsbCcpO1xuICAgIHRoaXMuZGVtb0J1dHRvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRlbW8tYnV0dG9uJyk7XG4gICAgdGhpcy5jYXJvdXNlbCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcm91c2VsJyk7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QgPSB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gICAgdGhpcy5saWNlbmNlUGFuZWwgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saWNlbmNlLXBhbmVsJyk7XG4gICAgdGhpcy5pbnN0YWxsTWVzc2FnZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmluc3RhbGwtbWVzc2FnZScpO1xuXG4gICAgLy8gaGlkZSBtZXNzYWdlIG9uIGNsb3NlIGJ1dHRvbiBjbGlja1xuICAgIGxldCBpbnN0YWxsTWVzc2FnZUNsb3NlID0gdGhpcy5pbnN0YWxsTWVzc2FnZS5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1jbG9zZScpO1xuICAgIGluc3RhbGxNZXNzYWdlQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBoaWRlKHRoaXMuaW5zdGFsbE1lc3NhZ2UpKTtcblxuICAgIC8vIGluaXQgaW50ZXJhY3RpdmUgZWxlbWVudHNcbiAgICBpbml0UGFuZWwodGhpcy5saWNlbmNlUGFuZWwpO1xuICAgIGluaXRJbWFnZVNjcm9sbGVyKHRoaXMuY2Fyb3VzZWwpO1xuXG4gICAgLy8gZmlyZSBldmVudHMgb24gYnV0dG9uIGNsaWNrXG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2Nsb3NlJywgdGhpcywgdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYmFjay1idXR0b24nKSk7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHRoaXMsIHRoaXMudXNlQnV0dG9uKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygnaW5zdGFsbCcsIHRoaXMsIHRoaXMuaW5zdGFsbEJ1dHRvbik7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgdmlldyBhcyBhIEhUTUxFbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlVmlldyAoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFjay1idXR0b24gaWNvbi1hcnJvdy10aGlja1wiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2Utd3JhcHBlclwiPjxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZSBjb250ZW50LXR5cGUtaW1hZ2VcIiBzcmM9XCIke25vSWNvbn1cIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtZGV0YWlsc1wiPlxuICAgICAgICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+PC9oMj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3duZXJcIj48L2Rpdj5cbiAgICAgICAgICA8cCBjbGFzcz1cInNtYWxsXCI+PC9wPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnV0dG9uIGRlbW8tYnV0dG9uXCIgdGFyZ2V0PVwiX2JsYW5rXCIgYXJpYS1oaWRkZW49XCJmYWxzZVwiIGhyZWY9XCIjXCI+Q29udGVudCBEZW1vPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhcm91c2VsXCIgcm9sZT1cInJlZ2lvblwiIGRhdGEtc2l6ZT1cIjVcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1idXR0b24gcHJldmlvdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkaXNhYmxlZD48c3BhbiBjbGFzcz1cImljb24tYXJyb3ctdGhpY2tcIj48L3NwYW4+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWJ1dHRvbiBuZXh0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGlzYWJsZWQ+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgPG5hdiBjbGFzcz1cInNjcm9sbGVyXCI+XG4gICAgICAgICAgPHVsPjwvdWw+XG4gICAgICAgIDwvbmF2PlxuICAgICAgPC9kaXY+XG4gICAgICA8aHIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbnN0YWxsLW1lc3NhZ2UgbWVzc2FnZSBkaXNtaXNzaWJsZSBzaW1wbGUgaW5mb1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWVzc2FnZS1jbG9zZSBpY29uLWNsb3NlXCI+PC9kaXY+XG4gICAgICAgIDxoMz48L2gzPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWJhclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tcHJpbWFyeSBidXR0b24tdXNlXCIgYXJpYS1oaWRkZW49XCJmYWxzZVwiIGRhdGEtaWQ9XCJcIj5Vc2U8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnkgYnV0dG9uLWluc3RhbGxcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkYXRhLWlkPVwiXCI+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPkluc3RhbGw8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnkgYnV0dG9uLWluc3RhbGxpbmdcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48c3BhbiBjbGFzcz1cImljb24tbG9hZGluZy1zZWFyY2ggaWNvbi1zcGluXCI+PC9zcGFuPkluc3RhbGxpbmc8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ncm91cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgbGljZW5jZS1wYW5lbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkZXJcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBhcmlhLWNvbnRyb2xzPVwibGljZW5jZS1wYW5lbFwiPjxzcGFuIGNsYXNzPVwiaWNvbi1hY2NvcmRpb24tYXJyb3dcIj48L3NwYW4+IFRoZSBMaWNlbmNlIEluZm88L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiIGlkPVwibGljZW5jZS1wYW5lbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHktaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBhIG1lc3NhZ2Ugb24gaW5zdGFsbFxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHN1Y2Nlc3NcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICovXG4gIHNldEluc3RhbGxNZXNzYWdlKHsgc3VjY2VzcyA9IHRydWUsIG1lc3NhZ2UgfSl7XG4gICAgdGhpcy5pbnN0YWxsTWVzc2FnZS5xdWVyeVNlbGVjdG9yKCdoMycpLmlubmVyVGV4dCA9IG1lc3NhZ2U7XG4gICAgdGhpcy5pbnN0YWxsTWVzc2FnZS5jbGFzc05hbWUgPSBgaW5zdGFsbC1tZXNzYWdlIGRpc21pc3NpYmxlIG1lc3NhZ2Ugc2ltcGxlICR7c3VjY2VzcyA/ICdpbmZvJyA6ICdlcnJvcid9YDtcbiAgICBzaG93KHRoaXMuaW5zdGFsbE1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGltYWdlcyBmcm9tIHRoZSBjYXJvdXNlbFxuICAgKi9cbiAgcmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCgpIHtcbiAgICB0aGlzLmNhcm91c2VsTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmZvckVhY2gocmVtb3ZlQ2hpbGQodGhpcy5jYXJvdXNlbExpc3QpKTtcbiAgICB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbC1saWdodGJveCcpLmZvckVhY2gocmVtb3ZlQ2hpbGQodGhpcy5jYXJvdXNlbCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpbWFnZSB0byB0aGUgY2Fyb3VzZWxcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGltYWdlXG4gICAqL1xuICBhZGRJbWFnZVRvQ2Fyb3VzZWwoaW1hZ2UpIHtcbiAgICAvLyBhZGQgbGlnaHRib3hcbiAgICBjb25zdCBsaWdodGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxpZ2h0Ym94LmlkID0gYGxpZ2h0Ym94LSR7dGhpcy5jYXJvdXNlbExpc3QuY2hpbGRFbGVtZW50Q291bnR9YDtcbiAgICBsaWdodGJveC5jbGFzc05hbWUgPSAnY2Fyb3VzZWwtbGlnaHRib3gnO1xuICAgIGxpZ2h0Ym94LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGxpZ2h0Ym94LmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBzcmM9XCIke2ltYWdlLnVybH1cIiBhbHQ9XCIke2ltYWdlLmFsdH1cIj5gO1xuICAgIHRoaXMuY2Fyb3VzZWwuYXBwZW5kQ2hpbGQobGlnaHRib3gpO1xuXG4gICAgLy8gYWRkIHRodW1ibmFpbFxuICAgIGNvbnN0IHRodW1ibmFpbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdGh1bWJuYWlsLmNsYXNzTmFtZSA9ICdzbGlkZSc7XG4gICAgdGh1bWJuYWlsLmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIiR7aW1hZ2UudXJsfVwiIGFsdD1cIiR7aW1hZ2UuYWx0fVwiIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBhcmlhLWNvbnRyb2xzPVwiJHtsaWdodGJveC5pZH1cIiAvPmA7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QuYXBwZW5kQ2hpbGQodGh1bWJuYWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICByZXNldCgpIHtcbiAgICBoaWRlKHRoaXMuaW5zdGFsbE1lc3NhZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGltYWdlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAgICovXG4gIHNldEltYWdlKHNyYykge1xuICAgIHRoaXMuaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMgfHwgbm9JY29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldElkKGlkKSB7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gICAgdGhpcy51c2VCdXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBgJHt0aXRsZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovXG4gIHNldERlc2NyaXB0aW9uKHRleHQpIHtcbiAgICBpZih0ZXh0Lmxlbmd0aCA+IE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04pIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGhpcy5lbGxpcHNpcyhNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OLCB0ZXh0KX08c3BhbiBjbGFzcz1cInJlYWQtbW9yZSBsaW5rXCI+UmVhZCBtb3JlPC9zcGFuPmA7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKCcucmVhZC1tb3JlLCAucmVhZC1sZXNzJylcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkKHRleHQpKTtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBSZWFkIGxlc3MgYW5kIFJlYWQgbW9yZSB0ZXh0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICB0b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkKHRleHQpIHtcbiAgICAvLyBmbGlwIGJvb2xlYW5cbiAgICB0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQgPSAhdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkO1xuXG4gICAgaWYodGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkKSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RleHR9PHNwYW4gY2xhc3M9XCJyZWFkLWxlc3MgbGlua1wiPlJlYWQgbGVzczwvc3Bhbj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGhpcy5lbGxpcHNpcyhNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OLCB0ZXh0KX08c3BhbiBjbGFzcz1cInJlYWQtbW9yZSBsaW5rXCI+UmVhZCBtb3JlPC9zcGFuPmA7XG4gICAgfVxuXG4gICAgdGhpcy5kZXNjcmlwdGlvblxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5yZWFkLW1vcmUsIC5yZWFkLWxlc3MnKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkKHRleHQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG9ydGVucyBhIHN0cmluZywgYW5kIHB1dHMgYW4gZWxpcHNpcyBhdCB0aGUgZW5kXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBlbGxpcHNpcyhzaXplLCB0ZXh0KSB7XG4gICAgcmV0dXJuIGAke3RleHQuc3Vic3RyKDAsIHNpemUpfS4uLmA7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbGljZW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKi9cbiAgc2V0TGljZW5jZSh0eXBlKSB7XG4gICAgaWYodHlwZSl7XG4gICAgICB0aGlzLmxpY2VuY2VQYW5lbC5xdWVyeVNlbGVjdG9yKCcucGFuZWwtYm9keS1pbm5lcicpLmlubmVyVGV4dCA9IHR5cGU7XG4gICAgICBzaG93KHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoaWRlKHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbG9uZyBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3duZXJcbiAgICovXG4gIHNldE93bmVyKG93bmVyKSB7XG4gICAgaWYob3duZXIpIHtcbiAgICAgIHRoaXMub3duZXIuaW5uZXJIVE1MID0gYEJ5ICR7b3duZXJ9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLm93bmVyLmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBleGFtcGxlIHVybFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBzZXRFeGFtcGxlKHVybCkge1xuICAgIHRoaXMuZGVtb0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwgfHwgJyMnKTtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuZGVtb0J1dHRvbiwgIWlzRW1wdHkodXJsKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBpZiB0aGUgY29udGVudCB0eXBlIGlzIGluc3RhbGxlZFxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluc3RhbGxlZFxuICAgKi9cbiAgc2V0SXNJbnN0YWxsZWQoaW5zdGFsbGVkKSB7XG4gICAgdGhpcy5zaG93QnV0dG9uQnlTZWxlY3RvcihpbnN0YWxsZWQgPyAnLmJ1dHRvbi11c2UnIDogJy5idXR0b24taW5zdGFsbCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIGFsbCBidXR0b25zIGFuZCBzaG93cyB0aGUgYnV0dG9uIG9uIHRoZSBzZWxlY3RvciBhZ2FpblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ31zZWxlY3RvclxuICAgKi9cbiAgc2hvd0J1dHRvbkJ5U2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmJ1dHRvbkJhci5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmKGJ1dHRvbikge1xuICAgICAgaGlkZUFsbCh0aGlzLmJ1dHRvbnMpO1xuICAgICAgc2hvdyhidXR0b24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVEZXRhaWxWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlld1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsIHtcbiAgY29uc3RydWN0b3Ioc3RhdGUsIHNlcnZpY2VzKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcblxuICAgIC8vIHZpZXdzXG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVEZXRhaWxWaWV3KHN0YXRlKTtcbiAgICB0aGlzLnZpZXcub24oJ2luc3RhbGwnLCB0aGlzLmluc3RhbGwsIHRoaXMpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnY2xvc2UnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGxvYWRCeUlkKGlkKSB7XG4gICAgdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcbiAgICAgIC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpXG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gICBpbnN0YWxsKHtpZH0pIHtcbiAgICAgLy8gc2V0IHNwaW5uZXJcbiAgICAgdGhpcy52aWV3LnNob3dCdXR0b25CeVNlbGVjdG9yKCcuYnV0dG9uLWluc3RhbGxpbmcnKTtcblxuICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiB0aGlzLnNlcnZpY2VzLmluc3RhbGxDb250ZW50VHlwZShjb250ZW50VHlwZS5tYWNoaW5lTmFtZSkpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4ge1xuICAgICAgICAgdGhpcy52aWV3LnNldElzSW5zdGFsbGVkKHRydWUpO1xuICAgICAgICAgdGhpcy52aWV3LnNob3dCdXR0b25CeVNlbGVjdG9yKCcuYnV0dG9uLWdldCcpO1xuICAgICAgICAgdGhpcy52aWV3LnNldEluc3RhbGxNZXNzYWdlKHtcbiAgICAgICAgICAgbWVzc2FnZTogYCR7Y29udGVudFR5cGUudGl0bGV9IHN1Y2Nlc3NmdWxseSBpbnN0YWxsZWQhYCxcbiAgICAgICAgIH0pO1xuICAgICAgIH0pXG4gICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgIHRoaXMudmlldy5zaG93QnV0dG9uQnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsJyk7XG5cbiAgICAgICAgIC8vIHByaW50IGVycm9yIG1lc3NhZ2VcbiAgICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAoZXJyb3IuZXJyb3JDb2RlKSA/IGVycm9yIDoge1xuICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgZXJyb3JDb2RlOiAnUkVTUE9OU0VfRkFJTEVEJyxcbiAgICAgICAgICAgbWVzc2FnZTogYCR7aWR9IGNvdWxkIG5vdCBiZSBpbnN0YWxsZWQhIENvbnRhY3QgeW91ciBhZG1pbmlzdHJhdG9yLmAsXG4gICAgICAgICB9O1xuICAgICAgICAgdGhpcy52aWV3LnNldEluc3RhbGxNZXNzYWdlKGVycm9yTWVzc2FnZSk7XG5cbiAgICAgICAgIC8vIGxvZyB3aG9sZSBlcnJvciBtZXNzYWdlIHRvIGNvbnNvbGVcbiAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luc3RhbGxhdGlvbiBlcnJvcicsIGVycm9yKTtcbiAgICAgICB9KTtcbiAgIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdmlldyB3aXRoIHRoZSBjb250ZW50IHR5cGUgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlKSB7XG4gICAgdGhpcy52aWV3LnJlc2V0KCk7XG4gICAgdGhpcy52aWV3LnNldElkKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcbiAgICB0aGlzLnZpZXcuc2V0VGl0bGUoY29udGVudFR5cGUudGl0bGUpO1xuICAgIHRoaXMudmlldy5zZXREZXNjcmlwdGlvbihjb250ZW50VHlwZS5kZXNjcmlwdGlvbik7XG4gICAgdGhpcy52aWV3LnNldEltYWdlKGNvbnRlbnRUeXBlLmljb24pO1xuICAgIHRoaXMudmlldy5zZXRFeGFtcGxlKGNvbnRlbnRUeXBlLmV4YW1wbGUpO1xuICAgIHRoaXMudmlldy5zZXRPd25lcihjb250ZW50VHlwZS5vd25lcik7XG4gICAgdGhpcy52aWV3LnNldElzSW5zdGFsbGVkKGNvbnRlbnRUeXBlLmluc3RhbGxlZCk7XG4gICAgdGhpcy52aWV3LnNldExpY2VuY2UoY29udGVudFR5cGUubGljZW5zZSk7XG5cbiAgICAvLyB1cGRhdGUgY2Fyb3VzZWxcbiAgICB0aGlzLnZpZXcucmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCgpO1xuICAgIGNvbnRlbnRUeXBlLnNjcmVlbnNob3RzLmZvckVhY2godGhpcy52aWV3LmFkZEltYWdlVG9DYXJvdXNlbCwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCByZW1vdmVDaGlsZCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IG5vSWNvbiBmcm9tICcuLi8uLi9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Zyc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIHJvb3QgZWxlbWVudFxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1saXN0JztcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHJvd3MgZnJvbSByb290IGVsZW1lbnRcbiAgICovXG4gIHJlbW92ZUFsbFJvd3MoKSB7XG4gICAgd2hpbGUodGhpcy5yb290RWxlbWVudC5oYXNDaGlsZE5vZGVzKCkgKXtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5yb290RWxlbWVudC5sYXN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcm93XG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICBhZGRSb3coY29udGVudFR5cGUpIHtcbiAgICBjb25zdCByb3cgPSB0aGlzLmNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCB0aGlzKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncm93LXNlbGVjdGVkJywgdGhpcywgcm93KTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHJvdylcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIENvbnRlbnQgVHlwZSBjb25maWd1cmF0aW9uIGFuZCBjcmVhdGVzIGEgcm93IGRvbVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKiBAcGFyYW0ge0V2ZW50ZnVsfSBzY29wZVxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCBzY29wZSkge1xuICAgIC8vIHJvdyBpdGVtXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC5pZCA9IGBjb250ZW50LXR5cGUtJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1gO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuXG4gICAgLy8gY3JlYXRlIGJ1dHRvbiBjb25maWdcbiAgICBjb25zdCB1c2VCdXR0b25Db25maWcgPSB7IHRleHQ6ICdVc2UnLCBjbHM6ICdidXR0b24tcHJpbWFyeScsIGljb246ICcnIH07XG4gICAgY29uc3QgaW5zdGFsbEJ1dHRvbkNvbmZpZyA9IHsgdGV4dDogJ0dldCcsIGNsczogJ2J1dHRvbi1pbnZlcnNlLXByaW1hcnkgYnV0dG9uLWluc3RhbGwnLCBpY29uOiAnaWNvbi1hcnJvdy10aGljayd9O1xuICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRlbnRUeXBlLmluc3RhbGxlZCA/ICB1c2VCdXR0b25Db25maWc6IGluc3RhbGxCdXR0b25Db25maWc7XG5cbiAgICBjb25zdCB0aXRsZSA9IGNvbnRlbnRUeXBlLnRpdGxlIHx8IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gY29udGVudFR5cGUuc3VtbWFyeSB8fCAnJztcblxuICAgIGNvbnN0IGltYWdlID0gY29udGVudFR5cGUuaWNvbiB8fCBub0ljb247XG5cbiAgICAvLyBjcmVhdGUgaHRtbFxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZX1cIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uICR7YnV0dG9uLmNsc31cIiBkYXRhLWlkPVwiJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1cIiB0YWJpbmRleD1cIjBcIj48c3BhbiBjbGFzcz1cIiR7YnV0dG9uLmljb259XCI+PC9zcGFuPiR7YnV0dG9uLnRleHR9PC9zcGFuPlxuICAgICAgPGg0PiR7dGl0bGV9PC9oND5cbiAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPiR7ZGVzY3JpcHRpb259PC9kaXY+XG4gICBgO1xuXG4gICAgLy8gaGFuZGxlIHVzZSBidXR0b25cbiAgICBjb25zdCB1c2VCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tcHJpbWFyeScpO1xuICAgIGlmKHVzZUJ1dHRvbil7XG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0Jywgc2NvcGUsIHVzZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlTGlzdFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWxpc3Qtdmlld1wiO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBSb3cgc2VsZWN0ZWQgZXZlbnRcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIFVwZGF0ZSBjb250ZW50IHR5cGUgbGlzdCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGFkZCB0aGUgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlTGlzdFZpZXcoc3RhdGUpO1xuICAgIHRoaXMucHJvcGFnYXRlKFsncm93LXNlbGVjdGVkJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGUgdGhpcyBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGlzIGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgd2l0aCBuZXcgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlcykge1xuICAgIHRoaXMudmlldy5yZW1vdmVBbGxSb3dzKCk7XG4gICAgY29udGVudFR5cGVzLmZvckVhY2godGhpcy52aWV3LmFkZFJvdywgdGhpcy52aWV3KTtcbiAgICB0aGlzLmZpcmUoJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHt9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZpZXdzIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwiaW1wb3J0IE1lc3NhZ2VWaWV3IGZyb20gXCIuLi9tZXNzYWdlLXZpZXcvbWVzc2FnZS12aWV3XCI7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIHF1ZXJ5U2VsZWN0b3JBbGwgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IGluaXRNZW51IGZyb20gJ2NvbXBvbmVudHMvbWVudSc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBlbGVtZW50c1xuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHVuc2VsZWN0QWxsID0gZm9yRWFjaChyZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSk7XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRCcm93c2VyVmlld1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRCcm93c2VyVmlldyB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRzXG4gICAgdGhpcy5yb290RWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudChzdGF0ZSk7XG5cbiAgICAvLyBwaWNrIGVsZW1lbnRzXG4gICAgdGhpcy5tZW51YmFyID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLW5hdicpO1xuICAgIHRoaXMuaW5wdXRGaWVsZCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignW3JvbGU9XCJzZWFyY2hcIl0gaW5wdXQnKTtcbiAgICB0aGlzLmRpc3BsYXlTZWxlY3RlZCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci10b2dnbGVyLXNlbGVjdGVkJyk7XG4gICAgY29uc3QgaW5wdXRCdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwic2VhcmNoXCJdIC5pbnB1dC1ncm91cC1hZGRvbicpO1xuXG4gICAgLy8gaW5wdXQgZmllbGRcbiAgICB0aGlzLmlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICB0aGlzLmZpcmUoJ3NlYXJjaCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBxdWVyeTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgICBrZXlDb2RlOiBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGlucHV0IGJ1dHRvblxuICAgIGlucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgIGxldCBzZWFyY2hiYXIgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKTtcblxuICAgICAgIHRoaXMuZmlyZSgnc2VhcmNoJywge1xuICAgICAgICAgZWxlbWVudDogc2VhcmNoYmFyLFxuICAgICAgICAgcXVlcnk6IHNlYXJjaGJhci52YWx1ZSxcbiAgICAgICAgIGtleUNvZGU6IDEzIC8vIEFjdCBsaWtlIGFuICdlbnRlcicga2V5IHByZXNzXG4gICAgICAgfSk7XG5cbiAgICAgICBzZWFyY2hiYXIuZm9jdXMoKTtcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIG1lbnUgZ3JvdXAgZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVFbGVtZW50KHN0YXRlKSB7XG4gICAgbGV0IG1lbnV0aXRsZSA9ICdCcm93c2UgY29udGVudCB0eXBlcyc7XG4gICAgbGV0IG1lbnVJZCA9ICdjb250ZW50LXR5cGUtZmlsdGVyJztcbiAgICBsZXQgc2VhcmNoVGV4dCA9ICdTZWFyY2ggZm9yIENvbnRlbnQgVHlwZXMnO1xuXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLXNlY3Rpb24tdmlldyc7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwibWVudS1ncm91cFwiPlxuICAgICAgICA8bmF2ICByb2xlPVwibWVudWJhclwiIGNsYXNzPVwibmF2YmFyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhci1oZWFkZXJcIj5cbiAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdmJhci10b2dnbGVyIG5hdmJhci10b2dnbGVyLXJpZ2h0XCIgYXJpYS1jb250cm9scz1cIiR7bWVudUlkfVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlci1zZWxlY3RlZFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1hY2NvcmRpb24tYXJyb3dcIj48L3NwYW4+XG4gICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItYnJhbmRcIj4ke21lbnV0aXRsZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8dWwgaWQ9XCIke21lbnVJZH1cIiBjbGFzcz1cIm5hdmJhci1uYXZcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3VsPlxuICAgICAgICA8L25hdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIiByb2xlPVwic2VhcmNoXCI+XG4gICAgICAgICAgPGlucHV0IGlkPVwiaHViLXNlYXJjaC1iYXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtcm91bmRlZFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCIke3NlYXJjaFRleHR9XCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaWNvbi1zZWFyY2hcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBkaXNwbGF5TWVzc2FnZShjb25maWcpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy8gU2V0IHRoZSBhY3Rpb25cbiAgICAvLyBUT0RPIC0gc2hvdWxkIGJlIHRyYW5zbGF0YWJsZVxuICAgIGNvbmZpZy5hY3Rpb24gPSBcIlJlbG9hZFwiO1xuXG4gICAgdmFyIG1lc3NhZ2VWaWV3ID0gbmV3IE1lc3NhZ2VWaWV3KGNvbmZpZyk7XG4gICAgdmFyIGVsZW1lbnQgPSBtZXNzYWdlVmlldy5nZXRFbGVtZW50KCk7XG5cbiAgICBtZXNzYWdlVmlldy5vbignYWN0aW9uLWNsaWNrZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XG4gICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICBzZWxmLmZpcmUoJ3JlbG9hZCcpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZVZpZXcuZ2V0RWxlbWVudCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbWVudSBpdGVtXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZCBEZXRlcm1pbmVzIGlmIHRhYiBpcyBhbHJlYWR5IHNlbGVjdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiBldmVudCB0aGF0IHRhYiB3aWxsIGZpcmUgb2ZmXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgYWRkTWVudUl0ZW0oeyB0aXRsZSwgaWQsIHNlbGVjdGVkLCBldmVudE5hbWUgfSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnVpdGVtJyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBpZCk7XG4gICAgZWxlbWVudC5pbm5lclRleHQgPSB0aXRsZTtcblxuICAgIC8vIHNldHMgaWYgdGhpcyBtZW51aXRlbSBzaG91bGQgYmUgc2VsZWN0ZWRcbiAgICBpZihzZWxlY3RlZCkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgdGhpcy5kaXNwbGF5U2VsZWN0ZWQuaW5uZXJUZXh0ID0gdGl0bGU7XG4gICAgfVxuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgnbWVudS1zZWxlY3RlZCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBjaG9pY2U6IGV2ZW50TmFtZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgdG8gbWVudSBiYXJcbiAgICB0aGlzLm1lbnViYXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBpbnB1dCBmaWVsZFxuICAgKi9cbiAgY2xlYXJJbnB1dEZpZWxkKCkge1xuICAgIHRoaXMuaW5wdXRGaWVsZC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBmaWx0ZXJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdGVkTmFtZVxuICAgKi9cbiAgc2V0RGlzcGxheVNlbGVjdGVkKHNlbGVjdGVkTmFtZSkge1xuICAgIHRoaXMuZGlzcGxheVNlbGVjdGVkLmlubmVyVGV4dCA9IHNlbGVjdGVkTmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGEgbWVudSBpdGVtIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2VsZWN0TWVudUl0ZW1CeUlkKGlkKSB7XG4gICAgY29uc3QgbWVudUl0ZW1zID0gdGhpcy5tZW51YmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKTtcbiAgICBjb25zdCBzZWxlY3RlZE1lbnVJdGVtID0gdGhpcy5tZW51YmFyLnF1ZXJ5U2VsZWN0b3IoYFtyb2xlPVwibWVudWl0ZW1cIl1bZGF0YS1pZD1cIiR7aWR9XCJdYCk7XG5cbiAgICBpZihzZWxlY3RlZE1lbnVJdGVtKSB7XG4gICAgICB1bnNlbGVjdEFsbChtZW51SXRlbXMpO1xuICAgICAgc2VsZWN0ZWRNZW51SXRlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXG4gICAgICB0aGlzLmZpcmUoJ21lbnUtc2VsZWN0ZWQnLCB7XG4gICAgICAgIGVsZW1lbnQ6IHNlbGVjdGVkTWVudUl0ZW0sXG4gICAgICAgIGlkOiBzZWxlY3RlZE1lbnVJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpbml0TWVudSgpIHtcbiAgICAvLyBjcmVhdGUgdGhlIHVuZGVybGluZVxuICAgIGNvbnN0IHVuZGVybGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB1bmRlcmxpbmUuY2xhc3NOYW1lID0gJ21lbnVpdGVtLXVuZGVybGluZSc7XG4gICAgdGhpcy5tZW51YmFyLmFwcGVuZENoaWxkKHVuZGVybGluZSk7XG5cbiAgICAvLyBjYWxsIGluaXQgbWVudSBmcm9tIHNka1xuICAgIGluaXRNZW51KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsImltcG9ydCBDb250ZW50VHlwZVNlY3Rpb25WaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXdcIjtcbmltcG9ydCBTZWFyY2hTZXJ2aWNlIGZyb20gXCIuLi9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZVwiO1xuaW1wb3J0IENvbnRlbnRUeXBlTGlzdCBmcm9tICcuLi9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdCc7XG5pbXBvcnQgQ29udGVudFR5cGVEZXRhaWwgZnJvbSAnLi4vY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsJztcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMvZXJyb3JzJztcblxuLyoqXG4gKiBUYWIgc2VjdGlvbiBjb25zdGFudHNcbiAqL1xuY29uc3QgQ29udGVudFR5cGVTZWN0aW9uVGFicyA9IHtcbiAgQUxMOiB7XG4gICAgaWQ6ICdmaWx0ZXItYWxsJyxcbiAgICB0aXRsZTogJ0FsbCcsXG4gICAgZXZlbnROYW1lOiAnYWxsJ1xuICB9LFxuICBNWV9DT05URU5UX1RZUEVTOiB7XG4gICAgaWQ6ICdmaWx0ZXItbXktY29udGVudC10eXBlcycsXG4gICAgdGl0bGU6ICdNeSBDb250ZW50IFR5cGVzJyxcbiAgICBldmVudE5hbWU6ICdteS1jb250ZW50LXR5cGVzJyxcbiAgICBzZWxlY3RlZDogdHJ1ZVxuICB9LFxuICBNT1NUX1BPUFVMQVI6IHtcbiAgICBpZDogJ2ZpbHRlci1tb3N0LXBvcHVsYXInLFxuICAgIHRpdGxlOiAnTW9zdCBQb3B1bGFyJyxcbiAgICBldmVudE5hbWU6ICdtb3N0LXBvcHVsYXInLFxuICAgIGZpbHRlclByb3BlcnR5OiAncG9wdWxhcml0eSdcbiAgfVxufTtcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqIEBwYXJhbSB7SHViU2VydmljZXN9IHNlcnZpY2VzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSwgc2VydmljZXMpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIHRoaXMudHlwZUFoZWFkRW5hYmxlZCA9IHRydWU7XG5cbiAgICAvLyBhZGQgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb25WaWV3KHN0YXRlKTtcblxuICAgIC8vIGNvbnRyb2xsZXJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZShzZXJ2aWNlcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbCA9IG5ldyBDb250ZW50VHlwZURldGFpbCh7fSwgc2VydmljZXMpO1xuXG4gICAgLy8gYWRkIG1lbnUgaXRlbXNcbiAgICBmb3IgKGNvbnN0IHRhYiBpbiBDb250ZW50VHlwZVNlY3Rpb25UYWJzKSB7XG4gICAgICBpZiAoQ29udGVudFR5cGVTZWN0aW9uVGFicy5oYXNPd25Qcm9wZXJ0eSh0YWIpKSB7XG4gICAgICAgIHRoaXMudmlldy5hZGRNZW51SXRlbShDb250ZW50VHlwZVNlY3Rpb25UYWJzW3RhYl0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnZpZXcuaW5pdE1lbnUoKTtcblxuICAgIC8vIEVsZW1lbnQgZm9yIGhvbGRpbmcgbGlzdCBhbmQgZGV0YWlscyB2aWV3c1xuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtdHlwZS1zZWN0aW9uJyk7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gc2VjdGlvbjtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVMaXN0LmdldEVsZW1lbnQoKSk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmdldEVsZW1lbnQoKSk7XG5cbiAgICB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCddLCB0aGlzLmNvbnRlbnRUeXBlTGlzdCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydyZWxvYWQnXSwgdGhpcy52aWV3KTtcblxuICAgIC8vIHJlZ2lzdGVyIGxpc3RlbmVyc1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5zZWFyY2gsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy52aWV3LnNlbGVjdE1lbnVJdGVtQnlJZC5iaW5kKHRoaXMudmlldywgQ29udGVudFR5cGVTZWN0aW9uVGFicy5BTEwuaWQpKTtcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMucmVzZXRNZW51T25FbnRlciwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy5hcHBseVNlYXJjaEZpbHRlciwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy5jbGVhcklucHV0RmllbGQsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMudXBkYXRlRGlzcGxheVNlbGVjdGVkLCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5vbigncm93LXNlbGVjdGVkJywgdGhpcy5zaG93RGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignc2VsZWN0JywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xuXG4gICAgdGhpcy5pbml0Q29udGVudFR5cGVMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdCB3aXRoIGEgc2VhcmNoXG4gICAqL1xuICBpbml0Q29udGVudFR5cGVMaXN0KCkge1xuICAgIC8vIGluaXRpYWxpemUgYnkgc2VhcmNoXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChcIlwiKVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKVxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgZXJyb3JzIGNvbW11bmljYXRpbmcgd2l0aCBIVUJcbiAgICovXG4gIGhhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgLy8gVE9ETyAtIHVzZSB0cmFuc2xhdGlvbiBzeXN0ZW06XG4gICAgdGhpcy52aWV3LmRpc3BsYXlNZXNzYWdlKHtcbiAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICB0aXRsZTogJ05vdCBhYmxlIHRvIGNvbW11bmljYXRlIHdpdGggaHViLicsXG4gICAgICBjb250ZW50OiAnRXJyb3Igb2NjdXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4nXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgYSBzZWFyY2ggYW5kIHVwZGF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICAgKi9cbiAgc2VhcmNoKHtxdWVyeSwga2V5Q29kZX0pIHtcbiAgICBpZiAodGhpcy50eXBlQWhlYWRFbmFibGVkIHx8IGtleUNvZGUgPT09IDEzKSB7IC8vIFNlYXJjaCBhdXRvbWF0aWNhbGx5IG9yIG9uICdlbnRlcidcbiAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2gocXVlcnkpXG4gICAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGRpc3BsYXllZCBuYW1lIG9mIHRoZSBzZWxlY3RlZCBmaWx0ZXIgZm9yIG1vYmlsZVxuICAgKlxuICAgKiBAcGFyYW0ge1NlbGVjdGVkRWxlbWVudH0gZXZlbnRcbiAgICovXG4gIHVwZGF0ZURpc3BsYXlTZWxlY3RlZChldmVudCkge1xuICAgIHRoaXMudmlldy5zZXREaXNwbGF5U2VsZWN0ZWQoZXZlbnQuZWxlbWVudC5pbm5lclRleHQpO1xuICB9XG5cbiAgcmVzZXRNZW51T25FbnRlcih7a2V5Q29kZX0pIHtcbiAgICBpZiAoa2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHRoaXMuY2xvc2VEZXRhaWxWaWV3KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgc2VhcmNoIGZpbHRlciBkZXBlbmRpbmcgb24gd2hhdCBldmVudCBpdCByZWNlaXZlc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBFdmVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZS5jaG9pY2UgRXZlbnQgbmFtZSBvZiBjaG9zZW4gdGFiXG4gICAqL1xuICBhcHBseVNlYXJjaEZpbHRlcihlKSB7XG4gICAgc3dpdGNoKGUuY2hvaWNlKSB7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlU2VjdGlvblRhYnMuTU9TVF9QT1BVTEFSLmV2ZW50TmFtZTpcbiAgICAgICAgLy8gRmlsdGVyIG9uIHRhYidzIGZpbHRlciBwcm9wZXJ0eSwgdGhlbiB1cGRhdGUgY29udGVudCB0eXBlIGxpc3RcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgLmZpbHRlcihDb250ZW50VHlwZVNlY3Rpb25UYWJzLk1PU1RfUE9QVUxBUi5maWx0ZXJQcm9wZXJ0eSlcbiAgICAgICAgICAudGhlbihjdHMgPT4ge3RoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjdHMpfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgaW5wdXQgZmllbGRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBjbGVhcklucHV0RmllbGQoe2lkfSkge1xuICAgIGlmIChpZCAhPT0gQ29udGVudFR5cGVTZWN0aW9uVGFicy5BTEwuaWQpIHtcbiAgICAgIHRoaXMudmlldy5jbGVhcklucHV0RmllbGQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgZGV0YWlsIHZpZXdcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzaG93RGV0YWlsVmlldyh7aWR9KSB7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwubG9hZEJ5SWQoaWQpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuc2hvdygpO1xuICAgIHRoaXMudHlwZUFoZWFkRW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cblxuICAvKipcbiAgICogQ2xvc2UgZGV0YWlsIHZpZXdcbiAgICovXG4gIGNsb3NlRGV0YWlsVmlldygpIHtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5zaG93KCk7XG4gICAgdGhpcy50eXBlQWhlYWRFbmFibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJpbXBvcnQgJy4vdXRpbHMvZmV0Y2gnO1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBDb250ZW50VHlwZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFqb3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWlub3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGF0Y2hWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWFqb3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWlub3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3VtbWFyeVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNyZWF0ZWRBdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHVwZGF0ZWRfQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpc1JlY29tbWVuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9wdWxhcml0eVxuICogQHByb3BlcnR5IHtvYmplY3RbXX0gc2NyZWVuc2hvdHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsaWNlbnNlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXhhbXBsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHR1dG9yaWFsXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBrZXl3b3Jkc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG93bmVyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGluc3RhbGxlZFxuICogQHByb3BlcnR5IHtib29sZWFufSByZXN0cmljdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlNlcnZpY2VzIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcGlSb290VXJsXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7IGFwaVJvb3RVcmwgfSkge1xuICAgIHRoaXMuYXBpUm9vdFVybCA9IGFwaVJvb3RVcmw7XG4gICAgdGhpcy5zZXR1cCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHRoZSBjb250ZW50IHR5cGUgbWV0YWRhdGFcbiAgICovXG4gIHNldHVwKCkge1xuICAgIHRoaXMuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnQtdHlwZS1jYWNoZWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcbiAgICAudGhlbih0aGlzLmlzVmFsaWQpXG4gICAgLnRoZW4oanNvbiA9PiBqc29uLmxpYnJhcmllcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtICB7Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2V9IHJlc3BvbnNlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2U+fVxuICAgKi9cbiAgaXNWYWxpZChyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZS5tZXNzYWdlQ29kZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZVtdPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlcygpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZWRDb250ZW50VHlwZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZWRDb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcbiAgICB9KTtcblxuICAgIC8qcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50X3R5cGVfY2FjaGUvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpOyovXG4gIH1cblxuICAvKipcbiAgICogSW5zdGFsbHMgYSBjb250ZW50IHR5cGUgb24gdGhlIHNlcnZlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgaW5zdGFsbENvbnRlbnRUeXBlKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKG5zLmdldEFqYXhVcmwoJ2xpYnJhcnktaW5zdGFsbCcsIHtpZDogaWR9KSwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgYm9keTogJydcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcbiAgfVxuXG5cbiAgLy8gZm9yIHRlc3Rpbmcgd2l0aCBlcnJvclxuICAvKmluc3RhbGxDb250ZW50VHlwZShpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9bGlicmFyeS1pbnN0YWxsYCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH0qL1xuXG4gIC8qKlxuICAgKiBVcGxvYWRzIGEgY29udGVudCB0eXBlIHRvIHRoZSBzZXJ2ZXIgZm9yIHZhbGlkYXRpb25cbiAgICpcbiAgICogQHBhcmFtIHtGb3JtRGF0YX0gZm9ybURhdGEgRm9ybSBjb250YWluaW5nIHRoZSBoNXAgdGhhdCBzaG91bGQgYmUgdXBsb2FkZWQgYXMgJ2g1cCdcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGpzb24gY29udGFpbmluZyB0aGUgY29udGVudCBqc29uIGFuZCB0aGUgaDVwIGpzb25cbiAgICovXG4gIHVwbG9hZENvbnRlbnQoZm9ybURhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktdXBsb2FkYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgYm9keTogZm9ybURhdGFcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwiaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiXG5pbXBvcnQgaW5pdFRhYlBhbmVsIGZyb20gXCJjb21wb25lbnRzL3RhYi1wYW5lbFwiXG5pbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBhdHRyaWJ1dGVFcXVhbHMsIGdldEF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi91dGlscy9ldmVudHMnO1xuLyoqXG4gKiBUYWIgY2hhbmdlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyN0YWItY2hhbmdlXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIFBhbmVsIG9wZW4gb3IgY2xvc2UgZXZlbnRcbiAqIEBldmVudCBIdWJWaWV3I3BhbmVsLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0RBVEFfSUQgPSAnZGF0YS1pZCc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGlzT3BlbiA9IGhhc0F0dHJpYnV0ZSgnb3BlbicpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViVmlldyN0YWItY2hhbmdlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlZpZXcge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICB0aGlzLnJlbmRlclRhYlBhbmVsKHN0YXRlKTtcbiAgICB0aGlzLnJlbmRlclBhbmVsKHN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHBhbmVsXG4gICAqL1xuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4cGFuZGVkXG4gICAqL1xuICByZW5kZXJQYW5lbCh7dGl0bGUgPSAnJywgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnLCBleHBhbmRlZCA9IGZhbHNlfSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50aXRsZS5jbGFzc05hbWUgKz0gXCJwYW5lbC1oZWFkZXIgaWNvbi1odWItaWNvblwiO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgKCEhZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YCk7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncGFuZWwtY2hhbmdlJywgdGhpcywgdGhpcy50aXRsZSk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5ib2R5LmNsYXNzTmFtZSArPSBcInBhbmVsLWJvZHlcIjtcbiAgICB0aGlzLmJvZHkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMuYm9keS5pZCA9IGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWA7XG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lICs9IGBwYW5lbCBoNXAtc2VjdGlvbi0ke3NlY3Rpb25JZH1gO1xuICAgIGlmKGV4cGFuZGVkKXtcbiAgICAgIHRoaXMucGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgIH1cbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5ib2R5KTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lICs9IGBoNXAgaDVwLWh1YiBoNXAtc2RrYDtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuICAgIGluaXRQYW5lbCh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaWYgcGFuZWwgaXMgb3BlbiwgdGhpcyBpcyB1c2VkIGZvciBvdXRlciBib3JkZXIgY29sb3JcbiAgICovXG4gIHRvZ2dsZVBhbmVsT3BlbigpIHtcbiAgICBsZXQgcGFuZWwgPSB0aGlzLnBhbmVsO1xuICAgIGlmKGlzT3BlbihwYW5lbCkpIHtcbiAgICAgIHBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgnb3BlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtwYW5lbC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKS5mb2N1cygpfSwyMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHRhYiBwYW5lbFxuICAgKi9cbiAgcmVuZGVyVGFiUGFuZWwoc3RhdGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnRhYmxpc3QuY2xhc3NOYW1lICs9IFwidGFibGlzdFwiO1xuICAgIHRoaXMudGFibGlzdC5zZXRBdHRyaWJ1dGUgKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgdGhpcy50YWJMaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxpc3QpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5jbGFzc05hbWUgKz0gJ3RhYi1wYW5lbCc7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGFiTGlzdFdyYXBwZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0YWJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcbiAgICovXG4gIGFkZFRhYih7dGl0bGUsIGlkLCBjb250ZW50LCBzZWxlY3RlZCA9IGZhbHNlfSkge1xuICAgIGNvbnN0IHRhYklkID0gYHRhYi0ke2lkfWA7XG4gICAgY29uc3QgdGFiUGFuZWxJZCA9IGB0YWItcGFuZWwtJHtpZH1gO1xuXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0YWIuY2xhc3NOYW1lICs9ICd0YWInO1xuICAgIHRhYi5pZCA9IHRhYklkO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0YWJQYW5lbElkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQudG9TdHJpbmcoKSk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfREFUQV9JRCwgaWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XG4gICAgdGFiLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCd0YWItY2hhbmdlJywgdGhpcywgdGFiKTtcblxuICAgIGNvbnN0IHRhYlBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFiUGFuZWwuaWQgPSB0YWJQYW5lbElkO1xuICAgIHRhYlBhbmVsLmNsYXNzTmFtZSArPSAndGFicGFuZWwnO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJsbGVkYnknLCB0YWJJZCk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghc2VsZWN0ZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xuICAgIHRhYlBhbmVsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKHRhYik7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRhYlBhbmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGFuaW1hdGVkIGJvcmRlciB0byB0aGUgYm90dG9tIG9mIHRoZSB0YWJcbiAgICovXG4gIGFkZEJvdHRvbUJvcmRlcigpIHtcbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcbiAgfVxuXG4gIGluaXRUYWJQYW5lbCgpIHtcbiAgICBpbml0VGFiUGFuZWwodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0U2VjdGlvblR5cGUoe2lkfSkge1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lID0gYGg1cC1zZWN0aW9uLSR7aWR9IHBhbmVsYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwiaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7cmVsYXlDbGlja0V2ZW50QXN9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRCcm93c2VyVmlld1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VWaWV3IHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLnR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLnRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS5jb250ZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RhdGUuYWN0aW9uXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlLmRpc21pc3NhYmxlXVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoc3RhdGUpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChtZXNzYWdlKSB7XG4gICAgLy8gQ3JlYXRlIHdyYXBwZXI6XG4gICAgY29uc3QgbWVzc2FnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZXNzYWdlV3JhcHBlci5jbGFzc05hbWUgPSBgbWVzc2FnZSAke21lc3NhZ2UudHlwZX1gICsgKG1lc3NhZ2UuZGlzbWlzc2libGUgPyAnIGRpc21pc3NpYmxlJyA6ICcnKTtcblxuICAgIC8vIEFkZCBjbG9zZSBidXR0b24gaWYgZGlzbWlzYWJsZVxuICAgIGlmIChtZXNzYWdlLmRpc21pc3NpYmxlKSB7XG4gICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2Nsb3NlJztcbiAgICAgIC8vY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyYjeDI3MTUnO1xuICAgICAgLy8gVE9ET1xuICAgICAgLy8gLSBBZGQgY2xvc2UgbGFiZWwgZnJvbSB0cmFuc2xhdGlvbnNcbiAgICAgIC8vIC0gQWRkIHZpc3VhbHMgaW4gQ1NTIChmb250IGljb24pXG4gICAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnY2xvc2UnLCB0aGlzLCBjbG9zZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZXNzYWdlQ29udGVudC5jbGFzc05hbWUgPSAnbWVzc2FnZS1jb250ZW50JztcbiAgICBtZXNzYWdlQ29udGVudC5pbm5lckhUTUwgPSAnPGgxPicgKyBtZXNzYWdlLnRpdGxlICsgJzwvaDE+JyArICc8cD4nICsgbWVzc2FnZS5jb250ZW50ICsgJzwvcD4nO1xuICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VDb250ZW50KTtcblxuICAgIGlmIChtZXNzYWdlLmFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBtZXNzYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBtZXNzYWdlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24nO1xuICAgICAgbWVzc2FnZUJ1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlLmFjdGlvbjtcbiAgICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VCdXR0b24pO1xuXG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnYWN0aW9uLWNsaWNrZWQnLCB0aGlzLCBtZXNzYWdlQnV0dG9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZVdyYXBwZXI7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9tZXNzYWdlLXZpZXcvbWVzc2FnZS12aWV3LmpzIiwiaW1wb3J0IHtjdXJyeX0gZnJvbSAndXRpbHMvZnVuY3Rpb25hbCdcblxuLyoqXG4gKiBAY2xhc3NcbiAqIFRoZSBTZWFyY2ggU2VydmljZSBnZXRzIGEgY29udGVudCB0eXBlIGZyb20gaHViLXNlcnZpY2VzLmpzXG4gKiBpbiB0aGUgZm9ybSBvZiBhIHByb21pc2UuIEl0IHRoZW4gZ2VuZXJhdGVzIGEgc2NvcmUgYmFzZWRcbiAqIG9uIHRoZSBkaWZmZXJlbnQgd2VpZ2h0aW5ncyBvZiB0aGUgY29udGVudCB0eXBlIGZpZWxkcyBhbmRcbiAqIHNvcnRzIHRoZSByZXN1bHRzIGJhc2VkIG9uIHRoZSBnZW5lcmF0ZWQgc2NvcmUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTZXJ2aWNlc30gc2VydmljZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNlcnZpY2VzKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IHNlcnZpY2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgc2VhcmNoXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW10+fSBBIHByb21pc2Ugb2YgYW4gYXJyYXkgb2YgY29udGVudCB0eXBlc1xuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5KSB7XG4gICAgLy8gQWRkIGNvbnRlbnQgdHlwZXMgdG8gdGhlIHNlYXJjaCBpbmRleFxuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlcygpLnRoZW4oZmlsdGVyQnlRdWVyeShxdWVyeSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlciBhbGwgY29udGVudCB0eXBlcyBieSBnaXZlbiBwcm9wZXJ0eVxuICAgKlxuICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT58Kn1cbiAgICovXG4gIGZpbHRlcihwcm9wZXJ0eSkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlcygpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gY29udGVudFR5cGVzLnNvcnQoKGN0MSwgY3QyKSA9PiB7XG5cbiAgICAgICAgLy8gUHJvcGVydHkgZG9lcyBub3QgZXhpc3QsIG1vdmUgdG8gYm90dG9tXG4gICAgICAgIGlmICghY3QxLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjdDIuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU29ydCBvbiBwcm9wZXJ0eVxuICAgICAgICBpZiAoY3QxW3Byb3BlcnR5XSA+IGN0Mltwcm9wZXJ0eV0pIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjdDFbcHJvcGVydHldIDwgY3QyW3Byb3BlcnR5XSkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICB9XG59XG5cbi8qKlxuICogRmlsdGVycyBhIGxpc3Qgb2YgY29udGVudCB0eXBlcyBiYXNlZCBvbiBhIHF1ZXJ5XG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICovXG5jb25zdCBmaWx0ZXJCeVF1ZXJ5ID0gY3VycnkoZnVuY3Rpb24ocXVlcnksIGNvbnRlbnRUeXBlcykge1xuICBpZiAocXVlcnkgPT0gJycpIHtcbiAgICByZXR1cm4gY29udGVudFR5cGVzO1xuICB9XG5cbiAgLy8gQXBwZW5kIGEgc2VhcmNoIHNjb3JlIHRvIGVhY2ggY29udGVudCB0eXBlXG4gIHJldHVybiBjb250ZW50VHlwZXMubWFwKGNvbnRlbnRUeXBlID0+XG4gICAgKHtcbiAgICAgIGNvbnRlbnRUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIHNjb3JlOiBnZXRTZWFyY2hTY29yZShxdWVyeSwgY29udGVudFR5cGUpXG4gICAgfSkpXG4gICAgLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0LnNjb3JlID4gMClcbiAgICAuc29ydChzb3J0U2VhcmNoUmVzdWx0cykgLy8gU29ydCBieSBpbnN0YWxsZWQsIHJlbGV2YW5jZSBhbmQgcG9wdWxhcml0eVxuICAgIC5tYXAocmVzdWx0ID0+IHJlc3VsdC5jb250ZW50VHlwZSk7IC8vIFVud3JhcCByZXN1bHQgb2JqZWN0O1xufSk7XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIEFycmF5LnNvcnQoKVxuICogQ29tcGFyZXMgdHdvIGNvbnRlbnQgdHlwZXMgb24gZGlmZmVyZW50IGNyaXRlcmlhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgRmlyc3QgY29udGVudCB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gYiBTZWNvbmQgY29udGVudCB0eXBlXG4gKiBAcmV0dXJuIHtpbnR9XG4gKi9cbmNvbnN0IHNvcnRTZWFyY2hSZXN1bHRzID0gKGEsYikgPT4ge1xuICBpZiAoIWEuY29udGVudFR5cGUuaW5zdGFsbGVkICYmIGIuY29udGVudFR5cGUuaW5zdGFsbGVkKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAoYS5jb250ZW50VHlwZS5pbnN0YWxsZWQgJiYgIWIuY29udGVudFR5cGUuaW5zdGFsbGVkKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgZWxzZSBpZiAoYi5zY29yZSAhPT0gYS5zY29yZSkge1xuICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZTtcbiAgfVxuXG4gIGVsc2Uge1xuICAgIHJldHVybiBiLmNvbnRlbnRUeXBlLnBvcHVsYXJpdHkgLSBhLmNvbnRlbnRUeXBlLnBvcHVsYXJpdHk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB3ZWlnaHRpbmcgZm9yIGRpZmZlcmVudCBzZWFyY2ggdGVybXMgYmFzZWRcbiAqIG9uIGV4aXN0ZW5jZSBvZiBzdWJzdHJpbmdzXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBxdWVyeVxuICogQHBhcmFtICB7T2JqZWN0fSBjb250ZW50VHlwZVxuICogQHJldHVybiB7aW50fVxuICovXG4gY29uc3QgZ2V0U2VhcmNoU2NvcmUgPSBmdW5jdGlvbihxdWVyeSwgY29udGVudFR5cGUpIHtcbiAgIGxldCBxdWVyaWVzID0gcXVlcnkuc3BsaXQoJyAnKS5maWx0ZXIocXVlcnkgPT4gcXVlcnkgIT09ICcnKTtcbiAgIGxldCBxdWVyeVNjb3JlcyA9IHF1ZXJpZXMubWFwKHF1ZXJ5ID0+IGdldFNjb3JlRm9yRWFjaFF1ZXJ5KHF1ZXJ5LCBjb250ZW50VHlwZSkpO1xuICAgaWYgKHF1ZXJ5U2NvcmVzLmluZGV4T2YoMCkgPiAtMSkge1xuICAgICByZXR1cm4gMDtcbiAgIH1cbiAgIHJldHVybiBxdWVyeVNjb3Jlcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbiB9O1xuXG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmVsZXZhbmNlIHNjb3JlIGZvciBhIHNpbmdsZSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0gIHt0eXBlfSBxdWVyeSAgICAgICBkZXNjcmlwdGlvblxuICogQHBhcmFtICB7dHlwZX0gY29udGVudFR5cGUgZGVzY3JpcHRpb25cbiAqIEByZXR1cm4ge3R5cGV9ICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gKi9cbmNvbnN0IGdldFNjb3JlRm9yRWFjaFF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5LCBjb250ZW50VHlwZSkge1xuICAgcXVlcnkgPSBxdWVyeS50cmltKCk7XG4gICBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS50aXRsZSkpIHtcbiAgICAgcmV0dXJuIDEwMDtcbiAgIH1cbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuc3VtbWFyeSkpIHtcbiAgICAgcmV0dXJuIDU7XG4gICB9XG4gICBlbHNlIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uKSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2UgaWYgKGFycmF5SGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5rZXl3b3JkcykpIHtcbiAgICAgcmV0dXJuIDU7XG4gICB9XG4gICBlbHNlIHtcbiAgICAgcmV0dXJuIDA7XG4gICB9XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG5lZWRsZSBpcyBmb3VuZCBpbiB0aGUgaGF5c3RhY2suXG4gKiBOb3QgY2FzZSBzZW5zaXRpdmVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmVlZGxlXG4gKiBAcGFyYW0ge3N0cmluZ30gaGF5c3RhY2tcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGhhc1N1YlN0cmluZyA9IGZ1bmN0aW9uKG5lZWRsZSwgaGF5c3RhY2spIHtcbiAgaWYgKGhheXN0YWNrID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaGF5c3RhY2sudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5lZWRsZS50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiwgY2hlY2tzIGlmIGFycmF5IGhhcyBjb250YWlucyBhIHN1YnN0cmluZ1xuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gc3ViU3RyaW5nXG4gKiBAcGFyYW0gIHtBcnJheX0gYXJyXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBhcnJheUhhc1N1YlN0cmluZyA9IGZ1bmN0aW9uKHN1YlN0cmluZywgYXJyKSB7XG4gIGlmIChhcnIgPT09IHVuZGVmaW5lZCB8fCBzdWJTdHJpbmcgPT09ICcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGFyci5zb21lKHN0cmluZyA9PiBoYXNTdWJTdHJpbmcoc3ViU3RyaW5nLCBzdHJpbmcpKTtcbn07XG5cbmNvbnN0IEFkZE51bWJlcj1mdW5jdGlvbihhLGIpXG57XG4gIHJldHVybiBhK2I7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsImltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICpcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xuXG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBzZXJ2aWNlcykge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcblxuICAgIC8vIElucHV0IGVsZW1lbnQgZm9yIHRoZSBINVAgZmlsZVxuICAgIGNvbnN0IGg1cFVwbG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaDVwVXBsb2FkLnNldEF0dHJpYnV0ZSgndHlwZScsICdmaWxlJyk7XG5cbiAgICAvLyBTZW5kcyB0aGUgSDVQIGZpbGUgdG8gdGhlIHBsdWdpblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHVzZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdVc2UnO1xuICAgIHVzZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgLy8gQWRkIHRoZSBINVAgZmlsZSB0byBhIGZvcm0sIHJlYWR5IGZvciB0cmFuc3BvcnRhdGlvblxuICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZGF0YS5hcHBlbmQoJ2g1cCcsIGg1cFVwbG9hZC5maWxlc1swXSk7XG5cbiAgICAgIC8vIFVwbG9hZCBjb250ZW50IHRvIHRoZSBwbHVnaW5cbiAgICAgIHRoaXMuc2VydmljZXMudXBsb2FkQ29udGVudChkYXRhKVxuICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAvLyBGaXJlIHRoZSByZWNlaXZlZCBkYXRhIHRvIGFueSBsaXN0ZW5lcnNcbiAgICAgICAgICBzZWxmLmZpcmUoJ3VwbG9hZCcsIGpzb24pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGg1cFVwbG9hZCk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh1c2VCdXR0b24pO1xuXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpXG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCdcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHsgYm9keTogdGhpcy5fYm9keUluaXQgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gICAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcbiAgICB2YXIgcHJlUHJvY2Vzc2VkSGVhZGVycyA9IHJhd0hlYWRlcnMucmVwbGFjZSgvXFxyP1xcbltcXHQgXSsvLCAnICcpXG4gICAgcHJlUHJvY2Vzc2VkSGVhZGVycy5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZmV0Y2guanMiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlLCBjbGFzc0xpc3RDb250YWlucywgcXVlcnlTZWxlY3Rvciwgbm9kZUxpc3RUb0FycmF5IH0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtjdXJyeSwgZm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9TSVpFID0gJ2RhdGEtc2l6ZSc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBkaXNhYmxlID0gc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGVuYWJsZSA9IHJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWRcbiAqL1xuY29uc3QgdG9nZ2xlRW5hYmxlZCA9IChlbGVtZW50LCBlbmFibGVkKSA9PiAoZW5hYmxlZCA/IGVuYWJsZSA6IGRpc2FibGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlkZGVuXG4gKi9cbmNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSBjdXJyeSgoaGlkZGVuLCBlbGVtZW50KSA9PiBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgaGlkZGVuLnRvU3RyaW5nKCksIGVsZW1lbnQpKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGlzRGlzYWJsZWQgPSBoYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbi8qKlxuICogVXBkYXRlIHRoZSB2aWV3XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKi9cbmNvbnN0IHVwZGF0ZVZpZXcgPSAoZWxlbWVudCwgc3RhdGUpID0+IHtcbiAgY29uc3QgcHJldkJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXZpb3VzJyk7XG4gIGNvbnN0IG5leHRCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0Jyk7XG4gIGNvbnN0IGxpc3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gIGNvbnN0IHRvdGFsQ291bnQgPSBsaXN0LmNoaWxkRWxlbWVudENvdW50O1xuXG4gIC8vIHVwZGF0ZSBsaXN0IHNpemVzXG4gIGxpc3Quc3R5bGUud2lkdGggPSBgJHsxMDAgLyBzdGF0ZS5kaXNwbGF5Q291bnQgKiB0b3RhbENvdW50fSVgO1xuICBsaXN0LnN0eWxlLm1hcmdpbkxlZnQgPSBgJHtzdGF0ZS5wb3NpdGlvbiAqICgxMDAgLyBzdGF0ZS5kaXNwbGF5Q291bnQpfSVgO1xuXG4gIC8vIHVwZGF0ZSBpbWFnZSBzaXplc1xuICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHsxMDAgLyB0b3RhbENvdW50fSVgKTtcblxuICAvLyB0b2dnbGUgYnV0dG9uIHZpc2liaWxpdHlcbiAgW3ByZXZCdXR0b24sIG5leHRCdXR0b25dXG4gICAgLmZvckVhY2godG9nZ2xlVmlzaWJpbGl0eShzdGF0ZS5kaXNwbGF5Q291bnQgPj0gdG90YWxDb3VudCkpO1xuXG4gIC8vIHRvZ2dsZSBidXR0b24gZW5hYmxlLCBkaXNhYmxlZFxuICB0b2dnbGVFbmFibGVkKG5leHRCdXR0b24sIHN0YXRlLnBvc2l0aW9uID4gKHN0YXRlLmRpc3BsYXlDb3VudCAtIHRvdGFsQ291bnQpKTtcbiAgdG9nZ2xlRW5hYmxlZChwcmV2QnV0dG9uLCBzdGF0ZS5wb3NpdGlvbiA8IDApO1xufTtcblxuLyoqXG4gKiBIYW5kbGVzIGJ1dHRvbiBjbGlja2VkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBidXR0b25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHVwZGF0ZVN0YXRlXG4gKiBAcGFyYW0ge0V2ZW50fVxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrID0gY3VycnkoKGVsZW1lbnQsIHN0YXRlLCBidXR0b24sIHVwZGF0ZVN0YXRlLCBldmVudCkgPT4ge1xuICBpZighaXNEaXNhYmxlZChidXR0b24pKXtcbiAgICB1cGRhdGVTdGF0ZShzdGF0ZSk7XG4gICAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIGltYWdlXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaW1hZ2VcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpbml0SW1hZ2UgPSBjdXJyeSgoZWxlbWVudCwgaW1hZ2UpID0+IHtcbiAgbGV0IHRhcmdldElkID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gIGxldCB0YXJnZXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhcmdldElkfWApO1xuXG4gIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XG4gIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKSlcbn0pO1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciB3aGVuIHRoZSBkb20gaXMgdXBkYXRlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gcmVjb3JkXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGFuZGxlRG9tVXBkYXRlID0gY3VycnkoKGVsZW1lbnQsIHN0YXRlLCByZWNvcmQpID0+IHtcbiAgLy8gb24gYWRkIGltYWdlIHJ1biBpbml0aWFsaXphdGlvblxuICBpZihyZWNvcmQudHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICBub2RlTGlzdFRvQXJyYXkocmVjb3JkLmFkZGVkTm9kZXMpXG4gICAgICAuZmlsdGVyKGNsYXNzTGlzdENvbnRhaW5zKCdzbGlkZScpKVxuICAgICAgLm1hcChxdWVyeVNlbGVjdG9yKCdpbWcnKSlcbiAgICAgIC5mb3JFYWNoKGluaXRJbWFnZShlbGVtZW50KSk7XG4gIH1cblxuICAvLyB1cGRhdGUgdGhlIHZpZXdcbiAgdXBkYXRlVmlldyhlbGVtZW50LCBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgZGlzcGxheUNvdW50OiBlbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfU0laRSkgfHwgNSxcbiAgICBwb3NpdGlvbjogMFxuICB9KSk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICAvLyBnZXQgYnV0dG9uIGh0bWwgZWxlbWVudHNcbiAgY29uc3QgbmV4dEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQnKTtcbiAgY29uc3QgcHJldkJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXZpb3VzJyk7XG5cbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtvYmplY3R9IEltYWdlU2Nyb2xsZXJTdGF0ZVxuICAgKiBAcHJvcGVydHkge251bWJlcn0gZGlzcGxheUNvdW50XG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwb3NpdGlvblxuICAgKi9cbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgZGlzcGxheUNvdW50OiBlbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfU0laRSkgfHwgNSxcbiAgICBwb3NpdGlvbjogMFxuICB9O1xuXG4gIC8vIGluaXRpYWxpemUgYnV0dG9uc1xuICBuZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2soZWxlbWVudCwgc3RhdGUsIG5leHRCdXR0b24sIHN0YXRlID0+IHN0YXRlLnBvc2l0aW9uLS0pKTtcbiAgcHJldkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrKGVsZW1lbnQsIHN0YXRlLCBwcmV2QnV0dG9uLCBzdGF0ZSA9PiBzdGF0ZS5wb3NpdGlvbisrKSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBpbWFnZXNcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbYXJpYS1jb250cm9sc10nKS5mb3JFYWNoKGluaXRJbWFnZShlbGVtZW50KSk7XG5cbiAgLy8gbGlzdGVuIGZvciB1cGRhdGVzIHRvIGRhdGEtc2l6ZVxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmb3JFYWNoKGhhbmRsZURvbVVwZGF0ZShlbGVtZW50LCBzdGF0ZSkpKTtcblxuICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIHtcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW0FUVFJJQlVURV9TSVpFXVxuICB9KTtcblxuICAvLyBpbml0aWFsaXplIHBvc2l0aW9uXG4gIHVwZGF0ZVZpZXcoZWxlbWVudCwgc3RhdGUpO1xuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZSwgdG9nZ2xlQXR0cmlidXRlLCBoaWRlLCBzaG93LCB0b2dnbGVWaXNpYmlsaXR5fSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcbmltcG9ydCB7IGluaXRDb2xsYXBzaWJsZSB9IGZyb20gJy4uL3V0aWxzL2FyaWEnO1xuXG4vKipcbiAqIFVuc2VsZWN0cyBhbGwgZWxlbWVudHMgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBhcmlhLWV4cGFuZGVkIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50IHRvIGZhbHNlXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5jb25zdCB1bkV4cGFuZCA9IHNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG4vKipcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIC8vIGVsZW1lbnRzXG4gIGNvbnN0IG1lbnVJdGVtcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJtZW51aXRlbVwiXScpO1xuICBjb25zdCB0b2dnbGVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1jb250cm9sc11bYXJpYS1leHBhbmRlZF0nKTtcblxuICAvLyBtb3ZlIHNlbGVjdFxuICBtZW51SXRlbXMuZm9yRWFjaChtZW51SXRlbSA9PiB7XG4gICAgbWVudUl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICB1blNlbGVjdEFsbChtZW51SXRlbXMpO1xuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICB1bkV4cGFuZCh0b2dnbGVyKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gaW5pdCBjb2xsYXBzZSBhbmQgb3BlblxuICBpbml0Q29sbGFwc2libGUoZWxlbWVudCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL21lbnUuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCB1blNlbGVjdEFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJykpO1xuXG4vKipcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIGNvbnN0IHRhYnMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFiXCJdJyk7XG4gIGNvbnN0IHRhYlBhbmVscyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJwYW5lbFwiXScpO1xuXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICB1blNlbGVjdEFsbCh0YWJzKTtcbiAgICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXG4gICAgICBoaWRlQWxsKHRhYlBhbmVscyk7XG5cbiAgICAgIGxldCB0YWJQYW5lbElkID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICAgICAgc2hvdyhlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhYlBhbmVsSWR9YCkpO1xuICAgIH0pO1xuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJyZXF1aXJlKCcuLi8uLi9zcmMvc3R5bGVzL21haW4uc2NzcycpO1xuXG4vLyBMb2FkIGxpYnJhcnlcbkg1UCA9IEg1UCB8fCB7fTtcbkg1UC5IdWJDbGllbnQgPSByZXF1aXJlKCcuLi9zY3JpcHRzL2h1YicpLmRlZmF1bHQ7XG5INVAuSHViQ2xpZW50LnJlbmRlckVycm9yTWVzc2FnZSA9IHJlcXVpcmUoJy4uL3NjcmlwdHMvdXRpbHMvZXJyb3JzJykuZGVmYXVsdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwic291cmNlUm9vdCI6IiJ9