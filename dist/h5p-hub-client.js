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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjM4ZTVjZjEyYmQ4MGRmNTMzNDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwid2VicGFjazovLy8uLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvYXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvbWFpbi5zY3NzPzZhNzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWItc2VydmljZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9mZXRjaC5qcyIsIndlYnBhY2s6Ly8vLi8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL21lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3RhYi1wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sIm5hbWVzIjpbIkV2ZW50ZnVsIiwibGlzdGVuZXJzIiwib24iLCJ0eXBlIiwibGlzdGVuZXIiLCJzY29wZSIsInRyaWdnZXIiLCJwdXNoIiwiZmlyZSIsImV2ZW50IiwidHJpZ2dlcnMiLCJldmVyeSIsImNhbGwiLCJwcm9wYWdhdGUiLCJ0eXBlcyIsImV2ZW50ZnVsIiwibmV3VHlwZSIsInNlbGYiLCJmb3JFYWNoIiwiY3VycnkiLCJmbiIsImFyaXR5IiwibGVuZ3RoIiwiZjEiLCJhcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsImFwcGx5IiwiZjIiLCJhcmdzMiIsImNvbmNhdCIsImNvbXBvc2UiLCJmbnMiLCJyZWR1Y2UiLCJmIiwiZyIsImFyciIsIm1hcCIsImZpbHRlciIsInNvbWUiLCJjb250YWlucyIsInZhbHVlIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJ2YWx1ZXMiLCJpbnZlcnNlQm9vbGVhblN0cmluZyIsImJvb2wiLCJ0b1N0cmluZyIsImdldEF0dHJpYnV0ZSIsIm5hbWUiLCJlbCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsImF0dHJpYnV0ZUVxdWFscyIsInRvZ2dsZUF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicGFyZW50IiwiY2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlQ2hpbGQiLCJvbGRDaGlsZCIsImNsYXNzTGlzdENvbnRhaW5zIiwiY2xzIiwiY2xhc3NMaXN0Iiwibm9kZUxpc3RUb0FycmF5Iiwibm9kZUxpc3QiLCJoaWRlIiwic2hvdyIsInRvZ2dsZVZpc2liaWxpdHkiLCJ2aXNpYmxlIiwiZWxlbWVudCIsInJlbGF5Q2xpY2tFdmVudEFzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlkIiwic3RvcFByb3BhZ2F0aW9uIiwicmVuZGVyRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNsb3NlQnV0dG9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibWVzc2FnZUNvbnRlbnQiLCJ0aXRsZSIsImNvbnRlbnQiLCJtZXNzYWdlV3JhcHBlciIsImRpc21pc3NpYmxlIiwiYnV0dG9uIiwidW5kZWZpbmVkIiwibWVzc2FnZUJ1dHRvbiIsImluaXQiLCJpc0V4cGFuZGVkIiwiaW5pdENvbGxhcHNpYmxlIiwidG9nZ2xlciIsImNvbGxhcHNpYmxlSWQiLCJjb2xsYXBzaWJsZSIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJIdWIiLCJzdGF0ZSIsInNlcnZpY2VzIiwiYXBpUm9vdFVybCIsImNvbnRlbnRUeXBlU2VjdGlvbiIsInVwbG9hZFNlY3Rpb24iLCJ2aWV3Iiwic2V0UGFuZWxUaXRsZSIsImNsb3NlUGFuZWwiLCJzZXRTZWN0aW9uVHlwZSIsInRvZ2dsZVBhbmVsT3BlbiIsImJpbmQiLCJzZXR1cCIsImluaXRDb250ZW50VHlwZUxpc3QiLCJpbml0VGFiUGFuZWwiLCJtYWNoaW5lTmFtZSIsImNvbnRlbnRUeXBlIiwiZ2V0Q29udGVudFR5cGUiLCJ0aGVuIiwic2V0VGl0bGUiLCJzZWN0aW9uSWQiLCJ0YWJDb25maWdzIiwiZ2V0RWxlbWVudCIsImNvbmZpZyIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiYWRkQm90dG9tQm9yZGVyIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsIk1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04iLCJpc0VtcHR5IiwidGV4dCIsImhpZGVBbGwiLCJDb250ZW50VHlwZURldGFpbFZpZXciLCJyb290RWxlbWVudCIsImNyZWF0ZVZpZXciLCJidXR0b25CYXIiLCJ1c2VCdXR0b24iLCJpbnN0YWxsQnV0dG9uIiwiYnV0dG9ucyIsImltYWdlIiwib3duZXIiLCJkZXNjcmlwdGlvbiIsImRlbW9CdXR0b24iLCJjYXJvdXNlbCIsImNhcm91c2VsTGlzdCIsImxpY2VuY2VQYW5lbCIsImluc3RhbGxNZXNzYWdlIiwiaW5zdGFsbE1lc3NhZ2VDbG9zZSIsInN1Y2Nlc3MiLCJpbm5lclRleHQiLCJsaWdodGJveCIsImNoaWxkRWxlbWVudENvdW50IiwidXJsIiwiYWx0IiwidGh1bWJuYWlsIiwic3JjIiwiZWxsaXBzaXMiLCJ0b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkIiwiZGVzY3JpcHRpb25FeHBhbmRlZCIsInNpemUiLCJzdWJzdHIiLCJpbnN0YWxsZWQiLCJzaG93QnV0dG9uQnlTZWxlY3RvciIsIkNvbnRlbnRUeXBlRGV0YWlsIiwiaW5zdGFsbCIsInVwZGF0ZSIsImluc3RhbGxDb250ZW50VHlwZSIsInNldElzSW5zdGFsbGVkIiwic2V0SW5zdGFsbE1lc3NhZ2UiLCJjYXRjaCIsImVycm9yTWVzc2FnZSIsImVycm9yIiwiZXJyb3JDb2RlIiwiY29uc29sZSIsInJlc2V0Iiwic2V0SWQiLCJzZXREZXNjcmlwdGlvbiIsInNldEltYWdlIiwiaWNvbiIsInNldEV4YW1wbGUiLCJleGFtcGxlIiwic2V0T3duZXIiLCJzZXRMaWNlbmNlIiwibGljZW5zZSIsInJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwiLCJzY3JlZW5zaG90cyIsImFkZEltYWdlVG9DYXJvdXNlbCIsIkNvbnRlbnRUeXBlTGlzdFZpZXciLCJoYXNDaGlsZE5vZGVzIiwibGFzdENoaWxkIiwicm93IiwiY3JlYXRlQ29udGVudFR5cGVSb3ciLCJ1c2VCdXR0b25Db25maWciLCJpbnN0YWxsQnV0dG9uQ29uZmlnIiwic3VtbWFyeSIsIkNvbnRlbnRUeXBlTGlzdCIsImNvbnRlbnRUeXBlcyIsInJlbW92ZUFsbFJvd3MiLCJhZGRSb3ciLCJ1bnNlbGVjdEFsbCIsIkNvbnRlbnRCcm93c2VyVmlldyIsIm1lbnViYXIiLCJpbnB1dEZpZWxkIiwiZGlzcGxheVNlbGVjdGVkIiwiaW5wdXRCdXR0b24iLCJ0YXJnZXQiLCJxdWVyeSIsImtleUNvZGUiLCJ3aGljaCIsInNlYXJjaGJhciIsInBhcmVudEVsZW1lbnQiLCJmb2N1cyIsIm1lbnV0aXRsZSIsIm1lbnVJZCIsInNlYXJjaFRleHQiLCJhY3Rpb24iLCJtZXNzYWdlVmlldyIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJhZGQiLCJldmVudE5hbWUiLCJjaG9pY2UiLCJzZWxlY3RlZE5hbWUiLCJtZW51SXRlbXMiLCJzZWxlY3RlZE1lbnVJdGVtIiwidW5kZXJsaW5lIiwiQ29udGVudFR5cGVTZWN0aW9uVGFicyIsIkFMTCIsIk1ZX0NPTlRFTlRfVFlQRVMiLCJNT1NUX1BPUFVMQVIiLCJmaWx0ZXJQcm9wZXJ0eSIsIkNvbnRlbnRUeXBlU2VjdGlvbiIsInR5cGVBaGVhZEVuYWJsZWQiLCJzZWFyY2hTZXJ2aWNlIiwiY29udGVudFR5cGVMaXN0IiwiY29udGVudFR5cGVEZXRhaWwiLCJ0YWIiLCJoYXNPd25Qcm9wZXJ0eSIsImFkZE1lbnVJdGVtIiwiaW5pdE1lbnUiLCJzZWN0aW9uIiwic2VhcmNoIiwic2VsZWN0TWVudUl0ZW1CeUlkIiwicmVzZXRNZW51T25FbnRlciIsImFwcGx5U2VhcmNoRmlsdGVyIiwiY2xlYXJJbnB1dEZpZWxkIiwidXBkYXRlRGlzcGxheVNlbGVjdGVkIiwic2hvd0RldGFpbFZpZXciLCJjbG9zZURldGFpbFZpZXciLCJoYW5kbGVFcnJvciIsImRpc3BsYXlNZXNzYWdlIiwic2V0RGlzcGxheVNlbGVjdGVkIiwiZSIsImN0cyIsImxvYWRCeUlkIiwiSHViU2VydmljZXMiLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwicmVzdWx0IiwianNvbiIsImlzVmFsaWQiLCJsaWJyYXJpZXMiLCJyZXNwb25zZSIsIm1lc3NhZ2VDb2RlIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJucyIsImdldEFqYXhVcmwiLCJib2R5IiwiZm9ybURhdGEiLCJBVFRSSUJVVEVfREFUQV9JRCIsImlzT3BlbiIsIkh1YlZpZXciLCJyZW5kZXJUYWJQYW5lbCIsInJlbmRlclBhbmVsIiwiZXhwYW5kZWQiLCJ0YWJDb250YWluZXJFbGVtZW50IiwicGFuZWwiLCJzZXRUaW1lb3V0IiwidGFibGlzdCIsInRhYkxpc3RXcmFwcGVyIiwidGFiSWQiLCJ0YWJQYW5lbElkIiwidGFiUGFuZWwiLCJNZXNzYWdlVmlldyIsIlNlYXJjaFNlcnZpY2UiLCJmaWx0ZXJCeVF1ZXJ5IiwicHJvcGVydHkiLCJzb3J0IiwiY3QxIiwiY3QyIiwic2NvcmUiLCJnZXRTZWFyY2hTY29yZSIsInNvcnRTZWFyY2hSZXN1bHRzIiwiYSIsImIiLCJwb3B1bGFyaXR5IiwicXVlcmllcyIsInNwbGl0IiwicXVlcnlTY29yZXMiLCJnZXRTY29yZUZvckVhY2hRdWVyeSIsInRyaW0iLCJoYXNTdWJTdHJpbmciLCJhcnJheUhhc1N1YlN0cmluZyIsImtleXdvcmRzIiwibmVlZGxlIiwiaGF5c3RhY2siLCJ0b0xvd2VyQ2FzZSIsInN1YlN0cmluZyIsInN0cmluZyIsIkFkZE51bWJlciIsIlVwbG9hZFNlY3Rpb24iLCJoNXBVcGxvYWQiLCJ0ZXh0Q29udGVudCIsImRhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImZpbGVzIiwidXBsb2FkQ29udGVudCIsInN1cHBvcnQiLCJzZWFyY2hQYXJhbXMiLCJpdGVyYWJsZSIsIlN5bWJvbCIsImJsb2IiLCJCbG9iIiwiYXJyYXlCdWZmZXIiLCJ2aWV3Q2xhc3NlcyIsImlzRGF0YVZpZXciLCJvYmoiLCJEYXRhVmlldyIsImlzUHJvdG90eXBlT2YiLCJpc0FycmF5QnVmZmVyVmlldyIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwiT2JqZWN0Iiwibm9ybWFsaXplTmFtZSIsIlN0cmluZyIsInRlc3QiLCJUeXBlRXJyb3IiLCJub3JtYWxpemVWYWx1ZSIsIml0ZXJhdG9yRm9yIiwiaXRlbXMiLCJpdGVyYXRvciIsIm5leHQiLCJzaGlmdCIsImRvbmUiLCJIZWFkZXJzIiwiaGVhZGVycyIsImlzQXJyYXkiLCJoZWFkZXIiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwib2xkVmFsdWUiLCJnZXQiLCJoYXMiLCJzZXQiLCJjYWxsYmFjayIsInRoaXNBcmciLCJrZXlzIiwiZW50cmllcyIsImNvbnN1bWVkIiwiYm9keVVzZWQiLCJmaWxlUmVhZGVyUmVhZHkiLCJyZWFkZXIiLCJvbmxvYWQiLCJvbmVycm9yIiwicmVhZEJsb2JBc0FycmF5QnVmZmVyIiwiRmlsZVJlYWRlciIsInByb21pc2UiLCJyZWFkQXNBcnJheUJ1ZmZlciIsInJlYWRCbG9iQXNUZXh0IiwicmVhZEFzVGV4dCIsInJlYWRBcnJheUJ1ZmZlckFzVGV4dCIsImJ1ZiIsIlVpbnQ4QXJyYXkiLCJjaGFycyIsImkiLCJmcm9tQ2hhckNvZGUiLCJqb2luIiwiYnVmZmVyQ2xvbmUiLCJieXRlTGVuZ3RoIiwiYnVmZmVyIiwiQm9keSIsIl9pbml0Qm9keSIsIl9ib2R5SW5pdCIsIl9ib2R5VGV4dCIsIl9ib2R5QmxvYiIsIl9ib2R5Rm9ybURhdGEiLCJVUkxTZWFyY2hQYXJhbXMiLCJfYm9keUFycmF5QnVmZmVyIiwiRXJyb3IiLCJyZWplY3RlZCIsImRlY29kZSIsIkpTT04iLCJwYXJzZSIsIm1ldGhvZHMiLCJub3JtYWxpemVNZXRob2QiLCJ1cGNhc2VkIiwidG9VcHBlckNhc2UiLCJSZXF1ZXN0IiwiaW5wdXQiLCJvcHRpb25zIiwibW9kZSIsInJlZmVycmVyIiwiY2xvbmUiLCJmb3JtIiwiYnl0ZXMiLCJyZXBsYWNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFyc2VIZWFkZXJzIiwicmF3SGVhZGVycyIsInByZVByb2Nlc3NlZEhlYWRlcnMiLCJsaW5lIiwicGFydHMiLCJrZXkiLCJSZXNwb25zZSIsImJvZHlJbml0Iiwic3RhdHVzIiwib2siLCJzdGF0dXNUZXh0IiwicmVkaXJlY3RTdGF0dXNlcyIsInJlZGlyZWN0IiwiUmFuZ2VFcnJvciIsImxvY2F0aW9uIiwicmVxdWVzdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwicmVzcG9uc2VVUkwiLCJyZXNwb25zZVRleHQiLCJvbnRpbWVvdXQiLCJvcGVuIiwid2l0aENyZWRlbnRpYWxzIiwicmVzcG9uc2VUeXBlIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJwb2x5ZmlsbCIsIkFUVFJJQlVURV9TSVpFIiwiZGlzYWJsZSIsImVuYWJsZSIsInRvZ2dsZUVuYWJsZWQiLCJlbmFibGVkIiwiaGlkZGVuIiwiaXNEaXNhYmxlZCIsInVwZGF0ZVZpZXciLCJwcmV2QnV0dG9uIiwibmV4dEJ1dHRvbiIsImxpc3QiLCJ0b3RhbENvdW50Iiwic3R5bGUiLCJ3aWR0aCIsImRpc3BsYXlDb3VudCIsIm1hcmdpbkxlZnQiLCJwb3NpdGlvbiIsIm9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrIiwidXBkYXRlU3RhdGUiLCJpbml0SW1hZ2UiLCJ0YXJnZXRJZCIsImhhbmRsZURvbVVwZGF0ZSIsInJlY29yZCIsImFkZGVkTm9kZXMiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwidW5TZWxlY3RBbGwiLCJ1bkV4cGFuZCIsIm1lbnVJdGVtIiwidGFicyIsInRhYlBhbmVscyIsInJlcXVpcmUiLCJINVAiLCJIdWJDbGllbnQiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hFQTs7O0FBR08sSUFBTUEsOEJBQVcsU0FBWEEsUUFBVztBQUFBLFNBQU87QUFDN0JDLGVBQVcsRUFEa0I7O0FBRzdCOzs7Ozs7Ozs7O0FBVUFDLFFBQUksWUFBU0MsSUFBVCxFQUFlQyxRQUFmLEVBQXlCQyxLQUF6QixFQUFnQztBQUNsQzs7Ozs7QUFLQSxVQUFNQyxVQUFVO0FBQ2Qsb0JBQVlGLFFBREU7QUFFZCxpQkFBU0M7QUFGSyxPQUFoQjs7QUFLQSxXQUFLSixTQUFMLENBQWVFLElBQWYsSUFBdUIsS0FBS0YsU0FBTCxDQUFlRSxJQUFmLEtBQXdCLEVBQS9DO0FBQ0EsV0FBS0YsU0FBTCxDQUFlRSxJQUFmLEVBQXFCSSxJQUFyQixDQUEwQkQsT0FB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QW5kLFlBQU00TSxNQUFOLENBQWFoSyxZQUFiLENBQTBCLGVBQTFCLEVBQTJDLE1BQTNDOztBQUVBc0YsY0FBUWtWLFNBQVI7O0FBRUEsVUFBSXhMLGFBQWE1UixNQUFNNE0sTUFBTixDQUFhbkssWUFBYixDQUEwQixlQUExQixDQUFqQjtBQUNBc0IsV0FBS0csUUFBUWQsYUFBUixPQUEwQndPLFVBQTFCLENBQUw7QUFDRCxLQVREO0FBVUQsR0FYRDtBQVlELEM7Ozs7Ozs7OztBQ3ZDRCxtQkFBQXlMLENBQVEsQ0FBUjs7QUFFQTtBQUNBQyxNQUFNQSxPQUFPLEVBQWI7QUFDQUEsSUFBSUMsU0FBSixHQUFnQixtQkFBQUYsQ0FBUSxDQUFSLEVBQTBCRyxPQUExQztBQUNBRixJQUFJQyxTQUFKLENBQWNoWixrQkFBZCxHQUFtQyxtQkFBQThZLENBQVEsQ0FBUixFQUFtQ0csT0FBdEUsQyIsImZpbGUiOiJoNXAtaHViLWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmMzhlNWNmMTJiZDgwZGY1MzM0MSIsIi8qKlxyXG4gKiBAbWl4aW5cclxuICovXHJcbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XHJcbiAgbGlzdGVuZXJzOiB7fSxcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuIHRvIGV2ZW50XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IFtzY29wZV1cclxuICAgKlxyXG4gICAqIEBmdW5jdGlvblxyXG4gICAqIEByZXR1cm4ge0V2ZW50ZnVsfVxyXG4gICAqL1xyXG4gIG9uOiBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgc2NvcGUpIHtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxyXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gbGlzdGVuZXJcclxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzY29wZVxyXG4gICAgICovXHJcbiAgICBjb25zdCB0cmlnZ2VyID0ge1xyXG4gICAgICAnbGlzdGVuZXInOiBsaXN0ZW5lcixcclxuICAgICAgJ3Njb3BlJzogc2NvcGVcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcclxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2godHJpZ2dlcik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogRmlyZSBldmVudC4gSWYgYW55IG9mIHRoZSBsaXN0ZW5lcnMgcmV0dXJucyBmYWxzZSwgcmV0dXJuIGZhbHNlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZXZlbnRdXHJcbiAgICpcclxuICAgKiBAZnVuY3Rpb25cclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XHJcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xyXG5cclxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XHJcbiAgICAgIHJldHVybiB0cmlnZ2VyLmxpc3RlbmVyLmNhbGwodHJpZ2dlci5zY29wZSB8fCB0aGlzLCBldmVudCkgIT09IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IHR5cGVzXHJcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2V2ZW50TmFtZV0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHdoZW4gcHJvcG9nYXRlZFxyXG4gICAqL1xyXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsLCBuZXdUeXBlKSB7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICB0eXBlcy5mb3JFYWNoKHR5cGUgPT4gZXZlbnRmdWwub24odHlwZSwgZXZlbnQgPT4gc2VsZi5maXJlKG5ld1R5cGUgfHwgdHlwZSwgZXZlbnQpKSk7XHJcbiAgfVxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwiLyoqXHJcbiAqIFJldHVybnMgYSBjdXJyaWVkIHZlcnNpb24gb2YgYSBmdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGN1cnJ5ID0gZnVuY3Rpb24oZm4pIHtcclxuICBjb25zdCBhcml0eSA9IGZuLmxlbmd0aDtcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKCkge1xyXG4gICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XHJcbiAgICBpZiAoYXJncy5sZW5ndGggPj0gYXJpdHkpIHtcclxuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiBmMigpIHtcclxuICAgICAgICBjb25zdCBhcmdzMiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XHJcbiAgICAgICAgcmV0dXJuIGYxLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KGFyZ3MyKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXBvc2UgZnVuY3Rpb25zIHRvZ2V0aGVyLCBleGVjdXRpbmcgZnJvbSByaWdodCB0byBsZWZ0XHJcbiAqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24uLi59IGZuc1xyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKC4uLmZucykgPT4gZm5zLnJlZHVjZSgoZiwgZykgPT4gKC4uLmFyZ3MpID0+IGYoZyguLi5hcmdzKSkpO1xyXG5cclxuLyoqXHJcbiAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXlcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGZvckVhY2ggPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xyXG4gIGFyci5mb3JFYWNoKGZuKTtcclxufSk7XHJcblxyXG4vKipcclxuICogTWFwcyBhIGZ1bmN0aW9uIHRvIGFuIGFycmF5XHJcbiAqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBtYXAgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xyXG4gIHJldHVybiBhcnIubWFwKGZuKTtcclxufSk7XHJcblxyXG4vKipcclxuICogQXBwbGllcyBhIGZpbHRlciB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZmlsdGVyID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcclxuICByZXR1cm4gYXJyLmZpbHRlcihmbik7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEFwcGxpZXMgYSBzb21lIHRvIGFuIGFycmF5XHJcbiAqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBzb21lID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcclxuICByZXR1cm4gYXJyLnNvbWUoZm4pO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgYSB2YWx1ZVxyXG4gKlxyXG4gKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjb250YWlucyA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZSwgYXJyKSB7XHJcbiAgcmV0dXJuIGFyci5pbmRleE9mKHZhbHVlKSAhPSAtMTtcclxufSk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSBzdXBwbGllZCB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCB3aXRob3V0ID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlcywgYXJyKSB7XHJcbiAgcmV0dXJuIGZpbHRlcih2YWx1ZSA9PiAhY29udGFpbnModmFsdWUsIHZhbHVlcyksIGFycilcclxufSk7XHJcblxyXG4vKipcclxuICogVGFrZXMgYSBzdHJpbmcgdGhhdCBpcyBlaXRoZXIgJ3RydWUnIG9yICdmYWxzZScgYW5kIHJldHVybnMgdGhlIG9wcG9zaXRlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBib29sXHJcbiAqXHJcbiAqIEBwdWJsaWNcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGludmVyc2VCb29sZWFuU3RyaW5nID0gZnVuY3Rpb24gKGJvb2wpIHtcclxuICByZXR1cm4gKGJvb2wgIT09ICd0cnVlJykudG9TdHJpbmcoKTtcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJpbXBvcnQge2N1cnJ5LCBpbnZlcnNlQm9vbGVhblN0cmluZ30gZnJvbSAnLi9mdW5jdGlvbmFsJ1xyXG5cclxuLyoqXHJcbiAqIEdldCBhbiBhdHRyaWJ1dGUgdmFsdWUgZnJvbSBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0QXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkpO1xyXG5cclxuLyoqXHJcbiAqIFNldCBhbiBhdHRyaWJ1dGUgb24gYSBodG1sIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNldEF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCB2YWx1ZSwgZWwpID0+IGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkpO1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhdHRyaWJ1dGUgZnJvbSBodG1sIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkpO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBoYXNBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IGVsLmhhc0F0dHJpYnV0ZShuYW1lKSk7XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlIHRoYXQgZXF1YWxzXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVFcXVhbHMgPSBjdXJyeSgobmFtZSwgdmFsdWUsIGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IHZhbHVlKTtcclxuXHJcbi8qKlxyXG4gKiBUb2dnbGVzIGFuIGF0dHJpYnV0ZSBiZXR3ZWVuICd0cnVlJyBhbmQgJ2ZhbHNlJztcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdG9nZ2xlQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBnZXRBdHRyaWJ1dGUobmFtZSwgZWwpO1xyXG4gIHNldEF0dHJpYnV0ZShuYW1lLCBpbnZlcnNlQm9vbGVhblN0cmluZyh2YWx1ZSksIGVsKTtcclxufSk7XHJcblxyXG4vKipcclxuICogVGhlIGFwcGVuZENoaWxkKCkgbWV0aG9kIGFkZHMgYSBub2RlIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3Qgb2YgY2hpbGRyZW4gb2YgYSBzcGVjaWZpZWQgcGFyZW50IG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjaGlsZFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYXBwZW5kQ2hpbGQgPSBjdXJyeSgocGFyZW50LCBjaGlsZCkgPT4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKSk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIGEgZGVzY2VuZGFudCBvZiB0aGUgZWxlbWVudCBvbiB3aGljaCBpdCBpcyBpbnZva2VkXHJcbiAqIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIHNlbGVjdG9ycy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yID0gY3VycnkoKHNlbGVjdG9yLCBlbCkgPT4gZWwucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBub24tbGl2ZSBOb2RlTGlzdCBvZiBhbGwgZWxlbWVudHMgZGVzY2VuZGVkIGZyb20gdGhlIGVsZW1lbnQgb24gd2hpY2ggaXRcclxuICogaXMgaW52b2tlZCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBDU1Mgc2VsZWN0b3JzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm4ge05vZGVMaXN0fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3JBbGwgPSBjdXJyeSgoc2VsZWN0b3IsIGVsKSA9PiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XHJcblxyXG4vKipcclxuICogVGhlIHJlbW92ZUNoaWxkKCkgbWV0aG9kIHJlbW92ZXMgYSBjaGlsZCBub2RlIGZyb20gdGhlIERPTS4gUmV0dXJucyByZW1vdmVkIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gcGFyZW50XHJcbiAqIEBwYXJhbSB7Tm9kZX0gb2xkQ2hpbGRcclxuICpcclxuICogQHJldHVybiB7Tm9kZX1cclxuICovXHJcbmV4cG9ydCBjb25zdCByZW1vdmVDaGlsZCA9IGN1cnJ5KChwYXJlbnQsIG9sZENoaWxkKSA9PiBwYXJlbnQucmVtb3ZlQ2hpbGQob2xkQ2hpbGQpKTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBub2RlIGhhcyBhIGNsYXNzXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbHNcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2xhc3NMaXN0Q29udGFpbnMgPSBjdXJyeSgoY2xzLCBlbCkgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNscykpO1xyXG5cclxuLyoqXHJcbiAqIFRyYW5zZm9ybXMgYSBOb2RlTGlzdCB0byBhbiBBcnJheVxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGVMaXN0fSBub2RlTGlzdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtOb2RlW119XHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgbm9kZUxpc3RUb0FycmF5ID0gbm9kZUxpc3QgPT4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZUxpc3QpO1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYXJpYS1oaWRkZW49dHJ1ZSB0byBhbiBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYXJpYS1oaWRkZW49ZmFsc2UgdG8gYW4gZWxlbWVudFxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZXMgYXJpYS1oaWRkZW4gb24gYW4gZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSBjdXJyeSgodmlzaWJsZSwgZWxlbWVudCkgPT4gKHZpc2libGUgPyBzaG93IDogaGlkZSkoZWxlbWVudCkpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XHJcblxyXG4vKipcclxuICogIFRyYW5zZm9ybXMgYSBET00gY2xpY2sgZXZlbnQgaW50byBhbiBFdmVudGZ1bCdzIGV2ZW50XHJcbiAqICBAc2VlIEV2ZW50ZnVsXHJcbiAqXHJcbiAqIEBwYXJhbSAge3N0cmluZyB8IE9iamVjdH0gdHlwZVxyXG4gKiBAcGFyYW0gIHtFdmVudGZ1bH0gZXZlbnRmdWxcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVsYXlDbGlja0V2ZW50QXMgPSBjdXJyeShmdW5jdGlvbih0eXBlLCBldmVudGZ1bCwgZWxlbWVudCkge1xyXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICBldmVudGZ1bC5maXJlKHR5cGUsIHtcclxuICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgaWQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJylcclxuICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICAvLyBkb24ndCBidWJibGVcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZWxlbWVudDtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsIi8qKlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLnR5cGUgICAgICAgICB0eXBlIG9mIHRoZSBtZXNzYWdlOiBpbmZvLCBzdWNjZXNzLCBlcnJvclxyXG4gKiBAcGFyYW0gIHtib29sZWFufSAgY29uZmlnLmRpc21pc3NpYmxlICB3aGV0aGVyIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNtaXNzZWRcclxuICogQHBhcmFtICB7c3RyaW5nfSAgIGNvbmZpZy5jb250ZW50ICAgICAgbWVzc2FnZSBjb250ZW50IHVzdWFsbHkgYSAnaDMnIGFuZCBhICdwJ1xyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gZGl2IGNvbnRhaW5pbmcgdGhlIG1lc3NhZ2UgZWxlbWVudFxyXG4gKi9cclxuXHJcbi8vVE9ETyBoYW5kbGUgc3RyaW5ncywgaHRtbCwgYmFkbHkgZm9ybWVkIG9iamVjdFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJFcnJvck1lc3NhZ2UobWVzc2FnZSkge1xyXG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2Nsb3NlJztcclxuICBjbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJiN4MjcxNSc7XHJcblxyXG4gIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbWVzc2FnZUNvbnRlbnQuY2xhc3NOYW1lID0gJ21lc3NhZ2UtY29udGVudCc7XHJcbiAgbWVzc2FnZUNvbnRlbnQuaW5uZXJIVE1MID0gJzxoMT4nICsgbWVzc2FnZS50aXRsZSArICc8L2gxPicgKyAnPHA+JyArIG1lc3NhZ2UuY29udGVudCArICc8L3A+JztcclxuXHJcbiAgY29uc3QgbWVzc2FnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBtZXNzYWdlV3JhcHBlci5jbGFzc05hbWUgPSAnbWVzc2FnZScgKyAnICcgKyBgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XHJcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xyXG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VDb250ZW50KTtcclxuXHJcbiAgaWYgKG1lc3NhZ2UuYnV0dG9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIG1lc3NhZ2VCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbic7XHJcbiAgICBtZXNzYWdlQnV0dG9uLmlubmVySFRNTCA9IG1lc3NhZ2UuYnV0dG9uO1xyXG4gICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUJ1dHRvbik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWVzc2FnZVdyYXBwZXI7XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsImltcG9ydCB7aW5pdENvbGxhcHNpYmxlfSBmcm9tICcuLi91dGlscy9hcmlhJztcclxuXHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XHJcbiAgaW5pdENvbGxhcHNpYmxlKGVsZW1lbnQpO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwiaW1wb3J0IHthdHRyaWJ1dGVFcXVhbHMsIHRvZ2dsZUF0dHJpYnV0ZSwgdG9nZ2xlVmlzaWJpbGl0eX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBhcmlhLWV4cGFuZGVkPXRydWUgb24gZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuY29uc3QgaXNFeHBhbmRlZCA9IGF0dHJpYnV0ZUVxdWFscyhcImFyaWEtZXhwYW5kZWRcIiwgJ3RydWUnKTtcclxuXHJcbi8qKlxyXG4gKiBUb2dnbGVzIGFyaWEtaGlkZGVuIG9uICdjb2xsYXBzaWJsZScgd2hlbiBhcmlhLWV4cGFuZGVkIGNoYW5nZXMgb24gJ3RvZ2dsZXInLFxyXG4gKiBhbmQgdG9nZ2xlcyBhcmlhLWV4cGFuZGVkIG9uICd0b2dnbGVyJyBvbiBjbGlja1xyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaW5pdENvbGxhcHNpYmxlID0gKGVsZW1lbnQpID0+IHtcclxuICAvLyBlbGVtZW50c1xyXG4gIGNvbnN0IHRvZ2dsZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScpO1xyXG4gIGNvbnN0IGNvbGxhcHNpYmxlSWQgPSB0b2dnbGVyLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xyXG4gIGNvbnN0IGNvbGxhcHNpYmxlID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtjb2xsYXBzaWJsZUlkfWApO1xyXG5cclxuICAvLyBzZXQgb2JzZXJ2ZXIgb24gdGl0bGUgZm9yIGFyaWEtZXhwYW5kZWRcclxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB0b2dnbGVWaXNpYmlsaXR5KGlzRXhwYW5kZWQodG9nZ2xlciksIGNvbGxhcHNpYmxlKSk7XHJcblxyXG4gIG9ic2VydmVyLm9ic2VydmUodG9nZ2xlciwge1xyXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxyXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbXCJhcmlhLWV4cGFuZGVkXCJdXHJcbiAgfSk7XHJcblxyXG4gIC8vIFNldCBjbGljayBsaXN0ZW5lciB0aGF0IHRvZ2dsZXMgYXJpYS1leHBhbmRlZFxyXG4gIHRvZ2dsZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIHRvZ2dsZXIpKTtcclxuXHJcbiAgLy8gaW5pdGlhbGl6ZVxyXG4gIHRvZ2dsZVZpc2liaWxpdHkoaXNFeHBhbmRlZCh0b2dnbGVyKSwgY29sbGFwc2libGUpO1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvYXJpYS5qcyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSFpwWlhkQ2IzZzlJakFnTUNBME1EQWdNakkxSWo0TkNpQWdQR1JsWm5NK0RRb2dJQ0FnUEhOMGVXeGxQZzBLSUNBZ0lDQWdMbU5zY3kweElIc05DaUFnSUNBZ0lHWnBiR3c2SUc1dmJtVTdEUW9nSUNBZ0lDQjlEUW9OQ2lBZ0lDQWdJQzVqYkhNdE1pQjdEUW9nSUNBZ0lDQm1hV3hzT2lBall6WmpObU0zT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1zSUM1amJITXROQ0I3RFFvZ0lDQWdJQ0JtYVd4c09pQWpabVptT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1nZXcwS0lDQWdJQ0FnYjNCaFkybDBlVG9nTUM0M093MEtJQ0FnSUNBZ2ZRMEtJQ0FnSUR3dmMzUjViR1UrRFFvZ0lEd3ZaR1ZtY3o0TkNpQWdQSFJwZEd4bFBtTnZiblJsYm5RZ2RIbHdaU0J3YkdGalpXaHZiR1JsY2w4eVBDOTBhWFJzWlQ0TkNpQWdQR2NnYVdROUlreGhlV1Z5WHpJaUlHUmhkR0V0Ym1GdFpUMGlUR0Y1WlhJZ01pSStEUW9nSUNBZ1BHY2dhV1E5SW1OdmJuUmxiblJmZEhsd1pWOXdiR0ZqWldodmJHUmxjaTB4WDJOdmNIa2lJR1JoZEdFdGJtRnRaVDBpWTI5dWRHVnVkQ0IwZVhCbElIQnNZV05sYUc5c1pHVnlMVEVnWTI5d2VTSStEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxURWlJSGRwWkhSb1BTSTBNREFpSUdobGFXZG9kRDBpTWpJMUlpOCtEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxUSWlJSGc5SWpFeE1pNDFNU0lnZVQwaU5ETXVOREVpSUhkcFpIUm9QU0l4TnpZdU9UWWlJR2hsYVdkb2REMGlNVE0xTGpRMUlpQnllRDBpTVRBaUlISjVQU0l4TUNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE16WXVOallpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5URXVORGtpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5qWXVNU0lnWTNrOUlqWXhMams0SWlCeVBTSTBMamd4SWk4K0RRb2dJQ0FnSUNBOFp5QnBaRDBpWDBkeWIzVndYeUlnWkdGMFlTMXVZVzFsUFNJbWJIUTdSM0p2ZFhBbVozUTdJajROQ2lBZ0lDQWdJQ0FnUEdjZ2FXUTlJbDlIY205MWNGOHlJaUJrWVhSaExXNWhiV1U5SWlac2REdEhjbTkxY0NabmREc2lQZzBLSUNBZ0lDQWdJQ0FnSUR4d1lYUm9JR2xrUFNKZlEyOXRjRzkxYm1SZlVHRjBhRjhpSUdSaGRHRXRibUZ0WlQwaUpteDBPME52YlhCdmRXNWtJRkJoZEdnbVozUTdJaUJqYkdGemN6MGlZMnh6TFRRaUlHUTlJazB5TmpNdU1qZ3NPVFV1TWpGRE1qWXdMRGt5TGpBM0xESTFOU3c1TVM0MUxESTBPQzQwTXl3NU1TNDFTREl5TjNZNFNERTVPUzQxYkMweUxqRTNMREV3TGpJMFlUSTFMamcwTERJMUxqZzBMREFzTUN3eExERXhMalE0TFRFdU5qTXNNVGt1T1RNc01Ua3VPVE1zTUN3d0xERXNNVFF1TXprc05TNDFOeXd4T0M0eU5pd3hPQzR5Tml3d0xEQXNNU3cxTGpVeUxERXpMallzTWpNdU1URXNNak11TVRFc01Dd3dMREV0TWk0NE5Dd3hNUzR3TlN3eE9DNDJOU3d4T0M0Mk5Td3dMREFzTVMwNExqQTJMRGN1Tnprc09TdzVMREFzTUN3eExUUXVNVElzTVM0ek4wZ3lNeloyTFRJeGFERXdMalF5WXpjdU16WXNNQ3d4TWk0NE15MHhMall4TERFMkxqUXlMVFZ6TlM0ek9DMDNMalE0TERVdU16Z3RNVE11TkRSRE1qWTRMakl5TERFd01pNHlPU3d5TmpZdU5UY3NPVGd1TXpVc01qWXpMakk0TERrMUxqSXhXbTB0TVRVc01UZGpMVEV1TkRJc01TNHlNaTB6TGprc01TNHlOUzAzTGpReExERXVNalZJTWpNMmRpMHhOR2cxTGpZeVlUa3VOVGNzT1M0MU55d3dMREFzTVN3M0xESXVPVE1zTnk0d05TdzNMakExTERBc01Dd3hMREV1T0RVc05DNDVNa0UyTGpNekxEWXVNek1zTUN3d0xERXNNalE0TGpNeExERXhNaTR5TlZvaUx6NE5DaUFnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpWDFCaGRHaGZJaUJrWVhSaExXNWhiV1U5SWlac2REdFFZWFJvSm1kME95SWdZMnhoYzNNOUltTnNjeTAwSWlCa1BTSk5NakF5TGprc01URTVMakV4WVRndU1USXNPQzR4TWl3d0xEQXNNQzAzTGpJNExEUXVOVEpzTFRFMkxURXVNaklzTnk0eU1pMHpNQzQ1TWtneE56UjJNakpJTVRVemRpMHlNa2d4TXpaMk5UWm9NVGQyTFRJeGFESXhkakl4YURJd0xqTXhZeTB5TGpjeUxEQXROUzB4TGpVekxUY3RNMkV4T1M0eE9Td3hPUzR4T1N3d0xEQXNNUzAwTGpjekxUUXVPRE1zTWpNdU5UZ3NNak11TlRnc01Dd3dMREV0TXkwMkxqWnNNVFl0TWk0eU5tRTRMakV4TERndU1URXNNQ3d4TERBc055NHlOaTB4TVM0M01sb2lMejROQ2lBZ0lDQWdJQ0FnUEM5blBnMEtJQ0FnSUNBZ1BDOW5QZzBLSUNBZ0lDQWdQSEpsWTNRZ1kyeGhjM005SW1Oc2N5MHpJaUI0UFNJeE56Y3VOallpSUhrOUlqVTNMalkySWlCM2FXUjBhRDBpT1RJdU1qZ2lJR2hsYVdkb2REMGlPUzR6T0NJZ2NuZzlJak11TlNJZ2NuazlJak11TlNJdlBnMEtJQ0FnSUR3dlp6NE5DaUFnUEM5blBnMEtQQzl6ZG1jK0RRbz1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBIdWJWaWV3IGZyb20gJy4vaHViLXZpZXcnO1xyXG5pbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uIGZyb20gJy4vY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24nO1xyXG5pbXBvcnQgVXBsb2FkU2VjdGlvbiBmcm9tICcuL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uJztcclxuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4vaHViLXNlcnZpY2VzJztcclxuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XHJcbmltcG9ydCB7cmVuZGVyRXJyb3JNZXNzYWdlfSBmcm9tICcuL3V0aWxzL2Vycm9ycyc7XHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBIdWJTdGF0ZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGl0bGVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb25JZFxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGV4cGFuZGVkXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhcGlSb290VXJsXHJcbiAqL1xyXG4vKipcclxuICogQHR5cGVkZWYge29iamVjdH0gRXJyb3JNZXNzYWdlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXNzYWdlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlcnJvckNvZGVcclxuICovXHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBTZWxlY3RlZEVsZW1lbnRcclxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRcclxuICovXHJcbi8qKlxyXG4gKiBTZWxlY3QgZXZlbnRcclxuICogQGV2ZW50IEh1YiNzZWxlY3RcclxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cclxuICovXHJcbi8qKlxyXG4gKiBFcnJvciBldmVudFxyXG4gKiBAZXZlbnQgSHViI2Vycm9yXHJcbiAqIEB0eXBlIHtFcnJvck1lc3NhZ2V9XHJcbiAqL1xyXG4vKipcclxuICogVXBsb2FkIGV2ZW50XHJcbiAqIEBldmVudCBIdWIjdXBsb2FkXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxyXG4gKiBAZmlyZXMgSHViI2Vycm9yXHJcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWIge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgLy8gc2VydmljZXNcclxuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xyXG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjb250cm9sbGVyc1xyXG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24gPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uKHN0YXRlLCB0aGlzLnNlcnZpY2VzKTtcclxuICAgIHRoaXMudXBsb2FkU2VjdGlvbiA9IG5ldyBVcGxvYWRTZWN0aW9uKHN0YXRlLCB0aGlzLnNlcnZpY2VzKTtcclxuXHJcbiAgICAvLyB2aWV3c1xyXG4gICAgdGhpcy52aWV3ID0gbmV3IEh1YlZpZXcoc3RhdGUpO1xyXG5cclxuICAgIC8vIHByb3BhZ2F0ZSBjb250cm9sbGVyIGV2ZW50c1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24pO1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWyd1cGxvYWQnXSwgdGhpcy51cGxvYWRTZWN0aW9uKTtcclxuXHJcbiAgICAvLyBoYW5kbGUgZXZlbnRzXHJcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnNldFBhbmVsVGl0bGUsIHRoaXMpO1xyXG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy52aWV3LmNsb3NlUGFuZWwsIHRoaXMudmlldyk7XHJcbiAgICB0aGlzLnZpZXcub24oJ3RhYi1jaGFuZ2UnLCB0aGlzLnZpZXcuc2V0U2VjdGlvblR5cGUsIHRoaXMudmlldyk7XHJcbiAgICB0aGlzLnZpZXcub24oJ3BhbmVsLWNoYW5nZScsIHRoaXMudmlldy50b2dnbGVQYW5lbE9wZW4uYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24ub24oJ3JlbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBzZWxmLnNlcnZpY2VzLnNldHVwKCk7XHJcbiAgICAgIHNlbGYuY29udGVudFR5cGVTZWN0aW9uLmluaXRDb250ZW50VHlwZUxpc3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaW5pdFRhYlBhbmVsKHN0YXRlKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGNvbnRlbnQgdHlwZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxyXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cclxuICAgKi9cclxuICBnZXRDb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUobWFjaGluZU5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdGl0bGUgb2YgdGhlIHBhbmVsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBzZXRQYW5lbFRpdGxlKHtpZH0pwqB7XHJcbiAgICB0aGlzLmdldENvbnRlbnRUeXBlKGlkKS50aGVuKCh7dGl0bGV9KSA9PiB0aGlzLnZpZXcuc2V0VGl0bGUodGl0bGUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYXRlcyB0aGUgdGFiIHBhbmVsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbklkXHJcbiAgICovXHJcbiAgaW5pdFRhYlBhbmVsKHsgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnIH0pIHtcclxuICAgIGNvbnN0IHRhYkNvbmZpZ3MgPSBbe1xyXG4gICAgICB0aXRsZTogJ0NyZWF0ZSBDb250ZW50JyxcclxuICAgICAgaWQ6ICdjb250ZW50LXR5cGVzJyxcclxuICAgICAgY29udGVudDogdGhpcy5jb250ZW50VHlwZVNlY3Rpb24uZ2V0RWxlbWVudCgpLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdVcGxvYWQnLFxyXG4gICAgICBpZDogJ3VwbG9hZCcsXHJcbiAgICAgIGNvbnRlbnQ6IHRoaXMudXBsb2FkU2VjdGlvbi5nZXRFbGVtZW50KClcclxuICAgIH1dO1xyXG5cclxuICAgIC8vIHNldHMgdGhlIGNvcnJlY3Qgb25lIHNlbGVjdGVkXHJcbiAgICB0YWJDb25maWdzXHJcbiAgICAgIC5maWx0ZXIoY29uZmlnID0+IGNvbmZpZy5pZCA9PT0gc2VjdGlvbklkKVxyXG4gICAgICAuZm9yRWFjaChjb25maWcgPT4gY29uZmlnLnNlbGVjdGVkID0gdHJ1ZSk7XHJcblxyXG4gICAgdGFiQ29uZmlncy5mb3JFYWNoKHRhYkNvbmZpZyA9PiB0aGlzLnZpZXcuYWRkVGFiKHRhYkNvbmZpZykpO1xyXG4gICAgdGhpcy52aWV3LmFkZEJvdHRvbUJvcmRlcigpOyAvLyBBZGRzIGFuIGFuaW1hdGVkIGJvdHRvbSBib3JkZXIgdG8gZWFjaCB0YWJcclxuICAgIHRoaXMudmlldy5pbml0VGFiUGFuZWwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBpbiB0aGUgdmlld1xyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWIuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIHJlbW92ZUNoaWxkLCBoaWRlLCBzaG93IH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XHJcbmltcG9ydCB7IGN1cnJ5LCBmb3JFYWNoIH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcclxuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5pbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCI7XHJcbmltcG9ydCBpbml0SW1hZ2VTY3JvbGxlciBmcm9tIFwiY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlclwiO1xyXG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XHJcbmltcG9ydCBub0ljb24gZnJvbSAnLi4vLi4vaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmcnO1xyXG5cclxuLyoqXHJcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxyXG4gKi9cclxuY29uc3QgQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCA9ICdkYXRhLWlkJztcclxuXHJcbi8qKlxyXG4gKiBAY29uc3RhbnQge251bWJlcn1cclxuICovXHJcbmNvbnN0IE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04gPSAzMDA7XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBpZiBhbiBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXHJcbiAqL1xyXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGVsZW1lbnQsIHZpc2libGUpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBlbXB0eVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuY29uc3QgaXNFbXB0eSA9ICh0ZXh0KSA9PiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSAmJiAodGV4dC5sZW5ndGggPT09IDApO1xyXG5cclxuY29uc3QgaGlkZUFsbCA9IGZvckVhY2goaGlkZSk7XHJcblxyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWxWaWV3IHtcclxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xyXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgdmlld1xyXG4gICAgdGhpcy5yb290RWxlbWVudCA9IHRoaXMuY3JlYXRlVmlldygpO1xyXG5cclxuICAgIC8vIGdyYWIgcmVmZXJlbmNlc1xyXG4gICAgdGhpcy5idXR0b25CYXIgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tYmFyJyk7XHJcbiAgICB0aGlzLnVzZUJ1dHRvbiA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tdXNlJyk7XHJcbiAgICB0aGlzLmluc3RhbGxCdXR0b24gPSB0aGlzLmJ1dHRvbkJhci5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLWluc3RhbGwnKTtcclxuICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idXR0b24nKTtcclxuXHJcbiAgICB0aGlzLmltYWdlID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC10eXBlLWltYWdlJyk7XHJcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kZXRhaWxzIC50aXRsZScpO1xyXG4gICAgdGhpcy5vd25lciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bmVyJyk7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kZXRhaWxzIC5zbWFsbCcpO1xyXG4gICAgdGhpcy5kZW1vQnV0dG9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZGVtby1idXR0b24nKTtcclxuICAgIHRoaXMuY2Fyb3VzZWwgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbCcpO1xyXG4gICAgdGhpcy5jYXJvdXNlbExpc3QgPSB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XHJcbiAgICB0aGlzLmxpY2VuY2VQYW5lbCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmxpY2VuY2UtcGFuZWwnKTtcclxuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnN0YWxsLW1lc3NhZ2UnKTtcclxuXHJcbiAgICAvLyBoaWRlIG1lc3NhZ2Ugb24gY2xvc2UgYnV0dG9uIGNsaWNrXHJcbiAgICBsZXQgaW5zdGFsbE1lc3NhZ2VDbG9zZSA9IHRoaXMuaW5zdGFsbE1lc3NhZ2UucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtY2xvc2UnKTtcclxuICAgIGluc3RhbGxNZXNzYWdlQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBoaWRlKHRoaXMuaW5zdGFsbE1lc3NhZ2UpKTtcclxuXHJcbiAgICAvLyBpbml0IGludGVyYWN0aXZlIGVsZW1lbnRzXHJcbiAgICBpbml0UGFuZWwodGhpcy5saWNlbmNlUGFuZWwpO1xyXG4gICAgaW5pdEltYWdlU2Nyb2xsZXIodGhpcy5jYXJvdXNlbCk7XHJcblxyXG4gICAgLy8gZmlyZSBldmVudHMgb24gYnV0dG9uIGNsaWNrXHJcbiAgICByZWxheUNsaWNrRXZlbnRBcygnY2xvc2UnLCB0aGlzLCB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrLWJ1dHRvbicpKTtcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XHJcbiAgICByZWxheUNsaWNrRXZlbnRBcygnaW5zdGFsbCcsIHRoaXMsIHRoaXMuaW5zdGFsbEJ1dHRvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSB2aWV3IGFzIGEgSFRNTEVsZW1lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGNyZWF0ZVZpZXcgKCkge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWRldGFpbCc7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJiYWNrLWJ1dHRvbiBpY29uLWFycm93LXRoaWNrXCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2Utd3JhcHBlclwiPjxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZSBjb250ZW50LXR5cGUtaW1hZ2VcIiBzcmM9XCIke25vSWNvbn1cIj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1kZXRhaWxzXCI+XHJcbiAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPjwvaDI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3duZXJcIj48L2Rpdj5cclxuICAgICAgICAgIDxwIGNsYXNzPVwic21hbGxcIj48L3A+XHJcbiAgICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbiBkZW1vLWJ1dHRvblwiIHRhcmdldD1cIl9ibGFua1wiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBocmVmPVwiI1wiPkNvbnRlbnQgRGVtbzwvYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbFwiIHJvbGU9XCJyZWdpb25cIiBkYXRhLXNpemU9XCI1XCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1idXR0b24gcHJldmlvdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkaXNhYmxlZD48c3BhbiBjbGFzcz1cImljb24tYXJyb3ctdGhpY2tcIj48L3NwYW4+PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIG5leHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkaXNhYmxlZD48c3BhbiBjbGFzcz1cImljb24tYXJyb3ctdGhpY2tcIj48L3NwYW4+PC9zcGFuPlxyXG4gICAgICAgIDxuYXYgY2xhc3M9XCJzY3JvbGxlclwiPlxyXG4gICAgICAgICAgPHVsPjwvdWw+XHJcbiAgICAgICAgPC9uYXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8aHIgLz5cclxuICAgICAgPGRpdiBjbGFzcz1cImluc3RhbGwtbWVzc2FnZSBtZXNzYWdlIGRpc21pc3NpYmxlIHNpbXBsZSBpbmZvXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtY2xvc2UgaWNvbi1jbG9zZVwiPjwvZGl2PlxyXG4gICAgICAgIDxoMz48L2gzPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1iYXJcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tcHJpbWFyeSBidXR0b24tdXNlXCIgYXJpYS1oaWRkZW49XCJmYWxzZVwiIGRhdGEtaWQ9XCJcIj5Vc2U8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLWludmVyc2UtcHJpbWFyeSBidXR0b24taW5zdGFsbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRhdGEtaWQ9XCJcIj48c3BhbiBjbGFzcz1cImljb24tYXJyb3ctdGhpY2tcIj48L3NwYW4+SW5zdGFsbDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsaW5nXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHNwYW4gY2xhc3M9XCJpY29uLWxvYWRpbmctc2VhcmNoIGljb24tc3BpblwiPjwvc3Bhbj5JbnN0YWxsaW5nPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWdyb3VwXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIGxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkZXJcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBhcmlhLWNvbnRyb2xzPVwibGljZW5jZS1wYW5lbFwiPjxzcGFuIGNsYXNzPVwiaWNvbi1hY2NvcmRpb24tYXJyb3dcIj48L3NwYW4+IFRoZSBMaWNlbmNlIEluZm88L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCIgaWQ9XCJsaWNlbmNlLXBhbmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5LWlubmVyXCI+PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+YDtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgYSBtZXNzYWdlIG9uIGluc3RhbGxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc3VjY2Vzc1xyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXHJcbiAgICovXHJcbiAgc2V0SW5zdGFsbE1lc3NhZ2UoeyBzdWNjZXNzID0gdHJ1ZSwgbWVzc2FnZSB9KXtcclxuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UucXVlcnlTZWxlY3RvcignaDMnKS5pbm5lclRleHQgPSBtZXNzYWdlO1xyXG4gICAgdGhpcy5pbnN0YWxsTWVzc2FnZS5jbGFzc05hbWUgPSBgaW5zdGFsbC1tZXNzYWdlIGRpc21pc3NpYmxlIG1lc3NhZ2Ugc2ltcGxlICR7c3VjY2VzcyA/ICdpbmZvJyA6ICdlcnJvcid9YDtcclxuICAgIHNob3codGhpcy5pbnN0YWxsTWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFsbCBpbWFnZXMgZnJvbSB0aGUgY2Fyb3VzZWxcclxuICAgKi9cclxuICByZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsKCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWxMaXN0KSk7XHJcbiAgICB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbC1saWdodGJveCcpLmZvckVhY2gocmVtb3ZlQ2hpbGQodGhpcy5jYXJvdXNlbCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGltYWdlIHRvIHRoZSBjYXJvdXNlbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGltYWdlXHJcbiAgICovXHJcbiAgYWRkSW1hZ2VUb0Nhcm91c2VsKGltYWdlKSB7XHJcbiAgICAvLyBhZGQgbGlnaHRib3hcclxuICAgIGNvbnN0IGxpZ2h0Ym94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBsaWdodGJveC5pZCA9IGBsaWdodGJveC0ke3RoaXMuY2Fyb3VzZWxMaXN0LmNoaWxkRWxlbWVudENvdW50fWA7XHJcbiAgICBsaWdodGJveC5jbGFzc05hbWUgPSAnY2Fyb3VzZWwtbGlnaHRib3gnO1xyXG4gICAgbGlnaHRib3guc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcbiAgICBsaWdodGJveC5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZS51cmx9XCIgYWx0PVwiJHtpbWFnZS5hbHR9XCI+YDtcclxuICAgIHRoaXMuY2Fyb3VzZWwuYXBwZW5kQ2hpbGQobGlnaHRib3gpO1xyXG5cclxuICAgIC8vIGFkZCB0aHVtYm5haWxcclxuICAgIGNvbnN0IHRodW1ibmFpbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICB0aHVtYm5haWwuY2xhc3NOYW1lID0gJ3NsaWRlJztcclxuICAgIHRodW1ibmFpbC5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ltYWdlLnVybH1cIiBhbHQ9XCIke2ltYWdlLmFsdH1cIiBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgYXJpYS1jb250cm9scz1cIiR7bGlnaHRib3guaWR9XCIgLz5gO1xyXG4gICAgdGhpcy5jYXJvdXNlbExpc3QuYXBwZW5kQ2hpbGQodGh1bWJuYWlsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0cyB0aGUgZGV0YWlsIHZpZXdcclxuICAgKi9cclxuICByZXNldCgpIHtcclxuICAgIGhpZGUodGhpcy5pbnN0YWxsTWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBpbWFnZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNyY1xyXG4gICAqL1xyXG4gIHNldEltYWdlKHNyYykge1xyXG4gICAgdGhpcy5pbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyB8fCBub0ljb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdGl0bGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqL1xyXG4gIHNldElkKGlkKSB7XHJcbiAgICB0aGlzLmluc3RhbGxCdXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGlkKTtcclxuICAgIHRoaXMudXNlQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSB0aXRsZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcbiAgICovXHJcbiAgc2V0VGl0bGUodGl0bGUpIHtcclxuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gYCR7dGl0bGV9YDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICovXHJcbiAgc2V0RGVzY3JpcHRpb24odGV4dCkge1xyXG4gICAgaWYodGV4dC5sZW5ndGggPiBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OKSB7XHJcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGhpcy5lbGxpcHNpcyhNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OLCB0ZXh0KX08c3BhbiBjbGFzcz1cInJlYWQtbW9yZSBsaW5rXCI+UmVhZCBtb3JlPC9zcGFuPmA7XHJcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25cclxuICAgICAgICAucXVlcnlTZWxlY3RvcignLnJlYWQtbW9yZSwgLnJlYWQtbGVzcycpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkKHRleHQpKTtcclxuICAgICAgdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlcyBSZWFkIGxlc3MgYW5kIFJlYWQgbW9yZSB0ZXh0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gICAqL1xyXG4gIHRvZ2dsZURlc2NyaXB0aW9uRXhwYW5kZWQodGV4dCkge1xyXG4gICAgLy8gZmxpcCBib29sZWFuXHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQgPSAhdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkO1xyXG5cclxuICAgIGlmKHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCkge1xyXG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RleHR9PHNwYW4gY2xhc3M9XCJyZWFkLWxlc3MgbGlua1wiPlJlYWQgbGVzczwvc3Bhbj5gO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGhpcy5lbGxpcHNpcyhNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OLCB0ZXh0KX08c3BhbiBjbGFzcz1cInJlYWQtbW9yZSBsaW5rXCI+UmVhZCBtb3JlPC9zcGFuPmA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZXNjcmlwdGlvblxyXG4gICAgICAucXVlcnlTZWxlY3RvcignLnJlYWQtbW9yZSwgLnJlYWQtbGVzcycpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG9ydGVucyBhIHN0cmluZywgYW5kIHB1dHMgYW4gZWxpcHNpcyBhdCB0aGUgZW5kXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICovXHJcbiAgZWxsaXBzaXMoc2l6ZSwgdGV4dCkge1xyXG4gICAgcmV0dXJuIGAke3RleHQuc3Vic3RyKDAsIHNpemUpfS4uLmA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBsaWNlbmNlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAqL1xyXG4gIHNldExpY2VuY2UodHlwZSkge1xyXG4gICAgaWYodHlwZSl7XHJcbiAgICAgIHRoaXMubGljZW5jZVBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5wYW5lbC1ib2R5LWlubmVyJykuaW5uZXJUZXh0ID0gdHlwZTtcclxuICAgICAgc2hvdyh0aGlzLmxpY2VuY2VQYW5lbCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgaGlkZSh0aGlzLmxpY2VuY2VQYW5lbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3duZXJcclxuICAgKi9cclxuICBzZXRPd25lcihvd25lcikge1xyXG4gICAgaWYob3duZXIpIHtcclxuICAgICAgdGhpcy5vd25lci5pbm5lckhUTUwgPSBgQnkgJHtvd25lcn1gO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMub3duZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBleGFtcGxlIHVybFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxyXG4gICAqL1xyXG4gIHNldEV4YW1wbGUodXJsKSB7XHJcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XHJcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuZGVtb0J1dHRvbiwgIWlzRW1wdHkodXJsKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGlmIHRoZSBjb250ZW50IHR5cGUgaXMgaW5zdGFsbGVkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluc3RhbGxlZFxyXG4gICAqL1xyXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xyXG4gICAgdGhpcy5zaG93QnV0dG9uQnlTZWxlY3RvcihpbnN0YWxsZWQgPyAnLmJ1dHRvbi11c2UnIDogJy5idXR0b24taW5zdGFsbCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZXMgYWxsIGJ1dHRvbnMgYW5kIHNob3dzIHRoZSBidXR0b24gb24gdGhlIHNlbGVjdG9yIGFnYWluXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ31zZWxlY3RvclxyXG4gICAqL1xyXG4gIHNob3dCdXR0b25CeVNlbGVjdG9yKHNlbGVjdG9yKSB7XHJcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmJ1dHRvbkJhci5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuXHJcbiAgICBpZihidXR0b24pIHtcclxuICAgICAgaGlkZUFsbCh0aGlzLmJ1dHRvbnMpO1xyXG4gICAgICBzaG93KGJ1dHRvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XHJcbiAgICovXHJcbiAgaGlkZSgpIHtcclxuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XHJcbiAgICovXHJcbiAgc2hvdygpIHtcclxuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlRGV0YWlsVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXdcIjtcclxuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsIHtcclxuICBjb25zdHJ1Y3RvcihzdGF0ZSwgc2VydmljZXMpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgLy8gc2VydmljZXNcclxuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcclxuXHJcbiAgICAvLyB2aWV3c1xyXG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVEZXRhaWxWaWV3KHN0YXRlKTtcclxuICAgIHRoaXMudmlldy5vbignaW5zdGFsbCcsIHRoaXMuaW5zdGFsbCwgdGhpcyk7XHJcblxyXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWydjbG9zZScsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGVzIHRoZSBkZXRhaWwgdmlld1xyXG4gICAqL1xyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3MgdGhlIGRldGFpbCB2aWV3XHJcbiAgICovXHJcbiAgc2hvdygpIHtcclxuICAgIHRoaXMudmlldy5zaG93KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XHJcbiAgICovXHJcbiAgbG9hZEJ5SWQoaWQpIHtcclxuICAgIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXHJcbiAgICAgIC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XHJcbiAgICovXHJcbiAgIGluc3RhbGwoe2lkfSkge1xyXG4gICAgIC8vIHNldCBzcGlubmVyXHJcbiAgICAgdGhpcy52aWV3LnNob3dCdXR0b25CeVNlbGVjdG9yKCcuYnV0dG9uLWluc3RhbGxpbmcnKTtcclxuXHJcbiAgICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXHJcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiB0aGlzLnNlcnZpY2VzLmluc3RhbGxDb250ZW50VHlwZShjb250ZW50VHlwZS5tYWNoaW5lTmFtZSkpXHJcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiB7XHJcbiAgICAgICAgIHRoaXMudmlldy5zZXRJc0luc3RhbGxlZCh0cnVlKTtcclxuICAgICAgICAgdGhpcy52aWV3LnNob3dCdXR0b25CeVNlbGVjdG9yKCcuYnV0dG9uLWdldCcpO1xyXG4gICAgICAgICB0aGlzLnZpZXcuc2V0SW5zdGFsbE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgIG1lc3NhZ2U6IGAke2NvbnRlbnRUeXBlLnRpdGxlfSBzdWNjZXNzZnVsbHkgaW5zdGFsbGVkIWAsXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgfSlcclxuICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgIHRoaXMudmlldy5zaG93QnV0dG9uQnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsJyk7XHJcblxyXG4gICAgICAgICAvLyBwcmludCBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAoZXJyb3IuZXJyb3JDb2RlKSA/IGVycm9yIDoge1xyXG4gICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgIGVycm9yQ29kZTogJ1JFU1BPTlNFX0ZBSUxFRCcsXHJcbiAgICAgICAgICAgbWVzc2FnZTogYCR7aWR9IGNvdWxkIG5vdCBiZSBpbnN0YWxsZWQhIENvbnRhY3QgeW91ciBhZG1pbmlzdHJhdG9yLmAsXHJcbiAgICAgICAgIH07XHJcbiAgICAgICAgIHRoaXMudmlldy5zZXRJbnN0YWxsTWVzc2FnZShlcnJvck1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgLy8gbG9nIHdob2xlIGVycm9yIG1lc3NhZ2UgdG8gY29uc29sZVxyXG4gICAgICAgICBjb25zb2xlLmVycm9yKCdJbnN0YWxsYXRpb24gZXJyb3InLCBlcnJvcik7XHJcbiAgICAgICB9KTtcclxuICAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGNvbnRlbnQgdHlwZSBkYXRhXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxyXG4gICAqL1xyXG4gIHVwZGF0ZShjb250ZW50VHlwZSkge1xyXG4gICAgdGhpcy52aWV3LnJlc2V0KCk7XHJcbiAgICB0aGlzLnZpZXcuc2V0SWQoY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xyXG4gICAgdGhpcy52aWV3LnNldFRpdGxlKGNvbnRlbnRUeXBlLnRpdGxlKTtcclxuICAgIHRoaXMudmlldy5zZXREZXNjcmlwdGlvbihjb250ZW50VHlwZS5kZXNjcmlwdGlvbik7XHJcbiAgICB0aGlzLnZpZXcuc2V0SW1hZ2UoY29udGVudFR5cGUuaWNvbik7XHJcbiAgICB0aGlzLnZpZXcuc2V0RXhhbXBsZShjb250ZW50VHlwZS5leGFtcGxlKTtcclxuICAgIHRoaXMudmlldy5zZXRPd25lcihjb250ZW50VHlwZS5vd25lcik7XHJcbiAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQoY29udGVudFR5cGUuaW5zdGFsbGVkKTtcclxuICAgIHRoaXMudmlldy5zZXRMaWNlbmNlKGNvbnRlbnRUeXBlLmxpY2Vuc2UpO1xyXG5cclxuICAgIC8vIHVwZGF0ZSBjYXJvdXNlbFxyXG4gICAgdGhpcy52aWV3LnJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwoKTtcclxuICAgIGNvbnRlbnRUeXBlLnNjcmVlbnNob3RzLmZvckVhY2godGhpcy52aWV3LmFkZEltYWdlVG9DYXJvdXNlbCwgdGhpcy52aWV3KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBnZXRFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcclxuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIHJlbW92ZUNoaWxkIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcclxuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xyXG5pbXBvcnQgbm9JY29uIGZyb20gJy4uLy4uL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnJztcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxyXG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0VmlldyB7XHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuXHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSByb290IGVsZW1lbnRcclxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWxpc3QnO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxyXG4gICAqL1xyXG4gIGhpZGUoKSB7XHJcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxyXG4gICAqL1xyXG4gIHNob3coKSB7XHJcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgcm93cyBmcm9tIHJvb3QgZWxlbWVudFxyXG4gICAqL1xyXG4gIHJlbW92ZUFsbFJvd3MoKSB7XHJcbiAgICB3aGlsZSh0aGlzLnJvb3RFbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSApe1xyXG4gICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMucm9vdEVsZW1lbnQubGFzdENoaWxkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSByb3dcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXHJcbiAgICovXHJcbiAgYWRkUm93KGNvbnRlbnRUeXBlKSB7XHJcbiAgICBjb25zdCByb3cgPSB0aGlzLmNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCB0aGlzKTtcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLCByb3cpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChyb3cpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUYWtlcyBhIENvbnRlbnQgVHlwZSBjb25maWd1cmF0aW9uIGFuZCBjcmVhdGVzIGEgcm93IGRvbVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcclxuICAgKiBAcGFyYW0ge0V2ZW50ZnVsfSBzY29wZVxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHNjb3BlKSB7XHJcbiAgICAvLyByb3cgaXRlbVxyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICBlbGVtZW50LmlkID0gYGNvbnRlbnQtdHlwZS0ke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfWA7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgYnV0dG9uIGNvbmZpZ1xyXG4gICAgY29uc3QgdXNlQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnVXNlJywgY2xzOiAnYnV0dG9uLXByaW1hcnknLCBpY29uOiAnJyB9O1xyXG4gICAgY29uc3QgaW5zdGFsbEJ1dHRvbkNvbmZpZyA9IHsgdGV4dDogJ0dldCcsIGNsczogJ2J1dHRvbi1pbnZlcnNlLXByaW1hcnkgYnV0dG9uLWluc3RhbGwnLCBpY29uOiAnaWNvbi1hcnJvdy10aGljayd9O1xyXG4gICAgY29uc3QgYnV0dG9uID0gY29udGVudFR5cGUuaW5zdGFsbGVkID8gIHVzZUJ1dHRvbkNvbmZpZzogaW5zdGFsbEJ1dHRvbkNvbmZpZztcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IGNvbnRlbnRUeXBlLnRpdGxlIHx8IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBjb250ZW50VHlwZS5zdW1tYXJ5IHx8ICcnO1xyXG5cclxuICAgIGNvbnN0IGltYWdlID0gY29udGVudFR5cGUuaWNvbiB8fCBub0ljb247XHJcblxyXG4gICAgLy8gY3JlYXRlIGh0bWxcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBzcmM9XCIke2ltYWdlfVwiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiAke2J1dHRvbi5jbHN9XCIgZGF0YS1pZD1cIiR7Y29udGVudFR5cGUubWFjaGluZU5hbWV9XCIgdGFiaW5kZXg9XCIwXCI+PHNwYW4gY2xhc3M9XCIke2J1dHRvbi5pY29ufVwiPjwvc3Bhbj4ke2J1dHRvbi50ZXh0fTwvc3Bhbj5cclxuICAgICAgPGg0PiR7dGl0bGV9PC9oND5cclxuICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+JHtkZXNjcmlwdGlvbn08L2Rpdj5cclxuICAgYDtcclxuXHJcbiAgICAvLyBoYW5kbGUgdXNlIGJ1dHRvblxyXG4gICAgY29uc3QgdXNlQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXByaW1hcnknKTtcclxuICAgIGlmKHVzZUJ1dHRvbil7XHJcbiAgICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCBzY29wZSwgdXNlQnV0dG9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVMaXN0VmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtbGlzdC12aWV3XCI7XHJcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XHJcblxyXG4vKipcclxuICogUm93IHNlbGVjdGVkIGV2ZW50XHJcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXHJcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XHJcbiAqL1xyXG4vKipcclxuICogVXBkYXRlIGNvbnRlbnQgdHlwZSBsaXN0IGV2ZW50XHJcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3QjdXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0XHJcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XHJcbiAqL1xyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxyXG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxyXG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0IHtcclxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xyXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIHZpZXdcclxuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlTGlzdFZpZXcoc3RhdGUpO1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWydyb3ctc2VsZWN0ZWQnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlIHRoaXMgZWxlbWVudFxyXG4gICAqL1xyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyB0aGlzIGVsZW1lbnRcclxuICAgKi9cclxuICBzaG93KCkge1xyXG4gICAgdGhpcy52aWV3LnNob3coKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCB3aXRoIG5ldyBjb250ZW50IHR5cGVzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xyXG4gICAqL1xyXG4gIHVwZGF0ZShjb250ZW50VHlwZXMpIHtcclxuICAgIHRoaXMudmlldy5yZW1vdmVBbGxSb3dzKCk7XHJcbiAgICBjb250ZW50VHlwZXMuZm9yRWFjaCh0aGlzLnZpZXcuYWRkUm93LCB0aGlzLnZpZXcpO1xyXG4gICAgdGhpcy5maXJlKCd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnLCB7fSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgdmlld3Mgcm9vdCBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBnZXRFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwiaW1wb3J0IE1lc3NhZ2VWaWV3IGZyb20gXCIuLi9tZXNzYWdlLXZpZXcvbWVzc2FnZS12aWV3XCI7XHJcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSwgcXVlcnlTZWxlY3RvckFsbCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xyXG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcclxuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xyXG5pbXBvcnQgaW5pdE1lbnUgZnJvbSAnY29tcG9uZW50cy9tZW51JztcclxuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5jb25zdCB1bnNlbGVjdEFsbCA9IGZvckVhY2gocmVtb3ZlQXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcclxuICogQG1peGVzIEV2ZW50ZnVsXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50QnJvd3NlclZpZXcge1xyXG4gIC8qKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xyXG4gICAgdGhpcy5yb290RWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudChzdGF0ZSk7XHJcblxyXG4gICAgLy8gcGljayBlbGVtZW50c1xyXG4gICAgdGhpcy5tZW51YmFyID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLW5hdicpO1xyXG4gICAgdGhpcy5pbnB1dEZpZWxkID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInNlYXJjaFwiXSBpbnB1dCcpO1xyXG4gICAgdGhpcy5kaXNwbGF5U2VsZWN0ZWQgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItdG9nZ2xlci1zZWxlY3RlZCcpO1xyXG4gICAgY29uc3QgaW5wdXRCdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwic2VhcmNoXCJdIC5pbnB1dC1ncm91cC1hZGRvbicpO1xyXG5cclxuICAgIC8vIGlucHV0IGZpZWxkXHJcbiAgICB0aGlzLmlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XHJcbiAgICAgIHRoaXMuZmlyZSgnc2VhcmNoJywge1xyXG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LnRhcmdldCxcclxuICAgICAgICBxdWVyeTogZXZlbnQudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgIGtleUNvZGU6IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGVcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBpbnB1dCBidXR0b25cclxuICAgIGlucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgbGV0IHNlYXJjaGJhciA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNodWItc2VhcmNoLWJhcicpO1xyXG5cclxuICAgICAgIHRoaXMuZmlyZSgnc2VhcmNoJywge1xyXG4gICAgICAgICBlbGVtZW50OiBzZWFyY2hiYXIsXHJcbiAgICAgICAgIHF1ZXJ5OiBzZWFyY2hiYXIudmFsdWUsXHJcbiAgICAgICAgIGtleUNvZGU6IDEzIC8vIEFjdCBsaWtlIGFuICdlbnRlcicga2V5IHByZXNzXHJcbiAgICAgICB9KTtcclxuXHJcbiAgICAgICBzZWFyY2hiYXIuZm9jdXMoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSBtZW51IGdyb3VwIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgY3JlYXRlRWxlbWVudChzdGF0ZSkge1xyXG4gICAgbGV0IG1lbnV0aXRsZSA9ICdCcm93c2UgY29udGVudCB0eXBlcyc7XHJcbiAgICBsZXQgbWVudUlkID0gJ2NvbnRlbnQtdHlwZS1maWx0ZXInO1xyXG4gICAgbGV0IHNlYXJjaFRleHQgPSAnU2VhcmNoIGZvciBDb250ZW50IFR5cGVzJztcclxuXHJcbiAgICAvLyBjcmVhdGUgZWxlbWVudFxyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLXNlY3Rpb24tdmlldyc7XHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtZ3JvdXBcIj5cclxuICAgICAgICA8bmF2ICByb2xlPVwibWVudWJhclwiIGNsYXNzPVwibmF2YmFyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlciBuYXZiYXItdG9nZ2xlci1yaWdodFwiIGFyaWEtY29udHJvbHM9XCIke21lbnVJZH1cIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cclxuICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlci1zZWxlY3RlZFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWFjY29yZGlvbi1hcnJvd1wiPjwvc3Bhbj5cclxuICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItYnJhbmRcIj4ke21lbnV0aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8dWwgaWQ9XCIke21lbnVJZH1cIiBjbGFzcz1cIm5hdmJhci1uYXZcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3VsPlxyXG4gICAgICAgIDwvbmF2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIiByb2xlPVwic2VhcmNoXCI+XHJcbiAgICAgICAgICA8aW5wdXQgaWQ9XCJodWItc2VhcmNoLWJhclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1yb3VuZGVkXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiR7c2VhcmNoVGV4dH1cIiAvPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGljb24tc2VhcmNoXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PmA7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5TWVzc2FnZShjb25maWcpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIC8vIFNldCB0aGUgYWN0aW9uXHJcbiAgICAvLyBUT0RPIC0gc2hvdWxkIGJlIHRyYW5zbGF0YWJsZVxyXG4gICAgY29uZmlnLmFjdGlvbiA9IFwiUmVsb2FkXCI7XHJcblxyXG4gICAgdmFyIG1lc3NhZ2VWaWV3ID0gbmV3IE1lc3NhZ2VWaWV3KGNvbmZpZyk7XHJcbiAgICB2YXIgZWxlbWVudCA9IG1lc3NhZ2VWaWV3LmdldEVsZW1lbnQoKTtcclxuXHJcbiAgICBtZXNzYWdlVmlldy5vbignYWN0aW9uLWNsaWNrZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNlbGYucm9vdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcclxuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICBzZWxmLmZpcmUoJ3JlbG9hZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlVmlldy5nZXRFbGVtZW50KCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIG1lbnUgaXRlbVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZCBEZXRlcm1pbmVzIGlmIHRhYiBpcyBhbHJlYWR5IHNlbGVjdGVkXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBOYW1lIG9mIGV2ZW50IHRoYXQgdGFiIHdpbGwgZmlyZSBvZmZcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGFkZE1lbnVJdGVtKHsgdGl0bGUsIGlkLCBzZWxlY3RlZCwgZXZlbnROYW1lIH0pIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWl0ZW0nKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgaWQpO1xyXG4gICAgZWxlbWVudC5pbm5lclRleHQgPSB0aXRsZTtcclxuXHJcbiAgICAvLyBzZXRzIGlmIHRoaXMgbWVudWl0ZW0gc2hvdWxkIGJlIHNlbGVjdGVkXHJcbiAgICBpZihzZWxlY3RlZCkge1xyXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XHJcbiAgICAgIHRoaXMuZGlzcGxheVNlbGVjdGVkLmlubmVyVGV4dCA9IHRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgIHRoaXMuZmlyZSgnbWVudS1zZWxlY3RlZCcsIHtcclxuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXQsXHJcbiAgICAgICAgY2hvaWNlOiBldmVudE5hbWVcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBhZGQgdG8gbWVudSBiYXJcclxuICAgIHRoaXMubWVudWJhci5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgIHJldHVybiBlbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXJzIHRoZSBpbnB1dCBmaWVsZFxyXG4gICAqL1xyXG4gIGNsZWFySW5wdXRGaWVsZCgpIHtcclxuICAgIHRoaXMuaW5wdXRGaWVsZC52YWx1ZSA9ICcnO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGZpbHRlclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdGVkTmFtZVxyXG4gICAqL1xyXG4gIHNldERpc3BsYXlTZWxlY3RlZChzZWxlY3RlZE5hbWUpIHtcclxuICAgIHRoaXMuZGlzcGxheVNlbGVjdGVkLmlubmVyVGV4dCA9IHNlbGVjdGVkTmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdHMgYSBtZW51IGl0ZW0gYnkgaWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqL1xyXG4gIHNlbGVjdE1lbnVJdGVtQnlJZChpZCkge1xyXG4gICAgY29uc3QgbWVudUl0ZW1zID0gdGhpcy5tZW51YmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkTWVudUl0ZW0gPSB0aGlzLm1lbnViYXIucXVlcnlTZWxlY3RvcihgW3JvbGU9XCJtZW51aXRlbVwiXVtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcclxuXHJcbiAgICBpZihzZWxlY3RlZE1lbnVJdGVtKSB7XHJcbiAgICAgIHVuc2VsZWN0QWxsKG1lbnVJdGVtcyk7XHJcbiAgICAgIHNlbGVjdGVkTWVudUl0ZW0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcclxuXHJcbiAgICAgIHRoaXMuZmlyZSgnbWVudS1zZWxlY3RlZCcsIHtcclxuICAgICAgICBlbGVtZW50OiBzZWxlY3RlZE1lbnVJdGVtLFxyXG4gICAgICAgIGlkOiBzZWxlY3RlZE1lbnVJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdE1lbnUoKSB7XHJcbiAgICAvLyBjcmVhdGUgdGhlIHVuZGVybGluZVxyXG4gICAgY29uc3QgdW5kZXJsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgdW5kZXJsaW5lLmNsYXNzTmFtZSA9ICdtZW51aXRlbS11bmRlcmxpbmUnO1xyXG4gICAgdGhpcy5tZW51YmFyLmFwcGVuZENoaWxkKHVuZGVybGluZSk7XHJcblxyXG4gICAgLy8gY2FsbCBpbml0IG1lbnUgZnJvbSBzZGtcclxuICAgIGluaXRNZW51KHRoaXMucm9vdEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsImltcG9ydCBDb250ZW50VHlwZVNlY3Rpb25WaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXdcIjtcclxuaW1wb3J0IFNlYXJjaFNlcnZpY2UgZnJvbSBcIi4uL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlXCI7XHJcbmltcG9ydCBDb250ZW50VHlwZUxpc3QgZnJvbSAnLi4vY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QnO1xyXG5pbXBvcnQgQ29udGVudFR5cGVEZXRhaWwgZnJvbSAnLi4vY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsJztcclxuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcclxuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4uL3V0aWxzL2Vycm9ycyc7XHJcblxyXG4vKipcclxuICogVGFiIHNlY3Rpb24gY29uc3RhbnRzXHJcbiAqL1xyXG5jb25zdCBDb250ZW50VHlwZVNlY3Rpb25UYWJzID0ge1xyXG4gIEFMTDoge1xyXG4gICAgaWQ6ICdmaWx0ZXItYWxsJyxcclxuICAgIHRpdGxlOiAnQWxsJyxcclxuICAgIGV2ZW50TmFtZTogJ2FsbCdcclxuICB9LFxyXG4gIE1ZX0NPTlRFTlRfVFlQRVM6IHtcclxuICAgIGlkOiAnZmlsdGVyLW15LWNvbnRlbnQtdHlwZXMnLFxyXG4gICAgdGl0bGU6ICdNeSBDb250ZW50IFR5cGVzJyxcclxuICAgIGV2ZW50TmFtZTogJ215LWNvbnRlbnQtdHlwZXMnLFxyXG4gICAgc2VsZWN0ZWQ6IHRydWVcclxuICB9LFxyXG4gIE1PU1RfUE9QVUxBUjoge1xyXG4gICAgaWQ6ICdmaWx0ZXItbW9zdC1wb3B1bGFyJyxcclxuICAgIHRpdGxlOiAnTW9zdCBQb3B1bGFyJyxcclxuICAgIGV2ZW50TmFtZTogJ21vc3QtcG9wdWxhcicsXHJcbiAgICBmaWx0ZXJQcm9wZXJ0eTogJ3BvcHVsYXJpdHknXHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb25cclxuICogQG1peGVzIEV2ZW50ZnVsXHJcbiAqXHJcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb24ge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUsIHNlcnZpY2VzKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIHRoaXMudHlwZUFoZWFkRW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgLy8gYWRkIHZpZXdcclxuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb25WaWV3KHN0YXRlKTtcclxuXHJcbiAgICAvLyBjb250cm9sbGVyXHJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZShzZXJ2aWNlcyk7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdCA9IG5ldyBDb250ZW50VHlwZUxpc3QoKTtcclxuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwgPSBuZXcgQ29udGVudFR5cGVEZXRhaWwoc2VydmljZXMpO1xyXG5cclxuICAgIC8vIGFkZCBtZW51IGl0ZW1zXHJcbiAgICBmb3IgKGNvbnN0IHRhYiBpbiBDb250ZW50VHlwZVNlY3Rpb25UYWJzKSB7XHJcbiAgICAgIGlmIChDb250ZW50VHlwZVNlY3Rpb25UYWJzLmhhc093blByb3BlcnR5KHRhYikpIHtcclxuICAgICAgICB0aGlzLnZpZXcuYWRkTWVudUl0ZW0oQ29udGVudFR5cGVTZWN0aW9uVGFic1t0YWJdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy52aWV3LmluaXRNZW51KCk7XHJcblxyXG4gICAgLy8gRWxlbWVudCBmb3IgaG9sZGluZyBsaXN0IGFuZCBkZXRhaWxzIHZpZXdzXHJcbiAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtdHlwZS1zZWN0aW9uJyk7XHJcblxyXG4gICAgdGhpcy5yb290RWxlbWVudCA9IHNlY3Rpb247XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVMaXN0LmdldEVsZW1lbnQoKSk7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVEZXRhaWwuZ2V0RWxlbWVudCgpKTtcclxuXHJcbiAgICB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xyXG5cclxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcclxuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCddLCB0aGlzLmNvbnRlbnRUeXBlTGlzdCk7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCddLCB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsKTtcclxuICAgIHRoaXMucHJvcGFnYXRlKFsncmVsb2FkJ10sIHRoaXMudmlldyk7XHJcblxyXG4gICAgLy8gcmVnaXN0ZXIgbGlzdGVuZXJzXHJcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMuc2VhcmNoLCB0aGlzKTtcclxuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy52aWV3LnNlbGVjdE1lbnVJdGVtQnlJZC5iaW5kKHRoaXMudmlldywgQ29udGVudFR5cGVTZWN0aW9uVGFicy5BTEwuaWQpKTtcclxuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5yZXNldE1lbnVPbkVudGVyLCB0aGlzKTtcclxuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMuYXBwbHlTZWFyY2hGaWx0ZXIsIHRoaXMpO1xyXG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy5jbGVhcklucHV0RmllbGQsIHRoaXMpO1xyXG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy51cGRhdGVEaXNwbGF5U2VsZWN0ZWQsIHRoaXMpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Qub24oJ3Jvdy1zZWxlY3RlZCcsIHRoaXMuc2hvd0RldGFpbFZpZXcsIHRoaXMpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLm9uKCdzZWxlY3QnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5pbml0Q29udGVudFR5cGVMaXN0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0IHdpdGggYSBzZWFyY2hcclxuICAgKi9cclxuICBpbml0Q29udGVudFR5cGVMaXN0KCkge1xyXG4gICAgLy8gaW5pdGlhbGl6ZSBieSBzZWFyY2hcclxuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goXCJcIilcclxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIGVycm9ycyBjb21tdW5pY2F0aW5nIHdpdGggSFVCXHJcbiAgICovXHJcbiAgaGFuZGxlRXJyb3IoZXJyb3IpIHtcclxuICAgIC8vIFRPRE8gLSB1c2UgdHJhbnNsYXRpb24gc3lzdGVtOlxyXG4gICAgdGhpcy52aWV3LmRpc3BsYXlNZXNzYWdlKHtcclxuICAgICAgdHlwZTogJ2Vycm9yJyxcclxuICAgICAgdGl0bGU6ICdOb3QgYWJsZSB0byBjb21tdW5pY2F0ZSB3aXRoIGh1Yi4nLFxyXG4gICAgICBjb250ZW50OiAnRXJyb3Igb2NjdXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4nXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4ZWN1dGVzIGEgc2VhcmNoIGFuZCB1cGRhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XHJcbiAgICovXHJcbiAgc2VhcmNoKHtxdWVyeSwga2V5Q29kZX0pIHtcclxuICAgIGlmICh0aGlzLnR5cGVBaGVhZEVuYWJsZWQgfHwga2V5Q29kZSA9PT0gMTMpIHsgLy8gU2VhcmNoIGF1dG9tYXRpY2FsbHkgb3Igb24gJ2VudGVyJ1xyXG4gICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KVxyXG4gICAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBkaXNwbGF5ZWQgbmFtZSBvZiB0aGUgc2VsZWN0ZWQgZmlsdGVyIGZvciBtb2JpbGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U2VsZWN0ZWRFbGVtZW50fSBldmVudFxyXG4gICAqL1xyXG4gIHVwZGF0ZURpc3BsYXlTZWxlY3RlZChldmVudCkge1xyXG4gICAgdGhpcy52aWV3LnNldERpc3BsYXlTZWxlY3RlZChldmVudC5lbGVtZW50LmlubmVyVGV4dCk7XHJcbiAgfVxyXG5cclxuICByZXNldE1lbnVPbkVudGVyKHtrZXlDb2RlfSkge1xyXG4gICAgaWYgKGtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgIHRoaXMuY2xvc2VEZXRhaWxWaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBsaWVzIHNlYXJjaCBmaWx0ZXIgZGVwZW5kaW5nIG9uIHdoYXQgZXZlbnQgaXQgcmVjZWl2ZXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIEV2ZW50XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGUuY2hvaWNlIEV2ZW50IG5hbWUgb2YgY2hvc2VuIHRhYlxyXG4gICAqL1xyXG4gIGFwcGx5U2VhcmNoRmlsdGVyKGUpIHtcclxuICAgIHN3aXRjaChlLmNob2ljZSkge1xyXG4gICAgICBjYXNlIENvbnRlbnRUeXBlU2VjdGlvblRhYnMuTU9TVF9QT1BVTEFSLmV2ZW50TmFtZTpcclxuICAgICAgICAvLyBGaWx0ZXIgb24gdGFiJ3MgZmlsdGVyIHByb3BlcnR5LCB0aGVuIHVwZGF0ZSBjb250ZW50IHR5cGUgbGlzdFxyXG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZVxyXG4gICAgICAgICAgLmZpbHRlcihDb250ZW50VHlwZVNlY3Rpb25UYWJzLk1PU1RfUE9QVUxBUi5maWx0ZXJQcm9wZXJ0eSlcclxuICAgICAgICAgIC50aGVuKGN0cyA9PiB7dGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGN0cyl9KTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhcnMgdGhlIGlucHV0IGZpZWxkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBjbGVhcklucHV0RmllbGQoe2lkfSkge1xyXG4gICAgaWYgKGlkICE9PSBDb250ZW50VHlwZVNlY3Rpb25UYWJzLkFMTC5pZCkge1xyXG4gICAgICB0aGlzLnZpZXcuY2xlYXJJbnB1dEZpZWxkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93cyBkZXRhaWwgdmlld1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICovXHJcbiAgc2hvd0RldGFpbFZpZXcoe2lkfSkge1xyXG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QuaGlkZSgpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5sb2FkQnlJZChpZCk7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLnNob3coKTtcclxuICAgIHRoaXMudHlwZUFoZWFkRW5hYmxlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlIGRldGFpbCB2aWV3XHJcbiAgICovXHJcbiAgY2xvc2VEZXRhaWxWaWV3KCkge1xyXG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5oaWRlKCk7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5zaG93KCk7XHJcbiAgICB0aGlzLnR5cGVBaGVhZEVuYWJsZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsImltcG9ydCAnLi91dGlscy9mZXRjaCc7XHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBDb250ZW50VHlwZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFjaGluZU5hbWVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ham9yVmVyc2lvblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWlub3JWZXJzaW9uXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwYXRjaFZlcnNpb25cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1ham9yVmVyc2lvblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWlub3JWZXJzaW9uXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzdW1tYXJ5XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkZXNjcmlwdGlvblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWNvblxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3JlYXRlZEF0XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVkX0F0XHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpc1JlY29tbWVuZGVkXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwb3B1bGFyaXR5XHJcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHNjcmVlbnNob3RzXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsaWNlbnNlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBleGFtcGxlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0dXRvcmlhbFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBrZXl3b3Jkc1xyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gb3duZXJcclxuICogQHByb3BlcnR5IHtib29sZWFufSBpbnN0YWxsZWRcclxuICogQHByb3BlcnR5IHtib29sZWFufSByZXN0cmljdGVkXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFwaVJvb3RVcmxcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih7IGFwaVJvb3RVcmwgfSkge1xyXG4gICAgdGhpcy5hcGlSb290VXJsID0gYXBpUm9vdFVybDtcclxuICAgIHRoaXMuc2V0dXAoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZldGNoIHRoZSBjb250ZW50IHR5cGUgbWV0YWRhdGFcclxuICAgKi9cclxuICBzZXR1cCgpIHtcclxuICAgIHRoaXMuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnQtdHlwZS1jYWNoZWAsIHtcclxuICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xyXG4gICAgfSlcclxuICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxyXG4gICAgLnRoZW4odGhpcy5pc1ZhbGlkKVxyXG4gICAgLnRoZW4oanNvbiA9PiBqc29uLmxpYnJhcmllcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSAge0NvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlfSByZXNwb25zZVxyXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2U+fVxyXG4gICAqL1xyXG4gIGlzVmFsaWQocmVzcG9uc2UpIHtcclxuICAgIGlmIChyZXNwb25zZS5tZXNzYWdlQ29kZSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgY29udGVudCB0eXBlc1xyXG4gICAqXHJcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT59XHJcbiAgICovXHJcbiAgY29udGVudFR5cGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2FjaGVkQ29udGVudFR5cGVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XHJcbiAgICovXHJcbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLmNhY2hlZENvbnRlbnRUeXBlcy50aGVuKGNvbnRlbnRUeXBlcyA9PiB7XHJcbiAgICAgIHJldHVybiBjb250ZW50VHlwZXMuZmlsdGVyKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lID09PSBtYWNoaW5lTmFtZSlbMF07XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKnJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9Y29udGVudF90eXBlX2NhY2hlLyR7aWR9YCwge1xyXG4gICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXHJcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTsqL1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5zdGFsbHMgYSBjb250ZW50IHR5cGUgb24gdGhlIHNlcnZlclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XHJcbiAgICovXHJcbiAgaW5zdGFsbENvbnRlbnRUeXBlKGlkKSB7XHJcbiAgICByZXR1cm4gZmV0Y2gobnMuZ2V0QWpheFVybCgnbGlicmFyeS1pbnN0YWxsJywge2lkOiBpZH0pLCB7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxyXG4gICAgICBib2R5OiAnJ1xyXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gZm9yIHRlc3Rpbmcgd2l0aCBlcnJvclxyXG4gIC8qaW5zdGFsbENvbnRlbnRUeXBlKGlkKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktaW5zdGFsbGAsIHtcclxuICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xyXG4gICAgfSlcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9Ki9cclxuXHJcbiAgLyoqXHJcbiAgICogVXBsb2FkcyBhIGNvbnRlbnQgdHlwZSB0byB0aGUgc2VydmVyIGZvciB2YWxpZGF0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0Zvcm1EYXRhfSBmb3JtRGF0YSBGb3JtIGNvbnRhaW5pbmcgdGhlIGg1cCB0aGF0IHNob3VsZCBiZSB1cGxvYWRlZCBhcyAnaDVwJ1xyXG4gICAqXHJcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGpzb24gY29udGFpbmluZyB0aGUgY29udGVudCBqc29uIGFuZCB0aGUgaDVwIGpzb25cclxuICAgKi9cclxuICB1cGxvYWRDb250ZW50KGZvcm1EYXRhKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktdXBsb2FkYCwge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcclxuICAgICAgYm9keTogZm9ybURhdGFcclxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItc2VydmljZXMuanMiLCJpbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCJcclxuaW1wb3J0IGluaXRUYWJQYW5lbCBmcm9tIFwiY29tcG9uZW50cy90YWItcGFuZWxcIlxyXG5pbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XHJcbmltcG9ydCB7IGF0dHJpYnV0ZUVxdWFscywgZ2V0QXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XHJcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi91dGlscy9ldmVudHMnO1xyXG4vKipcclxuICogVGFiIGNoYW5nZSBldmVudFxyXG4gKiBAZXZlbnQgSHViVmlldyN0YWItY2hhbmdlXHJcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XHJcbiAqL1xyXG4vKipcclxuICogUGFuZWwgb3BlbiBvciBjbG9zZSBldmVudFxyXG4gKiBAZXZlbnQgSHViVmlldyNwYW5lbC1jaGFuZ2VcclxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cclxuICovXHJcbi8qKlxyXG4gKiBAY29uc3RhbnQge3N0cmluZ31cclxuICovXHJcbmNvbnN0IEFUVFJJQlVURV9EQVRBX0lEID0gJ2RhdGEtaWQnO1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuY29uc3QgaXNPcGVuID0gaGFzQXR0cmlidXRlKCdvcGVuJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKiBAZmlyZXMgSHViVmlldyN0YWItY2hhbmdlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJWaWV3IHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyVGFiUGFuZWwoc3RhdGUpO1xyXG4gICAgdGhpcy5yZW5kZXJQYW5lbChzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZXMgdGhlIHBhbmVsXHJcbiAgICovXHJcbiAgY2xvc2VQYW5lbCgpIHtcclxuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHRpdGxlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcclxuICAgKi9cclxuICBzZXRUaXRsZSh0aXRsZSkge1xyXG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHBhbmVsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbklkXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBleHBhbmRlZFxyXG4gICAqL1xyXG4gIHJlbmRlclBhbmVsKHt0aXRsZSA9ICcnLCBzZWN0aW9uSWQgPSAnY29udGVudC10eXBlcycsIGV4cGFuZGVkID0gZmFsc2V9KSB7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy50aXRsZS5jbGFzc05hbWUgKz0gXCJwYW5lbC1oZWFkZXIgaWNvbi1odWItaWNvblwiO1xyXG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAoISFleHBhbmRlZCkudG9TdHJpbmcoKSk7XHJcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWApO1xyXG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdwYW5lbC1jaGFuZ2UnLCB0aGlzLCB0aGlzLnRpdGxlKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmJvZHkuY2xhc3NOYW1lICs9IFwicGFuZWwtYm9keVwiO1xyXG4gICAgdGhpcy5ib2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIWV4cGFuZGVkKS50b1N0cmluZygpKTtcclxuICAgIHRoaXMuYm9keS5pZCA9IGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWA7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgKz0gYHBhbmVsIGg1cC1zZWN0aW9uLSR7c2VjdGlvbklkfWA7XHJcbiAgICBpZihleHBhbmRlZCl7XHJcbiAgICAgIHRoaXMucGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcclxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5ib2R5KTtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSArPSBgaDVwIGg1cC1odWIgaDVwLXNka2A7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xyXG4gICAgaW5pdFBhbmVsKHRoaXMucm9vdEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGlmIHBhbmVsIGlzIG9wZW4sIHRoaXMgaXMgdXNlZCBmb3Igb3V0ZXIgYm9yZGVyIGNvbG9yXHJcbiAgICovXHJcbiAgdG9nZ2xlUGFuZWxPcGVuKCkge1xyXG4gICAgbGV0IHBhbmVsID0gdGhpcy5wYW5lbDtcclxuICAgIGlmKGlzT3BlbihwYW5lbCkpIHtcclxuICAgICAgcGFuZWwucmVtb3ZlQXR0cmlidXRlKCdvcGVuJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cGFuZWwucXVlcnlTZWxlY3RvcignI2h1Yi1zZWFyY2gtYmFyJykuZm9jdXMoKX0sMjApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgdGFiIHBhbmVsXHJcbiAgICovXHJcbiAgcmVuZGVyVGFiUGFuZWwoc3RhdGUpIHtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRhYmxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgdGhpcy50YWJsaXN0LmNsYXNzTmFtZSArPSBcInRhYmxpc3RcIjtcclxuICAgIHRoaXMudGFibGlzdC5zZXRBdHRyaWJ1dGUgKCdyb2xlJywgJ3RhYmxpc3QnKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgdGhpcy50YWJMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xyXG4gICAgdGhpcy50YWJMaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxpc3QpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5jbGFzc05hbWUgKz0gJ3RhYi1wYW5lbCc7XHJcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50YWJMaXN0V3JhcHBlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGEgdGFiXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50XHJcbiAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIGFkZFRhYih7dGl0bGUsIGlkLCBjb250ZW50LCBzZWxlY3RlZCA9IGZhbHNlfSkge1xyXG4gICAgY29uc3QgdGFiSWQgPSBgdGFiLSR7aWR9YDtcclxuICAgIGNvbnN0IHRhYlBhbmVsSWQgPSBgdGFiLXBhbmVsLSR7aWR9YDtcclxuXHJcbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgdGFiLmNsYXNzTmFtZSArPSAndGFiJztcclxuICAgIHRhYi5pZCA9IHRhYklkO1xyXG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRhYlBhbmVsSWQpO1xyXG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHNlbGVjdGVkLnRvU3RyaW5nKCkpO1xyXG4gICAgdGFiLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfREFUQV9JRCwgaWQpO1xyXG4gICAgdGFiLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWInKTtcclxuICAgIHRhYi5pbm5lckhUTUwgPSB0aXRsZTtcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCd0YWItY2hhbmdlJywgdGhpcywgdGFiKTtcclxuXHJcbiAgICBjb25zdCB0YWJQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGFiUGFuZWwuaWQgPSB0YWJQYW5lbElkO1xyXG4gICAgdGFiUGFuZWwuY2xhc3NOYW1lICs9ICd0YWJwYW5lbCc7XHJcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFibGxlZGJ5JywgdGFiSWQpO1xyXG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghc2VsZWN0ZWQpLnRvU3RyaW5nKCkpO1xyXG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYnBhbmVsJyk7XHJcbiAgICB0YWJQYW5lbC5hcHBlbmRDaGlsZChjb250ZW50KTtcclxuXHJcbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQodGFiKTtcclxuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0YWJQYW5lbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGFuIGFuaW1hdGVkIGJvcmRlciB0byB0aGUgYm90dG9tIG9mIHRoZSB0YWJcclxuICAgKi9cclxuICBhZGRCb3R0b21Cb3JkZXIoKSB7XHJcbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcclxuICB9XHJcblxyXG4gIGluaXRUYWJQYW5lbCgpIHtcclxuICAgIGluaXRUYWJQYW5lbCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgc2VjdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICovXHJcbiAgc2V0U2VjdGlvblR5cGUoe2lkfSkge1xyXG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgPSBgaDVwLXNlY3Rpb24tJHtpZH0gcGFuZWxgO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJpbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5pbXBvcnQge3JlbGF5Q2xpY2tFdmVudEFzfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcclxuICogQG1peGVzIEV2ZW50ZnVsXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlVmlldyB7XHJcbiAgLyoqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLnR5cGVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUudGl0bGVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUuY29udGVudFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RhdGUuYWN0aW9uXVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RhdGUuZGlzbWlzc2FibGVdXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRzXHJcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50KHN0YXRlKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUVsZW1lbnQobWVzc2FnZSkge1xyXG4gICAgLy8gQ3JlYXRlIHdyYXBwZXI6XHJcbiAgICBjb25zdCBtZXNzYWdlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbWVzc2FnZVdyYXBwZXIuY2xhc3NOYW1lID0gYG1lc3NhZ2UgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XHJcblxyXG4gICAgLy8gQWRkIGNsb3NlIGJ1dHRvbiBpZiBkaXNtaXNhYmxlXHJcbiAgICBpZiAobWVzc2FnZS5kaXNtaXNzaWJsZSkge1xyXG4gICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSAnY2xvc2UnO1xyXG4gICAgICAvL2Nsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmI3gyNzE1JztcclxuICAgICAgLy8gVE9ET1xyXG4gICAgICAvLyAtIEFkZCBjbG9zZSBsYWJlbCBmcm9tIHRyYW5zbGF0aW9uc1xyXG4gICAgICAvLyAtIEFkZCB2aXN1YWxzIGluIENTUyAoZm9udCBpY29uKVxyXG4gICAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XHJcbiAgICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIGNsb3NlQnV0dG9uKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtZXNzYWdlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbWVzc2FnZUNvbnRlbnQuY2xhc3NOYW1lID0gJ21lc3NhZ2UtY29udGVudCc7XHJcbiAgICBtZXNzYWdlQ29udGVudC5pbm5lckhUTUwgPSAnPGgxPicgKyBtZXNzYWdlLnRpdGxlICsgJzwvaDE+JyArICc8cD4nICsgbWVzc2FnZS5jb250ZW50ICsgJzwvcD4nO1xyXG4gICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUNvbnRlbnQpO1xyXG5cclxuICAgIGlmIChtZXNzYWdlLmFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgbWVzc2FnZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcclxuICAgICAgbWVzc2FnZUJ1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlLmFjdGlvbjtcclxuICAgICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUJ1dHRvbik7XHJcblxyXG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnYWN0aW9uLWNsaWNrZWQnLCB0aGlzLCBtZXNzYWdlQnV0dG9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVzc2FnZVdyYXBwZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgb2YgdGhlIGNvbnRlbnQgYnJvd3NlclxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9tZXNzYWdlLXZpZXcvbWVzc2FnZS12aWV3LmpzIiwiaW1wb3J0IHtjdXJyeX0gZnJvbSAndXRpbHMvZnVuY3Rpb25hbCdcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3NcclxuICogVGhlIFNlYXJjaCBTZXJ2aWNlIGdldHMgYSBjb250ZW50IHR5cGUgZnJvbSBodWItc2VydmljZXMuanNcclxuICogaW4gdGhlIGZvcm0gb2YgYSBwcm9taXNlLiBJdCB0aGVuIGdlbmVyYXRlcyBhIHNjb3JlIGJhc2VkXHJcbiAqIG9uIHRoZSBkaWZmZXJlbnQgd2VpZ2h0aW5ncyBvZiB0aGUgY29udGVudCB0eXBlIGZpZWxkcyBhbmRcclxuICogc29ydHMgdGhlIHJlc3VsdHMgYmFzZWQgb24gdGhlIGdlbmVyYXRlZCBzY29yZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS5hcGlSb290VXJsXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc2VydmljZXMpIHtcclxuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm1zIGEgc2VhcmNoXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnlcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXT59IEEgcHJvbWlzZSBvZiBhbiBhcnJheSBvZiBjb250ZW50IHR5cGVzXHJcbiAgICovXHJcbiAgc2VhcmNoKHF1ZXJ5KSB7XHJcbiAgICAvLyBBZGQgY29udGVudCB0eXBlcyB0byB0aGUgc2VhcmNoIGluZGV4XHJcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZXMoKS50aGVuKGZpbHRlckJ5UXVlcnkocXVlcnkpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciBhbGwgY29udGVudCB0eXBlcyBieSBnaXZlbiBwcm9wZXJ0eVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHByb3BlcnR5XHJcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT58Kn1cclxuICAgKi9cclxuICBmaWx0ZXIocHJvcGVydHkpIHtcclxuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlcygpXHJcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiBjb250ZW50VHlwZXMuc29ydCgoY3QxLCBjdDIpID0+IHtcclxuXHJcbiAgICAgICAgLy8gUHJvcGVydHkgZG9lcyBub3QgZXhpc3QsIG1vdmUgdG8gYm90dG9tXHJcbiAgICAgICAgaWYgKCFjdDEuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcbiAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghY3QyLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG4gICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU29ydCBvbiBwcm9wZXJ0eVxyXG4gICAgICAgIGlmIChjdDFbcHJvcGVydHldID4gY3QyW3Byb3BlcnR5XSkge1xyXG4gICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGN0MVtwcm9wZXJ0eV0gPCBjdDJbcHJvcGVydHldKSB7XHJcbiAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRmlsdGVycyBhIGxpc3Qgb2YgY29udGVudCB0eXBlcyBiYXNlZCBvbiBhIHF1ZXJ5XHJcbiAqIEB0eXBlIHtGdW5jdGlvbn1cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XHJcbiAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXHJcbiAqL1xyXG5jb25zdCBmaWx0ZXJCeVF1ZXJ5ID0gY3VycnkoZnVuY3Rpb24ocXVlcnksIGNvbnRlbnRUeXBlcykge1xyXG4gIGlmIChxdWVyeSA9PSAnJykge1xyXG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlcztcclxuICB9XHJcblxyXG4gIC8vIEFwcGVuZCBhIHNlYXJjaCBzY29yZSB0byBlYWNoIGNvbnRlbnQgdHlwZVxyXG4gIHJldHVybiBjb250ZW50VHlwZXMubWFwKGNvbnRlbnRUeXBlID0+XHJcbiAgICAoe1xyXG4gICAgICBjb250ZW50VHlwZTogY29udGVudFR5cGUsXHJcbiAgICAgIHNjb3JlOiBnZXRTZWFyY2hTY29yZShxdWVyeSwgY29udGVudFR5cGUpXHJcbiAgICB9KSlcclxuICAgIC5maWx0ZXIocmVzdWx0ID0+IHJlc3VsdC5zY29yZSA+IDApXHJcbiAgICAuc29ydChzb3J0U2VhcmNoUmVzdWx0cykgLy8gU29ydCBieSBpbnN0YWxsZWQsIHJlbGV2YW5jZSBhbmQgcG9wdWxhcml0eVxyXG4gICAgLm1hcChyZXN1bHQgPT4gcmVzdWx0LmNvbnRlbnRUeXBlKTsgLy8gVW53cmFwIHJlc3VsdCBvYmplY3Q7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIENhbGxiYWNrIGZvciBBcnJheS5zb3J0KClcclxuICogQ29tcGFyZXMgdHdvIGNvbnRlbnQgdHlwZXMgb24gZGlmZmVyZW50IGNyaXRlcmlhXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIEZpcnN0IGNvbnRlbnQgdHlwZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gYiBTZWNvbmQgY29udGVudCB0eXBlXHJcbiAqIEByZXR1cm4ge2ludH1cclxuICovXHJcbmNvbnN0IHNvcnRTZWFyY2hSZXN1bHRzID0gKGEsYikgPT4ge1xyXG4gIGlmICghYS5jb250ZW50VHlwZS5pbnN0YWxsZWQgJiYgYi5jb250ZW50VHlwZS5pbnN0YWxsZWQpIHtcclxuICAgIHJldHVybiAxO1xyXG4gIH1cclxuXHJcbiAgaWYgKGEuY29udGVudFR5cGUuaW5zdGFsbGVkICYmICFiLmNvbnRlbnRUeXBlLmluc3RhbGxlZCkge1xyXG4gICAgcmV0dXJuIC0xO1xyXG4gIH1cclxuXHJcbiAgZWxzZSBpZiAoYi5zY29yZSAhPT0gYS5zY29yZSkge1xyXG4gICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlO1xyXG4gIH1cclxuXHJcbiAgZWxzZSB7XHJcbiAgICByZXR1cm4gYi5jb250ZW50VHlwZS5wb3B1bGFyaXR5IC0gYS5jb250ZW50VHlwZS5wb3B1bGFyaXR5O1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHdlaWdodGluZyBmb3IgZGlmZmVyZW50IHNlYXJjaCB0ZXJtcyBiYXNlZFxyXG4gKiBvbiBleGlzdGVuY2Ugb2Ygc3Vic3RyaW5nc1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHF1ZXJ5XHJcbiAqIEBwYXJhbSAge09iamVjdH0gY29udGVudFR5cGVcclxuICogQHJldHVybiB7aW50fVxyXG4gKi9cclxuIGNvbnN0IGdldFNlYXJjaFNjb3JlID0gZnVuY3Rpb24ocXVlcnksIGNvbnRlbnRUeXBlKSB7XHJcbiAgIGxldCBxdWVyaWVzID0gcXVlcnkuc3BsaXQoJyAnKS5maWx0ZXIocXVlcnkgPT4gcXVlcnkgIT09ICcnKTtcclxuICAgbGV0IHF1ZXJ5U2NvcmVzID0gcXVlcmllcy5tYXAocXVlcnkgPT4gZ2V0U2NvcmVGb3JFYWNoUXVlcnkocXVlcnksIGNvbnRlbnRUeXBlKSk7XHJcbiAgIGlmIChxdWVyeVNjb3Jlcy5pbmRleE9mKDApID4gLTEpIHtcclxuICAgICByZXR1cm4gMDtcclxuICAgfVxyXG4gICByZXR1cm4gcXVlcnlTY29yZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XHJcbiB9O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSByZWxldmFuY2Ugc2NvcmUgZm9yIGEgc2luZ2xlIHN0cmluZ1xyXG4gKlxyXG4gKiBAcGFyYW0gIHt0eXBlfSBxdWVyeSAgICAgICBkZXNjcmlwdGlvblxyXG4gKiBAcGFyYW0gIHt0eXBlfSBjb250ZW50VHlwZSBkZXNjcmlwdGlvblxyXG4gKiBAcmV0dXJuIHt0eXBlfSAgICAgICAgICAgICBkZXNjcmlwdGlvblxyXG4gKi9cclxuY29uc3QgZ2V0U2NvcmVGb3JFYWNoUXVlcnkgPSBmdW5jdGlvbiAocXVlcnksIGNvbnRlbnRUeXBlKSB7XHJcbiAgIHF1ZXJ5ID0gcXVlcnkudHJpbSgpO1xyXG4gICBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS50aXRsZSkpIHtcclxuICAgICByZXR1cm4gMTAwO1xyXG4gICB9XHJcbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuc3VtbWFyeSkpIHtcclxuICAgICByZXR1cm4gNTtcclxuICAgfVxyXG4gICBlbHNlIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uKSkge1xyXG4gICAgIHJldHVybiA1O1xyXG4gICB9XHJcbiAgIGVsc2UgaWYgKGFycmF5SGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5rZXl3b3JkcykpIHtcclxuICAgICByZXR1cm4gNTtcclxuICAgfVxyXG4gICBlbHNlIHtcclxuICAgICByZXR1cm4gMDtcclxuICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIG5lZWRsZSBpcyBmb3VuZCBpbiB0aGUgaGF5c3RhY2suXHJcbiAqIE5vdCBjYXNlIHNlbnNpdGl2ZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmVlZGxlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXlzdGFja1xyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuY29uc3QgaGFzU3ViU3RyaW5nID0gZnVuY3Rpb24obmVlZGxlLCBoYXlzdGFjaykge1xyXG4gIGlmIChoYXlzdGFjayA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaGF5c3RhY2sudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5lZWRsZS50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XHJcbn07XHJcblxyXG4vKipcclxuICogSGVscGVyIGZ1bmN0aW9uLCBjaGVja3MgaWYgYXJyYXkgaGFzIGNvbnRhaW5zIGEgc3Vic3RyaW5nXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gc3ViU3RyaW5nXHJcbiAqIEBwYXJhbSAge0FycmF5fSBhcnJcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmNvbnN0IGFycmF5SGFzU3ViU3RyaW5nID0gZnVuY3Rpb24oc3ViU3RyaW5nLCBhcnIpIHtcclxuICBpZiAoYXJyID09PSB1bmRlZmluZWQgfHwgc3ViU3RyaW5nID09PSAnJykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGFyci5zb21lKHN0cmluZyA9PiBoYXNTdWJTdHJpbmcoc3ViU3RyaW5nLCBzdHJpbmcpKTtcclxufTtcclxuXHJcbmNvbnN0IEFkZE51bWJlcj1mdW5jdGlvbihhLGIpXHJcbntcclxuICByZXR1cm4gYStiO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwiaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICpcclxuICogQGZpcmVzIEh1YiN1cGxvYWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xyXG5cclxuICBjb25zdHJ1Y3RvcihzdGF0ZSwgc2VydmljZXMpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcclxuXHJcbiAgICAvLyBzZXJ2aWNlc1xyXG4gICAgdGhpcy5zZXJ2aWNlcyA9IHNlcnZpY2VzO1xyXG5cclxuICAgIC8vIElucHV0IGVsZW1lbnQgZm9yIHRoZSBINVAgZmlsZVxyXG4gICAgY29uc3QgaDVwVXBsb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGg1cFVwbG9hZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZmlsZScpO1xyXG5cclxuICAgIC8vIFNlbmRzIHRoZSBINVAgZmlsZSB0byB0aGUgcGx1Z2luXHJcbiAgICBjb25zdCB1c2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHVzZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdVc2UnO1xyXG4gICAgdXNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuICAgICAgLy8gQWRkIHRoZSBINVAgZmlsZSB0byBhIGZvcm0sIHJlYWR5IGZvciB0cmFuc3BvcnRhdGlvblxyXG4gICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgIGRhdGEuYXBwZW5kKCdoNXAnLCBoNXBVcGxvYWQuZmlsZXNbMF0pO1xyXG5cclxuICAgICAgLy8gVXBsb2FkIGNvbnRlbnQgdG8gdGhlIHBsdWdpblxyXG4gICAgICB0aGlzLnNlcnZpY2VzLnVwbG9hZENvbnRlbnQoZGF0YSlcclxuICAgICAgICAudGhlbihqc29uID0+IHtcclxuICAgICAgICAgIC8vIEZpcmUgdGhlIHJlY2VpdmVkIGRhdGEgdG8gYW55IGxpc3RlbmVyc1xyXG4gICAgICAgICAgc2VsZi5maXJlKCd1cGxvYWQnLCBqc29uKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaDVwVXBsb2FkKTtcclxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodXNlQnV0dG9uKTtcclxuXHJcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCIoZnVuY3Rpb24oc2VsZikge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgaWYgKHNlbGYuZmV0Y2gpIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgdmFyIHN1cHBvcnQgPSB7XHJcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXHJcbiAgICBpdGVyYWJsZTogJ1N5bWJvbCcgaW4gc2VsZiAmJiAnaXRlcmF0b3InIGluIFN5bWJvbCxcclxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBuZXcgQmxvYigpXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH0pKCksXHJcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmLFxyXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxyXG4gIH1cclxuXHJcbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcclxuICAgIHZhciB2aWV3Q2xhc3NlcyA9IFtcclxuICAgICAgJ1tvYmplY3QgSW50OEFycmF5XScsXHJcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcclxuICAgICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcclxuICAgICAgJ1tvYmplY3QgSW50MTZBcnJheV0nLFxyXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxyXG4gICAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXHJcbiAgICAgICdbb2JqZWN0IFVpbnQzMkFycmF5XScsXHJcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxyXG4gICAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xyXG4gICAgXVxyXG5cclxuICAgIHZhciBpc0RhdGFWaWV3ID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBpc0FycmF5QnVmZmVyVmlldyA9IEFycmF5QnVmZmVyLmlzVmlldyB8fCBmdW5jdGlvbihvYmopIHtcclxuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxyXG4gICAgfVxyXG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXFxeX2B8fl0vaS50ZXN0KG5hbWUpKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcclxuICAgIH1cclxuICAgIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZVxyXG4gIH1cclxuXHJcbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcclxuICBmdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xyXG4gICAgdmFyIGl0ZXJhdG9yID0ge1xyXG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpXHJcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xyXG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaXRlcmF0b3JcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xyXG4gICAgdGhpcy5tYXAgPSB7fVxyXG5cclxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xyXG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcclxuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSlcclxuICAgICAgfSwgdGhpcylcclxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xyXG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24oaGVhZGVyKSB7XHJcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXHJcbiAgICAgIH0sIHRoaXMpXHJcbiAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcclxuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcclxuICAgICAgfSwgdGhpcylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxyXG4gICAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcclxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXHJcbiAgICB0aGlzLm1hcFtuYW1lXSA9IG9sZFZhbHVlID8gb2xkVmFsdWUrJywnK3ZhbHVlIDogdmFsdWVcclxuICB9XHJcblxyXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxyXG4gIH1cclxuXHJcbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcclxuICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbFxyXG4gIH1cclxuXHJcbiAgSGVhZGVycy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXHJcbiAgfVxyXG5cclxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xyXG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcclxuICB9XHJcblxyXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xyXG4gICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLm1hcCkge1xyXG4gICAgICBpZiAodGhpcy5tYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBIZWFkZXJzLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaXRlbXMgPSBbXVxyXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2gobmFtZSkgfSlcclxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcclxuICB9XHJcblxyXG4gIEhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGl0ZW1zID0gW11cclxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkgeyBpdGVtcy5wdXNoKHZhbHVlKSB9KVxyXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxyXG4gIH1cclxuXHJcbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGl0ZW1zID0gW11cclxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pIH0pXHJcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXHJcbiAgfVxyXG5cclxuICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xyXG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcclxuICAgIGlmIChib2R5LmJvZHlVc2VkKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcclxuICAgIH1cclxuICAgIGJvZHkuYm9keVVzZWQgPSB0cnVlXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpXHJcbiAgICAgIH1cclxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcclxuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXHJcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXHJcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcclxuICAgIHJldHVybiBwcm9taXNlXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XHJcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxyXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxyXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcclxuICAgIHJldHVybiBwcm9taXNlXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZWFkQXJyYXlCdWZmZXJBc1RleHQoYnVmKSB7XHJcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcclxuICAgIHZhciBjaGFycyA9IG5ldyBBcnJheSh2aWV3Lmxlbmd0aClcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY2hhcnNbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXdbaV0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xyXG4gICAgaWYgKGJ1Zi5zbGljZSkge1xyXG4gICAgICByZXR1cm4gYnVmLnNsaWNlKDApXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKVxyXG4gICAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWYpKVxyXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XHJcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2VcclxuXHJcbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcclxuICAgICAgdGhpcy5fYm9keUluaXQgPSBib2R5XHJcbiAgICAgIGlmICghYm9keSkge1xyXG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gJydcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcclxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xyXG4gICAgICAgIHRoaXMuX2JvZHlCbG9iID0gYm9keVxyXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcclxuICAgICAgICB0aGlzLl9ib2R5Rm9ybURhdGEgPSBib2R5XHJcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XHJcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcclxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XHJcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keS5idWZmZXIpXHJcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cclxuICAgICAgICB0aGlzLl9ib2R5SW5pdCA9IG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKVxyXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xyXG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBCb2R5SW5pdCB0eXBlJylcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xyXG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcclxuICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xyXG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XHJcbiAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXHJcbiAgICAgICAgaWYgKHJlamVjdGVkKSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSkpXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyBibG9iJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxyXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcclxuICAgICAgICByZXR1cm4gcmVqZWN0ZWRcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVhZEFycmF5QnVmZmVyQXNUZXh0KHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikpXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xyXG4gICAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8vIEhUVFAgbWV0aG9kcyB3aG9zZSBjYXBpdGFsaXphdGlvbiBzaG91bGQgYmUgbm9ybWFsaXplZFxyXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXHJcblxyXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcclxuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcclxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XHJcblxyXG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xyXG4gICAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMudXJsID0gaW5wdXQudXJsXHJcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xyXG4gICAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xyXG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2RcclxuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZVxyXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcclxuICAgICAgICBib2R5ID0gaW5wdXQuX2JvZHlJbml0XHJcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudXJsID0gU3RyaW5nKGlucHV0KVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ29taXQnXHJcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcclxuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxyXG4gICAgfVxyXG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXHJcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcclxuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsXHJcblxyXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb2R5IG5vdCBhbGxvd2VkIGZvciBHRVQgb3IgSEVBRCByZXF1ZXN0cycpXHJcbiAgICB9XHJcbiAgICB0aGlzLl9pbml0Qm9keShib2R5KVxyXG4gIH1cclxuXHJcbiAgUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7IGJvZHk6IHRoaXMuX2JvZHlJbml0IH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWNvZGUoYm9keSkge1xyXG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxyXG4gICAgYm9keS50cmltKCkuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XHJcbiAgICAgIGlmIChieXRlcykge1xyXG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcclxuICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJylcclxuICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJylcclxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gZm9ybVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcclxuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxyXG4gICAgLy8gUmVwbGFjZSBpbnN0YW5jZXMgb2YgXFxyXFxuIGFuZCBcXG4gZm9sbG93ZWQgYnkgYXQgbGVhc3Qgb25lIHNwYWNlIG9yIGhvcml6b250YWwgdGFiIHdpdGggYSBzcGFjZVxyXG4gICAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcclxuICAgIHZhciBwcmVQcm9jZXNzZWRIZWFkZXJzID0gcmF3SGVhZGVycy5yZXBsYWNlKC9cXHI/XFxuW1xcdCBdKy8sICcgJylcclxuICAgIHByZVByb2Nlc3NlZEhlYWRlcnMuc3BsaXQoL1xccj9cXG4vKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXHJcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKVxyXG4gICAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gaGVhZGVyc1xyXG4gIH1cclxuXHJcbiAgQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxyXG5cclxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xyXG4gICAgaWYgKCFvcHRpb25zKSB7XHJcbiAgICAgIG9wdGlvbnMgPSB7fVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHlwZSA9ICdkZWZhdWx0J1xyXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcclxuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcclxuICAgIHRoaXMuc3RhdHVzVGV4dCA9ICdzdGF0dXNUZXh0JyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXNUZXh0IDogJ09LJ1xyXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxyXG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xyXG4gICAgdGhpcy5faW5pdEJvZHkoYm9keUluaXQpXHJcbiAgfVxyXG5cclxuICBCb2R5LmNhbGwoUmVzcG9uc2UucHJvdG90eXBlKVxyXG5cclxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcclxuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcclxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxyXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxyXG4gICAgICB1cmw6IHRoaXMudXJsXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciByZXNwb25zZSA9IG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiAwLCBzdGF0dXNUZXh0OiAnJ30pXHJcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgfVxyXG5cclxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cclxuXHJcbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xyXG4gICAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xyXG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCBzdGF0dXMgY29kZScpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXHJcbiAgfVxyXG5cclxuICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzXHJcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxyXG4gIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZVxyXG5cclxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgUmVxdWVzdChpbnB1dCwgaW5pdClcclxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXHJcblxyXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXHJcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcclxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9wdGlvbnMudXJsID0gJ3Jlc3BvbnNlVVJMJyBpbiB4aHIgPyB4aHIucmVzcG9uc2VVUkwgOiBvcHRpb25zLmhlYWRlcnMuZ2V0KCdYLVJlcXVlc3QtVVJMJylcclxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxyXG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXHJcblxyXG4gICAgICBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnKSB7XHJcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcclxuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KVxyXG4gICAgfSlcclxuICB9XHJcbiAgc2VsZi5mZXRjaC5wb2x5ZmlsbCA9IHRydWVcclxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9mZXRjaC5qcyIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUsIGNsYXNzTGlzdENvbnRhaW5zLCBxdWVyeVNlbGVjdG9yLCBub2RlTGlzdFRvQXJyYXkgfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XHJcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xyXG5cclxuLyoqXHJcbiAqIEBjb25zdGFudFxyXG4gKi9cclxuY29uc3QgQVRUUklCVVRFX1NJWkUgPSAnZGF0YS1zaXplJztcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBkaXNhYmxlID0gc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBlbmFibGUgPSByZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWRcclxuICovXHJcbmNvbnN0IHRvZ2dsZUVuYWJsZWQgPSAoZWxlbWVudCwgZW5hYmxlZCkgPT4gKGVuYWJsZWQgPyBlbmFibGUgOiBkaXNhYmxlKShlbGVtZW50KTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlkZGVuXHJcbiAqL1xyXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gY3VycnkoKGhpZGRlbiwgZWxlbWVudCkgPT4gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGhpZGRlbi50b1N0cmluZygpLCBlbGVtZW50KSk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3QgaXNEaXNhYmxlZCA9IGhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgdGhlIHZpZXdcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0ge0ltYWdlU2Nyb2xsZXJTdGF0ZX0gc3RhdGVcclxuICovXHJcbmNvbnN0IHVwZGF0ZVZpZXcgPSAoZWxlbWVudCwgc3RhdGUpID0+IHtcclxuICBjb25zdCBwcmV2QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMnKTtcclxuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xyXG4gIGNvbnN0IGxpc3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XHJcbiAgY29uc3QgdG90YWxDb3VudCA9IGxpc3QuY2hpbGRFbGVtZW50Q291bnQ7XHJcblxyXG4gIC8vIHVwZGF0ZSBsaXN0IHNpemVzXHJcbiAgbGlzdC5zdHlsZS53aWR0aCA9IGAkezEwMCAvIHN0YXRlLmRpc3BsYXlDb3VudCAqIHRvdGFsQ291bnR9JWA7XHJcbiAgbGlzdC5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7c3RhdGUucG9zaXRpb24gKiAoMTAwIC8gc3RhdGUuZGlzcGxheUNvdW50KX0lYDtcclxuXHJcbiAgLy8gdXBkYXRlIGltYWdlIHNpemVzXHJcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXHJcbiAgICAuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHsxMDAgLyB0b3RhbENvdW50fSVgKTtcclxuXHJcbiAgLy8gdG9nZ2xlIGJ1dHRvbiB2aXNpYmlsaXR5XHJcbiAgW3ByZXZCdXR0b24sIG5leHRCdXR0b25dXHJcbiAgICAuZm9yRWFjaCh0b2dnbGVWaXNpYmlsaXR5KHN0YXRlLmRpc3BsYXlDb3VudCA+PSB0b3RhbENvdW50KSk7XHJcblxyXG4gIC8vIHRvZ2dsZSBidXR0b24gZW5hYmxlLCBkaXNhYmxlZFxyXG4gIHRvZ2dsZUVuYWJsZWQobmV4dEJ1dHRvbiwgc3RhdGUucG9zaXRpb24gPiAoc3RhdGUuZGlzcGxheUNvdW50IC0gdG90YWxDb3VudCkpO1xyXG4gIHRvZ2dsZUVuYWJsZWQocHJldkJ1dHRvbiwgc3RhdGUucG9zaXRpb24gPCAwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIGJ1dHRvbiBjbGlja2VkXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJ1dHRvblxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB1cGRhdGVTdGF0ZVxyXG4gKiBAcGFyYW0ge0V2ZW50fVxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrID0gY3VycnkoKGVsZW1lbnQsIHN0YXRlLCBidXR0b24sIHVwZGF0ZVN0YXRlLCBldmVudCkgPT4ge1xyXG4gIGlmKCFpc0Rpc2FibGVkKGJ1dHRvbikpe1xyXG4gICAgdXBkYXRlU3RhdGUoc3RhdGUpO1xyXG4gICAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplcyBhbiBpbWFnZVxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGltYWdlXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuY29uc3QgaW5pdEltYWdlID0gY3VycnkoKGVsZW1lbnQsIGltYWdlKSA9PiB7XHJcbiAgbGV0IHRhcmdldElkID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XHJcbiAgbGV0IHRhcmdldCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFyZ2V0SWR9YCk7XHJcblxyXG4gIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XHJcbiAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpKVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsYmFjayBmb3Igd2hlbiB0aGUgZG9tIGlzIHVwZGF0ZWRcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0ge0ltYWdlU2Nyb2xsZXJTdGF0ZX0gc3RhdGVcclxuICogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gcmVjb3JkXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuY29uc3QgaGFuZGxlRG9tVXBkYXRlID0gY3VycnkoKGVsZW1lbnQsIHN0YXRlLCByZWNvcmQpID0+IHtcclxuICAvLyBvbiBhZGQgaW1hZ2UgcnVuIGluaXRpYWxpemF0aW9uXHJcbiAgaWYocmVjb3JkLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XHJcbiAgICBub2RlTGlzdFRvQXJyYXkocmVjb3JkLmFkZGVkTm9kZXMpXHJcbiAgICAgIC5maWx0ZXIoY2xhc3NMaXN0Q29udGFpbnMoJ3NsaWRlJykpXHJcbiAgICAgIC5tYXAocXVlcnlTZWxlY3RvcignaW1nJykpXHJcbiAgICAgIC5mb3JFYWNoKGluaXRJbWFnZShlbGVtZW50KSk7XHJcbiAgfVxyXG5cclxuICAvLyB1cGRhdGUgdGhlIHZpZXdcclxuICB1cGRhdGVWaWV3KGVsZW1lbnQsIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcclxuICAgIGRpc3BsYXlDb3VudDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUklCVVRFX1NJWkUpIHx8IDUsXHJcbiAgICBwb3NpdGlvbjogMFxyXG4gIH0pKTtcclxufSk7XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XHJcbiAgLy8gZ2V0IGJ1dHRvbiBodG1sIGVsZW1lbnRzXHJcbiAgY29uc3QgbmV4dEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQnKTtcclxuICBjb25zdCBwcmV2QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMnKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHR5cGVkZWYge29iamVjdH0gSW1hZ2VTY3JvbGxlclN0YXRlXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGRpc3BsYXlDb3VudFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwb3NpdGlvblxyXG4gICAqL1xyXG4gIGNvbnN0IHN0YXRlID0ge1xyXG4gICAgZGlzcGxheUNvdW50OiBlbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfU0laRSkgfHwgNSxcclxuICAgIHBvc2l0aW9uOiAwXHJcbiAgfTtcclxuXHJcbiAgLy8gaW5pdGlhbGl6ZSBidXR0b25zXHJcbiAgbmV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrKGVsZW1lbnQsIHN0YXRlLCBuZXh0QnV0dG9uLCBzdGF0ZSA9PiBzdGF0ZS5wb3NpdGlvbi0tKSk7XHJcbiAgcHJldkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrKGVsZW1lbnQsIHN0YXRlLCBwcmV2QnV0dG9uLCBzdGF0ZSA9PiBzdGF0ZS5wb3NpdGlvbisrKSk7XHJcblxyXG4gIC8vIGluaXRpYWxpemUgaW1hZ2VzXHJcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbYXJpYS1jb250cm9sc10nKS5mb3JFYWNoKGluaXRJbWFnZShlbGVtZW50KSk7XHJcblxyXG4gIC8vIGxpc3RlbiBmb3IgdXBkYXRlcyB0byBkYXRhLXNpemVcclxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmb3JFYWNoKGhhbmRsZURvbVVwZGF0ZShlbGVtZW50LCBzdGF0ZSkpKTtcclxuXHJcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCB7XHJcbiAgICBzdWJ0cmVlOiB0cnVlLFxyXG4gICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxyXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbQVRUUklCVVRFX1NJWkVdXHJcbiAgfSk7XHJcblxyXG4gIC8vIGluaXRpYWxpemUgcG9zaXRpb25cclxuICB1cGRhdGVWaWV3KGVsZW1lbnQsIHN0YXRlKTtcclxuXHJcbiAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZSwgdG9nZ2xlQXR0cmlidXRlLCBoaWRlLCBzaG93LCB0b2dnbGVWaXNpYmlsaXR5fSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XHJcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xyXG5pbXBvcnQgeyBpbml0Q29sbGFwc2libGUgfSBmcm9tICcuLi91dGlscy9hcmlhJztcclxuXHJcbi8qKlxyXG4gKiBVbnNlbGVjdHMgYWxsIGVsZW1lbnRzIGluIGFuIGFycmF5XHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5jb25zdCB1blNlbGVjdEFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJykpO1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIGFyaWEtZXhwYW5kZWQgYXR0cmlidXRlIG9uIGFuIGVsZW1lbnQgdG8gZmFsc2VcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKi9cclxuY29uc3QgdW5FeHBhbmQgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XHJcbiAgLy8gZWxlbWVudHNcclxuICBjb25zdCBtZW51SXRlbXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKTtcclxuICBjb25zdCB0b2dnbGVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1jb250cm9sc11bYXJpYS1leHBhbmRlZF0nKTtcclxuXHJcbiAgLy8gbW92ZSBzZWxlY3RcclxuICBtZW51SXRlbXMuZm9yRWFjaChtZW51SXRlbSA9PiB7XHJcbiAgICBtZW51SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgdW5TZWxlY3RBbGwobWVudUl0ZW1zKTtcclxuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XHJcbiAgICAgIHVuRXhwYW5kKHRvZ2dsZXIpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIGluaXQgY29sbGFwc2UgYW5kIG9wZW5cclxuICBpbml0Q29sbGFwc2libGUoZWxlbWVudCk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL21lbnUuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xyXG5pbXBvcnQge2ZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKSk7XHJcblxyXG4vKipcclxuICogSW5pdGlhdGVzIGEgdGFiIHBhbmVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xyXG4gIGNvbnN0IHRhYnMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFiXCJdJyk7XHJcbiAgY29uc3QgdGFiUGFuZWxzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYnBhbmVsXCJdJyk7XHJcblxyXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xyXG4gICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICB1blNlbGVjdEFsbCh0YWJzKTtcclxuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XHJcblxyXG4gICAgICBoaWRlQWxsKHRhYlBhbmVscyk7XHJcblxyXG4gICAgICBsZXQgdGFiUGFuZWxJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcclxuICAgICAgc2hvdyhlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhYlBhbmVsSWR9YCkpO1xyXG4gICAgfSk7XHJcbiAgfSlcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwicmVxdWlyZSgnLi4vLi4vc3JjL3N0eWxlcy9tYWluLnNjc3MnKTtcclxuXHJcbi8vIExvYWQgbGlicmFyeVxyXG5INVAgPSBINVAgfHwge307XHJcbkg1UC5IdWJDbGllbnQgPSByZXF1aXJlKCcuLi9zY3JpcHRzL2h1YicpLmRlZmF1bHQ7XHJcbkg1UC5IdWJDbGllbnQucmVuZGVyRXJyb3JNZXNzYWdlID0gcmVxdWlyZSgnLi4vc2NyaXB0cy91dGlscy9lcnJvcnMnKS5kZWZhdWx0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==