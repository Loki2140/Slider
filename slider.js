"use strict";
class Slider {
    constructor(address, settings) {
        // по сути settings можно было передавать на прямую в конструктор, но захотел заморочится и сделать это через объект
        this.slider = document.querySelector(address);
        this.settings = settings;
        this.position = 0;
        this.iteamWidth = this.slider.clientWidth / 1;
        this.slidesScroll = 0;
        this.scrollable = false;
        this.items = this.slider.querySelector(".slider_items");
        this.img = this.slider.querySelectorAll(".slider_item");
        this.nav_points = this.slider.querySelectorAll("button");
        this.navButtons = this.slider.querySelectorAll(".nav_buttons");
        document.addEventListener('onload', this._settingsReader(settings));
        this.event = this.slider.addEventListener("click", this._clickerListener.bind(this)); // Почему тут пришлось биндить а выше нет, не совсем понимаю контекст. 
    }

    _setSlideToShow(settings) {
        if (settings > this.img.length || settings <= 0) // Проверка на дурака
            settings = 1;
        this.iteamWidth = this.slider.clientWidth / settings;
        this.img.forEach((item) => {
            item.style.minWidth = `${this.iteamWidth}px`
        });
    }
    _setSlideToScrolle(settings) {
        if (settings > this.img.length) {
            settings = 1;
        } else if (settings === this.img.length) {
            this.slidesScroll = 0;
        } else {
            this.slidesScroll = settings * this.iteamWidth;
        }
    }

    // наверное стоит сократить но так на мой взгляд понятней 
    _setScrollable(settings) {
        if (settings == true)
            this.scrollable = true;
    }


    _settingsReader(settings) {
        for (const key in settings) {
            if (Object.hasOwnProperty.call(settings, key)) {
                if (key == 'SlideToShow') {
                    this._setSlideToShow(settings[key]);
                } else if (key == 'SlidetoScrolle') {
                    this._setSlideToScrolle(settings[key]);
                } else if (key == 'Scrollable') {
                    this._setScrollable(settings[key]);
                }
            }
        }
    } //в теории можно сломать поменяв параметры местами, надо проверить 
    _addActive(position) {
        this.img[position].classList.add('activeItem');
        this.nav_points[position].classList.add('activeButton');
    }
    _removeActive(position) {
        this.img[position].classList.remove('activeItem');
        this.nav_points[position].classList.remove('activeButton');
    }

    _clickerListener(event) {
        let target = event.target.dataset.target;
        if (target) {
            if (target.toLowerCase() === "right") {
                this.changeRightIMG();
            } else if (target.toLowerCase() === "left") {
                this.changeLeftIMG();
            } else if (!isNaN(target))
                this.changeByPoints(Number.parseInt(target)); // на всякий случай
        }
    }
    _setPossition(position) {
        if (this.scrollable == true)
            if (position >= this.img.length)
                this.position = 0;
            else if (position < 0)
            this.position = this.img.length - 1;
        else
            this.position = position;
        _move(position);
    }
    _move(position) {
        const b = this.item.length - (Math.abs(position*-this.slidesScroll)+this.slidesScroll) / this.iteamWidth;
        
        this.items.style.transform = `translateX(${position*-this.slidesScroll}px)`;
    }
    _chkNavButtons(){

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