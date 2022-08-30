var options = {};

options.main = function () {
    common.before = Date.now();
    var now = Date.now();
    var delta = now - common.before;
    options.draw();
    common.before = now;

    if (common.currentState === common.stateEnum.MENU) {
        menu.main();
    }

    if (common.currentState === common.stateEnum.OPTIONS) {
        requestAnimationFrame(options.main);
    }
};

options.draw = function () {
    common.c.drawImage(common.images.menubg, 0 * common.unit, 0 * common.unit, 16 * common.unit, 9 * common.unit);

    common.c.fillStyle = "rgba(16, 16, 16, 1)";
    common.c.textAlign = "center";
    common.c.font = (1 * common.unit) + "px 'ObelixPro'";
    common.c.fillText(common.menuText.optionschangelang, 8 * common.unit, 3.5 * common.unit);
    if (localStorage.snakeSavedGame) {
        common.c.fillText(common.menuText.optionsdeletesave, 8 * common.unit, 4.75 * common.unit);
    }
    if (localStorage.highScore) {
        common.c.fillText(common.menuText.optionsdeletescore, 8 * common.unit, 6 * common.unit);
    }
    common.c.textAlign = "left";
    if (common.musicEnabled) {
        common.c.fillText(common.menuText.optionsmusicno, 4 * common.unit, 7.25 * common.unit);
    } else {
        common.c.fillText(common.menuText.optionsmusicyes, 4 * common.unit, 7.25 * common.unit);
    }

    if (common.sfxEnabled) {
        common.c.fillText(common.menuText.optionssfxno, 9 * common.unit, 7.25 * common.unit);
    } else {
        common.c.fillText(common.menuText.optionssfxyes, 9 * common.unit, 7.25 * common.unit);
    }

    common.c.font = (0.55 * common.unit) + "px 'ObelixPro'";
    common.c.textAlign = "center";
    common.c.fillText(common.menuText.back, 8 * common.unit, 8.55 * common.unit);
};