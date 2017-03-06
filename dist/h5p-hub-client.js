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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.querySelectorAll = exports.querySelector = exports.appendChild = exports.toggleAttribute = exports.attributeEquals = exports.hasAttribute = exports.removeAttribute = exports.setAttribute = exports.getAttribute = undefined;

var _functional = __webpack_require__(0);

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
exports.relayClickEventAs = undefined;

var _functional = __webpack_require__(0);

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

var _functional = __webpack_require__(0);

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

var _hubView = __webpack_require__(17);

var _hubView2 = _interopRequireDefault(_hubView);

var _contentTypeSection = __webpack_require__(16);

var _contentTypeSection2 = _interopRequireDefault(_contentTypeSection);

var _uploadSection = __webpack_require__(19);

var _uploadSection2 = _interopRequireDefault(_uploadSection);

var _hubServices = __webpack_require__(4);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _eventful = __webpack_require__(1);

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
exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(0);

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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(0);

var _eventful = __webpack_require__(1);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeDetailView = __webpack_require__(11);

var _contentTypeDetailView2 = _interopRequireDefault(_contentTypeDetailView);

var _hubServices = __webpack_require__(4);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _eventful = __webpack_require__(1);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functional = __webpack_require__(0);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(1);

var _events = __webpack_require__(5);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeListView = __webpack_require__(13);

var _contentTypeListView2 = _interopRequireDefault(_contentTypeListView);

var _eventful = __webpack_require__(1);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventful = __webpack_require__(1);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contentTypeSectionView = __webpack_require__(15);

var _contentTypeSectionView2 = _interopRequireDefault(_contentTypeSectionView);

var _searchService = __webpack_require__(18);

var _searchService2 = _interopRequireDefault(_searchService);

var _contentTypeList = __webpack_require__(14);

var _contentTypeList2 = _interopRequireDefault(_contentTypeList);

var _contentTypeDetail = __webpack_require__(12);

var _contentTypeDetail2 = _interopRequireDefault(_contentTypeDetail);

var _eventful = __webpack_require__(1);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _panel = __webpack_require__(6);

var _panel2 = _interopRequireDefault(_panel);

var _tabPanel = __webpack_require__(9);

var _tabPanel2 = _interopRequireDefault(_tabPanel);

var _functional = __webpack_require__(0);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(1);

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functional = __webpack_require__(0);

