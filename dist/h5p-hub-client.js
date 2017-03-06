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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
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
exports.relayClickEventAs = undefined;

var _functional = __webpack_require__(1);

var relayClickEventAs = exports.relayClickEventAs = (0, _functional.curry)(function (type, eventful, element) {
  element.addEventListener('click', function (event) {
    eventful.fire(type, {
      element: element,
      id: element.getAttribute('data-id')
    }, false);

    event.preventDefault();
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
    this.view.on('tab-change', this.view.setSectionType, this.view);
    this.view.on('panel-change', this.view.togglePanelOpen.bind(this.view), this.view);
    this.contentTypeSection.on('update-content-type-list', this.view.initializePanel.bind(this.view), this.view);

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
        id: 'content-types',
        content: this.contentTypeSection.getElement(),
        selected: true
      }, {
        title: 'Upload',
        id: 'upload',
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
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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

var _panel = __webpack_require__(6);

var _panel2 = _interopRequireDefault(_panel);

var _events = __webpack_require__(5);

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
    (0, _events.relayClickEventAs)('close', this, backButtonElement);

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
    (0, _events.relayClickEventAs)('select', this, this.useButton);

    // install button
    this.installButton = document.createElement('span');
    this.installButton.className = 'button button-inverse-primary';
    this.installButton.innerHTML = 'Install';
    _hide(this.installButton);
    (0, _events.relayClickEventAs)('install', this, this.installButton);

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

var _events = __webpack_require__(5);

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
      }).map((0, _events.relayClickEventAs)('row-selected', this));
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
        (0, _events.relayClickEventAs)('select', this, button);
      } else {
        button.className = "button button-inverse-primary";
        button.innerHTML = "Get";
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _panel = __webpack_require__(6);

var _panel2 = _interopRequireDefault(_panel);

var _tabPanel = __webpack_require__(19);

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
     * Set if panel is open, this is used for outer border color
     */

  }, {
    key: "togglePanelOpen",
    value: function togglePanelOpen() {
      if (isOpen(this.panel)) {
        this.panel.removeAttribute('open');
      } else {
        this.panel.setAttribute('open', '');
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

var _functional = __webpack_require__(1);

var _hubServices = __webpack_require__(4);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _lunr = __webpack_require__(9);

var _lunr2 = _interopRequireDefault(_lunr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * The Search Service gets a content types from HubServices
 * then indexes them using lunrjs. It then searches through
 * the lunrjs index and returns content types that match the query.
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
      this.field('title', { boost: 10 }); // Certain fields can given a higher importance
      this.field('summary');
      this.field('description');
      this.field('keywords');
      this.ref('id'); //
    });

    // Add content types to the search index
    this.contentTypes = this.services.contentTypes().then((0, _functional.map)(addToIndex(this.index)));
  }

  /**
   * Performs a search
   *
   * @param {String} query
   *
   * @return {Promise<ContentType[]>} A promise of an array of content types
   */


  _createClass(SearchService, [{
    key: "search",
    value: function search(query) {
      var _this = this;

      // Display all content types by default
      if (query === '') {
        return this.contentTypes;
      }

      // Otherwise, filter content types by a query
      return this.contentTypes.then(function (contentTypes) {
        return _this.index.search(query).map(function (result) {
          return result.ref;
        }).map(findContentTypeByMachineName(contentTypes));
      });
    }
  }]);

  return SearchService;
}();

/**
 * Adds a content type to the lunrjs search index
 * creates an id for the index using the machine name
 * of the content type.
 *
 * @param  {lunr.Index} index
 * @param  {ContentType} contentType
 *
 * @return {ContentType}
 */


exports.default = SearchService;
var addToIndex = (0, _functional.curry)(function (index, contentType) {
  index.add({
    title: contentType.title,
    summary: contentType.summary,
    description: contentType.description,
    keywords: contentType.keywords,
    id: contentType.machineName
  });

  return contentType;
});

/**
 * helper function
 *
 * @param  {ContentType[]}
 * @param  {string} machineName
 * @return {ContentType}
 */
var findContentTypeByMachineName = (0, _functional.curry)(function (contentTypes, machineName) {
  return contentTypes.filter(function (contentType) {
    return contentType.machineName === machineName;
  })[0];
});

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(7).default;
H5P.HubClient.renderErrorMessage = __webpack_require__(3).default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGEyMWNlMWQxZGRjYjJhYzI5ZTQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIndlYnBhY2s6Ly8vLi8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWItc2VydmljZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwid2VicGFjazovLy8uLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9sdW5yL2x1bnIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwibmFtZXMiOlsiRXZlbnRmdWwiLCJsaXN0ZW5lcnMiLCJvbiIsInR5cGUiLCJsaXN0ZW5lciIsInNjb3BlIiwidHJpZ2dlciIsInB1c2giLCJmaXJlIiwiZXZlbnQiLCJ0cmlnZ2VycyIsImV2ZXJ5IiwiY2FsbCIsInByb3BhZ2F0ZSIsInR5cGVzIiwiZXZlbnRmdWwiLCJzZWxmIiwiZm9yRWFjaCIsImN1cnJ5IiwiZm4iLCJhcml0eSIsImxlbmd0aCIsImYxIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJhcmd1bWVudHMiLCJhcHBseSIsImYyIiwiYXJnczIiLCJjb25jYXQiLCJjb21wb3NlIiwiZm5zIiwicmVkdWNlIiwiZiIsImciLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJuYW1lIiwiZWwiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJhdHRyaWJ1dGVFcXVhbHMiLCJ0b2dnbGVBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInBhcmVudCIsImNoaWxkIiwicXVlcnlTZWxlY3RvciIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbmRlckVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjbG9zZUJ1dHRvbiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsIm1lc3NhZ2VDb250ZW50IiwidGl0bGUiLCJjb250ZW50IiwibWVzc2FnZVdyYXBwZXIiLCJkaXNtaXNzaWJsZSIsImJ1dHRvbiIsInVuZGVmaW5lZCIsIm1lc3NhZ2VCdXR0b24iLCJjb25zb2xlIiwibG9nIiwiSHViU2VydmljZXMiLCJhcGlSb290VXJsIiwid2luZG93IiwiY2FjaGVkQ29udGVudFR5cGVzIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsInRoZW4iLCJyZXN1bHQiLCJqc29uIiwiaXNWYWxpZCIsImxpYnJhcmllcyIsInJlc3BvbnNlIiwibWVzc2FnZUNvZGUiLCJQcm9taXNlIiwicmVqZWN0IiwicmVzb2x2ZSIsIm1hY2hpbmVOYW1lIiwiY29udGVudFR5cGVzIiwiY29udGVudFR5cGUiLCJpZCIsImJvZHkiLCJyZWxheUNsaWNrRXZlbnRBcyIsImVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJpbml0IiwiaXNFeHBhbmRlZCIsImhpZGUiLCJzaG93IiwidG9nZ2xlQm9keVZpc2liaWxpdHkiLCJib2R5RWxlbWVudCIsIm9uQXJpYUV4cGFuZGVkQ2hhbmdlIiwidGFyZ2V0IiwidGl0bGVFbCIsImJvZHlJZCIsImJvZHlFbCIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJIdWIiLCJzdGF0ZSIsImNvbnRlbnRUeXBlU2VjdGlvbiIsInVwbG9hZFNlY3Rpb24iLCJ2aWV3Iiwic2VydmljZXMiLCJzZXRQYW5lbFRpdGxlIiwiY2xvc2VQYW5lbCIsInNldFNlY3Rpb25UeXBlIiwidG9nZ2xlUGFuZWxPcGVuIiwiYmluZCIsImluaXRpYWxpemVQYW5lbCIsImluaXRUYWJQYW5lbCIsImdldENvbnRlbnRUeXBlIiwic2V0VGl0bGUiLCJ0YWJDb25maWdzIiwiZ2V0RWxlbWVudCIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwibHVuciIsImNvbmZpZyIsImlkeCIsIkluZGV4IiwicGlwZWxpbmUiLCJhZGQiLCJ0cmltbWVyIiwic3RvcFdvcmRGaWx0ZXIiLCJzdGVtbWVyIiwidmVyc2lvbiIsInV0aWxzIiwid2FybiIsImdsb2JhbCIsImFzU3RyaW5nIiwib2JqIiwiRXZlbnRFbWl0dGVyIiwiZXZlbnRzIiwiYWRkTGlzdGVuZXIiLCJwb3AiLCJuYW1lcyIsIlR5cGVFcnJvciIsImhhc0hhbmRsZXIiLCJyZW1vdmVMaXN0ZW5lciIsImZuSW5kZXgiLCJzcGxpY2UiLCJlbWl0IiwidG9rZW5pemVyIiwiaXNBcnJheSIsInQiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJzcGxpdCIsInNlcGFyYXRvciIsImxvYWQiLCJsYWJlbCIsInJlZ2lzdGVyZWRGdW5jdGlvbnMiLCJFcnJvciIsInJlZ2lzdGVyRnVuY3Rpb24iLCJQaXBlbGluZSIsIl9zdGFjayIsIndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZCIsImlzUmVnaXN0ZXJlZCIsInNlcmlhbGlzZWQiLCJmbk5hbWUiLCJhZnRlciIsImV4aXN0aW5nRm4iLCJuZXdGbiIsInBvcyIsImJlZm9yZSIsInJlbW92ZSIsInJ1biIsInRva2VucyIsIm91dCIsInRva2VuTGVuZ3RoIiwic3RhY2tMZW5ndGgiLCJpIiwidG9rZW4iLCJqIiwicmVzZXQiLCJ0b0pTT04iLCJWZWN0b3IiLCJfbWFnbml0dWRlIiwibGlzdCIsIk5vZGUiLCJ2YWwiLCJuZXh0IiwiaW5zZXJ0IiwicHJldiIsIm1hZ25pdHVkZSIsIm5vZGUiLCJzdW1PZlNxdWFyZXMiLCJNYXRoIiwic3FydCIsImRvdCIsIm90aGVyVmVjdG9yIiwib3RoZXJOb2RlIiwiZG90UHJvZHVjdCIsInNpbWlsYXJpdHkiLCJTb3J0ZWRTZXQiLCJlbGVtZW50cyIsInNlcmlhbGlzZWREYXRhIiwic2V0IiwibG9jYXRpb25Gb3IiLCJ0b0FycmF5IiwiY3R4IiwiZWxlbSIsInN0YXJ0IiwiZW5kIiwic2VjdGlvbkxlbmd0aCIsInBpdm90IiwiZmxvb3IiLCJwaXZvdEVsZW0iLCJpbnRlcnNlY3QiLCJvdGhlclNldCIsImludGVyc2VjdFNldCIsImFfbGVuIiwiYl9sZW4iLCJhIiwiYiIsImNsb25lIiwidW5pb24iLCJsb25nU2V0Iiwic2hvcnRTZXQiLCJ1bmlvblNldCIsInNob3J0U2V0RWxlbWVudHMiLCJfZmllbGRzIiwiX3JlZiIsImRvY3VtZW50U3RvcmUiLCJTdG9yZSIsInRva2VuU3RvcmUiLCJUb2tlblN0b3JlIiwiY29ycHVzVG9rZW5zIiwiZXZlbnRFbWl0dGVyIiwidG9rZW5pemVyRm4iLCJfaWRmQ2FjaGUiLCJvZmYiLCJmaWVsZHMiLCJyZWYiLCJmaWVsZCIsImZpZWxkTmFtZSIsIm9wdHMiLCJib29zdCIsInJlZk5hbWUiLCJkb2MiLCJlbWl0RXZlbnQiLCJkb2NUb2tlbnMiLCJhbGxEb2N1bWVudFRva2VucyIsImRvY1JlZiIsImZpZWxkVG9rZW5zIiwidGYiLCJmaWVsZExlbmd0aCIsInRva2VuQ291bnQiLCJrIiwiaGFzIiwiZ2V0IiwidXBkYXRlIiwiaWRmIiwidGVybSIsImNhY2hlS2V5IiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJkb2N1bWVudEZyZXF1ZW5jeSIsImNvdW50Iiwic2VhcmNoIiwicXVlcnkiLCJxdWVyeVRva2VucyIsInF1ZXJ5VmVjdG9yIiwiZG9jdW1lbnRTZXRzIiwiZmllbGRCb29zdHMiLCJtZW1vIiwiaGFzU29tZVRva2VuIiwiZXhwYW5kIiwia2V5Iiwic2ltaWxhcml0eUJvb3N0IiwiZGlmZiIsIm1heCIsIm1hdGNoaW5nRG9jdW1lbnRzIiwicmVmcyIsImtleXMiLCJyZWZzTGVuIiwiZG9jdW1lbnRTZXQiLCJzY29yZSIsImRvY3VtZW50VmVjdG9yIiwic29ydCIsImRvY3VtZW50UmVmIiwiZG9jdW1lbnRUb2tlbnMiLCJkb2N1bWVudFRva2Vuc0xlbmd0aCIsInVzZSIsInBsdWdpbiIsInVuc2hpZnQiLCJzdG9yZSIsInN0ZXAybGlzdCIsInN0ZXAzbGlzdCIsImMiLCJ2IiwiQyIsIlYiLCJtZ3IwIiwibWVxMSIsIm1ncjEiLCJzX3YiLCJyZV9tZ3IwIiwiUmVnRXhwIiwicmVfbWdyMSIsInJlX21lcTEiLCJyZV9zX3YiLCJyZV8xYSIsInJlMl8xYSIsInJlXzFiIiwicmUyXzFiIiwicmVfMWJfMiIsInJlMl8xYl8yIiwicmUzXzFiXzIiLCJyZTRfMWJfMiIsInJlXzFjIiwicmVfMiIsInJlXzMiLCJyZV80IiwicmUyXzQiLCJyZV81IiwicmVfNV8xIiwicmUzXzUiLCJwb3J0ZXJTdGVtbWVyIiwidyIsInN0ZW0iLCJzdWZmaXgiLCJmaXJzdGNoIiwicmUiLCJyZTIiLCJyZTMiLCJyZTQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInRlc3QiLCJyZXBsYWNlIiwiZnAiLCJleGVjIiwiZ2VuZXJhdGVTdG9wV29yZEZpbHRlciIsInN0b3BXb3JkcyIsIndvcmRzIiwic3RvcFdvcmQiLCJyb290IiwiZG9jcyIsImNoYXJBdCIsInJlc3QiLCJnZXROb2RlIiwiZmFjdG9yeSIsImRlZmluZSIsImV4cG9ydHMiLCJtb2R1bGUiLCJBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEIiwidG9nZ2xlVmlzaWJpbGl0eSIsInZpc2libGUiLCJpc0VtcHR5IiwidGV4dCIsIkNvbnRlbnRUeXBlRGV0YWlsVmlldyIsImJhY2tCdXR0b25FbGVtZW50IiwiaW1hZ2UiLCJpbWFnZVdyYXBwZXJFbGVtZW50IiwiYXV0aG9yIiwiZGVzY3JpcHRpb24iLCJkZW1vQnV0dG9uIiwidGV4dERldGFpbHMiLCJkZXRhaWxzRWxlbWVudCIsInVzZUJ1dHRvbiIsImluc3RhbGxCdXR0b24iLCJidXR0b25CYXIiLCJsaWNlbmNlUGFuZWwiLCJjcmVhdGVQYW5lbCIsInBsdWdpbnNQYW5lbCIsInB1Ymxpc2hlclBhbmVsIiwicGFuZWxHcm91cEVsZW1lbnQiLCJyb290RWxlbWVudCIsImhlYWRlckVsIiwiYm9keUlubmVyRWwiLCJwYW5lbEVsIiwic3JjIiwidXJsIiwiaW5zdGFsbGVkIiwiQ29udGVudFR5cGVEZXRhaWwiLCJpbnN0YWxsIiwiaW5zdGFsbENvbnRlbnRUeXBlIiwiZGVidWciLCJzZXRJZCIsInNldERlc2NyaXB0aW9uIiwic2V0SW1hZ2UiLCJpY29uIiwic2V0RXhhbXBsZSIsImV4YW1wbGUiLCJzZXRJc0luc3RhbGxlZCIsIkNvbnRlbnRUeXBlTGlzdFZpZXciLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJyZW5kZXJDb250ZW50VHlwZUxpc3QiLCJjcmVhdGVDb250ZW50VHlwZVJvdyIsInN1bW1hcnkiLCJyb3ciLCJjcmVhdGVCdXR0b25FbGVtZW50IiwiQ29udGVudFR5cGVMaXN0IiwidXBkYXRlTGlzdCIsIkNvbnRlbnRCcm93c2VyVmlldyIsIm1lbnUiLCJjcmVhdGVNZW51RWxlbWVudCIsImlucHV0R3JvdXAiLCJjcmVhdGVJbnB1dEdyb3VwRWxlbWVudCIsIm1lbnVHcm91cCIsIm1lbnVCYXJFbGVtZW50IiwiY2hpbGRFbGVtZW50Q291bnQiLCJuYXZFbGVtZW50IiwiaW5wdXRGaWVsZCIsImlucHV0QnV0dG9uIiwiQ29udGVudFR5cGVTZWN0aW9uIiwic2VhcmNoU2VydmljZSIsImNvbnRlbnRUeXBlTGlzdCIsImNvbnRlbnRUeXBlRGV0YWlsIiwiYWRkTWVudUl0ZW0iLCJtZW51VGV4dCIsInNlY3Rpb24iLCJjbGFzc0xpc3QiLCJhcHBseVNlYXJjaEZpbHRlciIsInNob3dEZXRhaWxWaWV3IiwiY2xvc2VEZXRhaWxWaWV3IiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsImNhdGNoIiwiZXJyb3IiLCJsb2FkQnlJZCIsIkFUVFJJQlVURV9EQVRBX0lEIiwiaXNPcGVuIiwiSHViVmlldyIsInJlbmRlclRhYlBhbmVsIiwicmVuZGVyUGFuZWwiLCJzZWN0aW9uSWQiLCJleHBhbmRlZCIsInRhYkNvbnRhaW5lckVsZW1lbnQiLCJwYW5lbCIsInRhYmxpc3QiLCJ0YWJMaXN0V3JhcHBlciIsInRhYklkIiwidGFiUGFuZWxJZCIsInRhYiIsInRhYlBhbmVsIiwiU2VhcmNoU2VydmljZSIsImluZGV4IiwiYWRkVG9JbmRleCIsImZpbmRDb250ZW50VHlwZUJ5TWFjaGluZU5hbWUiLCJrZXl3b3JkcyIsIlVwbG9hZFNlY3Rpb24iLCJoaWRlQWxsIiwidW5TZWxlY3RBbGwiLCJ0YWJzIiwidGFiUGFuZWxzIiwicmVxdWlyZSIsIkg1UCIsIkh1YkNsaWVudCIsImRlZmF1bHQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBOzs7QUFHTyxJQUFNQSw4QkFBVyxTQUFYQSxRQUFXO0FBQUEsU0FBTztBQUM3QkMsZUFBVyxFQURrQjs7QUFHN0I7Ozs7Ozs7Ozs7QUFVQUMsUUFBSSxZQUFTQyxJQUFULEVBQWVDLFFBQWYsRUFBeUJDLEtBQXpCLEVBQWdDO0FBQ2xDOzs7OztBQUtBLFVBQU1DLFVBQVU7QUFDZCxvQkFBWUYsUUFERTtBQUVkLGlCQUFTQztBQUZLLE9BQWhCOztBQUtBLFdBQUtKLFNBQUwsQ0FBZUUsSUFBZixJQUF1QixLQUFLRixTQUFMLENBQWVFLElBQWYs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QUFNelcsT0FBTyw0QkFBYSxhQUFiLEVBQTRCLE9BQTVCLENBQWI7O0FBRUE7OztBQUdBLElBQU0wVyxjQUFjLHlCQUFRLDRCQUFhLGVBQWIsRUFBOEIsT0FBOUIsQ0FBUixDQUFwQjs7QUFFQTs7Ozs7QUFLZSxTQUFTN1csSUFBVCxDQUFjSCxPQUFkLEVBQXVCO0FBQ3BDLE1BQU1pWCxPQUFPalgsUUFBUXpDLGdCQUFSLENBQXlCLGNBQXpCLENBQWI7QUFDQSxNQUFNMlosWUFBWWxYLFFBQVF6QyxnQkFBUixDQUF5QixtQkFBekIsQ0FBbEI7O0FBRUEwWixPQUFLdmMsT0FBTCxDQUFhLGVBQU87QUFDbEI2YixRQUFJdFcsZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsVUFBVS9GLEtBQVYsRUFBaUI7O0FBRTdDOGMsa0JBQVlDLElBQVo7QUFDQS9jLFlBQU13RyxNQUFOLENBQWE3RCxZQUFiLENBQTBCLGVBQTFCLEVBQTJDLE1BQTNDOztBQUVBa2EsY0FBUUcsU0FBUjs7QUFFQSxVQUFJWixhQUFhcGMsTUFBTXdHLE1BQU4sQ0FBYWhFLFlBQWIsQ0FBMEIsZUFBMUIsQ0FBakI7QUFDQTRELFdBQUtOLFFBQVEzQyxhQUFSLE9BQTBCaVosVUFBMUIsQ0FBTDtBQUNELEtBVEQ7QUFVRCxHQVhEO0FBWUQsQzs7Ozs7Ozs7O0FDdkNELG1CQUFBYSxDQUFRLENBQVI7O0FBRUE7QUFDQUMsTUFBTUEsT0FBTyxFQUFiO0FBQ0FBLElBQUlDLFNBQUosR0FBZ0IsbUJBQUFGLENBQVEsQ0FBUixFQUEwQkcsT0FBMUM7QUFDQUYsSUFBSUMsU0FBSixDQUFjN1osa0JBQWQsR0FBbUMsbUJBQUEyWixDQUFRLENBQVIsRUFBbUNHLE9BQXRFLEMiLCJmaWxlIjoiaDVwLWh1Yi1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGEyMWNlMWQxZGRjYjJhYzI5ZTQiLCIvKipcclxuICogQG1peGluXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRXZlbnRmdWwgPSAoKSA9PiAoe1xyXG4gIGxpc3RlbmVyczoge30sXHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3RlbiB0byBldmVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbc2NvcGVdXHJcbiAgICpcclxuICAgKiBAZnVuY3Rpb25cclxuICAgKiBAcmV0dXJuIHtFdmVudGZ1bH1cclxuICAgKi9cclxuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlZGVmIHtvYmplY3R9IFRyaWdnZXJcclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXHJcbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2NvcGVcclxuICAgICAqL1xyXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcclxuICAgICAgJ2xpc3RlbmVyJzogbGlzdGVuZXIsXHJcbiAgICAgICdzY29wZSc6IHNjb3BlXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XHJcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxyXG4gICAqXHJcbiAgICogQGZ1bmN0aW9uXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBmaXJlOiBmdW5jdGlvbih0eXBlLCBldmVudCkge1xyXG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcclxuXHJcbiAgICByZXR1cm4gdHJpZ2dlcnMuZXZlcnkoZnVuY3Rpb24odHJpZ2dlcikge1xyXG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3RlbnMgZm9yIGV2ZW50cyBvbiBhbm90aGVyIEV2ZW50ZnVsLCBhbmQgcHJvcGFnYXRlIGl0IHRyb3VnaCB0aGlzIEV2ZW50ZnVsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB0eXBlc1xyXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IGV2ZW50ZnVsXHJcbiAgICovXHJcbiAgcHJvcGFnYXRlOiBmdW5jdGlvbih0eXBlcywgZXZlbnRmdWwpIHtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUodHlwZSwgZXZlbnQpKSk7XHJcbiAgfVxyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9taXhpbnMvZXZlbnRmdWwuanMiLCIvKipcclxuICogUmV0dXJucyBhIGN1cnJpZWQgdmVyc2lvbiBvZiBhIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXHJcbiAqXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY3VycnkgPSBmdW5jdGlvbihmbikge1xyXG4gIGNvbnN0IGFyaXR5ID0gZm4ubGVuZ3RoO1xyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gZjEoKSB7XHJcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA+PSBhcml0eSkge1xyXG4gICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJncyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGYyKCkge1xyXG4gICAgICAgIGNvbnN0IGFyZ3MyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuICAgICAgICByZXR1cm4gZjEuYXBwbHkobnVsbCwgYXJncy5jb25jYXQoYXJnczIpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcG9zZSBmdW5jdGlvbnMgdG9nZXRoZXIsIGV4ZWN1dGluZyBmcm9tIHJpZ2h0IHRvIGxlZnRcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbi4uLn0gZm5zXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNvbXBvc2UgPSAoLi4uZm5zKSA9PiBmbnMucmVkdWNlKChmLCBnKSA9PiAoLi4uYXJncykgPT4gZihnKC4uLmFyZ3MpKSk7XHJcblxyXG4vKipcclxuICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggZWxlbWVudCBpbiBhbiBhcnJheVxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZm9yRWFjaCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XHJcbiAgYXJyLmZvckVhY2goZm4pO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBNYXBzIGEgZnVuY3Rpb24gdG8gYW4gYXJyYXlcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1hcCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XHJcbiAgcmV0dXJuIGFyci5tYXAoZm4pO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBBcHBsaWVzIGEgZmlsdGVyIHRvIGFuIGFycmF5XHJcbiAqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xyXG4gIHJldHVybiBhcnIuZmlsdGVyKGZuKTtcclxufSk7XHJcblxyXG4vKipcclxuICogQXBwbGllcyBhIHNvbWUgdG8gYW4gYXJyYXlcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNvbWUgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xyXG4gIHJldHVybiBhcnIuc29tZShmbik7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBhbiBhcnJheSBjb250YWlucyBhIHZhbHVlXHJcbiAqXHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICogQHBhcmFtIHtBcnJheX0gYXJyXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNvbnRhaW5zID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlLCBhcnIpIHtcclxuICByZXR1cm4gYXJyLmluZGV4T2YodmFsdWUpICE9IC0xO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGFycmF5IHdpdGhvdXQgdGhlIHN1cHBsaWVkIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcclxuICogQHBhcmFtIHtBcnJheX0gYXJyXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHdpdGhvdXQgPSBjdXJyeShmdW5jdGlvbiAodmFsdWVzLCBhcnIpIHtcclxuICByZXR1cm4gZmlsdGVyKHZhbHVlID0+ICFjb250YWlucyh2YWx1ZSwgdmFsdWVzKSwgYXJyKVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBhIHN0cmluZyB0aGF0IGlzIGVpdGhlciAndHJ1ZScgb3IgJ2ZhbHNlJyBhbmQgcmV0dXJucyB0aGUgb3Bwb3NpdGVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGJvb2xcclxuICpcclxuICogQHB1YmxpY1xyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaW52ZXJzZUJvb2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoYm9vbCkge1xyXG4gIHJldHVybiAoYm9vbCAhPT0gJ3RydWUnKS50b1N0cmluZygpO1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsImltcG9ydCB7Y3VycnksIGludmVyc2VCb29sZWFuU3RyaW5nfSBmcm9tICcuL2Z1bmN0aW9uYWwnXHJcblxyXG4vKipcclxuICogR2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmcm9tIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcclxuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgYW4gYXR0cmlidXRlIG9uIGEgaHRtbCBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBzZXRBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGVsKSB7XHJcbiAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcclxufSk7XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIGh0bWwgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCByZW1vdmVBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcclxuICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBoYXNBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcclxuICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKG5hbWUpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGUgdGhhdCBlcXVhbHNcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUVxdWFscyA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZWwpIHtcclxuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpID09PSB2YWx1ZTtcclxufSk7XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyBhbiBhdHRyaWJ1dGUgYmV0d2VlbiAndHJ1ZScgYW5kICdmYWxzZSc7XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRvZ2dsZUF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xyXG4gIGNvbnN0IHZhbHVlID0gZ2V0QXR0cmlidXRlKG5hbWUsIGVsKTtcclxuICBzZXRBdHRyaWJ1dGUobmFtZSwgaW52ZXJzZUJvb2xlYW5TdHJpbmcodmFsdWUpLCBlbCk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBhcHBlbmRDaGlsZCgpIG1ldGhvZCBhZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0IG9mIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWVkIHBhcmVudCBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGFwcGVuZENoaWxkID0gY3VycnkoZnVuY3Rpb24gKHBhcmVudCwgY2hpbGQpIHtcclxuICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcclxufSk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIGEgZGVzY2VuZGFudCBvZiB0aGUgZWxlbWVudCBvbiB3aGljaCBpdCBpcyBpbnZva2VkXHJcbiAqIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIHNlbGVjdG9ycy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yID0gY3VycnkoZnVuY3Rpb24gKHNlbGVjdG9yLCBlbCkge1xyXG4gIHJldHVybiBlbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxufSk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIG5vbi1saXZlIE5vZGVMaXN0IG9mIGFsbCBlbGVtZW50cyBkZXNjZW5kZWQgZnJvbSB0aGUgZWxlbWVudCBvbiB3aGljaCBpdFxyXG4gKiBpcyBpbnZva2VkIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIENTUyBzZWxlY3RvcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHJldHVybiB7Tm9kZUxpc3R9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvckFsbCA9IGN1cnJ5KGZ1bmN0aW9uIChzZWxlY3RvciwgZWwpIHtcclxuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCIvKipcclxuICogQHBhcmFtICB7c3RyaW5nfSAgIGNvbmZpZy50eXBlICAgICAgICAgdHlwZSBvZiB0aGUgbWVzc2FnZTogaW5mbywgc3VjY2VzcywgZXJyb3JcclxuICogQHBhcmFtICB7Ym9vbGVhbn0gIGNvbmZpZy5kaXNtaXNzaWJsZSAgd2hldGhlciB0aGUgbWVzc2FnZSBjYW4gYmUgZGlzbWlzc2VkXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcuY29udGVudCAgICAgIG1lc3NhZ2UgY29udGVudCB1c3VhbGx5IGEgJ2gzJyBhbmQgYSAncCdcclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9IGRpdiBjb250YWluaW5nIHRoZSBtZXNzYWdlIGVsZW1lbnRcclxuICovXHJcblxyXG4vL1RPRE8gaGFuZGxlIHN0cmluZ3MsIGh0bWwsIGJhZGx5IGZvcm1lZCBvYmplY3RcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyRXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XHJcbiAgY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyYjeDI3MTUnO1xyXG5cclxuICBjb25zdCBtZXNzYWdlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIG1lc3NhZ2VDb250ZW50LmNsYXNzTmFtZSA9ICdtZXNzYWdlLWNvbnRlbnQnO1xyXG4gIG1lc3NhZ2VDb250ZW50LmlubmVySFRNTCA9ICc8aDE+JyArIG1lc3NhZ2UudGl0bGUgKyAnPC9oMT4nICsgJzxwPicgKyBtZXNzYWdlLmNvbnRlbnQgKyAnPC9wPic7XHJcblxyXG4gIGNvbnN0IG1lc3NhZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbWVzc2FnZVdyYXBwZXIuY2xhc3NOYW1lID0gJ21lc3NhZ2UnICsgJyAnICsgYCR7bWVzc2FnZS50eXBlfWAgKyAobWVzc2FnZS5kaXNtaXNzaWJsZSA/ICcgZGlzbWlzc2libGUnIDogJycpO1xyXG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcclxuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGVudCk7XHJcblxyXG4gIGlmIChtZXNzYWdlLmJ1dHRvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBtZXNzYWdlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24nO1xyXG4gICAgbWVzc2FnZUJ1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlLmJ1dHRvbjtcclxuICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VCdXR0b24pO1xyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2cobWVzc2FnZVdyYXBwZXIpO1xyXG4gIHJldHVybiBtZXNzYWdlV3JhcHBlcjtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXJyb3JzLmpzIiwiLyoqXHJcbiAqIEB0eXBlZGVmIHtvYmplY3R9IENvbnRlbnRUeXBlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpZFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGl0bGVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN1bW1hcnlcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGRlc2NyaXB0aW9uXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpY29uXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjcmVhdGVkXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVcclxuICogQHByb3BlcnR5IHtib29sZWFufSByZWNvbW1lbmRlZFxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gdGltZXNEb3dubG9hZGVkXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IHNjcmVlbnNob3RzXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBleGFtcGxlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGtleXdvcmRzXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGNhdGVnb3JpZXNcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxpY2Vuc2VcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFwaVJvb3RVcmxcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih7IGFwaVJvb3RVcmwgfSkge1xyXG4gICAgdGhpcy5hcGlSb290VXJsID0gYXBpUm9vdFVybDtcclxuXHJcbiAgICBpZighd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyl7XHJcbiAgICAgIC8vIFRPRE8gcmVtb3ZlIHRoaXMgd2hlbiBkb25lIHRlc3RpbmcgZm9yIGVycm9yc1xyXG4gICAgICAvLyB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWVycm9ycy9OT19SRVNQT05TRS5qc29uYCwge1xyXG5cclxuICAgICAgd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50LXR5cGUtY2FjaGVgLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxyXG4gICAgICAudGhlbih0aGlzLmlzVmFsaWQpXHJcbiAgICAgIC50aGVuKGpzb24gPT4ganNvbi5saWJyYXJpZXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtDb250ZW50VHlwZVtdfEVycm9yTWVzc2FnZX0gcmVzcG9uc2VcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cclxuICAgKi9cclxuICBpc1ZhbGlkKHJlc3BvbnNlKSB7XHJcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlW10+fVxyXG4gICAqL1xyXG4gIGNvbnRlbnRUeXBlcygpIHtcclxuICAgIHJldHVybiB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XHJcbiAgICovXHJcbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcclxuICAgIHJldHVybiB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzLnRoZW4oY29udGVudFR5cGVzID0+IHtcclxuICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50X3R5cGVfY2FjaGUvJHtpZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcclxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpOyovXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnN0YWxscyBhIGNvbnRlbnQgdHlwZSBvbiB0aGUgc2VydmVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cclxuICAgKi9cclxuICBpbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9bGlicmFyeS1pbnN0YWxsP2lkPSR7aWR9YCwge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcclxuICAgICAgYm9keTogJydcclxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItc2VydmljZXMuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XHJcblxyXG5leHBvcnQgY29uc3QgcmVsYXlDbGlja0V2ZW50QXMgPSBjdXJyeShmdW5jdGlvbih0eXBlLCBldmVudGZ1bCwgZWxlbWVudCkge1xyXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICBldmVudGZ1bC5maXJlKHR5cGUsIHtcclxuICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgaWQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJylcclxuICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZWxlbWVudDtcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGUsIGF0dHJpYnV0ZUVxdWFscywgdG9nZ2xlQXR0cmlidXRlfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XHJcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IGlzRXhwYW5kZWQgPSBhdHRyaWJ1dGVFcXVhbHMoXCJhcmlhLWV4cGFuZGVkXCIsICd0cnVlJyk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKi9cclxuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyB0aGUgYm9keSB2aXNpYmlsaXR5XHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJvZHlFbGVtZW50XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNFeHBhbmRlZFxyXG4gKi9cclxuY29uc3QgdG9nZ2xlQm9keVZpc2liaWxpdHkgPSBmdW5jdGlvbihib2R5RWxlbWVudCwgaXNFeHBhbmRlZCkge1xyXG4gIGlmKCFpc0V4cGFuZGVkKSB7XHJcbiAgICBoaWRlKGJvZHlFbGVtZW50KTtcclxuICAgIC8vYm9keUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XHJcbiAgfVxyXG4gIGVsc2UgLyppZihib2R5RWxlbWVudC5zY3JvbGxIZWlnaHQgPiAwKSovIHtcclxuICAgIHNob3coYm9keUVsZW1lbnQpO1xyXG4gICAgLy9ib2R5RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtib2R5RWxlbWVudC5zY3JvbGxIZWlnaHR9cHhgO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIGNoYW5nZXMgdG8gYXJpYS1leHBhbmRlZFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBib2R5RWxlbWVudFxyXG4gKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBldmVudFxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IG9uQXJpYUV4cGFuZGVkQ2hhbmdlID0gY3VycnkoZnVuY3Rpb24oYm9keUVsZW1lbnQsIGV2ZW50KSB7XHJcbiAgdG9nZ2xlQm9keVZpc2liaWxpdHkoYm9keUVsZW1lbnQsIGlzRXhwYW5kZWQoZXZlbnQudGFyZ2V0KSk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xyXG4gIGNvbnN0IHRpdGxlRWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWV4cGFuZGVkXScpO1xyXG4gIGNvbnN0IGJvZHlJZCA9IHRpdGxlRWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XHJcbiAgY29uc3QgYm9keUVsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2R5SWR9YCk7XHJcblxyXG4gIGlmKHRpdGxlRWwpIHtcclxuICAgIC8vIHNldCBvYnNlcnZlciBvbiB0aXRsZSBmb3IgYXJpYS1leHBhbmRlZFxyXG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZm9yRWFjaChvbkFyaWFFeHBhbmRlZENoYW5nZShib2R5RWwpKSk7XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0aXRsZUVsLCB7XHJcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxyXG4gICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcImFyaWEtZXhwYW5kZWRcIl1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNldCBjbGljayBsaXN0ZW5lciB0aGF0IHRvZ2dsZXMgYXJpYS1leHBhbmRlZFxyXG4gICAgdGl0bGVFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHRvZ2dsZUF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgZXZlbnQudGFyZ2V0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRvZ2dsZUJvZHlWaXNpYmlsaXR5KGJvZHlFbCwgaXNFeHBhbmRlZCh0aXRsZUVsKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZWxlbWVudDtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsImltcG9ydCBIdWJWaWV3IGZyb20gJy4vaHViLXZpZXcnO1xyXG5pbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uIGZyb20gJy4vY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24nO1xyXG5pbXBvcnQgVXBsb2FkU2VjdGlvbiBmcm9tICcuL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uJztcclxuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4vaHViLXNlcnZpY2VzJztcclxuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XHJcbmltcG9ydCB7cmVuZGVyRXJyb3JNZXNzYWdlfSBmcm9tICcuL3V0aWxzL2Vycm9ycyc7XHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBIdWJTdGF0ZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGl0bGVcclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb25JZFxyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGV4cGFuZGVkXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhcGlSb290VXJsXHJcbiAqL1xyXG4vKipcclxuICogQHR5cGVkZWYge29iamVjdH0gRXJyb3JNZXNzYWdlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXNzYWdlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlcnJvckNvZGVcclxuICovXHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBTZWxlY3RlZEVsZW1lbnRcclxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRcclxuICovXHJcbi8qKlxyXG4gKiBTZWxlY3QgZXZlbnRcclxuICogQGV2ZW50IEh1YiNzZWxlY3RcclxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cclxuICovXHJcbi8qKlxyXG4gKiBFcnJvciBldmVudFxyXG4gKiBAZXZlbnQgSHViI2Vycm9yXHJcbiAqIEB0eXBlIHtFcnJvck1lc3NhZ2V9XHJcbiAqL1xyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxyXG4gKiBAZmlyZXMgSHViI2Vycm9yXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWIge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgLy8gY29udHJvbGxlcnNcclxuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uID0gbmV3IENvbnRlbnRUeXBlU2VjdGlvbihzdGF0ZSk7XHJcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSk7XHJcblxyXG4gICAgLy8gdmlld3NcclxuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcclxuXHJcbiAgICAvLyBzZXJ2aWNlc1xyXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XHJcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHByb3BhZ2F0ZSBjb250cm9sbGVyIGV2ZW50c1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAnZXJyb3InXSwgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24pO1xyXG5cclxuICAgIC8vIGhhbmRsZSBldmVudHNcclxuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMuc2V0UGFuZWxUaXRsZSwgdGhpcyk7XHJcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnZpZXcuY2xvc2VQYW5lbCwgdGhpcy52aWV3KTtcclxuICAgIC8vIG9ubHkgaW5pdGlhbGl6ZSB0aGUgbWFpbiBwYW5lbCBpZiBubyBlcnJvcnMgaGF2ZSBvY2N1cmVkIHdoZW4gdXBkYXRpbmcgdGhlIGNvbnRlbnQgdHlwZSBsaXN0XHJcbiAgICB0aGlzLnZpZXcub24oJ3RhYi1jaGFuZ2UnLCB0aGlzLnZpZXcuc2V0U2VjdGlvblR5cGUsIHRoaXMudmlldyk7XHJcbiAgICB0aGlzLnZpZXcub24oJ3BhbmVsLWNoYW5nZScsIHRoaXMudmlldy50b2dnbGVQYW5lbE9wZW4uYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24ub24oJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHRoaXMudmlldy5pbml0aWFsaXplUGFuZWwuYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xyXG5cclxuICAgIHRoaXMuaW5pdFRhYlBhbmVsKClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBjb250ZW50IHR5cGVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XHJcbiAgICovXHJcbiAgZ2V0Q29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHRpdGxlIG9mIHRoZSBwYW5lbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICovXHJcbiAgc2V0UGFuZWxUaXRsZSh7aWR9KcKge1xyXG4gICAgdGhpcy5nZXRDb250ZW50VHlwZShpZCkudGhlbigoe3RpdGxlfSkgPT4gdGhpcy52aWV3LnNldFRpdGxlKHRpdGxlKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWF0ZXMgdGhlIHRhYiBwYW5lbFxyXG4gICAqL1xyXG4gIGluaXRUYWJQYW5lbCgpIHtcclxuICAgIGNvbnN0IHRhYkNvbmZpZ3MgPSBbe1xyXG4gICAgICB0aXRsZTogJ0NyZWF0ZSBDb250ZW50JyxcclxuICAgICAgaWQ6ICdjb250ZW50LXR5cGVzJyxcclxuICAgICAgY29udGVudDogdGhpcy5jb250ZW50VHlwZVNlY3Rpb24uZ2V0RWxlbWVudCgpLFxyXG4gICAgICBzZWxlY3RlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdVcGxvYWQnLFxyXG4gICAgICBpZDogJ3VwbG9hZCcsXHJcbiAgICAgIGNvbnRlbnQ6IHRoaXMudXBsb2FkU2VjdGlvbi5nZXRFbGVtZW50KClcclxuICAgIH1dO1xyXG5cclxuICAgIHRhYkNvbmZpZ3MuZm9yRWFjaCh0YWJDb25maWcgPT4gdGhpcy52aWV3LmFkZFRhYih0YWJDb25maWcpKTtcclxuICAgIHRoaXMudmlldy5pbml0VGFiUGFuZWwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBpbiB0aGUgdmlld1xyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWIuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBsdW5yIC0gaHR0cDovL2x1bnJqcy5jb20gLSBBIGJpdCBsaWtlIFNvbHIsIGJ1dCBtdWNoIHNtYWxsZXIgYW5kIG5vdCBhcyBicmlnaHQgLSAxLjAuMFxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuOyhmdW5jdGlvbigpe1xuXG4vKipcbiAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBpbnN0YW50aWF0aW5nIGEgbmV3IGx1bnIgaW5kZXggYW5kIGNvbmZpZ3VyaW5nIGl0XG4gKiB3aXRoIHRoZSBkZWZhdWx0IHBpcGVsaW5lIGZ1bmN0aW9ucyBhbmQgdGhlIHBhc3NlZCBjb25maWcgZnVuY3Rpb24uXG4gKlxuICogV2hlbiB1c2luZyB0aGlzIGNvbnZlbmllbmNlIGZ1bmN0aW9uIGEgbmV3IGluZGV4IHdpbGwgYmUgY3JlYXRlZCB3aXRoIHRoZVxuICogZm9sbG93aW5nIGZ1bmN0aW9ucyBhbHJlYWR5IGluIHRoZSBwaXBlbGluZTpcbiAqXG4gKiBsdW5yLlN0b3BXb3JkRmlsdGVyIC0gZmlsdGVycyBvdXQgYW55IHN0b3Agd29yZHMgYmVmb3JlIHRoZXkgZW50ZXIgdGhlXG4gKiBpbmRleFxuICpcbiAqIGx1bnIuc3RlbW1lciAtIHN0ZW1zIHRoZSB0b2tlbnMgYmVmb3JlIGVudGVyaW5nIHRoZSBpbmRleC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICB2YXIgaWR4ID0gbHVucihmdW5jdGlvbiAoKSB7XG4gKiAgICAgICB0aGlzLmZpZWxkKCd0aXRsZScsIDEwKVxuICogICAgICAgdGhpcy5maWVsZCgndGFncycsIDEwMClcbiAqICAgICAgIHRoaXMuZmllbGQoJ2JvZHknKVxuICogICAgICAgXG4gKiAgICAgICB0aGlzLnJlZignY2lkJylcbiAqICAgICAgIFxuICogICAgICAgdGhpcy5waXBlbGluZS5hZGQoZnVuY3Rpb24gKCkge1xuICogICAgICAgICAvLyBzb21lIGN1c3RvbSBwaXBlbGluZSBmdW5jdGlvblxuICogICAgICAgfSlcbiAqICAgICAgIFxuICogICAgIH0pXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uZmlnIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBuZXcgaW5zdGFuY2VcbiAqIG9mIHRoZSBsdW5yLkluZGV4IGFzIGJvdGggaXRzIGNvbnRleHQgYW5kIGZpcnN0IHBhcmFtZXRlci4gSXQgY2FuIGJlIHVzZWQgdG9cbiAqIGN1c3RvbWl6ZSB0aGUgaW5zdGFuY2Ugb2YgbmV3IGx1bnIuSW5kZXguXG4gKiBAbmFtZXNwYWNlXG4gKiBAbW9kdWxlXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqXG4gKi9cbnZhciBsdW5yID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICB2YXIgaWR4ID0gbmV3IGx1bnIuSW5kZXhcblxuICBpZHgucGlwZWxpbmUuYWRkKFxuICAgIGx1bnIudHJpbW1lcixcbiAgICBsdW5yLnN0b3BXb3JkRmlsdGVyLFxuICAgIGx1bnIuc3RlbW1lclxuICApXG5cbiAgaWYgKGNvbmZpZykgY29uZmlnLmNhbGwoaWR4LCBpZHgpXG5cbiAgcmV0dXJuIGlkeFxufVxuXG5sdW5yLnZlcnNpb24gPSBcIjEuMC4wXCJcbi8qIVxuICogbHVuci51dGlsc1xuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogQSBuYW1lc3BhY2UgY29udGFpbmluZyB1dGlscyBmb3IgdGhlIHJlc3Qgb2YgdGhlIGx1bnIgbGlicmFyeVxuICovXG5sdW5yLnV0aWxzID0ge31cblxuLyoqXG4gKiBQcmludCBhIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgY29uc29sZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBiZSBwcmludGVkLlxuICogQG1lbWJlck9mIFV0aWxzXG4gKi9cbmx1bnIudXRpbHMud2FybiA9IChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIGlmIChnbG9iYWwuY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKVxuICAgIH1cbiAgfVxufSkodGhpcylcblxuLyoqXG4gKiBDb252ZXJ0IGFuIG9iamVjdCB0byBhIHN0cmluZy5cbiAqXG4gKiBJbiB0aGUgY2FzZSBvZiBgbnVsbGAgYW5kIGB1bmRlZmluZWRgIHRoZSBmdW5jdGlvbiByZXR1cm5zXG4gKiB0aGUgZW1wdHkgc3RyaW5nLCBpbiBhbGwgb3RoZXIgY2FzZXMgdGhlIHJlc3VsdCBvZiBjYWxsaW5nXG4gKiBgdG9TdHJpbmdgIG9uIHRoZSBwYXNzZWQgb2JqZWN0IGlzIHJldHVybmVkLlxuICpcbiAqIEBwYXJhbSB7QW55fSBvYmogVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGEgc3RyaW5nLlxuICogQHJldHVybiB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHBhc3NlZCBvYmplY3QuXG4gKiBAbWVtYmVyT2YgVXRpbHNcbiAqL1xubHVuci51dGlscy5hc1N0cmluZyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKG9iaiA9PT0gdm9pZCAwIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIlwiXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iai50b1N0cmluZygpXG4gIH1cbn1cbi8qIVxuICogbHVuci5FdmVudEVtaXR0ZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuRXZlbnRFbWl0dGVyIGlzIGFuIGV2ZW50IGVtaXR0ZXIgZm9yIGx1bnIuIEl0IG1hbmFnZXMgYWRkaW5nIGFuZCByZW1vdmluZyBldmVudCBoYW5kbGVycyBhbmQgdHJpZ2dlcmluZyBldmVudHMgYW5kIHRoZWlyIGhhbmRsZXJzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLkV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5ldmVudHMgPSB7fVxufVxuXG4vKipcbiAqIEJpbmRzIGEgaGFuZGxlciBmdW5jdGlvbiB0byBhIHNwZWNpZmljIGV2ZW50KHMpLlxuICpcbiAqIENhbiBiaW5kIGEgc2luZ2xlIGZ1bmN0aW9uIHRvIG1hbnkgZGlmZmVyZW50IGV2ZW50cyBpbiBvbmUgY2FsbC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gW2V2ZW50TmFtZV0gVGhlIG5hbWUocykgb2YgZXZlbnRzIHRvIGJpbmQgdGhpcyBmdW5jdGlvbiB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gYW4gZXZlbnQgaXMgZmlyZWQuXG4gKiBAbWVtYmVyT2YgRXZlbnRFbWl0dGVyXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLFxuICAgICAgZm4gPSBhcmdzLnBvcCgpLFxuICAgICAgbmFtZXMgPSBhcmdzXG5cbiAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yIChcImxhc3QgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpXG5cbiAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmICghdGhpcy5oYXNIYW5kbGVyKG5hbWUpKSB0aGlzLmV2ZW50c1tuYW1lXSA9IFtdXG4gICAgdGhpcy5ldmVudHNbbmFtZV0ucHVzaChmbilcbiAgfSwgdGhpcylcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgaGFuZGxlciBmdW5jdGlvbiBmcm9tIGEgc3BlY2lmaWMgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIHRoaXMgZnVuY3Rpb24gZnJvbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byByZW1vdmUgZnJvbSBhbiBldmVudC5cbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gIGlmICghdGhpcy5oYXNIYW5kbGVyKG5hbWUpKSByZXR1cm5cblxuICB2YXIgZm5JbmRleCA9IHRoaXMuZXZlbnRzW25hbWVdLmluZGV4T2YoZm4pXG4gIHRoaXMuZXZlbnRzW25hbWVdLnNwbGljZShmbkluZGV4LCAxKVxuXG4gIGlmICghdGhpcy5ldmVudHNbbmFtZV0ubGVuZ3RoKSBkZWxldGUgdGhpcy5ldmVudHNbbmFtZV1cbn1cblxuLyoqXG4gKiBDYWxscyBhbGwgZnVuY3Rpb25zIGJvdW5kIHRvIHRoZSBnaXZlbiBldmVudC5cbiAqXG4gKiBBZGRpdGlvbmFsIGRhdGEgY2FuIGJlIHBhc3NlZCB0byB0aGUgZXZlbnQgaGFuZGxlciBhcyBhcmd1bWVudHMgdG8gYGVtaXRgXG4gKiBhZnRlciB0aGUgZXZlbnQgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBlbWl0LlxuICogQG1lbWJlck9mIEV2ZW50RW1pdHRlclxuICovXG5sdW5yLkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghdGhpcy5oYXNIYW5kbGVyKG5hbWUpKSByZXR1cm5cblxuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcblxuICB0aGlzLmV2ZW50c1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncylcbiAgfSlcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciBhIGhhbmRsZXIgaGFzIGV2ZXIgYmVlbiBzdG9yZWQgYWdhaW5zdCBhbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBjaGVjay5cbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgRXZlbnRFbWl0dGVyXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5oYXNIYW5kbGVyID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUgaW4gdGhpcy5ldmVudHNcbn1cblxuLyohXG4gKiBsdW5yLnRva2VuaXplclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogQSBmdW5jdGlvbiBmb3Igc3BsaXR0aW5nIGEgc3RyaW5nIGludG8gdG9rZW5zIHJlYWR5IHRvIGJlIGluc2VydGVkIGludG9cbiAqIHRoZSBzZWFyY2ggaW5kZXguIFVzZXMgYGx1bnIudG9rZW5pemVyLnNlcGFyYXRvcmAgdG8gc3BsaXQgc3RyaW5ncywgY2hhbmdlXG4gKiB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSB0byBjaGFuZ2UgaG93IHN0cmluZ3MgYXJlIHNwbGl0IGludG8gdG9rZW5zLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmogVGhlIHN0cmluZyB0byBjb252ZXJ0IGludG8gdG9rZW5zXG4gKiBAc2VlIGx1bnIudG9rZW5pemVyLnNlcGFyYXRvclxuICogQHJldHVybnMge0FycmF5fVxuICovXG5sdW5yLnRva2VuaXplciA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoIHx8IG9iaiA9PSBudWxsIHx8IG9iaiA9PSB1bmRlZmluZWQpIHJldHVybiBbXVxuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSByZXR1cm4gb2JqLm1hcChmdW5jdGlvbiAodCkgeyByZXR1cm4gbHVuci51dGlscy5hc1N0cmluZyh0KS50b0xvd2VyQ2FzZSgpIH0pXG5cbiAgcmV0dXJuIG9iai50b1N0cmluZygpLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnNwbGl0KGx1bnIudG9rZW5pemVyLnNlcGFyYXRvcilcbn1cblxuLyoqXG4gKiBUaGUgc3BlcmF0b3IgdXNlZCB0byBzcGxpdCBhIHN0cmluZyBpbnRvIHRva2Vucy4gT3ZlcnJpZGUgdGhpcyBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIGJlaGF2aW91ciBvZlxuICogYGx1bnIudG9rZW5pemVyYCBiZWhhdmlvdXIgd2hlbiB0b2tlbml6aW5nIHN0cmluZ3MuIEJ5IGRlZmF1bHQgdGhpcyBzcGxpdHMgb24gd2hpdGVzcGFjZSBhbmQgaHlwaGVucy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2VlIGx1bnIudG9rZW5pemVyXG4gKi9cbmx1bnIudG9rZW5pemVyLnNlcGFyYXRvciA9IC9bXFxzXFwtXSsvXG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgdG9rZW5pemVyLlxuICpcbiAqIEEgdG9rZW5pemVyIGZ1bmN0aW9uIHRvIGJlIGxvYWRlZCBtdXN0IGFscmVhZHkgYmUgcmVnaXN0ZXJlZCB3aXRoIGx1bnIudG9rZW5pemVyLlxuICogSWYgdGhlIHNlcmlhbGlzZWQgdG9rZW5pemVyIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkIHRoZW4gYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIFRoZSBsYWJlbCBvZiB0aGUgc2VyaWFsaXNlZCB0b2tlbml6ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKiBAbWVtYmVyT2YgdG9rZW5pemVyXG4gKi9cbmx1bnIudG9rZW5pemVyLmxvYWQgPSBmdW5jdGlvbiAobGFiZWwpIHtcbiAgdmFyIGZuID0gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zW2xhYmVsXVxuXG4gIGlmICghZm4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBsb2FkIHVuLXJlZ2lzdGVyZWQgZnVuY3Rpb246ICcgKyBsYWJlbClcbiAgfVxuXG4gIHJldHVybiBmblxufVxuXG5sdW5yLnRva2VuaXplci5sYWJlbCA9ICdkZWZhdWx0J1xuXG5sdW5yLnRva2VuaXplci5yZWdpc3RlcmVkRnVuY3Rpb25zID0ge1xuICAnZGVmYXVsdCc6IGx1bnIudG9rZW5pemVyXG59XG5cbi8qKlxuICogUmVnaXN0ZXIgYSB0b2tlbml6ZXIgZnVuY3Rpb24uXG4gKlxuICogRnVuY3Rpb25zIHRoYXQgYXJlIHVzZWQgYXMgdG9rZW5pemVycyBzaG91bGQgYmUgcmVnaXN0ZXJlZCBpZiB0aGV5IGFyZSB0byBiZSB1c2VkIHdpdGggYSBzZXJpYWxpc2VkIGluZGV4LlxuICpcbiAqIFJlZ2lzdGVyaW5nIGEgZnVuY3Rpb24gZG9lcyBub3QgYWRkIGl0IHRvIGFuIGluZGV4LCBmdW5jdGlvbnMgbXVzdCBzdGlsbCBiZSBhc3NvY2lhdGVkIHdpdGggYSBzcGVjaWZpYyBpbmRleCBmb3IgdGhlbSB0byBiZSB1c2VkIHdoZW4gaW5kZXhpbmcgYW5kIHNlYXJjaGluZyBkb2N1bWVudHMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJlZ2lzdGVyLlxuICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIFRoZSBsYWJlbCB0byByZWdpc3RlciB0aGlzIGZ1bmN0aW9uIHdpdGhcbiAqIEBtZW1iZXJPZiB0b2tlbml6ZXJcbiAqL1xubHVuci50b2tlbml6ZXIucmVnaXN0ZXJGdW5jdGlvbiA9IGZ1bmN0aW9uIChmbiwgbGFiZWwpIHtcbiAgaWYgKGxhYmVsIGluIHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9ucykge1xuICAgIGx1bnIudXRpbHMud2FybignT3ZlcndyaXRpbmcgZXhpc3RpbmcgdG9rZW5pemVyOiAnICsgbGFiZWwpXG4gIH1cblxuICBmbi5sYWJlbCA9IGxhYmVsXG4gIHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9uc1tsYWJlbF0gPSBmblxufVxuLyohXG4gKiBsdW5yLlBpcGVsaW5lXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlBpcGVsaW5lcyBtYWludGFpbiBhbiBvcmRlcmVkIGxpc3Qgb2YgZnVuY3Rpb25zIHRvIGJlIGFwcGxpZWQgdG8gYWxsXG4gKiB0b2tlbnMgaW4gZG9jdW1lbnRzIGVudGVyaW5nIHRoZSBzZWFyY2ggaW5kZXggYW5kIHF1ZXJpZXMgYmVpbmcgcmFuIGFnYWluc3RcbiAqIHRoZSBpbmRleC5cbiAqXG4gKiBBbiBpbnN0YW5jZSBvZiBsdW5yLkluZGV4IGNyZWF0ZWQgd2l0aCB0aGUgbHVuciBzaG9ydGN1dCB3aWxsIGNvbnRhaW4gYVxuICogcGlwZWxpbmUgd2l0aCBhIHN0b3Agd29yZCBmaWx0ZXIgYW5kIGFuIEVuZ2xpc2ggbGFuZ3VhZ2Ugc3RlbW1lci4gRXh0cmFcbiAqIGZ1bmN0aW9ucyBjYW4gYmUgYWRkZWQgYmVmb3JlIG9yIGFmdGVyIGVpdGhlciBvZiB0aGVzZSBmdW5jdGlvbnMgb3IgdGhlc2VcbiAqIGRlZmF1bHQgZnVuY3Rpb25zIGNhbiBiZSByZW1vdmVkLlxuICpcbiAqIFdoZW4gcnVuIHRoZSBwaXBlbGluZSB3aWxsIGNhbGwgZWFjaCBmdW5jdGlvbiBpbiB0dXJuLCBwYXNzaW5nIGEgdG9rZW4sIHRoZVxuICogaW5kZXggb2YgdGhhdCB0b2tlbiBpbiB0aGUgb3JpZ2luYWwgbGlzdCBvZiBhbGwgdG9rZW5zIGFuZCBmaW5hbGx5IGEgbGlzdCBvZlxuICogYWxsIHRoZSBvcmlnaW5hbCB0b2tlbnMuXG4gKlxuICogVGhlIG91dHB1dCBvZiBmdW5jdGlvbnMgaW4gdGhlIHBpcGVsaW5lIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBuZXh0IGZ1bmN0aW9uXG4gKiBpbiB0aGUgcGlwZWxpbmUuIFRvIGV4Y2x1ZGUgYSB0b2tlbiBmcm9tIGVudGVyaW5nIHRoZSBpbmRleCB0aGUgZnVuY3Rpb25cbiAqIHNob3VsZCByZXR1cm4gdW5kZWZpbmVkLCB0aGUgcmVzdCBvZiB0aGUgcGlwZWxpbmUgd2lsbCBub3QgYmUgY2FsbGVkIHdpdGhcbiAqIHRoaXMgdG9rZW4uXG4gKlxuICogRm9yIHNlcmlhbGlzYXRpb24gb2YgcGlwZWxpbmVzIHRvIHdvcmssIGFsbCBmdW5jdGlvbnMgdXNlZCBpbiBhbiBpbnN0YW5jZSBvZlxuICogYSBwaXBlbGluZSBzaG91bGQgYmUgcmVnaXN0ZXJlZCB3aXRoIGx1bnIuUGlwZWxpbmUuIFJlZ2lzdGVyZWQgZnVuY3Rpb25zIGNhblxuICogdGhlbiBiZSBsb2FkZWQuIElmIHRyeWluZyB0byBsb2FkIGEgc2VyaWFsaXNlZCBwaXBlbGluZSB0aGF0IHVzZXMgZnVuY3Rpb25zXG4gKiB0aGF0IGFyZSBub3QgcmVnaXN0ZXJlZCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBJZiBub3QgcGxhbm5pbmcgb24gc2VyaWFsaXNpbmcgdGhlIHBpcGVsaW5lIHRoZW4gcmVnaXN0ZXJpbmcgcGlwZWxpbmUgZnVuY3Rpb25zXG4gKiBpcyBub3QgbmVjZXNzYXJ5LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlBpcGVsaW5lID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9zdGFjayA9IFtdXG59XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJlZEZ1bmN0aW9ucyA9IHt9XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBmdW5jdGlvbiB3aXRoIHRoZSBwaXBlbGluZS5cbiAqXG4gKiBGdW5jdGlvbnMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgcGlwZWxpbmUgc2hvdWxkIGJlIHJlZ2lzdGVyZWQgaWYgdGhlIHBpcGVsaW5lXG4gKiBuZWVkcyB0byBiZSBzZXJpYWxpc2VkLCBvciBhIHNlcmlhbGlzZWQgcGlwZWxpbmUgbmVlZHMgdG8gYmUgbG9hZGVkLlxuICpcbiAqIFJlZ2lzdGVyaW5nIGEgZnVuY3Rpb24gZG9lcyBub3QgYWRkIGl0IHRvIGEgcGlwZWxpbmUsIGZ1bmN0aW9ucyBtdXN0IHN0aWxsIGJlXG4gKiBhZGRlZCB0byBpbnN0YW5jZXMgb2YgdGhlIHBpcGVsaW5lIGZvciB0aGVtIHRvIGJlIHVzZWQgd2hlbiBydW5uaW5nIGEgcGlwZWxpbmUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIGZvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBUaGUgbGFiZWwgdG8gcmVnaXN0ZXIgdGhpcyBmdW5jdGlvbiB3aXRoXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uID0gZnVuY3Rpb24gKGZuLCBsYWJlbCkge1xuICBpZiAobGFiZWwgaW4gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdPdmVyd3JpdGluZyBleGlzdGluZyByZWdpc3RlcmVkIGZ1bmN0aW9uOiAnICsgbGFiZWwpXG4gIH1cblxuICBmbi5sYWJlbCA9IGxhYmVsXG4gIGx1bnIuUGlwZWxpbmUucmVnaXN0ZXJlZEZ1bmN0aW9uc1tmbi5sYWJlbF0gPSBmblxufVxuXG4vKipcbiAqIFdhcm5zIGlmIHRoZSBmdW5jdGlvbiBpcyBub3QgcmVnaXN0ZXJlZCBhcyBhIFBpcGVsaW5lIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjaGVjayBmb3IuXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBpc1JlZ2lzdGVyZWQgPSBmbi5sYWJlbCAmJiAoZm4ubGFiZWwgaW4gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zKVxuXG4gIGlmICghaXNSZWdpc3RlcmVkKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdGdW5jdGlvbiBpcyBub3QgcmVnaXN0ZXJlZCB3aXRoIHBpcGVsaW5lLiBUaGlzIG1heSBjYXVzZSBwcm9ibGVtcyB3aGVuIHNlcmlhbGlzaW5nIHRoZSBpbmRleC5cXG4nLCBmbilcbiAgfVxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHBpcGVsaW5lLlxuICpcbiAqIEFsbCBmdW5jdGlvbnMgdG8gYmUgbG9hZGVkIG11c3QgYWxyZWFkeSBiZSByZWdpc3RlcmVkIHdpdGggbHVuci5QaXBlbGluZS5cbiAqIElmIGFueSBmdW5jdGlvbiBmcm9tIHRoZSBzZXJpYWxpc2VkIGRhdGEgaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQgdGhlbiBhblxuICogZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWQgVGhlIHNlcmlhbGlzZWQgcGlwZWxpbmUgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLlBpcGVsaW5lfVxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkKSB7XG4gIHZhciBwaXBlbGluZSA9IG5ldyBsdW5yLlBpcGVsaW5lXG5cbiAgc2VyaWFsaXNlZC5mb3JFYWNoKGZ1bmN0aW9uIChmbk5hbWUpIHtcbiAgICB2YXIgZm4gPSBsdW5yLlBpcGVsaW5lLnJlZ2lzdGVyZWRGdW5jdGlvbnNbZm5OYW1lXVxuXG4gICAgaWYgKGZuKSB7XG4gICAgICBwaXBlbGluZS5hZGQoZm4pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGxvYWQgdW4tcmVnaXN0ZXJlZCBmdW5jdGlvbjogJyArIGZuTmFtZSlcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHBpcGVsaW5lXG59XG5cbi8qKlxuICogQWRkcyBuZXcgZnVuY3Rpb25zIHRvIHRoZSBlbmQgb2YgdGhlIHBpcGVsaW5lLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jdGlvbnMgQW55IG51bWJlciBvZiBmdW5jdGlvbnMgdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBmbnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXG5cbiAgZm5zLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQoZm4pXG4gICAgdGhpcy5fc3RhY2sucHVzaChmbilcbiAgfSwgdGhpcylcbn1cblxuLyoqXG4gKiBBZGRzIGEgc2luZ2xlIGZ1bmN0aW9uIGFmdGVyIGEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGVcbiAqIHBpcGVsaW5lLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGlzdGluZ0ZuIEEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgcGlwZWxpbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXdGbiBUaGUgbmV3IGZ1bmN0aW9uIHRvIGFkZCB0byB0aGUgcGlwZWxpbmUuXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUuYWZ0ZXIgPSBmdW5jdGlvbiAoZXhpc3RpbmdGbiwgbmV3Rm4pIHtcbiAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQobmV3Rm4pXG5cbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZXhpc3RpbmdGbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgZXhpc3RpbmdGbicpXG4gIH1cblxuICBwb3MgPSBwb3MgKyAxXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDAsIG5ld0ZuKVxufVxuXG4vKipcbiAqIEFkZHMgYSBzaW5nbGUgZnVuY3Rpb24gYmVmb3JlIGEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGVcbiAqIHBpcGVsaW5lLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGlzdGluZ0ZuIEEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgcGlwZWxpbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXdGbiBUaGUgbmV3IGZ1bmN0aW9uIHRvIGFkZCB0byB0aGUgcGlwZWxpbmUuXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUuYmVmb3JlID0gZnVuY3Rpb24gKGV4aXN0aW5nRm4sIG5ld0ZuKSB7XG4gIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKG5ld0ZuKVxuXG4gIHZhciBwb3MgPSB0aGlzLl9zdGFjay5pbmRleE9mKGV4aXN0aW5nRm4pXG4gIGlmIChwb3MgPT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIGV4aXN0aW5nRm4nKVxuICB9XG5cbiAgdGhpcy5fc3RhY2suc3BsaWNlKHBvcywgMCwgbmV3Rm4pXG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGZ1bmN0aW9uIGZyb20gdGhlIHBpcGVsaW5lLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byByZW1vdmUgZnJvbSB0aGUgcGlwZWxpbmUuXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBwb3MgPSB0aGlzLl9zdGFjay5pbmRleE9mKGZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAxKVxufVxuXG4vKipcbiAqIFJ1bnMgdGhlIGN1cnJlbnQgbGlzdCBvZiBmdW5jdGlvbnMgdGhhdCBtYWtlIHVwIHRoZSBwaXBlbGluZSBhZ2FpbnN0IHRoZVxuICogcGFzc2VkIHRva2Vucy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB0b2tlbnMgVGhlIHRva2VucyB0byBydW4gdGhyb3VnaCB0aGUgcGlwZWxpbmUuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHRva2Vucykge1xuICB2YXIgb3V0ID0gW10sXG4gICAgICB0b2tlbkxlbmd0aCA9IHRva2Vucy5sZW5ndGgsXG4gICAgICBzdGFja0xlbmd0aCA9IHRoaXMuX3N0YWNrLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5MZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXVxuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBzdGFja0xlbmd0aDsgaisrKSB7XG4gICAgICB0b2tlbiA9IHRoaXMuX3N0YWNrW2pdKHRva2VuLCBpLCB0b2tlbnMpXG4gICAgICBpZiAodG9rZW4gPT09IHZvaWQgMCB8fCB0b2tlbiA9PT0gJycpIGJyZWFrXG4gICAgfTtcblxuICAgIGlmICh0b2tlbiAhPT0gdm9pZCAwICYmIHRva2VuICE9PSAnJykgb3V0LnB1c2godG9rZW4pXG4gIH07XG5cbiAgcmV0dXJuIG91dFxufVxuXG4vKipcbiAqIFJlc2V0cyB0aGUgcGlwZWxpbmUgYnkgcmVtb3ZpbmcgYW55IGV4aXN0aW5nIHByb2Nlc3NvcnMuXG4gKlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9zdGFjayA9IFtdXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwaXBlbGluZSByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX3N0YWNrLm1hcChmdW5jdGlvbiAoZm4pIHtcbiAgICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChmbilcblxuICAgIHJldHVybiBmbi5sYWJlbFxuICB9KVxufVxuLyohXG4gKiBsdW5yLlZlY3RvclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5WZWN0b3JzIGltcGxlbWVudCB2ZWN0b3IgcmVsYXRlZCBvcGVyYXRpb25zIGZvclxuICogYSBzZXJpZXMgb2YgZWxlbWVudHMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9tYWduaXR1ZGUgPSBudWxsXG4gIHRoaXMubGlzdCA9IHVuZGVmaW5lZFxuICB0aGlzLmxlbmd0aCA9IDBcbn1cblxuLyoqXG4gKiBsdW5yLlZlY3Rvci5Ob2RlIGlzIGEgc2ltcGxlIHN0cnVjdCBmb3IgZWFjaCBub2RlXG4gKiBpbiBhIGx1bnIuVmVjdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBub2RlIGluIHRoZSB2ZWN0b3IuXG4gKiBAcGFyYW0ge09iamVjdH0gVGhlIGRhdGEgYXQgdGhpcyBub2RlIGluIHRoZSB2ZWN0b3IuXG4gKiBAcGFyYW0ge2x1bnIuVmVjdG9yLk5vZGV9IFRoZSBub2RlIGRpcmVjdGx5IGFmdGVyIHRoaXMgbm9kZSBpbiB0aGUgdmVjdG9yLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAbWVtYmVyT2YgVmVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yLk5vZGUgPSBmdW5jdGlvbiAoaWR4LCB2YWwsIG5leHQpIHtcbiAgdGhpcy5pZHggPSBpZHhcbiAgdGhpcy52YWwgPSB2YWxcbiAgdGhpcy5uZXh0ID0gbmV4dFxufVxuXG4vKipcbiAqIEluc2VydHMgYSBuZXcgdmFsdWUgYXQgYSBwb3NpdGlvbiBpbiBhIHZlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gVGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCBhIHZhbHVlLlxuICogQHBhcmFtIHtPYmplY3R9IFRoZSBvYmplY3QgdG8gaW5zZXJ0IGluIHRoZSB2ZWN0b3IuXG4gKiBAbWVtYmVyT2YgVmVjdG9yLlxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gKGlkeCwgdmFsKSB7XG4gIHRoaXMuX21hZ25pdHVkZSA9IHVuZGVmaW5lZDtcbiAgdmFyIGxpc3QgPSB0aGlzLmxpc3RcblxuICBpZiAoIWxpc3QpIHtcbiAgICB0aGlzLmxpc3QgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIGxpc3QpXG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoKytcbiAgfVxuXG4gIGlmIChpZHggPCBsaXN0LmlkeCkge1xuICAgIHRoaXMubGlzdCA9IG5ldyBsdW5yLlZlY3Rvci5Ob2RlIChpZHgsIHZhbCwgbGlzdClcbiAgICByZXR1cm4gdGhpcy5sZW5ndGgrK1xuICB9XG5cbiAgdmFyIHByZXYgPSBsaXN0LFxuICAgICAgbmV4dCA9IGxpc3QubmV4dFxuXG4gIHdoaWxlIChuZXh0ICE9IHVuZGVmaW5lZCkge1xuICAgIGlmIChpZHggPCBuZXh0LmlkeCkge1xuICAgICAgcHJldi5uZXh0ID0gbmV3IGx1bnIuVmVjdG9yLk5vZGUgKGlkeCwgdmFsLCBuZXh0KVxuICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoKytcbiAgICB9XG5cbiAgICBwcmV2ID0gbmV4dCwgbmV4dCA9IG5leHQubmV4dFxuICB9XG5cbiAgcHJldi5uZXh0ID0gbmV3IGx1bnIuVmVjdG9yLk5vZGUgKGlkeCwgdmFsLCBuZXh0KVxuICByZXR1cm4gdGhpcy5sZW5ndGgrK1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1hZ25pdHVkZSBvZiB0aGlzIHZlY3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFZlY3RvclxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUubWFnbml0dWRlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5fbWFnbml0dWRlKSByZXR1cm4gdGhpcy5fbWFnbml0dWRlXG4gIHZhciBub2RlID0gdGhpcy5saXN0LFxuICAgICAgc3VtT2ZTcXVhcmVzID0gMCxcbiAgICAgIHZhbFxuXG4gIHdoaWxlIChub2RlKSB7XG4gICAgdmFsID0gbm9kZS52YWxcbiAgICBzdW1PZlNxdWFyZXMgKz0gdmFsICogdmFsXG4gICAgbm9kZSA9IG5vZGUubmV4dFxuICB9XG5cbiAgcmV0dXJuIHRoaXMuX21hZ25pdHVkZSA9IE1hdGguc3FydChzdW1PZlNxdWFyZXMpXG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXIgdmVjdG9yLlxuICpcbiAqIEBwYXJhbSB7bHVuci5WZWN0b3J9IG90aGVyVmVjdG9yIFRoZSB2ZWN0b3IgdG8gY29tcHV0ZSB0aGUgZG90IHByb2R1Y3Qgd2l0aC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgVmVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAob3RoZXJWZWN0b3IpIHtcbiAgdmFyIG5vZGUgPSB0aGlzLmxpc3QsXG4gICAgICBvdGhlck5vZGUgPSBvdGhlclZlY3Rvci5saXN0LFxuICAgICAgZG90UHJvZHVjdCA9IDBcblxuICB3aGlsZSAobm9kZSAmJiBvdGhlck5vZGUpIHtcbiAgICBpZiAobm9kZS5pZHggPCBvdGhlck5vZGUuaWR4KSB7XG4gICAgICBub2RlID0gbm9kZS5uZXh0XG4gICAgfSBlbHNlIGlmIChub2RlLmlkeCA+IG90aGVyTm9kZS5pZHgpIHtcbiAgICAgIG90aGVyTm9kZSA9IG90aGVyTm9kZS5uZXh0XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvdFByb2R1Y3QgKz0gbm9kZS52YWwgKiBvdGhlck5vZGUudmFsXG4gICAgICBub2RlID0gbm9kZS5uZXh0XG4gICAgICBvdGhlck5vZGUgPSBvdGhlck5vZGUubmV4dFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkb3RQcm9kdWN0XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgY29zaW5lIHNpbWlsYXJpdHkgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICogdmVjdG9yLlxuICpcbiAqIEBwYXJhbSB7bHVuci5WZWN0b3J9IG90aGVyVmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgdG8gY2FsY3VsYXRlIHRoZVxuICogc2ltaWxhcml0eSB3aXRoLlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLnNpbWlsYXJpdHkgPSBmdW5jdGlvbiAob3RoZXJWZWN0b3IpIHtcbiAgcmV0dXJuIHRoaXMuZG90KG90aGVyVmVjdG9yKSAvICh0aGlzLm1hZ25pdHVkZSgpICogb3RoZXJWZWN0b3IubWFnbml0dWRlKCkpXG59XG4vKiFcbiAqIGx1bnIuU29ydGVkU2V0XG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlNvcnRlZFNldHMgYXJlIHVzZWQgdG8gbWFpbnRhaW4gYW4gYXJyYXkgb2YgdW5pcSB2YWx1ZXMgaW4gYSBzb3J0ZWRcbiAqIG9yZGVyLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlNvcnRlZFNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5sZW5ndGggPSAwXG4gIHRoaXMuZWxlbWVudHMgPSBbXVxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHNvcnRlZCBzZXQuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gc2VyaWFsaXNlZERhdGEgVGhlIHNlcmlhbGlzZWQgc2V0IHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5Tb3J0ZWRTZXR9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZERhdGEpIHtcbiAgdmFyIHNldCA9IG5ldyB0aGlzXG5cbiAgc2V0LmVsZW1lbnRzID0gc2VyaWFsaXNlZERhdGFcbiAgc2V0Lmxlbmd0aCA9IHNlcmlhbGlzZWREYXRhLmxlbmd0aFxuXG4gIHJldHVybiBzZXRcbn1cblxuLyoqXG4gKiBJbnNlcnRzIG5ldyBpdGVtcyBpbnRvIHRoZSBzZXQgaW4gdGhlIGNvcnJlY3QgcG9zaXRpb24gdG8gbWFpbnRhaW4gdGhlXG4gKiBvcmRlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gVGhlIG9iamVjdHMgdG8gYWRkIHRvIHRoaXMgc2V0LlxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaSwgZWxlbWVudFxuXG4gIGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBlbGVtZW50ID0gYXJndW1lbnRzW2ldXG4gICAgaWYgKH50aGlzLmluZGV4T2YoZWxlbWVudCkpIGNvbnRpbnVlXG4gICAgdGhpcy5lbGVtZW50cy5zcGxpY2UodGhpcy5sb2NhdGlvbkZvcihlbGVtZW50KSwgMCwgZWxlbWVudClcbiAgfVxuXG4gIHRoaXMubGVuZ3RoID0gdGhpcy5lbGVtZW50cy5sZW5ndGhcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIHNvcnRlZCBzZXQgaW50byBhbiBhcnJheS5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5lbGVtZW50cy5zbGljZSgpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBhcnJheSB3aXRoIHRoZSByZXN1bHRzIG9mIGNhbGxpbmcgYSBwcm92aWRlZCBmdW5jdGlvbiBvbiBldmVyeVxuICogZWxlbWVudCBpbiB0aGlzIHNvcnRlZCBzZXQuXG4gKlxuICogRGVsZWdhdGVzIHRvIEFycmF5LnByb3RvdHlwZS5tYXAgYW5kIGhhcyB0aGUgc2FtZSBzaWduYXR1cmUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIG9uIGVhY2ggZWxlbWVudCBvZiB0aGVcbiAqIHNldC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggQW4gb3B0aW9uYWwgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgdGhlIGNvbnRleHRcbiAqIGZvciB0aGUgZnVuY3Rpb24gZm4uXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoZm4sIGN0eCkge1xuICByZXR1cm4gdGhpcy5lbGVtZW50cy5tYXAoZm4sIGN0eClcbn1cblxuLyoqXG4gKiBFeGVjdXRlcyBhIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgcGVyIHNvcnRlZCBzZXQgZWxlbWVudC5cbiAqXG4gKiBEZWxlZ2F0ZXMgdG8gQXJyYXkucHJvdG90eXBlLmZvckVhY2ggYW5kIGhhcyB0aGUgc2FtZSBzaWduYXR1cmUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIG9uIGVhY2ggZWxlbWVudCBvZiB0aGVcbiAqIHNldC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggQW4gb3B0aW9uYWwgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgdGhlIGNvbnRleHRcbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqIGZvciB0aGUgZnVuY3Rpb24gZm4uXG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGZuLCBjdHgpIHtcbiAgcmV0dXJuIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmbiwgY3R4KVxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGluZGV4IGF0IHdoaWNoIGEgZ2l2ZW4gZWxlbWVudCBjYW4gYmUgZm91bmQgaW4gdGhlXG4gKiBzb3J0ZWQgc2V0LCBvciAtMSBpZiBpdCBpcyBub3QgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZWxlbSBUaGUgb2JqZWN0IHRvIGxvY2F0ZSBpbiB0aGUgc29ydGVkIHNldC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgdmFyIHN0YXJ0ID0gMCxcbiAgICAgIGVuZCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgc2VjdGlvbkxlbmd0aCA9IGVuZCAtIHN0YXJ0LFxuICAgICAgcGl2b3QgPSBzdGFydCArIE1hdGguZmxvb3Ioc2VjdGlvbkxlbmd0aCAvIDIpLFxuICAgICAgcGl2b3RFbGVtID0gdGhpcy5lbGVtZW50c1twaXZvdF1cblxuICB3aGlsZSAoc2VjdGlvbkxlbmd0aCA+IDEpIHtcbiAgICBpZiAocGl2b3RFbGVtID09PSBlbGVtKSByZXR1cm4gcGl2b3RcblxuICAgIGlmIChwaXZvdEVsZW0gPCBlbGVtKSBzdGFydCA9IHBpdm90XG4gICAgaWYgKHBpdm90RWxlbSA+IGVsZW0pIGVuZCA9IHBpdm90XG5cbiAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnRcbiAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMilcbiAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuICB9XG5cbiAgaWYgKHBpdm90RWxlbSA9PT0gZWxlbSkgcmV0dXJuIHBpdm90XG5cbiAgcmV0dXJuIC0xXG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gd2l0aGluIHRoZSBzb3J0ZWQgc2V0IHRoYXQgYW4gZWxlbWVudCBzaG91bGQgYmVcbiAqIGluc2VydGVkIGF0IHRvIG1haW50YWluIHRoZSBjdXJyZW50IG9yZGVyIG9mIHRoZSBzZXQuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgdGhlIGVsZW1lbnQgdG8gc2VhcmNoIGZvciBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0XG4gKiBpbiB0aGUgc29ydGVkIHNldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZWxlbSBUaGUgZWxlbSB0byBmaW5kIHRoZSBwb3NpdGlvbiBmb3IgaW4gdGhlIHNldFxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmxvY2F0aW9uRm9yID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgdmFyIHN0YXJ0ID0gMCxcbiAgICAgIGVuZCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgc2VjdGlvbkxlbmd0aCA9IGVuZCAtIHN0YXJ0LFxuICAgICAgcGl2b3QgPSBzdGFydCArIE1hdGguZmxvb3Ioc2VjdGlvbkxlbmd0aCAvIDIpLFxuICAgICAgcGl2b3RFbGVtID0gdGhpcy5lbGVtZW50c1twaXZvdF1cblxuICB3aGlsZSAoc2VjdGlvbkxlbmd0aCA+IDEpIHtcbiAgICBpZiAocGl2b3RFbGVtIDwgZWxlbSkgc3RhcnQgPSBwaXZvdFxuICAgIGlmIChwaXZvdEVsZW0gPiBlbGVtKSBlbmQgPSBwaXZvdFxuXG4gICAgc2VjdGlvbkxlbmd0aCA9IGVuZCAtIHN0YXJ0XG4gICAgcGl2b3QgPSBzdGFydCArIE1hdGguZmxvb3Ioc2VjdGlvbkxlbmd0aCAvIDIpXG4gICAgcGl2b3RFbGVtID0gdGhpcy5lbGVtZW50c1twaXZvdF1cbiAgfVxuXG4gIGlmIChwaXZvdEVsZW0gPiBlbGVtKSByZXR1cm4gcGl2b3RcbiAgaWYgKHBpdm90RWxlbSA8IGVsZW0pIHJldHVybiBwaXZvdCArIDFcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGx1bnIuU29ydGVkU2V0IHRoYXQgY29udGFpbnMgdGhlIGVsZW1lbnRzIGluIHRoZSBpbnRlcnNlY3Rpb25cbiAqIG9mIHRoaXMgc2V0IGFuZCB0aGUgcGFzc2VkIHNldC5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuU29ydGVkU2V0fSBvdGhlclNldCBUaGUgc2V0IHRvIGludGVyc2VjdCB3aXRoIHRoaXMgc2V0LlxuICogQHJldHVybnMge2x1bnIuU29ydGVkU2V0fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuaW50ZXJzZWN0ID0gZnVuY3Rpb24gKG90aGVyU2V0KSB7XG4gIHZhciBpbnRlcnNlY3RTZXQgPSBuZXcgbHVuci5Tb3J0ZWRTZXQsXG4gICAgICBpID0gMCwgaiA9IDAsXG4gICAgICBhX2xlbiA9IHRoaXMubGVuZ3RoLCBiX2xlbiA9IG90aGVyU2V0Lmxlbmd0aCxcbiAgICAgIGEgPSB0aGlzLmVsZW1lbnRzLCBiID0gb3RoZXJTZXQuZWxlbWVudHNcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGlmIChpID4gYV9sZW4gLSAxIHx8IGogPiBiX2xlbiAtIDEpIGJyZWFrXG5cbiAgICBpZiAoYVtpXSA9PT0gYltqXSkge1xuICAgICAgaW50ZXJzZWN0U2V0LmFkZChhW2ldKVxuICAgICAgaSsrLCBqKytcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKGFbaV0gPCBiW2pdKSB7XG4gICAgICBpKytcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKGFbaV0gPiBiW2pdKSB7XG4gICAgICBqKytcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBpbnRlcnNlY3RTZXRcbn1cblxuLyoqXG4gKiBNYWtlcyBhIGNvcHkgb2YgdGhpcyBzZXRcbiAqXG4gKiBAcmV0dXJucyB7bHVuci5Tb3J0ZWRTZXR9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNsb25lID0gbmV3IGx1bnIuU29ydGVkU2V0XG5cbiAgY2xvbmUuZWxlbWVudHMgPSB0aGlzLnRvQXJyYXkoKVxuICBjbG9uZS5sZW5ndGggPSBjbG9uZS5lbGVtZW50cy5sZW5ndGhcblxuICByZXR1cm4gY2xvbmVcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGx1bnIuU29ydGVkU2V0IHRoYXQgY29udGFpbnMgdGhlIGVsZW1lbnRzIGluIHRoZSB1bmlvblxuICogb2YgdGhpcyBzZXQgYW5kIHRoZSBwYXNzZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7bHVuci5Tb3J0ZWRTZXR9IG90aGVyU2V0IFRoZSBzZXQgdG8gdW5pb24gd2l0aCB0aGlzIHNldC5cbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLnVuaW9uID0gZnVuY3Rpb24gKG90aGVyU2V0KSB7XG4gIHZhciBsb25nU2V0LCBzaG9ydFNldCwgdW5pb25TZXRcblxuICBpZiAodGhpcy5sZW5ndGggPj0gb3RoZXJTZXQubGVuZ3RoKSB7XG4gICAgbG9uZ1NldCA9IHRoaXMsIHNob3J0U2V0ID0gb3RoZXJTZXRcbiAgfSBlbHNlIHtcbiAgICBsb25nU2V0ID0gb3RoZXJTZXQsIHNob3J0U2V0ID0gdGhpc1xuICB9XG5cbiAgdW5pb25TZXQgPSBsb25nU2V0LmNsb25lKClcblxuICBmb3IodmFyIGkgPSAwLCBzaG9ydFNldEVsZW1lbnRzID0gc2hvcnRTZXQudG9BcnJheSgpOyBpIDwgc2hvcnRTZXRFbGVtZW50cy5sZW5ndGg7IGkrKyl7XG4gICAgdW5pb25TZXQuYWRkKHNob3J0U2V0RWxlbWVudHNbaV0pXG4gIH1cblxuICByZXR1cm4gdW5pb25TZXRcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNvcnRlZCBzZXQgcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy50b0FycmF5KClcbn1cbi8qIVxuICogbHVuci5JbmRleFxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5JbmRleCBpcyBvYmplY3QgdGhhdCBtYW5hZ2VzIGEgc2VhcmNoIGluZGV4LiAgSXQgY29udGFpbnMgdGhlIGluZGV4ZXNcbiAqIGFuZCBzdG9yZXMgYWxsIHRoZSB0b2tlbnMgYW5kIGRvY3VtZW50IGxvb2t1cHMuICBJdCBhbHNvIHByb3ZpZGVzIHRoZSBtYWluXG4gKiB1c2VyIGZhY2luZyBBUEkgZm9yIHRoZSBsaWJyYXJ5LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLkluZGV4ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9maWVsZHMgPSBbXVxuICB0aGlzLl9yZWYgPSAnaWQnXG4gIHRoaXMucGlwZWxpbmUgPSBuZXcgbHVuci5QaXBlbGluZVxuICB0aGlzLmRvY3VtZW50U3RvcmUgPSBuZXcgbHVuci5TdG9yZVxuICB0aGlzLnRva2VuU3RvcmUgPSBuZXcgbHVuci5Ub2tlblN0b3JlXG4gIHRoaXMuY29ycHVzVG9rZW5zID0gbmV3IGx1bnIuU29ydGVkU2V0XG4gIHRoaXMuZXZlbnRFbWl0dGVyID0gIG5ldyBsdW5yLkV2ZW50RW1pdHRlclxuICB0aGlzLnRva2VuaXplckZuID0gbHVuci50b2tlbml6ZXJcblxuICB0aGlzLl9pZGZDYWNoZSA9IHt9XG5cbiAgdGhpcy5vbignYWRkJywgJ3JlbW92ZScsICd1cGRhdGUnLCAoZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2lkZkNhY2hlID0ge31cbiAgfSkuYmluZCh0aGlzKSlcbn1cblxuLyoqXG4gKiBCaW5kIGEgaGFuZGxlciB0byBldmVudHMgYmVpbmcgZW1pdHRlZCBieSB0aGUgaW5kZXguXG4gKlxuICogVGhlIGhhbmRsZXIgY2FuIGJlIGJvdW5kIHRvIG1hbnkgZXZlbnRzIGF0IHRoZSBzYW1lIHRpbWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFtldmVudE5hbWVdIFRoZSBuYW1lKHMpIG9mIGV2ZW50cyB0byBiaW5kIHRoZSBmdW5jdGlvbiB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBzZXJpYWxpc2VkIHNldCB0byBsb2FkLlxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgcmV0dXJuIHRoaXMuZXZlbnRFbWl0dGVyLmFkZExpc3RlbmVyLmFwcGx5KHRoaXMuZXZlbnRFbWl0dGVyLCBhcmdzKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBoYW5kbGVyIGZyb20gYW4gZXZlbnQgYmVpbmcgZW1pdHRlZCBieSB0aGUgaW5kZXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiBldmVudHMgdG8gcmVtb3ZlIHRoZSBmdW5jdGlvbiBmcm9tLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHNlcmlhbGlzZWQgc2V0IHRvIGxvYWQuXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gIHJldHVybiB0aGlzLmV2ZW50RW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCBmbilcbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBpbmRleC5cbiAqXG4gKiBJc3N1ZXMgYSB3YXJuaW5nIGlmIHRoZSBpbmRleCBiZWluZyBpbXBvcnRlZCB3YXMgc2VyaWFsaXNlZFxuICogYnkgYSBkaWZmZXJlbnQgdmVyc2lvbiBvZiBsdW5yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkRGF0YSkge1xuICBpZiAoc2VyaWFsaXNlZERhdGEudmVyc2lvbiAhPT0gbHVuci52ZXJzaW9uKSB7XG4gICAgbHVuci51dGlscy53YXJuKCd2ZXJzaW9uIG1pc21hdGNoOiBjdXJyZW50ICcgKyBsdW5yLnZlcnNpb24gKyAnIGltcG9ydGluZyAnICsgc2VyaWFsaXNlZERhdGEudmVyc2lvbilcbiAgfVxuXG4gIHZhciBpZHggPSBuZXcgdGhpc1xuXG4gIGlkeC5fZmllbGRzID0gc2VyaWFsaXNlZERhdGEuZmllbGRzXG4gIGlkeC5fcmVmID0gc2VyaWFsaXNlZERhdGEucmVmXG5cbiAgaWR4LnRva2VuaXplcihsdW5yLnRva2VuaXplci5sb2FkKHNlcmlhbGlzZWREYXRhLnRva2VuaXplcikpXG4gIGlkeC5kb2N1bWVudFN0b3JlID0gbHVuci5TdG9yZS5sb2FkKHNlcmlhbGlzZWREYXRhLmRvY3VtZW50U3RvcmUpXG4gIGlkeC50b2tlblN0b3JlID0gbHVuci5Ub2tlblN0b3JlLmxvYWQoc2VyaWFsaXNlZERhdGEudG9rZW5TdG9yZSlcbiAgaWR4LmNvcnB1c1Rva2VucyA9IGx1bnIuU29ydGVkU2V0LmxvYWQoc2VyaWFsaXNlZERhdGEuY29ycHVzVG9rZW5zKVxuICBpZHgucGlwZWxpbmUgPSBsdW5yLlBpcGVsaW5lLmxvYWQoc2VyaWFsaXNlZERhdGEucGlwZWxpbmUpXG5cbiAgcmV0dXJuIGlkeFxufVxuXG4vKipcbiAqIEFkZHMgYSBmaWVsZCB0byB0aGUgbGlzdCBvZiBmaWVsZHMgdGhhdCB3aWxsIGJlIHNlYXJjaGFibGUgd2l0aGluIGRvY3VtZW50c1xuICogaW4gdGhlIGluZGV4LlxuICpcbiAqIEFuIG9wdGlvbmFsIGJvb3N0IHBhcmFtIGNhbiBiZSBwYXNzZWQgdG8gYWZmZWN0IGhvdyBtdWNoIHRva2VucyBpbiB0aGlzIGZpZWxkXG4gKiByYW5rIGluIHNlYXJjaCByZXN1bHRzLCBieSBkZWZhdWx0IHRoZSBib29zdCB2YWx1ZSBpcyAxLlxuICpcbiAqIEZpZWxkcyBzaG91bGQgYmUgYWRkZWQgYmVmb3JlIGFueSBkb2N1bWVudHMgYXJlIGFkZGVkIHRvIHRoZSBpbmRleCwgZmllbGRzXG4gKiB0aGF0IGFyZSBhZGRlZCBhZnRlciBkb2N1bWVudHMgYXJlIGFkZGVkIHRvIHRoZSBpbmRleCB3aWxsIG9ubHkgYXBwbHkgdG8gbmV3XG4gKiBkb2N1bWVudHMgYWRkZWQgdG8gdGhlIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZE5hbWUgVGhlIG5hbWUgb2YgdGhlIGZpZWxkIHdpdGhpbiB0aGUgZG9jdW1lbnQgdGhhdFxuICogc2hvdWxkIGJlIGluZGV4ZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBib29zdCBBbiBvcHRpb25hbCBib29zdCB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvIHRlcm1zIGluIHRoaXNcbiAqIGZpZWxkLlxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbiAoZmllbGROYW1lLCBvcHRzKSB7XG4gIHZhciBvcHRzID0gb3B0cyB8fCB7fSxcbiAgICAgIGZpZWxkID0geyBuYW1lOiBmaWVsZE5hbWUsIGJvb3N0OiBvcHRzLmJvb3N0IHx8IDEgfVxuXG4gIHRoaXMuX2ZpZWxkcy5wdXNoKGZpZWxkKVxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHByb3BlcnR5IHVzZWQgdG8gdW5pcXVlbHkgaWRlbnRpZnkgZG9jdW1lbnRzIGFkZGVkIHRvIHRoZSBpbmRleCxcbiAqIGJ5IGRlZmF1bHQgdGhpcyBwcm9wZXJ0eSBpcyAnaWQnLlxuICpcbiAqIFRoaXMgc2hvdWxkIG9ubHkgYmUgY2hhbmdlZCBiZWZvcmUgYWRkaW5nIGRvY3VtZW50cyB0byB0aGUgaW5kZXgsIGNoYW5naW5nXG4gKiB0aGUgcmVmIHByb3BlcnR5IHdpdGhvdXQgcmVzZXR0aW5nIHRoZSBpbmRleCBjYW4gbGVhZCB0byB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gKlxuICogVGhlIHZhbHVlIG9mIHJlZiBjYW4gYmUgb2YgYW55IHR5cGUgYnV0IGl0IF9tdXN0XyBiZSBzdGFibHkgY29tcGFyYWJsZSBhbmRcbiAqIG9yZGVyYWJsZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVmTmFtZSBUaGUgcHJvcGVydHkgdG8gdXNlIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoZVxuICogZG9jdW1lbnRzIGluIHRoZSBpbmRleC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZW1pdEV2ZW50IFdoZXRoZXIgdG8gZW1pdCBhZGQgZXZlbnRzLCBkZWZhdWx0cyB0byB0cnVlXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbiAocmVmTmFtZSkge1xuICB0aGlzLl9yZWYgPSByZWZOYW1lXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogU2V0cyB0aGUgdG9rZW5pemVyIHVzZWQgZm9yIHRoaXMgaW5kZXguXG4gKlxuICogQnkgZGVmYXVsdCB0aGUgaW5kZXggd2lsbCB1c2UgdGhlIGRlZmF1bHQgdG9rZW5pemVyLCBsdW5yLnRva2VuaXplci4gVGhlIHRva2VuaXplclxuICogc2hvdWxkIG9ubHkgYmUgY2hhbmdlZCBiZWZvcmUgYWRkaW5nIGRvY3VtZW50cyB0byB0aGUgaW5kZXguIENoYW5naW5nIHRoZSB0b2tlbml6ZXJcbiAqIHdpdGhvdXQgcmUtYnVpbGRpbmcgdGhlIGluZGV4IGNhbiBsZWFkIHRvIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gdXNlIGFzIGEgdG9rZW5pemVyLlxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudG9rZW5pemVyID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBpc1JlZ2lzdGVyZWQgPSBmbi5sYWJlbCAmJiAoZm4ubGFiZWwgaW4gbHVuci50b2tlbml6ZXIucmVnaXN0ZXJlZEZ1bmN0aW9ucylcblxuICBpZiAoIWlzUmVnaXN0ZXJlZCkge1xuICAgIGx1bnIudXRpbHMud2FybignRnVuY3Rpb24gaXMgbm90IGEgcmVnaXN0ZXJlZCB0b2tlbml6ZXIuIFRoaXMgbWF5IGNhdXNlIHByb2JsZW1zIHdoZW4gc2VyaWFsaXNpbmcgdGhlIGluZGV4JylcbiAgfVxuXG4gIHRoaXMudG9rZW5pemVyRm4gPSBmblxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIEFkZCBhIGRvY3VtZW50IHRvIHRoZSBpbmRleC5cbiAqXG4gKiBUaGlzIGlzIHRoZSB3YXkgbmV3IGRvY3VtZW50cyBlbnRlciB0aGUgaW5kZXgsIHRoaXMgZnVuY3Rpb24gd2lsbCBydW4gdGhlXG4gKiBmaWVsZHMgZnJvbSB0aGUgZG9jdW1lbnQgdGhyb3VnaCB0aGUgaW5kZXgncyBwaXBlbGluZSBhbmQgdGhlbiBhZGQgaXQgdG9cbiAqIHRoZSBpbmRleCwgaXQgd2lsbCB0aGVuIHNob3cgdXAgaW4gc2VhcmNoIHJlc3VsdHMuXG4gKlxuICogQW4gJ2FkZCcgZXZlbnQgaXMgZW1pdHRlZCB3aXRoIHRoZSBkb2N1bWVudCB0aGF0IGhhcyBiZWVuIGFkZGVkIGFuZCB0aGUgaW5kZXhcbiAqIHRoZSBkb2N1bWVudCBoYXMgYmVlbiBhZGRlZCB0by4gVGhpcyBldmVudCBjYW4gYmUgc2lsZW5jZWQgYnkgcGFzc2luZyBmYWxzZVxuICogYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBhZGQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRvYyBUaGUgZG9jdW1lbnQgdG8gYWRkIHRvIHRoZSBpbmRleC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZW1pdEV2ZW50IFdoZXRoZXIgb3Igbm90IHRvIGVtaXQgZXZlbnRzLCBkZWZhdWx0IHRydWUuXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGRvYywgZW1pdEV2ZW50KSB7XG4gIHZhciBkb2NUb2tlbnMgPSB7fSxcbiAgICAgIGFsbERvY3VtZW50VG9rZW5zID0gbmV3IGx1bnIuU29ydGVkU2V0LFxuICAgICAgZG9jUmVmID0gZG9jW3RoaXMuX3JlZl0sXG4gICAgICBlbWl0RXZlbnQgPSBlbWl0RXZlbnQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBlbWl0RXZlbnRcblxuICB0aGlzLl9maWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICB2YXIgZmllbGRUb2tlbnMgPSB0aGlzLnBpcGVsaW5lLnJ1bih0aGlzLnRva2VuaXplckZuKGRvY1tmaWVsZC5uYW1lXSkpXG5cbiAgICBkb2NUb2tlbnNbZmllbGQubmFtZV0gPSBmaWVsZFRva2Vuc1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZFRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuID0gZmllbGRUb2tlbnNbaV1cbiAgICAgIGFsbERvY3VtZW50VG9rZW5zLmFkZCh0b2tlbilcbiAgICAgIHRoaXMuY29ycHVzVG9rZW5zLmFkZCh0b2tlbilcbiAgICB9XG4gIH0sIHRoaXMpXG5cbiAgdGhpcy5kb2N1bWVudFN0b3JlLnNldChkb2NSZWYsIGFsbERvY3VtZW50VG9rZW5zKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsRG9jdW1lbnRUb2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSBhbGxEb2N1bWVudFRva2Vucy5lbGVtZW50c1tpXVxuICAgIHZhciB0ZiA9IDA7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2ZpZWxkcy5sZW5ndGg7IGorKyl7XG4gICAgICB2YXIgZmllbGQgPSB0aGlzLl9maWVsZHNbal1cbiAgICAgIHZhciBmaWVsZFRva2VucyA9IGRvY1Rva2Vuc1tmaWVsZC5uYW1lXVxuICAgICAgdmFyIGZpZWxkTGVuZ3RoID0gZmllbGRUb2tlbnMubGVuZ3RoXG5cbiAgICAgIGlmICghZmllbGRMZW5ndGgpIGNvbnRpbnVlXG5cbiAgICAgIHZhciB0b2tlbkNvdW50ID0gMFxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBmaWVsZExlbmd0aDsgaysrKXtcbiAgICAgICAgaWYgKGZpZWxkVG9rZW5zW2tdID09PSB0b2tlbil7XG4gICAgICAgICAgdG9rZW5Db3VudCsrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGYgKz0gKHRva2VuQ291bnQgLyBmaWVsZExlbmd0aCAqIGZpZWxkLmJvb3N0KVxuICAgIH1cblxuICAgIHRoaXMudG9rZW5TdG9yZS5hZGQodG9rZW4sIHsgcmVmOiBkb2NSZWYsIHRmOiB0ZiB9KVxuICB9O1xuXG4gIGlmIChlbWl0RXZlbnQpIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ2FkZCcsIGRvYywgdGhpcylcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgZG9jdW1lbnQgZnJvbSB0aGUgaW5kZXguXG4gKlxuICogVG8gbWFrZSBzdXJlIGRvY3VtZW50cyBubyBsb25nZXIgc2hvdyB1cCBpbiBzZWFyY2ggcmVzdWx0cyB0aGV5IGNhbiBiZVxuICogcmVtb3ZlZCBmcm9tIHRoZSBpbmRleCB1c2luZyB0aGlzIG1ldGhvZC5cbiAqXG4gKiBUaGUgZG9jdW1lbnQgcGFzc2VkIG9ubHkgbmVlZHMgdG8gaGF2ZSB0aGUgc2FtZSByZWYgcHJvcGVydHkgdmFsdWUgYXMgdGhlXG4gKiBkb2N1bWVudCB0aGF0IHdhcyBhZGRlZCB0byB0aGUgaW5kZXgsIHRoZXkgY291bGQgYmUgY29tcGxldGVseSBkaWZmZXJlbnRcbiAqIG9iamVjdHMuXG4gKlxuICogQSAncmVtb3ZlJyBldmVudCBpcyBlbWl0dGVkIHdpdGggdGhlIGRvY3VtZW50IHRoYXQgaGFzIGJlZW4gcmVtb3ZlZCBhbmQgdGhlIGluZGV4XG4gKiB0aGUgZG9jdW1lbnQgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tLiBUaGlzIGV2ZW50IGNhbiBiZSBzaWxlbmNlZCBieSBwYXNzaW5nIGZhbHNlXG4gKiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHJlbW92ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIFRoZSBkb2N1bWVudCB0byByZW1vdmUgZnJvbSB0aGUgaW5kZXguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVtaXRFdmVudCBXaGV0aGVyIHRvIGVtaXQgcmVtb3ZlIGV2ZW50cywgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChkb2MsIGVtaXRFdmVudCkge1xuICB2YXIgZG9jUmVmID0gZG9jW3RoaXMuX3JlZl0sXG4gICAgICBlbWl0RXZlbnQgPSBlbWl0RXZlbnQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBlbWl0RXZlbnRcblxuICBpZiAoIXRoaXMuZG9jdW1lbnRTdG9yZS5oYXMoZG9jUmVmKSkgcmV0dXJuXG5cbiAgdmFyIGRvY1Rva2VucyA9IHRoaXMuZG9jdW1lbnRTdG9yZS5nZXQoZG9jUmVmKVxuXG4gIHRoaXMuZG9jdW1lbnRTdG9yZS5yZW1vdmUoZG9jUmVmKVxuXG4gIGRvY1Rva2Vucy5mb3JFYWNoKGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRoaXMudG9rZW5TdG9yZS5yZW1vdmUodG9rZW4sIGRvY1JlZilcbiAgfSwgdGhpcylcblxuICBpZiAoZW1pdEV2ZW50KSB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdyZW1vdmUnLCBkb2MsIHRoaXMpXG59XG5cbi8qKlxuICogVXBkYXRlcyBhIGRvY3VtZW50IGluIHRoZSBpbmRleC5cbiAqXG4gKiBXaGVuIGEgZG9jdW1lbnQgY29udGFpbmVkIHdpdGhpbiB0aGUgaW5kZXggZ2V0cyB1cGRhdGVkLCBmaWVsZHMgY2hhbmdlZCxcbiAqIGFkZGVkIG9yIHJlbW92ZWQsIHRvIG1ha2Ugc3VyZSBpdCBjb3JyZWN0bHkgbWF0Y2hlZCBhZ2FpbnN0IHNlYXJjaCBxdWVyaWVzLFxuICogaXQgc2hvdWxkIGJlIHVwZGF0ZWQgaW4gdGhlIGluZGV4LlxuICpcbiAqIFRoaXMgbWV0aG9kIGlzIGp1c3QgYSB3cmFwcGVyIGFyb3VuZCBgcmVtb3ZlYCBhbmQgYGFkZGBcbiAqXG4gKiBBbiAndXBkYXRlJyBldmVudCBpcyBlbWl0dGVkIHdpdGggdGhlIGRvY3VtZW50IHRoYXQgaGFzIGJlZW4gdXBkYXRlZCBhbmQgdGhlIGluZGV4LlxuICogVGhpcyBldmVudCBjYW4gYmUgc2lsZW5jZWQgYnkgcGFzc2luZyBmYWxzZSBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHVwZGF0ZS4gT25seVxuICogYW4gdXBkYXRlIGV2ZW50IHdpbGwgYmUgZmlyZWQsIHRoZSAnYWRkJyBhbmQgJ3JlbW92ZScgZXZlbnRzIG9mIHRoZSB1bmRlcmx5aW5nIGNhbGxzXG4gKiBhcmUgc2lsZW5jZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRvYyBUaGUgZG9jdW1lbnQgdG8gdXBkYXRlIGluIHRoZSBpbmRleC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZW1pdEV2ZW50IFdoZXRoZXIgdG8gZW1pdCB1cGRhdGUgZXZlbnRzLCBkZWZhdWx0cyB0byB0cnVlXG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5yZW1vdmVcbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLmFkZFxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb2MsIGVtaXRFdmVudCkge1xuICB2YXIgZW1pdEV2ZW50ID0gZW1pdEV2ZW50ID09PSB1bmRlZmluZWQgPyB0cnVlIDogZW1pdEV2ZW50XG5cbiAgdGhpcy5yZW1vdmUoZG9jLCBmYWxzZSlcbiAgdGhpcy5hZGQoZG9jLCBmYWxzZSlcblxuICBpZiAoZW1pdEV2ZW50KSB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCd1cGRhdGUnLCBkb2MsIHRoaXMpXG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgaW52ZXJzZSBkb2N1bWVudCBmcmVxdWVuY3kgZm9yIGEgdG9rZW4gd2l0aGluIHRoZSBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGNhbGN1bGF0ZSB0aGUgaWRmIG9mLlxuICogQHNlZSBJbmRleC5wcm90b3R5cGUuaWRmXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLmlkZiA9IGZ1bmN0aW9uICh0ZXJtKSB7XG4gIHZhciBjYWNoZUtleSA9IFwiQFwiICsgdGVybVxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX2lkZkNhY2hlLCBjYWNoZUtleSkpIHJldHVybiB0aGlzLl9pZGZDYWNoZVtjYWNoZUtleV1cblxuICB2YXIgZG9jdW1lbnRGcmVxdWVuY3kgPSB0aGlzLnRva2VuU3RvcmUuY291bnQodGVybSksXG4gICAgICBpZGYgPSAxXG5cbiAgaWYgKGRvY3VtZW50RnJlcXVlbmN5ID4gMCkge1xuICAgIGlkZiA9IDEgKyBNYXRoLmxvZyh0aGlzLmRvY3VtZW50U3RvcmUubGVuZ3RoIC8gZG9jdW1lbnRGcmVxdWVuY3kpXG4gIH1cblxuICByZXR1cm4gdGhpcy5faWRmQ2FjaGVbY2FjaGVLZXldID0gaWRmXG59XG5cbi8qKlxuICogU2VhcmNoZXMgdGhlIGluZGV4IHVzaW5nIHRoZSBwYXNzZWQgcXVlcnkuXG4gKlxuICogUXVlcmllcyBzaG91bGQgYmUgYSBzdHJpbmcsIG11bHRpcGxlIHdvcmRzIGFyZSBhbGxvd2VkIGFuZCB3aWxsIGxlYWQgdG8gYW5cbiAqIEFORCBiYXNlZCBxdWVyeSwgZS5nLiBgaWR4LnNlYXJjaCgnZm9vIGJhcicpYCB3aWxsIHJ1biBhIHNlYXJjaCBmb3JcbiAqIGRvY3VtZW50cyBjb250YWluaW5nIGJvdGggJ2ZvbycgYW5kICdiYXInLlxuICpcbiAqIEFsbCBxdWVyeSB0b2tlbnMgYXJlIHBhc3NlZCB0aHJvdWdoIHRoZSBzYW1lIHBpcGVsaW5lIHRoYXQgZG9jdW1lbnQgdG9rZW5zXG4gKiBhcmUgcGFzc2VkIHRocm91Z2gsIHNvIGFueSBsYW5ndWFnZSBwcm9jZXNzaW5nIGludm9sdmVkIHdpbGwgYmUgcnVuIG9uIGV2ZXJ5XG4gKiBxdWVyeSB0ZXJtLlxuICpcbiAqIEVhY2ggcXVlcnkgdGVybSBpcyBleHBhbmRlZCwgc28gdGhhdCB0aGUgdGVybSAnaGUnIG1pZ2h0IGJlIGV4cGFuZGVkIHRvXG4gKiAnaGVsbG8nIGFuZCAnaGVscCcgaWYgdGhvc2UgdGVybXMgd2VyZSBhbHJlYWR5IGluY2x1ZGVkIGluIHRoZSBpbmRleC5cbiAqXG4gKiBNYXRjaGluZyBkb2N1bWVudHMgYXJlIHJldHVybmVkIGFzIGFuIGFycmF5IG9mIG9iamVjdHMsIGVhY2ggb2JqZWN0IGNvbnRhaW5zXG4gKiB0aGUgbWF0Y2hpbmcgZG9jdW1lbnQgcmVmLCBhcyBzZXQgZm9yIHRoaXMgaW5kZXgsIGFuZCB0aGUgc2ltaWxhcml0eSBzY29yZVxuICogZm9yIHRoaXMgZG9jdW1lbnQgYWdhaW5zdCB0aGUgcXVlcnkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggdGhlIGluZGV4IHdpdGguXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQHNlZSBJbmRleC5wcm90b3R5cGUuaWRmXG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5kb2N1bWVudFZlY3RvclxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICB2YXIgcXVlcnlUb2tlbnMgPSB0aGlzLnBpcGVsaW5lLnJ1bih0aGlzLnRva2VuaXplckZuKHF1ZXJ5KSksXG4gICAgICBxdWVyeVZlY3RvciA9IG5ldyBsdW5yLlZlY3RvcixcbiAgICAgIGRvY3VtZW50U2V0cyA9IFtdLFxuICAgICAgZmllbGRCb29zdHMgPSB0aGlzLl9maWVsZHMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBmKSB7IHJldHVybiBtZW1vICsgZi5ib29zdCB9LCAwKVxuXG4gIHZhciBoYXNTb21lVG9rZW4gPSBxdWVyeVRva2Vucy5zb21lKGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHJldHVybiB0aGlzLnRva2VuU3RvcmUuaGFzKHRva2VuKVxuICB9LCB0aGlzKVxuXG4gIGlmICghaGFzU29tZVRva2VuKSByZXR1cm4gW11cblxuICBxdWVyeVRva2Vuc1xuICAgIC5mb3JFYWNoKGZ1bmN0aW9uICh0b2tlbiwgaSwgdG9rZW5zKSB7XG4gICAgICB2YXIgdGYgPSAxIC8gdG9rZW5zLmxlbmd0aCAqIHRoaXMuX2ZpZWxkcy5sZW5ndGggKiBmaWVsZEJvb3N0cyxcbiAgICAgICAgICBzZWxmID0gdGhpc1xuXG4gICAgICB2YXIgc2V0ID0gdGhpcy50b2tlblN0b3JlLmV4cGFuZCh0b2tlbikucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBrZXkpIHtcbiAgICAgICAgdmFyIHBvcyA9IHNlbGYuY29ycHVzVG9rZW5zLmluZGV4T2Yoa2V5KSxcbiAgICAgICAgICAgIGlkZiA9IHNlbGYuaWRmKGtleSksXG4gICAgICAgICAgICBzaW1pbGFyaXR5Qm9vc3QgPSAxLFxuICAgICAgICAgICAgc2V0ID0gbmV3IGx1bnIuU29ydGVkU2V0XG5cbiAgICAgICAgLy8gaWYgdGhlIGV4cGFuZGVkIGtleSBpcyBub3QgYW4gZXhhY3QgbWF0Y2ggdG8gdGhlIHRva2VuIHRoZW5cbiAgICAgICAgLy8gcGVuYWxpc2UgdGhlIHNjb3JlIGZvciB0aGlzIGtleSBieSBob3cgZGlmZmVyZW50IHRoZSBrZXkgaXNcbiAgICAgICAgLy8gdG8gdGhlIHRva2VuLlxuICAgICAgICBpZiAoa2V5ICE9PSB0b2tlbikge1xuICAgICAgICAgIHZhciBkaWZmID0gTWF0aC5tYXgoMywga2V5Lmxlbmd0aCAtIHRva2VuLmxlbmd0aClcbiAgICAgICAgICBzaW1pbGFyaXR5Qm9vc3QgPSAxIC8gTWF0aC5sb2coZGlmZilcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgcXVlcnkgdGYtaWRmIHNjb3JlIGZvciB0aGlzIHRva2VuXG4gICAgICAgIC8vIGFwcGx5aW5nIGFuIHNpbWlsYXJpdHlCb29zdCB0byBlbnN1cmUgZXhhY3QgbWF0Y2hlc1xuICAgICAgICAvLyB0aGVzZSByYW5rIGhpZ2hlciB0aGFuIGV4cGFuZGVkIHRlcm1zXG4gICAgICAgIGlmIChwb3MgPiAtMSkgcXVlcnlWZWN0b3IuaW5zZXJ0KHBvcywgdGYgKiBpZGYgKiBzaW1pbGFyaXR5Qm9vc3QpXG5cbiAgICAgICAgLy8gYWRkIGFsbCB0aGUgZG9jdW1lbnRzIHRoYXQgaGF2ZSB0aGlzIGtleSBpbnRvIGEgc2V0XG4gICAgICAgIC8vIGVuc3VyaW5nIHRoYXQgdGhlIHR5cGUgb2Yga2V5IGlzIHByZXNlcnZlZFxuICAgICAgICB2YXIgbWF0Y2hpbmdEb2N1bWVudHMgPSBzZWxmLnRva2VuU3RvcmUuZ2V0KGtleSksXG4gICAgICAgICAgICByZWZzID0gT2JqZWN0LmtleXMobWF0Y2hpbmdEb2N1bWVudHMpLFxuICAgICAgICAgICAgcmVmc0xlbiA9IHJlZnMubGVuZ3RoXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWZzTGVuOyBpKyspIHtcbiAgICAgICAgICBzZXQuYWRkKG1hdGNoaW5nRG9jdW1lbnRzW3JlZnNbaV1dLnJlZilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZW1vLnVuaW9uKHNldClcbiAgICAgIH0sIG5ldyBsdW5yLlNvcnRlZFNldClcblxuICAgICAgZG9jdW1lbnRTZXRzLnB1c2goc2V0KVxuICAgIH0sIHRoaXMpXG5cbiAgdmFyIGRvY3VtZW50U2V0ID0gZG9jdW1lbnRTZXRzLnJlZHVjZShmdW5jdGlvbiAobWVtbywgc2V0KSB7XG4gICAgcmV0dXJuIG1lbW8uaW50ZXJzZWN0KHNldClcbiAgfSlcblxuICByZXR1cm4gZG9jdW1lbnRTZXRcbiAgICAubWFwKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgIHJldHVybiB7IHJlZjogcmVmLCBzY29yZTogcXVlcnlWZWN0b3Iuc2ltaWxhcml0eSh0aGlzLmRvY3VtZW50VmVjdG9yKHJlZikpIH1cbiAgICB9LCB0aGlzKVxuICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmVcbiAgICB9KVxufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHZlY3RvciBjb250YWluaW5nIGFsbCB0aGUgdG9rZW5zIGluIHRoZSBkb2N1bWVudCBtYXRjaGluZyB0aGVcbiAqIHBhc3NlZCBkb2N1bWVudFJlZi5cbiAqXG4gKiBUaGUgdmVjdG9yIGNvbnRhaW5zIHRoZSB0Zi1pZGYgc2NvcmUgZm9yIGVhY2ggdG9rZW4gY29udGFpbmVkIGluIHRoZVxuICogZG9jdW1lbnQgd2l0aCB0aGUgcGFzc2VkIGRvY3VtZW50UmVmLiAgVGhlIHZlY3RvciB3aWxsIGNvbnRhaW4gYW4gZWxlbWVudFxuICogZm9yIGV2ZXJ5IHRva2VuIGluIHRoZSBpbmRleGVzIGNvcnB1cywgaWYgdGhlIGRvY3VtZW50IGRvZXMgbm90IGNvbnRhaW4gdGhhdFxuICogdG9rZW4gdGhlIGVsZW1lbnQgd2lsbCBiZSAwLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2N1bWVudFJlZiBUaGUgcmVmIHRvIGZpbmQgdGhlIGRvY3VtZW50IHdpdGguXG4gKiBAcmV0dXJucyB7bHVuci5WZWN0b3J9XG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLmRvY3VtZW50VmVjdG9yID0gZnVuY3Rpb24gKGRvY3VtZW50UmVmKSB7XG4gIHZhciBkb2N1bWVudFRva2VucyA9IHRoaXMuZG9jdW1lbnRTdG9yZS5nZXQoZG9jdW1lbnRSZWYpLFxuICAgICAgZG9jdW1lbnRUb2tlbnNMZW5ndGggPSBkb2N1bWVudFRva2Vucy5sZW5ndGgsXG4gICAgICBkb2N1bWVudFZlY3RvciA9IG5ldyBsdW5yLlZlY3RvclxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZG9jdW1lbnRUb2tlbnNMZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IGRvY3VtZW50VG9rZW5zLmVsZW1lbnRzW2ldLFxuICAgICAgICB0ZiA9IHRoaXMudG9rZW5TdG9yZS5nZXQodG9rZW4pW2RvY3VtZW50UmVmXS50ZixcbiAgICAgICAgaWRmID0gdGhpcy5pZGYodG9rZW4pXG5cbiAgICBkb2N1bWVudFZlY3Rvci5pbnNlcnQodGhpcy5jb3JwdXNUb2tlbnMuaW5kZXhPZih0b2tlbiksIHRmICogaWRmKVxuICB9O1xuXG4gIHJldHVybiBkb2N1bWVudFZlY3RvclxufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgaW5kZXggcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogbHVuci52ZXJzaW9uLFxuICAgIGZpZWxkczogdGhpcy5fZmllbGRzLFxuICAgIHJlZjogdGhpcy5fcmVmLFxuICAgIHRva2VuaXplcjogdGhpcy50b2tlbml6ZXJGbi5sYWJlbCxcbiAgICBkb2N1bWVudFN0b3JlOiB0aGlzLmRvY3VtZW50U3RvcmUudG9KU09OKCksXG4gICAgdG9rZW5TdG9yZTogdGhpcy50b2tlblN0b3JlLnRvSlNPTigpLFxuICAgIGNvcnB1c1Rva2VuczogdGhpcy5jb3JwdXNUb2tlbnMudG9KU09OKCksXG4gICAgcGlwZWxpbmU6IHRoaXMucGlwZWxpbmUudG9KU09OKClcbiAgfVxufVxuXG4vKipcbiAqIEFwcGxpZXMgYSBwbHVnaW4gdG8gdGhlIGN1cnJlbnQgaW5kZXguXG4gKlxuICogQSBwbHVnaW4gaXMgYSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aXRoIHRoZSBpbmRleCBhcyBpdHMgY29udGV4dC5cbiAqIFBsdWdpbnMgY2FuIGJlIHVzZWQgdG8gY3VzdG9taXNlIG9yIGV4dGVuZCB0aGUgYmVoYXZpb3VyIHRoZSBpbmRleFxuICogaW4gc29tZSB3YXkuIEEgcGx1Z2luIGlzIGp1c3QgYSBmdW5jdGlvbiwgdGhhdCBlbmNhcHN1bGF0ZWQgdGhlIGN1c3RvbVxuICogYmVoYXZpb3VyIHRoYXQgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIGluZGV4LlxuICpcbiAqIFRoZSBwbHVnaW4gZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgaW5kZXggYXMgaXRzIGFyZ3VtZW50LCBhZGRpdGlvbmFsXG4gKiBhcmd1bWVudHMgY2FuIGFsc28gYmUgcGFzc2VkIHdoZW4gY2FsbGluZyB1c2UuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZFxuICogd2l0aCB0aGUgaW5kZXggYXMgaXRzIGNvbnRleHQuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgdmFyIG15UGx1Z2luID0gZnVuY3Rpb24gKGlkeCwgYXJnMSwgYXJnMikge1xuICogICAgICAgLy8gYHRoaXNgIGlzIHRoZSBpbmRleCB0byBiZSBleHRlbmRlZFxuICogICAgICAgLy8gYXBwbHkgYW55IGV4dGVuc2lvbnMgZXRjIGhlcmUuXG4gKiAgICAgfVxuICpcbiAqICAgICB2YXIgaWR4ID0gbHVucihmdW5jdGlvbiAoKSB7XG4gKiAgICAgICB0aGlzLnVzZShteVBsdWdpbiwgJ2FyZzEnLCAnYXJnMicpXG4gKiAgICAgfSlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwbHVnaW4gVGhlIHBsdWdpbiB0byBhcHBseS5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICBhcmdzLnVuc2hpZnQodGhpcylcbiAgcGx1Z2luLmFwcGx5KHRoaXMsIGFyZ3MpXG59XG4vKiFcbiAqIGx1bnIuU3RvcmVcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuU3RvcmUgaXMgYSBzaW1wbGUga2V5LXZhbHVlIHN0b3JlIHVzZWQgZm9yIHN0b3Jpbmcgc2V0cyBvZiB0b2tlbnMgZm9yXG4gKiBkb2N1bWVudHMgc3RvcmVkIGluIGluZGV4LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQG1vZHVsZVxuICovXG5sdW5yLlN0b3JlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnN0b3JlID0ge31cbiAgdGhpcy5sZW5ndGggPSAwXG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgc3RvcmVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXNlZERhdGEgVGhlIHNlcmlhbGlzZWQgc3RvcmUgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLlN0b3JlfVxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkRGF0YSkge1xuICB2YXIgc3RvcmUgPSBuZXcgdGhpc1xuXG4gIHN0b3JlLmxlbmd0aCA9IHNlcmlhbGlzZWREYXRhLmxlbmd0aFxuICBzdG9yZS5zdG9yZSA9IE9iamVjdC5rZXlzKHNlcmlhbGlzZWREYXRhLnN0b3JlKS5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGtleSkge1xuICAgIG1lbW9ba2V5XSA9IGx1bnIuU29ydGVkU2V0LmxvYWQoc2VyaWFsaXNlZERhdGEuc3RvcmVba2V5XSlcbiAgICByZXR1cm4gbWVtb1xuICB9LCB7fSlcblxuICByZXR1cm4gc3RvcmVcbn1cblxuLyoqXG4gKiBTdG9yZXMgdGhlIGdpdmVuIHRva2VucyBpbiB0aGUgc3RvcmUgYWdhaW5zdCB0aGUgZ2l2ZW4gaWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGlkIFRoZSBrZXkgdXNlZCB0byBzdG9yZSB0aGUgdG9rZW5zIGFnYWluc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gdG9rZW5zIFRoZSB0b2tlbnMgdG8gc3RvcmUgYWdhaW5zdCB0aGUga2V5LlxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChpZCwgdG9rZW5zKSB7XG4gIGlmICghdGhpcy5oYXMoaWQpKSB0aGlzLmxlbmd0aCsrXG4gIHRoaXMuc3RvcmVbaWRdID0gdG9rZW5zXG59XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSB0b2tlbnMgZnJvbSB0aGUgc3RvcmUgZm9yIGEgZ2l2ZW4ga2V5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUga2V5IHRvIGxvb2t1cCBhbmQgcmV0cmlldmUgZnJvbSB0aGUgc3RvcmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpZCkge1xuICByZXR1cm4gdGhpcy5zdG9yZVtpZF1cbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgc3RvcmUgY29udGFpbnMgYSBrZXkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGlkIFRoZSBpZCB0byBsb29rIHVwIGluIHRoZSBzdG9yZS5cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChpZCkge1xuICByZXR1cm4gaWQgaW4gdGhpcy5zdG9yZVxufVxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIHZhbHVlIGZvciBhIGtleSBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGlkIFRoZSBpZCB0byByZW1vdmUgZnJvbSB0aGUgc3RvcmUuXG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGlkKSB7XG4gIGlmICghdGhpcy5oYXMoaWQpKSByZXR1cm5cblxuICBkZWxldGUgdGhpcy5zdG9yZVtpZF1cbiAgdGhpcy5sZW5ndGgtLVxufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc3RvcmUgcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgbGVuZ3RoOiB0aGlzLmxlbmd0aFxuICB9XG59XG5cbi8qIVxuICogbHVuci5zdGVtbWVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKiBJbmNsdWRlcyBjb2RlIGZyb20gLSBodHRwOi8vdGFydGFydXMub3JnL35tYXJ0aW4vUG9ydGVyU3RlbW1lci9qcy50eHRcbiAqL1xuXG4vKipcbiAqIGx1bnIuc3RlbW1lciBpcyBhbiBlbmdsaXNoIGxhbmd1YWdlIHN0ZW1tZXIsIHRoaXMgaXMgYSBKYXZhU2NyaXB0XG4gKiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUG9ydGVyU3RlbW1lciB0YWtlbiBmcm9tIGh0dHA6Ly90YXJ0YXJ1cy5vcmcvfm1hcnRpblxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBzdGVtXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQHNlZSBsdW5yLlBpcGVsaW5lXG4gKi9cbmx1bnIuc3RlbW1lciA9IChmdW5jdGlvbigpe1xuICB2YXIgc3RlcDJsaXN0ID0ge1xuICAgICAgXCJhdGlvbmFsXCIgOiBcImF0ZVwiLFxuICAgICAgXCJ0aW9uYWxcIiA6IFwidGlvblwiLFxuICAgICAgXCJlbmNpXCIgOiBcImVuY2VcIixcbiAgICAgIFwiYW5jaVwiIDogXCJhbmNlXCIsXG4gICAgICBcIml6ZXJcIiA6IFwiaXplXCIsXG4gICAgICBcImJsaVwiIDogXCJibGVcIixcbiAgICAgIFwiYWxsaVwiIDogXCJhbFwiLFxuICAgICAgXCJlbnRsaVwiIDogXCJlbnRcIixcbiAgICAgIFwiZWxpXCIgOiBcImVcIixcbiAgICAgIFwib3VzbGlcIiA6IFwib3VzXCIsXG4gICAgICBcIml6YXRpb25cIiA6IFwiaXplXCIsXG4gICAgICBcImF0aW9uXCIgOiBcImF0ZVwiLFxuICAgICAgXCJhdG9yXCIgOiBcImF0ZVwiLFxuICAgICAgXCJhbGlzbVwiIDogXCJhbFwiLFxuICAgICAgXCJpdmVuZXNzXCIgOiBcIml2ZVwiLFxuICAgICAgXCJmdWxuZXNzXCIgOiBcImZ1bFwiLFxuICAgICAgXCJvdXNuZXNzXCIgOiBcIm91c1wiLFxuICAgICAgXCJhbGl0aVwiIDogXCJhbFwiLFxuICAgICAgXCJpdml0aVwiIDogXCJpdmVcIixcbiAgICAgIFwiYmlsaXRpXCIgOiBcImJsZVwiLFxuICAgICAgXCJsb2dpXCIgOiBcImxvZ1wiXG4gICAgfSxcblxuICAgIHN0ZXAzbGlzdCA9IHtcbiAgICAgIFwiaWNhdGVcIiA6IFwiaWNcIixcbiAgICAgIFwiYXRpdmVcIiA6IFwiXCIsXG4gICAgICBcImFsaXplXCIgOiBcImFsXCIsXG4gICAgICBcImljaXRpXCIgOiBcImljXCIsXG4gICAgICBcImljYWxcIiA6IFwiaWNcIixcbiAgICAgIFwiZnVsXCIgOiBcIlwiLFxuICAgICAgXCJuZXNzXCIgOiBcIlwiXG4gICAgfSxcblxuICAgIGMgPSBcIlteYWVpb3VdXCIsICAgICAgICAgIC8vIGNvbnNvbmFudFxuICAgIHYgPSBcIlthZWlvdXldXCIsICAgICAgICAgIC8vIHZvd2VsXG4gICAgQyA9IGMgKyBcIlteYWVpb3V5XSpcIiwgICAgLy8gY29uc29uYW50IHNlcXVlbmNlXG4gICAgViA9IHYgKyBcIlthZWlvdV0qXCIsICAgICAgLy8gdm93ZWwgc2VxdWVuY2VcblxuICAgIG1ncjAgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgViArIEMsICAgICAgICAgICAgICAgLy8gW0NdVkMuLi4gaXMgbT4wXG4gICAgbWVxMSA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQyArIFwiKFwiICsgViArIFwiKT8kXCIsICAvLyBbQ11WQ1tWXSBpcyBtPTFcbiAgICBtZ3IxID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDICsgViArIEMsICAgICAgIC8vIFtDXVZDVkMuLi4gaXMgbT4xXG4gICAgc192ID0gXCJeKFwiICsgQyArIFwiKT9cIiArIHY7ICAgICAgICAgICAgICAgICAgIC8vIHZvd2VsIGluIHN0ZW1cblxuICB2YXIgcmVfbWdyMCA9IG5ldyBSZWdFeHAobWdyMCk7XG4gIHZhciByZV9tZ3IxID0gbmV3IFJlZ0V4cChtZ3IxKTtcbiAgdmFyIHJlX21lcTEgPSBuZXcgUmVnRXhwKG1lcTEpO1xuICB2YXIgcmVfc192ID0gbmV3IFJlZ0V4cChzX3YpO1xuXG4gIHZhciByZV8xYSA9IC9eKC4rPykoc3N8aSllcyQvO1xuICB2YXIgcmUyXzFhID0gL14oLis/KShbXnNdKXMkLztcbiAgdmFyIHJlXzFiID0gL14oLis/KWVlZCQvO1xuICB2YXIgcmUyXzFiID0gL14oLis/KShlZHxpbmcpJC87XG4gIHZhciByZV8xYl8yID0gLy4kLztcbiAgdmFyIHJlMl8xYl8yID0gLyhhdHxibHxpeikkLztcbiAgdmFyIHJlM18xYl8yID0gbmV3IFJlZ0V4cChcIihbXmFlaW91eWxzel0pXFxcXDEkXCIpO1xuICB2YXIgcmU0XzFiXzIgPSBuZXcgUmVnRXhwKFwiXlwiICsgQyArIHYgKyBcIlteYWVpb3V3eHldJFwiKTtcblxuICB2YXIgcmVfMWMgPSAvXiguKz9bXmFlaW91XSl5JC87XG4gIHZhciByZV8yID0gL14oLis/KShhdGlvbmFsfHRpb25hbHxlbmNpfGFuY2l8aXplcnxibGl8YWxsaXxlbnRsaXxlbGl8b3VzbGl8aXphdGlvbnxhdGlvbnxhdG9yfGFsaXNtfGl2ZW5lc3N8ZnVsbmVzc3xvdXNuZXNzfGFsaXRpfGl2aXRpfGJpbGl0aXxsb2dpKSQvO1xuXG4gIHZhciByZV8zID0gL14oLis/KShpY2F0ZXxhdGl2ZXxhbGl6ZXxpY2l0aXxpY2FsfGZ1bHxuZXNzKSQvO1xuXG4gIHZhciByZV80ID0gL14oLis/KShhbHxhbmNlfGVuY2V8ZXJ8aWN8YWJsZXxpYmxlfGFudHxlbWVudHxtZW50fGVudHxvdXxpc218YXRlfGl0aXxvdXN8aXZlfGl6ZSkkLztcbiAgdmFyIHJlMl80ID0gL14oLis/KShzfHQpKGlvbikkLztcblxuICB2YXIgcmVfNSA9IC9eKC4rPyllJC87XG4gIHZhciByZV81XzEgPSAvbGwkLztcbiAgdmFyIHJlM181ID0gbmV3IFJlZ0V4cChcIl5cIiArIEMgKyB2ICsgXCJbXmFlaW91d3h5XSRcIik7XG5cbiAgdmFyIHBvcnRlclN0ZW1tZXIgPSBmdW5jdGlvbiBwb3J0ZXJTdGVtbWVyKHcpIHtcbiAgICB2YXIgICBzdGVtLFxuICAgICAgc3VmZml4LFxuICAgICAgZmlyc3RjaCxcbiAgICAgIHJlLFxuICAgICAgcmUyLFxuICAgICAgcmUzLFxuICAgICAgcmU0O1xuXG4gICAgaWYgKHcubGVuZ3RoIDwgMykgeyByZXR1cm4gdzsgfVxuXG4gICAgZmlyc3RjaCA9IHcuc3Vic3RyKDAsMSk7XG4gICAgaWYgKGZpcnN0Y2ggPT0gXCJ5XCIpIHtcbiAgICAgIHcgPSBmaXJzdGNoLnRvVXBwZXJDYXNlKCkgKyB3LnN1YnN0cigxKTtcbiAgICB9XG5cbiAgICAvLyBTdGVwIDFhXG4gICAgcmUgPSByZV8xYVxuICAgIHJlMiA9IHJlMl8xYTtcblxuICAgIGlmIChyZS50ZXN0KHcpKSB7IHcgPSB3LnJlcGxhY2UocmUsXCIkMSQyXCIpOyB9XG4gICAgZWxzZSBpZiAocmUyLnRlc3QodykpIHsgdyA9IHcucmVwbGFjZShyZTIsXCIkMSQyXCIpOyB9XG5cbiAgICAvLyBTdGVwIDFiXG4gICAgcmUgPSByZV8xYjtcbiAgICByZTIgPSByZTJfMWI7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICByZSA9IHJlX21ncjA7XG4gICAgICBpZiAocmUudGVzdChmcFsxXSkpIHtcbiAgICAgICAgcmUgPSByZV8xYl8yO1xuICAgICAgICB3ID0gdy5yZXBsYWNlKHJlLFwiXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmUyLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlMi5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgcmUyID0gcmVfc192O1xuICAgICAgaWYgKHJlMi50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgICByZTIgPSByZTJfMWJfMjtcbiAgICAgICAgcmUzID0gcmUzXzFiXzI7XG4gICAgICAgIHJlNCA9IHJlNF8xYl8yO1xuICAgICAgICBpZiAocmUyLnRlc3QodykpIHsgIHcgPSB3ICsgXCJlXCI7IH1cbiAgICAgICAgZWxzZSBpZiAocmUzLnRlc3QodykpIHsgcmUgPSByZV8xYl8yOyB3ID0gdy5yZXBsYWNlKHJlLFwiXCIpOyB9XG4gICAgICAgIGVsc2UgaWYgKHJlNC50ZXN0KHcpKSB7IHcgPSB3ICsgXCJlXCI7IH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDFjIC0gcmVwbGFjZSBzdWZmaXggeSBvciBZIGJ5IGkgaWYgcHJlY2VkZWQgYnkgYSBub24tdm93ZWwgd2hpY2ggaXMgbm90IHRoZSBmaXJzdCBsZXR0ZXIgb2YgdGhlIHdvcmQgKHNvIGNyeSAtPiBjcmksIGJ5IC0+IGJ5LCBzYXkgLT4gc2F5KVxuICAgIHJlID0gcmVfMWM7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICB3ID0gc3RlbSArIFwiaVwiO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMlxuICAgIHJlID0gcmVfMjtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHN1ZmZpeCA9IGZwWzJdO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW0gKyBzdGVwMmxpc3Rbc3VmZml4XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDNcbiAgICByZSA9IHJlXzM7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICBzdWZmaXggPSBmcFsyXTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtICsgc3RlcDNsaXN0W3N1ZmZpeF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCA0XG4gICAgcmUgPSByZV80O1xuICAgIHJlMiA9IHJlMl80O1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgcmUgPSByZV9tZ3IxO1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZTIudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUyLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV0gKyBmcFsyXTtcbiAgICAgIHJlMiA9IHJlX21ncjE7XG4gICAgICBpZiAocmUyLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCA1XG4gICAgcmUgPSByZV81O1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgcmUgPSByZV9tZ3IxO1xuICAgICAgcmUyID0gcmVfbWVxMTtcbiAgICAgIHJlMyA9IHJlM181O1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkgfHwgKHJlMi50ZXN0KHN0ZW0pICYmICEocmUzLnRlc3Qoc3RlbSkpKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZSA9IHJlXzVfMTtcbiAgICByZTIgPSByZV9tZ3IxO1xuICAgIGlmIChyZS50ZXN0KHcpICYmIHJlMi50ZXN0KHcpKSB7XG4gICAgICByZSA9IHJlXzFiXzI7XG4gICAgICB3ID0gdy5yZXBsYWNlKHJlLFwiXCIpO1xuICAgIH1cblxuICAgIC8vIGFuZCB0dXJuIGluaXRpYWwgWSBiYWNrIHRvIHlcblxuICAgIGlmIChmaXJzdGNoID09IFwieVwiKSB7XG4gICAgICB3ID0gZmlyc3RjaC50b0xvd2VyQ2FzZSgpICsgdy5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHc7XG4gIH07XG5cbiAgcmV0dXJuIHBvcnRlclN0ZW1tZXI7XG59KSgpO1xuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci5zdGVtbWVyLCAnc3RlbW1lcicpXG4vKiFcbiAqIGx1bnIuc3RvcFdvcmRGaWx0ZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlciBidWlsZHMgYSBzdG9wV29yZEZpbHRlciBmdW5jdGlvbiBmcm9tIHRoZSBwcm92aWRlZFxuICogbGlzdCBvZiBzdG9wIHdvcmRzLlxuICpcbiAqIFRoZSBidWlsdCBpbiBsdW5yLnN0b3BXb3JkRmlsdGVyIGlzIGJ1aWx0IHVzaW5nIHRoaXMgZ2VuZXJhdG9yIGFuZCBjYW4gYmUgdXNlZFxuICogdG8gZ2VuZXJhdGUgY3VzdG9tIHN0b3BXb3JkRmlsdGVycyBmb3IgYXBwbGljYXRpb25zIG9yIG5vbiBFbmdsaXNoIGxhbmd1YWdlcy5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAcGFyYW0ge0FycmF5fSB0b2tlbiBUaGUgdG9rZW4gdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICogQHNlZSBsdW5yLnN0b3BXb3JkRmlsdGVyXG4gKi9cbmx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlciA9IGZ1bmN0aW9uIChzdG9wV29yZHMpIHtcbiAgdmFyIHdvcmRzID0gc3RvcFdvcmRzLnJlZHVjZShmdW5jdGlvbiAobWVtbywgc3RvcFdvcmQpIHtcbiAgICBtZW1vW3N0b3BXb3JkXSA9IHN0b3BXb3JkXG4gICAgcmV0dXJuIG1lbW9cbiAgfSwge30pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbikge1xuICAgIGlmICh0b2tlbiAmJiB3b3Jkc1t0b2tlbl0gIT09IHRva2VuKSByZXR1cm4gdG9rZW5cbiAgfVxufVxuXG4vKipcbiAqIGx1bnIuc3RvcFdvcmRGaWx0ZXIgaXMgYW4gRW5nbGlzaCBsYW5ndWFnZSBzdG9wIHdvcmQgbGlzdCBmaWx0ZXIsIGFueSB3b3Jkc1xuICogY29udGFpbmVkIGluIHRoZSBsaXN0IHdpbGwgbm90IGJlIHBhc3NlZCB0aHJvdWdoIHRoZSBmaWx0ZXIuXG4gKlxuICogVGhpcyBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGluIHRoZSBQaXBlbGluZS4gSWYgdGhlIHRva2VuIGRvZXMgbm90IHBhc3MgdGhlXG4gKiBmaWx0ZXIgdGhlbiB1bmRlZmluZWQgd2lsbCBiZSByZXR1cm5lZC5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIHBhc3MgdGhyb3VnaCB0aGUgZmlsdGVyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQHNlZSBsdW5yLlBpcGVsaW5lXG4gKi9cbmx1bnIuc3RvcFdvcmRGaWx0ZXIgPSBsdW5yLmdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIoW1xuICAnYScsXG4gICdhYmxlJyxcbiAgJ2Fib3V0JyxcbiAgJ2Fjcm9zcycsXG4gICdhZnRlcicsXG4gICdhbGwnLFxuICAnYWxtb3N0JyxcbiAgJ2Fsc28nLFxuICAnYW0nLFxuICAnYW1vbmcnLFxuICAnYW4nLFxuICAnYW5kJyxcbiAgJ2FueScsXG4gICdhcmUnLFxuICAnYXMnLFxuICAnYXQnLFxuICAnYmUnLFxuICAnYmVjYXVzZScsXG4gICdiZWVuJyxcbiAgJ2J1dCcsXG4gICdieScsXG4gICdjYW4nLFxuICAnY2Fubm90JyxcbiAgJ2NvdWxkJyxcbiAgJ2RlYXInLFxuICAnZGlkJyxcbiAgJ2RvJyxcbiAgJ2RvZXMnLFxuICAnZWl0aGVyJyxcbiAgJ2Vsc2UnLFxuICAnZXZlcicsXG4gICdldmVyeScsXG4gICdmb3InLFxuICAnZnJvbScsXG4gICdnZXQnLFxuICAnZ290JyxcbiAgJ2hhZCcsXG4gICdoYXMnLFxuICAnaGF2ZScsXG4gICdoZScsXG4gICdoZXInLFxuICAnaGVycycsXG4gICdoaW0nLFxuICAnaGlzJyxcbiAgJ2hvdycsXG4gICdob3dldmVyJyxcbiAgJ2knLFxuICAnaWYnLFxuICAnaW4nLFxuICAnaW50bycsXG4gICdpcycsXG4gICdpdCcsXG4gICdpdHMnLFxuICAnanVzdCcsXG4gICdsZWFzdCcsXG4gICdsZXQnLFxuICAnbGlrZScsXG4gICdsaWtlbHknLFxuICAnbWF5JyxcbiAgJ21lJyxcbiAgJ21pZ2h0JyxcbiAgJ21vc3QnLFxuICAnbXVzdCcsXG4gICdteScsXG4gICduZWl0aGVyJyxcbiAgJ25vJyxcbiAgJ25vcicsXG4gICdub3QnLFxuICAnb2YnLFxuICAnb2ZmJyxcbiAgJ29mdGVuJyxcbiAgJ29uJyxcbiAgJ29ubHknLFxuICAnb3InLFxuICAnb3RoZXInLFxuICAnb3VyJyxcbiAgJ293bicsXG4gICdyYXRoZXInLFxuICAnc2FpZCcsXG4gICdzYXknLFxuICAnc2F5cycsXG4gICdzaGUnLFxuICAnc2hvdWxkJyxcbiAgJ3NpbmNlJyxcbiAgJ3NvJyxcbiAgJ3NvbWUnLFxuICAndGhhbicsXG4gICd0aGF0JyxcbiAgJ3RoZScsXG4gICd0aGVpcicsXG4gICd0aGVtJyxcbiAgJ3RoZW4nLFxuICAndGhlcmUnLFxuICAndGhlc2UnLFxuICAndGhleScsXG4gICd0aGlzJyxcbiAgJ3RpcycsXG4gICd0bycsXG4gICd0b28nLFxuICAndHdhcycsXG4gICd1cycsXG4gICd3YW50cycsXG4gICd3YXMnLFxuICAnd2UnLFxuICAnd2VyZScsXG4gICd3aGF0JyxcbiAgJ3doZW4nLFxuICAnd2hlcmUnLFxuICAnd2hpY2gnLFxuICAnd2hpbGUnLFxuICAnd2hvJyxcbiAgJ3dob20nLFxuICAnd2h5JyxcbiAgJ3dpbGwnLFxuICAnd2l0aCcsXG4gICd3b3VsZCcsXG4gICd5ZXQnLFxuICAneW91JyxcbiAgJ3lvdXInXG5dKVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci5zdG9wV29yZEZpbHRlciwgJ3N0b3BXb3JkRmlsdGVyJylcbi8qIVxuICogbHVuci50cmltbWVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLnRyaW1tZXIgaXMgYSBwaXBlbGluZSBmdW5jdGlvbiBmb3IgdHJpbW1pbmcgbm9uIHdvcmRcbiAqIGNoYXJhY3RlcnMgZnJvbSB0aGUgYmVnaW5pbmcgYW5kIGVuZCBvZiB0b2tlbnMgYmVmb3JlIHRoZXlcbiAqIGVudGVyIHRoZSBpbmRleC5cbiAqXG4gKiBUaGlzIGltcGxlbWVudGF0aW9uIG1heSBub3Qgd29yayBjb3JyZWN0bHkgZm9yIG5vbiBsYXRpblxuICogY2hhcmFjdGVycyBhbmQgc2hvdWxkIGVpdGhlciBiZSByZW1vdmVkIG9yIGFkYXB0ZWQgZm9yIHVzZVxuICogd2l0aCBsYW5ndWFnZXMgd2l0aCBub24tbGF0aW4gY2hhcmFjdGVycy5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIHBhc3MgdGhyb3VnaCB0aGUgZmlsdGVyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQHNlZSBsdW5yLlBpcGVsaW5lXG4gKi9cbmx1bnIudHJpbW1lciA9IGZ1bmN0aW9uICh0b2tlbikge1xuICByZXR1cm4gdG9rZW4ucmVwbGFjZSgvXlxcVysvLCAnJykucmVwbGFjZSgvXFxXKyQvLCAnJylcbn1cblxubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uKGx1bnIudHJpbW1lciwgJ3RyaW1tZXInKVxuLyohXG4gKiBsdW5yLnN0ZW1tZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqIEluY2x1ZGVzIGNvZGUgZnJvbSAtIGh0dHA6Ly90YXJ0YXJ1cy5vcmcvfm1hcnRpbi9Qb3J0ZXJTdGVtbWVyL2pzLnR4dFxuICovXG5cbi8qKlxuICogbHVuci5Ub2tlblN0b3JlIGlzIHVzZWQgZm9yIGVmZmljaWVudCBzdG9yaW5nIGFuZCBsb29rdXAgb2YgdGhlIHJldmVyc2VcbiAqIGluZGV4IG9mIHRva2VuIHRvIGRvY3VtZW50IHJlZi5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5Ub2tlblN0b3JlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJvb3QgPSB7IGRvY3M6IHt9IH1cbiAgdGhpcy5sZW5ndGggPSAwXG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgdG9rZW4gc3RvcmVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXNlZERhdGEgVGhlIHNlcmlhbGlzZWQgdG9rZW4gc3RvcmUgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLlRva2VuU3RvcmV9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkRGF0YSkge1xuICB2YXIgc3RvcmUgPSBuZXcgdGhpc1xuXG4gIHN0b3JlLnJvb3QgPSBzZXJpYWxpc2VkRGF0YS5yb290XG4gIHN0b3JlLmxlbmd0aCA9IHNlcmlhbGlzZWREYXRhLmxlbmd0aFxuXG4gIHJldHVybiBzdG9yZVxufVxuXG4vKipcbiAqIEFkZHMgYSBuZXcgdG9rZW4gZG9jIHBhaXIgdG8gdGhlIHN0b3JlLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhpcyBmdW5jdGlvbiBzdGFydHMgYXQgdGhlIHJvb3Qgb2YgdGhlIGN1cnJlbnQgc3RvcmUsIGhvd2V2ZXJcbiAqIGl0IGNhbiBzdGFydCBhdCBhbnkgbm9kZSBvZiBhbnkgdG9rZW4gc3RvcmUgaWYgcmVxdWlyZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBzdG9yZSB0aGUgZG9jIHVuZGVyXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIFRoZSBkb2MgdG8gc3RvcmUgYWdhaW5zdCB0aGUgdG9rZW5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnQgbG9va2luZyBmb3IgdGhlXG4gKiBjb3JyZWN0IHBsYWNlIHRvIGVudGVyIHRoZSBkb2MsIGJ5IGRlZmF1bHQgdGhlIHJvb3Qgb2YgdGhpcyBsdW5yLlRva2VuU3RvcmVcbiAqIGlzIHVzZWQuXG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0b2tlbiwgZG9jLCByb290KSB7XG4gIHZhciByb290ID0gcm9vdCB8fCB0aGlzLnJvb3QsXG4gICAgICBrZXkgPSB0b2tlbi5jaGFyQXQoMCksXG4gICAgICByZXN0ID0gdG9rZW4uc2xpY2UoMSlcblxuICBpZiAoIShrZXkgaW4gcm9vdCkpIHJvb3Rba2V5XSA9IHtkb2NzOiB7fX1cblxuICBpZiAocmVzdC5sZW5ndGggPT09IDApIHtcbiAgICByb290W2tleV0uZG9jc1tkb2MucmVmXSA9IGRvY1xuICAgIHRoaXMubGVuZ3RoICs9IDFcbiAgICByZXR1cm5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5hZGQocmVzdCwgZG9jLCByb290W2tleV0pXG4gIH1cbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGlzIGtleSBpcyBjb250YWluZWQgd2l0aGluIHRoaXMgbHVuci5Ub2tlblN0b3JlLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhpcyBmdW5jdGlvbiBzdGFydHMgYXQgdGhlIHJvb3Qgb2YgdGhlIGN1cnJlbnQgc3RvcmUsIGhvd2V2ZXJcbiAqIGl0IGNhbiBzdGFydCBhdCBhbnkgbm9kZSBvZiBhbnkgdG9rZW4gc3RvcmUgaWYgcmVxdWlyZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBjaGVjayBmb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnRcbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIGlmICghdG9rZW4pIHJldHVybiBmYWxzZVxuXG4gIHZhciBub2RlID0gdGhpcy5yb290XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbi5sZW5ndGg7IGkrKykge1xuICAgIGlmICghbm9kZVt0b2tlbi5jaGFyQXQoaSldKSByZXR1cm4gZmFsc2VcblxuICAgIG5vZGUgPSBub2RlW3Rva2VuLmNoYXJBdChpKV1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbi8qKlxuICogUmV0cmlldmUgYSBub2RlIGZyb20gdGhlIHRva2VuIHN0b3JlIGZvciBhIGdpdmVuIHRva2VuLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhpcyBmdW5jdGlvbiBzdGFydHMgYXQgdGhlIHJvb3Qgb2YgdGhlIGN1cnJlbnQgc3RvcmUsIGhvd2V2ZXJcbiAqIGl0IGNhbiBzdGFydCBhdCBhbnkgbm9kZSBvZiBhbnkgdG9rZW4gc3RvcmUgaWYgcmVxdWlyZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBnZXQgdGhlIG5vZGUgZm9yLlxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAc2VlIFRva2VuU3RvcmUucHJvdG90eXBlLmdldFxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5nZXROb2RlID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIGlmICghdG9rZW4pIHJldHVybiB7fVxuXG4gIHZhciBub2RlID0gdGhpcy5yb290XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbi5sZW5ndGg7IGkrKykge1xuICAgIGlmICghbm9kZVt0b2tlbi5jaGFyQXQoaSldKSByZXR1cm4ge31cblxuICAgIG5vZGUgPSBub2RlW3Rva2VuLmNoYXJBdChpKV1cbiAgfVxuXG4gIHJldHVybiBub2RlXG59XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGRvY3VtZW50cyBmb3IgYSBub2RlIGZvciB0aGUgZ2l2ZW4gdG9rZW4uXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGdldCB0aGUgZG9jdW1lbnRzIGZvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAodG9rZW4sIHJvb3QpIHtcbiAgcmV0dXJuIHRoaXMuZ2V0Tm9kZSh0b2tlbiwgcm9vdCkuZG9jcyB8fCB7fVxufVxuXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24gKHRva2VuLCByb290KSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmdldCh0b2tlbiwgcm9vdCkpLmxlbmd0aFxufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgZG9jdW1lbnQgaWRlbnRpZmllZCBieSByZWYgZnJvbSB0aGUgdG9rZW4gaW4gdGhlIHN0b3JlLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhpcyBmdW5jdGlvbiBzdGFydHMgYXQgdGhlIHJvb3Qgb2YgdGhlIGN1cnJlbnQgc3RvcmUsIGhvd2V2ZXJcbiAqIGl0IGNhbiBzdGFydCBhdCBhbnkgbm9kZSBvZiBhbnkgdG9rZW4gc3RvcmUgaWYgcmVxdWlyZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBnZXQgdGhlIGRvY3VtZW50cyBmb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVmIFRoZSByZWYgb2YgdGhlIGRvY3VtZW50IHRvIHJlbW92ZSBmcm9tIHRoaXMgdG9rZW4uXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0LlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHRva2VuLCByZWYpIHtcbiAgaWYgKCF0b2tlbikgcmV0dXJuXG4gIHZhciBub2RlID0gdGhpcy5yb290XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbi5sZW5ndGg7IGkrKykge1xuICAgIGlmICghKHRva2VuLmNoYXJBdChpKSBpbiBub2RlKSkgcmV0dXJuXG4gICAgbm9kZSA9IG5vZGVbdG9rZW4uY2hhckF0KGkpXVxuICB9XG5cbiAgZGVsZXRlIG5vZGUuZG9jc1tyZWZdXG59XG5cbi8qKlxuICogRmluZCBhbGwgdGhlIHBvc3NpYmxlIHN1ZmZpeGVzIG9mIHRoZSBwYXNzZWQgdG9rZW4gdXNpbmcgdG9rZW5zXG4gKiBjdXJyZW50bHkgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gZXhwYW5kLlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5leHBhbmQgPSBmdW5jdGlvbiAodG9rZW4sIG1lbW8pIHtcbiAgdmFyIHJvb3QgPSB0aGlzLmdldE5vZGUodG9rZW4pLFxuICAgICAgZG9jcyA9IHJvb3QuZG9jcyB8fCB7fSxcbiAgICAgIG1lbW8gPSBtZW1vIHx8IFtdXG5cbiAgaWYgKE9iamVjdC5rZXlzKGRvY3MpLmxlbmd0aCkgbWVtby5wdXNoKHRva2VuKVxuXG4gIE9iamVjdC5rZXlzKHJvb3QpXG4gICAgLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKGtleSA9PT0gJ2RvY3MnKSByZXR1cm5cblxuICAgICAgbWVtby5jb25jYXQodGhpcy5leHBhbmQodG9rZW4gKyBrZXksIG1lbW8pKVxuICAgIH0sIHRoaXMpXG5cbiAgcmV0dXJuIG1lbW9cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRva2VuIHN0b3JlIHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICByb290OiB0aGlzLnJvb3QsXG4gICAgbGVuZ3RoOiB0aGlzLmxlbmd0aFxuICB9XG59XG5cbiAgLyoqXG4gICAqIGV4cG9ydCB0aGUgbW9kdWxlIHZpYSBBTUQsIENvbW1vbkpTIG9yIGFzIGEgYnJvd3NlciBnbG9iYWxcbiAgICogRXhwb3J0IGNvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdW1kanMvdW1kL2Jsb2IvbWFzdGVyL3JldHVybkV4cG9ydHMuanNcbiAgICovXG4gIDsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICBkZWZpbmUoZmFjdG9yeSlcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgLyoqXG4gICAgICAgKiBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAgICAqIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgICAgKiBsaWtlIE5vZGUuXG4gICAgICAgKi9cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEJyb3dzZXIgZ2xvYmFscyAocm9vdCBpcyB3aW5kb3cpXG4gICAgICByb290Lmx1bnIgPSBmYWN0b3J5KClcbiAgICB9XG4gIH0odGhpcywgZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEp1c3QgcmV0dXJuIGEgdmFsdWUgdG8gZGVmaW5lIHRoZSBtb2R1bGUgZXhwb3J0LlxuICAgICAqIFRoaXMgZXhhbXBsZSByZXR1cm5zIGFuIG9iamVjdCwgYnV0IHRoZSBtb2R1bGVcbiAgICAgKiBjYW4gcmV0dXJuIGEgZnVuY3Rpb24gYXMgdGhlIGV4cG9ydGVkIHZhbHVlLlxuICAgICAqL1xuICAgIHJldHVybiBsdW5yXG4gIH0pKVxufSkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vbHVuci9sdW5yLmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcclxuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xyXG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XHJcbmltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIjtcclxuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xyXG5cclxuLyoqXHJcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxyXG4gKi9cclxuY29uc3QgQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCA9ICdkYXRhLWlkJztcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuXHJcbi8qKlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBpZiBhbiBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXHJcbiAqL1xyXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGVsZW1lbnQsIHZpc2libGUpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBlbXB0eVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuY29uc3QgaXNFbXB0eSA9ICh0ZXh0KSA9PiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSAmJiAodGV4dC5sZW5ndGggPT09IDApO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsVmlldyB7XHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgLy8gYmFjayBidXR0b25cclxuICAgIGNvbnN0IGJhY2tCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBiYWNrQnV0dG9uRWxlbWVudC5jbGFzc05hbWUgPSAnYmFjay1idXR0b24gaWNvbi1hcnJvdy10aGljayc7XHJcbiAgICByZWxheUNsaWNrRXZlbnRBcygnY2xvc2UnLCB0aGlzLCBiYWNrQnV0dG9uRWxlbWVudCk7XHJcblxyXG4gICAgLy8gaW1hZ2VcclxuICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIHRoaXMuaW1hZ2UuY2xhc3NOYW1lID0gJ2ltZy1yZXNwb25zaXZlJztcclxuXHJcbiAgICBjb25zdCBpbWFnZVdyYXBwZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpbWFnZVdyYXBwZXJFbGVtZW50LmNsYXNzTmFtZSA9ICdpbWFnZS13cmFwcGVyJztcclxuICAgIGltYWdlV3JhcHBlckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pbWFnZSk7XHJcblxyXG4gICAgLy8gdGl0bGVcclxuICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xyXG5cclxuICAgIC8vIGF1dGhvclxyXG4gICAgdGhpcy5hdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuYXV0aG9yLmNsYXNzTmFtZSA9ICdhdXRob3InO1xyXG4gICAgdGhpcy5hdXRob3IuaW5uZXJIVE1MID0gJ2J5IEpvdWJlbCc7IC8vIFRPRE8gTWFrZSBkeW5hbWljXHJcblxyXG4gICAgLy8gZGVzY3JpcHRpb25cclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uLmNsYXNzTmFtZSA9ICdzbWFsbCc7XHJcblxyXG4gICAgLy8gZGVtbyBidXR0b25cclxuICAgIHRoaXMuZGVtb0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIHRoaXMuZGVtb0J1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcclxuICAgIHRoaXMuZGVtb0J1dHRvbi5pbm5lckhUTUwgPSAnQ29udGVudCBEZW1vJztcclxuICAgIHRoaXMuZGVtb0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcclxuICAgIGhpZGUodGhpcy5kZW1vQnV0dG9uKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0RGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGV4dERldGFpbHMuY2xhc3NOYW1lID0gJ3RleHQtZGV0YWlscyc7XHJcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcclxuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMuYXV0aG9yKTtcclxuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMuZGVzY3JpcHRpb24pO1xyXG4gICAgdGV4dERldGFpbHMuYXBwZW5kQ2hpbGQodGhpcy5kZW1vQnV0dG9uKTtcclxuXHJcbiAgICBjb25zdCBkZXRhaWxzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGV0YWlsc0VsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XHJcbiAgICBkZXRhaWxzRWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZVdyYXBwZXJFbGVtZW50KTtcclxuICAgIGRldGFpbHNFbGVtZW50LmFwcGVuZENoaWxkKHRleHREZXRhaWxzKTtcclxuXHJcbiAgICAvLyB1c2UgYnV0dG9uXHJcbiAgICB0aGlzLnVzZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHRoaXMudXNlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24gYnV0dG9uLXByaW1hcnknO1xyXG4gICAgdGhpcy51c2VCdXR0b24uaW5uZXJIVE1MID0gJ1VzZSc7XHJcbiAgICBoaWRlKHRoaXMudXNlQnV0dG9uKTtcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XHJcblxyXG4gICAgLy8gaW5zdGFsbCBidXR0b25cclxuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnknO1xyXG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLmlubmVySFRNTCA9ICdJbnN0YWxsJztcclxuICAgIGhpZGUodGhpcy5pbnN0YWxsQnV0dG9uKTtcclxuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdpbnN0YWxsJywgdGhpcywgdGhpcy5pbnN0YWxsQnV0dG9uKTtcclxuXHJcbiAgICBjb25zdCBidXR0b25CYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJ1dHRvbkJhci5jbGFzc05hbWUgPSAnYnV0dG9uLWJhcic7XHJcbiAgICBidXR0b25CYXIuYXBwZW5kQ2hpbGQodGhpcy51c2VCdXR0b24pO1xyXG4gICAgYnV0dG9uQmFyLmFwcGVuZENoaWxkKHRoaXMuaW5zdGFsbEJ1dHRvbik7XHJcblxyXG4gICAgLy8gbGljZW5jZSBwYW5lbFxyXG4gICAgY29uc3QgbGljZW5jZVBhbmVsID0gdGhpcy5jcmVhdGVQYW5lbCgnVGhlIExpY2VuY2UgSW5mbycsICdpcHN1bSBsb3J1bScsICdsaWNlbmNlLXBhbmVsJyk7XHJcbiAgICBjb25zdCBwbHVnaW5zUGFuZWwgPSB0aGlzLmNyZWF0ZVBhbmVsKCdBdmFpbGFibGUgcGx1Z2lucycsICdpcHN1bSBsb3J1bScsICdwbHVnaW5zLXBhbmVsJyk7XHJcbiAgICBjb25zdCBwdWJsaXNoZXJQYW5lbCA9IHRoaXMuY3JlYXRlUGFuZWwoJ1B1Ymxpc2hlciBJbmZvJywgJ2lwc3VtIGxvcnVtJywgJ3B1Ymxpc2hlci1wYW5lbCcpO1xyXG5cclxuICAgIC8vIHBhbmVsIGdyb3VwXHJcbiAgICBjb25zdCBwYW5lbEdyb3VwRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcGFuZWxHcm91cEVsZW1lbnQuY2xhc3NOYW1lID0gJ3BhbmVsLWdyb3VwJztcclxuICAgIHBhbmVsR3JvdXBFbGVtZW50LmFwcGVuZENoaWxkKGxpY2VuY2VQYW5lbCk7XHJcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5hcHBlbmRDaGlsZChwbHVnaW5zUGFuZWwpO1xyXG4gICAgcGFuZWxHcm91cEVsZW1lbnQuYXBwZW5kQ2hpbGQocHVibGlzaGVyUGFuZWwpO1xyXG5cclxuICAgIC8vIGFkZCByb290IGVsZW1lbnRcclxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoYmFja0J1dHRvbkVsZW1lbnQpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChkZXRhaWxzRWxlbWVudCk7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkJhcik7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHBhbmVsR3JvdXBFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBwYW5lbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keUlkXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBjcmVhdGVQYW5lbCh0aXRsZSwgYm9keSwgYm9keUlkKSB7XHJcbiAgICBjb25zdCBoZWFkZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaGVhZGVyRWwuY2xhc3NOYW1lID0gJ3BhbmVsLWhlYWRlcic7XHJcbiAgICBoZWFkZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcclxuICAgIGhlYWRlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGJvZHlJZCk7XHJcbiAgICBoZWFkZXJFbC5pbm5lckhUTUwgPSB0aXRsZTtcclxuXHJcbiAgICBjb25zdCBib2R5SW5uZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYm9keUlubmVyRWwuY2xhc3NOYW1lID0gJ3BhbmVsLWJvZHktaW5uZXInO1xyXG4gICAgYm9keUlubmVyRWwuaW5uZXJIVE1MID0gYm9keTtcclxuXHJcbiAgICBjb25zdCBib2R5RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJvZHlFbC5jbGFzc05hbWUgPSAncGFuZWwtYm9keSc7XHJcbiAgICBib2R5RWwuaWQgPSBib2R5SWQ7XHJcbiAgICBib2R5RWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcbiAgICBib2R5RWwuYXBwZW5kQ2hpbGQoYm9keUlubmVyRWwpO1xyXG5cclxuICAgIGNvbnN0IHBhbmVsRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHBhbmVsRWwuY2xhc3NOYW1lID0gJ3BhbmVsJztcclxuICAgIHBhbmVsRWwuYXBwZW5kQ2hpbGQoaGVhZGVyRWwpO1xyXG4gICAgcGFuZWxFbC5hcHBlbmRDaGlsZChib2R5RWwpO1xyXG5cclxuICAgIGluaXRQYW5lbChwYW5lbEVsKTtcclxuXHJcbiAgICByZXR1cm4gcGFuZWxFbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGltYWdlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3JjXHJcbiAgICovXHJcbiAgc2V0SW1hZ2Uoc3JjKSB7XHJcbiAgICB0aGlzLmltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHRpdGxlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBzZXRJZChpZCkge1xyXG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XHJcbiAgICB0aGlzLnVzZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdGl0bGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxyXG4gICAqL1xyXG4gIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgbG9uZyBkZXNjcmlwdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgKi9cclxuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IHRleHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBleGFtcGxlIHVybFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxyXG4gICAqL1xyXG4gIHNldEV4YW1wbGUodXJsKSB7XHJcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XHJcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuZGVtb0J1dHRvbiwgIWlzRW1wdHkodXJsKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGlmIHRoZSBjb250ZW50IHR5cGUgaXMgaW5zdGFsbGVkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluc3RhbGxlZFxyXG4gICAqL1xyXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xyXG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLnVzZUJ1dHRvbiwgaW5zdGFsbGVkKTtcclxuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy5pbnN0YWxsQnV0dG9uLCAhaW5zdGFsbGVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICBoaWRlKCkge1xyXG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICBzaG93KCkge1xyXG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xyXG4gIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVEZXRhaWxWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlld1wiO1xyXG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSBcIi4uL2h1Yi1zZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XHJcblxyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWwge1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIHNlcnZpY2VzXHJcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcclxuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gdmlld3NcclxuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlRGV0YWlsVmlldyhzdGF0ZSk7XHJcbiAgICB0aGlzLnZpZXcub24oJ2luc3RhbGwnLCB0aGlzLmluc3RhbGwsIHRoaXMpO1xyXG5cclxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcclxuICAgIHRoaXMucHJvcGFnYXRlKFsnY2xvc2UnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlcyB0aGUgZGV0YWlsIHZpZXdcclxuICAgKi9cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy52aWV3LmhpZGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRoZSBkZXRhaWwgdmlld1xyXG4gICAqL1xyXG4gIHNob3coKSB7XHJcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxyXG4gICAqL1xyXG4gIGxvYWRCeUlkKGlkKSB7XHJcbiAgICB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxyXG4gICAgICAudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxyXG4gICAqL1xyXG4gICBpbnN0YWxsKHtpZH0pIHtcclxuICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcclxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKVxyXG4gICAgICAgLnRoZW4obWFjaGluZU5hbWUgPT4gdGhpcy5zZXJ2aWNlcy5pbnN0YWxsQ29udGVudFR5cGUobWFjaGluZU5hbWUpKVxyXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gY29uc29sZS5kZWJ1ZygnVE9ETywgZ3VpIHVwZGF0ZXMnKSlcclxuICAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGNvbnRlbnQgdHlwZSBkYXRhXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxyXG4gICAqL1xyXG4gIHVwZGF0ZShjb250ZW50VHlwZSkge1xyXG4gICAgdGhpcy52aWV3LnNldElkKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcclxuICAgIHRoaXMudmlldy5zZXRUaXRsZShjb250ZW50VHlwZS50aXRsZSk7XHJcbiAgICB0aGlzLnZpZXcuc2V0RGVzY3JpcHRpb24oY29udGVudFR5cGUuZGVzY3JpcHRpb24pO1xyXG4gICAgdGhpcy52aWV3LnNldEltYWdlKGNvbnRlbnRUeXBlLmljb24pO1xyXG4gICAgdGhpcy52aWV3LnNldEV4YW1wbGUoY29udGVudFR5cGUuZXhhbXBsZSk7XHJcbiAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQoISFjb250ZW50VHlwZS5pbnN0YWxsZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xyXG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XHJcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcclxuXHJcbi8qKlxyXG4gKiBAY29uc3RhbnQge3N0cmluZ31cclxuICovXHJcbmNvbnN0IEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQgPSAnZGF0YS1pZCc7XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzc1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdFZpZXcge1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcblxyXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgcm9vdCBlbGVtZW50XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1saXN0JztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICBoaWRlKCkge1xyXG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcclxuICAgKi9cclxuICBzaG93KCkge1xyXG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcclxuICAgKi9cclxuICB1cGRhdGVMaXN0KGNvbnRlbnRUeXBlcykge1xyXG4gICAgaWYodGhpcy5yb290RWxlbWVudCl7XHJcbiAgICAgIHdoaWxlKHRoaXMucm9vdEVsZW1lbnQuZmlyc3RDaGlsZCApe1xyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5yb290RWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyQ29udGVudFR5cGVMaXN0KGNvbnRlbnRUeXBlcylcclxuICAgICAgLmZvckVhY2goY29udGVudFR5cGUgPT4gdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChjb250ZW50VHlwZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwbGllcyBjcmVhdGUgcm93cywgYW5kIGFkZCB0byB0aGUgbGlzdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XHJcbiAgICovXHJcbiAgcmVuZGVyQ29udGVudFR5cGVMaXN0KGNvbnRlbnRUeXBlcykge1xyXG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlc1xyXG4gICAgICAubWFwKGNvbnRlbnRUeXBlID0+IHRoaXMuY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUpKVxyXG4gICAgICAubWFwKHJlbGF5Q2xpY2tFdmVudEFzKCdyb3ctc2VsZWN0ZWQnLCB0aGlzKSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRha2VzIGEgQ29udGVudCBUeXBlIGNvbmZpZ3VyYXRpb24gYW5kIGNyZWF0ZXMgYSByb3cgZG9tXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUpIHtcclxuICAgIC8vIGltYWdlXHJcbiAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1hZ2UuY2xhc3NOYW1lID0gJ2ltZy1yZXNwb25zaXZlJztcclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgY29udGVudFR5cGUuaWNvbik7XHJcblxyXG4gICAgLy8gdGl0bGVcclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgIHRpdGxlLmlubmVySFRNTCA9IGNvbnRlbnRUeXBlLnRpdGxlO1xyXG5cclxuICAgIC8vIGRlc2NyaXB0aW9uXHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGVzY3JpcHRpb24uY2xhc3NOYW1lID0gJ2Rlc2NyaXB0aW9uJztcclxuICAgIGRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGNvbnRlbnRUeXBlLnN1bW1hcnk7XHJcblxyXG4gICAgLy8gbGlzdCBpdGVtXHJcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgcm93LmlkID0gYGNvbnRlbnQtdHlwZS0ke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfWA7XHJcbiAgICByb3cuc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcclxuICAgIHJvdy5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbiAgICByb3cuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVCdXR0b25FbGVtZW50KGNvbnRlbnRUeXBlKSk7XHJcbiAgICByb3cuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgcm93LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gcm93O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxyXG4gICAqL1xyXG4gIGNyZWF0ZUJ1dHRvbkVsZW1lbnQoY29udGVudFR5cGUpIHtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHJcbiAgICBpZihjb250ZW50VHlwZS5pbnN0YWxsZWQpIHtcclxuICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwiYnV0dG9uIGJ1dHRvbi1wcmltYXJ5XCI7XHJcbiAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIlVzZVwiO1xyXG4gICAgICBidXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcclxuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHRoaXMsIGJ1dHRvbik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwiYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnlcIjtcclxuICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiR2V0XCI7XHJcbiAgICAgIC8vIG5vIGZ1bmN0aW9uYWxpdHksIHVzZXMgY2xpY2sgZXZlbnQgb24gcm93XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJ1dHRvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVMaXN0VmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtbGlzdC12aWV3XCI7XHJcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XHJcblxyXG4vKipcclxuICogUm93IHNlbGVjdGVkIGV2ZW50XHJcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXHJcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XHJcbiAqL1xyXG4vKipcclxuICogQGNsYXNzXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKlxyXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxyXG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0IHtcclxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xyXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIHZpZXdcclxuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlTGlzdFZpZXcoc3RhdGUpO1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWydyb3ctc2VsZWN0ZWQnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlIHRoaXMgZWxlbWVudFxyXG4gICAqL1xyXG4gIGhpZGUoKSB7XHJcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyB0aGlzIGVsZW1lbnRcclxuICAgKi9cclxuICBzaG93KCkge1xyXG4gICAgdGhpcy52aWV3LnNob3coKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCB3aXRoIG5ldyBjb250ZW50IHR5cGVzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xyXG4gICAqL1xyXG4gIHVwZGF0ZShjb250ZW50VHlwZXMpIHtcclxuICAgIHRoaXMudmlldy51cGRhdGVMaXN0KGNvbnRlbnRUeXBlcyk7XHJcbiAgICB0aGlzLmZpcmUoJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHt9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHZpZXdzIHJvb3QgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsImltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIENvbnRlbnRCcm93c2VyVmlld1xyXG4gKiBAbWl4ZXMgRXZlbnRmdWxcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRCcm93c2VyVmlldyB7XHJcbiAgLyoqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRzXHJcbiAgICBjb25zdCBtZW51ID0gdGhpcy5jcmVhdGVNZW51RWxlbWVudCgpO1xyXG4gICAgY29uc3QgaW5wdXRHcm91cCA9IHRoaXMuY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQoKTtcclxuXHJcbiAgICAvLyBtZW51IGdyb3VwXHJcbiAgICBjb25zdCBtZW51R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG1lbnVHcm91cC5jbGFzc05hbWUgPSAnbWVudS1ncm91cCc7XHJcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQobWVudSk7XHJcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRHcm91cCk7XHJcblxyXG4gICAgLy8gcm9vdCBlbGVtZW50XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50ICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChtZW51R3JvdXApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIG1lbnUgaXRlbVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGFkZE1lbnVJdGVtKHRleHQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWl0ZW0nKTtcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcclxuXHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICB0aGlzLmZpcmUoJ21lbnUtc2VsZWN0ZWQnLCB7XHJcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gc2V0cyBmaXJzdCB0byBiZSBzZWxlY3RlZFxyXG4gICAgaWYodGhpcy5tZW51QmFyRWxlbWVudC5jaGlsZEVsZW1lbnRDb3VudCA8IDEpIHtcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCB0byBtZW51IGJhclxyXG4gICAgdGhpcy5tZW51QmFyRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIG1lbnUgYmFyIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9XHJcbiAgICovXHJcbiAgY3JlYXRlTWVudUVsZW1lbnQoKSB7XHJcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIHRoaXMubWVudUJhckVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnViYXInKTtcclxuICAgIHRoaXMubWVudUJhckVsZW1lbnQuY2xhc3NOYW1lID0gJ2g1cC1tZW51JztcclxuXHJcbiAgICBjb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XHJcbiAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubWVudUJhckVsZW1lbnQpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aXRsZS5jbGFzc05hbWUgPSBcIm1lbnUtdGl0bGVcIjtcclxuICAgIHRpdGxlLmlubmVySFRNTCA9IFwiQnJvd3NlIGNvbnRlbnQgdHlwZXNcIjtcclxuXHJcbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBtZW51LmNsYXNzTmFtZSA9IFwibWVudVwiO1xyXG4gICAgbWVudS5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICBtZW51LmFwcGVuZENoaWxkKG5hdkVsZW1lbnQpO1xyXG5cclxuICAgIHJldHVybiBtZW51O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgaW5wdXQgZ3JvdXAgdXNlZCBmb3Igc2VhcmNoXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBjcmVhdGVJbnB1dEdyb3VwRWxlbWVudCgpIHtcclxuICAgIC8vIGlucHV0IGZpZWxkXHJcbiAgICBjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIGlucHV0RmllbGQuY2xhc3NOYW1lID0gJ2Zvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtcm91bmRlZCc7XHJcbiAgICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBcIlNlYXJjaCBmb3IgQ29udGVudCBUeXBlc1wiKTtcclxuICAgIGlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XHJcbiAgICAgIHRoaXMuZmlyZSgnc2VhcmNoJywge1xyXG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LnRhcmdldCxcclxuICAgICAgICBxdWVyeTogZXZlbnQudGFyZ2V0LnZhbHVlXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gaW5wdXQgYnV0dG9uXHJcbiAgICBjb25zdCBpbnB1dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaW5wdXRCdXR0b24uY2xhc3NOYW1lID0gJ2lucHV0LWdyb3VwLWFkZG9uIGljb24tc2VhcmNoJztcclxuXHJcbiAgICAvLyBpbnB1dCBncm91cFxyXG4gICAgY29uc3QgaW5wdXRHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSAnaW5wdXQtZ3JvdXAnO1xyXG4gICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEZpZWxkKTtcclxuICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRCdXR0b24pO1xyXG5cclxuICAgIHJldHVybiBpbnB1dEdyb3VwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwiaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvblZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLXNlY3Rpb24tdmlld1wiO1xyXG5pbXBvcnQgU2VhcmNoU2VydmljZSBmcm9tIFwiLi4vc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2VcIjtcclxuaW1wb3J0IENvbnRlbnRUeXBlTGlzdCBmcm9tICcuLi9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdCc7XHJcbmltcG9ydCBDb250ZW50VHlwZURldGFpbCBmcm9tICcuLi9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xyXG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xyXG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMvZXJyb3JzJztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXHJcbiAqIEBtaXhlcyBFdmVudGZ1bFxyXG4gKlxyXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XHJcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xyXG5cclxuICAgIC8vIGFkZCB2aWV3XHJcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uVmlldyhzdGF0ZSk7XHJcblxyXG4gICAgLy8gY29udHJvbGxlclxyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2UoeyBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsIH0pO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsID0gbmV3IENvbnRlbnRUeXBlRGV0YWlsKHsgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybCB9KTtcclxuXHJcbiAgICAvLyBhZGQgbWVudSBpdGVtc1xyXG4gICAgWydNeSBDb250ZW50IFR5cGVzJywgJ05ld2VzdCcsICdNb3N0IFBvcHVsYXInLCAnUmVjb21tZW5kZWQnXVxyXG4gICAgICAuZm9yRWFjaChtZW51VGV4dCA9PiB0aGlzLnZpZXcuYWRkTWVudUl0ZW0obWVudVRleHQpKTtcclxuXHJcbiAgICAvLyBFbGVtZW50IGZvciBob2xkaW5nIGxpc3QgYW5kIGRldGFpbHMgdmlld3NcclxuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY29udGVudC10eXBlLXNlY3Rpb24nKTtcclxuXHJcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gc2VjdGlvbjtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZUxpc3QuZ2V0RWxlbWVudCgpKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZURldGFpbC5nZXRFbGVtZW50KCkpO1xyXG5cclxuICAgIHRoaXMudmlldy5nZXRFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5yb290RWxlbWVudCk7XHJcblxyXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xyXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0J10sIHRoaXMuY29udGVudFR5cGVMaXN0KTtcclxuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0J10sIHRoaXMuY29udGVudFR5cGVEZXRhaWwpO1xyXG5cclxuICAgIC8vIHJlZ2lzdGVyIGxpc3RlbmVyc1xyXG4gICAgdGhpcy52aWV3Lm9uKCdzZWFyY2gnLCB0aGlzLnNlYXJjaCwgdGhpcyk7XHJcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmFwcGx5U2VhcmNoRmlsdGVyLCB0aGlzKTtcclxuICAgIHRoaXMuY29udGVudFR5cGVMaXN0Lm9uKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLnNob3dEZXRhaWxWaWV3LCB0aGlzKTtcclxuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwub24oJ2Nsb3NlJywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuaW5pdENvbnRlbnRUeXBlTGlzdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdCB3aXRoIGEgc2VhcmNoXHJcbiAgICovXHJcbiAgaW5pdENvbnRlbnRUeXBlTGlzdCgpIHtcclxuICAgIC8vIGluaXRpYWxpemUgYnkgc2VhcmNoXHJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKFwiXCIpXHJcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZmlyZSgnZXJyb3InLCBlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhlY3V0ZXMgYSBzZWFyY2ggYW5kIHVwZGF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcclxuICAgKi9cclxuICBzZWFyY2goe3F1ZXJ5fSkge1xyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChxdWVyeSlcclxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3VsZCBhcHBseSBhIHNlYXJjaCBmaWx0ZXJcclxuICAgKi9cclxuICBhcHBseVNlYXJjaEZpbHRlcigpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0NvbnRlbnRUeXBlU2VjdGlvbjogbWVudSB3YXMgY2xpY2tlZCEnLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93cyBkZXRhaWwgdmlld1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICovXHJcbiAgc2hvd0RldGFpbFZpZXcoe2lkfSkge1xyXG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QuaGlkZSgpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5sb2FkQnlJZChpZCk7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLnNob3coKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZSBkZXRhaWwgdmlld1xyXG4gICAqL1xyXG4gIGNsb3NlRGV0YWlsVmlldygpIHtcclxuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuaGlkZSgpO1xyXG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Quc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxyXG5pbXBvcnQgaW5pdFRhYlBhbmVsIGZyb20gXCJjb21wb25lbnRzL3RhYi1wYW5lbFwiXHJcbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcclxuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xyXG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcclxuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuL3V0aWxzL2V2ZW50cyc7XHJcbi8qKlxyXG4gKiBUYWIgY2hhbmdlIGV2ZW50XHJcbiAqIEBldmVudCBIdWJWaWV3I3RhYi1jaGFuZ2VcclxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cclxuICovXHJcbi8qKlxyXG4gKiBQYW5lbCBvcGVuIG9yIGNsb3NlIGV2ZW50XHJcbiAqIEBldmVudCBIdWJWaWV3I3BhbmVsLWNoYW5nZVxyXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxyXG4gKi9cclxuLyoqXHJcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxyXG4gKi9cclxuY29uc3QgQVRUUklCVVRFX0RBVEFfSUQgPSAnZGF0YS1pZCc7XHJcblxyXG4vKipcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3NcclxuICogQG1peGVzIEV2ZW50ZnVsXHJcbiAqIEBmaXJlcyBIdWJWaWV3I3RhYi1jaGFuZ2VcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlZpZXcge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcclxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJUYWJQYW5lbChzdGF0ZSk7XHJcbiAgICB0aGlzLnJlbmRlclBhbmVsKHN0YXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlcyB0aGUgcGFuZWxcclxuICAgKi9cclxuICBjbG9zZVBhbmVsKCkge1xyXG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdGl0bGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxyXG4gICAqL1xyXG4gIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgcGFuZWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4cGFuZGVkXHJcbiAgICovXHJcbiAgcmVuZGVyUGFuZWwoe3RpdGxlID0gJycsIHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnRpdGxlLmNsYXNzTmFtZSArPSBcInBhbmVsLWhlYWRlciBpY29uLWh1Yi1pY29uXCI7XHJcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcclxuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YCk7XHJcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xyXG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3BhbmVsLWNoYW5nZScsIHRoaXMsIHRoaXMudGl0bGUpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuYm9keS5jbGFzc05hbWUgKz0gXCJwYW5lbC1ib2R5XCI7XHJcbiAgICB0aGlzLmJvZHkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xyXG4gICAgdGhpcy5ib2R5LmlkID0gYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YDtcclxuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSBgcGFuZWwgaDVwLXNlY3Rpb24tJHtzZWN0aW9uSWR9YDtcclxuICAgIGlmKGV4cGFuZGVkKXtcclxuICAgICAgdGhpcy5wYW5lbC5zZXRBdHRyaWJ1dGUoJ29wZW4nLCAnJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xyXG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmJvZHkpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lICs9IGBoNXAgaDVwLWh1YmA7XHJcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2l2ZSB0aGUgcGFuZWwgYXR0cmliaXV0ZXMgZnJvbSBoNXAtc2RrLCBlLmcuIG9wZW5pbmcgYW5kIGNsb3NpbmdcclxuICAgKiBUaGlzIGlzIG9ubHkgY2FsbGVkIG9uY2Ugbm8gZXJyb3JzIGhhdmUgb2NjdXJlZCBpbiBsb2FkaW5nIHRoZSBodWIgXHJcbiAgICovXHJcbiAgaW5pdGlhbGl6ZVBhbmVsKCl7XHJcbiAgICBpbml0UGFuZWwodGhpcy5yb290RWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgaWYgcGFuZWwgaXMgb3BlbiwgdGhpcyBpcyB1c2VkIGZvciBvdXRlciBib3JkZXIgY29sb3JcclxuICAgKi9cclxuICB0b2dnbGVQYW5lbE9wZW4oKSB7XHJcbiAgICBpZihpc09wZW4odGhpcy5wYW5lbCkpIHtcclxuICAgICAgdGhpcy5wYW5lbC5yZW1vdmVBdHRyaWJ1dGUoJ29wZW4nKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHRhYiBwYW5lbFxyXG4gICAqL1xyXG4gIHJlbmRlclRhYlBhbmVsKHN0YXRlKSB7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgdGhpcy50YWJsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgIHRoaXMudGFibGlzdC5jbGFzc05hbWUgKz0gXCJ0YWJsaXN0XCI7XHJcbiAgICB0aGlzLnRhYmxpc3Quc2V0QXR0cmlidXRlICgncm9sZScsICd0YWJsaXN0Jyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcclxuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy50YWJsaXN0KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuY2xhc3NOYW1lICs9ICd0YWItcGFuZWwnO1xyXG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGFiTGlzdFdyYXBwZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHRhYlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGVudFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcclxuICAgKi9cclxuICBhZGRUYWIoe3RpdGxlLCBpZCwgY29udGVudCwgc2VsZWN0ZWQgPSBmYWxzZX0pIHtcclxuICAgIGNvbnN0IHRhYklkID0gYHRhYi0ke2lkfWA7XHJcbiAgICBjb25zdCB0YWJQYW5lbElkID0gYHRhYi1wYW5lbC0ke2lkfWA7XHJcblxyXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIHRhYi5jbGFzc05hbWUgKz0gJ3RhYic7XHJcbiAgICB0YWIuaWQgPSB0YWJJZDtcclxuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0YWJQYW5lbElkKTtcclxuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBzZWxlY3RlZC50b1N0cmluZygpKTtcclxuICAgIHRhYi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0RBVEFfSUQsIGlkKTtcclxuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XHJcbiAgICB0YWIuaW5uZXJIVE1MID0gdGl0bGU7XHJcbiAgICByZWxheUNsaWNrRXZlbnRBcygndGFiLWNoYW5nZScsIHRoaXMsIHRhYik7XHJcblxyXG4gICAgY29uc3QgdGFiUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRhYlBhbmVsLmlkID0gdGFiUGFuZWxJZDtcclxuICAgIHRhYlBhbmVsLmNsYXNzTmFtZSArPSAndGFicGFuZWwnO1xyXG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmxsZWRieScsIHRhYklkKTtcclxuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIXNlbGVjdGVkKS50b1N0cmluZygpKTtcclxuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xyXG4gICAgdGFiUGFuZWwuYXBwZW5kQ2hpbGQoY29udGVudCk7XHJcblxyXG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKHRhYik7XHJcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGFiUGFuZWwpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFRhYlBhbmVsKCkge1xyXG4gICAgaW5pdFRhYlBhbmVsKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBzZWN0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBzZXRTZWN0aW9uVHlwZSh7aWR9KSB7XHJcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSA9IGBoNXAtc2VjdGlvbi0ke2lkfSBwYW5lbGA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsImltcG9ydCB7Y3VycnksIG1hcCwgZmlsdGVyfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiXHJcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tIFwiLi4vaHViLXNlcnZpY2VzXCI7XHJcbmltcG9ydCBsdW5yIGZyb20gXCJsdW5yXCJcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3NcclxuICogVGhlIFNlYXJjaCBTZXJ2aWNlIGdldHMgYSBjb250ZW50IHR5cGVzIGZyb20gSHViU2VydmljZXNcclxuICogdGhlbiBpbmRleGVzIHRoZW0gdXNpbmcgbHVucmpzLiBJdCB0aGVuIHNlYXJjaGVzIHRocm91Z2hcclxuICogdGhlIGx1bnJqcyBpbmRleCBhbmQgcmV0dXJucyBjb250ZW50IHR5cGVzIHRoYXQgbWF0Y2ggdGhlIHF1ZXJ5LlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoU2VydmljZSB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLmFwaVJvb3RVcmxcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xyXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XHJcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNldCB1cCBsdW5yIGluZGV4XHJcbiAgICB0aGlzLmluZGV4ID0gbHVucihmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5maWVsZCgndGl0bGUnLCB7Ym9vc3Q6IDEwfSk7IC8vIENlcnRhaW4gZmllbGRzIGNhbiBnaXZlbiBhIGhpZ2hlciBpbXBvcnRhbmNlXHJcbiAgICAgIHRoaXMuZmllbGQoJ3N1bW1hcnknKTtcclxuICAgICAgdGhpcy5maWVsZCgnZGVzY3JpcHRpb24nKTtcclxuICAgICAgdGhpcy5maWVsZCgna2V5d29yZHMnKTtcclxuICAgICAgdGhpcy5yZWYoJ2lkJyk7IC8vXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBZGQgY29udGVudCB0eXBlcyB0byB0aGUgc2VhcmNoIGluZGV4XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlcyA9IHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKClcclxuICAgICAgLnRoZW4obWFwKGFkZFRvSW5kZXgodGhpcy5pbmRleCkpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm1zIGEgc2VhcmNoXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnlcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXT59IEEgcHJvbWlzZSBvZiBhbiBhcnJheSBvZiBjb250ZW50IHR5cGVzXHJcbiAgICovXHJcbiAgc2VhcmNoKHF1ZXJ5KSB7XHJcbiAgICAvLyBEaXNwbGF5IGFsbCBjb250ZW50IHR5cGVzIGJ5IGRlZmF1bHRcclxuICAgIGlmIChxdWVyeSA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29udGVudFR5cGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE90aGVyd2lzZSwgZmlsdGVyIGNvbnRlbnQgdHlwZXMgYnkgYSBxdWVyeVxyXG4gICAgcmV0dXJuIHRoaXMuY29udGVudFR5cGVzLnRoZW4oY29udGVudFR5cGVzID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5kZXguc2VhcmNoKHF1ZXJ5KVxyXG4gICAgICAgIC5tYXAocmVzdWx0ID0+IHJlc3VsdC5yZWYpXHJcbiAgICAgICAgLm1hcChmaW5kQ29udGVudFR5cGVCeU1hY2hpbmVOYW1lKGNvbnRlbnRUeXBlcykpXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGRzIGEgY29udGVudCB0eXBlIHRvIHRoZSBsdW5yanMgc2VhcmNoIGluZGV4XHJcbiAqIGNyZWF0ZXMgYW4gaWQgZm9yIHRoZSBpbmRleCB1c2luZyB0aGUgbWFjaGluZSBuYW1lXHJcbiAqIG9mIHRoZSBjb250ZW50IHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAge2x1bnIuSW5kZXh9IGluZGV4XHJcbiAqIEBwYXJhbSAge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxyXG4gKlxyXG4gKiBAcmV0dXJuIHtDb250ZW50VHlwZX1cclxuICovXHJcbmNvbnN0IGFkZFRvSW5kZXggPSBjdXJyeSgoaW5kZXgsIGNvbnRlbnRUeXBlKSA9PiB7XHJcbiAgaW5kZXguYWRkKHtcclxuICAgIHRpdGxlOiBjb250ZW50VHlwZS50aXRsZSxcclxuICAgIHN1bW1hcnk6IGNvbnRlbnRUeXBlLnN1bW1hcnksXHJcbiAgICBkZXNjcmlwdGlvbjogY29udGVudFR5cGUuZGVzY3JpcHRpb24sXHJcbiAgICBrZXl3b3JkczogY29udGVudFR5cGUua2V5d29yZHMsXHJcbiAgICBpZDogY29udGVudFR5cGUubWFjaGluZU5hbWVcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGNvbnRlbnRUeXBlO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBoZWxwZXIgZnVuY3Rpb25cclxuICpcclxuICogQHBhcmFtICB7Q29udGVudFR5cGVbXX1cclxuICogQHBhcmFtICB7c3RyaW5nfSBtYWNoaW5lTmFtZVxyXG4gKiBAcmV0dXJuIHtDb250ZW50VHlwZX1cclxuICovXHJcbmNvbnN0IGZpbmRDb250ZW50VHlwZUJ5TWFjaGluZU5hbWUgPSBjdXJyeShmdW5jdGlvbihjb250ZW50VHlwZXMsIG1hY2hpbmVOYW1lKSB7XHJcbiAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwiLyoqXHJcbiAqIEBjbGFzc1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkU2VjdGlvbiB7XHJcbiAgZ2V0RWxlbWVudCgpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJUT0RPIFVwbG9hZFwiO1xyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xyXG5pbXBvcnQge2ZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqL1xyXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICovXHJcbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKSk7XHJcblxyXG4vKipcclxuICogSW5pdGlhdGVzIGEgdGFiIHBhbmVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xyXG4gIGNvbnN0IHRhYnMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFiXCJdJyk7XHJcbiAgY29uc3QgdGFiUGFuZWxzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYnBhbmVsXCJdJyk7XHJcblxyXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xyXG4gICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICB1blNlbGVjdEFsbCh0YWJzKTtcclxuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XHJcblxyXG4gICAgICBoaWRlQWxsKHRhYlBhbmVscyk7XHJcblxyXG4gICAgICBsZXQgdGFiUGFuZWxJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcclxuICAgICAgc2hvdyhlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhYlBhbmVsSWR9YCkpO1xyXG4gICAgfSk7XHJcbiAgfSlcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJyZXF1aXJlKCcuLi8uLi9zcmMvc3R5bGVzL21haW4uc2NzcycpO1xyXG5cclxuLy8gTG9hZCBsaWJyYXJ5XHJcbkg1UCA9IEg1UCB8fCB7fTtcclxuSDVQLkh1YkNsaWVudCA9IHJlcXVpcmUoJy4uL3NjcmlwdHMvaHViJykuZGVmYXVsdDtcclxuSDVQLkh1YkNsaWVudC5yZW5kZXJFcnJvck1lc3NhZ2UgPSByZXF1aXJlKCcuLi9zY3JpcHRzL3V0aWxzL2Vycm9ycycpLmRlZmF1bHQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwic291cmNlUm9vdCI6IiJ9