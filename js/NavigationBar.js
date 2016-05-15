import Nav from './Nav';

// Navigation Bar 
module.exports = {

	el: document.querySelector('.navigation'),
	stuckAtTop: false,
	navigationBarInitialPos: 0,

	navs: {
		home: new Nav('home'), 
		about: new Nav('about'), 
		faq: new Nav('faq'), 
		schedule: new Nav('schedule'), 
		sponsors: new Nav('sponsors')
	},

	// Navigation Bar functions 

	positionAtIntialPos: function(initialPos = this.navigationBarInitialPos) {
		this.el.style.top = initialPos + 'px';
		this.navigationBarInitialPos = initialPos;
		this.navs.home.highlight();
	},

	shouldStick: function() {
		var scrollPos = (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop);
		return(scrollPos >= this.navigationBarInitialPos);
	},

	shouldNotStick: function() {
		var scrollPos = (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop);
		return(scrollPos < this.navigationBarInitialPos);
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
			this.positionAtIntialPos();
			this.stuckAtTop = false;	
		}
	},

	highlightNav: function(identifier) {
		for (var nav in this.navs){
			if (nav === identifier)
				this.navs[nav].highlight();
			else
				this.navs[nav].unhighlight();
		}
	},

	changeColor: function(color) {
		this.el.style.backgroundColor = color;
	}

};