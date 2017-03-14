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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
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
      return fetch(ns.getAjaxUrl('library-install', { id: id }), {
        method: 'POST',
        credentials: 'include',
        body: ''
      }).then(function (result) {
        return result.json();
      });
    }

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
/* 4 */
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

  return messageWrapper;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relayClickEventAs = undefined;

var _functional = __webpack_require__(1);

/**
 *  Transforms a DOM click event into an Eventful's event
 *  @see Eventful
 *
 * @param  {string | Object} type
 * @param  {Eventful} eventful
 * @param  {HTMLElement} element
 * @return {HTMLElement}
 */
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

var _aria = __webpack_require__(7);

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
/* 7 */
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
/* 8 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjI1Ij4NCiAgPGRlZnM+DQogICAgPHN0eWxlPg0KICAgICAgLmNscy0xIHsNCiAgICAgIGZpbGw6IG5vbmU7DQogICAgICB9DQoNCiAgICAgIC5jbHMtMiB7DQogICAgICBmaWxsOiAjYzZjNmM3Ow0KICAgICAgfQ0KDQogICAgICAuY2xzLTMsIC5jbHMtNCB7DQogICAgICBmaWxsOiAjZmZmOw0KICAgICAgfQ0KDQogICAgICAuY2xzLTMgew0KICAgICAgb3BhY2l0eTogMC43Ow0KICAgICAgfQ0KICAgIDwvc3R5bGU+DQogIDwvZGVmcz4NCiAgPHRpdGxlPmNvbnRlbnQgdHlwZSBwbGFjZWhvbGRlcl8yPC90aXRsZT4NCiAgPGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+DQogICAgPGcgaWQ9ImNvbnRlbnRfdHlwZV9wbGFjZWhvbGRlci0xX2NvcHkiIGRhdGEtbmFtZT0iY29udGVudCB0eXBlIHBsYWNlaG9sZGVyLTEgY29weSI+DQogICAgICA8cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1Ii8+DQogICAgICA8cmVjdCBjbGFzcz0iY2xzLTIiIHg9IjExMi41MSIgeT0iNDMuNDEiIHdpZHRoPSIxNzYuOTYiIGhlaWdodD0iMTM1LjQ1IiByeD0iMTAiIHJ5PSIxMCIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxMzYuNjYiIGN5PSI2MS45OCIgcj0iNC44MSIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxNTEuNDkiIGN5PSI2MS45OCIgcj0iNC44MSIvPg0KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTMiIGN4PSIxNjYuMSIgY3k9IjYxLjk4IiByPSI0LjgxIi8+DQogICAgICA8ZyBpZD0iX0dyb3VwXyIgZGF0YS1uYW1lPSImbHQ7R3JvdXAmZ3Q7Ij4NCiAgICAgICAgPGcgaWQ9Il9Hcm91cF8yIiBkYXRhLW5hbWU9IiZsdDtHcm91cCZndDsiPg0KICAgICAgICAgIDxwYXRoIGlkPSJfQ29tcG91bmRfUGF0aF8iIGRhdGEtbmFtZT0iJmx0O0NvbXBvdW5kIFBhdGgmZ3Q7IiBjbGFzcz0iY2xzLTQiIGQ9Ik0yNjMuMjgsOTUuMjFDMjYwLDkyLjA3LDI1NSw5MS41LDI0OC40Myw5MS41SDIyN3Y4SDE5OS41bC0yLjE3LDEwLjI0YTI1Ljg0LDI1Ljg0LDAsMCwxLDExLjQ4LTEuNjMsMTkuOTMsMTkuOTMsMCwwLDEsMTQuMzksNS41NywxOC4yNiwxOC4yNiwwLDAsMSw1LjUyLDEzLjYsMjMuMTEsMjMuMTEsMCwwLDEtMi44NCwxMS4wNSwxOC42NSwxOC42NSwwLDAsMS04LjA2LDcuNzksOSw5LDAsMCwxLTQuMTIsMS4zN0gyMzZ2LTIxaDEwLjQyYzcuMzYsMCwxMi44My0xLjYxLDE2LjQyLTVzNS4zOC03LjQ4LDUuMzgtMTMuNDRDMjY4LjIyLDEwMi4yOSwyNjYuNTcsOTguMzUsMjYzLjI4LDk1LjIxWm0tMTUsMTdjLTEuNDIsMS4yMi0zLjksMS4yNS03LjQxLDEuMjVIMjM2di0xNGg1LjYyYTkuNTcsOS41NywwLDAsMSw3LDIuOTMsNy4wNSw3LjA1LDAsMCwxLDEuODUsNC45MkE2LjMzLDYuMzMsMCwwLDEsMjQ4LjMxLDExMi4yNVoiLz4NCiAgICAgICAgICA8cGF0aCBpZD0iX1BhdGhfIiBkYXRhLW5hbWU9IiZsdDtQYXRoJmd0OyIgY2xhc3M9ImNscy00IiBkPSJNMjAyLjksMTE5LjExYTguMTIsOC4xMiwwLDAsMC03LjI4LDQuNTJsLTE2LTEuMjIsNy4yMi0zMC45MkgxNzR2MjJIMTUzdi0yMkgxMzZ2NTZoMTd2LTIxaDIxdjIxaDIwLjMxYy0yLjcyLDAtNS0xLjUzLTctM2ExOS4xOSwxOS4xOSwwLDAsMS00LjczLTQuODMsMjMuNTgsMjMuNTgsMCwwLDEtMy02LjZsMTYtMi4yNmE4LjExLDguMTEsMCwxLDAsNy4yNi0xMS43MloiLz4NCiAgICAgICAgPC9nPg0KICAgICAgPC9nPg0KICAgICAgPHJlY3QgY2xhc3M9ImNscy0zIiB4PSIxNzcuNjYiIHk9IjU3LjY2IiB3aWR0aD0iOTIuMjgiIGhlaWdodD0iOS4zOCIgcng9IjMuNSIgcnk9IjMuNSIvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+DQo="

/***/ }),
/* 9 */
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

var _hubServices = __webpack_require__(3);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _eventful = __webpack_require__(0);

var _errors = __webpack_require__(4);

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
 * @mixes Eventful
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
    this.propagate(['upload'], this.uploadSection);

    // handle events
    this.on('select', this.setPanelTitle, this);
    this.on('select', this.view.closePanel, this.view);
    this.view.on('tab-change', this.view.setSectionType, this.view);
    this.view.on('panel-change', this.view.togglePanelOpen.bind(this.view), this.view);

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
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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

var _functional = __webpack_require__(1);

var _eventful = __webpack_require__(0);

var _panel = __webpack_require__(6);

var _panel2 = _interopRequireDefault(_panel);

var _imageScroller = __webpack_require__(20);

var _imageScroller2 = _interopRequireDefault(_imageScroller);

var _events = __webpack_require__(5);

