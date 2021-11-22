class Slider {

    constructor(address) {
        this.slideToShow = 1;
        this.SlidetoScrolle = 1;
        this.position = 0;
        this.img = document.querySelector(address).querySelectorAll(".slider_item");
        debugger;
        this.nav_points = document.querySelector(address).querySelectorAll(".nav_points").querySelectorAll(buttons);
        this.navButtons = document.querySelector(address).querySelectorAll(".nav_buttons");
        this.slider = document.querySelector(address);
        this.event = this.slider.addEventListener("click", this.__clickerListener.bind(this));
    }
    // __setSlideToShow(){
    //     item.forEach(element => {

    //     });
    //     this.img.css{

    //     }
    // }

    __setPossition(position) {
        if (position >= this.img.length)
            this.position = 0;
        else if (position < 0)
            this.position = this.img.length - 1;
        else
            this.position = position;
    }

    changeByPoints(numbmer) {
        this.__removeActive(this.position);
        if (numbmer >= 0 && numbmer < this.img.length)
            this.__setPossition(numbmer);
        this.__addActive(this.position);
    }
    changeRightIMG() {
        this.__removeActive(this.position);
        this.__setPossition(this.position + 1);
        this.__addActive(this.position);
    }
    changeLeftIMG() {
        this.__removeActive(this.position);
        this.__setPossition(this.position - 1);
        this.__addActive(this.position);
    }
    __addActive(position) {
        this.img[position].classList.add('activeItem');
        this.nav_points[position].classList.add('activeButton');
    }
    __removeActive(position) {
        this.img[position].classList.remove('activeItem');
        this.nav_points[position].classList.remove('activeButton');
    }
    // Стоит ли данный метод делать приватным? разобраться... 
    __clickerListener(event) {
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
}