class Section {
	constructor(identifer,navColor) {
		this.id = identifer;	
		this.el = document.querySelector('.section--' + identifer);
		this.startPos = 0;
		this.navColor = navColor;
	}

	height() {
		return this.el.getBoundingClientRect().height;
	}
}

export default Section;
