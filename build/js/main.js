"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.onload = function () {
  var sortResetBtn = document.querySelector('#sort-reset');
  var sortNumberBtn = document.querySelector('#sort-number');
  var sortNameBtn = document.querySelector('#sort-name');
  var sortFranchiseBtn = document.querySelector('#sort-franchise');
  renderFighters(getFighters());
  frameController();
  sortResetBtn.addEventListener('click', function () {
    renderFighters(getFighters());
    frameController();
  });
  sortNumberBtn.addEventListener('click', function () {
    renderFighters(getFighters().sort(sortByID));
    frameController();
  });
  sortNameBtn.addEventListener('click', function () {
    renderFighters(getFighters().sort(sortBy('name')));
    frameController();
  });
  sortFranchiseBtn.addEventListener('click', function () {
    renderFighters(getFighters().sort(sortBy('franchise')));
    frameController();
  });
}; //Sort Fighter by Order of Appearance in Smash Series


function sortByID(a, b) {
  return a.id - b.id;
} //Sort Fighter by Name or Franchise Alphabetically


function sortBy(type) {
  return function (a, b) {
    var textA, textB;

    if (type == 'name') {
      textA = a.name.toUpperCase();
      textB = b.name.toUpperCase();
    } else if (type == 'franchise') {
      textA = a.franchise.toUpperCase();
      textB = b.franchise.toUpperCase();
    }

    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };
} // Sort Fighters by Franchise


function showFranchiseOnly(fighters, franch) {
  var sorted = fighters.filter(function (fighter) {
    return fighter.franchise == franch;
  });
  return sorted;
} // Event Listener


function frameController() {
  var fighterFrames = Array.from(document.querySelectorAll('.fighter'));
  fighterFrames.map(function (fighter) {
    fighter.addEventListener('click', function () {
      deselectFighters(fighter);
      applySelected(fighter);
      playAnnouncer(fighter);
    });
  });
} // Deselect fighters when another is selected


function deselectFighters(fighter) {
  Array.from(document.querySelectorAll('.fighter')).map(function (char) {
    if (char.classList.contains('selected') && char != fighter) {
      char.classList.remove('selected');
    }
  });
} // Apply selected styling


function applySelected(fighter) {
  if (fighter.classList.contains('selected')) {
    fighter.classList.remove('selected');
  } else {
    fighter.classList.add('selected');
  }
}

function playAnnouncer(fighter) {
  var announcer = new Audio("media/sounds/".concat(fighter.dataset.name, ".wav"));

  if (fighter.classList.contains('selected')) {
    announcer.play();
  }
}

function renderFighters(fighters) {
  var menu = document.querySelector('.menu-wrapper');
  menu.innerHTML = fighters.map(function (fighter, index) {
    return fighter.thumbnailHTML();
  }).join('');
} // ===============================================================================================================================================================


var Character =
/*#__PURE__*/
function () {
  function Character(id, name, franchise, thumbnail) {
    _classCallCheck(this, Character);

    this.id = id;
    this.name = name;
    this.franchise = franchise;
    this.thumbnail = "media/thumbnails/".concat(thumbnail);
  }

  _createClass(Character, [{
    key: "thumbnailHTML",
    value: function thumbnailHTML() {
      return "<div class=\"fighter\" data-name=\"".concat(this.name, "\" data-franchise=\"").concat(this.franchise, "\">\n                    <img src=\"").concat(this.thumbnail, "\"/>\n                    <p>").concat(this.name, "</p>\n                </div>");
    }
  }]);

  return Character;
}();

