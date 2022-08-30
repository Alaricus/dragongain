var game = {};

// "Enum" to differentiate between the types of the item object.
game.itemType = {
  ITEM: 0,
  BADITEM: 1,
  properties: {
    0: {name: "item", value: 0},
    1: {name: "baditem", value: 1}
  }
};

// "Enum" to differentiate between the types of the powerup object.
game.powerupType = {
  CLOCK: 0,
  HAT: 1,
  properties: {
    0: {name: "clock", value: 0},
    1: {name: "hat", value: 1}
  }
};

game.speedUnit = 0.05;
game.speedUnitBg = 0.02;

game.newGame = function(useSaved) {
  game.worldLayers = [];
  game.worldLayers[0] = new layer(common.images.sky, 0, 0, 41.6, 9, -0.11);
  game.worldLayers[1] = new layer(common.images.mountains, 0, 0, 41.6, 9, -0.22);
  game.worldLayers[2] = new layer(common.images.trees, 0, 0, 41.6, 9, -0.55);
  game.worldLayers[3] = new layer(common.images.meadow, 0, 0, 41.6, 9, -0.88);
  game.worldLayers[4] = new layer(common.images.grass, 0, 0, 41.6, 9, -1.21);

  game.snakeSprite = new sprite(common.images.snake, 0, 0, 8000, 400, 20, 10);
  game.itemSprite = new sprite(common.images.item, 0, 0, 300, 252, 2, 12);
  game.baditemSprite = new sprite(common.images.baditem, 0, 0, 300, 252, 2, 12);
  game.bulletSprite = new sprite(common.images.bullet, 0, 0, 1800, 120, 15, 5);
  game.explosionSprite = new sprite(common.images.explosion, 0, 0, 3375, 252, 15, 1);
  game.lostitemsSprite = new sprite(common.images.lostitems, 0, 0, 8160, 480, 17, 1);
  game.clockSprite = new sprite(common.images.clock, 0, 0, 300, 252, 2, 12);
  game.hatSprite = new sprite(common.images.hat, 0, 0, 300, 252, 2, 12);

  game.snake = new snake(1.5, 3.5, 3.5, 3.5, game.snakeSprite);
  game.bullet = new bullet(0, 5, 1, 1, game.bulletSprite, 5);

  game.items = [];
  game.items[0] = new item(9, 5, 0.99, 1.66, game.itemSprite, -0.88, game.itemType.ITEM, true, game.baditemSprite);
  game.items[1] = new item(12, 4, 0.99, 1.66, game.itemSprite, -0.88, game.itemType.ITEM, true, game.baditemSprite);
  game.items[2] = new item(15, 5, 0.99, 1.66, game.itemSprite, -0.88, game.itemType.ITEM, true, game.baditemSprite);
  game.items[3] = new item(18, 4, 0.99, 1.66, game.itemSprite, -0.88, game.itemType.ITEM, true, game.baditemSprite);
  game.items[4] = new item(21, 5, 0.99, 1.66, game.itemSprite, -0.88, game.itemType.BADITEM, true, game.baditemSprite);

  game.powerup = new powerup(17, 4, 0.99, 1.66, game.clockSprite, -0.88, game.powerupType.HAT, false, game.hatSprite);

  game.lostitems = new lostitems(0, 3, 4, 4, game.lostitemsSprite);
  game.explosion = new explosion(0, 4.5, 3, 3, game.explosionSprite, -0.88);

  game.itemCount = 0;
  game.snakeSpeedMarker = 0;
  game.itemsDroppedTime = Date.now();

  if (useSaved && localStorage.snakeSavedGame) {
    game.loadGame();
  }
};

