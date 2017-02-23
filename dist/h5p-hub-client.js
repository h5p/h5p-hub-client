// [AIV] Build version: 1.0.0 
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Load library
	H5P = H5P || {};
	H5P.HubClient = __webpack_require__(1).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _hubView = __webpack_require__(2);
	
	var _hubView2 = _interopRequireDefault(_hubView);
	
	var _contentBrowser = __webpack_require__(7);
	
	var _contentBrowser2 = _interopRequireDefault(_contentBrowser);
	
	var _uploadSection = __webpack_require__(10);
	
	var _uploadSection2 = _interopRequireDefault(_uploadSection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @typedef {object} HubState
	 * @property {string} title
	 * @property {string} sectionId
	 * @property {boolean} expanded
	 */
	
	var Hub = function () {
	  /**
	   * @param {HubState} state
	   */
	  function Hub(state) {
	    _classCallCheck(this, Hub);
	
	    this.state = state;
	
	    // controllers
	    this.contentBrowser = new _contentBrowser2.default();
	    this.uploadSection = new _uploadSection2.default();
	
	    // views
	    this.view = new _hubView2.default({
	      title: 'Title',
	      sectionId: 'create-content'
	    });
	
	    this.view.addTab('Create Content', this.contentBrowser.getElement());
	    this.view.addTab('Upload', this.uploadSection.getElement());
	  }
	
	  /**
	   * Returns the root element in the view
	   *
	   * @return {HTMLElement}
	   */
	
	
	  _createClass(Hub, [{
	    key: 'getElement',
	    value: function getElement() {
	      return this.view.getElement();
	    }
	  }]);
	
	  return Hub;
	}();
	
	exports.default = Hub;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _panel = __webpack_require__(3);
	
	var _panel2 = _interopRequireDefault(_panel);
	
	var _tabPanel = __webpack_require__(6);
	
	var _tabPanel2 = _interopRequireDefault(_tabPanel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HubView = function () {
	  /**
	   * @param {HubState} state
	   */
	  function HubView(state) {
	    _classCallCheck(this, HubView);
	
	    this.renderTabPanel(state);
	    this.renderPanel(state);
	  }
	
	  /**
	   * Creates the dom for the tab panel
	   */
	
	
	  _createClass(HubView, [{
	    key: "renderTabPanel",
	    value: function renderTabPanel() {
	
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
	      this.tabContainerElement.className += 'tabcontainer';
	      this.tabContainerElement.appendChild(this.tabListWrapper);
	
	      (0, _tabPanel2.default)(this.tabContainerElement);
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
	      var title = _ref.title,
	          sectionId = _ref.sectionId,
	          _ref$expanded = _ref.expanded,
	          expanded = _ref$expanded === undefined ? false : _ref$expanded;
	
	      /**
	       * @type {HTMLElement}
	       */
	      this.titleElement = document.createElement('div');
	      this.titleElement.className += "panel-header icon-hub-icon";
	      this.titleElement.setAttribute('aria-expanded', expanded.toString());
	      this.titleElement.setAttribute('aria-controls', 'panel-body-1');
	      this.titleElement.innerHTML = title;
	
	      /**
	       * @type {HTMLElement}
	       */
	      this.bodyElement = document.createElement('div');
	      this.bodyElement.className += "panel-body";
	      this.bodyElement.setAttribute('aria-hidden', (!expanded).toString());
	      this.bodyElement.id = 'panel-body-1';
	      this.bodyElement.appendChild(this.tabContainerElement);
	      if (!expanded) {
	        this.bodyElement.style.height = "0";
	      }
	
	      /**
	       * @type {HTMLElement}
	       */
	      this.rootElement = document.createElement('div');
	      this.rootElement.className += "h5p-hub h5p-section-" + sectionId + " panel";
	      this.rootElement.appendChild(this.titleElement);
	      this.rootElement.appendChild(this.bodyElement);
	
	      (0, _panel2.default)(this.rootElement);
	    }
	
	    /**
	     * Adds a tab
	     *
	     * @param {string} title
	     * @param {HTMLElement} content
	     */
	
	  }, {
	    key: "addTab",
	    value: function addTab(title, content) {
	      var tab = document.createElement('li');
	      tab.className += 'tab';
	      tab.id = 'tab1';
	      tab.setAttribute('aria-controls', 'panel1');
	      tab.setAttribute('aria-selected', 'true');
	      tab.setAttribute('role', 'tab');
	      tab.setAttribute('tabindex', '0');
	      tab.innerHTML = title;
	
	      var tabpanel = document.createElement('div');
	      tabpanel.id = 'panel1';
	      tabpanel.className += 'tabpanel';
	      tabpanel.setAttribute('aria-lablledby', 'tab1');
	      tabpanel.setAttribute('role', 'tabpanel');
	      tabpanel.setAttribute('tabindex', '0');
	      tabpanel.appendChild(content);
	
	      this.tablist.appendChild(tab);
	      this.tabContainerElement.appendChild(tabpanel);
	    }
	
	    /**
	     * Sets the section
	     *
	     * @param {string} sectionId
	     */
	
	  }, {
	    key: "setSection",
	    value: function setSection(sectionId) {
	      this.rootElement.className = "h5p-hub h5p-section-" + sectionId + " panel";
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = init;
	
	var _elements = __webpack_require__(4);
	
	var _functional = __webpack_require__(5);
	
	/**
	 * @const
	 * @type {string}
	 */
	var ATTRIBUTE_ARIA_EXPANDED = "aria-expanded";
	
	/**
	 * @type {function}
	 */
	var selectExpandable = (0, _elements.querySelector)('[aria-expanded]');
	
	/**
	 * @type {function}
	 */
	var getAriaControls = (0, _elements.getAttribute)('aria-controls');
	
	/**
	 * @type {function}
	 */
	var isExpanded = (0, _elements.attributeEquals)(ATTRIBUTE_ARIA_EXPANDED, 'true');
	
	/**
	 * @type {function}
	 */
	var setAriaHiddenTrue = (0, _elements.setAttribute)('aria-hidden', 'true');
	
	/**
	 * @type {function}
	 */
	var setAriaHiddenFalse = (0, _elements.setAttribute)('aria-hidden', 'false');
	
	/**
	 * @type {Function}
	 */
	var toggleBodyVisibility = (0, _functional.curry)(function (bodyElement, mutation) {
	  var titleEl = mutation.target;
	
	  if (isExpanded(titleEl)) {
	    setAriaHiddenFalse(bodyElement);
	    bodyElement.style.height = bodyElement.scrollHeight + 'px';
	  } else {
	    setAriaHiddenTrue(bodyElement);
	    bodyElement.style.height = "0";
	  }
	});
	
	/**
	 * Initializes a panel
	 *
	 * @param {HTMLElement} element
	 * @return {HTMLElement}
	 */
	function init(element) {
	  var titleEl = selectExpandable(element);
	  var bodyId = getAriaControls(titleEl);
	  var bodyEl = element.querySelector('#' + bodyId);
	
	  if (titleEl) {
	    // set observer on title for aria-expanded
	    var observer = new MutationObserver((0, _functional.forEach)(toggleBodyVisibility(bodyEl)));
	
	    observer.observe(titleEl, {
	      attributes: true,
	      attributeOldValue: true,
	      attributeFilter: [ATTRIBUTE_ARIA_EXPANDED]
	    });
	
	    // Set click listener that toggles aria-expanded
	    titleEl.addEventListener('click', function (event) {
	      (0, _elements.toggleAttribute)(ATTRIBUTE_ARIA_EXPANDED, event.target);
	    });
	  }
	
	  return element;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.querySelectorAll = exports.querySelector = exports.appendChild = exports.toggleAttribute = exports.attributeEquals = exports.hasAttribute = exports.removeAttribute = exports.setAttribute = exports.getAttribute = undefined;
	
	var _functional = __webpack_require__(5);
	
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = init;
	
	var _elements = __webpack_require__(4);
	
	var _functional = __webpack_require__(5);
	
	/**
	 * @type {function}
	 */
	var getWhereRoleIsTab = (0, _elements.querySelectorAll)('[role="tab"]');
	
	/**
	 * @type {function}
	 */
	var getWhereRoleIsTabpanel = (0, _elements.querySelectorAll)('[role="tabpanel"]');
	
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
	var setAriaSelectedFalse = (0, _elements.setAttribute)('aria-selected', 'false');
	
	/**
	 * @type {function}
	 */
	var setAllAriaSelectedFalse = (0, _functional.forEach)(setAriaSelectedFalse);
	
	function init(element) {
	  var tabs = getWhereRoleIsTab(element);
	  var tabPanels = getWhereRoleIsTabpanel(element);
	
	  tabs.forEach(function (tab) {
	    tab.addEventListener('click', function (event) {
	
	      setAllAriaSelectedFalse(tabs);
	      event.target.setAttribute('aria-selected', 'true');
	
	      hideAll(tabPanels);
	      var tabPanelId = event.target.getAttribute('aria-controls');
	      var targetTabPanel = element.querySelector('#' + tabPanelId);
	      show(element.querySelector('#' + tabPanelId));
	    });
	  });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _contentBrowserView = __webpack_require__(8);
	
	var _contentBrowserView2 = _interopRequireDefault(_contentBrowserView);
	
	var _hubServices = __webpack_require__(9);
	
	var _hubServices2 = _interopRequireDefault(_hubServices);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @typedef {object} ContentType
	 * @property {string} id
	 * @property {string} title
	 * @property {string} shortDescription
	 * @property {string} longDescription
	 * @property {string} icon
	 * @property {string} created
	 * @property {string} update
	 * @property {boolean} recommended
	 * @property {number} timesDownloaded
	 * @property {string[]} screenshots
	 * @property {string} exampleContent
	 * @property {string[]} keywords
	 * @property {string[]} categories
	 * @property {string} license
	 */
	
	/**
	 * @class
	 */
	var ContentBrowser = function () {
	  function ContentBrowser(state) {
	    var _this = this;
	
	    _classCallCheck(this, ContentBrowser);
	
	    this.view = new _contentBrowserView2.default(state);
	    this.services = new _hubServices2.default({
	      rootUrl: '/test/mock/api'
	    });
	
	    // get content types
	    this.services.contentTypes().then(function (contentTypes) {
	      return _this.view.updateList(contentTypes);
	    });
	  }
	
	  _createClass(ContentBrowser, [{
	    key: "getElement",
	    value: function getElement() {
	      return this.view.getElement();
	    }
	  }]);
	
	  return ContentBrowser;
	}();
	
	exports.default = ContentBrowser;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tabPanel = __webpack_require__(6);
	
	var _tabPanel2 = _interopRequireDefault(_tabPanel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ContentBrowserView = function () {
	  function ContentBrowserView(state) {
	    _classCallCheck(this, ContentBrowserView);
	
	    this.state = state;
	
	    this.rootElement = document.createElement('div');
	    this.rootElement.appendChild(this.renderMenuGroup());
	  }
	
	  _createClass(ContentBrowserView, [{
	    key: 'renderMenuItem',
	    value: function renderMenuItem(title) {
	      var tab = document.createElement('li');
	      tab.setAttribute('tabindex', '0');
	      tab.innerHTML = title;
	      return tab;
	    }
	  }, {
	    key: 'renderMenu',
	    value: function renderMenu(state) {
	
	      /**
	       * @type {HTMLElement}
	       */
	      var menuItemList = document.createElement('ul');
	      var menuItems = ['My Content Types', 'Newest', 'Most Popular', 'Reccomended'];
	      menuItems.map(this.renderMenuItem).forEach(menuItemList.appendChild.bind(menuItemList));
	
	      /**
	       * @type {HTMLElement}
	       */
	      var menuItemListWrapper = document.createElement('nav');
	      menuItemListWrapper.appendChild(menuItemList);
	
	      /**
	       * @type {HTMLElement}
	       */
	      var menuTitle = document.createElement('div');
	      menuTitle.className = "menu-title";
	      menuTitle.innerHTML = "Browse content types";
	
	      /**
	       * @type {HTMLElement}
	       */
	      var menu = document.createElement('div');
	      menu.className = "menu";
	      menu.appendChild(menuTitle);
	      menu.appendChild(menuItemListWrapper);
	
	      return menu;
	    }
	  }, {
	    key: 'renderMenuGroup',
	    value: function renderMenuGroup() {
	      var menuGroup = document.createElement('div');
	      menuGroup.className = 'menu-group';
	      var menu = this.renderMenu();
	      var inputGroup = this.renderInputGroup();
	      menuGroup.appendChild(menu);
	      menuGroup.appendChild(inputGroup);
	      return menuGroup;
	    }
	  }, {
	    key: 'renderInputField',
	    value: function renderInputField() {
	      var inputField = document.createElement('input');
	      inputField.className = 'hub-search shadow';
	      inputField.setAttribute('type', 'text');
	      inputField.setAttribute('placeholder', "Search for Content Types");
	      return inputField;
	    }
	  }, {
	    key: 'renderInputButton',
	    value: function renderInputButton(title) {
	      var inputButton = document.createElement('div');
	      inputButton.className = 'input-button';
	      inputButton.innerHTML = "Search";
	      return inputButton;
	    }
	  }, {
	    key: 'renderInputGroup',
	    value: function renderInputGroup(buttonTitle) {
	      var inputGroup = document.createElement('div');
	      inputGroup.className = 'input-group rounded shadow';
	      inputGroup.appendChild(this.renderInputField());
	      inputGroup.appendChild(this.renderInputButton(buttonTitle));
	
	      var inputGroupWrapper = document.createElement('div');
	      inputGroupWrapper.className = 'input-group-wrapper rounded';
	      inputGroupWrapper.appendChild(inputGroup);
	
	      return inputGroupWrapper;
	    }
	
	    /**
	     *
	     * @param {ContentType[]} contentTypes
	     */
	
	  }, {
	    key: 'updateList',
	    value: function updateList(contentTypes) {
	      if (this.listElement) {
	        this.listElement.remove();
	      }
	
	      this.listElement = this.renderContentTypeList(contentTypes);
	      this.rootElement.appendChild(this.listElement);
	    }
	
	    /**
	     *
	     * @param {ContentType[]} contentTypes
	     */
	
	  }, {
	    key: 'renderContentTypeList',
	    value: function renderContentTypeList(contentTypes) {
	      var listElement = document.createElement('ul');
	      listElement.className = 'content-type-list';
	
	      contentTypes.map(this.renderContentTypeRow).forEach(listElement.appendChild.bind(listElement));
	
	      return listElement;
	    }
	
	    /**
	     * Takes a Content Type configuration and creates a row dom
	     *
	     * @param {ContentType} contentType
	     *
	     * @return {HTMLElement}
	     */
	
	  }, {
	    key: 'renderContentTypeRow',
	    value: function renderContentTypeRow(contentType) {
	      // image
	      var image = document.createElement('img');
	      image.setAttribute('src', contentType.icon);
	
	      // button
	      var button = document.createElement('span');
	      button.className = "button";
	      button.innerHTML = "Use";
	
	      // title
	      var title = document.createElement('div');
	      title.className = 'content-type-list-title';
	      title.innerHTML = contentType.title;
	
	      // description
	      var description = document.createElement('div');
	      description.className = 'content-type-list-description';
	      description.innerHTML = contentType.shortDescription;
	
	      // list item
	      var row = document.createElement('li');
	      row.id = 'content-type-' + contentType.id;
	      row.setAttribute('data-id', contentType.id);
	      row.appendChild(image);
	      row.appendChild(button);
	      row.appendChild(title);
	      row.appendChild(description);
	
	      return row;
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

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HubServices = function () {
	  /**
	   * @param {string} rootUrl
	   */
	  function HubServices(_ref) {
	    var rootUrl = _ref.rootUrl;
	
	    _classCallCheck(this, HubServices);
	
	    this.rootUrl = rootUrl;
	  }
	
	  /**
	   * Returns a list of content types
	   *
	   * @return {Promise.<ContentType[]>}
	   */
	
	
	  _createClass(HubServices, [{
	    key: "contentTypes",
	    value: function contentTypes() {
	      return fetch(this.rootUrl + "/contenttypes").then(function (result) {
	        return result.json();
	      });
	    }
	  }]);
	
	  return HubServices;
	}();
	
	exports.default = HubServices;

/***/ },
/* 10 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);
//# sourceMappingURL=h5p-hub-client.js.map 