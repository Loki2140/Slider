class Slider {

    constructor(address) {
        this.slider = document.querySelector(address);
        this.slideToShow = 1;
        this.SlidetoScrolle = 1;
        this.scrollable = true;
        this.position = 0;
        this.img = document.querySelector(address).querySelectorAll(".slider_item");
        this.nav_points = document.querySelector(address).querySelectorAll("button");
        this.navButtons = document.querySelector(address).querySelectorAll(".nav_buttons");
        this.event = this.slider.addEventListener("click", this._clickerListener.bind(this));
    }

    // __setSlideToShow(){
    //     item.forEach(element => {

    //     });
    //     this.img.css{

    //     }
    // }
    _addActive(position) {
        this.img[position].classList.add('activeItem');
        this.nav_points[position].classList.add('activeButton');
    }
    _removeActive(position) {
        this.img[position].classList.remove('activeItem');
        this.nav_points[position].classList.remove('activeButton');
    }
    // Стоит ли данный метод делать приватным? разобраться... 
    _clickerListener(event) {
        let target = event.target.dataset.target;
        if (target) {
            if (target.toLowerCase() === "right") {
                this.changeRightIMG();
            } else if (target.toLowerCase() === "left") {
                this.changeLeftIMG();
            } else if (!isNaN(target))
                this.changeByPoints(Number.parseInt(target));
        }
    }
    _setPossition(position) {
        if (position >= this.img.length)
            this.position = 0;
        else if (position < 0)
            this.position = this.img.length - 1;
        else
            this.position = position;
    }

    changeByPoints(numbmer) {
        this._removeActive(this.position);
        if (numbmer >= 0 && numbmer < this.img.length)
            this._setPossition(numbmer);
        this._addActive(this.position);
    }
    changeRightIMG() {
        this._removeActive(this.position);
        this._setPossition(this.position + 1);
        this._addActive(this.position);
    }
    changeLeftIMG() {
        this._removeActive(this.position);
        this._setPossition(this.position - 1);
        this._addActive(this.position);
    }

}