var _contentTypePlaceholder = __webpack_require__(8);

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

    // create view
    this.rootElement = this.createView();

    // grab references
    this.useButton = this.rootElement.querySelector('.button-use');
    this.installButton = this.rootElement.querySelector('.button-install');
    this.image = this.rootElement.querySelector('.content-type-image');
    this.title = this.rootElement.querySelector('.text-details h3');
    this.owner = this.rootElement.querySelector('.owner');
    this.description = this.rootElement.querySelector('.text-details .small');
    this.demoButton = this.rootElement.querySelector('.demo-button');
    this.carousel = this.rootElement.querySelector('.carousel');
    this.carouselList = this.carousel.querySelector('ul');
    this.licencePanel = this.rootElement.querySelector('.licence-panel');

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
      element.innerHTML = "\n      <div class=\"back-button icon-arrow-thick\"></div>\n      <div class=\"container\">\n        <div class=\"image-wrapper\"><img class=\"img-responsive content-type-image\" src=\"" + _contentTypePlaceholder2.default + "\"></div>\n        <div class=\"text-details\">\n          <h3></h3>\n          <div class=\"owner\"></div>\n          <p class=\"small\"></p>\n          <a class=\"button demo-button\" target=\"_blank\" aria-hidden=\"false\" href=\"https://h5p.org/chart\">Content Demo</a>\n        </div>\n      </div>\n      <div class=\"carousel\" role=\"region\" data-size=\"5\">\n        <span class=\"carousel-button previous\" aria-hidden=\"true\" disabled><span class=\"icon-arrow-thick\"></span></span>\n        <span class=\"carousel-button next\" aria-hidden=\"true\" disabled><span class=\"icon-arrow-thick\"></span></span>\n        <nav class=\"scroller\">\n          <ul></ul>\n        </nav>\n      </div>\n      <hr />\n      <div class=\"button-bar\">\n        <span class=\"button button-primary button-use\" aria-hidden=\"false\" data-id=\"H5P.Chart\">Use</span>\n        <span class=\"button button-inverse-primary button-install\" aria-hidden=\"true\" data-id=\"H5P.Chart\"><span class=\"icon-arrow-thick\"></span>Install</span>\n      </div>\n      <div class=\"panel-group\">\n        <div class=\"panel licence-panel\" aria-hidden=\"true\">\n          <div class=\"panel-header\" aria-expanded=\"false\" aria-controls=\"licence-panel\"><span class=\"icon-accordion-arrow\"></span> The Licence Info</div>\n          <div class=\"panel-body\" id=\"licence-panel\" aria-hidden=\"true\">\n            <div class=\"panel-body-inner\"></div>\n          </div>\n        </div>\n      </div>";

      return element;
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
      var _this = this;

      if (text.length > MAX_TEXT_SIZE_DESCRIPTION) {
        this.description.innerHTML = this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text) + " <span class=\"read-more link\">Read more</span>";
        this.description.querySelector('.read-more, .read-less').addEventListener('click', function () {
          return _this.toggleDescriptionExpanded(text);
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
      var _this2 = this;

      // flip boolean
      this.descriptionExpanded = !this.descriptionExpanded;

      if (this.descriptionExpanded) {
        this.description.innerHTML = text + " <span class=\"read-less link\">Read less</span>";
      } else {
        this.description.innerHTML = this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text) + " <span class=\"read-more link\">Read more</span>";
      }

      this.description.querySelector('.read-more, .read-less').addEventListener('click', function () {
        return _this2.toggleDescriptionExpanded(text);
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
        _show(this.licencePanel);
      } else {
        _hide(this.licencePanel);
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

var _hubServices = __webpack_require__(3);

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
        return console.debug('TODO, gui updates', contentType);
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
      this.view.setOwner(contentType.owner);
      this.view.setIsInstalled(!!contentType.installed);
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

var _functional = __webpack_require__(1);

var _elements = __webpack_require__(2);

var _eventful = __webpack_require__(0);

var _events = __webpack_require__(5);

var _contentTypePlaceholder = __webpack_require__(8);

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
      var useButtonConfig = { text: 'Use', cls: 'button-primary', icon: '' };
      var installButtonConfig = { text: 'install', cls: 'button-inverse-primary button-install', icon: 'icon-arrow-thick' };
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elements = __webpack_require__(2);

var _menu = __webpack_require__(21);

var _menu2 = _interopRequireDefault(_menu);

var _eventful = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    var _this = this;

    _classCallCheck(this, ContentBrowserView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // create elements
    this.rootElement = this.createElement(state);
    this.menubar = this.rootElement.querySelector('.navbar-nav');
    this.inputField = this.rootElement.querySelector('[role="search"] input');
    var inputButton = this.rootElement.querySelector('[role="search"] .input-group-addon');

    // input field
    this.inputField.addEventListener('keyup', function (event) {
      _this.fire('search', {
        element: event.target,
        query: event.target.value
      });
    });

    // input button
    inputButton.onclick = function () {
      this.parentElement.querySelector('#search-bar').focus();
    };
  }

  /**
   * Creates the menu group element
   *
   * @param {object} state
   *
   * @return {HTMLElement}
   */


  _createClass(ContentBrowserView, [{
    key: 'createElement',
    value: function createElement(state) {
      var menutitle = 'Browse content types';
      var menuId = 'content-type-filter';
      var searchText = 'Search for Content Types';

      // create element
      var element = document.createElement('div');
      element.innerHTML = '\n      <div class="menu-group">\n        <nav  role="menubar" class="navbar">\n          <span class="navbar-toggler navbar-toggler-right" aria-controls="' + menuId + '" aria-expanded="false">\n             <span>&#9776;</span>\n           </span>\n          <span class="navbar-brand">' + menutitle + '</span>\n          <ul id="' + menuId + '" class="navbar-nav" aria-hidden="true"></ul>\n        </nav>\n        <div class="input-group" role="search">\n          <input id="hub-search-bar" class="form-control form-control-rounded" type="text" placeholder="' + searchText + '" />\n          <div class="input-group-addon icon-search"></div>\n        </div>\n      </div>';

      return element;
    }

    /**
     * Adds a menu item
     *
     * @param {string} text
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'addMenuItem',
    value: function addMenuItem(text) {
      var _this2 = this;

      var element = document.createElement('li');
      element.setAttribute('role', 'menuitem');
      element.innerHTML = text;

      element.addEventListener('click', function (event) {
        _this2.fire('menu-selected', {
          element: event.target
        });
      });

      // sets first to be selected
      if (this.menubar.childElementCount == 1) {
        element.setAttribute('aria-selected', 'true');
      }

      // add to menu bar
      this.menubar.appendChild(element);
      return element;
    }

    /**
     * Clears the input field
     */

  }, {
    key: 'clearInputField',
    value: function clearInputField() {
      this.inputField.value = '';
    }

    /**
     * Checks if a menu item is the first child in the menu
     *
     * @param  {HTMLElement} menuItem
     * @return {boolean}
     */

  }, {
    key: 'isFirstMenuItem',
    value: function isFirstMenuItem(menuItem) {
      return menuItem === this.menubar.querySelectorAll('[role="menuitem"]')[0];
    }

    /**
     * Ensures the first menu item is selected
     */

  }, {
    key: 'resetMenuSelection',
    value: function resetMenuSelection() {
      var _this3 = this;

      this.menubar.querySelectorAll('[role="menuitem"]').forEach(function (menuItem) {
        return menuItem.setAttribute('aria-selected', _this3.isFirstMenuItem(menuItem).toString());
      });
    }
  }, {
    key: 'initMenu',
    value: function initMenu() {
      this.menubar.appendChild(document.createElement('span'));
      (0, _menu2.default)(this.rootElement);
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

var _eventful = __webpack_require__(0);

var _errors = __webpack_require__(4);

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
    ['All', 'My Content Types', 'Most Popular'].forEach(function (menuText) {
      return _this.view.addMenuItem(menuText);
    });
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

    // register listeners
    this.view.on('search', this.search, this);
    this.view.on('search', this.resetMenuSelection, this);
    this.view.on('menu-selected', this.applySearchFilter, this);
    this.view.on('menu-selected', this.clearInputField, this);
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
     *  Ensures the first menu element is selected
     */

  }, {
    key: "resetMenuSelection",
    value: function resetMenuSelection() {
      this.view.resetMenuSelection();
    }

    /**
     * Should apply a search filter
     */

  }, {
    key: "applySearchFilter",
    value: function applySearchFilter() {
      console.debug('ContentTypeSection: menu was clicked!', event);
    }
  }, {
    key: "clearInputField",
    value: function clearInputField(_ref2) {
      var element = _ref2.element;

      if (!this.view.isFirstMenuItem(element)) {
        this.view.clearInputField(element);
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

var _tabPanel = __webpack_require__(22);

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functional = __webpack_require__(1);

var _hubServices = __webpack_require__(3);

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
   * @param {Object} state
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hubServices = __webpack_require__(3);

var _hubServices2 = _interopRequireDefault(_hubServices);

var _eventful = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @mixes Eventful
 *
 * @fires Hub#upload
 */
var UploadSection = function () {
  function UploadSection(state) {
    var _this = this;

    _classCallCheck(this, UploadSection);

    var self = this;
    _extends(this, (0, _eventful.Eventful)());

    // services
    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

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
        self.fire('upload', json);
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
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

var _aria = __webpack_require__(7);

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
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

// Load library
H5P = H5P || {};
H5P.HubClient = __webpack_require__(9).default;
H5P.HubClient.renderErrorMessage = __webpack_require__(4).default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWE5ZmIwMzU0ZjQ3YWFjMGUxZTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9hcmlhLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3M/NmE3OCIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9tZW51LmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwibmFtZXMiOlsiRXZlbnRmdWwiLCJsaXN0ZW5lcnMiLCJvbiIsInR5cGUiLCJsaXN0ZW5lciIsInNjb3BlIiwidHJpZ2dlciIsInB1c2giLCJmaXJlIiwiZXZlbnQiLCJ0cmlnZ2VycyIsImV2ZXJ5IiwiY2FsbCIsInByb3BhZ2F0ZSIsInR5cGVzIiwiZXZlbnRmdWwiLCJzZWxmIiwiZm9yRWFjaCIsImN1cnJ5IiwiZm4iLCJhcml0eSIsImxlbmd0aCIsImYxIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJhcmd1bWVudHMiLCJhcHBseSIsImYyIiwiYXJnczIiLCJjb25jYXQiLCJjb21wb3NlIiwiZm5zIiwicmVkdWNlIiwiZiIsImciLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJuYW1lIiwiZWwiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJhdHRyaWJ1dGVFcXVhbHMiLCJ0b2dnbGVBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInBhcmVudCIsImNoaWxkIiwicXVlcnlTZWxlY3RvciIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZUNoaWxkIiwib2xkQ2hpbGQiLCJjbGFzc0xpc3RDb250YWlucyIsImNscyIsImNsYXNzTGlzdCIsIm5vZGVMaXN0VG9BcnJheSIsIm5vZGVMaXN0IiwiaGlkZSIsInNob3ciLCJ0b2dnbGVWaXNpYmlsaXR5IiwidmlzaWJsZSIsImVsZW1lbnQiLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJ3aW5kb3ciLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZXMiLCJjb250ZW50VHlwZSIsImlkIiwibnMiLCJnZXRBamF4VXJsIiwiYm9keSIsImZvcm1EYXRhIiwicmVuZGVyRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNsb3NlQnV0dG9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibWVzc2FnZUNvbnRlbnQiLCJ0aXRsZSIsImNvbnRlbnQiLCJtZXNzYWdlV3JhcHBlciIsImRpc21pc3NpYmxlIiwiYnV0dG9uIiwidW5kZWZpbmVkIiwibWVzc2FnZUJ1dHRvbiIsInJlbGF5Q2xpY2tFdmVudEFzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0b3BQcm9wYWdhdGlvbiIsImluaXQiLCJpc0V4cGFuZGVkIiwiaW5pdENvbGxhcHNpYmxlIiwidG9nZ2xlciIsImNvbGxhcHNpYmxlSWQiLCJjb2xsYXBzaWJsZSIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJIdWIiLCJzdGF0ZSIsImNvbnRlbnRUeXBlU2VjdGlvbiIsInVwbG9hZFNlY3Rpb24iLCJ2aWV3Iiwic2VydmljZXMiLCJzZXRQYW5lbFRpdGxlIiwiY2xvc2VQYW5lbCIsInNldFNlY3Rpb25UeXBlIiwidG9nZ2xlUGFuZWxPcGVuIiwiYmluZCIsImluaXRUYWJQYW5lbCIsImdldENvbnRlbnRUeXBlIiwic2V0VGl0bGUiLCJzZWN0aW9uSWQiLCJ0YWJDb25maWdzIiwiZ2V0RWxlbWVudCIsImNvbmZpZyIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiYWRkQm90dG9tQm9yZGVyIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsIk1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04iLCJpc0VtcHR5IiwidGV4dCIsIkNvbnRlbnRUeXBlRGV0YWlsVmlldyIsInJvb3RFbGVtZW50IiwiY3JlYXRlVmlldyIsInVzZUJ1dHRvbiIsImluc3RhbGxCdXR0b24iLCJpbWFnZSIsIm93bmVyIiwiZGVzY3JpcHRpb24iLCJkZW1vQnV0dG9uIiwiY2Fyb3VzZWwiLCJjYXJvdXNlbExpc3QiLCJsaWNlbmNlUGFuZWwiLCJsaWdodGJveCIsImNoaWxkRWxlbWVudENvdW50IiwidXJsIiwiYWx0IiwidGh1bWJuYWlsIiwic3JjIiwiZWxsaXBzaXMiLCJ0b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkIiwiZGVzY3JpcHRpb25FeHBhbmRlZCIsImlubmVyVGV4dCIsInNpemUiLCJzdWJzdHIiLCJpbnN0YWxsZWQiLCJDb250ZW50VHlwZURldGFpbCIsImluc3RhbGwiLCJ1cGRhdGUiLCJpbnN0YWxsQ29udGVudFR5cGUiLCJjb25zb2xlIiwiZGVidWciLCJzZXRJZCIsInNldERlc2NyaXB0aW9uIiwic2V0SW1hZ2UiLCJpY29uIiwic2V0RXhhbXBsZSIsImV4YW1wbGUiLCJzZXRPd25lciIsInNldElzSW5zdGFsbGVkIiwic2V0TGljZW5jZSIsImxpY2Vuc2UiLCJyZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsIiwic2NyZWVuc2hvdHMiLCJhZGRJbWFnZVRvQ2Fyb3VzZWwiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiaGFzQ2hpbGROb2RlcyIsImxhc3RDaGlsZCIsInJvdyIsImNyZWF0ZUNvbnRlbnRUeXBlUm93IiwidXNlQnV0dG9uQ29uZmlnIiwiaW5zdGFsbEJ1dHRvbkNvbmZpZyIsInN1bW1hcnkiLCJDb250ZW50VHlwZUxpc3QiLCJyZW1vdmVBbGxSb3dzIiwiYWRkUm93IiwiQ29udGVudEJyb3dzZXJWaWV3IiwibWVudWJhciIsImlucHV0RmllbGQiLCJpbnB1dEJ1dHRvbiIsInRhcmdldCIsInF1ZXJ5Iiwib25jbGljayIsInBhcmVudEVsZW1lbnQiLCJmb2N1cyIsIm1lbnV0aXRsZSIsIm1lbnVJZCIsInNlYXJjaFRleHQiLCJtZW51SXRlbSIsImlzRmlyc3RNZW51SXRlbSIsIkNvbnRlbnRUeXBlU2VjdGlvbiIsInNlYXJjaFNlcnZpY2UiLCJjb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZURldGFpbCIsImFkZE1lbnVJdGVtIiwibWVudVRleHQiLCJpbml0TWVudSIsInNlY3Rpb24iLCJhZGQiLCJzZWFyY2giLCJyZXNldE1lbnVTZWxlY3Rpb24iLCJhcHBseVNlYXJjaEZpbHRlciIsImNsZWFySW5wdXRGaWVsZCIsInNob3dEZXRhaWxWaWV3IiwiY2xvc2VEZXRhaWxWaWV3IiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsImNhdGNoIiwiZXJyb3IiLCJsb2FkQnlJZCIsIkFUVFJJQlVURV9EQVRBX0lEIiwiaXNPcGVuIiwiSHViVmlldyIsInJlbmRlclRhYlBhbmVsIiwicmVuZGVyUGFuZWwiLCJleHBhbmRlZCIsInRhYkNvbnRhaW5lckVsZW1lbnQiLCJwYW5lbCIsInNldFRpbWVvdXQiLCJ0YWJsaXN0IiwidGFiTGlzdFdyYXBwZXIiLCJ0YWJJZCIsInRhYlBhbmVsSWQiLCJ0YWIiLCJ0YWJQYW5lbCIsIlNlYXJjaFNlcnZpY2UiLCJmaWx0ZXJCeVF1ZXJ5Iiwic2NvcmUiLCJnZXRTZWFyY2hTY29yZSIsInNvcnQiLCJzb3J0U2VhcmNoUmVzdWx0cyIsImEiLCJiIiwicG9wdWxhcml0eSIsInF1ZXJpZXMiLCJzcGxpdCIsInF1ZXJ5U2NvcmVzIiwiZ2V0U2NvcmVGb3JFYWNoUXVlcnkiLCJ0cmltIiwiaGFzU3ViU3RyaW5nIiwiYXJyYXlIYXNTdWJTdHJpbmciLCJrZXl3b3JkcyIsIm5lZWRsZSIsImhheXN0YWNrIiwidG9Mb3dlckNhc2UiLCJzdWJTdHJpbmciLCJzdHJpbmciLCJBZGROdW1iZXIiLCJVcGxvYWRTZWN0aW9uIiwiaDVwVXBsb2FkIiwidGV4dENvbnRlbnQiLCJkYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmaWxlcyIsInVwbG9hZENvbnRlbnQiLCJBVFRSSUJVVEVfU0laRSIsImRpc2FibGUiLCJlbmFibGUiLCJ0b2dnbGVFbmFibGVkIiwiZW5hYmxlZCIsImhpZGRlbiIsImlzRGlzYWJsZWQiLCJ1cGRhdGVWaWV3IiwicHJldkJ1dHRvbiIsIm5leHRCdXR0b24iLCJsaXN0IiwidG90YWxDb3VudCIsInN0eWxlIiwid2lkdGgiLCJkaXNwbGF5Q291bnQiLCJtYXJnaW5MZWZ0IiwicG9zaXRpb24iLCJvbk5hdmlnYXRpb25CdXR0b25DbGljayIsInVwZGF0ZVN0YXRlIiwiaW5pdEltYWdlIiwidGFyZ2V0SWQiLCJoYW5kbGVEb21VcGRhdGUiLCJyZWNvcmQiLCJhZGRlZE5vZGVzIiwic3VidHJlZSIsImNoaWxkTGlzdCIsInVuU2VsZWN0QWxsIiwidW5FeHBhbmQiLCJtZW51SXRlbXMiLCJoaWRlQWxsIiwidGFicyIsInRhYlBhbmVscyIsInJlcXVpcmUiLCJINVAiLCJIdWJDbGllbnQi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MEIsZUFBMUIsQ0FBakI7QUFDQXNCLFdBQUtHLFFBQVFkLGFBQVIsT0FBMEJvTSxVQUExQixDQUFMO0FBQ0QsS0FURDtBQVVELEdBWEQ7QUFZRCxDOzs7Ozs7Ozs7QUN2Q0QsbUJBQUFrRSxDQUFRLEVBQVI7O0FBRUE7QUFDQUMsTUFBTUEsT0FBTyxFQUFiO0FBQ0FBLElBQUlDLFNBQUosR0FBZ0IsbUJBQUFGLENBQVEsQ0FBUixFQUEwQkcsT0FBMUM7QUFDQUYsSUFBSUMsU0FBSixDQUFjaE8sa0JBQWQsR0FBbUMsbUJBQUE4TixDQUFRLENBQVIsRUFBbUNHLE9BQXRFLEMiLCJmaWxlIjoiaDVwLWh1Yi1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWE5ZmIwMzU0ZjQ3YWFjMGUxZTYiLCIvKipcbiAqIEBtaXhpblxuICovXG5leHBvcnQgY29uc3QgRXZlbnRmdWwgPSAoKSA9PiAoe1xuICBsaXN0ZW5lcnM6IHt9LFxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gZXZlbnRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IFtzY29wZV1cbiAgICpcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge0V2ZW50ZnVsfVxuICAgKi9cbiAgb246IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBzY29wZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmIHtvYmplY3R9IFRyaWdnZXJcbiAgICAgKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzY29wZVxuICAgICAqL1xuICAgIGNvbnN0IHRyaWdnZXIgPSB7XG4gICAgICAnbGlzdGVuZXInOiBsaXN0ZW5lcixcbiAgICAgICdzY29wZSc6IHNjb3BlXG4gICAgfTtcblxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaCh0cmlnZ2VyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGaXJlIGV2ZW50LiBJZiBhbnkgb2YgdGhlIGxpc3RlbmVycyByZXR1cm5zIGZhbHNlLCByZXR1cm4gZmFsc2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtvYmplY3R9IFtldmVudF1cbiAgICpcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBmaXJlOiBmdW5jdGlvbih0eXBlLCBldmVudCkge1xuICAgIGNvbnN0IHRyaWdnZXJzID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XG5cbiAgICByZXR1cm4gdHJpZ2dlcnMuZXZlcnkoZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgcmV0dXJuIHRyaWdnZXIubGlzdGVuZXIuY2FsbCh0cmlnZ2VyLnNjb3BlIHx8IHRoaXMsIGV2ZW50KSAhPT0gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIExpc3RlbnMgZm9yIGV2ZW50cyBvbiBhbm90aGVyIEV2ZW50ZnVsLCBhbmQgcHJvcGFnYXRlIGl0IHRyb3VnaCB0aGlzIEV2ZW50ZnVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IHR5cGVzXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IGV2ZW50ZnVsXG4gICAqL1xuICBwcm9wYWdhdGU6IGZ1bmN0aW9uKHR5cGVzLCBldmVudGZ1bCkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICB0eXBlcy5mb3JFYWNoKHR5cGUgPT4gZXZlbnRmdWwub24odHlwZSwgZXZlbnQgPT4gc2VsZi5maXJlKHR5cGUsIGV2ZW50KSkpO1xuICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9taXhpbnMvZXZlbnRmdWwuanMiLCIvKipcbiAqIFJldHVybnMgYSBjdXJyaWVkIHZlcnNpb24gb2YgYSBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKlxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY3VycnkgPSBmdW5jdGlvbihmbikge1xuICBjb25zdCBhcml0eSA9IGZuLmxlbmd0aDtcblxuICByZXR1cm4gZnVuY3Rpb24gZjEoKSB7XG4gICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID49IGFyaXR5KSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGYyKCkge1xuICAgICAgICBjb25zdCBhcmdzMiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgIHJldHVybiBmMS5hcHBseShudWxsLCBhcmdzLmNvbmNhdChhcmdzMikpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICogQ29tcG9zZSBmdW5jdGlvbnMgdG9nZXRoZXIsIGV4ZWN1dGluZyBmcm9tIHJpZ2h0IHRvIGxlZnRcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uLi4ufSBmbnNcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXBvc2UgPSAoLi4uZm5zKSA9PiBmbnMucmVkdWNlKChmLCBnKSA9PiAoLi4uYXJncykgPT4gZihnKC4uLmFyZ3MpKSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggZWxlbWVudCBpbiBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZvckVhY2ggPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICBhcnIuZm9yRWFjaChmbik7XG59KTtcblxuLyoqXG4gKiBNYXBzIGEgZnVuY3Rpb24gdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBtYXAgPSBjdXJyeShmdW5jdGlvbiAoZm4sIGFycikge1xuICByZXR1cm4gYXJyLm1hcChmbik7XG59KTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgZmlsdGVyIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgZmlsdGVyID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5maWx0ZXIoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIHNvbWUgdG8gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBzb21lID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5zb21lKGZuKTtcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhbiBhcnJheSBjb250YWlucyBhIHZhbHVlXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb250YWlucyA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZSwgYXJyKSB7XG4gIHJldHVybiBhcnIuaW5kZXhPZih2YWx1ZSkgIT0gLTE7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IHdpdGhvdXQgdGhlIHN1cHBsaWVkIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlc1xuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCB3aXRob3V0ID0gY3VycnkoZnVuY3Rpb24gKHZhbHVlcywgYXJyKSB7XG4gIHJldHVybiBmaWx0ZXIodmFsdWUgPT4gIWNvbnRhaW5zKHZhbHVlLCB2YWx1ZXMpLCBhcnIpXG59KTtcblxuLyoqXG4gKiBUYWtlcyBhIHN0cmluZyB0aGF0IGlzIGVpdGhlciAndHJ1ZScgb3IgJ2ZhbHNlJyBhbmQgcmV0dXJucyB0aGUgb3Bwb3NpdGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYm9vbFxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGludmVyc2VCb29sZWFuU3RyaW5nID0gZnVuY3Rpb24gKGJvb2wpIHtcbiAgcmV0dXJuIChib29sICE9PSAndHJ1ZScpLnRvU3RyaW5nKCk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJpbXBvcnQge2N1cnJ5LCBpbnZlcnNlQm9vbGVhblN0cmluZ30gZnJvbSAnLi9mdW5jdGlvbmFsJ1xuXG4vKipcbiAqIEdldCBhbiBhdHRyaWJ1dGUgdmFsdWUgZnJvbSBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IGVsLmdldEF0dHJpYnV0ZShuYW1lKSk7XG5cbi8qKlxuICogU2V0IGFuIGF0dHJpYnV0ZSBvbiBhIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgdmFsdWUsIGVsKSA9PiBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpKTtcblxuLyoqXG4gKiBSZW1vdmUgYXR0cmlidXRlIGZyb20gaHRtbCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgYW4gYXR0cmlidXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaGFzQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5oYXNBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZSB0aGF0IGVxdWFsc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgYXR0cmlidXRlRXF1YWxzID0gY3VycnkoKG5hbWUsIHZhbHVlLCBlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKG5hbWUpID09PSB2YWx1ZSk7XG5cbi8qKlxuICogVG9nZ2xlcyBhbiBhdHRyaWJ1dGUgYmV0d2VlbiAndHJ1ZScgYW5kICdmYWxzZSc7XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVBdHRyaWJ1dGUgPSBjdXJyeSgobmFtZSwgZWwpID0+IHtcbiAgY29uc3QgdmFsdWUgPSBnZXRBdHRyaWJ1dGUobmFtZSwgZWwpO1xuICBzZXRBdHRyaWJ1dGUobmFtZSwgaW52ZXJzZUJvb2xlYW5TdHJpbmcodmFsdWUpLCBlbCk7XG59KTtcblxuLyoqXG4gKiBUaGUgYXBwZW5kQ2hpbGQoKSBtZXRob2QgYWRkcyBhIG5vZGUgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdCBvZiBjaGlsZHJlbiBvZiBhIHNwZWNpZmllZCBwYXJlbnQgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNoaWxkXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IGFwcGVuZENoaWxkID0gY3VycnkoKHBhcmVudCwgY2hpbGQpID0+IHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCkpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyBhIGRlc2NlbmRhbnQgb2YgdGhlIGVsZW1lbnQgb24gd2hpY2ggaXQgaXMgaW52b2tlZFxuICogdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgZ3JvdXAgb2Ygc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvciA9IGN1cnJ5KChzZWxlY3RvciwgZWwpID0+IGVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbm9uLWxpdmUgTm9kZUxpc3Qgb2YgYWxsIGVsZW1lbnRzIGRlc2NlbmRlZCBmcm9tIHRoZSBlbGVtZW50IG9uIHdoaWNoIGl0XG4gKiBpcyBpbnZva2VkIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIENTUyBzZWxlY3RvcnMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Tm9kZUxpc3R9XG4gKi9cbmV4cG9ydCBjb25zdCBxdWVyeVNlbGVjdG9yQWxsID0gY3VycnkoKHNlbGVjdG9yLCBlbCkgPT4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuXG4vKipcbiAqIFRoZSByZW1vdmVDaGlsZCgpIG1ldGhvZCByZW1vdmVzIGEgY2hpbGQgbm9kZSBmcm9tIHRoZSBET00uIFJldHVybnMgcmVtb3ZlZCBub2RlLlxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gcGFyZW50XG4gKiBAcGFyYW0ge05vZGV9IG9sZENoaWxkXG4gKlxuICogQHJldHVybiB7Tm9kZX1cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUNoaWxkID0gY3VycnkoKHBhcmVudCwgb2xkQ2hpbGQpID0+IHBhcmVudC5yZW1vdmVDaGlsZChvbGRDaGlsZCkpO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIG5vZGUgaGFzIGEgY2xhc3NcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgY2xhc3NMaXN0Q29udGFpbnMgPSBjdXJyeSgoY2xzLCBlbCkgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNscykpO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSBOb2RlTGlzdCB0byBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7Tm9kZUxpc3R9IG5vZGVMaXN0XG4gKlxuICogQHJldHVybiB7Tm9kZVtdfVxuICovXG5leHBvcnQgY29uc3Qgbm9kZUxpc3RUb0FycmF5ID0gbm9kZUxpc3QgPT4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZUxpc3QpO1xuXG4vKipcbiAqIEFkZHMgYXJpYS1oaWRkZW49dHJ1ZSB0byBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQWRkcyBhcmlhLWhpZGRlbj1mYWxzZSB0byBhbiBlbGVtZW50XG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyBhcmlhLWhpZGRlbiBvbiBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gY3VycnkoKHZpc2libGUsIGVsZW1lbnQpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9lbGVtZW50cy5qcyIsIi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gQ29udGVudFR5cGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWNoaW5lTmFtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBhdGNoVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1ham9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGg1cE1pbm9yVmVyc2lvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN1bW1hcnlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGljb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjcmVhdGVkQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1cGRhdGVkX0F0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaXNSZWNvbW1lbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBvcHVsYXJpdHlcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0W119IHNjcmVlbnNob3RzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGljZW5zZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGV4YW1wbGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0dXRvcmlhbFxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0ga2V5d29yZHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBvd25lclxuICogQHByb3BlcnR5IHtib29sZWFufSBpbnN0YWxsZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVzdHJpY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJTZXJ2aWNlcyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBhcGlSb290VXJsIH0pIHtcbiAgICB0aGlzLmFwaVJvb3RVcmwgPSBhcGlSb290VXJsO1xuXG4gICAgaWYoIXdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMpe1xuICAgICAgLy8gVE9ETyByZW1vdmUgdGhpcyB3aGVuIGRvbmUgdGVzdGluZyBmb3IgZXJyb3JzXG4gICAgICAvLyB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWVycm9ycy9OT19SRVNQT05TRS5qc29uYCwge1xuXG4gICAgICB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnQtdHlwZS1jYWNoZWAsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKVxuICAgICAgLnRoZW4odGhpcy5pc1ZhbGlkKVxuICAgICAgLnRoZW4oanNvbiA9PiBqc29uLmxpYnJhcmllcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSAge0NvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlfSByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW118RXJyb3JNZXNzYWdlPn1cbiAgICovXG4gIGlzVmFsaWQocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2UubWVzc2FnZUNvZGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGVbXT59XG4gICAqL1xuICBjb250ZW50VHlwZXMoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcy50aGVuKGNvbnRlbnRUeXBlcyA9PiB7XG4gICAgICByZXR1cm4gY29udGVudFR5cGVzLmZpbHRlcihjb250ZW50VHlwZSA9PiBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSA9PT0gbWFjaGluZU5hbWUpWzBdO1xuICAgIH0pO1xuXG4gICAgLypyZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnRfdHlwZV9jYWNoZS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSk7Ki9cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnN0YWxscyBhIGNvbnRlbnQgdHlwZSBvbiB0aGUgc2VydmVyXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBpbnN0YWxsQ29udGVudFR5cGUoaWQpIHtcbiAgICByZXR1cm4gZmV0Y2gobnMuZ2V0QWpheFVybCgnbGlicmFyeS1pbnN0YWxsJywge2lkOiBpZH0pLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBib2R5OiAnJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZHMgYSBjb250ZW50IHR5cGUgdG8gdGhlIHNlcnZlciBmb3IgdmFsaWRhdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge0Zvcm1EYXRhfSBmb3JtRGF0YSBGb3JtIGNvbnRhaW5pbmcgdGhlIGg1cCB0aGF0IHNob3VsZCBiZSB1cGxvYWRlZCBhcyAnaDVwJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXR1cm5zIHRoZSBwcm9taXNlIG9mIGEganNvbiBjb250YWluaW5nIHRoZSBjb250ZW50IGpzb24gYW5kIHRoZSBoNXAganNvblxuICAgKi9cbiAgdXBsb2FkQ29udGVudChmb3JtRGF0YSkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9bGlicmFyeS11cGxvYWRgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICBib2R5OiBmb3JtRGF0YVxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItc2VydmljZXMuanMiLCIvKipcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcudHlwZSAgICAgICAgIHR5cGUgb2YgdGhlIG1lc3NhZ2U6IGluZm8sIHN1Y2Nlc3MsIGVycm9yXG4gKiBAcGFyYW0gIHtib29sZWFufSAgY29uZmlnLmRpc21pc3NpYmxlICB3aGV0aGVyIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNtaXNzZWRcbiAqIEBwYXJhbSAge3N0cmluZ30gICBjb25maWcuY29udGVudCAgICAgIG1lc3NhZ2UgY29udGVudCB1c3VhbGx5IGEgJ2gzJyBhbmQgYSAncCdcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBkaXYgY29udGFpbmluZyB0aGUgbWVzc2FnZSBlbGVtZW50XG4gKi9cblxuLy9UT0RPIGhhbmRsZSBzdHJpbmdzLCBodG1sLCBiYWRseSBmb3JtZWQgb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJFcnJvck1lc3NhZ2UobWVzc2FnZSkge1xuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSAnY2xvc2UnO1xuICBjbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSAnJiN4MjcxNSc7XG5cbiAgY29uc3QgbWVzc2FnZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWVzc2FnZUNvbnRlbnQuY2xhc3NOYW1lID0gJ21lc3NhZ2UtY29udGVudCc7XG4gIG1lc3NhZ2VDb250ZW50LmlubmVySFRNTCA9ICc8aDE+JyArIG1lc3NhZ2UudGl0bGUgKyAnPC9oMT4nICsgJzxwPicgKyBtZXNzYWdlLmNvbnRlbnQgKyAnPC9wPic7XG5cbiAgY29uc3QgbWVzc2FnZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWVzc2FnZVdyYXBwZXIuY2xhc3NOYW1lID0gJ21lc3NhZ2UnICsgJyAnICsgYCR7bWVzc2FnZS50eXBlfWAgKyAobWVzc2FnZS5kaXNtaXNzaWJsZSA/ICcgZGlzbWlzc2libGUnIDogJycpO1xuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG4gIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VDb250ZW50KTtcblxuICBpZiAobWVzc2FnZS5idXR0b24gIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IG1lc3NhZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBtZXNzYWdlQnV0dG9uLmNsYXNzTmFtZSA9ICdidXR0b24nO1xuICAgIG1lc3NhZ2VCdXR0b24uaW5uZXJIVE1MID0gbWVzc2FnZS5idXR0b247XG4gICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQobWVzc2FnZUJ1dHRvbik7XG4gIH1cblxuICByZXR1cm4gbWVzc2FnZVdyYXBwZXI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXJyb3JzLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuXG4vKipcbiAqICBUcmFuc2Zvcm1zIGEgRE9NIGNsaWNrIGV2ZW50IGludG8gYW4gRXZlbnRmdWwncyBldmVudFxuICogIEBzZWUgRXZlbnRmdWxcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmcgfCBPYmplY3R9IHR5cGVcbiAqIEBwYXJhbSAge0V2ZW50ZnVsfSBldmVudGZ1bFxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgY29uc3QgcmVsYXlDbGlja0V2ZW50QXMgPSBjdXJyeShmdW5jdGlvbih0eXBlLCBldmVudGZ1bCwgZWxlbWVudCkge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGV2ZW50ZnVsLmZpcmUodHlwZSwge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGlkOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gZG9uJ3QgYnViYmxlXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50O1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCJpbXBvcnQge2luaXRDb2xsYXBzaWJsZX0gZnJvbSAnLi4vdXRpbHMvYXJpYSc7XG5cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBpbml0Q29sbGFwc2libGUoZWxlbWVudCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsImltcG9ydCB7YXR0cmlidXRlRXF1YWxzLCB0b2dnbGVBdHRyaWJ1dGUsIHRvZ2dsZVZpc2liaWxpdHl9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYXJpYS1leHBhbmRlZD10cnVlIG9uIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaXNFeHBhbmRlZCA9IGF0dHJpYnV0ZUVxdWFscyhcImFyaWEtZXhwYW5kZWRcIiwgJ3RydWUnKTtcblxuLyoqXG4gKiBUb2dnbGVzIGFyaWEtaGlkZGVuIG9uICdjb2xsYXBzaWJsZScgd2hlbiBhcmlhLWV4cGFuZGVkIGNoYW5nZXMgb24gJ3RvZ2dsZXInLFxuICogYW5kIHRvZ2dsZXMgYXJpYS1leHBhbmRlZCBvbiAndG9nZ2xlcicgb24gY2xpY2tcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBjb25zdCBpbml0Q29sbGFwc2libGUgPSAoZWxlbWVudCkgPT4ge1xuICAvLyBlbGVtZW50c1xuICBjb25zdCB0b2dnbGVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1jb250cm9sc11bYXJpYS1leHBhbmRlZF0nKTtcbiAgY29uc3QgY29sbGFwc2libGVJZCA9IHRvZ2dsZXIuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gIGNvbnN0IGNvbGxhcHNpYmxlID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtjb2xsYXBzaWJsZUlkfWApO1xuXG4gIC8vIHNldCBvYnNlcnZlciBvbiB0aXRsZSBmb3IgYXJpYS1leHBhbmRlZFxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB0b2dnbGVWaXNpYmlsaXR5KGlzRXhwYW5kZWQodG9nZ2xlciksIGNvbGxhcHNpYmxlKSk7XG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZSh0b2dnbGVyLCB7XG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcImFyaWEtZXhwYW5kZWRcIl1cbiAgfSk7XG5cbiAgLy8gU2V0IGNsaWNrIGxpc3RlbmVyIHRoYXQgdG9nZ2xlcyBhcmlhLWV4cGFuZGVkXG4gIHRvZ2dsZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIHRvZ2dsZXIpKTtcblxuICAvLyBpbml0aWFsaXplXG4gIHRvZ2dsZVZpc2liaWxpdHkoaXNFeHBhbmRlZCh0b2dnbGVyKSwgY29sbGFwc2libGUpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9hcmlhLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIWnBaWGRDYjNnOUlqQWdNQ0EwTURBZ01qSTFJajROQ2lBZ1BHUmxabk0rRFFvZ0lDQWdQSE4wZVd4bFBnMEtJQ0FnSUNBZ0xtTnNjeTB4SUhzTkNpQWdJQ0FnSUdacGJHdzZJRzV2Ym1VN0RRb2dJQ0FnSUNCOURRb05DaUFnSUNBZ0lDNWpiSE10TWlCN0RRb2dJQ0FnSUNCbWFXeHNPaUFqWXpaak5tTTNPdzBLSUNBZ0lDQWdmUTBLRFFvZ0lDQWdJQ0F1WTJ4ekxUTXNJQzVqYkhNdE5DQjdEUW9nSUNBZ0lDQm1hV3hzT2lBalptWm1PdzBLSUNBZ0lDQWdmUTBLRFFvZ0lDQWdJQ0F1WTJ4ekxUTWdldzBLSUNBZ0lDQWdiM0JoWTJsMGVUb2dNQzQzT3cwS0lDQWdJQ0FnZlEwS0lDQWdJRHd2YzNSNWJHVStEUW9nSUR3dlpHVm1jejROQ2lBZ1BIUnBkR3hsUG1OdmJuUmxiblFnZEhsd1pTQndiR0ZqWldodmJHUmxjbDh5UEM5MGFYUnNaVDROQ2lBZ1BHY2dhV1E5SWt4aGVXVnlYeklpSUdSaGRHRXRibUZ0WlQwaVRHRjVaWElnTWlJK0RRb2dJQ0FnUEdjZ2FXUTlJbU52Ym5SbGJuUmZkSGx3WlY5d2JHRmpaV2h2YkdSbGNpMHhYMk52Y0hraUlHUmhkR0V0Ym1GdFpUMGlZMjl1ZEdWdWRDQjBlWEJsSUhCc1lXTmxhRzlzWkdWeUxURWdZMjl3ZVNJK0RRb2dJQ0FnSUNBOGNtVmpkQ0JqYkdGemN6MGlZMnh6TFRFaUlIZHBaSFJvUFNJME1EQWlJR2hsYVdkb2REMGlNakkxSWk4K0RRb2dJQ0FnSUNBOGNtVmpkQ0JqYkdGemN6MGlZMnh6TFRJaUlIZzlJakV4TWk0MU1TSWdlVDBpTkRNdU5ERWlJSGRwWkhSb1BTSXhOell1T1RZaUlHaGxhV2RvZEQwaU1UTTFMalExSWlCeWVEMGlNVEFpSUhKNVBTSXhNQ0l2UGcwS0lDQWdJQ0FnUEdOcGNtTnNaU0JqYkdGemN6MGlZMnh6TFRNaUlHTjRQU0l4TXpZdU5qWWlJR041UFNJMk1TNDVPQ0lnY2owaU5DNDRNU0l2UGcwS0lDQWdJQ0FnUEdOcGNtTnNaU0JqYkdGemN6MGlZMnh6TFRNaUlHTjRQU0l4TlRFdU5Ea2lJR041UFNJMk1TNDVPQ0lnY2owaU5DNDRNU0l2UGcwS0lDQWdJQ0FnUEdOcGNtTnNaU0JqYkdGemN6MGlZMnh6TFRNaUlHTjRQU0l4TmpZdU1TSWdZM2s5SWpZeExqazRJaUJ5UFNJMExqZ3hJaTgrRFFvZ0lDQWdJQ0E4WnlCcFpEMGlYMGR5YjNWd1h5SWdaR0YwWVMxdVlXMWxQU0ltYkhRN1IzSnZkWEFtWjNRN0lqNE5DaUFnSUNBZ0lDQWdQR2NnYVdROUlsOUhjbTkxY0Y4eUlpQmtZWFJoTFc1aGJXVTlJaVpzZER0SGNtOTFjQ1puZERzaVBnMEtJQ0FnSUNBZ0lDQWdJRHh3WVhSb0lHbGtQU0pmUTI5dGNHOTFibVJmVUdGMGFGOGlJR1JoZEdFdGJtRnRaVDBpSm14ME8wTnZiWEJ2ZFc1a0lGQmhkR2dtWjNRN0lpQmpiR0Z6Y3owaVkyeHpMVFFpSUdROUlrMHlOak11TWpnc09UVXVNakZETWpZd0xEa3lMakEzTERJMU5TdzVNUzQxTERJME9DNDBNeXc1TVM0MVNESXlOM1k0U0RFNU9TNDFiQzB5TGpFM0xERXdMakkwWVRJMUxqZzBMREkxTGpnMExEQXNNQ3d4TERFeExqUTRMVEV1TmpNc01Ua3VPVE1zTVRrdU9UTXNNQ3d3TERFc01UUXVNemtzTlM0MU55d3hPQzR5Tml3eE9DNHlOaXd3TERBc01TdzFMalV5TERFekxqWXNNak11TVRFc01qTXVNVEVzTUN3d0xERXRNaTQ0TkN3eE1TNHdOU3d4T0M0Mk5Td3hPQzQyTlN3d0xEQXNNUzA0TGpBMkxEY3VOemtzT1N3NUxEQXNNQ3d4TFRRdU1USXNNUzR6TjBneU16WjJMVEl4YURFd0xqUXlZemN1TXpZc01Dd3hNaTQ0TXkweExqWXhMREUyTGpReUxUVnpOUzR6T0MwM0xqUTRMRFV1TXpndE1UTXVORFJETWpZNExqSXlMREV3TWk0eU9Td3lOall1TlRjc09UZ3VNelVzTWpZekxqSTRMRGsxTGpJeFdtMHRNVFVzTVRkakxURXVORElzTVM0eU1pMHpMamtzTVM0eU5TMDNMalF4TERFdU1qVklNak0yZGkweE5HZzFMall5WVRrdU5UY3NPUzQxTnl3d0xEQXNNU3czTERJdU9UTXNOeTR3TlN3M0xqQTFMREFzTUN3eExERXVPRFVzTkM0NU1rRTJMak16TERZdU16TXNNQ3d3TERFc01qUTRMak14TERFeE1pNHlOVm9pTHo0TkNpQWdJQ0FnSUNBZ0lDQThjR0YwYUNCcFpEMGlYMUJoZEdoZklpQmtZWFJoTFc1aGJXVTlJaVpzZER0UVlYUm9KbWQwT3lJZ1kyeGhjM005SW1Oc2N5MDBJaUJrUFNKTk1qQXlMamtzTVRFNUxqRXhZVGd1TVRJc09DNHhNaXd3TERBc01DMDNMakk0TERRdU5USnNMVEUyTFRFdU1qSXNOeTR5TWkwek1DNDVNa2d4TnpSMk1qSklNVFV6ZGkweU1rZ3hNeloyTlRab01UZDJMVEl4YURJeGRqSXhhREl3TGpNeFl5MHlMamN5TERBdE5TMHhMalV6TFRjdE0yRXhPUzR4T1N3eE9TNHhPU3d3TERBc01TMDBMamN6TFRRdU9ETXNNak11TlRnc01qTXVOVGdzTUN3d0xERXRNeTAyTGpac01UWXRNaTR5Tm1FNExqRXhMRGd1TVRFc01Dd3hMREFzTnk0eU5pMHhNUzQzTWxvaUx6NE5DaUFnSUNBZ0lDQWdQQzluUGcwS0lDQWdJQ0FnUEM5blBnMEtJQ0FnSUNBZ1BISmxZM1FnWTJ4aGMzTTlJbU5zY3kweklpQjRQU0l4TnpjdU5qWWlJSGs5SWpVM0xqWTJJaUIzYVdSMGFEMGlPVEl1TWpnaUlHaGxhV2RvZEQwaU9TNHpPQ0lnY25nOUlqTXVOU0lnY25rOUlqTXVOU0l2UGcwS0lDQWdJRHd2Wno0TkNpQWdQQzluUGcwS1BDOXpkbWMrRFFvPVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmdcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEh1YlZpZXcgZnJvbSAnLi9odWItdmlldyc7XG5pbXBvcnQgQ29udGVudFR5cGVTZWN0aW9uIGZyb20gJy4vY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24nO1xuaW1wb3J0IFVwbG9hZFNlY3Rpb24gZnJvbSAnLi91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbic7XG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSAnLi9odWItc2VydmljZXMnO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi91dGlscy9lcnJvcnMnO1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBIdWJTdGF0ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRpdGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2VjdGlvbklkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGV4cGFuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYXBpUm9vdFVybFxuICovXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEVycm9yTWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlcnJvckNvZGVcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBTZWxlY3RlZEVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpZFxuICovXG4vKipcbiAqIFNlbGVjdCBldmVudFxuICogQGV2ZW50IEh1YiNzZWxlY3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogRXJyb3IgZXZlbnRcbiAqIEBldmVudCBIdWIjZXJyb3JcbiAqIEB0eXBlIHtFcnJvck1lc3NhZ2V9XG4gKi9cbi8qKlxuICogVXBsb2FkIGV2ZW50XG4gKiBAZXZlbnQgSHViI3VwbG9hZFxuICogQHR5cGUge09iamVjdH1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBIdWIjZXJyb3JcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNvbnRyb2xsZXJzXG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24gPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uKHN0YXRlKTtcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBwcm9wYWdhdGUgY29udHJvbGxlciBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCcsICdlcnJvciddLCB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbik7XG4gICAgdGhpcy5wcm9wYWdhdGUoWyd1cGxvYWQnXSwgdGhpcy51cGxvYWRTZWN0aW9uKTtcblxuICAgIC8vIGhhbmRsZSBldmVudHNcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnNldFBhbmVsVGl0bGUsIHRoaXMpO1xuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMudmlldy5jbG9zZVBhbmVsLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMudmlldy5vbigndGFiLWNoYW5nZScsIHRoaXMudmlldy5zZXRTZWN0aW9uVHlwZSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcub24oJ3BhbmVsLWNoYW5nZScsIHRoaXMudmlldy50b2dnbGVQYW5lbE9wZW4uYmluZCh0aGlzLnZpZXcpLCB0aGlzLnZpZXcpO1xuXG4gICAgdGhpcy5pbml0VGFiUGFuZWwoc3RhdGUpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGNvbnRlbnQgdHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgZ2V0Q29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShtYWNoaW5lTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGUgb2YgdGhlIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0UGFuZWxUaXRsZSh7aWR9KcKge1xuICAgIHRoaXMuZ2V0Q29udGVudFR5cGUoaWQpLnRoZW4oKHt0aXRsZX0pID0+IHRoaXMudmlldy5zZXRUaXRsZSh0aXRsZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgdGFiIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICovXG4gIGluaXRUYWJQYW5lbCh7IHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJyB9KSB7XG4gICAgY29uc3QgdGFiQ29uZmlncyA9IFt7XG4gICAgICB0aXRsZTogJ0NyZWF0ZSBDb250ZW50JyxcbiAgICAgIGlkOiAnY29udGVudC10eXBlcycsXG4gICAgICBjb250ZW50OiB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5nZXRFbGVtZW50KCksXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1VwbG9hZCcsXG4gICAgICBpZDogJ3VwbG9hZCcsXG4gICAgICBjb250ZW50OiB0aGlzLnVwbG9hZFNlY3Rpb24uZ2V0RWxlbWVudCgpXG4gICAgfV07XG5cbiAgICAvLyBzZXRzIHRoZSBjb3JyZWN0IG9uZSBzZWxlY3RlZFxuICAgIHRhYkNvbmZpZ3NcbiAgICAgIC5maWx0ZXIoY29uZmlnID0+IGNvbmZpZy5pZCA9PT0gc2VjdGlvbklkKVxuICAgICAgLmZvckVhY2goY29uZmlnID0+IGNvbmZpZy5zZWxlY3RlZCA9IHRydWUpO1xuXG4gICAgdGFiQ29uZmlncy5mb3JFYWNoKHRhYkNvbmZpZyA9PiB0aGlzLnZpZXcuYWRkVGFiKHRhYkNvbmZpZykpO1xuICAgIHRoaXMudmlldy5hZGRCb3R0b21Cb3JkZXIoKTsgLy8gQWRkcyBhbiBhbmltYXRlZCBib3R0b20gYm9yZGVyIHRvIGVhY2ggdGFiXG4gICAgdGhpcy52aWV3LmluaXRUYWJQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBpbiB0aGUgdmlld1xuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3R5bGVzL21haW4uc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIHJlbW92ZUNoaWxkIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCI7XG5pbXBvcnQgaW5pdEltYWdlU2Nyb2xsZXIgZnJvbSBcImNvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXJcIjtcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBub0ljb24gZnJvbSAnLi4vLi4vaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmcnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7bnVtYmVyfVxuICovXG5jb25zdCBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OID0gMzAwO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBpZiBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXG4gKi9cbmNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSAoZWxlbWVudCwgdmlzaWJsZSkgPT4gKHZpc2libGUgPyBzaG93IDogaGlkZSkoZWxlbWVudCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RyaW5nIGlzIGVtcHR5XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc0VtcHR5ID0gKHRleHQpID0+ICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycpICYmICh0ZXh0Lmxlbmd0aCA9PT0gMCk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWxWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSB2aWV3XG4gICAgdGhpcy5yb290RWxlbWVudCA9IHRoaXMuY3JlYXRlVmlldygpO1xuXG4gICAgLy8gZ3JhYiByZWZlcmVuY2VzXG4gICAgdGhpcy51c2VCdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tdXNlJyk7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLWluc3RhbGwnKTtcbiAgICB0aGlzLmltYWdlID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC10eXBlLWltYWdlJyk7XG4gICAgdGhpcy50aXRsZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZGV0YWlscyBoMycpO1xuICAgIHRoaXMub3duZXIgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vd25lcicpO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWRldGFpbHMgLnNtYWxsJyk7XG4gICAgdGhpcy5kZW1vQnV0dG9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZGVtby1idXR0b24nKTtcbiAgICB0aGlzLmNhcm91c2VsID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWwnKTtcbiAgICB0aGlzLmNhcm91c2VsTGlzdCA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcigndWwnKTtcbiAgICB0aGlzLmxpY2VuY2VQYW5lbCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmxpY2VuY2UtcGFuZWwnKTtcblxuICAgIC8vIGluaXQgaW50ZXJhY3RpdmUgZWxlbWVudHNcbiAgICBpbml0UGFuZWwodGhpcy5saWNlbmNlUGFuZWwpO1xuICAgIGluaXRJbWFnZVNjcm9sbGVyKHRoaXMuY2Fyb3VzZWwpO1xuXG4gICAgLy8gZmlyZSBldmVudHMgb24gYnV0dG9uIGNsaWNrXG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2Nsb3NlJywgdGhpcywgdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYmFjay1idXR0b24nKSk7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHRoaXMsIHRoaXMudXNlQnV0dG9uKTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygnaW5zdGFsbCcsIHRoaXMsIHRoaXMuaW5zdGFsbEJ1dHRvbik7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgdmlldyBhcyBhIEhUTUxFbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlVmlldyAoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFjay1idXR0b24gaWNvbi1hcnJvdy10aGlja1wiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2Utd3JhcHBlclwiPjxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZSBjb250ZW50LXR5cGUtaW1hZ2VcIiBzcmM9XCIke25vSWNvbn1cIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtZGV0YWlsc1wiPlxuICAgICAgICAgIDxoMz48L2gzPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJvd25lclwiPjwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzPVwic21hbGxcIj48L3A+XG4gICAgICAgICAgPGEgY2xhc3M9XCJidXR0b24gZGVtby1idXR0b25cIiB0YXJnZXQ9XCJfYmxhbmtcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgaHJlZj1cImh0dHBzOi8vaDVwLm9yZy9jaGFydFwiPkNvbnRlbnQgRGVtbzwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbFwiIHJvbGU9XCJyZWdpb25cIiBkYXRhLXNpemU9XCI1XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIHByZXZpb3VzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGlzYWJsZWQ+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1idXR0b24gbmV4dFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRpc2FibGVkPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgIDxuYXYgY2xhc3M9XCJzY3JvbGxlclwiPlxuICAgICAgICAgIDx1bD48L3VsPlxuICAgICAgICA8L25hdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGhyIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWJhclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tcHJpbWFyeSBidXR0b24tdXNlXCIgYXJpYS1oaWRkZW49XCJmYWxzZVwiIGRhdGEtaWQ9XCJINVAuQ2hhcnRcIj5Vc2U8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1pbnZlcnNlLXByaW1hcnkgYnV0dG9uLWluc3RhbGxcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkYXRhLWlkPVwiSDVQLkNoYXJ0XCI+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPkluc3RhbGw8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ncm91cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgbGljZW5jZS1wYW5lbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkZXJcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBhcmlhLWNvbnRyb2xzPVwibGljZW5jZS1wYW5lbFwiPjxzcGFuIGNsYXNzPVwiaWNvbi1hY2NvcmRpb24tYXJyb3dcIj48L3NwYW4+IFRoZSBMaWNlbmNlIEluZm88L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiIGlkPVwibGljZW5jZS1wYW5lbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHktaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgaW1hZ2VzIGZyb20gdGhlIGNhcm91c2VsXG4gICAqL1xuICByZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsKCkge1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykuZm9yRWFjaChyZW1vdmVDaGlsZCh0aGlzLmNhcm91c2VsTGlzdCkpO1xuICAgIHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvckFsbCgnLmNhcm91c2VsLWxpZ2h0Ym94JykuZm9yRWFjaChyZW1vdmVDaGlsZCh0aGlzLmNhcm91c2VsKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGltYWdlIHRvIHRoZSBjYXJvdXNlbFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gaW1hZ2VcbiAgICovXG4gIGFkZEltYWdlVG9DYXJvdXNlbChpbWFnZSkge1xuICAgIC8vIGFkZCBsaWdodGJveFxuICAgIGNvbnN0IGxpZ2h0Ym94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGlnaHRib3guaWQgPSBgbGlnaHRib3gtJHt0aGlzLmNhcm91c2VsTGlzdC5jaGlsZEVsZW1lbnRDb3VudH1gO1xuICAgIGxpZ2h0Ym94LmNsYXNzTmFtZSA9ICdjYXJvdXNlbC1saWdodGJveCc7XG4gICAgbGlnaHRib3guc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgbGlnaHRib3guaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cIiR7aW1hZ2UudXJsfVwiIGFsdD1cIiR7aW1hZ2UuYWx0fVwiPmA7XG4gICAgdGhpcy5jYXJvdXNlbC5hcHBlbmRDaGlsZChsaWdodGJveCk7XG5cbiAgICAvLyBhZGQgdGh1bWJuYWlsXG4gICAgY29uc3QgdGh1bWJuYWlsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB0aHVtYm5haWwuY2xhc3NOYW1lID0gJ3NsaWRlJztcbiAgICB0aHVtYm5haWwuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHtpbWFnZS51cmx9XCIgYWx0PVwiJHtpbWFnZS5hbHR9XCIgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIGFyaWEtY29udHJvbHM9XCIke2xpZ2h0Ym94LmlkfVwiIC8+YDtcbiAgICB0aGlzLmNhcm91c2VsTGlzdC5hcHBlbmRDaGlsZCh0aHVtYm5haWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGltYWdlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAgICovXG4gIHNldEltYWdlKHNyYykge1xuICAgIHRoaXMuaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMgfHwgbm9JY29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldElkKGlkKSB7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gICAgdGhpcy51c2VCdXR0b24uc2V0QXR0cmlidXRlKEFUVFJJQlVURV9DT05URU5UX1RZUEVfSUQsIGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBgJHt0aXRsZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovXG4gIHNldERlc2NyaXB0aW9uKHRleHQpIHtcbiAgICBpZih0ZXh0Lmxlbmd0aCA+IE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04pIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGhpcy5lbGxpcHNpcyhNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OLCB0ZXh0KX0gPHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvblxuICAgICAgICAucXVlcnlTZWxlY3RvcignLnJlYWQtbW9yZSwgLnJlYWQtbGVzcycpXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgUmVhZCBsZXNzIGFuZCBSZWFkIG1vcmUgdGV4dFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgdG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSB7XG4gICAgLy8gZmxpcCBib29sZWFuXG4gICAgdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkID0gIXRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZDtcblxuICAgIGlmKHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCkge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0ZXh0fSA8c3BhbiBjbGFzcz1cInJlYWQtbGVzcyBsaW5rXCI+UmVhZCBsZXNzPC9zcGFuPmA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0aGlzLmVsbGlwc2lzKE1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04sIHRleHQpfSA8c3BhbiBjbGFzcz1cInJlYWQtbW9yZSBsaW5rXCI+UmVhZCBtb3JlPC9zcGFuPmA7XG4gICAgfVxuXG4gICAgdGhpcy5kZXNjcmlwdGlvblxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5yZWFkLW1vcmUsIC5yZWFkLWxlc3MnKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkKHRleHQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG9ydGVucyBhIHN0cmluZywgYW5kIHB1dHMgYW4gZWxpcHNpcyBhdCB0aGUgZW5kXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBlbGxpcHNpcyhzaXplLCB0ZXh0KSB7XG4gICAgcmV0dXJuIGAke3RleHQuc3Vic3RyKDAsIHNpemUpfS4uLmA7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbGljZW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKi9cbiAgc2V0TGljZW5jZSh0eXBlKSB7XG4gICAgaWYodHlwZSl7XG4gICAgICB0aGlzLmxpY2VuY2VQYW5lbC5xdWVyeVNlbGVjdG9yKCcucGFuZWwtYm9keS1pbm5lcicpLmlubmVyVGV4dCA9IHR5cGU7XG4gICAgICBzaG93KHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoaWRlKHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbG9uZyBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3duZXJcbiAgICovXG4gIHNldE93bmVyKG93bmVyKSB7XG4gICAgaWYob3duZXIpIHtcbiAgICAgIHRoaXMub3duZXIuaW5uZXJIVE1MID0gYEJ5ICR7b3duZXJ9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLm93bmVyLmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBleGFtcGxlIHVybFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBzZXRFeGFtcGxlKHVybCkge1xuICAgIHRoaXMuZGVtb0J1dHRvbi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwgfHwgJyMnKTtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuZGVtb0J1dHRvbiwgIWlzRW1wdHkodXJsKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBpZiB0aGUgY29udGVudCB0eXBlIGlzIGluc3RhbGxlZFxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluc3RhbGxlZFxuICAgKi9cbiAgc2V0SXNJbnN0YWxsZWQoaW5zdGFsbGVkKSB7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLnVzZUJ1dHRvbiwgaW5zdGFsbGVkKTtcbiAgICB0b2dnbGVWaXNpYmlsaXR5KHRoaXMuaW5zdGFsbEJ1dHRvbiwgIWluc3RhbGxlZCk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlRGV0YWlsVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXdcIjtcbmltcG9ydCBIdWJTZXJ2aWNlcyBmcm9tIFwiLi4vaHViLXNlcnZpY2VzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVEZXRhaWwge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIHZpZXdzXG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVEZXRhaWxWaWV3KHN0YXRlKTtcbiAgICB0aGlzLnZpZXcub24oJ2luc3RhbGwnLCB0aGlzLmluc3RhbGwsIHRoaXMpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnY2xvc2UnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgdGhlIGRldGFpbCB2aWV3XG4gICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGxvYWRCeUlkKGlkKSB7XG4gICAgdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShpZClcbiAgICAgIC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpXG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBDb250ZW50IFR5cGUgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gICBpbnN0YWxsKHtpZH0pIHtcbiAgICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUpXG4gICAgICAgLnRoZW4obWFjaGluZU5hbWUgPT4gdGhpcy5zZXJ2aWNlcy5pbnN0YWxsQ29udGVudFR5cGUobWFjaGluZU5hbWUpKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IGNvbnNvbGUuZGVidWcoJ1RPRE8sIGd1aSB1cGRhdGVzJywgY29udGVudFR5cGUpKVxuICAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IHdpdGggdGhlIGNvbnRlbnQgdHlwZSBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqL1xuICB1cGRhdGUoY29udGVudFR5cGUpIHtcbiAgICB0aGlzLnZpZXcuc2V0SWQoY29udGVudFR5cGUubWFjaGluZU5hbWUpO1xuICAgIHRoaXMudmlldy5zZXRUaXRsZShjb250ZW50VHlwZS50aXRsZSk7XG4gICAgdGhpcy52aWV3LnNldERlc2NyaXB0aW9uKGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uKTtcbiAgICB0aGlzLnZpZXcuc2V0SW1hZ2UoY29udGVudFR5cGUuaWNvbik7XG4gICAgdGhpcy52aWV3LnNldEV4YW1wbGUoY29udGVudFR5cGUuZXhhbXBsZSk7XG4gICAgdGhpcy52aWV3LnNldE93bmVyKGNvbnRlbnRUeXBlLm93bmVyKTtcbiAgICB0aGlzLnZpZXcuc2V0SXNJbnN0YWxsZWQoISFjb250ZW50VHlwZS5pbnN0YWxsZWQpO1xuICAgIHRoaXMudmlldy5zZXRMaWNlbmNlKGNvbnRlbnRUeXBlLmxpY2Vuc2UpO1xuXG4gICAgLy8gdXBkYXRlIGNhcm91c2VsXG4gICAgdGhpcy52aWV3LnJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwoKTtcbiAgICBjb250ZW50VHlwZS5zY3JlZW5zaG90cy5mb3JFYWNoKHRoaXMudmlldy5hZGRJbWFnZVRvQ2Fyb3VzZWwsIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSwgcmVtb3ZlQ2hpbGQgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBub0ljb24gZnJvbSAnLi4vLi4vaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmcnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3RWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtbGlzdCc7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCByb3dzIGZyb20gcm9vdCBlbGVtZW50XG4gICAqL1xuICByZW1vdmVBbGxSb3dzKCkge1xuICAgIHdoaWxlKHRoaXMucm9vdEVsZW1lbnQuaGFzQ2hpbGROb2RlcygpICl7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMucm9vdEVsZW1lbnQubGFzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHJvd1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgYWRkUm93KGNvbnRlbnRUeXBlKSB7XG4gICAgY29uc3Qgcm93ID0gdGhpcy5jcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgdGhpcyk7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3Jvdy1zZWxlY3RlZCcsIHRoaXMsIHJvdyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChyb3cpXG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSBDb250ZW50IFR5cGUgY29uZmlndXJhdGlvbiBhbmQgY3JlYXRlcyBhIHJvdyBkb21cbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gc2NvcGVcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgc2NvcGUpIHtcbiAgICAvLyByb3cgaXRlbVxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuaWQgPSBgY29udGVudC10eXBlLSR7Y29udGVudFR5cGUubWFjaGluZU5hbWV9YDtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcblxuICAgIC8vIGNyZWF0ZSBidXR0b24gY29uZmlnXG4gICAgY29uc3QgdXNlQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnVXNlJywgY2xzOiAnYnV0dG9uLXByaW1hcnknLCBpY29uOiAnJyB9O1xuICAgIGNvbnN0IGluc3RhbGxCdXR0b25Db25maWcgPSB7IHRleHQ6ICdpbnN0YWxsJywgY2xzOiAnYnV0dG9uLWludmVyc2UtcHJpbWFyeSBidXR0b24taW5zdGFsbCcsIGljb246ICdpY29uLWFycm93LXRoaWNrJ307XG4gICAgY29uc3QgYnV0dG9uID0gY29udGVudFR5cGUuaW5zdGFsbGVkID8gIHVzZUJ1dHRvbkNvbmZpZzogaW5zdGFsbEJ1dHRvbkNvbmZpZztcblxuICAgIGNvbnN0IHRpdGxlID0gY29udGVudFR5cGUudGl0bGUgfHwgY29udGVudFR5cGUubWFjaGluZU5hbWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBjb250ZW50VHlwZS5zdW1tYXJ5IHx8ICcnO1xuXG4gICAgY29uc3QgaW1hZ2UgPSBjb250ZW50VHlwZS5pY29uIHx8IG5vSWNvbjtcblxuICAgIC8vIGNyZWF0ZSBodG1sXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBzcmM9XCIke2ltYWdlfVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gJHtidXR0b24uY2xzfVwiIGRhdGEtaWQ9XCIke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfVwiIHRhYmluZGV4PVwiMFwiPjxzcGFuIGNsYXNzPVwiJHtidXR0b24uaWNvbn1cIj48L3NwYW4+JHtidXR0b24udGV4dH08L3NwYW4+XG4gICAgICA8aDQ+JHt0aXRsZX08L2g0PlxuICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+JHtkZXNjcmlwdGlvbn08L2Rpdj5cbiAgIGA7XG5cbiAgICAvLyBoYW5kbGUgdXNlIGJ1dHRvblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1wcmltYXJ5Jyk7XG4gICAgaWYodXNlQnV0dG9uKXtcbiAgICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCBzY29wZSwgdXNlQnV0dG9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC12aWV3LmpzIiwiaW1wb3J0IENvbnRldFR5cGVMaXN0VmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtbGlzdC12aWV3XCI7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIFJvdyBzZWxlY3RlZCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogVXBkYXRlIGNvbnRlbnQgdHlwZSBsaXN0IGV2ZW50XG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YiNzZWxlY3RcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3Qge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gYWRkIHRoZSB2aWV3XG4gICAgdGhpcy52aWV3ID0gbmV3IENvbnRldFR5cGVMaXN0VmlldyhzdGF0ZSk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydyb3ctc2VsZWN0ZWQnLCAnc2VsZWN0J10sIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZSB0aGlzIGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdGhpcy52aWV3LmhpZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHRoaXMgZWxlbWVudFxuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgbGlzdCB3aXRoIG5ldyBjb250ZW50IHR5cGVzXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gICAqL1xuICB1cGRhdGUoY29udGVudFR5cGVzKSB7XG4gICAgdGhpcy52aWV3LnJlbW92ZUFsbFJvd3MoKTtcbiAgICBjb250ZW50VHlwZXMuZm9yRWFjaCh0aGlzLnZpZXcuYWRkUm93LCB0aGlzLnZpZXcpO1xuICAgIHRoaXMuZmlyZSgndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0Jywge30pO1xuICB9XG5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmlld3Mgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3QuanMiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlLCBxdWVyeVNlbGVjdG9yQWxsIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgaW5pdE1lbnUgZnJvbSAnY29tcG9uZW50cy9tZW51JztcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQGNsYXNzIENvbnRlbnRCcm93c2VyVmlld1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRCcm93c2VyVmlldyB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRzXG4gICAgdGhpcy5yb290RWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudChzdGF0ZSk7XG4gICAgdGhpcy5tZW51YmFyID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyLW5hdicpO1xuICAgIHRoaXMuaW5wdXRGaWVsZCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignW3JvbGU9XCJzZWFyY2hcIl0gaW5wdXQnKTtcbiAgICBjb25zdCBpbnB1dEJ1dHRvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignW3JvbGU9XCJzZWFyY2hcIl0gLmlucHV0LWdyb3VwLWFkZG9uJyk7XG5cbiAgICAvLyBpbnB1dCBmaWVsZFxuICAgIHRoaXMuaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgnc2VhcmNoJywge1xuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXQsXG4gICAgICAgIHF1ZXJ5OiBldmVudC50YXJnZXQudmFsdWVcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gaW5wdXQgYnV0dG9uXG4gICAgaW5wdXRCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYmFyJykuZm9jdXMoKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgbWVudSBncm91cCBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZUVsZW1lbnQoc3RhdGUpIHtcbiAgICBsZXQgbWVudXRpdGxlID0gJ0Jyb3dzZSBjb250ZW50IHR5cGVzJztcbiAgICBsZXQgbWVudUlkID0gJ2NvbnRlbnQtdHlwZS1maWx0ZXInO1xuICAgIGxldCBzZWFyY2hUZXh0ID0gJ1NlYXJjaCBmb3IgQ29udGVudCBUeXBlcyc7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudFxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtZW51LWdyb3VwXCI+XG4gICAgICAgIDxuYXYgIHJvbGU9XCJtZW51YmFyXCIgY2xhc3M9XCJuYXZiYXJcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdmJhci10b2dnbGVyIG5hdmJhci10b2dnbGVyLXJpZ2h0XCIgYXJpYS1jb250cm9scz1cIiR7bWVudUlkfVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgIDxzcGFuPiYjOTc3Njs8L3NwYW4+XG4gICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdmJhci1icmFuZFwiPiR7bWVudXRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICA8dWwgaWQ9XCIke21lbnVJZH1cIiBjbGFzcz1cIm5hdmJhci1uYXZcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3VsPlxuICAgICAgICA8L25hdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCIgcm9sZT1cInNlYXJjaFwiPlxuICAgICAgICAgIDxpbnB1dCBpZD1cImh1Yi1zZWFyY2gtYmFyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXJvdW5kZWRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiJHtzZWFyY2hUZXh0fVwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGljb24tc2VhcmNoXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBtZW51IGl0ZW1cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBhZGRNZW51SXRlbSh0ZXh0KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWl0ZW0nKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5maXJlKCdtZW51LXNlbGVjdGVkJywge1xuICAgICAgICBlbGVtZW50OiBldmVudC50YXJnZXRcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0cyBmaXJzdCB0byBiZSBzZWxlY3RlZFxuICAgIGlmKHRoaXMubWVudWJhci5jaGlsZEVsZW1lbnRDb3VudCA9PSAxKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgfVxuXG4gICAgLy8gYWRkIHRvIG1lbnUgYmFyXG4gICAgdGhpcy5tZW51YmFyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgaW5wdXQgZmllbGRcbiAgICovXG4gIGNsZWFySW5wdXRGaWVsZCgpIHtcbiAgICB0aGlzLmlucHV0RmllbGQudmFsdWUgPSAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBtZW51IGl0ZW0gaXMgdGhlIGZpcnN0IGNoaWxkIGluIHRoZSBtZW51XG4gICAqXG4gICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBtZW51SXRlbVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNGaXJzdE1lbnVJdGVtKG1lbnVJdGVtKSB7XG4gICAgcmV0dXJuIG1lbnVJdGVtID09PSB0aGlzLm1lbnViYXIucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJtZW51aXRlbVwiXScpWzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhlIGZpcnN0IG1lbnUgaXRlbSBpcyBzZWxlY3RlZFxuICAgKi9cbiAgcmVzZXRNZW51U2VsZWN0aW9uKCkge1xuICAgIHRoaXMubWVudWJhci5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cIm1lbnVpdGVtXCJdJylcbiAgICAgIC5mb3JFYWNoKG1lbnVJdGVtID0+XG4gICAgICAgIG1lbnVJdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHRoaXMuaXNGaXJzdE1lbnVJdGVtKG1lbnVJdGVtKS50b1N0cmluZygpKVxuICAgICAgKTtcbiAgfVxuXG4gIGluaXRNZW51KCkge1xuICAgIHRoaXMubWVudWJhci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpO1xuICAgIGluaXRNZW51KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsImltcG9ydCBDb250ZW50VHlwZVNlY3Rpb25WaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXdcIjtcbmltcG9ydCBTZWFyY2hTZXJ2aWNlIGZyb20gXCIuLi9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZVwiO1xuaW1wb3J0IENvbnRlbnRUeXBlTGlzdCBmcm9tICcuLi9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdCc7XG5pbXBvcnQgQ29udGVudFR5cGVEZXRhaWwgZnJvbSAnLi4vY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsJztcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMvZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb25WaWV3KHN0YXRlKTtcblxuICAgIC8vIGNvbnRyb2xsZXJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZSh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbCA9IG5ldyBDb250ZW50VHlwZURldGFpbCh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XG5cbiAgICAvLyBhZGQgbWVudSBpdGVtc1xuICAgIFsnQWxsJywgJ015IENvbnRlbnQgVHlwZXMnLCAnTW9zdCBQb3B1bGFyJ11cbiAgICAgIC5mb3JFYWNoKG1lbnVUZXh0ID0+IHRoaXMudmlldy5hZGRNZW51SXRlbShtZW51VGV4dCkpO1xuICAgIHRoaXMudmlldy5pbml0TWVudSgpO1xuXG4gICAgLy8gRWxlbWVudCBmb3IgaG9sZGluZyBsaXN0IGFuZCBkZXRhaWxzIHZpZXdzXG4gICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY29udGVudC10eXBlLXNlY3Rpb24nKTtcblxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBzZWN0aW9uO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZUxpc3QuZ2V0RWxlbWVudCgpKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVEZXRhaWwuZ2V0RWxlbWVudCgpKTtcblxuICAgIHRoaXMudmlldy5nZXRFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5yb290RWxlbWVudCk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0J10sIHRoaXMuY29udGVudFR5cGVMaXN0KTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCddLCB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsKTtcblxuICAgIC8vIHJlZ2lzdGVyIGxpc3RlbmVyc1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5zZWFyY2gsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5yZXNldE1lbnVTZWxlY3Rpb24sIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMuYXBwbHlTZWFyY2hGaWx0ZXIsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignbWVudS1zZWxlY3RlZCcsIHRoaXMuY2xlYXJJbnB1dEZpZWxkLCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5vbigncm93LXNlbGVjdGVkJywgdGhpcy5zaG93RGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignY2xvc2UnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5vbignc2VsZWN0JywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xuXG4gICAgdGhpcy5pbml0Q29udGVudFR5cGVMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdCB3aXRoIGEgc2VhcmNoXG4gICAqL1xuICBpbml0Q29udGVudFR5cGVMaXN0KCkge1xuICAgIC8vIGluaXRpYWxpemUgYnkgc2VhcmNoXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChcIlwiKVxuICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKVxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZmlyZSgnZXJyb3InLCBlcnJvcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGEgc2VhcmNoIGFuZCB1cGRhdGVzIHRoZSBjb250ZW50IHR5cGUgbGlzdFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcbiAgICovXG4gIHNlYXJjaCh7cXVlcnl9KSB7XG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChxdWVyeSlcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSk7XG4gIH1cblxuICAvKipcbiAgICogIEVuc3VyZXMgdGhlIGZpcnN0IG1lbnUgZWxlbWVudCBpcyBzZWxlY3RlZFxuICAgKi9cbiAgcmVzZXRNZW51U2VsZWN0aW9uKCkge1xuICAgIHRoaXMudmlldy5yZXNldE1lbnVTZWxlY3Rpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYXBwbHkgYSBzZWFyY2ggZmlsdGVyXG4gICAqL1xuICBhcHBseVNlYXJjaEZpbHRlcigpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdDb250ZW50VHlwZVNlY3Rpb246IG1lbnUgd2FzIGNsaWNrZWQhJywgZXZlbnQpO1xuICB9XG5cbiAgY2xlYXJJbnB1dEZpZWxkKHtlbGVtZW50fSkge1xuICAgIGlmICghdGhpcy52aWV3LmlzRmlyc3RNZW51SXRlbShlbGVtZW50KSkge1xuICAgICAgdGhpcy52aWV3LmNsZWFySW5wdXRGaWVsZChlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgZGV0YWlsIHZpZXdcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzaG93RGV0YWlsVmlldyh7aWR9KSB7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwubG9hZEJ5SWQoaWQpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuc2hvdygpO1xuICB9XG5cblxuICAvKipcbiAgICogQ2xvc2UgZGV0YWlsIHZpZXdcbiAgICovXG4gIGNsb3NlRGV0YWlsVmlldygpIHtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwiaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiXG5pbXBvcnQgaW5pdFRhYlBhbmVsIGZyb20gXCJjb21wb25lbnRzL3RhYi1wYW5lbFwiXG5pbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBhdHRyaWJ1dGVFcXVhbHMsIGdldEF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi91dGlscy9ldmVudHMnO1xuLyoqXG4gKiBUYWIgY2hhbmdlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyN0YWItY2hhbmdlXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIFBhbmVsIG9wZW4gb3IgY2xvc2UgZXZlbnRcbiAqIEBldmVudCBIdWJWaWV3I3BhbmVsLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0RBVEFfSUQgPSAnZGF0YS1pZCc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGlzT3BlbiA9IGhhc0F0dHJpYnV0ZSgnb3BlbicpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViVmlldyN0YWItY2hhbmdlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlZpZXcge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICB0aGlzLnJlbmRlclRhYlBhbmVsKHN0YXRlKTtcbiAgICB0aGlzLnJlbmRlclBhbmVsKHN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHBhbmVsXG4gICAqL1xuICBjbG9zZVBhbmVsKCkge1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0aXRsZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICovXG4gIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4cGFuZGVkXG4gICAqL1xuICByZW5kZXJQYW5lbCh7dGl0bGUgPSAnJywgc2VjdGlvbklkID0gJ2NvbnRlbnQtdHlwZXMnLCBleHBhbmRlZCA9IGZhbHNlfSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50aXRsZS5jbGFzc05hbWUgKz0gXCJwYW5lbC1oZWFkZXIgaWNvbi1odWItaWNvblwiO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgKCEhZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMudGl0bGUuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YCk7XG4gICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygncGFuZWwtY2hhbmdlJywgdGhpcywgdGhpcy50aXRsZSk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5ib2R5LmNsYXNzTmFtZSArPSBcInBhbmVsLWJvZHlcIjtcbiAgICB0aGlzLmJvZHkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICghZXhwYW5kZWQpLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMuYm9keS5pZCA9IGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWA7XG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lICs9IGBwYW5lbCBoNXAtc2VjdGlvbi0ke3NlY3Rpb25JZH1gO1xuICAgIGlmKGV4cGFuZGVkKXtcbiAgICAgIHRoaXMucGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgIH1cbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5ib2R5KTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NOYW1lICs9IGBoNXAgaDVwLWh1YmA7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBhbmVsKTtcbiAgICBpbml0UGFuZWwodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGlmIHBhbmVsIGlzIG9wZW4sIHRoaXMgaXMgdXNlZCBmb3Igb3V0ZXIgYm9yZGVyIGNvbG9yXG4gICAqL1xuICB0b2dnbGVQYW5lbE9wZW4oKSB7XG4gICAgbGV0IHBhbmVsID0gdGhpcy5wYW5lbDtcbiAgICBpZihpc09wZW4ocGFuZWwpKSB7XG4gICAgICBwYW5lbC5yZW1vdmVBdHRyaWJ1dGUoJ29wZW4nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwYW5lbC5zZXRBdHRyaWJ1dGUoJ29wZW4nLCAnJyk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cGFuZWwucXVlcnlTZWxlY3RvcignI2h1Yi1zZWFyY2gtYmFyJykuZm9jdXMoKX0sMjApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBkb20gZm9yIHRoZSB0YWIgcGFuZWxcbiAgICovXG4gIHJlbmRlclRhYlBhbmVsKHN0YXRlKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFibGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy50YWJsaXN0LmNsYXNzTmFtZSArPSBcInRhYmxpc3RcIjtcbiAgICB0aGlzLnRhYmxpc3Quc2V0QXR0cmlidXRlICgncm9sZScsICd0YWJsaXN0Jyk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJMaXN0V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy50YWJsaXN0KTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuY2xhc3NOYW1lICs9ICd0YWItcGFuZWwnO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRhYkxpc3RXcmFwcGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgdGFiXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNlbGVjdGVkXG4gICAqL1xuICBhZGRUYWIoe3RpdGxlLCBpZCwgY29udGVudCwgc2VsZWN0ZWQgPSBmYWxzZX0pIHtcbiAgICBjb25zdCB0YWJJZCA9IGB0YWItJHtpZH1gO1xuICAgIGNvbnN0IHRhYlBhbmVsSWQgPSBgdGFiLXBhbmVsLSR7aWR9YDtcblxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdGFiLmNsYXNzTmFtZSArPSAndGFiJztcbiAgICB0YWIuaWQgPSB0YWJJZDtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgdGFiUGFuZWxJZCk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHNlbGVjdGVkLnRvU3RyaW5nKCkpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0RBVEFfSUQsIGlkKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYicpO1xuICAgIHRhYi5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICByZWxheUNsaWNrRXZlbnRBcygndGFiLWNoYW5nZScsIHRoaXMsIHRhYik7XG5cbiAgICBjb25zdCB0YWJQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRhYlBhbmVsLmlkID0gdGFiUGFuZWxJZDtcbiAgICB0YWJQYW5lbC5jbGFzc05hbWUgKz0gJ3RhYnBhbmVsJztcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFibGxlZGJ5JywgdGFiSWQpO1xuICAgIHRhYlBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIXNlbGVjdGVkKS50b1N0cmluZygpKTtcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndGFicGFuZWwnKTtcbiAgICB0YWJQYW5lbC5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZCh0YWIpO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0YWJQYW5lbCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBhbmltYXRlZCBib3JkZXIgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFiXG4gICAqL1xuICBhZGRCb3R0b21Cb3JkZXIoKSB7XG4gICAgdGhpcy50YWJsaXN0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSk7XG4gIH1cblxuICBpbml0VGFiUGFuZWwoKSB7XG4gICAgaW5pdFRhYlBhbmVsKHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgc2VjdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldFNlY3Rpb25UeXBlKHtpZH0pIHtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSA9IGBoNXAtc2VjdGlvbi0ke2lkfSBwYW5lbGA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWItdmlldy5qcyIsImltcG9ydCB7Y3Vycnl9IGZyb20gJ3V0aWxzL2Z1bmN0aW9uYWwnXG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSAnLi4vaHViLXNlcnZpY2VzJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIFRoZSBTZWFyY2ggU2VydmljZSBnZXRzIGEgY29udGVudCB0eXBlIGZyb20gaHViLXNlcnZpY2VzLmpzXG4gKiBpbiB0aGUgZm9ybSBvZiBhIHByb21pc2UuIEl0IHRoZW4gZ2VuZXJhdGVzIGEgc2NvcmUgYmFzZWRcbiAqIG9uIHRoZSBkaWZmZXJlbnQgd2VpZ2h0aW5ncyBvZiB0aGUgY29udGVudCB0eXBlIGZpZWxkcyBhbmRcbiAqIHNvcnRzIHRoZSByZXN1bHRzIGJhc2VkIG9uIHRoZSBnZW5lcmF0ZWQgc2NvcmUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS5hcGlSb290VXJsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gQWRkIGNvbnRlbnQgdHlwZXMgdG8gdGhlIHNlYXJjaCBpbmRleFxuICAgIHRoaXMuY29udGVudFR5cGVzID0gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHNlYXJjaFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnlcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZTxDb250ZW50VHlwZVtdPn0gQSBwcm9taXNlIG9mIGFuIGFycmF5IG9mIGNvbnRlbnQgdHlwZXNcbiAgICovXG4gIHNlYXJjaChxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnRUeXBlcy50aGVuKGZpbHRlckJ5UXVlcnkocXVlcnkpKTtcbiAgfVxufVxuXG4vKipcbiAqIEZpbHRlcnMgYSBsaXN0IG9mIGNvbnRlbnQgdHlwZXMgYmFzZWQgb24gYSBxdWVyeVxuICogQHR5cGUge0Z1bmN0aW9ufVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVxuICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcbiAqL1xuY29uc3QgZmlsdGVyQnlRdWVyeSA9IGN1cnJ5KGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZXMpIHtcbiAgaWYgKHF1ZXJ5ID09ICcnKSB7XG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlcztcbiAgfVxuXG4gIC8vIEFwcGVuZCBhIHNlYXJjaCBzY29yZSB0byBlYWNoIGNvbnRlbnQgdHlwZVxuICByZXR1cm4gY29udGVudFR5cGVzLm1hcChjb250ZW50VHlwZSA9PlxuICAgICh7XG4gICAgICBjb250ZW50VHlwZTogY29udGVudFR5cGUsXG4gICAgICBzY29yZTogZ2V0U2VhcmNoU2NvcmUocXVlcnksIGNvbnRlbnRUeXBlKVxuICAgIH0pKVxuICAgIC5maWx0ZXIocmVzdWx0ID0+IHJlc3VsdC5zY29yZSA+IDApXG4gICAgLnNvcnQoc29ydFNlYXJjaFJlc3VsdHMpIC8vIFNvcnQgYnkgaW5zdGFsbGVkLCByZWxldmFuY2UgYW5kIHBvcHVsYXJpdHlcbiAgICAubWFwKHJlc3VsdCA9PiByZXN1bHQuY29udGVudFR5cGUpOyAvLyBVbndyYXAgcmVzdWx0IG9iamVjdDtcbn0pO1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciBBcnJheS5zb3J0KClcbiAqIENvbXBhcmVzIHR3byBjb250ZW50IHR5cGVzIG9uIGRpZmZlcmVudCBjcml0ZXJpYVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIEZpcnN0IGNvbnRlbnQgdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IGIgU2Vjb25kIGNvbnRlbnQgdHlwZVxuICogQHJldHVybiB7aW50fVxuICovXG5jb25zdCBzb3J0U2VhcmNoUmVzdWx0cyA9IChhLGIpID0+IHtcbiAgaWYgKCFhLmNvbnRlbnRUeXBlLmluc3RhbGxlZCAmJiBiLmNvbnRlbnRUeXBlLmluc3RhbGxlZCkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgaWYgKGEuY29udGVudFR5cGUuaW5zdGFsbGVkICYmICFiLmNvbnRlbnRUeXBlLmluc3RhbGxlZCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIGVsc2UgaWYgKGIuc2NvcmUgIT09IGEuc2NvcmUpIHtcbiAgICByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmU7XG4gIH1cblxuICBlbHNlIHtcbiAgICByZXR1cm4gYi5jb250ZW50VHlwZS5wb3B1bGFyaXR5IC0gYS5jb250ZW50VHlwZS5wb3B1bGFyaXR5O1xuICB9XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgd2VpZ2h0aW5nIGZvciBkaWZmZXJlbnQgc2VhcmNoIHRlcm1zIGJhc2VkXG4gKiBvbiBleGlzdGVuY2Ugb2Ygc3Vic3RyaW5nc1xuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gcXVlcnlcbiAqIEBwYXJhbSAge09iamVjdH0gY29udGVudFR5cGVcbiAqIEByZXR1cm4ge2ludH1cbiAqL1xuIGNvbnN0IGdldFNlYXJjaFNjb3JlID0gZnVuY3Rpb24ocXVlcnksIGNvbnRlbnRUeXBlKSB7XG4gICBsZXQgcXVlcmllcyA9IHF1ZXJ5LnNwbGl0KCcgJykuZmlsdGVyKHF1ZXJ5ID0+IHF1ZXJ5ICE9PSAnJyk7XG4gICBsZXQgcXVlcnlTY29yZXMgPSBxdWVyaWVzLm1hcChxdWVyeSA9PiBnZXRTY29yZUZvckVhY2hRdWVyeShxdWVyeSwgY29udGVudFR5cGUpKTtcbiAgIGlmIChxdWVyeVNjb3Jlcy5pbmRleE9mKDApID4gLTEpIHtcbiAgICAgcmV0dXJuIDA7XG4gICB9XG4gICByZXR1cm4gcXVlcnlTY29yZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XG4gfTtcblxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHJlbGV2YW5jZSBzY29yZSBmb3IgYSBzaW5nbGUgc3RyaW5nXG4gKlxuICogQHBhcmFtICB7dHlwZX0gcXVlcnkgICAgICAgZGVzY3JpcHRpb25cbiAqIEBwYXJhbSAge3R5cGV9IGNvbnRlbnRUeXBlIGRlc2NyaXB0aW9uXG4gKiBAcmV0dXJuIHt0eXBlfSAgICAgICAgICAgICBkZXNjcmlwdGlvblxuICovXG5jb25zdCBnZXRTY29yZUZvckVhY2hRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeSwgY29udGVudFR5cGUpIHtcbiAgIHF1ZXJ5ID0gcXVlcnkudHJpbSgpO1xuICAgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUudGl0bGUpKSB7XG4gICAgIHJldHVybiAxMDA7XG4gICB9XG4gICBlbHNlIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLnN1bW1hcnkpKSB7XG4gICAgIHJldHVybiA1O1xuICAgfVxuICAgZWxzZSBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5kZXNjcmlwdGlvbikpIHtcbiAgICAgcmV0dXJuIDU7XG4gICB9XG4gICBlbHNlIGlmIChhcnJheUhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUua2V5d29yZHMpKSB7XG4gICAgIHJldHVybiA1O1xuICAgfVxuICAgZWxzZSB7XG4gICAgIHJldHVybiAwO1xuICAgfVxufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBuZWVkbGUgaXMgZm91bmQgaW4gdGhlIGhheXN0YWNrLlxuICogTm90IGNhc2Ugc2Vuc2l0aXZlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5lZWRsZVxuICogQHBhcmFtIHtzdHJpbmd9IGhheXN0YWNrXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdWJTdHJpbmcgPSBmdW5jdGlvbihuZWVkbGUsIGhheXN0YWNrKSB7XG4gIGlmIChoYXlzdGFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGhheXN0YWNrLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24sIGNoZWNrcyBpZiBhcnJheSBoYXMgY29udGFpbnMgYSBzdWJzdHJpbmdcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN1YlN0cmluZ1xuICogQHBhcmFtICB7QXJyYXl9IGFyclxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgYXJyYXlIYXNTdWJTdHJpbmcgPSBmdW5jdGlvbihzdWJTdHJpbmcsIGFycikge1xuICBpZiAoYXJyID09PSB1bmRlZmluZWQgfHwgc3ViU3RyaW5nID09PSAnJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBhcnIuc29tZShzdHJpbmcgPT4gaGFzU3ViU3RyaW5nKHN1YlN0cmluZywgc3RyaW5nKSk7XG59O1xuXG5jb25zdCBBZGROdW1iZXI9ZnVuY3Rpb24oYSxiKVxue1xuICByZXR1cm4gYStiO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvc2VhcmNoLXNlcnZpY2Uvc2VhcmNoLXNlcnZpY2UuanMiLCJpbXBvcnQgSHViU2VydmljZXMgZnJvbSAnLi4vaHViLXNlcnZpY2VzJztcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICpcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xuXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyBJbnB1dCBlbGVtZW50IGZvciB0aGUgSDVQIGZpbGVcbiAgICBjb25zdCBoNXBVcGxvYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGg1cFVwbG9hZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZmlsZScpO1xuXG4gICAgLy8gU2VuZHMgdGhlIEg1UCBmaWxlIHRvIHRoZSBwbHVnaW5cbiAgICBjb25zdCB1c2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICB1c2VCdXR0b24udGV4dENvbnRlbnQgPSAnVXNlJztcbiAgICB1c2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgIC8vIEFkZCB0aGUgSDVQIGZpbGUgdG8gYSBmb3JtLCByZWFkeSBmb3IgdHJhbnNwb3J0YXRpb25cbiAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIGRhdGEuYXBwZW5kKCdoNXAnLCBoNXBVcGxvYWQuZmlsZXNbMF0pO1xuXG4gICAgICAvLyBVcGxvYWQgY29udGVudCB0byB0aGUgcGx1Z2luXG4gICAgICB0aGlzLnNlcnZpY2VzLnVwbG9hZENvbnRlbnQoZGF0YSlcbiAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgLy8gRmlyZSB0aGUgcmVjZWl2ZWQgZGF0YSB0byBhbnkgbGlzdGVuZXJzXG4gICAgICAgICAgc2VsZi5maXJlKCd1cGxvYWQnLCBqc29uKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChoNXBVcGxvYWQpO1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodXNlQnV0dG9uKTtcblxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBlbGVtZW50O1xuICB9XG5cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24uanMiLCJpbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIHJlbW92ZUF0dHJpYnV0ZSwgaGFzQXR0cmlidXRlLCBjbGFzc0xpc3RDb250YWlucywgcXVlcnlTZWxlY3Rvciwgbm9kZUxpc3RUb0FycmF5IH0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtjdXJyeSwgZm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9TSVpFID0gJ2RhdGEtc2l6ZSc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBkaXNhYmxlID0gc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGVuYWJsZSA9IHJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWRcbiAqL1xuY29uc3QgdG9nZ2xlRW5hYmxlZCA9IChlbGVtZW50LCBlbmFibGVkKSA9PiAoZW5hYmxlZCA/IGVuYWJsZSA6IGRpc2FibGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlkZGVuXG4gKi9cbmNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSBjdXJyeSgoaGlkZGVuLCBlbGVtZW50KSA9PiBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgaGlkZGVuLnRvU3RyaW5nKCksIGVsZW1lbnQpKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGlzRGlzYWJsZWQgPSBoYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbi8qKlxuICogVXBkYXRlIHRoZSB2aWV3XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKi9cbmNvbnN0IHVwZGF0ZVZpZXcgPSAoZWxlbWVudCwgc3RhdGUpID0+IHtcbiAgY29uc3QgcHJldkJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXZpb3VzJyk7XG4gIGNvbnN0IG5leHRCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0Jyk7XG4gIGNvbnN0IGxpc3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gIGNvbnN0IHRvdGFsQ291bnQgPSBsaXN0LmNoaWxkRWxlbWVudENvdW50O1xuXG4gIC8vIHVwZGF0ZSBsaXN0IHNpemVzXG4gIGxpc3Quc3R5bGUud2lkdGggPSBgJHsxMDAgLyBzdGF0ZS5kaXNwbGF5Q291bnQgKiB0b3RhbENvdW50fSVgO1xuICBsaXN0LnN0eWxlLm1hcmdpbkxlZnQgPSBgJHtzdGF0ZS5wb3NpdGlvbiAqICgxMDAgLyBzdGF0ZS5kaXNwbGF5Q291bnQpfSVgO1xuXG4gIC8vIHVwZGF0ZSBpbWFnZSBzaXplc1xuICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAuZm9yRWFjaChlbGVtZW50ID0+IGVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHsxMDAgLyB0b3RhbENvdW50fSVgKTtcblxuICAvLyB0b2dnbGUgYnV0dG9uIHZpc2liaWxpdHlcbiAgW3ByZXZCdXR0b24sIG5leHRCdXR0b25dXG4gICAgLmZvckVhY2godG9nZ2xlVmlzaWJpbGl0eShzdGF0ZS5kaXNwbGF5Q291bnQgPj0gdG90YWxDb3VudCkpO1xuXG4gIC8vIHRvZ2dsZSBidXR0b24gZW5hYmxlLCBkaXNhYmxlZFxuICB0b2dnbGVFbmFibGVkKG5leHRCdXR0b24sIHN0YXRlLnBvc2l0aW9uID4gKHN0YXRlLmRpc3BsYXlDb3VudCAtIHRvdGFsQ291bnQpKTtcbiAgdG9nZ2xlRW5hYmxlZChwcmV2QnV0dG9uLCBzdGF0ZS5wb3NpdGlvbiA8IDApO1xufTtcblxuLyoqXG4gKiBIYW5kbGVzIGJ1dHRvbiBjbGlja2VkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBidXR0b25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHVwZGF0ZVN0YXRlXG4gKiBAcGFyYW0ge0V2ZW50fVxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrID0gY3VycnkoKGVsZW1lbnQsIHN0YXRlLCBidXR0b24sIHVwZGF0ZVN0YXRlLCBldmVudCkgPT4ge1xuICBpZighaXNEaXNhYmxlZChidXR0b24pKXtcbiAgICB1cGRhdGVTdGF0ZShzdGF0ZSk7XG4gICAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIGltYWdlXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaW1hZ2VcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpbml0SW1hZ2UgPSBjdXJyeSgoZWxlbWVudCwgaW1hZ2UpID0+IHtcbiAgbGV0IHRhcmdldElkID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gIGxldCB0YXJnZXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhcmdldElkfWApO1xuXG4gIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XG4gIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKSlcbn0pO1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciB3aGVuIHRoZSBkb20gaXMgdXBkYXRlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtNdXRhdGlvblJlY29yZH0gcmVjb3JkXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGFuZGxlRG9tVXBkYXRlID0gY3VycnkoKGVsZW1lbnQsIHN0YXRlLCByZWNvcmQpID0+IHtcbiAgLy8gb24gYWRkIGltYWdlIHJ1biBpbml0aWFsaXphdGlvblxuICBpZihyZWNvcmQudHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICBub2RlTGlzdFRvQXJyYXkocmVjb3JkLmFkZGVkTm9kZXMpXG4gICAgICAuZmlsdGVyKGNsYXNzTGlzdENvbnRhaW5zKCdzbGlkZScpKVxuICAgICAgLm1hcChxdWVyeVNlbGVjdG9yKCdpbWcnKSlcbiAgICAgIC5mb3JFYWNoKGluaXRJbWFnZShlbGVtZW50KSk7XG4gIH1cblxuICAvLyB1cGRhdGUgdGhlIHZpZXdcbiAgdXBkYXRlVmlldyhlbGVtZW50LCBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgZGlzcGxheUNvdW50OiBlbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfU0laRSkgfHwgNSxcbiAgICBwb3NpdGlvbjogMFxuICB9KSk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICAvLyBnZXQgYnV0dG9uIGh0bWwgZWxlbWVudHNcbiAgY29uc3QgbmV4dEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQnKTtcbiAgY29uc3QgcHJldkJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLnByZXZpb3VzJyk7XG5cbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtvYmplY3R9IEltYWdlU2Nyb2xsZXJTdGF0ZVxuICAgKiBAcHJvcGVydHkge251bWJlcn0gZGlzcGxheUNvdW50XG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwb3NpdGlvblxuICAgKi9cbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgZGlzcGxheUNvdW50OiBlbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSSUJVVEVfU0laRSkgfHwgNSxcbiAgICBwb3NpdGlvbjogMFxuICB9O1xuXG4gIC8vIGluaXRpYWxpemUgYnV0dG9uc1xuICBuZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2soZWxlbWVudCwgc3RhdGUsIG5leHRCdXR0b24sIHN0YXRlID0+IHN0YXRlLnBvc2l0aW9uLS0pKTtcbiAgcHJldkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrKGVsZW1lbnQsIHN0YXRlLCBwcmV2QnV0dG9uLCBzdGF0ZSA9PiBzdGF0ZS5wb3NpdGlvbisrKSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBpbWFnZXNcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbYXJpYS1jb250cm9sc10nKS5mb3JFYWNoKGluaXRJbWFnZShlbGVtZW50KSk7XG5cbiAgLy8gbGlzdGVuIGZvciB1cGRhdGVzIHRvIGRhdGEtc2l6ZVxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmb3JFYWNoKGhhbmRsZURvbVVwZGF0ZShlbGVtZW50LCBzdGF0ZSkpKTtcblxuICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIHtcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW0FUVFJJQlVURV9TSVpFXVxuICB9KTtcblxuICAvLyBpbml0aWFsaXplIHBvc2l0aW9uXG4gIHVwZGF0ZVZpZXcoZWxlbWVudCwgc3RhdGUpO1xuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZSwgdG9nZ2xlQXR0cmlidXRlLCBoaWRlLCBzaG93LCB0b2dnbGVWaXNpYmlsaXR5fSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcbmltcG9ydCB7IGluaXRDb2xsYXBzaWJsZSB9IGZyb20gJy4uL3V0aWxzL2FyaWEnO1xuXG4vKipcbiAqIFVuc2VsZWN0cyBhbGwgZWxlbWVudHMgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50W119IGVsZW1lbnRzXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBhcmlhLWV4cGFuZGVkIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50IHRvIGZhbHNlXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5jb25zdCB1bkV4cGFuZCA9IHNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG4vKipcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIC8vIGVsZW1lbnRzXG4gIGNvbnN0IG1lbnVJdGVtcyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJtZW51aXRlbVwiXScpO1xuICBjb25zdCB0b2dnbGVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1jb250cm9sc11bYXJpYS1leHBhbmRlZF0nKTtcblxuICAvLyBtb3ZlIHNlbGVjdFxuICBtZW51SXRlbXMuZm9yRWFjaChtZW51SXRlbSA9PiB7XG4gICAgbWVudUl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICB1blNlbGVjdEFsbChtZW51SXRlbXMpO1xuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICB1bkV4cGFuZCh0b2dnbGVyKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gaW5pdCBjb2xsYXBzZSBhbmQgb3BlblxuICBpbml0Q29sbGFwc2libGUoZWxlbWVudCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL21lbnUuanMiLCJpbXBvcnQge3NldEF0dHJpYnV0ZX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGhpZGVBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCB1blNlbGVjdEFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJykpO1xuXG4vKipcbiAqIEluaXRpYXRlcyBhIHRhYiBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIGNvbnN0IHRhYnMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFiXCJdJyk7XG4gIGNvbnN0IHRhYlBhbmVscyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJwYW5lbFwiXScpO1xuXG4gIHRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICB1blNlbGVjdEFsbCh0YWJzKTtcbiAgICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXG4gICAgICBoaWRlQWxsKHRhYlBhbmVscyk7XG5cbiAgICAgIGxldCB0YWJQYW5lbElkID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICAgICAgc2hvdyhlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RhYlBhbmVsSWR9YCkpO1xuICAgIH0pO1xuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy90YWItcGFuZWwuanMiLCJyZXF1aXJlKCcuLi8uLi9zcmMvc3R5bGVzL21haW4uc2NzcycpO1xuXG4vLyBMb2FkIGxpYnJhcnlcbkg1UCA9IEg1UCB8fCB7fTtcbkg1UC5IdWJDbGllbnQgPSByZXF1aXJlKCcuLi9zY3JpcHRzL2h1YicpLmRlZmF1bHQ7XG5INVAuSHViQ2xpZW50LnJlbmRlckVycm9yTWVzc2FnZSA9IHJlcXVpcmUoJy4uL3NjcmlwdHMvdXRpbHMvZXJyb3JzJykuZGVmYXVsdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwic291cmNlUm9vdCI6IiJ9