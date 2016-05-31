class Nav{
	constructor(id) {
		this.id = id;
		this.el = document.getElementById(id);
		this.isActive = false;

		this.click.call(this);
	}

	highlight() {
		if(!this.isActive){
			this.el.classList.remove('navigation__nav');
			this.el.classList.add('navigation__nav--active');
			this.isActive = true;
		}
	}

	unhighlight() {
		if(this.isActive) {
			this.el.classList.remove('navigation__nav--active');
			this.el.classList.add('navigation__nav');
			this.isActive = false;	
		}
	}

	click() {
		this.el.addEventListener('click', function() {
			$('html, body').animate({
		    scrollTop: window.Inout.sections[this.id].startPos
		  }, 300);
		});
	}
	
}

export default Nav;
