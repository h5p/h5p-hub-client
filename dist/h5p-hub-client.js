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
     * @param {String} [eventName] the name of the event when propogated
     */
    propagate: function propagate(types, eventful, newType) {
      var self = this;
      types.forEach(function (type) {
        return eventful.on(type, function (event) {
          return self.fire(newType || type, event);
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

__webpack_require__(36);

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
    this.setup();
  }

  /**
   * Fetch the content type metadata
   */


  _createClass(HubServices, [{
    key: 'setup',
    value: function setup() {
      this.cachedContentTypes = fetch(this.apiRootUrl + 'content-type-cache', {
        method: 'GET',
        credentials: 'include'
      }).then(function (result) {
        return result.json();
      }).then(this.isValid).then(function (json) {
        return json.libraries;
      });
    }

    /**
     *
     * @param  {ContentType[]|ErrorMessage} response
     * @return {Promise<ContentType[]|ErrorMessage>}
     */

  }, {
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
      return this.cachedContentTypes;
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
      return this.cachedContentTypes.then(function (contentTypes) {
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

    // for testing with error
    /*installContentType(id) {
      return fetch(`${this.apiRootUrl}library-install`, {
        method: 'GET',
        credentials: 'include'
      })
        .then(result => result.json())
        .then(result => {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              return resolve(result);
            }, 1000);
          });
        });
    }*/

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
    var self = this;

    // services
    this.services = new _hubServices2.default({
      apiRootUrl: state.apiRootUrl
    });

    // controllers
    this.contentTypeSection = new _contentTypeSection2.default(state, this.services);
    this.uploadSection = new _uploadSection2.default(state, this.services);

    // views
    this.view = new _hubView2.default(state);

    // propagate controller events
    this.propagate(['select'], this.contentTypeSection);
    this.propagate(['upload'], this.uploadSection);

    // handle events
    this.on('select', this.setPanelTitle, this);
    this.on('select', this.view.closePanel, this.view);
    this.view.on('tab-change', this.view.setSectionType, this.view);
    this.view.on('panel-change', this.view.togglePanelOpen.bind(this.view), this.view);
    this.contentTypeSection.on('reload', function () {
      self.services.setup();
      self.contentTypeSection.initContentTypeList();
    });

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
 * Toggles the visibility if an element
 *
 * @param {HTMLElement} element
 * @param {boolean} visible
 */
var toggleVisibility = function toggleVisibility(element, visible) {
  return (visible ? _elements.show : _elements.hide)(element);
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

var hideAll = (0, _functional.forEach)(_elements.hide);

/**
 * @class
 * @mixes Eventful
 */

var ContentTypeDetailView = function () {
  function ContentTypeDetailView(state) {
    var _this = this;

    _classCallCheck(this, ContentTypeDetailView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // create view
    this.rootElement = this.createView();

    // grab references
    this.buttonBar = this.rootElement.querySelector('.button-bar');
    this.useButton = this.buttonBar.querySelector('.button-use');
    this.installButton = this.buttonBar.querySelector('.button-install');
    this.buttons = this.buttonBar.querySelectorAll('.button');

    this.image = this.rootElement.querySelector('.content-type-image');
    this.title = this.rootElement.querySelector('.text-details .title');
    this.owner = this.rootElement.querySelector('.owner');
    this.description = this.rootElement.querySelector('.text-details .small');
    this.demoButton = this.rootElement.querySelector('.demo-button');
    this.carousel = this.rootElement.querySelector('.carousel');
    this.carouselList = this.carousel.querySelector('ul');
    this.licencePanel = this.rootElement.querySelector('.licence-panel');
    this.installMessage = this.rootElement.querySelector('.install-message');

    // hide message on close button click
    var installMessageClose = this.installMessage.querySelector('.message-close');
    installMessageClose.addEventListener('click', function () {
      return (0, _elements.hide)(_this.installMessage);
    });

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
      element.innerHTML = "\n      <div class=\"back-button icon-arrow-thick\"></div>\n      <div class=\"container\">\n        <div class=\"image-wrapper\"><img class=\"img-responsive content-type-image\" src=\"" + _contentTypePlaceholder2.default + "\"></div>\n        <div class=\"text-details\">\n          <h2 class=\"title\"></h2>\n          <div class=\"owner\"></div>\n          <p class=\"small\"></p>\n          <a class=\"button demo-button\" target=\"_blank\" aria-hidden=\"false\" href=\"#\">Content Demo</a>\n        </div>\n      </div>\n      <div class=\"carousel\" role=\"region\" data-size=\"5\">\n        <span class=\"carousel-button previous\" aria-hidden=\"true\" disabled><span class=\"icon-arrow-thick\"></span></span>\n        <span class=\"carousel-button next\" aria-hidden=\"true\" disabled><span class=\"icon-arrow-thick\"></span></span>\n        <nav class=\"scroller\">\n          <ul></ul>\n        </nav>\n      </div>\n      <hr />\n      <div class=\"install-message message dismissible simple info\" aria-hidden=\"true\">\n        <div class=\"message-close icon-close\"></div>\n        <h3></h3>\n      </div>\n      <div class=\"button-bar\">\n        <span class=\"button button-primary button-use\" aria-hidden=\"false\" data-id=\"\">Use</span>\n        <span class=\"button button-inverse-primary button-install\" aria-hidden=\"true\" data-id=\"\"><span class=\"icon-arrow-thick\"></span>Install</span>\n        <span class=\"button button-inverse-primary button-installing\" aria-hidden=\"true\"><span class=\"icon-loading-search icon-spin\"></span>Installing</span>\n      </div>\n      <div class=\"panel-group\">\n        <div class=\"panel licence-panel\" aria-hidden=\"true\">\n          <div class=\"panel-header\" aria-expanded=\"false\" aria-controls=\"licence-panel\"><span class=\"icon-accordion-arrow\"></span> The Licence Info</div>\n          <div class=\"panel-body\" id=\"licence-panel\" aria-hidden=\"true\">\n            <div class=\"panel-body-inner\"></div>\n          </div>\n        </div>\n      </div>";

      return element;
    }

    /**
     * Sets a message on install
     *
     * @param {boolean} success
     * @param {string} message
     */

  }, {
    key: "setInstallMessage",
    value: function setInstallMessage(_ref) {
      var _ref$success = _ref.success,
          success = _ref$success === undefined ? true : _ref$success,
          message = _ref.message;

      this.installMessage.querySelector('h3').innerText = message;
      this.installMessage.className = "install-message dismissible message simple " + (success ? 'info' : 'error');
      (0, _elements.show)(this.installMessage);
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
     * Resets the detail view
     */

  }, {
    key: "reset",
    value: function reset() {
      (0, _elements.hide)(this.installMessage);
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
      var _this2 = this;

      if (text.length > MAX_TEXT_SIZE_DESCRIPTION) {
        this.description.innerHTML = this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text) + "<span class=\"read-more link\">Read more</span>";
        this.description.querySelector('.read-more, .read-less').addEventListener('click', function () {
          return _this2.toggleDescriptionExpanded(text);
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
      var _this3 = this;

      // flip boolean
      this.descriptionExpanded = !this.descriptionExpanded;

      if (this.descriptionExpanded) {
        this.description.innerHTML = text + "<span class=\"read-less link\">Read less</span>";
      } else {
        this.description.innerHTML = this.ellipsis(MAX_TEXT_SIZE_DESCRIPTION, text) + "<span class=\"read-more link\">Read more</span>";
      }

      this.description.querySelector('.read-more, .read-less').addEventListener('click', function () {
        return _this3.toggleDescriptionExpanded(text);
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
        (0, _elements.show)(this.licencePanel);
      } else {
        (0, _elements.hide)(this.licencePanel);
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
      this.showButtonBySelector(installed ? '.button-use' : '.button-install');
    }

    /**
     * Hides all buttons and shows the button on the selector again
     *
     * @param {string}selector
     */

  }, {
    key: "showButtonBySelector",
    value: function showButtonBySelector(selector) {
      var button = this.buttonBar.querySelector(selector);

      if (button) {
        hideAll(this.buttons);
        (0, _elements.show)(button);
      }
    }

    /**
     * Hides the root element
     */

  }, {
    key: "hide",
    value: function hide() {
      (0, _elements.hide)(this.rootElement);
    }

    /**
     * Shows the root element
     */

  }, {
    key: "show",
    value: function show() {
      (0, _elements.show)(this.rootElement);
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

var _eventful = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @mixes Eventful
 */
var ContentTypeDetail = function () {
  function ContentTypeDetail(state, services) {
    _classCallCheck(this, ContentTypeDetail);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // services
    this.services = services;

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
    key: 'hide',
    value: function hide() {
      this.view.hide();
    }

    /**
     * Shows the detail view
     */

  }, {
    key: 'show',
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
    key: 'loadById',
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
    key: 'install',
    value: function install(_ref) {
      var _this = this;

      var id = _ref.id;

      // set spinner
      this.view.showButtonBySelector('.button-installing');

      return this.services.contentType(id).then(function (contentType) {
        return _this.services.installContentType(contentType.machineName);
      }).then(function (contentType) {
        _this.view.setIsInstalled(true);
        _this.view.showButtonBySelector('.button-get');
        _this.view.setInstallMessage({
          message: contentType.title + ' successfully installed!'
        });
      }).catch(function (error) {
        _this.view.showButtonBySelector('.button-install');

        // print error message
        var errorMessage = error.errorCode ? error : {
          success: false,
          errorCode: 'RESPONSE_FAILED',
          message: id + ' could not be installed! Contact your administrator.'
        };
        _this.view.setInstallMessage(errorMessage);

        // log whole error message to console
        console.error('Installation error', error);
      });
    }

    /**
     * Updates the view with the content type data
     *
     * @param {ContentType} contentType
     */

  }, {
    key: 'update',
    value: function update(contentType) {
      this.view.reset();
      this.view.setId(contentType.machineName);
      this.view.setTitle(contentType.title);
      this.view.setDescription(contentType.description);
      this.view.setImage(contentType.icon);
      this.view.setExample(contentType.example);
      this.view.setOwner(contentType.owner);
      this.view.setIsInstalled(contentType.installed);
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
    key: 'getElement',
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
      var installButtonConfig = { text: 'Get', cls: 'button-inverse-primary button-install', icon: 'icon-arrow-thick' };
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

var _messageView = __webpack_require__(35);

var _messageView2 = _interopRequireDefault(_messageView);

var _elements = __webpack_require__(2);

var _functional = __webpack_require__(1);

var _events = __webpack_require__(5);

var _menu = __webpack_require__(21);

var _menu2 = _interopRequireDefault(_menu);

var _eventful = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @param {HTMLElement[]} elements
 * @function
 */
var unselectAll = (0, _functional.forEach)((0, _elements.removeAttribute)('aria-selected'));

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
    this.displaySelected = this.rootElement.querySelector('.navbar-toggler-selected');
    var inputButton = this.rootElement.querySelector('[role="search"] .input-group-addon');

    // input field
    this.inputField.addEventListener('keyup', function (event) {
      _this.fire('search', {
        element: event.target,
        query: event.target.value,
        keyCode: event.which || event.keyCode
      });
    });

    // input button
    inputButton.addEventListener('click', function (event) {
      var searchbar = event.target.parentElement.querySelector('#hub-search-bar');

      _this.fire('search', {
        element: searchbar,
        query: searchbar.value,
        keyCode: 13 // Act like an 'enter' key press
      });

      searchbar.focus();
    });
  }

  /**
   * Creates the menu group element
   *
   * @param {object} state
   *
   * @return {HTMLElement}
   */


  _createClass(ContentBrowserView, [{
    key: "createElement",
    value: function createElement(state) {
      var menutitle = 'Browse content types';
      var menuId = 'content-type-filter';
      var searchText = 'Search for Content Types';

      // create element
      var element = document.createElement('div');
      element.className = 'content-type-section-view';
      element.innerHTML = "\n      <div class=\"menu-group\">\n        <nav  role=\"menubar\" class=\"navbar\">\n          <div class=\"navbar-header\">\n             <span class=\"navbar-toggler navbar-toggler-right\" aria-controls=\"" + menuId + "\" aria-expanded=\"false\">\n               <span class=\"navbar-toggler-selected\"></span>\n               <span class=\"icon-accordion-arrow\"></span>\n             </span>\n            <span class=\"navbar-brand\">" + menutitle + "</span>\n          </div>\n\n          <ul id=\"" + menuId + "\" class=\"navbar-nav\" aria-hidden=\"true\"></ul>\n        </nav>\n\n        <div class=\"input-group\" role=\"search\">\n          <input id=\"hub-search-bar\" class=\"form-control form-control-rounded\" type=\"text\" placeholder=\"" + searchText + "\" />\n          <div class=\"input-group-addon icon-search\"></div>\n        </div>\n      </div>";

      return element;
    }
  }, {
    key: "displayMessage",
    value: function displayMessage(config) {
      var self = this;
      // Set the action
      // TODO - should be translatable
      config.action = "Reload";

      var messageView = new _messageView2.default(config);
      var element = messageView.getElement();

      messageView.on('action-clicked', function () {
        self.rootElement.classList.remove('error');
        element.parentNode.removeChild(element);
        self.fire('reload');
      });

      this.rootElement.classList.add('error');
      this.rootElement.appendChild(messageView.getElement());
    }

    /**
     * Adds a menu item
     *
     * @param {string} title
     * @param {string} id
     * @param {boolean} id
     *
     * @return {HTMLElement}
     */

  }, {
    key: "addMenuItem",
    value: function addMenuItem(_ref) {
      var title = _ref.title,
          id = _ref.id,
          selected = _ref.selected;

      var element = document.createElement('li');
      element.setAttribute('role', 'menuitem');
      element.setAttribute('data-id', id);
      element.innerText = title;

      // sets if this menuitem should be selected
      if (selected) {
        element.setAttribute('aria-selected', 'true');
        this.displaySelected.innerText = title;
      }

      (0, _events.relayClickEventAs)('menu-selected', this, element);

      // add to menu bar
      this.menubar.appendChild(element);
      return element;
    }

    /**
     * Clears the input field
     */

  }, {
    key: "clearInputField",
    value: function clearInputField() {
      this.inputField.value = '';
    }

    /**
     * Sets the name of the currently selected filter
     *
     * @param {string} selectedName
     */

  }, {
    key: "setDisplaySelected",
    value: function setDisplaySelected(selectedName) {
      this.displaySelected.innerText = selectedName;
    }

    /**
     * Selects a menu item by id
     *
     * @param {string} id
     */

  }, {
    key: "selectMenuItemById",
    value: function selectMenuItemById(id) {
      var menuItems = this.menubar.querySelectorAll('[role="menuitem"]');
      var selectedMenuItem = this.menubar.querySelector("[role=\"menuitem\"][data-id=\"" + id + "\"]");

      if (selectedMenuItem) {
        unselectAll(menuItems);
        selectedMenuItem.setAttribute('aria-selected', 'true');

        this.fire('menu-selected', {
          element: selectedMenuItem,
          id: selectedMenuItem.getAttribute('data-id')
        });
      }
    }
  }, {
    key: "initMenu",
    value: function initMenu() {
      // create the underline
      var underline = document.createElement('span');
      underline.className = 'menuitem-underline';
      this.menubar.appendChild(underline);

      // call init menu from sdk
      (0, _menu2.default)(this.rootElement);
    }

    /**
     * Returns the root element of the content browser
     *
     * @return {HTMLElement}
     */

  }, {
    key: "getElement",
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
 * @constant {string}
 */
var ID_FILTER_ALL = 'filter-all';

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
  function ContentTypeSection(state, services) {
    _classCallCheck(this, ContentTypeSection);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    this.typeAheadEnabled = true;

    // add view
    this.view = new _contentTypeSectionView2.default(state);

    // controller
    this.searchService = new _searchService2.default(services);
    this.contentTypeList = new _contentTypeList2.default();
    this.contentTypeDetail = new _contentTypeDetail2.default(services);

    // configuration for filters
    var filterConfigs = [{
      title: 'All',
      id: ID_FILTER_ALL
    }, {
      title: 'My Content Types',
      id: 'filter-my-content-types',
      selected: true
    }, {
      title: 'Most Popular',
      id: 'filter-most-popular'
    }];

    // add menu items
    filterConfigs.forEach(this.view.addMenuItem, this.view);
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
    this.propagate(['reload'], this.view);

    // register listeners
    this.view.on('search', this.search, this);
    this.view.on('search', this.view.selectMenuItemById.bind(this.view, ID_FILTER_ALL));
    this.view.on('search', this.resetMenuOnEnter, this);
    this.view.on('menu-selected', this.applySearchFilter, this);
    this.view.on('menu-selected', this.clearInputField, this);
    this.view.on('menu-selected', this.updateDisplaySelected, this);
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
      var _this = this;

      // initialize by search
      this.searchService.search("").then(function (contentTypes) {
        return _this.contentTypeList.update(contentTypes);
      }).catch(function (error) {
        return _this.handleError(error);
      });
    }

    /**
     * Handle errors communicating with HUB
     */

  }, {
    key: "handleError",
    value: function handleError(error) {
      // TODO - use translation system:
      this.view.displayMessage({
        type: 'error',
        title: 'Not able to communicate with hub.',
        content: 'Error occured. Please try again.'
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
      var _this2 = this;

      var query = _ref.query,
          keyCode = _ref.keyCode;

      if (this.typeAheadEnabled || keyCode === 13) {
        // Search automatically or on 'enter'
        this.searchService.search(query).then(function (contentTypes) {
          return _this2.contentTypeList.update(contentTypes);
        });
      }
    }

    /**
     * Updates the displayed name of the selected filter for mobile
     *
     * @param {SelectedElement} event
     */

  }, {
    key: "updateDisplaySelected",
    value: function updateDisplaySelected(event) {
      this.view.setDisplaySelected(event.element.innerText);
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
     * @param {SelectedElement} event
     */

  }, {
    key: "applySearchFilter",
    value: function applySearchFilter(event) {
      console.debug('ContentTypeSection: menu was clicked!', event);
    }

    /**
     * Clears the input field
     *
     * @param {string} id
     */

  }, {
    key: "clearInputField",
    value: function clearInputField(_ref3) {
      var id = _ref3.id;

      if (id !== ID_FILTER_ALL) {
        this.view.clearInputField();
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
      this.typeAheadEnabled = false;
    }

    /**
     * Close detail view
     */

  }, {
    key: "closeDetailView",
    value: function closeDetailView() {
      this.contentTypeDetail.hide();
      this.contentTypeList.show();
      this.typeAheadEnabled = true;
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
      this.rootElement.className += "h5p h5p-hub h5p-sdk";
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
  function SearchService(services) {
    _classCallCheck(this, SearchService);

    this.services = services;
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
      // Add content types to the search index
      return this.services.contentTypes().then(filterByQuery(query));
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

var _eventful = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 * @mixes Eventful
 *
 * @fires Hub#upload
 */
var UploadSection = function () {
  function UploadSection(state, services) {
    var _this = this;

    _classCallCheck(this, UploadSection);

    var self = this;
    _extends(this, (0, _eventful.Eventful)());

    // services
    this.services = services;

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

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventful = __webpack_require__(0);

var _events = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ContentBrowserView
 * @mixes Eventful
 */
var MessageView = function () {
  /**
   * @constructor
   * @param {Object} state
   * @param {string} state.type
   * @param {string} state.title
   * @param {string} state.content
   * @param {string} [state.action]
   * @param {string} [state.dismissable]
   */
  function MessageView(state) {
    _classCallCheck(this, MessageView);

    // add event system
    _extends(this, (0, _eventful.Eventful)());

    // create elements
    this.rootElement = this.createElement(state);
  }

  _createClass(MessageView, [{
    key: 'createElement',
    value: function createElement(message) {
      // Create wrapper:
      var messageWrapper = document.createElement('div');
      messageWrapper.className = 'message ' + message.type + (message.dismissible ? ' dismissible' : '');

      // Add close button if dismisable
      if (message.dismissible) {
        var closeButton = document.createElement('div');
        closeButton.className = 'close';
        //closeButton.innerHTML = '&#x2715';
        // TODO
        // - Add close label from translations
        // - Add visuals in CSS (font icon)
        messageWrapper.appendChild(closeButton);
        (0, _events.relayClickEventAs)('close', this, closeButton);
      }

      var messageContent = document.createElement('div');
      messageContent.className = 'message-content';
      messageContent.innerHTML = '<h1>' + message.title + '</h1>' + '<p>' + message.content + '</p>';
      messageWrapper.appendChild(messageContent);

      if (message.action !== undefined) {
        var messageButton = document.createElement('button');
        messageButton.className = 'button';
        messageButton.innerHTML = message.action;
        messageWrapper.appendChild(messageButton);

        (0, _events.relayClickEventAs)('action-clicked', this, messageButton);
      }

      return messageWrapper;
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

  return MessageView;
}();

exports.default = MessageView;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ',' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, { body: this._bodyInit });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWU0NzdkMWM3Mzc3ZGQ3Y2JiMjciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL3V0aWxzL2Z1bmN0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9hcmlhLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvY29udGVudC10eXBlLXBsYWNlaG9sZGVyLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9odWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLnNjc3M/NmE3OCIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLWxpc3QvY29udGVudC10eXBlLWxpc3Qtdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2h1Yi12aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3VwbG9hZC1zZWN0aW9uL3VwbG9hZC1zZWN0aW9uLmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9tZW51LmpzIiwid2VicGFjazovLy8uLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvdGFiLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2Rpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy91dGlscy9mZXRjaC5qcyJdLCJuYW1lcyI6WyJFdmVudGZ1bCIsImxpc3RlbmVycyIsIm9uIiwidHlwZSIsImxpc3RlbmVyIiwic2NvcGUiLCJ0cmlnZ2VyIiwicHVzaCIsImZpcmUiLCJldmVudCIsInRyaWdnZXJzIiwiZXZlcnkiLCJjYWxsIiwicHJvcGFnYXRlIiwidHlwZXMiLCJldmVudGZ1bCIsIm5ld1R5cGUiLCJzZWxmIiwiZm9yRWFjaCIsImN1cnJ5IiwiZm4iLCJhcml0eSIsImxlbmd0aCIsImYxIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJhcmd1bWVudHMiLCJhcHBseSIsImYyIiwiYXJnczIiLCJjb25jYXQiLCJjb21wb3NlIiwiZm5zIiwicmVkdWNlIiwiZiIsImciLCJhcnIiLCJtYXAiLCJmaWx0ZXIiLCJzb21lIiwiY29udGFpbnMiLCJ2YWx1ZSIsImluZGV4T2YiLCJ3aXRob3V0IiwidmFsdWVzIiwiaW52ZXJzZUJvb2xlYW5TdHJpbmciLCJib29sIiwidG9TdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJuYW1lIiwiZWwiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJhdHRyaWJ1dGVFcXVhbHMiLCJ0b2dnbGVBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInBhcmVudCIsImNoaWxkIiwicXVlcnlTZWxlY3RvciIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZUNoaWxkIiwib2xkQ2hpbGQiLCJjbGFzc0xpc3RDb250YWlucyIsImNscyIsImNsYXNzTGlzdCIsIm5vZGVMaXN0VG9BcnJheSIsIm5vZGVMaXN0IiwiaGlkZSIsInNob3ciLCJ0b2dnbGVWaXNpYmlsaXR5IiwidmlzaWJsZSIsImVsZW1lbnQiLCJIdWJTZXJ2aWNlcyIsImFwaVJvb3RVcmwiLCJzZXR1cCIsImNhY2hlZENvbnRlbnRUeXBlcyIsImZldGNoIiwibWV0aG9kIiwiY3JlZGVudGlhbHMiLCJ0aGVuIiwicmVzdWx0IiwianNvbiIsImlzVmFsaWQiLCJsaWJyYXJpZXMiLCJyZXNwb25zZSIsIm1lc3NhZ2VDb2RlIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJtYWNoaW5lTmFtZSIsImNvbnRlbnRUeXBlcyIsImNvbnRlbnRUeXBlIiwiaWQiLCJucyIsImdldEFqYXhVcmwiLCJib2R5IiwiZm9ybURhdGEiLCJyZW5kZXJFcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwiY2xvc2VCdXR0b24iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJtZXNzYWdlQ29udGVudCIsInRpdGxlIiwiY29udGVudCIsIm1lc3NhZ2VXcmFwcGVyIiwiZGlzbWlzc2libGUiLCJidXR0b24iLCJ1bmRlZmluZWQiLCJtZXNzYWdlQnV0dG9uIiwicmVsYXlDbGlja0V2ZW50QXMiLCJhZGRFdmVudExpc3RlbmVyIiwic3RvcFByb3BhZ2F0aW9uIiwiaW5pdCIsImlzRXhwYW5kZWQiLCJpbml0Q29sbGFwc2libGUiLCJ0b2dnbGVyIiwiY29sbGFwc2libGVJZCIsImNvbGxhcHNpYmxlIiwib2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVPbGRWYWx1ZSIsImF0dHJpYnV0ZUZpbHRlciIsIkh1YiIsInN0YXRlIiwic2VydmljZXMiLCJjb250ZW50VHlwZVNlY3Rpb24iLCJ1cGxvYWRTZWN0aW9uIiwidmlldyIsInNldFBhbmVsVGl0bGUiLCJjbG9zZVBhbmVsIiwic2V0U2VjdGlvblR5cGUiLCJ0b2dnbGVQYW5lbE9wZW4iLCJiaW5kIiwiaW5pdENvbnRlbnRUeXBlTGlzdCIsImluaXRUYWJQYW5lbCIsImdldENvbnRlbnRUeXBlIiwic2V0VGl0bGUiLCJzZWN0aW9uSWQiLCJ0YWJDb25maWdzIiwiZ2V0RWxlbWVudCIsImNvbmZpZyIsInNlbGVjdGVkIiwiYWRkVGFiIiwidGFiQ29uZmlnIiwiYWRkQm90dG9tQm9yZGVyIiwiQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCIsIk1BWF9URVhUX1NJWkVfREVTQ1JJUFRJT04iLCJpc0VtcHR5IiwidGV4dCIsImhpZGVBbGwiLCJDb250ZW50VHlwZURldGFpbFZpZXciLCJyb290RWxlbWVudCIsImNyZWF0ZVZpZXciLCJidXR0b25CYXIiLCJ1c2VCdXR0b24iLCJpbnN0YWxsQnV0dG9uIiwiYnV0dG9ucyIsImltYWdlIiwib3duZXIiLCJkZXNjcmlwdGlvbiIsImRlbW9CdXR0b24iLCJjYXJvdXNlbCIsImNhcm91c2VsTGlzdCIsImxpY2VuY2VQYW5lbCIsImluc3RhbGxNZXNzYWdlIiwiaW5zdGFsbE1lc3NhZ2VDbG9zZSIsInN1Y2Nlc3MiLCJpbm5lclRleHQiLCJsaWdodGJveCIsImNoaWxkRWxlbWVudENvdW50IiwidXJsIiwiYWx0IiwidGh1bWJuYWlsIiwic3JjIiwiZWxsaXBzaXMiLCJ0b2dnbGVEZXNjcmlwdGlvbkV4cGFuZGVkIiwiZGVzY3JpcHRpb25FeHBhbmRlZCIsInNpemUiLCJzdWJzdHIiLCJpbnN0YWxsZWQiLCJzaG93QnV0dG9uQnlTZWxlY3RvciIsIkNvbnRlbnRUeXBlRGV0YWlsIiwiaW5zdGFsbCIsInVwZGF0ZSIsImluc3RhbGxDb250ZW50VHlwZSIsInNldElzSW5zdGFsbGVkIiwic2V0SW5zdGFsbE1lc3NhZ2UiLCJjYXRjaCIsImVycm9yTWVzc2FnZSIsImVycm9yIiwiZXJyb3JDb2RlIiwiY29uc29sZSIsInJlc2V0Iiwic2V0SWQiLCJzZXREZXNjcmlwdGlvbiIsInNldEltYWdlIiwiaWNvbiIsInNldEV4YW1wbGUiLCJleGFtcGxlIiwic2V0T3duZXIiLCJzZXRMaWNlbmNlIiwibGljZW5zZSIsInJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwiLCJzY3JlZW5zaG90cyIsImFkZEltYWdlVG9DYXJvdXNlbCIsIkNvbnRlbnRUeXBlTGlzdFZpZXciLCJoYXNDaGlsZE5vZGVzIiwibGFzdENoaWxkIiwicm93IiwiY3JlYXRlQ29udGVudFR5cGVSb3ciLCJ1c2VCdXR0b25Db25maWciLCJpbnN0YWxsQnV0dG9uQ29uZmlnIiwic3VtbWFyeSIsIkNvbnRlbnRUeXBlTGlzdCIsInJlbW92ZUFsbFJvd3MiLCJhZGRSb3ciLCJ1bnNlbGVjdEFsbCIsIkNvbnRlbnRCcm93c2VyVmlldyIsIm1lbnViYXIiLCJpbnB1dEZpZWxkIiwiZGlzcGxheVNlbGVjdGVkIiwiaW5wdXRCdXR0b24iLCJ0YXJnZXQiLCJxdWVyeSIsImtleUNvZGUiLCJ3aGljaCIsInNlYXJjaGJhciIsInBhcmVudEVsZW1lbnQiLCJmb2N1cyIsIm1lbnV0aXRsZSIsIm1lbnVJZCIsInNlYXJjaFRleHQiLCJhY3Rpb24iLCJtZXNzYWdlVmlldyIsInJlbW92ZSIsInBhcmVudE5vZGUiLCJhZGQiLCJzZWxlY3RlZE5hbWUiLCJtZW51SXRlbXMiLCJzZWxlY3RlZE1lbnVJdGVtIiwidW5kZXJsaW5lIiwiSURfRklMVEVSX0FMTCIsIkNvbnRlbnRUeXBlU2VjdGlvbiIsInR5cGVBaGVhZEVuYWJsZWQiLCJzZWFyY2hTZXJ2aWNlIiwiY29udGVudFR5cGVMaXN0IiwiY29udGVudFR5cGVEZXRhaWwiLCJmaWx0ZXJDb25maWdzIiwiYWRkTWVudUl0ZW0iLCJpbml0TWVudSIsInNlY3Rpb24iLCJzZWFyY2giLCJzZWxlY3RNZW51SXRlbUJ5SWQiLCJyZXNldE1lbnVPbkVudGVyIiwiYXBwbHlTZWFyY2hGaWx0ZXIiLCJjbGVhcklucHV0RmllbGQiLCJ1cGRhdGVEaXNwbGF5U2VsZWN0ZWQiLCJzaG93RGV0YWlsVmlldyIsImNsb3NlRGV0YWlsVmlldyIsImhhbmRsZUVycm9yIiwiZGlzcGxheU1lc3NhZ2UiLCJzZXREaXNwbGF5U2VsZWN0ZWQiLCJkZWJ1ZyIsImxvYWRCeUlkIiwiQVRUUklCVVRFX0RBVEFfSUQiLCJpc09wZW4iLCJIdWJWaWV3IiwicmVuZGVyVGFiUGFuZWwiLCJyZW5kZXJQYW5lbCIsImV4cGFuZGVkIiwidGFiQ29udGFpbmVyRWxlbWVudCIsInBhbmVsIiwic2V0VGltZW91dCIsInRhYmxpc3QiLCJ0YWJMaXN0V3JhcHBlciIsInRhYklkIiwidGFiUGFuZWxJZCIsInRhYiIsInRhYlBhbmVsIiwiU2VhcmNoU2VydmljZSIsImZpbHRlckJ5UXVlcnkiLCJzY29yZSIsImdldFNlYXJjaFNjb3JlIiwic29ydCIsInNvcnRTZWFyY2hSZXN1bHRzIiwiYSIsImIiLCJwb3B1bGFyaXR5IiwicXVlcmllcyIsInNwbGl0IiwicXVlcnlTY29yZXMiLCJnZXRTY29yZUZvckVhY2hRdWVyeSIsInRyaW0iLCJoYXNTdWJTdHJpbmciLCJhcnJheUhhc1N1YlN0cmluZyIsImtleXdvcmRzIiwibmVlZGxlIiwiaGF5c3RhY2siLCJ0b0xvd2VyQ2FzZSIsInN1YlN0cmluZyIsInN0cmluZyIsIkFkZE51bWJlciIsIlVwbG9hZFNlY3Rpb24iLCJoNXBVcGxvYWQiLCJ0ZXh0Q29udGVudCIsImRhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImZpbGVzIiwidXBsb2FkQ29udGVudCIsIkFUVFJJQlVURV9TSVpFIiwiZGlzYWJsZSIsImVuYWJsZSIsInRvZ2dsZUVuYWJsZWQiLCJlbmFibGVkIiwiaGlkZGVuIiwiaXNEaXNhYmxlZCIsInVwZGF0ZVZpZXciLCJwcmV2QnV0dG9uIiwibmV4dEJ1dHRvbiIsImxpc3QiLCJ0b3RhbENvdW50Iiwic3R5bGUiLCJ3aWR0aCIsImRpc3BsYXlDb3VudCIsIm1hcmdpbkxlZnQiLCJwb3NpdGlvbiIsIm9uTmF2aWdhdGlvbkJ1dHRvbkNsaWNrIiwidXBkYXRlU3RhdGUiLCJpbml0SW1hZ2UiLCJ0YXJnZXRJZCIsImhhbmRsZURvbVVwZGF0ZSIsInJlY29yZCIsImFkZGVkTm9kZXMiLCJzdWJ0cmVlIiwiY2hpbGRMaXN0IiwidW5TZWxlY3RBbGwiLCJ1bkV4cGFuZCIsIm1lbnVJdGVtIiwidGFicyIsInRhYlBhbmVscyIsInJlcXVpcmUiLCJINVAiLCJIdWJDbGllbnQiLCJkZWZhdWx0IiwiTWVzc2FnZVZpZXciLCJzdXBwb3J0Iiwic2VhcmNoUGFyYW1zIiwiaXRlcmFibGUiLCJTeW1ib2wiLCJibG9iIiwiQmxvYiIsImUiLCJhcnJheUJ1ZmZlciIsInZpZXdDbGFzc2VzIiwiaXNEYXRhVmlldyIsIm9iaiIsIkRhdGFWaWV3IiwiaXNQcm90b3R5cGVPZiIsImlzQXJyYXlCdWZmZXJWaWV3IiwiQXJyYXlCdWZmZXIiLCJpc1ZpZXciLCJPYmplY3QiLCJub3JtYWxpemVOYW1lIiwiU3RyaW5nIiwidGVzdCIsIlR5cGVFcnJvciIsIm5vcm1hbGl6ZVZhbHVlIiwiaXRlcmF0b3JGb3IiLCJpdGVtcyIsIml0ZXJhdG9yIiwibmV4dCIsInNoaWZ0IiwiZG9uZSIsIkhlYWRlcnMiLCJoZWFkZXJzIiwiaXNBcnJheSIsImhlYWRlciIsImdldE93blByb3BlcnR5TmFtZXMiLCJvbGRWYWx1ZSIsImdldCIsImhhcyIsImhhc093blByb3BlcnR5Iiwic2V0IiwiY2FsbGJhY2siLCJ0aGlzQXJnIiwia2V5cyIsImVudHJpZXMiLCJjb25zdW1lZCIsImJvZHlVc2VkIiwiZmlsZVJlYWRlclJlYWR5IiwicmVhZGVyIiwib25sb2FkIiwib25lcnJvciIsInJlYWRCbG9iQXNBcnJheUJ1ZmZlciIsIkZpbGVSZWFkZXIiLCJwcm9taXNlIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJyZWFkQmxvYkFzVGV4dCIsInJlYWRBc1RleHQiLCJyZWFkQXJyYXlCdWZmZXJBc1RleHQiLCJidWYiLCJVaW50OEFycmF5IiwiY2hhcnMiLCJpIiwiZnJvbUNoYXJDb2RlIiwiam9pbiIsImJ1ZmZlckNsb25lIiwiYnl0ZUxlbmd0aCIsImJ1ZmZlciIsIkJvZHkiLCJfaW5pdEJvZHkiLCJfYm9keUluaXQiLCJfYm9keVRleHQiLCJfYm9keUJsb2IiLCJfYm9keUZvcm1EYXRhIiwiVVJMU2VhcmNoUGFyYW1zIiwiX2JvZHlBcnJheUJ1ZmZlciIsIkVycm9yIiwicmVqZWN0ZWQiLCJkZWNvZGUiLCJKU09OIiwicGFyc2UiLCJtZXRob2RzIiwibm9ybWFsaXplTWV0aG9kIiwidXBjYXNlZCIsInRvVXBwZXJDYXNlIiwiUmVxdWVzdCIsImlucHV0Iiwib3B0aW9ucyIsIm1vZGUiLCJyZWZlcnJlciIsImNsb25lIiwiZm9ybSIsImJ5dGVzIiwicmVwbGFjZSIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhcnNlSGVhZGVycyIsInJhd0hlYWRlcnMiLCJwcmVQcm9jZXNzZWRIZWFkZXJzIiwibGluZSIsInBhcnRzIiwia2V5IiwiUmVzcG9uc2UiLCJib2R5SW5pdCIsInN0YXR1cyIsIm9rIiwic3RhdHVzVGV4dCIsInJlZGlyZWN0U3RhdHVzZXMiLCJyZWRpcmVjdCIsIlJhbmdlRXJyb3IiLCJsb2NhdGlvbiIsInJlcXVlc3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInJlc3BvbnNlVVJMIiwicmVzcG9uc2VUZXh0Iiwib250aW1lb3V0Iiwib3BlbiIsIndpdGhDcmVkZW50aWFscyIsInJlc3BvbnNlVHlwZSIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwicG9seWZpbGwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBOzs7QUFHTyxJQUFNQSw4QkFBVyxTQUFYQSxRQUFXO0FBQUEsU0FBTztBQUM3QkMsZUFBVyxFQURrQjs7QUFHN0I7Ozs7Ozs7Ozs7QUFVQUMsUUFBSSxZQUFTQyxJQUFULEVBQWVDLFFBQWYsRUFBeUJDLEtBQXpCLEVBQWdDO0FBQ2xDOzs7OztBQUtBLFVBQU1DLFVBQVU7QUFDZCxvQkFBWUYsUUFERTtBQUVkLGlCQUFTQztBQUZLLE9BQWhCOztBQUtBLFdBQUtKLFNBQUwsQ0FBZUUsSUFBZixJQUF1QixLQUFLRixTQUFMLENBQWVFLElBQWYsS0FBd0IsRUFBL0M7QUFDQSxXQUFLRixTQUFMLENBQWVFLElBQWYsRUFBcUJJLElBQXJCLENBQTBCRCxPQUExQjs7QUFFQSxhQUFPLElBQVA7QUFDRCxLQTVCNEI7O0FBOEI3Qjs7Ozs7Ozs7O0FBU0FFLFVBQU0sY0FBU0wsSUFBVCxFQUFlTSxLQUFmLEVBQXNCO0FBQzFCLFVBQU1DLFdBQVcsS0FB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UDtBQXVDRCxHQXhDRDtBQXlDQXBaLE9BQUsrRCxLQUFMLENBQVd5WSxRQUFYLEdBQXNCLElBQXRCO0FBQ0QsQ0EvY0QsRUErY0csT0FBT3hjLElBQVAsS0FBZ0IsV0FBaEIsR0FBOEJBLElBQTlCLFlBL2NILEUiLCJmaWxlIjoiaDVwLWh1Yi1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWU0NzdkMWM3Mzc3ZGQ3Y2JiMjciLCIvKipcbiAqIEBtaXhpblxuICovXG5leHBvcnQgY29uc3QgRXZlbnRmdWwgPSAoKSA9PiAoe1xuICBsaXN0ZW5lcnM6IHt9LFxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gZXZlbnRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IFtzY29wZV1cbiAgICpcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge0V2ZW50ZnVsfVxuICAgKi9cbiAgb246IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBzY29wZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmIHtvYmplY3R9IFRyaWdnZXJcbiAgICAgKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzY29wZVxuICAgICAqL1xuICAgIGNvbnN0IHRyaWdnZXIgPSB7XG4gICAgICAnbGlzdGVuZXInOiBsaXN0ZW5lcixcbiAgICAgICdzY29wZSc6IHNjb3BlXG4gICAgfTtcblxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaCh0cmlnZ2VyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGaXJlIGV2ZW50LiBJZiBhbnkgb2YgdGhlIGxpc3RlbmVycyByZXR1cm5zIGZhbHNlLCByZXR1cm4gZmFsc2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtvYmplY3R9IFtldmVudF1cbiAgICpcbiAgICogQGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBmaXJlOiBmdW5jdGlvbih0eXBlLCBldmVudCkge1xuICAgIGNvbnN0IHRyaWdnZXJzID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0gfHwgW107XG5cbiAgICByZXR1cm4gdHJpZ2dlcnMuZXZlcnkoZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgcmV0dXJuIHRyaWdnZXIubGlzdGVuZXIuY2FsbCh0cmlnZ2VyLnNjb3BlIHx8IHRoaXMsIGV2ZW50KSAhPT0gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIExpc3RlbnMgZm9yIGV2ZW50cyBvbiBhbm90aGVyIEV2ZW50ZnVsLCBhbmQgcHJvcGFnYXRlIGl0IHRyb3VnaCB0aGlzIEV2ZW50ZnVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IHR5cGVzXG4gICAqIEBwYXJhbSB7RXZlbnRmdWx9IGV2ZW50ZnVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbZXZlbnROYW1lXSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgd2hlbiBwcm9wb2dhdGVkXG4gICAqL1xuICBwcm9wYWdhdGU6IGZ1bmN0aW9uKHR5cGVzLCBldmVudGZ1bCwgbmV3VHlwZSkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICB0eXBlcy5mb3JFYWNoKHR5cGUgPT4gZXZlbnRmdWwub24odHlwZSwgZXZlbnQgPT4gc2VsZi5maXJlKG5ld1R5cGUgfHwgdHlwZSwgZXZlbnQpKSk7XG4gIH1cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWl4aW5zL2V2ZW50ZnVsLmpzIiwiLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICpcbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGN1cnJ5ID0gZnVuY3Rpb24oZm4pIHtcbiAgY29uc3QgYXJpdHkgPSBmbi5sZW5ndGg7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGYxKCkge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+PSBhcml0eSkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBmMigpIHtcbiAgICAgICAgY29uc3QgYXJnczIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICByZXR1cm4gZjEuYXBwbHkobnVsbCwgYXJncy5jb25jYXQoYXJnczIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG4vKipcbiAqIENvbXBvc2UgZnVuY3Rpb25zIHRvZ2V0aGVyLCBleGVjdXRpbmcgZnJvbSByaWdodCB0byBsZWZ0XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbi4uLn0gZm5zXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKC4uLmZucykgPT4gZm5zLnJlZHVjZSgoZiwgZykgPT4gKC4uLmFyZ3MpID0+IGYoZyguLi5hcmdzKSkpO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgaW4gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKlxuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JFYWNoID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgYXJyLmZvckVhY2goZm4pO1xufSk7XG5cbi8qKlxuICogTWFwcyBhIGZ1bmN0aW9uIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgbWFwID0gY3VycnkoZnVuY3Rpb24gKGZuLCBhcnIpIHtcbiAgcmV0dXJuIGFyci5tYXAoZm4pO1xufSk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZpbHRlciB0byBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwdWJsaWNcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZpbHRlciA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZuKTtcbn0pO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBzb21lIHRvIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgc29tZSA9IGN1cnJ5KGZ1bmN0aW9uIChmbiwgYXJyKSB7XG4gIHJldHVybiBhcnIuc29tZShmbik7XG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gYXJyYXkgY29udGFpbnMgYSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSBjdXJyeShmdW5jdGlvbiAodmFsdWUsIGFycikge1xuICByZXR1cm4gYXJyLmluZGV4T2YodmFsdWUpICE9IC0xO1xufSk7XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSBzdXBwbGllZCB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICpcbiAqIEBmdW5jdGlvblxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3Qgd2l0aG91dCA9IGN1cnJ5KGZ1bmN0aW9uICh2YWx1ZXMsIGFycikge1xuICByZXR1cm4gZmlsdGVyKHZhbHVlID0+ICFjb250YWlucyh2YWx1ZSwgdmFsdWVzKSwgYXJyKVxufSk7XG5cbi8qKlxuICogVGFrZXMgYSBzdHJpbmcgdGhhdCBpcyBlaXRoZXIgJ3RydWUnIG9yICdmYWxzZScgYW5kIHJldHVybnMgdGhlIG9wcG9zaXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJvb2xcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBpbnZlcnNlQm9vbGVhblN0cmluZyA9IGZ1bmN0aW9uIChib29sKSB7XG4gIHJldHVybiAoYm9vbCAhPT0gJ3RydWUnKS50b1N0cmluZygpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy91dGlscy9mdW5jdGlvbmFsLmpzIiwiaW1wb3J0IHtjdXJyeSwgaW52ZXJzZUJvb2xlYW5TdHJpbmd9IGZyb20gJy4vZnVuY3Rpb25hbCdcblxuLyoqXG4gKiBHZXQgYW4gYXR0cmlidXRlIHZhbHVlIGZyb20gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0QXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIFNldCBhbiBhdHRyaWJ1dGUgb24gYSBodG1sIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2V0QXR0cmlidXRlID0gY3VycnkoKG5hbWUsIHZhbHVlLCBlbCkgPT4gZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSk7XG5cbi8qKlxuICogUmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIGh0bWwgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkpO1xuXG4vKipcbiAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGFuIGF0dHJpYnV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0F0dHJpYnV0ZSA9IGN1cnJ5KChuYW1lLCBlbCkgPT4gZWwuaGFzQXR0cmlidXRlKG5hbWUpKTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyBhbiBhdHRyaWJ1dGUgdGhhdCBlcXVhbHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZUVxdWFscyA9IGN1cnJ5KChuYW1lLCB2YWx1ZSwgZWwpID0+IGVsLmdldEF0dHJpYnV0ZShuYW1lKSA9PT0gdmFsdWUpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYW4gYXR0cmlidXRlIGJldHdlZW4gJ3RydWUnIGFuZCAnZmFsc2UnO1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICpcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlQXR0cmlidXRlID0gY3VycnkoKG5hbWUsIGVsKSA9PiB7XG4gIGNvbnN0IHZhbHVlID0gZ2V0QXR0cmlidXRlKG5hbWUsIGVsKTtcbiAgc2V0QXR0cmlidXRlKG5hbWUsIGludmVyc2VCb29sZWFuU3RyaW5nKHZhbHVlKSwgZWwpO1xufSk7XG5cbi8qKlxuICogVGhlIGFwcGVuZENoaWxkKCkgbWV0aG9kIGFkZHMgYSBub2RlIHRvIHRoZSBlbmQgb2YgdGhlIGxpc3Qgb2YgY2hpbGRyZW4gb2YgYSBzcGVjaWZpZWQgcGFyZW50IG5vZGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjaGlsZFxuICpcbiAqIEBmdW5jdGlvblxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBhcHBlbmRDaGlsZCA9IGN1cnJ5KChwYXJlbnQsIGNoaWxkKSA9PiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgYSBkZXNjZW5kYW50IG9mIHRoZSBlbGVtZW50IG9uIHdoaWNoIGl0IGlzIGludm9rZWRcbiAqIHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGdyb3VwIG9mIHNlbGVjdG9ycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXJ5U2VsZWN0b3IgPSBjdXJyeSgoc2VsZWN0b3IsIGVsKSA9PiBlbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5vbi1saXZlIE5vZGVMaXN0IG9mIGFsbCBlbGVtZW50cyBkZXNjZW5kZWQgZnJvbSB0aGUgZWxlbWVudCBvbiB3aGljaCBpdFxuICogaXMgaW52b2tlZCB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBncm91cCBvZiBDU1Mgc2VsZWN0b3JzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge05vZGVMaXN0fVxuICovXG5leHBvcnQgY29uc3QgcXVlcnlTZWxlY3RvckFsbCA9IGN1cnJ5KChzZWxlY3RvciwgZWwpID0+IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcblxuLyoqXG4gKiBUaGUgcmVtb3ZlQ2hpbGQoKSBtZXRob2QgcmVtb3ZlcyBhIGNoaWxkIG5vZGUgZnJvbSB0aGUgRE9NLiBSZXR1cm5zIHJlbW92ZWQgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IHBhcmVudFxuICogQHBhcmFtIHtOb2RlfSBvbGRDaGlsZFxuICpcbiAqIEByZXR1cm4ge05vZGV9XG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVDaGlsZCA9IGN1cnJ5KChwYXJlbnQsIG9sZENoaWxkKSA9PiBwYXJlbnQucmVtb3ZlQ2hpbGQob2xkQ2hpbGQpKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBub2RlIGhhcyBhIGNsYXNzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGNsYXNzTGlzdENvbnRhaW5zID0gY3VycnkoKGNscywgZWwpID0+IGVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMpKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgTm9kZUxpc3QgdG8gYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge05vZGVMaXN0fSBub2RlTGlzdFxuICpcbiAqIEByZXR1cm4ge05vZGVbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IG5vZGVMaXN0VG9BcnJheSA9IG5vZGVMaXN0ID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVMaXN0KTtcblxuLyoqXG4gKiBBZGRzIGFyaWEtaGlkZGVuPXRydWUgdG8gYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgaGlkZSA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4vKipcbiAqIEFkZHMgYXJpYS1oaWRkZW49ZmFsc2UgdG8gYW4gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBzaG93ID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4vKipcbiAqIFRvZ2dsZXMgYXJpYS1oaWRkZW4gb24gYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IGN1cnJ5KCh2aXNpYmxlLCBlbGVtZW50KSA9PiAodmlzaWJsZSA/IHNob3cgOiBoaWRlKShlbGVtZW50KSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvZWxlbWVudHMuanMiLCJpbXBvcnQgJy4vdXRpbHMvZmV0Y2gnO1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBDb250ZW50VHlwZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1hY2hpbmVOYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFqb3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWlub3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGF0Y2hWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWFqb3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaDVwTWlub3JWZXJzaW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3VtbWFyeVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWNvblxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNyZWF0ZWRBdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHVwZGF0ZWRfQXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpc1JlY29tbWVuZGVkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9wdWxhcml0eVxuICogQHByb3BlcnR5IHtvYmplY3RbXX0gc2NyZWVuc2hvdHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBsaWNlbnNlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXhhbXBsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHR1dG9yaWFsXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBrZXl3b3Jkc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IG93bmVyXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGluc3RhbGxlZFxuICogQHByb3BlcnR5IHtib29sZWFufSByZXN0cmljdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YlNlcnZpY2VzIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcGlSb290VXJsXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7IGFwaVJvb3RVcmwgfSkge1xuICAgIHRoaXMuYXBpUm9vdFVybCA9IGFwaVJvb3RVcmw7XG4gICAgdGhpcy5zZXR1cCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHRoZSBjb250ZW50IHR5cGUgbWV0YWRhdGFcbiAgICovXG4gIHNldHVwKCkge1xuICAgIHRoaXMuY2FjaGVkQ29udGVudFR5cGVzID0gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWNvbnRlbnQtdHlwZS1jYWNoZWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgfSlcbiAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcbiAgICAudGhlbih0aGlzLmlzVmFsaWQpXG4gICAgLnRoZW4oanNvbiA9PiBqc29uLmxpYnJhcmllcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtICB7Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2V9IHJlc3BvbnNlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8Q29udGVudFR5cGVbXXxFcnJvck1lc3NhZ2U+fVxuICAgKi9cbiAgaXNWYWxpZChyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZS5tZXNzYWdlQ29kZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgY29udGVudCB0eXBlc1xuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZVtdPn1cbiAgICovXG4gIGNvbnRlbnRUeXBlcygpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZWRDb250ZW50VHlwZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENvbnRlbnQgVHlwZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgY29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZWRDb250ZW50VHlwZXMudGhlbihjb250ZW50VHlwZXMgPT4ge1xuICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5maWx0ZXIoY29udGVudFR5cGUgPT4gY29udGVudFR5cGUubWFjaGluZU5hbWUgPT09IG1hY2hpbmVOYW1lKVswXTtcbiAgICB9KTtcblxuICAgIC8qcmV0dXJuIGZldGNoKGAke3RoaXMuYXBpUm9vdFVybH1jb250ZW50X3R5cGVfY2FjaGUvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpOyovXG4gIH1cblxuICAvKipcbiAgICogSW5zdGFsbHMgYSBjb250ZW50IHR5cGUgb24gdGhlIHNlcnZlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgaW5zdGFsbENvbnRlbnRUeXBlKGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKG5zLmdldEFqYXhVcmwoJ2xpYnJhcnktaW5zdGFsbCcsIHtpZDogaWR9KSwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgYm9keTogJydcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcbiAgfVxuXG5cbiAgLy8gZm9yIHRlc3Rpbmcgd2l0aCBlcnJvclxuICAvKmluc3RhbGxDb250ZW50VHlwZShpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHt0aGlzLmFwaVJvb3RVcmx9bGlicmFyeS1pbnN0YWxsYCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZSdcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH0qL1xuXG4gIC8qKlxuICAgKiBVcGxvYWRzIGEgY29udGVudCB0eXBlIHRvIHRoZSBzZXJ2ZXIgZm9yIHZhbGlkYXRpb25cbiAgICpcbiAgICogQHBhcmFtIHtGb3JtRGF0YX0gZm9ybURhdGEgRm9ybSBjb250YWluaW5nIHRoZSBoNXAgdGhhdCBzaG91bGQgYmUgdXBsb2FkZWQgYXMgJ2g1cCdcbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGpzb24gY29udGFpbmluZyB0aGUgY29udGVudCBqc29uIGFuZCB0aGUgaDVwIGpzb25cbiAgICovXG4gIHVwbG9hZENvbnRlbnQoZm9ybURhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5hcGlSb290VXJsfWxpYnJhcnktdXBsb2FkYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgYm9keTogZm9ybURhdGFcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQuanNvbigpKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXNlcnZpY2VzLmpzIiwiLyoqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLnR5cGUgICAgICAgICB0eXBlIG9mIHRoZSBtZXNzYWdlOiBpbmZvLCBzdWNjZXNzLCBlcnJvclxuICogQHBhcmFtICB7Ym9vbGVhbn0gIGNvbmZpZy5kaXNtaXNzaWJsZSAgd2hldGhlciB0aGUgbWVzc2FnZSBjYW4gYmUgZGlzbWlzc2VkXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29uZmlnLmNvbnRlbnQgICAgICBtZXNzYWdlIGNvbnRlbnQgdXN1YWxseSBhICdoMycgYW5kIGEgJ3AnXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gZGl2IGNvbnRhaW5pbmcgdGhlIG1lc3NhZ2UgZWxlbWVudFxuICovXG5cbi8vVE9ETyBoYW5kbGUgc3RyaW5ncywgaHRtbCwgYmFkbHkgZm9ybWVkIG9iamVjdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyRXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gJ2Nsb3NlJztcbiAgY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gJyYjeDI3MTUnO1xuXG4gIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VDb250ZW50LmNsYXNzTmFtZSA9ICdtZXNzYWdlLWNvbnRlbnQnO1xuICBtZXNzYWdlQ29udGVudC5pbm5lckhUTUwgPSAnPGgxPicgKyBtZXNzYWdlLnRpdGxlICsgJzwvaDE+JyArICc8cD4nICsgbWVzc2FnZS5jb250ZW50ICsgJzwvcD4nO1xuXG4gIGNvbnN0IG1lc3NhZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1lc3NhZ2VXcmFwcGVyLmNsYXNzTmFtZSA9ICdtZXNzYWdlJyArICcgJyArIGAke21lc3NhZ2UudHlwZX1gICsgKG1lc3NhZ2UuZGlzbWlzc2libGUgPyAnIGRpc21pc3NpYmxlJyA6ICcnKTtcbiAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGVudCk7XG5cbiAgaWYgKG1lc3NhZ2UuYnV0dG9uICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBtZXNzYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbWVzc2FnZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcbiAgICBtZXNzYWdlQnV0dG9uLmlubmVySFRNTCA9IG1lc3NhZ2UuYnV0dG9uO1xuICAgIG1lc3NhZ2VXcmFwcGVyLmFwcGVuZENoaWxkKG1lc3NhZ2VCdXR0b24pO1xuICB9XG5cbiAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3V0aWxzL2Vycm9ycy5qcyIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcblxuLyoqXG4gKiAgVHJhbnNmb3JtcyBhIERPTSBjbGljayBldmVudCBpbnRvIGFuIEV2ZW50ZnVsJ3MgZXZlbnRcbiAqICBAc2VlIEV2ZW50ZnVsXG4gKlxuICogQHBhcmFtICB7c3RyaW5nIHwgT2JqZWN0fSB0eXBlXG4gKiBAcGFyYW0gIHtFdmVudGZ1bH0gZXZlbnRmdWxcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbGF5Q2xpY2tFdmVudEFzID0gY3VycnkoZnVuY3Rpb24odHlwZSwgZXZlbnRmdWwsIGVsZW1lbnQpIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBldmVudGZ1bC5maXJlKHR5cGUsIHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBpZDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIGRvbid0IGJ1YmJsZVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICByZXR1cm4gZWxlbWVudDtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZXZlbnRzLmpzIiwiaW1wb3J0IHtpbml0Q29sbGFwc2libGV9IGZyb20gJy4uL3V0aWxzL2FyaWEnO1xuXG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYSBwYW5lbFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgaW5pdENvbGxhcHNpYmxlKGVsZW1lbnQpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvcGFuZWwuanMiLCJpbXBvcnQge2F0dHJpYnV0ZUVxdWFscywgdG9nZ2xlQXR0cmlidXRlLCB0b2dnbGVWaXNpYmlsaXR5fSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFyaWEtZXhwYW5kZWQ9dHJ1ZSBvbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGlzRXhwYW5kZWQgPSBhdHRyaWJ1dGVFcXVhbHMoXCJhcmlhLWV4cGFuZGVkXCIsICd0cnVlJyk7XG5cbi8qKlxuICogVG9nZ2xlcyBhcmlhLWhpZGRlbiBvbiAnY29sbGFwc2libGUnIHdoZW4gYXJpYS1leHBhbmRlZCBjaGFuZ2VzIG9uICd0b2dnbGVyJyxcbiAqIGFuZCB0b2dnbGVzIGFyaWEtZXhwYW5kZWQgb24gJ3RvZ2dsZXInIG9uIGNsaWNrXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgY29uc3QgaW5pdENvbGxhcHNpYmxlID0gKGVsZW1lbnQpID0+IHtcbiAgLy8gZWxlbWVudHNcbiAgY29uc3QgdG9nZ2xlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FyaWEtY29udHJvbHNdW2FyaWEtZXhwYW5kZWRdJyk7XG4gIGNvbnN0IGNvbGxhcHNpYmxlSWQgPSB0b2dnbGVyLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICBjb25zdCBjb2xsYXBzaWJsZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y29sbGFwc2libGVJZH1gKTtcblxuICAvLyBzZXQgb2JzZXJ2ZXIgb24gdGl0bGUgZm9yIGFyaWEtZXhwYW5kZWRcbiAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdG9nZ2xlVmlzaWJpbGl0eShpc0V4cGFuZGVkKHRvZ2dsZXIpLCBjb2xsYXBzaWJsZSkpO1xuXG4gIG9ic2VydmVyLm9ic2VydmUodG9nZ2xlciwge1xuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbXCJhcmlhLWV4cGFuZGVkXCJdXG4gIH0pO1xuXG4gIC8vIFNldCBjbGljayBsaXN0ZW5lciB0aGF0IHRvZ2dsZXMgYXJpYS1leHBhbmRlZFxuICB0b2dnbGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlQXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCB0b2dnbGVyKSk7XG5cbiAgLy8gaW5pdGlhbGl6ZVxuICB0b2dnbGVWaXNpYmlsaXR5KGlzRXhwYW5kZWQodG9nZ2xlciksIGNvbGxhcHNpYmxlKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvdXRpbHMvYXJpYS5qcyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSFpwWlhkQ2IzZzlJakFnTUNBME1EQWdNakkxSWo0TkNpQWdQR1JsWm5NK0RRb2dJQ0FnUEhOMGVXeGxQZzBLSUNBZ0lDQWdMbU5zY3kweElIc05DaUFnSUNBZ0lHWnBiR3c2SUc1dmJtVTdEUW9nSUNBZ0lDQjlEUW9OQ2lBZ0lDQWdJQzVqYkhNdE1pQjdEUW9nSUNBZ0lDQm1hV3hzT2lBall6WmpObU0zT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1zSUM1amJITXROQ0I3RFFvZ0lDQWdJQ0JtYVd4c09pQWpabVptT3cwS0lDQWdJQ0FnZlEwS0RRb2dJQ0FnSUNBdVkyeHpMVE1nZXcwS0lDQWdJQ0FnYjNCaFkybDBlVG9nTUM0M093MEtJQ0FnSUNBZ2ZRMEtJQ0FnSUR3dmMzUjViR1UrRFFvZ0lEd3ZaR1ZtY3o0TkNpQWdQSFJwZEd4bFBtTnZiblJsYm5RZ2RIbHdaU0J3YkdGalpXaHZiR1JsY2w4eVBDOTBhWFJzWlQ0TkNpQWdQR2NnYVdROUlreGhlV1Z5WHpJaUlHUmhkR0V0Ym1GdFpUMGlUR0Y1WlhJZ01pSStEUW9nSUNBZ1BHY2dhV1E5SW1OdmJuUmxiblJmZEhsd1pWOXdiR0ZqWldodmJHUmxjaTB4WDJOdmNIa2lJR1JoZEdFdGJtRnRaVDBpWTI5dWRHVnVkQ0IwZVhCbElIQnNZV05sYUc5c1pHVnlMVEVnWTI5d2VTSStEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxURWlJSGRwWkhSb1BTSTBNREFpSUdobGFXZG9kRDBpTWpJMUlpOCtEUW9nSUNBZ0lDQThjbVZqZENCamJHRnpjejBpWTJ4ekxUSWlJSGc5SWpFeE1pNDFNU0lnZVQwaU5ETXVOREVpSUhkcFpIUm9QU0l4TnpZdU9UWWlJR2hsYVdkb2REMGlNVE0xTGpRMUlpQnllRDBpTVRBaUlISjVQU0l4TUNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE16WXVOallpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5URXVORGtpSUdONVBTSTJNUzQ1T0NJZ2NqMGlOQzQ0TVNJdlBnMEtJQ0FnSUNBZ1BHTnBjbU5zWlNCamJHRnpjejBpWTJ4ekxUTWlJR040UFNJeE5qWXVNU0lnWTNrOUlqWXhMams0SWlCeVBTSTBMamd4SWk4K0RRb2dJQ0FnSUNBOFp5QnBaRDBpWDBkeWIzVndYeUlnWkdGMFlTMXVZVzFsUFNJbWJIUTdSM0p2ZFhBbVozUTdJajROQ2lBZ0lDQWdJQ0FnUEdjZ2FXUTlJbDlIY205MWNGOHlJaUJrWVhSaExXNWhiV1U5SWlac2REdEhjbTkxY0NabmREc2lQZzBLSUNBZ0lDQWdJQ0FnSUR4d1lYUm9JR2xrUFNKZlEyOXRjRzkxYm1SZlVHRjBhRjhpSUdSaGRHRXRibUZ0WlQwaUpteDBPME52YlhCdmRXNWtJRkJoZEdnbVozUTdJaUJqYkdGemN6MGlZMnh6TFRRaUlHUTlJazB5TmpNdU1qZ3NPVFV1TWpGRE1qWXdMRGt5TGpBM0xESTFOU3c1TVM0MUxESTBPQzQwTXl3NU1TNDFTREl5TjNZNFNERTVPUzQxYkMweUxqRTNMREV3TGpJMFlUSTFMamcwTERJMUxqZzBMREFzTUN3eExERXhMalE0TFRFdU5qTXNNVGt1T1RNc01Ua3VPVE1zTUN3d0xERXNNVFF1TXprc05TNDFOeXd4T0M0eU5pd3hPQzR5Tml3d0xEQXNNU3cxTGpVeUxERXpMallzTWpNdU1URXNNak11TVRFc01Dd3dMREV0TWk0NE5Dd3hNUzR3TlN3eE9DNDJOU3d4T0M0Mk5Td3dMREFzTVMwNExqQTJMRGN1Tnprc09TdzVMREFzTUN3eExUUXVNVElzTVM0ek4wZ3lNeloyTFRJeGFERXdMalF5WXpjdU16WXNNQ3d4TWk0NE15MHhMall4TERFMkxqUXlMVFZ6TlM0ek9DMDNMalE0TERVdU16Z3RNVE11TkRSRE1qWTRMakl5TERFd01pNHlPU3d5TmpZdU5UY3NPVGd1TXpVc01qWXpMakk0TERrMUxqSXhXbTB0TVRVc01UZGpMVEV1TkRJc01TNHlNaTB6TGprc01TNHlOUzAzTGpReExERXVNalZJTWpNMmRpMHhOR2cxTGpZeVlUa3VOVGNzT1M0MU55d3dMREFzTVN3M0xESXVPVE1zTnk0d05TdzNMakExTERBc01Dd3hMREV1T0RVc05DNDVNa0UyTGpNekxEWXVNek1zTUN3d0xERXNNalE0TGpNeExERXhNaTR5TlZvaUx6NE5DaUFnSUNBZ0lDQWdJQ0E4Y0dGMGFDQnBaRDBpWDFCaGRHaGZJaUJrWVhSaExXNWhiV1U5SWlac2REdFFZWFJvSm1kME95SWdZMnhoYzNNOUltTnNjeTAwSWlCa1BTSk5NakF5TGprc01URTVMakV4WVRndU1USXNPQzR4TWl3d0xEQXNNQzAzTGpJNExEUXVOVEpzTFRFMkxURXVNaklzTnk0eU1pMHpNQzQ1TWtneE56UjJNakpJTVRVemRpMHlNa2d4TXpaMk5UWm9NVGQyTFRJeGFESXhkakl4YURJd0xqTXhZeTB5TGpjeUxEQXROUzB4TGpVekxUY3RNMkV4T1M0eE9Td3hPUzR4T1N3d0xEQXNNUzAwTGpjekxUUXVPRE1zTWpNdU5UZ3NNak11TlRnc01Dd3dMREV0TXkwMkxqWnNNVFl0TWk0eU5tRTRMakV4TERndU1URXNNQ3d4TERBc055NHlOaTB4TVM0M01sb2lMejROQ2lBZ0lDQWdJQ0FnUEM5blBnMEtJQ0FnSUNBZ1BDOW5QZzBLSUNBZ0lDQWdQSEpsWTNRZ1kyeGhjM005SW1Oc2N5MHpJaUI0UFNJeE56Y3VOallpSUhrOUlqVTNMalkySWlCM2FXUjBhRDBpT1RJdU1qZ2lJR2hsYVdkb2REMGlPUzR6T0NJZ2NuZzlJak11TlNJZ2NuazlJak11TlNJdlBnMEtJQ0FnSUR3dlp6NE5DaUFnUEM5blBnMEtQQzl6ZG1jK0RRbz1cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlcy9jb250ZW50LXR5cGUtcGxhY2Vob2xkZXIuc3ZnXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBIdWJWaWV3IGZyb20gJy4vaHViLXZpZXcnO1xuaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvbiBmcm9tICcuL2NvbnRlbnQtdHlwZS1zZWN0aW9uL2NvbnRlbnQtdHlwZS1zZWN0aW9uJztcbmltcG9ydCBVcGxvYWRTZWN0aW9uIGZyb20gJy4vdXBsb2FkLXNlY3Rpb24vdXBsb2FkLXNlY3Rpb24nO1xuaW1wb3J0IEh1YlNlcnZpY2VzIGZyb20gJy4vaHViLXNlcnZpY2VzJztcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHtyZW5kZXJFcnJvck1lc3NhZ2V9IGZyb20gJy4vdXRpbHMvZXJyb3JzJztcbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gSHViU3RhdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aXRsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlY3Rpb25JZFxuICogQHByb3BlcnR5IHtib29sZWFufSBleHBhbmRlZFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFwaVJvb3RVcmxcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBFcnJvck1lc3NhZ2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXJyb3JDb2RlXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gU2VsZWN0ZWRFbGVtZW50XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWRcbiAqL1xuLyoqXG4gKiBTZWxlY3QgZXZlbnRcbiAqIEBldmVudCBIdWIjc2VsZWN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEVycm9yIGV2ZW50XG4gKiBAZXZlbnQgSHViI2Vycm9yXG4gKiBAdHlwZSB7RXJyb3JNZXNzYWdlfVxuICovXG4vKipcbiAqIFVwbG9hZCBldmVudFxuICogQGV2ZW50IEh1YiN1cGxvYWRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgSHViI2Vycm9yXG4gKiBAZmlyZXMgSHViI3VwbG9hZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWIge1xuICAvKipcbiAgICogQHBhcmFtIHtIdWJTdGF0ZX0gc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gbmV3IEh1YlNlcnZpY2VzKHtcbiAgICAgIGFwaVJvb3RVcmw6IHN0YXRlLmFwaVJvb3RVcmxcbiAgICB9KTtcblxuICAgIC8vIGNvbnRyb2xsZXJzXG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24gPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uKHN0YXRlLCB0aGlzLnNlcnZpY2VzKTtcbiAgICB0aGlzLnVwbG9hZFNlY3Rpb24gPSBuZXcgVXBsb2FkU2VjdGlvbihzdGF0ZSwgdGhpcy5zZXJ2aWNlcyk7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBIdWJWaWV3KHN0YXRlKTtcblxuICAgIC8vIHByb3BhZ2F0ZSBjb250cm9sbGVyIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0J10sIHRoaXMuY29udGVudFR5cGVTZWN0aW9uKTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3VwbG9hZCddLCB0aGlzLnVwbG9hZFNlY3Rpb24pO1xuXG4gICAgLy8gaGFuZGxlIGV2ZW50c1xuICAgIHRoaXMub24oJ3NlbGVjdCcsIHRoaXMuc2V0UGFuZWxUaXRsZSwgdGhpcyk7XG4gICAgdGhpcy5vbignc2VsZWN0JywgdGhpcy52aWV3LmNsb3NlUGFuZWwsIHRoaXMudmlldyk7XG4gICAgdGhpcy52aWV3Lm9uKCd0YWItY2hhbmdlJywgdGhpcy52aWV3LnNldFNlY3Rpb25UeXBlLCB0aGlzLnZpZXcpO1xuICAgIHRoaXMudmlldy5vbigncGFuZWwtY2hhbmdlJywgdGhpcy52aWV3LnRvZ2dsZVBhbmVsT3Blbi5iaW5kKHRoaXMudmlldyksIHRoaXMudmlldyk7XG4gICAgdGhpcy5jb250ZW50VHlwZVNlY3Rpb24ub24oJ3JlbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5zZXJ2aWNlcy5zZXR1cCgpO1xuICAgICAgc2VsZi5jb250ZW50VHlwZVNlY3Rpb24uaW5pdENvbnRlbnRUeXBlTGlzdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbml0VGFiUGFuZWwoc3RhdGUpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJvbWlzZSBvZiBhIGNvbnRlbnQgdHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWFjaGluZU5hbWVcbiAgICogQHJldHVybiB7UHJvbWlzZS48Q29udGVudFR5cGU+fVxuICAgKi9cbiAgZ2V0Q29udGVudFR5cGUobWFjaGluZU5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50VHlwZShtYWNoaW5lTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGUgb2YgdGhlIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgc2V0UGFuZWxUaXRsZSh7aWR9KcKge1xuICAgIHRoaXMuZ2V0Q29udGVudFR5cGUoaWQpLnRoZW4oKHt0aXRsZX0pID0+IHRoaXMudmlldy5zZXRUaXRsZSh0aXRsZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgdGFiIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWN0aW9uSWRcbiAgICovXG4gIGluaXRUYWJQYW5lbCh7IHNlY3Rpb25JZCA9ICdjb250ZW50LXR5cGVzJyB9KSB7XG4gICAgY29uc3QgdGFiQ29uZmlncyA9IFt7XG4gICAgICB0aXRsZTogJ0NyZWF0ZSBDb250ZW50JyxcbiAgICAgIGlkOiAnY29udGVudC10eXBlcycsXG4gICAgICBjb250ZW50OiB0aGlzLmNvbnRlbnRUeXBlU2VjdGlvbi5nZXRFbGVtZW50KCksXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1VwbG9hZCcsXG4gICAgICBpZDogJ3VwbG9hZCcsXG4gICAgICBjb250ZW50OiB0aGlzLnVwbG9hZFNlY3Rpb24uZ2V0RWxlbWVudCgpXG4gICAgfV07XG5cbiAgICAvLyBzZXRzIHRoZSBjb3JyZWN0IG9uZSBzZWxlY3RlZFxuICAgIHRhYkNvbmZpZ3NcbiAgICAgIC5maWx0ZXIoY29uZmlnID0+IGNvbmZpZy5pZCA9PT0gc2VjdGlvbklkKVxuICAgICAgLmZvckVhY2goY29uZmlnID0+IGNvbmZpZy5zZWxlY3RlZCA9IHRydWUpO1xuXG4gICAgdGFiQ29uZmlncy5mb3JFYWNoKHRhYkNvbmZpZyA9PiB0aGlzLnZpZXcuYWRkVGFiKHRhYkNvbmZpZykpO1xuICAgIHRoaXMudmlldy5hZGRCb3R0b21Cb3JkZXIoKTsgLy8gQWRkcyBhbiBhbmltYXRlZCBib3R0b20gYm9yZGVyIHRvIGVhY2ggdGFiXG4gICAgdGhpcy52aWV3LmluaXRUYWJQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBpbiB0aGUgdmlld1xuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRFbGVtZW50KCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2h1Yi5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3R5bGVzL21haW4uc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIHJlbW92ZUNoaWxkLCBoaWRlLCBzaG93IH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBjdXJyeSwgZm9yRWFjaCB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBFdmVudGZ1bCB9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCI7XG5pbXBvcnQgaW5pdEltYWdlU2Nyb2xsZXIgZnJvbSBcImNvbXBvbmVudHMvaW1hZ2Utc2Nyb2xsZXJcIjtcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBub0ljb24gZnJvbSAnLi4vLi4vaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmcnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lEID0gJ2RhdGEtaWQnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7bnVtYmVyfVxuICovXG5jb25zdCBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OID0gMzAwO1xuXG4vKipcbiAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgaWYgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICovXG5jb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKGVsZW1lbnQsIHZpc2libGUpID0+ICh2aXNpYmxlID8gc2hvdyA6IGhpZGUpKGVsZW1lbnQpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBlbXB0eVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbXB0eSA9ICh0ZXh0KSA9PiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSAmJiAodGV4dC5sZW5ndGggPT09IDApO1xuXG5jb25zdCBoaWRlQWxsID0gZm9yRWFjaChoaWRlKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbFZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gY3JlYXRlIHZpZXdcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVWaWV3KCk7XG5cbiAgICAvLyBncmFiIHJlZmVyZW5jZXNcbiAgICB0aGlzLmJ1dHRvbkJhciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1iYXInKTtcbiAgICB0aGlzLnVzZUJ1dHRvbiA9IHRoaXMuYnV0dG9uQmFyLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tdXNlJyk7XG4gICAgdGhpcy5pbnN0YWxsQnV0dG9uID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsJyk7XG4gICAgdGhpcy5idXR0b25zID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvckFsbCgnLmJ1dHRvbicpO1xuXG4gICAgdGhpcy5pbWFnZSA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtdHlwZS1pbWFnZScpO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LWRldGFpbHMgLnRpdGxlJyk7XG4gICAgdGhpcy5vd25lciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm93bmVyJyk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZGV0YWlscyAuc21hbGwnKTtcbiAgICB0aGlzLmRlbW9CdXR0b24gPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZW1vLWJ1dHRvbicpO1xuICAgIHRoaXMuY2Fyb3VzZWwgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbCcpO1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0ID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICAgIHRoaXMubGljZW5jZVBhbmVsID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubGljZW5jZS1wYW5lbCcpO1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnN0YWxsLW1lc3NhZ2UnKTtcblxuICAgIC8vIGhpZGUgbWVzc2FnZSBvbiBjbG9zZSBidXR0b24gY2xpY2tcbiAgICBsZXQgaW5zdGFsbE1lc3NhZ2VDbG9zZSA9IHRoaXMuaW5zdGFsbE1lc3NhZ2UucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtY2xvc2UnKTtcbiAgICBpbnN0YWxsTWVzc2FnZUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGlkZSh0aGlzLmluc3RhbGxNZXNzYWdlKSk7XG5cbiAgICAvLyBpbml0IGludGVyYWN0aXZlIGVsZW1lbnRzXG4gICAgaW5pdFBhbmVsKHRoaXMubGljZW5jZVBhbmVsKTtcbiAgICBpbml0SW1hZ2VTY3JvbGxlcih0aGlzLmNhcm91c2VsKTtcblxuICAgIC8vIGZpcmUgZXZlbnRzIG9uIGJ1dHRvbiBjbGlja1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdjbG9zZScsIHRoaXMsIHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2stYnV0dG9uJykpO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdzZWxlY3QnLCB0aGlzLCB0aGlzLnVzZUJ1dHRvbik7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ2luc3RhbGwnLCB0aGlzLCB0aGlzLmluc3RhbGxCdXR0b24pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIHZpZXcgYXMgYSBIVE1MRWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZVZpZXcgKCkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtZGV0YWlsJztcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cImJhY2stYnV0dG9uIGljb24tYXJyb3ctdGhpY2tcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLXdyYXBwZXJcIj48aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmUgY29udGVudC10eXBlLWltYWdlXCIgc3JjPVwiJHtub0ljb259XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWRldGFpbHNcIj5cbiAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPjwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm93bmVyXCI+PC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3M9XCJzbWFsbFwiPjwvcD5cbiAgICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbiBkZW1vLWJ1dHRvblwiIHRhcmdldD1cIl9ibGFua1wiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBocmVmPVwiI1wiPkNvbnRlbnQgRGVtbzwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbFwiIHJvbGU9XCJyZWdpb25cIiBkYXRhLXNpemU9XCI1XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtYnV0dG9uIHByZXZpb3VzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGlzYWJsZWQ+PHNwYW4gY2xhc3M9XCJpY29uLWFycm93LXRoaWNrXCI+PC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1idXR0b24gbmV4dFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRpc2FibGVkPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgIDxuYXYgY2xhc3M9XCJzY3JvbGxlclwiPlxuICAgICAgICAgIDx1bD48L3VsPlxuICAgICAgICA8L25hdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGhyIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5zdGFsbC1tZXNzYWdlIG1lc3NhZ2UgZGlzbWlzc2libGUgc2ltcGxlIGluZm9cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtY2xvc2UgaWNvbi1jbG9zZVwiPjwvZGl2PlxuICAgICAgICA8aDM+PC9oMz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1iYXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnkgYnV0dG9uLXVzZVwiIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBkYXRhLWlkPVwiXCI+VXNlPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGF0YS1pZD1cIlwiPjxzcGFuIGNsYXNzPVwiaWNvbi1hcnJvdy10aGlja1wiPjwvc3Bhbj5JbnN0YWxsPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiBidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsaW5nXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHNwYW4gY2xhc3M9XCJpY29uLWxvYWRpbmctc2VhcmNoIGljb24tc3BpblwiPjwvc3Bhbj5JbnN0YWxsaW5nPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZ3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIGxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGVyXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1jb250cm9scz1cImxpY2VuY2UtcGFuZWxcIj48c3BhbiBjbGFzcz1cImljb24tYWNjb3JkaW9uLWFycm93XCI+PC9zcGFuPiBUaGUgTGljZW5jZSBJbmZvPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIiBpZD1cImxpY2VuY2UtcGFuZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5LWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBtZXNzYWdlIG9uIGluc3RhbGxcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBzdWNjZXNzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAqL1xuICBzZXRJbnN0YWxsTWVzc2FnZSh7IHN1Y2Nlc3MgPSB0cnVlLCBtZXNzYWdlIH0pe1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UucXVlcnlTZWxlY3RvcignaDMnKS5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgIHRoaXMuaW5zdGFsbE1lc3NhZ2UuY2xhc3NOYW1lID0gYGluc3RhbGwtbWVzc2FnZSBkaXNtaXNzaWJsZSBtZXNzYWdlIHNpbXBsZSAke3N1Y2Nlc3MgPyAnaW5mbycgOiAnZXJyb3InfWA7XG4gICAgc2hvdyh0aGlzLmluc3RhbGxNZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBpbWFnZXMgZnJvbSB0aGUgY2Fyb3VzZWxcbiAgICovXG4gIHJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwoKSB7XG4gICAgdGhpcy5jYXJvdXNlbExpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWxMaXN0KSk7XG4gICAgdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWwtbGlnaHRib3gnKS5mb3JFYWNoKHJlbW92ZUNoaWxkKHRoaXMuY2Fyb3VzZWwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaW1hZ2UgdG8gdGhlIGNhcm91c2VsXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpbWFnZVxuICAgKi9cbiAgYWRkSW1hZ2VUb0Nhcm91c2VsKGltYWdlKSB7XG4gICAgLy8gYWRkIGxpZ2h0Ym94XG4gICAgY29uc3QgbGlnaHRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsaWdodGJveC5pZCA9IGBsaWdodGJveC0ke3RoaXMuY2Fyb3VzZWxMaXN0LmNoaWxkRWxlbWVudENvdW50fWA7XG4gICAgbGlnaHRib3guY2xhc3NOYW1lID0gJ2Nhcm91c2VsLWxpZ2h0Ym94JztcbiAgICBsaWdodGJveC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBsaWdodGJveC5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgc3JjPVwiJHtpbWFnZS51cmx9XCIgYWx0PVwiJHtpbWFnZS5hbHR9XCI+YDtcbiAgICB0aGlzLmNhcm91c2VsLmFwcGVuZENoaWxkKGxpZ2h0Ym94KTtcblxuICAgIC8vIGFkZCB0aHVtYm5haWxcbiAgICBjb25zdCB0aHVtYm5haWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRodW1ibmFpbC5jbGFzc05hbWUgPSAnc2xpZGUnO1xuICAgIHRodW1ibmFpbC5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ltYWdlLnVybH1cIiBhbHQ9XCIke2ltYWdlLmFsdH1cIiBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgYXJpYS1jb250cm9scz1cIiR7bGlnaHRib3guaWR9XCIgLz5gO1xuICAgIHRoaXMuY2Fyb3VzZWxMaXN0LmFwcGVuZENoaWxkKHRodW1ibmFpbCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgaGlkZSh0aGlzLmluc3RhbGxNZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbWFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gICAqL1xuICBzZXRJbWFnZShzcmMpIHtcbiAgICB0aGlzLmltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjIHx8IG5vSWNvbik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRJZChpZCkge1xuICAgIHRoaXMuaW5zdGFsbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFX0NPTlRFTlRfVFlQRV9JRCwgaWQpO1xuICAgIHRoaXMudXNlQnV0dG9uLnNldEF0dHJpYnV0ZShBVFRSSUJVVEVfQ09OVEVOVF9UWVBFX0lELCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdGl0bGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqL1xuICBzZXRUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gYCR7dGl0bGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb25nIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqL1xuICBzZXREZXNjcmlwdGlvbih0ZXh0KSB7XG4gICAgaWYodGV4dC5sZW5ndGggPiBNQVhfVEVYVF9TSVpFX0RFU0NSSVBUSU9OKSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9PHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgICAgdGhpcy5kZXNjcmlwdGlvblxuICAgICAgICAucXVlcnlTZWxlY3RvcignLnJlYWQtbW9yZSwgLnJlYWQtbGVzcycpXG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uRXhwYW5kZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgUmVhZCBsZXNzIGFuZCBSZWFkIG1vcmUgdGV4dFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgdG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSB7XG4gICAgLy8gZmxpcCBib29sZWFuXG4gICAgdGhpcy5kZXNjcmlwdGlvbkV4cGFuZGVkID0gIXRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZDtcblxuICAgIGlmKHRoaXMuZGVzY3JpcHRpb25FeHBhbmRlZCkge1xuICAgICAgdGhpcy5kZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBgJHt0ZXh0fTxzcGFuIGNsYXNzPVwicmVhZC1sZXNzIGxpbmtcIj5SZWFkIGxlc3M8L3NwYW4+YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGAke3RoaXMuZWxsaXBzaXMoTUFYX1RFWFRfU0laRV9ERVNDUklQVElPTiwgdGV4dCl9PHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUgbGlua1wiPlJlYWQgbW9yZTwvc3Bhbj5gO1xuICAgIH1cblxuICAgIHRoaXMuZGVzY3JpcHRpb25cbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcucmVhZC1tb3JlLCAucmVhZC1sZXNzJylcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlRGVzY3JpcHRpb25FeHBhbmRlZCh0ZXh0KSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvcnRlbnMgYSBzdHJpbmcsIGFuZCBwdXRzIGFuIGVsaXBzaXMgYXQgdGhlIGVuZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi9cbiAgZWxsaXBzaXMoc2l6ZSwgdGV4dCkge1xuICAgIHJldHVybiBgJHt0ZXh0LnN1YnN0cigwLCBzaXplKX0uLi5gO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxpY2VuY2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICovXG4gIHNldExpY2VuY2UodHlwZSkge1xuICAgIGlmKHR5cGUpe1xuICAgICAgdGhpcy5saWNlbmNlUGFuZWwucXVlcnlTZWxlY3RvcignLnBhbmVsLWJvZHktaW5uZXInKS5pbm5lclRleHQgPSB0eXBlO1xuICAgICAgc2hvdyh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGlkZSh0aGlzLmxpY2VuY2VQYW5lbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvbmcgZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG93bmVyXG4gICAqL1xuICBzZXRPd25lcihvd25lcikge1xuICAgIGlmKG93bmVyKSB7XG4gICAgICB0aGlzLm93bmVyLmlubmVySFRNTCA9IGBCeSAke293bmVyfWA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5vd25lci5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZXhhbXBsZSB1cmxcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgc2V0RXhhbXBsZSh1cmwpIHtcbiAgICB0aGlzLmRlbW9CdXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgdXJsIHx8ICcjJyk7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eSh0aGlzLmRlbW9CdXR0b24sICFpc0VtcHR5KHVybCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgaWYgdGhlIGNvbnRlbnQgdHlwZSBpcyBpbnN0YWxsZWRcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBpbnN0YWxsZWRcbiAgICovXG4gIHNldElzSW5zdGFsbGVkKGluc3RhbGxlZCkge1xuICAgIHRoaXMuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoaW5zdGFsbGVkID8gJy5idXR0b24tdXNlJyA6ICcuYnV0dG9uLWluc3RhbGwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyBhbGwgYnV0dG9ucyBhbmQgc2hvd3MgdGhlIGJ1dHRvbiBvbiB0aGUgc2VsZWN0b3IgYWdhaW5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9c2VsZWN0b3JcbiAgICovXG4gIHNob3dCdXR0b25CeVNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5idXR0b25CYXIucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICBpZihidXR0b24pIHtcbiAgICAgIGhpZGVBbGwodGhpcy5idXR0b25zKTtcbiAgICAgIHNob3coYnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb290IGh0bWwgZWxlbWVudFxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwtdmlldy5qcyIsImltcG9ydCBDb250ZXRUeXBlRGV0YWlsVmlldyBmcm9tIFwiLi9jb250ZW50LXR5cGUtZGV0YWlsLXZpZXdcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZURldGFpbCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBzZXJ2aWNlcykge1xuICAgIC8vIGFkZCBldmVudCBzeXN0ZW1cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIEV2ZW50ZnVsKCkpO1xuXG4gICAgLy8gc2VydmljZXNcbiAgICB0aGlzLnNlcnZpY2VzID0gc2VydmljZXM7XG5cbiAgICAvLyB2aWV3c1xuICAgIHRoaXMudmlldyA9IG5ldyBDb250ZXRUeXBlRGV0YWlsVmlldyhzdGF0ZSk7XG4gICAgdGhpcy52aWV3Lm9uKCdpbnN0YWxsJywgdGhpcy5pbnN0YWxsLCB0aGlzKTtcblxuICAgIC8vIHByb3BhZ2F0ZSBldmVudHNcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ2Nsb3NlJywgJ3NlbGVjdCddLCB0aGlzLnZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSBkZXRhaWwgdmlld1xuICAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnZpZXcuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICBsb2FkQnlJZChpZCkge1xuICAgIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgQ29udGVudCBUeXBlIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlLjxDb250ZW50VHlwZT59XG4gICAqL1xuICAgaW5zdGFsbCh7aWR9KSB7XG4gICAgIC8vIHNldCBzcGlubmVyXG4gICAgIHRoaXMudmlldy5zaG93QnV0dG9uQnlTZWxlY3RvcignLmJ1dHRvbi1pbnN0YWxsaW5nJyk7XG5cbiAgICAgcmV0dXJuIHRoaXMuc2VydmljZXMuY29udGVudFR5cGUoaWQpXG4gICAgICAgLnRoZW4oY29udGVudFR5cGUgPT4gdGhpcy5zZXJ2aWNlcy5pbnN0YWxsQ29udGVudFR5cGUoY29udGVudFR5cGUubWFjaGluZU5hbWUpKVxuICAgICAgIC50aGVuKGNvbnRlbnRUeXBlID0+IHtcbiAgICAgICAgIHRoaXMudmlldy5zZXRJc0luc3RhbGxlZCh0cnVlKTtcbiAgICAgICAgIHRoaXMudmlldy5zaG93QnV0dG9uQnlTZWxlY3RvcignLmJ1dHRvbi1nZXQnKTtcbiAgICAgICAgIHRoaXMudmlldy5zZXRJbnN0YWxsTWVzc2FnZSh7XG4gICAgICAgICAgIG1lc3NhZ2U6IGAke2NvbnRlbnRUeXBlLnRpdGxlfSBzdWNjZXNzZnVsbHkgaW5zdGFsbGVkIWAsXG4gICAgICAgICB9KTtcbiAgICAgICB9KVxuICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICB0aGlzLnZpZXcuc2hvd0J1dHRvbkJ5U2VsZWN0b3IoJy5idXR0b24taW5zdGFsbCcpO1xuXG4gICAgICAgICAvLyBwcmludCBlcnJvciBtZXNzYWdlXG4gICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gKGVycm9yLmVycm9yQ29kZSkgPyBlcnJvciA6IHtcbiAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgIGVycm9yQ29kZTogJ1JFU1BPTlNFX0ZBSUxFRCcsXG4gICAgICAgICAgIG1lc3NhZ2U6IGAke2lkfSBjb3VsZCBub3QgYmUgaW5zdGFsbGVkISBDb250YWN0IHlvdXIgYWRtaW5pc3RyYXRvci5gLFxuICAgICAgICAgfTtcbiAgICAgICAgIHRoaXMudmlldy5zZXRJbnN0YWxsTWVzc2FnZShlcnJvck1lc3NhZ2UpO1xuXG4gICAgICAgICAvLyBsb2cgd2hvbGUgZXJyb3IgbWVzc2FnZSB0byBjb25zb2xlXG4gICAgICAgICBjb25zb2xlLmVycm9yKCdJbnN0YWxsYXRpb24gZXJyb3InLCBlcnJvcik7XG4gICAgICAgfSk7XG4gICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZpZXcgd2l0aCB0aGUgY29udGVudCB0eXBlIGRhdGFcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZSkge1xuICAgIHRoaXMudmlldy5yZXNldCgpO1xuICAgIHRoaXMudmlldy5zZXRJZChjb250ZW50VHlwZS5tYWNoaW5lTmFtZSk7XG4gICAgdGhpcy52aWV3LnNldFRpdGxlKGNvbnRlbnRUeXBlLnRpdGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0RGVzY3JpcHRpb24oY29udGVudFR5cGUuZGVzY3JpcHRpb24pO1xuICAgIHRoaXMudmlldy5zZXRJbWFnZShjb250ZW50VHlwZS5pY29uKTtcbiAgICB0aGlzLnZpZXcuc2V0RXhhbXBsZShjb250ZW50VHlwZS5leGFtcGxlKTtcbiAgICB0aGlzLnZpZXcuc2V0T3duZXIoY29udGVudFR5cGUub3duZXIpO1xuICAgIHRoaXMudmlldy5zZXRJc0luc3RhbGxlZChjb250ZW50VHlwZS5pbnN0YWxsZWQpO1xuICAgIHRoaXMudmlldy5zZXRMaWNlbmNlKGNvbnRlbnRUeXBlLmxpY2Vuc2UpO1xuXG4gICAgLy8gdXBkYXRlIGNhcm91c2VsXG4gICAgdGhpcy52aWV3LnJlbW92ZUFsbEltYWdlc0luQ2Fyb3VzZWwoKTtcbiAgICBjb250ZW50VHlwZS5zY3JlZW5zaG90cy5mb3JFYWNoKHRoaXMudmlldy5hZGRJbWFnZVRvQ2Fyb3VzZWwsIHRoaXMudmlldyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBodG1sIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwuanMiLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gXCJ1dGlscy9mdW5jdGlvbmFsXCI7XG5pbXBvcnQgeyBzZXRBdHRyaWJ1dGUsIGdldEF0dHJpYnV0ZSwgcmVtb3ZlQ2hpbGQgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBub0ljb24gZnJvbSAnLi4vLi4vaW1hZ2VzL2NvbnRlbnQtdHlwZS1wbGFjZWhvbGRlci5zdmcnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoaWRlID0gc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHNob3cgPSBzZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKiBAZmlyZXMgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50VHlwZUxpc3RWaWV3IHtcbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSByb290IGVsZW1lbnRcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTmFtZSA9ICdjb250ZW50LXR5cGUtbGlzdCc7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICBoaWRlKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIHRoZSByb290IGVsZW1lbnRcbiAgICovXG4gIHNob3coKSB7XG4gICAgc2hvdyh0aGlzLnJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCByb3dzIGZyb20gcm9vdCBlbGVtZW50XG4gICAqL1xuICByZW1vdmVBbGxSb3dzKCkge1xuICAgIHdoaWxlKHRoaXMucm9vdEVsZW1lbnQuaGFzQ2hpbGROb2RlcygpICl7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMucm9vdEVsZW1lbnQubGFzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHJvd1xuICAgKlxuICAgKiBAcGFyYW0ge0NvbnRlbnRUeXBlfSBjb250ZW50VHlwZVxuICAgKi9cbiAgYWRkUm93KGNvbnRlbnRUeXBlKSB7XG4gICAgY29uc3Qgcm93ID0gdGhpcy5jcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgdGhpcyk7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3Jvdy1zZWxlY3RlZCcsIHRoaXMsIHJvdyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZChyb3cpXG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgYSBDb250ZW50IFR5cGUgY29uZmlndXJhdGlvbiBhbmQgY3JlYXRlcyBhIHJvdyBkb21cbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZX0gY29udGVudFR5cGVcbiAgICogQHBhcmFtIHtFdmVudGZ1bH0gc2NvcGVcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVDb250ZW50VHlwZVJvdyhjb250ZW50VHlwZSwgc2NvcGUpIHtcbiAgICAvLyByb3cgaXRlbVxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuaWQgPSBgY29udGVudC10eXBlLSR7Y29udGVudFR5cGUubWFjaGluZU5hbWV9YDtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIGNvbnRlbnRUeXBlLm1hY2hpbmVOYW1lKTtcblxuICAgIC8vIGNyZWF0ZSBidXR0b24gY29uZmlnXG4gICAgY29uc3QgdXNlQnV0dG9uQ29uZmlnID0geyB0ZXh0OiAnVXNlJywgY2xzOiAnYnV0dG9uLXByaW1hcnknLCBpY29uOiAnJyB9O1xuICAgIGNvbnN0IGluc3RhbGxCdXR0b25Db25maWcgPSB7IHRleHQ6ICdHZXQnLCBjbHM6ICdidXR0b24taW52ZXJzZS1wcmltYXJ5IGJ1dHRvbi1pbnN0YWxsJywgaWNvbjogJ2ljb24tYXJyb3ctdGhpY2snfTtcbiAgICBjb25zdCBidXR0b24gPSBjb250ZW50VHlwZS5pbnN0YWxsZWQgPyAgdXNlQnV0dG9uQ29uZmlnOiBpbnN0YWxsQnV0dG9uQ29uZmlnO1xuXG4gICAgY29uc3QgdGl0bGUgPSBjb250ZW50VHlwZS50aXRsZSB8fCBjb250ZW50VHlwZS5tYWNoaW5lTmFtZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGNvbnRlbnRUeXBlLnN1bW1hcnkgfHwgJyc7XG5cbiAgICBjb25zdCBpbWFnZSA9IGNvbnRlbnRUeXBlLmljb24gfHwgbm9JY29uO1xuXG4gICAgLy8gY3JlYXRlIGh0bWxcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgIDxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIHNyYz1cIiR7aW1hZ2V9XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbiAke2J1dHRvbi5jbHN9XCIgZGF0YS1pZD1cIiR7Y29udGVudFR5cGUubWFjaGluZU5hbWV9XCIgdGFiaW5kZXg9XCIwXCI+PHNwYW4gY2xhc3M9XCIke2J1dHRvbi5pY29ufVwiPjwvc3Bhbj4ke2J1dHRvbi50ZXh0fTwvc3Bhbj5cbiAgICAgIDxoND4ke3RpdGxlfTwvaDQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke2Rlc2NyaXB0aW9ufTwvZGl2PlxuICAgYDtcblxuICAgIC8vIGhhbmRsZSB1c2UgYnV0dG9uXG4gICAgY29uc3QgdXNlQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXByaW1hcnknKTtcbiAgICBpZih1c2VCdXR0b24pe1xuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ3NlbGVjdCcsIHNjb3BlLCB1c2VCdXR0b24pO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQ7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0LXZpZXcuanMiLCJpbXBvcnQgQ29udGV0VHlwZUxpc3RWaWV3IGZyb20gXCIuL2NvbnRlbnQtdHlwZS1saXN0LXZpZXdcIjtcbmltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5cbi8qKlxuICogUm93IHNlbGVjdGVkIGV2ZW50XG4gKiBAZXZlbnQgQ29udGVudFR5cGVMaXN0I3Jvdy1zZWxlY3RlZFxuICogQHR5cGUge1NlbGVjdGVkRWxlbWVudH1cbiAqL1xuLyoqXG4gKiBVcGRhdGUgY29udGVudCB0eXBlIGxpc3QgZXZlbnRcbiAqIEBldmVudCBDb250ZW50VHlwZUxpc3QjdXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0XG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEBjbGFzc1xuICogQG1peGVzIEV2ZW50ZnVsXG4gKiBAZmlyZXMgSHViI3NlbGVjdFxuICogQGZpcmVzIENvbnRlbnRUeXBlTGlzdCNyb3ctc2VsZWN0ZWRcbiAqIEBmaXJlcyBDb250ZW50VHlwZUxpc3QjdXBkYXRlLWNvbnRlbnQtdHlwZS1saXN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlTGlzdCB7XG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBhZGQgdGhlIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGV0VHlwZUxpc3RWaWV3KHN0YXRlKTtcbiAgICB0aGlzLnByb3BhZ2F0ZShbJ3Jvdy1zZWxlY3RlZCcsICdzZWxlY3QnXSwgdGhpcy52aWV3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHRoaXMgZWxlbWVudFxuICAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnZpZXcuaGlkZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgdGhpcyBlbGVtZW50XG4gICAqL1xuICBzaG93KCkge1xuICAgIHRoaXMudmlldy5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBsaXN0IHdpdGggbmV3IGNvbnRlbnQgdHlwZXNcbiAgICpcbiAgICogQHBhcmFtIHtDb250ZW50VHlwZVtdfSBjb250ZW50VHlwZXNcbiAgICovXG4gIHVwZGF0ZShjb250ZW50VHlwZXMpIHtcbiAgICB0aGlzLnZpZXcucmVtb3ZlQWxsUm93cygpO1xuICAgIGNvbnRlbnRUeXBlcy5mb3JFYWNoKHRoaXMudmlldy5hZGRSb3csIHRoaXMudmlldyk7XG4gICAgdGhpcy5maXJlKCd1cGRhdGUtY29udGVudC10eXBlLWxpc3QnLCB7fSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2aWV3cyByb290IGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtbGlzdC9jb250ZW50LXR5cGUtbGlzdC5qcyIsImltcG9ydCBNZXNzYWdlVmlldyBmcm9tIFwiLi4vbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlld1wiO1xuaW1wb3J0IHsgc2V0QXR0cmlidXRlLCBnZXRBdHRyaWJ1dGUsIGhhc0F0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlLCBxdWVyeVNlbGVjdG9yQWxsIH0gZnJvbSBcInV0aWxzL2VsZW1lbnRzXCI7XG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IHJlbGF5Q2xpY2tFdmVudEFzIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBpbml0TWVudSBmcm9tICdjb21wb25lbnRzL21lbnUnO1xuaW1wb3J0IHsgRXZlbnRmdWwgfSBmcm9tICcuLi9taXhpbnMvZXZlbnRmdWwnO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCB1bnNlbGVjdEFsbCA9IGZvckVhY2gocmVtb3ZlQXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykpO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50QnJvd3NlclZpZXcge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50c1xuICAgIHRoaXMucm9vdEVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoc3RhdGUpO1xuXG4gICAgLy8gcGljayBlbGVtZW50c1xuICAgIHRoaXMubWVudWJhciA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmJhci1uYXYnKTtcbiAgICB0aGlzLmlucHV0RmllbGQgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwic2VhcmNoXCJdIGlucHV0Jyk7XG4gICAgdGhpcy5kaXNwbGF5U2VsZWN0ZWQgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZiYXItdG9nZ2xlci1zZWxlY3RlZCcpO1xuICAgIGNvbnN0IGlucHV0QnV0dG9uID0gdGhpcy5yb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInNlYXJjaFwiXSAuaW5wdXQtZ3JvdXAtYWRkb24nKTtcblxuICAgIC8vIGlucHV0IGZpZWxkXG4gICAgdGhpcy5pbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5maXJlKCdzZWFyY2gnLCB7XG4gICAgICAgIGVsZW1lbnQ6IGV2ZW50LnRhcmdldCxcbiAgICAgICAgcXVlcnk6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgICAga2V5Q29kZTogZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBpbnB1dCBidXR0b25cbiAgICBpbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICBsZXQgc2VhcmNoYmFyID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignI2h1Yi1zZWFyY2gtYmFyJyk7XG5cbiAgICAgICB0aGlzLmZpcmUoJ3NlYXJjaCcsIHtcbiAgICAgICAgIGVsZW1lbnQ6IHNlYXJjaGJhcixcbiAgICAgICAgIHF1ZXJ5OiBzZWFyY2hiYXIudmFsdWUsXG4gICAgICAgICBrZXlDb2RlOiAxMyAvLyBBY3QgbGlrZSBhbiAnZW50ZXInIGtleSBwcmVzc1xuICAgICAgIH0pO1xuXG4gICAgICAgc2VhcmNoYmFyLmZvY3VzKCk7XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBtZW51IGdyb3VwIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlRWxlbWVudChzdGF0ZSkge1xuICAgIGxldCBtZW51dGl0bGUgPSAnQnJvd3NlIGNvbnRlbnQgdHlwZXMnO1xuICAgIGxldCBtZW51SWQgPSAnY29udGVudC10eXBlLWZpbHRlcic7XG4gICAgbGV0IHNlYXJjaFRleHQgPSAnU2VhcmNoIGZvciBDb250ZW50IFR5cGVzJztcblxuICAgIC8vIGNyZWF0ZSBlbGVtZW50XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2NvbnRlbnQtdHlwZS1zZWN0aW9uLXZpZXcnO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtZ3JvdXBcIj5cbiAgICAgICAgPG5hdiAgcm9sZT1cIm1lbnViYXJcIiBjbGFzcz1cIm5hdmJhclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItaGVhZGVyXCI+XG4gICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlciBuYXZiYXItdG9nZ2xlci1yaWdodFwiIGFyaWEtY29udHJvbHM9XCIke21lbnVJZH1cIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXItc2VsZWN0ZWRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24tYWNjb3JkaW9uLWFycm93XCI+PC9zcGFuPlxuICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2YmFyLWJyYW5kXCI+JHttZW51dGl0bGV9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPHVsIGlkPVwiJHttZW51SWR9XCIgY2xhc3M9XCJuYXZiYXItbmF2XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC91bD5cbiAgICAgICAgPC9uYXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCIgcm9sZT1cInNlYXJjaFwiPlxuICAgICAgICAgIDxpbnB1dCBpZD1cImh1Yi1zZWFyY2gtYmFyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXJvdW5kZWRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiJHtzZWFyY2hUZXh0fVwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGljb24tc2VhcmNoXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgZGlzcGxheU1lc3NhZ2UoY29uZmlnKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vIFNldCB0aGUgYWN0aW9uXG4gICAgLy8gVE9ETyAtIHNob3VsZCBiZSB0cmFuc2xhdGFibGVcbiAgICBjb25maWcuYWN0aW9uID0gXCJSZWxvYWRcIjtcblxuICAgIHZhciBtZXNzYWdlVmlldyA9IG5ldyBNZXNzYWdlVmlldyhjb25maWcpO1xuICAgIHZhciBlbGVtZW50ID0gbWVzc2FnZVZpZXcuZ2V0RWxlbWVudCgpO1xuXG4gICAgbWVzc2FnZVZpZXcub24oJ2FjdGlvbi1jbGlja2VkJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5yb290RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgc2VsZi5maXJlKCdyZWxvYWQnKTtcbiAgICB9KTtcblxuICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VWaWV3LmdldEVsZW1lbnQoKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG1lbnUgaXRlbVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaWRcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBhZGRNZW51SXRlbSh7IHRpdGxlLCBpZCwgc2VsZWN0ZWQgfSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnVpdGVtJyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBpZCk7XG4gICAgZWxlbWVudC5pbm5lclRleHQgPSB0aXRsZTtcblxuICAgIC8vIHNldHMgaWYgdGhpcyBtZW51aXRlbSBzaG91bGQgYmUgc2VsZWN0ZWRcbiAgICBpZihzZWxlY3RlZCkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgdGhpcy5kaXNwbGF5U2VsZWN0ZWQuaW5uZXJUZXh0ID0gdGl0bGU7XG4gICAgfVxuXG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLCBlbGVtZW50KTtcblxuICAgIC8vIGFkZCB0byBtZW51IGJhclxuICAgIHRoaXMubWVudWJhci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGlucHV0IGZpZWxkXG4gICAqL1xuICBjbGVhcklucHV0RmllbGQoKSB7XG4gICAgdGhpcy5pbnB1dEZpZWxkLnZhbHVlID0gJyc7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGZpbHRlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0ZWROYW1lXG4gICAqL1xuICBzZXREaXNwbGF5U2VsZWN0ZWQoc2VsZWN0ZWROYW1lKSB7XG4gICAgdGhpcy5kaXNwbGF5U2VsZWN0ZWQuaW5uZXJUZXh0ID0gc2VsZWN0ZWROYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSBtZW51IGl0ZW0gYnkgaWRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZWxlY3RNZW51SXRlbUJ5SWQoaWQpIHtcbiAgICBjb25zdCBtZW51SXRlbXMgPSB0aGlzLm1lbnViYXIucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJtZW51aXRlbVwiXScpO1xuICAgIGNvbnN0IHNlbGVjdGVkTWVudUl0ZW0gPSB0aGlzLm1lbnViYXIucXVlcnlTZWxlY3RvcihgW3JvbGU9XCJtZW51aXRlbVwiXVtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcblxuICAgIGlmKHNlbGVjdGVkTWVudUl0ZW0pIHtcbiAgICAgIHVuc2VsZWN0QWxsKG1lbnVJdGVtcyk7XG4gICAgICBzZWxlY3RlZE1lbnVJdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG5cbiAgICAgIHRoaXMuZmlyZSgnbWVudS1zZWxlY3RlZCcsIHtcbiAgICAgICAgZWxlbWVudDogc2VsZWN0ZWRNZW51SXRlbSxcbiAgICAgICAgaWQ6IHNlbGVjdGVkTWVudUl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXRNZW51KCkge1xuICAgIC8vIGNyZWF0ZSB0aGUgdW5kZXJsaW5lXG4gICAgY29uc3QgdW5kZXJsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHVuZGVybGluZS5jbGFzc05hbWUgPSAnbWVudWl0ZW0tdW5kZXJsaW5lJztcbiAgICB0aGlzLm1lbnViYXIuYXBwZW5kQ2hpbGQodW5kZXJsaW5lKTtcblxuICAgIC8vIGNhbGwgaW5pdCBtZW51IGZyb20gc2RrXG4gICAgaW5pdE1lbnUodGhpcy5yb290RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBjb250ZW50IGJyb3dzZXJcbiAgICpcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9jb250ZW50LXR5cGUtc2VjdGlvbi9jb250ZW50LXR5cGUtc2VjdGlvbi12aWV3LmpzIiwiaW1wb3J0IENvbnRlbnRUeXBlU2VjdGlvblZpZXcgZnJvbSBcIi4vY29udGVudC10eXBlLXNlY3Rpb24tdmlld1wiO1xuaW1wb3J0IFNlYXJjaFNlcnZpY2UgZnJvbSBcIi4uL3NlYXJjaC1zZXJ2aWNlL3NlYXJjaC1zZXJ2aWNlXCI7XG5pbXBvcnQgQ29udGVudFR5cGVMaXN0IGZyb20gJy4uL2NvbnRlbnQtdHlwZS1saXN0L2NvbnRlbnQtdHlwZS1saXN0JztcbmltcG9ydCBDb250ZW50VHlwZURldGFpbCBmcm9tICcuLi9jb250ZW50LXR5cGUtZGV0YWlsL2NvbnRlbnQtdHlwZS1kZXRhaWwnO1xuaW1wb3J0IHtFdmVudGZ1bH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcbmltcG9ydCB7cmVuZGVyRXJyb3JNZXNzYWdlfSBmcm9tICcuLi91dGlscy9lcnJvcnMnO1xuXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBJRF9GSUxURVJfQUxMID0gJ2ZpbHRlci1hbGwnO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50VHlwZVNlY3Rpb25cbiAqIEBtaXhlcyBFdmVudGZ1bFxuICpcbiAqIEBmaXJlcyBIdWIjc2VsZWN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnRUeXBlU2VjdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUsIHNlcnZpY2VzKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICB0aGlzLnR5cGVBaGVhZEVuYWJsZWQgPSB0cnVlO1xuXG4gICAgLy8gYWRkIHZpZXdcbiAgICB0aGlzLnZpZXcgPSBuZXcgQ29udGVudFR5cGVTZWN0aW9uVmlldyhzdGF0ZSk7XG5cbiAgICAvLyBjb250cm9sbGVyXG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlID0gbmV3IFNlYXJjaFNlcnZpY2Uoc2VydmljZXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0ID0gbmV3IENvbnRlbnRUeXBlTGlzdCgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwgPSBuZXcgQ29udGVudFR5cGVEZXRhaWwoc2VydmljZXMpO1xuXG4gICAgLy8gY29uZmlndXJhdGlvbiBmb3IgZmlsdGVyc1xuICAgIGNvbnN0IGZpbHRlckNvbmZpZ3MgPSBbe1xuICAgICAgICB0aXRsZTogJ0FsbCcsXG4gICAgICAgIGlkOiBJRF9GSUxURVJfQUxMLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdNeSBDb250ZW50IFR5cGVzJyxcbiAgICAgICAgaWQ6ICdmaWx0ZXItbXktY29udGVudC10eXBlcycsXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ01vc3QgUG9wdWxhcicsXG4gICAgICAgIGlkOiAnZmlsdGVyLW1vc3QtcG9wdWxhcicsXG4gICAgICB9XTtcblxuICAgIC8vIGFkZCBtZW51IGl0ZW1zXG4gICAgZmlsdGVyQ29uZmlncy5mb3JFYWNoKHRoaXMudmlldy5hZGRNZW51SXRlbSwgdGhpcy52aWV3KTtcbiAgICB0aGlzLnZpZXcuaW5pdE1lbnUoKTtcblxuICAgIC8vIEVsZW1lbnQgZm9yIGhvbGRpbmcgbGlzdCBhbmQgZGV0YWlscyB2aWV3c1xuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQtdHlwZS1zZWN0aW9uJyk7XG5cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gc2VjdGlvbjtcbiAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFR5cGVMaXN0LmdldEVsZW1lbnQoKSk7XG4gICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmdldEVsZW1lbnQoKSk7XG5cbiAgICB0aGlzLnZpZXcuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xuXG4gICAgLy8gcHJvcGFnYXRlIGV2ZW50c1xuICAgIHRoaXMucHJvcGFnYXRlKFsnc2VsZWN0JywgJ3VwZGF0ZS1jb250ZW50LXR5cGUtbGlzdCddLCB0aGlzLmNvbnRlbnRUeXBlTGlzdCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydzZWxlY3QnXSwgdGhpcy5jb250ZW50VHlwZURldGFpbCk7XG4gICAgdGhpcy5wcm9wYWdhdGUoWydyZWxvYWQnXSwgdGhpcy52aWV3KTtcblxuICAgIC8vIHJlZ2lzdGVyIGxpc3RlbmVyc1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5zZWFyY2gsIHRoaXMpO1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy52aWV3LnNlbGVjdE1lbnVJdGVtQnlJZC5iaW5kKHRoaXMudmlldywgSURfRklMVEVSX0FMTCkpO1xuICAgIHRoaXMudmlldy5vbignc2VhcmNoJywgdGhpcy5yZXNldE1lbnVPbkVudGVyLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmFwcGx5U2VhcmNoRmlsdGVyLCB0aGlzKTtcbiAgICB0aGlzLnZpZXcub24oJ21lbnUtc2VsZWN0ZWQnLCB0aGlzLmNsZWFySW5wdXRGaWVsZCwgdGhpcyk7XG4gICAgdGhpcy52aWV3Lm9uKCdtZW51LXNlbGVjdGVkJywgdGhpcy51cGRhdGVEaXNwbGF5U2VsZWN0ZWQsIHRoaXMpO1xuICAgIHRoaXMuY29udGVudFR5cGVMaXN0Lm9uKCdyb3ctc2VsZWN0ZWQnLCB0aGlzLnNob3dEZXRhaWxWaWV3LCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLm9uKCdjbG9zZScsIHRoaXMuY2xvc2VEZXRhaWxWaWV3LCB0aGlzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLm9uKCdzZWxlY3QnLCB0aGlzLmNsb3NlRGV0YWlsVmlldywgdGhpcyk7XG5cbiAgICB0aGlzLmluaXRDb250ZW50VHlwZUxpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIGNvbnRlbnQgdHlwZSBsaXN0IHdpdGggYSBzZWFyY2hcbiAgICovXG4gIGluaXRDb250ZW50VHlwZUxpc3QoKSB7XG4gICAgLy8gaW5pdGlhbGl6ZSBieSBzZWFyY2hcbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKFwiXCIpXG4gICAgICAudGhlbihjb250ZW50VHlwZXMgPT4gdGhpcy5jb250ZW50VHlwZUxpc3QudXBkYXRlKGNvbnRlbnRUeXBlcykpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnJvcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBlcnJvcnMgY29tbXVuaWNhdGluZyB3aXRoIEhVQlxuICAgKi9cbiAgaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICAvLyBUT0RPIC0gdXNlIHRyYW5zbGF0aW9uIHN5c3RlbTpcbiAgICB0aGlzLnZpZXcuZGlzcGxheU1lc3NhZ2Uoe1xuICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgIHRpdGxlOiAnTm90IGFibGUgdG8gY29tbXVuaWNhdGUgd2l0aCBodWIuJyxcbiAgICAgIGNvbnRlbnQ6ICdFcnJvciBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLidcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBhIHNlYXJjaCBhbmQgdXBkYXRlcyB0aGUgY29udGVudCB0eXBlIGxpc3RcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XG4gICAqL1xuICBzZWFyY2goe3F1ZXJ5LCBrZXlDb2RlfSkge1xuICAgIGlmICh0aGlzLnR5cGVBaGVhZEVuYWJsZWQgfHwga2V5Q29kZSA9PT0gMTMpIHsgLy8gU2VhcmNoIGF1dG9tYXRpY2FsbHkgb3Igb24gJ2VudGVyJ1xuICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaChxdWVyeSlcbiAgICAgICAgLnRoZW4oY29udGVudFR5cGVzID0+IHRoaXMuY29udGVudFR5cGVMaXN0LnVwZGF0ZShjb250ZW50VHlwZXMpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZGlzcGxheWVkIG5hbWUgb2YgdGhlIHNlbGVjdGVkIGZpbHRlciBmb3IgbW9iaWxlXG4gICAqXG4gICAqIEBwYXJhbSB7U2VsZWN0ZWRFbGVtZW50fSBldmVudFxuICAgKi9cbiAgdXBkYXRlRGlzcGxheVNlbGVjdGVkKGV2ZW50KSB7XG4gICAgdGhpcy52aWV3LnNldERpc3BsYXlTZWxlY3RlZChldmVudC5lbGVtZW50LmlubmVyVGV4dCk7XG4gIH1cblxuICByZXNldE1lbnVPbkVudGVyKHtrZXlDb2RlfSkge1xuICAgIGlmIChrZXlDb2RlID09PSAxMykge1xuICAgICAgdGhpcy5jbG9zZURldGFpbFZpZXcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGFwcGx5IGEgc2VhcmNoIGZpbHRlclxuICAgKiBAcGFyYW0ge1NlbGVjdGVkRWxlbWVudH0gZXZlbnRcbiAgICovXG4gIGFwcGx5U2VhcmNoRmlsdGVyKGV2ZW50KSB7XG4gICAgY29uc29sZS5kZWJ1ZygnQ29udGVudFR5cGVTZWN0aW9uOiBtZW51IHdhcyBjbGlja2VkIScsIGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGlucHV0IGZpZWxkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKi9cbiAgY2xlYXJJbnB1dEZpZWxkKHtpZH0pIHtcbiAgICBpZiAoaWQgIT09IElEX0ZJTFRFUl9BTEwpIHtcbiAgICAgIHRoaXMudmlldy5jbGVhcklucHV0RmllbGQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgZGV0YWlsIHZpZXdcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzaG93RGV0YWlsVmlldyh7aWR9KSB7XG4gICAgdGhpcy5jb250ZW50VHlwZUxpc3QuaGlkZSgpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwubG9hZEJ5SWQoaWQpO1xuICAgIHRoaXMuY29udGVudFR5cGVEZXRhaWwuc2hvdygpO1xuICAgIHRoaXMudHlwZUFoZWFkRW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cblxuICAvKipcbiAgICogQ2xvc2UgZGV0YWlsIHZpZXdcbiAgICovXG4gIGNsb3NlRGV0YWlsVmlldygpIHtcbiAgICB0aGlzLmNvbnRlbnRUeXBlRGV0YWlsLmhpZGUoKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlTGlzdC5zaG93KCk7XG4gICAgdGhpcy50eXBlQWhlYWRFbmFibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEVsZW1lbnQoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvY29udGVudC10eXBlLXNlY3Rpb24vY29udGVudC10eXBlLXNlY3Rpb24uanMiLCJpbXBvcnQgaW5pdFBhbmVsIGZyb20gXCJjb21wb25lbnRzL3BhbmVsXCJcbmltcG9ydCBpbml0VGFiUGFuZWwgZnJvbSBcImNvbXBvbmVudHMvdGFiLXBhbmVsXCJcbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSBcInV0aWxzL2Z1bmN0aW9uYWxcIjtcbmltcG9ydCB7IGF0dHJpYnV0ZUVxdWFscywgZ2V0QXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUgfSBmcm9tIFwidXRpbHMvZWxlbWVudHNcIjtcbmltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi9taXhpbnMvZXZlbnRmdWwnO1xuaW1wb3J0IHsgcmVsYXlDbGlja0V2ZW50QXMgfSBmcm9tICcuL3V0aWxzL2V2ZW50cyc7XG4vKipcbiAqIFRhYiBjaGFuZ2UgZXZlbnRcbiAqIEBldmVudCBIdWJWaWV3I3RhYi1jaGFuZ2VcbiAqIEB0eXBlIHtTZWxlY3RlZEVsZW1lbnR9XG4gKi9cbi8qKlxuICogUGFuZWwgb3BlbiBvciBjbG9zZSBldmVudFxuICogQGV2ZW50IEh1YlZpZXcjcGFuZWwtY2hhbmdlXG4gKiBAdHlwZSB7U2VsZWN0ZWRFbGVtZW50fVxuICovXG4vKipcbiAqIEBjb25zdGFudCB7c3RyaW5nfVxuICovXG5jb25zdCBBVFRSSUJVVEVfREFUQV9JRCA9ICdkYXRhLWlkJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgaXNPcGVuID0gaGFzQXR0cmlidXRlKCdvcGVuJyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbWl4ZXMgRXZlbnRmdWxcbiAqIEBmaXJlcyBIdWJWaWV3I3RhYi1jaGFuZ2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHViVmlldyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0h1YlN0YXRlfSBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAvLyBhZGQgZXZlbnQgc3lzdGVtXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBFdmVudGZ1bCgpKTtcblxuICAgIHRoaXMucmVuZGVyVGFiUGFuZWwoc3RhdGUpO1xuICAgIHRoaXMucmVuZGVyUGFuZWwoc3RhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgcGFuZWxcbiAgICovXG4gIGNsb3NlUGFuZWwoKSB7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHRpdGxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKi9cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGRvbSBmb3IgdGhlIHBhbmVsXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjdGlvbklkXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwYW5kZWRcbiAgICovXG4gIHJlbmRlclBhbmVsKHt0aXRsZSA9ICcnLCBzZWN0aW9uSWQgPSAnY29udGVudC10eXBlcycsIGV4cGFuZGVkID0gZmFsc2V9KSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRpdGxlLmNsYXNzTmFtZSArPSBcInBhbmVsLWhlYWRlciBpY29uLWh1Yi1pY29uXCI7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAoISFleHBhbmRlZCkudG9TdHJpbmcoKSk7XG4gICAgdGhpcy50aXRsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBgcGFuZWwtYm9keS0ke3NlY3Rpb25JZH1gKTtcbiAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIHJlbGF5Q2xpY2tFdmVudEFzKCdwYW5lbC1jaGFuZ2UnLCB0aGlzLCB0aGlzLnRpdGxlKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmJvZHkuY2xhc3NOYW1lICs9IFwicGFuZWwtYm9keVwiO1xuICAgIHRoaXMuYm9keS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgKCFleHBhbmRlZCkudG9TdHJpbmcoKSk7XG4gICAgdGhpcy5ib2R5LmlkID0gYHBhbmVsLWJvZHktJHtzZWN0aW9uSWR9YDtcbiAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50YWJDb250YWluZXJFbGVtZW50KTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgKz0gYHBhbmVsIGg1cC1zZWN0aW9uLSR7c2VjdGlvbklkfWA7XG4gICAgaWYoZXhwYW5kZWQpe1xuICAgICAgdGhpcy5wYW5lbC5zZXRBdHRyaWJ1dGUoJ29wZW4nLCAnJyk7XG4gICAgfVxuICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmJvZHkpO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yb290RWxlbWVudC5jbGFzc05hbWUgKz0gYGg1cCBoNXAtaHViIGg1cC1zZGtgO1xuICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gICAgaW5pdFBhbmVsKHRoaXMucm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpZiBwYW5lbCBpcyBvcGVuLCB0aGlzIGlzIHVzZWQgZm9yIG91dGVyIGJvcmRlciBjb2xvclxuICAgKi9cbiAgdG9nZ2xlUGFuZWxPcGVuKCkge1xuICAgIGxldCBwYW5lbCA9IHRoaXMucGFuZWw7XG4gICAgaWYoaXNPcGVuKHBhbmVsKSkge1xuICAgICAgcGFuZWwucmVtb3ZlQXR0cmlidXRlKCdvcGVuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3BhbmVsLnF1ZXJ5U2VsZWN0b3IoJyNodWItc2VhcmNoLWJhcicpLmZvY3VzKCl9LDIwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgZG9tIGZvciB0aGUgdGFiIHBhbmVsXG4gICAqL1xuICByZW5kZXJUYWJQYW5lbChzdGF0ZSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRhYmxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMudGFibGlzdC5jbGFzc05hbWUgKz0gXCJ0YWJsaXN0XCI7XG4gICAgdGhpcy50YWJsaXN0LnNldEF0dHJpYnV0ZSAoJ3JvbGUnLCAndGFibGlzdCcpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMudGFiTGlzdFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICB0aGlzLnRhYkxpc3RXcmFwcGVyLmFwcGVuZENoaWxkKHRoaXMudGFibGlzdCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50LmNsYXNzTmFtZSArPSAndGFiLXBhbmVsJztcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50YWJMaXN0V3JhcHBlcik7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHRhYlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRlbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBzZWxlY3RlZFxuICAgKi9cbiAgYWRkVGFiKHt0aXRsZSwgaWQsIGNvbnRlbnQsIHNlbGVjdGVkID0gZmFsc2V9KSB7XG4gICAgY29uc3QgdGFiSWQgPSBgdGFiLSR7aWR9YDtcbiAgICBjb25zdCB0YWJQYW5lbElkID0gYHRhYi1wYW5lbC0ke2lkfWA7XG5cbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHRhYi5jbGFzc05hbWUgKz0gJ3RhYic7XG4gICAgdGFiLmlkID0gdGFiSWQ7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRhYlBhbmVsSWQpO1xuICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBzZWxlY3RlZC50b1N0cmluZygpKTtcbiAgICB0YWIuc2V0QXR0cmlidXRlKEFUVFJJQlVURV9EQVRBX0lELCBpZCk7XG4gICAgdGFiLnNldEF0dHJpYnV0ZSgncm9sZScsICd0YWInKTtcbiAgICB0YWIuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgcmVsYXlDbGlja0V2ZW50QXMoJ3RhYi1jaGFuZ2UnLCB0aGlzLCB0YWIpO1xuXG4gICAgY29uc3QgdGFiUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YWJQYW5lbC5pZCA9IHRhYlBhbmVsSWQ7XG4gICAgdGFiUGFuZWwuY2xhc3NOYW1lICs9ICd0YWJwYW5lbCc7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmxsZWRieScsIHRhYklkKTtcbiAgICB0YWJQYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgKCFzZWxlY3RlZCkudG9TdHJpbmcoKSk7XG4gICAgdGFiUGFuZWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYnBhbmVsJyk7XG4gICAgdGFiUGFuZWwuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cbiAgICB0aGlzLnRhYmxpc3QuYXBwZW5kQ2hpbGQodGFiKTtcbiAgICB0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGFiUGFuZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gYW5pbWF0ZWQgYm9yZGVyIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhYlxuICAgKi9cbiAgYWRkQm90dG9tQm9yZGVyKCkge1xuICAgIHRoaXMudGFibGlzdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpO1xuICB9XG5cbiAgaW5pdFRhYlBhbmVsKCkge1xuICAgIGluaXRUYWJQYW5lbCh0aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHNlY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqL1xuICBzZXRTZWN0aW9uVHlwZSh7aWR9KSB7XG4gICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgPSBgaDVwLXNlY3Rpb24tJHtpZH0gcGFuZWxgO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgaHRtbCBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvaHViLXZpZXcuanMiLCJpbXBvcnQge2N1cnJ5fSBmcm9tICd1dGlscy9mdW5jdGlvbmFsJ1xuXG4vKipcbiAqIEBjbGFzc1xuICogVGhlIFNlYXJjaCBTZXJ2aWNlIGdldHMgYSBjb250ZW50IHR5cGUgZnJvbSBodWItc2VydmljZXMuanNcbiAqIGluIHRoZSBmb3JtIG9mIGEgcHJvbWlzZS4gSXQgdGhlbiBnZW5lcmF0ZXMgYSBzY29yZSBiYXNlZFxuICogb24gdGhlIGRpZmZlcmVudCB3ZWlnaHRpbmdzIG9mIHRoZSBjb250ZW50IHR5cGUgZmllbGRzIGFuZFxuICogc29ydHMgdGhlIHJlc3VsdHMgYmFzZWQgb24gdGhlIGdlbmVyYXRlZCBzY29yZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoU2VydmljZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlLmFwaVJvb3RVcmxcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNlcnZpY2VzKSB7XG4gICAgdGhpcy5zZXJ2aWNlcyA9IHNlcnZpY2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgc2VhcmNoXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPENvbnRlbnRUeXBlW10+fSBBIHByb21pc2Ugb2YgYW4gYXJyYXkgb2YgY29udGVudCB0eXBlc1xuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5KSB7XG4gICAgLy8gQWRkIGNvbnRlbnQgdHlwZXMgdG8gdGhlIHNlYXJjaCBpbmRleFxuICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRUeXBlcygpLnRoZW4oZmlsdGVyQnlRdWVyeShxdWVyeSkpO1xuICB9XG59XG5cbi8qKlxuICogRmlsdGVycyBhIGxpc3Qgb2YgY29udGVudCB0eXBlcyBiYXNlZCBvbiBhIHF1ZXJ5XG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0ge0NvbnRlbnRUeXBlW119IGNvbnRlbnRUeXBlc1xuICovXG5jb25zdCBmaWx0ZXJCeVF1ZXJ5ID0gY3VycnkoZnVuY3Rpb24ocXVlcnksIGNvbnRlbnRUeXBlcykge1xuICBpZiAocXVlcnkgPT0gJycpIHtcbiAgICByZXR1cm4gY29udGVudFR5cGVzO1xuICB9XG5cbiAgLy8gQXBwZW5kIGEgc2VhcmNoIHNjb3JlIHRvIGVhY2ggY29udGVudCB0eXBlXG4gIHJldHVybiBjb250ZW50VHlwZXMubWFwKGNvbnRlbnRUeXBlID0+XG4gICAgKHtcbiAgICAgIGNvbnRlbnRUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIHNjb3JlOiBnZXRTZWFyY2hTY29yZShxdWVyeSwgY29udGVudFR5cGUpXG4gICAgfSkpXG4gICAgLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0LnNjb3JlID4gMClcbiAgICAuc29ydChzb3J0U2VhcmNoUmVzdWx0cykgLy8gU29ydCBieSBpbnN0YWxsZWQsIHJlbGV2YW5jZSBhbmQgcG9wdWxhcml0eVxuICAgIC5tYXAocmVzdWx0ID0+IHJlc3VsdC5jb250ZW50VHlwZSk7IC8vIFVud3JhcCByZXN1bHQgb2JqZWN0O1xufSk7XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIEFycmF5LnNvcnQoKVxuICogQ29tcGFyZXMgdHdvIGNvbnRlbnQgdHlwZXMgb24gZGlmZmVyZW50IGNyaXRlcmlhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgRmlyc3QgY29udGVudCB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gYiBTZWNvbmQgY29udGVudCB0eXBlXG4gKiBAcmV0dXJuIHtpbnR9XG4gKi9cbmNvbnN0IHNvcnRTZWFyY2hSZXN1bHRzID0gKGEsYikgPT4ge1xuICBpZiAoIWEuY29udGVudFR5cGUuaW5zdGFsbGVkICYmIGIuY29udGVudFR5cGUuaW5zdGFsbGVkKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAoYS5jb250ZW50VHlwZS5pbnN0YWxsZWQgJiYgIWIuY29udGVudFR5cGUuaW5zdGFsbGVkKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgZWxzZSBpZiAoYi5zY29yZSAhPT0gYS5zY29yZSkge1xuICAgIHJldHVybiBiLnNjb3JlIC0gYS5zY29yZTtcbiAgfVxuXG4gIGVsc2Uge1xuICAgIHJldHVybiBiLmNvbnRlbnRUeXBlLnBvcHVsYXJpdHkgLSBhLmNvbnRlbnRUeXBlLnBvcHVsYXJpdHk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB3ZWlnaHRpbmcgZm9yIGRpZmZlcmVudCBzZWFyY2ggdGVybXMgYmFzZWRcbiAqIG9uIGV4aXN0ZW5jZSBvZiBzdWJzdHJpbmdzXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBxdWVyeVxuICogQHBhcmFtICB7T2JqZWN0fSBjb250ZW50VHlwZVxuICogQHJldHVybiB7aW50fVxuICovXG4gY29uc3QgZ2V0U2VhcmNoU2NvcmUgPSBmdW5jdGlvbihxdWVyeSwgY29udGVudFR5cGUpIHtcbiAgIGxldCBxdWVyaWVzID0gcXVlcnkuc3BsaXQoJyAnKS5maWx0ZXIocXVlcnkgPT4gcXVlcnkgIT09ICcnKTtcbiAgIGxldCBxdWVyeVNjb3JlcyA9IHF1ZXJpZXMubWFwKHF1ZXJ5ID0+IGdldFNjb3JlRm9yRWFjaFF1ZXJ5KHF1ZXJ5LCBjb250ZW50VHlwZSkpO1xuICAgaWYgKHF1ZXJ5U2NvcmVzLmluZGV4T2YoMCkgPiAtMSkge1xuICAgICByZXR1cm4gMDtcbiAgIH1cbiAgIHJldHVybiBxdWVyeVNjb3Jlcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcbiB9O1xuXG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmVsZXZhbmNlIHNjb3JlIGZvciBhIHNpbmdsZSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0gIHt0eXBlfSBxdWVyeSAgICAgICBkZXNjcmlwdGlvblxuICogQHBhcmFtICB7dHlwZX0gY29udGVudFR5cGUgZGVzY3JpcHRpb25cbiAqIEByZXR1cm4ge3R5cGV9ICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gKi9cbmNvbnN0IGdldFNjb3JlRm9yRWFjaFF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5LCBjb250ZW50VHlwZSkge1xuICAgcXVlcnkgPSBxdWVyeS50cmltKCk7XG4gICBpZiAoaGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS50aXRsZSkpIHtcbiAgICAgcmV0dXJuIDEwMDtcbiAgIH1cbiAgIGVsc2UgaWYgKGhhc1N1YlN0cmluZyhxdWVyeSwgY29udGVudFR5cGUuc3VtbWFyeSkpIHtcbiAgICAgcmV0dXJuIDU7XG4gICB9XG4gICBlbHNlIGlmIChoYXNTdWJTdHJpbmcocXVlcnksIGNvbnRlbnRUeXBlLmRlc2NyaXB0aW9uKSkge1xuICAgICByZXR1cm4gNTtcbiAgIH1cbiAgIGVsc2UgaWYgKGFycmF5SGFzU3ViU3RyaW5nKHF1ZXJ5LCBjb250ZW50VHlwZS5rZXl3b3JkcykpIHtcbiAgICAgcmV0dXJuIDU7XG4gICB9XG4gICBlbHNlIHtcbiAgICAgcmV0dXJuIDA7XG4gICB9XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG5lZWRsZSBpcyBmb3VuZCBpbiB0aGUgaGF5c3RhY2suXG4gKiBOb3QgY2FzZSBzZW5zaXRpdmVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmVlZGxlXG4gKiBAcGFyYW0ge3N0cmluZ30gaGF5c3RhY2tcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGhhc1N1YlN0cmluZyA9IGZ1bmN0aW9uKG5lZWRsZSwgaGF5c3RhY2spIHtcbiAgaWYgKGhheXN0YWNrID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaGF5c3RhY2sudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5lZWRsZS50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiwgY2hlY2tzIGlmIGFycmF5IGhhcyBjb250YWlucyBhIHN1YnN0cmluZ1xuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gc3ViU3RyaW5nXG4gKiBAcGFyYW0gIHtBcnJheX0gYXJyXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBhcnJheUhhc1N1YlN0cmluZyA9IGZ1bmN0aW9uKHN1YlN0cmluZywgYXJyKSB7XG4gIGlmIChhcnIgPT09IHVuZGVmaW5lZCB8fCBzdWJTdHJpbmcgPT09ICcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGFyci5zb21lKHN0cmluZyA9PiBoYXNTdWJTdHJpbmcoc3ViU3RyaW5nLCBzdHJpbmcpKTtcbn07XG5cbmNvbnN0IEFkZE51bWJlcj1mdW5jdGlvbihhLGIpXG57XG4gIHJldHVybiBhK2I7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9zZWFyY2gtc2VydmljZS9zZWFyY2gtc2VydmljZS5qcyIsImltcG9ydCB7IEV2ZW50ZnVsIH0gZnJvbSAnLi4vbWl4aW5zL2V2ZW50ZnVsJztcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICpcbiAqIEBmaXJlcyBIdWIjdXBsb2FkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFNlY3Rpb24ge1xuXG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBzZXJ2aWNlcykge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBzZXJ2aWNlc1xuICAgIHRoaXMuc2VydmljZXMgPSBzZXJ2aWNlcztcblxuICAgIC8vIElucHV0IGVsZW1lbnQgZm9yIHRoZSBINVAgZmlsZVxuICAgIGNvbnN0IGg1cFVwbG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaDVwVXBsb2FkLnNldEF0dHJpYnV0ZSgndHlwZScsICdmaWxlJyk7XG5cbiAgICAvLyBTZW5kcyB0aGUgSDVQIGZpbGUgdG8gdGhlIHBsdWdpblxuICAgIGNvbnN0IHVzZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHVzZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdVc2UnO1xuICAgIHVzZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgLy8gQWRkIHRoZSBINVAgZmlsZSB0byBhIGZvcm0sIHJlYWR5IGZvciB0cmFuc3BvcnRhdGlvblxuICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgZGF0YS5hcHBlbmQoJ2g1cCcsIGg1cFVwbG9hZC5maWxlc1swXSk7XG5cbiAgICAgIC8vIFVwbG9hZCBjb250ZW50IHRvIHRoZSBwbHVnaW5cbiAgICAgIHRoaXMuc2VydmljZXMudXBsb2FkQ29udGVudChkYXRhKVxuICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAvLyBGaXJlIHRoZSByZWNlaXZlZCBkYXRhIHRvIGFueSBsaXN0ZW5lcnNcbiAgICAgICAgICBzZWxmLmZpcmUoJ3VwbG9hZCcsIGpzb24pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGg1cFVwbG9hZCk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh1c2VCdXR0b24pO1xuXG4gICAgdGhpcy5yb290RWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBnZXRFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50O1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91cGxvYWQtc2VjdGlvbi91cGxvYWQtc2VjdGlvbi5qcyIsImltcG9ydCB7IHNldEF0dHJpYnV0ZSwgcmVtb3ZlQXR0cmlidXRlLCBoYXNBdHRyaWJ1dGUsIGNsYXNzTGlzdENvbnRhaW5zLCBxdWVyeVNlbGVjdG9yLCBub2RlTGlzdFRvQXJyYXkgfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2N1cnJ5LCBmb3JFYWNofSBmcm9tICcuLi91dGlscy9mdW5jdGlvbmFsJztcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqL1xuY29uc3QgQVRUUklCVVRFX1NJWkUgPSAnZGF0YS1zaXplJztcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IGRpc2FibGUgPSBzZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgZW5hYmxlID0gcmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlZFxuICovXG5jb25zdCB0b2dnbGVFbmFibGVkID0gKGVsZW1lbnQsIGVuYWJsZWQpID0+IChlbmFibGVkID8gZW5hYmxlIDogZGlzYWJsZSkoZWxlbWVudCk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtib29sZWFufSBoaWRkZW5cbiAqL1xuY29uc3QgdG9nZ2xlVmlzaWJpbGl0eSA9IGN1cnJ5KChoaWRkZW4sIGVsZW1lbnQpID0+IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBoaWRkZW4udG9TdHJpbmcoKSwgZWxlbWVudCkpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaXNEaXNhYmxlZCA9IGhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIHZpZXdcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0ltYWdlU2Nyb2xsZXJTdGF0ZX0gc3RhdGVcbiAqL1xuY29uc3QgdXBkYXRlVmlldyA9IChlbGVtZW50LCBzdGF0ZSkgPT4ge1xuICBjb25zdCBwcmV2QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMnKTtcbiAgY29uc3QgbmV4dEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQnKTtcbiAgY29uc3QgbGlzdCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKTtcbiAgY29uc3QgdG90YWxDb3VudCA9IGxpc3QuY2hpbGRFbGVtZW50Q291bnQ7XG5cbiAgLy8gdXBkYXRlIGxpc3Qgc2l6ZXNcbiAgbGlzdC5zdHlsZS53aWR0aCA9IGAkezEwMCAvIHN0YXRlLmRpc3BsYXlDb3VudCAqIHRvdGFsQ291bnR9JWA7XG4gIGxpc3Quc3R5bGUubWFyZ2luTGVmdCA9IGAke3N0YXRlLnBvc2l0aW9uICogKDEwMCAvIHN0YXRlLmRpc3BsYXlDb3VudCl9JWA7XG5cbiAgLy8gdXBkYXRlIGltYWdlIHNpemVzXG4gIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGknKVxuICAgIC5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5zdHlsZS53aWR0aCA9IGAkezEwMCAvIHRvdGFsQ291bnR9JWApO1xuXG4gIC8vIHRvZ2dsZSBidXR0b24gdmlzaWJpbGl0eVxuICBbcHJldkJ1dHRvbiwgbmV4dEJ1dHRvbl1cbiAgICAuZm9yRWFjaCh0b2dnbGVWaXNpYmlsaXR5KHN0YXRlLmRpc3BsYXlDb3VudCA+PSB0b3RhbENvdW50KSk7XG5cbiAgLy8gdG9nZ2xlIGJ1dHRvbiBlbmFibGUsIGRpc2FibGVkXG4gIHRvZ2dsZUVuYWJsZWQobmV4dEJ1dHRvbiwgc3RhdGUucG9zaXRpb24gPiAoc3RhdGUuZGlzcGxheUNvdW50IC0gdG90YWxDb3VudCkpO1xuICB0b2dnbGVFbmFibGVkKHByZXZCdXR0b24sIHN0YXRlLnBvc2l0aW9uIDwgMCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgYnV0dG9uIGNsaWNrZWRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0ltYWdlU2Nyb2xsZXJTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJ1dHRvblxuICogQHBhcmFtIHtmdW5jdGlvbn0gdXBkYXRlU3RhdGVcbiAqIEBwYXJhbSB7RXZlbnR9XG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3Qgb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2sgPSBjdXJyeSgoZWxlbWVudCwgc3RhdGUsIGJ1dHRvbiwgdXBkYXRlU3RhdGUsIGV2ZW50KSA9PiB7XG4gIGlmKCFpc0Rpc2FibGVkKGJ1dHRvbikpe1xuICAgIHVwZGF0ZVN0YXRlKHN0YXRlKTtcbiAgICB1cGRhdGVWaWV3KGVsZW1lbnQsIHN0YXRlKTtcbiAgfVxufSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gaW1hZ2VcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpbWFnZVxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IGluaXRJbWFnZSA9IGN1cnJ5KChlbGVtZW50LCBpbWFnZSkgPT4ge1xuICBsZXQgdGFyZ2V0SWQgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgbGV0IHRhcmdldCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFyZ2V0SWR9YCk7XG5cbiAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpKTtcbiAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpKVxufSk7XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHdoZW4gdGhlIGRvbSBpcyB1cGRhdGVkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtJbWFnZVNjcm9sbGVyU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge011dGF0aW9uUmVjb3JkfSByZWNvcmRcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCBoYW5kbGVEb21VcGRhdGUgPSBjdXJyeSgoZWxlbWVudCwgc3RhdGUsIHJlY29yZCkgPT4ge1xuICAvLyBvbiBhZGQgaW1hZ2UgcnVuIGluaXRpYWxpemF0aW9uXG4gIGlmKHJlY29yZC50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgIG5vZGVMaXN0VG9BcnJheShyZWNvcmQuYWRkZWROb2RlcylcbiAgICAgIC5maWx0ZXIoY2xhc3NMaXN0Q29udGFpbnMoJ3NsaWRlJykpXG4gICAgICAubWFwKHF1ZXJ5U2VsZWN0b3IoJ2ltZycpKVxuICAgICAgLmZvckVhY2goaW5pdEltYWdlKGVsZW1lbnQpKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgdmlld1xuICB1cGRhdGVWaWV3KGVsZW1lbnQsIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxuICAgIHBvc2l0aW9uOiAwXG4gIH0pKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgcGFuZWxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdChlbGVtZW50KSB7XG4gIC8vIGdldCBidXR0b24gaHRtbCBlbGVtZW50c1xuICBjb25zdCBuZXh0QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpO1xuICBjb25zdCBwcmV2QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMnKTtcblxuICAvKipcbiAgICogQHR5cGVkZWYge29iamVjdH0gSW1hZ2VTY3JvbGxlclN0YXRlXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkaXNwbGF5Q291bnRcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHBvc2l0aW9uXG4gICAqL1xuICBjb25zdCBzdGF0ZSA9IHtcbiAgICBkaXNwbGF5Q291bnQ6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJJQlVURV9TSVpFKSB8fCA1LFxuICAgIHBvc2l0aW9uOiAwXG4gIH07XG5cbiAgLy8gaW5pdGlhbGl6ZSBidXR0b25zXG4gIG5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk5hdmlnYXRpb25CdXR0b25DbGljayhlbGVtZW50LCBzdGF0ZSwgbmV4dEJ1dHRvbiwgc3RhdGUgPT4gc3RhdGUucG9zaXRpb24tLSkpO1xuICBwcmV2QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25OYXZpZ2F0aW9uQnV0dG9uQ2xpY2soZWxlbWVudCwgc3RhdGUsIHByZXZCdXR0b24sIHN0YXRlID0+IHN0YXRlLnBvc2l0aW9uKyspKTtcblxuICAvLyBpbml0aWFsaXplIGltYWdlc1xuICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1thcmlhLWNvbnRyb2xzXScpLmZvckVhY2goaW5pdEltYWdlKGVsZW1lbnQpKTtcblxuICAvLyBsaXN0ZW4gZm9yIHVwZGF0ZXMgdG8gZGF0YS1zaXplXG4gIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZvckVhY2goaGFuZGxlRG9tVXBkYXRlKGVsZW1lbnQsIHN0YXRlKSkpO1xuXG4gIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCwge1xuICAgIHN1YnRyZWU6IHRydWUsXG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbQVRUUklCVVRFX1NJWkVdXG4gIH0pO1xuXG4gIC8vIGluaXRpYWxpemUgcG9zaXRpb25cbiAgdXBkYXRlVmlldyhlbGVtZW50LCBzdGF0ZSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2g1cC1zZGsvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9pbWFnZS1zY3JvbGxlci5qcyIsImltcG9ydCB7c2V0QXR0cmlidXRlLCB0b2dnbGVBdHRyaWJ1dGUsIGhpZGUsIHNob3csIHRvZ2dsZVZpc2liaWxpdHl9IGZyb20gJy4uL3V0aWxzL2VsZW1lbnRzJztcbmltcG9ydCB7Y3VycnksIGZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuaW1wb3J0IHsgaW5pdENvbGxhcHNpYmxlIH0gZnJvbSAnLi4vdXRpbHMvYXJpYSc7XG5cbi8qKlxuICogVW5zZWxlY3RzIGFsbCBlbGVtZW50cyBpbiBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnRbXX0gZWxlbWVudHNcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCB1blNlbGVjdEFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJykpO1xuXG4vKipcbiAqIFNldHMgdGhlIGFyaWEtZXhwYW5kZWQgYXR0cmlidXRlIG9uIGFuIGVsZW1lbnQgdG8gZmFsc2VcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKi9cbmNvbnN0IHVuRXhwYW5kID0gc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG5cbi8qKlxuICogSW5pdGlhdGVzIGEgdGFiIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgLy8gZWxlbWVudHNcbiAgY29uc3QgbWVudUl0ZW1zID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cIm1lbnVpdGVtXCJdJyk7XG4gIGNvbnN0IHRvZ2dsZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScpO1xuXG4gIC8vIG1vdmUgc2VsZWN0XG4gIG1lbnVJdGVtcy5mb3JFYWNoKG1lbnVJdGVtID0+IHtcbiAgICBtZW51SXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIHVuU2VsZWN0QWxsKG1lbnVJdGVtcyk7XG4gICAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgIHVuRXhwYW5kKHRvZ2dsZXIpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBpbml0IGNvbGxhcHNlIGFuZCBvcGVuXG4gIGluaXRDb2xsYXBzaWJsZShlbGVtZW50KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9oNXAtc2RrL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvbWVudS5qcyIsImltcG9ydCB7c2V0QXR0cmlidXRlfSBmcm9tICcuLi91dGlscy9lbGVtZW50cyc7XG5pbXBvcnQge2ZvckVhY2h9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9uYWwnO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3QgaGlkZUFsbCA9IGZvckVhY2goc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJykpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqL1xuY29uc3Qgc2hvdyA9IHNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKi9cbmNvbnN0IHVuU2VsZWN0QWxsID0gZm9yRWFjaChzZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKSk7XG5cbi8qKlxuICogSW5pdGlhdGVzIGEgdGFiIHBhbmVsXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgY29uc3QgdGFicyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9XCJ0YWJcIl0nKTtcbiAgY29uc3QgdGFiUGFuZWxzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcm9sZT1cInRhYnBhbmVsXCJdJyk7XG5cbiAgdGFicy5mb3JFYWNoKHRhYiA9PiB7XG4gICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgIHVuU2VsZWN0QWxsKHRhYnMpO1xuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG5cbiAgICAgIGhpZGVBbGwodGFiUGFuZWxzKTtcblxuICAgICAgbGV0IHRhYlBhbmVsSWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gICAgICBzaG93KGVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGFiUGFuZWxJZH1gKSk7XG4gICAgfSk7XG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaDVwLXNkay9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3RhYi1wYW5lbC5qcyIsInJlcXVpcmUoJy4uLy4uL3NyYy9zdHlsZXMvbWFpbi5zY3NzJyk7XG5cbi8vIExvYWQgbGlicmFyeVxuSDVQID0gSDVQIHx8IHt9O1xuSDVQLkh1YkNsaWVudCA9IHJlcXVpcmUoJy4uL3NjcmlwdHMvaHViJykuZGVmYXVsdDtcbkg1UC5IdWJDbGllbnQucmVuZGVyRXJyb3JNZXNzYWdlID0gcmVxdWlyZSgnLi4vc2NyaXB0cy91dGlscy9lcnJvcnMnKS5kZWZhdWx0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudHJpZXMvZGlzdC5qcyIsImltcG9ydCB7RXZlbnRmdWx9IGZyb20gJy4uL21peGlucy9ldmVudGZ1bCc7XG5pbXBvcnQge3JlbGF5Q2xpY2tFdmVudEFzfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuXG4vKipcbiAqIEBjbGFzcyBDb250ZW50QnJvd3NlclZpZXdcbiAqIEBtaXhlcyBFdmVudGZ1bFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlVmlldyB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS50eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZS50aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUuY29udGVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0YXRlLmFjdGlvbl1cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzdGF0ZS5kaXNtaXNzYWJsZV1cbiAgICovXG4gIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgLy8gYWRkIGV2ZW50IHN5c3RlbVxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgRXZlbnRmdWwoKSk7XG5cbiAgICAvLyBjcmVhdGUgZWxlbWVudHNcbiAgICB0aGlzLnJvb3RFbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50KHN0YXRlKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQobWVzc2FnZSkge1xuICAgIC8vIENyZWF0ZSB3cmFwcGVyOlxuICAgIGNvbnN0IG1lc3NhZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVzc2FnZVdyYXBwZXIuY2xhc3NOYW1lID0gYG1lc3NhZ2UgJHttZXNzYWdlLnR5cGV9YCArIChtZXNzYWdlLmRpc21pc3NpYmxlID8gJyBkaXNtaXNzaWJsZScgOiAnJyk7XG5cbiAgICAvLyBBZGQgY2xvc2UgYnV0dG9uIGlmIGRpc21pc2FibGVcbiAgICBpZiAobWVzc2FnZS5kaXNtaXNzaWJsZSkge1xuICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9ICdjbG9zZSc7XG4gICAgICAvL2Nsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmI3gyNzE1JztcbiAgICAgIC8vIFRPRE9cbiAgICAgIC8vIC0gQWRkIGNsb3NlIGxhYmVsIGZyb20gdHJhbnNsYXRpb25zXG4gICAgICAvLyAtIEFkZCB2aXN1YWxzIGluIENTUyAoZm9udCBpY29uKVxuICAgICAgbWVzc2FnZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ2Nsb3NlJywgdGhpcywgY2xvc2VCdXR0b24pO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWVzc2FnZUNvbnRlbnQuY2xhc3NOYW1lID0gJ21lc3NhZ2UtY29udGVudCc7XG4gICAgbWVzc2FnZUNvbnRlbnQuaW5uZXJIVE1MID0gJzxoMT4nICsgbWVzc2FnZS50aXRsZSArICc8L2gxPicgKyAnPHA+JyArIG1lc3NhZ2UuY29udGVudCArICc8L3A+JztcbiAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQ29udGVudCk7XG5cbiAgICBpZiAobWVzc2FnZS5hY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgbWVzc2FnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgbWVzc2FnZUJ1dHRvbi5jbGFzc05hbWUgPSAnYnV0dG9uJztcbiAgICAgIG1lc3NhZ2VCdXR0b24uaW5uZXJIVE1MID0gbWVzc2FnZS5hY3Rpb247XG4gICAgICBtZXNzYWdlV3JhcHBlci5hcHBlbmRDaGlsZChtZXNzYWdlQnV0dG9uKTtcblxuICAgICAgcmVsYXlDbGlja0V2ZW50QXMoJ2FjdGlvbi1jbGlja2VkJywgdGhpcywgbWVzc2FnZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2VXcmFwcGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgY29udGVudCBicm93c2VyXG4gICAqXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290RWxlbWVudDtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvbWVzc2FnZS12aWV3L21lc3NhZ2Utdmlldy5qcyIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpXG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCdcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHsgYm9keTogdGhpcy5fYm9keUluaXQgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gICAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcbiAgICB2YXIgcHJlUHJvY2Vzc2VkSGVhZGVycyA9IHJhd0hlYWRlcnMucmVwbGFjZSgvXFxyP1xcbltcXHQgXSsvLCAnICcpXG4gICAgcHJlUHJvY2Vzc2VkSGVhZGVycy5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMvZmV0Y2guanMiXSwic291cmNlUm9vdCI6IiJ9