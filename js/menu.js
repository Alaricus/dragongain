var menu = {};

menu.continue = false;

menu.main = function() {
    common.before = Date.now();  
    var now = Date.now();
    var delta = now - common.before;
    menu.update(delta/1000);
    menu.draw();
    common.before = now;

  if (common.currentState === common.stateEnum.GAME) {
    game.newGame(menu.continue);
    game.main();
  }

  if (common.currentState === common.stateEnum.OPTIONS) {
      options.main();
  }

  if (common.currentState === common.stateEnum.CREDITS) {
      credits.main();
  }

  if (common.currentState === common.stateEnum.MENU) {
    requestAnimationFrame(menu.main);
  }

  if (common.currentState === common.stateEnum.RULES) {
      rules.main();
  }
};

menu.update = function(delta) {

};

menu.draw = function() {
    common.c.drawImage(common.images.menubg, 0 * common.unit, 0 * common.unit, 16 * common.unit, 9 * common.unit);
    
    common.c.fillStyle = "rgba(16, 16, 16, 1)";
    common.c.textAlign = "center";
    common.c.font = (1 * common.unit) + "px 'ObelixPro'";
    common.c.fillText(common.menuText.menunewgame, 3.2 * common.unit, 3.5 * common.unit);
    if (localStorage.snakeSavedGame) {
        common.c.fillText(common.menuText.menucontinue, 3.2 * common.unit, 4.75 * common.unit);
    }    
    common.c.fillStyle = "rgba(16, 16, 16, 1)";
    common.c.fillText(common.menuText.menurules, 3.2 * common.unit, 6 * common.unit);
    common.c.fillText(common.menuText.menuoptions, 3.2 * common.unit, 7.25 * common.unit);
    common.c.fillText(common.menuText.menucredits, 3.2 * common.unit, 8.55 * common.unit);
};