function getFighters() {
  // Create Fighters
  var MARIO = new Character(1, 'Mario', 'Super Mario Bros.', 'mario.png');
  var DK = new Character(2, 'Donkey Kong', 'Donkey Kong', 'dk.png');
  var LINK = new Character(3, 'Link', 'The Legend of Zelda', 'link.png');
  var SAMUS = new Character(4, 'Samus', 'Metroid', 'samus.png');
  var DARK_SAMUS = new Character(4.1, 'Dark Samus', 'Metroid', 'dark-samus.png');
  var YOSHI = new Character(5, 'Yoshi', 'Super Mario Bros.', 'yoshi.png');
  var KIRBY = new Character(6, 'Kirby', 'Kirby', 'kirby.png');
  var FOX = new Character(7, 'Fox', 'Star Fox', 'fox.png');
  var PIKACHU = new Character(8, 'Pikachu', 'Pokemon', 'pikachu.png');
  var LUIGI = new Character(9, 'Luigi', 'Super Mario Bros.', 'luigi.png');
  var NESS = new Character(10, 'Ness', 'Earthbound', 'ness.png');
  var CAPTAIN_FALCON = new Character(11, 'Captain Falcon', 'F-Zero', 'captain-falcon.png');
  var JIGGLYPUFF = new Character(12, 'Jigglypuff', 'Pokemon', 'jigglypuff.png');
  var PEACH = new Character(13, 'Peach', 'Super Mario Bros.', 'peach.png');
  var DAISY = new Character(13.1, 'Daisy', 'Super Mario Bros.', 'daisy.png');
  var BOWSER = new Character(14, 'Bowser', 'Super Mario Bros.', 'bowser.png');
  var ICE_CLIMBERS = new Character(15, 'Ice Climbers', 'Ice Climbers', 'ice-climbers.png');
  var SHEIK = new Character(16, 'Sheik', 'The Legend of Zelda', 'sheik.png');
  var ZELDA = new Character(17, 'Zelda', 'The Legend of Zelda', 'zelda.png');
  var DR_MARIO = new Character(18, 'Dr. Mario', 'Super Mario Bros.', 'dr-mario.png');
  var PICHU = new Character(19, 'Pichu', 'Pokemon', 'pichu.png');
  var FALCO = new Character(20, 'Falco', 'Star Fox', 'falco.png');
  var MARTH = new Character(21, 'Marth', 'Fire Emblem', 'marth.png');
  var LUCINA = new Character(21.1, 'Lucina', 'Fire Emblem', 'lucina.png');
  var YOUNG_LINK = new Character(22, 'Young Link', 'The Legend of Zelda', 'young-link.png');
  var GANONDORF = new Character(23, 'Ganondorf', 'The Legend of Zelda', 'ganondorf.png');
  var MEWTWO = new Character(24, 'Mewtwo', 'Pokemon', 'mewtwo.png');
  var ROY = new Character(25, 'Roy', 'Fire Emblem', 'roy.png');
  var CHROM = new Character(25.1, 'Chrom', 'Fire Emblem', 'chrom.png');
  var GAME_AND_WATCH = new Character(26, 'Mr. Game & Watch', 'Game & Watch', 'game-and-watch.png');
  var META_KNIGHT = new Character(27, 'Meta Knight', 'Kirby', 'meta-knight.png');
  var PIT = new Character(28, 'Pit', 'Kid Icarus', 'pit.png');
  var DARK_PIT = new Character(28.1, 'Dark Pit', 'Kid Icarus', 'dark-pit.png');
  var ZERO_SUIT_SAMUS = new Character(29, 'Zero Suit Samus', 'Metroid', 'zero-suit-samus.png');
  var WARIO = new Character(30, 'Wario', 'Super Mario Bros.', 'wario.png');
  var SNAKE = new Character(31, 'Snake', 'Metal Gear Solid', 'snake.png');
  var IKE = new Character(32, 'Ike', 'Fire Emblem', 'ike.png');
  var POKEMON_TRAINER = new Character(33, 'Pokemon Trainer', 'Pokemon', 'pokemon-trainer.png');
  var DIDDY_KONG = new Character(36, 'Diddy Kong', 'Donkey Kong', 'diddy-kong.png');
  var LUCAS = new Character(37, 'Lucas', 'Earthbound', 'lucas.png');
  var SONIC = new Character(38, 'Sonic', 'Sonic', 'sonic.png');
  var DDD = new Character(39, 'King DeDeDe', 'Kirby', 'ddd.png');
  var OLIMAR = new Character(40, 'Olimar', 'Pikmin', 'olimar.png');
  var LUCARIO = new Character(41, 'Lucario', 'Pokemon', 'lucario.png');
  var ROB = new Character(42, 'R.O.B.', 'N/A', 'rob.png');
  var TOON_LINK = new Character(43, 'Toon Link', 'The Legend of Zelda', 'toon-link.png');
  var WOLF = new Character(44, 'Wolf', 'Star Fox', 'wolf.png');
  var VILLAGER = new Character(45, 'Villager', 'Animal Crossing', 'villager.png');
  var MEGA_MAN = new Character(46, 'Mega Man', 'Mega Man', 'megaman.png');
  var WII_FIT_TRAINER = new Character(47, 'Wii Fit Trainer', 'N/A', 'wii-fit-trainer.png');
  var ROSALINA_AND_LUMA = new Character(48, 'Rosalina & Luna', 'Super Mario Bros.', 'rosalina.png');
  var LITTLE_MAC = new Character(49, 'Little Mac', 'Punch-out', 'little-mac.png');
  var GRENINJA = new Character(50, 'Greninja', 'Pokemon', 'greninja.png');
  var MII_BRAWLER = new Character(51, 'Mii Brawler', 'N/A', 'mii-brawler.png');
  var MII_SWORDFIGHTER = new Character(52, 'Mii Swordfighter', 'N/A', 'mii-swordfighter.png');
  var MII_GUNNER = new Character(53, 'Mii Gunner', 'N/A', 'mii-gunner.png');
  var PALUTENA = new Character(54, 'Palutena', 'Kid Icarus', 'palutena.png');
  var PAC_MAN = new Character(55, 'Pac-Man', 'Pac-Man', 'pacman.png');
  var ROBIN = new Character(56, 'Robin', 'Fire Emblem', 'robin.png');
  var SHULK = new Character(57, 'Shulk', 'Xenoblade Chronicles', 'shulk.png');
  var BOWSER_JR = new Character(58, 'Bowser Jr.', 'Super Mario Bros.', 'bowser-jr.png');
  var DUCK_HUNT = new Character(59, 'Duck Hunt', 'Duck Hunt', 'duck-hunt.png');
  var RYU = new Character(60, 'Ryu', 'Street Fighter', 'ryu.png');
  var KEN = new Character(60.1, 'Ken', 'Street Fighter', 'ken.png');
  var CLOUD = new Character(61, 'Cloud', 'Final Fantasy', 'cloud.png');
  var CORRIN = new Character(62, 'Corrin', 'Fire Emblem', 'corrin.png');
  var BAYONETTA = new Character(63, 'Bayonetta', 'Bayonetta', 'bayonetta.png');
  var INKLING = new Character(64, 'Inkling', 'Splatoon', 'inkling.png');
  var RIDLEY = new Character(65, 'Ridley', 'Metroid', 'ridley.png');
  var SIMON = new Character(66, 'Simon', 'Castlevania', 'simon.png');
  var RICHTER = new Character(66.1, 'Richter', 'Castlevania', 'richter.png');
  var K_ROOL = new Character(67, 'King K. Rool', 'Donkey Kong', 'k-rool.png');
  var ISABELLE = new Character(68, 'Isabelle', 'Animal Crossing', 'isabelle.png');
  var INCINEROAR = new Character(69, 'Incineroar', 'Pokemon', 'incineroar.png');
  var PIRAHNA_PLANT = new Character(70, 'Pirahna Plant', 'Super Mario Bros.', 'pirahna-plant.png'); // Array of Fighters for Display Purposes

  var FIGHTERS = [MARIO, DK, LINK, SAMUS, DARK_SAMUS, YOSHI, KIRBY, FOX, PIKACHU, LUIGI, NESS, CAPTAIN_FALCON, JIGGLYPUFF, PEACH, DAISY, BOWSER, ICE_CLIMBERS, SHEIK, ZELDA, DR_MARIO, PICHU, FALCO, MARTH, LUCINA, YOUNG_LINK, GANONDORF, MEWTWO, ROY, CHROM, GAME_AND_WATCH, META_KNIGHT, PIT, DARK_PIT, ZERO_SUIT_SAMUS, WARIO, SNAKE, IKE, POKEMON_TRAINER, DIDDY_KONG, LUCAS, SONIC, DDD, OLIMAR, LUCARIO, ROB, TOON_LINK, WOLF, VILLAGER, MEGA_MAN, WII_FIT_TRAINER, ROSALINA_AND_LUMA, LITTLE_MAC, GRENINJA, PALUTENA, PAC_MAN, ROBIN, SHULK, BOWSER_JR, DUCK_HUNT, RYU, KEN, CLOUD, CORRIN, BAYONETTA, INKLING, RIDLEY, SIMON, RICHTER, K_ROOL, ISABELLE, INCINEROAR, PIRAHNA_PLANT, MII_BRAWLER, MII_SWORDFIGHTER, MII_GUNNER];
  return FIGHTERS;
}