var _hubServices = __webpack_require__(4);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _lunr = __webpack_require__(10);

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
/* 19 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjUwYWVkOGRkOTJjYTMwZDBiNDkiLCJ3ZWJwYWNrOi8vLy4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uL34vbHVuci9sdW5yLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudHJpZXMvZGlzdC5qcyJdLCJuYW1lcyI6WyJjdXJyeSIsImZuIiwiYXJpdHkiLCJsZW5ndGgiLCJmMSIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFwcGx5IiwiZjIiLCJhcmdzMiIsImNvbmNhdCIsImNvbXBvc2UiLCJmbnMiLCJyZWR1Y2UiLCJmIiwiZyIsImZvckVhY2giLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJFdmVudGZ1bCIsImxpc3RlbmVycyIsIm9uIiwidHlwZSIsImxpc3RlbmVyIiwic2NvcGUiLCJ0cmlnZ2VyIiwicHVzaCIsImZpcmUiLCJldmVudCIsInRyaWdnZXJzIiwiZXZlcnkiLCJwcm9wYWdhdGUiLCJ0eXBlcyIsImV2ZW50ZnVsIiwic2VsZiIsImdldEF0dHJpYnV0ZSIsIm5hbWUiLCJlbCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsImF0dHJpYnV0ZUVxdWFscyIsInRvZ2dsZUF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicGFyZW50IiwiY2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVuZGVyRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNsb3NlQnV0dG9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibWVzc2FnZUNvbnRlbnQiLCJ0aXRsZSIsImNvbnRlbnQiLCJtZXNzYWdlV3JhcHBlciIsImRpc21pc3NpYmxlIiwiYnV0dG9uIiwidW5kZWZpbmVkIiwibWVzc2FnZUJ1dHRvbiIsImNvbnNvbGUiLCJsb2ciLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJ3aW5kb3ciLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZXMiLCJjb250ZW50VHlwZSIsImlkIiwiYm9keSIsInJlbGF5Q2xpY2tFdmVudEFzIiwiZWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2ZW50RGVmYXVsdCIsImluaXQiLCJpc0V4cGFuZGVkIiwiaGlkZSIsInNob3ciLCJ0b2dnbGVCb2R5VmlzaWJpbGl0eSIsImJvZHlFbGVtZW50Iiwib25BcmlhRXhwYW5kZWRDaGFuZ2UiLCJ0YXJnZXQiLCJ0aXRsZUVsIiwiYm9keUlkIiwiYm9keUVsIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVPbGRWYWx1ZSIsImF0dHJpYnV0ZUZpbHRlciIsIkh1YiIsInN0YXRlIiwiY29udGVudFR5cGVTZWN0aW9uIiwidXBsb2FkU2VjdGlvbiIsInZpZXciLCJzZXJ2aWNlcyIsInNldFBhbmVsVGl0bGUiLCJjbG9zZVBhbmVsIiwic2V0U2VjdGlvblR5cGUiLCJ0b2dnbGVQYW5lbE9wZW4iLCJiaW5kIiwiaW5pdGlhbGl6ZVBhbmVsIiwiaW5pdFRhYlBhbmVsIiwiZ2V0Q29udGVudFR5cGUiLCJzZXRUaXRsZSIsInRhYkNvbmZpZ3MiLCJnZXRFbGVtZW50Iiwic2VsZWN0ZWQiLCJhZGRUYWIiLCJ0YWJDb25maWciLCJhZGRCb3R0b21Cb3JkZXIiLCJoaWRlQWxsIiwidW5TZWxlY3RBbGwiLCJ0YWJzIiwidGFiUGFuZWxzIiwidGFiIiwidGFiUGFuZWxJZCIsImx1bnIiLCJjb25maWciLCJpZHgiLCJJbmRleCIsInBpcGVsaW5lIiwiYWRkIiwidHJpbW1lciIsInN0b3BXb3JkRmlsdGVyIiwic3RlbW1lciIsInZlcnNpb24iLCJ1dGlscyIsIndhcm4iLCJnbG9iYWwiLCJhc1N0cmluZyIsIm9iaiIsIkV2ZW50RW1pdHRlciIsImV2ZW50cyIsImFkZExpc3RlbmVyIiwicG9wIiwibmFtZXMiLCJUeXBlRXJyb3IiLCJoYXNIYW5kbGVyIiwicmVtb3ZlTGlzdGVuZXIiLCJmbkluZGV4Iiwic3BsaWNlIiwiZW1pdCIsInRva2VuaXplciIsImlzQXJyYXkiLCJ0IiwidG9Mb3dlckNhc2UiLCJ0cmltIiwic3BsaXQiLCJzZXBhcmF0b3IiLCJsb2FkIiwibGFiZWwiLCJyZWdpc3RlcmVkRnVuY3Rpb25zIiwiRXJyb3IiLCJyZWdpc3RlckZ1bmN0aW9uIiwiUGlwZWxpbmUiLCJfc3RhY2siLCJ3YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQiLCJpc1JlZ2lzdGVyZWQiLCJzZXJpYWxpc2VkIiwiZm5OYW1lIiwiYWZ0ZXIiLCJleGlzdGluZ0ZuIiwibmV3Rm4iLCJwb3MiLCJiZWZvcmUiLCJyZW1vdmUiLCJydW4iLCJ0b2tlbnMiLCJvdXQiLCJ0b2tlbkxlbmd0aCIsInN0YWNrTGVuZ3RoIiwiaSIsInRva2VuIiwiaiIsInJlc2V0IiwidG9KU09OIiwiVmVjdG9yIiwiX21hZ25pdHVkZSIsImxpc3QiLCJOb2RlIiwidmFsIiwibmV4dCIsImluc2VydCIsInByZXYiLCJtYWduaXR1ZGUiLCJub2RlIiwic3VtT2ZTcXVhcmVzIiwiTWF0aCIsInNxcnQiLCJkb3QiLCJvdGhlclZlY3RvciIsIm90aGVyTm9kZSIsImRvdFByb2R1Y3QiLCJzaW1pbGFyaXR5IiwiU29ydGVkU2V0IiwiZWxlbWVudHMiLCJzZXJpYWxpc2VkRGF0YSIsInNldCIsImxvY2F0aW9uRm9yIiwidG9BcnJheSIsImN0eCIsImVsZW0iLCJzdGFydCIsImVuZCIsInNlY3Rpb25MZW5ndGgiLCJwaXZvdCIsImZsb29yIiwicGl2b3RFbGVtIiwiaW50ZXJzZWN0Iiwib3RoZXJTZXQiLCJpbnRlcnNlY3RTZXQiLCJhX2xlbiIsImJfbGVuIiwiYSIsImIiLCJjbG9uZSIsInVuaW9uIiwibG9uZ1NldCIsInNob3J0U2V0IiwidW5pb25TZXQiLCJzaG9ydFNldEVsZW1lbnRzIiwiX2ZpZWxkcyIsIl9yZWYiLCJkb2N1bWVudFN0b3JlIiwiU3RvcmUiLCJ0b2tlblN0b3JlIiwiVG9rZW5TdG9yZSIsImNvcnB1c1Rva2VucyIsImV2ZW50RW1pdHRlciIsInRva2VuaXplckZuIiwiX2lkZkNhY2hlIiwib2ZmIiwiZmllbGRzIiwicmVmIiwiZmllbGQiLCJmaWVsZE5hbWUiLCJvcHRzIiwiYm9vc3QiLCJyZWZOYW1lIiwiZG9jIiwiZW1pdEV2ZW50IiwiZG9jVG9rZW5zIiwiYWxsRG9jdW1lbnRUb2tlbnMiLCJkb2NSZWYiLCJmaWVsZFRva2VucyIsInRmIiwiZmllbGRMZW5ndGgiLCJ0b2tlbkNvdW50IiwiayIsImhhcyIsImdldCIsInVwZGF0ZSIsImlkZiIsInRlcm0iLCJjYWNoZUtleSIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiZG9jdW1lbnRGcmVxdWVuY3kiLCJjb3VudCIsInNlYXJjaCIsInF1ZXJ5IiwicXVlcnlUb2tlbnMiLCJxdWVyeVZlY3RvciIsImRvY3VtZW50U2V0cyIsImZpZWxkQm9vc3RzIiwibWVtbyIsImhhc1NvbWVUb2tlbiIsImV4cGFuZCIsImtleSIsInNpbWlsYXJpdHlCb29zdCIsImRpZmYiLCJtYXgiLCJtYXRjaGluZ0RvY3VtZW50cyIsInJlZnMiLCJrZXlzIiwicmVmc0xlbiIsImRvY3VtZW50U2V0Iiwic2NvcmUiLCJkb2N1bWVudFZlY3RvciIsInNvcnQiLCJkb2N1bWVudFJlZiIsImRvY3VtZW50VG9rZW5zIiwiZG9jdW1lbnRUb2tlbnNMZW5ndGgiLCJ1c2UiLCJwbHVnaW4iLCJ1bnNoaWZ0Iiwic3RvcmUiLCJzdGVwMmxpc3QiLCJzdGVwM2xpc3QiLCJjIiwidiIsIkMiLCJWIiwibWdyMCIsIm1lcTEiLCJtZ3IxIiwic192IiwicmVfbWdyMCIsIlJlZ0V4cCIsInJlX21ncjEiLCJyZV9tZXExIiwicmVfc192IiwicmVfMWEiLCJyZTJfMWEiLCJyZV8xYiIsInJlMl8xYiIsInJlXzFiXzIiLCJyZTJfMWJfMiIsInJlM18xYl8yIiwicmU0XzFiXzIiLCJyZV8xYyIsInJlXzIiLCJyZV8zIiwicmVfNCIsInJlMl80IiwicmVfNSIsInJlXzVfMSIsInJlM181IiwicG9ydGVyU3RlbW1lciIsInciLCJzdGVtIiwic3VmZml4IiwiZmlyc3RjaCIsInJlIiwicmUyIiwicmUzIiwicmU0Iiwic3Vic3RyIiwidG9VcHBlckNhc2UiLCJ0ZXN0IiwicmVwbGFjZSIsImZwIiwiZXhlYyIsImdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIiLCJzdG9wV29yZHMiLCJ3b3JkcyIsInN0b3BXb3JkIiwicm9vdCIsImRvY3MiLCJjaGFyQXQiLCJyZXN0IiwiZ2V0Tm9kZSIsImZhY3RvcnkiLCJkZWZpbmUiLCJleHBvcnRzIiwibW9kdWxlIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsInRvZ2dsZVZpc2liaWxpdHkiLCJ2aXNpYmxlIiwiaXNFbXB0eSIsInRleHQiLCJDb250ZW50VHlwZURldGFpbFZpZXciLCJiYWNrQnV0dG9uRWxlbWVudCIsImltYWdlIiwiaW1hZ2VXcmFwcGVyRWxlbWVudCIsImF1dGhvciIsImRlc2NyaXB0aW9uIiwiZGVtb0J1dHRvbiIsInRleHREZXRhaWxzIiwiZGV0YWlsc0VsZW1lbnQiLCJ1c2VCdXR0b24iLCJpbnN0YWxsQnV0dG9uIiwiYnV0dG9uQmFyIiwibGljZW5jZVBhbmVsIiwiY3JlYXRlUGFuZWwiLCJwbHVnaW5zUGFuZWwiLCJwdWJsaXNoZXJQYW5lbCIsInBhbmVsR3JvdXBFbGVtZW50Iiwicm9vdEVsZW1lbnQiLCJoZWFkZXJFbCIsImJvZHlJbm5lckVsIiwicGFuZWxFbCIsInNyYyIsInVybCIsImluc3RhbGxlZCIsIkNvbnRlbnRUeXBlRGV0YWlsIiwiaW5zdGFsbCIsImluc3RhbGxDb250ZW50VHlwZSIsImRlYnVnIiwic2V0SWQiLCJzZXREZXNjcmlwdGlvbiIsInNldEltYWdlIiwiaWNvbiIsInNldEV4YW1wbGUiLCJleGFtcGxlIiwic2V0SXNJbnN0YWxsZWQiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwicm93IiwiY3JlYXRlQ29udGVudFR5cGVSb3ciLCJ1c2VCdXR0b25Db25maWciLCJjbHMiLCJpbnN0YWxsQnV0dG9uQ29uZmlnIiwic3VtbWFyeSIsIkNvbnRlbnRUeXBlTGlzdCIsInJlbW92ZUFsbFJvd3MiLCJhZGRSb3ciLCJDb250ZW50QnJvd3NlclZpZXciLCJtZW51IiwiY3JlYXRlTWVudUVsZW1lbnQiLCJpbnB1dEdyb3VwIiwiY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQiLCJtZW51R3JvdXAiLCJtZW51QmFyRWxlbWVudCIsImNoaWxkRWxlbWVudENvdW50IiwibmF2RWxlbWVudCIsImlucHV0RmllbGQiLCJpbnB1dEJ1dHRvbiIsIkNvbnRlbnRUeXBlU2VjdGlvbiIsInNlYXJjaFNlcnZpY2UiLCJjb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZURldGFpbCIsImFkZE1lbnVJdGVtIiwibWVudVRleHQiLCJzZWN0aW9uIiwiY2xhc3NMaXN0IiwiYXBwbHlTZWFyY2hGaWx0ZXIiLCJzaG93RGV0YWlsVmlldyIsImNsb3NlRGV0YWlsVmlldyIsImluaXRDb250ZW50VHlwZUxpc3QiLCJjYXRjaCIsImVycm9yIiwibG9hZEJ5SWQiLCJBVFRSSUJVVEVfREFUQV9JRCIsImlzT3BlbiIsIkh1YlZpZXciLCJyZW5kZXJUYWJQYW5lbCIsInJlbmRlclBhbmVsIiwic2VjdGlvbklkIiwiZXhwYW5kZWQiLCJ0YWJDb250YWluZXJFbGVtZW50IiwicGFuZWwiLCJ0YWJsaXN0IiwidGFiTGlzdFdyYXBwZXIiLCJ0YWJJZCIsInRhYlBhbmVsIiwiU2VhcmNoU2VydmljZSIsImluZGV4IiwiYWRkVG9JbmRleCIsImZpbmRDb250ZW50VHlwZUJ5TWFjaGluZU5hbWUiLCJrZXl3b3JkcyIsIlVwbG9hZFNlY3Rpb24iLCJyZXF1aXJlIiwiSDVQIiwiSHViQ2xpZW50IiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUE7Ozs7Ozs7OztBQVNPLElBQU1BLHdCQUFRLFNBQVJBLEtBQVEsQ0FBU0MsRUFBVCxFQUFhO0FBQ2hDLE1BQU1DLFFBQVFELEdBQUdFLE1BQWpCOztBQUVBLFNBQU8sU0FBU0MsRUFBVCxHQUFjO0FBQ25CLFFBQU1DLE9BQU9DLE1BQU1DLFNBQU4sQ0FBZ0JDLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQkMsU0FBM0IsRUFBc0MsQ0FBdEMsQ0FBYjtBQUNBLFFBQUlMLEtBQUtGLE1BQUwsSUFBZUQs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YTNFLE1BQWIsQ0FBb0I7QUFBQSxXQUFlNEUsWUFBWUYsV0FBWixLQUE0QkEsV0FBM0M7QUFBQSxHQUFwQixFQUE0RSxDQUE1RSxDQUFQO0FBQ0QsQ0FGb0MsQ0FBckMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRkE7OztJQUdxQjJYLGE7Ozs7Ozs7aUNBQ047QUFDWCxVQUFNclgsVUFBVXJDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQW9DLGNBQVFsQyxTQUFSLEdBQW9CLGFBQXBCO0FBQ0EsYUFBT2tDLE9BQVA7QUFDRDs7Ozs7O2tCQUxrQnFYLGE7Ozs7Ozs7OztBQ0hyQixtQkFBQUMsQ0FBUSxDQUFSOztBQUVBO0FBQ0FDLE1BQU1BLE9BQU8sRUFBYjtBQUNBQSxJQUFJQyxTQUFKLEdBQWdCLG1CQUFBRixDQUFRLENBQVIsRUFBMEJHLE9BQTFDO0FBQ0FGLElBQUlDLFNBQUosQ0FBY2hhLGtCQUFkLEdBQW1DLG1CQUFBOFosQ0FBUSxDQUFSLEVBQW1DRyxPQUF0RSxDIiwiZmlsZSI6Img1cC1odWItY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDY1MGFlZDhkZDkyY2EzMGQwYjQ5IiwiLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICpcbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGN1cnJ5ID0gZnVuY3Rpb24oZm4pIHtcbiAgY29uc3QgYXJpdHkgPSBmbi5sZW5ndGg7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKCkge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+PSBhcml0eSkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBmMigpIHtcbiAgICAgICAgY29uc3QgYXJnczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICByZXR1cm4gZjEuYXBwbHkobnVsbCwgYXJncy5jb25jYXQoYXJnczIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIENvbXBvc2UgZnVuY3Rpb25zIHRvZ2V0aGVyLCBleGVjdXRpbmcgZnJvbSByaWdodCB0byBsZWZ0XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbi4uLn0gZm5zXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKC4uLmZucykgPT4gZm5zLnJlZHVjZSgoZiwgZykgPT4gKC4uLmFyZ3MpID0+IGYoZyguLi5hcmdzKSkpO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JFYWNoID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgYXJyLmZvckVhY2goZm4pO1xufSk7XG5cbi8qKlxuICogTWFwcyBhIGZ1bmN0aW9uIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgbWFwID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5tYXAoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZpbHRlciB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBzb21lIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgc29tZSA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuc29tZShmbik7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgYSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSBjdXJyeShmdW5jdGlvbiAodmFsdWUsIGFycikge1xuICByZXR1cm4gYXJyLmluZGV4T2YodmFsdWUpICE9IC0xO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSBzdXBwbGllZCB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgd2l0aG91dCA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZXMsIGFycikge1xuICByZXR1cm4gZmlsdGVyKHZhbHVlID0+ICFjb250YWlucyh2YWx1ZSwgdmFsdWVzKSwgYXJyKVxufSk7XG5cbi8qKlxuICogVGFrZXMgYSBzdHJpbmcgdGhhdCBpcyBlaXRoZXIgJ3RydWUnIG9yICdmYWxzZScgYW5kIHJldHVybnMgdGhlIG9wcG9zaXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJvb2xcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBpbnZlcnNlQm9vbGVhblN0cmluZyA9IGZ1bmN0aW9uIChib29sKSB7XG4gIHJldHVybiAoYm9vbCAhPT0gJ3RydWUnKS50b1N0cmluZygpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIi8qKlxuICogQG1peGluXG4gKi9cbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnRmdWx9XG4gICAqL1xuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNjb3BlXG4gICAgICovXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcbiAgICAgICdsaXN0ZW5lcic6IGxpc3RlbmVyLFxuICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAgICovXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUodHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsImltcG9ydCB7Y3VycnksIGludmVyc2VCb29sZWFuU3RyaW5nfSBmcm9tICcuL2Z1bmN0aW9uYWwnXG5cbi8qKlxuICogR2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmcm9tIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpO1xufSk7XG5cbi8qKlxuICogU2V0IGFuIGF0dHJpYnV0ZSBvbiBhIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGVsKSB7XG4gIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG59KTtcblxuLyoqXG4gKiBSZW1vdmUgYXR0cmlidXRlIGZyb20gaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcbiAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xufSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaGFzQXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIGVsKSB7XG4gIHJldHVybiBlbC5oYXNBdHRyaWJ1dGUobmFtZSk7XG59KTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGUgdGhhdCBlcXVhbHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUVxdWFscyA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZWwpIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWU7XG59KTtcblxuLyoqXG4gKiBUb2dnbGVzIGFuIGF0dHJpYnV0ZSBiZXR3ZWVuICd0cnVlJyBhbmQgJ2ZhbHNlJztcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xuICBjb25zdCB2YWx1ZSA9IGdldEF0dHJpYnV0ZShuYW1lLCBlbCk7XG4gIHNldEF0dHJpYnV0ZShuYW1lLCBpbnZlcnNlQm9vbGVhblN0cmluZyh2YWx1ZSksIGVsKTtcbn0pO1xuXG4vKipcbiAqIFRoZSBhcHBlbmRDaGlsZCgpIG1ldGhvZCBhZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0IG9mIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWVkIHBhcmVudCBub2RlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgYXBwZW5kQ2hpbGQgPSBjdXJyeShmdW5jdGlvbiAocGFyZW50LCBjaGlsZCkge1xuICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyBhIGRlc2NlbmRhbnQgb2YgdGhlIGVsZW1lbnQgb24gd2hpY2ggaXQgaXMgaW52b2tlZFxuICogdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2Ygc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvciA9IGN1cnJ5KGZ1bmN0aW9uIChzZWxlY3RvciwgZWwpIHtcbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5vbi1saXZlIE5vZGVMaXN0IG9mIGFsbCBlbGVtZW50cyBkZXNjZW5kZWQgZnJvbSB0aGUgZWxlbWVudCBvbiB3aGljaCBpdFxuICogaXMgaW52b2tlZCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBDU1Mgc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge05vZGVMaXN0fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvckFsbCA9IGN1cnJ5KGZ1bmN0aW9uIChzZWxlY3RvciwgZWwpIHtcbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwiLyoqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLnR5cGUgICAgICAgICB0eXBlIG9mIHRoZSBtZXNzYWdlOiBpbmZvLCBzdWNjZXNzLCBlcnJvclxuICogQHBhcmFtICB7Ym9vbGVhbn0gIGNvbmZpZy5kaXNtaXNzaWJsZSAgd2hldGhlciB0aGUgbWVzc2FnZSBjYW4gYmUgZGlzbWlzc2VkXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLmNvbnRlbnQgICAgICBtZXNzYWdlIGNvbnRlbnQgdXN1YWxseSBhICdoMycgYW5kIGEgJ3AnXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gZGl2IGNvbnRhaW5pbmcgdGhlIG1lc3NhZ2UgZWxlbWVudFxuICovXG5cbi8vVE9ETyBoYW5kbGUgc3RyaW5ncywgaHRtbCwgYmFkbHkgZm9ybWVkIG9iamVjdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyRXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XG4gIGNsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmI3gyNzE1JztcblxuICBjb25zdCBtZXNzYWdlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtZXNzYWdlQ29udGVudC5jbGFzc05hbWUgPSAnbWVzc2FnZS1jb250ZW50JztcbiAgbWVzc2FnZUNvbnRlbnQuaW5uZXJIVE1MID0gJzxoMT4nICsgbWVzc2FnZS50aXRsZSArICc8L2gxPicgKyAnPHA+JyArIG1lc3NhZ2UuY29udGVudCArICc8L3A+JztcblxuICBjb25zdCBtZXNzYWdlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtZXNzYWdlV3JhcHBlci5jbGFzc05hbWUgPSAnbWVzc2FnZScgKyAnICcgKyBgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUNvbnRlbnQpO1xuXG4gIGlmIChtZXNzYWdlLmJ1dHRvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbWVzc2FnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG1lc3NhZ2VCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbic7XG4gICAgbWVzc2FnZUJ1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlLmJ1dHRvbjtcbiAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQnV0dG9uKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKG1lc3NhZ2VXcmFwcGVyKTtcbiAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gQ29udGVudFR5cGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGNoVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN1bW1hcnlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjcmVhdGVkQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVkX0F0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaXNSZWNvbW1lbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBvcHVsYXJpdHlcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHNjcmVlbnNob3RzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGljZW5zZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV4YW1wbGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0dXRvcmlhbFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0ga2V5d29yZHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvd25lclxuICogQHByb3BlcnR5IHtib29sZWFufSBpbnN0YWxsZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVzdHJpY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBhcGlSb290VXJsIH0pIHtcbiAgICB0aGlzLmFwaVJvb3RVcmwgPSBhcGlSb290VXJsO1xuXG4gICAgaWYoIXdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMpe1xuICAgICAgLy8gVE9ETyByZW1vdmUgdGhpcyB3aGVuIGRvbmUgdGVzdGluZyBmb3IgZXJyb3JzXG4gICAgICAvLyB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWVycm9ycy9OT19SRVNQT05TRS5qc29uYCwge1xuXG4gICAgICB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnQtdHlwZS1jYWNoZWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxuICAgICAgLnRoZW4odGhpcy5pc1ZhbGlkKVxuICAgICAgLnRoZW4oanNvbiA9PiBqc29uLmxpYnJhcmllcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSAge0NvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cbiAgICovXG4gIGlzVmFsaWQocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT59XG4gICAqL1xuICBjb250ZW50VHlwZXMoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcy50aGVuKGNvbnRlbnRUeXBlcyA9PiB7XG4gICAgICByZXR1cm4gY29udGVudFR5cGVzLmZpbHRlcihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSA9PT0gbWFjaGluZU5hbWUpWzBdO1xuICAgIH0pO1xuXG4gICAgLypyZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnRfdHlwZV9jYWNoZS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7Ki9cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YWxscyBhIGNvbnRlbnQgdHlwZSBvbiB0aGUgc2VydmVyXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBpbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktaW5zdGFsbD9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6ICcnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi1zZXJ2aWNlcy5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcblxuZXhwb3J0IGNvbnN0IHJlbGF5Q2xpY2tFdmVudEFzID0gY3VycnkoZnVuY3Rpb24odHlwZSwgZXZlbnRmdWwsIGVsZW1lbnQpIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBldmVudGZ1bC5maXJlKHR5cGUsIHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBpZDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxuICAgIH0sIGZhbHNlKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50O1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGUsIGF0dHJpYnV0ZUVxdWFscywgdG9nZ2xlQXR0cmlidXRlfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGlzRXhwYW5kZWQgPSBhdHRyaWJ1dGVFcXVhbHMoXCJhcmlhLWV4cGFuZGVkXCIsICd0cnVlJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgdGhlIGJvZHkgdmlzaWJpbGl0eVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJvZHlFbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzRXhwYW5kZWRcbiAqL1xuY29uc3QgdG9nZ2xlQm9keVZpc2liaWxpdHkgPSBmdW5jdGlvbihib2R5RWxlbWVudCwgaXNFeHBhbmRlZCkge1xuICBpZighaXNFeHBhbmRlZCkge1xuICAgIGhpZGUoYm9keUVsZW1lbnQpO1xuICAgIC8vYm9keUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XG4gIH1cbiAgZWxzZSAvKmlmKGJvZHlFbGVtZW50LnNjcm9sbEhlaWdodCA+IDApKi8ge1xuICAgIHNob3coYm9keUVsZW1lbnQpO1xuICAgIC8vYm9keUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7Ym9keUVsZW1lbnQuc2Nyb2xsSGVpZ2h0fXB4YDtcbiAgfVxufTtcblxuLyoqXG4gKiBIYW5kbGVzIGNoYW5nZXMgdG8gYXJpYS1leHBhbmRlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJvZHlFbGVtZW50XG4gKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBldmVudFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBvbkFyaWFFeHBhbmRlZENoYW5nZSA9IGN1cnJ5KGZ1bmN0aW9uKGJvZHlFbGVtZW50LCBldmVudCkge1xuICB0b2dnbGVCb2R5VmlzaWJpbGl0eShib2R5RWxlbWVudCwgaXNFeHBhbmRlZChldmVudC50YXJnZXQpKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIGNvbnN0IHRpdGxlRWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWV4cGFuZGVkXScpO1xuICBjb25zdCBib2R5SWQgPSB0aXRsZUVsLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICBjb25zdCBib2R5RWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvZHlJZH1gKTtcblxuICBpZih0aXRsZUVsKSB7XG4gICAgLy8gc2V0IG9ic2VydmVyIG9uIHRpdGxlIGZvciBhcmlhLWV4cGFuZGVkXG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZm9yRWFjaChvbkFyaWFFeHBhbmRlZENoYW5nZShib2R5RWwpKSk7XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKHRpdGxlRWwsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0ZUZpbHRlcjogW1wiYXJpYS1leHBhbmRlZFwiXVxuICAgIH0pO1xuXG4gICAgLy8gU2V0IGNsaWNrIGxpc3RlbmVyIHRoYXQgdG9nZ2xlcyBhcmlhLWV4cGFuZGVkXG4gICAgdGl0bGVFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB0b2dnbGVBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIGV2ZW50LnRhcmdldCk7XG4gICAgfSk7XG5cbiAgICB0b2dnbGVCb2R5VmlzaWJpbGl0eShib2R5RWwsIGlzRXhwYW5kZWQodGl0bGVFbCkpO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvcGFuZWwuanMiLCJpbXBvcnQgSHViVmlldyBmcm9tICcuL2h1Yi12aWV3JztcbmltcG9ydCBDb250ZW50VHlwZVNlY3Rpb24gZnJvbSAnLi9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbic7XG5pbXBvcnQgVXBsb2FkU2VjdGlvbiBmcm9tICcuL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uJztcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tICcuL2h1Yi1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7cmVuZGVyRXJyb3JNZXNzYWdlfSBmcm9tICcuL3V0aWxzL2Vycm9ycyc7XG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEh1YlN0YXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGl0bGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZXhwYW5kZWRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhcGlSb290VXJsXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gRXJyb3JNZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVycm9yQ29kZVxuICovXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFNlbGVjdGVkRWxlbWVudFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlkXG4gKi9cbi8qKlxuICogU2VsZWN0IGV2ZW50XG4gKiBAZXZlbnQgSHViI3NlbGVjdFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBFcnJvciBldmVudFxuICogQGV2ZW50IEh1YiNlcnJvclxuICogQHR5cGUge0Vycm9yTWVzc2FnZX1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBIdWIjZXJyb3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY29udHJvbGxlcnNcbiAgICB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbiA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb24oc3RhdGUpO1xuICAgIHRoaXMudXBsb2FkU2VjdGlvbiA9IG5ldyBVcGxvYWRTZWN0aW9uKHN0YXRlKTtcblxuICAgIC8vIHZpZXdzXG4gICAgdGhpcy52aWV3ID0gbmV3IEh1YlZpZXcoc3RhdGUpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIHByb3BhZ2F0ZSBjb250cm9sbGVyIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ2Vycm9yJ10sIHRoaXMuY29udGVudFR5cGVTZWN0aW9uKTtcblxuICAgIC8vIGhhbmRsZSBldmVudHNcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnNldFBhbmVsVGl0bGUsIHRoaXMpO1xuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMudmlldy5jbG9zZVBhbmVsLCB0aGlzLnZpZXcpO1xuICAgIC8vIG9ubHkgaW5pdGlhbGl6ZSB0aGUgbWFpbiBwYW5lbCBpZiBubyBlcnJvcnMgaGF2ZSBvY2N1cmVkIHdoZW4gdXBkYXRpbmcgdGhlIGNvbnRlbnQgdHlwZSBsaXN0XG4gICAgdGhpcy52aWV3Lm9uKCd0YWItY2hhbmdlJywgdGhpcy52aWV3LnNldFNlY3Rpb25UeXBlLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMudmlldy5vbigncGFuZWwtY2hhbmdlJywgdGhpcy52aWV3LnRvZ2dsZVBhbmVsT3Blbi5iaW5kKHRoaXMudmlldyksIHRoaXMudmlldyk7XG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24ub24oJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHRoaXMudmlldy5pbml0aWFsaXplUGFuZWwuYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xuXG4gICAgdGhpcy5pbml0VGFiUGFuZWwoKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBjb250ZW50IHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGdldENvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUobWFjaGluZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlIG9mIHRoZSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldFBhbmVsVGl0bGUoe2lkfSnCoHtcbiAgICB0aGlzLmdldENvbnRlbnRUeXBlKGlkKS50aGVuKCh7dGl0bGV9KSA9PiB0aGlzLnZpZXcuc2V0VGl0bGUodGl0bGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIHRhYiBwYW5lbFxuICAgKi9cbiAgaW5pdFRhYlBhbmVsKCkge1xuICAgIGNvbnN0IHRhYkNvbmZpZ3MgPSBbe1xuICAgICAgdGl0bGU6ICdDcmVhdGUgQ29udGVudCcsXG4gICAgICBpZDogJ2NvbnRlbnQtdHlwZXMnLFxuICAgICAgY29udGVudDogdGhpcy5jb250ZW50VHlwZVNlY3Rpb24uZ2V0RWxlbWVudCgpLFxuICAgICAgc2VsZWN0ZWQ6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnVXBsb2FkJyxcbiAgICAgIGlkOiAndXBsb2FkJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMudXBsb2FkU2VjdGlvbi5nZXRFbGVtZW50KClcbiAgICB9XTtcblxuICAgIHRhYkNvbmZpZ3MuZm9yRWFjaCh0YWJDb25maWcgPT4gdGhpcy52aWV3LmFkZFRhYih0YWJDb25maWcpKTtcbiAgICB0aGlzLnZpZXcuYWRkQm90dG9tQm9yZGVyKCk7IC8vIEFkZHMgYW4gYW5pbWF0ZWQgYm90dG9tIGJvcmRlciB0byBlYWNoIHRhYlxuICAgIHRoaXMudmlldy5pbml0VGFiUGFuZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWIuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Zm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBoaWRlQWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0YWJzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYlwiXScpO1xuICBjb25zdCB0YWJQYW5lbHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFicGFuZWxcIl0nKTtcblxuICB0YWJzLmZvckVhY2godGFiID0+IHtcbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgdW5TZWxlY3RBbGwodGFicyk7XG4gICAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcblxuICAgICAgaGlkZUFsbCh0YWJQYW5lbHMpO1xuXG4gICAgICBsZXQgdGFiUGFuZWxJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICAgIHNob3coZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0YWJQYW5lbElkfWApKTtcbiAgICB9KTtcbiAgfSlcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCIvKipcbiAqIGx1bnIgLSBodHRwOi8vbHVucmpzLmNvbSAtIEEgYml0IGxpa2UgU29sciwgYnV0IG11Y2ggc21hbGxlciBhbmQgbm90IGFzIGJyaWdodCAtIDEuMC4wXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG47KGZ1bmN0aW9uKCl7XG5cbi8qKlxuICogQ29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIGluc3RhbnRpYXRpbmcgYSBuZXcgbHVuciBpbmRleCBhbmQgY29uZmlndXJpbmcgaXRcbiAqIHdpdGggdGhlIGRlZmF1bHQgcGlwZWxpbmUgZnVuY3Rpb25zIGFuZCB0aGUgcGFzc2VkIGNvbmZpZyBmdW5jdGlvbi5cbiAqXG4gKiBXaGVuIHVzaW5nIHRoaXMgY29udmVuaWVuY2UgZnVuY3Rpb24gYSBuZXcgaW5kZXggd2lsbCBiZSBjcmVhdGVkIHdpdGggdGhlXG4gKiBmb2xsb3dpbmcgZnVuY3Rpb25zIGFscmVhZHkgaW4gdGhlIHBpcGVsaW5lOlxuICpcbiAqIGx1bnIuU3RvcFdvcmRGaWx0ZXIgLSBmaWx0ZXJzIG91dCBhbnkgc3RvcCB3b3JkcyBiZWZvcmUgdGhleSBlbnRlciB0aGVcbiAqIGluZGV4XG4gKlxuICogbHVuci5zdGVtbWVyIC0gc3RlbXMgdGhlIHRva2VucyBiZWZvcmUgZW50ZXJpbmcgdGhlIGluZGV4LlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIHZhciBpZHggPSBsdW5yKGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHRoaXMuZmllbGQoJ3RpdGxlJywgMTApXG4gKiAgICAgICB0aGlzLmZpZWxkKCd0YWdzJywgMTAwKVxuICogICAgICAgdGhpcy5maWVsZCgnYm9keScpXG4gKiAgICAgICBcbiAqICAgICAgIHRoaXMucmVmKCdjaWQnKVxuICogICAgICAgXG4gKiAgICAgICB0aGlzLnBpcGVsaW5lLmFkZChmdW5jdGlvbiAoKSB7XG4gKiAgICAgICAgIC8vIHNvbWUgY3VzdG9tIHBpcGVsaW5lIGZ1bmN0aW9uXG4gKiAgICAgICB9KVxuICogICAgICAgXG4gKiAgICAgfSlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maWcgQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIG5ldyBpbnN0YW5jZVxuICogb2YgdGhlIGx1bnIuSW5kZXggYXMgYm90aCBpdHMgY29udGV4dCBhbmQgZmlyc3QgcGFyYW1ldGVyLiBJdCBjYW4gYmUgdXNlZCB0b1xuICogY3VzdG9taXplIHRoZSBpbnN0YW5jZSBvZiBuZXcgbHVuci5JbmRleC5cbiAqIEBuYW1lc3BhY2VcbiAqIEBtb2R1bGVcbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICpcbiAqL1xudmFyIGx1bnIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHZhciBpZHggPSBuZXcgbHVuci5JbmRleFxuXG4gIGlkeC5waXBlbGluZS5hZGQoXG4gICAgbHVuci50cmltbWVyLFxuICAgIGx1bnIuc3RvcFdvcmRGaWx0ZXIsXG4gICAgbHVuci5zdGVtbWVyXG4gIClcblxuICBpZiAoY29uZmlnKSBjb25maWcuY2FsbChpZHgsIGlkeClcblxuICByZXR1cm4gaWR4XG59XG5cbmx1bnIudmVyc2lvbiA9IFwiMS4wLjBcIlxuLyohXG4gKiBsdW5yLnV0aWxzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBIG5hbWVzcGFjZSBjb250YWluaW5nIHV0aWxzIGZvciB0aGUgcmVzdCBvZiB0aGUgbHVuciBsaWJyYXJ5XG4gKi9cbmx1bnIudXRpbHMgPSB7fVxuXG4vKipcbiAqIFByaW50IGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGJlIHByaW50ZWQuXG4gKiBAbWVtYmVyT2YgVXRpbHNcbiAqL1xubHVuci51dGlscy53YXJuID0gKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgaWYgKGdsb2JhbC5jb25zb2xlICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpXG4gICAgfVxuICB9XG59KSh0aGlzKVxuXG4vKipcbiAqIENvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICpcbiAqIEluIHRoZSBjYXNlIG9mIGBudWxsYCBhbmQgYHVuZGVmaW5lZGAgdGhlIGZ1bmN0aW9uIHJldHVybnNcbiAqIHRoZSBlbXB0eSBzdHJpbmcsIGluIGFsbCBvdGhlciBjYXNlcyB0aGUgcmVzdWx0IG9mIGNhbGxpbmdcbiAqIGB0b1N0cmluZ2Agb24gdGhlIHBhc3NlZCBvYmplY3QgaXMgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtIHtBbnl9IG9iaiBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gYSBzdHJpbmcuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGFzc2VkIG9iamVjdC5cbiAqIEBtZW1iZXJPZiBVdGlsc1xuICovXG5sdW5yLnV0aWxzLmFzU3RyaW5nID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAob2JqID09PSB2b2lkIDAgfHwgb2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwiXCJcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqLnRvU3RyaW5nKClcbiAgfVxufVxuLyohXG4gKiBsdW5yLkV2ZW50RW1pdHRlclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5FdmVudEVtaXR0ZXIgaXMgYW4gZXZlbnQgZW1pdHRlciBmb3IgbHVuci4gSXQgbWFuYWdlcyBhZGRpbmcgYW5kIHJlbW92aW5nIGV2ZW50IGhhbmRsZXJzIGFuZCB0cmlnZ2VyaW5nIGV2ZW50cyBhbmQgdGhlaXIgaGFuZGxlcnMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmV2ZW50cyA9IHt9XG59XG5cbi8qKlxuICogQmluZHMgYSBoYW5kbGVyIGZ1bmN0aW9uIHRvIGEgc3BlY2lmaWMgZXZlbnQocykuXG4gKlxuICogQ2FuIGJpbmQgYSBzaW5nbGUgZnVuY3Rpb24gdG8gbWFueSBkaWZmZXJlbnQgZXZlbnRzIGluIG9uZSBjYWxsLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZXZlbnROYW1lXSBUaGUgbmFtZShzKSBvZiBldmVudHMgdG8gYmluZCB0aGlzIGZ1bmN0aW9uIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBhbiBldmVudCBpcyBmaXJlZC5cbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICBmbiA9IGFyZ3MucG9wKCksXG4gICAgICBuYW1lcyA9IGFyZ3NcblxuICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IgKFwibGFzdCBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb25cIilcblxuICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKCF0aGlzLmhhc0hhbmRsZXIobmFtZSkpIHRoaXMuZXZlbnRzW25hbWVdID0gW11cbiAgICB0aGlzLmV2ZW50c1tuYW1lXS5wdXNoKGZuKVxuICB9LCB0aGlzKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBoYW5kbGVyIGZ1bmN0aW9uIGZyb20gYSBzcGVjaWZpYyBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgdGhpcyBmdW5jdGlvbiBmcm9tLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIGFuIGV2ZW50LlxuICogQG1lbWJlck9mIEV2ZW50RW1pdHRlclxuICovXG5sdW5yLkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgaWYgKCF0aGlzLmhhc0hhbmRsZXIobmFtZSkpIHJldHVyblxuXG4gIHZhciBmbkluZGV4ID0gdGhpcy5ldmVudHNbbmFtZV0uaW5kZXhPZihmbilcbiAgdGhpcy5ldmVudHNbbmFtZV0uc3BsaWNlKGZuSW5kZXgsIDEpXG5cbiAgaWYgKCF0aGlzLmV2ZW50c1tuYW1lXS5sZW5ndGgpIGRlbGV0ZSB0aGlzLmV2ZW50c1tuYW1lXVxufVxuXG4vKipcbiAqIENhbGxzIGFsbCBmdW5jdGlvbnMgYm91bmQgdG8gdGhlIGdpdmVuIGV2ZW50LlxuICpcbiAqIEFkZGl0aW9uYWwgZGF0YSBjYW4gYmUgcGFzc2VkIHRvIHRoZSBldmVudCBoYW5kbGVyIGFzIGFyZ3VtZW50cyB0byBgZW1pdGBcbiAqIGFmdGVyIHRoZSBldmVudCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQuXG4gKiBAbWVtYmVyT2YgRXZlbnRFbWl0dGVyXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCF0aGlzLmhhc0hhbmRsZXIobmFtZSkpIHJldHVyblxuXG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXG4gIHRoaXMuZXZlbnRzW25hbWVdLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKVxuICB9KVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGEgaGFuZGxlciBoYXMgZXZlciBiZWVuIHN0b3JlZCBhZ2FpbnN0IGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGNoZWNrLlxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmhhc0hhbmRsZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gbmFtZSBpbiB0aGlzLmV2ZW50c1xufVxuXG4vKiFcbiAqIGx1bnIudG9rZW5pemVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIGZvciBzcGxpdHRpbmcgYSBzdHJpbmcgaW50byB0b2tlbnMgcmVhZHkgdG8gYmUgaW5zZXJ0ZWQgaW50b1xuICogdGhlIHNlYXJjaCBpbmRleC4gVXNlcyBgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yYCB0byBzcGxpdCBzdHJpbmdzLCBjaGFuZ2VcbiAqIHRoZSB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5IHRvIGNoYW5nZSBob3cgc3RyaW5ncyBhcmUgc3BsaXQgaW50byB0b2tlbnMuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IG9iaiBUaGUgc3RyaW5nIHRvIGNvbnZlcnQgaW50byB0b2tlbnNcbiAqIEBzZWUgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmx1bnIudG9rZW5pemVyID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGggfHwgb2JqID09IG51bGwgfHwgb2JqID09IHVuZGVmaW5lZCkgcmV0dXJuIFtdXG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHJldHVybiBvYmoubWFwKGZ1bmN0aW9uICh0KSB7IHJldHVybiBsdW5yLnV0aWxzLmFzU3RyaW5nKHQpLnRvTG93ZXJDYXNlKCkgfSlcblxuICByZXR1cm4gb2JqLnRvU3RyaW5nKCkudHJpbSgpLnRvTG93ZXJDYXNlKCkuc3BsaXQobHVuci50b2tlbml6ZXIuc2VwYXJhdG9yKVxufVxuXG4vKipcbiAqIFRoZSBzcGVyYXRvciB1c2VkIHRvIHNwbGl0IGEgc3RyaW5nIGludG8gdG9rZW5zLiBPdmVycmlkZSB0aGlzIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgYmVoYXZpb3VyIG9mXG4gKiBgbHVuci50b2tlbml6ZXJgIGJlaGF2aW91ciB3aGVuIHRva2VuaXppbmcgc3RyaW5ncy4gQnkgZGVmYXVsdCB0aGlzIHNwbGl0cyBvbiB3aGl0ZXNwYWNlIGFuZCBoeXBoZW5zLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzZWUgbHVuci50b2tlbml6ZXJcbiAqL1xubHVuci50b2tlbml6ZXIuc2VwYXJhdG9yID0gL1tcXHNcXC1dKy9cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCB0b2tlbml6ZXIuXG4gKlxuICogQSB0b2tlbml6ZXIgZnVuY3Rpb24gdG8gYmUgbG9hZGVkIG11c3QgYWxyZWFkeSBiZSByZWdpc3RlcmVkIHdpdGggbHVuci50b2tlbml6ZXIuXG4gKiBJZiB0aGUgc2VyaWFsaXNlZCB0b2tlbml6ZXIgaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQgdGhlbiBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVGhlIGxhYmVsIG9mIHRoZSBzZXJpYWxpc2VkIHRva2VuaXplci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqIEBtZW1iZXJPZiB0b2tlbml6ZXJcbiAqL1xubHVuci50b2tlbml6ZXIubG9hZCA9IGZ1bmN0aW9uIChsYWJlbCkge1xuICB2YXIgZm4gPSB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnNbbGFiZWxdXG5cbiAgaWYgKCFmbikge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGxvYWQgdW4tcmVnaXN0ZXJlZCBmdW5jdGlvbjogJyArIGxhYmVsKVxuICB9XG5cbiAgcmV0dXJuIGZuXG59XG5cbmx1bnIudG9rZW5pemVyLmxhYmVsID0gJ2RlZmF1bHQnXG5cbmx1bnIudG9rZW5pemVyLnJlZ2lzdGVyZWRGdW5jdGlvbnMgPSB7XG4gICdkZWZhdWx0JzogbHVuci50b2tlbml6ZXJcbn1cblxuLyoqXG4gKiBSZWdpc3RlciBhIHRva2VuaXplciBmdW5jdGlvbi5cbiAqXG4gKiBGdW5jdGlvbnMgdGhhdCBhcmUgdXNlZCBhcyB0b2tlbml6ZXJzIHNob3VsZCBiZSByZWdpc3RlcmVkIGlmIHRoZXkgYXJlIHRvIGJlIHVzZWQgd2l0aCBhIHNlcmlhbGlzZWQgaW5kZXguXG4gKlxuICogUmVnaXN0ZXJpbmcgYSBmdW5jdGlvbiBkb2VzIG5vdCBhZGQgaXQgdG8gYW4gaW5kZXgsIGZ1bmN0aW9ucyBtdXN0IHN0aWxsIGJlIGFzc29jaWF0ZWQgd2l0aCBhIHNwZWNpZmljIGluZGV4IGZvciB0aGVtIHRvIGJlIHVzZWQgd2hlbiBpbmRleGluZyBhbmQgc2VhcmNoaW5nIGRvY3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcmVnaXN0ZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVGhlIGxhYmVsIHRvIHJlZ2lzdGVyIHRoaXMgZnVuY3Rpb24gd2l0aFxuICogQG1lbWJlck9mIHRva2VuaXplclxuICovXG5sdW5yLnRva2VuaXplci5yZWdpc3RlckZ1bmN0aW9uID0gZnVuY3Rpb24gKGZuLCBsYWJlbCkge1xuICBpZiAobGFiZWwgaW4gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdPdmVyd3JpdGluZyBleGlzdGluZyB0b2tlbml6ZXI6ICcgKyBsYWJlbClcbiAgfVxuXG4gIGZuLmxhYmVsID0gbGFiZWxcbiAgdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zW2xhYmVsXSA9IGZuXG59XG4vKiFcbiAqIGx1bnIuUGlwZWxpbmVcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuUGlwZWxpbmVzIG1haW50YWluIGFuIG9yZGVyZWQgbGlzdCBvZiBmdW5jdGlvbnMgdG8gYmUgYXBwbGllZCB0byBhbGxcbiAqIHRva2VucyBpbiBkb2N1bWVudHMgZW50ZXJpbmcgdGhlIHNlYXJjaCBpbmRleCBhbmQgcXVlcmllcyBiZWluZyByYW4gYWdhaW5zdFxuICogdGhlIGluZGV4LlxuICpcbiAqIEFuIGluc3RhbmNlIG9mIGx1bnIuSW5kZXggY3JlYXRlZCB3aXRoIHRoZSBsdW5yIHNob3J0Y3V0IHdpbGwgY29udGFpbiBhXG4gKiBwaXBlbGluZSB3aXRoIGEgc3RvcCB3b3JkIGZpbHRlciBhbmQgYW4gRW5nbGlzaCBsYW5ndWFnZSBzdGVtbWVyLiBFeHRyYVxuICogZnVuY3Rpb25zIGNhbiBiZSBhZGRlZCBiZWZvcmUgb3IgYWZ0ZXIgZWl0aGVyIG9mIHRoZXNlIGZ1bmN0aW9ucyBvciB0aGVzZVxuICogZGVmYXVsdCBmdW5jdGlvbnMgY2FuIGJlIHJlbW92ZWQuXG4gKlxuICogV2hlbiBydW4gdGhlIHBpcGVsaW5lIHdpbGwgY2FsbCBlYWNoIGZ1bmN0aW9uIGluIHR1cm4sIHBhc3NpbmcgYSB0b2tlbiwgdGhlXG4gKiBpbmRleCBvZiB0aGF0IHRva2VuIGluIHRoZSBvcmlnaW5hbCBsaXN0IG9mIGFsbCB0b2tlbnMgYW5kIGZpbmFsbHkgYSBsaXN0IG9mXG4gKiBhbGwgdGhlIG9yaWdpbmFsIHRva2Vucy5cbiAqXG4gKiBUaGUgb3V0cHV0IG9mIGZ1bmN0aW9ucyBpbiB0aGUgcGlwZWxpbmUgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIG5leHQgZnVuY3Rpb25cbiAqIGluIHRoZSBwaXBlbGluZS4gVG8gZXhjbHVkZSBhIHRva2VuIGZyb20gZW50ZXJpbmcgdGhlIGluZGV4IHRoZSBmdW5jdGlvblxuICogc2hvdWxkIHJldHVybiB1bmRlZmluZWQsIHRoZSByZXN0IG9mIHRoZSBwaXBlbGluZSB3aWxsIG5vdCBiZSBjYWxsZWQgd2l0aFxuICogdGhpcyB0b2tlbi5cbiAqXG4gKiBGb3Igc2VyaWFsaXNhdGlvbiBvZiBwaXBlbGluZXMgdG8gd29yaywgYWxsIGZ1bmN0aW9ucyB1c2VkIGluIGFuIGluc3RhbmNlIG9mXG4gKiBhIHBpcGVsaW5lIHNob3VsZCBiZSByZWdpc3RlcmVkIHdpdGggbHVuci5QaXBlbGluZS4gUmVnaXN0ZXJlZCBmdW5jdGlvbnMgY2FuXG4gKiB0aGVuIGJlIGxvYWRlZC4gSWYgdHJ5aW5nIHRvIGxvYWQgYSBzZXJpYWxpc2VkIHBpcGVsaW5lIHRoYXQgdXNlcyBmdW5jdGlvbnNcbiAqIHRoYXQgYXJlIG5vdCByZWdpc3RlcmVkIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICpcbiAqIElmIG5vdCBwbGFubmluZyBvbiBzZXJpYWxpc2luZyB0aGUgcGlwZWxpbmUgdGhlbiByZWdpc3RlcmluZyBwaXBlbGluZSBmdW5jdGlvbnNcbiAqIGlzIG5vdCBuZWNlc3NhcnkuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuUGlwZWxpbmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3N0YWNrID0gW11cbn1cblxubHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zID0ge31cblxuLyoqXG4gKiBSZWdpc3RlciBhIGZ1bmN0aW9uIHdpdGggdGhlIHBpcGVsaW5lLlxuICpcbiAqIEZ1bmN0aW9ucyB0aGF0IGFyZSB1c2VkIGluIHRoZSBwaXBlbGluZSBzaG91bGQgYmUgcmVnaXN0ZXJlZCBpZiB0aGUgcGlwZWxpbmVcbiAqIG5lZWRzIHRvIGJlIHNlcmlhbGlzZWQsIG9yIGEgc2VyaWFsaXNlZCBwaXBlbGluZSBuZWVkcyB0byBiZSBsb2FkZWQuXG4gKlxuICogUmVnaXN0ZXJpbmcgYSBmdW5jdGlvbiBkb2VzIG5vdCBhZGQgaXQgdG8gYSBwaXBlbGluZSwgZnVuY3Rpb25zIG11c3Qgc3RpbGwgYmVcbiAqIGFkZGVkIHRvIGluc3RhbmNlcyBvZiB0aGUgcGlwZWxpbmUgZm9yIHRoZW0gdG8gYmUgdXNlZCB3aGVuIHJ1bm5pbmcgYSBwaXBlbGluZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgZm9yLlxuICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIFRoZSBsYWJlbCB0byByZWdpc3RlciB0aGlzIGZ1bmN0aW9uIHdpdGhcbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4sIGxhYmVsKSB7XG4gIGlmIChsYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ092ZXJ3cml0aW5nIGV4aXN0aW5nIHJlZ2lzdGVyZWQgZnVuY3Rpb246ICcgKyBsYWJlbClcbiAgfVxuXG4gIGZuLmxhYmVsID0gbGFiZWxcbiAgbHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zW2ZuLmxhYmVsXSA9IGZuXG59XG5cbi8qKlxuICogV2FybnMgaWYgdGhlIGZ1bmN0aW9uIGlzIG5vdCByZWdpc3RlcmVkIGFzIGEgUGlwZWxpbmUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIGZvci5cbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGlzUmVnaXN0ZXJlZCA9IGZuLmxhYmVsICYmIChmbi5sYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpXG5cbiAgaWYgKCFpc1JlZ2lzdGVyZWQpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ0Z1bmN0aW9uIGlzIG5vdCByZWdpc3RlcmVkIHdpdGggcGlwZWxpbmUuIFRoaXMgbWF5IGNhdXNlIHByb2JsZW1zIHdoZW4gc2VyaWFsaXNpbmcgdGhlIGluZGV4LlxcbicsIGZuKVxuICB9XG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgcGlwZWxpbmUuXG4gKlxuICogQWxsIGZ1bmN0aW9ucyB0byBiZSBsb2FkZWQgbXVzdCBhbHJlYWR5IGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLlBpcGVsaW5lLlxuICogSWYgYW55IGZ1bmN0aW9uIGZyb20gdGhlIHNlcmlhbGlzZWQgZGF0YSBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZCB0aGVuIGFuXG4gKiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXNlZCBUaGUgc2VyaWFsaXNlZCBwaXBlbGluZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuUGlwZWxpbmV9XG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWQpIHtcbiAgdmFyIHBpcGVsaW5lID0gbmV3IGx1bnIuUGlwZWxpbmVcblxuICBzZXJpYWxpc2VkLmZvckVhY2goZnVuY3Rpb24gKGZuTmFtZSkge1xuICAgIHZhciBmbiA9IGx1bnIuUGlwZWxpbmUucmVnaXN0ZXJlZEZ1bmN0aW9uc1tmbk5hbWVdXG5cbiAgICBpZiAoZm4pIHtcbiAgICAgIHBpcGVsaW5lLmFkZChmbilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgbG9hZCB1bi1yZWdpc3RlcmVkIGZ1bmN0aW9uOiAnICsgZm5OYW1lKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcGlwZWxpbmVcbn1cblxuLyoqXG4gKiBBZGRzIG5ldyBmdW5jdGlvbnMgdG8gdGhlIGVuZCBvZiB0aGUgcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9ucyBBbnkgbnVtYmVyIG9mIGZ1bmN0aW9ucyB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcblxuICBmbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChmbilcbiAgICB0aGlzLl9zdGFjay5wdXNoKGZuKVxuICB9LCB0aGlzKVxufVxuXG4vKipcbiAqIEFkZHMgYSBzaW5nbGUgZnVuY3Rpb24gYWZ0ZXIgYSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZVxuICogcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4aXN0aW5nRm4gQSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZSBwaXBlbGluZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5ld0ZuIFRoZSBuZXcgZnVuY3Rpb24gdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5hZnRlciA9IGZ1bmN0aW9uIChleGlzdGluZ0ZuLCBuZXdGbikge1xuICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChuZXdGbilcblxuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihleGlzdGluZ0ZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBleGlzdGluZ0ZuJylcbiAgfVxuXG4gIHBvcyA9IHBvcyArIDFcbiAgdGhpcy5fc3RhY2suc3BsaWNlKHBvcywgMCwgbmV3Rm4pXG59XG5cbi8qKlxuICogQWRkcyBhIHNpbmdsZSBmdW5jdGlvbiBiZWZvcmUgYSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZVxuICogcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4aXN0aW5nRm4gQSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZSBwaXBlbGluZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5ld0ZuIFRoZSBuZXcgZnVuY3Rpb24gdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5iZWZvcmUgPSBmdW5jdGlvbiAoZXhpc3RpbmdGbiwgbmV3Rm4pIHtcbiAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQobmV3Rm4pXG5cbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZXhpc3RpbmdGbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgZXhpc3RpbmdGbicpXG4gIH1cblxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAwLCBuZXdGbilcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgZnVuY3Rpb24gZnJvbSB0aGUgcGlwZWxpbmUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZm4pXG4gIGlmIChwb3MgPT0gLTEpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDEpXG59XG5cbi8qKlxuICogUnVucyB0aGUgY3VycmVudCBsaXN0IG9mIGZ1bmN0aW9ucyB0aGF0IG1ha2UgdXAgdGhlIHBpcGVsaW5lIGFnYWluc3QgdGhlXG4gKiBwYXNzZWQgdG9rZW5zLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHRva2VucyBUaGUgdG9rZW5zIHRvIHJ1biB0aHJvdWdoIHRoZSBwaXBlbGluZS5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAodG9rZW5zKSB7XG4gIHZhciBvdXQgPSBbXSxcbiAgICAgIHRva2VuTGVuZ3RoID0gdG9rZW5zLmxlbmd0aCxcbiAgICAgIHN0YWNrTGVuZ3RoID0gdGhpcy5fc3RhY2subGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbkxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN0YWNrTGVuZ3RoOyBqKyspIHtcbiAgICAgIHRva2VuID0gdGhpcy5fc3RhY2tbal0odG9rZW4sIGksIHRva2VucylcbiAgICAgIGlmICh0b2tlbiA9PT0gdm9pZCAwIHx8IHRva2VuID09PSAnJykgYnJlYWtcbiAgICB9O1xuXG4gICAgaWYgKHRva2VuICE9PSB2b2lkIDAgJiYgdG9rZW4gIT09ICcnKSBvdXQucHVzaCh0b2tlbilcbiAgfTtcblxuICByZXR1cm4gb3V0XG59XG5cbi8qKlxuICogUmVzZXRzIHRoZSBwaXBlbGluZSBieSByZW1vdmluZyBhbnkgZXhpc3RpbmcgcHJvY2Vzc29ycy5cbiAqXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3N0YWNrID0gW11cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHBpcGVsaW5lIHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fc3RhY2subWFwKGZ1bmN0aW9uIChmbikge1xuICAgIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKGZuKVxuXG4gICAgcmV0dXJuIGZuLmxhYmVsXG4gIH0pXG59XG4vKiFcbiAqIGx1bnIuVmVjdG9yXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlZlY3RvcnMgaW1wbGVtZW50IHZlY3RvciByZWxhdGVkIG9wZXJhdGlvbnMgZm9yXG4gKiBhIHNlcmllcyBvZiBlbGVtZW50cy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5WZWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX21hZ25pdHVkZSA9IG51bGxcbiAgdGhpcy5saXN0ID0gdW5kZWZpbmVkXG4gIHRoaXMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIGx1bnIuVmVjdG9yLk5vZGUgaXMgYSBzaW1wbGUgc3RydWN0IGZvciBlYWNoIG5vZGVcbiAqIGluIGEgbHVuci5WZWN0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIG5vZGUgaW4gdGhlIHZlY3Rvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgZGF0YSBhdCB0aGlzIG5vZGUgaW4gdGhlIHZlY3Rvci5cbiAqIEBwYXJhbSB7bHVuci5WZWN0b3IuTm9kZX0gVGhlIG5vZGUgZGlyZWN0bHkgYWZ0ZXIgdGhpcyBub2RlIGluIHRoZSB2ZWN0b3IuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IuTm9kZSA9IGZ1bmN0aW9uIChpZHgsIHZhbCwgbmV4dCkge1xuICB0aGlzLmlkeCA9IGlkeFxuICB0aGlzLnZhbCA9IHZhbFxuICB0aGlzLm5leHQgPSBuZXh0XG59XG5cbi8qKlxuICogSW5zZXJ0cyBhIG5ldyB2YWx1ZSBhdCBhIHBvc2l0aW9uIGluIGEgdmVjdG9yLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgaW5kZXggYXQgd2hpY2ggdG8gaW5zZXJ0IGEgdmFsdWUuXG4gKiBAcGFyYW0ge09iamVjdH0gVGhlIG9iamVjdCB0byBpbnNlcnQgaW4gdGhlIHZlY3Rvci5cbiAqIEBtZW1iZXJPZiBWZWN0b3IuXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoaWR4LCB2YWwpIHtcbiAgdGhpcy5fbWFnbml0dWRlID0gdW5kZWZpbmVkO1xuICB2YXIgbGlzdCA9IHRoaXMubGlzdFxuXG4gIGlmICghbGlzdCkge1xuICAgIHRoaXMubGlzdCA9IG5ldyBsdW5yLlZlY3Rvci5Ob2RlIChpZHgsIHZhbCwgbGlzdClcbiAgICByZXR1cm4gdGhpcy5sZW5ndGgrK1xuICB9XG5cbiAgaWYgKGlkeCA8IGxpc3QuaWR4KSB7XG4gICAgdGhpcy5saXN0ID0gbmV3IGx1bnIuVmVjdG9yLk5vZGUgKGlkeCwgdmFsLCBsaXN0KVxuICAgIHJldHVybiB0aGlzLmxlbmd0aCsrXG4gIH1cblxuICB2YXIgcHJldiA9IGxpc3QsXG4gICAgICBuZXh0ID0gbGlzdC5uZXh0XG5cbiAgd2hpbGUgKG5leHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGlkeCA8IG5leHQuaWR4KSB7XG4gICAgICBwcmV2Lm5leHQgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIG5leHQpXG4gICAgICByZXR1cm4gdGhpcy5sZW5ndGgrK1xuICAgIH1cblxuICAgIHByZXYgPSBuZXh0LCBuZXh0ID0gbmV4dC5uZXh0XG4gIH1cblxuICBwcmV2Lm5leHQgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIG5leHQpXG4gIHJldHVybiB0aGlzLmxlbmd0aCsrXG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWFnbml0dWRlIG9mIHRoaXMgdmVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgVmVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5tYWduaXR1ZGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLl9tYWduaXR1ZGUpIHJldHVybiB0aGlzLl9tYWduaXR1ZGVcbiAgdmFyIG5vZGUgPSB0aGlzLmxpc3QsXG4gICAgICBzdW1PZlNxdWFyZXMgPSAwLFxuICAgICAgdmFsXG5cbiAgd2hpbGUgKG5vZGUpIHtcbiAgICB2YWwgPSBub2RlLnZhbFxuICAgIHN1bU9mU3F1YXJlcyArPSB2YWwgKiB2YWxcbiAgICBub2RlID0gbm9kZS5uZXh0XG4gIH1cblxuICByZXR1cm4gdGhpcy5fbWFnbml0dWRlID0gTWF0aC5zcXJ0KHN1bU9mU3F1YXJlcylcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlciB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvcn0gb3RoZXJWZWN0b3IgVGhlIHZlY3RvciB0byBjb21wdXRlIHRoZSBkb3QgcHJvZHVjdCB3aXRoLlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIChvdGhlclZlY3Rvcikge1xuICB2YXIgbm9kZSA9IHRoaXMubGlzdCxcbiAgICAgIG90aGVyTm9kZSA9IG90aGVyVmVjdG9yLmxpc3QsXG4gICAgICBkb3RQcm9kdWN0ID0gMFxuXG4gIHdoaWxlIChub2RlICYmIG90aGVyTm9kZSkge1xuICAgIGlmIChub2RlLmlkeCA8IG90aGVyTm9kZS5pZHgpIHtcbiAgICAgIG5vZGUgPSBub2RlLm5leHRcbiAgICB9IGVsc2UgaWYgKG5vZGUuaWR4ID4gb3RoZXJOb2RlLmlkeCkge1xuICAgICAgb3RoZXJOb2RlID0gb3RoZXJOb2RlLm5leHRcbiAgICB9IGVsc2Uge1xuICAgICAgZG90UHJvZHVjdCArPSBub2RlLnZhbCAqIG90aGVyTm9kZS52YWxcbiAgICAgIG5vZGUgPSBub2RlLm5leHRcbiAgICAgIG90aGVyTm9kZSA9IG90aGVyTm9kZS5uZXh0XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRvdFByb2R1Y3Rcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb3NpbmUgc2ltaWxhcml0eSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKiB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvcn0gb3RoZXJWZWN0b3IgVGhlIG90aGVyIHZlY3RvciB0byBjYWxjdWxhdGUgdGhlXG4gKiBzaW1pbGFyaXR5IHdpdGguXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFZlY3RvclxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUuc2ltaWxhcml0eSA9IGZ1bmN0aW9uIChvdGhlclZlY3Rvcikge1xuICByZXR1cm4gdGhpcy5kb3Qob3RoZXJWZWN0b3IpIC8gKHRoaXMubWFnbml0dWRlKCkgKiBvdGhlclZlY3Rvci5tYWduaXR1ZGUoKSlcbn1cbi8qIVxuICogbHVuci5Tb3J0ZWRTZXRcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuU29ydGVkU2V0cyBhcmUgdXNlZCB0byBtYWludGFpbiBhbiBhcnJheSBvZiB1bmlxIHZhbHVlcyBpbiBhIHNvcnRlZFxuICogb3JkZXIuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuU29ydGVkU2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmxlbmd0aCA9IDBcbiAgdGhpcy5lbGVtZW50cyA9IFtdXG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgc29ydGVkIHNldC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkRGF0YSkge1xuICB2YXIgc2V0ID0gbmV3IHRoaXNcblxuICBzZXQuZWxlbWVudHMgPSBzZXJpYWxpc2VkRGF0YVxuICBzZXQubGVuZ3RoID0gc2VyaWFsaXNlZERhdGEubGVuZ3RoXG5cbiAgcmV0dXJuIHNldFxufVxuXG4vKipcbiAqIEluc2VydHMgbmV3IGl0ZW1zIGludG8gdGhlIHNldCBpbiB0aGUgY29ycmVjdCBwb3NpdGlvbiB0byBtYWludGFpbiB0aGVcbiAqIG9yZGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgb2JqZWN0cyB0byBhZGQgdG8gdGhpcyBzZXQuXG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpLCBlbGVtZW50XG5cbiAgZm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGVsZW1lbnQgPSBhcmd1bWVudHNbaV1cbiAgICBpZiAofnRoaXMuaW5kZXhPZihlbGVtZW50KSkgY29udGludWVcbiAgICB0aGlzLmVsZW1lbnRzLnNwbGljZSh0aGlzLmxvY2F0aW9uRm9yKGVsZW1lbnQpLCAwLCBlbGVtZW50KVxuICB9XG5cbiAgdGhpcy5sZW5ndGggPSB0aGlzLmVsZW1lbnRzLmxlbmd0aFxufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgc29ydGVkIHNldCBpbnRvIGFuIGFycmF5LlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmVsZW1lbnRzLnNsaWNlKClcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGFycmF5IHdpdGggdGhlIHJlc3VsdHMgb2YgY2FsbGluZyBhIHByb3ZpZGVkIGZ1bmN0aW9uIG9uIGV2ZXJ5XG4gKiBlbGVtZW50IGluIHRoaXMgc29ydGVkIHNldC5cbiAqXG4gKiBEZWxlZ2F0ZXMgdG8gQXJyYXkucHJvdG90eXBlLm1hcCBhbmQgaGFzIHRoZSBzYW1lIHNpZ25hdHVyZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgb24gZWFjaCBlbGVtZW50IG9mIHRoZVxuICogc2V0LlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBBbiBvcHRpb25hbCBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgY29udGV4dFxuICogZm9yIHRoZSBmdW5jdGlvbiBmbi5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmbiwgY3R4KSB7XG4gIHJldHVybiB0aGlzLmVsZW1lbnRzLm1hcChmbiwgY3R4KVxufVxuXG4vKipcbiAqIEV4ZWN1dGVzIGEgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBwZXIgc29ydGVkIHNldCBlbGVtZW50LlxuICpcbiAqIERlbGVnYXRlcyB0byBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCBhbmQgaGFzIHRoZSBzYW1lIHNpZ25hdHVyZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgb24gZWFjaCBlbGVtZW50IG9mIHRoZVxuICogc2V0LlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBBbiBvcHRpb25hbCBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgY29udGV4dFxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICogZm9yIHRoZSBmdW5jdGlvbiBmbi5cbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoZm4sIGN0eCkge1xuICByZXR1cm4gdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZuLCBjdHgpXG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW5kZXggYXQgd2hpY2ggYSBnaXZlbiBlbGVtZW50IGNhbiBiZSBmb3VuZCBpbiB0aGVcbiAqIHNvcnRlZCBzZXQsIG9yIC0xIGlmIGl0IGlzIG5vdCBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIFRoZSBvYmplY3QgdG8gbG9jYXRlIGluIHRoZSBzb3J0ZWQgc2V0LlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoZWxlbSkge1xuICB2YXIgc3RhcnQgPSAwLFxuICAgICAgZW5kID0gdGhpcy5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnQsXG4gICAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMiksXG4gICAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuXG4gIHdoaWxlIChzZWN0aW9uTGVuZ3RoID4gMSkge1xuICAgIGlmIChwaXZvdEVsZW0gPT09IGVsZW0pIHJldHVybiBwaXZvdFxuXG4gICAgaWYgKHBpdm90RWxlbSA8IGVsZW0pIHN0YXJ0ID0gcGl2b3RcbiAgICBpZiAocGl2b3RFbGVtID4gZWxlbSkgZW5kID0gcGl2b3RcblxuICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydFxuICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKVxuICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG4gIH1cblxuICBpZiAocGl2b3RFbGVtID09PSBlbGVtKSByZXR1cm4gcGl2b3RcblxuICByZXR1cm4gLTFcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiB3aXRoaW4gdGhlIHNvcnRlZCBzZXQgdGhhdCBhbiBlbGVtZW50IHNob3VsZCBiZVxuICogaW5zZXJ0ZWQgYXQgdG8gbWFpbnRhaW4gdGhlIGN1cnJlbnQgb3JkZXIgb2YgdGhlIHNldC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCB0aGUgZWxlbWVudCB0byBzZWFyY2ggZm9yIGRvZXMgbm90IGFscmVhZHkgZXhpc3RcbiAqIGluIHRoZSBzb3J0ZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIFRoZSBlbGVtIHRvIGZpbmQgdGhlIHBvc2l0aW9uIGZvciBpbiB0aGUgc2V0XG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUubG9jYXRpb25Gb3IgPSBmdW5jdGlvbiAoZWxlbSkge1xuICB2YXIgc3RhcnQgPSAwLFxuICAgICAgZW5kID0gdGhpcy5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnQsXG4gICAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMiksXG4gICAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuXG4gIHdoaWxlIChzZWN0aW9uTGVuZ3RoID4gMSkge1xuICAgIGlmIChwaXZvdEVsZW0gPCBlbGVtKSBzdGFydCA9IHBpdm90XG4gICAgaWYgKHBpdm90RWxlbSA+IGVsZW0pIGVuZCA9IHBpdm90XG5cbiAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnRcbiAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMilcbiAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuICB9XG5cbiAgaWYgKHBpdm90RWxlbSA+IGVsZW0pIHJldHVybiBwaXZvdFxuICBpZiAocGl2b3RFbGVtIDwgZWxlbSkgcmV0dXJuIHBpdm90ICsgMVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbHVuci5Tb3J0ZWRTZXQgdGhhdCBjb250YWlucyB0aGUgZWxlbWVudHMgaW4gdGhlIGludGVyc2VjdGlvblxuICogb2YgdGhpcyBzZXQgYW5kIHRoZSBwYXNzZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7bHVuci5Tb3J0ZWRTZXR9IG90aGVyU2V0IFRoZSBzZXQgdG8gaW50ZXJzZWN0IHdpdGggdGhpcyBzZXQuXG4gKiBAcmV0dXJucyB7bHVuci5Tb3J0ZWRTZXR9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5pbnRlcnNlY3QgPSBmdW5jdGlvbiAob3RoZXJTZXQpIHtcbiAgdmFyIGludGVyc2VjdFNldCA9IG5ldyBsdW5yLlNvcnRlZFNldCxcbiAgICAgIGkgPSAwLCBqID0gMCxcbiAgICAgIGFfbGVuID0gdGhpcy5sZW5ndGgsIGJfbGVuID0gb3RoZXJTZXQubGVuZ3RoLFxuICAgICAgYSA9IHRoaXMuZWxlbWVudHMsIGIgPSBvdGhlclNldC5lbGVtZW50c1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgaWYgKGkgPiBhX2xlbiAtIDEgfHwgaiA+IGJfbGVuIC0gMSkgYnJlYWtcblxuICAgIGlmIChhW2ldID09PSBiW2pdKSB7XG4gICAgICBpbnRlcnNlY3RTZXQuYWRkKGFbaV0pXG4gICAgICBpKyssIGorK1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoYVtpXSA8IGJbal0pIHtcbiAgICAgIGkrK1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoYVtpXSA+IGJbal0pIHtcbiAgICAgIGorK1xuICAgICAgY29udGludWVcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGludGVyc2VjdFNldFxufVxuXG4vKipcbiAqIE1ha2VzIGEgY29weSBvZiB0aGlzIHNldFxuICpcbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY2xvbmUgPSBuZXcgbHVuci5Tb3J0ZWRTZXRcblxuICBjbG9uZS5lbGVtZW50cyA9IHRoaXMudG9BcnJheSgpXG4gIGNsb25lLmxlbmd0aCA9IGNsb25lLmVsZW1lbnRzLmxlbmd0aFxuXG4gIHJldHVybiBjbG9uZVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbHVuci5Tb3J0ZWRTZXQgdGhhdCBjb250YWlucyB0aGUgZWxlbWVudHMgaW4gdGhlIHVuaW9uXG4gKiBvZiB0aGlzIHNldCBhbmQgdGhlIHBhc3NlZCBzZXQuXG4gKlxuICogQHBhcmFtIHtsdW5yLlNvcnRlZFNldH0gb3RoZXJTZXQgVGhlIHNldCB0byB1bmlvbiB3aXRoIHRoaXMgc2V0LlxuICogQHJldHVybnMge2x1bnIuU29ydGVkU2V0fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUudW5pb24gPSBmdW5jdGlvbiAob3RoZXJTZXQpIHtcbiAgdmFyIGxvbmdTZXQsIHNob3J0U2V0LCB1bmlvblNldFxuXG4gIGlmICh0aGlzLmxlbmd0aCA+PSBvdGhlclNldC5sZW5ndGgpIHtcbiAgICBsb25nU2V0ID0gdGhpcywgc2hvcnRTZXQgPSBvdGhlclNldFxuICB9IGVsc2Uge1xuICAgIGxvbmdTZXQgPSBvdGhlclNldCwgc2hvcnRTZXQgPSB0aGlzXG4gIH1cblxuICB1bmlvblNldCA9IGxvbmdTZXQuY2xvbmUoKVxuXG4gIGZvcih2YXIgaSA9IDAsIHNob3J0U2V0RWxlbWVudHMgPSBzaG9ydFNldC50b0FycmF5KCk7IGkgPCBzaG9ydFNldEVsZW1lbnRzLmxlbmd0aDsgaSsrKXtcbiAgICB1bmlvblNldC5hZGQoc2hvcnRTZXRFbGVtZW50c1tpXSlcbiAgfVxuXG4gIHJldHVybiB1bmlvblNldFxufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc29ydGVkIHNldCByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRvQXJyYXkoKVxufVxuLyohXG4gKiBsdW5yLkluZGV4XG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLkluZGV4IGlzIG9iamVjdCB0aGF0IG1hbmFnZXMgYSBzZWFyY2ggaW5kZXguICBJdCBjb250YWlucyB0aGUgaW5kZXhlc1xuICogYW5kIHN0b3JlcyBhbGwgdGhlIHRva2VucyBhbmQgZG9jdW1lbnQgbG9va3Vwcy4gIEl0IGFsc28gcHJvdmlkZXMgdGhlIG1haW5cbiAqIHVzZXIgZmFjaW5nIEFQSSBmb3IgdGhlIGxpYnJhcnkuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuSW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2ZpZWxkcyA9IFtdXG4gIHRoaXMuX3JlZiA9ICdpZCdcbiAgdGhpcy5waXBlbGluZSA9IG5ldyBsdW5yLlBpcGVsaW5lXG4gIHRoaXMuZG9jdW1lbnRTdG9yZSA9IG5ldyBsdW5yLlN0b3JlXG4gIHRoaXMudG9rZW5TdG9yZSA9IG5ldyBsdW5yLlRva2VuU3RvcmVcbiAgdGhpcy5jb3JwdXNUb2tlbnMgPSBuZXcgbHVuci5Tb3J0ZWRTZXRcbiAgdGhpcy5ldmVudEVtaXR0ZXIgPSAgbmV3IGx1bnIuRXZlbnRFbWl0dGVyXG4gIHRoaXMudG9rZW5pemVyRm4gPSBsdW5yLnRva2VuaXplclxuXG4gIHRoaXMuX2lkZkNhY2hlID0ge31cblxuICB0aGlzLm9uKCdhZGQnLCAncmVtb3ZlJywgJ3VwZGF0ZScsIChmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faWRmQ2FjaGUgPSB7fVxuICB9KS5iaW5kKHRoaXMpKVxufVxuXG4vKipcbiAqIEJpbmQgYSBoYW5kbGVyIHRvIGV2ZW50cyBiZWluZyBlbWl0dGVkIGJ5IHRoZSBpbmRleC5cbiAqXG4gKiBUaGUgaGFuZGxlciBjYW4gYmUgYm91bmQgdG8gbWFueSBldmVudHMgYXQgdGhlIHNhbWUgdGltZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gW2V2ZW50TmFtZV0gVGhlIG5hbWUocykgb2YgZXZlbnRzIHRvIGJpbmQgdGhlIGZ1bmN0aW9uIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHNlcmlhbGlzZWQgc2V0IHRvIGxvYWQuXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICByZXR1cm4gdGhpcy5ldmVudEVtaXR0ZXIuYWRkTGlzdGVuZXIuYXBwbHkodGhpcy5ldmVudEVtaXR0ZXIsIGFyZ3MpXG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGhhbmRsZXIgZnJvbSBhbiBldmVudCBiZWluZyBlbWl0dGVkIGJ5IHRoZSBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIGV2ZW50cyB0byByZW1vdmUgdGhlIGZ1bmN0aW9uIGZyb20uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgcmV0dXJuIHRoaXMuZXZlbnRFbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIGZuKVxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIGluZGV4LlxuICpcbiAqIElzc3VlcyBhIHdhcm5pbmcgaWYgdGhlIGluZGV4IGJlaW5nIGltcG9ydGVkIHdhcyBzZXJpYWxpc2VkXG4gKiBieSBhIGRpZmZlcmVudCB2ZXJzaW9uIG9mIGx1bnIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHNldCB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIGlmIChzZXJpYWxpc2VkRGF0YS52ZXJzaW9uICE9PSBsdW5yLnZlcnNpb24pIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ3ZlcnNpb24gbWlzbWF0Y2g6IGN1cnJlbnQgJyArIGx1bnIudmVyc2lvbiArICcgaW1wb3J0aW5nICcgKyBzZXJpYWxpc2VkRGF0YS52ZXJzaW9uKVxuICB9XG5cbiAgdmFyIGlkeCA9IG5ldyB0aGlzXG5cbiAgaWR4Ll9maWVsZHMgPSBzZXJpYWxpc2VkRGF0YS5maWVsZHNcbiAgaWR4Ll9yZWYgPSBzZXJpYWxpc2VkRGF0YS5yZWZcblxuICBpZHgudG9rZW5pemVyKGx1bnIudG9rZW5pemVyLmxvYWQoc2VyaWFsaXNlZERhdGEudG9rZW5pemVyKSlcbiAgaWR4LmRvY3VtZW50U3RvcmUgPSBsdW5yLlN0b3JlLmxvYWQoc2VyaWFsaXNlZERhdGEuZG9jdW1lbnRTdG9yZSlcbiAgaWR4LnRva2VuU3RvcmUgPSBsdW5yLlRva2VuU3RvcmUubG9hZChzZXJpYWxpc2VkRGF0YS50b2tlblN0b3JlKVxuICBpZHguY29ycHVzVG9rZW5zID0gbHVuci5Tb3J0ZWRTZXQubG9hZChzZXJpYWxpc2VkRGF0YS5jb3JwdXNUb2tlbnMpXG4gIGlkeC5waXBlbGluZSA9IGx1bnIuUGlwZWxpbmUubG9hZChzZXJpYWxpc2VkRGF0YS5waXBlbGluZSlcblxuICByZXR1cm4gaWR4XG59XG5cbi8qKlxuICogQWRkcyBhIGZpZWxkIHRvIHRoZSBsaXN0IG9mIGZpZWxkcyB0aGF0IHdpbGwgYmUgc2VhcmNoYWJsZSB3aXRoaW4gZG9jdW1lbnRzXG4gKiBpbiB0aGUgaW5kZXguXG4gKlxuICogQW4gb3B0aW9uYWwgYm9vc3QgcGFyYW0gY2FuIGJlIHBhc3NlZCB0byBhZmZlY3QgaG93IG11Y2ggdG9rZW5zIGluIHRoaXMgZmllbGRcbiAqIHJhbmsgaW4gc2VhcmNoIHJlc3VsdHMsIGJ5IGRlZmF1bHQgdGhlIGJvb3N0IHZhbHVlIGlzIDEuXG4gKlxuICogRmllbGRzIHNob3VsZCBiZSBhZGRlZCBiZWZvcmUgYW55IGRvY3VtZW50cyBhcmUgYWRkZWQgdG8gdGhlIGluZGV4LCBmaWVsZHNcbiAqIHRoYXQgYXJlIGFkZGVkIGFmdGVyIGRvY3VtZW50cyBhcmUgYWRkZWQgdG8gdGhlIGluZGV4IHdpbGwgb25seSBhcHBseSB0byBuZXdcbiAqIGRvY3VtZW50cyBhZGRlZCB0byB0aGUgaW5kZXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkTmFtZSBUaGUgbmFtZSBvZiB0aGUgZmllbGQgd2l0aGluIHRoZSBkb2N1bWVudCB0aGF0XG4gKiBzaG91bGQgYmUgaW5kZXhlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGJvb3N0IEFuIG9wdGlvbmFsIGJvb3N0IHRoYXQgY2FuIGJlIGFwcGxpZWQgdG8gdGVybXMgaW4gdGhpc1xuICogZmllbGQuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5maWVsZCA9IGZ1bmN0aW9uIChmaWVsZE5hbWUsIG9wdHMpIHtcbiAgdmFyIG9wdHMgPSBvcHRzIHx8IHt9LFxuICAgICAgZmllbGQgPSB7IG5hbWU6IGZpZWxkTmFtZSwgYm9vc3Q6IG9wdHMuYm9vc3QgfHwgMSB9XG5cbiAgdGhpcy5fZmllbGRzLnB1c2goZmllbGQpXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogU2V0cyB0aGUgcHJvcGVydHkgdXNlZCB0byB1bmlxdWVseSBpZGVudGlmeSBkb2N1bWVudHMgYWRkZWQgdG8gdGhlIGluZGV4LFxuICogYnkgZGVmYXVsdCB0aGlzIHByb3BlcnR5IGlzICdpZCcuXG4gKlxuICogVGhpcyBzaG91bGQgb25seSBiZSBjaGFuZ2VkIGJlZm9yZSBhZGRpbmcgZG9jdW1lbnRzIHRvIHRoZSBpbmRleCwgY2hhbmdpbmdcbiAqIHRoZSByZWYgcHJvcGVydHkgd2l0aG91dCByZXNldHRpbmcgdGhlIGluZGV4IGNhbiBsZWFkIHRvIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAqXG4gKiBUaGUgdmFsdWUgb2YgcmVmIGNhbiBiZSBvZiBhbnkgdHlwZSBidXQgaXQgX211c3RfIGJlIHN0YWJseSBjb21wYXJhYmxlIGFuZFxuICogb3JkZXJhYmxlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWZOYW1lIFRoZSBwcm9wZXJ0eSB0byB1c2UgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhlXG4gKiBkb2N1bWVudHMgaW4gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciB0byBlbWl0IGFkZCBldmVudHMsIGRlZmF1bHRzIHRvIHRydWVcbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uIChyZWZOYW1lKSB7XG4gIHRoaXMuX3JlZiA9IHJlZk5hbWVcbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSB0b2tlbml6ZXIgdXNlZCBmb3IgdGhpcyBpbmRleC5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoZSBpbmRleCB3aWxsIHVzZSB0aGUgZGVmYXVsdCB0b2tlbml6ZXIsIGx1bnIudG9rZW5pemVyLiBUaGUgdG9rZW5pemVyXG4gKiBzaG91bGQgb25seSBiZSBjaGFuZ2VkIGJlZm9yZSBhZGRpbmcgZG9jdW1lbnRzIHRvIHRoZSBpbmRleC4gQ2hhbmdpbmcgdGhlIHRva2VuaXplclxuICogd2l0aG91dCByZS1idWlsZGluZyB0aGUgaW5kZXggY2FuIGxlYWQgdG8gdW5leHBlY3RlZCByZXN1bHRzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byB1c2UgYXMgYSB0b2tlbml6ZXIuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS50b2tlbml6ZXIgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGlzUmVnaXN0ZXJlZCA9IGZuLmxhYmVsICYmIChmbi5sYWJlbCBpbiBsdW5yLnRva2VuaXplci5yZWdpc3RlcmVkRnVuY3Rpb25zKVxuXG4gIGlmICghaXNSZWdpc3RlcmVkKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdGdW5jdGlvbiBpcyBub3QgYSByZWdpc3RlcmVkIHRva2VuaXplci4gVGhpcyBtYXkgY2F1c2UgcHJvYmxlbXMgd2hlbiBzZXJpYWxpc2luZyB0aGUgaW5kZXgnKVxuICB9XG5cbiAgdGhpcy50b2tlbml6ZXJGbiA9IGZuXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQWRkIGEgZG9jdW1lbnQgdG8gdGhlIGluZGV4LlxuICpcbiAqIFRoaXMgaXMgdGhlIHdheSBuZXcgZG9jdW1lbnRzIGVudGVyIHRoZSBpbmRleCwgdGhpcyBmdW5jdGlvbiB3aWxsIHJ1biB0aGVcbiAqIGZpZWxkcyBmcm9tIHRoZSBkb2N1bWVudCB0aHJvdWdoIHRoZSBpbmRleCdzIHBpcGVsaW5lIGFuZCB0aGVuIGFkZCBpdCB0b1xuICogdGhlIGluZGV4LCBpdCB3aWxsIHRoZW4gc2hvdyB1cCBpbiBzZWFyY2ggcmVzdWx0cy5cbiAqXG4gKiBBbiAnYWRkJyBldmVudCBpcyBlbWl0dGVkIHdpdGggdGhlIGRvY3VtZW50IHRoYXQgaGFzIGJlZW4gYWRkZWQgYW5kIHRoZSBpbmRleFxuICogdGhlIGRvY3VtZW50IGhhcyBiZWVuIGFkZGVkIHRvLiBUaGlzIGV2ZW50IGNhbiBiZSBzaWxlbmNlZCBieSBwYXNzaW5nIGZhbHNlXG4gKiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGFkZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIFRoZSBkb2N1bWVudCB0byBhZGQgdG8gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciBvciBub3QgdG8gZW1pdCBldmVudHMsIGRlZmF1bHQgdHJ1ZS5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZG9jLCBlbWl0RXZlbnQpIHtcbiAgdmFyIGRvY1Rva2VucyA9IHt9LFxuICAgICAgYWxsRG9jdW1lbnRUb2tlbnMgPSBuZXcgbHVuci5Tb3J0ZWRTZXQsXG4gICAgICBkb2NSZWYgPSBkb2NbdGhpcy5fcmVmXSxcbiAgICAgIGVtaXRFdmVudCA9IGVtaXRFdmVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGVtaXRFdmVudFxuXG4gIHRoaXMuX2ZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgIHZhciBmaWVsZFRva2VucyA9IHRoaXMucGlwZWxpbmUucnVuKHRoaXMudG9rZW5pemVyRm4oZG9jW2ZpZWxkLm5hbWVdKSlcblxuICAgIGRvY1Rva2Vuc1tmaWVsZC5uYW1lXSA9IGZpZWxkVG9rZW5zXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkVG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdG9rZW4gPSBmaWVsZFRva2Vuc1tpXVxuICAgICAgYWxsRG9jdW1lbnRUb2tlbnMuYWRkKHRva2VuKVxuICAgICAgdGhpcy5jb3JwdXNUb2tlbnMuYWRkKHRva2VuKVxuICAgIH1cbiAgfSwgdGhpcylcblxuICB0aGlzLmRvY3VtZW50U3RvcmUuc2V0KGRvY1JlZiwgYWxsRG9jdW1lbnRUb2tlbnMpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxEb2N1bWVudFRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IGFsbERvY3VtZW50VG9rZW5zLmVsZW1lbnRzW2ldXG4gICAgdmFyIHRmID0gMDtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5fZmllbGRzLmxlbmd0aDsgaisrKXtcbiAgICAgIHZhciBmaWVsZCA9IHRoaXMuX2ZpZWxkc1tqXVxuICAgICAgdmFyIGZpZWxkVG9rZW5zID0gZG9jVG9rZW5zW2ZpZWxkLm5hbWVdXG4gICAgICB2YXIgZmllbGRMZW5ndGggPSBmaWVsZFRva2Vucy5sZW5ndGhcblxuICAgICAgaWYgKCFmaWVsZExlbmd0aCkgY29udGludWVcblxuICAgICAgdmFyIHRva2VuQ291bnQgPSAwXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IGZpZWxkTGVuZ3RoOyBrKyspe1xuICAgICAgICBpZiAoZmllbGRUb2tlbnNba10gPT09IHRva2VuKXtcbiAgICAgICAgICB0b2tlbkNvdW50KytcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0ZiArPSAodG9rZW5Db3VudCAvIGZpZWxkTGVuZ3RoICogZmllbGQuYm9vc3QpXG4gICAgfVxuXG4gICAgdGhpcy50b2tlblN0b3JlLmFkZCh0b2tlbiwgeyByZWY6IGRvY1JlZiwgdGY6IHRmIH0pXG4gIH07XG5cbiAgaWYgKGVtaXRFdmVudCkgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnYWRkJywgZG9jLCB0aGlzKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBkb2N1bWVudCBmcm9tIHRoZSBpbmRleC5cbiAqXG4gKiBUbyBtYWtlIHN1cmUgZG9jdW1lbnRzIG5vIGxvbmdlciBzaG93IHVwIGluIHNlYXJjaCByZXN1bHRzIHRoZXkgY2FuIGJlXG4gKiByZW1vdmVkIGZyb20gdGhlIGluZGV4IHVzaW5nIHRoaXMgbWV0aG9kLlxuICpcbiAqIFRoZSBkb2N1bWVudCBwYXNzZWQgb25seSBuZWVkcyB0byBoYXZlIHRoZSBzYW1lIHJlZiBwcm9wZXJ0eSB2YWx1ZSBhcyB0aGVcbiAqIGRvY3VtZW50IHRoYXQgd2FzIGFkZGVkIHRvIHRoZSBpbmRleCwgdGhleSBjb3VsZCBiZSBjb21wbGV0ZWx5IGRpZmZlcmVudFxuICogb2JqZWN0cy5cbiAqXG4gKiBBICdyZW1vdmUnIGV2ZW50IGlzIGVtaXR0ZWQgd2l0aCB0aGUgZG9jdW1lbnQgdGhhdCBoYXMgYmVlbiByZW1vdmVkIGFuZCB0aGUgaW5kZXhcbiAqIHRoZSBkb2N1bWVudCBoYXMgYmVlbiByZW1vdmVkIGZyb20uIFRoaXMgZXZlbnQgY2FuIGJlIHNpbGVuY2VkIGJ5IHBhc3NpbmcgZmFsc2VcbiAqIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gcmVtb3ZlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvY3VtZW50IHRvIHJlbW92ZSBmcm9tIHRoZSBpbmRleC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZW1pdEV2ZW50IFdoZXRoZXIgdG8gZW1pdCByZW1vdmUgZXZlbnRzLCBkZWZhdWx0cyB0byB0cnVlXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGRvYywgZW1pdEV2ZW50KSB7XG4gIHZhciBkb2NSZWYgPSBkb2NbdGhpcy5fcmVmXSxcbiAgICAgIGVtaXRFdmVudCA9IGVtaXRFdmVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGVtaXRFdmVudFxuXG4gIGlmICghdGhpcy5kb2N1bWVudFN0b3JlLmhhcyhkb2NSZWYpKSByZXR1cm5cblxuICB2YXIgZG9jVG9rZW5zID0gdGhpcy5kb2N1bWVudFN0b3JlLmdldChkb2NSZWYpXG5cbiAgdGhpcy5kb2N1bWVudFN0b3JlLnJlbW92ZShkb2NSZWYpXG5cbiAgZG9jVG9rZW5zLmZvckVhY2goZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy50b2tlblN0b3JlLnJlbW92ZSh0b2tlbiwgZG9jUmVmKVxuICB9LCB0aGlzKVxuXG4gIGlmIChlbWl0RXZlbnQpIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ3JlbW92ZScsIGRvYywgdGhpcylcbn1cblxuLyoqXG4gKiBVcGRhdGVzIGEgZG9jdW1lbnQgaW4gdGhlIGluZGV4LlxuICpcbiAqIFdoZW4gYSBkb2N1bWVudCBjb250YWluZWQgd2l0aGluIHRoZSBpbmRleCBnZXRzIHVwZGF0ZWQsIGZpZWxkcyBjaGFuZ2VkLFxuICogYWRkZWQgb3IgcmVtb3ZlZCwgdG8gbWFrZSBzdXJlIGl0IGNvcnJlY3RseSBtYXRjaGVkIGFnYWluc3Qgc2VhcmNoIHF1ZXJpZXMsXG4gKiBpdCBzaG91bGQgYmUgdXBkYXRlZCBpbiB0aGUgaW5kZXguXG4gKlxuICogVGhpcyBtZXRob2QgaXMganVzdCBhIHdyYXBwZXIgYXJvdW5kIGByZW1vdmVgIGFuZCBgYWRkYFxuICpcbiAqIEFuICd1cGRhdGUnIGV2ZW50IGlzIGVtaXR0ZWQgd2l0aCB0aGUgZG9jdW1lbnQgdGhhdCBoYXMgYmVlbiB1cGRhdGVkIGFuZCB0aGUgaW5kZXguXG4gKiBUaGlzIGV2ZW50IGNhbiBiZSBzaWxlbmNlZCBieSBwYXNzaW5nIGZhbHNlIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gdXBkYXRlLiBPbmx5XG4gKiBhbiB1cGRhdGUgZXZlbnQgd2lsbCBiZSBmaXJlZCwgdGhlICdhZGQnIGFuZCAncmVtb3ZlJyBldmVudHMgb2YgdGhlIHVuZGVybHlpbmcgY2FsbHNcbiAqIGFyZSBzaWxlbmNlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIFRoZSBkb2N1bWVudCB0byB1cGRhdGUgaW4gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciB0byBlbWl0IHVwZGF0ZSBldmVudHMsIGRlZmF1bHRzIHRvIHRydWVcbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLnJlbW92ZVxuICogQHNlZSBJbmRleC5wcm90b3R5cGUuYWRkXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRvYywgZW1pdEV2ZW50KSB7XG4gIHZhciBlbWl0RXZlbnQgPSBlbWl0RXZlbnQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBlbWl0RXZlbnRcblxuICB0aGlzLnJlbW92ZShkb2MsIGZhbHNlKVxuICB0aGlzLmFkZChkb2MsIGZhbHNlKVxuXG4gIGlmIChlbWl0RXZlbnQpIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ3VwZGF0ZScsIGRvYywgdGhpcylcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIGRvY3VtZW50IGZyZXF1ZW5jeSBmb3IgYSB0b2tlbiB3aXRoaW4gdGhlIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gY2FsY3VsYXRlIHRoZSBpZGYgb2YuXG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5pZGZcbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuaWRmID0gZnVuY3Rpb24gKHRlcm0pIHtcbiAgdmFyIGNhY2hlS2V5ID0gXCJAXCIgKyB0ZXJtXG4gIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5faWRmQ2FjaGUsIGNhY2hlS2V5KSkgcmV0dXJuIHRoaXMuX2lkZkNhY2hlW2NhY2hlS2V5XVxuXG4gIHZhciBkb2N1bWVudEZyZXF1ZW5jeSA9IHRoaXMudG9rZW5TdG9yZS5jb3VudCh0ZXJtKSxcbiAgICAgIGlkZiA9IDFcblxuICBpZiAoZG9jdW1lbnRGcmVxdWVuY3kgPiAwKSB7XG4gICAgaWRmID0gMSArIE1hdGgubG9nKHRoaXMuZG9jdW1lbnRTdG9yZS5sZW5ndGggLyBkb2N1bWVudEZyZXF1ZW5jeSlcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9pZGZDYWNoZVtjYWNoZUtleV0gPSBpZGZcbn1cblxuLyoqXG4gKiBTZWFyY2hlcyB0aGUgaW5kZXggdXNpbmcgdGhlIHBhc3NlZCBxdWVyeS5cbiAqXG4gKiBRdWVyaWVzIHNob3VsZCBiZSBhIHN0cmluZywgbXVsdGlwbGUgd29yZHMgYXJlIGFsbG93ZWQgYW5kIHdpbGwgbGVhZCB0byBhblxuICogQU5EIGJhc2VkIHF1ZXJ5LCBlLmcuIGBpZHguc2VhcmNoKCdmb28gYmFyJylgIHdpbGwgcnVuIGEgc2VhcmNoIGZvclxuICogZG9jdW1lbnRzIGNvbnRhaW5pbmcgYm90aCAnZm9vJyBhbmQgJ2JhcicuXG4gKlxuICogQWxsIHF1ZXJ5IHRva2VucyBhcmUgcGFzc2VkIHRocm91Z2ggdGhlIHNhbWUgcGlwZWxpbmUgdGhhdCBkb2N1bWVudCB0b2tlbnNcbiAqIGFyZSBwYXNzZWQgdGhyb3VnaCwgc28gYW55IGxhbmd1YWdlIHByb2Nlc3NpbmcgaW52b2x2ZWQgd2lsbCBiZSBydW4gb24gZXZlcnlcbiAqIHF1ZXJ5IHRlcm0uXG4gKlxuICogRWFjaCBxdWVyeSB0ZXJtIGlzIGV4cGFuZGVkLCBzbyB0aGF0IHRoZSB0ZXJtICdoZScgbWlnaHQgYmUgZXhwYW5kZWQgdG9cbiAqICdoZWxsbycgYW5kICdoZWxwJyBpZiB0aG9zZSB0ZXJtcyB3ZXJlIGFscmVhZHkgaW5jbHVkZWQgaW4gdGhlIGluZGV4LlxuICpcbiAqIE1hdGNoaW5nIGRvY3VtZW50cyBhcmUgcmV0dXJuZWQgYXMgYW4gYXJyYXkgb2Ygb2JqZWN0cywgZWFjaCBvYmplY3QgY29udGFpbnNcbiAqIHRoZSBtYXRjaGluZyBkb2N1bWVudCByZWYsIGFzIHNldCBmb3IgdGhpcyBpbmRleCwgYW5kIHRoZSBzaW1pbGFyaXR5IHNjb3JlXG4gKiBmb3IgdGhpcyBkb2N1bWVudCBhZ2FpbnN0IHRoZSBxdWVyeS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCB0aGUgaW5kZXggd2l0aC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5pZGZcbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLmRvY3VtZW50VmVjdG9yXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gIHZhciBxdWVyeVRva2VucyA9IHRoaXMucGlwZWxpbmUucnVuKHRoaXMudG9rZW5pemVyRm4ocXVlcnkpKSxcbiAgICAgIHF1ZXJ5VmVjdG9yID0gbmV3IGx1bnIuVmVjdG9yLFxuICAgICAgZG9jdW1lbnRTZXRzID0gW10sXG4gICAgICBmaWVsZEJvb3N0cyA9IHRoaXMuX2ZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGYpIHsgcmV0dXJuIG1lbW8gKyBmLmJvb3N0IH0sIDApXG5cbiAgdmFyIGhhc1NvbWVUb2tlbiA9IHF1ZXJ5VG9rZW5zLnNvbWUoZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5TdG9yZS5oYXModG9rZW4pXG4gIH0sIHRoaXMpXG5cbiAgaWYgKCFoYXNTb21lVG9rZW4pIHJldHVybiBbXVxuXG4gIHF1ZXJ5VG9rZW5zXG4gICAgLmZvckVhY2goZnVuY3Rpb24gKHRva2VuLCBpLCB0b2tlbnMpIHtcbiAgICAgIHZhciB0ZiA9IDEgLyB0b2tlbnMubGVuZ3RoICogdGhpcy5fZmllbGRzLmxlbmd0aCAqIGZpZWxkQm9vc3RzLFxuICAgICAgICAgIHNlbGYgPSB0aGlzXG5cbiAgICAgIHZhciBzZXQgPSB0aGlzLnRva2VuU3RvcmUuZXhwYW5kKHRva2VuKS5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGtleSkge1xuICAgICAgICB2YXIgcG9zID0gc2VsZi5jb3JwdXNUb2tlbnMuaW5kZXhPZihrZXkpLFxuICAgICAgICAgICAgaWRmID0gc2VsZi5pZGYoa2V5KSxcbiAgICAgICAgICAgIHNpbWlsYXJpdHlCb29zdCA9IDEsXG4gICAgICAgICAgICBzZXQgPSBuZXcgbHVuci5Tb3J0ZWRTZXRcblxuICAgICAgICAvLyBpZiB0aGUgZXhwYW5kZWQga2V5IGlzIG5vdCBhbiBleGFjdCBtYXRjaCB0byB0aGUgdG9rZW4gdGhlblxuICAgICAgICAvLyBwZW5hbGlzZSB0aGUgc2NvcmUgZm9yIHRoaXMga2V5IGJ5IGhvdyBkaWZmZXJlbnQgdGhlIGtleSBpc1xuICAgICAgICAvLyB0byB0aGUgdG9rZW4uXG4gICAgICAgIGlmIChrZXkgIT09IHRva2VuKSB7XG4gICAgICAgICAgdmFyIGRpZmYgPSBNYXRoLm1heCgzLCBrZXkubGVuZ3RoIC0gdG9rZW4ubGVuZ3RoKVxuICAgICAgICAgIHNpbWlsYXJpdHlCb29zdCA9IDEgLyBNYXRoLmxvZyhkaWZmKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBxdWVyeSB0Zi1pZGYgc2NvcmUgZm9yIHRoaXMgdG9rZW5cbiAgICAgICAgLy8gYXBwbHlpbmcgYW4gc2ltaWxhcml0eUJvb3N0IHRvIGVuc3VyZSBleGFjdCBtYXRjaGVzXG4gICAgICAgIC8vIHRoZXNlIHJhbmsgaGlnaGVyIHRoYW4gZXhwYW5kZWQgdGVybXNcbiAgICAgICAgaWYgKHBvcyA+IC0xKSBxdWVyeVZlY3Rvci5pbnNlcnQocG9zLCB0ZiAqIGlkZiAqIHNpbWlsYXJpdHlCb29zdClcblxuICAgICAgICAvLyBhZGQgYWxsIHRoZSBkb2N1bWVudHMgdGhhdCBoYXZlIHRoaXMga2V5IGludG8gYSBzZXRcbiAgICAgICAgLy8gZW5zdXJpbmcgdGhhdCB0aGUgdHlwZSBvZiBrZXkgaXMgcHJlc2VydmVkXG4gICAgICAgIHZhciBtYXRjaGluZ0RvY3VtZW50cyA9IHNlbGYudG9rZW5TdG9yZS5nZXQoa2V5KSxcbiAgICAgICAgICAgIHJlZnMgPSBPYmplY3Qua2V5cyhtYXRjaGluZ0RvY3VtZW50cyksXG4gICAgICAgICAgICByZWZzTGVuID0gcmVmcy5sZW5ndGhcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZnNMZW47IGkrKykge1xuICAgICAgICAgIHNldC5hZGQobWF0Y2hpbmdEb2N1bWVudHNbcmVmc1tpXV0ucmVmKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lbW8udW5pb24oc2V0KVxuICAgICAgfSwgbmV3IGx1bnIuU29ydGVkU2V0KVxuXG4gICAgICBkb2N1bWVudFNldHMucHVzaChzZXQpXG4gICAgfSwgdGhpcylcblxuICB2YXIgZG9jdW1lbnRTZXQgPSBkb2N1bWVudFNldHMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBzZXQpIHtcbiAgICByZXR1cm4gbWVtby5pbnRlcnNlY3Qoc2V0KVxuICB9KVxuXG4gIHJldHVybiBkb2N1bWVudFNldFxuICAgIC5tYXAoZnVuY3Rpb24gKHJlZikge1xuICAgICAgcmV0dXJuIHsgcmVmOiByZWYsIHNjb3JlOiBxdWVyeVZlY3Rvci5zaW1pbGFyaXR5KHRoaXMuZG9jdW1lbnRWZWN0b3IocmVmKSkgfVxuICAgIH0sIHRoaXMpXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZVxuICAgIH0pXG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgdmVjdG9yIGNvbnRhaW5pbmcgYWxsIHRoZSB0b2tlbnMgaW4gdGhlIGRvY3VtZW50IG1hdGNoaW5nIHRoZVxuICogcGFzc2VkIGRvY3VtZW50UmVmLlxuICpcbiAqIFRoZSB2ZWN0b3IgY29udGFpbnMgdGhlIHRmLWlkZiBzY29yZSBmb3IgZWFjaCB0b2tlbiBjb250YWluZWQgaW4gdGhlXG4gKiBkb2N1bWVudCB3aXRoIHRoZSBwYXNzZWQgZG9jdW1lbnRSZWYuICBUaGUgdmVjdG9yIHdpbGwgY29udGFpbiBhbiBlbGVtZW50XG4gKiBmb3IgZXZlcnkgdG9rZW4gaW4gdGhlIGluZGV4ZXMgY29ycHVzLCBpZiB0aGUgZG9jdW1lbnQgZG9lcyBub3QgY29udGFpbiB0aGF0XG4gKiB0b2tlbiB0aGUgZWxlbWVudCB3aWxsIGJlIDAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRvY3VtZW50UmVmIFRoZSByZWYgdG8gZmluZCB0aGUgZG9jdW1lbnQgd2l0aC5cbiAqIEByZXR1cm5zIHtsdW5yLlZlY3Rvcn1cbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuZG9jdW1lbnRWZWN0b3IgPSBmdW5jdGlvbiAoZG9jdW1lbnRSZWYpIHtcbiAgdmFyIGRvY3VtZW50VG9rZW5zID0gdGhpcy5kb2N1bWVudFN0b3JlLmdldChkb2N1bWVudFJlZiksXG4gICAgICBkb2N1bWVudFRva2Vuc0xlbmd0aCA9IGRvY3VtZW50VG9rZW5zLmxlbmd0aCxcbiAgICAgIGRvY3VtZW50VmVjdG9yID0gbmV3IGx1bnIuVmVjdG9yXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2N1bWVudFRva2Vuc0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gZG9jdW1lbnRUb2tlbnMuZWxlbWVudHNbaV0sXG4gICAgICAgIHRmID0gdGhpcy50b2tlblN0b3JlLmdldCh0b2tlbilbZG9jdW1lbnRSZWZdLnRmLFxuICAgICAgICBpZGYgPSB0aGlzLmlkZih0b2tlbilcblxuICAgIGRvY3VtZW50VmVjdG9yLmluc2VydCh0aGlzLmNvcnB1c1Rva2Vucy5pbmRleE9mKHRva2VuKSwgdGYgKiBpZGYpXG4gIH07XG5cbiAgcmV0dXJuIGRvY3VtZW50VmVjdG9yXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbmRleCByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiBsdW5yLnZlcnNpb24sXG4gICAgZmllbGRzOiB0aGlzLl9maWVsZHMsXG4gICAgcmVmOiB0aGlzLl9yZWYsXG4gICAgdG9rZW5pemVyOiB0aGlzLnRva2VuaXplckZuLmxhYmVsLFxuICAgIGRvY3VtZW50U3RvcmU6IHRoaXMuZG9jdW1lbnRTdG9yZS50b0pTT04oKSxcbiAgICB0b2tlblN0b3JlOiB0aGlzLnRva2VuU3RvcmUudG9KU09OKCksXG4gICAgY29ycHVzVG9rZW5zOiB0aGlzLmNvcnB1c1Rva2Vucy50b0pTT04oKSxcbiAgICBwaXBlbGluZTogdGhpcy5waXBlbGluZS50b0pTT04oKVxuICB9XG59XG5cbi8qKlxuICogQXBwbGllcyBhIHBsdWdpbiB0byB0aGUgY3VycmVudCBpbmRleC5cbiAqXG4gKiBBIHBsdWdpbiBpcyBhIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdpdGggdGhlIGluZGV4IGFzIGl0cyBjb250ZXh0LlxuICogUGx1Z2lucyBjYW4gYmUgdXNlZCB0byBjdXN0b21pc2Ugb3IgZXh0ZW5kIHRoZSBiZWhhdmlvdXIgdGhlIGluZGV4XG4gKiBpbiBzb21lIHdheS4gQSBwbHVnaW4gaXMganVzdCBhIGZ1bmN0aW9uLCB0aGF0IGVuY2Fwc3VsYXRlZCB0aGUgY3VzdG9tXG4gKiBiZWhhdmlvdXIgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgaW5kZXguXG4gKlxuICogVGhlIHBsdWdpbiBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBpbmRleCBhcyBpdHMgYXJndW1lbnQsIGFkZGl0aW9uYWxcbiAqIGFyZ3VtZW50cyBjYW4gYWxzbyBiZSBwYXNzZWQgd2hlbiBjYWxsaW5nIHVzZS4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkXG4gKiB3aXRoIHRoZSBpbmRleCBhcyBpdHMgY29udGV4dC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICB2YXIgbXlQbHVnaW4gPSBmdW5jdGlvbiAoaWR4LCBhcmcxLCBhcmcyKSB7XG4gKiAgICAgICAvLyBgdGhpc2AgaXMgdGhlIGluZGV4IHRvIGJlIGV4dGVuZGVkXG4gKiAgICAgICAvLyBhcHBseSBhbnkgZXh0ZW5zaW9ucyBldGMgaGVyZS5cbiAqICAgICB9XG4gKlxuICogICAgIHZhciBpZHggPSBsdW5yKGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHRoaXMudXNlKG15UGx1Z2luLCAnYXJnMScsICdhcmcyJylcbiAqICAgICB9KVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBsdWdpbiBUaGUgcGx1Z2luIHRvIGFwcGx5LlxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gIGFyZ3MudW5zaGlmdCh0aGlzKVxuICBwbHVnaW4uYXBwbHkodGhpcywgYXJncylcbn1cbi8qIVxuICogbHVuci5TdG9yZVxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5TdG9yZSBpcyBhIHNpbXBsZSBrZXktdmFsdWUgc3RvcmUgdXNlZCBmb3Igc3RvcmluZyBzZXRzIG9mIHRva2VucyBmb3JcbiAqIGRvY3VtZW50cyBzdG9yZWQgaW4gaW5kZXguXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAbW9kdWxlXG4gKi9cbmx1bnIuU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc3RvcmUgPSB7fVxuICB0aGlzLmxlbmd0aCA9IDBcbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBzdG9yZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCBzdG9yZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuU3RvcmV9XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIHZhciBzdG9yZSA9IG5ldyB0aGlzXG5cbiAgc3RvcmUubGVuZ3RoID0gc2VyaWFsaXNlZERhdGEubGVuZ3RoXG4gIHN0b3JlLnN0b3JlID0gT2JqZWN0LmtleXMoc2VyaWFsaXNlZERhdGEuc3RvcmUpLnJlZHVjZShmdW5jdGlvbiAobWVtbywga2V5KSB7XG4gICAgbWVtb1trZXldID0gbHVuci5Tb3J0ZWRTZXQubG9hZChzZXJpYWxpc2VkRGF0YS5zdG9yZVtrZXldKVxuICAgIHJldHVybiBtZW1vXG4gIH0sIHt9KVxuXG4gIHJldHVybiBzdG9yZVxufVxuXG4vKipcbiAqIFN0b3JlcyB0aGUgZ2l2ZW4gdG9rZW5zIGluIHRoZSBzdG9yZSBhZ2FpbnN0IHRoZSBnaXZlbiBpZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGtleSB1c2VkIHRvIHN0b3JlIHRoZSB0b2tlbnMgYWdhaW5zdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbnMgVGhlIHRva2VucyB0byBzdG9yZSBhZ2FpbnN0IHRoZSBrZXkuXG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGlkLCB0b2tlbnMpIHtcbiAgaWYgKCF0aGlzLmhhcyhpZCkpIHRoaXMubGVuZ3RoKytcbiAgdGhpcy5zdG9yZVtpZF0gPSB0b2tlbnNcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIHRva2VucyBmcm9tIHRoZSBzdG9yZSBmb3IgYSBnaXZlbiBrZXkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGlkIFRoZSBrZXkgdG8gbG9va3VwIGFuZCByZXRyaWV2ZSBmcm9tIHRoZSBzdG9yZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiB0aGlzLnN0b3JlW2lkXVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBzdG9yZSBjb250YWlucyBhIGtleS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGlkIHRvIGxvb2sgdXAgaW4gdGhlIHN0b3JlLlxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBpZCBpbiB0aGlzLnN0b3JlXG59XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgdmFsdWUgZm9yIGEga2V5IGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGlkIHRvIHJlbW92ZSBmcm9tIHRoZSBzdG9yZS5cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgaWYgKCF0aGlzLmhhcyhpZCkpIHJldHVyblxuXG4gIGRlbGV0ZSB0aGlzLnN0b3JlW2lkXVxuICB0aGlzLmxlbmd0aC0tXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzdG9yZSByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICBsZW5ndGg6IHRoaXMubGVuZ3RoXG4gIH1cbn1cblxuLyohXG4gKiBsdW5yLnN0ZW1tZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqIEluY2x1ZGVzIGNvZGUgZnJvbSAtIGh0dHA6Ly90YXJ0YXJ1cy5vcmcvfm1hcnRpbi9Qb3J0ZXJTdGVtbWVyL2pzLnR4dFxuICovXG5cbi8qKlxuICogbHVuci5zdGVtbWVyIGlzIGFuIGVuZ2xpc2ggbGFuZ3VhZ2Ugc3RlbW1lciwgdGhpcyBpcyBhIEphdmFTY3JpcHRcbiAqIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQb3J0ZXJTdGVtbWVyIHRha2VuIGZyb20gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIHN0ZW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci5zdGVtbWVyID0gKGZ1bmN0aW9uKCl7XG4gIHZhciBzdGVwMmxpc3QgPSB7XG4gICAgICBcImF0aW9uYWxcIiA6IFwiYXRlXCIsXG4gICAgICBcInRpb25hbFwiIDogXCJ0aW9uXCIsXG4gICAgICBcImVuY2lcIiA6IFwiZW5jZVwiLFxuICAgICAgXCJhbmNpXCIgOiBcImFuY2VcIixcbiAgICAgIFwiaXplclwiIDogXCJpemVcIixcbiAgICAgIFwiYmxpXCIgOiBcImJsZVwiLFxuICAgICAgXCJhbGxpXCIgOiBcImFsXCIsXG4gICAgICBcImVudGxpXCIgOiBcImVudFwiLFxuICAgICAgXCJlbGlcIiA6IFwiZVwiLFxuICAgICAgXCJvdXNsaVwiIDogXCJvdXNcIixcbiAgICAgIFwiaXphdGlvblwiIDogXCJpemVcIixcbiAgICAgIFwiYXRpb25cIiA6IFwiYXRlXCIsXG4gICAgICBcImF0b3JcIiA6IFwiYXRlXCIsXG4gICAgICBcImFsaXNtXCIgOiBcImFsXCIsXG4gICAgICBcIml2ZW5lc3NcIiA6IFwiaXZlXCIsXG4gICAgICBcImZ1bG5lc3NcIiA6IFwiZnVsXCIsXG4gICAgICBcIm91c25lc3NcIiA6IFwib3VzXCIsXG4gICAgICBcImFsaXRpXCIgOiBcImFsXCIsXG4gICAgICBcIml2aXRpXCIgOiBcIml2ZVwiLFxuICAgICAgXCJiaWxpdGlcIiA6IFwiYmxlXCIsXG4gICAgICBcImxvZ2lcIiA6IFwibG9nXCJcbiAgICB9LFxuXG4gICAgc3RlcDNsaXN0ID0ge1xuICAgICAgXCJpY2F0ZVwiIDogXCJpY1wiLFxuICAgICAgXCJhdGl2ZVwiIDogXCJcIixcbiAgICAgIFwiYWxpemVcIiA6IFwiYWxcIixcbiAgICAgIFwiaWNpdGlcIiA6IFwiaWNcIixcbiAgICAgIFwiaWNhbFwiIDogXCJpY1wiLFxuICAgICAgXCJmdWxcIiA6IFwiXCIsXG4gICAgICBcIm5lc3NcIiA6IFwiXCJcbiAgICB9LFxuXG4gICAgYyA9IFwiW15hZWlvdV1cIiwgICAgICAgICAgLy8gY29uc29uYW50XG4gICAgdiA9IFwiW2FlaW91eV1cIiwgICAgICAgICAgLy8gdm93ZWxcbiAgICBDID0gYyArIFwiW15hZWlvdXldKlwiLCAgICAvLyBjb25zb25hbnQgc2VxdWVuY2VcbiAgICBWID0gdiArIFwiW2FlaW91XSpcIiwgICAgICAvLyB2b3dlbCBzZXF1ZW5jZVxuXG4gICAgbWdyMCA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQywgICAgICAgICAgICAgICAvLyBbQ11WQy4uLiBpcyBtPjBcbiAgICBtZXExID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDICsgXCIoXCIgKyBWICsgXCIpPyRcIiwgIC8vIFtDXVZDW1ZdIGlzIG09MVxuICAgIG1ncjEgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgViArIEMgKyBWICsgQywgICAgICAgLy8gW0NdVkNWQy4uLiBpcyBtPjFcbiAgICBzX3YgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgdjsgICAgICAgICAgICAgICAgICAgLy8gdm93ZWwgaW4gc3RlbVxuXG4gIHZhciByZV9tZ3IwID0gbmV3IFJlZ0V4cChtZ3IwKTtcbiAgdmFyIHJlX21ncjEgPSBuZXcgUmVnRXhwKG1ncjEpO1xuICB2YXIgcmVfbWVxMSA9IG5ldyBSZWdFeHAobWVxMSk7XG4gIHZhciByZV9zX3YgPSBuZXcgUmVnRXhwKHNfdik7XG5cbiAgdmFyIHJlXzFhID0gL14oLis/KShzc3xpKWVzJC87XG4gIHZhciByZTJfMWEgPSAvXiguKz8pKFtec10pcyQvO1xuICB2YXIgcmVfMWIgPSAvXiguKz8pZWVkJC87XG4gIHZhciByZTJfMWIgPSAvXiguKz8pKGVkfGluZykkLztcbiAgdmFyIHJlXzFiXzIgPSAvLiQvO1xuICB2YXIgcmUyXzFiXzIgPSAvKGF0fGJsfGl6KSQvO1xuICB2YXIgcmUzXzFiXzIgPSBuZXcgUmVnRXhwKFwiKFteYWVpb3V5bHN6XSlcXFxcMSRcIik7XG4gIHZhciByZTRfMWJfMiA9IG5ldyBSZWdFeHAoXCJeXCIgKyBDICsgdiArIFwiW15hZWlvdXd4eV0kXCIpO1xuXG4gIHZhciByZV8xYyA9IC9eKC4rP1teYWVpb3VdKXkkLztcbiAgdmFyIHJlXzIgPSAvXiguKz8pKGF0aW9uYWx8dGlvbmFsfGVuY2l8YW5jaXxpemVyfGJsaXxhbGxpfGVudGxpfGVsaXxvdXNsaXxpemF0aW9ufGF0aW9ufGF0b3J8YWxpc218aXZlbmVzc3xmdWxuZXNzfG91c25lc3N8YWxpdGl8aXZpdGl8YmlsaXRpfGxvZ2kpJC87XG5cbiAgdmFyIHJlXzMgPSAvXiguKz8pKGljYXRlfGF0aXZlfGFsaXplfGljaXRpfGljYWx8ZnVsfG5lc3MpJC87XG5cbiAgdmFyIHJlXzQgPSAvXiguKz8pKGFsfGFuY2V8ZW5jZXxlcnxpY3xhYmxlfGlibGV8YW50fGVtZW50fG1lbnR8ZW50fG91fGlzbXxhdGV8aXRpfG91c3xpdmV8aXplKSQvO1xuICB2YXIgcmUyXzQgPSAvXiguKz8pKHN8dCkoaW9uKSQvO1xuXG4gIHZhciByZV81ID0gL14oLis/KWUkLztcbiAgdmFyIHJlXzVfMSA9IC9sbCQvO1xuICB2YXIgcmUzXzUgPSBuZXcgUmVnRXhwKFwiXlwiICsgQyArIHYgKyBcIlteYWVpb3V3eHldJFwiKTtcblxuICB2YXIgcG9ydGVyU3RlbW1lciA9IGZ1bmN0aW9uIHBvcnRlclN0ZW1tZXIodykge1xuICAgIHZhciAgIHN0ZW0sXG4gICAgICBzdWZmaXgsXG4gICAgICBmaXJzdGNoLFxuICAgICAgcmUsXG4gICAgICByZTIsXG4gICAgICByZTMsXG4gICAgICByZTQ7XG5cbiAgICBpZiAody5sZW5ndGggPCAzKSB7IHJldHVybiB3OyB9XG5cbiAgICBmaXJzdGNoID0gdy5zdWJzdHIoMCwxKTtcbiAgICBpZiAoZmlyc3RjaCA9PSBcInlcIikge1xuICAgICAgdyA9IGZpcnN0Y2gudG9VcHBlckNhc2UoKSArIHcuc3Vic3RyKDEpO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMWFcbiAgICByZSA9IHJlXzFhXG4gICAgcmUyID0gcmUyXzFhO1xuXG4gICAgaWYgKHJlLnRlc3QodykpIHsgdyA9IHcucmVwbGFjZShyZSxcIiQxJDJcIik7IH1cbiAgICBlbHNlIGlmIChyZTIudGVzdCh3KSkgeyB3ID0gdy5yZXBsYWNlKHJlMixcIiQxJDJcIik7IH1cblxuICAgIC8vIFN0ZXAgMWJcbiAgICByZSA9IHJlXzFiO1xuICAgIHJlMiA9IHJlMl8xYjtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KGZwWzFdKSkge1xuICAgICAgICByZSA9IHJlXzFiXzI7XG4gICAgICAgIHcgPSB3LnJlcGxhY2UocmUsXCJcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZTIudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUyLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZTIgPSByZV9zX3Y7XG4gICAgICBpZiAocmUyLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICAgIHJlMiA9IHJlMl8xYl8yO1xuICAgICAgICByZTMgPSByZTNfMWJfMjtcbiAgICAgICAgcmU0ID0gcmU0XzFiXzI7XG4gICAgICAgIGlmIChyZTIudGVzdCh3KSkgeyAgdyA9IHcgKyBcImVcIjsgfVxuICAgICAgICBlbHNlIGlmIChyZTMudGVzdCh3KSkgeyByZSA9IHJlXzFiXzI7IHcgPSB3LnJlcGxhY2UocmUsXCJcIik7IH1cbiAgICAgICAgZWxzZSBpZiAocmU0LnRlc3QodykpIHsgdyA9IHcgKyBcImVcIjsgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgMWMgLSByZXBsYWNlIHN1ZmZpeCB5IG9yIFkgYnkgaSBpZiBwcmVjZWRlZCBieSBhIG5vbi12b3dlbCB3aGljaCBpcyBub3QgdGhlIGZpcnN0IGxldHRlciBvZiB0aGUgd29yZCAoc28gY3J5IC0+IGNyaSwgYnkgLT4gYnksIHNheSAtPiBzYXkpXG4gICAgcmUgPSByZV8xYztcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHcgPSBzdGVtICsgXCJpXCI7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAyXG4gICAgcmUgPSByZV8yO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgc3VmZml4ID0gZnBbMl07XG4gICAgICByZSA9IHJlX21ncjA7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbSArIHN0ZXAybGlzdFtzdWZmaXhdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgM1xuICAgIHJlID0gcmVfMztcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHN1ZmZpeCA9IGZwWzJdO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW0gKyBzdGVwM2xpc3Rbc3VmZml4XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDRcbiAgICByZSA9IHJlXzQ7XG4gICAgcmUyID0gcmUyXzQ7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZSA9IHJlX21ncjE7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZTIuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXSArIGZwWzJdO1xuICAgICAgcmUyID0gcmVfbWdyMTtcbiAgICAgIGlmIChyZTIudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDVcbiAgICByZSA9IHJlXzU7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZSA9IHJlX21ncjE7XG4gICAgICByZTIgPSByZV9tZXExO1xuICAgICAgcmUzID0gcmUzXzU7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSB8fCAocmUyLnRlc3Qoc3RlbSkgJiYgIShyZTMudGVzdChzdGVtKSkpKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlID0gcmVfNV8xO1xuICAgIHJlMiA9IHJlX21ncjE7XG4gICAgaWYgKHJlLnRlc3QodykgJiYgcmUyLnRlc3QodykpIHtcbiAgICAgIHJlID0gcmVfMWJfMjtcbiAgICAgIHcgPSB3LnJlcGxhY2UocmUsXCJcIik7XG4gICAgfVxuXG4gICAgLy8gYW5kIHR1cm4gaW5pdGlhbCBZIGJhY2sgdG8geVxuXG4gICAgaWYgKGZpcnN0Y2ggPT0gXCJ5XCIpIHtcbiAgICAgIHcgPSBmaXJzdGNoLnRvTG93ZXJDYXNlKCkgKyB3LnN1YnN0cigxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdztcbiAgfTtcblxuICByZXR1cm4gcG9ydGVyU3RlbW1lcjtcbn0pKCk7XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnN0ZW1tZXIsICdzdGVtbWVyJylcbi8qIVxuICogbHVuci5zdG9wV29yZEZpbHRlclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyIGJ1aWxkcyBhIHN0b3BXb3JkRmlsdGVyIGZ1bmN0aW9uIGZyb20gdGhlIHByb3ZpZGVkXG4gKiBsaXN0IG9mIHN0b3Agd29yZHMuXG4gKlxuICogVGhlIGJ1aWx0IGluIGx1bnIuc3RvcFdvcmRGaWx0ZXIgaXMgYnVpbHQgdXNpbmcgdGhpcyBnZW5lcmF0b3IgYW5kIGNhbiBiZSB1c2VkXG4gKiB0byBnZW5lcmF0ZSBjdXN0b20gc3RvcFdvcmRGaWx0ZXJzIGZvciBhcHBsaWNhdGlvbnMgb3Igbm9uIEVuZ2xpc2ggbGFuZ3VhZ2VzLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7QXJyYXl9IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICogQHNlZSBsdW5yLlBpcGVsaW5lXG4gKiBAc2VlIGx1bnIuc3RvcFdvcmRGaWx0ZXJcbiAqL1xubHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyID0gZnVuY3Rpb24gKHN0b3BXb3Jkcykge1xuICB2YXIgd29yZHMgPSBzdG9wV29yZHMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBzdG9wV29yZCkge1xuICAgIG1lbW9bc3RvcFdvcmRdID0gc3RvcFdvcmRcbiAgICByZXR1cm4gbWVtb1xuICB9LCB7fSlcblxuICByZXR1cm4gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgaWYgKHRva2VuICYmIHdvcmRzW3Rva2VuXSAhPT0gdG9rZW4pIHJldHVybiB0b2tlblxuICB9XG59XG5cbi8qKlxuICogbHVuci5zdG9wV29yZEZpbHRlciBpcyBhbiBFbmdsaXNoIGxhbmd1YWdlIHN0b3Agd29yZCBsaXN0IGZpbHRlciwgYW55IHdvcmRzXG4gKiBjb250YWluZWQgaW4gdGhlIGxpc3Qgd2lsbCBub3QgYmUgcGFzc2VkIHRocm91Z2ggdGhlIGZpbHRlci5cbiAqXG4gKiBUaGlzIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgaW4gdGhlIFBpcGVsaW5lLiBJZiB0aGUgdG9rZW4gZG9lcyBub3QgcGFzcyB0aGVcbiAqIGZpbHRlciB0aGVuIHVuZGVmaW5lZCB3aWxsIGJlIHJldHVybmVkLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci5zdG9wV29yZEZpbHRlciA9IGx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlcihbXG4gICdhJyxcbiAgJ2FibGUnLFxuICAnYWJvdXQnLFxuICAnYWNyb3NzJyxcbiAgJ2FmdGVyJyxcbiAgJ2FsbCcsXG4gICdhbG1vc3QnLFxuICAnYWxzbycsXG4gICdhbScsXG4gICdhbW9uZycsXG4gICdhbicsXG4gICdhbmQnLFxuICAnYW55JyxcbiAgJ2FyZScsXG4gICdhcycsXG4gICdhdCcsXG4gICdiZScsXG4gICdiZWNhdXNlJyxcbiAgJ2JlZW4nLFxuICAnYnV0JyxcbiAgJ2J5JyxcbiAgJ2NhbicsXG4gICdjYW5ub3QnLFxuICAnY291bGQnLFxuICAnZGVhcicsXG4gICdkaWQnLFxuICAnZG8nLFxuICAnZG9lcycsXG4gICdlaXRoZXInLFxuICAnZWxzZScsXG4gICdldmVyJyxcbiAgJ2V2ZXJ5JyxcbiAgJ2ZvcicsXG4gICdmcm9tJyxcbiAgJ2dldCcsXG4gICdnb3QnLFxuICAnaGFkJyxcbiAgJ2hhcycsXG4gICdoYXZlJyxcbiAgJ2hlJyxcbiAgJ2hlcicsXG4gICdoZXJzJyxcbiAgJ2hpbScsXG4gICdoaXMnLFxuICAnaG93JyxcbiAgJ2hvd2V2ZXInLFxuICAnaScsXG4gICdpZicsXG4gICdpbicsXG4gICdpbnRvJyxcbiAgJ2lzJyxcbiAgJ2l0JyxcbiAgJ2l0cycsXG4gICdqdXN0JyxcbiAgJ2xlYXN0JyxcbiAgJ2xldCcsXG4gICdsaWtlJyxcbiAgJ2xpa2VseScsXG4gICdtYXknLFxuICAnbWUnLFxuICAnbWlnaHQnLFxuICAnbW9zdCcsXG4gICdtdXN0JyxcbiAgJ215JyxcbiAgJ25laXRoZXInLFxuICAnbm8nLFxuICAnbm9yJyxcbiAgJ25vdCcsXG4gICdvZicsXG4gICdvZmYnLFxuICAnb2Z0ZW4nLFxuICAnb24nLFxuICAnb25seScsXG4gICdvcicsXG4gICdvdGhlcicsXG4gICdvdXInLFxuICAnb3duJyxcbiAgJ3JhdGhlcicsXG4gICdzYWlkJyxcbiAgJ3NheScsXG4gICdzYXlzJyxcbiAgJ3NoZScsXG4gICdzaG91bGQnLFxuICAnc2luY2UnLFxuICAnc28nLFxuICAnc29tZScsXG4gICd0aGFuJyxcbiAgJ3RoYXQnLFxuICAndGhlJyxcbiAgJ3RoZWlyJyxcbiAgJ3RoZW0nLFxuICAndGhlbicsXG4gICd0aGVyZScsXG4gICd0aGVzZScsXG4gICd0aGV5JyxcbiAgJ3RoaXMnLFxuICAndGlzJyxcbiAgJ3RvJyxcbiAgJ3RvbycsXG4gICd0d2FzJyxcbiAgJ3VzJyxcbiAgJ3dhbnRzJyxcbiAgJ3dhcycsXG4gICd3ZScsXG4gICd3ZXJlJyxcbiAgJ3doYXQnLFxuICAnd2hlbicsXG4gICd3aGVyZScsXG4gICd3aGljaCcsXG4gICd3aGlsZScsXG4gICd3aG8nLFxuICAnd2hvbScsXG4gICd3aHknLFxuICAnd2lsbCcsXG4gICd3aXRoJyxcbiAgJ3dvdWxkJyxcbiAgJ3lldCcsXG4gICd5b3UnLFxuICAneW91cidcbl0pXG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnN0b3BXb3JkRmlsdGVyLCAnc3RvcFdvcmRGaWx0ZXInKVxuLyohXG4gKiBsdW5yLnRyaW1tZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIudHJpbW1lciBpcyBhIHBpcGVsaW5lIGZ1bmN0aW9uIGZvciB0cmltbWluZyBub24gd29yZFxuICogY2hhcmFjdGVycyBmcm9tIHRoZSBiZWdpbmluZyBhbmQgZW5kIG9mIHRva2VucyBiZWZvcmUgdGhleVxuICogZW50ZXIgdGhlIGluZGV4LlxuICpcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gbWF5IG5vdCB3b3JrIGNvcnJlY3RseSBmb3Igbm9uIGxhdGluXG4gKiBjaGFyYWN0ZXJzIGFuZCBzaG91bGQgZWl0aGVyIGJlIHJlbW92ZWQgb3IgYWRhcHRlZCBmb3IgdXNlXG4gKiB3aXRoIGxhbmd1YWdlcyB3aXRoIG5vbi1sYXRpbiBjaGFyYWN0ZXJzLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci50cmltbWVyID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIHJldHVybiB0b2tlbi5yZXBsYWNlKC9eXFxXKy8sICcnKS5yZXBsYWNlKC9cXFcrJC8sICcnKVxufVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci50cmltbWVyLCAndHJpbW1lcicpXG4vKiFcbiAqIGx1bnIuc3RlbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICogSW5jbHVkZXMgY29kZSBmcm9tIC0gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluL1BvcnRlclN0ZW1tZXIvanMudHh0XG4gKi9cblxuLyoqXG4gKiBsdW5yLlRva2VuU3RvcmUgaXMgdXNlZCBmb3IgZWZmaWNpZW50IHN0b3JpbmcgYW5kIGxvb2t1cCBvZiB0aGUgcmV2ZXJzZVxuICogaW5kZXggb2YgdG9rZW4gdG8gZG9jdW1lbnQgcmVmLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlRva2VuU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucm9vdCA9IHsgZG9jczoge30gfVxuICB0aGlzLmxlbmd0aCA9IDBcbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCB0b2tlbiBzdG9yZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCB0b2tlbiBzdG9yZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuVG9rZW5TdG9yZX1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIHZhciBzdG9yZSA9IG5ldyB0aGlzXG5cbiAgc3RvcmUucm9vdCA9IHNlcmlhbGlzZWREYXRhLnJvb3RcbiAgc3RvcmUubGVuZ3RoID0gc2VyaWFsaXNlZERhdGEubGVuZ3RoXG5cbiAgcmV0dXJuIHN0b3JlXG59XG5cbi8qKlxuICogQWRkcyBhIG5ldyB0b2tlbiBkb2MgcGFpciB0byB0aGUgc3RvcmUuXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIHN0b3JlIHRoZSBkb2MgdW5kZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvYyB0byBzdG9yZSBhZ2FpbnN0IHRoZSB0b2tlblxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydCBsb29raW5nIGZvciB0aGVcbiAqIGNvcnJlY3QgcGxhY2UgdG8gZW50ZXIgdGhlIGRvYywgYnkgZGVmYXVsdCB0aGUgcm9vdCBvZiB0aGlzIGx1bnIuVG9rZW5TdG9yZVxuICogaXMgdXNlZC5cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRva2VuLCBkb2MsIHJvb3QpIHtcbiAgdmFyIHJvb3QgPSByb290IHx8IHRoaXMucm9vdCxcbiAgICAgIGtleSA9IHRva2VuLmNoYXJBdCgwKSxcbiAgICAgIHJlc3QgPSB0b2tlbi5zbGljZSgxKVxuXG4gIGlmICghKGtleSBpbiByb290KSkgcm9vdFtrZXldID0ge2RvY3M6IHt9fVxuXG4gIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJvb3Rba2V5XS5kb2NzW2RvYy5yZWZdID0gZG9jXG4gICAgdGhpcy5sZW5ndGggKz0gMVxuICAgIHJldHVyblxuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmFkZChyZXN0LCBkb2MsIHJvb3Rba2V5XSlcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMga2V5IGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhpcyBsdW5yLlRva2VuU3RvcmUuXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGNoZWNrIGZvclxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydFxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIGZhbHNlXG5cbiAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFub2RlW3Rva2VuLmNoYXJBdChpKV0pIHJldHVybiBmYWxzZVxuXG4gICAgbm9kZSA9IG5vZGVbdG9rZW4uY2hhckF0KGkpXVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBhIG5vZGUgZnJvbSB0aGUgdG9rZW4gc3RvcmUgZm9yIGEgZ2l2ZW4gdG9rZW4uXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGdldCB0aGUgbm9kZSBmb3IuXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0LlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBzZWUgVG9rZW5TdG9yZS5wcm90b3R5cGUuZ2V0XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmdldE5vZGUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIHt9XG5cbiAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFub2RlW3Rva2VuLmNoYXJBdChpKV0pIHJldHVybiB7fVxuXG4gICAgbm9kZSA9IG5vZGVbdG9rZW4uY2hhckF0KGkpXVxuICB9XG5cbiAgcmV0dXJuIG5vZGVcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgZG9jdW1lbnRzIGZvciBhIG5vZGUgZm9yIHRoZSBnaXZlbiB0b2tlbi5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gZ2V0IHRoZSBkb2N1bWVudHMgZm9yLlxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh0b2tlbiwgcm9vdCkge1xuICByZXR1cm4gdGhpcy5nZXROb2RlKHRva2VuLCByb290KS5kb2NzIHx8IHt9XG59XG5cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuY291bnQgPSBmdW5jdGlvbiAodG9rZW4sIHJvb3QpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZ2V0KHRva2VuLCByb290KSkubGVuZ3RoXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkb2N1bWVudCBpZGVudGlmaWVkIGJ5IHJlZiBmcm9tIHRoZSB0b2tlbiBpbiB0aGUgc3RvcmUuXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGdldCB0aGUgZG9jdW1lbnRzIGZvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSByZWYgVGhlIHJlZiBvZiB0aGUgZG9jdW1lbnQgdG8gcmVtb3ZlIGZyb20gdGhpcyB0b2tlbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAodG9rZW4sIHJlZikge1xuICBpZiAoIXRva2VuKSByZXR1cm5cbiAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCEodG9rZW4uY2hhckF0KGkpIGluIG5vZGUpKSByZXR1cm5cbiAgICBub2RlID0gbm9kZVt0b2tlbi5jaGFyQXQoaSldXG4gIH1cblxuICBkZWxldGUgbm9kZS5kb2NzW3JlZl1cbn1cblxuLyoqXG4gKiBGaW5kIGFsbCB0aGUgcG9zc2libGUgc3VmZml4ZXMgb2YgdGhlIHBhc3NlZCB0b2tlbiB1c2luZyB0b2tlbnNcbiAqIGN1cnJlbnRseSBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBleHBhbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmV4cGFuZCA9IGZ1bmN0aW9uICh0b2tlbiwgbWVtbykge1xuICB2YXIgcm9vdCA9IHRoaXMuZ2V0Tm9kZSh0b2tlbiksXG4gICAgICBkb2NzID0gcm9vdC5kb2NzIHx8IHt9LFxuICAgICAgbWVtbyA9IG1lbW8gfHwgW11cblxuICBpZiAoT2JqZWN0LmtleXMoZG9jcykubGVuZ3RoKSBtZW1vLnB1c2godG9rZW4pXG5cbiAgT2JqZWN0LmtleXMocm9vdClcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoa2V5ID09PSAnZG9jcycpIHJldHVyblxuXG4gICAgICBtZW1vLmNvbmNhdCh0aGlzLmV4cGFuZCh0b2tlbiArIGtleSwgbWVtbykpXG4gICAgfSwgdGhpcylcblxuICByZXR1cm4gbWVtb1xufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdG9rZW4gc3RvcmUgcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHJvb3Q6IHRoaXMucm9vdCxcbiAgICBsZW5ndGg6IHRoaXMubGVuZ3RoXG4gIH1cbn1cblxuICAvKipcbiAgICogZXhwb3J0IHRoZSBtb2R1bGUgdmlhIEFNRCwgQ29tbW9uSlMgb3IgYXMgYSBicm93c2VyIGdsb2JhbFxuICAgKiBFeHBvcnQgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvcmV0dXJuRXhwb3J0cy5qc1xuICAgKi9cbiAgOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgIGRlZmluZShmYWN0b3J5KVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAvKipcbiAgICAgICAqIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgICAgICogb25seSBDb21tb25KUy1saWtlIGVudmlyb21lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAqIGxpa2UgTm9kZS5cbiAgICAgICAqL1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICAgIHJvb3QubHVuciA9IGZhY3RvcnkoKVxuICAgIH1cbiAgfSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogSnVzdCByZXR1cm4gYSB2YWx1ZSB0byBkZWZpbmUgdGhlIG1vZHVsZSBleHBvcnQuXG4gICAgICogVGhpcyBleGFtcGxlIHJldHVybnMgYW4gb2JqZWN0LCBidXQgdGhlIG1vZHVsZVxuICAgICAqIGNhbiByZXR1cm4gYSBmdW5jdGlvbiBhcyB0aGUgZXhwb3J0ZWQgdmFsdWUuXG4gICAgICovXG4gICAgcmV0dXJuIGx1bnJcbiAgfSkpXG59KSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9sdW5yL2x1bnIuanMiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBpZiBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXG4gKi9cbmNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSAoZWxlbWVudCwgdmlzaWJsZSkgPT4gKHZpc2libGUgPyBzaG93IDogaGlkZSkoZWxlbWVudCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RyaW5nIGlzIGVtcHR5XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc0VtcHR5ID0gKHRleHQpID0+ICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycpICYmICh0ZXh0Lmxlbmd0aCA9PT0gMCk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWxWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGJhY2sgYnV0dG9uXG4gICAgY29uc3QgYmFja0J1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBiYWNrQnV0dG9uRWxlbWVudC5jbGFzc05hbWUgPSAnYmFjay1idXR0b24gaWNvbi1hcnJvdy10aGljayc7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2Nsb3NlJywgdGhpcywgYmFja0J1dHRvbkVsZW1lbnQpO1xuXG4gICAgLy8gaW1hZ2VcbiAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgdGhpcy5pbWFnZS5jbGFzc05hbWUgPSAnaW1nLXJlc3BvbnNpdmUnO1xuXG4gICAgY29uc3QgaW1hZ2VXcmFwcGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGltYWdlV3JhcHBlckVsZW1lbnQuY2xhc3NOYW1lID0gJ2ltYWdlLXdyYXBwZXInO1xuICAgIGltYWdlV3JhcHBlckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pbWFnZSk7XG5cbiAgICAvLyB0aXRsZVxuICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuXG4gICAgLy8gYXV0aG9yXG4gICAgdGhpcy5hdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmF1dGhvci5jbGFzc05hbWUgPSAnYXV0aG9yJztcbiAgICB0aGlzLmF1dGhvci5pbm5lckhUTUwgPSAnYnkgSm91YmVsJzsgLy8gVE9ETyBNYWtlIGR5bmFtaWNcblxuICAgIC8vIGRlc2NyaXB0aW9uXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uLmNsYXNzTmFtZSA9ICdzbWFsbCc7XG5cbiAgICAvLyBkZW1vIGJ1dHRvblxuICAgIHRoaXMuZGVtb0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB0aGlzLmRlbW9CdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbic7XG4gICAgdGhpcy5kZW1vQnV0dG9uLmlubmVySFRNTCA9ICdDb250ZW50IERlbW8nO1xuICAgIHRoaXMuZGVtb0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcbiAgICBoaWRlKHRoaXMuZGVtb0J1dHRvbik7XG5cbiAgICBjb25zdCB0ZXh0RGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRleHREZXRhaWxzLmNsYXNzTmFtZSA9ICd0ZXh0LWRldGFpbHMnO1xuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMuYXV0aG9yKTtcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLmRlc2NyaXB0aW9uKTtcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLmRlbW9CdXR0b24pO1xuXG4gICAgY29uc3QgZGV0YWlsc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkZXRhaWxzRWxlbWVudC5jbGFzc05hbWUgPSAnY29udGFpbmVyJztcbiAgICBkZXRhaWxzRWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZVdyYXBwZXJFbGVtZW50KTtcbiAgICBkZXRhaWxzRWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0RGV0YWlscyk7XG5cbiAgICAvLyB1c2UgYnV0dG9uXG4gICAgdGhpcy51c2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGhpcy51c2VCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbiBidXR0b24tcHJpbWFyeSc7XG4gICAgdGhpcy51c2VCdXR0b24uaW5uZXJIVE1MID0gJ1VzZSc7XG4gICAgaGlkZSh0aGlzLnVzZUJ1dHRvbik7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHRoaXMsIHRoaXMudXNlQnV0dG9uKTtcblxuICAgIC8vIGluc3RhbGwgYnV0dG9uXG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnknO1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5pbm5lckhUTUwgPSAnSW5zdGFsbCc7XG4gICAgaGlkZSh0aGlzLmluc3RhbGxCdXR0b24pO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdpbnN0YWxsJywgdGhpcywgdGhpcy5pbnN0YWxsQnV0dG9uKTtcblxuICAgIGNvbnN0IGJ1dHRvbkJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJ1dHRvbkJhci5jbGFzc05hbWUgPSAnYnV0dG9uLWJhcic7XG4gICAgYnV0dG9uQmFyLmFwcGVuZENoaWxkKHRoaXMudXNlQnV0dG9uKTtcbiAgICBidXR0b25CYXIuYXBwZW5kQ2hpbGQodGhpcy5pbnN0YWxsQnV0dG9uKTtcblxuICAgIC8vIGxpY2VuY2UgcGFuZWxcbiAgICBjb25zdCBsaWNlbmNlUGFuZWwgPSB0aGlzLmNyZWF0ZVBhbmVsKCdUaGUgTGljZW5jZSBJbmZvJywgJ2lwc3VtIGxvcnVtJywgJ2xpY2VuY2UtcGFuZWwnKTtcbiAgICBjb25zdCBwbHVnaW5zUGFuZWwgPSB0aGlzLmNyZWF0ZVBhbmVsKCdBdmFpbGFibGUgcGx1Z2lucycsICdpcHN1bSBsb3J1bScsICdwbHVnaW5zLXBhbmVsJyk7XG4gICAgY29uc3QgcHVibGlzaGVyUGFuZWwgPSB0aGlzLmNyZWF0ZVBhbmVsKCdQdWJsaXNoZXIgSW5mbycsICdpcHN1bSBsb3J1bScsICdwdWJsaXNoZXItcGFuZWwnKTtcblxuICAgIC8vIHBhbmVsIGdyb3VwXG4gICAgY29uc3QgcGFuZWxHcm91cEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5jbGFzc05hbWUgPSAncGFuZWwtZ3JvdXAnO1xuICAgIHBhbmVsR3JvdXBFbGVtZW50LmFwcGVuZENoaWxkKGxpY2VuY2VQYW5lbCk7XG4gICAgcGFuZWxHcm91cEVsZW1lbnQuYXBwZW5kQ2hpbGQocGx1Z2luc1BhbmVsKTtcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5hcHBlbmRDaGlsZChwdWJsaXNoZXJQYW5lbCk7XG5cbiAgICAvLyBhZGQgcm9vdCBlbGVtZW50XG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChiYWNrQnV0dG9uRWxlbWVudCk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChkZXRhaWxzRWxlbWVudCk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChidXR0b25CYXIpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocGFuZWxHcm91cEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlJZFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZVBhbmVsKHRpdGxlLCBib2R5LCBib2R5SWQpIHtcbiAgICBjb25zdCBoZWFkZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhlYWRlckVsLmNsYXNzTmFtZSA9ICdwYW5lbC1oZWFkZXInO1xuICAgIGhlYWRlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgIGhlYWRlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGJvZHlJZCk7XG4gICAgaGVhZGVyRWwuaW5uZXJIVE1MID0gdGl0bGU7XG5cbiAgICBjb25zdCBib2R5SW5uZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvZHlJbm5lckVsLmNsYXNzTmFtZSA9ICdwYW5lbC1ib2R5LWlubmVyJztcbiAgICBib2R5SW5uZXJFbC5pbm5lckhUTUwgPSBib2R5O1xuXG4gICAgY29uc3QgYm9keUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm9keUVsLmNsYXNzTmFtZSA9ICdwYW5lbC1ib2R5JztcbiAgICBib2R5RWwuaWQgPSBib2R5SWQ7XG4gICAgYm9keUVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGJvZHlFbC5hcHBlbmRDaGlsZChib2R5SW5uZXJFbCk7XG5cbiAgICBjb25zdCBwYW5lbEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFuZWxFbC5jbGFzc05hbWUgPSAncGFuZWwnO1xuICAgIHBhbmVsRWwuYXBwZW5kQ2hpbGQoaGVhZGVyRWwpO1xuICAgIHBhbmVsRWwuYXBwZW5kQ2hpbGQoYm9keUVsKTtcblxuICAgIGluaXRQYW5lbChwYW5lbEVsKTtcblxuICAgIHJldHVybiBwYW5lbEVsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGltYWdlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAgICovXG4gIHNldEltYWdlKHNyYykge1xuICAgIHRoaXMuaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0SWQoaWQpIHtcbiAgICB0aGlzLmluc3RhbGxCdXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGlkKTtcbiAgICB0aGlzLnVzZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKi9cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovXG4gIHNldERlc2NyaXB0aW9uKHRleHQpIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IHRleHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZXhhbXBsZSB1cmxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgc2V0RXhhbXBsZSh1cmwpIHtcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmRlbW9CdXR0b24sICFpc0VtcHR5KHVybCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgaWYgdGhlIGNvbnRlbnQgdHlwZSBpcyBpbnN0YWxsZWRcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBpbnN0YWxsZWRcbiAgICovXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy51c2VCdXR0b24sIGluc3RhbGxlZCk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmluc3RhbGxCdXR0b24sICFpbnN0YWxsZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZURldGFpbFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWRldGFpbC12aWV3XCI7XG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSBcIi4uL2h1Yi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsIHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlRGV0YWlsVmlldyhzdGF0ZSk7XG4gICAgdGhpcy52aWV3Lm9uKCdpbnN0YWxsJywgdGhpcy5pbnN0YWxsLCB0aGlzKTtcblxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ2Nsb3NlJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBsb2FkQnlJZChpZCkge1xuICAgIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICAgaW5zdGFsbCh7aWR9KSB7XG4gICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKVxuICAgICAgIC50aGVuKG1hY2hpbmVOYW1lID0+IHRoaXMuc2VydmljZXMuaW5zdGFsbENvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSlcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiBjb25zb2xlLmRlYnVnKCdUT0RPLCBndWkgdXBkYXRlcycpKVxuICAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGNvbnRlbnQgdHlwZSBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICB1cGRhdGUoY29udGVudFR5cGUpIHtcbiAgICB0aGlzLnZpZXcuc2V0SWQoY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuICAgIHRoaXMudmlldy5zZXRUaXRsZShjb250ZW50VHlwZS50aXRsZSk7XG4gICAgdGhpcy52aWV3LnNldERlc2NyaXB0aW9uKGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uKTtcbiAgICB0aGlzLnZpZXcuc2V0SW1hZ2UoY29udGVudFR5cGUuaWNvbik7XG4gICAgdGhpcy52aWV3LnNldEV4YW1wbGUoY29udGVudFR5cGUuZXhhbXBsZSk7XG4gICAgdGhpcy52aWV3LnNldElzSW5zdGFsbGVkKCEhY29udGVudFR5cGUuaW5zdGFsbGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhpZGUgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIHJvb3QgZWxlbWVudFxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1saXN0JztcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHJvd3MgZnJvbSByb290IGVsZW1lbnRcbiAgICovXG4gIHJlbW92ZUFsbFJvd3MoKSB7XG4gICAgaWYodGhpcy5yb290RWxlbWVudCl7XG4gICAgICB3aGlsZSh0aGlzLnJvb3RFbGVtZW50LmZpcnN0Q2hpbGQpe1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMucm9vdEVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSByb3dcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICovXG4gIGFkZFJvdyhjb250ZW50VHlwZSkge1xuICAgIGNvbnN0IHJvdyA9IHRoaXMuY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHRoaXMpO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLCByb3cpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocm93KVxuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgQ29udGVudCBUeXBlIGNvbmZpZ3VyYXRpb24gYW5kIGNyZWF0ZXMgYSByb3cgZG9tXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IHNjb3BlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHNjb3BlKSB7XG4gICAgLy8gcm93IGl0ZW1cbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBlbGVtZW50LmlkID0gYGNvbnRlbnQtdHlwZS0ke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfWA7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG5cbiAgICAvLyBjcmVhdGUgYnV0dG9uIGNvbmZpZ1xuICAgIGNvbnN0IHVzZUJ1dHRvbkNvbmZpZyA9IHsgdGV4dDogJ1VzZScsIGNsczogJ2J1dHRvbi1wcmltYXJ5JyB9O1xuICAgIGNvbnN0IGluc3RhbGxCdXR0b25Db25maWcgPSB7IHRleHQ6ICdpbnN0YWxsJywgY2xzOiAnYnV0dG9uLWludmVyc2UtcHJpbWFyeSd9O1xuICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRlbnRUeXBlLmluc3RhbGxlZCA/ICB1c2VCdXR0b25Db25maWc6IGluc3RhbGxCdXR0b25Db25maWc7XG5cbiAgICAvLyBjcmVhdGUgaHRtbFxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtjb250ZW50VHlwZS5pY29ufVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gJHtidXR0b24uY2xzfVwiIGRhdGEtaWQ9XCIke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfVwiPiR7YnV0dG9uLnRleHR9PC9zcGFuPlxuICAgICAgPGg0PiR7Y29udGVudFR5cGUudGl0bGV9PC9oND5cbiAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPiR7Y29udGVudFR5cGUuc3VtbWFyeX08L2Rpdj5cbiAgIGA7XG5cbiAgICAvLyBoYW5kbGUgdXNlIGJ1dHRvblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1wcmltYXJ5Jyk7XG4gICAgaWYodXNlQnV0dG9uKXtcbiAgICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCBzY29wZSwgdXNlQnV0dG9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVMaXN0VmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtbGlzdC12aWV3XCI7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIFJvdyBzZWxlY3RlZCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogVXBkYXRlIGNvbnRlbnQgdHlwZSBsaXN0IGV2ZW50XG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3Qge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gYWRkIHRoZSB2aWV3XG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVMaXN0VmlldyhzdGF0ZSk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydyb3ctc2VsZWN0ZWQnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZSB0aGlzIGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHRoaXMgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCB3aXRoIG5ldyBjb250ZW50IHR5cGVzXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gICAqL1xuICB1cGRhdGUoY29udGVudFR5cGVzKSB7XG4gICAgdGhpcy52aWV3LnJlbW92ZUFsbFJvd3MoKTtcbiAgICBjb250ZW50VHlwZXMuZm9yRWFjaCh0aGlzLnZpZXcuYWRkUm93LCB0aGlzLnZpZXcpO1xuICAgIHRoaXMuZmlyZSgndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0Jywge30pO1xuICB9XG5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmlld3Mgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJpbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50QnJvd3NlclZpZXcge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xuICAgIGNvbnN0IG1lbnUgPSB0aGlzLmNyZWF0ZU1lbnVFbGVtZW50KCk7XG4gICAgY29uc3QgaW5wdXRHcm91cCA9IHRoaXMuY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQoKTtcblxuICAgIC8vIG1lbnUgZ3JvdXBcbiAgICBjb25zdCBtZW51R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZW51R3JvdXAuY2xhc3NOYW1lID0gJ21lbnUtZ3JvdXAnO1xuICAgIG1lbnVHcm91cC5hcHBlbmRDaGlsZChtZW51KTtcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRHcm91cCk7XG5cbiAgICAvLyByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQobWVudUdyb3VwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbWVudSBpdGVtXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgYWRkTWVudUl0ZW0odGV4dCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnVpdGVtJyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0O1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgnbWVudS1zZWxlY3RlZCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHNldHMgZmlyc3QgdG8gYmUgc2VsZWN0ZWRcbiAgICBpZih0aGlzLm1lbnVCYXJFbGVtZW50LmNoaWxkRWxlbWVudENvdW50IDwgMSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0byBtZW51IGJhclxuICAgIHRoaXMubWVudUJhckVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtZW51IGJhciBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVNZW51RWxlbWVudCgpIHtcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51YmFyJyk7XG4gICAgdGhpcy5tZW51QmFyRWxlbWVudC5jbGFzc05hbWUgPSAnaDVwLW1lbnUnO1xuXG4gICAgY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgIG5hdkVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5tZW51QmFyRWxlbWVudCk7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwibWVudS10aXRsZVwiO1xuICAgIHRpdGxlLmlubmVySFRNTCA9IFwiQnJvd3NlIGNvbnRlbnQgdHlwZXNcIjtcblxuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZW51LmNsYXNzTmFtZSA9IFwibWVudVwiO1xuICAgIG1lbnUuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgIG1lbnUuYXBwZW5kQ2hpbGQobmF2RWxlbWVudCk7XG5cbiAgICByZXR1cm4gbWVudTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBpbnB1dCBncm91cCB1c2VkIGZvciBzZWFyY2hcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVJbnB1dEdyb3VwRWxlbWVudCgpIHtcbiAgICAvLyBpbnB1dCBmaWVsZFxuICAgIGNvbnN0IGlucHV0RmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0RmllbGQuY2xhc3NOYW1lID0gJ2Zvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtcm91bmRlZCc7XG4gICAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIFwiU2VhcmNoIGZvciBDb250ZW50IFR5cGVzXCIpO1xuICAgIGlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICB0aGlzLmZpcmUoJ3NlYXJjaCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBxdWVyeTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGlucHV0IGJ1dHRvblxuICAgIGNvbnN0IGlucHV0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5wdXRCdXR0b24uY2xhc3NOYW1lID0gJ2lucHV0LWdyb3VwLWFkZG9uIGljb24tc2VhcmNoJztcblxuICAgIC8vIGlucHV0IGdyb3VwXG4gICAgY29uc3QgaW5wdXRHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGlucHV0R3JvdXAuY2xhc3NOYW1lID0gJ2lucHV0LWdyb3VwJztcbiAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0RmllbGQpO1xuICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRCdXR0b24pO1xuXG4gICAgcmV0dXJuIGlucHV0R3JvdXA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsImltcG9ydCBDb250ZW50VHlwZVNlY3Rpb25WaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXdcIjtcbmltcG9ydCBTZWFyY2hTZXJ2aWNlIGZyb20gXCIuLi9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZVwiO1xuaW1wb3J0IENvbnRlbnRUeXBlTGlzdCBmcm9tICcuLi9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdCc7XG5pbXBvcnQgQ29udGVudFR5cGVEZXRhaWwgZnJvbSAnLi4vY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsJztcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMvZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb25WaWV3KHN0YXRlKTtcblxuICAgIC8vIGNvbnRyb2xsZXJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZSh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbCA9IG5ldyBDb250ZW50VHlwZURldGFpbCh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XG5cbiAgICAvLyBhZGQgbWVudSBpdGVtc1xuICAgIFsnTXkgQ29udGVudCBUeXBlcycsICdOZXdlc3QnLCAnTW9zdCBQb3B1bGFyJywgJ1JlY29tbWVuZGVkJ11cbiAgICAgIC5mb3JFYWNoKG1lbnVUZXh0ID0+IHRoaXMudmlldy5hZGRNZW51SXRlbShtZW51VGV4dCkpO1xuXG4gICAgLy8gRWxlbWVudCBmb3IgaG9sZGluZyBsaXN0IGFuZCBkZXRhaWxzIHZpZXdzXG4gICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY29udGVudC10eXBlLXNlY3Rpb24nKTtcblxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBzZWN0aW9uO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZUxpc3QuZ2V0RWxlbWVudCgpKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVEZXRhaWwuZ2V0RWxlbWVudCgpKTtcblxuICAgIHRoaXMudmlldy5nZXRFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5yb290RWxlbWVudCk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0J10sIHRoaXMuY29udGVudFR5cGVMaXN0KTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCddLCB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsKTtcblxuICAgIC8vIHJlZ2lzdGVyIGxpc3RlbmVyc1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5zZWFyY2gsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMuYXBwbHlTZWFyY2hGaWx0ZXIsIHRoaXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0Lm9uKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLnNob3dEZXRhaWxWaWV3LCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLm9uKCdjbG9zZScsIHRoaXMuY2xvc2VEZXRhaWxWaWV3LCB0aGlzKTtcblxuICAgIHRoaXMuaW5pdENvbnRlbnRUeXBlTGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3Qgd2l0aCBhIHNlYXJjaFxuICAgKi9cbiAgaW5pdENvbnRlbnRUeXBlTGlzdCgpIHtcbiAgICAvLyBpbml0aWFsaXplIGJ5IHNlYXJjaFxuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goXCJcIilcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmZpcmUoJ2Vycm9yJywgZXJyb3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBhIHNlYXJjaCBhbmQgdXBkYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3RcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XG4gICAqL1xuICBzZWFyY2goe3F1ZXJ5fSkge1xuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2gocXVlcnkpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3VsZCBhcHBseSBhIHNlYXJjaCBmaWx0ZXJcbiAgICovXG4gIGFwcGx5U2VhcmNoRmlsdGVyKCkge1xuICAgIGNvbnNvbGUuZGVidWcoJ0NvbnRlbnRUeXBlU2VjdGlvbjogbWVudSB3YXMgY2xpY2tlZCEnLCBldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgZGV0YWlsIHZpZXdcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzaG93RGV0YWlsVmlldyh7aWR9KSB7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwubG9hZEJ5SWQoaWQpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuc2hvdygpO1xuICB9XG5cblxuICAvKipcbiAgICogQ2xvc2UgZGV0YWlsIHZpZXdcbiAgICovXG4gIGNsb3NlRGV0YWlsVmlldygpIHtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwiaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiXG5pbXBvcnQgaW5pdFRhYlBhbmVsIGZyb20gXCJjb21wb25lbnRzL3RhYi1wYW5lbFwiXG5pbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBhdHRyaWJ1dGVFcXVhbHMsIGdldEF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi91dGlscy9ldmVudHMnO1xuLyoqXG4gKiBUYWIgY2hhbmdlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyN0YWItY2hhbmdlXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIFBhbmVsIG9wZW4gb3IgY2xvc2UgZXZlbnRcbiAqIEBldmVudCBIdWJWaWV3I3BhbmVsLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0RBVEFfSUQgPSAnZGF0YS1pZCc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGlzT3BlbiA9IGhhc0F0dHJpYnV0ZSgnb3BlbicpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViVmlldyN0YWItY2hhbmdlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlZpZXcge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICB0aGlzLnJlbmRlclRhYlBhbmVsKHN0YXRlKTtcbiAgICB0aGlzLnJlbmRlclBhbmVsKHN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHBhbmVsXG4gICAqL1xuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4cGFuZGVkXG4gICAqL1xuICByZW5kZXJQYW5lbCh7dGl0bGUgPSAnJywgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnLCBleHBhbmRlZCA9IGZhbHNlfSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50aXRsZS5jbGFzc05hbWUgKz0gXCJwYW5lbC1oZWFkZXIgaWNvbi1odWItaWNvblwiO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgKCEhZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YCk7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncGFuZWwtY2hhbmdlJywgdGhpcywgdGhpcy50aXRsZSk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5ib2R5LmNsYXNzTmFtZSArPSBcInBhbmVsLWJvZHlcIjtcbiAgICB0aGlzLmJvZHkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMuYm9keS5pZCA9IGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWA7XG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lICs9IGBwYW5lbCBoNXAtc2VjdGlvbi0ke3NlY3Rpb25JZH1gO1xuICAgIGlmKGV4cGFuZGVkKXtcbiAgICAgIHRoaXMucGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgIH1cbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5ib2R5KTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lICs9IGBoNXAgaDVwLWh1YmA7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBhbmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlIHRoZSBwYW5lbCBhdHRyaWJpdXRlcyBmcm9tIGg1cC1zZGssIGUuZy4gb3BlbmluZyBhbmQgY2xvc2luZ1xuICAgKiBUaGlzIGlzIG9ubHkgY2FsbGVkIG9uY2Ugbm8gZXJyb3JzIGhhdmUgb2NjdXJlZCBpbiBsb2FkaW5nIHRoZSBodWJcbiAgICovXG4gIGluaXRpYWxpemVQYW5lbCgpe1xuICAgIGluaXRQYW5lbCh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaWYgcGFuZWwgaXMgb3BlbiwgdGhpcyBpcyB1c2VkIGZvciBvdXRlciBib3JkZXIgY29sb3JcbiAgICovXG4gIHRvZ2dsZVBhbmVsT3BlbigpIHtcbiAgICBpZihpc09wZW4odGhpcy5wYW5lbCkpIHtcbiAgICAgIHRoaXMucGFuZWwucmVtb3ZlQXR0cmlidXRlKCdvcGVuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5wYW5lbC5zZXRBdHRyaWJ1dGUoJ29wZW4nLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHRhYiBwYW5lbFxuICAgKi9cbiAgcmVuZGVyVGFiUGFuZWwoc3RhdGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnRhYmxpc3QuY2xhc3NOYW1lICs9IFwidGFibGlzdFwiO1xuICAgIHRoaXMudGFibGlzdC5zZXRBdHRyaWJ1dGUgKCdyb2xlJywgJ3RhYmxpc3QnKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgdGhpcy50YWJMaXN0V3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxpc3QpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5jbGFzc05hbWUgKz0gJ3RhYi1wYW5lbCc7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGFiTGlzdFdyYXBwZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0YWJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2VsZWN0ZWRcbiAgICovXG4gIGFkZFRhYih7dGl0bGUsIGlkLCBjb250ZW50LCBzZWxlY3RlZCA9IGZhbHNlfSkge1xuICAgIGNvbnN0IHRhYklkID0gYHRhYi0ke2lkfWA7XG4gICAgY29uc3QgdGFiUGFuZWxJZCA9IGB0YWItcGFuZWwtJHtpZH1gO1xuXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0YWIuY2xhc3NOYW1lICs9ICd0YWInO1xuICAgIHRhYi5pZCA9IHRhYklkO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0YWJQYW5lbElkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgc2VsZWN0ZWQudG9TdHJpbmcoKSk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfREFUQV9JRCwgaWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFiJyk7XG4gICAgdGFiLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCd0YWItY2hhbmdlJywgdGhpcywgdGFiKTtcblxuICAgIGNvbnN0IHRhYlBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFiUGFuZWwuaWQgPSB0YWJQYW5lbElkO1xuICAgIHRhYlBhbmVsLmNsYXNzTmFtZSArPSAndGFicGFuZWwnO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJsbGVkYnknLCB0YWJJZCk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghc2VsZWN0ZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWJwYW5lbCcpO1xuICAgIHRhYlBhbmVsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKHRhYik7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRhYlBhbmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGFuaW1hdGVkIGJvcmRlciB0byB0aGUgYm90dG9tIG9mIHRoZSB0YWJcbiAgICovXG4gIGFkZEJvdHRvbUJvcmRlcigpIHtcbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcbiAgfVxuXG4gIGluaXRUYWJQYW5lbCgpIHtcbiAgICBpbml0VGFiUGFuZWwodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0U2VjdGlvblR5cGUoe2lkfSkge1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lID0gYGg1cC1zZWN0aW9uLSR7aWR9IHBhbmVsYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwiaW1wb3J0IHtjdXJyeSwgbWFwLCBmaWx0ZXJ9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCJcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tIFwiLi4vaHViLXNlcnZpY2VzXCI7XG5pbXBvcnQgbHVuciBmcm9tIFwibHVuclwiXG5cbi8qKlxuICogQGNsYXNzXG4gKiBUaGUgU2VhcmNoIFNlcnZpY2UgZ2V0cyBhIGNvbnRlbnQgdHlwZXMgZnJvbSBIdWJTZXJ2aWNlc1xuICogdGhlbiBpbmRleGVzIHRoZW0gdXNpbmcgbHVucmpzLiBJdCB0aGVuIHNlYXJjaGVzIHRocm91Z2hcbiAqIHRoZSBsdW5yanMgaW5kZXggYW5kIHJldHVybnMgY29udGVudCB0eXBlcyB0aGF0IG1hdGNoIHRoZSBxdWVyeS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoU2VydmljZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLmFwaVJvb3RVcmxcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBTZXQgdXAgbHVuciBpbmRleFxuICAgIHRoaXMuaW5kZXggPSBsdW5yKGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5maWVsZCgndGl0bGUnLCB7Ym9vc3Q6IDEwfSk7IC8vIENlcnRhaW4gZmllbGRzIGNhbiBnaXZlbiBhIGhpZ2hlciBpbXBvcnRhbmNlXG4gICAgICB0aGlzLmZpZWxkKCdzdW1tYXJ5Jyk7XG4gICAgICB0aGlzLmZpZWxkKCdkZXNjcmlwdGlvbicpO1xuICAgICAgdGhpcy5maWVsZCgna2V5d29yZHMnKTtcbiAgICAgIHRoaXMucmVmKCdpZCcpOyAvL1xuICAgIH0pO1xuXG4gICAgLy8gQWRkIGNvbnRlbnQgdHlwZXMgdG8gdGhlIHNlYXJjaCBpbmRleFxuICAgIHRoaXMuY29udGVudFR5cGVzID0gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZXMoKVxuICAgICAgLnRoZW4obWFwKGFkZFRvSW5kZXgodGhpcy5pbmRleCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHNlYXJjaFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnlcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZTxDb250ZW50VHlwZVtdPn0gQSBwcm9taXNlIG9mIGFuIGFycmF5IG9mIGNvbnRlbnQgdHlwZXNcbiAgICovXG4gIHNlYXJjaChxdWVyeSkge1xuICAgIC8vIERpc3BsYXkgYWxsIGNvbnRlbnQgdHlwZXMgYnkgZGVmYXVsdFxuICAgIGlmIChxdWVyeSA9PT0gJycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRUeXBlcztcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UsIGZpbHRlciBjb250ZW50IHR5cGVzIGJ5IGEgcXVlcnlcbiAgICByZXR1cm4gdGhpcy5jb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5kZXguc2VhcmNoKHF1ZXJ5KVxuICAgICAgICAubWFwKHJlc3VsdCA9PiByZXN1bHQucmVmKVxuICAgICAgICAubWFwKGZpbmRDb250ZW50VHlwZUJ5TWFjaGluZU5hbWUoY29udGVudFR5cGVzKSlcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYSBjb250ZW50IHR5cGUgdG8gdGhlIGx1bnJqcyBzZWFyY2ggaW5kZXhcbiAqIGNyZWF0ZXMgYW4gaWQgZm9yIHRoZSBpbmRleCB1c2luZyB0aGUgbWFjaGluZSBuYW1lXG4gKiBvZiB0aGUgY29udGVudCB0eXBlLlxuICpcbiAqIEBwYXJhbSAge2x1bnIuSW5kZXh9IGluZGV4XG4gKiBAcGFyYW0gIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAqXG4gKiBAcmV0dXJuIHtDb250ZW50VHlwZX1cbiAqL1xuY29uc3QgYWRkVG9JbmRleCA9IGN1cnJ5KChpbmRleCwgY29udGVudFR5cGUpID0+IHtcbiAgaW5kZXguYWRkKHtcbiAgICB0aXRsZTogY29udGVudFR5cGUudGl0bGUsXG4gICAgc3VtbWFyeTogY29udGVudFR5cGUuc3VtbWFyeSxcbiAgICBkZXNjcmlwdGlvbjogY29udGVudFR5cGUuZGVzY3JpcHRpb24sXG4gICAga2V5d29yZHM6IGNvbnRlbnRUeXBlLmtleXdvcmRzLFxuICAgIGlkOiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZVxuICB9KTtcblxuICByZXR1cm4gY29udGVudFR5cGU7XG59KTtcblxuLyoqXG4gKiBoZWxwZXIgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gIHtDb250ZW50VHlwZVtdfVxuICogQHBhcmFtICB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICogQHJldHVybiB7Q29udGVudFR5cGV9XG4gKi9cbmNvbnN0IGZpbmRDb250ZW50VHlwZUJ5TWFjaGluZU5hbWUgPSBjdXJyeShmdW5jdGlvbihjb250ZW50VHlwZXMsIG1hY2hpbmVOYW1lKSB7XG4gIHJldHVybiBjb250ZW50VHlwZXMuZmlsdGVyKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lID09PSBtYWNoaW5lTmFtZSlbMF07XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwiLyoqXG4gKiBAY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkU2VjdGlvbiB7XG4gIGdldEVsZW1lbnQoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJUT0RPIFVwbG9hZFwiO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJyZXF1aXJlKCcuLi8uLi9zcmMvc3R5bGVzL21haW4uc2NzcycpO1xuXG4vLyBMb2FkIGxpYnJhcnlcbkg1UCA9IEg1UCB8fCB7fTtcbkg1UC5IdWJDbGllbnQgPSByZXF1aXJlKCcuLi9zY3JpcHRzL2h1YicpLmRlZmF1bHQ7XG5INVAuSHViQ2xpZW50LnJlbmRlckVycm9yTWVzc2FnZSA9IHJlcXVpcmUoJy4uL3NjcmlwdHMvdXRpbHMvZXJyb3JzJykuZGVmYXVsdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwic291cmNlUm9vdCI6IiJ9