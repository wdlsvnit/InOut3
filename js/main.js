'use strict';

import Section from './Section';
let navigationBar = require('./NavigationBar');

// To allow other modules to access variables 
window.Inout = {};

// All The sections
var sections = {
	home: new Section('home'),
	about: new Section('about'),
	faq: new Section('faq'),
	schedule: new Section('schedule'),
	sponsors: new Section('sponsors')
};

window.Inout.sections = sections;


let navigationBarHeight = 90;
let navigationBarInitialPos = sections.home.height() - navigationBarHeight;

navigationBar.positionAtIntialPos(navigationBarInitialPos);
initSectionStartPositions();

// Functions 
function initSectionStartPositions() {
	sections.home.startPos = 0;
	sections.about.startPos = sections.home.height() - navigationBarHeight;
	sections.faq.startPos = sections.about.startPos + sections.about.height();
	sections.schedule.startPos = sections.faq.startPos + sections.faq.height() 
	sections.sponsors.startPos = sections.schedule.startPos + sections.schedule.height(); 
}

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
	var upperLimit = lowerLimit + sections[section].height();

	return scrollPos >= lowerLimit && scrollPos < upperLimit;
}


// Event Listeners 

window.addEventListener('resize', function() {
	navigationBarInitialPos = sections.home.height() - navigationBarHeight;
	navigationBar.positionAtIntialPos(navigationBarInitialPos);
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