game.loadGame = function() {
    var loadedGame = JSON.parse(localStorage.snakeSavedGame);

    for (var i = 0; i < game.worldLayers.length; i++) {
        game.worldLayers[i].x = loadedGame.worldLayers[i].x;
        game.worldLayers[i].currentSpeed = loadedGame.worldLayers[i].currentSpeed;
    }
    for (var i = 0; i < game.items.length; i++) {
        game.items[i].type = loadedGame.items[i].type;
        game.items[i].x = loadedGame.items[i].x;
        game.items[i].currentSpeed = loadedGame.items[i].currentSpeed;
        game.items[i].isActive = loadedGame.items[i].isActive;
    }
    game.powerup.type = loadedGame.powerup.type;
    game.powerup.x = loadedGame.powerup.x;
    game.powerup.currentSpeed = loadedGame.powerup.currentSpeed;
    game.powerup.isActive = loadedGame.powerup.isActive;

    game.snake.isShielded = loadedGame.snake.isShielded;
    game.bullet.x = loadedGame.bullet.x;
    game.bullet.currentSpeed = loadedGame.bullet.currentSpeed;
    game.bullet.isActive = loadedGame.bullet.isActive;

    game.itemCount = loadedGame.itemCount;
    game.snakeSpeedMarker = loadedGame.snakeSpeedMarker;
};

game.saveGame = function() {
  var savedGame = {};
  savedGame.worldLayers = game.worldLayers;
  savedGame.items = game.items;
  savedGame.powerup = game.powerup;
  savedGame.snake = game.snake;
  savedGame.bullet = game.bullet;
  savedGame.itemCount = game.itemCount;
  savedGame.snakeSpeedMarker = game.snakeSpeedMarker;
  localStorage.setItem("snakeSavedGame", JSON.stringify(savedGame));
};

// Checking for collisions of items and powerups with snake or bullet. Keeping score,
// changing speed, picking up and dropping items, deactivating, timestamping.
game.detectCollisions = function() {
    for (var i = 0; i < game.items.length; i++) {
        if (game.snake.x * common.unit + game.snake.w * common.unit - 0.5 * common.unit >= game.items[i].x * common.unit) {
            if (game.items[i].type === game.itemType.BADITEM) {
                if (!game.snake.isShielded) {
                    if (game.itemCount > 0) {
                    game.lostitems.isActive = true;
                    game.itemsDroppedTime = Date.now();
                    common.playSound("lostitems");
                    } else {
                        common.playSound("baditemtake");
                    }
                    // When losing more than 100 items at once, the game ends
                    if (game.itemCount >= 5) { //TODO: Change this back to 100 after done testing
                        common.currentState = common.stateEnum.OVER;
                        common.buttonVisibility();
                        localStorage.setItem("score", game.itemCount);
                        if (!localStorage.highScore || localStorage.highScore < game.itemCount) {
                            localStorage.setItem("highScore", game.itemCount);
                        }
                        common.playSound("musicoff");
                        common.playSound("gameover");
                    }
                    game.itemCount = 0;
                    game.snakeSpeedMarker = 0;
                } else {
                    game.snake.isShielded = false;
                    common.playSound("shieldlost");
                }
            } else {
            game.itemCount++;
            game.speedUp();
            common.playSound("itemtake");
            }
          game.items[i].isActive = false;
    }
    if (game.powerup.isActive && game.snake.x * common.unit + game.snake.w * common.unit - 0.5 >= game.powerup.x * common.unit) {
        switch(game.powerup.type) {
            case game.powerupType.CLOCK:
                game.speedDown(20);
                game.snakeSpeedMarker -= 20;
                common.playSound("clocktake");
                break;
            case game.powerupType.HAT:
                game.snake.isShielded = true;
                common.playSound("hattake");
                break;
        }
        game.powerup.x = 17;
        game.powerup.isActive = false;
    }

    if (game.bullet.x * common.unit + game.bullet.w * common.unit >= game.items[i].x * common.unit) {
      // Deactivate the item, deactivate bullet, move bullet to the left past the snake
      // until the next time so it doesnt collide with anything, activate the explosion
      // where the item used to be.
      game.items[i].isActive = false;
      game.bullet.isActive = false;
      game.bullet.x = 0;
      game.explosion.isActive = true;
      game.explosion.x = game.items[i].x - game.items[i].w;
      game.itemExploded = Date.now();
      game.speedUp();
      if (game.items[i].type === game.itemType.BADITEM)
      {
          common.playSound("baditemexplode");
      } else {
          common.playSound("itemexplode");
      }
    }
    if (game.powerup.isActive && game.bullet.x * common.unit + game.bullet.w * common.unit >= game.powerup.x * common.unit) {
      game.powerup.isActive = false;
      game.bullet.isActive = false;
      game.bullet.x = 0;
      game.explosion.isActive = true;
      game.explosion.x = game.powerup.x;
      game.itemExploded = Date.now();
      game.itemCount += 10;
      game.powerup.x = 17;
      game.speedUp();
      if (game.powerup.type === game.powerupType.CLOCK) {
          common.playSound("clockexplode");
      } else {
          common.playSound("hatexplode");
      }
    }
  }
};

