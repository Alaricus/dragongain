var item = function (x, y, w, h, img, spd, type, active, alt) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.startingSpeed = spd;
    this.currentSpeed = spd;
    this.image = img;
    this.altImage = alt;
    this.isActive = active;

    this.update = function (delta) {
        var self = this;
        self.x += self.currentSpeed * delta;
    };

    this.draw = function () {
        var self = this;
        if (self.type !== game.itemType.BADITEM) {
            self.image.draw(self.x, self.y, self.w, self.h);
        } else {
            self.altImage.draw(self.x, self.y, self.w, self.h);
        }
    };
};
