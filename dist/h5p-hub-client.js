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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2Y0MDJiN2FkMGIzMGU4NGNlODYiLCJ3ZWJwYWNrOi8vLy4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uL34vbHVuci9sdW5yLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudHJpZXMvZGlzdC5qcyJdLCJuYW1lcyI6WyJjdXJyeSIsImZuIiwiYXJpdHkiLCJsZW5ndGgiLCJmMSIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFwcGx5IiwiZjIiLCJhcmdzMiIsImNvbmNhdCIsImNvbXBvc2UiLCJmbnMiLCJyZWR1Y2UiLCJmIiwiZyIsImZvckVhY2giLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJFdmVudGZ1bCIsImxpc3RlbmVycyIsIm9uIiwidHlwZSIsImxpc3RlbmVyIiwic2NvcGUiLCJ0cmlnZ2VyIiwicHVzaCIsImZpcmUiLCJldmVudCIsInRyaWdnZXJzIiwiZXZlcnkiLCJwcm9wYWdhdGUiLCJ0eXBlcyIsImV2ZW50ZnVsIiwic2VsZiIsImdldEF0dHJpYnV0ZSIsIm5hbWUiLCJlbCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsImF0dHJpYnV0ZUVxdWFscyIsInRvZ2dsZUF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicGFyZW50IiwiY2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVuZGVyRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNsb3NlQnV0dG9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibWVzc2FnZUNvbnRlbnQiLCJ0aXRsZSIsImNvbnRlbnQiLCJtZXNzYWdlV3JhcHBlciIsImRpc21pc3NpYmxlIiwiYnV0dG9uIiwidW5kZWZpbmVkIiwibWVzc2FnZUJ1dHRvbiIsImNvbnNvbGUiLCJsb2ciLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJ3aW5kb3ciLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZXMiLCJjb250ZW50VHlwZSIsImlkIiwiYm9keSIsInJlbGF5Q2xpY2tFdmVudEFzIiwiZWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJpbml0IiwiaXNFeHBhbmRlZCIsImhpZGUiLCJzaG93IiwidG9nZ2xlQm9keVZpc2liaWxpdHkiLCJib2R5RWxlbWVudCIsIm9uQXJpYUV4cGFuZGVkQ2hhbmdlIiwidGFyZ2V0IiwidGl0bGVFbCIsImJvZHlJZCIsImJvZHlFbCIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJIdWIiLCJzdGF0ZSIsImNvbnRlbnRUeXBlU2VjdGlvbiIsInVwbG9hZFNlY3Rpb24iLCJ2aWV3Iiwic2VydmljZXMiLCJzZXRQYW5lbFRpdGxlIiwiY2xvc2VQYW5lbCIsInNldFNlY3Rpb25UeXBlIiwidG9nZ2xlUGFuZWxPcGVuIiwiYmluZCIsImluaXRpYWxpemVQYW5lbCIsImluaXRUYWJQYW5lbCIsImdldENvbnRlbnRUeXBlIiwic2V0VGl0bGUiLCJ0YWJDb25maWdzIiwiZ2V0RWxlbWVudCIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiYWRkQm90dG9tQm9yZGVyIiwiaGlkZUFsbCIsInVuU2VsZWN0QWxsIiwidGFicyIsInRhYlBhbmVscyIsInRhYiIsInRhYlBhbmVsSWQiLCJsdW5yIiwiY29uZmlnIiwiaWR4IiwiSW5kZXgiLCJwaXBlbGluZSIsImFkZCIsInRyaW1tZXIiLCJzdG9wV29yZEZpbHRlciIsInN0ZW1tZXIiLCJ2ZXJzaW9uIiwidXRpbHMiLCJ3YXJuIiwiZ2xvYmFsIiwiYXNTdHJpbmciLCJvYmoiLCJFdmVudEVtaXR0ZXIiLCJldmVudHMiLCJhZGRMaXN0ZW5lciIsInBvcCIsIm5hbWVzIiwiVHlwZUVycm9yIiwiaGFzSGFuZGxlciIsInJlbW92ZUxpc3RlbmVyIiwiZm5JbmRleCIsInNwbGljZSIsImVtaXQiLCJ0b2tlbml6ZXIiLCJpc0FycmF5IiwidCIsInRvTG93ZXJDYXNlIiwidHJpbSIsInNwbGl0Iiwic2VwYXJhdG9yIiwibG9hZCIsImxhYmVsIiwicmVnaXN0ZXJlZEZ1bmN0aW9ucyIsIkVycm9yIiwicmVnaXN0ZXJGdW5jdGlvbiIsIlBpcGVsaW5lIiwiX3N0YWNrIiwid2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkIiwiaXNSZWdpc3RlcmVkIiwic2VyaWFsaXNlZCIsImZuTmFtZSIsImFmdGVyIiwiZXhpc3RpbmdGbiIsIm5ld0ZuIiwicG9zIiwiYmVmb3JlIiwicmVtb3ZlIiwicnVuIiwidG9rZW5zIiwib3V0IiwidG9rZW5MZW5ndGgiLCJzdGFja0xlbmd0aCIsImkiLCJ0b2tlbiIsImoiLCJyZXNldCIsInRvSlNPTiIsIlZlY3RvciIsIl9tYWduaXR1ZGUiLCJsaXN0IiwiTm9kZSIsInZhbCIsIm5leHQiLCJpbnNlcnQiLCJwcmV2IiwibWFnbml0dWRlIiwibm9kZSIsInN1bU9mU3F1YXJlcyIsIk1hdGgiLCJzcXJ0IiwiZG90Iiwib3RoZXJWZWN0b3IiLCJvdGhlck5vZGUiLCJkb3RQcm9kdWN0Iiwic2ltaWxhcml0eSIsIlNvcnRlZFNldCIsImVsZW1lbnRzIiwic2VyaWFsaXNlZERhdGEiLCJzZXQiLCJsb2NhdGlvbkZvciIsInRvQXJyYXkiLCJjdHgiLCJlbGVtIiwic3RhcnQiLCJlbmQiLCJzZWN0aW9uTGVuZ3RoIiwicGl2b3QiLCJmbG9vciIsInBpdm90RWxlbSIsImludGVyc2VjdCIsIm90aGVyU2V0IiwiaW50ZXJzZWN0U2V0IiwiYV9sZW4iLCJiX2xlbiIsImEiLCJiIiwiY2xvbmUiLCJ1bmlvbiIsImxvbmdTZXQiLCJzaG9ydFNldCIsInVuaW9uU2V0Iiwic2hvcnRTZXRFbGVtZW50cyIsIl9maWVsZHMiLCJfcmVmIiwiZG9jdW1lbnRTdG9yZSIsIlN0b3JlIiwidG9rZW5TdG9yZSIsIlRva2VuU3RvcmUiLCJjb3JwdXNUb2tlbnMiLCJldmVudEVtaXR0ZXIiLCJ0b2tlbml6ZXJGbiIsIl9pZGZDYWNoZSIsIm9mZiIsImZpZWxkcyIsInJlZiIsImZpZWxkIiwiZmllbGROYW1lIiwib3B0cyIsImJvb3N0IiwicmVmTmFtZSIsImRvYyIsImVtaXRFdmVudCIsImRvY1Rva2VucyIsImFsbERvY3VtZW50VG9rZW5zIiwiZG9jUmVmIiwiZmllbGRUb2tlbnMiLCJ0ZiIsImZpZWxkTGVuZ3RoIiwidG9rZW5Db3VudCIsImsiLCJoYXMiLCJnZXQiLCJ1cGRhdGUiLCJpZGYiLCJ0ZXJtIiwiY2FjaGVLZXkiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsImRvY3VtZW50RnJlcXVlbmN5IiwiY291bnQiLCJzZWFyY2giLCJxdWVyeSIsInF1ZXJ5VG9rZW5zIiwicXVlcnlWZWN0b3IiLCJkb2N1bWVudFNldHMiLCJmaWVsZEJvb3N0cyIsIm1lbW8iLCJoYXNTb21lVG9rZW4iLCJleHBhbmQiLCJrZXkiLCJzaW1pbGFyaXR5Qm9vc3QiLCJkaWZmIiwibWF4IiwibWF0Y2hpbmdEb2N1bWVudHMiLCJyZWZzIiwia2V5cyIsInJlZnNMZW4iLCJkb2N1bWVudFNldCIsInNjb3JlIiwiZG9jdW1lbnRWZWN0b3IiLCJzb3J0IiwiZG9jdW1lbnRSZWYiLCJkb2N1bWVudFRva2VucyIsImRvY3VtZW50VG9rZW5zTGVuZ3RoIiwidXNlIiwicGx1Z2luIiwidW5zaGlmdCIsInN0b3JlIiwic3RlcDJsaXN0Iiwic3RlcDNsaXN0IiwiYyIsInYiLCJDIiwiViIsIm1ncjAiLCJtZXExIiwibWdyMSIsInNfdiIsInJlX21ncjAiLCJSZWdFeHAiLCJyZV9tZ3IxIiwicmVfbWVxMSIsInJlX3NfdiIsInJlXzFhIiwicmUyXzFhIiwicmVfMWIiLCJyZTJfMWIiLCJyZV8xYl8yIiwicmUyXzFiXzIiLCJyZTNfMWJfMiIsInJlNF8xYl8yIiwicmVfMWMiLCJyZV8yIiwicmVfMyIsInJlXzQiLCJyZTJfNCIsInJlXzUiLCJyZV81XzEiLCJyZTNfNSIsInBvcnRlclN0ZW1tZXIiLCJ3Iiwic3RlbSIsInN1ZmZpeCIsImZpcnN0Y2giLCJyZSIsInJlMiIsInJlMyIsInJlNCIsInN1YnN0ciIsInRvVXBwZXJDYXNlIiwidGVzdCIsInJlcGxhY2UiLCJmcCIsImV4ZWMiLCJnZW5lcmF0ZVN0b3BXb3JkRmlsdGVyIiwic3RvcFdvcmRzIiwid29yZHMiLCJzdG9wV29yZCIsInJvb3QiLCJkb2NzIiwiY2hhckF0IiwicmVzdCIsImdldE5vZGUiLCJmYWN0b3J5IiwiZGVmaW5lIiwiZXhwb3J0cyIsIm1vZHVsZSIsIkFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQiLCJ0b2dnbGVWaXNpYmlsaXR5IiwidmlzaWJsZSIsImlzRW1wdHkiLCJ0ZXh0IiwiQ29udGVudFR5cGVEZXRhaWxWaWV3IiwiYmFja0J1dHRvbkVsZW1lbnQiLCJpbWFnZSIsImltYWdlV3JhcHBlckVsZW1lbnQiLCJhdXRob3IiLCJkZXNjcmlwdGlvbiIsImRlbW9CdXR0b24iLCJ0ZXh0RGV0YWlscyIsImRldGFpbHNFbGVtZW50IiwidXNlQnV0dG9uIiwiaW5zdGFsbEJ1dHRvbiIsImJ1dHRvbkJhciIsImxpY2VuY2VQYW5lbCIsImNyZWF0ZVBhbmVsIiwicGx1Z2luc1BhbmVsIiwicHVibGlzaGVyUGFuZWwiLCJwYW5lbEdyb3VwRWxlbWVudCIsInJvb3RFbGVtZW50IiwiaGVhZGVyRWwiLCJib2R5SW5uZXJFbCIsInBhbmVsRWwiLCJzcmMiLCJ1cmwiLCJpbnN0YWxsZWQiLCJDb250ZW50VHlwZURldGFpbCIsImluc3RhbGwiLCJpbnN0YWxsQ29udGVudFR5cGUiLCJkZWJ1ZyIsInNldElkIiwic2V0RGVzY3JpcHRpb24iLCJzZXRJbWFnZSIsImljb24iLCJzZXRFeGFtcGxlIiwiZXhhbXBsZSIsInNldElzSW5zdGFsbGVkIiwiQ29udGVudFR5cGVMaXN0VmlldyIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsInJvdyIsImNyZWF0ZUNvbnRlbnRUeXBlUm93IiwidXNlQnV0dG9uQ29uZmlnIiwiY2xzIiwiaW5zdGFsbEJ1dHRvbkNvbmZpZyIsInN1bW1hcnkiLCJDb250ZW50VHlwZUxpc3QiLCJyZW1vdmVBbGxSb3dzIiwiYWRkUm93IiwiQ29udGVudEJyb3dzZXJWaWV3IiwibWVudSIsImNyZWF0ZU1lbnVFbGVtZW50IiwiaW5wdXRHcm91cCIsImNyZWF0ZUlucHV0R3JvdXBFbGVtZW50IiwibWVudUdyb3VwIiwibWVudUJhckVsZW1lbnQiLCJjaGlsZEVsZW1lbnRDb3VudCIsIm5hdkVsZW1lbnQiLCJpbnB1dEZpZWxkIiwiaW5wdXRCdXR0b24iLCJDb250ZW50VHlwZVNlY3Rpb24iLCJzZWFyY2hTZXJ2aWNlIiwiY29udGVudFR5cGVMaXN0IiwiY29udGVudFR5cGVEZXRhaWwiLCJhZGRNZW51SXRlbSIsIm1lbnVUZXh0Iiwic2VjdGlvbiIsImNsYXNzTGlzdCIsImFwcGx5U2VhcmNoRmlsdGVyIiwic2hvd0RldGFpbFZpZXciLCJjbG9zZURldGFpbFZpZXciLCJpbml0Q29udGVudFR5cGVMaXN0IiwiY2F0Y2giLCJlcnJvciIsImxvYWRCeUlkIiwiQVRUUklCVVRFX0RBVEFfSUQiLCJpc09wZW4iLCJIdWJWaWV3IiwicmVuZGVyVGFiUGFuZWwiLCJyZW5kZXJQYW5lbCIsInNlY3Rpb25JZCIsImV4cGFuZGVkIiwidGFiQ29udGFpbmVyRWxlbWVudCIsInBhbmVsIiwidGFibGlzdCIsInRhYkxpc3RXcmFwcGVyIiwidGFiSWQiLCJ0YWJQYW5lbCIsIlNlYXJjaFNlcnZpY2UiLCJpbmRleCIsImFkZFRvSW5kZXgiLCJmaW5kQ29udGVudFR5cGVCeU1hY2hpbmVOYW1lIiwia2V5d29yZHMiLCJVcGxvYWRTZWN0aW9uIiwicmVxdWlyZSIsIkg1UCIsIkh1YkNsaWVudCIsImRlZmF1bHQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBOzs7Ozs7Ozs7QUFTTyxJQUFNQSx3QkFBUSxTQUFSQSxLQUFRLENBQVNDLEVBQVQsRUFBYTtBQUNoQyxNQUFNQyxRQUFRRCxHQUFHRSxNQUFqQjs7QUFFQSxTQUFPLFNBQVNDLEVBQVQsR0FBYztBQUNuQixRQUFNQyxPQUFPQyxNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJDLFNBQTNCLEVBQXNDLENBQXRDLENBQWI7QUFDQSxRQUFJTCxLQUFLRixNQUFMLElBQWVE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T0MsYUFBYTNFLE1BQWIsQ0FBb0I7QUFBQSxXQUFlNEUsWUFBWUYsV0FBWixLQUE0QkEsV0FBM0M7QUFBQSxHQUFwQixFQUE0RSxDQUE1RSxDQUFQO0FBQ0QsQ0FGb0MsQ0FBckMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRkE7OztJQUdxQjJYLGE7Ozs7Ozs7aUNBQ047QUFDWCxVQUFNclgsVUFBVXJDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQW9DLGNBQVFsQyxTQUFSLEdBQW9CLGFBQXBCO0FBQ0EsYUFBT2tDLE9BQVA7QUFDRDs7Ozs7O2tCQUxrQnFYLGE7Ozs7Ozs7OztBQ0hyQixtQkFBQUMsQ0FBUSxDQUFSOztBQUVBO0FBQ0FDLE1BQU1BLE9BQU8sRUFBYjtBQUNBQSxJQUFJQyxTQUFKLEdBQWdCLG1CQUFBRixDQUFRLENBQVIsRUFBMEJHLE9BQTFDO0FBQ0FGLElBQUlDLFNBQUosQ0FBY2hhLGtCQUFkLEdBQW1DLG1CQUFBOFosQ0FBUSxDQUFSLEVBQW1DRyxPQUF0RSxDIiwiZmlsZSI6Img1cC1odWItY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDNmNDAyYjdhZDBiMzBlODRjZTg2IiwiLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICpcbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGN1cnJ5ID0gZnVuY3Rpb24oZm4pIHtcbiAgY29uc3QgYXJpdHkgPSBmbi5sZW5ndGg7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKCkge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+PSBhcml0eSkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBmMigpIHtcbiAgICAgICAgY29uc3QgYXJnczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICByZXR1cm4gZjEuYXBwbHkobnVsbCwgYXJncy5jb25jYXQoYXJnczIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIENvbXBvc2UgZnVuY3Rpb25zIHRvZ2V0aGVyLCBleGVjdXRpbmcgZnJvbSByaWdodCB0byBsZWZ0XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbi4uLn0gZm5zXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKC4uLmZucykgPT4gZm5zLnJlZHVjZSgoZiwgZykgPT4gKC4uLmFyZ3MpID0+IGYoZyguLi5hcmdzKSkpO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JFYWNoID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgYXJyLmZvckVhY2goZm4pO1xufSk7XG5cbi8qKlxuICogTWFwcyBhIGZ1bmN0aW9uIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgbWFwID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5tYXAoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZpbHRlciB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBzb21lIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgc29tZSA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuc29tZShmbik7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgYSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSBjdXJyeShmdW5jdGlvbiAodmFsdWUsIGFycikge1xuICByZXR1cm4gYXJyLmluZGV4T2YodmFsdWUpICE9IC0xO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSBzdXBwbGllZCB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgd2l0aG91dCA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZXMsIGFycikge1xuICByZXR1cm4gZmlsdGVyKHZhbHVlID0+ICFjb250YWlucyh2YWx1ZSwgdmFsdWVzKSwgYXJyKVxufSk7XG5cbi8qKlxuICogVGFrZXMgYSBzdHJpbmcgdGhhdCBpcyBlaXRoZXIgJ3RydWUnIG9yICdmYWxzZScgYW5kIHJldHVybnMgdGhlIG9wcG9zaXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJvb2xcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBpbnZlcnNlQm9vbGVhblN0cmluZyA9IGZ1bmN0aW9uIChib29sKSB7XG4gIHJldHVybiAoYm9vbCAhPT0gJ3RydWUnKS50b1N0cmluZygpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIi8qKlxuICogQG1peGluXG4gKi9cbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnRmdWx9XG4gICAqL1xuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNjb3BlXG4gICAgICovXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcbiAgICAgICdsaXN0ZW5lcic6IGxpc3RlbmVyLFxuICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAgICovXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUodHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsImltcG9ydCB7Y3VycnksIGludmVyc2VCb29sZWFuU3RyaW5nfSBmcm9tICcuL2Z1bmN0aW9uYWwnXG5cbi8qKlxuICogR2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmcm9tIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpO1xufSk7XG5cbi8qKlxuICogU2V0IGFuIGF0dHJpYnV0ZSBvbiBhIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGVsKSB7XG4gIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG59KTtcblxuLyoqXG4gKiBSZW1vdmUgYXR0cmlidXRlIGZyb20gaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcbiAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xufSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaGFzQXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIGVsKSB7XG4gIHJldHVybiBlbC5oYXNBdHRyaWJ1dGUobmFtZSk7XG59KTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGUgdGhhdCBlcXVhbHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUVxdWFscyA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZWwpIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWU7XG59KTtcblxuLyoqXG4gKiBUb2dnbGVzIGFuIGF0dHJpYnV0ZSBiZXR3ZWVuICd0cnVlJyBhbmQgJ2ZhbHNlJztcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xuICBjb25zdCB2YWx1ZSA9IGdldEF0dHJpYnV0ZShuYW1lLCBlbCk7XG4gIHNldEF0dHJpYnV0ZShuYW1lLCBpbnZlcnNlQm9vbGVhblN0cmluZyh2YWx1ZSksIGVsKTtcbn0pO1xuXG4vKipcbiAqIFRoZSBhcHBlbmRDaGlsZCgpIG1ldGhvZCBhZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0IG9mIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWVkIHBhcmVudCBub2RlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgYXBwZW5kQ2hpbGQgPSBjdXJyeShmdW5jdGlvbiAocGFyZW50LCBjaGlsZCkge1xuICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyBhIGRlc2NlbmRhbnQgb2YgdGhlIGVsZW1lbnQgb24gd2hpY2ggaXQgaXMgaW52b2tlZFxuICogdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2Ygc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvciA9IGN1cnJ5KGZ1bmN0aW9uIChzZWxlY3RvciwgZWwpIHtcbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5vbi1saXZlIE5vZGVMaXN0IG9mIGFsbCBlbGVtZW50cyBkZXNjZW5kZWQgZnJvbSB0aGUgZWxlbWVudCBvbiB3aGljaCBpdFxuICogaXMgaW52b2tlZCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBDU1Mgc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge05vZGVMaXN0fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvckFsbCA9IGN1cnJ5KGZ1bmN0aW9uIChzZWxlY3RvciwgZWwpIHtcbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwiLyoqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLnR5cGUgICAgICAgICB0eXBlIG9mIHRoZSBtZXNzYWdlOiBpbmZvLCBzdWNjZXNzLCBlcnJvclxuICogQHBhcmFtICB7Ym9vbGVhbn0gIGNvbmZpZy5kaXNtaXNzaWJsZSAgd2hldGhlciB0aGUgbWVzc2FnZSBjYW4gYmUgZGlzbWlzc2VkXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLmNvbnRlbnQgICAgICBtZXNzYWdlIGNvbnRlbnQgdXN1YWxseSBhICdoMycgYW5kIGEgJ3AnXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gZGl2IGNvbnRhaW5pbmcgdGhlIG1lc3NhZ2UgZWxlbWVudFxuICovXG5cbi8vVE9ETyBoYW5kbGUgc3RyaW5ncywgaHRtbCwgYmFkbHkgZm9ybWVkIG9iamVjdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyRXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XG4gIGNsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmI3gyNzE1JztcblxuICBjb25zdCBtZXNzYWdlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtZXNzYWdlQ29udGVudC5jbGFzc05hbWUgPSAnbWVzc2FnZS1jb250ZW50JztcbiAgbWVzc2FnZUNvbnRlbnQuaW5uZXJIVE1MID0gJzxoMT4nICsgbWVzc2FnZS50aXRsZSArICc8L2gxPicgKyAnPHA+JyArIG1lc3NhZ2UuY29udGVudCArICc8L3A+JztcblxuICBjb25zdCBtZXNzYWdlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtZXNzYWdlV3JhcHBlci5jbGFzc05hbWUgPSAnbWVzc2FnZScgKyAnICcgKyBgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUNvbnRlbnQpO1xuXG4gIGlmIChtZXNzYWdlLmJ1dHRvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbWVzc2FnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG1lc3NhZ2VCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbic7XG4gICAgbWVzc2FnZUJ1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlLmJ1dHRvbjtcbiAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQnV0dG9uKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKG1lc3NhZ2VXcmFwcGVyKTtcbiAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gQ29udGVudFR5cGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGNoVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN1bW1hcnlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjcmVhdGVkQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVkX0F0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaXNSZWNvbW1lbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBvcHVsYXJpdHlcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHNjcmVlbnNob3RzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGljZW5zZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV4YW1wbGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0dXRvcmlhbFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0ga2V5d29yZHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvd25lclxuICogQHByb3BlcnR5IHtib29sZWFufSBpbnN0YWxsZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVzdHJpY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBhcGlSb290VXJsIH0pIHtcbiAgICB0aGlzLmFwaVJvb3RVcmwgPSBhcGlSb290VXJsO1xuXG4gICAgaWYoIXdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMpe1xuICAgICAgLy8gVE9ETyByZW1vdmUgdGhpcyB3aGVuIGRvbmUgdGVzdGluZyBmb3IgZXJyb3JzXG4gICAgICAvLyB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWVycm9ycy9OT19SRVNQT05TRS5qc29uYCwge1xuXG4gICAgICB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnQtdHlwZS1jYWNoZWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxuICAgICAgLnRoZW4odGhpcy5pc1ZhbGlkKVxuICAgICAgLnRoZW4oanNvbiA9PiBqc29uLmxpYnJhcmllcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSAge0NvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cbiAgICovXG4gIGlzVmFsaWQocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT59XG4gICAqL1xuICBjb250ZW50VHlwZXMoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcy50aGVuKGNvbnRlbnRUeXBlcyA9PiB7XG4gICAgICByZXR1cm4gY29udGVudFR5cGVzLmZpbHRlcihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSA9PT0gbWFjaGluZU5hbWUpWzBdO1xuICAgIH0pO1xuXG4gICAgLypyZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnRfdHlwZV9jYWNoZS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7Ki9cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YWxscyBhIGNvbnRlbnQgdHlwZSBvbiB0aGUgc2VydmVyXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBpbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktaW5zdGFsbD9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6ICcnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi1zZXJ2aWNlcy5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcblxuZXhwb3J0IGNvbnN0IHJlbGF5Q2xpY2tFdmVudEFzID0gY3VycnkoZnVuY3Rpb24odHlwZSwgZXZlbnRmdWwsIGVsZW1lbnQpIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBldmVudGZ1bC5maXJlKHR5cGUsIHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBpZDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIGRvbid0IGJ1YmJsZVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICByZXR1cm4gZWxlbWVudDtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsImltcG9ydCB7c2V0QXR0cmlidXRlLCBhdHRyaWJ1dGVFcXVhbHMsIHRvZ2dsZUF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtjdXJyeSwgZm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBpc0V4cGFuZGVkID0gYXR0cmlidXRlRXF1YWxzKFwiYXJpYS1leHBhbmRlZFwiLCAndHJ1ZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSBib2R5IHZpc2liaWxpdHlcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBib2R5RWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBpc0V4cGFuZGVkXG4gKi9cbmNvbnN0IHRvZ2dsZUJvZHlWaXNpYmlsaXR5ID0gZnVuY3Rpb24oYm9keUVsZW1lbnQsIGlzRXhwYW5kZWQpIHtcbiAgaWYoIWlzRXhwYW5kZWQpIHtcbiAgICBoaWRlKGJvZHlFbGVtZW50KTtcbiAgICAvL2JvZHlFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMFwiO1xuICB9XG4gIGVsc2UgLyppZihib2R5RWxlbWVudC5zY3JvbGxIZWlnaHQgPiAwKSovIHtcbiAgICBzaG93KGJvZHlFbGVtZW50KTtcbiAgICAvL2JvZHlFbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke2JvZHlFbGVtZW50LnNjcm9sbEhlaWdodH1weGA7XG4gIH1cbn07XG5cbi8qKlxuICogSGFuZGxlcyBjaGFuZ2VzIHRvIGFyaWEtZXhwYW5kZWRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBib2R5RWxlbWVudFxuICogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gZXZlbnRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgb25BcmlhRXhwYW5kZWRDaGFuZ2UgPSBjdXJyeShmdW5jdGlvbihib2R5RWxlbWVudCwgZXZlbnQpIHtcbiAgdG9nZ2xlQm9keVZpc2liaWxpdHkoYm9keUVsZW1lbnQsIGlzRXhwYW5kZWQoZXZlbnQudGFyZ2V0KSk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0aXRsZUVsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1leHBhbmRlZF0nKTtcbiAgY29uc3QgYm9keUlkID0gdGl0bGVFbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgY29uc3QgYm9keUVsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2R5SWR9YCk7XG5cbiAgaWYodGl0bGVFbCkge1xuICAgIC8vIHNldCBvYnNlcnZlciBvbiB0aXRsZSBmb3IgYXJpYS1leHBhbmRlZFxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZvckVhY2gob25BcmlhRXhwYW5kZWRDaGFuZ2UoYm9keUVsKSkpO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0aXRsZUVsLCB7XG4gICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcImFyaWEtZXhwYW5kZWRcIl1cbiAgICB9KTtcblxuICAgIC8vIFNldCBjbGljayBsaXN0ZW5lciB0aGF0IHRvZ2dsZXMgYXJpYS1leHBhbmRlZFxuICAgIHRpdGxlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgdG9nZ2xlQXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBldmVudC50YXJnZXQpO1xuICAgIH0pO1xuXG4gICAgdG9nZ2xlQm9keVZpc2liaWxpdHkoYm9keUVsLCBpc0V4cGFuZGVkKHRpdGxlRWwpKTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwiaW1wb3J0IEh1YlZpZXcgZnJvbSAnLi9odWItdmlldyc7XG5pbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uIGZyb20gJy4vY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24nO1xuaW1wb3J0IFVwbG9hZFNlY3Rpb24gZnJvbSAnLi91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbic7XG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSAnLi9odWItc2VydmljZXMnO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi91dGlscy9lcnJvcnMnO1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBIdWJTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRpdGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbklkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGV4cGFuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYXBpUm9vdFVybFxuICovXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEVycm9yTWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlcnJvckNvZGVcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBTZWxlY3RlZEVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpZFxuICovXG4vKipcbiAqIFNlbGVjdCBldmVudFxuICogQGV2ZW50IEh1YiNzZWxlY3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogRXJyb3IgZXZlbnRcbiAqIEBldmVudCBIdWIjZXJyb3JcbiAqIEB0eXBlIHtFcnJvck1lc3NhZ2V9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgSHViI2Vycm9yXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNvbnRyb2xsZXJzXG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24gPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uKHN0YXRlKTtcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBwcm9wYWdhdGUgY29udHJvbGxlciBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCcsICdlcnJvciddLCB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbik7XG5cbiAgICAvLyBoYW5kbGUgZXZlbnRzXG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy5zZXRQYW5lbFRpdGxlLCB0aGlzKTtcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnZpZXcuY2xvc2VQYW5lbCwgdGhpcy52aWV3KTtcbiAgICAvLyBvbmx5IGluaXRpYWxpemUgdGhlIG1haW4gcGFuZWwgaWYgbm8gZXJyb3JzIGhhdmUgb2NjdXJlZCB3aGVuIHVwZGF0aW5nIHRoZSBjb250ZW50IHR5cGUgbGlzdFxuICAgIHRoaXMudmlldy5vbigndGFiLWNoYW5nZScsIHRoaXMudmlldy5zZXRTZWN0aW9uVHlwZSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcub24oJ3BhbmVsLWNoYW5nZScsIHRoaXMudmlldy50b2dnbGVQYW5lbE9wZW4uYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uLm9uKCd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnLCB0aGlzLnZpZXcuaW5pdGlhbGl6ZVBhbmVsLmJpbmQodGhpcy52aWV3KSwgdGhpcy52aWV3KTtcblxuICAgIHRoaXMuaW5pdFRhYlBhbmVsKClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwcm9taXNlIG9mIGEgY29udGVudCB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBnZXRDb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZSBvZiB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRQYW5lbFRpdGxlKHtpZH0pwqB7XG4gICAgdGhpcy5nZXRDb250ZW50VHlwZShpZCkudGhlbigoe3RpdGxlfSkgPT4gdGhpcy52aWV3LnNldFRpdGxlKHRpdGxlKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSB0YWIgcGFuZWxcbiAgICovXG4gIGluaXRUYWJQYW5lbCgpIHtcbiAgICBjb25zdCB0YWJDb25maWdzID0gW3tcbiAgICAgIHRpdGxlOiAnQ3JlYXRlIENvbnRlbnQnLFxuICAgICAgaWQ6ICdjb250ZW50LXR5cGVzJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMuY29udGVudFR5cGVTZWN0aW9uLmdldEVsZW1lbnQoKSxcbiAgICAgIHNlbGVjdGVkOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1VwbG9hZCcsXG4gICAgICBpZDogJ3VwbG9hZCcsXG4gICAgICBjb250ZW50OiB0aGlzLnVwbG9hZFNlY3Rpb24uZ2V0RWxlbWVudCgpXG4gICAgfV07XG5cbiAgICB0YWJDb25maWdzLmZvckVhY2godGFiQ29uZmlnID0+IHRoaXMudmlldy5hZGRUYWIodGFiQ29uZmlnKSk7XG4gICAgdGhpcy52aWV3LmFkZEJvdHRvbUJvcmRlcigpOyAvLyBBZGRzIGFuIGFuaW1hdGVkIGJvdHRvbSBib3JkZXIgdG8gZWFjaCB0YWJcbiAgICB0aGlzLnZpZXcuaW5pdFRhYlBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IGluIHRoZSB2aWV3XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZXMvbWFpbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7c2V0QXR0cmlidXRlfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2ZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaGlkZUFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJykpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKSk7XG5cbi8qKlxuICogSW5pdGlhdGVzIGEgdGFiIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgY29uc3QgdGFicyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJcIl0nKTtcbiAgY29uc3QgdGFiUGFuZWxzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYnBhbmVsXCJdJyk7XG5cbiAgdGFicy5mb3JFYWNoKHRhYiA9PiB7XG4gICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgIHVuU2VsZWN0QWxsKHRhYnMpO1xuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG5cbiAgICAgIGhpZGVBbGwodGFiUGFuZWxzKTtcblxuICAgICAgbGV0IHRhYlBhbmVsSWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gICAgICBzaG93KGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFiUGFuZWxJZH1gKSk7XG4gICAgfSk7XG4gIH0pXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwiLyoqXG4gKiBsdW5yIC0gaHR0cDovL2x1bnJqcy5jb20gLSBBIGJpdCBsaWtlIFNvbHIsIGJ1dCBtdWNoIHNtYWxsZXIgYW5kIG5vdCBhcyBicmlnaHQgLSAxLjAuMFxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuOyhmdW5jdGlvbigpe1xuXG4vKipcbiAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBpbnN0YW50aWF0aW5nIGEgbmV3IGx1bnIgaW5kZXggYW5kIGNvbmZpZ3VyaW5nIGl0XG4gKiB3aXRoIHRoZSBkZWZhdWx0IHBpcGVsaW5lIGZ1bmN0aW9ucyBhbmQgdGhlIHBhc3NlZCBjb25maWcgZnVuY3Rpb24uXG4gKlxuICogV2hlbiB1c2luZyB0aGlzIGNvbnZlbmllbmNlIGZ1bmN0aW9uIGEgbmV3IGluZGV4IHdpbGwgYmUgY3JlYXRlZCB3aXRoIHRoZVxuICogZm9sbG93aW5nIGZ1bmN0aW9ucyBhbHJlYWR5IGluIHRoZSBwaXBlbGluZTpcbiAqXG4gKiBsdW5yLlN0b3BXb3JkRmlsdGVyIC0gZmlsdGVycyBvdXQgYW55IHN0b3Agd29yZHMgYmVmb3JlIHRoZXkgZW50ZXIgdGhlXG4gKiBpbmRleFxuICpcbiAqIGx1bnIuc3RlbW1lciAtIHN0ZW1zIHRoZSB0b2tlbnMgYmVmb3JlIGVudGVyaW5nIHRoZSBpbmRleC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICB2YXIgaWR4ID0gbHVucihmdW5jdGlvbiAoKSB7XG4gKiAgICAgICB0aGlzLmZpZWxkKCd0aXRsZScsIDEwKVxuICogICAgICAgdGhpcy5maWVsZCgndGFncycsIDEwMClcbiAqICAgICAgIHRoaXMuZmllbGQoJ2JvZHknKVxuICogICAgICAgXG4gKiAgICAgICB0aGlzLnJlZignY2lkJylcbiAqICAgICAgIFxuICogICAgICAgdGhpcy5waXBlbGluZS5hZGQoZnVuY3Rpb24gKCkge1xuICogICAgICAgICAvLyBzb21lIGN1c3RvbSBwaXBlbGluZSBmdW5jdGlvblxuICogICAgICAgfSlcbiAqICAgICAgIFxuICogICAgIH0pXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uZmlnIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBuZXcgaW5zdGFuY2VcbiAqIG9mIHRoZSBsdW5yLkluZGV4IGFzIGJvdGggaXRzIGNvbnRleHQgYW5kIGZpcnN0IHBhcmFtZXRlci4gSXQgY2FuIGJlIHVzZWQgdG9cbiAqIGN1c3RvbWl6ZSB0aGUgaW5zdGFuY2Ugb2YgbmV3IGx1bnIuSW5kZXguXG4gKiBAbmFtZXNwYWNlXG4gKiBAbW9kdWxlXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqXG4gKi9cbnZhciBsdW5yID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICB2YXIgaWR4ID0gbmV3IGx1bnIuSW5kZXhcblxuICBpZHgucGlwZWxpbmUuYWRkKFxuICAgIGx1bnIudHJpbW1lcixcbiAgICBsdW5yLnN0b3BXb3JkRmlsdGVyLFxuICAgIGx1bnIuc3RlbW1lclxuICApXG5cbiAgaWYgKGNvbmZpZykgY29uZmlnLmNhbGwoaWR4LCBpZHgpXG5cbiAgcmV0dXJuIGlkeFxufVxuXG5sdW5yLnZlcnNpb24gPSBcIjEuMC4wXCJcbi8qIVxuICogbHVuci51dGlsc1xuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogQSBuYW1lc3BhY2UgY29udGFpbmluZyB1dGlscyBmb3IgdGhlIHJlc3Qgb2YgdGhlIGx1bnIgbGlicmFyeVxuICovXG5sdW5yLnV0aWxzID0ge31cblxuLyoqXG4gKiBQcmludCBhIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgY29uc29sZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBiZSBwcmludGVkLlxuICogQG1lbWJlck9mIFV0aWxzXG4gKi9cbmx1bnIudXRpbHMud2FybiA9IChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIGlmIChnbG9iYWwuY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKVxuICAgIH1cbiAgfVxufSkodGhpcylcblxuLyoqXG4gKiBDb252ZXJ0IGFuIG9iamVjdCB0byBhIHN0cmluZy5cbiAqXG4gKiBJbiB0aGUgY2FzZSBvZiBgbnVsbGAgYW5kIGB1bmRlZmluZWRgIHRoZSBmdW5jdGlvbiByZXR1cm5zXG4gKiB0aGUgZW1wdHkgc3RyaW5nLCBpbiBhbGwgb3RoZXIgY2FzZXMgdGhlIHJlc3VsdCBvZiBjYWxsaW5nXG4gKiBgdG9TdHJpbmdgIG9uIHRoZSBwYXNzZWQgb2JqZWN0IGlzIHJldHVybmVkLlxuICpcbiAqIEBwYXJhbSB7QW55fSBvYmogVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGEgc3RyaW5nLlxuICogQHJldHVybiB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHBhc3NlZCBvYmplY3QuXG4gKiBAbWVtYmVyT2YgVXRpbHNcbiAqL1xubHVuci51dGlscy5hc1N0cmluZyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKG9iaiA9PT0gdm9pZCAwIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIlwiXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iai50b1N0cmluZygpXG4gIH1cbn1cbi8qIVxuICogbHVuci5FdmVudEVtaXR0ZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuRXZlbnRFbWl0dGVyIGlzIGFuIGV2ZW50IGVtaXR0ZXIgZm9yIGx1bnIuIEl0IG1hbmFnZXMgYWRkaW5nIGFuZCByZW1vdmluZyBldmVudCBoYW5kbGVycyBhbmQgdHJpZ2dlcmluZyBldmVudHMgYW5kIHRoZWlyIGhhbmRsZXJzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLkV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5ldmVudHMgPSB7fVxufVxuXG4vKipcbiAqIEJpbmRzIGEgaGFuZGxlciBmdW5jdGlvbiB0byBhIHNwZWNpZmljIGV2ZW50KHMpLlxuICpcbiAqIENhbiBiaW5kIGEgc2luZ2xlIGZ1bmN0aW9uIHRvIG1hbnkgZGlmZmVyZW50IGV2ZW50cyBpbiBvbmUgY2FsbC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gW2V2ZW50TmFtZV0gVGhlIG5hbWUocykgb2YgZXZlbnRzIHRvIGJpbmQgdGhpcyBmdW5jdGlvbiB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gYW4gZXZlbnQgaXMgZmlyZWQuXG4gKiBAbWVtYmVyT2YgRXZlbnRFbWl0dGVyXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLFxuICAgICAgZm4gPSBhcmdzLnBvcCgpLFxuICAgICAgbmFtZXMgPSBhcmdzXG5cbiAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yIChcImxhc3QgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpXG5cbiAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmICghdGhpcy5oYXNIYW5kbGVyKG5hbWUpKSB0aGlzLmV2ZW50c1tuYW1lXSA9IFtdXG4gICAgdGhpcy5ldmVudHNbbmFtZV0ucHVzaChmbilcbiAgfSwgdGhpcylcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgaGFuZGxlciBmdW5jdGlvbiBmcm9tIGEgc3BlY2lmaWMgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIHRoaXMgZnVuY3Rpb24gZnJvbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byByZW1vdmUgZnJvbSBhbiBldmVudC5cbiAqIEBtZW1iZXJPZiBFdmVudEVtaXR0ZXJcbiAqL1xubHVuci5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gIGlmICghdGhpcy5oYXNIYW5kbGVyKG5hbWUpKSByZXR1cm5cblxuICB2YXIgZm5JbmRleCA9IHRoaXMuZXZlbnRzW25hbWVdLmluZGV4T2YoZm4pXG4gIHRoaXMuZXZlbnRzW25hbWVdLnNwbGljZShmbkluZGV4LCAxKVxuXG4gIGlmICghdGhpcy5ldmVudHNbbmFtZV0ubGVuZ3RoKSBkZWxldGUgdGhpcy5ldmVudHNbbmFtZV1cbn1cblxuLyoqXG4gKiBDYWxscyBhbGwgZnVuY3Rpb25zIGJvdW5kIHRvIHRoZSBnaXZlbiBldmVudC5cbiAqXG4gKiBBZGRpdGlvbmFsIGRhdGEgY2FuIGJlIHBhc3NlZCB0byB0aGUgZXZlbnQgaGFuZGxlciBhcyBhcmd1bWVudHMgdG8gYGVtaXRgXG4gKiBhZnRlciB0aGUgZXZlbnQgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBlbWl0LlxuICogQG1lbWJlck9mIEV2ZW50RW1pdHRlclxuICovXG5sdW5yLkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghdGhpcy5oYXNIYW5kbGVyKG5hbWUpKSByZXR1cm5cblxuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcblxuICB0aGlzLmV2ZW50c1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncylcbiAgfSlcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciBhIGhhbmRsZXIgaGFzIGV2ZXIgYmVlbiBzdG9yZWQgYWdhaW5zdCBhbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBjaGVjay5cbiAqIEBwcml2YXRlXG4gKiBAbWVtYmVyT2YgRXZlbnRFbWl0dGVyXG4gKi9cbmx1bnIuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5oYXNIYW5kbGVyID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUgaW4gdGhpcy5ldmVudHNcbn1cblxuLyohXG4gKiBsdW5yLnRva2VuaXplclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogQSBmdW5jdGlvbiBmb3Igc3BsaXR0aW5nIGEgc3RyaW5nIGludG8gdG9rZW5zIHJlYWR5IHRvIGJlIGluc2VydGVkIGludG9cbiAqIHRoZSBzZWFyY2ggaW5kZXguIFVzZXMgYGx1bnIudG9rZW5pemVyLnNlcGFyYXRvcmAgdG8gc3BsaXQgc3RyaW5ncywgY2hhbmdlXG4gKiB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSB0byBjaGFuZ2UgaG93IHN0cmluZ3MgYXJlIHNwbGl0IGludG8gdG9rZW5zLlxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmogVGhlIHN0cmluZyB0byBjb252ZXJ0IGludG8gdG9rZW5zXG4gKiBAc2VlIGx1bnIudG9rZW5pemVyLnNlcGFyYXRvclxuICogQHJldHVybnMge0FycmF5fVxuICovXG5sdW5yLnRva2VuaXplciA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoIHx8IG9iaiA9PSBudWxsIHx8IG9iaiA9PSB1bmRlZmluZWQpIHJldHVybiBbXVxuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSByZXR1cm4gb2JqLm1hcChmdW5jdGlvbiAodCkgeyByZXR1cm4gbHVuci51dGlscy5hc1N0cmluZyh0KS50b0xvd2VyQ2FzZSgpIH0pXG5cbiAgcmV0dXJuIG9iai50b1N0cmluZygpLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnNwbGl0KGx1bnIudG9rZW5pemVyLnNlcGFyYXRvcilcbn1cblxuLyoqXG4gKiBUaGUgc3BlcmF0b3IgdXNlZCB0byBzcGxpdCBhIHN0cmluZyBpbnRvIHRva2Vucy4gT3ZlcnJpZGUgdGhpcyBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIGJlaGF2aW91ciBvZlxuICogYGx1bnIudG9rZW5pemVyYCBiZWhhdmlvdXIgd2hlbiB0b2tlbml6aW5nIHN0cmluZ3MuIEJ5IGRlZmF1bHQgdGhpcyBzcGxpdHMgb24gd2hpdGVzcGFjZSBhbmQgaHlwaGVucy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2VlIGx1bnIudG9rZW5pemVyXG4gKi9cbmx1bnIudG9rZW5pemVyLnNlcGFyYXRvciA9IC9bXFxzXFwtXSsvXG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgdG9rZW5pemVyLlxuICpcbiAqIEEgdG9rZW5pemVyIGZ1bmN0aW9uIHRvIGJlIGxvYWRlZCBtdXN0IGFscmVhZHkgYmUgcmVnaXN0ZXJlZCB3aXRoIGx1bnIudG9rZW5pemVyLlxuICogSWYgdGhlIHNlcmlhbGlzZWQgdG9rZW5pemVyIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkIHRoZW4gYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIFRoZSBsYWJlbCBvZiB0aGUgc2VyaWFsaXNlZCB0b2tlbml6ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKiBAbWVtYmVyT2YgdG9rZW5pemVyXG4gKi9cbmx1bnIudG9rZW5pemVyLmxvYWQgPSBmdW5jdGlvbiAobGFiZWwpIHtcbiAgdmFyIGZuID0gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zW2xhYmVsXVxuXG4gIGlmICghZm4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBsb2FkIHVuLXJlZ2lzdGVyZWQgZnVuY3Rpb246ICcgKyBsYWJlbClcbiAgfVxuXG4gIHJldHVybiBmblxufVxuXG5sdW5yLnRva2VuaXplci5sYWJlbCA9ICdkZWZhdWx0J1xuXG5sdW5yLnRva2VuaXplci5yZWdpc3RlcmVkRnVuY3Rpb25zID0ge1xuICAnZGVmYXVsdCc6IGx1bnIudG9rZW5pemVyXG59XG5cbi8qKlxuICogUmVnaXN0ZXIgYSB0b2tlbml6ZXIgZnVuY3Rpb24uXG4gKlxuICogRnVuY3Rpb25zIHRoYXQgYXJlIHVzZWQgYXMgdG9rZW5pemVycyBzaG91bGQgYmUgcmVnaXN0ZXJlZCBpZiB0aGV5IGFyZSB0byBiZSB1c2VkIHdpdGggYSBzZXJpYWxpc2VkIGluZGV4LlxuICpcbiAqIFJlZ2lzdGVyaW5nIGEgZnVuY3Rpb24gZG9lcyBub3QgYWRkIGl0IHRvIGFuIGluZGV4LCBmdW5jdGlvbnMgbXVzdCBzdGlsbCBiZSBhc3NvY2lhdGVkIHdpdGggYSBzcGVjaWZpYyBpbmRleCBmb3IgdGhlbSB0byBiZSB1c2VkIHdoZW4gaW5kZXhpbmcgYW5kIHNlYXJjaGluZyBkb2N1bWVudHMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJlZ2lzdGVyLlxuICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIFRoZSBsYWJlbCB0byByZWdpc3RlciB0aGlzIGZ1bmN0aW9uIHdpdGhcbiAqIEBtZW1iZXJPZiB0b2tlbml6ZXJcbiAqL1xubHVuci50b2tlbml6ZXIucmVnaXN0ZXJGdW5jdGlvbiA9IGZ1bmN0aW9uIChmbiwgbGFiZWwpIHtcbiAgaWYgKGxhYmVsIGluIHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9ucykge1xuICAgIGx1bnIudXRpbHMud2FybignT3ZlcndyaXRpbmcgZXhpc3RpbmcgdG9rZW5pemVyOiAnICsgbGFiZWwpXG4gIH1cblxuICBmbi5sYWJlbCA9IGxhYmVsXG4gIHRoaXMucmVnaXN0ZXJlZEZ1bmN0aW9uc1tsYWJlbF0gPSBmblxufVxuLyohXG4gKiBsdW5yLlBpcGVsaW5lXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlBpcGVsaW5lcyBtYWludGFpbiBhbiBvcmRlcmVkIGxpc3Qgb2YgZnVuY3Rpb25zIHRvIGJlIGFwcGxpZWQgdG8gYWxsXG4gKiB0b2tlbnMgaW4gZG9jdW1lbnRzIGVudGVyaW5nIHRoZSBzZWFyY2ggaW5kZXggYW5kIHF1ZXJpZXMgYmVpbmcgcmFuIGFnYWluc3RcbiAqIHRoZSBpbmRleC5cbiAqXG4gKiBBbiBpbnN0YW5jZSBvZiBsdW5yLkluZGV4IGNyZWF0ZWQgd2l0aCB0aGUgbHVuciBzaG9ydGN1dCB3aWxsIGNvbnRhaW4gYVxuICogcGlwZWxpbmUgd2l0aCBhIHN0b3Agd29yZCBmaWx0ZXIgYW5kIGFuIEVuZ2xpc2ggbGFuZ3VhZ2Ugc3RlbW1lci4gRXh0cmFcbiAqIGZ1bmN0aW9ucyBjYW4gYmUgYWRkZWQgYmVmb3JlIG9yIGFmdGVyIGVpdGhlciBvZiB0aGVzZSBmdW5jdGlvbnMgb3IgdGhlc2VcbiAqIGRlZmF1bHQgZnVuY3Rpb25zIGNhbiBiZSByZW1vdmVkLlxuICpcbiAqIFdoZW4gcnVuIHRoZSBwaXBlbGluZSB3aWxsIGNhbGwgZWFjaCBmdW5jdGlvbiBpbiB0dXJuLCBwYXNzaW5nIGEgdG9rZW4sIHRoZVxuICogaW5kZXggb2YgdGhhdCB0b2tlbiBpbiB0aGUgb3JpZ2luYWwgbGlzdCBvZiBhbGwgdG9rZW5zIGFuZCBmaW5hbGx5IGEgbGlzdCBvZlxuICogYWxsIHRoZSBvcmlnaW5hbCB0b2tlbnMuXG4gKlxuICogVGhlIG91dHB1dCBvZiBmdW5jdGlvbnMgaW4gdGhlIHBpcGVsaW5lIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBuZXh0IGZ1bmN0aW9uXG4gKiBpbiB0aGUgcGlwZWxpbmUuIFRvIGV4Y2x1ZGUgYSB0b2tlbiBmcm9tIGVudGVyaW5nIHRoZSBpbmRleCB0aGUgZnVuY3Rpb25cbiAqIHNob3VsZCByZXR1cm4gdW5kZWZpbmVkLCB0aGUgcmVzdCBvZiB0aGUgcGlwZWxpbmUgd2lsbCBub3QgYmUgY2FsbGVkIHdpdGhcbiAqIHRoaXMgdG9rZW4uXG4gKlxuICogRm9yIHNlcmlhbGlzYXRpb24gb2YgcGlwZWxpbmVzIHRvIHdvcmssIGFsbCBmdW5jdGlvbnMgdXNlZCBpbiBhbiBpbnN0YW5jZSBvZlxuICogYSBwaXBlbGluZSBzaG91bGQgYmUgcmVnaXN0ZXJlZCB3aXRoIGx1bnIuUGlwZWxpbmUuIFJlZ2lzdGVyZWQgZnVuY3Rpb25zIGNhblxuICogdGhlbiBiZSBsb2FkZWQuIElmIHRyeWluZyB0byBsb2FkIGEgc2VyaWFsaXNlZCBwaXBlbGluZSB0aGF0IHVzZXMgZnVuY3Rpb25zXG4gKiB0aGF0IGFyZSBub3QgcmVnaXN0ZXJlZCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBJZiBub3QgcGxhbm5pbmcgb24gc2VyaWFsaXNpbmcgdGhlIHBpcGVsaW5lIHRoZW4gcmVnaXN0ZXJpbmcgcGlwZWxpbmUgZnVuY3Rpb25zXG4gKiBpcyBub3QgbmVjZXNzYXJ5LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlBpcGVsaW5lID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9zdGFjayA9IFtdXG59XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJlZEZ1bmN0aW9ucyA9IHt9XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBmdW5jdGlvbiB3aXRoIHRoZSBwaXBlbGluZS5cbiAqXG4gKiBGdW5jdGlvbnMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgcGlwZWxpbmUgc2hvdWxkIGJlIHJlZ2lzdGVyZWQgaWYgdGhlIHBpcGVsaW5lXG4gKiBuZWVkcyB0byBiZSBzZXJpYWxpc2VkLCBvciBhIHNlcmlhbGlzZWQgcGlwZWxpbmUgbmVlZHMgdG8gYmUgbG9hZGVkLlxuICpcbiAqIFJlZ2lzdGVyaW5nIGEgZnVuY3Rpb24gZG9lcyBub3QgYWRkIGl0IHRvIGEgcGlwZWxpbmUsIGZ1bmN0aW9ucyBtdXN0IHN0aWxsIGJlXG4gKiBhZGRlZCB0byBpbnN0YW5jZXMgb2YgdGhlIHBpcGVsaW5lIGZvciB0aGVtIHRvIGJlIHVzZWQgd2hlbiBydW5uaW5nIGEgcGlwZWxpbmUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIGZvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBUaGUgbGFiZWwgdG8gcmVnaXN0ZXIgdGhpcyBmdW5jdGlvbiB3aXRoXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uID0gZnVuY3Rpb24gKGZuLCBsYWJlbCkge1xuICBpZiAobGFiZWwgaW4gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdPdmVyd3JpdGluZyBleGlzdGluZyByZWdpc3RlcmVkIGZ1bmN0aW9uOiAnICsgbGFiZWwpXG4gIH1cblxuICBmbi5sYWJlbCA9IGxhYmVsXG4gIGx1bnIuUGlwZWxpbmUucmVnaXN0ZXJlZEZ1bmN0aW9uc1tmbi5sYWJlbF0gPSBmblxufVxuXG4vKipcbiAqIFdhcm5zIGlmIHRoZSBmdW5jdGlvbiBpcyBub3QgcmVnaXN0ZXJlZCBhcyBhIFBpcGVsaW5lIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjaGVjayBmb3IuXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBpc1JlZ2lzdGVyZWQgPSBmbi5sYWJlbCAmJiAoZm4ubGFiZWwgaW4gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zKVxuXG4gIGlmICghaXNSZWdpc3RlcmVkKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdGdW5jdGlvbiBpcyBub3QgcmVnaXN0ZXJlZCB3aXRoIHBpcGVsaW5lLiBUaGlzIG1heSBjYXVzZSBwcm9ibGVtcyB3aGVuIHNlcmlhbGlzaW5nIHRoZSBpbmRleC5cXG4nLCBmbilcbiAgfVxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHBpcGVsaW5lLlxuICpcbiAqIEFsbCBmdW5jdGlvbnMgdG8gYmUgbG9hZGVkIG11c3QgYWxyZWFkeSBiZSByZWdpc3RlcmVkIHdpdGggbHVuci5QaXBlbGluZS5cbiAqIElmIGFueSBmdW5jdGlvbiBmcm9tIHRoZSBzZXJpYWxpc2VkIGRhdGEgaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQgdGhlbiBhblxuICogZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWQgVGhlIHNlcmlhbGlzZWQgcGlwZWxpbmUgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLlBpcGVsaW5lfVxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkKSB7XG4gIHZhciBwaXBlbGluZSA9IG5ldyBsdW5yLlBpcGVsaW5lXG5cbiAgc2VyaWFsaXNlZC5mb3JFYWNoKGZ1bmN0aW9uIChmbk5hbWUpIHtcbiAgICB2YXIgZm4gPSBsdW5yLlBpcGVsaW5lLnJlZ2lzdGVyZWRGdW5jdGlvbnNbZm5OYW1lXVxuXG4gICAgaWYgKGZuKSB7XG4gICAgICBwaXBlbGluZS5hZGQoZm4pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGxvYWQgdW4tcmVnaXN0ZXJlZCBmdW5jdGlvbjogJyArIGZuTmFtZSlcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHBpcGVsaW5lXG59XG5cbi8qKlxuICogQWRkcyBuZXcgZnVuY3Rpb25zIHRvIHRoZSBlbmQgb2YgdGhlIHBpcGVsaW5lLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jdGlvbnMgQW55IG51bWJlciBvZiBmdW5jdGlvbnMgdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAqIEBtZW1iZXJPZiBQaXBlbGluZVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBmbnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXG5cbiAgZm5zLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQoZm4pXG4gICAgdGhpcy5fc3RhY2sucHVzaChmbilcbiAgfSwgdGhpcylcbn1cblxuLyoqXG4gKiBBZGRzIGEgc2luZ2xlIGZ1bmN0aW9uIGFmdGVyIGEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGVcbiAqIHBpcGVsaW5lLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGlzdGluZ0ZuIEEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgcGlwZWxpbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXdGbiBUaGUgbmV3IGZ1bmN0aW9uIHRvIGFkZCB0byB0aGUgcGlwZWxpbmUuXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUuYWZ0ZXIgPSBmdW5jdGlvbiAoZXhpc3RpbmdGbiwgbmV3Rm4pIHtcbiAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQobmV3Rm4pXG5cbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZXhpc3RpbmdGbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgZXhpc3RpbmdGbicpXG4gIH1cblxuICBwb3MgPSBwb3MgKyAxXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDAsIG5ld0ZuKVxufVxuXG4vKipcbiAqIEFkZHMgYSBzaW5nbGUgZnVuY3Rpb24gYmVmb3JlIGEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGVcbiAqIHBpcGVsaW5lLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGlzdGluZ0ZuIEEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgcGlwZWxpbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXdGbiBUaGUgbmV3IGZ1bmN0aW9uIHRvIGFkZCB0byB0aGUgcGlwZWxpbmUuXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUuYmVmb3JlID0gZnVuY3Rpb24gKGV4aXN0aW5nRm4sIG5ld0ZuKSB7XG4gIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkKG5ld0ZuKVxuXG4gIHZhciBwb3MgPSB0aGlzLl9zdGFjay5pbmRleE9mKGV4aXN0aW5nRm4pXG4gIGlmIChwb3MgPT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIGV4aXN0aW5nRm4nKVxuICB9XG5cbiAgdGhpcy5fc3RhY2suc3BsaWNlKHBvcywgMCwgbmV3Rm4pXG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGZ1bmN0aW9uIGZyb20gdGhlIHBpcGVsaW5lLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byByZW1vdmUgZnJvbSB0aGUgcGlwZWxpbmUuXG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBwb3MgPSB0aGlzLl9zdGFjay5pbmRleE9mKGZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAxKVxufVxuXG4vKipcbiAqIFJ1bnMgdGhlIGN1cnJlbnQgbGlzdCBvZiBmdW5jdGlvbnMgdGhhdCBtYWtlIHVwIHRoZSBwaXBlbGluZSBhZ2FpbnN0IHRoZVxuICogcGFzc2VkIHRva2Vucy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB0b2tlbnMgVGhlIHRva2VucyB0byBydW4gdGhyb3VnaCB0aGUgcGlwZWxpbmUuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgUGlwZWxpbmVcbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKHRva2Vucykge1xuICB2YXIgb3V0ID0gW10sXG4gICAgICB0b2tlbkxlbmd0aCA9IHRva2Vucy5sZW5ndGgsXG4gICAgICBzdGFja0xlbmd0aCA9IHRoaXMuX3N0YWNrLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5MZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXVxuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBzdGFja0xlbmd0aDsgaisrKSB7XG4gICAgICB0b2tlbiA9IHRoaXMuX3N0YWNrW2pdKHRva2VuLCBpLCB0b2tlbnMpXG4gICAgICBpZiAodG9rZW4gPT09IHZvaWQgMCB8fCB0b2tlbiA9PT0gJycpIGJyZWFrXG4gICAgfTtcblxuICAgIGlmICh0b2tlbiAhPT0gdm9pZCAwICYmIHRva2VuICE9PSAnJykgb3V0LnB1c2godG9rZW4pXG4gIH07XG5cbiAgcmV0dXJuIG91dFxufVxuXG4vKipcbiAqIFJlc2V0cyB0aGUgcGlwZWxpbmUgYnkgcmVtb3ZpbmcgYW55IGV4aXN0aW5nIHByb2Nlc3NvcnMuXG4gKlxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9zdGFjayA9IFtdXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwaXBlbGluZSByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFBpcGVsaW5lXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX3N0YWNrLm1hcChmdW5jdGlvbiAoZm4pIHtcbiAgICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChmbilcblxuICAgIHJldHVybiBmbi5sYWJlbFxuICB9KVxufVxuLyohXG4gKiBsdW5yLlZlY3RvclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5WZWN0b3JzIGltcGxlbWVudCB2ZWN0b3IgcmVsYXRlZCBvcGVyYXRpb25zIGZvclxuICogYSBzZXJpZXMgb2YgZWxlbWVudHMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9tYWduaXR1ZGUgPSBudWxsXG4gIHRoaXMubGlzdCA9IHVuZGVmaW5lZFxuICB0aGlzLmxlbmd0aCA9IDBcbn1cblxuLyoqXG4gKiBsdW5yLlZlY3Rvci5Ob2RlIGlzIGEgc2ltcGxlIHN0cnVjdCBmb3IgZWFjaCBub2RlXG4gKiBpbiBhIGx1bnIuVmVjdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBub2RlIGluIHRoZSB2ZWN0b3IuXG4gKiBAcGFyYW0ge09iamVjdH0gVGhlIGRhdGEgYXQgdGhpcyBub2RlIGluIHRoZSB2ZWN0b3IuXG4gKiBAcGFyYW0ge2x1bnIuVmVjdG9yLk5vZGV9IFRoZSBub2RlIGRpcmVjdGx5IGFmdGVyIHRoaXMgbm9kZSBpbiB0aGUgdmVjdG9yLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAbWVtYmVyT2YgVmVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yLk5vZGUgPSBmdW5jdGlvbiAoaWR4LCB2YWwsIG5leHQpIHtcbiAgdGhpcy5pZHggPSBpZHhcbiAgdGhpcy52YWwgPSB2YWxcbiAgdGhpcy5uZXh0ID0gbmV4dFxufVxuXG4vKipcbiAqIEluc2VydHMgYSBuZXcgdmFsdWUgYXQgYSBwb3NpdGlvbiBpbiBhIHZlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gVGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCBhIHZhbHVlLlxuICogQHBhcmFtIHtPYmplY3R9IFRoZSBvYmplY3QgdG8gaW5zZXJ0IGluIHRoZSB2ZWN0b3IuXG4gKiBAbWVtYmVyT2YgVmVjdG9yLlxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gKGlkeCwgdmFsKSB7XG4gIHRoaXMuX21hZ25pdHVkZSA9IHVuZGVmaW5lZDtcbiAgdmFyIGxpc3QgPSB0aGlzLmxpc3RcblxuICBpZiAoIWxpc3QpIHtcbiAgICB0aGlzLmxpc3QgPSBuZXcgbHVuci5WZWN0b3IuTm9kZSAoaWR4LCB2YWwsIGxpc3QpXG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoKytcbiAgfVxuXG4gIGlmIChpZHggPCBsaXN0LmlkeCkge1xuICAgIHRoaXMubGlzdCA9IG5ldyBsdW5yLlZlY3Rvci5Ob2RlIChpZHgsIHZhbCwgbGlzdClcbiAgICByZXR1cm4gdGhpcy5sZW5ndGgrK1xuICB9XG5cbiAgdmFyIHByZXYgPSBsaXN0LFxuICAgICAgbmV4dCA9IGxpc3QubmV4dFxuXG4gIHdoaWxlIChuZXh0ICE9IHVuZGVmaW5lZCkge1xuICAgIGlmIChpZHggPCBuZXh0LmlkeCkge1xuICAgICAgcHJldi5uZXh0ID0gbmV3IGx1bnIuVmVjdG9yLk5vZGUgKGlkeCwgdmFsLCBuZXh0KVxuICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoKytcbiAgICB9XG5cbiAgICBwcmV2ID0gbmV4dCwgbmV4dCA9IG5leHQubmV4dFxuICB9XG5cbiAgcHJldi5uZXh0ID0gbmV3IGx1bnIuVmVjdG9yLk5vZGUgKGlkeCwgdmFsLCBuZXh0KVxuICByZXR1cm4gdGhpcy5sZW5ndGgrK1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG1hZ25pdHVkZSBvZiB0aGlzIHZlY3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICogQG1lbWJlck9mIFZlY3RvclxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUubWFnbml0dWRlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5fbWFnbml0dWRlKSByZXR1cm4gdGhpcy5fbWFnbml0dWRlXG4gIHZhciBub2RlID0gdGhpcy5saXN0LFxuICAgICAgc3VtT2ZTcXVhcmVzID0gMCxcbiAgICAgIHZhbFxuXG4gIHdoaWxlIChub2RlKSB7XG4gICAgdmFsID0gbm9kZS52YWxcbiAgICBzdW1PZlNxdWFyZXMgKz0gdmFsICogdmFsXG4gICAgbm9kZSA9IG5vZGUubmV4dFxuICB9XG5cbiAgcmV0dXJuIHRoaXMuX21hZ25pdHVkZSA9IE1hdGguc3FydChzdW1PZlNxdWFyZXMpXG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXIgdmVjdG9yLlxuICpcbiAqIEBwYXJhbSB7bHVuci5WZWN0b3J9IG90aGVyVmVjdG9yIFRoZSB2ZWN0b3IgdG8gY29tcHV0ZSB0aGUgZG90IHByb2R1Y3Qgd2l0aC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgVmVjdG9yXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAob3RoZXJWZWN0b3IpIHtcbiAgdmFyIG5vZGUgPSB0aGlzLmxpc3QsXG4gICAgICBvdGhlck5vZGUgPSBvdGhlclZlY3Rvci5saXN0LFxuICAgICAgZG90UHJvZHVjdCA9IDBcblxuICB3aGlsZSAobm9kZSAmJiBvdGhlck5vZGUpIHtcbiAgICBpZiAobm9kZS5pZHggPCBvdGhlck5vZGUuaWR4KSB7XG4gICAgICBub2RlID0gbm9kZS5uZXh0XG4gICAgfSBlbHNlIGlmIChub2RlLmlkeCA+IG90aGVyTm9kZS5pZHgpIHtcbiAgICAgIG90aGVyTm9kZSA9IG90aGVyTm9kZS5uZXh0XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvdFByb2R1Y3QgKz0gbm9kZS52YWwgKiBvdGhlck5vZGUudmFsXG4gICAgICBub2RlID0gbm9kZS5uZXh0XG4gICAgICBvdGhlck5vZGUgPSBvdGhlck5vZGUubmV4dFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkb3RQcm9kdWN0XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgY29zaW5lIHNpbWlsYXJpdHkgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICogdmVjdG9yLlxuICpcbiAqIEBwYXJhbSB7bHVuci5WZWN0b3J9IG90aGVyVmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgdG8gY2FsY3VsYXRlIHRoZVxuICogc2ltaWxhcml0eSB3aXRoLlxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBWZWN0b3JcbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLnNpbWlsYXJpdHkgPSBmdW5jdGlvbiAob3RoZXJWZWN0b3IpIHtcbiAgcmV0dXJuIHRoaXMuZG90KG90aGVyVmVjdG9yKSAvICh0aGlzLm1hZ25pdHVkZSgpICogb3RoZXJWZWN0b3IubWFnbml0dWRlKCkpXG59XG4vKiFcbiAqIGx1bnIuU29ydGVkU2V0XG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlNvcnRlZFNldHMgYXJlIHVzZWQgdG8gbWFpbnRhaW4gYW4gYXJyYXkgb2YgdW5pcSB2YWx1ZXMgaW4gYSBzb3J0ZWRcbiAqIG9yZGVyLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlNvcnRlZFNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5sZW5ndGggPSAwXG4gIHRoaXMuZWxlbWVudHMgPSBbXVxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHNvcnRlZCBzZXQuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gc2VyaWFsaXNlZERhdGEgVGhlIHNlcmlhbGlzZWQgc2V0IHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7bHVuci5Tb3J0ZWRTZXR9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXNlZERhdGEpIHtcbiAgdmFyIHNldCA9IG5ldyB0aGlzXG5cbiAgc2V0LmVsZW1lbnRzID0gc2VyaWFsaXNlZERhdGFcbiAgc2V0Lmxlbmd0aCA9IHNlcmlhbGlzZWREYXRhLmxlbmd0aFxuXG4gIHJldHVybiBzZXRcbn1cblxuLyoqXG4gKiBJbnNlcnRzIG5ldyBpdGVtcyBpbnRvIHRoZSBzZXQgaW4gdGhlIGNvcnJlY3QgcG9zaXRpb24gdG8gbWFpbnRhaW4gdGhlXG4gKiBvcmRlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gVGhlIG9iamVjdHMgdG8gYWRkIHRvIHRoaXMgc2V0LlxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaSwgZWxlbWVudFxuXG4gIGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBlbGVtZW50ID0gYXJndW1lbnRzW2ldXG4gICAgaWYgKH50aGlzLmluZGV4T2YoZWxlbWVudCkpIGNvbnRpbnVlXG4gICAgdGhpcy5lbGVtZW50cy5zcGxpY2UodGhpcy5sb2NhdGlvbkZvcihlbGVtZW50KSwgMCwgZWxlbWVudClcbiAgfVxuXG4gIHRoaXMubGVuZ3RoID0gdGhpcy5lbGVtZW50cy5sZW5ndGhcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIHNvcnRlZCBzZXQgaW50byBhbiBhcnJheS5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5lbGVtZW50cy5zbGljZSgpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBhcnJheSB3aXRoIHRoZSByZXN1bHRzIG9mIGNhbGxpbmcgYSBwcm92aWRlZCBmdW5jdGlvbiBvbiBldmVyeVxuICogZWxlbWVudCBpbiB0aGlzIHNvcnRlZCBzZXQuXG4gKlxuICogRGVsZWdhdGVzIHRvIEFycmF5LnByb3RvdHlwZS5tYXAgYW5kIGhhcyB0aGUgc2FtZSBzaWduYXR1cmUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIG9uIGVhY2ggZWxlbWVudCBvZiB0aGVcbiAqIHNldC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggQW4gb3B0aW9uYWwgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgdGhlIGNvbnRleHRcbiAqIGZvciB0aGUgZnVuY3Rpb24gZm4uXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoZm4sIGN0eCkge1xuICByZXR1cm4gdGhpcy5lbGVtZW50cy5tYXAoZm4sIGN0eClcbn1cblxuLyoqXG4gKiBFeGVjdXRlcyBhIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgcGVyIHNvcnRlZCBzZXQgZWxlbWVudC5cbiAqXG4gKiBEZWxlZ2F0ZXMgdG8gQXJyYXkucHJvdG90eXBlLmZvckVhY2ggYW5kIGhhcyB0aGUgc2FtZSBzaWduYXR1cmUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIG9uIGVhY2ggZWxlbWVudCBvZiB0aGVcbiAqIHNldC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggQW4gb3B0aW9uYWwgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgdGhlIGNvbnRleHRcbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqIGZvciB0aGUgZnVuY3Rpb24gZm4uXG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGZuLCBjdHgpIHtcbiAgcmV0dXJuIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmbiwgY3R4KVxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGluZGV4IGF0IHdoaWNoIGEgZ2l2ZW4gZWxlbWVudCBjYW4gYmUgZm91bmQgaW4gdGhlXG4gKiBzb3J0ZWQgc2V0LCBvciAtMSBpZiBpdCBpcyBub3QgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZWxlbSBUaGUgb2JqZWN0IHRvIGxvY2F0ZSBpbiB0aGUgc29ydGVkIHNldC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgdmFyIHN0YXJ0ID0gMCxcbiAgICAgIGVuZCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgc2VjdGlvbkxlbmd0aCA9IGVuZCAtIHN0YXJ0LFxuICAgICAgcGl2b3QgPSBzdGFydCArIE1hdGguZmxvb3Ioc2VjdGlvbkxlbmd0aCAvIDIpLFxuICAgICAgcGl2b3RFbGVtID0gdGhpcy5lbGVtZW50c1twaXZvdF1cblxuICB3aGlsZSAoc2VjdGlvbkxlbmd0aCA+IDEpIHtcbiAgICBpZiAocGl2b3RFbGVtID09PSBlbGVtKSByZXR1cm4gcGl2b3RcblxuICAgIGlmIChwaXZvdEVsZW0gPCBlbGVtKSBzdGFydCA9IHBpdm90XG4gICAgaWYgKHBpdm90RWxlbSA+IGVsZW0pIGVuZCA9IHBpdm90XG5cbiAgICBzZWN0aW9uTGVuZ3RoID0gZW5kIC0gc3RhcnRcbiAgICBwaXZvdCA9IHN0YXJ0ICsgTWF0aC5mbG9vcihzZWN0aW9uTGVuZ3RoIC8gMilcbiAgICBwaXZvdEVsZW0gPSB0aGlzLmVsZW1lbnRzW3Bpdm90XVxuICB9XG5cbiAgaWYgKHBpdm90RWxlbSA9PT0gZWxlbSkgcmV0dXJuIHBpdm90XG5cbiAgcmV0dXJuIC0xXG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gd2l0aGluIHRoZSBzb3J0ZWQgc2V0IHRoYXQgYW4gZWxlbWVudCBzaG91bGQgYmVcbiAqIGluc2VydGVkIGF0IHRvIG1haW50YWluIHRoZSBjdXJyZW50IG9yZGVyIG9mIHRoZSBzZXQuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgdGhlIGVsZW1lbnQgdG8gc2VhcmNoIGZvciBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0XG4gKiBpbiB0aGUgc29ydGVkIHNldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZWxlbSBUaGUgZWxlbSB0byBmaW5kIHRoZSBwb3NpdGlvbiBmb3IgaW4gdGhlIHNldFxuICogQHJldHVybnMge051bWJlcn1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLmxvY2F0aW9uRm9yID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgdmFyIHN0YXJ0ID0gMCxcbiAgICAgIGVuZCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoLFxuICAgICAgc2VjdGlvbkxlbmd0aCA9IGVuZCAtIHN0YXJ0LFxuICAgICAgcGl2b3QgPSBzdGFydCArIE1hdGguZmxvb3Ioc2VjdGlvbkxlbmd0aCAvIDIpLFxuICAgICAgcGl2b3RFbGVtID0gdGhpcy5lbGVtZW50c1twaXZvdF1cblxuICB3aGlsZSAoc2VjdGlvbkxlbmd0aCA+IDEpIHtcbiAgICBpZiAocGl2b3RFbGVtIDwgZWxlbSkgc3RhcnQgPSBwaXZvdFxuICAgIGlmIChwaXZvdEVsZW0gPiBlbGVtKSBlbmQgPSBwaXZvdFxuXG4gICAgc2VjdGlvbkxlbmd0aCA9IGVuZCAtIHN0YXJ0XG4gICAgcGl2b3QgPSBzdGFydCArIE1hdGguZmxvb3Ioc2VjdGlvbkxlbmd0aCAvIDIpXG4gICAgcGl2b3RFbGVtID0gdGhpcy5lbGVtZW50c1twaXZvdF1cbiAgfVxuXG4gIGlmIChwaXZvdEVsZW0gPiBlbGVtKSByZXR1cm4gcGl2b3RcbiAgaWYgKHBpdm90RWxlbSA8IGVsZW0pIHJldHVybiBwaXZvdCArIDFcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGx1bnIuU29ydGVkU2V0IHRoYXQgY29udGFpbnMgdGhlIGVsZW1lbnRzIGluIHRoZSBpbnRlcnNlY3Rpb25cbiAqIG9mIHRoaXMgc2V0IGFuZCB0aGUgcGFzc2VkIHNldC5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuU29ydGVkU2V0fSBvdGhlclNldCBUaGUgc2V0IHRvIGludGVyc2VjdCB3aXRoIHRoaXMgc2V0LlxuICogQHJldHVybnMge2x1bnIuU29ydGVkU2V0fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUuaW50ZXJzZWN0ID0gZnVuY3Rpb24gKG90aGVyU2V0KSB7XG4gIHZhciBpbnRlcnNlY3RTZXQgPSBuZXcgbHVuci5Tb3J0ZWRTZXQsXG4gICAgICBpID0gMCwgaiA9IDAsXG4gICAgICBhX2xlbiA9IHRoaXMubGVuZ3RoLCBiX2xlbiA9IG90aGVyU2V0Lmxlbmd0aCxcbiAgICAgIGEgPSB0aGlzLmVsZW1lbnRzLCBiID0gb3RoZXJTZXQuZWxlbWVudHNcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGlmIChpID4gYV9sZW4gLSAxIHx8IGogPiBiX2xlbiAtIDEpIGJyZWFrXG5cbiAgICBpZiAoYVtpXSA9PT0gYltqXSkge1xuICAgICAgaW50ZXJzZWN0U2V0LmFkZChhW2ldKVxuICAgICAgaSsrLCBqKytcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKGFbaV0gPCBiW2pdKSB7XG4gICAgICBpKytcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKGFbaV0gPiBiW2pdKSB7XG4gICAgICBqKytcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBpbnRlcnNlY3RTZXRcbn1cblxuLyoqXG4gKiBNYWtlcyBhIGNvcHkgb2YgdGhpcyBzZXRcbiAqXG4gKiBAcmV0dXJucyB7bHVuci5Tb3J0ZWRTZXR9XG4gKiBAbWVtYmVyT2YgU29ydGVkU2V0XG4gKi9cbmx1bnIuU29ydGVkU2V0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNsb25lID0gbmV3IGx1bnIuU29ydGVkU2V0XG5cbiAgY2xvbmUuZWxlbWVudHMgPSB0aGlzLnRvQXJyYXkoKVxuICBjbG9uZS5sZW5ndGggPSBjbG9uZS5lbGVtZW50cy5sZW5ndGhcblxuICByZXR1cm4gY2xvbmVcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGx1bnIuU29ydGVkU2V0IHRoYXQgY29udGFpbnMgdGhlIGVsZW1lbnRzIGluIHRoZSB1bmlvblxuICogb2YgdGhpcyBzZXQgYW5kIHRoZSBwYXNzZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7bHVuci5Tb3J0ZWRTZXR9IG90aGVyU2V0IFRoZSBzZXQgdG8gdW5pb24gd2l0aCB0aGlzIHNldC5cbiAqIEByZXR1cm5zIHtsdW5yLlNvcnRlZFNldH1cbiAqIEBtZW1iZXJPZiBTb3J0ZWRTZXRcbiAqL1xubHVuci5Tb3J0ZWRTZXQucHJvdG90eXBlLnVuaW9uID0gZnVuY3Rpb24gKG90aGVyU2V0KSB7XG4gIHZhciBsb25nU2V0LCBzaG9ydFNldCwgdW5pb25TZXRcblxuICBpZiAodGhpcy5sZW5ndGggPj0gb3RoZXJTZXQubGVuZ3RoKSB7XG4gICAgbG9uZ1NldCA9IHRoaXMsIHNob3J0U2V0ID0gb3RoZXJTZXRcbiAgfSBlbHNlIHtcbiAgICBsb25nU2V0ID0gb3RoZXJTZXQsIHNob3J0U2V0ID0gdGhpc1xuICB9XG5cbiAgdW5pb25TZXQgPSBsb25nU2V0LmNsb25lKClcblxuICBmb3IodmFyIGkgPSAwLCBzaG9ydFNldEVsZW1lbnRzID0gc2hvcnRTZXQudG9BcnJheSgpOyBpIDwgc2hvcnRTZXRFbGVtZW50cy5sZW5ndGg7IGkrKyl7XG4gICAgdW5pb25TZXQuYWRkKHNob3J0U2V0RWxlbWVudHNbaV0pXG4gIH1cblxuICByZXR1cm4gdW5pb25TZXRcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNvcnRlZCBzZXQgcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFNvcnRlZFNldFxuICovXG5sdW5yLlNvcnRlZFNldC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy50b0FycmF5KClcbn1cbi8qIVxuICogbHVuci5JbmRleFxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5JbmRleCBpcyBvYmplY3QgdGhhdCBtYW5hZ2VzIGEgc2VhcmNoIGluZGV4LiAgSXQgY29udGFpbnMgdGhlIGluZGV4ZXNcbiAqIGFuZCBzdG9yZXMgYWxsIHRoZSB0b2tlbnMgYW5kIGRvY3VtZW50IGxvb2t1cHMuICBJdCBhbHNvIHByb3ZpZGVzIHRoZSBtYWluXG4gKiB1c2VyIGZhY2luZyBBUEkgZm9yIHRoZSBsaWJyYXJ5LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLkluZGV4ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9maWVsZHMgPSBbXVxuICB0aGlzLl9yZWYgPSAnaWQnXG4gIHRoaXMucGlwZWxpbmUgPSBuZXcgbHVuci5QaXBlbGluZVxuICB0aGlzLmRvY3VtZW50U3RvcmUgPSBuZXcgbHVuci5TdG9yZVxuICB0aGlzLnRva2VuU3RvcmUgPSBuZXcgbHVuci5Ub2tlblN0b3JlXG4gIHRoaXMuY29ycHVzVG9rZW5zID0gbmV3IGx1bnIuU29ydGVkU2V0XG4gIHRoaXMuZXZlbnRFbWl0dGVyID0gIG5ldyBsdW5yLkV2ZW50RW1pdHRlclxuICB0aGlzLnRva2VuaXplckZuID0gbHVuci50b2tlbml6ZXJcblxuICB0aGlzLl9pZGZDYWNoZSA9IHt9XG5cbiAgdGhpcy5vbignYWRkJywgJ3JlbW92ZScsICd1cGRhdGUnLCAoZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2lkZkNhY2hlID0ge31cbiAgfSkuYmluZCh0aGlzKSlcbn1cblxuLyoqXG4gKiBCaW5kIGEgaGFuZGxlciB0byBldmVudHMgYmVpbmcgZW1pdHRlZCBieSB0aGUgaW5kZXguXG4gKlxuICogVGhlIGhhbmRsZXIgY2FuIGJlIGJvdW5kIHRvIG1hbnkgZXZlbnRzIGF0IHRoZSBzYW1lIHRpbWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFtldmVudE5hbWVdIFRoZSBuYW1lKHMpIG9mIGV2ZW50cyB0byBiaW5kIHRoZSBmdW5jdGlvbiB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBzZXJpYWxpc2VkIHNldCB0byBsb2FkLlxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgcmV0dXJuIHRoaXMuZXZlbnRFbWl0dGVyLmFkZExpc3RlbmVyLmFwcGx5KHRoaXMuZXZlbnRFbWl0dGVyLCBhcmdzKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBoYW5kbGVyIGZyb20gYW4gZXZlbnQgYmVpbmcgZW1pdHRlZCBieSB0aGUgaW5kZXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBUaGUgbmFtZSBvZiBldmVudHMgdG8gcmVtb3ZlIHRoZSBmdW5jdGlvbiBmcm9tLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHNlcmlhbGlzZWQgc2V0IHRvIGxvYWQuXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gIHJldHVybiB0aGlzLmV2ZW50RW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCBmbilcbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXNlZCBpbmRleC5cbiAqXG4gKiBJc3N1ZXMgYSB3YXJuaW5nIGlmIHRoZSBpbmRleCBiZWluZyBpbXBvcnRlZCB3YXMgc2VyaWFsaXNlZFxuICogYnkgYSBkaWZmZXJlbnQgdmVyc2lvbiBvZiBsdW5yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpc2VkRGF0YSBUaGUgc2VyaWFsaXNlZCBzZXQgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkRGF0YSkge1xuICBpZiAoc2VyaWFsaXNlZERhdGEudmVyc2lvbiAhPT0gbHVuci52ZXJzaW9uKSB7XG4gICAgbHVuci51dGlscy53YXJuKCd2ZXJzaW9uIG1pc21hdGNoOiBjdXJyZW50ICcgKyBsdW5yLnZlcnNpb24gKyAnIGltcG9ydGluZyAnICsgc2VyaWFsaXNlZERhdGEudmVyc2lvbilcbiAgfVxuXG4gIHZhciBpZHggPSBuZXcgdGhpc1xuXG4gIGlkeC5fZmllbGRzID0gc2VyaWFsaXNlZERhdGEuZmllbGRzXG4gIGlkeC5fcmVmID0gc2VyaWFsaXNlZERhdGEucmVmXG5cbiAgaWR4LnRva2VuaXplcihsdW5yLnRva2VuaXplci5sb2FkKHNlcmlhbGlzZWREYXRhLnRva2VuaXplcikpXG4gIGlkeC5kb2N1bWVudFN0b3JlID0gbHVuci5TdG9yZS5sb2FkKHNlcmlhbGlzZWREYXRhLmRvY3VtZW50U3RvcmUpXG4gIGlkeC50b2tlblN0b3JlID0gbHVuci5Ub2tlblN0b3JlLmxvYWQoc2VyaWFsaXNlZERhdGEudG9rZW5TdG9yZSlcbiAgaWR4LmNvcnB1c1Rva2VucyA9IGx1bnIuU29ydGVkU2V0LmxvYWQoc2VyaWFsaXNlZERhdGEuY29ycHVzVG9rZW5zKVxuICBpZHgucGlwZWxpbmUgPSBsdW5yLlBpcGVsaW5lLmxvYWQoc2VyaWFsaXNlZERhdGEucGlwZWxpbmUpXG5cbiAgcmV0dXJuIGlkeFxufVxuXG4vKipcbiAqIEFkZHMgYSBmaWVsZCB0byB0aGUgbGlzdCBvZiBmaWVsZHMgdGhhdCB3aWxsIGJlIHNlYXJjaGFibGUgd2l0aGluIGRvY3VtZW50c1xuICogaW4gdGhlIGluZGV4LlxuICpcbiAqIEFuIG9wdGlvbmFsIGJvb3N0IHBhcmFtIGNhbiBiZSBwYXNzZWQgdG8gYWZmZWN0IGhvdyBtdWNoIHRva2VucyBpbiB0aGlzIGZpZWxkXG4gKiByYW5rIGluIHNlYXJjaCByZXN1bHRzLCBieSBkZWZhdWx0IHRoZSBib29zdCB2YWx1ZSBpcyAxLlxuICpcbiAqIEZpZWxkcyBzaG91bGQgYmUgYWRkZWQgYmVmb3JlIGFueSBkb2N1bWVudHMgYXJlIGFkZGVkIHRvIHRoZSBpbmRleCwgZmllbGRzXG4gKiB0aGF0IGFyZSBhZGRlZCBhZnRlciBkb2N1bWVudHMgYXJlIGFkZGVkIHRvIHRoZSBpbmRleCB3aWxsIG9ubHkgYXBwbHkgdG8gbmV3XG4gKiBkb2N1bWVudHMgYWRkZWQgdG8gdGhlIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZE5hbWUgVGhlIG5hbWUgb2YgdGhlIGZpZWxkIHdpdGhpbiB0aGUgZG9jdW1lbnQgdGhhdFxuICogc2hvdWxkIGJlIGluZGV4ZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBib29zdCBBbiBvcHRpb25hbCBib29zdCB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvIHRlcm1zIGluIHRoaXNcbiAqIGZpZWxkLlxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbiAoZmllbGROYW1lLCBvcHRzKSB7XG4gIHZhciBvcHRzID0gb3B0cyB8fCB7fSxcbiAgICAgIGZpZWxkID0geyBuYW1lOiBmaWVsZE5hbWUsIGJvb3N0OiBvcHRzLmJvb3N0IHx8IDEgfVxuXG4gIHRoaXMuX2ZpZWxkcy5wdXNoKGZpZWxkKVxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHByb3BlcnR5IHVzZWQgdG8gdW5pcXVlbHkgaWRlbnRpZnkgZG9jdW1lbnRzIGFkZGVkIHRvIHRoZSBpbmRleCxcbiAqIGJ5IGRlZmF1bHQgdGhpcyBwcm9wZXJ0eSBpcyAnaWQnLlxuICpcbiAqIFRoaXMgc2hvdWxkIG9ubHkgYmUgY2hhbmdlZCBiZWZvcmUgYWRkaW5nIGRvY3VtZW50cyB0byB0aGUgaW5kZXgsIGNoYW5naW5nXG4gKiB0aGUgcmVmIHByb3BlcnR5IHdpdGhvdXQgcmVzZXR0aW5nIHRoZSBpbmRleCBjYW4gbGVhZCB0byB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gKlxuICogVGhlIHZhbHVlIG9mIHJlZiBjYW4gYmUgb2YgYW55IHR5cGUgYnV0IGl0IF9tdXN0XyBiZSBzdGFibHkgY29tcGFyYWJsZSBhbmRcbiAqIG9yZGVyYWJsZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVmTmFtZSBUaGUgcHJvcGVydHkgdG8gdXNlIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoZVxuICogZG9jdW1lbnRzIGluIHRoZSBpbmRleC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZW1pdEV2ZW50IFdoZXRoZXIgdG8gZW1pdCBhZGQgZXZlbnRzLCBkZWZhdWx0cyB0byB0cnVlXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbiAocmVmTmFtZSkge1xuICB0aGlzLl9yZWYgPSByZWZOYW1lXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogU2V0cyB0aGUgdG9rZW5pemVyIHVzZWQgZm9yIHRoaXMgaW5kZXguXG4gKlxuICogQnkgZGVmYXVsdCB0aGUgaW5kZXggd2lsbCB1c2UgdGhlIGRlZmF1bHQgdG9rZW5pemVyLCBsdW5yLnRva2VuaXplci4gVGhlIHRva2VuaXplclxuICogc2hvdWxkIG9ubHkgYmUgY2hhbmdlZCBiZWZvcmUgYWRkaW5nIGRvY3VtZW50cyB0byB0aGUgaW5kZXguIENoYW5naW5nIHRoZSB0b2tlbml6ZXJcbiAqIHdpdGhvdXQgcmUtYnVpbGRpbmcgdGhlIGluZGV4IGNhbiBsZWFkIHRvIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gdXNlIGFzIGEgdG9rZW5pemVyLlxuICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUudG9rZW5pemVyID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBpc1JlZ2lzdGVyZWQgPSBmbi5sYWJlbCAmJiAoZm4ubGFiZWwgaW4gbHVuci50b2tlbml6ZXIucmVnaXN0ZXJlZEZ1bmN0aW9ucylcblxuICBpZiAoIWlzUmVnaXN0ZXJlZCkge1xuICAgIGx1bnIudXRpbHMud2FybignRnVuY3Rpb24gaXMgbm90IGEgcmVnaXN0ZXJlZCB0b2tlbml6ZXIuIFRoaXMgbWF5IGNhdXNlIHByb2JsZW1zIHdoZW4gc2VyaWFsaXNpbmcgdGhlIGluZGV4JylcbiAgfVxuXG4gIHRoaXMudG9rZW5pemVyRm4gPSBmblxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIEFkZCBhIGRvY3VtZW50IHRvIHRoZSBpbmRleC5cbiAqXG4gKiBUaGlzIGlzIHRoZSB3YXkgbmV3IGRvY3VtZW50cyBlbnRlciB0aGUgaW5kZXgsIHRoaXMgZnVuY3Rpb24gd2lsbCBydW4gdGhlXG4gKiBmaWVsZHMgZnJvbSB0aGUgZG9jdW1lbnQgdGhyb3VnaCB0aGUgaW5kZXgncyBwaXBlbGluZSBhbmQgdGhlbiBhZGQgaXQgdG9cbiAqIHRoZSBpbmRleCwgaXQgd2lsbCB0aGVuIHNob3cgdXAgaW4gc2VhcmNoIHJlc3VsdHMuXG4gKlxuICogQW4gJ2FkZCcgZXZlbnQgaXMgZW1pdHRlZCB3aXRoIHRoZSBkb2N1bWVudCB0aGF0IGhhcyBiZWVuIGFkZGVkIGFuZCB0aGUgaW5kZXhcbiAqIHRoZSBkb2N1bWVudCBoYXMgYmVlbiBhZGRlZCB0by4gVGhpcyBldmVudCBjYW4gYmUgc2lsZW5jZWQgYnkgcGFzc2luZyBmYWxzZVxuICogYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBhZGQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRvYyBUaGUgZG9jdW1lbnQgdG8gYWRkIHRvIHRoZSBpbmRleC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZW1pdEV2ZW50IFdoZXRoZXIgb3Igbm90IHRvIGVtaXQgZXZlbnRzLCBkZWZhdWx0IHRydWUuXG4gKiBAbWVtYmVyT2YgSW5kZXhcbiAqL1xubHVuci5JbmRleC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGRvYywgZW1pdEV2ZW50KSB7XG4gIHZhciBkb2NUb2tlbnMgPSB7fSxcbiAgICAgIGFsbERvY3VtZW50VG9rZW5zID0gbmV3IGx1bnIuU29ydGVkU2V0LFxuICAgICAgZG9jUmVmID0gZG9jW3RoaXMuX3JlZl0sXG4gICAgICBlbWl0RXZlbnQgPSBlbWl0RXZlbnQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBlbWl0RXZlbnRcblxuICB0aGlzLl9maWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICB2YXIgZmllbGRUb2tlbnMgPSB0aGlzLnBpcGVsaW5lLnJ1bih0aGlzLnRva2VuaXplckZuKGRvY1tmaWVsZC5uYW1lXSkpXG5cbiAgICBkb2NUb2tlbnNbZmllbGQubmFtZV0gPSBmaWVsZFRva2Vuc1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZFRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuID0gZmllbGRUb2tlbnNbaV1cbiAgICAgIGFsbERvY3VtZW50VG9rZW5zLmFkZCh0b2tlbilcbiAgICAgIHRoaXMuY29ycHVzVG9rZW5zLmFkZCh0b2tlbilcbiAgICB9XG4gIH0sIHRoaXMpXG5cbiAgdGhpcy5kb2N1bWVudFN0b3JlLnNldChkb2NSZWYsIGFsbERvY3VtZW50VG9rZW5zKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsRG9jdW1lbnRUb2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSBhbGxEb2N1bWVudFRva2Vucy5lbGVtZW50c1tpXVxuICAgIHZhciB0ZiA9IDA7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2ZpZWxkcy5sZW5ndGg7IGorKyl7XG4gICAgICB2YXIgZmllbGQgPSB0aGlzLl9maWVsZHNbal1cbiAgICAgIHZhciBmaWVsZFRva2VucyA9IGRvY1Rva2Vuc1tmaWVsZC5uYW1lXVxuICAgICAgdmFyIGZpZWxkTGVuZ3RoID0gZmllbGRUb2tlbnMubGVuZ3RoXG5cbiAgICAgIGlmICghZmllbGRMZW5ndGgpIGNvbnRpbnVlXG5cbiAgICAgIHZhciB0b2tlbkNvdW50ID0gMFxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBmaWVsZExlbmd0aDsgaysrKXtcbiAgICAgICAgaWYgKGZpZWxkVG9rZW5zW2tdID09PSB0b2tlbil7XG4gICAgICAgICAgdG9rZW5Db3VudCsrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGYgKz0gKHRva2VuQ291bnQgLyBmaWVsZExlbmd0aCAqIGZpZWxkLmJvb3N0KVxuICAgIH1cblxuICAgIHRoaXMudG9rZW5TdG9yZS5hZGQodG9rZW4sIHsgcmVmOiBkb2NSZWYsIHRmOiB0ZiB9KVxuICB9O1xuXG4gIGlmIChlbWl0RXZlbnQpIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ2FkZCcsIGRvYywgdGhpcylcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGEgZG9jdW1lbnQgZnJvbSB0aGUgaW5kZXguXG4gKlxuICogVG8gbWFrZSBzdXJlIGRvY3VtZW50cyBubyBsb25nZXIgc2hvdyB1cCBpbiBzZWFyY2ggcmVzdWx0cyB0aGV5IGNhbiBiZVxuICogcmVtb3ZlZCBmcm9tIHRoZSBpbmRleCB1c2luZyB0aGlzIG1ldGhvZC5cbiAqXG4gKiBUaGUgZG9jdW1lbnQgcGFzc2VkIG9ubHkgbmVlZHMgdG8gaGF2ZSB0aGUgc2FtZSByZWYgcHJvcGVydHkgdmFsdWUgYXMgdGhlXG4gKiBkb2N1bWVudCB0aGF0IHdhcyBhZGRlZCB0byB0aGUgaW5kZXgsIHRoZXkgY291bGQgYmUgY29tcGxldGVseSBkaWZmZXJlbnRcbiAqIG9iamVjdHMuXG4gKlxuICogQSAncmVtb3ZlJyBldmVudCBpcyBlbWl0dGVkIHdpdGggdGhlIGRvY3VtZW50IHRoYXQgaGFzIGJlZW4gcmVtb3ZlZCBhbmQgdGhlIGluZGV4XG4gKiB0aGUgZG9jdW1lbnQgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tLiBUaGlzIGV2ZW50IGNhbiBiZSBzaWxlbmNlZCBieSBwYXNzaW5nIGZhbHNlXG4gKiBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHJlbW92ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIFRoZSBkb2N1bWVudCB0byByZW1vdmUgZnJvbSB0aGUgaW5kZXguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVtaXRFdmVudCBXaGV0aGVyIHRvIGVtaXQgcmVtb3ZlIGV2ZW50cywgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChkb2MsIGVtaXRFdmVudCkge1xuICB2YXIgZG9jUmVmID0gZG9jW3RoaXMuX3JlZl0sXG4gICAgICBlbWl0RXZlbnQgPSBlbWl0RXZlbnQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBlbWl0RXZlbnRcblxuICBpZiAoIXRoaXMuZG9jdW1lbnRTdG9yZS5oYXMoZG9jUmVmKSkgcmV0dXJuXG5cbiAgdmFyIGRvY1Rva2VucyA9IHRoaXMuZG9jdW1lbnRTdG9yZS5nZXQoZG9jUmVmKVxuXG4gIHRoaXMuZG9jdW1lbnRTdG9yZS5yZW1vdmUoZG9jUmVmKVxuXG4gIGRvY1Rva2Vucy5mb3JFYWNoKGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRoaXMudG9rZW5TdG9yZS5yZW1vdmUodG9rZW4sIGRvY1JlZilcbiAgfSwgdGhpcylcblxuICBpZiAoZW1pdEV2ZW50KSB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdyZW1vdmUnLCBkb2MsIHRoaXMpXG59XG5cbi8qKlxuICogVXBkYXRlcyBhIGRvY3VtZW50IGluIHRoZSBpbmRleC5cbiAqXG4gKiBXaGVuIGEgZG9jdW1lbnQgY29udGFpbmVkIHdpdGhpbiB0aGUgaW5kZXggZ2V0cyB1cGRhdGVkLCBmaWVsZHMgY2hhbmdlZCxcbiAqIGFkZGVkIG9yIHJlbW92ZWQsIHRvIG1ha2Ugc3VyZSBpdCBjb3JyZWN0bHkgbWF0Y2hlZCBhZ2FpbnN0IHNlYXJjaCBxdWVyaWVzLFxuICogaXQgc2hvdWxkIGJlIHVwZGF0ZWQgaW4gdGhlIGluZGV4LlxuICpcbiAqIFRoaXMgbWV0aG9kIGlzIGp1c3QgYSB3cmFwcGVyIGFyb3VuZCBgcmVtb3ZlYCBhbmQgYGFkZGBcbiAqXG4gKiBBbiAndXBkYXRlJyBldmVudCBpcyBlbWl0dGVkIHdpdGggdGhlIGRvY3VtZW50IHRoYXQgaGFzIGJlZW4gdXBkYXRlZCBhbmQgdGhlIGluZGV4LlxuICogVGhpcyBldmVudCBjYW4gYmUgc2lsZW5jZWQgYnkgcGFzc2luZyBmYWxzZSBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHVwZGF0ZS4gT25seVxuICogYW4gdXBkYXRlIGV2ZW50IHdpbGwgYmUgZmlyZWQsIHRoZSAnYWRkJyBhbmQgJ3JlbW92ZScgZXZlbnRzIG9mIHRoZSB1bmRlcmx5aW5nIGNhbGxzXG4gKiBhcmUgc2lsZW5jZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRvYyBUaGUgZG9jdW1lbnQgdG8gdXBkYXRlIGluIHRoZSBpbmRleC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZW1pdEV2ZW50IFdoZXRoZXIgdG8gZW1pdCB1cGRhdGUgZXZlbnRzLCBkZWZhdWx0cyB0byB0cnVlXG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5yZW1vdmVcbiAqIEBzZWUgSW5kZXgucHJvdG90eXBlLmFkZFxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb2MsIGVtaXRFdmVudCkge1xuICB2YXIgZW1pdEV2ZW50ID0gZW1pdEV2ZW50ID09PSB1bmRlZmluZWQgPyB0cnVlIDogZW1pdEV2ZW50XG5cbiAgdGhpcy5yZW1vdmUoZG9jLCBmYWxzZSlcbiAgdGhpcy5hZGQoZG9jLCBmYWxzZSlcblxuICBpZiAoZW1pdEV2ZW50KSB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCd1cGRhdGUnLCBkb2MsIHRoaXMpXG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgaW52ZXJzZSBkb2N1bWVudCBmcmVxdWVuY3kgZm9yIGEgdG9rZW4gd2l0aGluIHRoZSBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGNhbGN1bGF0ZSB0aGUgaWRmIG9mLlxuICogQHNlZSBJbmRleC5wcm90b3R5cGUuaWRmXG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLmlkZiA9IGZ1bmN0aW9uICh0ZXJtKSB7XG4gIHZhciBjYWNoZUtleSA9IFwiQFwiICsgdGVybVxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX2lkZkNhY2hlLCBjYWNoZUtleSkpIHJldHVybiB0aGlzLl9pZGZDYWNoZVtjYWNoZUtleV1cblxuICB2YXIgZG9jdW1lbnRGcmVxdWVuY3kgPSB0aGlzLnRva2VuU3RvcmUuY291bnQodGVybSksXG4gICAgICBpZGYgPSAxXG5cbiAgaWYgKGRvY3VtZW50RnJlcXVlbmN5ID4gMCkge1xuICAgIGlkZiA9IDEgKyBNYXRoLmxvZyh0aGlzLmRvY3VtZW50U3RvcmUubGVuZ3RoIC8gZG9jdW1lbnRGcmVxdWVuY3kpXG4gIH1cblxuICByZXR1cm4gdGhpcy5faWRmQ2FjaGVbY2FjaGVLZXldID0gaWRmXG59XG5cbi8qKlxuICogU2VhcmNoZXMgdGhlIGluZGV4IHVzaW5nIHRoZSBwYXNzZWQgcXVlcnkuXG4gKlxuICogUXVlcmllcyBzaG91bGQgYmUgYSBzdHJpbmcsIG11bHRpcGxlIHdvcmRzIGFyZSBhbGxvd2VkIGFuZCB3aWxsIGxlYWQgdG8gYW5cbiAqIEFORCBiYXNlZCBxdWVyeSwgZS5nLiBgaWR4LnNlYXJjaCgnZm9vIGJhcicpYCB3aWxsIHJ1biBhIHNlYXJjaCBmb3JcbiAqIGRvY3VtZW50cyBjb250YWluaW5nIGJvdGggJ2ZvbycgYW5kICdiYXInLlxuICpcbiAqIEFsbCBxdWVyeSB0b2tlbnMgYXJlIHBhc3NlZCB0aHJvdWdoIHRoZSBzYW1lIHBpcGVsaW5lIHRoYXQgZG9jdW1lbnQgdG9rZW5zXG4gKiBhcmUgcGFzc2VkIHRocm91Z2gsIHNvIGFueSBsYW5ndWFnZSBwcm9jZXNzaW5nIGludm9sdmVkIHdpbGwgYmUgcnVuIG9uIGV2ZXJ5XG4gKiBxdWVyeSB0ZXJtLlxuICpcbiAqIEVhY2ggcXVlcnkgdGVybSBpcyBleHBhbmRlZCwgc28gdGhhdCB0aGUgdGVybSAnaGUnIG1pZ2h0IGJlIGV4cGFuZGVkIHRvXG4gKiAnaGVsbG8nIGFuZCAnaGVscCcgaWYgdGhvc2UgdGVybXMgd2VyZSBhbHJlYWR5IGluY2x1ZGVkIGluIHRoZSBpbmRleC5cbiAqXG4gKiBNYXRjaGluZyBkb2N1bWVudHMgYXJlIHJldHVybmVkIGFzIGFuIGFycmF5IG9mIG9iamVjdHMsIGVhY2ggb2JqZWN0IGNvbnRhaW5zXG4gKiB0aGUgbWF0Y2hpbmcgZG9jdW1lbnQgcmVmLCBhcyBzZXQgZm9yIHRoaXMgaW5kZXgsIGFuZCB0aGUgc2ltaWxhcml0eSBzY29yZVxuICogZm9yIHRoaXMgZG9jdW1lbnQgYWdhaW5zdCB0aGUgcXVlcnkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBxdWVyeSB0byBzZWFyY2ggdGhlIGluZGV4IHdpdGguXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQHNlZSBJbmRleC5wcm90b3R5cGUuaWRmXG4gKiBAc2VlIEluZGV4LnByb3RvdHlwZS5kb2N1bWVudFZlY3RvclxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICB2YXIgcXVlcnlUb2tlbnMgPSB0aGlzLnBpcGVsaW5lLnJ1bih0aGlzLnRva2VuaXplckZuKHF1ZXJ5KSksXG4gICAgICBxdWVyeVZlY3RvciA9IG5ldyBsdW5yLlZlY3RvcixcbiAgICAgIGRvY3VtZW50U2V0cyA9IFtdLFxuICAgICAgZmllbGRCb29zdHMgPSB0aGlzLl9maWVsZHMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBmKSB7IHJldHVybiBtZW1vICsgZi5ib29zdCB9LCAwKVxuXG4gIHZhciBoYXNTb21lVG9rZW4gPSBxdWVyeVRva2Vucy5zb21lKGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHJldHVybiB0aGlzLnRva2VuU3RvcmUuaGFzKHRva2VuKVxuICB9LCB0aGlzKVxuXG4gIGlmICghaGFzU29tZVRva2VuKSByZXR1cm4gW11cblxuICBxdWVyeVRva2Vuc1xuICAgIC5mb3JFYWNoKGZ1bmN0aW9uICh0b2tlbiwgaSwgdG9rZW5zKSB7XG4gICAgICB2YXIgdGYgPSAxIC8gdG9rZW5zLmxlbmd0aCAqIHRoaXMuX2ZpZWxkcy5sZW5ndGggKiBmaWVsZEJvb3N0cyxcbiAgICAgICAgICBzZWxmID0gdGhpc1xuXG4gICAgICB2YXIgc2V0ID0gdGhpcy50b2tlblN0b3JlLmV4cGFuZCh0b2tlbikucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBrZXkpIHtcbiAgICAgICAgdmFyIHBvcyA9IHNlbGYuY29ycHVzVG9rZW5zLmluZGV4T2Yoa2V5KSxcbiAgICAgICAgICAgIGlkZiA9IHNlbGYuaWRmKGtleSksXG4gICAgICAgICAgICBzaW1pbGFyaXR5Qm9vc3QgPSAxLFxuICAgICAgICAgICAgc2V0ID0gbmV3IGx1bnIuU29ydGVkU2V0XG5cbiAgICAgICAgLy8gaWYgdGhlIGV4cGFuZGVkIGtleSBpcyBub3QgYW4gZXhhY3QgbWF0Y2ggdG8gdGhlIHRva2VuIHRoZW5cbiAgICAgICAgLy8gcGVuYWxpc2UgdGhlIHNjb3JlIGZvciB0aGlzIGtleSBieSBob3cgZGlmZmVyZW50IHRoZSBrZXkgaXNcbiAgICAgICAgLy8gdG8gdGhlIHRva2VuLlxuICAgICAgICBpZiAoa2V5ICE9PSB0b2tlbikge1xuICAgICAgICAgIHZhciBkaWZmID0gTWF0aC5tYXgoMywga2V5Lmxlbmd0aCAtIHRva2VuLmxlbmd0aClcbiAgICAgICAgICBzaW1pbGFyaXR5Qm9vc3QgPSAxIC8gTWF0aC5sb2coZGlmZilcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgcXVlcnkgdGYtaWRmIHNjb3JlIGZvciB0aGlzIHRva2VuXG4gICAgICAgIC8vIGFwcGx5aW5nIGFuIHNpbWlsYXJpdHlCb29zdCB0byBlbnN1cmUgZXhhY3QgbWF0Y2hlc1xuICAgICAgICAvLyB0aGVzZSByYW5rIGhpZ2hlciB0aGFuIGV4cGFuZGVkIHRlcm1zXG4gICAgICAgIGlmIChwb3MgPiAtMSkgcXVlcnlWZWN0b3IuaW5zZXJ0KHBvcywgdGYgKiBpZGYgKiBzaW1pbGFyaXR5Qm9vc3QpXG5cbiAgICAgICAgLy8gYWRkIGFsbCB0aGUgZG9jdW1lbnRzIHRoYXQgaGF2ZSB0aGlzIGtleSBpbnRvIGEgc2V0XG4gICAgICAgIC8vIGVuc3VyaW5nIHRoYXQgdGhlIHR5cGUgb2Yga2V5IGlzIHByZXNlcnZlZFxuICAgICAgICB2YXIgbWF0Y2hpbmdEb2N1bWVudHMgPSBzZWxmLnRva2VuU3RvcmUuZ2V0KGtleSksXG4gICAgICAgICAgICByZWZzID0gT2JqZWN0LmtleXMobWF0Y2hpbmdEb2N1bWVudHMpLFxuICAgICAgICAgICAgcmVmc0xlbiA9IHJlZnMubGVuZ3RoXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWZzTGVuOyBpKyspIHtcbiAgICAgICAgICBzZXQuYWRkKG1hdGNoaW5nRG9jdW1lbnRzW3JlZnNbaV1dLnJlZilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZW1vLnVuaW9uKHNldClcbiAgICAgIH0sIG5ldyBsdW5yLlNvcnRlZFNldClcblxuICAgICAgZG9jdW1lbnRTZXRzLnB1c2goc2V0KVxuICAgIH0sIHRoaXMpXG5cbiAgdmFyIGRvY3VtZW50U2V0ID0gZG9jdW1lbnRTZXRzLnJlZHVjZShmdW5jdGlvbiAobWVtbywgc2V0KSB7XG4gICAgcmV0dXJuIG1lbW8uaW50ZXJzZWN0KHNldClcbiAgfSlcblxuICByZXR1cm4gZG9jdW1lbnRTZXRcbiAgICAubWFwKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgIHJldHVybiB7IHJlZjogcmVmLCBzY29yZTogcXVlcnlWZWN0b3Iuc2ltaWxhcml0eSh0aGlzLmRvY3VtZW50VmVjdG9yKHJlZikpIH1cbiAgICB9LCB0aGlzKVxuICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmVcbiAgICB9KVxufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHZlY3RvciBjb250YWluaW5nIGFsbCB0aGUgdG9rZW5zIGluIHRoZSBkb2N1bWVudCBtYXRjaGluZyB0aGVcbiAqIHBhc3NlZCBkb2N1bWVudFJlZi5cbiAqXG4gKiBUaGUgdmVjdG9yIGNvbnRhaW5zIHRoZSB0Zi1pZGYgc2NvcmUgZm9yIGVhY2ggdG9rZW4gY29udGFpbmVkIGluIHRoZVxuICogZG9jdW1lbnQgd2l0aCB0aGUgcGFzc2VkIGRvY3VtZW50UmVmLiAgVGhlIHZlY3RvciB3aWxsIGNvbnRhaW4gYW4gZWxlbWVudFxuICogZm9yIGV2ZXJ5IHRva2VuIGluIHRoZSBpbmRleGVzIGNvcnB1cywgaWYgdGhlIGRvY3VtZW50IGRvZXMgbm90IGNvbnRhaW4gdGhhdFxuICogdG9rZW4gdGhlIGVsZW1lbnQgd2lsbCBiZSAwLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2N1bWVudFJlZiBUaGUgcmVmIHRvIGZpbmQgdGhlIGRvY3VtZW50IHdpdGguXG4gKiBAcmV0dXJucyB7bHVuci5WZWN0b3J9XG4gKiBAcHJpdmF0ZVxuICogQG1lbWJlck9mIEluZGV4XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLmRvY3VtZW50VmVjdG9yID0gZnVuY3Rpb24gKGRvY3VtZW50UmVmKSB7XG4gIHZhciBkb2N1bWVudFRva2VucyA9IHRoaXMuZG9jdW1lbnRTdG9yZS5nZXQoZG9jdW1lbnRSZWYpLFxuICAgICAgZG9jdW1lbnRUb2tlbnNMZW5ndGggPSBkb2N1bWVudFRva2Vucy5sZW5ndGgsXG4gICAgICBkb2N1bWVudFZlY3RvciA9IG5ldyBsdW5yLlZlY3RvclxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZG9jdW1lbnRUb2tlbnNMZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IGRvY3VtZW50VG9rZW5zLmVsZW1lbnRzW2ldLFxuICAgICAgICB0ZiA9IHRoaXMudG9rZW5TdG9yZS5nZXQodG9rZW4pW2RvY3VtZW50UmVmXS50ZixcbiAgICAgICAgaWRmID0gdGhpcy5pZGYodG9rZW4pXG5cbiAgICBkb2N1bWVudFZlY3Rvci5pbnNlcnQodGhpcy5jb3JwdXNUb2tlbnMuaW5kZXhPZih0b2tlbiksIHRmICogaWRmKVxuICB9O1xuXG4gIHJldHVybiBkb2N1bWVudFZlY3RvclxufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgaW5kZXggcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgdmVyc2lvbjogbHVuci52ZXJzaW9uLFxuICAgIGZpZWxkczogdGhpcy5fZmllbGRzLFxuICAgIHJlZjogdGhpcy5fcmVmLFxuICAgIHRva2VuaXplcjogdGhpcy50b2tlbml6ZXJGbi5sYWJlbCxcbiAgICBkb2N1bWVudFN0b3JlOiB0aGlzLmRvY3VtZW50U3RvcmUudG9KU09OKCksXG4gICAgdG9rZW5TdG9yZTogdGhpcy50b2tlblN0b3JlLnRvSlNPTigpLFxuICAgIGNvcnB1c1Rva2VuczogdGhpcy5jb3JwdXNUb2tlbnMudG9KU09OKCksXG4gICAgcGlwZWxpbmU6IHRoaXMucGlwZWxpbmUudG9KU09OKClcbiAgfVxufVxuXG4vKipcbiAqIEFwcGxpZXMgYSBwbHVnaW4gdG8gdGhlIGN1cnJlbnQgaW5kZXguXG4gKlxuICogQSBwbHVnaW4gaXMgYSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aXRoIHRoZSBpbmRleCBhcyBpdHMgY29udGV4dC5cbiAqIFBsdWdpbnMgY2FuIGJlIHVzZWQgdG8gY3VzdG9taXNlIG9yIGV4dGVuZCB0aGUgYmVoYXZpb3VyIHRoZSBpbmRleFxuICogaW4gc29tZSB3YXkuIEEgcGx1Z2luIGlzIGp1c3QgYSBmdW5jdGlvbiwgdGhhdCBlbmNhcHN1bGF0ZWQgdGhlIGN1c3RvbVxuICogYmVoYXZpb3VyIHRoYXQgc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIGluZGV4LlxuICpcbiAqIFRoZSBwbHVnaW4gZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgaW5kZXggYXMgaXRzIGFyZ3VtZW50LCBhZGRpdGlvbmFsXG4gKiBhcmd1bWVudHMgY2FuIGFsc28gYmUgcGFzc2VkIHdoZW4gY2FsbGluZyB1c2UuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZFxuICogd2l0aCB0aGUgaW5kZXggYXMgaXRzIGNvbnRleHQuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgdmFyIG15UGx1Z2luID0gZnVuY3Rpb24gKGlkeCwgYXJnMSwgYXJnMikge1xuICogICAgICAgLy8gYHRoaXNgIGlzIHRoZSBpbmRleCB0byBiZSBleHRlbmRlZFxuICogICAgICAgLy8gYXBwbHkgYW55IGV4dGVuc2lvbnMgZXRjIGhlcmUuXG4gKiAgICAgfVxuICpcbiAqICAgICB2YXIgaWR4ID0gbHVucihmdW5jdGlvbiAoKSB7XG4gKiAgICAgICB0aGlzLnVzZShteVBsdWdpbiwgJ2FyZzEnLCAnYXJnMicpXG4gKiAgICAgfSlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwbHVnaW4gVGhlIHBsdWdpbiB0byBhcHBseS5cbiAqIEBtZW1iZXJPZiBJbmRleFxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICBhcmdzLnVuc2hpZnQodGhpcylcbiAgcGx1Z2luLmFwcGx5KHRoaXMsIGFyZ3MpXG59XG4vKiFcbiAqIGx1bnIuU3RvcmVcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuU3RvcmUgaXMgYSBzaW1wbGUga2V5LXZhbHVlIHN0b3JlIHVzZWQgZm9yIHN0b3Jpbmcgc2V0cyBvZiB0b2tlbnMgZm9yXG4gKiBkb2N1bWVudHMgc3RvcmVkIGluIGluZGV4LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQG1vZHVsZVxuICovXG5sdW5yLlN0b3JlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnN0b3JlID0ge31cbiAgdGhpcy5sZW5ndGggPSAwXG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgc3RvcmVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXNlZERhdGEgVGhlIHNlcmlhbGlzZWQgc3RvcmUgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLlN0b3JlfVxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkRGF0YSkge1xuICB2YXIgc3RvcmUgPSBuZXcgdGhpc1xuXG4gIHN0b3JlLmxlbmd0aCA9IHNlcmlhbGlzZWREYXRhLmxlbmd0aFxuICBzdG9yZS5zdG9yZSA9IE9iamVjdC5rZXlzKHNlcmlhbGlzZWREYXRhLnN0b3JlKS5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGtleSkge1xuICAgIG1lbW9ba2V5XSA9IGx1bnIuU29ydGVkU2V0LmxvYWQoc2VyaWFsaXNlZERhdGEuc3RvcmVba2V5XSlcbiAgICByZXR1cm4gbWVtb1xuICB9LCB7fSlcblxuICByZXR1cm4gc3RvcmVcbn1cblxuLyoqXG4gKiBTdG9yZXMgdGhlIGdpdmVuIHRva2VucyBpbiB0aGUgc3RvcmUgYWdhaW5zdCB0aGUgZ2l2ZW4gaWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGlkIFRoZSBrZXkgdXNlZCB0byBzdG9yZSB0aGUgdG9rZW5zIGFnYWluc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gdG9rZW5zIFRoZSB0b2tlbnMgdG8gc3RvcmUgYWdhaW5zdCB0aGUga2V5LlxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChpZCwgdG9rZW5zKSB7XG4gIGlmICghdGhpcy5oYXMoaWQpKSB0aGlzLmxlbmd0aCsrXG4gIHRoaXMuc3RvcmVbaWRdID0gdG9rZW5zXG59XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSB0b2tlbnMgZnJvbSB0aGUgc3RvcmUgZm9yIGEgZ2l2ZW4ga2V5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUga2V5IHRvIGxvb2t1cCBhbmQgcmV0cmlldmUgZnJvbSB0aGUgc3RvcmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpZCkge1xuICByZXR1cm4gdGhpcy5zdG9yZVtpZF1cbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgc3RvcmUgY29udGFpbnMgYSBrZXkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGlkIFRoZSBpZCB0byBsb29rIHVwIGluIHRoZSBzdG9yZS5cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICogQG1lbWJlck9mIFN0b3JlXG4gKi9cbmx1bnIuU3RvcmUucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChpZCkge1xuICByZXR1cm4gaWQgaW4gdGhpcy5zdG9yZVxufVxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIHZhbHVlIGZvciBhIGtleSBpbiB0aGUgc3RvcmUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGlkIFRoZSBpZCB0byByZW1vdmUgZnJvbSB0aGUgc3RvcmUuXG4gKiBAbWVtYmVyT2YgU3RvcmVcbiAqL1xubHVuci5TdG9yZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGlkKSB7XG4gIGlmICghdGhpcy5oYXMoaWQpKSByZXR1cm5cblxuICBkZWxldGUgdGhpcy5zdG9yZVtpZF1cbiAgdGhpcy5sZW5ndGgtLVxufVxuXG4vKipcbiAqIFJldHVybnMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc3RvcmUgcmVhZHkgZm9yIHNlcmlhbGlzYXRpb24uXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBTdG9yZVxuICovXG5sdW5yLlN0b3JlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgbGVuZ3RoOiB0aGlzLmxlbmd0aFxuICB9XG59XG5cbi8qIVxuICogbHVuci5zdGVtbWVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKiBJbmNsdWRlcyBjb2RlIGZyb20gLSBodHRwOi8vdGFydGFydXMub3JnL35tYXJ0aW4vUG9ydGVyU3RlbW1lci9qcy50eHRcbiAqL1xuXG4vKipcbiAqIGx1bnIuc3RlbW1lciBpcyBhbiBlbmdsaXNoIGxhbmd1YWdlIHN0ZW1tZXIsIHRoaXMgaXMgYSBKYXZhU2NyaXB0XG4gKiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUG9ydGVyU3RlbW1lciB0YWtlbiBmcm9tIGh0dHA6Ly90YXJ0YXJ1cy5vcmcvfm1hcnRpblxuICpcbiAqIEBtb2R1bGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBzdGVtXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQHNlZSBsdW5yLlBpcGVsaW5lXG4gKi9cbmx1bnIuc3RlbW1lciA9IChmdW5jdGlvbigpe1xuICB2YXIgc3RlcDJsaXN0ID0ge1xuICAgICAgXCJhdGlvbmFsXCIgOiBcImF0ZVwiLFxuICAgICAgXCJ0aW9uYWxcIiA6IFwidGlvblwiLFxuICAgICAgXCJlbmNpXCIgOiBcImVuY2VcIixcbiAgICAgIFwiYW5jaVwiIDogXCJhbmNlXCIsXG4gICAgICBcIml6ZXJcIiA6IFwiaXplXCIsXG4gICAgICBcImJsaVwiIDogXCJibGVcIixcbiAgICAgIFwiYWxsaVwiIDogXCJhbFwiLFxuICAgICAgXCJlbnRsaVwiIDogXCJlbnRcIixcbiAgICAgIFwiZWxpXCIgOiBcImVcIixcbiAgICAgIFwib3VzbGlcIiA6IFwib3VzXCIsXG4gICAgICBcIml6YXRpb25cIiA6IFwiaXplXCIsXG4gICAgICBcImF0aW9uXCIgOiBcImF0ZVwiLFxuICAgICAgXCJhdG9yXCIgOiBcImF0ZVwiLFxuICAgICAgXCJhbGlzbVwiIDogXCJhbFwiLFxuICAgICAgXCJpdmVuZXNzXCIgOiBcIml2ZVwiLFxuICAgICAgXCJmdWxuZXNzXCIgOiBcImZ1bFwiLFxuICAgICAgXCJvdXNuZXNzXCIgOiBcIm91c1wiLFxuICAgICAgXCJhbGl0aVwiIDogXCJhbFwiLFxuICAgICAgXCJpdml0aVwiIDogXCJpdmVcIixcbiAgICAgIFwiYmlsaXRpXCIgOiBcImJsZVwiLFxuICAgICAgXCJsb2dpXCIgOiBcImxvZ1wiXG4gICAgfSxcblxuICAgIHN0ZXAzbGlzdCA9IHtcbiAgICAgIFwiaWNhdGVcIiA6IFwiaWNcIixcbiAgICAgIFwiYXRpdmVcIiA6IFwiXCIsXG4gICAgICBcImFsaXplXCIgOiBcImFsXCIsXG4gICAgICBcImljaXRpXCIgOiBcImljXCIsXG4gICAgICBcImljYWxcIiA6IFwiaWNcIixcbiAgICAgIFwiZnVsXCIgOiBcIlwiLFxuICAgICAgXCJuZXNzXCIgOiBcIlwiXG4gICAgfSxcblxuICAgIGMgPSBcIlteYWVpb3VdXCIsICAgICAgICAgIC8vIGNvbnNvbmFudFxuICAgIHYgPSBcIlthZWlvdXldXCIsICAgICAgICAgIC8vIHZvd2VsXG4gICAgQyA9IGMgKyBcIlteYWVpb3V5XSpcIiwgICAgLy8gY29uc29uYW50IHNlcXVlbmNlXG4gICAgViA9IHYgKyBcIlthZWlvdV0qXCIsICAgICAgLy8gdm93ZWwgc2VxdWVuY2VcblxuICAgIG1ncjAgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgViArIEMsICAgICAgICAgICAgICAgLy8gW0NdVkMuLi4gaXMgbT4wXG4gICAgbWVxMSA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQyArIFwiKFwiICsgViArIFwiKT8kXCIsICAvLyBbQ11WQ1tWXSBpcyBtPTFcbiAgICBtZ3IxID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDICsgViArIEMsICAgICAgIC8vIFtDXVZDVkMuLi4gaXMgbT4xXG4gICAgc192ID0gXCJeKFwiICsgQyArIFwiKT9cIiArIHY7ICAgICAgICAgICAgICAgICAgIC8vIHZvd2VsIGluIHN0ZW1cblxuICB2YXIgcmVfbWdyMCA9IG5ldyBSZWdFeHAobWdyMCk7XG4gIHZhciByZV9tZ3IxID0gbmV3IFJlZ0V4cChtZ3IxKTtcbiAgdmFyIHJlX21lcTEgPSBuZXcgUmVnRXhwKG1lcTEpO1xuICB2YXIgcmVfc192ID0gbmV3IFJlZ0V4cChzX3YpO1xuXG4gIHZhciByZV8xYSA9IC9eKC4rPykoc3N8aSllcyQvO1xuICB2YXIgcmUyXzFhID0gL14oLis/KShbXnNdKXMkLztcbiAgdmFyIHJlXzFiID0gL14oLis/KWVlZCQvO1xuICB2YXIgcmUyXzFiID0gL14oLis/KShlZHxpbmcpJC87XG4gIHZhciByZV8xYl8yID0gLy4kLztcbiAgdmFyIHJlMl8xYl8yID0gLyhhdHxibHxpeikkLztcbiAgdmFyIHJlM18xYl8yID0gbmV3IFJlZ0V4cChcIihbXmFlaW91eWxzel0pXFxcXDEkXCIpO1xuICB2YXIgcmU0XzFiXzIgPSBuZXcgUmVnRXhwKFwiXlwiICsgQyArIHYgKyBcIlteYWVpb3V3eHldJFwiKTtcblxuICB2YXIgcmVfMWMgPSAvXiguKz9bXmFlaW91XSl5JC87XG4gIHZhciByZV8yID0gL14oLis/KShhdGlvbmFsfHRpb25hbHxlbmNpfGFuY2l8aXplcnxibGl8YWxsaXxlbnRsaXxlbGl8b3VzbGl8aXphdGlvbnxhdGlvbnxhdG9yfGFsaXNtfGl2ZW5lc3N8ZnVsbmVzc3xvdXNuZXNzfGFsaXRpfGl2aXRpfGJpbGl0aXxsb2dpKSQvO1xuXG4gIHZhciByZV8zID0gL14oLis/KShpY2F0ZXxhdGl2ZXxhbGl6ZXxpY2l0aXxpY2FsfGZ1bHxuZXNzKSQvO1xuXG4gIHZhciByZV80ID0gL14oLis/KShhbHxhbmNlfGVuY2V8ZXJ8aWN8YWJsZXxpYmxlfGFudHxlbWVudHxtZW50fGVudHxvdXxpc218YXRlfGl0aXxvdXN8aXZlfGl6ZSkkLztcbiAgdmFyIHJlMl80ID0gL14oLis/KShzfHQpKGlvbikkLztcblxuICB2YXIgcmVfNSA9IC9eKC4rPyllJC87XG4gIHZhciByZV81XzEgPSAvbGwkLztcbiAgdmFyIHJlM181ID0gbmV3IFJlZ0V4cChcIl5cIiArIEMgKyB2ICsgXCJbXmFlaW91d3h5XSRcIik7XG5cbiAgdmFyIHBvcnRlclN0ZW1tZXIgPSBmdW5jdGlvbiBwb3J0ZXJTdGVtbWVyKHcpIHtcbiAgICB2YXIgICBzdGVtLFxuICAgICAgc3VmZml4LFxuICAgICAgZmlyc3RjaCxcbiAgICAgIHJlLFxuICAgICAgcmUyLFxuICAgICAgcmUzLFxuICAgICAgcmU0O1xuXG4gICAgaWYgKHcubGVuZ3RoIDwgMykgeyByZXR1cm4gdzsgfVxuXG4gICAgZmlyc3RjaCA9IHcuc3Vic3RyKDAsMSk7XG4gICAgaWYgKGZpcnN0Y2ggPT0gXCJ5XCIpIHtcbiAgICAgIHcgPSBmaXJzdGNoLnRvVXBwZXJDYXNlKCkgKyB3LnN1YnN0cigxKTtcbiAgICB9XG5cbiAgICAvLyBTdGVwIDFhXG4gICAgcmUgPSByZV8xYVxuICAgIHJlMiA9IHJlMl8xYTtcblxuICAgIGlmIChyZS50ZXN0KHcpKSB7IHcgPSB3LnJlcGxhY2UocmUsXCIkMSQyXCIpOyB9XG4gICAgZWxzZSBpZiAocmUyLnRlc3QodykpIHsgdyA9IHcucmVwbGFjZShyZTIsXCIkMSQyXCIpOyB9XG5cbiAgICAvLyBTdGVwIDFiXG4gICAgcmUgPSByZV8xYjtcbiAgICByZTIgPSByZTJfMWI7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICByZSA9IHJlX21ncjA7XG4gICAgICBpZiAocmUudGVzdChmcFsxXSkpIHtcbiAgICAgICAgcmUgPSByZV8xYl8yO1xuICAgICAgICB3ID0gdy5yZXBsYWNlKHJlLFwiXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmUyLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlMi5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgcmUyID0gcmVfc192O1xuICAgICAgaWYgKHJlMi50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtO1xuICAgICAgICByZTIgPSByZTJfMWJfMjtcbiAgICAgICAgcmUzID0gcmUzXzFiXzI7XG4gICAgICAgIHJlNCA9IHJlNF8xYl8yO1xuICAgICAgICBpZiAocmUyLnRlc3QodykpIHsgIHcgPSB3ICsgXCJlXCI7IH1cbiAgICAgICAgZWxzZSBpZiAocmUzLnRlc3QodykpIHsgcmUgPSByZV8xYl8yOyB3ID0gdy5yZXBsYWNlKHJlLFwiXCIpOyB9XG4gICAgICAgIGVsc2UgaWYgKHJlNC50ZXN0KHcpKSB7IHcgPSB3ICsgXCJlXCI7IH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDFjIC0gcmVwbGFjZSBzdWZmaXggeSBvciBZIGJ5IGkgaWYgcHJlY2VkZWQgYnkgYSBub24tdm93ZWwgd2hpY2ggaXMgbm90IHRoZSBmaXJzdCBsZXR0ZXIgb2YgdGhlIHdvcmQgKHNvIGNyeSAtPiBjcmksIGJ5IC0+IGJ5LCBzYXkgLT4gc2F5KVxuICAgIHJlID0gcmVfMWM7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICB3ID0gc3RlbSArIFwiaVwiO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMlxuICAgIHJlID0gcmVfMjtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHN1ZmZpeCA9IGZwWzJdO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW0gKyBzdGVwMmxpc3Rbc3VmZml4XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDNcbiAgICByZSA9IHJlXzM7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICBzdWZmaXggPSBmcFsyXTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtICsgc3RlcDNsaXN0W3N1ZmZpeF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCA0XG4gICAgcmUgPSByZV80O1xuICAgIHJlMiA9IHJlMl80O1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgcmUgPSByZV9tZ3IxO1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZTIudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUyLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV0gKyBmcFsyXTtcbiAgICAgIHJlMiA9IHJlX21ncjE7XG4gICAgICBpZiAocmUyLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCA1XG4gICAgcmUgPSByZV81O1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgcmUgPSByZV9tZ3IxO1xuICAgICAgcmUyID0gcmVfbWVxMTtcbiAgICAgIHJlMyA9IHJlM181O1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkgfHwgKHJlMi50ZXN0KHN0ZW0pICYmICEocmUzLnRlc3Qoc3RlbSkpKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZSA9IHJlXzVfMTtcbiAgICByZTIgPSByZV9tZ3IxO1xuICAgIGlmIChyZS50ZXN0KHcpICYmIHJlMi50ZXN0KHcpKSB7XG4gICAgICByZSA9IHJlXzFiXzI7XG4gICAgICB3ID0gdy5yZXBsYWNlKHJlLFwiXCIpO1xuICAgIH1cblxuICAgIC8vIGFuZCB0dXJuIGluaXRpYWwgWSBiYWNrIHRvIHlcblxuICAgIGlmIChmaXJzdGNoID09IFwieVwiKSB7XG4gICAgICB3ID0gZmlyc3RjaC50b0xvd2VyQ2FzZSgpICsgdy5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHc7XG4gIH07XG5cbiAgcmV0dXJuIHBvcnRlclN0ZW1tZXI7XG59KSgpO1xuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci5zdGVtbWVyLCAnc3RlbW1lcicpXG4vKiFcbiAqIGx1bnIuc3RvcFdvcmRGaWx0ZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlciBidWlsZHMgYSBzdG9wV29yZEZpbHRlciBmdW5jdGlvbiBmcm9tIHRoZSBwcm92aWRlZFxuICogbGlzdCBvZiBzdG9wIHdvcmRzLlxuICpcbiAqIFRoZSBidWlsdCBpbiBsdW5yLnN0b3BXb3JkRmlsdGVyIGlzIGJ1aWx0IHVzaW5nIHRoaXMgZ2VuZXJhdG9yIGFuZCBjYW4gYmUgdXNlZFxuICogdG8gZ2VuZXJhdGUgY3VzdG9tIHN0b3BXb3JkRmlsdGVycyBmb3IgYXBwbGljYXRpb25zIG9yIG5vbiBFbmdsaXNoIGxhbmd1YWdlcy5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAcGFyYW0ge0FycmF5fSB0b2tlbiBUaGUgdG9rZW4gdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqIEBzZWUgbHVuci5QaXBlbGluZVxuICogQHNlZSBsdW5yLnN0b3BXb3JkRmlsdGVyXG4gKi9cbmx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlciA9IGZ1bmN0aW9uIChzdG9wV29yZHMpIHtcbiAgdmFyIHdvcmRzID0gc3RvcFdvcmRzLnJlZHVjZShmdW5jdGlvbiAobWVtbywgc3RvcFdvcmQpIHtcbiAgICBtZW1vW3N0b3BXb3JkXSA9IHN0b3BXb3JkXG4gICAgcmV0dXJuIG1lbW9cbiAgfSwge30pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbikge1xuICAgIGlmICh0b2tlbiAmJiB3b3Jkc1t0b2tlbl0gIT09IHRva2VuKSByZXR1cm4gdG9rZW5cbiAgfVxufVxuXG4vKipcbiAqIGx1bnIuc3RvcFdvcmRGaWx0ZXIgaXMgYW4gRW5nbGlzaCBsYW5ndWFnZSBzdG9wIHdvcmQgbGlzdCBmaWx0ZXIsIGFueSB3b3Jkc1xuICogY29udGFpbmVkIGluIHRoZSBsaXN0IHdpbGwgbm90IGJlIHBhc3NlZCB0aHJvdWdoIHRoZSBmaWx0ZXIuXG4gKlxuICogVGhpcyBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGluIHRoZSBQaXBlbGluZS4gSWYgdGhlIHRva2VuIGRvZXMgbm90IHBhc3MgdGhlXG4gKiBmaWx0ZXIgdGhlbiB1bmRlZmluZWQgd2lsbCBiZSByZXR1cm5lZC5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIHBhc3MgdGhyb3VnaCB0aGUgZmlsdGVyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQHNlZSBsdW5yLlBpcGVsaW5lXG4gKi9cbmx1bnIuc3RvcFdvcmRGaWx0ZXIgPSBsdW5yLmdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIoW1xuICAnYScsXG4gICdhYmxlJyxcbiAgJ2Fib3V0JyxcbiAgJ2Fjcm9zcycsXG4gICdhZnRlcicsXG4gICdhbGwnLFxuICAnYWxtb3N0JyxcbiAgJ2Fsc28nLFxuICAnYW0nLFxuICAnYW1vbmcnLFxuICAnYW4nLFxuICAnYW5kJyxcbiAgJ2FueScsXG4gICdhcmUnLFxuICAnYXMnLFxuICAnYXQnLFxuICAnYmUnLFxuICAnYmVjYXVzZScsXG4gICdiZWVuJyxcbiAgJ2J1dCcsXG4gICdieScsXG4gICdjYW4nLFxuICAnY2Fubm90JyxcbiAgJ2NvdWxkJyxcbiAgJ2RlYXInLFxuICAnZGlkJyxcbiAgJ2RvJyxcbiAgJ2RvZXMnLFxuICAnZWl0aGVyJyxcbiAgJ2Vsc2UnLFxuICAnZXZlcicsXG4gICdldmVyeScsXG4gICdmb3InLFxuICAnZnJvbScsXG4gICdnZXQnLFxuICAnZ290JyxcbiAgJ2hhZCcsXG4gICdoYXMnLFxuICAnaGF2ZScsXG4gICdoZScsXG4gICdoZXInLFxuICAnaGVycycsXG4gICdoaW0nLFxuICAnaGlzJyxcbiAgJ2hvdycsXG4gICdob3dldmVyJyxcbiAgJ2knLFxuICAnaWYnLFxuICAnaW4nLFxuICAnaW50bycsXG4gICdpcycsXG4gICdpdCcsXG4gICdpdHMnLFxuICAnanVzdCcsXG4gICdsZWFzdCcsXG4gICdsZXQnLFxuICAnbGlrZScsXG4gICdsaWtlbHknLFxuICAnbWF5JyxcbiAgJ21lJyxcbiAgJ21pZ2h0JyxcbiAgJ21vc3QnLFxuICAnbXVzdCcsXG4gICdteScsXG4gICduZWl0aGVyJyxcbiAgJ25vJyxcbiAgJ25vcicsXG4gICdub3QnLFxuICAnb2YnLFxuICAnb2ZmJyxcbiAgJ29mdGVuJyxcbiAgJ29uJyxcbiAgJ29ubHknLFxuICAnb3InLFxuICAnb3RoZXInLFxuICAnb3VyJyxcbiAgJ293bicsXG4gICdyYXRoZXInLFxuICAnc2FpZCcsXG4gICdzYXknLFxuICAnc2F5cycsXG4gICdzaGUnLFxuICAnc2hvdWxkJyxcbiAgJ3NpbmNlJyxcbiAgJ3NvJyxcbiAgJ3NvbWUnLFxuICAndGhhbicsXG4gICd0aGF0JyxcbiAgJ3RoZScsXG4gICd0aGVpcicsXG4gICd0aGVtJyxcbiAgJ3RoZW4nLFxuICAndGhlcmUnLFxuICAndGhlc2UnLFxuICAndGhleScsXG4gICd0aGlzJyxcbiAgJ3RpcycsXG4gICd0bycsXG4gICd0b28nLFxuICAndHdhcycsXG4gICd1cycsXG4gICd3YW50cycsXG4gICd3YXMnLFxuICAnd2UnLFxuICAnd2VyZScsXG4gICd3aGF0JyxcbiAgJ3doZW4nLFxuICAnd2hlcmUnLFxuICAnd2hpY2gnLFxuICAnd2hpbGUnLFxuICAnd2hvJyxcbiAgJ3dob20nLFxuICAnd2h5JyxcbiAgJ3dpbGwnLFxuICAnd2l0aCcsXG4gICd3b3VsZCcsXG4gICd5ZXQnLFxuICAneW91JyxcbiAgJ3lvdXInXG5dKVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci5zdG9wV29yZEZpbHRlciwgJ3N0b3BXb3JkRmlsdGVyJylcbi8qIVxuICogbHVuci50cmltbWVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLnRyaW1tZXIgaXMgYSBwaXBlbGluZSBmdW5jdGlvbiBmb3IgdHJpbW1pbmcgbm9uIHdvcmRcbiAqIGNoYXJhY3RlcnMgZnJvbSB0aGUgYmVnaW5pbmcgYW5kIGVuZCBvZiB0b2tlbnMgYmVmb3JlIHRoZXlcbiAqIGVudGVyIHRoZSBpbmRleC5cbiAqXG4gKiBUaGlzIGltcGxlbWVudGF0aW9uIG1heSBub3Qgd29yayBjb3JyZWN0bHkgZm9yIG5vbiBsYXRpblxuICogY2hhcmFjdGVycyBhbmQgc2hvdWxkIGVpdGhlciBiZSByZW1vdmVkIG9yIGFkYXB0ZWQgZm9yIHVzZVxuICogd2l0aCBsYW5ndWFnZXMgd2l0aCBub24tbGF0aW4gY2hhcmFjdGVycy5cbiAqXG4gKiBAbW9kdWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIHBhc3MgdGhyb3VnaCB0aGUgZmlsdGVyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQHNlZSBsdW5yLlBpcGVsaW5lXG4gKi9cbmx1bnIudHJpbW1lciA9IGZ1bmN0aW9uICh0b2tlbikge1xuICByZXR1cm4gdG9rZW4ucmVwbGFjZSgvXlxcVysvLCAnJykucmVwbGFjZSgvXFxXKyQvLCAnJylcbn1cblxubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uKGx1bnIudHJpbW1lciwgJ3RyaW1tZXInKVxuLyohXG4gKiBsdW5yLnN0ZW1tZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqIEluY2x1ZGVzIGNvZGUgZnJvbSAtIGh0dHA6Ly90YXJ0YXJ1cy5vcmcvfm1hcnRpbi9Qb3J0ZXJTdGVtbWVyL2pzLnR4dFxuICovXG5cbi8qKlxuICogbHVuci5Ub2tlblN0b3JlIGlzIHVzZWQgZm9yIGVmZmljaWVudCBzdG9yaW5nIGFuZCBsb29rdXAgb2YgdGhlIHJldmVyc2VcbiAqIGluZGV4IG9mIHRva2VuIHRvIGRvY3VtZW50IHJlZi5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xubHVuci5Ub2tlblN0b3JlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJvb3QgPSB7IGRvY3M6IHt9IH1cbiAgdGhpcy5sZW5ndGggPSAwXG59XG5cbi8qKlxuICogTG9hZHMgYSBwcmV2aW91c2x5IHNlcmlhbGlzZWQgdG9rZW4gc3RvcmVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXNlZERhdGEgVGhlIHNlcmlhbGlzZWQgdG9rZW4gc3RvcmUgdG8gbG9hZC5cbiAqIEByZXR1cm5zIHtsdW5yLlRva2VuU3RvcmV9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkRGF0YSkge1xuICB2YXIgc3RvcmUgPSBuZXcgdGhpc1xuXG4gIHN0b3JlLnJvb3QgPSBzZXJpYWxpc2VkRGF0YS5yb290XG4gIHN0b3JlLmxlbmd0aCA9IHNlcmlhbGlzZWREYXRhLmxlbmd0aFxuXG4gIHJldHVybiBzdG9yZVxufVxuXG4vKipcbiAqIEFkZHMgYSBuZXcgdG9rZW4gZG9jIHBhaXIgdG8gdGhlIHN0b3JlLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhpcyBmdW5jdGlvbiBzdGFydHMgYXQgdGhlIHJvb3Qgb2YgdGhlIGN1cnJlbnQgc3RvcmUsIGhvd2V2ZXJcbiAqIGl0IGNhbiBzdGFydCBhdCBhbnkgbm9kZSBvZiBhbnkgdG9rZW4gc3RvcmUgaWYgcmVxdWlyZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBzdG9yZSB0aGUgZG9jIHVuZGVyXG4gKiBAcGFyYW0ge09iamVjdH0gZG9jIFRoZSBkb2MgdG8gc3RvcmUgYWdhaW5zdCB0aGUgdG9rZW5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnQgbG9va2luZyBmb3IgdGhlXG4gKiBjb3JyZWN0IHBsYWNlIHRvIGVudGVyIHRoZSBkb2MsIGJ5IGRlZmF1bHQgdGhlIHJvb3Qgb2YgdGhpcyBsdW5yLlRva2VuU3RvcmVcbiAqIGlzIHVzZWQuXG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0b2tlbiwgZG9jLCByb290KSB7XG4gIHZhciByb290ID0gcm9vdCB8fCB0aGlzLnJvb3QsXG4gICAgICBrZXkgPSB0b2tlbi5jaGFyQXQoMCksXG4gICAgICByZXN0ID0gdG9rZW4uc2xpY2UoMSlcblxuICBpZiAoIShrZXkgaW4gcm9vdCkpIHJvb3Rba2V5XSA9IHtkb2NzOiB7fX1cblxuICBpZiAocmVzdC5sZW5ndGggPT09IDApIHtcbiAgICByb290W2tleV0uZG9jc1tkb2MucmVmXSA9IGRvY1xuICAgIHRoaXMubGVuZ3RoICs9IDFcbiAgICByZXR1cm5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5hZGQocmVzdCwgZG9jLCByb290W2tleV0pXG4gIH1cbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGlzIGtleSBpcyBjb250YWluZWQgd2l0aGluIHRoaXMgbHVuci5Ub2tlblN0b3JlLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhpcyBmdW5jdGlvbiBzdGFydHMgYXQgdGhlIHJvb3Qgb2YgdGhlIGN1cnJlbnQgc3RvcmUsIGhvd2V2ZXJcbiAqIGl0IGNhbiBzdGFydCBhdCBhbnkgbm9kZSBvZiBhbnkgdG9rZW4gc3RvcmUgaWYgcmVxdWlyZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBjaGVjayBmb3JcbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnRcbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIGlmICghdG9rZW4pIHJldHVybiBmYWxzZVxuXG4gIHZhciBub2RlID0gdGhpcy5yb290XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbi5sZW5ndGg7IGkrKykge1xuICAgIGlmICghbm9kZVt0b2tlbi5jaGFyQXQoaSldKSByZXR1cm4gZmFsc2VcblxuICAgIG5vZGUgPSBub2RlW3Rva2VuLmNoYXJBdChpKV1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbi8qKlxuICogUmV0cmlldmUgYSBub2RlIGZyb20gdGhlIHRva2VuIHN0b3JlIGZvciBhIGdpdmVuIHRva2VuLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhpcyBmdW5jdGlvbiBzdGFydHMgYXQgdGhlIHJvb3Qgb2YgdGhlIGN1cnJlbnQgc3RvcmUsIGhvd2V2ZXJcbiAqIGl0IGNhbiBzdGFydCBhdCBhbnkgbm9kZSBvZiBhbnkgdG9rZW4gc3RvcmUgaWYgcmVxdWlyZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBnZXQgdGhlIG5vZGUgZm9yLlxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgQW4gb3B0aW9uYWwgbm9kZSBhdCB3aGljaCB0byBzdGFydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAc2VlIFRva2VuU3RvcmUucHJvdG90eXBlLmdldFxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5nZXROb2RlID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIGlmICghdG9rZW4pIHJldHVybiB7fVxuXG4gIHZhciBub2RlID0gdGhpcy5yb290XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbi5sZW5ndGg7IGkrKykge1xuICAgIGlmICghbm9kZVt0b2tlbi5jaGFyQXQoaSldKSByZXR1cm4ge31cblxuICAgIG5vZGUgPSBub2RlW3Rva2VuLmNoYXJBdChpKV1cbiAgfVxuXG4gIHJldHVybiBub2RlXG59XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGRvY3VtZW50cyBmb3IgYSBub2RlIGZvciB0aGUgZ2l2ZW4gdG9rZW4uXG4gKlxuICogQnkgZGVmYXVsdCB0aGlzIGZ1bmN0aW9uIHN0YXJ0cyBhdCB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBzdG9yZSwgaG93ZXZlclxuICogaXQgY2FuIHN0YXJ0IGF0IGFueSBub2RlIG9mIGFueSB0b2tlbiBzdG9yZSBpZiByZXF1aXJlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gVGhlIHRva2VuIHRvIGdldCB0aGUgZG9jdW1lbnRzIGZvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSByb290IEFuIG9wdGlvbmFsIG5vZGUgYXQgd2hpY2ggdG8gc3RhcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAodG9rZW4sIHJvb3QpIHtcbiAgcmV0dXJuIHRoaXMuZ2V0Tm9kZSh0b2tlbiwgcm9vdCkuZG9jcyB8fCB7fVxufVxuXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24gKHRva2VuLCByb290KSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmdldCh0b2tlbiwgcm9vdCkpLmxlbmd0aFxufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgZG9jdW1lbnQgaWRlbnRpZmllZCBieSByZWYgZnJvbSB0aGUgdG9rZW4gaW4gdGhlIHN0b3JlLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhpcyBmdW5jdGlvbiBzdGFydHMgYXQgdGhlIHJvb3Qgb2YgdGhlIGN1cnJlbnQgc3RvcmUsIGhvd2V2ZXJcbiAqIGl0IGNhbiBzdGFydCBhdCBhbnkgbm9kZSBvZiBhbnkgdG9rZW4gc3RvcmUgaWYgcmVxdWlyZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRva2VuIFRoZSB0b2tlbiB0byBnZXQgdGhlIGRvY3VtZW50cyBmb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVmIFRoZSByZWYgb2YgdGhlIGRvY3VtZW50IHRvIHJlbW92ZSBmcm9tIHRoaXMgdG9rZW4uXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCBBbiBvcHRpb25hbCBub2RlIGF0IHdoaWNoIHRvIHN0YXJ0LlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBtZW1iZXJPZiBUb2tlblN0b3JlXG4gKi9cbmx1bnIuVG9rZW5TdG9yZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHRva2VuLCByZWYpIHtcbiAgaWYgKCF0b2tlbikgcmV0dXJuXG4gIHZhciBub2RlID0gdGhpcy5yb290XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbi5sZW5ndGg7IGkrKykge1xuICAgIGlmICghKHRva2VuLmNoYXJBdChpKSBpbiBub2RlKSkgcmV0dXJuXG4gICAgbm9kZSA9IG5vZGVbdG9rZW4uY2hhckF0KGkpXVxuICB9XG5cbiAgZGVsZXRlIG5vZGUuZG9jc1tyZWZdXG59XG5cbi8qKlxuICogRmluZCBhbGwgdGhlIHBvc3NpYmxlIHN1ZmZpeGVzIG9mIHRoZSBwYXNzZWQgdG9rZW4gdXNpbmcgdG9rZW5zXG4gKiBjdXJyZW50bHkgaW4gdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b2tlbiBUaGUgdG9rZW4gdG8gZXhwYW5kLlxuICogQHJldHVybnMge0FycmF5fVxuICogQG1lbWJlck9mIFRva2VuU3RvcmVcbiAqL1xubHVuci5Ub2tlblN0b3JlLnByb3RvdHlwZS5leHBhbmQgPSBmdW5jdGlvbiAodG9rZW4sIG1lbW8pIHtcbiAgdmFyIHJvb3QgPSB0aGlzLmdldE5vZGUodG9rZW4pLFxuICAgICAgZG9jcyA9IHJvb3QuZG9jcyB8fCB7fSxcbiAgICAgIG1lbW8gPSBtZW1vIHx8IFtdXG5cbiAgaWYgKE9iamVjdC5rZXlzKGRvY3MpLmxlbmd0aCkgbWVtby5wdXNoKHRva2VuKVxuXG4gIE9iamVjdC5rZXlzKHJvb3QpXG4gICAgLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKGtleSA9PT0gJ2RvY3MnKSByZXR1cm5cblxuICAgICAgbWVtby5jb25jYXQodGhpcy5leHBhbmQodG9rZW4gKyBrZXksIG1lbW8pKVxuICAgIH0sIHRoaXMpXG5cbiAgcmV0dXJuIG1lbW9cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRva2VuIHN0b3JlIHJlYWR5IGZvciBzZXJpYWxpc2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAbWVtYmVyT2YgVG9rZW5TdG9yZVxuICovXG5sdW5yLlRva2VuU3RvcmUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICByb290OiB0aGlzLnJvb3QsXG4gICAgbGVuZ3RoOiB0aGlzLmxlbmd0aFxuICB9XG59XG5cbiAgLyoqXG4gICAqIGV4cG9ydCB0aGUgbW9kdWxlIHZpYSBBTUQsIENvbW1vbkpTIG9yIGFzIGEgYnJvd3NlciBnbG9iYWxcbiAgICogRXhwb3J0IGNvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdW1kanMvdW1kL2Jsb2IvbWFzdGVyL3JldHVybkV4cG9ydHMuanNcbiAgICovXG4gIDsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICBkZWZpbmUoZmFjdG9yeSlcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgLyoqXG4gICAgICAgKiBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAgICAqIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgICAgKiBsaWtlIE5vZGUuXG4gICAgICAgKi9cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEJyb3dzZXIgZ2xvYmFscyAocm9vdCBpcyB3aW5kb3cpXG4gICAgICByb290Lmx1bnIgPSBmYWN0b3J5KClcbiAgICB9XG4gIH0odGhpcywgZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEp1c3QgcmV0dXJuIGEgdmFsdWUgdG8gZGVmaW5lIHRoZSBtb2R1bGUgZXhwb3J0LlxuICAgICAqIFRoaXMgZXhhbXBsZSByZXR1cm5zIGFuIG9iamVjdCwgYnV0IHRoZSBtb2R1bGVcbiAgICAgKiBjYW4gcmV0dXJuIGEgZnVuY3Rpb24gYXMgdGhlIGV4cG9ydGVkIHZhbHVlLlxuICAgICAqL1xuICAgIHJldHVybiBsdW5yXG4gIH0pKVxufSkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vbHVuci9sdW5yLmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIjtcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcblxuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCA9ICdkYXRhLWlkJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgaWYgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGVsZW1lbnQsIHZpc2libGUpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBlbXB0eVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbXB0eSA9ICh0ZXh0KSA9PiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSAmJiAodGV4dC5sZW5ndGggPT09IDApO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsVmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBiYWNrIGJ1dHRvblxuICAgIGNvbnN0IGJhY2tCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYmFja0J1dHRvbkVsZW1lbnQuY2xhc3NOYW1lID0gJ2JhY2stYnV0dG9uIGljb24tYXJyb3ctdGhpY2snO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIGJhY2tCdXR0b25FbGVtZW50KTtcblxuICAgIC8vIGltYWdlXG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHRoaXMuaW1hZ2UuY2xhc3NOYW1lID0gJ2ltZy1yZXNwb25zaXZlJztcblxuICAgIGNvbnN0IGltYWdlV3JhcHBlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbWFnZVdyYXBwZXJFbGVtZW50LmNsYXNzTmFtZSA9ICdpbWFnZS13cmFwcGVyJztcbiAgICBpbWFnZVdyYXBwZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaW1hZ2UpO1xuXG4gICAgLy8gdGl0bGVcbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcblxuICAgIC8vIGF1dGhvclxuICAgIHRoaXMuYXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5hdXRob3IuY2xhc3NOYW1lID0gJ2F1dGhvcic7XG4gICAgdGhpcy5hdXRob3IuaW5uZXJIVE1MID0gJ2J5IEpvdWJlbCc7IC8vIFRPRE8gTWFrZSBkeW5hbWljXG5cbiAgICAvLyBkZXNjcmlwdGlvblxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbi5jbGFzc05hbWUgPSAnc21hbGwnO1xuXG4gICAgLy8gZGVtbyBidXR0b25cbiAgICB0aGlzLmRlbW9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdGhpcy5kZW1vQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24nO1xuICAgIHRoaXMuZGVtb0J1dHRvbi5pbm5lckhUTUwgPSAnQ29udGVudCBEZW1vJztcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG4gICAgaGlkZSh0aGlzLmRlbW9CdXR0b24pO1xuXG4gICAgY29uc3QgdGV4dERldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZXh0RGV0YWlscy5jbGFzc05hbWUgPSAndGV4dC1kZXRhaWxzJztcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLmF1dGhvcik7XG4gICAgdGV4dERldGFpbHMuYXBwZW5kQ2hpbGQodGhpcy5kZXNjcmlwdGlvbik7XG4gICAgdGV4dERldGFpbHMuYXBwZW5kQ2hpbGQodGhpcy5kZW1vQnV0dG9uKTtcblxuICAgIGNvbnN0IGRldGFpbHNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGV0YWlsc0VsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG4gICAgZGV0YWlsc0VsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VXcmFwcGVyRWxlbWVudCk7XG4gICAgZGV0YWlsc0VsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dERldGFpbHMpO1xuXG4gICAgLy8gdXNlIGJ1dHRvblxuICAgIHRoaXMudXNlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaXMudXNlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24gYnV0dG9uLXByaW1hcnknO1xuICAgIHRoaXMudXNlQnV0dG9uLmlubmVySFRNTCA9ICdVc2UnO1xuICAgIGhpZGUodGhpcy51c2VCdXR0b24pO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XG5cbiAgICAvLyBpbnN0YWxsIGJ1dHRvblxuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0aGlzLmluc3RhbGxCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5JztcbiAgICB0aGlzLmluc3RhbGxCdXR0b24uaW5uZXJIVE1MID0gJ0luc3RhbGwnO1xuICAgIGhpZGUodGhpcy5pbnN0YWxsQnV0dG9uKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygnaW5zdGFsbCcsIHRoaXMsIHRoaXMuaW5zdGFsbEJ1dHRvbik7XG5cbiAgICBjb25zdCBidXR0b25CYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBidXR0b25CYXIuY2xhc3NOYW1lID0gJ2J1dHRvbi1iYXInO1xuICAgIGJ1dHRvbkJhci5hcHBlbmRDaGlsZCh0aGlzLnVzZUJ1dHRvbik7XG4gICAgYnV0dG9uQmFyLmFwcGVuZENoaWxkKHRoaXMuaW5zdGFsbEJ1dHRvbik7XG5cbiAgICAvLyBsaWNlbmNlIHBhbmVsXG4gICAgY29uc3QgbGljZW5jZVBhbmVsID0gdGhpcy5jcmVhdGVQYW5lbCgnVGhlIExpY2VuY2UgSW5mbycsICdpcHN1bSBsb3J1bScsICdsaWNlbmNlLXBhbmVsJyk7XG4gICAgY29uc3QgcGx1Z2luc1BhbmVsID0gdGhpcy5jcmVhdGVQYW5lbCgnQXZhaWxhYmxlIHBsdWdpbnMnLCAnaXBzdW0gbG9ydW0nLCAncGx1Z2lucy1wYW5lbCcpO1xuICAgIGNvbnN0IHB1Ymxpc2hlclBhbmVsID0gdGhpcy5jcmVhdGVQYW5lbCgnUHVibGlzaGVyIEluZm8nLCAnaXBzdW0gbG9ydW0nLCAncHVibGlzaGVyLXBhbmVsJyk7XG5cbiAgICAvLyBwYW5lbCBncm91cFxuICAgIGNvbnN0IHBhbmVsR3JvdXBFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFuZWxHcm91cEVsZW1lbnQuY2xhc3NOYW1lID0gJ3BhbmVsLWdyb3VwJztcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5hcHBlbmRDaGlsZChsaWNlbmNlUGFuZWwpO1xuICAgIHBhbmVsR3JvdXBFbGVtZW50LmFwcGVuZENoaWxkKHBsdWdpbnNQYW5lbCk7XG4gICAgcGFuZWxHcm91cEVsZW1lbnQuYXBwZW5kQ2hpbGQocHVibGlzaGVyUGFuZWwpO1xuXG4gICAgLy8gYWRkIHJvb3QgZWxlbWVudFxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtZGV0YWlsJztcbiAgICB0aGlzLnJvb3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoYmFja0J1dHRvbkVsZW1lbnQpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoZGV0YWlsc0VsZW1lbnQpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uQmFyKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHBhbmVsR3JvdXBFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5SWRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVQYW5lbCh0aXRsZSwgYm9keSwgYm9keUlkKSB7XG4gICAgY29uc3QgaGVhZGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZWFkZXJFbC5jbGFzc05hbWUgPSAncGFuZWwtaGVhZGVyJztcbiAgICBoZWFkZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICBoZWFkZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBib2R5SWQpO1xuICAgIGhlYWRlckVsLmlubmVySFRNTCA9IHRpdGxlO1xuXG4gICAgY29uc3QgYm9keUlubmVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBib2R5SW5uZXJFbC5jbGFzc05hbWUgPSAncGFuZWwtYm9keS1pbm5lcic7XG4gICAgYm9keUlubmVyRWwuaW5uZXJIVE1MID0gYm9keTtcblxuICAgIGNvbnN0IGJvZHlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvZHlFbC5jbGFzc05hbWUgPSAncGFuZWwtYm9keSc7XG4gICAgYm9keUVsLmlkID0gYm9keUlkO1xuICAgIGJvZHlFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBib2R5RWwuYXBwZW5kQ2hpbGQoYm9keUlubmVyRWwpO1xuXG4gICAgY29uc3QgcGFuZWxFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBhbmVsRWwuY2xhc3NOYW1lID0gJ3BhbmVsJztcbiAgICBwYW5lbEVsLmFwcGVuZENoaWxkKGhlYWRlckVsKTtcbiAgICBwYW5lbEVsLmFwcGVuZENoaWxkKGJvZHlFbCk7XG5cbiAgICBpbml0UGFuZWwocGFuZWxFbCk7XG5cbiAgICByZXR1cm4gcGFuZWxFbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbWFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gICAqL1xuICBzZXRJbWFnZShzcmMpIHtcbiAgICB0aGlzLmltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldElkKGlkKSB7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gICAgdGhpcy51c2VCdXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XG4gICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSB0ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGV4YW1wbGUgdXJsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICovXG4gIHNldEV4YW1wbGUodXJsKSB7XG4gICAgdGhpcy5kZW1vQnV0dG9uLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCB8fCAnIycpO1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy5kZW1vQnV0dG9uLCAhaXNFbXB0eSh1cmwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGlmIHRoZSBjb250ZW50IHR5cGUgaXMgaW5zdGFsbGVkXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5zdGFsbGVkXG4gICAqL1xuICBzZXRJc0luc3RhbGxlZChpbnN0YWxsZWQpIHtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMudXNlQnV0dG9uLCBpbnN0YWxsZWQpO1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy5pbnN0YWxsQnV0dG9uLCAhaW5zdGFsbGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIGhpZGUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICBzaG93KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVEZXRhaWxWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlld1wiO1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gXCIuLi9odWItc2VydmljZXNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gdmlld3NcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZURldGFpbFZpZXcoc3RhdGUpO1xuICAgIHRoaXMudmlldy5vbignaW5zdGFsbCcsIHRoaXMuaW5zdGFsbCwgdGhpcyk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydjbG9zZScsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgZGV0YWlsIHZpZXdcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgbG9hZEJ5SWQoaWQpIHtcbiAgICB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgLnRoZW4odGhpcy51cGRhdGUuYmluZCh0aGlzKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIENvbnRlbnQgVHlwZSBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgIGluc3RhbGwoe2lkfSkge1xuICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSlcbiAgICAgICAudGhlbihtYWNoaW5lTmFtZSA9PiB0aGlzLnNlcnZpY2VzLmluc3RhbGxDb250ZW50VHlwZShtYWNoaW5lTmFtZSkpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gY29uc29sZS5kZWJ1ZygnVE9ETywgZ3VpIHVwZGF0ZXMnKSlcbiAgIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdmlldyB3aXRoIHRoZSBjb250ZW50IHR5cGUgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlKSB7XG4gICAgdGhpcy52aWV3LnNldElkKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcbiAgICB0aGlzLnZpZXcuc2V0VGl0bGUoY29udGVudFR5cGUudGl0bGUpO1xuICAgIHRoaXMudmlldy5zZXREZXNjcmlwdGlvbihjb250ZW50VHlwZS5kZXNjcmlwdGlvbik7XG4gICAgdGhpcy52aWV3LnNldEltYWdlKGNvbnRlbnRUeXBlLmljb24pO1xuICAgIHRoaXMudmlldy5zZXRFeGFtcGxlKGNvbnRlbnRUeXBlLmV4YW1wbGUpO1xuICAgIHRoaXMudmlldy5zZXRJc0luc3RhbGxlZCghIWNvbnRlbnRUeXBlLmluc3RhbGxlZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3RWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtbGlzdCc7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCByb3dzIGZyb20gcm9vdCBlbGVtZW50XG4gICAqL1xuICByZW1vdmVBbGxSb3dzKCkge1xuICAgIGlmKHRoaXMucm9vdEVsZW1lbnQpe1xuICAgICAgd2hpbGUodGhpcy5yb290RWxlbWVudC5maXJzdENoaWxkKXtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLnJvb3RFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcm93XG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICBhZGRSb3coY29udGVudFR5cGUpIHtcbiAgICBjb25zdCByb3cgPSB0aGlzLmNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCB0aGlzKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncm93LXNlbGVjdGVkJywgdGhpcywgcm93KTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHJvdylcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIENvbnRlbnQgVHlwZSBjb25maWd1cmF0aW9uIGFuZCBjcmVhdGVzIGEgcm93IGRvbVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKiBAcGFyYW0ge0V2ZW50ZnVsfSBzY29wZVxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZUNvbnRlbnRUeXBlUm93KGNvbnRlbnRUeXBlLCBzY29wZSkge1xuICAgIC8vIHJvdyBpdGVtXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC5pZCA9IGBjb250ZW50LXR5cGUtJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1gO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuXG4gICAgLy8gY3JlYXRlIGJ1dHRvbiBjb25maWdcbiAgICBjb25zdCB1c2VCdXR0b25Db25maWcgPSB7IHRleHQ6ICdVc2UnLCBjbHM6ICdidXR0b24tcHJpbWFyeScgfTtcbiAgICBjb25zdCBpbnN0YWxsQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnaW5zdGFsbCcsIGNsczogJ2J1dHRvbi1pbnZlcnNlLXByaW1hcnknfTtcbiAgICBjb25zdCBidXR0b24gPSBjb250ZW50VHlwZS5pbnN0YWxsZWQgPyAgdXNlQnV0dG9uQ29uZmlnOiBpbnN0YWxsQnV0dG9uQ29uZmlnO1xuXG4gICAgLy8gY3JlYXRlIGh0bWxcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cIiR7Y29udGVudFR5cGUuaWNvbn1cIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uICR7YnV0dG9uLmNsc31cIiBkYXRhLWlkPVwiJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1cIj4ke2J1dHRvbi50ZXh0fTwvc3Bhbj5cbiAgICAgIDxoND4ke2NvbnRlbnRUeXBlLnRpdGxlfTwvaDQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke2NvbnRlbnRUeXBlLnN1bW1hcnl9PC9kaXY+XG4gICBgO1xuXG4gICAgLy8gaGFuZGxlIHVzZSBidXR0b25cbiAgICBjb25zdCB1c2VCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tcHJpbWFyeScpO1xuICAgIGlmKHVzZUJ1dHRvbil7XG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0Jywgc2NvcGUsIHVzZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlTGlzdFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWxpc3Qtdmlld1wiO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBSb3cgc2VsZWN0ZWQgZXZlbnRcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIFVwZGF0ZSBjb250ZW50IHR5cGUgbGlzdCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGFkZCB0aGUgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlTGlzdFZpZXcoc3RhdGUpO1xuICAgIHRoaXMucHJvcGFnYXRlKFsncm93LXNlbGVjdGVkJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGUgdGhpcyBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGlzIGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgd2l0aCBuZXcgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlcykge1xuICAgIHRoaXMudmlldy5yZW1vdmVBbGxSb3dzKCk7XG4gICAgY29udGVudFR5cGVzLmZvckVhY2godGhpcy52aWV3LmFkZFJvdywgdGhpcy52aWV3KTtcbiAgICB0aGlzLmZpcmUoJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHt9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZpZXdzIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwiaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3XG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3IHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudHNcbiAgICBjb25zdCBtZW51ID0gdGhpcy5jcmVhdGVNZW51RWxlbWVudCgpO1xuICAgIGNvbnN0IGlucHV0R3JvdXAgPSB0aGlzLmNyZWF0ZUlucHV0R3JvdXBFbGVtZW50KCk7XG5cbiAgICAvLyBtZW51IGdyb3VwXG4gICAgY29uc3QgbWVudUdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVudUdyb3VwLmNsYXNzTmFtZSA9ICdtZW51LWdyb3VwJztcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQobWVudSk7XG4gICAgbWVudUdyb3VwLmFwcGVuZENoaWxkKGlucHV0R3JvdXApO1xuXG4gICAgLy8gcm9vdCBlbGVtZW50XG4gICAgdGhpcy5yb290RWxlbWVudCAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKG1lbnVHcm91cCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG1lbnUgaXRlbVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGFkZE1lbnVJdGVtKHRleHQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51aXRlbScpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcblxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICB0aGlzLmZpcmUoJ21lbnUtc2VsZWN0ZWQnLCB7XG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LnRhcmdldFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBzZXRzIGZpcnN0IHRvIGJlIHNlbGVjdGVkXG4gICAgaWYodGhpcy5tZW51QmFyRWxlbWVudC5jaGlsZEVsZW1lbnRDb3VudCA8IDEpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdG8gbWVudSBiYXJcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgbWVudSBiYXIgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlTWVudUVsZW1lbnQoKSB7XG4gICAgdGhpcy5tZW51QmFyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5tZW51QmFyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWJhcicpO1xuICAgIHRoaXMubWVudUJhckVsZW1lbnQuY2xhc3NOYW1lID0gJ2g1cC1tZW51JztcblxuICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubWVudUJhckVsZW1lbnQpO1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aXRsZS5jbGFzc05hbWUgPSBcIm1lbnUtdGl0bGVcIjtcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBcIkJyb3dzZSBjb250ZW50IHR5cGVzXCI7XG5cbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVudS5jbGFzc05hbWUgPSBcIm1lbnVcIjtcbiAgICBtZW51LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBtZW51LmFwcGVuZENoaWxkKG5hdkVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIG1lbnU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgaW5wdXQgZ3JvdXAgdXNlZCBmb3Igc2VhcmNoXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQoKSB7XG4gICAgLy8gaW5wdXQgZmllbGRcbiAgICBjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dEZpZWxkLmNsYXNzTmFtZSA9ICdmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXJvdW5kZWQnO1xuICAgIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBcIlNlYXJjaCBmb3IgQ29udGVudCBUeXBlc1wiKTtcbiAgICBpbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5maXJlKCdzZWFyY2gnLCB7XG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LnRhcmdldCxcbiAgICAgICAgcXVlcnk6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbnB1dCBidXR0b25cbiAgICBjb25zdCBpbnB1dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGlucHV0QnV0dG9uLmNsYXNzTmFtZSA9ICdpbnB1dC1ncm91cC1hZGRvbiBpY29uLXNlYXJjaCc7XG5cbiAgICAvLyBpbnB1dCBncm91cFxuICAgIGNvbnN0IGlucHV0R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbnB1dEdyb3VwLmNsYXNzTmFtZSA9ICdpbnB1dC1ncm91cCc7XG4gICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEZpZWxkKTtcbiAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0QnV0dG9uKTtcblxuICAgIHJldHVybiBpbnB1dEdyb3VwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJpbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3XCI7XG5pbXBvcnQgU2VhcmNoU2VydmljZSBmcm9tIFwiLi4vc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2VcIjtcbmltcG9ydCBDb250ZW50VHlwZUxpc3QgZnJvbSAnLi4vY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QnO1xuaW1wb3J0IENvbnRlbnRUeXBlRGV0YWlsIGZyb20gJy4uL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbCc7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4uL3V0aWxzL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRUeXBlU2VjdGlvblxuICogQG1peGVzIEV2ZW50ZnVsXG4gKlxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gYWRkIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uVmlldyhzdGF0ZSk7XG5cbiAgICAvLyBjb250cm9sbGVyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2UoeyBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsIH0pO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0ID0gbmV3IENvbnRlbnRUeXBlTGlzdCgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwgPSBuZXcgQ29udGVudFR5cGVEZXRhaWwoeyBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsIH0pO1xuXG4gICAgLy8gYWRkIG1lbnUgaXRlbXNcbiAgICBbJ015IENvbnRlbnQgVHlwZXMnLCAnTmV3ZXN0JywgJ01vc3QgUG9wdWxhcicsICdSZWNvbW1lbmRlZCddXG4gICAgICAuZm9yRWFjaChtZW51VGV4dCA9PiB0aGlzLnZpZXcuYWRkTWVudUl0ZW0obWVudVRleHQpKTtcblxuICAgIC8vIEVsZW1lbnQgZm9yIGhvbGRpbmcgbGlzdCBhbmQgZGV0YWlscyB2aWV3c1xuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtdHlwZS1zZWN0aW9uJyk7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gc2VjdGlvbjtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVMaXN0LmdldEVsZW1lbnQoKSk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmdldEVsZW1lbnQoKSk7XG5cbiAgICB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCddLCB0aGlzLmNvbnRlbnRUeXBlTGlzdCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XG5cbiAgICAvLyByZWdpc3RlciBsaXN0ZW5lcnNcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMuc2VhcmNoLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmFwcGx5U2VhcmNoRmlsdGVyLCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5vbigncm93LXNlbGVjdGVkJywgdGhpcy5zaG93RGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG5cbiAgICB0aGlzLmluaXRDb250ZW50VHlwZUxpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0IHdpdGggYSBzZWFyY2hcbiAgICovXG4gIGluaXRDb250ZW50VHlwZUxpc3QoKSB7XG4gICAgLy8gaW5pdGlhbGl6ZSBieSBzZWFyY2hcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKFwiXCIpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5maXJlKCdlcnJvcicsIGVycm9yKSk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgYSBzZWFyY2ggYW5kIHVwZGF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICAgKi9cbiAgc2VhcmNoKHtxdWVyeX0pIHtcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYXBwbHkgYSBzZWFyY2ggZmlsdGVyXG4gICAqL1xuICBhcHBseVNlYXJjaEZpbHRlcigpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdDb250ZW50VHlwZVNlY3Rpb246IG1lbnUgd2FzIGNsaWNrZWQhJywgZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIGRldGFpbCB2aWV3XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2hvd0RldGFpbFZpZXcoe2lkfSkge1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmxvYWRCeUlkKGlkKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLnNob3coKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENsb3NlIGRldGFpbCB2aWV3XG4gICAqL1xuICBjbG9zZURldGFpbFZpZXcoKSB7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5oaWRlKCk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Quc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxuaW1wb3J0IGluaXRUYWJQYW5lbCBmcm9tIFwiY29tcG9uZW50cy90YWItcGFuZWxcIlxuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4vdXRpbHMvZXZlbnRzJztcbi8qKlxuICogVGFiIGNoYW5nZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjdGFiLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBQYW5lbCBvcGVuIG9yIGNsb3NlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyNwYW5lbC1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9EQVRBX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YlZpZXcjdGFiLWNoYW5nZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJWaWV3IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgdGhpcy5yZW5kZXJUYWJQYW5lbChzdGF0ZSk7XG4gICAgdGhpcy5yZW5kZXJQYW5lbChzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBwYW5lbFxuICAgKi9cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICogQHBhcmFtIHtib29sZWFufSBleHBhbmRlZFxuICAgKi9cbiAgcmVuZGVyUGFuZWwoe3RpdGxlID0gJycsIHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGl0bGUuY2xhc3NOYW1lICs9IFwicGFuZWwtaGVhZGVyIGljb24taHViLWljb25cIjtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWApO1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3BhbmVsLWNoYW5nZScsIHRoaXMsIHRoaXMudGl0bGUpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYm9keS5jbGFzc05hbWUgKz0gXCJwYW5lbC1ib2R5XCI7XG4gICAgdGhpcy5ib2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLmJvZHkuaWQgPSBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSBgcGFuZWwgaDVwLXNlY3Rpb24tJHtzZWN0aW9uSWR9YDtcbiAgICBpZihleHBhbmRlZCl7XG4gICAgICB0aGlzLnBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICB9XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuYm9keSk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSArPSBgaDVwIGg1cC1odWJgO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZSB0aGUgcGFuZWwgYXR0cmliaXV0ZXMgZnJvbSBoNXAtc2RrLCBlLmcuIG9wZW5pbmcgYW5kIGNsb3NpbmdcbiAgICogVGhpcyBpcyBvbmx5IGNhbGxlZCBvbmNlIG5vIGVycm9ycyBoYXZlIG9jY3VyZWQgaW4gbG9hZGluZyB0aGUgaHViXG4gICAqL1xuICBpbml0aWFsaXplUGFuZWwoKXtcbiAgICBpbml0UGFuZWwodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGlmIHBhbmVsIGlzIG9wZW4sIHRoaXMgaXMgdXNlZCBmb3Igb3V0ZXIgYm9yZGVyIGNvbG9yXG4gICAqL1xuICB0b2dnbGVQYW5lbE9wZW4oKSB7XG4gICAgaWYoaXNPcGVuKHRoaXMucGFuZWwpKSB7XG4gICAgICB0aGlzLnBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgnb3BlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSB0YWIgcGFuZWxcbiAgICovXG4gIHJlbmRlclRhYlBhbmVsKHN0YXRlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFibGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy50YWJsaXN0LmNsYXNzTmFtZSArPSBcInRhYmxpc3RcIjtcbiAgICB0aGlzLnRhYmxpc3Quc2V0QXR0cmlidXRlICgncm9sZScsICd0YWJsaXN0Jyk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy50YWJsaXN0KTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuY2xhc3NOYW1lICs9ICd0YWItcGFuZWwnO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRhYkxpc3RXcmFwcGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgdGFiXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkXG4gICAqL1xuICBhZGRUYWIoe3RpdGxlLCBpZCwgY29udGVudCwgc2VsZWN0ZWQgPSBmYWxzZX0pIHtcbiAgICBjb25zdCB0YWJJZCA9IGB0YWItJHtpZH1gO1xuICAgIGNvbnN0IHRhYlBhbmVsSWQgPSBgdGFiLXBhbmVsLSR7aWR9YDtcblxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdGFiLmNsYXNzTmFtZSArPSAndGFiJztcbiAgICB0YWIuaWQgPSB0YWJJZDtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgdGFiUGFuZWxJZCk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHNlbGVjdGVkLnRvU3RyaW5nKCkpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0RBVEFfSUQsIGlkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYicpO1xuICAgIHRhYi5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygndGFiLWNoYW5nZScsIHRoaXMsIHRhYik7XG5cbiAgICBjb25zdCB0YWJQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRhYlBhbmVsLmlkID0gdGFiUGFuZWxJZDtcbiAgICB0YWJQYW5lbC5jbGFzc05hbWUgKz0gJ3RhYnBhbmVsJztcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFibGxlZGJ5JywgdGFiSWQpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIXNlbGVjdGVkKS50b1N0cmluZygpKTtcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcbiAgICB0YWJQYW5lbC5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZCh0YWIpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0YWJQYW5lbCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBhbmltYXRlZCBib3JkZXIgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFiXG4gICAqL1xuICBhZGRCb3R0b21Cb3JkZXIoKSB7XG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSk7XG4gIH1cblxuICBpbml0VGFiUGFuZWwoKSB7XG4gICAgaW5pdFRhYlBhbmVsKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VjdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldFNlY3Rpb25UeXBlKHtpZH0pIHtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSA9IGBoNXAtc2VjdGlvbi0ke2lkfSBwYW5lbGA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsImltcG9ydCB7Y3VycnksIG1hcCwgZmlsdGVyfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiXG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSBcIi4uL2h1Yi1zZXJ2aWNlc1wiO1xuaW1wb3J0IGx1bnIgZnJvbSBcImx1bnJcIlxuXG4vKipcbiAqIEBjbGFzc1xuICogVGhlIFNlYXJjaCBTZXJ2aWNlIGdldHMgYSBjb250ZW50IHR5cGVzIGZyb20gSHViU2VydmljZXNcbiAqIHRoZW4gaW5kZXhlcyB0aGVtIHVzaW5nIGx1bnJqcy4gSXQgdGhlbiBzZWFyY2hlcyB0aHJvdWdoXG4gKiB0aGUgbHVucmpzIGluZGV4IGFuZCByZXR1cm5zIGNvbnRlbnQgdHlwZXMgdGhhdCBtYXRjaCB0aGUgcXVlcnkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS5hcGlSb290VXJsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gU2V0IHVwIGx1bnIgaW5kZXhcbiAgICB0aGlzLmluZGV4ID0gbHVucihmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZmllbGQoJ3RpdGxlJywge2Jvb3N0OiAxMH0pOyAvLyBDZXJ0YWluIGZpZWxkcyBjYW4gZ2l2ZW4gYSBoaWdoZXIgaW1wb3J0YW5jZVxuICAgICAgdGhpcy5maWVsZCgnc3VtbWFyeScpO1xuICAgICAgdGhpcy5maWVsZCgnZGVzY3JpcHRpb24nKTtcbiAgICAgIHRoaXMuZmllbGQoJ2tleXdvcmRzJyk7XG4gICAgICB0aGlzLnJlZignaWQnKTsgLy9cbiAgICB9KTtcblxuICAgIC8vIEFkZCBjb250ZW50IHR5cGVzIHRvIHRoZSBzZWFyY2ggaW5kZXhcbiAgICB0aGlzLmNvbnRlbnRUeXBlcyA9IHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKClcbiAgICAgIC50aGVuKG1hcChhZGRUb0luZGV4KHRoaXMuaW5kZXgpKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBzZWFyY2hcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXT59IEEgcHJvbWlzZSBvZiBhbiBhcnJheSBvZiBjb250ZW50IHR5cGVzXG4gICAqL1xuICBzZWFyY2gocXVlcnkpIHtcbiAgICAvLyBEaXNwbGF5IGFsbCBjb250ZW50IHR5cGVzIGJ5IGRlZmF1bHRcbiAgICBpZiAocXVlcnkgPT09ICcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250ZW50VHlwZXM7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlLCBmaWx0ZXIgY29udGVudCB0eXBlcyBieSBhIHF1ZXJ5XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFR5cGVzLnRoZW4oY29udGVudFR5cGVzID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmluZGV4LnNlYXJjaChxdWVyeSlcbiAgICAgICAgLm1hcChyZXN1bHQgPT4gcmVzdWx0LnJlZilcbiAgICAgICAgLm1hcChmaW5kQ29udGVudFR5cGVCeU1hY2hpbmVOYW1lKGNvbnRlbnRUeXBlcykpXG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGEgY29udGVudCB0eXBlIHRvIHRoZSBsdW5yanMgc2VhcmNoIGluZGV4XG4gKiBjcmVhdGVzIGFuIGlkIGZvciB0aGUgaW5kZXggdXNpbmcgdGhlIG1hY2hpbmUgbmFtZVxuICogb2YgdGhlIGNvbnRlbnQgdHlwZS5cbiAqXG4gKiBAcGFyYW0gIHtsdW5yLkluZGV4fSBpbmRleFxuICogQHBhcmFtICB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gKlxuICogQHJldHVybiB7Q29udGVudFR5cGV9XG4gKi9cbmNvbnN0IGFkZFRvSW5kZXggPSBjdXJyeSgoaW5kZXgsIGNvbnRlbnRUeXBlKSA9PiB7XG4gIGluZGV4LmFkZCh7XG4gICAgdGl0bGU6IGNvbnRlbnRUeXBlLnRpdGxlLFxuICAgIHN1bW1hcnk6IGNvbnRlbnRUeXBlLnN1bW1hcnksXG4gICAgZGVzY3JpcHRpb246IGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uLFxuICAgIGtleXdvcmRzOiBjb250ZW50VHlwZS5rZXl3b3JkcyxcbiAgICBpZDogY29udGVudFR5cGUubWFjaGluZU5hbWVcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbnRlbnRUeXBlO1xufSk7XG5cbi8qKlxuICogaGVscGVyIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtICB7Q29udGVudFR5cGVbXX1cbiAqIEBwYXJhbSAge3N0cmluZ30gbWFjaGluZU5hbWVcbiAqIEByZXR1cm4ge0NvbnRlbnRUeXBlfVxuICovXG5jb25zdCBmaW5kQ29udGVudFR5cGVCeU1hY2hpbmVOYW1lID0gY3VycnkoZnVuY3Rpb24oY29udGVudFR5cGVzLCBtYWNoaW5lTmFtZSkge1xuICByZXR1cm4gY29udGVudFR5cGVzLmZpbHRlcihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSA9PT0gbWFjaGluZU5hbWUpWzBdO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIi8qKlxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xuICBnZXRFbGVtZW50KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiVE9ETyBVcGxvYWRcIjtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwicmVxdWlyZSgnLi4vLi4vc3JjL3N0eWxlcy9tYWluLnNjc3MnKTtcblxuLy8gTG9hZCBsaWJyYXJ5XG5INVAgPSBINVAgfHwge307XG5INVAuSHViQ2xpZW50ID0gcmVxdWlyZSgnLi4vc2NyaXB0cy9odWInKS5kZWZhdWx0O1xuSDVQLkh1YkNsaWVudC5yZW5kZXJFcnJvck1lc3NhZ2UgPSByZXF1aXJlKCcuLi9zY3JpcHRzL3V0aWxzL2Vycm9ycycpLmRlZmF1bHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==