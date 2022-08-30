var rules = {};

rules.main = function () {
    common.before = Date.now();
    var now = Date.now();
    var delta = now - common.before;
    rules.draw();
    common.before = now;

    if (common.currentState === common.stateEnum.MENU) {
        menu.main();
    }

    if (common.currentState === common.stateEnum.RULES) {
        requestAnimationFrame(rules.main);
    }
};

rules.draw = function () {
    common.c.drawImage(common.images.menubg, 0 * common.unit, 0 * common.unit, 16 * common.unit, 9 * common.unit);

    common.c.globalAlpha = 0.75;
    common.c.fillRect(0, 2 * common.unit, 16 * common.unit, 6 * common.unit);
    common.c.globalAlpha = 1.0;

    common.c.fillStyle = "grey";
    common.c.textAlign = "left";
    common.c.font = (0.55 * common.unit) + "px 'ObelixPro'";
    common.c.fillText(common.menuText.rulesline1, 0.5 * common.unit, 3.5 * common.unit);
    common.c.fillText(common.menuText.rulesline2, 0.5 * common.unit, 4.75 * common.unit);
    common.c.fillText(common.menuText.rulesline3, 0.5 * common.unit, 6 * common.unit);
    common.c.fillText(common.menuText.rulesline4, 0.5 * common.unit, 7.25 * common.unit);
    common.c.textAlign = "center";
    common.c.fillStyle = "rgba(16, 16, 16, 1)";
    common.c.fillText(common.menuText.back, 8 * common.unit, 8.55 * common.unit);

    common.c.drawImage(common.images.item, 0, 0, 150, 150, 0.5 * common.unit, 2.75 * common.unit, 1 * common.unit, 1 * common.unit);
    common.c.drawImage(common.images.baditem, 0, 0, 150, 150, 0.5 * common.unit, 4 * common.unit, 1 * common.unit, 1 * common.unit);
    common.c.drawImage(common.images.hat, 0, 0, 150, 160, 0.5 * common.unit, 5.25 * common.unit, 0.95 * common.unit, 1 * common.unit);
    common.c.drawImage(common.images.clock, 0, 0, 150, 160, 0.5 * common.unit, 6.5 * common.unit, 1 * common.unit, 1 * common.unit);
};