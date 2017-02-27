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
	
	var _uploadSection = __webpack_require__(16);
	
	var _uploadSection2 = _interopRequireDefault(_uploadSection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @typedef {object} HubState
	 * @property {string} title
	 * @property {string} sectionId
	 * @property {boolean} expanded
	 */
	/**
	 * @class
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
	      sectionId: 'create-content'
	    });
	
	    // tab panel
	    this.view.addTab({
	      title: 'Create Content',
	      id: 'create-content',
	      content: this.contentBrowser.getElement(),
	      selected: true
	    });
	
	    this.view.addTab({
	      title: 'Upload',
	      id: 'upload-section',
	      content: this.uploadSection.getElement()
	    });
	
	    this.view.initTabPanel();
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
	      this.titleElement.setAttribute('aria-controls', "panel-body-" + sectionId);
	      this.titleElement.innerHTML = title || '';
	
	      /**
	       * @type {HTMLElement}
	       */
	      this.bodyElement = document.createElement('div');
	      this.bodyElement.className += "panel-body";
	      this.bodyElement.setAttribute('aria-hidden', (!expanded).toString());
	      this.bodyElement.id = "panel-body-" + sectionId;
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
	      tab.setAttribute('role', 'tab');
	      tab.innerHTML = title;
	
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
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _contentBrowserView = __webpack_require__(8);
	
	var _contentBrowserView2 = _interopRequireDefault(_contentBrowserView);
	
	var _search = __webpack_require__(10);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _contentTypeList = __webpack_require__(12);
	
	var _contentTypeList2 = _interopRequireDefault(_contentTypeList);
	
	var _contentTypeDetail = __webpack_require__(14);
	
	var _contentTypeDetail2 = _interopRequireDefault(_contentTypeDetail);
	
	var _eventful = __webpack_require__(9);
	
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
	 * @mixes Eventful
	 */
	var ContentBrowser = function () {
	  function ContentBrowser(state) {
	    var _this = this;
	
	    _classCallCheck(this, ContentBrowser);
	
	    // add event system
	    _extends(this, (0, _eventful.Eventful)());
	
	    // add view
	    this.view = new _contentBrowserView2.default(state);
	
	    // controller
	    this.searchService = new _search2.default();
	    this.contentTypeList = new _contentTypeList2.default();
	    this.contentTypeDetail = new _contentTypeDetail2.default();
	
	    // set sub view (TODO find other way)
	    this.view.getElement().appendChild(this.contentTypeList.getElement());
	    this.view.getElement().appendChild(this.contentTypeDetail.getElement());
	
	    // registers listeners
	    this.contentTypeList.on('row-selected', function (_ref) {
	      var id = _ref.id;
	
	      _this.contentTypeList.hide();
	      _this.contentTypeDetail.loadById(id);
	      _this.contentTypeDetail.show();
	    });
	
	    this.contentTypeDetail.on('close', function (event) {
	      _this.contentTypeDetail.hide();
	      _this.contentTypeList.show();
	    });
	
	    this.view.onInputFieldKeyDown(function (text) {
	      this.searchService.search(text).then(this.contentTypeList.update.bind(this.contentTypeList));
	    }, this);
	
	    // initialize by search
	    this.searchService.search("").then(function (contentTypes) {
	      return _this.contentTypeList.update(contentTypes);
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
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventful = __webpack_require__(9);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ContentBrowserView = function () {
	  function ContentBrowserView(state) {
	    _classCallCheck(this, ContentBrowserView);
	
	    this.state = state;
	
	    // add event system
	    _extends(this, (0, _eventful.Eventful)());
	
	    this.rootElement = document.createElement('div');
	    this.rootElement.appendChild(this.renderMenuGroup());
	  }
	
	  /**
	   * Adds a listener to the input field, and registers a callback with it
	   *
	   * @param {function} callback
	   * @param {object} [scope]
	   */
	
	
	  _createClass(ContentBrowserView, [{
	    key: 'onInputFieldKeyDown',
	    value: function onInputFieldKeyDown(callback, scope) {
	      var _this = this;
	
	      this.inputFieldElement.addEventListener('keyup', function (event) {
	        callback.call(scope || _this, event.target.value, _this.inputFieldElement);
	      });
	    }
	  }, {
	    key: 'renderMenuItem',
	    value: function renderMenuItem(title, index) {
	      var tab = document.createElement('li');
	      tab.setAttribute('tabindex', '0');
	      tab.innerHTML = title;
	
	      //TODO remove after demo
	      if (index === 0) {
	        tab.setAttribute('aria-selected', 'true');
	      }
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
	      this.inputFieldElement = inputField;
	      return inputField;
	    }
	  }, {
	    key: 'renderInputButton',
	    value: function renderInputButton(title) {
	      var inputButton = document.createElement('div');
	      inputButton.className = 'input-button icon-search';
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

	'use strict';
	
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
	    },
	
	    /**
	     * Fire event. If any of the listeners returns false, return false
	     *
	     * @param {string} type
	     * @param {object} event
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _functional = __webpack_require__(5);
	
	var _hubServices = __webpack_require__(11);
	
	var _hubServices2 = _interopRequireDefault(_hubServices);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Checks if a needle is found in the haystack.
	 * Not case sensitive
	 *
	 * @param {string} needle
	 * @param {string} haystack
	 * @return {boolean}
	 */
	var hasSubString = function hasSubString(needle, haystack) {
	  return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	};
	
	/**
	 * Filters a list of content types based on a query
	 * @type {Function}
	 *
	 * @param {string} query
	 * @param {ContentType[]} contentTypes
	 */
	var filterByQuery = (0, _functional.curry)(function (query, contentTypes) {
	  return contentTypes.filter(function (contentType) {
	    return hasSubString(query, contentType.title) || hasSubString(query, contentType.shortDescription);
	  });
	});
	
	/**
	 * @class
	 */
	
	var SearchService = function () {
	  function SearchService() {
	    _classCallCheck(this, SearchService);
	
	    this.services = new _hubServices2.default({
	      rootUrl: '/test/mock/api'
	    });
	
	    this.contentTypes = this.services.contentTypes();
	  }
	
	  /**
	   * Performs a search
	   *
	   * @param {String} query
	   *
	   * @return {Promise<ContentType[]>}
	   */
	
	
	  _createClass(SearchService, [{
	    key: "search",
	    value: function search(query) {
	      return this.contentTypes.then(filterByQuery(query));
	    }
	  }]);
	
	  return SearchService;
	}();
	
	exports.default = SearchService;

/***/ },
/* 11 */
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
	
	    /**
	     * Returns a Content Type
	     *
	     * @param {string} id
	     *
	     * @return {Promise.<ContentType>}
	     */
	
	  }, {
	    key: "contentType",
	    value: function contentType(id) {
	      return fetch(this.rootUrl + "/contenttypes/" + id).then(function (result) {
	        return result.json();
	      });
	    }
	  }]);
	
	  return HubServices;
	}();
	
	exports.default = HubServices;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _contentTypeListView = __webpack_require__(13);
	
	var _contentTypeListView2 = _interopRequireDefault(_contentTypeListView);
	
	var _eventful = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class
	 * @mixes Eventful
	 */
	var ContentTypeList = function () {
	  function ContentTypeList(state) {
	    _classCallCheck(this, ContentTypeList);
	
	    // add event system
	    _extends(this, (0, _eventful.Eventful)());
	
	    // add the view
	    this.view = new _contentTypeListView2.default(state);
	    this.propagate(['row-selected'], this.view);
	  }
	
	  _createClass(ContentTypeList, [{
	    key: 'hide',
	    value: function hide() {
	      this.view.hide();
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this.view.show();
	    }
	
	    /**
	     *
	     * @param {ContentType[]} contentTypes
	     */
	
	  }, {
	    key: 'update',
	    value: function update(contentTypes) {
	      this.view.updateList(contentTypes);
	    }
	  }, {
	    key: 'getElement',
	    value: function getElement() {
	      return this.view.getElement();
	    }
	  }]);
	
	  return ContentTypeList;
	}();
	
	exports.default = ContentTypeList;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _functional = __webpack_require__(5);
	
	var _elements = __webpack_require__(4);
	
	var _eventful = __webpack_require__(9);
	
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
	    });
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
	      if (this.listElement) {
	        this.rootElement.childNodes.forEach(function (node) {
	          return node.remove();
	        });
	      }
	
	      this.renderContentTypeList(contentTypes).forEach(this.rootElement.appendChild.bind(this.rootElement));
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
	      return contentTypes.map(this.renderContentTypeRow).map(relayClickEventAs('row-selected', this));
	    }
	
	    /**
	     * Takes a Content Type configuration and creates a row dom
	     *
	     * @param {ContentType} contentType
	     *
	     * @return {HTMLElement}
	     */
	
	  }, {
	    key: "renderContentTypeRow",
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
	      row.id = "content-type-" + contentType.id;
	      row.setAttribute(ATTRIBUTE_CONTENT_TYPE_ID, contentType.id);
	      row.appendChild(image);
	      row.appendChild(button);
	      row.appendChild(title);
	      row.appendChild(description);
	
	      return row;
	    }
	  }, {
	    key: "getElement",
	    value: function getElement() {
	      return this.rootElement;
	    }
	  }]);
	
	  return ContentTypeListView;
	}();
	
	exports.default = ContentTypeListView;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _contentTypeDetailView = __webpack_require__(15);
	
	var _contentTypeDetailView2 = _interopRequireDefault(_contentTypeDetailView);
	
	var _hubServices = __webpack_require__(11);
	
	var _hubServices2 = _interopRequireDefault(_hubServices);
	
	var _eventful = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ContentTypeDetail = function () {
	  function ContentTypeDetail(state) {
	    _classCallCheck(this, ContentTypeDetail);
	
	    // add event system
	    _extends(this, (0, _eventful.Eventful)());
	
	    this.view = new _contentTypeDetailView2.default(state);
	    this.services = new _hubServices2.default({
	      rootUrl: '/test/mock/api'
	    });
	
	    this.propagate(['close'], this.view);
	  }
	
	  _createClass(ContentTypeDetail, [{
	    key: "hide",
	    value: function hide() {
	      this.view.hide();
	    }
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
	     * Updates the view with the content type data
	     *
	     * @param {ContentType} contentType
	     */
	
	  }, {
	    key: "update",
	    value: function update(contentType) {
	      this.view.title(contentType.title).longDescription(contentType.longDescription).image(contentType.icon);
	    }
	  }, {
	    key: "getElement",
	    value: function getElement() {
	      return this.view.getElement();
	    }
	  }]);
	
	  return ContentTypeDetail;
	}();
	
	exports.default = ContentTypeDetail;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _elements = __webpack_require__(4);
	
	var _functional = __webpack_require__(5);
	
	var _eventful = __webpack_require__(9);
	
	var _panel = __webpack_require__(3);
	
	var _panel2 = _interopRequireDefault(_panel);
	
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
	      element: element
	    });
	  });
	
	  return element;
	});
	
	var ContentTypeDetailView = function () {
	  function ContentTypeDetailView(state) {
	    _classCallCheck(this, ContentTypeDetailView);
	
	    // add event system
	    _extends(this, (0, _eventful.Eventful)());
	
	    // image
	    this.imageElement = document.createElement('img');
	    this.imageElement.className = 'img-responsive';
	
	    // title
	    this.titleElement = document.createElement('h2');
	    this.titleElement.className = 'content-type-detail';
	    this.titleElement.innerHTML = 'title';
	
	    // back button
	    var backButtonElement = document.createElement('div');
	    backButtonElement.className = 'back-button';
	    backButtonElement.innerHTML = '<-';
	    relayClickEventAs('close', this, backButtonElement);
	
	    // detail
	    this.longDescriptioneElement = document.createElement('div');
	    this.longDescriptioneElement.className = 'content-type-detail';
	    this.longDescriptioneElement.innerHTML = 'description';
	
	    // demo button
	    var demoButton = document.createElement('span');
	    demoButton.className = 'button';
	    demoButton.innerHTML = 'Content Demo';
	    relayClickEventAs('select', this, demoButton);
	
	    // use button
	    var useButton = document.createElement('span');
	    useButton.className = 'button';
	    useButton.innerHTML = 'Use';
	    relayClickEventAs('select', this, useButton);
	
	    // install button
	    var installButton = document.createElement('span');
	    installButton.className = 'button button-inverse';
	    installButton.innerHTML = 'Install';
	    relayClickEventAs('install', this, installButton);
	
	    // use button
	    this.useButton = document.createElement('span');
	    this.useButton.className = 'button';
	    this.useButton.innerHTML = 'Use';
	
	    // licence panel
	    var licencePanel = this.createPanel('The Licence Info', 'ipsum lorum', 'licence-panel');
	
	    // panel group
	    var panelGroupElement = document.createElement('div');
	    panelGroupElement.className = 'panel-group';
	    panelGroupElement.appendChild(licencePanel);
	
	    // add root element
	    this.rootElement = document.createElement('div');
	    this.rootElement.className = 'content-type-detail';
	    this.rootElement.setAttribute('aria-hidden', 'true');
	    this.rootElement.appendChild(backButtonElement);
	    this.rootElement.appendChild(this.imageElement);
	    this.rootElement.appendChild(this.titleElement);
	    this.rootElement.appendChild(this.longDescriptioneElement);
	    this.rootElement.appendChild(demoButton);
	    this.rootElement.appendChild(useButton);
	    this.rootElement.appendChild(installButton);
	    this.rootElement.appendChild(panelGroupElement);
	  }
	
	  /*
	  *   <div class="panel-group">
	   <div class="panel">
	   <div class="panel-header" aria-expanded="true" aria-controls="panel-body-1">Title</div>
	   <div id="panel-body-1" class="panel-body" aria-hidden="false">
	   <div class="panel-body-inner">
	   <p>Lorem ipsum dolor sit amet, case solum pri ex, sed te feugiat legimus. Sea doming alterum necessitatibus id, ipsum putent disputando ei pri. Docendi electram ei cum, usu ea meis tractatos dignissim. An eos putent tamquam postulant, falli periculis nam et. Ne mel hinc scaevola probatus.</p>
	   <p>Lorem ipsum dolor sit amet, case solum pri ex, sed te feugiat legimus. Sea doming alterum necessitatibus id, ipsum putent disputando ei pri. Docendi electram ei cum, usu ea meis tractatos dignissim. An eos putent tamquam postulant, falli periculis nam et. Ne mel hinc scaevola probatus.</p>
	   <p>Lorem ipsum dolor sit amet, case solum pri ex, sed te feugiat legimus. Sea doming alterum necessitatibus id, ipsum putent disputando ei pri. Docendi electram ei cum, usu ea meis tractatos dignissim. An eos putent tamquam postulant, falli periculis nam et. Ne mel hinc scaevola probatus.</p>
	   </div>
	   </div>
	   </div>
	  * */
	
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
	     * @return {ContentTypeDetailView}
	     */
	
	  }, {
	    key: "image",
	    value: function image(src) {
	      this.imageElement.setAttribute('src', src);
	      return this;
	    }
	
	    /**
	     * Sets the title
	     *
	     * @param {string} title
	     * @return {ContentTypeDetailView}
	     */
	
	  }, {
	    key: "title",
	    value: function title(_title) {
	      this.titleElement.innerHTML = _title;
	      return this;
	    }
	
	    /**
	     * Sets the long description
	     *
	     * @param {string} text
	     * @return {ContentTypeDetailView}
	     */
	
	  }, {
	    key: "longDescription",
	    value: function longDescription(text) {
	      this.longDescriptioneElement.innerHTML = text;
	      return this;
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
	  }, {
	    key: "getElement",
	    value: function getElement() {
	      return this.rootElement;
	    }
	  }]);
	
	  return ContentTypeDetailView;
	}();
	
	exports.default = ContentTypeDetailView;

/***/ },
/* 16 */
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