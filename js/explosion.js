var explosion = function (x, y, w, h, img, spd) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = img;
    this.startingSpeed = spd;
    this.currentSpeed = spd;
    this.isActive = false;

    this.update = function (delta) {
        var self = this;
        self.x += self.currentSpeed * delta;
        self.image.update();
    };

    this.draw = function () {
        var self = this;
        self.image.draw(self.x, self.y, self.w, self.h);
    };
};
