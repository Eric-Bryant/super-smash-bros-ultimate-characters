"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.onload = function () {
  var menu = document.querySelector('.menu-wrapper');
  var MARIO = new Character(1, 'Mario', 'Super Mario Bros.', 'mario.png');
  var DK = new Character(2, 'Donkey Kong', 'Donkey Kong', 'dk.png');
  var LINK = new Character(3, 'Link', 'The Legend of Zelda', 'link.png');
  var FIGHTERS = [MARIO, DK, LINK];
  menu.innerHTML = FIGHTERS.map(function (fighter) {
    return fighter.thumbnailHTML();
  });
};

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
      return "\n        <div class=\"fighter\">\n            <img src=\"".concat(this.thumbnail, "\"/>\n            <p>").concat(this.name, "</p>\n        </div>\n        ");
    }
  }]);

  return Character;
}();