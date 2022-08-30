"use strict";

common.c = document.getElementById("game").getContext("2d");
common.resize();
common.loadSounds(common.sndSources, function () {
		common.loadImages(common.imgSources, function () {
				common.before = Date.now();
				common.getMenuText();
				common.resize();
				menu.main();
				common.playSound("menumusic");
		});
});

window.addEventListener("resize", function () {
		common.resize();
});

document.getElementById("start").addEventListener("click", function () {
		common.currentState = common.stateEnum.GAME;
		menu.continue = false;
		common.buttonVisibility();
		common.playSound("gamemusic");
});

document.getElementById("continue").addEventListener("click", function () {
		if (localStorage.snakeSavedGame) {
				common.currentState = common.stateEnum.GAME;
				menu.continue = true;
				common.buttonVisibility();
				common.playSound("gamemusic");
		}
});

document.getElementById("rules").addEventListener("click", function () {
		common.currentState = common.stateEnum.RULES;
		common.buttonVisibility();
		common.playSound("menuclick");
});

document.getElementById("options").addEventListener("click", function () {
		common.currentState = common.stateEnum.OPTIONS;
		common.buttonVisibility();
		common.playSound("menuclick");
});

document.getElementById("credits").addEventListener("click", function () {
		common.currentState = common.stateEnum.CREDITS;
		common.buttonVisibility();
		common.playSound("menuclick");
});

document.getElementById("back").addEventListener("click", function () {
		common.currentState = common.stateEnum.MENU;
		common.buttonVisibility();
		common.playSound("menuclick");
		common.playSound("menumusic");
});

document.getElementById("changelang").addEventListener("click", function () {
		if (common.language == common.languageEnum.ENGLISH) {
				common.language = common.languageEnum.RUSSIAN;
				localStorage.setItem("languageSetting", common.languageEnum.RUSSIAN);
		} else if (common.language == common.languageEnum.RUSSIAN) {
				common.language = common.languageEnum.ENGLISH;
				localStorage.removeItem("languageSetting");
		}
	common.getMenuText();
	common.playSound("menuclick");
});

// Was used when multiple art styles were planned
// document.getElementById("changeart").addEventListener("click", function () {
//     if (common.artstyle == common.artstyleEnum.PRIMARY) { // Has to be == here instead of === because only value (0 or 1) is passed, not the actual enum object. Is possibly lost when saving/retrieving via localStorage.
//         common.artstyle = common.artstyleEnum.SECONDARY;
//         localStorage.setItem("artSetting", common.artstyleEnum.SECONDARY);
//     } else if (common.artstyle == common.artstyleEnum.SECONDARY) {
//         common.artstyle = common.artstyleEnum.PRIMARY;
//         localStorage.removeItem("artSetting");
//     }
//     common.playSound("musicoff");
//     common.loadSounds(common.sndSources, function () {
//         common.loadImages(common.imgSources, function () {
//             common.playSound("menuclick");
//             common.playSound("menumusic");
//         });
//     });
// });

document.getElementById("delsave").addEventListener("click", function () {
		localStorage.removeItem("snakeSavedGame");
		common.playSound("menuclick");
});

document.getElementById("delscore").addEventListener("click", function () {
		localStorage.removeItem("highScore");
		common.playSound("menuclick");
});

document.getElementById("music").addEventListener("click", function () {
		if (common.musicEnabled) {
				common.playSound("musicoff");
				common.musicEnabled = false;
				localStorage.setItem("noMusic", true);
		} else {
				common.musicEnabled = true;
				localStorage.removeItem("noMusic");
				common.playSound("menumusic");
				common.playSound("menuclick");
		}
});

document.getElementById("sfx").addEventListener("click", function () {
		if (common.sfxEnabled) {
				common.sfxEnabled = false;
				localStorage.setItem("noSound", true);
		} else {
				common.sfxEnabled = true;
				localStorage.removeItem("noSound");
				common.playSound("menuclick");
		}
});

document.getElementById("shoot").addEventListener("click", function () {
		if (!game.bullet.isActive) {
				// Needs to have an item in order to bullet it out.
				if (game.itemCount > 0) {
						game.itemCount--;
						// Moves the starting point of the bullet to the snake's head.
						game.bullet.x = 4;
						game.bullet.isActive = true;
						common.playSound("shoot", true);
				}
		}
});

document.getElementById("menu").addEventListener("click", function () {
		game.saveGame();
		common.currentState = common.stateEnum.MENU;
		common.buttonVisibility();
		common.playSound("menumusic");
});