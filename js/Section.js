class Section {
	constructor(identifer) {
		this.id = identifer;	
		this.el = document.querySelector('.section--' + identifer);
		this.startPos = 0;
	}

	height() {
		return this.el.getBoundingClientRect().height;
	}
}

export default Section;
