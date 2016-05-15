// Page Section object 

function Section(identifer) {
	this.id = identifer;
	this.el = document.querySelector('.section--' + identifer);
	this.startPos = 0;
}

Section.prototype = {

	height: function() {
		return this.el.getBoundingClientRect().height;
	}

};

// All The sections
var sections = {
	home: new Section('home'),
	about: new Section('about'),
	faq: new Section('faq'),
	schedule: new Section('schedule'),
	sponsors: new Section('sponsors')
};


var navigationBarHeight = 90,
	navigationBarInitialPos = sections.home.height() - navigationBarHeight;

initSectionStartPositions();

function initSectionStartPositions() {
	sections.home.startPos = 0;
	sections.about.startPos = sections.home.height() - navigationBarHeight;
	sections.faq.startPos = sections.about.startPos + sections.about.height();
	sections.schedule.startPos = sections.faq.startPos + sections.faq.height() 
	sections.sponsors.startPos = sections.schedule.startPos + sections.schedule.height(); 
}

// Navigation block Object 
function Nav(id) {
	this.id = id;
	this.el = document.getElementById(id);
	this.isActive = false;

	this.events.click.call(this);
}

Nav.prototype = {
	highlight: function() {
		if(!this.isActive){
			this.el.classList.remove('navigation__nav');
			this.el.classList.add('navigation__nav--active');
			this.isActive = true;
		}
	},

	unhighlight: function() {
		if(this.isActive) {
			this.el.classList.remove('navigation__nav--active');
			this.el.classList.add('navigation__nav');
			this.isActive = false;	
		}
	},

	events: {
		click: function() {
			this.el.addEventListener('click', function() {
				$('html, body').animate({
			    scrollTop: sections[this.id].startPos
			  }, 300);
			});
		}
	}
}

// Navigation Bar 
var navigationBar = {

	el: document.querySelector('.navigation'),
	stuckAtTop: false,

	navs: {
		home: new Nav('home'), 
		about: new Nav('about'), 
		faq: new Nav('faq'), 
		schedule: new Nav('schedule'), 
		sponsors: new Nav('sponsors')
	},

	// Navigation Bar functions 

	positionAtIntialPos: function() {
		this.el.style.top = navigationBarInitialPos + 'px';
		this.navs.home.highlight();
	},

	shouldStick: function() {
		var scrollPos = (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop);
		return(scrollPos >= navigationBarInitialPos);
	},

	shouldNotStick: function() {
		var scrollPos = (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop);
		return(scrollPos < navigationBarInitialPos);
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

function highlightNavBlock() {

	if( inSection('home')) {
		navigationBar.highlightNav('home');
		navigationBar.changeColor('#6C9DE1');
	}

	if ( inSection('about') ) {
		navigationBar.highlightNav('about');
		navigationBar.changeColor('#6C9DE1');
	} 

	if( inSection('faq') ) {
		navigationBar.highlightNav('faq');
		navigationBar.changeColor('#CBA496');
	}

	if( inSection('schedule') ) {
		navigationBar.highlightNav('schedule');
		navigationBar.changeColor('#5E729C');
	}

	if( inSection('sponsors') ) {
		navigationBar.highlightNav('sponsors');
		navigationBar.changeColor('#6C9DE1');
	}


}

function inSection(section) {
	var scrollPos = (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop);
	var lowerLimit = sections[section].startPos;
	var upperLimit = lowerLimit + sections[section].height() - navigationBarHeight;

	return scrollPos >= lowerLimit && scrollPos < upperLimit;
}



navigationBar.positionAtIntialPos();

// Event Listeners 

window.addEventListener('resize', function() {
	navigationBarInitialPos = sections.home.height() - navigationBarHeight;
	navigationBar.positionAtIntialPos();
	initSectionStartPositions();
});

window.addEventListener('scroll', function() {

	if( navigationBar.shouldStick() ) {
		navigationBar.sitckToTop();
	} else if ( navigationBar.shouldNotStick() ) {
		navigationBar.unstick();
	}

	highlightNavBlock();

});

