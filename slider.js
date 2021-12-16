"use strict";
class Slider {
    constructor(address, settings) {
        // Иницилизация слайденра
        this.slider = document.querySelector(address);
        this.settings = settings;
        // Сетинги по умолчанию, до их иницилизаии - по сути settings можно было передавать на прямую в конструктор, но захотел заморочится и сделать это через объект, как например в SlickSlider
        this.imgWidth = this.slider.clientWidth / 1;
        this.slidesToScroll = 0;
        this.slidesToShow = 1;
        this.scrollable = false;
        // this.odd = 0;
        this.width;
        // Начальные позиции 
        this.lastPosition;
        this.positionButtons = 0;
        this.curentPosition = 0;
        // Иницилизация элементов слайдера 
        this.items = this.slider.querySelector(".slider_items");
        this.img = this.slider.querySelectorAll(".slider_item");
        this.nav_point = this.slider.querySelector(".points");
        // Загрузка установленных Сетингов
        this.slider.addEventListener("onload", this._settingsReader(settings));
        // Иницилизация элементов навигации слайдера 
        this.nav_points = this.slider.querySelectorAll(".nav_points");
        this.navButtons = this.slider.querySelectorAll(".nav_buttons");
        // Ивенты кнопки -Почему тут пришлось биндить а выше ивент нет, не совсем понимаю контекст. 
        this.slider.addEventListener("onload", this._settingsInit());
        this.slider.addEventListener("click", this._clickerListener.bind(this));
        window.addEventListener("resize", () => this._settingsInit()); // не могу понять почему работает именно вот так '() =>' работает 
    }
    // Методы сетингов 
// git SOLID
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
        this._setPoints();
    }
    _setSlideToShow(settings) {
        if (settings > this.img.length && settings <= 0) // Проверка на дурака
            settings = 1;
        this.slidesToShow = settings;
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

    // Просчитываем и выставляем кол-во навигационных маркеров 
    _setPoints() {
        const ul = document.createElement('ul'),
            points = Math.ceil((this.img.length - this.slidesToShow) / this.slidesToScroll + 1);
        // this.odd = ((this.img.length - this.slidesToShow) / this.slidesToScroll + 1) - Math.floor((this.img.length - this.slidesToShow) / this.slidesToScroll + 1);
        // console.log(this.odd); - удалить
        for (let key = 0; key < points; key++) {
            key == 0 ? ul.insertAdjacentHTML("beforeend", `<li><button class='nav_points activeButton' type="button" data-target="` + key + `"></button></li>`) : ul.insertAdjacentHTML("beforeend", `<li><button class="nav_points" type="button" data-target="` + key + `"></button></li>`);
        }
        this.nav_point.append(ul);
    }

    // Методы Цсс стилей
    _addActive(position) {
        this.nav_points[position].classList.add('activeButton');
    }
    _removeActive(position) {
        this.nav_points[position].classList.remove('activeButton');
    }
    // Работа с навигацией 
    // Ивенты 
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
    _settingsInit() {
        console.log('resize')
        let width = document.querySelector('.slider_container').offsetWidth;
        this.imgWidth = width / this.slidesToShow; // в чем разница elem.offsetWidth и elem.clientWidth
        this.items.style.width = this.imgWidth * this.img.length + "px";
        this.img.forEach((item) => {
            item.style.width = `${this.imgWidth}px`;
            item.style.hight = "auto";
            console.log(item.style.width);
        })
        this._movePoints(this.positionButtons);
        if (this.scrollable === false)
            this._chkNavButtons();
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
        this.slider.querySelector('.right').disabled = this.positionButtons == this.nav_points.length-1;
    }

    // Движение нижние навигационные маркеры И ОСНОВНОЙ навигации - на базе этого метода можно заменить метод _move. 
    _movePoints(numbmer) {
        this._setPossition(numbmer);
        if (this.positionButtons == 0) {
            this.curentPosition = 0
        } else if (this.positionButtons == this.nav_points.length - 1) {
            this.curentPosition = ((this.img.length - this.slidesToShow) * this.imgWidth) * -1;
        } else {
            this.curentPosition = (numbmer * (this.slidesToScroll * this.imgWidth)) * -1
        }
        this.items.style.transform = `translateX(${this.curentPosition}px)`; // можно сократить в новый метод
    }

    // Движение основной навигации. - Можно значительлно сократить. ВЫКЛЮЧЕНО \||/

    _move(progress) {
        if (progress == undefined)
            progress = -1;
        const movePos = this.slidesToScroll * this.imgWidth,
            itemCount = this.img.length;
        if (progress == -1) {
            // next
            const ImgLeft = itemCount - (Math.abs(this.curentPosition) + this.slidesToShow * this.imgWidth) / this.imgWidth;
            this._setPossition(this.positionButtons - progress);
            if (this.scrollable == true && ImgLeft == 0) {
                this.curentPosition = 0;
            } else {
                this.curentPosition -= ImgLeft >= this.slidesToScroll ? movePos : ImgLeft * this.imgWidth; // можно сократить в новый метод
            }
        } else {
            // prev
            const ImgLeft = Math.abs(this.curentPosition) / this.imgWidth;
            this._setPossition(this.positionButtons - progress);
            if (this.scrollable == true && ImgLeft == 0) {
                this.curentPosition = -(itemCount - this.slidesToShow) * this.imgWidth;
            } else {
                this.curentPosition += ImgLeft >= this.slidesToScroll ? movePos : ImgLeft * this.imgWidth; // можно сократить в новый метод
            }
        }
        this.items.style.transform = `translateX(${this.curentPosition}px)`; // можно сократить в новый метод
    }
    // ВЫКЛЮЧЕНО /||\

    // Основная навигация 
    changeRightIMG() {
        this._removeActive(this.positionButtons);
        this._movePoints(this.positionButtons + 1)
        // this._move(-1); // ВЫКЛЮЧЕННО
        this._addActive(this.positionButtons);
    }
    changeLeftIMG() {
        this._removeActive(this.positionButtons);
        this._movePoints(this.positionButtons - 1)
        // this._move(+1); // ВЫКЛЮЧЕННО
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