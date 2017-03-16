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
    this.menu = this.rootElement.querySelector('nav');
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
      this.typeAheadEnabled = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTI4MGIzOWUzZGRiNjAyYzU4NmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2FyaWEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL21haW4uc2Nzcz82YTc4Iiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21lc3NhZ2Utdmlldy9tZXNzYWdlLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL21lbnUuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudHJpZXMvZGlzdC5qcyJdLCJuYW1lcyI6WyJFdmVudGZ1bCIsImxpc3RlbmVycyIsIm9uIiwidHlwZSIsImxpc3RlbmVyIiwic2NvcGUiLCJ0cmlnZ2VyIiwicHVzaCIsImZpcmUiLCJldmVudCIsInRyaWdnZXJzIiwiZXZlcnkiLCJjYWxsIiwicHJvcGFnYXRlIiwidHlwZXMiLCJldmVudGZ1bCIsIm5ld1R5cGUiLCJzZWxmIiwiZm9yRWFjaCIsImN1cnJ5IiwiZm4iLCJhcml0eSIsImxlbmd0aCIsImYxIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJhcmd1bWVudHMiLCJhcHBseSIsImYyIiwiYXJnczIiLCJjb25jYXQiLCJjb21wb3NlIiwiZm5zIiwicmVkdWNlIiwiZiIsImciLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJuYW1lIiwiZWwiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJhdHRyaWJ1dGVFcXVhbHMiLCJ0b2dnbGVBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInBhcmVudCIsImNoaWxkIiwicXVlcnlTZWxlY3RvciIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZUNoaWxkIiwib2xkQ2hpbGQiLCJjbGFzc0xpc3RDb250YWlucyIsImNscyIsImNsYXNzTGlzdCIsIm5vZGVMaXN0VG9BcnJheSIsIm5vZGVMaXN0IiwiaGlkZSIsInNob3ciLCJ0b2dnbGVWaXNpYmlsaXR5IiwidmlzaWJsZSIsImVsZW1lbnQiLCJyZWxheUNsaWNrRXZlbnRBcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJpZCIsInN0b3BQcm9wYWdhdGlvbiIsInJlbmRlckVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjbG9zZUJ1dHRvbiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsIm1lc3NhZ2VDb250ZW50IiwidGl0bGUiLCJjb250ZW50IiwibWVzc2FnZVdyYXBwZXIiLCJkaXNtaXNzaWJsZSIsImJ1dHRvbiIsInVuZGVmaW5lZCIsIm1lc3NhZ2VCdXR0b24iLCJpbml0IiwiaXNFeHBhbmRlZCIsImluaXRDb2xsYXBzaWJsZSIsInRvZ2dsZXIiLCJjb2xsYXBzaWJsZUlkIiwiY29sbGFwc2libGUiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiYXR0cmlidXRlRmlsdGVyIiwiSHViIiwic3RhdGUiLCJzZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJjb250ZW50VHlwZVNlY3Rpb24iLCJ1cGxvYWRTZWN0aW9uIiwidmlldyIsInNldFBhbmVsVGl0bGUiLCJjbG9zZVBhbmVsIiwic2V0U2VjdGlvblR5cGUiLCJ0b2dnbGVQYW5lbE9wZW4iLCJiaW5kIiwic2V0dXAiLCJpbml0Q29udGVudFR5cGVMaXN0IiwiaW5pdFRhYlBhbmVsIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZSIsImdldENvbnRlbnRUeXBlIiwidGhlbiIsInNldFRpdGxlIiwic2VjdGlvbklkIiwidGFiQ29uZmlncyIsImdldEVsZW1lbnQiLCJjb25maWciLCJzZWxlY3RlZCIsImFkZFRhYiIsInRhYkNvbmZpZyIsImFkZEJvdHRvbUJvcmRlciIsIkFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQiLCJNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OIiwiaXNFbXB0eSIsInRleHQiLCJoaWRlQWxsIiwiQ29udGVudFR5cGVEZXRhaWxWaWV3Iiwicm9vdEVsZW1lbnQiLCJjcmVhdGVWaWV3IiwiYnV0dG9uQmFyIiwidXNlQnV0dG9uIiwiaW5zdGFsbEJ1dHRvbiIsImJ1dHRvbnMiLCJpbWFnZSIsIm93bmVyIiwiZGVzY3JpcHRpb24iLCJkZW1vQnV0dG9uIiwiY2Fyb3VzZWwiLCJjYXJvdXNlbExpc3QiLCJsaWNlbmNlUGFuZWwiLCJpbnN0YWxsTWVzc2FnZSIsImluc3RhbGxNZXNzYWdlQ2xvc2UiLCJzdWNjZXNzIiwiaW5uZXJUZXh0IiwibGlnaHRib3giLCJjaGlsZEVsZW1lbnRDb3VudCIsInVybCIsImFsdCIsInRodW1ibmFpbCIsInNyYyIsImVsbGlwc2lzIiwidG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCIsImRlc2NyaXB0aW9uRXhwYW5kZWQiLCJzaXplIiwic3Vic3RyIiwiaW5zdGFsbGVkIiwic2hvd0J1dHRvbkJ5U2VsZWN0b3IiLCJDb250ZW50VHlwZURldGFpbCIsImluc3RhbGwiLCJ1cGRhdGUiLCJpbnN0YWxsQ29udGVudFR5cGUiLCJzZXRJc0luc3RhbGxlZCIsInNldEluc3RhbGxNZXNzYWdlIiwiY2F0Y2giLCJlcnJvck1lc3NhZ2UiLCJlcnJvciIsImVycm9yQ29kZSIsImNvbnNvbGUiLCJyZXNldCIsInNldElkIiwic2V0RGVzY3JpcHRpb24iLCJzZXRJbWFnZSIsImljb24iLCJzZXRFeGFtcGxlIiwiZXhhbXBsZSIsInNldE93bmVyIiwic2V0TGljZW5jZSIsImxpY2Vuc2UiLCJyZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsIiwic2NyZWVuc2hvdHMiLCJhZGRJbWFnZVRvQ2Fyb3VzZWwiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiaGFzQ2hpbGROb2RlcyIsImxhc3RDaGlsZCIsInJvdyIsImNyZWF0ZUNvbnRlbnRUeXBlUm93IiwidXNlQnV0dG9uQ29uZmlnIiwiaW5zdGFsbEJ1dHRvbkNvbmZpZyIsInN1bW1hcnkiLCJDb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZXMiLCJyZW1vdmVBbGxSb3dzIiwiYWRkUm93IiwidW5zZWxlY3RBbGwiLCJDb250ZW50QnJvd3NlclZpZXciLCJtZW51IiwibWVudWJhciIsImlucHV0RmllbGQiLCJkaXNwbGF5U2VsZWN0ZWQiLCJpbnB1dEJ1dHRvbiIsInRhcmdldCIsInF1ZXJ5Iiwia2V5Q29kZSIsIndoaWNoIiwic2VhcmNoYmFyIiwicGFyZW50RWxlbWVudCIsImZvY3VzIiwibWVudXRpdGxlIiwibWVudUlkIiwic2VhcmNoVGV4dCIsImFjdGlvbiIsIm1lc3NhZ2VWaWV3IiwicmVtb3ZlIiwicGFyZW50Tm9kZSIsImFkZCIsImV2ZW50TmFtZSIsImNob2ljZSIsInNlbGVjdGVkTmFtZSIsIm1lbnVJdGVtcyIsInNlbGVjdGVkTWVudUl0ZW0iLCJ1bmRlcmxpbmUiLCJDb250ZW50VHlwZVNlY3Rpb25UYWJzIiwiQUxMIiwiTVlfQ09OVEVOVF9UWVBFUyIsIk1PU1RfUE9QVUxBUiIsImZpbHRlclByb3BlcnR5IiwiQ29udGVudFR5cGVTZWN0aW9uIiwidHlwZUFoZWFkRW5hYmxlZCIsInNlYXJjaFNlcnZpY2UiLCJjb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZURldGFpbCIsInRhYiIsImhhc093blByb3BlcnR5IiwiYWRkTWVudUl0ZW0iLCJpbml0TWVudSIsInNlY3Rpb24iLCJzZWFyY2giLCJzZWxlY3RNZW51SXRlbUJ5SWQiLCJyZXNldE1lbnVPbkVudGVyIiwiYXBwbHlTZWFyY2hGaWx0ZXIiLCJjbGVhcklucHV0RmllbGQiLCJ1cGRhdGVEaXNwbGF5U2VsZWN0ZWQiLCJzaG93RGV0YWlsVmlldyIsImNsb3NlRGV0YWlsVmlldyIsImhhbmRsZUVycm9yIiwiZGlzcGxheU1lc3NhZ2UiLCJzZXREaXNwbGF5U2VsZWN0ZWQiLCJlIiwiY3RzIiwibG9hZEJ5SWQiLCJyZW1vdmVEZWFjdGl2YXRlZFN0eWxlRnJvbU1lbnUiLCJhZGREZWFjdGl2YXRlZFN0eWxlVG9NZW51IiwiSHViU2VydmljZXMiLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwicmVzdWx0IiwianNvbiIsImlzVmFsaWQiLCJsaWJyYXJpZXMiLCJyZXNwb25zZSIsIm1lc3NhZ2VDb2RlIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJucyIsImdldEFqYXhVcmwiLCJib2R5IiwiZm9ybURhdGEiLCJBVFRSSUJVVEVfREFUQV9JRCIsImlzT3BlbiIsIkh1YlZpZXciLCJyZW5kZXJUYWJQYW5lbCIsInJlbmRlclBhbmVsIiwiZXhwYW5kZWQiLCJ0YWJDb250YWluZXJFbGVtZW50IiwicGFuZWwiLCJzZXRUaW1lb3V0IiwidGFibGlzdCIsInRhYkxpc3RXcmFwcGVyIiwidGFiSWQiLCJ0YWJQYW5lbElkIiwidGFiUGFuZWwiLCJNZXNzYWdlVmlldyIsIlNlYXJjaFNlcnZpY2UiLCJmaWx0ZXJCeVF1ZXJ5IiwicHJvcGVydHkiLCJzb3J0IiwiY3QxIiwiY3QyIiwic2NvcmUiLCJnZXRTZWFyY2hTY29yZSIsInNvcnRTZWFyY2hSZXN1bHRzIiwiYSIsImIiLCJwb3B1bGFyaXR5IiwicXVlcmllcyIsInNwbGl0IiwicXVlcnlTY29yZXMiLCJnZXRTY29yZUZvckVhY2hRdWVyeSIsInRyaW0iLCJoYXNTdWJTdHJpbmciLCJhcnJheUhhc1N1YlN0cmluZyIsImtleXdvcmRzIiwibmVlZGxlIiwiaGF5c3RhY2siLCJ0b0xvd2VyQ2FzZSIsInN1YlN0cmluZyIsInN0cmluZyIsIkFkZE51bWJlciIsIlVwbG9hZFNlY3Rpb24iLCJoNXBVcGxvYWQiLCJ0ZXh0Q29udGVudCIsImRhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImZpbGVzIiwidXBsb2FkQ29udGVudCIsInN1cHBvcnQiLCJzZWFyY2hQYXJhbXMiLCJpdGVyYWJsZSIsIlN5bWJvbCIsImJsb2IiLCJCbG9iIiwiYXJyYXlCdWZmZXIiLCJ2aWV3Q2xhc3NlcyIsImlzRGF0YVZpZXciLCJvYmoiLCJEYXRhVmlldyIsImlzUHJvdG90eXBlT2YiLCJpc0FycmF5QnVmZmVyVmlldyIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwiT2JqZWN0Iiwibm9ybWFsaXplTmFtZSIsIlN0cmluZyIsInRlc3QiLCJUeXBlRXJyb3IiLCJub3JtYWxpemVWYWx1ZSIsIml0ZXJhdG9yRm9yIiwiaXRlbXMiLCJpdGVyYXRvciIsIm5leHQiLCJzaGlmdCIsImRvbmUiLCJIZWFkZXJzIiwiaGVhZGVycyIsImlzQXJyYXkiLCJoZWFkZXIiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwib2xkVmFsdWUiLCJnZXQiLCJoYXMiLCJzZXQiLCJjYWxsYmFjayIsInRoaXNBcmciLCJrZXlzIiwiZW50cmllcyIsImNvbnN1bWVkIiwiYm9keVVzZWQiLCJmaWxlUmVhZGVyUmVhZHkiLCJyZWFkZXIiLCJvbmxvYWQiLCJvbmVycm9yIiwicmVhZEJsb2JBc0FycmF5QnVmZmVyIiwiRmlsZVJlYWRlciIsInByb21pc2UiLCJyZWFkQXNBcnJheUJ1ZmZlciIsInJlYWRCbG9iQXNUZXh0IiwicmVhZEFzVGV4dCIsInJlYWRBcnJheUJ1ZmZlckFzVGV4dCIsImJ1ZiIsIlVpbnQ4QXJyYXkiLCJjaGFycyIsImkiLCJmcm9tQ2hhckNvZGUiLCJqb2luIiwiYnVmZmVyQ2xvbmUiLCJieXRlTGVuZ3RoIiwiYnVmZmVyIiwiQm9keSIsIl9pbml0Qm9keSIsIl9ib2R5SW5pdCIsIl9ib2R5VGV4dCIsIl9ib2R5QmxvYiIsIl9ib2R5Rm9ybURhdGEiLCJVUkxTZWFyY2hQYXJhbXMiLCJfYm9keUFycmF5QnVmZmVyIiwiRXJyb3IiLCJyZWplY3RlZCIsImRlY29kZSIsIkpTT04iLCJwYXJzZSIsIm1ldGhvZHMiLCJub3JtYWxpemVNZXRob2QiLCJ1cGNhc2VkIiwidG9VcHBlckNhc2UiLCJSZXF1ZXN0IiwiaW5wdXQiLCJvcHRpb25zIiwibW9kZSIsInJlZmVycmVyIiwiY2xvbmUiLCJmb3JtIiwiYnl0ZXMiLCJyZXBsYWNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFyc2VIZWFkZXJzIiwicmF3SGVhZGVycyIsInByZVByb2Nlc3NlZEhlYWRlcnMiLCJsaW5lIiwicGFydHMiLCJrZXkiLCJSZXNwb25zZSIsImJvZHlJbml0Iiwic3RhdHVzIiwib2siLCJzdGF0dXNUZXh0IiwicmVkaXJlY3RTdGF0dXNlcyIsInJlZGlyZWN0IiwiUmFuZ2VFcnJvciIsImxvY2F0aW9uIiwicmVxdWVzdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwicmVzcG9uc2VVUkwiLCJyZXNwb25zZVRleHQiLCJvbnRpbWVvdXQiLCJvcGVuIiwid2l0aENyZWRlbnRpYWxzIiwicmVzcG9uc2VUeXBlIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJwb2x5ZmlsbCIsIkFUVFJJQlVURV9TSVpFIiwiZGlzYWJsZSIsImVuYWJsZSIsInRvZ2dsZUVuYWJsZWQiLCJlbmFibGVkIiwiaGlkZGVuIiwiaXNEaXNhYmxlZCIsInVwZGF0ZVZpZXciLCJwcmV2QnV0dG9uIiwibmV4dEJ1dHRvbiIsImxpc3QiLCJ0b3RhbENvdW50Iiwic3R5bGUiLCJ3aWR0aCIsImRpc3BsYXlDb3VudCIsIm1hcmdpbkxlZnQiLCJwb3NpdGlvbiIsIm9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrIiwidXBkYXRlU3RhdGUiLCJpbml0SW1hZ2UiLCJ0YXJnZXRJZCIsImhhbmRsZURvbVVwZGF0ZSIsInJlY29yZCIsImFkZGVkTm9kZXMiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwidW5TZWxlY3RBbGwiLCJ1bkV4cGFuZCIsIm1lbnVJdGVtIiwidGFicyIsInRhYlBhbmVscyIsInJlcXVpcmUiLCJINVAiLCJIdWJDbGllbnQiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hFQTs7O0FBR08sSUFBTUEsOEJBQVcsU0FBWEEsUUFBVztBQUFBLFNBQU87QUFDN0JDLGVBQVcsRUFEa0I7O0FBRzdCOzs7Ozs7Ozs7O0FBVUFDLFFBQUksWUFBU0MsSUFBVCxFQUFlQyxRQUFmLEVBQXlCQyxLQUF6QixFQUFnQztBQUNsQzs7Ozs7QUFLQSxVQUFNQyxVQUFVO0FBQ2Qsb0JBQVlGLFFBREU7QUFFZCxpQkFBU0M7QUFGSyxPQUFoQjs7QUFLQSxXQUFLSixTQUFMLENBQWVFLElBQWYsSUFBdUIsS0FBS0YsU0FBTCxDQUFlRSxJQUFmLEtBQXdCLEVB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YixFQUE0QixPQUE1QixDQUFiOztBQUVBOzs7QUFHQSxJQUFNb1osY0FBYyx5QkFBUSw0QkFBYSxlQUFiLEVBQThCLE9BQTlCLENBQVIsQ0FBcEI7O0FBRUE7Ozs7O0FBS2UsU0FBUzdYLElBQVQsQ0FBY3BCLE9BQWQsRUFBdUI7QUFDcEMsTUFBTW9aLE9BQU9wWixRQUFRWixnQkFBUixDQUF5QixjQUF6QixDQUFiO0FBQ0EsTUFBTWlhLFlBQVlyWixRQUFRWixnQkFBUixDQUF5QixtQkFBekIsQ0FBbEI7O0FBRUFnYSxPQUFLN2MsT0FBTCxDQUFhLGVBQU87QUFDbEJtTyxRQUFJeEssZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsVUFBVXBFLEtBQVYsRUFBaUI7O0FBRTdDbWQsa0JBQVlHLElBQVo7QUFDQXRkLFlBQU02TSxNQUFOLENBQWFqSyxZQUFiLENBQTBCLGVBQTFCLEVBQTJDLE1BQTNDOztBQUVBc0YsY0FBUXFWLFNBQVI7O0FBRUEsVUFBSXhMLGFBQWEvUixNQUFNNk0sTUFBTixDQUFhcEssWUFBYixDQUEwQixlQUExQixDQUFqQjtBQUNBc0IsV0FBS0csUUFBUWQsYUFBUixPQUEwQjJPLFVBQTFCLENBQUw7QUFDRCxLQVREO0FBVUQsR0FYRDtBQVlELEM7Ozs7Ozs7OztBQ3ZDRCxtQkFBQXlMLENBQVEsQ0FBUjs7QUFFQTtBQUNBQyxNQUFNQSxPQUFPLEVBQWI7QUFDQUEsSUFBSUMsU0FBSixHQUFnQixtQkFBQUYsQ0FBUSxDQUFSLEVBQTBCRyxPQUExQztBQUNBRixJQUFJQyxTQUFKLENBQWNuWixrQkFBZCxHQUFtQyxtQkFBQWlaLENBQVEsQ0FBUixFQUFtQ0csT0FBdEUsQyIsImZpbGUiOiJoNXAtaHViLWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1MjgwYjM5ZTNkZGI2MDJjNTg2YyIsIi8qKlxuICogQG1peGluXG4gKi9cbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnRmdWx9XG4gICAqL1xuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNjb3BlXG4gICAgICovXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcbiAgICAgICdsaXN0ZW5lcic6IGxpc3RlbmVyLFxuICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtldmVudE5hbWVdIHRoZSBuYW1lIG9mIHRoZSBldmVudCB3aGVuIHByb3BvZ2F0ZWRcbiAgICovXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsLCBuZXdUeXBlKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUobmV3VHlwZSB8fCB0eXBlLCBldmVudCkpKTtcbiAgfVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9taXhpbnMvZXZlbnRmdWwuanMiLCIvKipcbiAqIFJldHVybnMgYSBjdXJyaWVkIHZlcnNpb24gb2YgYSBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKlxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY3VycnkgPSBmdW5jdGlvbihmbikge1xuICBjb25zdCBhcml0eSA9IGZuLmxlbmd0aDtcblxuICByZXR1cm4gZnVuY3Rpb24gZjEoKSB7XG4gICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID49IGFyaXR5KSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGYyKCkge1xuICAgICAgICBjb25zdCBhcmdzMiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgIHJldHVybiBmMS5hcHBseShudWxsLCBhcmdzLmNvbmNhdChhcmdzMikpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICogQ29tcG9zZSBmdW5jdGlvbnMgdG9nZXRoZXIsIGV4ZWN1dGluZyBmcm9tIHJpZ2h0IHRvIGxlZnRcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uLi4ufSBmbnNcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXBvc2UgPSAoLi4uZm5zKSA9PiBmbnMucmVkdWNlKChmLCBnKSA9PiAoLi4uYXJncykgPT4gZihnKC4uLmFyZ3MpKSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggZWxlbWVudCBpbiBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZvckVhY2ggPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICBhcnIuZm9yRWFjaChmbik7XG59KTtcblxuLyoqXG4gKiBNYXBzIGEgZnVuY3Rpb24gdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBtYXAgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLm1hcChmbik7XG59KTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgZmlsdGVyIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZmlsdGVyID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5maWx0ZXIoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIHNvbWUgdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBzb21lID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5zb21lKGZuKTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhbiBhcnJheSBjb250YWlucyBhIHZhbHVlXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb250YWlucyA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZSwgYXJyKSB7XG4gIHJldHVybiBhcnIuaW5kZXhPZih2YWx1ZSkgIT0gLTE7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IHdpdGhvdXQgdGhlIHN1cHBsaWVkIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlc1xuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCB3aXRob3V0ID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlcywgYXJyKSB7XG4gIHJldHVybiBmaWx0ZXIodmFsdWUgPT4gIWNvbnRhaW5zKHZhbHVlLCB2YWx1ZXMpLCBhcnIpXG59KTtcblxuLyoqXG4gKiBUYWtlcyBhIHN0cmluZyB0aGF0IGlzIGVpdGhlciAndHJ1ZScgb3IgJ2ZhbHNlJyBhbmQgcmV0dXJucyB0aGUgb3Bwb3NpdGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYm9vbFxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGludmVyc2VCb29sZWFuU3RyaW5nID0gZnVuY3Rpb24gKGJvb2wpIHtcbiAgcmV0dXJuIChib29sICE9PSAndHJ1ZScpLnRvU3RyaW5nKCk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJpbXBvcnQge2N1cnJ5LCBpbnZlcnNlQm9vbGVhblN0cmluZ30gZnJvbSAnLi9mdW5jdGlvbmFsJ1xuXG4vKipcbiAqIEdldCBhbiBhdHRyaWJ1dGUgdmFsdWUgZnJvbSBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IGVsLmdldEF0dHJpYnV0ZShuYW1lKSk7XG5cbi8qKlxuICogU2V0IGFuIGF0dHJpYnV0ZSBvbiBhIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgdmFsdWUsIGVsKSA9PiBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpKTtcblxuLyoqXG4gKiBSZW1vdmUgYXR0cmlidXRlIGZyb20gaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaGFzQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5oYXNBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZSB0aGF0IGVxdWFsc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgYXR0cmlidXRlRXF1YWxzID0gY3VycnkoKG5hbWUsIHZhbHVlLCBlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpID09PSB2YWx1ZSk7XG5cbi8qKlxuICogVG9nZ2xlcyBhbiBhdHRyaWJ1dGUgYmV0d2VlbiAndHJ1ZScgYW5kICdmYWxzZSc7XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IHtcbiAgY29uc3QgdmFsdWUgPSBnZXRBdHRyaWJ1dGUobmFtZSwgZWwpO1xuICBzZXRBdHRyaWJ1dGUobmFtZSwgaW52ZXJzZUJvb2xlYW5TdHJpbmcodmFsdWUpLCBlbCk7XG59KTtcblxuLyoqXG4gKiBUaGUgYXBwZW5kQ2hpbGQoKSBtZXRob2QgYWRkcyBhIG5vZGUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdCBvZiBjaGlsZHJlbiBvZiBhIHNwZWNpZmllZCBwYXJlbnQgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNoaWxkXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IGFwcGVuZENoaWxkID0gY3VycnkoKHBhcmVudCwgY2hpbGQpID0+IHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCkpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyBhIGRlc2NlbmRhbnQgb2YgdGhlIGVsZW1lbnQgb24gd2hpY2ggaXQgaXMgaW52b2tlZFxuICogdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2Ygc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvciA9IGN1cnJ5KChzZWxlY3RvciwgZWwpID0+IGVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbm9uLWxpdmUgTm9kZUxpc3Qgb2YgYWxsIGVsZW1lbnRzIGRlc2NlbmRlZCBmcm9tIHRoZSBlbGVtZW50IG9uIHdoaWNoIGl0XG4gKiBpcyBpbnZva2VkIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIENTUyBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Tm9kZUxpc3R9XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yQWxsID0gY3VycnkoKHNlbGVjdG9yLCBlbCkgPT4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuXG4vKipcbiAqIFRoZSByZW1vdmVDaGlsZCgpIG1ldGhvZCByZW1vdmVzIGEgY2hpbGQgbm9kZSBmcm9tIHRoZSBET00uIFJldHVybnMgcmVtb3ZlZCBub2RlLlxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gcGFyZW50XG4gKiBAcGFyYW0ge05vZGV9IG9sZENoaWxkXG4gKlxuICogQHJldHVybiB7Tm9kZX1cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUNoaWxkID0gY3VycnkoKHBhcmVudCwgb2xkQ2hpbGQpID0+IHBhcmVudC5yZW1vdmVDaGlsZChvbGRDaGlsZCkpO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIG5vZGUgaGFzIGEgY2xhc3NcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgY2xhc3NMaXN0Q29udGFpbnMgPSBjdXJyeSgoY2xzLCBlbCkgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNscykpO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSBOb2RlTGlzdCB0byBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7Tm9kZUxpc3R9IG5vZGVMaXN0XG4gKlxuICogQHJldHVybiB7Tm9kZVtdfVxuICovXG5leHBvcnQgY29uc3Qgbm9kZUxpc3RUb0FycmF5ID0gbm9kZUxpc3QgPT4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZUxpc3QpO1xuXG4vKipcbiAqIEFkZHMgYXJpYS1oaWRkZW49dHJ1ZSB0byBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQWRkcyBhcmlhLWhpZGRlbj1mYWxzZSB0byBhbiBlbGVtZW50XG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyBhcmlhLWhpZGRlbiBvbiBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gY3VycnkoKHZpc2libGUsIGVsZW1lbnQpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcblxuLyoqXG4gKiAgVHJhbnNmb3JtcyBhIERPTSBjbGljayBldmVudCBpbnRvIGFuIEV2ZW50ZnVsJ3MgZXZlbnRcbiAqICBAc2VlIEV2ZW50ZnVsXG4gKlxuICogQHBhcmFtICB7c3RyaW5nIHwgT2JqZWN0fSB0eXBlXG4gKiBAcGFyYW0gIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbGF5Q2xpY2tFdmVudEFzID0gY3VycnkoZnVuY3Rpb24odHlwZSwgZXZlbnRmdWwsIGVsZW1lbnQpIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBldmVudGZ1bC5maXJlKHR5cGUsIHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBpZDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIGRvbid0IGJ1YmJsZVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICByZXR1cm4gZWxlbWVudDtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwiLyoqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLnR5cGUgICAgICAgICB0eXBlIG9mIHRoZSBtZXNzYWdlOiBpbmZvLCBzdWNjZXNzLCBlcnJvclxuICogQHBhcmFtICB7Ym9vbGVhbn0gIGNvbmZpZy5kaXNtaXNzaWJsZSAgd2hldGhlciB0aGUgbWVzc2FnZSBjYW4gYmUgZGlzbWlzc2VkXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLmNvbnRlbnQgICAgICBtZXNzYWdlIGNvbnRlbnQgdXN1YWxseSBhICdoMycgYW5kIGEgJ3AnXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gZGl2IGNvbnRhaW5pbmcgdGhlIG1lc3NhZ2UgZWxlbWVudFxuICovXG5cbi8vVE9ETyBoYW5kbGUgc3RyaW5ncywgaHRtbCwgYmFkbHkgZm9ybWVkIG9iamVjdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyRXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2Nsb3NlJztcbiAgY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyYjeDI3MTUnO1xuXG4gIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VDb250ZW50LmNsYXNzTmFtZSA9ICdtZXNzYWdlLWNvbnRlbnQnO1xuICBtZXNzYWdlQ29udGVudC5pbm5lckhUTUwgPSAnPGgxPicgKyBtZXNzYWdlLnRpdGxlICsgJzwvaDE+JyArICc8cD4nICsgbWVzc2FnZS5jb250ZW50ICsgJzwvcD4nO1xuXG4gIGNvbnN0IG1lc3NhZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VXcmFwcGVyLmNsYXNzTmFtZSA9ICdtZXNzYWdlJyArICcgJyArIGAke21lc3NhZ2UudHlwZX1gICsgKG1lc3NhZ2UuZGlzbWlzc2libGUgPyAnIGRpc21pc3NpYmxlJyA6ICcnKTtcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGVudCk7XG5cbiAgaWYgKG1lc3NhZ2UuYnV0dG9uICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBtZXNzYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbWVzc2FnZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcbiAgICBtZXNzYWdlQnV0dG9uLmlubmVySFRNTCA9IG1lc3NhZ2UuYnV0dG9uO1xuICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VCdXR0b24pO1xuICB9XG5cbiAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsImltcG9ydCB7aW5pdENvbGxhcHNpYmxlfSBmcm9tICcuLi91dGlscy9hcmlhJztcblxuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIGluaXRDb2xsYXBzaWJsZShlbGVtZW50KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwiaW1wb3J0IHthdHRyaWJ1dGVFcXVhbHMsIHRvZ2dsZUF0dHJpYnV0ZSwgdG9nZ2xlVmlzaWJpbGl0eX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhcmlhLWV4cGFuZGVkPXRydWUgb24gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc0V4cGFuZGVkID0gYXR0cmlidXRlRXF1YWxzKFwiYXJpYS1leHBhbmRlZFwiLCAndHJ1ZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYXJpYS1oaWRkZW4gb24gJ2NvbGxhcHNpYmxlJyB3aGVuIGFyaWEtZXhwYW5kZWQgY2hhbmdlcyBvbiAndG9nZ2xlcicsXG4gKiBhbmQgdG9nZ2xlcyBhcmlhLWV4cGFuZGVkIG9uICd0b2dnbGVyJyBvbiBjbGlja1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRDb2xsYXBzaWJsZSA9IChlbGVtZW50KSA9PiB7XG4gIC8vIGVsZW1lbnRzXG4gIGNvbnN0IHRvZ2dsZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScpO1xuICBjb25zdCBjb2xsYXBzaWJsZUlkID0gdG9nZ2xlci5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgY29uc3QgY29sbGFwc2libGUgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2NvbGxhcHNpYmxlSWR9YCk7XG5cbiAgLy8gc2V0IG9ic2VydmVyIG9uIHRpdGxlIGZvciBhcmlhLWV4cGFuZGVkXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHRvZ2dsZVZpc2liaWxpdHkoaXNFeHBhbmRlZCh0b2dnbGVyKSwgY29sbGFwc2libGUpKTtcblxuICBvYnNlcnZlci5vYnNlcnZlKHRvZ2dsZXIsIHtcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW1wiYXJpYS1leHBhbmRlZFwiXVxuICB9KTtcblxuICAvLyBTZXQgY2xpY2sgbGlzdGVuZXIgdGhhdCB0b2dnbGVzIGFyaWEtZXhwYW5kZWRcbiAgdG9nZ2xlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRvZ2dsZUF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgdG9nZ2xlcikpO1xuXG4gIC8vIGluaXRpYWxpemVcbiAgdG9nZ2xlVmlzaWJpbGl0eShpc0V4cGFuZGVkKHRvZ2dsZXIpLCBjb2xsYXBzaWJsZSk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2FyaWEuanMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ01DQTBNREFnTWpJMUlqNE5DaUFnUEdSbFpuTStEUW9nSUNBZ1BITjBlV3hsUGcwS0lDQWdJQ0FnTG1Oc2N5MHhJSHNOQ2lBZ0lDQWdJR1pwYkd3NklHNXZibVU3RFFvZ0lDQWdJQ0I5RFFvTkNpQWdJQ0FnSUM1amJITXRNaUI3RFFvZ0lDQWdJQ0JtYVd4c09pQWpZelpqTm1NM093MEtJQ0FnSUNBZ2ZRMEtEUW9nSUNBZ0lDQXVZMnh6TFRNc0lDNWpiSE10TkNCN0RRb2dJQ0FnSUNCbWFXeHNPaUFqWm1abU93MEtJQ0FnSUNBZ2ZRMEtEUW9nSUNBZ0lDQXVZMnh6TFRNZ2V3MEtJQ0FnSUNBZ2IzQmhZMmwwZVRvZ01DNDNPdzBLSUNBZ0lDQWdmUTBLSUNBZ0lEd3ZjM1I1YkdVK0RRb2dJRHd2WkdWbWN6NE5DaUFnUEhScGRHeGxQbU52Ym5SbGJuUWdkSGx3WlNCd2JHRmpaV2h2YkdSbGNsOHlQQzkwYVhSc1pUNE5DaUFnUEdjZ2FXUTlJa3hoZVdWeVh6SWlJR1JoZEdFdGJtRnRaVDBpVEdGNVpYSWdNaUkrRFFvZ0lDQWdQR2NnYVdROUltTnZiblJsYm5SZmRIbHdaVjl3YkdGalpXaHZiR1JsY2kweFgyTnZjSGtpSUdSaGRHRXRibUZ0WlQwaVkyOXVkR1Z1ZENCMGVYQmxJSEJzWVdObGFHOXNaR1Z5TFRFZ1kyOXdlU0krRFFvZ0lDQWdJQ0E4Y21WamRDQmpiR0Z6Y3owaVkyeHpMVEVpSUhkcFpIUm9QU0kwTURBaUlHaGxhV2RvZEQwaU1qSTFJaTgrRFFvZ0lDQWdJQ0E4Y21WamRDQmpiR0Z6Y3owaVkyeHpMVElpSUhnOUlqRXhNaTQxTVNJZ2VUMGlORE11TkRFaUlIZHBaSFJvUFNJeE56WXVPVFlpSUdobGFXZG9kRDBpTVRNMUxqUTFJaUJ5ZUQwaU1UQWlJSEo1UFNJeE1DSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhNell1TmpZaUlHTjVQU0kyTVM0NU9DSWdjajBpTkM0NE1TSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhOVEV1TkRraUlHTjVQU0kyTVM0NU9DSWdjajBpTkM0NE1TSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhOall1TVNJZ1kzazlJall4TGprNElpQnlQU0kwTGpneElpOCtEUW9nSUNBZ0lDQThaeUJwWkQwaVgwZHliM1Z3WHlJZ1pHRjBZUzF1WVcxbFBTSW1iSFE3UjNKdmRYQW1aM1E3SWo0TkNpQWdJQ0FnSUNBZ1BHY2dhV1E5SWw5SGNtOTFjRjh5SWlCa1lYUmhMVzVoYldVOUlpWnNkRHRIY205MWNDWm5kRHNpUGcwS0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdsa1BTSmZRMjl0Y0c5MWJtUmZVR0YwYUY4aUlHUmhkR0V0Ym1GdFpUMGlKbXgwTzBOdmJYQnZkVzVrSUZCaGRHZ21aM1E3SWlCamJHRnpjejBpWTJ4ekxUUWlJR1E5SWsweU5qTXVNamdzT1RVdU1qRkRNall3TERreUxqQTNMREkxTlN3NU1TNDFMREkwT0M0ME15dzVNUzQxU0RJeU4zWTRTREU1T1M0MWJDMHlMakUzTERFd0xqSTBZVEkxTGpnMExESTFMamcwTERBc01Dd3hMREV4TGpRNExURXVOak1zTVRrdU9UTXNNVGt1T1RNc01Dd3dMREVzTVRRdU16a3NOUzQxTnl3eE9DNHlOaXd4T0M0eU5pd3dMREFzTVN3MUxqVXlMREV6TGpZc01qTXVNVEVzTWpNdU1URXNNQ3d3TERFdE1pNDROQ3d4TVM0d05Td3hPQzQyTlN3eE9DNDJOU3d3TERBc01TMDRMakEyTERjdU56a3NPU3c1TERBc01Dd3hMVFF1TVRJc01TNHpOMGd5TXpaMkxUSXhhREV3TGpReVl6Y3VNellzTUN3eE1pNDRNeTB4TGpZeExERTJMalF5TFRWek5TNHpPQzAzTGpRNExEVXVNemd0TVRNdU5EUkRNalk0TGpJeUxERXdNaTR5T1N3eU5qWXVOVGNzT1RndU16VXNNall6TGpJNExEazFMakl4V20wdE1UVXNNVGRqTFRFdU5ESXNNUzR5TWkwekxqa3NNUzR5TlMwM0xqUXhMREV1TWpWSU1qTTJkaTB4TkdnMUxqWXlZVGt1TlRjc09TNDFOeXd3TERBc01TdzNMREl1T1RNc055NHdOU3czTGpBMUxEQXNNQ3d4TERFdU9EVXNOQzQ1TWtFMkxqTXpMRFl1TXpNc01Dd3dMREVzTWpRNExqTXhMREV4TWk0eU5Wb2lMejROQ2lBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JwWkQwaVgxQmhkR2hmSWlCa1lYUmhMVzVoYldVOUlpWnNkRHRRWVhSb0ptZDBPeUlnWTJ4aGMzTTlJbU5zY3kwMElpQmtQU0pOTWpBeUxqa3NNVEU1TGpFeFlUZ3VNVElzT0M0eE1pd3dMREFzTUMwM0xqSTRMRFF1TlRKc0xURTJMVEV1TWpJc055NHlNaTB6TUM0NU1rZ3hOelIyTWpKSU1UVXpkaTB5TWtneE16WjJOVFpvTVRkMkxUSXhhREl4ZGpJeGFESXdMak14WXkweUxqY3lMREF0TlMweExqVXpMVGN0TTJFeE9TNHhPU3d4T1M0eE9Td3dMREFzTVMwMExqY3pMVFF1T0RNc01qTXVOVGdzTWpNdU5UZ3NNQ3d3TERFdE15MDJMalpzTVRZdE1pNHlObUU0TGpFeExEZ3VNVEVzTUN3eExEQXNOeTR5TmkweE1TNDNNbG9pTHo0TkNpQWdJQ0FnSUNBZ1BDOW5QZzBLSUNBZ0lDQWdQQzluUGcwS0lDQWdJQ0FnUEhKbFkzUWdZMnhoYzNNOUltTnNjeTB6SWlCNFBTSXhOemN1TmpZaUlIazlJalUzTGpZMklpQjNhV1IwYUQwaU9USXVNamdpSUdobGFXZG9kRDBpT1M0ek9DSWdjbmc5SWpNdU5TSWdjbms5SWpNdU5TSXZQZzBLSUNBZ0lEd3ZaejROQ2lBZ1BDOW5QZzBLUEM5emRtYytEUW89XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Z1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgSHViVmlldyBmcm9tICcuL2h1Yi12aWV3JztcbmltcG9ydCBDb250ZW50VHlwZVNlY3Rpb24gZnJvbSAnLi9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbic7XG5pbXBvcnQgVXBsb2FkU2VjdGlvbiBmcm9tICcuL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uJztcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tICcuL2h1Yi1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7cmVuZGVyRXJyb3JNZXNzYWdlfSBmcm9tICcuL3V0aWxzL2Vycm9ycyc7XG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEh1YlN0YXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGl0bGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZXhwYW5kZWRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhcGlSb290VXJsXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gRXJyb3JNZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVycm9yQ29kZVxuICovXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFNlbGVjdGVkRWxlbWVudFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlkXG4gKi9cbi8qKlxuICogU2VsZWN0IGV2ZW50XG4gKiBAZXZlbnQgSHViI3NlbGVjdFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBFcnJvciBldmVudFxuICogQGV2ZW50IEh1YiNlcnJvclxuICogQHR5cGUge0Vycm9yTWVzc2FnZX1cbiAqL1xuLyoqXG4gKiBVcGxvYWQgZXZlbnRcbiAqIEBldmVudCBIdWIjdXBsb2FkXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIEh1YiNlcnJvclxuICogQGZpcmVzIEh1YiN1cGxvYWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBjb250cm9sbGVyc1xuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uID0gbmV3IENvbnRlbnRUeXBlU2VjdGlvbihzdGF0ZSwgdGhpcy5zZXJ2aWNlcyk7XG4gICAgdGhpcy51cGxvYWRTZWN0aW9uID0gbmV3IFVwbG9hZFNlY3Rpb24oc3RhdGUsIHRoaXMuc2VydmljZXMpO1xuXG4gICAgLy8gdmlld3NcbiAgICB0aGlzLnZpZXcgPSBuZXcgSHViVmlldyhzdGF0ZSk7XG5cbiAgICAvLyBwcm9wYWdhdGUgY29udHJvbGxlciBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCddLCB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbik7XG4gICAgdGhpcy5wcm9wYWdhdGUoWyd1cGxvYWQnXSwgdGhpcy51cGxvYWRTZWN0aW9uKTtcblxuICAgIC8vIGhhbmRsZSBldmVudHNcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnNldFBhbmVsVGl0bGUsIHRoaXMpO1xuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMudmlldy5jbG9zZVBhbmVsLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMudmlldy5vbigndGFiLWNoYW5nZScsIHRoaXMudmlldy5zZXRTZWN0aW9uVHlwZSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcub24oJ3BhbmVsLWNoYW5nZScsIHRoaXMudmlldy50b2dnbGVQYW5lbE9wZW4uYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uLm9uKCdyZWxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuc2VydmljZXMuc2V0dXAoKTtcbiAgICAgIHNlbGYuY29udGVudFR5cGVTZWN0aW9uLmluaXRDb250ZW50VHlwZUxpc3QoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW5pdFRhYlBhbmVsKHN0YXRlKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBjb250ZW50IHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGdldENvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUobWFjaGluZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlIG9mIHRoZSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldFBhbmVsVGl0bGUoe2lkfSnCoHtcbiAgICB0aGlzLmdldENvbnRlbnRUeXBlKGlkKS50aGVuKCh7dGl0bGV9KSA9PiB0aGlzLnZpZXcuc2V0VGl0bGUodGl0bGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIHRhYiBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbklkXG4gICAqL1xuICBpbml0VGFiUGFuZWwoeyBzZWN0aW9uSWQgPSAnY29udGVudC10eXBlcycgfSkge1xuICAgIGNvbnN0IHRhYkNvbmZpZ3MgPSBbe1xuICAgICAgdGl0bGU6ICdDcmVhdGUgQ29udGVudCcsXG4gICAgICBpZDogJ2NvbnRlbnQtdHlwZXMnLFxuICAgICAgY29udGVudDogdGhpcy5jb250ZW50VHlwZVNlY3Rpb24uZ2V0RWxlbWVudCgpLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdVcGxvYWQnLFxuICAgICAgaWQ6ICd1cGxvYWQnLFxuICAgICAgY29udGVudDogdGhpcy51cGxvYWRTZWN0aW9uLmdldEVsZW1lbnQoKVxuICAgIH1dO1xuXG4gICAgLy8gc2V0cyB0aGUgY29ycmVjdCBvbmUgc2VsZWN0ZWRcbiAgICB0YWJDb25maWdzXG4gICAgICAuZmlsdGVyKGNvbmZpZyA9PiBjb25maWcuaWQgPT09IHNlY3Rpb25JZClcbiAgICAgIC5mb3JFYWNoKGNvbmZpZyA9PiBjb25maWcuc2VsZWN0ZWQgPSB0cnVlKTtcblxuICAgIHRhYkNvbmZpZ3MuZm9yRWFjaCh0YWJDb25maWcgPT4gdGhpcy52aWV3LmFkZFRhYih0YWJDb25maWcpKTtcbiAgICB0aGlzLnZpZXcuYWRkQm90dG9tQm9yZGVyKCk7IC8vIEFkZHMgYW4gYW5pbWF0ZWQgYm90dG9tIGJvcmRlciB0byBlYWNoIHRhYlxuICAgIHRoaXMudmlldy5pbml0VGFiUGFuZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWIuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIHJlbW92ZUNoaWxkLCBoaWRlLCBzaG93IH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBjdXJyeSwgZm9yRWFjaCB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCI7XG5pbXBvcnQgaW5pdEltYWdlU2Nyb2xsZXIgZnJvbSBcImNvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXJcIjtcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBub0ljb24gZnJvbSAnLi4vLi4vaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmcnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7bnVtYmVyfVxuICovXG5jb25zdCBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OID0gMzAwO1xuXG4vKipcbiAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgaWYgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGVsZW1lbnQsIHZpc2libGUpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBlbXB0eVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbXB0eSA9ICh0ZXh0KSA9PiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSAmJiAodGV4dC5sZW5ndGggPT09IDApO1xuXG5jb25zdCBoaWRlQWxsID0gZm9yRWFjaChoaWRlKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIHZpZXdcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVWaWV3KCk7XG5cbiAgICAvLyBncmFiIHJlZmVyZW5jZXNcbiAgICB0aGlzLmJ1dHRvbkJhciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1iYXInKTtcbiAgICB0aGlzLnVzZUJ1dHRvbiA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tdXNlJyk7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsJyk7XG4gICAgdGhpcy5idXR0b25zID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvckFsbCgnLmJ1dHRvbicpO1xuXG4gICAgdGhpcy5pbWFnZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtdHlwZS1pbWFnZScpO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWRldGFpbHMgLnRpdGxlJyk7XG4gICAgdGhpcy5vd25lciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bmVyJyk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZGV0YWlscyAuc21hbGwnKTtcbiAgICB0aGlzLmRlbW9CdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZW1vLWJ1dHRvbicpO1xuICAgIHRoaXMuY2Fyb3VzZWwgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbCcpO1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0ID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICAgIHRoaXMubGljZW5jZVBhbmVsID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubGljZW5jZS1wYW5lbCcpO1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnN0YWxsLW1lc3NhZ2UnKTtcblxuICAgIC8vIGhpZGUgbWVzc2FnZSBvbiBjbG9zZSBidXR0b24gY2xpY2tcbiAgICBsZXQgaW5zdGFsbE1lc3NhZ2VDbG9zZSA9IHRoaXMuaW5zdGFsbE1lc3NhZ2UucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtY2xvc2UnKTtcbiAgICBpbnN0YWxsTWVzc2FnZUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGlkZSh0aGlzLmluc3RhbGxNZXNzYWdlKSk7XG5cbiAgICAvLyBpbml0IGludGVyYWN0aXZlIGVsZW1lbnRzXG4gICAgaW5pdFBhbmVsKHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICBpbml0SW1hZ2VTY3JvbGxlcih0aGlzLmNhcm91c2VsKTtcblxuICAgIC8vIGZpcmUgZXZlbnRzIG9uIGJ1dHRvbiBjbGlja1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2stYnV0dG9uJykpO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2luc3RhbGwnLCB0aGlzLCB0aGlzLmluc3RhbGxCdXR0b24pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIHZpZXcgYXMgYSBIVE1MRWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZVZpZXcgKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtZGV0YWlsJztcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJhY2stYnV0dG9uIGljb24tYXJyb3ctdGhpY2tcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLXdyYXBwZXJcIj48aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmUgY29udGVudC10eXBlLWltYWdlXCIgc3JjPVwiJHtub0ljb259XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWRldGFpbHNcIj5cbiAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPjwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bmVyXCI+PC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3M9XCJzbWFsbFwiPjwvcD5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbiBkZW1vLWJ1dHRvblwiIHRhcmdldD1cIl9ibGFua1wiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBocmVmPVwiI1wiPkNvbnRlbnQgRGVtbzwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbFwiIHJvbGU9XCJyZWdpb25cIiBkYXRhLXNpemU9XCI1XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIHByZXZpb3VzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGlzYWJsZWQ+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1idXR0b24gbmV4dFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRpc2FibGVkPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgIDxuYXYgY2xhc3M9XCJzY3JvbGxlclwiPlxuICAgICAgICAgIDx1bD48L3VsPlxuICAgICAgICA8L25hdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGhyIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5zdGFsbC1tZXNzYWdlIG1lc3NhZ2UgZGlzbWlzc2libGUgc2ltcGxlIGluZm9cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtY2xvc2UgaWNvbi1jbG9zZVwiPjwvZGl2PlxuICAgICAgICA8aDM+PC9oMz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1iYXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnkgYnV0dG9uLXVzZVwiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBkYXRhLWlkPVwiXCI+VXNlPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGF0YS1pZD1cIlwiPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj5JbnN0YWxsPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsaW5nXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHNwYW4gY2xhc3M9XCJpY29uLWxvYWRpbmctc2VhcmNoIGljb24tc3BpblwiPjwvc3Bhbj5JbnN0YWxsaW5nPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZ3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIGxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGVyXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1jb250cm9scz1cImxpY2VuY2UtcGFuZWxcIj48c3BhbiBjbGFzcz1cImljb24tYWNjb3JkaW9uLWFycm93XCI+PC9zcGFuPiBUaGUgTGljZW5jZSBJbmZvPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIiBpZD1cImxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5LWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBtZXNzYWdlIG9uIGluc3RhbGxcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBzdWNjZXNzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAqL1xuICBzZXRJbnN0YWxsTWVzc2FnZSh7IHN1Y2Nlc3MgPSB0cnVlLCBtZXNzYWdlIH0pe1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UucXVlcnlTZWxlY3RvcignaDMnKS5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UuY2xhc3NOYW1lID0gYGluc3RhbGwtbWVzc2FnZSBkaXNtaXNzaWJsZSBtZXNzYWdlIHNpbXBsZSAke3N1Y2Nlc3MgPyAnaW5mbycgOiAnZXJyb3InfWA7XG4gICAgc2hvdyh0aGlzLmluc3RhbGxNZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBpbWFnZXMgZnJvbSB0aGUgY2Fyb3VzZWxcbiAgICovXG4gIHJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwoKSB7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWxMaXN0KSk7XG4gICAgdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWwtbGlnaHRib3gnKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaW1hZ2UgdG8gdGhlIGNhcm91c2VsXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbWFnZVxuICAgKi9cbiAgYWRkSW1hZ2VUb0Nhcm91c2VsKGltYWdlKSB7XG4gICAgLy8gYWRkIGxpZ2h0Ym94XG4gICAgY29uc3QgbGlnaHRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsaWdodGJveC5pZCA9IGBsaWdodGJveC0ke3RoaXMuY2Fyb3VzZWxMaXN0LmNoaWxkRWxlbWVudENvdW50fWA7XG4gICAgbGlnaHRib3guY2xhc3NOYW1lID0gJ2Nhcm91c2VsLWxpZ2h0Ym94JztcbiAgICBsaWdodGJveC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBsaWdodGJveC5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZS51cmx9XCIgYWx0PVwiJHtpbWFnZS5hbHR9XCI+YDtcbiAgICB0aGlzLmNhcm91c2VsLmFwcGVuZENoaWxkKGxpZ2h0Ym94KTtcblxuICAgIC8vIGFkZCB0aHVtYm5haWxcbiAgICBjb25zdCB0aHVtYm5haWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRodW1ibmFpbC5jbGFzc05hbWUgPSAnc2xpZGUnO1xuICAgIHRodW1ibmFpbC5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ltYWdlLnVybH1cIiBhbHQ9XCIke2ltYWdlLmFsdH1cIiBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgYXJpYS1jb250cm9scz1cIiR7bGlnaHRib3guaWR9XCIgLz5gO1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0LmFwcGVuZENoaWxkKHRodW1ibmFpbCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgaGlkZSh0aGlzLmluc3RhbGxNZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbWFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gICAqL1xuICBzZXRJbWFnZShzcmMpIHtcbiAgICB0aGlzLmltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjIHx8IG5vSWNvbik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRJZChpZCkge1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICAgIHRoaXMudXNlQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gYCR7dGl0bGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XG4gICAgaWYodGV4dC5sZW5ndGggPiBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OKSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9PHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvblxuICAgICAgICAucXVlcnlTZWxlY3RvcignLnJlYWQtbW9yZSwgLnJlYWQtbGVzcycpXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgUmVhZCBsZXNzIGFuZCBSZWFkIG1vcmUgdGV4dFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgdG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSB7XG4gICAgLy8gZmxpcCBib29sZWFuXG4gICAgdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkID0gIXRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZDtcblxuICAgIGlmKHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCkge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0ZXh0fTxzcGFuIGNsYXNzPVwicmVhZC1sZXNzIGxpbmtcIj5SZWFkIGxlc3M8L3NwYW4+YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9PHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgIH1cblxuICAgIHRoaXMuZGVzY3JpcHRpb25cbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcucmVhZC1tb3JlLCAucmVhZC1sZXNzJylcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvcnRlbnMgYSBzdHJpbmcsIGFuZCBwdXRzIGFuIGVsaXBzaXMgYXQgdGhlIGVuZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgZWxsaXBzaXMoc2l6ZSwgdGV4dCkge1xuICAgIHJldHVybiBgJHt0ZXh0LnN1YnN0cigwLCBzaXplKX0uLi5gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxpY2VuY2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICovXG4gIHNldExpY2VuY2UodHlwZSkge1xuICAgIGlmKHR5cGUpe1xuICAgICAgdGhpcy5saWNlbmNlUGFuZWwucXVlcnlTZWxlY3RvcignLnBhbmVsLWJvZHktaW5uZXInKS5pbm5lclRleHQgPSB0eXBlO1xuICAgICAgc2hvdyh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlkZSh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyXG4gICAqL1xuICBzZXRPd25lcihvd25lcikge1xuICAgIGlmKG93bmVyKSB7XG4gICAgICB0aGlzLm93bmVyLmlubmVySFRNTCA9IGBCeSAke293bmVyfWA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5vd25lci5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZXhhbXBsZSB1cmxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgc2V0RXhhbXBsZSh1cmwpIHtcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmRlbW9CdXR0b24sICFpc0VtcHR5KHVybCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgaWYgdGhlIGNvbnRlbnQgdHlwZSBpcyBpbnN0YWxsZWRcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBpbnN0YWxsZWRcbiAgICovXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xuICAgIHRoaXMuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoaW5zdGFsbGVkID8gJy5idXR0b24tdXNlJyA6ICcuYnV0dG9uLWluc3RhbGwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyBhbGwgYnV0dG9ucyBhbmQgc2hvd3MgdGhlIGJ1dHRvbiBvbiB0aGUgc2VsZWN0b3IgYWdhaW5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9c2VsZWN0b3JcbiAgICovXG4gIHNob3dCdXR0b25CeVNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICBpZihidXR0b24pIHtcbiAgICAgIGhpZGVBbGwodGhpcy5idXR0b25zKTtcbiAgICAgIHNob3coYnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlRGV0YWlsVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXdcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBzZXJ2aWNlcykge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gc2VydmljZXM7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlRGV0YWlsVmlldyhzdGF0ZSk7XG4gICAgdGhpcy52aWV3Lm9uKCdpbnN0YWxsJywgdGhpcy5pbnN0YWxsLCB0aGlzKTtcblxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ2Nsb3NlJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBsb2FkQnlJZChpZCkge1xuICAgIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICAgaW5zdGFsbCh7aWR9KSB7XG4gICAgIC8vIHNldCBzcGlubmVyXG4gICAgIHRoaXMudmlldy5zaG93QnV0dG9uQnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsaW5nJyk7XG5cbiAgICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gdGhpcy5zZXJ2aWNlcy5pbnN0YWxsQ29udGVudFR5cGUoY29udGVudFR5cGUubWFjaGluZU5hbWUpKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IHtcbiAgICAgICAgIHRoaXMudmlldy5zZXRJc0luc3RhbGxlZCh0cnVlKTtcbiAgICAgICAgIHRoaXMudmlldy5zaG93QnV0dG9uQnlTZWxlY3RvcignLmJ1dHRvbi1nZXQnKTtcbiAgICAgICAgIHRoaXMudmlldy5zZXRJbnN0YWxsTWVzc2FnZSh7XG4gICAgICAgICAgIG1lc3NhZ2U6IGAke2NvbnRlbnRUeXBlLnRpdGxlfSBzdWNjZXNzZnVsbHkgaW5zdGFsbGVkIWAsXG4gICAgICAgICB9KTtcbiAgICAgICB9KVxuICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICB0aGlzLnZpZXcuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoJy5idXR0b24taW5zdGFsbCcpO1xuXG4gICAgICAgICAvLyBwcmludCBlcnJvciBtZXNzYWdlXG4gICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gKGVycm9yLmVycm9yQ29kZSkgPyBlcnJvciA6IHtcbiAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgIGVycm9yQ29kZTogJ1JFU1BPTlNFX0ZBSUxFRCcsXG4gICAgICAgICAgIG1lc3NhZ2U6IGAke2lkfSBjb3VsZCBub3QgYmUgaW5zdGFsbGVkISBDb250YWN0IHlvdXIgYWRtaW5pc3RyYXRvci5gLFxuICAgICAgICAgfTtcbiAgICAgICAgIHRoaXMudmlldy5zZXRJbnN0YWxsTWVzc2FnZShlcnJvck1lc3NhZ2UpO1xuXG4gICAgICAgICAvLyBsb2cgd2hvbGUgZXJyb3IgbWVzc2FnZSB0byBjb25zb2xlXG4gICAgICAgICBjb25zb2xlLmVycm9yKCdJbnN0YWxsYXRpb24gZXJyb3InLCBlcnJvcik7XG4gICAgICAgfSk7XG4gICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZpZXcgd2l0aCB0aGUgY29udGVudCB0eXBlIGRhdGFcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZSkge1xuICAgIHRoaXMudmlldy5yZXNldCgpO1xuICAgIHRoaXMudmlldy5zZXRJZChjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG4gICAgdGhpcy52aWV3LnNldFRpdGxlKGNvbnRlbnRUeXBlLnRpdGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0RGVzY3JpcHRpb24oY29udGVudFR5cGUuZGVzY3JpcHRpb24pO1xuICAgIHRoaXMudmlldy5zZXRJbWFnZShjb250ZW50VHlwZS5pY29uKTtcbiAgICB0aGlzLnZpZXcuc2V0RXhhbXBsZShjb250ZW50VHlwZS5leGFtcGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0T3duZXIoY29udGVudFR5cGUub3duZXIpO1xuICAgIHRoaXMudmlldy5zZXRJc0luc3RhbGxlZChjb250ZW50VHlwZS5pbnN0YWxsZWQpO1xuICAgIHRoaXMudmlldy5zZXRMaWNlbmNlKGNvbnRlbnRUeXBlLmxpY2Vuc2UpO1xuXG4gICAgLy8gdXBkYXRlIGNhcm91c2VsXG4gICAgdGhpcy52aWV3LnJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwoKTtcbiAgICBjb250ZW50VHlwZS5zY3JlZW5zaG90cy5mb3JFYWNoKHRoaXMudmlldy5hZGRJbWFnZVRvQ2Fyb3VzZWwsIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSwgcmVtb3ZlQ2hpbGQgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBub0ljb24gZnJvbSAnLi4vLi4vaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmcnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3RWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtbGlzdCc7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCByb3dzIGZyb20gcm9vdCBlbGVtZW50XG4gICAqL1xuICByZW1vdmVBbGxSb3dzKCkge1xuICAgIHdoaWxlKHRoaXMucm9vdEVsZW1lbnQuaGFzQ2hpbGROb2RlcygpICl7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMucm9vdEVsZW1lbnQubGFzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHJvd1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgYWRkUm93KGNvbnRlbnRUeXBlKSB7XG4gICAgY29uc3Qgcm93ID0gdGhpcy5jcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgdGhpcyk7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3Jvdy1zZWxlY3RlZCcsIHRoaXMsIHJvdyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChyb3cpXG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSBDb250ZW50IFR5cGUgY29uZmlndXJhdGlvbiBhbmQgY3JlYXRlcyBhIHJvdyBkb21cbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gc2NvcGVcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgc2NvcGUpIHtcbiAgICAvLyByb3cgaXRlbVxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuaWQgPSBgY29udGVudC10eXBlLSR7Y29udGVudFR5cGUubWFjaGluZU5hbWV9YDtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcblxuICAgIC8vIGNyZWF0ZSBidXR0b24gY29uZmlnXG4gICAgY29uc3QgdXNlQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnVXNlJywgY2xzOiAnYnV0dG9uLXByaW1hcnknLCBpY29uOiAnJyB9O1xuICAgIGNvbnN0IGluc3RhbGxCdXR0b25Db25maWcgPSB7IHRleHQ6ICdHZXQnLCBjbHM6ICdidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsJywgaWNvbjogJ2ljb24tYXJyb3ctdGhpY2snfTtcbiAgICBjb25zdCBidXR0b24gPSBjb250ZW50VHlwZS5pbnN0YWxsZWQgPyAgdXNlQnV0dG9uQ29uZmlnOiBpbnN0YWxsQnV0dG9uQ29uZmlnO1xuXG4gICAgY29uc3QgdGl0bGUgPSBjb250ZW50VHlwZS50aXRsZSB8fCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGNvbnRlbnRUeXBlLnN1bW1hcnkgfHwgJyc7XG5cbiAgICBjb25zdCBpbWFnZSA9IGNvbnRlbnRUeXBlLmljb24gfHwgbm9JY29uO1xuXG4gICAgLy8gY3JlYXRlIGh0bWxcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cIiR7aW1hZ2V9XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiAke2J1dHRvbi5jbHN9XCIgZGF0YS1pZD1cIiR7Y29udGVudFR5cGUubWFjaGluZU5hbWV9XCIgdGFiaW5kZXg9XCIwXCI+PHNwYW4gY2xhc3M9XCIke2J1dHRvbi5pY29ufVwiPjwvc3Bhbj4ke2J1dHRvbi50ZXh0fTwvc3Bhbj5cbiAgICAgIDxoND4ke3RpdGxlfTwvaDQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke2Rlc2NyaXB0aW9ufTwvZGl2PlxuICAgYDtcblxuICAgIC8vIGhhbmRsZSB1c2UgYnV0dG9uXG4gICAgY29uc3QgdXNlQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXByaW1hcnknKTtcbiAgICBpZih1c2VCdXR0b24pe1xuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHNjb3BlLCB1c2VCdXR0b24pO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZUxpc3RWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1saXN0LXZpZXdcIjtcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogUm93IHNlbGVjdGVkIGV2ZW50XG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBVcGRhdGUgY29udGVudCB0eXBlIGxpc3QgZXZlbnRcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3QjdXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3QjdXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdGhlIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZUxpc3RWaWV3KHN0YXRlKTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3Jvdy1zZWxlY3RlZCcsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoaXMgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgdGhpcyBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBsaXN0IHdpdGggbmV3IGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZXMpIHtcbiAgICB0aGlzLnZpZXcucmVtb3ZlQWxsUm93cygpO1xuICAgIGNvbnRlbnRUeXBlcy5mb3JFYWNoKHRoaXMudmlldy5hZGRSb3csIHRoaXMudmlldyk7XG4gICAgdGhpcy5maXJlKCd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnLCB7fSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2aWV3cyByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsImltcG9ydCBNZXNzYWdlVmlldyBmcm9tIFwiLi4vbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlld1wiO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlLCBxdWVyeVNlbGVjdG9yQWxsIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBpbml0TWVudSBmcm9tICdjb21wb25lbnRzL21lbnUnO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCB1bnNlbGVjdEFsbCA9IGZvckVhY2gocmVtb3ZlQXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykpO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50QnJvd3NlclZpZXcge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoc3RhdGUpO1xuXG4gICAgLy8gcGljayBlbGVtZW50c1xuICAgIHRoaXMubWVudSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignbmF2Jyk7XG4gICAgdGhpcy5tZW51YmFyID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLW5hdicpO1xuICAgIHRoaXMuaW5wdXRGaWVsZCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignW3JvbGU9XCJzZWFyY2hcIl0gaW5wdXQnKTtcbiAgICB0aGlzLmRpc3BsYXlTZWxlY3RlZCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci10b2dnbGVyLXNlbGVjdGVkJyk7XG4gICAgY29uc3QgaW5wdXRCdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwic2VhcmNoXCJdIC5pbnB1dC1ncm91cC1hZGRvbicpO1xuXG4gICAgLy8gaW5wdXQgZmllbGRcbiAgICB0aGlzLmlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICB0aGlzLmZpcmUoJ3NlYXJjaCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBxdWVyeTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgICBrZXlDb2RlOiBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGlucHV0IGJ1dHRvblxuICAgIGlucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgIGxldCBzZWFyY2hiYXIgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKTtcblxuICAgICAgIHRoaXMuZmlyZSgnc2VhcmNoJywge1xuICAgICAgICAgZWxlbWVudDogc2VhcmNoYmFyLFxuICAgICAgICAgcXVlcnk6IHNlYXJjaGJhci52YWx1ZSxcbiAgICAgICAgIGtleUNvZGU6IDEzIC8vIEFjdCBsaWtlIGFuICdlbnRlcicga2V5IHByZXNzXG4gICAgICAgfSk7XG5cbiAgICAgICBzZWFyY2hiYXIuZm9jdXMoKTtcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIG1lbnUgZ3JvdXAgZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVFbGVtZW50KHN0YXRlKSB7XG4gICAgbGV0IG1lbnV0aXRsZSA9ICdCcm93c2UgY29udGVudCB0eXBlcyc7XG4gICAgbGV0IG1lbnVJZCA9ICdjb250ZW50LXR5cGUtZmlsdGVyJztcbiAgICBsZXQgc2VhcmNoVGV4dCA9ICdTZWFyY2ggZm9yIENvbnRlbnQgVHlwZXMnO1xuXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLXNlY3Rpb24tdmlldyc7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwibWVudS1ncm91cFwiPlxuICAgICAgICA8bmF2ICByb2xlPVwibWVudWJhclwiIGNsYXNzPVwibmF2YmFyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhci1oZWFkZXJcIj5cbiAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdmJhci10b2dnbGVyIG5hdmJhci10b2dnbGVyLXJpZ2h0XCIgYXJpYS1jb250cm9scz1cIiR7bWVudUlkfVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlci1zZWxlY3RlZFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1hY2NvcmRpb24tYXJyb3dcIj48L3NwYW4+XG4gICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItYnJhbmRcIj4ke21lbnV0aXRsZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8dWwgaWQ9XCIke21lbnVJZH1cIiBjbGFzcz1cIm5hdmJhci1uYXZcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3VsPlxuICAgICAgICA8L25hdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIiByb2xlPVwic2VhcmNoXCI+XG4gICAgICAgICAgPGlucHV0IGlkPVwiaHViLXNlYXJjaC1iYXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtcm91bmRlZFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCIke3NlYXJjaFRleHR9XCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaWNvbi1zZWFyY2hcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBkaXNwbGF5TWVzc2FnZShjb25maWcpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy8gU2V0IHRoZSBhY3Rpb25cbiAgICAvLyBUT0RPIC0gc2hvdWxkIGJlIHRyYW5zbGF0YWJsZVxuICAgIGNvbmZpZy5hY3Rpb24gPSBcIlJlbG9hZFwiO1xuXG4gICAgdmFyIG1lc3NhZ2VWaWV3ID0gbmV3IE1lc3NhZ2VWaWV3KGNvbmZpZyk7XG4gICAgdmFyIGVsZW1lbnQgPSBtZXNzYWdlVmlldy5nZXRFbGVtZW50KCk7XG5cbiAgICBtZXNzYWdlVmlldy5vbignYWN0aW9uLWNsaWNrZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XG4gICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICBzZWxmLmZpcmUoJ3JlbG9hZCcpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZVZpZXcuZ2V0RWxlbWVudCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbWVudSBpdGVtXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZCBEZXRlcm1pbmVzIGlmIHRhYiBpcyBhbHJlYWR5IHNlbGVjdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiBldmVudCB0aGF0IHRhYiB3aWxsIGZpcmUgb2ZmXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgYWRkTWVudUl0ZW0oeyB0aXRsZSwgaWQsIHNlbGVjdGVkLCBldmVudE5hbWUgfSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnVpdGVtJyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBpZCk7XG4gICAgZWxlbWVudC5pbm5lclRleHQgPSB0aXRsZTtcblxuICAgIC8vIHNldHMgaWYgdGhpcyBtZW51aXRlbSBzaG91bGQgYmUgc2VsZWN0ZWRcbiAgICBpZihzZWxlY3RlZCkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgdGhpcy5kaXNwbGF5U2VsZWN0ZWQuaW5uZXJUZXh0ID0gdGl0bGU7XG4gICAgfVxuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgnbWVudS1zZWxlY3RlZCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBjaG9pY2U6IGV2ZW50TmFtZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgdG8gbWVudSBiYXJcbiAgICB0aGlzLm1lbnViYXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBpbnB1dCBmaWVsZFxuICAgKi9cbiAgY2xlYXJJbnB1dEZpZWxkKCkge1xuICAgIHRoaXMuaW5wdXRGaWVsZC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBmaWx0ZXJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdGVkTmFtZVxuICAgKi9cbiAgc2V0RGlzcGxheVNlbGVjdGVkKHNlbGVjdGVkTmFtZSkge1xuICAgIHRoaXMuZGlzcGxheVNlbGVjdGVkLmlubmVyVGV4dCA9IHNlbGVjdGVkTmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIGEgbWVudSBpdGVtIGJ5IGlkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2VsZWN0TWVudUl0ZW1CeUlkKGlkKSB7XG4gICAgY29uc3QgbWVudUl0ZW1zID0gdGhpcy5tZW51YmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKTtcbiAgICBjb25zdCBzZWxlY3RlZE1lbnVJdGVtID0gdGhpcy5tZW51YmFyLnF1ZXJ5U2VsZWN0b3IoYFtyb2xlPVwibWVudWl0ZW1cIl1bZGF0YS1pZD1cIiR7aWR9XCJdYCk7XG5cbiAgICBpZihzZWxlY3RlZE1lbnVJdGVtKSB7XG4gICAgICB1bnNlbGVjdEFsbChtZW51SXRlbXMpO1xuICAgICAgc2VsZWN0ZWRNZW51SXRlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXG4gICAgICB0aGlzLmZpcmUoJ21lbnUtc2VsZWN0ZWQnLCB7XG4gICAgICAgIGVsZW1lbnQ6IHNlbGVjdGVkTWVudUl0ZW0sXG4gICAgICAgIGlkOiBzZWxlY3RlZE1lbnVJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpbml0TWVudSgpIHtcbiAgICAvLyBjcmVhdGUgdGhlIHVuZGVybGluZVxuICAgIGNvbnN0IHVuZGVybGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB1bmRlcmxpbmUuY2xhc3NOYW1lID0gJ21lbnVpdGVtLXVuZGVybGluZSc7XG4gICAgdGhpcy5tZW51YmFyLmFwcGVuZENoaWxkKHVuZGVybGluZSk7XG5cbiAgICAvLyBjYWxsIGluaXQgbWVudSBmcm9tIHNka1xuICAgIGluaXRNZW51KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRleHQgc3R5bGVzIGFuZCB0aGUgbWVudSB1bmRlcmxpbmVcbiAgICovXG4gIGFkZERlYWN0aXZhdGVkU3R5bGVUb01lbnUoKSB7XG4gICAgdGhpcy5tZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2RlYWN0aXZhdGVkJyk7XG4gIH1cbiAgLyoqXG4gICAqIFJlc3RvcmVzIHRleHQgc3R5bGVzIGFuZCB0aGUgbWVudSB1bmRlcmxpbmVcbiAgICovXG4gIHJlbW92ZURlYWN0aXZhdGVkU3R5bGVGcm9tTWVudSgpIHtcbiAgICB0aGlzLm1lbnUuY2xhc3NMaXN0LmFkZChcImRlYWN0aXZhdGVkXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsImltcG9ydCBDb250ZW50VHlwZVNlY3Rpb25WaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXdcIjtcbmltcG9ydCBTZWFyY2hTZXJ2aWNlIGZyb20gXCIuLi9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZVwiO1xuaW1wb3J0IENvbnRlbnRUeXBlTGlzdCBmcm9tICcuLi9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdCc7XG5pbXBvcnQgQ29udGVudFR5cGVEZXRhaWwgZnJvbSAnLi4vY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsJztcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMvZXJyb3JzJztcblxuLyoqXG4gKiBUYWIgc2VjdGlvbiBjb25zdGFudHNcbiAqL1xuY29uc3QgQ29udGVudFR5cGVTZWN0aW9uVGFicyA9IHtcbiAgQUxMOiB7XG4gICAgaWQ6ICdmaWx0ZXItYWxsJyxcbiAgICB0aXRsZTogJ0FsbCcsXG4gICAgZXZlbnROYW1lOiAnYWxsJ1xuICB9LFxuICBNWV9DT05URU5UX1RZUEVTOiB7XG4gICAgaWQ6ICdmaWx0ZXItbXktY29udGVudC10eXBlcycsXG4gICAgdGl0bGU6ICdNeSBDb250ZW50IFR5cGVzJyxcbiAgICBldmVudE5hbWU6ICdteS1jb250ZW50LXR5cGVzJyxcbiAgICBzZWxlY3RlZDogdHJ1ZVxuICB9LFxuICBNT1NUX1BPUFVMQVI6IHtcbiAgICBpZDogJ2ZpbHRlci1tb3N0LXBvcHVsYXInLFxuICAgIHRpdGxlOiAnTW9zdCBQb3B1bGFyJyxcbiAgICBldmVudE5hbWU6ICdtb3N0LXBvcHVsYXInLFxuICAgIGZpbHRlclByb3BlcnR5OiAncG9wdWxhcml0eSdcbiAgfVxufTtcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqIEBwYXJhbSB7SHViU2VydmljZXN9IHNlcnZpY2VzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSwgc2VydmljZXMpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIHRoaXMudHlwZUFoZWFkRW5hYmxlZCA9IHRydWU7XG5cbiAgICAvLyBhZGQgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb25WaWV3KHN0YXRlKTtcblxuICAgIC8vIGNvbnRyb2xsZXJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZShzZXJ2aWNlcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbCA9IG5ldyBDb250ZW50VHlwZURldGFpbCh7fSwgc2VydmljZXMpO1xuXG4gICAgLy8gYWRkIG1lbnUgaXRlbXNcbiAgICBmb3IgKGNvbnN0IHRhYiBpbiBDb250ZW50VHlwZVNlY3Rpb25UYWJzKSB7XG4gICAgICBpZiAoQ29udGVudFR5cGVTZWN0aW9uVGFicy5oYXNPd25Qcm9wZXJ0eSh0YWIpKSB7XG4gICAgICAgIHRoaXMudmlldy5hZGRNZW51SXRlbShDb250ZW50VHlwZVNlY3Rpb25UYWJzW3RhYl0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnZpZXcuaW5pdE1lbnUoKTtcblxuICAgIC8vIEVsZW1lbnQgZm9yIGhvbGRpbmcgbGlzdCBhbmQgZGV0YWlscyB2aWV3c1xuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtdHlwZS1zZWN0aW9uJyk7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gc2VjdGlvbjtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVMaXN0LmdldEVsZW1lbnQoKSk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmdldEVsZW1lbnQoKSk7XG5cbiAgICB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCddLCB0aGlzLmNvbnRlbnRUeXBlTGlzdCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydyZWxvYWQnXSwgdGhpcy52aWV3KTtcblxuICAgIC8vIHJlZ2lzdGVyIGxpc3RlbmVyc1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5zZWFyY2gsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy52aWV3LnNlbGVjdE1lbnVJdGVtQnlJZC5iaW5kKHRoaXMudmlldywgQ29udGVudFR5cGVTZWN0aW9uVGFicy5BTEwuaWQpKTtcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMucmVzZXRNZW51T25FbnRlciwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy5hcHBseVNlYXJjaEZpbHRlciwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy5jbGVhcklucHV0RmllbGQsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMudXBkYXRlRGlzcGxheVNlbGVjdGVkLCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5vbigncm93LXNlbGVjdGVkJywgdGhpcy5zaG93RGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignc2VsZWN0JywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xuXG4gICAgdGhpcy5pbml0Q29udGVudFR5cGVMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdCB3aXRoIGEgc2VhcmNoXG4gICAqL1xuICBpbml0Q29udGVudFR5cGVMaXN0KCkge1xuICAgIC8vIGluaXRpYWxpemUgYnkgc2VhcmNoXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChcIlwiKVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKVxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgZXJyb3JzIGNvbW11bmljYXRpbmcgd2l0aCBIVUJcbiAgICovXG4gIGhhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgLy8gVE9ETyAtIHVzZSB0cmFuc2xhdGlvbiBzeXN0ZW06XG4gICAgdGhpcy52aWV3LmRpc3BsYXlNZXNzYWdlKHtcbiAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICB0aXRsZTogJ05vdCBhYmxlIHRvIGNvbW11bmljYXRlIHdpdGggaHViLicsXG4gICAgICBjb250ZW50OiAnRXJyb3Igb2NjdXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4nXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgYSBzZWFyY2ggYW5kIHVwZGF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICAgKi9cbiAgc2VhcmNoKHtxdWVyeSwga2V5Q29kZX0pIHtcbiAgICBpZiAodGhpcy50eXBlQWhlYWRFbmFibGVkIHx8IGtleUNvZGUgPT09IDEzKSB7IC8vIFNlYXJjaCBhdXRvbWF0aWNhbGx5IG9yIG9uICdlbnRlcidcbiAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2gocXVlcnkpXG4gICAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGRpc3BsYXllZCBuYW1lIG9mIHRoZSBzZWxlY3RlZCBmaWx0ZXIgZm9yIG1vYmlsZVxuICAgKlxuICAgKiBAcGFyYW0ge1NlbGVjdGVkRWxlbWVudH0gZXZlbnRcbiAgICovXG4gIHVwZGF0ZURpc3BsYXlTZWxlY3RlZChldmVudCkge1xuICAgIHRoaXMudmlldy5zZXREaXNwbGF5U2VsZWN0ZWQoZXZlbnQuZWxlbWVudC5pbm5lclRleHQpO1xuICB9XG5cbiAgcmVzZXRNZW51T25FbnRlcih7a2V5Q29kZX0pIHtcbiAgICBpZiAoa2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHRoaXMuY2xvc2VEZXRhaWxWaWV3KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgc2VhcmNoIGZpbHRlciBkZXBlbmRpbmcgb24gd2hhdCBldmVudCBpdCByZWNlaXZlc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBFdmVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZS5jaG9pY2UgRXZlbnQgbmFtZSBvZiBjaG9zZW4gdGFiXG4gICAqL1xuICBhcHBseVNlYXJjaEZpbHRlcihlKSB7XG4gICAgc3dpdGNoKGUuY2hvaWNlKSB7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlU2VjdGlvblRhYnMuTU9TVF9QT1BVTEFSLmV2ZW50TmFtZTpcbiAgICAgICAgLy8gRmlsdGVyIG9uIHRhYidzIGZpbHRlciBwcm9wZXJ0eSwgdGhlbiB1cGRhdGUgY29udGVudCB0eXBlIGxpc3RcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgLmZpbHRlcihDb250ZW50VHlwZVNlY3Rpb25UYWJzLk1PU1RfUE9QVUxBUi5maWx0ZXJQcm9wZXJ0eSlcbiAgICAgICAgICAudGhlbihjdHMgPT4ge3RoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjdHMpfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgaW5wdXQgZmllbGRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBjbGVhcklucHV0RmllbGQoe2lkfSkge1xuICAgIGlmIChpZCAhPT0gQ29udGVudFR5cGVTZWN0aW9uVGFicy5BTEwuaWQpIHtcbiAgICAgIHRoaXMudmlldy5jbGVhcklucHV0RmllbGQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgZGV0YWlsIHZpZXdcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzaG93RGV0YWlsVmlldyh7aWR9KSB7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwubG9hZEJ5SWQoaWQpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuc2hvdygpO1xuICAgIHRoaXMudHlwZUFoZWFkRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudmlldy5yZW1vdmVEZWFjdGl2YXRlZFN0eWxlRnJvbU1lbnUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgY2xvc2VEZXRhaWxWaWV3KCkge1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LnNob3coKTtcbiAgICB0aGlzLnR5cGVBaGVhZEVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMudmlldy5hZGREZWFjdGl2YXRlZFN0eWxlVG9NZW51KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwiaW1wb3J0ICcuL3V0aWxzL2ZldGNoJztcbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gQ29udGVudFR5cGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGNoVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN1bW1hcnlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjcmVhdGVkQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVkX0F0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaXNSZWNvbW1lbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBvcHVsYXJpdHlcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHNjcmVlbnNob3RzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGljZW5zZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV4YW1wbGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0dXRvcmlhbFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0ga2V5d29yZHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvd25lclxuICogQHByb3BlcnR5IHtib29sZWFufSBpbnN0YWxsZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVzdHJpY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBhcGlSb290VXJsIH0pIHtcbiAgICB0aGlzLmFwaVJvb3RVcmwgPSBhcGlSb290VXJsO1xuICAgIHRoaXMuc2V0dXAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCB0aGUgY29udGVudCB0eXBlIG1ldGFkYXRhXG4gICAqL1xuICBzZXR1cCgpIHtcbiAgICB0aGlzLmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50LXR5cGUtY2FjaGVgLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pXG4gICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgLnRoZW4odGhpcy5pc1ZhbGlkKVxuICAgIC50aGVuKGpzb24gPT4ganNvbi5saWJyYXJpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSAge0NvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cbiAgICovXG4gIGlzVmFsaWQocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT59XG4gICAqL1xuICBjb250ZW50VHlwZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVkQ29udGVudFR5cGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBDb250ZW50IFR5cGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVkQ29udGVudFR5cGVzLnRoZW4oY29udGVudFR5cGVzID0+IHtcbiAgICAgIHJldHVybiBjb250ZW50VHlwZXMuZmlsdGVyKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lID09PSBtYWNoaW5lTmFtZSlbMF07XG4gICAgfSk7XG5cbiAgICAvKnJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9Y29udGVudF90eXBlX2NhY2hlLyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTsqL1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbGxzIGEgY29udGVudCB0eXBlIG9uIHRoZSBzZXJ2ZXJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGluc3RhbGxDb250ZW50VHlwZShpZCkge1xuICAgIHJldHVybiBmZXRjaChucy5nZXRBamF4VXJsKCdsaWJyYXJ5LWluc3RhbGwnLCB7aWQ6IGlkfSksIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6ICcnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XG4gIH1cblxuXG4gIC8vIGZvciB0ZXN0aW5nIHdpdGggZXJyb3JcbiAgLyppbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktaW5zdGFsbGAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9Ki9cblxuICAvKipcbiAgICogVXBsb2FkcyBhIGNvbnRlbnQgdHlwZSB0byB0aGUgc2VydmVyIGZvciB2YWxpZGF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7Rm9ybURhdGF9IGZvcm1EYXRhIEZvcm0gY29udGFpbmluZyB0aGUgaDVwIHRoYXQgc2hvdWxkIGJlIHVwbG9hZGVkIGFzICdoNXAnXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBqc29uIGNvbnRhaW5pbmcgdGhlIGNvbnRlbnQganNvbiBhbmQgdGhlIGg1cCBqc29uXG4gICAqL1xuICB1cGxvYWRDb250ZW50KGZvcm1EYXRhKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1saWJyYXJ5LXVwbG9hZGAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6IGZvcm1EYXRhXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi1zZXJ2aWNlcy5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxuaW1wb3J0IGluaXRUYWJQYW5lbCBmcm9tIFwiY29tcG9uZW50cy90YWItcGFuZWxcIlxuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4vdXRpbHMvZXZlbnRzJztcbi8qKlxuICogVGFiIGNoYW5nZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjdGFiLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBQYW5lbCBvcGVuIG9yIGNsb3NlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyNwYW5lbC1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9EQVRBX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YlZpZXcjdGFiLWNoYW5nZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJWaWV3IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgdGhpcy5yZW5kZXJUYWJQYW5lbChzdGF0ZSk7XG4gICAgdGhpcy5yZW5kZXJQYW5lbChzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBwYW5lbFxuICAgKi9cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICogQHBhcmFtIHtib29sZWFufSBleHBhbmRlZFxuICAgKi9cbiAgcmVuZGVyUGFuZWwoe3RpdGxlID0gJycsIHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGl0bGUuY2xhc3NOYW1lICs9IFwicGFuZWwtaGVhZGVyIGljb24taHViLWljb25cIjtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWApO1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3BhbmVsLWNoYW5nZScsIHRoaXMsIHRoaXMudGl0bGUpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYm9keS5jbGFzc05hbWUgKz0gXCJwYW5lbC1ib2R5XCI7XG4gICAgdGhpcy5ib2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLmJvZHkuaWQgPSBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSBgcGFuZWwgaDVwLXNlY3Rpb24tJHtzZWN0aW9uSWR9YDtcbiAgICBpZihleHBhbmRlZCl7XG4gICAgICB0aGlzLnBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICB9XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuYm9keSk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSArPSBgaDVwLWh1YiBoNXAtc2RrYDtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuICAgIGluaXRQYW5lbCh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaWYgcGFuZWwgaXMgb3BlbiwgdGhpcyBpcyB1c2VkIGZvciBvdXRlciBib3JkZXIgY29sb3JcbiAgICovXG4gIHRvZ2dsZVBhbmVsT3BlbigpIHtcbiAgICBsZXQgcGFuZWwgPSB0aGlzLnBhbmVsO1xuICAgIGlmKGlzT3BlbihwYW5lbCkpIHtcbiAgICAgIHBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgnb3BlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtwYW5lbC5xdWVyeVNlbGVjdG9yKCcjaHViLXNlYXJjaC1iYXInKS5mb2N1cygpfSwyMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHRhYiBwYW5lbFxuICAgKi9cbiAgcmVuZGVyVGFiUGFuZWwoc3RhdGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnRhYmxpc3QuY2xhc3NOYW1lICs9IFwidGFibGlzdFwiO1xuICAgIHRoaXMudGFibGlzdC5zZXRBdHRyaWJ1dGUgKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgdGhpcy50YWJMaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxpc3QpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5jbGFzc05hbWUgKz0gJ3RhYi1wYW5lbCc7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGFiTGlzdFdyYXBwZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0YWJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcbiAgICovXG4gIGFkZFRhYih7dGl0bGUsIGlkLCBjb250ZW50LCBzZWxlY3RlZCA9IGZhbHNlfSkge1xuICAgIGNvbnN0IHRhYklkID0gYHRhYi0ke2lkfWA7XG4gICAgY29uc3QgdGFiUGFuZWxJZCA9IGB0YWItcGFuZWwtJHtpZH1gO1xuXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0YWIuY2xhc3NOYW1lICs9ICd0YWInO1xuICAgIHRhYi5pZCA9IHRhYklkO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0YWJQYW5lbElkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQudG9TdHJpbmcoKSk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfREFUQV9JRCwgaWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XG4gICAgdGFiLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCd0YWItY2hhbmdlJywgdGhpcywgdGFiKTtcblxuICAgIGNvbnN0IHRhYlBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFiUGFuZWwuaWQgPSB0YWJQYW5lbElkO1xuICAgIHRhYlBhbmVsLmNsYXNzTmFtZSArPSAndGFicGFuZWwnO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJsbGVkYnknLCB0YWJJZCk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghc2VsZWN0ZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xuICAgIHRhYlBhbmVsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKHRhYik7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRhYlBhbmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGFuaW1hdGVkIGJvcmRlciB0byB0aGUgYm90dG9tIG9mIHRoZSB0YWJcbiAgICovXG4gIGFkZEJvdHRvbUJvcmRlcigpIHtcbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcbiAgfVxuXG4gIGluaXRUYWJQYW5lbCgpIHtcbiAgICBpbml0VGFiUGFuZWwodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0U2VjdGlvblR5cGUoe2lkfSkge1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lID0gYGg1cC1zZWN0aW9uLSR7aWR9IHBhbmVsYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwiaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7cmVsYXlDbGlja0V2ZW50QXN9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRCcm93c2VyVmlld1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VWaWV3IHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLnR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLnRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS5jb250ZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RhdGUuYWN0aW9uXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlLmRpc21pc3NhYmxlXVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoc3RhdGUpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChtZXNzYWdlKSB7XG4gICAgLy8gQ3JlYXRlIHdyYXBwZXI6XG4gICAgY29uc3QgbWVzc2FnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZXNzYWdlV3JhcHBlci5jbGFzc05hbWUgPSBgbWVzc2FnZSAke21lc3NhZ2UudHlwZX1gICsgKG1lc3NhZ2UuZGlzbWlzc2libGUgPyAnIGRpc21pc3NpYmxlJyA6ICcnKTtcblxuICAgIC8vIEFkZCBjbG9zZSBidXR0b24gaWYgZGlzbWlzYWJsZVxuICAgIGlmIChtZXNzYWdlLmRpc21pc3NpYmxlKSB7XG4gICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2Nsb3NlJztcbiAgICAgIC8vY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyYjeDI3MTUnO1xuICAgICAgLy8gVE9ET1xuICAgICAgLy8gLSBBZGQgY2xvc2UgbGFiZWwgZnJvbSB0cmFuc2xhdGlvbnNcbiAgICAgIC8vIC0gQWRkIHZpc3VhbHMgaW4gQ1NTIChmb250IGljb24pXG4gICAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnY2xvc2UnLCB0aGlzLCBjbG9zZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZXNzYWdlQ29udGVudC5jbGFzc05hbWUgPSAnbWVzc2FnZS1jb250ZW50JztcbiAgICBtZXNzYWdlQ29udGVudC5pbm5lckhUTUwgPSAnPGgxPicgKyBtZXNzYWdlLnRpdGxlICsgJzwvaDE+JyArICc8cD4nICsgbWVzc2FnZS5jb250ZW50ICsgJzwvcD4nO1xuICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VDb250ZW50KTtcblxuICAgIGlmIChtZXNzYWdlLmFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBtZXNzYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBtZXNzYWdlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24nO1xuICAgICAgbWVzc2FnZUJ1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlLmFjdGlvbjtcbiAgICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VCdXR0b24pO1xuXG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnYWN0aW9uLWNsaWNrZWQnLCB0aGlzLCBtZXNzYWdlQnV0dG9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZVdyYXBwZXI7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9tZXNzYWdlLXZpZXcvbWVzc2FnZS12aWV3LmpzIiwiaW1wb3J0IHtjdXJyeX0gZnJvbSAndXRpbHMvZnVuY3Rpb25hbCdcblxuLyoqXG4gKiBAY2xhc3NcbiAqIFRoZSBTZWFyY2ggU2VydmljZSBnZXRzIGEgY29udGVudCB0eXBlIGZyb20gaHViLXNlcnZpY2VzLmpzXG4gKiBpbiB0aGUgZm9ybSBvZiBhIHByb21pc2UuIEl0IHRoZW4gZ2VuZXJhdGVzIGEgc2NvcmUgYmFzZWRcbiAqIG9uIHRoZSBkaWZmZXJlbnQgd2VpZ2h0aW5ncyBvZiB0aGUgY29udGVudCB0eXBlIGZpZWxkcyBhbmRcbiAqIHNvcnRzIHRoZSByZXN1bHRzIGJhc2VkIG9uIHRoZSBnZW5lcmF0ZWQgc2NvcmUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTZXJ2aWNlc30gc2VydmljZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNlcnZpY2VzKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IHNlcnZpY2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgc2VhcmNoXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW10+fSBBIHByb21pc2Ugb2YgYW4gYXJyYXkgb2YgY29udGVudCB0eXBlc1xuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5KSB7XG4gICAgLy8gQWRkIGNvbnRlbnQgdHlwZXMgdG8gdGhlIHNlYXJjaCBpbmRleFxuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlcygpLnRoZW4oZmlsdGVyQnlRdWVyeShxdWVyeSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlciBhbGwgY29udGVudCB0eXBlcyBieSBnaXZlbiBwcm9wZXJ0eVxuICAgKlxuICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT58Kn1cbiAgICovXG4gIGZpbHRlcihwcm9wZXJ0eSkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlcygpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gY29udGVudFR5cGVzLnNvcnQoKGN0MSwgY3QyKSA9PiB7XG5cbiAgICAgICAgLy8gUHJvcGVydHkgZG9lcyBub3QgZXhpc3QsIG1vdmUgdG8gYm90dG9tXG4gICAgICAgIGlmICghY3QxLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjdDIuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU29ydCBvbiBwcm9wZXJ0eVxuICAgICAgICBpZiAoY3QxW3Byb3BlcnR5XSA+IGN0Mltwcm9wZXJ0eV0pIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjdDFbcHJvcGVydHldIDwgY3QyW3Byb3BlcnR5XSkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICB9XG59XG5cbi8qKlxuICogRmlsdGVycyBhIGxpc3Qgb2YgY29udGVudCB0eXBlcyBiYXNlZCBvbiBhIHF1ZXJ5XG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICovXG5jb25zdCBmaWx0ZXJCeVF1ZXJ5ID0gY3VycnkoZnVuY3Rpb24ocXVlcnksIGNvbnRlbnRUeXBlcykge1xuICBpZiAocXVlcnkgPT0gJycpIHtcbiAgICByZXR1cm4gY29udGVudFR5cGVzO1xuICB9XG5cbiAgLy8gQXBwZW5kIGEgc2VhcmNoIHNjb3JlIHRvIGVhY2ggY29udGVudCB0eXBlXG4gIHJldHVybiBjb250ZW50VHlwZXMubWFwKGNvbnRlbnRUeXBlID0+XG4gICAgKHtcbiAgICAgIGNvbnRlbnRUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIHNjb3JlOiBnZXRTZWFyY2hTY29yZShxdWVyeSwgY29udGVudFR5cGUpXG4gICAgfSkpXG4gICAgLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0LnNjb3JlID4gMClcbiAgICAuc29ydChzb3J0U2VhcmNoUmVzdWx0cykgLy8gU29ydCBieSBpbnN0YWxsZWQsIHJlbGV2YW5jZSBhbmQgcG9wdWxhcml0eVxuICAgIC5tYXAocmVzdWx0ID0+IHJlc3VsdC5jb250ZW50VHlwZSk7IC8vIFVud3JhcCByZXN1bHQgb2JqZWN0O1xufSk7XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIEFycmF5LnNvcnQoKVxuICogQ29tcGFyZXMgdHdvIGNvbnRlbnQgdHlwZXMgb24gZGlmZmVyZW50IGNyaXRlcmlhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgRmlyc3QgY29udGVudCB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gYiBTZWNvbmQgY29udGVudCB0eXBlXG4gKiBAcmV0dXJuIHtpbnR9XG4gKi9cbmNvbnN0IHNvcnRTZWFyY2hSZXN1bHRzID0gKGEsYikgPT4ge1xuICBpZiAoIWEuY29udGVudFR5cGUuaW5zdGFsbGVkICYmIGIuY29udGVudFR5cGUuaW5zdGFsbGVkKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAoYS5jb250ZW50VHlwZS5pbnN0YWxsZWQgJiYgIWIuY29udGVudFR5cGUuaW5zdGFsbGVkKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgZWxzZSBpZiAoYi5zY29yZSAhPT0gYS5zY29yZSkge1xuICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZTtcbiAgfVxuXG4gIGVsc2Uge1xuICAgIHJldHVybiBiLmNvbnRlbnRUeXBlLnBvcHVsYXJpdHkgLSBhLmNvbnRlbnRUeXBlLnBvcHVsYXJpdHk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB3ZWlnaHRpbmcgZm9yIGRpZmZlcmVudCBzZWFyY2ggdGVybXMgYmFzZWRcbiAqIG9uIGV4aXN0ZW5jZSBvZiBzdWJzdHJpbmdzXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBxdWVyeVxuICogQHBhcmFtICB7T2JqZWN0fSBjb250ZW50VHlwZVxuICogQHJldHVybiB7aW50fVxuICovXG4gY29uc3QgZ2V0U2VhcmNoU2NvcmUgPSBmdW5jdGlvbihxdWVyeSwgY29udGVudFR5cGUpIHtcbiAgIGxldCBxdWVyaWVzID0gcXVlcnkuc3BsaXQoJyAnKS5maWx0ZXIocXVlcnkgPT4gcXVlcnkgIT09ICcnKTtcbiAgIGxldCBxdWVyeVNjb3JlcyA9IHF1ZXJpZXMubWFwKHF1ZXJ5ID0+IGdldFNjb3JlRm9yRWFjaFF1ZXJ5KHF1ZXJ5LCBjb250ZW50VHlwZSkpO1xuICAgaWYgKHF1ZXJ5U2NvcmVzLmluZGV4T2YoMCkgPiAtMSkge1xuICAgICByZXR1cm4gMDtcbiAgIH1cbiAgIHJldHVybiBxdWVyeVNjb3Jlcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbiB9O1xuXG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmVsZXZhbmNlIHNjb3JlIGZvciBhIHNpbmdsZSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0gIHt0eXBlfSBxdWVyeSAgICAgICBkZXNjcmlwdGlvblxuICogQHBhcmFtICB7dHlwZX0gY29udGVudFR5cGUgZGVzY3JpcHRpb25cbiAqIEByZXR1cm4ge3R5cGV9ICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gKi9cbmNvbnN0IGdldFNjb3JlRm9yRWFjaFF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5LCBjb250ZW50VHlwZSkge1xuICAgcXVlcnkgPSBxdWVyeS50cmltKCk7XG4gICBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS50aXRsZSkpIHtcbiAgICAgcmV0dXJuIDEwMDtcbiAgIH1cbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuc3VtbWFyeSkpIHtcbiAgICAgcmV0dXJuIDU7XG4gICB9XG4gICBlbHNlIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uKSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2UgaWYgKGFycmF5SGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5rZXl3b3JkcykpIHtcbiAgICAgcmV0dXJuIDU7XG4gICB9XG4gICBlbHNlIHtcbiAgICAgcmV0dXJuIDA7XG4gICB9XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG5lZWRsZSBpcyBmb3VuZCBpbiB0aGUgaGF5c3RhY2suXG4gKiBOb3QgY2FzZSBzZW5zaXRpdmVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmVlZGxlXG4gKiBAcGFyYW0ge3N0cmluZ30gaGF5c3RhY2tcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGhhc1N1YlN0cmluZyA9IGZ1bmN0aW9uKG5lZWRsZSwgaGF5c3RhY2spIHtcbiAgaWYgKGhheXN0YWNrID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaGF5c3RhY2sudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5lZWRsZS50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiwgY2hlY2tzIGlmIGFycmF5IGhhcyBjb250YWlucyBhIHN1YnN0cmluZ1xuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gc3ViU3RyaW5nXG4gKiBAcGFyYW0gIHtBcnJheX0gYXJyXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBhcnJheUhhc1N1YlN0cmluZyA9IGZ1bmN0aW9uKHN1YlN0cmluZywgYXJyKSB7XG4gIGlmIChhcnIgPT09IHVuZGVmaW5lZCB8fCBzdWJTdHJpbmcgPT09ICcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGFyci5zb21lKHN0cmluZyA9PiBoYXNTdWJTdHJpbmcoc3ViU3RyaW5nLCBzdHJpbmcpKTtcbn07XG5cbmNvbnN0IEFkZE51bWJlcj1mdW5jdGlvbihhLGIpXG57XG4gIHJldHVybiBhK2I7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsImltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICpcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xuXG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBzZXJ2aWNlcykge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcblxuICAgIC8vIElucHV0IGVsZW1lbnQgZm9yIHRoZSBINVAgZmlsZVxuICAgIGNvbnN0IGg1cFVwbG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaDVwVXBsb2FkLnNldEF0dHJpYnV0ZSgndHlwZScsICdmaWxlJyk7XG5cbiAgICAvLyBTZW5kcyB0aGUgSDVQIGZpbGUgdG8gdGhlIHBsdWdpblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHVzZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdVc2UnO1xuICAgIHVzZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgLy8gQWRkIHRoZSBINVAgZmlsZSB0byBhIGZvcm0sIHJlYWR5IGZvciB0cmFuc3BvcnRhdGlvblxuICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZGF0YS5hcHBlbmQoJ2g1cCcsIGg1cFVwbG9hZC5maWxlc1swXSk7XG5cbiAgICAgIC8vIFVwbG9hZCBjb250ZW50IHRvIHRoZSBwbHVnaW5cbiAgICAgIHRoaXMuc2VydmljZXMudXBsb2FkQ29udGVudChkYXRhKVxuICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAvLyBGaXJlIHRoZSByZWNlaXZlZCBkYXRhIHRvIGFueSBsaXN0ZW5lcnNcbiAgICAgICAgICBzZWxmLmZpcmUoJ3VwbG9hZCcsIGpzb24pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGg1cFVwbG9hZCk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh1c2VCdXR0b24pO1xuXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpXG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCdcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHsgYm9keTogdGhpcy5fYm9keUluaXQgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gICAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcbiAgICB2YXIgcHJlUHJvY2Vzc2VkSGVhZGVycyA9IHJhd0hlYWRlcnMucmVwbGFjZSgvXFxyP1xcbltcXHQgXSsvLCAnICcpXG4gICAgcHJlUHJvY2Vzc2VkSGVhZGVycy5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZmV0Y2guanMiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlLCBjbGFzc0xpc3RDb250YWlucywgcXVlcnlTZWxlY3Rvciwgbm9kZUxpc3RUb0FycmF5IH0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtjdXJyeSwgZm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9TSVpFID0gJ2RhdGEtc2l6ZSc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBkaXNhYmxlID0gc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGVuYWJsZSA9IHJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWRcbiAqL1xuY29uc3QgdG9nZ2xlRW5hYmxlZCA9IChlbGVtZW50LCBlbmFibGVkKSA9PiAoZW5hYmxlZCA/IGVuYWJsZSA6IGRpc2FibGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlkZGVuXG4gKi9cbmNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSBjdXJyeSgoaGlkZGVuLCBlbGVtZW50KSA9PiBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgaGlkZGVuLnRvU3RyaW5nKCksIGVsZW1lbnQpKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGlzRGlzYWJsZWQgPSBoYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbi8qKlxuICogVXBkYXRlIHRoZSB2aWV3XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKi9cbmNvbnN0IHVwZGF0ZVZpZXcgPSAoZWxlbWVudCwgc3RhdGUpID0+IHtcbiAgY29uc3QgcHJldkJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXZpb3VzJyk7XG4gIGNvbnN0IG5leHRCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0Jyk7XG4gIGNvbnN0IGxpc3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gIGNvbnN0IHRvdGFsQ291bnQgPSBsaXN0LmNoaWxkRWxlbWVudENvdW50O1xuXG4gIC8vIHVwZGF0ZSBsaXN0IHNpemVzXG4gIGxpc3Quc3R5bGUud2lkdGggPSBgJHsxMDAgLyBzdGF0ZS5kaXNwbGF5Q291bnQgKiB0b3RhbENvdW50fSVgO1xuICBsaXN0LnN0eWxlLm1hcmdpbkxlZnQgPSBgJHtzdGF0ZS5wb3NpdGlvbiAqICgxMDAgLyBzdGF0ZS5kaXNwbGF5Q291bnQpfSVgO1xuXG4gIC8vIHVwZGF0ZSBpbWFnZSBzaXplc1xuICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHsxMDAgLyB0b3RhbENvdW50fSVgKTtcblxuICAvLyB0b2dnbGUgYnV0dG9uIHZpc2liaWxpdHlcbiAgW3ByZXZCdXR0b24sIG5leHRCdXR0b25dXG4gICAgLmZvckVhY2godG9nZ2xlVmlzaWJpbGl0eShzdGF0ZS5kaXNwbGF5Q291bnQgPj0gdG90YWxDb3VudCkpO1xuXG4gIC8vIHRvZ2dsZSBidXR0b24gZW5hYmxlLCBkaXNhYmxlZFxuICB0b2dnbGVFbmFibGVkKG5leHRCdXR0b24sIHN0YXRlLnBvc2l0aW9uID4gKHN0YXRlLmRpc3BsYXlDb3VudCAtIHRvdGFsQ291bnQpKTtcbiAgdG9nZ2xlRW5hYmxlZChwcmV2QnV0dG9uLCBzdGF0ZS5wb3NpdGlvbiA8IDApO1xufTtcblxuLyoqXG4gKiBIYW5kbGVzIGJ1dHRvbiBjbGlja2VkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBidXR0b25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHVwZGF0ZVN0YXRlXG4gKiBAcGFyYW0ge0V2ZW50fVxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrID0gY3VycnkoKGVsZW1lbnQsIHN0YXRlLCBidXR0b24sIHVwZGF0ZVN0YXRlLCBldmVudCkgPT4ge1xuICBpZighaXNEaXNhYmxlZChidXR0b24pKXtcbiAgICB1cGRhdGVTdGF0ZShzdGF0ZSk7XG4gICAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIGltYWdlXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaW1hZ2VcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpbml0SW1hZ2UgPSBjdXJyeSgoZWxlbWVudCwgaW1hZ2UpID0+IHtcbiAgbGV0IHRhcmdldElkID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gIGxldCB0YXJnZXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhcmdldElkfWApO1xuXG4gIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XG4gIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKSlcbn0pO1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciB3aGVuIHRoZSBkb20gaXMgdXBkYXRlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gcmVjb3JkXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGFuZGxlRG9tVXBkYXRlID0gY3VycnkoKGVsZW1lbnQsIHN0YXRlLCByZWNvcmQpID0+IHtcbiAgLy8gb24gYWRkIGltYWdlIHJ1biBpbml0aWFsaXphdGlvblxuICBpZihyZWNvcmQudHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICBub2RlTGlzdFRvQXJyYXkocmVjb3JkLmFkZGVkTm9kZXMpXG4gICAgICAuZmlsdGVyKGNsYXNzTGlzdENvbnRhaW5zKCdzbGlkZScpKVxuICAgICAgLm1hcChxdWVyeVNlbGVjdG9yKCdpbWcnKSlcbiAgICAgIC5mb3JFYWNoKGluaXRJbWFnZShlbGVtZW50KSk7XG4gIH1cblxuICAvLyB1cGRhdGUgdGhlIHZpZXdcbiAgdXBkYXRlVmlldyhlbGVtZW50LCBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgZGlzcGxheUNvdW50OiBlbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfU0laRSkgfHwgNSxcbiAgICBwb3NpdGlvbjogMFxuICB9KSk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICAvLyBnZXQgYnV0dG9uIGh0bWwgZWxlbWVudHNcbiAgY29uc3QgbmV4dEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQnKTtcbiAgY29uc3QgcHJldkJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXZpb3VzJyk7XG5cbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtvYmplY3R9IEltYWdlU2Nyb2xsZXJTdGF0ZVxuICAgKiBAcHJvcGVydHkge251bWJlcn0gZGlzcGxheUNvdW50XG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwb3NpdGlvblxuICAgKi9cbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgZGlzcGxheUNvdW50OiBlbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfU0laRSkgfHwgNSxcbiAgICBwb3NpdGlvbjogMFxuICB9O1xuXG4gIC8vIGluaXRpYWxpemUgYnV0dG9uc1xuICBuZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2soZWxlbWVudCwgc3RhdGUsIG5leHRCdXR0b24sIHN0YXRlID0+IHN0YXRlLnBvc2l0aW9uLS0pKTtcbiAgcHJldkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrKGVsZW1lbnQsIHN0YXRlLCBwcmV2QnV0dG9uLCBzdGF0ZSA9PiBzdGF0ZS5wb3NpdGlvbisrKSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBpbWFnZXNcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbYXJpYS1jb250cm9sc10nKS5mb3JFYWNoKGluaXRJbWFnZShlbGVtZW50KSk7XG5cbiAgLy8gbGlzdGVuIGZvciB1cGRhdGVzIHRvIGRhdGEtc2l6ZVxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmb3JFYWNoKGhhbmRsZURvbVVwZGF0ZShlbGVtZW50LCBzdGF0ZSkpKTtcblxuICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIHtcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW0FUVFJJQlVURV9TSVpFXVxuICB9KTtcblxuICAvLyBpbml0aWFsaXplIHBvc2l0aW9uXG4gIHVwZGF0ZVZpZXcoZWxlbWVudCwgc3RhdGUpO1xuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZSwgdG9nZ2xlQXR0cmlidXRlLCBoaWRlLCBzaG93LCB0b2dnbGVWaXNpYmlsaXR5fSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcbmltcG9ydCB7IGluaXRDb2xsYXBzaWJsZSB9IGZyb20gJy4uL3V0aWxzL2FyaWEnO1xuXG4vKipcbiAqIFVuc2VsZWN0cyBhbGwgZWxlbWVudHMgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBhcmlhLWV4cGFuZGVkIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50IHRvIGZhbHNlXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5jb25zdCB1bkV4cGFuZCA9IHNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG4vKipcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIC8vIGVsZW1lbnRzXG4gIGNvbnN0IG1lbnVJdGVtcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJtZW51aXRlbVwiXScpO1xuICBjb25zdCB0b2dnbGVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1jb250cm9sc11bYXJpYS1leHBhbmRlZF0nKTtcblxuICAvLyBtb3ZlIHNlbGVjdFxuICBtZW51SXRlbXMuZm9yRWFjaChtZW51SXRlbSA9PiB7XG4gICAgbWVudUl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICB1blNlbGVjdEFsbChtZW51SXRlbXMpO1xuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICB1bkV4cGFuZCh0b2dnbGVyKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gaW5pdCBjb2xsYXBzZSBhbmQgb3BlblxuICBpbml0Q29sbGFwc2libGUoZWxlbWVudCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL21lbnUuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCB1blNlbGVjdEFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJykpO1xuXG4vKipcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIGNvbnN0IHRhYnMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFiXCJdJyk7XG4gIGNvbnN0IHRhYlBhbmVscyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJwYW5lbFwiXScpO1xuXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICB1blNlbGVjdEFsbCh0YWJzKTtcbiAgICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXG4gICAgICBoaWRlQWxsKHRhYlBhbmVscyk7XG5cbiAgICAgIGxldCB0YWJQYW5lbElkID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICAgICAgc2hvdyhlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhYlBhbmVsSWR9YCkpO1xuICAgIH0pO1xuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJyZXF1aXJlKCcuLi8uLi9zcmMvc3R5bGVzL21haW4uc2NzcycpO1xuXG4vLyBMb2FkIGxpYnJhcnlcbkg1UCA9IEg1UCB8fCB7fTtcbkg1UC5IdWJDbGllbnQgPSByZXF1aXJlKCcuLi9zY3JpcHRzL2h1YicpLmRlZmF1bHQ7XG5INVAuSHViQ2xpZW50LnJlbmRlckVycm9yTWVzc2FnZSA9IHJlcXVpcmUoJy4uL3NjcmlwdHMvdXRpbHMvZXJyb3JzJykuZGVmYXVsdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwic291cmNlUm9vdCI6IiJ9