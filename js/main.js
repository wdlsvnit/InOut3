	(function() {



	// Native
	// NOTE: Known bug, will return 'auto' if style value is 'auto'
	var mqColors = {
		xsPlus: "rgb(255, 0, 0)",
		sPlus: "rgb(0, 255, 0)",
		mPlus: "rgb(0, 0, 255)",
		lPlus: "rgb(178, 248, 155)",
		sTom: "rgb(241, 151, 38)",
		mTol: "rgb(255, 250, 42)",
		lToxl: "rgb(136, 38, 153)",
		xsTos: "rgb(228, 54, 157)"
	};

	var mqIdentifiers = {
		xsPlus: "XS+",
		sPlus: "S+",
		mPlus: "M+",
		lPlus: "L+",
		sTom: "S - M",
		mTol: "M - L",
		lToxl: "L - XL",
		xsTos: "XS - S"
	};



	var widthLabel = document.getElementById('windowWidthLabel');

	var appliedMQLabel = document.getElementById('appliedMQ');

	var currentColor = cssColor(widthLabel);
	var width= window.outerWidth;

	window.addEventListener('resize', onResize);

	widthLabel.innerHTML =  width + "px";
	appliedMQLabel.innerHTML = appliedMediaQueryIdentifier(currentColor);

	function onResize(e) {
		// Get the color of the h1 label that shows the current width	
	  currentColor = cssColor(widthLabel);
	  appliedMQLabel.innerHTML = appliedMediaQueryIdentifier(currentColor);
		width = e.target.outerWidth;
		widthLabel.innerHTML = width + "px";
	}

	function appliedMediaQueryIdentifier(color) {
	  for( var key in mqColors) {
	    if( color === mqColors[key]) {
	      return mqIdentifiers[key];
	    } 
	  }
	}

	function cssColor(el) {
	  // null means not return pseudo styles
	  return el.ownerDocument.defaultView.getComputedStyle(el, null).color;
	}


})();