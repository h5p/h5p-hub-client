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
  // console.log(message);
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
  if (!isExpanded) {
    hide(bodyElement);
    //bodyElement.style.height = "0";
  } else /*if(bodyElement.scrollHeight > 0)*/{
      show(bodyElement);
      //bodyElement.style.height = `${bodyElement.scrollHeight}px`;
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
 * @class
 * @mixes Eventful
 * @fires Hub#select
 * @fires Hub#error
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
    // only initialize the main panel if no errors have occured when updating the content type list
    this.contentTypeSection.on('update-content-type-list', this.view.initializePanel.bind(this.view), this.contentTypeSection);

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
    this.title = document.createElement('h3');

    // author
    this.author = document.createElement('div');
    this.author.className = 'author';
    this.author.innerHTML = 'by Joubel'; // TODO Make dynamic

    // description
    this.description = document.createElement('p');
    this.description.className = 'small';

    // demo button
    this.demoButton = document.createElement('a');
    this.demoButton.className = 'button';
    this.demoButton.innerHTML = 'Content Demo';
    this.demoButton.setAttribute('target', '_blank');
    _hide(this.demoButton);

    var textDetails = document.createElement('div');
    textDetails.className = 'text-details';
    textDetails.appendChild(this.title);
    textDetails.appendChild(this.author);
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
      image.className = 'img-responsive';
      image.setAttribute('src', contentType.icon);

      // title
      var title = document.createElement('h4');
      title.innerHTML = contentType.title;

      // description
      var description = document.createElement('div');
      description.className = 'description';
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
 * Row selected event
 * @event ContentTypeList#row-selected
 * @type {SelectedElement}
 */
/**
 * @class
 * @mixes Eventful
 *
 * @fires Hub#select
 * @fires ContentTypeList#row-selected
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
      this.view.updateList(contentTypes);
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
      inputField.className = 'form-control form-control-rounded';
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
      inputButton.className = 'input-group-addon icon-search';

      // input group
      var inputGroup = document.createElement('div');
      inputGroup.className = 'input-group';
      inputGroup.appendChild(inputField);
      inputGroup.appendChild(inputButton);

      return inputGroup;
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
    this.propagate(['select', 'update-content-type-list'], this.contentTypeList);
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
      this.panel = document.createElement('div');
      this.panel.className += "panel h5p-section-" + sectionId;
      this.panel.appendChild(this.title);
      this.panel.appendChild(this.body);

      /**
       * @type {HTMLElement}
       */
      this.rootElement = document.createElement('div');
      this.rootElement.className += "h5p h5p-hub";
      this.rootElement.appendChild(this.panel);
    }

    /**
     * Give the panel attribiutes from h5p-sdk, e.g. opening and closing
     * This is only called once no errors have occured in loading the hub 
     */

  }, {
    key: "initializePanel",
    value: function initializePanel() {
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
      this.panel.className = "h5p-section-" + sectionId + " panel";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjkwNTcyZGZhMWMyMzAxNDNiYzciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9mdW5jdGlvbmFsLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sdW5yL2x1bnIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sIm5hbWVzIjpbIkV2ZW50ZnVsIiwibGlzdGVuZXJzIiwib24iLCJ0eXBlIiwibGlzdGVuZXIiLCJzY29wZSIsInRyaWdnZXIiLCJwdXNoIiwiZmlyZSIsImV2ZW50IiwidHJpZ2dlcnMiLCJldmVyeSIsImNhbGwiLCJwcm9wYWdhdGUiLCJ0eXBlcyIsImV2ZW50ZnVsIiwic2VsZiIsImZvckVhY2giLCJjdXJyeSIsImZuIiwiYXJpdHkiLCJsZW5ndGgiLCJmMSIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJmMiIsImFyZ3MyIiwiY29uY2F0IiwiY29tcG9zZSIsImZucyIsInJlZHVjZSIsImYiLCJnIiwiYXJyIiwibWFwIiwiZmlsdGVyIiwic29tZSIsImNvbnRhaW5zIiwidmFsdWUiLCJpbmRleE9mIiwid2l0aG91dCIsInZhbHVlcyIsImludmVyc2VCb29sZWFuU3RyaW5nIiwiYm9vbCIsInRvU3RyaW5nIiwiZ2V0QXR0cmlidXRlIiwibmFtZSIsImVsIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiYXR0cmlidXRlRXF1YWxzIiwidG9nZ2xlQXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJwYXJlbnQiLCJjaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW5kZXJFcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwiY2xvc2VCdXR0b24iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJtZXNzYWdlQ29udGVudCIsInRpdGxlIiwiY29udGVudCIsIm1lc3NhZ2VXcmFwcGVyIiwiZGlzbWlzc2libGUiLCJidXR0b24iLCJ1bmRlZmluZWQiLCJtZXNzYWdlQnV0dG9uIiwiY29uc29sZSIsImxvZyIsIkh1YlNlcnZpY2VzIiwiYXBpUm9vdFVybCIsIndpbmRvdyIsImNhY2hlZENvbnRlbnRUeXBlcyIsImZldGNoIiwibWV0aG9kIiwiY3JlZGVudGlhbHMiLCJ0aGVuIiwicmVzdWx0IiwianNvbiIsImlzVmFsaWQiLCJsaWJyYXJpZXMiLCJyZXNwb25zZSIsIm1lc3NhZ2VDb2RlIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJtYWNoaW5lTmFtZSIsImNvbnRlbnRUeXBlcyIsImNvbnRlbnRUeXBlIiwiaWQiLCJib2R5IiwiaW5pdCIsImlzRXhwYW5kZWQiLCJoaWRlIiwic2hvdyIsInRvZ2dsZUJvZHlWaXNpYmlsaXR5IiwiYm9keUVsZW1lbnQiLCJvbkFyaWFFeHBhbmRlZENoYW5nZSIsInRhcmdldCIsImVsZW1lbnQiLCJ0aXRsZUVsIiwiYm9keUlkIiwiYm9keUVsIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVPbGRWYWx1ZSIsImF0dHJpYnV0ZUZpbHRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJIdWIiLCJzdGF0ZSIsImNvbnRlbnRUeXBlU2VjdGlvbiIsInVwbG9hZFNlY3Rpb24iLCJ2aWV3Iiwic2VydmljZXMiLCJzZXRQYW5lbFRpdGxlIiwiY2xvc2VQYW5lbCIsImluaXRpYWxpemVQYW5lbCIsImJpbmQiLCJpbml0VGFiUGFuZWwiLCJnZXRDb250ZW50VHlwZSIsInNldFRpdGxlIiwidGFiQ29uZmlncyIsImdldEVsZW1lbnQiLCJzZWxlY3RlZCIsImFkZFRhYiIsInRhYkNvbmZpZyIsImhpZGVBbGwiLCJ1blNlbGVjdEFsbCIsInRhYnMiLCJ0YWJQYW5lbHMiLCJ0YWIiLCJ0YWJQYW5lbElkIiwibHVuciIsImNvbmZpZyIsImlkeCIsIkluZGV4IiwicGlwZWxpbmUiLCJhZGQiLCJ0cmltbWVyIiwic3RvcFdvcmRGaWx0ZXIiLCJzdGVtbWVyIiwidmVyc2lvbiIsInV0aWxzIiwid2FybiIsImdsb2JhbCIsImFzU3RyaW5nIiwib2JqIiwiRXZlbnRFbWl0dGVyIiwiZXZlbnRzIiwiYWRkTGlzdGVuZXIiLCJwb3AiLCJuYW1lcyIsIlR5cGVFcnJvciIsImhhc0hhbmRsZXIiLCJyZW1vdmVMaXN0ZW5lciIsImZuSW5kZXgiLCJzcGxpY2UiLCJlbWl0IiwidG9rZW5pemVyIiwiaXNBcnJheSIsInQiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJzcGxpdCIsInNlcGFyYXRvciIsImxvYWQiLCJsYWJlbCIsInJlZ2lzdGVyZWRGdW5jdGlvbnMiLCJFcnJvciIsInJlZ2lzdGVyRnVuY3Rpb24iLCJQaXBlbGluZSIsIl9zdGFjayIsIndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZCIsImlzUmVnaXN0ZXJlZCIsInNlcmlhbGlzZWQiLCJmbk5hbWUiLCJhZnRlciIsImV4aXN0aW5nRm4iLCJuZXdGbiIsInBvcyIsImJlZm9yZSIsInJlbW92ZSIsInJ1biIsInRva2VucyIsIm91dCIsInRva2VuTGVuZ3RoIiwic3RhY2tMZW5ndGgiLCJpIiwidG9rZW4iLCJqIiwicmVzZXQiLCJ0b0pTT04iLCJWZWN0b3IiLCJfbWFnbml0dWRlIiwibGlzdCIsIk5vZGUiLCJ2YWwiLCJuZXh0IiwiaW5zZXJ0IiwicHJldiIsIm1hZ25pdHVkZSIsIm5vZGUiLCJzdW1PZlNxdWFyZXMiLCJNYXRoIiwic3FydCIsImRvdCIsIm90aGVyVmVjdG9yIiwib3RoZXJOb2RlIiwiZG90UHJvZHVjdCIsInNpbWlsYXJpdHkiLCJTb3J0ZWRTZXQiLCJlbGVtZW50cyIsInNlcmlhbGlzZWREYXRhIiwic2V0IiwibG9jYXRpb25Gb3IiLCJ0b0FycmF5IiwiY3R4IiwiZWxlbSIsInN0YXJ0IiwiZW5kIiwic2VjdGlvbkxlbmd0aCIsInBpdm90IiwiZmxvb3IiLCJwaXZvdEVsZW0iLCJpbnRlcnNlY3QiLCJvdGhlclNldCIsImludGVyc2VjdFNldCIsImFfbGVuIiwiYl9sZW4iLCJhIiwiYiIsImNsb25lIiwidW5pb24iLCJsb25nU2V0Iiwic2hvcnRTZXQiLCJ1bmlvblNldCIsInNob3J0U2V0RWxlbWVudHMiLCJfZmllbGRzIiwiX3JlZiIsImRvY3VtZW50U3RvcmUiLCJTdG9yZSIsInRva2VuU3RvcmUiLCJUb2tlblN0b3JlIiwiY29ycHVzVG9rZW5zIiwiZXZlbnRFbWl0dGVyIiwidG9rZW5pemVyRm4iLCJfaWRmQ2FjaGUiLCJvZmYiLCJmaWVsZHMiLCJyZWYiLCJmaWVsZCIsImZpZWxkTmFtZSIsIm9wdHMiLCJib29zdCIsInJlZk5hbWUiLCJkb2MiLCJlbWl0RXZlbnQiLCJkb2NUb2tlbnMiLCJhbGxEb2N1bWVudFRva2VucyIsImRvY1JlZiIsImZpZWxkVG9rZW5zIiwidGYiLCJmaWVsZExlbmd0aCIsInRva2VuQ291bnQiLCJrIiwiaGFzIiwiZ2V0IiwidXBkYXRlIiwiaWRmIiwidGVybSIsImNhY2hlS2V5IiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJkb2N1bWVudEZyZXF1ZW5jeSIsImNvdW50Iiwic2VhcmNoIiwicXVlcnkiLCJxdWVyeVRva2VucyIsInF1ZXJ5VmVjdG9yIiwiZG9jdW1lbnRTZXRzIiwiZmllbGRCb29zdHMiLCJtZW1vIiwiaGFzU29tZVRva2VuIiwiZXhwYW5kIiwia2V5Iiwic2ltaWxhcml0eUJvb3N0IiwiZGlmZiIsIm1heCIsIm1hdGNoaW5nRG9jdW1lbnRzIiwicmVmcyIsImtleXMiLCJyZWZzTGVuIiwiZG9jdW1lbnRTZXQiLCJzY29yZSIsImRvY3VtZW50VmVjdG9yIiwic29ydCIsImRvY3VtZW50UmVmIiwiZG9jdW1lbnRUb2tlbnMiLCJkb2N1bWVudFRva2Vuc0xlbmd0aCIsInVzZSIsInBsdWdpbiIsInVuc2hpZnQiLCJzdG9yZSIsInN0ZXAybGlzdCIsInN0ZXAzbGlzdCIsImMiLCJ2IiwiQyIsIlYiLCJtZ3IwIiwibWVxMSIsIm1ncjEiLCJzX3YiLCJyZV9tZ3IwIiwiUmVnRXhwIiwicmVfbWdyMSIsInJlX21lcTEiLCJyZV9zX3YiLCJyZV8xYSIsInJlMl8xYSIsInJlXzFiIiwicmUyXzFiIiwicmVfMWJfMiIsInJlMl8xYl8yIiwicmUzXzFiXzIiLCJyZTRfMWJfMiIsInJlXzFjIiwicmVfMiIsInJlXzMiLCJyZV80IiwicmUyXzQiLCJyZV81IiwicmVfNV8xIiwicmUzXzUiLCJwb3J0ZXJTdGVtbWVyIiwidyIsInN0ZW0iLCJzdWZmaXgiLCJmaXJzdGNoIiwicmUiLCJyZTIiLCJyZTMiLCJyZTQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInRlc3QiLCJyZXBsYWNlIiwiZnAiLCJleGVjIiwiZ2VuZXJhdGVTdG9wV29yZEZpbHRlciIsInN0b3BXb3JkcyIsIndvcmRzIiwic3RvcFdvcmQiLCJyb290IiwiZG9jcyIsImNoYXJBdCIsInJlc3QiLCJnZXROb2RlIiwiZmFjdG9yeSIsImRlZmluZSIsImV4cG9ydHMiLCJtb2R1bGUiLCJBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEIiwidG9nZ2xlVmlzaWJpbGl0eSIsInZpc2libGUiLCJpc0VtcHR5IiwidGV4dCIsInJlbGF5Q2xpY2tFdmVudEFzIiwiQ29udGVudFR5cGVEZXRhaWxWaWV3IiwiYmFja0J1dHRvbkVsZW1lbnQiLCJpbWFnZSIsImltYWdlV3JhcHBlckVsZW1lbnQiLCJhdXRob3IiLCJkZXNjcmlwdGlvbiIsImRlbW9CdXR0b24iLCJ0ZXh0RGV0YWlscyIsImRldGFpbHNFbGVtZW50IiwidXNlQnV0dG9uIiwiaW5zdGFsbEJ1dHRvbiIsImJ1dHRvbkJhciIsImxpY2VuY2VQYW5lbCIsImNyZWF0ZVBhbmVsIiwicGx1Z2luc1BhbmVsIiwicHVibGlzaGVyUGFuZWwiLCJwYW5lbEdyb3VwRWxlbWVudCIsInJvb3RFbGVtZW50IiwiaGVhZGVyRWwiLCJib2R5SW5uZXJFbCIsInBhbmVsRWwiLCJzcmMiLCJ1cmwiLCJpbnN0YWxsZWQiLCJDb250ZW50VHlwZURldGFpbCIsImluc3RhbGwiLCJpbnN0YWxsQ29udGVudFR5cGUiLCJkZWJ1ZyIsInNldElkIiwic2V0RGVzY3JpcHRpb24iLCJzZXRJbWFnZSIsImljb24iLCJzZXRFeGFtcGxlIiwiZXhhbXBsZSIsInNldElzSW5zdGFsbGVkIiwicHJldmVudERlZmF1bHQiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwicmVuZGVyQ29udGVudFR5cGVMaXN0IiwiY3JlYXRlQ29udGVudFR5cGVSb3ciLCJzdW1tYXJ5Iiwicm93IiwiY3JlYXRlQnV0dG9uRWxlbWVudCIsIkNvbnRlbnRUeXBlTGlzdCIsInVwZGF0ZUxpc3QiLCJDb250ZW50QnJvd3NlclZpZXciLCJtZW51IiwiY3JlYXRlTWVudUVsZW1lbnQiLCJpbnB1dEdyb3VwIiwiY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQiLCJtZW51R3JvdXAiLCJtZW51QmFyRWxlbWVudCIsImNoaWxkRWxlbWVudENvdW50IiwibmF2RWxlbWVudCIsImlucHV0RmllbGQiLCJpbnB1dEJ1dHRvbiIsIkNvbnRlbnRUeXBlU2VjdGlvbiIsInNlYXJjaFNlcnZpY2UiLCJjb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZURldGFpbCIsImFkZE1lbnVJdGVtIiwibWVudVRleHQiLCJhcHBseVNlYXJjaEZpbHRlciIsInNob3dEZXRhaWxWaWV3IiwiY2xvc2VEZXRhaWxWaWV3IiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsImNhdGNoIiwiZXJyb3IiLCJsb2FkQnlJZCIsIkFUVFJJQlVURV9BUklBX0VYUEFOREVEIiwiSHViVmlldyIsInJlbmRlclRhYlBhbmVsIiwicmVuZGVyUGFuZWwiLCJzZWN0aW9uSWQiLCJleHBhbmRlZCIsInRhYkNvbnRhaW5lckVsZW1lbnQiLCJwYW5lbCIsInRhYmxpc3QiLCJ0YWJMaXN0V3JhcHBlciIsInRhYklkIiwidGFiUGFuZWwiLCJmaW5kQ29udGVudFR5cGVCeU1hY2hpbmVOYW1lIiwiYWRkVG9JbmRleCIsImluZGV4IiwiU2VhcmNoU2VydmljZSIsIlVwbG9hZFNlY3Rpb24iLCJyZXF1aXJlIiwiSDVQIiwiSHViQ2xpZW50IiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUE7OztBQUdPLElBQU1BLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxTQUFPO0FBQzdCQyxlQUFXLEVBRGtCOztBQUc3Qjs7Ozs7Ozs7OztBQVVBQyxRQUFJLFlBQVNDLElBQVQsRUFBZUMsUUFBZixFQUF5QkMsS0FBekIsRUFBZ0M7QUFDbEM7Ozs7O0FBS0EsVUFBTUMsVUFBVTtBQUNkLG9CQUFZRixRQURFO0FBRWQsaUJBQVNDO0FBRkssT0FBaEI7O0FBS0EsV0FBS0osU0FBTCxDQUFlRSxJQUFmLElBQXVCLEtBQUtGLFNBQUwsQ0FBZUUsSUFBZixLQUF3QixFQUEvQztBQUNBLFdBQUtGLFNBQUwsQ0FBZUUsSUFBZixFQUFxQkksSUFBckIsQ0FBMEJELE9BQTFCOztBQUVBLGFBQU8sSUFBUDtBQUNELEtBNUI0Qjs7QUE4QjdCOzs7Ozs7Ozs7QUFTQUUsVUFB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bnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDI5MDU3MmRmYTFjMjMwMTQzYmM3IiwiLyoqXG4gKiBAbWl4aW5cbiAqL1xuZXhwb3J0IGNvbnN0IEV2ZW50ZnVsID0gKCkgPT4gKHtcbiAgbGlzdGVuZXJzOiB7fSxcblxuICAvKipcbiAgICogTGlzdGVuIHRvIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbc2NvcGVdXG4gICAqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtFdmVudGZ1bH1cbiAgICovXG4gIG9uOiBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgc2NvcGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZWRlZiB7b2JqZWN0fSBUcmlnZ2VyXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2NvcGVcbiAgICAgKi9cbiAgICBjb25zdCB0cmlnZ2VyID0ge1xuICAgICAgJ2xpc3RlbmVyJzogbGlzdGVuZXIsXG4gICAgICAnc2NvcGUnOiBzY29wZVxuICAgIH07XG5cbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2godHJpZ2dlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogRmlyZSBldmVudC4gSWYgYW55IG9mIHRoZSBsaXN0ZW5lcnMgcmV0dXJucyBmYWxzZSwgcmV0dXJuIGZhbHNlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZXZlbnRdXG4gICAqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgZmlyZTogZnVuY3Rpb24odHlwZSwgZXZlbnQpIHtcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuXG4gICAgcmV0dXJuIHRyaWdnZXJzLmV2ZXJ5KGZ1bmN0aW9uKHRyaWdnZXIpIHtcbiAgICAgIHJldHVybiB0cmlnZ2VyLmxpc3RlbmVyLmNhbGwodHJpZ2dlci5zY29wZSB8fCB0aGlzLCBldmVudCkgIT09IGZhbHNlO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIGZvciBldmVudHMgb24gYW5vdGhlciBFdmVudGZ1bCwgYW5kIHByb3BhZ2F0ZSBpdCB0cm91Z2ggdGhpcyBFdmVudGZ1bFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB0eXBlc1xuICAgKiBAcGFyYW0ge0V2ZW50ZnVsfSBldmVudGZ1bFxuICAgKi9cbiAgcHJvcGFnYXRlOiBmdW5jdGlvbih0eXBlcywgZXZlbnRmdWwpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgdHlwZXMuZm9yRWFjaCh0eXBlID0+IGV2ZW50ZnVsLm9uKHR5cGUsIGV2ZW50ID0+IHNlbGYuZmlyZSh0eXBlLCBldmVudCkpKTtcbiAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwiLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICpcbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGN1cnJ5ID0gZnVuY3Rpb24oZm4pIHtcbiAgY29uc3QgYXJpdHkgPSBmbi5sZW5ndGg7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKCkge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+PSBhcml0eSkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBmMigpIHtcbiAgICAgICAgY29uc3QgYXJnczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICByZXR1cm4gZjEuYXBwbHkobnVsbCwgYXJncy5jb25jYXQoYXJnczIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIENvbXBvc2UgZnVuY3Rpb25zIHRvZ2V0aGVyLCBleGVjdXRpbmcgZnJvbSByaWdodCB0byBsZWZ0XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbi4uLn0gZm5zXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKC4uLmZucykgPT4gZm5zLnJlZHVjZSgoZiwgZykgPT4gKC4uLmFyZ3MpID0+IGYoZyguLi5hcmdzKSkpO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JFYWNoID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgYXJyLmZvckVhY2goZm4pO1xufSk7XG5cbi8qKlxuICogTWFwcyBhIGZ1bmN0aW9uIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgbWFwID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5tYXAoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZpbHRlciB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBzb21lIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgc29tZSA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuc29tZShmbik7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgYSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSBjdXJyeShmdW5jdGlvbiAodmFsdWUsIGFycikge1xuICByZXR1cm4gYXJyLmluZGV4T2YodmFsdWUpICE9IC0xO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSBzdXBwbGllZCB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgd2l0aG91dCA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZXMsIGFycikge1xuICByZXR1cm4gZmlsdGVyKHZhbHVlID0+ICFjb250YWlucyh2YWx1ZSwgdmFsdWVzKSwgYXJyKVxufSk7XG5cbi8qKlxuICogVGFrZXMgYSBzdHJpbmcgdGhhdCBpcyBlaXRoZXIgJ3RydWUnIG9yICdmYWxzZScgYW5kIHJldHVybnMgdGhlIG9wcG9zaXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJvb2xcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBpbnZlcnNlQm9vbGVhblN0cmluZyA9IGZ1bmN0aW9uIChib29sKSB7XG4gIHJldHVybiAoYm9vbCAhPT0gJ3RydWUnKS50b1N0cmluZygpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsImltcG9ydCB7Y3VycnksIGludmVyc2VCb29sZWFuU3RyaW5nfSBmcm9tICcuL2Z1bmN0aW9uYWwnXG5cbi8qKlxuICogR2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmcm9tIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpO1xufSk7XG5cbi8qKlxuICogU2V0IGFuIGF0dHJpYnV0ZSBvbiBhIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGVsKSB7XG4gIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG59KTtcblxuLyoqXG4gKiBSZW1vdmUgYXR0cmlidXRlIGZyb20gaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcbiAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xufSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaGFzQXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIGVsKSB7XG4gIHJldHVybiBlbC5oYXNBdHRyaWJ1dGUobmFtZSk7XG59KTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGUgdGhhdCBlcXVhbHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUVxdWFscyA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZWwpIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWU7XG59KTtcblxuLyoqXG4gKiBUb2dnbGVzIGFuIGF0dHJpYnV0ZSBiZXR3ZWVuICd0cnVlJyBhbmQgJ2ZhbHNlJztcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xuICBjb25zdCB2YWx1ZSA9IGdldEF0dHJpYnV0ZShuYW1lLCBlbCk7XG4gIHNldEF0dHJpYnV0ZShuYW1lLCBpbnZlcnNlQm9vbGVhblN0cmluZyh2YWx1ZSksIGVsKTtcbn0pO1xuXG4vKipcbiAqIFRoZSBhcHBlbmRDaGlsZCgpIG1ldGhvZCBhZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0IG9mIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWVkIHBhcmVudCBub2RlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgYXBwZW5kQ2hpbGQgPSBjdXJyeShmdW5jdGlvbiAocGFyZW50LCBjaGlsZCkge1xuICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyBhIGRlc2NlbmRhbnQgb2YgdGhlIGVsZW1lbnQgb24gd2hpY2ggaXQgaXMgaW52b2tlZFxuICogdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2Ygc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvciA9IGN1cnJ5KGZ1bmN0aW9uIChzZWxlY3RvciwgZWwpIHtcbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5vbi1saXZlIE5vZGVMaXN0IG9mIGFsbCBlbGVtZW50cyBkZXNjZW5kZWQgZnJvbSB0aGUgZWxlbWVudCBvbiB3aGljaCBpdFxuICogaXMgaW52b2tlZCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBDU1Mgc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge05vZGVMaXN0fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvckFsbCA9IGN1cnJ5KGZ1bmN0aW9uIChzZWxlY3RvciwgZWwpIHtcbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwiLyoqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLnR5cGUgICAgICAgICB0eXBlIG9mIHRoZSBtZXNzYWdlOiBpbmZvLCBzdWNjZXNzLCBlcnJvclxuICogQHBhcmFtICB7Ym9vbGVhbn0gIGNvbmZpZy5kaXNtaXNzaWJsZSAgd2hldGhlciB0aGUgbWVzc2FnZSBjYW4gYmUgZGlzbWlzc2VkXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLmNvbnRlbnQgICAgICBtZXNzYWdlIGNvbnRlbnQgdXN1YWxseSBhICdoMycgYW5kIGEgJ3AnXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gZGl2IGNvbnRhaW5pbmcgdGhlIG1lc3NhZ2UgZWxlbWVudFxuICovXG5cbi8vVE9ETyBoYW5kbGUgc3RyaW5ncywgaHRtbCwgYmFkbHkgZm9ybWVkIG9iamVjdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyRXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XG4gIGNsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmI3gyNzE1JztcblxuICBjb25zdCBtZXNzYWdlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtZXNzYWdlQ29udGVudC5jbGFzc05hbWUgPSAnbWVzc2FnZS1jb250ZW50JztcbiAgbWVzc2FnZUNvbnRlbnQuaW5uZXJIVE1MID0gJzxoMT4nICsgbWVzc2FnZS50aXRsZSArICc8L2gxPicgKyAnPHA+JyArIG1lc3NhZ2UuY29udGVudCArICc8L3A+JztcblxuICBjb25zdCBtZXNzYWdlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtZXNzYWdlV3JhcHBlci5jbGFzc05hbWUgPSAnbWVzc2FnZScgKyAnICcgKyBgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUNvbnRlbnQpO1xuXG4gIGlmIChtZXNzYWdlLmJ1dHRvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbWVzc2FnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG1lc3NhZ2VCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbic7XG4gICAgbWVzc2FnZUJ1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlLmJ1dHRvbjtcbiAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQnV0dG9uKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKG1lc3NhZ2VXcmFwcGVyKTtcbiAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gQ29udGVudFR5cGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRpdGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3VtbWFyeVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNyZWF0ZWRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVjb21tZW5kZWRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0aW1lc0Rvd25sb2FkZWRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IHNjcmVlbnNob3RzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXhhbXBsZVxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0ga2V5d29yZHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGNhdGVnb3JpZXNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsaWNlbnNlXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViU2VydmljZXMge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFwaVJvb3RVcmxcbiAgICovXG4gIGNvbnN0cnVjdG9yKHsgYXBpUm9vdFVybCB9KSB7XG4gICAgdGhpcy5hcGlSb290VXJsID0gYXBpUm9vdFVybDtcblxuICAgIGlmKCF3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzKXtcbiAgICAgIC8vIFRPRE8gcmVtb3ZlIHRoaXMgd2hlbiBkb25lIHRlc3RpbmcgZm9yIGVycm9yc1xuICAgICAgLy8gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1lcnJvcnMvTk9fUkVTUE9OU0UuanNvbmAsIHtcblxuICAgICAgd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50LXR5cGUtY2FjaGVgLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcbiAgICAgIC50aGVuKHRoaXMuaXNWYWxpZClcbiAgICAgIC50aGVuKGpzb24gPT4ganNvbi5saWJyYXJpZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gIHtDb250ZW50VHlwZVtdfEVycm9yTWVzc2FnZX0gcmVzcG9uc2VcbiAgICogQHJldHVybiB7UHJvbWlzZTxDb250ZW50VHlwZVtdfEVycm9yTWVzc2FnZT59XG4gICAqL1xuICBpc1ZhbGlkKHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlLm1lc3NhZ2VDb2RlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBjb250ZW50IHR5cGVzXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlW10+fVxuICAgKi9cbiAgY29udGVudFR5cGVzKCkge1xuICAgIHJldHVybiB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBDb250ZW50IFR5cGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcbiAgICB9KTtcblxuICAgIC8qcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50X3R5cGVfY2FjaGUvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpOyovXG4gIH1cblxuICAvKipcbiAgICogSW5zdGFsbHMgYSBjb250ZW50IHR5cGUgb24gdGhlIHNlcnZlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgaW5zdGFsbENvbnRlbnRUeXBlKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1saWJyYXJ5LWluc3RhbGw/aWQ9JHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBib2R5OiAnJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItc2VydmljZXMuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZSwgYXR0cmlidXRlRXF1YWxzLCB0b2dnbGVBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaXNFeHBhbmRlZCA9IGF0dHJpYnV0ZUVxdWFscyhcImFyaWEtZXhwYW5kZWRcIiwgJ3RydWUnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgYm9keSB2aXNpYmlsaXR5XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYm9keUVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNFeHBhbmRlZFxuICovXG5jb25zdCB0b2dnbGVCb2R5VmlzaWJpbGl0eSA9IGZ1bmN0aW9uKGJvZHlFbGVtZW50LCBpc0V4cGFuZGVkKSB7XG4gIGlmKCFpc0V4cGFuZGVkKSB7XG4gICAgaGlkZShib2R5RWxlbWVudCk7XG4gICAgLy9ib2R5RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIjBcIjtcbiAgfVxuICBlbHNlIC8qaWYoYm9keUVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gMCkqLyB7XG4gICAgc2hvdyhib2R5RWxlbWVudCk7XG4gICAgLy9ib2R5RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtib2R5RWxlbWVudC5zY3JvbGxIZWlnaHR9cHhgO1xuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgY2hhbmdlcyB0byBhcmlhLWV4cGFuZGVkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYm9keUVsZW1lbnRcbiAqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IGV2ZW50XG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG9uQXJpYUV4cGFuZGVkQ2hhbmdlID0gY3VycnkoZnVuY3Rpb24oYm9keUVsZW1lbnQsIGV2ZW50KSB7XG4gIHRvZ2dsZUJvZHlWaXNpYmlsaXR5KGJvZHlFbGVtZW50LCBpc0V4cGFuZGVkKGV2ZW50LnRhcmdldCkpO1xufSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgY29uc3QgdGl0bGVFbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtZXhwYW5kZWRdJyk7XG4gIGNvbnN0IGJvZHlJZCA9IHRpdGxlRWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gIGNvbnN0IGJvZHlFbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9keUlkfWApO1xuXG4gIGlmKHRpdGxlRWwpIHtcbiAgICAvLyBzZXQgb2JzZXJ2ZXIgb24gdGl0bGUgZm9yIGFyaWEtZXhwYW5kZWRcbiAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmb3JFYWNoKG9uQXJpYUV4cGFuZGVkQ2hhbmdlKGJvZHlFbCkpKTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUodGl0bGVFbCwge1xuICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgICAgYXR0cmlidXRlRmlsdGVyOiBbXCJhcmlhLWV4cGFuZGVkXCJdXG4gICAgfSk7XG5cbiAgICAvLyBTZXQgY2xpY2sgbGlzdGVuZXIgdGhhdCB0b2dnbGVzIGFyaWEtZXhwYW5kZWRcbiAgICB0aXRsZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHRvZ2dsZUF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgZXZlbnQudGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIHRvZ2dsZUJvZHlWaXNpYmlsaXR5KGJvZHlFbCwgaXNFeHBhbmRlZCh0aXRsZUVsKSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsImltcG9ydCBIdWJWaWV3IGZyb20gJy4vaHViLXZpZXcnO1xuaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvbiBmcm9tICcuL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uJztcbmltcG9ydCBVcGxvYWRTZWN0aW9uIGZyb20gJy4vdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24nO1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4vaHViLXNlcnZpY2VzJztcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4vdXRpbHMvZXJyb3JzJztcbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gSHViU3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aXRsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb25JZFxuICogQHByb3BlcnR5IHtib29sZWFufSBleHBhbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFwaVJvb3RVcmxcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBFcnJvck1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXJyb3JDb2RlXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gU2VsZWN0ZWRFbGVtZW50XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRcbiAqL1xuLyoqXG4gKiBTZWxlY3QgZXZlbnRcbiAqIEBldmVudCBIdWIjc2VsZWN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEVycm9yIGV2ZW50XG4gKiBAZXZlbnQgSHViI2Vycm9yXG4gKiBAdHlwZSB7RXJyb3JNZXNzYWdlfVxuICovXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIEh1YiNlcnJvclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWIge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjb250cm9sbGVyc1xuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uID0gbmV3IENvbnRlbnRUeXBlU2VjdGlvbihzdGF0ZSk7XG4gICAgdGhpcy51cGxvYWRTZWN0aW9uID0gbmV3IFVwbG9hZFNlY3Rpb24oc3RhdGUpO1xuXG4gICAgLy8gdmlld3NcbiAgICB0aGlzLnZpZXcgPSBuZXcgSHViVmlldyhzdGF0ZSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gcHJvcGFnYXRlIGNvbnRyb2xsZXIgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAnZXJyb3InXSwgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24pO1xuXG4gICAgLy8gaGFuZGxlIGV2ZW50c1xuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMuc2V0UGFuZWxUaXRsZSwgdGhpcyk7XG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy52aWV3LmNsb3NlUGFuZWwsIHRoaXMudmlldyk7XG4gICAgLy8gb25seSBpbml0aWFsaXplIHRoZSBtYWluIHBhbmVsIGlmIG5vIGVycm9ycyBoYXZlIG9jY3VyZWQgd2hlbiB1cGRhdGluZyB0aGUgY29udGVudCB0eXBlIGxpc3RcbiAgICB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5vbigndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0JywgdGhpcy52aWV3LmluaXRpYWxpemVQYW5lbC5iaW5kKHRoaXMudmlldyksIHRoaXMuY29udGVudFR5cGVTZWN0aW9uKTtcblxuICAgIHRoaXMuaW5pdFRhYlBhbmVsKClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwcm9taXNlIG9mIGEgY29udGVudCB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBnZXRDb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZSBvZiB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRQYW5lbFRpdGxlKHtpZH0pwqB7XG4gICAgdGhpcy5nZXRDb250ZW50VHlwZShpZCkudGhlbigoe3RpdGxlfSkgPT4gdGhpcy52aWV3LnNldFRpdGxlKHRpdGxlKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSB0YWIgcGFuZWxcbiAgICovXG4gIGluaXRUYWJQYW5lbCgpIHtcbiAgICBjb25zdCB0YWJDb25maWdzID0gW3tcbiAgICAgIHRpdGxlOiAnQ3JlYXRlIENvbnRlbnQnLFxuICAgICAgaWQ6ICdjcmVhdGUtY29udGVudCcsXG4gICAgICBjb250ZW50OiB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5nZXRFbGVtZW50KCksXG4gICAgICBzZWxlY3RlZDogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdVcGxvYWQnLFxuICAgICAgaWQ6ICd1cGxvYWQtc2VjdGlvbicsXG4gICAgICBjb250ZW50OiB0aGlzLnVwbG9hZFNlY3Rpb24uZ2V0RWxlbWVudCgpXG4gICAgfV07XG5cbiAgICB0YWJDb25maWdzLmZvckVhY2godGFiQ29uZmlnID0+IHRoaXMudmlldy5hZGRUYWIodGFiQ29uZmlnKSk7XG4gICAgdGhpcy52aWV3LmluaXRUYWJQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBpbiB0aGUgdmlld1xuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3R5bGVzL21haW4uc2Nzc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge3NldEF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCB1blNlbGVjdEFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJykpO1xuXG4vKipcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIGNvbnN0IHRhYnMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFiXCJdJyk7XG4gIGNvbnN0IHRhYlBhbmVscyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJwYW5lbFwiXScpO1xuXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICB1blNlbGVjdEFsbCh0YWJzKTtcbiAgICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXG4gICAgICBoaWRlQWxsKHRhYlBhbmVscyk7XG5cbiAgICAgIGxldCB0YWJQYW5lbElkID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICAgICAgc2hvdyhlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhYlBhbmVsSWR9YCkpO1xuICAgIH0pO1xuICB9KVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3RhYi1wYW5lbC5qcyIsIi8qKlxuICogbHVuciAtIGh0dHA6Ly9sdW5yanMuY29tIC0gQSBiaXQgbGlrZSBTb2xyLCBidXQgbXVjaCBzbWFsbGVyIGFuZCBub3QgYXMgYnJpZ2h0IC0gMS4wLjBcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbjsoZnVuY3Rpb24oKXtcblxuLyoqXG4gKiBDb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgaW5zdGFudGlhdGluZyBhIG5ldyBsdW5yIGluZGV4IGFuZCBjb25maWd1cmluZyBpdFxuICogd2l0aCB0aGUgZGVmYXVsdCBwaXBlbGluZSBmdW5jdGlvbnMgYW5kIHRoZSBwYXNzZWQgY29uZmlnIGZ1bmN0aW9uLlxuICpcbiAqIFdoZW4gdXNpbmcgdGhpcyBjb252ZW5pZW5jZSBmdW5jdGlvbiBhIG5ldyBpbmRleCB3aWxsIGJlIGNyZWF0ZWQgd2l0aCB0aGVcbiAqIGZvbGxvd2luZyBmdW5jdGlvbnMgYWxyZWFkeSBpbiB0aGUgcGlwZWxpbmU6XG4gKlxuICogbHVuci5TdG9wV29yZEZpbHRlciAtIGZpbHRlcnMgb3V0IGFueSBzdG9wIHdvcmRzIGJlZm9yZSB0aGV5IGVudGVyIHRoZVxuICogaW5kZXhcbiAqXG4gKiBsdW5yLnN0ZW1tZXIgLSBzdGVtcyB0aGUgdG9rZW5zIGJlZm9yZSBlbnRlcmluZyB0aGUgaW5kZXguXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgdmFyIGlkeCA9IGx1bnIoZnVuY3Rpb24gKCkge1xuICogICAgICAgdGhpcy5maWVsZCgndGl0bGUnLCAxMClcbiAqICAgICAgIHRoaXMuZmllbGQoJ3RhZ3MnLCAxMDApXG4gKiAgICAgICB0aGlzLmZpZWxkKCdib2R5JylcbiAqICAgICAgIFxuICogICAgICAgdGhpcy5yZWYoJ2NpZCcpXG4gKiAgICAgICBcbiAqICAgICAgIHRoaXMucGlwZWxpbmUuYWRkKGZ1bmN0aW9uICgpIHtcbiAqICAgICAgICAgLy8gc29tZSBjdXN0b20gcGlwZWxpbmUgZnVuY3Rpb25cbiAqICAgICAgIH0pXG4gKiAgICAgICBcbiAqICAgICB9KVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpZyBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbmV3IGluc3RhbmNlXG4gKiBvZiB0aGUgbHVuci5JbmRleCBhcyBib3RoIGl0cyBjb250ZXh0IGFuZCBmaXJzdCBwYXJhbWV0ZXIuIEl0IGNhbiBiZSB1c2VkIHRvXG4gKiBjdXN0b21pemUgdGhlIGluc3RhbmNlIG9mIG5ldyBsdW5yLkluZGV4LlxuICogQG5hbWVzcGFjZVxuICogQG1vZHVsZVxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKlxuICovXG52YXIgbHVuciA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgdmFyIGlkeCA9IG5ldyBsdW5yLkluZGV4XG5cbiAgaWR4LnBpcGVsaW5lLmFkZChcbiAgICBsdW5yLnRyaW1tZXIsXG4gICAgbHVuci5zdG9wV29yZEZpbHRlcixcbiAgICBsdW5yLnN0ZW1tZXJcbiAgKVxuXG4gIGlmIChjb25maWcpIGNvbmZpZy5jYWxsKGlkeCwgaWR4KVxuXG4gIHJldHVybiBpZHhcbn1cblxubHVuci52ZXJzaW9uID0gXCIxLjAuMFwiXG4vKiFcbiAqIGx1bnIudXRpbHNcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIEEgbmFtZXNwYWNlIGNvbnRhaW5pbmcgdXRpbHMgZm9yIHRoZSByZXN0IG9mIHRoZSBsdW5yIGxpYnJhcnlcbiAqL1xubHVuci51dGlscyA9IHt9XG5cbi8qKlxuICogUHJpbnQgYSB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gYmUgcHJpbnRlZC5cbiAqIEBtZW1iZXJPZiBVdGlsc1xuICovXG5sdW5yLnV0aWxzLndhcm4gPSAoZnVuY3Rpb24gKGdsb2JhbCkge1xuICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICBpZiAoZ2xvYmFsLmNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSlcbiAgICB9XG4gIH1cbn0pKHRoaXMpXG5cbi8qKlxuICogQ29udmVydCBhbiBvYmplY3QgdG8gYSBzdHJpbmcuXG4gKlxuICogSW4gdGhlIGNhc2Ugb2YgYG51bGxgIGFuZCBgdW5kZWZpbmVkYCB0aGUgZnVuY3Rpb24gcmV0dXJuc1xuICogdGhlIGVtcHR5IHN0cmluZywgaW4gYWxsIG90aGVyIGNhc2VzIHRoZSByZXN1bHQgb2YgY2FsbGluZ1xuICogYHRvU3RyaW5nYCBvbiB0aGUgcGFzc2VkIG9iamVjdCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAcGFyYW0ge0FueX0gb2JqIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBhIHN0cmluZy5cbiAqIEByZXR1cm4ge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwYXNzZWQgb2JqZWN0LlxuICogQG1lbWJlck9mIFV0aWxzXG4gKi9cbmx1bnIudXRpbHMuYXNTdHJpbmcgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmIChvYmogPT09IHZvaWQgMCB8fCBvYmogPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmoudG9TdHJpbmcoKVxuICB9XG59XG4vKiFcbiAqIGx1bnIuRXZlbnRFbWl0dGVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLkV2ZW50RW1pdHRlciBpcyBhbiBldmVudCBlbWl0dGVyIGZvciBsdW5yLiBJdCBtYW5hZ2VzIGFkZGluZyBhbmQgcmVtb3ZpbmcgZXZlbnQgaGFuZGxlcnMgYW5kIHRyaWdnZXJpbmcgZXZlbnRzIGFuZCB0aGVpciBoYW5kbGVycy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZXZlbnRzID0ge31cbn1cblxuLyoqXG4gKiBCaW5kcyBhIGhhbmRsZXIgZnVuY3Rpb24gdG8gYSBzcGVjaWZpYyBldmVudChzKS5cbiAqXG4gKiBDYW4gYmluZCBhIHNpbmdsZSBmdW5jdGlvbiB0byBtYW55IGRpZmZlcmVudCBldmVudHMgaW4gb25lIGNhbGwuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFtldmVudE5hbWVdIFRoZSBuYW1lKHMpIG9mIGV2ZW50cyB0byBiaW5kIHRoaXMgZnVuY3Rpb24gdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIGFuIGV2ZW50IGlzIGZpcmVkLlxuICogQG1lbWJlck9mIEV2ZW50RW1pdHRlclxuICovXG5sdW5yLkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICAgIGZuID0gYXJncy5wb3AoKSxcbiAgICAgIG5hbWVzID0gYXJnc1xuXG4gIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvciAoXCJsYXN0IGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvblwiKVxuXG4gIG5hbWVzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuaGFzSGFuZGxlcihuYW1lKSkgdGhpcy5ldmVudHNbbmFtZV0gPSBbXVxuICAgIHRoaXMuZXZlbnRzW25hbWVdLnB1c2goZm4pXG4gIH0sIHRoaXMpXG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGhhbmRsZXIgZnVuY3Rpb24gZnJvbSBhIHNwZWNpZmljIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSB0aGlzIGZ1bmN0aW9uIGZyb20uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcmVtb3ZlIGZyb20gYW4gZXZlbnQuXG4gKiBAbWVtYmVyT2YgRXZlbnRFbWl0dGVyXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICBpZiAoIXRoaXMuaGFzSGFuZGxlcihuYW1lKSkgcmV0dXJuXG5cbiAgdmFyIGZuSW5kZXggPSB0aGlzLmV2ZW50c1tuYW1lXS5pbmRleE9mKGZuKVxuICB0aGlzLmV2ZW50c1tuYW1lXS5zcGxpY2UoZm5JbmRleCwgMSlcblxuICBpZiAoIXRoaXMuZXZlbnRzW25hbWVdLmxlbmd0aCkgZGVsZXRlIHRoaXMuZXZlbnRzW25hbWVdXG59XG5cbi8qKlxuICogQ2FsbHMgYWxsIGZ1bmN0aW9ucyBib3VuZCB0byB0aGUgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQWRkaXRpb25hbCBkYXRhIGNhbiBiZSBwYXNzZWQgdG8gdGhlIGV2ZW50IGhhbmRsZXIgYXMgYXJndW1lbnRzIHRvIGBlbWl0YFxuICogYWZ0ZXIgdGhlIGV2ZW50IG5hbWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdC5cbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIXRoaXMuaGFzSGFuZGxlcihuYW1lKSkgcmV0dXJuXG5cbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cbiAgdGhpcy5ldmVudHNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpXG4gIH0pXG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgYSBoYW5kbGVyIGhhcyBldmVyIGJlZW4gc3RvcmVkIGFnYWluc3QgYW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gY2hlY2suXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlck9mIEV2ZW50RW1pdHRlclxuICovXG5sdW5yLkV2ZW50RW1pdHRlci5wcm90b3R5cGUuaGFzSGFuZGxlciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBuYW1lIGluIHRoaXMuZXZlbnRzXG59XG5cbi8qIVxuICogbHVuci50b2tlbml6ZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gZm9yIHNwbGl0dGluZyBhIHN0cmluZyBpbnRvIHRva2VucyByZWFkeSB0byBiZSBpbnNlcnRlZCBpbnRvXG4gKiB0aGUgc2VhcmNoIGluZGV4LiBVc2VzIGBsdW5yLnRva2VuaXplci5zZXBhcmF0b3JgIHRvIHNwbGl0IHN0cmluZ3MsIGNoYW5nZVxuICogdGhlIHZhbHVlIG9mIHRoaXMgcHJvcGVydHkgdG8gY2hhbmdlIGhvdyBzdHJpbmdzIGFyZSBzcGxpdCBpbnRvIHRva2Vucy5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gb2JqIFRoZSBzdHJpbmcgdG8gY29udmVydCBpbnRvIHRva2Vuc1xuICogQHNlZSBsdW5yLnRva2VuaXplci5zZXBhcmF0b3JcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xubHVuci50b2tlbml6ZXIgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCB8fCBvYmogPT0gbnVsbCB8fCBvYmogPT0gdW5kZWZpbmVkKSByZXR1cm4gW11cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkgcmV0dXJuIG9iai5tYXAoZnVuY3Rpb24gKHQpIHsgcmV0dXJuIGx1bnIudXRpbHMuYXNTdHJpbmcodCkudG9Mb3dlckNhc2UoKSB9KVxuXG4gIHJldHVybiBvYmoudG9TdHJpbmcoKS50cmltKCkudG9Mb3dlckNhc2UoKS5zcGxpdChsdW5yLnRva2VuaXplci5zZXBhcmF0b3IpXG59XG5cbi8qKlxuICogVGhlIHNwZXJhdG9yIHVzZWQgdG8gc3BsaXQgYSBzdHJpbmcgaW50byB0b2tlbnMuIE92ZXJyaWRlIHRoaXMgcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBiZWhhdmlvdXIgb2ZcbiAqIGBsdW5yLnRva2VuaXplcmAgYmVoYXZpb3VyIHdoZW4gdG9rZW5pemluZyBzdHJpbmdzLiBCeSBkZWZhdWx0IHRoaXMgc3BsaXRzIG9uIHdoaXRlc3BhY2UgYW5kIGh5cGhlbnMuXG4gKlxuICogQHN0YXRpY1xuICogQHNlZSBsdW5yLnRva2VuaXplclxuICovXG5sdW5yLnRva2VuaXplci5zZXBhcmF0b3IgPSAvW1xcc1xcLV0rL1xuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHRva2VuaXplci5cbiAqXG4gKiBBIHRva2VuaXplciBmdW5jdGlvbiB0byBiZSBsb2FkZWQgbXVzdCBhbHJlYWR5IGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLnRva2VuaXplci5cbiAqIElmIHRoZSBzZXJpYWxpc2VkIHRva2VuaXplciBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZCB0aGVuIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBUaGUgbGFiZWwgb2YgdGhlIHNlcmlhbGlzZWQgdG9rZW5pemVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICogQG1lbWJlck9mIHRva2VuaXplclxuICovXG5sdW5yLnRva2VuaXplci5sb2FkID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gIHZhciBmbiA9IHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9uc1tsYWJlbF1cblxuICBpZiAoIWZuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgbG9hZCB1bi1yZWdpc3RlcmVkIGZ1bmN0aW9uOiAnICsgbGFiZWwpXG4gIH1cblxuICByZXR1cm4gZm5cbn1cblxubHVuci50b2tlbml6ZXIubGFiZWwgPSAnZGVmYXVsdCdcblxubHVuci50b2tlbml6ZXIucmVnaXN0ZXJlZEZ1bmN0aW9ucyA9IHtcbiAgJ2RlZmF1bHQnOiBsdW5yLnRva2VuaXplclxufVxuXG4vKipcbiAqIFJlZ2lzdGVyIGEgdG9rZW5pemVyIGZ1bmN0aW9uLlxuICpcbiAqIEZ1bmN0aW9ucyB0aGF0IGFyZSB1c2VkIGFzIHRva2VuaXplcnMgc2hvdWxkIGJlIHJlZ2lzdGVyZWQgaWYgdGhleSBhcmUgdG8gYmUgdXNlZCB3aXRoIGEgc2VyaWFsaXNlZCBpbmRleC5cbiAqXG4gKiBSZWdpc3RlcmluZyBhIGZ1bmN0aW9uIGRvZXMgbm90IGFkZCBpdCB0byBhbiBpbmRleCwgZnVuY3Rpb25zIG11c3Qgc3RpbGwgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc3BlY2lmaWMgaW5kZXggZm9yIHRoZW0gdG8gYmUgdXNlZCB3aGVuIGluZGV4aW5nIGFuZCBzZWFyY2hpbmcgZG9jdW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byByZWdpc3Rlci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBUaGUgbGFiZWwgdG8gcmVnaXN0ZXIgdGhpcyBmdW5jdGlvbiB3aXRoXG4gKiBAbWVtYmVyT2YgdG9rZW5pemVyXG4gKi9cbmx1bnIudG9rZW5pemVyLnJlZ2lzdGVyRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4sIGxhYmVsKSB7XG4gIGlmIChsYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ092ZXJ3cml0aW5nIGV4aXN0aW5nIHRva2VuaXplcjogJyArIGxhYmVsKVxuICB9XG5cbiAgZm4ubGFiZWwgPSBsYWJlbFxuICB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnNbbGFiZWxdID0gZm5cbn1cbi8qIVxuICogbHVuci5QaXBlbGluZVxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5QaXBlbGluZXMgbWFpbnRhaW4gYW4gb3JkZXJlZCBsaXN0IG9mIGZ1bmN0aW9ucyB0byBiZSBhcHBsaWVkIHRvIGFsbFxuICogdG9rZW5zIGluIGRvY3VtZW50cyBlbnRlcmluZyB0aGUgc2VhcmNoIGluZGV4IGFuZCBxdWVyaWVzIGJlaW5nIHJhbiBhZ2FpbnN0XG4gKiB0aGUgaW5kZXguXG4gKlxuICogQW4gaW5zdGFuY2Ugb2YgbHVuci5JbmRleCBjcmVhdGVkIHdpdGggdGhlIGx1bnIgc2hvcnRjdXQgd2lsbCBjb250YWluIGFcbiAqIHBpcGVsaW5lIHdpdGggYSBzdG9wIHdvcmQgZmlsdGVyIGFuZCBhbiBFbmdsaXNoIGxhbmd1YWdlIHN0ZW1tZXIuIEV4dHJhXG4gKiBmdW5jdGlvbnMgY2FuIGJlIGFkZGVkIGJlZm9yZSBvciBhZnRlciBlaXRoZXIgb2YgdGhlc2UgZnVuY3Rpb25zIG9yIHRoZXNlXG4gKiBkZWZhdWx0IGZ1bmN0aW9ucyBjYW4gYmUgcmVtb3ZlZC5cbiAqXG4gKiBXaGVuIHJ1biB0aGUgcGlwZWxpbmUgd2lsbCBjYWxsIGVhY2ggZnVuY3Rpb24gaW4gdHVybiwgcGFzc2luZyBhIHRva2VuLCB0aGVcbiAqIGluZGV4IG9mIHRoYXQgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIGxpc3Qgb2YgYWxsIHRva2VucyBhbmQgZmluYWxseSBhIGxpc3Qgb2ZcbiAqIGFsbCB0aGUgb3JpZ2luYWwgdG9rZW5zLlxuICpcbiAqIFRoZSBvdXRwdXQgb2YgZnVuY3Rpb25zIGluIHRoZSBwaXBlbGluZSB3aWxsIGJlIHBhc3NlZCB0byB0aGUgbmV4dCBmdW5jdGlvblxuICogaW4gdGhlIHBpcGVsaW5lLiBUbyBleGNsdWRlIGEgdG9rZW4gZnJvbSBlbnRlcmluZyB0aGUgaW5kZXggdGhlIGZ1bmN0aW9uXG4gKiBzaG91bGQgcmV0dXJuIHVuZGVmaW5lZCwgdGhlIHJlc3Qgb2YgdGhlIHBpcGVsaW5lIHdpbGwgbm90IGJlIGNhbGxlZCB3aXRoXG4gKiB0aGlzIHRva2VuLlxuICpcbiAqIEZvciBzZXJpYWxpc2F0aW9uIG9mIHBpcGVsaW5lcyB0byB3b3JrLCBhbGwgZnVuY3Rpb25zIHVzZWQgaW4gYW4gaW5zdGFuY2Ugb2ZcbiAqIGEgcGlwZWxpbmUgc2hvdWxkIGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLlBpcGVsaW5lLiBSZWdpc3RlcmVkIGZ1bmN0aW9ucyBjYW5cbiAqIHRoZW4gYmUgbG9hZGVkLiBJZiB0cnlpbmcgdG8gbG9hZCBhIHNlcmlhbGlzZWQgcGlwZWxpbmUgdGhhdCB1c2VzIGZ1bmN0aW9uc1xuICogdGhhdCBhcmUgbm90IHJlZ2lzdGVyZWQgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gKlxuICogSWYgbm90IHBsYW5uaW5nIG9uIHNlcmlhbGlzaW5nIHRoZSBwaXBlbGluZSB0aGVuIHJlZ2lzdGVyaW5nIHBpcGVsaW5lIGZ1bmN0aW9uc1xuICogaXMgbm90IG5lY2Vzc2FyeS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5QaXBlbGluZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fc3RhY2sgPSBbXVxufVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyZWRGdW5jdGlvbnMgPSB7fVxuXG4vKipcbiAqIFJlZ2lzdGVyIGEgZnVuY3Rpb24gd2l0aCB0aGUgcGlwZWxpbmUuXG4gKlxuICogRnVuY3Rpb25zIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHBpcGVsaW5lIHNob3VsZCBiZSByZWdpc3RlcmVkIGlmIHRoZSBwaXBlbGluZVxuICogbmVlZHMgdG8gYmUgc2VyaWFsaXNlZCwgb3IgYSBzZXJpYWxpc2VkIHBpcGVsaW5lIG5lZWRzIHRvIGJlIGxvYWRlZC5cbiAqXG4gKiBSZWdpc3RlcmluZyBhIGZ1bmN0aW9uIGRvZXMgbm90IGFkZCBpdCB0byBhIHBpcGVsaW5lLCBmdW5jdGlvbnMgbXVzdCBzdGlsbCBiZVxuICogYWRkZWQgdG8gaW5zdGFuY2VzIG9mIHRoZSBwaXBlbGluZSBmb3IgdGhlbSB0byBiZSB1c2VkIHdoZW4gcnVubmluZyBhIHBpcGVsaW5lLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjaGVjayBmb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVGhlIGxhYmVsIHRvIHJlZ2lzdGVyIHRoaXMgZnVuY3Rpb24gd2l0aFxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbiA9IGZ1bmN0aW9uIChmbiwgbGFiZWwpIHtcbiAgaWYgKGxhYmVsIGluIHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9ucykge1xuICAgIGx1bnIudXRpbHMud2FybignT3ZlcndyaXRpbmcgZXhpc3RpbmcgcmVnaXN0ZXJlZCBmdW5jdGlvbjogJyArIGxhYmVsKVxuICB9XG5cbiAgZm4ubGFiZWwgPSBsYWJlbFxuICBsdW5yLlBpcGVsaW5lLnJlZ2lzdGVyZWRGdW5jdGlvbnNbZm4ubGFiZWxdID0gZm5cbn1cblxuLyoqXG4gKiBXYXJucyBpZiB0aGUgZnVuY3Rpb24gaXMgbm90IHJlZ2lzdGVyZWQgYXMgYSBQaXBlbGluZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgZm9yLlxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZCA9IGZ1bmN0aW9uIChmbikge1xuICB2YXIgaXNSZWdpc3RlcmVkID0gZm4ubGFiZWwgJiYgKGZuLmxhYmVsIGluIHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9ucylcblxuICBpZiAoIWlzUmVnaXN0ZXJlZCkge1xuICAgIGx1bnIudXRpbHMud2FybignRnVuY3Rpb24gaXMgbm90IHJlZ2lzdGVyZWQgd2l0aCBwaXBlbGluZS4gVGhpcyBtYXkgY2F1c2UgcHJvYmxlbXMgd2hlbiBzZXJpYWxpc2luZyB0aGUgaW5kZXguXFxuJywgZm4pXG4gIH1cbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBwaXBlbGluZS5cbiAqXG4gKiBBbGwgZnVuY3Rpb25zIHRvIGJlIGxvYWRlZCBtdXN0IGFscmVhZHkgYmUgcmVnaXN0ZXJlZCB3aXRoIGx1bnIuUGlwZWxpbmUuXG4gKiBJZiBhbnkgZnVuY3Rpb24gZnJvbSB0aGUgc2VyaWFsaXNlZCBkYXRhIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkIHRoZW4gYW5cbiAqIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkIFRoZSBzZXJpYWxpc2VkIHBpcGVsaW5lIHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5QaXBlbGluZX1cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZCkge1xuICB2YXIgcGlwZWxpbmUgPSBuZXcgbHVuci5QaXBlbGluZVxuXG4gIHNlcmlhbGlzZWQuZm9yRWFjaChmdW5jdGlvbiAoZm5OYW1lKSB7XG4gICAgdmFyIGZuID0gbHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zW2ZuTmFtZV1cblxuICAgIGlmIChmbikge1xuICAgICAgcGlwZWxpbmUuYWRkKGZuKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBsb2FkIHVuLXJlZ2lzdGVyZWQgZnVuY3Rpb246ICcgKyBmbk5hbWUpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBwaXBlbGluZVxufVxuXG4vKipcbiAqIEFkZHMgbmV3IGZ1bmN0aW9ucyB0byB0aGUgZW5kIG9mIHRoZSBwaXBlbGluZS5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb25zIEFueSBudW1iZXIgb2YgZnVuY3Rpb25zIHRvIGFkZCB0byB0aGUgcGlwZWxpbmUuXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZm5zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuXG4gIGZucy5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKGZuKVxuICAgIHRoaXMuX3N0YWNrLnB1c2goZm4pXG4gIH0sIHRoaXMpXG59XG5cbi8qKlxuICogQWRkcyBhIHNpbmdsZSBmdW5jdGlvbiBhZnRlciBhIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlXG4gKiBwaXBlbGluZS5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhpc3RpbmdGbiBBIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlIHBpcGVsaW5lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbmV3Rm4gVGhlIG5ldyBmdW5jdGlvbiB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmFmdGVyID0gZnVuY3Rpb24gKGV4aXN0aW5nRm4sIG5ld0ZuKSB7XG4gIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKG5ld0ZuKVxuXG4gIHZhciBwb3MgPSB0aGlzLl9zdGFjay5pbmRleE9mKGV4aXN0aW5nRm4pXG4gIGlmIChwb3MgPT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIGV4aXN0aW5nRm4nKVxuICB9XG5cbiAgcG9zID0gcG9zICsgMVxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAwLCBuZXdGbilcbn1cblxuLyoqXG4gKiBBZGRzIGEgc2luZ2xlIGZ1bmN0aW9uIGJlZm9yZSBhIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlXG4gKiBwaXBlbGluZS5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhpc3RpbmdGbiBBIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlIHBpcGVsaW5lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbmV3Rm4gVGhlIG5ldyBmdW5jdGlvbiB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmJlZm9yZSA9IGZ1bmN0aW9uIChleGlzdGluZ0ZuLCBuZXdGbikge1xuICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChuZXdGbilcblxuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihleGlzdGluZ0ZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBleGlzdGluZ0ZuJylcbiAgfVxuXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDAsIG5ld0ZuKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBmdW5jdGlvbiBmcm9tIHRoZSBwaXBlbGluZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcmVtb3ZlIGZyb20gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChmbikge1xuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihmbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy5fc3RhY2suc3BsaWNlKHBvcywgMSlcbn1cblxuLyoqXG4gKiBSdW5zIHRoZSBjdXJyZW50IGxpc3Qgb2YgZnVuY3Rpb25zIHRoYXQgbWFrZSB1cCB0aGUgcGlwZWxpbmUgYWdhaW5zdCB0aGVcbiAqIHBhc3NlZCB0b2tlbnMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdG9rZW5zIFRoZSB0b2tlbnMgdG8gcnVuIHRocm91Z2ggdGhlIHBpcGVsaW5lLlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgdmFyIG91dCA9IFtdLFxuICAgICAgdG9rZW5MZW5ndGggPSB0b2tlbnMubGVuZ3RoLFxuICAgICAgc3RhY2tMZW5ndGggPSB0aGlzLl9zdGFjay5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuTGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3RhY2tMZW5ndGg7IGorKykge1xuICAgICAgdG9rZW4gPSB0aGlzLl9zdGFja1tqXSh0b2tlbiwgaSwgdG9rZW5zKVxuICAgICAgaWYgKHRva2VuID09PSB2b2lkIDAgfHwgdG9rZW4gPT09ICcnKSBicmVha1xuICAgIH07XG5cbiAgICBpZiAodG9rZW4gIT09IHZvaWQgMCAmJiB0b2tlbiAhPT0gJycpIG91dC5wdXNoKHRva2VuKVxuICB9O1xuXG4gIHJldHVybiBvdXRcbn1cblxuLyoqXG4gKiBSZXNldHMgdGhlIHBpcGVsaW5lIGJ5IHJlbW92aW5nIGFueSBleGlzdGluZyBwcm9jZXNzb3JzLlxuICpcbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fc3RhY2sgPSBbXVxufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGlwZWxpbmUgcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLl9zdGFjay5tYXAoZnVuY3Rpb24gKGZuKSB7XG4gICAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQoZm4pXG5cbiAgICByZXR1cm4gZm4ubGFiZWxcbiAgfSlcbn1cbi8qIVxuICogbHVuci5WZWN0b3JcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuVmVjdG9ycyBpbXBsZW1lbnQgdmVjdG9yIHJlbGF0ZWQgb3BlcmF0aW9ucyBmb3JcbiAqIGEgc2VyaWVzIG9mIGVsZW1lbnRzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlZlY3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fbWFnbml0dWRlID0gbnVsbFxuICB0aGlzLmxpc3QgPSB1bmRlZmluZWRcbiAgdGhpcy5sZW5ndGggPSAwXG59XG5cbi8qKlxuICogbHVuci5WZWN0b3IuTm9kZSBpcyBhIHNpbXBsZSBzdHJ1Y3QgZm9yIGVhY2ggbm9kZVxuICogaW4gYSBsdW5yLlZlY3Rvci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgbm9kZSBpbiB0aGUgdmVjdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IFRoZSBkYXRhIGF0IHRoaXMgbm9kZSBpbiB0aGUgdmVjdG9yLlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvci5Ob2RlfSBUaGUgbm9kZSBkaXJlY3RseSBhZnRlciB0aGlzIG5vZGUgaW4gdGhlIHZlY3Rvci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQG1lbWJlck9mIFZlY3RvclxuICovXG5sdW5yLlZlY3Rvci5Ob2RlID0gZnVuY3Rpb24gKGlkeCwgdmFsLCBuZXh0KSB7XG4gIHRoaXMuaWR4ID0gaWR4XG4gIHRoaXMudmFsID0gdmFsXG4gIHRoaXMubmV4dCA9IG5leHRcbn1cblxuLyoqXG4gKiBJbnNlcnRzIGEgbmV3IHZhbHVlIGF0IGEgcG9zaXRpb24gaW4gYSB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBpbmRleCBhdCB3aGljaCB0byBpbnNlcnQgYSB2YWx1ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgb2JqZWN0IHRvIGluc2VydCBpbiB0aGUgdmVjdG9yLlxuICogQG1lbWJlck9mIFZlY3Rvci5cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIChpZHgsIHZhbCkge1xuICB0aGlzLl9tYWduaXR1ZGUgPSB1bmRlZmluZWQ7XG4gIHZhciBsaXN0ID0gdGhpcy5saXN0XG5cbiAgaWYgKCFsaXN0KSB7XG4gICAgdGhpcy5saXN0ID0gbmV3IGx1bnIuVmVjdG9yLk5vZGUgKGlkeCwgdmFsLCBsaXN0KVxuICAgIHJldHVybiB0aGlzLmxlbmd0aCsrXG4gIH1cblxuICBpZiAoaWR4IDwgbGlzdC5pZHgpIHtcbiAgICB0aGlzLmxpc3QgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIGxpc3QpXG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoKytcbiAgfVxuXG4gIHZhciBwcmV2ID0gbGlzdCxcbiAgICAgIG5leHQgPSBsaXN0Lm5leHRcblxuICB3aGlsZSAobmV4dCAhPSB1bmRlZmluZWQpIHtcbiAgICBpZiAoaWR4IDwgbmV4dC5pZHgpIHtcbiAgICAgIHByZXYubmV4dCA9IG5ldyBsdW5yLlZlY3Rvci5Ob2RlIChpZHgsIHZhbCwgbmV4dClcbiAgICAgIHJldHVybiB0aGlzLmxlbmd0aCsrXG4gICAgfVxuXG4gICAgcHJldiA9IG5leHQsIG5leHQgPSBuZXh0Lm5leHRcbiAgfVxuXG4gIHByZXYubmV4dCA9IG5ldyBsdW5yLlZlY3Rvci5Ob2RlIChpZHgsIHZhbCwgbmV4dClcbiAgcmV0dXJuIHRoaXMubGVuZ3RoKytcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBtYWduaXR1ZGUgb2YgdGhpcyB2ZWN0b3IuXG4gKlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLm1hZ25pdHVkZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX21hZ25pdHVkZSkgcmV0dXJuIHRoaXMuX21hZ25pdHVkZVxuICB2YXIgbm9kZSA9IHRoaXMubGlzdCxcbiAgICAgIHN1bU9mU3F1YXJlcyA9IDAsXG4gICAgICB2YWxcblxuICB3aGlsZSAobm9kZSkge1xuICAgIHZhbCA9IG5vZGUudmFsXG4gICAgc3VtT2ZTcXVhcmVzICs9IHZhbCAqIHZhbFxuICAgIG5vZGUgPSBub2RlLm5leHRcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9tYWduaXR1ZGUgPSBNYXRoLnNxcnQoc3VtT2ZTcXVhcmVzKVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyIHZlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuVmVjdG9yfSBvdGhlclZlY3RvciBUaGUgdmVjdG9yIHRvIGNvbXB1dGUgdGhlIGRvdCBwcm9kdWN0IHdpdGguXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFZlY3RvclxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKG90aGVyVmVjdG9yKSB7XG4gIHZhciBub2RlID0gdGhpcy5saXN0LFxuICAgICAgb3RoZXJOb2RlID0gb3RoZXJWZWN0b3IubGlzdCxcbiAgICAgIGRvdFByb2R1Y3QgPSAwXG5cbiAgd2hpbGUgKG5vZGUgJiYgb3RoZXJOb2RlKSB7XG4gICAgaWYgKG5vZGUuaWR4IDwgb3RoZXJOb2RlLmlkeCkge1xuICAgICAgbm9kZSA9IG5vZGUubmV4dFxuICAgIH0gZWxzZSBpZiAobm9kZS5pZHggPiBvdGhlck5vZGUuaWR4KSB7XG4gICAgICBvdGhlck5vZGUgPSBvdGhlck5vZGUubmV4dFxuICAgIH0gZWxzZSB7XG4gICAgICBkb3RQcm9kdWN0ICs9IG5vZGUudmFsICogb3RoZXJOb2RlLnZhbFxuICAgICAgbm9kZSA9IG5vZGUubmV4dFxuICAgICAgb3RoZXJOb2RlID0gb3RoZXJOb2RlLm5leHRcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZG90UHJvZHVjdFxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvc2luZSBzaW1pbGFyaXR5IGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcbiAqIHZlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuVmVjdG9yfSBvdGhlclZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHRvIGNhbGN1bGF0ZSB0aGVcbiAqIHNpbWlsYXJpdHkgd2l0aC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgVmVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5zaW1pbGFyaXR5ID0gZnVuY3Rpb24gKG90aGVyVmVjdG9yKSB7XG4gIHJldHVybiB0aGlzLmRvdChvdGhlclZlY3RvcikgLyAodGhpcy5tYWduaXR1ZGUoKSAqIG90aGVyVmVjdG9yLm1hZ25pdHVkZSgpKVxufVxuLyohXG4gKiBsdW5yLlNvcnRlZFNldFxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5Tb3J0ZWRTZXRzIGFyZSB1c2VkIHRvIG1haW50YWluIGFuIGFycmF5IG9mIHVuaXEgdmFsdWVzIGluIGEgc29ydGVkXG4gKiBvcmRlci5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5Tb3J0ZWRTZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubGVuZ3RoID0gMFxuICB0aGlzLmVsZW1lbnRzID0gW11cbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBzb3J0ZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHNldCB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuU29ydGVkU2V0fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIHZhciBzZXQgPSBuZXcgdGhpc1xuXG4gIHNldC5lbGVtZW50cyA9IHNlcmlhbGlzZWREYXRhXG4gIHNldC5sZW5ndGggPSBzZXJpYWxpc2VkRGF0YS5sZW5ndGhcblxuICByZXR1cm4gc2V0XG59XG5cbi8qKlxuICogSW5zZXJ0cyBuZXcgaXRlbXMgaW50byB0aGUgc2V0IGluIHRoZSBjb3JyZWN0IHBvc2l0aW9uIHRvIG1haW50YWluIHRoZVxuICogb3JkZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFRoZSBvYmplY3RzIHRvIGFkZCB0byB0aGlzIHNldC5cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGksIGVsZW1lbnRcblxuICBmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZWxlbWVudCA9IGFyZ3VtZW50c1tpXVxuICAgIGlmICh+dGhpcy5pbmRleE9mKGVsZW1lbnQpKSBjb250aW51ZVxuICAgIHRoaXMuZWxlbWVudHMuc3BsaWNlKHRoaXMubG9jYXRpb25Gb3IoZWxlbWVudCksIDAsIGVsZW1lbnQpXG4gIH1cblxuICB0aGlzLmxlbmd0aCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoXG59XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBzb3J0ZWQgc2V0IGludG8gYW4gYXJyYXkuXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZWxlbWVudHMuc2xpY2UoKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYXJyYXkgd2l0aCB0aGUgcmVzdWx0cyBvZiBjYWxsaW5nIGEgcHJvdmlkZWQgZnVuY3Rpb24gb24gZXZlcnlcbiAqIGVsZW1lbnQgaW4gdGhpcyBzb3J0ZWQgc2V0LlxuICpcbiAqIERlbGVnYXRlcyB0byBBcnJheS5wcm90b3R5cGUubWFwIGFuZCBoYXMgdGhlIHNhbWUgc2lnbmF0dXJlLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBvbiBlYWNoIGVsZW1lbnQgb2YgdGhlXG4gKiBzZXQuXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4IEFuIG9wdGlvbmFsIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIHRoZSBjb250ZXh0XG4gKiBmb3IgdGhlIGZ1bmN0aW9uIGZuLlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKGZuLCBjdHgpIHtcbiAgcmV0dXJuIHRoaXMuZWxlbWVudHMubWFwKGZuLCBjdHgpXG59XG5cbi8qKlxuICogRXhlY3V0ZXMgYSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIHBlciBzb3J0ZWQgc2V0IGVsZW1lbnQuXG4gKlxuICogRGVsZWdhdGVzIHRvIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoIGFuZCBoYXMgdGhlIHNhbWUgc2lnbmF0dXJlLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBvbiBlYWNoIGVsZW1lbnQgb2YgdGhlXG4gKiBzZXQuXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4IEFuIG9wdGlvbmFsIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIHRoZSBjb250ZXh0XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKiBmb3IgdGhlIGZ1bmN0aW9uIGZuLlxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChmbiwgY3R4KSB7XG4gIHJldHVybiB0aGlzLmVsZW1lbnRzLmZvckVhY2goZm4sIGN0eClcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbmRleCBhdCB3aGljaCBhIGdpdmVuIGVsZW1lbnQgY2FuIGJlIGZvdW5kIGluIHRoZVxuICogc29ydGVkIHNldCwgb3IgLTEgaWYgaXQgaXMgbm90IHByZXNlbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVsZW0gVGhlIG9iamVjdCB0byBsb2NhdGUgaW4gdGhlIHNvcnRlZCBzZXQuXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gIHZhciBzdGFydCA9IDAsXG4gICAgICBlbmQgPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydCxcbiAgICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKSxcbiAgICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG5cbiAgd2hpbGUgKHNlY3Rpb25MZW5ndGggPiAxKSB7XG4gICAgaWYgKHBpdm90RWxlbSA9PT0gZWxlbSkgcmV0dXJuIHBpdm90XG5cbiAgICBpZiAocGl2b3RFbGVtIDwgZWxlbSkgc3RhcnQgPSBwaXZvdFxuICAgIGlmIChwaXZvdEVsZW0gPiBlbGVtKSBlbmQgPSBwaXZvdFxuXG4gICAgc2VjdGlvbkxlbmd0aCA9IGVuZCAtIHN0YXJ0XG4gICAgcGl2b3QgPSBzdGFydCArIE1hdGguZmxvb3Ioc2VjdGlvbkxlbmd0aCAvIDIpXG4gICAgcGl2b3RFbGVtID0gdGhpcy5lbGVtZW50c1twaXZvdF1cbiAgfVxuXG4gIGlmIChwaXZvdEVsZW0gPT09IGVsZW0pIHJldHVybiBwaXZvdFxuXG4gIHJldHVybiAtMVxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIHdpdGhpbiB0aGUgc29ydGVkIHNldCB0aGF0IGFuIGVsZW1lbnQgc2hvdWxkIGJlXG4gKiBpbnNlcnRlZCBhdCB0byBtYWludGFpbiB0aGUgY3VycmVudCBvcmRlciBvZiB0aGUgc2V0LlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IHRoZSBlbGVtZW50IHRvIHNlYXJjaCBmb3IgZG9lcyBub3QgYWxyZWFkeSBleGlzdFxuICogaW4gdGhlIHNvcnRlZCBzZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVsZW0gVGhlIGVsZW0gdG8gZmluZCB0aGUgcG9zaXRpb24gZm9yIGluIHRoZSBzZXRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5sb2NhdGlvbkZvciA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gIHZhciBzdGFydCA9IDAsXG4gICAgICBlbmQgPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCxcbiAgICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydCxcbiAgICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKSxcbiAgICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG5cbiAgd2hpbGUgKHNlY3Rpb25MZW5ndGggPiAxKSB7XG4gICAgaWYgKHBpdm90RWxlbSA8IGVsZW0pIHN0YXJ0ID0gcGl2b3RcbiAgICBpZiAocGl2b3RFbGVtID4gZWxlbSkgZW5kID0gcGl2b3RcblxuICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydFxuICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKVxuICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG4gIH1cblxuICBpZiAocGl2b3RFbGVtID4gZWxlbSkgcmV0dXJuIHBpdm90XG4gIGlmIChwaXZvdEVsZW0gPCBlbGVtKSByZXR1cm4gcGl2b3QgKyAxXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBsdW5yLlNvcnRlZFNldCB0aGF0IGNvbnRhaW5zIHRoZSBlbGVtZW50cyBpbiB0aGUgaW50ZXJzZWN0aW9uXG4gKiBvZiB0aGlzIHNldCBhbmQgdGhlIHBhc3NlZCBzZXQuXG4gKlxuICogQHBhcmFtIHtsdW5yLlNvcnRlZFNldH0gb3RoZXJTZXQgVGhlIHNldCB0byBpbnRlcnNlY3Qgd2l0aCB0aGlzIHNldC5cbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmludGVyc2VjdCA9IGZ1bmN0aW9uIChvdGhlclNldCkge1xuICB2YXIgaW50ZXJzZWN0U2V0ID0gbmV3IGx1bnIuU29ydGVkU2V0LFxuICAgICAgaSA9IDAsIGogPSAwLFxuICAgICAgYV9sZW4gPSB0aGlzLmxlbmd0aCwgYl9sZW4gPSBvdGhlclNldC5sZW5ndGgsXG4gICAgICBhID0gdGhpcy5lbGVtZW50cywgYiA9IG90aGVyU2V0LmVsZW1lbnRzXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBpZiAoaSA+IGFfbGVuIC0gMSB8fCBqID4gYl9sZW4gLSAxKSBicmVha1xuXG4gICAgaWYgKGFbaV0gPT09IGJbal0pIHtcbiAgICAgIGludGVyc2VjdFNldC5hZGQoYVtpXSlcbiAgICAgIGkrKywgaisrXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChhW2ldIDwgYltqXSkge1xuICAgICAgaSsrXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChhW2ldID4gYltqXSkge1xuICAgICAgaisrXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gaW50ZXJzZWN0U2V0XG59XG5cbi8qKlxuICogTWFrZXMgYSBjb3B5IG9mIHRoaXMgc2V0XG4gKlxuICogQHJldHVybnMge2x1bnIuU29ydGVkU2V0fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjbG9uZSA9IG5ldyBsdW5yLlNvcnRlZFNldFxuXG4gIGNsb25lLmVsZW1lbnRzID0gdGhpcy50b0FycmF5KClcbiAgY2xvbmUubGVuZ3RoID0gY2xvbmUuZWxlbWVudHMubGVuZ3RoXG5cbiAgcmV0dXJuIGNsb25lXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBsdW5yLlNvcnRlZFNldCB0aGF0IGNvbnRhaW5zIHRoZSBlbGVtZW50cyBpbiB0aGUgdW5pb25cbiAqIG9mIHRoaXMgc2V0IGFuZCB0aGUgcGFzc2VkIHNldC5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuU29ydGVkU2V0fSBvdGhlclNldCBUaGUgc2V0IHRvIHVuaW9uIHdpdGggdGhpcyBzZXQuXG4gKiBAcmV0dXJucyB7bHVuci5Tb3J0ZWRTZXR9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS51bmlvbiA9IGZ1bmN0aW9uIChvdGhlclNldCkge1xuICB2YXIgbG9uZ1NldCwgc2hvcnRTZXQsIHVuaW9uU2V0XG5cbiAgaWYgKHRoaXMubGVuZ3RoID49IG90aGVyU2V0Lmxlbmd0aCkge1xuICAgIGxvbmdTZXQgPSB0aGlzLCBzaG9ydFNldCA9IG90aGVyU2V0XG4gIH0gZWxzZSB7XG4gICAgbG9uZ1NldCA9IG90aGVyU2V0LCBzaG9ydFNldCA9IHRoaXNcbiAgfVxuXG4gIHVuaW9uU2V0ID0gbG9uZ1NldC5jbG9uZSgpXG5cbiAgZm9yKHZhciBpID0gMCwgc2hvcnRTZXRFbGVtZW50cyA9IHNob3J0U2V0LnRvQXJyYXkoKTsgaSA8IHNob3J0U2V0RWxlbWVudHMubGVuZ3RoOyBpKyspe1xuICAgIHVuaW9uU2V0LmFkZChzaG9ydFNldEVsZW1lbnRzW2ldKVxuICB9XG5cbiAgcmV0dXJuIHVuaW9uU2V0XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzb3J0ZWQgc2V0IHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudG9BcnJheSgpXG59XG4vKiFcbiAqIGx1bnIuSW5kZXhcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuSW5kZXggaXMgb2JqZWN0IHRoYXQgbWFuYWdlcyBhIHNlYXJjaCBpbmRleC4gIEl0IGNvbnRhaW5zIHRoZSBpbmRleGVzXG4gKiBhbmQgc3RvcmVzIGFsbCB0aGUgdG9rZW5zIGFuZCBkb2N1bWVudCBsb29rdXBzLiAgSXQgYWxzbyBwcm92aWRlcyB0aGUgbWFpblxuICogdXNlciBmYWNpbmcgQVBJIGZvciB0aGUgbGlicmFyeS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5JbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fZmllbGRzID0gW11cbiAgdGhpcy5fcmVmID0gJ2lkJ1xuICB0aGlzLnBpcGVsaW5lID0gbmV3IGx1bnIuUGlwZWxpbmVcbiAgdGhpcy5kb2N1bWVudFN0b3JlID0gbmV3IGx1bnIuU3RvcmVcbiAgdGhpcy50b2tlblN0b3JlID0gbmV3IGx1bnIuVG9rZW5TdG9yZVxuICB0aGlzLmNvcnB1c1Rva2VucyA9IG5ldyBsdW5yLlNvcnRlZFNldFxuICB0aGlzLmV2ZW50RW1pdHRlciA9ICBuZXcgbHVuci5FdmVudEVtaXR0ZXJcbiAgdGhpcy50b2tlbml6ZXJGbiA9IGx1bnIudG9rZW5pemVyXG5cbiAgdGhpcy5faWRmQ2FjaGUgPSB7fVxuXG4gIHRoaXMub24oJ2FkZCcsICdyZW1vdmUnLCAndXBkYXRlJywgKGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pZGZDYWNoZSA9IHt9XG4gIH0pLmJpbmQodGhpcykpXG59XG5cbi8qKlxuICogQmluZCBhIGhhbmRsZXIgdG8gZXZlbnRzIGJlaW5nIGVtaXR0ZWQgYnkgdGhlIGluZGV4LlxuICpcbiAqIFRoZSBoYW5kbGVyIGNhbiBiZSBib3VuZCB0byBtYW55IGV2ZW50cyBhdCB0aGUgc2FtZSB0aW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZXZlbnROYW1lXSBUaGUgbmFtZShzKSBvZiBldmVudHMgdG8gYmluZCB0aGUgZnVuY3Rpb24gdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gIHJldHVybiB0aGlzLmV2ZW50RW1pdHRlci5hZGRMaXN0ZW5lci5hcHBseSh0aGlzLmV2ZW50RW1pdHRlciwgYXJncylcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgaGFuZGxlciBmcm9tIGFuIGV2ZW50IGJlaW5nIGVtaXR0ZWQgYnkgdGhlIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgZXZlbnRzIHRvIHJlbW92ZSB0aGUgZnVuY3Rpb24gZnJvbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBzZXJpYWxpc2VkIHNldCB0byBsb2FkLlxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICByZXR1cm4gdGhpcy5ldmVudEVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgZm4pXG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgaW5kZXguXG4gKlxuICogSXNzdWVzIGEgd2FybmluZyBpZiB0aGUgaW5kZXggYmVpbmcgaW1wb3J0ZWQgd2FzIHNlcmlhbGlzZWRcbiAqIGJ5IGEgZGlmZmVyZW50IHZlcnNpb24gb2YgbHVuci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXNlZERhdGEgVGhlIHNlcmlhbGlzZWQgc2V0IHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZERhdGEpIHtcbiAgaWYgKHNlcmlhbGlzZWREYXRhLnZlcnNpb24gIT09IGx1bnIudmVyc2lvbikge1xuICAgIGx1bnIudXRpbHMud2FybigndmVyc2lvbiBtaXNtYXRjaDogY3VycmVudCAnICsgbHVuci52ZXJzaW9uICsgJyBpbXBvcnRpbmcgJyArIHNlcmlhbGlzZWREYXRhLnZlcnNpb24pXG4gIH1cblxuICB2YXIgaWR4ID0gbmV3IHRoaXNcblxuICBpZHguX2ZpZWxkcyA9IHNlcmlhbGlzZWREYXRhLmZpZWxkc1xuICBpZHguX3JlZiA9IHNlcmlhbGlzZWREYXRhLnJlZlxuXG4gIGlkeC50b2tlbml6ZXIobHVuci50b2tlbml6ZXIubG9hZChzZXJpYWxpc2VkRGF0YS50b2tlbml6ZXIpKVxuICBpZHguZG9jdW1lbnRTdG9yZSA9IGx1bnIuU3RvcmUubG9hZChzZXJpYWxpc2VkRGF0YS5kb2N1bWVudFN0b3JlKVxuICBpZHgudG9rZW5TdG9yZSA9IGx1bnIuVG9rZW5TdG9yZS5sb2FkKHNlcmlhbGlzZWREYXRhLnRva2VuU3RvcmUpXG4gIGlkeC5jb3JwdXNUb2tlbnMgPSBsdW5yLlNvcnRlZFNldC5sb2FkKHNlcmlhbGlzZWREYXRhLmNvcnB1c1Rva2VucylcbiAgaWR4LnBpcGVsaW5lID0gbHVuci5QaXBlbGluZS5sb2FkKHNlcmlhbGlzZWREYXRhLnBpcGVsaW5lKVxuXG4gIHJldHVybiBpZHhcbn1cblxuLyoqXG4gKiBBZGRzIGEgZmllbGQgdG8gdGhlIGxpc3Qgb2YgZmllbGRzIHRoYXQgd2lsbCBiZSBzZWFyY2hhYmxlIHdpdGhpbiBkb2N1bWVudHNcbiAqIGluIHRoZSBpbmRleC5cbiAqXG4gKiBBbiBvcHRpb25hbCBib29zdCBwYXJhbSBjYW4gYmUgcGFzc2VkIHRvIGFmZmVjdCBob3cgbXVjaCB0b2tlbnMgaW4gdGhpcyBmaWVsZFxuICogcmFuayBpbiBzZWFyY2ggcmVzdWx0cywgYnkgZGVmYXVsdCB0aGUgYm9vc3QgdmFsdWUgaXMgMS5cbiAqXG4gKiBGaWVsZHMgc2hvdWxkIGJlIGFkZGVkIGJlZm9yZSBhbnkgZG9jdW1lbnRzIGFyZSBhZGRlZCB0byB0aGUgaW5kZXgsIGZpZWxkc1xuICogdGhhdCBhcmUgYWRkZWQgYWZ0ZXIgZG9jdW1lbnRzIGFyZSBhZGRlZCB0byB0aGUgaW5kZXggd2lsbCBvbmx5IGFwcGx5IHRvIG5ld1xuICogZG9jdW1lbnRzIGFkZGVkIHRvIHRoZSBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGROYW1lIFRoZSBuYW1lIG9mIHRoZSBmaWVsZCB3aXRoaW4gdGhlIGRvY3VtZW50IHRoYXRcbiAqIHNob3VsZCBiZSBpbmRleGVkXG4gKiBAcGFyYW0ge051bWJlcn0gYm9vc3QgQW4gb3B0aW9uYWwgYm9vc3QgdGhhdCBjYW4gYmUgYXBwbGllZCB0byB0ZXJtcyBpbiB0aGlzXG4gKiBmaWVsZC5cbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24gKGZpZWxkTmFtZSwgb3B0cykge1xuICB2YXIgb3B0cyA9IG9wdHMgfHwge30sXG4gICAgICBmaWVsZCA9IHsgbmFtZTogZmllbGROYW1lLCBib29zdDogb3B0cy5ib29zdCB8fCAxIH1cblxuICB0aGlzLl9maWVsZHMucHVzaChmaWVsZClcbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBwcm9wZXJ0eSB1c2VkIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IGRvY3VtZW50cyBhZGRlZCB0byB0aGUgaW5kZXgsXG4gKiBieSBkZWZhdWx0IHRoaXMgcHJvcGVydHkgaXMgJ2lkJy5cbiAqXG4gKiBUaGlzIHNob3VsZCBvbmx5IGJlIGNoYW5nZWQgYmVmb3JlIGFkZGluZyBkb2N1bWVudHMgdG8gdGhlIGluZGV4LCBjaGFuZ2luZ1xuICogdGhlIHJlZiBwcm9wZXJ0eSB3aXRob3V0IHJlc2V0dGluZyB0aGUgaW5kZXggY2FuIGxlYWQgdG8gdW5leHBlY3RlZCByZXN1bHRzLlxuICpcbiAqIFRoZSB2YWx1ZSBvZiByZWYgY2FuIGJlIG9mIGFueSB0eXBlIGJ1dCBpdCBfbXVzdF8gYmUgc3RhYmx5IGNvbXBhcmFibGUgYW5kXG4gKiBvcmRlcmFibGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlZk5hbWUgVGhlIHByb3BlcnR5IHRvIHVzZSB0byB1bmlxdWVseSBpZGVudGlmeSB0aGVcbiAqIGRvY3VtZW50cyBpbiB0aGUgaW5kZXguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVtaXRFdmVudCBXaGV0aGVyIHRvIGVtaXQgYWRkIGV2ZW50cywgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24gKHJlZk5hbWUpIHtcbiAgdGhpcy5fcmVmID0gcmVmTmFtZVxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHRva2VuaXplciB1c2VkIGZvciB0aGlzIGluZGV4LlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlIGluZGV4IHdpbGwgdXNlIHRoZSBkZWZhdWx0IHRva2VuaXplciwgbHVuci50b2tlbml6ZXIuIFRoZSB0b2tlbml6ZXJcbiAqIHNob3VsZCBvbmx5IGJlIGNoYW5nZWQgYmVmb3JlIGFkZGluZyBkb2N1bWVudHMgdG8gdGhlIGluZGV4LiBDaGFuZ2luZyB0aGUgdG9rZW5pemVyXG4gKiB3aXRob3V0IHJlLWJ1aWxkaW5nIHRoZSBpbmRleCBjYW4gbGVhZCB0byB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHVzZSBhcyBhIHRva2VuaXplci5cbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnRva2VuaXplciA9IGZ1bmN0aW9uIChmbikge1xuICB2YXIgaXNSZWdpc3RlcmVkID0gZm4ubGFiZWwgJiYgKGZuLmxhYmVsIGluIGx1bnIudG9rZW5pemVyLnJlZ2lzdGVyZWRGdW5jdGlvbnMpXG5cbiAgaWYgKCFpc1JlZ2lzdGVyZWQpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ0Z1bmN0aW9uIGlzIG5vdCBhIHJlZ2lzdGVyZWQgdG9rZW5pemVyLiBUaGlzIG1heSBjYXVzZSBwcm9ibGVtcyB3aGVuIHNlcmlhbGlzaW5nIHRoZSBpbmRleCcpXG4gIH1cblxuICB0aGlzLnRva2VuaXplckZuID0gZm5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBBZGQgYSBkb2N1bWVudCB0byB0aGUgaW5kZXguXG4gKlxuICogVGhpcyBpcyB0aGUgd2F5IG5ldyBkb2N1bWVudHMgZW50ZXIgdGhlIGluZGV4LCB0aGlzIGZ1bmN0aW9uIHdpbGwgcnVuIHRoZVxuICogZmllbGRzIGZyb20gdGhlIGRvY3VtZW50IHRocm91Z2ggdGhlIGluZGV4J3MgcGlwZWxpbmUgYW5kIHRoZW4gYWRkIGl0IHRvXG4gKiB0aGUgaW5kZXgsIGl0IHdpbGwgdGhlbiBzaG93IHVwIGluIHNlYXJjaCByZXN1bHRzLlxuICpcbiAqIEFuICdhZGQnIGV2ZW50IGlzIGVtaXR0ZWQgd2l0aCB0aGUgZG9jdW1lbnQgdGhhdCBoYXMgYmVlbiBhZGRlZCBhbmQgdGhlIGluZGV4XG4gKiB0aGUgZG9jdW1lbnQgaGFzIGJlZW4gYWRkZWQgdG8uIFRoaXMgZXZlbnQgY2FuIGJlIHNpbGVuY2VkIGJ5IHBhc3NpbmcgZmFsc2VcbiAqIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYWRkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvY3VtZW50IHRvIGFkZCB0byB0aGUgaW5kZXguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVtaXRFdmVudCBXaGV0aGVyIG9yIG5vdCB0byBlbWl0IGV2ZW50cywgZGVmYXVsdCB0cnVlLlxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChkb2MsIGVtaXRFdmVudCkge1xuICB2YXIgZG9jVG9rZW5zID0ge30sXG4gICAgICBhbGxEb2N1bWVudFRva2VucyA9IG5ldyBsdW5yLlNvcnRlZFNldCxcbiAgICAgIGRvY1JlZiA9IGRvY1t0aGlzLl9yZWZdLFxuICAgICAgZW1pdEV2ZW50ID0gZW1pdEV2ZW50ID09PSB1bmRlZmluZWQgPyB0cnVlIDogZW1pdEV2ZW50XG5cbiAgdGhpcy5fZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgdmFyIGZpZWxkVG9rZW5zID0gdGhpcy5waXBlbGluZS5ydW4odGhpcy50b2tlbml6ZXJGbihkb2NbZmllbGQubmFtZV0pKVxuXG4gICAgZG9jVG9rZW5zW2ZpZWxkLm5hbWVdID0gZmllbGRUb2tlbnNcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRUb2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB0b2tlbiA9IGZpZWxkVG9rZW5zW2ldXG4gICAgICBhbGxEb2N1bWVudFRva2Vucy5hZGQodG9rZW4pXG4gICAgICB0aGlzLmNvcnB1c1Rva2Vucy5hZGQodG9rZW4pXG4gICAgfVxuICB9LCB0aGlzKVxuXG4gIHRoaXMuZG9jdW1lbnRTdG9yZS5zZXQoZG9jUmVmLCBhbGxEb2N1bWVudFRva2VucylcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbERvY3VtZW50VG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gYWxsRG9jdW1lbnRUb2tlbnMuZWxlbWVudHNbaV1cbiAgICB2YXIgdGYgPSAwO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9maWVsZHMubGVuZ3RoOyBqKyspe1xuICAgICAgdmFyIGZpZWxkID0gdGhpcy5fZmllbGRzW2pdXG4gICAgICB2YXIgZmllbGRUb2tlbnMgPSBkb2NUb2tlbnNbZmllbGQubmFtZV1cbiAgICAgIHZhciBmaWVsZExlbmd0aCA9IGZpZWxkVG9rZW5zLmxlbmd0aFxuXG4gICAgICBpZiAoIWZpZWxkTGVuZ3RoKSBjb250aW51ZVxuXG4gICAgICB2YXIgdG9rZW5Db3VudCA9IDBcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZmllbGRMZW5ndGg7IGsrKyl7XG4gICAgICAgIGlmIChmaWVsZFRva2Vuc1trXSA9PT0gdG9rZW4pe1xuICAgICAgICAgIHRva2VuQ291bnQrK1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRmICs9ICh0b2tlbkNvdW50IC8gZmllbGRMZW5ndGggKiBmaWVsZC5ib29zdClcbiAgICB9XG5cbiAgICB0aGlzLnRva2VuU3RvcmUuYWRkKHRva2VuLCB7IHJlZjogZG9jUmVmLCB0ZjogdGYgfSlcbiAgfTtcblxuICBpZiAoZW1pdEV2ZW50KSB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdhZGQnLCBkb2MsIHRoaXMpXG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGRvY3VtZW50IGZyb20gdGhlIGluZGV4LlxuICpcbiAqIFRvIG1ha2Ugc3VyZSBkb2N1bWVudHMgbm8gbG9uZ2VyIHNob3cgdXAgaW4gc2VhcmNoIHJlc3VsdHMgdGhleSBjYW4gYmVcbiAqIHJlbW92ZWQgZnJvbSB0aGUgaW5kZXggdXNpbmcgdGhpcyBtZXRob2QuXG4gKlxuICogVGhlIGRvY3VtZW50IHBhc3NlZCBvbmx5IG5lZWRzIHRvIGhhdmUgdGhlIHNhbWUgcmVmIHByb3BlcnR5IHZhbHVlIGFzIHRoZVxuICogZG9jdW1lbnQgdGhhdCB3YXMgYWRkZWQgdG8gdGhlIGluZGV4LCB0aGV5IGNvdWxkIGJlIGNvbXBsZXRlbHkgZGlmZmVyZW50XG4gKiBvYmplY3RzLlxuICpcbiAqIEEgJ3JlbW92ZScgZXZlbnQgaXMgZW1pdHRlZCB3aXRoIHRoZSBkb2N1bWVudCB0aGF0IGhhcyBiZWVuIHJlbW92ZWQgYW5kIHRoZSBpbmRleFxuICogdGhlIGRvY3VtZW50IGhhcyBiZWVuIHJlbW92ZWQgZnJvbS4gVGhpcyBldmVudCBjYW4gYmUgc2lsZW5jZWQgYnkgcGFzc2luZyBmYWxzZVxuICogYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byByZW1vdmUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRvYyBUaGUgZG9jdW1lbnQgdG8gcmVtb3ZlIGZyb20gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciB0byBlbWl0IHJlbW92ZSBldmVudHMsIGRlZmF1bHRzIHRvIHRydWVcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZG9jLCBlbWl0RXZlbnQpIHtcbiAgdmFyIGRvY1JlZiA9IGRvY1t0aGlzLl9yZWZdLFxuICAgICAgZW1pdEV2ZW50ID0gZW1pdEV2ZW50ID09PSB1bmRlZmluZWQgPyB0cnVlIDogZW1pdEV2ZW50XG5cbiAgaWYgKCF0aGlzLmRvY3VtZW50U3RvcmUuaGFzKGRvY1JlZikpIHJldHVyblxuXG4gIHZhciBkb2NUb2tlbnMgPSB0aGlzLmRvY3VtZW50U3RvcmUuZ2V0KGRvY1JlZilcblxuICB0aGlzLmRvY3VtZW50U3RvcmUucmVtb3ZlKGRvY1JlZilcblxuICBkb2NUb2tlbnMuZm9yRWFjaChmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0aGlzLnRva2VuU3RvcmUucmVtb3ZlKHRva2VuLCBkb2NSZWYpXG4gIH0sIHRoaXMpXG5cbiAgaWYgKGVtaXRFdmVudCkgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgncmVtb3ZlJywgZG9jLCB0aGlzKVxufVxuXG4vKipcbiAqIFVwZGF0ZXMgYSBkb2N1bWVudCBpbiB0aGUgaW5kZXguXG4gKlxuICogV2hlbiBhIGRvY3VtZW50IGNvbnRhaW5lZCB3aXRoaW4gdGhlIGluZGV4IGdldHMgdXBkYXRlZCwgZmllbGRzIGNoYW5nZWQsXG4gKiBhZGRlZCBvciByZW1vdmVkLCB0byBtYWtlIHN1cmUgaXQgY29ycmVjdGx5IG1hdGNoZWQgYWdhaW5zdCBzZWFyY2ggcXVlcmllcyxcbiAqIGl0IHNob3VsZCBiZSB1cGRhdGVkIGluIHRoZSBpbmRleC5cbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBqdXN0IGEgd3JhcHBlciBhcm91bmQgYHJlbW92ZWAgYW5kIGBhZGRgXG4gKlxuICogQW4gJ3VwZGF0ZScgZXZlbnQgaXMgZW1pdHRlZCB3aXRoIHRoZSBkb2N1bWVudCB0aGF0IGhhcyBiZWVuIHVwZGF0ZWQgYW5kIHRoZSBpbmRleC5cbiAqIFRoaXMgZXZlbnQgY2FuIGJlIHNpbGVuY2VkIGJ5IHBhc3NpbmcgZmFsc2UgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byB1cGRhdGUuIE9ubHlcbiAqIGFuIHVwZGF0ZSBldmVudCB3aWxsIGJlIGZpcmVkLCB0aGUgJ2FkZCcgYW5kICdyZW1vdmUnIGV2ZW50cyBvZiB0aGUgdW5kZXJseWluZyBjYWxsc1xuICogYXJlIHNpbGVuY2VkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvY3VtZW50IHRvIHVwZGF0ZSBpbiB0aGUgaW5kZXguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVtaXRFdmVudCBXaGV0aGVyIHRvIGVtaXQgdXBkYXRlIGV2ZW50cywgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQHNlZSBJbmRleC5wcm90b3R5cGUucmVtb3ZlXG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5hZGRcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9jLCBlbWl0RXZlbnQpIHtcbiAgdmFyIGVtaXRFdmVudCA9IGVtaXRFdmVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGVtaXRFdmVudFxuXG4gIHRoaXMucmVtb3ZlKGRvYywgZmFsc2UpXG4gIHRoaXMuYWRkKGRvYywgZmFsc2UpXG5cbiAgaWYgKGVtaXRFdmVudCkgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgndXBkYXRlJywgZG9jLCB0aGlzKVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2UgZG9jdW1lbnQgZnJlcXVlbmN5IGZvciBhIHRva2VuIHdpdGhpbiB0aGUgaW5kZXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBjYWxjdWxhdGUgdGhlIGlkZiBvZi5cbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLmlkZlxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5pZGYgPSBmdW5jdGlvbiAodGVybSkge1xuICB2YXIgY2FjaGVLZXkgPSBcIkBcIiArIHRlcm1cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLl9pZGZDYWNoZSwgY2FjaGVLZXkpKSByZXR1cm4gdGhpcy5faWRmQ2FjaGVbY2FjaGVLZXldXG5cbiAgdmFyIGRvY3VtZW50RnJlcXVlbmN5ID0gdGhpcy50b2tlblN0b3JlLmNvdW50KHRlcm0pLFxuICAgICAgaWRmID0gMVxuXG4gIGlmIChkb2N1bWVudEZyZXF1ZW5jeSA+IDApIHtcbiAgICBpZGYgPSAxICsgTWF0aC5sb2codGhpcy5kb2N1bWVudFN0b3JlLmxlbmd0aCAvIGRvY3VtZW50RnJlcXVlbmN5KVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2lkZkNhY2hlW2NhY2hlS2V5XSA9IGlkZlxufVxuXG4vKipcbiAqIFNlYXJjaGVzIHRoZSBpbmRleCB1c2luZyB0aGUgcGFzc2VkIHF1ZXJ5LlxuICpcbiAqIFF1ZXJpZXMgc2hvdWxkIGJlIGEgc3RyaW5nLCBtdWx0aXBsZSB3b3JkcyBhcmUgYWxsb3dlZCBhbmQgd2lsbCBsZWFkIHRvIGFuXG4gKiBBTkQgYmFzZWQgcXVlcnksIGUuZy4gYGlkeC5zZWFyY2goJ2ZvbyBiYXInKWAgd2lsbCBydW4gYSBzZWFyY2ggZm9yXG4gKiBkb2N1bWVudHMgY29udGFpbmluZyBib3RoICdmb28nIGFuZCAnYmFyJy5cbiAqXG4gKiBBbGwgcXVlcnkgdG9rZW5zIGFyZSBwYXNzZWQgdGhyb3VnaCB0aGUgc2FtZSBwaXBlbGluZSB0aGF0IGRvY3VtZW50IHRva2Vuc1xuICogYXJlIHBhc3NlZCB0aHJvdWdoLCBzbyBhbnkgbGFuZ3VhZ2UgcHJvY2Vzc2luZyBpbnZvbHZlZCB3aWxsIGJlIHJ1biBvbiBldmVyeVxuICogcXVlcnkgdGVybS5cbiAqXG4gKiBFYWNoIHF1ZXJ5IHRlcm0gaXMgZXhwYW5kZWQsIHNvIHRoYXQgdGhlIHRlcm0gJ2hlJyBtaWdodCBiZSBleHBhbmRlZCB0b1xuICogJ2hlbGxvJyBhbmQgJ2hlbHAnIGlmIHRob3NlIHRlcm1zIHdlcmUgYWxyZWFkeSBpbmNsdWRlZCBpbiB0aGUgaW5kZXguXG4gKlxuICogTWF0Y2hpbmcgZG9jdW1lbnRzIGFyZSByZXR1cm5lZCBhcyBhbiBhcnJheSBvZiBvYmplY3RzLCBlYWNoIG9iamVjdCBjb250YWluc1xuICogdGhlIG1hdGNoaW5nIGRvY3VtZW50IHJlZiwgYXMgc2V0IGZvciB0aGlzIGluZGV4LCBhbmQgdGhlIHNpbWlsYXJpdHkgc2NvcmVcbiAqIGZvciB0aGlzIGRvY3VtZW50IGFnYWluc3QgdGhlIHF1ZXJ5LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VhcmNoIHRoZSBpbmRleCB3aXRoLlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLmlkZlxuICogQHNlZSBJbmRleC5wcm90b3R5cGUuZG9jdW1lbnRWZWN0b3JcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgdmFyIHF1ZXJ5VG9rZW5zID0gdGhpcy5waXBlbGluZS5ydW4odGhpcy50b2tlbml6ZXJGbihxdWVyeSkpLFxuICAgICAgcXVlcnlWZWN0b3IgPSBuZXcgbHVuci5WZWN0b3IsXG4gICAgICBkb2N1bWVudFNldHMgPSBbXSxcbiAgICAgIGZpZWxkQm9vc3RzID0gdGhpcy5fZmllbGRzLnJlZHVjZShmdW5jdGlvbiAobWVtbywgZikgeyByZXR1cm4gbWVtbyArIGYuYm9vc3QgfSwgMClcblxuICB2YXIgaGFzU29tZVRva2VuID0gcXVlcnlUb2tlbnMuc29tZShmdW5jdGlvbiAodG9rZW4pIHtcbiAgICByZXR1cm4gdGhpcy50b2tlblN0b3JlLmhhcyh0b2tlbilcbiAgfSwgdGhpcylcblxuICBpZiAoIWhhc1NvbWVUb2tlbikgcmV0dXJuIFtdXG5cbiAgcXVlcnlUb2tlbnNcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAodG9rZW4sIGksIHRva2Vucykge1xuICAgICAgdmFyIHRmID0gMSAvIHRva2Vucy5sZW5ndGggKiB0aGlzLl9maWVsZHMubGVuZ3RoICogZmllbGRCb29zdHMsXG4gICAgICAgICAgc2VsZiA9IHRoaXNcblxuICAgICAgdmFyIHNldCA9IHRoaXMudG9rZW5TdG9yZS5leHBhbmQodG9rZW4pLnJlZHVjZShmdW5jdGlvbiAobWVtbywga2V5KSB7XG4gICAgICAgIHZhciBwb3MgPSBzZWxmLmNvcnB1c1Rva2Vucy5pbmRleE9mKGtleSksXG4gICAgICAgICAgICBpZGYgPSBzZWxmLmlkZihrZXkpLFxuICAgICAgICAgICAgc2ltaWxhcml0eUJvb3N0ID0gMSxcbiAgICAgICAgICAgIHNldCA9IG5ldyBsdW5yLlNvcnRlZFNldFxuXG4gICAgICAgIC8vIGlmIHRoZSBleHBhbmRlZCBrZXkgaXMgbm90IGFuIGV4YWN0IG1hdGNoIHRvIHRoZSB0b2tlbiB0aGVuXG4gICAgICAgIC8vIHBlbmFsaXNlIHRoZSBzY29yZSBmb3IgdGhpcyBrZXkgYnkgaG93IGRpZmZlcmVudCB0aGUga2V5IGlzXG4gICAgICAgIC8vIHRvIHRoZSB0b2tlbi5cbiAgICAgICAgaWYgKGtleSAhPT0gdG9rZW4pIHtcbiAgICAgICAgICB2YXIgZGlmZiA9IE1hdGgubWF4KDMsIGtleS5sZW5ndGggLSB0b2tlbi5sZW5ndGgpXG4gICAgICAgICAgc2ltaWxhcml0eUJvb3N0ID0gMSAvIE1hdGgubG9nKGRpZmYpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHF1ZXJ5IHRmLWlkZiBzY29yZSBmb3IgdGhpcyB0b2tlblxuICAgICAgICAvLyBhcHBseWluZyBhbiBzaW1pbGFyaXR5Qm9vc3QgdG8gZW5zdXJlIGV4YWN0IG1hdGNoZXNcbiAgICAgICAgLy8gdGhlc2UgcmFuayBoaWdoZXIgdGhhbiBleHBhbmRlZCB0ZXJtc1xuICAgICAgICBpZiAocG9zID4gLTEpIHF1ZXJ5VmVjdG9yLmluc2VydChwb3MsIHRmICogaWRmICogc2ltaWxhcml0eUJvb3N0KVxuXG4gICAgICAgIC8vIGFkZCBhbGwgdGhlIGRvY3VtZW50cyB0aGF0IGhhdmUgdGhpcyBrZXkgaW50byBhIHNldFxuICAgICAgICAvLyBlbnN1cmluZyB0aGF0IHRoZSB0eXBlIG9mIGtleSBpcyBwcmVzZXJ2ZWRcbiAgICAgICAgdmFyIG1hdGNoaW5nRG9jdW1lbnRzID0gc2VsZi50b2tlblN0b3JlLmdldChrZXkpLFxuICAgICAgICAgICAgcmVmcyA9IE9iamVjdC5rZXlzKG1hdGNoaW5nRG9jdW1lbnRzKSxcbiAgICAgICAgICAgIHJlZnNMZW4gPSByZWZzLmxlbmd0aFxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVmc0xlbjsgaSsrKSB7XG4gICAgICAgICAgc2V0LmFkZChtYXRjaGluZ0RvY3VtZW50c1tyZWZzW2ldXS5yZWYpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVtby51bmlvbihzZXQpXG4gICAgICB9LCBuZXcgbHVuci5Tb3J0ZWRTZXQpXG5cbiAgICAgIGRvY3VtZW50U2V0cy5wdXNoKHNldClcbiAgICB9LCB0aGlzKVxuXG4gIHZhciBkb2N1bWVudFNldCA9IGRvY3VtZW50U2V0cy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIHNldCkge1xuICAgIHJldHVybiBtZW1vLmludGVyc2VjdChzZXQpXG4gIH0pXG5cbiAgcmV0dXJuIGRvY3VtZW50U2V0XG4gICAgLm1hcChmdW5jdGlvbiAocmVmKSB7XG4gICAgICByZXR1cm4geyByZWY6IHJlZiwgc2NvcmU6IHF1ZXJ5VmVjdG9yLnNpbWlsYXJpdHkodGhpcy5kb2N1bWVudFZlY3RvcihyZWYpKSB9XG4gICAgfSwgdGhpcylcbiAgICAuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlXG4gICAgfSlcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSB2ZWN0b3IgY29udGFpbmluZyBhbGwgdGhlIHRva2VucyBpbiB0aGUgZG9jdW1lbnQgbWF0Y2hpbmcgdGhlXG4gKiBwYXNzZWQgZG9jdW1lbnRSZWYuXG4gKlxuICogVGhlIHZlY3RvciBjb250YWlucyB0aGUgdGYtaWRmIHNjb3JlIGZvciBlYWNoIHRva2VuIGNvbnRhaW5lZCBpbiB0aGVcbiAqIGRvY3VtZW50IHdpdGggdGhlIHBhc3NlZCBkb2N1bWVudFJlZi4gIFRoZSB2ZWN0b3Igd2lsbCBjb250YWluIGFuIGVsZW1lbnRcbiAqIGZvciBldmVyeSB0b2tlbiBpbiB0aGUgaW5kZXhlcyBjb3JwdXMsIGlmIHRoZSBkb2N1bWVudCBkb2VzIG5vdCBjb250YWluIHRoYXRcbiAqIHRva2VuIHRoZSBlbGVtZW50IHdpbGwgYmUgMC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jdW1lbnRSZWYgVGhlIHJlZiB0byBmaW5kIHRoZSBkb2N1bWVudCB3aXRoLlxuICogQHJldHVybnMge2x1bnIuVmVjdG9yfVxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5kb2N1bWVudFZlY3RvciA9IGZ1bmN0aW9uIChkb2N1bWVudFJlZikge1xuICB2YXIgZG9jdW1lbnRUb2tlbnMgPSB0aGlzLmRvY3VtZW50U3RvcmUuZ2V0KGRvY3VtZW50UmVmKSxcbiAgICAgIGRvY3VtZW50VG9rZW5zTGVuZ3RoID0gZG9jdW1lbnRUb2tlbnMubGVuZ3RoLFxuICAgICAgZG9jdW1lbnRWZWN0b3IgPSBuZXcgbHVuci5WZWN0b3JcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRvY3VtZW50VG9rZW5zTGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSBkb2N1bWVudFRva2Vucy5lbGVtZW50c1tpXSxcbiAgICAgICAgdGYgPSB0aGlzLnRva2VuU3RvcmUuZ2V0KHRva2VuKVtkb2N1bWVudFJlZl0udGYsXG4gICAgICAgIGlkZiA9IHRoaXMuaWRmKHRva2VuKVxuXG4gICAgZG9jdW1lbnRWZWN0b3IuaW5zZXJ0KHRoaXMuY29ycHVzVG9rZW5zLmluZGV4T2YodG9rZW4pLCB0ZiAqIGlkZilcbiAgfTtcblxuICByZXR1cm4gZG9jdW1lbnRWZWN0b3Jcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIGluZGV4IHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHZlcnNpb246IGx1bnIudmVyc2lvbixcbiAgICBmaWVsZHM6IHRoaXMuX2ZpZWxkcyxcbiAgICByZWY6IHRoaXMuX3JlZixcbiAgICB0b2tlbml6ZXI6IHRoaXMudG9rZW5pemVyRm4ubGFiZWwsXG4gICAgZG9jdW1lbnRTdG9yZTogdGhpcy5kb2N1bWVudFN0b3JlLnRvSlNPTigpLFxuICAgIHRva2VuU3RvcmU6IHRoaXMudG9rZW5TdG9yZS50b0pTT04oKSxcbiAgICBjb3JwdXNUb2tlbnM6IHRoaXMuY29ycHVzVG9rZW5zLnRvSlNPTigpLFxuICAgIHBpcGVsaW5lOiB0aGlzLnBpcGVsaW5lLnRvSlNPTigpXG4gIH1cbn1cblxuLyoqXG4gKiBBcHBsaWVzIGEgcGx1Z2luIHRvIHRoZSBjdXJyZW50IGluZGV4LlxuICpcbiAqIEEgcGx1Z2luIGlzIGEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2l0aCB0aGUgaW5kZXggYXMgaXRzIGNvbnRleHQuXG4gKiBQbHVnaW5zIGNhbiBiZSB1c2VkIHRvIGN1c3RvbWlzZSBvciBleHRlbmQgdGhlIGJlaGF2aW91ciB0aGUgaW5kZXhcbiAqIGluIHNvbWUgd2F5LiBBIHBsdWdpbiBpcyBqdXN0IGEgZnVuY3Rpb24sIHRoYXQgZW5jYXBzdWxhdGVkIHRoZSBjdXN0b21cbiAqIGJlaGF2aW91ciB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBpbmRleC5cbiAqXG4gKiBUaGUgcGx1Z2luIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGluZGV4IGFzIGl0cyBhcmd1bWVudCwgYWRkaXRpb25hbFxuICogYXJndW1lbnRzIGNhbiBhbHNvIGJlIHBhc3NlZCB3aGVuIGNhbGxpbmcgdXNlLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWRcbiAqIHdpdGggdGhlIGluZGV4IGFzIGl0cyBjb250ZXh0LlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIHZhciBteVBsdWdpbiA9IGZ1bmN0aW9uIChpZHgsIGFyZzEsIGFyZzIpIHtcbiAqICAgICAgIC8vIGB0aGlzYCBpcyB0aGUgaW5kZXggdG8gYmUgZXh0ZW5kZWRcbiAqICAgICAgIC8vIGFwcGx5IGFueSBleHRlbnNpb25zIGV0YyBoZXJlLlxuICogICAgIH1cbiAqXG4gKiAgICAgdmFyIGlkeCA9IGx1bnIoZnVuY3Rpb24gKCkge1xuICogICAgICAgdGhpcy51c2UobXlQbHVnaW4sICdhcmcxJywgJ2FyZzInKVxuICogICAgIH0pXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGx1Z2luIFRoZSBwbHVnaW4gdG8gYXBwbHkuXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gKHBsdWdpbikge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgYXJncy51bnNoaWZ0KHRoaXMpXG4gIHBsdWdpbi5hcHBseSh0aGlzLCBhcmdzKVxufVxuLyohXG4gKiBsdW5yLlN0b3JlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlN0b3JlIGlzIGEgc2ltcGxlIGtleS12YWx1ZSBzdG9yZSB1c2VkIGZvciBzdG9yaW5nIHNldHMgb2YgdG9rZW5zIGZvclxuICogZG9jdW1lbnRzIHN0b3JlZCBpbiBpbmRleC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBtb2R1bGVcbiAqL1xubHVuci5TdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zdG9yZSA9IHt9XG4gIHRoaXMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHN0b3JlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHN0b3JlIHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5TdG9yZX1cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZERhdGEpIHtcbiAgdmFyIHN0b3JlID0gbmV3IHRoaXNcblxuICBzdG9yZS5sZW5ndGggPSBzZXJpYWxpc2VkRGF0YS5sZW5ndGhcbiAgc3RvcmUuc3RvcmUgPSBPYmplY3Qua2V5cyhzZXJpYWxpc2VkRGF0YS5zdG9yZSkucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBrZXkpIHtcbiAgICBtZW1vW2tleV0gPSBsdW5yLlNvcnRlZFNldC5sb2FkKHNlcmlhbGlzZWREYXRhLnN0b3JlW2tleV0pXG4gICAgcmV0dXJuIG1lbW9cbiAgfSwge30pXG5cbiAgcmV0dXJuIHN0b3JlXG59XG5cbi8qKlxuICogU3RvcmVzIHRoZSBnaXZlbiB0b2tlbnMgaW4gdGhlIHN0b3JlIGFnYWluc3QgdGhlIGdpdmVuIGlkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUga2V5IHVzZWQgdG8gc3RvcmUgdGhlIHRva2VucyBhZ2FpbnN0LlxuICogQHBhcmFtIHtPYmplY3R9IHRva2VucyBUaGUgdG9rZW5zIHRvIHN0b3JlIGFnYWluc3QgdGhlIGtleS5cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoaWQsIHRva2Vucykge1xuICBpZiAoIXRoaXMuaGFzKGlkKSkgdGhpcy5sZW5ndGgrK1xuICB0aGlzLnN0b3JlW2lkXSA9IHRva2Vuc1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgdG9rZW5zIGZyb20gdGhlIHN0b3JlIGZvciBhIGdpdmVuIGtleS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGtleSB0byBsb29rdXAgYW5kIHJldHJpZXZlIGZyb20gdGhlIHN0b3JlLlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgcmV0dXJuIHRoaXMuc3RvcmVbaWRdXG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIHN0b3JlIGNvbnRhaW5zIGEga2V5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUgaWQgdG8gbG9vayB1cCBpbiB0aGUgc3RvcmUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoaWQpIHtcbiAgcmV0dXJuIGlkIGluIHRoaXMuc3RvcmVcbn1cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSB2YWx1ZSBmb3IgYSBrZXkgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUgaWQgdG8gcmVtb3ZlIGZyb20gdGhlIHN0b3JlLlxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpZCkge1xuICBpZiAoIXRoaXMuaGFzKGlkKSkgcmV0dXJuXG5cbiAgZGVsZXRlIHRoaXMuc3RvcmVbaWRdXG4gIHRoaXMubGVuZ3RoLS1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHN0b3JlIHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgIGxlbmd0aDogdGhpcy5sZW5ndGhcbiAgfVxufVxuXG4vKiFcbiAqIGx1bnIuc3RlbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICogSW5jbHVkZXMgY29kZSBmcm9tIC0gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluL1BvcnRlclN0ZW1tZXIvanMudHh0XG4gKi9cblxuLyoqXG4gKiBsdW5yLnN0ZW1tZXIgaXMgYW4gZW5nbGlzaCBsYW5ndWFnZSBzdGVtbWVyLCB0aGlzIGlzIGEgSmF2YVNjcmlwdFxuICogaW1wbGVtZW50YXRpb24gb2YgdGhlIFBvcnRlclN0ZW1tZXIgdGFrZW4gZnJvbSBodHRwOi8vdGFydGFydXMub3JnL35tYXJ0aW5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gc3RlbVxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICovXG5sdW5yLnN0ZW1tZXIgPSAoZnVuY3Rpb24oKXtcbiAgdmFyIHN0ZXAybGlzdCA9IHtcbiAgICAgIFwiYXRpb25hbFwiIDogXCJhdGVcIixcbiAgICAgIFwidGlvbmFsXCIgOiBcInRpb25cIixcbiAgICAgIFwiZW5jaVwiIDogXCJlbmNlXCIsXG4gICAgICBcImFuY2lcIiA6IFwiYW5jZVwiLFxuICAgICAgXCJpemVyXCIgOiBcIml6ZVwiLFxuICAgICAgXCJibGlcIiA6IFwiYmxlXCIsXG4gICAgICBcImFsbGlcIiA6IFwiYWxcIixcbiAgICAgIFwiZW50bGlcIiA6IFwiZW50XCIsXG4gICAgICBcImVsaVwiIDogXCJlXCIsXG4gICAgICBcIm91c2xpXCIgOiBcIm91c1wiLFxuICAgICAgXCJpemF0aW9uXCIgOiBcIml6ZVwiLFxuICAgICAgXCJhdGlvblwiIDogXCJhdGVcIixcbiAgICAgIFwiYXRvclwiIDogXCJhdGVcIixcbiAgICAgIFwiYWxpc21cIiA6IFwiYWxcIixcbiAgICAgIFwiaXZlbmVzc1wiIDogXCJpdmVcIixcbiAgICAgIFwiZnVsbmVzc1wiIDogXCJmdWxcIixcbiAgICAgIFwib3VzbmVzc1wiIDogXCJvdXNcIixcbiAgICAgIFwiYWxpdGlcIiA6IFwiYWxcIixcbiAgICAgIFwiaXZpdGlcIiA6IFwiaXZlXCIsXG4gICAgICBcImJpbGl0aVwiIDogXCJibGVcIixcbiAgICAgIFwibG9naVwiIDogXCJsb2dcIlxuICAgIH0sXG5cbiAgICBzdGVwM2xpc3QgPSB7XG4gICAgICBcImljYXRlXCIgOiBcImljXCIsXG4gICAgICBcImF0aXZlXCIgOiBcIlwiLFxuICAgICAgXCJhbGl6ZVwiIDogXCJhbFwiLFxuICAgICAgXCJpY2l0aVwiIDogXCJpY1wiLFxuICAgICAgXCJpY2FsXCIgOiBcImljXCIsXG4gICAgICBcImZ1bFwiIDogXCJcIixcbiAgICAgIFwibmVzc1wiIDogXCJcIlxuICAgIH0sXG5cbiAgICBjID0gXCJbXmFlaW91XVwiLCAgICAgICAgICAvLyBjb25zb25hbnRcbiAgICB2ID0gXCJbYWVpb3V5XVwiLCAgICAgICAgICAvLyB2b3dlbFxuICAgIEMgPSBjICsgXCJbXmFlaW91eV0qXCIsICAgIC8vIGNvbnNvbmFudCBzZXF1ZW5jZVxuICAgIFYgPSB2ICsgXCJbYWVpb3VdKlwiLCAgICAgIC8vIHZvd2VsIHNlcXVlbmNlXG5cbiAgICBtZ3IwID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDLCAgICAgICAgICAgICAgIC8vIFtDXVZDLi4uIGlzIG0+MFxuICAgIG1lcTEgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgViArIEMgKyBcIihcIiArIFYgKyBcIik/JFwiLCAgLy8gW0NdVkNbVl0gaXMgbT0xXG4gICAgbWdyMSA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQyArIFYgKyBDLCAgICAgICAvLyBbQ11WQ1ZDLi4uIGlzIG0+MVxuICAgIHNfdiA9IFwiXihcIiArIEMgKyBcIik/XCIgKyB2OyAgICAgICAgICAgICAgICAgICAvLyB2b3dlbCBpbiBzdGVtXG5cbiAgdmFyIHJlX21ncjAgPSBuZXcgUmVnRXhwKG1ncjApO1xuICB2YXIgcmVfbWdyMSA9IG5ldyBSZWdFeHAobWdyMSk7XG4gIHZhciByZV9tZXExID0gbmV3IFJlZ0V4cChtZXExKTtcbiAgdmFyIHJlX3NfdiA9IG5ldyBSZWdFeHAoc192KTtcblxuICB2YXIgcmVfMWEgPSAvXiguKz8pKHNzfGkpZXMkLztcbiAgdmFyIHJlMl8xYSA9IC9eKC4rPykoW15zXSlzJC87XG4gIHZhciByZV8xYiA9IC9eKC4rPyllZWQkLztcbiAgdmFyIHJlMl8xYiA9IC9eKC4rPykoZWR8aW5nKSQvO1xuICB2YXIgcmVfMWJfMiA9IC8uJC87XG4gIHZhciByZTJfMWJfMiA9IC8oYXR8Ymx8aXopJC87XG4gIHZhciByZTNfMWJfMiA9IG5ldyBSZWdFeHAoXCIoW15hZWlvdXlsc3pdKVxcXFwxJFwiKTtcbiAgdmFyIHJlNF8xYl8yID0gbmV3IFJlZ0V4cChcIl5cIiArIEMgKyB2ICsgXCJbXmFlaW91d3h5XSRcIik7XG5cbiAgdmFyIHJlXzFjID0gL14oLis/W15hZWlvdV0peSQvO1xuICB2YXIgcmVfMiA9IC9eKC4rPykoYXRpb25hbHx0aW9uYWx8ZW5jaXxhbmNpfGl6ZXJ8YmxpfGFsbGl8ZW50bGl8ZWxpfG91c2xpfGl6YXRpb258YXRpb258YXRvcnxhbGlzbXxpdmVuZXNzfGZ1bG5lc3N8b3VzbmVzc3xhbGl0aXxpdml0aXxiaWxpdGl8bG9naSkkLztcblxuICB2YXIgcmVfMyA9IC9eKC4rPykoaWNhdGV8YXRpdmV8YWxpemV8aWNpdGl8aWNhbHxmdWx8bmVzcykkLztcblxuICB2YXIgcmVfNCA9IC9eKC4rPykoYWx8YW5jZXxlbmNlfGVyfGljfGFibGV8aWJsZXxhbnR8ZW1lbnR8bWVudHxlbnR8b3V8aXNtfGF0ZXxpdGl8b3VzfGl2ZXxpemUpJC87XG4gIHZhciByZTJfNCA9IC9eKC4rPykoc3x0KShpb24pJC87XG5cbiAgdmFyIHJlXzUgPSAvXiguKz8pZSQvO1xuICB2YXIgcmVfNV8xID0gL2xsJC87XG4gIHZhciByZTNfNSA9IG5ldyBSZWdFeHAoXCJeXCIgKyBDICsgdiArIFwiW15hZWlvdXd4eV0kXCIpO1xuXG4gIHZhciBwb3J0ZXJTdGVtbWVyID0gZnVuY3Rpb24gcG9ydGVyU3RlbW1lcih3KSB7XG4gICAgdmFyICAgc3RlbSxcbiAgICAgIHN1ZmZpeCxcbiAgICAgIGZpcnN0Y2gsXG4gICAgICByZSxcbiAgICAgIHJlMixcbiAgICAgIHJlMyxcbiAgICAgIHJlNDtcblxuICAgIGlmICh3Lmxlbmd0aCA8IDMpIHsgcmV0dXJuIHc7IH1cblxuICAgIGZpcnN0Y2ggPSB3LnN1YnN0cigwLDEpO1xuICAgIGlmIChmaXJzdGNoID09IFwieVwiKSB7XG4gICAgICB3ID0gZmlyc3RjaC50b1VwcGVyQ2FzZSgpICsgdy5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxYVxuICAgIHJlID0gcmVfMWFcbiAgICByZTIgPSByZTJfMWE7XG5cbiAgICBpZiAocmUudGVzdCh3KSkgeyB3ID0gdy5yZXBsYWNlKHJlLFwiJDEkMlwiKTsgfVxuICAgIGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7IHcgPSB3LnJlcGxhY2UocmUyLFwiJDEkMlwiKTsgfVxuXG4gICAgLy8gU3RlcCAxYlxuICAgIHJlID0gcmVfMWI7XG4gICAgcmUyID0gcmUyXzFiO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3QoZnBbMV0pKSB7XG4gICAgICAgIHJlID0gcmVfMWJfMjtcbiAgICAgICAgdyA9IHcucmVwbGFjZShyZSxcIlwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZTIuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlMiA9IHJlX3NfdjtcbiAgICAgIGlmIChyZTIudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgICAgcmUyID0gcmUyXzFiXzI7XG4gICAgICAgIHJlMyA9IHJlM18xYl8yO1xuICAgICAgICByZTQgPSByZTRfMWJfMjtcbiAgICAgICAgaWYgKHJlMi50ZXN0KHcpKSB7ICB3ID0gdyArIFwiZVwiOyB9XG4gICAgICAgIGVsc2UgaWYgKHJlMy50ZXN0KHcpKSB7IHJlID0gcmVfMWJfMjsgdyA9IHcucmVwbGFjZShyZSxcIlwiKTsgfVxuICAgICAgICBlbHNlIGlmIChyZTQudGVzdCh3KSkgeyB3ID0gdyArIFwiZVwiOyB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxYyAtIHJlcGxhY2Ugc3VmZml4IHkgb3IgWSBieSBpIGlmIHByZWNlZGVkIGJ5IGEgbm9uLXZvd2VsIHdoaWNoIGlzIG5vdCB0aGUgZmlyc3QgbGV0dGVyIG9mIHRoZSB3b3JkIChzbyBjcnkgLT4gY3JpLCBieSAtPiBieSwgc2F5IC0+IHNheSlcbiAgICByZSA9IHJlXzFjO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgdyA9IHN0ZW0gKyBcImlcIjtcbiAgICB9XG5cbiAgICAvLyBTdGVwIDJcbiAgICByZSA9IHJlXzI7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICBzdWZmaXggPSBmcFsyXTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtICsgc3RlcDJsaXN0W3N1ZmZpeF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCAzXG4gICAgcmUgPSByZV8zO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgc3VmZml4ID0gZnBbMl07XG4gICAgICByZSA9IHJlX21ncjA7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbSArIHN0ZXAzbGlzdFtzdWZmaXhdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgNFxuICAgIHJlID0gcmVfNDtcbiAgICByZTIgPSByZTJfNDtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlID0gcmVfbWdyMTtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmUyLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlMi5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdICsgZnBbMl07XG4gICAgICByZTIgPSByZV9tZ3IxO1xuICAgICAgaWYgKHJlMi50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgNVxuICAgIHJlID0gcmVfNTtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlID0gcmVfbWdyMTtcbiAgICAgIHJlMiA9IHJlX21lcTE7XG4gICAgICByZTMgPSByZTNfNTtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pIHx8IChyZTIudGVzdChzdGVtKSAmJiAhKHJlMy50ZXN0KHN0ZW0pKSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmUgPSByZV81XzE7XG4gICAgcmUyID0gcmVfbWdyMTtcbiAgICBpZiAocmUudGVzdCh3KSAmJiByZTIudGVzdCh3KSkge1xuICAgICAgcmUgPSByZV8xYl8yO1xuICAgICAgdyA9IHcucmVwbGFjZShyZSxcIlwiKTtcbiAgICB9XG5cbiAgICAvLyBhbmQgdHVybiBpbml0aWFsIFkgYmFjayB0byB5XG5cbiAgICBpZiAoZmlyc3RjaCA9PSBcInlcIikge1xuICAgICAgdyA9IGZpcnN0Y2gudG9Mb3dlckNhc2UoKSArIHcuc3Vic3RyKDEpO1xuICAgIH1cblxuICAgIHJldHVybiB3O1xuICB9O1xuXG4gIHJldHVybiBwb3J0ZXJTdGVtbWVyO1xufSkoKTtcblxubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uKGx1bnIuc3RlbW1lciwgJ3N0ZW1tZXInKVxuLyohXG4gKiBsdW5yLnN0b3BXb3JkRmlsdGVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLmdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIgYnVpbGRzIGEgc3RvcFdvcmRGaWx0ZXIgZnVuY3Rpb24gZnJvbSB0aGUgcHJvdmlkZWRcbiAqIGxpc3Qgb2Ygc3RvcCB3b3Jkcy5cbiAqXG4gKiBUaGUgYnVpbHQgaW4gbHVuci5zdG9wV29yZEZpbHRlciBpcyBidWlsdCB1c2luZyB0aGlzIGdlbmVyYXRvciBhbmQgY2FuIGJlIHVzZWRcbiAqIHRvIGdlbmVyYXRlIGN1c3RvbSBzdG9wV29yZEZpbHRlcnMgZm9yIGFwcGxpY2F0aW9ucyBvciBub24gRW5nbGlzaCBsYW5ndWFnZXMuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtBcnJheX0gdG9rZW4gVGhlIHRva2VuIHRvIHBhc3MgdGhyb3VnaCB0aGUgZmlsdGVyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqIEBzZWUgbHVuci5zdG9wV29yZEZpbHRlclxuICovXG5sdW5yLmdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIgPSBmdW5jdGlvbiAoc3RvcFdvcmRzKSB7XG4gIHZhciB3b3JkcyA9IHN0b3BXb3Jkcy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIHN0b3BXb3JkKSB7XG4gICAgbWVtb1tzdG9wV29yZF0gPSBzdG9wV29yZFxuICAgIHJldHVybiBtZW1vXG4gIH0sIHt9KVxuXG4gIHJldHVybiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICBpZiAodG9rZW4gJiYgd29yZHNbdG9rZW5dICE9PSB0b2tlbikgcmV0dXJuIHRva2VuXG4gIH1cbn1cblxuLyoqXG4gKiBsdW5yLnN0b3BXb3JkRmlsdGVyIGlzIGFuIEVuZ2xpc2ggbGFuZ3VhZ2Ugc3RvcCB3b3JkIGxpc3QgZmlsdGVyLCBhbnkgd29yZHNcbiAqIGNvbnRhaW5lZCBpbiB0aGUgbGlzdCB3aWxsIG5vdCBiZSBwYXNzZWQgdGhyb3VnaCB0aGUgZmlsdGVyLlxuICpcbiAqIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCBpbiB0aGUgUGlwZWxpbmUuIElmIHRoZSB0b2tlbiBkb2VzIG5vdCBwYXNzIHRoZVxuICogZmlsdGVyIHRoZW4gdW5kZWZpbmVkIHdpbGwgYmUgcmV0dXJuZWQuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICovXG5sdW5yLnN0b3BXb3JkRmlsdGVyID0gbHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyKFtcbiAgJ2EnLFxuICAnYWJsZScsXG4gICdhYm91dCcsXG4gICdhY3Jvc3MnLFxuICAnYWZ0ZXInLFxuICAnYWxsJyxcbiAgJ2FsbW9zdCcsXG4gICdhbHNvJyxcbiAgJ2FtJyxcbiAgJ2Ftb25nJyxcbiAgJ2FuJyxcbiAgJ2FuZCcsXG4gICdhbnknLFxuICAnYXJlJyxcbiAgJ2FzJyxcbiAgJ2F0JyxcbiAgJ2JlJyxcbiAgJ2JlY2F1c2UnLFxuICAnYmVlbicsXG4gICdidXQnLFxuICAnYnknLFxuICAnY2FuJyxcbiAgJ2Nhbm5vdCcsXG4gICdjb3VsZCcsXG4gICdkZWFyJyxcbiAgJ2RpZCcsXG4gICdkbycsXG4gICdkb2VzJyxcbiAgJ2VpdGhlcicsXG4gICdlbHNlJyxcbiAgJ2V2ZXInLFxuICAnZXZlcnknLFxuICAnZm9yJyxcbiAgJ2Zyb20nLFxuICAnZ2V0JyxcbiAgJ2dvdCcsXG4gICdoYWQnLFxuICAnaGFzJyxcbiAgJ2hhdmUnLFxuICAnaGUnLFxuICAnaGVyJyxcbiAgJ2hlcnMnLFxuICAnaGltJyxcbiAgJ2hpcycsXG4gICdob3cnLFxuICAnaG93ZXZlcicsXG4gICdpJyxcbiAgJ2lmJyxcbiAgJ2luJyxcbiAgJ2ludG8nLFxuICAnaXMnLFxuICAnaXQnLFxuICAnaXRzJyxcbiAgJ2p1c3QnLFxuICAnbGVhc3QnLFxuICAnbGV0JyxcbiAgJ2xpa2UnLFxuICAnbGlrZWx5JyxcbiAgJ21heScsXG4gICdtZScsXG4gICdtaWdodCcsXG4gICdtb3N0JyxcbiAgJ211c3QnLFxuICAnbXknLFxuICAnbmVpdGhlcicsXG4gICdubycsXG4gICdub3InLFxuICAnbm90JyxcbiAgJ29mJyxcbiAgJ29mZicsXG4gICdvZnRlbicsXG4gICdvbicsXG4gICdvbmx5JyxcbiAgJ29yJyxcbiAgJ290aGVyJyxcbiAgJ291cicsXG4gICdvd24nLFxuICAncmF0aGVyJyxcbiAgJ3NhaWQnLFxuICAnc2F5JyxcbiAgJ3NheXMnLFxuICAnc2hlJyxcbiAgJ3Nob3VsZCcsXG4gICdzaW5jZScsXG4gICdzbycsXG4gICdzb21lJyxcbiAgJ3RoYW4nLFxuICAndGhhdCcsXG4gICd0aGUnLFxuICAndGhlaXInLFxuICAndGhlbScsXG4gICd0aGVuJyxcbiAgJ3RoZXJlJyxcbiAgJ3RoZXNlJyxcbiAgJ3RoZXknLFxuICAndGhpcycsXG4gICd0aXMnLFxuICAndG8nLFxuICAndG9vJyxcbiAgJ3R3YXMnLFxuICAndXMnLFxuICAnd2FudHMnLFxuICAnd2FzJyxcbiAgJ3dlJyxcbiAgJ3dlcmUnLFxuICAnd2hhdCcsXG4gICd3aGVuJyxcbiAgJ3doZXJlJyxcbiAgJ3doaWNoJyxcbiAgJ3doaWxlJyxcbiAgJ3dobycsXG4gICd3aG9tJyxcbiAgJ3doeScsXG4gICd3aWxsJyxcbiAgJ3dpdGgnLFxuICAnd291bGQnLFxuICAneWV0JyxcbiAgJ3lvdScsXG4gICd5b3VyJ1xuXSlcblxubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uKGx1bnIuc3RvcFdvcmRGaWx0ZXIsICdzdG9wV29yZEZpbHRlcicpXG4vKiFcbiAqIGx1bnIudHJpbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci50cmltbWVyIGlzIGEgcGlwZWxpbmUgZnVuY3Rpb24gZm9yIHRyaW1taW5nIG5vbiB3b3JkXG4gKiBjaGFyYWN0ZXJzIGZyb20gdGhlIGJlZ2luaW5nIGFuZCBlbmQgb2YgdG9rZW5zIGJlZm9yZSB0aGV5XG4gKiBlbnRlciB0aGUgaW5kZXguXG4gKlxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiBtYXkgbm90IHdvcmsgY29ycmVjdGx5IGZvciBub24gbGF0aW5cbiAqIGNoYXJhY3RlcnMgYW5kIHNob3VsZCBlaXRoZXIgYmUgcmVtb3ZlZCBvciBhZGFwdGVkIGZvciB1c2VcbiAqIHdpdGggbGFuZ3VhZ2VzIHdpdGggbm9uLWxhdGluIGNoYXJhY3RlcnMuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICovXG5sdW5yLnRyaW1tZXIgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgcmV0dXJuIHRva2VuLnJlcGxhY2UoL15cXFcrLywgJycpLnJlcGxhY2UoL1xcVyskLywgJycpXG59XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnRyaW1tZXIsICd0cmltbWVyJylcbi8qIVxuICogbHVuci5zdGVtbWVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKiBJbmNsdWRlcyBjb2RlIGZyb20gLSBodHRwOi8vdGFydGFydXMub3JnL35tYXJ0aW4vUG9ydGVyU3RlbW1lci9qcy50eHRcbiAqL1xuXG4vKipcbiAqIGx1bnIuVG9rZW5TdG9yZSBpcyB1c2VkIGZvciBlZmZpY2llbnQgc3RvcmluZyBhbmQgbG9va3VwIG9mIHRoZSByZXZlcnNlXG4gKiBpbmRleCBvZiB0b2tlbiB0byBkb2N1bWVudCByZWYuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuVG9rZW5TdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yb290ID0geyBkb2NzOiB7fSB9XG4gIHRoaXMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHRva2VuIHN0b3JlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHRva2VuIHN0b3JlIHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlblN0b3JlfVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZERhdGEpIHtcbiAgdmFyIHN0b3JlID0gbmV3IHRoaXNcblxuICBzdG9yZS5yb290ID0gc2VyaWFsaXNlZERhdGEucm9vdFxuICBzdG9yZS5sZW5ndGggPSBzZXJpYWxpc2VkRGF0YS5sZW5ndGhcblxuICByZXR1cm4gc3RvcmVcbn1cblxuLyoqXG4gKiBBZGRzIGEgbmV3IHRva2VuIGRvYyBwYWlyIHRvIHRoZSBzdG9yZS5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gc3RvcmUgdGhlIGRvYyB1bmRlclxuICogQHBhcmFtIHtPYmplY3R9IGRvYyBUaGUgZG9jIHRvIHN0b3JlIGFnYWluc3QgdGhlIHRva2VuXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0IGxvb2tpbmcgZm9yIHRoZVxuICogY29ycmVjdCBwbGFjZSB0byBlbnRlciB0aGUgZG9jLCBieSBkZWZhdWx0IHRoZSByb290IG9mIHRoaXMgbHVuci5Ub2tlblN0b3JlXG4gKiBpcyB1c2VkLlxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodG9rZW4sIGRvYywgcm9vdCkge1xuICB2YXIgcm9vdCA9IHJvb3QgfHwgdGhpcy5yb290LFxuICAgICAga2V5ID0gdG9rZW4uY2hhckF0KDApLFxuICAgICAgcmVzdCA9IHRva2VuLnNsaWNlKDEpXG5cbiAgaWYgKCEoa2V5IGluIHJvb3QpKSByb290W2tleV0gPSB7ZG9jczoge319XG5cbiAgaWYgKHJlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcm9vdFtrZXldLmRvY3NbZG9jLnJlZl0gPSBkb2NcbiAgICB0aGlzLmxlbmd0aCArPSAxXG4gICAgcmV0dXJuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkKHJlc3QsIGRvYywgcm9vdFtrZXldKVxuICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBrZXkgaXMgY29udGFpbmVkIHdpdGhpbiB0aGlzIGx1bnIuVG9rZW5TdG9yZS5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gY2hlY2sgZm9yXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uICh0b2tlbikge1xuICBpZiAoIXRva2VuKSByZXR1cm4gZmFsc2VcblxuICB2YXIgbm9kZSA9IHRoaXMucm9vdFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIW5vZGVbdG9rZW4uY2hhckF0KGkpXSkgcmV0dXJuIGZhbHNlXG5cbiAgICBub2RlID0gbm9kZVt0b2tlbi5jaGFyQXQoaSldXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG4vKipcbiAqIFJldHJpZXZlIGEgbm9kZSBmcm9tIHRoZSB0b2tlbiBzdG9yZSBmb3IgYSBnaXZlbiB0b2tlbi5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gZ2V0IHRoZSBub2RlIGZvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQHNlZSBUb2tlblN0b3JlLnByb3RvdHlwZS5nZXRcbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuZ2V0Tm9kZSA9IGZ1bmN0aW9uICh0b2tlbikge1xuICBpZiAoIXRva2VuKSByZXR1cm4ge31cblxuICB2YXIgbm9kZSA9IHRoaXMucm9vdFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIW5vZGVbdG9rZW4uY2hhckF0KGkpXSkgcmV0dXJuIHt9XG5cbiAgICBub2RlID0gbm9kZVt0b2tlbi5jaGFyQXQoaSldXG4gIH1cblxuICByZXR1cm4gbm9kZVxufVxuXG4vKipcbiAqIFJldHJpZXZlIHRoZSBkb2N1bWVudHMgZm9yIGEgbm9kZSBmb3IgdGhlIGdpdmVuIHRva2VuLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhpcyBmdW5jdGlvbiBzdGFydHMgYXQgdGhlIHJvb3Qgb2YgdGhlIGN1cnJlbnQgc3RvcmUsIGhvd2V2ZXJcbiAqIGl0IGNhbiBzdGFydCBhdCBhbnkgbm9kZSBvZiBhbnkgdG9rZW4gc3RvcmUgaWYgcmVxdWlyZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBnZXQgdGhlIGRvY3VtZW50cyBmb3IuXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0LlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHRva2VuLCByb290KSB7XG4gIHJldHVybiB0aGlzLmdldE5vZGUodG9rZW4sIHJvb3QpLmRvY3MgfHwge31cbn1cblxubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5jb3VudCA9IGZ1bmN0aW9uICh0b2tlbiwgcm9vdCkge1xuICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5nZXQodG9rZW4sIHJvb3QpKS5sZW5ndGhcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGRvY3VtZW50IGlkZW50aWZpZWQgYnkgcmVmIGZyb20gdGhlIHRva2VuIGluIHRoZSBzdG9yZS5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gZ2V0IHRoZSBkb2N1bWVudHMgZm9yLlxuICogQHBhcmFtIHtTdHJpbmd9IHJlZiBUaGUgcmVmIG9mIHRoZSBkb2N1bWVudCB0byByZW1vdmUgZnJvbSB0aGlzIHRva2VuLlxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICh0b2tlbiwgcmVmKSB7XG4gIGlmICghdG9rZW4pIHJldHVyblxuICB2YXIgbm9kZSA9IHRoaXMucm9vdFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoISh0b2tlbi5jaGFyQXQoaSkgaW4gbm9kZSkpIHJldHVyblxuICAgIG5vZGUgPSBub2RlW3Rva2VuLmNoYXJBdChpKV1cbiAgfVxuXG4gIGRlbGV0ZSBub2RlLmRvY3NbcmVmXVxufVxuXG4vKipcbiAqIEZpbmQgYWxsIHRoZSBwb3NzaWJsZSBzdWZmaXhlcyBvZiB0aGUgcGFzc2VkIHRva2VuIHVzaW5nIHRva2Vuc1xuICogY3VycmVudGx5IGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGV4cGFuZC5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuZXhwYW5kID0gZnVuY3Rpb24gKHRva2VuLCBtZW1vKSB7XG4gIHZhciByb290ID0gdGhpcy5nZXROb2RlKHRva2VuKSxcbiAgICAgIGRvY3MgPSByb290LmRvY3MgfHwge30sXG4gICAgICBtZW1vID0gbWVtbyB8fCBbXVxuXG4gIGlmIChPYmplY3Qua2V5cyhkb2NzKS5sZW5ndGgpIG1lbW8ucHVzaCh0b2tlbilcblxuICBPYmplY3Qua2V5cyhyb290KVxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09ICdkb2NzJykgcmV0dXJuXG5cbiAgICAgIG1lbW8uY29uY2F0KHRoaXMuZXhwYW5kKHRva2VuICsga2V5LCBtZW1vKSlcbiAgICB9LCB0aGlzKVxuXG4gIHJldHVybiBtZW1vXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0b2tlbiBzdG9yZSByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgcm9vdDogdGhpcy5yb290LFxuICAgIGxlbmd0aDogdGhpcy5sZW5ndGhcbiAgfVxufVxuXG4gIC8qKlxuICAgKiBleHBvcnQgdGhlIG1vZHVsZSB2aWEgQU1ELCBDb21tb25KUyBvciBhcyBhIGJyb3dzZXIgZ2xvYmFsXG4gICAqIEV4cG9ydCBjb2RlIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3VtZGpzL3VtZC9ibG9iL21hc3Rlci9yZXR1cm5FeHBvcnRzLmpzXG4gICAqL1xuICA7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgZGVmaW5lKGZhY3RvcnkpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIC8qKlxuICAgICAgICogTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgICAgKiBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgICAgICogbGlrZSBOb2RlLlxuICAgICAgICovXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgICAgcm9vdC5sdW5yID0gZmFjdG9yeSgpXG4gICAgfVxuICB9KHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBKdXN0IHJldHVybiBhIHZhbHVlIHRvIGRlZmluZSB0aGUgbW9kdWxlIGV4cG9ydC5cbiAgICAgKiBUaGlzIGV4YW1wbGUgcmV0dXJucyBhbiBvYmplY3QsIGJ1dCB0aGUgbW9kdWxlXG4gICAgICogY2FuIHJldHVybiBhIGZ1bmN0aW9uIGFzIHRoZSBleHBvcnRlZCB2YWx1ZS5cbiAgICAgKi9cbiAgICByZXR1cm4gbHVuclxuICB9KSlcbn0pKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2x1bnIvbHVuci5qcyIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCJcblxuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCA9ICdkYXRhLWlkJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgaWYgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGVsZW1lbnQsIHZpc2libGUpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBlbXB0eVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbXB0eSA9ICh0ZXh0KSA9PiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSAmJiAodGV4dC5sZW5ndGggPT09IDApO1xuXG4vKipcbiAqIFByb3BhZ2F0ZXMgcm93IHNlbGVjdGlvbiB0cm91Z2ggdGhlIGV2ZW50IHN5c3RlbVxuICpcbiAqIEBwYXJhbSB7RXZlbnRmdWx9IGV2ZW50ZnVsXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuY29uc3QgcmVsYXlDbGlja0V2ZW50QXMgPSBjdXJyeShmdW5jdGlvbih0eXBlLCBldmVudGZ1bCwgZWxlbWVudCkge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGV2ZW50ZnVsLmZpcmUodHlwZSwge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGlkOiBnZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgZWxlbWVudClcbiAgICB9KVxuICB9KTtcblxuICByZXR1cm4gZWxlbWVudDtcbn0pO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsVmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBiYWNrIGJ1dHRvblxuICAgIGNvbnN0IGJhY2tCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYmFja0J1dHRvbkVsZW1lbnQuY2xhc3NOYW1lID0gJ2JhY2stYnV0dG9uIGljb24tYXJyb3ctdGhpY2snO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIGJhY2tCdXR0b25FbGVtZW50KTtcblxuICAgIC8vIGltYWdlXG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHRoaXMuaW1hZ2UuY2xhc3NOYW1lID0gJ2ltZy1yZXNwb25zaXZlJztcblxuICAgIGNvbnN0IGltYWdlV3JhcHBlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbWFnZVdyYXBwZXJFbGVtZW50LmNsYXNzTmFtZSA9ICdpbWFnZS13cmFwcGVyJztcbiAgICBpbWFnZVdyYXBwZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaW1hZ2UpO1xuXG4gICAgLy8gdGl0bGVcbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcblxuICAgIC8vIGF1dGhvclxuICAgIHRoaXMuYXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5hdXRob3IuY2xhc3NOYW1lID0gJ2F1dGhvcic7XG4gICAgdGhpcy5hdXRob3IuaW5uZXJIVE1MID0gJ2J5IEpvdWJlbCc7IC8vIFRPRE8gTWFrZSBkeW5hbWljXG5cbiAgICAvLyBkZXNjcmlwdGlvblxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbi5jbGFzc05hbWUgPSAnc21hbGwnO1xuXG4gICAgLy8gZGVtbyBidXR0b25cbiAgICB0aGlzLmRlbW9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdGhpcy5kZW1vQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24nO1xuICAgIHRoaXMuZGVtb0J1dHRvbi5pbm5lckhUTUwgPSAnQ29udGVudCBEZW1vJztcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG4gICAgaGlkZSh0aGlzLmRlbW9CdXR0b24pO1xuXG4gICAgY29uc3QgdGV4dERldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZXh0RGV0YWlscy5jbGFzc05hbWUgPSAndGV4dC1kZXRhaWxzJztcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLmF1dGhvcik7XG4gICAgdGV4dERldGFpbHMuYXBwZW5kQ2hpbGQodGhpcy5kZXNjcmlwdGlvbik7XG4gICAgdGV4dERldGFpbHMuYXBwZW5kQ2hpbGQodGhpcy5kZW1vQnV0dG9uKTtcblxuICAgIGNvbnN0IGRldGFpbHNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGV0YWlsc0VsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG4gICAgZGV0YWlsc0VsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VXcmFwcGVyRWxlbWVudCk7XG4gICAgZGV0YWlsc0VsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dERldGFpbHMpO1xuXG4gICAgLy8gdXNlIGJ1dHRvblxuICAgIHRoaXMudXNlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaXMudXNlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24gYnV0dG9uLXByaW1hcnknO1xuICAgIHRoaXMudXNlQnV0dG9uLmlubmVySFRNTCA9ICdVc2UnO1xuICAgIGhpZGUodGhpcy51c2VCdXR0b24pO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XG5cbiAgICAvLyBpbnN0YWxsIGJ1dHRvblxuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0aGlzLmluc3RhbGxCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5JztcbiAgICB0aGlzLmluc3RhbGxCdXR0b24uaW5uZXJIVE1MID0gJ0luc3RhbGwnO1xuICAgIGhpZGUodGhpcy5pbnN0YWxsQnV0dG9uKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygnaW5zdGFsbCcsIHRoaXMsIHRoaXMuaW5zdGFsbEJ1dHRvbik7XG5cbiAgICBjb25zdCBidXR0b25CYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBidXR0b25CYXIuY2xhc3NOYW1lID0gJ2J1dHRvbi1iYXInO1xuICAgIGJ1dHRvbkJhci5hcHBlbmRDaGlsZCh0aGlzLnVzZUJ1dHRvbik7XG4gICAgYnV0dG9uQmFyLmFwcGVuZENoaWxkKHRoaXMuaW5zdGFsbEJ1dHRvbik7XG5cbiAgICAvLyBsaWNlbmNlIHBhbmVsXG4gICAgY29uc3QgbGljZW5jZVBhbmVsID0gdGhpcy5jcmVhdGVQYW5lbCgnVGhlIExpY2VuY2UgSW5mbycsICdpcHN1bSBsb3J1bScsICdsaWNlbmNlLXBhbmVsJyk7XG4gICAgY29uc3QgcGx1Z2luc1BhbmVsID0gdGhpcy5jcmVhdGVQYW5lbCgnQXZhaWxhYmxlIHBsdWdpbnMnLCAnaXBzdW0gbG9ydW0nLCAncGx1Z2lucy1wYW5lbCcpO1xuICAgIGNvbnN0IHB1Ymxpc2hlclBhbmVsID0gdGhpcy5jcmVhdGVQYW5lbCgnUHVibGlzaGVyIEluZm8nLCAnaXBzdW0gbG9ydW0nLCAncHVibGlzaGVyLXBhbmVsJyk7XG5cbiAgICAvLyBwYW5lbCBncm91cFxuICAgIGNvbnN0IHBhbmVsR3JvdXBFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFuZWxHcm91cEVsZW1lbnQuY2xhc3NOYW1lID0gJ3BhbmVsLWdyb3VwJztcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5hcHBlbmRDaGlsZChsaWNlbmNlUGFuZWwpO1xuICAgIHBhbmVsR3JvdXBFbGVtZW50LmFwcGVuZENoaWxkKHBsdWdpbnNQYW5lbCk7XG4gICAgcGFuZWxHcm91cEVsZW1lbnQuYXBwZW5kQ2hpbGQocHVibGlzaGVyUGFuZWwpO1xuXG4gICAgLy8gYWRkIHJvb3QgZWxlbWVudFxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtZGV0YWlsJztcbiAgICB0aGlzLnJvb3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoYmFja0J1dHRvbkVsZW1lbnQpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoZGV0YWlsc0VsZW1lbnQpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uQmFyKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHBhbmVsR3JvdXBFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5SWRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVQYW5lbCh0aXRsZSwgYm9keSwgYm9keUlkKSB7XG4gICAgY29uc3QgaGVhZGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZWFkZXJFbC5jbGFzc05hbWUgPSAncGFuZWwtaGVhZGVyJztcbiAgICBoZWFkZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICBoZWFkZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBib2R5SWQpO1xuICAgIGhlYWRlckVsLmlubmVySFRNTCA9IHRpdGxlO1xuXG4gICAgY29uc3QgYm9keUlubmVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBib2R5SW5uZXJFbC5jbGFzc05hbWUgPSAncGFuZWwtYm9keS1pbm5lcic7XG4gICAgYm9keUlubmVyRWwuaW5uZXJIVE1MID0gYm9keTtcblxuICAgIGNvbnN0IGJvZHlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvZHlFbC5jbGFzc05hbWUgPSAncGFuZWwtYm9keSc7XG4gICAgYm9keUVsLmlkID0gYm9keUlkO1xuICAgIGJvZHlFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBib2R5RWwuYXBwZW5kQ2hpbGQoYm9keUlubmVyRWwpO1xuXG4gICAgY29uc3QgcGFuZWxFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBhbmVsRWwuY2xhc3NOYW1lID0gJ3BhbmVsJztcbiAgICBwYW5lbEVsLmFwcGVuZENoaWxkKGhlYWRlckVsKTtcbiAgICBwYW5lbEVsLmFwcGVuZENoaWxkKGJvZHlFbCk7XG5cbiAgICBpbml0UGFuZWwocGFuZWxFbCk7XG5cbiAgICByZXR1cm4gcGFuZWxFbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbWFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gICAqL1xuICBzZXRJbWFnZShzcmMpIHtcbiAgICB0aGlzLmltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldElkKGlkKSB7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gICAgdGhpcy51c2VCdXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XG4gICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSB0ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGV4YW1wbGUgdXJsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICovXG4gIHNldEV4YW1wbGUodXJsKSB7XG4gICAgdGhpcy5kZW1vQnV0dG9uLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCB8fCAnIycpO1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy5kZW1vQnV0dG9uLCAhaXNFbXB0eSh1cmwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGlmIHRoZSBjb250ZW50IHR5cGUgaXMgaW5zdGFsbGVkXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5zdGFsbGVkXG4gICAqL1xuICBzZXRJc0luc3RhbGxlZChpbnN0YWxsZWQpIHtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMudXNlQnV0dG9uLCBpbnN0YWxsZWQpO1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy5pbnN0YWxsQnV0dG9uLCAhaW5zdGFsbGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVEZXRhaWxWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlld1wiO1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gXCIuLi9odWItc2VydmljZXNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gdmlld3NcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZURldGFpbFZpZXcoc3RhdGUpO1xuICAgIHRoaXMudmlldy5vbignaW5zdGFsbCcsIHRoaXMuaW5zdGFsbCwgdGhpcyk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydjbG9zZScsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgbG9hZEJ5SWQoaWQpIHtcbiAgICB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgLnRoZW4odGhpcy51cGRhdGUuYmluZCh0aGlzKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgIGluc3RhbGwoe2lkfSkge1xuICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSlcbiAgICAgICAudGhlbihtYWNoaW5lTmFtZSA9PiB0aGlzLnNlcnZpY2VzLmluc3RhbGxDb250ZW50VHlwZShtYWNoaW5lTmFtZSkpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gY29uc29sZS5kZWJ1ZygnVE9ETywgZ3VpIHVwZGF0ZXMnKSlcbiAgIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdmlldyB3aXRoIHRoZSBjb250ZW50IHR5cGUgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlKSB7XG4gICAgdGhpcy52aWV3LnNldElkKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcbiAgICB0aGlzLnZpZXcuc2V0VGl0bGUoY29udGVudFR5cGUudGl0bGUpO1xuICAgIHRoaXMudmlldy5zZXREZXNjcmlwdGlvbihjb250ZW50VHlwZS5kZXNjcmlwdGlvbik7XG4gICAgdGhpcy52aWV3LnNldEltYWdlKGNvbnRlbnRUeXBlLmljb24pO1xuICAgIHRoaXMudmlldy5zZXRFeGFtcGxlKGNvbnRlbnRUeXBlLmV4YW1wbGUpO1xuICAgIHRoaXMudmlldy5zZXRJc0luc3RhbGxlZCghIWNvbnRlbnRUeXBlLmluc3RhbGxlZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogUHJvcGFnYXRlcyByb3cgc2VsZWN0aW9uIHRyb3VnaCB0aGUgZXZlbnQgc3lzdGVtXG4gKlxuICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5jb25zdCByZWxheUNsaWNrRXZlbnRBcyA9IGN1cnJ5KGZ1bmN0aW9uKHR5cGUsIGV2ZW50ZnVsLCBlbGVtZW50KSB7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgZXZlbnRmdWwuZmlyZSh0eXBlLCB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgaWQ6IGdldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBlbGVtZW50KVxuICAgIH0sIGZhbHNlKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50O1xufSk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgcm9vdCBlbGVtZW50XG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWxpc3QnO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcbiAgICovXG4gIHVwZGF0ZUxpc3QoY29udGVudFR5cGVzKSB7XG4gICAgaWYodGhpcy5yb290RWxlbWVudCl7XG4gICAgICB3aGlsZSh0aGlzLnJvb3RFbGVtZW50LmZpcnN0Q2hpbGQgKXtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLnJvb3RFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVuZGVyQ29udGVudFR5cGVMaXN0KGNvbnRlbnRUeXBlcylcbiAgICAgIC5mb3JFYWNoKGNvbnRlbnRUeXBlID0+IHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGVudFR5cGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGNyZWF0ZSByb3dzLCBhbmQgYWRkIHRvIHRoZSBsaXN0XG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XG4gICAqL1xuICByZW5kZXJDb250ZW50VHlwZUxpc3QoY29udGVudFR5cGVzKSB7XG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlc1xuICAgICAgLm1hcChjb250ZW50VHlwZSA9PiB0aGlzLmNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlKSlcbiAgICAgIC5tYXAocmVsYXlDbGlja0V2ZW50QXMoJ3Jvdy1zZWxlY3RlZCcsIHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgQ29udGVudCBUeXBlIGNvbmZpZ3VyYXRpb24gYW5kIGNyZWF0ZXMgYSByb3cgZG9tXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUpIHtcbiAgICAvLyBpbWFnZVxuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1hZ2UuY2xhc3NOYW1lID0gJ2ltZy1yZXNwb25zaXZlJztcbiAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGNvbnRlbnRUeXBlLmljb24pO1xuXG4gICAgLy8gdGl0bGVcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XG4gICAgdGl0bGUuaW5uZXJIVE1MID0gY29udGVudFR5cGUudGl0bGU7XG5cbiAgICAvLyBkZXNjcmlwdGlvblxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGVzY3JpcHRpb24uY2xhc3NOYW1lID0gJ2Rlc2NyaXB0aW9uJztcbiAgICBkZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBjb250ZW50VHlwZS5zdW1tYXJ5O1xuXG4gICAgLy8gbGlzdCBpdGVtXG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICByb3cuaWQgPSBgY29udGVudC10eXBlLSR7Y29udGVudFR5cGUubWFjaGluZU5hbWV9YDtcbiAgICByb3cuc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcbiAgICByb3cuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICAgIHJvdy5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZUJ1dHRvbkVsZW1lbnQoY29udGVudFR5cGUpKTtcbiAgICByb3cuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIHJvdy5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbiAgICByZXR1cm4gcm93O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICBjcmVhdGVCdXR0b25FbGVtZW50KGNvbnRlbnRUeXBlKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgaWYoY29udGVudFR5cGUuaW5zdGFsbGVkKSB7XG4gICAgICBidXR0b24uY2xhc3NOYW1lID0gXCJidXR0b24gYnV0dG9uLXByaW1hcnlcIjtcbiAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIlVzZVwiO1xuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0JywgdGhpcywgYnV0dG9uKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBidXR0b24uY2xhc3NOYW1lID0gXCJidXR0b24gYnV0dG9uLWludmVyc2UtcHJpbWFyeVwiO1xuICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiaW5zdGFsbFwiO1xuICAgICAgLy8gbm8gZnVuY3Rpb25hbGl0eSwgdXNlcyBjbGljayBldmVudCBvbiByb3dcbiAgICB9XG5cbiAgICByZXR1cm4gYnV0dG9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZUxpc3RWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1saXN0LXZpZXdcIjtcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogUm93IHNlbGVjdGVkIGV2ZW50XG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICpcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3Qge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gYWRkIHRoZSB2aWV3XG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVMaXN0VmlldyhzdGF0ZSk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydyb3ctc2VsZWN0ZWQnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZSB0aGlzIGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHRoaXMgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCB3aXRoIG5ldyBjb250ZW50IHR5cGVzXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gICAqL1xuICB1cGRhdGUoY29udGVudFR5cGVzKSB7XG4gICAgdGhpcy52aWV3LnVwZGF0ZUxpc3QoY29udGVudFR5cGVzKTtcbiAgICB0aGlzLmZpcmUoJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2aWV3cyByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsImltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRCcm93c2VyVmlld1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRCcm93c2VyVmlldyB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRzXG4gICAgY29uc3QgbWVudSA9IHRoaXMuY3JlYXRlTWVudUVsZW1lbnQoKTtcbiAgICBjb25zdCBpbnB1dEdyb3VwID0gdGhpcy5jcmVhdGVJbnB1dEdyb3VwRWxlbWVudCgpO1xuXG4gICAgLy8gbWVudSBncm91cFxuICAgIGNvbnN0IG1lbnVHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1lbnVHcm91cC5jbGFzc05hbWUgPSAnbWVudS1ncm91cCc7XG4gICAgbWVudUdyb3VwLmFwcGVuZENoaWxkKG1lbnUpO1xuICAgIG1lbnVHcm91cC5hcHBlbmRDaGlsZChpbnB1dEdyb3VwKTtcblxuICAgIC8vIHJvb3QgZWxlbWVudFxuICAgIHRoaXMucm9vdEVsZW1lbnQgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChtZW51R3JvdXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBtZW51IGl0ZW1cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBhZGRNZW51SXRlbSh0ZXh0KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWl0ZW0nKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5maXJlKCdtZW51LXNlbGVjdGVkJywge1xuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXRcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0cyBmaXJzdCB0byBiZSBzZWxlY3RlZFxuICAgIGlmKHRoaXMubWVudUJhckVsZW1lbnQuY2hpbGRFbGVtZW50Q291bnQgPCAxKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgfVxuXG4gICAgLy8gYWRkIHRvIG1lbnUgYmFyXG4gICAgdGhpcy5tZW51QmFyRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIG1lbnUgYmFyIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7RWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZU1lbnVFbGVtZW50KCkge1xuICAgIHRoaXMubWVudUJhckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMubWVudUJhckVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnViYXInKTtcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50LmNsYXNzTmFtZSA9ICdoNXAtbWVudSc7XG5cbiAgICBjb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgbmF2RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLm1lbnVCYXJFbGVtZW50KTtcblxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGl0bGUuY2xhc3NOYW1lID0gXCJtZW51LXRpdGxlXCI7XG4gICAgdGl0bGUuaW5uZXJIVE1MID0gXCJCcm93c2UgY29udGVudCB0eXBlc1wiO1xuXG4gICAgY29uc3QgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1lbnUuY2xhc3NOYW1lID0gXCJtZW51XCI7XG4gICAgbWVudS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgbWVudS5hcHBlbmRDaGlsZChuYXZFbGVtZW50KTtcblxuICAgIHJldHVybiBtZW51O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGlucHV0IGdyb3VwIHVzZWQgZm9yIHNlYXJjaFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZUlucHV0R3JvdXBFbGVtZW50KCkge1xuICAgIC8vIGlucHV0IGZpZWxkXG4gICAgY29uc3QgaW5wdXRGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXRGaWVsZC5jbGFzc05hbWUgPSAnZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1yb3VuZGVkJztcbiAgICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgXCJTZWFyY2ggZm9yIENvbnRlbnQgVHlwZXNcIik7XG4gICAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgnc2VhcmNoJywge1xuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXQsXG4gICAgICAgIHF1ZXJ5OiBldmVudC50YXJnZXQudmFsdWVcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gaW5wdXQgYnV0dG9uXG4gICAgY29uc3QgaW5wdXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbnB1dEJ1dHRvbi5jbGFzc05hbWUgPSAnaW5wdXQtZ3JvdXAtYWRkb24gaWNvbi1zZWFyY2gnO1xuXG4gICAgLy8gaW5wdXQgZ3JvdXBcbiAgICBjb25zdCBpbnB1dEdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSAnaW5wdXQtZ3JvdXAnO1xuICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRGaWVsZCk7XG4gICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEJ1dHRvbik7XG5cbiAgICByZXR1cm4gaW5wdXRHcm91cDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgb2YgdGhlIGNvbnRlbnQgYnJvd3NlclxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwiaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvblZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLXNlY3Rpb24tdmlld1wiO1xuaW1wb3J0IFNlYXJjaFNlcnZpY2UgZnJvbSBcIi4uL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlXCI7XG5pbXBvcnQgQ29udGVudFR5cGVMaXN0IGZyb20gJy4uL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0JztcbmltcG9ydCBDb250ZW50VHlwZURldGFpbCBmcm9tICcuLi9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7cmVuZGVyRXJyb3JNZXNzYWdlfSBmcm9tICcuLi91dGlscy9lcnJvcnMnO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb25cbiAqIEBtaXhlcyBFdmVudGZ1bFxuICpcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlU2VjdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGFkZCB2aWV3XG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRlbnRUeXBlU2VjdGlvblZpZXcoc3RhdGUpO1xuXG4gICAgLy8gY29udHJvbGxlclxuICAgIHRoaXMuc2VhcmNoU2VydmljZSA9IG5ldyBTZWFyY2hTZXJ2aWNlKHsgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybCB9KTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdCA9IG5ldyBDb250ZW50VHlwZUxpc3QoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsID0gbmV3IENvbnRlbnRUeXBlRGV0YWlsKHsgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybCB9KTtcblxuICAgIC8vIGFkZCBtZW51IGl0ZW1zXG4gICAgWydNeSBDb250ZW50IFR5cGVzJywgJ05ld2VzdCcsICdNb3N0IFBvcHVsYXInLCAnUmVjb21tZW5kZWQnXVxuICAgICAgLmZvckVhY2gobWVudVRleHQgPT4gdGhpcy52aWV3LmFkZE1lbnVJdGVtKG1lbnVUZXh0KSk7XG5cbiAgICAvLyBzZXQgc3ViIHZpZXcgKFRPRE8gZmluZCBvdGhlciB3YXkpXG4gICAgdGhpcy52aWV3LmdldEVsZW1lbnQoKS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlTGlzdC5nZXRFbGVtZW50KCkpO1xuICAgIHRoaXMudmlldy5nZXRFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZURldGFpbC5nZXRFbGVtZW50KCkpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCddLCB0aGlzLmNvbnRlbnRUeXBlTGlzdCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XG5cbiAgICAvLyByZWdpc3RlciBsaXN0ZW5lcnNcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMuc2VhcmNoLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmFwcGx5U2VhcmNoRmlsdGVyLCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5vbigncm93LXNlbGVjdGVkJywgdGhpcy5zaG93RGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG5cbiAgICB0aGlzLmluaXRDb250ZW50VHlwZUxpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0IHdpdGggYSBzZWFyY2hcbiAgICovXG4gIGluaXRDb250ZW50VHlwZUxpc3QoKSB7XG4gICAgLy8gaW5pdGlhbGl6ZSBieSBzZWFyY2hcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKFwiXCIpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5maXJlKCdlcnJvcicsIGVycm9yKSk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgYSBzZWFyY2ggYW5kIHVwZGF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICAgKi9cbiAgc2VhcmNoKHtxdWVyeX0pIHtcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYXBwbHkgYSBzZWFyY2ggZmlsdGVyXG4gICAqL1xuICBhcHBseVNlYXJjaEZpbHRlcigpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdDb250ZW50VHlwZVNlY3Rpb246IG1lbnUgd2FzIGNsaWNrZWQhJywgZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIGRldGFpbCB2aWV3XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2hvd0RldGFpbFZpZXcoe2lkfSkge1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmxvYWRCeUlkKGlkKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLnNob3coKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENsb3NlIGRldGFpbCB2aWV3XG4gICAqL1xuICBjbG9zZURldGFpbFZpZXcoKSB7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5oaWRlKCk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Quc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxuaW1wb3J0IGluaXRUYWJQYW5lbCBmcm9tIFwiY29tcG9uZW50cy90YWItcGFuZWxcIlxuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5cbi8qKlxuICogQGNvbnN0XG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfQVJJQV9FWFBBTkRFRCA9IFwiYXJpYS1leHBhbmRlZFwiO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaXNFeHBhbmRlZCA9IGF0dHJpYnV0ZUVxdWFscyhBVFRSSUJVVEVfQVJJQV9FWFBBTkRFRCwgJ3RydWUnKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViVmlldyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnJlbmRlclRhYlBhbmVsKHN0YXRlKTtcbiAgICB0aGlzLnJlbmRlclBhbmVsKHN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHBhbmVsXG4gICAqL1xuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4cGFuZGVkXG4gICAqL1xuICByZW5kZXJQYW5lbCh7dGl0bGUgPSAnJywgc2VjdGlvbklkID0gJ2NyZWF0ZS1jb250ZW50JywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGl0bGUuY2xhc3NOYW1lICs9IFwicGFuZWwtaGVhZGVyIGljb24taHViLWljb25cIjtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWApO1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5ib2R5LmNsYXNzTmFtZSArPSBcInBhbmVsLWJvZHlcIjtcbiAgICB0aGlzLmJvZHkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMuYm9keS5pZCA9IGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWA7XG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lICs9IGBwYW5lbCBoNXAtc2VjdGlvbi0ke3NlY3Rpb25JZH1gO1xuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmJvZHkpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSArPSBgaDVwIGg1cC1odWJgO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZSB0aGUgcGFuZWwgYXR0cmliaXV0ZXMgZnJvbSBoNXAtc2RrLCBlLmcuIG9wZW5pbmcgYW5kIGNsb3NpbmdcbiAgICogVGhpcyBpcyBvbmx5IGNhbGxlZCBvbmNlIG5vIGVycm9ycyBoYXZlIG9jY3VyZWQgaW4gbG9hZGluZyB0aGUgaHViIFxuICAgKi9cbiAgaW5pdGlhbGl6ZVBhbmVsKCl7XG4gICAgaW5pdFBhbmVsKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHRhYiBwYW5lbFxuICAgKi9cbiAgcmVuZGVyVGFiUGFuZWwoc3RhdGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnRhYmxpc3QuY2xhc3NOYW1lICs9IFwidGFibGlzdFwiO1xuICAgIHRoaXMudGFibGlzdC5zZXRBdHRyaWJ1dGUgKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgdGhpcy50YWJMaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxpc3QpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5jbGFzc05hbWUgKz0gJ3RhYi1wYW5lbCc7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGFiTGlzdFdyYXBwZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0YWJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcbiAgICovXG4gIGFkZFRhYih7dGl0bGUsIGlkLCBjb250ZW50LCBzZWxlY3RlZCA9IGZhbHNlfSkge1xuICAgIGNvbnN0IHRhYklkID0gYHRhYi0ke2lkfWA7XG4gICAgY29uc3QgdGFiUGFuZWxJZCA9IGB0YWItcGFuZWwtJHtpZH1gO1xuXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0YWIuY2xhc3NOYW1lICs9ICd0YWInO1xuICAgIHRhYi5pZCA9IHRhYklkO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0YWJQYW5lbElkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQudG9TdHJpbmcoKSk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWInKTtcbiAgICB0YWIuaW5uZXJIVE1MID0gdGl0bGU7XG5cbiAgICBjb25zdCB0YWJQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRhYlBhbmVsLmlkID0gdGFiUGFuZWxJZDtcbiAgICB0YWJQYW5lbC5jbGFzc05hbWUgKz0gJ3RhYnBhbmVsJztcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFibGxlZGJ5JywgdGFiSWQpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIXNlbGVjdGVkKS50b1N0cmluZygpKTtcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcbiAgICB0YWJQYW5lbC5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZCh0YWIpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0YWJQYW5lbCk7XG4gIH1cblxuICBpbml0VGFiUGFuZWwoKSB7XG4gICAgaW5pdFRhYlBhbmVsKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VjdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbklkXG4gICAqL1xuICBzZXRTZWN0aW9uKHNlY3Rpb25JZCkge1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lID0gYGg1cC1zZWN0aW9uLSR7c2VjdGlvbklkfSBwYW5lbGA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsImltcG9ydCB7Y3VycnksIG1hcCwgZmlsdGVyfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiXG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSBcIi4uL2h1Yi1zZXJ2aWNlc1wiO1xuaW1wb3J0IGx1bnIgZnJvbSBcImx1bnJcIlxuXG5jb25zdCBmaW5kQ29udGVudFR5cGVCeU1hY2hpbmVOYW1lID0gY3VycnkoZnVuY3Rpb24oY29udGVudFR5cGVzLCBtYWNoaW5lTmFtZSkge1xuICByZXR1cm4gY29udGVudFR5cGVzLmZpbHRlcihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSA9PT0gbWFjaGluZU5hbWUpWzBdO1xufSk7XG5cblxuLyoqXG4gKiBBZGRzIGEgY29udGVudCB0eXBlIHRvIHRoZSBzZWFyY2ggaW5kZXhcbiAqXG4gKiBAcGFyYW0gIHtsdW5yLkluZGV4fSBpbmRleFxuICogQHBhcmFtICB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gKlxuICogQHJldHVybiB7Q29udGVudFR5cGV9XG4gKi9cbmNvbnN0IGFkZFRvSW5kZXggPSBjdXJyeSgoaW5kZXgsIGNvbnRlbnRUeXBlKSA9PiB7XG4gIGluZGV4LmFkZCh7XG4gICAgdGl0bGU6IGNvbnRlbnRUeXBlLnRpdGxlLFxuICAgIHN1bW1hcnk6IGNvbnRlbnRUeXBlLnN1bW1hcnksXG4gICAgaWQ6IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lXG4gIH0pO1xuXG4gIHJldHVybiBjb250ZW50VHlwZTtcbn0pO1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUuYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIFNldCB1cCBsdW5yIGluZGV4XG4gICAgdGhpcy5pbmRleCA9IGx1bnIoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmZpZWxkKCd0aXRsZScsIHtib29zdDogMTAwfSk7XG4gICAgICB0aGlzLmZpZWxkKCdzdW1tYXJ5Jyk7XG4gICAgICB0aGlzLmZpZWxkKCdkZXNjcmlwdGlvbicpO1xuICAgICAgdGhpcy5maWVsZCgna2V5d29yZHMnKTtcbiAgICAgIHRoaXMucmVmKCdpZCcpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jb250ZW50VHlwZXMgPSB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlcygpXG4gICAgICAudGhlbihtYXAoYWRkVG9JbmRleCh0aGlzLmluZGV4KSkpOyAvLyBBZGQgY29udGVudCB0eXBlcyB0byBzZWFyY2ggaW5kZXhcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHNlYXJjaFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnlcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZTxDb250ZW50VHlwZVtdPn1cbiAgICovXG4gIHNlYXJjaChxdWVyeSkge1xuICAgIC8vIERpc3BsYXkgYWxsIGNvbnRlbnQgdHlwZXMgYnkgZGVmYXVsdFxuICAgIGlmIChxdWVyeSA9PT0gJycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRUeXBlcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5kZXguc2VhcmNoKHF1ZXJ5KVxuICAgICAgICAubWFwKHJlc3VsdCA9PiByZXN1bHQucmVmKVxuICAgICAgICAubWFwKGZpbmRDb250ZW50VHlwZUJ5TWFjaGluZU5hbWUoY29udGVudFR5cGVzKSlcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCIvKipcbiAqIEBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRTZWN0aW9uIHtcbiAgZ2V0RWxlbWVudCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlRPRE8gVXBsb2FkXCI7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsInJlcXVpcmUoJy4uLy4uL3NyYy9zdHlsZXMvbWFpbi5zY3NzJyk7XG5cbi8vIExvYWQgbGlicmFyeVxuSDVQID0gSDVQIHx8IHt9O1xuSDVQLkh1YkNsaWVudCA9IHJlcXVpcmUoJy4uL3NjcmlwdHMvaHViJykuZGVmYXVsdDtcbkg1UC5IdWJDbGllbnQucmVuZGVyRXJyb3JNZXNzYWdlID0gcmVxdWlyZSgnLi4vc2NyaXB0cy91dGlscy9lcnJvcnMnKS5kZWZhdWx0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudHJpZXMvZGlzdC5qcyJdLCJzb3VyY2VSb290IjoiIn0=