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

var _hubView = __webpack_require__(16);

var _hubView2 = _interopRequireDefault(_hubView);

var _contentTypeSection = __webpack_require__(15);

var _contentTypeSection2 = _interopRequireDefault(_contentTypeSection);

var _uploadSection = __webpack_require__(18);

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
/* 12 */
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

var _contentTypePlaceholder = __webpack_require__(26);

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

    console.log('place', _contentTypePlaceholder2.default);

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

      var title = contentType.title || contentType.machineName;
      var description = contentType.summary || 'asd';

      var image = contentType.icon || _contentTypePlaceholder2.default;

      // create html
      element.innerHTML = "\n      <img class=\"img-responsive\" src=\"" + image + "\">\n      <span class=\"button " + button.cls + "\" data-id=\"" + contentType.machineName + "\">" + button.text + "</span>\n      <h4>" + title + "</h4>\n      <div class=\"description\">" + description + "</div>\n   ";

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
/* 14 */
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
      inputField.id = "search-bar";
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
      inputButton.onclick = function () {
        this.parentElement.querySelector('#search-bar').focus();
      };

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
        setTimeout(function () {
          document.querySelector('#search-bar').focus();
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functional = __webpack_require__(0);

var _hubServices = __webpack_require__(4);

var _hubServices2 = _interopRequireDefault(_hubServices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
   * @param {object} state
   * @param {string} state.apiRootUrl
   */
  function SearchService(state) {
    _classCallCheck(this, SearchService);

    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

    // Add content types to the search index
    this.contentTypes = this.services.contentTypes();
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
      return this.contentTypes.then(filterByQuery(query));
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
  // Sort alphabetically upon initialization
  if (query == '') {
    return contentTypes.sort(function (a, b) {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
  }

  return contentTypes.map(function (contentType) {
    // Append a search score to each content type
    var result = {
      contentType: contentType,
      score: getSearchScore(query, contentType)
    };
    return result;
  }).filter(function (result) {
    return result.score > 0;
  }) // Only show hits
  .sort(function (a, b) {
    return b.score - a.score;
  }) // Sort by relevance
  .map(function (result) {
    return result.contentType;
  }); // Unwrap result object
});

/**
 * Calculates weighting for different search terms based
 * on existence of substrings
 *
 * @param  {string} query
 * @param  {Object} contentType
 * @return {int}
 */
var getSearchScore = function getSearchScore(query, contentType) {
  var score = 0;
  if (hasSubString(query, contentType.title)) {
    score += 100;
  }
  if (hasSubString(query, contentType.summary)) {
    score += 5;
  }
  if (hasSubString(query, contentType.description)) {
    score += 5;
  }
  if (arrayHasSubString(query, contentType.keywords)) {
    score += 5;
  }
  return score;
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
  if (arr === undefined) {
    return false;
  }

  return arr.some(function (string) {
    return hasSubString(subString, string);
  });
};

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


__webpack_require__(8);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(7).default;
H5P.HubClient.renderErrorMessage = __webpack_require__(3).default;

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjI1Ij4NCiAgPGRlZnM+DQogICAgPHN0eWxlPg0KICAgICAgLmNscy0xIHsNCiAgICAgICAgZmlsbDogbm9uZTsNCiAgICAgIH0NCg0KICAgICAgLmNscy0yIHsNCiAgICAgICAgZmlsbDogI2M2YzZjNzsNCiAgICAgIH0NCg0KICAgICAgLmNscy0zIHsNCiAgICAgICAgZmlsbDogI2ZmZjsNCiAgICAgIH0NCiAgICA8L3N0eWxlPg0KICA8L2RlZnM+DQogIDx0aXRsZT5jb250ZW50IHR5cGUgcGxhY2Vob2xkZXJfMTwvdGl0bGU+DQogIDxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPg0KICAgIDxnIGlkPSJjb250ZW50X3R5cGVfcGxhY2Vob2xkZXIiIGRhdGEtbmFtZT0iY29udGVudCB0eXBlIHBsYWNlaG9sZGVyIj4NCiAgICAgIDxyZWN0IGNsYXNzPSJjbHMtMSIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMjUiLz4NCiAgICAgIDxnPg0KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yODksNzRBMjYuNTEsMjYuNTEsMCwwLDAsMjYyLjQ5LDQ3LjVoLTExOEEyNi41MSwyNi41MSwwLDAsMCwxMTgsNzR2NzVhMjYuNTEsMjYuNTEsMCwwLDAsMjYuNTEsMjYuNTFoMTE4QTI2LjUxLDI2LjUxLDAsMCwwLDI4OSwxNDlabS0xNSw2MS44MWEyNS42NywyNS42NywwLDAsMS0yNS42NywyNS42N0gxNTguNjdBMjUuNjcsMjUuNjcsMCwwLDEsMTMzLDEzNS44M1YxMDEuMTdBMjUuNjcsMjUuNjcsMCwwLDEsMTU4LjY3LDc1LjVoODkuNjVBMjUuNjcsMjUuNjcsMCwwLDEsMjc0LDEwMS4xN1oiLz4NCiAgICAgICAgPHJlY3QgY2xhc3M9ImNscy0zIiB4PSIxMzMiIHk9Ijc1LjUiIHdpZHRoPSIxNDEiIGhlaWdodD0iODYiIHJ4PSIyNS42NyIgcnk9IjI1LjY3Ii8+DQogICAgICA8L2c+DQogICAgICA8Y2lyY2xlIGNsYXNzPSJjbHMtMyIgY3g9IjE0NS40OCIgY3k9IjYyLjEzIiByPSIzLjU5Ii8+DQogICAgICA8Y2lyY2xlIGNsYXNzPSJjbHMtMyIgY3g9IjE1Ni41NCIgY3k9IjYyLjEzIiByPSIzLjU5Ii8+DQogICAgICA8Y2lyY2xlIGNsYXNzPSJjbHMtMyIgY3g9IjE2Ny40NSIgY3k9IjYyLjEzIiByPSIzLjU5Ii8+DQogICAgICA8ZyBpZD0iX0dyb3VwXyIgZGF0YS1uYW1lPSImbHQ7R3JvdXAmZ3Q7Ij4NCiAgICAgICAgPGcgaWQ9Il9Hcm91cF8yIiBkYXRhLW5hbWU9IiZsdDtHcm91cCZndDsiPg0KICAgICAgICAgIDxwYXRoIGlkPSJfQ29tcG91bmRfUGF0aF8iIGRhdGEtbmFtZT0iJmx0O0NvbXBvdW5kIFBhdGgmZ3Q7IiBjbGFzcz0iY2xzLTIiIGQ9Ik0yNDIuNjEsMTAxLjkzYy0yLTEuOTUtNS4xLTIuNDMtOS4xOS0yLjQzSDIyMnY2SDIwMy4xNGwtMS4zNCw2YTIxLjM4LDIxLjM4LDAsMCwxLDMuODItMS4xMiwxMy42MSwxMy42MSwwLDAsMSwzLjI4LS4xMywxMi4yOCwxMi4yOCwwLDAsMSw4LjksMy4zNywxMS4yMiwxMS4yMiwwLDAsMSwzLjQyLDguMzgsMTQuMjMsMTQuMjMsMCwwLDEtMS43Niw2LjgyLDEyLjgyLDEyLjgyLDAsMCwxLTUsNS4zNWMtLjc3LjQxLS43LDEuMzctMi41NSwxLjM3SDIyNXYtMTRoNy4xN2M0LjU1LDAsNy45NC0xLDEwLjE2LTMuMWExMC43MiwxMC43MiwwLDAsMCwzLjMzLTguNDFDMjQ1LjY2LDEwNi40LDI0NC42NSwxMDMuODgsMjQyLjYxLDEwMS45M1ptLTkuMjYsMTAuNzRjLS44OC43Ni0yLjQxLjgzLTQuNTkuODNIMjI1di04aDQuMjFhNS45LDUuOSwwLDAsMSw0LjMxLDEuNDMsNCw0LDAsMCwxLDEuMTUsMi44OEEzLjU4LDMuNTgsMCwwLDEsMjMzLjM1LDExMi42N1oiLz4NCiAgICAgICAgICA8cGF0aCBpZD0iX1BhdGhfIiBkYXRhLW5hbWU9IiZsdDtQYXRoJmd0OyIgY2xhc3M9ImNscy0yIiBkPSJNMjA1LjI1LDExNi44N2E1LDUsMCwwLDAtNC41LDIuOGwtOS44OS0uODksNC40Ny0xOS4yN0gxODd2MTRIMTc1di0xNEgxNjV2MzZoMTB2LTE0aDEydjE0aDEyLjkyYy0yLjY4LDAtMy4xMi0xLjQ4LTQuMzEtMi4zN2ExMi44NSwxMi44NSwwLDAsMS0yLjkzLTMuMjYsMTUuNTYsMTUuNTYsMCwwLDEtMS44NC00LjIybDkuOS0xLjQ2YTUsNSwwLDEsMCw0LjQ5LTcuMzJaIi8+DQogICAgICAgIDwvZz4NCiAgICAgIDwvZz4NCiAgICAgIDxyZWN0IGNsYXNzPSJjbHMtMyIgeD0iMTc4LjAxIiB5PSI2MC4wNCIgd2lkdGg9Ijc1LjY1IiBoZWlnaHQ9IjQuNDkiIHJ4PSIyLjE4IiByeT0iMi4xOCIvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+DQo="

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTMyMWQxNDVjMTMzZWE2ODQ0YTAiLCJ3ZWJwYWNrOi8vLy4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uL34vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudHJpZXMvZGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmciXSwibmFtZXMiOlsiY3VycnkiLCJmbiIsImFyaXR5IiwibGVuZ3RoIiwiZjEiLCJhcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJhcmd1bWVudHMiLCJhcHBseSIsImYyIiwiYXJnczIiLCJjb25jYXQiLCJjb21wb3NlIiwiZm5zIiwicmVkdWNlIiwiZiIsImciLCJmb3JFYWNoIiwiYXJyIiwibWFwIiwiZmlsdGVyIiwic29tZSIsImNvbnRhaW5zIiwidmFsdWUiLCJpbmRleE9mIiwid2l0aG91dCIsInZhbHVlcyIsImludmVyc2VCb29sZWFuU3RyaW5nIiwiYm9vbCIsInRvU3RyaW5nIiwiRXZlbnRmdWwiLCJsaXN0ZW5lcnMiLCJvbiIsInR5cGUiLCJsaXN0ZW5lciIsInNjb3BlIiwidHJpZ2dlciIsInB1c2giLCJmaXJlIiwiZXZlbnQiLCJ0cmlnZ2VycyIsImV2ZXJ5IiwicHJvcGFnYXRlIiwidHlwZXMiLCJldmVudGZ1bCIsInNlbGYiLCJnZXRBdHRyaWJ1dGUiLCJuYW1lIiwiZWwiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJhdHRyaWJ1dGVFcXVhbHMiLCJ0b2dnbGVBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInBhcmVudCIsImNoaWxkIiwicXVlcnlTZWxlY3RvciIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbmRlckVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJjbG9zZUJ1dHRvbiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsIm1lc3NhZ2VDb250ZW50IiwidGl0bGUiLCJjb250ZW50IiwibWVzc2FnZVdyYXBwZXIiLCJkaXNtaXNzaWJsZSIsImJ1dHRvbiIsInVuZGVmaW5lZCIsIm1lc3NhZ2VCdXR0b24iLCJjb25zb2xlIiwibG9nIiwiSHViU2VydmljZXMiLCJhcGlSb290VXJsIiwid2luZG93IiwiY2FjaGVkQ29udGVudFR5cGVzIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsInRoZW4iLCJyZXN1bHQiLCJqc29uIiwiaXNWYWxpZCIsImxpYnJhcmllcyIsInJlc3BvbnNlIiwibWVzc2FnZUNvZGUiLCJQcm9taXNlIiwicmVqZWN0IiwicmVzb2x2ZSIsIm1hY2hpbmVOYW1lIiwiY29udGVudFR5cGVzIiwiY29udGVudFR5cGUiLCJpZCIsImJvZHkiLCJyZWxheUNsaWNrRXZlbnRBcyIsImVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic3RvcFByb3BhZ2F0aW9uIiwiaW5pdCIsImlzRXhwYW5kZWQiLCJoaWRlIiwic2hvdyIsInRvZ2dsZUJvZHlWaXNpYmlsaXR5IiwiYm9keUVsZW1lbnQiLCJvbkFyaWFFeHBhbmRlZENoYW5nZSIsInRhcmdldCIsInRpdGxlRWwiLCJib2R5SWQiLCJib2R5RWwiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiYXR0cmlidXRlRmlsdGVyIiwiSHViIiwic3RhdGUiLCJjb250ZW50VHlwZVNlY3Rpb24iLCJ1cGxvYWRTZWN0aW9uIiwidmlldyIsInNlcnZpY2VzIiwic2V0UGFuZWxUaXRsZSIsImNsb3NlUGFuZWwiLCJzZXRTZWN0aW9uVHlwZSIsInRvZ2dsZVBhbmVsT3BlbiIsImJpbmQiLCJpbml0aWFsaXplUGFuZWwiLCJpbml0VGFiUGFuZWwiLCJnZXRDb250ZW50VHlwZSIsInNldFRpdGxlIiwidGFiQ29uZmlncyIsImdldEVsZW1lbnQiLCJzZWxlY3RlZCIsImFkZFRhYiIsInRhYkNvbmZpZyIsImFkZEJvdHRvbUJvcmRlciIsImhpZGVBbGwiLCJ1blNlbGVjdEFsbCIsInRhYnMiLCJ0YWJQYW5lbHMiLCJ0YWIiLCJ0YWJQYW5lbElkIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsInRvZ2dsZVZpc2liaWxpdHkiLCJ2aXNpYmxlIiwiaXNFbXB0eSIsInRleHQiLCJDb250ZW50VHlwZURldGFpbFZpZXciLCJiYWNrQnV0dG9uRWxlbWVudCIsImltYWdlIiwiaW1hZ2VXcmFwcGVyRWxlbWVudCIsImF1dGhvciIsImRlc2NyaXB0aW9uIiwiZGVtb0J1dHRvbiIsInRleHREZXRhaWxzIiwiZGV0YWlsc0VsZW1lbnQiLCJ1c2VCdXR0b24iLCJpbnN0YWxsQnV0dG9uIiwiYnV0dG9uQmFyIiwibGljZW5jZVBhbmVsIiwiY3JlYXRlUGFuZWwiLCJwbHVnaW5zUGFuZWwiLCJwdWJsaXNoZXJQYW5lbCIsInBhbmVsR3JvdXBFbGVtZW50IiwiY2Fyb3VzZWwiLCJyb290RWxlbWVudCIsImhlYWRlckVsIiwiYm9keUlubmVyRWwiLCJwYW5lbEVsIiwiaXRlbSIsInVybCIsImFsdCIsInNyYyIsImluc3RhbGxlZCIsIkNvbnRlbnRUeXBlRGV0YWlsIiwiaW5zdGFsbCIsInVwZGF0ZSIsImluc3RhbGxDb250ZW50VHlwZSIsImRlYnVnIiwic2V0SWQiLCJzZXREZXNjcmlwdGlvbiIsInNldEltYWdlIiwiaWNvbiIsInNldEV4YW1wbGUiLCJleGFtcGxlIiwic2V0SXNJbnN0YWxsZWQiLCJzY3JlZW5zaG90cyIsImFkZEltYWdlVG9DYXJvdXNlbCIsIkNvbnRlbnRUeXBlTGlzdFZpZXciLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJyb3ciLCJjcmVhdGVDb250ZW50VHlwZVJvdyIsInVzZUJ1dHRvbkNvbmZpZyIsImNscyIsImluc3RhbGxCdXR0b25Db25maWciLCJzdW1tYXJ5IiwiQ29udGVudFR5cGVMaXN0IiwicmVtb3ZlQWxsUm93cyIsImFkZFJvdyIsIkNvbnRlbnRCcm93c2VyVmlldyIsIm1lbnUiLCJjcmVhdGVNZW51RWxlbWVudCIsImlucHV0R3JvdXAiLCJjcmVhdGVJbnB1dEdyb3VwRWxlbWVudCIsIm1lbnVHcm91cCIsIm1lbnVCYXJFbGVtZW50IiwiY2hpbGRFbGVtZW50Q291bnQiLCJuYXZFbGVtZW50IiwiaW5wdXRGaWVsZCIsInF1ZXJ5IiwiaW5wdXRCdXR0b24iLCJvbmNsaWNrIiwicGFyZW50RWxlbWVudCIsImZvY3VzIiwiQ29udGVudFR5cGVTZWN0aW9uIiwic2VhcmNoU2VydmljZSIsImNvbnRlbnRUeXBlTGlzdCIsImNvbnRlbnRUeXBlRGV0YWlsIiwiYWRkTWVudUl0ZW0iLCJtZW51VGV4dCIsInNlY3Rpb24iLCJjbGFzc0xpc3QiLCJhZGQiLCJzZWFyY2giLCJhcHBseVNlYXJjaEZpbHRlciIsInNob3dEZXRhaWxWaWV3IiwiY2xvc2VEZXRhaWxWaWV3IiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsImNhdGNoIiwiZXJyb3IiLCJsb2FkQnlJZCIsIkFUVFJJQlVURV9EQVRBX0lEIiwiaXNPcGVuIiwiSHViVmlldyIsInJlbmRlclRhYlBhbmVsIiwicmVuZGVyUGFuZWwiLCJzZWN0aW9uSWQiLCJleHBhbmRlZCIsInRhYkNvbnRhaW5lckVsZW1lbnQiLCJwYW5lbCIsInNldFRpbWVvdXQiLCJ0YWJsaXN0IiwidGFiTGlzdFdyYXBwZXIiLCJ0YWJJZCIsInRhYlBhbmVsIiwiU2VhcmNoU2VydmljZSIsImZpbHRlckJ5UXVlcnkiLCJzb3J0IiwiYSIsImIiLCJzY29yZSIsImdldFNlYXJjaFNjb3JlIiwiaGFzU3ViU3RyaW5nIiwiYXJyYXlIYXNTdWJTdHJpbmciLCJrZXl3b3JkcyIsIm5lZWRsZSIsImhheXN0YWNrIiwidG9Mb3dlckNhc2UiLCJzdWJTdHJpbmciLCJzdHJpbmciLCJVcGxvYWRTZWN0aW9uIiwicmVxdWlyZSIsIkg1UCIsIkh1YkNsaWVudCIsImRlZmF1bHQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBOzs7Ozs7Ozs7QUFTTyxJQUFNQSx3QkFBUSxTQUFSQSxLQUFRLENBQVNDLEVBQVQsRUFBYTtBQUNoQyxNQUFNQyxRQUFRRCxHQUFHRSxNQUFqQjs7QUFFQSxTQUFPLFNBQVNDLEVBQVQsR0FBYztBQUNuQixRQUFNQyxPQUFPQyxNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJDLFNBQTNCLEVBQXNDLENBQXRDLENBQWI7QUFDQSxRQUFJTCxLQUFLRixNQUFMLElBQWVELEtBQW5CLEVBQTBCO0FBQ3hCLGFBQU9ELEdBQUdVLEtBQUgsQ0FBUyxJQUFULEVBQWVOLElBQWYsQ0FBUDtBQUNELEtBRkQsTUFHSztBQUNILGFBQU8sU0FBU08sRUFBVCxHQUFjO0FBQ25CLFlBQU1DLFFBQVFQLE1BQU1DLFNBQU4sQ0FBZ0JDLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQkMsU0FBM0IsRUFBc0MsQ0FBdEMsQ0FBZDtBQUNBLGVBQU9OLEdBQUdPLEtBQUgsQ0FBUyxJ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QXhCLENBQVY7QUFBQSxHQUFULENBQVA7QUFDRCxDQU5ELEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkhBOzs7SUFHcUJDLGE7Ozs7Ozs7aUNBQ047QUFDWCxVQUFNdEssVUFBVXJDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQW9DLGNBQVFsQyxTQUFSLEdBQW9CLGFBQXBCO0FBQ0EsYUFBT2tDLE9BQVA7QUFDRDs7Ozs7O2tCQUxrQnNLLGE7Ozs7Ozs7OztBQ0hyQixtQkFBQUMsQ0FBUSxDQUFSOztBQUVBO0FBQ0FDLE1BQU1BLE9BQU8sRUFBYjtBQUNBQSxJQUFJQyxTQUFKLEdBQWdCLG1CQUFBRixDQUFRLENBQVIsRUFBMEJHLE9BQTFDO0FBQ0FGLElBQUlDLFNBQUosQ0FBY2pOLGtCQUFkLEdBQW1DLG1CQUFBK00sQ0FBUSxDQUFSLEVBQW1DRyxPQUF0RSxDOzs7Ozs7Ozs7Ozs7QUNMQSxxQ0FBcUMsbzRGIiwiZmlsZSI6Img1cC1odWItY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGUzMjFkMTQ1YzEzM2VhNjg0NGEwIiwiLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICpcbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGN1cnJ5ID0gZnVuY3Rpb24oZm4pIHtcbiAgY29uc3QgYXJpdHkgPSBmbi5sZW5ndGg7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKCkge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+PSBhcml0eSkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBmMigpIHtcbiAgICAgICAgY29uc3QgYXJnczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICByZXR1cm4gZjEuYXBwbHkobnVsbCwgYXJncy5jb25jYXQoYXJnczIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIENvbXBvc2UgZnVuY3Rpb25zIHRvZ2V0aGVyLCBleGVjdXRpbmcgZnJvbSByaWdodCB0byBsZWZ0XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbi4uLn0gZm5zXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKC4uLmZucykgPT4gZm5zLnJlZHVjZSgoZiwgZykgPT4gKC4uLmFyZ3MpID0+IGYoZyguLi5hcmdzKSkpO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JFYWNoID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgYXJyLmZvckVhY2goZm4pO1xufSk7XG5cbi8qKlxuICogTWFwcyBhIGZ1bmN0aW9uIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgbWFwID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5tYXAoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZpbHRlciB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBzb21lIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgc29tZSA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuc29tZShmbik7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgYSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSBjdXJyeShmdW5jdGlvbiAodmFsdWUsIGFycikge1xuICByZXR1cm4gYXJyLmluZGV4T2YodmFsdWUpICE9IC0xO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSBzdXBwbGllZCB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgd2l0aG91dCA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZXMsIGFycikge1xuICByZXR1cm4gZmlsdGVyKHZhbHVlID0+ICFjb250YWlucyh2YWx1ZSwgdmFsdWVzKSwgYXJyKVxufSk7XG5cbi8qKlxuICogVGFrZXMgYSBzdHJpbmcgdGhhdCBpcyBlaXRoZXIgJ3RydWUnIG9yICdmYWxzZScgYW5kIHJldHVybnMgdGhlIG9wcG9zaXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJvb2xcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBpbnZlcnNlQm9vbGVhblN0cmluZyA9IGZ1bmN0aW9uIChib29sKSB7XG4gIHJldHVybiAoYm9vbCAhPT0gJ3RydWUnKS50b1N0cmluZygpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZnVuY3Rpb25hbC5qcyIsIi8qKlxuICogQG1peGluXG4gKi9cbmV4cG9ydCBjb25zdCBFdmVudGZ1bCA9ICgpID0+ICh7XG4gIGxpc3RlbmVyczoge30sXG5cbiAgLyoqXG4gICAqIExpc3RlbiB0byBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Njb3BlXVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7RXZlbnRmdWx9XG4gICAqL1xuICBvbjogZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gVHJpZ2dlclxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNjb3BlXG4gICAgICovXG4gICAgY29uc3QgdHJpZ2dlciA9IHtcbiAgICAgICdsaXN0ZW5lcic6IGxpc3RlbmVyLFxuICAgICAgJ3Njb3BlJzogc2NvcGVcbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKHRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpcmUgZXZlbnQuIElmIGFueSBvZiB0aGUgbGlzdGVuZXJzIHJldHVybnMgZmFsc2UsIHJldHVybiBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2V2ZW50XVxuICAgKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGZpcmU6IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KSB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXSB8fCBbXTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5ldmVyeShmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5saXN0ZW5lci5jYWxsKHRyaWdnZXIuc2NvcGUgfHwgdGhpcywgZXZlbnQpICE9PSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogTGlzdGVucyBmb3IgZXZlbnRzIG9uIGFub3RoZXIgRXZlbnRmdWwsIGFuZCBwcm9wYWdhdGUgaXQgdHJvdWdoIHRoaXMgRXZlbnRmdWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gdHlwZXNcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAgICovXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24odHlwZXMsIGV2ZW50ZnVsKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiBldmVudGZ1bC5vbih0eXBlLCBldmVudCA9PiBzZWxmLmZpcmUodHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL21peGlucy9ldmVudGZ1bC5qcyIsImltcG9ydCB7Y3VycnksIGludmVyc2VCb29sZWFuU3RyaW5nfSBmcm9tICcuL2Z1bmN0aW9uYWwnXG5cbi8qKlxuICogR2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmcm9tIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpO1xufSk7XG5cbi8qKlxuICogU2V0IGFuIGF0dHJpYnV0ZSBvbiBhIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGVsKSB7XG4gIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG59KTtcblxuLyoqXG4gKiBSZW1vdmUgYXR0cmlidXRlIGZyb20gaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVBdHRyaWJ1dGUgPSBjdXJyeShmdW5jdGlvbiAobmFtZSwgZWwpIHtcbiAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xufSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaGFzQXR0cmlidXRlID0gY3VycnkoZnVuY3Rpb24gKG5hbWUsIGVsKSB7XG4gIHJldHVybiBlbC5oYXNBdHRyaWJ1dGUobmFtZSk7XG59KTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGUgdGhhdCBlcXVhbHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUVxdWFscyA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZWwpIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWU7XG59KTtcblxuLyoqXG4gKiBUb2dnbGVzIGFuIGF0dHJpYnV0ZSBiZXR3ZWVuICd0cnVlJyBhbmQgJ2ZhbHNlJztcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUF0dHJpYnV0ZSA9IGN1cnJ5KGZ1bmN0aW9uIChuYW1lLCBlbCkge1xuICBjb25zdCB2YWx1ZSA9IGdldEF0dHJpYnV0ZShuYW1lLCBlbCk7XG4gIHNldEF0dHJpYnV0ZShuYW1lLCBpbnZlcnNlQm9vbGVhblN0cmluZyh2YWx1ZSksIGVsKTtcbn0pO1xuXG4vKipcbiAqIFRoZSBhcHBlbmRDaGlsZCgpIG1ldGhvZCBhZGRzIGEgbm9kZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0IG9mIGNoaWxkcmVuIG9mIGEgc3BlY2lmaWVkIHBhcmVudCBub2RlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgYXBwZW5kQ2hpbGQgPSBjdXJyeShmdW5jdGlvbiAocGFyZW50LCBjaGlsZCkge1xuICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyBhIGRlc2NlbmRhbnQgb2YgdGhlIGVsZW1lbnQgb24gd2hpY2ggaXQgaXMgaW52b2tlZFxuICogdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2Ygc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvciA9IGN1cnJ5KGZ1bmN0aW9uIChzZWxlY3RvciwgZWwpIHtcbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5vbi1saXZlIE5vZGVMaXN0IG9mIGFsbCBlbGVtZW50cyBkZXNjZW5kZWQgZnJvbSB0aGUgZWxlbWVudCBvbiB3aGljaCBpdFxuICogaXMgaW52b2tlZCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBDU1Mgc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge05vZGVMaXN0fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvckFsbCA9IGN1cnJ5KGZ1bmN0aW9uIChzZWxlY3RvciwgZWwpIHtcbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2VsZW1lbnRzLmpzIiwiLyoqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLnR5cGUgICAgICAgICB0eXBlIG9mIHRoZSBtZXNzYWdlOiBpbmZvLCBzdWNjZXNzLCBlcnJvclxuICogQHBhcmFtICB7Ym9vbGVhbn0gIGNvbmZpZy5kaXNtaXNzaWJsZSAgd2hldGhlciB0aGUgbWVzc2FnZSBjYW4gYmUgZGlzbWlzc2VkXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLmNvbnRlbnQgICAgICBtZXNzYWdlIGNvbnRlbnQgdXN1YWxseSBhICdoMycgYW5kIGEgJ3AnXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gZGl2IGNvbnRhaW5pbmcgdGhlIG1lc3NhZ2UgZWxlbWVudFxuICovXG5cbi8vVE9ETyBoYW5kbGUgc3RyaW5ncywgaHRtbCwgYmFkbHkgZm9ybWVkIG9iamVjdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyRXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XG4gIGNsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmI3gyNzE1JztcblxuICBjb25zdCBtZXNzYWdlQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtZXNzYWdlQ29udGVudC5jbGFzc05hbWUgPSAnbWVzc2FnZS1jb250ZW50JztcbiAgbWVzc2FnZUNvbnRlbnQuaW5uZXJIVE1MID0gJzxoMT4nICsgbWVzc2FnZS50aXRsZSArICc8L2gxPicgKyAnPHA+JyArIG1lc3NhZ2UuY29udGVudCArICc8L3A+JztcblxuICBjb25zdCBtZXNzYWdlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBtZXNzYWdlV3JhcHBlci5jbGFzc05hbWUgPSAnbWVzc2FnZScgKyAnICcgKyBgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUNvbnRlbnQpO1xuXG4gIGlmIChtZXNzYWdlLmJ1dHRvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbWVzc2FnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG1lc3NhZ2VCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbic7XG4gICAgbWVzc2FnZUJ1dHRvbi5pbm5lckhUTUwgPSBtZXNzYWdlLmJ1dHRvbjtcbiAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQnV0dG9uKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKG1lc3NhZ2VXcmFwcGVyKTtcbiAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gQ29udGVudFR5cGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGNoVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN1bW1hcnlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjcmVhdGVkQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVkX0F0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaXNSZWNvbW1lbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBvcHVsYXJpdHlcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHNjcmVlbnNob3RzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGljZW5zZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV4YW1wbGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0dXRvcmlhbFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0ga2V5d29yZHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvd25lclxuICogQHByb3BlcnR5IHtib29sZWFufSBpbnN0YWxsZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVzdHJpY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBhcGlSb290VXJsIH0pIHtcbiAgICB0aGlzLmFwaVJvb3RVcmwgPSBhcGlSb290VXJsO1xuXG4gICAgaWYoIXdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMpe1xuICAgICAgLy8gVE9ETyByZW1vdmUgdGhpcyB3aGVuIGRvbmUgdGVzdGluZyBmb3IgZXJyb3JzXG4gICAgICAvLyB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWVycm9ycy9OT19SRVNQT05TRS5qc29uYCwge1xuXG4gICAgICB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnQtdHlwZS1jYWNoZWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxuICAgICAgLnRoZW4odGhpcy5pc1ZhbGlkKVxuICAgICAgLnRoZW4oanNvbiA9PiBqc29uLmxpYnJhcmllcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSAge0NvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cbiAgICovXG4gIGlzVmFsaWQocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT59XG4gICAqL1xuICBjb250ZW50VHlwZXMoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcy50aGVuKGNvbnRlbnRUeXBlcyA9PiB7XG4gICAgICByZXR1cm4gY29udGVudFR5cGVzLmZpbHRlcihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSA9PT0gbWFjaGluZU5hbWUpWzBdO1xuICAgIH0pO1xuXG4gICAgLypyZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnRfdHlwZV9jYWNoZS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7Ki9cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YWxscyBhIGNvbnRlbnQgdHlwZSBvbiB0aGUgc2VydmVyXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBpbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktaW5zdGFsbD9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6ICcnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi1zZXJ2aWNlcy5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcblxuZXhwb3J0IGNvbnN0IHJlbGF5Q2xpY2tFdmVudEFzID0gY3VycnkoZnVuY3Rpb24odHlwZSwgZXZlbnRmdWwsIGVsZW1lbnQpIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBldmVudGZ1bC5maXJlKHR5cGUsIHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBpZDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIGRvbid0IGJ1YmJsZVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICByZXR1cm4gZWxlbWVudDtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2V2ZW50cy5qcyIsImltcG9ydCB7c2V0QXR0cmlidXRlLCBhdHRyaWJ1dGVFcXVhbHMsIHRvZ2dsZUF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtjdXJyeSwgZm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBpc0V4cGFuZGVkID0gYXR0cmlidXRlRXF1YWxzKFwiYXJpYS1leHBhbmRlZFwiLCAndHJ1ZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSBib2R5IHZpc2liaWxpdHlcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBib2R5RWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBpc0V4cGFuZGVkXG4gKi9cbmNvbnN0IHRvZ2dsZUJvZHlWaXNpYmlsaXR5ID0gZnVuY3Rpb24oYm9keUVsZW1lbnQsIGlzRXhwYW5kZWQpIHtcbiAgaWYoIWlzRXhwYW5kZWQpIHtcbiAgICBoaWRlKGJvZHlFbGVtZW50KTtcbiAgICAvL2JvZHlFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMFwiO1xuICB9XG4gIGVsc2UgLyppZihib2R5RWxlbWVudC5zY3JvbGxIZWlnaHQgPiAwKSovIHtcbiAgICBzaG93KGJvZHlFbGVtZW50KTtcbiAgICAvL2JvZHlFbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke2JvZHlFbGVtZW50LnNjcm9sbEhlaWdodH1weGA7XG4gIH1cbn07XG5cbi8qKlxuICogSGFuZGxlcyBjaGFuZ2VzIHRvIGFyaWEtZXhwYW5kZWRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBib2R5RWxlbWVudFxuICogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gZXZlbnRcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgb25BcmlhRXhwYW5kZWRDaGFuZ2UgPSBjdXJyeShmdW5jdGlvbihib2R5RWxlbWVudCwgZXZlbnQpIHtcbiAgdG9nZ2xlQm9keVZpc2liaWxpdHkoYm9keUVsZW1lbnQsIGlzRXhwYW5kZWQoZXZlbnQudGFyZ2V0KSk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0aXRsZUVsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1leHBhbmRlZF0nKTtcbiAgY29uc3QgYm9keUlkID0gdGl0bGVFbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgY29uc3QgYm9keUVsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2R5SWR9YCk7XG5cbiAgaWYodGl0bGVFbCkge1xuICAgIC8vIHNldCBvYnNlcnZlciBvbiB0aXRsZSBmb3IgYXJpYS1leHBhbmRlZFxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZvckVhY2gob25BcmlhRXhwYW5kZWRDaGFuZ2UoYm9keUVsKSkpO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0aXRsZUVsLCB7XG4gICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcImFyaWEtZXhwYW5kZWRcIl1cbiAgICB9KTtcblxuICAgIC8vIFNldCBjbGljayBsaXN0ZW5lciB0aGF0IHRvZ2dsZXMgYXJpYS1leHBhbmRlZFxuICAgIHRpdGxlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgdG9nZ2xlQXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBldmVudC50YXJnZXQpO1xuICAgIH0pO1xuXG4gICAgdG9nZ2xlQm9keVZpc2liaWxpdHkoYm9keUVsLCBpc0V4cGFuZGVkKHRpdGxlRWwpKTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3BhbmVsLmpzIiwiaW1wb3J0IEh1YlZpZXcgZnJvbSAnLi9odWItdmlldyc7XG5pbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uIGZyb20gJy4vY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24nO1xuaW1wb3J0IFVwbG9hZFNlY3Rpb24gZnJvbSAnLi91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbic7XG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSAnLi9odWItc2VydmljZXMnO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi91dGlscy9lcnJvcnMnO1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBIdWJTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRpdGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbklkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGV4cGFuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYXBpUm9vdFVybFxuICovXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEVycm9yTWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlcnJvckNvZGVcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBTZWxlY3RlZEVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpZFxuICovXG4vKipcbiAqIFNlbGVjdCBldmVudFxuICogQGV2ZW50IEh1YiNzZWxlY3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogRXJyb3IgZXZlbnRcbiAqIEBldmVudCBIdWIjZXJyb3JcbiAqIEB0eXBlIHtFcnJvck1lc3NhZ2V9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgSHViI2Vycm9yXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNvbnRyb2xsZXJzXG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24gPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uKHN0YXRlKTtcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBwcm9wYWdhdGUgY29udHJvbGxlciBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCcsICdlcnJvciddLCB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbik7XG5cbiAgICAvLyBoYW5kbGUgZXZlbnRzXG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy5zZXRQYW5lbFRpdGxlLCB0aGlzKTtcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnZpZXcuY2xvc2VQYW5lbCwgdGhpcy52aWV3KTtcbiAgICAvLyBvbmx5IGluaXRpYWxpemUgdGhlIG1haW4gcGFuZWwgaWYgbm8gZXJyb3JzIGhhdmUgb2NjdXJlZCB3aGVuIHVwZGF0aW5nIHRoZSBjb250ZW50IHR5cGUgbGlzdFxuICAgIHRoaXMudmlldy5vbigndGFiLWNoYW5nZScsIHRoaXMudmlldy5zZXRTZWN0aW9uVHlwZSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcub24oJ3BhbmVsLWNoYW5nZScsIHRoaXMudmlldy50b2dnbGVQYW5lbE9wZW4uYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uLm9uKCd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnLCB0aGlzLnZpZXcuaW5pdGlhbGl6ZVBhbmVsLmJpbmQodGhpcy52aWV3KSwgdGhpcy52aWV3KTtcblxuICAgIHRoaXMuaW5pdFRhYlBhbmVsKClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwcm9taXNlIG9mIGEgY29udGVudCB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBnZXRDb250ZW50VHlwZShtYWNoaW5lTmFtZSkge1xuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZSBvZiB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRQYW5lbFRpdGxlKHtpZH0pwqB7XG4gICAgdGhpcy5nZXRDb250ZW50VHlwZShpZCkudGhlbigoe3RpdGxlfSkgPT4gdGhpcy52aWV3LnNldFRpdGxlKHRpdGxlKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSB0YWIgcGFuZWxcbiAgICovXG4gIGluaXRUYWJQYW5lbCgpIHtcbiAgICBjb25zdCB0YWJDb25maWdzID0gW3tcbiAgICAgIHRpdGxlOiAnQ3JlYXRlIENvbnRlbnQnLFxuICAgICAgaWQ6ICdjb250ZW50LXR5cGVzJyxcbiAgICAgIGNvbnRlbnQ6IHRoaXMuY29udGVudFR5cGVTZWN0aW9uLmdldEVsZW1lbnQoKSxcbiAgICAgIHNlbGVjdGVkOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1VwbG9hZCcsXG4gICAgICBpZDogJ3VwbG9hZCcsXG4gICAgICBjb250ZW50OiB0aGlzLnVwbG9hZFNlY3Rpb24uZ2V0RWxlbWVudCgpXG4gICAgfV07XG5cbiAgICB0YWJDb25maWdzLmZvckVhY2godGFiQ29uZmlnID0+IHRoaXMudmlldy5hZGRUYWIodGFiQ29uZmlnKSk7XG4gICAgdGhpcy52aWV3LmFkZEJvdHRvbUJvcmRlcigpOyAvLyBBZGRzIGFuIGFuaW1hdGVkIGJvdHRvbSBib3JkZXIgdG8gZWFjaCB0YWJcbiAgICB0aGlzLnZpZXcuaW5pdFRhYlBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IGluIHRoZSB2aWV3XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZXMvbWFpbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7c2V0QXR0cmlidXRlfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2ZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaGlkZUFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJykpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKSk7XG5cbi8qKlxuICogSW5pdGlhdGVzIGEgdGFiIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgY29uc3QgdGFicyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJcIl0nKTtcbiAgY29uc3QgdGFiUGFuZWxzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYnBhbmVsXCJdJyk7XG5cbiAgdGFicy5mb3JFYWNoKHRhYiA9PiB7XG4gICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgIHVuU2VsZWN0QWxsKHRhYnMpO1xuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG5cbiAgICAgIGhpZGVBbGwodGFiUGFuZWxzKTtcblxuICAgICAgbGV0IHRhYlBhbmVsSWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gICAgICBzaG93KGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFiUGFuZWxJZH1gKSk7XG4gICAgfSk7XG4gIH0pXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIjtcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcblxuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCA9ICdkYXRhLWlkJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgaWYgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGVsZW1lbnQsIHZpc2libGUpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBlbXB0eVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbXB0eSA9ICh0ZXh0KSA9PiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSAmJiAodGV4dC5sZW5ndGggPT09IDApO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsVmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBiYWNrIGJ1dHRvblxuICAgIGNvbnN0IGJhY2tCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYmFja0J1dHRvbkVsZW1lbnQuY2xhc3NOYW1lID0gJ2JhY2stYnV0dG9uIGljb24tYXJyb3ctdGhpY2snO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIGJhY2tCdXR0b25FbGVtZW50KTtcblxuICAgIC8vIGltYWdlXG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHRoaXMuaW1hZ2UuY2xhc3NOYW1lID0gJ2ltZy1yZXNwb25zaXZlJztcblxuICAgIGNvbnN0IGltYWdlV3JhcHBlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbWFnZVdyYXBwZXJFbGVtZW50LmNsYXNzTmFtZSA9ICdpbWFnZS13cmFwcGVyJztcbiAgICBpbWFnZVdyYXBwZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuaW1hZ2UpO1xuXG4gICAgLy8gdGl0bGVcbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcblxuICAgIC8vIGF1dGhvclxuICAgIHRoaXMuYXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5hdXRob3IuY2xhc3NOYW1lID0gJ2F1dGhvcic7XG4gICAgdGhpcy5hdXRob3IuaW5uZXJIVE1MID0gJ2J5IEpvdWJlbCc7IC8vIFRPRE8gTWFrZSBkeW5hbWljXG5cbiAgICAvLyBkZXNjcmlwdGlvblxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbi5jbGFzc05hbWUgPSAnc21hbGwnO1xuXG4gICAgLy8gZGVtbyBidXR0b25cbiAgICB0aGlzLmRlbW9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdGhpcy5kZW1vQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24nO1xuICAgIHRoaXMuZGVtb0J1dHRvbi5pbm5lckhUTUwgPSAnQ29udGVudCBEZW1vJztcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG4gICAgaGlkZSh0aGlzLmRlbW9CdXR0b24pO1xuXG4gICAgY29uc3QgdGV4dERldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZXh0RGV0YWlscy5jbGFzc05hbWUgPSAndGV4dC1kZXRhaWxzJztcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICB0ZXh0RGV0YWlscy5hcHBlbmRDaGlsZCh0aGlzLmF1dGhvcik7XG4gICAgdGV4dERldGFpbHMuYXBwZW5kQ2hpbGQodGhpcy5kZXNjcmlwdGlvbik7XG4gICAgdGV4dERldGFpbHMuYXBwZW5kQ2hpbGQodGhpcy5kZW1vQnV0dG9uKTtcblxuICAgIGNvbnN0IGRldGFpbHNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGV0YWlsc0VsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRhaW5lcic7XG4gICAgZGV0YWlsc0VsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VXcmFwcGVyRWxlbWVudCk7XG4gICAgZGV0YWlsc0VsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dERldGFpbHMpO1xuXG4gICAgLy8gdXNlIGJ1dHRvblxuICAgIHRoaXMudXNlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRoaXMudXNlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24gYnV0dG9uLXByaW1hcnknO1xuICAgIHRoaXMudXNlQnV0dG9uLmlubmVySFRNTCA9ICdVc2UnO1xuICAgIGhpZGUodGhpcy51c2VCdXR0b24pO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XG5cbiAgICAvLyBpbnN0YWxsIGJ1dHRvblxuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0aGlzLmluc3RhbGxCdXR0b24uY2xhc3NOYW1lID0gJ2J1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5JztcbiAgICB0aGlzLmluc3RhbGxCdXR0b24uaW5uZXJIVE1MID0gJ0luc3RhbGwnO1xuICAgIGhpZGUodGhpcy5pbnN0YWxsQnV0dG9uKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygnaW5zdGFsbCcsIHRoaXMsIHRoaXMuaW5zdGFsbEJ1dHRvbik7XG5cbiAgICBjb25zdCBidXR0b25CYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBidXR0b25CYXIuY2xhc3NOYW1lID0gJ2J1dHRvbi1iYXInO1xuICAgIGJ1dHRvbkJhci5hcHBlbmRDaGlsZCh0aGlzLnVzZUJ1dHRvbik7XG4gICAgYnV0dG9uQmFyLmFwcGVuZENoaWxkKHRoaXMuaW5zdGFsbEJ1dHRvbik7XG5cbiAgICAvLyBsaWNlbmNlIHBhbmVsXG4gICAgY29uc3QgbGljZW5jZVBhbmVsID0gdGhpcy5jcmVhdGVQYW5lbCgnVGhlIExpY2VuY2UgSW5mbycsICdpcHN1bSBsb3J1bScsICdsaWNlbmNlLXBhbmVsJyk7XG4gICAgY29uc3QgcGx1Z2luc1BhbmVsID0gdGhpcy5jcmVhdGVQYW5lbCgnQXZhaWxhYmxlIHBsdWdpbnMnLCAnaXBzdW0gbG9ydW0nLCAncGx1Z2lucy1wYW5lbCcpO1xuICAgIGNvbnN0IHB1Ymxpc2hlclBhbmVsID0gdGhpcy5jcmVhdGVQYW5lbCgnUHVibGlzaGVyIEluZm8nLCAnaXBzdW0gbG9ydW0nLCAncHVibGlzaGVyLXBhbmVsJyk7XG5cbiAgICAvLyBwYW5lbCBncm91cFxuICAgIGNvbnN0IHBhbmVsR3JvdXBFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFuZWxHcm91cEVsZW1lbnQuY2xhc3NOYW1lID0gJ3BhbmVsLWdyb3VwJztcbiAgICBwYW5lbEdyb3VwRWxlbWVudC5hcHBlbmRDaGlsZChsaWNlbmNlUGFuZWwpO1xuICAgIHBhbmVsR3JvdXBFbGVtZW50LmFwcGVuZENoaWxkKHBsdWdpbnNQYW5lbCk7XG4gICAgcGFuZWxHcm91cEVsZW1lbnQuYXBwZW5kQ2hpbGQocHVibGlzaGVyUGFuZWwpO1xuXG4gICAgLy8gaW1hZ2VzXG4gICAgdGhpcy5jYXJvdXNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cblxuICAgIC8vIGFkZCByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWRldGFpbCc7XG4gICAgdGhpcy5yb290RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKGJhY2tCdXR0b25FbGVtZW50KTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKGRldGFpbHNFbGVtZW50KTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkJhcik7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhcm91c2VsKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHBhbmVsR3JvdXBFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBib2R5SWRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVQYW5lbCh0aXRsZSwgYm9keSwgYm9keUlkKSB7XG4gICAgY29uc3QgaGVhZGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZWFkZXJFbC5jbGFzc05hbWUgPSAncGFuZWwtaGVhZGVyJztcbiAgICBoZWFkZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICBoZWFkZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBib2R5SWQpO1xuICAgIGhlYWRlckVsLmlubmVySFRNTCA9IHRpdGxlO1xuXG4gICAgY29uc3QgYm9keUlubmVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBib2R5SW5uZXJFbC5jbGFzc05hbWUgPSAncGFuZWwtYm9keS1pbm5lcic7XG4gICAgYm9keUlubmVyRWwuaW5uZXJIVE1MID0gYm9keTtcblxuICAgIGNvbnN0IGJvZHlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvZHlFbC5jbGFzc05hbWUgPSAncGFuZWwtYm9keSc7XG4gICAgYm9keUVsLmlkID0gYm9keUlkO1xuICAgIGJvZHlFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBib2R5RWwuYXBwZW5kQ2hpbGQoYm9keUlubmVyRWwpO1xuXG4gICAgY29uc3QgcGFuZWxFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBhbmVsRWwuY2xhc3NOYW1lID0gJ3BhbmVsJztcbiAgICBwYW5lbEVsLmFwcGVuZENoaWxkKGhlYWRlckVsKTtcbiAgICBwYW5lbEVsLmFwcGVuZENoaWxkKGJvZHlFbCk7XG5cbiAgICBpbml0UGFuZWwocGFuZWxFbCk7XG5cbiAgICByZXR1cm4gcGFuZWxFbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaW1hZ2UgdG8gdGhlIGNhcm91c2VsXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbWFnZVxuICAgKi9cbiAgYWRkSW1hZ2VUb0Nhcm91c2VsKGltYWdlKSB7XG4gICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgaXRlbS5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ltYWdlLnVybH1cIiBhbHQ9XCIke2ltYWdlLmFsdH1cIiBzdHlsZT1cIndpZHRoOiAxMDBweDtcIi8+YDtcblxuICAgIHRoaXMuY2Fyb3VzZWwuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgaW1hZ2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICAgKi9cbiAgc2V0SW1hZ2Uoc3JjKSB7XG4gICAgdGhpcy5pbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRJZChpZCkge1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICAgIHRoaXMudXNlQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbG9uZyBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgc2V0RGVzY3JpcHRpb24odGV4dCkge1xuICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gdGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBleGFtcGxlIHVybFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBzZXRFeGFtcGxlKHVybCkge1xuICAgIHRoaXMuZGVtb0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwgfHwgJyMnKTtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuZGVtb0J1dHRvbiwgIWlzRW1wdHkodXJsKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBpZiB0aGUgY29udGVudCB0eXBlIGlzIGluc3RhbGxlZFxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluc3RhbGxlZFxuICAgKi9cbiAgc2V0SXNJbnN0YWxsZWQoaW5zdGFsbGVkKSB7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLnVzZUJ1dHRvbiwgaW5zdGFsbGVkKTtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuaW5zdGFsbEJ1dHRvbiwgIWluc3RhbGxlZCk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlRGV0YWlsVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXdcIjtcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tIFwiLi4vaHViLXNlcnZpY2VzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWwge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIHZpZXdzXG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVEZXRhaWxWaWV3KHN0YXRlKTtcbiAgICB0aGlzLnZpZXcub24oJ2luc3RhbGwnLCB0aGlzLmluc3RhbGwsIHRoaXMpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnY2xvc2UnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGxvYWRCeUlkKGlkKSB7XG4gICAgdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcbiAgICAgIC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpXG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gICBpbnN0YWxsKHtpZH0pIHtcbiAgICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUpXG4gICAgICAgLnRoZW4obWFjaGluZU5hbWUgPT4gdGhpcy5zZXJ2aWNlcy5pbnN0YWxsQ29udGVudFR5cGUobWFjaGluZU5hbWUpKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IGNvbnNvbGUuZGVidWcoJ1RPRE8sIGd1aSB1cGRhdGVzJykpXG4gICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZpZXcgd2l0aCB0aGUgY29udGVudCB0eXBlIGRhdGFcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZSkge1xuICAgIHRoaXMudmlldy5zZXRJZChjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG4gICAgdGhpcy52aWV3LnNldFRpdGxlKGNvbnRlbnRUeXBlLnRpdGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0RGVzY3JpcHRpb24oY29udGVudFR5cGUuZGVzY3JpcHRpb24pO1xuICAgIHRoaXMudmlldy5zZXRJbWFnZShjb250ZW50VHlwZS5pY29uKTtcbiAgICB0aGlzLnZpZXcuc2V0RXhhbXBsZShjb250ZW50VHlwZS5leGFtcGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQoISFjb250ZW50VHlwZS5pbnN0YWxsZWQpO1xuXG4gICAgY29udGVudFR5cGUuc2NyZWVuc2hvdHMuZm9yRWFjaCh0aGlzLnZpZXcuYWRkSW1hZ2VUb0Nhcm91c2VsLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBub0ljb24gZnJvbSAnLi4vLi4vaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmcnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3RWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICBjb25zb2xlLmxvZygncGxhY2UnLCBub0ljb24pO1xuXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgcm9vdCBlbGVtZW50XG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWxpc3QnO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgcm93cyBmcm9tIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgcmVtb3ZlQWxsUm93cygpIHtcbiAgICBpZih0aGlzLnJvb3RFbGVtZW50KXtcbiAgICAgIHdoaWxlKHRoaXMucm9vdEVsZW1lbnQuZmlyc3RDaGlsZCl7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5yb290RWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHJvd1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgYWRkUm93KGNvbnRlbnRUeXBlKSB7XG4gICAgY29uc3Qgcm93ID0gdGhpcy5jcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgdGhpcyk7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3Jvdy1zZWxlY3RlZCcsIHRoaXMsIHJvdyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChyb3cpXG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSBDb250ZW50IFR5cGUgY29uZmlndXJhdGlvbiBhbmQgY3JlYXRlcyBhIHJvdyBkb21cbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gc2NvcGVcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgc2NvcGUpIHtcbiAgICAvLyByb3cgaXRlbVxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuaWQgPSBgY29udGVudC10eXBlLSR7Y29udGVudFR5cGUubWFjaGluZU5hbWV9YDtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcblxuICAgIC8vIGNyZWF0ZSBidXR0b24gY29uZmlnXG4gICAgY29uc3QgdXNlQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnVXNlJywgY2xzOiAnYnV0dG9uLXByaW1hcnknIH07XG4gICAgY29uc3QgaW5zdGFsbEJ1dHRvbkNvbmZpZyA9IHsgdGV4dDogJ2luc3RhbGwnLCBjbHM6ICdidXR0b24taW52ZXJzZS1wcmltYXJ5J307XG4gICAgY29uc3QgYnV0dG9uID0gY29udGVudFR5cGUuaW5zdGFsbGVkID8gIHVzZUJ1dHRvbkNvbmZpZzogaW5zdGFsbEJ1dHRvbkNvbmZpZztcblxuICAgIGNvbnN0IHRpdGxlID0gY29udGVudFR5cGUudGl0bGUgfHwgY29udGVudFR5cGUubWFjaGluZU5hbWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBjb250ZW50VHlwZS5zdW1tYXJ5IHx8ICdhc2QnO1xuXG4gICAgY29uc3QgaW1hZ2UgPSBjb250ZW50VHlwZS5pY29uIHx8IG5vSWNvbjtcblxuICAgIC8vIGNyZWF0ZSBodG1sXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBzcmM9XCIke2ltYWdlfVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gJHtidXR0b24uY2xzfVwiIGRhdGEtaWQ9XCIke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfVwiPiR7YnV0dG9uLnRleHR9PC9zcGFuPlxuICAgICAgPGg0PiR7dGl0bGV9PC9oND5cbiAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPiR7ZGVzY3JpcHRpb259PC9kaXY+XG4gICBgO1xuXG4gICAgLy8gaGFuZGxlIHVzZSBidXR0b25cbiAgICBjb25zdCB1c2VCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tcHJpbWFyeScpO1xuICAgIGlmKHVzZUJ1dHRvbil7XG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0Jywgc2NvcGUsIHVzZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlTGlzdFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWxpc3Qtdmlld1wiO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBSb3cgc2VsZWN0ZWQgZXZlbnRcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIFVwZGF0ZSBjb250ZW50IHR5cGUgbGlzdCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGFkZCB0aGUgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlTGlzdFZpZXcoc3RhdGUpO1xuICAgIHRoaXMucHJvcGFnYXRlKFsncm93LXNlbGVjdGVkJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGUgdGhpcyBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGlzIGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgd2l0aCBuZXcgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlcykge1xuICAgIHRoaXMudmlldy5yZW1vdmVBbGxSb3dzKCk7XG4gICAgY29udGVudFR5cGVzLmZvckVhY2godGhpcy52aWV3LmFkZFJvdywgdGhpcy52aWV3KTtcbiAgICB0aGlzLmZpcmUoJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHt9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZpZXdzIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwiaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3XG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudEJyb3dzZXJWaWV3IHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudHNcbiAgICBjb25zdCBtZW51ID0gdGhpcy5jcmVhdGVNZW51RWxlbWVudCgpO1xuICAgIGNvbnN0IGlucHV0R3JvdXAgPSB0aGlzLmNyZWF0ZUlucHV0R3JvdXBFbGVtZW50KCk7XG5cbiAgICAvLyBtZW51IGdyb3VwXG4gICAgY29uc3QgbWVudUdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVudUdyb3VwLmNsYXNzTmFtZSA9ICdtZW51LWdyb3VwJztcbiAgICBtZW51R3JvdXAuYXBwZW5kQ2hpbGQobWVudSk7XG4gICAgbWVudUdyb3VwLmFwcGVuZENoaWxkKGlucHV0R3JvdXApO1xuXG4gICAgLy8gcm9vdCBlbGVtZW50XG4gICAgdGhpcy5yb290RWxlbWVudCAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKG1lbnVHcm91cCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG1lbnUgaXRlbVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGFkZE1lbnVJdGVtKHRleHQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51aXRlbScpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcblxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICB0aGlzLmZpcmUoJ21lbnUtc2VsZWN0ZWQnLCB7XG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LnRhcmdldFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBzZXRzIGZpcnN0IHRvIGJlIHNlbGVjdGVkXG4gICAgaWYodGhpcy5tZW51QmFyRWxlbWVudC5jaGlsZEVsZW1lbnRDb3VudCA8IDEpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdG8gbWVudSBiYXJcbiAgICB0aGlzLm1lbnVCYXJFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgbWVudSBiYXIgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlTWVudUVsZW1lbnQoKSB7XG4gICAgdGhpcy5tZW51QmFyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5tZW51QmFyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWJhcicpO1xuICAgIHRoaXMubWVudUJhckVsZW1lbnQuY2xhc3NOYW1lID0gJ2g1cC1tZW51JztcblxuICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICBuYXZFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubWVudUJhckVsZW1lbnQpO1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aXRsZS5jbGFzc05hbWUgPSBcIm1lbnUtdGl0bGVcIjtcbiAgICB0aXRsZS5pbm5lckhUTUwgPSBcIkJyb3dzZSBjb250ZW50IHR5cGVzXCI7XG5cbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVudS5jbGFzc05hbWUgPSBcIm1lbnVcIjtcbiAgICBtZW51LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBtZW51LmFwcGVuZENoaWxkKG5hdkVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIG1lbnU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgaW5wdXQgZ3JvdXAgdXNlZCBmb3Igc2VhcmNoXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlSW5wdXRHcm91cEVsZW1lbnQoKSB7XG4gICAgLy8gaW5wdXQgZmllbGRcbiAgICBjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dEZpZWxkLmlkID0gXCJzZWFyY2gtYmFyXCI7XG4gICAgaW5wdXRGaWVsZC5jbGFzc05hbWUgPSAnZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1yb3VuZGVkJztcbiAgICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgXCJTZWFyY2ggZm9yIENvbnRlbnQgVHlwZXNcIik7XG4gICAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgnc2VhcmNoJywge1xuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXQsXG4gICAgICAgIHF1ZXJ5OiBldmVudC50YXJnZXQudmFsdWVcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gaW5wdXQgYnV0dG9uXG4gICAgY29uc3QgaW5wdXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbnB1dEJ1dHRvbi5jbGFzc05hbWUgPSAnaW5wdXQtZ3JvdXAtYWRkb24gaWNvbi1zZWFyY2gnO1xuICAgIGlucHV0QnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJhcicpLmZvY3VzKClcbiAgICB9O1xuXG4gICAgLy8gaW5wdXQgZ3JvdXBcbiAgICBjb25zdCBpbnB1dEdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5wdXRHcm91cC5jbGFzc05hbWUgPSAnaW5wdXQtZ3JvdXAnO1xuICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRGaWVsZCk7XG4gICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEJ1dHRvbik7XG5cbiAgICByZXR1cm4gaW5wdXRHcm91cDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgb2YgdGhlIGNvbnRlbnQgYnJvd3NlclxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcuanMiLCJpbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3XCI7XG5pbXBvcnQgU2VhcmNoU2VydmljZSBmcm9tIFwiLi4vc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2VcIjtcbmltcG9ydCBDb250ZW50VHlwZUxpc3QgZnJvbSAnLi4vY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QnO1xuaW1wb3J0IENvbnRlbnRUeXBlRGV0YWlsIGZyb20gJy4uL2NvbnRlbnQtdHlwZS1kZXRhaWwvY29udGVudC10eXBlLWRldGFpbCc7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4uL3V0aWxzL2Vycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRUeXBlU2VjdGlvblxuICogQG1peGVzIEV2ZW50ZnVsXG4gKlxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gYWRkIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uVmlldyhzdGF0ZSk7XG5cbiAgICAvLyBjb250cm9sbGVyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2UoeyBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsIH0pO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0ID0gbmV3IENvbnRlbnRUeXBlTGlzdCgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwgPSBuZXcgQ29udGVudFR5cGVEZXRhaWwoeyBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsIH0pO1xuXG4gICAgLy8gYWRkIG1lbnUgaXRlbXNcbiAgICBbJ015IENvbnRlbnQgVHlwZXMnLCAnTmV3ZXN0JywgJ01vc3QgUG9wdWxhcicsICdSZWNvbW1lbmRlZCddXG4gICAgICAuZm9yRWFjaChtZW51VGV4dCA9PiB0aGlzLnZpZXcuYWRkTWVudUl0ZW0obWVudVRleHQpKTtcblxuICAgIC8vIEVsZW1lbnQgZm9yIGhvbGRpbmcgbGlzdCBhbmQgZGV0YWlscyB2aWV3c1xuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtdHlwZS1zZWN0aW9uJyk7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gc2VjdGlvbjtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVMaXN0LmdldEVsZW1lbnQoKSk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmdldEVsZW1lbnQoKSk7XG5cbiAgICB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCddLCB0aGlzLmNvbnRlbnRUeXBlTGlzdCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XG5cbiAgICAvLyByZWdpc3RlciBsaXN0ZW5lcnNcbiAgICB0aGlzLnZpZXcub24oJ3NlYXJjaCcsIHRoaXMuc2VhcmNoLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmFwcGx5U2VhcmNoRmlsdGVyLCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5vbigncm93LXNlbGVjdGVkJywgdGhpcy5zaG93RGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG5cbiAgICB0aGlzLmluaXRDb250ZW50VHlwZUxpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0IHdpdGggYSBzZWFyY2hcbiAgICovXG4gIGluaXRDb250ZW50VHlwZUxpc3QoKSB7XG4gICAgLy8gaW5pdGlhbGl6ZSBieSBzZWFyY2hcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKFwiXCIpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5maXJlKCdlcnJvcicsIGVycm9yKSk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgYSBzZWFyY2ggYW5kIHVwZGF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICAgKi9cbiAgc2VhcmNoKHtxdWVyeX0pIHtcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYXBwbHkgYSBzZWFyY2ggZmlsdGVyXG4gICAqL1xuICBhcHBseVNlYXJjaEZpbHRlcigpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdDb250ZW50VHlwZVNlY3Rpb246IG1lbnUgd2FzIGNsaWNrZWQhJywgZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIGRldGFpbCB2aWV3XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2hvd0RldGFpbFZpZXcoe2lkfSkge1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmxvYWRCeUlkKGlkKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLnNob3coKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENsb3NlIGRldGFpbCB2aWV3XG4gICAqL1xuICBjbG9zZURldGFpbFZpZXcoKSB7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5oaWRlKCk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Quc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxuaW1wb3J0IGluaXRUYWJQYW5lbCBmcm9tIFwiY29tcG9uZW50cy90YWItcGFuZWxcIlxuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4vdXRpbHMvZXZlbnRzJztcbi8qKlxuICogVGFiIGNoYW5nZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjdGFiLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBQYW5lbCBvcGVuIG9yIGNsb3NlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyNwYW5lbC1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9EQVRBX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YlZpZXcjdGFiLWNoYW5nZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJWaWV3IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgdGhpcy5yZW5kZXJUYWJQYW5lbChzdGF0ZSk7XG4gICAgdGhpcy5yZW5kZXJQYW5lbChzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBwYW5lbFxuICAgKi9cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICogQHBhcmFtIHtib29sZWFufSBleHBhbmRlZFxuICAgKi9cbiAgcmVuZGVyUGFuZWwoe3RpdGxlID0gJycsIHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGl0bGUuY2xhc3NOYW1lICs9IFwicGFuZWwtaGVhZGVyIGljb24taHViLWljb25cIjtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWApO1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3BhbmVsLWNoYW5nZScsIHRoaXMsIHRoaXMudGl0bGUpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYm9keS5jbGFzc05hbWUgKz0gXCJwYW5lbC1ib2R5XCI7XG4gICAgdGhpcy5ib2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLmJvZHkuaWQgPSBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSBgcGFuZWwgaDVwLXNlY3Rpb24tJHtzZWN0aW9uSWR9YDtcbiAgICBpZihleHBhbmRlZCl7XG4gICAgICB0aGlzLnBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICB9XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuYm9keSk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSArPSBgaDVwIGg1cC1odWJgO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZSB0aGUgcGFuZWwgYXR0cmliaXV0ZXMgZnJvbSBoNXAtc2RrLCBlLmcuIG9wZW5pbmcgYW5kIGNsb3NpbmdcbiAgICogVGhpcyBpcyBvbmx5IGNhbGxlZCBvbmNlIG5vIGVycm9ycyBoYXZlIG9jY3VyZWQgaW4gbG9hZGluZyB0aGUgaHViXG4gICAqL1xuICBpbml0aWFsaXplUGFuZWwoKXtcbiAgICBpbml0UGFuZWwodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGlmIHBhbmVsIGlzIG9wZW4sIHRoaXMgaXMgdXNlZCBmb3Igb3V0ZXIgYm9yZGVyIGNvbG9yXG4gICAqL1xuICB0b2dnbGVQYW5lbE9wZW4oKSB7XG4gICAgaWYoaXNPcGVuKHRoaXMucGFuZWwpKSB7XG4gICAgICB0aGlzLnBhbmVsLnJlbW92ZUF0dHJpYnV0ZSgnb3BlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYmFyJykuZm9jdXMoKX0sMjApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSB0YWIgcGFuZWxcbiAgICovXG4gIHJlbmRlclRhYlBhbmVsKHN0YXRlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFibGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy50YWJsaXN0LmNsYXNzTmFtZSArPSBcInRhYmxpc3RcIjtcbiAgICB0aGlzLnRhYmxpc3Quc2V0QXR0cmlidXRlICgncm9sZScsICd0YWJsaXN0Jyk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy50YWJsaXN0KTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuY2xhc3NOYW1lICs9ICd0YWItcGFuZWwnO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRhYkxpc3RXcmFwcGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgdGFiXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkXG4gICAqL1xuICBhZGRUYWIoe3RpdGxlLCBpZCwgY29udGVudCwgc2VsZWN0ZWQgPSBmYWxzZX0pIHtcbiAgICBjb25zdCB0YWJJZCA9IGB0YWItJHtpZH1gO1xuICAgIGNvbnN0IHRhYlBhbmVsSWQgPSBgdGFiLXBhbmVsLSR7aWR9YDtcblxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdGFiLmNsYXNzTmFtZSArPSAndGFiJztcbiAgICB0YWIuaWQgPSB0YWJJZDtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgdGFiUGFuZWxJZCk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHNlbGVjdGVkLnRvU3RyaW5nKCkpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0RBVEFfSUQsIGlkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYicpO1xuICAgIHRhYi5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygndGFiLWNoYW5nZScsIHRoaXMsIHRhYik7XG5cbiAgICBjb25zdCB0YWJQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRhYlBhbmVsLmlkID0gdGFiUGFuZWxJZDtcbiAgICB0YWJQYW5lbC5jbGFzc05hbWUgKz0gJ3RhYnBhbmVsJztcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFibGxlZGJ5JywgdGFiSWQpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIXNlbGVjdGVkKS50b1N0cmluZygpKTtcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcbiAgICB0YWJQYW5lbC5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZCh0YWIpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0YWJQYW5lbCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBhbmltYXRlZCBib3JkZXIgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFiXG4gICAqL1xuICBhZGRCb3R0b21Cb3JkZXIoKSB7XG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSk7XG4gIH1cblxuICBpbml0VGFiUGFuZWwoKSB7XG4gICAgaW5pdFRhYlBhbmVsKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VjdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldFNlY3Rpb25UeXBlKHtpZH0pIHtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSA9IGBoNXAtc2VjdGlvbi0ke2lkfSBwYW5lbGA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsImltcG9ydCB7Y3VycnksIG1hcCwgZmlsdGVyfSBmcm9tICd1dGlscy9mdW5jdGlvbmFsJ1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4uL2h1Yi1zZXJ2aWNlcyc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBUaGUgU2VhcmNoIFNlcnZpY2UgZ2V0cyBhIGNvbnRlbnQgdHlwZSBmcm9tIGh1Yi1zZXJ2aWNlcy5qc1xuICogaW4gdGhlIGZvcm0gb2YgYSBwcm9taXNlLiBJdCB0aGVuIGdlbmVyYXRlcyBhIHNjb3JlIGJhc2VkXG4gKiBvbiB0aGUgZGlmZmVyZW50IHdlaWdodGluZ3Mgb2YgdGhlIGNvbnRlbnQgdHlwZSBmaWVsZHMgYW5kXG4gKiBzb3J0cyB0aGUgcmVzdWx0cyBiYXNlZCBvbiB0aGUgZ2VuZXJhdGVkIHNjb3JlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUuYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIEFkZCBjb250ZW50IHR5cGVzIHRvIHRoZSBzZWFyY2ggaW5kZXhcbiAgICB0aGlzLmNvbnRlbnRUeXBlcyA9IHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBzZWFyY2hcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXT59IEEgcHJvbWlzZSBvZiBhbiBhcnJheSBvZiBjb250ZW50IHR5cGVzXG4gICAqL1xuICBzZWFyY2gocXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50VHlwZXMudGhlbihmaWx0ZXJCeVF1ZXJ5KHF1ZXJ5KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBGaWx0ZXJzIGEgbGlzdCBvZiBjb250ZW50IHR5cGVzIGJhc2VkIG9uIGEgcXVlcnlcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcbiAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gKi9cbmNvbnN0IGZpbHRlckJ5UXVlcnkgPSBjdXJyeShmdW5jdGlvbihxdWVyeSwgY29udGVudFR5cGVzKSB7XG4gIC8vIFNvcnQgYWxwaGFiZXRpY2FsbHkgdXBvbiBpbml0aWFsaXphdGlvblxuICBpZiAocXVlcnkgPT0gJycpIHtcbiAgICByZXR1cm4gY29udGVudFR5cGVzLnNvcnQoZnVuY3Rpb24oYSxiKXtcbiAgICAgIGlmKGEudGl0bGUgPCBiLnRpdGxlKSByZXR1cm4gLTE7XG4gICAgICBpZihhLnRpdGxlID4gYi50aXRsZSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBjb250ZW50VHlwZXNcbiAgICAubWFwKGZ1bmN0aW9uKGNvbnRlbnRUeXBlKXtcbiAgICAgIC8vIEFwcGVuZCBhIHNlYXJjaCBzY29yZSB0byBlYWNoIGNvbnRlbnQgdHlwZVxuICAgICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgICAgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgICBzY29yZTogZ2V0U2VhcmNoU2NvcmUocXVlcnksIGNvbnRlbnRUeXBlKVxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSlcbiAgICAuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc2NvcmUgPiAwKSAvLyBPbmx5IHNob3cgaGl0c1xuICAgIC5zb3J0KChhLGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKSAvLyBTb3J0IGJ5IHJlbGV2YW5jZVxuICAgIC5tYXAocmVzdWx0ID0+IHJlc3VsdC5jb250ZW50VHlwZSk7IC8vIFVud3JhcCByZXN1bHQgb2JqZWN0XG59KTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHdlaWdodGluZyBmb3IgZGlmZmVyZW50IHNlYXJjaCB0ZXJtcyBiYXNlZFxuICogb24gZXhpc3RlbmNlIG9mIHN1YnN0cmluZ3NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRlbnRUeXBlXG4gKiBAcmV0dXJuIHtpbnR9XG4gKi9cbmNvbnN0IGdldFNlYXJjaFNjb3JlID0gZnVuY3Rpb24ocXVlcnksIGNvbnRlbnRUeXBlKSB7XG4gIGxldCBzY29yZSA9IDA7XG4gIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLnRpdGxlKSkge1xuICAgIHNjb3JlICs9IDEwMDtcbiAgfVxuICBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5zdW1tYXJ5KSkge1xuICAgIHNjb3JlICs9IDU7XG4gIH1cbiAgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuZGVzY3JpcHRpb24pKSB7XG4gICAgc2NvcmUgKz0gNTtcbiAgfVxuICBpZiAoYXJyYXlIYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmtleXdvcmRzKSkge1xuICAgICAgc2NvcmUgKz0gNTtcbiAgfVxuICByZXR1cm4gc2NvcmU7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG5lZWRsZSBpcyBmb3VuZCBpbiB0aGUgaGF5c3RhY2suXG4gKiBOb3QgY2FzZSBzZW5zaXRpdmVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmVlZGxlXG4gKiBAcGFyYW0ge3N0cmluZ30gaGF5c3RhY2tcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGhhc1N1YlN0cmluZyA9IGZ1bmN0aW9uKG5lZWRsZSwgaGF5c3RhY2spIHtcbiAgaWYgKGhheXN0YWNrID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaGF5c3RhY2sudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5lZWRsZS50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiwgY2hlY2tzIGlmIGFycmF5IGhhcyBjb250YWlucyBhIHN1YnN0cmluZ1xuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gc3ViU3RyaW5nXG4gKiBAcGFyYW0gIHtBcnJheX0gYXJyXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBhcnJheUhhc1N1YlN0cmluZyA9IGZ1bmN0aW9uKHN1YlN0cmluZywgYXJyKSB7XG4gIGlmIChhcnIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBhcnIuc29tZShzdHJpbmcgPT4gaGFzU3ViU3RyaW5nKHN1YlN0cmluZywgc3RyaW5nKSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsIi8qKlxuICogQGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xuICBnZXRFbGVtZW50KCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiVE9ETyBVcGxvYWRcIjtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwicmVxdWlyZSgnLi4vLi4vc3JjL3N0eWxlcy9tYWluLnNjc3MnKTtcblxuLy8gTG9hZCBsaWJyYXJ5XG5INVAgPSBINVAgfHwge307XG5INVAuSHViQ2xpZW50ID0gcmVxdWlyZSgnLi4vc2NyaXB0cy9odWInKS5kZWZhdWx0O1xuSDVQLkh1YkNsaWVudC5yZW5kZXJFcnJvck1lc3NhZ2UgPSByZXF1aXJlKCcuLi9zY3JpcHRzL3V0aWxzL2Vycm9ycycpLmRlZmF1bHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIWnBaWGRDYjNnOUlqQWdNQ0EwTURBZ01qSTFJajROQ2lBZ1BHUmxabk0rRFFvZ0lDQWdQSE4wZVd4bFBnMEtJQ0FnSUNBZ0xtTnNjeTB4SUhzTkNpQWdJQ0FnSUNBZ1ptbHNiRG9nYm05dVpUc05DaUFnSUNBZ0lIME5DZzBLSUNBZ0lDQWdMbU5zY3kweUlIc05DaUFnSUNBZ0lDQWdabWxzYkRvZ0kyTTJZelpqTnpzTkNpQWdJQ0FnSUgwTkNnMEtJQ0FnSUNBZ0xtTnNjeTB6SUhzTkNpQWdJQ0FnSUNBZ1ptbHNiRG9nSTJabVpqc05DaUFnSUNBZ0lIME5DaUFnSUNBOEwzTjBlV3hsUGcwS0lDQThMMlJsWm5NK0RRb2dJRHgwYVhSc1pUNWpiMjUwWlc1MElIUjVjR1VnY0d4aFkyVm9iMnhrWlhKZk1Ud3ZkR2wwYkdVK0RRb2dJRHhuSUdsa1BTSk1ZWGxsY2w4eUlpQmtZWFJoTFc1aGJXVTlJa3hoZVdWeUlESWlQZzBLSUNBZ0lEeG5JR2xrUFNKamIyNTBaVzUwWDNSNWNHVmZjR3hoWTJWb2IyeGtaWElpSUdSaGRHRXRibUZ0WlQwaVkyOXVkR1Z1ZENCMGVYQmxJSEJzWVdObGFHOXNaR1Z5SWo0TkNpQWdJQ0FnSUR4eVpXTjBJR05zWVhOelBTSmpiSE10TVNJZ2QybGtkR2c5SWpRd01DSWdhR1ZwWjJoMFBTSXlNalVpTHo0TkNpQWdJQ0FnSUR4blBnMEtJQ0FnSUNBZ0lDQThjR0YwYUNCamJHRnpjejBpWTJ4ekxUSWlJR1E5SWsweU9Ea3NOelJCTWpZdU5URXNNall1TlRFc01Dd3dMREFzTWpZeUxqUTVMRFEzTGpWb0xURXhPRUV5Tmk0MU1Td3lOaTQxTVN3d0xEQXNNQ3d4TVRnc056UjJOelZoTWpZdU5URXNNall1TlRFc01Dd3dMREFzTWpZdU5URXNNall1TlRGb01URTRRVEkyTGpVeExESTJMalV4TERBc01Dd3dMREk0T1N3eE5EbGFiUzB4TlN3Mk1TNDRNV0V5TlM0Mk55d3lOUzQyTnl3d0xEQXNNUzB5TlM0Mk55d3lOUzQyTjBneE5UZ3VOamRCTWpVdU5qY3NNalV1Tmpjc01Dd3dMREVzTVRNekxERXpOUzQ0TTFZeE1ERXVNVGRCTWpVdU5qY3NNalV1Tmpjc01Dd3dMREVzTVRVNExqWTNMRGMxTGpWb09Ea3VOalZCTWpVdU5qY3NNalV1Tmpjc01Dd3dMREVzTWpjMExERXdNUzR4TjFvaUx6NE5DaUFnSUNBZ0lDQWdQSEpsWTNRZ1kyeGhjM005SW1Oc2N5MHpJaUI0UFNJeE16TWlJSGs5SWpjMUxqVWlJSGRwWkhSb1BTSXhOREVpSUdobGFXZG9kRDBpT0RZaUlISjRQU0l5TlM0Mk55SWdjbms5SWpJMUxqWTNJaTgrRFFvZ0lDQWdJQ0E4TDJjK0RRb2dJQ0FnSUNBOFkybHlZMnhsSUdOc1lYTnpQU0pqYkhNdE15SWdZM2c5SWpFME5TNDBPQ0lnWTNrOUlqWXlMakV6SWlCeVBTSXpMalU1SWk4K0RRb2dJQ0FnSUNBOFkybHlZMnhsSUdOc1lYTnpQU0pqYkhNdE15SWdZM2c5SWpFMU5pNDFOQ0lnWTNrOUlqWXlMakV6SWlCeVBTSXpMalU1SWk4K0RRb2dJQ0FnSUNBOFkybHlZMnhsSUdOc1lYTnpQU0pqYkhNdE15SWdZM2c5SWpFMk55NDBOU0lnWTNrOUlqWXlMakV6SWlCeVBTSXpMalU1SWk4K0RRb2dJQ0FnSUNBOFp5QnBaRDBpWDBkeWIzVndYeUlnWkdGMFlTMXVZVzFsUFNJbWJIUTdSM0p2ZFhBbVozUTdJajROQ2lBZ0lDQWdJQ0FnUEdjZ2FXUTlJbDlIY205MWNGOHlJaUJrWVhSaExXNWhiV1U5SWlac2REdEhjbTkxY0NabmREc2lQZzBLSUNBZ0lDQWdJQ0FnSUR4d1lYUm9JR2xrUFNKZlEyOXRjRzkxYm1SZlVHRjBhRjhpSUdSaGRHRXRibUZ0WlQwaUpteDBPME52YlhCdmRXNWtJRkJoZEdnbVozUTdJaUJqYkdGemN6MGlZMnh6TFRJaUlHUTlJazB5TkRJdU5qRXNNVEF4TGprell5MHlMVEV1T1RVdE5TNHhMVEl1TkRNdE9TNHhPUzB5TGpRelNESXlNblkyU0RJd015NHhOR3d0TVM0ek5DdzJZVEl4TGpNNExESXhMak00TERBc01Dd3hMRE11T0RJdE1TNHhNaXd4TXk0Mk1Td3hNeTQyTVN3d0xEQXNNU3d6TGpJNExTNHhNeXd4TWk0eU9Dd3hNaTR5T0N3d0xEQXNNU3c0TGprc015NHpOeXd4TVM0eU1pd3hNUzR5TWl3d0xEQXNNU3d6TGpReUxEZ3VNemdzTVRRdU1qTXNNVFF1TWpNc01Dd3dMREV0TVM0M05pdzJMamd5TERFeUxqZ3lMREV5TGpneUxEQXNNQ3d4TFRVc05TNHpOV010TGpjM0xqUXhMUzQzTERFdU16Y3RNaTQxTlN3eExqTTNTREl5TlhZdE1UUm9OeTR4TjJNMExqVTFMREFzTnk0NU5DMHhMREV3TGpFMkxUTXVNV0V4TUM0M01pd3hNQzQzTWl3d0xEQXNNQ3d6TGpNekxUZ3VOREZETWpRMUxqWTJMREV3Tmk0MExESTBOQzQyTlN3eE1ETXVPRGdzTWpReUxqWXhMREV3TVM0NU0xcHRMVGt1TWpZc01UQXVOelJqTFM0NE9DNDNOaTB5TGpReExqZ3pMVFF1TlRrdU9ETklNakkxZGkwNGFEUXVNakZoTlM0NUxEVXVPU3d3TERBc01TdzBMak14TERFdU5ETXNOQ3cwTERBc01Dd3hMREV1TVRVc01pNDRPRUV6TGpVNExETXVOVGdzTUN3d0xERXNNak16TGpNMUxERXhNaTQyTjFvaUx6NE5DaUFnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpWDFCaGRHaGZJaUJrWVhSaExXNWhiV1U5SWlac2REdFFZWFJvSm1kME95SWdZMnhoYzNNOUltTnNjeTB5SWlCa1BTSk5NakExTGpJMUxERXhOaTQ0TjJFMUxEVXNNQ3d3TERBdE5DNDFMREl1T0d3dE9TNDRPUzB1T0Rrc05DNDBOeTB4T1M0eU4wZ3hPRGQyTVRSSU1UYzFkaTB4TkVneE5qVjJNelpvTVRCMkxURTBhREV5ZGpFMGFERXlMamt5WXkweUxqWTRMREF0TXk0eE1pMHhMalE0TFRRdU16RXRNaTR6TjJFeE1pNDROU3d4TWk0NE5Td3dMREFzTVMweUxqa3pMVE11TWpZc01UVXVOVFlzTVRVdU5UWXNNQ3d3TERFdE1TNDROQzAwTGpJeWJEa3VPUzB4TGpRMllUVXNOU3d3TERFc01DdzBMalE1TFRjdU16SmFJaTgrRFFvZ0lDQWdJQ0FnSUR3dlp6NE5DaUFnSUNBZ0lEd3ZaejROQ2lBZ0lDQWdJRHh5WldOMElHTnNZWE56UFNKamJITXRNeUlnZUQwaU1UYzRMakF4SWlCNVBTSTJNQzR3TkNJZ2QybGtkR2c5SWpjMUxqWTFJaUJvWldsbmFIUTlJalF1TkRraUlISjRQU0l5TGpFNElpQnllVDBpTWk0eE9DSXZQZzBLSUNBZ0lEd3ZaejROQ2lBZ1BDOW5QZzBLUEM5emRtYytEUW89XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2Z1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==