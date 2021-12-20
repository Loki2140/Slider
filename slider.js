"use strict";
class Slider {
    constructor(address, settings) {
        // Иницилизация слайденра
        this.slider = document.querySelector(address);
        this._settings = settings;
        // Сетинги по умолчанию, до их иницилизаии - по сути settings можно было передавать на прямую в конструктор, но захотел заморочится и сделать это через объект, как например в SlickSlider
        this._imgWidth = this.slider.clientWidth / 1;
        this._slidesToScroll = 0;
        this._slidesToShow = 1;
        this._scrollable = false;
        this._width;
        // Начальные позиции 
        this.positionButtons = 0;
        this.curentPosition = 0;
        // Иницилизация элементов слайдера 
        this.items = this.slider.querySelector(".slider_items");
        this.img = this.slider.querySelectorAll(".slider_item");
        this.nav_point = this.slider.querySelector(".points");
        // Иницилизация классов
        debugger;
        // this.logic = new SliderLogic;
        // this.init = new SliderInit;
        // Загрузка установленных Сетингов
        this._imglength = this.img.length;
        this.set = new SliderSettingSet;
        this.slider.addEventListener("onload", this.set._settingsReader(settings));

        // Иницилизация элементов навигации слайдера 
        this.nav_points = this.slider.querySelectorAll(".nav_points");
        this.navButtons = this.slider.querySelectorAll(".nav_buttons");
        // Ивенты кнопки -Почему тут пришлось биндить а выше ивент нет, не совсем понимаю контекст. 
        this.slider.addEventListener("onload", this._settingsInit());
        this.slider.addEventListener("click", this._clickerListener.bind(this));
        git // не могу понять почему работает именно вот так '() =>' работает 
    }
    // Ивенты 


}

//SOLID
class SliderSettingSet extends Slider {
    _settingsReader(settings) {
        for (const key in settings) {
            if (Object.hasOwnProperty.call(settings, key)) {
                this._set + settings + (settings[key])
            }
        }
    }
    _setSlideToShow(settings) {
        if (settings > this.imglength && settings <= 0) // Проверка на дурака
            settings = 1;
        this._slidesToShow = settings;
    }
    _setSlideToScrolle(settings) {
        if (settings > this.imglength) {
            settings = 1;
        } else if (settings === this.imglength) {
            this._slidesToScroll = 0;
        } else {
            this._slidesToScroll = settings;
        }
    }
    _setScrollable(settings) {
        if (settings == true)
            this._scrollable = true;
    }
}

class SliderInit extends Slider {
    _settingsInit() {
        let width = document.querySelector('.slider_container').offsetWidth;
        this._imgWidth = width / this.slidesToShow; // в чем разница elem.offsetWidth и elem.clientWidth
        this.items.style.width = this._imgWidth * this.img.length + "px";
        this.img.forEach((item) => {
            item.style.width = `${this._imgWidth}px`;
            item.style.hight = "auto";
            console.log(item.style.width);
        })
        this._movePoints(this.positionButtons);
        if (this.scrollable === false)
            this._chkNavButtons();
    }

    _setPoints() {
        const ul = document.createElement('ul'),
            points = Math.ceil((this.img.length - this.slidesToShow) / this.slidesToScroll + 1);
        for (let key = 0; key < points; key++) {
            key == 0 ? ul.insertAdjacentHTML("beforeend", `<li><button class='nav_points activeButton' type="button" data-target="` + key + `"></button></li>`) : ul.insertAdjacentHTML("beforeend", `<li><button class="nav_points" type="button" data-target="` + key + `"></button></li>`);
        }
        this.nav_point.append(ul);
    }
}

class SliderLogic extends Slider {
    // Методы Цсс стилей
    _addActive(position) {
        this.nav_points[position].classList.add('activeButton');
    }
    _removeActive(position) {
        this.nav_points[position].classList.remove('activeButton');
    }
    // Основной подсчет
    _setPossition(position) {
        if (this.scrollable == true) {
            if (position > this.nav_points.length - 1) {
                this.positionButtons = 0;
            } else if (position < 0)
                this.positionButtons = this.nav_points.length - 1;
            else {
                this.positionButtons = position;
            }
        } else {
            if (position >= this.nav_points.length - 1) {
                this.positionButtons = this.nav_points.length - 1;
            } else if (position < 0) {
                this.positionButtons = 0;
            } else {
                this.positionButtons = position;
            }
            this._chkNavButtons();
        }
    }
    // Проверка Кнопок Влево, Вправо
    _chkNavButtons() {
        this.slider.querySelector('.left').disabled = this.positionButtons == 0;
        this.slider.querySelector('.right').disabled = this.positionButtons == this.nav_points.length - 1;
    }

    // Движение нижние навигационные маркеры И ОСНОВНОЙ навигации - на базе этого метода можно заменить метод _move. 
    _movePoints(numbmer) {
        this._setPossition(numbmer);
        if (this.positionButtons == 0) {
            this.curentPosition = 0
        } else if (this.positionButtons == this.nav_points.length - 1) {
            this.curentPosition = ((this.img.length - this.slidesToShow) * this._imgWidth) * -1;
        } else {
            this.curentPosition = (numbmer * (this.slidesToScroll * this._imgWidth)) * -1
        }
        this.items.style.transform = `translateX(${this.curentPosition}px)`; // можно сократить в новый метод
    }

    // Основная навигация 
    changeRightIMG() {
        this._removeActive(this.positionButtons);
        this._movePoints(this.positionButtons + 1)
        this._addActive(this.positionButtons);
    }
    changeLeftIMG() {
        this._removeActive(this.positionButtons);
        this._movePoints(this.positionButtons - 1)
        this._addActive(this.positionButtons);
    }
    // Навигационные маркеры 
    changeByPoints(numbmer) {
        this._removeActive(this.positionButtons);
        if (numbmer >= 0 && numbmer <= this.nav_points.length) //Проверка на дурака 
            this._movePoints(numbmer, -1);
        this._addActive(this.positionButtons);
    }
}