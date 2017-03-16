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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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
exports.default = init;

var _aria = __webpack_require__(5);

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
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjI1Ij4NCiAgPGRlZnM+DQogICAgPHN0eWxlPg0KICAgICAgLmNscy0xIHsNCiAgICAgIGZpbGw6IG5vbmU7DQogICAgICB9DQoNCiAgICAgIC5jbHMtMiB7DQogICAgICBmaWxsOiAjYzZjNmM3Ow0KICAgICAgfQ0KDQogICAgICAuY2xzLTMsIC5jbHMtNCB7DQogICAgICBmaWxsOiAjZmZmOw0KICAgICAgfQ0KDQogICAgICAuY2xzLTMgew0KICAgICAgb3BhY2l0eTogMC43Ow0KICAgICAgfQ0KICAgIDwvc3R5bGU+DQogIDwvZGVmcz4NCiAgPHRpdGxlPmNvbnRlbnQgdHlwZSBwbGFjZWhvbGRlcl8yPC90aXRsZT4NCiAgPGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+DQogICAgPGcgaWQ9ImNvbnRlbnRfdHlwZV9wbGFjZWhvbGRlci0xX2NvcHkiIGRhdGEtbmFtZT0iY29udGVudCB0eXBlIHBsYWNlaG9sZGVyLTEgY29weSI+DQogICAgICA8cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1Ii8+DQogICAgICA8cmVjdCBjbGFzcz0iY2xzLTIiIHg9IjExMi41MSIgeT0iNDMuNDEiIHdpZHRoPSIxNzYuOTYiIGhlaWdodD0iMTM1LjQ1IiByeD0iMTAiIHJ5PSIxMCIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxMzYuNjYiIGN5PSI2MS45OCIgcj0iNC44MSIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxNTEuNDkiIGN5PSI2MS45OCIgcj0iNC44MSIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxNjYuMSIgY3k9IjYxLjk4IiByPSI0LjgxIi8+DQogICAgICA8ZyBpZD0iX0dyb3VwXyIgZGF0YS1uYW1lPSImbHQ7R3JvdXAmZ3Q7Ij4NCiAgICAgICAgPGcgaWQ9Il9Hcm91cF8yIiBkYXRhLW5hbWU9IiZsdDtHcm91cCZndDsiPg0KICAgICAgICAgIDxwYXRoIGlkPSJfQ29tcG91bmRfUGF0aF8iIGRhdGEtbmFtZT0iJmx0O0NvbXBvdW5kIFBhdGgmZ3Q7IiBjbGFzcz0iY2xzLTQiIGQ9Ik0yNjMuMjgsOTUuMjFDMjYwLDkyLjA3LDI1NSw5MS41LDI0OC40Myw5MS41SDIyN3Y4SDE5OS41bC0yLjE3LDEwLjI0YTI1Ljg0LDI1Ljg0LDAsMCwxLDExLjQ4LTEuNjMsMTkuOTMsMTkuOTMsMCwwLDEsMTQuMzksNS41NywxOC4yNiwxOC4yNiwwLDAsMSw1LjUyLDEzLjYsMjMuMTEsMjMuMTEsMCwwLDEtMi44NCwxMS4wNSwxOC42NSwxOC42NSwwLDAsMS04LjA2LDcuNzksOSw5LDAsMCwxLTQuMTIsMS4zN0gyMzZ2LTIxaDEwLjQyYzcuMzYsMCwxMi44My0xLjYxLDE2LjQyLTVzNS4zOC03LjQ4LDUuMzgtMTMuNDRDMjY4LjIyLDEwMi4yOSwyNjYuNTcsOTguMzUsMjYzLjI4LDk1LjIxWm0tMTUsMTdjLTEuNDIsMS4yMi0zLjksMS4yNS03LjQxLDEuMjVIMjM2di0xNGg1LjYyYTkuNTcsOS41NywwLDAsMSw3LDIuOTMsNy4wNSw3LjA1LDAsMCwxLDEuODUsNC45MkE2LjMzLDYuMzMsMCwwLDEsMjQ4LjMxLDExMi4yNVoiLz4NCiAgICAgICAgICA8cGF0aCBpZD0iX1BhdGhfIiBkYXRhLW5hbWU9IiZsdDtQYXRoJmd0OyIgY2xhc3M9ImNscy00IiBkPSJNMjAyLjksMTE5LjExYTguMTIsOC4xMiwwLDAsMC03LjI4LDQuNTJsLTE2LTEuMjIsNy4yMi0zMC45MkgxNzR2MjJIMTUzdi0yMkgxMzZ2NTZoMTd2LTIxaDIxdjIxaDIwLjMxYy0yLjcyLDAtNS0xLjUzLTctM2ExOS4xOSwxOS4xOSwwLDAsMS00LjczLTQuODMsMjMuNTgsMjMuNTgsMCwwLDEtMy02LjZsMTYtMi4yNmE4LjExLDguMTEsMCwxLDAsNy4yNi0xMS43MloiLz4NCiAgICAgICAgPC9nPg0KICAgICAgPC9nPg0KICAgICAgPHJlY3QgY2xhc3M9ImNscy0zIiB4PSIxNzcuNjYiIHk9IjU3LjY2IiB3aWR0aD0iOTIuMjgiIGhlaWdodD0iOS4zOCIgcng9IjMuNSIgcnk9IjMuNSIvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hubView = __webpack_require__(16);

var _hubView2 = _interopRequireDefault(_hubView);

var _contentTypeSection = __webpack_require__(14);

var _contentTypeSection2 = _interopRequireDefault(_contentTypeSection);

var _uploadSection = __webpack_require__(19);

var _uploadSection2 = _interopRequireDefault(_uploadSection);

var _hubServices = __webpack_require__(15);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _eventful = __webpack_require__(0);

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
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
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

var _panel = __webpack_require__(4);

var _panel2 = _interopRequireDefault(_panel);

var _imageScroller = __webpack_require__(21);

var _imageScroller2 = _interopRequireDefault(_imageScroller);

var _events = __webpack_require__(3);

var _contentTypePlaceholder = __webpack_require__(6);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeDetailView = __webpack_require__(9);

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
/* 11 */
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

var _contentTypePlaceholder = __webpack_require__(6);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeListView = __webpack_require__(11);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messageView = __webpack_require__(17);

var _messageView2 = _interopRequireDefault(_messageView);

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

var _events = __webpack_require__(3);

var _menu = __webpack_require__(22);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeSectionView = __webpack_require__(13);

var _contentTypeSectionView2 = _interopRequireDefault(_contentTypeSectionView);

var _searchService = __webpack_require__(18);

var _searchService2 = _interopRequireDefault(_searchService);

var _contentTypeList = __webpack_require__(12);

var _contentTypeList2 = _interopRequireDefault(_contentTypeList);

var _contentTypeDetail = __webpack_require__(10);

var _contentTypeDetail2 = _interopRequireDefault(_contentTypeDetail);

var _eventful = __webpack_require__(0);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(20);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _panel = __webpack_require__(4);

var _panel2 = _interopRequireDefault(_panel);

var _tabPanel = __webpack_require__(23);

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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

