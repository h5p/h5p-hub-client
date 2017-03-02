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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
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
exports.querySelectorAll = exports.querySelector = exports.appendChild = exports.toggleAttribute = exports.attributeEquals = exports.hasAttribute = exports.removeAttribute = exports.setAttribute = exports.getAttribute = undefined;

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
  el.setAttribute(name, value);
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
  el.removeAttribute(name);
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

/***/ }),
/* 3 */
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
  console.log(message);
  var closeButton = document.createElement('div');
  closeButton.className = 'close';
  closeButton.innerHTML = '&#x2715';

  var messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.innerHTML = message.content;

  var messageWrapper = document.createElement('div');
  messageWrapper.className = 'message' + ' ' + ('' + message.type) + (message.dismissible ? ' dismissible' : '');
  messageWrapper.appendChild(closeButton);
  messageWrapper.appendChild(messageContent);
  console.log(messageWrapper);
  return messageWrapper;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {object} ContentType
 * @property {string} id
 * @property {string} title
 * @property {string} summary
 * @property {string} description
 * @property {string} icon
 * @property {string} created
 * @property {string} update
 * @property {boolean} recommended
 * @property {number} timesDownloaded
 * @property {string[]} screenshots
 * @property {string} example
 * @property {string[]} keywords
 * @property {string[]} categories
 * @property {string} license
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
   * @param  {Object} response
   * @return {Promise<ContentType[] | ErrorMessage>}
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
      return fetch(this.apiRootUrl + 'library-install?id=' + id, {
        method: 'POST',
        credentials: 'include',
        body: ''
      }).then(function (result) {
        return result.json();
      });
    }
  }]);

  return HubServices;
}();

exports.default = HubServices;

/***/ }),
/* 5 */
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
var isExpanded = (0, _elements.attributeEquals)("aria-expanded", 'true');

/**
 * @type {function}
 */
var hide = (0, _elements.setAttribute)('aria-hidden', 'true');

/**
 * @type {function}
 */
var show = (0, _elements.setAttribute)('aria-hidden', 'false');

/**
 * Toggles the body visibility
 *
 * @param {HTMLElement} bodyElement
 * @param {boolean} isExpanded
 */
var toggleBodyVisibility = function toggleBodyVisibility(bodyElement, isExpanded) {
  if (isExpanded) {
    show(bodyElement);
    bodyElement.style.height = bodyElement.scrollHeight + 'px';
  } else {
    hide(bodyElement);
    bodyElement.style.height = "0";
  }
};

/**
 * Handles changes to aria-expanded
 *
 * @param {HTMLElement} bodyElement
 * @param {MutationRecord} event
 *
 * @function
 */
var onAriaExpandedChange = (0, _functional.curry)(function (bodyElement, event) {
  toggleBodyVisibility(bodyElement, isExpanded(event.target));
});

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
function init(element) {
  var titleEl = element.querySelector('[aria-expanded]');
  var bodyId = titleEl.getAttribute('aria-controls');
  var bodyEl = element.querySelector('#' + bodyId);

  if (titleEl) {
    // set observer on title for aria-expanded
    var observer = new MutationObserver((0, _functional.forEach)(onAriaExpandedChange(bodyEl)));

    observer.observe(titleEl, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["aria-expanded"]
    });

    // Set click listener that toggles aria-expanded
    titleEl.addEventListener('click', function (event) {
      (0, _elements.toggleAttribute)("aria-expanded", event.target);
    });

    toggleBodyVisibility(bodyEl, isExpanded(titleEl));
  }

  return element;
}

/***/ }),
/* 6 */
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

var _hubServices = __webpack_require__(4);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _eventful = __webpack_require__(0);

var _errors = __webpack_require__(3);

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
 * @class
 * @mixes Eventful
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

    // handle events
    this.on('select', this.setPanelTitle, this);
    this.on('select', this.view.closePanel, this.view);

    this.initTabPanel();
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
     */

  }, {
    key: 'initTabPanel',
    value: function initTabPanel() {
      var _this2 = this;

      var tabConfigs = [{
        title: 'Create Content',
        id: 'create-content',
        content: this.contentTypeSection.getElement(),
        selected: true
      }, {
        title: 'Upload',
        id: 'upload-section',
        content: this.uploadSection.getElement()
      }];

      tabConfigs.forEach(function (tabConfig) {
        return _this2.view.addTab(tabConfig);
      });
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
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 1.0.0
 * Copyright (C) 2017 Oliver Nightingale
 * @license MIT
 */

;(function () {

  /**
   * Convenience function for instantiating a new lunr index and configuring it
   * with the default pipeline functions and the passed config function.
   *
   * When using this convenience function a new index will be created with the
   * following functions already in the pipeline:
   *
   * lunr.StopWordFilter - filters out any stop words before they enter the
   * index
   *
   * lunr.stemmer - stems the tokens before entering the index.
   *
   * Example:
   *
   *     var idx = lunr(function () {
   *       this.field('title', 10)
   *       this.field('tags', 100)
   *       this.field('body')
   *       
   *       this.ref('cid')
   *       
   *       this.pipeline.add(function () {
   *         // some custom pipeline function
   *       })
   *       
   *     })
   *
   * @param {Function} config A function that will be called with the new instance
   * of the lunr.Index as both its context and first parameter. It can be used to
   * customize the instance of new lunr.Index.
   * @namespace
   * @module
   * @returns {lunr.Index}
   *
   */
  var lunr = function lunr(config) {
    var idx = new lunr.Index();

    idx.pipeline.add(lunr.trimmer, lunr.stopWordFilter, lunr.stemmer);

    if (config) config.call(idx, idx);

    return idx;
  };

  lunr.version = "1.0.0";
  /*!
   * lunr.utils
   * Copyright (C) 2017 Oliver Nightingale
   */

  /**
   * A namespace containing utils for the rest of the lunr library
   */
  lunr.utils = {};

  /**
   * Print a warning message to the console.
   *
   * @param {String} message The message to be printed.
   * @memberOf Utils
   */
  lunr.utils.warn = function (global) {
    return function (message) {
      if (global.console && console.warn) {
        console.warn(message);
      }
    };
  }(this);

  /**
   * Convert an object to a string.
   *
   * In the case of `null` and `undefined` the function returns
   * the empty string, in all other cases the result of calling
   * `toString` on the passed object is returned.
   *
   * @param {Any} obj The object to convert to a string.
   * @return {String} string representation of the passed object.
   * @memberOf Utils
   */
  lunr.utils.asString = function (obj) {
    if (obj === void 0 || obj === null) {
      return "";
    } else {
      return obj.toString();
    }
  };
  /*!
   * lunr.EventEmitter
   * Copyright (C) 2017 Oliver Nightingale
   */

  /**
   * lunr.EventEmitter is an event emitter for lunr. It manages adding and removing event handlers and triggering events and their handlers.
   *
   * @constructor
   */
  lunr.EventEmitter = function () {
    this.events = {};
  };

  /**
   * Binds a handler function to a specific event(s).
   *
   * Can bind a single function to many different events in one call.
   *
   * @param {String} [eventName] The name(s) of events to bind this function to.
   * @param {Function} fn The function to call when an event is fired.
   * @memberOf EventEmitter
   */
  lunr.EventEmitter.prototype.addListener = function () {
    var args = Array.prototype.slice.call(arguments),
        fn = args.pop(),
        names = args;

    if (typeof fn !== "function") throw new TypeError("last argument must be a function");

    names.forEach(function (name) {
      if (!this.hasHandler(name)) this.events[name] = [];
      this.events[name].push(fn);
    }, this);
  };

  /**
   * Removes a handler function from a specific event.
   *
   * @param {String} eventName The name of the event to remove this function from.
   * @param {Function} fn The function to remove from an event.
   * @memberOf EventEmitter
   */
  lunr.EventEmitter.prototype.removeListener = function (name, fn) {
    if (!this.hasHandler(name)) return;

    var fnIndex = this.events[name].indexOf(fn);
    this.events[name].splice(fnIndex, 1);

    if (!this.events[name].length) delete this.events[name];
  };

  /**
   * Calls all functions bound to the given event.
   *
   * Additional data can be passed to the event handler as arguments to `emit`
   * after the event name.
   *
   * @param {String} eventName The name of the event to emit.
   * @memberOf EventEmitter
   */
  lunr.EventEmitter.prototype.emit = function (name) {
    if (!this.hasHandler(name)) return;

    var args = Array.prototype.slice.call(arguments, 1);

    this.events[name].forEach(function (fn) {
      fn.apply(undefined, args);
    });
  };

  /**
   * Checks whether a handler has ever been stored against an event.
   *
   * @param {String} eventName The name of the event to check.
   * @private
   * @memberOf EventEmitter
   */
  lunr.EventEmitter.prototype.hasHandler = function (name) {
    return name in this.events;
  };

  /*!
   * lunr.tokenizer
   * Copyright (C) 2017 Oliver Nightingale
   */

  /**
   * A function for splitting a string into tokens ready to be inserted into
   * the search index. Uses `lunr.tokenizer.separator` to split strings, change
   * the value of this property to change how strings are split into tokens.
   *
   * @module
   * @param {String} obj The string to convert into tokens
   * @see lunr.tokenizer.separator
   * @returns {Array}
   */
  lunr.tokenizer = function (obj) {
    if (!arguments.length || obj == null || obj == undefined) return [];
    if (Array.isArray(obj)) return obj.map(function (t) {
      return lunr.utils.asString(t).toLowerCase();
    });

    return obj.toString().trim().toLowerCase().split(lunr.tokenizer.separator);
  };

  /**
   * The sperator used to split a string into tokens. Override this property to change the behaviour of
   * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
   *
   * @static
   * @see lunr.tokenizer
   */
  lunr.tokenizer.separator = /[\s\-]+/;

  /**
   * Loads a previously serialised tokenizer.
   *
   * A tokenizer function to be loaded must already be registered with lunr.tokenizer.
   * If the serialised tokenizer has not been registered then an error will be thrown.
   *
   * @param {String} label The label of the serialised tokenizer.
   * @returns {Function}
   * @memberOf tokenizer
   */
  lunr.tokenizer.load = function (label) {
    var fn = this.registeredFunctions[label];

    if (!fn) {
      throw new Error('Cannot load un-registered function: ' + label);
    }

    return fn;
  };

  lunr.tokenizer.label = 'default';

  lunr.tokenizer.registeredFunctions = {
    'default': lunr.tokenizer
  };

  /**
   * Register a tokenizer function.
   *
   * Functions that are used as tokenizers should be registered if they are to be used with a serialised index.
   *
   * Registering a function does not add it to an index, functions must still be associated with a specific index for them to be used when indexing and searching documents.
   *
   * @param {Function} fn The function to register.
   * @param {String} label The label to register this function with
   * @memberOf tokenizer
   */
  lunr.tokenizer.registerFunction = function (fn, label) {
    if (label in this.registeredFunctions) {
      lunr.utils.warn('Overwriting existing tokenizer: ' + label);
    }

    fn.label = label;
    this.registeredFunctions[label] = fn;
  };
  /*!
   * lunr.Pipeline
   * Copyright (C) 2017 Oliver Nightingale
   */

  /**
   * lunr.Pipelines maintain an ordered list of functions to be applied to all
   * tokens in documents entering the search index and queries being ran against
   * the index.
   *
   * An instance of lunr.Index created with the lunr shortcut will contain a
   * pipeline with a stop word filter and an English language stemmer. Extra
   * functions can be added before or after either of these functions or these
   * default functions can be removed.
   *
   * When run the pipeline will call each function in turn, passing a token, the
   * index of that token in the original list of all tokens and finally a list of
   * all the original tokens.
   *
   * The output of functions in the pipeline will be passed to the next function
   * in the pipeline. To exclude a token from entering the index the function
   * should return undefined, the rest of the pipeline will not be called with
   * this token.
   *
   * For serialisation of pipelines to work, all functions used in an instance of
   * a pipeline should be registered with lunr.Pipeline. Registered functions can
   * then be loaded. If trying to load a serialised pipeline that uses functions
   * that are not registered an error will be thrown.
   *
   * If not planning on serialising the pipeline then registering pipeline functions
   * is not necessary.
   *
   * @constructor
   */
  lunr.Pipeline = function () {
    this._stack = [];
  };

  lunr.Pipeline.registeredFunctions = {};

  /**
   * Register a function with the pipeline.
   *
   * Functions that are used in the pipeline should be registered if the pipeline
   * needs to be serialised, or a serialised pipeline needs to be loaded.
   *
   * Registering a function does not add it to a pipeline, functions must still be
   * added to instances of the pipeline for them to be used when running a pipeline.
   *
   * @param {Function} fn The function to check for.
   * @param {String} label The label to register this function with
   * @memberOf Pipeline
   */
  lunr.Pipeline.registerFunction = function (fn, label) {
    if (label in this.registeredFunctions) {
      lunr.utils.warn('Overwriting existing registered function: ' + label);
    }

    fn.label = label;
    lunr.Pipeline.registeredFunctions[fn.label] = fn;
  };

  /**
   * Warns if the function is not registered as a Pipeline function.
   *
   * @param {Function} fn The function to check for.
   * @private
   * @memberOf Pipeline
   */
  lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
    var isRegistered = fn.label && fn.label in this.registeredFunctions;

    if (!isRegistered) {
      lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn);
    }
  };

  /**
   * Loads a previously serialised pipeline.
   *
   * All functions to be loaded must already be registered with lunr.Pipeline.
   * If any function from the serialised data has not been registered then an
   * error will be thrown.
   *
   * @param {Object} serialised The serialised pipeline to load.
   * @returns {lunr.Pipeline}
   * @memberOf Pipeline
   */
  lunr.Pipeline.load = function (serialised) {
    var pipeline = new lunr.Pipeline();

    serialised.forEach(function (fnName) {
      var fn = lunr.Pipeline.registeredFunctions[fnName];

      if (fn) {
        pipeline.add(fn);
      } else {
        throw new Error('Cannot load un-registered function: ' + fnName);
      }
    });

    return pipeline;
  };

  /**
   * Adds new functions to the end of the pipeline.
   *
   * Logs a warning if the function has not been registered.
   *
   * @param {Function} functions Any number of functions to add to the pipeline.
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.add = function () {
    var fns = Array.prototype.slice.call(arguments);

    fns.forEach(function (fn) {
      lunr.Pipeline.warnIfFunctionNotRegistered(fn);
      this._stack.push(fn);
    }, this);
  };

  /**
   * Adds a single function after a function that already exists in the
   * pipeline.
   *
   * Logs a warning if the function has not been registered.
   *
   * @param {Function} existingFn A function that already exists in the pipeline.
   * @param {Function} newFn The new function to add to the pipeline.
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.after = function (existingFn, newFn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(newFn);

    var pos = this._stack.indexOf(existingFn);
    if (pos == -1) {
      throw new Error('Cannot find existingFn');
    }

    pos = pos + 1;
    this._stack.splice(pos, 0, newFn);
  };

  /**
   * Adds a single function before a function that already exists in the
   * pipeline.
   *
   * Logs a warning if the function has not been registered.
   *
   * @param {Function} existingFn A function that already exists in the pipeline.
   * @param {Function} newFn The new function to add to the pipeline.
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.before = function (existingFn, newFn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(newFn);

    var pos = this._stack.indexOf(existingFn);
    if (pos == -1) {
      throw new Error('Cannot find existingFn');
    }

    this._stack.splice(pos, 0, newFn);
  };

  /**
   * Removes a function from the pipeline.
   *
   * @param {Function} fn The function to remove from the pipeline.
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.remove = function (fn) {
    var pos = this._stack.indexOf(fn);
    if (pos == -1) {
      return;
    }

    this._stack.splice(pos, 1);
  };

  /**
   * Runs the current list of functions that make up the pipeline against the
   * passed tokens.
   *
   * @param {Array} tokens The tokens to run through the pipeline.
   * @returns {Array}
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.run = function (tokens) {
    var out = [],
        tokenLength = tokens.length,
        stackLength = this._stack.length;

    for (var i = 0; i < tokenLength; i++) {
      var token = tokens[i];

      for (var j = 0; j < stackLength; j++) {
        token = this._stack[j](token, i, tokens);
        if (token === void 0 || token === '') break;
      };

      if (token !== void 0 && token !== '') out.push(token);
    };

    return out;
  };

  /**
   * Resets the pipeline by removing any existing processors.
   *
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.reset = function () {
    this._stack = [];
  };

  /**
   * Returns a representation of the pipeline ready for serialisation.
   *
   * Logs a warning if the function has not been registered.
   *
   * @returns {Array}
   * @memberOf Pipeline
   */
  lunr.Pipeline.prototype.toJSON = function () {
    return this._stack.map(function (fn) {
      lunr.Pipeline.warnIfFunctionNotRegistered(fn);

      return fn.label;
    });
  };
  /*!
   * lunr.Vector
   * Copyright (C) 2017 Oliver Nightingale
   */

  /**
   * lunr.Vectors implement vector related operations for
   * a series of elements.
   *
   * @constructor
   */
  lunr.Vector = function () {
    this._magnitude = null;
    this.list = undefined;
    this.length = 0;
  };

  /**
   * lunr.Vector.Node is a simple struct for each node
   * in a lunr.Vector.
   *
   * @private
   * @param {Number} The index of the node in the vector.
   * @param {Object} The data at this node in the vector.
   * @param {lunr.Vector.Node} The node directly after this node in the vector.
   * @constructor
   * @memberOf Vector
   */
  lunr.Vector.Node = function (idx, val, next) {
    this.idx = idx;
    this.val = val;
    this.next = next;
  };

  /**
   * Inserts a new value at a position in a vector.
   *
   * @param {Number} The index at which to insert a value.
   * @param {Object} The object to insert in the vector.
   * @memberOf Vector.
   */
  lunr.Vector.prototype.insert = function (idx, val) {
    this._magnitude = undefined;
    var list = this.list;

    if (!list) {
      this.list = new lunr.Vector.Node(idx, val, list);
      return this.length++;
    }

    if (idx < list.idx) {
      this.list = new lunr.Vector.Node(idx, val, list);
      return this.length++;
    }

    var prev = list,
        next = list.next;

    while (next != undefined) {
      if (idx < next.idx) {
        prev.next = new lunr.Vector.Node(idx, val, next);
        return this.length++;
      }

      prev = next, next = next.next;
    }

    prev.next = new lunr.Vector.Node(idx, val, next);
    return this.length++;
  };

  /**
   * Calculates the magnitude of this vector.
   *
   * @returns {Number}
   * @memberOf Vector
   */
  lunr.Vector.prototype.magnitude = function () {
    if (this._magnitude) return this._magnitude;
    var node = this.list,
        sumOfSquares = 0,
        val;

    while (node) {
      val = node.val;
      sumOfSquares += val * val;
      node = node.next;
    }

    return this._magnitude = Math.sqrt(sumOfSquares);
  };

  /**
   * Calculates the dot product of this vector and another vector.
   *
   * @param {lunr.Vector} otherVector The vector to compute the dot product with.
   * @returns {Number}
   * @memberOf Vector
   */
  lunr.Vector.prototype.dot = function (otherVector) {
    var node = this.list,
        otherNode = otherVector.list,
        dotProduct = 0;

    while (node && otherNode) {
      if (node.idx < otherNode.idx) {
        node = node.next;
      } else if (node.idx > otherNode.idx) {
        otherNode = otherNode.next;
      } else {
        dotProduct += node.val * otherNode.val;
        node = node.next;
        otherNode = otherNode.next;
      }
    }

    return dotProduct;
  };

  /**
   * Calculates the cosine similarity between this vector and another
   * vector.
   *
   * @param {lunr.Vector} otherVector The other vector to calculate the
   * similarity with.
   * @returns {Number}
   * @memberOf Vector
   */
  lunr.Vector.prototype.similarity = function (otherVector) {
    return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude());
  };
  /*!
   * lunr.SortedSet
   * Copyright (C) 2017 Oliver Nightingale
   */

  /**
   * lunr.SortedSets are used to maintain an array of uniq values in a sorted
   * order.
   *
   * @constructor
   */
  lunr.SortedSet = function () {
    this.length = 0;
    this.elements = [];
  };

  /**
   * Loads a previously serialised sorted set.
   *
   * @param {Array} serialisedData The serialised set to load.
   * @returns {lunr.SortedSet}
   * @memberOf SortedSet
   */
  lunr.SortedSet.load = function (serialisedData) {
    var set = new this();

    set.elements = serialisedData;
    set.length = serialisedData.length;

    return set;
  };

  /**
   * Inserts new items into the set in the correct position to maintain the
   * order.
   *
   * @param {Object} The objects to add to this set.
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.add = function () {
    var i, element;

    for (i = 0; i < arguments.length; i++) {
      element = arguments[i];
      if (~this.indexOf(element)) continue;
      this.elements.splice(this.locationFor(element), 0, element);
    }

    this.length = this.elements.length;
  };

  /**
   * Converts this sorted set into an array.
   *
   * @returns {Array}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.toArray = function () {
    return this.elements.slice();
  };

  /**
   * Creates a new array with the results of calling a provided function on every
   * element in this sorted set.
   *
   * Delegates to Array.prototype.map and has the same signature.
   *
   * @param {Function} fn The function that is called on each element of the
   * set.
   * @param {Object} ctx An optional object that can be used as the context
   * for the function fn.
   * @returns {Array}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.map = function (fn, ctx) {
    return this.elements.map(fn, ctx);
  };

  /**
   * Executes a provided function once per sorted set element.
   *
   * Delegates to Array.prototype.forEach and has the same signature.
   *
   * @param {Function} fn The function that is called on each element of the
   * set.
   * @param {Object} ctx An optional object that can be used as the context
   * @memberOf SortedSet
   * for the function fn.
   */
  lunr.SortedSet.prototype.forEach = function (fn, ctx) {
    return this.elements.forEach(fn, ctx);
  };

  /**
   * Returns the index at which a given element can be found in the
   * sorted set, or -1 if it is not present.
   *
   * @param {Object} elem The object to locate in the sorted set.
   * @returns {Number}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.indexOf = function (elem) {
    var start = 0,
        end = this.elements.length,
        sectionLength = end - start,
        pivot = start + Math.floor(sectionLength / 2),
        pivotElem = this.elements[pivot];

    while (sectionLength > 1) {
      if (pivotElem === elem) return pivot;

      if (pivotElem < elem) start = pivot;
      if (pivotElem > elem) end = pivot;

      sectionLength = end - start;
      pivot = start + Math.floor(sectionLength / 2);
      pivotElem = this.elements[pivot];
    }

    if (pivotElem === elem) return pivot;

    return -1;
  };

  /**
   * Returns the position within the sorted set that an element should be
   * inserted at to maintain the current order of the set.
   *
   * This function assumes that the element to search for does not already exist
   * in the sorted set.
   *
   * @param {Object} elem The elem to find the position for in the set
   * @returns {Number}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.locationFor = function (elem) {
    var start = 0,
        end = this.elements.length,
        sectionLength = end - start,
        pivot = start + Math.floor(sectionLength / 2),
        pivotElem = this.elements[pivot];

    while (sectionLength > 1) {
      if (pivotElem < elem) start = pivot;
      if (pivotElem > elem) end = pivot;

      sectionLength = end - start;
      pivot = start + Math.floor(sectionLength / 2);
      pivotElem = this.elements[pivot];
    }

    if (pivotElem > elem) return pivot;
    if (pivotElem < elem) return pivot + 1;
  };

  /**
   * Creates a new lunr.SortedSet that contains the elements in the intersection
   * of this set and the passed set.
   *
   * @param {lunr.SortedSet} otherSet The set to intersect with this set.
   * @returns {lunr.SortedSet}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.intersect = function (otherSet) {
    var intersectSet = new lunr.SortedSet(),
        i = 0,
        j = 0,
        a_len = this.length,
        b_len = otherSet.length,
        a = this.elements,
        b = otherSet.elements;

    while (true) {
      if (i > a_len - 1 || j > b_len - 1) break;

      if (a[i] === b[j]) {
        intersectSet.add(a[i]);
        i++, j++;
        continue;
      }

      if (a[i] < b[j]) {
        i++;
        continue;
      }

      if (a[i] > b[j]) {
        j++;
        continue;
      }
    };

    return intersectSet;
  };

  /**
   * Makes a copy of this set
   *
   * @returns {lunr.SortedSet}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.clone = function () {
    var clone = new lunr.SortedSet();

    clone.elements = this.toArray();
    clone.length = clone.elements.length;

    return clone;
  };

  /**
   * Creates a new lunr.SortedSet that contains the elements in the union
   * of this set and the passed set.
   *
   * @param {lunr.SortedSet} otherSet The set to union with this set.
   * @returns {lunr.SortedSet}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.union = function (otherSet) {
    var longSet, shortSet, unionSet;

    if (this.length >= otherSet.length) {
      longSet = this, shortSet = otherSet;
    } else {
      longSet = otherSet, shortSet = this;
    }

    unionSet = longSet.clone();

    for (var i = 0, shortSetElements = shortSet.toArray(); i < shortSetElements.length; i++) {
      unionSet.add(shortSetElements[i]);
    }

    return unionSet;
  };

  /**
   * Returns a representation of the sorted set ready for serialisation.
   *
   * @returns {Array}
   * @memberOf SortedSet
   */
  lunr.SortedSet.prototype.toJSON = function () {
    return this.toArray();
  };
  /*!
   * lunr.Index
   * Copyright (C) 2017 Oliver Nightingale
   */

  /**
   * lunr.Index is object that manages a search index.  It contains the indexes
   * and stores all the tokens and document lookups.  It also provides the main
   * user facing API for the library.
   *
   * @constructor
   */
  lunr.Index = function () {
    this._fields = [];
    this._ref = 'id';
    this.pipeline = new lunr.Pipeline();
    this.documentStore = new lunr.Store();
    this.tokenStore = new lunr.TokenStore();
    this.corpusTokens = new lunr.SortedSet();
    this.eventEmitter = new lunr.EventEmitter();
    this.tokenizerFn = lunr.tokenizer;

    this._idfCache = {};

    this.on('add', 'remove', 'update', function () {
      this._idfCache = {};
    }.bind(this));
  };

  /**
   * Bind a handler to events being emitted by the index.
   *
   * The handler can be bound to many events at the same time.
   *
   * @param {String} [eventName] The name(s) of events to bind the function to.
   * @param {Function} fn The serialised set to load.
   * @memberOf Index
   */
  lunr.Index.prototype.on = function () {
    var args = Array.prototype.slice.call(arguments);
    return this.eventEmitter.addListener.apply(this.eventEmitter, args);
  };

  /**
   * Removes a handler from an event being emitted by the index.
   *
   * @param {String} eventName The name of events to remove the function from.
   * @param {Function} fn The serialised set to load.
   * @memberOf Index
   */
  lunr.Index.prototype.off = function (name, fn) {
    return this.eventEmitter.removeListener(name, fn);
  };

  /**
   * Loads a previously serialised index.
   *
   * Issues a warning if the index being imported was serialised
   * by a different version of lunr.
   *
   * @param {Object} serialisedData The serialised set to load.
   * @returns {lunr.Index}
   * @memberOf Index
   */
  lunr.Index.load = function (serialisedData) {
    if (serialisedData.version !== lunr.version) {
      lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version);
    }

    var idx = new this();

    idx._fields = serialisedData.fields;
    idx._ref = serialisedData.ref;

    idx.tokenizer(lunr.tokenizer.load(serialisedData.tokenizer));
    idx.documentStore = lunr.Store.load(serialisedData.documentStore);
    idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore);
    idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens);
    idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline);

    return idx;
  };

  /**
   * Adds a field to the list of fields that will be searchable within documents
   * in the index.
   *
   * An optional boost param can be passed to affect how much tokens in this field
   * rank in search results, by default the boost value is 1.
   *
   * Fields should be added before any documents are added to the index, fields
   * that are added after documents are added to the index will only apply to new
   * documents added to the index.
   *
   * @param {String} fieldName The name of the field within the document that
   * should be indexed
   * @param {Number} boost An optional boost that can be applied to terms in this
   * field.
   * @returns {lunr.Index}
   * @memberOf Index
   */
  lunr.Index.prototype.field = function (fieldName, opts) {
    var opts = opts || {},
        field = { name: fieldName, boost: opts.boost || 1 };

    this._fields.push(field);
    return this;
  };

  /**
   * Sets the property used to uniquely identify documents added to the index,
   * by default this property is 'id'.
   *
   * This should only be changed before adding documents to the index, changing
   * the ref property without resetting the index can lead to unexpected results.
   *
   * The value of ref can be of any type but it _must_ be stably comparable and
   * orderable.
   *
   * @param {String} refName The property to use to uniquely identify the
   * documents in the index.
   * @param {Boolean} emitEvent Whether to emit add events, defaults to true
   * @returns {lunr.Index}
   * @memberOf Index
   */
  lunr.Index.prototype.ref = function (refName) {
    this._ref = refName;
    return this;
  };

  /**
   * Sets the tokenizer used for this index.
   *
   * By default the index will use the default tokenizer, lunr.tokenizer. The tokenizer
   * should only be changed before adding documents to the index. Changing the tokenizer
   * without re-building the index can lead to unexpected results.
   *
   * @param {Function} fn The function to use as a tokenizer.
   * @returns {lunr.Index}
   * @memberOf Index
   */
  lunr.Index.prototype.tokenizer = function (fn) {
    var isRegistered = fn.label && fn.label in lunr.tokenizer.registeredFunctions;

    if (!isRegistered) {
      lunr.utils.warn('Function is not a registered tokenizer. This may cause problems when serialising the index');
    }

    this.tokenizerFn = fn;
    return this;
  };

  /**
   * Add a document to the index.
   *
   * This is the way new documents enter the index, this function will run the
   * fields from the document through the index's pipeline and then add it to
   * the index, it will then show up in search results.
   *
   * An 'add' event is emitted with the document that has been added and the index
   * the document has been added to. This event can be silenced by passing false
   * as the second argument to add.
   *
   * @param {Object} doc The document to add to the index.
   * @param {Boolean} emitEvent Whether or not to emit events, default true.
   * @memberOf Index
   */
  lunr.Index.prototype.add = function (doc, emitEvent) {
    var docTokens = {},
        allDocumentTokens = new lunr.SortedSet(),
        docRef = doc[this._ref],
        emitEvent = emitEvent === undefined ? true : emitEvent;

    this._fields.forEach(function (field) {
      var fieldTokens = this.pipeline.run(this.tokenizerFn(doc[field.name]));

      docTokens[field.name] = fieldTokens;

      for (var i = 0; i < fieldTokens.length; i++) {
        var token = fieldTokens[i];
        allDocumentTokens.add(token);
        this.corpusTokens.add(token);
      }
    }, this);

    this.documentStore.set(docRef, allDocumentTokens);

    for (var i = 0; i < allDocumentTokens.length; i++) {
      var token = allDocumentTokens.elements[i];
      var tf = 0;

      for (var j = 0; j < this._fields.length; j++) {
        var field = this._fields[j];
        var fieldTokens = docTokens[field.name];
        var fieldLength = fieldTokens.length;

        if (!fieldLength) continue;

        var tokenCount = 0;
        for (var k = 0; k < fieldLength; k++) {
          if (fieldTokens[k] === token) {
            tokenCount++;
          }
        }

        tf += tokenCount / fieldLength * field.boost;
      }

      this.tokenStore.add(token, { ref: docRef, tf: tf });
    };

    if (emitEvent) this.eventEmitter.emit('add', doc, this);
  };

  /**
   * Removes a document from the index.
   *
   * To make sure documents no longer show up in search results they can be
   * removed from the index using this method.
   *
   * The document passed only needs to have the same ref property value as the
   * document that was added to the index, they could be completely different
   * objects.
   *
   * A 'remove' event is emitted with the document that has been removed and the index
   * the document has been removed from. This event can be silenced by passing false
   * as the second argument to remove.
   *
   * @param {Object} doc The document to remove from the index.
   * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
   * @memberOf Index
   */
  lunr.Index.prototype.remove = function (doc, emitEvent) {
    var docRef = doc[this._ref],
        emitEvent = emitEvent === undefined ? true : emitEvent;

    if (!this.documentStore.has(docRef)) return;

    var docTokens = this.documentStore.get(docRef);

    this.documentStore.remove(docRef);

    docTokens.forEach(function (token) {
      this.tokenStore.remove(token, docRef);
    }, this);

    if (emitEvent) this.eventEmitter.emit('remove', doc, this);
  };

  /**
   * Updates a document in the index.
   *
   * When a document contained within the index gets updated, fields changed,
   * added or removed, to make sure it correctly matched against search queries,
   * it should be updated in the index.
   *
   * This method is just a wrapper around `remove` and `add`
   *
   * An 'update' event is emitted with the document that has been updated and the index.
   * This event can be silenced by passing false as the second argument to update. Only
   * an update event will be fired, the 'add' and 'remove' events of the underlying calls
   * are silenced.
   *
   * @param {Object} doc The document to update in the index.
   * @param {Boolean} emitEvent Whether to emit update events, defaults to true
   * @see Index.prototype.remove
   * @see Index.prototype.add
   * @memberOf Index
   */
  lunr.Index.prototype.update = function (doc, emitEvent) {
    var emitEvent = emitEvent === undefined ? true : emitEvent;

    this.remove(doc, false);
    this.add(doc, false);

    if (emitEvent) this.eventEmitter.emit('update', doc, this);
  };

  /**
   * Calculates the inverse document frequency for a token within the index.
   *
   * @param {String} token The token to calculate the idf of.
   * @see Index.prototype.idf
   * @private
   * @memberOf Index
   */
  lunr.Index.prototype.idf = function (term) {
    var cacheKey = "@" + term;
    if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey];

    var documentFrequency = this.tokenStore.count(term),
        idf = 1;

    if (documentFrequency > 0) {
      idf = 1 + Math.log(this.documentStore.length / documentFrequency);
    }

    return this._idfCache[cacheKey] = idf;
  };

  /**
   * Searches the index using the passed query.
   *
   * Queries should be a string, multiple words are allowed and will lead to an
   * AND based query, e.g. `idx.search('foo bar')` will run a search for
   * documents containing both 'foo' and 'bar'.
   *
   * All query tokens are passed through the same pipeline that document tokens
   * are passed through, so any language processing involved will be run on every
   * query term.
   *
   * Each query term is expanded, so that the term 'he' might be expanded to
   * 'hello' and 'help' if those terms were already included in the index.
   *
   * Matching documents are returned as an array of objects, each object contains
   * the matching document ref, as set for this index, and the similarity score
   * for this document against the query.
   *
   * @param {String} query The query to search the index with.
   * @returns {Object}
   * @see Index.prototype.idf
   * @see Index.prototype.documentVector
   * @memberOf Index
   */
  lunr.Index.prototype.search = function (query) {
    var queryTokens = this.pipeline.run(this.tokenizerFn(query)),
        queryVector = new lunr.Vector(),
        documentSets = [],
        fieldBoosts = this._fields.reduce(function (memo, f) {
      return memo + f.boost;
    }, 0);

    var hasSomeToken = queryTokens.some(function (token) {
      return this.tokenStore.has(token);
    }, this);

    if (!hasSomeToken) return [];

    queryTokens.forEach(function (token, i, tokens) {
      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
          self = this;

      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
        var pos = self.corpusTokens.indexOf(key),
            idf = self.idf(key),
            similarityBoost = 1,
            set = new lunr.SortedSet();

        // if the expanded key is not an exact match to the token then
        // penalise the score for this key by how different the key is
        // to the token.
        if (key !== token) {
          var diff = Math.max(3, key.length - token.length);
          similarityBoost = 1 / Math.log(diff);
        }

        // calculate the query tf-idf score for this token
        // applying an similarityBoost to ensure exact matches
        // these rank higher than expanded terms
        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost);

        // add all the documents that have this key into a set
        // ensuring that the type of key is preserved
        var matchingDocuments = self.tokenStore.get(key),
            refs = Object.keys(matchingDocuments),
            refsLen = refs.length;

        for (var i = 0; i < refsLen; i++) {
          set.add(matchingDocuments[refs[i]].ref);
        }

        return memo.union(set);
      }, new lunr.SortedSet());

      documentSets.push(set);
    }, this);

    var documentSet = documentSets.reduce(function (memo, set) {
      return memo.intersect(set);
    });

    return documentSet.map(function (ref) {
      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) };
    }, this).sort(function (a, b) {
      return b.score - a.score;
    });
  };

  /**
   * Generates a vector containing all the tokens in the document matching the
   * passed documentRef.
   *
   * The vector contains the tf-idf score for each token contained in the
   * document with the passed documentRef.  The vector will contain an element
   * for every token in the indexes corpus, if the document does not contain that
   * token the element will be 0.
   *
   * @param {Object} documentRef The ref to find the document with.
   * @returns {lunr.Vector}
   * @private
   * @memberOf Index
   */
  lunr.Index.prototype.documentVector = function (documentRef) {
    var documentTokens = this.documentStore.get(documentRef),
        documentTokensLength = documentTokens.length,
        documentVector = new lunr.Vector();

    for (var i = 0; i < documentTokensLength; i++) {
      var token = documentTokens.elements[i],
          tf = this.tokenStore.get(token)[documentRef].tf,
          idf = this.idf(token);

      documentVector.insert(this.corpusTokens.indexOf(token), tf * idf);
    };

    return documentVector;
  };

  /**
   * Returns a representation of the index ready for serialisation.
   *
   * @returns {Object}
   * @memberOf Index
   */
  lunr.Index.prototype.toJSON = function () {
    return {
      version: lunr.version,
      fields: this._fields,
      ref: this._ref,
      tokenizer: this.tokenizerFn.label,
      documentStore: this.documentStore.toJSON(),
      tokenStore: this.tokenStore.toJSON(),
      corpusTokens: this.corpusTokens.toJSON(),
      pipeline: this.pipeline.toJSON()
    };
  };

  /**
   * Applies a plugin to the current index.
   *
   * A plugin is a function that is called with the index as its context.
   * Plugins can be used to customise or extend the behaviour the index
   * in some way. A plugin is just a function, that encapsulated the custom
   * behaviour that should be applied to the index.
   *
   * The plugin function will be called with the index as its argument, additional
   * arguments can also be passed when calling use. The function will be called
   * with the index as its context.
   *
   * Example:
   *
   *     var myPlugin = function (idx, arg1, arg2) {
   *       // `this` is the index to be extended
   *       // apply any extensions etc here.
   *     }
   *
   *     var idx = lunr(function () {
   *       this.use(myPlugin, 'arg1', 'arg2')
   *     })
   *
   * @param {Function} plugin The plugin to apply.
   * @memberOf Index
   */
  lunr.Index.prototype.use = function (plugin) {
    var args = Array.prototype.slice.call(arguments, 1);
    args.unshift(this);
    plugin.apply(this, args);
  };
  /*!
   * lunr.Store
   * Copyright (C) 2017 Oliver Nightingale
   */

  /**
   * lunr.Store is a simple key-value store used for storing sets of tokens for
   * documents stored in index.
   *
   * @constructor
   * @module
   */
  lunr.Store = function () {
    this.store = {};
    this.length = 0;
  };

  /**
   * Loads a previously serialised store
   *
   * @param {Object} serialisedData The serialised store to load.
   * @returns {lunr.Store}
   * @memberOf Store
   */
  lunr.Store.load = function (serialisedData) {
    var store = new this();

    store.length = serialisedData.length;
    store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
      memo[key] = lunr.SortedSet.load(serialisedData.store[key]);
      return memo;
    }, {});

    return store;
  };

  /**
   * Stores the given tokens in the store against the given id.
   *
   * @param {Object} id The key used to store the tokens against.
   * @param {Object} tokens The tokens to store against the key.
   * @memberOf Store
   */
  lunr.Store.prototype.set = function (id, tokens) {
    if (!this.has(id)) this.length++;
    this.store[id] = tokens;
  };

  /**
   * Retrieves the tokens from the store for a given key.
   *
   * @param {Object} id The key to lookup and retrieve from the store.
   * @returns {Object}
   * @memberOf Store
   */
  lunr.Store.prototype.get = function (id) {
    return this.store[id];
  };

  /**
   * Checks whether the store contains a key.
   *
   * @param {Object} id The id to look up in the store.
   * @returns {Boolean}
   * @memberOf Store
   */
  lunr.Store.prototype.has = function (id) {
    return id in this.store;
  };

  /**
   * Removes the value for a key in the store.
   *
   * @param {Object} id The id to remove from the store.
   * @memberOf Store
   */
  lunr.Store.prototype.remove = function (id) {
    if (!this.has(id)) return;

    delete this.store[id];
    this.length--;
  };

  /**
   * Returns a representation of the store ready for serialisation.
   *
   * @returns {Object}
   * @memberOf Store
   */
  lunr.Store.prototype.toJSON = function () {
    return {
      store: this.store,
      length: this.length
    };
  };

  /*!
   * lunr.stemmer
   * Copyright (C) 2017 Oliver Nightingale
   * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
   */

  /**
   * lunr.stemmer is an english language stemmer, this is a JavaScript
   * implementation of the PorterStemmer taken from http://tartarus.org/~martin
   *
   * @module
   * @param {String} str The string to stem
   * @returns {String}
   * @see lunr.Pipeline
   */
  lunr.stemmer = function () {
    var step2list = {
      "ational": "ate",
      "tional": "tion",
      "enci": "ence",
      "anci": "ance",
      "izer": "ize",
      "bli": "ble",
      "alli": "al",
      "entli": "ent",
      "eli": "e",
      "ousli": "ous",
      "ization": "ize",
      "ation": "ate",
      "ator": "ate",
      "alism": "al",
      "iveness": "ive",
      "fulness": "ful",
      "ousness": "ous",
      "aliti": "al",
      "iviti": "ive",
      "biliti": "ble",
      "logi": "log"
    },
        step3list = {
      "icate": "ic",
      "ative": "",
      "alize": "al",
      "iciti": "ic",
      "ical": "ic",
      "ful": "",
      "ness": ""
    },
        c = "[^aeiou]",
        // consonant
    v = "[aeiouy]",
        // vowel
    C = c + "[^aeiouy]*",
        // consonant sequence
    V = v + "[aeiou]*",
        // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,
        // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",
        // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,
        // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v; // vowel in stem

    var re_mgr0 = new RegExp(mgr0);
    var re_mgr1 = new RegExp(mgr1);
    var re_meq1 = new RegExp(meq1);
    var re_s_v = new RegExp(s_v);

    var re_1a = /^(.+?)(ss|i)es$/;
    var re2_1a = /^(.+?)([^s])s$/;
    var re_1b = /^(.+?)eed$/;
    var re2_1b = /^(.+?)(ed|ing)$/;
    var re_1b_2 = /.$/;
    var re2_1b_2 = /(at|bl|iz)$/;
    var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
    var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");

    var re_1c = /^(.+?[^aeiou])y$/;
    var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;

    var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

    var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    var re2_4 = /^(.+?)(s|t)(ion)$/;

    var re_5 = /^(.+?)e$/;
    var re_5_1 = /ll$/;
    var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");

    var porterStemmer = function porterStemmer(w) {
      var stem, suffix, firstch, re, re2, re3, re4;

      if (w.length < 3) {
        return w;
      }

      firstch = w.substr(0, 1);
      if (firstch == "y") {
        w = firstch.toUpperCase() + w.substr(1);
      }

      // Step 1a
      re = re_1a;
      re2 = re2_1a;

      if (re.test(w)) {
        w = w.replace(re, "$1$2");
      } else if (re2.test(w)) {
        w = w.replace(re2, "$1$2");
      }

      // Step 1b
      re = re_1b;
      re2 = re2_1b;
      if (re.test(w)) {
        var fp = re.exec(w);
        re = re_mgr0;
        if (re.test(fp[1])) {
          re = re_1b_2;
          w = w.replace(re, "");
        }
      } else if (re2.test(w)) {
        var fp = re2.exec(w);
        stem = fp[1];
        re2 = re_s_v;
        if (re2.test(stem)) {
          w = stem;
          re2 = re2_1b_2;
          re3 = re3_1b_2;
          re4 = re4_1b_2;
          if (re2.test(w)) {
            w = w + "e";
          } else if (re3.test(w)) {
            re = re_1b_2;w = w.replace(re, "");
          } else if (re4.test(w)) {
            w = w + "e";
          }
        }
      }

      // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
      re = re_1c;
      if (re.test(w)) {
        var fp = re.exec(w);
        stem = fp[1];
        w = stem + "i";
      }

      // Step 2
      re = re_2;
      if (re.test(w)) {
        var fp = re.exec(w);
        stem = fp[1];
        suffix = fp[2];
        re = re_mgr0;
        if (re.test(stem)) {
          w = stem + step2list[suffix];
        }
      }

      // Step 3
      re = re_3;
      if (re.test(w)) {
        var fp = re.exec(w);
        stem = fp[1];
        suffix = fp[2];
        re = re_mgr0;
        if (re.test(stem)) {
          w = stem + step3list[suffix];
        }
      }

      // Step 4
      re = re_4;
      re2 = re2_4;
      if (re.test(w)) {
        var fp = re.exec(w);
        stem = fp[1];
        re = re_mgr1;
        if (re.test(stem)) {
          w = stem;
        }
      } else if (re2.test(w)) {
        var fp = re2.exec(w);
        stem = fp[1] + fp[2];
        re2 = re_mgr1;
        if (re2.test(stem)) {
          w = stem;
        }
      }

      // Step 5
      re = re_5;
      if (re.test(w)) {
        var fp = re.exec(w);
        stem = fp[1];
        re = re_mgr1;
        re2 = re_meq1;
        re3 = re3_5;
        if (re.test(stem) || re2.test(stem) && !re3.test(stem)) {
          w = stem;
        }
      }

      re = re_5_1;
      re2 = re_mgr1;
      if (re.test(w) && re2.test(w)) {
        re = re_1b_2;
        w = w.replace(re, "");
      }

      // and turn initial Y back to y

      if (firstch == "y") {
        w = firstch.toLowerCase() + w.substr(1);
      }

      return w;
    };

    return porterStemmer;
  }();

  lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer');
  /*!
   * lunr.stopWordFilter
   * Copyright (C) 2017 Oliver Nightingale
   */

  /**
   * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
   * list of stop words.
   *
   * The built in lunr.stopWordFilter is built using this generator and can be used
   * to generate custom stopWordFilters for applications or non English languages.
   *
   * @module
   * @param {Array} token The token to pass through the filter
   * @returns {Function}
   * @see lunr.Pipeline
   * @see lunr.stopWordFilter
   */
  lunr.generateStopWordFilter = function (stopWords) {
    var words = stopWords.reduce(function (memo, stopWord) {
      memo[stopWord] = stopWord;
      return memo;
    }, {});

    return function (token) {
      if (token && words[token] !== token) return token;
    };
  };

  /**
   * lunr.stopWordFilter is an English language stop word list filter, any words
   * contained in the list will not be passed through the filter.
   *
   * This is intended to be used in the Pipeline. If the token does not pass the
   * filter then undefined will be returned.
   *
   * @module
   * @param {String} token The token to pass through the filter
   * @returns {String}
   * @see lunr.Pipeline
   */
  lunr.stopWordFilter = lunr.generateStopWordFilter(['a', 'able', 'about', 'across', 'after', 'all', 'almost', 'also', 'am', 'among', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'but', 'by', 'can', 'cannot', 'could', 'dear', 'did', 'do', 'does', 'either', 'else', 'ever', 'every', 'for', 'from', 'get', 'got', 'had', 'has', 'have', 'he', 'her', 'hers', 'him', 'his', 'how', 'however', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'just', 'least', 'let', 'like', 'likely', 'may', 'me', 'might', 'most', 'must', 'my', 'neither', 'no', 'nor', 'not', 'of', 'off', 'often', 'on', 'only', 'or', 'other', 'our', 'own', 'rather', 'said', 'say', 'says', 'she', 'should', 'since', 'so', 'some', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'tis', 'to', 'too', 'twas', 'us', 'wants', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'yet', 'you', 'your']);

  lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter');
  /*!
   * lunr.trimmer
   * Copyright (C) 2017 Oliver Nightingale
   */

  /**
   * lunr.trimmer is a pipeline function for trimming non word
   * characters from the begining and end of tokens before they
   * enter the index.
   *
   * This implementation may not work correctly for non latin
   * characters and should either be removed or adapted for use
   * with languages with non-latin characters.
   *
   * @module
   * @param {String} token The token to pass through the filter
   * @returns {String}
   * @see lunr.Pipeline
   */
  lunr.trimmer = function (token) {
    return token.replace(/^\W+/, '').replace(/\W+$/, '');
  };

  lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer');
  /*!
   * lunr.stemmer
   * Copyright (C) 2017 Oliver Nightingale
   * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
   */

  /**
   * lunr.TokenStore is used for efficient storing and lookup of the reverse
   * index of token to document ref.
   *
   * @constructor
   */
  lunr.TokenStore = function () {
    this.root = { docs: {} };
    this.length = 0;
  };

  /**
   * Loads a previously serialised token store
   *
   * @param {Object} serialisedData The serialised token store to load.
   * @returns {lunr.TokenStore}
   * @memberOf TokenStore
   */
  lunr.TokenStore.load = function (serialisedData) {
    var store = new this();

    store.root = serialisedData.root;
    store.length = serialisedData.length;

    return store;
  };

  /**
   * Adds a new token doc pair to the store.
   *
   * By default this function starts at the root of the current store, however
   * it can start at any node of any token store if required.
   *
   * @param {String} token The token to store the doc under
   * @param {Object} doc The doc to store against the token
   * @param {Object} root An optional node at which to start looking for the
   * correct place to enter the doc, by default the root of this lunr.TokenStore
   * is used.
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.add = function (token, doc, root) {
    var root = root || this.root,
        key = token.charAt(0),
        rest = token.slice(1);

    if (!(key in root)) root[key] = { docs: {} };

    if (rest.length === 0) {
      root[key].docs[doc.ref] = doc;
      this.length += 1;
      return;
    } else {
      return this.add(rest, doc, root[key]);
    }
  };

  /**
   * Checks whether this key is contained within this lunr.TokenStore.
   *
   * By default this function starts at the root of the current store, however
   * it can start at any node of any token store if required.
   *
   * @param {String} token The token to check for
   * @param {Object} root An optional node at which to start
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.has = function (token) {
    if (!token) return false;

    var node = this.root;

    for (var i = 0; i < token.length; i++) {
      if (!node[token.charAt(i)]) return false;

      node = node[token.charAt(i)];
    }

    return true;
  };

  /**
   * Retrieve a node from the token store for a given token.
   *
   * By default this function starts at the root of the current store, however
   * it can start at any node of any token store if required.
   *
   * @param {String} token The token to get the node for.
   * @param {Object} root An optional node at which to start.
   * @returns {Object}
   * @see TokenStore.prototype.get
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.getNode = function (token) {
    if (!token) return {};

    var node = this.root;

    for (var i = 0; i < token.length; i++) {
      if (!node[token.charAt(i)]) return {};

      node = node[token.charAt(i)];
    }

    return node;
  };

  /**
   * Retrieve the documents for a node for the given token.
   *
   * By default this function starts at the root of the current store, however
   * it can start at any node of any token store if required.
   *
   * @param {String} token The token to get the documents for.
   * @param {Object} root An optional node at which to start.
   * @returns {Object}
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.get = function (token, root) {
    return this.getNode(token, root).docs || {};
  };

  lunr.TokenStore.prototype.count = function (token, root) {
    return Object.keys(this.get(token, root)).length;
  };

  /**
   * Remove the document identified by ref from the token in the store.
   *
   * By default this function starts at the root of the current store, however
   * it can start at any node of any token store if required.
   *
   * @param {String} token The token to get the documents for.
   * @param {String} ref The ref of the document to remove from this token.
   * @param {Object} root An optional node at which to start.
   * @returns {Object}
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.remove = function (token, ref) {
    if (!token) return;
    var node = this.root;

    for (var i = 0; i < token.length; i++) {
      if (!(token.charAt(i) in node)) return;
      node = node[token.charAt(i)];
    }

    delete node.docs[ref];
  };

  /**
   * Find all the possible suffixes of the passed token using tokens
   * currently in the store.
   *
   * @param {String} token The token to expand.
   * @returns {Array}
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.expand = function (token, memo) {
    var root = this.getNode(token),
        docs = root.docs || {},
        memo = memo || [];

    if (Object.keys(docs).length) memo.push(token);

    Object.keys(root).forEach(function (key) {
      if (key === 'docs') return;

      memo.concat(this.expand(token + key, memo));
    }, this);

    return memo;
  };

  /**
   * Returns a representation of the token store ready for serialisation.
   *
   * @returns {Object}
   * @memberOf TokenStore
   */
  lunr.TokenStore.prototype.toJSON = function () {
    return {
      root: this.root,
      length: this.length
    };
  }

  /**
   * export the module via AMD, CommonJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  ;(function (root, factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory();
    } else {
      // Browser globals (root is window)
      root.lunr = factory();
    }
  })(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr;
  });
})();

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @constant {string}
 */
