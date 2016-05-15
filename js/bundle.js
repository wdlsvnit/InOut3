/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Section = __webpack_require__(1);

	var _Section2 = _interopRequireDefault(_Section);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var navigationBar = __webpack_require__(2);

	// All The sections
	var sections = {
		home: new _Section2.default('home'),
		about: new _Section2.default('about'),
		faq: new _Section2.default('faq'),
		schedule: new _Section2.default('schedule'),
		sponsors: new _Section2.default('sponsors')
	};

	var navigationBarHeight = 90;
	var navigationBarInitialPos = sections.home.height() - navigationBarHeight;

	navigationBar.positionAtIntialPos(navigationBarInitialPos);
	initSectionStartPositions();

	// Functions
	function initSectionStartPositions() {
		sections.home.startPos = 0;
		sections.about.startPos = sections.home.height() - navigationBarHeight;
		sections.faq.startPos = sections.about.startPos + sections.about.height();
		sections.schedule.startPos = sections.faq.startPos + sections.faq.height();
		sections.sponsors.startPos = sections.schedule.startPos + sections.schedule.height();
	}

	function highlightNavBlock() {

		if (inSection('home')) {
			navigationBar.highlightNav('home');
			navigationBar.changeColor('#6C9DE1');
		}

		if (inSection('about')) {
			navigationBar.highlightNav('about');
			navigationBar.changeColor('#6C9DE1');
		}

		if (inSection('faq')) {
			navigationBar.highlightNav('faq');
			navigationBar.changeColor('#CBA496');
		}

		if (inSection('schedule')) {
			navigationBar.highlightNav('schedule');
			navigationBar.changeColor('#5E729C');
		}

		if (inSection('sponsors')) {
			navigationBar.highlightNav('sponsors');
			navigationBar.changeColor('#6C9DE1');
		}
	}

	function inSection(section) {
		var scrollPos = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
		var lowerLimit = sections[section].startPos;
		var upperLimit = lowerLimit + sections[section].height() - navigationBarHeight;

		return scrollPos >= lowerLimit && scrollPos < upperLimit;
	}

	// Event Listeners

	window.addEventListener('resize', function () {
		navigationBarInitialPos = sections.home.height() - navigationBarHeight;
		navigationBar.positionAtIntialPos(navigationBarInitialPos);
		initSectionStartPositions();
	});

	window.addEventListener('scroll', function () {

		if (navigationBar.shouldStick()) {
			navigationBar.sitckToTop();
		} else if (navigationBar.shouldNotStick()) {
			navigationBar.unstick();
		}

		highlightNavBlock();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Section = function () {
		function Section(identifer) {
			_classCallCheck(this, Section);

			this.id = identifer;
			this.el = document.querySelector('.section--' + identifer);
			this.startPos = 0;
		}

		_createClass(Section, [{
			key: 'height',
			value: function height() {
				return this.el.getBoundingClientRect().height;
			}
		}]);

		return Section;
	}();

	exports.default = Section;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Nav = __webpack_require__(3);

	var _Nav2 = _interopRequireDefault(_Nav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Navigation Bar
	module.exports = {

		el: document.querySelector('.navigation'),
		stuckAtTop: false,
		navigationBarInitialPos: 0,

		navs: {
			home: new _Nav2.default('home'),
			about: new _Nav2.default('about'),
			faq: new _Nav2.default('faq'),
			schedule: new _Nav2.default('schedule'),
			sponsors: new _Nav2.default('sponsors')
		},

		// Navigation Bar functions

		positionAtIntialPos: function positionAtIntialPos() {
			var initialPos = arguments.length <= 0 || arguments[0] === undefined ? this.navigationBarInitialPos : arguments[0];

			this.el.style.top = initialPos + 'px';
			this.navigationBarInitialPos = initialPos;
			this.navs.home.highlight();
		},

		shouldStick: function shouldStick() {
			var scrollPos = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
			return scrollPos >= this.navigationBarInitialPos;
		},

		shouldNotStick: function shouldNotStick() {
			var scrollPos = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
			return scrollPos < this.navigationBarInitialPos;
		},

		sitckToTop: function sitckToTop() {
			if (!this.stuckAtTop) {
				this.el.style.position = 'fixed';
				this.el.style.top = '0px';
				this.stuckAtTop = true;
			}
		},
		unstick: function unstick() {
			if (this.stuckAtTop) {
				this.el.style.position = 'absolute';
				this.positionAtIntialPos();
				this.stuckAtTop = false;
			}
		},


		highlightNav: function highlightNav(identifier) {
			for (var nav in this.navs) {
				if (nav === identifier) this.navs[nav].highlight();else this.navs[nav].unhighlight();
			}
		},

		changeColor: function changeColor(color) {
			this.el.style.backgroundColor = color;
		}

	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Nav = function () {
		function Nav(id) {
			_classCallCheck(this, Nav);

			this.id = id;
			this.el = document.getElementById(id);
			this.isActive = false;

			this.click.call(this);
		}

		_createClass(Nav, [{
			key: 'highlight',
			value: function highlight() {
				if (!this.isActive) {
					this.el.classList.remove('navigation__nav');
					this.el.classList.add('navigation__nav--active');
					this.isActive = true;
				}
			}
		}, {
			key: 'unhighlight',
			value: function unhighlight() {
				if (this.isActive) {
					this.el.classList.remove('navigation__nav--active');
					this.el.classList.add('navigation__nav');
					this.isActive = false;
				}
			}
		}, {
			key: 'click',
			value: function click() {
				this.el.addEventListener('click', function () {
					$('html, body').animate({
						scrollTop: sections[this.id].startPos
					}, 300);
				});
			}
		}]);

		return Nav;
	}();

	exports.default = Nav;

/***/ }
/******/ ]);