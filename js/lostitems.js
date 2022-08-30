var lostitems = function (x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = img;
    this.isActive = false;

    this.update = function (delta) {
        var self = this;
        self.image.update();
    };

    this.draw = function () {
        var self = this;
        self.image.draw(self.x, self.y, self.w, self.h);
    };
};
