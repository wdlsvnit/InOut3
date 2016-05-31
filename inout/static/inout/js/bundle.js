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

	// To allow other modules to access variables
	window.Inout = {};

	// All The sections
	var sections = {
		home: new _Section2.default('home', '#6C9DE1'),
		about: new _Section2.default('about', '#6C9DE1'),
		faq: new _Section2.default('faq', '#5E729C'),
		schedule: new _Section2.default('schedule', '#34495e'),
		sponsors: new _Section2.default('sponsors', '#6C9DE1')
	};

	window.Inout.sections = sections;

	var navigationBarHeight = 90;
	var navigationBarInitialPos = sections.home.height() - navigationBarHeight;
	var MOBILE_THRESHOLD = 580;

	$(window).load(function () {
		initSectionStartPositions();
		navigationBar.init(navigationBarInitialPos);
		navigationBar.positionAt(navigationBarInitialPos);

		var scrollPos = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;

		if (scrollPos > 0) {
			if (inSection('home')) {
				navigationBar.positionAt(navigationBarInitialPos - scrollPos);
				// Ductape fixing FTW!
				navigationBar.navs['sponsors'].unhighlight();
			} else {
				navigationBar.positionAt(0);
				highlightNavBlock();
			}
		}

		// If loaded in mobile

		swtichNavigationModeIfNeeded();
	});

	window.addEventListener('resize', function () {
		initSectionStartPositions();

		if (!navigationBar.stuckAtTop) {
			navigationBarInitialPos = sections.home.height() - navigationBarHeight;
			navigationBar.initialPos = navigationBarInitialPos;
			navigationBar.positionAt(navigationBarInitialPos);
		}

		swtichNavigationModeIfNeeded();
		highlightNavBlock();
	});

	window.addEventListener('scroll', function () {

		if (navigationBar.shouldStick()) {
			navigationBar.sitckToTop();
		} else if (navigationBar.shouldNotStick()) {
			navigationBar.unstick();
		}
		highlightNavBlock();
	});

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
			navigationBar.changeColor(sections.home.navColor);
		}

		if (inSection('about')) {
			navigationBar.highlightNav('about');
			navigationBar.changeColor(sections.about.navColor);
		}

		if (inSection('faq')) {
			navigationBar.highlightNav('faq');
			navigationBar.changeColor(sections.faq.navColor);
		}

		if (inSection('schedule')) {
			navigationBar.highlightNav('schedule');
			navigationBar.changeColor(sections.schedule.navColor);
		}

		if (inSection('sponsors')) {
			navigationBar.highlightNav('sponsors');
			navigationBar.changeColor(sections.sponsors.navColor);
		}
	}

	function inSection(section) {
		var scrollPos = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
		var lowerLimit = sections[section].startPos;
		var upperLimit = lowerLimit + sections[section].height();

		return scrollPos >= lowerLimit && scrollPos < upperLimit;
	}

	function swtichNavigationModeIfNeeded() {
		if (window.document.documentElement.clientWidth < MOBILE_THRESHOLD) {
			navigationBar.switchToMobileMode();
		} else {
			navigationBar.switchToDesktopMode();
		}
	}

	// For Apply now modal
	function submitForm() {
		var xhttp = new XMLHttpRequest();
		var form = document.forms[0];
		var csrftoken = form.elements[0].value;
		var params = "name=" + form.elements[1].value + "&email=" + form.elements[2].value;
		console.log(params);
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4 && xhttp.status == 200) {

				data = JSON.parse(xhttp.responseText);

				if (data["success"] == 1) {
					window.location = "/new/" + data["team_id"];
				} else {

					console.log(data);
					if (data.hasOwnProperty('email')) {
						$("<div class='error_email'></div>").appendTo("#div_id_email");
						if ($(".error_email").length > 0) {
							$('.error_email').remove();
							$("<div class='error_email'></div>").appendTo("#div_id_email");
							$(".error_email").append('<p id="error_id_email" class="section__content--text">This email is taken</p>');
						} else {
							$(".error_email").html('<p id="error_id_email" class="section__content--text">This email is taken</p>');
						}
					} else {
						$('.error_email').remove();
					}

					if (data.hasOwnProperty('name')) {

						$("<div class='error_name'></div>").appendTo("#div_id_name");

						if ($(".error_name").length > 0) {
							$('.error_name').remove();
							$("<div class='error_name'></div>").appendTo("#div_id_name");
							$(".error_name").append('<p id="error_id_name" class="section__content--text">This Team name is taken</p>');
						} else {
							$(".error_name").html('<p id="error_id_name" class="section__content--text">This Team name is taken</p>');
						}
					} else {
						$('.error_name').remove();
					}
				}
			}
		};
		xhttp.open("POST", "/new/", true);
		xhttp.setRequestHeader("X-CSRFToken", csrftoken);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(params);
	}

	// For the accordion
	$('.collapse.in').prev('.panel-heading').addClass('active');
	$('#accordion, #bs-collapse').on('show.bs.collapse', function (a) {
		$(a.target).prev('.panel-heading').addClass('active');
		initSectionStartPositions();
	}).on('hide.bs.collapse', function (a) {
		$(a.target).prev('.panel-heading').removeClass('active');
		initSectionStartPositions();
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
		function Section(identifer, navColor) {
			_classCallCheck(this, Section);

			this.id = identifer;
			this.el = document.querySelector('.section--' + identifer);
			this.startPos = 0;
			this.navColor = navColor;
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

	var mode = {
		mobile: 0,
		desktop: 1
	};

	// Navigation Bar
	module.exports = {

		el: document.querySelector('.navigation'),
		stuckAtTop: false,
		initialPos: 0,
		mode: mode.desktop,

		navs: {
			home: new _Nav2.default('home'),
			about: new _Nav2.default('about'),
			faq: new _Nav2.default('faq'),
			schedule: new _Nav2.default('schedule'),
			sponsors: new _Nav2.default('sponsors')
		},

		// Contents of the navigation bar when in desktop mode
		navContentsDesktop: {
			home: '<span class="navigation__nav__link">HOME</span>',
			about: '<span class="navigation__nav__link">ABOUT</span>',
			faq: '<span class="navigation__nav__link">FAQ</span>',
			schedule: '<span class="navigation__nav__link">SCHEDULE</span>',
			sponsors: '<span class="navigation__nav__link">SPONSORS</span>'
		},

		//Contents of the navigation bar when in mobile mode
		navContentsMobile: {
			home: '<i class="fa fa-home fa-2x navigation__nav--mobile_icon"></i>',
			about: '<i class="fa fa-info fa-2x navigation__nav--mobile_icon"></i>',
			faq: '<i class="fa fa-question fa-2x navigation__nav--mobile_icon"></i>',
			schedule: '<i class="fa fa-clock-o fa-2x navigation__nav--mobile_icon"></i>',
			sponsors: '<i class="fa fa-star fa-2x navigation__nav--mobile_icon"></i>'
		},

		// Navigation Bar functions

		init: function init(initialPos) {
			this.initialPos = initialPos;
			this.navs.home.highlight();
		},
		positionAt: function positionAt(position) {
			this.el.style.top = position + 'px';
		},
		shouldStick: function shouldStick() {
			var scrollPos = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
			return scrollPos >= this.initialPos;
		},
		shouldNotStick: function shouldNotStick() {
			var scrollPos = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
			return scrollPos < this.initialPos;
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
				this.positionAt(this.initialPos);
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
		},
		switchToMobileMode: function switchToMobileMode() {
			if (this.mode === mode.desktop) {
				for (var nav in this.navs) {
					this.navs[nav].el.innerHTML = this.navContentsMobile[nav];
				}

				this.mode = mode.mobile;
			}

			if (this.mode === mode.mobile) {
				// Let us try to calculate the size so that it is evently spread across all the navs
				var navBarWidth = this.el.getBoundingClientRect().width;
				var navWidth = navBarWidth / (Object.keys(this.navs).length + 1);
				// Change the width of all the  navs
				for (var nav in this.navs) {
					this.navs[nav].el.style.width = navWidth + 'px';
				}
			}
		},
		switchToDesktopMode: function switchToDesktopMode() {
			if (this.mode === mode.mobile) {
				// only switch to desktop when in mobile mode

				for (var nav in this.navs) {
					this.navs[nav].el.innerHTML = this.navContentsDesktop[nav];
				}

				this.mode = mode.desktop;
			}

			if (this.mode === mode.desktop) {
				for (var nav in this.navs) {
					if (this.navs[nav].el.hasAttribute('style')) {
						this.navs[nav].el.removeAttribute('style');
					}
				}
			}
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
						scrollTop: window.Inout.sections[this.id].startPos
					}, 300);
				});
			}
		}]);

		return Nav;
	}();

	exports.default = Nav;

/***/ }
/******/ ]);