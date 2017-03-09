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

    // don't bubble
    event.stopPropagation();
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

    // images
    this.carousel = document.createElement('ul');

    // add root element
    this.rootElement = document.createElement('div');
    this.rootElement.className = 'content-type-detail';
    this.rootElement.setAttribute('aria-hidden', 'true');
    this.rootElement.appendChild(backButtonElement);
    this.rootElement.appendChild(detailsElement);
    this.rootElement.appendChild(buttonBar);
    this.rootElement.appendChild(this.carousel);
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
     * Add image to the carousel
     *
     * @param {object} image
     */

  }, {
    key: "addImageToCarousel",
    value: function addImageToCarousel(image) {
      var item = document.createElement('li');
      item.innerHTML = "<img src=\"" + image.url + "\" alt=\"" + image.alt + "\" style=\"width: 100px;\"/>";

      this.carousel.appendChild(item);
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

      contentType.screenshots.forEach(this.view.addImageToCarousel, this.view);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzkxNzRkN2ZkNGI5Nzg2YzE1MWIiLCJ3ZWJwYWNrOi8vLy4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uL34vbHVuci9sdW5yLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudHJpZXMvZGlzdC5qcyJdLCJuYW1lcyI6WyJjdXJyeSIsImZuIiwiYXJpdHkiLCJsZW5ndGgiLCJmMSIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFwcGx5IiwiZjIiLCJhcmdzMiIsImNvbmNhdCIsImNvbXBvc2UiLCJmbnMiLCJyZWR1Y2UiLCJmIiwiZyIsImZvckVhY2giLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJFdmVudGZ1bCIsImxpc3RlbmVycyIsIm9uIiwidHlwZSIsImxpc3RlbmVyIiwic2NvcGUiLCJ0cmlnZ2VyIiwicHVzaCIsImZpcmUiLCJldmVudCIsInRyaWdnZXJzIiwiZXZlcnkiLCJwcm9wYWdhdGUiLCJ0eXBlcyIsImV2ZW50ZnVsIiwic2VsZiIsImdldEF0dHJpYnV0ZSIsIm5hbWUiLCJlbCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsImF0dHJpYnV0ZUVxdWFscyIsInRvZ2dsZUF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicGFyZW50IiwiY2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVuZGVyRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNsb3NlQnV0dG9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibWVzc2FnZUNvbnRlbnQiLCJ0aXRsZSIsImNvbnRlbnQiLCJtZXNzYWdlV3JhcHBlciIsImRpc21pc3NpYmxlIiwiYnV0dG9uIiwidW5kZWZpbmVkIiwibWVzc2FnZUJ1dHRvbiIsImNvbnNvbGUiLCJsb2ciLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJ3aW5kb3ciLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZXMiLCJjb250ZW50VHlwZSIsImlkIiwiYm9keSIsInJlbGF5Q2xpY2tFdmVudEFzIiwiZWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJpbml0IiwiaXNFeHBhbmRlZCIsImhpZGUiLCJzaG93IiwidG9nZ2xlQm9keVZpc2liaWxpdHkiLCJib2R5RWxlbWVudCIsIm9uQXJpYUV4cGFuZGVkQ2hhbmdlIiwidGFyZ2V0IiwidGl0bGVFbCIsImJvZHlJZCIsImJvZHlFbCIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJIdWIiLCJzdGF0ZSIsImNvbnRlbnRUeXBlU2VjdGlvbiIsInVwbG9hZFNlY3Rpb24iLCJ2aWV3Iiwic2VydmljZXMiLCJzZXRQYW5lbFRpdGxlIiwiY2xvc2VQYW5lbCIsInNldFNlY3Rpb25UeXBlIiwidG9nZ2xlUGFuZWxPcGVuIiwiYmluZCIsImluaXRpYWxpemVQYW5lbCIsImluaXRUYWJQYW5lbCIsImdldENvbnRlbnRUeXBlIiwic2V0VGl0bGUiLCJ0YWJDb25maWdzIiwiZ2V0RWxlbWVudCIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiYWRkQm90dG9tQm9yZGVyIiwiaGlkZUFsbCIsInVuU2VsZWN0QWxsIiwidGFicyIsInRhYlBhbmVscyIsInRhYiIsInRhYlBhbmVsSWQiLCJsdW5yIiwiY29uZmlnIiwiaWR4IiwiSW5kZXgiLCJwaXBlbGluZSIsImFkZCIsInRyaW1tZXIiLCJzdG9wV29yZEZpbHRlciIsInN0ZW1tZXIiLCJ2ZXJzaW9uIiwidXRpbHMiLCJ3YXJuIiwiZ2xvYmFsIiwiYXNTdHJpbmciLCJvYmoiLCJFdmVudEVtaXR0ZXIiLCJldmVudHMiLCJhZGRMaXN0ZW5lciIsInBvcCIsIm5hbWVzIiwiVHlwZUVycm9yIiwiaGFzSGFuZGxlciIsInJlbW92ZUxpc3RlbmVyIiwiZm5JbmRleCIsInNwbGljZSIsImVtaXQiLCJ0b2tlbml6ZXIiLCJpc0FycmF5IiwidCIsInRvTG93ZXJDYXNlIiwidHJpbSIsInNwbGl0Iiwic2VwYXJhdG9yIiwibG9hZCIsImxhYmVsIiwicmVnaXN0ZXJlZEZ1bmN0aW9ucyIsIkVycm9yIiwicmVnaXN0ZXJGdW5jdGlvbiIsIlBpcGVsaW5lIiwiX3N0YWNrIiwid2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkIiwiaXNSZWdpc3RlcmVkIiwic2VyaWFsaXNlZCIsImZuTmFtZSIsImFmdGVyIiwiZXhpc3RpbmdGbiIsIm5ld0ZuIiwicG9zIiwiYmVmb3JlIiwicmVtb3ZlIiwicnVuIiwidG9rZW5zIiwib3V0IiwidG9rZW5MZW5ndGgiLCJzdGFja0xlbmd0aCIsImkiLCJ0b2tlbiIsImoiLCJyZXNldCIsInRvSlNPTiIsIlZlY3RvciIsIl9tYWduaXR1ZGUiLCJsaXN0IiwiTm9kZSIsInZhbCIsIm5leHQiLCJpbnNlcnQiLCJwcmV2IiwibWFnbml0dWRlIiwibm9kZSIsInN1bU9mU3F1YXJlcyIsIk1hdGgiLCJzcXJ0IiwiZG90Iiwib3RoZXJWZWN0b3IiLCJvdGhlck5vZGUiLCJkb3RQcm9kdWN0Iiwic2ltaWxhcml0eSIsIlNvcnRlZFNldCIsImVsZW1lbnRzIiwic2VyaWFsaXNlZERhdGEiLCJzZXQiLCJsb2NhdGlvbkZvciIsInRvQXJyYXkiLCJjdHgiLCJlbGVtIiwic3RhcnQiLCJlbmQiLCJzZWN0aW9uTGVuZ3RoIiwicGl2b3QiLCJmbG9vciIsInBpdm90RWxlbSIsImludGVyc2VjdCIsIm90aGVyU2V0IiwiaW50ZXJzZWN0U2V0IiwiYV9sZW4iLCJiX2xlbiIsImEiLCJiIiwiY2xvbmUiLCJ1bmlvbiIsImxvbmdTZXQiLCJzaG9ydFNldCIsInVuaW9uU2V0Iiwic2hvcnRTZXRFbGVtZW50cyIsIl9maWVsZHMiLCJfcmVmIiwiZG9jdW1lbnRTdG9yZSIsIlN0b3JlIiwidG9rZW5TdG9yZSIsIlRva2VuU3RvcmUiLCJjb3JwdXNUb2tlbnMiLCJldmVudEVtaXR0ZXIiLCJ0b2tlbml6ZXJGbiIsIl9pZGZDYWNoZSIsIm9mZiIsImZpZWxkcyIsInJlZiIsImZpZWxkIiwiZmllbGROYW1lIiwib3B0cyIsImJvb3N0IiwicmVmTmFtZSIsImRvYyIsImVtaXRFdmVudCIsImRvY1Rva2VucyIsImFsbERvY3VtZW50VG9rZW5zIiwiZG9jUmVmIiwiZmllbGRUb2tlbnMiLCJ0ZiIsImZpZWxkTGVuZ3RoIiwidG9rZW5Db3VudCIsImsiLCJoYXMiLCJnZXQiLCJ1cGRhdGUiLCJpZGYiLCJ0ZXJtIiwiY2FjaGVLZXkiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsImRvY3VtZW50RnJlcXVlbmN5IiwiY291bnQiLCJzZWFyY2giLCJxdWVyeSIsInF1ZXJ5VG9rZW5zIiwicXVlcnlWZWN0b3IiLCJkb2N1bWVudFNldHMiLCJmaWVsZEJvb3N0cyIsIm1lbW8iLCJoYXNTb21lVG9rZW4iLCJleHBhbmQiLCJrZXkiLCJzaW1pbGFyaXR5Qm9vc3QiLCJkaWZmIiwibWF4IiwibWF0Y2hpbmdEb2N1bWVudHMiLCJyZWZzIiwia2V5cyIsInJlZnNMZW4iLCJkb2N1bWVudFNldCIsInNjb3JlIiwiZG9jdW1lbnRWZWN0b3IiLCJzb3J0IiwiZG9jdW1lbnRSZWYiLCJkb2N1bWVudFRva2VucyIsImRvY3VtZW50VG9rZW5zTGVuZ3RoIiwidXNlIiwicGx1Z2luIiwidW5zaGlmdCIsInN0b3JlIiwic3RlcDJsaXN0Iiwic3RlcDNsaXN0IiwiYyIsInYiLCJDIiwiViIsIm1ncjAiLCJtZXExIiwibWdyMSIsInNfdiIsInJlX21ncjAiLCJSZWdFeHAiLCJyZV9tZ3IxIiwicmVfbWVxMSIsInJlX3NfdiIsInJlXzFhIiwicmUyXzFhIiwicmVfMWIiLCJyZTJfMWIiLCJyZV8xYl8yIiwicmUyXzFiXzIiLCJyZTNfMWJfMiIsInJlNF8xYl8yIiwicmVfMWMiLCJyZV8yIiwicmVfMyIsInJlXzQiLCJyZTJfNCIsInJlXzUiLCJyZV81XzEiLCJyZTNfNSIsInBvcnRlclN0ZW1tZXIiLCJ3Iiwic3RlbSIsInN1ZmZpeCIsImZpcnN0Y2giLCJyZSIsInJlMiIsInJlMyIsInJlNCIsInN1YnN0ciIsInRvVXBwZXJDYXNlIiwidGVzdCIsInJlcGxhY2UiLCJmcCIsImV4ZWMiLCJnZW5lcmF0ZVN0b3BXb3JkRmlsdGVyIiwic3RvcFdvcmRzIiwid29yZHMiLCJzdG9wV29yZCIsInJvb3QiLCJkb2NzIiwiY2hhckF0IiwicmVzdCIsImdldE5vZGUiLCJmYWN0b3J5IiwiZGVmaW5lIiwiZXhwb3J0cyIsIm1vZHVsZSIsIkFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQiLCJ0b2dnbGVWaXNpYmlsaXR5IiwidmlzaWJsZSIsImlzRW1wdHkiLCJ0ZXh0IiwiQ29udGVudFR5cGVEZXRhaWxWaWV3IiwiYmFja0J1dHRvbkVsZW1lbnQiLCJpbWFnZSIsImltYWdlV3JhcHBlckVsZW1lbnQiLCJhdXRob3IiLCJkZXNjcmlwdGlvbiIsImRlbW9CdXR0b24iLCJ0ZXh0RGV0YWlscyIsImRldGFpbHNFbGVtZW50IiwidXNlQnV0dG9uIiwiaW5zdGFsbEJ1dHRvbiIsImJ1dHRvbkJhciIsImxpY2VuY2VQYW5lbCIsImNyZWF0ZVBhbmVsIiwicGx1Z2luc1BhbmVsIiwicHVibGlzaGVyUGFuZWwiLCJwYW5lbEdyb3VwRWxlbWVudCIsImNhcm91c2VsIiwicm9vdEVsZW1lbnQiLCJoZWFkZXJFbCIsImJvZHlJbm5lckVsIiwicGFuZWxFbCIsIml0ZW0iLCJ1cmwiLCJhbHQiLCJzcmMiLCJpbnN0YWxsZWQiLCJDb250ZW50VHlwZURldGFpbCIsImluc3RhbGwiLCJpbnN0YWxsQ29udGVudFR5cGUiLCJkZWJ1ZyIsInNldElkIiwic2V0RGVzY3JpcHRpb24iLCJzZXRJbWFnZSIsImljb24iLCJzZXRFeGFtcGxlIiwiZXhhbXBsZSIsInNldElzSW5zdGFsbGVkIiwic2NyZWVuc2hvdHMiLCJhZGRJbWFnZVRvQ2Fyb3VzZWwiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwicm93IiwiY3JlYXRlQ29udGVudFR5cGVSb3ciLCJ1c2VCdXR0b25Db25maWciLCJjbHMiLCJpbnN0YWxsQnV0dG9uQ29uZmlnIiwic3VtbWFyeSIsIkNvbnRlbnRUeXBlTGlzdCIsInJlbW92ZUFsbFJvd3MiLCJhZGRSb3ciLCJDb250ZW50QnJvd3NlclZpZXciLCJtZW51IiwiY3JlYXRlTWVudUVsZW1lbnQiLCJpbnB1dEdyb3VwIiwiY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQiLCJtZW51R3JvdXAiLCJtZW51QmFyRWxlbWVudCIsImNoaWxkRWxlbWVudENvdW50IiwibmF2RWxlbWVudCIsImlucHV0RmllbGQiLCJpbnB1dEJ1dHRvbiIsIkNvbnRlbnRUeXBlU2VjdGlvbiIsInNlYXJjaFNlcnZpY2UiLCJjb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZURldGFpbCIsImFkZE1lbnVJdGVtIiwibWVudVRleHQiLCJzZWN0aW9uIiwiY2xhc3NMaXN0IiwiYXBwbHlTZWFyY2hGaWx0ZXIiLCJzaG93RGV0YWlsVmlldyIsImNsb3NlRGV0YWlsVmlldyIsImluaXRDb250ZW50VHlwZUxpc3QiLCJjYXRjaCIsImVycm9yIiwibG9hZEJ5SWQiLCJBVFRSSUJVVEVfREFUQV9JRCIsImlzT3BlbiIsIkh1YlZpZXciLCJyZW5kZXJUYWJQYW5lbCIsInJlbmRlclBhbmVsIiwic2VjdGlvbklkIiwiZXhwYW5kZWQiLCJ0YWJDb250YWluZXJFbGVtZW50IiwicGFuZWwiLCJ0YWJsaXN0IiwidGFiTGlzdFdyYXBwZXIiLCJ0YWJJZCIsInRhYlBhbmVsIiwiU2VhcmNoU2VydmljZSIsImluZGV4IiwiYWRkVG9JbmRleCIsImZpbmRDb250ZW50VHlwZUJ5TWFjaGluZU5hbWUiLCJrZXl3b3JkcyIsIlVwbG9hZFNlY3Rpb24iLCJyZXF1aXJlIiwiSDVQIiwiSHViQ2xpZW50IiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRUE7Ozs7Ozs7OztBQVNPLElBQU1BLHdCQUFRLFNBQVJBLEtBQVEsQ0FBU0MsRUFBVCxFQUFhO0FBQ2hDLE1BQU1DLFFBQVFELEdBQUdFLE1BQWpCOztBQUVBLFNBQU8sU0FBU0MsRUFBVCxHQUFjO0FBQ25CLFFBQU1DLE9BQU9DLE1BQU1DLFNBQU4sQ0FBZ0JDLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQkMsU0FBM0IsRUFBc0MsQ0FBdEMsQ0FBYjtBQUNBLFFBQUlMLEtBQUtGLE1BQUwsSUFBZUQsS0FBbkIsRUFBMEI7QUFDeEIsYUFBT0QsR0FBR1UsS0FBSCxDQUFTLElBQVQsRUFBZU4sSUFBZixDQUFQO0FBQ0QsS0FGRCxNQUdLO0FBQ0gsYUFBTyxTQUFTTyxFQUFULEdBQWM7QUFDbkIsWUFBTUMsUUFBUVAsTUFBTUMsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCQyxTQUEzQixFQUFzQyxDQUF0QyxDQUFkO0FBQ0EsZUFBT04sR0FBR08sS0FBSCxDQUFTLElBQVQsRUFBZU4sS0FBS1MsTUFBTCxDQUFZRCxLQUFaLENBQWYsQ0FBUDtBQUNELE9BSEQ7QUFJRDtBQUNGLEdBWEQ7QUFZRCxDQWZNOztBQWlCUDs7Ozs7Ozs7OztBQVVPLElBQU1FLDRCQUFVLFNBQVZBLE9BQVU7QUFBQSxvQ0FBSUMsR0FBSjtBQUFJQSxPQUFKO0FBQUE7O0FBQUEsU0FBWUEsSUFBSUMsTUFBSixDQUFXLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLFdBQVU7QUFBQSxhQUFhRCxFQUFFQyw2QkFBRixDQUFiO0FBQUEsS0FBVjtBQUFBLEdBQVgsQ0FBWjtBQUFBLENBQWhCOztBQUVQOzs7Ozs7Ozs7OztBQVdPLElBQU1DLDRCQUFVcEIsTUFBTSxVQUFVQyxFQUFWLEVBQWNvQixHQUFkLEVBQW1CO0FBQzlDQSxNQUFJRCxPQUFKLENBQVluQixFQUFaO0FBQ0QsQ0FGc0IsQ0FBaEI7O0FBSVA7Ozs7Ozs7Ozs7O0FBV08sSUFBTXFCLG9CQUFNdEIsTUFBTSxVQUFVQyxFQUFWLEVBQWNvQixHQUFkLEVBQW1CO0FBQzFDLFNBQU9BLElBQUlDLEdBQUosQ0FBUXJCLEVBQVIsQ0FBUDtBQUNELENBRmtCLENBQVo7O0FBSVA7Ozs7Ozs7Ozs7O0FBV08sSUFBTXNCLDBCQUFTdkIsTUFBTSxVQUFVQyxFQUFWLEVBQWNvQixHQUFkLEVBQW1CO0FBQzdDLFNBQU9BLElBQUlFLE1BQUosQ0FBV3RCLEVBQVgsQ0FBUDtBQUNELENBRnFCLENBQWY7O0FBSVA7Ozs7Ozs7Ozs7O0FBV08sSUFBTXVCLHNCQUFPeEIsTUFBTSxVQUFVQyxFQUFWLEVBQWNvQixHQUFkLEVBQW1CO0FBQzNDLFNBQU9BLElBQUlHLElBQUosQ0FBU3ZCLEVBQVQsQ0FBUDtBQUNELENBRm1CLENBQWI7O0FBSVA7Ozs7Ozs7Ozs7O0FBV08sSUFBTXdCLDhCQUFXekIsTUFBTSxVQUFVMEIsS0FBVixFQUFpQkwsR0FBakIsRUFBc0I7QUFDbEQsU0FBT0EsSUFBSU0sT0FBSixDQUFZRCxLQUFaLEtBQXNCLENBQUMsQ0FBOUI7QUFDRCxDQUZ1QixDQUFqQjs7QUFJUDs7Ozs7Ozs7Ozs7QUFXTyxJQUFNRSw0QkFBVTVCLE1BQU0sVUFBVTZCLE1BQVYsRUFBa0JSLEdBQWxCLEVBQXVCO0FBQ2xELFNBQU9FLE9BQU87QUFBQSxXQUFTLENBQUNFLFNBQVNDLEtBQVQsRUFBZ0JHLE1BQWhCLENBQVY7QUFBQSxHQUFQLEVBQTBDUixHQUExQyxDQUFQO0FBQ0QsQ0FGc0IsQ0FBaEI7O0FBSVA7Ozs7Ozs7O0FBUU8sSUFBTVMsc0RBQXVCLFNBQXZCQSxvQkFBdUIsQ0FBVUMsSUFBVixFQUFnQjtBQUNsRCxTQUFPLENBQUNBLFNBQVMsTUFBVixFQUFrQkMsUUFBbEIsRUFBUDtBQUNELENBRk0sQzs7Ozs7Ozs7Ozs7O0FDeElQOzs7QUFHTyxJQUFNQyw4QkFBVyxTQUFYQSxRQUFXO0FBQUEsU0FBTztBQUM3QkMsZUFBVyxFQURrQjs7QUFHN0I7Ozs7Ozs7Ozs7QUFVQUMsUUFBSSxZQUFTQyxJQUFULEVBQWVDLFFBQWYsRUFBeUJDLEtBQXpCLEVBQWdDO0FBQ2xDOzs7OztBQUtBLFVBQU1DLFVBQVU7QUFDZCxvQkFBWUYsUUFERTtBQUVkLGlCQUFTQztBQUZLLE9BQWhCOztBQUtBLFdBQUtKLFNBQUwsQ0FBZUUsSUFBZixJQUF1QixLQUFLRixTQUFMLENBQWVFLElBQWYsS0FBd0IsRUFBL0M7QUFDQSxXQUFLRixTQUFMLENBQWVFLElBQWYsRUFBcUJJLElBQXJCLENBQTBCRCxPQUExQjs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQTVCNEI7O0FBOEI3Qjs7Ozs7Ozs7O0FBU0FFLFVBQU0sY0FBU0wsSUFBVCxFQUFlTSxLQUFmLEVBQXNCO0FBQzFCLFVBQU1DLFdBQVcsS0FBS1QsU0FBTCxDQUFlRSxJQUFmLEtBQXdCLEVBQXpDOztBQUVBLGFBQU9PLFNBQVNDLEtBQVQsQ0FBZSxVQUFTTCxPQUFULEVBQWtCO0FBQ3RDLGVBQU9BLFFBQVFGLFFBQVIsQ0FBaUI1QixJQUFqQixDQUFzQjhCLFFBQVFELEtBQVIsSUFBaUIsSUFBdkMsRUFBNkNJLEtBQTdDLE1BQXdELEtBQS9EO0FBQ0QsT0FGTSxDQUFQO0FBR0QsS0E3QzRCOztBQStDN0I7Ozs7OztBQU1BRyxlQUFXLG1CQUFTQyxLQUFULEVBQWdCQyxRQUFoQixFQUEwQjtBQUNuQyxVQUFJQyxPQUFPLElBQVg7QUFDQUYsWUFBTTFCLE9BQU4sQ0FBYztBQUFBLGVBQVEyQixTQUFTWixFQUFULENBQVlDLElBQVosRUFBa0I7QUFBQSxpQkFBU1ksS0FBS1AsSUFBTCxDQUFVTCxJQUFWLEVBQWdCTSxLQUFoQixDQUFUO0FBQUEsU0FBbEIsQ0FBUjtBQUFBLE9BQWQ7QUFDRDtBQXhENEIsR0FBUDtBQUFBLENBQWpCLEM7Ozs7Ozs7Ozs7Ozs7O0FDSFA7O0FBRUE7Ozs7Ozs7OztBQVNPLElBQU1PLHNDQUFlLHVCQUFNLFVBQVVDLElBQVYsRUFBZ0JDLEVBQWhCLEVBQW9CO0FBQ3BELFNBQU9BLEdBQUdGLFlBQUgsQ0FBZ0JDLElBQWhCLENBQVA7QUFDRCxDQUYyQixDQUFyQjs7QUFJUDs7Ozs7Ozs7O0FBU08sSUFBTUUsc0NBQWUsdUJBQU0sVUFBVUYsSUFBVixFQUFnQnhCLEtBQWhCLEVBQXVCeUIsRUFBdkIsRUFBMkI7QUFDM0RBLEtBQUdDLFlBQUgsQ0FBZ0JGLElBQWhCLEVBQXNCeEIsS0FBdEI7QUFDRCxDQUYyQixDQUFyQjs7QUFJUDs7Ozs7Ozs7QUFRTyxJQUFNMkIsNENBQWtCLHVCQUFNLFVBQVVILElBQVYsRUFBZ0JDLEVBQWhCLEVBQW9CO0FBQ3ZEQSxLQUFHRSxlQUFILENBQW1CSCxJQUFuQjtBQUNELENBRjhCLENBQXhCOztBQUlQOzs7Ozs7Ozs7QUFTTyxJQUFNSSxzQ0FBZSx1QkFBTSxVQUFVSixJQUFWLEVBQWdCQyxFQUFoQixFQUFvQjtBQUNwRCxTQUFPQSxHQUFHRyxZQUFILENBQWdCSixJQUFoQixDQUFQO0FBQ0QsQ0FGMkIsQ0FBckI7O0FBSVA7Ozs7Ozs7Ozs7QUFVTyxJQUFNSyw0Q0FBa0IsdUJBQU0sVUFBVUwsSUFBVixFQUFnQnhCLEtBQWhCLEVBQXVCeUIsRUFBdkIsRUFBMkI7QUFDOUQsU0FBT0EsR0FBR0YsWUFBSCxDQUFnQkMsSUFBaEIsTUFBMEJ4QixLQUFqQztBQUNELENBRjhCLENBQXhCOztBQUlQOzs7Ozs7OztBQVFPLElBQU04Qiw0Q0FBa0IsdUJBQU0sVUFBVU4sSUFBVixFQUFnQkMsRUFBaEIsRUFBb0I7QUFDdkQsTUFBTXpCLFFBQVF1QixhQUFhQyxJQUFiLEVBQW1CQyxFQUFuQixDQUFkO0FBQ0FDLGVBQWFGLElBQWIsRUFBbUIsc0NBQXFCeEIsS0FBckIsQ0FBbkIsRUFBZ0R5QixFQUFoRDtBQUNELENBSDhCLENBQXhCOztBQUtQOzs7Ozs7Ozs7QUFTTyxJQUFNTSxvQ0FBYyx1QkFBTSxVQUFVQyxNQUFWLEVBQWtCQyxLQUFsQixFQUF5QjtBQUN4RCxTQUFPRCxPQUFPRCxXQUFQLENBQW1CRSxLQUFuQixDQUFQO0FBQ0QsQ0FGMEIsQ0FBcEI7O0FBSVA7Ozs7Ozs7Ozs7QUFVTyxJQUFNQyx3Q0FBZ0IsdUJBQU0sVUFBVUMsUUFBVixFQUFvQlYsRUFBcEIsRUFBd0I7QUFDekQsU0FBT0EsR0FBR1MsYUFBSCxDQUFpQkMsUUFBakIsQ0FBUDtBQUNELENBRjRCLENBQXRCOztBQUlQOzs7Ozs7Ozs7O0FBVU8sSUFBTUMsOENBQW1CLHVCQUFNLFVBQVVELFFBQVYsRUFBb0JWLEVBQXBCLEVBQXdCO0FBQzVELFNBQU9BLEdBQUdXLGdCQUFILENBQW9CRCxRQUFwQixDQUFQO0FBQ0QsQ0FGK0IsQ0FBekIsQzs7Ozs7Ozs7Ozs7O2tCQzdHaUJFLGtCO0FBUnhCOzs7Ozs7O0FBT0E7QUFDZSxTQUFTQSxrQkFBVCxDQUE0QkMsT0FBNUIsRUFBcUM7QUFDbEQ7QUFDQSxNQUFNQyxjQUFjQyxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQXBCO0FBQ0FGLGNBQVlHLFNBQVosR0FBd0IsT0FBeEI7QUFDQUgsY0FBWUksU0FBWixHQUF3QixTQUF4Qjs7QUFFQSxNQUFNQyxpQkFBaUJKLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7QUFDQUcsaUJBQWVGLFNBQWYsR0FBMkIsaUJBQTNCO0FBQ0FFLGlCQUFlRCxTQUFmLEdBQTJCLFNBQVNMLFFBQVFPLEtBQWpCLEdBQXlCLE9BQXpCLEdBQW1DLEtBQW5DLEdBQTJDUCxRQUFRUSxPQUFuRCxHQUE2RCxNQUF4Rjs7QUFFQSxNQUFNQyxpQkFBaUJQLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7QUFDQU0saUJBQWVMLFNBQWYsR0FBMkIsWUFBWSxHQUFaLFNBQXFCSixRQUFRNUIsSUFBN0IsS0FBdUM0QixRQUFRVSxXQUFSLEdBQXNCLGNBQXRCLEdBQXVDLEVBQTlFLENBQTNCO0FBQ0FELGlCQUFlaEIsV0FBZixDQUEyQlEsV0FBM0I7QUFDQVEsaUJBQWVoQixXQUFmLENBQTJCYSxjQUEzQjs7QUFFQSxNQUFJTixRQUFRVyxNQUFSLEtBQW1CQyxTQUF2QixFQUFrQztBQUNoQyxRQUFNQyxnQkFBZ0JYLFNBQVNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdEI7QUFDQVUsa0JBQWNULFNBQWQsR0FBMEIsUUFBMUI7QUFDQVMsa0JBQWNSLFNBQWQsR0FBMEJMLFFBQVFXLE1BQWxDO0FBQ0FGLG1CQUFlaEIsV0FBZixDQUEyQm9CLGFBQTNCO0FBQ0Q7O0FBRURDLFVBQVFDLEdBQVIsQ0FBWU4sY0FBWjtBQUNBLFNBQU9BLGNBQVA7QUFDRCxFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBd0JxQk8sVztBQUNuQjs7O0FBR0EsNkJBQTRCO0FBQUEsUUFBZEMsVUFBYyxRQUFkQSxVQUFjOztBQUFBOztBQUMxQixTQUFLQSxVQUFMLEdBQWtCQSxVQUFsQjs7QUFFQSxRQUFHLENBQUNDLE9BQU9DLGtCQUFYLEVBQThCO0FBQzVCO0FBQ0E7O0FBRUFELGFBQU9DLGtCQUFQLEdBQTRCQyxNQUFTLEtBQUtILFVBQWQseUJBQThDO0FBQ3hFSSxnQkFBUSxLQURnRTtBQUV4RUMscUJBQWE7QUFGMkQsT0FBOUMsRUFJM0JDLElBSjJCLENBSXRCO0FBQUEsZUFBVUMsT0FBT0MsSUFBUCxFQUFWO0FBQUEsT0FKc0IsRUFLM0JGLElBTDJCLENBS3RCLEtBQUtHLE9BTGlCLEVBTTNCSCxJQU4yQixDQU10QjtBQUFBLGVBQVFFLEtBQUtFLFNBQWI7QUFBQSxPQU5zQixDQUE1QjtBQU9EO0FBQ0Y7O0FBRUQ7Ozs7Ozs7Ozs0QkFLUUMsUSxFQUFVO0FBQ2hCLFVBQUlBLFNBQVNDLFdBQWIsRUFBMEI7QUFDeEIsZUFBT0MsUUFBUUMsTUFBUixDQUFlSCxRQUFmLENBQVA7QUFDRCxPQUZELE1BR0s7QUFDSCxlQUFPRSxRQUFRRSxPQUFSLENBQWdCSixRQUFoQixDQUFQO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7Ozs7bUNBS2U7QUFDYixhQUFPVixPQUFPQyxrQkFBZDtBQUNEOztBQUVEOzs7Ozs7Ozs7O2dDQU9ZYyxXLEVBQWE7QUFDdkIsYUFBT2YsT0FBT0Msa0JBQVAsQ0FBMEJJLElBQTFCLENBQStCLHdCQUFnQjtBQUNwRCxlQUFPVyxhQUFhM0UsTUFBYixDQUFvQjtBQUFBLGlCQUFlNEUsWUFBWUYsV0FBWixLQUE0QkEsV0FBM0M7QUFBQSxTQUFwQixFQUE0RSxDQUE1RSxDQUFQO0FBQ0QsT0FGTSxDQUFQOztBQUlBOzs7O0FBSUQ7O0FBRUQ7Ozs7Ozs7Ozs7dUNBT21CRyxFLEVBQUk7QUFDckIsYUFBT2hCLE1BQVMsS0FBS0gsVUFBZCwyQkFBOENtQixFQUE5QyxFQUFvRDtBQUN6RGYsZ0JBQVEsTUFEaUQ7QUFFekRDLHFCQUFhLFNBRjRDO0FBR3pEZSxjQUFNO0FBSG1ELE9BQXBELEVBSUpkLElBSkksQ0FJQztBQUFBLGVBQVVDLE9BQU9DLElBQVAsRUFBVjtBQUFBLE9BSkQsQ0FBUDtBQUtEOzs7Ozs7a0JBM0VrQlQsVzs7Ozs7Ozs7Ozs7Ozs7QUN4QnJCOztBQUVPLElBQU1zQixnREFBb0IsdUJBQU0sVUFBU2xFLElBQVQsRUFBZVcsUUFBZixFQUF5QndELE9BQXpCLEVBQWtDO0FBQ3ZFQSxVQUFRQyxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxpQkFBUztBQUN6Q3pELGFBQVNOLElBQVQsQ0FBY0wsSUFBZCxFQUFvQjtBQUNsQm1FLGVBQVNBLE9BRFM7QUFFbEJILFVBQUlHLFFBQVF0RCxZQUFSLENBQXFCLFNBQXJCO0FBRmMsS0FBcEIsRUFHRyxLQUhIOztBQUtBO0FBQ0FQLFVBQU0rRCxlQUFOO0FBQ0QsR0FSRDs7QUFVQSxTQUFPRixPQUFQO0FBQ0QsQ0FaZ0MsQ0FBMUIsQzs7Ozs7Ozs7Ozs7O2tCQ21EaUJHLEk7O0FBckR4Qjs7QUFDQTs7QUFFQTs7O0FBR0EsSUFBTUMsYUFBYSwrQkFBZ0IsZUFBaEIsRUFBaUMsTUFBakMsQ0FBbkI7O0FBRUE7OztBQUdBLElBQU1DLE9BQU8sNEJBQWEsYUFBYixFQUE0QixNQUE1QixDQUFiOztBQUVBOzs7QUFHQSxJQUFNQyxPQUFPLDRCQUFhLGFBQWIsRUFBNEIsT0FBNUIsQ0FBYjs7QUFFQTs7Ozs7O0FBTUEsSUFBTUMsdUJBQXVCLFNBQXZCQSxvQkFBdUIsQ0FBU0MsV0FBVCxFQUFzQkosVUFBdEIsRUFBa0M7QUFDN0QsTUFBRyxDQUFDQSxVQUFKLEVBQWdCO0FBQ2RDLFNBQUtHLFdBQUw7QUFDQTtBQUNELEdBSEQsTUFJSyxvQ0FBcUM7QUFDeENGLFdBQUtFLFdBQUw7QUFDQTtBQUNEO0FBQ0YsQ0FURDs7QUFXQTs7Ozs7Ozs7QUFRQSxJQUFNQyx1QkFBdUIsdUJBQU0sVUFBU0QsV0FBVCxFQUFzQnJFLEtBQXRCLEVBQTZCO0FBQzlEb0UsdUJBQXFCQyxXQUFyQixFQUFrQ0osV0FBV2pFLE1BQU11RSxNQUFqQixDQUFsQztBQUNELENBRjRCLENBQTdCOztBQUlBOzs7Ozs7QUFNZSxTQUFTUCxJQUFULENBQWNILE9BQWQsRUFBdUI7QUFDcEMsTUFBTVcsVUFBVVgsUUFBUTNDLGFBQVIsQ0FBc0IsaUJBQXRCLENBQWhCO0FBQ0EsTUFBTXVELFNBQVNELFFBQVFqRSxZQUFSLENBQXFCLGVBQXJCLENBQWY7QUFDQSxNQUFNbUUsU0FBU2IsUUFBUTNDLGFBQVIsT0FBMEJ1RCxNQUExQixDQUFmOztBQUVBLE1BQUdELE9BQUgsRUFBWTtBQUNWO0FBQ0EsUUFBSUcsV0FBVyxJQUFJQyxnQkFBSixDQUFxQix5QkFBUU4scUJBQXFCSSxNQUFyQixDQUFSLENBQXJCLENBQWY7O0FBRUFDLGFBQVNFLE9BQVQsQ0FBaUJMLE9BQWpCLEVBQTBCO0FBQ3hCTSxrQkFBWSxJQURZO0FBRXhCQyx5QkFBbUIsSUFGSztBQUd4QkMsdUJBQWlCLENBQUMsZUFBRDtBQUhPLEtBQTFCOztBQU1BO0FBQ0FSLFlBQVFWLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFVBQVM5RCxLQUFULEVBQWdCO0FBQ2hELHFDQUFnQixlQUFoQixFQUFpQ0EsTUFBTXVFLE1BQXZDO0FBQ0QsS0FGRDs7QUFJQUgseUJBQXFCTSxNQUFyQixFQUE2QlQsV0FBV08sT0FBWCxDQUE3QjtBQUNEOztBQUVELFNBQU9YLE9BQVA7QUFDRCxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdFRDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFDQTs7Ozs7OztBQU9BOzs7OztBQUtBOzs7OztBQUtBOzs7OztBQUtBOzs7OztBQUtBOzs7Ozs7SUFNcUJvQixHO0FBQ25COzs7QUFHQSxlQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCO0FBQ0EsYUFBYyxJQUFkLEVBQW9CLHlCQUFwQjs7QUFFQTtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCLGlDQUF1QkQsS0FBdkIsQ0FBMUI7QUFDQSxTQUFLRSxhQUFMLEdBQXFCLDRCQUFrQkYsS0FBbEIsQ0FBckI7O0FBRUE7QUFDQSxTQUFLRyxJQUFMLEdBQVksc0JBQVlILEtBQVosQ0FBWjs7QUFFQTtBQUNBLFNBQUtJLFFBQUwsR0FBZ0IsMEJBQWdCO0FBQzlCL0Msa0JBQVkyQyxNQUFNM0M7QUFEWSxLQUFoQixDQUFoQjs7QUFJQTtBQUNBLFNBQUtwQyxTQUFMLENBQWUsQ0FBQyxRQUFELEVBQVcsT0FBWCxDQUFmLEVBQW9DLEtBQUtnRixrQkFBekM7O0FBRUE7QUFDQSxTQUFLMUYsRUFBTCxDQUFRLFFBQVIsRUFBa0IsS0FBSzhGLGFBQXZCLEVBQXNDLElBQXRDO0FBQ0EsU0FBSzlGLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLEtBQUs0RixJQUFMLENBQVVHLFVBQTVCLEVBQXdDLEtBQUtILElBQTdDO0FBQ0E7QUFDQSxTQUFLQSxJQUFMLENBQVU1RixFQUFWLENBQWEsWUFBYixFQUEyQixLQUFLNEYsSUFBTCxDQUFVSSxjQUFyQyxFQUFxRCxLQUFLSixJQUExRDtBQUNBLFNBQUtBLElBQUwsQ0FBVTVGLEVBQVYsQ0FBYSxjQUFiLEVBQTZCLEtBQUs0RixJQUFMLENBQVVLLGVBQVYsQ0FBMEJDLElBQTFCLENBQStCLEtBQUtOLElBQXBDLENBQTdCLEVBQXdFLEtBQUtBLElBQTdFO0FBQ0EsU0FBS0Ysa0JBQUwsQ0FBd0IxRixFQUF4QixDQUEyQiwwQkFBM0IsRUFBdUQsS0FBSzRGLElBQUwsQ0FBVU8sZUFBVixDQUEwQkQsSUFBMUIsQ0FBK0IsS0FBS04sSUFBcEMsQ0FBdkQsRUFBa0csS0FBS0EsSUFBdkc7O0FBRUEsU0FBS1EsWUFBTDtBQUNEOztBQUVEOzs7Ozs7Ozs7bUNBS2V0QyxXLEVBQWE7QUFDMUIsYUFBTyxLQUFLK0IsUUFBTCxDQUFjN0IsV0FBZCxDQUEwQkYsV0FBMUIsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozt3Q0FLb0I7QUFBQTs7QUFBQSxVQUFMRyxFQUFLLFFBQUxBLEVBQUs7O0FBQ2xCLFdBQUtvQyxjQUFMLENBQW9CcEMsRUFBcEIsRUFBd0JiLElBQXhCLENBQTZCO0FBQUEsWUFBRWhCLEtBQUYsU0FBRUEsS0FBRjtBQUFBLGVBQWEsTUFBS3dELElBQUwsQ0FBVVUsUUFBVixDQUFtQmxFLEtBQW5CLENBQWI7QUFBQSxPQUE3QjtBQUNEOztBQUVEOzs7Ozs7bUNBR2U7QUFBQTs7QUFDYixVQUFNbUUsYUFBYSxDQUFDO0FBQ2xCbkUsZUFBTyxnQkFEVztBQUVsQjZCLFlBQUksZUFGYztBQUdsQjVCLGlCQUFTLEtBQUtxRCxrQkFBTCxDQUF3QmMsVUFBeEIsRUFIUztBQUlsQkMsa0JBQVU7QUFKUSxPQUFELEVBTW5CO0FBQ0VyRSxlQUFPLFFBRFQ7QUFFRTZCLFlBQUksUUFGTjtBQUdFNUIsaUJBQVMsS0FBS3NELGFBQUwsQ0FBbUJhLFVBQW5CO0FBSFgsT0FObUIsQ0FBbkI7O0FBWUFELGlCQUFXdEgsT0FBWCxDQUFtQjtBQUFBLGVBQWEsT0FBSzJHLElBQUwsQ0FBVWMsTUFBVixDQUFpQkMsU0FBakIsQ0FBYjtBQUFBLE9BQW5CO0FBQ0EsV0FBS2YsSUFBTCxDQUFVZ0IsZUFBVixHQWRhLENBY2dCO0FBQzdCLFdBQUtoQixJQUFMLENBQVVRLFlBQVY7QUFDRDs7QUFFRDs7Ozs7Ozs7aUNBS2E7QUFDWCxhQUFPLEtBQUtSLElBQUwsQ0FBVVksVUFBVixFQUFQO0FBQ0Q7Ozs7OztrQkFoRmtCaEIsRzs7Ozs7O0FDdkNyQix5Qzs7Ozs7Ozs7Ozs7O2tCQ3VCd0JqQixJOztBQXZCeEI7O0FBQ0E7O0FBRUE7OztBQUdBLElBQU1zQyxVQUFVLHlCQUFRLDRCQUFhLGFBQWIsRUFBNEIsTUFBNUIsQ0FBUixDQUFoQjs7QUFFQTs7O0FBR0EsSUFBTW5DLE9BQU8sNEJBQWEsYUFBYixFQUE0QixPQUE1QixDQUFiOztBQUVBOzs7QUFHQSxJQUFNb0MsY0FBYyx5QkFBUSw0QkFBYSxlQUFiLEVBQThCLE9BQTlCLENBQVIsQ0FBcEI7O0FBRUE7Ozs7O0FBS2UsU0FBU3ZDLElBQVQsQ0FBY0gsT0FBZCxFQUF1QjtBQUNwQyxNQUFNMkMsT0FBTzNDLFFBQVF6QyxnQkFBUixDQUF5QixjQUF6QixDQUFiO0FBQ0EsTUFBTXFGLFlBQVk1QyxRQUFRekMsZ0JBQVIsQ0FBeUIsbUJBQXpCLENBQWxCOztBQUVBb0YsT0FBSzlILE9BQUwsQ0FBYSxlQUFPO0FBQ2xCZ0ksUUFBSTVDLGdCQUFKLENBQXFCLE9BQXJCLEVBQThCLFVBQVU5RCxLQUFWLEVBQWlCOztBQUU3Q3VHLGtCQUFZQyxJQUFaO0FBQ0F4RyxZQUFNdUUsTUFBTixDQUFhN0QsWUFBYixDQUEwQixlQUExQixFQUEyQyxNQUEzQzs7QUFFQTRGLGNBQVFHLFNBQVI7O0FBRUEsVUFBSUUsYUFBYTNHLE1BQU11RSxNQUFOLENBQWFoRSxZQUFiLENBQTBCLGVBQTFCLENBQWpCO0FBQ0E0RCxXQUFLTixRQUFRM0MsYUFBUixPQUEwQnlGLFVBQTFCLENBQUw7QUFDRCxLQVREO0FBVUQsR0FYRDtBQVlELEM7Ozs7Ozs7Ozs7O0FDdkNEOzs7Ozs7QUFNQSxDQUFDLENBQUMsWUFBVTs7QUFFWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQ0EsTUFBSUMsT0FBTyxTQUFQQSxJQUFPLENBQVVDLE1BQVYsRUFBa0I7QUFDM0IsUUFBSUMsTUFBTSxJQUFJRixLQUFLRyxLQUFULEVBQVY7O0FBRUFELFFBQUlFLFFBQUosQ0FBYUMsR0FBYixDQUNFTCxLQUFLTSxPQURQLEVBRUVOLEtBQUtPLGNBRlAsRUFHRVAsS0FBS1EsT0FIUDs7QUFNQSxRQUFJUCxNQUFKLEVBQVlBLE9BQU85SSxJQUFQLENBQVkrSSxHQUFaLEVBQWlCQSxHQUFqQjs7QUFFWixXQUFPQSxHQUFQO0FBQ0QsR0FaRDs7QUFjQUYsT0FBS1MsT0FBTCxHQUFlLE9BQWY7QUFDQTs7Ozs7QUFLQTs7O0FBR0FULE9BQUtVLEtBQUwsR0FBYSxFQUFiOztBQUVBOzs7Ozs7QUFNQVYsT0FBS1UsS0FBTCxDQUFXQyxJQUFYLEdBQW1CLFVBQVVDLE1BQVYsRUFBa0I7QUFDbkMsV0FBTyxVQUFVbEcsT0FBVixFQUFtQjtBQUN4QixVQUFJa0csT0FBT3BGLE9BQVAsSUFBa0JBLFFBQVFtRixJQUE5QixFQUFvQztBQUNsQ25GLGdCQUFRbUYsSUFBUixDQUFhakcsT0FBYjtBQUNEO0FBQ0YsS0FKRDtBQUtELEdBTmlCLENBTWYsSUFOZSxDQUFsQjs7QUFRQTs7Ozs7Ozs7Ozs7QUFXQXNGLE9BQUtVLEtBQUwsQ0FBV0csUUFBWCxHQUFzQixVQUFVQyxHQUFWLEVBQWU7QUFDbkMsUUFBSUEsUUFBUSxLQUFLLENBQWIsSUFBa0JBLFFBQVEsSUFBOUIsRUFBb0M7QUFDbEMsYUFBTyxFQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBT0EsSUFBSXBJLFFBQUosRUFBUDtBQUNEO0FBQ0YsR0FORDtBQU9BOzs7OztBQUtBOzs7OztBQUtBc0gsT0FBS2UsWUFBTCxHQUFvQixZQUFZO0FBQzlCLFNBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0QsR0FGRDs7QUFJQTs7Ozs7Ozs7O0FBU0FoQixPQUFLZSxZQUFMLENBQWtCOUosU0FBbEIsQ0FBNEJnSyxXQUE1QixHQUEwQyxZQUFZO0FBQ3BELFFBQUlsSyxPQUFPQyxNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJDLFNBQTNCLENBQVg7QUFBQSxRQUNJVCxLQUFLSSxLQUFLbUssR0FBTCxFQURUO0FBQUEsUUFFSUMsUUFBUXBLLElBRlo7O0FBSUEsUUFBSSxPQUFPSixFQUFQLEtBQWMsVUFBbEIsRUFBOEIsTUFBTSxJQUFJeUssU0FBSixDQUFlLGtDQUFmLENBQU47O0FBRTlCRCxVQUFNckosT0FBTixDQUFjLFVBQVU4QixJQUFWLEVBQWdCO0FBQzVCLFVBQUksQ0FBQyxLQUFLeUgsVUFBTCxDQUFnQnpILElBQWhCLENBQUwsRUFBNEIsS0FBS29ILE1BQUwsQ0FBWXBILElBQVosSUFBb0IsRUFBcEI7QUFDNUIsV0FBS29ILE1BQUwsQ0FBWXBILElBQVosRUFBa0JWLElBQWxCLENBQXVCdkMsRUFBdkI7QUFDRCxLQUhELEVBR0csSUFISDtBQUlELEdBWEQ7O0FBYUE7Ozs7Ozs7QUFPQXFKLE9BQUtlLFlBQUwsQ0FBa0I5SixTQUFsQixDQUE0QnFLLGNBQTVCLEdBQTZDLFVBQVUxSCxJQUFWLEVBQWdCakQsRUFBaEIsRUFBb0I7QUFDL0QsUUFBSSxDQUFDLEtBQUswSyxVQUFMLENBQWdCekgsSUFBaEIsQ0FBTCxFQUE0Qjs7QUFFNUIsUUFBSTJILFVBQVUsS0FBS1AsTUFBTCxDQUFZcEgsSUFBWixFQUFrQnZCLE9BQWxCLENBQTBCMUIsRUFBMUIsQ0FBZDtBQUNBLFNBQUtxSyxNQUFMLENBQVlwSCxJQUFaLEVBQWtCNEgsTUFBbEIsQ0FBeUJELE9BQXpCLEVBQWtDLENBQWxDOztBQUVBLFFBQUksQ0FBQyxLQUFLUCxNQUFMLENBQVlwSCxJQUFaLEVBQWtCL0MsTUFBdkIsRUFBK0IsT0FBTyxLQUFLbUssTUFBTCxDQUFZcEgsSUFBWixDQUFQO0FBQ2hDLEdBUEQ7O0FBU0E7Ozs7Ozs7OztBQVNBb0csT0FBS2UsWUFBTCxDQUFrQjlKLFNBQWxCLENBQTRCd0ssSUFBNUIsR0FBbUMsVUFBVTdILElBQVYsRUFBZ0I7QUFDakQsUUFBSSxDQUFDLEtBQUt5SCxVQUFMLENBQWdCekgsSUFBaEIsQ0FBTCxFQUE0Qjs7QUFFNUIsUUFBSTdDLE9BQU9DLE1BQU1DLFNBQU4sQ0FBZ0JDLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQkMsU0FBM0IsRUFBc0MsQ0FBdEMsQ0FBWDs7QUFFQSxTQUFLNEosTUFBTCxDQUFZcEgsSUFBWixFQUFrQjlCLE9BQWxCLENBQTBCLFVBQVVuQixFQUFWLEVBQWM7QUFDdENBLFNBQUdVLEtBQUgsQ0FBU2lFLFNBQVQsRUFBb0J2RSxJQUFwQjtBQUNELEtBRkQ7QUFHRCxHQVJEOztBQVVBOzs7Ozs7O0FBT0FpSixPQUFLZSxZQUFMLENBQWtCOUosU0FBbEIsQ0FBNEJvSyxVQUE1QixHQUF5QyxVQUFVekgsSUFBVixFQUFnQjtBQUN2RCxXQUFPQSxRQUFRLEtBQUtvSCxNQUFwQjtBQUNELEdBRkQ7O0FBSUE7Ozs7O0FBS0E7Ozs7Ozs7Ozs7QUFVQWhCLE9BQUswQixTQUFMLEdBQWlCLFVBQVVaLEdBQVYsRUFBZTtBQUM5QixRQUFJLENBQUMxSixVQUFVUCxNQUFYLElBQXFCaUssT0FBTyxJQUE1QixJQUFvQ0EsT0FBT3hGLFNBQS9DLEVBQTBELE9BQU8sRUFBUDtBQUMxRCxRQUFJdEUsTUFBTTJLLE9BQU4sQ0FBY2IsR0FBZCxDQUFKLEVBQXdCLE9BQU9BLElBQUk5SSxHQUFKLENBQVEsVUFBVTRKLENBQVYsRUFBYTtBQUFFLGFBQU81QixLQUFLVSxLQUFMLENBQVdHLFFBQVgsQ0FBb0JlLENBQXBCLEVBQXVCQyxXQUF2QixFQUFQO0FBQTZDLEtBQXBFLENBQVA7O0FBRXhCLFdBQU9mLElBQUlwSSxRQUFKLEdBQWVvSixJQUFmLEdBQXNCRCxXQUF0QixHQUFvQ0UsS0FBcEMsQ0FBMEMvQixLQUFLMEIsU0FBTCxDQUFlTSxTQUF6RCxDQUFQO0FBQ0QsR0FMRDs7QUFPQTs7Ozs7OztBQU9BaEMsT0FBSzBCLFNBQUwsQ0FBZU0sU0FBZixHQUEyQixTQUEzQjs7QUFFQTs7Ozs7Ozs7OztBQVVBaEMsT0FBSzBCLFNBQUwsQ0FBZU8sSUFBZixHQUFzQixVQUFVQyxLQUFWLEVBQWlCO0FBQ3JDLFFBQUl2TCxLQUFLLEtBQUt3TCxtQkFBTCxDQUF5QkQsS0FBekIsQ0FBVDs7QUFFQSxRQUFJLENBQUN2TCxFQUFMLEVBQVM7QUFDUCxZQUFNLElBQUl5TCxLQUFKLENBQVUseUNBQXlDRixLQUFuRCxDQUFOO0FBQ0Q7O0FBRUQsV0FBT3ZMLEVBQVA7QUFDRCxHQVJEOztBQVVBcUosT0FBSzBCLFNBQUwsQ0FBZVEsS0FBZixHQUF1QixTQUF2Qjs7QUFFQWxDLE9BQUswQixTQUFMLENBQWVTLG1CQUFmLEdBQXFDO0FBQ25DLGVBQVduQyxLQUFLMEI7QUFEbUIsR0FBckM7O0FBSUE7Ozs7Ozs7Ozs7O0FBV0ExQixPQUFLMEIsU0FBTCxDQUFlVyxnQkFBZixHQUFrQyxVQUFVMUwsRUFBVixFQUFjdUwsS0FBZCxFQUFxQjtBQUNyRCxRQUFJQSxTQUFTLEtBQUtDLG1CQUFsQixFQUF1QztBQUNyQ25DLFdBQUtVLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQixxQ0FBcUN1QixLQUFyRDtBQUNEOztBQUVEdkwsT0FBR3VMLEtBQUgsR0FBV0EsS0FBWDtBQUNBLFNBQUtDLG1CQUFMLENBQXlCRCxLQUF6QixJQUFrQ3ZMLEVBQWxDO0FBQ0QsR0FQRDtBQVFBOzs7OztBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCQXFKLE9BQUtzQyxRQUFMLEdBQWdCLFlBQVk7QUFDMUIsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDRCxHQUZEOztBQUlBdkMsT0FBS3NDLFFBQUwsQ0FBY0gsbUJBQWQsR0FBb0MsRUFBcEM7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUFhQW5DLE9BQUtzQyxRQUFMLENBQWNELGdCQUFkLEdBQWlDLFVBQVUxTCxFQUFWLEVBQWN1TCxLQUFkLEVBQXFCO0FBQ3BELFFBQUlBLFNBQVMsS0FBS0MsbUJBQWxCLEVBQXVDO0FBQ3JDbkMsV0FBS1UsS0FBTCxDQUFXQyxJQUFYLENBQWdCLCtDQUErQ3VCLEtBQS9EO0FBQ0Q7O0FBRUR2TCxPQUFHdUwsS0FBSCxHQUFXQSxLQUFYO0FBQ0FsQyxTQUFLc0MsUUFBTCxDQUFjSCxtQkFBZCxDQUFrQ3hMLEdBQUd1TCxLQUFyQyxJQUE4Q3ZMLEVBQTlDO0FBQ0QsR0FQRDs7QUFTQTs7Ozs7OztBQU9BcUosT0FBS3NDLFFBQUwsQ0FBY0UsMkJBQWQsR0FBNEMsVUFBVTdMLEVBQVYsRUFBYztBQUN4RCxRQUFJOEwsZUFBZTlMLEdBQUd1TCxLQUFILElBQWF2TCxHQUFHdUwsS0FBSCxJQUFZLEtBQUtDLG1CQUFqRDs7QUFFQSxRQUFJLENBQUNNLFlBQUwsRUFBbUI7QUFDakJ6QyxXQUFLVSxLQUFMLENBQVdDLElBQVgsQ0FBZ0IsaUdBQWhCLEVBQW1IaEssRUFBbkg7QUFDRDtBQUNGLEdBTkQ7O0FBUUE7Ozs7Ozs7Ozs7O0FBV0FxSixPQUFLc0MsUUFBTCxDQUFjTCxJQUFkLEdBQXFCLFVBQVVTLFVBQVYsRUFBc0I7QUFDekMsUUFBSXRDLFdBQVcsSUFBSUosS0FBS3NDLFFBQVQsRUFBZjs7QUFFQUksZUFBVzVLLE9BQVgsQ0FBbUIsVUFBVTZLLE1BQVYsRUFBa0I7QUFDbkMsVUFBSWhNLEtBQUtxSixLQUFLc0MsUUFBTCxDQUFjSCxtQkFBZCxDQUFrQ1EsTUFBbEMsQ0FBVDs7QUFFQSxVQUFJaE0sRUFBSixFQUFRO0FBQ055SixpQkFBU0MsR0FBVCxDQUFhMUosRUFBYjtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU0sSUFBSXlMLEtBQUosQ0FBVSx5Q0FBeUNPLE1BQW5ELENBQU47QUFDRDtBQUNGLEtBUkQ7O0FBVUEsV0FBT3ZDLFFBQVA7QUFDRCxHQWREOztBQWdCQTs7Ozs7Ozs7QUFRQUosT0FBS3NDLFFBQUwsQ0FBY3JMLFNBQWQsQ0FBd0JvSixHQUF4QixHQUE4QixZQUFZO0FBQ3hDLFFBQUkzSSxNQUFNVixNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJDLFNBQTNCLENBQVY7O0FBRUFNLFFBQUlJLE9BQUosQ0FBWSxVQUFVbkIsRUFBVixFQUFjO0FBQ3hCcUosV0FBS3NDLFFBQUwsQ0FBY0UsMkJBQWQsQ0FBMEM3TCxFQUExQztBQUNBLFdBQUs0TCxNQUFMLENBQVlySixJQUFaLENBQWlCdkMsRUFBakI7QUFDRCxLQUhELEVBR0csSUFISDtBQUlELEdBUEQ7O0FBU0E7Ozs7Ozs7Ozs7QUFVQXFKLE9BQUtzQyxRQUFMLENBQWNyTCxTQUFkLENBQXdCMkwsS0FBeEIsR0FBZ0MsVUFBVUMsVUFBVixFQUFzQkMsS0FBdEIsRUFBNkI7QUFDM0Q5QyxTQUFLc0MsUUFBTCxDQUFjRSwyQkFBZCxDQUEwQ00sS0FBMUM7O0FBRUEsUUFBSUMsTUFBTSxLQUFLUixNQUFMLENBQVlsSyxPQUFaLENBQW9Cd0ssVUFBcEIsQ0FBVjtBQUNBLFFBQUlFLE9BQU8sQ0FBQyxDQUFaLEVBQWU7QUFDYixZQUFNLElBQUlYLEtBQUosQ0FBVSx3QkFBVixDQUFOO0FBQ0Q7O0FBRURXLFVBQU1BLE1BQU0sQ0FBWjtBQUNBLFNBQUtSLE1BQUwsQ0FBWWYsTUFBWixDQUFtQnVCLEdBQW5CLEVBQXdCLENBQXhCLEVBQTJCRCxLQUEzQjtBQUNELEdBVkQ7O0FBWUE7Ozs7Ozs7Ozs7QUFVQTlDLE9BQUtzQyxRQUFMLENBQWNyTCxTQUFkLENBQXdCK0wsTUFBeEIsR0FBaUMsVUFBVUgsVUFBVixFQUFzQkMsS0FBdEIsRUFBNkI7QUFDNUQ5QyxTQUFLc0MsUUFBTCxDQUFjRSwyQkFBZCxDQUEwQ00sS0FBMUM7O0FBRUEsUUFBSUMsTUFBTSxLQUFLUixNQUFMLENBQVlsSyxPQUFaLENBQW9Cd0ssVUFBcEIsQ0FBVjtBQUNBLFFBQUlFLE9BQU8sQ0FBQyxDQUFaLEVBQWU7QUFDYixZQUFNLElBQUlYLEtBQUosQ0FBVSx3QkFBVixDQUFOO0FBQ0Q7O0FBRUQsU0FBS0csTUFBTCxDQUFZZixNQUFaLENBQW1CdUIsR0FBbkIsRUFBd0IsQ0FBeEIsRUFBMkJELEtBQTNCO0FBQ0QsR0FURDs7QUFXQTs7Ozs7O0FBTUE5QyxPQUFLc0MsUUFBTCxDQUFjckwsU0FBZCxDQUF3QmdNLE1BQXhCLEdBQWlDLFVBQVV0TSxFQUFWLEVBQWM7QUFDN0MsUUFBSW9NLE1BQU0sS0FBS1IsTUFBTCxDQUFZbEssT0FBWixDQUFvQjFCLEVBQXBCLENBQVY7QUFDQSxRQUFJb00sT0FBTyxDQUFDLENBQVosRUFBZTtBQUNiO0FBQ0Q7O0FBRUQsU0FBS1IsTUFBTCxDQUFZZixNQUFaLENBQW1CdUIsR0FBbkIsRUFBd0IsQ0FBeEI7QUFDRCxHQVBEOztBQVNBOzs7Ozs7OztBQVFBL0MsT0FBS3NDLFFBQUwsQ0FBY3JMLFNBQWQsQ0FBd0JpTSxHQUF4QixHQUE4QixVQUFVQyxNQUFWLEVBQWtCO0FBQzlDLFFBQUlDLE1BQU0sRUFBVjtBQUFBLFFBQ0lDLGNBQWNGLE9BQU90TSxNQUR6QjtBQUFBLFFBRUl5TSxjQUFjLEtBQUtmLE1BQUwsQ0FBWTFMLE1BRjlCOztBQUlBLFNBQUssSUFBSTBNLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsV0FBcEIsRUFBaUNFLEdBQWpDLEVBQXNDO0FBQ3BDLFVBQUlDLFFBQVFMLE9BQU9JLENBQVAsQ0FBWjs7QUFFQSxXQUFLLElBQUlFLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsV0FBcEIsRUFBaUNHLEdBQWpDLEVBQXNDO0FBQ3BDRCxnQkFBUSxLQUFLakIsTUFBTCxDQUFZa0IsQ0FBWixFQUFlRCxLQUFmLEVBQXNCRCxDQUF0QixFQUF5QkosTUFBekIsQ0FBUjtBQUNBLFlBQUlLLFVBQVUsS0FBSyxDQUFmLElBQW9CQSxVQUFVLEVBQWxDLEVBQXNDO0FBQ3ZDOztBQUVELFVBQUlBLFVBQVUsS0FBSyxDQUFmLElBQW9CQSxVQUFVLEVBQWxDLEVBQXNDSixJQUFJbEssSUFBSixDQUFTc0ssS0FBVDtBQUN2Qzs7QUFFRCxXQUFPSixHQUFQO0FBQ0QsR0FqQkQ7O0FBbUJBOzs7OztBQUtBcEQsT0FBS3NDLFFBQUwsQ0FBY3JMLFNBQWQsQ0FBd0J5TSxLQUF4QixHQUFnQyxZQUFZO0FBQzFDLFNBQUtuQixNQUFMLEdBQWMsRUFBZDtBQUNELEdBRkQ7O0FBSUE7Ozs7Ozs7O0FBUUF2QyxPQUFLc0MsUUFBTCxDQUFjckwsU0FBZCxDQUF3QjBNLE1BQXhCLEdBQWlDLFlBQVk7QUFDM0MsV0FBTyxLQUFLcEIsTUFBTCxDQUFZdkssR0FBWixDQUFnQixVQUFVckIsRUFBVixFQUFjO0FBQ25DcUosV0FBS3NDLFFBQUwsQ0FBY0UsMkJBQWQsQ0FBMEM3TCxFQUExQzs7QUFFQSxhQUFPQSxHQUFHdUwsS0FBVjtBQUNELEtBSk0sQ0FBUDtBQUtELEdBTkQ7QUFPQTs7Ozs7QUFLQTs7Ozs7O0FBTUFsQyxPQUFLNEQsTUFBTCxHQUFjLFlBQVk7QUFDeEIsU0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtDLElBQUwsR0FBWXhJLFNBQVo7QUFDQSxTQUFLekUsTUFBTCxHQUFjLENBQWQ7QUFDRCxHQUpEOztBQU1BOzs7Ozs7Ozs7OztBQVdBbUosT0FBSzRELE1BQUwsQ0FBWUcsSUFBWixHQUFtQixVQUFVN0QsR0FBVixFQUFlOEQsR0FBZixFQUFvQkMsSUFBcEIsRUFBMEI7QUFDM0MsU0FBSy9ELEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUs4RCxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDRCxHQUpEOztBQU1BOzs7Ozs7O0FBT0FqRSxPQUFLNEQsTUFBTCxDQUFZM00sU0FBWixDQUFzQmlOLE1BQXRCLEdBQStCLFVBQVVoRSxHQUFWLEVBQWU4RCxHQUFmLEVBQW9CO0FBQ2pELFNBQUtILFVBQUwsR0FBa0J2SSxTQUFsQjtBQUNBLFFBQUl3SSxPQUFPLEtBQUtBLElBQWhCOztBQUVBLFFBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1QsV0FBS0EsSUFBTCxHQUFZLElBQUk5RCxLQUFLNEQsTUFBTCxDQUFZRyxJQUFoQixDQUFzQjdELEdBQXRCLEVBQTJCOEQsR0FBM0IsRUFBZ0NGLElBQWhDLENBQVo7QUFDQSxhQUFPLEtBQUtqTixNQUFMLEVBQVA7QUFDRDs7QUFFRCxRQUFJcUosTUFBTTRELEtBQUs1RCxHQUFmLEVBQW9CO0FBQ2xCLFdBQUs0RCxJQUFMLEdBQVksSUFBSTlELEtBQUs0RCxNQUFMLENBQVlHLElBQWhCLENBQXNCN0QsR0FBdEIsRUFBMkI4RCxHQUEzQixFQUFnQ0YsSUFBaEMsQ0FBWjtBQUNBLGFBQU8sS0FBS2pOLE1BQUwsRUFBUDtBQUNEOztBQUVELFFBQUlzTixPQUFPTCxJQUFYO0FBQUEsUUFDSUcsT0FBT0gsS0FBS0csSUFEaEI7O0FBR0EsV0FBT0EsUUFBUTNJLFNBQWYsRUFBMEI7QUFDeEIsVUFBSTRFLE1BQU0rRCxLQUFLL0QsR0FBZixFQUFvQjtBQUNsQmlFLGFBQUtGLElBQUwsR0FBWSxJQUFJakUsS0FBSzRELE1BQUwsQ0FBWUcsSUFBaEIsQ0FBc0I3RCxHQUF0QixFQUEyQjhELEdBQTNCLEVBQWdDQyxJQUFoQyxDQUFaO0FBQ0EsZUFBTyxLQUFLcE4sTUFBTCxFQUFQO0FBQ0Q7O0FBRURzTixhQUFPRixJQUFQLEVBQWFBLE9BQU9BLEtBQUtBLElBQXpCO0FBQ0Q7O0FBRURFLFNBQUtGLElBQUwsR0FBWSxJQUFJakUsS0FBSzRELE1BQUwsQ0FBWUcsSUFBaEIsQ0FBc0I3RCxHQUF0QixFQUEyQjhELEdBQTNCLEVBQWdDQyxJQUFoQyxDQUFaO0FBQ0EsV0FBTyxLQUFLcE4sTUFBTCxFQUFQO0FBQ0QsR0E1QkQ7O0FBOEJBOzs7Ozs7QUFNQW1KLE9BQUs0RCxNQUFMLENBQVkzTSxTQUFaLENBQXNCbU4sU0FBdEIsR0FBa0MsWUFBWTtBQUM1QyxRQUFJLEtBQUtQLFVBQVQsRUFBcUIsT0FBTyxLQUFLQSxVQUFaO0FBQ3JCLFFBQUlRLE9BQU8sS0FBS1AsSUFBaEI7QUFBQSxRQUNJUSxlQUFlLENBRG5CO0FBQUEsUUFFSU4sR0FGSjs7QUFJQSxXQUFPSyxJQUFQLEVBQWE7QUFDWEwsWUFBTUssS0FBS0wsR0FBWDtBQUNBTSxzQkFBZ0JOLE1BQU1BLEdBQXRCO0FBQ0FLLGFBQU9BLEtBQUtKLElBQVo7QUFDRDs7QUFFRCxXQUFPLEtBQUtKLFVBQUwsR0FBa0JVLEtBQUtDLElBQUwsQ0FBVUYsWUFBVixDQUF6QjtBQUNELEdBYkQ7O0FBZUE7Ozs7Ozs7QUFPQXRFLE9BQUs0RCxNQUFMLENBQVkzTSxTQUFaLENBQXNCd04sR0FBdEIsR0FBNEIsVUFBVUMsV0FBVixFQUF1QjtBQUNqRCxRQUFJTCxPQUFPLEtBQUtQLElBQWhCO0FBQUEsUUFDSWEsWUFBWUQsWUFBWVosSUFENUI7QUFBQSxRQUVJYyxhQUFhLENBRmpCOztBQUlBLFdBQU9QLFFBQVFNLFNBQWYsRUFBMEI7QUFDeEIsVUFBSU4sS0FBS25FLEdBQUwsR0FBV3lFLFVBQVV6RSxHQUF6QixFQUE4QjtBQUM1Qm1FLGVBQU9BLEtBQUtKLElBQVo7QUFDRCxPQUZELE1BRU8sSUFBSUksS0FBS25FLEdBQUwsR0FBV3lFLFVBQVV6RSxHQUF6QixFQUE4QjtBQUNuQ3lFLG9CQUFZQSxVQUFVVixJQUF0QjtBQUNELE9BRk0sTUFFQTtBQUNMVyxzQkFBY1AsS0FBS0wsR0FBTCxHQUFXVyxVQUFVWCxHQUFuQztBQUNBSyxlQUFPQSxLQUFLSixJQUFaO0FBQ0FVLG9CQUFZQSxVQUFVVixJQUF0QjtBQUNEO0FBQ0Y7O0FBRUQsV0FBT1csVUFBUDtBQUNELEdBbEJEOztBQW9CQTs7Ozs7Ozs7O0FBU0E1RSxPQUFLNEQsTUFBTCxDQUFZM00sU0FBWixDQUFzQjROLFVBQXRCLEdBQW1DLFVBQVVILFdBQVYsRUFBdUI7QUFDeEQsV0FBTyxLQUFLRCxHQUFMLENBQVNDLFdBQVQsS0FBeUIsS0FBS04sU0FBTCxLQUFtQk0sWUFBWU4sU0FBWixFQUE1QyxDQUFQO0FBQ0QsR0FGRDtBQUdBOzs7OztBQUtBOzs7Ozs7QUFNQXBFLE9BQUs4RSxTQUFMLEdBQWlCLFlBQVk7QUFDM0IsU0FBS2pPLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS2tPLFFBQUwsR0FBZ0IsRUFBaEI7QUFDRCxHQUhEOztBQUtBOzs7Ozs7O0FBT0EvRSxPQUFLOEUsU0FBTCxDQUFlN0MsSUFBZixHQUFzQixVQUFVK0MsY0FBVixFQUEwQjtBQUM5QyxRQUFJQyxNQUFNLElBQUksSUFBSixFQUFWOztBQUVBQSxRQUFJRixRQUFKLEdBQWVDLGNBQWY7QUFDQUMsUUFBSXBPLE1BQUosR0FBYW1PLGVBQWVuTyxNQUE1Qjs7QUFFQSxXQUFPb08sR0FBUDtBQUNELEdBUEQ7O0FBU0E7Ozs7Ozs7QUFPQWpGLE9BQUs4RSxTQUFMLENBQWU3TixTQUFmLENBQXlCb0osR0FBekIsR0FBK0IsWUFBWTtBQUN6QyxRQUFJa0QsQ0FBSixFQUFPdEcsT0FBUDs7QUFFQSxTQUFLc0csSUFBSSxDQUFULEVBQVlBLElBQUluTSxVQUFVUCxNQUExQixFQUFrQzBNLEdBQWxDLEVBQXVDO0FBQ3JDdEcsZ0JBQVU3RixVQUFVbU0sQ0FBVixDQUFWO0FBQ0EsVUFBSSxDQUFDLEtBQUtsTCxPQUFMLENBQWE0RSxPQUFiLENBQUwsRUFBNEI7QUFDNUIsV0FBSzhILFFBQUwsQ0FBY3ZELE1BQWQsQ0FBcUIsS0FBSzBELFdBQUwsQ0FBaUJqSSxPQUFqQixDQUFyQixFQUFnRCxDQUFoRCxFQUFtREEsT0FBbkQ7QUFDRDs7QUFFRCxTQUFLcEcsTUFBTCxHQUFjLEtBQUtrTyxRQUFMLENBQWNsTyxNQUE1QjtBQUNELEdBVkQ7O0FBWUE7Ozs7OztBQU1BbUosT0FBSzhFLFNBQUwsQ0FBZTdOLFNBQWYsQ0FBeUJrTyxPQUF6QixHQUFtQyxZQUFZO0FBQzdDLFdBQU8sS0FBS0osUUFBTCxDQUFjN04sS0FBZCxFQUFQO0FBQ0QsR0FGRDs7QUFJQTs7Ozs7Ozs7Ozs7OztBQWFBOEksT0FBSzhFLFNBQUwsQ0FBZTdOLFNBQWYsQ0FBeUJlLEdBQXpCLEdBQStCLFVBQVVyQixFQUFWLEVBQWN5TyxHQUFkLEVBQW1CO0FBQ2hELFdBQU8sS0FBS0wsUUFBTCxDQUFjL00sR0FBZCxDQUFrQnJCLEVBQWxCLEVBQXNCeU8sR0FBdEIsQ0FBUDtBQUNELEdBRkQ7O0FBSUE7Ozs7Ozs7Ozs7O0FBV0FwRixPQUFLOEUsU0FBTCxDQUFlN04sU0FBZixDQUF5QmEsT0FBekIsR0FBbUMsVUFBVW5CLEVBQVYsRUFBY3lPLEdBQWQsRUFBbUI7QUFDcEQsV0FBTyxLQUFLTCxRQUFMLENBQWNqTixPQUFkLENBQXNCbkIsRUFBdEIsRUFBMEJ5TyxHQUExQixDQUFQO0FBQ0QsR0FGRDs7QUFJQTs7Ozs7Ozs7QUFRQXBGLE9BQUs4RSxTQUFMLENBQWU3TixTQUFmLENBQXlCb0IsT0FBekIsR0FBbUMsVUFBVWdOLElBQVYsRUFBZ0I7QUFDakQsUUFBSUMsUUFBUSxDQUFaO0FBQUEsUUFDSUMsTUFBTSxLQUFLUixRQUFMLENBQWNsTyxNQUR4QjtBQUFBLFFBRUkyTyxnQkFBZ0JELE1BQU1ELEtBRjFCO0FBQUEsUUFHSUcsUUFBUUgsUUFBUWYsS0FBS21CLEtBQUwsQ0FBV0YsZ0JBQWdCLENBQTNCLENBSHBCO0FBQUEsUUFJSUcsWUFBWSxLQUFLWixRQUFMLENBQWNVLEtBQWQsQ0FKaEI7O0FBTUEsV0FBT0QsZ0JBQWdCLENBQXZCLEVBQTBCO0FBQ3hCLFVBQUlHLGNBQWNOLElBQWxCLEVBQXdCLE9BQU9JLEtBQVA7O0FBRXhCLFVBQUlFLFlBQVlOLElBQWhCLEVBQXNCQyxRQUFRRyxLQUFSO0FBQ3RCLFVBQUlFLFlBQVlOLElBQWhCLEVBQXNCRSxNQUFNRSxLQUFOOztBQUV0QkQsc0JBQWdCRCxNQUFNRCxLQUF0QjtBQUNBRyxjQUFRSCxRQUFRZixLQUFLbUIsS0FBTCxDQUFXRixnQkFBZ0IsQ0FBM0IsQ0FBaEI7QUFDQUcsa0JBQVksS0FBS1osUUFBTCxDQUFjVSxLQUFkLENBQVo7QUFDRDs7QUFFRCxRQUFJRSxjQUFjTixJQUFsQixFQUF3QixPQUFPSSxLQUFQOztBQUV4QixXQUFPLENBQUMsQ0FBUjtBQUNELEdBckJEOztBQXVCQTs7Ozs7Ozs7Ozs7QUFXQXpGLE9BQUs4RSxTQUFMLENBQWU3TixTQUFmLENBQXlCaU8sV0FBekIsR0FBdUMsVUFBVUcsSUFBVixFQUFnQjtBQUNyRCxRQUFJQyxRQUFRLENBQVo7QUFBQSxRQUNJQyxNQUFNLEtBQUtSLFFBQUwsQ0FBY2xPLE1BRHhCO0FBQUEsUUFFSTJPLGdCQUFnQkQsTUFBTUQsS0FGMUI7QUFBQSxRQUdJRyxRQUFRSCxRQUFRZixLQUFLbUIsS0FBTCxDQUFXRixnQkFBZ0IsQ0FBM0IsQ0FIcEI7QUFBQSxRQUlJRyxZQUFZLEtBQUtaLFFBQUwsQ0FBY1UsS0FBZCxDQUpoQjs7QUFNQSxXQUFPRCxnQkFBZ0IsQ0FBdkIsRUFBMEI7QUFDeEIsVUFBSUcsWUFBWU4sSUFBaEIsRUFBc0JDLFFBQVFHLEtBQVI7QUFDdEIsVUFBSUUsWUFBWU4sSUFBaEIsRUFBc0JFLE1BQU1FLEtBQU47O0FBRXRCRCxzQkFBZ0JELE1BQU1ELEtBQXRCO0FBQ0FHLGNBQVFILFFBQVFmLEtBQUttQixLQUFMLENBQVdGLGdCQUFnQixDQUEzQixDQUFoQjtBQUNBRyxrQkFBWSxLQUFLWixRQUFMLENBQWNVLEtBQWQsQ0FBWjtBQUNEOztBQUVELFFBQUlFLFlBQVlOLElBQWhCLEVBQXNCLE9BQU9JLEtBQVA7QUFDdEIsUUFBSUUsWUFBWU4sSUFBaEIsRUFBc0IsT0FBT0ksUUFBUSxDQUFmO0FBQ3ZCLEdBbEJEOztBQW9CQTs7Ozs7Ozs7QUFRQXpGLE9BQUs4RSxTQUFMLENBQWU3TixTQUFmLENBQXlCMk8sU0FBekIsR0FBcUMsVUFBVUMsUUFBVixFQUFvQjtBQUN2RCxRQUFJQyxlQUFlLElBQUk5RixLQUFLOEUsU0FBVCxFQUFuQjtBQUFBLFFBQ0l2QixJQUFJLENBRFI7QUFBQSxRQUNXRSxJQUFJLENBRGY7QUFBQSxRQUVJc0MsUUFBUSxLQUFLbFAsTUFGakI7QUFBQSxRQUV5Qm1QLFFBQVFILFNBQVNoUCxNQUYxQztBQUFBLFFBR0lvUCxJQUFJLEtBQUtsQixRQUhiO0FBQUEsUUFHdUJtQixJQUFJTCxTQUFTZCxRQUhwQzs7QUFLQSxXQUFPLElBQVAsRUFBYTtBQUNYLFVBQUl4QixJQUFJd0MsUUFBUSxDQUFaLElBQWlCdEMsSUFBSXVDLFFBQVEsQ0FBakMsRUFBb0M7O0FBRXBDLFVBQUlDLEVBQUUxQyxDQUFGLE1BQVMyQyxFQUFFekMsQ0FBRixDQUFiLEVBQW1CO0FBQ2pCcUMscUJBQWF6RixHQUFiLENBQWlCNEYsRUFBRTFDLENBQUYsQ0FBakI7QUFDQUEsYUFBS0UsR0FBTDtBQUNBO0FBQ0Q7O0FBRUQsVUFBSXdDLEVBQUUxQyxDQUFGLElBQU8yQyxFQUFFekMsQ0FBRixDQUFYLEVBQWlCO0FBQ2ZGO0FBQ0E7QUFDRDs7QUFFRCxVQUFJMEMsRUFBRTFDLENBQUYsSUFBTzJDLEVBQUV6QyxDQUFGLENBQVgsRUFBaUI7QUFDZkE7QUFDQTtBQUNEO0FBQ0Y7O0FBRUQsV0FBT3FDLFlBQVA7QUFDRCxHQTNCRDs7QUE2QkE7Ozs7OztBQU1BOUYsT0FBSzhFLFNBQUwsQ0FBZTdOLFNBQWYsQ0FBeUJrUCxLQUF6QixHQUFpQyxZQUFZO0FBQzNDLFFBQUlBLFFBQVEsSUFBSW5HLEtBQUs4RSxTQUFULEVBQVo7O0FBRUFxQixVQUFNcEIsUUFBTixHQUFpQixLQUFLSSxPQUFMLEVBQWpCO0FBQ0FnQixVQUFNdFAsTUFBTixHQUFlc1AsTUFBTXBCLFFBQU4sQ0FBZWxPLE1BQTlCOztBQUVBLFdBQU9zUCxLQUFQO0FBQ0QsR0FQRDs7QUFTQTs7Ozs7Ozs7QUFRQW5HLE9BQUs4RSxTQUFMLENBQWU3TixTQUFmLENBQXlCbVAsS0FBekIsR0FBaUMsVUFBVVAsUUFBVixFQUFvQjtBQUNuRCxRQUFJUSxPQUFKLEVBQWFDLFFBQWIsRUFBdUJDLFFBQXZCOztBQUVBLFFBQUksS0FBSzFQLE1BQUwsSUFBZWdQLFNBQVNoUCxNQUE1QixFQUFvQztBQUNsQ3dQLGdCQUFVLElBQVYsRUFBZ0JDLFdBQVdULFFBQTNCO0FBQ0QsS0FGRCxNQUVPO0FBQ0xRLGdCQUFVUixRQUFWLEVBQW9CUyxXQUFXLElBQS9CO0FBQ0Q7O0FBRURDLGVBQVdGLFFBQVFGLEtBQVIsRUFBWDs7QUFFQSxTQUFJLElBQUk1QyxJQUFJLENBQVIsRUFBV2lELG1CQUFtQkYsU0FBU25CLE9BQVQsRUFBbEMsRUFBc0Q1QixJQUFJaUQsaUJBQWlCM1AsTUFBM0UsRUFBbUYwTSxHQUFuRixFQUF1RjtBQUNyRmdELGVBQVNsRyxHQUFULENBQWFtRyxpQkFBaUJqRCxDQUFqQixDQUFiO0FBQ0Q7O0FBRUQsV0FBT2dELFFBQVA7QUFDRCxHQWhCRDs7QUFrQkE7Ozs7OztBQU1BdkcsT0FBSzhFLFNBQUwsQ0FBZTdOLFNBQWYsQ0FBeUIwTSxNQUF6QixHQUFrQyxZQUFZO0FBQzVDLFdBQU8sS0FBS3dCLE9BQUwsRUFBUDtBQUNELEdBRkQ7QUFHQTs7Ozs7QUFLQTs7Ozs7OztBQU9BbkYsT0FBS0csS0FBTCxHQUFhLFlBQVk7QUFDdkIsU0FBS3NHLE9BQUwsR0FBZSxFQUFmO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLdEcsUUFBTCxHQUFnQixJQUFJSixLQUFLc0MsUUFBVCxFQUFoQjtBQUNBLFNBQUtxRSxhQUFMLEdBQXFCLElBQUkzRyxLQUFLNEcsS0FBVCxFQUFyQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsSUFBSTdHLEtBQUs4RyxVQUFULEVBQWxCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixJQUFJL0csS0FBSzhFLFNBQVQsRUFBcEI7QUFDQSxTQUFLa0MsWUFBTCxHQUFxQixJQUFJaEgsS0FBS2UsWUFBVCxFQUFyQjtBQUNBLFNBQUtrRyxXQUFMLEdBQW1CakgsS0FBSzBCLFNBQXhCOztBQUVBLFNBQUt3RixTQUFMLEdBQWlCLEVBQWpCOztBQUVBLFNBQUtyTyxFQUFMLENBQVEsS0FBUixFQUFlLFFBQWYsRUFBeUIsUUFBekIsRUFBb0MsWUFBWTtBQUM5QyxXQUFLcU8sU0FBTCxHQUFpQixFQUFqQjtBQUNELEtBRmtDLENBRWhDbkksSUFGZ0MsQ0FFM0IsSUFGMkIsQ0FBbkM7QUFHRCxHQWZEOztBQWlCQTs7Ozs7Ozs7O0FBU0FpQixPQUFLRyxLQUFMLENBQVdsSixTQUFYLENBQXFCNEIsRUFBckIsR0FBMEIsWUFBWTtBQUNwQyxRQUFJOUIsT0FBT0MsTUFBTUMsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCQyxTQUEzQixDQUFYO0FBQ0EsV0FBTyxLQUFLNFAsWUFBTCxDQUFrQi9GLFdBQWxCLENBQThCNUosS0FBOUIsQ0FBb0MsS0FBSzJQLFlBQXpDLEVBQXVEalEsSUFBdkQsQ0FBUDtBQUNELEdBSEQ7O0FBS0E7Ozs7Ozs7QUFPQWlKLE9BQUtHLEtBQUwsQ0FBV2xKLFNBQVgsQ0FBcUJrUSxHQUFyQixHQUEyQixVQUFVdk4sSUFBVixFQUFnQmpELEVBQWhCLEVBQW9CO0FBQzdDLFdBQU8sS0FBS3FRLFlBQUwsQ0FBa0IxRixjQUFsQixDQUFpQzFILElBQWpDLEVBQXVDakQsRUFBdkMsQ0FBUDtBQUNELEdBRkQ7O0FBSUE7Ozs7Ozs7Ozs7QUFVQXFKLE9BQUtHLEtBQUwsQ0FBVzhCLElBQVgsR0FBa0IsVUFBVStDLGNBQVYsRUFBMEI7QUFDMUMsUUFBSUEsZUFBZXZFLE9BQWYsS0FBMkJULEtBQUtTLE9BQXBDLEVBQTZDO0FBQzNDVCxXQUFLVSxLQUFMLENBQVdDLElBQVgsQ0FBZ0IsK0JBQStCWCxLQUFLUyxPQUFwQyxHQUE4QyxhQUE5QyxHQUE4RHVFLGVBQWV2RSxPQUE3RjtBQUNEOztBQUVELFFBQUlQLE1BQU0sSUFBSSxJQUFKLEVBQVY7O0FBRUFBLFFBQUl1RyxPQUFKLEdBQWN6QixlQUFlb0MsTUFBN0I7QUFDQWxILFFBQUl3RyxJQUFKLEdBQVcxQixlQUFlcUMsR0FBMUI7O0FBRUFuSCxRQUFJd0IsU0FBSixDQUFjMUIsS0FBSzBCLFNBQUwsQ0FBZU8sSUFBZixDQUFvQitDLGVBQWV0RCxTQUFuQyxDQUFkO0FBQ0F4QixRQUFJeUcsYUFBSixHQUFvQjNHLEtBQUs0RyxLQUFMLENBQVczRSxJQUFYLENBQWdCK0MsZUFBZTJCLGFBQS9CLENBQXBCO0FBQ0F6RyxRQUFJMkcsVUFBSixHQUFpQjdHLEtBQUs4RyxVQUFMLENBQWdCN0UsSUFBaEIsQ0FBcUIrQyxlQUFlNkIsVUFBcEMsQ0FBakI7QUFDQTNHLFFBQUk2RyxZQUFKLEdBQW1CL0csS0FBSzhFLFNBQUwsQ0FBZTdDLElBQWYsQ0FBb0IrQyxlQUFlK0IsWUFBbkMsQ0FBbkI7QUFDQTdHLFFBQUlFLFFBQUosR0FBZUosS0FBS3NDLFFBQUwsQ0FBY0wsSUFBZCxDQUFtQitDLGVBQWU1RSxRQUFsQyxDQUFmOztBQUVBLFdBQU9GLEdBQVA7QUFDRCxHQWpCRDs7QUFtQkE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQUYsT0FBS0csS0FBTCxDQUFXbEosU0FBWCxDQUFxQnFRLEtBQXJCLEdBQTZCLFVBQVVDLFNBQVYsRUFBcUJDLElBQXJCLEVBQTJCO0FBQ3RELFFBQUlBLE9BQU9BLFFBQVEsRUFBbkI7QUFBQSxRQUNJRixRQUFRLEVBQUUxTixNQUFNMk4sU0FBUixFQUFtQkUsT0FBT0QsS0FBS0MsS0FBTCxJQUFjLENBQXhDLEVBRFo7O0FBR0EsU0FBS2hCLE9BQUwsQ0FBYXZOLElBQWIsQ0FBa0JvTyxLQUFsQjtBQUNBLFdBQU8sSUFBUDtBQUNELEdBTkQ7O0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkF0SCxPQUFLRyxLQUFMLENBQVdsSixTQUFYLENBQXFCb1EsR0FBckIsR0FBMkIsVUFBVUssT0FBVixFQUFtQjtBQUM1QyxTQUFLaEIsSUFBTCxHQUFZZ0IsT0FBWjtBQUNBLFdBQU8sSUFBUDtBQUNELEdBSEQ7O0FBS0E7Ozs7Ozs7Ozs7O0FBV0ExSCxPQUFLRyxLQUFMLENBQVdsSixTQUFYLENBQXFCeUssU0FBckIsR0FBaUMsVUFBVS9LLEVBQVYsRUFBYztBQUM3QyxRQUFJOEwsZUFBZTlMLEdBQUd1TCxLQUFILElBQWF2TCxHQUFHdUwsS0FBSCxJQUFZbEMsS0FBSzBCLFNBQUwsQ0FBZVMsbUJBQTNEOztBQUVBLFFBQUksQ0FBQ00sWUFBTCxFQUFtQjtBQUNqQnpDLFdBQUtVLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQiw0RkFBaEI7QUFDRDs7QUFFRCxTQUFLc0csV0FBTCxHQUFtQnRRLEVBQW5CO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FURDs7QUFXQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUFxSixPQUFLRyxLQUFMLENBQVdsSixTQUFYLENBQXFCb0osR0FBckIsR0FBMkIsVUFBVXNILEdBQVYsRUFBZUMsU0FBZixFQUEwQjtBQUNuRCxRQUFJQyxZQUFZLEVBQWhCO0FBQUEsUUFDSUMsb0JBQW9CLElBQUk5SCxLQUFLOEUsU0FBVCxFQUR4QjtBQUFBLFFBRUlpRCxTQUFTSixJQUFJLEtBQUtqQixJQUFULENBRmI7QUFBQSxRQUdJa0IsWUFBWUEsY0FBY3RNLFNBQWQsR0FBMEIsSUFBMUIsR0FBaUNzTSxTQUhqRDs7QUFLQSxTQUFLbkIsT0FBTCxDQUFhM08sT0FBYixDQUFxQixVQUFVd1AsS0FBVixFQUFpQjtBQUNwQyxVQUFJVSxjQUFjLEtBQUs1SCxRQUFMLENBQWM4QyxHQUFkLENBQWtCLEtBQUsrRCxXQUFMLENBQWlCVSxJQUFJTCxNQUFNMU4sSUFBVixDQUFqQixDQUFsQixDQUFsQjs7QUFFQWlPLGdCQUFVUCxNQUFNMU4sSUFBaEIsSUFBd0JvTyxXQUF4Qjs7QUFFQSxXQUFLLElBQUl6RSxJQUFJLENBQWIsRUFBZ0JBLElBQUl5RSxZQUFZblIsTUFBaEMsRUFBd0MwTSxHQUF4QyxFQUE2QztBQUMzQyxZQUFJQyxRQUFRd0UsWUFBWXpFLENBQVosQ0FBWjtBQUNBdUUsMEJBQWtCekgsR0FBbEIsQ0FBc0JtRCxLQUF0QjtBQUNBLGFBQUt1RCxZQUFMLENBQWtCMUcsR0FBbEIsQ0FBc0JtRCxLQUF0QjtBQUNEO0FBQ0YsS0FWRCxFQVVHLElBVkg7O0FBWUEsU0FBS21ELGFBQUwsQ0FBbUIxQixHQUFuQixDQUF1QjhDLE1BQXZCLEVBQStCRCxpQkFBL0I7O0FBRUEsU0FBSyxJQUFJdkUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJdUUsa0JBQWtCalIsTUFBdEMsRUFBOEMwTSxHQUE5QyxFQUFtRDtBQUNqRCxVQUFJQyxRQUFRc0Usa0JBQWtCL0MsUUFBbEIsQ0FBMkJ4QixDQUEzQixDQUFaO0FBQ0EsVUFBSTBFLEtBQUssQ0FBVDs7QUFFQSxXQUFLLElBQUl4RSxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS2dELE9BQUwsQ0FBYTVQLE1BQWpDLEVBQXlDNE0sR0FBekMsRUFBNkM7QUFDM0MsWUFBSTZELFFBQVEsS0FBS2IsT0FBTCxDQUFhaEQsQ0FBYixDQUFaO0FBQ0EsWUFBSXVFLGNBQWNILFVBQVVQLE1BQU0xTixJQUFoQixDQUFsQjtBQUNBLFlBQUlzTyxjQUFjRixZQUFZblIsTUFBOUI7O0FBRUEsWUFBSSxDQUFDcVIsV0FBTCxFQUFrQjs7QUFFbEIsWUFBSUMsYUFBYSxDQUFqQjtBQUNBLGFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixXQUFwQixFQUFpQ0UsR0FBakMsRUFBcUM7QUFDbkMsY0FBSUosWUFBWUksQ0FBWixNQUFtQjVFLEtBQXZCLEVBQTZCO0FBQzNCMkU7QUFDRDtBQUNGOztBQUVERixjQUFPRSxhQUFhRCxXQUFiLEdBQTJCWixNQUFNRyxLQUF4QztBQUNEOztBQUVELFdBQUtaLFVBQUwsQ0FBZ0J4RyxHQUFoQixDQUFvQm1ELEtBQXBCLEVBQTJCLEVBQUU2RCxLQUFLVSxNQUFQLEVBQWVFLElBQUlBLEVBQW5CLEVBQTNCO0FBQ0Q7O0FBRUQsUUFBSUwsU0FBSixFQUFlLEtBQUtaLFlBQUwsQ0FBa0J2RixJQUFsQixDQUF1QixLQUF2QixFQUE4QmtHLEdBQTlCLEVBQW1DLElBQW5DO0FBQ2hCLEdBN0NEOztBQStDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBM0gsT0FBS0csS0FBTCxDQUFXbEosU0FBWCxDQUFxQmdNLE1BQXJCLEdBQThCLFVBQVUwRSxHQUFWLEVBQWVDLFNBQWYsRUFBMEI7QUFDdEQsUUFBSUcsU0FBU0osSUFBSSxLQUFLakIsSUFBVCxDQUFiO0FBQUEsUUFDSWtCLFlBQVlBLGNBQWN0TSxTQUFkLEdBQTBCLElBQTFCLEdBQWlDc00sU0FEakQ7O0FBR0EsUUFBSSxDQUFDLEtBQUtqQixhQUFMLENBQW1CMEIsR0FBbkIsQ0FBdUJOLE1BQXZCLENBQUwsRUFBcUM7O0FBRXJDLFFBQUlGLFlBQVksS0FBS2xCLGFBQUwsQ0FBbUIyQixHQUFuQixDQUF1QlAsTUFBdkIsQ0FBaEI7O0FBRUEsU0FBS3BCLGFBQUwsQ0FBbUIxRCxNQUFuQixDQUEwQjhFLE1BQTFCOztBQUVBRixjQUFVL1AsT0FBVixDQUFrQixVQUFVMEwsS0FBVixFQUFpQjtBQUNqQyxXQUFLcUQsVUFBTCxDQUFnQjVELE1BQWhCLENBQXVCTyxLQUF2QixFQUE4QnVFLE1BQTlCO0FBQ0QsS0FGRCxFQUVHLElBRkg7O0FBSUEsUUFBSUgsU0FBSixFQUFlLEtBQUtaLFlBQUwsQ0FBa0J2RixJQUFsQixDQUF1QixRQUF2QixFQUFpQ2tHLEdBQWpDLEVBQXNDLElBQXRDO0FBQ2hCLEdBZkQ7O0FBaUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTNILE9BQUtHLEtBQUwsQ0FBV2xKLFNBQVgsQ0FBcUJzUixNQUFyQixHQUE4QixVQUFVWixHQUFWLEVBQWVDLFNBQWYsRUFBMEI7QUFDdEQsUUFBSUEsWUFBWUEsY0FBY3RNLFNBQWQsR0FBMEIsSUFBMUIsR0FBaUNzTSxTQUFqRDs7QUFFQSxTQUFLM0UsTUFBTCxDQUFZMEUsR0FBWixFQUFpQixLQUFqQjtBQUNBLFNBQUt0SCxHQUFMLENBQVNzSCxHQUFULEVBQWMsS0FBZDs7QUFFQSxRQUFJQyxTQUFKLEVBQWUsS0FBS1osWUFBTCxDQUFrQnZGLElBQWxCLENBQXVCLFFBQXZCLEVBQWlDa0csR0FBakMsRUFBc0MsSUFBdEM7QUFDaEIsR0FQRDs7QUFTQTs7Ozs7Ozs7QUFRQTNILE9BQUtHLEtBQUwsQ0FBV2xKLFNBQVgsQ0FBcUJ1UixHQUFyQixHQUEyQixVQUFVQyxJQUFWLEVBQWdCO0FBQ3pDLFFBQUlDLFdBQVcsTUFBTUQsSUFBckI7QUFDQSxRQUFJRSxPQUFPMVIsU0FBUCxDQUFpQjJSLGNBQWpCLENBQWdDelIsSUFBaEMsQ0FBcUMsS0FBSytQLFNBQTFDLEVBQXFEd0IsUUFBckQsQ0FBSixFQUFvRSxPQUFPLEtBQUt4QixTQUFMLENBQWV3QixRQUFmLENBQVA7O0FBRXBFLFFBQUlHLG9CQUFvQixLQUFLaEMsVUFBTCxDQUFnQmlDLEtBQWhCLENBQXNCTCxJQUF0QixDQUF4QjtBQUFBLFFBQ0lELE1BQU0sQ0FEVjs7QUFHQSxRQUFJSyxvQkFBb0IsQ0FBeEIsRUFBMkI7QUFDekJMLFlBQU0sSUFBSWpFLEtBQUs5SSxHQUFMLENBQVMsS0FBS2tMLGFBQUwsQ0FBbUI5UCxNQUFuQixHQUE0QmdTLGlCQUFyQyxDQUFWO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLM0IsU0FBTCxDQUFld0IsUUFBZixJQUEyQkYsR0FBbEM7QUFDRCxHQVpEOztBQWNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkF4SSxPQUFLRyxLQUFMLENBQVdsSixTQUFYLENBQXFCOFIsTUFBckIsR0FBOEIsVUFBVUMsS0FBVixFQUFpQjtBQUM3QyxRQUFJQyxjQUFjLEtBQUs3SSxRQUFMLENBQWM4QyxHQUFkLENBQWtCLEtBQUsrRCxXQUFMLENBQWlCK0IsS0FBakIsQ0FBbEIsQ0FBbEI7QUFBQSxRQUNJRSxjQUFjLElBQUlsSixLQUFLNEQsTUFBVCxFQURsQjtBQUFBLFFBRUl1RixlQUFlLEVBRm5CO0FBQUEsUUFHSUMsY0FBYyxLQUFLM0MsT0FBTCxDQUFhOU8sTUFBYixDQUFvQixVQUFVMFIsSUFBVixFQUFnQnpSLENBQWhCLEVBQW1CO0FBQUUsYUFBT3lSLE9BQU96UixFQUFFNlAsS0FBaEI7QUFBdUIsS0FBaEUsRUFBa0UsQ0FBbEUsQ0FIbEI7O0FBS0EsUUFBSTZCLGVBQWVMLFlBQVkvUSxJQUFaLENBQWlCLFVBQVVzTCxLQUFWLEVBQWlCO0FBQ25ELGFBQU8sS0FBS3FELFVBQUwsQ0FBZ0J3QixHQUFoQixDQUFvQjdFLEtBQXBCLENBQVA7QUFDRCxLQUZrQixFQUVoQixJQUZnQixDQUFuQjs7QUFJQSxRQUFJLENBQUM4RixZQUFMLEVBQW1CLE9BQU8sRUFBUDs7QUFFbkJMLGdCQUNHblIsT0FESCxDQUNXLFVBQVUwTCxLQUFWLEVBQWlCRCxDQUFqQixFQUFvQkosTUFBcEIsRUFBNEI7QUFDbkMsVUFBSThFLEtBQUssSUFBSTlFLE9BQU90TSxNQUFYLEdBQW9CLEtBQUs0UCxPQUFMLENBQWE1UCxNQUFqQyxHQUEwQ3VTLFdBQW5EO0FBQUEsVUFDSTFQLE9BQU8sSUFEWDs7QUFHQSxVQUFJdUwsTUFBTSxLQUFLNEIsVUFBTCxDQUFnQjBDLE1BQWhCLENBQXVCL0YsS0FBdkIsRUFBOEI3TCxNQUE5QixDQUFxQyxVQUFVMFIsSUFBVixFQUFnQkcsR0FBaEIsRUFBcUI7QUFDbEUsWUFBSXpHLE1BQU1ySixLQUFLcU4sWUFBTCxDQUFrQjFPLE9BQWxCLENBQTBCbVIsR0FBMUIsQ0FBVjtBQUFBLFlBQ0loQixNQUFNOU8sS0FBSzhPLEdBQUwsQ0FBU2dCLEdBQVQsQ0FEVjtBQUFBLFlBRUlDLGtCQUFrQixDQUZ0QjtBQUFBLFlBR0l4RSxNQUFNLElBQUlqRixLQUFLOEUsU0FBVCxFQUhWOztBQUtBO0FBQ0E7QUFDQTtBQUNBLFlBQUkwRSxRQUFRaEcsS0FBWixFQUFtQjtBQUNqQixjQUFJa0csT0FBT25GLEtBQUtvRixHQUFMLENBQVMsQ0FBVCxFQUFZSCxJQUFJM1MsTUFBSixHQUFhMk0sTUFBTTNNLE1BQS9CLENBQVg7QUFDQTRTLDRCQUFrQixJQUFJbEYsS0FBSzlJLEdBQUwsQ0FBU2lPLElBQVQsQ0FBdEI7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxZQUFJM0csTUFBTSxDQUFDLENBQVgsRUFBY21HLFlBQVloRixNQUFaLENBQW1CbkIsR0FBbkIsRUFBd0JrRixLQUFLTyxHQUFMLEdBQVdpQixlQUFuQzs7QUFFZDtBQUNBO0FBQ0EsWUFBSUcsb0JBQW9CbFEsS0FBS21OLFVBQUwsQ0FBZ0J5QixHQUFoQixDQUFvQmtCLEdBQXBCLENBQXhCO0FBQUEsWUFDSUssT0FBT2xCLE9BQU9tQixJQUFQLENBQVlGLGlCQUFaLENBRFg7QUFBQSxZQUVJRyxVQUFVRixLQUFLaFQsTUFGbkI7O0FBSUEsYUFBSyxJQUFJME0sSUFBSSxDQUFiLEVBQWdCQSxJQUFJd0csT0FBcEIsRUFBNkJ4RyxHQUE3QixFQUFrQztBQUNoQzBCLGNBQUk1RSxHQUFKLENBQVF1SixrQkFBa0JDLEtBQUt0RyxDQUFMLENBQWxCLEVBQTJCOEQsR0FBbkM7QUFDRDs7QUFFRCxlQUFPZ0MsS0FBS2pELEtBQUwsQ0FBV25CLEdBQVgsQ0FBUDtBQUNELE9BOUJTLEVBOEJQLElBQUlqRixLQUFLOEUsU0FBVCxFQTlCTyxDQUFWOztBQWdDQXFFLG1CQUFhalEsSUFBYixDQUFrQitMLEdBQWxCO0FBQ0QsS0F0Q0gsRUFzQ0ssSUF0Q0w7O0FBd0NBLFFBQUkrRSxjQUFjYixhQUFheFIsTUFBYixDQUFvQixVQUFVMFIsSUFBVixFQUFnQnBFLEdBQWhCLEVBQXFCO0FBQ3pELGFBQU9vRSxLQUFLekQsU0FBTCxDQUFlWCxHQUFmLENBQVA7QUFDRCxLQUZpQixDQUFsQjs7QUFJQSxXQUFPK0UsWUFDSmhTLEdBREksQ0FDQSxVQUFVcVAsR0FBVixFQUFlO0FBQ2xCLGFBQU8sRUFBRUEsS0FBS0EsR0FBUCxFQUFZNEMsT0FBT2YsWUFBWXJFLFVBQVosQ0FBdUIsS0FBS3FGLGNBQUwsQ0FBb0I3QyxHQUFwQixDQUF2QixDQUFuQixFQUFQO0FBQ0QsS0FISSxFQUdGLElBSEUsRUFJSjhDLElBSkksQ0FJQyxVQUFVbEUsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ3BCLGFBQU9BLEVBQUUrRCxLQUFGLEdBQVVoRSxFQUFFZ0UsS0FBbkI7QUFDRCxLQU5JLENBQVA7QUFPRCxHQS9ERDs7QUFpRUE7Ozs7Ozs7Ozs7Ozs7O0FBY0FqSyxPQUFLRyxLQUFMLENBQVdsSixTQUFYLENBQXFCaVQsY0FBckIsR0FBc0MsVUFBVUUsV0FBVixFQUF1QjtBQUMzRCxRQUFJQyxpQkFBaUIsS0FBSzFELGFBQUwsQ0FBbUIyQixHQUFuQixDQUF1QjhCLFdBQXZCLENBQXJCO0FBQUEsUUFDSUUsdUJBQXVCRCxlQUFleFQsTUFEMUM7QUFBQSxRQUVJcVQsaUJBQWlCLElBQUlsSyxLQUFLNEQsTUFBVCxFQUZyQjs7QUFJQSxTQUFLLElBQUlMLElBQUksQ0FBYixFQUFnQkEsSUFBSStHLG9CQUFwQixFQUEwQy9HLEdBQTFDLEVBQStDO0FBQzdDLFVBQUlDLFFBQVE2RyxlQUFldEYsUUFBZixDQUF3QnhCLENBQXhCLENBQVo7QUFBQSxVQUNJMEUsS0FBSyxLQUFLcEIsVUFBTCxDQUFnQnlCLEdBQWhCLENBQW9COUUsS0FBcEIsRUFBMkI0RyxXQUEzQixFQUF3Q25DLEVBRGpEO0FBQUEsVUFFSU8sTUFBTSxLQUFLQSxHQUFMLENBQVNoRixLQUFULENBRlY7O0FBSUEwRyxxQkFBZWhHLE1BQWYsQ0FBc0IsS0FBSzZDLFlBQUwsQ0FBa0IxTyxPQUFsQixDQUEwQm1MLEtBQTFCLENBQXRCLEVBQXdEeUUsS0FBS08sR0FBN0Q7QUFDRDs7QUFFRCxXQUFPMEIsY0FBUDtBQUNELEdBZEQ7O0FBZ0JBOzs7Ozs7QUFNQWxLLE9BQUtHLEtBQUwsQ0FBV2xKLFNBQVgsQ0FBcUIwTSxNQUFyQixHQUE4QixZQUFZO0FBQ3hDLFdBQU87QUFDTGxELGVBQVNULEtBQUtTLE9BRFQ7QUFFTDJHLGNBQVEsS0FBS1gsT0FGUjtBQUdMWSxXQUFLLEtBQUtYLElBSEw7QUFJTGhGLGlCQUFXLEtBQUt1RixXQUFMLENBQWlCL0UsS0FKdkI7QUFLTHlFLHFCQUFlLEtBQUtBLGFBQUwsQ0FBbUJoRCxNQUFuQixFQUxWO0FBTUxrRCxrQkFBWSxLQUFLQSxVQUFMLENBQWdCbEQsTUFBaEIsRUFOUDtBQU9Mb0Qsb0JBQWMsS0FBS0EsWUFBTCxDQUFrQnBELE1BQWxCLEVBUFQ7QUFRTHZELGdCQUFVLEtBQUtBLFFBQUwsQ0FBY3VELE1BQWQ7QUFSTCxLQUFQO0FBVUQsR0FYRDs7QUFhQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEzRCxPQUFLRyxLQUFMLENBQVdsSixTQUFYLENBQXFCc1QsR0FBckIsR0FBMkIsVUFBVUMsTUFBVixFQUFrQjtBQUMzQyxRQUFJelQsT0FBT0MsTUFBTUMsU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCQyxTQUEzQixFQUFzQyxDQUF0QyxDQUFYO0FBQ0FMLFNBQUswVCxPQUFMLENBQWEsSUFBYjtBQUNBRCxXQUFPblQsS0FBUCxDQUFhLElBQWIsRUFBbUJOLElBQW5CO0FBQ0QsR0FKRDtBQUtBOzs7OztBQUtBOzs7Ozs7O0FBT0FpSixPQUFLNEcsS0FBTCxHQUFhLFlBQVk7QUFDdkIsU0FBSzhELEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBSzdULE1BQUwsR0FBYyxDQUFkO0FBQ0QsR0FIRDs7QUFLQTs7Ozs7OztBQU9BbUosT0FBSzRHLEtBQUwsQ0FBVzNFLElBQVgsR0FBa0IsVUFBVStDLGNBQVYsRUFBMEI7QUFDMUMsUUFBSTBGLFFBQVEsSUFBSSxJQUFKLEVBQVo7O0FBRUFBLFVBQU03VCxNQUFOLEdBQWVtTyxlQUFlbk8sTUFBOUI7QUFDQTZULFVBQU1BLEtBQU4sR0FBYy9CLE9BQU9tQixJQUFQLENBQVk5RSxlQUFlMEYsS0FBM0IsRUFBa0MvUyxNQUFsQyxDQUF5QyxVQUFVMFIsSUFBVixFQUFnQkcsR0FBaEIsRUFBcUI7QUFDMUVILFdBQUtHLEdBQUwsSUFBWXhKLEtBQUs4RSxTQUFMLENBQWU3QyxJQUFmLENBQW9CK0MsZUFBZTBGLEtBQWYsQ0FBcUJsQixHQUFyQixDQUFwQixDQUFaO0FBQ0EsYUFBT0gsSUFBUDtBQUNELEtBSGEsRUFHWCxFQUhXLENBQWQ7O0FBS0EsV0FBT3FCLEtBQVA7QUFDRCxHQVZEOztBQVlBOzs7Ozs7O0FBT0ExSyxPQUFLNEcsS0FBTCxDQUFXM1AsU0FBWCxDQUFxQmdPLEdBQXJCLEdBQTJCLFVBQVVuSSxFQUFWLEVBQWNxRyxNQUFkLEVBQXNCO0FBQy9DLFFBQUksQ0FBQyxLQUFLa0YsR0FBTCxDQUFTdkwsRUFBVCxDQUFMLEVBQW1CLEtBQUtqRyxNQUFMO0FBQ25CLFNBQUs2VCxLQUFMLENBQVc1TixFQUFYLElBQWlCcUcsTUFBakI7QUFDRCxHQUhEOztBQUtBOzs7Ozs7O0FBT0FuRCxPQUFLNEcsS0FBTCxDQUFXM1AsU0FBWCxDQUFxQnFSLEdBQXJCLEdBQTJCLFVBQVV4TCxFQUFWLEVBQWM7QUFDdkMsV0FBTyxLQUFLNE4sS0FBTCxDQUFXNU4sRUFBWCxDQUFQO0FBQ0QsR0FGRDs7QUFJQTs7Ozs7OztBQU9Ba0QsT0FBSzRHLEtBQUwsQ0FBVzNQLFNBQVgsQ0FBcUJvUixHQUFyQixHQUEyQixVQUFVdkwsRUFBVixFQUFjO0FBQ3ZDLFdBQU9BLE1BQU0sS0FBSzROLEtBQWxCO0FBQ0QsR0FGRDs7QUFJQTs7Ozs7O0FBTUExSyxPQUFLNEcsS0FBTCxDQUFXM1AsU0FBWCxDQUFxQmdNLE1BQXJCLEdBQThCLFVBQVVuRyxFQUFWLEVBQWM7QUFDMUMsUUFBSSxDQUFDLEtBQUt1TCxHQUFMLENBQVN2TCxFQUFULENBQUwsRUFBbUI7O0FBRW5CLFdBQU8sS0FBSzROLEtBQUwsQ0FBVzVOLEVBQVgsQ0FBUDtBQUNBLFNBQUtqRyxNQUFMO0FBQ0QsR0FMRDs7QUFPQTs7Ozs7O0FBTUFtSixPQUFLNEcsS0FBTCxDQUFXM1AsU0FBWCxDQUFxQjBNLE1BQXJCLEdBQThCLFlBQVk7QUFDeEMsV0FBTztBQUNMK0csYUFBTyxLQUFLQSxLQURQO0FBRUw3VCxjQUFRLEtBQUtBO0FBRlIsS0FBUDtBQUlELEdBTEQ7O0FBT0E7Ozs7OztBQU1BOzs7Ozs7Ozs7QUFTQW1KLE9BQUtRLE9BQUwsR0FBZ0IsWUFBVTtBQUN4QixRQUFJbUssWUFBWTtBQUNaLGlCQUFZLEtBREE7QUFFWixnQkFBVyxNQUZDO0FBR1osY0FBUyxNQUhHO0FBSVosY0FBUyxNQUpHO0FBS1osY0FBUyxLQUxHO0FBTVosYUFBUSxLQU5JO0FBT1osY0FBUyxJQVBHO0FBUVosZUFBVSxLQVJFO0FBU1osYUFBUSxHQVRJO0FBVVosZUFBVSxLQVZFO0FBV1osaUJBQVksS0FYQTtBQVlaLGVBQVUsS0FaRTtBQWFaLGNBQVMsS0FiRztBQWNaLGVBQVUsSUFkRTtBQWVaLGlCQUFZLEtBZkE7QUFnQlosaUJBQVksS0FoQkE7QUFpQlosaUJBQVksS0FqQkE7QUFrQlosZUFBVSxJQWxCRTtBQW1CWixlQUFVLEtBbkJFO0FBb0JaLGdCQUFXLEtBcEJDO0FBcUJaLGNBQVM7QUFyQkcsS0FBaEI7QUFBQSxRQXdCRUMsWUFBWTtBQUNWLGVBQVUsSUFEQTtBQUVWLGVBQVUsRUFGQTtBQUdWLGVBQVUsSUFIQTtBQUlWLGVBQVUsSUFKQTtBQUtWLGNBQVMsSUFMQztBQU1WLGFBQVEsRUFORTtBQU9WLGNBQVM7QUFQQyxLQXhCZDtBQUFBLFFBa0NFQyxJQUFJLFVBbENOO0FBQUEsUUFrQzJCO0FBQ3pCQyxRQUFJLFVBbkNOO0FBQUEsUUFtQzJCO0FBQ3pCQyxRQUFJRixJQUFJLFlBcENWO0FBQUEsUUFvQzJCO0FBQ3pCRyxRQUFJRixJQUFJLFVBckNWO0FBQUEsUUFxQzJCOztBQUV6QkcsV0FBTyxPQUFPRixDQUFQLEdBQVcsSUFBWCxHQUFrQkMsQ0FBbEIsR0FBc0JELENBdkMvQjtBQUFBLFFBdUNnRDtBQUM5Q0csV0FBTyxPQUFPSCxDQUFQLEdBQVcsSUFBWCxHQUFrQkMsQ0FBbEIsR0FBc0JELENBQXRCLEdBQTBCLEdBQTFCLEdBQWdDQyxDQUFoQyxHQUFvQyxLQXhDN0M7QUFBQSxRQXdDcUQ7QUFDbkRHLFdBQU8sT0FBT0osQ0FBUCxHQUFXLElBQVgsR0FBa0JDLENBQWxCLEdBQXNCRCxDQUF0QixHQUEwQkMsQ0FBMUIsR0FBOEJELENBekN2QztBQUFBLFFBeUNnRDtBQUM5Q0ssVUFBTSxPQUFPTCxDQUFQLEdBQVcsSUFBWCxHQUFrQkQsQ0ExQzFCLENBRHdCLENBMkN1Qjs7QUFFL0MsUUFBSU8sVUFBVSxJQUFJQyxNQUFKLENBQVdMLElBQVgsQ0FBZDtBQUNBLFFBQUlNLFVBQVUsSUFBSUQsTUFBSixDQUFXSCxJQUFYLENBQWQ7QUFDQSxRQUFJSyxVQUFVLElBQUlGLE1BQUosQ0FBV0osSUFBWCxDQUFkO0FBQ0EsUUFBSU8sU0FBUyxJQUFJSCxNQUFKLENBQVdGLEdBQVgsQ0FBYjs7QUFFQSxRQUFJTSxRQUFRLGlCQUFaO0FBQ0EsUUFBSUMsU0FBUyxnQkFBYjtBQUNBLFFBQUlDLFFBQVEsWUFBWjtBQUNBLFFBQUlDLFNBQVMsaUJBQWI7QUFDQSxRQUFJQyxVQUFVLElBQWQ7QUFDQSxRQUFJQyxXQUFXLGFBQWY7QUFDQSxRQUFJQyxXQUFXLElBQUlWLE1BQUosQ0FBVyxvQkFBWCxDQUFmO0FBQ0EsUUFBSVcsV0FBVyxJQUFJWCxNQUFKLENBQVcsTUFBTVAsQ0FBTixHQUFVRCxDQUFWLEdBQWMsY0FBekIsQ0FBZjs7QUFFQSxRQUFJb0IsUUFBUSxrQkFBWjtBQUNBLFFBQUlDLE9BQU8sMElBQVg7O0FBRUEsUUFBSUMsT0FBTyxnREFBWDs7QUFFQSxRQUFJQyxPQUFPLHFGQUFYO0FBQ0EsUUFBSUMsUUFBUSxtQkFBWjs7QUFFQSxRQUFJQyxPQUFPLFVBQVg7QUFDQSxRQUFJQyxTQUFTLEtBQWI7QUFDQSxRQUFJQyxRQUFRLElBQUluQixNQUFKLENBQVcsTUFBTVAsQ0FBTixHQUFVRCxDQUFWLEdBQWMsY0FBekIsQ0FBWjs7QUFFQSxRQUFJNEIsZ0JBQWdCLFNBQVNBLGFBQVQsQ0FBdUJDLENBQXZCLEVBQTBCO0FBQzVDLFVBQU1DLElBQU4sRUFDRUMsTUFERixFQUVFQyxPQUZGLEVBR0VDLEVBSEYsRUFJRUMsR0FKRixFQUtFQyxHQUxGLEVBTUVDLEdBTkY7O0FBUUEsVUFBSVAsRUFBRTlWLE1BQUYsR0FBVyxDQUFmLEVBQWtCO0FBQUUsZUFBTzhWLENBQVA7QUFBVzs7QUFFL0JHLGdCQUFVSCxFQUFFUSxNQUFGLENBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBVjtBQUNBLFVBQUlMLFdBQVcsR0FBZixFQUFvQjtBQUNsQkgsWUFBSUcsUUFBUU0sV0FBUixLQUF3QlQsRUFBRVEsTUFBRixDQUFTLENBQVQsQ0FBNUI7QUFDRDs7QUFFRDtBQUNBSixXQUFLckIsS0FBTDtBQUNBc0IsWUFBTXJCLE1BQU47O0FBRUEsVUFBSW9CLEdBQUdNLElBQUgsQ0FBUVYsQ0FBUixDQUFKLEVBQWdCO0FBQUVBLFlBQUlBLEVBQUVXLE9BQUYsQ0FBVVAsRUFBVixFQUFhLE1BQWIsQ0FBSjtBQUEyQixPQUE3QyxNQUNLLElBQUlDLElBQUlLLElBQUosQ0FBU1YsQ0FBVCxDQUFKLEVBQWlCO0FBQUVBLFlBQUlBLEVBQUVXLE9BQUYsQ0FBVU4sR0FBVixFQUFjLE1BQWQsQ0FBSjtBQUE0Qjs7QUFFcEQ7QUFDQUQsV0FBS25CLEtBQUw7QUFDQW9CLFlBQU1uQixNQUFOO0FBQ0EsVUFBSWtCLEdBQUdNLElBQUgsQ0FBUVYsQ0FBUixDQUFKLEVBQWdCO0FBQ2QsWUFBSVksS0FBS1IsR0FBR1MsSUFBSCxDQUFRYixDQUFSLENBQVQ7QUFDQUksYUFBSzFCLE9BQUw7QUFDQSxZQUFJMEIsR0FBR00sSUFBSCxDQUFRRSxHQUFHLENBQUgsQ0FBUixDQUFKLEVBQW9CO0FBQ2xCUixlQUFLakIsT0FBTDtBQUNBYSxjQUFJQSxFQUFFVyxPQUFGLENBQVVQLEVBQVYsRUFBYSxFQUFiLENBQUo7QUFDRDtBQUNGLE9BUEQsTUFPTyxJQUFJQyxJQUFJSyxJQUFKLENBQVNWLENBQVQsQ0FBSixFQUFpQjtBQUN0QixZQUFJWSxLQUFLUCxJQUFJUSxJQUFKLENBQVNiLENBQVQsQ0FBVDtBQUNBQyxlQUFPVyxHQUFHLENBQUgsQ0FBUDtBQUNBUCxjQUFNdkIsTUFBTjtBQUNBLFlBQUl1QixJQUFJSyxJQUFKLENBQVNULElBQVQsQ0FBSixFQUFvQjtBQUNsQkQsY0FBSUMsSUFBSjtBQUNBSSxnQkFBTWpCLFFBQU47QUFDQWtCLGdCQUFNakIsUUFBTjtBQUNBa0IsZ0JBQU1qQixRQUFOO0FBQ0EsY0FBSWUsSUFBSUssSUFBSixDQUFTVixDQUFULENBQUosRUFBaUI7QUFBR0EsZ0JBQUlBLElBQUksR0FBUjtBQUFjLFdBQWxDLE1BQ0ssSUFBSU0sSUFBSUksSUFBSixDQUFTVixDQUFULENBQUosRUFBaUI7QUFBRUksaUJBQUtqQixPQUFMLENBQWNhLElBQUlBLEVBQUVXLE9BQUYsQ0FBVVAsRUFBVixFQUFhLEVBQWIsQ0FBSjtBQUF1QixXQUF4RCxNQUNBLElBQUlHLElBQUlHLElBQUosQ0FBU1YsQ0FBVCxDQUFKLEVBQWlCO0FBQUVBLGdCQUFJQSxJQUFJLEdBQVI7QUFBYztBQUN2QztBQUNGOztBQUVEO0FBQ0FJLFdBQUtiLEtBQUw7QUFDQSxVQUFJYSxHQUFHTSxJQUFILENBQVFWLENBQVIsQ0FBSixFQUFnQjtBQUNkLFlBQUlZLEtBQUtSLEdBQUdTLElBQUgsQ0FBUWIsQ0FBUixDQUFUO0FBQ0FDLGVBQU9XLEdBQUcsQ0FBSCxDQUFQO0FBQ0FaLFlBQUlDLE9BQU8sR0FBWDtBQUNEOztBQUVEO0FBQ0FHLFdBQUtaLElBQUw7QUFDQSxVQUFJWSxHQUFHTSxJQUFILENBQVFWLENBQVIsQ0FBSixFQUFnQjtBQUNkLFlBQUlZLEtBQUtSLEdBQUdTLElBQUgsQ0FBUWIsQ0FBUixDQUFUO0FBQ0FDLGVBQU9XLEdBQUcsQ0FBSCxDQUFQO0FBQ0FWLGlCQUFTVSxHQUFHLENBQUgsQ0FBVDtBQUNBUixhQUFLMUIsT0FBTDtBQUNBLFlBQUkwQixHQUFHTSxJQUFILENBQVFULElBQVIsQ0FBSixFQUFtQjtBQUNqQkQsY0FBSUMsT0FBT2pDLFVBQVVrQyxNQUFWLENBQVg7QUFDRDtBQUNGOztBQUVEO0FBQ0FFLFdBQUtYLElBQUw7QUFDQSxVQUFJVyxHQUFHTSxJQUFILENBQVFWLENBQVIsQ0FBSixFQUFnQjtBQUNkLFlBQUlZLEtBQUtSLEdBQUdTLElBQUgsQ0FBUWIsQ0FBUixDQUFUO0FBQ0FDLGVBQU9XLEdBQUcsQ0FBSCxDQUFQO0FBQ0FWLGlCQUFTVSxHQUFHLENBQUgsQ0FBVDtBQUNBUixhQUFLMUIsT0FBTDtBQUNBLFlBQUkwQixHQUFHTSxJQUFILENBQVFULElBQVIsQ0FBSixFQUFtQjtBQUNqQkQsY0FBSUMsT0FBT2hDLFVBQVVpQyxNQUFWLENBQVg7QUFDRDtBQUNGOztBQUVEO0FBQ0FFLFdBQUtWLElBQUw7QUFDQVcsWUFBTVYsS0FBTjtBQUNBLFVBQUlTLEdBQUdNLElBQUgsQ0FBUVYsQ0FBUixDQUFKLEVBQWdCO0FBQ2QsWUFBSVksS0FBS1IsR0FBR1MsSUFBSCxDQUFRYixDQUFSLENBQVQ7QUFDQUMsZUFBT1csR0FBRyxDQUFILENBQVA7QUFDQVIsYUFBS3hCLE9BQUw7QUFDQSxZQUFJd0IsR0FBR00sSUFBSCxDQUFRVCxJQUFSLENBQUosRUFBbUI7QUFDakJELGNBQUlDLElBQUo7QUFDRDtBQUNGLE9BUEQsTUFPTyxJQUFJSSxJQUFJSyxJQUFKLENBQVNWLENBQVQsQ0FBSixFQUFpQjtBQUN0QixZQUFJWSxLQUFLUCxJQUFJUSxJQUFKLENBQVNiLENBQVQsQ0FBVDtBQUNBQyxlQUFPVyxHQUFHLENBQUgsSUFBUUEsR0FBRyxDQUFILENBQWY7QUFDQVAsY0FBTXpCLE9BQU47QUFDQSxZQUFJeUIsSUFBSUssSUFBSixDQUFTVCxJQUFULENBQUosRUFBb0I7QUFDbEJELGNBQUlDLElBQUo7QUFDRDtBQUNGOztBQUVEO0FBQ0FHLFdBQUtSLElBQUw7QUFDQSxVQUFJUSxHQUFHTSxJQUFILENBQVFWLENBQVIsQ0FBSixFQUFnQjtBQUNkLFlBQUlZLEtBQUtSLEdBQUdTLElBQUgsQ0FBUWIsQ0FBUixDQUFUO0FBQ0FDLGVBQU9XLEdBQUcsQ0FBSCxDQUFQO0FBQ0FSLGFBQUt4QixPQUFMO0FBQ0F5QixjQUFNeEIsT0FBTjtBQUNBeUIsY0FBTVIsS0FBTjtBQUNBLFlBQUlNLEdBQUdNLElBQUgsQ0FBUVQsSUFBUixLQUFrQkksSUFBSUssSUFBSixDQUFTVCxJQUFULEtBQWtCLENBQUVLLElBQUlJLElBQUosQ0FBU1QsSUFBVCxDQUExQyxFQUE0RDtBQUMxREQsY0FBSUMsSUFBSjtBQUNEO0FBQ0Y7O0FBRURHLFdBQUtQLE1BQUw7QUFDQVEsWUFBTXpCLE9BQU47QUFDQSxVQUFJd0IsR0FBR00sSUFBSCxDQUFRVixDQUFSLEtBQWNLLElBQUlLLElBQUosQ0FBU1YsQ0FBVCxDQUFsQixFQUErQjtBQUM3QkksYUFBS2pCLE9BQUw7QUFDQWEsWUFBSUEsRUFBRVcsT0FBRixDQUFVUCxFQUFWLEVBQWEsRUFBYixDQUFKO0FBQ0Q7O0FBRUQ7O0FBRUEsVUFBSUQsV0FBVyxHQUFmLEVBQW9CO0FBQ2xCSCxZQUFJRyxRQUFRakwsV0FBUixLQUF3QjhLLEVBQUVRLE1BQUYsQ0FBUyxDQUFULENBQTVCO0FBQ0Q7O0FBRUQsYUFBT1IsQ0FBUDtBQUNELEtBOUhEOztBQWdJQSxXQUFPRCxhQUFQO0FBQ0QsR0F4TWMsRUFBZjs7QUEwTUExTSxPQUFLc0MsUUFBTCxDQUFjRCxnQkFBZCxDQUErQnJDLEtBQUtRLE9BQXBDLEVBQTZDLFNBQTdDO0FBQ0E7Ozs7O0FBS0E7Ozs7Ozs7Ozs7Ozs7QUFhQVIsT0FBS3lOLHNCQUFMLEdBQThCLFVBQVVDLFNBQVYsRUFBcUI7QUFDakQsUUFBSUMsUUFBUUQsVUFBVS9WLE1BQVYsQ0FBaUIsVUFBVTBSLElBQVYsRUFBZ0J1RSxRQUFoQixFQUEwQjtBQUNyRHZFLFdBQUt1RSxRQUFMLElBQWlCQSxRQUFqQjtBQUNBLGFBQU92RSxJQUFQO0FBQ0QsS0FIVyxFQUdULEVBSFMsQ0FBWjs7QUFLQSxXQUFPLFVBQVU3RixLQUFWLEVBQWlCO0FBQ3RCLFVBQUlBLFNBQVNtSyxNQUFNbkssS0FBTixNQUFpQkEsS0FBOUIsRUFBcUMsT0FBT0EsS0FBUDtBQUN0QyxLQUZEO0FBR0QsR0FURDs7QUFXQTs7Ozs7Ozs7Ozs7O0FBWUF4RCxPQUFLTyxjQUFMLEdBQXNCUCxLQUFLeU4sc0JBQUwsQ0FBNEIsQ0FDaEQsR0FEZ0QsRUFFaEQsTUFGZ0QsRUFHaEQsT0FIZ0QsRUFJaEQsUUFKZ0QsRUFLaEQsT0FMZ0QsRUFNaEQsS0FOZ0QsRUFPaEQsUUFQZ0QsRUFRaEQsTUFSZ0QsRUFTaEQsSUFUZ0QsRUFVaEQsT0FWZ0QsRUFXaEQsSUFYZ0QsRUFZaEQsS0FaZ0QsRUFhaEQsS0FiZ0QsRUFjaEQsS0FkZ0QsRUFlaEQsSUFmZ0QsRUFnQmhELElBaEJnRCxFQWlCaEQsSUFqQmdELEVBa0JoRCxTQWxCZ0QsRUFtQmhELE1BbkJnRCxFQW9CaEQsS0FwQmdELEVBcUJoRCxJQXJCZ0QsRUFzQmhELEtBdEJnRCxFQXVCaEQsUUF2QmdELEVBd0JoRCxPQXhCZ0QsRUF5QmhELE1BekJnRCxFQTBCaEQsS0ExQmdELEVBMkJoRCxJQTNCZ0QsRUE0QmhELE1BNUJnRCxFQTZCaEQsUUE3QmdELEVBOEJoRCxNQTlCZ0QsRUErQmhELE1BL0JnRCxFQWdDaEQsT0FoQ2dELEVBaUNoRCxLQWpDZ0QsRUFrQ2hELE1BbENnRCxFQW1DaEQsS0FuQ2dELEVBb0NoRCxLQXBDZ0QsRUFxQ2hELEtBckNnRCxFQXNDaEQsS0F0Q2dELEVBdUNoRCxNQXZDZ0QsRUF3Q2hELElBeENnRCxFQXlDaEQsS0F6Q2dELEVBMENoRCxNQTFDZ0QsRUEyQ2hELEtBM0NnRCxFQTRDaEQsS0E1Q2dELEVBNkNoRCxLQTdDZ0QsRUE4Q2hELFNBOUNnRCxFQStDaEQsR0EvQ2dELEVBZ0RoRCxJQWhEZ0QsRUFpRGhELElBakRnRCxFQWtEaEQsTUFsRGdELEVBbURoRCxJQW5EZ0QsRUFvRGhELElBcERnRCxFQXFEaEQsS0FyRGdELEVBc0RoRCxNQXREZ0QsRUF1RGhELE9BdkRnRCxFQXdEaEQsS0F4RGdELEVBeURoRCxNQXpEZ0QsRUEwRGhELFFBMURnRCxFQTJEaEQsS0EzRGdELEVBNERoRCxJQTVEZ0QsRUE2RGhELE9BN0RnRCxFQThEaEQsTUE5RGdELEVBK0RoRCxNQS9EZ0QsRUFnRWhELElBaEVnRCxFQWlFaEQsU0FqRWdELEVBa0VoRCxJQWxFZ0QsRUFtRWhELEtBbkVnRCxFQW9FaEQsS0FwRWdELEVBcUVoRCxJQXJFZ0QsRUFzRWhELEtBdEVnRCxFQXVFaEQsT0F2RWdELEVBd0VoRCxJQXhFZ0QsRUF5RWhELE1BekVnRCxFQTBFaEQsSUExRWdELEVBMkVoRCxPQTNFZ0QsRUE0RWhELEtBNUVnRCxFQTZFaEQsS0E3RWdELEVBOEVoRCxRQTlFZ0QsRUErRWhELE1BL0VnRCxFQWdGaEQsS0FoRmdELEVBaUZoRCxNQWpGZ0QsRUFrRmhELEtBbEZnRCxFQW1GaEQsUUFuRmdELEVBb0ZoRCxPQXBGZ0QsRUFxRmhELElBckZnRCxFQXNGaEQsTUF0RmdELEVBdUZoRCxNQXZGZ0QsRUF3RmhELE1BeEZnRCxFQXlGaEQsS0F6RmdELEVBMEZoRCxPQTFGZ0QsRUEyRmhELE1BM0ZnRCxFQTRGaEQsTUE1RmdELEVBNkZoRCxPQTdGZ0QsRUE4RmhELE9BOUZnRCxFQStGaEQsTUEvRmdELEVBZ0doRCxNQWhHZ0QsRUFpR2hELEtBakdnRCxFQWtHaEQsSUFsR2dELEVBbUdoRCxLQW5HZ0QsRUFvR2hELE1BcEdnRCxFQXFHaEQsSUFyR2dELEVBc0doRCxPQXRHZ0QsRUF1R2hELEtBdkdnRCxFQXdHaEQsSUF4R2dELEVBeUdoRCxNQXpHZ0QsRUEwR2hELE1BMUdnRCxFQTJHaEQsTUEzR2dELEVBNEdoRCxPQTVHZ0QsRUE2R2hELE9BN0dnRCxFQThHaEQsT0E5R2dELEVBK0doRCxLQS9HZ0QsRUFnSGhELE1BaEhnRCxFQWlIaEQsS0FqSGdELEVBa0hoRCxNQWxIZ0QsRUFtSGhELE1BbkhnRCxFQW9IaEQsT0FwSGdELEVBcUhoRCxLQXJIZ0QsRUFzSGhELEtBdEhnRCxFQXVIaEQsTUF2SGdELENBQTVCLENBQXRCOztBQTBIQXpOLE9BQUtzQyxRQUFMLENBQWNELGdCQUFkLENBQStCckMsS0FBS08sY0FBcEMsRUFBb0QsZ0JBQXBEO0FBQ0E7Ozs7O0FBS0E7Ozs7Ozs7Ozs7Ozs7O0FBY0FQLE9BQUtNLE9BQUwsR0FBZSxVQUFVa0QsS0FBVixFQUFpQjtBQUM5QixXQUFPQSxNQUFNOEosT0FBTixDQUFjLE1BQWQsRUFBc0IsRUFBdEIsRUFBMEJBLE9BQTFCLENBQWtDLE1BQWxDLEVBQTBDLEVBQTFDLENBQVA7QUFDRCxHQUZEOztBQUlBdE4sT0FBS3NDLFFBQUwsQ0FBY0QsZ0JBQWQsQ0FBK0JyQyxLQUFLTSxPQUFwQyxFQUE2QyxTQUE3QztBQUNBOzs7Ozs7QUFNQTs7Ozs7O0FBTUFOLE9BQUs4RyxVQUFMLEdBQWtCLFlBQVk7QUFDNUIsU0FBSytHLElBQUwsR0FBWSxFQUFFQyxNQUFNLEVBQVIsRUFBWjtBQUNBLFNBQUtqWCxNQUFMLEdBQWMsQ0FBZDtBQUNELEdBSEQ7O0FBS0E7Ozs7Ozs7QUFPQW1KLE9BQUs4RyxVQUFMLENBQWdCN0UsSUFBaEIsR0FBdUIsVUFBVStDLGNBQVYsRUFBMEI7QUFDL0MsUUFBSTBGLFFBQVEsSUFBSSxJQUFKLEVBQVo7O0FBRUFBLFVBQU1tRCxJQUFOLEdBQWE3SSxlQUFlNkksSUFBNUI7QUFDQW5ELFVBQU03VCxNQUFOLEdBQWVtTyxlQUFlbk8sTUFBOUI7O0FBRUEsV0FBTzZULEtBQVA7QUFDRCxHQVBEOztBQVNBOzs7Ozs7Ozs7Ozs7O0FBYUExSyxPQUFLOEcsVUFBTCxDQUFnQjdQLFNBQWhCLENBQTBCb0osR0FBMUIsR0FBZ0MsVUFBVW1ELEtBQVYsRUFBaUJtRSxHQUFqQixFQUFzQmtHLElBQXRCLEVBQTRCO0FBQzFELFFBQUlBLE9BQU9BLFFBQVEsS0FBS0EsSUFBeEI7QUFBQSxRQUNJckUsTUFBTWhHLE1BQU11SyxNQUFOLENBQWEsQ0FBYixDQURWO0FBQUEsUUFFSUMsT0FBT3hLLE1BQU10TSxLQUFOLENBQVksQ0FBWixDQUZYOztBQUlBLFFBQUksRUFBRXNTLE9BQU9xRSxJQUFULENBQUosRUFBb0JBLEtBQUtyRSxHQUFMLElBQVksRUFBQ3NFLE1BQU0sRUFBUCxFQUFaOztBQUVwQixRQUFJRSxLQUFLblgsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUNyQmdYLFdBQUtyRSxHQUFMLEVBQVVzRSxJQUFWLENBQWVuRyxJQUFJTixHQUFuQixJQUEwQk0sR0FBMUI7QUFDQSxXQUFLOVEsTUFBTCxJQUFlLENBQWY7QUFDQTtBQUNELEtBSkQsTUFJTztBQUNMLGFBQU8sS0FBS3dKLEdBQUwsQ0FBUzJOLElBQVQsRUFBZXJHLEdBQWYsRUFBb0JrRyxLQUFLckUsR0FBTCxDQUFwQixDQUFQO0FBQ0Q7QUFDRixHQWREOztBQWdCQTs7Ozs7Ozs7OztBQVVBeEosT0FBSzhHLFVBQUwsQ0FBZ0I3UCxTQUFoQixDQUEwQm9SLEdBQTFCLEdBQWdDLFVBQVU3RSxLQUFWLEVBQWlCO0FBQy9DLFFBQUksQ0FBQ0EsS0FBTCxFQUFZLE9BQU8sS0FBUDs7QUFFWixRQUFJYSxPQUFPLEtBQUt3SixJQUFoQjs7QUFFQSxTQUFLLElBQUl0SyxJQUFJLENBQWIsRUFBZ0JBLElBQUlDLE1BQU0zTSxNQUExQixFQUFrQzBNLEdBQWxDLEVBQXVDO0FBQ3JDLFVBQUksQ0FBQ2MsS0FBS2IsTUFBTXVLLE1BQU4sQ0FBYXhLLENBQWIsQ0FBTCxDQUFMLEVBQTRCLE9BQU8sS0FBUDs7QUFFNUJjLGFBQU9BLEtBQUtiLE1BQU11SyxNQUFOLENBQWF4SyxDQUFiLENBQUwsQ0FBUDtBQUNEOztBQUVELFdBQU8sSUFBUDtBQUNELEdBWkQ7O0FBY0E7Ozs7Ozs7Ozs7OztBQVlBdkQsT0FBSzhHLFVBQUwsQ0FBZ0I3UCxTQUFoQixDQUEwQmdYLE9BQTFCLEdBQW9DLFVBQVV6SyxLQUFWLEVBQWlCO0FBQ25ELFFBQUksQ0FBQ0EsS0FBTCxFQUFZLE9BQU8sRUFBUDs7QUFFWixRQUFJYSxPQUFPLEtBQUt3SixJQUFoQjs7QUFFQSxTQUFLLElBQUl0SyxJQUFJLENBQWIsRUFBZ0JBLElBQUlDLE1BQU0zTSxNQUExQixFQUFrQzBNLEdBQWxDLEVBQXVDO0FBQ3JDLFVBQUksQ0FBQ2MsS0FBS2IsTUFBTXVLLE1BQU4sQ0FBYXhLLENBQWIsQ0FBTCxDQUFMLEVBQTRCLE9BQU8sRUFBUDs7QUFFNUJjLGFBQU9BLEtBQUtiLE1BQU11SyxNQUFOLENBQWF4SyxDQUFiLENBQUwsQ0FBUDtBQUNEOztBQUVELFdBQU9jLElBQVA7QUFDRCxHQVpEOztBQWNBOzs7Ozs7Ozs7OztBQVdBckUsT0FBSzhHLFVBQUwsQ0FBZ0I3UCxTQUFoQixDQUEwQnFSLEdBQTFCLEdBQWdDLFVBQVU5RSxLQUFWLEVBQWlCcUssSUFBakIsRUFBdUI7QUFDckQsV0FBTyxLQUFLSSxPQUFMLENBQWF6SyxLQUFiLEVBQW9CcUssSUFBcEIsRUFBMEJDLElBQTFCLElBQWtDLEVBQXpDO0FBQ0QsR0FGRDs7QUFJQTlOLE9BQUs4RyxVQUFMLENBQWdCN1AsU0FBaEIsQ0FBMEI2UixLQUExQixHQUFrQyxVQUFVdEYsS0FBVixFQUFpQnFLLElBQWpCLEVBQXVCO0FBQ3ZELFdBQU9sRixPQUFPbUIsSUFBUCxDQUFZLEtBQUt4QixHQUFMLENBQVM5RSxLQUFULEVBQWdCcUssSUFBaEIsQ0FBWixFQUFtQ2hYLE1BQTFDO0FBQ0QsR0FGRDs7QUFJQTs7Ozs7Ozs7Ozs7O0FBWUFtSixPQUFLOEcsVUFBTCxDQUFnQjdQLFNBQWhCLENBQTBCZ00sTUFBMUIsR0FBbUMsVUFBVU8sS0FBVixFQUFpQjZELEdBQWpCLEVBQXNCO0FBQ3ZELFFBQUksQ0FBQzdELEtBQUwsRUFBWTtBQUNaLFFBQUlhLE9BQU8sS0FBS3dKLElBQWhCOztBQUVBLFNBQUssSUFBSXRLLElBQUksQ0FBYixFQUFnQkEsSUFBSUMsTUFBTTNNLE1BQTFCLEVBQWtDME0sR0FBbEMsRUFBdUM7QUFDckMsVUFBSSxFQUFFQyxNQUFNdUssTUFBTixDQUFheEssQ0FBYixLQUFtQmMsSUFBckIsQ0FBSixFQUFnQztBQUNoQ0EsYUFBT0EsS0FBS2IsTUFBTXVLLE1BQU4sQ0FBYXhLLENBQWIsQ0FBTCxDQUFQO0FBQ0Q7O0FBRUQsV0FBT2MsS0FBS3lKLElBQUwsQ0FBVXpHLEdBQVYsQ0FBUDtBQUNELEdBVkQ7O0FBWUE7Ozs7Ozs7O0FBUUFySCxPQUFLOEcsVUFBTCxDQUFnQjdQLFNBQWhCLENBQTBCc1MsTUFBMUIsR0FBbUMsVUFBVS9GLEtBQVYsRUFBaUI2RixJQUFqQixFQUF1QjtBQUN4RCxRQUFJd0UsT0FBTyxLQUFLSSxPQUFMLENBQWF6SyxLQUFiLENBQVg7QUFBQSxRQUNJc0ssT0FBT0QsS0FBS0MsSUFBTCxJQUFhLEVBRHhCO0FBQUEsUUFFSXpFLE9BQU9BLFFBQVEsRUFGbkI7O0FBSUEsUUFBSVYsT0FBT21CLElBQVAsQ0FBWWdFLElBQVosRUFBa0JqWCxNQUF0QixFQUE4QndTLEtBQUtuUSxJQUFMLENBQVVzSyxLQUFWOztBQUU5Qm1GLFdBQU9tQixJQUFQLENBQVkrRCxJQUFaLEVBQ0cvVixPQURILENBQ1csVUFBVTBSLEdBQVYsRUFBZTtBQUN0QixVQUFJQSxRQUFRLE1BQVosRUFBb0I7O0FBRXBCSCxXQUFLN1IsTUFBTCxDQUFZLEtBQUsrUixNQUFMLENBQVkvRixRQUFRZ0csR0FBcEIsRUFBeUJILElBQXpCLENBQVo7QUFDRCxLQUxILEVBS0ssSUFMTDs7QUFPQSxXQUFPQSxJQUFQO0FBQ0QsR0FmRDs7QUFpQkE7Ozs7OztBQU1BckosT0FBSzhHLFVBQUwsQ0FBZ0I3UCxTQUFoQixDQUEwQjBNLE1BQTFCLEdBQW1DLFlBQVk7QUFDN0MsV0FBTztBQUNMa0ssWUFBTSxLQUFLQSxJQUROO0FBRUxoWCxjQUFRLEtBQUtBO0FBRlIsS0FBUDtBQUlEOztBQUVDOzs7O0FBUEYsR0FXSSxXQUFVZ1gsSUFBVixFQUFnQkssT0FBaEIsRUFBeUI7QUFDekIsUUFBSSxJQUFKLEVBQWdEO0FBQzlDO0FBQ0FDLE1BQUEsb0NBQU9ELE9BQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNELEtBSEQsTUFHTyxJQUFJLFFBQU9FLE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBdkIsRUFBaUM7QUFDdEM7Ozs7O0FBS0FDLGFBQU9ELE9BQVAsR0FBaUJGLFNBQWpCO0FBQ0QsS0FQTSxNQU9BO0FBQ0w7QUFDQUwsV0FBSzdOLElBQUwsR0FBWWtPLFNBQVo7QUFDRDtBQUNGLEdBZkMsRUFlQSxJQWZBLEVBZU0sWUFBWTtBQUNsQjs7Ozs7QUFLQSxXQUFPbE8sSUFBUDtBQUNELEdBdEJDLENBQUQ7QUF1QkYsQ0E5L0RBLEk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkQ7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7OztBQUdBLElBQU1zTyw0QkFBNEIsU0FBbEM7O0FBRUE7OztBQUdBLElBQU1oUixRQUFPLDRCQUFhLGFBQWIsRUFBNEIsTUFBNUIsQ0FBYjs7QUFFQTs7O0FBR0EsSUFBTUMsUUFBTyw0QkFBYSxhQUFiLEVBQTRCLE9BQTVCLENBQWI7O0FBRUE7Ozs7OztBQU1BLElBQU1nUixtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFDdFIsT0FBRCxFQUFVdVIsT0FBVjtBQUFBLFNBQXNCLENBQUNBLFVBQVVqUixLQUFWLEdBQWlCRCxLQUFsQixFQUF3QkwsT0FBeEIsQ0FBdEI7QUFBQSxDQUF6Qjs7QUFFQTs7Ozs7OztBQU9BLElBQU13UixVQUFVLFNBQVZBLE9BQVUsQ0FBQ0MsSUFBRDtBQUFBLFNBQVcsT0FBT0EsSUFBUCxLQUFnQixRQUFqQixJQUErQkEsS0FBSzdYLE1BQUwsS0FBZ0IsQ0FBekQ7QUFBQSxDQUFoQjs7QUFFQTs7Ozs7SUFJcUI4WCxxQjtBQUNuQixpQ0FBWXJRLEtBQVosRUFBbUI7QUFBQTs7QUFDakI7QUFDQSxhQUFjLElBQWQsRUFBb0IseUJBQXBCOztBQUVBO0FBQ0EsUUFBTXNRLG9CQUFvQmhVLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBMUI7QUFDQStULHNCQUFrQjlULFNBQWxCLEdBQThCLDhCQUE5QjtBQUNBLG1DQUFrQixPQUFsQixFQUEyQixJQUEzQixFQUFpQzhULGlCQUFqQzs7QUFFQTtBQUNBLFNBQUtDLEtBQUwsR0FBYWpVLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBLFNBQUtnVSxLQUFMLENBQVcvVCxTQUFYLEdBQXVCLGdCQUF2Qjs7QUFFQSxRQUFNZ1Usc0JBQXNCbFUsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUE1QjtBQUNBaVUsd0JBQW9CaFUsU0FBcEIsR0FBZ0MsZUFBaEM7QUFDQWdVLHdCQUFvQjNVLFdBQXBCLENBQWdDLEtBQUswVSxLQUFyQzs7QUFFQTtBQUNBLFNBQUs1VCxLQUFMLEdBQWFMLFNBQVNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBYjs7QUFFQTtBQUNBLFNBQUtrVSxNQUFMLEdBQWNuVSxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQWQ7QUFDQSxTQUFLa1UsTUFBTCxDQUFZalUsU0FBWixHQUF3QixRQUF4QjtBQUNBLFNBQUtpVSxNQUFMLENBQVloVSxTQUFaLEdBQXdCLFdBQXhCLENBdkJpQixDQXVCb0I7O0FBRXJDO0FBQ0EsU0FBS2lVLFdBQUwsR0FBbUJwVSxTQUFTQyxhQUFULENBQXVCLEdBQXZCLENBQW5CO0FBQ0EsU0FBS21VLFdBQUwsQ0FBaUJsVSxTQUFqQixHQUE2QixPQUE3Qjs7QUFFQTtBQUNBLFNBQUttVSxVQUFMLEdBQWtCclUsU0FBU0MsYUFBVCxDQUF1QixHQUF2QixDQUFsQjtBQUNBLFNBQUtvVSxVQUFMLENBQWdCblUsU0FBaEIsR0FBNEIsUUFBNUI7QUFDQSxTQUFLbVUsVUFBTCxDQUFnQmxVLFNBQWhCLEdBQTRCLGNBQTVCO0FBQ0EsU0FBS2tVLFVBQUwsQ0FBZ0JuVixZQUFoQixDQUE2QixRQUE3QixFQUF1QyxRQUF2QztBQUNBd0QsVUFBSyxLQUFLMlIsVUFBVjs7QUFFQSxRQUFNQyxjQUFjdFUsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFwQjtBQUNBcVUsZ0JBQVlwVSxTQUFaLEdBQXdCLGNBQXhCO0FBQ0FvVSxnQkFBWS9VLFdBQVosQ0FBd0IsS0FBS2MsS0FBN0I7QUFDQWlVLGdCQUFZL1UsV0FBWixDQUF3QixLQUFLNFUsTUFBN0I7QUFDQUcsZ0JBQVkvVSxXQUFaLENBQXdCLEtBQUs2VSxXQUE3QjtBQUNBRSxnQkFBWS9VLFdBQVosQ0FBd0IsS0FBSzhVLFVBQTdCOztBQUVBLFFBQU1FLGlCQUFpQnZVLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7QUFDQXNVLG1CQUFlclUsU0FBZixHQUEyQixXQUEzQjtBQUNBcVUsbUJBQWVoVixXQUFmLENBQTJCMlUsbUJBQTNCO0FBQ0FLLG1CQUFlaFYsV0FBZixDQUEyQitVLFdBQTNCOztBQUVBO0FBQ0EsU0FBS0UsU0FBTCxHQUFpQnhVLFNBQVNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBakI7QUFDQSxTQUFLdVUsU0FBTCxDQUFldFUsU0FBZixHQUEyQix1QkFBM0I7QUFDQSxTQUFLc1UsU0FBTCxDQUFlclUsU0FBZixHQUEyQixLQUEzQjtBQUNBdUMsVUFBSyxLQUFLOFIsU0FBVjtBQUNBLG1DQUFrQixRQUFsQixFQUE0QixJQUE1QixFQUFrQyxLQUFLQSxTQUF2Qzs7QUFFQTtBQUNBLFNBQUtDLGFBQUwsR0FBcUJ6VSxTQUFTQyxhQUFULENBQXVCLE1BQXZCLENBQXJCO0FBQ0EsU0FBS3dVLGFBQUwsQ0FBbUJ2VSxTQUFuQixHQUErQiwrQkFBL0I7QUFDQSxTQUFLdVUsYUFBTCxDQUFtQnRVLFNBQW5CLEdBQStCLFNBQS9CO0FBQ0F1QyxVQUFLLEtBQUsrUixhQUFWO0FBQ0EsbUNBQWtCLFNBQWxCLEVBQTZCLElBQTdCLEVBQW1DLEtBQUtBLGFBQXhDOztBQUVBLFFBQU1DLFlBQVkxVSxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQWxCO0FBQ0F5VSxjQUFVeFUsU0FBVixHQUFzQixZQUF0QjtBQUNBd1UsY0FBVW5WLFdBQVYsQ0FBc0IsS0FBS2lWLFNBQTNCO0FBQ0FFLGNBQVVuVixXQUFWLENBQXNCLEtBQUtrVixhQUEzQjs7QUFFQTtBQUNBLFFBQU1FLGVBQWUsS0FBS0MsV0FBTCxDQUFpQixrQkFBakIsRUFBcUMsYUFBckMsRUFBb0QsZUFBcEQsQ0FBckI7QUFDQSxRQUFNQyxlQUFlLEtBQUtELFdBQUwsQ0FBaUIsbUJBQWpCLEVBQXNDLGFBQXRDLEVBQXFELGVBQXJELENBQXJCO0FBQ0EsUUFBTUUsaUJBQWlCLEtBQUtGLFdBQUwsQ0FBaUIsZ0JBQWpCLEVBQW1DLGFBQW5DLEVBQWtELGlCQUFsRCxDQUF2Qjs7QUFFQTtBQUNBLFFBQU1HLG9CQUFvQi9VLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBMUI7QUFDQThVLHNCQUFrQjdVLFNBQWxCLEdBQThCLGFBQTlCO0FBQ0E2VSxzQkFBa0J4VixXQUFsQixDQUE4Qm9WLFlBQTlCO0FBQ0FJLHNCQUFrQnhWLFdBQWxCLENBQThCc1YsWUFBOUI7QUFDQUUsc0JBQWtCeFYsV0FBbEIsQ0FBOEJ1VixjQUE5Qjs7QUFFQTtBQUNBLFNBQUtFLFFBQUwsR0FBZ0JoVixTQUFTQyxhQUFULENBQXVCLElBQXZCLENBQWhCOztBQUdBO0FBQ0EsU0FBS2dWLFdBQUwsR0FBbUJqVixTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQW5CO0FBQ0EsU0FBS2dWLFdBQUwsQ0FBaUIvVSxTQUFqQixHQUE2QixxQkFBN0I7QUFDQSxTQUFLK1UsV0FBTCxDQUFpQi9WLFlBQWpCLENBQThCLGFBQTlCLEVBQTZDLE1BQTdDO0FBQ0EsU0FBSytWLFdBQUwsQ0FBaUIxVixXQUFqQixDQUE2QnlVLGlCQUE3QjtBQUNBLFNBQUtpQixXQUFMLENBQWlCMVYsV0FBakIsQ0FBNkJnVixjQUE3QjtBQUNBLFNBQUtVLFdBQUwsQ0FBaUIxVixXQUFqQixDQUE2Qm1WLFNBQTdCO0FBQ0EsU0FBS08sV0FBTCxDQUFpQjFWLFdBQWpCLENBQTZCLEtBQUt5VixRQUFsQztBQUNBLFNBQUtDLFdBQUwsQ0FBaUIxVixXQUFqQixDQUE2QndWLGlCQUE3QjtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7O2dDQVNZMVUsSyxFQUFPOEIsSSxFQUFNYyxNLEVBQVE7QUFDL0IsVUFBTWlTLFdBQVdsVixTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0FBQ0FpVixlQUFTaFYsU0FBVCxHQUFxQixjQUFyQjtBQUNBZ1YsZUFBU2hXLFlBQVQsQ0FBc0IsZUFBdEIsRUFBdUMsT0FBdkM7QUFDQWdXLGVBQVNoVyxZQUFULENBQXNCLGVBQXRCLEVBQXVDK0QsTUFBdkM7QUFDQWlTLGVBQVMvVSxTQUFULEdBQXFCRSxLQUFyQjs7QUFFQSxVQUFNOFUsY0FBY25WLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBcEI7QUFDQWtWLGtCQUFZalYsU0FBWixHQUF3QixrQkFBeEI7QUFDQWlWLGtCQUFZaFYsU0FBWixHQUF3QmdDLElBQXhCOztBQUVBLFVBQU1lLFNBQVNsRCxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQWY7QUFDQWlELGFBQU9oRCxTQUFQLEdBQW1CLFlBQW5CO0FBQ0FnRCxhQUFPaEIsRUFBUCxHQUFZZSxNQUFaO0FBQ0FDLGFBQU9oRSxZQUFQLENBQW9CLGFBQXBCLEVBQW1DLE1BQW5DO0FBQ0FnRSxhQUFPM0QsV0FBUCxDQUFtQjRWLFdBQW5COztBQUVBLFVBQU1DLFVBQVVwVixTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0FtVixjQUFRbFYsU0FBUixHQUFvQixPQUFwQjtBQUNBa1YsY0FBUTdWLFdBQVIsQ0FBb0IyVixRQUFwQjtBQUNBRSxjQUFRN1YsV0FBUixDQUFvQjJELE1BQXBCOztBQUVBLDJCQUFVa1MsT0FBVjs7QUFFQSxhQUFPQSxPQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O3VDQUttQm5CLEssRUFBTztBQUN4QixVQUFNb0IsT0FBT3JWLFNBQVNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBb1YsV0FBS2xWLFNBQUwsbUJBQThCOFQsTUFBTXFCLEdBQXBDLGlCQUFpRHJCLE1BQU1zQixHQUF2RDs7QUFFQSxXQUFLUCxRQUFMLENBQWN6VixXQUFkLENBQTBCOFYsSUFBMUI7QUFDRDs7QUFFRDs7Ozs7Ozs7NkJBS1NHLEcsRUFBSztBQUNaLFdBQUt2QixLQUFMLENBQVcvVSxZQUFYLENBQXdCLEtBQXhCLEVBQStCc1csR0FBL0I7QUFDRDs7QUFFRDs7Ozs7Ozs7MEJBS010VCxFLEVBQUk7QUFDUixXQUFLdVMsYUFBTCxDQUFtQnZWLFlBQW5CLENBQWdDd1UseUJBQWhDLEVBQTJEeFIsRUFBM0Q7QUFDQSxXQUFLc1MsU0FBTCxDQUFldFYsWUFBZixDQUE0QndVLHlCQUE1QixFQUF1RHhSLEVBQXZEO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OzZCQUtTN0IsSyxFQUFPO0FBQ2QsV0FBS0EsS0FBTCxDQUFXRixTQUFYLEdBQXVCRSxLQUF2QjtBQUNEOztBQUVEOzs7Ozs7OzttQ0FLZXlULEksRUFBTTtBQUNuQixXQUFLTSxXQUFMLENBQWlCalUsU0FBakIsR0FBNkIyVCxJQUE3QjtBQUNEOztBQUVEOzs7Ozs7OzsrQkFLV3dCLEcsRUFBSztBQUNkLFdBQUtqQixVQUFMLENBQWdCblYsWUFBaEIsQ0FBNkIsTUFBN0IsRUFBcUNvVyxPQUFPLEdBQTVDO0FBQ0EzQix1QkFBaUIsS0FBS1UsVUFBdEIsRUFBa0MsQ0FBQ1IsUUFBUXlCLEdBQVIsQ0FBbkM7QUFDRDs7QUFFRDs7Ozs7Ozs7bUNBS2VHLFMsRUFBVztBQUN4QjlCLHVCQUFpQixLQUFLYSxTQUF0QixFQUFpQ2lCLFNBQWpDO0FBQ0E5Qix1QkFBaUIsS0FBS2MsYUFBdEIsRUFBcUMsQ0FBQ2dCLFNBQXRDO0FBQ0Q7O0FBRUQ7Ozs7OzsyQkFHTztBQUNML1MsWUFBSyxLQUFLdVMsV0FBVjtBQUNEOztBQUVEOzs7Ozs7MkJBR087QUFDTHRTLFlBQUssS0FBS3NTLFdBQVY7QUFDRDs7QUFFRDs7Ozs7OztpQ0FJYTtBQUNYLGFBQU8sS0FBS0EsV0FBWjtBQUNEOzs7Ozs7a0JBNU5rQmxCLHFCOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFDckI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7OztJQUlxQjJCLGlCO0FBQ25CLDZCQUFZaFMsS0FBWixFQUFtQjtBQUFBOztBQUNqQjtBQUNBLGFBQWMsSUFBZCxFQUFvQix5QkFBcEI7O0FBRUE7QUFDQSxTQUFLSSxRQUFMLEdBQWdCLDBCQUFnQjtBQUM5Qi9DLGtCQUFZMkMsTUFBTTNDO0FBRFksS0FBaEIsQ0FBaEI7O0FBSUE7QUFDQSxTQUFLOEMsSUFBTCxHQUFZLG9DQUF5QkgsS0FBekIsQ0FBWjtBQUNBLFNBQUtHLElBQUwsQ0FBVTVGLEVBQVYsQ0FBYSxTQUFiLEVBQXdCLEtBQUswWCxPQUE3QixFQUFzQyxJQUF0Qzs7QUFFQTtBQUNBLFNBQUtoWCxTQUFMLENBQWUsQ0FBQyxPQUFELEVBQVUsUUFBVixDQUFmLEVBQW9DLEtBQUtrRixJQUF6QztBQUNEOztBQUVEOzs7Ozs7OzJCQUdPO0FBQ0wsV0FBS0EsSUFBTCxDQUFVbkIsSUFBVjtBQUNEOztBQUVEOzs7Ozs7MkJBR087QUFDTCxXQUFLbUIsSUFBTCxDQUFVbEIsSUFBVjtBQUNEOztBQUVEOzs7Ozs7Ozs7OzZCQU9TVCxFLEVBQUk7QUFDWCxXQUFLNEIsUUFBTCxDQUFjN0IsV0FBZCxDQUEwQkMsRUFBMUIsRUFDR2IsSUFESCxDQUNRLEtBQUtzTSxNQUFMLENBQVl4SixJQUFaLENBQWlCLElBQWpCLENBRFI7QUFFRDs7QUFFRDs7Ozs7Ozs7OztrQ0FPZTtBQUFBOztBQUFBLFVBQUxqQyxFQUFLLFFBQUxBLEVBQUs7O0FBQ1osYUFBTyxLQUFLNEIsUUFBTCxDQUFjN0IsV0FBZCxDQUEwQkMsRUFBMUIsRUFDSmIsSUFESSxDQUNDO0FBQUEsZUFBZVksWUFBWUYsV0FBM0I7QUFBQSxPQURELEVBRUpWLElBRkksQ0FFQztBQUFBLGVBQWUsTUFBS3lDLFFBQUwsQ0FBYzhSLGtCQUFkLENBQWlDN1QsV0FBakMsQ0FBZjtBQUFBLE9BRkQsRUFHSlYsSUFISSxDQUdDO0FBQUEsZUFBZVQsUUFBUWlWLEtBQVIsQ0FBYyxtQkFBZCxDQUFmO0FBQUEsT0FIRCxDQUFQO0FBSUQ7O0FBRUY7Ozs7Ozs7OzJCQUtPNVQsVyxFQUFhO0FBQ2xCLFdBQUs0QixJQUFMLENBQVVpUyxLQUFWLENBQWdCN1QsWUFBWUYsV0FBNUI7QUFDQSxXQUFLOEIsSUFBTCxDQUFVVSxRQUFWLENBQW1CdEMsWUFBWTVCLEtBQS9CO0FBQ0EsV0FBS3dELElBQUwsQ0FBVWtTLGNBQVYsQ0FBeUI5VCxZQUFZbVMsV0FBckM7QUFDQSxXQUFLdlEsSUFBTCxDQUFVbVMsUUFBVixDQUFtQi9ULFlBQVlnVSxJQUEvQjtBQUNBLFdBQUtwUyxJQUFMLENBQVVxUyxVQUFWLENBQXFCalUsWUFBWWtVLE9BQWpDO0FBQ0EsV0FBS3RTLElBQUwsQ0FBVXVTLGNBQVYsQ0FBeUIsQ0FBQyxDQUFDblUsWUFBWXdULFNBQXZDOztBQUVBeFQsa0JBQVlvVSxXQUFaLENBQXdCblosT0FBeEIsQ0FBZ0MsS0FBSzJHLElBQUwsQ0FBVXlTLGtCQUExQyxFQUE4RCxLQUFLelMsSUFBbkU7QUFDRDs7QUFFRDs7Ozs7Ozs7aUNBS2E7QUFDWCxhQUFPLEtBQUtBLElBQUwsQ0FBVVksVUFBVixFQUFQO0FBQ0Q7Ozs7OztrQkFqRmtCaVIsaUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUnJCOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7OztBQUdBLElBQU1oVCxRQUFPLDRCQUFhLGFBQWIsRUFBNEIsTUFBNUIsQ0FBYjs7QUFFQTs7O0FBR0EsSUFBTUMsUUFBTyw0QkFBYSxhQUFiLEVBQTRCLE9BQTVCLENBQWI7O0FBRUE7Ozs7Ozs7SUFNcUI0VCxtQjtBQUNuQiwrQkFBWTdTLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiOztBQUVBO0FBQ0EsYUFBYyxJQUFkLEVBQW9CLHlCQUFwQjs7QUFFQTtBQUNBLFNBQUt1UixXQUFMLEdBQW1CalYsU0FBU0MsYUFBVCxDQUF1QixJQUF2QixDQUFuQjtBQUNBLFNBQUtnVixXQUFMLENBQWlCL1UsU0FBakIsR0FBNkIsbUJBQTdCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7MkJBR087QUFDTHdDLFlBQUssS0FBS3VTLFdBQVY7QUFDRDs7QUFFRDs7Ozs7OzJCQUdPO0FBQ0x0UyxZQUFLLEtBQUtzUyxXQUFWO0FBQ0Q7O0FBRUQ7Ozs7OztvQ0FHZ0I7QUFDZCxVQUFHLEtBQUtBLFdBQVIsRUFBb0I7QUFDbEIsZUFBTSxLQUFLQSxXQUFMLENBQWlCdUIsVUFBdkIsRUFBa0M7QUFDaEMsZUFBS3ZCLFdBQUwsQ0FBaUJ3QixXQUFqQixDQUE2QixLQUFLeEIsV0FBTCxDQUFpQnVCLFVBQTlDO0FBQ0Q7QUFDRjtBQUNGOztBQUVEOzs7Ozs7OzsyQkFLT3ZVLFcsRUFBYTtBQUNsQixVQUFNeVUsTUFBTSxLQUFLQyxvQkFBTCxDQUEwQjFVLFdBQTFCLEVBQXVDLElBQXZDLENBQVo7QUFDQSxxQ0FBa0IsY0FBbEIsRUFBa0MsSUFBbEMsRUFBd0N5VSxHQUF4QztBQUNBLFdBQUt6QixXQUFMLENBQWlCMVYsV0FBakIsQ0FBNkJtWCxHQUE3QjtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozt5Q0FRcUJ6VSxXLEVBQWE3RCxLLEVBQU87QUFDdkM7QUFDQSxVQUFNaUUsVUFBVXJDLFNBQVNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBaEI7QUFDQW9DLGNBQVFILEVBQVIscUJBQTZCRCxZQUFZRixXQUF6QztBQUNBTSxjQUFRbkQsWUFBUixDQUFxQixTQUFyQixFQUFnQytDLFlBQVlGLFdBQTVDOztBQUVBO0FBQ0EsVUFBTTZVLGtCQUFrQixFQUFFOUMsTUFBTSxLQUFSLEVBQWUrQyxLQUFLLGdCQUFwQixFQUF4QjtBQUNBLFVBQU1DLHNCQUFzQixFQUFFaEQsTUFBTSxTQUFSLEVBQW1CK0MsS0FBSyx3QkFBeEIsRUFBNUI7QUFDQSxVQUFNcFcsU0FBU3dCLFlBQVl3VCxTQUFaLEdBQXlCbUIsZUFBekIsR0FBMENFLG1CQUF6RDs7QUFFQTtBQUNBelUsY0FBUWxDLFNBQVIsb0RBQ3FDOEIsWUFBWWdVLElBRGpELHdDQUV3QnhWLE9BQU9vVyxHQUYvQixxQkFFZ0Q1VSxZQUFZRixXQUY1RCxXQUU0RXRCLE9BQU9xVCxJQUZuRiwyQkFHUTdSLFlBQVk1QixLQUhwQixnREFJNkI0QixZQUFZOFUsT0FKekM7O0FBT0E7QUFDQSxVQUFNdkMsWUFBWW5TLFFBQVEzQyxhQUFSLENBQXNCLGlCQUF0QixDQUFsQjtBQUNBLFVBQUc4VSxTQUFILEVBQWE7QUFDWCx1Q0FBa0IsUUFBbEIsRUFBNEJwVyxLQUE1QixFQUFtQ29XLFNBQW5DO0FBQ0Q7O0FBRUQsYUFBT25TLE9BQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7aUNBS2E7QUFDWCxhQUFPLEtBQUs0UyxXQUFaO0FBQ0Q7Ozs7OztrQkEzRmtCc0IsbUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJyQjs7OztBQUNBOzs7Ozs7QUFFQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7OztJQU9xQlMsZTtBQUNuQiwyQkFBWXRULEtBQVosRUFBbUI7QUFBQTs7QUFDakI7QUFDQSxhQUFjLElBQWQsRUFBb0IseUJBQXBCOztBQUVBO0FBQ0EsU0FBS0csSUFBTCxHQUFZLGtDQUF1QkgsS0FBdkIsQ0FBWjtBQUNBLFNBQUsvRSxTQUFMLENBQWUsQ0FBQyxjQUFELEVBQWlCLFFBQWpCLENBQWYsRUFBMkMsS0FBS2tGLElBQWhEO0FBQ0Q7O0FBRUQ7Ozs7Ozs7MkJBR087QUFDTCxXQUFLQSxJQUFMLENBQVVuQixJQUFWO0FBQ0Q7O0FBRUQ7Ozs7OzsyQkFHTztBQUNMLFdBQUttQixJQUFMLENBQVVsQixJQUFWO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OzJCQUtPWCxZLEVBQWM7QUFDbkIsV0FBSzZCLElBQUwsQ0FBVW9ULGFBQVY7QUFDQWpWLG1CQUFhOUUsT0FBYixDQUFxQixLQUFLMkcsSUFBTCxDQUFVcVQsTUFBL0IsRUFBdUMsS0FBS3JULElBQTVDO0FBQ0EsV0FBS3RGLElBQUwsQ0FBVSwwQkFBVixFQUFzQyxFQUF0QztBQUNEOztBQUdEOzs7Ozs7OztpQ0FLYTtBQUNYLGFBQU8sS0FBS3NGLElBQUwsQ0FBVVksVUFBVixFQUFQO0FBQ0Q7Ozs7OztrQkEzQ2tCdVMsZTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQnJCOzs7O0FBRUE7Ozs7SUFJcUJHLGtCO0FBQ25COzs7O0FBSUEsOEJBQVl6VCxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCO0FBQ0EsYUFBYyxJQUFkLEVBQW9CLHlCQUFwQjs7QUFFQTtBQUNBLFFBQU0wVCxPQUFPLEtBQUtDLGlCQUFMLEVBQWI7QUFDQSxRQUFNQyxhQUFhLEtBQUtDLHVCQUFMLEVBQW5COztBQUVBO0FBQ0EsUUFBTUMsWUFBWXhYLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7QUFDQXVYLGNBQVV0WCxTQUFWLEdBQXNCLFlBQXRCO0FBQ0FzWCxjQUFValksV0FBVixDQUFzQjZYLElBQXRCO0FBQ0FJLGNBQVVqWSxXQUFWLENBQXNCK1gsVUFBdEI7O0FBRUE7QUFDQSxTQUFLckMsV0FBTCxHQUFvQmpWLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBcEI7QUFDQSxTQUFLZ1YsV0FBTCxDQUFpQjFWLFdBQWpCLENBQTZCaVksU0FBN0I7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Z0NBT1kxRCxJLEVBQU07QUFBQTs7QUFDaEIsVUFBTXpSLFVBQVVyQyxTQUFTQyxhQUFULENBQXVCLElBQXZCLENBQWhCO0FBQ0FvQyxjQUFRbkQsWUFBUixDQUFxQixNQUFyQixFQUE2QixVQUE3QjtBQUNBbUQsY0FBUWxDLFNBQVIsR0FBb0IyVCxJQUFwQjs7QUFFQXpSLGNBQVFDLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLGlCQUFTO0FBQ3pDLGNBQUsvRCxJQUFMLENBQVUsZUFBVixFQUEyQjtBQUN6QjhELG1CQUFTN0QsTUFBTXVFO0FBRFUsU0FBM0I7QUFHRCxPQUpEOztBQU1BO0FBQ0EsVUFBRyxLQUFLMFUsY0FBTCxDQUFvQkMsaUJBQXBCLEdBQXdDLENBQTNDLEVBQThDO0FBQzVDclYsZ0JBQVFuRCxZQUFSLENBQXFCLGVBQXJCLEVBQXNDLE1BQXRDO0FBQ0Q7O0FBRUQ7QUFDQSxXQUFLdVksY0FBTCxDQUFvQmxZLFdBQXBCLENBQWdDOEMsT0FBaEM7O0FBRUEsYUFBT0EsT0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozt3Q0FLb0I7QUFDbEIsV0FBS29WLGNBQUwsR0FBc0J6WCxTQUFTQyxhQUFULENBQXVCLElBQXZCLENBQXRCO0FBQ0EsV0FBS3dYLGNBQUwsQ0FBb0J2WSxZQUFwQixDQUFpQyxNQUFqQyxFQUF5QyxTQUF6QztBQUNBLFdBQUt1WSxjQUFMLENBQW9CdlgsU0FBcEIsR0FBZ0MsVUFBaEM7O0FBRUEsVUFBTXlYLGFBQWEzWCxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQW5CO0FBQ0EwWCxpQkFBV3BZLFdBQVgsQ0FBdUIsS0FBS2tZLGNBQTVCOztBQUVBLFVBQU1wWCxRQUFRTCxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQWQ7QUFDQUksWUFBTUgsU0FBTixHQUFrQixZQUFsQjtBQUNBRyxZQUFNRixTQUFOLEdBQWtCLHNCQUFsQjs7QUFFQSxVQUFNaVgsT0FBT3BYLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBbVgsV0FBS2xYLFNBQUwsR0FBaUIsTUFBakI7QUFDQWtYLFdBQUs3WCxXQUFMLENBQWlCYyxLQUFqQjtBQUNBK1csV0FBSzdYLFdBQUwsQ0FBaUJvWSxVQUFqQjs7QUFFQSxhQUFPUCxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OzhDQUswQjtBQUFBOztBQUN4QjtBQUNBLFVBQU1RLGFBQWE1WCxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQW5CO0FBQ0EyWCxpQkFBVzFYLFNBQVgsR0FBdUIsbUNBQXZCO0FBQ0EwWCxpQkFBVzFZLFlBQVgsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBaEM7QUFDQTBZLGlCQUFXMVksWUFBWCxDQUF3QixhQUF4QixFQUF1QywwQkFBdkM7QUFDQTBZLGlCQUFXdFYsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsaUJBQVM7QUFDNUMsZUFBSy9ELElBQUwsQ0FBVSxRQUFWLEVBQW9CO0FBQ2xCOEQsbUJBQVM3RCxNQUFNdUUsTUFERztBQUVsQnFMLGlCQUFPNVAsTUFBTXVFLE1BQU4sQ0FBYXZGO0FBRkYsU0FBcEI7QUFJRCxPQUxEOztBQU9BO0FBQ0EsVUFBTXFhLGNBQWM3WCxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQXBCO0FBQ0E0WCxrQkFBWTNYLFNBQVosR0FBd0IsK0JBQXhCOztBQUVBO0FBQ0EsVUFBTW9YLGFBQWF0WCxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQW5CO0FBQ0FxWCxpQkFBV3BYLFNBQVgsR0FBdUIsYUFBdkI7QUFDQW9YLGlCQUFXL1gsV0FBWCxDQUF1QnFZLFVBQXZCO0FBQ0FOLGlCQUFXL1gsV0FBWCxDQUF1QnNZLFdBQXZCOztBQUVBLGFBQU9QLFVBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7aUNBS2E7QUFDWCxhQUFPLEtBQUtyQyxXQUFaO0FBQ0Q7Ozs7OztrQkFwSGtCa0Msa0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnJCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7SUFNcUJXLGtCO0FBQ25COzs7QUFHQSw4QkFBWXBVLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakI7QUFDQSxhQUFjLElBQWQsRUFBb0IseUJBQXBCOztBQUVBO0FBQ0EsU0FBS0csSUFBTCxHQUFZLHFDQUEyQkgsS0FBM0IsQ0FBWjs7QUFFQTtBQUNBLFNBQUtxVSxhQUFMLEdBQXFCLDRCQUFrQixFQUFFaFgsWUFBWTJDLE1BQU0zQyxVQUFwQixFQUFsQixDQUFyQjtBQUNBLFNBQUtpWCxlQUFMLEdBQXVCLCtCQUF2QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCLGdDQUFzQixFQUFFbFgsWUFBWTJDLE1BQU0zQyxVQUFwQixFQUF0QixDQUF6Qjs7QUFFQTtBQUNBLEtBQUMsa0JBQUQsRUFBcUIsUUFBckIsRUFBK0IsY0FBL0IsRUFBK0MsYUFBL0MsRUFDRzdELE9BREgsQ0FDVztBQUFBLGFBQVksTUFBSzJHLElBQUwsQ0FBVXFVLFdBQVYsQ0FBc0JDLFFBQXRCLENBQVo7QUFBQSxLQURYOztBQUdBO0FBQ0EsUUFBTUMsVUFBVXBZLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQW1ZLFlBQVFDLFNBQVIsQ0FBa0I1UyxHQUFsQixDQUFzQixzQkFBdEI7O0FBRUEsU0FBS3dQLFdBQUwsR0FBbUJtRCxPQUFuQjtBQUNBLFNBQUtuRCxXQUFMLENBQWlCMVYsV0FBakIsQ0FBNkIsS0FBS3lZLGVBQUwsQ0FBcUJ2VCxVQUFyQixFQUE3QjtBQUNBLFNBQUt3USxXQUFMLENBQWlCMVYsV0FBakIsQ0FBNkIsS0FBSzBZLGlCQUFMLENBQXVCeFQsVUFBdkIsRUFBN0I7O0FBRUEsU0FBS1osSUFBTCxDQUFVWSxVQUFWLEdBQXVCbEYsV0FBdkIsQ0FBbUMsS0FBSzBWLFdBQXhDOztBQUVBO0FBQ0EsU0FBS3RXLFNBQUwsQ0FBZSxDQUFDLFFBQUQsRUFBVywwQkFBWCxDQUFmLEVBQXVELEtBQUtxWixlQUE1RDtBQUNBLFNBQUtyWixTQUFMLENBQWUsQ0FBQyxRQUFELENBQWYsRUFBMkIsS0FBS3NaLGlCQUFoQzs7QUFFQTtBQUNBLFNBQUtwVSxJQUFMLENBQVU1RixFQUFWLENBQWEsUUFBYixFQUF1QixLQUFLa1EsTUFBNUIsRUFBb0MsSUFBcEM7QUFDQSxTQUFLdEssSUFBTCxDQUFVNUYsRUFBVixDQUFhLGVBQWIsRUFBOEIsS0FBS3FhLGlCQUFuQyxFQUFzRCxJQUF0RDtBQUNBLFNBQUtOLGVBQUwsQ0FBcUIvWixFQUFyQixDQUF3QixjQUF4QixFQUF3QyxLQUFLc2EsY0FBN0MsRUFBNkQsSUFBN0Q7QUFDQSxTQUFLTixpQkFBTCxDQUF1QmhhLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLEtBQUt1YSxlQUF4QyxFQUF5RCxJQUF6RDs7QUFFQSxTQUFLQyxtQkFBTDtBQUNEOztBQUVEOzs7Ozs7OzBDQUdzQjtBQUFBOztBQUNwQjtBQUNBLFdBQUtWLGFBQUwsQ0FBbUI1SixNQUFuQixDQUEwQixFQUExQixFQUNHOU0sSUFESCxDQUNRO0FBQUEsZUFBZ0IsT0FBSzJXLGVBQUwsQ0FBcUJySyxNQUFyQixDQUE0QjNMLFlBQTVCLENBQWhCO0FBQUEsT0FEUixFQUVHMFcsS0FGSCxDQUVTO0FBQUEsZUFBUyxPQUFLbmEsSUFBTCxDQUFVLE9BQVYsRUFBbUJvYSxLQUFuQixDQUFUO0FBQUEsT0FGVDtBQUdEOztBQUVEOzs7Ozs7OztpQ0FLZ0I7QUFBQTs7QUFBQSxVQUFSdkssS0FBUSxRQUFSQSxLQUFROztBQUNkLFdBQUsySixhQUFMLENBQW1CNUosTUFBbkIsQ0FBMEJDLEtBQTFCLEVBQ0cvTSxJQURILENBQ1E7QUFBQSxlQUFnQixPQUFLMlcsZUFBTCxDQUFxQnJLLE1BQXJCLENBQTRCM0wsWUFBNUIsQ0FBaEI7QUFBQSxPQURSO0FBRUQ7O0FBRUQ7Ozs7Ozt3Q0FHb0I7QUFDbEJwQixjQUFRaVYsS0FBUixDQUFjLHVDQUFkLEVBQXVEclgsS0FBdkQ7QUFDRDs7QUFFRDs7Ozs7Ozs7MENBS3FCO0FBQUEsVUFBTDBELEVBQUssU0FBTEEsRUFBSzs7QUFDbkIsV0FBSzhWLGVBQUwsQ0FBcUJ0VixJQUFyQjtBQUNBLFdBQUt1VixpQkFBTCxDQUF1QlcsUUFBdkIsQ0FBZ0MxVyxFQUFoQztBQUNBLFdBQUsrVixpQkFBTCxDQUF1QnRWLElBQXZCO0FBQ0Q7O0FBR0Q7Ozs7OztzQ0FHa0I7QUFDaEIsV0FBS3NWLGlCQUFMLENBQXVCdlYsSUFBdkI7QUFDQSxXQUFLc1YsZUFBTCxDQUFxQnJWLElBQXJCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O2lDQUthO0FBQ1gsYUFBTyxLQUFLa0IsSUFBTCxDQUFVWSxVQUFWLEVBQVA7QUFDRDs7Ozs7O2tCQWpHa0JxVCxrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNickI7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFDQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7O0FBR0EsSUFBTWUsb0JBQW9CLFNBQTFCOztBQUVBOzs7QUFHQSxJQUFNQyxTQUFTLDRCQUFhLE1BQWIsQ0FBZjs7QUFFQTs7Ozs7O0lBS3FCQyxPO0FBQ25COzs7QUFHQSxtQkFBWXJWLEtBQVosRUFBbUI7QUFBQTs7QUFDakI7QUFDQSxhQUFjLElBQWQsRUFBb0IseUJBQXBCOztBQUVBLFNBQUtzVixjQUFMLENBQW9CdFYsS0FBcEI7QUFDQSxTQUFLdVYsV0FBTCxDQUFpQnZWLEtBQWpCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7aUNBR2E7QUFDWCxXQUFLckQsS0FBTCxDQUFXbkIsWUFBWCxDQUF3QixlQUF4QixFQUF5QyxPQUF6QztBQUNEOztBQUVEOzs7Ozs7Ozs2QkFLU21CLEssRUFBTztBQUNkLFdBQUtBLEtBQUwsQ0FBV0YsU0FBWCxHQUF1QkUsS0FBdkI7QUFDRDs7QUFFRDs7Ozs7Ozs7OztzQ0FPeUU7QUFBQSw0QkFBNURBLEtBQTREO0FBQUEsVUFBNURBLEtBQTRELDhCQUFwRCxFQUFvRDtBQUFBLGdDQUFoRDZZLFNBQWdEO0FBQUEsVUFBaERBLFNBQWdELGtDQUFwQyxlQUFvQztBQUFBLCtCQUFuQkMsUUFBbUI7QUFBQSxVQUFuQkEsUUFBbUIsaUNBQVIsS0FBUTs7QUFDdkU7OztBQUdBLFdBQUs5WSxLQUFMLEdBQWFMLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBLFdBQUtJLEtBQUwsQ0FBV0gsU0FBWCxJQUF3Qiw0QkFBeEI7QUFDQSxXQUFLRyxLQUFMLENBQVduQixZQUFYLENBQXdCLGVBQXhCLEVBQXlDLENBQUMsQ0FBQyxDQUFDaWEsUUFBSCxFQUFhcmIsUUFBYixFQUF6QztBQUNBLFdBQUt1QyxLQUFMLENBQVduQixZQUFYLENBQXdCLGVBQXhCLGtCQUF1RGdhLFNBQXZEO0FBQ0EsV0FBSzdZLEtBQUwsQ0FBV0YsU0FBWCxHQUF1QkUsS0FBdkI7QUFDQSxxQ0FBa0IsY0FBbEIsRUFBa0MsSUFBbEMsRUFBd0MsS0FBS0EsS0FBN0M7O0FBRUE7OztBQUdBLFdBQUs4QixJQUFMLEdBQVluQyxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQSxXQUFLa0MsSUFBTCxDQUFVakMsU0FBVixJQUF1QixZQUF2QjtBQUNBLFdBQUtpQyxJQUFMLENBQVVqRCxZQUFWLENBQXVCLGFBQXZCLEVBQXNDLENBQUMsQ0FBQ2lhLFFBQUYsRUFBWXJiLFFBQVosRUFBdEM7QUFDQSxXQUFLcUUsSUFBTCxDQUFVRCxFQUFWLG1CQUE2QmdYLFNBQTdCO0FBQ0EsV0FBSy9XLElBQUwsQ0FBVTVDLFdBQVYsQ0FBc0IsS0FBSzZaLG1CQUEzQjs7QUFFQTs7O0FBR0EsV0FBS0MsS0FBTCxHQUFhclosU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBQ0EsV0FBS29aLEtBQUwsQ0FBV25aLFNBQVgsMkJBQTZDZ1osU0FBN0M7QUFDQSxVQUFHQyxRQUFILEVBQVk7QUFDVixhQUFLRSxLQUFMLENBQVduYSxZQUFYLENBQXdCLE1BQXhCLEVBQWdDLEVBQWhDO0FBQ0Q7QUFDRCxXQUFLbWEsS0FBTCxDQUFXOVosV0FBWCxDQUF1QixLQUFLYyxLQUE1QjtBQUNBLFdBQUtnWixLQUFMLENBQVc5WixXQUFYLENBQXVCLEtBQUs0QyxJQUE1QjtBQUNBOzs7QUFHQSxXQUFLOFMsV0FBTCxHQUFtQmpWLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbkI7QUFDQSxXQUFLZ1YsV0FBTCxDQUFpQi9VLFNBQWpCO0FBQ0EsV0FBSytVLFdBQUwsQ0FBaUIxVixXQUFqQixDQUE2QixLQUFLOFosS0FBbEM7QUFDRDs7QUFFRDs7Ozs7OztzQ0FJaUI7QUFDZiwyQkFBVSxLQUFLcEUsV0FBZjtBQUNEOztBQUVEOzs7Ozs7c0NBR2tCO0FBQ2hCLFVBQUc2RCxPQUFPLEtBQUtPLEtBQVosQ0FBSCxFQUF1QjtBQUNyQixhQUFLQSxLQUFMLENBQVdsYSxlQUFYLENBQTJCLE1BQTNCO0FBQ0QsT0FGRCxNQUdLO0FBQ0gsYUFBS2thLEtBQUwsQ0FBV25hLFlBQVgsQ0FBd0IsTUFBeEIsRUFBZ0MsRUFBaEM7QUFDRDtBQUNGOztBQUVEOzs7Ozs7bUNBR2V3RSxLLEVBQU87QUFDcEI7OztBQUdBLFdBQUs0VixPQUFMLEdBQWV0WixTQUFTQyxhQUFULENBQXVCLElBQXZCLENBQWY7QUFDQSxXQUFLcVosT0FBTCxDQUFhcFosU0FBYixJQUEwQixTQUExQjtBQUNBLFdBQUtvWixPQUFMLENBQWFwYSxZQUFiLENBQTJCLE1BQTNCLEVBQW1DLFNBQW5DOztBQUVBOzs7QUFHQSxXQUFLcWEsY0FBTCxHQUFzQnZaLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdEI7QUFDQSxXQUFLc1osY0FBTCxDQUFvQmhhLFdBQXBCLENBQWdDLEtBQUsrWixPQUFyQzs7QUFFQTs7O0FBR0EsV0FBS0YsbUJBQUwsR0FBMkJwWixTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQTNCO0FBQ0EsV0FBS21aLG1CQUFMLENBQXlCbFosU0FBekIsSUFBc0MsV0FBdEM7QUFDQSxXQUFLa1osbUJBQUwsQ0FBeUI3WixXQUF6QixDQUFxQyxLQUFLZ2EsY0FBMUM7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7a0NBUStDO0FBQUEsVUFBdkNsWixLQUF1QyxTQUF2Q0EsS0FBdUM7QUFBQSxVQUFoQzZCLEVBQWdDLFNBQWhDQSxFQUFnQztBQUFBLFVBQTVCNUIsT0FBNEIsU0FBNUJBLE9BQTRCO0FBQUEsaUNBQW5Cb0UsUUFBbUI7QUFBQSxVQUFuQkEsUUFBbUIsa0NBQVIsS0FBUTs7QUFDN0MsVUFBTThVLGlCQUFldFgsRUFBckI7QUFDQSxVQUFNaUQsNEJBQTBCakQsRUFBaEM7O0FBRUEsVUFBTWdELE1BQU1sRixTQUFTQyxhQUFULENBQXVCLElBQXZCLENBQVo7QUFDQWlGLFVBQUloRixTQUFKLElBQWlCLEtBQWpCO0FBQ0FnRixVQUFJaEQsRUFBSixHQUFTc1gsS0FBVDtBQUNBdFUsVUFBSWhHLFlBQUosQ0FBaUIsZUFBakIsRUFBa0NpRyxVQUFsQztBQUNBRCxVQUFJaEcsWUFBSixDQUFpQixlQUFqQixFQUFrQ3dGLFNBQVM1RyxRQUFULEVBQWxDO0FBQ0FvSCxVQUFJaEcsWUFBSixDQUFpQjJaLGlCQUFqQixFQUFvQzNXLEVBQXBDO0FBQ0FnRCxVQUFJaEcsWUFBSixDQUFpQixNQUFqQixFQUF5QixLQUF6QjtBQUNBZ0csVUFBSS9FLFNBQUosR0FBZ0JFLEtBQWhCO0FBQ0EscUNBQWtCLFlBQWxCLEVBQWdDLElBQWhDLEVBQXNDNkUsR0FBdEM7O0FBRUEsVUFBTXVVLFdBQVd6WixTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0FBQ0F3WixlQUFTdlgsRUFBVCxHQUFjaUQsVUFBZDtBQUNBc1UsZUFBU3ZaLFNBQVQsSUFBc0IsVUFBdEI7QUFDQXVaLGVBQVN2YSxZQUFULENBQXNCLGdCQUF0QixFQUF3Q3NhLEtBQXhDO0FBQ0FDLGVBQVN2YSxZQUFULENBQXNCLGFBQXRCLEVBQXFDLENBQUMsQ0FBQ3dGLFFBQUYsRUFBWTVHLFFBQVosRUFBckM7QUFDQTJiLGVBQVN2YSxZQUFULENBQXNCLE1BQXRCLEVBQThCLFVBQTlCO0FBQ0F1YSxlQUFTbGEsV0FBVCxDQUFxQmUsT0FBckI7O0FBRUEsV0FBS2daLE9BQUwsQ0FBYS9aLFdBQWIsQ0FBeUIyRixHQUF6QjtBQUNBLFdBQUtrVSxtQkFBTCxDQUF5QjdaLFdBQXpCLENBQXFDa2EsUUFBckM7QUFDRDs7QUFFRDs7Ozs7O3NDQUdrQjtBQUNoQixXQUFLSCxPQUFMLENBQWEvWixXQUFiLENBQXlCUyxTQUFTQyxhQUFULENBQXVCLE1BQXZCLENBQXpCO0FBQ0Q7OzttQ0FFYztBQUNiLDhCQUFhLEtBQUttWixtQkFBbEI7QUFDRDs7QUFFRDs7Ozs7Ozs7MENBS3FCO0FBQUEsVUFBTGxYLEVBQUssU0FBTEEsRUFBSzs7QUFDbkIsV0FBS21YLEtBQUwsQ0FBV25aLFNBQVgsb0JBQXNDZ0MsRUFBdEM7QUFDRDs7QUFFRDs7Ozs7Ozs7aUNBS2E7QUFDWCxhQUFPLEtBQUsrUyxXQUFaO0FBQ0Q7Ozs7OztrQkFuTGtCOEQsTzs7Ozs7Ozs7Ozs7Ozs7O0FDL0JyQjs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7Ozs7SUFNcUJXLGE7QUFDbkI7Ozs7QUFJQSx5QkFBWWhXLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsU0FBS0ksUUFBTCxHQUFnQiwwQkFBZ0I7QUFDOUIvQyxrQkFBWTJDLE1BQU0zQztBQURZLEtBQWhCLENBQWhCOztBQUlBO0FBQ0EsU0FBSzRZLEtBQUwsR0FBYSxvQkFBSyxZQUFXO0FBQzNCLFdBQUtqTixLQUFMLENBQVcsT0FBWCxFQUFvQixFQUFDRyxPQUFPLEVBQVIsRUFBcEIsRUFEMkIsQ0FDTztBQUNsQyxXQUFLSCxLQUFMLENBQVcsU0FBWDtBQUNBLFdBQUtBLEtBQUwsQ0FBVyxhQUFYO0FBQ0EsV0FBS0EsS0FBTCxDQUFXLFVBQVg7QUFDQSxXQUFLRCxHQUFMLENBQVMsSUFBVCxFQUwyQixDQUtYO0FBQ2pCLEtBTlksQ0FBYjs7QUFRQTtBQUNBLFNBQUt6SyxZQUFMLEdBQW9CLEtBQUs4QixRQUFMLENBQWM5QixZQUFkLEdBQ2pCWCxJQURpQixDQUNaLHFCQUFJdVksV0FBVyxLQUFLRCxLQUFoQixDQUFKLENBRFksQ0FBcEI7QUFFRDs7QUFFRDs7Ozs7Ozs7Ozs7MkJBT092TCxLLEVBQU87QUFBQTs7QUFDWjtBQUNBLFVBQUlBLFVBQVUsRUFBZCxFQUFrQjtBQUNoQixlQUFPLEtBQUtwTSxZQUFaO0FBQ0Q7O0FBRUQ7QUFDQSxhQUFPLEtBQUtBLFlBQUwsQ0FBa0JYLElBQWxCLENBQXVCLHdCQUFnQjtBQUM1QyxlQUFPLE1BQUtzWSxLQUFMLENBQVd4TCxNQUFYLENBQWtCQyxLQUFsQixFQUNKaFIsR0FESSxDQUNBO0FBQUEsaUJBQVVrRSxPQUFPbUwsR0FBakI7QUFBQSxTQURBLEVBRUpyUCxHQUZJLENBRUF5Yyw2QkFBNkI3WCxZQUE3QixDQUZBLENBQVA7QUFHRCxPQUpNLENBQVA7QUFLRDs7Ozs7O0FBR0g7Ozs7Ozs7Ozs7OztrQkE5Q3FCMFgsYTtBQXdEckIsSUFBTUUsYUFBYSx1QkFBTSxVQUFDRCxLQUFELEVBQVExWCxXQUFSLEVBQXdCO0FBQy9DMFgsUUFBTWxVLEdBQU4sQ0FBVTtBQUNScEYsV0FBTzRCLFlBQVk1QixLQURYO0FBRVIwVyxhQUFTOVUsWUFBWThVLE9BRmI7QUFHUjNDLGlCQUFhblMsWUFBWW1TLFdBSGpCO0FBSVIwRixjQUFVN1gsWUFBWTZYLFFBSmQ7QUFLUjVYLFFBQUlELFlBQVlGO0FBTFIsR0FBVjs7QUFRQSxTQUFPRSxXQUFQO0FBQ0QsQ0FWa0IsQ0FBbkI7O0FBWUE7Ozs7Ozs7QUFPQSxJQUFNNFgsK0JBQStCLHVCQUFNLFVBQVM3WCxZQUFULEVBQXVCRCxXQUF2QixFQUFvQztBQUM3RSxTQUFPQyxhQUFhM0UsTUFBYixDQUFvQjtBQUFBLFdBQWU0RSxZQUFZRixXQUFaLEtBQTRCQSxXQUEzQztBQUFBLEdBQXBCLEVBQTRFLENBQTVFLENBQVA7QUFDRCxDQUZvQyxDQUFyQyxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JGQTs7O0lBR3FCZ1ksYTs7Ozs7OztpQ0FDTjtBQUNYLFVBQU0xWCxVQUFVckMsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBb0MsY0FBUWxDLFNBQVIsR0FBb0IsYUFBcEI7QUFDQSxhQUFPa0MsT0FBUDtBQUNEOzs7Ozs7a0JBTGtCMFgsYTs7Ozs7Ozs7O0FDSHJCLG1CQUFBQyxDQUFRLENBQVI7O0FBRUE7QUFDQUMsTUFBTUEsT0FBTyxFQUFiO0FBQ0FBLElBQUlDLFNBQUosR0FBZ0IsbUJBQUFGLENBQVEsQ0FBUixFQUEwQkcsT0FBMUM7QUFDQUYsSUFBSUMsU0FBSixDQUFjcmEsa0JBQWQsR0FBbUMsbUJBQUFtYSxDQUFRLENBQVIsRUFBbUNHLE9BQXRFLEMiLCJmaWxlIjoiaDVwLWh1Yi1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzkxNzRkN2ZkNGI5Nzg2YzE1MWIiLCIvKipcbiAqIFJldHVybnMgYSBjdXJyaWVkIHZlcnNpb24gb2YgYSBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKlxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY3VycnkgPSBmdW5jdGlvbihmbikge1xuICBjb25zdCBhcml0eSA9IGZuLmxlbmd0aDtcblxuICByZXR1cm4gZnVuY3Rpb24gZjEoKSB7XG4gICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID49IGFyaXR5KSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGYyKCkge1xuICAgICAgICBjb25zdCBhcmdzMiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgIHJldHVybiBmMS5hcHBseShudWxsLCBhcmdzLmNvbmNhdChhcmdzMikpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICogQ29tcG9zZSBmdW5jdGlvbnMgdG9nZXRoZXIsIGV4ZWN1dGluZyBmcm9tIHJpZ2h0IHRvIGxlZnRcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uLi4ufSBmbnNcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXBvc2UgPSAoLi4uZm5zKSA9PiBmbnMucmVkdWNlKChmLCBnKSA9PiAoLi4uYXJncykgPT4gZihnKC4uLmFyZ3MpKSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggZWxlbWVudCBpbiBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZvckVhY2ggPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICBhcnIuZm9yRWFjaChmbik7XG59KTtcblxuLyoqXG4gKiBNYXBzIGEgZnVuY3Rpb24gdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBtYXAgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLm1hcChmbik7XG59KTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgZmlsdGVyIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZmlsdGVyID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5maWx0ZXIoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIHNvbWUgdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBzb21lID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5zb21lKGZuKTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhbiBhcnJheSBjb250YWlucyBhIHZhbHVlXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb250YWlucyA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZSwgYXJyKSB7XG4gIHJldHVybiBhcnIuaW5kZXhPZih2YWx1ZSkgIT0gLTE7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IHdpdGhvdXQgdGhlIHN1cHBsaWVkIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlc1xuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCB3aXRob3V0ID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlcywgYXJyKSB7XG4gIHJldHVybiBmaWx0ZXIodmFsdWUgPT4gIWNvbnRhaW5zKHZhbHVlLCB2YWx1ZXMpLCBhcnIpXG59KTtcblxuLyoqXG4gKiBUYWtlcyBhIHN0cmluZyB0aGF0IGlzIGVpdGhlciAndHJ1ZScgb3IgJ2ZhbHNlJyBhbmQgcmV0dXJucyB0aGUgb3Bwb3NpdGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYm9vbFxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGludmVyc2VCb29sZWFuU3RyaW5nID0gZnVuY3Rpb24gKGJvb2wpIHtcbiAgcmV0dXJuIChib29sICE9PSAndHJ1ZScpLnRvU3RyaW5nKCk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9mdW5jdGlvbmFsLmpzIiwiLyoqXG4gKiBAbWl4aW5cbiAqL1xuZXhwb3J0IGNvbnN0IEV2ZW50ZnVsID0gKCkgPT4gKHtcbiAgbGlzdGVuZXJzOiB7fSxcblxuICAvKipcbiAgICogTGlzdGVuIHRvIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbc2NvcGVdXG4gICAqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtFdmVudGZ1bH1cbiAgICovXG4gIG9uOiBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgc2NvcGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZWRlZiB7b2JqZWN0fSBUcmlnZ2VyXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2NvcGVcbiAgICAgKi9cbiAgICBjb25zdCB0cmlnZ2VyID0ge1xuICAgICAgJ2xpc3RlbmVyJzogbGlzdGVuZXIsXG4gICAgICAnc2NvcGUnOiBzY29wZVxuICAgIH07XG5cbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2godHJpZ2dlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogRmlyZSBldmVudC4gSWYgYW55IG9mIHRoZSBsaXN0ZW5lcnMgcmV0dXJucyBmYWxzZSwgcmV0dXJuIGZhbHNlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZXZlbnRdXG4gICAqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgZmlyZTogZnVuY3Rpb24odHlwZSwgZXZlbnQpIHtcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuXG4gICAgcmV0dXJuIHRyaWdnZXJzLmV2ZXJ5KGZ1bmN0aW9uKHRyaWdnZXIpIHtcbiAgICAgIHJldHVybiB0cmlnZ2VyLmxpc3RlbmVyLmNhbGwodHJpZ2dlci5zY29wZSB8fCB0aGlzLCBldmVudCkgIT09IGZhbHNlO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIGZvciBldmVudHMgb24gYW5vdGhlciBFdmVudGZ1bCwgYW5kIHByb3BhZ2F0ZSBpdCB0cm91Z2ggdGhpcyBFdmVudGZ1bFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB0eXBlc1xuICAgKiBAcGFyYW0ge0V2ZW50ZnVsfSBldmVudGZ1bFxuICAgKi9cbiAgcHJvcGFnYXRlOiBmdW5jdGlvbih0eXBlcywgZXZlbnRmdWwpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgdHlwZXMuZm9yRWFjaCh0eXBlID0+IGV2ZW50ZnVsLm9uKHR5cGUsIGV2ZW50ID0+IHNlbGYuZmlyZSh0eXBlLCBldmVudCkpKTtcbiAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwiaW1wb3J0IHtjdXJyeSwgaW52ZXJzZUJvb2xlYW5TdHJpbmd9IGZyb20gJy4vZnVuY3Rpb25hbCdcblxuLyoqXG4gKiBHZXQgYW4gYXR0cmlidXRlIHZhbHVlIGZyb20gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0QXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIGVsKSB7XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUobmFtZSk7XG59KTtcblxuLyoqXG4gKiBTZXQgYW4gYXR0cmlidXRlIG9uIGEgaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHNldEF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZWwpIHtcbiAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBhdHRyaWJ1dGUgZnJvbSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xuICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG59KTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBoYXNBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcbiAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZShuYW1lKTtcbn0pO1xuXG4vKipcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZSB0aGF0IGVxdWFsc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgYXR0cmlidXRlRXF1YWxzID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBlbCkge1xuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpID09PSB2YWx1ZTtcbn0pO1xuXG4vKipcbiAqIFRvZ2dsZXMgYW4gYXR0cmlidXRlIGJldHdlZW4gJ3RydWUnIGFuZCAnZmFsc2UnO1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlQXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIGVsKSB7XG4gIGNvbnN0IHZhbHVlID0gZ2V0QXR0cmlidXRlKG5hbWUsIGVsKTtcbiAgc2V0QXR0cmlidXRlKG5hbWUsIGludmVyc2VCb29sZWFuU3RyaW5nKHZhbHVlKSwgZWwpO1xufSk7XG5cbi8qKlxuICogVGhlIGFwcGVuZENoaWxkKCkgbWV0aG9kIGFkZHMgYSBub2RlIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3Qgb2YgY2hpbGRyZW4gb2YgYSBzcGVjaWZpZWQgcGFyZW50IG5vZGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjaGlsZFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBhcHBlbmRDaGlsZCA9IGN1cnJ5KGZ1bmN0aW9uIChwYXJlbnQsIGNoaWxkKSB7XG4gIHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIGEgZGVzY2VuZGFudCBvZiB0aGUgZWxlbWVudCBvbiB3aGljaCBpdCBpcyBpbnZva2VkXG4gKiB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yID0gY3VycnkoZnVuY3Rpb24gKHNlbGVjdG9yLCBlbCkge1xuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbm9uLWxpdmUgTm9kZUxpc3Qgb2YgYWxsIGVsZW1lbnRzIGRlc2NlbmRlZCBmcm9tIHRoZSBlbGVtZW50IG9uIHdoaWNoIGl0XG4gKiBpcyBpbnZva2VkIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIENTUyBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Tm9kZUxpc3R9XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yQWxsID0gY3VycnkoZnVuY3Rpb24gKHNlbGVjdG9yLCBlbCkge1xuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCIvKipcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcudHlwZSAgICAgICAgIHR5cGUgb2YgdGhlIG1lc3NhZ2U6IGluZm8sIHN1Y2Nlc3MsIGVycm9yXG4gKiBAcGFyYW0gIHtib29sZWFufSAgY29uZmlnLmRpc21pc3NpYmxlICB3aGV0aGVyIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNtaXNzZWRcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcuY29udGVudCAgICAgIG1lc3NhZ2UgY29udGVudCB1c3VhbGx5IGEgJ2gzJyBhbmQgYSAncCdcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBkaXYgY29udGFpbmluZyB0aGUgbWVzc2FnZSBlbGVtZW50XG4gKi9cblxuLy9UT0RPIGhhbmRsZSBzdHJpbmdzLCBodG1sLCBiYWRseSBmb3JtZWQgb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJFcnJvck1lc3NhZ2UobWVzc2FnZSkge1xuICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2Nsb3NlJztcbiAgY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyYjeDI3MTUnO1xuXG4gIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VDb250ZW50LmNsYXNzTmFtZSA9ICdtZXNzYWdlLWNvbnRlbnQnO1xuICBtZXNzYWdlQ29udGVudC5pbm5lckhUTUwgPSAnPGgxPicgKyBtZXNzYWdlLnRpdGxlICsgJzwvaDE+JyArICc8cD4nICsgbWVzc2FnZS5jb250ZW50ICsgJzwvcD4nO1xuXG4gIGNvbnN0IG1lc3NhZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VXcmFwcGVyLmNsYXNzTmFtZSA9ICdtZXNzYWdlJyArICcgJyArIGAke21lc3NhZ2UudHlwZX1gICsgKG1lc3NhZ2UuZGlzbWlzc2libGUgPyAnIGRpc21pc3NpYmxlJyA6ICcnKTtcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGVudCk7XG5cbiAgaWYgKG1lc3NhZ2UuYnV0dG9uICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBtZXNzYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbWVzc2FnZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcbiAgICBtZXNzYWdlQnV0dG9uLmlubmVySFRNTCA9IG1lc3NhZ2UuYnV0dG9uO1xuICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VCdXR0b24pO1xuICB9XG5cbiAgY29uc29sZS5sb2cobWVzc2FnZVdyYXBwZXIpO1xuICByZXR1cm4gbWVzc2FnZVdyYXBwZXI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXJyb3JzLmpzIiwiLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBDb250ZW50VHlwZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFqb3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWlub3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGF0Y2hWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWFqb3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWlub3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3VtbWFyeVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNyZWF0ZWRBdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHVwZGF0ZWRfQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpc1JlY29tbWVuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9wdWxhcml0eVxuICogQHByb3BlcnR5IHtvYmplY3RbXX0gc2NyZWVuc2hvdHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsaWNlbnNlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXhhbXBsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHR1dG9yaWFsXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBrZXl3b3Jkc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG93bmVyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGluc3RhbGxlZFxuICogQHByb3BlcnR5IHtib29sZWFufSByZXN0cmljdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlNlcnZpY2VzIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcGlSb290VXJsXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7IGFwaVJvb3RVcmwgfSkge1xuICAgIHRoaXMuYXBpUm9vdFVybCA9IGFwaVJvb3RVcmw7XG5cbiAgICBpZighd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyl7XG4gICAgICAvLyBUT0RPIHJlbW92ZSB0aGlzIHdoZW4gZG9uZSB0ZXN0aW5nIGZvciBlcnJvcnNcbiAgICAgIC8vIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMgPSBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9ZXJyb3JzL05PX1JFU1BPTlNFLmpzb25gLCB7XG5cbiAgICAgIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMgPSBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9Y29udGVudC10eXBlLWNhY2hlYCwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgICAudGhlbih0aGlzLmlzVmFsaWQpXG4gICAgICAudGhlbihqc29uID0+IGpzb24ubGlicmFyaWVzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtICB7Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2V9IHJlc3BvbnNlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2U+fVxuICAgKi9cbiAgaXNWYWxpZChyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZS5tZXNzYWdlQ29kZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZVtdPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlcygpIHtcbiAgICByZXR1cm4gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgQ29udGVudCBUeXBlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBjb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xuICAgIHJldHVybiB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzLnRoZW4oY29udGVudFR5cGVzID0+IHtcbiAgICAgIHJldHVybiBjb250ZW50VHlwZXMuZmlsdGVyKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lID09PSBtYWNoaW5lTmFtZSlbMF07XG4gICAgfSk7XG5cbiAgICAvKnJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9Y29udGVudF90eXBlX2NhY2hlLyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTsqL1xuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbGxzIGEgY29udGVudCB0eXBlIG9uIHRoZSBzZXJ2ZXJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGluc3RhbGxDb250ZW50VHlwZShpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9bGlicmFyeS1pbnN0YWxsP2lkPSR7aWR9YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgYm9keTogJydcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuXG5leHBvcnQgY29uc3QgcmVsYXlDbGlja0V2ZW50QXMgPSBjdXJyeShmdW5jdGlvbih0eXBlLCBldmVudGZ1bCwgZWxlbWVudCkge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGV2ZW50ZnVsLmZpcmUodHlwZSwge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGlkOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gZG9uJ3QgYnViYmxlXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50O1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGUsIGF0dHJpYnV0ZUVxdWFscywgdG9nZ2xlQXR0cmlidXRlfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGlzRXhwYW5kZWQgPSBhdHRyaWJ1dGVFcXVhbHMoXCJhcmlhLWV4cGFuZGVkXCIsICd0cnVlJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgdGhlIGJvZHkgdmlzaWJpbGl0eVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJvZHlFbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzRXhwYW5kZWRcbiAqL1xuY29uc3QgdG9nZ2xlQm9keVZpc2liaWxpdHkgPSBmdW5jdGlvbihib2R5RWxlbWVudCwgaXNFeHBhbmRlZCkge1xuICBpZighaXNFeHBhbmRlZCkge1xuICAgIGhpZGUoYm9keUVsZW1lbnQpO1xuICAgIC8vYm9keUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XG4gIH1cbiAgZWxzZSAvKmlmKGJvZHlFbGVtZW50LnNjcm9sbEhlaWdodCA+IDApKi8ge1xuICAgIHNob3coYm9keUVsZW1lbnQpO1xuICAgIC8vYm9keUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7Ym9keUVsZW1lbnQuc2Nyb2xsSGVpZ2h0fXB4YDtcbiAgfVxufTtcblxuLyoqXG4gKiBIYW5kbGVzIGNoYW5nZXMgdG8gYXJpYS1leHBhbmRlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJvZHlFbGVtZW50XG4gKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSBldmVudFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBvbkFyaWFFeHBhbmRlZENoYW5nZSA9IGN1cnJ5KGZ1bmN0aW9uKGJvZHlFbGVtZW50LCBldmVudCkge1xuICB0b2dnbGVCb2R5VmlzaWJpbGl0eShib2R5RWxlbWVudCwgaXNFeHBhbmRlZChldmVudC50YXJnZXQpKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIGNvbnN0IHRpdGxlRWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWV4cGFuZGVkXScpO1xuICBjb25zdCBib2R5SWQgPSB0aXRsZUVsLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICBjb25zdCBib2R5RWwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvZHlJZH1gKTtcblxuICBpZih0aXRsZUVsKSB7XG4gICAgLy8gc2V0IG9ic2VydmVyIG9uIHRpdGxlIGZvciBhcmlhLWV4cGFuZGVkXG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZm9yRWFjaChvbkFyaWFFeHBhbmRlZENoYW5nZShib2R5RWwpKSk7XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKHRpdGxlRWwsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0ZUZpbHRlcjogW1wiYXJpYS1leHBhbmRlZFwiXVxuICAgIH0pO1xuXG4gICAgLy8gU2V0IGNsaWNrIGxpc3RlbmVyIHRoYXQgdG9nZ2xlcyBhcmlhLWV4cGFuZGVkXG4gICAgdGl0bGVFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB0b2dnbGVBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIGV2ZW50LnRhcmdldCk7XG4gICAgfSk7XG5cbiAgICB0b2dnbGVCb2R5VmlzaWJpbGl0eShib2R5RWwsIGlzRXhwYW5kZWQodGl0bGVFbCkpO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvcGFuZWwuanMiLCJpbXBvcnQgSHViVmlldyBmcm9tICcuL2h1Yi12aWV3JztcbmltcG9ydCBDb250ZW50VHlwZVNlY3Rpb24gZnJvbSAnLi9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbic7XG5pbXBvcnQgVXBsb2FkU2VjdGlvbiBmcm9tICcuL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uJztcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tICcuL2h1Yi1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7cmVuZGVyRXJyb3JNZXNzYWdlfSBmcm9tICcuL3V0aWxzL2Vycm9ycyc7XG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEh1YlN0YXRlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGl0bGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZXhwYW5kZWRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhcGlSb290VXJsXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gRXJyb3JNZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVycm9yQ29kZVxuICovXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFNlbGVjdGVkRWxlbWVudFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlkXG4gKi9cbi8qKlxuICogU2VsZWN0IGV2ZW50XG4gKiBAZXZlbnQgSHViI3NlbGVjdFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBFcnJvciBldmVudFxuICogQGV2ZW50IEh1YiNlcnJvclxuICogQHR5cGUge0Vycm9yTWVzc2FnZX1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBIdWIjZXJyb3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY29udHJvbGxlcnNcbiAgICB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbiA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb24oc3RhdGUpO1xuICAgIHRoaXMudXBsb2FkU2VjdGlvbiA9IG5ldyBVcGxvYWRTZWN0aW9uKHN0YXRlKTtcblxuICAgIC8vIHZpZXdzXG4gICAgdGhpcy52aWV3ID0gbmV3IEh1YlZpZXcoc3RhdGUpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIHByb3BhZ2F0ZSBjb250cm9sbGVyIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ2Vycm9yJ10sIHRoaXMuY29udGVudFR5cGVTZWN0aW9uKTtcblxuICAgIC8vIGhhbmRsZSBldmVudHNcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnNldFBhbmVsVGl0bGUsIHRoaXMpO1xuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMudmlldy5jbG9zZVBhbmVsLCB0aGlzLnZpZXcpO1xuICAgIC8vIG9ubHkgaW5pdGlhbGl6ZSB0aGUgbWFpbiBwYW5lbCBpZiBubyBlcnJvcnMgaGF2ZSBvY2N1cmVkIHdoZW4gdXBkYXRpbmcgdGhlIGNvbnRlbnQgdHlwZSBsaXN0XG4gICAgdGhpcy52aWV3Lm9uKCd0YWItY2hhbmdlJywgdGhpcy52aWV3LnNldFNlY3Rpb25UeXBlLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMudmlldy5vbigncGFuZWwtY2hhbmdlJywgdGhpcy52aWV3LnRvZ2dsZVBhbmVsT3Blbi5iaW5kKHRoaXMudmlldyksIHRoaXMudmlldyk7XG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24ub24oJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHRoaXMudmlldy5pbml0aWFsaXplUGFuZWwuYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xuXG4gICAgdGhpcy5pbml0VGFiUGFuZWwoKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBjb250ZW50IHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGdldENvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUobWFjaGluZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlIG9mIHRoZSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldFBhbmVsVGl0bGUoe2lkfSnCoHtcbiAgICB0aGlzLmdldENvbnRlbnRUeXBlKGlkKS50aGVuKCh7dGl0bGV9KSA9PiB0aGlzLnZpZXcuc2V0VGl0bGUodGl0bGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIHRhYiBwYW5lbFxuICAgKi9cbiAgaW5pdFRhYlBhbmVsKCkge1xuICAgIGNvbnN0IHRhYkNvbmZpZ3MgPSBbe1xuICAgICAgdGl0bGU6ICdDcmVhdGUgQ29udGVudCcsXG4gICAgICBpZDogJ2NvbnRlbnQtdHlwZXMnLFxuICAgICAgY29udGVudDogdGhpcy5jb250ZW50VHlwZVNlY3Rpb24uZ2V0RWxlbWVudCgpLFxuICAgICAgc2VsZWN0ZWQ6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnVXBsb2FkJyxcbiAgICAgIGlkOiAndXBsb2FkJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMudXBsb2FkU2VjdGlvbi5nZXRFbGVtZW50KClcbiAgICB9XTtcblxuICAgIHRhYkNvbmZpZ3MuZm9yRWFjaCh0YWJDb25maWcgPT4gdGhpcy52aWV3LmFkZFRhYih0YWJDb25maWcpKTtcbiAgICB0aGlzLnZpZXcuYWRkQm90dG9tQm9yZGVyKCk7IC8vIEFkZHMgYW4gYW5pbWF0ZWQgYm90dG9tIGJvcmRlciB0byBlYWNoIHRhYlxuICAgIHRoaXMudmlldy5pbml0VGFiUGFuZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWIuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Zm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBoaWRlQWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0YWJzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYlwiXScpO1xuICBjb25zdCB0YWJQYW5lbHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFicGFuZWxcIl0nKTtcblxuICB0YWJzLmZvckVhY2godGFiID0+IHtcbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgdW5TZWxlY3RBbGwodGFicyk7XG4gICAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcblxuICAgICAgaGlkZUFsbCh0YWJQYW5lbHMpO1xuXG4gICAgICBsZXQgdGFiUGFuZWxJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICAgIHNob3coZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0YWJQYW5lbElkfWApKTtcbiAgICB9KTtcbiAgfSlcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCIvKipcbiAqIGx1bnIgLSBodHRwOi8vbHVucmpzLmNvbSAtIEEgYml0IGxpa2UgU29sciwgYnV0IG11Y2ggc21hbGxlciBhbmQgbm90IGFzIGJyaWdodCAtIDEuMC4wXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG47KGZ1bmN0aW9uKCl7XG5cbi8qKlxuICogQ29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIGluc3RhbnRpYXRpbmcgYSBuZXcgbHVuciBpbmRleCBhbmQgY29uZmlndXJpbmcgaXRcbiAqIHdpdGggdGhlIGRlZmF1bHQgcGlwZWxpbmUgZnVuY3Rpb25zIGFuZCB0aGUgcGFzc2VkIGNvbmZpZyBmdW5jdGlvbi5cbiAqXG4gKiBXaGVuIHVzaW5nIHRoaXMgY29udmVuaWVuY2UgZnVuY3Rpb24gYSBuZXcgaW5kZXggd2lsbCBiZSBjcmVhdGVkIHdpdGggdGhlXG4gKiBmb2xsb3dpbmcgZnVuY3Rpb25zIGFscmVhZHkgaW4gdGhlIHBpcGVsaW5lOlxuICpcbiAqIGx1bnIuU3RvcFdvcmRGaWx0ZXIgLSBmaWx0ZXJzIG91dCBhbnkgc3RvcCB3b3JkcyBiZWZvcmUgdGhleSBlbnRlciB0aGVcbiAqIGluZGV4XG4gKlxuICogbHVuci5zdGVtbWVyIC0gc3RlbXMgdGhlIHRva2VucyBiZWZvcmUgZW50ZXJpbmcgdGhlIGluZGV4LlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIHZhciBpZHggPSBsdW5yKGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHRoaXMuZmllbGQoJ3RpdGxlJywgMTApXG4gKiAgICAgICB0aGlzLmZpZWxkKCd0YWdzJywgMTAwKVxuICogICAgICAgdGhpcy5maWVsZCgnYm9keScpXG4gKiAgICAgICBcbiAqICAgICAgIHRoaXMucmVmKCdjaWQnKVxuICogICAgICAgXG4gKiAgICAgICB0aGlzLnBpcGVsaW5lLmFkZChmdW5jdGlvbiAoKSB7XG4gKiAgICAgICAgIC8vIHNvbWUgY3VzdG9tIHBpcGVsaW5lIGZ1bmN0aW9uXG4gKiAgICAgICB9KVxuICogICAgICAgXG4gKiAgICAgfSlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maWcgQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIG5ldyBpbnN0YW5jZVxuICogb2YgdGhlIGx1bnIuSW5kZXggYXMgYm90aCBpdHMgY29udGV4dCBhbmQgZmlyc3QgcGFyYW1ldGVyLiBJdCBjYW4gYmUgdXNlZCB0b1xuICogY3VzdG9taXplIHRoZSBpbnN0YW5jZSBvZiBuZXcgbHVuci5JbmRleC5cbiAqIEBuYW1lc3BhY2VcbiAqIEBtb2R1bGVcbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICpcbiAqL1xudmFyIGx1bnIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHZhciBpZHggPSBuZXcgbHVuci5JbmRleFxuXG4gIGlkeC5waXBlbGluZS5hZGQoXG4gICAgbHVuci50cmltbWVyLFxuICAgIGx1bnIuc3RvcFdvcmRGaWx0ZXIsXG4gICAgbHVuci5zdGVtbWVyXG4gIClcblxuICBpZiAoY29uZmlnKSBjb25maWcuY2FsbChpZHgsIGlkeClcblxuICByZXR1cm4gaWR4XG59XG5cbmx1bnIudmVyc2lvbiA9IFwiMS4wLjBcIlxuLyohXG4gKiBsdW5yLnV0aWxzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBIG5hbWVzcGFjZSBjb250YWluaW5nIHV0aWxzIGZvciB0aGUgcmVzdCBvZiB0aGUgbHVuciBsaWJyYXJ5XG4gKi9cbmx1bnIudXRpbHMgPSB7fVxuXG4vKipcbiAqIFByaW50IGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBjb25zb2xlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGJlIHByaW50ZWQuXG4gKiBAbWVtYmVyT2YgVXRpbHNcbiAqL1xubHVuci51dGlscy53YXJuID0gKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgaWYgKGdsb2JhbC5jb25zb2xlICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpXG4gICAgfVxuICB9XG59KSh0aGlzKVxuXG4vKipcbiAqIENvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICpcbiAqIEluIHRoZSBjYXNlIG9mIGBudWxsYCBhbmQgYHVuZGVmaW5lZGAgdGhlIGZ1bmN0aW9uIHJldHVybnNcbiAqIHRoZSBlbXB0eSBzdHJpbmcsIGluIGFsbCBvdGhlciBjYXNlcyB0aGUgcmVzdWx0IG9mIGNhbGxpbmdcbiAqIGB0b1N0cmluZ2Agb24gdGhlIHBhc3NlZCBvYmplY3QgaXMgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtIHtBbnl9IG9iaiBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gYSBzdHJpbmcuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGFzc2VkIG9iamVjdC5cbiAqIEBtZW1iZXJPZiBVdGlsc1xuICovXG5sdW5yLnV0aWxzLmFzU3RyaW5nID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAob2JqID09PSB2b2lkIDAgfHwgb2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwiXCJcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqLnRvU3RyaW5nKClcbiAgfVxufVxuLyohXG4gKiBsdW5yLkV2ZW50RW1pdHRlclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5FdmVudEVtaXR0ZXIgaXMgYW4gZXZlbnQgZW1pdHRlciBmb3IgbHVuci4gSXQgbWFuYWdlcyBhZGRpbmcgYW5kIHJlbW92aW5nIGV2ZW50IGhhbmRsZXJzIGFuZCB0cmlnZ2VyaW5nIGV2ZW50cyBhbmQgdGhlaXIgaGFuZGxlcnMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmV2ZW50cyA9IHt9XG59XG5cbi8qKlxuICogQmluZHMgYSBoYW5kbGVyIGZ1bmN0aW9uIHRvIGEgc3BlY2lmaWMgZXZlbnQocykuXG4gKlxuICogQ2FuIGJpbmQgYSBzaW5nbGUgZnVuY3Rpb24gdG8gbWFueSBkaWZmZXJlbnQgZXZlbnRzIGluIG9uZSBjYWxsLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZXZlbnROYW1lXSBUaGUgbmFtZShzKSBvZiBldmVudHMgdG8gYmluZCB0aGlzIGZ1bmN0aW9uIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBhbiBldmVudCBpcyBmaXJlZC5cbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksXG4gICAgICBmbiA9IGFyZ3MucG9wKCksXG4gICAgICBuYW1lcyA9IGFyZ3NcblxuICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IgKFwibGFzdCBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb25cIilcblxuICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKCF0aGlzLmhhc0hhbmRsZXIobmFtZSkpIHRoaXMuZXZlbnRzW25hbWVdID0gW11cbiAgICB0aGlzLmV2ZW50c1tuYW1lXS5wdXNoKGZuKVxuICB9LCB0aGlzKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBoYW5kbGVyIGZ1bmN0aW9uIGZyb20gYSBzcGVjaWZpYyBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgdGhpcyBmdW5jdGlvbiBmcm9tLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIGFuIGV2ZW50LlxuICogQG1lbWJlck9mIEV2ZW50RW1pdHRlclxuICovXG5sdW5yLkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgaWYgKCF0aGlzLmhhc0hhbmRsZXIobmFtZSkpIHJldHVyblxuXG4gIHZhciBmbkluZGV4ID0gdGhpcy5ldmVudHNbbmFtZV0uaW5kZXhPZihmbilcbiAgdGhpcy5ldmVudHNbbmFtZV0uc3BsaWNlKGZuSW5kZXgsIDEpXG5cbiAgaWYgKCF0aGlzLmV2ZW50c1tuYW1lXS5sZW5ndGgpIGRlbGV0ZSB0aGlzLmV2ZW50c1tuYW1lXVxufVxuXG4vKipcbiAqIENhbGxzIGFsbCBmdW5jdGlvbnMgYm91bmQgdG8gdGhlIGdpdmVuIGV2ZW50LlxuICpcbiAqIEFkZGl0aW9uYWwgZGF0YSBjYW4gYmUgcGFzc2VkIHRvIHRoZSBldmVudCBoYW5kbGVyIGFzIGFyZ3VtZW50cyB0byBgZW1pdGBcbiAqIGFmdGVyIHRoZSBldmVudCBuYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQuXG4gKiBAbWVtYmVyT2YgRXZlbnRFbWl0dGVyXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCF0aGlzLmhhc0hhbmRsZXIobmFtZSkpIHJldHVyblxuXG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXG4gIHRoaXMuZXZlbnRzW25hbWVdLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKVxuICB9KVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGEgaGFuZGxlciBoYXMgZXZlciBiZWVuIHN0b3JlZCBhZ2FpbnN0IGFuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGNoZWNrLlxuICogQHByaXZhdGVcbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmhhc0hhbmRsZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gbmFtZSBpbiB0aGlzLmV2ZW50c1xufVxuXG4vKiFcbiAqIGx1bnIudG9rZW5pemVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIGZvciBzcGxpdHRpbmcgYSBzdHJpbmcgaW50byB0b2tlbnMgcmVhZHkgdG8gYmUgaW5zZXJ0ZWQgaW50b1xuICogdGhlIHNlYXJjaCBpbmRleC4gVXNlcyBgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yYCB0byBzcGxpdCBzdHJpbmdzLCBjaGFuZ2VcbiAqIHRoZSB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5IHRvIGNoYW5nZSBob3cgc3RyaW5ncyBhcmUgc3BsaXQgaW50byB0b2tlbnMuXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IG9iaiBUaGUgc3RyaW5nIHRvIGNvbnZlcnQgaW50byB0b2tlbnNcbiAqIEBzZWUgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmx1bnIudG9rZW5pemVyID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGggfHwgb2JqID09IG51bGwgfHwgb2JqID09IHVuZGVmaW5lZCkgcmV0dXJuIFtdXG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHJldHVybiBvYmoubWFwKGZ1bmN0aW9uICh0KSB7IHJldHVybiBsdW5yLnV0aWxzLmFzU3RyaW5nKHQpLnRvTG93ZXJDYXNlKCkgfSlcblxuICByZXR1cm4gb2JqLnRvU3RyaW5nKCkudHJpbSgpLnRvTG93ZXJDYXNlKCkuc3BsaXQobHVuci50b2tlbml6ZXIuc2VwYXJhdG9yKVxufVxuXG4vKipcbiAqIFRoZSBzcGVyYXRvciB1c2VkIHRvIHNwbGl0IGEgc3RyaW5nIGludG8gdG9rZW5zLiBPdmVycmlkZSB0aGlzIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgYmVoYXZpb3VyIG9mXG4gKiBgbHVuci50b2tlbml6ZXJgIGJlaGF2aW91ciB3aGVuIHRva2VuaXppbmcgc3RyaW5ncy4gQnkgZGVmYXVsdCB0aGlzIHNwbGl0cyBvbiB3aGl0ZXNwYWNlIGFuZCBoeXBoZW5zLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzZWUgbHVuci50b2tlbml6ZXJcbiAqL1xubHVuci50b2tlbml6ZXIuc2VwYXJhdG9yID0gL1tcXHNcXC1dKy9cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCB0b2tlbml6ZXIuXG4gKlxuICogQSB0b2tlbml6ZXIgZnVuY3Rpb24gdG8gYmUgbG9hZGVkIG11c3QgYWxyZWFkeSBiZSByZWdpc3RlcmVkIHdpdGggbHVuci50b2tlbml6ZXIuXG4gKiBJZiB0aGUgc2VyaWFsaXNlZCB0b2tlbml6ZXIgaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQgdGhlbiBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVGhlIGxhYmVsIG9mIHRoZSBzZXJpYWxpc2VkIHRva2VuaXplci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqIEBtZW1iZXJPZiB0b2tlbml6ZXJcbiAqL1xubHVuci50b2tlbml6ZXIubG9hZCA9IGZ1bmN0aW9uIChsYWJlbCkge1xuICB2YXIgZm4gPSB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnNbbGFiZWxdXG5cbiAgaWYgKCFmbikge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGxvYWQgdW4tcmVnaXN0ZXJlZCBmdW5jdGlvbjogJyArIGxhYmVsKVxuICB9XG5cbiAgcmV0dXJuIGZuXG59XG5cbmx1bnIudG9rZW5pemVyLmxhYmVsID0gJ2RlZmF1bHQnXG5cbmx1bnIudG9rZW5pemVyLnJlZ2lzdGVyZWRGdW5jdGlvbnMgPSB7XG4gICdkZWZhdWx0JzogbHVuci50b2tlbml6ZXJcbn1cblxuLyoqXG4gKiBSZWdpc3RlciBhIHRva2VuaXplciBmdW5jdGlvbi5cbiAqXG4gKiBGdW5jdGlvbnMgdGhhdCBhcmUgdXNlZCBhcyB0b2tlbml6ZXJzIHNob3VsZCBiZSByZWdpc3RlcmVkIGlmIHRoZXkgYXJlIHRvIGJlIHVzZWQgd2l0aCBhIHNlcmlhbGlzZWQgaW5kZXguXG4gKlxuICogUmVnaXN0ZXJpbmcgYSBmdW5jdGlvbiBkb2VzIG5vdCBhZGQgaXQgdG8gYW4gaW5kZXgsIGZ1bmN0aW9ucyBtdXN0IHN0aWxsIGJlIGFzc29jaWF0ZWQgd2l0aCBhIHNwZWNpZmljIGluZGV4IGZvciB0aGVtIHRvIGJlIHVzZWQgd2hlbiBpbmRleGluZyBhbmQgc2VhcmNoaW5nIGRvY3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcmVnaXN0ZXIuXG4gKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgVGhlIGxhYmVsIHRvIHJlZ2lzdGVyIHRoaXMgZnVuY3Rpb24gd2l0aFxuICogQG1lbWJlck9mIHRva2VuaXplclxuICovXG5sdW5yLnRva2VuaXplci5yZWdpc3RlckZ1bmN0aW9uID0gZnVuY3Rpb24gKGZuLCBsYWJlbCkge1xuICBpZiAobGFiZWwgaW4gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdPdmVyd3JpdGluZyBleGlzdGluZyB0b2tlbml6ZXI6ICcgKyBsYWJlbClcbiAgfVxuXG4gIGZuLmxhYmVsID0gbGFiZWxcbiAgdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zW2xhYmVsXSA9IGZuXG59XG4vKiFcbiAqIGx1bnIuUGlwZWxpbmVcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuUGlwZWxpbmVzIG1haW50YWluIGFuIG9yZGVyZWQgbGlzdCBvZiBmdW5jdGlvbnMgdG8gYmUgYXBwbGllZCB0byBhbGxcbiAqIHRva2VucyBpbiBkb2N1bWVudHMgZW50ZXJpbmcgdGhlIHNlYXJjaCBpbmRleCBhbmQgcXVlcmllcyBiZWluZyByYW4gYWdhaW5zdFxuICogdGhlIGluZGV4LlxuICpcbiAqIEFuIGluc3RhbmNlIG9mIGx1bnIuSW5kZXggY3JlYXRlZCB3aXRoIHRoZSBsdW5yIHNob3J0Y3V0IHdpbGwgY29udGFpbiBhXG4gKiBwaXBlbGluZSB3aXRoIGEgc3RvcCB3b3JkIGZpbHRlciBhbmQgYW4gRW5nbGlzaCBsYW5ndWFnZSBzdGVtbWVyLiBFeHRyYVxuICogZnVuY3Rpb25zIGNhbiBiZSBhZGRlZCBiZWZvcmUgb3IgYWZ0ZXIgZWl0aGVyIG9mIHRoZXNlIGZ1bmN0aW9ucyBvciB0aGVzZVxuICogZGVmYXVsdCBmdW5jdGlvbnMgY2FuIGJlIHJlbW92ZWQuXG4gKlxuICogV2hlbiBydW4gdGhlIHBpcGVsaW5lIHdpbGwgY2FsbCBlYWNoIGZ1bmN0aW9uIGluIHR1cm4sIHBhc3NpbmcgYSB0b2tlbiwgdGhlXG4gKiBpbmRleCBvZiB0aGF0IHRva2VuIGluIHRoZSBvcmlnaW5hbCBsaXN0IG9mIGFsbCB0b2tlbnMgYW5kIGZpbmFsbHkgYSBsaXN0IG9mXG4gKiBhbGwgdGhlIG9yaWdpbmFsIHRva2Vucy5cbiAqXG4gKiBUaGUgb3V0cHV0IG9mIGZ1bmN0aW9ucyBpbiB0aGUgcGlwZWxpbmUgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIG5leHQgZnVuY3Rpb25cbiAqIGluIHRoZSBwaXBlbGluZS4gVG8gZXhjbHVkZSBhIHRva2VuIGZyb20gZW50ZXJpbmcgdGhlIGluZGV4IHRoZSBmdW5jdGlvblxuICogc2hvdWxkIHJldHVybiB1bmRlZmluZWQsIHRoZSByZXN0IG9mIHRoZSBwaXBlbGluZSB3aWxsIG5vdCBiZSBjYWxsZWQgd2l0aFxuICogdGhpcyB0b2tlbi5cbiAqXG4gKiBGb3Igc2VyaWFsaXNhdGlvbiBvZiBwaXBlbGluZXMgdG8gd29yaywgYWxsIGZ1bmN0aW9ucyB1c2VkIGluIGFuIGluc3RhbmNlIG9mXG4gKiBhIHBpcGVsaW5lIHNob3VsZCBiZSByZWdpc3RlcmVkIHdpdGggbHVuci5QaXBlbGluZS4gUmVnaXN0ZXJlZCBmdW5jdGlvbnMgY2FuXG4gKiB0aGVuIGJlIGxvYWRlZC4gSWYgdHJ5aW5nIHRvIGxvYWQgYSBzZXJpYWxpc2VkIHBpcGVsaW5lIHRoYXQgdXNlcyBmdW5jdGlvbnNcbiAqIHRoYXQgYXJlIG5vdCByZWdpc3RlcmVkIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICpcbiAqIElmIG5vdCBwbGFubmluZyBvbiBzZXJpYWxpc2luZyB0aGUgcGlwZWxpbmUgdGhlbiByZWdpc3RlcmluZyBwaXBlbGluZSBmdW5jdGlvbnNcbiAqIGlzIG5vdCBuZWNlc3NhcnkuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuUGlwZWxpbmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3N0YWNrID0gW11cbn1cblxubHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zID0ge31cblxuLyoqXG4gKiBSZWdpc3RlciBhIGZ1bmN0aW9uIHdpdGggdGhlIHBpcGVsaW5lLlxuICpcbiAqIEZ1bmN0aW9ucyB0aGF0IGFyZSB1c2VkIGluIHRoZSBwaXBlbGluZSBzaG91bGQgYmUgcmVnaXN0ZXJlZCBpZiB0aGUgcGlwZWxpbmVcbiAqIG5lZWRzIHRvIGJlIHNlcmlhbGlzZWQsIG9yIGEgc2VyaWFsaXNlZCBwaXBlbGluZSBuZWVkcyB0byBiZSBsb2FkZWQuXG4gKlxuICogUmVnaXN0ZXJpbmcgYSBmdW5jdGlvbiBkb2VzIG5vdCBhZGQgaXQgdG8gYSBwaXBlbGluZSwgZnVuY3Rpb25zIG11c3Qgc3RpbGwgYmVcbiAqIGFkZGVkIHRvIGluc3RhbmNlcyBvZiB0aGUgcGlwZWxpbmUgZm9yIHRoZW0gdG8gYmUgdXNlZCB3aGVuIHJ1bm5pbmcgYSBwaXBlbGluZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgZm9yLlxuICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIFRoZSBsYWJlbCB0byByZWdpc3RlciB0aGlzIGZ1bmN0aW9uIHdpdGhcbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4sIGxhYmVsKSB7XG4gIGlmIChsYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ092ZXJ3cml0aW5nIGV4aXN0aW5nIHJlZ2lzdGVyZWQgZnVuY3Rpb246ICcgKyBsYWJlbClcbiAgfVxuXG4gIGZuLmxhYmVsID0gbGFiZWxcbiAgbHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zW2ZuLmxhYmVsXSA9IGZuXG59XG5cbi8qKlxuICogV2FybnMgaWYgdGhlIGZ1bmN0aW9uIGlzIG5vdCByZWdpc3RlcmVkIGFzIGEgUGlwZWxpbmUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIGZvci5cbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGlzUmVnaXN0ZXJlZCA9IGZuLmxhYmVsICYmIChmbi5sYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpXG5cbiAgaWYgKCFpc1JlZ2lzdGVyZWQpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ0Z1bmN0aW9uIGlzIG5vdCByZWdpc3RlcmVkIHdpdGggcGlwZWxpbmUuIFRoaXMgbWF5IGNhdXNlIHByb2JsZW1zIHdoZW4gc2VyaWFsaXNpbmcgdGhlIGluZGV4LlxcbicsIGZuKVxuICB9XG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgcGlwZWxpbmUuXG4gKlxuICogQWxsIGZ1bmN0aW9ucyB0byBiZSBsb2FkZWQgbXVzdCBhbHJlYWR5IGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLlBpcGVsaW5lLlxuICogSWYgYW55IGZ1bmN0aW9uIGZyb20gdGhlIHNlcmlhbGlzZWQgZGF0YSBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZCB0aGVuIGFuXG4gKiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXNlZCBUaGUgc2VyaWFsaXNlZCBwaXBlbGluZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuUGlwZWxpbmV9XG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWQpIHtcbiAgdmFyIHBpcGVsaW5lID0gbmV3IGx1bnIuUGlwZWxpbmVcblxuICBzZXJpYWxpc2VkLmZvckVhY2goZnVuY3Rpb24gKGZuTmFtZSkge1xuICAgIHZhciBmbiA9IGx1bnIuUGlwZWxpbmUucmVnaXN0ZXJlZEZ1bmN0aW9uc1tmbk5hbWVdXG5cbiAgICBpZiAoZm4pIHtcbiAgICAgIHBpcGVsaW5lLmFkZChmbilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgbG9hZCB1bi1yZWdpc3RlcmVkIGZ1bmN0aW9uOiAnICsgZm5OYW1lKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcGlwZWxpbmVcbn1cblxuLyoqXG4gKiBBZGRzIG5ldyBmdW5jdGlvbnMgdG8gdGhlIGVuZCBvZiB0aGUgcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9ucyBBbnkgbnVtYmVyIG9mIGZ1bmN0aW9ucyB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcblxuICBmbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChmbilcbiAgICB0aGlzLl9zdGFjay5wdXNoKGZuKVxuICB9LCB0aGlzKVxufVxuXG4vKipcbiAqIEFkZHMgYSBzaW5nbGUgZnVuY3Rpb24gYWZ0ZXIgYSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZVxuICogcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4aXN0aW5nRm4gQSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZSBwaXBlbGluZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5ld0ZuIFRoZSBuZXcgZnVuY3Rpb24gdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5hZnRlciA9IGZ1bmN0aW9uIChleGlzdGluZ0ZuLCBuZXdGbikge1xuICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChuZXdGbilcblxuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihleGlzdGluZ0ZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBleGlzdGluZ0ZuJylcbiAgfVxuXG4gIHBvcyA9IHBvcyArIDFcbiAgdGhpcy5fc3RhY2suc3BsaWNlKHBvcywgMCwgbmV3Rm4pXG59XG5cbi8qKlxuICogQWRkcyBhIHNpbmdsZSBmdW5jdGlvbiBiZWZvcmUgYSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZVxuICogcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4aXN0aW5nRm4gQSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZSBwaXBlbGluZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5ld0ZuIFRoZSBuZXcgZnVuY3Rpb24gdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5iZWZvcmUgPSBmdW5jdGlvbiAoZXhpc3RpbmdGbiwgbmV3Rm4pIHtcbiAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQobmV3Rm4pXG5cbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZXhpc3RpbmdGbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgZXhpc3RpbmdGbicpXG4gIH1cblxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAwLCBuZXdGbilcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgZnVuY3Rpb24gZnJvbSB0aGUgcGlwZWxpbmUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZm4pXG4gIGlmIChwb3MgPT0gLTEpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDEpXG59XG5cbi8qKlxuICogUnVucyB0aGUgY3VycmVudCBsaXN0IG9mIGZ1bmN0aW9ucyB0aGF0IG1ha2UgdXAgdGhlIHBpcGVsaW5lIGFnYWluc3QgdGhlXG4gKiBwYXNzZWQgdG9rZW5zLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHRva2VucyBUaGUgdG9rZW5zIHRvIHJ1biB0aHJvdWdoIHRoZSBwaXBlbGluZS5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAodG9rZW5zKSB7XG4gIHZhciBvdXQgPSBbXSxcbiAgICAgIHRva2VuTGVuZ3RoID0gdG9rZW5zLmxlbmd0aCxcbiAgICAgIHN0YWNrTGVuZ3RoID0gdGhpcy5fc3RhY2subGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbkxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN0YWNrTGVuZ3RoOyBqKyspIHtcbiAgICAgIHRva2VuID0gdGhpcy5fc3RhY2tbal0odG9rZW4sIGksIHRva2VucylcbiAgICAgIGlmICh0b2tlbiA9PT0gdm9pZCAwIHx8IHRva2VuID09PSAnJykgYnJlYWtcbiAgICB9O1xuXG4gICAgaWYgKHRva2VuICE9PSB2b2lkIDAgJiYgdG9rZW4gIT09ICcnKSBvdXQucHVzaCh0b2tlbilcbiAgfTtcblxuICByZXR1cm4gb3V0XG59XG5cbi8qKlxuICogUmVzZXRzIHRoZSBwaXBlbGluZSBieSByZW1vdmluZyBhbnkgZXhpc3RpbmcgcHJvY2Vzc29ycy5cbiAqXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3N0YWNrID0gW11cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHBpcGVsaW5lIHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fc3RhY2subWFwKGZ1bmN0aW9uIChmbikge1xuICAgIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKGZuKVxuXG4gICAgcmV0dXJuIGZuLmxhYmVsXG4gIH0pXG59XG4vKiFcbiAqIGx1bnIuVmVjdG9yXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlZlY3RvcnMgaW1wbGVtZW50IHZlY3RvciByZWxhdGVkIG9wZXJhdGlvbnMgZm9yXG4gKiBhIHNlcmllcyBvZiBlbGVtZW50cy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5WZWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX21hZ25pdHVkZSA9IG51bGxcbiAgdGhpcy5saXN0ID0gdW5kZWZpbmVkXG4gIHRoaXMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIGx1bnIuVmVjdG9yLk5vZGUgaXMgYSBzaW1wbGUgc3RydWN0IGZvciBlYWNoIG5vZGVcbiAqIGluIGEgbHVuci5WZWN0b3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIG5vZGUgaW4gdGhlIHZlY3Rvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgZGF0YSBhdCB0aGlzIG5vZGUgaW4gdGhlIHZlY3Rvci5cbiAqIEBwYXJhbSB7bHVuci5WZWN0b3IuTm9kZX0gVGhlIG5vZGUgZGlyZWN0bHkgYWZ0ZXIgdGhpcyBub2RlIGluIHRoZSB2ZWN0b3IuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IuTm9kZSA9IGZ1bmN0aW9uIChpZHgsIHZhbCwgbmV4dCkge1xuICB0aGlzLmlkeCA9IGlkeFxuICB0aGlzLnZhbCA9IHZhbFxuICB0aGlzLm5leHQgPSBuZXh0XG59XG5cbi8qKlxuICogSW5zZXJ0cyBhIG5ldyB2YWx1ZSBhdCBhIHBvc2l0aW9uIGluIGEgdmVjdG9yLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgaW5kZXggYXQgd2hpY2ggdG8gaW5zZXJ0IGEgdmFsdWUuXG4gKiBAcGFyYW0ge09iamVjdH0gVGhlIG9iamVjdCB0byBpbnNlcnQgaW4gdGhlIHZlY3Rvci5cbiAqIEBtZW1iZXJPZiBWZWN0b3IuXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAoaWR4LCB2YWwpIHtcbiAgdGhpcy5fbWFnbml0dWRlID0gdW5kZWZpbmVkO1xuICB2YXIgbGlzdCA9IHRoaXMubGlzdFxuXG4gIGlmICghbGlzdCkge1xuICAgIHRoaXMubGlzdCA9IG5ldyBsdW5yLlZlY3Rvci5Ob2RlIChpZHgsIHZhbCwgbGlzdClcbiAgICByZXR1cm4gdGhpcy5sZW5ndGgrK1xuICB9XG5cbiAgaWYgKGlkeCA8IGxpc3QuaWR4KSB7XG4gICAgdGhpcy5saXN0ID0gbmV3IGx1bnIuVmVjdG9yLk5vZGUgKGlkeCwgdmFsLCBsaXN0KVxuICAgIHJldHVybiB0aGlzLmxlbmd0aCsrXG4gIH1cblxuICB2YXIgcHJldiA9IGxpc3QsXG4gICAgICBuZXh0ID0gbGlzdC5uZXh0XG5cbiAgd2hpbGUgKG5leHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGlkeCA8IG5leHQuaWR4KSB7XG4gICAgICBwcmV2Lm5leHQgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIG5leHQpXG4gICAgICByZXR1cm4gdGhpcy5sZW5ndGgrK1xuICAgIH1cblxuICAgIHByZXYgPSBuZXh0LCBuZXh0ID0gbmV4dC5uZXh0XG4gIH1cblxuICBwcmV2Lm5leHQgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIG5leHQpXG4gIHJldHVybiB0aGlzLmxlbmd0aCsrXG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWFnbml0dWRlIG9mIHRoaXMgdmVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgVmVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5tYWduaXR1ZGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLl9tYWduaXR1ZGUpIHJldHVybiB0aGlzLl9tYWduaXR1ZGVcbiAgdmFyIG5vZGUgPSB0aGlzLmxpc3QsXG4gICAgICBzdW1PZlNxdWFyZXMgPSAwLFxuICAgICAgdmFsXG5cbiAgd2hpbGUgKG5vZGUpIHtcbiAgICB2YWwgPSBub2RlLnZhbFxuICAgIHN1bU9mU3F1YXJlcyArPSB2YWwgKiB2YWxcbiAgICBub2RlID0gbm9kZS5uZXh0XG4gIH1cblxuICByZXR1cm4gdGhpcy5fbWFnbml0dWRlID0gTWF0aC5zcXJ0KHN1bU9mU3F1YXJlcylcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlciB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvcn0gb3RoZXJWZWN0b3IgVGhlIHZlY3RvciB0byBjb21wdXRlIHRoZSBkb3QgcHJvZHVjdCB3aXRoLlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIChvdGhlclZlY3Rvcikge1xuICB2YXIgbm9kZSA9IHRoaXMubGlzdCxcbiAgICAgIG90aGVyTm9kZSA9IG90aGVyVmVjdG9yLmxpc3QsXG4gICAgICBkb3RQcm9kdWN0ID0gMFxuXG4gIHdoaWxlIChub2RlICYmIG90aGVyTm9kZSkge1xuICAgIGlmIChub2RlLmlkeCA8IG90aGVyTm9kZS5pZHgpIHtcbiAgICAgIG5vZGUgPSBub2RlLm5leHRcbiAgICB9IGVsc2UgaWYgKG5vZGUuaWR4ID4gb3RoZXJOb2RlLmlkeCkge1xuICAgICAgb3RoZXJOb2RlID0gb3RoZXJOb2RlLm5leHRcbiAgICB9IGVsc2Uge1xuICAgICAgZG90UHJvZHVjdCArPSBub2RlLnZhbCAqIG90aGVyTm9kZS52YWxcbiAgICAgIG5vZGUgPSBub2RlLm5leHRcbiAgICAgIG90aGVyTm9kZSA9IG90aGVyTm9kZS5uZXh0XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRvdFByb2R1Y3Rcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBjb3NpbmUgc2ltaWxhcml0eSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKiB2ZWN0b3IuXG4gKlxuICogQHBhcmFtIHtsdW5yLlZlY3Rvcn0gb3RoZXJWZWN0b3IgVGhlIG90aGVyIHZlY3RvciB0byBjYWxjdWxhdGUgdGhlXG4gKiBzaW1pbGFyaXR5IHdpdGguXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFZlY3RvclxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUuc2ltaWxhcml0eSA9IGZ1bmN0aW9uIChvdGhlclZlY3Rvcikge1xuICByZXR1cm4gdGhpcy5kb3Qob3RoZXJWZWN0b3IpIC8gKHRoaXMubWFnbml0dWRlKCkgKiBvdGhlclZlY3Rvci5tYWduaXR1ZGUoKSlcbn1cbi8qIVxuICogbHVuci5Tb3J0ZWRTZXRcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuU29ydGVkU2V0cyBhcmUgdXNlZCB0byBtYWludGFpbiBhbiBhcnJheSBvZiB1bmlxIHZhbHVlcyBpbiBhIHNvcnRlZFxuICogb3JkZXIuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuU29ydGVkU2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmxlbmd0aCA9IDBcbiAgdGhpcy5lbGVtZW50cyA9IFtdXG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgc29ydGVkIHNldC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkRGF0YSkge1xuICB2YXIgc2V0ID0gbmV3IHRoaXNcblxuICBzZXQuZWxlbWVudHMgPSBzZXJpYWxpc2VkRGF0YVxuICBzZXQubGVuZ3RoID0gc2VyaWFsaXNlZERhdGEubGVuZ3RoXG5cbiAgcmV0dXJuIHNldFxufVxuXG4vKipcbiAqIEluc2VydHMgbmV3IGl0ZW1zIGludG8gdGhlIHNldCBpbiB0aGUgY29ycmVjdCBwb3NpdGlvbiB0byBtYWludGFpbiB0aGVcbiAqIG9yZGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgb2JqZWN0cyB0byBhZGQgdG8gdGhpcyBzZXQuXG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpLCBlbGVtZW50XG5cbiAgZm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGVsZW1lbnQgPSBhcmd1bWVudHNbaV1cbiAgICBpZiAofnRoaXMuaW5kZXhPZihlbGVtZW50KSkgY29udGludWVcbiAgICB0aGlzLmVsZW1lbnRzLnNwbGljZSh0aGlzLmxvY2F0aW9uRm9yKGVsZW1lbnQpLCAwLCBlbGVtZW50KVxuICB9XG5cbiAgdGhpcy5sZW5ndGggPSB0aGlzLmVsZW1lbnRzLmxlbmd0aFxufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgc29ydGVkIHNldCBpbnRvIGFuIGFycmF5LlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmVsZW1lbnRzLnNsaWNlKClcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGFycmF5IHdpdGggdGhlIHJlc3VsdHMgb2YgY2FsbGluZyBhIHByb3ZpZGVkIGZ1bmN0aW9uIG9uIGV2ZXJ5XG4gKiBlbGVtZW50IGluIHRoaXMgc29ydGVkIHNldC5cbiAqXG4gKiBEZWxlZ2F0ZXMgdG8gQXJyYXkucHJvdG90eXBlLm1hcCBhbmQgaGFzIHRoZSBzYW1lIHNpZ25hdHVyZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgb24gZWFjaCBlbGVtZW50IG9mIHRoZVxuICogc2V0LlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBBbiBvcHRpb25hbCBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgY29udGV4dFxuICogZm9yIHRoZSBmdW5jdGlvbiBmbi5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmbiwgY3R4KSB7XG4gIHJldHVybiB0aGlzLmVsZW1lbnRzLm1hcChmbiwgY3R4KVxufVxuXG4vKipcbiAqIEV4ZWN1dGVzIGEgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBwZXIgc29ydGVkIHNldCBlbGVtZW50LlxuICpcbiAqIERlbGVnYXRlcyB0byBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCBhbmQgaGFzIHRoZSBzYW1lIHNpZ25hdHVyZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgb24gZWFjaCBlbGVtZW50IG9mIHRoZVxuICogc2V0LlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBBbiBvcHRpb25hbCBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgY29udGV4dFxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICogZm9yIHRoZSBmdW5jdGlvbiBmbi5cbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoZm4sIGN0eCkge1xuICByZXR1cm4gdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZuLCBjdHgpXG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW5kZXggYXQgd2hpY2ggYSBnaXZlbiBlbGVtZW50IGNhbiBiZSBmb3VuZCBpbiB0aGVcbiAqIHNvcnRlZCBzZXQsIG9yIC0xIGlmIGl0IGlzIG5vdCBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIFRoZSBvYmplY3QgdG8gbG9jYXRlIGluIHRoZSBzb3J0ZWQgc2V0LlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoZWxlbSkge1xuICB2YXIgc3RhcnQgPSAwLFxuICAgICAgZW5kID0gdGhpcy5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnQsXG4gICAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMiksXG4gICAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuXG4gIHdoaWxlIChzZWN0aW9uTGVuZ3RoID4gMSkge1xuICAgIGlmIChwaXZvdEVsZW0gPT09IGVsZW0pIHJldHVybiBwaXZvdFxuXG4gICAgaWYgKHBpdm90RWxlbSA8IGVsZW0pIHN0YXJ0ID0gcGl2b3RcbiAgICBpZiAocGl2b3RFbGVtID4gZWxlbSkgZW5kID0gcGl2b3RcblxuICAgIHNlY3Rpb25MZW5ndGggPSBlbmQgLSBzdGFydFxuICAgIHBpdm90ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNlY3Rpb25MZW5ndGggLyAyKVxuICAgIHBpdm90RWxlbSA9IHRoaXMuZWxlbWVudHNbcGl2b3RdXG4gIH1cblxuICBpZiAocGl2b3RFbGVtID09PSBlbGVtKSByZXR1cm4gcGl2b3RcblxuICByZXR1cm4gLTFcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiB3aXRoaW4gdGhlIHNvcnRlZCBzZXQgdGhhdCBhbiBlbGVtZW50IHNob3VsZCBiZVxuICogaW5zZXJ0ZWQgYXQgdG8gbWFpbnRhaW4gdGhlIGN1cnJlbnQgb3JkZXIgb2YgdGhlIHNldC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCB0aGUgZWxlbWVudCB0byBzZWFyY2ggZm9yIGRvZXMgbm90IGFscmVhZHkgZXhpc3RcbiAqIGluIHRoZSBzb3J0ZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIFRoZSBlbGVtIHRvIGZpbmQgdGhlIHBvc2l0aW9uIGZvciBpbiB0aGUgc2V0XG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUubG9jYXRpb25Gb3IgPSBmdW5jdGlvbiAoZWxlbSkge1xuICB2YXIgc3RhcnQgPSAwLFxuICAgICAgZW5kID0gdGhpcy5lbGVtZW50cy5sZW5ndGgsXG4gICAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnQsXG4gICAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMiksXG4gICAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuXG4gIHdoaWxlIChzZWN0aW9uTGVuZ3RoID4gMSkge1xuICAgIGlmIChwaXZvdEVsZW0gPCBlbGVtKSBzdGFydCA9IHBpdm90XG4gICAgaWYgKHBpdm90RWxlbSA+IGVsZW0pIGVuZCA9IHBpdm90XG5cbiAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnRcbiAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMilcbiAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuICB9XG5cbiAgaWYgKHBpdm90RWxlbSA+IGVsZW0pIHJldHVybiBwaXZvdFxuICBpZiAocGl2b3RFbGVtIDwgZWxlbSkgcmV0dXJuIHBpdm90ICsgMVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbHVuci5Tb3J0ZWRTZXQgdGhhdCBjb250YWlucyB0aGUgZWxlbWVudHMgaW4gdGhlIGludGVyc2VjdGlvblxuICogb2YgdGhpcyBzZXQgYW5kIHRoZSBwYXNzZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7bHVuci5Tb3J0ZWRTZXR9IG90aGVyU2V0IFRoZSBzZXQgdG8gaW50ZXJzZWN0IHdpdGggdGhpcyBzZXQuXG4gKiBAcmV0dXJucyB7bHVuci5Tb3J0ZWRTZXR9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5pbnRlcnNlY3QgPSBmdW5jdGlvbiAob3RoZXJTZXQpIHtcbiAgdmFyIGludGVyc2VjdFNldCA9IG5ldyBsdW5yLlNvcnRlZFNldCxcbiAgICAgIGkgPSAwLCBqID0gMCxcbiAgICAgIGFfbGVuID0gdGhpcy5sZW5ndGgsIGJfbGVuID0gb3RoZXJTZXQubGVuZ3RoLFxuICAgICAgYSA9IHRoaXMuZWxlbWVudHMsIGIgPSBvdGhlclNldC5lbGVtZW50c1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgaWYgKGkgPiBhX2xlbiAtIDEgfHwgaiA+IGJfbGVuIC0gMSkgYnJlYWtcblxuICAgIGlmIChhW2ldID09PSBiW2pdKSB7XG4gICAgICBpbnRlcnNlY3RTZXQuYWRkKGFbaV0pXG4gICAgICBpKyssIGorK1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoYVtpXSA8IGJbal0pIHtcbiAgICAgIGkrK1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoYVtpXSA+IGJbal0pIHtcbiAgICAgIGorK1xuICAgICAgY29udGludWVcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGludGVyc2VjdFNldFxufVxuXG4vKipcbiAqIE1ha2VzIGEgY29weSBvZiB0aGlzIHNldFxuICpcbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY2xvbmUgPSBuZXcgbHVuci5Tb3J0ZWRTZXRcblxuICBjbG9uZS5lbGVtZW50cyA9IHRoaXMudG9BcnJheSgpXG4gIGNsb25lLmxlbmd0aCA9IGNsb25lLmVsZW1lbnRzLmxlbmd0aFxuXG4gIHJldHVybiBjbG9uZVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbHVuci5Tb3J0ZWRTZXQgdGhhdCBjb250YWlucyB0aGUgZWxlbWVudHMgaW4gdGhlIHVuaW9uXG4gKiBvZiB0aGlzIHNldCBhbmQgdGhlIHBhc3NlZCBzZXQuXG4gKlxuICogQHBhcmFtIHtsdW5yLlNvcnRlZFNldH0gb3RoZXJTZXQgVGhlIHNldCB0byB1bmlvbiB3aXRoIHRoaXMgc2V0LlxuICogQHJldHVybnMge2x1bnIuU29ydGVkU2V0fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUudW5pb24gPSBmdW5jdGlvbiAob3RoZXJTZXQpIHtcbiAgdmFyIGxvbmdTZXQsIHNob3J0U2V0LCB1bmlvblNldFxuXG4gIGlmICh0aGlzLmxlbmd0aCA+PSBvdGhlclNldC5sZW5ndGgpIHtcbiAgICBsb25nU2V0ID0gdGhpcywgc2hvcnRTZXQgPSBvdGhlclNldFxuICB9IGVsc2Uge1xuICAgIGxvbmdTZXQgPSBvdGhlclNldCwgc2hvcnRTZXQgPSB0aGlzXG4gIH1cblxuICB1bmlvblNldCA9IGxvbmdTZXQuY2xvbmUoKVxuXG4gIGZvcih2YXIgaSA9IDAsIHNob3J0U2V0RWxlbWVudHMgPSBzaG9ydFNldC50b0FycmF5KCk7IGkgPCBzaG9ydFNldEVsZW1lbnRzLmxlbmd0aDsgaSsrKXtcbiAgICB1bmlvblNldC5hZGQoc2hvcnRTZXRFbGVtZW50c1tpXSlcbiAgfVxuXG4gIHJldHVybiB1bmlvblNldFxufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc29ydGVkIHNldCByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRvQXJyYXkoKVxufVxuLyohXG4gKiBsdW5yLkluZGV4XG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLkluZGV4IGlzIG9iamVjdCB0aGF0IG1hbmFnZXMgYSBzZWFyY2ggaW5kZXguICBJdCBjb250YWlucyB0aGUgaW5kZXhlc1xuICogYW5kIHN0b3JlcyBhbGwgdGhlIHRva2VucyBhbmQgZG9jdW1lbnQgbG9va3Vwcy4gIEl0IGFsc28gcHJvdmlkZXMgdGhlIG1haW5cbiAqIHVzZXIgZmFjaW5nIEFQSSBmb3IgdGhlIGxpYnJhcnkuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuSW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2ZpZWxkcyA9IFtdXG4gIHRoaXMuX3JlZiA9ICdpZCdcbiAgdGhpcy5waXBlbGluZSA9IG5ldyBsdW5yLlBpcGVsaW5lXG4gIHRoaXMuZG9jdW1lbnRTdG9yZSA9IG5ldyBsdW5yLlN0b3JlXG4gIHRoaXMudG9rZW5TdG9yZSA9IG5ldyBsdW5yLlRva2VuU3RvcmVcbiAgdGhpcy5jb3JwdXNUb2tlbnMgPSBuZXcgbHVuci5Tb3J0ZWRTZXRcbiAgdGhpcy5ldmVudEVtaXR0ZXIgPSAgbmV3IGx1bnIuRXZlbnRFbWl0dGVyXG4gIHRoaXMudG9rZW5pemVyRm4gPSBsdW5yLnRva2VuaXplclxuXG4gIHRoaXMuX2lkZkNhY2hlID0ge31cblxuICB0aGlzLm9uKCdhZGQnLCAncmVtb3ZlJywgJ3VwZGF0ZScsIChmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faWRmQ2FjaGUgPSB7fVxuICB9KS5iaW5kKHRoaXMpKVxufVxuXG4vKipcbiAqIEJpbmQgYSBoYW5kbGVyIHRvIGV2ZW50cyBiZWluZyBlbWl0dGVkIGJ5IHRoZSBpbmRleC5cbiAqXG4gKiBUaGUgaGFuZGxlciBjYW4gYmUgYm91bmQgdG8gbWFueSBldmVudHMgYXQgdGhlIHNhbWUgdGltZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gW2V2ZW50TmFtZV0gVGhlIG5hbWUocykgb2YgZXZlbnRzIHRvIGJpbmQgdGhlIGZ1bmN0aW9uIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHNlcmlhbGlzZWQgc2V0IHRvIGxvYWQuXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICByZXR1cm4gdGhpcy5ldmVudEVtaXR0ZXIuYWRkTGlzdGVuZXIuYXBwbHkodGhpcy5ldmVudEVtaXR0ZXIsIGFyZ3MpXG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGhhbmRsZXIgZnJvbSBhbiBldmVudCBiZWluZyBlbWl0dGVkIGJ5IHRoZSBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIGV2ZW50cyB0byByZW1vdmUgdGhlIGZ1bmN0aW9uIGZyb20uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgcmV0dXJuIHRoaXMuZXZlbnRFbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIGZuKVxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIGluZGV4LlxuICpcbiAqIElzc3VlcyBhIHdhcm5pbmcgaWYgdGhlIGluZGV4IGJlaW5nIGltcG9ydGVkIHdhcyBzZXJpYWxpc2VkXG4gKiBieSBhIGRpZmZlcmVudCB2ZXJzaW9uIG9mIGx1bnIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWREYXRhIFRoZSBzZXJpYWxpc2VkIHNldCB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIGlmIChzZXJpYWxpc2VkRGF0YS52ZXJzaW9uICE9PSBsdW5yLnZlcnNpb24pIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ3ZlcnNpb24gbWlzbWF0Y2g6IGN1cnJlbnQgJyArIGx1bnIudmVyc2lvbiArICcgaW1wb3J0aW5nICcgKyBzZXJpYWxpc2VkRGF0YS52ZXJzaW9uKVxuICB9XG5cbiAgdmFyIGlkeCA9IG5ldyB0aGlzXG5cbiAgaWR4Ll9maWVsZHMgPSBzZXJpYWxpc2VkRGF0YS5maWVsZHNcbiAgaWR4Ll9yZWYgPSBzZXJpYWxpc2VkRGF0YS5yZWZcblxuICBpZHgudG9rZW5pemVyKGx1bnIudG9rZW5pemVyLmxvYWQoc2VyaWFsaXNlZERhdGEudG9rZW5pemVyKSlcbiAgaWR4LmRvY3VtZW50U3RvcmUgPSBsdW5yLlN0b3JlLmxvYWQoc2VyaWFsaXNlZERhdGEuZG9jdW1lbnRTdG9yZSlcbiAgaWR4LnRva2VuU3RvcmUgPSBsdW5yLlRva2VuU3RvcmUubG9hZChzZXJpYWxpc2VkRGF0YS50b2tlblN0b3JlKVxuICBpZHguY29ycHVzVG9rZW5zID0gbHVuci5Tb3J0ZWRTZXQubG9hZChzZXJpYWxpc2VkRGF0YS5jb3JwdXNUb2tlbnMpXG4gIGlkeC5waXBlbGluZSA9IGx1bnIuUGlwZWxpbmUubG9hZChzZXJpYWxpc2VkRGF0YS5waXBlbGluZSlcblxuICByZXR1cm4gaWR4XG59XG5cbi8qKlxuICogQWRkcyBhIGZpZWxkIHRvIHRoZSBsaXN0IG9mIGZpZWxkcyB0aGF0IHdpbGwgYmUgc2VhcmNoYWJsZSB3aXRoaW4gZG9jdW1lbnRzXG4gKiBpbiB0aGUgaW5kZXguXG4gKlxuICogQW4gb3B0aW9uYWwgYm9vc3QgcGFyYW0gY2FuIGJlIHBhc3NlZCB0byBhZmZlY3QgaG93IG11Y2ggdG9rZW5zIGluIHRoaXMgZmllbGRcbiAqIHJhbmsgaW4gc2VhcmNoIHJlc3VsdHMsIGJ5IGRlZmF1bHQgdGhlIGJvb3N0IHZhbHVlIGlzIDEuXG4gKlxuICogRmllbGRzIHNob3VsZCBiZSBhZGRlZCBiZWZvcmUgYW55IGRvY3VtZW50cyBhcmUgYWRkZWQgdG8gdGhlIGluZGV4LCBmaWVsZHNcbiAqIHRoYXQgYXJlIGFkZGVkIGFmdGVyIGRvY3VtZW50cyBhcmUgYWRkZWQgdG8gdGhlIGluZGV4IHdpbGwgb25seSBhcHBseSB0byBuZXdcbiAqIGRvY3VtZW50cyBhZGRlZCB0byB0aGUgaW5kZXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkTmFtZSBUaGUgbmFtZSBvZiB0aGUgZmllbGQgd2l0aGluIHRoZSBkb2N1bWVudCB0aGF0XG4gKiBzaG91bGQgYmUgaW5kZXhlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGJvb3N0IEFuIG9wdGlvbmFsIGJvb3N0IHRoYXQgY2FuIGJlIGFwcGxpZWQgdG8gdGVybXMgaW4gdGhpc1xuICogZmllbGQuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5maWVsZCA9IGZ1bmN0aW9uIChmaWVsZE5hbWUsIG9wdHMpIHtcbiAgdmFyIG9wdHMgPSBvcHRzIHx8IHt9LFxuICAgICAgZmllbGQgPSB7IG5hbWU6IGZpZWxkTmFtZSwgYm9vc3Q6IG9wdHMuYm9vc3QgfHwgMSB9XG5cbiAgdGhpcy5fZmllbGRzLnB1c2goZmllbGQpXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogU2V0cyB0aGUgcHJvcGVydHkgdXNlZCB0byB1bmlxdWVseSBpZGVudGlmeSBkb2N1bWVudHMgYWRkZWQgdG8gdGhlIGluZGV4LFxuICogYnkgZGVmYXVsdCB0aGlzIHByb3BlcnR5IGlzICdpZCcuXG4gKlxuICogVGhpcyBzaG91bGQgb25seSBiZSBjaGFuZ2VkIGJlZm9yZSBhZGRpbmcgZG9jdW1lbnRzIHRvIHRoZSBpbmRleCwgY2hhbmdpbmdcbiAqIHRoZSByZWYgcHJvcGVydHkgd2l0aG91dCByZXNldHRpbmcgdGhlIGluZGV4IGNhbiBsZWFkIHRvIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAqXG4gKiBUaGUgdmFsdWUgb2YgcmVmIGNhbiBiZSBvZiBhbnkgdHlwZSBidXQgaXQgX211c3RfIGJlIHN0YWJseSBjb21wYXJhYmxlIGFuZFxuICogb3JkZXJhYmxlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWZOYW1lIFRoZSBwcm9wZXJ0eSB0byB1c2UgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhlXG4gKiBkb2N1bWVudHMgaW4gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciB0byBlbWl0IGFkZCBldmVudHMsIGRlZmF1bHRzIHRvIHRydWVcbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uIChyZWZOYW1lKSB7XG4gIHRoaXMuX3JlZiA9IHJlZk5hbWVcbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSB0b2tlbml6ZXIgdXNlZCBmb3IgdGhpcyBpbmRleC5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoZSBpbmRleCB3aWxsIHVzZSB0aGUgZGVmYXVsdCB0b2tlbml6ZXIsIGx1bnIudG9rZW5pemVyLiBUaGUgdG9rZW5pemVyXG4gKiBzaG91bGQgb25seSBiZSBjaGFuZ2VkIGJlZm9yZSBhZGRpbmcgZG9jdW1lbnRzIHRvIHRoZSBpbmRleC4gQ2hhbmdpbmcgdGhlIHRva2VuaXplclxuICogd2l0aG91dCByZS1idWlsZGluZyB0aGUgaW5kZXggY2FuIGxlYWQgdG8gdW5leHBlY3RlZCByZXN1bHRzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byB1c2UgYXMgYSB0b2tlbml6ZXIuXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS50b2tlbml6ZXIgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGlzUmVnaXN0ZXJlZCA9IGZuLmxhYmVsICYmIChmbi5sYWJlbCBpbiBsdW5yLnRva2VuaXplci5yZWdpc3RlcmVkRnVuY3Rpb25zKVxuXG4gIGlmICghaXNSZWdpc3RlcmVkKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdGdW5jdGlvbiBpcyBub3QgYSByZWdpc3RlcmVkIHRva2VuaXplci4gVGhpcyBtYXkgY2F1c2UgcHJvYmxlbXMgd2hlbiBzZXJpYWxpc2luZyB0aGUgaW5kZXgnKVxuICB9XG5cbiAgdGhpcy50b2tlbml6ZXJGbiA9IGZuXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQWRkIGEgZG9jdW1lbnQgdG8gdGhlIGluZGV4LlxuICpcbiAqIFRoaXMgaXMgdGhlIHdheSBuZXcgZG9jdW1lbnRzIGVudGVyIHRoZSBpbmRleCwgdGhpcyBmdW5jdGlvbiB3aWxsIHJ1biB0aGVcbiAqIGZpZWxkcyBmcm9tIHRoZSBkb2N1bWVudCB0aHJvdWdoIHRoZSBpbmRleCdzIHBpcGVsaW5lIGFuZCB0aGVuIGFkZCBpdCB0b1xuICogdGhlIGluZGV4LCBpdCB3aWxsIHRoZW4gc2hvdyB1cCBpbiBzZWFyY2ggcmVzdWx0cy5cbiAqXG4gKiBBbiAnYWRkJyBldmVudCBpcyBlbWl0dGVkIHdpdGggdGhlIGRvY3VtZW50IHRoYXQgaGFzIGJlZW4gYWRkZWQgYW5kIHRoZSBpbmRleFxuICogdGhlIGRvY3VtZW50IGhhcyBiZWVuIGFkZGVkIHRvLiBUaGlzIGV2ZW50IGNhbiBiZSBzaWxlbmNlZCBieSBwYXNzaW5nIGZhbHNlXG4gKiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGFkZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIFRoZSBkb2N1bWVudCB0byBhZGQgdG8gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciBvciBub3QgdG8gZW1pdCBldmVudHMsIGRlZmF1bHQgdHJ1ZS5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZG9jLCBlbWl0RXZlbnQpIHtcbiAgdmFyIGRvY1Rva2VucyA9IHt9LFxuICAgICAgYWxsRG9jdW1lbnRUb2tlbnMgPSBuZXcgbHVuci5Tb3J0ZWRTZXQsXG4gICAgICBkb2NSZWYgPSBkb2NbdGhpcy5fcmVmXSxcbiAgICAgIGVtaXRFdmVudCA9IGVtaXRFdmVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGVtaXRFdmVudFxuXG4gIHRoaXMuX2ZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgIHZhciBmaWVsZFRva2VucyA9IHRoaXMucGlwZWxpbmUucnVuKHRoaXMudG9rZW5pemVyRm4oZG9jW2ZpZWxkLm5hbWVdKSlcblxuICAgIGRvY1Rva2Vuc1tmaWVsZC5uYW1lXSA9IGZpZWxkVG9rZW5zXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkVG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdG9rZW4gPSBmaWVsZFRva2Vuc1tpXVxuICAgICAgYWxsRG9jdW1lbnRUb2tlbnMuYWRkKHRva2VuKVxuICAgICAgdGhpcy5jb3JwdXNUb2tlbnMuYWRkKHRva2VuKVxuICAgIH1cbiAgfSwgdGhpcylcblxuICB0aGlzLmRvY3VtZW50U3RvcmUuc2V0KGRvY1JlZiwgYWxsRG9jdW1lbnRUb2tlbnMpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxEb2N1bWVudFRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IGFsbERvY3VtZW50VG9rZW5zLmVsZW1lbnRzW2ldXG4gICAgdmFyIHRmID0gMDtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5fZmllbGRzLmxlbmd0aDsgaisrKXtcbiAgICAgIHZhciBmaWVsZCA9IHRoaXMuX2ZpZWxkc1tqXVxuICAgICAgdmFyIGZpZWxkVG9rZW5zID0gZG9jVG9rZW5zW2ZpZWxkLm5hbWVdXG4gICAgICB2YXIgZmllbGRMZW5ndGggPSBmaWVsZFRva2Vucy5sZW5ndGhcblxuICAgICAgaWYgKCFmaWVsZExlbmd0aCkgY29udGludWVcblxuICAgICAgdmFyIHRva2VuQ291bnQgPSAwXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IGZpZWxkTGVuZ3RoOyBrKyspe1xuICAgICAgICBpZiAoZmllbGRUb2tlbnNba10gPT09IHRva2VuKXtcbiAgICAgICAgICB0b2tlbkNvdW50KytcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0ZiArPSAodG9rZW5Db3VudCAvIGZpZWxkTGVuZ3RoICogZmllbGQuYm9vc3QpXG4gICAgfVxuXG4gICAgdGhpcy50b2tlblN0b3JlLmFkZCh0b2tlbiwgeyByZWY6IGRvY1JlZiwgdGY6IHRmIH0pXG4gIH07XG5cbiAgaWYgKGVtaXRFdmVudCkgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnYWRkJywgZG9jLCB0aGlzKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBkb2N1bWVudCBmcm9tIHRoZSBpbmRleC5cbiAqXG4gKiBUbyBtYWtlIHN1cmUgZG9jdW1lbnRzIG5vIGxvbmdlciBzaG93IHVwIGluIHNlYXJjaCByZXN1bHRzIHRoZXkgY2FuIGJlXG4gKiByZW1vdmVkIGZyb20gdGhlIGluZGV4IHVzaW5nIHRoaXMgbWV0aG9kLlxuICpcbiAqIFRoZSBkb2N1bWVudCBwYXNzZWQgb25seSBuZWVkcyB0byBoYXZlIHRoZSBzYW1lIHJlZiBwcm9wZXJ0eSB2YWx1ZSBhcyB0aGVcbiAqIGRvY3VtZW50IHRoYXQgd2FzIGFkZGVkIHRvIHRoZSBpbmRleCwgdGhleSBjb3VsZCBiZSBjb21wbGV0ZWx5IGRpZmZlcmVudFxuICogb2JqZWN0cy5cbiAqXG4gKiBBICdyZW1vdmUnIGV2ZW50IGlzIGVtaXR0ZWQgd2l0aCB0aGUgZG9jdW1lbnQgdGhhdCBoYXMgYmVlbiByZW1vdmVkIGFuZCB0aGUgaW5kZXhcbiAqIHRoZSBkb2N1bWVudCBoYXMgYmVlbiByZW1vdmVkIGZyb20uIFRoaXMgZXZlbnQgY2FuIGJlIHNpbGVuY2VkIGJ5IHBhc3NpbmcgZmFsc2VcbiAqIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gcmVtb3ZlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvY3VtZW50IHRvIHJlbW92ZSBmcm9tIHRoZSBpbmRleC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZW1pdEV2ZW50IFdoZXRoZXIgdG8gZW1pdCByZW1vdmUgZXZlbnRzLCBkZWZhdWx0cyB0byB0cnVlXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGRvYywgZW1pdEV2ZW50KSB7XG4gIHZhciBkb2NSZWYgPSBkb2NbdGhpcy5fcmVmXSxcbiAgICAgIGVtaXRFdmVudCA9IGVtaXRFdmVudCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGVtaXRFdmVudFxuXG4gIGlmICghdGhpcy5kb2N1bWVudFN0b3JlLmhhcyhkb2NSZWYpKSByZXR1cm5cblxuICB2YXIgZG9jVG9rZW5zID0gdGhpcy5kb2N1bWVudFN0b3JlLmdldChkb2NSZWYpXG5cbiAgdGhpcy5kb2N1bWVudFN0b3JlLnJlbW92ZShkb2NSZWYpXG5cbiAgZG9jVG9rZW5zLmZvckVhY2goZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdGhpcy50b2tlblN0b3JlLnJlbW92ZSh0b2tlbiwgZG9jUmVmKVxuICB9LCB0aGlzKVxuXG4gIGlmIChlbWl0RXZlbnQpIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ3JlbW92ZScsIGRvYywgdGhpcylcbn1cblxuLyoqXG4gKiBVcGRhdGVzIGEgZG9jdW1lbnQgaW4gdGhlIGluZGV4LlxuICpcbiAqIFdoZW4gYSBkb2N1bWVudCBjb250YWluZWQgd2l0aGluIHRoZSBpbmRleCBnZXRzIHVwZGF0ZWQsIGZpZWxkcyBjaGFuZ2VkLFxuICogYWRkZWQgb3IgcmVtb3ZlZCwgdG8gbWFrZSBzdXJlIGl0IGNvcnJlY3RseSBtYXRjaGVkIGFnYWluc3Qgc2VhcmNoIHF1ZXJpZXMsXG4gKiBpdCBzaG91bGQgYmUgdXBkYXRlZCBpbiB0aGUgaW5kZXguXG4gKlxuICogVGhpcyBtZXRob2QgaXMganVzdCBhIHdyYXBwZXIgYXJvdW5kIGByZW1vdmVgIGFuZCBgYWRkYFxuICpcbiAqIEFuICd1cGRhdGUnIGV2ZW50IGlzIGVtaXR0ZWQgd2l0aCB0aGUgZG9jdW1lbnQgdGhhdCBoYXMgYmVlbiB1cGRhdGVkIGFuZCB0aGUgaW5kZXguXG4gKiBUaGlzIGV2ZW50IGNhbiBiZSBzaWxlbmNlZCBieSBwYXNzaW5nIGZhbHNlIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gdXBkYXRlLiBPbmx5XG4gKiBhbiB1cGRhdGUgZXZlbnQgd2lsbCBiZSBmaXJlZCwgdGhlICdhZGQnIGFuZCAncmVtb3ZlJyBldmVudHMgb2YgdGhlIHVuZGVybHlpbmcgY2FsbHNcbiAqIGFyZSBzaWxlbmNlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIFRoZSBkb2N1bWVudCB0byB1cGRhdGUgaW4gdGhlIGluZGV4LlxuICogQHBhcmFtIHtCb29sZWFufSBlbWl0RXZlbnQgV2hldGhlciB0byBlbWl0IHVwZGF0ZSBldmVudHMsIGRlZmF1bHRzIHRvIHRydWVcbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLnJlbW92ZVxuICogQHNlZSBJbmRleC5wcm90b3R5cGUuYWRkXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRvYywgZW1pdEV2ZW50KSB7XG4gIHZhciBlbWl0RXZlbnQgPSBlbWl0RXZlbnQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBlbWl0RXZlbnRcblxuICB0aGlzLnJlbW92ZShkb2MsIGZhbHNlKVxuICB0aGlzLmFkZChkb2MsIGZhbHNlKVxuXG4gIGlmIChlbWl0RXZlbnQpIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ3VwZGF0ZScsIGRvYywgdGhpcylcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIGRvY3VtZW50IGZyZXF1ZW5jeSBmb3IgYSB0b2tlbiB3aXRoaW4gdGhlIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gY2FsY3VsYXRlIHRoZSBpZGYgb2YuXG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5pZGZcbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuaWRmID0gZnVuY3Rpb24gKHRlcm0pIHtcbiAgdmFyIGNhY2hlS2V5ID0gXCJAXCIgKyB0ZXJtXG4gIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5faWRmQ2FjaGUsIGNhY2hlS2V5KSkgcmV0dXJuIHRoaXMuX2lkZkNhY2hlW2NhY2hlS2V5XVxuXG4gIHZhciBkb2N1bWVudEZyZXF1ZW5jeSA9IHRoaXMudG9rZW5TdG9yZS5jb3VudCh0ZXJtKSxcbiAgICAgIGlkZiA9IDFcblxuICBpZiAoZG9jdW1lbnRGcmVxdWVuY3kgPiAwKSB7XG4gICAgaWRmID0gMSArIE1hdGgubG9nKHRoaXMuZG9jdW1lbnRTdG9yZS5sZW5ndGggLyBkb2N1bWVudEZyZXF1ZW5jeSlcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9pZGZDYWNoZVtjYWNoZUtleV0gPSBpZGZcbn1cblxuLyoqXG4gKiBTZWFyY2hlcyB0aGUgaW5kZXggdXNpbmcgdGhlIHBhc3NlZCBxdWVyeS5cbiAqXG4gKiBRdWVyaWVzIHNob3VsZCBiZSBhIHN0cmluZywgbXVsdGlwbGUgd29yZHMgYXJlIGFsbG93ZWQgYW5kIHdpbGwgbGVhZCB0byBhblxuICogQU5EIGJhc2VkIHF1ZXJ5LCBlLmcuIGBpZHguc2VhcmNoKCdmb28gYmFyJylgIHdpbGwgcnVuIGEgc2VhcmNoIGZvclxuICogZG9jdW1lbnRzIGNvbnRhaW5pbmcgYm90aCAnZm9vJyBhbmQgJ2JhcicuXG4gKlxuICogQWxsIHF1ZXJ5IHRva2VucyBhcmUgcGFzc2VkIHRocm91Z2ggdGhlIHNhbWUgcGlwZWxpbmUgdGhhdCBkb2N1bWVudCB0b2tlbnNcbiAqIGFyZSBwYXNzZWQgdGhyb3VnaCwgc28gYW55IGxhbmd1YWdlIHByb2Nlc3NpbmcgaW52b2x2ZWQgd2lsbCBiZSBydW4gb24gZXZlcnlcbiAqIHF1ZXJ5IHRlcm0uXG4gKlxuICogRWFjaCBxdWVyeSB0ZXJtIGlzIGV4cGFuZGVkLCBzbyB0aGF0IHRoZSB0ZXJtICdoZScgbWlnaHQgYmUgZXhwYW5kZWQgdG9cbiAqICdoZWxsbycgYW5kICdoZWxwJyBpZiB0aG9zZSB0ZXJtcyB3ZXJlIGFscmVhZHkgaW5jbHVkZWQgaW4gdGhlIGluZGV4LlxuICpcbiAqIE1hdGNoaW5nIGRvY3VtZW50cyBhcmUgcmV0dXJuZWQgYXMgYW4gYXJyYXkgb2Ygb2JqZWN0cywgZWFjaCBvYmplY3QgY29udGFpbnNcbiAqIHRoZSBtYXRjaGluZyBkb2N1bWVudCByZWYsIGFzIHNldCBmb3IgdGhpcyBpbmRleCwgYW5kIHRoZSBzaW1pbGFyaXR5IHNjb3JlXG4gKiBmb3IgdGhpcyBkb2N1bWVudCBhZ2FpbnN0IHRoZSBxdWVyeS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIHF1ZXJ5IHRvIHNlYXJjaCB0aGUgaW5kZXggd2l0aC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5pZGZcbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLmRvY3VtZW50VmVjdG9yXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gIHZhciBxdWVyeVRva2VucyA9IHRoaXMucGlwZWxpbmUucnVuKHRoaXMudG9rZW5pemVyRm4ocXVlcnkpKSxcbiAgICAgIHF1ZXJ5VmVjdG9yID0gbmV3IGx1bnIuVmVjdG9yLFxuICAgICAgZG9jdW1lbnRTZXRzID0gW10sXG4gICAgICBmaWVsZEJvb3N0cyA9IHRoaXMuX2ZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGYpIHsgcmV0dXJuIG1lbW8gKyBmLmJvb3N0IH0sIDApXG5cbiAgdmFyIGhhc1NvbWVUb2tlbiA9IHF1ZXJ5VG9rZW5zLnNvbWUoZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW5TdG9yZS5oYXModG9rZW4pXG4gIH0sIHRoaXMpXG5cbiAgaWYgKCFoYXNTb21lVG9rZW4pIHJldHVybiBbXVxuXG4gIHF1ZXJ5VG9rZW5zXG4gICAgLmZvckVhY2goZnVuY3Rpb24gKHRva2VuLCBpLCB0b2tlbnMpIHtcbiAgICAgIHZhciB0ZiA9IDEgLyB0b2tlbnMubGVuZ3RoICogdGhpcy5fZmllbGRzLmxlbmd0aCAqIGZpZWxkQm9vc3RzLFxuICAgICAgICAgIHNlbGYgPSB0aGlzXG5cbiAgICAgIHZhciBzZXQgPSB0aGlzLnRva2VuU3RvcmUuZXhwYW5kKHRva2VuKS5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGtleSkge1xuICAgICAgICB2YXIgcG9zID0gc2VsZi5jb3JwdXNUb2tlbnMuaW5kZXhPZihrZXkpLFxuICAgICAgICAgICAgaWRmID0gc2VsZi5pZGYoa2V5KSxcbiAgICAgICAgICAgIHNpbWlsYXJpdHlCb29zdCA9IDEsXG4gICAgICAgICAgICBzZXQgPSBuZXcgbHVuci5Tb3J0ZWRTZXRcblxuICAgICAgICAvLyBpZiB0aGUgZXhwYW5kZWQga2V5IGlzIG5vdCBhbiBleGFjdCBtYXRjaCB0byB0aGUgdG9rZW4gdGhlblxuICAgICAgICAvLyBwZW5hbGlzZSB0aGUgc2NvcmUgZm9yIHRoaXMga2V5IGJ5IGhvdyBkaWZmZXJlbnQgdGhlIGtleSBpc1xuICAgICAgICAvLyB0byB0aGUgdG9rZW4uXG4gICAgICAgIGlmIChrZXkgIT09IHRva2VuKSB7XG4gICAgICAgICAgdmFyIGRpZmYgPSBNYXRoLm1heCgzLCBrZXkubGVuZ3RoIC0gdG9rZW4ubGVuZ3RoKVxuICAgICAgICAgIHNpbWlsYXJpdHlCb29zdCA9IDEgLyBNYXRoLmxvZyhkaWZmKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBxdWVyeSB0Zi1pZGYgc2NvcmUgZm9yIHRoaXMgdG9rZW5cbiAgICAgICAgLy8gYXBwbHlpbmcgYW4gc2ltaWxhcml0eUJvb3N0IHRvIGVuc3VyZSBleGFjdCBtYXRjaGVzXG4gICAgICAgIC8vIHRoZXNlIHJhbmsgaGlnaGVyIHRoYW4gZXhwYW5kZWQgdGVybXNcbiAgICAgICAgaWYgKHBvcyA+IC0xKSBxdWVyeVZlY3Rvci5pbnNlcnQocG9zLCB0ZiAqIGlkZiAqIHNpbWlsYXJpdHlCb29zdClcblxuICAgICAgICAvLyBhZGQgYWxsIHRoZSBkb2N1bWVudHMgdGhhdCBoYXZlIHRoaXMga2V5IGludG8gYSBzZXRcbiAgICAgICAgLy8gZW5zdXJpbmcgdGhhdCB0aGUgdHlwZSBvZiBrZXkgaXMgcHJlc2VydmVkXG4gICAgICAgIHZhciBtYXRjaGluZ0RvY3VtZW50cyA9IHNlbGYudG9rZW5TdG9yZS5nZXQoa2V5KSxcbiAgICAgICAgICAgIHJlZnMgPSBPYmplY3Qua2V5cyhtYXRjaGluZ0RvY3VtZW50cyksXG4gICAgICAgICAgICByZWZzTGVuID0gcmVmcy5sZW5ndGhcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZnNMZW47IGkrKykge1xuICAgICAgICAgIHNldC5hZGQobWF0Y2hpbmdEb2N1bWVudHNbcmVmc1tpXV0ucmVmKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lbW8udW5pb24oc2V0KVxuICAgICAgfSwgbmV3IGx1bnIuU29ydGVkU2V0KVxuXG4gICAgICBkb2N1bWVudFNldHMucHVzaChzZXQpXG4gICAgfSwgdGhpcylcblxuICB2YXIgZG9jdW1lbnRTZXQgPSBkb2N1bWVudFNldHMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBzZXQpIHtcbiAgICByZXR1cm4gbWVtby5pbnRlcnNlY3Qoc2V0KVxuICB9KVxuXG4gIHJldHVybiBkb2N1bWVudFNldFxuICAgIC5tYXAoZnVuY3Rpb24gKHJlZikge1xuICAgICAgcmV0dXJuIHsgcmVmOiByZWYsIHNjb3JlOiBxdWVyeVZlY3Rvci5zaW1pbGFyaXR5KHRoaXMuZG9jdW1lbnRWZWN0b3IocmVmKSkgfVxuICAgIH0sIHRoaXMpXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZVxuICAgIH0pXG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgdmVjdG9yIGNvbnRhaW5pbmcgYWxsIHRoZSB0b2tlbnMgaW4gdGhlIGRvY3VtZW50IG1hdGNoaW5nIHRoZVxuICogcGFzc2VkIGRvY3VtZW50UmVmLlxuICpcbiAqIFRoZSB2ZWN0b3IgY29udGFpbnMgdGhlIHRmLWlkZiBzY29yZSBmb3IgZWFjaCB0b2tlbiBjb250YWluZWQgaW4gdGhlXG4gKiBkb2N1bWVudCB3aXRoIHRoZSBwYXNzZWQgZG9jdW1lbnRSZWYuICBUaGUgdmVjdG9yIHdpbGwgY29udGFpbiBhbiBlbGVtZW50XG4gKiBmb3IgZXZlcnkgdG9rZW4gaW4gdGhlIGluZGV4ZXMgY29ycHVzLCBpZiB0aGUgZG9jdW1lbnQgZG9lcyBub3QgY29udGFpbiB0aGF0XG4gKiB0b2tlbiB0aGUgZWxlbWVudCB3aWxsIGJlIDAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRvY3VtZW50UmVmIFRoZSByZWYgdG8gZmluZCB0aGUgZG9jdW1lbnQgd2l0aC5cbiAqIEByZXR1cm5zIHtsdW5yLlZlY3Rvcn1cbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuZG9jdW1lbnRWZWN0b3IgPSBmdW5jdGlvbiAoZG9jdW1lbnRSZWYpIHtcbiAgdmFyIGRvY3VtZW50VG9rZW5zID0gdGhpcy5kb2N1bWVudFN0b3JlLmdldChkb2N1bWVudFJlZiksXG4gICAgICBkb2N1bWVudFRva2Vuc0xlbmd0aCA9IGRvY3VtZW50VG9rZW5zLmxlbmd0aCxcbiAgICAgIGRvY3VtZW50VmVjdG9yID0gbmV3IGx1bnIuVmVjdG9yXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2N1bWVudFRva2Vuc0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gZG9jdW1lbnRUb2tlbnMuZWxlbWVudHNbaV0sXG4gICAgICAgIHRmID0gdGhpcy50b2tlblN0b3JlLmdldCh0b2tlbilbZG9jdW1lbnRSZWZdLnRmLFxuICAgICAgICBpZGYgPSB0aGlzLmlkZih0b2tlbilcblxuICAgIGRvY3VtZW50VmVjdG9yLmluc2VydCh0aGlzLmNvcnB1c1Rva2Vucy5pbmRleE9mKHRva2VuKSwgdGYgKiBpZGYpXG4gIH07XG5cbiAgcmV0dXJuIGRvY3VtZW50VmVjdG9yXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbmRleCByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiBsdW5yLnZlcnNpb24sXG4gICAgZmllbGRzOiB0aGlzLl9maWVsZHMsXG4gICAgcmVmOiB0aGlzLl9yZWYsXG4gICAgdG9rZW5pemVyOiB0aGlzLnRva2VuaXplckZuLmxhYmVsLFxuICAgIGRvY3VtZW50U3RvcmU6IHRoaXMuZG9jdW1lbnRTdG9yZS50b0pTT04oKSxcbiAgICB0b2tlblN0b3JlOiB0aGlzLnRva2VuU3RvcmUudG9KU09OKCksXG4gICAgY29ycHVzVG9rZW5zOiB0aGlzLmNvcnB1c1Rva2Vucy50b0pTT04oKSxcbiAgICBwaXBlbGluZTogdGhpcy5waXBlbGluZS50b0pTT04oKVxuICB9XG59XG5cbi8qKlxuICogQXBwbGllcyBhIHBsdWdpbiB0byB0aGUgY3VycmVudCBpbmRleC5cbiAqXG4gKiBBIHBsdWdpbiBpcyBhIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdpdGggdGhlIGluZGV4IGFzIGl0cyBjb250ZXh0LlxuICogUGx1Z2lucyBjYW4gYmUgdXNlZCB0byBjdXN0b21pc2Ugb3IgZXh0ZW5kIHRoZSBiZWhhdmlvdXIgdGhlIGluZGV4XG4gKiBpbiBzb21lIHdheS4gQSBwbHVnaW4gaXMganVzdCBhIGZ1bmN0aW9uLCB0aGF0IGVuY2Fwc3VsYXRlZCB0aGUgY3VzdG9tXG4gKiBiZWhhdmlvdXIgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgaW5kZXguXG4gKlxuICogVGhlIHBsdWdpbiBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBpbmRleCBhcyBpdHMgYXJndW1lbnQsIGFkZGl0aW9uYWxcbiAqIGFyZ3VtZW50cyBjYW4gYWxzbyBiZSBwYXNzZWQgd2hlbiBjYWxsaW5nIHVzZS4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkXG4gKiB3aXRoIHRoZSBpbmRleCBhcyBpdHMgY29udGV4dC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICB2YXIgbXlQbHVnaW4gPSBmdW5jdGlvbiAoaWR4LCBhcmcxLCBhcmcyKSB7XG4gKiAgICAgICAvLyBgdGhpc2AgaXMgdGhlIGluZGV4IHRvIGJlIGV4dGVuZGVkXG4gKiAgICAgICAvLyBhcHBseSBhbnkgZXh0ZW5zaW9ucyBldGMgaGVyZS5cbiAqICAgICB9XG4gKlxuICogICAgIHZhciBpZHggPSBsdW5yKGZ1bmN0aW9uICgpIHtcbiAqICAgICAgIHRoaXMudXNlKG15UGx1Z2luLCAnYXJnMScsICdhcmcyJylcbiAqICAgICB9KVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBsdWdpbiBUaGUgcGx1Z2luIHRvIGFwcGx5LlxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gIGFyZ3MudW5zaGlmdCh0aGlzKVxuICBwbHVnaW4uYXBwbHkodGhpcywgYXJncylcbn1cbi8qIVxuICogbHVuci5TdG9yZVxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5TdG9yZSBpcyBhIHNpbXBsZSBrZXktdmFsdWUgc3RvcmUgdXNlZCBmb3Igc3RvcmluZyBzZXRzIG9mIHRva2VucyBmb3JcbiAqIGRvY3VtZW50cyBzdG9yZWQgaW4gaW5kZXguXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAbW9kdWxlXG4gKi9cbmx1bnIuU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc3RvcmUgPSB7fVxuICB0aGlzLmxlbmd0aCA9IDBcbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBzdG9yZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCBzdG9yZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuU3RvcmV9XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIHZhciBzdG9yZSA9IG5ldyB0aGlzXG5cbiAgc3RvcmUubGVuZ3RoID0gc2VyaWFsaXNlZERhdGEubGVuZ3RoXG4gIHN0b3JlLnN0b3JlID0gT2JqZWN0LmtleXMoc2VyaWFsaXNlZERhdGEuc3RvcmUpLnJlZHVjZShmdW5jdGlvbiAobWVtbywga2V5KSB7XG4gICAgbWVtb1trZXldID0gbHVuci5Tb3J0ZWRTZXQubG9hZChzZXJpYWxpc2VkRGF0YS5zdG9yZVtrZXldKVxuICAgIHJldHVybiBtZW1vXG4gIH0sIHt9KVxuXG4gIHJldHVybiBzdG9yZVxufVxuXG4vKipcbiAqIFN0b3JlcyB0aGUgZ2l2ZW4gdG9rZW5zIGluIHRoZSBzdG9yZSBhZ2FpbnN0IHRoZSBnaXZlbiBpZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGtleSB1c2VkIHRvIHN0b3JlIHRoZSB0b2tlbnMgYWdhaW5zdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbnMgVGhlIHRva2VucyB0byBzdG9yZSBhZ2FpbnN0IHRoZSBrZXkuXG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGlkLCB0b2tlbnMpIHtcbiAgaWYgKCF0aGlzLmhhcyhpZCkpIHRoaXMubGVuZ3RoKytcbiAgdGhpcy5zdG9yZVtpZF0gPSB0b2tlbnNcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIHRva2VucyBmcm9tIHRoZSBzdG9yZSBmb3IgYSBnaXZlbiBrZXkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGlkIFRoZSBrZXkgdG8gbG9va3VwIGFuZCByZXRyaWV2ZSBmcm9tIHRoZSBzdG9yZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiB0aGlzLnN0b3JlW2lkXVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBzdG9yZSBjb250YWlucyBhIGtleS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGlkIHRvIGxvb2sgdXAgaW4gdGhlIHN0b3JlLlxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBpZCBpbiB0aGlzLnN0b3JlXG59XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgdmFsdWUgZm9yIGEga2V5IGluIHRoZSBzdG9yZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaWQgVGhlIGlkIHRvIHJlbW92ZSBmcm9tIHRoZSBzdG9yZS5cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgaWYgKCF0aGlzLmhhcyhpZCkpIHJldHVyblxuXG4gIGRlbGV0ZSB0aGlzLnN0b3JlW2lkXVxuICB0aGlzLmxlbmd0aC0tXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzdG9yZSByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICBsZW5ndGg6IHRoaXMubGVuZ3RoXG4gIH1cbn1cblxuLyohXG4gKiBsdW5yLnN0ZW1tZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqIEluY2x1ZGVzIGNvZGUgZnJvbSAtIGh0dHA6Ly90YXJ0YXJ1cy5vcmcvfm1hcnRpbi9Qb3J0ZXJTdGVtbWVyL2pzLnR4dFxuICovXG5cbi8qKlxuICogbHVuci5zdGVtbWVyIGlzIGFuIGVuZ2xpc2ggbGFuZ3VhZ2Ugc3RlbW1lciwgdGhpcyBpcyBhIEphdmFTY3JpcHRcbiAqIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQb3J0ZXJTdGVtbWVyIHRha2VuIGZyb20gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluXG4gKlxuICogQG1vZHVsZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIHN0ZW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci5zdGVtbWVyID0gKGZ1bmN0aW9uKCl7XG4gIHZhciBzdGVwMmxpc3QgPSB7XG4gICAgICBcImF0aW9uYWxcIiA6IFwiYXRlXCIsXG4gICAgICBcInRpb25hbFwiIDogXCJ0aW9uXCIsXG4gICAgICBcImVuY2lcIiA6IFwiZW5jZVwiLFxuICAgICAgXCJhbmNpXCIgOiBcImFuY2VcIixcbiAgICAgIFwiaXplclwiIDogXCJpemVcIixcbiAgICAgIFwiYmxpXCIgOiBcImJsZVwiLFxuICAgICAgXCJhbGxpXCIgOiBcImFsXCIsXG4gICAgICBcImVudGxpXCIgOiBcImVudFwiLFxuICAgICAgXCJlbGlcIiA6IFwiZVwiLFxuICAgICAgXCJvdXNsaVwiIDogXCJvdXNcIixcbiAgICAgIFwiaXphdGlvblwiIDogXCJpemVcIixcbiAgICAgIFwiYXRpb25cIiA6IFwiYXRlXCIsXG4gICAgICBcImF0b3JcIiA6IFwiYXRlXCIsXG4gICAgICBcImFsaXNtXCIgOiBcImFsXCIsXG4gICAgICBcIml2ZW5lc3NcIiA6IFwiaXZlXCIsXG4gICAgICBcImZ1bG5lc3NcIiA6IFwiZnVsXCIsXG4gICAgICBcIm91c25lc3NcIiA6IFwib3VzXCIsXG4gICAgICBcImFsaXRpXCIgOiBcImFsXCIsXG4gICAgICBcIml2aXRpXCIgOiBcIml2ZVwiLFxuICAgICAgXCJiaWxpdGlcIiA6IFwiYmxlXCIsXG4gICAgICBcImxvZ2lcIiA6IFwibG9nXCJcbiAgICB9LFxuXG4gICAgc3RlcDNsaXN0ID0ge1xuICAgICAgXCJpY2F0ZVwiIDogXCJpY1wiLFxuICAgICAgXCJhdGl2ZVwiIDogXCJcIixcbiAgICAgIFwiYWxpemVcIiA6IFwiYWxcIixcbiAgICAgIFwiaWNpdGlcIiA6IFwiaWNcIixcbiAgICAgIFwiaWNhbFwiIDogXCJpY1wiLFxuICAgICAgXCJmdWxcIiA6IFwiXCIsXG4gICAgICBcIm5lc3NcIiA6IFwiXCJcbiAgICB9LFxuXG4gICAgYyA9IFwiW15hZWlvdV1cIiwgICAgICAgICAgLy8gY29uc29uYW50XG4gICAgdiA9IFwiW2FlaW91eV1cIiwgICAgICAgICAgLy8gdm93ZWxcbiAgICBDID0gYyArIFwiW15hZWlvdXldKlwiLCAgICAvLyBjb25zb25hbnQgc2VxdWVuY2VcbiAgICBWID0gdiArIFwiW2FlaW91XSpcIiwgICAgICAvLyB2b3dlbCBzZXF1ZW5jZVxuXG4gICAgbWdyMCA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQywgICAgICAgICAgICAgICAvLyBbQ11WQy4uLiBpcyBtPjBcbiAgICBtZXExID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDICsgXCIoXCIgKyBWICsgXCIpPyRcIiwgIC8vIFtDXVZDW1ZdIGlzIG09MVxuICAgIG1ncjEgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgViArIEMgKyBWICsgQywgICAgICAgLy8gW0NdVkNWQy4uLiBpcyBtPjFcbiAgICBzX3YgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgdjsgICAgICAgICAgICAgICAgICAgLy8gdm93ZWwgaW4gc3RlbVxuXG4gIHZhciByZV9tZ3IwID0gbmV3IFJlZ0V4cChtZ3IwKTtcbiAgdmFyIHJlX21ncjEgPSBuZXcgUmVnRXhwKG1ncjEpO1xuICB2YXIgcmVfbWVxMSA9IG5ldyBSZWdFeHAobWVxMSk7XG4gIHZhciByZV9zX3YgPSBuZXcgUmVnRXhwKHNfdik7XG5cbiAgdmFyIHJlXzFhID0gL14oLis/KShzc3xpKWVzJC87XG4gIHZhciByZTJfMWEgPSAvXiguKz8pKFtec10pcyQvO1xuICB2YXIgcmVfMWIgPSAvXiguKz8pZWVkJC87XG4gIHZhciByZTJfMWIgPSAvXiguKz8pKGVkfGluZykkLztcbiAgdmFyIHJlXzFiXzIgPSAvLiQvO1xuICB2YXIgcmUyXzFiXzIgPSAvKGF0fGJsfGl6KSQvO1xuICB2YXIgcmUzXzFiXzIgPSBuZXcgUmVnRXhwKFwiKFteYWVpb3V5bHN6XSlcXFxcMSRcIik7XG4gIHZhciByZTRfMWJfMiA9IG5ldyBSZWdFeHAoXCJeXCIgKyBDICsgdiArIFwiW15hZWlvdXd4eV0kXCIpO1xuXG4gIHZhciByZV8xYyA9IC9eKC4rP1teYWVpb3VdKXkkLztcbiAgdmFyIHJlXzIgPSAvXiguKz8pKGF0aW9uYWx8dGlvbmFsfGVuY2l8YW5jaXxpemVyfGJsaXxhbGxpfGVudGxpfGVsaXxvdXNsaXxpemF0aW9ufGF0aW9ufGF0b3J8YWxpc218aXZlbmVzc3xmdWxuZXNzfG91c25lc3N8YWxpdGl8aXZpdGl8YmlsaXRpfGxvZ2kpJC87XG5cbiAgdmFyIHJlXzMgPSAvXiguKz8pKGljYXRlfGF0aXZlfGFsaXplfGljaXRpfGljYWx8ZnVsfG5lc3MpJC87XG5cbiAgdmFyIHJlXzQgPSAvXiguKz8pKGFsfGFuY2V8ZW5jZXxlcnxpY3xhYmxlfGlibGV8YW50fGVtZW50fG1lbnR8ZW50fG91fGlzbXxhdGV8aXRpfG91c3xpdmV8aXplKSQvO1xuICB2YXIgcmUyXzQgPSAvXiguKz8pKHN8dCkoaW9uKSQvO1xuXG4gIHZhciByZV81ID0gL14oLis/KWUkLztcbiAgdmFyIHJlXzVfMSA9IC9sbCQvO1xuICB2YXIgcmUzXzUgPSBuZXcgUmVnRXhwKFwiXlwiICsgQyArIHYgKyBcIlteYWVpb3V3eHldJFwiKTtcblxuICB2YXIgcG9ydGVyU3RlbW1lciA9IGZ1bmN0aW9uIHBvcnRlclN0ZW1tZXIodykge1xuICAgIHZhciAgIHN0ZW0sXG4gICAgICBzdWZmaXgsXG4gICAgICBmaXJzdGNoLFxuICAgICAgcmUsXG4gICAgICByZTIsXG4gICAgICByZTMsXG4gICAgICByZTQ7XG5cbiAgICBpZiAody5sZW5ndGggPCAzKSB7IHJldHVybiB3OyB9XG5cbiAgICBmaXJzdGNoID0gdy5zdWJzdHIoMCwxKTtcbiAgICBpZiAoZmlyc3RjaCA9PSBcInlcIikge1xuICAgICAgdyA9IGZpcnN0Y2gudG9VcHBlckNhc2UoKSArIHcuc3Vic3RyKDEpO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMWFcbiAgICByZSA9IHJlXzFhXG4gICAgcmUyID0gcmUyXzFhO1xuXG4gICAgaWYgKHJlLnRlc3QodykpIHsgdyA9IHcucmVwbGFjZShyZSxcIiQxJDJcIik7IH1cbiAgICBlbHNlIGlmIChyZTIudGVzdCh3KSkgeyB3ID0gdy5yZXBsYWNlKHJlMixcIiQxJDJcIik7IH1cblxuICAgIC8vIFN0ZXAgMWJcbiAgICByZSA9IHJlXzFiO1xuICAgIHJlMiA9IHJlMl8xYjtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KGZwWzFdKSkge1xuICAgICAgICByZSA9IHJlXzFiXzI7XG4gICAgICAgIHcgPSB3LnJlcGxhY2UocmUsXCJcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZTIudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUyLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZTIgPSByZV9zX3Y7XG4gICAgICBpZiAocmUyLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICAgIHJlMiA9IHJlMl8xYl8yO1xuICAgICAgICByZTMgPSByZTNfMWJfMjtcbiAgICAgICAgcmU0ID0gcmU0XzFiXzI7XG4gICAgICAgIGlmIChyZTIudGVzdCh3KSkgeyAgdyA9IHcgKyBcImVcIjsgfVxuICAgICAgICBlbHNlIGlmIChyZTMudGVzdCh3KSkgeyByZSA9IHJlXzFiXzI7IHcgPSB3LnJlcGxhY2UocmUsXCJcIik7IH1cbiAgICAgICAgZWxzZSBpZiAocmU0LnRlc3QodykpIHsgdyA9IHcgKyBcImVcIjsgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgMWMgLSByZXBsYWNlIHN1ZmZpeCB5IG9yIFkgYnkgaSBpZiBwcmVjZWRlZCBieSBhIG5vbi12b3dlbCB3aGljaCBpcyBub3QgdGhlIGZpcnN0IGxldHRlciBvZiB0aGUgd29yZCAoc28gY3J5IC0+IGNyaSwgYnkgLT4gYnksIHNheSAtPiBzYXkpXG4gICAgcmUgPSByZV8xYztcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHcgPSBzdGVtICsgXCJpXCI7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAyXG4gICAgcmUgPSByZV8yO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgc3VmZml4ID0gZnBbMl07XG4gICAgICByZSA9IHJlX21ncjA7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbSArIHN0ZXAybGlzdFtzdWZmaXhdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgM1xuICAgIHJlID0gcmVfMztcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHN1ZmZpeCA9IGZwWzJdO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW0gKyBzdGVwM2xpc3Rbc3VmZml4XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDRcbiAgICByZSA9IHJlXzQ7XG4gICAgcmUyID0gcmUyXzQ7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZSA9IHJlX21ncjE7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZTIuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXSArIGZwWzJdO1xuICAgICAgcmUyID0gcmVfbWdyMTtcbiAgICAgIGlmIChyZTIudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDVcbiAgICByZSA9IHJlXzU7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICByZSA9IHJlX21ncjE7XG4gICAgICByZTIgPSByZV9tZXExO1xuICAgICAgcmUzID0gcmUzXzU7XG4gICAgICBpZiAocmUudGVzdChzdGVtKSB8fCAocmUyLnRlc3Qoc3RlbSkgJiYgIShyZTMudGVzdChzdGVtKSkpKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlID0gcmVfNV8xO1xuICAgIHJlMiA9IHJlX21ncjE7XG4gICAgaWYgKHJlLnRlc3QodykgJiYgcmUyLnRlc3QodykpIHtcbiAgICAgIHJlID0gcmVfMWJfMjtcbiAgICAgIHcgPSB3LnJlcGxhY2UocmUsXCJcIik7XG4gICAgfVxuXG4gICAgLy8gYW5kIHR1cm4gaW5pdGlhbCBZIGJhY2sgdG8geVxuXG4gICAgaWYgKGZpcnN0Y2ggPT0gXCJ5XCIpIHtcbiAgICAgIHcgPSBmaXJzdGNoLnRvTG93ZXJDYXNlKCkgKyB3LnN1YnN0cigxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdztcbiAgfTtcblxuICByZXR1cm4gcG9ydGVyU3RlbW1lcjtcbn0pKCk7XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnN0ZW1tZXIsICdzdGVtbWVyJylcbi8qIVxuICogbHVuci5zdG9wV29yZEZpbHRlclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyIGJ1aWxkcyBhIHN0b3BXb3JkRmlsdGVyIGZ1bmN0aW9uIGZyb20gdGhlIHByb3ZpZGVkXG4gKiBsaXN0IG9mIHN0b3Agd29yZHMuXG4gKlxuICogVGhlIGJ1aWx0IGluIGx1bnIuc3RvcFdvcmRGaWx0ZXIgaXMgYnVpbHQgdXNpbmcgdGhpcyBnZW5lcmF0b3IgYW5kIGNhbiBiZSB1c2VkXG4gKiB0byBnZW5lcmF0ZSBjdXN0b20gc3RvcFdvcmRGaWx0ZXJzIGZvciBhcHBsaWNhdGlvbnMgb3Igbm9uIEVuZ2xpc2ggbGFuZ3VhZ2VzLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7QXJyYXl9IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICogQHNlZSBsdW5yLlBpcGVsaW5lXG4gKiBAc2VlIGx1bnIuc3RvcFdvcmRGaWx0ZXJcbiAqL1xubHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyID0gZnVuY3Rpb24gKHN0b3BXb3Jkcykge1xuICB2YXIgd29yZHMgPSBzdG9wV29yZHMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBzdG9wV29yZCkge1xuICAgIG1lbW9bc3RvcFdvcmRdID0gc3RvcFdvcmRcbiAgICByZXR1cm4gbWVtb1xuICB9LCB7fSlcblxuICByZXR1cm4gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgaWYgKHRva2VuICYmIHdvcmRzW3Rva2VuXSAhPT0gdG9rZW4pIHJldHVybiB0b2tlblxuICB9XG59XG5cbi8qKlxuICogbHVuci5zdG9wV29yZEZpbHRlciBpcyBhbiBFbmdsaXNoIGxhbmd1YWdlIHN0b3Agd29yZCBsaXN0IGZpbHRlciwgYW55IHdvcmRzXG4gKiBjb250YWluZWQgaW4gdGhlIGxpc3Qgd2lsbCBub3QgYmUgcGFzc2VkIHRocm91Z2ggdGhlIGZpbHRlci5cbiAqXG4gKiBUaGlzIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgaW4gdGhlIFBpcGVsaW5lLiBJZiB0aGUgdG9rZW4gZG9lcyBub3QgcGFzcyB0aGVcbiAqIGZpbHRlciB0aGVuIHVuZGVmaW5lZCB3aWxsIGJlIHJldHVybmVkLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci5zdG9wV29yZEZpbHRlciA9IGx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlcihbXG4gICdhJyxcbiAgJ2FibGUnLFxuICAnYWJvdXQnLFxuICAnYWNyb3NzJyxcbiAgJ2FmdGVyJyxcbiAgJ2FsbCcsXG4gICdhbG1vc3QnLFxuICAnYWxzbycsXG4gICdhbScsXG4gICdhbW9uZycsXG4gICdhbicsXG4gICdhbmQnLFxuICAnYW55JyxcbiAgJ2FyZScsXG4gICdhcycsXG4gICdhdCcsXG4gICdiZScsXG4gICdiZWNhdXNlJyxcbiAgJ2JlZW4nLFxuICAnYnV0JyxcbiAgJ2J5JyxcbiAgJ2NhbicsXG4gICdjYW5ub3QnLFxuICAnY291bGQnLFxuICAnZGVhcicsXG4gICdkaWQnLFxuICAnZG8nLFxuICAnZG9lcycsXG4gICdlaXRoZXInLFxuICAnZWxzZScsXG4gICdldmVyJyxcbiAgJ2V2ZXJ5JyxcbiAgJ2ZvcicsXG4gICdmcm9tJyxcbiAgJ2dldCcsXG4gICdnb3QnLFxuICAnaGFkJyxcbiAgJ2hhcycsXG4gICdoYXZlJyxcbiAgJ2hlJyxcbiAgJ2hlcicsXG4gICdoZXJzJyxcbiAgJ2hpbScsXG4gICdoaXMnLFxuICAnaG93JyxcbiAgJ2hvd2V2ZXInLFxuICAnaScsXG4gICdpZicsXG4gICdpbicsXG4gICdpbnRvJyxcbiAgJ2lzJyxcbiAgJ2l0JyxcbiAgJ2l0cycsXG4gICdqdXN0JyxcbiAgJ2xlYXN0JyxcbiAgJ2xldCcsXG4gICdsaWtlJyxcbiAgJ2xpa2VseScsXG4gICdtYXknLFxuICAnbWUnLFxuICAnbWlnaHQnLFxuICAnbW9zdCcsXG4gICdtdXN0JyxcbiAgJ215JyxcbiAgJ25laXRoZXInLFxuICAnbm8nLFxuICAnbm9yJyxcbiAgJ25vdCcsXG4gICdvZicsXG4gICdvZmYnLFxuICAnb2Z0ZW4nLFxuICAnb24nLFxuICAnb25seScsXG4gICdvcicsXG4gICdvdGhlcicsXG4gICdvdXInLFxuICAnb3duJyxcbiAgJ3JhdGhlcicsXG4gICdzYWlkJyxcbiAgJ3NheScsXG4gICdzYXlzJyxcbiAgJ3NoZScsXG4gICdzaG91bGQnLFxuICAnc2luY2UnLFxuICAnc28nLFxuICAnc29tZScsXG4gICd0aGFuJyxcbiAgJ3RoYXQnLFxuICAndGhlJyxcbiAgJ3RoZWlyJyxcbiAgJ3RoZW0nLFxuICAndGhlbicsXG4gICd0aGVyZScsXG4gICd0aGVzZScsXG4gICd0aGV5JyxcbiAgJ3RoaXMnLFxuICAndGlzJyxcbiAgJ3RvJyxcbiAgJ3RvbycsXG4gICd0d2FzJyxcbiAgJ3VzJyxcbiAgJ3dhbnRzJyxcbiAgJ3dhcycsXG4gICd3ZScsXG4gICd3ZXJlJyxcbiAgJ3doYXQnLFxuICAnd2hlbicsXG4gICd3aGVyZScsXG4gICd3aGljaCcsXG4gICd3aGlsZScsXG4gICd3aG8nLFxuICAnd2hvbScsXG4gICd3aHknLFxuICAnd2lsbCcsXG4gICd3aXRoJyxcbiAgJ3dvdWxkJyxcbiAgJ3lldCcsXG4gICd5b3UnLFxuICAneW91cidcbl0pXG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnN0b3BXb3JkRmlsdGVyLCAnc3RvcFdvcmRGaWx0ZXInKVxuLyohXG4gKiBsdW5yLnRyaW1tZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIudHJpbW1lciBpcyBhIHBpcGVsaW5lIGZ1bmN0aW9uIGZvciB0cmltbWluZyBub24gd29yZFxuICogY2hhcmFjdGVycyBmcm9tIHRoZSBiZWdpbmluZyBhbmQgZW5kIG9mIHRva2VucyBiZWZvcmUgdGhleVxuICogZW50ZXIgdGhlIGluZGV4LlxuICpcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gbWF5IG5vdCB3b3JrIGNvcnJlY3RseSBmb3Igbm9uIGxhdGluXG4gKiBjaGFyYWN0ZXJzIGFuZCBzaG91bGQgZWl0aGVyIGJlIHJlbW92ZWQgb3IgYWRhcHRlZCBmb3IgdXNlXG4gKiB3aXRoIGxhbmd1YWdlcyB3aXRoIG5vbi1sYXRpbiBjaGFyYWN0ZXJzLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci50cmltbWVyID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIHJldHVybiB0b2tlbi5yZXBsYWNlKC9eXFxXKy8sICcnKS5yZXBsYWNlKC9cXFcrJC8sICcnKVxufVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci50cmltbWVyLCAndHJpbW1lcicpXG4vKiFcbiAqIGx1bnIuc3RlbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICogSW5jbHVkZXMgY29kZSBmcm9tIC0gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluL1BvcnRlclN0ZW1tZXIvanMudHh0XG4gKi9cblxuLyoqXG4gKiBsdW5yLlRva2VuU3RvcmUgaXMgdXNlZCBmb3IgZWZmaWNpZW50IHN0b3JpbmcgYW5kIGxvb2t1cCBvZiB0aGUgcmV2ZXJzZVxuICogaW5kZXggb2YgdG9rZW4gdG8gZG9jdW1lbnQgcmVmLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlRva2VuU3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucm9vdCA9IHsgZG9jczoge30gfVxuICB0aGlzLmxlbmd0aCA9IDBcbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCB0b2tlbiBzdG9yZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCB0b2tlbiBzdG9yZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuVG9rZW5TdG9yZX1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5sb2FkID0gZnVuY3Rpb24gKHNlcmlhbGlzZWREYXRhKSB7XG4gIHZhciBzdG9yZSA9IG5ldyB0aGlzXG5cbiAgc3RvcmUucm9vdCA9IHNlcmlhbGlzZWREYXRhLnJvb3RcbiAgc3RvcmUubGVuZ3RoID0gc2VyaWFsaXNlZERhdGEubGVuZ3RoXG5cbiAgcmV0dXJuIHN0b3JlXG59XG5cbi8qKlxuICogQWRkcyBhIG5ldyB0b2tlbiBkb2MgcGFpciB0byB0aGUgc3RvcmUuXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIHN0b3JlIHRoZSBkb2MgdW5kZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgVGhlIGRvYyB0byBzdG9yZSBhZ2FpbnN0IHRoZSB0b2tlblxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydCBsb29raW5nIGZvciB0aGVcbiAqIGNvcnJlY3QgcGxhY2UgdG8gZW50ZXIgdGhlIGRvYywgYnkgZGVmYXVsdCB0aGUgcm9vdCBvZiB0aGlzIGx1bnIuVG9rZW5TdG9yZVxuICogaXMgdXNlZC5cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRva2VuLCBkb2MsIHJvb3QpIHtcbiAgdmFyIHJvb3QgPSByb290IHx8IHRoaXMucm9vdCxcbiAgICAgIGtleSA9IHRva2VuLmNoYXJBdCgwKSxcbiAgICAgIHJlc3QgPSB0b2tlbi5zbGljZSgxKVxuXG4gIGlmICghKGtleSBpbiByb290KSkgcm9vdFtrZXldID0ge2RvY3M6IHt9fVxuXG4gIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJvb3Rba2V5XS5kb2NzW2RvYy5yZWZdID0gZG9jXG4gICAgdGhpcy5sZW5ndGggKz0gMVxuICAgIHJldHVyblxuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmFkZChyZXN0LCBkb2MsIHJvb3Rba2V5XSlcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMga2V5IGlzIGNvbnRhaW5lZCB3aXRoaW4gdGhpcyBsdW5yLlRva2VuU3RvcmUuXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGNoZWNrIGZvclxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydFxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIGZhbHNlXG5cbiAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFub2RlW3Rva2VuLmNoYXJBdChpKV0pIHJldHVybiBmYWxzZVxuXG4gICAgbm9kZSA9IG5vZGVbdG9rZW4uY2hhckF0KGkpXVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBhIG5vZGUgZnJvbSB0aGUgdG9rZW4gc3RvcmUgZm9yIGEgZ2l2ZW4gdG9rZW4uXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGdldCB0aGUgbm9kZSBmb3IuXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0LlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBzZWUgVG9rZW5TdG9yZS5wcm90b3R5cGUuZ2V0XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmdldE5vZGUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIHt9XG5cbiAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFub2RlW3Rva2VuLmNoYXJBdChpKV0pIHJldHVybiB7fVxuXG4gICAgbm9kZSA9IG5vZGVbdG9rZW4uY2hhckF0KGkpXVxuICB9XG5cbiAgcmV0dXJuIG5vZGVcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgZG9jdW1lbnRzIGZvciBhIG5vZGUgZm9yIHRoZSBnaXZlbiB0b2tlbi5cbiAqXG4gKiBCeSBkZWZhdWx0IHRoaXMgZnVuY3Rpb24gc3RhcnRzIGF0IHRoZSByb290IG9mIHRoZSBjdXJyZW50IHN0b3JlLCBob3dldmVyXG4gKiBpdCBjYW4gc3RhcnQgYXQgYW55IG5vZGUgb2YgYW55IHRva2VuIHN0b3JlIGlmIHJlcXVpcmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gZ2V0IHRoZSBkb2N1bWVudHMgZm9yLlxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh0b2tlbiwgcm9vdCkge1xuICByZXR1cm4gdGhpcy5nZXROb2RlKHRva2VuLCByb290KS5kb2NzIHx8IHt9XG59XG5cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuY291bnQgPSBmdW5jdGlvbiAodG9rZW4sIHJvb3QpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuZ2V0KHRva2VuLCByb290KSkubGVuZ3RoXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBkb2N1bWVudCBpZGVudGlmaWVkIGJ5IHJlZiBmcm9tIHRoZSB0b2tlbiBpbiB0aGUgc3RvcmUuXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGdldCB0aGUgZG9jdW1lbnRzIGZvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSByZWYgVGhlIHJlZiBvZiB0aGUgZG9jdW1lbnQgdG8gcmVtb3ZlIGZyb20gdGhpcyB0b2tlbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAodG9rZW4sIHJlZikge1xuICBpZiAoIXRva2VuKSByZXR1cm5cbiAgdmFyIG5vZGUgPSB0aGlzLnJvb3RcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCEodG9rZW4uY2hhckF0KGkpIGluIG5vZGUpKSByZXR1cm5cbiAgICBub2RlID0gbm9kZVt0b2tlbi5jaGFyQXQoaSldXG4gIH1cblxuICBkZWxldGUgbm9kZS5kb2NzW3JlZl1cbn1cblxuLyoqXG4gKiBGaW5kIGFsbCB0aGUgcG9zc2libGUgc3VmZml4ZXMgb2YgdGhlIHBhc3NlZCB0b2tlbiB1c2luZyB0b2tlbnNcbiAqIGN1cnJlbnRseSBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBleHBhbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmV4cGFuZCA9IGZ1bmN0aW9uICh0b2tlbiwgbWVtbykge1xuICB2YXIgcm9vdCA9IHRoaXMuZ2V0Tm9kZSh0b2tlbiksXG4gICAgICBkb2NzID0gcm9vdC5kb2NzIHx8IHt9LFxuICAgICAgbWVtbyA9IG1lbW8gfHwgW11cblxuICBpZiAoT2JqZWN0LmtleXMoZG9jcykubGVuZ3RoKSBtZW1vLnB1c2godG9rZW4pXG5cbiAgT2JqZWN0LmtleXMocm9vdClcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoa2V5ID09PSAnZG9jcycpIHJldHVyblxuXG4gICAgICBtZW1vLmNvbmNhdCh0aGlzLmV4cGFuZCh0b2tlbiArIGtleSwgbWVtbykpXG4gICAgfSwgdGhpcylcblxuICByZXR1cm4gbWVtb1xufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdG9rZW4gc3RvcmUgcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHJvb3Q6IHRoaXMucm9vdCxcbiAgICBsZW5ndGg6IHRoaXMubGVuZ3RoXG4gIH1cbn1cblxuICAvKipcbiAgICogZXhwb3J0IHRoZSBtb2R1bGUgdmlhIEFNRCwgQ29tbW9uSlMgb3IgYXMgYSBicm93c2VyIGdsb2JhbFxuICAgKiBFeHBvcnQgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvcmV0dXJuRXhwb3J0cy5qc1xuICAgKi9cbiAgOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgIGRlZmluZShmYWN0b3J5KVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAvKipcbiAgICAgICAqIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgICAgICogb25seSBDb21tb25KUy1saWtlIGVudmlyb21lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAqIGxpa2UgTm9kZS5cbiAgICAgICAqL1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICAgIHJvb3QubHVuciA9IGZhY3RvcnkoKVxuICAgIH1cbiAgfSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogSnVzdCByZXR1cm4gYSB2YWx1ZSB0byBkZWZpbmUgdGhlIG1vZHVsZSBleHBvcnQuXG4gICAgICogVGhpcyBleGFtcGxlIHJldHVybnMgYW4gb2JqZWN0LCBidXQgdGhlIG1vZHVsZVxuICAgICAqIGNhbiByZXR1cm4gYSBmdW5jdGlvbiBhcyB0aGUgZXhwb3J0ZWQgdmFsdWUuXG4gICAgICovXG4gICAgcmV0dXJuIGx1bnJcbiAgfSkpXG59KSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9sdW5yL2x1bnIuanMiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBpZiBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXG4gKi9cbmNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSAoZWxlbWVudCwgdmlzaWJsZSkgPT4gKHZpc2libGUgPyBzaG93IDogaGlkZSkoZWxlbWVudCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RyaW5nIGlzIGVtcHR5XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc0VtcHR5ID0gKHRleHQpID0+ICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycpICYmICh0ZXh0Lmxlbmd0aCA9PT0gMCk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWxWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGJhY2sgYnV0dG9uXG4gICAgY29uc3QgYmFja0J1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBiYWNrQnV0dG9uRWxlbWVudC5jbGFzc05hbWUgPSAnYmFjay1idXR0b24gaWNvbi1hcnJvdy10aGljayc7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2Nsb3NlJywgdGhpcywgYmFja0J1dHRvbkVsZW1lbnQpO1xuXG4gICAgLy8gaW1hZ2VcbiAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgdGhpcy5pbWFnZS5jbGFzc05hbWUgPSAnaW1nLXJlc3BvbnNpdmUnO1xuXG4gICAgY29uc3QgaW1hZ2VXcmFwcGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGltYWdlV3JhcHBlckVsZW1lbnQuY2xhc3NOYW1lID0gJ2ltYWdlLXdyYXBwZXInO1xuICAgIGltYWdlV3JhcHBlckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5pbWFnZSk7XG5cbiAgICAvLyB0aXRsZVxuICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuXG4gICAgLy8gYXV0aG9yXG4gICAgdGhpcy5hdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmF1dGhvci5jbGFzc05hbWUgPSAnYXV0aG9yJztcbiAgICB0aGlzLmF1dGhvci5pbm5lckhUTUwgPSAnYnkgSm91YmVsJzsgLy8gVE9ETyBNYWtlIGR5bmFtaWNcblxuICAgIC8vIGRlc2NyaXB0aW9uXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uLmNsYXNzTmFtZSA9ICdzbWFsbCc7XG5cbiAgICAvLyBkZW1vIGJ1dHRvblxuICAgIHRoaXMuZGVtb0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB0aGlzLmRlbW9CdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbic7XG4gICAgdGhpcy5kZW1vQnV0dG9uLmlubmVySFRNTCA9ICdDb250ZW50IERlbW8nO1xuICAgIHRoaXMuZGVtb0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKTtcbiAgICBoaWRlKHRoaXMuZGVtb0J1dHRvbik7XG5cbiAgICBjb25zdCB0ZXh0RGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRleHREZXRhaWxzLmNsYXNzTmFtZSA9ICd0ZXh0LWRldGFpbHMnO1xuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuICAgIHRleHREZXRhaWxzLmFwcGVuZENoaWxkKHRoaXMuYXV0aG9yKTtcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLmRlc2NyaXB0aW9uKTtcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLmRlbW9CdXR0b24pO1xuXG4gICAgY29uc3QgZGV0YWlsc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkZXRhaWxzRWxlbWVudC5jbGFzc05hbWUgPSAnY29udGFpbmVyJztcbiAgICBkZXRhaWxzRWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZVdyYXBwZXJFbGVtZW50KTtcbiAgICBkZXRhaWxzRWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0RGV0YWlscyk7XG5cbiAgICAvLyB1c2UgYnV0dG9uXG4gICAgdGhpcy51c2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGhpcy51c2VCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbiBidXR0b24tcHJpbWFyeSc7XG4gICAgdGhpcy51c2VCdXR0b24uaW5uZXJIVE1MID0gJ1VzZSc7XG4gICAgaGlkZSh0aGlzLnVzZUJ1dHRvbik7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHRoaXMsIHRoaXMudXNlQnV0dG9uKTtcblxuICAgIC8vIGluc3RhbGwgYnV0dG9uXG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnknO1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5pbm5lckhUTUwgPSAnSW5zdGFsbCc7XG4gICAgaGlkZSh0aGlzLmluc3RhbGxCdXR0b24pO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdpbnN0YWxsJywgdGhpcywgdGhpcy5pbnN0YWxsQnV0dG9uKTtcblxuICAgIGNvbnN0IGJ1dHRvbkJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJ1dHRvbkJhci5jbGFzc05hbWUgPSAnYnV0dG9uLWJhcic7XG4gICAgYnV0dG9uQmFyLmFwcGVuZENoaWxkKHRoaXMudXNlQnV0dG9uKTtcbiAgICBidXR0b25CYXIuYXBwZW5kQ2hpbGQodGhpcy5pbnN0YWxsQnV0dG9uKTtcblxuICAgIC8vIGxpY2VuY2UgcGFuZWxcbiAgICBjb25zdCBsaWNlbmNlUGFuZWwgPSB0aGlzLmNyZWF0ZVBhbmVsKCdUaGUgTGljZW5jZSBJbmZvJywgJ2lwc3VtIGxvcnVtJywgJ2xpY2VuY2UtcGFuZWwnKTtcbiAgICBjb25zdCBwbHVnaW5zUGFuZWwgPSB0aGlzLmNyZWF0ZVBhbmVsKCdBdmFpbGFibGUgcGx1Z2lucycsICdpcHN1bSBsb3J1bScsICdwbHVnaW5zLXBhbmVsJyk7XG4gICAgY29uc3QgcHVibGlzaGVyUGFuZWwgPSB0aGlzLmNyZWF0ZVBhbmVsKCdQdWJsaXNoZXIgSW5mbycsICdpcHN1bSBsb3J1bScsICdwdWJsaXNoZXItcGFuZWwnKTtcblxuICAgIC8vIHBhbmVsIGdyb3VwXG4gICAgY29uc3QgcGFuZWxHcm91cEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5jbGFzc05hbWUgPSAncGFuZWwtZ3JvdXAnO1xuICAgIHBhbmVsR3JvdXBFbGVtZW50LmFwcGVuZENoaWxkKGxpY2VuY2VQYW5lbCk7XG4gICAgcGFuZWxHcm91cEVsZW1lbnQuYXBwZW5kQ2hpbGQocGx1Z2luc1BhbmVsKTtcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5hcHBlbmRDaGlsZChwdWJsaXNoZXJQYW5lbCk7XG5cbiAgICAvLyBpbWFnZXNcbiAgICB0aGlzLmNhcm91c2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcblxuXG4gICAgLy8gYWRkIHJvb3QgZWxlbWVudFxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtZGV0YWlsJztcbiAgICB0aGlzLnJvb3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoYmFja0J1dHRvbkVsZW1lbnQpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoZGV0YWlsc0VsZW1lbnQpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uQmFyKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2Fyb3VzZWwpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocGFuZWxHcm91cEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlJZFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZVBhbmVsKHRpdGxlLCBib2R5LCBib2R5SWQpIHtcbiAgICBjb25zdCBoZWFkZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhlYWRlckVsLmNsYXNzTmFtZSA9ICdwYW5lbC1oZWFkZXInO1xuICAgIGhlYWRlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgIGhlYWRlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGJvZHlJZCk7XG4gICAgaGVhZGVyRWwuaW5uZXJIVE1MID0gdGl0bGU7XG5cbiAgICBjb25zdCBib2R5SW5uZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvZHlJbm5lckVsLmNsYXNzTmFtZSA9ICdwYW5lbC1ib2R5LWlubmVyJztcbiAgICBib2R5SW5uZXJFbC5pbm5lckhUTUwgPSBib2R5O1xuXG4gICAgY29uc3QgYm9keUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm9keUVsLmNsYXNzTmFtZSA9ICdwYW5lbC1ib2R5JztcbiAgICBib2R5RWwuaWQgPSBib2R5SWQ7XG4gICAgYm9keUVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGJvZHlFbC5hcHBlbmRDaGlsZChib2R5SW5uZXJFbCk7XG5cbiAgICBjb25zdCBwYW5lbEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFuZWxFbC5jbGFzc05hbWUgPSAncGFuZWwnO1xuICAgIHBhbmVsRWwuYXBwZW5kQ2hpbGQoaGVhZGVyRWwpO1xuICAgIHBhbmVsRWwuYXBwZW5kQ2hpbGQoYm9keUVsKTtcblxuICAgIGluaXRQYW5lbChwYW5lbEVsKTtcblxuICAgIHJldHVybiBwYW5lbEVsO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpbWFnZSB0byB0aGUgY2Fyb3VzZWxcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGltYWdlXG4gICAqL1xuICBhZGRJbWFnZVRvQ2Fyb3VzZWwoaW1hZ2UpIHtcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBpdGVtLmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIiR7aW1hZ2UudXJsfVwiIGFsdD1cIiR7aW1hZ2UuYWx0fVwiIHN0eWxlPVwid2lkdGg6IDEwMHB4O1wiLz5gO1xuXG4gICAgdGhpcy5jYXJvdXNlbC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbWFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gICAqL1xuICBzZXRJbWFnZShzcmMpIHtcbiAgICB0aGlzLmltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldElkKGlkKSB7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gICAgdGhpcy51c2VCdXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XG4gICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSB0ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGV4YW1wbGUgdXJsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICovXG4gIHNldEV4YW1wbGUodXJsKSB7XG4gICAgdGhpcy5kZW1vQnV0dG9uLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCB8fCAnIycpO1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy5kZW1vQnV0dG9uLCAhaXNFbXB0eSh1cmwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGlmIHRoZSBjb250ZW50IHR5cGUgaXMgaW5zdGFsbGVkXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5zdGFsbGVkXG4gICAqL1xuICBzZXRJc0luc3RhbGxlZChpbnN0YWxsZWQpIHtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMudXNlQnV0dG9uLCBpbnN0YWxsZWQpO1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy5pbnN0YWxsQnV0dG9uLCAhaW5zdGFsbGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVEZXRhaWxWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlld1wiO1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gXCIuLi9odWItc2VydmljZXNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gdmlld3NcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZURldGFpbFZpZXcoc3RhdGUpO1xuICAgIHRoaXMudmlldy5vbignaW5zdGFsbCcsIHRoaXMuaW5zdGFsbCwgdGhpcyk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydjbG9zZScsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgbG9hZEJ5SWQoaWQpIHtcbiAgICB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgLnRoZW4odGhpcy51cGRhdGUuYmluZCh0aGlzKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgIGluc3RhbGwoe2lkfSkge1xuICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSlcbiAgICAgICAudGhlbihtYWNoaW5lTmFtZSA9PiB0aGlzLnNlcnZpY2VzLmluc3RhbGxDb250ZW50VHlwZShtYWNoaW5lTmFtZSkpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gY29uc29sZS5kZWJ1ZygnVE9ETywgZ3VpIHVwZGF0ZXMnKSlcbiAgIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdmlldyB3aXRoIHRoZSBjb250ZW50IHR5cGUgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlKSB7XG4gICAgdGhpcy52aWV3LnNldElkKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcbiAgICB0aGlzLnZpZXcuc2V0VGl0bGUoY29udGVudFR5cGUudGl0bGUpO1xuICAgIHRoaXMudmlldy5zZXREZXNjcmlwdGlvbihjb250ZW50VHlwZS5kZXNjcmlwdGlvbik7XG4gICAgdGhpcy52aWV3LnNldEltYWdlKGNvbnRlbnRUeXBlLmljb24pO1xuICAgIHRoaXMudmlldy5zZXRFeGFtcGxlKGNvbnRlbnRUeXBlLmV4YW1wbGUpO1xuICAgIHRoaXMudmlldy5zZXRJc0luc3RhbGxlZCghIWNvbnRlbnRUeXBlLmluc3RhbGxlZCk7XG5cbiAgICBjb250ZW50VHlwZS5zY3JlZW5zaG90cy5mb3JFYWNoKHRoaXMudmlldy5hZGRJbWFnZVRvQ2Fyb3VzZWwsIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3RWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtbGlzdCc7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCByb3dzIGZyb20gcm9vdCBlbGVtZW50XG4gICAqL1xuICByZW1vdmVBbGxSb3dzKCkge1xuICAgIGlmKHRoaXMucm9vdEVsZW1lbnQpe1xuICAgICAgd2hpbGUodGhpcy5yb290RWxlbWVudC5maXJzdENoaWxkKXtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLnJvb3RFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcm93XG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICBhZGRSb3coY29udGVudFR5cGUpIHtcbiAgICBjb25zdCByb3cgPSB0aGlzLmNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCB0aGlzKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncm93LXNlbGVjdGVkJywgdGhpcywgcm93KTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHJvdylcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIENvbnRlbnQgVHlwZSBjb25maWd1cmF0aW9uIGFuZCBjcmVhdGVzIGEgcm93IGRvbVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKiBAcGFyYW0ge0V2ZW50ZnVsfSBzY29wZVxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCBzY29wZSkge1xuICAgIC8vIHJvdyBpdGVtXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC5pZCA9IGBjb250ZW50LXR5cGUtJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1gO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuXG4gICAgLy8gY3JlYXRlIGJ1dHRvbiBjb25maWdcbiAgICBjb25zdCB1c2VCdXR0b25Db25maWcgPSB7IHRleHQ6ICdVc2UnLCBjbHM6ICdidXR0b24tcHJpbWFyeScgfTtcbiAgICBjb25zdCBpbnN0YWxsQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnaW5zdGFsbCcsIGNsczogJ2J1dHRvbi1pbnZlcnNlLXByaW1hcnknfTtcbiAgICBjb25zdCBidXR0b24gPSBjb250ZW50VHlwZS5pbnN0YWxsZWQgPyAgdXNlQnV0dG9uQ29uZmlnOiBpbnN0YWxsQnV0dG9uQ29uZmlnO1xuXG4gICAgLy8gY3JlYXRlIGh0bWxcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cIiR7Y29udGVudFR5cGUuaWNvbn1cIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uICR7YnV0dG9uLmNsc31cIiBkYXRhLWlkPVwiJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1cIj4ke2J1dHRvbi50ZXh0fTwvc3Bhbj5cbiAgICAgIDxoND4ke2NvbnRlbnRUeXBlLnRpdGxlfTwvaDQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke2NvbnRlbnRUeXBlLnN1bW1hcnl9PC9kaXY+XG4gICBgO1xuXG4gICAgLy8gaGFuZGxlIHVzZSBidXR0b25cbiAgICBjb25zdCB1c2VCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tcHJpbWFyeScpO1xuICAgIGlmKHVzZUJ1dHRvbil7XG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0Jywgc2NvcGUsIHVzZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlTGlzdFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWxpc3Qtdmlld1wiO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBSb3cgc2VsZWN0ZWQgZXZlbnRcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIFVwZGF0ZSBjb250ZW50IHR5cGUgbGlzdCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGFkZCB0aGUgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlTGlzdFZpZXcoc3RhdGUpO1xuICAgIHRoaXMucHJvcGFnYXRlKFsncm93LXNlbGVjdGVkJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGUgdGhpcyBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGlzIGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgd2l0aCBuZXcgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlcykge1xuICAgIHRoaXMudmlldy5yZW1vdmVBbGxSb3dzKCk7XG4gICAgY29udGVudFR5cGVzLmZvckVhY2godGhpcy52aWV3LmFkZFJvdywgdGhpcy52aWV3KTtcbiAgICB0aGlzLmZpcmUoJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHt9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZpZXdzIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwiaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3XG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3IHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudHNcbiAgICBjb25zdCBtZW51ID0gdGhpcy5jcmVhdGVNZW51RWxlbWVudCgpO1xuICAgIGNvbnN0IGlucHV0R3JvdXAgPSB0aGlzLmNyZWF0ZUlucHV0R3JvdXBFbGVtZW50KCk7XG5cbiAgICAvLyBtZW51IGdyb3VwXG4gICAgY29uc3QgbWVudUdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVudUdyb3VwLmNsYXNzTmFtZSA9ICdtZW51LWdyb3VwJztcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQobWVudSk7XG4gICAgbWVudUdyb3VwLmFwcGVuZENoaWxkKGlucHV0R3JvdXApO1xuXG4gICAgLy8gcm9vdCBlbGVtZW50XG4gICAgdGhpcy5yb290RWxlbWVudCAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKG1lbnVHcm91cCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG1lbnUgaXRlbVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGFkZE1lbnVJdGVtKHRleHQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51aXRlbScpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcblxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICB0aGlzLmZpcmUoJ21lbnUtc2VsZWN0ZWQnLCB7XG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LnRhcmdldFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBzZXRzIGZpcnN0IHRvIGJlIHNlbGVjdGVkXG4gICAgaWYodGhpcy5tZW51QmFyRWxlbWVudC5jaGlsZEVsZW1lbnRDb3VudCA8IDEpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdG8gbWVudSBiYXJcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgbWVudSBiYXIgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlTWVudUVsZW1lbnQoKSB7XG4gICAgdGhpcy5tZW51QmFyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5tZW51QmFyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWJhcicpO1xuICAgIHRoaXMubWVudUJhckVsZW1lbnQuY2xhc3NOYW1lID0gJ2g1cC1tZW51JztcblxuICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubWVudUJhckVsZW1lbnQpO1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aXRsZS5jbGFzc05hbWUgPSBcIm1lbnUtdGl0bGVcIjtcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBcIkJyb3dzZSBjb250ZW50IHR5cGVzXCI7XG5cbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVudS5jbGFzc05hbWUgPSBcIm1lbnVcIjtcbiAgICBtZW51LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBtZW51LmFwcGVuZENoaWxkKG5hdkVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIG1lbnU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgaW5wdXQgZ3JvdXAgdXNlZCBmb3Igc2VhcmNoXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQoKSB7XG4gICAgLy8gaW5wdXQgZmllbGRcbiAgICBjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dEZpZWxkLmNsYXNzTmFtZSA9ICdmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXJvdW5kZWQnO1xuICAgIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBcIlNlYXJjaCBmb3IgQ29udGVudCBUeXBlc1wiKTtcbiAgICBpbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5maXJlKCdzZWFyY2gnLCB7XG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LnRhcmdldCxcbiAgICAgICAgcXVlcnk6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbnB1dCBidXR0b25cbiAgICBjb25zdCBpbnB1dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGlucHV0QnV0dG9uLmNsYXNzTmFtZSA9ICdpbnB1dC1ncm91cC1hZGRvbiBpY29uLXNlYXJjaCc7XG5cbiAgICAvLyBpbnB1dCBncm91cFxuICAgIGNvbnN0IGlucHV0R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbnB1dEdyb3VwLmNsYXNzTmFtZSA9ICdpbnB1dC1ncm91cCc7XG4gICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEZpZWxkKTtcbiAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0QnV0dG9uKTtcblxuICAgIHJldHVybiBpbnB1dEdyb3VwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJpbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3XCI7XG5pbXBvcnQgU2VhcmNoU2VydmljZSBmcm9tIFwiLi4vc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2VcIjtcbmltcG9ydCBDb250ZW50VHlwZUxpc3QgZnJvbSAnLi4vY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QnO1xuaW1wb3J0IENvbnRlbnRUeXBlRGV0YWlsIGZyb20gJy4uL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbCc7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4uL3V0aWxzL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRUeXBlU2VjdGlvblxuICogQG1peGVzIEV2ZW50ZnVsXG4gKlxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gYWRkIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uVmlldyhzdGF0ZSk7XG5cbiAgICAvLyBjb250cm9sbGVyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2UoeyBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsIH0pO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0ID0gbmV3IENvbnRlbnRUeXBlTGlzdCgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwgPSBuZXcgQ29udGVudFR5cGVEZXRhaWwoeyBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsIH0pO1xuXG4gICAgLy8gYWRkIG1lbnUgaXRlbXNcbiAgICBbJ015IENvbnRlbnQgVHlwZXMnLCAnTmV3ZXN0JywgJ01vc3QgUG9wdWxhcicsICdSZWNvbW1lbmRlZCddXG4gICAgICAuZm9yRWFjaChtZW51VGV4dCA9PiB0aGlzLnZpZXcuYWRkTWVudUl0ZW0obWVudVRleHQpKTtcblxuICAgIC8vIEVsZW1lbnQgZm9yIGhvbGRpbmcgbGlzdCBhbmQgZGV0YWlscyB2aWV3c1xuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtdHlwZS1zZWN0aW9uJyk7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gc2VjdGlvbjtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVMaXN0LmdldEVsZW1lbnQoKSk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmdldEVsZW1lbnQoKSk7XG5cbiAgICB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCddLCB0aGlzLmNvbnRlbnRUeXBlTGlzdCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XG5cbiAgICAvLyByZWdpc3RlciBsaXN0ZW5lcnNcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMuc2VhcmNoLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmFwcGx5U2VhcmNoRmlsdGVyLCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5vbigncm93LXNlbGVjdGVkJywgdGhpcy5zaG93RGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG5cbiAgICB0aGlzLmluaXRDb250ZW50VHlwZUxpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0IHdpdGggYSBzZWFyY2hcbiAgICovXG4gIGluaXRDb250ZW50VHlwZUxpc3QoKSB7XG4gICAgLy8gaW5pdGlhbGl6ZSBieSBzZWFyY2hcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKFwiXCIpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5maXJlKCdlcnJvcicsIGVycm9yKSk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgYSBzZWFyY2ggYW5kIHVwZGF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICAgKi9cbiAgc2VhcmNoKHtxdWVyeX0pIHtcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYXBwbHkgYSBzZWFyY2ggZmlsdGVyXG4gICAqL1xuICBhcHBseVNlYXJjaEZpbHRlcigpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdDb250ZW50VHlwZVNlY3Rpb246IG1lbnUgd2FzIGNsaWNrZWQhJywgZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIGRldGFpbCB2aWV3XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2hvd0RldGFpbFZpZXcoe2lkfSkge1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmxvYWRCeUlkKGlkKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLnNob3coKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENsb3NlIGRldGFpbCB2aWV3XG4gICAqL1xuICBjbG9zZURldGFpbFZpZXcoKSB7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5oaWRlKCk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Quc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxuaW1wb3J0IGluaXRUYWJQYW5lbCBmcm9tIFwiY29tcG9uZW50cy90YWItcGFuZWxcIlxuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4vdXRpbHMvZXZlbnRzJztcbi8qKlxuICogVGFiIGNoYW5nZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjdGFiLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBQYW5lbCBvcGVuIG9yIGNsb3NlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyNwYW5lbC1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9EQVRBX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YlZpZXcjdGFiLWNoYW5nZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJWaWV3IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgdGhpcy5yZW5kZXJUYWJQYW5lbChzdGF0ZSk7XG4gICAgdGhpcy5yZW5kZXJQYW5lbChzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBwYW5lbFxuICAgKi9cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICogQHBhcmFtIHtib29sZWFufSBleHBhbmRlZFxuICAgKi9cbiAgcmVuZGVyUGFuZWwoe3RpdGxlID0gJycsIHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGl0bGUuY2xhc3NOYW1lICs9IFwicGFuZWwtaGVhZGVyIGljb24taHViLWljb25cIjtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWApO1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3BhbmVsLWNoYW5nZScsIHRoaXMsIHRoaXMudGl0bGUpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYm9keS5jbGFzc05hbWUgKz0gXCJwYW5lbC1ib2R5XCI7XG4gICAgdGhpcy5ib2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLmJvZHkuaWQgPSBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSBgcGFuZWwgaDVwLXNlY3Rpb24tJHtzZWN0aW9uSWR9YDtcbiAgICBpZihleHBhbmRlZCl7XG4gICAgICB0aGlzLnBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICB9XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuYm9keSk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSArPSBgaDVwIGg1cC1odWJgO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZSB0aGUgcGFuZWwgYXR0cmliaXV0ZXMgZnJvbSBoNXAtc2RrLCBlLmcuIG9wZW5pbmcgYW5kIGNsb3NpbmdcbiAgICogVGhpcyBpcyBvbmx5IGNhbGxlZCBvbmNlIG5vIGVycm9ycyBoYXZlIG9jY3VyZWQgaW4gbG9hZGluZyB0aGUgaHViXG4gICAqL1xuICBpbml0aWFsaXplUGFuZWwoKXtcbiAgICBpbml0UGFuZWwodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGlmIHBhbmVsIGlzIG9wZW4sIHRoaXMgaXMgdXNlZCBmb3Igb3V0ZXIgYm9yZGVyIGNvbG9yXG4gICAqL1xuICB0b2dnbGVQYW5lbE9wZW4oKSB7XG4gICAgaWYoaXNPcGVuKHRoaXMucGFuZWwpKSB7XG4gICAgICB0aGlzLnBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgnb3BlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSB0YWIgcGFuZWxcbiAgICovXG4gIHJlbmRlclRhYlBhbmVsKHN0YXRlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFibGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy50YWJsaXN0LmNsYXNzTmFtZSArPSBcInRhYmxpc3RcIjtcbiAgICB0aGlzLnRhYmxpc3Quc2V0QXR0cmlidXRlICgncm9sZScsICd0YWJsaXN0Jyk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy50YWJsaXN0KTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuY2xhc3NOYW1lICs9ICd0YWItcGFuZWwnO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRhYkxpc3RXcmFwcGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgdGFiXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkXG4gICAqL1xuICBhZGRUYWIoe3RpdGxlLCBpZCwgY29udGVudCwgc2VsZWN0ZWQgPSBmYWxzZX0pIHtcbiAgICBjb25zdCB0YWJJZCA9IGB0YWItJHtpZH1gO1xuICAgIGNvbnN0IHRhYlBhbmVsSWQgPSBgdGFiLXBhbmVsLSR7aWR9YDtcblxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdGFiLmNsYXNzTmFtZSArPSAndGFiJztcbiAgICB0YWIuaWQgPSB0YWJJZDtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgdGFiUGFuZWxJZCk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHNlbGVjdGVkLnRvU3RyaW5nKCkpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0RBVEFfSUQsIGlkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYicpO1xuICAgIHRhYi5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygndGFiLWNoYW5nZScsIHRoaXMsIHRhYik7XG5cbiAgICBjb25zdCB0YWJQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRhYlBhbmVsLmlkID0gdGFiUGFuZWxJZDtcbiAgICB0YWJQYW5lbC5jbGFzc05hbWUgKz0gJ3RhYnBhbmVsJztcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFibGxlZGJ5JywgdGFiSWQpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIXNlbGVjdGVkKS50b1N0cmluZygpKTtcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcbiAgICB0YWJQYW5lbC5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZCh0YWIpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0YWJQYW5lbCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBhbmltYXRlZCBib3JkZXIgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFiXG4gICAqL1xuICBhZGRCb3R0b21Cb3JkZXIoKSB7XG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSk7XG4gIH1cblxuICBpbml0VGFiUGFuZWwoKSB7XG4gICAgaW5pdFRhYlBhbmVsKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VjdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldFNlY3Rpb25UeXBlKHtpZH0pIHtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSA9IGBoNXAtc2VjdGlvbi0ke2lkfSBwYW5lbGA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsImltcG9ydCB7Y3VycnksIG1hcCwgZmlsdGVyfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiXG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSBcIi4uL2h1Yi1zZXJ2aWNlc1wiO1xuaW1wb3J0IGx1bnIgZnJvbSBcImx1bnJcIlxuXG4vKipcbiAqIEBjbGFzc1xuICogVGhlIFNlYXJjaCBTZXJ2aWNlIGdldHMgYSBjb250ZW50IHR5cGVzIGZyb20gSHViU2VydmljZXNcbiAqIHRoZW4gaW5kZXhlcyB0aGVtIHVzaW5nIGx1bnJqcy4gSXQgdGhlbiBzZWFyY2hlcyB0aHJvdWdoXG4gKiB0aGUgbHVucmpzIGluZGV4IGFuZCByZXR1cm5zIGNvbnRlbnQgdHlwZXMgdGhhdCBtYXRjaCB0aGUgcXVlcnkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS5hcGlSb290VXJsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gU2V0IHVwIGx1bnIgaW5kZXhcbiAgICB0aGlzLmluZGV4ID0gbHVucihmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZmllbGQoJ3RpdGxlJywge2Jvb3N0OiAxMH0pOyAvLyBDZXJ0YWluIGZpZWxkcyBjYW4gZ2l2ZW4gYSBoaWdoZXIgaW1wb3J0YW5jZVxuICAgICAgdGhpcy5maWVsZCgnc3VtbWFyeScpO1xuICAgICAgdGhpcy5maWVsZCgnZGVzY3JpcHRpb24nKTtcbiAgICAgIHRoaXMuZmllbGQoJ2tleXdvcmRzJyk7XG4gICAgICB0aGlzLnJlZignaWQnKTsgLy9cbiAgICB9KTtcblxuICAgIC8vIEFkZCBjb250ZW50IHR5cGVzIHRvIHRoZSBzZWFyY2ggaW5kZXhcbiAgICB0aGlzLmNvbnRlbnRUeXBlcyA9IHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKClcbiAgICAgIC50aGVuKG1hcChhZGRUb0luZGV4KHRoaXMuaW5kZXgpKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBzZWFyY2hcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXT59IEEgcHJvbWlzZSBvZiBhbiBhcnJheSBvZiBjb250ZW50IHR5cGVzXG4gICAqL1xuICBzZWFyY2gocXVlcnkpIHtcbiAgICAvLyBEaXNwbGF5IGFsbCBjb250ZW50IHR5cGVzIGJ5IGRlZmF1bHRcbiAgICBpZiAocXVlcnkgPT09ICcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250ZW50VHlwZXM7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlLCBmaWx0ZXIgY29udGVudCB0eXBlcyBieSBhIHF1ZXJ5XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFR5cGVzLnRoZW4oY29udGVudFR5cGVzID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmluZGV4LnNlYXJjaChxdWVyeSlcbiAgICAgICAgLm1hcChyZXN1bHQgPT4gcmVzdWx0LnJlZilcbiAgICAgICAgLm1hcChmaW5kQ29udGVudFR5cGVCeU1hY2hpbmVOYW1lKGNvbnRlbnRUeXBlcykpXG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGEgY29udGVudCB0eXBlIHRvIHRoZSBsdW5yanMgc2VhcmNoIGluZGV4XG4gKiBjcmVhdGVzIGFuIGlkIGZvciB0aGUgaW5kZXggdXNpbmcgdGhlIG1hY2hpbmUgbmFtZVxuICogb2YgdGhlIGNvbnRlbnQgdHlwZS5cbiAqXG4gKiBAcGFyYW0gIHtsdW5yLkluZGV4fSBpbmRleFxuICogQHBhcmFtICB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gKlxuICogQHJldHVybiB7Q29udGVudFR5cGV9XG4gKi9cbmNvbnN0IGFkZFRvSW5kZXggPSBjdXJyeSgoaW5kZXgsIGNvbnRlbnRUeXBlKSA9PiB7XG4gIGluZGV4LmFkZCh7XG4gICAgdGl0bGU6IGNvbnRlbnRUeXBlLnRpdGxlLFxuICAgIHN1bW1hcnk6IGNvbnRlbnRUeXBlLnN1bW1hcnksXG4gICAgZGVzY3JpcHRpb246IGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uLFxuICAgIGtleXdvcmRzOiBjb250ZW50VHlwZS5rZXl3b3JkcyxcbiAgICBpZDogY29udGVudFR5cGUubWFjaGluZU5hbWVcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbnRlbnRUeXBlO1xufSk7XG5cbi8qKlxuICogaGVscGVyIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7Q29udGVudFR5cGVbXX1cbiAqIEBwYXJhbSAge3N0cmluZ30gbWFjaGluZU5hbWVcbiAqIEByZXR1cm4ge0NvbnRlbnRUeXBlfVxuICovXG5jb25zdCBmaW5kQ29udGVudFR5cGVCeU1hY2hpbmVOYW1lID0gY3VycnkoZnVuY3Rpb24oY29udGVudFR5cGVzLCBtYWNoaW5lTmFtZSkge1xuICByZXR1cm4gY29udGVudFR5cGVzLmZpbHRlcihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSA9PT0gbWFjaGluZU5hbWUpWzBdO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIi8qKlxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xuICBnZXRFbGVtZW50KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiVE9ETyBVcGxvYWRcIjtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwicmVxdWlyZSgnLi4vLi4vc3JjL3N0eWxlcy9tYWluLnNjc3MnKTtcblxuLy8gTG9hZCBsaWJyYXJ5XG5INVAgPSBINVAgfHwge307XG5INVAuSHViQ2xpZW50ID0gcmVxdWlyZSgnLi4vc2NyaXB0cy9odWInKS5kZWZhdWx0O1xuSDVQLkh1YkNsaWVudC5yZW5kZXJFcnJvck1lc3NhZ2UgPSByZXF1aXJlKCcuLi9zY3JpcHRzL3V0aWxzL2Vycm9ycycpLmRlZmF1bHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==