var ATTRIBUTE_CONTENT_TYPE_ID = 'data-id';

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
 * Propagates row selection trough the event system
 *
 * @param {Eventful} eventful
 * @param {HTMLElement} element
 *
 * @function
 * @return {HTMLElement}
 */
var relayClickEventAs = (0, _functional.curry)(function (type, eventful, element) {
  element.addEventListener('click', function (event) {
    eventful.fire(type, {
      element: element,
      id: (0, _elements.getAttribute)(ATTRIBUTE_CONTENT_TYPE_ID, element)
    });
  });

  return element;
});

/**
 * @class
 * @mixes Eventful
 */

var ContentTypeDetailView = function () {
  function ContentTypeDetailView(state) {
    _classCallCheck(this, ContentTypeDetailView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // back button
    var backButtonElement = document.createElement('div');
    backButtonElement.className = 'back-button icon-arrow-thick';
    relayClickEventAs('close', this, backButtonElement);

    // image
    this.image = document.createElement('img');
    this.image.className = 'img-responsive';

    var imageWrapperElement = document.createElement('div');
    imageWrapperElement.className = 'image-wrapper';
    imageWrapperElement.appendChild(this.image);

    // title
    this.title = document.createElement('h2');
    this.title.className = 'title';

    // description
    this.description = document.createElement('p');
    this.description.className = 'description';

    // demo button
    this.demoButton = document.createElement('a');
    this.demoButton.className = 'button';
    this.demoButton.innerHTML = 'Content Demo';
    this.demoButton.setAttribute('target', '_blank');
    _hide(this.demoButton);

    var textDetails = document.createElement('div');
    textDetails.className = 'text-details';
    textDetails.appendChild(this.title);
    textDetails.appendChild(this.description);
    textDetails.appendChild(this.demoButton);

    var detailsElement = document.createElement('div');
    detailsElement.className = 'container';
    detailsElement.appendChild(imageWrapperElement);
    detailsElement.appendChild(textDetails);

    // use button
    this.useButton = document.createElement('span');
    this.useButton.className = 'button button-primary';
    this.useButton.innerHTML = 'Use';
    _hide(this.useButton);
    relayClickEventAs('select', this, this.useButton);

    // install button
    this.installButton = document.createElement('span');
    this.installButton.className = 'button button-inverse-primary';
    this.installButton.innerHTML = 'Install';
    _hide(this.installButton);
    relayClickEventAs('install', this, this.installButton);

    var buttonBar = document.createElement('div');
    buttonBar.className = 'button-bar';
    buttonBar.appendChild(this.useButton);
    buttonBar.appendChild(this.installButton);

    // licence panel
    var licencePanel = this.createPanel('The Licence Info', 'ipsum lorum', 'licence-panel');
    var pluginsPanel = this.createPanel('Available plugins', 'ipsum lorum', 'plugins-panel');
    var publisherPanel = this.createPanel('Publisher Info', 'ipsum lorum', 'publisher-panel');

    // panel group
    var panelGroupElement = document.createElement('div');
    panelGroupElement.className = 'panel-group';
    panelGroupElement.appendChild(licencePanel);
    panelGroupElement.appendChild(pluginsPanel);
    panelGroupElement.appendChild(publisherPanel);

    // add root element
    this.rootElement = document.createElement('div');
    this.rootElement.className = 'content-type-detail';
    this.rootElement.setAttribute('aria-hidden', 'true');
    this.rootElement.appendChild(backButtonElement);
    this.rootElement.appendChild(detailsElement);
    this.rootElement.appendChild(buttonBar);
    this.rootElement.appendChild(panelGroupElement);
  }

  /**
   * Creates a panel
   *
   * @param {string} title
   * @param {string} body
   * @param {string} bodyId
   *
   * @return {HTMLElement}
   */


  _createClass(ContentTypeDetailView, [{
    key: "createPanel",
    value: function createPanel(title, body, bodyId) {
      var headerEl = document.createElement('div');
      headerEl.className = 'panel-header';
      headerEl.setAttribute('aria-expanded', 'false');
      headerEl.setAttribute('aria-controls', bodyId);
      headerEl.innerHTML = title;

      var bodyInnerEl = document.createElement('div');
      bodyInnerEl.className = 'panel-body-inner';
      bodyInnerEl.innerHTML = body;

      var bodyEl = document.createElement('div');
      bodyEl.className = 'panel-body';
      bodyEl.id = bodyId;
      bodyEl.setAttribute('aria-hidden', 'true');
      bodyEl.appendChild(bodyInnerEl);

      var panelEl = document.createElement('div');
      panelEl.className = 'panel';
      panelEl.appendChild(headerEl);
      panelEl.appendChild(bodyEl);

      (0, _panel2.default)(panelEl);

      return panelEl;
    }

    /**
     * Sets the image
     *
     * @param {string} src
     */

  }, {
    key: "setImage",
    value: function setImage(src) {
      this.image.setAttribute('src', src);
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
      this.title.innerHTML = title;
    }

    /**
     * Sets the long description
     *
     * @param {string} text
     */

  }, {
    key: "setDescription",
    value: function setDescription(text) {
      this.description.innerHTML = text;
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

var _hubServices = __webpack_require__(4);

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
        return console.debug('TODO, gui updates');
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
      this.view.setIsInstalled(!!contentType.installed);
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

var _functional = __webpack_require__(1);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @constant {string}
 */
var ATTRIBUTE_CONTENT_TYPE_ID = 'data-id';

/**
 * @function
 */
var _hide = (0, _elements.setAttribute)('aria-hidden', 'true');

/**
 * @function
 */
var _show = (0, _elements.setAttribute)('aria-hidden', 'false');

/**
 * Propagates row selection trough the event system
 *
 * @param {Eventful} eventful
 * @param {HTMLElement} element
 *
 * @function
 * @return {HTMLElement}
 */
var relayClickEventAs = (0, _functional.curry)(function (type, eventful, element) {
  element.addEventListener('click', function (event) {
    eventful.fire(type, {
      element: element,
      id: (0, _elements.getAttribute)(ATTRIBUTE_CONTENT_TYPE_ID, element)
    }, false);

    event.preventDefault();
  });

  return element;
});

/**
 * @class
 * @mixes Eventful
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
     *
     * @param {ContentType[]} contentTypes
     */

  }, {
    key: "updateList",
    value: function updateList(contentTypes) {
      var _this = this;

      if (this.rootElement) {
        while (this.rootElement.firstChild) {
          this.rootElement.removeChild(this.rootElement.firstChild);
        }
      }

      this.renderContentTypeList(contentTypes).forEach(function (contentType) {
        return _this.rootElement.appendChild(contentType);
      });
    }

    /**
     * Applies create rows, and add to the list
     *
     * @param {ContentType[]} contentTypes
     *
     * @return {HTMLElement[]}
     */

  }, {
    key: "renderContentTypeList",
    value: function renderContentTypeList(contentTypes) {
      var _this2 = this;

      return contentTypes.map(function (contentType) {
        return _this2.createContentTypeRow(contentType);
      }).map(relayClickEventAs('row-selected', this));
    }

    /**
     * Takes a Content Type configuration and creates a row dom
     *
     * @param {ContentType} contentType
     *
     * @return {HTMLElement}
     */

  }, {
    key: "createContentTypeRow",
    value: function createContentTypeRow(contentType) {
      // image
      var image = document.createElement('img');
      image.setAttribute('src', contentType.icon);

      // title
      var title = document.createElement('div');
      title.className = 'content-type-list-title';
      title.innerHTML = contentType.title;

      // description
      var description = document.createElement('div');
      description.className = 'content-type-list-description';
      description.innerHTML = contentType.summary;

      // list item
      var row = document.createElement('li');
      row.id = "content-type-" + contentType.machineName;
      row.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, contentType.machineName);
      row.appendChild(image);
      row.appendChild(this.createButtonElement(contentType));
      row.appendChild(title);
      row.appendChild(description);

      return row;
    }

    /**
     *
     * @param {ContentType} contentType
     */

  }, {
    key: "createButtonElement",
    value: function createButtonElement(contentType) {
      var button = document.createElement('span');

      if (contentType.installed) {
        button.className = "button button-primary";
        button.innerHTML = "Use";
        button.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, contentType.machineName);
        relayClickEventAs('select', this, button);
      } else {
        button.className = "button button-inverse-primary";
        button.innerHTML = "install";
        // no functionality, uses click event on row
      }

      return button;
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
 * @class
 * @mixes Eventful
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

  _createClass(ContentTypeList, [{
    key: 'hide',
    value: function hide() {
      this.view.hide();
    }
  }, {
    key: 'show',
    value: function show() {
      this.view.show();
    }

    /**
     *
     * @param {ContentType[]} contentTypes
     */

  }, {
    key: 'update',
    value: function update(contentTypes) {
      this.view.updateList(contentTypes);
    }
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

var _eventful = __webpack_require__(0);

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
    _classCallCheck(this, ContentBrowserView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // create elements
    var menu = this.createMenuElement();
    var inputGroup = this.createInputGroupElement();

    // menu group
    var menuGroup = document.createElement('div');
    menuGroup.className = 'menu-group';
    menuGroup.appendChild(menu);
    menuGroup.appendChild(inputGroup);

    // root element
    this.rootElement = document.createElement('div');
    this.rootElement.appendChild(menuGroup);
  }

  /**
   * Adds a menu item
   *
   * @param {string} text
   *
   * @return {HTMLElement}
   */


  _createClass(ContentBrowserView, [{
    key: 'addMenuItem',
    value: function addMenuItem(text) {
      var _this = this;

      var element = document.createElement('li');
      element.setAttribute('role', 'menuitem');
      element.innerHTML = text;

      element.addEventListener('click', function (event) {
        _this.fire('menu-selected', {
          element: event.target
        });
      });

      // sets first to be selected
      if (this.menuBarElement.childElementCount < 1) {
        element.setAttribute('aria-selected', 'true');
      }

      // add to menu bar
      this.menuBarElement.appendChild(element);

      return element;
    }

    /**
     * Creates the menu bar element
     *
     * @return {Element}
     */

  }, {
    key: 'createMenuElement',
    value: function createMenuElement() {
      this.menuBarElement = document.createElement('ul');
      this.menuBarElement.setAttribute('role', 'menubar');
      this.menuBarElement.className = 'h5p-menu';

      var navElement = document.createElement('nav');
      navElement.appendChild(this.menuBarElement);

      var title = document.createElement('div');
      title.className = "menu-title";
      title.innerHTML = "Browse content types";

      var menu = document.createElement('div');
      menu.className = "menu";
      menu.appendChild(title);
      menu.appendChild(navElement);

      return menu;
    }

    /**
     * Creates the input group used for search
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'createInputGroupElement',
    value: function createInputGroupElement() {
      var _this2 = this;

      // input field
      var inputField = document.createElement('input');
      inputField.className = 'hub-search shadow';
      inputField.setAttribute('type', 'text');
      inputField.setAttribute('placeholder', "Search for Content Types");
      inputField.addEventListener('keyup', function (event) {
        _this2.fire('search', {
          element: event.target,
          query: event.target.value
        });
      });

      // input button
      var inputButton = document.createElement('div');
      inputButton.className = 'input-button icon-search';

      // input group
      var inputGroup = document.createElement('div');
      inputGroup.className = 'input-group rounded shadow';
      inputGroup.appendChild(inputField);
      inputGroup.appendChild(inputButton);

      // wrapper
      var inputGroupWrapper = document.createElement('div');
      inputGroupWrapper.className = 'input-group-wrapper rounded';
      inputGroupWrapper.appendChild(inputGroup);

      return inputGroupWrapper;
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

var _eventful = __webpack_require__(0);

var _errors = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ContentTypeSection
 * @mixes Eventful
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

    // add view
    this.view = new _contentTypeSectionView2.default(state);

    // controller
    this.searchService = new _searchService2.default({ apiRootUrl: state.apiRootUrl });
    this.contentTypeList = new _contentTypeList2.default();
    this.contentTypeDetail = new _contentTypeDetail2.default({ apiRootUrl: state.apiRootUrl });

    // add menu items
    ['My Content Types', 'Newest', 'Most Popular', 'Recommended'].forEach(function (menuText) {
      return _this.view.addMenuItem(menuText);
    });

    // set sub view (TODO find other way)
    this.view.getElement().appendChild(this.contentTypeList.getElement());
    this.view.getElement().appendChild(this.contentTypeDetail.getElement());

    // propagate events
    this.propagate(['select'], this.contentTypeList);
    this.propagate(['select'], this.contentTypeDetail);

    // register listeners
    this.view.on('search', this.search, this);
    this.view.on('menu-selected', this.applySearchFilter, this);
    this.contentTypeList.on('row-selected', this.showDetailView, this);
    this.contentTypeDetail.on('close', this.closeDetailView, this);

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

      var query = _ref.query;

      this.searchService.search(query).then(function (contentTypes) {
        return _this3.contentTypeList.update(contentTypes);
      });
    }

    /**
     * Should apply a search filter
     */

  }, {
    key: "applySearchFilter",
    value: function applySearchFilter() {
      console.debug('ContentTypeSection: menu was clicked!', event);
    }

    /**
     * Shows detail view
     *
     * @param {string} id
     */

  }, {
    key: "showDetailView",
    value: function showDetailView(_ref2) {
      var id = _ref2.id;

      this.contentTypeList.hide();
      this.contentTypeDetail.loadById(id);
      this.contentTypeDetail.show();
    }

    /**
     * Close detail view
     */

  }, {
    key: "closeDetailView",
    value: function closeDetailView() {
      this.contentTypeDetail.hide();
      this.contentTypeList.show();
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

var _panel = __webpack_require__(5);

var _panel2 = _interopRequireDefault(_panel);

var _tabPanel = __webpack_require__(8);

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _elements = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @const
 * @type {string}
 */
var ATTRIBUTE_ARIA_EXPANDED = "aria-expanded";

/**
 * @type {function}
 */
var isExpanded = (0, _elements.attributeEquals)(ATTRIBUTE_ARIA_EXPANDED, 'true');

/**
 * @class
 */

var HubView = function () {
  /**
   * @param {HubState} state
   */
  function HubView(state) {
    _classCallCheck(this, HubView);

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
          sectionId = _ref$sectionId === undefined ? 'create-content' : _ref$sectionId,
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
      this.rootElement = document.createElement('div');
      this.rootElement.className += "h5p-hub h5p-section-" + sectionId + " panel";
      this.rootElement.appendChild(this.title);
      this.rootElement.appendChild(this.body);

      (0, _panel2.default)(this.rootElement);
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
      tab.setAttribute('role', 'tab');
      tab.innerHTML = title;

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
  }, {
    key: "initTabPanel",
    value: function initTabPanel() {
      (0, _tabPanel2.default)(this.tabContainerElement);
    }

    /**
     * Sets the section
     *
     * @param {string} sectionId
     */

  }, {
    key: "setSection",
    value: function setSection(sectionId) {
      this.rootElement.className = "h5p-hub h5p-section-" + sectionId + " panel";
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

var _functional = __webpack_require__(1);

var _hubServices = __webpack_require__(4);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _lunr = __webpack_require__(9);

var _lunr2 = _interopRequireDefault(_lunr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var findContentTypeByMachineName = (0, _functional.curry)(function (contentTypes, machineName) {
  return contentTypes.filter(function (contentType) {
    return contentType.machineName === machineName;
  })[0];
});

/**
 * Adds a content type to the search index
 *
 * @param  {lunr.Index} index
 * @param  {ContentType} contentType
 *
 * @return {ContentType}
 */
var addToIndex = (0, _functional.curry)(function (index, contentType) {
  index.add({
    title: contentType.title,
    summary: contentType.summary,
    id: contentType.machineName
  });

  return contentType;
});

/**
 * @class
 */

var SearchService = function () {
  /**
   * @param {object} state
   * @param {string} state.apiRootUrl
   */
  function SearchService(state) {
    _classCallCheck(this, SearchService);

    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

    // Set up lunr index
    this.index = (0, _lunr2.default)(function () {
      this.field('title', { boost: 100 });
      this.field('summary');
      this.field('description');
      this.field('keywords');
      this.ref('id');
    });

    this.contentTypes = this.services.contentTypes().then((0, _functional.map)(addToIndex(this.index))); // Add content types to search index
  }

  /**
   * Performs a search
   *
   * @param {String} query
   *
   * @return {Promise<ContentType[]>}
   */


  _createClass(SearchService, [{
    key: "search",
    value: function search(query) {
      var _this = this;

      // Display all content types by default
      if (query === '') {
        return this.contentTypes;
      }

      return this.contentTypes.then(function (contentTypes) {
        return _this.index.search(query).map(function (result) {
          return result.ref;
        }).map(findContentTypeByMachineName(contentTypes));
      });
    }
  }]);

  return SearchService;
}();

exports.default = SearchService;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 */
var UploadSection = function () {
  function UploadSection() {
    _classCallCheck(this, UploadSection);
  }

  _createClass(UploadSection, [{
    key: "getElement",
    value: function getElement() {
      var element = document.createElement('div');
      element.innerHTML = "TODO Upload";
      return element;
    }
  }]);

  return UploadSection;
}();

exports.default = UploadSection;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(7);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(6).default;
H5P.HubClient.renderErrorMessage = __webpack_require__(3).default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjRlOWMyOGUyODczZWM3NTI1N2MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9mdW5jdGlvbmFsLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sdW5yL2x1bnIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sIm5hbWVzIjpbIkV2ZW50ZnVsIiwibGlzdGVuZXJzIiwib24iLCJ0eXBlIiwibGlzdGVuZXIiLCJzY29wZSIsInRyaWdnZXIiLCJwdXNoIiwiZmlyZSIsImV2ZW50IiwidHJpZ2dlcnMiLCJldmVyeSIsImNhbGwiLCJwcm9wYWdhdGUiLCJ0eXBlcyIsImV2ZW50ZnVsIiwic2VsZiIsImZvckVhY2giLCJjdXJyeSIsImZuIiwiYXJpdHkiLCJsZW5ndGgiLCJmMSIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJmMiIsImFyZ3MyIiwiY29uY2F0IiwiY29tcG9zZSIsImZucyIsInJlZHVjZSIsImYiLCJnIiwiYXJyIiwibWFwIiwiZmlsdGVyIiwic29tZSIsImNvbnRhaW5zIiwidmFsdWUiLCJpbmRleE9mIiwid2l0aG91dCIsInZhbHVlcyIsImludmVyc2VCb29sZWFuU3RyaW5nIiwiYm9vbCIsInRvU3RyaW5nIiwiZ2V0QXR0cmlidXRlIiwibmFtZSIsImVsIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiYXR0cmlidXRlRXF1YWxzIiwidG9nZ2xlQXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJwYXJlbnQiLCJjaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW5kZXJFcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwiY29uc29sZSIsImxvZyIsImNsb3NlQnV0dG9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibWVzc2FnZUNvbnRlbnQiLCJjb250ZW50IiwibWVzc2FnZVdyYXBwZXIiLCJkaXNtaXNzaWJsZSIsIkh1YlNlcnZpY2VzIiwiYXBpUm9vdFVybCIsIndpbmRvdyIsImNhY2hlZENvbnRlbnRUeXBlcyIsImZldGNoIiwibWV0aG9kIiwiY3JlZGVudGlhbHMiLCJ0aGVuIiwicmVzdWx0IiwianNvbiIsImlzVmFsaWQiLCJsaWJyYXJpZXMiLCJyZXNwb25zZSIsIm1lc3NhZ2VDb2RlIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJtYWNoaW5lTmFtZSIsImNvbnRlbnRUeXBlcyIsImNvbnRlbnRUeXBlIiwiaWQiLCJib2R5IiwiaW5pdCIsImlzRXhwYW5kZWQiLCJoaWRlIiwic2hvdyIsInRvZ2dsZUJvZHlWaXNpYmlsaXR5IiwiYm9keUVsZW1lbnQiLCJzdHlsZSIsImhlaWdodCIsInNjcm9sbEhlaWdodCIsIm9uQXJpYUV4cGFuZGVkQ2hhbmdlIiwidGFyZ2V0IiwiZWxlbWVudCIsInRpdGxlRWwiLCJib2R5SWQiLCJib2R5RWwiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiYXR0cmlidXRlRmlsdGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIkh1YiIsInN0YXRlIiwiY29udGVudFR5cGVTZWN0aW9uIiwidXBsb2FkU2VjdGlvbiIsInZpZXciLCJzZXJ2aWNlcyIsInNldFBhbmVsVGl0bGUiLCJjbG9zZVBhbmVsIiwiaW5pdFRhYlBhbmVsIiwiZ2V0Q29udGVudFR5cGUiLCJ0aXRsZSIsInNldFRpdGxlIiwidGFiQ29uZmlncyIsImdldEVsZW1lbnQiLCJzZWxlY3RlZCIsImFkZFRhYiIsInRhYkNvbmZpZyIsImhpZGVBbGwiLCJ1blNlbGVjdEFsbCIsInRhYnMiLCJ0YWJQYW5lbHMiLCJ0YWIiLCJ0YWJQYW5lbElkIiwibHVuciIsImNvbmZpZyIsImlkeCIsIkluZGV4IiwicGlwZWxpbmUiLCJhZGQiLCJ0cmltbWVyIiwic3RvcFdvcmRGaWx0ZXIiLCJzdGVtbWVyIiwidmVyc2lvbiIsInV0aWxzIiwid2FybiIsImdsb2JhbCIsImFzU3RyaW5nIiwib2JqIiwiRXZlbnRFbWl0dGVyIiwiZXZlbnRzIiwiYWRkTGlzdGVuZXIiLCJwb3AiLCJuYW1lcyIsIlR5cGVFcnJvciIsImhhc0hhbmRsZXIiLCJyZW1vdmVMaXN0ZW5lciIsImZuSW5kZXgiLCJzcGxpY2UiLCJlbWl0IiwidW5kZWZpbmVkIiwidG9rZW5pemVyIiwiaXNBcnJheSIsInQiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJzcGxpdCIsInNlcGFyYXRvciIsImxvYWQiLCJsYWJlbCIsInJlZ2lzdGVyZWRGdW5jdGlvbnMiLCJFcnJvciIsInJlZ2lzdGVyRnVuY3Rpb24iLCJQaXBlbGluZSIsIl9zdGFjayIsIndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZCIsImlzUmVnaXN0ZXJlZCIsInNlcmlhbGlzZWQiLCJmbk5hbWUiLCJhZnRlciIsImV4aXN0aW5nRm4iLCJuZXdGbiIsInBvcyIsImJlZm9yZSIsInJlbW92ZSIsInJ1biIsInRva2VucyIsIm91dCIsInRva2VuTGVuZ3RoIiwic3RhY2tMZW5ndGgiLCJpIiwidG9rZW4iLCJqIiwicmVzZXQiLCJ0b0pTT04iLCJWZWN0b3IiLCJfbWFnbml0dWRlIiwibGlzdCIsIk5vZGUiLCJ2YWwiLCJuZXh0IiwiaW5zZXJ0IiwicHJldiIsIm1hZ25pdHVkZSIsIm5vZGUiLCJzdW1PZlNxdWFyZXMiLCJNYXRoIiwic3FydCIsImRvdCIsIm90aGVyVmVjdG9yIiwib3RoZXJOb2RlIiwiZG90UHJvZHVjdCIsInNpbWlsYXJpdHkiLCJTb3J0ZWRTZXQiLCJlbGVtZW50cyIsInNlcmlhbGlzZWREYXRhIiwic2V0IiwibG9jYXRpb25Gb3IiLCJ0b0FycmF5IiwiY3R4IiwiZWxlbSIsInN0YXJ0IiwiZW5kIiwic2VjdGlvbkxlbmd0aCIsInBpdm90IiwiZmxvb3IiLCJwaXZvdEVsZW0iLCJpbnRlcnNlY3QiLCJvdGhlclNldCIsImludGVyc2VjdFNldCIsImFfbGVuIiwiYl9sZW4iLCJhIiwiYiIsImNsb25lIiwidW5pb24iLCJsb25nU2V0Iiwic2hvcnRTZXQiLCJ1bmlvblNldCIsInNob3J0U2V0RWxlbWVudHMiLCJfZmllbGRzIiwiX3JlZiIsImRvY3VtZW50U3RvcmUiLCJTdG9yZSIsInRva2VuU3RvcmUiLCJUb2tlblN0b3JlIiwiY29ycHVzVG9rZW5zIiwiZXZlbnRFbWl0dGVyIiwidG9rZW5pemVyRm4iLCJfaWRmQ2FjaGUiLCJiaW5kIiwib2ZmIiwiZmllbGRzIiwicmVmIiwiZmllbGQiLCJmaWVsZE5hbWUiLCJvcHRzIiwiYm9vc3QiLCJyZWZOYW1lIiwiZG9jIiwiZW1pdEV2ZW50IiwiZG9jVG9rZW5zIiwiYWxsRG9jdW1lbnRUb2tlbnMiLCJkb2NSZWYiLCJmaWVsZFRva2VucyIsInRmIiwiZmllbGRMZW5ndGgiLCJ0b2tlbkNvdW50IiwiayIsImhhcyIsImdldCIsInVwZGF0ZSIsImlkZiIsInRlcm0iLCJjYWNoZUtleSIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiZG9jdW1lbnRGcmVxdWVuY3kiLCJjb3VudCIsInNlYXJjaCIsInF1ZXJ5IiwicXVlcnlUb2tlbnMiLCJxdWVyeVZlY3RvciIsImRvY3VtZW50U2V0cyIsImZpZWxkQm9vc3RzIiwibWVtbyIsImhhc1NvbWVUb2tlbiIsImV4cGFuZCIsImtleSIsInNpbWlsYXJpdHlCb29zdCIsImRpZmYiLCJtYXgiLCJtYXRjaGluZ0RvY3VtZW50cyIsInJlZnMiLCJrZXlzIiwicmVmc0xlbiIsImRvY3VtZW50U2V0Iiwic2NvcmUiLCJkb2N1bWVudFZlY3RvciIsInNvcnQiLCJkb2N1bWVudFJlZiIsImRvY3VtZW50VG9rZW5zIiwiZG9jdW1lbnRUb2tlbnNMZW5ndGgiLCJ1c2UiLCJwbHVnaW4iLCJ1bnNoaWZ0Iiwic3RvcmUiLCJzdGVwMmxpc3QiLCJzdGVwM2xpc3QiLCJjIiwidiIsIkMiLCJWIiwibWdyMCIsIm1lcTEiLCJtZ3IxIiwic192IiwicmVfbWdyMCIsIlJlZ0V4cCIsInJlX21ncjEiLCJyZV9tZXExIiwicmVfc192IiwicmVfMWEiLCJyZTJfMWEiLCJyZV8xYiIsInJlMl8xYiIsInJlXzFiXzIiLCJyZTJfMWJfMiIsInJlM18xYl8yIiwicmU0XzFiXzIiLCJyZV8xYyIsInJlXzIiLCJyZV8zIiwicmVfNCIsInJlMl80IiwicmVfNSIsInJlXzVfMSIsInJlM181IiwicG9ydGVyU3RlbW1lciIsInciLCJzdGVtIiwic3VmZml4IiwiZmlyc3RjaCIsInJlIiwicmUyIiwicmUzIiwicmU0Iiwic3Vic3RyIiwidG9VcHBlckNhc2UiLCJ0ZXN0IiwicmVwbGFjZSIsImZwIiwiZXhlYyIsImdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIiLCJzdG9wV29yZHMiLCJ3b3JkcyIsInN0b3BXb3JkIiwicm9vdCIsImRvY3MiLCJjaGFyQXQiLCJyZXN0IiwiZ2V0Tm9kZSIsImZhY3RvcnkiLCJkZWZpbmUiLCJleHBvcnRzIiwibW9kdWxlIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsInRvZ2dsZVZpc2liaWxpdHkiLCJ2aXNpYmxlIiwiaXNFbXB0eSIsInRleHQiLCJyZWxheUNsaWNrRXZlbnRBcyIsIkNvbnRlbnRUeXBlRGV0YWlsVmlldyIsImJhY2tCdXR0b25FbGVtZW50IiwiaW1hZ2UiLCJpbWFnZVdyYXBwZXJFbGVtZW50IiwiZGVzY3JpcHRpb24iLCJkZW1vQnV0dG9uIiwidGV4dERldGFpbHMiLCJkZXRhaWxzRWxlbWVudCIsInVzZUJ1dHRvbiIsImluc3RhbGxCdXR0b24iLCJidXR0b25CYXIiLCJsaWNlbmNlUGFuZWwiLCJjcmVhdGVQYW5lbCIsInBsdWdpbnNQYW5lbCIsInB1Ymxpc2hlclBhbmVsIiwicGFuZWxHcm91cEVsZW1lbnQiLCJyb290RWxlbWVudCIsImhlYWRlckVsIiwiYm9keUlubmVyRWwiLCJwYW5lbEVsIiwic3JjIiwidXJsIiwiaW5zdGFsbGVkIiwiQ29udGVudFR5cGVEZXRhaWwiLCJpbnN0YWxsIiwiaW5zdGFsbENvbnRlbnRUeXBlIiwiZGVidWciLCJzZXRJZCIsInNldERlc2NyaXB0aW9uIiwic2V0SW1hZ2UiLCJpY29uIiwic2V0RXhhbXBsZSIsImV4YW1wbGUiLCJzZXRJc0luc3RhbGxlZCIsInByZXZlbnREZWZhdWx0IiwiQ29udGVudFR5cGVMaXN0VmlldyIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsInJlbmRlckNvbnRlbnRUeXBlTGlzdCIsImNyZWF0ZUNvbnRlbnRUeXBlUm93Iiwic3VtbWFyeSIsInJvdyIsImNyZWF0ZUJ1dHRvbkVsZW1lbnQiLCJidXR0b24iLCJDb250ZW50VHlwZUxpc3QiLCJ1cGRhdGVMaXN0IiwiQ29udGVudEJyb3dzZXJWaWV3IiwibWVudSIsImNyZWF0ZU1lbnVFbGVtZW50IiwiaW5wdXRHcm91cCIsImNyZWF0ZUlucHV0R3JvdXBFbGVtZW50IiwibWVudUdyb3VwIiwibWVudUJhckVsZW1lbnQiLCJjaGlsZEVsZW1lbnRDb3VudCIsIm5hdkVsZW1lbnQiLCJpbnB1dEZpZWxkIiwiaW5wdXRCdXR0b24iLCJpbnB1dEdyb3VwV3JhcHBlciIsIkNvbnRlbnRUeXBlU2VjdGlvbiIsInNlYXJjaFNlcnZpY2UiLCJjb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZURldGFpbCIsImFkZE1lbnVJdGVtIiwibWVudVRleHQiLCJhcHBseVNlYXJjaEZpbHRlciIsInNob3dEZXRhaWxWaWV3IiwiY2xvc2VEZXRhaWxWaWV3IiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsImNhdGNoIiwiZXJyb3IiLCJsb2FkQnlJZCIsIkFUVFJJQlVURV9BUklBX0VYUEFOREVEIiwiSHViVmlldyIsInJlbmRlclRhYlBhbmVsIiwicmVuZGVyUGFuZWwiLCJzZWN0aW9uSWQiLCJleHBhbmRlZCIsInRhYkNvbnRhaW5lckVsZW1lbnQiLCJ0YWJsaXN0IiwidGFiTGlzdFdyYXBwZXIiLCJ0YWJJZCIsInRhYlBhbmVsIiwiZmluZENvbnRlbnRUeXBlQnlNYWNoaW5lTmFtZSIsImFkZFRvSW5kZXgiLCJpbmRleCIsIlNlYXJjaFNlcnZpY2UiLCJVcGxvYWRTZWN0aW9uIiwicmVxdWlyZSIsIkg1UCIsIkh1YkNsaWVudCIsImRlZmF1bHQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBOzs7QUFHTyxJQUFNQSw4QkFBVyxTQUFYQSxRQUFXO0FBQUEsU0FBTztBQUM3QkMsZUFBVyxFQURrQjs7QUFHN0I7Ozs7Ozs7OztBQVNBQyxRQUFJLFlBQVNDLElBQVQsRUFBZUMsUUFBZixFQUF5QkMsS0FBekIsRUFBZ0M7QUFDbEM7Ozs7O0FBS0EsVUFBTUMsVUFBVTtBQUNkLG9CQUFZRixRQURFO0FBRWQsaUJBQVNDO0FBRkssT0FBaEI7O0FBS0EsV0FBS0osU0FBTCxDQUFlRSxJQUFmLElBQXVCLEtBQUtGLFNBQUwsQ0FBZUUsSUFBZixLQUF3QixFQUEvQztBQUNBLFdBQUtGLFNBQUwsQ0FBZUUsSUFBZixFQUFxQkksSUFBckIsQ0FBMEJELE9BQTFCO0FBQ0QsS0F6QjRCOztBQTJCN0I7Ozs7Ozs7OztBQVNBRSxVQUFNLGNBQVNMLElBQVQsRUFB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LENBQWhCO0FBQ0F3QyxjQUFRdEMsU0FBUixHQUFvQixhQUFwQjtBQUNBLGFBQU9zQyxPQUFQO0FBQ0Q7Ozs7OztrQkFMa0JzVyxhOzs7Ozs7Ozs7QUNIckIsbUJBQUFDLENBQVEsQ0FBUjs7QUFFQTtBQUNBQyxNQUFNQSxPQUFPLEVBQWI7QUFDQUEsSUFBSUMsU0FBSixHQUFnQixtQkFBQUYsQ0FBUSxDQUFSLEVBQTBCRyxPQUExQztBQUNBRixJQUFJQyxTQUFKLENBQWN2WixrQkFBZCxHQUFtQyxtQkFBQXFaLENBQVEsQ0FBUixFQUFtQ0csT0FBdEUsQyIsImZpbGUiOiJoNXAtaHViLWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2NGU5YzI4ZTI4NzNlYzc1MjU3YyIsIi8qKlxyXG4gKiBAbWl4aW5cclxuICovXHJcbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XHJcbiAgbGlzdGVuZXJzOiB7fSxcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuIHRvIGV2ZW50XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IFtzY29wZV1cclxuICAgKlxyXG4gICAqIEBmdW5jdGlvblxyXG4gICAqL1xyXG4gIG9uOiBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgc2NvcGUpIHtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxyXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gbGlzdGVuZXJcclxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzY29wZVxyXG4gICAgICovXHJcbiAgICBjb25zdCB0cmlnZ2VyID0ge1xyXG4gICAgICAnbGlzdGVuZXInOiBsaXN0ZW5lcixcclxuICAgICAgJ3Njb3BlJzogc2NvcGVcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcclxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2godHJpZ2dlcik7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogRmlyZSBldmVudC4gSWYgYW55IG9mIHRoZSBsaXN0ZW5lcnMgcmV0dXJucyBmYWxzZSwgcmV0dXJuIGZhbHNlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZXZlbnRdXHJcbiAgICpcclxuICAgKiBAZnVuY3Rpb25cclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XHJcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xyXG5cclxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XHJcbiAgICAgIHJldHVybiB0cmlnZ2VyLmxpc3RlbmVyLmNhbGwodHJpZ2dlci5zY29wZSB8fCB0aGlzLCBldmVudCkgIT09IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IHR5cGVzXHJcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcclxuICAgKi9cclxuICBwcm9wYWdhdGU6IGZ1bmN0aW9uKHR5cGVzLCBldmVudGZ1bCkge1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgdHlwZXMuZm9yRWFjaCh0eXBlID0+IGV2ZW50ZnVsLm9uKHR5cGUsIGV2ZW50ID0+IHNlbGYuZmlyZSh0eXBlLCBldmVudCkpKTtcclxuICB9XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsIi8qKlxyXG4gKiBSZXR1cm5zIGEgY3VycmllZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjdXJyeSA9IGZ1bmN0aW9uKGZuKSB7XHJcbiAgY29uc3QgYXJpdHkgPSBmbi5sZW5ndGg7XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiBmMSgpIHtcclxuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG4gICAgaWYgKGFyZ3MubGVuZ3RoID49IGFyaXR5KSB7XHJcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmdzKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gZjIoKSB7XHJcbiAgICAgICAgY29uc3QgYXJnczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG4gICAgICAgIHJldHVybiBmMS5hcHBseShudWxsLCBhcmdzLmNvbmNhdChhcmdzMikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wb3NlIGZ1bmN0aW9ucyB0b2dldGhlciwgZXhlY3V0aW5nIGZyb20gcmlnaHQgdG8gbGVmdFxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uLi4ufSBmbnNcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY29tcG9zZSA9ICguLi5mbnMpID0+IGZucy5yZWR1Y2UoKGYsIGcpID0+ICguLi5hcmdzKSA9PiBmKGcoLi4uYXJncykpKTtcclxuXHJcbi8qKlxyXG4gKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBlbGVtZW50IGluIGFuIGFycmF5XHJcbiAqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBmb3JFYWNoID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcclxuICBhcnIuZm9yRWFjaChmbik7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIE1hcHMgYSBmdW5jdGlvbiB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWFwID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcclxuICByZXR1cm4gYXJyLm1hcChmbik7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEFwcGxpZXMgYSBmaWx0ZXIgdG8gYW4gYXJyYXlcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XHJcbiAgcmV0dXJuIGFyci5maWx0ZXIoZm4pO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBBcHBsaWVzIGEgc29tZSB0byBhbiBhcnJheVxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc29tZSA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XHJcbiAgcmV0dXJuIGFyci5zb21lKGZuKTtcclxufSk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgdmFsdWVcclxuICpcclxuICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSBjdXJyeShmdW5jdGlvbiAodmFsdWUsIGFycikge1xyXG4gIHJldHVybiBhcnIuaW5kZXhPZih2YWx1ZSkgIT0gLTE7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgc3VwcGxpZWQgdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlc1xyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgd2l0aG91dCA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZXMsIGFycikge1xyXG4gIHJldHVybiBmaWx0ZXIodmFsdWUgPT4gIWNvbnRhaW5zKHZhbHVlLCB2YWx1ZXMpLCBhcnIpXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFRha2VzIGEgc3RyaW5nIHRoYXQgaXMgZWl0aGVyICd0cnVlJyBvciAnZmFsc2UnIGFuZCByZXR1cm5zIHRoZSBvcHBvc2l0ZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYm9vbFxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBpbnZlcnNlQm9vbGVhblN0cmluZyA9IGZ1bmN0aW9uIChib29sKSB7XHJcbiAgcmV0dXJuIChib29sICE9PSAndHJ1ZScpLnRvU3RyaW5nKCk7XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJpbXBvcnQge2N1cnJ5LCBpbnZlcnNlQm9vbGVhblN0cmluZ30gZnJvbSAnLi9mdW5jdGlvbmFsJ1xyXG5cclxuLyoqXHJcbiAqIEdldCBhbiBhdHRyaWJ1dGUgdmFsdWUgZnJvbSBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0QXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIGVsKSB7XHJcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShuYW1lKTtcclxufSk7XHJcblxyXG4vKipcclxuICogU2V0IGFuIGF0dHJpYnV0ZSBvbiBhIGh0bWwgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2V0QXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBlbCkge1xyXG4gIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhdHRyaWJ1dGUgZnJvbSBodG1sIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlQXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIGVsKSB7XHJcbiAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaGFzQXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIGVsKSB7XHJcbiAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZShuYW1lKTtcclxufSk7XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlIHRoYXQgZXF1YWxzXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVFcXVhbHMgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGVsKSB7XHJcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWU7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZXMgYW4gYXR0cmlidXRlIGJldHdlZW4gJ3RydWUnIGFuZCAnZmFsc2UnO1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCB0b2dnbGVBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcclxuICBjb25zdCB2YWx1ZSA9IGdldEF0dHJpYnV0ZShuYW1lLCBlbCk7XHJcbiAgc2V0QXR0cmlidXRlKG5hbWUsIGludmVyc2VCb29sZWFuU3RyaW5nKHZhbHVlKSwgZWwpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgYXBwZW5kQ2hpbGQoKSBtZXRob2QgYWRkcyBhIG5vZGUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdCBvZiBjaGlsZHJlbiBvZiBhIHNwZWNpZmllZCBwYXJlbnQgbm9kZS5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNoaWxkXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBjb25zdCBhcHBlbmRDaGlsZCA9IGN1cnJ5KGZ1bmN0aW9uIChwYXJlbnQsIGNoaWxkKSB7XHJcbiAgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyBhIGRlc2NlbmRhbnQgb2YgdGhlIGVsZW1lbnQgb24gd2hpY2ggaXQgaXMgaW52b2tlZFxyXG4gKiB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBzZWxlY3RvcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvciA9IGN1cnJ5KGZ1bmN0aW9uIChzZWxlY3RvciwgZWwpIHtcclxuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBub24tbGl2ZSBOb2RlTGlzdCBvZiBhbGwgZWxlbWVudHMgZGVzY2VuZGVkIGZyb20gdGhlIGVsZW1lbnQgb24gd2hpY2ggaXRcclxuICogaXMgaW52b2tlZCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBDU1Mgc2VsZWN0b3JzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm4ge05vZGVMaXN0fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3JBbGwgPSBjdXJyeShmdW5jdGlvbiAoc2VsZWN0b3IsIGVsKSB7XHJcbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCIvKipcclxuICogQHBhcmFtICB7c3RyaW5nfSAgIGNvbmZpZy50eXBlICAgICAgICAgdHlwZSBvZiB0aGUgbWVzc2FnZTogaW5mbywgc3VjY2VzcywgZXJyb3JcclxuICogQHBhcmFtICB7Ym9vbGVhbn0gIGNvbmZpZy5kaXNtaXNzaWJsZSAgd2hldGhlciB0aGUgbWVzc2FnZSBjYW4gYmUgZGlzbWlzc2VkXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcuY29udGVudCAgICAgIG1lc3NhZ2UgY29udGVudCB1c3VhbGx5IGEgJ2gzJyBhbmQgYSAncCdcclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9IGRpdiBjb250YWluaW5nIHRoZSBtZXNzYWdlIGVsZW1lbnRcclxuICovXHJcblxyXG4vL1RPRE8gaGFuZGxlIHN0cmluZ3MsIGh0bWwsIGJhZGx5IGZvcm1lZCBvYmplY3RcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyRXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XHJcbiAgY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyYjeDI3MTUnO1xyXG5cclxuICBjb25zdCBtZXNzYWdlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIG1lc3NhZ2VDb250ZW50LmNsYXNzTmFtZSA9ICdtZXNzYWdlLWNvbnRlbnQnO1xyXG4gIG1lc3NhZ2VDb250ZW50LmlubmVySFRNTCA9IG1lc3NhZ2UuY29udGVudDtcclxuXHJcbiAgY29uc3QgbWVzc2FnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBtZXNzYWdlV3JhcHBlci5jbGFzc05hbWUgPSAnbWVzc2FnZScgKyAnICcgKyBgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XHJcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xyXG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VDb250ZW50KTtcclxuICBjb25zb2xlLmxvZyhtZXNzYWdlV3JhcHBlcik7XHJcbiAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCIvKipcclxuICogQHR5cGVkZWYge29iamVjdH0gQ29udGVudFR5cGVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlkXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aXRsZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3VtbWFyeVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZGVzY3JpcHRpb25cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGljb25cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNyZWF0ZWRcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHVwZGF0ZVxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlY29tbWVuZGVkXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0aW1lc0Rvd25sb2FkZWRcclxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gc2NyZWVuc2hvdHNcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV4YW1wbGVcclxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0ga2V5d29yZHNcclxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gY2F0ZWdvcmllc1xyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGljZW5zZVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlNlcnZpY2VzIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBpUm9vdFVybFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHsgYXBpUm9vdFVybCB9KSB7XHJcbiAgICB0aGlzLmFwaVJvb3RVcmwgPSBhcGlSb290VXJsO1xyXG5cclxuICAgIGlmKCF3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzKXtcclxuICAgICAgd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50LXR5cGUtY2FjaGVgLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxyXG4gICAgICAudGhlbih0aGlzLmlzVmFsaWQpXHJcbiAgICAgIC50aGVuKGpzb24gPT4ganNvbi5saWJyYXJpZXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IHJlc3BvbnNlXHJcbiAgICogQHJldHVybiB7UHJvbWlzZTxDb250ZW50VHlwZVtdIHwgRXJyb3JNZXNzYWdlPn1cclxuICAgKi9cclxuICBpc1ZhbGlkKHJlc3BvbnNlKSB7XHJcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlW10+fVxyXG4gICAqL1xyXG4gIGNvbnRlbnRUeXBlcygpIHtcclxuICAgIHJldHVybiB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XHJcbiAgICovXHJcbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcclxuICAgIHJldHVybiB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzLnRoZW4oY29udGVudFR5cGVzID0+IHtcclxuICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50X3R5cGVfY2FjaGUvJHtpZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcclxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpOyovXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnN0YWxscyBhIGNvbnRlbnQgdHlwZSBvbiB0aGUgc2VydmVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cclxuICAgKi9cclxuICBpbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9bGlicmFyeS1pbnN0YWxsP2lkPSR7aWR9YCwge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcclxuICAgICAgYm9keTogJydcclxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItc2VydmljZXMuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZSwgYXR0cmlidXRlRXF1YWxzLCB0b2dnbGVBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcclxuaW1wb3J0IHtjdXJyeSwgZm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3QgaXNFeHBhbmRlZCA9IGF0dHJpYnV0ZUVxdWFscyhcImFyaWEtZXhwYW5kZWRcIiwgJ3RydWUnKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcclxuXHJcbi8qKlxyXG4gKiBUb2dnbGVzIHRoZSBib2R5IHZpc2liaWxpdHlcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYm9keUVsZW1lbnRcclxuICogQHBhcmFtIHtib29sZWFufSBpc0V4cGFuZGVkXHJcbiAqL1xyXG5jb25zdCB0b2dnbGVCb2R5VmlzaWJpbGl0eSA9IGZ1bmN0aW9uKGJvZHlFbGVtZW50LCBpc0V4cGFuZGVkKSB7XHJcbiAgaWYoaXNFeHBhbmRlZCkge1xyXG4gICAgc2hvdyhib2R5RWxlbWVudCk7XHJcbiAgICBib2R5RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtib2R5RWxlbWVudC5zY3JvbGxIZWlnaHR9cHhgO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIGhpZGUoYm9keUVsZW1lbnQpO1xyXG4gICAgYm9keUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXMgY2hhbmdlcyB0byBhcmlhLWV4cGFuZGVkXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJvZHlFbGVtZW50XHJcbiAqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IGV2ZW50XHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuY29uc3Qgb25BcmlhRXhwYW5kZWRDaGFuZ2UgPSBjdXJyeShmdW5jdGlvbihib2R5RWxlbWVudCwgZXZlbnQpIHtcclxuICB0b2dnbGVCb2R5VmlzaWJpbGl0eShib2R5RWxlbWVudCwgaXNFeHBhbmRlZChldmVudC50YXJnZXQpKTtcclxufSk7XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XHJcbiAgY29uc3QgdGl0bGVFbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtZXhwYW5kZWRdJyk7XHJcbiAgY29uc3QgYm9keUlkID0gdGl0bGVFbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcclxuICBjb25zdCBib2R5RWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvZHlJZH1gKTtcclxuXHJcbiAgaWYodGl0bGVFbCkge1xyXG4gICAgLy8gc2V0IG9ic2VydmVyIG9uIHRpdGxlIGZvciBhcmlhLWV4cGFuZGVkXHJcbiAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmb3JFYWNoKG9uQXJpYUV4cGFuZGVkQ2hhbmdlKGJvZHlFbCkpKTtcclxuXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRpdGxlRWwsIHtcclxuICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXHJcbiAgICAgIGF0dHJpYnV0ZUZpbHRlcjogW1wiYXJpYS1leHBhbmRlZFwiXVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2V0IGNsaWNrIGxpc3RlbmVyIHRoYXQgdG9nZ2xlcyBhcmlhLWV4cGFuZGVkXHJcbiAgICB0aXRsZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgdG9nZ2xlQXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBldmVudC50YXJnZXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdG9nZ2xlQm9keVZpc2liaWxpdHkoYm9keUVsLCBpc0V4cGFuZGVkKHRpdGxlRWwpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBlbGVtZW50O1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvcGFuZWwuanMiLCJpbXBvcnQgSHViVmlldyBmcm9tICcuL2h1Yi12aWV3JztcclxuaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvbiBmcm9tICcuL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uJztcclxuaW1wb3J0IFVwbG9hZFNlY3Rpb24gZnJvbSAnLi91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbic7XHJcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tICcuL2h1Yi1zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi91dGlscy9lcnJvcnMnO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEh1YlN0YXRlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aXRsZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbklkXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZXhwYW5kZWRcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFwaVJvb3RVcmxcclxuICovXHJcbi8qKlxyXG4gKiBAY2xhc3NcclxuICogQG1peGVzIEV2ZW50ZnVsXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWIge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgLy8gY29udHJvbGxlcnNcclxuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uID0gbmV3IENvbnRlbnRUeXBlU2VjdGlvbihzdGF0ZSk7XHJcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSk7XHJcblxyXG4gICAgLy8gdmlld3NcclxuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcclxuXHJcbiAgICAvLyBzZXJ2aWNlc1xyXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XHJcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHByb3BhZ2F0ZSBjb250cm9sbGVyIGV2ZW50c1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAnZXJyb3InXSwgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24pO1xyXG5cclxuICAgIC8vIGhhbmRsZSBldmVudHNcclxuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMuc2V0UGFuZWxUaXRsZSwgdGhpcyk7XHJcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnZpZXcuY2xvc2VQYW5lbCwgdGhpcy52aWV3KTtcclxuICAgIFxyXG4gICAgdGhpcy5pbml0VGFiUGFuZWwoKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGNvbnRlbnQgdHlwZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxyXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cclxuICAgKi9cclxuICBnZXRDb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUobWFjaGluZU5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdGl0bGUgb2YgdGhlIHBhbmVsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBzZXRQYW5lbFRpdGxlKHtpZH0pwqB7XHJcbiAgICB0aGlzLmdldENvbnRlbnRUeXBlKGlkKS50aGVuKCh7dGl0bGV9KSA9PiB0aGlzLnZpZXcuc2V0VGl0bGUodGl0bGUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYXRlcyB0aGUgdGFiIHBhbmVsXHJcbiAgICovXHJcbiAgaW5pdFRhYlBhbmVsKCkge1xyXG4gICAgY29uc3QgdGFiQ29uZmlncyA9IFt7XHJcbiAgICAgIHRpdGxlOiAnQ3JlYXRlIENvbnRlbnQnLFxyXG4gICAgICBpZDogJ2NyZWF0ZS1jb250ZW50JyxcclxuICAgICAgY29udGVudDogdGhpcy5jb250ZW50VHlwZVNlY3Rpb24uZ2V0RWxlbWVudCgpLFxyXG4gICAgICBzZWxlY3RlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdVcGxvYWQnLFxyXG4gICAgICBpZDogJ3VwbG9hZC1zZWN0aW9uJyxcclxuICAgICAgY29udGVudDogdGhpcy51cGxvYWRTZWN0aW9uLmdldEVsZW1lbnQoKVxyXG4gICAgfV07XHJcblxyXG4gICAgdGFiQ29uZmlncy5mb3JFYWNoKHRhYkNvbmZpZyA9PiB0aGlzLnZpZXcuYWRkVGFiKHRhYkNvbmZpZykpO1xyXG4gICAgdGhpcy52aWV3LmluaXRUYWJQYW5lbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IGluIHRoZSB2aWV3XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBnZXRFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3R5bGVzL21haW4uc2Nzc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge3NldEF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xyXG5pbXBvcnQge2ZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKSk7XHJcblxyXG4vKipcclxuICogSW5pdGlhdGVzIGEgdGFiIHBhbmVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xyXG4gIGNvbnN0IHRhYnMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFiXCJdJyk7XHJcbiAgY29uc3QgdGFiUGFuZWxzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYnBhbmVsXCJdJyk7XHJcblxyXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xyXG4gICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICB1blNlbGVjdEFsbCh0YWJzKTtcclxuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XHJcblxyXG4gICAgICBoaWRlQWxsKHRhYlBhbmVscyk7XHJcblxyXG4gICAgICBsZXQgdGFiUGFuZWxJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcclxuICAgICAgc2hvdyhlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhYlBhbmVsSWR9YCkpO1xyXG4gICAgfSk7XHJcbiAgfSlcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3RhYi1wYW5lbC5qcyIsIi8qKlxuICogbHVuciAtIGh0dHA6Ly9sdW5yanMuY29tIC0gQSBiaXQgbGlrZSBTb2xyLCBidXQgbXVjaCBzbWFsbGVyIGFuZCBub3QgYXMgYnJpZ2h0IC0gMS4wLjBcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbjsoZnVuY3Rpb24oKXtcblxuLyoqXG4gKiBDb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgaW5zdGFudGlhdGluZyBhIG5ldyBsdW5yIGluZGV4IGFuZCBjb25maWd1cmluZyBpdFxuICogd2l0aCB0aGUgZGVmYXVsdCBwaXBlbGluZSBmdW5jdGlvbnMgYW5kIHRoZSBwYXNzZWQgY29uZmlnIGZ1bmN0aW9uLlxuICpcbiAqIFdoZW4gdXNpbmcgdGhpcyBjb252ZW5pZW5jZSBmdW5jdGlvbiBhIG5ldyBpbmRleCB3aWxsIGJlIGNyZWF0ZWQgd2l0aCB0aGVcbiAqIGZvbGxvd2luZyBmdW5jdGlvbnMgYWxyZWFkeSBpbiB0aGUgcGlwZWxpbmU6XG4gKlxuICogbHVuci5TdG9wV29yZEZpbHRlciAtIGZpbHRlcnMgb3V0IGFueSBzdG9wIHdvcmRzIGJlZm9yZSB0aGV5IGVudGVyIHRoZVxuICogaW5kZXhcbiAqXG4gKiBsdW5yLnN0ZW1tZXIgLSBzdGVtcyB0aGUgdG9rZW5zIGJlZm9yZSBlbnRlcmluZyB0aGUgaW5kZXguXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgdmFyIGlkeCA9IGx1bnIoZnVuY3Rpb24gKCkge1xuICogICAgICAgdGhpcy5maWVsZCgndGl0bGUnLCAxMClcbiAqICAgICAgIHRoaXMuZmllbGQoJ3RhZ3MnLCAxMDApXG4gKiAgICAgICB0aGlzLmZpZWxkKCdib2R5JylcbiAqICAgICAgIFxuICogICAgICAgdGhpcy5yZWYoJ2NpZCcpXG4gKiAgICAgICBcbiAqICAgICAgIHRoaXMucGlwZWxpbmUuYWRkKGZ1bmN0aW9uICgpIHtcbiAqICAgICAgICAgLy8gc29tZSBjdXN0b20gcGlwZWxpbmUgZnVuY3Rpb25cbiAqICAgICAgIH0pXG4gKiAgICAgICBcbiAqICAgICB9KVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpZyBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbmV3IGluc3RhbmNlXG4gKiBvZiB0aGUgbHVuci5JbmRleCBhcyBib3RoIGl0cyBjb250ZXh0IGFuZCBmaXJzdCBwYXJhbWV0ZXIuIEl0IGNhbiBiZSB1c2VkIHRvXG4gKiBjdXN0b21pemUgdGhlIGluc3RhbmNlIG9mIG5ldyBsdW5yLkluZGV4LlxuICogQG5hbWVzcGFjZVxuICogQG1vZHVsZVxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKlxuICovXG52YXIgbHVuciA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgdmFyIGlkeCA9IG5ldyBsdW5yLkluZGV4XG5cbiAgaWR4LnBpcGVsaW5lLmFkZChcbiAgICBsdW5yLnRyaW1tZXIsXG4gICAgbHVuci5zdG9wV29yZEZpbHRlcixcbiAgICBsdW5yLnN0ZW1tZXJcbiAgKVxuXG4gIGlmIChjb25maWcpIGNvbmZpZy5jYWxsKGlkeCwgaWR4KVxuXG4gIHJldHVybiBpZHhcbn1cblxubHVuci52ZXJzaW9uID0gXCIxLjAuMFwiXG4vKiFcbiAqIGx1bnIudXRpbHNcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIEEgbmFtZXNwYWNlIGNvbnRhaW5pbmcgdXRpbHMgZm9yIHRoZSByZXN0IG9mIHRoZSBsdW5yIGxpYnJhcnlcbiAqL1xubHVuci51dGlscyA9IHt9XG5cbi8qKlxuICogUHJpbnQgYSB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gYmUgcHJpbnRlZC5cbiAqIEBtZW1iZXJPZiBVdGlsc1xuICovXG5sdW5yLnV0aWxzLndhcm4gPSAoZnVuY3Rpb24gKGdsb2JhbCkge1xuICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICBpZiAoZ2xvYmFsLmNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSlcbiAgICB9XG4gIH1cbn0pKHRoaXMpXG5cbi8qKlxuICogQ29udmVydCBhbiBvYmplY3QgdG8gYSBzdHJpbmcuXG4gKlxuICogSW4gdGhlIGNhc2Ugb2YgYG51bGxgIGFuZCBgdW5kZWZpbmVkYCB0aGUgZnVuY3Rpb24gcmV0dXJuc1xuICogdGhlIGVtcHR5IHN0cmluZywgaW4gYWxsIG90aGVyIGNhc2VzIHRoZSByZXN1bHQgb2YgY2FsbGluZ1xuICogYHRvU3RyaW5nYCBvbiB0aGUgcGFzc2VkIG9iamVjdCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAcGFyYW0ge0FueX0gb2JqIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBhIHN0cmluZy5cbiAqIEByZXR1cm4ge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwYXNzZWQgb2JqZWN0LlxuICogQG1lbWJlck9mIFV0aWxzXG4gKi9cbmx1bnIudXRpbHMuYXNTdHJpbmcgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmIChvYmogPT09IHZvaWQgMCB8fCBvYmogPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmoudG9TdHJpbmcoKVxuICB9XG59XG4vKiFcbiAqIGx1bnIuRXZlbnRFbWl0dGVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLkV2ZW50RW1pdHRlciBpcyBhbiBldmVudCBlbWl0dGVyIGZvciBsdW5yLiBJdCBtYW5hZ2VzIGFkZGluZyBhbmQgcmVtb3ZpbmcgZXZlbnQgaGFuZGxlcnMgYW5kIHRyaWdnZXJpbmcgZXZlbnRzIGFuZCB0aGVpciBoYW5kbGVycy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZXZlbnRzID0ge31cbn1cblxuLyoqXG4gKiBCaW5kcyBhIGhhbmRsZXIgZnVuY3Rpb24gdG8gYSBzcGVjaWZpYyBldmVudChzKS5cbiAqXG4gKiBDYW4gYmluZCBhIHNpbmdsZSBmdW5jdGlvbiB0byBtYW55IGRpZmZlcmVudCBldmVudHMgaW4gb25lIGNhbGwuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFtldmVudE5hbWVdIFRoZSBuYW1lKHMpIG9mIGV2ZW50cyB0byBiaW5kIHRoaXMgZnVuY3Rpb24gdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIGFuIGV2ZW50IGlzIGZpcmVkLlxuICogQG1lbWJlck9mIEV2ZW50RW1pdHRlclxuICovXG5sdW5yLkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICAgIGZuID0gYXJncy5wb3AoKSxcbiAgICAgIG5hbWVzID0gYXJnc1xuXG4gIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvciAoXCJsYXN0IGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvblwiKVxuXG4gIG5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuaGFzSGFuZGxlcihuYW1lKSkgdGhpcy5ldmVudHNbbmFtZV0gPSBbXVxuICAgIHRoaXMuZXZlbnRzW25hbWVdLnB1c2goZm4pXG4gIH0sIHRoaXMpXG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGhhbmRsZXIgZnVuY3Rpb24gZnJvbSBhIHNwZWNpZmljIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSB0aGlzIGZ1bmN0aW9uIGZyb20uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcmVtb3ZlIGZyb20gYW4gZXZlbnQuXG4gKiBAbWVtYmVyT2YgRXZlbnRFbWl0dGVyXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICBpZiAoIXRoaXMuaGFzSGFuZGxlcihuYW1lKSkgcmV0dXJuXG5cbiAgdmFyIGZuSW5kZXggPSB0aGlzLmV2ZW50c1tuYW1lXS5pbmRleE9mKGZuKVxuICB0aGlzLmV2ZW50c1tuYW1lXS5zcGxpY2UoZm5JbmRleCwgMSlcblxuICBpZiAoIXRoaXMuZXZlbnRzW25hbWVdLmxlbmd0aCkgZGVsZXRlIHRoaXMuZXZlbnRzW25hbWVdXG59XG5cbi8qKlxuICogQ2FsbHMgYWxsIGZ1bmN0aW9ucyBib3VuZCB0byB0aGUgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQWRkaXRpb25hbCBkYXRhIGNhbiBiZSBwYXNzZWQgdG8gdGhlIGV2ZW50IGhhbmRsZXIgYXMgYXJndW1lbnRzIHRvIGBlbWl0YFxuICogYWZ0ZXIgdGhlIGV2ZW50IG5hbWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdC5cbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIXRoaXMuaGFzSGFuZGxlcihuYW1lKSkgcmV0dXJuXG5cbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cbiAgdGhpcy5ldmVudHNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpXG4gIH0pXG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgYSBoYW5kbGVyIGhhcyBldmVyIGJlZW4gc3RvcmVkIGFnYWluc3QgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gY2hlY2suXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlck9mIEV2ZW50RW1pdHRlclxuICovXG5sdW5yLkV2ZW50RW1pdHRlci5wcm90b3R5cGUuaGFzSGFuZGxlciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBuYW1lIGluIHRoaXMuZXZlbnRzXG59XG5cbi8qIVxuICogbHVuci50b2tlbml6ZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gZm9yIHNwbGl0dGluZyBhIHN0cmluZyBpbnRvIHRva2VucyByZWFkeSB0byBiZSBpbnNlcnRlZCBpbnRvXG4gKiB0aGUgc2VhcmNoIGluZGV4LiBVc2VzIGBsdW5yLnRva2VuaXplci5zZXBhcmF0b3JgIHRvIHNwbGl0IHN0cmluZ3MsIGNoYW5nZVxuICogdGhlIHZhbHVlIG9mIHRoaXMgcHJvcGVydHkgdG8gY2hhbmdlIGhvdyBzdHJpbmdzIGFyZSBzcGxpdCBpbnRvIHRva2Vucy5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gb2JqIFRoZSBzdHJpbmcgdG8gY29udmVydCBpbnRvIHRva2Vuc1xuICogQHNlZSBsdW5yLnRva2VuaXplci5zZXBhcmF0b3JcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xubHVuci50b2tlbml6ZXIgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCB8fCBvYmogPT0gbnVsbCB8fCBvYmogPT0gdW5kZWZpbmVkKSByZXR1cm4gW11cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkgcmV0dXJuIG9iai5tYXAoZnVuY3Rpb24gKHQpIHsgcmV0dXJuIGx1bnIudXRpbHMuYXNTdHJpbmcodCkudG9Mb3dlckNhc2UoKSB9KVxuXG4gIHJldHVybiBvYmoudG9TdHJpbmcoKS50cmltKCkudG9Mb3dlckNhc2UoKS5zcGxpdChsdW5yLnRva2VuaXplci5zZXBhcmF0b3IpXG59XG5cbi8qKlxuICogVGhlIHNwZXJhdG9yIHVzZWQgdG8gc3BsaXQgYSBzdHJpbmcgaW50byB0b2tlbnMuIE92ZXJyaWRlIHRoaXMgcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBiZWhhdmlvdXIgb2ZcbiAqIGBsdW5yLnRva2VuaXplcmAgYmVoYXZpb3VyIHdoZW4gdG9rZW5pemluZyBzdHJpbmdzLiBCeSBkZWZhdWx0IHRoaXMgc3BsaXRzIG9uIHdoaXRlc3BhY2UgYW5kIGh5cGhlbnMuXG4gKlxuICogQHN0YXRpY1xuICogQHNlZSBsdW5yLnRva2VuaXplclxuICovXG5sdW5yLnRva2VuaXplci5zZXBhcmF0b3IgPSAvW1xcc1xcLV0rL1xuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHRva2VuaXplci5cbiAqXG4gKiBBIHRva2VuaXplciBmdW5jdGlvbiB0byBiZSBsb2FkZWQgbXVzdCBhbHJlYWR5IGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLnRva2VuaXplci5cbiAqIElmIHRoZSBzZXJpYWxpc2VkIHRva2VuaXplciBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZCB0aGVuIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBUaGUgbGFiZWwgb2YgdGhlIHNlcmlhbGlzZWQgdG9rZW5pemVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICogQG1lbWJlck9mIHRva2VuaXplclxuICovXG5sdW5yLnRva2VuaXplci5sb2FkID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gIHZhciBmbiA9IHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9uc1tsYWJlbF1cblxuICBpZiAoIWZuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgbG9hZCB1bi1yZWdpc3RlcmVkIGZ1bmN0aW9uOiAnICsgbGFiZWwpXG4gIH1cblxuICByZXR1cm4gZm5cbn1cblxubHVuci50b2tlbml6ZXIubGFiZWwgPSAnZGVmYXVsdCdcblxubHVuci50b2tlbml6ZXIucmVnaXN0ZXJlZEZ1bmN0aW9ucyA9IHtcbiAgJ2RlZmF1bHQnOiBsdW5yLnRva2VuaXplclxufVxuXG4vKipcbiAqIFJlZ2lzdGVyIGEgdG9rZW5pemVyIGZ1bmN0aW9uLlxuICpcbiAqIEZ1bmN0aW9ucyB0aGF0IGFyZSB1c2VkIGFzIHRva2VuaXplcnMgc2hvdWxkIGJlIHJlZ2lzdGVyZWQgaWYgdGhleSBhcmUgdG8gYmUgdXNlZCB3aXRoIGEgc2VyaWFsaXNlZCBpbmRleC5cbiAqXG4gKiBSZWdpc3RlcmluZyBhIGZ1bmN0aW9uIGRvZXMgbm90IGFkZCBpdCB0byBhbiBpbmRleCwgZnVuY3Rpb25zIG11c3Qgc3RpbGwgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc3BlY2lmaWMgaW5kZXggZm9yIHRoZW0gdG8gYmUgdXNlZCB3aGVuIGluZGV4aW5nIGFuZCBzZWFyY2hpbmcgZG9jdW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byByZWdpc3Rlci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBUaGUgbGFiZWwgdG8gcmVnaXN0ZXIgdGhpcyBmdW5jdGlvbiB3aXRoXG4gKiBAbWVtYmVyT2YgdG9rZW5pemVyXG4gKi9cbmx1bnIudG9rZW5pemVyLnJlZ2lzdGVyRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4sIGxhYmVsKSB7XG4gIGlmIChsYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ092ZXJ3cml0aW5nIGV4aXN0aW5nIHRva2VuaXplcjogJyArIGxhYmVsKVxuICB9XG5cbiAgZm4ubGFiZWwgPSBsYWJlbFxuICB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnNbbGFiZWxdID0gZm5cbn1cbi8qIVxuICogbHVuci5QaXBlbGluZVxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5QaXBlbGluZXMgbWFpbnRhaW4gYW4gb3JkZXJlZCBsaXN0IG9mIGZ1bmN0aW9ucyB0byBiZSBhcHBsaWVkIHRvIGFsbFxuICogdG9rZW5zIGluIGRvY3VtZW50cyBlbnRlcmluZyB0aGUgc2VhcmNoIGluZGV4IGFuZCBxdWVyaWVzIGJlaW5nIHJhbiBhZ2FpbnN0XG4gKiB0aGUgaW5kZXguXG4gKlxuICogQW4gaW5zdGFuY2Ugb2YgbHVuci5JbmRleCBjcmVhdGVkIHdpdGggdGhlIGx1bnIgc2hvcnRjdXQgd2lsbCBjb250YWluIGFcbiAqIHBpcGVsaW5lIHdpdGggYSBzdG9wIHdvcmQgZmlsdGVyIGFuZCBhbiBFbmdsaXNoIGxhbmd1YWdlIHN0ZW1tZXIuIEV4dHJhXG4gKiBmdW5jdGlvbnMgY2FuIGJlIGFkZGVkIGJlZm9yZSBvciBhZnRlciBlaXRoZXIgb2YgdGhlc2UgZnVuY3Rpb25zIG9yIHRoZXNlXG4gKiBkZWZhdWx0IGZ1bmN0aW9ucyBjYW4gYmUgcmVtb3ZlZC5cbiAqXG4gKiBXaGVuIHJ1biB0aGUgcGlwZWxpbmUgd2lsbCBjYWxsIGVhY2ggZnVuY3Rpb24gaW4gdHVybiwgcGFzc2luZyBhIHRva2VuLCB0aGVcbiAqIGluZGV4IG9mIHRoYXQgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIGxpc3Qgb2YgYWxsIHRva2VucyBhbmQgZmluYWxseSBhIGxpc3Qgb2ZcbiAqIGFsbCB0aGUgb3JpZ2luYWwgdG9rZW5zLlxuICpcbiAqIFRoZSBvdXRwdXQgb2YgZnVuY3Rpb25zIGluIHRoZSBwaXBlbGluZSB3aWxsIGJlIHBhc3NlZCB0byB0aGUgbmV4dCBmdW5jdGlvblxuICogaW4gdGhlIHBpcGVsaW5lLiBUbyBleGNsdWRlIGEgdG9rZW4gZnJvbSBlbnRlcmluZyB0aGUgaW5kZXggdGhlIGZ1bmN0aW9uXG4gKiBzaG91bGQgcmV0dXJuIHVuZGVmaW5lZCwgdGhlIHJlc3Qgb2YgdGhlIHBpcGVsaW5lIHdpbGwgbm90IGJlIGNhbGxlZCB3aXRoXG4gKiB0aGlzIHRva2VuLlxuICpcbiAqIEZvciBzZXJpYWxpc2F0aW9uIG9mIHBpcGVsaW5lcyB0byB3b3JrLCBhbGwgZnVuY3Rpb25zIHVzZWQgaW4gYW4gaW5zdGFuY2Ugb2ZcbiAqIGEgcGlwZWxpbmUgc2hvdWxkIGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLlBpcGVsaW5lLiBSZWdpc3RlcmVkIGZ1bmN0aW9ucyBjYW5cbiAqIHRoZW4gYmUgbG9hZGVkLiBJZiB0cnlpbmcgdG8gbG9hZCBhIHNlcmlhbGlzZWQgcGlwZWxpbmUgdGhhdCB1c2VzIGZ1bmN0aW9uc1xuICogdGhhdCBhcmUgbm90IHJlZ2lzdGVyZWQgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gKlxuICogSWYgbm90IHBsYW5uaW5nIG9uIHNlcmlhbGlzaW5nIHRoZSBwaXBlbGluZSB0aGVuIHJlZ2lzdGVyaW5nIHBpcGVsaW5lIGZ1bmN0aW9uc1xuICogaXMgbm90IG5lY2Vzc2FyeS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5QaXBlbGluZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fc3RhY2sgPSBbXVxufVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyZWRGdW5jdGlvbnMgPSB7fVxuXG4vKipcbiAqIFJlZ2lzdGVyIGEgZnVuY3Rpb24gd2l0aCB0aGUgcGlwZWxpbmUuXG4gKlxuICogRnVuY3Rpb25zIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHBpcGVsaW5lIHNob3VsZCBiZSByZWdpc3RlcmVkIGlmIHRoZSBwaXBlbGluZVxuICogbmVlZHMgdG8gYmUgc2VyaWFsaXNlZCwgb3IgYSBzZXJpYWxpc2VkIHBpcGVsaW5lIG5lZWRzIHRvIGJlIGxvYWRlZC5cbiAqXG4gKiBSZWdpc3RlcmluZyBhIGZ1bmN0aW9uIGRvZXMgbm90IGFkZCBpdCB0byBhIHBpcGVsaW5lLCBmdW5jdGlvbnMgbXVzdCBzdGlsbCBiZVxuICogYWRkZWQgdG8gaW5zdGFuY2VzIG9mIHRoZSBwaXBlbGluZSBmb3IgdGhlbSB0byBiZSB1c2VkIHdoZW4gcnVubmluZyBhIHBpcGVsaW5lLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjaGVjayBmb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVGhlIGxhYmVsIHRvIHJlZ2lzdGVyIHRoaXMgZnVuY3Rpb24gd2l0aFxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbiA9IGZ1bmN0aW9uIChmbiwgbGFiZWwpIHtcbiAgaWYgKGxhYmVsIGluIHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9ucykge1xuICAgIGx1bnIudXRpbHMud2FybignT3ZlcndyaXRpbmcgZXhpc3RpbmcgcmVnaXN0ZXJlZCBmdW5jdGlvbjogJyArIGxhYmVsKVxuICB9XG5cbiAgZm4ubGFiZWwgPSBsYWJlbFxuICBsdW5yLlBpcGVsaW5lLnJlZ2lzdGVyZWRGdW5jdGlvbnNbZm4ubGFiZWxdID0gZm5cbn1cblxuLyoqXG4gKiBXYXJucyBpZiB0aGUgZnVuY3Rpb24gaXMgbm90IHJlZ2lzdGVyZWQgYXMgYSBQaXBlbGluZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgZm9yLlxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZCA9IGZ1bmN0aW9uIChmbikge1xuICB2YXIgaXNSZWdpc3RlcmVkID0gZm4ubGFiZWwgJiYgKGZuLmxhYmVsIGluIHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9ucylcblxuICBpZiAoIWlzUmVnaXN0ZXJlZCkge1xuICAgIGx1bnIudXRpbHMud2FybignRnVuY3Rpb24gaXMgbm90IHJlZ2lzdGVyZWQgd2l0aCBwaXBlbGluZS4gVGhpcyBtYXkgY2F1c2UgcHJvYmxlbXMgd2hlbiBzZXJpYWxpc2luZyB0aGUgaW5kZXguXFxuJywgZm4pXG4gIH1cbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBwaXBlbGluZS5cbiAqXG4gKiBBbGwgZnVuY3Rpb25zIHRvIGJlIGxvYWRlZCBtdXN0IGFscmVhZHkgYmUgcmVnaXN0ZXJlZCB3aXRoIGx1bnIuUGlwZWxpbmUuXG4gKiBJZiBhbnkgZnVuY3Rpb24gZnJvbSB0aGUgc2VyaWFsaXNlZCBkYXRhIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkIHRoZW4gYW5cbiAqIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkIFRoZSBzZXJpYWxpc2VkIHBpcGVsaW5lIHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5QaXBlbGluZX1cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZCkge1xuICB2YXIgcGlwZWxpbmUgPSBuZXcgbHVuci5QaXBlbGluZVxuXG4gIHNlcmlhbGlzZWQuZm9yRWFjaChmdW5jdGlvbiAoZm5OYW1lKSB7XG4gICAgdmFyIGZuID0gbHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zW2ZuTmFtZV1cblxuICAgIGlmIChmbikge1xuICAgICAgcGlwZWxpbmUuYWRkKGZuKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBsb2FkIHVuLXJlZ2lzdGVyZWQgZnVuY3Rpb246ICcgKyBmbk5hbWUpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBwaXBlbGluZVxufVxuXG4vKipcbiAqIEFkZHMgbmV3IGZ1bmN0aW9ucyB0byB0aGUgZW5kIG9mIHRoZSBwaXBlbGluZS5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb25zIEFueSBudW1iZXIgb2YgZnVuY3Rpb25zIHRvIGFkZCB0byB0aGUgcGlwZWxpbmUuXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZm5zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuXG4gIGZucy5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKGZuKVxuICAgIHRoaXMuX3N0YWNrLnB1c2goZm4pXG4gIH0sIHRoaXMpXG59XG5cbi8qKlxuICogQWRkcyBhIHNpbmdsZSBmdW5jdGlvbiBhZnRlciBhIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlXG4gKiBwaXBlbGluZS5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhpc3RpbmdGbiBBIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlIHBpcGVsaW5lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbmV3Rm4gVGhlIG5ldyBmdW5jdGlvbiB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmFmdGVyID0gZnVuY3Rpb24gKGV4aXN0aW5nRm4sIG5ld0ZuKSB7XG4gIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKG5ld0ZuKVxuXG4gIHZhciBwb3MgPSB0aGlzLl9zdGFjay5pbmRleE9mKGV4aXN0aW5nRm4pXG4gIGlmIChwb3MgPT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIGV4aXN0aW5nRm4nKVxuICB9XG5cbiAgcG9zID0gcG9zICsgMVxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAwLCBuZXdGbilcbn1cblxuLyoqXG4gKiBBZGRzIGEgc2luZ2xlIGZ1bmN0aW9uIGJlZm9yZSBhIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlXG4gKiBwaXBlbGluZS5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhpc3RpbmdGbiBBIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlIHBpcGVsaW5lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbmV3Rm4gVGhlIG5ldyBmdW5jdGlvbiB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmJlZm9yZSA9IGZ1bmN0aW9uIChleGlzdGluZ0ZuLCBuZXdGbikge1xuICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChuZXdGbilcblxuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihleGlzdGluZ0ZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBleGlzdGluZ0ZuJylcbiAgfVxuXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDAsIG5ld0ZuKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBmdW5jdGlvbiBmcm9tIHRoZSBwaXBlbGluZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcmVtb3ZlIGZyb20gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChmbikge1xuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihmbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy5fc3RhY2suc3BsaWNlKHBvcywgMSlcbn1cblxuLyoqXG4gKiBSdW5zIHRoZSBjdXJyZW50IGxpc3Qgb2YgZnVuY3Rpb25zIHRoYXQgbWFrZSB1cCB0aGUgcGlwZWxpbmUgYWdhaW5zdCB0aGVcbiAqIHBhc3NlZCB0b2tlbnMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdG9rZW5zIFRoZSB0b2tlbnMgdG8gcnVuIHRocm91Z2ggdGhlIHBpcGVsaW5lLlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgdmFyIG91dCA9IFtdLFxuICAgICAgdG9rZW5MZW5ndGggPSB0b2tlbnMubGVuZ3RoLFxuICAgICAgc3RhY2tMZW5ndGggPSB0aGlzLl9zdGFjay5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuTGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3RhY2tMZW5ndGg7IGorKykge1xuICAgICAgdG9rZW4gPSB0aGlzLl9zdGFja1tqXSh0b2tlbiwgaSwgdG9rZW5zKVxuICAgICAgaWYgKHRva2VuID09PSB2b2lkIDAgfHwgdG9rZW4gPT09ICcnKSBicmVha1xuICAgIH07XG5cbiAgICBpZiAodG9rZW4gIT09IHZvaWQgMCAmJiB0b2tlbiAhPT0gJycpIG91dC5wdXNoKHRva2VuKVxuICB9O1xuXG4gIHJldHVybiBvdXRcbn1cblxuLyoqXG4gKiBSZXNldHMgdGhlIHBpcGVsaW5lIGJ5IHJlbW92aW5nIGFueSBleGlzdGluZyBwcm9jZXNzb3JzLlxuICpcbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fc3RhY2sgPSBbXVxufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGlwZWxpbmUgcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLl9zdGFjay5tYXAoZnVuY3Rpb24gKGZuKSB7XG4gICAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQoZm4pXG5cbiAgICByZXR1cm4gZm4ubGFiZWxcbiAgfSlcbn1cbi8qIVxuICogbHVuci5WZWN0b3JcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuVmVjdG9ycyBpbXBsZW1lbnQgdmVjdG9yIHJlbGF0ZWQgb3BlcmF0aW9ucyBmb3JcbiAqIGEgc2VyaWVzIG9mIGVsZW1lbnRzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlZlY3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fbWFnbml0dWRlID0gbnVsbFxuICB0aGlzLmxpc3QgPSB1bmRlZmluZWRcbiAgdGhpcy5sZW5ndGggPSAwXG59XG5cbi8qKlxuICogbHVuci5WZWN0b3IuTm9kZSBpcyBhIHNpbXBsZSBzdHJ1Y3QgZm9yIGVhY2ggbm9kZVxuICogaW4gYSBsdW5yLlZlY3Rvci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgbm9kZSBpbiB0aGUgdmVjdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IFRoZSBkYXRhIGF0IHRoaXMgbm9kZSBpbiB0aGUgdmVjdG9yLlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvci5Ob2RlfSBUaGUgbm9kZSBkaXJlY3RseSBhZnRlciB0aGlzIG5vZGUgaW4gdGhlIHZlY3Rvci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQG1lbWJlck9mIFZlY3RvclxuICovXG5sdW5yLlZlY3Rvci5Ob2RlID0gZnVuY3Rpb24gKGlkeCwgdmFsLCBuZXh0KSB7XG4gIHRoaXMuaWR4ID0gaWR4XG4gIHRoaXMudmFsID0gdmFsXG4gIHRoaXMubmV4dCA9IG5leHRcbn1cblxuLyoqXG4gKiBJbnNlcnRzIGEgbmV3IHZhbHVlIGF0IGEgcG9zaXRpb24gaW4gYSB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBpbmRleCBhdCB3aGljaCB0byBpbnNlcnQgYSB2YWx1ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgb2JqZWN0IHRvIGluc2VydCBpbiB0aGUgdmVjdG9yLlxuICogQG1lbWJlck9mIFZlY3Rvci5cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIChpZHgsIHZhbCkge1xuICB0aGlzLl9tYWduaXR1ZGUgPSB1bmRlZmluZWQ7XG4gIHZhciBsaXN0ID0gdGhpcy5saXN0XG5cbiAgaWYgKCFsaXN0KSB7XG4gICAgdGhpcy5saXN0ID0gbmV3IGx1bnIuVmVjdG9yLk5vZGUgKGlkeCwgdmFsLCBsaXN0KVxuICAgIHJldHVybiB0aGlzLmxlbmd0aCsrXG4gIH1cblxuICBpZiAoaWR4IDwgbGlzdC5pZHgpIHtcbiAgICB0aGlzLmxpc3QgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIGxpc3QpXG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoKytcbiAgfVxuXG4gIHZhciBwcmV2ID0gbGlzdCxcbiAgICAgIG5leHQgPSBsaXN0Lm5leHRcblxuICB3aGlsZSAobmV4dCAhPSB1bmRlZmluZWQpIHtcbiAgICBpZiAoaWR4IDwgbmV4dC5pZHgpIHtcbiAgICAgIHByZXYubmV4dCA9IG5ldyBsdW5yLlZlY3Rvci5Ob2RlIChpZHgsIHZhbCwgbmV4dClcbiAgICAgIHJldHVybiB0aGlzLmxlbmd0aCsrXG4gICAgfVxuXG4gICAgcHJldiA9IG5leHQsIG5leHQgPSBuZXh0Lm5leHRcbiAgfVxuXG4gIHByZXYubmV4dCA9IG5ldyBsdW5yLlZlY3Rvci5Ob2RlIChpZHgsIHZhbCwgbmV4dClcbiAgcmV0dXJuIHRoaXMubGVuZ3RoKytcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtYWduaXR1ZGUgb2YgdGhpcyB2ZWN0b3IuXG4gKlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLm1hZ25pdHVkZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX21hZ25pdHVkZSkgcmV0dXJuIHRoaXMuX21hZ25pdHVkZVxuICB2YXIgbm9kZSA9IHRoaXMubGlzdCxcbiAgICAgIHN1bU9mU3F1YXJlcyA9IDAsXG4gICAgICB2YWxcblxuICB3aGlsZSAobm9kZSkge1xuICAgIHZhbCA9IG5vZGUudmFsXG4gICAgc3VtT2ZTcXVhcmVzICs9IHZhbCAqIHZhbFxuICAgIG5vZGUgPSBub2RlLm5leHRcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9tYWduaXR1ZGUgPSBNYXRoLnNxcnQoc3VtT2ZTcXVhcmVzKVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyIHZlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuVmVjdG9yfSBvdGhlclZlY3RvciBUaGUgdmVjdG9yIHRvIGNvbXB1dGUgdGhlIGRvdCBwcm9kdWN0IHdpdGguXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFZlY3RvclxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKG90aGVyVmVjdG9yKSB7XG4gIHZhciBub2RlID0gdGhpcy5saXN0LFxuICAgICAgb3RoZXJOb2RlID0gb3RoZXJWZWN0b3IubGlzdCxcbiAgICAgIGRvdFByb2R1Y3QgPSAwXG5cbiAgd2hpbGUgKG5vZGUgJiYgb3RoZXJOb2RlKSB7XG4gICAgaWYgKG5vZGUuaWR4IDwgb3RoZXJOb2RlLmlkeCkge1xuICAgICAgbm9kZSA9IG5vZGUubmV4dFxuICAgIH0gZWxzZSBpZiAobm9kZS5pZHggPiBvdGhlck5vZGUuaWR4KSB7XG4gICAgICBvdGhlck5vZGUgPSBvdGhlck5vZGUubmV4dFxuICAgIH0gZWxzZSB7XG4gICAgICBkb3RQcm9kdWN0ICs9IG5vZGUudmFsICogb3RoZXJOb2RlLnZhbFxuICAgICAgbm9kZSA9IG5vZGUubmV4dFxuICAgICAgb3RoZXJOb2RlID0gb3RoZXJOb2RlLm5leHRcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZG90UHJvZHVjdFxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvc2luZSBzaW1pbGFyaXR5IGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcbiAqIHZlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuVmVjdG9yfSBvdGhlclZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHRvIGNhbGN1bGF0ZSB0aGVcbiAqIHNpbWlsYXJpdHkgd2l0aC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgVmVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5zaW1pbGFyaXR5ID0gZnVuY3Rpb24gKG90aGVyVmVjdG9yKSB7XG4gIHJldHVybiB0aGlzLmRvdChvdGhlclZlY3RvcikgLyAodGhpcy5tYWduaXR1ZGUoKSAqIG90aGVyVmVjdG9yLm1hZ25pdHVkZSgpKVxufVxuLyohXG4gKiBsdW5yLlNvcnRlZFNldFxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5Tb3J0ZWRTZXRzIGFyZSB1c2VkIHRvIG1haW50YWluIGFuIGFycmF5IG9mIHVuaXEgdmFsdWVzIGluIGEgc29ydGVkXG4gKiBvcmRlci5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5Tb3J0ZWRTZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubGVuZ3RoID0gMFxuICB0aGlzLmVsZW1lbnRzID0gW11cbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBzb3J0ZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHNldCB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuU29ydGVkU2V0fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIHZhciBzZXQgPSBuZXcgdGhpc1xuXG4gIHNldC5lbGVtZW50cyA9IHNlcmlhbGlzZWREYXRhXG4gIHNldC5sZW5ndGggPSBzZXJpYWxpc2VkRGF0YS5sZW5ndGhcblxuICByZXR1cm4gc2V0XG59XG5cbi8qKlxuICogSW5zZXJ0cyBuZXcgaXRlbXMgaW50byB0aGUgc2V0IGluIHRoZSBjb3JyZWN0IHBvc2l0aW9uIHRvIG1haW50YWluIHRoZVxuICogb3JkZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFRoZSBvYmplY3RzIHRvIGFkZCB0byB0aGlzIHNldC5cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGksIGVsZW1lbnRcblxuICBmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZWxlbWVudCA9IGFyZ3VtZW50c1tpXVxuICAgIGlmICh+dGhpcy5pbmRleE9mKGVsZW1lbnQpKSBjb250aW51ZVxuICAgIHRoaXMuZWxlbWVudHMuc3BsaWNlKHRoaXMubG9jYXRpb25Gb3IoZWxlbWVudCksIDAsIGVsZW1lbnQpXG4gIH1cblxuICB0aGlzLmxlbmd0aCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoXG59XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBzb3J0ZWQgc2V0IGludG8gYW4gYXJyYXkuXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZWxlbWVudHMuc2xpY2UoKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYXJyYXkgd2l0aCB0aGUgcmVzdWx0cyBvZiBjYWxsaW5nIGEgcHJvdmlkZWQgZnVuY3Rpb24gb24gZXZlcnlcbiAqIGVsZW1lbnQgaW4gdGhpcyBzb3J0ZWQgc2V0LlxuICpcbiAqIERlbGVnYXRlcyB0byBBcnJheS5wcm90b3R5cGUubWFwIGFuZCBoYXMgdGhlIHNhbWUgc2lnbmF0dXJlLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBvbiBlYWNoIGVsZW1lbnQgb2YgdGhlXG4gKiBzZXQuXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4IEFuIG9wdGlvbmFsIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIHRoZSBjb250ZXh0XG4gKiBmb3IgdGhlIGZ1bmN0aW9uIGZuLlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKGZuLCBjdHgpIHtcbiAgcmV0dXJuIHRoaXMuZWxlbWVudHMubWFwKGZuLCBjdHgpXG59XG5cbi8qKlxuICogRXhlY3V0ZXMgYSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIHBlciBzb3J0ZWQgc2V0IGVsZW1lbnQuXG4gKlxuICogRGVsZWdhdGVzIHRvIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoIGFuZCBoYXMgdGhlIHNhbWUgc2lnbmF0dXJlLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBvbiBlYWNoIGVsZW1lbnQgb2YgdGhlXG4gKiBzZXQuXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4IEFuIG9wdGlvbmFsIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIHRoZSBjb250ZXh0XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKiBmb3IgdGhlIGZ1bmN0aW9uIGZuLlxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChmbiwgY3R4KSB7XG4gIHJldHVybiB0aGlzLmVsZW1lbnRzLmZvckVhY2goZm4sIGN0eClcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbmRleCBhdCB3aGljaCBhIGdpdmVuIGVsZW1lbnQgY2FuIGJlIGZvdW5kIGluIHRoZVxuICogc29ydGVkIHNldCwgb3IgLTEgaWYgaXQgaXMgbm90IHByZXNlbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVsZW0gVGhlIG9iamVjdCB0byBsb2NhdGUgaW4gdGhlIHNvcnRlZCBzZXQuXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gIHZhciBzdGFydCA9IDAsXG4gICAgICBlbmQgPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydCxcbiAgICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKSxcbiAgICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG5cbiAgd2hpbGUgKHNlY3Rpb25MZW5ndGggPiAxKSB7XG4gICAgaWYgKHBpdm90RWxlbSA9PT0gZWxlbSkgcmV0dXJuIHBpdm90XG5cbiAgICBpZiAocGl2b3RFbGVtIDwgZWxlbSkgc3RhcnQgPSBwaXZvdFxuICAgIGlmIChwaXZvdEVsZW0gPiBlbGVtKSBlbmQgPSBwaXZvdFxuXG4gICAgc2VjdGlvbkxlbmd0aCA9IGVuZCAtIHN0YXJ0XG4gICAgcGl2b3QgPSBzdGFydCArIE1hdGguZmxvb3Ioc2VjdGlvbkxlbmd0aCAvIDIpXG4gICAgcGl2b3RFbGVtID0gdGhpcy5lbGVtZW50c1twaXZvdF1cbiAgfVxuXG4gIGlmIChwaXZvdEVsZW0gPT09IGVsZW0pIHJldHVybiBwaXZvdFxuXG4gIHJldHVybiAtMVxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIHdpdGhpbiB0aGUgc29ydGVkIHNldCB0aGF0IGFuIGVsZW1lbnQgc2hvdWxkIGJlXG4gKiBpbnNlcnRlZCBhdCB0byBtYWludGFpbiB0aGUgY3VycmVudCBvcmRlciBvZiB0aGUgc2V0LlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IHRoZSBlbGVtZW50IHRvIHNlYXJjaCBmb3IgZG9lcyBub3QgYWxyZWFkeSBleGlzdFxuICogaW4gdGhlIHNvcnRlZCBzZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVsZW0gVGhlIGVsZW0gdG8gZmluZCB0aGUgcG9zaXRpb24gZm9yIGluIHRoZSBzZXRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5sb2NhdGlvbkZvciA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gIHZhciBzdGFydCA9IDAsXG4gICAgICBlbmQgPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydCxcbiAgICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKSxcbiAgICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG5cbiAgd2hpbGUgKHNlY3Rpb25MZW5ndGggPiAxKSB7XG4gICAgaWYgKHBpdm90RWxlbSA8IGVsZW0pIHN0YXJ0ID0gcGl2b3RcbiAgICBpZiAocGl2b3RFbGVtID4gZWxlbSkgZW5kID0gcGl2b3RcblxuICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydFxuICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKVxuICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG4gIH1cblxuICBpZiAocGl2b3RFbGVtID4gZWxlbSkgcmV0dXJuIHBpdm90XG4gIGlmIChwaXZvdEVsZW0gPCBlbGVtKSByZXR1cm4gcGl2b3QgKyAxXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBsdW5yLlNvcnRlZFNldCB0aGF0IGNvbnRhaW5zIHRoZSBlbGVtZW50cyBpbiB0aGUgaW50ZXJzZWN0aW9uXG4gKiBvZiB0aGlzIHNldCBhbmQgdGhlIHBhc3NlZCBzZXQuXG4gKlxuICogQHBhcmFtIHtsdW5yLlNvcnRlZFNldH0gb3RoZXJTZXQgVGhlIHNldCB0byBpbnRlcnNlY3Qgd2l0aCB0aGlzIHNldC5cbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmludGVyc2VjdCA9IGZ1bmN0aW9uIChvdGhlclNldCkge1xuICB2YXIgaW50ZXJzZWN0U2V0ID0gbmV3IGx1bnIuU29ydGVkU2V0LFxuICAgICAgaSA9IDAsIGogPSAwLFxuICAgICAgYV9sZW4gPSB0aGlzLmxlbmd0aCwgYl9sZW4gPSBvdGhlclNldC5sZW5ndGgsXG4gICAgICBhID0gdGhpcy5lbGVtZW50cywgYiA9IG90aGVyU2V0LmVsZW1lbnRzXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBpZiAoaSA+IGFfbGVuIC0gMSB8fCBqID4gYl9sZW4gLSAxKSBicmVha1xuXG4gICAgaWYgKGFbaV0gPT09IGJbal0pIHtcbiAgICAgIGludGVyc2VjdFNldC5hZGQoYVtpXSlcbiAgICAgIGkrKywgaisrXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChhW2ldIDwgYltqXSkge1xuICAgICAgaSsrXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChhW2ldID4gYltqXSkge1xuICAgICAgaisrXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gaW50ZXJzZWN0U2V0XG59XG5cbi8qKlxuICogTWFrZXMgYSBjb3B5IG9mIHRoaXMgc2V0XG4gKlxuICogQHJldHVybnMge2x1bnIuU29ydGVkU2V0fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjbG9uZSA9IG5ldyBsdW5yLlNvcnRlZFNldFxuXG4gIGNsb25lLmVsZW1lbnRzID0gdGhpcy50b0FycmF5KClcbiAgY2xvbmUubGVuZ3RoID0gY2xvbmUuZWxlbWVudHMubGVuZ3RoXG5cbiAgcmV0dXJuIGNsb25lXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBsdW5yLlNvcnRlZFNldCB0aGF0IGNvbnRhaW5zIHRoZSBlbGVtZW50cyBpbiB0aGUgdW5pb25cbiAqIG9mIHRoaXMgc2V0IGFuZCB0aGUgcGFzc2VkIHNldC5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuU29ydGVkU2V0fSBvdGhlclNldCBUaGUgc2V0IHRvIHVuaW9uIHdpdGggdGhpcyBzZXQuXG4gKiBAcmV0dXJucyB7bHVuci5Tb3J0ZWRTZXR9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS51bmlvbiA9IGZ1bmN0aW9uIChvdGhlclNldCkge1xuICB2YXIgbG9uZ1NldCwgc2hvcnRTZXQsIHVuaW9uU2V0XG5cbiAgaWYgKHRoaXMubGVuZ3RoID49IG90aGVyU2V0Lmxlbmd0aCkge1xuICAgIGxvbmdTZXQgPSB0aGlzLCBzaG9ydFNldCA9IG90aGVyU2V0XG4gIH0gZWxzZSB7XG4gICAgbG9uZ1NldCA9IG90aGVyU2V0LCBzaG9ydFNldCA9IHRoaXNcbiAgfVxuXG4gIHVuaW9uU2V0ID0gbG9uZ1NldC5jbG9uZSgpXG5cbiAgZm9yKHZhciBpID0gMCwgc2hvcnRTZXRFbGVtZW50cyA9IHNob3J0U2V0LnRvQXJyYXkoKTsgaSA8IHNob3J0U2V0RWxlbWVudHMubGVuZ3RoOyBpKyspe1xuICAgIHVuaW9uU2V0LmFkZChzaG9ydFNldEVsZW1lbnRzW2ldKVxuICB9XG5cbiAgcmV0dXJuIHVuaW9uU2V0XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzb3J0ZWQgc2V0IHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudG9BcnJheSgpXG59XG4vKiFcbiAqIGx1bnIuSW5kZXhcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuSW5kZXggaXMgb2JqZWN0IHRoYXQgbWFuYWdlcyBhIHNlYXJjaCBpbmRleC4gIEl0IGNvbnRhaW5zIHRoZSBpbmRleGVzXG4gKiBhbmQgc3RvcmVzIGFsbCB0aGUgdG9rZW5zIGFuZCBkb2N1bWVudCBsb29rdXBzLiAgSXQgYWxzbyBwcm92aWRlcyB0aGUgbWFpblxuICogdXNlciBmYWNpbmcgQVBJIGZvciB0aGUgbGlicmFyeS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5JbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fZmllbGRzID0gW11cbiAgdGhpcy5fcmVmID0gJ2lkJ1xuICB0aGlzLnBpcGVsaW5lID0gbmV3IGx1bnIuUGlwZWxpbmVcbiAgdGhpcy5kb2N1bWVudFN0b3JlID0gbmV3IGx1bnIuU3RvcmVcbiAgdGhpcy50b2tlblN0b3JlID0gbmV3IGx1bnIuVG9rZW5TdG9yZVxuICB0aGlzLmNvcnB1c1Rva2VucyA9IG5ldyBsdW5yLlNvcnRlZFNldFxuICB0aGlzLmV2ZW50RW1pdHRlciA9ICBuZXcgbHVuci5FdmVudEVtaXR0ZXJcbiAgdGhpcy50b2tlbml6ZXJGbiA9IGx1bnIudG9rZW5pemVyXG5cbiAgdGhpcy5faWRmQ2FjaGUgPSB7fVxuXG4gIHRoaXMub24oJ2FkZCcsICdyZW1vdmUnLCAndXBkYXRlJywgKGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pZGZDYWNoZSA9IHt9XG4gIH0pLmJpbmQodGhpcykpXG59XG5cbi8qKlxuICogQmluZCBhIGhhbmRsZXIgdG8gZXZlbnRzIGJlaW5nIGVtaXR0ZWQgYnkgdGhlIGluZGV4LlxuICpcbiAqIFRoZSBoYW5kbGVyIGNhbiBiZSBib3VuZCB0byBtYW55IGV2ZW50cyBhdCB0aGUgc2FtZSB0aW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZXZlbnROYW1lXSBUaGUgbmFtZShzKSBvZiBldmVudHMgdG8gYmluZCB0aGUgZnVuY3Rpb24gdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gIHJldHVybiB0aGlzLmV2ZW50RW1pdHRlci5hZGRMaXN0ZW5lci5hcHBseSh0aGlzLmV2ZW50RW1pdHRlciwgYXJncylcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgaGFuZGxlciBmcm9tIGFuIGV2ZW50IGJlaW5nIGVtaXR0ZWQgYnkgdGhlIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgZXZlbnRzIHRvIHJlbW92ZSB0aGUgZnVuY3Rpb24gZnJvbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBzZXJpYWxpc2VkIHNldCB0byBsb2FkLlxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICByZXR1cm4gdGhpcy5ldmVudEVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgZm4pXG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgaW5kZXguXG4gKlxuICogSXNzdWVzIGEgd2FybmluZyBpZiB0aGUgaW5kZXggYmVpbmcgaW1wb3J0ZWQgd2FzIHNlcmlhbGlzZWRcbiAqIGJ5IGEgZGlmZmVyZW50IHZlcnNpb24gb2YgbHVuci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXNlZERhdGEgVGhlIHNlcmlhbGlzZWQgc2V0IHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZERhdGEpIHtcbiAgaWYgKHNlcmlhbGlzZWREYXRhLnZlcnNpb24gIT09IGx1bnIudmVyc2lvbikge1xuICAgIGx1bnIudXRpbHMud2FybigndmVyc2lvbiBtaXNtYXRjaDogY3VycmVudCAnICsgbHVuci52ZXJzaW9uICsgJyBpbXBvcnRpbmcgJyArIHNlcmlhbGlzZWREYXRhLnZlcnNpb24pXG4gIH1cblxuICB2YXIgaWR4ID0gbmV3IHRoaXNcblxuICBpZHguX2ZpZWxkcyA9IHNlcmlhbGlzZWREYXRhLmZpZWxkc1xuICBpZHguX3JlZiA9IHNlcmlhbGlzZWREYXRhLnJlZlxuXG4gIGlkeC50b2tlbml6ZXIobHVuci50b2tlbml6ZXIubG9hZChzZXJpYWxpc2VkRGF0YS50b2tlbml6ZXIpKVxuICBpZHguZG9jdW1lbnRTdG9yZSA9IGx1bnIuU3RvcmUubG9hZChzZXJpYWxpc2VkRGF0YS5kb2N1bWVudFN0b3JlKVxuICBpZHgudG9rZW5TdG9yZSA9IGx1bnIuVG9rZW5TdG9yZS5sb2FkKHNlcmlhbGlzZWREYXRhLnRva2VuU3RvcmUpXG4gIGlkeC5jb3JwdXNUb2tlbnMgPSBsdW5yLlNvcnRlZFNldC5sb2FkKHNlcmlhbGlzZWREYXRhLmNvcnB1c1Rva2VucylcbiAgaWR4LnBpcGVsaW5lID0gbHVuci5QaXBlbGluZS5sb2FkKHNlcmlhbGlzZWREYXRhLnBpcGVsaW5lKVxuXG4gIHJldHVybiBpZHhcbn1cblxuLyoqXG4gKiBBZGRzIGEgZmllbGQgdG8gdGhlIGxpc3Qgb2YgZmllbGRzIHRoYXQgd2lsbCBiZSBzZWFyY2hhYmxlIHdpdGhpbiBkb2N1bWVudHNcbiAqIGluIHRoZSBpbmRleC5cbiAqXG4gKiBBbiBvcHRpb25hbCBib29zdCBwYXJhbSBjYW4gYmUgcGFzc2VkIHRvIGFmZmVjdCBob3cgbXVjaCB0b2tlbnMgaW4gdGhpcyBmaWVsZFxuICogcmFuayBpbiBzZWFyY2ggcmVzdWx0cywgYnkgZGVmYXVsdCB0aGUgYm9vc3QgdmFsdWUgaXMgMS5cbiAqXG4gKiBGaWVsZHMgc2hvdWxkIGJlIGFkZGVkIGJlZm9yZSBhbnkgZG9jdW1lbnRzIGFyZSBhZGRlZCB0byB0aGUgaW5kZXgsIGZpZWxkc1xuICogdGhhdCBhcmUgYWRkZWQgYWZ0ZXIgZG9jdW1lbnRzIGFyZSBhZGRlZCB0byB0aGUgaW5kZXggd2lsbCBvbmx5IGFwcGx5IHRvIG5ld1xuICogZG9jdW1lbnRzIGFkZGVkIHRvIHRoZSBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGROYW1lIFRoZSBuYW1lIG9mIHRoZSBmaWVsZCB3aXRoaW4gdGhlIGRvY3VtZW50IHRoYXRcbiAqIHNob3VsZCBiZSBpbmRleGVkXG4gKiBAcGFyYW0ge051bWJlcn0gYm9vc3QgQW4gb3B0aW9uYWwgYm9vc3QgdGhhdCBjYW4gYmUgYXBwbGllZCB0byB0ZXJtcyBpbiB0aGlzXG4gKiBmaWVsZC5cbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24gKGZpZWxkTmFtZSwgb3B0cykge1xuICB2YXIgb3B0cyA9IG9wdHMgfHwge30sXG4gICAgICBmaWVsZCA9IHsgbmFtZTogZmllbGROYW1lLCBib29zdDogb3B0cy5ib29zdCB8fCAxIH1cblxuICB0aGlzLl9maWVsZHMucHVzaChmaWVsZClcbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBwcm9wZXJ0eSB1c2VkIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IGRvY3VtZW50cyBhZGRlZCB0byB0aGUgaW5kZXgsXG4gKiBieSBkZWZhdWx0IHRoaXMgcHJvcGVydHkgaXMgJ2lkJy5cbiAqXG4gKiBUaGlzIHNob3VsZCBvbmx5IGJlIGNoYW5nZWQgYmVmb3JlIGFkZGluZyBkb2N1bWVudHMgdG8gdGhlIGluZGV4LCBjaGFuZ2luZ1xuICogdGhlIHJlZiBwcm9wZXJ0eSB3aXRob3V0IHJlc2V0dGluZyB0aGUgaW5kZXggY2FuIGxlYWQgdG8gdW5leHBlY3RlZCByZXN1bHRzLlxuICpcbiAqIFRoZSB2YWx1ZSBvZiByZWYgY2FuIGJlIG9mIGFueSB0eXBlIGJ1dCBpdCBfbXVzdF8gYmUgc3RhYmx5IGNvbXBhcmFibGUgYW5kXG4gKiBvcmRlcmFibGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlZk5hbWUgVGhlIHByb3BlcnR5IHRvIHVzZSB0byB1bmlxdWVseSBpZGVudGlmeSB0aGVcbiAqIGRvY3VtZW50cyBpbiB0aGUgaW5kZXguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVtaXRFdmVudCBXaGV0aGVyIHRvIGVtaXQgYWRkIGV2ZW50cywgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24gKHJlZk5hbWUpIHtcbiAgdGhpcy5fcmVmID0gcmVmTmFtZVxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHRva2VuaXplciB1c2VkIGZvciB0aGlzIGluZGV4LlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlIGluZGV4IHdpbGwgdXNlIHRoZSBkZWZhdWx0IHRva2VuaXplciwgbHVuci50b2tlbml6ZXIuIFRoZSB0b2tlbml6ZXJcbiAqIHNob3VsZCBvbmx5IGJlIGNoYW5nZWQgYmVmb3JlIGFkZGluZyBkb2N1bWVudHMgdG8gdGhlIGluZGV4LiBDaGFuZ2luZyB0aGUgdG9rZW5pemVyXG4gKiB3aXRob3V0IHJlLWJ1aWxkaW5nIHRoZSBpbmRleCBjYW4gbGVhZCB0byB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHVzZSBhcyBhIHRva2VuaXplci5cbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnRva2VuaXplciA9IGZ1bmN0aW9uIChmbikge1xuICB2YXIgaXNSZWdpc3RlcmVkID0gZm4ubGFiZWwgJiYgKGZuLmxhYmVsIGluIGx1bnIudG9rZW5pemVyLnJlZ2lzdGVyZWRGdW5jdGlvbnMpXG5cbiAgaWYgKCFpc1JlZ2lzdGVyZWQpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ0Z1bmN0aW9uIGlzIG5vdCBhIHJlZ2lzdGVyZWQgdG9rZW5pemVyLiBUaGlzIG1heSBjYXVzZSBwcm9ibGVtcyB3aGVuIHNlcmlhbGlzaW5nIHRoZSBpbmRleCcpXG4gIH1cblxuICB0aGlzLnRva2VuaXplckZuID0gZm5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBBZGQgYSBkb2N1bWVudCB0byB0aGUgaW5kZXguXG4gKlxuICogVGhpcyBpcyB0aGUgd2F5IG5ldyBkb2N1bWVudHMgZW50ZXIgdGhlIGluZGV4LCB0aGlzIGZ1bmN0aW9uIHdpbGwgcnVuIHRoZVxuICogZmllbGRzIGZyb20gdGhlIGRvY3VtZW50IHRocm91Z2ggdGhlIGluZGV4J3MgcGlwZWxpbmUgYW5kIHRoZW4gYWRkIGl0IHRvXG4gKiB0aGUgaW5kZXgsIGl0IHdpbGwgdGhlbiBzaG93IHVwIGluIHNlYXJjaCByZXN1bHRzLlxuICpcbiAqIEFuICdhZGQnIGV2ZW50IGlzIGVtaXR0ZWQgd2l0aCB0aGUgZG9jdW1lbnQgdGhhdCBoYXMgYmVlbiBhZGRlZCBhbmQgdGhlIGluZGV4XG4gKiB0aGUgZG9jdW1lbnQgaGFzIGJlZW4gYWRkZWQgdG8uIFRoaXMgZXZlbnQgY2FuIGJlIHNpbGVuY2VkIGJ5IHBhc3NpbmcgZmFsc2VcbiAqIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYWRkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvY3VtZW50IHRvIGFkZCB0byB0aGUgaW5kZXguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVtaXRFdmVudCBXaGV0aGVyIG9yIG5vdCB0byBlbWl0IGV2ZW50cywgZGVmYXVsdCB0cnVlLlxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChkb2MsIGVtaXRFdmVudCkge1xuICB2YXIgZG9jVG9rZW5zID0ge30sXG4gICAgICBhbGxEb2N1bWVudFRva2VucyA9IG5ldyBsdW5yLlNvcnRlZFNldCxcbiAgICAgIGRvY1JlZiA9IGRvY1t0aGlzLl9yZWZdLFxuICAgICAgZW1pdEV2ZW50ID0gZW1pdEV2ZW50ID09PSB1bmRlZmluZWQgPyB0cnVlIDogZW1pdEV2ZW50XG5cbiAgdGhpcy5fZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgdmFyIGZpZWxkVG9rZW5zID0gdGhpcy5waXBlbGluZS5ydW4odGhpcy50b2tlbml6ZXJGbihkb2NbZmllbGQubmFtZV0pKVxuXG4gICAgZG9jVG9rZW5zW2ZpZWxkLm5hbWVdID0gZmllbGRUb2tlbnNcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRUb2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB0b2tlbiA9IGZpZWxkVG9rZW5zW2ldXG4gICAgICBhbGxEb2N1bWVudFRva2Vucy5hZGQodG9rZW4pXG4gICAgICB0aGlzLmNvcnB1c1Rva2Vucy5hZGQodG9rZW4pXG4gICAgfVxuICB9LCB0aGlzKVxuXG4gIHRoaXMuZG9jdW1lbnRTdG9yZS5zZXQoZG9jUmVmLCBhbGxEb2N1bWVudFRva2VucylcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbERvY3VtZW50VG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gYWxsRG9jdW1lbnRUb2tlbnMuZWxlbWVudHNbaV1cbiAgICB2YXIgdGYgPSAwO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9maWVsZHMubGVuZ3RoOyBqKyspe1xuICAgICAgdmFyIGZpZWxkID0gdGhpcy5fZmllbGRzW2pdXG4gICAgICB2YXIgZmllbGRUb2tlbnMgPSBkb2NUb2tlbnNbZmllbGQubmFtZV1cbiAgICAgIHZhciBmaWVsZExlbmd0aCA9IGZpZWxkVG9rZW5zLmxlbmd0aFxuXG4gICAgICBpZiAoIWZpZWxkTGVuZ3RoKSBjb250aW51ZVxuXG4gICAgICB2YXIgdG9rZW5Db3VudCA9IDBcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZmllbGRMZW5ndGg7IGsrKyl7XG4gICAgICAgIGlmIChmaWVsZFRva2Vuc1trXSA9PT0gdG9rZW4pe1xuICAgICAgICAgIHRva2VuQ291bnQrK1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRmICs9ICh0b2tlbkNvdW50IC8gZmllbGRMZW5ndGggKiBmaWVsZC5ib29zdClcbiAgICB9XG5cbiAgICB0aGlzLnRva2VuU3RvcmUuYWRkKHRva2VuLCB7IHJlZjogZG9jUmVmLCB0ZjogdGYgfSlcbiAgfTtcblxuICBpZiAoZW1pdEV2ZW50KSB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdhZGQnLCBkb2MsIHRoaXMpXG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGRvY3VtZW50IGZyb20gdGhlIGluZGV4LlxuICpcbiAqIFRvIG1ha2Ugc3VyZSBkb2N1bWVudHMgbm8gbG9uZ2VyIHNob3cgdXAgaW4gc2VhcmNoIHJlc3VsdHMgdGhleSBjYW4gYmVcbiAqIHJlbW92ZWQgZnJvbSB0aGUgaW5kZXggdXNpbmcgdGhpcyBtZXRob2QuXG4gKlxuICogVGhlIGRvY3VtZW50IHBhc3NlZCBvbmx5IG5lZWRzIHRvIGhhdmUgdGhlIHNhbWUgcmVmIHByb3BlcnR5IHZhbHVlIGFzIHRoZVxuICogZG9jdW1lbnQgdGhhdCB3YXMgYWRkZWQgdG8gdGhlIGluZGV4LCB0aGV5IGNvdWxkIGJlIGNvbXBsZXRlbHkgZGlmZmVyZW50XG4gKiBvYmplY3RzLlxuICpcbiAqIEEgJ3JlbW92ZScgZXZlbnQgaXMgZW1pdHRlZCB3aXRoIHRoZSBkb2N1bWVudCB0aGF0IGhhcyBiZWVuIHJlbW92ZWQgYW5kIHRoZSBpbmRleFxuICogdGhlIGRvY3VtZW50IGhhcyBiZWVuIHJlbW92ZWQgZnJvbS4gVGhpcyBldmVudCBjYW4gYmUgc2lsZW5jZWQgYnkgcGFzc2luZyBmYWxzZVxuICogYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byByZW1vdmUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRvYyBUaGUgZG9jdW1lbnQgdG8gcmVtb3ZlIGZyb20gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciB0byBlbWl0IHJlbW92ZSBldmVudHMsIGRlZmF1bHRzIHRvIHRydWVcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZG9jLCBlbWl0RXZlbnQpIHtcbiAgdmFyIGRvY1JlZiA9IGRvY1t0aGlzLl9yZWZdLFxuICAgICAgZW1pdEV2ZW50ID0gZW1pdEV2ZW50ID09PSB1bmRlZmluZWQgPyB0cnVlIDogZW1pdEV2ZW50XG5cbiAgaWYgKCF0aGlzLmRvY3VtZW50U3RvcmUuaGFzKGRvY1JlZikpIHJldHVyblxuXG4gIHZhciBkb2NUb2tlbnMgPSB0aGlzLmRvY3VtZW50U3RvcmUuZ2V0KGRvY1JlZilcblxuICB0aGlzLmRvY3VtZW50U3RvcmUucmVtb3ZlKGRvY1JlZilcblxuICBkb2NUb2tlbnMuZm9yRWFjaChmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0aGlzLnRva2VuU3RvcmUucmVtb3ZlKHRva2VuLCBkb2NSZWYpXG4gIH0sIHRoaXMpXG5cbiAgaWYgKGVtaXRFdmVudCkgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgncmVtb3ZlJywgZG9jLCB0aGlzKVxufVxuXG4vKipcbiAqIFVwZGF0ZXMgYSBkb2N1bWVudCBpbiB0aGUgaW5kZXguXG4gKlxuICogV2hlbiBhIGRvY3VtZW50IGNvbnRhaW5lZCB3aXRoaW4gdGhlIGluZGV4IGdldHMgdXBkYXRlZCwgZmllbGRzIGNoYW5nZWQsXG4gKiBhZGRlZCBvciByZW1vdmVkLCB0byBtYWtlIHN1cmUgaXQgY29ycmVjdGx5IG1hdGNoZWQgYWdhaW5zdCBzZWFyY2ggcXVlcmllcyxcbiAqIGl0IHNob3VsZCBiZSB1cGRhdGVkIGluIHRoZSBpbmRleC5cbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBqdXN0IGEgd3JhcHBlciBhcm91bmQgYHJlbW92ZWAgYW5kIGBhZGRgXG4gKlxuICogQW4gJ3VwZGF0ZScgZXZlbnQgaXMgZW1pdHRlZCB3aXRoIHRoZSBkb2N1bWVudCB0aGF0IGhhcyBiZWVuIHVwZGF0ZWQgYW5kIHRoZSBpbmRleC5cbiAqIFRoaXMgZXZlbnQgY2FuIGJlIHNpbGVuY2VkIGJ5IHBhc3NpbmcgZmFsc2UgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byB1cGRhdGUuIE9ubHlcbiAqIGFuIHVwZGF0ZSBldmVudCB3aWxsIGJlIGZpcmVkLCB0aGUgJ2FkZCcgYW5kICdyZW1vdmUnIGV2ZW50cyBvZiB0aGUgdW5kZXJseWluZyBjYWxsc1xuICogYXJlIHNpbGVuY2VkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvY3VtZW50IHRvIHVwZGF0ZSBpbiB0aGUgaW5kZXguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVtaXRFdmVudCBXaGV0aGVyIHRvIGVtaXQgdXBkYXRlIGV2ZW50cywgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQHNlZSBJbmRleC5wcm90b3R5cGUucmVtb3ZlXG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5hZGRcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9jLCBlbWl0RXZlbnQpIHtcbiAgdmFyIGVtaXRFdmVudCA9IGVtaXRFdmVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGVtaXRFdmVudFxuXG4gIHRoaXMucmVtb3ZlKGRvYywgZmFsc2UpXG4gIHRoaXMuYWRkKGRvYywgZmFsc2UpXG5cbiAgaWYgKGVtaXRFdmVudCkgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgndXBkYXRlJywgZG9jLCB0aGlzKVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2UgZG9jdW1lbnQgZnJlcXVlbmN5IGZvciBhIHRva2VuIHdpdGhpbiB0aGUgaW5kZXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBjYWxjdWxhdGUgdGhlIGlkZiBvZi5cbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLmlkZlxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5pZGYgPSBmdW5jdGlvbiAodGVybSkge1xuICB2YXIgY2FjaGVLZXkgPSBcIkBcIiArIHRlcm1cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLl9pZGZDYWNoZSwgY2FjaGVLZXkpKSByZXR1cm4gdGhpcy5faWRmQ2FjaGVbY2FjaGVLZXldXG5cbiAgdmFyIGRvY3VtZW50RnJlcXVlbmN5ID0gdGhpcy50b2tlblN0b3JlLmNvdW50KHRlcm0pLFxuICAgICAgaWRmID0gMVxuXG4gIGlmIChkb2N1bWVudEZyZXF1ZW5jeSA+IDApIHtcbiAgICBpZGYgPSAxICsgTWF0aC5sb2codGhpcy5kb2N1bWVudFN0b3JlLmxlbmd0aCAvIGRvY3VtZW50RnJlcXVlbmN5KVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2lkZkNhY2hlW2NhY2hlS2V5XSA9IGlkZlxufVxuXG4vKipcbiAqIFNlYXJjaGVzIHRoZSBpbmRleCB1c2luZyB0aGUgcGFzc2VkIHF1ZXJ5LlxuICpcbiAqIFF1ZXJpZXMgc2hvdWxkIGJlIGEgc3RyaW5nLCBtdWx0aXBsZSB3b3JkcyBhcmUgYWxsb3dlZCBhbmQgd2lsbCBsZWFkIHRvIGFuXG4gKiBBTkQgYmFzZWQgcXVlcnksIGUuZy4gYGlkeC5zZWFyY2goJ2ZvbyBiYXInKWAgd2lsbCBydW4gYSBzZWFyY2ggZm9yXG4gKiBkb2N1bWVudHMgY29udGFpbmluZyBib3RoICdmb28nIGFuZCAnYmFyJy5cbiAqXG4gKiBBbGwgcXVlcnkgdG9rZW5zIGFyZSBwYXNzZWQgdGhyb3VnaCB0aGUgc2FtZSBwaXBlbGluZSB0aGF0IGRvY3VtZW50IHRva2Vuc1xuICogYXJlIHBhc3NlZCB0aHJvdWdoLCBzbyBhbnkgbGFuZ3VhZ2UgcHJvY2Vzc2luZyBpbnZvbHZlZCB3aWxsIGJlIHJ1biBvbiBldmVyeVxuICogcXVlcnkgdGVybS5cbiAqXG4gKiBFYWNoIHF1ZXJ5IHRlcm0gaXMgZXhwYW5kZWQsIHNvIHRoYXQgdGhlIHRlcm0gJ2hlJyBtaWdodCBiZSBleHBhbmRlZCB0b1xuICogJ2hlbGxvJyBhbmQgJ2hlbHAnIGlmIHRob3NlIHRlcm1zIHdlcmUgYWxyZWFkeSBpbmNsdWRlZCBpbiB0aGUgaW5kZXguXG4gKlxuICogTWF0Y2hpbmcgZG9jdW1lbnRzIGFyZSByZXR1cm5lZCBhcyBhbiBhcnJheSBvZiBvYmplY3RzLCBlYWNoIG9iamVjdCBjb250YWluc1xuICogdGhlIG1hdGNoaW5nIGRvY3VtZW50IHJlZiwgYXMgc2V0IGZvciB0aGlzIGluZGV4LCBhbmQgdGhlIHNpbWlsYXJpdHkgc2NvcmVcbiAqIGZvciB0aGlzIGRvY3VtZW50IGFnYWluc3QgdGhlIHF1ZXJ5LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VhcmNoIHRoZSBpbmRleCB3aXRoLlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLmlkZlxuICogQHNlZSBJbmRleC5wcm90b3R5cGUuZG9jdW1lbnRWZWN0b3JcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgdmFyIHF1ZXJ5VG9rZW5zID0gdGhpcy5waXBlbGluZS5ydW4odGhpcy50b2tlbml6ZXJGbihxdWVyeSkpLFxuICAgICAgcXVlcnlWZWN0b3IgPSBuZXcgbHVuci5WZWN0b3IsXG4gICAgICBkb2N1bWVudFNldHMgPSBbXSxcbiAgICAgIGZpZWxkQm9vc3RzID0gdGhpcy5fZmllbGRzLnJlZHVjZShmdW5jdGlvbiAobWVtbywgZikgeyByZXR1cm4gbWVtbyArIGYuYm9vc3QgfSwgMClcblxuICB2YXIgaGFzU29tZVRva2VuID0gcXVlcnlUb2tlbnMuc29tZShmdW5jdGlvbiAodG9rZW4pIHtcbiAgICByZXR1cm4gdGhpcy50b2tlblN0b3JlLmhhcyh0b2tlbilcbiAgfSwgdGhpcylcblxuICBpZiAoIWhhc1NvbWVUb2tlbikgcmV0dXJuIFtdXG5cbiAgcXVlcnlUb2tlbnNcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAodG9rZW4sIGksIHRva2Vucykge1xuICAgICAgdmFyIHRmID0gMSAvIHRva2Vucy5sZW5ndGggKiB0aGlzLl9maWVsZHMubGVuZ3RoICogZmllbGRCb29zdHMsXG4gICAgICAgICAgc2VsZiA9IHRoaXNcblxuICAgICAgdmFyIHNldCA9IHRoaXMudG9rZW5TdG9yZS5leHBhbmQodG9rZW4pLnJlZHVjZShmdW5jdGlvbiAobWVtbywga2V5KSB7XG4gICAgICAgIHZhciBwb3MgPSBzZWxmLmNvcnB1c1Rva2Vucy5pbmRleE9mKGtleSksXG4gICAgICAgICAgICBpZGYgPSBzZWxmLmlkZihrZXkpLFxuICAgICAgICAgICAgc2ltaWxhcml0eUJvb3N0ID0gMSxcbiAgICAgICAgICAgIHNldCA9IG5ldyBsdW5yLlNvcnRlZFNldFxuXG4gICAgICAgIC8vIGlmIHRoZSBleHBhbmRlZCBrZXkgaXMgbm90IGFuIGV4YWN0IG1hdGNoIHRvIHRoZSB0b2tlbiB0aGVuXG4gICAgICAgIC8vIHBlbmFsaXNlIHRoZSBzY29yZSBmb3IgdGhpcyBrZXkgYnkgaG93IGRpZmZlcmVudCB0aGUga2V5IGlzXG4gICAgICAgIC8vIHRvIHRoZSB0b2tlbi5cbiAgICAgICAgaWYgKGtleSAhPT0gdG9rZW4pIHtcbiAgICAgICAgICB2YXIgZGlmZiA9IE1hdGgubWF4KDMsIGtleS5sZW5ndGggLSB0b2tlbi5sZW5ndGgpXG4gICAgICAgICAgc2ltaWxhcml0eUJvb3N0ID0gMSAvIE1hdGgubG9nKGRpZmYpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHF1ZXJ5IHRmLWlkZiBzY29yZSBmb3IgdGhpcyB0b2tlblxuICAgICAgICAvLyBhcHBseWluZyBhbiBzaW1pbGFyaXR5Qm9vc3QgdG8gZW5zdXJlIGV4YWN0IG1hdGNoZXNcbiAgICAgICAgLy8gdGhlc2UgcmFuayBoaWdoZXIgdGhhbiBleHBhbmRlZCB0ZXJtc1xuICAgICAgICBpZiAocG9zID4gLTEpIHF1ZXJ5VmVjdG9yLmluc2VydChwb3MsIHRmICogaWRmICogc2ltaWxhcml0eUJvb3N0KVxuXG4gICAgICAgIC8vIGFkZCBhbGwgdGhlIGRvY3VtZW50cyB0aGF0IGhhdmUgdGhpcyBrZXkgaW50byBhIHNldFxuICAgICAgICAvLyBlbnN1cmluZyB0aGF0IHRoZSB0eXBlIG9mIGtleSBpcyBwcmVzZXJ2ZWRcbiAgICAgICAgdmFyIG1hdGNoaW5nRG9jdW1lbnRzID0gc2VsZi50b2tlblN0b3JlLmdldChrZXkpLFxuICAgICAgICAgICAgcmVmcyA9IE9iamVjdC5rZXlzKG1hdGNoaW5nRG9jdW1lbnRzKSxcbiAgICAgICAgICAgIHJlZnNMZW4gPSByZWZzLmxlbmd0aFxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVmc0xlbjsgaSsrKSB7XG4gICAgICAgICAgc2V0LmFkZChtYXRjaGluZ0RvY3VtZW50c1tyZWZzW2ldXS5yZWYpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVtby51bmlvbihzZXQpXG4gICAgICB9LCBuZXcgbHVuci5Tb3J0ZWRTZXQpXG5cbiAgICAgIGRvY3VtZW50U2V0cy5wdXNoKHNldClcbiAgICB9LCB0aGlzKVxuXG4gIHZhciBkb2N1bWVudFNldCA9IGRvY3VtZW50U2V0cy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIHNldCkge1xuICAgIHJldHVybiBtZW1vLmludGVyc2VjdChzZXQpXG4gIH0pXG5cbiAgcmV0dXJuIGRvY3VtZW50U2V0XG4gICAgLm1hcChmdW5jdGlvbiAocmVmKSB7XG4gICAgICByZXR1cm4geyByZWY6IHJlZiwgc2NvcmU6IHF1ZXJ5VmVjdG9yLnNpbWlsYXJpdHkodGhpcy5kb2N1bWVudFZlY3RvcihyZWYpKSB9XG4gICAgfSwgdGhpcylcbiAgICAuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlXG4gICAgfSlcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSB2ZWN0b3IgY29udGFpbmluZyBhbGwgdGhlIHRva2VucyBpbiB0aGUgZG9jdW1lbnQgbWF0Y2hpbmcgdGhlXG4gKiBwYXNzZWQgZG9jdW1lbnRSZWYuXG4gKlxuICogVGhlIHZlY3RvciBjb250YWlucyB0aGUgdGYtaWRmIHNjb3JlIGZvciBlYWNoIHRva2VuIGNvbnRhaW5lZCBpbiB0aGVcbiAqIGRvY3VtZW50IHdpdGggdGhlIHBhc3NlZCBkb2N1bWVudFJlZi4gIFRoZSB2ZWN0b3Igd2lsbCBjb250YWluIGFuIGVsZW1lbnRcbiAqIGZvciBldmVyeSB0b2tlbiBpbiB0aGUgaW5kZXhlcyBjb3JwdXMsIGlmIHRoZSBkb2N1bWVudCBkb2VzIG5vdCBjb250YWluIHRoYXRcbiAqIHRva2VuIHRoZSBlbGVtZW50IHdpbGwgYmUgMC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jdW1lbnRSZWYgVGhlIHJlZiB0byBmaW5kIHRoZSBkb2N1bWVudCB3aXRoLlxuICogQHJldHVybnMge2x1bnIuVmVjdG9yfVxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5kb2N1bWVudFZlY3RvciA9IGZ1bmN0aW9uIChkb2N1bWVudFJlZikge1xuICB2YXIgZG9jdW1lbnRUb2tlbnMgPSB0aGlzLmRvY3VtZW50U3RvcmUuZ2V0KGRvY3VtZW50UmVmKSxcbiAgICAgIGRvY3VtZW50VG9rZW5zTGVuZ3RoID0gZG9jdW1lbnRUb2tlbnMubGVuZ3RoLFxuICAgICAgZG9jdW1lbnRWZWN0b3IgPSBuZXcgbHVuci5WZWN0b3JcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRvY3VtZW50VG9rZW5zTGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSBkb2N1bWVudFRva2Vucy5lbGVtZW50c1tpXSxcbiAgICAgICAgdGYgPSB0aGlzLnRva2VuU3RvcmUuZ2V0KHRva2VuKVtkb2N1bWVudFJlZl0udGYsXG4gICAgICAgIGlkZiA9IHRoaXMuaWRmKHRva2VuKVxuXG4gICAgZG9jdW1lbnRWZWN0b3IuaW5zZXJ0KHRoaXMuY29ycHVzVG9rZW5zLmluZGV4T2YodG9rZW4pLCB0ZiAqIGlkZilcbiAgfTtcblxuICByZXR1cm4gZG9jdW1lbnRWZWN0b3Jcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIGluZGV4IHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHZlcnNpb246IGx1bnIudmVyc2lvbixcbiAgICBmaWVsZHM6IHRoaXMuX2ZpZWxkcyxcbiAgICByZWY6IHRoaXMuX3JlZixcbiAgICB0b2tlbml6ZXI6IHRoaXMudG9rZW5pemVyRm4ubGFiZWwsXG4gICAgZG9jdW1lbnRTdG9yZTogdGhpcy5kb2N1bWVudFN0b3JlLnRvSlNPTigpLFxuICAgIHRva2VuU3RvcmU6IHRoaXMudG9rZW5TdG9yZS50b0pTT04oKSxcbiAgICBjb3JwdXNUb2tlbnM6IHRoaXMuY29ycHVzVG9rZW5zLnRvSlNPTigpLFxuICAgIHBpcGVsaW5lOiB0aGlzLnBpcGVsaW5lLnRvSlNPTigpXG4gIH1cbn1cblxuLyoqXG4gKiBBcHBsaWVzIGEgcGx1Z2luIHRvIHRoZSBjdXJyZW50IGluZGV4LlxuICpcbiAqIEEgcGx1Z2luIGlzIGEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2l0aCB0aGUgaW5kZXggYXMgaXRzIGNvbnRleHQuXG4gKiBQbHVnaW5zIGNhbiBiZSB1c2VkIHRvIGN1c3RvbWlzZSBvciBleHRlbmQgdGhlIGJlaGF2aW91ciB0aGUgaW5kZXhcbiAqIGluIHNvbWUgd2F5LiBBIHBsdWdpbiBpcyBqdXN0IGEgZnVuY3Rpb24sIHRoYXQgZW5jYXBzdWxhdGVkIHRoZSBjdXN0b21cbiAqIGJlaGF2aW91ciB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBpbmRleC5cbiAqXG4gKiBUaGUgcGx1Z2luIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGluZGV4IGFzIGl0cyBhcmd1bWVudCwgYWRkaXRpb25hbFxuICogYXJndW1lbnRzIGNhbiBhbHNvIGJlIHBhc3NlZCB3aGVuIGNhbGxpbmcgdXNlLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWRcbiAqIHdpdGggdGhlIGluZGV4IGFzIGl0cyBjb250ZXh0LlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIHZhciBteVBsdWdpbiA9IGZ1bmN0aW9uIChpZHgsIGFyZzEsIGFyZzIpIHtcbiAqICAgICAgIC8vIGB0aGlzYCBpcyB0aGUgaW5kZXggdG8gYmUgZXh0ZW5kZWRcbiAqICAgICAgIC8vIGFwcGx5IGFueSBleHRlbnNpb25zIGV0YyBoZXJlLlxuICogICAgIH1cbiAqXG4gKiAgICAgdmFyIGlkeCA9IGx1bnIoZnVuY3Rpb24gKCkge1xuICogICAgICAgdGhpcy51c2UobXlQbHVnaW4sICdhcmcxJywgJ2FyZzInKVxuICogICAgIH0pXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGx1Z2luIFRoZSBwbHVnaW4gdG8gYXBwbHkuXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gKHBsdWdpbikge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgYXJncy51bnNoaWZ0KHRoaXMpXG4gIHBsdWdpbi5hcHBseSh0aGlzLCBhcmdzKVxufVxuLyohXG4gKiBsdW5yLlN0b3JlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlN0b3JlIGlzIGEgc2ltcGxlIGtleS12YWx1ZSBzdG9yZSB1c2VkIGZvciBzdG9yaW5nIHNldHMgb2YgdG9rZW5zIGZvclxuICogZG9jdW1lbnRzIHN0b3JlZCBpbiBpbmRleC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBtb2R1bGVcbiAqL1xubHVuci5TdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zdG9yZSA9IHt9XG4gIHRoaXMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHN0b3JlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHN0b3JlIHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5TdG9yZX1cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZERhdGEpIHtcbiAgdmFyIHN0b3JlID0gbmV3IHRoaXNcblxuICBzdG9yZS5sZW5ndGggPSBzZXJpYWxpc2VkRGF0YS5sZW5ndGhcbiAgc3RvcmUuc3RvcmUgPSBPYmplY3Qua2V5cyhzZXJpYWxpc2VkRGF0YS5zdG9yZSkucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBrZXkpIHtcbiAgICBtZW1vW2tleV0gPSBsdW5yLlNvcnRlZFNldC5sb2FkKHNlcmlhbGlzZWREYXRhLnN0b3JlW2tleV0pXG4gICAgcmV0dXJuIG1lbW9cbiAgfSwge30pXG5cbiAgcmV0dXJuIHN0b3JlXG59XG5cbi8qKlxuICogU3RvcmVzIHRoZSBnaXZlbiB0b2tlbnMgaW4gdGhlIHN0b3JlIGFnYWluc3QgdGhlIGdpdmVuIGlkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUga2V5IHVzZWQgdG8gc3RvcmUgdGhlIHRva2VucyBhZ2FpbnN0LlxuICogQHBhcmFtIHtPYmplY3R9IHRva2VucyBUaGUgdG9rZW5zIHRvIHN0b3JlIGFnYWluc3QgdGhlIGtleS5cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoaWQsIHRva2Vucykge1xuICBpZiAoIXRoaXMuaGFzKGlkKSkgdGhpcy5sZW5ndGgrK1xuICB0aGlzLnN0b3JlW2lkXSA9IHRva2Vuc1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgdG9rZW5zIGZyb20gdGhlIHN0b3JlIGZvciBhIGdpdmVuIGtleS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGtleSB0byBsb29rdXAgYW5kIHJldHJpZXZlIGZyb20gdGhlIHN0b3JlLlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgcmV0dXJuIHRoaXMuc3RvcmVbaWRdXG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIHN0b3JlIGNvbnRhaW5zIGEga2V5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUgaWQgdG8gbG9vayB1cCBpbiB0aGUgc3RvcmUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoaWQpIHtcbiAgcmV0dXJuIGlkIGluIHRoaXMuc3RvcmVcbn1cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSB2YWx1ZSBmb3IgYSBrZXkgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUgaWQgdG8gcmVtb3ZlIGZyb20gdGhlIHN0b3JlLlxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpZCkge1xuICBpZiAoIXRoaXMuaGFzKGlkKSkgcmV0dXJuXG5cbiAgZGVsZXRlIHRoaXMuc3RvcmVbaWRdXG4gIHRoaXMubGVuZ3RoLS1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHN0b3JlIHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgIGxlbmd0aDogdGhpcy5sZW5ndGhcbiAgfVxufVxuXG4vKiFcbiAqIGx1bnIuc3RlbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICogSW5jbHVkZXMgY29kZSBmcm9tIC0gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluL1BvcnRlclN0ZW1tZXIvanMudHh0XG4gKi9cblxuLyoqXG4gKiBsdW5yLnN0ZW1tZXIgaXMgYW4gZW5nbGlzaCBsYW5ndWFnZSBzdGVtbWVyLCB0aGlzIGlzIGEgSmF2YVNjcmlwdFxuICogaW1wbGVtZW50YXRpb24gb2YgdGhlIFBvcnRlclN0ZW1tZXIgdGFrZW4gZnJvbSBodHRwOi8vdGFydGFydXMub3JnL35tYXJ0aW5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gc3RlbVxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICovXG5sdW5yLnN0ZW1tZXIgPSAoZnVuY3Rpb24oKXtcbiAgdmFyIHN0ZXAybGlzdCA9IHtcbiAgICAgIFwiYXRpb25hbFwiIDogXCJhdGVcIixcbiAgICAgIFwidGlvbmFsXCIgOiBcInRpb25cIixcbiAgICAgIFwiZW5jaVwiIDogXCJlbmNlXCIsXG4gICAgICBcImFuY2lcIiA6IFwiYW5jZVwiLFxuICAgICAgXCJpemVyXCIgOiBcIml6ZVwiLFxuICAgICAgXCJibGlcIiA6IFwiYmxlXCIsXG4gICAgICBcImFsbGlcIiA6IFwiYWxcIixcbiAgICAgIFwiZW50bGlcIiA6IFwiZW50XCIsXG4gICAgICBcImVsaVwiIDogXCJlXCIsXG4gICAgICBcIm91c2xpXCIgOiBcIm91c1wiLFxuICAgICAgXCJpemF0aW9uXCIgOiBcIml6ZVwiLFxuICAgICAgXCJhdGlvblwiIDogXCJhdGVcIixcbiAgICAgIFwiYXRvclwiIDogXCJhdGVcIixcbiAgICAgIFwiYWxpc21cIiA6IFwiYWxcIixcbiAgICAgIFwiaXZlbmVzc1wiIDogXCJpdmVcIixcbiAgICAgIFwiZnVsbmVzc1wiIDogXCJmdWxcIixcbiAgICAgIFwib3VzbmVzc1wiIDogXCJvdXNcIixcbiAgICAgIFwiYWxpdGlcIiA6IFwiYWxcIixcbiAgICAgIFwiaXZpdGlcIiA6IFwiaXZlXCIsXG4gICAgICBcImJpbGl0aVwiIDogXCJibGVcIixcbiAgICAgIFwibG9naVwiIDogXCJsb2dcIlxuICAgIH0sXG5cbiAgICBzdGVwM2xpc3QgPSB7XG4gICAgICBcImljYXRlXCIgOiBcImljXCIsXG4gICAgICBcImF0aXZlXCIgOiBcIlwiLFxuICAgICAgXCJhbGl6ZVwiIDogXCJhbFwiLFxuICAgICAgXCJpY2l0aVwiIDogXCJpY1wiLFxuICAgICAgXCJpY2FsXCIgOiBcImljXCIsXG4gICAgICBcImZ1bFwiIDogXCJcIixcbiAgICAgIFwibmVzc1wiIDogXCJcIlxuICAgIH0sXG5cbiAgICBjID0gXCJbXmFlaW91XVwiLCAgICAgICAgICAvLyBjb25zb25hbnRcbiAgICB2ID0gXCJbYWVpb3V5XVwiLCAgICAgICAgICAvLyB2b3dlbFxuICAgIEMgPSBjICsgXCJbXmFlaW91eV0qXCIsICAgIC8vIGNvbnNvbmFudCBzZXF1ZW5jZVxuICAgIFYgPSB2ICsgXCJbYWVpb3VdKlwiLCAgICAgIC8vIHZvd2VsIHNlcXVlbmNlXG5cbiAgICBtZ3IwID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDLCAgICAgICAgICAgICAgIC8vIFtDXVZDLi4uIGlzIG0+MFxuICAgIG1lcTEgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgViArIEMgKyBcIihcIiArIFYgKyBcIik/JFwiLCAgLy8gW0NdVkNbVl0gaXMgbT0xXG4gICAgbWdyMSA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQyArIFYgKyBDLCAgICAgICAvLyBbQ11WQ1ZDLi4uIGlzIG0+MVxuICAgIHNfdiA9IFwiXihcIiArIEMgKyBcIik/XCIgKyB2OyAgICAgICAgICAgICAgICAgICAvLyB2b3dlbCBpbiBzdGVtXG5cbiAgdmFyIHJlX21ncjAgPSBuZXcgUmVnRXhwKG1ncjApO1xuICB2YXIgcmVfbWdyMSA9IG5ldyBSZWdFeHAobWdyMSk7XG4gIHZhciByZV9tZXExID0gbmV3IFJlZ0V4cChtZXExKTtcbiAgdmFyIHJlX3NfdiA9IG5ldyBSZWdFeHAoc192KTtcblxuICB2YXIgcmVfMWEgPSAvXiguKz8pKHNzfGkpZXMkLztcbiAgdmFyIHJlMl8xYSA9IC9eKC4rPykoW15zXSlzJC87XG4gIHZhciByZV8xYiA9IC9eKC4rPyllZWQkLztcbiAgdmFyIHJlMl8xYiA9IC9eKC4rPykoZWR8aW5nKSQvO1xuICB2YXIgcmVfMWJfMiA9IC8uJC87XG4gIHZhciByZTJfMWJfMiA9IC8oYXR8Ymx8aXopJC87XG4gIHZhciByZTNfMWJfMiA9IG5ldyBSZWdFeHAoXCIoW15hZWlvdXlsc3pdKVxcXFwxJFwiKTtcbiAgdmFyIHJlNF8xYl8yID0gbmV3IFJlZ0V4cChcIl5cIiArIEMgKyB2ICsgXCJbXmFlaW91d3h5XSRcIik7XG5cbiAgdmFyIHJlXzFjID0gL14oLis/W15hZWlvdV0peSQvO1xuICB2YXIgcmVfMiA9IC9eKC4rPykoYXRpb25hbHx0aW9uYWx8ZW5jaXxhbmNpfGl6ZXJ8YmxpfGFsbGl8ZW50bGl8ZWxpfG91c2xpfGl6YXRpb258YXRpb258YXRvcnxhbGlzbXxpdmVuZXNzfGZ1bG5lc3N8b3VzbmVzc3xhbGl0aXxpdml0aXxiaWxpdGl8bG9naSkkLztcblxuICB2YXIgcmVfMyA9IC9eKC4rPykoaWNhdGV8YXRpdmV8YWxpemV8aWNpdGl8aWNhbHxmdWx8bmVzcykkLztcblxuICB2YXIgcmVfNCA9IC9eKC4rPykoYWx8YW5jZXxlbmNlfGVyfGljfGFibGV8aWJsZXxhbnR8ZW1lbnR8bWVudHxlbnR8b3V8aXNtfGF0ZXxpdGl8b3VzfGl2ZXxpemUpJC87XG4gIHZhciByZTJfNCA9IC9eKC4rPykoc3x0KShpb24pJC87XG5cbiAgdmFyIHJlXzUgPSAvXiguKz8pZSQvO1xuICB2YXIgcmVfNV8xID0gL2xsJC87XG4gIHZhciByZTNfNSA9IG5ldyBSZWdFeHAoXCJeXCIgKyBDICsgdiArIFwiW15hZWlvdXd4eV0kXCIpO1xuXG4gIHZhciBwb3J0ZXJTdGVtbWVyID0gZnVuY3Rpb24gcG9ydGVyU3RlbW1lcih3KSB7XG4gICAgdmFyICAgc3RlbSxcbiAgICAgIHN1ZmZpeCxcbiAgICAgIGZpcnN0Y2gsXG4gICAgICByZSxcbiAgICAgIHJlMixcbiAgICAgIHJlMyxcbiAgICAgIHJlNDtcblxuICAgIGlmICh3Lmxlbmd0aCA8IDMpIHsgcmV0dXJuIHc7IH1cblxuICAgIGZpcnN0Y2ggPSB3LnN1YnN0cigwLDEpO1xuICAgIGlmIChmaXJzdGNoID09IFwieVwiKSB7XG4gICAgICB3ID0gZmlyc3RjaC50b1VwcGVyQ2FzZSgpICsgdy5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxYVxuICAgIHJlID0gcmVfMWFcbiAgICByZTIgPSByZTJfMWE7XG5cbiAgICBpZiAocmUudGVzdCh3KSkgeyB3ID0gdy5yZXBsYWNlKHJlLFwiJDEkMlwiKTsgfVxuICAgIGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7IHcgPSB3LnJlcGxhY2UocmUyLFwiJDEkMlwiKTsgfVxuXG4gICAgLy8gU3RlcCAxYlxuICAgIHJlID0gcmVfMWI7XG4gICAgcmUyID0gcmUyXzFiO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3QoZnBbMV0pKSB7XG4gICAgICAgIHJlID0gcmVfMWJfMjtcbiAgICAgICAgdyA9IHcucmVwbGFjZShyZSxcIlwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZTIuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlMiA9IHJlX3NfdjtcbiAgICAgIGlmIChyZTIudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgICAgcmUyID0gcmUyXzFiXzI7XG4gICAgICAgIHJlMyA9IHJlM18xYl8yO1xuICAgICAgICByZTQgPSByZTRfMWJfMjtcbiAgICAgICAgaWYgKHJlMi50ZXN0KHcpKSB7ICB3ID0gdyArIFwiZVwiOyB9XG4gICAgICAgIGVsc2UgaWYgKHJlMy50ZXN0KHcpKSB7IHJlID0gcmVfMWJfMjsgdyA9IHcucmVwbGFjZShyZSxcIlwiKTsgfVxuICAgICAgICBlbHNlIGlmIChyZTQudGVzdCh3KSkgeyB3ID0gdyArIFwiZVwiOyB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxYyAtIHJlcGxhY2Ugc3VmZml4IHkgb3IgWSBieSBpIGlmIHByZWNlZGVkIGJ5IGEgbm9uLXZvd2VsIHdoaWNoIGlzIG5vdCB0aGUgZmlyc3QgbGV0dGVyIG9mIHRoZSB3b3JkIChzbyBjcnkgLT4gY3JpLCBieSAtPiBieSwgc2F5IC0+IHNheSlcbiAgICByZSA9IHJlXzFjO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgdyA9IHN0ZW0gKyBcImlcIjtcbiAgICB9XG5cbiAgICAvLyBTdGVwIDJcbiAgICByZSA9IHJlXzI7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICBzdWZmaXggPSBmcFsyXTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtICsgc3RlcDJsaXN0W3N1ZmZpeF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCAzXG4gICAgcmUgPSByZV8zO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgc3VmZml4ID0gZnBbMl07XG4gICAgICByZSA9IHJlX21ncjA7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbSArIHN0ZXAzbGlzdFtzdWZmaXhdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgNFxuICAgIHJlID0gcmVfNDtcbiAgICByZTIgPSByZTJfNDtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlID0gcmVfbWdyMTtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmUyLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlMi5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdICsgZnBbMl07XG4gICAgICByZTIgPSByZV9tZ3IxO1xuICAgICAgaWYgKHJlMi50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgNVxuICAgIHJlID0gcmVfNTtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlID0gcmVfbWdyMTtcbiAgICAgIHJlMiA9IHJlX21lcTE7XG4gICAgICByZTMgPSByZTNfNTtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pIHx8IChyZTIudGVzdChzdGVtKSAmJiAhKHJlMy50ZXN0KHN0ZW0pKSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmUgPSByZV81XzE7XG4gICAgcmUyID0gcmVfbWdyMTtcbiAgICBpZiAocmUudGVzdCh3KSAmJiByZTIudGVzdCh3KSkge1xuICAgICAgcmUgPSByZV8xYl8yO1xuICAgICAgdyA9IHcucmVwbGFjZShyZSxcIlwiKTtcbiAgICB9XG5cbiAgICAvLyBhbmQgdHVybiBpbml0aWFsIFkgYmFjayB0byB5XG5cbiAgICBpZiAoZmlyc3RjaCA9PSBcInlcIikge1xuICAgICAgdyA9IGZpcnN0Y2gudG9Mb3dlckNhc2UoKSArIHcuc3Vic3RyKDEpO1xuICAgIH1cblxuICAgIHJldHVybiB3O1xuICB9O1xuXG4gIHJldHVybiBwb3J0ZXJTdGVtbWVyO1xufSkoKTtcblxubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uKGx1bnIuc3RlbW1lciwgJ3N0ZW1tZXInKVxuLyohXG4gKiBsdW5yLnN0b3BXb3JkRmlsdGVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLmdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIgYnVpbGRzIGEgc3RvcFdvcmRGaWx0ZXIgZnVuY3Rpb24gZnJvbSB0aGUgcHJvdmlkZWRcbiAqIGxpc3Qgb2Ygc3RvcCB3b3Jkcy5cbiAqXG4gKiBUaGUgYnVpbHQgaW4gbHVuci5zdG9wV29yZEZpbHRlciBpcyBidWlsdCB1c2luZyB0aGlzIGdlbmVyYXRvciBhbmQgY2FuIGJlIHVzZWRcbiAqIHRvIGdlbmVyYXRlIGN1c3RvbSBzdG9wV29yZEZpbHRlcnMgZm9yIGFwcGxpY2F0aW9ucyBvciBub24gRW5nbGlzaCBsYW5ndWFnZXMuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtBcnJheX0gdG9rZW4gVGhlIHRva2VuIHRvIHBhc3MgdGhyb3VnaCB0aGUgZmlsdGVyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqIEBzZWUgbHVuci5zdG9wV29yZEZpbHRlclxuICovXG5sdW5yLmdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIgPSBmdW5jdGlvbiAoc3RvcFdvcmRzKSB7XG4gIHZhciB3b3JkcyA9IHN0b3BXb3Jkcy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIHN0b3BXb3JkKSB7XG4gICAgbWVtb1tzdG9wV29yZF0gPSBzdG9wV29yZFxuICAgIHJldHVybiBtZW1vXG4gIH0sIHt9KVxuXG4gIHJldHVybiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICBpZiAodG9rZW4gJiYgd29yZHNbdG9rZW5dICE9PSB0b2tlbikgcmV0dXJuIHRva2VuXG4gIH1cbn1cblxuLyoqXG4gKiBsdW5yLnN0b3BXb3JkRmlsdGVyIGlzIGFuIEVuZ2xpc2ggbGFuZ3VhZ2Ugc3RvcCB3b3JkIGxpc3QgZmlsdGVyLCBhbnkgd29yZHNcbiAqIGNvbnRhaW5lZCBpbiB0aGUgbGlzdCB3aWxsIG5vdCBiZSBwYXNzZWQgdGhyb3VnaCB0aGUgZmlsdGVyLlxuICpcbiAqIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCBpbiB0aGUgUGlwZWxpbmUuIElmIHRoZSB0b2tlbiBkb2VzIG5vdCBwYXNzIHRoZVxuICogZmlsdGVyIHRoZW4gdW5kZWZpbmVkIHdpbGwgYmUgcmV0dXJuZWQuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICovXG5sdW5yLnN0b3BXb3JkRmlsdGVyID0gbHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyKFtcbiAgJ2EnLFxuICAnYWJsZScsXG4gICdhYm91dCcsXG4gICdhY3Jvc3MnLFxuICAnYWZ0ZXInLFxuICAnYWxsJyxcbiAgJ2FsbW9zdCcsXG4gICdhbHNvJyxcbiAgJ2FtJyxcbiAgJ2Ftb25nJyxcbiAgJ2FuJyxcbiAgJ2FuZCcsXG4gICdhbnknLFxuICAnYXJlJyxcbiAgJ2FzJyxcbiAgJ2F0JyxcbiAgJ2JlJyxcbiAgJ2JlY2F1c2UnLFxuICAnYmVlbicsXG4gICdidXQnLFxuICAnYnknLFxuICAnY2FuJyxcbiAgJ2Nhbm5vdCcsXG4gICdjb3VsZCcsXG4gICdkZWFyJyxcbiAgJ2RpZCcsXG4gICdkbycsXG4gICdkb2VzJyxcbiAgJ2VpdGhlcicsXG4gICdlbHNlJyxcbiAgJ2V2ZXInLFxuICAnZXZlcnknLFxuICAnZm9yJyxcbiAgJ2Zyb20nLFxuICAnZ2V0JyxcbiAgJ2dvdCcsXG4gICdoYWQnLFxuICAnaGFzJyxcbiAgJ2hhdmUnLFxuICAnaGUnLFxuICAnaGVyJyxcbiAgJ2hlcnMnLFxuICAnaGltJyxcbiAgJ2hpcycsXG4gICdob3cnLFxuICAnaG93ZXZlcicsXG4gICdpJyxcbiAgJ2lmJyxcbiAgJ2luJyxcbiAgJ2ludG8nLFxuICAnaXMnLFxuICAnaXQnLFxuICAnaXRzJyxcbiAgJ2p1c3QnLFxuICAnbGVhc3QnLFxuICAnbGV0JyxcbiAgJ2xpa2UnLFxuICAnbGlrZWx5JyxcbiAgJ21heScsXG4gICdtZScsXG4gICdtaWdodCcsXG4gICdtb3N0JyxcbiAgJ211c3QnLFxuICAnbXknLFxuICAnbmVpdGhlcicsXG4gICdubycsXG4gICdub3InLFxuICAnbm90JyxcbiAgJ29mJyxcbiAgJ29mZicsXG4gICdvZnRlbicsXG4gICdvbicsXG4gICdvbmx5JyxcbiAgJ29yJyxcbiAgJ290aGVyJyxcbiAgJ291cicsXG4gICdvd24nLFxuICAncmF0aGVyJyxcbiAgJ3NhaWQnLFxuICAnc2F5JyxcbiAgJ3NheXMnLFxuICAnc2hlJyxcbiAgJ3Nob3VsZCcsXG4gICdzaW5jZScsXG4gICdzbycsXG4gICdzb21lJyxcbiAgJ3RoYW4nLFxuICAndGhhdCcsXG4gICd0aGUnLFxuICAndGhlaXInLFxuICAndGhlbScsXG4gICd0aGVuJyxcbiAgJ3RoZXJlJyxcbiAgJ3RoZXNlJyxcbiAgJ3RoZXknLFxuICAndGhpcycsXG4gICd0aXMnLFxuICAndG8nLFxuICAndG9vJyxcbiAgJ3R3YXMnLFxuICAndXMnLFxuICAnd2FudHMnLFxuICAnd2FzJyxcbiAgJ3dlJyxcbiAgJ3dlcmUnLFxuICAnd2hhdCcsXG4gICd3aGVuJyxcbiAgJ3doZXJlJyxcbiAgJ3doaWNoJyxcbiAgJ3doaWxlJyxcbiAgJ3dobycsXG4gICd3aG9tJyxcbiAgJ3doeScsXG4gICd3aWxsJyxcbiAgJ3dpdGgnLFxuICAnd291bGQnLFxuICAneWV0JyxcbiAgJ3lvdScsXG4gICd5b3VyJ1xuXSlcblxubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uKGx1bnIuc3RvcFdvcmRGaWx0ZXIsICdzdG9wV29yZEZpbHRlcicpXG4vKiFcbiAqIGx1bnIudHJpbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci50cmltbWVyIGlzIGEgcGlwZWxpbmUgZnVuY3Rpb24gZm9yIHRyaW1taW5nIG5vbiB3b3JkXG4gKiBjaGFyYWN0ZXJzIGZyb20gdGhlIGJlZ2luaW5nIGFuZCBlbmQgb2YgdG9rZW5zIGJlZm9yZSB0aGV5XG4gKiBlbnRlciB0aGUgaW5kZXguXG4gKlxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiBtYXkgbm90IHdvcmsgY29ycmVjdGx5IGZvciBub24gbGF0aW5cbiAqIGNoYXJhY3RlcnMgYW5kIHNob3VsZCBlaXRoZXIgYmUgcmVtb3ZlZCBvciBhZGFwdGVkIGZvciB1c2VcbiAqIHdpdGggbGFuZ3VhZ2VzIHdpdGggbm9uLWxhdGluIGNoYXJhY3RlcnMuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICovXG5sdW5yLnRyaW1tZXIgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgcmV0dXJuIHRva2VuLnJlcGxhY2UoL15cXFcrLywgJycpLnJlcGxhY2UoL1xcVyskLywgJycpXG59XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnRyaW1tZXIsICd0cmltbWVyJylcbi8qIVxuICogbHVuci5zdGVtbWVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKiBJbmNsdWRlcyBjb2RlIGZyb20gLSBodHRwOi8vdGFydGFydXMub3JnL35tYXJ0aW4vUG9ydGVyU3RlbW1lci9qcy50eHRcbiAqL1xuXG4vKipcbiAqIGx1bnIuVG9rZW5TdG9yZSBpcyB1c2VkIGZvciBlZmZpY2llbnQgc3RvcmluZyBhbmQgbG9va3VwIG9mIHRoZSByZXZlcnNlXG4gKiBpbmRleCBvZiB0b2tlbiB0byBkb2N1bWVudCByZWYuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuVG9rZW5TdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yb290ID0geyBkb2NzOiB7fSB9XG4gIHRoaXMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHRva2VuIHN0b3JlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHRva2VuIHN0b3JlIHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlblN0b3JlfVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZERhdGEpIHtcbiAgdmFyIHN0b3JlID0gbmV3IHRoaXNcblxuICBzdG9yZS5yb290ID0gc2VyaWFsaXNlZERhdGEucm9vdFxuICBzdG9yZS5sZW5ndGggPSBzZXJpYWxpc2VkRGF0YS5sZW5ndGhcblxuICByZXR1cm4gc3RvcmVcbn1cblxuLyoqXG4gKiBBZGRzIGEgbmV3IHRva2VuIGRvYyBwYWlyIHRvIHRoZSBzdG9yZS5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gc3RvcmUgdGhlIGRvYyB1bmRlclxuICogQHBhcmFtIHtPYmplY3R9IGRvYyBUaGUgZG9jIHRvIHN0b3JlIGFnYWluc3QgdGhlIHRva2VuXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0IGxvb2tpbmcgZm9yIHRoZVxuICogY29ycmVjdCBwbGFjZSB0byBlbnRlciB0aGUgZG9jLCBieSBkZWZhdWx0IHRoZSByb290IG9mIHRoaXMgbHVuci5Ub2tlblN0b3JlXG4gKiBpcyB1c2VkLlxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodG9rZW4sIGRvYywgcm9vdCkge1xuICB2YXIgcm9vdCA9IHJvb3QgfHwgdGhpcy5yb290LFxuICAgICAga2V5ID0gdG9rZW4uY2hhckF0KDApLFxuICAgICAgcmVzdCA9IHRva2VuLnNsaWNlKDEpXG5cbiAgaWYgKCEoa2V5IGluIHJvb3QpKSByb290W2tleV0gPSB7ZG9jczoge319XG5cbiAgaWYgKHJlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcm9vdFtrZXldLmRvY3NbZG9jLnJlZl0gPSBkb2NcbiAgICB0aGlzLmxlbmd0aCArPSAxXG4gICAgcmV0dXJuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkKHJlc3QsIGRvYywgcm9vdFtrZXldKVxuICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBrZXkgaXMgY29udGFpbmVkIHdpdGhpbiB0aGlzIGx1bnIuVG9rZW5TdG9yZS5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gY2hlY2sgZm9yXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uICh0b2tlbikge1xuICBpZiAoIXRva2VuKSByZXR1cm4gZmFsc2VcblxuICB2YXIgbm9kZSA9IHRoaXMucm9vdFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIW5vZGVbdG9rZW4uY2hhckF0KGkpXSkgcmV0dXJuIGZhbHNlXG5cbiAgICBub2RlID0gbm9kZVt0b2tlbi5jaGFyQXQoaSldXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG4vKipcbiAqIFJldHJpZXZlIGEgbm9kZSBmcm9tIHRoZSB0b2tlbiBzdG9yZSBmb3IgYSBnaXZlbiB0b2tlbi5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gZ2V0IHRoZSBub2RlIGZvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQHNlZSBUb2tlblN0b3JlLnByb3RvdHlwZS5nZXRcbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuZ2V0Tm9kZSA9IGZ1bmN0aW9uICh0b2tlbikge1xuICBpZiAoIXRva2VuKSByZXR1cm4ge31cblxuICB2YXIgbm9kZSA9IHRoaXMucm9vdFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIW5vZGVbdG9rZW4uY2hhckF0KGkpXSkgcmV0dXJuIHt9XG5cbiAgICBub2RlID0gbm9kZVt0b2tlbi5jaGFyQXQoaSldXG4gIH1cblxuICByZXR1cm4gbm9kZVxufVxuXG4vKipcbiAqIFJldHJpZXZlIHRoZSBkb2N1bWVudHMgZm9yIGEgbm9kZSBmb3IgdGhlIGdpdmVuIHRva2VuLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhpcyBmdW5jdGlvbiBzdGFydHMgYXQgdGhlIHJvb3Qgb2YgdGhlIGN1cnJlbnQgc3RvcmUsIGhvd2V2ZXJcbiAqIGl0IGNhbiBzdGFydCBhdCBhbnkgbm9kZSBvZiBhbnkgdG9rZW4gc3RvcmUgaWYgcmVxdWlyZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBnZXQgdGhlIGRvY3VtZW50cyBmb3IuXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0LlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHRva2VuLCByb290KSB7XG4gIHJldHVybiB0aGlzLmdldE5vZGUodG9rZW4sIHJvb3QpLmRvY3MgfHwge31cbn1cblxubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5jb3VudCA9IGZ1bmN0aW9uICh0b2tlbiwgcm9vdCkge1xuICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5nZXQodG9rZW4sIHJvb3QpKS5sZW5ndGhcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGRvY3VtZW50IGlkZW50aWZpZWQgYnkgcmVmIGZyb20gdGhlIHRva2VuIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gZ2V0IHRoZSBkb2N1bWVudHMgZm9yLlxuICogQHBhcmFtIHtTdHJpbmd9IHJlZiBUaGUgcmVmIG9mIHRoZSBkb2N1bWVudCB0byByZW1vdmUgZnJvbSB0aGlzIHRva2VuLlxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICh0b2tlbiwgcmVmKSB7XG4gIGlmICghdG9rZW4pIHJldHVyblxuICB2YXIgbm9kZSA9IHRoaXMucm9vdFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoISh0b2tlbi5jaGFyQXQoaSkgaW4gbm9kZSkpIHJldHVyblxuICAgIG5vZGUgPSBub2RlW3Rva2VuLmNoYXJBdChpKV1cbiAgfVxuXG4gIGRlbGV0ZSBub2RlLmRvY3NbcmVmXVxufVxuXG4vKipcbiAqIEZpbmQgYWxsIHRoZSBwb3NzaWJsZSBzdWZmaXhlcyBvZiB0aGUgcGFzc2VkIHRva2VuIHVzaW5nIHRva2Vuc1xuICogY3VycmVudGx5IGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGV4cGFuZC5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuZXhwYW5kID0gZnVuY3Rpb24gKHRva2VuLCBtZW1vKSB7XG4gIHZhciByb290ID0gdGhpcy5nZXROb2RlKHRva2VuKSxcbiAgICAgIGRvY3MgPSByb290LmRvY3MgfHwge30sXG4gICAgICBtZW1vID0gbWVtbyB8fCBbXVxuXG4gIGlmIChPYmplY3Qua2V5cyhkb2NzKS5sZW5ndGgpIG1lbW8ucHVzaCh0b2tlbilcblxuICBPYmplY3Qua2V5cyhyb290KVxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09ICdkb2NzJykgcmV0dXJuXG5cbiAgICAgIG1lbW8uY29uY2F0KHRoaXMuZXhwYW5kKHRva2VuICsga2V5LCBtZW1vKSlcbiAgICB9LCB0aGlzKVxuXG4gIHJldHVybiBtZW1vXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0b2tlbiBzdG9yZSByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgcm9vdDogdGhpcy5yb290LFxuICAgIGxlbmd0aDogdGhpcy5sZW5ndGhcbiAgfVxufVxuXG4gIC8qKlxuICAgKiBleHBvcnQgdGhlIG1vZHVsZSB2aWEgQU1ELCBDb21tb25KUyBvciBhcyBhIGJyb3dzZXIgZ2xvYmFsXG4gICAqIEV4cG9ydCBjb2RlIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3VtZGpzL3VtZC9ibG9iL21hc3Rlci9yZXR1cm5FeHBvcnRzLmpzXG4gICAqL1xuICA7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgZGVmaW5lKGZhY3RvcnkpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIC8qKlxuICAgICAgICogTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgICAgKiBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgICAgICogbGlrZSBOb2RlLlxuICAgICAgICovXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgICAgcm9vdC5sdW5yID0gZmFjdG9yeSgpXG4gICAgfVxuICB9KHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBKdXN0IHJldHVybiBhIHZhbHVlIHRvIGRlZmluZSB0aGUgbW9kdWxlIGV4cG9ydC5cbiAgICAgKiBUaGlzIGV4YW1wbGUgcmV0dXJucyBhbiBvYmplY3QsIGJ1dCB0aGUgbW9kdWxlXG4gICAgICogY2FuIHJldHVybiBhIGZ1bmN0aW9uIGFzIHRoZSBleHBvcnRlZCB2YWx1ZS5cbiAgICAgKi9cbiAgICByZXR1cm4gbHVuclxuICB9KSlcbn0pKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2x1bnIvbHVuci5qcyIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XHJcbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcclxuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5pbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCJcclxuXHJcbi8qKlxyXG4gKiBAY29uc3RhbnQge3N0cmluZ31cclxuICovXHJcbmNvbnN0IEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQgPSAnZGF0YS1pZCc7XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgaWYgYW4gZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxyXG4gKi9cclxuY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IChlbGVtZW50LCB2aXNpYmxlKSA9PiAodmlzaWJsZSA/IHNob3cgOiBoaWRlKShlbGVtZW50KTtcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYSBzdHJpbmcgaXMgZW1wdHlcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICpcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmNvbnN0IGlzRW1wdHkgPSAodGV4dCkgPT4gKHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJykgJiYgKHRleHQubGVuZ3RoID09PSAwKTtcclxuXHJcbi8qKlxyXG4gKiBQcm9wYWdhdGVzIHJvdyBzZWxlY3Rpb24gdHJvdWdoIHRoZSBldmVudCBzeXN0ZW1cclxuICpcclxuICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5jb25zdCByZWxheUNsaWNrRXZlbnRBcyA9IGN1cnJ5KGZ1bmN0aW9uKHR5cGUsIGV2ZW50ZnVsLCBlbGVtZW50KSB7XHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgIGV2ZW50ZnVsLmZpcmUodHlwZSwge1xyXG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICBpZDogZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGVsZW1lbnQpXHJcbiAgICB9KVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZWxlbWVudDtcclxufSk7XHJcblxyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWxWaWV3IHtcclxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xyXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcclxuXHJcbiAgICAvLyBiYWNrIGJ1dHRvblxyXG4gICAgY29uc3QgYmFja0J1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJhY2tCdXR0b25FbGVtZW50LmNsYXNzTmFtZSA9ICdiYWNrLWJ1dHRvbiBpY29uLWFycm93LXRoaWNrJztcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIGJhY2tCdXR0b25FbGVtZW50KTtcclxuXHJcbiAgICAvLyBpbWFnZVxyXG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgdGhpcy5pbWFnZS5jbGFzc05hbWUgPSAnaW1nLXJlc3BvbnNpdmUnO1xyXG5cclxuICAgIGNvbnN0IGltYWdlV3JhcHBlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGltYWdlV3JhcHBlckVsZW1lbnQuY2xhc3NOYW1lID0gJ2ltYWdlLXdyYXBwZXInO1xyXG4gICAgaW1hZ2VXcmFwcGVyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmltYWdlKTtcclxuXHJcbiAgICAvLyB0aXRsZVxyXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICB0aGlzLnRpdGxlLmNsYXNzTmFtZSA9ICd0aXRsZSc7XHJcblxyXG4gICAgLy8gZGVzY3JpcHRpb25cclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uLmNsYXNzTmFtZSA9ICdkZXNjcmlwdGlvbic7XHJcblxyXG4gICAgLy8gZGVtbyBidXR0b25cclxuICAgIHRoaXMuZGVtb0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIHRoaXMuZGVtb0J1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcclxuICAgIHRoaXMuZGVtb0J1dHRvbi5pbm5lckhUTUwgPSAnQ29udGVudCBEZW1vJztcclxuICAgIHRoaXMuZGVtb0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuICAgIGhpZGUodGhpcy5kZW1vQnV0dG9uKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0RGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGV4dERldGFpbHMuY2xhc3NOYW1lID0gJ3RleHQtZGV0YWlscyc7XHJcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcclxuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMuZGVzY3JpcHRpb24pO1xyXG4gICAgdGV4dERldGFpbHMuYXBwZW5kQ2hpbGQodGhpcy5kZW1vQnV0dG9uKTtcclxuXHJcbiAgICBjb25zdCBkZXRhaWxzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGV0YWlsc0VsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XHJcbiAgICBkZXRhaWxzRWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZVdyYXBwZXJFbGVtZW50KTtcclxuICAgIGRldGFpbHNFbGVtZW50LmFwcGVuZENoaWxkKHRleHREZXRhaWxzKTtcclxuXHJcbiAgICAvLyB1c2UgYnV0dG9uXHJcbiAgICB0aGlzLnVzZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHRoaXMudXNlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24gYnV0dG9uLXByaW1hcnknO1xyXG4gICAgdGhpcy51c2VCdXR0b24uaW5uZXJIVE1MID0gJ1VzZSc7XHJcbiAgICBoaWRlKHRoaXMudXNlQnV0dG9uKTtcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XHJcblxyXG4gICAgLy8gaW5zdGFsbCBidXR0b25cclxuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnknO1xyXG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLmlubmVySFRNTCA9ICdJbnN0YWxsJztcclxuICAgIGhpZGUodGhpcy5pbnN0YWxsQnV0dG9uKTtcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdpbnN0YWxsJywgdGhpcywgdGhpcy5pbnN0YWxsQnV0dG9uKTtcclxuXHJcbiAgICBjb25zdCBidXR0b25CYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJ1dHRvbkJhci5jbGFzc05hbWUgPSAnYnV0dG9uLWJhcic7XHJcbiAgICBidXR0b25CYXIuYXBwZW5kQ2hpbGQodGhpcy51c2VCdXR0b24pO1xyXG4gICAgYnV0dG9uQmFyLmFwcGVuZENoaWxkKHRoaXMuaW5zdGFsbEJ1dHRvbik7XHJcblxyXG4gICAgLy8gbGljZW5jZSBwYW5lbFxyXG4gICAgY29uc3QgbGljZW5jZVBhbmVsID0gdGhpcy5jcmVhdGVQYW5lbCgnVGhlIExpY2VuY2UgSW5mbycsICdpcHN1bSBsb3J1bScsICdsaWNlbmNlLXBhbmVsJyk7XHJcbiAgICBjb25zdCBwbHVnaW5zUGFuZWwgPSB0aGlzLmNyZWF0ZVBhbmVsKCdBdmFpbGFibGUgcGx1Z2lucycsICdpcHN1bSBsb3J1bScsICdwbHVnaW5zLXBhbmVsJyk7XHJcbiAgICBjb25zdCBwdWJsaXNoZXJQYW5lbCA9IHRoaXMuY3JlYXRlUGFuZWwoJ1B1Ymxpc2hlciBJbmZvJywgJ2lwc3VtIGxvcnVtJywgJ3B1Ymxpc2hlci1wYW5lbCcpO1xyXG5cclxuICAgIC8vIHBhbmVsIGdyb3VwXHJcbiAgICBjb25zdCBwYW5lbEdyb3VwRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcGFuZWxHcm91cEVsZW1lbnQuY2xhc3NOYW1lID0gJ3BhbmVsLWdyb3VwJztcclxuICAgIHBhbmVsR3JvdXBFbGVtZW50LmFwcGVuZENoaWxkKGxpY2VuY2VQYW5lbCk7XHJcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5hcHBlbmRDaGlsZChwbHVnaW5zUGFuZWwpO1xyXG4gICAgcGFuZWxHcm91cEVsZW1lbnQuYXBwZW5kQ2hpbGQocHVibGlzaGVyUGFuZWwpO1xyXG5cclxuICAgIC8vIGFkZCByb290IGVsZW1lbnRcclxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoYmFja0J1dHRvbkVsZW1lbnQpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChkZXRhaWxzRWxlbWVudCk7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkJhcik7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHBhbmVsR3JvdXBFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBwYW5lbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keUlkXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBjcmVhdGVQYW5lbCh0aXRsZSwgYm9keSwgYm9keUlkKSB7XHJcbiAgICBjb25zdCBoZWFkZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaGVhZGVyRWwuY2xhc3NOYW1lID0gJ3BhbmVsLWhlYWRlcic7XHJcbiAgICBoZWFkZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcclxuICAgIGhlYWRlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGJvZHlJZCk7XHJcbiAgICBoZWFkZXJFbC5pbm5lckhUTUwgPSB0aXRsZTtcclxuXHJcbiAgICBjb25zdCBib2R5SW5uZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYm9keUlubmVyRWwuY2xhc3NOYW1lID0gJ3BhbmVsLWJvZHktaW5uZXInO1xyXG4gICAgYm9keUlubmVyRWwuaW5uZXJIVE1MID0gYm9keTtcclxuXHJcbiAgICBjb25zdCBib2R5RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJvZHlFbC5jbGFzc05hbWUgPSAncGFuZWwtYm9keSc7XHJcbiAgICBib2R5RWwuaWQgPSBib2R5SWQ7XHJcbiAgICBib2R5RWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcbiAgICBib2R5RWwuYXBwZW5kQ2hpbGQoYm9keUlubmVyRWwpO1xyXG5cclxuICAgIGNvbnN0IHBhbmVsRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHBhbmVsRWwuY2xhc3NOYW1lID0gJ3BhbmVsJztcclxuICAgIHBhbmVsRWwuYXBwZW5kQ2hpbGQoaGVhZGVyRWwpO1xyXG4gICAgcGFuZWxFbC5hcHBlbmRDaGlsZChib2R5RWwpO1xyXG5cclxuICAgIGluaXRQYW5lbChwYW5lbEVsKTtcclxuXHJcbiAgICByZXR1cm4gcGFuZWxFbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGltYWdlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3JjXHJcbiAgICovXHJcbiAgc2V0SW1hZ2Uoc3JjKSB7XHJcbiAgICB0aGlzLmltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHRpdGxlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBzZXRJZChpZCkge1xyXG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XHJcbiAgICB0aGlzLnVzZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdGl0bGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxyXG4gICAqL1xyXG4gIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgbG9uZyBkZXNjcmlwdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgKi9cclxuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IHRleHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBleGFtcGxlIHVybFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxyXG4gICAqL1xyXG4gIHNldEV4YW1wbGUodXJsKSB7XHJcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XHJcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuZGVtb0J1dHRvbiwgIWlzRW1wdHkodXJsKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGlmIHRoZSBjb250ZW50IHR5cGUgaXMgaW5zdGFsbGVkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluc3RhbGxlZFxyXG4gICAqL1xyXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xyXG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLnVzZUJ1dHRvbiwgaW5zdGFsbGVkKTtcclxuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy5pbnN0YWxsQnV0dG9uLCAhaW5zdGFsbGVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICBoaWRlKCkge1xyXG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICBzaG93KCkge1xyXG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVEZXRhaWxWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlld1wiO1xyXG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSBcIi4uL2h1Yi1zZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XHJcblxyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWwge1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIHNlcnZpY2VzXHJcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcclxuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gdmlld3NcclxuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlRGV0YWlsVmlldyhzdGF0ZSk7XHJcbiAgICB0aGlzLnZpZXcub24oJ2luc3RhbGwnLCB0aGlzLmluc3RhbGwsIHRoaXMpO1xyXG5cclxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcclxuICAgIHRoaXMucHJvcGFnYXRlKFsnY2xvc2UnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlcyB0aGUgZGV0YWlsIHZpZXdcclxuICAgKi9cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy52aWV3LmhpZGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRoZSBkZXRhaWwgdmlld1xyXG4gICAqL1xyXG4gIHNob3coKSB7XHJcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxyXG4gICAqL1xyXG4gIGxvYWRCeUlkKGlkKSB7XHJcbiAgICB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxyXG4gICAgICAudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxyXG4gICAqL1xyXG4gICBpbnN0YWxsKHtpZH0pIHtcclxuICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcclxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKVxyXG4gICAgICAgLnRoZW4obWFjaGluZU5hbWUgPT4gdGhpcy5zZXJ2aWNlcy5pbnN0YWxsQ29udGVudFR5cGUobWFjaGluZU5hbWUpKVxyXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gY29uc29sZS5kZWJ1ZygnVE9ETywgZ3VpIHVwZGF0ZXMnKSlcclxuICAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGNvbnRlbnQgdHlwZSBkYXRhXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxyXG4gICAqL1xyXG4gIHVwZGF0ZShjb250ZW50VHlwZSkge1xyXG4gICAgdGhpcy52aWV3LnNldElkKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcclxuICAgIHRoaXMudmlldy5zZXRUaXRsZShjb250ZW50VHlwZS50aXRsZSk7XHJcbiAgICB0aGlzLnZpZXcuc2V0RGVzY3JpcHRpb24oY29udGVudFR5cGUuZGVzY3JpcHRpb24pO1xyXG4gICAgdGhpcy52aWV3LnNldEltYWdlKGNvbnRlbnRUeXBlLmljb24pO1xyXG4gICAgdGhpcy52aWV3LnNldEV4YW1wbGUoY29udGVudFR5cGUuZXhhbXBsZSk7XHJcbiAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQoISFjb250ZW50VHlwZS5pbnN0YWxsZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xyXG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XHJcblxyXG4vKipcclxuICogQGNvbnN0YW50IHtzdHJpbmd9XHJcbiAqL1xyXG5jb25zdCBBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEID0gJ2RhdGEtaWQnO1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuLyoqXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcclxuXHJcbi8qKlxyXG4gKiBQcm9wYWdhdGVzIHJvdyBzZWxlY3Rpb24gdHJvdWdoIHRoZSBldmVudCBzeXN0ZW1cclxuICpcclxuICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5jb25zdCByZWxheUNsaWNrRXZlbnRBcyA9IGN1cnJ5KGZ1bmN0aW9uKHR5cGUsIGV2ZW50ZnVsLCBlbGVtZW50KSB7XHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgIGV2ZW50ZnVsLmZpcmUodHlwZSwge1xyXG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICBpZDogZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGVsZW1lbnQpXHJcbiAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGVsZW1lbnQ7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdFZpZXcge1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcblxyXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgcm9vdCBlbGVtZW50XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1saXN0JztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICBoaWRlKCkge1xyXG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICBzaG93KCkge1xyXG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcclxuICAgKi9cclxuICB1cGRhdGVMaXN0KGNvbnRlbnRUeXBlcykge1xyXG4gICAgaWYodGhpcy5yb290RWxlbWVudCl7XHJcbiAgICAgIHdoaWxlKHRoaXMucm9vdEVsZW1lbnQuZmlyc3RDaGlsZCApe1xyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5yb290RWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyQ29udGVudFR5cGVMaXN0KGNvbnRlbnRUeXBlcylcclxuICAgICAgLmZvckVhY2goY29udGVudFR5cGUgPT4gdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChjb250ZW50VHlwZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwbGllcyBjcmVhdGUgcm93cywgYW5kIGFkZCB0byB0aGUgbGlzdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XHJcbiAgICovXHJcbiAgcmVuZGVyQ29udGVudFR5cGVMaXN0KGNvbnRlbnRUeXBlcykge1xyXG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlc1xyXG4gICAgICAubWFwKGNvbnRlbnRUeXBlID0+IHRoaXMuY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUpKVxyXG4gICAgICAubWFwKHJlbGF5Q2xpY2tFdmVudEFzKCdyb3ctc2VsZWN0ZWQnLCB0aGlzKSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRha2VzIGEgQ29udGVudCBUeXBlIGNvbmZpZ3VyYXRpb24gYW5kIGNyZWF0ZXMgYSByb3cgZG9tXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUpIHtcclxuICAgIC8vIGltYWdlXHJcbiAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBjb250ZW50VHlwZS5pY29uKTtcclxuXHJcbiAgICAvLyB0aXRsZVxyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRpdGxlLmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtbGlzdC10aXRsZSc7XHJcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBjb250ZW50VHlwZS50aXRsZTtcclxuXHJcbiAgICAvLyBkZXNjcmlwdGlvblxyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRlc2NyaXB0aW9uLmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtbGlzdC1kZXNjcmlwdGlvbic7XHJcbiAgICBkZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBjb250ZW50VHlwZS5zdW1tYXJ5O1xyXG5cclxuICAgIC8vIGxpc3QgaXRlbVxyXG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIHJvdy5pZCA9IGBjb250ZW50LXR5cGUtJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1gO1xyXG4gICAgcm93LnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XHJcbiAgICByb3cuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG4gICAgcm93LmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlQnV0dG9uRWxlbWVudChjb250ZW50VHlwZSkpO1xyXG4gICAgcm93LmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgIHJvdy5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHJvdztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcclxuICAgKi9cclxuICBjcmVhdGVCdXR0b25FbGVtZW50KGNvbnRlbnRUeXBlKSB7XHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblxyXG4gICAgaWYoY29udGVudFR5cGUuaW5zdGFsbGVkKSB7XHJcbiAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBcImJ1dHRvbiBidXR0b24tcHJpbWFyeVwiO1xyXG4gICAgICBidXR0b24uaW5uZXJIVE1MID0gXCJVc2VcIjtcclxuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XHJcbiAgICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCBidXR0b24pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBcImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5XCI7XHJcbiAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcImluc3RhbGxcIjtcclxuICAgICAgLy8gbm8gZnVuY3Rpb25hbGl0eSwgdXNlcyBjbGljayBldmVudCBvbiByb3dcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYnV0dG9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBnZXRFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZUxpc3RWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1saXN0LXZpZXdcIjtcclxuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3NcclxuICogQG1peGVzIEV2ZW50ZnVsXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3Qge1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIGFkZCB0aGUgdmlld1xyXG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVMaXN0VmlldyhzdGF0ZSk7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3Jvdy1zZWxlY3RlZCcsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIHRoaXMudmlldy5zaG93KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXHJcbiAgICovXHJcbiAgdXBkYXRlKGNvbnRlbnRUeXBlcykge1xyXG4gICAgdGhpcy52aWV3LnVwZGF0ZUxpc3QoY29udGVudFR5cGVzKTtcclxuICB9XHJcblxyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsImltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIENvbnRlbnRCcm93c2VyVmlld1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRCcm93c2VyVmlldyB7XHJcbiAgLyoqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRzXHJcbiAgICBjb25zdCBtZW51ID0gdGhpcy5jcmVhdGVNZW51RWxlbWVudCgpO1xyXG4gICAgY29uc3QgaW5wdXRHcm91cCA9IHRoaXMuY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQoKTtcclxuXHJcbiAgICAvLyBtZW51IGdyb3VwXHJcbiAgICBjb25zdCBtZW51R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG1lbnVHcm91cC5jbGFzc05hbWUgPSAnbWVudS1ncm91cCc7XHJcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQobWVudSk7XHJcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRHcm91cCk7XHJcblxyXG4gICAgLy8gcm9vdCBlbGVtZW50XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50ICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChtZW51R3JvdXApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIG1lbnUgaXRlbVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGFkZE1lbnVJdGVtKHRleHQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWl0ZW0nKTtcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcclxuXHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICB0aGlzLmZpcmUoJ21lbnUtc2VsZWN0ZWQnLCB7XHJcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gc2V0cyBmaXJzdCB0byBiZSBzZWxlY3RlZFxyXG4gICAgaWYodGhpcy5tZW51QmFyRWxlbWVudC5jaGlsZEVsZW1lbnRDb3VudCA8IDEpIHtcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCB0byBtZW51IGJhclxyXG4gICAgdGhpcy5tZW51QmFyRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIG1lbnUgYmFyIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9XHJcbiAgICovXHJcbiAgY3JlYXRlTWVudUVsZW1lbnQoKSB7XHJcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIHRoaXMubWVudUJhckVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnViYXInKTtcclxuICAgIHRoaXMubWVudUJhckVsZW1lbnQuY2xhc3NOYW1lID0gJ2g1cC1tZW51JztcclxuXHJcbiAgICBjb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XHJcbiAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubWVudUJhckVsZW1lbnQpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aXRsZS5jbGFzc05hbWUgPSBcIm1lbnUtdGl0bGVcIjtcclxuICAgIHRpdGxlLmlubmVySFRNTCA9IFwiQnJvd3NlIGNvbnRlbnQgdHlwZXNcIjtcclxuXHJcbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBtZW51LmNsYXNzTmFtZSA9IFwibWVudVwiO1xyXG4gICAgbWVudS5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICBtZW51LmFwcGVuZENoaWxkKG5hdkVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiBtZW51O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgaW5wdXQgZ3JvdXAgdXNlZCBmb3Igc2VhcmNoXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBjcmVhdGVJbnB1dEdyb3VwRWxlbWVudCgpIHtcclxuICAgIC8vIGlucHV0IGZpZWxkXHJcbiAgICBjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGlucHV0RmllbGQuY2xhc3NOYW1lID0gJ2h1Yi1zZWFyY2ggc2hhZG93JztcclxuICAgIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICAgIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIFwiU2VhcmNoIGZvciBDb250ZW50IFR5cGVzXCIpO1xyXG4gICAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcclxuICAgICAgdGhpcy5maXJlKCdzZWFyY2gnLCB7XHJcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxyXG4gICAgICAgIHF1ZXJ5OiBldmVudC50YXJnZXQudmFsdWVcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBpbnB1dCBidXR0b25cclxuICAgIGNvbnN0IGlucHV0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpbnB1dEJ1dHRvbi5jbGFzc05hbWUgPSAnaW5wdXQtYnV0dG9uIGljb24tc2VhcmNoJztcclxuXHJcbiAgICAvLyBpbnB1dCBncm91cFxyXG4gICAgY29uc3QgaW5wdXRHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSAnaW5wdXQtZ3JvdXAgcm91bmRlZCBzaGFkb3cnO1xyXG4gICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEZpZWxkKTtcclxuICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRCdXR0b24pO1xyXG5cclxuICAgIC8vIHdyYXBwZXJcclxuICAgIGNvbnN0IGlucHV0R3JvdXBXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpbnB1dEdyb3VwV3JhcHBlci5jbGFzc05hbWUgPSAnaW5wdXQtZ3JvdXAtd3JhcHBlciByb3VuZGVkJztcclxuICAgIGlucHV0R3JvdXBXcmFwcGVyLmFwcGVuZENoaWxkKGlucHV0R3JvdXApO1xyXG5cclxuICAgIHJldHVybiBpbnB1dEdyb3VwV3JhcHBlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBnZXRFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsImltcG9ydCBDb250ZW50VHlwZVNlY3Rpb25WaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXdcIjtcclxuaW1wb3J0IFNlYXJjaFNlcnZpY2UgZnJvbSBcIi4uL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlXCI7XHJcbmltcG9ydCBDb250ZW50VHlwZUxpc3QgZnJvbSAnLi4vY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QnO1xyXG5pbXBvcnQgQ29udGVudFR5cGVEZXRhaWwgZnJvbSAnLi4vY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsJztcclxuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcclxuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4uL3V0aWxzL2Vycm9ycyc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIENvbnRlbnRUeXBlU2VjdGlvblxyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlU2VjdGlvbiB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xyXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcclxuXHJcbiAgICAvLyBhZGQgdmlld1xyXG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRlbnRUeXBlU2VjdGlvblZpZXcoc3RhdGUpO1xyXG5cclxuICAgIC8vIGNvbnRyb2xsZXJcclxuICAgIHRoaXMuc2VhcmNoU2VydmljZSA9IG5ldyBTZWFyY2hTZXJ2aWNlKHsgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybCB9KTtcclxuICAgIHRoaXMuY29udGVudFR5cGVMaXN0ID0gbmV3IENvbnRlbnRUeXBlTGlzdCgpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbCA9IG5ldyBDb250ZW50VHlwZURldGFpbCh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XHJcblxyXG4gICAgLy8gYWRkIG1lbnUgaXRlbXNcclxuICAgIFsnTXkgQ29udGVudCBUeXBlcycsICdOZXdlc3QnLCAnTW9zdCBQb3B1bGFyJywgJ1JlY29tbWVuZGVkJ11cclxuICAgICAgLmZvckVhY2gobWVudVRleHQgPT4gdGhpcy52aWV3LmFkZE1lbnVJdGVtKG1lbnVUZXh0KSk7XHJcblxyXG4gICAgLy8gc2V0IHN1YiB2aWV3IChUT0RPIGZpbmQgb3RoZXIgd2F5KVxyXG4gICAgdGhpcy52aWV3LmdldEVsZW1lbnQoKS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlTGlzdC5nZXRFbGVtZW50KCkpO1xyXG4gICAgdGhpcy52aWV3LmdldEVsZW1lbnQoKS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmdldEVsZW1lbnQoKSk7XHJcblxyXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZUxpc3QpO1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XHJcblxyXG4gICAgLy8gcmVnaXN0ZXIgbGlzdGVuZXJzXHJcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMuc2VhcmNoLCB0aGlzKTtcclxuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMuYXBwbHlTZWFyY2hGaWx0ZXIsIHRoaXMpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Qub24oJ3Jvdy1zZWxlY3RlZCcsIHRoaXMuc2hvd0RldGFpbFZpZXcsIHRoaXMpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5pbml0Q29udGVudFR5cGVMaXN0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0IHdpdGggYSBzZWFyY2hcclxuICAgKi9cclxuICBpbml0Q29udGVudFR5cGVMaXN0KCkge1xyXG4gICAgLy8gaW5pdGlhbGl6ZSBieSBzZWFyY2hcclxuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goXCJcIilcclxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5maXJlKCdlcnJvcicsIGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlcyBhIHNlYXJjaCBhbmQgdXBkYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3RcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxyXG4gICAqL1xyXG4gIHNlYXJjaCh7cXVlcnl9KSB7XHJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KVxyXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdWxkIGFwcGx5IGEgc2VhcmNoIGZpbHRlclxyXG4gICAqL1xyXG4gIGFwcGx5U2VhcmNoRmlsdGVyKCkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnQ29udGVudFR5cGVTZWN0aW9uOiBtZW51IHdhcyBjbGlja2VkIScsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIGRldGFpbCB2aWV3XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBzaG93RGV0YWlsVmlldyh7aWR9KSB7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5oaWRlKCk7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmxvYWRCeUlkKGlkKTtcclxuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuc2hvdygpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlIGRldGFpbCB2aWV3XHJcbiAgICovXHJcbiAgY2xvc2VEZXRhaWxWaWV3KCkge1xyXG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5oaWRlKCk7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5zaG93KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBnZXRFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwiaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiXHJcbmltcG9ydCBpbml0VGFiUGFuZWwgZnJvbSBcImNvbXBvbmVudHMvdGFiLXBhbmVsXCJcclxuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XHJcblxyXG4vKipcclxuICogQGNvbnN0XHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5jb25zdCBBVFRSSUJVVEVfQVJJQV9FWFBBTkRFRCA9IFwiYXJpYS1leHBhbmRlZFwiO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IGlzRXhwYW5kZWQgPSBhdHRyaWJ1dGVFcXVhbHMoQVRUUklCVVRFX0FSSUFfRVhQQU5ERUQsICd0cnVlJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJWaWV3IHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICB0aGlzLnJlbmRlclRhYlBhbmVsKHN0YXRlKTtcclxuICAgIHRoaXMucmVuZGVyUGFuZWwoc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIHRoZSBwYW5lbFxyXG4gICAqL1xyXG4gIGNsb3NlUGFuZWwoKSB7XHJcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSB0aXRsZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcbiAgICovXHJcbiAgc2V0VGl0bGUodGl0bGUpIHtcclxuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSBwYW5lbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwYW5kZWRcclxuICAgKi9cclxuICByZW5kZXJQYW5lbCh7dGl0bGUgPSAnJywgc2VjdGlvbklkID0gJ2NyZWF0ZS1jb250ZW50JywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnRpdGxlLmNsYXNzTmFtZSArPSBcInBhbmVsLWhlYWRlciBpY29uLWh1Yi1pY29uXCI7XHJcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcclxuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YCk7XHJcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuYm9keS5jbGFzc05hbWUgKz0gXCJwYW5lbC1ib2R5XCI7XHJcbiAgICB0aGlzLmJvZHkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xyXG4gICAgdGhpcy5ib2R5LmlkID0gYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YDtcclxuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSArPSBgaDVwLWh1YiBoNXAtc2VjdGlvbi0ke3NlY3Rpb25JZH0gcGFuZWxgO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5ib2R5KTtcclxuXHJcbiAgICBpbml0UGFuZWwodGhpcy5yb290RWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSB0YWIgcGFuZWxcclxuICAgKi9cclxuICByZW5kZXJUYWJQYW5lbChzdGF0ZSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGFibGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICB0aGlzLnRhYmxpc3QuY2xhc3NOYW1lICs9IFwidGFibGlzdFwiO1xyXG4gICAgdGhpcy50YWJsaXN0LnNldEF0dHJpYnV0ZSAoJ3JvbGUnLCAndGFibGlzdCcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XHJcbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKHRoaXMudGFibGlzdCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmNsYXNzTmFtZSArPSAndGFiLXBhbmVsJztcclxuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRhYkxpc3RXcmFwcGVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSB0YWJcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRlbnRcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkXHJcbiAgICovXHJcbiAgYWRkVGFiKHt0aXRsZSwgaWQsIGNvbnRlbnQsIHNlbGVjdGVkID0gZmFsc2V9KSB7XHJcbiAgICBjb25zdCB0YWJJZCA9IGB0YWItJHtpZH1gO1xyXG4gICAgY29uc3QgdGFiUGFuZWxJZCA9IGB0YWItcGFuZWwtJHtpZH1gO1xyXG5cclxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICB0YWIuY2xhc3NOYW1lICs9ICd0YWInO1xyXG4gICAgdGFiLmlkID0gdGFiSWQ7XHJcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgdGFiUGFuZWxJZCk7XHJcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQudG9TdHJpbmcoKSk7XHJcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYicpO1xyXG4gICAgdGFiLmlubmVySFRNTCA9IHRpdGxlO1xyXG5cclxuICAgIGNvbnN0IHRhYlBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0YWJQYW5lbC5pZCA9IHRhYlBhbmVsSWQ7XHJcbiAgICB0YWJQYW5lbC5jbGFzc05hbWUgKz0gJ3RhYnBhbmVsJztcclxuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJsbGVkYnknLCB0YWJJZCk7XHJcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgKCFzZWxlY3RlZCkudG9TdHJpbmcoKSk7XHJcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcclxuICAgIHRhYlBhbmVsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG5cclxuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZCh0YWIpO1xyXG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRhYlBhbmVsKTtcclxuICB9XHJcblxyXG4gIGluaXRUYWJQYW5lbCgpIHtcclxuICAgIGluaXRUYWJQYW5lbCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgc2VjdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxyXG4gICAqL1xyXG4gIHNldFNlY3Rpb24oc2VjdGlvbklkKSB7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSA9IGBoNXAtaHViIGg1cC1zZWN0aW9uLSR7c2VjdGlvbklkfSBwYW5lbGA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsImltcG9ydCB7Y3VycnksIG1hcCwgZmlsdGVyfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiXHJcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tIFwiLi4vaHViLXNlcnZpY2VzXCI7XHJcbmltcG9ydCBsdW5yIGZyb20gXCJsdW5yXCJcclxuXHJcbmNvbnN0IGZpbmRDb250ZW50VHlwZUJ5TWFjaGluZU5hbWUgPSBjdXJyeShmdW5jdGlvbihjb250ZW50VHlwZXMsIG1hY2hpbmVOYW1lKSB7XHJcbiAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcclxufSk7XHJcblxyXG5cclxuLyoqXHJcbiAqIEFkZHMgYSBjb250ZW50IHR5cGUgdG8gdGhlIHNlYXJjaCBpbmRleFxyXG4gKlxyXG4gKiBAcGFyYW0gIHtsdW5yLkluZGV4fSBpbmRleFxyXG4gKiBAcGFyYW0gIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcclxuICpcclxuICogQHJldHVybiB7Q29udGVudFR5cGV9XHJcbiAqL1xyXG5jb25zdCBhZGRUb0luZGV4ID0gY3VycnkoKGluZGV4LCBjb250ZW50VHlwZSkgPT4ge1xyXG4gIGluZGV4LmFkZCh7XHJcbiAgICB0aXRsZTogY29udGVudFR5cGUudGl0bGUsXHJcbiAgICBzdW1tYXJ5OiBjb250ZW50VHlwZS5zdW1tYXJ5LFxyXG4gICAgaWQ6IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBjb250ZW50VHlwZTtcclxufSk7XHJcblxyXG4vKipcclxuICogQGNsYXNzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hTZXJ2aWNlIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUuYXBpUm9vdFVybFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcclxuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2V0IHVwIGx1bnIgaW5kZXhcclxuICAgIHRoaXMuaW5kZXggPSBsdW5yKGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLmZpZWxkKCd0aXRsZScsIHtib29zdDogMTAwfSk7XHJcbiAgICAgIHRoaXMuZmllbGQoJ3N1bW1hcnknKTtcclxuICAgICAgdGhpcy5maWVsZCgnZGVzY3JpcHRpb24nKTtcclxuICAgICAgdGhpcy5maWVsZCgna2V5d29yZHMnKTtcclxuICAgICAgdGhpcy5yZWYoJ2lkJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlcyA9IHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKClcclxuICAgICAgLnRoZW4obWFwKGFkZFRvSW5kZXgodGhpcy5pbmRleCkpKTsgLy8gQWRkIGNvbnRlbnQgdHlwZXMgdG8gc2VhcmNoIGluZGV4XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtcyBhIHNlYXJjaFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW10+fVxyXG4gICAqL1xyXG4gIHNlYXJjaChxdWVyeSkge1xyXG4gICAgLy8gRGlzcGxheSBhbGwgY29udGVudCB0eXBlcyBieSBkZWZhdWx0XHJcbiAgICBpZiAocXVlcnkgPT09ICcnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRUeXBlcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbmRleC5zZWFyY2gocXVlcnkpXHJcbiAgICAgICAgLm1hcChyZXN1bHQgPT4gcmVzdWx0LnJlZilcclxuICAgICAgICAubWFwKGZpbmRDb250ZW50VHlwZUJ5TWFjaGluZU5hbWUoY29udGVudFR5cGVzKSlcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIi8qKlxyXG4gKiBAY2xhc3NcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiVE9ETyBVcGxvYWRcIjtcclxuICAgIHJldHVybiBlbGVtZW50O1xyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwicmVxdWlyZSgnLi4vLi4vc3JjL3N0eWxlcy9tYWluLnNjc3MnKTtcclxuXHJcbi8vIExvYWQgbGlicmFyeVxyXG5INVAgPSBINVAgfHwge307XHJcbkg1UC5IdWJDbGllbnQgPSByZXF1aXJlKCcuLi9zY3JpcHRzL2h1YicpLmRlZmF1bHQ7XHJcbkg1UC5IdWJDbGllbnQucmVuZGVyRXJyb3JNZXNzYWdlID0gcmVxdWlyZSgnLi4vc2NyaXB0cy91dGlscy9lcnJvcnMnKS5kZWZhdWx0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==