var _aria = __webpack_require__(5);

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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(7).default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzA3YjllMjg2NGI5NDk3YWNjZDciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvYXJpYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvbWFpbi5zY3NzPzZhNzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWItc2VydmljZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9mZXRjaC5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3RhYi1wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sIm5hbWVzIjpbIkV2ZW50ZnVsIiwibGlzdGVuZXJzIiwib24iLCJ0eXBlIiwibGlzdGVuZXIiLCJzY29wZSIsInRyaWdnZXIiLCJwdXNoIiwiZmlyZSIsImV2ZW50IiwidHJpZ2dlcnMiLCJldmVyeSIsImNhbGwiLCJwcm9wYWdhdGUiLCJ0eXBlcyIsImV2ZW50ZnVsIiwibmV3VHlwZSIsInNlbGYiLCJmb3JFYWNoIiwiY3VycnkiLCJmbiIsImFyaXR5IiwibGVuZ3RoIiwiZjEiLCJhcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsImFwcGx5IiwiZjIiLCJhcmdzMiIsImNvbmNhdCIsImNvbXBvc2UiLCJmbnMiLCJyZWR1Y2UiLCJmIiwiZyIsImFyciIsIm1hcCIsImZpbHRlciIsInNvbWUiLCJjb250YWlucyIsInZhbHVlIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJ2YWx1ZXMiLCJpbnZlcnNlQm9vbGVhblN0cmluZyIsImJvb2wiLCJ0b1N0cmluZyIsImdldEF0dHJpYnV0ZSIsIm5hbWUiLCJlbCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsImF0dHJpYnV0ZUVxdWFscyIsInRvZ2dsZUF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicGFyZW50IiwiY2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlQ2hpbGQiLCJvbGRDaGlsZCIsImNsYXNzTGlzdENvbnRhaW5zIiwiY2xzIiwiY2xhc3NMaXN0Iiwibm9kZUxpc3RUb0FycmF5Iiwibm9kZUxpc3QiLCJoaWRlIiwic2hvdyIsInRvZ2dsZVZpc2liaWxpdHkiLCJ2aXNpYmxlIiwiZWxlbWVudCIsInJlbGF5Q2xpY2tFdmVudEFzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlkIiwic3RvcFByb3BhZ2F0aW9uIiwiaW5pdCIsImlzRXhwYW5kZWQiLCJpbml0Q29sbGFwc2libGUiLCJ0b2dnbGVyIiwiY29sbGFwc2libGVJZCIsImNvbGxhcHNpYmxlIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVPbGRWYWx1ZSIsImF0dHJpYnV0ZUZpbHRlciIsIkh1YiIsInN0YXRlIiwic2VydmljZXMiLCJhcGlSb290VXJsIiwiY29udGVudFR5cGVTZWN0aW9uIiwidXBsb2FkU2VjdGlvbiIsInZpZXciLCJzZXRQYW5lbFRpdGxlIiwiY2xvc2VQYW5lbCIsInNldFNlY3Rpb25UeXBlIiwidG9nZ2xlUGFuZWxPcGVuIiwiYmluZCIsInNldHVwIiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsImluaXRUYWJQYW5lbCIsIm1hY2hpbmVOYW1lIiwiY29udGVudFR5cGUiLCJnZXRDb250ZW50VHlwZSIsInRoZW4iLCJ0aXRsZSIsInNldFRpdGxlIiwic2VjdGlvbklkIiwidGFiQ29uZmlncyIsImNvbnRlbnQiLCJnZXRFbGVtZW50IiwiY29uZmlnIiwic2VsZWN0ZWQiLCJhZGRUYWIiLCJ0YWJDb25maWciLCJhZGRCb3R0b21Cb3JkZXIiLCJBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEIiwiTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiIsImlzRW1wdHkiLCJ0ZXh0IiwiaGlkZUFsbCIsIkNvbnRlbnRUeXBlRGV0YWlsVmlldyIsInJvb3RFbGVtZW50IiwiY3JlYXRlVmlldyIsImJ1dHRvbkJhciIsInVzZUJ1dHRvbiIsImluc3RhbGxCdXR0b24iLCJidXR0b25zIiwiaW1hZ2UiLCJvd25lciIsImRlc2NyaXB0aW9uIiwiZGVtb0J1dHRvbiIsImNhcm91c2VsIiwiY2Fyb3VzZWxMaXN0IiwibGljZW5jZVBhbmVsIiwiaW5zdGFsbE1lc3NhZ2UiLCJpbnN0YWxsTWVzc2FnZUNsb3NlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJpbm5lclRleHQiLCJsaWdodGJveCIsImNoaWxkRWxlbWVudENvdW50IiwidXJsIiwiYWx0IiwidGh1bWJuYWlsIiwic3JjIiwiZWxsaXBzaXMiLCJ0b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkIiwiZGVzY3JpcHRpb25FeHBhbmRlZCIsInNpemUiLCJzdWJzdHIiLCJpbnN0YWxsZWQiLCJzaG93QnV0dG9uQnlTZWxlY3RvciIsImJ1dHRvbiIsIkNvbnRlbnRUeXBlRGV0YWlsIiwiaW5zdGFsbCIsInVwZGF0ZSIsImluc3RhbGxDb250ZW50VHlwZSIsInNldElzSW5zdGFsbGVkIiwic2V0SW5zdGFsbE1lc3NhZ2UiLCJjYXRjaCIsImVycm9yTWVzc2FnZSIsImVycm9yIiwiZXJyb3JDb2RlIiwiY29uc29sZSIsInJlc2V0Iiwic2V0SWQiLCJzZXREZXNjcmlwdGlvbiIsInNldEltYWdlIiwiaWNvbiIsInNldEV4YW1wbGUiLCJleGFtcGxlIiwic2V0T3duZXIiLCJzZXRMaWNlbmNlIiwibGljZW5zZSIsInJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwiLCJzY3JlZW5zaG90cyIsImFkZEltYWdlVG9DYXJvdXNlbCIsIkNvbnRlbnRUeXBlTGlzdFZpZXciLCJoYXNDaGlsZE5vZGVzIiwibGFzdENoaWxkIiwicm93IiwiY3JlYXRlQ29udGVudFR5cGVSb3ciLCJ1c2VCdXR0b25Db25maWciLCJpbnN0YWxsQnV0dG9uQ29uZmlnIiwic3VtbWFyeSIsIkNvbnRlbnRUeXBlTGlzdCIsImNvbnRlbnRUeXBlcyIsInJlbW92ZUFsbFJvd3MiLCJhZGRSb3ciLCJ1bnNlbGVjdEFsbCIsIkNvbnRlbnRCcm93c2VyVmlldyIsIm1lbnViYXIiLCJpbnB1dEZpZWxkIiwiZGlzcGxheVNlbGVjdGVkIiwiaW5wdXRCdXR0b24iLCJ0YXJnZXQiLCJxdWVyeSIsImtleUNvZGUiLCJ3aGljaCIsInNlYXJjaGJhciIsInBhcmVudEVsZW1lbnQiLCJmb2N1cyIsIm1lbnV0aXRsZSIsIm1lbnVJZCIsInNlYXJjaFRleHQiLCJhY3Rpb24iLCJtZXNzYWdlVmlldyIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJhZGQiLCJldmVudE5hbWUiLCJjaG9pY2UiLCJzZWxlY3RlZE5hbWUiLCJtZW51SXRlbXMiLCJzZWxlY3RlZE1lbnVJdGVtIiwidW5kZXJsaW5lIiwiQ29udGVudFR5cGVTZWN0aW9uVGFicyIsIkFMTCIsIk1ZX0NPTlRFTlRfVFlQRVMiLCJNT1NUX1BPUFVMQVIiLCJmaWx0ZXJQcm9wZXJ0eSIsIkNvbnRlbnRUeXBlU2VjdGlvbiIsInR5cGVBaGVhZEVuYWJsZWQiLCJzZWFyY2hTZXJ2aWNlIiwiY29udGVudFR5cGVMaXN0IiwiY29udGVudFR5cGVEZXRhaWwiLCJ0YWIiLCJoYXNPd25Qcm9wZXJ0eSIsImFkZE1lbnVJdGVtIiwiaW5pdE1lbnUiLCJzZWN0aW9uIiwic2VhcmNoIiwic2VsZWN0TWVudUl0ZW1CeUlkIiwicmVzZXRNZW51T25FbnRlciIsImFwcGx5U2VhcmNoRmlsdGVyIiwiY2xlYXJJbnB1dEZpZWxkIiwidXBkYXRlRGlzcGxheVNlbGVjdGVkIiwic2hvd0RldGFpbFZpZXciLCJjbG9zZURldGFpbFZpZXciLCJoYW5kbGVFcnJvciIsImRpc3BsYXlNZXNzYWdlIiwic2V0RGlzcGxheVNlbGVjdGVkIiwiZSIsImN0cyIsImxvYWRCeUlkIiwiSHViU2VydmljZXMiLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwicmVzdWx0IiwianNvbiIsImlzVmFsaWQiLCJsaWJyYXJpZXMiLCJyZXNwb25zZSIsIm1lc3NhZ2VDb2RlIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJucyIsImdldEFqYXhVcmwiLCJib2R5IiwiZm9ybURhdGEiLCJBVFRSSUJVVEVfREFUQV9JRCIsImlzT3BlbiIsIkh1YlZpZXciLCJyZW5kZXJUYWJQYW5lbCIsInJlbmRlclBhbmVsIiwiZXhwYW5kZWQiLCJ0YWJDb250YWluZXJFbGVtZW50IiwicGFuZWwiLCJzZXRUaW1lb3V0IiwidGFibGlzdCIsInRhYkxpc3RXcmFwcGVyIiwidGFiSWQiLCJ0YWJQYW5lbElkIiwidGFiUGFuZWwiLCJNZXNzYWdlVmlldyIsIm1lc3NhZ2VXcmFwcGVyIiwiZGlzbWlzc2libGUiLCJjbG9zZUJ1dHRvbiIsIm1lc3NhZ2VDb250ZW50IiwidW5kZWZpbmVkIiwibWVzc2FnZUJ1dHRvbiIsIlNlYXJjaFNlcnZpY2UiLCJmaWx0ZXJCeVF1ZXJ5IiwicHJvcGVydHkiLCJzb3J0IiwiY3QxIiwiY3QyIiwic2NvcmUiLCJnZXRTZWFyY2hTY29yZSIsInNvcnRTZWFyY2hSZXN1bHRzIiwiYSIsImIiLCJwb3B1bGFyaXR5IiwicXVlcmllcyIsInNwbGl0IiwicXVlcnlTY29yZXMiLCJnZXRTY29yZUZvckVhY2hRdWVyeSIsInRyaW0iLCJoYXNTdWJTdHJpbmciLCJhcnJheUhhc1N1YlN0cmluZyIsImtleXdvcmRzIiwibmVlZGxlIiwiaGF5c3RhY2siLCJ0b0xvd2VyQ2FzZSIsInN1YlN0cmluZyIsInN0cmluZyIsIkFkZE51bWJlciIsIlVwbG9hZFNlY3Rpb24iLCJoNXBVcGxvYWQiLCJ0ZXh0Q29udGVudCIsImRhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImZpbGVzIiwidXBsb2FkQ29udGVudCIsInN1cHBvcnQiLCJzZWFyY2hQYXJhbXMiLCJpdGVyYWJsZSIsIlN5bWJvbCIsImJsb2IiLCJCbG9iIiwiYXJyYXlCdWZmZXIiLCJ2aWV3Q2xhc3NlcyIsImlzRGF0YVZpZXciLCJvYmoiLCJEYXRhVmlldyIsImlzUHJvdG90eXBlT2YiLCJpc0FycmF5QnVmZmVyVmlldyIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwiT2JqZWN0Iiwibm9ybWFsaXplTmFtZSIsIlN0cmluZyIsInRlc3QiLCJUeXBlRXJyb3IiLCJub3JtYWxpemVWYWx1ZSIsIml0ZXJhdG9yRm9yIiwiaXRlbXMiLCJpdGVyYXRvciIsIm5leHQiLCJzaGlmdCIsImRvbmUiLCJIZWFkZXJzIiwiaGVhZGVycyIsImlzQXJyYXkiLCJoZWFkZXIiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwib2xkVmFsdWUiLCJnZXQiLCJoYXMiLCJzZXQiLCJjYWxsYmFjayIsInRoaXNBcmciLCJrZXlzIiwiZW50cmllcyIsImNvbnN1bWVkIiwiYm9keVVzZWQiLCJmaWxlUmVhZGVyUmVhZHkiLCJyZWFkZXIiLCJvbmxvYWQiLCJvbmVycm9yIiwicmVhZEJsb2JBc0FycmF5QnVmZmVyIiwiRmlsZVJlYWRlciIsInByb21pc2UiLCJyZWFkQXNBcnJheUJ1ZmZlciIsInJlYWRCbG9iQXNUZXh0IiwicmVhZEFzVGV4dCIsInJlYWRBcnJheUJ1ZmZlckFzVGV4dCIsImJ1ZiIsIlVpbnQ4QXJyYXkiLCJjaGFycyIsImkiLCJmcm9tQ2hhckNvZGUiLCJqb2luIiwiYnVmZmVyQ2xvbmUiLCJieXRlTGVuZ3RoIiwiYnVmZmVyIiwiQm9keSIsIl9pbml0Qm9keSIsIl9ib2R5SW5pdCIsIl9ib2R5VGV4dCIsIl9ib2R5QmxvYiIsIl9ib2R5Rm9ybURhdGEiLCJVUkxTZWFyY2hQYXJhbXMiLCJfYm9keUFycmF5QnVmZmVyIiwiRXJyb3IiLCJyZWplY3RlZCIsImRlY29kZSIsIkpTT04iLCJwYXJzZSIsIm1ldGhvZHMiLCJub3JtYWxpemVNZXRob2QiLCJ1cGNhc2VkIiwidG9VcHBlckNhc2UiLCJSZXF1ZXN0IiwiaW5wdXQiLCJvcHRpb25zIiwibW9kZSIsInJlZmVycmVyIiwiY2xvbmUiLCJmb3JtIiwiYnl0ZXMiLCJyZXBsYWNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFyc2VIZWFkZXJzIiwicmF3SGVhZGVycyIsInByZVByb2Nlc3NlZEhlYWRlcnMiLCJsaW5lIiwicGFydHMiLCJrZXkiLCJSZXNwb25zZSIsImJvZHlJbml0Iiwic3RhdHVzIiwib2siLCJzdGF0dXNUZXh0IiwicmVkaXJlY3RTdGF0dXNlcyIsInJlZGlyZWN0IiwiUmFuZ2VFcnJvciIsImxvY2F0aW9uIiwicmVxdWVzdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwicmVzcG9uc2VVUkwiLCJyZXNwb25zZVRleHQiLCJvbnRpbWVvdXQiLCJvcGVuIiwid2l0aENyZWRlbnRpYWxzIiwicmVzcG9uc2VUeXBlIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJwb2x5ZmlsbCIsIkFUVFJJQlVURV9TSVpFIiwiZGlzYWJsZSIsImVuYWJsZSIsInRvZ2dsZUVuYWJsZWQiLCJlbmFibGVkIiwiaGlkZGVuIiwiaXNEaXNhYmxlZCIsInVwZGF0ZVZpZXciLCJwcmV2QnV0dG9uIiwibmV4dEJ1dHRvbiIsImxpc3QiLCJ0b3RhbENvdW50Iiwic3R5bGUiLCJ3aWR0aCIsImRpc3BsYXlDb3VudCIsIm1hcmdpbkxlZnQiLCJwb3NpdGlvbiIsIm9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrIiwidXBkYXRlU3RhdGUiLCJpbml0SW1hZ2UiLCJ0YXJnZXRJZCIsImhhbmRsZURvbVVwZGF0ZSIsInJlY29yZCIsImFkZGVkTm9kZXMiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwidW5TZWxlY3RBbGwiLCJ1bkV4cGFuZCIsIm1lbnVJdGVtIiwidGFicyIsInRhYlBhbmVscyIsInJlcXVpcmUiLCJINVAiLCJIdWJDbGllbnQiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hFQTs7O0FBR08sSUFBTUEsOEJBQVcsU0FBWEEsUUFBVztBQUFBLFNBQU87QUFDN0JDLGVBQVcsRUFEa0I7O0FBRzdCOzs7Ozs7Ozs7O0FBVUFDLFFBQUksWUFBU0MsSUFBVCxFQUFlQyxRQUFmLEVBQXlCQyxLQUF6QixFQUFnQztBQUNsQzs7Ozs7QUFLQSxVQUFNQyxVQUFVO0FBQ2Qsb0JBQVlGLFFBREU7QUFFZCxpQkFBU0M7QUFGSyxPQUFoQjs7QUFLQSxXQUFLSixTQUFMLENBQWVFLElBQWYsSUFBdUIsS0FBS0YsU0FBTCxDQUFlRSxJQUFmLEtBQXdCLEVBQS9DO0FBQ0EsV0FBS0YsU0FBTCxDQUFlRSxJQUFmLEVBQXFCSSxJQUFyQixDQUEwQkQsT0FBMUI7O0FBRUEsYUFBTyxJQUFQO0FBQ0QsS0E1QjRCOztBQThCN0I7Ozs7Ozs7OztBQVNBRSxVQUFNLGNBQVNMLElBQVQsRUFBZU0sS0FB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QUFFN0MrYyxrQkFBWUcsSUFBWjtBQUNBbGQsWUFBTXFNLE1BQU4sQ0FBYXpKLFlBQWIsQ0FBMEIsZUFBMUIsRUFBMkMsTUFBM0M7O0FBRUF5RSxjQUFROFYsU0FBUjs7QUFFQSxVQUFJOUwsYUFBYXJSLE1BQU1xTSxNQUFOLENBQWE1SixZQUFiLENBQTBCLGVBQTFCLENBQWpCO0FBQ0FzQixXQUFLRyxRQUFRZCxhQUFSLE9BQTBCaU8sVUFBMUIsQ0FBTDtBQUNELEtBVEQ7QUFVRCxHQVhEO0FBWUQsQzs7Ozs7Ozs7O0FDdkNELG1CQUFBK0wsQ0FBUSxDQUFSOztBQUVBO0FBQ0FDLE1BQU1BLE9BQU8sRUFBYjtBQUNBQSxJQUFJQyxTQUFKLEdBQWdCLG1CQUFBRixDQUFRLENBQVIsRUFBMEJHLE9BQTFDLEMiLCJmaWxlIjoiaDVwLWh1Yi1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzA3YjllMjg2NGI5NDk3YWNjZDciLCIvKipcbiAqIEBtaXhpblxuICovXG5leHBvcnQgY29uc3QgRXZlbnRmdWwgPSAoKSA9PiAoe1xuICBsaXN0ZW5lcnM6IHt9LFxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gZXZlbnRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IFtzY29wZV1cbiAgICpcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge0V2ZW50ZnVsfVxuICAgKi9cbiAgb246IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBzY29wZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmIHtvYmplY3R9IFRyaWdnZXJcbiAgICAgKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzY29wZVxuICAgICAqL1xuICAgIGNvbnN0IHRyaWdnZXIgPSB7XG4gICAgICAnbGlzdGVuZXInOiBsaXN0ZW5lcixcbiAgICAgICdzY29wZSc6IHNjb3BlXG4gICAgfTtcblxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaCh0cmlnZ2VyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGaXJlIGV2ZW50LiBJZiBhbnkgb2YgdGhlIGxpc3RlbmVycyByZXR1cm5zIGZhbHNlLCByZXR1cm4gZmFsc2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtvYmplY3R9IFtldmVudF1cbiAgICpcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBmaXJlOiBmdW5jdGlvbih0eXBlLCBldmVudCkge1xuICAgIGNvbnN0IHRyaWdnZXJzID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XG5cbiAgICByZXR1cm4gdHJpZ2dlcnMuZXZlcnkoZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgcmV0dXJuIHRyaWdnZXIubGlzdGVuZXIuY2FsbCh0cmlnZ2VyLnNjb3BlIHx8IHRoaXMsIGV2ZW50KSAhPT0gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIExpc3RlbnMgZm9yIGV2ZW50cyBvbiBhbm90aGVyIEV2ZW50ZnVsLCBhbmQgcHJvcGFnYXRlIGl0IHRyb3VnaCB0aGlzIEV2ZW50ZnVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IHR5cGVzXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IGV2ZW50ZnVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZXZlbnROYW1lXSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgd2hlbiBwcm9wb2dhdGVkXG4gICAqL1xuICBwcm9wYWdhdGU6IGZ1bmN0aW9uKHR5cGVzLCBldmVudGZ1bCwgbmV3VHlwZSkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICB0eXBlcy5mb3JFYWNoKHR5cGUgPT4gZXZlbnRmdWwub24odHlwZSwgZXZlbnQgPT4gc2VsZi5maXJlKG5ld1R5cGUgfHwgdHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwiLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICpcbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGN1cnJ5ID0gZnVuY3Rpb24oZm4pIHtcbiAgY29uc3QgYXJpdHkgPSBmbi5sZW5ndGg7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKCkge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+PSBhcml0eSkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBmMigpIHtcbiAgICAgICAgY29uc3QgYXJnczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICByZXR1cm4gZjEuYXBwbHkobnVsbCwgYXJncy5jb25jYXQoYXJnczIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIENvbXBvc2UgZnVuY3Rpb25zIHRvZ2V0aGVyLCBleGVjdXRpbmcgZnJvbSByaWdodCB0byBsZWZ0XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbi4uLn0gZm5zXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKC4uLmZucykgPT4gZm5zLnJlZHVjZSgoZiwgZykgPT4gKC4uLmFyZ3MpID0+IGYoZyguLi5hcmdzKSkpO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JFYWNoID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgYXJyLmZvckVhY2goZm4pO1xufSk7XG5cbi8qKlxuICogTWFwcyBhIGZ1bmN0aW9uIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgbWFwID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5tYXAoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZpbHRlciB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBzb21lIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgc29tZSA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuc29tZShmbik7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgYSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSBjdXJyeShmdW5jdGlvbiAodmFsdWUsIGFycikge1xuICByZXR1cm4gYXJyLmluZGV4T2YodmFsdWUpICE9IC0xO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSBzdXBwbGllZCB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgd2l0aG91dCA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZXMsIGFycikge1xuICByZXR1cm4gZmlsdGVyKHZhbHVlID0+ICFjb250YWlucyh2YWx1ZSwgdmFsdWVzKSwgYXJyKVxufSk7XG5cbi8qKlxuICogVGFrZXMgYSBzdHJpbmcgdGhhdCBpcyBlaXRoZXIgJ3RydWUnIG9yICdmYWxzZScgYW5kIHJldHVybnMgdGhlIG9wcG9zaXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJvb2xcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBpbnZlcnNlQm9vbGVhblN0cmluZyA9IGZ1bmN0aW9uIChib29sKSB7XG4gIHJldHVybiAoYm9vbCAhPT0gJ3RydWUnKS50b1N0cmluZygpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9mdW5jdGlvbmFsLmpzIiwiaW1wb3J0IHtjdXJyeSwgaW52ZXJzZUJvb2xlYW5TdHJpbmd9IGZyb20gJy4vZnVuY3Rpb25hbCdcblxuLyoqXG4gKiBHZXQgYW4gYXR0cmlidXRlIHZhbHVlIGZyb20gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0QXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIFNldCBhbiBhdHRyaWJ1dGUgb24gYSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2V0QXR0cmlidXRlID0gY3VycnkoKG5hbWUsIHZhbHVlLCBlbCkgPT4gZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSk7XG5cbi8qKlxuICogUmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0F0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwuaGFzQXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGUgdGhhdCBlcXVhbHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUVxdWFscyA9IGN1cnJ5KChuYW1lLCB2YWx1ZSwgZWwpID0+IGVsLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWUpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYW4gYXR0cmlidXRlIGJldHdlZW4gJ3RydWUnIGFuZCAnZmFsc2UnO1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiB7XG4gIGNvbnN0IHZhbHVlID0gZ2V0QXR0cmlidXRlKG5hbWUsIGVsKTtcbiAgc2V0QXR0cmlidXRlKG5hbWUsIGludmVyc2VCb29sZWFuU3RyaW5nKHZhbHVlKSwgZWwpO1xufSk7XG5cbi8qKlxuICogVGhlIGFwcGVuZENoaWxkKCkgbWV0aG9kIGFkZHMgYSBub2RlIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3Qgb2YgY2hpbGRyZW4gb2YgYSBzcGVjaWZpZWQgcGFyZW50IG5vZGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjaGlsZFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBhcHBlbmRDaGlsZCA9IGN1cnJ5KChwYXJlbnQsIGNoaWxkKSA9PiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgYSBkZXNjZW5kYW50IG9mIHRoZSBlbGVtZW50IG9uIHdoaWNoIGl0IGlzIGludm9rZWRcbiAqIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIHNlbGVjdG9ycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3IgPSBjdXJyeSgoc2VsZWN0b3IsIGVsKSA9PiBlbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5vbi1saXZlIE5vZGVMaXN0IG9mIGFsbCBlbGVtZW50cyBkZXNjZW5kZWQgZnJvbSB0aGUgZWxlbWVudCBvbiB3aGljaCBpdFxuICogaXMgaW52b2tlZCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBDU1Mgc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge05vZGVMaXN0fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvckFsbCA9IGN1cnJ5KChzZWxlY3RvciwgZWwpID0+IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcblxuLyoqXG4gKiBUaGUgcmVtb3ZlQ2hpbGQoKSBtZXRob2QgcmVtb3ZlcyBhIGNoaWxkIG5vZGUgZnJvbSB0aGUgRE9NLiBSZXR1cm5zIHJlbW92ZWQgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IHBhcmVudFxuICogQHBhcmFtIHtOb2RlfSBvbGRDaGlsZFxuICpcbiAqIEByZXR1cm4ge05vZGV9XG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVDaGlsZCA9IGN1cnJ5KChwYXJlbnQsIG9sZENoaWxkKSA9PiBwYXJlbnQucmVtb3ZlQ2hpbGQob2xkQ2hpbGQpKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBub2RlIGhhcyBhIGNsYXNzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGNsYXNzTGlzdENvbnRhaW5zID0gY3VycnkoKGNscywgZWwpID0+IGVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMpKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgTm9kZUxpc3QgdG8gYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge05vZGVMaXN0fSBub2RlTGlzdFxuICpcbiAqIEByZXR1cm4ge05vZGVbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IG5vZGVMaXN0VG9BcnJheSA9IG5vZGVMaXN0ID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVMaXN0KTtcblxuLyoqXG4gKiBBZGRzIGFyaWEtaGlkZGVuPXRydWUgdG8gYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEFkZHMgYXJpYS1oaWRkZW49ZmFsc2UgdG8gYW4gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYXJpYS1oaWRkZW4gb24gYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IGN1cnJ5KCh2aXNpYmxlLCBlbGVtZW50KSA9PiAodmlzaWJsZSA/IHNob3cgOiBoaWRlKShlbGVtZW50KSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5cbi8qKlxuICogIFRyYW5zZm9ybXMgYSBET00gY2xpY2sgZXZlbnQgaW50byBhbiBFdmVudGZ1bCdzIGV2ZW50XG4gKiAgQHNlZSBFdmVudGZ1bFxuICpcbiAqIEBwYXJhbSAge3N0cmluZyB8IE9iamVjdH0gdHlwZVxuICogQHBhcmFtICB7RXZlbnRmdWx9IGV2ZW50ZnVsXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCByZWxheUNsaWNrRXZlbnRBcyA9IGN1cnJ5KGZ1bmN0aW9uKHR5cGUsIGV2ZW50ZnVsLCBlbGVtZW50KSB7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgZXZlbnRmdWwuZmlyZSh0eXBlLCB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgaWQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJylcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBkb24ndCBidWJibGVcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsImltcG9ydCB7aW5pdENvbGxhcHNpYmxlfSBmcm9tICcuLi91dGlscy9hcmlhJztcblxuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIGluaXRDb2xsYXBzaWJsZShlbGVtZW50KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwiaW1wb3J0IHthdHRyaWJ1dGVFcXVhbHMsIHRvZ2dsZUF0dHJpYnV0ZSwgdG9nZ2xlVmlzaWJpbGl0eX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhcmlhLWV4cGFuZGVkPXRydWUgb24gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc0V4cGFuZGVkID0gYXR0cmlidXRlRXF1YWxzKFwiYXJpYS1leHBhbmRlZFwiLCAndHJ1ZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYXJpYS1oaWRkZW4gb24gJ2NvbGxhcHNpYmxlJyB3aGVuIGFyaWEtZXhwYW5kZWQgY2hhbmdlcyBvbiAndG9nZ2xlcicsXG4gKiBhbmQgdG9nZ2xlcyBhcmlhLWV4cGFuZGVkIG9uICd0b2dnbGVyJyBvbiBjbGlja1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRDb2xsYXBzaWJsZSA9IChlbGVtZW50KSA9PiB7XG4gIC8vIGVsZW1lbnRzXG4gIGNvbnN0IHRvZ2dsZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScpO1xuICBjb25zdCBjb2xsYXBzaWJsZUlkID0gdG9nZ2xlci5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgY29uc3QgY29sbGFwc2libGUgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2NvbGxhcHNpYmxlSWR9YCk7XG5cbiAgLy8gc2V0IG9ic2VydmVyIG9uIHRpdGxlIGZvciBhcmlhLWV4cGFuZGVkXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHRvZ2dsZVZpc2liaWxpdHkoaXNFeHBhbmRlZCh0b2dnbGVyKSwgY29sbGFwc2libGUpKTtcblxuICBvYnNlcnZlci5vYnNlcnZlKHRvZ2dsZXIsIHtcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW1wiYXJpYS1leHBhbmRlZFwiXVxuICB9KTtcblxuICAvLyBTZXQgY2xpY2sgbGlzdGVuZXIgdGhhdCB0b2dnbGVzIGFyaWEtZXhwYW5kZWRcbiAgdG9nZ2xlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRvZ2dsZUF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgdG9nZ2xlcikpO1xuXG4gIC8vIGluaXRpYWxpemVcbiAgdG9nZ2xlVmlzaWJpbGl0eShpc0V4cGFuZGVkKHRvZ2dsZXIpLCBjb2xsYXBzaWJsZSk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2FyaWEuanMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ01DQTBNREFnTWpJMUlqNE5DaUFnUEdSbFpuTStEUW9nSUNBZ1BITjBlV3hsUGcwS0lDQWdJQ0FnTG1Oc2N5MHhJSHNOQ2lBZ0lDQWdJR1pwYkd3NklHNXZibVU3RFFvZ0lDQWdJQ0I5RFFvTkNpQWdJQ0FnSUM1amJITXRNaUI3RFFvZ0lDQWdJQ0JtYVd4c09pQWpZelpqTm1NM093MEtJQ0FnSUNBZ2ZRMEtEUW9nSUNBZ0lDQXVZMnh6TFRNc0lDNWpiSE10TkNCN0RRb2dJQ0FnSUNCbWFXeHNPaUFqWm1abU93MEtJQ0FnSUNBZ2ZRMEtEUW9nSUNBZ0lDQXVZMnh6TFRNZ2V3MEtJQ0FnSUNBZ2IzQmhZMmwwZVRvZ01DNDNPdzBLSUNBZ0lDQWdmUTBLSUNBZ0lEd3ZjM1I1YkdVK0RRb2dJRHd2WkdWbWN6NE5DaUFnUEhScGRHeGxQbU52Ym5SbGJuUWdkSGx3WlNCd2JHRmpaV2h2YkdSbGNsOHlQQzkwYVhSc1pUNE5DaUFnUEdjZ2FXUTlJa3hoZVdWeVh6SWlJR1JoZEdFdGJtRnRaVDBpVEdGNVpYSWdNaUkrRFFvZ0lDQWdQR2NnYVdROUltTnZiblJsYm5SZmRIbHdaVjl3YkdGalpXaHZiR1JsY2kweFgyTnZjSGtpSUdSaGRHRXRibUZ0WlQwaVkyOXVkR1Z1ZENCMGVYQmxJSEJzWVdObGFHOXNaR1Z5TFRFZ1kyOXdlU0krRFFvZ0lDQWdJQ0E4Y21WamRDQmpiR0Z6Y3owaVkyeHpMVEVpSUhkcFpIUm9QU0kwTURBaUlHaGxhV2RvZEQwaU1qSTFJaTgrRFFvZ0lDQWdJQ0E4Y21WamRDQmpiR0Z6Y3owaVkyeHpMVElpSUhnOUlqRXhNaTQxTVNJZ2VUMGlORE11TkRFaUlIZHBaSFJvUFNJeE56WXVPVFlpSUdobGFXZG9kRDBpTVRNMUxqUTFJaUJ5ZUQwaU1UQWlJSEo1UFNJeE1DSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhNell1TmpZaUlHTjVQU0kyTVM0NU9DSWdjajBpTkM0NE1TSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhOVEV1TkRraUlHTjVQU0kyTVM0NU9DSWdjajBpTkM0NE1TSXZQZzBLSUNBZ0lDQWdQR05wY21Oc1pTQmpiR0Z6Y3owaVkyeHpMVE1pSUdONFBTSXhOall1TVNJZ1kzazlJall4TGprNElpQnlQU0kwTGpneElpOCtEUW9nSUNBZ0lDQThaeUJwWkQwaVgwZHliM1Z3WHlJZ1pHRjBZUzF1WVcxbFBTSW1iSFE3UjNKdmRYQW1aM1E3SWo0TkNpQWdJQ0FnSUNBZ1BHY2dhV1E5SWw5SGNtOTFjRjh5SWlCa1lYUmhMVzVoYldVOUlpWnNkRHRIY205MWNDWm5kRHNpUGcwS0lDQWdJQ0FnSUNBZ0lEeHdZWFJvSUdsa1BTSmZRMjl0Y0c5MWJtUmZVR0YwYUY4aUlHUmhkR0V0Ym1GdFpUMGlKbXgwTzBOdmJYQnZkVzVrSUZCaGRHZ21aM1E3SWlCamJHRnpjejBpWTJ4ekxUUWlJR1E5SWsweU5qTXVNamdzT1RVdU1qRkRNall3TERreUxqQTNMREkxTlN3NU1TNDFMREkwT0M0ME15dzVNUzQxU0RJeU4zWTRTREU1T1M0MWJDMHlMakUzTERFd0xqSTBZVEkxTGpnMExESTFMamcwTERBc01Dd3hMREV4TGpRNExURXVOak1zTVRrdU9UTXNNVGt1T1RNc01Dd3dMREVzTVRRdU16a3NOUzQxTnl3eE9DNHlOaXd4T0M0eU5pd3dMREFzTVN3MUxqVXlMREV6TGpZc01qTXVNVEVzTWpNdU1URXNNQ3d3TERFdE1pNDROQ3d4TVM0d05Td3hPQzQyTlN3eE9DNDJOU3d3TERBc01TMDRMakEyTERjdU56a3NPU3c1TERBc01Dd3hMVFF1TVRJc01TNHpOMGd5TXpaMkxUSXhhREV3TGpReVl6Y3VNellzTUN3eE1pNDRNeTB4TGpZeExERTJMalF5TFRWek5TNHpPQzAzTGpRNExEVXVNemd0TVRNdU5EUkRNalk0TGpJeUxERXdNaTR5T1N3eU5qWXVOVGNzT1RndU16VXNNall6TGpJNExEazFMakl4V20wdE1UVXNNVGRqTFRFdU5ESXNNUzR5TWkwekxqa3NNUzR5TlMwM0xqUXhMREV1TWpWSU1qTTJkaTB4TkdnMUxqWXlZVGt1TlRjc09TNDFOeXd3TERBc01TdzNMREl1T1RNc055NHdOU3czTGpBMUxEQXNNQ3d4TERFdU9EVXNOQzQ1TWtFMkxqTXpMRFl1TXpNc01Dd3dMREVzTWpRNExqTXhMREV4TWk0eU5Wb2lMejROQ2lBZ0lDQWdJQ0FnSUNBOGNHRjBhQ0JwWkQwaVgxQmhkR2hmSWlCa1lYUmhMVzVoYldVOUlpWnNkRHRRWVhSb0ptZDBPeUlnWTJ4aGMzTTlJbU5zY3kwMElpQmtQU0pOTWpBeUxqa3NNVEU1TGpFeFlUZ3VNVElzT0M0eE1pd3dMREFzTUMwM0xqSTRMRFF1TlRKc0xURTJMVEV1TWpJc055NHlNaTB6TUM0NU1rZ3hOelIyTWpKSU1UVXpkaTB5TWtneE16WjJOVFpvTVRkMkxUSXhhREl4ZGpJeGFESXdMak14WXkweUxqY3lMREF0TlMweExqVXpMVGN0TTJFeE9TNHhPU3d4T1M0eE9Td3dMREFzTVMwMExqY3pMVFF1T0RNc01qTXVOVGdzTWpNdU5UZ3NNQ3d3TERFdE15MDJMalpzTVRZdE1pNHlObUU0TGpFeExEZ3VNVEVzTUN3eExEQXNOeTR5TmkweE1TNDNNbG9pTHo0TkNpQWdJQ0FnSUNBZ1BDOW5QZzBLSUNBZ0lDQWdQQzluUGcwS0lDQWdJQ0FnUEhKbFkzUWdZMnhoYzNNOUltTnNjeTB6SWlCNFBTSXhOemN1TmpZaUlIazlJalUzTGpZMklpQjNhV1IwYUQwaU9USXVNamdpSUdobGFXZG9kRDBpT1M0ek9DSWdjbmc5SWpNdU5TSWdjbms5SWpNdU5TSXZQZzBLSUNBZ0lEd3ZaejROQ2lBZ1BDOW5QZzBLUEM5emRtYytEUW89XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Z1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgSHViVmlldyBmcm9tICcuL2h1Yi12aWV3JztcbmltcG9ydCBDb250ZW50VHlwZVNlY3Rpb24gZnJvbSAnLi9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbic7XG5pbXBvcnQgVXBsb2FkU2VjdGlvbiBmcm9tICcuL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uJztcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tICcuL2h1Yi1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBIdWJTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRpdGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbklkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGV4cGFuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYXBpUm9vdFVybFxuICovXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEVycm9yTWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlcnJvckNvZGVcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBTZWxlY3RlZEVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpZFxuICovXG4vKipcbiAqIFNlbGVjdCBldmVudFxuICogQGV2ZW50IEh1YiNzZWxlY3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogRXJyb3IgZXZlbnRcbiAqIEBldmVudCBIdWIjZXJyb3JcbiAqIEB0eXBlIHtFcnJvck1lc3NhZ2V9XG4gKi9cbi8qKlxuICogVXBsb2FkIGV2ZW50XG4gKiBAZXZlbnQgSHViI3VwbG9hZFxuICogQHR5cGUge09iamVjdH1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBIdWIjZXJyb3JcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gY29udHJvbGxlcnNcbiAgICB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbiA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb24oc3RhdGUsIHRoaXMuc2VydmljZXMpO1xuICAgIHRoaXMudXBsb2FkU2VjdGlvbiA9IG5ldyBVcGxvYWRTZWN0aW9uKHN0YXRlLCB0aGlzLnNlcnZpY2VzKTtcblxuICAgIC8vIHZpZXdzXG4gICAgdGhpcy52aWV3ID0gbmV3IEh1YlZpZXcoc3RhdGUpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGNvbnRyb2xsZXIgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24pO1xuICAgIHRoaXMucHJvcGFnYXRlKFsndXBsb2FkJ10sIHRoaXMudXBsb2FkU2VjdGlvbik7XG5cbiAgICAvLyBoYW5kbGUgZXZlbnRzXG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy5zZXRQYW5lbFRpdGxlLCB0aGlzKTtcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnZpZXcuY2xvc2VQYW5lbCwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcub24oJ3RhYi1jaGFuZ2UnLCB0aGlzLnZpZXcuc2V0U2VjdGlvblR5cGUsIHRoaXMudmlldyk7XG4gICAgdGhpcy52aWV3Lm9uKCdwYW5lbC1jaGFuZ2UnLCB0aGlzLnZpZXcudG9nZ2xlUGFuZWxPcGVuLmJpbmQodGhpcy52aWV3KSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5vbigncmVsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnNlcnZpY2VzLnNldHVwKCk7XG4gICAgICBzZWxmLmNvbnRlbnRUeXBlU2VjdGlvbi5pbml0Q29udGVudFR5cGVMaXN0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmluaXRUYWJQYW5lbChzdGF0ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwcm9taXNlIG9mIGEgY29udGVudCB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBnZXRDb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZSBvZiB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRQYW5lbFRpdGxlKHtpZH0pwqB7XG4gICAgdGhpcy5nZXRDb250ZW50VHlwZShpZCkudGhlbigoe3RpdGxlfSkgPT4gdGhpcy52aWV3LnNldFRpdGxlKHRpdGxlKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSB0YWIgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxuICAgKi9cbiAgaW5pdFRhYlBhbmVsKHsgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnIH0pIHtcbiAgICBjb25zdCB0YWJDb25maWdzID0gW3tcbiAgICAgIHRpdGxlOiAnQ3JlYXRlIENvbnRlbnQnLFxuICAgICAgaWQ6ICdjb250ZW50LXR5cGVzJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMuY29udGVudFR5cGVTZWN0aW9uLmdldEVsZW1lbnQoKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnVXBsb2FkJyxcbiAgICAgIGlkOiAndXBsb2FkJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMudXBsb2FkU2VjdGlvbi5nZXRFbGVtZW50KClcbiAgICB9XTtcblxuICAgIC8vIHNldHMgdGhlIGNvcnJlY3Qgb25lIHNlbGVjdGVkXG4gICAgdGFiQ29uZmlnc1xuICAgICAgLmZpbHRlcihjb25maWcgPT4gY29uZmlnLmlkID09PSBzZWN0aW9uSWQpXG4gICAgICAuZm9yRWFjaChjb25maWcgPT4gY29uZmlnLnNlbGVjdGVkID0gdHJ1ZSk7XG5cbiAgICB0YWJDb25maWdzLmZvckVhY2godGFiQ29uZmlnID0+IHRoaXMudmlldy5hZGRUYWIodGFiQ29uZmlnKSk7XG4gICAgdGhpcy52aWV3LmFkZEJvdHRvbUJvcmRlcigpOyAvLyBBZGRzIGFuIGFuaW1hdGVkIGJvdHRvbSBib3JkZXIgdG8gZWFjaCB0YWJcbiAgICB0aGlzLnZpZXcuaW5pdFRhYlBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IGluIHRoZSB2aWV3XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZXMvbWFpbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCByZW1vdmVDaGlsZCwgaGlkZSwgc2hvdyB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgY3VycnksIGZvckVhY2ggfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiO1xuaW1wb3J0IGluaXRJbWFnZVNjcm9sbGVyIGZyb20gXCJjb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyXCI7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5pbXBvcnQgbm9JY29uIGZyb20gJy4uLy4uL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnJztcblxuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCA9ICdkYXRhLWlkJztcblxuLyoqXG4gKiBAY29uc3RhbnQge251bWJlcn1cbiAqL1xuY29uc3QgTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiA9IDMwMDtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IGlmIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGVcbiAqL1xuY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IChlbGVtZW50LCB2aXNpYmxlKSA9PiAodmlzaWJsZSA/IHNob3cgOiBoaWRlKShlbGVtZW50KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdHJpbmcgaXMgZW1wdHlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRW1wdHkgPSAodGV4dCkgPT4gKHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJykgJiYgKHRleHQubGVuZ3RoID09PSAwKTtcblxuY29uc3QgaGlkZUFsbCA9IGZvckVhY2goaGlkZSk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWxWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSB2aWV3XG4gICAgdGhpcy5yb290RWxlbWVudCA9IHRoaXMuY3JlYXRlVmlldygpO1xuXG4gICAgLy8gZ3JhYiByZWZlcmVuY2VzXG4gICAgdGhpcy5idXR0b25CYXIgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tYmFyJyk7XG4gICAgdGhpcy51c2VCdXR0b24gPSB0aGlzLmJ1dHRvbkJhci5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXVzZScpO1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24taW5zdGFsbCcpO1xuICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5idXR0b24nKTtcblxuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LXR5cGUtaW1hZ2UnKTtcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kZXRhaWxzIC50aXRsZScpO1xuICAgIHRoaXMub3duZXIgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd25lcicpO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWRldGFpbHMgLnNtYWxsJyk7XG4gICAgdGhpcy5kZW1vQnV0dG9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZGVtby1idXR0b24nKTtcbiAgICB0aGlzLmNhcm91c2VsID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWwnKTtcbiAgICB0aGlzLmNhcm91c2VsTGlzdCA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcigndWwnKTtcbiAgICB0aGlzLmxpY2VuY2VQYW5lbCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmxpY2VuY2UtcGFuZWwnKTtcbiAgICB0aGlzLmluc3RhbGxNZXNzYWdlID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW5zdGFsbC1tZXNzYWdlJyk7XG5cbiAgICAvLyBoaWRlIG1lc3NhZ2Ugb24gY2xvc2UgYnV0dG9uIGNsaWNrXG4gICAgbGV0IGluc3RhbGxNZXNzYWdlQ2xvc2UgPSB0aGlzLmluc3RhbGxNZXNzYWdlLnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlLWNsb3NlJyk7XG4gICAgaW5zdGFsbE1lc3NhZ2VDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGhpZGUodGhpcy5pbnN0YWxsTWVzc2FnZSkpO1xuXG4gICAgLy8gaW5pdCBpbnRlcmFjdGl2ZSBlbGVtZW50c1xuICAgIGluaXRQYW5lbCh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgaW5pdEltYWdlU2Nyb2xsZXIodGhpcy5jYXJvdXNlbCk7XG5cbiAgICAvLyBmaXJlIGV2ZW50cyBvbiBidXR0b24gY2xpY2tcbiAgICByZWxheUNsaWNrRXZlbnRBcygnY2xvc2UnLCB0aGlzLCB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrLWJ1dHRvbicpKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0JywgdGhpcywgdGhpcy51c2VCdXR0b24pO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdpbnN0YWxsJywgdGhpcywgdGhpcy5pbnN0YWxsQnV0dG9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSB2aWV3IGFzIGEgSFRNTEVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVWaWV3ICgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWRldGFpbCc7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJiYWNrLWJ1dHRvbiBpY29uLWFycm93LXRoaWNrXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS13cmFwcGVyXCI+PGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlIGNvbnRlbnQtdHlwZS1pbWFnZVwiIHNyYz1cIiR7bm9JY29ufVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1kZXRhaWxzXCI+XG4gICAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj48L2gyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd25lclwiPjwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzPVwic21hbGxcIj48L3A+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidXR0b24gZGVtby1idXR0b25cIiB0YXJnZXQ9XCJfYmxhbmtcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgaHJlZj1cIiNcIj5Db250ZW50IERlbW88L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2Fyb3VzZWxcIiByb2xlPVwicmVnaW9uXCIgZGF0YS1zaXplPVwiNVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWJ1dHRvbiBwcmV2aW91c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRpc2FibGVkPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIG5leHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkaXNhYmxlZD48c3BhbiBjbGFzcz1cImljb24tYXJyb3ctdGhpY2tcIj48L3NwYW4+PC9zcGFuPlxuICAgICAgICA8bmF2IGNsYXNzPVwic2Nyb2xsZXJcIj5cbiAgICAgICAgICA8dWw+PC91bD5cbiAgICAgICAgPC9uYXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxociAvPlxuICAgICAgPGRpdiBjbGFzcz1cImluc3RhbGwtbWVzc2FnZSBtZXNzYWdlIGRpc21pc3NpYmxlIHNpbXBsZSBpbmZvXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlLWNsb3NlIGljb24tY2xvc2VcIj48L2Rpdj5cbiAgICAgICAgPGgzPjwvaDM+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tYmFyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1wcmltYXJ5IGJ1dHRvbi11c2VcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgZGF0YS1pZD1cIlwiPlVzZTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLWludmVyc2UtcHJpbWFyeSBidXR0b24taW5zdGFsbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRhdGEtaWQ9XCJcIj48c3BhbiBjbGFzcz1cImljb24tYXJyb3ctdGhpY2tcIj48L3NwYW4+SW5zdGFsbDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLWludmVyc2UtcHJpbWFyeSBidXR0b24taW5zdGFsbGluZ1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxzcGFuIGNsYXNzPVwiaWNvbi1sb2FkaW5nLXNlYXJjaCBpY29uLXNwaW5cIj48L3NwYW4+SW5zdGFsbGluZzwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWdyb3VwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBsaWNlbmNlLXBhbmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRlclwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGFyaWEtY29udHJvbHM9XCJsaWNlbmNlLXBhbmVsXCI+PHNwYW4gY2xhc3M9XCJpY29uLWFjY29yZGlvbi1hcnJvd1wiPjwvc3Bhbj4gVGhlIExpY2VuY2UgSW5mbzwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCIgaWQ9XCJsaWNlbmNlLXBhbmVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keS1pbm5lclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgbWVzc2FnZSBvbiBpbnN0YWxsXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc3VjY2Vzc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgKi9cbiAgc2V0SW5zdGFsbE1lc3NhZ2UoeyBzdWNjZXNzID0gdHJ1ZSwgbWVzc2FnZSB9KXtcbiAgICB0aGlzLmluc3RhbGxNZXNzYWdlLnF1ZXJ5U2VsZWN0b3IoJ2gzJykuaW5uZXJUZXh0ID0gbWVzc2FnZTtcbiAgICB0aGlzLmluc3RhbGxNZXNzYWdlLmNsYXNzTmFtZSA9IGBpbnN0YWxsLW1lc3NhZ2UgZGlzbWlzc2libGUgbWVzc2FnZSBzaW1wbGUgJHtzdWNjZXNzID8gJ2luZm8nIDogJ2Vycm9yJ31gO1xuICAgIHNob3codGhpcy5pbnN0YWxsTWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgaW1hZ2VzIGZyb20gdGhlIGNhcm91c2VsXG4gICAqL1xuICByZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsKCkge1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykuZm9yRWFjaChyZW1vdmVDaGlsZCh0aGlzLmNhcm91c2VsTGlzdCkpO1xuICAgIHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvckFsbCgnLmNhcm91c2VsLWxpZ2h0Ym94JykuZm9yRWFjaChyZW1vdmVDaGlsZCh0aGlzLmNhcm91c2VsKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGltYWdlIHRvIHRoZSBjYXJvdXNlbFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gaW1hZ2VcbiAgICovXG4gIGFkZEltYWdlVG9DYXJvdXNlbChpbWFnZSkge1xuICAgIC8vIGFkZCBsaWdodGJveFxuICAgIGNvbnN0IGxpZ2h0Ym94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGlnaHRib3guaWQgPSBgbGlnaHRib3gtJHt0aGlzLmNhcm91c2VsTGlzdC5jaGlsZEVsZW1lbnRDb3VudH1gO1xuICAgIGxpZ2h0Ym94LmNsYXNzTmFtZSA9ICdjYXJvdXNlbC1saWdodGJveCc7XG4gICAgbGlnaHRib3guc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgbGlnaHRib3guaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cIiR7aW1hZ2UudXJsfVwiIGFsdD1cIiR7aW1hZ2UuYWx0fVwiPmA7XG4gICAgdGhpcy5jYXJvdXNlbC5hcHBlbmRDaGlsZChsaWdodGJveCk7XG5cbiAgICAvLyBhZGQgdGh1bWJuYWlsXG4gICAgY29uc3QgdGh1bWJuYWlsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0aHVtYm5haWwuY2xhc3NOYW1lID0gJ3NsaWRlJztcbiAgICB0aHVtYm5haWwuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHtpbWFnZS51cmx9XCIgYWx0PVwiJHtpbWFnZS5hbHR9XCIgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIGFyaWEtY29udHJvbHM9XCIke2xpZ2h0Ym94LmlkfVwiIC8+YDtcbiAgICB0aGlzLmNhcm91c2VsTGlzdC5hcHBlbmRDaGlsZCh0aHVtYm5haWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIHJlc2V0KCkge1xuICAgIGhpZGUodGhpcy5pbnN0YWxsTWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgaW1hZ2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICAgKi9cbiAgc2V0SW1hZ2Uoc3JjKSB7XG4gICAgdGhpcy5pbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyB8fCBub0ljb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0SWQoaWQpIHtcbiAgICB0aGlzLmluc3RhbGxCdXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGlkKTtcbiAgICB0aGlzLnVzZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKi9cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IGAke3RpdGxlfWA7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbG9uZyBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgc2V0RGVzY3JpcHRpb24odGV4dCkge1xuICAgIGlmKHRleHQubGVuZ3RoID4gTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTikge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0aGlzLmVsbGlwc2lzKE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04sIHRleHQpfTxzcGFuIGNsYXNzPVwicmVhZC1tb3JlIGxpbmtcIj5SZWFkIG1vcmU8L3NwYW4+YDtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25cbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5yZWFkLW1vcmUsIC5yZWFkLWxlc3MnKVxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZURlc2NyaXB0aW9uRXhwYW5kZWQodGV4dCkpO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIFJlYWQgbGVzcyBhbmQgUmVhZCBtb3JlIHRleHRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovXG4gIHRvZ2dsZURlc2NyaXB0aW9uRXhwYW5kZWQodGV4dCkge1xuICAgIC8vIGZsaXAgYm9vbGVhblxuICAgIHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCA9ICF0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQ7XG5cbiAgICBpZih0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQpIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGV4dH08c3BhbiBjbGFzcz1cInJlYWQtbGVzcyBsaW5rXCI+UmVhZCBsZXNzPC9zcGFuPmA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0aGlzLmVsbGlwc2lzKE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04sIHRleHQpfTxzcGFuIGNsYXNzPVwicmVhZC1tb3JlIGxpbmtcIj5SZWFkIG1vcmU8L3NwYW4+YDtcbiAgICB9XG5cbiAgICB0aGlzLmRlc2NyaXB0aW9uXG4gICAgICAucXVlcnlTZWxlY3RvcignLnJlYWQtbW9yZSwgLnJlYWQtbGVzcycpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZURlc2NyaXB0aW9uRXhwYW5kZWQodGV4dCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3J0ZW5zIGEgc3RyaW5nLCBhbmQgcHV0cyBhbiBlbGlwc2lzIGF0IHRoZSBlbmRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNpemVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovXG4gIGVsbGlwc2lzKHNpemUsIHRleHQpIHtcbiAgICByZXR1cm4gYCR7dGV4dC5zdWJzdHIoMCwgc2l6ZSl9Li4uYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsaWNlbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqL1xuICBzZXRMaWNlbmNlKHR5cGUpIHtcbiAgICBpZih0eXBlKXtcbiAgICAgIHRoaXMubGljZW5jZVBhbmVsLnF1ZXJ5U2VsZWN0b3IoJy5wYW5lbC1ib2R5LWlubmVyJykuaW5uZXJUZXh0ID0gdHlwZTtcbiAgICAgIHNob3codGhpcy5saWNlbmNlUGFuZWwpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGhpZGUodGhpcy5saWNlbmNlUGFuZWwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvd25lclxuICAgKi9cbiAgc2V0T3duZXIob3duZXIpIHtcbiAgICBpZihvd25lcikge1xuICAgICAgdGhpcy5vd25lci5pbm5lckhUTUwgPSBgQnkgJHtvd25lcn1gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMub3duZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGV4YW1wbGUgdXJsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICovXG4gIHNldEV4YW1wbGUodXJsKSB7XG4gICAgdGhpcy5kZW1vQnV0dG9uLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCB8fCAnIycpO1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy5kZW1vQnV0dG9uLCAhaXNFbXB0eSh1cmwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGlmIHRoZSBjb250ZW50IHR5cGUgaXMgaW5zdGFsbGVkXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5zdGFsbGVkXG4gICAqL1xuICBzZXRJc0luc3RhbGxlZChpbnN0YWxsZWQpIHtcbiAgICB0aGlzLnNob3dCdXR0b25CeVNlbGVjdG9yKGluc3RhbGxlZCA/ICcuYnV0dG9uLXVzZScgOiAnLmJ1dHRvbi1pbnN0YWxsJyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgYWxsIGJ1dHRvbnMgYW5kIHNob3dzIHRoZSBidXR0b24gb24gdGhlIHNlbGVjdG9yIGFnYWluXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfXNlbGVjdG9yXG4gICAqL1xuICBzaG93QnV0dG9uQnlTZWxlY3RvcihzZWxlY3Rvcikge1xuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgaWYoYnV0dG9uKSB7XG4gICAgICBoaWRlQWxsKHRoaXMuYnV0dG9ucyk7XG4gICAgICBzaG93KGJ1dHRvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZURldGFpbFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWRldGFpbC12aWV3XCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWwge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSwgc2VydmljZXMpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IHNlcnZpY2VzO1xuXG4gICAgLy8gdmlld3NcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZURldGFpbFZpZXcoc3RhdGUpO1xuICAgIHRoaXMudmlldy5vbignaW5zdGFsbCcsIHRoaXMuaW5zdGFsbCwgdGhpcyk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydjbG9zZScsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgbG9hZEJ5SWQoaWQpIHtcbiAgICB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgLnRoZW4odGhpcy51cGRhdGUuYmluZCh0aGlzKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgIGluc3RhbGwoe2lkfSkge1xuICAgICAvLyBzZXQgc3Bpbm5lclxuICAgICB0aGlzLnZpZXcuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoJy5idXR0b24taW5zdGFsbGluZycpO1xuXG4gICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IHRoaXMuc2VydmljZXMuaW5zdGFsbENvbnRlbnRUeXBlKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKSlcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiB7XG4gICAgICAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQodHJ1ZSk7XG4gICAgICAgICB0aGlzLnZpZXcuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoJy5idXR0b24tZ2V0Jyk7XG4gICAgICAgICB0aGlzLnZpZXcuc2V0SW5zdGFsbE1lc3NhZ2Uoe1xuICAgICAgICAgICBtZXNzYWdlOiBgJHtjb250ZW50VHlwZS50aXRsZX0gc3VjY2Vzc2Z1bGx5IGluc3RhbGxlZCFgLFxuICAgICAgICAgfSk7XG4gICAgICAgfSlcbiAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgdGhpcy52aWV3LnNob3dCdXR0b25CeVNlbGVjdG9yKCcuYnV0dG9uLWluc3RhbGwnKTtcblxuICAgICAgICAgLy8gcHJpbnQgZXJyb3IgbWVzc2FnZVxuICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IChlcnJvci5lcnJvckNvZGUpID8gZXJyb3IgOiB7XG4gICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICBlcnJvckNvZGU6ICdSRVNQT05TRV9GQUlMRUQnLFxuICAgICAgICAgICBtZXNzYWdlOiBgJHtpZH0gY291bGQgbm90IGJlIGluc3RhbGxlZCEgQ29udGFjdCB5b3VyIGFkbWluaXN0cmF0b3IuYCxcbiAgICAgICAgIH07XG4gICAgICAgICB0aGlzLnZpZXcuc2V0SW5zdGFsbE1lc3NhZ2UoZXJyb3JNZXNzYWdlKTtcblxuICAgICAgICAgLy8gbG9nIHdob2xlIGVycm9yIG1lc3NhZ2UgdG8gY29uc29sZVxuICAgICAgICAgY29uc29sZS5lcnJvcignSW5zdGFsbGF0aW9uIGVycm9yJywgZXJyb3IpO1xuICAgICAgIH0pO1xuICAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGNvbnRlbnQgdHlwZSBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICB1cGRhdGUoY29udGVudFR5cGUpIHtcbiAgICB0aGlzLnZpZXcucmVzZXQoKTtcbiAgICB0aGlzLnZpZXcuc2V0SWQoY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuICAgIHRoaXMudmlldy5zZXRUaXRsZShjb250ZW50VHlwZS50aXRsZSk7XG4gICAgdGhpcy52aWV3LnNldERlc2NyaXB0aW9uKGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uKTtcbiAgICB0aGlzLnZpZXcuc2V0SW1hZ2UoY29udGVudFR5cGUuaWNvbik7XG4gICAgdGhpcy52aWV3LnNldEV4YW1wbGUoY29udGVudFR5cGUuZXhhbXBsZSk7XG4gICAgdGhpcy52aWV3LnNldE93bmVyKGNvbnRlbnRUeXBlLm93bmVyKTtcbiAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQoY29udGVudFR5cGUuaW5zdGFsbGVkKTtcbiAgICB0aGlzLnZpZXcuc2V0TGljZW5jZShjb250ZW50VHlwZS5saWNlbnNlKTtcblxuICAgIC8vIHVwZGF0ZSBjYXJvdXNlbFxuICAgIHRoaXMudmlldy5yZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsKCk7XG4gICAgY29udGVudFR5cGUuc2NyZWVuc2hvdHMuZm9yRWFjaCh0aGlzLnZpZXcuYWRkSW1hZ2VUb0Nhcm91c2VsLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIHJlbW92ZUNoaWxkIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5pbXBvcnQgbm9JY29uIGZyb20gJy4uLy4uL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgcm9vdCBlbGVtZW50XG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWxpc3QnO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgcm93cyBmcm9tIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgcmVtb3ZlQWxsUm93cygpIHtcbiAgICB3aGlsZSh0aGlzLnJvb3RFbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSApe1xuICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLnJvb3RFbGVtZW50Lmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSByb3dcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICovXG4gIGFkZFJvdyhjb250ZW50VHlwZSkge1xuICAgIGNvbnN0IHJvdyA9IHRoaXMuY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHRoaXMpO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLCByb3cpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocm93KVxuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgQ29udGVudCBUeXBlIGNvbmZpZ3VyYXRpb24gYW5kIGNyZWF0ZXMgYSByb3cgZG9tXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IHNjb3BlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHNjb3BlKSB7XG4gICAgLy8gcm93IGl0ZW1cbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBlbGVtZW50LmlkID0gYGNvbnRlbnQtdHlwZS0ke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfWA7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG5cbiAgICAvLyBjcmVhdGUgYnV0dG9uIGNvbmZpZ1xuICAgIGNvbnN0IHVzZUJ1dHRvbkNvbmZpZyA9IHsgdGV4dDogJ1VzZScsIGNsczogJ2J1dHRvbi1wcmltYXJ5JywgaWNvbjogJycgfTtcbiAgICBjb25zdCBpbnN0YWxsQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnR2V0JywgY2xzOiAnYnV0dG9uLWludmVyc2UtcHJpbWFyeSBidXR0b24taW5zdGFsbCcsIGljb246ICdpY29uLWFycm93LXRoaWNrJ307XG4gICAgY29uc3QgYnV0dG9uID0gY29udGVudFR5cGUuaW5zdGFsbGVkID8gIHVzZUJ1dHRvbkNvbmZpZzogaW5zdGFsbEJ1dHRvbkNvbmZpZztcblxuICAgIGNvbnN0IHRpdGxlID0gY29udGVudFR5cGUudGl0bGUgfHwgY29udGVudFR5cGUubWFjaGluZU5hbWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBjb250ZW50VHlwZS5zdW1tYXJ5IHx8ICcnO1xuXG4gICAgY29uc3QgaW1hZ2UgPSBjb250ZW50VHlwZS5pY29uIHx8IG5vSWNvbjtcblxuICAgIC8vIGNyZWF0ZSBodG1sXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBzcmM9XCIke2ltYWdlfVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gJHtidXR0b24uY2xzfVwiIGRhdGEtaWQ9XCIke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfVwiIHRhYmluZGV4PVwiMFwiPjxzcGFuIGNsYXNzPVwiJHtidXR0b24uaWNvbn1cIj48L3NwYW4+JHtidXR0b24udGV4dH08L3NwYW4+XG4gICAgICA8aDQ+JHt0aXRsZX08L2g0PlxuICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+JHtkZXNjcmlwdGlvbn08L2Rpdj5cbiAgIGA7XG5cbiAgICAvLyBoYW5kbGUgdXNlIGJ1dHRvblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1wcmltYXJ5Jyk7XG4gICAgaWYodXNlQnV0dG9uKXtcbiAgICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCBzY29wZSwgdXNlQnV0dG9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVMaXN0VmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtbGlzdC12aWV3XCI7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIFJvdyBzZWxlY3RlZCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogVXBkYXRlIGNvbnRlbnQgdHlwZSBsaXN0IGV2ZW50XG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3Qge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gYWRkIHRoZSB2aWV3XG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVMaXN0VmlldyhzdGF0ZSk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydyb3ctc2VsZWN0ZWQnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZSB0aGlzIGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHRoaXMgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCB3aXRoIG5ldyBjb250ZW50IHR5cGVzXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gICAqL1xuICB1cGRhdGUoY29udGVudFR5cGVzKSB7XG4gICAgdGhpcy52aWV3LnJlbW92ZUFsbFJvd3MoKTtcbiAgICBjb250ZW50VHlwZXMuZm9yRWFjaCh0aGlzLnZpZXcuYWRkUm93LCB0aGlzLnZpZXcpO1xuICAgIHRoaXMuZmlyZSgndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0Jywge30pO1xuICB9XG5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmlld3Mgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJpbXBvcnQgTWVzc2FnZVZpZXcgZnJvbSBcIi4uL21lc3NhZ2Utdmlldy9tZXNzYWdlLXZpZXdcIjtcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSwgcXVlcnlTZWxlY3RvckFsbCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5pbXBvcnQgaW5pdE1lbnUgZnJvbSAnY29tcG9uZW50cy9tZW51JztcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgdW5zZWxlY3RBbGwgPSBmb3JFYWNoKHJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpKTtcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3XG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3IHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudHNcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50KHN0YXRlKTtcblxuICAgIC8vIHBpY2sgZWxlbWVudHNcbiAgICB0aGlzLm1lbnViYXIgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItbmF2Jyk7XG4gICAgdGhpcy5pbnB1dEZpZWxkID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInNlYXJjaFwiXSBpbnB1dCcpO1xuICAgIHRoaXMuZGlzcGxheVNlbGVjdGVkID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLXRvZ2dsZXItc2VsZWN0ZWQnKTtcbiAgICBjb25zdCBpbnB1dEJ1dHRvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignW3JvbGU9XCJzZWFyY2hcIl0gLmlucHV0LWdyb3VwLWFkZG9uJyk7XG5cbiAgICAvLyBpbnB1dCBmaWVsZFxuICAgIHRoaXMuaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgnc2VhcmNoJywge1xuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXQsXG4gICAgICAgIHF1ZXJ5OiBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICAgIGtleUNvZGU6IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGVcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gaW5wdXQgYnV0dG9uXG4gICAgaW5wdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgbGV0IHNlYXJjaGJhciA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNodWItc2VhcmNoLWJhcicpO1xuXG4gICAgICAgdGhpcy5maXJlKCdzZWFyY2gnLCB7XG4gICAgICAgICBlbGVtZW50OiBzZWFyY2hiYXIsXG4gICAgICAgICBxdWVyeTogc2VhcmNoYmFyLnZhbHVlLFxuICAgICAgICAga2V5Q29kZTogMTMgLy8gQWN0IGxpa2UgYW4gJ2VudGVyJyBrZXkgcHJlc3NcbiAgICAgICB9KTtcblxuICAgICAgIHNlYXJjaGJhci5mb2N1cygpO1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgbWVudSBncm91cCBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZUVsZW1lbnQoc3RhdGUpIHtcbiAgICBsZXQgbWVudXRpdGxlID0gJ0Jyb3dzZSBjb250ZW50IHR5cGVzJztcbiAgICBsZXQgbWVudUlkID0gJ2NvbnRlbnQtdHlwZS1maWx0ZXInO1xuICAgIGxldCBzZWFyY2hUZXh0ID0gJ1NlYXJjaCBmb3IgQ29udGVudCBUeXBlcyc7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudFxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtc2VjdGlvbi12aWV3JztcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtZW51LWdyb3VwXCI+XG4gICAgICAgIDxuYXYgIHJvbGU9XCJtZW51YmFyXCIgY2xhc3M9XCJuYXZiYXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLWhlYWRlclwiPlxuICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXIgbmF2YmFyLXRvZ2dsZXItcmlnaHRcIiBhcmlhLWNvbnRyb2xzPVwiJHttZW51SWR9XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdmJhci10b2dnbGVyLXNlbGVjdGVkXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWFjY29yZGlvbi1hcnJvd1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdmJhci1icmFuZFwiPiR7bWVudXRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDx1bCBpZD1cIiR7bWVudUlkfVwiIGNsYXNzPVwibmF2YmFyLW5hdlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvdWw+XG4gICAgICAgIDwvbmF2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiIHJvbGU9XCJzZWFyY2hcIj5cbiAgICAgICAgICA8aW5wdXQgaWQ9XCJodWItc2VhcmNoLWJhclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1yb3VuZGVkXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiR7c2VhcmNoVGV4dH1cIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpY29uLXNlYXJjaFwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGRpc3BsYXlNZXNzYWdlKGNvbmZpZykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyBTZXQgdGhlIGFjdGlvblxuICAgIC8vIFRPRE8gLSBzaG91bGQgYmUgdHJhbnNsYXRhYmxlXG4gICAgY29uZmlnLmFjdGlvbiA9IFwiUmVsb2FkXCI7XG5cbiAgICB2YXIgbWVzc2FnZVZpZXcgPSBuZXcgTWVzc2FnZVZpZXcoY29uZmlnKTtcbiAgICB2YXIgZWxlbWVudCA9IG1lc3NhZ2VWaWV3LmdldEVsZW1lbnQoKTtcblxuICAgIG1lc3NhZ2VWaWV3Lm9uKCdhY3Rpb24tY2xpY2tlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYucm9vdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcbiAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgIHNlbGYuZmlyZSgncmVsb2FkJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlVmlldy5nZXRFbGVtZW50KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBtZW51IGl0ZW1cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkIERldGVybWluZXMgaWYgdGFiIGlzIGFscmVhZHkgc2VsZWN0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBOYW1lIG9mIGV2ZW50IHRoYXQgdGFiIHdpbGwgZmlyZSBvZmZcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBhZGRNZW51SXRlbSh7IHRpdGxlLCBpZCwgc2VsZWN0ZWQsIGV2ZW50TmFtZSB9KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWl0ZW0nKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGlkKTtcbiAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRpdGxlO1xuXG4gICAgLy8gc2V0cyBpZiB0aGlzIG1lbnVpdGVtIHNob3VsZCBiZSBzZWxlY3RlZFxuICAgIGlmKHNlbGVjdGVkKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICB0aGlzLmRpc3BsYXlTZWxlY3RlZC5pbm5lclRleHQgPSB0aXRsZTtcbiAgICB9XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5maXJlKCdtZW51LXNlbGVjdGVkJywge1xuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXQsXG4gICAgICAgIGNob2ljZTogZXZlbnROYW1lXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGFkZCB0byBtZW51IGJhclxuICAgIHRoaXMubWVudWJhci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGlucHV0IGZpZWxkXG4gICAqL1xuICBjbGVhcklucHV0RmllbGQoKSB7XG4gICAgdGhpcy5pbnB1dEZpZWxkLnZhbHVlID0gJyc7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGZpbHRlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0ZWROYW1lXG4gICAqL1xuICBzZXREaXNwbGF5U2VsZWN0ZWQoc2VsZWN0ZWROYW1lKSB7XG4gICAgdGhpcy5kaXNwbGF5U2VsZWN0ZWQuaW5uZXJUZXh0ID0gc2VsZWN0ZWROYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSBtZW51IGl0ZW0gYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZWxlY3RNZW51SXRlbUJ5SWQoaWQpIHtcbiAgICBjb25zdCBtZW51SXRlbXMgPSB0aGlzLm1lbnViYXIucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJtZW51aXRlbVwiXScpO1xuICAgIGNvbnN0IHNlbGVjdGVkTWVudUl0ZW0gPSB0aGlzLm1lbnViYXIucXVlcnlTZWxlY3RvcihgW3JvbGU9XCJtZW51aXRlbVwiXVtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcblxuICAgIGlmKHNlbGVjdGVkTWVudUl0ZW0pIHtcbiAgICAgIHVuc2VsZWN0QWxsKG1lbnVJdGVtcyk7XG4gICAgICBzZWxlY3RlZE1lbnVJdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG5cbiAgICAgIHRoaXMuZmlyZSgnbWVudS1zZWxlY3RlZCcsIHtcbiAgICAgICAgZWxlbWVudDogc2VsZWN0ZWRNZW51SXRlbSxcbiAgICAgICAgaWQ6IHNlbGVjdGVkTWVudUl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXRNZW51KCkge1xuICAgIC8vIGNyZWF0ZSB0aGUgdW5kZXJsaW5lXG4gICAgY29uc3QgdW5kZXJsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHVuZGVybGluZS5jbGFzc05hbWUgPSAnbWVudWl0ZW0tdW5kZXJsaW5lJztcbiAgICB0aGlzLm1lbnViYXIuYXBwZW5kQ2hpbGQodW5kZXJsaW5lKTtcblxuICAgIC8vIGNhbGwgaW5pdCBtZW51IGZyb20gc2RrXG4gICAgaW5pdE1lbnUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwiaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvblZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLXNlY3Rpb24tdmlld1wiO1xuaW1wb3J0IFNlYXJjaFNlcnZpY2UgZnJvbSBcIi4uL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlXCI7XG5pbXBvcnQgQ29udGVudFR5cGVMaXN0IGZyb20gJy4uL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0JztcbmltcG9ydCBDb250ZW50VHlwZURldGFpbCBmcm9tICcuLi9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBUYWIgc2VjdGlvbiBjb25zdGFudHNcbiAqL1xuY29uc3QgQ29udGVudFR5cGVTZWN0aW9uVGFicyA9IHtcbiAgQUxMOiB7XG4gICAgaWQ6ICdmaWx0ZXItYWxsJyxcbiAgICB0aXRsZTogJ0FsbCcsXG4gICAgZXZlbnROYW1lOiAnYWxsJ1xuICB9LFxuICBNWV9DT05URU5UX1RZUEVTOiB7XG4gICAgaWQ6ICdmaWx0ZXItbXktY29udGVudC10eXBlcycsXG4gICAgdGl0bGU6ICdNeSBDb250ZW50IFR5cGVzJyxcbiAgICBldmVudE5hbWU6ICdteS1jb250ZW50LXR5cGVzJyxcbiAgICBzZWxlY3RlZDogdHJ1ZVxuICB9LFxuICBNT1NUX1BPUFVMQVI6IHtcbiAgICBpZDogJ2ZpbHRlci1tb3N0LXBvcHVsYXInLFxuICAgIHRpdGxlOiAnTW9zdCBQb3B1bGFyJyxcbiAgICBldmVudE5hbWU6ICdtb3N0LXBvcHVsYXInLFxuICAgIGZpbHRlclByb3BlcnR5OiAncG9wdWxhcml0eSdcbiAgfVxufTtcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqIEBwYXJhbSB7SHViU2VydmljZXN9IHNlcnZpY2VzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSwgc2VydmljZXMpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIHRoaXMudHlwZUFoZWFkRW5hYmxlZCA9IHRydWU7XG5cbiAgICAvLyBhZGQgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb25WaWV3KHN0YXRlKTtcblxuICAgIC8vIGNvbnRyb2xsZXJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZShzZXJ2aWNlcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbCA9IG5ldyBDb250ZW50VHlwZURldGFpbCh7fSwgc2VydmljZXMpO1xuXG4gICAgLy8gYWRkIG1lbnUgaXRlbXNcbiAgICBmb3IgKGNvbnN0IHRhYiBpbiBDb250ZW50VHlwZVNlY3Rpb25UYWJzKSB7XG4gICAgICBpZiAoQ29udGVudFR5cGVTZWN0aW9uVGFicy5oYXNPd25Qcm9wZXJ0eSh0YWIpKSB7XG4gICAgICAgIHRoaXMudmlldy5hZGRNZW51SXRlbShDb250ZW50VHlwZVNlY3Rpb25UYWJzW3RhYl0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnZpZXcuaW5pdE1lbnUoKTtcblxuICAgIC8vIEVsZW1lbnQgZm9yIGhvbGRpbmcgbGlzdCBhbmQgZGV0YWlscyB2aWV3c1xuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtdHlwZS1zZWN0aW9uJyk7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gc2VjdGlvbjtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVMaXN0LmdldEVsZW1lbnQoKSk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmdldEVsZW1lbnQoKSk7XG5cbiAgICB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCddLCB0aGlzLmNvbnRlbnRUeXBlTGlzdCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydyZWxvYWQnXSwgdGhpcy52aWV3KTtcblxuICAgIC8vIHJlZ2lzdGVyIGxpc3RlbmVyc1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5zZWFyY2gsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy52aWV3LnNlbGVjdE1lbnVJdGVtQnlJZC5iaW5kKHRoaXMudmlldywgQ29udGVudFR5cGVTZWN0aW9uVGFicy5BTEwuaWQpKTtcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMucmVzZXRNZW51T25FbnRlciwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy5hcHBseVNlYXJjaEZpbHRlciwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy5jbGVhcklucHV0RmllbGQsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMudXBkYXRlRGlzcGxheVNlbGVjdGVkLCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5vbigncm93LXNlbGVjdGVkJywgdGhpcy5zaG93RGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignc2VsZWN0JywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xuXG4gICAgdGhpcy5pbml0Q29udGVudFR5cGVMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdCB3aXRoIGEgc2VhcmNoXG4gICAqL1xuICBpbml0Q29udGVudFR5cGVMaXN0KCkge1xuICAgIC8vIGluaXRpYWxpemUgYnkgc2VhcmNoXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChcIlwiKVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKVxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgZXJyb3JzIGNvbW11bmljYXRpbmcgd2l0aCBIVUJcbiAgICovXG4gIGhhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgLy8gVE9ETyAtIHVzZSB0cmFuc2xhdGlvbiBzeXN0ZW06XG4gICAgdGhpcy52aWV3LmRpc3BsYXlNZXNzYWdlKHtcbiAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICB0aXRsZTogJ05vdCBhYmxlIHRvIGNvbW11bmljYXRlIHdpdGggaHViLicsXG4gICAgICBjb250ZW50OiAnRXJyb3Igb2NjdXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4nXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgYSBzZWFyY2ggYW5kIHVwZGF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICAgKi9cbiAgc2VhcmNoKHtxdWVyeSwga2V5Q29kZX0pIHtcbiAgICBpZiAodGhpcy50eXBlQWhlYWRFbmFibGVkIHx8IGtleUNvZGUgPT09IDEzKSB7IC8vIFNlYXJjaCBhdXRvbWF0aWNhbGx5IG9yIG9uICdlbnRlcidcbiAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2gocXVlcnkpXG4gICAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGRpc3BsYXllZCBuYW1lIG9mIHRoZSBzZWxlY3RlZCBmaWx0ZXIgZm9yIG1vYmlsZVxuICAgKlxuICAgKiBAcGFyYW0ge1NlbGVjdGVkRWxlbWVudH0gZXZlbnRcbiAgICovXG4gIHVwZGF0ZURpc3BsYXlTZWxlY3RlZChldmVudCkge1xuICAgIHRoaXMudmlldy5zZXREaXNwbGF5U2VsZWN0ZWQoZXZlbnQuZWxlbWVudC5pbm5lclRleHQpO1xuICB9XG5cbiAgcmVzZXRNZW51T25FbnRlcih7a2V5Q29kZX0pIHtcbiAgICBpZiAoa2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHRoaXMuY2xvc2VEZXRhaWxWaWV3KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgc2VhcmNoIGZpbHRlciBkZXBlbmRpbmcgb24gd2hhdCBldmVudCBpdCByZWNlaXZlc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBFdmVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZS5jaG9pY2UgRXZlbnQgbmFtZSBvZiBjaG9zZW4gdGFiXG4gICAqL1xuICBhcHBseVNlYXJjaEZpbHRlcihlKSB7XG4gICAgc3dpdGNoKGUuY2hvaWNlKSB7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlU2VjdGlvblRhYnMuTU9TVF9QT1BVTEFSLmV2ZW50TmFtZTpcbiAgICAgICAgLy8gRmlsdGVyIG9uIHRhYidzIGZpbHRlciBwcm9wZXJ0eSwgdGhlbiB1cGRhdGUgY29udGVudCB0eXBlIGxpc3RcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgLmZpbHRlcihDb250ZW50VHlwZVNlY3Rpb25UYWJzLk1PU1RfUE9QVUxBUi5maWx0ZXJQcm9wZXJ0eSlcbiAgICAgICAgICAudGhlbihjdHMgPT4ge3RoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjdHMpfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgaW5wdXQgZmllbGRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBjbGVhcklucHV0RmllbGQoe2lkfSkge1xuICAgIGlmIChpZCAhPT0gQ29udGVudFR5cGVTZWN0aW9uVGFicy5BTEwuaWQpIHtcbiAgICAgIHRoaXMudmlldy5jbGVhcklucHV0RmllbGQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgZGV0YWlsIHZpZXdcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzaG93RGV0YWlsVmlldyh7aWR9KSB7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwubG9hZEJ5SWQoaWQpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuc2hvdygpO1xuICAgIHRoaXMudHlwZUFoZWFkRW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cblxuICAvKipcbiAgICogQ2xvc2UgZGV0YWlsIHZpZXdcbiAgICovXG4gIGNsb3NlRGV0YWlsVmlldygpIHtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5zaG93KCk7XG4gICAgdGhpcy50eXBlQWhlYWRFbmFibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJpbXBvcnQgJy4vdXRpbHMvZmV0Y2gnO1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBDb250ZW50VHlwZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFqb3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWlub3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGF0Y2hWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWFqb3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWlub3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3VtbWFyeVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNyZWF0ZWRBdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHVwZGF0ZWRfQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpc1JlY29tbWVuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9wdWxhcml0eVxuICogQHByb3BlcnR5IHtvYmplY3RbXX0gc2NyZWVuc2hvdHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsaWNlbnNlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXhhbXBsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHR1dG9yaWFsXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBrZXl3b3Jkc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG93bmVyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGluc3RhbGxlZFxuICogQHByb3BlcnR5IHtib29sZWFufSByZXN0cmljdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlNlcnZpY2VzIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcGlSb290VXJsXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7IGFwaVJvb3RVcmwgfSkge1xuICAgIHRoaXMuYXBpUm9vdFVybCA9IGFwaVJvb3RVcmw7XG4gICAgdGhpcy5zZXR1cCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHRoZSBjb250ZW50IHR5cGUgbWV0YWRhdGFcbiAgICovXG4gIHNldHVwKCkge1xuICAgIHRoaXMuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnQtdHlwZS1jYWNoZWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcbiAgICAudGhlbih0aGlzLmlzVmFsaWQpXG4gICAgLnRoZW4oanNvbiA9PiBqc29uLmxpYnJhcmllcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtICB7Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2V9IHJlc3BvbnNlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2U+fVxuICAgKi9cbiAgaXNWYWxpZChyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZS5tZXNzYWdlQ29kZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZVtdPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlcygpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZWRDb250ZW50VHlwZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZWRDb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcbiAgICB9KTtcblxuICAgIC8qcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50X3R5cGVfY2FjaGUvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpOyovXG4gIH1cblxuICAvKipcbiAgICogSW5zdGFsbHMgYSBjb250ZW50IHR5cGUgb24gdGhlIHNlcnZlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgaW5zdGFsbENvbnRlbnRUeXBlKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKG5zLmdldEFqYXhVcmwoJ2xpYnJhcnktaW5zdGFsbCcsIHtpZDogaWR9KSwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgYm9keTogJydcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcbiAgfVxuXG5cbiAgLy8gZm9yIHRlc3Rpbmcgd2l0aCBlcnJvclxuICAvKmluc3RhbGxDb250ZW50VHlwZShpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9bGlicmFyeS1pbnN0YWxsYCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH0qL1xuXG4gIC8qKlxuICAgKiBVcGxvYWRzIGEgY29udGVudCB0eXBlIHRvIHRoZSBzZXJ2ZXIgZm9yIHZhbGlkYXRpb25cbiAgICpcbiAgICogQHBhcmFtIHtGb3JtRGF0YX0gZm9ybURhdGEgRm9ybSBjb250YWluaW5nIHRoZSBoNXAgdGhhdCBzaG91bGQgYmUgdXBsb2FkZWQgYXMgJ2g1cCdcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGpzb24gY29udGFpbmluZyB0aGUgY29udGVudCBqc29uIGFuZCB0aGUgaDVwIGpzb25cbiAgICovXG4gIHVwbG9hZENvbnRlbnQoZm9ybURhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktdXBsb2FkYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgYm9keTogZm9ybURhdGFcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwiaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiXG5pbXBvcnQgaW5pdFRhYlBhbmVsIGZyb20gXCJjb21wb25lbnRzL3RhYi1wYW5lbFwiXG5pbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBhdHRyaWJ1dGVFcXVhbHMsIGdldEF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi91dGlscy9ldmVudHMnO1xuLyoqXG4gKiBUYWIgY2hhbmdlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyN0YWItY2hhbmdlXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIFBhbmVsIG9wZW4gb3IgY2xvc2UgZXZlbnRcbiAqIEBldmVudCBIdWJWaWV3I3BhbmVsLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0RBVEFfSUQgPSAnZGF0YS1pZCc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGlzT3BlbiA9IGhhc0F0dHJpYnV0ZSgnb3BlbicpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViVmlldyN0YWItY2hhbmdlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlZpZXcge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICB0aGlzLnJlbmRlclRhYlBhbmVsKHN0YXRlKTtcbiAgICB0aGlzLnJlbmRlclBhbmVsKHN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHBhbmVsXG4gICAqL1xuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4cGFuZGVkXG4gICAqL1xuICByZW5kZXJQYW5lbCh7dGl0bGUgPSAnJywgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnLCBleHBhbmRlZCA9IGZhbHNlfSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50aXRsZS5jbGFzc05hbWUgKz0gXCJwYW5lbC1oZWFkZXIgaWNvbi1odWItaWNvblwiO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgKCEhZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YCk7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncGFuZWwtY2hhbmdlJywgdGhpcywgdGhpcy50aXRsZSk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5ib2R5LmNsYXNzTmFtZSArPSBcInBhbmVsLWJvZHlcIjtcbiAgICB0aGlzLmJvZHkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMuYm9keS5pZCA9IGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWA7XG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lICs9IGBwYW5lbCBoNXAtc2VjdGlvbi0ke3NlY3Rpb25JZH1gO1xuICAgIGlmKGV4cGFuZGVkKXtcbiAgICAgIHRoaXMucGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgIH1cbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5ib2R5KTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lICs9IGBoNXAtaHViIGg1cC1zZGtgO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gICAgaW5pdFBhbmVsKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpZiBwYW5lbCBpcyBvcGVuLCB0aGlzIGlzIHVzZWQgZm9yIG91dGVyIGJvcmRlciBjb2xvclxuICAgKi9cbiAgdG9nZ2xlUGFuZWxPcGVuKCkge1xuICAgIGxldCBwYW5lbCA9IHRoaXMucGFuZWw7XG4gICAgaWYoaXNPcGVuKHBhbmVsKSkge1xuICAgICAgcGFuZWwucmVtb3ZlQXR0cmlidXRlKCdvcGVuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3BhbmVsLnF1ZXJ5U2VsZWN0b3IoJyNodWItc2VhcmNoLWJhcicpLmZvY3VzKCl9LDIwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgdGFiIHBhbmVsXG4gICAqL1xuICByZW5kZXJUYWJQYW5lbChzdGF0ZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYmxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMudGFibGlzdC5jbGFzc05hbWUgKz0gXCJ0YWJsaXN0XCI7XG4gICAgdGhpcy50YWJsaXN0LnNldEF0dHJpYnV0ZSAoJ3JvbGUnLCAndGFibGlzdCcpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKHRoaXMudGFibGlzdCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmNsYXNzTmFtZSArPSAndGFiLXBhbmVsJztcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50YWJMaXN0V3JhcHBlcik7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHRhYlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRlbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxuICAgKi9cbiAgYWRkVGFiKHt0aXRsZSwgaWQsIGNvbnRlbnQsIHNlbGVjdGVkID0gZmFsc2V9KSB7XG4gICAgY29uc3QgdGFiSWQgPSBgdGFiLSR7aWR9YDtcbiAgICBjb25zdCB0YWJQYW5lbElkID0gYHRhYi1wYW5lbC0ke2lkfWA7XG5cbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRhYi5jbGFzc05hbWUgKz0gJ3RhYic7XG4gICAgdGFiLmlkID0gdGFiSWQ7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRhYlBhbmVsSWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBzZWxlY3RlZC50b1N0cmluZygpKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKEFUVFJJQlVURV9EQVRBX0lELCBpZCk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWInKTtcbiAgICB0YWIuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3RhYi1jaGFuZ2UnLCB0aGlzLCB0YWIpO1xuXG4gICAgY29uc3QgdGFiUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YWJQYW5lbC5pZCA9IHRhYlBhbmVsSWQ7XG4gICAgdGFiUGFuZWwuY2xhc3NOYW1lICs9ICd0YWJwYW5lbCc7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmxsZWRieScsIHRhYklkKTtcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgKCFzZWxlY3RlZCkudG9TdHJpbmcoKSk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYnBhbmVsJyk7XG4gICAgdGFiUGFuZWwuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQodGFiKTtcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGFiUGFuZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gYW5pbWF0ZWQgYm9yZGVyIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhYlxuICAgKi9cbiAgYWRkQm90dG9tQm9yZGVyKCkge1xuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpO1xuICB9XG5cbiAgaW5pdFRhYlBhbmVsKCkge1xuICAgIGluaXRUYWJQYW5lbCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRTZWN0aW9uVHlwZSh7aWR9KSB7XG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgPSBgaDVwLXNlY3Rpb24tJHtpZH0gcGFuZWxgO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJpbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHtyZWxheUNsaWNrRXZlbnRBc30gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3XG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZVZpZXcge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUudHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUudGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLmNvbnRlbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzdGF0ZS5hY3Rpb25dXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RhdGUuZGlzbWlzc2FibGVdXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRzXG4gICAgdGhpcy5yb290RWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudChzdGF0ZSk7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KG1lc3NhZ2UpIHtcbiAgICAvLyBDcmVhdGUgd3JhcHBlcjpcbiAgICBjb25zdCBtZXNzYWdlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1lc3NhZ2VXcmFwcGVyLmNsYXNzTmFtZSA9IGBtZXNzYWdlICR7bWVzc2FnZS50eXBlfWAgKyAobWVzc2FnZS5kaXNtaXNzaWJsZSA/ICcgZGlzbWlzc2libGUnIDogJycpO1xuXG4gICAgLy8gQWRkIGNsb3NlIGJ1dHRvbiBpZiBkaXNtaXNhYmxlXG4gICAgaWYgKG1lc3NhZ2UuZGlzbWlzc2libGUpIHtcbiAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSAnY2xvc2UnO1xuICAgICAgLy9jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJiN4MjcxNSc7XG4gICAgICAvLyBUT0RPXG4gICAgICAvLyAtIEFkZCBjbG9zZSBsYWJlbCBmcm9tIHRyYW5zbGF0aW9uc1xuICAgICAgLy8gLSBBZGQgdmlzdWFscyBpbiBDU1MgKGZvbnQgaWNvbilcbiAgICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIGNsb3NlQnV0dG9uKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1lc3NhZ2VDb250ZW50LmNsYXNzTmFtZSA9ICdtZXNzYWdlLWNvbnRlbnQnO1xuICAgIG1lc3NhZ2VDb250ZW50LmlubmVySFRNTCA9ICc8aDI+JyArIG1lc3NhZ2UudGl0bGUgKyAnPC9oMj4nICsgJzxwPicgKyBtZXNzYWdlLmNvbnRlbnQgKyAnPC9wPic7XG4gICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUNvbnRlbnQpO1xuXG4gICAgaWYgKG1lc3NhZ2UuYWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIG1lc3NhZ2VCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbic7XG4gICAgICBtZXNzYWdlQnV0dG9uLmlubmVySFRNTCA9IG1lc3NhZ2UuYWN0aW9uO1xuICAgICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUJ1dHRvbik7XG5cbiAgICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdhY3Rpb24tY2xpY2tlZCcsIHRoaXMsIG1lc3NhZ2VCdXR0b24pO1xuICAgIH1cblxuICAgIHJldHVybiBtZXNzYWdlV3JhcHBlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgb2YgdGhlIGNvbnRlbnQgYnJvd3NlclxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL21lc3NhZ2Utdmlldy9tZXNzYWdlLXZpZXcuanMiLCJpbXBvcnQge2N1cnJ5fSBmcm9tICd1dGlscy9mdW5jdGlvbmFsJ1xuXG4vKipcbiAqIEBjbGFzc1xuICogVGhlIFNlYXJjaCBTZXJ2aWNlIGdldHMgYSBjb250ZW50IHR5cGUgZnJvbSBodWItc2VydmljZXMuanNcbiAqIGluIHRoZSBmb3JtIG9mIGEgcHJvbWlzZS4gSXQgdGhlbiBnZW5lcmF0ZXMgYSBzY29yZSBiYXNlZFxuICogb24gdGhlIGRpZmZlcmVudCB3ZWlnaHRpbmdzIG9mIHRoZSBjb250ZW50IHR5cGUgZmllbGRzIGFuZFxuICogc29ydHMgdGhlIHJlc3VsdHMgYmFzZWQgb24gdGhlIGdlbmVyYXRlZCBzY29yZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoU2VydmljZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlNlcnZpY2VzfSBzZXJ2aWNlc1xuICAgKi9cbiAgY29uc3RydWN0b3Ioc2VydmljZXMpIHtcbiAgICB0aGlzLnNlcnZpY2VzID0gc2VydmljZXM7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBzZWFyY2hcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXT59IEEgcHJvbWlzZSBvZiBhbiBhcnJheSBvZiBjb250ZW50IHR5cGVzXG4gICAqL1xuICBzZWFyY2gocXVlcnkpIHtcbiAgICAvLyBBZGQgY29udGVudCB0eXBlcyB0byB0aGUgc2VhcmNoIGluZGV4XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKCkudGhlbihmaWx0ZXJCeVF1ZXJ5KHF1ZXJ5KSk7XG4gIH1cblxuICAvKipcbiAgICogRmlsdGVyIGFsbCBjb250ZW50IHR5cGVzIGJ5IGdpdmVuIHByb3BlcnR5XG4gICAqXG4gICAqIEBwYXJhbSBwcm9wZXJ0eVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZVtdPnwqfVxuICAgKi9cbiAgZmlsdGVyKHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKClcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiBjb250ZW50VHlwZXMuc29ydCgoY3QxLCBjdDIpID0+IHtcblxuICAgICAgICAvLyBQcm9wZXJ0eSBkb2VzIG5vdCBleGlzdCwgbW92ZSB0byBib3R0b21cbiAgICAgICAgaWYgKCFjdDEuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWN0Mi5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTb3J0IG9uIHByb3BlcnR5XG4gICAgICAgIGlmIChjdDFbcHJvcGVydHldID4gY3QyW3Byb3BlcnR5XSkge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGN0MVtwcm9wZXJ0eV0gPCBjdDJbcHJvcGVydHldKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBGaWx0ZXJzIGEgbGlzdCBvZiBjb250ZW50IHR5cGVzIGJhc2VkIG9uIGEgcXVlcnlcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcbiAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gKi9cbmNvbnN0IGZpbHRlckJ5UXVlcnkgPSBjdXJyeShmdW5jdGlvbihxdWVyeSwgY29udGVudFR5cGVzKSB7XG4gIGlmIChxdWVyeSA9PSAnJykge1xuICAgIHJldHVybiBjb250ZW50VHlwZXM7XG4gIH1cblxuICAvLyBBcHBlbmQgYSBzZWFyY2ggc2NvcmUgdG8gZWFjaCBjb250ZW50IHR5cGVcbiAgcmV0dXJuIGNvbnRlbnRUeXBlcy5tYXAoY29udGVudFR5cGUgPT5cbiAgICAoe1xuICAgICAgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgc2NvcmU6IGdldFNlYXJjaFNjb3JlKHF1ZXJ5LCBjb250ZW50VHlwZSlcbiAgICB9KSlcbiAgICAuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc2NvcmUgPiAwKVxuICAgIC5zb3J0KHNvcnRTZWFyY2hSZXN1bHRzKSAvLyBTb3J0IGJ5IGluc3RhbGxlZCwgcmVsZXZhbmNlIGFuZCBwb3B1bGFyaXR5XG4gICAgLm1hcChyZXN1bHQgPT4gcmVzdWx0LmNvbnRlbnRUeXBlKTsgLy8gVW53cmFwIHJlc3VsdCBvYmplY3Q7XG59KTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgQXJyYXkuc29ydCgpXG4gKiBDb21wYXJlcyB0d28gY29udGVudCB0eXBlcyBvbiBkaWZmZXJlbnQgY3JpdGVyaWFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBGaXJzdCBjb250ZW50IHR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFNlY29uZCBjb250ZW50IHR5cGVcbiAqIEByZXR1cm4ge2ludH1cbiAqL1xuY29uc3Qgc29ydFNlYXJjaFJlc3VsdHMgPSAoYSxiKSA9PiB7XG4gIGlmICghYS5jb250ZW50VHlwZS5pbnN0YWxsZWQgJiYgYi5jb250ZW50VHlwZS5pbnN0YWxsZWQpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmIChhLmNvbnRlbnRUeXBlLmluc3RhbGxlZCAmJiAhYi5jb250ZW50VHlwZS5pbnN0YWxsZWQpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBlbHNlIGlmIChiLnNjb3JlICE9PSBhLnNjb3JlKSB7XG4gICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlO1xuICB9XG5cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGIuY29udGVudFR5cGUucG9wdWxhcml0eSAtIGEuY29udGVudFR5cGUucG9wdWxhcml0eTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHdlaWdodGluZyBmb3IgZGlmZmVyZW50IHNlYXJjaCB0ZXJtcyBiYXNlZFxuICogb24gZXhpc3RlbmNlIG9mIHN1YnN0cmluZ3NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRlbnRUeXBlXG4gKiBAcmV0dXJuIHtpbnR9XG4gKi9cbiBjb25zdCBnZXRTZWFyY2hTY29yZSA9IGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZSkge1xuICAgbGV0IHF1ZXJpZXMgPSBxdWVyeS5zcGxpdCgnICcpLmZpbHRlcihxdWVyeSA9PiBxdWVyeSAhPT0gJycpO1xuICAgbGV0IHF1ZXJ5U2NvcmVzID0gcXVlcmllcy5tYXAocXVlcnkgPT4gZ2V0U2NvcmVGb3JFYWNoUXVlcnkocXVlcnksIGNvbnRlbnRUeXBlKSk7XG4gICBpZiAocXVlcnlTY29yZXMuaW5kZXhPZigwKSA+IC0xKSB7XG4gICAgIHJldHVybiAwO1xuICAgfVxuICAgcmV0dXJuIHF1ZXJ5U2NvcmVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuIH07XG5cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByZWxldmFuY2Ugc2NvcmUgZm9yIGEgc2luZ2xlIHN0cmluZ1xuICpcbiAqIEBwYXJhbSAge3R5cGV9IHF1ZXJ5ICAgICAgIGRlc2NyaXB0aW9uXG4gKiBAcGFyYW0gIHt0eXBlfSBjb250ZW50VHlwZSBkZXNjcmlwdGlvblxuICogQHJldHVybiB7dHlwZX0gICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAqL1xuY29uc3QgZ2V0U2NvcmVGb3JFYWNoUXVlcnkgPSBmdW5jdGlvbiAocXVlcnksIGNvbnRlbnRUeXBlKSB7XG4gICBxdWVyeSA9IHF1ZXJ5LnRyaW0oKTtcbiAgIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLnRpdGxlKSkge1xuICAgICByZXR1cm4gMTAwO1xuICAgfVxuICAgZWxzZSBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5zdW1tYXJ5KSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuZGVzY3JpcHRpb24pKSB7XG4gICAgIHJldHVybiA1O1xuICAgfVxuICAgZWxzZSBpZiAoYXJyYXlIYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmtleXdvcmRzKSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2Uge1xuICAgICByZXR1cm4gMDtcbiAgIH1cbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbmVlZGxlIGlzIGZvdW5kIGluIHRoZSBoYXlzdGFjay5cbiAqIE5vdCBjYXNlIHNlbnNpdGl2ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuZWVkbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXlzdGFja1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaGFzU3ViU3RyaW5nID0gZnVuY3Rpb24obmVlZGxlLCBoYXlzdGFjaykge1xuICBpZiAoaGF5c3RhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBoYXlzdGFjay50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlLnRvTG93ZXJDYXNlKCkpICE9PSAtMTtcbn07XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uLCBjaGVja3MgaWYgYXJyYXkgaGFzIGNvbnRhaW5zIGEgc3Vic3RyaW5nXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBzdWJTdHJpbmdcbiAqIEBwYXJhbSAge0FycmF5fSBhcnJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGFycmF5SGFzU3ViU3RyaW5nID0gZnVuY3Rpb24oc3ViU3RyaW5nLCBhcnIpIHtcbiAgaWYgKGFyciA9PT0gdW5kZWZpbmVkIHx8IHN1YlN0cmluZyA9PT0gJycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYXJyLnNvbWUoc3RyaW5nID0+IGhhc1N1YlN0cmluZyhzdWJTdHJpbmcsIHN0cmluZykpO1xufTtcblxuY29uc3QgQWRkTnVtYmVyPWZ1bmN0aW9uKGEsYilcbntcbiAgcmV0dXJuIGErYjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwiaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKlxuICogQGZpcmVzIEh1YiN1cGxvYWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkU2VjdGlvbiB7XG5cbiAgY29uc3RydWN0b3Ioc3RhdGUsIHNlcnZpY2VzKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IHNlcnZpY2VzO1xuXG4gICAgLy8gSW5wdXQgZWxlbWVudCBmb3IgdGhlIEg1UCBmaWxlXG4gICAgY29uc3QgaDVwVXBsb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBoNXBVcGxvYWQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2ZpbGUnKTtcblxuICAgIC8vIFNlbmRzIHRoZSBINVAgZmlsZSB0byB0aGUgcGx1Z2luXG4gICAgY29uc3QgdXNlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdXNlQnV0dG9uLnRleHRDb250ZW50ID0gJ1VzZSc7XG4gICAgdXNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAvLyBBZGQgdGhlIEg1UCBmaWxlIHRvIGEgZm9ybSwgcmVhZHkgZm9yIHRyYW5zcG9ydGF0aW9uXG4gICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBkYXRhLmFwcGVuZCgnaDVwJywgaDVwVXBsb2FkLmZpbGVzWzBdKTtcblxuICAgICAgLy8gVXBsb2FkIGNvbnRlbnQgdG8gdGhlIHBsdWdpblxuICAgICAgdGhpcy5zZXJ2aWNlcy51cGxvYWRDb250ZW50KGRhdGEpXG4gICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgIC8vIEZpcmUgdGhlIHJlY2VpdmVkIGRhdGEgdG8gYW55IGxpc3RlbmVyc1xuICAgICAgICAgIHNlbGYuZmlyZSgndXBsb2FkJywganNvbik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaDVwVXBsb2FkKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHVzZUJ1dHRvbik7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwiKGZ1bmN0aW9uKHNlbGYpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmIChzZWxmLmZldGNoKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjogJ0ZpbGVSZWFkZXInIGluIHNlbGYgJiYgJ0Jsb2InIGluIHNlbGYgJiYgKGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEJsb2IoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gICAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gc2VsZixcbiAgICBhcnJheUJ1ZmZlcjogJ0FycmF5QnVmZmVyJyBpbiBzZWxmXG4gIH1cblxuICBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICAgIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICAgIF1cblxuICAgIHZhciBpc0RhdGFWaWV3ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIERhdGFWaWV3LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKG9iailcbiAgICB9XG5cbiAgICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPSBBcnJheUJ1ZmZlci5pc1ZpZXcgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHZpZXdDbGFzc2VzLmluZGV4T2YoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpID4gLTFcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lID0gU3RyaW5nKG5hbWUpXG4gICAgfVxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLlxcXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvLyBCdWlsZCBhIGRlc3RydWN0aXZlIGl0ZXJhdG9yIGZvciB0aGUgdmFsdWUgbGlzdFxuICBmdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICAgIHZhciBpdGVyYXRvciA9IHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpXG4gICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVyYXRvclxuICB9XG5cbiAgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgdGhpcy5tYXAgPSB7fVxuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgICB0aGlzLmFwcGVuZChoZWFkZXJbMF0sIGhlYWRlclsxXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gICAgdmFyIG9sZFZhbHVlID0gdGhpcy5tYXBbbmFtZV1cbiAgICB0aGlzLm1hcFtuYW1lXSA9IG9sZFZhbHVlID8gb2xkVmFsdWUrJywnK3ZhbHVlIDogdmFsdWVcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbFxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVOYW1lKG5hbWUpKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLm1hcCkge1xuICAgICAgaWYgKHRoaXMubWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpcy5tYXBbbmFtZV0sIG5hbWUsIHRoaXMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2gobmFtZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkgeyBpdGVtcy5wdXNoKHZhbHVlKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllc1xuICB9XG5cbiAgZnVuY3Rpb24gY29uc3VtZWQoYm9keSkge1xuICAgIGlmIChib2R5LmJvZHlVc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJykpXG4gICAgfVxuICAgIGJvZHkuYm9keVVzZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpXG4gICAgICB9XG4gICAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICAgIHZhciBjaGFycyA9IG5ldyBBcnJheSh2aWV3Lmxlbmd0aClcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgICAgY2hhcnNbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXdbaV0pXG4gICAgfVxuICAgIHJldHVybiBjaGFycy5qb2luKCcnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gICAgaWYgKGJ1Zi5zbGljZSkge1xuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKVxuICAgICAgdmlldy5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmKSlcbiAgICAgIHJldHVybiB2aWV3LmJ1ZmZlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxuICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gJydcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5mb3JtRGF0YSAmJiBGb3JtRGF0YS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5Rm9ybURhdGEgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKVxuICAgICAgICAvLyBJRSAxMC0xMSBjYW4ndCBoYW5kbGUgYSBEYXRhVmlldyBib2R5LlxuICAgICAgICB0aGlzLl9ib2R5SW5pdCA9IG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIChBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSB8fCBpc0FycmF5QnVmZmVyVmlldyhib2R5KSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgQm9keUluaXQgdHlwZScpXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKVxuICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlCbG9iKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyBibG9iJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5VGV4dF0pKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBjb25zdW1lZCh0aGlzKSB8fCBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUFycmF5QnVmZmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVhZEFycmF5QnVmZmVyQXNUZXh0KHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEhUVFAgbWV0aG9kcyB3aG9zZSBjYXBpdGFsaXphdGlvbiBzaG91bGQgYmUgbm9ybWFsaXplZFxuICB2YXIgbWV0aG9kcyA9IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnLCAnUE9TVCcsICdQVVQnXVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gICAgcmV0dXJuIChtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSkgPyB1cGNhc2VkIDogbWV0aG9kXG4gIH1cblxuICBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keVxuXG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybFxuICAgICAgdGhpcy5jcmVkZW50aWFscyA9IGlucHV0LmNyZWRlbnRpYWxzXG4gICAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKVxuICAgICAgfVxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2RcbiAgICAgIHRoaXMubW9kZSA9IGlucHV0Lm1vZGVcbiAgICAgIGlmICghYm9keSAmJiBpbnB1dC5fYm9keUluaXQgIT0gbnVsbCkge1xuICAgICAgICBib2R5ID0gaW5wdXQuX2JvZHlJbml0XG4gICAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dClcbiAgICB9XG5cbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdvbWl0J1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbFxuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KVxuICB9XG5cbiAgUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcywgeyBib2R5OiB0aGlzLl9ib2R5SW5pdCB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgYm9keS50cmltKCkuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKVxuICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBmb3JtXG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUhlYWRlcnMocmF3SGVhZGVycykge1xuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuICAgIC8vIFJlcGxhY2UgaW5zdGFuY2VzIG9mIFxcclxcbiBhbmQgXFxuIGZvbGxvd2VkIGJ5IGF0IGxlYXN0IG9uZSBzcGFjZSBvciBob3Jpem9udGFsIHRhYiB3aXRoIGEgc3BhY2VcbiAgICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMCNzZWN0aW9uLTMuMlxuICAgIHZhciBwcmVQcm9jZXNzZWRIZWFkZXJzID0gcmF3SGVhZGVycy5yZXBsYWNlKC9cXHI/XFxuW1xcdCBdKy8sICcgJylcbiAgICBwcmVQcm9jZXNzZWRIZWFkZXJzLnNwbGl0KC9cXHI/XFxuLykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6JylcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKVxuICAgICAgaWYgKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5qb2luKCc6JykudHJpbSgpXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gaGVhZGVyc1xuICB9XG5cbiAgQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgICB0aGlzLnN0YXR1cyA9ICdzdGF0dXMnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1cyA6IDIwMFxuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSydcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KVxuICB9XG5cbiAgQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcblxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIHVybDogdGhpcy51cmxcbiAgICB9KVxuICB9XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KVxuICAgIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuICBSZXNwb25zZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKHVybCwgc3RhdHVzKSB7XG4gICAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogc3RhdHVzLCBoZWFkZXJzOiB7bG9jYXRpb246IHVybH19KVxuICB9XG5cbiAgc2VsZi5IZWFkZXJzID0gSGVhZGVyc1xuICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZVxuXG4gIHNlbGYuZmV0Y2ggPSBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXG4gICAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKVxuICAgICAgfVxuXG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSlcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyICYmIHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgfSlcblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcbiAgICB9KVxuICB9XG4gIHNlbGYuZmV0Y2gucG9seWZpbGwgPSB0cnVlXG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9mZXRjaC5qcyIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUsIGNsYXNzTGlzdENvbnRhaW5zLCBxdWVyeVNlbGVjdG9yLCBub2RlTGlzdFRvQXJyYXkgfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqL1xuY29uc3QgQVRUUklCVVRFX1NJWkUgPSAnZGF0YS1zaXplJztcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGRpc2FibGUgPSBzZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgZW5hYmxlID0gcmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlZFxuICovXG5jb25zdCB0b2dnbGVFbmFibGVkID0gKGVsZW1lbnQsIGVuYWJsZWQpID0+IChlbmFibGVkID8gZW5hYmxlIDogZGlzYWJsZSkoZWxlbWVudCk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBoaWRkZW5cbiAqL1xuY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IGN1cnJ5KChoaWRkZW4sIGVsZW1lbnQpID0+IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBoaWRkZW4udG9TdHJpbmcoKSwgZWxlbWVudCkpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaXNEaXNhYmxlZCA9IGhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIHZpZXdcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0ltYWdlU2Nyb2xsZXJTdGF0ZX0gc3RhdGVcbiAqL1xuY29uc3QgdXBkYXRlVmlldyA9IChlbGVtZW50LCBzdGF0ZSkgPT4ge1xuICBjb25zdCBwcmV2QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMnKTtcbiAgY29uc3QgbmV4dEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQnKTtcbiAgY29uc3QgbGlzdCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGxpc3QuY2hpbGRFbGVtZW50Q291bnQ7XG5cbiAgLy8gdXBkYXRlIGxpc3Qgc2l6ZXNcbiAgbGlzdC5zdHlsZS53aWR0aCA9IGAkezEwMCAvIHN0YXRlLmRpc3BsYXlDb3VudCAqIHRvdGFsQ291bnR9JWA7XG4gIGxpc3Quc3R5bGUubWFyZ2luTGVmdCA9IGAke3N0YXRlLnBvc2l0aW9uICogKDEwMCAvIHN0YXRlLmRpc3BsYXlDb3VudCl9JWA7XG5cbiAgLy8gdXBkYXRlIGltYWdlIHNpemVzXG4gIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGknKVxuICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5zdHlsZS53aWR0aCA9IGAkezEwMCAvIHRvdGFsQ291bnR9JWApO1xuXG4gIC8vIHRvZ2dsZSBidXR0b24gdmlzaWJpbGl0eVxuICBbcHJldkJ1dHRvbiwgbmV4dEJ1dHRvbl1cbiAgICAuZm9yRWFjaCh0b2dnbGVWaXNpYmlsaXR5KHN0YXRlLmRpc3BsYXlDb3VudCA+PSB0b3RhbENvdW50KSk7XG5cbiAgLy8gdG9nZ2xlIGJ1dHRvbiBlbmFibGUsIGRpc2FibGVkXG4gIHRvZ2dsZUVuYWJsZWQobmV4dEJ1dHRvbiwgc3RhdGUucG9zaXRpb24gPiAoc3RhdGUuZGlzcGxheUNvdW50IC0gdG90YWxDb3VudCkpO1xuICB0b2dnbGVFbmFibGVkKHByZXZCdXR0b24sIHN0YXRlLnBvc2l0aW9uIDwgMCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgYnV0dG9uIGNsaWNrZWRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0ltYWdlU2Nyb2xsZXJTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJ1dHRvblxuICogQHBhcmFtIHtmdW5jdGlvbn0gdXBkYXRlU3RhdGVcbiAqIEBwYXJhbSB7RXZlbnR9XG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2sgPSBjdXJyeSgoZWxlbWVudCwgc3RhdGUsIGJ1dHRvbiwgdXBkYXRlU3RhdGUsIGV2ZW50KSA9PiB7XG4gIGlmKCFpc0Rpc2FibGVkKGJ1dHRvbikpe1xuICAgIHVwZGF0ZVN0YXRlKHN0YXRlKTtcbiAgICB1cGRhdGVWaWV3KGVsZW1lbnQsIHN0YXRlKTtcbiAgfVxufSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gaW1hZ2VcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpbWFnZVxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGluaXRJbWFnZSA9IGN1cnJ5KChlbGVtZW50LCBpbWFnZSkgPT4ge1xuICBsZXQgdGFyZ2V0SWQgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgbGV0IHRhcmdldCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFyZ2V0SWR9YCk7XG5cbiAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcbiAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpKVxufSk7XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHdoZW4gdGhlIGRvbSBpcyB1cGRhdGVkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSByZWNvcmRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoYW5kbGVEb21VcGRhdGUgPSBjdXJyeSgoZWxlbWVudCwgc3RhdGUsIHJlY29yZCkgPT4ge1xuICAvLyBvbiBhZGQgaW1hZ2UgcnVuIGluaXRpYWxpemF0aW9uXG4gIGlmKHJlY29yZC50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgIG5vZGVMaXN0VG9BcnJheShyZWNvcmQuYWRkZWROb2RlcylcbiAgICAgIC5maWx0ZXIoY2xhc3NMaXN0Q29udGFpbnMoJ3NsaWRlJykpXG4gICAgICAubWFwKHF1ZXJ5U2VsZWN0b3IoJ2ltZycpKVxuICAgICAgLmZvckVhY2goaW5pdEltYWdlKGVsZW1lbnQpKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgdmlld1xuICB1cGRhdGVWaWV3KGVsZW1lbnQsIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxuICAgIHBvc2l0aW9uOiAwXG4gIH0pKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIC8vIGdldCBidXR0b24gaHRtbCBlbGVtZW50c1xuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICBjb25zdCBwcmV2QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMnKTtcblxuICAvKipcbiAgICogQHR5cGVkZWYge29iamVjdH0gSW1hZ2VTY3JvbGxlclN0YXRlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkaXNwbGF5Q291bnRcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHBvc2l0aW9uXG4gICAqL1xuICBjb25zdCBzdGF0ZSA9IHtcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxuICAgIHBvc2l0aW9uOiAwXG4gIH07XG5cbiAgLy8gaW5pdGlhbGl6ZSBidXR0b25zXG4gIG5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk5hdmlnYXRpb25CdXR0b25DbGljayhlbGVtZW50LCBzdGF0ZSwgbmV4dEJ1dHRvbiwgc3RhdGUgPT4gc3RhdGUucG9zaXRpb24tLSkpO1xuICBwcmV2QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2soZWxlbWVudCwgc3RhdGUsIHByZXZCdXR0b24sIHN0YXRlID0+IHN0YXRlLnBvc2l0aW9uKyspKTtcblxuICAvLyBpbml0aWFsaXplIGltYWdlc1xuICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1thcmlhLWNvbnRyb2xzXScpLmZvckVhY2goaW5pdEltYWdlKGVsZW1lbnQpKTtcblxuICAvLyBsaXN0ZW4gZm9yIHVwZGF0ZXMgdG8gZGF0YS1zaXplXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZvckVhY2goaGFuZGxlRG9tVXBkYXRlKGVsZW1lbnQsIHN0YXRlKSkpO1xuXG4gIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwge1xuICAgIHN1YnRyZWU6IHRydWUsXG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbQVRUUklCVVRFX1NJWkVdXG4gIH0pO1xuXG4gIC8vIGluaXRpYWxpemUgcG9zaXRpb25cbiAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlci5qcyIsImltcG9ydCB7c2V0QXR0cmlidXRlLCB0b2dnbGVBdHRyaWJ1dGUsIGhpZGUsIHNob3csIHRvZ2dsZVZpc2liaWxpdHl9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuaW1wb3J0IHsgaW5pdENvbGxhcHNpYmxlIH0gZnJvbSAnLi4vdXRpbHMvYXJpYSc7XG5cbi8qKlxuICogVW5zZWxlY3RzIGFsbCBlbGVtZW50cyBpbiBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCB1blNlbGVjdEFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJykpO1xuXG4vKipcbiAqIFNldHMgdGhlIGFyaWEtZXhwYW5kZWQgYXR0cmlidXRlIG9uIGFuIGVsZW1lbnQgdG8gZmFsc2VcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmNvbnN0IHVuRXhwYW5kID0gc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogSW5pdGlhdGVzIGEgdGFiIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgLy8gZWxlbWVudHNcbiAgY29uc3QgbWVudUl0ZW1zID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cIm1lbnVpdGVtXCJdJyk7XG4gIGNvbnN0IHRvZ2dsZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScpO1xuXG4gIC8vIG1vdmUgc2VsZWN0XG4gIG1lbnVJdGVtcy5mb3JFYWNoKG1lbnVJdGVtID0+IHtcbiAgICBtZW51SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHVuU2VsZWN0QWxsKG1lbnVJdGVtcyk7XG4gICAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgIHVuRXhwYW5kKHRvZ2dsZXIpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBpbml0IGNvbGxhcHNlIGFuZCBvcGVuXG4gIGluaXRDb2xsYXBzaWJsZShlbGVtZW50KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvbWVudS5qcyIsImltcG9ydCB7c2V0QXR0cmlidXRlfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2ZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaGlkZUFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJykpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKSk7XG5cbi8qKlxuICogSW5pdGlhdGVzIGEgdGFiIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgY29uc3QgdGFicyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJcIl0nKTtcbiAgY29uc3QgdGFiUGFuZWxzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYnBhbmVsXCJdJyk7XG5cbiAgdGFicy5mb3JFYWNoKHRhYiA9PiB7XG4gICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgIHVuU2VsZWN0QWxsKHRhYnMpO1xuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG5cbiAgICAgIGhpZGVBbGwodGFiUGFuZWxzKTtcblxuICAgICAgbGV0IHRhYlBhbmVsSWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gICAgICBzaG93KGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFiUGFuZWxJZH1gKSk7XG4gICAgfSk7XG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3RhYi1wYW5lbC5qcyIsInJlcXVpcmUoJy4uLy4uL3NyYy9zdHlsZXMvbWFpbi5zY3NzJyk7XG5cbi8vIExvYWQgbGlicmFyeVxuSDVQID0gSDVQIHx8IHt9O1xuSDVQLkh1YkNsaWVudCA9IHJlcXVpcmUoJy4uL3NjcmlwdHMvaHViJykuZGVmYXVsdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwic291cmNlUm9vdCI6IiJ9