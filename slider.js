"use strict";
class Slider {
    constructor(address, settings) {
        // по сути settings можно было передавать на прямую в конструктор, 
        // но захотел заморочится и сделать это через объект, как например в SlickSlider
        this.slider = document.querySelector(address);
        this.settings = settings;
        this.position = 0;
        this.imgWidth = this.slider.clientWidth / 1;
        this.slidesToScroll = 0;
        this.slidesToShow = 1;
        this.scrollable = false;
        this.items = this.slider.querySelector(".slider_items");
        this.img = this.slider.querySelectorAll(".slider_item");
        this.nav_points = this.slider.querySelectorAll("button");
        this.navButtons = this.slider.querySelectorAll(".nav_buttons");
        document.addEventListener('onload', this._settingsReader(settings));
        this.event = this.slider.addEventListener("click", this._clickerListener.bind(this)); // Почему тут пришлось биндить а выше нет, не совсем понимаю контекст. 
    }


    _setSlideToShow(settings) {
        if (settings > this.img.length && settings <= 0) // Проверка на дурака
            settings = 1;
        this.slidesToShow = settings;
        this.imgWidth = this.slider.clientWidth / settings;
        this.img.forEach((item) => {
            item.style.minWidth = `${this.imgWidth}px`
        });
    }
    _setSlideToScrolle(settings) {
        if (settings > this.img.length) {
            settings = 1;
        } else if (settings === this.img.length) {
            this.slidesToScroll = 0;
        } else {
            this.slidesToScroll = settings;
        }
    }

    _setScrollable(settings) {
        if (settings == true)
            this.scrollable = true;
    }

    // _setPoints() {
    //     debugger;
    //     const create = this.nav_points.createElement('ul');

    //     // create.innerHTML = this.img.forEach((item) => {
    //             // '<li class="nav_points"><button class="activeButton" type="button" data-target="' + item + '" ></button></li>'
    //         // }
    //         // this.nav_points.appendChild(create);
    //     }



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
        // this._setPoints();
    } //в теории можно сломать поменяв параметры местами, надо проверить 

    _addActive(position) {
        debugger;
        console.log(this.position);
        this.img[position].classList.add('activeItem');
        this.nav_points[position].classList.add('activeButton');
    }

    _removeActive(position) {
        console.log(this.position);
        debugger;
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
        debugger;
        if (this.scrollable == true) {
            if (position >= this.img.length) {
                this.position = 0;
            } else if (position < 0)
                this.position = this.img.length - 1;
            else
                this.position = position;
        } else {
            if (position >= this.img.length) {
                this.position = this.img.length - 1;
            } else if (position < 0) {
                this.position = 0
            } else {
                this.position = position;
            }
        }
        console.log(this.position);
    }

    _chkNavButtons() {

    }
    _move(position) {
        const imgLeft = this.img.length - position;
        if (imgLeft >= this.slidesToScroll) {
            this.items.style.transform = `translateX(${-position*this.imgWidth}px)`;
        } else {
            this.items.style.transform = `translateX(${-(position-(this.slidesToScroll-imgLeft))*this.imgWidth}px)`;
            this.position = position + imgLeft;
        }
        console.log(this.position);
    }

    changeByPoints(numbmer) {
        this._removeActive(this.position);
        if (numbmer >= 0 && numbmer <= this.img.length) //Проверка на дурака 
            this._setPossition(numbmer);
        this._move(numbmer-1);
        this._addActive(numbmer-1);
    }
    changeRightIMG() {
        // this._removeActive(this.position);
        this._setPossition(this.position + this.slidesToScroll);
        this._move(this.position);
        // this._addActive(this.position);
    }
    changeLeftIMG() {
        // this._removeActive(this.position);
        this._setPossition(this.position - this.slidesToScroll);
        this._move(this.position);
        // this._addActive(this.position);
    }
}


//     debugger;
// const imgLeft = this.img.length - (this.position * this.imgWidth + this.slidesToScroll * this.imgWidth) / this.imgWidth;
// console.log(`осталось ${imgLeft}`);
// this.positionPX -= imgLeft * this.imgWidth >= this.slidesToScroll ? this.slidesToScroll * this.imgWidth : imgLeft * this.imgWidth;
// this.items.style.transform = `translateX(${this.positionPX}px)`;
// const positionPX = imgLeft >= this.slidesToScroll ? this.slidesToScroll * this.imgWidth : imgLeft * this.imgWidth
// positionPX=(this.position-(this.slidesToScroll-imgLeft))*this.imgWidth;
// this.items.style.transform = `translateX(${-this.position*this.imgWidth+positionPX}px)`;