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

var _events = __webpack_require__(22);

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

var _events = __webpack_require__(22);

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
      if (this.rootElement) {
        while (this.rootElement.firstChild) {
          this.rootElement.removeChild(this.rootElement.firstChild);
        }
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
      var useButtonConfig = { text: 'Use', cls: 'button-primary' };
      var installButtonConfig = { text: 'install', cls: 'button-inverse-primary' };
      var button = contentType.installed ? useButtonConfig : installButtonConfig;

      // create html
      element.innerHTML = "\n      <img class=\"img-responsive\" src=\"" + contentType.icon + "\">\n      <span class=\"button " + button.cls + "\" data-id=\"" + contentType.machineName + "\">" + button.text + "</span>\n      <h4>" + contentType.title + "</h4>\n      <div class=\"description\">" + contentType.summary + "</div>\n   ";

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

var _panel = __webpack_require__(5);

var _panel2 = _interopRequireDefault(_panel);

var _tabPanel = __webpack_require__(8);

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _functional = __webpack_require__(1);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(0);

var _events = __webpack_require__(22);

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


__webpack_require__(7);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(6).default;
H5P.HubClient.renderErrorMessage = __webpack_require__(3).default;

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTM4YWJlMTZiNTQ5YjBmNmZkYjAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9mdW5jdGlvbmFsLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9sdW5yL2x1bnIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9kaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyJdLCJuYW1lcyI6WyJFdmVudGZ1bCIsImxpc3RlbmVycyIsIm9uIiwidHlwZSIsImxpc3RlbmVyIiwic2NvcGUiLCJ0cmlnZ2VyIiwicHVzaCIsImZpcmUiLCJldmVudCIsInRyaWdnZXJzIiwiZXZlcnkiLCJjYWxsIiwicHJvcGFnYXRlIiwidHlwZXMiLCJldmVudGZ1bCIsInNlbGYiLCJmb3JFYWNoIiwiY3VycnkiLCJmbiIsImFyaXR5IiwibGVuZ3RoIiwiZjEiLCJhcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsImFwcGx5IiwiZjIiLCJhcmdzMiIsImNvbmNhdCIsImNvbXBvc2UiLCJmbnMiLCJyZWR1Y2UiLCJmIiwiZyIsImFyciIsIm1hcCIsImZpbHRlciIsInNvbWUiLCJjb250YWlucyIsInZhbHVlIiwiaW5kZXhPZiIsIndpdGhvdXQiLCJ2YWx1ZXMiLCJpbnZlcnNlQm9vbGVhblN0cmluZyIsImJvb2wiLCJ0b1N0cmluZyIsImdldEF0dHJpYnV0ZSIsIm5hbWUiLCJlbCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsImF0dHJpYnV0ZUVxdWFscyIsInRvZ2dsZUF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicGFyZW50IiwiY2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVuZGVyRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNsb3NlQnV0dG9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibWVzc2FnZUNvbnRlbnQiLCJ0aXRsZSIsImNvbnRlbnQiLCJtZXNzYWdlV3JhcHBlciIsImRpc21pc3NpYmxlIiwiYnV0dG9uIiwidW5kZWZpbmVkIiwibWVzc2FnZUJ1dHRvbiIsImNvbnNvbGUiLCJsb2ciLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJ3aW5kb3ciLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZXMiLCJjb250ZW50VHlwZSIsImlkIiwiYm9keSIsImluaXQiLCJpc0V4cGFuZGVkIiwiaGlkZSIsInNob3ciLCJ0b2dnbGVCb2R5VmlzaWJpbGl0eSIsImJvZHlFbGVtZW50Iiwib25BcmlhRXhwYW5kZWRDaGFuZ2UiLCJ0YXJnZXQiLCJlbGVtZW50IiwidGl0bGVFbCIsImJvZHlJZCIsImJvZHlFbCIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiSHViIiwic3RhdGUiLCJjb250ZW50VHlwZVNlY3Rpb24iLCJ1cGxvYWRTZWN0aW9uIiwidmlldyIsInNlcnZpY2VzIiwic2V0UGFuZWxUaXRsZSIsImNsb3NlUGFuZWwiLCJzZXRTZWN0aW9uVHlwZSIsInRvZ2dsZVBhbmVsT3BlbiIsImJpbmQiLCJpbml0aWFsaXplUGFuZWwiLCJpbml0VGFiUGFuZWwiLCJnZXRDb250ZW50VHlwZSIsInNldFRpdGxlIiwidGFiQ29uZmlncyIsImdldEVsZW1lbnQiLCJzZWxlY3RlZCIsImFkZFRhYiIsInRhYkNvbmZpZyIsImhpZGVBbGwiLCJ1blNlbGVjdEFsbCIsInRhYnMiLCJ0YWJQYW5lbHMiLCJ0YWIiLCJ0YWJQYW5lbElkIiwibHVuciIsImNvbmZpZyIsImlkeCIsIkluZGV4IiwicGlwZWxpbmUiLCJhZGQiLCJ0cmltbWVyIiwic3RvcFdvcmRGaWx0ZXIiLCJzdGVtbWVyIiwidmVyc2lvbiIsInV0aWxzIiwid2FybiIsImdsb2JhbCIsImFzU3RyaW5nIiwib2JqIiwiRXZlbnRFbWl0dGVyIiwiZXZlbnRzIiwiYWRkTGlzdGVuZXIiLCJwb3AiLCJuYW1lcyIsIlR5cGVFcnJvciIsImhhc0hhbmRsZXIiLCJyZW1vdmVMaXN0ZW5lciIsImZuSW5kZXgiLCJzcGxpY2UiLCJlbWl0IiwidG9rZW5pemVyIiwiaXNBcnJheSIsInQiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJzcGxpdCIsInNlcGFyYXRvciIsImxvYWQiLCJsYWJlbCIsInJlZ2lzdGVyZWRGdW5jdGlvbnMiLCJFcnJvciIsInJlZ2lzdGVyRnVuY3Rpb24iLCJQaXBlbGluZSIsIl9zdGFjayIsIndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZCIsImlzUmVnaXN0ZXJlZCIsInNlcmlhbGlzZWQiLCJmbk5hbWUiLCJhZnRlciIsImV4aXN0aW5nRm4iLCJuZXdGbiIsInBvcyIsImJlZm9yZSIsInJlbW92ZSIsInJ1biIsInRva2VucyIsIm91dCIsInRva2VuTGVuZ3RoIiwic3RhY2tMZW5ndGgiLCJpIiwidG9rZW4iLCJqIiwicmVzZXQiLCJ0b0pTT04iLCJWZWN0b3IiLCJfbWFnbml0dWRlIiwibGlzdCIsIk5vZGUiLCJ2YWwiLCJuZXh0IiwiaW5zZXJ0IiwicHJldiIsIm1hZ25pdHVkZSIsIm5vZGUiLCJzdW1PZlNxdWFyZXMiLCJNYXRoIiwic3FydCIsImRvdCIsIm90aGVyVmVjdG9yIiwib3RoZXJOb2RlIiwiZG90UHJvZHVjdCIsInNpbWlsYXJpdHkiLCJTb3J0ZWRTZXQiLCJlbGVtZW50cyIsInNlcmlhbGlzZWREYXRhIiwic2V0IiwibG9jYXRpb25Gb3IiLCJ0b0FycmF5IiwiY3R4IiwiZWxlbSIsInN0YXJ0IiwiZW5kIiwic2VjdGlvbkxlbmd0aCIsInBpdm90IiwiZmxvb3IiLCJwaXZvdEVsZW0iLCJpbnRlcnNlY3QiLCJvdGhlclNldCIsImludGVyc2VjdFNldCIsImFfbGVuIiwiYl9sZW4iLCJhIiwiYiIsImNsb25lIiwidW5pb24iLCJsb25nU2V0Iiwic2hvcnRTZXQiLCJ1bmlvblNldCIsInNob3J0U2V0RWxlbWVudHMiLCJfZmllbGRzIiwiX3JlZiIsImRvY3VtZW50U3RvcmUiLCJTdG9yZSIsInRva2VuU3RvcmUiLCJUb2tlblN0b3JlIiwiY29ycHVzVG9rZW5zIiwiZXZlbnRFbWl0dGVyIiwidG9rZW5pemVyRm4iLCJfaWRmQ2FjaGUiLCJvZmYiLCJmaWVsZHMiLCJyZWYiLCJmaWVsZCIsImZpZWxkTmFtZSIsIm9wdHMiLCJib29zdCIsInJlZk5hbWUiLCJkb2MiLCJlbWl0RXZlbnQiLCJkb2NUb2tlbnMiLCJhbGxEb2N1bWVudFRva2VucyIsImRvY1JlZiIsImZpZWxkVG9rZW5zIiwidGYiLCJmaWVsZExlbmd0aCIsInRva2VuQ291bnQiLCJrIiwiaGFzIiwiZ2V0IiwidXBkYXRlIiwiaWRmIiwidGVybSIsImNhY2hlS2V5IiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJkb2N1bWVudEZyZXF1ZW5jeSIsImNvdW50Iiwic2VhcmNoIiwicXVlcnkiLCJxdWVyeVRva2VucyIsInF1ZXJ5VmVjdG9yIiwiZG9jdW1lbnRTZXRzIiwiZmllbGRCb29zdHMiLCJtZW1vIiwiaGFzU29tZVRva2VuIiwiZXhwYW5kIiwia2V5Iiwic2ltaWxhcml0eUJvb3N0IiwiZGlmZiIsIm1heCIsIm1hdGNoaW5nRG9jdW1lbnRzIiwicmVmcyIsImtleXMiLCJyZWZzTGVuIiwiZG9jdW1lbnRTZXQiLCJzY29yZSIsImRvY3VtZW50VmVjdG9yIiwic29ydCIsImRvY3VtZW50UmVmIiwiZG9jdW1lbnRUb2tlbnMiLCJkb2N1bWVudFRva2Vuc0xlbmd0aCIsInVzZSIsInBsdWdpbiIsInVuc2hpZnQiLCJzdG9yZSIsInN0ZXAybGlzdCIsInN0ZXAzbGlzdCIsImMiLCJ2IiwiQyIsIlYiLCJtZ3IwIiwibWVxMSIsIm1ncjEiLCJzX3YiLCJyZV9tZ3IwIiwiUmVnRXhwIiwicmVfbWdyMSIsInJlX21lcTEiLCJyZV9zX3YiLCJyZV8xYSIsInJlMl8xYSIsInJlXzFiIiwicmUyXzFiIiwicmVfMWJfMiIsInJlMl8xYl8yIiwicmUzXzFiXzIiLCJyZTRfMWJfMiIsInJlXzFjIiwicmVfMiIsInJlXzMiLCJyZV80IiwicmUyXzQiLCJyZV81IiwicmVfNV8xIiwicmUzXzUiLCJwb3J0ZXJTdGVtbWVyIiwidyIsInN0ZW0iLCJzdWZmaXgiLCJmaXJzdGNoIiwicmUiLCJyZTIiLCJyZTMiLCJyZTQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInRlc3QiLCJyZXBsYWNlIiwiZnAiLCJleGVjIiwiZ2VuZXJhdGVTdG9wV29yZEZpbHRlciIsInN0b3BXb3JkcyIsIndvcmRzIiwic3RvcFdvcmQiLCJyb290IiwiZG9jcyIsImNoYXJBdCIsInJlc3QiLCJnZXROb2RlIiwiZmFjdG9yeSIsImRlZmluZSIsImV4cG9ydHMiLCJtb2R1bGUiLCJBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEIiwidG9nZ2xlVmlzaWJpbGl0eSIsInZpc2libGUiLCJpc0VtcHR5IiwidGV4dCIsIkNvbnRlbnRUeXBlRGV0YWlsVmlldyIsImJhY2tCdXR0b25FbGVtZW50IiwiaW1hZ2UiLCJpbWFnZVdyYXBwZXJFbGVtZW50IiwiYXV0aG9yIiwiZGVzY3JpcHRpb24iLCJkZW1vQnV0dG9uIiwidGV4dERldGFpbHMiLCJkZXRhaWxzRWxlbWVudCIsInVzZUJ1dHRvbiIsImluc3RhbGxCdXR0b24iLCJidXR0b25CYXIiLCJsaWNlbmNlUGFuZWwiLCJjcmVhdGVQYW5lbCIsInBsdWdpbnNQYW5lbCIsInB1Ymxpc2hlclBhbmVsIiwicGFuZWxHcm91cEVsZW1lbnQiLCJyb290RWxlbWVudCIsImhlYWRlckVsIiwiYm9keUlubmVyRWwiLCJwYW5lbEVsIiwic3JjIiwidXJsIiwiaW5zdGFsbGVkIiwiQ29udGVudFR5cGVEZXRhaWwiLCJpbnN0YWxsIiwiaW5zdGFsbENvbnRlbnRUeXBlIiwiZGVidWciLCJzZXRJZCIsInNldERlc2NyaXB0aW9uIiwic2V0SW1hZ2UiLCJpY29uIiwic2V0RXhhbXBsZSIsImV4YW1wbGUiLCJzZXRJc0luc3RhbGxlZCIsIkNvbnRlbnRUeXBlTGlzdFZpZXciLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJyb3ciLCJjcmVhdGVDb250ZW50VHlwZVJvdyIsInVzZUJ1dHRvbkNvbmZpZyIsImNscyIsImluc3RhbGxCdXR0b25Db25maWciLCJzdW1tYXJ5IiwiQ29udGVudFR5cGVMaXN0IiwicmVtb3ZlQWxsUm93cyIsImFkZFJvdyIsIkNvbnRlbnRCcm93c2VyVmlldyIsIm1lbnUiLCJjcmVhdGVNZW51RWxlbWVudCIsImlucHV0R3JvdXAiLCJjcmVhdGVJbnB1dEdyb3VwRWxlbWVudCIsIm1lbnVHcm91cCIsIm1lbnVCYXJFbGVtZW50IiwiY2hpbGRFbGVtZW50Q291bnQiLCJuYXZFbGVtZW50IiwiaW5wdXRGaWVsZCIsImlucHV0QnV0dG9uIiwiQ29udGVudFR5cGVTZWN0aW9uIiwic2VhcmNoU2VydmljZSIsImNvbnRlbnRUeXBlTGlzdCIsImNvbnRlbnRUeXBlRGV0YWlsIiwiYWRkTWVudUl0ZW0iLCJtZW51VGV4dCIsInNlY3Rpb24iLCJjbGFzc0xpc3QiLCJhcHBseVNlYXJjaEZpbHRlciIsInNob3dEZXRhaWxWaWV3IiwiY2xvc2VEZXRhaWxWaWV3IiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsImNhdGNoIiwiZXJyb3IiLCJsb2FkQnlJZCIsIkFUVFJJQlVURV9EQVRBX0lEIiwiaXNPcGVuIiwiSHViVmlldyIsInJlbmRlclRhYlBhbmVsIiwicmVuZGVyUGFuZWwiLCJzZWN0aW9uSWQiLCJleHBhbmRlZCIsInRhYkNvbnRhaW5lckVsZW1lbnQiLCJwYW5lbCIsInRhYmxpc3QiLCJ0YWJMaXN0V3JhcHBlciIsInRhYklkIiwidGFiUGFuZWwiLCJTZWFyY2hTZXJ2aWNlIiwiaW5kZXgiLCJhZGRUb0luZGV4IiwiZmluZENvbnRlbnRUeXBlQnlNYWNoaW5lTmFtZSIsImtleXdvcmRzIiwiVXBsb2FkU2VjdGlvbiIsInJlcXVpcmUiLCJINVAiLCJIdWJDbGllbnQiLCJkZWZhdWx0IiwicmVsYXlDbGlja0V2ZW50QXMiLCJwcmV2ZW50RGVmYXVsdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUE7OztBQUdPLElBQU1BLDhCQUFXLFNBQVhBLFFBQVc7QUFBQSxTQUFPO0FBQzdCQyxlQUFXLEVBRGtCOztBQUc3Qjs7Ozs7Ozs7OztBQVVBQyxRQUFJLFlBQVNDLElBQVQsRUFBZUMsUUFBZixFQUF5QkMsS0FBekIsRUFBZ0M7QUFDbEM7Ozs7O0FBS0EsVUFBTUMsVUFBVTtBQUNkLG9CQUFZRixRQURFO0FBRWQsaUJBQVNDO0FBRkssT0FBaEI7O0FBS0EsV0FBS0osU0FBTCxDQUFlRSxJQUFmLElBQXVCLEtBQUtGLFNBQUwsQ0FB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dUJBQU0sVUFBUzNkLElBQVQsRUFBZVksUUFBZixFQUF5QitGLE9BQXpCLEVBQWtDO0FBQ3ZFQSxVQUFRVSxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxpQkFBUztBQUN6Q3pHLGFBQVNQLElBQVQsQ0FBY0wsSUFBZCxFQUFvQjtBQUNsQjJHLGVBQVNBLE9BRFM7QUFFbEJWLFVBQUlVLFFBQVE3RCxZQUFSLENBQXFCLFNBQXJCO0FBRmMsS0FBcEIsRUFHRyxLQUhIOztBQUtBeEMsVUFBTXNkLGNBQU47QUFDRCxHQVBEOztBQVNBLFNBQU9qWCxPQUFQO0FBQ0QsQ0FYZ0MsQ0FBMUIsQyIsImZpbGUiOiJoNXAtaHViLWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1MzhhYmUxNmI1NDliMGY2ZmRiMCIsIi8qKlxuICogQG1peGluXG4gKi9cbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnRmdWx9XG4gICAqL1xuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNjb3BlXG4gICAgICovXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcbiAgICAgICdsaXN0ZW5lcic6IGxpc3RlbmVyLFxuICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAgICovXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUodHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsIi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgdmVyc2lvbiBvZiBhIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjdXJyeSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGNvbnN0IGFyaXR5ID0gZm4ubGVuZ3RoO1xuXG4gIHJldHVybiBmdW5jdGlvbiBmMSgpIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBpZiAoYXJncy5sZW5ndGggPj0gYXJpdHkpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZjIoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgcmV0dXJuIGYxLmFwcGx5KG51bGwsIGFyZ3MuY29uY2F0KGFyZ3MyKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBDb21wb3NlIGZ1bmN0aW9ucyB0b2dldGhlciwgZXhlY3V0aW5nIGZyb20gcmlnaHQgdG8gbGVmdFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24uLi59IGZuc1xuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29tcG9zZSA9ICguLi5mbnMpID0+IGZucy5yZWR1Y2UoKGYsIGcpID0+ICguLi5hcmdzKSA9PiBmKGcoLi4uYXJncykpKTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBlbGVtZW50IGluIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZm9yRWFjaCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIGFyci5mb3JFYWNoKGZuKTtcbn0pO1xuXG4vKipcbiAqIE1hcHMgYSBmdW5jdGlvbiB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IG1hcCA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIubWFwKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmaWx0ZXIgdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLmZpbHRlcihmbik7XG59KTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgc29tZSB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHNvbWUgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLnNvbWUoZm4pO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgdmFsdWVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnRhaW5zID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5pbmRleE9mKHZhbHVlKSAhPSAtMTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgc3VwcGxpZWQgdmFsdWVzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHdpdGhvdXQgPSBjdXJyeShmdW5jdGlvbiAodmFsdWVzLCBhcnIpIHtcbiAgcmV0dXJuIGZpbHRlcih2YWx1ZSA9PiAhY29udGFpbnModmFsdWUsIHZhbHVlcyksIGFycilcbn0pO1xuXG4vKipcbiAqIFRha2VzIGEgc3RyaW5nIHRoYXQgaXMgZWl0aGVyICd0cnVlJyBvciAnZmFsc2UnIGFuZCByZXR1cm5zIHRoZSBvcHBvc2l0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBib29sXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgaW52ZXJzZUJvb2xlYW5TdHJpbmcgPSBmdW5jdGlvbiAoYm9vbCkge1xuICByZXR1cm4gKGJvb2wgIT09ICd0cnVlJykudG9TdHJpbmcoKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJpbXBvcnQge2N1cnJ5LCBpbnZlcnNlQm9vbGVhblN0cmluZ30gZnJvbSAnLi9mdW5jdGlvbmFsJ1xuXG4vKipcbiAqIEdldCBhbiBhdHRyaWJ1dGUgdmFsdWUgZnJvbSBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShuYW1lKTtcbn0pO1xuXG4vKipcbiAqIFNldCBhbiBhdHRyaWJ1dGUgb24gYSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2V0QXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBlbCkge1xuICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xufSk7XG5cbi8qKlxuICogUmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlQXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIGVsKSB7XG4gIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbn0pO1xuXG4vKipcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0F0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xuICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKG5hbWUpO1xufSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlIHRoYXQgZXF1YWxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVFcXVhbHMgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGVsKSB7XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IHZhbHVlO1xufSk7XG5cbi8qKlxuICogVG9nZ2xlcyBhbiBhdHRyaWJ1dGUgYmV0d2VlbiAndHJ1ZScgYW5kICdmYWxzZSc7XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcbiAgY29uc3QgdmFsdWUgPSBnZXRBdHRyaWJ1dGUobmFtZSwgZWwpO1xuICBzZXRBdHRyaWJ1dGUobmFtZSwgaW52ZXJzZUJvb2xlYW5TdHJpbmcodmFsdWUpLCBlbCk7XG59KTtcblxuLyoqXG4gKiBUaGUgYXBwZW5kQ2hpbGQoKSBtZXRob2QgYWRkcyBhIG5vZGUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdCBvZiBjaGlsZHJlbiBvZiBhIHNwZWNpZmllZCBwYXJlbnQgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNoaWxkXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IGFwcGVuZENoaWxkID0gY3VycnkoZnVuY3Rpb24gKHBhcmVudCwgY2hpbGQpIHtcbiAgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgYSBkZXNjZW5kYW50IG9mIHRoZSBlbGVtZW50IG9uIHdoaWNoIGl0IGlzIGludm9rZWRcbiAqIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIHNlbGVjdG9ycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3IgPSBjdXJyeShmdW5jdGlvbiAoc2VsZWN0b3IsIGVsKSB7XG4gIHJldHVybiBlbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgYSBub24tbGl2ZSBOb2RlTGlzdCBvZiBhbGwgZWxlbWVudHMgZGVzY2VuZGVkIGZyb20gdGhlIGVsZW1lbnQgb24gd2hpY2ggaXRcbiAqIGlzIGludm9rZWQgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2YgQ1NTIHNlbGVjdG9ycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtOb2RlTGlzdH1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3JBbGwgPSBjdXJyeShmdW5jdGlvbiAoc2VsZWN0b3IsIGVsKSB7XG4gIHJldHVybiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIi8qKlxuICogQHBhcmFtICB7c3RyaW5nfSAgIGNvbmZpZy50eXBlICAgICAgICAgdHlwZSBvZiB0aGUgbWVzc2FnZTogaW5mbywgc3VjY2VzcywgZXJyb3JcbiAqIEBwYXJhbSAge2Jvb2xlYW59ICBjb25maWcuZGlzbWlzc2libGUgIHdoZXRoZXIgdGhlIG1lc3NhZ2UgY2FuIGJlIGRpc21pc3NlZFxuICogQHBhcmFtICB7c3RyaW5nfSAgIGNvbmZpZy5jb250ZW50ICAgICAgbWVzc2FnZSBjb250ZW50IHVzdWFsbHkgYSAnaDMnIGFuZCBhICdwJ1xuICogQHJldHVybiB7SFRNTEVsZW1lbnR9IGRpdiBjb250YWluaW5nIHRoZSBtZXNzYWdlIGVsZW1lbnRcbiAqL1xuXG4vL1RPRE8gaGFuZGxlIHN0cmluZ3MsIGh0bWwsIGJhZGx5IGZvcm1lZCBvYmplY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlckVycm9yTWVzc2FnZShtZXNzYWdlKSB7XG4gIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSAnY2xvc2UnO1xuICBjbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJiN4MjcxNSc7XG5cbiAgY29uc3QgbWVzc2FnZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWVzc2FnZUNvbnRlbnQuY2xhc3NOYW1lID0gJ21lc3NhZ2UtY29udGVudCc7XG4gIG1lc3NhZ2VDb250ZW50LmlubmVySFRNTCA9ICc8aDE+JyArIG1lc3NhZ2UudGl0bGUgKyAnPC9oMT4nICsgJzxwPicgKyBtZXNzYWdlLmNvbnRlbnQgKyAnPC9wPic7XG5cbiAgY29uc3QgbWVzc2FnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWVzc2FnZVdyYXBwZXIuY2xhc3NOYW1lID0gJ21lc3NhZ2UnICsgJyAnICsgYCR7bWVzc2FnZS50eXBlfWAgKyAobWVzc2FnZS5kaXNtaXNzaWJsZSA/ICcgZGlzbWlzc2libGUnIDogJycpO1xuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VDb250ZW50KTtcblxuICBpZiAobWVzc2FnZS5idXR0b24gIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IG1lc3NhZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBtZXNzYWdlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24nO1xuICAgIG1lc3NhZ2VCdXR0b24uaW5uZXJIVE1MID0gbWVzc2FnZS5idXR0b247XG4gICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUJ1dHRvbik7XG4gIH1cblxuICBjb25zb2xlLmxvZyhtZXNzYWdlV3JhcHBlcik7XG4gIHJldHVybiBtZXNzYWdlV3JhcHBlcjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCIvKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IENvbnRlbnRUeXBlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFjaGluZU5hbWVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWpvclZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtaW5vclZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwYXRjaFZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBoNXBNYWpvclZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBoNXBNaW5vclZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzdW1tYXJ5XG4gKiBAcHJvcGVydHkge3N0cmluZ30gZGVzY3JpcHRpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpY29uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3JlYXRlZEF0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gdXBkYXRlZF9BdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlzUmVjb21tZW5kZWRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwb3B1bGFyaXR5XG4gKiBAcHJvcGVydHkge29iamVjdFtdfSBzY3JlZW5zaG90c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGxpY2Vuc2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBleGFtcGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdHV0b3JpYWxcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGtleXdvcmRzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gb3duZXJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaW5zdGFsbGVkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlc3RyaWN0ZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViU2VydmljZXMge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFwaVJvb3RVcmxcbiAgICovXG4gIGNvbnN0cnVjdG9yKHsgYXBpUm9vdFVybCB9KSB7XG4gICAgdGhpcy5hcGlSb290VXJsID0gYXBpUm9vdFVybDtcblxuICAgIGlmKCF3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzKXtcbiAgICAgIC8vIFRPRE8gcmVtb3ZlIHRoaXMgd2hlbiBkb25lIHRlc3RpbmcgZm9yIGVycm9yc1xuICAgICAgLy8gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1lcnJvcnMvTk9fUkVTUE9OU0UuanNvbmAsIHtcblxuICAgICAgd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50LXR5cGUtY2FjaGVgLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcbiAgICAgIC50aGVuKHRoaXMuaXNWYWxpZClcbiAgICAgIC50aGVuKGpzb24gPT4ganNvbi5saWJyYXJpZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gIHtDb250ZW50VHlwZVtdfEVycm9yTWVzc2FnZX0gcmVzcG9uc2VcbiAgICogQHJldHVybiB7UHJvbWlzZTxDb250ZW50VHlwZVtdfEVycm9yTWVzc2FnZT59XG4gICAqL1xuICBpc1ZhbGlkKHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlLm1lc3NhZ2VDb2RlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBjb250ZW50IHR5cGVzXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlW10+fVxuICAgKi9cbiAgY29udGVudFR5cGVzKCkge1xuICAgIHJldHVybiB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBDb250ZW50IFR5cGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcbiAgICB9KTtcblxuICAgIC8qcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50X3R5cGVfY2FjaGUvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpOyovXG4gIH1cblxuICAvKipcbiAgICogSW5zdGFsbHMgYSBjb250ZW50IHR5cGUgb24gdGhlIHNlcnZlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgaW5zdGFsbENvbnRlbnRUeXBlKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1saWJyYXJ5LWluc3RhbGw/aWQ9JHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBib2R5OiAnJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItc2VydmljZXMuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZSwgYXR0cmlidXRlRXF1YWxzLCB0b2dnbGVBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaXNFeHBhbmRlZCA9IGF0dHJpYnV0ZUVxdWFscyhcImFyaWEtZXhwYW5kZWRcIiwgJ3RydWUnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgYm9keSB2aXNpYmlsaXR5XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYm9keUVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNFeHBhbmRlZFxuICovXG5jb25zdCB0b2dnbGVCb2R5VmlzaWJpbGl0eSA9IGZ1bmN0aW9uKGJvZHlFbGVtZW50LCBpc0V4cGFuZGVkKSB7XG4gIGlmKCFpc0V4cGFuZGVkKSB7XG4gICAgaGlkZShib2R5RWxlbWVudCk7XG4gICAgLy9ib2R5RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIjBcIjtcbiAgfVxuICBlbHNlIC8qaWYoYm9keUVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gMCkqLyB7XG4gICAgc2hvdyhib2R5RWxlbWVudCk7XG4gICAgLy9ib2R5RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtib2R5RWxlbWVudC5zY3JvbGxIZWlnaHR9cHhgO1xuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgY2hhbmdlcyB0byBhcmlhLWV4cGFuZGVkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYm9keUVsZW1lbnRcbiAqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IGV2ZW50XG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG9uQXJpYUV4cGFuZGVkQ2hhbmdlID0gY3VycnkoZnVuY3Rpb24oYm9keUVsZW1lbnQsIGV2ZW50KSB7XG4gIHRvZ2dsZUJvZHlWaXNpYmlsaXR5KGJvZHlFbGVtZW50LCBpc0V4cGFuZGVkKGV2ZW50LnRhcmdldCkpO1xufSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgY29uc3QgdGl0bGVFbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtZXhwYW5kZWRdJyk7XG4gIGNvbnN0IGJvZHlJZCA9IHRpdGxlRWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gIGNvbnN0IGJvZHlFbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9keUlkfWApO1xuXG4gIGlmKHRpdGxlRWwpIHtcbiAgICAvLyBzZXQgb2JzZXJ2ZXIgb24gdGl0bGUgZm9yIGFyaWEtZXhwYW5kZWRcbiAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmb3JFYWNoKG9uQXJpYUV4cGFuZGVkQ2hhbmdlKGJvZHlFbCkpKTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUodGl0bGVFbCwge1xuICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgICAgYXR0cmlidXRlRmlsdGVyOiBbXCJhcmlhLWV4cGFuZGVkXCJdXG4gICAgfSk7XG5cbiAgICAvLyBTZXQgY2xpY2sgbGlzdGVuZXIgdGhhdCB0b2dnbGVzIGFyaWEtZXhwYW5kZWRcbiAgICB0aXRsZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHRvZ2dsZUF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgZXZlbnQudGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIHRvZ2dsZUJvZHlWaXNpYmlsaXR5KGJvZHlFbCwgaXNFeHBhbmRlZCh0aXRsZUVsKSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsImltcG9ydCBIdWJWaWV3IGZyb20gJy4vaHViLXZpZXcnO1xuaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvbiBmcm9tICcuL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uJztcbmltcG9ydCBVcGxvYWRTZWN0aW9uIGZyb20gJy4vdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24nO1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4vaHViLXNlcnZpY2VzJztcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4vdXRpbHMvZXJyb3JzJztcbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gSHViU3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aXRsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb25JZFxuICogQHByb3BlcnR5IHtib29sZWFufSBleHBhbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFwaVJvb3RVcmxcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBFcnJvck1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXJyb3JDb2RlXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gU2VsZWN0ZWRFbGVtZW50XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRcbiAqL1xuLyoqXG4gKiBTZWxlY3QgZXZlbnRcbiAqIEBldmVudCBIdWIjc2VsZWN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEVycm9yIGV2ZW50XG4gKiBAZXZlbnQgSHViI2Vycm9yXG4gKiBAdHlwZSB7RXJyb3JNZXNzYWdlfVxuICovXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIEh1YiNlcnJvclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWIge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjb250cm9sbGVyc1xuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uID0gbmV3IENvbnRlbnRUeXBlU2VjdGlvbihzdGF0ZSk7XG4gICAgdGhpcy51cGxvYWRTZWN0aW9uID0gbmV3IFVwbG9hZFNlY3Rpb24oc3RhdGUpO1xuXG4gICAgLy8gdmlld3NcbiAgICB0aGlzLnZpZXcgPSBuZXcgSHViVmlldyhzdGF0ZSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gcHJvcGFnYXRlIGNvbnRyb2xsZXIgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAnZXJyb3InXSwgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24pO1xuXG4gICAgLy8gaGFuZGxlIGV2ZW50c1xuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMuc2V0UGFuZWxUaXRsZSwgdGhpcyk7XG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy52aWV3LmNsb3NlUGFuZWwsIHRoaXMudmlldyk7XG4gICAgLy8gb25seSBpbml0aWFsaXplIHRoZSBtYWluIHBhbmVsIGlmIG5vIGVycm9ycyBoYXZlIG9jY3VyZWQgd2hlbiB1cGRhdGluZyB0aGUgY29udGVudCB0eXBlIGxpc3RcbiAgICB0aGlzLnZpZXcub24oJ3RhYi1jaGFuZ2UnLCB0aGlzLnZpZXcuc2V0U2VjdGlvblR5cGUsIHRoaXMudmlldyk7XG4gICAgdGhpcy52aWV3Lm9uKCdwYW5lbC1jaGFuZ2UnLCB0aGlzLnZpZXcudG9nZ2xlUGFuZWxPcGVuLmJpbmQodGhpcy52aWV3KSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5vbigndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0JywgdGhpcy52aWV3LmluaXRpYWxpemVQYW5lbC5iaW5kKHRoaXMudmlldyksIHRoaXMudmlldyk7XG5cbiAgICB0aGlzLmluaXRUYWJQYW5lbCgpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGNvbnRlbnQgdHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgZ2V0Q29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShtYWNoaW5lTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGUgb2YgdGhlIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0UGFuZWxUaXRsZSh7aWR9KcKge1xuICAgIHRoaXMuZ2V0Q29udGVudFR5cGUoaWQpLnRoZW4oKHt0aXRsZX0pID0+IHRoaXMudmlldy5zZXRUaXRsZSh0aXRsZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgdGFiIHBhbmVsXG4gICAqL1xuICBpbml0VGFiUGFuZWwoKSB7XG4gICAgY29uc3QgdGFiQ29uZmlncyA9IFt7XG4gICAgICB0aXRsZTogJ0NyZWF0ZSBDb250ZW50JyxcbiAgICAgIGlkOiAnY29udGVudC10eXBlcycsXG4gICAgICBjb250ZW50OiB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5nZXRFbGVtZW50KCksXG4gICAgICBzZWxlY3RlZDogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdVcGxvYWQnLFxuICAgICAgaWQ6ICd1cGxvYWQnLFxuICAgICAgY29udGVudDogdGhpcy51cGxvYWRTZWN0aW9uLmdldEVsZW1lbnQoKVxuICAgIH1dO1xuXG4gICAgdGFiQ29uZmlncy5mb3JFYWNoKHRhYkNvbmZpZyA9PiB0aGlzLnZpZXcuYWRkVGFiKHRhYkNvbmZpZykpO1xuICAgIHRoaXMudmlldy5pbml0VGFiUGFuZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWIuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Zm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBoaWRlQWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0YWJzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYlwiXScpO1xuICBjb25zdCB0YWJQYW5lbHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFicGFuZWxcIl0nKTtcblxuICB0YWJzLmZvckVhY2godGFiID0+IHtcbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgdW5TZWxlY3RBbGwodGFicyk7XG4gICAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcblxuICAgICAgaGlkZUFsbCh0YWJQYW5lbHMpO1xuXG4gICAgICBsZXQgdGFiUGFuZWxJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICAgIHNob3coZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0YWJQYW5lbElkfWApKTtcbiAgICB9KTtcbiAgfSlcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCIvKipcbiAqIGx1bnIgLSBodHRwOi8vbHVucmpzLmNvbSAtIEEgYml0IGxpa2UgU29sciwgYnV0IG11Y2ggc21hbGxlciBhbmQgbm90IGFzIGJyaWdodCAtIDEuMC4wXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG47KGZ1bmN0aW9uKCl7XG5cbi8qKlxuICogQ29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIGluc3RhbnRpYXRpbmcgYSBuZXcgbHVuciBpbmRleCBhbmQgY29uZmlndXJpbmcgaXRcbiAqIHdpdGggdGhlIGRlZmF1bHQgcGlwZWxpbmUgZnVuY3Rpb25zIGFuZCB0aGUgcGFzc2VkIGNvbmZpZyBmdW5jdGlvbi5cbiAqXG4gKiBXaGVuIHVzaW5nIHRoaXMgY29udmVuaWVuY2UgZnVuY3Rpb24gYSBuZXcgaW5kZXggd2lsbCBiZSBjcmVhdGVkIHdpdGggdGhlXG4gKiBmb2xsb3dpbmcgZnVuY3Rpb25zIGFscmVhZHkgaW4gdGhlIHBpcGVsaW5lOlxuICpcbiAqIGx1bnIuU3RvcFdvcmRGaWx0ZXIgLSBmaWx0ZXJzIG91dCBhbnkgc3RvcCB3b3JkcyBiZWZvcmUgdGhleSBlbnRlciB0aGVcbiAqIGluZGV4XG4gKlxuICogbHVuci5zdGVtbWVyIC0gc3RlbXMgdGhlIHRva2VucyBiZWZvcmUgZW50ZXJpbmcgdGhlIGluZGV4LlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIHZhciBpZHggPSBsdW5yKGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHRoaXMuZmllbGQoJ3RpdGxlJywgMTApXG4gKiAgICAgICB0aGlzLmZpZWxkKCd0YWdzJywgMTAwKVxuICogICAgICAgdGhpcy5maWVsZCgnYm9keScpXG4gKiAgICAgICBcbiAqICAgICAgIHRoaXMucmVmKCdjaWQnKVxuICogICAgICAgXG4gKiAgICAgICB0aGlzLnBpcGVsaW5lLmFkZChmdW5jdGlvbiAoKSB7XG4gKiAgICAgICAgIC8vIHNvbWUgY3VzdG9tIHBpcGVsaW5lIGZ1bmN0aW9uXG4gKiAgICAgICB9KVxuICogICAgICAgXG4gKiAgICAgfSlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maWcgQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIG5ldyBpbnN0YW5jZVxuICogb2YgdGhlIGx1bnIuSW5kZXggYXMgYm90aCBpdHMgY29udGV4dCBhbmQgZmlyc3QgcGFyYW1ldGVyLiBJdCBjYW4gYmUgdXNlZCB0b1xuICogY3VzdG9taXplIHRoZSBpbnN0YW5jZSBvZiBuZXcgbHVuci5JbmRleC5cbiAqIEBuYW1lc3BhY2VcbiAqIEBtb2R1bGVcbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICpcbiAqL1xudmFyIGx1bnIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHZhciBpZHggPSBuZXcgbHVuci5JbmRleFxuXG4gIGlkeC5waXBlbGluZS5hZGQoXG4gICAgbHVuci50cmltbWVyLFxuICAgIGx1bnIuc3RvcFdvcmRGaWx0ZXIsXG4gICAgbHVuci5zdGVtbWVyXG4gIClcblxuICBpZiAoY29uZmlnKSBjb25maWcuY2FsbChpZHgsIGlkeClcblxuICByZXR1cm4gaWR4XG59XG5cbmx1bnIudmVyc2lvbiA9IFwiMS4wLjBcIlxuLyohXG4gKiBsdW5yLnV0aWxzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBIG5hbWVzcGFjZSBjb250YWluaW5nIHV0aWxzIGZvciB0aGUgcmVzdCBvZiB0aGUgbHVuciBsaWJyYXJ5XG4gKi9cbmx1bnIudXRpbHMgPSB7fVxuXG4vKipcbiAqIFByaW50IGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGJlIHByaW50ZWQuXG4gKiBAbWVtYmVyT2YgVXRpbHNcbiAqL1xubHVuci51dGlscy53YXJuID0gKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgaWYgKGdsb2JhbC5jb25zb2xlICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpXG4gICAgfVxuICB9XG59KSh0aGlzKVxuXG4vKipcbiAqIENvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICpcbiAqIEluIHRoZSBjYXNlIG9mIGBudWxsYCBhbmQgYHVuZGVmaW5lZGAgdGhlIGZ1bmN0aW9uIHJldHVybnNcbiAqIHRoZSBlbXB0eSBzdHJpbmcsIGluIGFsbCBvdGhlciBjYXNlcyB0aGUgcmVzdWx0IG9mIGNhbGxpbmdcbiAqIGB0b1N0cmluZ2Agb24gdGhlIHBhc3NlZCBvYmplY3QgaXMgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtIHtBbnl9IG9iaiBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gYSBzdHJpbmcuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGFzc2VkIG9iamVjdC5cbiAqIEBtZW1iZXJPZiBVdGlsc1xuICovXG5sdW5yLnV0aWxzLmFzU3RyaW5nID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAob2JqID09PSB2b2lkIDAgfHwgb2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwiXCJcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqLnRvU3RyaW5nKClcbiAgfVxufVxuLyohXG4gKiBsdW5yLkV2ZW50RW1pdHRlclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5FdmVudEVtaXR0ZXIgaXMgYW4gZXZlbnQgZW1pdHRlciBmb3IgbHVuci4gSXQgbWFuYWdlcyBhZGRpbmcgYW5kIHJlbW92aW5nIGV2ZW50IGhhbmRsZXJzIGFuZCB0cmlnZ2VyaW5nIGV2ZW50cyBhbmQgdGhlaXIgaGFuZGxlcnMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmV2ZW50cyA9IHt9XG59XG5cbi8qKlxuICogQmluZHMgYSBoYW5kbGVyIGZ1bmN0aW9uIHRvIGEgc3BlY2lmaWMgZXZlbnQocykuXG4gKlxuICogQ2FuIGJpbmQgYSBzaW5nbGUgZnVuY3Rpb24gdG8gbWFueSBkaWZmZXJlbnQgZXZlbnRzIGluIG9uZSBjYWxsLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZXZlbnROYW1lXSBUaGUgbmFtZShzKSBvZiBldmVudHMgdG8gYmluZCB0aGlzIGZ1bmN0aW9uIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBhbiBldmVudCBpcyBmaXJlZC5cbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICBmbiA9IGFyZ3MucG9wKCksXG4gICAgICBuYW1lcyA9IGFyZ3NcblxuICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IgKFwibGFzdCBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb25cIilcblxuICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKCF0aGlzLmhhc0hhbmRsZXIobmFtZSkpIHRoaXMuZXZlbnRzW25hbWVdID0gW11cbiAgICB0aGlzLmV2ZW50c1tuYW1lXS5wdXNoKGZuKVxuICB9LCB0aGlzKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBoYW5kbGVyIGZ1bmN0aW9uIGZyb20gYSBzcGVjaWZpYyBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgdGhpcyBmdW5jdGlvbiBmcm9tLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIGFuIGV2ZW50LlxuICogQG1lbWJlck9mIEV2ZW50RW1pdHRlclxuICovXG5sdW5yLkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgaWYgKCF0aGlzLmhhc0hhbmRsZXIobmFtZSkpIHJldHVyblxuXG4gIHZhciBmbkluZGV4ID0gdGhpcy5ldmVudHNbbmFtZV0uaW5kZXhPZihmbilcbiAgdGhpcy5ldmVudHNbbmFtZV0uc3BsaWNlKGZuSW5kZXgsIDEpXG5cbiAgaWYgKCF0aGlzLmV2ZW50c1tuYW1lXS5sZW5ndGgpIGRlbGV0ZSB0aGlzLmV2ZW50c1tuYW1lXVxufVxuXG4vKipcbiAqIENhbGxzIGFsbCBmdW5jdGlvbnMgYm91bmQgdG8gdGhlIGdpdmVuIGV2ZW50LlxuICpcbiAqIEFkZGl0aW9uYWwgZGF0YSBjYW4gYmUgcGFzc2VkIHRvIHRoZSBldmVudCBoYW5kbGVyIGFzIGFyZ3VtZW50cyB0byBgZW1pdGBcbiAqIGFmdGVyIHRoZSBldmVudCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQuXG4gKiBAbWVtYmVyT2YgRXZlbnRFbWl0dGVyXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCF0aGlzLmhhc0hhbmRsZXIobmFtZSkpIHJldHVyblxuXG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXG4gIHRoaXMuZXZlbnRzW25hbWVdLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKVxuICB9KVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGEgaGFuZGxlciBoYXMgZXZlciBiZWVuIHN0b3JlZCBhZ2FpbnN0IGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGNoZWNrLlxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmhhc0hhbmRsZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gbmFtZSBpbiB0aGlzLmV2ZW50c1xufVxuXG4vKiFcbiAqIGx1bnIudG9rZW5pemVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIGZvciBzcGxpdHRpbmcgYSBzdHJpbmcgaW50byB0b2tlbnMgcmVhZHkgdG8gYmUgaW5zZXJ0ZWQgaW50b1xuICogdGhlIHNlYXJjaCBpbmRleC4gVXNlcyBgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yYCB0byBzcGxpdCBzdHJpbmdzLCBjaGFuZ2VcbiAqIHRoZSB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5IHRvIGNoYW5nZSBob3cgc3RyaW5ncyBhcmUgc3BsaXQgaW50byB0b2tlbnMuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IG9iaiBUaGUgc3RyaW5nIHRvIGNvbnZlcnQgaW50byB0b2tlbnNcbiAqIEBzZWUgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmx1bnIudG9rZW5pemVyID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGggfHwgb2JqID09IG51bGwgfHwgb2JqID09IHVuZGVmaW5lZCkgcmV0dXJuIFtdXG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHJldHVybiBvYmoubWFwKGZ1bmN0aW9uICh0KSB7IHJldHVybiBsdW5yLnV0aWxzLmFzU3RyaW5nKHQpLnRvTG93ZXJDYXNlKCkgfSlcblxuICByZXR1cm4gb2JqLnRvU3RyaW5nKCkudHJpbSgpLnRvTG93ZXJDYXNlKCkuc3BsaXQobHVuci50b2tlbml6ZXIuc2VwYXJhdG9yKVxufVxuXG4vKipcbiAqIFRoZSBzcGVyYXRvciB1c2VkIHRvIHNwbGl0IGEgc3RyaW5nIGludG8gdG9rZW5zLiBPdmVycmlkZSB0aGlzIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgYmVoYXZpb3VyIG9mXG4gKiBgbHVuci50b2tlbml6ZXJgIGJlaGF2aW91ciB3aGVuIHRva2VuaXppbmcgc3RyaW5ncy4gQnkgZGVmYXVsdCB0aGlzIHNwbGl0cyBvbiB3aGl0ZXNwYWNlIGFuZCBoeXBoZW5zLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzZWUgbHVuci50b2tlbml6ZXJcbiAqL1xubHVuci50b2tlbml6ZXIuc2VwYXJhdG9yID0gL1tcXHNcXC1dKy9cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCB0b2tlbml6ZXIuXG4gKlxuICogQSB0b2tlbml6ZXIgZnVuY3Rpb24gdG8gYmUgbG9hZGVkIG11c3QgYWxyZWFkeSBiZSByZWdpc3RlcmVkIHdpdGggbHVuci50b2tlbml6ZXIuXG4gKiBJZiB0aGUgc2VyaWFsaXNlZCB0b2tlbml6ZXIgaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQgdGhlbiBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVGhlIGxhYmVsIG9mIHRoZSBzZXJpYWxpc2VkIHRva2VuaXplci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqIEBtZW1iZXJPZiB0b2tlbml6ZXJcbiAqL1xubHVuci50b2tlbml6ZXIubG9hZCA9IGZ1bmN0aW9uIChsYWJlbCkge1xuICB2YXIgZm4gPSB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnNbbGFiZWxdXG5cbiAgaWYgKCFmbikge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGxvYWQgdW4tcmVnaXN0ZXJlZCBmdW5jdGlvbjogJyArIGxhYmVsKVxuICB9XG5cbiAgcmV0dXJuIGZuXG59XG5cbmx1bnIudG9rZW5pemVyLmxhYmVsID0gJ2RlZmF1bHQnXG5cbmx1bnIudG9rZW5pemVyLnJlZ2lzdGVyZWRGdW5jdGlvbnMgPSB7XG4gICdkZWZhdWx0JzogbHVuci50b2tlbml6ZXJcbn1cblxuLyoqXG4gKiBSZWdpc3RlciBhIHRva2VuaXplciBmdW5jdGlvbi5cbiAqXG4gKiBGdW5jdGlvbnMgdGhhdCBhcmUgdXNlZCBhcyB0b2tlbml6ZXJzIHNob3VsZCBiZSByZWdpc3RlcmVkIGlmIHRoZXkgYXJlIHRvIGJlIHVzZWQgd2l0aCBhIHNlcmlhbGlzZWQgaW5kZXguXG4gKlxuICogUmVnaXN0ZXJpbmcgYSBmdW5jdGlvbiBkb2VzIG5vdCBhZGQgaXQgdG8gYW4gaW5kZXgsIGZ1bmN0aW9ucyBtdXN0IHN0aWxsIGJlIGFzc29jaWF0ZWQgd2l0aCBhIHNwZWNpZmljIGluZGV4IGZvciB0aGVtIHRvIGJlIHVzZWQgd2hlbiBpbmRleGluZyBhbmQgc2VhcmNoaW5nIGRvY3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcmVnaXN0ZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVGhlIGxhYmVsIHRvIHJlZ2lzdGVyIHRoaXMgZnVuY3Rpb24gd2l0aFxuICogQG1lbWJlck9mIHRva2VuaXplclxuICovXG5sdW5yLnRva2VuaXplci5yZWdpc3RlckZ1bmN0aW9uID0gZnVuY3Rpb24gKGZuLCBsYWJlbCkge1xuICBpZiAobGFiZWwgaW4gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdPdmVyd3JpdGluZyBleGlzdGluZyB0b2tlbml6ZXI6ICcgKyBsYWJlbClcbiAgfVxuXG4gIGZuLmxhYmVsID0gbGFiZWxcbiAgdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zW2xhYmVsXSA9IGZuXG59XG4vKiFcbiAqIGx1bnIuUGlwZWxpbmVcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuUGlwZWxpbmVzIG1haW50YWluIGFuIG9yZGVyZWQgbGlzdCBvZiBmdW5jdGlvbnMgdG8gYmUgYXBwbGllZCB0byBhbGxcbiAqIHRva2VucyBpbiBkb2N1bWVudHMgZW50ZXJpbmcgdGhlIHNlYXJjaCBpbmRleCBhbmQgcXVlcmllcyBiZWluZyByYW4gYWdhaW5zdFxuICogdGhlIGluZGV4LlxuICpcbiAqIEFuIGluc3RhbmNlIG9mIGx1bnIuSW5kZXggY3JlYXRlZCB3aXRoIHRoZSBsdW5yIHNob3J0Y3V0IHdpbGwgY29udGFpbiBhXG4gKiBwaXBlbGluZSB3aXRoIGEgc3RvcCB3b3JkIGZpbHRlciBhbmQgYW4gRW5nbGlzaCBsYW5ndWFnZSBzdGVtbWVyLiBFeHRyYVxuICogZnVuY3Rpb25zIGNhbiBiZSBhZGRlZCBiZWZvcmUgb3IgYWZ0ZXIgZWl0aGVyIG9mIHRoZXNlIGZ1bmN0aW9ucyBvciB0aGVzZVxuICogZGVmYXVsdCBmdW5jdGlvbnMgY2FuIGJlIHJlbW92ZWQuXG4gKlxuICogV2hlbiBydW4gdGhlIHBpcGVsaW5lIHdpbGwgY2FsbCBlYWNoIGZ1bmN0aW9uIGluIHR1cm4sIHBhc3NpbmcgYSB0b2tlbiwgdGhlXG4gKiBpbmRleCBvZiB0aGF0IHRva2VuIGluIHRoZSBvcmlnaW5hbCBsaXN0IG9mIGFsbCB0b2tlbnMgYW5kIGZpbmFsbHkgYSBsaXN0IG9mXG4gKiBhbGwgdGhlIG9yaWdpbmFsIHRva2Vucy5cbiAqXG4gKiBUaGUgb3V0cHV0IG9mIGZ1bmN0aW9ucyBpbiB0aGUgcGlwZWxpbmUgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIG5leHQgZnVuY3Rpb25cbiAqIGluIHRoZSBwaXBlbGluZS4gVG8gZXhjbHVkZSBhIHRva2VuIGZyb20gZW50ZXJpbmcgdGhlIGluZGV4IHRoZSBmdW5jdGlvblxuICogc2hvdWxkIHJldHVybiB1bmRlZmluZWQsIHRoZSByZXN0IG9mIHRoZSBwaXBlbGluZSB3aWxsIG5vdCBiZSBjYWxsZWQgd2l0aFxuICogdGhpcyB0b2tlbi5cbiAqXG4gKiBGb3Igc2VyaWFsaXNhdGlvbiBvZiBwaXBlbGluZXMgdG8gd29yaywgYWxsIGZ1bmN0aW9ucyB1c2VkIGluIGFuIGluc3RhbmNlIG9mXG4gKiBhIHBpcGVsaW5lIHNob3VsZCBiZSByZWdpc3RlcmVkIHdpdGggbHVuci5QaXBlbGluZS4gUmVnaXN0ZXJlZCBmdW5jdGlvbnMgY2FuXG4gKiB0aGVuIGJlIGxvYWRlZC4gSWYgdHJ5aW5nIHRvIGxvYWQgYSBzZXJpYWxpc2VkIHBpcGVsaW5lIHRoYXQgdXNlcyBmdW5jdGlvbnNcbiAqIHRoYXQgYXJlIG5vdCByZWdpc3RlcmVkIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICpcbiAqIElmIG5vdCBwbGFubmluZyBvbiBzZXJpYWxpc2luZyB0aGUgcGlwZWxpbmUgdGhlbiByZWdpc3RlcmluZyBwaXBlbGluZSBmdW5jdGlvbnNcbiAqIGlzIG5vdCBuZWNlc3NhcnkuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuUGlwZWxpbmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3N0YWNrID0gW11cbn1cblxubHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zID0ge31cblxuLyoqXG4gKiBSZWdpc3RlciBhIGZ1bmN0aW9uIHdpdGggdGhlIHBpcGVsaW5lLlxuICpcbiAqIEZ1bmN0aW9ucyB0aGF0IGFyZSB1c2VkIGluIHRoZSBwaXBlbGluZSBzaG91bGQgYmUgcmVnaXN0ZXJlZCBpZiB0aGUgcGlwZWxpbmVcbiAqIG5lZWRzIHRvIGJlIHNlcmlhbGlzZWQsIG9yIGEgc2VyaWFsaXNlZCBwaXBlbGluZSBuZWVkcyB0byBiZSBsb2FkZWQuXG4gKlxuICogUmVnaXN0ZXJpbmcgYSBmdW5jdGlvbiBkb2VzIG5vdCBhZGQgaXQgdG8gYSBwaXBlbGluZSwgZnVuY3Rpb25zIG11c3Qgc3RpbGwgYmVcbiAqIGFkZGVkIHRvIGluc3RhbmNlcyBvZiB0aGUgcGlwZWxpbmUgZm9yIHRoZW0gdG8gYmUgdXNlZCB3aGVuIHJ1bm5pbmcgYSBwaXBlbGluZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgZm9yLlxuICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIFRoZSBsYWJlbCB0byByZWdpc3RlciB0aGlzIGZ1bmN0aW9uIHdpdGhcbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4sIGxhYmVsKSB7XG4gIGlmIChsYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ092ZXJ3cml0aW5nIGV4aXN0aW5nIHJlZ2lzdGVyZWQgZnVuY3Rpb246ICcgKyBsYWJlbClcbiAgfVxuXG4gIGZuLmxhYmVsID0gbGFiZWxcbiAgbHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zW2ZuLmxhYmVsXSA9IGZuXG59XG5cbi8qKlxuICogV2FybnMgaWYgdGhlIGZ1bmN0aW9uIGlzIG5vdCByZWdpc3RlcmVkIGFzIGEgUGlwZWxpbmUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIGZvci5cbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGlzUmVnaXN0ZXJlZCA9IGZuLmxhYmVsICYmIChmbi5sYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpXG5cbiAgaWYgKCFpc1JlZ2lzdGVyZWQpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ0Z1bmN0aW9uIGlzIG5vdCByZWdpc3RlcmVkIHdpdGggcGlwZWxpbmUuIFRoaXMgbWF5IGNhdXNlIHByb2JsZW1zIHdoZW4gc2VyaWFsaXNpbmcgdGhlIGluZGV4LlxcbicsIGZuKVxuICB9XG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgcGlwZWxpbmUuXG4gKlxuICogQWxsIGZ1bmN0aW9ucyB0byBiZSBsb2FkZWQgbXVzdCBhbHJlYWR5IGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLlBpcGVsaW5lLlxuICogSWYgYW55IGZ1bmN0aW9uIGZyb20gdGhlIHNlcmlhbGlzZWQgZGF0YSBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZCB0aGVuIGFuXG4gKiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXNlZCBUaGUgc2VyaWFsaXNlZCBwaXBlbGluZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuUGlwZWxpbmV9XG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWQpIHtcbiAgdmFyIHBpcGVsaW5lID0gbmV3IGx1bnIuUGlwZWxpbmVcblxuICBzZXJpYWxpc2VkLmZvckVhY2goZnVuY3Rpb24gKGZuTmFtZSkge1xuICAgIHZhciBmbiA9IGx1bnIuUGlwZWxpbmUucmVnaXN0ZXJlZEZ1bmN0aW9uc1tmbk5hbWVdXG5cbiAgICBpZiAoZm4pIHtcbiAgICAgIHBpcGVsaW5lLmFkZChmbilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgbG9hZCB1bi1yZWdpc3RlcmVkIGZ1bmN0aW9uOiAnICsgZm5OYW1lKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcGlwZWxpbmVcbn1cblxuLyoqXG4gKiBBZGRzIG5ldyBmdW5jdGlvbnMgdG8gdGhlIGVuZCBvZiB0aGUgcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9ucyBBbnkgbnVtYmVyIG9mIGZ1bmN0aW9ucyB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcblxuICBmbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChmbilcbiAgICB0aGlzLl9zdGFjay5wdXNoKGZuKVxuICB9LCB0aGlzKVxufVxuXG4vKipcbiAqIEFkZHMgYSBzaW5nbGUgZnVuY3Rpb24gYWZ0ZXIgYSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZVxuICogcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4aXN0aW5nRm4gQSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZSBwaXBlbGluZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5ld0ZuIFRoZSBuZXcgZnVuY3Rpb24gdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5hZnRlciA9IGZ1bmN0aW9uIChleGlzdGluZ0ZuLCBuZXdGbikge1xuICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChuZXdGbilcblxuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihleGlzdGluZ0ZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBleGlzdGluZ0ZuJylcbiAgfVxuXG4gIHBvcyA9IHBvcyArIDFcbiAgdGhpcy5fc3RhY2suc3BsaWNlKHBvcywgMCwgbmV3Rm4pXG59XG5cbi8qKlxuICogQWRkcyBhIHNpbmdsZSBmdW5jdGlvbiBiZWZvcmUgYSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZVxuICogcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4aXN0aW5nRm4gQSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZSBwaXBlbGluZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5ld0ZuIFRoZSBuZXcgZnVuY3Rpb24gdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5iZWZvcmUgPSBmdW5jdGlvbiAoZXhpc3RpbmdGbiwgbmV3Rm4pIHtcbiAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQobmV3Rm4pXG5cbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZXhpc3RpbmdGbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgZXhpc3RpbmdGbicpXG4gIH1cblxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAwLCBuZXdGbilcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgZnVuY3Rpb24gZnJvbSB0aGUgcGlwZWxpbmUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZm4pXG4gIGlmIChwb3MgPT0gLTEpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDEpXG59XG5cbi8qKlxuICogUnVucyB0aGUgY3VycmVudCBsaXN0IG9mIGZ1bmN0aW9ucyB0aGF0IG1ha2UgdXAgdGhlIHBpcGVsaW5lIGFnYWluc3QgdGhlXG4gKiBwYXNzZWQgdG9rZW5zLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHRva2VucyBUaGUgdG9rZW5zIHRvIHJ1biB0aHJvdWdoIHRoZSBwaXBlbGluZS5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAodG9rZW5zKSB7XG4gIHZhciBvdXQgPSBbXSxcbiAgICAgIHRva2VuTGVuZ3RoID0gdG9rZW5zLmxlbmd0aCxcbiAgICAgIHN0YWNrTGVuZ3RoID0gdGhpcy5fc3RhY2subGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbkxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN0YWNrTGVuZ3RoOyBqKyspIHtcbiAgICAgIHRva2VuID0gdGhpcy5fc3RhY2tbal0odG9rZW4sIGksIHRva2VucylcbiAgICAgIGlmICh0b2tlbiA9PT0gdm9pZCAwIHx8IHRva2VuID09PSAnJykgYnJlYWtcbiAgICB9O1xuXG4gICAgaWYgKHRva2VuICE9PSB2b2lkIDAgJiYgdG9rZW4gIT09ICcnKSBvdXQucHVzaCh0b2tlbilcbiAgfTtcblxuICByZXR1cm4gb3V0XG59XG5cbi8qKlxuICogUmVzZXRzIHRoZSBwaXBlbGluZSBieSByZW1vdmluZyBhbnkgZXhpc3RpbmcgcHJvY2Vzc29ycy5cbiAqXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3N0YWNrID0gW11cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHBpcGVsaW5lIHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fc3RhY2subWFwKGZ1bmN0aW9uIChmbikge1xuICAgIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKGZuKVxuXG4gICAgcmV0dXJuIGZuLmxhYmVsXG4gIH0pXG59XG4vKiFcbiAqIGx1bnIuVmVjdG9yXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlZlY3RvcnMgaW1wbGVtZW50IHZlY3RvciByZWxhdGVkIG9wZXJhdGlvbnMgZm9yXG4gKiBhIHNlcmllcyBvZiBlbGVtZW50cy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5WZWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX21hZ25pdHVkZSA9IG51bGxcbiAgdGhpcy5saXN0ID0gdW5kZWZpbmVkXG4gIHRoaXMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIGx1bnIuVmVjdG9yLk5vZGUgaXMgYSBzaW1wbGUgc3RydWN0IGZvciBlYWNoIG5vZGVcbiAqIGluIGEgbHVuci5WZWN0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIG5vZGUgaW4gdGhlIHZlY3Rvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgZGF0YSBhdCB0aGlzIG5vZGUgaW4gdGhlIHZlY3Rvci5cbiAqIEBwYXJhbSB7bHVuci5WZWN0b3IuTm9kZX0gVGhlIG5vZGUgZGlyZWN0bHkgYWZ0ZXIgdGhpcyBub2RlIGluIHRoZSB2ZWN0b3IuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IuTm9kZSA9IGZ1bmN0aW9uIChpZHgsIHZhbCwgbmV4dCkge1xuICB0aGlzLmlkeCA9IGlkeFxuICB0aGlzLnZhbCA9IHZhbFxuICB0aGlzLm5leHQgPSBuZXh0XG59XG5cbi8qKlxuICogSW5zZXJ0cyBhIG5ldyB2YWx1ZSBhdCBhIHBvc2l0aW9uIGluIGEgdmVjdG9yLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgaW5kZXggYXQgd2hpY2ggdG8gaW5zZXJ0IGEgdmFsdWUuXG4gKiBAcGFyYW0ge09iamVjdH0gVGhlIG9iamVjdCB0byBpbnNlcnQgaW4gdGhlIHZlY3Rvci5cbiAqIEBtZW1iZXJPZiBWZWN0b3IuXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoaWR4LCB2YWwpIHtcbiAgdGhpcy5fbWFnbml0dWRlID0gdW5kZWZpbmVkO1xuICB2YXIgbGlzdCA9IHRoaXMubGlzdFxuXG4gIGlmICghbGlzdCkge1xuICAgIHRoaXMubGlzdCA9IG5ldyBsdW5yLlZlY3Rvci5Ob2RlIChpZHgsIHZhbCwgbGlzdClcbiAgICByZXR1cm4gdGhpcy5sZW5ndGgrK1xuICB9XG5cbiAgaWYgKGlkeCA8IGxpc3QuaWR4KSB7XG4gICAgdGhpcy5saXN0ID0gbmV3IGx1bnIuVmVjdG9yLk5vZGUgKGlkeCwgdmFsLCBsaXN0KVxuICAgIHJldHVybiB0aGlzLmxlbmd0aCsrXG4gIH1cblxuICB2YXIgcHJldiA9IGxpc3QsXG4gICAgICBuZXh0ID0gbGlzdC5uZXh0XG5cbiAgd2hpbGUgKG5leHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGlkeCA8IG5leHQuaWR4KSB7XG4gICAgICBwcmV2Lm5leHQgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIG5leHQpXG4gICAgICByZXR1cm4gdGhpcy5sZW5ndGgrK1xuICAgIH1cblxuICAgIHByZXYgPSBuZXh0LCBuZXh0ID0gbmV4dC5uZXh0XG4gIH1cblxuICBwcmV2Lm5leHQgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIG5leHQpXG4gIHJldHVybiB0aGlzLmxlbmd0aCsrXG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWFnbml0dWRlIG9mIHRoaXMgdmVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgVmVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5tYWduaXR1ZGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLl9tYWduaXR1ZGUpIHJldHVybiB0aGlzLl9tYWduaXR1ZGVcbiAgdmFyIG5vZGUgPSB0aGlzLmxpc3QsXG4gICAgICBzdW1PZlNxdWFyZXMgPSAwLFxuICAgICAgdmFsXG5cbiAgd2hpbGUgKG5vZGUpIHtcbiAgICB2YWwgPSBub2RlLnZhbFxuICAgIHN1bU9mU3F1YXJlcyArPSB2YWwgKiB2YWxcbiAgICBub2RlID0gbm9kZS5uZXh0XG4gIH1cblxuICByZXR1cm4gdGhpcy5fbWFnbml0dWRlID0gTWF0aC5zcXJ0KHN1bU9mU3F1YXJlcylcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlciB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvcn0gb3RoZXJWZWN0b3IgVGhlIHZlY3RvciB0byBjb21wdXRlIHRoZSBkb3QgcHJvZHVjdCB3aXRoLlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIChvdGhlclZlY3Rvcikge1xuICB2YXIgbm9kZSA9IHRoaXMubGlzdCxcbiAgICAgIG90aGVyTm9kZSA9IG90aGVyVmVjdG9yLmxpc3QsXG4gICAgICBkb3RQcm9kdWN0ID0gMFxuXG4gIHdoaWxlIChub2RlICYmIG90aGVyTm9kZSkge1xuICAgIGlmIChub2RlLmlkeCA8IG90aGVyTm9kZS5pZHgpIHtcbiAgICAgIG5vZGUgPSBub2RlLm5leHRcbiAgICB9IGVsc2UgaWYgKG5vZGUuaWR4ID4gb3RoZXJOb2RlLmlkeCkge1xuICAgICAgb3RoZXJOb2RlID0gb3RoZXJOb2RlLm5leHRcbiAgICB9IGVsc2Uge1xuICAgICAgZG90UHJvZHVjdCArPSBub2RlLnZhbCAqIG90aGVyTm9kZS52YWxcbiAgICAgIG5vZGUgPSBub2RlLm5leHRcbiAgICAgIG90aGVyTm9kZSA9IG90aGVyTm9kZS5uZXh0XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRvdFByb2R1Y3Rcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb3NpbmUgc2ltaWxhcml0eSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKiB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvcn0gb3RoZXJWZWN0b3IgVGhlIG90aGVyIHZlY3RvciB0byBjYWxjdWxhdGUgdGhlXG4gKiBzaW1pbGFyaXR5IHdpdGguXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFZlY3RvclxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUuc2ltaWxhcml0eSA9IGZ1bmN0aW9uIChvdGhlclZlY3Rvcikge1xuICByZXR1cm4gdGhpcy5kb3Qob3RoZXJWZWN0b3IpIC8gKHRoaXMubWFnbml0dWRlKCkgKiBvdGhlclZlY3Rvci5tYWduaXR1ZGUoKSlcbn1cbi8qIVxuICogbHVuci5Tb3J0ZWRTZXRcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuU29ydGVkU2V0cyBhcmUgdXNlZCB0byBtYWludGFpbiBhbiBhcnJheSBvZiB1bmlxIHZhbHVlcyBpbiBhIHNvcnRlZFxuICogb3JkZXIuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuU29ydGVkU2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmxlbmd0aCA9IDBcbiAgdGhpcy5lbGVtZW50cyA9IFtdXG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgc29ydGVkIHNldC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkRGF0YSkge1xuICB2YXIgc2V0ID0gbmV3IHRoaXNcblxuICBzZXQuZWxlbWVudHMgPSBzZXJpYWxpc2VkRGF0YVxuICBzZXQubGVuZ3RoID0gc2VyaWFsaXNlZERhdGEubGVuZ3RoXG5cbiAgcmV0dXJuIHNldFxufVxuXG4vKipcbiAqIEluc2VydHMgbmV3IGl0ZW1zIGludG8gdGhlIHNldCBpbiB0aGUgY29ycmVjdCBwb3NpdGlvbiB0byBtYWludGFpbiB0aGVcbiAqIG9yZGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgb2JqZWN0cyB0byBhZGQgdG8gdGhpcyBzZXQuXG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpLCBlbGVtZW50XG5cbiAgZm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGVsZW1lbnQgPSBhcmd1bWVudHNbaV1cbiAgICBpZiAofnRoaXMuaW5kZXhPZihlbGVtZW50KSkgY29udGludWVcbiAgICB0aGlzLmVsZW1lbnRzLnNwbGljZSh0aGlzLmxvY2F0aW9uRm9yKGVsZW1lbnQpLCAwLCBlbGVtZW50KVxuICB9XG5cbiAgdGhpcy5sZW5ndGggPSB0aGlzLmVsZW1lbnRzLmxlbmd0aFxufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgc29ydGVkIHNldCBpbnRvIGFuIGFycmF5LlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmVsZW1lbnRzLnNsaWNlKClcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGFycmF5IHdpdGggdGhlIHJlc3VsdHMgb2YgY2FsbGluZyBhIHByb3ZpZGVkIGZ1bmN0aW9uIG9uIGV2ZXJ5XG4gKiBlbGVtZW50IGluIHRoaXMgc29ydGVkIHNldC5cbiAqXG4gKiBEZWxlZ2F0ZXMgdG8gQXJyYXkucHJvdG90eXBlLm1hcCBhbmQgaGFzIHRoZSBzYW1lIHNpZ25hdHVyZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgb24gZWFjaCBlbGVtZW50IG9mIHRoZVxuICogc2V0LlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBBbiBvcHRpb25hbCBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgY29udGV4dFxuICogZm9yIHRoZSBmdW5jdGlvbiBmbi5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmbiwgY3R4KSB7XG4gIHJldHVybiB0aGlzLmVsZW1lbnRzLm1hcChmbiwgY3R4KVxufVxuXG4vKipcbiAqIEV4ZWN1dGVzIGEgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBwZXIgc29ydGVkIHNldCBlbGVtZW50LlxuICpcbiAqIERlbGVnYXRlcyB0byBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCBhbmQgaGFzIHRoZSBzYW1lIHNpZ25hdHVyZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgb24gZWFjaCBlbGVtZW50IG9mIHRoZVxuICogc2V0LlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBBbiBvcHRpb25hbCBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgY29udGV4dFxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICogZm9yIHRoZSBmdW5jdGlvbiBmbi5cbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoZm4sIGN0eCkge1xuICByZXR1cm4gdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZuLCBjdHgpXG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW5kZXggYXQgd2hpY2ggYSBnaXZlbiBlbGVtZW50IGNhbiBiZSBmb3VuZCBpbiB0aGVcbiAqIHNvcnRlZCBzZXQsIG9yIC0xIGlmIGl0IGlzIG5vdCBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIFRoZSBvYmplY3QgdG8gbG9jYXRlIGluIHRoZSBzb3J0ZWQgc2V0LlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoZWxlbSkge1xuICB2YXIgc3RhcnQgPSAwLFxuICAgICAgZW5kID0gdGhpcy5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnQsXG4gICAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMiksXG4gICAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuXG4gIHdoaWxlIChzZWN0aW9uTGVuZ3RoID4gMSkge1xuICAgIGlmIChwaXZvdEVsZW0gPT09IGVsZW0pIHJldHVybiBwaXZvdFxuXG4gICAgaWYgKHBpdm90RWxlbSA8IGVsZW0pIHN0YXJ0ID0gcGl2b3RcbiAgICBpZiAocGl2b3RFbGVtID4gZWxlbSkgZW5kID0gcGl2b3RcblxuICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydFxuICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKVxuICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG4gIH1cblxuICBpZiAocGl2b3RFbGVtID09PSBlbGVtKSByZXR1cm4gcGl2b3RcblxuICByZXR1cm4gLTFcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiB3aXRoaW4gdGhlIHNvcnRlZCBzZXQgdGhhdCBhbiBlbGVtZW50IHNob3VsZCBiZVxuICogaW5zZXJ0ZWQgYXQgdG8gbWFpbnRhaW4gdGhlIGN1cnJlbnQgb3JkZXIgb2YgdGhlIHNldC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCB0aGUgZWxlbWVudCB0byBzZWFyY2ggZm9yIGRvZXMgbm90IGFscmVhZHkgZXhpc3RcbiAqIGluIHRoZSBzb3J0ZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIFRoZSBlbGVtIHRvIGZpbmQgdGhlIHBvc2l0aW9uIGZvciBpbiB0aGUgc2V0XG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUubG9jYXRpb25Gb3IgPSBmdW5jdGlvbiAoZWxlbSkge1xuICB2YXIgc3RhcnQgPSAwLFxuICAgICAgZW5kID0gdGhpcy5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnQsXG4gICAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMiksXG4gICAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuXG4gIHdoaWxlIChzZWN0aW9uTGVuZ3RoID4gMSkge1xuICAgIGlmIChwaXZvdEVsZW0gPCBlbGVtKSBzdGFydCA9IHBpdm90XG4gICAgaWYgKHBpdm90RWxlbSA+IGVsZW0pIGVuZCA9IHBpdm90XG5cbiAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnRcbiAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMilcbiAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuICB9XG5cbiAgaWYgKHBpdm90RWxlbSA+IGVsZW0pIHJldHVybiBwaXZvdFxuICBpZiAocGl2b3RFbGVtIDwgZWxlbSkgcmV0dXJuIHBpdm90ICsgMVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbHVuci5Tb3J0ZWRTZXQgdGhhdCBjb250YWlucyB0aGUgZWxlbWVudHMgaW4gdGhlIGludGVyc2VjdGlvblxuICogb2YgdGhpcyBzZXQgYW5kIHRoZSBwYXNzZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7bHVuci5Tb3J0ZWRTZXR9IG90aGVyU2V0IFRoZSBzZXQgdG8gaW50ZXJzZWN0IHdpdGggdGhpcyBzZXQuXG4gKiBAcmV0dXJucyB7bHVuci5Tb3J0ZWRTZXR9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5pbnRlcnNlY3QgPSBmdW5jdGlvbiAob3RoZXJTZXQpIHtcbiAgdmFyIGludGVyc2VjdFNldCA9IG5ldyBsdW5yLlNvcnRlZFNldCxcbiAgICAgIGkgPSAwLCBqID0gMCxcbiAgICAgIGFfbGVuID0gdGhpcy5sZW5ndGgsIGJfbGVuID0gb3RoZXJTZXQubGVuZ3RoLFxuICAgICAgYSA9IHRoaXMuZWxlbWVudHMsIGIgPSBvdGhlclNldC5lbGVtZW50c1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgaWYgKGkgPiBhX2xlbiAtIDEgfHwgaiA+IGJfbGVuIC0gMSkgYnJlYWtcblxuICAgIGlmIChhW2ldID09PSBiW2pdKSB7XG4gICAgICBpbnRlcnNlY3RTZXQuYWRkKGFbaV0pXG4gICAgICBpKyssIGorK1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoYVtpXSA8IGJbal0pIHtcbiAgICAgIGkrK1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoYVtpXSA+IGJbal0pIHtcbiAgICAgIGorK1xuICAgICAgY29udGludWVcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGludGVyc2VjdFNldFxufVxuXG4vKipcbiAqIE1ha2VzIGEgY29weSBvZiB0aGlzIHNldFxuICpcbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY2xvbmUgPSBuZXcgbHVuci5Tb3J0ZWRTZXRcblxuICBjbG9uZS5lbGVtZW50cyA9IHRoaXMudG9BcnJheSgpXG4gIGNsb25lLmxlbmd0aCA9IGNsb25lLmVsZW1lbnRzLmxlbmd0aFxuXG4gIHJldHVybiBjbG9uZVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbHVuci5Tb3J0ZWRTZXQgdGhhdCBjb250YWlucyB0aGUgZWxlbWVudHMgaW4gdGhlIHVuaW9uXG4gKiBvZiB0aGlzIHNldCBhbmQgdGhlIHBhc3NlZCBzZXQuXG4gKlxuICogQHBhcmFtIHtsdW5yLlNvcnRlZFNldH0gb3RoZXJTZXQgVGhlIHNldCB0byB1bmlvbiB3aXRoIHRoaXMgc2V0LlxuICogQHJldHVybnMge2x1bnIuU29ydGVkU2V0fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUudW5pb24gPSBmdW5jdGlvbiAob3RoZXJTZXQpIHtcbiAgdmFyIGxvbmdTZXQsIHNob3J0U2V0LCB1bmlvblNldFxuXG4gIGlmICh0aGlzLmxlbmd0aCA+PSBvdGhlclNldC5sZW5ndGgpIHtcbiAgICBsb25nU2V0ID0gdGhpcywgc2hvcnRTZXQgPSBvdGhlclNldFxuICB9IGVsc2Uge1xuICAgIGxvbmdTZXQgPSBvdGhlclNldCwgc2hvcnRTZXQgPSB0aGlzXG4gIH1cblxuICB1bmlvblNldCA9IGxvbmdTZXQuY2xvbmUoKVxuXG4gIGZvcih2YXIgaSA9IDAsIHNob3J0U2V0RWxlbWVudHMgPSBzaG9ydFNldC50b0FycmF5KCk7IGkgPCBzaG9ydFNldEVsZW1lbnRzLmxlbmd0aDsgaSsrKXtcbiAgICB1bmlvblNldC5hZGQoc2hvcnRTZXRFbGVtZW50c1tpXSlcbiAgfVxuXG4gIHJldHVybiB1bmlvblNldFxufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc29ydGVkIHNldCByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRvQXJyYXkoKVxufVxuLyohXG4gKiBsdW5yLkluZGV4XG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLkluZGV4IGlzIG9iamVjdCB0aGF0IG1hbmFnZXMgYSBzZWFyY2ggaW5kZXguICBJdCBjb250YWlucyB0aGUgaW5kZXhlc1xuICogYW5kIHN0b3JlcyBhbGwgdGhlIHRva2VucyBhbmQgZG9jdW1lbnQgbG9va3Vwcy4gIEl0IGFsc28gcHJvdmlkZXMgdGhlIG1haW5cbiAqIHVzZXIgZmFjaW5nIEFQSSBmb3IgdGhlIGxpYnJhcnkuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuSW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2ZpZWxkcyA9IFtdXG4gIHRoaXMuX3JlZiA9ICdpZCdcbiAgdGhpcy5waXBlbGluZSA9IG5ldyBsdW5yLlBpcGVsaW5lXG4gIHRoaXMuZG9jdW1lbnRTdG9yZSA9IG5ldyBsdW5yLlN0b3JlXG4gIHRoaXMudG9rZW5TdG9yZSA9IG5ldyBsdW5yLlRva2VuU3RvcmVcbiAgdGhpcy5jb3JwdXNUb2tlbnMgPSBuZXcgbHVuci5Tb3J0ZWRTZXRcbiAgdGhpcy5ldmVudEVtaXR0ZXIgPSAgbmV3IGx1bnIuRXZlbnRFbWl0dGVyXG4gIHRoaXMudG9rZW5pemVyRm4gPSBsdW5yLnRva2VuaXplclxuXG4gIHRoaXMuX2lkZkNhY2hlID0ge31cblxuICB0aGlzLm9uKCdhZGQnLCAncmVtb3ZlJywgJ3VwZGF0ZScsIChmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faWRmQ2FjaGUgPSB7fVxuICB9KS5iaW5kKHRoaXMpKVxufVxuXG4vKipcbiAqIEJpbmQgYSBoYW5kbGVyIHRvIGV2ZW50cyBiZWluZyBlbWl0dGVkIGJ5IHRoZSBpbmRleC5cbiAqXG4gKiBUaGUgaGFuZGxlciBjYW4gYmUgYm91bmQgdG8gbWFueSBldmVudHMgYXQgdGhlIHNhbWUgdGltZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gW2V2ZW50TmFtZV0gVGhlIG5hbWUocykgb2YgZXZlbnRzIHRvIGJpbmQgdGhlIGZ1bmN0aW9uIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHNlcmlhbGlzZWQgc2V0IHRvIGxvYWQuXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICByZXR1cm4gdGhpcy5ldmVudEVtaXR0ZXIuYWRkTGlzdGVuZXIuYXBwbHkodGhpcy5ldmVudEVtaXR0ZXIsIGFyZ3MpXG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGhhbmRsZXIgZnJvbSBhbiBldmVudCBiZWluZyBlbWl0dGVkIGJ5IHRoZSBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIGV2ZW50cyB0byByZW1vdmUgdGhlIGZ1bmN0aW9uIGZyb20uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgcmV0dXJuIHRoaXMuZXZlbnRFbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIGZuKVxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIGluZGV4LlxuICpcbiAqIElzc3VlcyBhIHdhcm5pbmcgaWYgdGhlIGluZGV4IGJlaW5nIGltcG9ydGVkIHdhcyBzZXJpYWxpc2VkXG4gKiBieSBhIGRpZmZlcmVudCB2ZXJzaW9uIG9mIGx1bnIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHNldCB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIGlmIChzZXJpYWxpc2VkRGF0YS52ZXJzaW9uICE9PSBsdW5yLnZlcnNpb24pIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ3ZlcnNpb24gbWlzbWF0Y2g6IGN1cnJlbnQgJyArIGx1bnIudmVyc2lvbiArICcgaW1wb3J0aW5nICcgKyBzZXJpYWxpc2VkRGF0YS52ZXJzaW9uKVxuICB9XG5cbiAgdmFyIGlkeCA9IG5ldyB0aGlzXG5cbiAgaWR4Ll9maWVsZHMgPSBzZXJpYWxpc2VkRGF0YS5maWVsZHNcbiAgaWR4Ll9yZWYgPSBzZXJpYWxpc2VkRGF0YS5yZWZcblxuICBpZHgudG9rZW5pemVyKGx1bnIudG9rZW5pemVyLmxvYWQoc2VyaWFsaXNlZERhdGEudG9rZW5pemVyKSlcbiAgaWR4LmRvY3VtZW50U3RvcmUgPSBsdW5yLlN0b3JlLmxvYWQoc2VyaWFsaXNlZERhdGEuZG9jdW1lbnRTdG9yZSlcbiAgaWR4LnRva2VuU3RvcmUgPSBsdW5yLlRva2VuU3RvcmUubG9hZChzZXJpYWxpc2VkRGF0YS50b2tlblN0b3JlKVxuICBpZHguY29ycHVzVG9rZW5zID0gbHVuci5Tb3J0ZWRTZXQubG9hZChzZXJpYWxpc2VkRGF0YS5jb3JwdXNUb2tlbnMpXG4gIGlkeC5waXBlbGluZSA9IGx1bnIuUGlwZWxpbmUubG9hZChzZXJpYWxpc2VkRGF0YS5waXBlbGluZSlcblxuICByZXR1cm4gaWR4XG59XG5cbi8qKlxuICogQWRkcyBhIGZpZWxkIHRvIHRoZSBsaXN0IG9mIGZpZWxkcyB0aGF0IHdpbGwgYmUgc2VhcmNoYWJsZSB3aXRoaW4gZG9jdW1lbnRzXG4gKiBpbiB0aGUgaW5kZXguXG4gKlxuICogQW4gb3B0aW9uYWwgYm9vc3QgcGFyYW0gY2FuIGJlIHBhc3NlZCB0byBhZmZlY3QgaG93IG11Y2ggdG9rZW5zIGluIHRoaXMgZmllbGRcbiAqIHJhbmsgaW4gc2VhcmNoIHJlc3VsdHMsIGJ5IGRlZmF1bHQgdGhlIGJvb3N0IHZhbHVlIGlzIDEuXG4gKlxuICogRmllbGRzIHNob3VsZCBiZSBhZGRlZCBiZWZvcmUgYW55IGRvY3VtZW50cyBhcmUgYWRkZWQgdG8gdGhlIGluZGV4LCBmaWVsZHNcbiAqIHRoYXQgYXJlIGFkZGVkIGFmdGVyIGRvY3VtZW50cyBhcmUgYWRkZWQgdG8gdGhlIGluZGV4IHdpbGwgb25seSBhcHBseSB0byBuZXdcbiAqIGRvY3VtZW50cyBhZGRlZCB0byB0aGUgaW5kZXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkTmFtZSBUaGUgbmFtZSBvZiB0aGUgZmllbGQgd2l0aGluIHRoZSBkb2N1bWVudCB0aGF0XG4gKiBzaG91bGQgYmUgaW5kZXhlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGJvb3N0IEFuIG9wdGlvbmFsIGJvb3N0IHRoYXQgY2FuIGJlIGFwcGxpZWQgdG8gdGVybXMgaW4gdGhpc1xuICogZmllbGQuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5maWVsZCA9IGZ1bmN0aW9uIChmaWVsZE5hbWUsIG9wdHMpIHtcbiAgdmFyIG9wdHMgPSBvcHRzIHx8IHt9LFxuICAgICAgZmllbGQgPSB7IG5hbWU6IGZpZWxkTmFtZSwgYm9vc3Q6IG9wdHMuYm9vc3QgfHwgMSB9XG5cbiAgdGhpcy5fZmllbGRzLnB1c2goZmllbGQpXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogU2V0cyB0aGUgcHJvcGVydHkgdXNlZCB0byB1bmlxdWVseSBpZGVudGlmeSBkb2N1bWVudHMgYWRkZWQgdG8gdGhlIGluZGV4LFxuICogYnkgZGVmYXVsdCB0aGlzIHByb3BlcnR5IGlzICdpZCcuXG4gKlxuICogVGhpcyBzaG91bGQgb25seSBiZSBjaGFuZ2VkIGJlZm9yZSBhZGRpbmcgZG9jdW1lbnRzIHRvIHRoZSBpbmRleCwgY2hhbmdpbmdcbiAqIHRoZSByZWYgcHJvcGVydHkgd2l0aG91dCByZXNldHRpbmcgdGhlIGluZGV4IGNhbiBsZWFkIHRvIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAqXG4gKiBUaGUgdmFsdWUgb2YgcmVmIGNhbiBiZSBvZiBhbnkgdHlwZSBidXQgaXQgX211c3RfIGJlIHN0YWJseSBjb21wYXJhYmxlIGFuZFxuICogb3JkZXJhYmxlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWZOYW1lIFRoZSBwcm9wZXJ0eSB0byB1c2UgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhlXG4gKiBkb2N1bWVudHMgaW4gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciB0byBlbWl0IGFkZCBldmVudHMsIGRlZmF1bHRzIHRvIHRydWVcbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uIChyZWZOYW1lKSB7XG4gIHRoaXMuX3JlZiA9IHJlZk5hbWVcbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSB0b2tlbml6ZXIgdXNlZCBmb3IgdGhpcyBpbmRleC5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoZSBpbmRleCB3aWxsIHVzZSB0aGUgZGVmYXVsdCB0b2tlbml6ZXIsIGx1bnIudG9rZW5pemVyLiBUaGUgdG9rZW5pemVyXG4gKiBzaG91bGQgb25seSBiZSBjaGFuZ2VkIGJlZm9yZSBhZGRpbmcgZG9jdW1lbnRzIHRvIHRoZSBpbmRleC4gQ2hhbmdpbmcgdGhlIHRva2VuaXplclxuICogd2l0aG91dCByZS1idWlsZGluZyB0aGUgaW5kZXggY2FuIGxlYWQgdG8gdW5leHBlY3RlZCByZXN1bHRzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byB1c2UgYXMgYSB0b2tlbml6ZXIuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS50b2tlbml6ZXIgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGlzUmVnaXN0ZXJlZCA9IGZuLmxhYmVsICYmIChmbi5sYWJlbCBpbiBsdW5yLnRva2VuaXplci5yZWdpc3RlcmVkRnVuY3Rpb25zKVxuXG4gIGlmICghaXNSZWdpc3RlcmVkKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdGdW5jdGlvbiBpcyBub3QgYSByZWdpc3RlcmVkIHRva2VuaXplci4gVGhpcyBtYXkgY2F1c2UgcHJvYmxlbXMgd2hlbiBzZXJpYWxpc2luZyB0aGUgaW5kZXgnKVxuICB9XG5cbiAgdGhpcy50b2tlbml6ZXJGbiA9IGZuXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQWRkIGEgZG9jdW1lbnQgdG8gdGhlIGluZGV4LlxuICpcbiAqIFRoaXMgaXMgdGhlIHdheSBuZXcgZG9jdW1lbnRzIGVudGVyIHRoZSBpbmRleCwgdGhpcyBmdW5jdGlvbiB3aWxsIHJ1biB0aGVcbiAqIGZpZWxkcyBmcm9tIHRoZSBkb2N1bWVudCB0aHJvdWdoIHRoZSBpbmRleCdzIHBpcGVsaW5lIGFuZCB0aGVuIGFkZCBpdCB0b1xuICogdGhlIGluZGV4LCBpdCB3aWxsIHRoZW4gc2hvdyB1cCBpbiBzZWFyY2ggcmVzdWx0cy5cbiAqXG4gKiBBbiAnYWRkJyBldmVudCBpcyBlbWl0dGVkIHdpdGggdGhlIGRvY3VtZW50IHRoYXQgaGFzIGJlZW4gYWRkZWQgYW5kIHRoZSBpbmRleFxuICogdGhlIGRvY3VtZW50IGhhcyBiZWVuIGFkZGVkIHRvLiBUaGlzIGV2ZW50IGNhbiBiZSBzaWxlbmNlZCBieSBwYXNzaW5nIGZhbHNlXG4gKiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGFkZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIFRoZSBkb2N1bWVudCB0byBhZGQgdG8gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciBvciBub3QgdG8gZW1pdCBldmVudHMsIGRlZmF1bHQgdHJ1ZS5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZG9jLCBlbWl0RXZlbnQpIHtcbiAgdmFyIGRvY1Rva2VucyA9IHt9LFxuICAgICAgYWxsRG9jdW1lbnRUb2tlbnMgPSBuZXcgbHVuci5Tb3J0ZWRTZXQsXG4gICAgICBkb2NSZWYgPSBkb2NbdGhpcy5fcmVmXSxcbiAgICAgIGVtaXRFdmVudCA9IGVtaXRFdmVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGVtaXRFdmVudFxuXG4gIHRoaXMuX2ZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgIHZhciBmaWVsZFRva2VucyA9IHRoaXMucGlwZWxpbmUucnVuKHRoaXMudG9rZW5pemVyRm4oZG9jW2ZpZWxkLm5hbWVdKSlcblxuICAgIGRvY1Rva2Vuc1tmaWVsZC5uYW1lXSA9IGZpZWxkVG9rZW5zXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkVG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdG9rZW4gPSBmaWVsZFRva2Vuc1tpXVxuICAgICAgYWxsRG9jdW1lbnRUb2tlbnMuYWRkKHRva2VuKVxuICAgICAgdGhpcy5jb3JwdXNUb2tlbnMuYWRkKHRva2VuKVxuICAgIH1cbiAgfSwgdGhpcylcblxuICB0aGlzLmRvY3VtZW50U3RvcmUuc2V0KGRvY1JlZiwgYWxsRG9jdW1lbnRUb2tlbnMpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxEb2N1bWVudFRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IGFsbERvY3VtZW50VG9rZW5zLmVsZW1lbnRzW2ldXG4gICAgdmFyIHRmID0gMDtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5fZmllbGRzLmxlbmd0aDsgaisrKXtcbiAgICAgIHZhciBmaWVsZCA9IHRoaXMuX2ZpZWxkc1tqXVxuICAgICAgdmFyIGZpZWxkVG9rZW5zID0gZG9jVG9rZW5zW2ZpZWxkLm5hbWVdXG4gICAgICB2YXIgZmllbGRMZW5ndGggPSBmaWVsZFRva2Vucy5sZW5ndGhcblxuICAgICAgaWYgKCFmaWVsZExlbmd0aCkgY29udGludWVcblxuICAgICAgdmFyIHRva2VuQ291bnQgPSAwXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IGZpZWxkTGVuZ3RoOyBrKyspe1xuICAgICAgICBpZiAoZmllbGRUb2tlbnNba10gPT09IHRva2VuKXtcbiAgICAgICAgICB0b2tlbkNvdW50KytcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0ZiArPSAodG9rZW5Db3VudCAvIGZpZWxkTGVuZ3RoICogZmllbGQuYm9vc3QpXG4gICAgfVxuXG4gICAgdGhpcy50b2tlblN0b3JlLmFkZCh0b2tlbiwgeyByZWY6IGRvY1JlZiwgdGY6IHRmIH0pXG4gIH07XG5cbiAgaWYgKGVtaXRFdmVudCkgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnYWRkJywgZG9jLCB0aGlzKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBkb2N1bWVudCBmcm9tIHRoZSBpbmRleC5cbiAqXG4gKiBUbyBtYWtlIHN1cmUgZG9jdW1lbnRzIG5vIGxvbmdlciBzaG93IHVwIGluIHNlYXJjaCByZXN1bHRzIHRoZXkgY2FuIGJlXG4gKiByZW1vdmVkIGZyb20gdGhlIGluZGV4IHVzaW5nIHRoaXMgbWV0aG9kLlxuICpcbiAqIFRoZSBkb2N1bWVudCBwYXNzZWQgb25seSBuZWVkcyB0byBoYXZlIHRoZSBzYW1lIHJlZiBwcm9wZXJ0eSB2YWx1ZSBhcyB0aGVcbiAqIGRvY3VtZW50IHRoYXQgd2FzIGFkZGVkIHRvIHRoZSBpbmRleCwgdGhleSBjb3VsZCBiZSBjb21wbGV0ZWx5IGRpZmZlcmVudFxuICogb2JqZWN0cy5cbiAqXG4gKiBBICdyZW1vdmUnIGV2ZW50IGlzIGVtaXR0ZWQgd2l0aCB0aGUgZG9jdW1lbnQgdGhhdCBoYXMgYmVlbiByZW1vdmVkIGFuZCB0aGUgaW5kZXhcbiAqIHRoZSBkb2N1bWVudCBoYXMgYmVlbiByZW1vdmVkIGZyb20uIFRoaXMgZXZlbnQgY2FuIGJlIHNpbGVuY2VkIGJ5IHBhc3NpbmcgZmFsc2VcbiAqIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gcmVtb3ZlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvY3VtZW50IHRvIHJlbW92ZSBmcm9tIHRoZSBpbmRleC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZW1pdEV2ZW50IFdoZXRoZXIgdG8gZW1pdCByZW1vdmUgZXZlbnRzLCBkZWZhdWx0cyB0byB0cnVlXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGRvYywgZW1pdEV2ZW50KSB7XG4gIHZhciBkb2NSZWYgPSBkb2NbdGhpcy5fcmVmXSxcbiAgICAgIGVtaXRFdmVudCA9IGVtaXRFdmVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGVtaXRFdmVudFxuXG4gIGlmICghdGhpcy5kb2N1bWVudFN0b3JlLmhhcyhkb2NSZWYpKSByZXR1cm5cblxuICB2YXIgZG9jVG9rZW5zID0gdGhpcy5kb2N1bWVudFN0b3JlLmdldChkb2NSZWYpXG5cbiAgdGhpcy5kb2N1bWVudFN0b3JlLnJlbW92ZShkb2NSZWYpXG5cbiAgZG9jVG9rZW5zLmZvckVhY2goZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy50b2tlblN0b3JlLnJlbW92ZSh0b2tlbiwgZG9jUmVmKVxuICB9LCB0aGlzKVxuXG4gIGlmIChlbWl0RXZlbnQpIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ3JlbW92ZScsIGRvYywgdGhpcylcbn1cblxuLyoqXG4gKiBVcGRhdGVzIGEgZG9jdW1lbnQgaW4gdGhlIGluZGV4LlxuICpcbiAqIFdoZW4gYSBkb2N1bWVudCBjb250YWluZWQgd2l0aGluIHRoZSBpbmRleCBnZXRzIHVwZGF0ZWQsIGZpZWxkcyBjaGFuZ2VkLFxuICogYWRkZWQgb3IgcmVtb3ZlZCwgdG8gbWFrZSBzdXJlIGl0IGNvcnJlY3RseSBtYXRjaGVkIGFnYWluc3Qgc2VhcmNoIHF1ZXJpZXMsXG4gKiBpdCBzaG91bGQgYmUgdXBkYXRlZCBpbiB0aGUgaW5kZXguXG4gKlxuICogVGhpcyBtZXRob2QgaXMganVzdCBhIHdyYXBwZXIgYXJvdW5kIGByZW1vdmVgIGFuZCBgYWRkYFxuICpcbiAqIEFuICd1cGRhdGUnIGV2ZW50IGlzIGVtaXR0ZWQgd2l0aCB0aGUgZG9jdW1lbnQgdGhhdCBoYXMgYmVlbiB1cGRhdGVkIGFuZCB0aGUgaW5kZXguXG4gKiBUaGlzIGV2ZW50IGNhbiBiZSBzaWxlbmNlZCBieSBwYXNzaW5nIGZhbHNlIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gdXBkYXRlLiBPbmx5XG4gKiBhbiB1cGRhdGUgZXZlbnQgd2lsbCBiZSBmaXJlZCwgdGhlICdhZGQnIGFuZCAncmVtb3ZlJyBldmVudHMgb2YgdGhlIHVuZGVybHlpbmcgY2FsbHNcbiAqIGFyZSBzaWxlbmNlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIFRoZSBkb2N1bWVudCB0byB1cGRhdGUgaW4gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciB0byBlbWl0IHVwZGF0ZSBldmVudHMsIGRlZmF1bHRzIHRvIHRydWVcbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLnJlbW92ZVxuICogQHNlZSBJbmRleC5wcm90b3R5cGUuYWRkXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRvYywgZW1pdEV2ZW50KSB7XG4gIHZhciBlbWl0RXZlbnQgPSBlbWl0RXZlbnQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBlbWl0RXZlbnRcblxuICB0aGlzLnJlbW92ZShkb2MsIGZhbHNlKVxuICB0aGlzLmFkZChkb2MsIGZhbHNlKVxuXG4gIGlmIChlbWl0RXZlbnQpIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ3VwZGF0ZScsIGRvYywgdGhpcylcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIGRvY3VtZW50IGZyZXF1ZW5jeSBmb3IgYSB0b2tlbiB3aXRoaW4gdGhlIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gY2FsY3VsYXRlIHRoZSBpZGYgb2YuXG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5pZGZcbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuaWRmID0gZnVuY3Rpb24gKHRlcm0pIHtcbiAgdmFyIGNhY2hlS2V5ID0gXCJAXCIgKyB0ZXJtXG4gIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5faWRmQ2FjaGUsIGNhY2hlS2V5KSkgcmV0dXJuIHRoaXMuX2lkZkNhY2hlW2NhY2hlS2V5XVxuXG4gIHZhciBkb2N1bWVudEZyZXF1ZW5jeSA9IHRoaXMudG9rZW5TdG9yZS5jb3VudCh0ZXJtKSxcbiAgICAgIGlkZiA9IDFcblxuICBpZiAoZG9jdW1lbnRGcmVxdWVuY3kgPiAwKSB7XG4gICAgaWRmID0gMSArIE1hdGgubG9nKHRoaXMuZG9jdW1lbnRTdG9yZS5sZW5ndGggLyBkb2N1bWVudEZyZXF1ZW5jeSlcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9pZGZDYWNoZVtjYWNoZUtleV0gPSBpZGZcbn1cblxuLyoqXG4gKiBTZWFyY2hlcyB0aGUgaW5kZXggdXNpbmcgdGhlIHBhc3NlZCBxdWVyeS5cbiAqXG4gKiBRdWVyaWVzIHNob3VsZCBiZSBhIHN0cmluZywgbXVsdGlwbGUgd29yZHMgYXJlIGFsbG93ZWQgYW5kIHdpbGwgbGVhZCB0byBhblxuICogQU5EIGJhc2VkIHF1ZXJ5LCBlLmcuIGBpZHguc2VhcmNoKCdmb28gYmFyJylgIHdpbGwgcnVuIGEgc2VhcmNoIGZvclxuICogZG9jdW1lbnRzIGNvbnRhaW5pbmcgYm90aCAnZm9vJyBhbmQgJ2JhcicuXG4gKlxuICogQWxsIHF1ZXJ5IHRva2VucyBhcmUgcGFzc2VkIHRocm91Z2ggdGhlIHNhbWUgcGlwZWxpbmUgdGhhdCBkb2N1bWVudCB0b2tlbnNcbiAqIGFyZSBwYXNzZWQgdGhyb3VnaCwgc28gYW55IGxhbmd1YWdlIHByb2Nlc3NpbmcgaW52b2x2ZWQgd2lsbCBiZSBydW4gb24gZXZlcnlcbiAqIHF1ZXJ5IHRlcm0uXG4gKlxuICogRWFjaCBxdWVyeSB0ZXJtIGlzIGV4cGFuZGVkLCBzbyB0aGF0IHRoZSB0ZXJtICdoZScgbWlnaHQgYmUgZXhwYW5kZWQgdG9cbiAqICdoZWxsbycgYW5kICdoZWxwJyBpZiB0aG9zZSB0ZXJtcyB3ZXJlIGFscmVhZHkgaW5jbHVkZWQgaW4gdGhlIGluZGV4LlxuICpcbiAqIE1hdGNoaW5nIGRvY3VtZW50cyBhcmUgcmV0dXJuZWQgYXMgYW4gYXJyYXkgb2Ygb2JqZWN0cywgZWFjaCBvYmplY3QgY29udGFpbnNcbiAqIHRoZSBtYXRjaGluZyBkb2N1bWVudCByZWYsIGFzIHNldCBmb3IgdGhpcyBpbmRleCwgYW5kIHRoZSBzaW1pbGFyaXR5IHNjb3JlXG4gKiBmb3IgdGhpcyBkb2N1bWVudCBhZ2FpbnN0IHRoZSBxdWVyeS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCB0aGUgaW5kZXggd2l0aC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5pZGZcbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLmRvY3VtZW50VmVjdG9yXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gIHZhciBxdWVyeVRva2VucyA9IHRoaXMucGlwZWxpbmUucnVuKHRoaXMudG9rZW5pemVyRm4ocXVlcnkpKSxcbiAgICAgIHF1ZXJ5VmVjdG9yID0gbmV3IGx1bnIuVmVjdG9yLFxuICAgICAgZG9jdW1lbnRTZXRzID0gW10sXG4gICAgICBmaWVsZEJvb3N0cyA9IHRoaXMuX2ZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGYpIHsgcmV0dXJuIG1lbW8gKyBmLmJvb3N0IH0sIDApXG5cbiAgdmFyIGhhc1NvbWVUb2tlbiA9IHF1ZXJ5VG9rZW5zLnNvbWUoZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5TdG9yZS5oYXModG9rZW4pXG4gIH0sIHRoaXMpXG5cbiAgaWYgKCFoYXNTb21lVG9rZW4pIHJldHVybiBbXVxuXG4gIHF1ZXJ5VG9rZW5zXG4gICAgLmZvckVhY2goZnVuY3Rpb24gKHRva2VuLCBpLCB0b2tlbnMpIHtcbiAgICAgIHZhciB0ZiA9IDEgLyB0b2tlbnMubGVuZ3RoICogdGhpcy5fZmllbGRzLmxlbmd0aCAqIGZpZWxkQm9vc3RzLFxuICAgICAgICAgIHNlbGYgPSB0aGlzXG5cbiAgICAgIHZhciBzZXQgPSB0aGlzLnRva2VuU3RvcmUuZXhwYW5kKHRva2VuKS5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGtleSkge1xuICAgICAgICB2YXIgcG9zID0gc2VsZi5jb3JwdXNUb2tlbnMuaW5kZXhPZihrZXkpLFxuICAgICAgICAgICAgaWRmID0gc2VsZi5pZGYoa2V5KSxcbiAgICAgICAgICAgIHNpbWlsYXJpdHlCb29zdCA9IDEsXG4gICAgICAgICAgICBzZXQgPSBuZXcgbHVuci5Tb3J0ZWRTZXRcblxuICAgICAgICAvLyBpZiB0aGUgZXhwYW5kZWQga2V5IGlzIG5vdCBhbiBleGFjdCBtYXRjaCB0byB0aGUgdG9rZW4gdGhlblxuICAgICAgICAvLyBwZW5hbGlzZSB0aGUgc2NvcmUgZm9yIHRoaXMga2V5IGJ5IGhvdyBkaWZmZXJlbnQgdGhlIGtleSBpc1xuICAgICAgICAvLyB0byB0aGUgdG9rZW4uXG4gICAgICAgIGlmIChrZXkgIT09IHRva2VuKSB7XG4gICAgICAgICAgdmFyIGRpZmYgPSBNYXRoLm1heCgzLCBrZXkubGVuZ3RoIC0gdG9rZW4ubGVuZ3RoKVxuICAgICAgICAgIHNpbWlsYXJpdHlCb29zdCA9IDEgLyBNYXRoLmxvZyhkaWZmKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBxdWVyeSB0Zi1pZGYgc2NvcmUgZm9yIHRoaXMgdG9rZW5cbiAgICAgICAgLy8gYXBwbHlpbmcgYW4gc2ltaWxhcml0eUJvb3N0IHRvIGVuc3VyZSBleGFjdCBtYXRjaGVzXG4gICAgICAgIC8vIHRoZXNlIHJhbmsgaGlnaGVyIHRoYW4gZXhwYW5kZWQgdGVybXNcbiAgICAgICAgaWYgKHBvcyA+IC0xKSBxdWVyeVZlY3Rvci5pbnNlcnQocG9zLCB0ZiAqIGlkZiAqIHNpbWlsYXJpdHlCb29zdClcblxuICAgICAgICAvLyBhZGQgYWxsIHRoZSBkb2N1bWVudHMgdGhhdCBoYXZlIHRoaXMga2V5IGludG8gYSBzZXRcbiAgICAgICAgLy8gZW5zdXJpbmcgdGhhdCB0aGUgdHlwZSBvZiBrZXkgaXMgcHJlc2VydmVkXG4gICAgICAgIHZhciBtYXRjaGluZ0RvY3VtZW50cyA9IHNlbGYudG9rZW5TdG9yZS5nZXQoa2V5KSxcbiAgICAgICAgICAgIHJlZnMgPSBPYmplY3Qua2V5cyhtYXRjaGluZ0RvY3VtZW50cyksXG4gICAgICAgICAgICByZWZzTGVuID0gcmVmcy5sZW5ndGhcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZnNMZW47IGkrKykge1xuICAgICAgICAgIHNldC5hZGQobWF0Y2hpbmdEb2N1bWVudHNbcmVmc1tpXV0ucmVmKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lbW8udW5pb24oc2V0KVxuICAgICAgfSwgbmV3IGx1bnIuU29ydGVkU2V0KVxuXG4gICAgICBkb2N1bWVudFNldHMucHVzaChzZXQpXG4gICAgfSwgdGhpcylcblxuICB2YXIgZG9jdW1lbnRTZXQgPSBkb2N1bWVudFNldHMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBzZXQpIHtcbiAgICByZXR1cm4gbWVtby5pbnRlcnNlY3Qoc2V0KVxuICB9KVxuXG4gIHJldHVybiBkb2N1bWVudFNldFxuICAgIC5tYXAoZnVuY3Rpb24gKHJlZikge1xuICAgICAgcmV0dXJuIHsgcmVmOiByZWYsIHNjb3JlOiBxdWVyeVZlY3Rvci5zaW1pbGFyaXR5KHRoaXMuZG9jdW1lbnRWZWN0b3IocmVmKSkgfVxuICAgIH0sIHRoaXMpXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZVxuICAgIH0pXG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgdmVjdG9yIGNvbnRhaW5pbmcgYWxsIHRoZSB0b2tlbnMgaW4gdGhlIGRvY3VtZW50IG1hdGNoaW5nIHRoZVxuICogcGFzc2VkIGRvY3VtZW50UmVmLlxuICpcbiAqIFRoZSB2ZWN0b3IgY29udGFpbnMgdGhlIHRmLWlkZiBzY29yZSBmb3IgZWFjaCB0b2tlbiBjb250YWluZWQgaW4gdGhlXG4gKiBkb2N1bWVudCB3aXRoIHRoZSBwYXNzZWQgZG9jdW1lbnRSZWYuICBUaGUgdmVjdG9yIHdpbGwgY29udGFpbiBhbiBlbGVtZW50XG4gKiBmb3IgZXZlcnkgdG9rZW4gaW4gdGhlIGluZGV4ZXMgY29ycHVzLCBpZiB0aGUgZG9jdW1lbnQgZG9lcyBub3QgY29udGFpbiB0aGF0XG4gKiB0b2tlbiB0aGUgZWxlbWVudCB3aWxsIGJlIDAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRvY3VtZW50UmVmIFRoZSByZWYgdG8gZmluZCB0aGUgZG9jdW1lbnQgd2l0aC5cbiAqIEByZXR1cm5zIHtsdW5yLlZlY3Rvcn1cbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuZG9jdW1lbnRWZWN0b3IgPSBmdW5jdGlvbiAoZG9jdW1lbnRSZWYpIHtcbiAgdmFyIGRvY3VtZW50VG9rZW5zID0gdGhpcy5kb2N1bWVudFN0b3JlLmdldChkb2N1bWVudFJlZiksXG4gICAgICBkb2N1bWVudFRva2Vuc0xlbmd0aCA9IGRvY3VtZW50VG9rZW5zLmxlbmd0aCxcbiAgICAgIGRvY3VtZW50VmVjdG9yID0gbmV3IGx1bnIuVmVjdG9yXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2N1bWVudFRva2Vuc0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gZG9jdW1lbnRUb2tlbnMuZWxlbWVudHNbaV0sXG4gICAgICAgIHRmID0gdGhpcy50b2tlblN0b3JlLmdldCh0b2tlbilbZG9jdW1lbnRSZWZdLnRmLFxuICAgICAgICBpZGYgPSB0aGlzLmlkZih0b2tlbilcblxuICAgIGRvY3VtZW50VmVjdG9yLmluc2VydCh0aGlzLmNvcnB1c1Rva2Vucy5pbmRleE9mKHRva2VuKSwgdGYgKiBpZGYpXG4gIH07XG5cbiAgcmV0dXJuIGRvY3VtZW50VmVjdG9yXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbmRleCByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiBsdW5yLnZlcnNpb24sXG4gICAgZmllbGRzOiB0aGlzLl9maWVsZHMsXG4gICAgcmVmOiB0aGlzLl9yZWYsXG4gICAgdG9rZW5pemVyOiB0aGlzLnRva2VuaXplckZuLmxhYmVsLFxuICAgIGRvY3VtZW50U3RvcmU6IHRoaXMuZG9jdW1lbnRTdG9yZS50b0pTT04oKSxcbiAgICB0b2tlblN0b3JlOiB0aGlzLnRva2VuU3RvcmUudG9KU09OKCksXG4gICAgY29ycHVzVG9rZW5zOiB0aGlzLmNvcnB1c1Rva2Vucy50b0pTT04oKSxcbiAgICBwaXBlbGluZTogdGhpcy5waXBlbGluZS50b0pTT04oKVxuICB9XG59XG5cbi8qKlxuICogQXBwbGllcyBhIHBsdWdpbiB0byB0aGUgY3VycmVudCBpbmRleC5cbiAqXG4gKiBBIHBsdWdpbiBpcyBhIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdpdGggdGhlIGluZGV4IGFzIGl0cyBjb250ZXh0LlxuICogUGx1Z2lucyBjYW4gYmUgdXNlZCB0byBjdXN0b21pc2Ugb3IgZXh0ZW5kIHRoZSBiZWhhdmlvdXIgdGhlIGluZGV4XG4gKiBpbiBzb21lIHdheS4gQSBwbHVnaW4gaXMganVzdCBhIGZ1bmN0aW9uLCB0aGF0IGVuY2Fwc3VsYXRlZCB0aGUgY3VzdG9tXG4gKiBiZWhhdmlvdXIgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgaW5kZXguXG4gKlxuICogVGhlIHBsdWdpbiBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBpbmRleCBhcyBpdHMgYXJndW1lbnQsIGFkZGl0aW9uYWxcbiAqIGFyZ3VtZW50cyBjYW4gYWxzbyBiZSBwYXNzZWQgd2hlbiBjYWxsaW5nIHVzZS4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkXG4gKiB3aXRoIHRoZSBpbmRleCBhcyBpdHMgY29udGV4dC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICB2YXIgbXlQbHVnaW4gPSBmdW5jdGlvbiAoaWR4LCBhcmcxLCBhcmcyKSB7XG4gKiAgICAgICAvLyBgdGhpc2AgaXMgdGhlIGluZGV4IHRvIGJlIGV4dGVuZGVkXG4gKiAgICAgICAvLyBhcHBseSBhbnkgZXh0ZW5zaW9ucyBldGMgaGVyZS5cbiAqICAgICB9XG4gKlxuICogICAgIHZhciBpZHggPSBsdW5yKGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHRoaXMudXNlKG15UGx1Z2luLCAnYXJnMScsICdhcmcyJylcbiAqICAgICB9KVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBsdWdpbiBUaGUgcGx1Z2luIHRvIGFwcGx5LlxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gIGFyZ3MudW5zaGlmdCh0aGlzKVxuICBwbHVnaW4uYXBwbHkodGhpcywgYXJncylcbn1cbi8qIVxuICogbHVuci5TdG9yZVxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5TdG9yZSBpcyBhIHNpbXBsZSBrZXktdmFsdWUgc3RvcmUgdXNlZCBmb3Igc3RvcmluZyBzZXRzIG9mIHRva2VucyBmb3JcbiAqIGRvY3VtZW50cyBzdG9yZWQgaW4gaW5kZXguXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAbW9kdWxlXG4gKi9cbmx1bnIuU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc3RvcmUgPSB7fVxuICB0aGlzLmxlbmd0aCA9IDBcbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBzdG9yZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCBzdG9yZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuU3RvcmV9XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIHZhciBzdG9yZSA9IG5ldyB0aGlzXG5cbiAgc3RvcmUubGVuZ3RoID0gc2VyaWFsaXNlZERhdGEubGVuZ3RoXG4gIHN0b3JlLnN0b3JlID0gT2JqZWN0LmtleXMoc2VyaWFsaXNlZERhdGEuc3RvcmUpLnJlZHVjZShmdW5jdGlvbiAobWVtbywga2V5KSB7XG4gICAgbWVtb1trZXldID0gbHVuci5Tb3J0ZWRTZXQubG9hZChzZXJpYWxpc2VkRGF0YS5zdG9yZVtrZXldKVxuICAgIHJldHVybiBtZW1vXG4gIH0sIHt9KVxuXG4gIHJldHVybiBzdG9yZVxufVxuXG4vKipcbiAqIFN0b3JlcyB0aGUgZ2l2ZW4gdG9rZW5zIGluIHRoZSBzdG9yZSBhZ2FpbnN0IHRoZSBnaXZlbiBpZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGtleSB1c2VkIHRvIHN0b3JlIHRoZSB0b2tlbnMgYWdhaW5zdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbnMgVGhlIHRva2VucyB0byBzdG9yZSBhZ2FpbnN0IHRoZSBrZXkuXG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGlkLCB0b2tlbnMpIHtcbiAgaWYgKCF0aGlzLmhhcyhpZCkpIHRoaXMubGVuZ3RoKytcbiAgdGhpcy5zdG9yZVtpZF0gPSB0b2tlbnNcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIHRva2VucyBmcm9tIHRoZSBzdG9yZSBmb3IgYSBnaXZlbiBrZXkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGlkIFRoZSBrZXkgdG8gbG9va3VwIGFuZCByZXRyaWV2ZSBmcm9tIHRoZSBzdG9yZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiB0aGlzLnN0b3JlW2lkXVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBzdG9yZSBjb250YWlucyBhIGtleS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGlkIHRvIGxvb2sgdXAgaW4gdGhlIHN0b3JlLlxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBpZCBpbiB0aGlzLnN0b3JlXG59XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgdmFsdWUgZm9yIGEga2V5IGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGlkIHRvIHJlbW92ZSBmcm9tIHRoZSBzdG9yZS5cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgaWYgKCF0aGlzLmhhcyhpZCkpIHJldHVyblxuXG4gIGRlbGV0ZSB0aGlzLnN0b3JlW2lkXVxuICB0aGlzLmxlbmd0aC0tXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzdG9yZSByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICBsZW5ndGg6IHRoaXMubGVuZ3RoXG4gIH1cbn1cblxuLyohXG4gKiBsdW5yLnN0ZW1tZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqIEluY2x1ZGVzIGNvZGUgZnJvbSAtIGh0dHA6Ly90YXJ0YXJ1cy5vcmcvfm1hcnRpbi9Qb3J0ZXJTdGVtbWVyL2pzLnR4dFxuICovXG5cbi8qKlxuICogbHVuci5zdGVtbWVyIGlzIGFuIGVuZ2xpc2ggbGFuZ3VhZ2Ugc3RlbW1lciwgdGhpcyBpcyBhIEphdmFTY3JpcHRcbiAqIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQb3J0ZXJTdGVtbWVyIHRha2VuIGZyb20gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIHN0ZW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci5zdGVtbWVyID0gKGZ1bmN0aW9uKCl7XG4gIHZhciBzdGVwMmxpc3QgPSB7XG4gICAgICBcImF0aW9uYWxcIiA6IFwiYXRlXCIsXG4gICAgICBcInRpb25hbFwiIDogXCJ0aW9uXCIsXG4gICAgICBcImVuY2lcIiA6IFwiZW5jZVwiLFxuICAgICAgXCJhbmNpXCIgOiBcImFuY2VcIixcbiAgICAgIFwiaXplclwiIDogXCJpemVcIixcbiAgICAgIFwiYmxpXCIgOiBcImJsZVwiLFxuICAgICAgXCJhbGxpXCIgOiBcImFsXCIsXG4gICAgICBcImVudGxpXCIgOiBcImVudFwiLFxuICAgICAgXCJlbGlcIiA6IFwiZVwiLFxuICAgICAgXCJvdXNsaVwiIDogXCJvdXNcIixcbiAgICAgIFwiaXphdGlvblwiIDogXCJpemVcIixcbiAgICAgIFwiYXRpb25cIiA6IFwiYXRlXCIsXG4gICAgICBcImF0b3JcIiA6IFwiYXRlXCIsXG4gICAgICBcImFsaXNtXCIgOiBcImFsXCIsXG4gICAgICBcIml2ZW5lc3NcIiA6IFwiaXZlXCIsXG4gICAgICBcImZ1bG5lc3NcIiA6IFwiZnVsXCIsXG4gICAgICBcIm91c25lc3NcIiA6IFwib3VzXCIsXG4gICAgICBcImFsaXRpXCIgOiBcImFsXCIsXG4gICAgICBcIml2aXRpXCIgOiBcIml2ZVwiLFxuICAgICAgXCJiaWxpdGlcIiA6IFwiYmxlXCIsXG4gICAgICBcImxvZ2lcIiA6IFwibG9nXCJcbiAgICB9LFxuXG4gICAgc3RlcDNsaXN0ID0ge1xuICAgICAgXCJpY2F0ZVwiIDogXCJpY1wiLFxuICAgICAgXCJhdGl2ZVwiIDogXCJcIixcbiAgICAgIFwiYWxpemVcIiA6IFwiYWxcIixcbiAgICAgIFwiaWNpdGlcIiA6IFwiaWNcIixcbiAgICAgIFwiaWNhbFwiIDogXCJpY1wiLFxuICAgICAgXCJmdWxcIiA6IFwiXCIsXG4gICAgICBcIm5lc3NcIiA6IFwiXCJcbiAgICB9LFxuXG4gICAgYyA9IFwiW15hZWlvdV1cIiwgICAgICAgICAgLy8gY29uc29uYW50XG4gICAgdiA9IFwiW2FlaW91eV1cIiwgICAgICAgICAgLy8gdm93ZWxcbiAgICBDID0gYyArIFwiW15hZWlvdXldKlwiLCAgICAvLyBjb25zb25hbnQgc2VxdWVuY2VcbiAgICBWID0gdiArIFwiW2FlaW91XSpcIiwgICAgICAvLyB2b3dlbCBzZXF1ZW5jZVxuXG4gICAgbWdyMCA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQywgICAgICAgICAgICAgICAvLyBbQ11WQy4uLiBpcyBtPjBcbiAgICBtZXExID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDICsgXCIoXCIgKyBWICsgXCIpPyRcIiwgIC8vIFtDXVZDW1ZdIGlzIG09MVxuICAgIG1ncjEgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgViArIEMgKyBWICsgQywgICAgICAgLy8gW0NdVkNWQy4uLiBpcyBtPjFcbiAgICBzX3YgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgdjsgICAgICAgICAgICAgICAgICAgLy8gdm93ZWwgaW4gc3RlbVxuXG4gIHZhciByZV9tZ3IwID0gbmV3IFJlZ0V4cChtZ3IwKTtcbiAgdmFyIHJlX21ncjEgPSBuZXcgUmVnRXhwKG1ncjEpO1xuICB2YXIgcmVfbWVxMSA9IG5ldyBSZWdFeHAobWVxMSk7XG4gIHZhciByZV9zX3YgPSBuZXcgUmVnRXhwKHNfdik7XG5cbiAgdmFyIHJlXzFhID0gL14oLis/KShzc3xpKWVzJC87XG4gIHZhciByZTJfMWEgPSAvXiguKz8pKFtec10pcyQvO1xuICB2YXIgcmVfMWIgPSAvXiguKz8pZWVkJC87XG4gIHZhciByZTJfMWIgPSAvXiguKz8pKGVkfGluZykkLztcbiAgdmFyIHJlXzFiXzIgPSAvLiQvO1xuICB2YXIgcmUyXzFiXzIgPSAvKGF0fGJsfGl6KSQvO1xuICB2YXIgcmUzXzFiXzIgPSBuZXcgUmVnRXhwKFwiKFteYWVpb3V5bHN6XSlcXFxcMSRcIik7XG4gIHZhciByZTRfMWJfMiA9IG5ldyBSZWdFeHAoXCJeXCIgKyBDICsgdiArIFwiW15hZWlvdXd4eV0kXCIpO1xuXG4gIHZhciByZV8xYyA9IC9eKC4rP1teYWVpb3VdKXkkLztcbiAgdmFyIHJlXzIgPSAvXiguKz8pKGF0aW9uYWx8dGlvbmFsfGVuY2l8YW5jaXxpemVyfGJsaXxhbGxpfGVudGxpfGVsaXxvdXNsaXxpemF0aW9ufGF0aW9ufGF0b3J8YWxpc218aXZlbmVzc3xmdWxuZXNzfG91c25lc3N8YWxpdGl8aXZpdGl8YmlsaXRpfGxvZ2kpJC87XG5cbiAgdmFyIHJlXzMgPSAvXiguKz8pKGljYXRlfGF0aXZlfGFsaXplfGljaXRpfGljYWx8ZnVsfG5lc3MpJC87XG5cbiAgdmFyIHJlXzQgPSAvXiguKz8pKGFsfGFuY2V8ZW5jZXxlcnxpY3xhYmxlfGlibGV8YW50fGVtZW50fG1lbnR8ZW50fG91fGlzbXxhdGV8aXRpfG91c3xpdmV8aXplKSQvO1xuICB2YXIgcmUyXzQgPSAvXiguKz8pKHN8dCkoaW9uKSQvO1xuXG4gIHZhciByZV81ID0gL14oLis/KWUkLztcbiAgdmFyIHJlXzVfMSA9IC9sbCQvO1xuICB2YXIgcmUzXzUgPSBuZXcgUmVnRXhwKFwiXlwiICsgQyArIHYgKyBcIlteYWVpb3V3eHldJFwiKTtcblxuICB2YXIgcG9ydGVyU3RlbW1lciA9IGZ1bmN0aW9uIHBvcnRlclN0ZW1tZXIodykge1xuICAgIHZhciAgIHN0ZW0sXG4gICAgICBzdWZmaXgsXG4gICAgICBmaXJzdGNoLFxuICAgICAgcmUsXG4gICAgICByZTIsXG4gICAgICByZTMsXG4gICAgICByZTQ7XG5cbiAgICBpZiAody5sZW5ndGggPCAzKSB7IHJldHVybiB3OyB9XG5cbiAgICBmaXJzdGNoID0gdy5zdWJzdHIoMCwxKTtcbiAgICBpZiAoZmlyc3RjaCA9PSBcInlcIikge1xuICAgICAgdyA9IGZpcnN0Y2gudG9VcHBlckNhc2UoKSArIHcuc3Vic3RyKDEpO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMWFcbiAgICByZSA9IHJlXzFhXG4gICAgcmUyID0gcmUyXzFhO1xuXG4gICAgaWYgKHJlLnRlc3QodykpIHsgdyA9IHcucmVwbGFjZShyZSxcIiQxJDJcIik7IH1cbiAgICBlbHNlIGlmIChyZTIudGVzdCh3KSkgeyB3ID0gdy5yZXBsYWNlKHJlMixcIiQxJDJcIik7IH1cblxuICAgIC8vIFN0ZXAgMWJcbiAgICByZSA9IHJlXzFiO1xuICAgIHJlMiA9IHJlMl8xYjtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KGZwWzFdKSkge1xuICAgICAgICByZSA9IHJlXzFiXzI7XG4gICAgICAgIHcgPSB3LnJlcGxhY2UocmUsXCJcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZTIudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUyLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZTIgPSByZV9zX3Y7XG4gICAgICBpZiAocmUyLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICAgIHJlMiA9IHJlMl8xYl8yO1xuICAgICAgICByZTMgPSByZTNfMWJfMjtcbiAgICAgICAgcmU0ID0gcmU0XzFiXzI7XG4gICAgICAgIGlmIChyZTIudGVzdCh3KSkgeyAgdyA9IHcgKyBcImVcIjsgfVxuICAgICAgICBlbHNlIGlmIChyZTMudGVzdCh3KSkgeyByZSA9IHJlXzFiXzI7IHcgPSB3LnJlcGxhY2UocmUsXCJcIik7IH1cbiAgICAgICAgZWxzZSBpZiAocmU0LnRlc3QodykpIHsgdyA9IHcgKyBcImVcIjsgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgMWMgLSByZXBsYWNlIHN1ZmZpeCB5IG9yIFkgYnkgaSBpZiBwcmVjZWRlZCBieSBhIG5vbi12b3dlbCB3aGljaCBpcyBub3QgdGhlIGZpcnN0IGxldHRlciBvZiB0aGUgd29yZCAoc28gY3J5IC0+IGNyaSwgYnkgLT4gYnksIHNheSAtPiBzYXkpXG4gICAgcmUgPSByZV8xYztcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHcgPSBzdGVtICsgXCJpXCI7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAyXG4gICAgcmUgPSByZV8yO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgc3VmZml4ID0gZnBbMl07XG4gICAgICByZSA9IHJlX21ncjA7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbSArIHN0ZXAybGlzdFtzdWZmaXhdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgM1xuICAgIHJlID0gcmVfMztcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHN1ZmZpeCA9IGZwWzJdO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW0gKyBzdGVwM2xpc3Rbc3VmZml4XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDRcbiAgICByZSA9IHJlXzQ7XG4gICAgcmUyID0gcmUyXzQ7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZSA9IHJlX21ncjE7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZTIuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXSArIGZwWzJdO1xuICAgICAgcmUyID0gcmVfbWdyMTtcbiAgICAgIGlmIChyZTIudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDVcbiAgICByZSA9IHJlXzU7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZSA9IHJlX21ncjE7XG4gICAgICByZTIgPSByZV9tZXExO1xuICAgICAgcmUzID0gcmUzXzU7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSB8fCAocmUyLnRlc3Qoc3RlbSkgJiYgIShyZTMudGVzdChzdGVtKSkpKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlID0gcmVfNV8xO1xuICAgIHJlMiA9IHJlX21ncjE7XG4gICAgaWYgKHJlLnRlc3QodykgJiYgcmUyLnRlc3QodykpIHtcbiAgICAgIHJlID0gcmVfMWJfMjtcbiAgICAgIHcgPSB3LnJlcGxhY2UocmUsXCJcIik7XG4gICAgfVxuXG4gICAgLy8gYW5kIHR1cm4gaW5pdGlhbCBZIGJhY2sgdG8geVxuXG4gICAgaWYgKGZpcnN0Y2ggPT0gXCJ5XCIpIHtcbiAgICAgIHcgPSBmaXJzdGNoLnRvTG93ZXJDYXNlKCkgKyB3LnN1YnN0cigxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdztcbiAgfTtcblxuICByZXR1cm4gcG9ydGVyU3RlbW1lcjtcbn0pKCk7XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnN0ZW1tZXIsICdzdGVtbWVyJylcbi8qIVxuICogbHVuci5zdG9wV29yZEZpbHRlclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyIGJ1aWxkcyBhIHN0b3BXb3JkRmlsdGVyIGZ1bmN0aW9uIGZyb20gdGhlIHByb3ZpZGVkXG4gKiBsaXN0IG9mIHN0b3Agd29yZHMuXG4gKlxuICogVGhlIGJ1aWx0IGluIGx1bnIuc3RvcFdvcmRGaWx0ZXIgaXMgYnVpbHQgdXNpbmcgdGhpcyBnZW5lcmF0b3IgYW5kIGNhbiBiZSB1c2VkXG4gKiB0byBnZW5lcmF0ZSBjdXN0b20gc3RvcFdvcmRGaWx0ZXJzIGZvciBhcHBsaWNhdGlvbnMgb3Igbm9uIEVuZ2xpc2ggbGFuZ3VhZ2VzLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7QXJyYXl9IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICogQHNlZSBsdW5yLlBpcGVsaW5lXG4gKiBAc2VlIGx1bnIuc3RvcFdvcmRGaWx0ZXJcbiAqL1xubHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyID0gZnVuY3Rpb24gKHN0b3BXb3Jkcykge1xuICB2YXIgd29yZHMgPSBzdG9wV29yZHMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBzdG9wV29yZCkge1xuICAgIG1lbW9bc3RvcFdvcmRdID0gc3RvcFdvcmRcbiAgICByZXR1cm4gbWVtb1xuICB9LCB7fSlcblxuICByZXR1cm4gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgaWYgKHRva2VuICYmIHdvcmRzW3Rva2VuXSAhPT0gdG9rZW4pIHJldHVybiB0b2tlblxuICB9XG59XG5cbi8qKlxuICogbHVuci5zdG9wV29yZEZpbHRlciBpcyBhbiBFbmdsaXNoIGxhbmd1YWdlIHN0b3Agd29yZCBsaXN0IGZpbHRlciwgYW55IHdvcmRzXG4gKiBjb250YWluZWQgaW4gdGhlIGxpc3Qgd2lsbCBub3QgYmUgcGFzc2VkIHRocm91Z2ggdGhlIGZpbHRlci5cbiAqXG4gKiBUaGlzIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgaW4gdGhlIFBpcGVsaW5lLiBJZiB0aGUgdG9rZW4gZG9lcyBub3QgcGFzcyB0aGVcbiAqIGZpbHRlciB0aGVuIHVuZGVmaW5lZCB3aWxsIGJlIHJldHVybmVkLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci5zdG9wV29yZEZpbHRlciA9IGx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlcihbXG4gICdhJyxcbiAgJ2FibGUnLFxuICAnYWJvdXQnLFxuICAnYWNyb3NzJyxcbiAgJ2FmdGVyJyxcbiAgJ2FsbCcsXG4gICdhbG1vc3QnLFxuICAnYWxzbycsXG4gICdhbScsXG4gICdhbW9uZycsXG4gICdhbicsXG4gICdhbmQnLFxuICAnYW55JyxcbiAgJ2FyZScsXG4gICdhcycsXG4gICdhdCcsXG4gICdiZScsXG4gICdiZWNhdXNlJyxcbiAgJ2JlZW4nLFxuICAnYnV0JyxcbiAgJ2J5JyxcbiAgJ2NhbicsXG4gICdjYW5ub3QnLFxuICAnY291bGQnLFxuICAnZGVhcicsXG4gICdkaWQnLFxuICAnZG8nLFxuICAnZG9lcycsXG4gICdlaXRoZXInLFxuICAnZWxzZScsXG4gICdldmVyJyxcbiAgJ2V2ZXJ5JyxcbiAgJ2ZvcicsXG4gICdmcm9tJyxcbiAgJ2dldCcsXG4gICdnb3QnLFxuICAnaGFkJyxcbiAgJ2hhcycsXG4gICdoYXZlJyxcbiAgJ2hlJyxcbiAgJ2hlcicsXG4gICdoZXJzJyxcbiAgJ2hpbScsXG4gICdoaXMnLFxuICAnaG93JyxcbiAgJ2hvd2V2ZXInLFxuICAnaScsXG4gICdpZicsXG4gICdpbicsXG4gICdpbnRvJyxcbiAgJ2lzJyxcbiAgJ2l0JyxcbiAgJ2l0cycsXG4gICdqdXN0JyxcbiAgJ2xlYXN0JyxcbiAgJ2xldCcsXG4gICdsaWtlJyxcbiAgJ2xpa2VseScsXG4gICdtYXknLFxuICAnbWUnLFxuICAnbWlnaHQnLFxuICAnbW9zdCcsXG4gICdtdXN0JyxcbiAgJ215JyxcbiAgJ25laXRoZXInLFxuICAnbm8nLFxuICAnbm9yJyxcbiAgJ25vdCcsXG4gICdvZicsXG4gICdvZmYnLFxuICAnb2Z0ZW4nLFxuICAnb24nLFxuICAnb25seScsXG4gICdvcicsXG4gICdvdGhlcicsXG4gICdvdXInLFxuICAnb3duJyxcbiAgJ3JhdGhlcicsXG4gICdzYWlkJyxcbiAgJ3NheScsXG4gICdzYXlzJyxcbiAgJ3NoZScsXG4gICdzaG91bGQnLFxuICAnc2luY2UnLFxuICAnc28nLFxuICAnc29tZScsXG4gICd0aGFuJyxcbiAgJ3RoYXQnLFxuICAndGhlJyxcbiAgJ3RoZWlyJyxcbiAgJ3RoZW0nLFxuICAndGhlbicsXG4gICd0aGVyZScsXG4gICd0aGVzZScsXG4gICd0aGV5JyxcbiAgJ3RoaXMnLFxuICAndGlzJyxcbiAgJ3RvJyxcbiAgJ3RvbycsXG4gICd0d2FzJyxcbiAgJ3VzJyxcbiAgJ3dhbnRzJyxcbiAgJ3dhcycsXG4gICd3ZScsXG4gICd3ZXJlJyxcbiAgJ3doYXQnLFxuICAnd2hlbicsXG4gICd3aGVyZScsXG4gICd3aGljaCcsXG4gICd3aGlsZScsXG4gICd3aG8nLFxuICAnd2hvbScsXG4gICd3aHknLFxuICAnd2lsbCcsXG4gICd3aXRoJyxcbiAgJ3dvdWxkJyxcbiAgJ3lldCcsXG4gICd5b3UnLFxuICAneW91cidcbl0pXG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnN0b3BXb3JkRmlsdGVyLCAnc3RvcFdvcmRGaWx0ZXInKVxuLyohXG4gKiBsdW5yLnRyaW1tZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIudHJpbW1lciBpcyBhIHBpcGVsaW5lIGZ1bmN0aW9uIGZvciB0cmltbWluZyBub24gd29yZFxuICogY2hhcmFjdGVycyBmcm9tIHRoZSBiZWdpbmluZyBhbmQgZW5kIG9mIHRva2VucyBiZWZvcmUgdGhleVxuICogZW50ZXIgdGhlIGluZGV4LlxuICpcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gbWF5IG5vdCB3b3JrIGNvcnJlY3RseSBmb3Igbm9uIGxhdGluXG4gKiBjaGFyYWN0ZXJzIGFuZCBzaG91bGQgZWl0aGVyIGJlIHJlbW92ZWQgb3IgYWRhcHRlZCBmb3IgdXNlXG4gKiB3aXRoIGxhbmd1YWdlcyB3aXRoIG5vbi1sYXRpbiBjaGFyYWN0ZXJzLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci50cmltbWVyID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIHJldHVybiB0b2tlbi5yZXBsYWNlKC9eXFxXKy8sICcnKS5yZXBsYWNlKC9cXFcrJC8sICcnKVxufVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci50cmltbWVyLCAndHJpbW1lcicpXG4vKiFcbiAqIGx1bnIuc3RlbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICogSW5jbHVkZXMgY29kZSBmcm9tIC0gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluL1BvcnRlclN0ZW1tZXIvanMudHh0XG4gKi9cblxuLyoqXG4gKiBsdW5yLlRva2VuU3RvcmUgaXMgdXNlZCBmb3IgZWZmaWNpZW50IHN0b3JpbmcgYW5kIGxvb2t1cCBvZiB0aGUgcmV2ZXJzZVxuICogaW5kZXggb2YgdG9rZW4gdG8gZG9jdW1lbnQgcmVmLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlRva2VuU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucm9vdCA9IHsgZG9jczoge30gfVxuICB0aGlzLmxlbmd0aCA9IDBcbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCB0b2tlbiBzdG9yZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCB0b2tlbiBzdG9yZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuVG9rZW5TdG9yZX1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIHZhciBzdG9yZSA9IG5ldyB0aGlzXG5cbiAgc3RvcmUucm9vdCA9IHNlcmlhbGlzZWREYXRhLnJvb3RcbiAgc3RvcmUubGVuZ3RoID0gc2VyaWFsaXNlZERhdGEubGVuZ3RoXG5cbiAgcmV0dXJuIHN0b3JlXG59XG5cbi8qKlxuICogQWRkcyBhIG5ldyB0b2tlbiBkb2MgcGFpciB0byB0aGUgc3RvcmUuXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIHN0b3JlIHRoZSBkb2MgdW5kZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvYyB0byBzdG9yZSBhZ2FpbnN0IHRoZSB0b2tlblxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydCBsb29raW5nIGZvciB0aGVcbiAqIGNvcnJlY3QgcGxhY2UgdG8gZW50ZXIgdGhlIGRvYywgYnkgZGVmYXVsdCB0aGUgcm9vdCBvZiB0aGlzIGx1bnIuVG9rZW5TdG9yZVxuICogaXMgdXNlZC5cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRva2VuLCBkb2MsIHJvb3QpIHtcbiAgdmFyIHJvb3QgPSByb290IHx8IHRoaXMucm9vdCxcbiAgICAgIGtleSA9IHRva2VuLmNoYXJBdCgwKSxcbiAgICAgIHJlc3QgPSB0b2tlbi5zbGljZSgxKVxuXG4gIGlmICghKGtleSBpbiByb290KSkgcm9vdFtrZXldID0ge2RvY3M6IHt9fVxuXG4gIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJvb3Rba2V5XS5kb2NzW2RvYy5yZWZdID0gZG9jXG4gICAgdGhpcy5sZW5ndGggKz0gMVxuICAgIHJldHVyblxuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmFkZChyZXN0LCBkb2MsIHJvb3Rba2V5XSlcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMga2V5IGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhpcyBsdW5yLlRva2VuU3RvcmUuXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGNoZWNrIGZvclxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydFxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIGZhbHNlXG5cbiAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFub2RlW3Rva2VuLmNoYXJBdChpKV0pIHJldHVybiBmYWxzZVxuXG4gICAgbm9kZSA9IG5vZGVbdG9rZW4uY2hhckF0KGkpXVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBhIG5vZGUgZnJvbSB0aGUgdG9rZW4gc3RvcmUgZm9yIGEgZ2l2ZW4gdG9rZW4uXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGdldCB0aGUgbm9kZSBmb3IuXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0LlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBzZWUgVG9rZW5TdG9yZS5wcm90b3R5cGUuZ2V0XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmdldE5vZGUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIHt9XG5cbiAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFub2RlW3Rva2VuLmNoYXJBdChpKV0pIHJldHVybiB7fVxuXG4gICAgbm9kZSA9IG5vZGVbdG9rZW4uY2hhckF0KGkpXVxuICB9XG5cbiAgcmV0dXJuIG5vZGVcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgZG9jdW1lbnRzIGZvciBhIG5vZGUgZm9yIHRoZSBnaXZlbiB0b2tlbi5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gZ2V0IHRoZSBkb2N1bWVudHMgZm9yLlxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh0b2tlbiwgcm9vdCkge1xuICByZXR1cm4gdGhpcy5nZXROb2RlKHRva2VuLCByb290KS5kb2NzIHx8IHt9XG59XG5cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuY291bnQgPSBmdW5jdGlvbiAodG9rZW4sIHJvb3QpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZ2V0KHRva2VuLCByb290KSkubGVuZ3RoXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkb2N1bWVudCBpZGVudGlmaWVkIGJ5IHJlZiBmcm9tIHRoZSB0b2tlbiBpbiB0aGUgc3RvcmUuXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGdldCB0aGUgZG9jdW1lbnRzIGZvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSByZWYgVGhlIHJlZiBvZiB0aGUgZG9jdW1lbnQgdG8gcmVtb3ZlIGZyb20gdGhpcyB0b2tlbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAodG9rZW4sIHJlZikge1xuICBpZiAoIXRva2VuKSByZXR1cm5cbiAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCEodG9rZW4uY2hhckF0KGkpIGluIG5vZGUpKSByZXR1cm5cbiAgICBub2RlID0gbm9kZVt0b2tlbi5jaGFyQXQoaSldXG4gIH1cblxuICBkZWxldGUgbm9kZS5kb2NzW3JlZl1cbn1cblxuLyoqXG4gKiBGaW5kIGFsbCB0aGUgcG9zc2libGUgc3VmZml4ZXMgb2YgdGhlIHBhc3NlZCB0b2tlbiB1c2luZyB0b2tlbnNcbiAqIGN1cnJlbnRseSBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBleHBhbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmV4cGFuZCA9IGZ1bmN0aW9uICh0b2tlbiwgbWVtbykge1xuICB2YXIgcm9vdCA9IHRoaXMuZ2V0Tm9kZSh0b2tlbiksXG4gICAgICBkb2NzID0gcm9vdC5kb2NzIHx8IHt9LFxuICAgICAgbWVtbyA9IG1lbW8gfHwgW11cblxuICBpZiAoT2JqZWN0LmtleXMoZG9jcykubGVuZ3RoKSBtZW1vLnB1c2godG9rZW4pXG5cbiAgT2JqZWN0LmtleXMocm9vdClcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoa2V5ID09PSAnZG9jcycpIHJldHVyblxuXG4gICAgICBtZW1vLmNvbmNhdCh0aGlzLmV4cGFuZCh0b2tlbiArIGtleSwgbWVtbykpXG4gICAgfSwgdGhpcylcblxuICByZXR1cm4gbWVtb1xufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdG9rZW4gc3RvcmUgcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHJvb3Q6IHRoaXMucm9vdCxcbiAgICBsZW5ndGg6IHRoaXMubGVuZ3RoXG4gIH1cbn1cblxuICAvKipcbiAgICogZXhwb3J0IHRoZSBtb2R1bGUgdmlhIEFNRCwgQ29tbW9uSlMgb3IgYXMgYSBicm93c2VyIGdsb2JhbFxuICAgKiBFeHBvcnQgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvcmV0dXJuRXhwb3J0cy5qc1xuICAgKi9cbiAgOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgIGRlZmluZShmYWN0b3J5KVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAvKipcbiAgICAgICAqIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgICAgICogb25seSBDb21tb25KUy1saWtlIGVudmlyb21lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAqIGxpa2UgTm9kZS5cbiAgICAgICAqL1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICAgIHJvb3QubHVuciA9IGZhY3RvcnkoKVxuICAgIH1cbiAgfSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogSnVzdCByZXR1cm4gYSB2YWx1ZSB0byBkZWZpbmUgdGhlIG1vZHVsZSBleHBvcnQuXG4gICAgICogVGhpcyBleGFtcGxlIHJldHVybnMgYW4gb2JqZWN0LCBidXQgdGhlIG1vZHVsZVxuICAgICAqIGNhbiByZXR1cm4gYSBmdW5jdGlvbiBhcyB0aGUgZXhwb3J0ZWQgdmFsdWUuXG4gICAgICovXG4gICAgcmV0dXJuIGx1bnJcbiAgfSkpXG59KSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9sdW5yL2x1bnIuanMiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBpZiBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXG4gKi9cbmNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSAoZWxlbWVudCwgdmlzaWJsZSkgPT4gKHZpc2libGUgPyBzaG93IDogaGlkZSkoZWxlbWVudCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RyaW5nIGlzIGVtcHR5XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc0VtcHR5ID0gKHRleHQpID0+ICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycpICYmICh0ZXh0Lmxlbmd0aCA9PT0gMCk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWxWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGJhY2sgYnV0dG9uXG4gICAgY29uc3QgYmFja0J1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBiYWNrQnV0dG9uRWxlbWVudC5jbGFzc05hbWUgPSAnYmFjay1idXR0b24gaWNvbi1hcnJvdy10aGljayc7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2Nsb3NlJywgdGhpcywgYmFja0J1dHRvbkVsZW1lbnQpO1xuXG4gICAgLy8gaW1hZ2VcbiAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgdGhpcy5pbWFnZS5jbGFzc05hbWUgPSAnaW1nLXJlc3BvbnNpdmUnO1xuXG4gICAgY29uc3QgaW1hZ2VXcmFwcGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGltYWdlV3JhcHBlckVsZW1lbnQuY2xhc3NOYW1lID0gJ2ltYWdlLXdyYXBwZXInO1xuICAgIGltYWdlV3JhcHBlckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pbWFnZSk7XG5cbiAgICAvLyB0aXRsZVxuICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuXG4gICAgLy8gYXV0aG9yXG4gICAgdGhpcy5hdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmF1dGhvci5jbGFzc05hbWUgPSAnYXV0aG9yJztcbiAgICB0aGlzLmF1dGhvci5pbm5lckhUTUwgPSAnYnkgSm91YmVsJzsgLy8gVE9ETyBNYWtlIGR5bmFtaWNcblxuICAgIC8vIGRlc2NyaXB0aW9uXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uLmNsYXNzTmFtZSA9ICdzbWFsbCc7XG5cbiAgICAvLyBkZW1vIGJ1dHRvblxuICAgIHRoaXMuZGVtb0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB0aGlzLmRlbW9CdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbic7XG4gICAgdGhpcy5kZW1vQnV0dG9uLmlubmVySFRNTCA9ICdDb250ZW50IERlbW8nO1xuICAgIHRoaXMuZGVtb0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcbiAgICBoaWRlKHRoaXMuZGVtb0J1dHRvbik7XG5cbiAgICBjb25zdCB0ZXh0RGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRleHREZXRhaWxzLmNsYXNzTmFtZSA9ICd0ZXh0LWRldGFpbHMnO1xuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMuYXV0aG9yKTtcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLmRlc2NyaXB0aW9uKTtcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLmRlbW9CdXR0b24pO1xuXG4gICAgY29uc3QgZGV0YWlsc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkZXRhaWxzRWxlbWVudC5jbGFzc05hbWUgPSAnY29udGFpbmVyJztcbiAgICBkZXRhaWxzRWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZVdyYXBwZXJFbGVtZW50KTtcbiAgICBkZXRhaWxzRWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0RGV0YWlscyk7XG5cbiAgICAvLyB1c2UgYnV0dG9uXG4gICAgdGhpcy51c2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGhpcy51c2VCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbiBidXR0b24tcHJpbWFyeSc7XG4gICAgdGhpcy51c2VCdXR0b24uaW5uZXJIVE1MID0gJ1VzZSc7XG4gICAgaGlkZSh0aGlzLnVzZUJ1dHRvbik7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHRoaXMsIHRoaXMudXNlQnV0dG9uKTtcblxuICAgIC8vIGluc3RhbGwgYnV0dG9uXG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnknO1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5pbm5lckhUTUwgPSAnSW5zdGFsbCc7XG4gICAgaGlkZSh0aGlzLmluc3RhbGxCdXR0b24pO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdpbnN0YWxsJywgdGhpcywgdGhpcy5pbnN0YWxsQnV0dG9uKTtcblxuICAgIGNvbnN0IGJ1dHRvbkJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJ1dHRvbkJhci5jbGFzc05hbWUgPSAnYnV0dG9uLWJhcic7XG4gICAgYnV0dG9uQmFyLmFwcGVuZENoaWxkKHRoaXMudXNlQnV0dG9uKTtcbiAgICBidXR0b25CYXIuYXBwZW5kQ2hpbGQodGhpcy5pbnN0YWxsQnV0dG9uKTtcblxuICAgIC8vIGxpY2VuY2UgcGFuZWxcbiAgICBjb25zdCBsaWNlbmNlUGFuZWwgPSB0aGlzLmNyZWF0ZVBhbmVsKCdUaGUgTGljZW5jZSBJbmZvJywgJ2lwc3VtIGxvcnVtJywgJ2xpY2VuY2UtcGFuZWwnKTtcbiAgICBjb25zdCBwbHVnaW5zUGFuZWwgPSB0aGlzLmNyZWF0ZVBhbmVsKCdBdmFpbGFibGUgcGx1Z2lucycsICdpcHN1bSBsb3J1bScsICdwbHVnaW5zLXBhbmVsJyk7XG4gICAgY29uc3QgcHVibGlzaGVyUGFuZWwgPSB0aGlzLmNyZWF0ZVBhbmVsKCdQdWJsaXNoZXIgSW5mbycsICdpcHN1bSBsb3J1bScsICdwdWJsaXNoZXItcGFuZWwnKTtcblxuICAgIC8vIHBhbmVsIGdyb3VwXG4gICAgY29uc3QgcGFuZWxHcm91cEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5jbGFzc05hbWUgPSAncGFuZWwtZ3JvdXAnO1xuICAgIHBhbmVsR3JvdXBFbGVtZW50LmFwcGVuZENoaWxkKGxpY2VuY2VQYW5lbCk7XG4gICAgcGFuZWxHcm91cEVsZW1lbnQuYXBwZW5kQ2hpbGQocGx1Z2luc1BhbmVsKTtcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5hcHBlbmRDaGlsZChwdWJsaXNoZXJQYW5lbCk7XG5cbiAgICAvLyBhZGQgcm9vdCBlbGVtZW50XG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChiYWNrQnV0dG9uRWxlbWVudCk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChkZXRhaWxzRWxlbWVudCk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChidXR0b25CYXIpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocGFuZWxHcm91cEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlJZFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZVBhbmVsKHRpdGxlLCBib2R5LCBib2R5SWQpIHtcbiAgICBjb25zdCBoZWFkZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhlYWRlckVsLmNsYXNzTmFtZSA9ICdwYW5lbC1oZWFkZXInO1xuICAgIGhlYWRlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgIGhlYWRlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGJvZHlJZCk7XG4gICAgaGVhZGVyRWwuaW5uZXJIVE1MID0gdGl0bGU7XG5cbiAgICBjb25zdCBib2R5SW5uZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvZHlJbm5lckVsLmNsYXNzTmFtZSA9ICdwYW5lbC1ib2R5LWlubmVyJztcbiAgICBib2R5SW5uZXJFbC5pbm5lckhUTUwgPSBib2R5O1xuXG4gICAgY29uc3QgYm9keUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm9keUVsLmNsYXNzTmFtZSA9ICdwYW5lbC1ib2R5JztcbiAgICBib2R5RWwuaWQgPSBib2R5SWQ7XG4gICAgYm9keUVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGJvZHlFbC5hcHBlbmRDaGlsZChib2R5SW5uZXJFbCk7XG5cbiAgICBjb25zdCBwYW5lbEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFuZWxFbC5jbGFzc05hbWUgPSAncGFuZWwnO1xuICAgIHBhbmVsRWwuYXBwZW5kQ2hpbGQoaGVhZGVyRWwpO1xuICAgIHBhbmVsRWwuYXBwZW5kQ2hpbGQoYm9keUVsKTtcblxuICAgIGluaXRQYW5lbChwYW5lbEVsKTtcblxuICAgIHJldHVybiBwYW5lbEVsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGltYWdlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAgICovXG4gIHNldEltYWdlKHNyYykge1xuICAgIHRoaXMuaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0SWQoaWQpIHtcbiAgICB0aGlzLmluc3RhbGxCdXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGlkKTtcbiAgICB0aGlzLnVzZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKi9cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovXG4gIHNldERlc2NyaXB0aW9uKHRleHQpIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IHRleHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZXhhbXBsZSB1cmxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgc2V0RXhhbXBsZSh1cmwpIHtcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmRlbW9CdXR0b24sICFpc0VtcHR5KHVybCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgaWYgdGhlIGNvbnRlbnQgdHlwZSBpcyBpbnN0YWxsZWRcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBpbnN0YWxsZWRcbiAgICovXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy51c2VCdXR0b24sIGluc3RhbGxlZCk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmluc3RhbGxCdXR0b24sICFpbnN0YWxsZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZURldGFpbFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWRldGFpbC12aWV3XCI7XG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSBcIi4uL2h1Yi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsIHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlRGV0YWlsVmlldyhzdGF0ZSk7XG4gICAgdGhpcy52aWV3Lm9uKCdpbnN0YWxsJywgdGhpcy5pbnN0YWxsLCB0aGlzKTtcblxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ2Nsb3NlJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBsb2FkQnlJZChpZCkge1xuICAgIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICAgaW5zdGFsbCh7aWR9KSB7XG4gICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKVxuICAgICAgIC50aGVuKG1hY2hpbmVOYW1lID0+IHRoaXMuc2VydmljZXMuaW5zdGFsbENvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSlcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiBjb25zb2xlLmRlYnVnKCdUT0RPLCBndWkgdXBkYXRlcycpKVxuICAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGNvbnRlbnQgdHlwZSBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICB1cGRhdGUoY29udGVudFR5cGUpIHtcbiAgICB0aGlzLnZpZXcuc2V0SWQoY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuICAgIHRoaXMudmlldy5zZXRUaXRsZShjb250ZW50VHlwZS50aXRsZSk7XG4gICAgdGhpcy52aWV3LnNldERlc2NyaXB0aW9uKGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uKTtcbiAgICB0aGlzLnZpZXcuc2V0SW1hZ2UoY29udGVudFR5cGUuaWNvbik7XG4gICAgdGhpcy52aWV3LnNldEV4YW1wbGUoY29udGVudFR5cGUuZXhhbXBsZSk7XG4gICAgdGhpcy52aWV3LnNldElzSW5zdGFsbGVkKCEhY29udGVudFR5cGUuaW5zdGFsbGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIHJvb3QgZWxlbWVudFxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1saXN0JztcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHJvd3MgZnJvbSByb290IGVsZW1lbnRcbiAgICovXG4gIHJlbW92ZUFsbFJvd3MoKSB7XG4gICAgaWYodGhpcy5yb290RWxlbWVudCl7XG4gICAgICB3aGlsZSh0aGlzLnJvb3RFbGVtZW50LmZpcnN0Q2hpbGQpe1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMucm9vdEVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSByb3dcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICovXG4gIGFkZFJvdyhjb250ZW50VHlwZSkge1xuICAgIGNvbnN0IHJvdyA9IHRoaXMuY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHRoaXMpO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLCByb3cpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocm93KVxuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgQ29udGVudCBUeXBlIGNvbmZpZ3VyYXRpb24gYW5kIGNyZWF0ZXMgYSByb3cgZG9tXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IHNjb3BlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHNjb3BlKSB7XG4gICAgLy8gcm93IGl0ZW1cbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBlbGVtZW50LmlkID0gYGNvbnRlbnQtdHlwZS0ke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfWA7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG5cbiAgICAvLyBjcmVhdGUgYnV0dG9uIGNvbmZpZ1xuICAgIGNvbnN0IHVzZUJ1dHRvbkNvbmZpZyA9IHsgdGV4dDogJ1VzZScsIGNsczogJ2J1dHRvbi1wcmltYXJ5JyB9O1xuICAgIGNvbnN0IGluc3RhbGxCdXR0b25Db25maWcgPSB7IHRleHQ6ICdpbnN0YWxsJywgY2xzOiAnYnV0dG9uLWludmVyc2UtcHJpbWFyeSd9O1xuICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRlbnRUeXBlLmluc3RhbGxlZCA/ICB1c2VCdXR0b25Db25maWc6IGluc3RhbGxCdXR0b25Db25maWc7XG5cbiAgICAvLyBjcmVhdGUgaHRtbFxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtjb250ZW50VHlwZS5pY29ufVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gJHtidXR0b24uY2xzfVwiIGRhdGEtaWQ9XCIke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfVwiPiR7YnV0dG9uLnRleHR9PC9zcGFuPlxuICAgICAgPGg0PiR7Y29udGVudFR5cGUudGl0bGV9PC9oND5cbiAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPiR7Y29udGVudFR5cGUuc3VtbWFyeX08L2Rpdj5cbiAgIGA7XG5cbiAgICAvLyBoYW5kbGUgdXNlIGJ1dHRvblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1wcmltYXJ5Jyk7XG4gICAgaWYodXNlQnV0dG9uKXtcbiAgICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCBzY29wZSwgdXNlQnV0dG9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVMaXN0VmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtbGlzdC12aWV3XCI7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIFJvdyBzZWxlY3RlZCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogVXBkYXRlIGNvbnRlbnQgdHlwZSBsaXN0IGV2ZW50XG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3Qge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gYWRkIHRoZSB2aWV3XG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVMaXN0VmlldyhzdGF0ZSk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydyb3ctc2VsZWN0ZWQnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZSB0aGlzIGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHRoaXMgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCB3aXRoIG5ldyBjb250ZW50IHR5cGVzXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gICAqL1xuICB1cGRhdGUoY29udGVudFR5cGVzKSB7XG4gICAgdGhpcy52aWV3LnJlbW92ZUFsbFJvd3MoKTtcbiAgICBjb250ZW50VHlwZXMuZm9yRWFjaCh0aGlzLnZpZXcuYWRkUm93LCB0aGlzLnZpZXcpO1xuICAgIHRoaXMuZmlyZSgndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0Jywge30pO1xuICB9XG5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmlld3Mgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJpbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50QnJvd3NlclZpZXcge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xuICAgIGNvbnN0IG1lbnUgPSB0aGlzLmNyZWF0ZU1lbnVFbGVtZW50KCk7XG4gICAgY29uc3QgaW5wdXRHcm91cCA9IHRoaXMuY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQoKTtcblxuICAgIC8vIG1lbnUgZ3JvdXBcbiAgICBjb25zdCBtZW51R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZW51R3JvdXAuY2xhc3NOYW1lID0gJ21lbnUtZ3JvdXAnO1xuICAgIG1lbnVHcm91cC5hcHBlbmRDaGlsZChtZW51KTtcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRHcm91cCk7XG5cbiAgICAvLyByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQobWVudUdyb3VwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbWVudSBpdGVtXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgYWRkTWVudUl0ZW0odGV4dCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnVpdGVtJyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0O1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgnbWVudS1zZWxlY3RlZCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHNldHMgZmlyc3QgdG8gYmUgc2VsZWN0ZWRcbiAgICBpZih0aGlzLm1lbnVCYXJFbGVtZW50LmNoaWxkRWxlbWVudENvdW50IDwgMSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0byBtZW51IGJhclxuICAgIHRoaXMubWVudUJhckVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtZW51IGJhciBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVNZW51RWxlbWVudCgpIHtcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51YmFyJyk7XG4gICAgdGhpcy5tZW51QmFyRWxlbWVudC5jbGFzc05hbWUgPSAnaDVwLW1lbnUnO1xuXG4gICAgY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgIG5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5tZW51QmFyRWxlbWVudCk7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwibWVudS10aXRsZVwiO1xuICAgIHRpdGxlLmlubmVySFRNTCA9IFwiQnJvd3NlIGNvbnRlbnQgdHlwZXNcIjtcblxuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZW51LmNsYXNzTmFtZSA9IFwibWVudVwiO1xuICAgIG1lbnUuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIG1lbnUuYXBwZW5kQ2hpbGQobmF2RWxlbWVudCk7XG5cbiAgICByZXR1cm4gbWVudTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBpbnB1dCBncm91cCB1c2VkIGZvciBzZWFyY2hcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVJbnB1dEdyb3VwRWxlbWVudCgpIHtcbiAgICAvLyBpbnB1dCBmaWVsZFxuICAgIGNvbnN0IGlucHV0RmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0RmllbGQuY2xhc3NOYW1lID0gJ2Zvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtcm91bmRlZCc7XG4gICAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIFwiU2VhcmNoIGZvciBDb250ZW50IFR5cGVzXCIpO1xuICAgIGlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICB0aGlzLmZpcmUoJ3NlYXJjaCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBxdWVyeTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGlucHV0IGJ1dHRvblxuICAgIGNvbnN0IGlucHV0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5wdXRCdXR0b24uY2xhc3NOYW1lID0gJ2lucHV0LWdyb3VwLWFkZG9uIGljb24tc2VhcmNoJztcblxuICAgIC8vIGlucHV0IGdyb3VwXG4gICAgY29uc3QgaW5wdXRHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gJ2lucHV0LWdyb3VwJztcbiAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0RmllbGQpO1xuICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRCdXR0b24pO1xuXG4gICAgcmV0dXJuIGlucHV0R3JvdXA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsImltcG9ydCBDb250ZW50VHlwZVNlY3Rpb25WaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXdcIjtcbmltcG9ydCBTZWFyY2hTZXJ2aWNlIGZyb20gXCIuLi9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZVwiO1xuaW1wb3J0IENvbnRlbnRUeXBlTGlzdCBmcm9tICcuLi9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdCc7XG5pbXBvcnQgQ29udGVudFR5cGVEZXRhaWwgZnJvbSAnLi4vY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsJztcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMvZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb25WaWV3KHN0YXRlKTtcblxuICAgIC8vIGNvbnRyb2xsZXJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZSh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbCA9IG5ldyBDb250ZW50VHlwZURldGFpbCh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XG5cbiAgICAvLyBhZGQgbWVudSBpdGVtc1xuICAgIFsnTXkgQ29udGVudCBUeXBlcycsICdOZXdlc3QnLCAnTW9zdCBQb3B1bGFyJywgJ1JlY29tbWVuZGVkJ11cbiAgICAgIC5mb3JFYWNoKG1lbnVUZXh0ID0+IHRoaXMudmlldy5hZGRNZW51SXRlbShtZW51VGV4dCkpO1xuXG4gICAgLy8gRWxlbWVudCBmb3IgaG9sZGluZyBsaXN0IGFuZCBkZXRhaWxzIHZpZXdzXG4gICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY29udGVudC10eXBlLXNlY3Rpb24nKTtcblxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBzZWN0aW9uO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZUxpc3QuZ2V0RWxlbWVudCgpKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVEZXRhaWwuZ2V0RWxlbWVudCgpKTtcblxuICAgIHRoaXMudmlldy5nZXRFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5yb290RWxlbWVudCk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0J10sIHRoaXMuY29udGVudFR5cGVMaXN0KTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCddLCB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsKTtcblxuICAgIC8vIHJlZ2lzdGVyIGxpc3RlbmVyc1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5zZWFyY2gsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMuYXBwbHlTZWFyY2hGaWx0ZXIsIHRoaXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0Lm9uKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLnNob3dEZXRhaWxWaWV3LCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLm9uKCdjbG9zZScsIHRoaXMuY2xvc2VEZXRhaWxWaWV3LCB0aGlzKTtcblxuICAgIHRoaXMuaW5pdENvbnRlbnRUeXBlTGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3Qgd2l0aCBhIHNlYXJjaFxuICAgKi9cbiAgaW5pdENvbnRlbnRUeXBlTGlzdCgpIHtcbiAgICAvLyBpbml0aWFsaXplIGJ5IHNlYXJjaFxuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goXCJcIilcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmZpcmUoJ2Vycm9yJywgZXJyb3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBhIHNlYXJjaCBhbmQgdXBkYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3RcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XG4gICAqL1xuICBzZWFyY2goe3F1ZXJ5fSkge1xuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2gocXVlcnkpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3VsZCBhcHBseSBhIHNlYXJjaCBmaWx0ZXJcbiAgICovXG4gIGFwcGx5U2VhcmNoRmlsdGVyKCkge1xuICAgIGNvbnNvbGUuZGVidWcoJ0NvbnRlbnRUeXBlU2VjdGlvbjogbWVudSB3YXMgY2xpY2tlZCEnLCBldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgZGV0YWlsIHZpZXdcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzaG93RGV0YWlsVmlldyh7aWR9KSB7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwubG9hZEJ5SWQoaWQpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuc2hvdygpO1xuICB9XG5cblxuICAvKipcbiAgICogQ2xvc2UgZGV0YWlsIHZpZXdcbiAgICovXG4gIGNsb3NlRGV0YWlsVmlldygpIHtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwiaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiXG5pbXBvcnQgaW5pdFRhYlBhbmVsIGZyb20gXCJjb21wb25lbnRzL3RhYi1wYW5lbFwiXG5pbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBhdHRyaWJ1dGVFcXVhbHMsIGdldEF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi91dGlscy9ldmVudHMnO1xuLyoqXG4gKiBUYWIgY2hhbmdlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyN0YWItY2hhbmdlXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIFBhbmVsIG9wZW4gb3IgY2xvc2UgZXZlbnRcbiAqIEBldmVudCBIdWJWaWV3I3BhbmVsLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0RBVEFfSUQgPSAnZGF0YS1pZCc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGlzT3BlbiA9IGhhc0F0dHJpYnV0ZSgnb3BlbicpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViVmlldyN0YWItY2hhbmdlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlZpZXcge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICB0aGlzLnJlbmRlclRhYlBhbmVsKHN0YXRlKTtcbiAgICB0aGlzLnJlbmRlclBhbmVsKHN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHBhbmVsXG4gICAqL1xuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4cGFuZGVkXG4gICAqL1xuICByZW5kZXJQYW5lbCh7dGl0bGUgPSAnJywgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnLCBleHBhbmRlZCA9IGZhbHNlfSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50aXRsZS5jbGFzc05hbWUgKz0gXCJwYW5lbC1oZWFkZXIgaWNvbi1odWItaWNvblwiO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgKCEhZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YCk7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncGFuZWwtY2hhbmdlJywgdGhpcywgdGhpcy50aXRsZSk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5ib2R5LmNsYXNzTmFtZSArPSBcInBhbmVsLWJvZHlcIjtcbiAgICB0aGlzLmJvZHkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMuYm9keS5pZCA9IGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWA7XG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lICs9IGBwYW5lbCBoNXAtc2VjdGlvbi0ke3NlY3Rpb25JZH1gO1xuICAgIGlmKGV4cGFuZGVkKXtcbiAgICAgIHRoaXMucGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgIH1cbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5ib2R5KTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lICs9IGBoNXAgaDVwLWh1YmA7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBhbmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlIHRoZSBwYW5lbCBhdHRyaWJpdXRlcyBmcm9tIGg1cC1zZGssIGUuZy4gb3BlbmluZyBhbmQgY2xvc2luZ1xuICAgKiBUaGlzIGlzIG9ubHkgY2FsbGVkIG9uY2Ugbm8gZXJyb3JzIGhhdmUgb2NjdXJlZCBpbiBsb2FkaW5nIHRoZSBodWIgXG4gICAqL1xuICBpbml0aWFsaXplUGFuZWwoKXtcbiAgICBpbml0UGFuZWwodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGlmIHBhbmVsIGlzIG9wZW4sIHRoaXMgaXMgdXNlZCBmb3Igb3V0ZXIgYm9yZGVyIGNvbG9yXG4gICAqL1xuICB0b2dnbGVQYW5lbE9wZW4oKSB7XG4gICAgaWYoaXNPcGVuKHRoaXMucGFuZWwpKSB7XG4gICAgICB0aGlzLnBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgnb3BlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSB0YWIgcGFuZWxcbiAgICovXG4gIHJlbmRlclRhYlBhbmVsKHN0YXRlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFibGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy50YWJsaXN0LmNsYXNzTmFtZSArPSBcInRhYmxpc3RcIjtcbiAgICB0aGlzLnRhYmxpc3Quc2V0QXR0cmlidXRlICgncm9sZScsICd0YWJsaXN0Jyk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy50YWJsaXN0KTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuY2xhc3NOYW1lICs9ICd0YWItcGFuZWwnO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRhYkxpc3RXcmFwcGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgdGFiXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkXG4gICAqL1xuICBhZGRUYWIoe3RpdGxlLCBpZCwgY29udGVudCwgc2VsZWN0ZWQgPSBmYWxzZX0pIHtcbiAgICBjb25zdCB0YWJJZCA9IGB0YWItJHtpZH1gO1xuICAgIGNvbnN0IHRhYlBhbmVsSWQgPSBgdGFiLXBhbmVsLSR7aWR9YDtcblxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdGFiLmNsYXNzTmFtZSArPSAndGFiJztcbiAgICB0YWIuaWQgPSB0YWJJZDtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgdGFiUGFuZWxJZCk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHNlbGVjdGVkLnRvU3RyaW5nKCkpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0RBVEFfSUQsIGlkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYicpO1xuICAgIHRhYi5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygndGFiLWNoYW5nZScsIHRoaXMsIHRhYik7XG5cbiAgICBjb25zdCB0YWJQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRhYlBhbmVsLmlkID0gdGFiUGFuZWxJZDtcbiAgICB0YWJQYW5lbC5jbGFzc05hbWUgKz0gJ3RhYnBhbmVsJztcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFibGxlZGJ5JywgdGFiSWQpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIXNlbGVjdGVkKS50b1N0cmluZygpKTtcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcbiAgICB0YWJQYW5lbC5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZCh0YWIpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0YWJQYW5lbCk7XG4gIH1cblxuICBpbml0VGFiUGFuZWwoKSB7XG4gICAgaW5pdFRhYlBhbmVsKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VjdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldFNlY3Rpb25UeXBlKHtpZH0pIHtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSA9IGBoNXAtc2VjdGlvbi0ke2lkfSBwYW5lbGA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsImltcG9ydCB7Y3VycnksIG1hcCwgZmlsdGVyfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiXG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSBcIi4uL2h1Yi1zZXJ2aWNlc1wiO1xuaW1wb3J0IGx1bnIgZnJvbSBcImx1bnJcIlxuXG4vKipcbiAqIEBjbGFzc1xuICogVGhlIFNlYXJjaCBTZXJ2aWNlIGdldHMgYSBjb250ZW50IHR5cGVzIGZyb20gSHViU2VydmljZXNcbiAqIHRoZW4gaW5kZXhlcyB0aGVtIHVzaW5nIGx1bnJqcy4gSXQgdGhlbiBzZWFyY2hlcyB0aHJvdWdoXG4gKiB0aGUgbHVucmpzIGluZGV4IGFuZCByZXR1cm5zIGNvbnRlbnQgdHlwZXMgdGhhdCBtYXRjaCB0aGUgcXVlcnkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS5hcGlSb290VXJsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gU2V0IHVwIGx1bnIgaW5kZXhcbiAgICB0aGlzLmluZGV4ID0gbHVucihmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZmllbGQoJ3RpdGxlJywge2Jvb3N0OiAxMH0pOyAvLyBDZXJ0YWluIGZpZWxkcyBjYW4gZ2l2ZW4gYSBoaWdoZXIgaW1wb3J0YW5jZVxuICAgICAgdGhpcy5maWVsZCgnc3VtbWFyeScpO1xuICAgICAgdGhpcy5maWVsZCgnZGVzY3JpcHRpb24nKTtcbiAgICAgIHRoaXMuZmllbGQoJ2tleXdvcmRzJyk7XG4gICAgICB0aGlzLnJlZignaWQnKTsgLy9cbiAgICB9KTtcblxuICAgIC8vIEFkZCBjb250ZW50IHR5cGVzIHRvIHRoZSBzZWFyY2ggaW5kZXhcbiAgICB0aGlzLmNvbnRlbnRUeXBlcyA9IHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKClcbiAgICAgIC50aGVuKG1hcChhZGRUb0luZGV4KHRoaXMuaW5kZXgpKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBzZWFyY2hcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXT59IEEgcHJvbWlzZSBvZiBhbiBhcnJheSBvZiBjb250ZW50IHR5cGVzXG4gICAqL1xuICBzZWFyY2gocXVlcnkpIHtcbiAgICAvLyBEaXNwbGF5IGFsbCBjb250ZW50IHR5cGVzIGJ5IGRlZmF1bHRcbiAgICBpZiAocXVlcnkgPT09ICcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250ZW50VHlwZXM7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlLCBmaWx0ZXIgY29udGVudCB0eXBlcyBieSBhIHF1ZXJ5XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFR5cGVzLnRoZW4oY29udGVudFR5cGVzID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmluZGV4LnNlYXJjaChxdWVyeSlcbiAgICAgICAgLm1hcChyZXN1bHQgPT4gcmVzdWx0LnJlZilcbiAgICAgICAgLm1hcChmaW5kQ29udGVudFR5cGVCeU1hY2hpbmVOYW1lKGNvbnRlbnRUeXBlcykpXG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGEgY29udGVudCB0eXBlIHRvIHRoZSBsdW5yanMgc2VhcmNoIGluZGV4XG4gKiBjcmVhdGVzIGFuIGlkIGZvciB0aGUgaW5kZXggdXNpbmcgdGhlIG1hY2hpbmUgbmFtZVxuICogb2YgdGhlIGNvbnRlbnQgdHlwZS5cbiAqXG4gKiBAcGFyYW0gIHtsdW5yLkluZGV4fSBpbmRleFxuICogQHBhcmFtICB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gKlxuICogQHJldHVybiB7Q29udGVudFR5cGV9XG4gKi9cbmNvbnN0IGFkZFRvSW5kZXggPSBjdXJyeSgoaW5kZXgsIGNvbnRlbnRUeXBlKSA9PiB7XG4gIGluZGV4LmFkZCh7XG4gICAgdGl0bGU6IGNvbnRlbnRUeXBlLnRpdGxlLFxuICAgIHN1bW1hcnk6IGNvbnRlbnRUeXBlLnN1bW1hcnksXG4gICAgZGVzY3JpcHRpb246IGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uLFxuICAgIGtleXdvcmRzOiBjb250ZW50VHlwZS5rZXl3b3JkcyxcbiAgICBpZDogY29udGVudFR5cGUubWFjaGluZU5hbWVcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbnRlbnRUeXBlO1xufSk7XG5cbi8qKlxuICogaGVscGVyIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7Q29udGVudFR5cGVbXX1cbiAqIEBwYXJhbSAge3N0cmluZ30gbWFjaGluZU5hbWVcbiAqIEByZXR1cm4ge0NvbnRlbnRUeXBlfVxuICovXG5jb25zdCBmaW5kQ29udGVudFR5cGVCeU1hY2hpbmVOYW1lID0gY3VycnkoZnVuY3Rpb24oY29udGVudFR5cGVzLCBtYWNoaW5lTmFtZSkge1xuICByZXR1cm4gY29udGVudFR5cGVzLmZpbHRlcihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSA9PT0gbWFjaGluZU5hbWUpWzBdO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIi8qKlxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xuICBnZXRFbGVtZW50KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiVE9ETyBVcGxvYWRcIjtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwicmVxdWlyZSgnLi4vLi4vc3JjL3N0eWxlcy9tYWluLnNjc3MnKTtcblxuLy8gTG9hZCBsaWJyYXJ5XG5INVAgPSBINVAgfHwge307XG5INVAuSHViQ2xpZW50ID0gcmVxdWlyZSgnLi4vc2NyaXB0cy9odWInKS5kZWZhdWx0O1xuSDVQLkh1YkNsaWVudC5yZW5kZXJFcnJvck1lc3NhZ2UgPSByZXF1aXJlKCcuLi9zY3JpcHRzL3V0aWxzL2Vycm9ycycpLmRlZmF1bHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuXG5leHBvcnQgY29uc3QgcmVsYXlDbGlja0V2ZW50QXMgPSBjdXJyeShmdW5jdGlvbih0eXBlLCBldmVudGZ1bCwgZWxlbWVudCkge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGV2ZW50ZnVsLmZpcmUodHlwZSwge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGlkOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiXSwic291cmNlUm9vdCI6IiJ9