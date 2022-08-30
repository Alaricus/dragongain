var sprite = function (img, x, y, w, h, frames, tpf) {
    this.image = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.frames = frames;
    this.index = 0;
    this.ticks = 0;
    this.ticksPerFrame = tpf || 0;

    this.update = function() {
        var self = this;
        self.ticks++;
        if (self.ticks > self.ticksPerFrame) {
            self.ticks = 0;
            if (self.index < self.frames - 1) {
                self.index++;
            } else {
                self.index = 0;
            }
        }
    };

    this.draw = function (destinationX, destinationY, destinationW, destinationH) {
        var self = this;
        common.c.drawImage(
            self.image,
            self.index * self.w / frames,
            self.y,
            self.w / self.frames,
            self.h,
            destinationX * common.unit,
            destinationY * common.unit,
            destinationW * common.unit,
            destinationH * common.unit
        );
    };
};
