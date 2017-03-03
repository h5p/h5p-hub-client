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
        id: 'create-content',
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _panel = __webpack_require__(5);

var _panel2 = _interopRequireDefault(_panel);

var _tabPanel = __webpack_require__(8);

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _functional = __webpack_require__(1);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(0);

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
      id: (0, _elements.getAttribute)(ATTRIBUTE_DATA_ID, element)
    }, false);

    event.preventDefault();
  });

  return element;
});

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
      relayClickEventAs('panel-change', this, this.title);

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
      relayClickEventAs('tab-change', this, tab);

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


__webpack_require__(7);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(6).default;
H5P.HubClient.renderErrorMessage = __webpack_require__(3).default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTY5NmJjMGZmZWFmZDAzY2ExNDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9mdW5jdGlvbmFsLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sdW5yL2x1bnIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sIm5hbWVzIjpbIkV2ZW50ZnVsIiwibGlzdGVuZXJzIiwib24iLCJ0eXBlIiwibGlzdGVuZXIiLCJzY29wZSIsInRyaWdnZXIiLCJwdXNoIiwiZmlyZSIsImV2ZW50IiwidHJpZ2dlcnMiLCJldmVyeSIsImNhbGwiLCJwcm9wYWdhdGUiLCJ0eXBlcyIsImV2ZW50ZnVsIiwic2VsZiIsImZvckVhY2giLCJjdXJyeSIsImZuIiwiYXJpdHkiLCJsZW5ndGgiLCJmMSIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJmMiIsImFyZ3MyIiwiY29uY2F0IiwiY29tcG9zZSIsImZucyIsInJlZHVjZSIsImYiLCJnIiwiYXJyIiwibWFwIiwiZmlsdGVyIiwic29tZSIsImNvbnRhaW5zIiwidmFsdWUiLCJpbmRleE9mIiwid2l0aG91dCIsInZhbHVlcyIsImludmVyc2VCb29sZWFuU3RyaW5nIiwiYm9vbCIsInRvU3RyaW5nIiwiZ2V0QXR0cmlidXRlIiwibmFtZSIsImVsIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiYXR0cmlidXRlRXF1YWxzIiwidG9nZ2xlQXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJwYXJlbnQiLCJjaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW5kZXJFcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwiY2xvc2VCdXR0b24iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJtZXNzYWdlQ29udGVudCIsInRpdGxlIiwiY29udGVudCIsIm1lc3NhZ2VXcmFwcGVyIiwiZGlzbWlzc2libGUiLCJidXR0b24iLCJ1bmRlZmluZWQiLCJtZXNzYWdlQnV0dG9uIiwiY29uc29sZSIsImxvZyIsIkh1YlNlcnZpY2VzIiwiYXBpUm9vdFVybCIsIndpbmRvdyIsImNhY2hlZENvbnRlbnRUeXBlcyIsImZldGNoIiwibWV0aG9kIiwiY3JlZGVudGlhbHMiLCJ0aGVuIiwicmVzdWx0IiwianNvbiIsImlzVmFsaWQiLCJsaWJyYXJpZXMiLCJyZXNwb25zZSIsIm1lc3NhZ2VDb2RlIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJtYWNoaW5lTmFtZSIsImNvbnRlbnRUeXBlcyIsImNvbnRlbnRUeXBlIiwiaWQiLCJib2R5IiwiaW5pdCIsImlzRXhwYW5kZWQiLCJoaWRlIiwic2hvdyIsInRvZ2dsZUJvZHlWaXNpYmlsaXR5IiwiYm9keUVsZW1lbnQiLCJvbkFyaWFFeHBhbmRlZENoYW5nZSIsInRhcmdldCIsImVsZW1lbnQiLCJ0aXRsZUVsIiwiYm9keUlkIiwiYm9keUVsIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVPbGRWYWx1ZSIsImF0dHJpYnV0ZUZpbHRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJIdWIiLCJzdGF0ZSIsImNvbnRlbnRUeXBlU2VjdGlvbiIsInVwbG9hZFNlY3Rpb24iLCJ2aWV3Iiwic2VydmljZXMiLCJzZXRQYW5lbFRpdGxlIiwiY2xvc2VQYW5lbCIsInNldFNlY3Rpb25UeXBlIiwidG9nZ2xlUGFuZWxPcGVuIiwiYmluZCIsImluaXRpYWxpemVQYW5lbCIsImluaXRUYWJQYW5lbCIsImdldENvbnRlbnRUeXBlIiwic2V0VGl0bGUiLCJ0YWJDb25maWdzIiwiZ2V0RWxlbWVudCIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiaGlkZUFsbCIsInVuU2VsZWN0QWxsIiwidGFicyIsInRhYlBhbmVscyIsInRhYiIsInRhYlBhbmVsSWQiLCJsdW5yIiwiY29uZmlnIiwiaWR4IiwiSW5kZXgiLCJwaXBlbGluZSIsImFkZCIsInRyaW1tZXIiLCJzdG9wV29yZEZpbHRlciIsInN0ZW1tZXIiLCJ2ZXJzaW9uIiwidXRpbHMiLCJ3YXJuIiwiZ2xvYmFsIiwiYXNTdHJpbmciLCJvYmoiLCJFdmVudEVtaXR0ZXIiLCJldmVudHMiLCJhZGRMaXN0ZW5lciIsInBvcCIsIm5hbWVzIiwiVHlwZUVycm9yIiwiaGFzSGFuZGxlciIsInJlbW92ZUxpc3RlbmVyIiwiZm5JbmRleCIsInNwbGljZSIsImVtaXQiLCJ0b2tlbml6ZXIiLCJpc0FycmF5IiwidCIsInRvTG93ZXJDYXNlIiwidHJpbSIsInNwbGl0Iiwic2VwYXJhdG9yIiwibG9hZCIsImxhYmVsIiwicmVnaXN0ZXJlZEZ1bmN0aW9ucyIsIkVycm9yIiwicmVnaXN0ZXJGdW5jdGlvbiIsIlBpcGVsaW5lIiwiX3N0YWNrIiwid2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkIiwiaXNSZWdpc3RlcmVkIiwic2VyaWFsaXNlZCIsImZuTmFtZSIsImFmdGVyIiwiZXhpc3RpbmdGbiIsIm5ld0ZuIiwicG9zIiwiYmVmb3JlIiwicmVtb3ZlIiwicnVuIiwidG9rZW5zIiwib3V0IiwidG9rZW5MZW5ndGgiLCJzdGFja0xlbmd0aCIsImkiLCJ0b2tlbiIsImoiLCJyZXNldCIsInRvSlNPTiIsIlZlY3RvciIsIl9tYWduaXR1ZGUiLCJsaXN0IiwiTm9kZSIsInZhbCIsIm5leHQiLCJpbnNlcnQiLCJwcmV2IiwibWFnbml0dWRlIiwibm9kZSIsInN1bU9mU3F1YXJlcyIsIk1hdGgiLCJzcXJ0IiwiZG90Iiwib3RoZXJWZWN0b3IiLCJvdGhlck5vZGUiLCJkb3RQcm9kdWN0Iiwic2ltaWxhcml0eSIsIlNvcnRlZFNldCIsImVsZW1lbnRzIiwic2VyaWFsaXNlZERhdGEiLCJzZXQiLCJsb2NhdGlvbkZvciIsInRvQXJyYXkiLCJjdHgiLCJlbGVtIiwic3RhcnQiLCJlbmQiLCJzZWN0aW9uTGVuZ3RoIiwicGl2b3QiLCJmbG9vciIsInBpdm90RWxlbSIsImludGVyc2VjdCIsIm90aGVyU2V0IiwiaW50ZXJzZWN0U2V0IiwiYV9sZW4iLCJiX2xlbiIsImEiLCJiIiwiY2xvbmUiLCJ1bmlvbiIsImxvbmdTZXQiLCJzaG9ydFNldCIsInVuaW9uU2V0Iiwic2hvcnRTZXRFbGVtZW50cyIsIl9maWVsZHMiLCJfcmVmIiwiZG9jdW1lbnRTdG9yZSIsIlN0b3JlIiwidG9rZW5TdG9yZSIsIlRva2VuU3RvcmUiLCJjb3JwdXNUb2tlbnMiLCJldmVudEVtaXR0ZXIiLCJ0b2tlbml6ZXJGbiIsIl9pZGZDYWNoZSIsIm9mZiIsImZpZWxkcyIsInJlZiIsImZpZWxkIiwiZmllbGROYW1lIiwib3B0cyIsImJvb3N0IiwicmVmTmFtZSIsImRvYyIsImVtaXRFdmVudCIsImRvY1Rva2VucyIsImFsbERvY3VtZW50VG9rZW5zIiwiZG9jUmVmIiwiZmllbGRUb2tlbnMiLCJ0ZiIsImZpZWxkTGVuZ3RoIiwidG9rZW5Db3VudCIsImsiLCJoYXMiLCJnZXQiLCJ1cGRhdGUiLCJpZGYiLCJ0ZXJtIiwiY2FjaGVLZXkiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsImRvY3VtZW50RnJlcXVlbmN5IiwiY291bnQiLCJzZWFyY2giLCJxdWVyeSIsInF1ZXJ5VG9rZW5zIiwicXVlcnlWZWN0b3IiLCJkb2N1bWVudFNldHMiLCJmaWVsZEJvb3N0cyIsIm1lbW8iLCJoYXNTb21lVG9rZW4iLCJleHBhbmQiLCJrZXkiLCJzaW1pbGFyaXR5Qm9vc3QiLCJkaWZmIiwibWF4IiwibWF0Y2hpbmdEb2N1bWVudHMiLCJyZWZzIiwia2V5cyIsInJlZnNMZW4iLCJkb2N1bWVudFNldCIsInNjb3JlIiwiZG9jdW1lbnRWZWN0b3IiLCJzb3J0IiwiZG9jdW1lbnRSZWYiLCJkb2N1bWVudFRva2VucyIsImRvY3VtZW50VG9rZW5zTGVuZ3RoIiwidXNlIiwicGx1Z2luIiwidW5zaGlmdCIsInN0b3JlIiwic3RlcDJsaXN0Iiwic3RlcDNsaXN0IiwiYyIsInYiLCJDIiwiViIsIm1ncjAiLCJtZXExIiwibWdyMSIsInNfdiIsInJlX21ncjAiLCJSZWdFeHAiLCJyZV9tZ3IxIiwicmVfbWVxMSIsInJlX3NfdiIsInJlXzFhIiwicmUyXzFhIiwicmVfMWIiLCJyZTJfMWIiLCJyZV8xYl8yIiwicmUyXzFiXzIiLCJyZTNfMWJfMiIsInJlNF8xYl8yIiwicmVfMWMiLCJyZV8yIiwicmVfMyIsInJlXzQiLCJyZTJfNCIsInJlXzUiLCJyZV81XzEiLCJyZTNfNSIsInBvcnRlclN0ZW1tZXIiLCJ3Iiwic3RlbSIsInN1ZmZpeCIsImZpcnN0Y2giLCJyZSIsInJlMiIsInJlMyIsInJlNCIsInN1YnN0ciIsInRvVXBwZXJDYXNlIiwidGVzdCIsInJlcGxhY2UiLCJmcCIsImV4ZWMiLCJnZW5lcmF0ZVN0b3BXb3JkRmlsdGVyIiwic3RvcFdvcmRzIiwid29yZHMiLCJzdG9wV29yZCIsInJvb3QiLCJkb2NzIiwiY2hhckF0IiwicmVzdCIsImdldE5vZGUiLCJmYWN0b3J5IiwiZGVmaW5lIiwiZXhwb3J0cyIsIm1vZHVsZSIsIkFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQiLCJ0b2dnbGVWaXNpYmlsaXR5IiwidmlzaWJsZSIsImlzRW1wdHkiLCJ0ZXh0IiwicmVsYXlDbGlja0V2ZW50QXMiLCJDb250ZW50VHlwZURldGFpbFZpZXciLCJiYWNrQnV0dG9uRWxlbWVudCIsImltYWdlIiwiaW1hZ2VXcmFwcGVyRWxlbWVudCIsImF1dGhvciIsImRlc2NyaXB0aW9uIiwiZGVtb0J1dHRvbiIsInRleHREZXRhaWxzIiwiZGV0YWlsc0VsZW1lbnQiLCJ1c2VCdXR0b24iLCJpbnN0YWxsQnV0dG9uIiwiYnV0dG9uQmFyIiwibGljZW5jZVBhbmVsIiwiY3JlYXRlUGFuZWwiLCJwbHVnaW5zUGFuZWwiLCJwdWJsaXNoZXJQYW5lbCIsInBhbmVsR3JvdXBFbGVtZW50Iiwicm9vdEVsZW1lbnQiLCJoZWFkZXJFbCIsImJvZHlJbm5lckVsIiwicGFuZWxFbCIsInNyYyIsInVybCIsImluc3RhbGxlZCIsIkNvbnRlbnRUeXBlRGV0YWlsIiwiaW5zdGFsbCIsImluc3RhbGxDb250ZW50VHlwZSIsImRlYnVnIiwic2V0SWQiLCJzZXREZXNjcmlwdGlvbiIsInNldEltYWdlIiwiaWNvbiIsInNldEV4YW1wbGUiLCJleGFtcGxlIiwic2V0SXNJbnN0YWxsZWQiLCJwcmV2ZW50RGVmYXVsdCIsIkNvbnRlbnRUeXBlTGlzdFZpZXciLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJyZW5kZXJDb250ZW50VHlwZUxpc3QiLCJjcmVhdGVDb250ZW50VHlwZVJvdyIsInN1bW1hcnkiLCJyb3ciLCJjcmVhdGVCdXR0b25FbGVtZW50IiwiQ29udGVudFR5cGVMaXN0IiwidXBkYXRlTGlzdCIsIkNvbnRlbnRCcm93c2VyVmlldyIsIm1lbnUiLCJjcmVhdGVNZW51RWxlbWVudCIsImlucHV0R3JvdXAiLCJjcmVhdGVJbnB1dEdyb3VwRWxlbWVudCIsIm1lbnVHcm91cCIsIm1lbnVCYXJFbGVtZW50IiwiY2hpbGRFbGVtZW50Q291bnQiLCJuYXZFbGVtZW50IiwiaW5wdXRGaWVsZCIsImlucHV0QnV0dG9uIiwiQ29udGVudFR5cGVTZWN0aW9uIiwic2VhcmNoU2VydmljZSIsImNvbnRlbnRUeXBlTGlzdCIsImNvbnRlbnRUeXBlRGV0YWlsIiwiYWRkTWVudUl0ZW0iLCJtZW51VGV4dCIsImFwcGx5U2VhcmNoRmlsdGVyIiwic2hvd0RldGFpbFZpZXciLCJjbG9zZURldGFpbFZpZXciLCJpbml0Q29udGVudFR5cGVMaXN0IiwiY2F0Y2giLCJlcnJvciIsImxvYWRCeUlkIiwiQVRUUklCVVRFX0RBVEFfSUQiLCJpc09wZW4iLCJIdWJWaWV3IiwicmVuZGVyVGFiUGFuZWwiLCJyZW5kZXJQYW5lbCIsInNlY3Rpb25JZCIsImV4cGFuZGVkIiwidGFiQ29udGFpbmVyRWxlbWVudCIsInBhbmVsIiwidGFibGlzdCIsInRhYkxpc3RXcmFwcGVyIiwidGFiSWQiLCJ0YWJQYW5lbCIsIlNlYXJjaFNlcnZpY2UiLCJpbmRleCIsImFkZFRvSW5kZXgiLCJmaW5kQ29udGVudFR5cGVCeU1hY2hpbmVOYW1lIiwia2V5d29yZHMiLCJVcGxvYWRTZWN0aW9uIiwicmVxdWlyZSIsIkg1UCIsIkh1YkNsaWVudCIsImRlZmF1bHQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBOzs7QUFHTyxJQUFNQSw4QkFBVyxTQUFYQSxRQUFXO0FBQUEsU0FBTztBQUM3QkMsZUFBVyxFQURrQjs7QUFHN0I7Ozs7Ozs7Ozs7QUFVQUMsUUFBSSxZQUFTQyxJQUFULEVBQWVDLFFBQWYsRUFBeUJDLEtBQXpCLEVBQWdDO0FBQ2xDOzs7OztBQUtBLFVBQU1DLFVBQVU7QUFDZCxvQkFBWUYsUUFERTtBQUVkLGlCQUFTQztBQUZLLE9BQWhCOztBQUtBLFdBQUtKLFNBQUwsQ0FBZUUsSUFBZixJQUF1QixLQUFLRixTQUFMLENBQWVFLElBQWYsS0FBd0IsRUFBL0M7QUFDQSxXQUFLRixTQUFMLENBQWVFLElBQWYsRUFBcUJJLElBQXJCLENBQTBCRCxPQUExQjs7QUFF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Ozs7Ozs7O0FDSHJCLG1CQUFBQyxDQUFRLENBQVI7O0FBRUE7QUFDQUMsTUFBTUEsT0FBTyxFQUFiO0FBQ0FBLElBQUlDLFNBQUosR0FBZ0IsbUJBQUFGLENBQVEsQ0FBUixFQUEwQkcsT0FBMUM7QUFDQUYsSUFBSUMsU0FBSixDQUFjM1osa0JBQWQsR0FBbUMsbUJBQUF5WixDQUFRLENBQVIsRUFBbUNHLE9BQXRFLEMiLCJmaWxlIjoiaDVwLWh1Yi1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTY5NmJjMGZmZWFmZDAzY2ExNDEiLCIvKipcbiAqIEBtaXhpblxuICovXG5leHBvcnQgY29uc3QgRXZlbnRmdWwgPSAoKSA9PiAoe1xuICBsaXN0ZW5lcnM6IHt9LFxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gZXZlbnRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IFtzY29wZV1cbiAgICpcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge0V2ZW50ZnVsfVxuICAgKi9cbiAgb246IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBzY29wZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmIHtvYmplY3R9IFRyaWdnZXJcbiAgICAgKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzY29wZVxuICAgICAqL1xuICAgIGNvbnN0IHRyaWdnZXIgPSB7XG4gICAgICAnbGlzdGVuZXInOiBsaXN0ZW5lcixcbiAgICAgICdzY29wZSc6IHNjb3BlXG4gICAgfTtcblxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaCh0cmlnZ2VyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGaXJlIGV2ZW50LiBJZiBhbnkgb2YgdGhlIGxpc3RlbmVycyByZXR1cm5zIGZhbHNlLCByZXR1cm4gZmFsc2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtvYmplY3R9IFtldmVudF1cbiAgICpcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBmaXJlOiBmdW5jdGlvbih0eXBlLCBldmVudCkge1xuICAgIGNvbnN0IHRyaWdnZXJzID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XG5cbiAgICByZXR1cm4gdHJpZ2dlcnMuZXZlcnkoZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgcmV0dXJuIHRyaWdnZXIubGlzdGVuZXIuY2FsbCh0cmlnZ2VyLnNjb3BlIHx8IHRoaXMsIGV2ZW50KSAhPT0gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIExpc3RlbnMgZm9yIGV2ZW50cyBvbiBhbm90aGVyIEV2ZW50ZnVsLCBhbmQgcHJvcGFnYXRlIGl0IHRyb3VnaCB0aGlzIEV2ZW50ZnVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IHR5cGVzXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IGV2ZW50ZnVsXG4gICAqL1xuICBwcm9wYWdhdGU6IGZ1bmN0aW9uKHR5cGVzLCBldmVudGZ1bCkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICB0eXBlcy5mb3JFYWNoKHR5cGUgPT4gZXZlbnRmdWwub24odHlwZSwgZXZlbnQgPT4gc2VsZi5maXJlKHR5cGUsIGV2ZW50KSkpO1xuICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9taXhpbnMvZXZlbnRmdWwuanMiLCIvKipcbiAqIFJldHVybnMgYSBjdXJyaWVkIHZlcnNpb24gb2YgYSBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKlxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY3VycnkgPSBmdW5jdGlvbihmbikge1xuICBjb25zdCBhcml0eSA9IGZuLmxlbmd0aDtcblxuICByZXR1cm4gZnVuY3Rpb24gZjEoKSB7XG4gICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID49IGFyaXR5KSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGYyKCkge1xuICAgICAgICBjb25zdCBhcmdzMiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgIHJldHVybiBmMS5hcHBseShudWxsLCBhcmdzLmNvbmNhdChhcmdzMikpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICogQ29tcG9zZSBmdW5jdGlvbnMgdG9nZXRoZXIsIGV4ZWN1dGluZyBmcm9tIHJpZ2h0IHRvIGxlZnRcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uLi4ufSBmbnNcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXBvc2UgPSAoLi4uZm5zKSA9PiBmbnMucmVkdWNlKChmLCBnKSA9PiAoLi4uYXJncykgPT4gZihnKC4uLmFyZ3MpKSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggZWxlbWVudCBpbiBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZvckVhY2ggPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICBhcnIuZm9yRWFjaChmbik7XG59KTtcblxuLyoqXG4gKiBNYXBzIGEgZnVuY3Rpb24gdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBtYXAgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLm1hcChmbik7XG59KTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgZmlsdGVyIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZmlsdGVyID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5maWx0ZXIoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIHNvbWUgdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBzb21lID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5zb21lKGZuKTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhbiBhcnJheSBjb250YWlucyBhIHZhbHVlXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb250YWlucyA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZSwgYXJyKSB7XG4gIHJldHVybiBhcnIuaW5kZXhPZih2YWx1ZSkgIT0gLTE7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IHdpdGhvdXQgdGhlIHN1cHBsaWVkIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlc1xuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCB3aXRob3V0ID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlcywgYXJyKSB7XG4gIHJldHVybiBmaWx0ZXIodmFsdWUgPT4gIWNvbnRhaW5zKHZhbHVlLCB2YWx1ZXMpLCBhcnIpXG59KTtcblxuLyoqXG4gKiBUYWtlcyBhIHN0cmluZyB0aGF0IGlzIGVpdGhlciAndHJ1ZScgb3IgJ2ZhbHNlJyBhbmQgcmV0dXJucyB0aGUgb3Bwb3NpdGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYm9vbFxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGludmVyc2VCb29sZWFuU3RyaW5nID0gZnVuY3Rpb24gKGJvb2wpIHtcbiAgcmV0dXJuIChib29sICE9PSAndHJ1ZScpLnRvU3RyaW5nKCk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9mdW5jdGlvbmFsLmpzIiwiaW1wb3J0IHtjdXJyeSwgaW52ZXJzZUJvb2xlYW5TdHJpbmd9IGZyb20gJy4vZnVuY3Rpb25hbCdcblxuLyoqXG4gKiBHZXQgYW4gYXR0cmlidXRlIHZhbHVlIGZyb20gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0QXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIGVsKSB7XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUobmFtZSk7XG59KTtcblxuLyoqXG4gKiBTZXQgYW4gYXR0cmlidXRlIG9uIGEgaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHNldEF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZWwpIHtcbiAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBhdHRyaWJ1dGUgZnJvbSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xuICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG59KTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBoYXNBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcbiAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZShuYW1lKTtcbn0pO1xuXG4vKipcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZSB0aGF0IGVxdWFsc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgYXR0cmlidXRlRXF1YWxzID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBlbCkge1xuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpID09PSB2YWx1ZTtcbn0pO1xuXG4vKipcbiAqIFRvZ2dsZXMgYW4gYXR0cmlidXRlIGJldHdlZW4gJ3RydWUnIGFuZCAnZmFsc2UnO1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlQXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIGVsKSB7XG4gIGNvbnN0IHZhbHVlID0gZ2V0QXR0cmlidXRlKG5hbWUsIGVsKTtcbiAgc2V0QXR0cmlidXRlKG5hbWUsIGludmVyc2VCb29sZWFuU3RyaW5nKHZhbHVlKSwgZWwpO1xufSk7XG5cbi8qKlxuICogVGhlIGFwcGVuZENoaWxkKCkgbWV0aG9kIGFkZHMgYSBub2RlIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3Qgb2YgY2hpbGRyZW4gb2YgYSBzcGVjaWZpZWQgcGFyZW50IG5vZGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjaGlsZFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBhcHBlbmRDaGlsZCA9IGN1cnJ5KGZ1bmN0aW9uIChwYXJlbnQsIGNoaWxkKSB7XG4gIHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIGEgZGVzY2VuZGFudCBvZiB0aGUgZWxlbWVudCBvbiB3aGljaCBpdCBpcyBpbnZva2VkXG4gKiB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yID0gY3VycnkoZnVuY3Rpb24gKHNlbGVjdG9yLCBlbCkge1xuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbm9uLWxpdmUgTm9kZUxpc3Qgb2YgYWxsIGVsZW1lbnRzIGRlc2NlbmRlZCBmcm9tIHRoZSBlbGVtZW50IG9uIHdoaWNoIGl0XG4gKiBpcyBpbnZva2VkIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIENTUyBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Tm9kZUxpc3R9XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yQWxsID0gY3VycnkoZnVuY3Rpb24gKHNlbGVjdG9yLCBlbCkge1xuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCIvKipcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcudHlwZSAgICAgICAgIHR5cGUgb2YgdGhlIG1lc3NhZ2U6IGluZm8sIHN1Y2Nlc3MsIGVycm9yXG4gKiBAcGFyYW0gIHtib29sZWFufSAgY29uZmlnLmRpc21pc3NpYmxlICB3aGV0aGVyIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNtaXNzZWRcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcuY29udGVudCAgICAgIG1lc3NhZ2UgY29udGVudCB1c3VhbGx5IGEgJ2gzJyBhbmQgYSAncCdcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBkaXYgY29udGFpbmluZyB0aGUgbWVzc2FnZSBlbGVtZW50XG4gKi9cblxuLy9UT0RPIGhhbmRsZSBzdHJpbmdzLCBodG1sLCBiYWRseSBmb3JtZWQgb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJFcnJvck1lc3NhZ2UobWVzc2FnZSkge1xuICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2Nsb3NlJztcbiAgY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyYjeDI3MTUnO1xuXG4gIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VDb250ZW50LmNsYXNzTmFtZSA9ICdtZXNzYWdlLWNvbnRlbnQnO1xuICBtZXNzYWdlQ29udGVudC5pbm5lckhUTUwgPSAnPGgxPicgKyBtZXNzYWdlLnRpdGxlICsgJzwvaDE+JyArICc8cD4nICsgbWVzc2FnZS5jb250ZW50ICsgJzwvcD4nO1xuXG4gIGNvbnN0IG1lc3NhZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VXcmFwcGVyLmNsYXNzTmFtZSA9ICdtZXNzYWdlJyArICcgJyArIGAke21lc3NhZ2UudHlwZX1gICsgKG1lc3NhZ2UuZGlzbWlzc2libGUgPyAnIGRpc21pc3NpYmxlJyA6ICcnKTtcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGVudCk7XG5cbiAgaWYgKG1lc3NhZ2UuYnV0dG9uICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBtZXNzYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbWVzc2FnZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcbiAgICBtZXNzYWdlQnV0dG9uLmlubmVySFRNTCA9IG1lc3NhZ2UuYnV0dG9uO1xuICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VCdXR0b24pO1xuICB9XG5cbiAgY29uc29sZS5sb2cobWVzc2FnZVdyYXBwZXIpO1xuICByZXR1cm4gbWVzc2FnZVdyYXBwZXI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXJyb3JzLmpzIiwiLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBDb250ZW50VHlwZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGl0bGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzdW1tYXJ5XG4gKiBAcHJvcGVydHkge3N0cmluZ30gZGVzY3JpcHRpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpY29uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3JlYXRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHVwZGF0ZVxuICogQHByb3BlcnR5IHtib29sZWFufSByZWNvbW1lbmRlZFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHRpbWVzRG93bmxvYWRlZFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gc2NyZWVuc2hvdHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBleGFtcGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBrZXl3b3Jkc1xuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gY2F0ZWdvcmllc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGxpY2Vuc2VcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBhcGlSb290VXJsIH0pIHtcbiAgICB0aGlzLmFwaVJvb3RVcmwgPSBhcGlSb290VXJsO1xuXG4gICAgaWYoIXdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMpe1xuICAgICAgLy8gVE9ETyByZW1vdmUgdGhpcyB3aGVuIGRvbmUgdGVzdGluZyBmb3IgZXJyb3JzXG4gICAgICAvLyB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWVycm9ycy9OT19SRVNQT05TRS5qc29uYCwge1xuXG4gICAgICB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnQtdHlwZS1jYWNoZWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxuICAgICAgLnRoZW4odGhpcy5pc1ZhbGlkKVxuICAgICAgLnRoZW4oanNvbiA9PiBqc29uLmxpYnJhcmllcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSAge0NvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cbiAgICovXG4gIGlzVmFsaWQocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT59XG4gICAqL1xuICBjb250ZW50VHlwZXMoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcy50aGVuKGNvbnRlbnRUeXBlcyA9PiB7XG4gICAgICByZXR1cm4gY29udGVudFR5cGVzLmZpbHRlcihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSA9PT0gbWFjaGluZU5hbWUpWzBdO1xuICAgIH0pO1xuXG4gICAgLypyZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnRfdHlwZV9jYWNoZS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7Ki9cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YWxscyBhIGNvbnRlbnQgdHlwZSBvbiB0aGUgc2VydmVyXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBpbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktaW5zdGFsbD9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6ICcnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi1zZXJ2aWNlcy5qcyIsImltcG9ydCB7c2V0QXR0cmlidXRlLCBhdHRyaWJ1dGVFcXVhbHMsIHRvZ2dsZUF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtjdXJyeSwgZm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBpc0V4cGFuZGVkID0gYXR0cmlidXRlRXF1YWxzKFwiYXJpYS1leHBhbmRlZFwiLCAndHJ1ZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSBib2R5IHZpc2liaWxpdHlcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBib2R5RWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBpc0V4cGFuZGVkXG4gKi9cbmNvbnN0IHRvZ2dsZUJvZHlWaXNpYmlsaXR5ID0gZnVuY3Rpb24oYm9keUVsZW1lbnQsIGlzRXhwYW5kZWQpIHtcbiAgaWYoIWlzRXhwYW5kZWQpIHtcbiAgICBoaWRlKGJvZHlFbGVtZW50KTtcbiAgICAvL2JvZHlFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMFwiO1xuICB9XG4gIGVsc2UgLyppZihib2R5RWxlbWVudC5zY3JvbGxIZWlnaHQgPiAwKSovIHtcbiAgICBzaG93KGJvZHlFbGVtZW50KTtcbiAgICAvL2JvZHlFbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke2JvZHlFbGVtZW50LnNjcm9sbEhlaWdodH1weGA7XG4gIH1cbn07XG5cbi8qKlxuICogSGFuZGxlcyBjaGFuZ2VzIHRvIGFyaWEtZXhwYW5kZWRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBib2R5RWxlbWVudFxuICogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gZXZlbnRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgb25BcmlhRXhwYW5kZWRDaGFuZ2UgPSBjdXJyeShmdW5jdGlvbihib2R5RWxlbWVudCwgZXZlbnQpIHtcbiAgdG9nZ2xlQm9keVZpc2liaWxpdHkoYm9keUVsZW1lbnQsIGlzRXhwYW5kZWQoZXZlbnQudGFyZ2V0KSk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0aXRsZUVsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1leHBhbmRlZF0nKTtcbiAgY29uc3QgYm9keUlkID0gdGl0bGVFbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgY29uc3QgYm9keUVsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2R5SWR9YCk7XG5cbiAgaWYodGl0bGVFbCkge1xuICAgIC8vIHNldCBvYnNlcnZlciBvbiB0aXRsZSBmb3IgYXJpYS1leHBhbmRlZFxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZvckVhY2gob25BcmlhRXhwYW5kZWRDaGFuZ2UoYm9keUVsKSkpO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0aXRsZUVsLCB7XG4gICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcImFyaWEtZXhwYW5kZWRcIl1cbiAgICB9KTtcblxuICAgIC8vIFNldCBjbGljayBsaXN0ZW5lciB0aGF0IHRvZ2dsZXMgYXJpYS1leHBhbmRlZFxuICAgIHRpdGxlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgdG9nZ2xlQXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBldmVudC50YXJnZXQpO1xuICAgIH0pO1xuXG4gICAgdG9nZ2xlQm9keVZpc2liaWxpdHkoYm9keUVsLCBpc0V4cGFuZGVkKHRpdGxlRWwpKTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwiaW1wb3J0IEh1YlZpZXcgZnJvbSAnLi9odWItdmlldyc7XG5pbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uIGZyb20gJy4vY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24nO1xuaW1wb3J0IFVwbG9hZFNlY3Rpb24gZnJvbSAnLi91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbic7XG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSAnLi9odWItc2VydmljZXMnO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi91dGlscy9lcnJvcnMnO1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBIdWJTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRpdGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbklkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGV4cGFuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYXBpUm9vdFVybFxuICovXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEVycm9yTWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlcnJvckNvZGVcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBTZWxlY3RlZEVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpZFxuICovXG4vKipcbiAqIFNlbGVjdCBldmVudFxuICogQGV2ZW50IEh1YiNzZWxlY3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogRXJyb3IgZXZlbnRcbiAqIEBldmVudCBIdWIjZXJyb3JcbiAqIEB0eXBlIHtFcnJvck1lc3NhZ2V9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgSHViI2Vycm9yXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNvbnRyb2xsZXJzXG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24gPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uKHN0YXRlKTtcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBwcm9wYWdhdGUgY29udHJvbGxlciBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCcsICdlcnJvciddLCB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbik7XG5cbiAgICAvLyBoYW5kbGUgZXZlbnRzXG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy5zZXRQYW5lbFRpdGxlLCB0aGlzKTtcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnZpZXcuY2xvc2VQYW5lbCwgdGhpcy52aWV3KTtcbiAgICAvLyBvbmx5IGluaXRpYWxpemUgdGhlIG1haW4gcGFuZWwgaWYgbm8gZXJyb3JzIGhhdmUgb2NjdXJlZCB3aGVuIHVwZGF0aW5nIHRoZSBjb250ZW50IHR5cGUgbGlzdFxuICAgIHRoaXMudmlldy5vbigndGFiLWNoYW5nZScsIHRoaXMudmlldy5zZXRTZWN0aW9uVHlwZSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcub24oJ3BhbmVsLWNoYW5nZScsIHRoaXMudmlldy50b2dnbGVQYW5lbE9wZW4uYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uLm9uKCd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnLCB0aGlzLnZpZXcuaW5pdGlhbGl6ZVBhbmVsLmJpbmQodGhpcy52aWV3KSwgdGhpcy52aWV3KTtcblxuICAgIHRoaXMuaW5pdFRhYlBhbmVsKClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwcm9taXNlIG9mIGEgY29udGVudCB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBnZXRDb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZSBvZiB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRQYW5lbFRpdGxlKHtpZH0pwqB7XG4gICAgdGhpcy5nZXRDb250ZW50VHlwZShpZCkudGhlbigoe3RpdGxlfSkgPT4gdGhpcy52aWV3LnNldFRpdGxlKHRpdGxlKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSB0YWIgcGFuZWxcbiAgICovXG4gIGluaXRUYWJQYW5lbCgpIHtcbiAgICBjb25zdCB0YWJDb25maWdzID0gW3tcbiAgICAgIHRpdGxlOiAnQ3JlYXRlIENvbnRlbnQnLFxuICAgICAgaWQ6ICdjcmVhdGUtY29udGVudCcsXG4gICAgICBjb250ZW50OiB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5nZXRFbGVtZW50KCksXG4gICAgICBzZWxlY3RlZDogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdVcGxvYWQnLFxuICAgICAgaWQ6ICd1cGxvYWQnLFxuICAgICAgY29udGVudDogdGhpcy51cGxvYWRTZWN0aW9uLmdldEVsZW1lbnQoKVxuICAgIH1dO1xuXG4gICAgdGFiQ29uZmlncy5mb3JFYWNoKHRhYkNvbmZpZyA9PiB0aGlzLnZpZXcuYWRkVGFiKHRhYkNvbmZpZykpO1xuICAgIHRoaXMudmlldy5pbml0VGFiUGFuZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWIuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Zm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBoaWRlQWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0YWJzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYlwiXScpO1xuICBjb25zdCB0YWJQYW5lbHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFicGFuZWxcIl0nKTtcblxuICB0YWJzLmZvckVhY2godGFiID0+IHtcbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgdW5TZWxlY3RBbGwodGFicyk7XG4gICAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcblxuICAgICAgaGlkZUFsbCh0YWJQYW5lbHMpO1xuXG4gICAgICBsZXQgdGFiUGFuZWxJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICAgIHNob3coZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0YWJQYW5lbElkfWApKTtcbiAgICB9KTtcbiAgfSlcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCIvKipcbiAqIGx1bnIgLSBodHRwOi8vbHVucmpzLmNvbSAtIEEgYml0IGxpa2UgU29sciwgYnV0IG11Y2ggc21hbGxlciBhbmQgbm90IGFzIGJyaWdodCAtIDEuMC4wXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG47KGZ1bmN0aW9uKCl7XG5cbi8qKlxuICogQ29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIGluc3RhbnRpYXRpbmcgYSBuZXcgbHVuciBpbmRleCBhbmQgY29uZmlndXJpbmcgaXRcbiAqIHdpdGggdGhlIGRlZmF1bHQgcGlwZWxpbmUgZnVuY3Rpb25zIGFuZCB0aGUgcGFzc2VkIGNvbmZpZyBmdW5jdGlvbi5cbiAqXG4gKiBXaGVuIHVzaW5nIHRoaXMgY29udmVuaWVuY2UgZnVuY3Rpb24gYSBuZXcgaW5kZXggd2lsbCBiZSBjcmVhdGVkIHdpdGggdGhlXG4gKiBmb2xsb3dpbmcgZnVuY3Rpb25zIGFscmVhZHkgaW4gdGhlIHBpcGVsaW5lOlxuICpcbiAqIGx1bnIuU3RvcFdvcmRGaWx0ZXIgLSBmaWx0ZXJzIG91dCBhbnkgc3RvcCB3b3JkcyBiZWZvcmUgdGhleSBlbnRlciB0aGVcbiAqIGluZGV4XG4gKlxuICogbHVuci5zdGVtbWVyIC0gc3RlbXMgdGhlIHRva2VucyBiZWZvcmUgZW50ZXJpbmcgdGhlIGluZGV4LlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIHZhciBpZHggPSBsdW5yKGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHRoaXMuZmllbGQoJ3RpdGxlJywgMTApXG4gKiAgICAgICB0aGlzLmZpZWxkKCd0YWdzJywgMTAwKVxuICogICAgICAgdGhpcy5maWVsZCgnYm9keScpXG4gKiAgICAgICBcbiAqICAgICAgIHRoaXMucmVmKCdjaWQnKVxuICogICAgICAgXG4gKiAgICAgICB0aGlzLnBpcGVsaW5lLmFkZChmdW5jdGlvbiAoKSB7XG4gKiAgICAgICAgIC8vIHNvbWUgY3VzdG9tIHBpcGVsaW5lIGZ1bmN0aW9uXG4gKiAgICAgICB9KVxuICogICAgICAgXG4gKiAgICAgfSlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maWcgQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIG5ldyBpbnN0YW5jZVxuICogb2YgdGhlIGx1bnIuSW5kZXggYXMgYm90aCBpdHMgY29udGV4dCBhbmQgZmlyc3QgcGFyYW1ldGVyLiBJdCBjYW4gYmUgdXNlZCB0b1xuICogY3VzdG9taXplIHRoZSBpbnN0YW5jZSBvZiBuZXcgbHVuci5JbmRleC5cbiAqIEBuYW1lc3BhY2VcbiAqIEBtb2R1bGVcbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICpcbiAqL1xudmFyIGx1bnIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHZhciBpZHggPSBuZXcgbHVuci5JbmRleFxuXG4gIGlkeC5waXBlbGluZS5hZGQoXG4gICAgbHVuci50cmltbWVyLFxuICAgIGx1bnIuc3RvcFdvcmRGaWx0ZXIsXG4gICAgbHVuci5zdGVtbWVyXG4gIClcblxuICBpZiAoY29uZmlnKSBjb25maWcuY2FsbChpZHgsIGlkeClcblxuICByZXR1cm4gaWR4XG59XG5cbmx1bnIudmVyc2lvbiA9IFwiMS4wLjBcIlxuLyohXG4gKiBsdW5yLnV0aWxzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBIG5hbWVzcGFjZSBjb250YWluaW5nIHV0aWxzIGZvciB0aGUgcmVzdCBvZiB0aGUgbHVuciBsaWJyYXJ5XG4gKi9cbmx1bnIudXRpbHMgPSB7fVxuXG4vKipcbiAqIFByaW50IGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGJlIHByaW50ZWQuXG4gKiBAbWVtYmVyT2YgVXRpbHNcbiAqL1xubHVuci51dGlscy53YXJuID0gKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgaWYgKGdsb2JhbC5jb25zb2xlICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpXG4gICAgfVxuICB9XG59KSh0aGlzKVxuXG4vKipcbiAqIENvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICpcbiAqIEluIHRoZSBjYXNlIG9mIGBudWxsYCBhbmQgYHVuZGVmaW5lZGAgdGhlIGZ1bmN0aW9uIHJldHVybnNcbiAqIHRoZSBlbXB0eSBzdHJpbmcsIGluIGFsbCBvdGhlciBjYXNlcyB0aGUgcmVzdWx0IG9mIGNhbGxpbmdcbiAqIGB0b1N0cmluZ2Agb24gdGhlIHBhc3NlZCBvYmplY3QgaXMgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtIHtBbnl9IG9iaiBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gYSBzdHJpbmcuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGFzc2VkIG9iamVjdC5cbiAqIEBtZW1iZXJPZiBVdGlsc1xuICovXG5sdW5yLnV0aWxzLmFzU3RyaW5nID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAob2JqID09PSB2b2lkIDAgfHwgb2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwiXCJcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqLnRvU3RyaW5nKClcbiAgfVxufVxuLyohXG4gKiBsdW5yLkV2ZW50RW1pdHRlclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5FdmVudEVtaXR0ZXIgaXMgYW4gZXZlbnQgZW1pdHRlciBmb3IgbHVuci4gSXQgbWFuYWdlcyBhZGRpbmcgYW5kIHJlbW92aW5nIGV2ZW50IGhhbmRsZXJzIGFuZCB0cmlnZ2VyaW5nIGV2ZW50cyBhbmQgdGhlaXIgaGFuZGxlcnMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmV2ZW50cyA9IHt9XG59XG5cbi8qKlxuICogQmluZHMgYSBoYW5kbGVyIGZ1bmN0aW9uIHRvIGEgc3BlY2lmaWMgZXZlbnQocykuXG4gKlxuICogQ2FuIGJpbmQgYSBzaW5nbGUgZnVuY3Rpb24gdG8gbWFueSBkaWZmZXJlbnQgZXZlbnRzIGluIG9uZSBjYWxsLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZXZlbnROYW1lXSBUaGUgbmFtZShzKSBvZiBldmVudHMgdG8gYmluZCB0aGlzIGZ1bmN0aW9uIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBhbiBldmVudCBpcyBmaXJlZC5cbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICBmbiA9IGFyZ3MucG9wKCksXG4gICAgICBuYW1lcyA9IGFyZ3NcblxuICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IgKFwibGFzdCBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb25cIilcblxuICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKCF0aGlzLmhhc0hhbmRsZXIobmFtZSkpIHRoaXMuZXZlbnRzW25hbWVdID0gW11cbiAgICB0aGlzLmV2ZW50c1tuYW1lXS5wdXNoKGZuKVxuICB9LCB0aGlzKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBoYW5kbGVyIGZ1bmN0aW9uIGZyb20gYSBzcGVjaWZpYyBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgdGhpcyBmdW5jdGlvbiBmcm9tLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIGFuIGV2ZW50LlxuICogQG1lbWJlck9mIEV2ZW50RW1pdHRlclxuICovXG5sdW5yLkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgaWYgKCF0aGlzLmhhc0hhbmRsZXIobmFtZSkpIHJldHVyblxuXG4gIHZhciBmbkluZGV4ID0gdGhpcy5ldmVudHNbbmFtZV0uaW5kZXhPZihmbilcbiAgdGhpcy5ldmVudHNbbmFtZV0uc3BsaWNlKGZuSW5kZXgsIDEpXG5cbiAgaWYgKCF0aGlzLmV2ZW50c1tuYW1lXS5sZW5ndGgpIGRlbGV0ZSB0aGlzLmV2ZW50c1tuYW1lXVxufVxuXG4vKipcbiAqIENhbGxzIGFsbCBmdW5jdGlvbnMgYm91bmQgdG8gdGhlIGdpdmVuIGV2ZW50LlxuICpcbiAqIEFkZGl0aW9uYWwgZGF0YSBjYW4gYmUgcGFzc2VkIHRvIHRoZSBldmVudCBoYW5kbGVyIGFzIGFyZ3VtZW50cyB0byBgZW1pdGBcbiAqIGFmdGVyIHRoZSBldmVudCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQuXG4gKiBAbWVtYmVyT2YgRXZlbnRFbWl0dGVyXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCF0aGlzLmhhc0hhbmRsZXIobmFtZSkpIHJldHVyblxuXG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXG4gIHRoaXMuZXZlbnRzW25hbWVdLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKVxuICB9KVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGEgaGFuZGxlciBoYXMgZXZlciBiZWVuIHN0b3JlZCBhZ2FpbnN0IGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGNoZWNrLlxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmhhc0hhbmRsZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gbmFtZSBpbiB0aGlzLmV2ZW50c1xufVxuXG4vKiFcbiAqIGx1bnIudG9rZW5pemVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIGZvciBzcGxpdHRpbmcgYSBzdHJpbmcgaW50byB0b2tlbnMgcmVhZHkgdG8gYmUgaW5zZXJ0ZWQgaW50b1xuICogdGhlIHNlYXJjaCBpbmRleC4gVXNlcyBgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yYCB0byBzcGxpdCBzdHJpbmdzLCBjaGFuZ2VcbiAqIHRoZSB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5IHRvIGNoYW5nZSBob3cgc3RyaW5ncyBhcmUgc3BsaXQgaW50byB0b2tlbnMuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IG9iaiBUaGUgc3RyaW5nIHRvIGNvbnZlcnQgaW50byB0b2tlbnNcbiAqIEBzZWUgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmx1bnIudG9rZW5pemVyID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGggfHwgb2JqID09IG51bGwgfHwgb2JqID09IHVuZGVmaW5lZCkgcmV0dXJuIFtdXG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHJldHVybiBvYmoubWFwKGZ1bmN0aW9uICh0KSB7IHJldHVybiBsdW5yLnV0aWxzLmFzU3RyaW5nKHQpLnRvTG93ZXJDYXNlKCkgfSlcblxuICByZXR1cm4gb2JqLnRvU3RyaW5nKCkudHJpbSgpLnRvTG93ZXJDYXNlKCkuc3BsaXQobHVuci50b2tlbml6ZXIuc2VwYXJhdG9yKVxufVxuXG4vKipcbiAqIFRoZSBzcGVyYXRvciB1c2VkIHRvIHNwbGl0IGEgc3RyaW5nIGludG8gdG9rZW5zLiBPdmVycmlkZSB0aGlzIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgYmVoYXZpb3VyIG9mXG4gKiBgbHVuci50b2tlbml6ZXJgIGJlaGF2aW91ciB3aGVuIHRva2VuaXppbmcgc3RyaW5ncy4gQnkgZGVmYXVsdCB0aGlzIHNwbGl0cyBvbiB3aGl0ZXNwYWNlIGFuZCBoeXBoZW5zLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzZWUgbHVuci50b2tlbml6ZXJcbiAqL1xubHVuci50b2tlbml6ZXIuc2VwYXJhdG9yID0gL1tcXHNcXC1dKy9cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCB0b2tlbml6ZXIuXG4gKlxuICogQSB0b2tlbml6ZXIgZnVuY3Rpb24gdG8gYmUgbG9hZGVkIG11c3QgYWxyZWFkeSBiZSByZWdpc3RlcmVkIHdpdGggbHVuci50b2tlbml6ZXIuXG4gKiBJZiB0aGUgc2VyaWFsaXNlZCB0b2tlbml6ZXIgaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQgdGhlbiBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVGhlIGxhYmVsIG9mIHRoZSBzZXJpYWxpc2VkIHRva2VuaXplci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqIEBtZW1iZXJPZiB0b2tlbml6ZXJcbiAqL1xubHVuci50b2tlbml6ZXIubG9hZCA9IGZ1bmN0aW9uIChsYWJlbCkge1xuICB2YXIgZm4gPSB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnNbbGFiZWxdXG5cbiAgaWYgKCFmbikge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGxvYWQgdW4tcmVnaXN0ZXJlZCBmdW5jdGlvbjogJyArIGxhYmVsKVxuICB9XG5cbiAgcmV0dXJuIGZuXG59XG5cbmx1bnIudG9rZW5pemVyLmxhYmVsID0gJ2RlZmF1bHQnXG5cbmx1bnIudG9rZW5pemVyLnJlZ2lzdGVyZWRGdW5jdGlvbnMgPSB7XG4gICdkZWZhdWx0JzogbHVuci50b2tlbml6ZXJcbn1cblxuLyoqXG4gKiBSZWdpc3RlciBhIHRva2VuaXplciBmdW5jdGlvbi5cbiAqXG4gKiBGdW5jdGlvbnMgdGhhdCBhcmUgdXNlZCBhcyB0b2tlbml6ZXJzIHNob3VsZCBiZSByZWdpc3RlcmVkIGlmIHRoZXkgYXJlIHRvIGJlIHVzZWQgd2l0aCBhIHNlcmlhbGlzZWQgaW5kZXguXG4gKlxuICogUmVnaXN0ZXJpbmcgYSBmdW5jdGlvbiBkb2VzIG5vdCBhZGQgaXQgdG8gYW4gaW5kZXgsIGZ1bmN0aW9ucyBtdXN0IHN0aWxsIGJlIGFzc29jaWF0ZWQgd2l0aCBhIHNwZWNpZmljIGluZGV4IGZvciB0aGVtIHRvIGJlIHVzZWQgd2hlbiBpbmRleGluZyBhbmQgc2VhcmNoaW5nIGRvY3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcmVnaXN0ZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVGhlIGxhYmVsIHRvIHJlZ2lzdGVyIHRoaXMgZnVuY3Rpb24gd2l0aFxuICogQG1lbWJlck9mIHRva2VuaXplclxuICovXG5sdW5yLnRva2VuaXplci5yZWdpc3RlckZ1bmN0aW9uID0gZnVuY3Rpb24gKGZuLCBsYWJlbCkge1xuICBpZiAobGFiZWwgaW4gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdPdmVyd3JpdGluZyBleGlzdGluZyB0b2tlbml6ZXI6ICcgKyBsYWJlbClcbiAgfVxuXG4gIGZuLmxhYmVsID0gbGFiZWxcbiAgdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zW2xhYmVsXSA9IGZuXG59XG4vKiFcbiAqIGx1bnIuUGlwZWxpbmVcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuUGlwZWxpbmVzIG1haW50YWluIGFuIG9yZGVyZWQgbGlzdCBvZiBmdW5jdGlvbnMgdG8gYmUgYXBwbGllZCB0byBhbGxcbiAqIHRva2VucyBpbiBkb2N1bWVudHMgZW50ZXJpbmcgdGhlIHNlYXJjaCBpbmRleCBhbmQgcXVlcmllcyBiZWluZyByYW4gYWdhaW5zdFxuICogdGhlIGluZGV4LlxuICpcbiAqIEFuIGluc3RhbmNlIG9mIGx1bnIuSW5kZXggY3JlYXRlZCB3aXRoIHRoZSBsdW5yIHNob3J0Y3V0IHdpbGwgY29udGFpbiBhXG4gKiBwaXBlbGluZSB3aXRoIGEgc3RvcCB3b3JkIGZpbHRlciBhbmQgYW4gRW5nbGlzaCBsYW5ndWFnZSBzdGVtbWVyLiBFeHRyYVxuICogZnVuY3Rpb25zIGNhbiBiZSBhZGRlZCBiZWZvcmUgb3IgYWZ0ZXIgZWl0aGVyIG9mIHRoZXNlIGZ1bmN0aW9ucyBvciB0aGVzZVxuICogZGVmYXVsdCBmdW5jdGlvbnMgY2FuIGJlIHJlbW92ZWQuXG4gKlxuICogV2hlbiBydW4gdGhlIHBpcGVsaW5lIHdpbGwgY2FsbCBlYWNoIGZ1bmN0aW9uIGluIHR1cm4sIHBhc3NpbmcgYSB0b2tlbiwgdGhlXG4gKiBpbmRleCBvZiB0aGF0IHRva2VuIGluIHRoZSBvcmlnaW5hbCBsaXN0IG9mIGFsbCB0b2tlbnMgYW5kIGZpbmFsbHkgYSBsaXN0IG9mXG4gKiBhbGwgdGhlIG9yaWdpbmFsIHRva2Vucy5cbiAqXG4gKiBUaGUgb3V0cHV0IG9mIGZ1bmN0aW9ucyBpbiB0aGUgcGlwZWxpbmUgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIG5leHQgZnVuY3Rpb25cbiAqIGluIHRoZSBwaXBlbGluZS4gVG8gZXhjbHVkZSBhIHRva2VuIGZyb20gZW50ZXJpbmcgdGhlIGluZGV4IHRoZSBmdW5jdGlvblxuICogc2hvdWxkIHJldHVybiB1bmRlZmluZWQsIHRoZSByZXN0IG9mIHRoZSBwaXBlbGluZSB3aWxsIG5vdCBiZSBjYWxsZWQgd2l0aFxuICogdGhpcyB0b2tlbi5cbiAqXG4gKiBGb3Igc2VyaWFsaXNhdGlvbiBvZiBwaXBlbGluZXMgdG8gd29yaywgYWxsIGZ1bmN0aW9ucyB1c2VkIGluIGFuIGluc3RhbmNlIG9mXG4gKiBhIHBpcGVsaW5lIHNob3VsZCBiZSByZWdpc3RlcmVkIHdpdGggbHVuci5QaXBlbGluZS4gUmVnaXN0ZXJlZCBmdW5jdGlvbnMgY2FuXG4gKiB0aGVuIGJlIGxvYWRlZC4gSWYgdHJ5aW5nIHRvIGxvYWQgYSBzZXJpYWxpc2VkIHBpcGVsaW5lIHRoYXQgdXNlcyBmdW5jdGlvbnNcbiAqIHRoYXQgYXJlIG5vdCByZWdpc3RlcmVkIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICpcbiAqIElmIG5vdCBwbGFubmluZyBvbiBzZXJpYWxpc2luZyB0aGUgcGlwZWxpbmUgdGhlbiByZWdpc3RlcmluZyBwaXBlbGluZSBmdW5jdGlvbnNcbiAqIGlzIG5vdCBuZWNlc3NhcnkuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuUGlwZWxpbmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3N0YWNrID0gW11cbn1cblxubHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zID0ge31cblxuLyoqXG4gKiBSZWdpc3RlciBhIGZ1bmN0aW9uIHdpdGggdGhlIHBpcGVsaW5lLlxuICpcbiAqIEZ1bmN0aW9ucyB0aGF0IGFyZSB1c2VkIGluIHRoZSBwaXBlbGluZSBzaG91bGQgYmUgcmVnaXN0ZXJlZCBpZiB0aGUgcGlwZWxpbmVcbiAqIG5lZWRzIHRvIGJlIHNlcmlhbGlzZWQsIG9yIGEgc2VyaWFsaXNlZCBwaXBlbGluZSBuZWVkcyB0byBiZSBsb2FkZWQuXG4gKlxuICogUmVnaXN0ZXJpbmcgYSBmdW5jdGlvbiBkb2VzIG5vdCBhZGQgaXQgdG8gYSBwaXBlbGluZSwgZnVuY3Rpb25zIG11c3Qgc3RpbGwgYmVcbiAqIGFkZGVkIHRvIGluc3RhbmNlcyBvZiB0aGUgcGlwZWxpbmUgZm9yIHRoZW0gdG8gYmUgdXNlZCB3aGVuIHJ1bm5pbmcgYSBwaXBlbGluZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgZm9yLlxuICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIFRoZSBsYWJlbCB0byByZWdpc3RlciB0aGlzIGZ1bmN0aW9uIHdpdGhcbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4sIGxhYmVsKSB7XG4gIGlmIChsYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ092ZXJ3cml0aW5nIGV4aXN0aW5nIHJlZ2lzdGVyZWQgZnVuY3Rpb246ICcgKyBsYWJlbClcbiAgfVxuXG4gIGZuLmxhYmVsID0gbGFiZWxcbiAgbHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zW2ZuLmxhYmVsXSA9IGZuXG59XG5cbi8qKlxuICogV2FybnMgaWYgdGhlIGZ1bmN0aW9uIGlzIG5vdCByZWdpc3RlcmVkIGFzIGEgUGlwZWxpbmUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIGZvci5cbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGlzUmVnaXN0ZXJlZCA9IGZuLmxhYmVsICYmIChmbi5sYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpXG5cbiAgaWYgKCFpc1JlZ2lzdGVyZWQpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ0Z1bmN0aW9uIGlzIG5vdCByZWdpc3RlcmVkIHdpdGggcGlwZWxpbmUuIFRoaXMgbWF5IGNhdXNlIHByb2JsZW1zIHdoZW4gc2VyaWFsaXNpbmcgdGhlIGluZGV4LlxcbicsIGZuKVxuICB9XG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgcGlwZWxpbmUuXG4gKlxuICogQWxsIGZ1bmN0aW9ucyB0byBiZSBsb2FkZWQgbXVzdCBhbHJlYWR5IGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLlBpcGVsaW5lLlxuICogSWYgYW55IGZ1bmN0aW9uIGZyb20gdGhlIHNlcmlhbGlzZWQgZGF0YSBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZCB0aGVuIGFuXG4gKiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXNlZCBUaGUgc2VyaWFsaXNlZCBwaXBlbGluZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuUGlwZWxpbmV9XG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWQpIHtcbiAgdmFyIHBpcGVsaW5lID0gbmV3IGx1bnIuUGlwZWxpbmVcblxuICBzZXJpYWxpc2VkLmZvckVhY2goZnVuY3Rpb24gKGZuTmFtZSkge1xuICAgIHZhciBmbiA9IGx1bnIuUGlwZWxpbmUucmVnaXN0ZXJlZEZ1bmN0aW9uc1tmbk5hbWVdXG5cbiAgICBpZiAoZm4pIHtcbiAgICAgIHBpcGVsaW5lLmFkZChmbilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgbG9hZCB1bi1yZWdpc3RlcmVkIGZ1bmN0aW9uOiAnICsgZm5OYW1lKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcGlwZWxpbmVcbn1cblxuLyoqXG4gKiBBZGRzIG5ldyBmdW5jdGlvbnMgdG8gdGhlIGVuZCBvZiB0aGUgcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9ucyBBbnkgbnVtYmVyIG9mIGZ1bmN0aW9ucyB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcblxuICBmbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChmbilcbiAgICB0aGlzLl9zdGFjay5wdXNoKGZuKVxuICB9LCB0aGlzKVxufVxuXG4vKipcbiAqIEFkZHMgYSBzaW5nbGUgZnVuY3Rpb24gYWZ0ZXIgYSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZVxuICogcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4aXN0aW5nRm4gQSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZSBwaXBlbGluZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5ld0ZuIFRoZSBuZXcgZnVuY3Rpb24gdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5hZnRlciA9IGZ1bmN0aW9uIChleGlzdGluZ0ZuLCBuZXdGbikge1xuICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChuZXdGbilcblxuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihleGlzdGluZ0ZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBleGlzdGluZ0ZuJylcbiAgfVxuXG4gIHBvcyA9IHBvcyArIDFcbiAgdGhpcy5fc3RhY2suc3BsaWNlKHBvcywgMCwgbmV3Rm4pXG59XG5cbi8qKlxuICogQWRkcyBhIHNpbmdsZSBmdW5jdGlvbiBiZWZvcmUgYSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZVxuICogcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4aXN0aW5nRm4gQSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZSBwaXBlbGluZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5ld0ZuIFRoZSBuZXcgZnVuY3Rpb24gdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5iZWZvcmUgPSBmdW5jdGlvbiAoZXhpc3RpbmdGbiwgbmV3Rm4pIHtcbiAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQobmV3Rm4pXG5cbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZXhpc3RpbmdGbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgZXhpc3RpbmdGbicpXG4gIH1cblxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAwLCBuZXdGbilcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgZnVuY3Rpb24gZnJvbSB0aGUgcGlwZWxpbmUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZm4pXG4gIGlmIChwb3MgPT0gLTEpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDEpXG59XG5cbi8qKlxuICogUnVucyB0aGUgY3VycmVudCBsaXN0IG9mIGZ1bmN0aW9ucyB0aGF0IG1ha2UgdXAgdGhlIHBpcGVsaW5lIGFnYWluc3QgdGhlXG4gKiBwYXNzZWQgdG9rZW5zLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHRva2VucyBUaGUgdG9rZW5zIHRvIHJ1biB0aHJvdWdoIHRoZSBwaXBlbGluZS5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAodG9rZW5zKSB7XG4gIHZhciBvdXQgPSBbXSxcbiAgICAgIHRva2VuTGVuZ3RoID0gdG9rZW5zLmxlbmd0aCxcbiAgICAgIHN0YWNrTGVuZ3RoID0gdGhpcy5fc3RhY2subGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbkxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN0YWNrTGVuZ3RoOyBqKyspIHtcbiAgICAgIHRva2VuID0gdGhpcy5fc3RhY2tbal0odG9rZW4sIGksIHRva2VucylcbiAgICAgIGlmICh0b2tlbiA9PT0gdm9pZCAwIHx8IHRva2VuID09PSAnJykgYnJlYWtcbiAgICB9O1xuXG4gICAgaWYgKHRva2VuICE9PSB2b2lkIDAgJiYgdG9rZW4gIT09ICcnKSBvdXQucHVzaCh0b2tlbilcbiAgfTtcblxuICByZXR1cm4gb3V0XG59XG5cbi8qKlxuICogUmVzZXRzIHRoZSBwaXBlbGluZSBieSByZW1vdmluZyBhbnkgZXhpc3RpbmcgcHJvY2Vzc29ycy5cbiAqXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3N0YWNrID0gW11cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHBpcGVsaW5lIHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fc3RhY2subWFwKGZ1bmN0aW9uIChmbikge1xuICAgIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKGZuKVxuXG4gICAgcmV0dXJuIGZuLmxhYmVsXG4gIH0pXG59XG4vKiFcbiAqIGx1bnIuVmVjdG9yXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlZlY3RvcnMgaW1wbGVtZW50IHZlY3RvciByZWxhdGVkIG9wZXJhdGlvbnMgZm9yXG4gKiBhIHNlcmllcyBvZiBlbGVtZW50cy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5WZWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX21hZ25pdHVkZSA9IG51bGxcbiAgdGhpcy5saXN0ID0gdW5kZWZpbmVkXG4gIHRoaXMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIGx1bnIuVmVjdG9yLk5vZGUgaXMgYSBzaW1wbGUgc3RydWN0IGZvciBlYWNoIG5vZGVcbiAqIGluIGEgbHVuci5WZWN0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIG5vZGUgaW4gdGhlIHZlY3Rvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgZGF0YSBhdCB0aGlzIG5vZGUgaW4gdGhlIHZlY3Rvci5cbiAqIEBwYXJhbSB7bHVuci5WZWN0b3IuTm9kZX0gVGhlIG5vZGUgZGlyZWN0bHkgYWZ0ZXIgdGhpcyBub2RlIGluIHRoZSB2ZWN0b3IuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IuTm9kZSA9IGZ1bmN0aW9uIChpZHgsIHZhbCwgbmV4dCkge1xuICB0aGlzLmlkeCA9IGlkeFxuICB0aGlzLnZhbCA9IHZhbFxuICB0aGlzLm5leHQgPSBuZXh0XG59XG5cbi8qKlxuICogSW5zZXJ0cyBhIG5ldyB2YWx1ZSBhdCBhIHBvc2l0aW9uIGluIGEgdmVjdG9yLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgaW5kZXggYXQgd2hpY2ggdG8gaW5zZXJ0IGEgdmFsdWUuXG4gKiBAcGFyYW0ge09iamVjdH0gVGhlIG9iamVjdCB0byBpbnNlcnQgaW4gdGhlIHZlY3Rvci5cbiAqIEBtZW1iZXJPZiBWZWN0b3IuXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoaWR4LCB2YWwpIHtcbiAgdGhpcy5fbWFnbml0dWRlID0gdW5kZWZpbmVkO1xuICB2YXIgbGlzdCA9IHRoaXMubGlzdFxuXG4gIGlmICghbGlzdCkge1xuICAgIHRoaXMubGlzdCA9IG5ldyBsdW5yLlZlY3Rvci5Ob2RlIChpZHgsIHZhbCwgbGlzdClcbiAgICByZXR1cm4gdGhpcy5sZW5ndGgrK1xuICB9XG5cbiAgaWYgKGlkeCA8IGxpc3QuaWR4KSB7XG4gICAgdGhpcy5saXN0ID0gbmV3IGx1bnIuVmVjdG9yLk5vZGUgKGlkeCwgdmFsLCBsaXN0KVxuICAgIHJldHVybiB0aGlzLmxlbmd0aCsrXG4gIH1cblxuICB2YXIgcHJldiA9IGxpc3QsXG4gICAgICBuZXh0ID0gbGlzdC5uZXh0XG5cbiAgd2hpbGUgKG5leHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGlkeCA8IG5leHQuaWR4KSB7XG4gICAgICBwcmV2Lm5leHQgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIG5leHQpXG4gICAgICByZXR1cm4gdGhpcy5sZW5ndGgrK1xuICAgIH1cblxuICAgIHByZXYgPSBuZXh0LCBuZXh0ID0gbmV4dC5uZXh0XG4gIH1cblxuICBwcmV2Lm5leHQgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIG5leHQpXG4gIHJldHVybiB0aGlzLmxlbmd0aCsrXG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWFnbml0dWRlIG9mIHRoaXMgdmVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgVmVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5tYWduaXR1ZGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLl9tYWduaXR1ZGUpIHJldHVybiB0aGlzLl9tYWduaXR1ZGVcbiAgdmFyIG5vZGUgPSB0aGlzLmxpc3QsXG4gICAgICBzdW1PZlNxdWFyZXMgPSAwLFxuICAgICAgdmFsXG5cbiAgd2hpbGUgKG5vZGUpIHtcbiAgICB2YWwgPSBub2RlLnZhbFxuICAgIHN1bU9mU3F1YXJlcyArPSB2YWwgKiB2YWxcbiAgICBub2RlID0gbm9kZS5uZXh0XG4gIH1cblxuICByZXR1cm4gdGhpcy5fbWFnbml0dWRlID0gTWF0aC5zcXJ0KHN1bU9mU3F1YXJlcylcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlciB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvcn0gb3RoZXJWZWN0b3IgVGhlIHZlY3RvciB0byBjb21wdXRlIHRoZSBkb3QgcHJvZHVjdCB3aXRoLlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIChvdGhlclZlY3Rvcikge1xuICB2YXIgbm9kZSA9IHRoaXMubGlzdCxcbiAgICAgIG90aGVyTm9kZSA9IG90aGVyVmVjdG9yLmxpc3QsXG4gICAgICBkb3RQcm9kdWN0ID0gMFxuXG4gIHdoaWxlIChub2RlICYmIG90aGVyTm9kZSkge1xuICAgIGlmIChub2RlLmlkeCA8IG90aGVyTm9kZS5pZHgpIHtcbiAgICAgIG5vZGUgPSBub2RlLm5leHRcbiAgICB9IGVsc2UgaWYgKG5vZGUuaWR4ID4gb3RoZXJOb2RlLmlkeCkge1xuICAgICAgb3RoZXJOb2RlID0gb3RoZXJOb2RlLm5leHRcbiAgICB9IGVsc2Uge1xuICAgICAgZG90UHJvZHVjdCArPSBub2RlLnZhbCAqIG90aGVyTm9kZS52YWxcbiAgICAgIG5vZGUgPSBub2RlLm5leHRcbiAgICAgIG90aGVyTm9kZSA9IG90aGVyTm9kZS5uZXh0XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRvdFByb2R1Y3Rcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb3NpbmUgc2ltaWxhcml0eSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKiB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvcn0gb3RoZXJWZWN0b3IgVGhlIG90aGVyIHZlY3RvciB0byBjYWxjdWxhdGUgdGhlXG4gKiBzaW1pbGFyaXR5IHdpdGguXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFZlY3RvclxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUuc2ltaWxhcml0eSA9IGZ1bmN0aW9uIChvdGhlclZlY3Rvcikge1xuICByZXR1cm4gdGhpcy5kb3Qob3RoZXJWZWN0b3IpIC8gKHRoaXMubWFnbml0dWRlKCkgKiBvdGhlclZlY3Rvci5tYWduaXR1ZGUoKSlcbn1cbi8qIVxuICogbHVuci5Tb3J0ZWRTZXRcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuU29ydGVkU2V0cyBhcmUgdXNlZCB0byBtYWludGFpbiBhbiBhcnJheSBvZiB1bmlxIHZhbHVlcyBpbiBhIHNvcnRlZFxuICogb3JkZXIuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuU29ydGVkU2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmxlbmd0aCA9IDBcbiAgdGhpcy5lbGVtZW50cyA9IFtdXG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgc29ydGVkIHNldC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkRGF0YSkge1xuICB2YXIgc2V0ID0gbmV3IHRoaXNcblxuICBzZXQuZWxlbWVudHMgPSBzZXJpYWxpc2VkRGF0YVxuICBzZXQubGVuZ3RoID0gc2VyaWFsaXNlZERhdGEubGVuZ3RoXG5cbiAgcmV0dXJuIHNldFxufVxuXG4vKipcbiAqIEluc2VydHMgbmV3IGl0ZW1zIGludG8gdGhlIHNldCBpbiB0aGUgY29ycmVjdCBwb3NpdGlvbiB0byBtYWludGFpbiB0aGVcbiAqIG9yZGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgb2JqZWN0cyB0byBhZGQgdG8gdGhpcyBzZXQuXG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpLCBlbGVtZW50XG5cbiAgZm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGVsZW1lbnQgPSBhcmd1bWVudHNbaV1cbiAgICBpZiAofnRoaXMuaW5kZXhPZihlbGVtZW50KSkgY29udGludWVcbiAgICB0aGlzLmVsZW1lbnRzLnNwbGljZSh0aGlzLmxvY2F0aW9uRm9yKGVsZW1lbnQpLCAwLCBlbGVtZW50KVxuICB9XG5cbiAgdGhpcy5sZW5ndGggPSB0aGlzLmVsZW1lbnRzLmxlbmd0aFxufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgc29ydGVkIHNldCBpbnRvIGFuIGFycmF5LlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmVsZW1lbnRzLnNsaWNlKClcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGFycmF5IHdpdGggdGhlIHJlc3VsdHMgb2YgY2FsbGluZyBhIHByb3ZpZGVkIGZ1bmN0aW9uIG9uIGV2ZXJ5XG4gKiBlbGVtZW50IGluIHRoaXMgc29ydGVkIHNldC5cbiAqXG4gKiBEZWxlZ2F0ZXMgdG8gQXJyYXkucHJvdG90eXBlLm1hcCBhbmQgaGFzIHRoZSBzYW1lIHNpZ25hdHVyZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgb24gZWFjaCBlbGVtZW50IG9mIHRoZVxuICogc2V0LlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBBbiBvcHRpb25hbCBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgY29udGV4dFxuICogZm9yIHRoZSBmdW5jdGlvbiBmbi5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmbiwgY3R4KSB7XG4gIHJldHVybiB0aGlzLmVsZW1lbnRzLm1hcChmbiwgY3R4KVxufVxuXG4vKipcbiAqIEV4ZWN1dGVzIGEgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBwZXIgc29ydGVkIHNldCBlbGVtZW50LlxuICpcbiAqIERlbGVnYXRlcyB0byBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCBhbmQgaGFzIHRoZSBzYW1lIHNpZ25hdHVyZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgb24gZWFjaCBlbGVtZW50IG9mIHRoZVxuICogc2V0LlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBBbiBvcHRpb25hbCBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgY29udGV4dFxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICogZm9yIHRoZSBmdW5jdGlvbiBmbi5cbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoZm4sIGN0eCkge1xuICByZXR1cm4gdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZuLCBjdHgpXG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW5kZXggYXQgd2hpY2ggYSBnaXZlbiBlbGVtZW50IGNhbiBiZSBmb3VuZCBpbiB0aGVcbiAqIHNvcnRlZCBzZXQsIG9yIC0xIGlmIGl0IGlzIG5vdCBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIFRoZSBvYmplY3QgdG8gbG9jYXRlIGluIHRoZSBzb3J0ZWQgc2V0LlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoZWxlbSkge1xuICB2YXIgc3RhcnQgPSAwLFxuICAgICAgZW5kID0gdGhpcy5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnQsXG4gICAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMiksXG4gICAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuXG4gIHdoaWxlIChzZWN0aW9uTGVuZ3RoID4gMSkge1xuICAgIGlmIChwaXZvdEVsZW0gPT09IGVsZW0pIHJldHVybiBwaXZvdFxuXG4gICAgaWYgKHBpdm90RWxlbSA8IGVsZW0pIHN0YXJ0ID0gcGl2b3RcbiAgICBpZiAocGl2b3RFbGVtID4gZWxlbSkgZW5kID0gcGl2b3RcblxuICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydFxuICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKVxuICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG4gIH1cblxuICBpZiAocGl2b3RFbGVtID09PSBlbGVtKSByZXR1cm4gcGl2b3RcblxuICByZXR1cm4gLTFcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiB3aXRoaW4gdGhlIHNvcnRlZCBzZXQgdGhhdCBhbiBlbGVtZW50IHNob3VsZCBiZVxuICogaW5zZXJ0ZWQgYXQgdG8gbWFpbnRhaW4gdGhlIGN1cnJlbnQgb3JkZXIgb2YgdGhlIHNldC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCB0aGUgZWxlbWVudCB0byBzZWFyY2ggZm9yIGRvZXMgbm90IGFscmVhZHkgZXhpc3RcbiAqIGluIHRoZSBzb3J0ZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIFRoZSBlbGVtIHRvIGZpbmQgdGhlIHBvc2l0aW9uIGZvciBpbiB0aGUgc2V0XG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUubG9jYXRpb25Gb3IgPSBmdW5jdGlvbiAoZWxlbSkge1xuICB2YXIgc3RhcnQgPSAwLFxuICAgICAgZW5kID0gdGhpcy5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnQsXG4gICAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMiksXG4gICAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuXG4gIHdoaWxlIChzZWN0aW9uTGVuZ3RoID4gMSkge1xuICAgIGlmIChwaXZvdEVsZW0gPCBlbGVtKSBzdGFydCA9IHBpdm90XG4gICAgaWYgKHBpdm90RWxlbSA+IGVsZW0pIGVuZCA9IHBpdm90XG5cbiAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnRcbiAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMilcbiAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuICB9XG5cbiAgaWYgKHBpdm90RWxlbSA+IGVsZW0pIHJldHVybiBwaXZvdFxuICBpZiAocGl2b3RFbGVtIDwgZWxlbSkgcmV0dXJuIHBpdm90ICsgMVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbHVuci5Tb3J0ZWRTZXQgdGhhdCBjb250YWlucyB0aGUgZWxlbWVudHMgaW4gdGhlIGludGVyc2VjdGlvblxuICogb2YgdGhpcyBzZXQgYW5kIHRoZSBwYXNzZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7bHVuci5Tb3J0ZWRTZXR9IG90aGVyU2V0IFRoZSBzZXQgdG8gaW50ZXJzZWN0IHdpdGggdGhpcyBzZXQuXG4gKiBAcmV0dXJucyB7bHVuci5Tb3J0ZWRTZXR9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5pbnRlcnNlY3QgPSBmdW5jdGlvbiAob3RoZXJTZXQpIHtcbiAgdmFyIGludGVyc2VjdFNldCA9IG5ldyBsdW5yLlNvcnRlZFNldCxcbiAgICAgIGkgPSAwLCBqID0gMCxcbiAgICAgIGFfbGVuID0gdGhpcy5sZW5ndGgsIGJfbGVuID0gb3RoZXJTZXQubGVuZ3RoLFxuICAgICAgYSA9IHRoaXMuZWxlbWVudHMsIGIgPSBvdGhlclNldC5lbGVtZW50c1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgaWYgKGkgPiBhX2xlbiAtIDEgfHwgaiA+IGJfbGVuIC0gMSkgYnJlYWtcblxuICAgIGlmIChhW2ldID09PSBiW2pdKSB7XG4gICAgICBpbnRlcnNlY3RTZXQuYWRkKGFbaV0pXG4gICAgICBpKyssIGorK1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoYVtpXSA8IGJbal0pIHtcbiAgICAgIGkrK1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoYVtpXSA+IGJbal0pIHtcbiAgICAgIGorK1xuICAgICAgY29udGludWVcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGludGVyc2VjdFNldFxufVxuXG4vKipcbiAqIE1ha2VzIGEgY29weSBvZiB0aGlzIHNldFxuICpcbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY2xvbmUgPSBuZXcgbHVuci5Tb3J0ZWRTZXRcblxuICBjbG9uZS5lbGVtZW50cyA9IHRoaXMudG9BcnJheSgpXG4gIGNsb25lLmxlbmd0aCA9IGNsb25lLmVsZW1lbnRzLmxlbmd0aFxuXG4gIHJldHVybiBjbG9uZVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbHVuci5Tb3J0ZWRTZXQgdGhhdCBjb250YWlucyB0aGUgZWxlbWVudHMgaW4gdGhlIHVuaW9uXG4gKiBvZiB0aGlzIHNldCBhbmQgdGhlIHBhc3NlZCBzZXQuXG4gKlxuICogQHBhcmFtIHtsdW5yLlNvcnRlZFNldH0gb3RoZXJTZXQgVGhlIHNldCB0byB1bmlvbiB3aXRoIHRoaXMgc2V0LlxuICogQHJldHVybnMge2x1bnIuU29ydGVkU2V0fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUudW5pb24gPSBmdW5jdGlvbiAob3RoZXJTZXQpIHtcbiAgdmFyIGxvbmdTZXQsIHNob3J0U2V0LCB1bmlvblNldFxuXG4gIGlmICh0aGlzLmxlbmd0aCA+PSBvdGhlclNldC5sZW5ndGgpIHtcbiAgICBsb25nU2V0ID0gdGhpcywgc2hvcnRTZXQgPSBvdGhlclNldFxuICB9IGVsc2Uge1xuICAgIGxvbmdTZXQgPSBvdGhlclNldCwgc2hvcnRTZXQgPSB0aGlzXG4gIH1cblxuICB1bmlvblNldCA9IGxvbmdTZXQuY2xvbmUoKVxuXG4gIGZvcih2YXIgaSA9IDAsIHNob3J0U2V0RWxlbWVudHMgPSBzaG9ydFNldC50b0FycmF5KCk7IGkgPCBzaG9ydFNldEVsZW1lbnRzLmxlbmd0aDsgaSsrKXtcbiAgICB1bmlvblNldC5hZGQoc2hvcnRTZXRFbGVtZW50c1tpXSlcbiAgfVxuXG4gIHJldHVybiB1bmlvblNldFxufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc29ydGVkIHNldCByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRvQXJyYXkoKVxufVxuLyohXG4gKiBsdW5yLkluZGV4XG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLkluZGV4IGlzIG9iamVjdCB0aGF0IG1hbmFnZXMgYSBzZWFyY2ggaW5kZXguICBJdCBjb250YWlucyB0aGUgaW5kZXhlc1xuICogYW5kIHN0b3JlcyBhbGwgdGhlIHRva2VucyBhbmQgZG9jdW1lbnQgbG9va3Vwcy4gIEl0IGFsc28gcHJvdmlkZXMgdGhlIG1haW5cbiAqIHVzZXIgZmFjaW5nIEFQSSBmb3IgdGhlIGxpYnJhcnkuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuSW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2ZpZWxkcyA9IFtdXG4gIHRoaXMuX3JlZiA9ICdpZCdcbiAgdGhpcy5waXBlbGluZSA9IG5ldyBsdW5yLlBpcGVsaW5lXG4gIHRoaXMuZG9jdW1lbnRTdG9yZSA9IG5ldyBsdW5yLlN0b3JlXG4gIHRoaXMudG9rZW5TdG9yZSA9IG5ldyBsdW5yLlRva2VuU3RvcmVcbiAgdGhpcy5jb3JwdXNUb2tlbnMgPSBuZXcgbHVuci5Tb3J0ZWRTZXRcbiAgdGhpcy5ldmVudEVtaXR0ZXIgPSAgbmV3IGx1bnIuRXZlbnRFbWl0dGVyXG4gIHRoaXMudG9rZW5pemVyRm4gPSBsdW5yLnRva2VuaXplclxuXG4gIHRoaXMuX2lkZkNhY2hlID0ge31cblxuICB0aGlzLm9uKCdhZGQnLCAncmVtb3ZlJywgJ3VwZGF0ZScsIChmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faWRmQ2FjaGUgPSB7fVxuICB9KS5iaW5kKHRoaXMpKVxufVxuXG4vKipcbiAqIEJpbmQgYSBoYW5kbGVyIHRvIGV2ZW50cyBiZWluZyBlbWl0dGVkIGJ5IHRoZSBpbmRleC5cbiAqXG4gKiBUaGUgaGFuZGxlciBjYW4gYmUgYm91bmQgdG8gbWFueSBldmVudHMgYXQgdGhlIHNhbWUgdGltZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gW2V2ZW50TmFtZV0gVGhlIG5hbWUocykgb2YgZXZlbnRzIHRvIGJpbmQgdGhlIGZ1bmN0aW9uIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHNlcmlhbGlzZWQgc2V0IHRvIGxvYWQuXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICByZXR1cm4gdGhpcy5ldmVudEVtaXR0ZXIuYWRkTGlzdGVuZXIuYXBwbHkodGhpcy5ldmVudEVtaXR0ZXIsIGFyZ3MpXG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGhhbmRsZXIgZnJvbSBhbiBldmVudCBiZWluZyBlbWl0dGVkIGJ5IHRoZSBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIGV2ZW50cyB0byByZW1vdmUgdGhlIGZ1bmN0aW9uIGZyb20uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgcmV0dXJuIHRoaXMuZXZlbnRFbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIGZuKVxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIGluZGV4LlxuICpcbiAqIElzc3VlcyBhIHdhcm5pbmcgaWYgdGhlIGluZGV4IGJlaW5nIGltcG9ydGVkIHdhcyBzZXJpYWxpc2VkXG4gKiBieSBhIGRpZmZlcmVudCB2ZXJzaW9uIG9mIGx1bnIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHNldCB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIGlmIChzZXJpYWxpc2VkRGF0YS52ZXJzaW9uICE9PSBsdW5yLnZlcnNpb24pIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ3ZlcnNpb24gbWlzbWF0Y2g6IGN1cnJlbnQgJyArIGx1bnIudmVyc2lvbiArICcgaW1wb3J0aW5nICcgKyBzZXJpYWxpc2VkRGF0YS52ZXJzaW9uKVxuICB9XG5cbiAgdmFyIGlkeCA9IG5ldyB0aGlzXG5cbiAgaWR4Ll9maWVsZHMgPSBzZXJpYWxpc2VkRGF0YS5maWVsZHNcbiAgaWR4Ll9yZWYgPSBzZXJpYWxpc2VkRGF0YS5yZWZcblxuICBpZHgudG9rZW5pemVyKGx1bnIudG9rZW5pemVyLmxvYWQoc2VyaWFsaXNlZERhdGEudG9rZW5pemVyKSlcbiAgaWR4LmRvY3VtZW50U3RvcmUgPSBsdW5yLlN0b3JlLmxvYWQoc2VyaWFsaXNlZERhdGEuZG9jdW1lbnRTdG9yZSlcbiAgaWR4LnRva2VuU3RvcmUgPSBsdW5yLlRva2VuU3RvcmUubG9hZChzZXJpYWxpc2VkRGF0YS50b2tlblN0b3JlKVxuICBpZHguY29ycHVzVG9rZW5zID0gbHVuci5Tb3J0ZWRTZXQubG9hZChzZXJpYWxpc2VkRGF0YS5jb3JwdXNUb2tlbnMpXG4gIGlkeC5waXBlbGluZSA9IGx1bnIuUGlwZWxpbmUubG9hZChzZXJpYWxpc2VkRGF0YS5waXBlbGluZSlcblxuICByZXR1cm4gaWR4XG59XG5cbi8qKlxuICogQWRkcyBhIGZpZWxkIHRvIHRoZSBsaXN0IG9mIGZpZWxkcyB0aGF0IHdpbGwgYmUgc2VhcmNoYWJsZSB3aXRoaW4gZG9jdW1lbnRzXG4gKiBpbiB0aGUgaW5kZXguXG4gKlxuICogQW4gb3B0aW9uYWwgYm9vc3QgcGFyYW0gY2FuIGJlIHBhc3NlZCB0byBhZmZlY3QgaG93IG11Y2ggdG9rZW5zIGluIHRoaXMgZmllbGRcbiAqIHJhbmsgaW4gc2VhcmNoIHJlc3VsdHMsIGJ5IGRlZmF1bHQgdGhlIGJvb3N0IHZhbHVlIGlzIDEuXG4gKlxuICogRmllbGRzIHNob3VsZCBiZSBhZGRlZCBiZWZvcmUgYW55IGRvY3VtZW50cyBhcmUgYWRkZWQgdG8gdGhlIGluZGV4LCBmaWVsZHNcbiAqIHRoYXQgYXJlIGFkZGVkIGFmdGVyIGRvY3VtZW50cyBhcmUgYWRkZWQgdG8gdGhlIGluZGV4IHdpbGwgb25seSBhcHBseSB0byBuZXdcbiAqIGRvY3VtZW50cyBhZGRlZCB0byB0aGUgaW5kZXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkTmFtZSBUaGUgbmFtZSBvZiB0aGUgZmllbGQgd2l0aGluIHRoZSBkb2N1bWVudCB0aGF0XG4gKiBzaG91bGQgYmUgaW5kZXhlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGJvb3N0IEFuIG9wdGlvbmFsIGJvb3N0IHRoYXQgY2FuIGJlIGFwcGxpZWQgdG8gdGVybXMgaW4gdGhpc1xuICogZmllbGQuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5maWVsZCA9IGZ1bmN0aW9uIChmaWVsZE5hbWUsIG9wdHMpIHtcbiAgdmFyIG9wdHMgPSBvcHRzIHx8IHt9LFxuICAgICAgZmllbGQgPSB7IG5hbWU6IGZpZWxkTmFtZSwgYm9vc3Q6IG9wdHMuYm9vc3QgfHwgMSB9XG5cbiAgdGhpcy5fZmllbGRzLnB1c2goZmllbGQpXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogU2V0cyB0aGUgcHJvcGVydHkgdXNlZCB0byB1bmlxdWVseSBpZGVudGlmeSBkb2N1bWVudHMgYWRkZWQgdG8gdGhlIGluZGV4LFxuICogYnkgZGVmYXVsdCB0aGlzIHByb3BlcnR5IGlzICdpZCcuXG4gKlxuICogVGhpcyBzaG91bGQgb25seSBiZSBjaGFuZ2VkIGJlZm9yZSBhZGRpbmcgZG9jdW1lbnRzIHRvIHRoZSBpbmRleCwgY2hhbmdpbmdcbiAqIHRoZSByZWYgcHJvcGVydHkgd2l0aG91dCByZXNldHRpbmcgdGhlIGluZGV4IGNhbiBsZWFkIHRvIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAqXG4gKiBUaGUgdmFsdWUgb2YgcmVmIGNhbiBiZSBvZiBhbnkgdHlwZSBidXQgaXQgX211c3RfIGJlIHN0YWJseSBjb21wYXJhYmxlIGFuZFxuICogb3JkZXJhYmxlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWZOYW1lIFRoZSBwcm9wZXJ0eSB0byB1c2UgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhlXG4gKiBkb2N1bWVudHMgaW4gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciB0byBlbWl0IGFkZCBldmVudHMsIGRlZmF1bHRzIHRvIHRydWVcbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uIChyZWZOYW1lKSB7XG4gIHRoaXMuX3JlZiA9IHJlZk5hbWVcbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSB0b2tlbml6ZXIgdXNlZCBmb3IgdGhpcyBpbmRleC5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoZSBpbmRleCB3aWxsIHVzZSB0aGUgZGVmYXVsdCB0b2tlbml6ZXIsIGx1bnIudG9rZW5pemVyLiBUaGUgdG9rZW5pemVyXG4gKiBzaG91bGQgb25seSBiZSBjaGFuZ2VkIGJlZm9yZSBhZGRpbmcgZG9jdW1lbnRzIHRvIHRoZSBpbmRleC4gQ2hhbmdpbmcgdGhlIHRva2VuaXplclxuICogd2l0aG91dCByZS1idWlsZGluZyB0aGUgaW5kZXggY2FuIGxlYWQgdG8gdW5leHBlY3RlZCByZXN1bHRzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byB1c2UgYXMgYSB0b2tlbml6ZXIuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS50b2tlbml6ZXIgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGlzUmVnaXN0ZXJlZCA9IGZuLmxhYmVsICYmIChmbi5sYWJlbCBpbiBsdW5yLnRva2VuaXplci5yZWdpc3RlcmVkRnVuY3Rpb25zKVxuXG4gIGlmICghaXNSZWdpc3RlcmVkKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdGdW5jdGlvbiBpcyBub3QgYSByZWdpc3RlcmVkIHRva2VuaXplci4gVGhpcyBtYXkgY2F1c2UgcHJvYmxlbXMgd2hlbiBzZXJpYWxpc2luZyB0aGUgaW5kZXgnKVxuICB9XG5cbiAgdGhpcy50b2tlbml6ZXJGbiA9IGZuXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQWRkIGEgZG9jdW1lbnQgdG8gdGhlIGluZGV4LlxuICpcbiAqIFRoaXMgaXMgdGhlIHdheSBuZXcgZG9jdW1lbnRzIGVudGVyIHRoZSBpbmRleCwgdGhpcyBmdW5jdGlvbiB3aWxsIHJ1biB0aGVcbiAqIGZpZWxkcyBmcm9tIHRoZSBkb2N1bWVudCB0aHJvdWdoIHRoZSBpbmRleCdzIHBpcGVsaW5lIGFuZCB0aGVuIGFkZCBpdCB0b1xuICogdGhlIGluZGV4LCBpdCB3aWxsIHRoZW4gc2hvdyB1cCBpbiBzZWFyY2ggcmVzdWx0cy5cbiAqXG4gKiBBbiAnYWRkJyBldmVudCBpcyBlbWl0dGVkIHdpdGggdGhlIGRvY3VtZW50IHRoYXQgaGFzIGJlZW4gYWRkZWQgYW5kIHRoZSBpbmRleFxuICogdGhlIGRvY3VtZW50IGhhcyBiZWVuIGFkZGVkIHRvLiBUaGlzIGV2ZW50IGNhbiBiZSBzaWxlbmNlZCBieSBwYXNzaW5nIGZhbHNlXG4gKiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGFkZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIFRoZSBkb2N1bWVudCB0byBhZGQgdG8gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciBvciBub3QgdG8gZW1pdCBldmVudHMsIGRlZmF1bHQgdHJ1ZS5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZG9jLCBlbWl0RXZlbnQpIHtcbiAgdmFyIGRvY1Rva2VucyA9IHt9LFxuICAgICAgYWxsRG9jdW1lbnRUb2tlbnMgPSBuZXcgbHVuci5Tb3J0ZWRTZXQsXG4gICAgICBkb2NSZWYgPSBkb2NbdGhpcy5fcmVmXSxcbiAgICAgIGVtaXRFdmVudCA9IGVtaXRFdmVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGVtaXRFdmVudFxuXG4gIHRoaXMuX2ZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgIHZhciBmaWVsZFRva2VucyA9IHRoaXMucGlwZWxpbmUucnVuKHRoaXMudG9rZW5pemVyRm4oZG9jW2ZpZWxkLm5hbWVdKSlcblxuICAgIGRvY1Rva2Vuc1tmaWVsZC5uYW1lXSA9IGZpZWxkVG9rZW5zXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkVG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdG9rZW4gPSBmaWVsZFRva2Vuc1tpXVxuICAgICAgYWxsRG9jdW1lbnRUb2tlbnMuYWRkKHRva2VuKVxuICAgICAgdGhpcy5jb3JwdXNUb2tlbnMuYWRkKHRva2VuKVxuICAgIH1cbiAgfSwgdGhpcylcblxuICB0aGlzLmRvY3VtZW50U3RvcmUuc2V0KGRvY1JlZiwgYWxsRG9jdW1lbnRUb2tlbnMpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxEb2N1bWVudFRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IGFsbERvY3VtZW50VG9rZW5zLmVsZW1lbnRzW2ldXG4gICAgdmFyIHRmID0gMDtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5fZmllbGRzLmxlbmd0aDsgaisrKXtcbiAgICAgIHZhciBmaWVsZCA9IHRoaXMuX2ZpZWxkc1tqXVxuICAgICAgdmFyIGZpZWxkVG9rZW5zID0gZG9jVG9rZW5zW2ZpZWxkLm5hbWVdXG4gICAgICB2YXIgZmllbGRMZW5ndGggPSBmaWVsZFRva2Vucy5sZW5ndGhcblxuICAgICAgaWYgKCFmaWVsZExlbmd0aCkgY29udGludWVcblxuICAgICAgdmFyIHRva2VuQ291bnQgPSAwXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IGZpZWxkTGVuZ3RoOyBrKyspe1xuICAgICAgICBpZiAoZmllbGRUb2tlbnNba10gPT09IHRva2VuKXtcbiAgICAgICAgICB0b2tlbkNvdW50KytcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0ZiArPSAodG9rZW5Db3VudCAvIGZpZWxkTGVuZ3RoICogZmllbGQuYm9vc3QpXG4gICAgfVxuXG4gICAgdGhpcy50b2tlblN0b3JlLmFkZCh0b2tlbiwgeyByZWY6IGRvY1JlZiwgdGY6IHRmIH0pXG4gIH07XG5cbiAgaWYgKGVtaXRFdmVudCkgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnYWRkJywgZG9jLCB0aGlzKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBkb2N1bWVudCBmcm9tIHRoZSBpbmRleC5cbiAqXG4gKiBUbyBtYWtlIHN1cmUgZG9jdW1lbnRzIG5vIGxvbmdlciBzaG93IHVwIGluIHNlYXJjaCByZXN1bHRzIHRoZXkgY2FuIGJlXG4gKiByZW1vdmVkIGZyb20gdGhlIGluZGV4IHVzaW5nIHRoaXMgbWV0aG9kLlxuICpcbiAqIFRoZSBkb2N1bWVudCBwYXNzZWQgb25seSBuZWVkcyB0byBoYXZlIHRoZSBzYW1lIHJlZiBwcm9wZXJ0eSB2YWx1ZSBhcyB0aGVcbiAqIGRvY3VtZW50IHRoYXQgd2FzIGFkZGVkIHRvIHRoZSBpbmRleCwgdGhleSBjb3VsZCBiZSBjb21wbGV0ZWx5IGRpZmZlcmVudFxuICogb2JqZWN0cy5cbiAqXG4gKiBBICdyZW1vdmUnIGV2ZW50IGlzIGVtaXR0ZWQgd2l0aCB0aGUgZG9jdW1lbnQgdGhhdCBoYXMgYmVlbiByZW1vdmVkIGFuZCB0aGUgaW5kZXhcbiAqIHRoZSBkb2N1bWVudCBoYXMgYmVlbiByZW1vdmVkIGZyb20uIFRoaXMgZXZlbnQgY2FuIGJlIHNpbGVuY2VkIGJ5IHBhc3NpbmcgZmFsc2VcbiAqIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gcmVtb3ZlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvY3VtZW50IHRvIHJlbW92ZSBmcm9tIHRoZSBpbmRleC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZW1pdEV2ZW50IFdoZXRoZXIgdG8gZW1pdCByZW1vdmUgZXZlbnRzLCBkZWZhdWx0cyB0byB0cnVlXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGRvYywgZW1pdEV2ZW50KSB7XG4gIHZhciBkb2NSZWYgPSBkb2NbdGhpcy5fcmVmXSxcbiAgICAgIGVtaXRFdmVudCA9IGVtaXRFdmVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGVtaXRFdmVudFxuXG4gIGlmICghdGhpcy5kb2N1bWVudFN0b3JlLmhhcyhkb2NSZWYpKSByZXR1cm5cblxuICB2YXIgZG9jVG9rZW5zID0gdGhpcy5kb2N1bWVudFN0b3JlLmdldChkb2NSZWYpXG5cbiAgdGhpcy5kb2N1bWVudFN0b3JlLnJlbW92ZShkb2NSZWYpXG5cbiAgZG9jVG9rZW5zLmZvckVhY2goZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy50b2tlblN0b3JlLnJlbW92ZSh0b2tlbiwgZG9jUmVmKVxuICB9LCB0aGlzKVxuXG4gIGlmIChlbWl0RXZlbnQpIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ3JlbW92ZScsIGRvYywgdGhpcylcbn1cblxuLyoqXG4gKiBVcGRhdGVzIGEgZG9jdW1lbnQgaW4gdGhlIGluZGV4LlxuICpcbiAqIFdoZW4gYSBkb2N1bWVudCBjb250YWluZWQgd2l0aGluIHRoZSBpbmRleCBnZXRzIHVwZGF0ZWQsIGZpZWxkcyBjaGFuZ2VkLFxuICogYWRkZWQgb3IgcmVtb3ZlZCwgdG8gbWFrZSBzdXJlIGl0IGNvcnJlY3RseSBtYXRjaGVkIGFnYWluc3Qgc2VhcmNoIHF1ZXJpZXMsXG4gKiBpdCBzaG91bGQgYmUgdXBkYXRlZCBpbiB0aGUgaW5kZXguXG4gKlxuICogVGhpcyBtZXRob2QgaXMganVzdCBhIHdyYXBwZXIgYXJvdW5kIGByZW1vdmVgIGFuZCBgYWRkYFxuICpcbiAqIEFuICd1cGRhdGUnIGV2ZW50IGlzIGVtaXR0ZWQgd2l0aCB0aGUgZG9jdW1lbnQgdGhhdCBoYXMgYmVlbiB1cGRhdGVkIGFuZCB0aGUgaW5kZXguXG4gKiBUaGlzIGV2ZW50IGNhbiBiZSBzaWxlbmNlZCBieSBwYXNzaW5nIGZhbHNlIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gdXBkYXRlLiBPbmx5XG4gKiBhbiB1cGRhdGUgZXZlbnQgd2lsbCBiZSBmaXJlZCwgdGhlICdhZGQnIGFuZCAncmVtb3ZlJyBldmVudHMgb2YgdGhlIHVuZGVybHlpbmcgY2FsbHNcbiAqIGFyZSBzaWxlbmNlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIFRoZSBkb2N1bWVudCB0byB1cGRhdGUgaW4gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciB0byBlbWl0IHVwZGF0ZSBldmVudHMsIGRlZmF1bHRzIHRvIHRydWVcbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLnJlbW92ZVxuICogQHNlZSBJbmRleC5wcm90b3R5cGUuYWRkXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRvYywgZW1pdEV2ZW50KSB7XG4gIHZhciBlbWl0RXZlbnQgPSBlbWl0RXZlbnQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBlbWl0RXZlbnRcblxuICB0aGlzLnJlbW92ZShkb2MsIGZhbHNlKVxuICB0aGlzLmFkZChkb2MsIGZhbHNlKVxuXG4gIGlmIChlbWl0RXZlbnQpIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ3VwZGF0ZScsIGRvYywgdGhpcylcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIGRvY3VtZW50IGZyZXF1ZW5jeSBmb3IgYSB0b2tlbiB3aXRoaW4gdGhlIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gY2FsY3VsYXRlIHRoZSBpZGYgb2YuXG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5pZGZcbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuaWRmID0gZnVuY3Rpb24gKHRlcm0pIHtcbiAgdmFyIGNhY2hlS2V5ID0gXCJAXCIgKyB0ZXJtXG4gIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5faWRmQ2FjaGUsIGNhY2hlS2V5KSkgcmV0dXJuIHRoaXMuX2lkZkNhY2hlW2NhY2hlS2V5XVxuXG4gIHZhciBkb2N1bWVudEZyZXF1ZW5jeSA9IHRoaXMudG9rZW5TdG9yZS5jb3VudCh0ZXJtKSxcbiAgICAgIGlkZiA9IDFcblxuICBpZiAoZG9jdW1lbnRGcmVxdWVuY3kgPiAwKSB7XG4gICAgaWRmID0gMSArIE1hdGgubG9nKHRoaXMuZG9jdW1lbnRTdG9yZS5sZW5ndGggLyBkb2N1bWVudEZyZXF1ZW5jeSlcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9pZGZDYWNoZVtjYWNoZUtleV0gPSBpZGZcbn1cblxuLyoqXG4gKiBTZWFyY2hlcyB0aGUgaW5kZXggdXNpbmcgdGhlIHBhc3NlZCBxdWVyeS5cbiAqXG4gKiBRdWVyaWVzIHNob3VsZCBiZSBhIHN0cmluZywgbXVsdGlwbGUgd29yZHMgYXJlIGFsbG93ZWQgYW5kIHdpbGwgbGVhZCB0byBhblxuICogQU5EIGJhc2VkIHF1ZXJ5LCBlLmcuIGBpZHguc2VhcmNoKCdmb28gYmFyJylgIHdpbGwgcnVuIGEgc2VhcmNoIGZvclxuICogZG9jdW1lbnRzIGNvbnRhaW5pbmcgYm90aCAnZm9vJyBhbmQgJ2JhcicuXG4gKlxuICogQWxsIHF1ZXJ5IHRva2VucyBhcmUgcGFzc2VkIHRocm91Z2ggdGhlIHNhbWUgcGlwZWxpbmUgdGhhdCBkb2N1bWVudCB0b2tlbnNcbiAqIGFyZSBwYXNzZWQgdGhyb3VnaCwgc28gYW55IGxhbmd1YWdlIHByb2Nlc3NpbmcgaW52b2x2ZWQgd2lsbCBiZSBydW4gb24gZXZlcnlcbiAqIHF1ZXJ5IHRlcm0uXG4gKlxuICogRWFjaCBxdWVyeSB0ZXJtIGlzIGV4cGFuZGVkLCBzbyB0aGF0IHRoZSB0ZXJtICdoZScgbWlnaHQgYmUgZXhwYW5kZWQgdG9cbiAqICdoZWxsbycgYW5kICdoZWxwJyBpZiB0aG9zZSB0ZXJtcyB3ZXJlIGFscmVhZHkgaW5jbHVkZWQgaW4gdGhlIGluZGV4LlxuICpcbiAqIE1hdGNoaW5nIGRvY3VtZW50cyBhcmUgcmV0dXJuZWQgYXMgYW4gYXJyYXkgb2Ygb2JqZWN0cywgZWFjaCBvYmplY3QgY29udGFpbnNcbiAqIHRoZSBtYXRjaGluZyBkb2N1bWVudCByZWYsIGFzIHNldCBmb3IgdGhpcyBpbmRleCwgYW5kIHRoZSBzaW1pbGFyaXR5IHNjb3JlXG4gKiBmb3IgdGhpcyBkb2N1bWVudCBhZ2FpbnN0IHRoZSBxdWVyeS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCB0aGUgaW5kZXggd2l0aC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5pZGZcbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLmRvY3VtZW50VmVjdG9yXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gIHZhciBxdWVyeVRva2VucyA9IHRoaXMucGlwZWxpbmUucnVuKHRoaXMudG9rZW5pemVyRm4ocXVlcnkpKSxcbiAgICAgIHF1ZXJ5VmVjdG9yID0gbmV3IGx1bnIuVmVjdG9yLFxuICAgICAgZG9jdW1lbnRTZXRzID0gW10sXG4gICAgICBmaWVsZEJvb3N0cyA9IHRoaXMuX2ZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGYpIHsgcmV0dXJuIG1lbW8gKyBmLmJvb3N0IH0sIDApXG5cbiAgdmFyIGhhc1NvbWVUb2tlbiA9IHF1ZXJ5VG9rZW5zLnNvbWUoZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5TdG9yZS5oYXModG9rZW4pXG4gIH0sIHRoaXMpXG5cbiAgaWYgKCFoYXNTb21lVG9rZW4pIHJldHVybiBbXVxuXG4gIHF1ZXJ5VG9rZW5zXG4gICAgLmZvckVhY2goZnVuY3Rpb24gKHRva2VuLCBpLCB0b2tlbnMpIHtcbiAgICAgIHZhciB0ZiA9IDEgLyB0b2tlbnMubGVuZ3RoICogdGhpcy5fZmllbGRzLmxlbmd0aCAqIGZpZWxkQm9vc3RzLFxuICAgICAgICAgIHNlbGYgPSB0aGlzXG5cbiAgICAgIHZhciBzZXQgPSB0aGlzLnRva2VuU3RvcmUuZXhwYW5kKHRva2VuKS5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGtleSkge1xuICAgICAgICB2YXIgcG9zID0gc2VsZi5jb3JwdXNUb2tlbnMuaW5kZXhPZihrZXkpLFxuICAgICAgICAgICAgaWRmID0gc2VsZi5pZGYoa2V5KSxcbiAgICAgICAgICAgIHNpbWlsYXJpdHlCb29zdCA9IDEsXG4gICAgICAgICAgICBzZXQgPSBuZXcgbHVuci5Tb3J0ZWRTZXRcblxuICAgICAgICAvLyBpZiB0aGUgZXhwYW5kZWQga2V5IGlzIG5vdCBhbiBleGFjdCBtYXRjaCB0byB0aGUgdG9rZW4gdGhlblxuICAgICAgICAvLyBwZW5hbGlzZSB0aGUgc2NvcmUgZm9yIHRoaXMga2V5IGJ5IGhvdyBkaWZmZXJlbnQgdGhlIGtleSBpc1xuICAgICAgICAvLyB0byB0aGUgdG9rZW4uXG4gICAgICAgIGlmIChrZXkgIT09IHRva2VuKSB7XG4gICAgICAgICAgdmFyIGRpZmYgPSBNYXRoLm1heCgzLCBrZXkubGVuZ3RoIC0gdG9rZW4ubGVuZ3RoKVxuICAgICAgICAgIHNpbWlsYXJpdHlCb29zdCA9IDEgLyBNYXRoLmxvZyhkaWZmKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBxdWVyeSB0Zi1pZGYgc2NvcmUgZm9yIHRoaXMgdG9rZW5cbiAgICAgICAgLy8gYXBwbHlpbmcgYW4gc2ltaWxhcml0eUJvb3N0IHRvIGVuc3VyZSBleGFjdCBtYXRjaGVzXG4gICAgICAgIC8vIHRoZXNlIHJhbmsgaGlnaGVyIHRoYW4gZXhwYW5kZWQgdGVybXNcbiAgICAgICAgaWYgKHBvcyA+IC0xKSBxdWVyeVZlY3Rvci5pbnNlcnQocG9zLCB0ZiAqIGlkZiAqIHNpbWlsYXJpdHlCb29zdClcblxuICAgICAgICAvLyBhZGQgYWxsIHRoZSBkb2N1bWVudHMgdGhhdCBoYXZlIHRoaXMga2V5IGludG8gYSBzZXRcbiAgICAgICAgLy8gZW5zdXJpbmcgdGhhdCB0aGUgdHlwZSBvZiBrZXkgaXMgcHJlc2VydmVkXG4gICAgICAgIHZhciBtYXRjaGluZ0RvY3VtZW50cyA9IHNlbGYudG9rZW5TdG9yZS5nZXQoa2V5KSxcbiAgICAgICAgICAgIHJlZnMgPSBPYmplY3Qua2V5cyhtYXRjaGluZ0RvY3VtZW50cyksXG4gICAgICAgICAgICByZWZzTGVuID0gcmVmcy5sZW5ndGhcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZnNMZW47IGkrKykge1xuICAgICAgICAgIHNldC5hZGQobWF0Y2hpbmdEb2N1bWVudHNbcmVmc1tpXV0ucmVmKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lbW8udW5pb24oc2V0KVxuICAgICAgfSwgbmV3IGx1bnIuU29ydGVkU2V0KVxuXG4gICAgICBkb2N1bWVudFNldHMucHVzaChzZXQpXG4gICAgfSwgdGhpcylcblxuICB2YXIgZG9jdW1lbnRTZXQgPSBkb2N1bWVudFNldHMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBzZXQpIHtcbiAgICByZXR1cm4gbWVtby5pbnRlcnNlY3Qoc2V0KVxuICB9KVxuXG4gIHJldHVybiBkb2N1bWVudFNldFxuICAgIC5tYXAoZnVuY3Rpb24gKHJlZikge1xuICAgICAgcmV0dXJuIHsgcmVmOiByZWYsIHNjb3JlOiBxdWVyeVZlY3Rvci5zaW1pbGFyaXR5KHRoaXMuZG9jdW1lbnRWZWN0b3IocmVmKSkgfVxuICAgIH0sIHRoaXMpXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZVxuICAgIH0pXG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgdmVjdG9yIGNvbnRhaW5pbmcgYWxsIHRoZSB0b2tlbnMgaW4gdGhlIGRvY3VtZW50IG1hdGNoaW5nIHRoZVxuICogcGFzc2VkIGRvY3VtZW50UmVmLlxuICpcbiAqIFRoZSB2ZWN0b3IgY29udGFpbnMgdGhlIHRmLWlkZiBzY29yZSBmb3IgZWFjaCB0b2tlbiBjb250YWluZWQgaW4gdGhlXG4gKiBkb2N1bWVudCB3aXRoIHRoZSBwYXNzZWQgZG9jdW1lbnRSZWYuICBUaGUgdmVjdG9yIHdpbGwgY29udGFpbiBhbiBlbGVtZW50XG4gKiBmb3IgZXZlcnkgdG9rZW4gaW4gdGhlIGluZGV4ZXMgY29ycHVzLCBpZiB0aGUgZG9jdW1lbnQgZG9lcyBub3QgY29udGFpbiB0aGF0XG4gKiB0b2tlbiB0aGUgZWxlbWVudCB3aWxsIGJlIDAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRvY3VtZW50UmVmIFRoZSByZWYgdG8gZmluZCB0aGUgZG9jdW1lbnQgd2l0aC5cbiAqIEByZXR1cm5zIHtsdW5yLlZlY3Rvcn1cbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuZG9jdW1lbnRWZWN0b3IgPSBmdW5jdGlvbiAoZG9jdW1lbnRSZWYpIHtcbiAgdmFyIGRvY3VtZW50VG9rZW5zID0gdGhpcy5kb2N1bWVudFN0b3JlLmdldChkb2N1bWVudFJlZiksXG4gICAgICBkb2N1bWVudFRva2Vuc0xlbmd0aCA9IGRvY3VtZW50VG9rZW5zLmxlbmd0aCxcbiAgICAgIGRvY3VtZW50VmVjdG9yID0gbmV3IGx1bnIuVmVjdG9yXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2N1bWVudFRva2Vuc0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gZG9jdW1lbnRUb2tlbnMuZWxlbWVudHNbaV0sXG4gICAgICAgIHRmID0gdGhpcy50b2tlblN0b3JlLmdldCh0b2tlbilbZG9jdW1lbnRSZWZdLnRmLFxuICAgICAgICBpZGYgPSB0aGlzLmlkZih0b2tlbilcblxuICAgIGRvY3VtZW50VmVjdG9yLmluc2VydCh0aGlzLmNvcnB1c1Rva2Vucy5pbmRleE9mKHRva2VuKSwgdGYgKiBpZGYpXG4gIH07XG5cbiAgcmV0dXJuIGRvY3VtZW50VmVjdG9yXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbmRleCByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiBsdW5yLnZlcnNpb24sXG4gICAgZmllbGRzOiB0aGlzLl9maWVsZHMsXG4gICAgcmVmOiB0aGlzLl9yZWYsXG4gICAgdG9rZW5pemVyOiB0aGlzLnRva2VuaXplckZuLmxhYmVsLFxuICAgIGRvY3VtZW50U3RvcmU6IHRoaXMuZG9jdW1lbnRTdG9yZS50b0pTT04oKSxcbiAgICB0b2tlblN0b3JlOiB0aGlzLnRva2VuU3RvcmUudG9KU09OKCksXG4gICAgY29ycHVzVG9rZW5zOiB0aGlzLmNvcnB1c1Rva2Vucy50b0pTT04oKSxcbiAgICBwaXBlbGluZTogdGhpcy5waXBlbGluZS50b0pTT04oKVxuICB9XG59XG5cbi8qKlxuICogQXBwbGllcyBhIHBsdWdpbiB0byB0aGUgY3VycmVudCBpbmRleC5cbiAqXG4gKiBBIHBsdWdpbiBpcyBhIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdpdGggdGhlIGluZGV4IGFzIGl0cyBjb250ZXh0LlxuICogUGx1Z2lucyBjYW4gYmUgdXNlZCB0byBjdXN0b21pc2Ugb3IgZXh0ZW5kIHRoZSBiZWhhdmlvdXIgdGhlIGluZGV4XG4gKiBpbiBzb21lIHdheS4gQSBwbHVnaW4gaXMganVzdCBhIGZ1bmN0aW9uLCB0aGF0IGVuY2Fwc3VsYXRlZCB0aGUgY3VzdG9tXG4gKiBiZWhhdmlvdXIgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgaW5kZXguXG4gKlxuICogVGhlIHBsdWdpbiBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBpbmRleCBhcyBpdHMgYXJndW1lbnQsIGFkZGl0aW9uYWxcbiAqIGFyZ3VtZW50cyBjYW4gYWxzbyBiZSBwYXNzZWQgd2hlbiBjYWxsaW5nIHVzZS4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkXG4gKiB3aXRoIHRoZSBpbmRleCBhcyBpdHMgY29udGV4dC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICB2YXIgbXlQbHVnaW4gPSBmdW5jdGlvbiAoaWR4LCBhcmcxLCBhcmcyKSB7XG4gKiAgICAgICAvLyBgdGhpc2AgaXMgdGhlIGluZGV4IHRvIGJlIGV4dGVuZGVkXG4gKiAgICAgICAvLyBhcHBseSBhbnkgZXh0ZW5zaW9ucyBldGMgaGVyZS5cbiAqICAgICB9XG4gKlxuICogICAgIHZhciBpZHggPSBsdW5yKGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHRoaXMudXNlKG15UGx1Z2luLCAnYXJnMScsICdhcmcyJylcbiAqICAgICB9KVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBsdWdpbiBUaGUgcGx1Z2luIHRvIGFwcGx5LlxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gIGFyZ3MudW5zaGlmdCh0aGlzKVxuICBwbHVnaW4uYXBwbHkodGhpcywgYXJncylcbn1cbi8qIVxuICogbHVuci5TdG9yZVxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5TdG9yZSBpcyBhIHNpbXBsZSBrZXktdmFsdWUgc3RvcmUgdXNlZCBmb3Igc3RvcmluZyBzZXRzIG9mIHRva2VucyBmb3JcbiAqIGRvY3VtZW50cyBzdG9yZWQgaW4gaW5kZXguXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAbW9kdWxlXG4gKi9cbmx1bnIuU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc3RvcmUgPSB7fVxuICB0aGlzLmxlbmd0aCA9IDBcbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBzdG9yZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCBzdG9yZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuU3RvcmV9XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIHZhciBzdG9yZSA9IG5ldyB0aGlzXG5cbiAgc3RvcmUubGVuZ3RoID0gc2VyaWFsaXNlZERhdGEubGVuZ3RoXG4gIHN0b3JlLnN0b3JlID0gT2JqZWN0LmtleXMoc2VyaWFsaXNlZERhdGEuc3RvcmUpLnJlZHVjZShmdW5jdGlvbiAobWVtbywga2V5KSB7XG4gICAgbWVtb1trZXldID0gbHVuci5Tb3J0ZWRTZXQubG9hZChzZXJpYWxpc2VkRGF0YS5zdG9yZVtrZXldKVxuICAgIHJldHVybiBtZW1vXG4gIH0sIHt9KVxuXG4gIHJldHVybiBzdG9yZVxufVxuXG4vKipcbiAqIFN0b3JlcyB0aGUgZ2l2ZW4gdG9rZW5zIGluIHRoZSBzdG9yZSBhZ2FpbnN0IHRoZSBnaXZlbiBpZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGtleSB1c2VkIHRvIHN0b3JlIHRoZSB0b2tlbnMgYWdhaW5zdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbnMgVGhlIHRva2VucyB0byBzdG9yZSBhZ2FpbnN0IHRoZSBrZXkuXG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGlkLCB0b2tlbnMpIHtcbiAgaWYgKCF0aGlzLmhhcyhpZCkpIHRoaXMubGVuZ3RoKytcbiAgdGhpcy5zdG9yZVtpZF0gPSB0b2tlbnNcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIHRva2VucyBmcm9tIHRoZSBzdG9yZSBmb3IgYSBnaXZlbiBrZXkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGlkIFRoZSBrZXkgdG8gbG9va3VwIGFuZCByZXRyaWV2ZSBmcm9tIHRoZSBzdG9yZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiB0aGlzLnN0b3JlW2lkXVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBzdG9yZSBjb250YWlucyBhIGtleS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGlkIHRvIGxvb2sgdXAgaW4gdGhlIHN0b3JlLlxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBpZCBpbiB0aGlzLnN0b3JlXG59XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgdmFsdWUgZm9yIGEga2V5IGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGlkIHRvIHJlbW92ZSBmcm9tIHRoZSBzdG9yZS5cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgaWYgKCF0aGlzLmhhcyhpZCkpIHJldHVyblxuXG4gIGRlbGV0ZSB0aGlzLnN0b3JlW2lkXVxuICB0aGlzLmxlbmd0aC0tXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzdG9yZSByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICBsZW5ndGg6IHRoaXMubGVuZ3RoXG4gIH1cbn1cblxuLyohXG4gKiBsdW5yLnN0ZW1tZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqIEluY2x1ZGVzIGNvZGUgZnJvbSAtIGh0dHA6Ly90YXJ0YXJ1cy5vcmcvfm1hcnRpbi9Qb3J0ZXJTdGVtbWVyL2pzLnR4dFxuICovXG5cbi8qKlxuICogbHVuci5zdGVtbWVyIGlzIGFuIGVuZ2xpc2ggbGFuZ3VhZ2Ugc3RlbW1lciwgdGhpcyBpcyBhIEphdmFTY3JpcHRcbiAqIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQb3J0ZXJTdGVtbWVyIHRha2VuIGZyb20gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIHN0ZW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci5zdGVtbWVyID0gKGZ1bmN0aW9uKCl7XG4gIHZhciBzdGVwMmxpc3QgPSB7XG4gICAgICBcImF0aW9uYWxcIiA6IFwiYXRlXCIsXG4gICAgICBcInRpb25hbFwiIDogXCJ0aW9uXCIsXG4gICAgICBcImVuY2lcIiA6IFwiZW5jZVwiLFxuICAgICAgXCJhbmNpXCIgOiBcImFuY2VcIixcbiAgICAgIFwiaXplclwiIDogXCJpemVcIixcbiAgICAgIFwiYmxpXCIgOiBcImJsZVwiLFxuICAgICAgXCJhbGxpXCIgOiBcImFsXCIsXG4gICAgICBcImVudGxpXCIgOiBcImVudFwiLFxuICAgICAgXCJlbGlcIiA6IFwiZVwiLFxuICAgICAgXCJvdXNsaVwiIDogXCJvdXNcIixcbiAgICAgIFwiaXphdGlvblwiIDogXCJpemVcIixcbiAgICAgIFwiYXRpb25cIiA6IFwiYXRlXCIsXG4gICAgICBcImF0b3JcIiA6IFwiYXRlXCIsXG4gICAgICBcImFsaXNtXCIgOiBcImFsXCIsXG4gICAgICBcIml2ZW5lc3NcIiA6IFwiaXZlXCIsXG4gICAgICBcImZ1bG5lc3NcIiA6IFwiZnVsXCIsXG4gICAgICBcIm91c25lc3NcIiA6IFwib3VzXCIsXG4gICAgICBcImFsaXRpXCIgOiBcImFsXCIsXG4gICAgICBcIml2aXRpXCIgOiBcIml2ZVwiLFxuICAgICAgXCJiaWxpdGlcIiA6IFwiYmxlXCIsXG4gICAgICBcImxvZ2lcIiA6IFwibG9nXCJcbiAgICB9LFxuXG4gICAgc3RlcDNsaXN0ID0ge1xuICAgICAgXCJpY2F0ZVwiIDogXCJpY1wiLFxuICAgICAgXCJhdGl2ZVwiIDogXCJcIixcbiAgICAgIFwiYWxpemVcIiA6IFwiYWxcIixcbiAgICAgIFwiaWNpdGlcIiA6IFwiaWNcIixcbiAgICAgIFwiaWNhbFwiIDogXCJpY1wiLFxuICAgICAgXCJmdWxcIiA6IFwiXCIsXG4gICAgICBcIm5lc3NcIiA6IFwiXCJcbiAgICB9LFxuXG4gICAgYyA9IFwiW15hZWlvdV1cIiwgICAgICAgICAgLy8gY29uc29uYW50XG4gICAgdiA9IFwiW2FlaW91eV1cIiwgICAgICAgICAgLy8gdm93ZWxcbiAgICBDID0gYyArIFwiW15hZWlvdXldKlwiLCAgICAvLyBjb25zb25hbnQgc2VxdWVuY2VcbiAgICBWID0gdiArIFwiW2FlaW91XSpcIiwgICAgICAvLyB2b3dlbCBzZXF1ZW5jZVxuXG4gICAgbWdyMCA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQywgICAgICAgICAgICAgICAvLyBbQ11WQy4uLiBpcyBtPjBcbiAgICBtZXExID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDICsgXCIoXCIgKyBWICsgXCIpPyRcIiwgIC8vIFtDXVZDW1ZdIGlzIG09MVxuICAgIG1ncjEgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgViArIEMgKyBWICsgQywgICAgICAgLy8gW0NdVkNWQy4uLiBpcyBtPjFcbiAgICBzX3YgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgdjsgICAgICAgICAgICAgICAgICAgLy8gdm93ZWwgaW4gc3RlbVxuXG4gIHZhciByZV9tZ3IwID0gbmV3IFJlZ0V4cChtZ3IwKTtcbiAgdmFyIHJlX21ncjEgPSBuZXcgUmVnRXhwKG1ncjEpO1xuICB2YXIgcmVfbWVxMSA9IG5ldyBSZWdFeHAobWVxMSk7XG4gIHZhciByZV9zX3YgPSBuZXcgUmVnRXhwKHNfdik7XG5cbiAgdmFyIHJlXzFhID0gL14oLis/KShzc3xpKWVzJC87XG4gIHZhciByZTJfMWEgPSAvXiguKz8pKFtec10pcyQvO1xuICB2YXIgcmVfMWIgPSAvXiguKz8pZWVkJC87XG4gIHZhciByZTJfMWIgPSAvXiguKz8pKGVkfGluZykkLztcbiAgdmFyIHJlXzFiXzIgPSAvLiQvO1xuICB2YXIgcmUyXzFiXzIgPSAvKGF0fGJsfGl6KSQvO1xuICB2YXIgcmUzXzFiXzIgPSBuZXcgUmVnRXhwKFwiKFteYWVpb3V5bHN6XSlcXFxcMSRcIik7XG4gIHZhciByZTRfMWJfMiA9IG5ldyBSZWdFeHAoXCJeXCIgKyBDICsgdiArIFwiW15hZWlvdXd4eV0kXCIpO1xuXG4gIHZhciByZV8xYyA9IC9eKC4rP1teYWVpb3VdKXkkLztcbiAgdmFyIHJlXzIgPSAvXiguKz8pKGF0aW9uYWx8dGlvbmFsfGVuY2l8YW5jaXxpemVyfGJsaXxhbGxpfGVudGxpfGVsaXxvdXNsaXxpemF0aW9ufGF0aW9ufGF0b3J8YWxpc218aXZlbmVzc3xmdWxuZXNzfG91c25lc3N8YWxpdGl8aXZpdGl8YmlsaXRpfGxvZ2kpJC87XG5cbiAgdmFyIHJlXzMgPSAvXiguKz8pKGljYXRlfGF0aXZlfGFsaXplfGljaXRpfGljYWx8ZnVsfG5lc3MpJC87XG5cbiAgdmFyIHJlXzQgPSAvXiguKz8pKGFsfGFuY2V8ZW5jZXxlcnxpY3xhYmxlfGlibGV8YW50fGVtZW50fG1lbnR8ZW50fG91fGlzbXxhdGV8aXRpfG91c3xpdmV8aXplKSQvO1xuICB2YXIgcmUyXzQgPSAvXiguKz8pKHN8dCkoaW9uKSQvO1xuXG4gIHZhciByZV81ID0gL14oLis/KWUkLztcbiAgdmFyIHJlXzVfMSA9IC9sbCQvO1xuICB2YXIgcmUzXzUgPSBuZXcgUmVnRXhwKFwiXlwiICsgQyArIHYgKyBcIlteYWVpb3V3eHldJFwiKTtcblxuICB2YXIgcG9ydGVyU3RlbW1lciA9IGZ1bmN0aW9uIHBvcnRlclN0ZW1tZXIodykge1xuICAgIHZhciAgIHN0ZW0sXG4gICAgICBzdWZmaXgsXG4gICAgICBmaXJzdGNoLFxuICAgICAgcmUsXG4gICAgICByZTIsXG4gICAgICByZTMsXG4gICAgICByZTQ7XG5cbiAgICBpZiAody5sZW5ndGggPCAzKSB7IHJldHVybiB3OyB9XG5cbiAgICBmaXJzdGNoID0gdy5zdWJzdHIoMCwxKTtcbiAgICBpZiAoZmlyc3RjaCA9PSBcInlcIikge1xuICAgICAgdyA9IGZpcnN0Y2gudG9VcHBlckNhc2UoKSArIHcuc3Vic3RyKDEpO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMWFcbiAgICByZSA9IHJlXzFhXG4gICAgcmUyID0gcmUyXzFhO1xuXG4gICAgaWYgKHJlLnRlc3QodykpIHsgdyA9IHcucmVwbGFjZShyZSxcIiQxJDJcIik7IH1cbiAgICBlbHNlIGlmIChyZTIudGVzdCh3KSkgeyB3ID0gdy5yZXBsYWNlKHJlMixcIiQxJDJcIik7IH1cblxuICAgIC8vIFN0ZXAgMWJcbiAgICByZSA9IHJlXzFiO1xuICAgIHJlMiA9IHJlMl8xYjtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KGZwWzFdKSkge1xuICAgICAgICByZSA9IHJlXzFiXzI7XG4gICAgICAgIHcgPSB3LnJlcGxhY2UocmUsXCJcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZTIudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUyLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZTIgPSByZV9zX3Y7XG4gICAgICBpZiAocmUyLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICAgIHJlMiA9IHJlMl8xYl8yO1xuICAgICAgICByZTMgPSByZTNfMWJfMjtcbiAgICAgICAgcmU0ID0gcmU0XzFiXzI7XG4gICAgICAgIGlmIChyZTIudGVzdCh3KSkgeyAgdyA9IHcgKyBcImVcIjsgfVxuICAgICAgICBlbHNlIGlmIChyZTMudGVzdCh3KSkgeyByZSA9IHJlXzFiXzI7IHcgPSB3LnJlcGxhY2UocmUsXCJcIik7IH1cbiAgICAgICAgZWxzZSBpZiAocmU0LnRlc3QodykpIHsgdyA9IHcgKyBcImVcIjsgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgMWMgLSByZXBsYWNlIHN1ZmZpeCB5IG9yIFkgYnkgaSBpZiBwcmVjZWRlZCBieSBhIG5vbi12b3dlbCB3aGljaCBpcyBub3QgdGhlIGZpcnN0IGxldHRlciBvZiB0aGUgd29yZCAoc28gY3J5IC0+IGNyaSwgYnkgLT4gYnksIHNheSAtPiBzYXkpXG4gICAgcmUgPSByZV8xYztcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHcgPSBzdGVtICsgXCJpXCI7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAyXG4gICAgcmUgPSByZV8yO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgc3VmZml4ID0gZnBbMl07XG4gICAgICByZSA9IHJlX21ncjA7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbSArIHN0ZXAybGlzdFtzdWZmaXhdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgM1xuICAgIHJlID0gcmVfMztcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHN1ZmZpeCA9IGZwWzJdO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW0gKyBzdGVwM2xpc3Rbc3VmZml4XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDRcbiAgICByZSA9IHJlXzQ7XG4gICAgcmUyID0gcmUyXzQ7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZSA9IHJlX21ncjE7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZTIuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXSArIGZwWzJdO1xuICAgICAgcmUyID0gcmVfbWdyMTtcbiAgICAgIGlmIChyZTIudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDVcbiAgICByZSA9IHJlXzU7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZSA9IHJlX21ncjE7XG4gICAgICByZTIgPSByZV9tZXExO1xuICAgICAgcmUzID0gcmUzXzU7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSB8fCAocmUyLnRlc3Qoc3RlbSkgJiYgIShyZTMudGVzdChzdGVtKSkpKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlID0gcmVfNV8xO1xuICAgIHJlMiA9IHJlX21ncjE7XG4gICAgaWYgKHJlLnRlc3QodykgJiYgcmUyLnRlc3QodykpIHtcbiAgICAgIHJlID0gcmVfMWJfMjtcbiAgICAgIHcgPSB3LnJlcGxhY2UocmUsXCJcIik7XG4gICAgfVxuXG4gICAgLy8gYW5kIHR1cm4gaW5pdGlhbCBZIGJhY2sgdG8geVxuXG4gICAgaWYgKGZpcnN0Y2ggPT0gXCJ5XCIpIHtcbiAgICAgIHcgPSBmaXJzdGNoLnRvTG93ZXJDYXNlKCkgKyB3LnN1YnN0cigxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdztcbiAgfTtcblxuICByZXR1cm4gcG9ydGVyU3RlbW1lcjtcbn0pKCk7XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnN0ZW1tZXIsICdzdGVtbWVyJylcbi8qIVxuICogbHVuci5zdG9wV29yZEZpbHRlclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyIGJ1aWxkcyBhIHN0b3BXb3JkRmlsdGVyIGZ1bmN0aW9uIGZyb20gdGhlIHByb3ZpZGVkXG4gKiBsaXN0IG9mIHN0b3Agd29yZHMuXG4gKlxuICogVGhlIGJ1aWx0IGluIGx1bnIuc3RvcFdvcmRGaWx0ZXIgaXMgYnVpbHQgdXNpbmcgdGhpcyBnZW5lcmF0b3IgYW5kIGNhbiBiZSB1c2VkXG4gKiB0byBnZW5lcmF0ZSBjdXN0b20gc3RvcFdvcmRGaWx0ZXJzIGZvciBhcHBsaWNhdGlvbnMgb3Igbm9uIEVuZ2xpc2ggbGFuZ3VhZ2VzLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7QXJyYXl9IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICogQHNlZSBsdW5yLlBpcGVsaW5lXG4gKiBAc2VlIGx1bnIuc3RvcFdvcmRGaWx0ZXJcbiAqL1xubHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyID0gZnVuY3Rpb24gKHN0b3BXb3Jkcykge1xuICB2YXIgd29yZHMgPSBzdG9wV29yZHMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBzdG9wV29yZCkge1xuICAgIG1lbW9bc3RvcFdvcmRdID0gc3RvcFdvcmRcbiAgICByZXR1cm4gbWVtb1xuICB9LCB7fSlcblxuICByZXR1cm4gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgaWYgKHRva2VuICYmIHdvcmRzW3Rva2VuXSAhPT0gdG9rZW4pIHJldHVybiB0b2tlblxuICB9XG59XG5cbi8qKlxuICogbHVuci5zdG9wV29yZEZpbHRlciBpcyBhbiBFbmdsaXNoIGxhbmd1YWdlIHN0b3Agd29yZCBsaXN0IGZpbHRlciwgYW55IHdvcmRzXG4gKiBjb250YWluZWQgaW4gdGhlIGxpc3Qgd2lsbCBub3QgYmUgcGFzc2VkIHRocm91Z2ggdGhlIGZpbHRlci5cbiAqXG4gKiBUaGlzIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgaW4gdGhlIFBpcGVsaW5lLiBJZiB0aGUgdG9rZW4gZG9lcyBub3QgcGFzcyB0aGVcbiAqIGZpbHRlciB0aGVuIHVuZGVmaW5lZCB3aWxsIGJlIHJldHVybmVkLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci5zdG9wV29yZEZpbHRlciA9IGx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlcihbXG4gICdhJyxcbiAgJ2FibGUnLFxuICAnYWJvdXQnLFxuICAnYWNyb3NzJyxcbiAgJ2FmdGVyJyxcbiAgJ2FsbCcsXG4gICdhbG1vc3QnLFxuICAnYWxzbycsXG4gICdhbScsXG4gICdhbW9uZycsXG4gICdhbicsXG4gICdhbmQnLFxuICAnYW55JyxcbiAgJ2FyZScsXG4gICdhcycsXG4gICdhdCcsXG4gICdiZScsXG4gICdiZWNhdXNlJyxcbiAgJ2JlZW4nLFxuICAnYnV0JyxcbiAgJ2J5JyxcbiAgJ2NhbicsXG4gICdjYW5ub3QnLFxuICAnY291bGQnLFxuICAnZGVhcicsXG4gICdkaWQnLFxuICAnZG8nLFxuICAnZG9lcycsXG4gICdlaXRoZXInLFxuICAnZWxzZScsXG4gICdldmVyJyxcbiAgJ2V2ZXJ5JyxcbiAgJ2ZvcicsXG4gICdmcm9tJyxcbiAgJ2dldCcsXG4gICdnb3QnLFxuICAnaGFkJyxcbiAgJ2hhcycsXG4gICdoYXZlJyxcbiAgJ2hlJyxcbiAgJ2hlcicsXG4gICdoZXJzJyxcbiAgJ2hpbScsXG4gICdoaXMnLFxuICAnaG93JyxcbiAgJ2hvd2V2ZXInLFxuICAnaScsXG4gICdpZicsXG4gICdpbicsXG4gICdpbnRvJyxcbiAgJ2lzJyxcbiAgJ2l0JyxcbiAgJ2l0cycsXG4gICdqdXN0JyxcbiAgJ2xlYXN0JyxcbiAgJ2xldCcsXG4gICdsaWtlJyxcbiAgJ2xpa2VseScsXG4gICdtYXknLFxuICAnbWUnLFxuICAnbWlnaHQnLFxuICAnbW9zdCcsXG4gICdtdXN0JyxcbiAgJ215JyxcbiAgJ25laXRoZXInLFxuICAnbm8nLFxuICAnbm9yJyxcbiAgJ25vdCcsXG4gICdvZicsXG4gICdvZmYnLFxuICAnb2Z0ZW4nLFxuICAnb24nLFxuICAnb25seScsXG4gICdvcicsXG4gICdvdGhlcicsXG4gICdvdXInLFxuICAnb3duJyxcbiAgJ3JhdGhlcicsXG4gICdzYWlkJyxcbiAgJ3NheScsXG4gICdzYXlzJyxcbiAgJ3NoZScsXG4gICdzaG91bGQnLFxuICAnc2luY2UnLFxuICAnc28nLFxuICAnc29tZScsXG4gICd0aGFuJyxcbiAgJ3RoYXQnLFxuICAndGhlJyxcbiAgJ3RoZWlyJyxcbiAgJ3RoZW0nLFxuICAndGhlbicsXG4gICd0aGVyZScsXG4gICd0aGVzZScsXG4gICd0aGV5JyxcbiAgJ3RoaXMnLFxuICAndGlzJyxcbiAgJ3RvJyxcbiAgJ3RvbycsXG4gICd0d2FzJyxcbiAgJ3VzJyxcbiAgJ3dhbnRzJyxcbiAgJ3dhcycsXG4gICd3ZScsXG4gICd3ZXJlJyxcbiAgJ3doYXQnLFxuICAnd2hlbicsXG4gICd3aGVyZScsXG4gICd3aGljaCcsXG4gICd3aGlsZScsXG4gICd3aG8nLFxuICAnd2hvbScsXG4gICd3aHknLFxuICAnd2lsbCcsXG4gICd3aXRoJyxcbiAgJ3dvdWxkJyxcbiAgJ3lldCcsXG4gICd5b3UnLFxuICAneW91cidcbl0pXG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnN0b3BXb3JkRmlsdGVyLCAnc3RvcFdvcmRGaWx0ZXInKVxuLyohXG4gKiBsdW5yLnRyaW1tZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIudHJpbW1lciBpcyBhIHBpcGVsaW5lIGZ1bmN0aW9uIGZvciB0cmltbWluZyBub24gd29yZFxuICogY2hhcmFjdGVycyBmcm9tIHRoZSBiZWdpbmluZyBhbmQgZW5kIG9mIHRva2VucyBiZWZvcmUgdGhleVxuICogZW50ZXIgdGhlIGluZGV4LlxuICpcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gbWF5IG5vdCB3b3JrIGNvcnJlY3RseSBmb3Igbm9uIGxhdGluXG4gKiBjaGFyYWN0ZXJzIGFuZCBzaG91bGQgZWl0aGVyIGJlIHJlbW92ZWQgb3IgYWRhcHRlZCBmb3IgdXNlXG4gKiB3aXRoIGxhbmd1YWdlcyB3aXRoIG5vbi1sYXRpbiBjaGFyYWN0ZXJzLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci50cmltbWVyID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIHJldHVybiB0b2tlbi5yZXBsYWNlKC9eXFxXKy8sICcnKS5yZXBsYWNlKC9cXFcrJC8sICcnKVxufVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci50cmltbWVyLCAndHJpbW1lcicpXG4vKiFcbiAqIGx1bnIuc3RlbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICogSW5jbHVkZXMgY29kZSBmcm9tIC0gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluL1BvcnRlclN0ZW1tZXIvanMudHh0XG4gKi9cblxuLyoqXG4gKiBsdW5yLlRva2VuU3RvcmUgaXMgdXNlZCBmb3IgZWZmaWNpZW50IHN0b3JpbmcgYW5kIGxvb2t1cCBvZiB0aGUgcmV2ZXJzZVxuICogaW5kZXggb2YgdG9rZW4gdG8gZG9jdW1lbnQgcmVmLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlRva2VuU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucm9vdCA9IHsgZG9jczoge30gfVxuICB0aGlzLmxlbmd0aCA9IDBcbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCB0b2tlbiBzdG9yZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCB0b2tlbiBzdG9yZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuVG9rZW5TdG9yZX1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIHZhciBzdG9yZSA9IG5ldyB0aGlzXG5cbiAgc3RvcmUucm9vdCA9IHNlcmlhbGlzZWREYXRhLnJvb3RcbiAgc3RvcmUubGVuZ3RoID0gc2VyaWFsaXNlZERhdGEubGVuZ3RoXG5cbiAgcmV0dXJuIHN0b3JlXG59XG5cbi8qKlxuICogQWRkcyBhIG5ldyB0b2tlbiBkb2MgcGFpciB0byB0aGUgc3RvcmUuXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIHN0b3JlIHRoZSBkb2MgdW5kZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvYyB0byBzdG9yZSBhZ2FpbnN0IHRoZSB0b2tlblxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydCBsb29raW5nIGZvciB0aGVcbiAqIGNvcnJlY3QgcGxhY2UgdG8gZW50ZXIgdGhlIGRvYywgYnkgZGVmYXVsdCB0aGUgcm9vdCBvZiB0aGlzIGx1bnIuVG9rZW5TdG9yZVxuICogaXMgdXNlZC5cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRva2VuLCBkb2MsIHJvb3QpIHtcbiAgdmFyIHJvb3QgPSByb290IHx8IHRoaXMucm9vdCxcbiAgICAgIGtleSA9IHRva2VuLmNoYXJBdCgwKSxcbiAgICAgIHJlc3QgPSB0b2tlbi5zbGljZSgxKVxuXG4gIGlmICghKGtleSBpbiByb290KSkgcm9vdFtrZXldID0ge2RvY3M6IHt9fVxuXG4gIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJvb3Rba2V5XS5kb2NzW2RvYy5yZWZdID0gZG9jXG4gICAgdGhpcy5sZW5ndGggKz0gMVxuICAgIHJldHVyblxuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmFkZChyZXN0LCBkb2MsIHJvb3Rba2V5XSlcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMga2V5IGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhpcyBsdW5yLlRva2VuU3RvcmUuXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGNoZWNrIGZvclxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydFxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIGZhbHNlXG5cbiAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFub2RlW3Rva2VuLmNoYXJBdChpKV0pIHJldHVybiBmYWxzZVxuXG4gICAgbm9kZSA9IG5vZGVbdG9rZW4uY2hhckF0KGkpXVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBhIG5vZGUgZnJvbSB0aGUgdG9rZW4gc3RvcmUgZm9yIGEgZ2l2ZW4gdG9rZW4uXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGdldCB0aGUgbm9kZSBmb3IuXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0LlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBzZWUgVG9rZW5TdG9yZS5wcm90b3R5cGUuZ2V0XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmdldE5vZGUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIHt9XG5cbiAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFub2RlW3Rva2VuLmNoYXJBdChpKV0pIHJldHVybiB7fVxuXG4gICAgbm9kZSA9IG5vZGVbdG9rZW4uY2hhckF0KGkpXVxuICB9XG5cbiAgcmV0dXJuIG5vZGVcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgZG9jdW1lbnRzIGZvciBhIG5vZGUgZm9yIHRoZSBnaXZlbiB0b2tlbi5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gZ2V0IHRoZSBkb2N1bWVudHMgZm9yLlxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh0b2tlbiwgcm9vdCkge1xuICByZXR1cm4gdGhpcy5nZXROb2RlKHRva2VuLCByb290KS5kb2NzIHx8IHt9XG59XG5cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuY291bnQgPSBmdW5jdGlvbiAodG9rZW4sIHJvb3QpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZ2V0KHRva2VuLCByb290KSkubGVuZ3RoXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkb2N1bWVudCBpZGVudGlmaWVkIGJ5IHJlZiBmcm9tIHRoZSB0b2tlbiBpbiB0aGUgc3RvcmUuXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGdldCB0aGUgZG9jdW1lbnRzIGZvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSByZWYgVGhlIHJlZiBvZiB0aGUgZG9jdW1lbnQgdG8gcmVtb3ZlIGZyb20gdGhpcyB0b2tlbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAodG9rZW4sIHJlZikge1xuICBpZiAoIXRva2VuKSByZXR1cm5cbiAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCEodG9rZW4uY2hhckF0KGkpIGluIG5vZGUpKSByZXR1cm5cbiAgICBub2RlID0gbm9kZVt0b2tlbi5jaGFyQXQoaSldXG4gIH1cblxuICBkZWxldGUgbm9kZS5kb2NzW3JlZl1cbn1cblxuLyoqXG4gKiBGaW5kIGFsbCB0aGUgcG9zc2libGUgc3VmZml4ZXMgb2YgdGhlIHBhc3NlZCB0b2tlbiB1c2luZyB0b2tlbnNcbiAqIGN1cnJlbnRseSBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBleHBhbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmV4cGFuZCA9IGZ1bmN0aW9uICh0b2tlbiwgbWVtbykge1xuICB2YXIgcm9vdCA9IHRoaXMuZ2V0Tm9kZSh0b2tlbiksXG4gICAgICBkb2NzID0gcm9vdC5kb2NzIHx8IHt9LFxuICAgICAgbWVtbyA9IG1lbW8gfHwgW11cblxuICBpZiAoT2JqZWN0LmtleXMoZG9jcykubGVuZ3RoKSBtZW1vLnB1c2godG9rZW4pXG5cbiAgT2JqZWN0LmtleXMocm9vdClcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoa2V5ID09PSAnZG9jcycpIHJldHVyblxuXG4gICAgICBtZW1vLmNvbmNhdCh0aGlzLmV4cGFuZCh0b2tlbiArIGtleSwgbWVtbykpXG4gICAgfSwgdGhpcylcblxuICByZXR1cm4gbWVtb1xufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdG9rZW4gc3RvcmUgcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHJvb3Q6IHRoaXMucm9vdCxcbiAgICBsZW5ndGg6IHRoaXMubGVuZ3RoXG4gIH1cbn1cblxuICAvKipcbiAgICogZXhwb3J0IHRoZSBtb2R1bGUgdmlhIEFNRCwgQ29tbW9uSlMgb3IgYXMgYSBicm93c2VyIGdsb2JhbFxuICAgKiBFeHBvcnQgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvcmV0dXJuRXhwb3J0cy5qc1xuICAgKi9cbiAgOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgIGRlZmluZShmYWN0b3J5KVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAvKipcbiAgICAgICAqIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgICAgICogb25seSBDb21tb25KUy1saWtlIGVudmlyb21lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAqIGxpa2UgTm9kZS5cbiAgICAgICAqL1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICAgIHJvb3QubHVuciA9IGZhY3RvcnkoKVxuICAgIH1cbiAgfSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogSnVzdCByZXR1cm4gYSB2YWx1ZSB0byBkZWZpbmUgdGhlIG1vZHVsZSBleHBvcnQuXG4gICAgICogVGhpcyBleGFtcGxlIHJldHVybnMgYW4gb2JqZWN0LCBidXQgdGhlIG1vZHVsZVxuICAgICAqIGNhbiByZXR1cm4gYSBmdW5jdGlvbiBhcyB0aGUgZXhwb3J0ZWQgdmFsdWUuXG4gICAgICovXG4gICAgcmV0dXJuIGx1bnJcbiAgfSkpXG59KSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9sdW5yL2x1bnIuanMiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiXG5cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQgPSAnZGF0YS1pZCc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IGlmIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGVcbiAqL1xuY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IChlbGVtZW50LCB2aXNpYmxlKSA9PiAodmlzaWJsZSA/IHNob3cgOiBoaWRlKShlbGVtZW50KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdHJpbmcgaXMgZW1wdHlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRW1wdHkgPSAodGV4dCkgPT4gKHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJykgJiYgKHRleHQubGVuZ3RoID09PSAwKTtcblxuLyoqXG4gKiBQcm9wYWdhdGVzIHJvdyBzZWxlY3Rpb24gdHJvdWdoIHRoZSBldmVudCBzeXN0ZW1cbiAqXG4gKiBAcGFyYW0ge0V2ZW50ZnVsfSBldmVudGZ1bFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmNvbnN0IHJlbGF5Q2xpY2tFdmVudEFzID0gY3VycnkoZnVuY3Rpb24odHlwZSwgZXZlbnRmdWwsIGVsZW1lbnQpIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBldmVudGZ1bC5maXJlKHR5cGUsIHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBpZDogZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGVsZW1lbnQpXG4gICAgfSlcbiAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59KTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gYmFjayBidXR0b25cbiAgICBjb25zdCBiYWNrQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJhY2tCdXR0b25FbGVtZW50LmNsYXNzTmFtZSA9ICdiYWNrLWJ1dHRvbiBpY29uLWFycm93LXRoaWNrJztcbiAgICByZWxheUNsaWNrRXZlbnRBcygnY2xvc2UnLCB0aGlzLCBiYWNrQnV0dG9uRWxlbWVudCk7XG5cbiAgICAvLyBpbWFnZVxuICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICB0aGlzLmltYWdlLmNsYXNzTmFtZSA9ICdpbWctcmVzcG9uc2l2ZSc7XG5cbiAgICBjb25zdCBpbWFnZVdyYXBwZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW1hZ2VXcmFwcGVyRWxlbWVudC5jbGFzc05hbWUgPSAnaW1hZ2Utd3JhcHBlcic7XG4gICAgaW1hZ2VXcmFwcGVyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmltYWdlKTtcblxuICAgIC8vIHRpdGxlXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG5cbiAgICAvLyBhdXRob3JcbiAgICB0aGlzLmF1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYXV0aG9yLmNsYXNzTmFtZSA9ICdhdXRob3InO1xuICAgIHRoaXMuYXV0aG9yLmlubmVySFRNTCA9ICdieSBKb3ViZWwnOyAvLyBUT0RPIE1ha2UgZHluYW1pY1xuXG4gICAgLy8gZGVzY3JpcHRpb25cbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMuZGVzY3JpcHRpb24uY2xhc3NOYW1lID0gJ3NtYWxsJztcblxuICAgIC8vIGRlbW8gYnV0dG9uXG4gICAgdGhpcy5kZW1vQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHRoaXMuZGVtb0J1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcbiAgICB0aGlzLmRlbW9CdXR0b24uaW5uZXJIVE1MID0gJ0NvbnRlbnQgRGVtbyc7XG4gICAgdGhpcy5kZW1vQnV0dG9uLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xuICAgIGhpZGUodGhpcy5kZW1vQnV0dG9uKTtcblxuICAgIGNvbnN0IHRleHREZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGV4dERldGFpbHMuY2xhc3NOYW1lID0gJ3RleHQtZGV0YWlscyc7XG4gICAgdGV4dERldGFpbHMuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgdGV4dERldGFpbHMuYXBwZW5kQ2hpbGQodGhpcy5hdXRob3IpO1xuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMuZGVzY3JpcHRpb24pO1xuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMuZGVtb0J1dHRvbik7XG5cbiAgICBjb25zdCBkZXRhaWxzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRldGFpbHNFbGVtZW50LmNsYXNzTmFtZSA9ICdjb250YWluZXInO1xuICAgIGRldGFpbHNFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlV3JhcHBlckVsZW1lbnQpO1xuICAgIGRldGFpbHNFbGVtZW50LmFwcGVuZENoaWxkKHRleHREZXRhaWxzKTtcblxuICAgIC8vIHVzZSBidXR0b25cbiAgICB0aGlzLnVzZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0aGlzLnVzZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uIGJ1dHRvbi1wcmltYXJ5JztcbiAgICB0aGlzLnVzZUJ1dHRvbi5pbm5lckhUTUwgPSAnVXNlJztcbiAgICBoaWRlKHRoaXMudXNlQnV0dG9uKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0JywgdGhpcywgdGhpcy51c2VCdXR0b24pO1xuXG4gICAgLy8gaW5zdGFsbCBidXR0b25cbiAgICB0aGlzLmluc3RhbGxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24gYnV0dG9uLWludmVyc2UtcHJpbWFyeSc7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLmlubmVySFRNTCA9ICdJbnN0YWxsJztcbiAgICBoaWRlKHRoaXMuaW5zdGFsbEJ1dHRvbik7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2luc3RhbGwnLCB0aGlzLCB0aGlzLmluc3RhbGxCdXR0b24pO1xuXG4gICAgY29uc3QgYnV0dG9uQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYnV0dG9uQmFyLmNsYXNzTmFtZSA9ICdidXR0b24tYmFyJztcbiAgICBidXR0b25CYXIuYXBwZW5kQ2hpbGQodGhpcy51c2VCdXR0b24pO1xuICAgIGJ1dHRvbkJhci5hcHBlbmRDaGlsZCh0aGlzLmluc3RhbGxCdXR0b24pO1xuXG4gICAgLy8gbGljZW5jZSBwYW5lbFxuICAgIGNvbnN0IGxpY2VuY2VQYW5lbCA9IHRoaXMuY3JlYXRlUGFuZWwoJ1RoZSBMaWNlbmNlIEluZm8nLCAnaXBzdW0gbG9ydW0nLCAnbGljZW5jZS1wYW5lbCcpO1xuICAgIGNvbnN0IHBsdWdpbnNQYW5lbCA9IHRoaXMuY3JlYXRlUGFuZWwoJ0F2YWlsYWJsZSBwbHVnaW5zJywgJ2lwc3VtIGxvcnVtJywgJ3BsdWdpbnMtcGFuZWwnKTtcbiAgICBjb25zdCBwdWJsaXNoZXJQYW5lbCA9IHRoaXMuY3JlYXRlUGFuZWwoJ1B1Ymxpc2hlciBJbmZvJywgJ2lwc3VtIGxvcnVtJywgJ3B1Ymxpc2hlci1wYW5lbCcpO1xuXG4gICAgLy8gcGFuZWwgZ3JvdXBcbiAgICBjb25zdCBwYW5lbEdyb3VwRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBhbmVsR3JvdXBFbGVtZW50LmNsYXNzTmFtZSA9ICdwYW5lbC1ncm91cCc7XG4gICAgcGFuZWxHcm91cEVsZW1lbnQuYXBwZW5kQ2hpbGQobGljZW5jZVBhbmVsKTtcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5hcHBlbmRDaGlsZChwbHVnaW5zUGFuZWwpO1xuICAgIHBhbmVsR3JvdXBFbGVtZW50LmFwcGVuZENoaWxkKHB1Ymxpc2hlclBhbmVsKTtcblxuICAgIC8vIGFkZCByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWRldGFpbCc7XG4gICAgdGhpcy5yb290RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKGJhY2tCdXR0b25FbGVtZW50KTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKGRldGFpbHNFbGVtZW50KTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkJhcik7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChwYW5lbEdyb3VwRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keVxuICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keUlkXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlUGFuZWwodGl0bGUsIGJvZHksIGJvZHlJZCkge1xuICAgIGNvbnN0IGhlYWRlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaGVhZGVyRWwuY2xhc3NOYW1lID0gJ3BhbmVsLWhlYWRlcic7XG4gICAgaGVhZGVyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgaGVhZGVyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgYm9keUlkKTtcbiAgICBoZWFkZXJFbC5pbm5lckhUTUwgPSB0aXRsZTtcblxuICAgIGNvbnN0IGJvZHlJbm5lckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm9keUlubmVyRWwuY2xhc3NOYW1lID0gJ3BhbmVsLWJvZHktaW5uZXInO1xuICAgIGJvZHlJbm5lckVsLmlubmVySFRNTCA9IGJvZHk7XG5cbiAgICBjb25zdCBib2R5RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBib2R5RWwuY2xhc3NOYW1lID0gJ3BhbmVsLWJvZHknO1xuICAgIGJvZHlFbC5pZCA9IGJvZHlJZDtcbiAgICBib2R5RWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgYm9keUVsLmFwcGVuZENoaWxkKGJvZHlJbm5lckVsKTtcblxuICAgIGNvbnN0IHBhbmVsRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYW5lbEVsLmNsYXNzTmFtZSA9ICdwYW5lbCc7XG4gICAgcGFuZWxFbC5hcHBlbmRDaGlsZChoZWFkZXJFbCk7XG4gICAgcGFuZWxFbC5hcHBlbmRDaGlsZChib2R5RWwpO1xuXG4gICAgaW5pdFBhbmVsKHBhbmVsRWwpO1xuXG4gICAgcmV0dXJuIHBhbmVsRWw7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgaW1hZ2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICAgKi9cbiAgc2V0SW1hZ2Uoc3JjKSB7XG4gICAgdGhpcy5pbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRJZChpZCkge1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICAgIHRoaXMudXNlQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbG9uZyBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgc2V0RGVzY3JpcHRpb24odGV4dCkge1xuICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gdGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBleGFtcGxlIHVybFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBzZXRFeGFtcGxlKHVybCkge1xuICAgIHRoaXMuZGVtb0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwgfHwgJyMnKTtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuZGVtb0J1dHRvbiwgIWlzRW1wdHkodXJsKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBpZiB0aGUgY29udGVudCB0eXBlIGlzIGluc3RhbGxlZFxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluc3RhbGxlZFxuICAgKi9cbiAgc2V0SXNJbnN0YWxsZWQoaW5zdGFsbGVkKSB7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLnVzZUJ1dHRvbiwgaW5zdGFsbGVkKTtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuaW5zdGFsbEJ1dHRvbiwgIWluc3RhbGxlZCk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlRGV0YWlsVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXdcIjtcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tIFwiLi4vaHViLXNlcnZpY2VzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWwge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIHZpZXdzXG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVEZXRhaWxWaWV3KHN0YXRlKTtcbiAgICB0aGlzLnZpZXcub24oJ2luc3RhbGwnLCB0aGlzLmluc3RhbGwsIHRoaXMpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnY2xvc2UnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGxvYWRCeUlkKGlkKSB7XG4gICAgdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcbiAgICAgIC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpXG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gICBpbnN0YWxsKHtpZH0pIHtcbiAgICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUpXG4gICAgICAgLnRoZW4obWFjaGluZU5hbWUgPT4gdGhpcy5zZXJ2aWNlcy5pbnN0YWxsQ29udGVudFR5cGUobWFjaGluZU5hbWUpKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IGNvbnNvbGUuZGVidWcoJ1RPRE8sIGd1aSB1cGRhdGVzJykpXG4gICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZpZXcgd2l0aCB0aGUgY29udGVudCB0eXBlIGRhdGFcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZSkge1xuICAgIHRoaXMudmlldy5zZXRJZChjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG4gICAgdGhpcy52aWV3LnNldFRpdGxlKGNvbnRlbnRUeXBlLnRpdGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0RGVzY3JpcHRpb24oY29udGVudFR5cGUuZGVzY3JpcHRpb24pO1xuICAgIHRoaXMudmlldy5zZXRJbWFnZShjb250ZW50VHlwZS5pY29uKTtcbiAgICB0aGlzLnZpZXcuc2V0RXhhbXBsZShjb250ZW50VHlwZS5leGFtcGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQoISFjb250ZW50VHlwZS5pbnN0YWxsZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCA9ICdkYXRhLWlkJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIFByb3BhZ2F0ZXMgcm93IHNlbGVjdGlvbiB0cm91Z2ggdGhlIGV2ZW50IHN5c3RlbVxuICpcbiAqIEBwYXJhbSB7RXZlbnRmdWx9IGV2ZW50ZnVsXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuY29uc3QgcmVsYXlDbGlja0V2ZW50QXMgPSBjdXJyeShmdW5jdGlvbih0eXBlLCBldmVudGZ1bCwgZWxlbWVudCkge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGV2ZW50ZnVsLmZpcmUodHlwZSwge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGlkOiBnZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgZWxlbWVudClcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuICByZXR1cm4gZWxlbWVudDtcbn0pO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIHJvb3QgZWxlbWVudFxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1saXN0JztcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gICAqL1xuICB1cGRhdGVMaXN0KGNvbnRlbnRUeXBlcykge1xuICAgIGlmKHRoaXMucm9vdEVsZW1lbnQpe1xuICAgICAgd2hpbGUodGhpcy5yb290RWxlbWVudC5maXJzdENoaWxkICl7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5yb290RWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlckNvbnRlbnRUeXBlTGlzdChjb250ZW50VHlwZXMpXG4gICAgICAuZm9yRWFjaChjb250ZW50VHlwZSA9PiB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKGNvbnRlbnRUeXBlKSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBjcmVhdGUgcm93cywgYW5kIGFkZCB0byB0aGUgbGlzdFxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfVxuICAgKi9cbiAgcmVuZGVyQ29udGVudFR5cGVMaXN0KGNvbnRlbnRUeXBlcykge1xuICAgIHJldHVybiBjb250ZW50VHlwZXNcbiAgICAgIC5tYXAoY29udGVudFR5cGUgPT4gdGhpcy5jcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSkpXG4gICAgICAubWFwKHJlbGF5Q2xpY2tFdmVudEFzKCdyb3ctc2VsZWN0ZWQnLCB0aGlzKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIENvbnRlbnQgVHlwZSBjb25maWd1cmF0aW9uIGFuZCBjcmVhdGVzIGEgcm93IGRvbVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlKSB7XG4gICAgLy8gaW1hZ2VcbiAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltYWdlLmNsYXNzTmFtZSA9ICdpbWctcmVzcG9uc2l2ZSc7XG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBjb250ZW50VHlwZS5pY29uKTtcblxuICAgIC8vIHRpdGxlXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgIHRpdGxlLmlubmVySFRNTCA9IGNvbnRlbnRUeXBlLnRpdGxlO1xuXG4gICAgLy8gZGVzY3JpcHRpb25cbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRlc2NyaXB0aW9uLmNsYXNzTmFtZSA9ICdkZXNjcmlwdGlvbic7XG4gICAgZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gY29udGVudFR5cGUuc3VtbWFyeTtcblxuICAgIC8vIGxpc3QgaXRlbVxuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgcm93LmlkID0gYGNvbnRlbnQtdHlwZS0ke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfWA7XG4gICAgcm93LnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG4gICAgcm93LmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICByb3cuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVCdXR0b25FbGVtZW50KGNvbnRlbnRUeXBlKSk7XG4gICAgcm93LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICByb3cuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgcmV0dXJuIHJvdztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgY3JlYXRlQnV0dG9uRWxlbWVudChjb250ZW50VHlwZSkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgIGlmKGNvbnRlbnRUeXBlLmluc3RhbGxlZCkge1xuICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwiYnV0dG9uIGJ1dHRvbi1wcmltYXJ5XCI7XG4gICAgICBidXR0b24uaW5uZXJIVE1MID0gXCJVc2VcIjtcbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHRoaXMsIGJ1dHRvbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwiYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnlcIjtcbiAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcImluc3RhbGxcIjtcbiAgICAgIC8vIG5vIGZ1bmN0aW9uYWxpdHksIHVzZXMgY2xpY2sgZXZlbnQgb24gcm93XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVMaXN0VmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtbGlzdC12aWV3XCI7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIFJvdyBzZWxlY3RlZCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGFkZCB0aGUgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlTGlzdFZpZXcoc3RhdGUpO1xuICAgIHRoaXMucHJvcGFnYXRlKFsncm93LXNlbGVjdGVkJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGUgdGhpcyBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGlzIGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgd2l0aCBuZXcgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlcykge1xuICAgIHRoaXMudmlldy51cGRhdGVMaXN0KGNvbnRlbnRUeXBlcyk7XG4gICAgdGhpcy5maXJlKCd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnLCB7fSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmlld3Mgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJpbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50QnJvd3NlclZpZXcge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xuICAgIGNvbnN0IG1lbnUgPSB0aGlzLmNyZWF0ZU1lbnVFbGVtZW50KCk7XG4gICAgY29uc3QgaW5wdXRHcm91cCA9IHRoaXMuY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQoKTtcblxuICAgIC8vIG1lbnUgZ3JvdXBcbiAgICBjb25zdCBtZW51R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZW51R3JvdXAuY2xhc3NOYW1lID0gJ21lbnUtZ3JvdXAnO1xuICAgIG1lbnVHcm91cC5hcHBlbmRDaGlsZChtZW51KTtcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRHcm91cCk7XG5cbiAgICAvLyByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQobWVudUdyb3VwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbWVudSBpdGVtXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgYWRkTWVudUl0ZW0odGV4dCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnVpdGVtJyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0O1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgnbWVudS1zZWxlY3RlZCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHNldHMgZmlyc3QgdG8gYmUgc2VsZWN0ZWRcbiAgICBpZih0aGlzLm1lbnVCYXJFbGVtZW50LmNoaWxkRWxlbWVudENvdW50IDwgMSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0byBtZW51IGJhclxuICAgIHRoaXMubWVudUJhckVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtZW51IGJhciBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVNZW51RWxlbWVudCgpIHtcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51YmFyJyk7XG4gICAgdGhpcy5tZW51QmFyRWxlbWVudC5jbGFzc05hbWUgPSAnaDVwLW1lbnUnO1xuXG4gICAgY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgIG5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5tZW51QmFyRWxlbWVudCk7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwibWVudS10aXRsZVwiO1xuICAgIHRpdGxlLmlubmVySFRNTCA9IFwiQnJvd3NlIGNvbnRlbnQgdHlwZXNcIjtcblxuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZW51LmNsYXNzTmFtZSA9IFwibWVudVwiO1xuICAgIG1lbnUuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIG1lbnUuYXBwZW5kQ2hpbGQobmF2RWxlbWVudCk7XG5cbiAgICByZXR1cm4gbWVudTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBpbnB1dCBncm91cCB1c2VkIGZvciBzZWFyY2hcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVJbnB1dEdyb3VwRWxlbWVudCgpIHtcbiAgICAvLyBpbnB1dCBmaWVsZFxuICAgIGNvbnN0IGlucHV0RmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0RmllbGQuY2xhc3NOYW1lID0gJ2Zvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtcm91bmRlZCc7XG4gICAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIFwiU2VhcmNoIGZvciBDb250ZW50IFR5cGVzXCIpO1xuICAgIGlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICB0aGlzLmZpcmUoJ3NlYXJjaCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBxdWVyeTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGlucHV0IGJ1dHRvblxuICAgIGNvbnN0IGlucHV0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5wdXRCdXR0b24uY2xhc3NOYW1lID0gJ2lucHV0LWdyb3VwLWFkZG9uIGljb24tc2VhcmNoJztcblxuICAgIC8vIGlucHV0IGdyb3VwXG4gICAgY29uc3QgaW5wdXRHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gJ2lucHV0LWdyb3VwJztcbiAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0RmllbGQpO1xuICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRCdXR0b24pO1xuXG4gICAgcmV0dXJuIGlucHV0R3JvdXA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsImltcG9ydCBDb250ZW50VHlwZVNlY3Rpb25WaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXdcIjtcbmltcG9ydCBTZWFyY2hTZXJ2aWNlIGZyb20gXCIuLi9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZVwiO1xuaW1wb3J0IENvbnRlbnRUeXBlTGlzdCBmcm9tICcuLi9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdCc7XG5pbXBvcnQgQ29udGVudFR5cGVEZXRhaWwgZnJvbSAnLi4vY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsJztcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMvZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb25WaWV3KHN0YXRlKTtcblxuICAgIC8vIGNvbnRyb2xsZXJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZSh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbCA9IG5ldyBDb250ZW50VHlwZURldGFpbCh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XG5cbiAgICAvLyBhZGQgbWVudSBpdGVtc1xuICAgIFsnTXkgQ29udGVudCBUeXBlcycsICdOZXdlc3QnLCAnTW9zdCBQb3B1bGFyJywgJ1JlY29tbWVuZGVkJ11cbiAgICAgIC5mb3JFYWNoKG1lbnVUZXh0ID0+IHRoaXMudmlldy5hZGRNZW51SXRlbShtZW51VGV4dCkpO1xuXG4gICAgLy8gc2V0IHN1YiB2aWV3IChUT0RPIGZpbmQgb3RoZXIgd2F5KVxuICAgIHRoaXMudmlldy5nZXRFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZUxpc3QuZ2V0RWxlbWVudCgpKTtcbiAgICB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVEZXRhaWwuZ2V0RWxlbWVudCgpKTtcblxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCcsICd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnXSwgdGhpcy5jb250ZW50VHlwZUxpc3QpO1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0J10sIHRoaXMuY29udGVudFR5cGVEZXRhaWwpO1xuXG4gICAgLy8gcmVnaXN0ZXIgbGlzdGVuZXJzXG4gICAgdGhpcy52aWV3Lm9uKCdzZWFyY2gnLCB0aGlzLnNlYXJjaCwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy5hcHBseVNlYXJjaEZpbHRlciwgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Qub24oJ3Jvdy1zZWxlY3RlZCcsIHRoaXMuc2hvd0RldGFpbFZpZXcsIHRoaXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwub24oJ2Nsb3NlJywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xuXG4gICAgdGhpcy5pbml0Q29udGVudFR5cGVMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdCB3aXRoIGEgc2VhcmNoXG4gICAqL1xuICBpbml0Q29udGVudFR5cGVMaXN0KCkge1xuICAgIC8vIGluaXRpYWxpemUgYnkgc2VhcmNoXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChcIlwiKVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKVxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZmlyZSgnZXJyb3InLCBlcnJvcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGEgc2VhcmNoIGFuZCB1cGRhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcbiAgICovXG4gIHNlYXJjaCh7cXVlcnl9KSB7XG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChxdWVyeSlcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGFwcGx5IGEgc2VhcmNoIGZpbHRlclxuICAgKi9cbiAgYXBwbHlTZWFyY2hGaWx0ZXIoKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnQ29udGVudFR5cGVTZWN0aW9uOiBtZW51IHdhcyBjbGlja2VkIScsIGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyBkZXRhaWwgdmlld1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNob3dEZXRhaWxWaWV3KHtpZH0pIHtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5oaWRlKCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5sb2FkQnlJZChpZCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5zaG93KCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDbG9zZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgY2xvc2VEZXRhaWxWaWV3KCkge1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJpbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCJcbmltcG9ydCBpbml0VGFiUGFuZWwgZnJvbSBcImNvbXBvbmVudHMvdGFiLXBhbmVsXCJcbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IGF0dHJpYnV0ZUVxdWFscywgZ2V0QXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIFRhYiBjaGFuZ2UgZXZlbnRcbiAqIEBldmVudCBIdWJWaWV3I3RhYi1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogUGFuZWwgb3BlbiBvciBjbG9zZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjcGFuZWwtY2hhbmdlXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfREFUQV9JRCA9ICdkYXRhLWlkJztcbi8qKlxuICogUHJvcGFnYXRlcyByb3cgc2VsZWN0aW9uIHRyb3VnaCB0aGUgZXZlbnQgc3lzdGVtXG4gKlxuICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5jb25zdCByZWxheUNsaWNrRXZlbnRBcyA9IGN1cnJ5KGZ1bmN0aW9uKHR5cGUsIGV2ZW50ZnVsLCBlbGVtZW50KSB7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgZXZlbnRmdWwuZmlyZSh0eXBlLCB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgaWQ6IGdldEF0dHJpYnV0ZShBVFRSSUJVVEVfREFUQV9JRCwgZWxlbWVudClcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuICByZXR1cm4gZWxlbWVudDtcbn0pO1xuXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YlZpZXcjdGFiLWNoYW5nZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJWaWV3IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgdGhpcy5yZW5kZXJUYWJQYW5lbChzdGF0ZSk7XG4gICAgdGhpcy5yZW5kZXJQYW5lbChzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBwYW5lbFxuICAgKi9cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICogQHBhcmFtIHtib29sZWFufSBleHBhbmRlZFxuICAgKi9cbiAgcmVuZGVyUGFuZWwoe3RpdGxlID0gJycsIHNlY3Rpb25JZCA9ICdjcmVhdGUtY29udGVudCcsIGV4cGFuZGVkID0gZmFsc2V9KSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRpdGxlLmNsYXNzTmFtZSArPSBcInBhbmVsLWhlYWRlciBpY29uLWh1Yi1pY29uXCI7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAoISFleHBhbmRlZCkudG9TdHJpbmcoKSk7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gKTtcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdwYW5lbC1jaGFuZ2UnLCB0aGlzLCB0aGlzLnRpdGxlKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmJvZHkuY2xhc3NOYW1lICs9IFwicGFuZWwtYm9keVwiO1xuICAgIHRoaXMuYm9keS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgKCFleHBhbmRlZCkudG9TdHJpbmcoKSk7XG4gICAgdGhpcy5ib2R5LmlkID0gYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YDtcbiAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgKz0gYHBhbmVsIGg1cC1zZWN0aW9uLSR7c2VjdGlvbklkfWA7XG4gICAgaWYoZXhwYW5kZWQpe1xuICAgICAgdGhpcy5wYW5lbC5zZXRBdHRyaWJ1dGUoJ29wZW4nLCAnJyk7XG4gICAgfVxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmJvZHkpO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgKz0gYGg1cCBoNXAtaHViYDtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmUgdGhlIHBhbmVsIGF0dHJpYml1dGVzIGZyb20gaDVwLXNkaywgZS5nLiBvcGVuaW5nIGFuZCBjbG9zaW5nXG4gICAqIFRoaXMgaXMgb25seSBjYWxsZWQgb25jZSBubyBlcnJvcnMgaGF2ZSBvY2N1cmVkIGluIGxvYWRpbmcgdGhlIGh1YiBcbiAgICovXG4gIGluaXRpYWxpemVQYW5lbCgpe1xuICAgIGluaXRQYW5lbCh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaWYgcGFuZWwgaXMgb3BlbiwgdGhpcyBpcyB1c2VkIGZvciBvdXRlciBib3JkZXIgY29sb3JcbiAgICovXG4gIHRvZ2dsZVBhbmVsT3BlbigpIHtcbiAgICBpZihpc09wZW4odGhpcy5wYW5lbCkpIHtcbiAgICAgIHRoaXMucGFuZWwucmVtb3ZlQXR0cmlidXRlKCdvcGVuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5wYW5lbC5zZXRBdHRyaWJ1dGUoJ29wZW4nLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHRhYiBwYW5lbFxuICAgKi9cbiAgcmVuZGVyVGFiUGFuZWwoc3RhdGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnRhYmxpc3QuY2xhc3NOYW1lICs9IFwidGFibGlzdFwiO1xuICAgIHRoaXMudGFibGlzdC5zZXRBdHRyaWJ1dGUgKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgdGhpcy50YWJMaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxpc3QpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5jbGFzc05hbWUgKz0gJ3RhYi1wYW5lbCc7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGFiTGlzdFdyYXBwZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0YWJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcbiAgICovXG4gIGFkZFRhYih7dGl0bGUsIGlkLCBjb250ZW50LCBzZWxlY3RlZCA9IGZhbHNlfSkge1xuICAgIGNvbnN0IHRhYklkID0gYHRhYi0ke2lkfWA7XG4gICAgY29uc3QgdGFiUGFuZWxJZCA9IGB0YWItcGFuZWwtJHtpZH1gO1xuXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0YWIuY2xhc3NOYW1lICs9ICd0YWInO1xuICAgIHRhYi5pZCA9IHRhYklkO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0YWJQYW5lbElkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQudG9TdHJpbmcoKSk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfREFUQV9JRCwgaWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XG4gICAgdGFiLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCd0YWItY2hhbmdlJywgdGhpcywgdGFiKTtcblxuICAgIGNvbnN0IHRhYlBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFiUGFuZWwuaWQgPSB0YWJQYW5lbElkO1xuICAgIHRhYlBhbmVsLmNsYXNzTmFtZSArPSAndGFicGFuZWwnO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJsbGVkYnknLCB0YWJJZCk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghc2VsZWN0ZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xuICAgIHRhYlBhbmVsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKHRhYik7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRhYlBhbmVsKTtcbiAgfVxuXG4gIGluaXRUYWJQYW5lbCgpIHtcbiAgICBpbml0VGFiUGFuZWwodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0U2VjdGlvblR5cGUoe2lkfSkge1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lID0gYGg1cC1zZWN0aW9uLSR7aWR9IHBhbmVsYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwiaW1wb3J0IHtjdXJyeSwgbWFwLCBmaWx0ZXJ9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCJcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tIFwiLi4vaHViLXNlcnZpY2VzXCI7XG5pbXBvcnQgbHVuciBmcm9tIFwibHVuclwiXG5cbi8qKlxuICogQGNsYXNzXG4gKiBUaGUgU2VhcmNoIFNlcnZpY2UgZ2V0cyBhIGNvbnRlbnQgdHlwZXMgZnJvbSBIdWJTZXJ2aWNlc1xuICogdGhlbiBpbmRleGVzIHRoZW0gdXNpbmcgbHVucmpzLiBJdCB0aGVuIHNlYXJjaGVzIHRocm91Z2hcbiAqIHRoZSBsdW5yanMgaW5kZXggYW5kIHJldHVybnMgY29udGVudCB0eXBlcyB0aGF0IG1hdGNoIHRoZSBxdWVyeS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoU2VydmljZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLmFwaVJvb3RVcmxcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBTZXQgdXAgbHVuciBpbmRleFxuICAgIHRoaXMuaW5kZXggPSBsdW5yKGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5maWVsZCgndGl0bGUnLCB7Ym9vc3Q6IDEwfSk7IC8vIENlcnRhaW4gZmllbGRzIGNhbiBnaXZlbiBhIGhpZ2hlciBpbXBvcnRhbmNlXG4gICAgICB0aGlzLmZpZWxkKCdzdW1tYXJ5Jyk7XG4gICAgICB0aGlzLmZpZWxkKCdkZXNjcmlwdGlvbicpO1xuICAgICAgdGhpcy5maWVsZCgna2V5d29yZHMnKTtcbiAgICAgIHRoaXMucmVmKCdpZCcpOyAvL1xuICAgIH0pO1xuXG4gICAgLy8gQWRkIGNvbnRlbnQgdHlwZXMgdG8gdGhlIHNlYXJjaCBpbmRleFxuICAgIHRoaXMuY29udGVudFR5cGVzID0gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZXMoKVxuICAgICAgLnRoZW4obWFwKGFkZFRvSW5kZXgodGhpcy5pbmRleCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHNlYXJjaFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnlcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZTxDb250ZW50VHlwZVtdPn0gQSBwcm9taXNlIG9mIGFuIGFycmF5IG9mIGNvbnRlbnQgdHlwZXNcbiAgICovXG4gIHNlYXJjaChxdWVyeSkge1xuICAgIC8vIERpc3BsYXkgYWxsIGNvbnRlbnQgdHlwZXMgYnkgZGVmYXVsdFxuICAgIGlmIChxdWVyeSA9PT0gJycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRUeXBlcztcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UsIGZpbHRlciBjb250ZW50IHR5cGVzIGJ5IGEgcXVlcnlcbiAgICByZXR1cm4gdGhpcy5jb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5kZXguc2VhcmNoKHF1ZXJ5KVxuICAgICAgICAubWFwKHJlc3VsdCA9PiByZXN1bHQucmVmKVxuICAgICAgICAubWFwKGZpbmRDb250ZW50VHlwZUJ5TWFjaGluZU5hbWUoY29udGVudFR5cGVzKSlcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYSBjb250ZW50IHR5cGUgdG8gdGhlIGx1bnJqcyBzZWFyY2ggaW5kZXhcbiAqIGNyZWF0ZXMgYW4gaWQgZm9yIHRoZSBpbmRleCB1c2luZyB0aGUgbWFjaGluZSBuYW1lXG4gKiBvZiB0aGUgY29udGVudCB0eXBlLlxuICpcbiAqIEBwYXJhbSAge2x1bnIuSW5kZXh9IGluZGV4XG4gKiBAcGFyYW0gIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAqXG4gKiBAcmV0dXJuIHtDb250ZW50VHlwZX1cbiAqL1xuY29uc3QgYWRkVG9JbmRleCA9IGN1cnJ5KChpbmRleCwgY29udGVudFR5cGUpID0+IHtcbiAgaW5kZXguYWRkKHtcbiAgICB0aXRsZTogY29udGVudFR5cGUudGl0bGUsXG4gICAgc3VtbWFyeTogY29udGVudFR5cGUuc3VtbWFyeSxcbiAgICBkZXNjcmlwdGlvbjogY29udGVudFR5cGUuZGVzY3JpcHRpb24sXG4gICAga2V5d29yZHM6IGNvbnRlbnRUeXBlLmtleXdvcmRzLFxuICAgIGlkOiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZVxuICB9KTtcblxuICByZXR1cm4gY29udGVudFR5cGU7XG59KTtcblxuLyoqXG4gKiBoZWxwZXIgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHtDb250ZW50VHlwZVtdfVxuICogQHBhcmFtICB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICogQHJldHVybiB7Q29udGVudFR5cGV9XG4gKi9cbmNvbnN0IGZpbmRDb250ZW50VHlwZUJ5TWFjaGluZU5hbWUgPSBjdXJyeShmdW5jdGlvbihjb250ZW50VHlwZXMsIG1hY2hpbmVOYW1lKSB7XG4gIHJldHVybiBjb250ZW50VHlwZXMuZmlsdGVyKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lID09PSBtYWNoaW5lTmFtZSlbMF07XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwiLyoqXG4gKiBAY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkU2VjdGlvbiB7XG4gIGdldEVsZW1lbnQoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJUT0RPIFVwbG9hZFwiO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJyZXF1aXJlKCcuLi8uLi9zcmMvc3R5bGVzL21haW4uc2NzcycpO1xuXG4vLyBMb2FkIGxpYnJhcnlcbkg1UCA9IEg1UCB8fCB7fTtcbkg1UC5IdWJDbGllbnQgPSByZXF1aXJlKCcuLi9zY3JpcHRzL2h1YicpLmRlZmF1bHQ7XG5INVAuSHViQ2xpZW50LnJlbmRlckVycm9yTWVzc2FnZSA9IHJlcXVpcmUoJy4uL3NjcmlwdHMvdXRpbHMvZXJyb3JzJykuZGVmYXVsdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwic291cmNlUm9vdCI6IiJ9