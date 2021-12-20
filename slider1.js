class SliderLogic {
    constructor(address) {
        // Иницилизация слайденра
        this.slider = document.querySelector(address);
        // Начальные позиции 
        this._positionButtons = 0;
        this._curentPosition = 0;
        this._imgWidth = this.slider.clientWidth / 1;
        this._slidesToScroll = 1;
        this._slidesToShow = 1;
        this._scrollable = false;
        this.items = this.slider.querySelector(".slider_items");
        this.img = this.slider.querySelectorAll(".slider_item");
        this.nav_points;
        this.navButtons = this.slider.querySelectorAll(".nav_buttons");


    }
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
                this._positionButtons = 0;
            } else if (position < 0)
                this._positionButtons = this.nav_points.length - 1;
            else {
                this._positionButtons = position;
            }
        } else {
            console.log(this.nav_points);
            if (position >= this.nav_points.length - 1) {
                this._positionButtons = this.nav_points.length - 1;
            } else if (position < 0) {
                this._positionButtons = 0;
            } else {
                this._positionButtons = position;
            }
            this._chkNavButtons();
        }
    }
    // Проверка Кнопок Влево, Вправо
    _chkNavButtons() {
        this.slider.querySelector('.left').disabled = this._positionButtons == 0;
        this.slider.querySelector('.right').disabled = this._positionButtons == this.nav_points.length - 1;
    }

    // Движение нижние навигационные маркеры И ОСНОВНОЙ навигации - на базе этого метода можно заменить метод _move. 
    _movePoints(numbmer) {
        this._setPossition(numbmer);
        if (this._positionButtons == 0) {
            this._curentPosition = 0
        } else if (this._positionButtons == this.nav_points.length - 1) {
            this._curentPosition = ((this.img.length - this._slidesToShow) * this._imgWidth) * -1;
        } else {
            this._curentPosition = (numbmer * (this._slidesToScroll * this._imgWidth)) * -1
        }
        this.items.style.transform = `translateX(${this._curentPosition}px)`; // можно сократить в новый метод
    }

    // Основная навигация 
    changeRightIMG() {
        // this._removeActive(this._positionButtons);
        this._movePoints(this._positionButtons + 1)
        // this._addActive(this._positionButtons);
    }
    changeLeftIMG() {
        // this._removeActive(this._positionButtons);
        this._movePoints(this._positionButtons - 1)
        // this._addActive(this._positionButtons);
    }
    // Навигационные маркеры 
    changeByPoints(numbmer) {
        this._removeActive(this._positionButtons);
        if (numbmer >= 0 && numbmer <= this.nav_points.length) //Проверка на дурака 
            this._movePoints(numbmer, -1);
        this._addActive(this._positionButtons);
    }
}
class SettingsInit extends SliderLogic {
    constructor(address, settings) {
        super(address);
        this.settings = settings;




    }
}
class SliderInit extends SettingsInit {
    constructor(address, settings) {
        super(address, settings);
        // Ивенты кнопки -Почему тут пришлось биндить а выше ивент нет, не совсем понимаю контекст. 
        debugger;
        this.slider.addEventListener("onload", this._setPoints());
        this.slider.addEventListener("click", this._clickerListener.bind(this));
        super.nav_points = this.slider.querySelectorAll(".nav_points");
        // window.addEventListener("resize", () => this._settingsInit()); // не могу понять почему работает именно вот так '() =>' работает 
    }
    _setPoints() {
        const ul = document.createElement('ul'),
            points = Math.ceil((this.img.length - this._slidesToShow) / this._slidesToScroll + 1);
        for (let key = 0; key < points; key++) {
            key == 0 ? ul.insertAdjacentHTML("beforeend", `<li><button class='nav_points activeButton' type="button" data-target="` + key + `"></button></li>`) : ul.insertAdjacentHTML("beforeend", `<li><button class="nav_points" type="button" data-target="` + key + `"></button></li>`);
        }
        this.slider.querySelector(".points").append(ul);
    }
    _clickerListener(event) {
        debugger;
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
}