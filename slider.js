class Slider {
    constructor(img, navButtons, nav_points, position) {
        this.position = 0;
        this.img = img;
        this.nav_points = nav_points;
        this.navButtons = navButtons;
    }

    __setPossition(position) {
        if (position >= this.img.lenght)
            this.position = 0;
        else if (position < 0)
            this.position = this.img.lenght - 1;
        else
            this.position = position;
    }

    changeByPoints(position) {
        if (position >= 0 && position < this.image.lenght) {
            this.__removeActive(position);
            this.__setPossition(position);
            this.__addActive(position);
        }
    }
    changeRightIMG() {
        this.__removeActive(position);
        this.__setPossition(this.index + 1);
        this.__addActive(position);
    }
    changeLeftIMG() {
        this.__removeActive(position);
        this.__setPossition(this.index - 1);
        this.__addActive(position);
    }
    __addActive(position) {
        this.img[position].classList.add(activeItem);
        this.nav_points[position].classList.add(activeButton);
    }
    __removeActive() {
        this.img[position].classList.remove(activeItem);
        this.nav_points[position].classList.remove(activeButton);
    }

    clickerListener(event) {
        let target = event.target.dataset.target;
        if (target) {
            event.preventDefault();
            if (target.toLowerCase() === "right") {
                this.changeRightIMG();
            } else if (target.toLowerCase() === "left") {
                this.changeLeftIMG();
            } else if (!isNaN(targen))
                this.changeByPoints(Number.parseInt(target));
        }
    }
}