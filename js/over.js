var over = {};

over.main = function() {
    common.before = Date.now();
    var now = Date.now();
    var delta = now - common.before;
    over.draw();
    common.before = now;

  if (common.currentState === common.stateEnum.MENU) {
    game.newGame(false);
    game.main();
  }

  if (common.currentState === common.stateEnum.OVER) {
    requestAnimationFrame(over.main);
  }
};

over.draw = function () {
    common.c.fillStyle = "black";
    common.c.fillRect(0, 0, 16 * common.unit, 9 * common.unit);

    common.c.fillStyle = "grey";
    common.c.textAlign = "center";
    common.c.font = (1 * common.unit) + "px 'ObelixPro'";
    common.c.fillText(common.menuText.gameover, 8 * common.unit, 3.5 * common.unit);
    common.c.font = (0.55 * common.unit) + "px 'ObelixPro'";
    common.c.fillText(common.menuText.gameoverreason, 8 * common.unit, 4.75 * common.unit);
    common.c.fillText(common.menuText.gameoverscore + " " + localStorage.score, 8 * common.unit, 6 * common.unit);
    common.c.fillText(common.menuText.gameoverhighscore + " " + localStorage.highScore, 8 * common.unit, 7.25 * common.unit);
    common.c.fillStyle = "red";
    common.c.fillText(common.menuText.back, 8 * common.unit, 8.55 * common.unit);
};