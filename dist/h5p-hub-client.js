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
/* 0 */,
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
 *  Transforms a DOM click event into an EventDispatcher's event
 *  @see EventDispatcher
 *
 * @param  {string | Object} type
 * @param  {EventDispatcher} dispatcher
 * @param  {HTMLElement} element
 * @return {HTMLElement}
 */
var relayClickEventAs = exports.relayClickEventAs = (0, _functional.curry)(function (type, dispatcher, element) {
  element.addEventListener('click', function (event) {
    dispatcher.trigger(type, {
      element: element,
      id: element.getAttribute('data-id')
    }, false);

    // don't bubble
    event.stopPropagation();
  });

  return element;
});

/***/ }),
/* 4 */,
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

var _eventDispatcher = __webpack_require__(37);

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
 * @mixes EventDispatcher
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
    _extends(this, (0, _eventDispatcher.EventDispatcher)());
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

var _eventDispatcher = __webpack_require__(37);

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
 * @mixes EventDispatcher
 */

var ContentTypeDetailView = function () {
  function ContentTypeDetailView(state) {
    var _this = this;

    _classCallCheck(this, ContentTypeDetailView);

    // add event system
    _extends(this, (0, _eventDispatcher.EventDispatcher)());

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

var _eventDispatcher = __webpack_require__(37);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @mixes EventDispatcher
 */
var ContentTypeDetail = function () {
  function ContentTypeDetail(state, services) {
    _classCallCheck(this, ContentTypeDetail);

    // add event system
    _extends(this, (0, _eventDispatcher.EventDispatcher)());

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

var _eventDispatcher = __webpack_require__(37);

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
 * @mixes EventDispatcher
 * @fires Hub#select
 * @fires ContentTypeList#row-selected
 */

var ContentTypeListView = function () {
  function ContentTypeListView(state) {
    _classCallCheck(this, ContentTypeListView);

    this.state = state;

    // add event system
    _extends(this, (0, _eventDispatcher.EventDispatcher)());

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
     * @param {EventDispatcher} scope
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

var _eventDispatcher = __webpack_require__(37);

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
 * @mixes EventDispatcher
 * @fires Hub#select
 * @fires ContentTypeList#row-selected
 * @fires ContentTypeList#update-content-type-list
 */
var ContentTypeList = function () {
  function ContentTypeList(state) {
    _classCallCheck(this, ContentTypeList);

    // add event system
    _extends(this, (0, _eventDispatcher.EventDispatcher)());

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

var _messageView = __webpack_require__(18);

var _messageView2 = _interopRequireDefault(_messageView);

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

var _events = __webpack_require__(3);

var _menu = __webpack_require__(23);

var _menu2 = _interopRequireDefault(_menu);

var _eventDispatcher = __webpack_require__(37);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @param {HTMLElement[]} elements
 * @function
 */
var unselectAll = (0, _functional.forEach)((0, _elements.removeAttribute)('aria-selected'));

/**
 * @class ContentBrowserView
 * @mixes EventDispatcher
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
    _extends(this, (0, _eventDispatcher.EventDispatcher)());

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
      if (typeAheadEnabled) {
        //Don't always allow immediate searching
        _this.fire('search', {
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

var _eventDispatcher = __webpack_require__(37);

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
 * @mixes EventDispatcher
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
    _extends(this, (0, _eventDispatcher.EventDispatcher)());

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
    this.view.on('menu-selected', this.closeDetailView, this);
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

var _eventDispatcher = __webpack_require__(37);

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
 * @mixes EventDispatcher
 * @fires HubView#tab-change
 */

var HubView = function () {
  /**
   * @param {HubState} state
   */
  function HubView(state) {
    _classCallCheck(this, HubView);

    // add event system
    _extends(this, (0, _eventDispatcher.EventDispatcher)());

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

var _eventDispatcher = __webpack_require__(37);

var _events = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ContentBrowserView
 * @mixes EventDispatcher
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
    _extends(this, (0, _eventDispatcher.EventDispatcher)());

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

var _eventDispatcher = __webpack_require__(37);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @mixes EventDispatcher
 *
 * @fires Hub#upload
 */
var UploadSection = function () {
  function UploadSection(state, services) {
    var _this = this;

    _classCallCheck(this, UploadSection);

    var self = this;
    _extends(this, (0, _eventDispatcher.EventDispatcher)());

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

/***/ }),
/* 26 */,
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @mixin
 */
var EventDispatcher = exports.EventDispatcher = function EventDispatcher() {
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
     * @return {EventDispatcher}
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
     * Listens for events on another EventDispatcher, and propagate it trough this EventDispatcher
     *
     * @param {string[]} types
     * @param {EventDispatcher} dispatcher
     * @param {String} [eventName] the name of the event when propogated
     */
    propagate: function propagate(types, dispatcher, newType) {
      var self = this;
      types.forEach(function (type) {
        return dispatcher.on(type, function (event) {
          return self.trigger(newType || type, event);
        });
      });
    }
  };
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzViNjFlMjVkMWNiNTMxNWRmZDgiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9hcmlhLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3M/NmE3OCIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi1zZXJ2aWNlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tZXNzYWdlLXZpZXcvbWVzc2FnZS12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2ZldGNoLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9tZW51LmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2Rpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50LWRpc3BhdGNoZXIuanMiXSwibmFtZXMiOlsiY3VycnkiLCJmbiIsImFyaXR5IiwibGVuZ3RoIiwiZjEiLCJhcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJhcmd1bWVudHMiLCJhcHBseSIsImYyIiwiYXJnczIiLCJjb25jYXQiLCJjb21wb3NlIiwiZm5zIiwicmVkdWNlIiwiZiIsImciLCJmb3JFYWNoIiwiYXJyIiwibWFwIiwiZmlsdGVyIiwic29tZSIsImNvbnRhaW5zIiwidmFsdWUiLCJpbmRleE9mIiwid2l0aG91dCIsInZhbHVlcyIsImludmVyc2VCb29sZWFuU3RyaW5nIiwiYm9vbCIsInRvU3RyaW5nIiwiZ2V0QXR0cmlidXRlIiwibmFtZSIsImVsIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiYXR0cmlidXRlRXF1YWxzIiwidG9nZ2xlQXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJwYXJlbnQiLCJjaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmVDaGlsZCIsIm9sZENoaWxkIiwiY2xhc3NMaXN0Q29udGFpbnMiLCJjbHMiLCJjbGFzc0xpc3QiLCJub2RlTGlzdFRvQXJyYXkiLCJub2RlTGlzdCIsImhpZGUiLCJzaG93IiwidG9nZ2xlVmlzaWJpbGl0eSIsInZpc2libGUiLCJlbGVtZW50IiwicmVsYXlDbGlja0V2ZW50QXMiLCJ0eXBlIiwiZGlzcGF0Y2hlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0cmlnZ2VyIiwiaWQiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsImluaXQiLCJpc0V4cGFuZGVkIiwiaW5pdENvbGxhcHNpYmxlIiwidG9nZ2xlciIsImNvbGxhcHNpYmxlSWQiLCJjb2xsYXBzaWJsZSIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJIdWIiLCJzdGF0ZSIsInNlbGYiLCJzZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJjb250ZW50VHlwZVNlY3Rpb24iLCJ1cGxvYWRTZWN0aW9uIiwidmlldyIsInByb3BhZ2F0ZSIsIm9uIiwic2V0UGFuZWxUaXRsZSIsImNsb3NlUGFuZWwiLCJzZXRTZWN0aW9uVHlwZSIsInRvZ2dsZVBhbmVsT3BlbiIsImJpbmQiLCJzZXR1cCIsImluaXRDb250ZW50VHlwZUxpc3QiLCJpbml0VGFiUGFuZWwiLCJtYWNoaW5lTmFtZSIsImNvbnRlbnRUeXBlIiwiZ2V0Q29udGVudFR5cGUiLCJ0aGVuIiwidGl0bGUiLCJzZXRUaXRsZSIsInNlY3Rpb25JZCIsInRhYkNvbmZpZ3MiLCJjb250ZW50IiwiZ2V0RWxlbWVudCIsImNvbmZpZyIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiYWRkQm90dG9tQm9yZGVyIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsIk1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04iLCJpc0VtcHR5IiwidGV4dCIsImhpZGVBbGwiLCJDb250ZW50VHlwZURldGFpbFZpZXciLCJyb290RWxlbWVudCIsImNyZWF0ZVZpZXciLCJidXR0b25CYXIiLCJ1c2VCdXR0b24iLCJpbnN0YWxsQnV0dG9uIiwiYnV0dG9ucyIsImltYWdlIiwib3duZXIiLCJkZXNjcmlwdGlvbiIsImRlbW9CdXR0b24iLCJjYXJvdXNlbCIsImNhcm91c2VsTGlzdCIsImxpY2VuY2VQYW5lbCIsImluc3RhbGxNZXNzYWdlIiwiaW5zdGFsbE1lc3NhZ2VDbG9zZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwiaW5uZXJUZXh0IiwibGlnaHRib3giLCJjaGlsZEVsZW1lbnRDb3VudCIsInVybCIsImFsdCIsInRodW1ibmFpbCIsInNyYyIsImVsbGlwc2lzIiwidG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCIsImRlc2NyaXB0aW9uRXhwYW5kZWQiLCJzaXplIiwic3Vic3RyIiwiaW5zdGFsbGVkIiwic2hvd0J1dHRvbkJ5U2VsZWN0b3IiLCJidXR0b24iLCJDb250ZW50VHlwZURldGFpbCIsImluc3RhbGwiLCJ1cGRhdGUiLCJpbnN0YWxsQ29udGVudFR5cGUiLCJzZXRJc0luc3RhbGxlZCIsInNldEluc3RhbGxNZXNzYWdlIiwiY2F0Y2giLCJlcnJvck1lc3NhZ2UiLCJlcnJvciIsImVycm9yQ29kZSIsImNvbnNvbGUiLCJyZXNldCIsInNldElkIiwic2V0RGVzY3JpcHRpb24iLCJzZXRJbWFnZSIsImljb24iLCJzZXRFeGFtcGxlIiwiZXhhbXBsZSIsInNldE93bmVyIiwic2V0TGljZW5jZSIsImxpY2Vuc2UiLCJyZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsIiwic2NyZWVuc2hvdHMiLCJhZGRJbWFnZVRvQ2Fyb3VzZWwiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiaGFzQ2hpbGROb2RlcyIsImxhc3RDaGlsZCIsInJvdyIsImNyZWF0ZUNvbnRlbnRUeXBlUm93Iiwic2NvcGUiLCJ1c2VCdXR0b25Db25maWciLCJpbnN0YWxsQnV0dG9uQ29uZmlnIiwic3VtbWFyeSIsIkNvbnRlbnRUeXBlTGlzdCIsImNvbnRlbnRUeXBlcyIsInJlbW92ZUFsbFJvd3MiLCJhZGRSb3ciLCJ1bnNlbGVjdEFsbCIsIkNvbnRlbnRCcm93c2VyVmlldyIsInR5cGVBaGVhZEVuYWJsZWQiLCJtZW51IiwibWVudWJhciIsImlucHV0RmllbGQiLCJkaXNwbGF5U2VsZWN0ZWQiLCJpbnB1dEJ1dHRvbiIsImZpcmUiLCJzZWFyY2hiYXIiLCJxdWVyeSIsInRhcmdldCIsInBhcmVudEVsZW1lbnQiLCJmb2N1cyIsIm1lbnV0aXRsZSIsIm1lbnVJZCIsInNlYXJjaFRleHQiLCJhY3Rpb24iLCJtZXNzYWdlVmlldyIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJhZGQiLCJldmVudE5hbWUiLCJjaG9pY2UiLCJzZWxlY3RlZE5hbWUiLCJtZW51SXRlbXMiLCJzZWxlY3RlZE1lbnVJdGVtIiwidW5kZXJsaW5lIiwiQ29udGVudFR5cGVTZWN0aW9uVGFicyIsIkFMTCIsIk1ZX0NPTlRFTlRfVFlQRVMiLCJNT1NUX1BPUFVMQVIiLCJmaWx0ZXJQcm9wZXJ0eSIsIkNvbnRlbnRUeXBlU2VjdGlvbiIsInNlYXJjaFNlcnZpY2UiLCJjb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZURldGFpbCIsInRhYiIsImhhc093blByb3BlcnR5IiwiYWRkTWVudUl0ZW0iLCJpbml0TWVudSIsInNlY3Rpb24iLCJzZWFyY2giLCJzZWxlY3RNZW51SXRlbUJ5SWQiLCJyZXNldE1lbnVPbkVudGVyIiwiY2xvc2VEZXRhaWxWaWV3IiwiYXBwbHlTZWFyY2hGaWx0ZXIiLCJjbGVhcklucHV0RmllbGQiLCJ1cGRhdGVEaXNwbGF5U2VsZWN0ZWQiLCJzaG93RGV0YWlsVmlldyIsImhhbmRsZUVycm9yIiwiZGlzcGxheU1lc3NhZ2UiLCJrZXlDb2RlIiwic2V0RGlzcGxheVNlbGVjdGVkIiwiZSIsImN0cyIsImxvYWRCeUlkIiwicmVtb3ZlRGVhY3RpdmF0ZWRTdHlsZUZyb21NZW51IiwiYWRkRGVhY3RpdmF0ZWRTdHlsZVRvTWVudSIsIkh1YlNlcnZpY2VzIiwiY2FjaGVkQ29udGVudFR5cGVzIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibnMiLCJnZXRBamF4VXJsIiwiYm9keSIsImZvcm1EYXRhIiwiQVRUUklCVVRFX0RBVEFfSUQiLCJpc09wZW4iLCJIdWJWaWV3IiwicmVuZGVyVGFiUGFuZWwiLCJyZW5kZXJQYW5lbCIsImV4cGFuZGVkIiwidGFiQ29udGFpbmVyRWxlbWVudCIsInBhbmVsIiwic2V0VGltZW91dCIsInRhYmxpc3QiLCJ0YWJMaXN0V3JhcHBlciIsInRhYklkIiwidGFiUGFuZWxJZCIsInRhYlBhbmVsIiwiTWVzc2FnZVZpZXciLCJtZXNzYWdlV3JhcHBlciIsImRpc21pc3NpYmxlIiwiY2xvc2VCdXR0b24iLCJtZXNzYWdlQ29udGVudCIsInVuZGVmaW5lZCIsIm1lc3NhZ2VCdXR0b24iLCJTZWFyY2hTZXJ2aWNlIiwiZmlsdGVyQnlRdWVyeSIsInByb3BlcnR5Iiwic29ydCIsImN0MSIsImN0MiIsInNjb3JlIiwiZ2V0U2VhcmNoU2NvcmUiLCJzb3J0U2VhcmNoUmVzdWx0cyIsImEiLCJiIiwicG9wdWxhcml0eSIsInF1ZXJpZXMiLCJzcGxpdCIsInF1ZXJ5U2NvcmVzIiwiZ2V0U2NvcmVGb3JFYWNoUXVlcnkiLCJ0cmltIiwiaGFzU3ViU3RyaW5nIiwiYXJyYXlIYXNTdWJTdHJpbmciLCJrZXl3b3JkcyIsIm5lZWRsZSIsImhheXN0YWNrIiwidG9Mb3dlckNhc2UiLCJzdWJTdHJpbmciLCJzdHJpbmciLCJBZGROdW1iZXIiLCJVcGxvYWRTZWN0aW9uIiwiaDVwVXBsb2FkIiwidGV4dENvbnRlbnQiLCJkYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmaWxlcyIsInVwbG9hZENvbnRlbnQiLCJzdXBwb3J0Iiwic2VhcmNoUGFyYW1zIiwiaXRlcmFibGUiLCJTeW1ib2wiLCJibG9iIiwiQmxvYiIsImFycmF5QnVmZmVyIiwidmlld0NsYXNzZXMiLCJpc0RhdGFWaWV3Iiwib2JqIiwiRGF0YVZpZXciLCJpc1Byb3RvdHlwZU9mIiwiaXNBcnJheUJ1ZmZlclZpZXciLCJBcnJheUJ1ZmZlciIsImlzVmlldyIsIk9iamVjdCIsIm5vcm1hbGl6ZU5hbWUiLCJTdHJpbmciLCJ0ZXN0IiwiVHlwZUVycm9yIiwibm9ybWFsaXplVmFsdWUiLCJpdGVyYXRvckZvciIsIml0ZW1zIiwiaXRlcmF0b3IiLCJuZXh0Iiwic2hpZnQiLCJkb25lIiwiSGVhZGVycyIsImhlYWRlcnMiLCJpc0FycmF5IiwiaGVhZGVyIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIm9sZFZhbHVlIiwiZ2V0IiwiaGFzIiwic2V0IiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwia2V5cyIsInB1c2giLCJlbnRyaWVzIiwiY29uc3VtZWQiLCJib2R5VXNlZCIsImZpbGVSZWFkZXJSZWFkeSIsInJlYWRlciIsIm9ubG9hZCIsIm9uZXJyb3IiLCJyZWFkQmxvYkFzQXJyYXlCdWZmZXIiLCJGaWxlUmVhZGVyIiwicHJvbWlzZSIsInJlYWRBc0FycmF5QnVmZmVyIiwicmVhZEJsb2JBc1RleHQiLCJyZWFkQXNUZXh0IiwicmVhZEFycmF5QnVmZmVyQXNUZXh0IiwiYnVmIiwiVWludDhBcnJheSIsImNoYXJzIiwiaSIsImZyb21DaGFyQ29kZSIsImpvaW4iLCJidWZmZXJDbG9uZSIsImJ5dGVMZW5ndGgiLCJidWZmZXIiLCJCb2R5IiwiX2luaXRCb2R5IiwiX2JvZHlJbml0IiwiX2JvZHlUZXh0IiwiX2JvZHlCbG9iIiwiX2JvZHlGb3JtRGF0YSIsIlVSTFNlYXJjaFBhcmFtcyIsIl9ib2R5QXJyYXlCdWZmZXIiLCJFcnJvciIsInJlamVjdGVkIiwiZGVjb2RlIiwiSlNPTiIsInBhcnNlIiwibWV0aG9kcyIsIm5vcm1hbGl6ZU1ldGhvZCIsInVwY2FzZWQiLCJ0b1VwcGVyQ2FzZSIsIlJlcXVlc3QiLCJpbnB1dCIsIm9wdGlvbnMiLCJtb2RlIiwicmVmZXJyZXIiLCJjbG9uZSIsImZvcm0iLCJieXRlcyIsInJlcGxhY2UiLCJkZWNvZGVVUklDb21wb25lbnQiLCJwYXJzZUhlYWRlcnMiLCJyYXdIZWFkZXJzIiwicHJlUHJvY2Vzc2VkSGVhZGVycyIsImxpbmUiLCJwYXJ0cyIsImtleSIsIlJlc3BvbnNlIiwiYm9keUluaXQiLCJzdGF0dXMiLCJvayIsInN0YXR1c1RleHQiLCJyZWRpcmVjdFN0YXR1c2VzIiwicmVkaXJlY3QiLCJSYW5nZUVycm9yIiwibG9jYXRpb24iLCJyZXF1ZXN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJnZXRBbGxSZXNwb25zZUhlYWRlcnMiLCJyZXNwb25zZVVSTCIsInJlc3BvbnNlVGV4dCIsIm9udGltZW91dCIsIm9wZW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZXNwb25zZVR5cGUiLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsInBvbHlmaWxsIiwiQVRUUklCVVRFX1NJWkUiLCJkaXNhYmxlIiwiZW5hYmxlIiwidG9nZ2xlRW5hYmxlZCIsImVuYWJsZWQiLCJoaWRkZW4iLCJpc0Rpc2FibGVkIiwidXBkYXRlVmlldyIsInByZXZCdXR0b24iLCJuZXh0QnV0dG9uIiwibGlzdCIsInRvdGFsQ291bnQiLCJzdHlsZSIsIndpZHRoIiwiZGlzcGxheUNvdW50IiwibWFyZ2luTGVmdCIsInBvc2l0aW9uIiwib25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2siLCJ1cGRhdGVTdGF0ZSIsImluaXRJbWFnZSIsInRhcmdldElkIiwiaGFuZGxlRG9tVXBkYXRlIiwicmVjb3JkIiwiYWRkZWROb2RlcyIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJ1blNlbGVjdEFsbCIsInVuRXhwYW5kIiwibWVudUl0ZW0iLCJ0YWJzIiwidGFiUGFuZWxzIiwicmVxdWlyZSIsIkg1UCIsIkh1YkNsaWVudCIsImRlZmF1bHQiLCJFdmVudERpc3BhdGNoZXIiLCJsaXN0ZW5lcnMiLCJsaXN0ZW5lciIsInRyaWdnZXJzIiwiZXZlcnkiLCJ0eXBlcyIsIm5ld1R5cGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hFQTs7Ozs7Ozs7O0FBU08sSUFBTUEsd0JBQVEsU0FBUkEsS0FBUSxDQUFTQyxFQUFULEVBQWE7QUFDaEMsTUFBTUMsUUFBUUQsR0FBR0UsTUFBakI7O0FBRUEsU0FBTyxTQUFTQyxFQUFULEdBQWM7QUFDbkIsUUFBTUMsT0FBT0MsTUFBTUMsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCQyxTQUEzQixFQUFzQyxDQUF0QyxDQUFiO0FBQ0EsUUFBSUwsS0FBS0YsTUFBTCxJQUFlRCxLQUFuQixFQUEwQjtBQUN4QixhQUFPRCxHQUFHVSxLQUFILENBQVMsSUFBVCxFQUFlTixJQUFmLENBQVA7QUFDRCxLQUZELE1BR0s7QUFDSCxhQUFPLFNB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Q0FBMEIzUyxPQUExQjs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQTVCbUM7O0FBOEJwQzs7Ozs7Ozs7O0FBU0FBLGFBQVMsaUJBQVNILElBQVQsRUFBZUssS0FBZixFQUFzQjtBQUM3QixVQUFNOFosV0FBVyxLQUFLRixTQUFMLENBQWVqYSxJQUFmLEtBQXdCLEVBQXpDOztBQUVBLGFBQU9tYSxTQUFTQyxLQUFULENBQWUsVUFBU2phLE9BQVQsRUFBa0I7QUFDdEMsZUFBT0EsUUFBUStaLFFBQVIsQ0FBaUJyZCxJQUFqQixDQUFzQnNELFFBQVF3SCxLQUFSLElBQWlCLElBQXZDLEVBQTZDdEgsS0FBN0MsTUFBd0QsS0FBL0Q7QUFDRCxPQUZNLENBQVA7QUFHRCxLQTdDbUM7O0FBK0NwQzs7Ozs7OztBQU9Bc0IsZUFBVyxtQkFBUzBZLEtBQVQsRUFBZ0JwYSxVQUFoQixFQUE0QnFhLE9BQTVCLEVBQXFDO0FBQzlDLFVBQUlqWixPQUFPLElBQVg7QUFDQWdaLFlBQU03YyxPQUFOLENBQWM7QUFBQSxlQUFReUMsV0FBVzJCLEVBQVgsQ0FBYzVCLElBQWQsRUFBb0I7QUFBQSxpQkFBU3FCLEtBQUtsQixPQUFMLENBQWFtYSxXQUFXdGEsSUFBeEIsRUFBOEJLLEtBQTlCLENBQVQ7QUFBQSxTQUFwQixDQUFSO0FBQUEsT0FBZDtBQUNEO0FBekRtQyxHQUFQO0FBQUEsQ0FBeEIsQyIsImZpbGUiOiJoNXAtaHViLWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNWI2MWUyNWQxY2I1MzE1ZGZkOCIsIi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgdmVyc2lvbiBvZiBhIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjdXJyeSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGNvbnN0IGFyaXR5ID0gZm4ubGVuZ3RoO1xuXG4gIHJldHVybiBmdW5jdGlvbiBmMSgpIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBpZiAoYXJncy5sZW5ndGggPj0gYXJpdHkpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZjIoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgcmV0dXJuIGYxLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KGFyZ3MyKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBDb21wb3NlIGZ1bmN0aW9ucyB0b2dldGhlciwgZXhlY3V0aW5nIGZyb20gcmlnaHQgdG8gbGVmdFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24uLi59IGZuc1xuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29tcG9zZSA9ICguLi5mbnMpID0+IGZucy5yZWR1Y2UoKGYsIGcpID0+ICguLi5hcmdzKSA9PiBmKGcoLi4uYXJncykpKTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBlbGVtZW50IGluIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZm9yRWFjaCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIGFyci5mb3JFYWNoKGZuKTtcbn0pO1xuXG4vKipcbiAqIE1hcHMgYSBmdW5jdGlvbiB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IG1hcCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIubWFwKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmaWx0ZXIgdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLmZpbHRlcihmbik7XG59KTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgc29tZSB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHNvbWUgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLnNvbWUoZm4pO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgdmFsdWVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnRhaW5zID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5pbmRleE9mKHZhbHVlKSAhPSAtMTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgc3VwcGxpZWQgdmFsdWVzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHdpdGhvdXQgPSBjdXJyeShmdW5jdGlvbiAodmFsdWVzLCBhcnIpIHtcbiAgcmV0dXJuIGZpbHRlcih2YWx1ZSA9PiAhY29udGFpbnModmFsdWUsIHZhbHVlcyksIGFycilcbn0pO1xuXG4vKipcbiAqIFRha2VzIGEgc3RyaW5nIHRoYXQgaXMgZWl0aGVyICd0cnVlJyBvciAnZmFsc2UnIGFuZCByZXR1cm5zIHRoZSBvcHBvc2l0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBib29sXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgaW52ZXJzZUJvb2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoYm9vbCkge1xuICByZXR1cm4gKGJvb2wgIT09ICd0cnVlJykudG9TdHJpbmcoKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsImltcG9ydCB7Y3VycnksIGludmVyc2VCb29sZWFuU3RyaW5nfSBmcm9tICcuL2Z1bmN0aW9uYWwnXG5cbi8qKlxuICogR2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmcm9tIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBTZXQgYW4gYXR0cmlidXRlIG9uIGEgaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHNldEF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCB2YWx1ZSwgZWwpID0+IGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkpO1xuXG4vKipcbiAqIFJlbW92ZSBhdHRyaWJ1dGUgZnJvbSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBoYXNBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IGVsLmhhc0F0dHJpYnV0ZShuYW1lKSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlIHRoYXQgZXF1YWxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVFcXVhbHMgPSBjdXJyeSgobmFtZSwgdmFsdWUsIGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IHZhbHVlKTtcblxuLyoqXG4gKiBUb2dnbGVzIGFuIGF0dHJpYnV0ZSBiZXR3ZWVuICd0cnVlJyBhbmQgJ2ZhbHNlJztcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUF0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IGdldEF0dHJpYnV0ZShuYW1lLCBlbCk7XG4gIHNldEF0dHJpYnV0ZShuYW1lLCBpbnZlcnNlQm9vbGVhblN0cmluZyh2YWx1ZSksIGVsKTtcbn0pO1xuXG4vKipcbiAqIFRoZSBhcHBlbmRDaGlsZCgpIG1ldGhvZCBhZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0IG9mIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWVkIHBhcmVudCBub2RlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgYXBwZW5kQ2hpbGQgPSBjdXJyeSgocGFyZW50LCBjaGlsZCkgPT4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIGEgZGVzY2VuZGFudCBvZiB0aGUgZWxlbWVudCBvbiB3aGljaCBpdCBpcyBpbnZva2VkXG4gKiB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yID0gY3VycnkoKHNlbGVjdG9yLCBlbCkgPT4gZWwucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpO1xuXG4vKipcbiAqIFJldHVybnMgYSBub24tbGl2ZSBOb2RlTGlzdCBvZiBhbGwgZWxlbWVudHMgZGVzY2VuZGVkIGZyb20gdGhlIGVsZW1lbnQgb24gd2hpY2ggaXRcbiAqIGlzIGludm9rZWQgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2YgQ1NTIHNlbGVjdG9ycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtOb2RlTGlzdH1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3JBbGwgPSBjdXJyeSgoc2VsZWN0b3IsIGVsKSA9PiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG5cbi8qKlxuICogVGhlIHJlbW92ZUNoaWxkKCkgbWV0aG9kIHJlbW92ZXMgYSBjaGlsZCBub2RlIGZyb20gdGhlIERPTS4gUmV0dXJucyByZW1vdmVkIG5vZGUuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBwYXJlbnRcbiAqIEBwYXJhbSB7Tm9kZX0gb2xkQ2hpbGRcbiAqXG4gKiBAcmV0dXJuIHtOb2RlfVxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2hpbGQgPSBjdXJyeSgocGFyZW50LCBvbGRDaGlsZCkgPT4gcGFyZW50LnJlbW92ZUNoaWxkKG9sZENoaWxkKSk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgbm9kZSBoYXMgYSBjbGFzc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbHNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBjbGFzc0xpc3RDb250YWlucyA9IGN1cnJ5KChjbHMsIGVsKSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xzKSk7XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIE5vZGVMaXN0IHRvIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtOb2RlTGlzdH0gbm9kZUxpc3RcbiAqXG4gKiBAcmV0dXJuIHtOb2RlW119XG4gKi9cbmV4cG9ydCBjb25zdCBub2RlTGlzdFRvQXJyYXkgPSBub2RlTGlzdCA9PiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChub2RlTGlzdCk7XG5cbi8qKlxuICogQWRkcyBhcmlhLWhpZGRlbj10cnVlIHRvIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBBZGRzIGFyaWEtaGlkZGVuPWZhbHNlIHRvIGFuIGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBUb2dnbGVzIGFyaWEtaGlkZGVuIG9uIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSBjdXJyeSgodmlzaWJsZSwgZWxlbWVudCkgPT4gKHZpc2libGUgPyBzaG93IDogaGlkZSkoZWxlbWVudCkpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuXG4vKipcbiAqICBUcmFuc2Zvcm1zIGEgRE9NIGNsaWNrIGV2ZW50IGludG8gYW4gRXZlbnREaXNwYXRjaGVyJ3MgZXZlbnRcbiAqICBAc2VlIEV2ZW50RGlzcGF0Y2hlclxuICpcbiAqIEBwYXJhbSAge3N0cmluZyB8IE9iamVjdH0gdHlwZVxuICogQHBhcmFtICB7RXZlbnREaXNwYXRjaGVyfSBkaXNwYXRjaGVyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCByZWxheUNsaWNrRXZlbnRBcyA9IGN1cnJ5KGZ1bmN0aW9uKHR5cGUsIGRpc3BhdGNoZXIsIGVsZW1lbnQpIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBkaXNwYXRjaGVyLnRyaWdnZXIodHlwZSwge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGlkOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gZG9uJ3QgYnViYmxlXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50O1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCJpbXBvcnQge2luaXRDb2xsYXBzaWJsZX0gZnJvbSAnLi4vdXRpbHMvYXJpYSc7XG5cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBpbml0Q29sbGFwc2libGUoZWxlbWVudCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsImltcG9ydCB7YXR0cmlidXRlRXF1YWxzLCB0b2dnbGVBdHRyaWJ1dGUsIHRvZ2dsZVZpc2liaWxpdHl9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYXJpYS1leHBhbmRlZD10cnVlIG9uIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaXNFeHBhbmRlZCA9IGF0dHJpYnV0ZUVxdWFscyhcImFyaWEtZXhwYW5kZWRcIiwgJ3RydWUnKTtcblxuLyoqXG4gKiBUb2dnbGVzIGFyaWEtaGlkZGVuIG9uICdjb2xsYXBzaWJsZScgd2hlbiBhcmlhLWV4cGFuZGVkIGNoYW5nZXMgb24gJ3RvZ2dsZXInLFxuICogYW5kIHRvZ2dsZXMgYXJpYS1leHBhbmRlZCBvbiAndG9nZ2xlcicgb24gY2xpY2tcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBjb25zdCBpbml0Q29sbGFwc2libGUgPSAoZWxlbWVudCkgPT4ge1xuICAvLyBlbGVtZW50c1xuICBjb25zdCB0b2dnbGVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1jb250cm9sc11bYXJpYS1leHBhbmRlZF0nKTtcbiAgY29uc3QgY29sbGFwc2libGVJZCA9IHRvZ2dsZXIuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gIGNvbnN0IGNvbGxhcHNpYmxlID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtjb2xsYXBzaWJsZUlkfWApO1xuXG4gIC8vIHNldCBvYnNlcnZlciBvbiB0aXRsZSBmb3IgYXJpYS1leHBhbmRlZFxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB0b2dnbGVWaXNpYmlsaXR5KGlzRXhwYW5kZWQodG9nZ2xlciksIGNvbGxhcHNpYmxlKSk7XG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZSh0b2dnbGVyLCB7XG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcImFyaWEtZXhwYW5kZWRcIl1cbiAgfSk7XG5cbiAgLy8gU2V0IGNsaWNrIGxpc3RlbmVyIHRoYXQgdG9nZ2xlcyBhcmlhLWV4cGFuZGVkXG4gIHRvZ2dsZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIHRvZ2dsZXIpKTtcblxuICAvLyBpbml0aWFsaXplXG4gIHRvZ2dsZVZpc2liaWxpdHkoaXNFeHBhbmRlZCh0b2dnbGVyKSwgY29sbGFwc2libGUpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9hcmlhLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIWnBaWGRDYjNnOUlqQWdNQ0EwTURBZ01qSTFJajROQ2lBZ1BHUmxabk0rRFFvZ0lDQWdQSE4wZVd4bFBnMEtJQ0FnSUNBZ0xtTnNjeTB4SUhzTkNpQWdJQ0FnSUdacGJHdzZJRzV2Ym1VN0RRb2dJQ0FnSUNCOURRb05DaUFnSUNBZ0lDNWpiSE10TWlCN0RRb2dJQ0FnSUNCbWFXeHNPaUFqWXpaak5tTTNPdzBLSUNBZ0lDQWdmUTBLRFFvZ0lDQWdJQ0F1WTJ4ekxUTXNJQzVqYkhNdE5DQjdEUW9nSUNBZ0lDQm1hV3hzT2lBalptWm1PdzBLSUNBZ0lDQWdmUTBLRFFvZ0lDQWdJQ0F1WTJ4ekxUTWdldzBLSUNBZ0lDQWdiM0JoWTJsMGVUb2dNQzQzT3cwS0lDQWdJQ0FnZlEwS0lDQWdJRHd2YzNSNWJHVStEUW9nSUR3dlpHVm1jejROQ2lBZ1BIUnBkR3hsUG1OdmJuUmxiblFnZEhsd1pTQndiR0ZqWldodmJHUmxjbDh5UEM5MGFYUnNaVDROQ2lBZ1BHY2dhV1E5SWt4aGVXVnlYeklpSUdSaGRHRXRibUZ0WlQwaVRHRjVaWElnTWlJK0RRb2dJQ0FnUEdjZ2FXUTlJbU52Ym5SbGJuUmZkSGx3WlY5d2JHRmpaV2h2YkdSbGNpMHhYMk52Y0hraUlHUmhkR0V0Ym1GdFpUMGlZMjl1ZEdWdWRDQjBlWEJsSUhCc1lXTmxhRzlzWkdWeUxURWdZMjl3ZVNJK0RRb2dJQ0FnSUNBOGNtVmpkQ0JqYkdGemN6MGlZMnh6TFRFaUlIZHBaSFJvUFNJME1EQWlJR2hsYVdkb2REMGlNakkxSWk4K0RRb2dJQ0FnSUNBOGNtVmpkQ0JqYkdGemN6MGlZMnh6TFRJaUlIZzlJakV4TWk0MU1TSWdlVDBpTkRNdU5ERWlJSGRwWkhSb1BTSXhOell1T1RZaUlHaGxhV2RvZEQwaU1UTTFMalExSWlCeWVEMGlNVEFpSUhKNVBTSXhNQ0l2UGcwS0lDQWdJQ0FnUEdOcGNtTnNaU0JqYkdGemN6MGlZMnh6TFRNaUlHTjRQU0l4TXpZdU5qWWlJR041UFNJMk1TNDVPQ0lnY2owaU5DNDRNU0l2UGcwS0lDQWdJQ0FnUEdOcGNtTnNaU0JqYkdGemN6MGlZMnh6TFRNaUlHTjRQU0l4TlRFdU5Ea2lJR041UFNJMk1TNDVPQ0lnY2owaU5DNDRNU0l2UGcwS0lDQWdJQ0FnUEdOcGNtTnNaU0JqYkdGemN6MGlZMnh6TFRNaUlHTjRQU0l4TmpZdU1TSWdZM2s5SWpZeExqazRJaUJ5UFNJMExqZ3hJaTgrRFFvZ0lDQWdJQ0E4WnlCcFpEMGlYMGR5YjNWd1h5SWdaR0YwWVMxdVlXMWxQU0ltYkhRN1IzSnZkWEFtWjNRN0lqNE5DaUFnSUNBZ0lDQWdQR2NnYVdROUlsOUhjbTkxY0Y4eUlpQmtZWFJoTFc1aGJXVTlJaVpzZER0SGNtOTFjQ1puZERzaVBnMEtJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHbGtQU0pmUTI5dGNHOTFibVJmVUdGMGFGOGlJR1JoZEdFdGJtRnRaVDBpSm14ME8wTnZiWEJ2ZFc1a0lGQmhkR2dtWjNRN0lpQmpiR0Z6Y3owaVkyeHpMVFFpSUdROUlrMHlOak11TWpnc09UVXVNakZETWpZd0xEa3lMakEzTERJMU5TdzVNUzQxTERJME9DNDBNeXc1TVM0MVNESXlOM1k0U0RFNU9TNDFiQzB5TGpFM0xERXdMakkwWVRJMUxqZzBMREkxTGpnMExEQXNNQ3d4TERFeExqUTRMVEV1TmpNc01Ua3VPVE1zTVRrdU9UTXNNQ3d3TERFc01UUXVNemtzTlM0MU55d3hPQzR5Tml3eE9DNHlOaXd3TERBc01TdzFMalV5TERFekxqWXNNak11TVRFc01qTXVNVEVzTUN3d0xERXRNaTQ0TkN3eE1TNHdOU3d4T0M0Mk5Td3hPQzQyTlN3d0xEQXNNUzA0TGpBMkxEY3VOemtzT1N3NUxEQXNNQ3d4TFRRdU1USXNNUzR6TjBneU16WjJMVEl4YURFd0xqUXlZemN1TXpZc01Dd3hNaTQ0TXkweExqWXhMREUyTGpReUxUVnpOUzR6T0MwM0xqUTRMRFV1TXpndE1UTXVORFJETWpZNExqSXlMREV3TWk0eU9Td3lOall1TlRjc09UZ3VNelVzTWpZekxqSTRMRGsxTGpJeFdtMHRNVFVzTVRkakxURXVORElzTVM0eU1pMHpMamtzTVM0eU5TMDNMalF4TERFdU1qVklNak0yZGkweE5HZzFMall5WVRrdU5UY3NPUzQxTnl3d0xEQXNNU3czTERJdU9UTXNOeTR3TlN3M0xqQTFMREFzTUN3eExERXVPRFVzTkM0NU1rRTJMak16TERZdU16TXNNQ3d3TERFc01qUTRMak14TERFeE1pNHlOVm9pTHo0TkNpQWdJQ0FnSUNBZ0lDQThjR0YwYUNCcFpEMGlYMUJoZEdoZklpQmtZWFJoTFc1aGJXVTlJaVpzZER0UVlYUm9KbWQwT3lJZ1kyeGhjM005SW1Oc2N5MDBJaUJrUFNKTk1qQXlMamtzTVRFNUxqRXhZVGd1TVRJc09DNHhNaXd3TERBc01DMDNMakk0TERRdU5USnNMVEUyTFRFdU1qSXNOeTR5TWkwek1DNDVNa2d4TnpSMk1qSklNVFV6ZGkweU1rZ3hNeloyTlRab01UZDJMVEl4YURJeGRqSXhhREl3TGpNeFl5MHlMamN5TERBdE5TMHhMalV6TFRjdE0yRXhPUzR4T1N3eE9TNHhPU3d3TERBc01TMDBMamN6TFRRdU9ETXNNak11TlRnc01qTXVOVGdzTUN3d0xERXRNeTAyTGpac01UWXRNaTR5Tm1FNExqRXhMRGd1TVRFc01Dd3hMREFzTnk0eU5pMHhNUzQzTWxvaUx6NE5DaUFnSUNBZ0lDQWdQQzluUGcwS0lDQWdJQ0FnUEM5blBnMEtJQ0FnSUNBZ1BISmxZM1FnWTJ4aGMzTTlJbU5zY3kweklpQjRQU0l4TnpjdU5qWWlJSGs5SWpVM0xqWTJJaUIzYVdSMGFEMGlPVEl1TWpnaUlHaGxhV2RvZEQwaU9TNHpPQ0lnY25nOUlqTXVOU0lnY25rOUlqTXVOU0l2UGcwS0lDQWdJRHd2Wno0TkNpQWdQQzluUGcwS1BDOXpkbWMrRFFvPVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmdcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEh1YlZpZXcgZnJvbSAnLi9odWItdmlldyc7XG5pbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uIGZyb20gJy4vY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24nO1xuaW1wb3J0IFVwbG9hZFNlY3Rpb24gZnJvbSAnLi91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbic7XG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSAnLi9odWItc2VydmljZXMnO1xuaW1wb3J0IHsgRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnLi9taXhpbnMvZXZlbnQtZGlzcGF0Y2hlcic7XG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gSHViU3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aXRsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb25JZFxuICogQHByb3BlcnR5IHtib29sZWFufSBleHBhbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFwaVJvb3RVcmxcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBFcnJvck1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXJyb3JDb2RlXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gU2VsZWN0ZWRFbGVtZW50XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRcbiAqL1xuLyoqXG4gKiBTZWxlY3QgZXZlbnRcbiAqIEBldmVudCBIdWIjc2VsZWN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEVycm9yIGV2ZW50XG4gKiBAZXZlbnQgSHViI2Vycm9yXG4gKiBAdHlwZSB7RXJyb3JNZXNzYWdlfVxuICovXG4vKipcbiAqIFVwbG9hZCBldmVudFxuICogQGV2ZW50IEh1YiN1cGxvYWRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnREaXNwYXRjaGVyXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIEh1YiNlcnJvclxuICogQGZpcmVzIEh1YiN1cGxvYWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50RGlzcGF0Y2hlcigpKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gY29udHJvbGxlcnNcbiAgICB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbiA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb24oc3RhdGUsIHRoaXMuc2VydmljZXMpO1xuICAgIHRoaXMudXBsb2FkU2VjdGlvbiA9IG5ldyBVcGxvYWRTZWN0aW9uKHN0YXRlLCB0aGlzLnNlcnZpY2VzKTtcblxuICAgIC8vIHZpZXdzXG4gICAgdGhpcy52aWV3ID0gbmV3IEh1YlZpZXcoc3RhdGUpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGNvbnRyb2xsZXIgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24pO1xuICAgIHRoaXMucHJvcGFnYXRlKFsndXBsb2FkJ10sIHRoaXMudXBsb2FkU2VjdGlvbik7XG5cbiAgICAvLyBoYW5kbGUgZXZlbnRzXG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy5zZXRQYW5lbFRpdGxlLCB0aGlzKTtcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnZpZXcuY2xvc2VQYW5lbCwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcub24oJ3RhYi1jaGFuZ2UnLCB0aGlzLnZpZXcuc2V0U2VjdGlvblR5cGUsIHRoaXMudmlldyk7XG4gICAgdGhpcy52aWV3Lm9uKCdwYW5lbC1jaGFuZ2UnLCB0aGlzLnZpZXcudG9nZ2xlUGFuZWxPcGVuLmJpbmQodGhpcy52aWV3KSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5vbigncmVsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnNlcnZpY2VzLnNldHVwKCk7XG4gICAgICBzZWxmLmNvbnRlbnRUeXBlU2VjdGlvbi5pbml0Q29udGVudFR5cGVMaXN0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmluaXRUYWJQYW5lbChzdGF0ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwcm9taXNlIG9mIGEgY29udGVudCB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBnZXRDb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZSBvZiB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRQYW5lbFRpdGxlKHtpZH0pwqB7XG4gICAgdGhpcy5nZXRDb250ZW50VHlwZShpZCkudGhlbigoe3RpdGxlfSkgPT4gdGhpcy52aWV3LnNldFRpdGxlKHRpdGxlKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSB0YWIgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxuICAgKi9cbiAgaW5pdFRhYlBhbmVsKHsgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnIH0pIHtcbiAgICBjb25zdCB0YWJDb25maWdzID0gW3tcbiAgICAgIHRpdGxlOiAnQ3JlYXRlIENvbnRlbnQnLFxuICAgICAgaWQ6ICdjb250ZW50LXR5cGVzJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMuY29udGVudFR5cGVTZWN0aW9uLmdldEVsZW1lbnQoKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnVXBsb2FkJyxcbiAgICAgIGlkOiAndXBsb2FkJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMudXBsb2FkU2VjdGlvbi5nZXRFbGVtZW50KClcbiAgICB9XTtcblxuICAgIC8vIHNldHMgdGhlIGNvcnJlY3Qgb25lIHNlbGVjdGVkXG4gICAgdGFiQ29uZmlnc1xuICAgICAgLmZpbHRlcihjb25maWcgPT4gY29uZmlnLmlkID09PSBzZWN0aW9uSWQpXG4gICAgICAuZm9yRWFjaChjb25maWcgPT4gY29uZmlnLnNlbGVjdGVkID0gdHJ1ZSk7XG5cbiAgICB0YWJDb25maWdzLmZvckVhY2godGFiQ29uZmlnID0+IHRoaXMudmlldy5hZGRUYWIodGFiQ29uZmlnKSk7XG4gICAgdGhpcy52aWV3LmFkZEJvdHRvbUJvcmRlcigpOyAvLyBBZGRzIGFuIGFuaW1hdGVkIGJvdHRvbSBib3JkZXIgdG8gZWFjaCB0YWJcbiAgICB0aGlzLnZpZXcuaW5pdFRhYlBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IGluIHRoZSB2aWV3XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZXMvbWFpbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCByZW1vdmVDaGlsZCwgaGlkZSwgc2hvdyB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgY3VycnksIGZvckVhY2ggfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50LWRpc3BhdGNoZXInO1xuaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiO1xuaW1wb3J0IGluaXRJbWFnZVNjcm9sbGVyIGZyb20gXCJjb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyXCI7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5pbXBvcnQgbm9JY29uIGZyb20gJy4uLy4uL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnJztcblxuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCA9ICdkYXRhLWlkJztcblxuLyoqXG4gKiBAY29uc3RhbnQge251bWJlcn1cbiAqL1xuY29uc3QgTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiA9IDMwMDtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IGlmIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGVcbiAqL1xuY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IChlbGVtZW50LCB2aXNpYmxlKSA9PiAodmlzaWJsZSA/IHNob3cgOiBoaWRlKShlbGVtZW50KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdHJpbmcgaXMgZW1wdHlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRW1wdHkgPSAodGV4dCkgPT4gKHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJykgJiYgKHRleHQubGVuZ3RoID09PSAwKTtcblxuY29uc3QgaGlkZUFsbCA9IGZvckVhY2goaGlkZSk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnREaXNwYXRjaGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsVmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnREaXNwYXRjaGVyKCkpO1xuXG4gICAgLy8gY3JlYXRlIHZpZXdcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVWaWV3KCk7XG5cbiAgICAvLyBncmFiIHJlZmVyZW5jZXNcbiAgICB0aGlzLmJ1dHRvbkJhciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1iYXInKTtcbiAgICB0aGlzLnVzZUJ1dHRvbiA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tdXNlJyk7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsJyk7XG4gICAgdGhpcy5idXR0b25zID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvckFsbCgnLmJ1dHRvbicpO1xuXG4gICAgdGhpcy5pbWFnZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtdHlwZS1pbWFnZScpO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWRldGFpbHMgLnRpdGxlJyk7XG4gICAgdGhpcy5vd25lciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bmVyJyk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZGV0YWlscyAuc21hbGwnKTtcbiAgICB0aGlzLmRlbW9CdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZW1vLWJ1dHRvbicpO1xuICAgIHRoaXMuY2Fyb3VzZWwgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbCcpO1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0ID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICAgIHRoaXMubGljZW5jZVBhbmVsID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubGljZW5jZS1wYW5lbCcpO1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnN0YWxsLW1lc3NhZ2UnKTtcblxuICAgIC8vIGhpZGUgbWVzc2FnZSBvbiBjbG9zZSBidXR0b24gY2xpY2tcbiAgICBsZXQgaW5zdGFsbE1lc3NhZ2VDbG9zZSA9IHRoaXMuaW5zdGFsbE1lc3NhZ2UucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtY2xvc2UnKTtcbiAgICBpbnN0YWxsTWVzc2FnZUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGlkZSh0aGlzLmluc3RhbGxNZXNzYWdlKSk7XG5cbiAgICAvLyBpbml0IGludGVyYWN0aXZlIGVsZW1lbnRzXG4gICAgaW5pdFBhbmVsKHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICBpbml0SW1hZ2VTY3JvbGxlcih0aGlzLmNhcm91c2VsKTtcblxuICAgIC8vIGZpcmUgZXZlbnRzIG9uIGJ1dHRvbiBjbGlja1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2stYnV0dG9uJykpO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2luc3RhbGwnLCB0aGlzLCB0aGlzLmluc3RhbGxCdXR0b24pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIHZpZXcgYXMgYSBIVE1MRWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZVZpZXcgKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtZGV0YWlsJztcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJhY2stYnV0dG9uIGljb24tYXJyb3ctdGhpY2tcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLXdyYXBwZXJcIj48aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmUgY29udGVudC10eXBlLWltYWdlXCIgc3JjPVwiJHtub0ljb259XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWRldGFpbHNcIj5cbiAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPjwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bmVyXCI+PC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3M9XCJzbWFsbFwiPjwvcD5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbiBkZW1vLWJ1dHRvblwiIHRhcmdldD1cIl9ibGFua1wiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBocmVmPVwiI1wiPkNvbnRlbnQgRGVtbzwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbFwiIHJvbGU9XCJyZWdpb25cIiBkYXRhLXNpemU9XCI1XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIHByZXZpb3VzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGlzYWJsZWQ+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1idXR0b24gbmV4dFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRpc2FibGVkPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgIDxuYXYgY2xhc3M9XCJzY3JvbGxlclwiPlxuICAgICAgICAgIDx1bD48L3VsPlxuICAgICAgICA8L25hdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGhyIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5zdGFsbC1tZXNzYWdlIG1lc3NhZ2UgZGlzbWlzc2libGUgc2ltcGxlIGluZm9cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtY2xvc2UgaWNvbi1jbG9zZVwiPjwvZGl2PlxuICAgICAgICA8aDM+PC9oMz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1iYXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnkgYnV0dG9uLXVzZVwiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBkYXRhLWlkPVwiXCI+VXNlPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGF0YS1pZD1cIlwiPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj5JbnN0YWxsPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsaW5nXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHNwYW4gY2xhc3M9XCJpY29uLWxvYWRpbmctc2VhcmNoIGljb24tc3BpblwiPjwvc3Bhbj5JbnN0YWxsaW5nPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZ3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIGxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGVyXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1jb250cm9scz1cImxpY2VuY2UtcGFuZWxcIj48c3BhbiBjbGFzcz1cImljb24tYWNjb3JkaW9uLWFycm93XCI+PC9zcGFuPiBUaGUgTGljZW5jZSBJbmZvPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIiBpZD1cImxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5LWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBtZXNzYWdlIG9uIGluc3RhbGxcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBzdWNjZXNzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAqL1xuICBzZXRJbnN0YWxsTWVzc2FnZSh7IHN1Y2Nlc3MgPSB0cnVlLCBtZXNzYWdlIH0pe1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UucXVlcnlTZWxlY3RvcignaDMnKS5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UuY2xhc3NOYW1lID0gYGluc3RhbGwtbWVzc2FnZSBkaXNtaXNzaWJsZSBtZXNzYWdlIHNpbXBsZSAke3N1Y2Nlc3MgPyAnaW5mbycgOiAnZXJyb3InfWA7XG4gICAgc2hvdyh0aGlzLmluc3RhbGxNZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBpbWFnZXMgZnJvbSB0aGUgY2Fyb3VzZWxcbiAgICovXG4gIHJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwoKSB7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWxMaXN0KSk7XG4gICAgdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWwtbGlnaHRib3gnKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaW1hZ2UgdG8gdGhlIGNhcm91c2VsXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbWFnZVxuICAgKi9cbiAgYWRkSW1hZ2VUb0Nhcm91c2VsKGltYWdlKSB7XG4gICAgLy8gYWRkIGxpZ2h0Ym94XG4gICAgY29uc3QgbGlnaHRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsaWdodGJveC5pZCA9IGBsaWdodGJveC0ke3RoaXMuY2Fyb3VzZWxMaXN0LmNoaWxkRWxlbWVudENvdW50fWA7XG4gICAgbGlnaHRib3guY2xhc3NOYW1lID0gJ2Nhcm91c2VsLWxpZ2h0Ym94JztcbiAgICBsaWdodGJveC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBsaWdodGJveC5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZS51cmx9XCIgYWx0PVwiJHtpbWFnZS5hbHR9XCI+YDtcbiAgICB0aGlzLmNhcm91c2VsLmFwcGVuZENoaWxkKGxpZ2h0Ym94KTtcblxuICAgIC8vIGFkZCB0aHVtYm5haWxcbiAgICBjb25zdCB0aHVtYm5haWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRodW1ibmFpbC5jbGFzc05hbWUgPSAnc2xpZGUnO1xuICAgIHRodW1ibmFpbC5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ltYWdlLnVybH1cIiBhbHQ9XCIke2ltYWdlLmFsdH1cIiBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgYXJpYS1jb250cm9scz1cIiR7bGlnaHRib3guaWR9XCIgLz5gO1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0LmFwcGVuZENoaWxkKHRodW1ibmFpbCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgaGlkZSh0aGlzLmluc3RhbGxNZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbWFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gICAqL1xuICBzZXRJbWFnZShzcmMpIHtcbiAgICB0aGlzLmltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjIHx8IG5vSWNvbik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRJZChpZCkge1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICAgIHRoaXMudXNlQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gYCR7dGl0bGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XG4gICAgaWYodGV4dC5sZW5ndGggPiBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OKSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9PHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvblxuICAgICAgICAucXVlcnlTZWxlY3RvcignLnJlYWQtbW9yZSwgLnJlYWQtbGVzcycpXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgUmVhZCBsZXNzIGFuZCBSZWFkIG1vcmUgdGV4dFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgdG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSB7XG4gICAgLy8gZmxpcCBib29sZWFuXG4gICAgdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkID0gIXRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZDtcblxuICAgIGlmKHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCkge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0ZXh0fTxzcGFuIGNsYXNzPVwicmVhZC1sZXNzIGxpbmtcIj5SZWFkIGxlc3M8L3NwYW4+YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9PHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgIH1cblxuICAgIHRoaXMuZGVzY3JpcHRpb25cbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcucmVhZC1tb3JlLCAucmVhZC1sZXNzJylcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvcnRlbnMgYSBzdHJpbmcsIGFuZCBwdXRzIGFuIGVsaXBzaXMgYXQgdGhlIGVuZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgZWxsaXBzaXMoc2l6ZSwgdGV4dCkge1xuICAgIHJldHVybiBgJHt0ZXh0LnN1YnN0cigwLCBzaXplKX0uLi5gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxpY2VuY2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICovXG4gIHNldExpY2VuY2UodHlwZSkge1xuICAgIGlmKHR5cGUpe1xuICAgICAgdGhpcy5saWNlbmNlUGFuZWwucXVlcnlTZWxlY3RvcignLnBhbmVsLWJvZHktaW5uZXInKS5pbm5lclRleHQgPSB0eXBlO1xuICAgICAgc2hvdyh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlkZSh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyXG4gICAqL1xuICBzZXRPd25lcihvd25lcikge1xuICAgIGlmKG93bmVyKSB7XG4gICAgICB0aGlzLm93bmVyLmlubmVySFRNTCA9IGBCeSAke293bmVyfWA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5vd25lci5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZXhhbXBsZSB1cmxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgc2V0RXhhbXBsZSh1cmwpIHtcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmRlbW9CdXR0b24sICFpc0VtcHR5KHVybCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgaWYgdGhlIGNvbnRlbnQgdHlwZSBpcyBpbnN0YWxsZWRcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBpbnN0YWxsZWRcbiAgICovXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xuICAgIHRoaXMuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoaW5zdGFsbGVkID8gJy5idXR0b24tdXNlJyA6ICcuYnV0dG9uLWluc3RhbGwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyBhbGwgYnV0dG9ucyBhbmQgc2hvd3MgdGhlIGJ1dHRvbiBvbiB0aGUgc2VsZWN0b3IgYWdhaW5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9c2VsZWN0b3JcbiAgICovXG4gIHNob3dCdXR0b25CeVNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICBpZihidXR0b24pIHtcbiAgICAgIGhpZGVBbGwodGhpcy5idXR0b25zKTtcbiAgICAgIHNob3coYnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVEZXRhaWxWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlld1wiO1xuaW1wb3J0IHsgRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50LWRpc3BhdGNoZXInO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50RGlzcGF0Y2hlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBzZXJ2aWNlcykge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50RGlzcGF0Y2hlcigpKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IHNlcnZpY2VzO1xuXG4gICAgLy8gdmlld3NcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZURldGFpbFZpZXcoc3RhdGUpO1xuICAgIHRoaXMudmlldy5vbignaW5zdGFsbCcsIHRoaXMuaW5zdGFsbCwgdGhpcyk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydjbG9zZScsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgbG9hZEJ5SWQoaWQpIHtcbiAgICB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgLnRoZW4odGhpcy51cGRhdGUuYmluZCh0aGlzKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgIGluc3RhbGwoe2lkfSkge1xuICAgICAvLyBzZXQgc3Bpbm5lclxuICAgICB0aGlzLnZpZXcuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoJy5idXR0b24taW5zdGFsbGluZycpO1xuXG4gICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IHRoaXMuc2VydmljZXMuaW5zdGFsbENvbnRlbnRUeXBlKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKSlcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiB7XG4gICAgICAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQodHJ1ZSk7XG4gICAgICAgICB0aGlzLnZpZXcuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoJy5idXR0b24tZ2V0Jyk7XG4gICAgICAgICB0aGlzLnZpZXcuc2V0SW5zdGFsbE1lc3NhZ2Uoe1xuICAgICAgICAgICBtZXNzYWdlOiBgJHtjb250ZW50VHlwZS50aXRsZX0gc3VjY2Vzc2Z1bGx5IGluc3RhbGxlZCFgLFxuICAgICAgICAgfSk7XG4gICAgICAgfSlcbiAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgdGhpcy52aWV3LnNob3dCdXR0b25CeVNlbGVjdG9yKCcuYnV0dG9uLWluc3RhbGwnKTtcblxuICAgICAgICAgLy8gcHJpbnQgZXJyb3IgbWVzc2FnZVxuICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IChlcnJvci5lcnJvckNvZGUpID8gZXJyb3IgOiB7XG4gICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICBlcnJvckNvZGU6ICdSRVNQT05TRV9GQUlMRUQnLFxuICAgICAgICAgICBtZXNzYWdlOiBgJHtpZH0gY291bGQgbm90IGJlIGluc3RhbGxlZCEgQ29udGFjdCB5b3VyIGFkbWluaXN0cmF0b3IuYCxcbiAgICAgICAgIH07XG4gICAgICAgICB0aGlzLnZpZXcuc2V0SW5zdGFsbE1lc3NhZ2UoZXJyb3JNZXNzYWdlKTtcblxuICAgICAgICAgLy8gbG9nIHdob2xlIGVycm9yIG1lc3NhZ2UgdG8gY29uc29sZVxuICAgICAgICAgY29uc29sZS5lcnJvcignSW5zdGFsbGF0aW9uIGVycm9yJywgZXJyb3IpO1xuICAgICAgIH0pO1xuICAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGNvbnRlbnQgdHlwZSBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICB1cGRhdGUoY29udGVudFR5cGUpIHtcbiAgICB0aGlzLnZpZXcucmVzZXQoKTtcbiAgICB0aGlzLnZpZXcuc2V0SWQoY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuICAgIHRoaXMudmlldy5zZXRUaXRsZShjb250ZW50VHlwZS50aXRsZSk7XG4gICAgdGhpcy52aWV3LnNldERlc2NyaXB0aW9uKGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uKTtcbiAgICB0aGlzLnZpZXcuc2V0SW1hZ2UoY29udGVudFR5cGUuaWNvbik7XG4gICAgdGhpcy52aWV3LnNldEV4YW1wbGUoY29udGVudFR5cGUuZXhhbXBsZSk7XG4gICAgdGhpcy52aWV3LnNldE93bmVyKGNvbnRlbnRUeXBlLm93bmVyKTtcbiAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQoY29udGVudFR5cGUuaW5zdGFsbGVkKTtcbiAgICB0aGlzLnZpZXcuc2V0TGljZW5jZShjb250ZW50VHlwZS5saWNlbnNlKTtcblxuICAgIC8vIHVwZGF0ZSBjYXJvdXNlbFxuICAgIHRoaXMudmlldy5yZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsKCk7XG4gICAgY29udGVudFR5cGUuc2NyZWVuc2hvdHMuZm9yRWFjaCh0aGlzLnZpZXcuYWRkSW1hZ2VUb0Nhcm91c2VsLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIHJlbW92ZUNoaWxkIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBFdmVudERpc3BhdGNoZXIgfSBmcm9tICcuLi9taXhpbnMvZXZlbnQtZGlzcGF0Y2hlcic7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5pbXBvcnQgbm9JY29uIGZyb20gJy4uLy4uL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50RGlzcGF0Y2hlclxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50RGlzcGF0Y2hlcigpKTtcblxuICAgIC8vIGNyZWF0ZSByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtbGlzdCc7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCByb3dzIGZyb20gcm9vdCBlbGVtZW50XG4gICAqL1xuICByZW1vdmVBbGxSb3dzKCkge1xuICAgIHdoaWxlKHRoaXMucm9vdEVsZW1lbnQuaGFzQ2hpbGROb2RlcygpICl7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMucm9vdEVsZW1lbnQubGFzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHJvd1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgYWRkUm93KGNvbnRlbnRUeXBlKSB7XG4gICAgY29uc3Qgcm93ID0gdGhpcy5jcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgdGhpcyk7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3Jvdy1zZWxlY3RlZCcsIHRoaXMsIHJvdyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChyb3cpXG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSBDb250ZW50IFR5cGUgY29uZmlndXJhdGlvbiBhbmQgY3JlYXRlcyBhIHJvdyBkb21cbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICogQHBhcmFtIHtFdmVudERpc3BhdGNoZXJ9IHNjb3BlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHNjb3BlKSB7XG4gICAgLy8gcm93IGl0ZW1cbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBlbGVtZW50LmlkID0gYGNvbnRlbnQtdHlwZS0ke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfWA7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG5cbiAgICAvLyBjcmVhdGUgYnV0dG9uIGNvbmZpZ1xuICAgIGNvbnN0IHVzZUJ1dHRvbkNvbmZpZyA9IHsgdGV4dDogJ1VzZScsIGNsczogJ2J1dHRvbi1wcmltYXJ5JywgaWNvbjogJycgfTtcbiAgICBjb25zdCBpbnN0YWxsQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnR2V0JywgY2xzOiAnYnV0dG9uLWludmVyc2UtcHJpbWFyeSBidXR0b24taW5zdGFsbCcsIGljb246ICdpY29uLWFycm93LXRoaWNrJ307XG4gICAgY29uc3QgYnV0dG9uID0gY29udGVudFR5cGUuaW5zdGFsbGVkID8gIHVzZUJ1dHRvbkNvbmZpZzogaW5zdGFsbEJ1dHRvbkNvbmZpZztcblxuICAgIGNvbnN0IHRpdGxlID0gY29udGVudFR5cGUudGl0bGUgfHwgY29udGVudFR5cGUubWFjaGluZU5hbWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBjb250ZW50VHlwZS5zdW1tYXJ5IHx8ICcnO1xuXG4gICAgY29uc3QgaW1hZ2UgPSBjb250ZW50VHlwZS5pY29uIHx8IG5vSWNvbjtcblxuICAgIC8vIGNyZWF0ZSBodG1sXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBzcmM9XCIke2ltYWdlfVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gJHtidXR0b24uY2xzfVwiIGRhdGEtaWQ9XCIke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfVwiIHRhYmluZGV4PVwiMFwiPjxzcGFuIGNsYXNzPVwiJHtidXR0b24uaWNvbn1cIj48L3NwYW4+JHtidXR0b24udGV4dH08L3NwYW4+XG4gICAgICA8aDQ+JHt0aXRsZX08L2g0PlxuICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+JHtkZXNjcmlwdGlvbn08L2Rpdj5cbiAgIGA7XG5cbiAgICAvLyBoYW5kbGUgdXNlIGJ1dHRvblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1wcmltYXJ5Jyk7XG4gICAgaWYodXNlQnV0dG9uKXtcbiAgICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCBzY29wZSwgdXNlQnV0dG9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVMaXN0VmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtbGlzdC12aWV3XCI7XG5pbXBvcnQge0V2ZW50RGlzcGF0Y2hlcn0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50LWRpc3BhdGNoZXInO1xuXG4vKipcbiAqIFJvdyBzZWxlY3RlZCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogVXBkYXRlIGNvbnRlbnQgdHlwZSBsaXN0IGV2ZW50XG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudERpc3BhdGNoZXJcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudERpc3BhdGNoZXIoKSk7XG5cbiAgICAvLyBhZGQgdGhlIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZUxpc3RWaWV3KHN0YXRlKTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3Jvdy1zZWxlY3RlZCcsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoaXMgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgdGhpcyBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBsaXN0IHdpdGggbmV3IGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZXMpIHtcbiAgICB0aGlzLnZpZXcucmVtb3ZlQWxsUm93cygpO1xuICAgIGNvbnRlbnRUeXBlcy5mb3JFYWNoKHRoaXMudmlldy5hZGRSb3csIHRoaXMudmlldyk7XG4gICAgdGhpcy50cmlnZ2VyKCd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnLCB7fSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2aWV3cyByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsImltcG9ydCBNZXNzYWdlVmlldyBmcm9tIFwiLi4vbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlld1wiO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlLCBxdWVyeVNlbGVjdG9yQWxsIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBpbml0TWVudSBmcm9tICdjb21wb25lbnRzL21lbnUnO1xuaW1wb3J0IHsgRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50LWRpc3BhdGNoZXInO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCB1bnNlbGVjdEFsbCA9IGZvckVhY2gocmVtb3ZlQXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykpO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudERpc3BhdGNoZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3IHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnREaXNwYXRjaGVyKCkpO1xuXG4gICAgLy8gZ2VuZXJhbCBjb25maWd1cmF0aW9uXG4gICAgdGhpcy50eXBlQWhlYWRFbmFibGVkID0gdHJ1ZTtcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoc3RhdGUpO1xuXG4gICAgLy8gcGljayBlbGVtZW50c1xuICAgIHRoaXMubWVudSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignbmF2Jyk7XG4gICAgdGhpcy5tZW51YmFyID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLW5hdicpO1xuICAgIHRoaXMuaW5wdXRGaWVsZCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignW3JvbGU9XCJzZWFyY2hcIl0gaW5wdXQnKTtcbiAgICB0aGlzLmRpc3BsYXlTZWxlY3RlZCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci10b2dnbGVyLXNlbGVjdGVkJyk7XG4gICAgY29uc3QgaW5wdXRCdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwic2VhcmNoXCJdIC5pbnB1dC1ncm91cC1hZGRvbicpO1xuXG4gICAgLy8gaW5wdXQgZmllbGRcbiAgICB0aGlzLmlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICBpZiAodHlwZUFoZWFkRW5hYmxlZCkgeyAvL0Rvbid0IGFsd2F5cyBhbGxvdyBpbW1lZGlhdGUgc2VhcmNoaW5nXG4gICAgICAgdGhpcy5maXJlKCdzZWFyY2gnLCB7XG4gICAgICAgICBlbGVtZW50OiBzZWFyY2hiYXIsXG4gICAgICAgICBxdWVyeTogc2VhcmNoYmFyLnZhbHVlXG4gICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpbnB1dCBidXR0b25cbiAgICBpbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICBsZXQgc2VhcmNoYmFyID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignI2h1Yi1zZWFyY2gtYmFyJyk7XG5cbiAgICAgICB0aGlzLnRyaWdnZXIoJ3NlYXJjaCcsIHtcbiAgICAgICAgIGVsZW1lbnQ6IHNlYXJjaGJhcixcbiAgICAgICAgIHF1ZXJ5OiBzZWFyY2hiYXIudmFsdWVcbiAgICAgICB9KTtcblxuICAgICAgIHNlYXJjaGJhci5mb2N1cygpO1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgbWVudSBncm91cCBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZUVsZW1lbnQoc3RhdGUpIHtcbiAgICBsZXQgbWVudXRpdGxlID0gJ0Jyb3dzZSBjb250ZW50IHR5cGVzJztcbiAgICBsZXQgbWVudUlkID0gJ2NvbnRlbnQtdHlwZS1maWx0ZXInO1xuICAgIGxldCBzZWFyY2hUZXh0ID0gJ1NlYXJjaCBmb3IgQ29udGVudCBUeXBlcyc7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudFxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtc2VjdGlvbi12aWV3JztcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtZW51LWdyb3VwXCI+XG4gICAgICAgIDxuYXYgIHJvbGU9XCJtZW51YmFyXCIgY2xhc3M9XCJuYXZiYXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLWhlYWRlclwiPlxuICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXIgbmF2YmFyLXRvZ2dsZXItcmlnaHRcIiBhcmlhLWNvbnRyb2xzPVwiJHttZW51SWR9XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdmJhci10b2dnbGVyLXNlbGVjdGVkXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWFjY29yZGlvbi1hcnJvd1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdmJhci1icmFuZFwiPiR7bWVudXRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDx1bCBpZD1cIiR7bWVudUlkfVwiIGNsYXNzPVwibmF2YmFyLW5hdlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvdWw+XG4gICAgICAgIDwvbmF2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiIHJvbGU9XCJzZWFyY2hcIj5cbiAgICAgICAgICA8aW5wdXQgaWQ9XCJodWItc2VhcmNoLWJhclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1yb3VuZGVkXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiR7c2VhcmNoVGV4dH1cIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpY29uLXNlYXJjaFwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIGRpc3BsYXlNZXNzYWdlKGNvbmZpZykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyBTZXQgdGhlIGFjdGlvblxuICAgIC8vIFRPRE8gLSBzaG91bGQgYmUgdHJhbnNsYXRhYmxlXG4gICAgY29uZmlnLmFjdGlvbiA9IFwiUmVsb2FkXCI7XG5cbiAgICB2YXIgbWVzc2FnZVZpZXcgPSBuZXcgTWVzc2FnZVZpZXcoY29uZmlnKTtcbiAgICB2YXIgZWxlbWVudCA9IG1lc3NhZ2VWaWV3LmdldEVsZW1lbnQoKTtcblxuICAgIG1lc3NhZ2VWaWV3Lm9uKCdhY3Rpb24tY2xpY2tlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYucm9vdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcbiAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgIHNlbGYudHJpZ2dlcigncmVsb2FkJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlVmlldy5nZXRFbGVtZW50KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBtZW51IGl0ZW1cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkIERldGVybWluZXMgaWYgdGFiIGlzIGFscmVhZHkgc2VsZWN0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBOYW1lIG9mIGV2ZW50IHRoYXQgdGFiIHdpbGwgZmlyZSBvZmZcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBhZGRNZW51SXRlbSh7IHRpdGxlLCBpZCwgc2VsZWN0ZWQsIGV2ZW50TmFtZSB9KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWl0ZW0nKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGlkKTtcbiAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRpdGxlO1xuXG4gICAgLy8gc2V0cyBpZiB0aGlzIG1lbnVpdGVtIHNob3VsZCBiZSBzZWxlY3RlZFxuICAgIGlmKHNlbGVjdGVkKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICB0aGlzLmRpc3BsYXlTZWxlY3RlZC5pbm5lclRleHQgPSB0aXRsZTtcbiAgICB9XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy50cmlnZ2VyKCdtZW51LXNlbGVjdGVkJywge1xuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXQsXG4gICAgICAgIGNob2ljZTogZXZlbnROYW1lXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGFkZCB0byBtZW51IGJhclxuICAgIHRoaXMubWVudWJhci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGlucHV0IGZpZWxkXG4gICAqL1xuICBjbGVhcklucHV0RmllbGQoKSB7XG4gICAgdGhpcy5pbnB1dEZpZWxkLnZhbHVlID0gJyc7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGZpbHRlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0ZWROYW1lXG4gICAqL1xuICBzZXREaXNwbGF5U2VsZWN0ZWQoc2VsZWN0ZWROYW1lKSB7XG4gICAgdGhpcy5kaXNwbGF5U2VsZWN0ZWQuaW5uZXJUZXh0ID0gc2VsZWN0ZWROYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSBtZW51IGl0ZW0gYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZWxlY3RNZW51SXRlbUJ5SWQoaWQpIHtcbiAgICBjb25zdCBtZW51SXRlbXMgPSB0aGlzLm1lbnViYXIucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJtZW51aXRlbVwiXScpO1xuICAgIGNvbnN0IHNlbGVjdGVkTWVudUl0ZW0gPSB0aGlzLm1lbnViYXIucXVlcnlTZWxlY3RvcihgW3JvbGU9XCJtZW51aXRlbVwiXVtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcblxuICAgIGlmKHNlbGVjdGVkTWVudUl0ZW0pIHtcbiAgICAgIHVuc2VsZWN0QWxsKG1lbnVJdGVtcyk7XG4gICAgICBzZWxlY3RlZE1lbnVJdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcignbWVudS1zZWxlY3RlZCcsIHtcbiAgICAgICAgZWxlbWVudDogc2VsZWN0ZWRNZW51SXRlbSxcbiAgICAgICAgaWQ6IHNlbGVjdGVkTWVudUl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXRNZW51KCkge1xuICAgIC8vIGNyZWF0ZSB0aGUgdW5kZXJsaW5lXG4gICAgY29uc3QgdW5kZXJsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHVuZGVybGluZS5jbGFzc05hbWUgPSAnbWVudWl0ZW0tdW5kZXJsaW5lJztcbiAgICB0aGlzLm1lbnViYXIuYXBwZW5kQ2hpbGQodW5kZXJsaW5lKTtcblxuICAgIC8vIGNhbGwgaW5pdCBtZW51IGZyb20gc2RrXG4gICAgaW5pdE1lbnUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGV4dCBzdHlsZXMgYW5kIHRoZSBtZW51IHVuZGVybGluZVxuICAgKi9cbiAgYWRkRGVhY3RpdmF0ZWRTdHlsZVRvTWVudSgpIHtcbiAgICB0aGlzLm1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnZGVhY3RpdmF0ZWQnKTtcbiAgfVxuICAvKipcbiAgICogUmVzdG9yZXMgdGV4dCBzdHlsZXMgYW5kIHRoZSBtZW51IHVuZGVybGluZVxuICAgKi9cbiAgcmVtb3ZlRGVhY3RpdmF0ZWRTdHlsZUZyb21NZW51KCkge1xuICAgIHRoaXMubWVudS5jbGFzc0xpc3QuYWRkKFwiZGVhY3RpdmF0ZWRcIik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwiaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvblZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLXNlY3Rpb24tdmlld1wiO1xuaW1wb3J0IFNlYXJjaFNlcnZpY2UgZnJvbSBcIi4uL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlXCI7XG5pbXBvcnQgQ29udGVudFR5cGVMaXN0IGZyb20gJy4uL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0JztcbmltcG9ydCBDb250ZW50VHlwZURldGFpbCBmcm9tICcuLi9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xuaW1wb3J0IHtFdmVudERpc3BhdGNoZXJ9IGZyb20gJy4uL21peGlucy9ldmVudC1kaXNwYXRjaGVyJztcblxuLyoqXG4gKiBUYWIgc2VjdGlvbiBjb25zdGFudHNcbiAqL1xuY29uc3QgQ29udGVudFR5cGVTZWN0aW9uVGFicyA9IHtcbiAgQUxMOiB7XG4gICAgaWQ6ICdmaWx0ZXItYWxsJyxcbiAgICB0aXRsZTogJ0FsbCcsXG4gICAgZXZlbnROYW1lOiAnYWxsJ1xuICB9LFxuICBNWV9DT05URU5UX1RZUEVTOiB7XG4gICAgaWQ6ICdmaWx0ZXItbXktY29udGVudC10eXBlcycsXG4gICAgdGl0bGU6ICdNeSBDb250ZW50IFR5cGVzJyxcbiAgICBldmVudE5hbWU6ICdteS1jb250ZW50LXR5cGVzJyxcbiAgICBzZWxlY3RlZDogdHJ1ZVxuICB9LFxuICBNT1NUX1BPUFVMQVI6IHtcbiAgICBpZDogJ2ZpbHRlci1tb3N0LXBvcHVsYXInLFxuICAgIHRpdGxlOiAnTW9zdCBQb3B1bGFyJyxcbiAgICBldmVudE5hbWU6ICdtb3N0LXBvcHVsYXInLFxuICAgIGZpbHRlclByb3BlcnR5OiAncG9wdWxhcml0eSdcbiAgfVxufTtcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXG4gKiBAbWl4ZXMgRXZlbnREaXNwYXRjaGVyXG4gKlxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKiBAcGFyYW0ge0h1YlNlcnZpY2VzfSBzZXJ2aWNlc1xuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUsIHNlcnZpY2VzKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnREaXNwYXRjaGVyKCkpO1xuXG4gICAgLy8gYWRkIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uVmlldyhzdGF0ZSk7XG5cbiAgICAvLyBjb250cm9sbGVyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2Uoc2VydmljZXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0ID0gbmV3IENvbnRlbnRUeXBlTGlzdCgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwgPSBuZXcgQ29udGVudFR5cGVEZXRhaWwoe30sIHNlcnZpY2VzKTtcblxuICAgIC8vIGFkZCBtZW51IGl0ZW1zXG4gICAgZm9yIChjb25zdCB0YWIgaW4gQ29udGVudFR5cGVTZWN0aW9uVGFicykge1xuICAgICAgaWYgKENvbnRlbnRUeXBlU2VjdGlvblRhYnMuaGFzT3duUHJvcGVydHkodGFiKSkge1xuICAgICAgICB0aGlzLnZpZXcuYWRkTWVudUl0ZW0oQ29udGVudFR5cGVTZWN0aW9uVGFic1t0YWJdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy52aWV3LmluaXRNZW51KCk7XG5cbiAgICAvLyBFbGVtZW50IGZvciBob2xkaW5nIGxpc3QgYW5kIGRldGFpbHMgdmlld3NcbiAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdjb250ZW50LXR5cGUtc2VjdGlvbicpO1xuXG4gICAgdGhpcy5yb290RWxlbWVudCA9IHNlY3Rpb247XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlTGlzdC5nZXRFbGVtZW50KCkpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZURldGFpbC5nZXRFbGVtZW50KCkpO1xuXG4gICAgdGhpcy52aWV3LmdldEVsZW1lbnQoKS5hcHBlbmRDaGlsZCh0aGlzLnJvb3RFbGVtZW50KTtcblxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCcsICd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnXSwgdGhpcy5jb250ZW50VHlwZUxpc3QpO1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0J10sIHRoaXMuY29udGVudFR5cGVEZXRhaWwpO1xuICAgIHRoaXMucHJvcGFnYXRlKFsncmVsb2FkJ10sIHRoaXMudmlldyk7XG5cbiAgICAvLyByZWdpc3RlciBsaXN0ZW5lcnNcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMuc2VhcmNoLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMudmlldy5zZWxlY3RNZW51SXRlbUJ5SWQuYmluZCh0aGlzLnZpZXcsIENvbnRlbnRUeXBlU2VjdGlvblRhYnMuQUxMLmlkKSk7XG4gICAgdGhpcy52aWV3Lm9uKCdzZWFyY2gnLCB0aGlzLnJlc2V0TWVudU9uRW50ZXIsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMuY2xvc2VEZXRhaWxWaWV3LCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmFwcGx5U2VhcmNoRmlsdGVyLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmNsZWFySW5wdXRGaWVsZCwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy51cGRhdGVEaXNwbGF5U2VsZWN0ZWQsIHRoaXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0Lm9uKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLnNob3dEZXRhaWxWaWV3LCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLm9uKCdjbG9zZScsIHRoaXMuY2xvc2VEZXRhaWxWaWV3LCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLm9uKCdzZWxlY3QnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG5cbiAgICB0aGlzLmluaXRDb250ZW50VHlwZUxpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0IHdpdGggYSBzZWFyY2hcbiAgICovXG4gIGluaXRDb250ZW50VHlwZUxpc3QoKSB7XG4gICAgLy8gaW5pdGlhbGl6ZSBieSBzZWFyY2hcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKFwiXCIpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnJvcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBlcnJvcnMgY29tbXVuaWNhdGluZyB3aXRoIEhVQlxuICAgKi9cbiAgaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAvLyBUT0RPIC0gdXNlIHRyYW5zbGF0aW9uIHN5c3RlbTpcbiAgICB0aGlzLnZpZXcuZGlzcGxheU1lc3NhZ2Uoe1xuICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgIHRpdGxlOiAnTm90IGFibGUgdG8gY29tbXVuaWNhdGUgd2l0aCBodWIuJyxcbiAgICAgIGNvbnRlbnQ6ICdFcnJvciBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLidcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBhIHNlYXJjaCBhbmQgdXBkYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3RcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XG4gICAqL1xuICBzZWFyY2goe3F1ZXJ5LCBrZXlDb2RlfSkge1xuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2gocXVlcnkpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGRpc3BsYXllZCBuYW1lIG9mIHRoZSBzZWxlY3RlZCBmaWx0ZXIgZm9yIG1vYmlsZVxuICAgKlxuICAgKiBAcGFyYW0ge1NlbGVjdGVkRWxlbWVudH0gZXZlbnRcbiAgICovXG4gIHVwZGF0ZURpc3BsYXlTZWxlY3RlZChldmVudCkge1xuICAgIHRoaXMudmlldy5zZXREaXNwbGF5U2VsZWN0ZWQoZXZlbnQuZWxlbWVudC5pbm5lclRleHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgc2VhcmNoIGZpbHRlciBkZXBlbmRpbmcgb24gd2hhdCBldmVudCBpdCByZWNlaXZlc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBFdmVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZS5jaG9pY2UgRXZlbnQgbmFtZSBvZiBjaG9zZW4gdGFiXG4gICAqL1xuICBhcHBseVNlYXJjaEZpbHRlcihlKSB7XG4gICAgc3dpdGNoKGUuY2hvaWNlKSB7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlU2VjdGlvblRhYnMuTU9TVF9QT1BVTEFSLmV2ZW50TmFtZTpcbiAgICAgICAgLy8gRmlsdGVyIG9uIHRhYidzIGZpbHRlciBwcm9wZXJ0eSwgdGhlbiB1cGRhdGUgY29udGVudCB0eXBlIGxpc3RcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgLmZpbHRlcihDb250ZW50VHlwZVNlY3Rpb25UYWJzLk1PU1RfUE9QVUxBUi5maWx0ZXJQcm9wZXJ0eSlcbiAgICAgICAgICAudGhlbihjdHMgPT4ge3RoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjdHMpfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgaW5wdXQgZmllbGRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBjbGVhcklucHV0RmllbGQoe2lkfSkge1xuICAgIGlmIChpZCAhPT0gQ29udGVudFR5cGVTZWN0aW9uVGFicy5BTEwuaWQpIHtcbiAgICAgIHRoaXMudmlldy5jbGVhcklucHV0RmllbGQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgZGV0YWlsIHZpZXdcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzaG93RGV0YWlsVmlldyh7aWR9KSB7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwubG9hZEJ5SWQoaWQpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuc2hvdygpO1xuICAgIHRoaXMudmlldy50eXBlQWhlYWRFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy52aWV3LnJlbW92ZURlYWN0aXZhdGVkU3R5bGVGcm9tTWVudSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIGRldGFpbCB2aWV3XG4gICAqL1xuICBjbG9zZURldGFpbFZpZXcoKSB7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5oaWRlKCk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Quc2hvdygpXG4gICAgdGhpcy52aWV3LnR5cGVBaGVhZEVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMudmlldy5hZGREZWFjdGl2YXRlZFN0eWxlVG9NZW51KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwiaW1wb3J0ICcuL3V0aWxzL2ZldGNoJztcbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gQ29udGVudFR5cGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGNoVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN1bW1hcnlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjcmVhdGVkQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVkX0F0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaXNSZWNvbW1lbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBvcHVsYXJpdHlcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHNjcmVlbnNob3RzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGljZW5zZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV4YW1wbGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0dXRvcmlhbFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0ga2V5d29yZHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvd25lclxuICogQHByb3BlcnR5IHtib29sZWFufSBpbnN0YWxsZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVzdHJpY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBhcGlSb290VXJsIH0pIHtcbiAgICB0aGlzLmFwaVJvb3RVcmwgPSBhcGlSb290VXJsO1xuICAgIHRoaXMuc2V0dXAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCB0aGUgY29udGVudCB0eXBlIG1ldGFkYXRhXG4gICAqL1xuICBzZXR1cCgpIHtcbiAgICB0aGlzLmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50LXR5cGUtY2FjaGVgLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pXG4gICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgLnRoZW4odGhpcy5pc1ZhbGlkKVxuICAgIC50aGVuKGpzb24gPT4ganNvbi5saWJyYXJpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSAge0NvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cbiAgICovXG4gIGlzVmFsaWQocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT59XG4gICAqL1xuICBjb250ZW50VHlwZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVkQ29udGVudFR5cGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBDb250ZW50IFR5cGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVkQ29udGVudFR5cGVzLnRoZW4oY29udGVudFR5cGVzID0+IHtcbiAgICAgIHJldHVybiBjb250ZW50VHlwZXMuZmlsdGVyKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lID09PSBtYWNoaW5lTmFtZSlbMF07XG4gICAgfSk7XG5cbiAgICAvKnJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9Y29udGVudF90eXBlX2NhY2hlLyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTsqL1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbGxzIGEgY29udGVudCB0eXBlIG9uIHRoZSBzZXJ2ZXJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGluc3RhbGxDb250ZW50VHlwZShpZCkge1xuICAgIHJldHVybiBmZXRjaChucy5nZXRBamF4VXJsKCdsaWJyYXJ5LWluc3RhbGwnLCB7aWQ6IGlkfSksIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6ICcnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XG4gIH1cblxuXG4gIC8vIGZvciB0ZXN0aW5nIHdpdGggZXJyb3JcbiAgLyppbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktaW5zdGFsbGAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9Ki9cblxuICAvKipcbiAgICogVXBsb2FkcyBhIGNvbnRlbnQgdHlwZSB0byB0aGUgc2VydmVyIGZvciB2YWxpZGF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7Rm9ybURhdGF9IGZvcm1EYXRhIEZvcm0gY29udGFpbmluZyB0aGUgaDVwIHRoYXQgc2hvdWxkIGJlIHVwbG9hZGVkIGFzICdoNXAnXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2V9IFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBqc29uIGNvbnRhaW5pbmcgdGhlIGNvbnRlbnQganNvbiBhbmQgdGhlIGg1cCBqc29uXG4gICAqL1xuICB1cGxvYWRDb250ZW50KGZvcm1EYXRhKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1saWJyYXJ5LXVwbG9hZGAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6IGZvcm1EYXRhXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi1zZXJ2aWNlcy5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxuaW1wb3J0IGluaXRUYWJQYW5lbCBmcm9tIFwiY29tcG9uZW50cy90YWItcGFuZWxcIlxuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnLi9taXhpbnMvZXZlbnQtZGlzcGF0Y2hlcic7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4vdXRpbHMvZXZlbnRzJztcbi8qKlxuICogVGFiIGNoYW5nZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjdGFiLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBQYW5lbCBvcGVuIG9yIGNsb3NlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyNwYW5lbC1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9EQVRBX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudERpc3BhdGNoZXJcbiAqIEBmaXJlcyBIdWJWaWV3I3RhYi1jaGFuZ2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViVmlldyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudERpc3BhdGNoZXIoKSk7XG5cbiAgICB0aGlzLnJlbmRlclRhYlBhbmVsKHN0YXRlKTtcbiAgICB0aGlzLnJlbmRlclBhbmVsKHN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHBhbmVsXG4gICAqL1xuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4cGFuZGVkXG4gICAqL1xuICByZW5kZXJQYW5lbCh7dGl0bGUgPSAnJywgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnLCBleHBhbmRlZCA9IGZhbHNlfSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50aXRsZS5jbGFzc05hbWUgKz0gXCJwYW5lbC1oZWFkZXIgaWNvbi1odWItaWNvblwiO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgKCEhZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YCk7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncGFuZWwtY2hhbmdlJywgdGhpcywgdGhpcy50aXRsZSk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5ib2R5LmNsYXNzTmFtZSArPSBcInBhbmVsLWJvZHlcIjtcbiAgICB0aGlzLmJvZHkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMuYm9keS5pZCA9IGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWA7XG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lICs9IGBwYW5lbCBoNXAtc2VjdGlvbi0ke3NlY3Rpb25JZH1gO1xuICAgIGlmKGV4cGFuZGVkKXtcbiAgICAgIHRoaXMucGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgIH1cbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5ib2R5KTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lICs9IGBoNXAtaHViIGg1cC1zZGtgO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gICAgaW5pdFBhbmVsKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpZiBwYW5lbCBpcyBvcGVuLCB0aGlzIGlzIHVzZWQgZm9yIG91dGVyIGJvcmRlciBjb2xvclxuICAgKi9cbiAgdG9nZ2xlUGFuZWxPcGVuKCkge1xuICAgIGxldCBwYW5lbCA9IHRoaXMucGFuZWw7XG4gICAgaWYoaXNPcGVuKHBhbmVsKSkge1xuICAgICAgcGFuZWwucmVtb3ZlQXR0cmlidXRlKCdvcGVuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3BhbmVsLnF1ZXJ5U2VsZWN0b3IoJyNodWItc2VhcmNoLWJhcicpLmZvY3VzKCl9LDIwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgdGFiIHBhbmVsXG4gICAqL1xuICByZW5kZXJUYWJQYW5lbChzdGF0ZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYmxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMudGFibGlzdC5jbGFzc05hbWUgKz0gXCJ0YWJsaXN0XCI7XG4gICAgdGhpcy50YWJsaXN0LnNldEF0dHJpYnV0ZSAoJ3JvbGUnLCAndGFibGlzdCcpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKHRoaXMudGFibGlzdCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmNsYXNzTmFtZSArPSAndGFiLXBhbmVsJztcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50YWJMaXN0V3JhcHBlcik7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHRhYlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRlbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxuICAgKi9cbiAgYWRkVGFiKHt0aXRsZSwgaWQsIGNvbnRlbnQsIHNlbGVjdGVkID0gZmFsc2V9KSB7XG4gICAgY29uc3QgdGFiSWQgPSBgdGFiLSR7aWR9YDtcbiAgICBjb25zdCB0YWJQYW5lbElkID0gYHRhYi1wYW5lbC0ke2lkfWA7XG5cbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRhYi5jbGFzc05hbWUgKz0gJ3RhYic7XG4gICAgdGFiLmlkID0gdGFiSWQ7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRhYlBhbmVsSWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBzZWxlY3RlZC50b1N0cmluZygpKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKEFUVFJJQlVURV9EQVRBX0lELCBpZCk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWInKTtcbiAgICB0YWIuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3RhYi1jaGFuZ2UnLCB0aGlzLCB0YWIpO1xuXG4gICAgY29uc3QgdGFiUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YWJQYW5lbC5pZCA9IHRhYlBhbmVsSWQ7XG4gICAgdGFiUGFuZWwuY2xhc3NOYW1lICs9ICd0YWJwYW5lbCc7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmxsZWRieScsIHRhYklkKTtcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgKCFzZWxlY3RlZCkudG9TdHJpbmcoKSk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYnBhbmVsJyk7XG4gICAgdGFiUGFuZWwuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQodGFiKTtcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGFiUGFuZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gYW5pbWF0ZWQgYm9yZGVyIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhYlxuICAgKi9cbiAgYWRkQm90dG9tQm9yZGVyKCkge1xuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpO1xuICB9XG5cbiAgaW5pdFRhYlBhbmVsKCkge1xuICAgIGluaXRUYWJQYW5lbCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRTZWN0aW9uVHlwZSh7aWR9KSB7XG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgPSBgaDVwLXNlY3Rpb24tJHtpZH0gcGFuZWxgO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJpbXBvcnQge0V2ZW50RGlzcGF0Y2hlcn0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50LWRpc3BhdGNoZXInO1xuaW1wb3J0IHtyZWxheUNsaWNrRXZlbnRBc30gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3XG4gKiBAbWl4ZXMgRXZlbnREaXNwYXRjaGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VWaWV3IHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLnR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLnRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS5jb250ZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbc3RhdGUuYWN0aW9uXVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlLmRpc21pc3NhYmxlXVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudERpc3BhdGNoZXIoKSk7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudHNcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50KHN0YXRlKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQobWVzc2FnZSkge1xuICAgIC8vIENyZWF0ZSB3cmFwcGVyOlxuICAgIGNvbnN0IG1lc3NhZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVzc2FnZVdyYXBwZXIuY2xhc3NOYW1lID0gYG1lc3NhZ2UgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XG5cbiAgICAvLyBBZGQgY2xvc2UgYnV0dG9uIGlmIGRpc21pc2FibGVcbiAgICBpZiAobWVzc2FnZS5kaXNtaXNzaWJsZSkge1xuICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XG4gICAgICAvL2Nsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmI3gyNzE1JztcbiAgICAgIC8vIFRPRE9cbiAgICAgIC8vIC0gQWRkIGNsb3NlIGxhYmVsIGZyb20gdHJhbnNsYXRpb25zXG4gICAgICAvLyAtIEFkZCB2aXN1YWxzIGluIENTUyAoZm9udCBpY29uKVxuICAgICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ2Nsb3NlJywgdGhpcywgY2xvc2VCdXR0b24pO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVzc2FnZUNvbnRlbnQuY2xhc3NOYW1lID0gJ21lc3NhZ2UtY29udGVudCc7XG4gICAgbWVzc2FnZUNvbnRlbnQuaW5uZXJIVE1MID0gJzxoMj4nICsgbWVzc2FnZS50aXRsZSArICc8L2gyPicgKyAnPHA+JyArIG1lc3NhZ2UuY29udGVudCArICc8L3A+JztcbiAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGVudCk7XG5cbiAgICBpZiAobWVzc2FnZS5hY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgbWVzc2FnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgbWVzc2FnZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcbiAgICAgIG1lc3NhZ2VCdXR0b24uaW5uZXJIVE1MID0gbWVzc2FnZS5hY3Rpb247XG4gICAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQnV0dG9uKTtcblxuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ2FjdGlvbi1jbGlja2VkJywgdGhpcywgbWVzc2FnZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlldy5qcyIsImltcG9ydCB7Y3Vycnl9IGZyb20gJ3V0aWxzL2Z1bmN0aW9uYWwnXG5cbi8qKlxuICogQGNsYXNzXG4gKiBUaGUgU2VhcmNoIFNlcnZpY2UgZ2V0cyBhIGNvbnRlbnQgdHlwZSBmcm9tIGh1Yi1zZXJ2aWNlcy5qc1xuICogaW4gdGhlIGZvcm0gb2YgYSBwcm9taXNlLiBJdCB0aGVuIGdlbmVyYXRlcyBhIHNjb3JlIGJhc2VkXG4gKiBvbiB0aGUgZGlmZmVyZW50IHdlaWdodGluZ3Mgb2YgdGhlIGNvbnRlbnQgdHlwZSBmaWVsZHMgYW5kXG4gKiBzb3J0cyB0aGUgcmVzdWx0cyBiYXNlZCBvbiB0aGUgZ2VuZXJhdGVkIHNjb3JlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU2VydmljZXN9IHNlcnZpY2VzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzZXJ2aWNlcykge1xuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHNlYXJjaFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnlcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZTxDb250ZW50VHlwZVtdPn0gQSBwcm9taXNlIG9mIGFuIGFycmF5IG9mIGNvbnRlbnQgdHlwZXNcbiAgICovXG4gIHNlYXJjaChxdWVyeSkge1xuICAgIC8vIEFkZCBjb250ZW50IHR5cGVzIHRvIHRoZSBzZWFyY2ggaW5kZXhcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZXMoKS50aGVuKGZpbHRlckJ5UXVlcnkocXVlcnkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXIgYWxsIGNvbnRlbnQgdHlwZXMgYnkgZ2l2ZW4gcHJvcGVydHlcbiAgICpcbiAgICogQHBhcmFtIHByb3BlcnR5XG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlW10+fCp9XG4gICAqL1xuICBmaWx0ZXIocHJvcGVydHkpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZXMoKVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IGNvbnRlbnRUeXBlcy5zb3J0KChjdDEsIGN0MikgPT4ge1xuXG4gICAgICAgIC8vIFByb3BlcnR5IGRvZXMgbm90IGV4aXN0LCBtb3ZlIHRvIGJvdHRvbVxuICAgICAgICBpZiAoIWN0MS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY3QyLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNvcnQgb24gcHJvcGVydHlcbiAgICAgICAgaWYgKGN0MVtwcm9wZXJ0eV0gPiBjdDJbcHJvcGVydHldKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY3QxW3Byb3BlcnR5XSA8IGN0Mltwcm9wZXJ0eV0pIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgfVxufVxuXG4vKipcbiAqIEZpbHRlcnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXMgYmFzZWQgb24gYSBxdWVyeVxuICogQHR5cGUge0Z1bmN0aW9ufVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcbiAqL1xuY29uc3QgZmlsdGVyQnlRdWVyeSA9IGN1cnJ5KGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZXMpIHtcbiAgaWYgKHF1ZXJ5ID09ICcnKSB7XG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlcztcbiAgfVxuXG4gIC8vIEFwcGVuZCBhIHNlYXJjaCBzY29yZSB0byBlYWNoIGNvbnRlbnQgdHlwZVxuICByZXR1cm4gY29udGVudFR5cGVzLm1hcChjb250ZW50VHlwZSA9PlxuICAgICh7XG4gICAgICBjb250ZW50VHlwZTogY29udGVudFR5cGUsXG4gICAgICBzY29yZTogZ2V0U2VhcmNoU2NvcmUocXVlcnksIGNvbnRlbnRUeXBlKVxuICAgIH0pKVxuICAgIC5maWx0ZXIocmVzdWx0ID0+IHJlc3VsdC5zY29yZSA+IDApXG4gICAgLnNvcnQoc29ydFNlYXJjaFJlc3VsdHMpIC8vIFNvcnQgYnkgaW5zdGFsbGVkLCByZWxldmFuY2UgYW5kIHBvcHVsYXJpdHlcbiAgICAubWFwKHJlc3VsdCA9PiByZXN1bHQuY29udGVudFR5cGUpOyAvLyBVbndyYXAgcmVzdWx0IG9iamVjdDtcbn0pO1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciBBcnJheS5zb3J0KClcbiAqIENvbXBhcmVzIHR3byBjb250ZW50IHR5cGVzIG9uIGRpZmZlcmVudCBjcml0ZXJpYVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIEZpcnN0IGNvbnRlbnQgdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IGIgU2Vjb25kIGNvbnRlbnQgdHlwZVxuICogQHJldHVybiB7aW50fVxuICovXG5jb25zdCBzb3J0U2VhcmNoUmVzdWx0cyA9IChhLGIpID0+IHtcbiAgaWYgKCFhLmNvbnRlbnRUeXBlLmluc3RhbGxlZCAmJiBiLmNvbnRlbnRUeXBlLmluc3RhbGxlZCkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgaWYgKGEuY29udGVudFR5cGUuaW5zdGFsbGVkICYmICFiLmNvbnRlbnRUeXBlLmluc3RhbGxlZCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIGVsc2UgaWYgKGIuc2NvcmUgIT09IGEuc2NvcmUpIHtcbiAgICByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmU7XG4gIH1cblxuICBlbHNlIHtcbiAgICByZXR1cm4gYi5jb250ZW50VHlwZS5wb3B1bGFyaXR5IC0gYS5jb250ZW50VHlwZS5wb3B1bGFyaXR5O1xuICB9XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgd2VpZ2h0aW5nIGZvciBkaWZmZXJlbnQgc2VhcmNoIHRlcm1zIGJhc2VkXG4gKiBvbiBleGlzdGVuY2Ugb2Ygc3Vic3RyaW5nc1xuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gcXVlcnlcbiAqIEBwYXJhbSAge09iamVjdH0gY29udGVudFR5cGVcbiAqIEByZXR1cm4ge2ludH1cbiAqL1xuIGNvbnN0IGdldFNlYXJjaFNjb3JlID0gZnVuY3Rpb24ocXVlcnksIGNvbnRlbnRUeXBlKSB7XG4gICBsZXQgcXVlcmllcyA9IHF1ZXJ5LnNwbGl0KCcgJykuZmlsdGVyKHF1ZXJ5ID0+IHF1ZXJ5ICE9PSAnJyk7XG4gICBsZXQgcXVlcnlTY29yZXMgPSBxdWVyaWVzLm1hcChxdWVyeSA9PiBnZXRTY29yZUZvckVhY2hRdWVyeShxdWVyeSwgY29udGVudFR5cGUpKTtcbiAgIGlmIChxdWVyeVNjb3Jlcy5pbmRleE9mKDApID4gLTEpIHtcbiAgICAgcmV0dXJuIDA7XG4gICB9XG4gICByZXR1cm4gcXVlcnlTY29yZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG4gfTtcblxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHJlbGV2YW5jZSBzY29yZSBmb3IgYSBzaW5nbGUgc3RyaW5nXG4gKlxuICogQHBhcmFtICB7dHlwZX0gcXVlcnkgICAgICAgZGVzY3JpcHRpb25cbiAqIEBwYXJhbSAge3R5cGV9IGNvbnRlbnRUeXBlIGRlc2NyaXB0aW9uXG4gKiBAcmV0dXJuIHt0eXBlfSAgICAgICAgICAgICBkZXNjcmlwdGlvblxuICovXG5jb25zdCBnZXRTY29yZUZvckVhY2hRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeSwgY29udGVudFR5cGUpIHtcbiAgIHF1ZXJ5ID0gcXVlcnkudHJpbSgpO1xuICAgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUudGl0bGUpKSB7XG4gICAgIHJldHVybiAxMDA7XG4gICB9XG4gICBlbHNlIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLnN1bW1hcnkpKSB7XG4gICAgIHJldHVybiA1O1xuICAgfVxuICAgZWxzZSBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5kZXNjcmlwdGlvbikpIHtcbiAgICAgcmV0dXJuIDU7XG4gICB9XG4gICBlbHNlIGlmIChhcnJheUhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUua2V5d29yZHMpKSB7XG4gICAgIHJldHVybiA1O1xuICAgfVxuICAgZWxzZSB7XG4gICAgIHJldHVybiAwO1xuICAgfVxufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBuZWVkbGUgaXMgZm91bmQgaW4gdGhlIGhheXN0YWNrLlxuICogTm90IGNhc2Ugc2Vuc2l0aXZlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5lZWRsZVxuICogQHBhcmFtIHtzdHJpbmd9IGhheXN0YWNrXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdWJTdHJpbmcgPSBmdW5jdGlvbihuZWVkbGUsIGhheXN0YWNrKSB7XG4gIGlmIChoYXlzdGFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGhheXN0YWNrLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24sIGNoZWNrcyBpZiBhcnJheSBoYXMgY29udGFpbnMgYSBzdWJzdHJpbmdcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN1YlN0cmluZ1xuICogQHBhcmFtICB7QXJyYXl9IGFyclxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgYXJyYXlIYXNTdWJTdHJpbmcgPSBmdW5jdGlvbihzdWJTdHJpbmcsIGFycikge1xuICBpZiAoYXJyID09PSB1bmRlZmluZWQgfHwgc3ViU3RyaW5nID09PSAnJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBhcnIuc29tZShzdHJpbmcgPT4gaGFzU3ViU3RyaW5nKHN1YlN0cmluZywgc3RyaW5nKSk7XG59O1xuXG5jb25zdCBBZGROdW1iZXI9ZnVuY3Rpb24oYSxiKVxue1xuICByZXR1cm4gYStiO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJpbXBvcnQgeyBFdmVudERpc3BhdGNoZXIgfSBmcm9tICcuLi9taXhpbnMvZXZlbnQtZGlzcGF0Y2hlcic7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnREaXNwYXRjaGVyXG4gKlxuICogQGZpcmVzIEh1YiN1cGxvYWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkU2VjdGlvbiB7XG5cbiAgY29uc3RydWN0b3Ioc3RhdGUsIHNlcnZpY2VzKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudERpc3BhdGNoZXIoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcblxuICAgIC8vIElucHV0IGVsZW1lbnQgZm9yIHRoZSBINVAgZmlsZVxuICAgIGNvbnN0IGg1cFVwbG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaDVwVXBsb2FkLnNldEF0dHJpYnV0ZSgndHlwZScsICdmaWxlJyk7XG5cbiAgICAvLyBTZW5kcyB0aGUgSDVQIGZpbGUgdG8gdGhlIHBsdWdpblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHVzZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdVc2UnO1xuICAgIHVzZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgLy8gQWRkIHRoZSBINVAgZmlsZSB0byBhIGZvcm0sIHJlYWR5IGZvciB0cmFuc3BvcnRhdGlvblxuICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZGF0YS5hcHBlbmQoJ2g1cCcsIGg1cFVwbG9hZC5maWxlc1swXSk7XG5cbiAgICAgIC8vIFVwbG9hZCBjb250ZW50IHRvIHRoZSBwbHVnaW5cbiAgICAgIHRoaXMuc2VydmljZXMudXBsb2FkQ29udGVudChkYXRhKVxuICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAvLyBGaXJlIHRoZSByZWNlaXZlZCBkYXRhIHRvIGFueSBsaXN0ZW5lcnNcbiAgICAgICAgICBzZWxmLnRyaWdnZXIoJ3VwbG9hZCcsIGpzb24pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGg1cFVwbG9hZCk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh1c2VCdXR0b24pO1xuXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpXG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCdcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHsgYm9keTogdGhpcy5fYm9keUluaXQgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gICAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcbiAgICB2YXIgcHJlUHJvY2Vzc2VkSGVhZGVycyA9IHJhd0hlYWRlcnMucmVwbGFjZSgvXFxyP1xcbltcXHQgXSsvLCAnICcpXG4gICAgcHJlUHJvY2Vzc2VkSGVhZGVycy5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZmV0Y2guanMiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlLCBjbGFzc0xpc3RDb250YWlucywgcXVlcnlTZWxlY3Rvciwgbm9kZUxpc3RUb0FycmF5IH0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtjdXJyeSwgZm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9TSVpFID0gJ2RhdGEtc2l6ZSc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBkaXNhYmxlID0gc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGVuYWJsZSA9IHJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWRcbiAqL1xuY29uc3QgdG9nZ2xlRW5hYmxlZCA9IChlbGVtZW50LCBlbmFibGVkKSA9PiAoZW5hYmxlZCA/IGVuYWJsZSA6IGRpc2FibGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlkZGVuXG4gKi9cbmNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSBjdXJyeSgoaGlkZGVuLCBlbGVtZW50KSA9PiBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgaGlkZGVuLnRvU3RyaW5nKCksIGVsZW1lbnQpKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGlzRGlzYWJsZWQgPSBoYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbi8qKlxuICogVXBkYXRlIHRoZSB2aWV3XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKi9cbmNvbnN0IHVwZGF0ZVZpZXcgPSAoZWxlbWVudCwgc3RhdGUpID0+IHtcbiAgY29uc3QgcHJldkJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXZpb3VzJyk7XG4gIGNvbnN0IG5leHRCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0Jyk7XG4gIGNvbnN0IGxpc3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gIGNvbnN0IHRvdGFsQ291bnQgPSBsaXN0LmNoaWxkRWxlbWVudENvdW50O1xuXG4gIC8vIHVwZGF0ZSBsaXN0IHNpemVzXG4gIGxpc3Quc3R5bGUud2lkdGggPSBgJHsxMDAgLyBzdGF0ZS5kaXNwbGF5Q291bnQgKiB0b3RhbENvdW50fSVgO1xuICBsaXN0LnN0eWxlLm1hcmdpbkxlZnQgPSBgJHtzdGF0ZS5wb3NpdGlvbiAqICgxMDAgLyBzdGF0ZS5kaXNwbGF5Q291bnQpfSVgO1xuXG4gIC8vIHVwZGF0ZSBpbWFnZSBzaXplc1xuICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHsxMDAgLyB0b3RhbENvdW50fSVgKTtcblxuICAvLyB0b2dnbGUgYnV0dG9uIHZpc2liaWxpdHlcbiAgW3ByZXZCdXR0b24sIG5leHRCdXR0b25dXG4gICAgLmZvckVhY2godG9nZ2xlVmlzaWJpbGl0eShzdGF0ZS5kaXNwbGF5Q291bnQgPj0gdG90YWxDb3VudCkpO1xuXG4gIC8vIHRvZ2dsZSBidXR0b24gZW5hYmxlLCBkaXNhYmxlZFxuICB0b2dnbGVFbmFibGVkKG5leHRCdXR0b24sIHN0YXRlLnBvc2l0aW9uID4gKHN0YXRlLmRpc3BsYXlDb3VudCAtIHRvdGFsQ291bnQpKTtcbiAgdG9nZ2xlRW5hYmxlZChwcmV2QnV0dG9uLCBzdGF0ZS5wb3NpdGlvbiA8IDApO1xufTtcblxuLyoqXG4gKiBIYW5kbGVzIGJ1dHRvbiBjbGlja2VkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBidXR0b25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHVwZGF0ZVN0YXRlXG4gKiBAcGFyYW0ge0V2ZW50fVxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrID0gY3VycnkoKGVsZW1lbnQsIHN0YXRlLCBidXR0b24sIHVwZGF0ZVN0YXRlLCBldmVudCkgPT4ge1xuICBpZighaXNEaXNhYmxlZChidXR0b24pKXtcbiAgICB1cGRhdGVTdGF0ZShzdGF0ZSk7XG4gICAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIGltYWdlXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaW1hZ2VcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpbml0SW1hZ2UgPSBjdXJyeSgoZWxlbWVudCwgaW1hZ2UpID0+IHtcbiAgbGV0IHRhcmdldElkID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gIGxldCB0YXJnZXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhcmdldElkfWApO1xuXG4gIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XG4gIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKSlcbn0pO1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciB3aGVuIHRoZSBkb20gaXMgdXBkYXRlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gcmVjb3JkXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGFuZGxlRG9tVXBkYXRlID0gY3VycnkoKGVsZW1lbnQsIHN0YXRlLCByZWNvcmQpID0+IHtcbiAgLy8gb24gYWRkIGltYWdlIHJ1biBpbml0aWFsaXphdGlvblxuICBpZihyZWNvcmQudHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICBub2RlTGlzdFRvQXJyYXkocmVjb3JkLmFkZGVkTm9kZXMpXG4gICAgICAuZmlsdGVyKGNsYXNzTGlzdENvbnRhaW5zKCdzbGlkZScpKVxuICAgICAgLm1hcChxdWVyeVNlbGVjdG9yKCdpbWcnKSlcbiAgICAgIC5mb3JFYWNoKGluaXRJbWFnZShlbGVtZW50KSk7XG4gIH1cblxuICAvLyB1cGRhdGUgdGhlIHZpZXdcbiAgdXBkYXRlVmlldyhlbGVtZW50LCBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgZGlzcGxheUNvdW50OiBlbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfU0laRSkgfHwgNSxcbiAgICBwb3NpdGlvbjogMFxuICB9KSk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICAvLyBnZXQgYnV0dG9uIGh0bWwgZWxlbWVudHNcbiAgY29uc3QgbmV4dEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQnKTtcbiAgY29uc3QgcHJldkJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXZpb3VzJyk7XG5cbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtvYmplY3R9IEltYWdlU2Nyb2xsZXJTdGF0ZVxuICAgKiBAcHJvcGVydHkge251bWJlcn0gZGlzcGxheUNvdW50XG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwb3NpdGlvblxuICAgKi9cbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgZGlzcGxheUNvdW50OiBlbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfU0laRSkgfHwgNSxcbiAgICBwb3NpdGlvbjogMFxuICB9O1xuXG4gIC8vIGluaXRpYWxpemUgYnV0dG9uc1xuICBuZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2soZWxlbWVudCwgc3RhdGUsIG5leHRCdXR0b24sIHN0YXRlID0+IHN0YXRlLnBvc2l0aW9uLS0pKTtcbiAgcHJldkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrKGVsZW1lbnQsIHN0YXRlLCBwcmV2QnV0dG9uLCBzdGF0ZSA9PiBzdGF0ZS5wb3NpdGlvbisrKSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBpbWFnZXNcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbYXJpYS1jb250cm9sc10nKS5mb3JFYWNoKGluaXRJbWFnZShlbGVtZW50KSk7XG5cbiAgLy8gbGlzdGVuIGZvciB1cGRhdGVzIHRvIGRhdGEtc2l6ZVxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmb3JFYWNoKGhhbmRsZURvbVVwZGF0ZShlbGVtZW50LCBzdGF0ZSkpKTtcblxuICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIHtcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW0FUVFJJQlVURV9TSVpFXVxuICB9KTtcblxuICAvLyBpbml0aWFsaXplIHBvc2l0aW9uXG4gIHVwZGF0ZVZpZXcoZWxlbWVudCwgc3RhdGUpO1xuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZSwgdG9nZ2xlQXR0cmlidXRlLCBoaWRlLCBzaG93LCB0b2dnbGVWaXNpYmlsaXR5fSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcbmltcG9ydCB7IGluaXRDb2xsYXBzaWJsZSB9IGZyb20gJy4uL3V0aWxzL2FyaWEnO1xuXG4vKipcbiAqIFVuc2VsZWN0cyBhbGwgZWxlbWVudHMgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBhcmlhLWV4cGFuZGVkIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50IHRvIGZhbHNlXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5jb25zdCB1bkV4cGFuZCA9IHNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG4vKipcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIC8vIGVsZW1lbnRzXG4gIGNvbnN0IG1lbnVJdGVtcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJtZW51aXRlbVwiXScpO1xuICBjb25zdCB0b2dnbGVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1jb250cm9sc11bYXJpYS1leHBhbmRlZF0nKTtcblxuICAvLyBtb3ZlIHNlbGVjdFxuICBtZW51SXRlbXMuZm9yRWFjaChtZW51SXRlbSA9PiB7XG4gICAgbWVudUl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICB1blNlbGVjdEFsbChtZW51SXRlbXMpO1xuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICB1bkV4cGFuZCh0b2dnbGVyKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gaW5pdCBjb2xsYXBzZSBhbmQgb3BlblxuICBpbml0Q29sbGFwc2libGUoZWxlbWVudCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL21lbnUuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCB1blNlbGVjdEFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJykpO1xuXG4vKipcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIGNvbnN0IHRhYnMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFiXCJdJyk7XG4gIGNvbnN0IHRhYlBhbmVscyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJwYW5lbFwiXScpO1xuXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICB1blNlbGVjdEFsbCh0YWJzKTtcbiAgICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXG4gICAgICBoaWRlQWxsKHRhYlBhbmVscyk7XG5cbiAgICAgIGxldCB0YWJQYW5lbElkID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICAgICAgc2hvdyhlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhYlBhbmVsSWR9YCkpO1xuICAgIH0pO1xuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJyZXF1aXJlKCcuLi8uLi9zcmMvc3R5bGVzL21haW4uc2NzcycpO1xuXG4vLyBMb2FkIGxpYnJhcnlcbkg1UCA9IEg1UCB8fCB7fTtcbkg1UC5IdWJDbGllbnQgPSByZXF1aXJlKCcuLi9zY3JpcHRzL2h1YicpLmRlZmF1bHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIiwiLyoqXG4gKiBAbWl4aW5cbiAqL1xuZXhwb3J0IGNvbnN0IEV2ZW50RGlzcGF0Y2hlciA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnREaXNwYXRjaGVyfVxuICAgKi9cbiAgb246IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBzY29wZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmIHtvYmplY3R9IFRyaWdnZXJcbiAgICAgKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzY29wZVxuICAgICAqL1xuICAgIGNvbnN0IHRyaWdnZXIgPSB7XG4gICAgICAnbGlzdGVuZXInOiBsaXN0ZW5lcixcbiAgICAgICdzY29wZSc6IHNjb3BlXG4gICAgfTtcblxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaCh0cmlnZ2VyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBldmVudC4gSWYgYW55IG9mIHRoZSBsaXN0ZW5lcnMgcmV0dXJucyBmYWxzZSwgcmV0dXJuIGZhbHNlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZXZlbnRdXG4gICAqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgdHJpZ2dlcjogZnVuY3Rpb24odHlwZSwgZXZlbnQpIHtcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuXG4gICAgcmV0dXJuIHRyaWdnZXJzLmV2ZXJ5KGZ1bmN0aW9uKHRyaWdnZXIpIHtcbiAgICAgIHJldHVybiB0cmlnZ2VyLmxpc3RlbmVyLmNhbGwodHJpZ2dlci5zY29wZSB8fCB0aGlzLCBldmVudCkgIT09IGZhbHNlO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIGZvciBldmVudHMgb24gYW5vdGhlciBFdmVudERpc3BhdGNoZXIsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnREaXNwYXRjaGVyXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IHR5cGVzXG4gICAqIEBwYXJhbSB7RXZlbnREaXNwYXRjaGVyfSBkaXNwYXRjaGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZXZlbnROYW1lXSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgd2hlbiBwcm9wb2dhdGVkXG4gICAqL1xuICBwcm9wYWdhdGU6IGZ1bmN0aW9uKHR5cGVzLCBkaXNwYXRjaGVyLCBuZXdUeXBlKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBkaXNwYXRjaGVyLm9uKHR5cGUsIGV2ZW50ID0+IHNlbGYudHJpZ2dlcihuZXdUeXBlIHx8IHR5cGUsIGV2ZW50KSkpO1xuICB9XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL21peGlucy9ldmVudC1kaXNwYXRjaGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==