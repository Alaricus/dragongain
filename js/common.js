// All the vatiables and functions that will be needed across the application.
var common = {};

var containerElem = document.getElementById("container");
var shootElem = document.getElementById("shoot");
var menuElem = document.getElementById("menu");
var startElem = document.getElementById("start");
var continueElem = document.getElementById("continue");
var rulesElem = document.getElementById("rules");
var optionsElem = document.getElementById("options");
var creditsElem = document.getElementById("credits");
var backElem = document.getElementById("back");
var changelangElem = document.getElementById("changelang");
var delsaveElem = document.getElementById("delsave");
var delscoreElem = document.getElementById("delscore");
var musicElem = document.getElementById("music");
var sfxElem = document.getElementById("sfx");

common.stateEnum = {
  MENU: 0,
  GAME: 1,
  OVER: 2,
  OPTIONS: 3,
  CREDITS: 4,
  RULES: 5,
  properties: {
    0: {name: "menu", value: 0},
    1: {name: "game", value: 1},
    2: { name: "over", value: 2 },
    3: { name: "options", value: 3 },
    4: { name: "credits", value: 4 },
    5: { name: "rules", value: 5 }
  }
};

// Was used when multiple art styles were planned
// common.artstyleEnum = {
//     PRIMARY: 0,
//     SECONDARY: 1,
//     properties: {
//         0: { name: "primary", value: 0 },
//         1: { name: "secondary", value: 1 }
//     }
// };

common.languageEnum = {
    ENGLISH: 0,
    RUSSIAN: 1,
    properties: {
        0: { name: "english", value: 0 },
        1: { name: "russian", value: 1 }
    }
}

// Was used when multiple art styles were planned
// if (localStorage.artSetting) {
//     common.artstyle = localStorage.artSetting;
// } else {
//     common.artstyle = common.artstyleEnum.PRIMARY;
// }

// TODO: Make this save
if (localStorage.languageSetting) {
    common.language = localStorage.languageSetting;
} else {
    common.language = common.languageEnum.ENGLISH;
}

common.getMenuText = function() {
    common.menuText = allStrings[common.languageEnum.properties[common.language].name];
}

common.currentState = common.stateEnum.MENU;
common.images = null;
common.sounds = null;
common.unit = 2;
common.musicEnabled = true;
common.sfxEnabled = true;

if (localStorage.noMusic)
{
    common.musicEnabled = false;
}
if (localStorage.noSound) {
    common.sfxEnabled = false;
}

common.imgSources = ["sky", "mountains", "trees", "meadow", "grass",
                    "snake", "item", "baditem", "bullet", "explosion",
                    "lostitems", "speed", "shoot", "stack", "clock",
                    "menubg", "hat", "shield"];

common.sndSources = ["shoot", "itemexplode", "baditemexplode", "hatexplode",
                    "clockexplode", "itemtake", "baditemtake", "hattake",
                    "clocktake", "lostitems", "gameover", "menuclick",
                    "gamemusic", "menumusic", "shieldlost"];

common.loadImages = function(names, callback) {
  var n;
  var name;
  var result = {};
  var count = names.length;

  for(n = 0; n < names.length; n++) {
    name = names[n];
    result[name] = new Image();
    result[name].onload = function() {
      if (--count === 0) {
        common.images = result;
        callback();
      }
    };
    result[name].src = "./images/artset/" + name + ".png";
    common.initialize("images", n, names.length);
  }
}

common.loadSounds = function (names, callback) {
    var n;
    var name;
    var result = {};
    var count = names.length;

    for (n = 0 ; n < names.length ; n++) {
        name = names[n];
        result[name] = new Audio();
        result[name].oncanplaythrough = function () {
            if (--count === 0) {
                common.sounds = result;
                callback();
            }
        };
        result[name].src = "./sounds/soundset/" + name + ".mp3";
        common.initialize("sounds", n, names.length);
    }
};

common.initialize = function (type, current, total) {
    common.c.clearRect(0, 0, common.c.canvas.width, common.c.canvas.height)
    common.c.fillStyle = "rgba(16, 16, 16, 1)";
    common.c.textAlign = "center";
    common.c.font = (0.5 * common.unit) + "px 'ObelixPro'";
    common.c.fillText(`Loading ${type}: ${current} of ${total} loaded...`, 8 * common.unit, 3.5 * common.unit);
}

