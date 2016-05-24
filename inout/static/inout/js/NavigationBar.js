import Nav from './Nav';

let mode = {
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
		home: new Nav('home'), 
		about: new Nav('about'), 
		faq: new Nav('faq'), 
		schedule: new Nav('schedule'), 
		sponsors: new Nav('sponsors')
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

	init(initialPos) {
		this.initialPos = initialPos;
		this.navs.home.highlight();
	},

	positionAt(position) {
		this.el.style.top =  position + 'px';
	},

	shouldStick() {
		var scrollPos = (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop);
		return(scrollPos >= this.initialPos);
	},

	shouldNotStick() {
		var scrollPos = (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop);
		return(scrollPos < this.initialPos);
	},

	sitckToTop() {
		if( !this.stuckAtTop ) {
			this.el.style.position = 'fixed';
			this.el.style.top = '0px';
			this.stuckAtTop = true;
		}	
	},

	unstick() {
		if( this.stuckAtTop ) {
			this.el.style.position = 'absolute';
			this.positionAt(this.initialPos);
			this.stuckAtTop = false;	
		}
	},

	highlightNav(identifier) {
		for (var nav in this.navs){
			if (nav === identifier)
				this.navs[nav].highlight();
			else
				this.navs[nav].unhighlight();
		}
	},

	changeColor(color) {
		this.el.style.backgroundColor = color;
	},

	switchToMobileMode() {
		if( this.mode === mode.desktop ) {
			for( var nav in this.navs ) {
				this.navs[nav].el.innerHTML= this.navContentsMobile[nav];
			}

			this.mode = mode.mobile;
		}

		if ( this.mode === mode.mobile ) {
			// Let us try to calculate the size so that it is evently spread across all the navs 
			let navBarWidth = this.el.getBoundingClientRect().width;
			let navWidth = navBarWidth/(Object.keys(this.navs).length + 1);
			// Change the width of all the  navs 
			for( var nav in this.navs ) {
				this.navs[nav].el.style.width = navWidth + 'px';
			}
		}
	},

	switchToDesktopMode() {
		if( this.mode === mode.mobile ) { // only switch to desktop when in mobile mode 

			for( var nav in this.navs ) {
				this.navs[nav].el.innerHTML = this.navContentsDesktop[nav];
			}

			this.mode = mode.desktop;
		}

		if ( this.mode === mode.desktop ) {
			for( var nav in this.navs ) {
				if( this.navs[nav].el.hasAttribute('style') ) {
					this.navs[nav].el.removeAttribute('style');
				}
			}
		}

	}

};