var layer = function (img, x, y, w, h, s) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.startingSpeed = s;
    this.currentSpeed = s;
    this.image = img;

    this.update = function (delta) {
        var self = this;
        self.x += self.currentSpeed * delta;
        if (self.x <= -self.w) {
            self.x = 0;
        }
    };

    this.draw = function () {
        var self = this;
        common.c.drawImage(self.image, 
            self.x * common.unit,
            self.y * common.unit, 
            self.w * common.unit, 
            self.h * common.unit
        );

        common.c.drawImage(self.image, 
            self.x * common.unit + self.w * common.unit,
            self.y * common.unit, 
            self.w * common.unit, 
            self.h * common.unit
        );
    };
};