// Speeds up all non-stationary objects. So everything but snake and lostitems.
game.speedUp = function() {
  game.snakeSpeedMarker++;
  game.bullet.currentSpeed += game.speedUnit;
  game.explosion.currentSpeed -= game.speedUnit;
  game.powerup.currentSpeed -= game.speedUnit;
  game.items.forEach(function(a) {
      a.currentSpeed -= game.speedUnit;
  });
  game.worldLayers.forEach(function(l) {
      l.currentSpeed -= game.speedUnitBg;
  });
};

// Slows down all non-stationary objects or resets their speeds to default.
game.speedDown = function(amount) {
  if (amount === 0) {
    game.items.forEach(function(a) {
      a.currentSpeed = a.startingSpeed;
    });
    game.worldLayers.forEach(function(l) {
      l.currentSpeed = l.startingSpeedBg;
    });
    game.bullet.currentSpeed = game.bullet.startingSpeed;
    game.explosion.currentSpeed = game.explosion.startingSpeed;
    game.powerup.currentSpeed = game.powerup.startingSpeed;
  } else {
    game.items.forEach(function(a) {
        a.currentSpeed += game.speedUnit * amount;
    });
    game.worldLayers.forEach(function(l) {
        l.currentSpeed += game.speedUnitBg * amount;
    });
    game.bullet.currentSpeed -= game.speedUnit * amount;
    game.explosion.currentSpeed += game.speedUnit * amount;
    game.powerup.currentSpeed += game.speedUnit * amount;;
  }
};

game.main = function() {
    var now = Date.now();
    var delta = now - common.before;

    if (delta >= 1000 / 60) {
      game.update(delta/1000);
      game.draw();
      common.before = now;
    }

  if (common.currentState == common.stateEnum.MENU) {
    menu.main();
  }
  else if (common.currentState == common.stateEnum.OVER) {
    over.main();
  }
  else if (common.currentState == common.stateEnum.GAME) {
    requestAnimationFrame(game.main);
  }
};

