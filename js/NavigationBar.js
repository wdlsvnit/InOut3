import Nav from './Nav';

// Navigation Bar 
module.exports = {

	el: document.querySelector('.navigation'),
	stuckAtTop: false,
	initialPos: 0,

	navs: {
		home: new Nav('home'), 
		about: new Nav('about'), 
		faq: new Nav('faq'), 
		schedule: new Nav('schedule'), 
		sponsors: new Nav('sponsors')
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
		this.el.style.visiblity = 'hidden';
	}

};