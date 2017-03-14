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

    // pick elements
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
      element.innerHTML = '\n      <div class="menu-group">\n        <nav  role="menubar" class="navbar">\n          <div class="navbar-header">\n              <span class="navbar-toggler navbar-toggler-right" aria-controls="' + menuId + '" aria-expanded="false">\n               <span class="icon-accordion-arrow"></span>\n             </span>\n            <span class="navbar-brand">' + menutitle + '</span>\n          </div>\n\n          <ul id="' + menuId + '" class="navbar-nav" aria-hidden="true"></ul>\n        </nav>\n        \n        <div class="input-group" role="search">\n          <input id="hub-search-bar" class="form-control form-control-rounded" type="text" placeholder="' + searchText + '" />\n          <div class="input-group-addon icon-search"></div>\n        </div>\n      </div>';

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
      var underline = document.createElement('span');
      underline.className = 'menuitem-underline';
      this.menubar.appendChild(underline);
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
    this.view.on('search', this.resetMenuOnEnter, this);
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
  }, {
    key: "resetMenuOnEnter",
    value: function resetMenuOnEnter(_ref2) {
      var keyCode = _ref2.keyCode;

      if (keyCode === 13) {
        this.closeDetailView();
      }
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
    value: function clearInputField(_ref3) {
      var element = _ref3.element;

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
    value: function showDetailView(_ref4) {
      var id = _ref4.id;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjRmOTA4Yzg5MjVmYWM3MmQ0YWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9hcmlhLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3M/NmE3OCIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9tZW51LmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2Rpc3QuanMiXSwibmFtZXMiOlsiRXZlbnRmdWwiLCJsaXN0ZW5lcnMiLCJvbiIsInR5cGUiLCJsaXN0ZW5lciIsInNjb3BlIiwidHJpZ2dlciIsInB1c2giLCJmaXJlIiwiZXZlbnQiLCJ0cmlnZ2VycyIsImV2ZXJ5IiwiY2FsbCIsInByb3BhZ2F0ZSIsInR5cGVzIiwiZXZlbnRmdWwiLCJzZWxmIiwiZm9yRWFjaCIsImN1cnJ5IiwiZm4iLCJhcml0eSIsImxlbmd0aCIsImYxIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJhcmd1bWVudHMiLCJhcHBseSIsImYyIiwiYXJnczIiLCJjb25jYXQiLCJjb21wb3NlIiwiZm5zIiwicmVkdWNlIiwiZiIsImciLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJuYW1lIiwiZWwiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJhdHRyaWJ1dGVFcXVhbHMiLCJ0b2dnbGVBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInBhcmVudCIsImNoaWxkIiwicXVlcnlTZWxlY3RvciIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZUNoaWxkIiwib2xkQ2hpbGQiLCJjbGFzc0xpc3RDb250YWlucyIsImNscyIsImNsYXNzTGlzdCIsIm5vZGVMaXN0VG9BcnJheSIsIm5vZGVMaXN0IiwiaGlkZSIsInNob3ciLCJ0b2dnbGVWaXNpYmlsaXR5IiwidmlzaWJsZSIsImVsZW1lbnQiLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJ3aW5kb3ciLCJjYWNoZWRDb250ZW50VHlwZXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3VsdCIsImpzb24iLCJpc1ZhbGlkIiwibGlicmFyaWVzIiwicmVzcG9uc2UiLCJtZXNzYWdlQ29kZSIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwibWFjaGluZU5hbWUiLCJjb250ZW50VHlwZXMiLCJjb250ZW50VHlwZSIsImlkIiwibnMiLCJnZXRBamF4VXJsIiwiYm9keSIsImZvcm1EYXRhIiwicmVuZGVyRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImNsb3NlQnV0dG9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwibWVzc2FnZUNvbnRlbnQiLCJ0aXRsZSIsImNvbnRlbnQiLCJtZXNzYWdlV3JhcHBlciIsImRpc21pc3NpYmxlIiwiYnV0dG9uIiwidW5kZWZpbmVkIiwibWVzc2FnZUJ1dHRvbiIsInJlbGF5Q2xpY2tFdmVudEFzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0b3BQcm9wYWdhdGlvbiIsImluaXQiLCJpc0V4cGFuZGVkIiwiaW5pdENvbGxhcHNpYmxlIiwidG9nZ2xlciIsImNvbGxhcHNpYmxlSWQiLCJjb2xsYXBzaWJsZSIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJIdWIiLCJzdGF0ZSIsImNvbnRlbnRUeXBlU2VjdGlvbiIsInVwbG9hZFNlY3Rpb24iLCJ2aWV3Iiwic2VydmljZXMiLCJzZXRQYW5lbFRpdGxlIiwiY2xvc2VQYW5lbCIsInNldFNlY3Rpb25UeXBlIiwidG9nZ2xlUGFuZWxPcGVuIiwiYmluZCIsImluaXRUYWJQYW5lbCIsImdldENvbnRlbnRUeXBlIiwic2V0VGl0bGUiLCJzZWN0aW9uSWQiLCJ0YWJDb25maWdzIiwiZ2V0RWxlbWVudCIsImNvbmZpZyIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiYWRkQm90dG9tQm9yZGVyIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsIk1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04iLCJpc0VtcHR5IiwidGV4dCIsIkNvbnRlbnRUeXBlRGV0YWlsVmlldyIsInJvb3RFbGVtZW50IiwiY3JlYXRlVmlldyIsInVzZUJ1dHRvbiIsImluc3RhbGxCdXR0b24iLCJpbWFnZSIsIm93bmVyIiwiZGVzY3JpcHRpb24iLCJkZW1vQnV0dG9uIiwiY2Fyb3VzZWwiLCJjYXJvdXNlbExpc3QiLCJsaWNlbmNlUGFuZWwiLCJsaWdodGJveCIsImNoaWxkRWxlbWVudENvdW50IiwidXJsIiwiYWx0IiwidGh1bWJuYWlsIiwic3JjIiwiZWxsaXBzaXMiLCJ0b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkIiwiZGVzY3JpcHRpb25FeHBhbmRlZCIsImlubmVyVGV4dCIsInNpemUiLCJzdWJzdHIiLCJpbnN0YWxsZWQiLCJDb250ZW50VHlwZURldGFpbCIsImluc3RhbGwiLCJ1cGRhdGUiLCJpbnN0YWxsQ29udGVudFR5cGUiLCJjb25zb2xlIiwiZGVidWciLCJzZXRJZCIsInNldERlc2NyaXB0aW9uIiwic2V0SW1hZ2UiLCJpY29uIiwic2V0RXhhbXBsZSIsImV4YW1wbGUiLCJzZXRPd25lciIsInNldElzSW5zdGFsbGVkIiwic2V0TGljZW5jZSIsImxpY2Vuc2UiLCJyZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsIiwic2NyZWVuc2hvdHMiLCJhZGRJbWFnZVRvQ2Fyb3VzZWwiLCJDb250ZW50VHlwZUxpc3RWaWV3IiwiaGFzQ2hpbGROb2RlcyIsImxhc3RDaGlsZCIsInJvdyIsImNyZWF0ZUNvbnRlbnRUeXBlUm93IiwidXNlQnV0dG9uQ29uZmlnIiwiaW5zdGFsbEJ1dHRvbkNvbmZpZyIsInN1bW1hcnkiLCJDb250ZW50VHlwZUxpc3QiLCJyZW1vdmVBbGxSb3dzIiwiYWRkUm93IiwiQ29udGVudEJyb3dzZXJWaWV3IiwibWVudWJhciIsImlucHV0RmllbGQiLCJpbnB1dEJ1dHRvbiIsInRhcmdldCIsInF1ZXJ5Iiwib25jbGljayIsInBhcmVudEVsZW1lbnQiLCJmb2N1cyIsIm1lbnV0aXRsZSIsIm1lbnVJZCIsInNlYXJjaFRleHQiLCJtZW51SXRlbSIsImlzRmlyc3RNZW51SXRlbSIsInVuZGVybGluZSIsIkNvbnRlbnRUeXBlU2VjdGlvbiIsInNlYXJjaFNlcnZpY2UiLCJjb250ZW50VHlwZUxpc3QiLCJjb250ZW50VHlwZURldGFpbCIsImFkZE1lbnVJdGVtIiwibWVudVRleHQiLCJpbml0TWVudSIsInNlY3Rpb24iLCJhZGQiLCJzZWFyY2giLCJyZXNldE1lbnVTZWxlY3Rpb24iLCJyZXNldE1lbnVPbkVudGVyIiwiYXBwbHlTZWFyY2hGaWx0ZXIiLCJjbGVhcklucHV0RmllbGQiLCJzaG93RGV0YWlsVmlldyIsImNsb3NlRGV0YWlsVmlldyIsImluaXRDb250ZW50VHlwZUxpc3QiLCJjYXRjaCIsImVycm9yIiwia2V5Q29kZSIsImxvYWRCeUlkIiwiQVRUUklCVVRFX0RBVEFfSUQiLCJpc09wZW4iLCJIdWJWaWV3IiwicmVuZGVyVGFiUGFuZWwiLCJyZW5kZXJQYW5lbCIsImV4cGFuZGVkIiwidGFiQ29udGFpbmVyRWxlbWVudCIsInBhbmVsIiwic2V0VGltZW91dCIsInRhYmxpc3QiLCJ0YWJMaXN0V3JhcHBlciIsInRhYklkIiwidGFiUGFuZWxJZCIsInRhYiIsInRhYlBhbmVsIiwiU2VhcmNoU2VydmljZSIsImZpbHRlckJ5UXVlcnkiLCJzY29yZSIsImdldFNlYXJjaFNjb3JlIiwic29ydCIsInNvcnRTZWFyY2hSZXN1bHRzIiwiYSIsImIiLCJwb3B1bGFyaXR5IiwicXVlcmllcyIsInNwbGl0IiwicXVlcnlTY29yZXMiLCJnZXRTY29yZUZvckVhY2hRdWVyeSIsInRyaW0iLCJoYXNTdWJTdHJpbmciLCJhcnJheUhhc1N1YlN0cmluZyIsImtleXdvcmRzIiwibmVlZGxlIiwiaGF5c3RhY2siLCJ0b0xvd2VyQ2FzZSIsInN1YlN0cmluZyIsInN0cmluZyIsIkFkZE51bWJlciIsIlVwbG9hZFNlY3Rpb24iLCJoNXBVcGxvYWQiLCJ0ZXh0Q29udGVudCIsImRhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImZpbGVzIiwidXBsb2FkQ29udGVudCIsIkFUVFJJQlVURV9TSVpFIiwiZGlzYWJsZSIsImVuYWJsZSIsInRvZ2dsZUVuYWJsZWQiLCJlbmFibGVkIiwiaGlkZGVuIiwiaXNEaXNhYmxlZCIsInVwZGF0ZVZpZXciLCJwcmV2QnV0dG9uIiwibmV4dEJ1dHRvbiIsImxpc3QiLCJ0b3RhbENvdW50Iiwic3R5bGUiLCJ3aWR0aCIsImRpc3BsYXlDb3VudCIsIm1hcmdpbkxlZnQiLCJwb3NpdGlvbiIsIm9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrIiwidXBkYXRlU3RhdGUiLCJpbml0SW1hZ2UiLCJ0YXJnZXRJZCIsImhhbmRsZURvbVVwZGF0ZSIsInJlY29yZCIsImFkZGVkTm9kZXMiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwidW5TZWxlY3RBbGwiLCJ1bkV4cGFuZCIsIm1lbnVJdGVtcyIsImhpZGVBbGwiLCJ0YWJz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TXNRLFlBQVkxUCxRQUFRWixnQkFBUixDQUF5QixtQkFBekIsQ0FBbEI7O0FBRUFxUSxPQUFLbFQsT0FBTCxDQUFhLGVBQU87QUFDbEJtUCxRQUFJaEosZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsVUFBVTNHLEtBQVYsRUFBaUI7O0FBRTdDc1Qsa0JBQVlJLElBQVo7QUFDQTFULFlBQU04TSxNQUFOLENBQWFuSyxZQUFiLENBQTBCLGVBQTFCLEVBQTJDLE1BQTNDOztBQUVBOFEsY0FBUUUsU0FBUjs7QUFFQSxVQUFJakUsYUFBYTFQLE1BQU04TSxNQUFOLENBQWF0SyxZQUFiLENBQTBCLGVBQTFCLENBQWpCO0FBQ0FzQixXQUFLRyxRQUFRZCxhQUFSLE9BQTBCdU0sVUFBMUIsQ0FBTDtBQUNELEtBVEQ7QUFVRCxHQVhEO0FBWUQsQzs7Ozs7Ozs7O0FDdkNELG1CQUFBa0UsQ0FBUSxFQUFSOztBQUVBO0FBQ0FDLE1BQU1BLE9BQU8sRUFBYjtBQUNBQSxJQUFJQyxTQUFKLEdBQWdCLG1CQUFBRixDQUFRLENBQVIsRUFBMEJHLE9BQTFDO0FBQ0FGLElBQUlDLFNBQUosQ0FBY25PLGtCQUFkLEdBQW1DLG1CQUFBaU8sQ0FBUSxDQUFSLEVBQW1DRyxPQUF0RSxDIiwiZmlsZSI6Img1cC1odWItY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI0ZjkwOGM4OTI1ZmFjNzJkNGFmIiwiLyoqXG4gKiBAbWl4aW5cbiAqL1xuZXhwb3J0IGNvbnN0IEV2ZW50ZnVsID0gKCkgPT4gKHtcbiAgbGlzdGVuZXJzOiB7fSxcblxuICAvKipcbiAgICogTGlzdGVuIHRvIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbc2NvcGVdXG4gICAqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtFdmVudGZ1bH1cbiAgICovXG4gIG9uOiBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgc2NvcGUpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZWRlZiB7b2JqZWN0fSBUcmlnZ2VyXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2NvcGVcbiAgICAgKi9cbiAgICBjb25zdCB0cmlnZ2VyID0ge1xuICAgICAgJ2xpc3RlbmVyJzogbGlzdGVuZXIsXG4gICAgICAnc2NvcGUnOiBzY29wZVxuICAgIH07XG5cbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2godHJpZ2dlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogRmlyZSBldmVudC4gSWYgYW55IG9mIHRoZSBsaXN0ZW5lcnMgcmV0dXJucyBmYWxzZSwgcmV0dXJuIGZhbHNlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZXZlbnRdXG4gICAqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgZmlyZTogZnVuY3Rpb24odHlwZSwgZXZlbnQpIHtcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMubGlzdGVuZXJzW3R5cGVdIHx8IFtdO1xuXG4gICAgcmV0dXJuIHRyaWdnZXJzLmV2ZXJ5KGZ1bmN0aW9uKHRyaWdnZXIpIHtcbiAgICAgIHJldHVybiB0cmlnZ2VyLmxpc3RlbmVyLmNhbGwodHJpZ2dlci5zY29wZSB8fCB0aGlzLCBldmVudCkgIT09IGZhbHNlO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIGZvciBldmVudHMgb24gYW5vdGhlciBFdmVudGZ1bCwgYW5kIHByb3BhZ2F0ZSBpdCB0cm91Z2ggdGhpcyBFdmVudGZ1bFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB0eXBlc1xuICAgKiBAcGFyYW0ge0V2ZW50ZnVsfSBldmVudGZ1bFxuICAgKi9cbiAgcHJvcGFnYXRlOiBmdW5jdGlvbih0eXBlcywgZXZlbnRmdWwpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgdHlwZXMuZm9yRWFjaCh0eXBlID0+IGV2ZW50ZnVsLm9uKHR5cGUsIGV2ZW50ID0+IHNlbGYuZmlyZSh0eXBlLCBldmVudCkpKTtcbiAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwiLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICpcbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGN1cnJ5ID0gZnVuY3Rpb24oZm4pIHtcbiAgY29uc3QgYXJpdHkgPSBmbi5sZW5ndGg7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKCkge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+PSBhcml0eSkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBmMigpIHtcbiAgICAgICAgY29uc3QgYXJnczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICByZXR1cm4gZjEuYXBwbHkobnVsbCwgYXJncy5jb25jYXQoYXJnczIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIENvbXBvc2UgZnVuY3Rpb25zIHRvZ2V0aGVyLCBleGVjdXRpbmcgZnJvbSByaWdodCB0byBsZWZ0XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbi4uLn0gZm5zXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKC4uLmZucykgPT4gZm5zLnJlZHVjZSgoZiwgZykgPT4gKC4uLmFyZ3MpID0+IGYoZyguLi5hcmdzKSkpO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JFYWNoID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgYXJyLmZvckVhY2goZm4pO1xufSk7XG5cbi8qKlxuICogTWFwcyBhIGZ1bmN0aW9uIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgbWFwID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5tYXAoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZpbHRlciB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBzb21lIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgc29tZSA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuc29tZShmbik7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgYSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSBjdXJyeShmdW5jdGlvbiAodmFsdWUsIGFycikge1xuICByZXR1cm4gYXJyLmluZGV4T2YodmFsdWUpICE9IC0xO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSBzdXBwbGllZCB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgd2l0aG91dCA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZXMsIGFycikge1xuICByZXR1cm4gZmlsdGVyKHZhbHVlID0+ICFjb250YWlucyh2YWx1ZSwgdmFsdWVzKSwgYXJyKVxufSk7XG5cbi8qKlxuICogVGFrZXMgYSBzdHJpbmcgdGhhdCBpcyBlaXRoZXIgJ3RydWUnIG9yICdmYWxzZScgYW5kIHJldHVybnMgdGhlIG9wcG9zaXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJvb2xcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBpbnZlcnNlQm9vbGVhblN0cmluZyA9IGZ1bmN0aW9uIChib29sKSB7XG4gIHJldHVybiAoYm9vbCAhPT0gJ3RydWUnKS50b1N0cmluZygpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9mdW5jdGlvbmFsLmpzIiwiaW1wb3J0IHtjdXJyeSwgaW52ZXJzZUJvb2xlYW5TdHJpbmd9IGZyb20gJy4vZnVuY3Rpb25hbCdcblxuLyoqXG4gKiBHZXQgYW4gYXR0cmlidXRlIHZhbHVlIGZyb20gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0QXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIFNldCBhbiBhdHRyaWJ1dGUgb24gYSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2V0QXR0cmlidXRlID0gY3VycnkoKG5hbWUsIHZhbHVlLCBlbCkgPT4gZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSk7XG5cbi8qKlxuICogUmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0F0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwuaGFzQXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGUgdGhhdCBlcXVhbHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUVxdWFscyA9IGN1cnJ5KChuYW1lLCB2YWx1ZSwgZWwpID0+IGVsLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWUpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYW4gYXR0cmlidXRlIGJldHdlZW4gJ3RydWUnIGFuZCAnZmFsc2UnO1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiB7XG4gIGNvbnN0IHZhbHVlID0gZ2V0QXR0cmlidXRlKG5hbWUsIGVsKTtcbiAgc2V0QXR0cmlidXRlKG5hbWUsIGludmVyc2VCb29sZWFuU3RyaW5nKHZhbHVlKSwgZWwpO1xufSk7XG5cbi8qKlxuICogVGhlIGFwcGVuZENoaWxkKCkgbWV0aG9kIGFkZHMgYSBub2RlIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3Qgb2YgY2hpbGRyZW4gb2YgYSBzcGVjaWZpZWQgcGFyZW50IG5vZGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjaGlsZFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBhcHBlbmRDaGlsZCA9IGN1cnJ5KChwYXJlbnQsIGNoaWxkKSA9PiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgYSBkZXNjZW5kYW50IG9mIHRoZSBlbGVtZW50IG9uIHdoaWNoIGl0IGlzIGludm9rZWRcbiAqIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIHNlbGVjdG9ycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3IgPSBjdXJyeSgoc2VsZWN0b3IsIGVsKSA9PiBlbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5vbi1saXZlIE5vZGVMaXN0IG9mIGFsbCBlbGVtZW50cyBkZXNjZW5kZWQgZnJvbSB0aGUgZWxlbWVudCBvbiB3aGljaCBpdFxuICogaXMgaW52b2tlZCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBDU1Mgc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge05vZGVMaXN0fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvckFsbCA9IGN1cnJ5KChzZWxlY3RvciwgZWwpID0+IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcblxuLyoqXG4gKiBUaGUgcmVtb3ZlQ2hpbGQoKSBtZXRob2QgcmVtb3ZlcyBhIGNoaWxkIG5vZGUgZnJvbSB0aGUgRE9NLiBSZXR1cm5zIHJlbW92ZWQgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IHBhcmVudFxuICogQHBhcmFtIHtOb2RlfSBvbGRDaGlsZFxuICpcbiAqIEByZXR1cm4ge05vZGV9XG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVDaGlsZCA9IGN1cnJ5KChwYXJlbnQsIG9sZENoaWxkKSA9PiBwYXJlbnQucmVtb3ZlQ2hpbGQob2xkQ2hpbGQpKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBub2RlIGhhcyBhIGNsYXNzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGNsYXNzTGlzdENvbnRhaW5zID0gY3VycnkoKGNscywgZWwpID0+IGVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMpKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgTm9kZUxpc3QgdG8gYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge05vZGVMaXN0fSBub2RlTGlzdFxuICpcbiAqIEByZXR1cm4ge05vZGVbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IG5vZGVMaXN0VG9BcnJheSA9IG5vZGVMaXN0ID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVMaXN0KTtcblxuLyoqXG4gKiBBZGRzIGFyaWEtaGlkZGVuPXRydWUgdG8gYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEFkZHMgYXJpYS1oaWRkZW49ZmFsc2UgdG8gYW4gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYXJpYS1oaWRkZW4gb24gYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IGN1cnJ5KCh2aXNpYmxlLCBlbGVtZW50KSA9PiAodmlzaWJsZSA/IHNob3cgOiBoaWRlKShlbGVtZW50KSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCIvKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IENvbnRlbnRUeXBlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFjaGluZU5hbWVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYWpvclZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtaW5vclZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwYXRjaFZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBoNXBNYWpvclZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBoNXBNaW5vclZlcnNpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzdW1tYXJ5XG4gKiBAcHJvcGVydHkge3N0cmluZ30gZGVzY3JpcHRpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpY29uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3JlYXRlZEF0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gdXBkYXRlZF9BdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlzUmVjb21tZW5kZWRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwb3B1bGFyaXR5XG4gKiBAcHJvcGVydHkge29iamVjdFtdfSBzY3JlZW5zaG90c1xuICogQHByb3BlcnR5IHtzdHJpbmd9IGxpY2Vuc2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBleGFtcGxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdHV0b3JpYWxcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGtleXdvcmRzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gb3duZXJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaW5zdGFsbGVkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlc3RyaWN0ZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViU2VydmljZXMge1xuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFwaVJvb3RVcmxcbiAgICovXG4gIGNvbnN0cnVjdG9yKHsgYXBpUm9vdFVybCB9KSB7XG4gICAgdGhpcy5hcGlSb290VXJsID0gYXBpUm9vdFVybDtcblxuICAgIGlmKCF3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzKXtcbiAgICAgIC8vIFRPRE8gcmVtb3ZlIHRoaXMgd2hlbiBkb25lIHRlc3RpbmcgZm9yIGVycm9yc1xuICAgICAgLy8gd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1lcnJvcnMvTk9fUkVTUE9OU0UuanNvbmAsIHtcblxuICAgICAgd2luZG93LmNhY2hlZENvbnRlbnRUeXBlcyA9IGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50LXR5cGUtY2FjaGVgLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcbiAgICAgIC50aGVuKHRoaXMuaXNWYWxpZClcbiAgICAgIC50aGVuKGpzb24gPT4ganNvbi5saWJyYXJpZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gIHtDb250ZW50VHlwZVtdfEVycm9yTWVzc2FnZX0gcmVzcG9uc2VcbiAgICogQHJldHVybiB7UHJvbWlzZTxDb250ZW50VHlwZVtdfEVycm9yTWVzc2FnZT59XG4gICAqL1xuICBpc1ZhbGlkKHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlLm1lc3NhZ2VDb2RlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBjb250ZW50IHR5cGVzXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlW10+fVxuICAgKi9cbiAgY29udGVudFR5cGVzKCkge1xuICAgIHJldHVybiB3aW5kb3cuY2FjaGVkQ29udGVudFR5cGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBDb250ZW50IFR5cGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYWNoZWRDb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcbiAgICB9KTtcblxuICAgIC8qcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50X3R5cGVfY2FjaGUvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpOyovXG4gIH1cblxuICAvKipcbiAgICogSW5zdGFsbHMgYSBjb250ZW50IHR5cGUgb24gdGhlIHNlcnZlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgaW5zdGFsbENvbnRlbnRUeXBlKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKG5zLmdldEFqYXhVcmwoJ2xpYnJhcnktaW5zdGFsbCcsIHtpZDogaWR9KSwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgYm9keTogJydcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWRzIGEgY29udGVudCB0eXBlIHRvIHRoZSBzZXJ2ZXIgZm9yIHZhbGlkYXRpb25cbiAgICpcbiAgICogQHBhcmFtIHtGb3JtRGF0YX0gZm9ybURhdGEgRm9ybSBjb250YWluaW5nIHRoZSBoNXAgdGhhdCBzaG91bGQgYmUgdXBsb2FkZWQgYXMgJ2g1cCdcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGpzb24gY29udGFpbmluZyB0aGUgY29udGVudCBqc29uIGFuZCB0aGUgaDVwIGpzb25cbiAgICovXG4gIHVwbG9hZENvbnRlbnQoZm9ybURhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktdXBsb2FkYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgYm9keTogZm9ybURhdGFcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwiLyoqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLnR5cGUgICAgICAgICB0eXBlIG9mIHRoZSBtZXNzYWdlOiBpbmZvLCBzdWNjZXNzLCBlcnJvclxuICogQHBhcmFtICB7Ym9vbGVhbn0gIGNvbmZpZy5kaXNtaXNzaWJsZSAgd2hldGhlciB0aGUgbWVzc2FnZSBjYW4gYmUgZGlzbWlzc2VkXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLmNvbnRlbnQgICAgICBtZXNzYWdlIGNvbnRlbnQgdXN1YWxseSBhICdoMycgYW5kIGEgJ3AnXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gZGl2IGNvbnRhaW5pbmcgdGhlIG1lc3NhZ2UgZWxlbWVudFxuICovXG5cbi8vVE9ETyBoYW5kbGUgc3RyaW5ncywgaHRtbCwgYmFkbHkgZm9ybWVkIG9iamVjdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyRXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2Nsb3NlJztcbiAgY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyYjeDI3MTUnO1xuXG4gIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VDb250ZW50LmNsYXNzTmFtZSA9ICdtZXNzYWdlLWNvbnRlbnQnO1xuICBtZXNzYWdlQ29udGVudC5pbm5lckhUTUwgPSAnPGgxPicgKyBtZXNzYWdlLnRpdGxlICsgJzwvaDE+JyArICc8cD4nICsgbWVzc2FnZS5jb250ZW50ICsgJzwvcD4nO1xuXG4gIGNvbnN0IG1lc3NhZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VXcmFwcGVyLmNsYXNzTmFtZSA9ICdtZXNzYWdlJyArICcgJyArIGAke21lc3NhZ2UudHlwZX1gICsgKG1lc3NhZ2UuZGlzbWlzc2libGUgPyAnIGRpc21pc3NpYmxlJyA6ICcnKTtcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGVudCk7XG5cbiAgaWYgKG1lc3NhZ2UuYnV0dG9uICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBtZXNzYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbWVzc2FnZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcbiAgICBtZXNzYWdlQnV0dG9uLmlubmVySFRNTCA9IG1lc3NhZ2UuYnV0dG9uO1xuICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VCdXR0b24pO1xuICB9XG5cbiAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcblxuLyoqXG4gKiAgVHJhbnNmb3JtcyBhIERPTSBjbGljayBldmVudCBpbnRvIGFuIEV2ZW50ZnVsJ3MgZXZlbnRcbiAqICBAc2VlIEV2ZW50ZnVsXG4gKlxuICogQHBhcmFtICB7c3RyaW5nIHwgT2JqZWN0fSB0eXBlXG4gKiBAcGFyYW0gIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbGF5Q2xpY2tFdmVudEFzID0gY3VycnkoZnVuY3Rpb24odHlwZSwgZXZlbnRmdWwsIGVsZW1lbnQpIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBldmVudGZ1bC5maXJlKHR5cGUsIHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBpZDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIGRvbid0IGJ1YmJsZVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICByZXR1cm4gZWxlbWVudDtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwiaW1wb3J0IHtpbml0Q29sbGFwc2libGV9IGZyb20gJy4uL3V0aWxzL2FyaWEnO1xuXG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgaW5pdENvbGxhcHNpYmxlKGVsZW1lbnQpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvcGFuZWwuanMiLCJpbXBvcnQge2F0dHJpYnV0ZUVxdWFscywgdG9nZ2xlQXR0cmlidXRlLCB0b2dnbGVWaXNpYmlsaXR5fSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFyaWEtZXhwYW5kZWQ9dHJ1ZSBvbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGlzRXhwYW5kZWQgPSBhdHRyaWJ1dGVFcXVhbHMoXCJhcmlhLWV4cGFuZGVkXCIsICd0cnVlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyBhcmlhLWhpZGRlbiBvbiAnY29sbGFwc2libGUnIHdoZW4gYXJpYS1leHBhbmRlZCBjaGFuZ2VzIG9uICd0b2dnbGVyJyxcbiAqIGFuZCB0b2dnbGVzIGFyaWEtZXhwYW5kZWQgb24gJ3RvZ2dsZXInIG9uIGNsaWNrXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgY29uc3QgaW5pdENvbGxhcHNpYmxlID0gKGVsZW1lbnQpID0+IHtcbiAgLy8gZWxlbWVudHNcbiAgY29uc3QgdG9nZ2xlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtY29udHJvbHNdW2FyaWEtZXhwYW5kZWRdJyk7XG4gIGNvbnN0IGNvbGxhcHNpYmxlSWQgPSB0b2dnbGVyLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICBjb25zdCBjb2xsYXBzaWJsZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y29sbGFwc2libGVJZH1gKTtcblxuICAvLyBzZXQgb2JzZXJ2ZXIgb24gdGl0bGUgZm9yIGFyaWEtZXhwYW5kZWRcbiAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdG9nZ2xlVmlzaWJpbGl0eShpc0V4cGFuZGVkKHRvZ2dsZXIpLCBjb2xsYXBzaWJsZSkpO1xuXG4gIG9ic2VydmVyLm9ic2VydmUodG9nZ2xlciwge1xuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbXCJhcmlhLWV4cGFuZGVkXCJdXG4gIH0pO1xuXG4gIC8vIFNldCBjbGljayBsaXN0ZW5lciB0aGF0IHRvZ2dsZXMgYXJpYS1leHBhbmRlZFxuICB0b2dnbGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlQXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCB0b2dnbGVyKSk7XG5cbiAgLy8gaW5pdGlhbGl6ZVxuICB0b2dnbGVWaXNpYmlsaXR5KGlzRXhwYW5kZWQodG9nZ2xlciksIGNvbGxhcHNpYmxlKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvYXJpYS5qcyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSFpwWlhkQ2IzZzlJakFnTUNBME1EQWdNakkxSWo0TkNpQWdQR1JsWm5NK0RRb2dJQ0FnUEhOMGVXeGxQZzBLSUNBZ0lDQWdMbU5zY3kweElIc05DaUFnSUNBZ0lHWnBiR3c2SUc1dmJtVTdEUW9nSUNBZ0lDQjlEUW9OQ2lBZ0lDQWdJQzVqYkhNdE1pQjdEUW9nSUNBZ0lDQm1hV3hzT2lBall6WmpObU0zT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1zSUM1amJITXROQ0I3RFFvZ0lDQWdJQ0JtYVd4c09pQWpabVptT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1nZXcwS0lDQWdJQ0FnYjNCaFkybDBlVG9nTUM0M093MEtJQ0FnSUNBZ2ZRMEtJQ0FnSUR3dmMzUjViR1UrRFFvZ0lEd3ZaR1ZtY3o0TkNpQWdQSFJwZEd4bFBtTnZiblJsYm5RZ2RIbHdaU0J3YkdGalpXaHZiR1JsY2w4eVBDOTBhWFJzWlQ0TkNpQWdQR2NnYVdROUlreGhlV1Z5WHpJaUlHUmhkR0V0Ym1GdFpUMGlUR0Y1WlhJZ01pSStEUW9nSUNBZ1BHY2dhV1E5SW1OdmJuUmxiblJmZEhsd1pWOXdiR0ZqWldodmJHUmxjaTB4WDJOdmNIa2lJR1JoZEdFdGJtRnRaVDBpWTI5dWRHVnVkQ0IwZVhCbElIQnNZV05sYUc5c1pHVnlMVEVnWTI5d2VTSStEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxURWlJSGRwWkhSb1BTSTBNREFpSUdobGFXZG9kRDBpTWpJMUlpOCtEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxUSWlJSGc5SWpFeE1pNDFNU0lnZVQwaU5ETXVOREVpSUhkcFpIUm9QU0l4TnpZdU9UWWlJR2hsYVdkb2REMGlNVE0xTGpRMUlpQnllRDBpTVRBaUlISjVQU0l4TUNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE16WXVOallpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5URXVORGtpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5qWXVNU0lnWTNrOUlqWXhMams0SWlCeVBTSTBMamd4SWk4K0RRb2dJQ0FnSUNBOFp5QnBaRDBpWDBkeWIzVndYeUlnWkdGMFlTMXVZVzFsUFNJbWJIUTdSM0p2ZFhBbVozUTdJajROQ2lBZ0lDQWdJQ0FnUEdjZ2FXUTlJbDlIY205MWNGOHlJaUJrWVhSaExXNWhiV1U5SWlac2REdEhjbTkxY0NabmREc2lQZzBLSUNBZ0lDQWdJQ0FnSUR4d1lYUm9JR2xrUFNKZlEyOXRjRzkxYm1SZlVHRjBhRjhpSUdSaGRHRXRibUZ0WlQwaUpteDBPME52YlhCdmRXNWtJRkJoZEdnbVozUTdJaUJqYkdGemN6MGlZMnh6TFRRaUlHUTlJazB5TmpNdU1qZ3NPVFV1TWpGRE1qWXdMRGt5TGpBM0xESTFOU3c1TVM0MUxESTBPQzQwTXl3NU1TNDFTREl5TjNZNFNERTVPUzQxYkMweUxqRTNMREV3TGpJMFlUSTFMamcwTERJMUxqZzBMREFzTUN3eExERXhMalE0TFRFdU5qTXNNVGt1T1RNc01Ua3VPVE1zTUN3d0xERXNNVFF1TXprc05TNDFOeXd4T0M0eU5pd3hPQzR5Tml3d0xEQXNNU3cxTGpVeUxERXpMallzTWpNdU1URXNNak11TVRFc01Dd3dMREV0TWk0NE5Dd3hNUzR3TlN3eE9DNDJOU3d4T0M0Mk5Td3dMREFzTVMwNExqQTJMRGN1Tnprc09TdzVMREFzTUN3eExUUXVNVElzTVM0ek4wZ3lNeloyTFRJeGFERXdMalF5WXpjdU16WXNNQ3d4TWk0NE15MHhMall4TERFMkxqUXlMVFZ6TlM0ek9DMDNMalE0TERVdU16Z3RNVE11TkRSRE1qWTRMakl5TERFd01pNHlPU3d5TmpZdU5UY3NPVGd1TXpVc01qWXpMakk0TERrMUxqSXhXbTB0TVRVc01UZGpMVEV1TkRJc01TNHlNaTB6TGprc01TNHlOUzAzTGpReExERXVNalZJTWpNMmRpMHhOR2cxTGpZeVlUa3VOVGNzT1M0MU55d3dMREFzTVN3M0xESXVPVE1zTnk0d05TdzNMakExTERBc01Dd3hMREV1T0RVc05DNDVNa0UyTGpNekxEWXVNek1zTUN3d0xERXNNalE0TGpNeExERXhNaTR5TlZvaUx6NE5DaUFnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpWDFCaGRHaGZJaUJrWVhSaExXNWhiV1U5SWlac2REdFFZWFJvSm1kME95SWdZMnhoYzNNOUltTnNjeTAwSWlCa1BTSk5NakF5TGprc01URTVMakV4WVRndU1USXNPQzR4TWl3d0xEQXNNQzAzTGpJNExEUXVOVEpzTFRFMkxURXVNaklzTnk0eU1pMHpNQzQ1TWtneE56UjJNakpJTVRVemRpMHlNa2d4TXpaMk5UWm9NVGQyTFRJeGFESXhkakl4YURJd0xqTXhZeTB5TGpjeUxEQXROUzB4TGpVekxUY3RNMkV4T1M0eE9Td3hPUzR4T1N3d0xEQXNNUzAwTGpjekxUUXVPRE1zTWpNdU5UZ3NNak11TlRnc01Dd3dMREV0TXkwMkxqWnNNVFl0TWk0eU5tRTRMakV4TERndU1URXNNQ3d4TERBc055NHlOaTB4TVM0M01sb2lMejROQ2lBZ0lDQWdJQ0FnUEM5blBnMEtJQ0FnSUNBZ1BDOW5QZzBLSUNBZ0lDQWdQSEpsWTNRZ1kyeGhjM005SW1Oc2N5MHpJaUI0UFNJeE56Y3VOallpSUhrOUlqVTNMalkySWlCM2FXUjBhRDBpT1RJdU1qZ2lJR2hsYVdkb2REMGlPUzR6T0NJZ2NuZzlJak11TlNJZ2NuazlJak11TlNJdlBnMEtJQ0FnSUR3dlp6NE5DaUFnUEM5blBnMEtQQzl6ZG1jK0RRbz1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBIdWJWaWV3IGZyb20gJy4vaHViLXZpZXcnO1xuaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvbiBmcm9tICcuL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uJztcbmltcG9ydCBVcGxvYWRTZWN0aW9uIGZyb20gJy4vdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24nO1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4vaHViLXNlcnZpY2VzJztcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4vdXRpbHMvZXJyb3JzJztcbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gSHViU3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aXRsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb25JZFxuICogQHByb3BlcnR5IHtib29sZWFufSBleHBhbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFwaVJvb3RVcmxcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBFcnJvck1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXJyb3JDb2RlXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gU2VsZWN0ZWRFbGVtZW50XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRcbiAqL1xuLyoqXG4gKiBTZWxlY3QgZXZlbnRcbiAqIEBldmVudCBIdWIjc2VsZWN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEVycm9yIGV2ZW50XG4gKiBAZXZlbnQgSHViI2Vycm9yXG4gKiBAdHlwZSB7RXJyb3JNZXNzYWdlfVxuICovXG4vKipcbiAqIFVwbG9hZCBldmVudFxuICogQGV2ZW50IEh1YiN1cGxvYWRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgSHViI2Vycm9yXG4gKiBAZmlyZXMgSHViI3VwbG9hZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWIge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjb250cm9sbGVyc1xuICAgIHRoaXMuY29udGVudFR5cGVTZWN0aW9uID0gbmV3IENvbnRlbnRUeXBlU2VjdGlvbihzdGF0ZSk7XG4gICAgdGhpcy51cGxvYWRTZWN0aW9uID0gbmV3IFVwbG9hZFNlY3Rpb24oc3RhdGUpO1xuXG4gICAgLy8gdmlld3NcbiAgICB0aGlzLnZpZXcgPSBuZXcgSHViVmlldyhzdGF0ZSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gcHJvcGFnYXRlIGNvbnRyb2xsZXIgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAnZXJyb3InXSwgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24pO1xuICAgIHRoaXMucHJvcGFnYXRlKFsndXBsb2FkJ10sIHRoaXMudXBsb2FkU2VjdGlvbik7XG5cbiAgICAvLyBoYW5kbGUgZXZlbnRzXG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy5zZXRQYW5lbFRpdGxlLCB0aGlzKTtcbiAgICB0aGlzLm9uKCdzZWxlY3QnLCB0aGlzLnZpZXcuY2xvc2VQYW5lbCwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcub24oJ3RhYi1jaGFuZ2UnLCB0aGlzLnZpZXcuc2V0U2VjdGlvblR5cGUsIHRoaXMudmlldyk7XG4gICAgdGhpcy52aWV3Lm9uKCdwYW5lbC1jaGFuZ2UnLCB0aGlzLnZpZXcudG9nZ2xlUGFuZWxPcGVuLmJpbmQodGhpcy52aWV3KSwgdGhpcy52aWV3KTtcblxuICAgIHRoaXMuaW5pdFRhYlBhbmVsKHN0YXRlKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHByb21pc2Ugb2YgYSBjb250ZW50IHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gICAqIEByZXR1cm4ge1Byb21pc2UuPENvbnRlbnRUeXBlPn1cbiAgICovXG4gIGdldENvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUobWFjaGluZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlIG9mIHRoZSBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICovXG4gIHNldFBhbmVsVGl0bGUoe2lkfSnCoHtcbiAgICB0aGlzLmdldENvbnRlbnRUeXBlKGlkKS50aGVuKCh7dGl0bGV9KSA9PiB0aGlzLnZpZXcuc2V0VGl0bGUodGl0bGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIHRhYiBwYW5lbFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbklkXG4gICAqL1xuICBpbml0VGFiUGFuZWwoeyBzZWN0aW9uSWQgPSAnY29udGVudC10eXBlcycgfSkge1xuICAgIGNvbnN0IHRhYkNvbmZpZ3MgPSBbe1xuICAgICAgdGl0bGU6ICdDcmVhdGUgQ29udGVudCcsXG4gICAgICBpZDogJ2NvbnRlbnQtdHlwZXMnLFxuICAgICAgY29udGVudDogdGhpcy5jb250ZW50VHlwZVNlY3Rpb24uZ2V0RWxlbWVudCgpLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdVcGxvYWQnLFxuICAgICAgaWQ6ICd1cGxvYWQnLFxuICAgICAgY29udGVudDogdGhpcy51cGxvYWRTZWN0aW9uLmdldEVsZW1lbnQoKVxuICAgIH1dO1xuXG4gICAgLy8gc2V0cyB0aGUgY29ycmVjdCBvbmUgc2VsZWN0ZWRcbiAgICB0YWJDb25maWdzXG4gICAgICAuZmlsdGVyKGNvbmZpZyA9PiBjb25maWcuaWQgPT09IHNlY3Rpb25JZClcbiAgICAgIC5mb3JFYWNoKGNvbmZpZyA9PiBjb25maWcuc2VsZWN0ZWQgPSB0cnVlKTtcblxuICAgIHRhYkNvbmZpZ3MuZm9yRWFjaCh0YWJDb25maWcgPT4gdGhpcy52aWV3LmFkZFRhYih0YWJDb25maWcpKTtcbiAgICB0aGlzLnZpZXcuYWRkQm90dG9tQm9yZGVyKCk7IC8vIEFkZHMgYW4gYW5pbWF0ZWQgYm90dG9tIGJvcmRlciB0byBlYWNoIHRhYlxuICAgIHRoaXMudmlldy5pbml0VGFiUGFuZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGVsZW1lbnQgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9odWIuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0eWxlcy9tYWluLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgZ2V0QXR0cmlidXRlLCByZW1vdmVDaGlsZCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IGluaXRQYW5lbCBmcm9tIFwiY29tcG9uZW50cy9wYW5lbFwiO1xuaW1wb3J0IGluaXRJbWFnZVNjcm9sbGVyIGZyb20gXCJjb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyXCI7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5pbXBvcnQgbm9JY29uIGZyb20gJy4uLy4uL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnJztcblxuLyoqXG4gKiBAY29uc3RhbnQge3N0cmluZ31cbiAqL1xuY29uc3QgQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCA9ICdkYXRhLWlkJztcblxuLyoqXG4gKiBAY29uc3RhbnQge251bWJlcn1cbiAqL1xuY29uc3QgTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiA9IDMwMDtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgaWYgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGVsZW1lbnQsIHZpc2libGUpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBlbXB0eVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbXB0eSA9ICh0ZXh0KSA9PiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSAmJiAodGV4dC5sZW5ndGggPT09IDApO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsVmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgdmlld1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZVZpZXcoKTtcblxuICAgIC8vIGdyYWIgcmVmZXJlbmNlc1xuICAgIHRoaXMudXNlQnV0dG9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXVzZScpO1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsJyk7XG4gICAgdGhpcy5pbWFnZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtdHlwZS1pbWFnZScpO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWRldGFpbHMgaDMnKTtcbiAgICB0aGlzLm93bmVyID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3duZXInKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kZXRhaWxzIC5zbWFsbCcpO1xuICAgIHRoaXMuZGVtb0J1dHRvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRlbW8tYnV0dG9uJyk7XG4gICAgdGhpcy5jYXJvdXNlbCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcm91c2VsJyk7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QgPSB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gICAgdGhpcy5saWNlbmNlUGFuZWwgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saWNlbmNlLXBhbmVsJyk7XG5cbiAgICAvLyBpbml0IGludGVyYWN0aXZlIGVsZW1lbnRzXG4gICAgaW5pdFBhbmVsKHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICBpbml0SW1hZ2VTY3JvbGxlcih0aGlzLmNhcm91c2VsKTtcblxuICAgIC8vIGZpcmUgZXZlbnRzIG9uIGJ1dHRvbiBjbGlja1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2stYnV0dG9uJykpO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2luc3RhbGwnLCB0aGlzLCB0aGlzLmluc3RhbGxCdXR0b24pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIHZpZXcgYXMgYSBIVE1MRWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZVZpZXcgKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtZGV0YWlsJztcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJhY2stYnV0dG9uIGljb24tYXJyb3ctdGhpY2tcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLXdyYXBwZXJcIj48aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmUgY29udGVudC10eXBlLWltYWdlXCIgc3JjPVwiJHtub0ljb259XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWRldGFpbHNcIj5cbiAgICAgICAgICA8aDM+PC9oMz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3duZXJcIj48L2Rpdj5cbiAgICAgICAgICA8cCBjbGFzcz1cInNtYWxsXCI+PC9wPlxuICAgICAgICAgIDxhIGNsYXNzPVwiYnV0dG9uIGRlbW8tYnV0dG9uXCIgdGFyZ2V0PVwiX2JsYW5rXCIgYXJpYS1oaWRkZW49XCJmYWxzZVwiIGhyZWY9XCJodHRwczovL2g1cC5vcmcvY2hhcnRcIj5Db250ZW50IERlbW88L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2Fyb3VzZWxcIiByb2xlPVwicmVnaW9uXCIgZGF0YS1zaXplPVwiNVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWJ1dHRvbiBwcmV2aW91c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRpc2FibGVkPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIG5leHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkaXNhYmxlZD48c3BhbiBjbGFzcz1cImljb24tYXJyb3ctdGhpY2tcIj48L3NwYW4+PC9zcGFuPlxuICAgICAgICA8bmF2IGNsYXNzPVwic2Nyb2xsZXJcIj5cbiAgICAgICAgICA8dWw+PC91bD5cbiAgICAgICAgPC9uYXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxociAvPlxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1iYXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnkgYnV0dG9uLXVzZVwiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBkYXRhLWlkPVwiSDVQLkNoYXJ0XCI+VXNlPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGF0YS1pZD1cIkg1UC5DaGFydFwiPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj5JbnN0YWxsPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZ3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIGxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGVyXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1jb250cm9scz1cImxpY2VuY2UtcGFuZWxcIj48c3BhbiBjbGFzcz1cImljb24tYWNjb3JkaW9uLWFycm93XCI+PC9zcGFuPiBUaGUgTGljZW5jZSBJbmZvPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIiBpZD1cImxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5LWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGltYWdlcyBmcm9tIHRoZSBjYXJvdXNlbFxuICAgKi9cbiAgcmVtb3ZlQWxsSW1hZ2VzSW5DYXJvdXNlbCgpIHtcbiAgICB0aGlzLmNhcm91c2VsTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmZvckVhY2gocmVtb3ZlQ2hpbGQodGhpcy5jYXJvdXNlbExpc3QpKTtcbiAgICB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbC1saWdodGJveCcpLmZvckVhY2gocmVtb3ZlQ2hpbGQodGhpcy5jYXJvdXNlbCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpbWFnZSB0byB0aGUgY2Fyb3VzZWxcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGltYWdlXG4gICAqL1xuICBhZGRJbWFnZVRvQ2Fyb3VzZWwoaW1hZ2UpIHtcbiAgICAvLyBhZGQgbGlnaHRib3hcbiAgICBjb25zdCBsaWdodGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxpZ2h0Ym94LmlkID0gYGxpZ2h0Ym94LSR7dGhpcy5jYXJvdXNlbExpc3QuY2hpbGRFbGVtZW50Q291bnR9YDtcbiAgICBsaWdodGJveC5jbGFzc05hbWUgPSAnY2Fyb3VzZWwtbGlnaHRib3gnO1xuICAgIGxpZ2h0Ym94LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGxpZ2h0Ym94LmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBzcmM9XCIke2ltYWdlLnVybH1cIiBhbHQ9XCIke2ltYWdlLmFsdH1cIj5gO1xuICAgIHRoaXMuY2Fyb3VzZWwuYXBwZW5kQ2hpbGQobGlnaHRib3gpO1xuXG4gICAgLy8gYWRkIHRodW1ibmFpbFxuICAgIGNvbnN0IHRodW1ibmFpbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdGh1bWJuYWlsLmNsYXNzTmFtZSA9ICdzbGlkZSc7XG4gICAgdGh1bWJuYWlsLmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIiR7aW1hZ2UudXJsfVwiIGFsdD1cIiR7aW1hZ2UuYWx0fVwiIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiBhcmlhLWNvbnRyb2xzPVwiJHtsaWdodGJveC5pZH1cIiAvPmA7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QuYXBwZW5kQ2hpbGQodGh1bWJuYWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbWFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gICAqL1xuICBzZXRJbWFnZShzcmMpIHtcbiAgICB0aGlzLmltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjIHx8IG5vSWNvbik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRJZChpZCkge1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICAgIHRoaXMudXNlQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gYCR7dGl0bGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XG4gICAgaWYodGV4dC5sZW5ndGggPiBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OKSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9IDxzcGFuIGNsYXNzPVwicmVhZC1tb3JlIGxpbmtcIj5SZWFkIG1vcmU8L3NwYW4+YDtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25cbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5yZWFkLW1vcmUsIC5yZWFkLWxlc3MnKVxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZURlc2NyaXB0aW9uRXhwYW5kZWQodGV4dCkpO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lclRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIFJlYWQgbGVzcyBhbmQgUmVhZCBtb3JlIHRleHRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovXG4gIHRvZ2dsZURlc2NyaXB0aW9uRXhwYW5kZWQodGV4dCkge1xuICAgIC8vIGZsaXAgYm9vbGVhblxuICAgIHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCA9ICF0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQ7XG5cbiAgICBpZih0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQpIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGV4dH0gPHNwYW4gY2xhc3M9XCJyZWFkLWxlc3MgbGlua1wiPlJlYWQgbGVzczwvc3Bhbj5gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gYCR7dGhpcy5lbGxpcHNpcyhNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OLCB0ZXh0KX0gPHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgIH1cblxuICAgIHRoaXMuZGVzY3JpcHRpb25cbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcucmVhZC1tb3JlLCAucmVhZC1sZXNzJylcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvcnRlbnMgYSBzdHJpbmcsIGFuZCBwdXRzIGFuIGVsaXBzaXMgYXQgdGhlIGVuZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgZWxsaXBzaXMoc2l6ZSwgdGV4dCkge1xuICAgIHJldHVybiBgJHt0ZXh0LnN1YnN0cigwLCBzaXplKX0uLi5gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxpY2VuY2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICovXG4gIHNldExpY2VuY2UodHlwZSkge1xuICAgIGlmKHR5cGUpe1xuICAgICAgdGhpcy5saWNlbmNlUGFuZWwucXVlcnlTZWxlY3RvcignLnBhbmVsLWJvZHktaW5uZXInKS5pbm5lclRleHQgPSB0eXBlO1xuICAgICAgc2hvdyh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlkZSh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyXG4gICAqL1xuICBzZXRPd25lcihvd25lcikge1xuICAgIGlmKG93bmVyKSB7XG4gICAgICB0aGlzLm93bmVyLmlubmVySFRNTCA9IGBCeSAke293bmVyfWA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5vd25lci5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZXhhbXBsZSB1cmxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgc2V0RXhhbXBsZSh1cmwpIHtcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmRlbW9CdXR0b24sICFpc0VtcHR5KHVybCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgaWYgdGhlIGNvbnRlbnQgdHlwZSBpcyBpbnN0YWxsZWRcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBpbnN0YWxsZWRcbiAgICovXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xuICAgIHRvZ2dsZVZpc2liaWxpdHkodGhpcy51c2VCdXR0b24sIGluc3RhbGxlZCk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmluc3RhbGxCdXR0b24sICFpbnN0YWxsZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZURldGFpbFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWRldGFpbC12aWV3XCI7XG5pbXBvcnQgSHViU2VydmljZXMgZnJvbSBcIi4uL2h1Yi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlRGV0YWlsIHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIHNlcnZpY2VzXG4gICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBIdWJTZXJ2aWNlcyh7XG4gICAgICBhcGlSb290VXJsOiBzdGF0ZS5hcGlSb290VXJsXG4gICAgfSk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlRGV0YWlsVmlldyhzdGF0ZSk7XG4gICAgdGhpcy52aWV3Lm9uKCdpbnN0YWxsJywgdGhpcy5pbnN0YWxsLCB0aGlzKTtcblxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ2Nsb3NlJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBsb2FkQnlJZChpZCkge1xuICAgIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICAgaW5zdGFsbCh7aWR9KSB7XG4gICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlKGlkKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKVxuICAgICAgIC50aGVuKG1hY2hpbmVOYW1lID0+IHRoaXMuc2VydmljZXMuaW5zdGFsbENvbnRlbnRUeXBlKG1hY2hpbmVOYW1lKSlcbiAgICAgICAudGhlbihjb250ZW50VHlwZSA9PiBjb25zb2xlLmRlYnVnKCdUT0RPLCBndWkgdXBkYXRlcycsIGNvbnRlbnRUeXBlKSlcbiAgIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdmlldyB3aXRoIHRoZSBjb250ZW50IHR5cGUgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlKSB7XG4gICAgdGhpcy52aWV3LnNldElkKGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcbiAgICB0aGlzLnZpZXcuc2V0VGl0bGUoY29udGVudFR5cGUudGl0bGUpO1xuICAgIHRoaXMudmlldy5zZXREZXNjcmlwdGlvbihjb250ZW50VHlwZS5kZXNjcmlwdGlvbik7XG4gICAgdGhpcy52aWV3LnNldEltYWdlKGNvbnRlbnRUeXBlLmljb24pO1xuICAgIHRoaXMudmlldy5zZXRFeGFtcGxlKGNvbnRlbnRUeXBlLmV4YW1wbGUpO1xuICAgIHRoaXMudmlldy5zZXRPd25lcihjb250ZW50VHlwZS5vd25lcik7XG4gICAgdGhpcy52aWV3LnNldElzSW5zdGFsbGVkKCEhY29udGVudFR5cGUuaW5zdGFsbGVkKTtcbiAgICB0aGlzLnZpZXcuc2V0TGljZW5jZShjb250ZW50VHlwZS5saWNlbnNlKTtcblxuICAgIC8vIHVwZGF0ZSBjYXJvdXNlbFxuICAgIHRoaXMudmlldy5yZW1vdmVBbGxJbWFnZXNJbkNhcm91c2VsKCk7XG4gICAgY29udGVudFR5cGUuc2NyZWVuc2hvdHMuZm9yRWFjaCh0aGlzLnZpZXcuYWRkSW1hZ2VUb0Nhcm91c2VsLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsLmpzIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIHJlbW92ZUNoaWxkIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4uL3V0aWxzL2V2ZW50cyc7XG5pbXBvcnQgbm9JY29uIGZyb20gJy4uLy4uL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0VmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgcm9vdCBlbGVtZW50XG4gICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgPSAnY29udGVudC10eXBlLWxpc3QnO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIGhpZGUoKSB7XG4gICAgaGlkZSh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgcm9vdCBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHNob3codGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgcm93cyBmcm9tIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgcmVtb3ZlQWxsUm93cygpIHtcbiAgICB3aGlsZSh0aGlzLnJvb3RFbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSApe1xuICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLnJvb3RFbGVtZW50Lmxhc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSByb3dcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICovXG4gIGFkZFJvdyhjb250ZW50VHlwZSkge1xuICAgIGNvbnN0IHJvdyA9IHRoaXMuY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHRoaXMpO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLCByb3cpO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocm93KVxuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGEgQ29udGVudCBUeXBlIGNvbmZpZ3VyYXRpb24gYW5kIGNyZWF0ZXMgYSByb3cgZG9tXG4gICAqXG4gICAqIEBwYXJhbSB7Q29udGVudFR5cGV9IGNvbnRlbnRUeXBlXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IHNjb3BlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlQ29udGVudFR5cGVSb3coY29udGVudFR5cGUsIHNjb3BlKSB7XG4gICAgLy8gcm93IGl0ZW1cbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBlbGVtZW50LmlkID0gYGNvbnRlbnQtdHlwZS0ke2NvbnRlbnRUeXBlLm1hY2hpbmVOYW1lfWA7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG5cbiAgICAvLyBjcmVhdGUgYnV0dG9uIGNvbmZpZ1xuICAgIGNvbnN0IHVzZUJ1dHRvbkNvbmZpZyA9IHsgdGV4dDogJ1VzZScsIGNsczogJ2J1dHRvbi1wcmltYXJ5JywgaWNvbjogJycgfTtcbiAgICBjb25zdCBpbnN0YWxsQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnaW5zdGFsbCcsIGNsczogJ2J1dHRvbi1pbnZlcnNlLXByaW1hcnkgYnV0dG9uLWluc3RhbGwnLCBpY29uOiAnaWNvbi1hcnJvdy10aGljayd9O1xuICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRlbnRUeXBlLmluc3RhbGxlZCA/ICB1c2VCdXR0b25Db25maWc6IGluc3RhbGxCdXR0b25Db25maWc7XG5cbiAgICBjb25zdCB0aXRsZSA9IGNvbnRlbnRUeXBlLnRpdGxlIHx8IGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gY29udGVudFR5cGUuc3VtbWFyeSB8fCAnJztcblxuICAgIGNvbnN0IGltYWdlID0gY29udGVudFR5cGUuaWNvbiB8fCBub0ljb247XG5cbiAgICAvLyBjcmVhdGUgaHRtbFxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZX1cIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uICR7YnV0dG9uLmNsc31cIiBkYXRhLWlkPVwiJHtjb250ZW50VHlwZS5tYWNoaW5lTmFtZX1cIiB0YWJpbmRleD1cIjBcIj48c3BhbiBjbGFzcz1cIiR7YnV0dG9uLmljb259XCI+PC9zcGFuPiR7YnV0dG9uLnRleHR9PC9zcGFuPlxuICAgICAgPGg0PiR7dGl0bGV9PC9oND5cbiAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPiR7ZGVzY3JpcHRpb259PC9kaXY+XG4gICBgO1xuXG4gICAgLy8gaGFuZGxlIHVzZSBidXR0b25cbiAgICBjb25zdCB1c2VCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tcHJpbWFyeScpO1xuICAgIGlmKHVzZUJ1dHRvbil7XG4gICAgICByZWxheUNsaWNrRXZlbnRBcygnc2VsZWN0Jywgc2NvcGUsIHVzZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlTGlzdFZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLWxpc3Qtdmlld1wiO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBSb3cgc2VsZWN0ZWQgZXZlbnRcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3Qjcm93LXNlbGVjdGVkXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIFVwZGF0ZSBjb250ZW50IHR5cGUgbGlzdCBldmVudFxuICogQGV2ZW50IENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCN1cGRhdGUtY29udGVudC10eXBlLWxpc3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVudFR5cGVMaXN0IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGFkZCB0aGUgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlTGlzdFZpZXcoc3RhdGUpO1xuICAgIHRoaXMucHJvcGFnYXRlKFsncm93LXNlbGVjdGVkJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGUgdGhpcyBlbGVtZW50XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudmlldy5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyB0aGlzIGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgdGhpcy52aWV3LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGxpc3Qgd2l0aCBuZXcgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICAgKi9cbiAgdXBkYXRlKGNvbnRlbnRUeXBlcykge1xuICAgIHRoaXMudmlldy5yZW1vdmVBbGxSb3dzKCk7XG4gICAgY29udGVudFR5cGVzLmZvckVhY2godGhpcy52aWV3LmFkZFJvdywgdGhpcy52aWV3KTtcbiAgICB0aGlzLmZpcmUoJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCcsIHt9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZpZXdzIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSwgcXVlcnlTZWxlY3RvckFsbCB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IGluaXRNZW51IGZyb20gJ2NvbXBvbmVudHMvbWVudSc7XG5pbXBvcnQge0V2ZW50ZnVsfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50QnJvd3NlclZpZXcge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoc3RhdGUpO1xuXG4gICAgLy8gcGljayBlbGVtZW50c1xuICAgIHRoaXMubWVudWJhciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1uYXYnKTtcbiAgICB0aGlzLmlucHV0RmllbGQgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwic2VhcmNoXCJdIGlucHV0Jyk7XG4gICAgY29uc3QgaW5wdXRCdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwic2VhcmNoXCJdIC5pbnB1dC1ncm91cC1hZGRvbicpO1xuXG4gICAgLy8gaW5wdXQgZmllbGRcbiAgICB0aGlzLmlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICB0aGlzLmZpcmUoJ3NlYXJjaCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0LFxuICAgICAgICBxdWVyeTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGlucHV0IGJ1dHRvblxuICAgIGlucHV0QnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJhcicpLmZvY3VzKClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIG1lbnUgZ3JvdXAgZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3RhdGVcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVFbGVtZW50KHN0YXRlKSB7XG4gICAgbGV0IG1lbnV0aXRsZSA9ICdCcm93c2UgY29udGVudCB0eXBlcyc7XG4gICAgbGV0IG1lbnVJZCA9ICdjb250ZW50LXR5cGUtZmlsdGVyJztcbiAgICBsZXQgc2VhcmNoVGV4dCA9ICdTZWFyY2ggZm9yIENvbnRlbnQgVHlwZXMnO1xuXG4gICAgLy8gY3JlYXRlIGVsZW1lbnRcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwibWVudS1ncm91cFwiPlxuICAgICAgICA8bmF2ICByb2xlPVwibWVudWJhclwiIGNsYXNzPVwibmF2YmFyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlciBuYXZiYXItdG9nZ2xlci1yaWdodFwiIGFyaWEtY29udHJvbHM9XCIke21lbnVJZH1cIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1hY2NvcmRpb24tYXJyb3dcIj48L3NwYW4+XG4gICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItYnJhbmRcIj4ke21lbnV0aXRsZX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8dWwgaWQ9XCIke21lbnVJZH1cIiBjbGFzcz1cIm5hdmJhci1uYXZcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3VsPlxuICAgICAgICA8L25hdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiIHJvbGU9XCJzZWFyY2hcIj5cbiAgICAgICAgICA8aW5wdXQgaWQ9XCJodWItc2VhcmNoLWJhclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1yb3VuZGVkXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiR7c2VhcmNoVGV4dH1cIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpY29uLXNlYXJjaFwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbWVudSBpdGVtXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgYWRkTWVudUl0ZW0odGV4dCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnVpdGVtJyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0O1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZmlyZSgnbWVudS1zZWxlY3RlZCcsIHtcbiAgICAgICAgZWxlbWVudDogZXZlbnQudGFyZ2V0XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHNldHMgZmlyc3QgdG8gYmUgc2VsZWN0ZWRcbiAgICBpZih0aGlzLm1lbnViYXIuY2hpbGRFbGVtZW50Q291bnQgPT0gMSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0byBtZW51IGJhclxuICAgIHRoaXMubWVudWJhci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGlucHV0IGZpZWxkXG4gICAqL1xuICBjbGVhcklucHV0RmllbGQoKSB7XG4gICAgdGhpcy5pbnB1dEZpZWxkLnZhbHVlID0gJyc7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgbWVudSBpdGVtIGlzIHRoZSBmaXJzdCBjaGlsZCBpbiB0aGUgbWVudVxuICAgKlxuICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbWVudUl0ZW1cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGlzRmlyc3RNZW51SXRlbShtZW51SXRlbSkge1xuICAgIHJldHVybiBtZW51SXRlbSA9PT0gdGhpcy5tZW51YmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmVzIHRoZSBmaXJzdCBtZW51IGl0ZW0gaXMgc2VsZWN0ZWRcbiAgICovXG4gIHJlc2V0TWVudVNlbGVjdGlvbigpIHtcbiAgICB0aGlzLm1lbnViYXIucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJtZW51aXRlbVwiXScpXG4gICAgICAuZm9yRWFjaChtZW51SXRlbSA9PlxuICAgICAgICBtZW51SXRlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCB0aGlzLmlzRmlyc3RNZW51SXRlbShtZW51SXRlbSkudG9TdHJpbmcoKSlcbiAgICAgICk7XG4gIH1cblxuICBpbml0TWVudSgpIHtcbiAgICBjb25zdCB1bmRlcmxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdW5kZXJsaW5lLmNsYXNzTmFtZSA9ICdtZW51aXRlbS11bmRlcmxpbmUnO1xuICAgIHRoaXMubWVudWJhci5hcHBlbmRDaGlsZCh1bmRlcmxpbmUpO1xuICAgIGluaXRNZW51KHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24tdmlldy5qcyIsImltcG9ydCBDb250ZW50VHlwZVNlY3Rpb25WaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXdcIjtcbmltcG9ydCBTZWFyY2hTZXJ2aWNlIGZyb20gXCIuLi9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZVwiO1xuaW1wb3J0IENvbnRlbnRUeXBlTGlzdCBmcm9tICcuLi9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdCc7XG5pbXBvcnQgQ29udGVudFR5cGVEZXRhaWwgZnJvbSAnLi4vY29udGVudC10eXBlLWRldGFpbC9jb250ZW50LXR5cGUtZGV0YWlsJztcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbmRlckVycm9yTWVzc2FnZX0gZnJvbSAnLi4vdXRpbHMvZXJyb3JzJztcblxuLyoqXG4gKiBAY2xhc3MgQ29udGVudFR5cGVTZWN0aW9uXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb24ge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZW50VHlwZVNlY3Rpb25WaWV3KHN0YXRlKTtcblxuICAgIC8vIGNvbnRyb2xsZXJcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2UgPSBuZXcgU2VhcmNoU2VydmljZSh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QgPSBuZXcgQ29udGVudFR5cGVMaXN0KCk7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbCA9IG5ldyBDb250ZW50VHlwZURldGFpbCh7IGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmwgfSk7XG5cbiAgICAvLyBhZGQgbWVudSBpdGVtc1xuICAgIFsnQWxsJywgJ015IENvbnRlbnQgVHlwZXMnLCAnTW9zdCBQb3B1bGFyJ11cbiAgICAgIC5mb3JFYWNoKG1lbnVUZXh0ID0+IHRoaXMudmlldy5hZGRNZW51SXRlbShtZW51VGV4dCkpO1xuICAgIHRoaXMudmlldy5pbml0TWVudSgpO1xuXG4gICAgLy8gRWxlbWVudCBmb3IgaG9sZGluZyBsaXN0IGFuZCBkZXRhaWxzIHZpZXdzXG4gICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnY29udGVudC10eXBlLXNlY3Rpb24nKTtcblxuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBzZWN0aW9uO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50VHlwZUxpc3QuZ2V0RWxlbWVudCgpKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVEZXRhaWwuZ2V0RWxlbWVudCgpKTtcblxuICAgIHRoaXMudmlldy5nZXRFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5yb290RWxlbWVudCk7XG5cbiAgICAvLyBwcm9wYWdhdGUgZXZlbnRzXG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnLCAndXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0J10sIHRoaXMuY29udGVudFR5cGVMaXN0KTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3NlbGVjdCddLCB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsKTtcblxuICAgIC8vIHJlZ2lzdGVyIGxpc3RlbmVyc1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5zZWFyY2gsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5yZXNldE1lbnVTZWxlY3Rpb24sIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5yZXNldE1lbnVPbkVudGVyLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmFwcGx5U2VhcmNoRmlsdGVyLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmNsZWFySW5wdXRGaWVsZCwgdGhpcyk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Qub24oJ3Jvdy1zZWxlY3RlZCcsIHRoaXMuc2hvd0RldGFpbFZpZXcsIHRoaXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwub24oJ2Nsb3NlJywgdGhpcy5jbG9zZURldGFpbFZpZXcsIHRoaXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwub24oJ3NlbGVjdCcsIHRoaXMuY2xvc2VEZXRhaWxWaWV3LCB0aGlzKTtcblxuICAgIHRoaXMuaW5pdENvbnRlbnRUeXBlTGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3Qgd2l0aCBhIHNlYXJjaFxuICAgKi9cbiAgaW5pdENvbnRlbnRUeXBlTGlzdCgpIHtcbiAgICAvLyBpbml0aWFsaXplIGJ5IHNlYXJjaFxuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goXCJcIilcbiAgICAgIC50aGVuKGNvbnRlbnRUeXBlcyA9PiB0aGlzLmNvbnRlbnRUeXBlTGlzdC51cGRhdGUoY29udGVudFR5cGVzKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmZpcmUoJ2Vycm9yJywgZXJyb3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBhIHNlYXJjaCBhbmQgdXBkYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3RcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XG4gICAqL1xuICBzZWFyY2goe3F1ZXJ5fSkge1xuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2gocXVlcnkpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpO1xuICB9XG5cbiAgLyoqXG4gICAqICBFbnN1cmVzIHRoZSBmaXJzdCBtZW51IGVsZW1lbnQgaXMgc2VsZWN0ZWRcbiAgICovXG4gIHJlc2V0TWVudVNlbGVjdGlvbigpIHtcbiAgICB0aGlzLnZpZXcucmVzZXRNZW51U2VsZWN0aW9uKCk7XG4gIH1cblxuICByZXNldE1lbnVPbkVudGVyKHtrZXlDb2RlfSkge1xuICAgIGlmIChrZXlDb2RlID09PSAxMykge1xuICAgICAgdGhpcy5jbG9zZURldGFpbFZpZXcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGFwcGx5IGEgc2VhcmNoIGZpbHRlclxuICAgKi9cbiAgYXBwbHlTZWFyY2hGaWx0ZXIoKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnQ29udGVudFR5cGVTZWN0aW9uOiBtZW51IHdhcyBjbGlja2VkIScsIGV2ZW50KTtcbiAgfVxuXG4gIGNsZWFySW5wdXRGaWVsZCh7ZWxlbWVudH0pIHtcbiAgICBpZiAoIXRoaXMudmlldy5pc0ZpcnN0TWVudUl0ZW0oZWxlbWVudCkpIHtcbiAgICAgIHRoaXMudmlldy5jbGVhcklucHV0RmllbGQoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIGRldGFpbCB2aWV3XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2hvd0RldGFpbFZpZXcoe2lkfSkge1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0LmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmxvYWRCeUlkKGlkKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLnNob3coKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENsb3NlIGRldGFpbCB2aWV3XG4gICAqL1xuICBjbG9zZURldGFpbFZpZXcoKSB7XG4gICAgdGhpcy5jb250ZW50VHlwZURldGFpbC5oaWRlKCk7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3Quc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi5qcyIsImltcG9ydCBpbml0UGFuZWwgZnJvbSBcImNvbXBvbmVudHMvcGFuZWxcIlxuaW1wb3J0IGluaXRUYWJQYW5lbCBmcm9tIFwiY29tcG9uZW50cy90YWItcGFuZWxcIlxuaW1wb3J0IHsgY3VycnkgfSBmcm9tIFwidXRpbHMvZnVuY3Rpb25hbFwiO1xuaW1wb3J0IHsgYXR0cmlidXRlRXF1YWxzLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSB9IGZyb20gXCJ1dGlscy9lbGVtZW50c1wiO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgeyByZWxheUNsaWNrRXZlbnRBcyB9IGZyb20gJy4vdXRpbHMvZXZlbnRzJztcbi8qKlxuICogVGFiIGNoYW5nZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjdGFiLWNoYW5nZVxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBQYW5lbCBvcGVuIG9yIGNsb3NlIGV2ZW50XG4gKiBAZXZlbnQgSHViVmlldyNwYW5lbC1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogQGNvbnN0YW50IHtzdHJpbmd9XG4gKi9cbmNvbnN0IEFUVFJJQlVURV9EQVRBX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBpc09wZW4gPSBoYXNBdHRyaWJ1dGUoJ29wZW4nKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICogQGZpcmVzIEh1YlZpZXcjdGFiLWNoYW5nZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJWaWV3IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SHViU3RhdGV9IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgdGhpcy5yZW5kZXJUYWJQYW5lbChzdGF0ZSk7XG4gICAgdGhpcy5yZW5kZXJQYW5lbChzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBwYW5lbFxuICAgKi9cbiAgY2xvc2VQYW5lbCgpIHtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgcGFuZWxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICogQHBhcmFtIHtib29sZWFufSBleHBhbmRlZFxuICAgKi9cbiAgcmVuZGVyUGFuZWwoe3RpdGxlID0gJycsIHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJywgZXhwYW5kZWQgPSBmYWxzZX0pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMudGl0bGUuY2xhc3NOYW1lICs9IFwicGFuZWwtaGVhZGVyIGljb24taHViLWljb25cIjtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICghIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLnRpdGxlLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGBwYW5lbC1ib2R5LSR7c2VjdGlvbklkfWApO1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3BhbmVsLWNoYW5nZScsIHRoaXMsIHRoaXMudGl0bGUpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYm9keS5jbGFzc05hbWUgKz0gXCJwYW5lbC1ib2R5XCI7XG4gICAgdGhpcy5ib2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAoIWV4cGFuZGVkKS50b1N0cmluZygpKTtcbiAgICB0aGlzLmJvZHkuaWQgPSBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSArPSBgcGFuZWwgaDVwLXNlY3Rpb24tJHtzZWN0aW9uSWR9YDtcbiAgICBpZihleHBhbmRlZCl7XG4gICAgICB0aGlzLnBhbmVsLnNldEF0dHJpYnV0ZSgnb3BlbicsICcnKTtcbiAgICB9XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcbiAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuYm9keSk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSArPSBgaDVwIGg1cC1odWJgO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gICAgaW5pdFBhbmVsKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpZiBwYW5lbCBpcyBvcGVuLCB0aGlzIGlzIHVzZWQgZm9yIG91dGVyIGJvcmRlciBjb2xvclxuICAgKi9cbiAgdG9nZ2xlUGFuZWxPcGVuKCkge1xuICAgIGxldCBwYW5lbCA9IHRoaXMucGFuZWw7XG4gICAgaWYoaXNPcGVuKHBhbmVsKSkge1xuICAgICAgcGFuZWwucmVtb3ZlQXR0cmlidXRlKCdvcGVuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3BhbmVsLnF1ZXJ5U2VsZWN0b3IoJyNodWItc2VhcmNoLWJhcicpLmZvY3VzKCl9LDIwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgdGFiIHBhbmVsXG4gICAqL1xuICByZW5kZXJUYWJQYW5lbChzdGF0ZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYmxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMudGFibGlzdC5jbGFzc05hbWUgKz0gXCJ0YWJsaXN0XCI7XG4gICAgdGhpcy50YWJsaXN0LnNldEF0dHJpYnV0ZSAoJ3JvbGUnLCAndGFibGlzdCcpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKHRoaXMudGFibGlzdCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmNsYXNzTmFtZSArPSAndGFiLXBhbmVsJztcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50YWJMaXN0V3JhcHBlcik7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHRhYlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRlbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxuICAgKi9cbiAgYWRkVGFiKHt0aXRsZSwgaWQsIGNvbnRlbnQsIHNlbGVjdGVkID0gZmFsc2V9KSB7XG4gICAgY29uc3QgdGFiSWQgPSBgdGFiLSR7aWR9YDtcbiAgICBjb25zdCB0YWJQYW5lbElkID0gYHRhYi1wYW5lbC0ke2lkfWA7XG5cbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRhYi5jbGFzc05hbWUgKz0gJ3RhYic7XG4gICAgdGFiLmlkID0gdGFiSWQ7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRhYlBhbmVsSWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBzZWxlY3RlZC50b1N0cmluZygpKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKEFUVFJJQlVURV9EQVRBX0lELCBpZCk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWInKTtcbiAgICB0YWIuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3RhYi1jaGFuZ2UnLCB0aGlzLCB0YWIpO1xuXG4gICAgY29uc3QgdGFiUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YWJQYW5lbC5pZCA9IHRhYlBhbmVsSWQ7XG4gICAgdGFiUGFuZWwuY2xhc3NOYW1lICs9ICd0YWJwYW5lbCc7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmxsZWRieScsIHRhYklkKTtcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgKCFzZWxlY3RlZCkudG9TdHJpbmcoKSk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYnBhbmVsJyk7XG4gICAgdGFiUGFuZWwuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQodGFiKTtcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGFiUGFuZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gYW5pbWF0ZWQgYm9yZGVyIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhYlxuICAgKi9cbiAgYWRkQm90dG9tQm9yZGVyKCkge1xuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpO1xuICB9XG5cbiAgaW5pdFRhYlBhbmVsKCkge1xuICAgIGluaXRUYWJQYW5lbCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRTZWN0aW9uVHlwZSh7aWR9KSB7XG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgPSBgaDVwLXNlY3Rpb24tJHtpZH0gcGFuZWxgO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJpbXBvcnQge2N1cnJ5fSBmcm9tICd1dGlscy9mdW5jdGlvbmFsJ1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4uL2h1Yi1zZXJ2aWNlcyc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBUaGUgU2VhcmNoIFNlcnZpY2UgZ2V0cyBhIGNvbnRlbnQgdHlwZSBmcm9tIGh1Yi1zZXJ2aWNlcy5qc1xuICogaW4gdGhlIGZvcm0gb2YgYSBwcm9taXNlLiBJdCB0aGVuIGdlbmVyYXRlcyBhIHNjb3JlIGJhc2VkXG4gKiBvbiB0aGUgZGlmZmVyZW50IHdlaWdodGluZ3Mgb2YgdGhlIGNvbnRlbnQgdHlwZSBmaWVsZHMgYW5kXG4gKiBzb3J0cyB0aGUgcmVzdWx0cyBiYXNlZCBvbiB0aGUgZ2VuZXJhdGVkIHNjb3JlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUuYXBpUm9vdFVybFxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIEFkZCBjb250ZW50IHR5cGVzIHRvIHRoZSBzZWFyY2ggaW5kZXhcbiAgICB0aGlzLmNvbnRlbnRUeXBlcyA9IHRoaXMuc2VydmljZXMuY29udGVudFR5cGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBzZWFyY2hcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXT59IEEgcHJvbWlzZSBvZiBhbiBhcnJheSBvZiBjb250ZW50IHR5cGVzXG4gICAqL1xuICBzZWFyY2gocXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50VHlwZXMudGhlbihmaWx0ZXJCeVF1ZXJ5KHF1ZXJ5KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBGaWx0ZXJzIGEgbGlzdCBvZiBjb250ZW50IHR5cGVzIGJhc2VkIG9uIGEgcXVlcnlcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlcbiAqIEBwYXJhbSB7Q29udGVudFR5cGVbXX0gY29udGVudFR5cGVzXG4gKi9cbmNvbnN0IGZpbHRlckJ5UXVlcnkgPSBjdXJyeShmdW5jdGlvbihxdWVyeSwgY29udGVudFR5cGVzKSB7XG4gIGlmIChxdWVyeSA9PSAnJykge1xuICAgIHJldHVybiBjb250ZW50VHlwZXM7XG4gIH1cblxuICAvLyBBcHBlbmQgYSBzZWFyY2ggc2NvcmUgdG8gZWFjaCBjb250ZW50IHR5cGVcbiAgcmV0dXJuIGNvbnRlbnRUeXBlcy5tYXAoY29udGVudFR5cGUgPT5cbiAgICAoe1xuICAgICAgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgc2NvcmU6IGdldFNlYXJjaFNjb3JlKHF1ZXJ5LCBjb250ZW50VHlwZSlcbiAgICB9KSlcbiAgICAuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc2NvcmUgPiAwKVxuICAgIC5zb3J0KHNvcnRTZWFyY2hSZXN1bHRzKSAvLyBTb3J0IGJ5IGluc3RhbGxlZCwgcmVsZXZhbmNlIGFuZCBwb3B1bGFyaXR5XG4gICAgLm1hcChyZXN1bHQgPT4gcmVzdWx0LmNvbnRlbnRUeXBlKTsgLy8gVW53cmFwIHJlc3VsdCBvYmplY3Q7XG59KTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgQXJyYXkuc29ydCgpXG4gKiBDb21wYXJlcyB0d28gY29udGVudCB0eXBlcyBvbiBkaWZmZXJlbnQgY3JpdGVyaWFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBGaXJzdCBjb250ZW50IHR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFNlY29uZCBjb250ZW50IHR5cGVcbiAqIEByZXR1cm4ge2ludH1cbiAqL1xuY29uc3Qgc29ydFNlYXJjaFJlc3VsdHMgPSAoYSxiKSA9PiB7XG4gIGlmICghYS5jb250ZW50VHlwZS5pbnN0YWxsZWQgJiYgYi5jb250ZW50VHlwZS5pbnN0YWxsZWQpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmIChhLmNvbnRlbnRUeXBlLmluc3RhbGxlZCAmJiAhYi5jb250ZW50VHlwZS5pbnN0YWxsZWQpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBlbHNlIGlmIChiLnNjb3JlICE9PSBhLnNjb3JlKSB7XG4gICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlO1xuICB9XG5cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGIuY29udGVudFR5cGUucG9wdWxhcml0eSAtIGEuY29udGVudFR5cGUucG9wdWxhcml0eTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHdlaWdodGluZyBmb3IgZGlmZmVyZW50IHNlYXJjaCB0ZXJtcyBiYXNlZFxuICogb24gZXhpc3RlbmNlIG9mIHN1YnN0cmluZ3NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRlbnRUeXBlXG4gKiBAcmV0dXJuIHtpbnR9XG4gKi9cbiBjb25zdCBnZXRTZWFyY2hTY29yZSA9IGZ1bmN0aW9uKHF1ZXJ5LCBjb250ZW50VHlwZSkge1xuICAgbGV0IHF1ZXJpZXMgPSBxdWVyeS5zcGxpdCgnICcpLmZpbHRlcihxdWVyeSA9PiBxdWVyeSAhPT0gJycpO1xuICAgbGV0IHF1ZXJ5U2NvcmVzID0gcXVlcmllcy5tYXAocXVlcnkgPT4gZ2V0U2NvcmVGb3JFYWNoUXVlcnkocXVlcnksIGNvbnRlbnRUeXBlKSk7XG4gICBpZiAocXVlcnlTY29yZXMuaW5kZXhPZigwKSA+IC0xKSB7XG4gICAgIHJldHVybiAwO1xuICAgfVxuICAgcmV0dXJuIHF1ZXJ5U2NvcmVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuIH07XG5cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByZWxldmFuY2Ugc2NvcmUgZm9yIGEgc2luZ2xlIHN0cmluZ1xuICpcbiAqIEBwYXJhbSAge3R5cGV9IHF1ZXJ5ICAgICAgIGRlc2NyaXB0aW9uXG4gKiBAcGFyYW0gIHt0eXBlfSBjb250ZW50VHlwZSBkZXNjcmlwdGlvblxuICogQHJldHVybiB7dHlwZX0gICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAqL1xuY29uc3QgZ2V0U2NvcmVGb3JFYWNoUXVlcnkgPSBmdW5jdGlvbiAocXVlcnksIGNvbnRlbnRUeXBlKSB7XG4gICBxdWVyeSA9IHF1ZXJ5LnRyaW0oKTtcbiAgIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLnRpdGxlKSkge1xuICAgICByZXR1cm4gMTAwO1xuICAgfVxuICAgZWxzZSBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5zdW1tYXJ5KSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuZGVzY3JpcHRpb24pKSB7XG4gICAgIHJldHVybiA1O1xuICAgfVxuICAgZWxzZSBpZiAoYXJyYXlIYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmtleXdvcmRzKSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2Uge1xuICAgICByZXR1cm4gMDtcbiAgIH1cbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbmVlZGxlIGlzIGZvdW5kIGluIHRoZSBoYXlzdGFjay5cbiAqIE5vdCBjYXNlIHNlbnNpdGl2ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuZWVkbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXlzdGFja1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaGFzU3ViU3RyaW5nID0gZnVuY3Rpb24obmVlZGxlLCBoYXlzdGFjaykge1xuICBpZiAoaGF5c3RhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBoYXlzdGFjay50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlLnRvTG93ZXJDYXNlKCkpICE9PSAtMTtcbn07XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uLCBjaGVja3MgaWYgYXJyYXkgaGFzIGNvbnRhaW5zIGEgc3Vic3RyaW5nXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBzdWJTdHJpbmdcbiAqIEBwYXJhbSAge0FycmF5fSBhcnJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGFycmF5SGFzU3ViU3RyaW5nID0gZnVuY3Rpb24oc3ViU3RyaW5nLCBhcnIpIHtcbiAgaWYgKGFyciA9PT0gdW5kZWZpbmVkIHx8IHN1YlN0cmluZyA9PT0gJycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYXJyLnNvbWUoc3RyaW5nID0+IGhhc1N1YlN0cmluZyhzdWJTdHJpbmcsIHN0cmluZykpO1xufTtcblxuY29uc3QgQWRkTnVtYmVyPWZ1bmN0aW9uKGEsYilcbntcbiAgcmV0dXJuIGErYjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwiaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4uL2h1Yi1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqXG4gKiBAZmlyZXMgSHViI3VwbG9hZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRTZWN0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBuZXcgSHViU2VydmljZXMoe1xuICAgICAgYXBpUm9vdFVybDogc3RhdGUuYXBpUm9vdFVybFxuICAgIH0pO1xuXG4gICAgLy8gSW5wdXQgZWxlbWVudCBmb3IgdGhlIEg1UCBmaWxlXG4gICAgY29uc3QgaDVwVXBsb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBoNXBVcGxvYWQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2ZpbGUnKTtcblxuICAgIC8vIFNlbmRzIHRoZSBINVAgZmlsZSB0byB0aGUgcGx1Z2luXG4gICAgY29uc3QgdXNlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdXNlQnV0dG9uLnRleHRDb250ZW50ID0gJ1VzZSc7XG4gICAgdXNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAvLyBBZGQgdGhlIEg1UCBmaWxlIHRvIGEgZm9ybSwgcmVhZHkgZm9yIHRyYW5zcG9ydGF0aW9uXG4gICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBkYXRhLmFwcGVuZCgnaDVwJywgaDVwVXBsb2FkLmZpbGVzWzBdKTtcblxuICAgICAgLy8gVXBsb2FkIGNvbnRlbnQgdG8gdGhlIHBsdWdpblxuICAgICAgdGhpcy5zZXJ2aWNlcy51cGxvYWRDb250ZW50KGRhdGEpXG4gICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgIC8vIEZpcmUgdGhlIHJlY2VpdmVkIGRhdGEgdG8gYW55IGxpc3RlbmVyc1xuICAgICAgICAgIHNlbGYuZmlyZSgndXBsb2FkJywganNvbik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaDVwVXBsb2FkKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHVzZUJ1dHRvbik7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCByZW1vdmVBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSwgY2xhc3NMaXN0Q29udGFpbnMsIHF1ZXJ5U2VsZWN0b3IsIG5vZGVMaXN0VG9BcnJheSB9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICovXG5jb25zdCBBVFRSSUJVVEVfU0laRSA9ICdkYXRhLXNpemUnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgZGlzYWJsZSA9IHNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBlbmFibGUgPSByZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBlbmFibGVkXG4gKi9cbmNvbnN0IHRvZ2dsZUVuYWJsZWQgPSAoZWxlbWVudCwgZW5hYmxlZCkgPT4gKGVuYWJsZWQgPyBlbmFibGUgOiBkaXNhYmxlKShlbGVtZW50KTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGhpZGRlblxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gY3VycnkoKGhpZGRlbiwgZWxlbWVudCkgPT4gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGhpZGRlbi50b1N0cmluZygpLCBlbGVtZW50KSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBpc0Rpc2FibGVkID0gaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgdmlld1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICovXG5jb25zdCB1cGRhdGVWaWV3ID0gKGVsZW1lbnQsIHN0YXRlKSA9PiB7XG4gIGNvbnN0IHByZXZCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2aW91cycpO1xuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICBjb25zdCBsaXN0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICBjb25zdCB0b3RhbENvdW50ID0gbGlzdC5jaGlsZEVsZW1lbnRDb3VudDtcblxuICAvLyB1cGRhdGUgbGlzdCBzaXplc1xuICBsaXN0LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gc3RhdGUuZGlzcGxheUNvdW50ICogdG90YWxDb3VudH0lYDtcbiAgbGlzdC5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7c3RhdGUucG9zaXRpb24gKiAoMTAwIC8gc3RhdGUuZGlzcGxheUNvdW50KX0lYDtcblxuICAvLyB1cGRhdGUgaW1hZ2Ugc2l6ZXNcbiAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXG4gICAgLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnN0eWxlLndpZHRoID0gYCR7MTAwIC8gdG90YWxDb3VudH0lYCk7XG5cbiAgLy8gdG9nZ2xlIGJ1dHRvbiB2aXNpYmlsaXR5XG4gIFtwcmV2QnV0dG9uLCBuZXh0QnV0dG9uXVxuICAgIC5mb3JFYWNoKHRvZ2dsZVZpc2liaWxpdHkoc3RhdGUuZGlzcGxheUNvdW50ID49IHRvdGFsQ291bnQpKTtcblxuICAvLyB0b2dnbGUgYnV0dG9uIGVuYWJsZSwgZGlzYWJsZWRcbiAgdG9nZ2xlRW5hYmxlZChuZXh0QnV0dG9uLCBzdGF0ZS5wb3NpdGlvbiA+IChzdGF0ZS5kaXNwbGF5Q291bnQgLSB0b3RhbENvdW50KSk7XG4gIHRvZ2dsZUVuYWJsZWQocHJldkJ1dHRvbiwgc3RhdGUucG9zaXRpb24gPCAwKTtcbn07XG5cbi8qKlxuICogSGFuZGxlcyBidXR0b24gY2xpY2tlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SW1hZ2VTY3JvbGxlclN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYnV0dG9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB1cGRhdGVTdGF0ZVxuICogQHBhcmFtIHtFdmVudH1cbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBvbk5hdmlnYXRpb25CdXR0b25DbGljayA9IGN1cnJ5KChlbGVtZW50LCBzdGF0ZSwgYnV0dG9uLCB1cGRhdGVTdGF0ZSwgZXZlbnQpID0+IHtcbiAgaWYoIWlzRGlzYWJsZWQoYnV0dG9uKSl7XG4gICAgdXBkYXRlU3RhdGUoc3RhdGUpO1xuICAgIHVwZGF0ZVZpZXcoZWxlbWVudCwgc3RhdGUpO1xuICB9XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBpbWFnZVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGltYWdlXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaW5pdEltYWdlID0gY3VycnkoKGVsZW1lbnQsIGltYWdlKSA9PiB7XG4gIGxldCB0YXJnZXRJZCA9IGltYWdlLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICBsZXQgdGFyZ2V0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0YXJnZXRJZH1gKTtcblxuICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJykpO1xuICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJykpXG59KTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3Igd2hlbiB0aGUgZG9tIGlzIHVwZGF0ZWRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0ltYWdlU2Nyb2xsZXJTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7TXV0YXRpb25SZWNvcmR9IHJlY29yZFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGhhbmRsZURvbVVwZGF0ZSA9IGN1cnJ5KChlbGVtZW50LCBzdGF0ZSwgcmVjb3JkKSA9PiB7XG4gIC8vIG9uIGFkZCBpbWFnZSBydW4gaW5pdGlhbGl6YXRpb25cbiAgaWYocmVjb3JkLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG4gICAgbm9kZUxpc3RUb0FycmF5KHJlY29yZC5hZGRlZE5vZGVzKVxuICAgICAgLmZpbHRlcihjbGFzc0xpc3RDb250YWlucygnc2xpZGUnKSlcbiAgICAgIC5tYXAocXVlcnlTZWxlY3RvcignaW1nJykpXG4gICAgICAuZm9yRWFjaChpbml0SW1hZ2UoZWxlbWVudCkpO1xuICB9XG5cbiAgLy8gdXBkYXRlIHRoZSB2aWV3XG4gIHVwZGF0ZVZpZXcoZWxlbWVudCwgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgIGRpc3BsYXlDb3VudDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUklCVVRFX1NJWkUpIHx8IDUsXG4gICAgcG9zaXRpb246IDBcbiAgfSkpO1xufSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgLy8gZ2V0IGJ1dHRvbiBodG1sIGVsZW1lbnRzXG4gIGNvbnN0IG5leHRCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0Jyk7XG4gIGNvbnN0IHByZXZCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2aW91cycpO1xuXG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7b2JqZWN0fSBJbWFnZVNjcm9sbGVyU3RhdGVcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGRpc3BsYXlDb3VudFxuICAgKiBAcHJvcGVydHkge251bWJlcn0gcG9zaXRpb25cbiAgICovXG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIGRpc3BsYXlDb3VudDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUklCVVRFX1NJWkUpIHx8IDUsXG4gICAgcG9zaXRpb246IDBcbiAgfTtcblxuICAvLyBpbml0aWFsaXplIGJ1dHRvbnNcbiAgbmV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrKGVsZW1lbnQsIHN0YXRlLCBuZXh0QnV0dG9uLCBzdGF0ZSA9PiBzdGF0ZS5wb3NpdGlvbi0tKSk7XG4gIHByZXZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk5hdmlnYXRpb25CdXR0b25DbGljayhlbGVtZW50LCBzdGF0ZSwgcHJldkJ1dHRvbiwgc3RhdGUgPT4gc3RhdGUucG9zaXRpb24rKykpO1xuXG4gIC8vIGluaXRpYWxpemUgaW1hZ2VzXG4gIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2FyaWEtY29udHJvbHNdJykuZm9yRWFjaChpbml0SW1hZ2UoZWxlbWVudCkpO1xuXG4gIC8vIGxpc3RlbiBmb3IgdXBkYXRlcyB0byBkYXRhLXNpemVcbiAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZm9yRWFjaChoYW5kbGVEb21VcGRhdGUoZWxlbWVudCwgc3RhdGUpKSk7XG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCB7XG4gICAgc3VidHJlZTogdHJ1ZSxcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtBVFRSSUJVVEVfU0laRV1cbiAgfSk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBwb3NpdGlvblxuICB1cGRhdGVWaWV3KGVsZW1lbnQsIHN0YXRlKTtcblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2ltYWdlLXNjcm9sbGVyLmpzIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGUsIHRvZ2dsZUF0dHJpYnV0ZSwgaGlkZSwgc2hvdywgdG9nZ2xlVmlzaWJpbGl0eX0gZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuaW1wb3J0IHtjdXJyeSwgZm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5pbXBvcnQgeyBpbml0Q29sbGFwc2libGUgfSBmcm9tICcuLi91dGlscy9hcmlhJztcblxuLyoqXG4gKiBVbnNlbGVjdHMgYWxsIGVsZW1lbnRzIGluIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudFtdfSBlbGVtZW50c1xuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKSk7XG5cbi8qKlxuICogU2V0cyB0aGUgYXJpYS1leHBhbmRlZCBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudCB0byBmYWxzZVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuY29uc3QgdW5FeHBhbmQgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICAvLyBlbGVtZW50c1xuICBjb25zdCBtZW51SXRlbXMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwibWVudWl0ZW1cIl0nKTtcbiAgY29uc3QgdG9nZ2xlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtY29udHJvbHNdW2FyaWEtZXhwYW5kZWRdJyk7XG5cbiAgLy8gbW92ZSBzZWxlY3RcbiAgbWVudUl0ZW1zLmZvckVhY2gobWVudUl0ZW0gPT4ge1xuICAgIG1lbnVJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgdW5TZWxlY3RBbGwobWVudUl0ZW1zKTtcbiAgICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgdW5FeHBhbmQodG9nZ2xlcik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGluaXQgY29sbGFwc2UgYW5kIG9wZW5cbiAgaW5pdENvbGxhcHNpYmxlKGVsZW1lbnQpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9tZW51LmpzIiwiaW1wb3J0IHtzZXRBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Zm9yRWFjaH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25hbCc7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBoaWRlQWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICovXG5jb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgdW5TZWxlY3RBbGwgPSBmb3JFYWNoKHNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpKTtcblxuLyoqXG4gKiBJbml0aWF0ZXMgYSB0YWIgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICBjb25zdCB0YWJzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYlwiXScpO1xuICBjb25zdCB0YWJQYW5lbHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPVwidGFicGFuZWxcIl0nKTtcblxuICB0YWJzLmZvckVhY2godGFiID0+IHtcbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgdW5TZWxlY3RBbGwodGFicyk7XG4gICAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcblxuICAgICAgaGlkZUFsbCh0YWJQYW5lbHMpO1xuXG4gICAgICBsZXQgdGFiUGFuZWxJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICAgIHNob3coZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0YWJQYW5lbElkfWApKTtcbiAgICB9KTtcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwicmVxdWlyZSgnLi4vLi4vc3JjL3N0eWxlcy9tYWluLnNjc3MnKTtcblxuLy8gTG9hZCBsaWJyYXJ5XG5INVAgPSBINVAgfHwge307XG5INVAuSHViQ2xpZW50ID0gcmVxdWlyZSgnLi4vc2NyaXB0cy9odWInKS5kZWZhdWx0O1xuSDVQLkh1YkNsaWVudC5yZW5kZXJFcnJvck1lc3NhZ2UgPSByZXF1aXJlKCcuLi9zY3JpcHRzL3V0aWxzL2Vycm9ycycpLmRlZmF1bHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50cmllcy9kaXN0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==