game.update = function(delta) {
  game.detectCollisions();

  for (var i = 0; i < game.worldLayers.length; i++) {
    game.worldLayers[i].update(delta);
  }

  for (var j = 0; j < game.items.length; j++) {
    // Check if an item was deactivated. If so, activate and reposition it.
    if (!game.items[j].isActive) {
      game.items[j].isActive = true;
      game.items[j].x += 19;
      // 20% chance for the item to be activated with a type of BADITEM.
      if (Math.floor((Math.random() * 10) + 1) < 3) {
        game.items[j].type = game.itemType.BADITEM;
      }
      else {
        game.items[j].type = game.itemType.ITEM;
      }

      if (j == 4) {
        if (!game.powerup.isActive && game.snakeSpeedMarker >= 25) {  //TODO: reset to 25 when done testing
          if (Math.floor((Math.random() * 10) + 1) < 3) {
            game.powerup.type = game.powerupType.HAT;
            game.powerup.isActive = true;
            game.powerup.x = game.items[j].x + 3.5;
          }
        }
        if (!game.powerup.isActive && game.snakeSpeedMarker >= 75) {  //TODO: reset to 75 when done testing
          if (Math.floor((Math.random() * 10) + 1) < 3) {
            game.powerup.type = game.powerupType.CLOCK;
            game.powerup.isActive = true;
            game.powerup.x = game.items[j].x + 3.5;
          }
        }
      }

    }
    game.items[j].update(delta);
  }
  game.itemSprite.update();
  game.baditemSprite.update();

  if (game.powerup.isActive) {
    game.powerup.update(delta);
  }
  game.clockSprite.update();
  game.hatSprite.update();

  if (game.bullet.isActive) {
    game.bullet.update(delta);
  }

  if (game.lostitems.isActive) {
    game.lostitems.update(delta);
    // Deactivate it once it had enough time to animate fully.
    if (game.itemsDroppedTime + 535 < Date.now()) {
      game.lostitems.isActive = false;
      game.lostitems.image.ticks = 0;
      game.lostitems.image.index = 0;
    }
    game.speedDown(0);
  }

  game.snake.update(delta);

  if (game.explosion.isActive) {
    game.explosion.update(delta);
    if (game.itemExploded + 450 < Date.now()) {
      game.explosion.isActive = false;
      game.explosion.image.ticks = 0;
      game.explosion.image.index = 0;
    }
  }
};

game.draw = function() {
  for (var i = 0; i < game.worldLayers.length; i++) {
    game.worldLayers[i].draw();
    // Before the 4th layer is drawn, draw snake, items, etc.
    if (i == 3) {
      for (var j = 0; j < game.items.length; j++) {
        if (game.items[j].isActive) {
          game.items[j].draw();
        }
      }
      if (game.powerup.isActive) {
        game.powerup.draw();
      }
      if (game.bullet.isActive) {
        game.bullet.draw();
      }
      if (game.lostitems.isActive) {
        game.lostitems.draw();
      }
      game.snake.draw();
      if (game.snake.isShielded) {
          common.c.drawImage(common.images.shield, 0, 0, 400, 400, 1.5 * common.unit, 3.5 * common.unit, 3.5 * common.unit, 3.5 * common.unit, 1);
      }
      if (game.explosion.isActive) {
        game.explosion.draw();
      }
    }
  }

  // Draw the counters at the top of the screen as well as the buttons.
  common.c.font = (0.55 * common.unit) + "px 'ObelixPro'";
  common.c.fillStyle = "black";
  common.c.fillText(game.itemCount, 2.01 * common.unit,  0.81 * common.unit);
  common.c.fillText(game.snakeSpeedMarker, 6.11 * common.unit, 0.81 * common.unit);
  // if (common.artstyle == common.artstyleEnum.PRIMARY) {
      common.c.fillStyle = "rgba(78, 255, 255, 1)";
  // } else if (common.artstyle == common.artstyleEnum.SECONDARY) {
  //     common.c.fillStyle = "rgba(214, 70, 31, 1)";
  // }
  common.c.fillText(game.itemCount, 2 * common.unit, 0.8 * common.unit);
  // if (common.artstyle == common.artstyleEnum.PRIMARY) {
      common.c.fillStyle = "rgba(78, 355, 255, 1)";
  // } else if (common.artstyle == common.artstyleEnum.SECONDARY) {
  //     common.c.fillStyle = "rgba(214, 70, 31, 1)";
  // }
  common.c.fillText(game.snakeSpeedMarker, 6.1 * common.unit, 0.8 * common.unit);
  common.c.drawImage(common.images.item, 0, 0, 150, 252, 0.5 * common.unit, 0.25 * common.unit, 0.875 * common.unit, 1.47 * common.unit, 1);
  common.c.drawImage(common.images.speed, 4.00 * common.unit, 0.05 * common.unit, 1.47 * common.unit, 1.47 * common.unit);
  common.c.drawImage(common.images.shoot, 0 * common.unit, 6 * common.unit, 3 * common.unit, 3 * common.unit);
  common.c.drawImage(common.images.stack, 14.25 * common.unit, 0.25 * common.unit, 1.4 * common.unit, 1.4 * common.unit);
};