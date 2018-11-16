window.onload = () => {
    const menu = document.querySelector('.menu-wrapper');

    // Array of Fighters
    const FIGHTERS = getFighters();
    // Display Fighters
    menu.innerHTML = FIGHTERS.map(fighter => {
        return fighter.thumbnailHTML();
    }).join('');

    applySelectedFrame();
}

function getFighters() {
    // Create Fighters
    const MARIO = new Character(1, 'Mario', 'Super Mario Bros.', 'mario.png');
    const DK = new Character(2, 'Donkey Kong', 'Donkey Kong', 'dk.png');
    const LINK = new Character(3, 'Link', 'The Legend of Zelda', 'link.png');
    const SAMUS = new Character(4, 'Samus', 'Metroid', 'samus.png');
    const DARK_SAMUS = new Character(4.1, 'Dark Samus', 'Metroid', 'dark-samus.png');
    const YOSHI = new Character(5, 'Yoshi', 'Super Mario Bros.', 'yoshi.png');
    const KIRBY = new Character(6, 'Kirby', 'Kirby', 'kirby.png');
    const FOX = new Character(7, 'Fox', 'Star Fox', 'fox.png');
    const PIKACHU = new Character(8, 'Pikachu', 'Pokemon', 'pikachu.png');
    const LUIGI = new Character(9, 'Luigi', 'Super Mario Bros.', 'luigi.png');
    const NESS = new Character(10, 'Ness', 'Earthbound', 'ness.png');
    const CAPTAIN_FALCON = new Character(11, 'Captain Falcon', 'F-Zero', 'captain-falcon.png');
    const JIGGLYPUFF = new Character(12, 'Jigglypuff', 'Pokemon', 'jigglypuff.png');
    const PEACH = new Character(13, 'Peach', 'Super Mario Bros.', 'peach.png');
    const DAISY = new Character(13.1, 'Daisy', 'Super Mario Bros.', 'daisy.png');
    const BOWSER = new Character(14, 'Bowser', 'Super Mario Bros.', 'bowser.png');
    const ICE_CLIMBERS = new Character(15, 'Ice Climbers', 'Ice Climbers', 'ice-climbers.png');
    const SHEIK = new Character(16, 'Sheik', 'The Legend of Zelda', 'sheik.png');
    const ZELDA = new Character(17, 'Zelda', 'The Legend of Zelda', 'zelda.png');
    const DR_MARIO = new Character(18, 'Dr. Mario', 'Super Mario Bros.', 'dr-mario.png');
    const PICHU = new Character(19, 'Pichu', 'Pokemon', 'pichu.png');
    const FALCO = new Character(20, 'Falco', 'Star Fox', 'falco.png');
    const MARTH = new Character(21, 'Marth', 'Fire Emblem', 'marth.png');
    const LUCINA = new Character(21.1, 'Lucina', 'Fire Emblem', 'lucina.png');
    const YOUNG_LINK = new Character(22, 'Young Link', 'The Legend of Zelda', 'young-link.png');
    const GANONDORF = new Character(23, 'Ganondorf', 'The Legend of Zelda', 'ganondorf.png');
    const MEWTWO = new Character(24, 'Mewtwo', 'Pokemon', 'mewtwo.png');
    const ROY = new Character(25, 'Roy', 'Fire Emblem', 'roy.png');
    const CHROM = new Character(25.1, 'Chrom', 'Fire Emblem', 'chrom.png');
    const GAME_AND_WATCH = new Character(26, 'Mr. Game & Watch', 'Game & Watch', 'game-and-watch.png');
    const META_KNIGHT = new Character(27, 'Meta Knight', 'Kirby', 'meta-knight.png');
    const PIT = new Character(28, 'Pit', 'Kid Icarus', 'pit.png');
    const DARK_PIT = new Character(28.1, 'Dark Pit', 'Kid Icarus', 'dark-pit.png');
    const ZERO_SUIT_SAMUS = new Character(29, 'Zero Suit Samus', 'Metroid', 'zero-suit-samus.png');
    const WARIO = new Character(30, 'Wario', 'Super Mario Bros.', 'wario.png');
    const SNAKE = new Character(31, 'Snake', 'Metal Gear Solid', 'snake.png');
    const IKE = new Character(32, 'Ike', 'Fire Emblem', 'ike.png');
    const POKEMON_TRAINER = new Character(33, 'Pokemon Trainer', 'Pokemon', 'pokemon-trainer.png');
    const DIDDY_KONG = new Character(36, 'Diddy Kong', 'Donkey Kong', 'diddy-kong.png');
    const LUCAS = new Character(37, 'Lucas', 'Earthbound', 'lucas.png');
    const SONIC = new Character(38, 'Sonic', 'Sonic', 'sonic.png');
    const DDD = new Character(39, 'King DeDeDe', 'Kirby', 'ddd.png');
    const OLIMAR = new Character(40, 'Olimar', 'Pikmin', 'olimar.png');
    const LUCARIO = new Character(41, 'Lucario', 'Pokemon', 'lucario.png');
    const ROB = new Character(42, 'R.O.B.', 'N/A', 'rob.png');
    const TOON_LINK = new Character(43, 'Toon Link', 'The Legend of Zelda', 'toon-link.png');
    const WOLF = new Character(44, 'Wolf', 'Star Fox', 'wolf.png');
    const VILLAGER = new Character(45, 'Villager', 'Animal Crossing', 'villager.png');
    const MEGA_MAN = new Character(46, 'Mega Man', 'Mega Man', 'megaman.png');
    const WII_FIT_TRAINER = new Character(47, 'Wii Fit Trainer', 'N/A', 'wii-fit-trainer.png');
    const ROSALINA_AND_LUMA = new Character(48, 'Rosalina & Luna', 'Super Mario Bros.', 'rosalina.png');
    const LITTLE_MAC = new Character(49, 'Little Mac', 'Punch-out', 'little-mac.png');
    const GRENINJA = new Character(50, 'Greninja', 'Pokemon', 'greninja.png');
    const MII_BRAWLER = new Character(51, 'Mii Brawler', 'N/A', 'mii-brawler.png');
    const MII_SWORDFIGHTER = new Character(52, 'Mii Swordfighter', 'N/A', 'mii-swordfighter.png');
    const MII_GUNNER = new Character(53, 'Mii Gunner', 'N/A', 'mii-gunner.png');
    const PALUTENA = new Character(54, 'Palutena', 'Kid Icarus', 'palutena.png');
    const PAC_MAN = new Character(55, 'Pac-Man', 'Pac-Man', 'pacman.png');
    const ROBIN = new Character(56, 'Robin', 'Fire Emblem', 'robin.png');
    const SHULK = new Character(57, 'Shulk', 'Xenoblade Chronicles', 'shulk.png');
    const BOWSER_JR = new Character(58, 'Bowser Jr.', 'Super Mario Bros.', 'bowser-jr.png');
    const DUCK_HUNT = new Character(59, 'Duck Hunt', 'Duck Hunt', 'duck-hunt.png');
    const RYU = new Character(60, 'Ryu', 'Street Fighter', 'ryu.png');
    const KEN = new Character(60.1, 'Ken', 'Street Fighter', 'ken.png');
    const CLOUD = new Character(61, 'Cloud', 'Final Fantasy', 'cloud.png');
    const CORRIN = new Character(62, 'Corrin', 'Fire Emblem', 'corrin.png');
    const BAYONETTA = new Character(63, 'Bayonetta', 'Bayonetta', 'bayonetta.png');
    const INKLING = new Character(64, 'Inkling', 'Splatoon', 'inkling.png');
    const RIDLEY = new Character(65, 'Ridley', 'Metroid', 'ridley.png');
    const SIMON = new Character(66, 'Simon', 'Castlevania', 'simon.png');
    const RICHTER = new Character(66.1, 'Richter', 'Castlevania', 'richter.png');
    const K_ROOL = new Character(67, 'King K. Rool', 'Donkey Kong', 'k-rool.png');
    const ISABELLE = new Character(68, 'Isabelle', 'Animal Crossing', 'isabelle.png');
    const INCINEROAR = new Character(69, 'Incineroar', 'Pokemon', 'incineroar.png');
    const PIRAHNA_PLANT = new Character(70, 'Pirahna Plant', 'Super Mario Bros.', 'pirahna-plant.png');

    // Array of Fighters for Display Purposes

    const FIGHTERS = [
        MARIO, DK, LINK, SAMUS,
        DARK_SAMUS, YOSHI, KIRBY,
        FOX, PIKACHU, LUIGI, NESS,
        CAPTAIN_FALCON, JIGGLYPUFF,
        PEACH, DAISY, BOWSER, ICE_CLIMBERS,
        SHEIK, ZELDA, DR_MARIO, PICHU,
        FALCO, MARTH, LUCINA, YOUNG_LINK,
        GANONDORF, MEWTWO, ROY, CHROM,
        GAME_AND_WATCH, META_KNIGHT, PIT,
        DARK_PIT, ZERO_SUIT_SAMUS, WARIO,
        SNAKE, IKE, POKEMON_TRAINER,
        DIDDY_KONG, LUCAS, SONIC,
        DDD, OLIMAR, LUCARIO, ROB,
        TOON_LINK, WOLF, VILLAGER, MEGA_MAN,
        WII_FIT_TRAINER, ROSALINA_AND_LUMA,
        LITTLE_MAC, GRENINJA,
        PALUTENA, PAC_MAN, ROBIN, SHULK,
        BOWSER_JR, DUCK_HUNT, RYU, KEN,
        CLOUD, CORRIN, BAYONETTA, INKLING,
        RIDLEY, SIMON, RICHTER, K_ROOL,
        ISABELLE, INCINEROAR, PIRAHNA_PLANT,
        MII_BRAWLER, MII_SWORDFIGHTER, MII_GUNNER
    ];

    return FIGHTERS;
}