common.resize = function () {

    if (window.innerWidth / 16 > window.innerHeight / 9) {
        if (window.innerHeight >= 720) {
           common.c.canvas.width = 1280;
           common.c.canvas.height = 720;
        } else {
            common.c.canvas.width = (window.innerHeight / 9) * 16;
            common.c.canvas.height = window.innerHeight;
        }
        common.unit = common.c.canvas.width / 16;
    } else {
        if (window.innerWidth >= 1280) {
           common.c.canvas.width = 1280;
           common.c.canvas.height = 720;
        } else {
            common.c.canvas.width = window.innerWidth;
            common.c.canvas.height = (window.innerWidth / 16) * 9;
        }
        common.unit = common.c.canvas.width / 16;
    }

    containerElem.style.height = common.c.canvas.height + "px";
    containerElem.style.width = common.c.canvas.width + "px";

    shootElem.style.height = 3 * common.unit + "px";
    shootElem.style.width = 3 * common.unit + "px";
    shootElem.style.top = 6 * common.unit + "px";
    shootElem.style.left = 0.1 * common.unit + "px";
    menuElem.style.height = 1.5 * common.unit + "px";
    menuElem.style.width = 1.5 * common.unit + "px";
    menuElem.style.top = 0.15 * common.unit + "px";
    menuElem.style.left = 14.25 * common.unit + "px";
    startElem.style.height = 1.1 * common.unit + "px";
    startElem.style.width = 8 * common.unit + "px";
    startElem.style.top = 2.45 * common.unit + "px";
    startElem.style.left = 0 * common.unit + "px";
    continueElem.style.height = 1.1 * common.unit + "px";
    continueElem.style.width = 8 * common.unit + "px";
    continueElem.style.top = 3.7 * common.unit + "px";
    continueElem.style.left = 0 * common.unit + "px";
    rulesElem.style.height = 1.1 * common.unit + "px";
    rulesElem.style.width = 8 * common.unit + "px";
    rulesElem.style.top = 4.95 * common.unit + "px";
    rulesElem.style.left = 0 * common.unit + "px";
    optionsElem.style.height = 1.1 * common.unit + "px";
    optionsElem.style.width = 8 * common.unit + "px";
    optionsElem.style.top = 6.2 * common.unit + "px";
    optionsElem.style.left = 0 * common.unit + "px";
    creditsElem.style.height = 1.1 * common.unit + "px";
    creditsElem.style.width = 8 * common.unit + "px";
    creditsElem.style.top = 7.45 * common.unit + "px";
    creditsElem.style.left = 0 * common.unit + "px";
    backElem.style.height = 0.75 * common.unit + "px";
    backElem.style.width = 3 * common.unit + "px";
    backElem.style.top = 7.9 * common.unit + "px";
    backElem.style.left = 6.5 * common.unit + "px";
    changelangElem.style.height = 1.1 * common.unit + "px";
    changelangElem.style.width = 12 * common.unit + "px";
    changelangElem.style.top = 2.45 * common.unit + "px";
    changelangElem.style.left = 2 * common.unit + "px";
    delsaveElem.style.height = 1.1 * common.unit + "px";
    delsaveElem.style.width = 12 * common.unit + "px";
    delsaveElem.style.top = 3.7 * common.unit + "px";
    delsaveElem.style.left = 2 * common.unit + "px";
    delscoreElem.style.height = 1.1 * common.unit + "px";
    delscoreElem.style.width = 12 * common.unit + "px";
    delscoreElem.style.top = 4.95 * common.unit + "px";
    delscoreElem.style.left = 2 * common.unit + "px";
    musicElem.style.height = 1.1 * common.unit + "px";
    musicElem.style.width =5.5 * common.unit + "px";
    musicElem.style.top = 6.2 * common.unit + "px";
    musicElem.style.left = 3 * common.unit + "px";
    sfxElem.style.height = 1.1 * common.unit + "px";
    sfxElem.style.width = 5 * common.unit + "px";
    sfxElem.style.top = 6.2 * common.unit + "px";
    sfxElem.style.left = 9 * common.unit + "px";

    common.buttonVisibility();
}

