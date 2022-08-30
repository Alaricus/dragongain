var credits = {};

credits.main = function () {
    common.before = Date.now();
    var now = Date.now();
    var delta = now - common.before;
    credits.draw();
    common.before = now;

    if (common.currentState === common.stateEnum.MENU) {
        menu.main();
    }

    if (common.currentState === common.stateEnum.CREDITS) {
        requestAnimationFrame(credits.main);
    }
};

credits.draw = function () {
    common.c.drawImage(common.images.menubg, 0 * common.unit, 0 * common.unit, 16 * common.unit, 9 * common.unit);

    common.c.globalAlpha = 0.75;
    common.c.fillRect(0, 2.5 * common.unit, 16 * common.unit, 4 * common.unit);
    common.c.globalAlpha = 1.0;

    common.c.fillStyle = "grey";
    common.c.textAlign = "center";
    common.c.font = (0.55 * common.unit) + "px 'ObelixPro'";
    common.c.fillText(common.menuText.creditsline1, 8 * common.unit, 3.5 * common.unit);
    common.c.fillText(common.menuText.creditsline2, 8 * common.unit, 4.75 * common.unit);
    common.c.fillText(common.menuText.creditsline3, 8 * common.unit, 6 * common.unit);
    common.c.fillStyle = "rgba(16, 16, 16, 1)";
    common.c.fillText(common.menuText.back, 8 * common.unit, 8.55 * common.unit);
};