//Sort Fighter by Order of Appearance in Smash Series
function sortByID(a, b) {
    return a.id - b.id;
}

//Sort Fighter by Name or Franchise Alphabetically
function sortBy(type) {
    return function (a, b) {
        let textA, textB;
        if (type == 'name') {
            textA = a.name.toUpperCase();
            textB = b.name.toUpperCase();
        } else if (type == 'franchise') {
            textA = a.franchise.toUpperCase();
            textB = b.franchise.toUpperCase();
        }
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }
}

// Sort Fighters by Franchise
function showFranchiseOnly(fighters, franch) {
    const sorted = fighters.filter(fighter => {
        return fighter.franchise == franch;
    });

    return sorted;
}

/*
============================
BREAK UP THIS WHOLE FUNCTION
============================
*/
function applySelectedFrame() {
    const fighterFrames = Array.from(document.querySelectorAll('.fighter'));
    fighterFrames
        .map(frame => {
            frame.addEventListener('click', function () {
                // Check if other fighters are already selected, remove if they are
                Array
                    .from(document.querySelectorAll('.fighter'))
                    .map(char => {
                        if (char.classList.contains('selected') && char != frame) {
                            char.classList.remove('selected');
                        }
                    });

                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                } else {
                    this.classList.add('selected');
                }

                // Use this for announcers
                const announcer = new Audio(`media/sounds/${this.dataset.name}.wav`);
                announcer.play();
            });
        });
}

class Character {
    constructor(id, name, franchise, thumbnail) {
        this.id = id;
        this.name = name;
        this.franchise = franchise;
        this.thumbnail = `media/thumbnails/${thumbnail}`;
    }

    thumbnailHTML() {
        return `<div class="fighter" data-name="${this.name}" data-franchise="${this.franchise}">
                    <img src="${this.thumbnail}"/>
                    <p>${this.name}</p>
                </div>`;
    }
}