common.buttonVisibility = function()
{
    if (common.currentState !== common.stateEnum.GAME) {
        shootElem.style.zIndex = "-1";
        menuElem.style.zIndex = "-1";
    } else {
        shootElem.style.zIndex = "2";
        menuElem.style.zIndex = "2";
    }
    if (common.currentState !== common.stateEnum.MENU) {
        startElem.style.zIndex = "-1";
        continueElem.style.zIndex = "-1";
        optionsElem.style.zIndex = "-1";
        creditsElem.style.zIndex = "-1";
        rulesElem.style.zIndex = "-1";
    } else {
        startElem.style.zIndex = "2";
        continueElem.style.zIndex = "2";
        optionsElem.style.zIndex = "2";
        creditsElem.style.zIndex = "2";
        rulesElem.style.zIndex = "2";
    }
    if (common.currentState !== common.stateEnum.OPTIONS) {
        changelangElem.style.zIndex = "-1";
        delsaveElem.style.zIndex = "-1";
        delscoreElem.style.zIndex = "-1";
        musicElem.style.zIndex = "-1";
        sfxElem.style.zIndex = "-1";
    } else {
        changelangElem.style.zIndex = "2";
        delsaveElem.style.zIndex = "2";
        delscoreElem.style.zIndex = "2";
        musicElem.style.zIndex = "2";
        sfxElem.style.zIndex = "2";
    }
    if (common.currentState !== common.stateEnum.CREDITS && common.currentState !== common.stateEnum.OPTIONS && common.currentState !== common.stateEnum.OVER && common.currentState !== common.stateEnum.RULES) {
        backElem.style.zIndex = "-1";
    } else {
        backElem.style.zIndex = "2";
    }
}
common.playSound = function (snd, restart) {
    if (restart === undefined)
    {
        restart = false;
    }
    if (common.musicEnabled) {
        switch (snd) {
            case "menumusic":
                common.sounds.gamemusic.pause();
                common.sounds.menumusic.volume = 0.2;
                common.sounds.menumusic.loop = true;
                common.sounds.menumusic.play();
                break;
            case "gamemusic":
                common.sounds.menumusic.pause();
                common.sounds.gamemusic.volume = 0.1;
                common.sounds.gamemusic.loop = true;
                common.sounds.gamemusic.play();
                break;
            case "musicoff":
                common.sounds.menumusic.pause();
                common.sounds.gamemusic.pause();
                break;
        }
    }

    if (common.sfxEnabled) {
        switch (snd) {
            case "baditemexplode":
                common.sounds.baditemexplode.volume = 0.3;
                common.sounds.baditemexplode.play();
                break;
            case "baditemtake":
                common.sounds.baditemtake.volume = 0.3;
                common.sounds.baditemtake.play();
                break;
            case "clockexplode":
                common.sounds.clockexplode.volume = 0.3;
                common.sounds.clockexplode.play();
                break;
            case "clocktake":
                common.sounds.clocktake.volume = 0.3;
                common.sounds.clocktake.play();
                break;
            case "gameover":
                common.sounds.gameover.volume = 0.3;
                common.sounds.gameover.play();
                break;
            case "hatexplode":
                common.sounds.hatexplode.volume = 0.3;
                common.sounds.hatexplode.play();
                break;
            case "hattake":
                common.sounds.hattake.volume = 0.3;
                common.sounds.hattake.play();
                break;
            case "itemexplode":
                common.sounds.itemexplode.volume = 0.3;
                common.sounds.itemexplode.play();
                break;
            case "itemtake":
                common.sounds.itemtake.volume = 0.3;
                common.sounds.itemtake.play();
                break;
            case "lostitems":
                common.sounds.lostitems.volume = 0.3;
                common.sounds.lostitems.play();
                break;
            case "menuclick":
                common.sounds.menuclick.volume = 0.3;
                common.sounds.menuclick.play();
                break;
            case "shieldlost":
                common.sounds.shieldlost.volume = 0.3;
                common.sounds.shieldlost.play();
                break;
            case "shoot":
                common.sounds.shootElem.volume = 0.3;
                if (restart) {
                    common.sounds.shootElem.currentTime = 0;
                }
                common.sounds.shootElem.play();
                break;
        }
    }
}
