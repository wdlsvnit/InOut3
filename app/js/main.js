'use strict';

import Section from './Section';
let navigationBar = require('./NavigationBar');

// To allow other modules to access variables 
window.Inout = {};

// All The sections
var sections = {
	home: new Section('home', '#6C9DE1'),
	about: new Section('about', '#6C9DE1'),
	faq: new Section('faq', '#5E729C'),
	schedule: new Section('schedule', '#34495e'),
	sponsors: new Section('sponsors', '#6C9DE1')
};

window.Inout.sections = sections;

let navigationBarHeight = 90;
let navigationBarInitialPos = sections.home.height() - navigationBarHeight;
const MOBILE_THRESHOLD = 580;


$(window).load(function() {
	initSectionStartPositions();
	navigationBar.init(navigationBarInitialPos);
	navigationBar.positionAt(navigationBarInitialPos);

	var scrollPos = (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop);

	if( scrollPos > 0 ) {
		if( inSection('home') ) {
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

window.addEventListener('resize', function() {
	initSectionStartPositions();

	if (!navigationBar.stuckAtTop) {
		navigationBarInitialPos = sections.home.height() - navigationBarHeight;
		navigationBar.initialPos = navigationBarInitialPos;
		navigationBar.positionAt(navigationBarInitialPos);
	} 

	swtichNavigationModeIfNeeded();
	highlightNavBlock();

});

window.addEventListener('scroll', function() {

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
	sections.schedule.startPos = sections.faq.startPos + sections.faq.height()
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
	var scrollPos = (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop);
	var lowerLimit = sections[section].startPos;
	var upperLimit = lowerLimit + sections[section].height();

	return scrollPos >= lowerLimit && scrollPos < upperLimit;
}

function swtichNavigationModeIfNeeded() {
	if( window.document.documentElement.clientWidth < MOBILE_THRESHOLD ) {
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
      xhttp.onreadystatechange = function() {
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
                  }

                  else
                  {
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
                  }

                  else
                  {
                    $('.error_name').remove();

                  }

              }
          }
      };
      xhttp.open("POST", "/new/", true);
      xhttp.setRequestHeader("X-CSRFToken", csrftoken);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      xhttp.send(params);
  }




// For the accordion 
$('.collapse.in').prev('.panel-heading').addClass('active');
$('#accordion, #bs-collapse')
	.on('show.bs.collapse', function(a) {
		$(a.target).prev('.panel-heading').addClass('active');
		initSectionStartPositions();
	})
	.on('hide.bs.collapse', function(a) {
		$(a.target).prev('.panel-heading').removeClass('active');
		initSectionStartPositions();
	});


