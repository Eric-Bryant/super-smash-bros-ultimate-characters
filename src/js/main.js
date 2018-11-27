window.onload = () => {
    const sortResetBtn = document.querySelector('#sort-reset');
    const sortNumberBtn = document.querySelector('#sort-number');
    const sortNameBtn = document.querySelector('#sort-name');
    const sortFranchiseBtn = document.querySelector('#sort-franchise');
    const filterFranchiseBtn = document.querySelector('#filter-franchise');
    const filterFranchDropdown = document.querySelector('.franchise-dropdown');
    // const selectSound = new Audio('media/sounds/select.wav');
    const selectSound = new Audio('');

    addFranchisesToDropdown(filterFranchDropdown);

    renderFighters(getFighters());
    frameController(selectSound);
    setTimeout(() => {
        rearrangeFighters('show');
    }, 50);

    sortResetBtn.addEventListener('click', () => {
        rearrangeFighters('hide');
        setTimeout(() => {
            renderFighters(getFighters());
            frameController(selectSound);
            setTimeout(() => {
                rearrangeFighters('show');
            }, 50);
        }, 550);
        selectSound.play();
        filterFranchDropdown.style.height = "0px";
    });

    sortNumberBtn.addEventListener('click', () => {
        rearrangeFighters('hide');
        setTimeout(() => {
            renderFighters(getFighters().sort(sortByID));
            frameController(selectSound);
            setTimeout(() => {
                rearrangeFighters('show');
            }, 50);
        }, 550);
        selectSound.play();
        filterFranchDropdown.style.height = "0px";
    });

    sortNameBtn.addEventListener('click', () => {
        rearrangeFighters('hide');
        setTimeout(() => {
            renderFighters(getFighters().sort(sortBy('name')));
            frameController(selectSound);
            setTimeout(() => {
                rearrangeFighters('show');
            }, 50);
        }, 550);
        selectSound.play();
        filterFranchDropdown.style.height = "0px";
    });

    filterFranchiseBtn.addEventListener('click', () => {
        const listItems = Array.from(document.querySelectorAll('.franchise-dropdown li'));
        selectSound.play();
        filterFranchDropdown.style.height = "300px";
        setTimeout(() => {
            listItems.map(item => {
                item.style.display = "block";
            });
        }, 300);

        // clean up selectSound
        filterFranchiseEvents(selectSound, filterFranchDropdown);
    });

    sortFranchiseBtn.addEventListener('click', () => {
        rearrangeFighters('hide');
        setTimeout(() => {
            renderFighters(getFighters().sort(sortBy('franchise')));
            frameController(selectSound);
            setTimeout(() => {
                rearrangeFighters('show');
            }, 50);
        }, 550);
        selectSound.play();
        filterFranchDropdown.style.height = "0px";
    });
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

// Event Listener
function frameController(selectSound) {
    const fighters = Array.from(document.querySelectorAll('.fighter'));
    fighters
        .map(fighter => {
            fighter.addEventListener('click', () => {
                deselectFighters(fighter);
                applySelected(fighter);
                playAnnouncer(fighter);
                renderPortrait(fighter);
                openModal();
                selectSound.play();
            });
        });
}

function renderPortrait(fighter) {
    const fighterFrame = document.querySelector('.character-portrait');
    const fighters = getFighters();
    fighters.map(char => {
        if (char.name == fighter.dataset.name) {
            fighterFrame.innerHTML = char.portraitHTML();
        }
    });
    fighterFrame.style.opacity = "1";
}

function openModal() {
    const modalBtn = document.querySelector('#modal-btn');
    const fighterName = modalBtn.dataset.name;
    const modalBg = document.querySelector('.modal-bg');
    const modal = document.querySelector('.modal');
    modalBtn.addEventListener('click', () => {
        modalBg.style.zIndex = "9999";
        modalBg.style.opacity = "1";
        modal.style.transform = 'scale(1)';
        renderModalInfo(fighterName);
        closeModal();
    });
}

function renderModalInfo(fighter) {
    const modal = document.querySelector('.modal');
    modal.innerHTML = getFighters().map(char => {
        if (fighter == char.name) {
            return char.moreInfo();
        }
    }).join('');
}

function closeModal() {
    const modalBg = document.querySelector('.modal-bg');
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.close-btn');

    modalBg.addEventListener('click', closeOutside);
    closeBtn.addEventListener('click', close);

    function close() {
        modal.style.transform = 'scale(0)';
        modalBg.style.opacity = "0";
        modalBg.style.zIndex = "-1";
        modalBg.removeEventListener('click', closeOutside);
        closeBtn.removeEventListener('click', close);
    }

    function closeOutside(e) {
        if (e.target.className.includes('modal-bg')) {
            modal.style.transform = 'scale(0)';
            modalBg.style.opacity = "0";
            modalBg.style.zIndex = "-1";
            modalBg.removeEventListener('click', closeOutside);
        }
    }
}

// Deselect fighters when another is selected
function deselectFighters(fighter) {
    Array
        .from(document.querySelectorAll('.fighter'))
        .map(char => {
            if (char.classList.contains('selected') && char != fighter) {
                char.classList.remove('selected');
            }
        });
}

// Apply selected styling
function applySelected(fighter) {
    if (fighter.classList.contains('selected')) {
        fighter.classList.remove('selected');
    } else {
        fighter.classList.add('selected');
    }
}

//Rearrange fighters with animation
function rearrangeFighters(type) {

    const fighters = Array.from(document.querySelectorAll('.fighter'));

    if (type == 'hide') {
        fighters.map(fighter => {
            if ((fighter.dataset.id > 0 && fighter.dataset.id <= 12) ||
                (fighter.dataset.id > 23 && fighter.dataset.id <= 36) ||
                (fighter.dataset.id > 49 && fighter.dataset.id <= 64)) {
                fighter.style.transform = 'translateX(100vw)';
            } else if ((fighter.dataset.id > 12 && fighter.dataset.id <= 23) ||
                (fighter.dataset.id > 36 && fighter.dataset.id <= 49) ||
                (fighter.dataset.id > 64)) {
                fighter.style.transform = 'translateX(-100vw)';
            }
        });
    } else if (type == 'show') {
        fighters.map(fighter => {
            if ((fighter.dataset.id > 0 && fighter.dataset.id <= 12) ||
                (fighter.dataset.id > 23 && fighter.dataset.id <= 36) ||
                (fighter.dataset.id > 49 && fighter.dataset.id <= 64)) {
                fighter.style.transform = 'translateX(0)';
            } else if ((fighter.dataset.id > 12 && fighter.dataset.id <= 23) ||
                (fighter.dataset.id > 36 && fighter.dataset.id <= 49) ||
                (fighter.dataset.id > 64)) {
                fighter.style.transform = 'translateX(0)';
            }
        });
    }
}

function playAnnouncer(fighter) {
    const announcer = new Audio(`media/sounds/${fighter.dataset.name}.wav`);
    if (fighter.classList.contains('selected')) {
        announcer.play();
    }
}

function renderFighters(fighters) {
    const menu = document.querySelector('.menu-wrapper');

    menu.innerHTML = fighters.map((fighter, index) => {
        return fighter.thumbnailHTML();
    }).join('');
}

// Clean up shit with select sound
function filterFranchiseEvents(selectSound, franchiseDropdown) {
    const franchises = Array.from(document.querySelectorAll('.franchise-dropdown li'));
    franchises.map(franchise => {
        franchise.addEventListener('click', () => {
            rearrangeFighters('hide')
            setTimeout(() => {
                renderFighters(showFranchiseOnly(getFighters(), franchise.dataset.franchises));
                frameController(selectSound);
                setTimeout(() => {
                    rearrangeFighters('show');
                }, 50);
            }, 550);
            selectSound.play();
            franchiseDropdown.style.height = "0px";
        });
    });
}

function addFranchisesToDropdown(filterFranchiseDropdown) {
    const franchises = getUniqueFranchises().sort();
    filterFranchiseDropdown.innerHTML += franchises.map(franchise => {
        return `<li data-franchises="${franchise}">${franchise}</li>`;
    }).join('');
}

function getUniqueFranchises() {
    const fighters = getFighters();
    const franchises = [];

    fighters
        .map(fighter => {
            if (franchises.indexOf(fighter.franchise) < 0) {
                franchises.push(fighter.franchise);
            }
        });

    return franchises;
}

// ===============================================================================================================================================================

class Character {
    constructor(id, name, franchise, picture, bio, video, logo) {
        this.id = id;
        this.name = name;
        this.franchise = franchise;
        this.picture = `media/thumbnails/${picture}`;
        this.selectedPicture = `media/characters/${picture}`;
        this.bio = bio;
        this.video = video;
        this.logo = `media/logos/${logo}.png`;
    }

    thumbnailHTML() {
        return `<div class="fighter" data-id="${this.id}" data-name="${this.name}" data-franchise="${this.franchise}">
                    <img src="${this.picture}"/>
                    <p>${this.name}</p>
                </div>`;
    }

    portraitHTML() {
        return `<div class="selected-fighter">
                    <img src="${this.selectedPicture}"/>
                    <p>${this.name}</p>
                    <p data-name="${this.name}" id="modal-btn">Info</p>
                </div>`;
    }

    moreInfo() {
        return `<div class="close-btn">X</div>
                    <div class="info">
                        <h2>${this.name}</h2>
                        <img src="${this.selectedPicture}"/>
                        <p>${this.bio}</p>
                     </div>
                    <div class="video-logo">
                        <img src="${this.logo}" />
                        ${this.video}
                    </div>`;
    }
}

function getFighters() {
    // Create Fighters
    const MARIO = new Character(1, 'Mario', 'Super Mario Bros.',
        'mario.png', 'Mario is an all-around fighter who uses his wide variety of techniques to respond to any situation. In Super Smash Bros. Ultimate, he shows up in his Wedding tux and his Builder outfit, and Cappy even makes an appearance!',
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/INk1W8OujQI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;" allowfullscreen></iframe>', 'mario');
    const DK = new Character(2, 'Donkey Kong', 'Donkey Kong', 'dk.png', 'His charged punch is one of the strongest attacks in the game! In Super Smash Bros. Ultimate, his Final Smash has been updated from Konga Beat to a flurry of punches!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/K7IsUGeFXP0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'donkey-kong');
    const LINK = new Character(3, 'Link', 'The Legend of Zelda', 'link.png', 'Link has been redesigned to match his appearance in The Legend of Zelda: Breath of the Wild. He can now pick up arrows he\'s fired, and his bombs have been upgraded to remote bombs, so you can set them off when the timing is just right!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/kfeUdBi67G4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'tloz');
    const SAMUS = new Character(4, 'Samus', 'Metroid', 'samus.png', 'With her Charge Shot, Missile, and Bomb, Samus has three different projectiles to keep her opponents in check from a distance. When fully charged up, her Charge Shot is quite powerful. For her Final Smash, she launches a wide laser beam that can be moved up and down!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/I9tcvSeemVo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'metroid');
    const DARK_SAMUS = new Character(4.1, 'Dark Samus', 'Metroid', 'dark-samus.png', 'Dark Samus joins the battle as Samus\'s echo fighter.With floatier movement, she\'s a little different from Samus--and she doesn\'t roll when dodging or jumping. If you look closely, you can see that her bombs and missiles look a little different, too.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/sXG-oI6VChg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'metroid');
    const YOSHI = new Character(5, 'Yoshi', 'Yoshi', 'yoshi.png', '', '', 'yoshi');
    const KIRBY = new Character(6, 'Kirby', 'Kirby', 'kirby.png', 'Kirby\'s ability to copy other fighters is totally unique! While he is light and can be launched easily, he can also jump up to five times in the air, so he has great recovery. Look for his new Stone transformation, too.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/1FPJs_c3qY4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'kirby');
    const FOX = new Character(7, 'Fox', 'Star Fox', 'fox.png', 'He made his first appearance in Star Fox, released in 1993. Fox is the leader of the mercenary group Star Fox. He cares about his team and has a strong sense of justice. Fun fact: Star Fox was the first game for the Super Nintendo Entertainment System™ that featured 3D graphics.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/Arw6c0dJHAE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'star-fox');
    const PIKACHU = new Character(8, 'Pikachu', 'Pokemon', 'pikachu.png', 'This fierce fighter uses electric moves like Thunder Jolt and Thunder. Pikachu Libre is one of the alternate costumes and you can tell she\'s female by the shape of her tail.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/7LfEvnLc3mI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'pokemon');
    const LUIGI = new Character(9, 'Luigi', 'Super Mario Bros.', 'luigi.png', 'He can jump higher than his brother, Mario. His Up Special, Super Jump Punch, will gain maximum damage and launching power when hitting the opponent right at the start. It truly is a "Special" move. He also uses his new Poltergust for his throw!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/LlNXKM3sHWU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mario');
    const NESS = new Character(10, 'Ness', 'Earthbound', 'ness.png', 'Ness has a variety of moves, from long-range attacks using psychic powers known as "PSI," to short-range attacks with his bat and yo-yo.  Ness can also unleash PK Thunder, a guided attack that can launch him like a rocket or help him recover!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/jtlUHmonMGQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'earthbound');
    const CAPTAIN_FALCON = new Character(11, 'Captain Falcon', 'F-Zero', 'captain-falcon.png', 'A fighter that possesses both speed and power! But in exchange, he is frequently left open. Being able to successfully land his neutral special, Falcon Punch, can greatly influence the battle in multiplayer matches.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/ayUTQsO6d1E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'f-zero');
    const JIGGLYPUFF = new Character(12, 'Jigglypuff', 'Pokemon', 'jigglypuff.png', 'Jigglypuff can jump 5 times in the air and can move faster in the air than on the ground. Use Jigglypuff\'s great aerial ability to overwhelm your opponent! If you manage to land the down special Rest, you can powerfully launch your opponent.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/IlojAAwCfoA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'pokemon');
    const PEACH = new Character(13, 'Peach', 'Super Mario Bros.', 'peach.png', '', '', 'mario');
    const DAISY = new Character(13.1, 'Daisy', 'Super Mario Bros.', 'daisy.png', '', '', 'mario');
    const BOWSER = new Character(14, 'Bowser', 'Super Mario Bros.', 'bowser.png', '', '', 'mario');
    const ICE_CLIMBERS = new Character(15, 'Ice Climbers', 'Ice Climber', 'ice-climbers.png', '', '', 'ice-climbers');
    const SHEIK = new Character(16, 'Sheik', 'The Legend of Zelda', 'sheik.png', '', '', 'tloz');
    const ZELDA = new Character(17, 'Zelda', 'The Legend of Zelda', 'zelda.png', '', '', 'tloz');
    const DR_MARIO = new Character(18, 'Dr. Mario', 'Super Mario Bros.', 'dr-mario.png', '', '', 'mario');
    const PICHU = new Character(19, 'Pichu', 'Pokemon', 'pichu.png', '', '', 'pokemon');
    const FALCO = new Character(20, 'Falco', 'Star Fox', 'falco.png', '', '', 'star-fox');
    const MARTH = new Character(21, 'Marth', 'Fire Emblem', 'marth.png', '', '', 'fire-emblem');
    const LUCINA = new Character(21.1, 'Lucina', 'Fire Emblem', 'lucina.png', '', '', 'fire-emblem');
    const YOUNG_LINK = new Character(22, 'Young Link', 'The Legend of Zelda', 'young-link.png', '', '', 'tloz');
    const GANONDORF = new Character(23, 'Ganondorf', 'The Legend of Zelda', 'ganondorf.png', '', '', 'tloz');
    const MEWTWO = new Character(24, 'Mewtwo', 'Pokemon', 'mewtwo.png', '', '', 'pokemon');
    const ROY = new Character(25, 'Roy', 'Fire Emblem', 'roy.png', '', '', 'fire-emblem');
    const CHROM = new Character(25.1, 'Chrom', 'Fire Emblem', 'chrom.png', '', '', 'fire-emblem');
    const GAME_AND_WATCH = new Character(26, 'Mr. Game & Watch', 'Game & Watch', 'game-and-watch.png', '', '', 'game-and-watch');
    const META_KNIGHT = new Character(27, 'Meta Knight', 'Kirby', 'meta-knight.png', '', '', 'kirby');
    const PIT = new Character(28, 'Pit', 'Kid Icarus', 'pit.png', '', '', 'kid-icarus');
    const DARK_PIT = new Character(28.1, 'Dark Pit', 'Kid Icarus', 'dark-pit.png', '', '', 'kid-icarus');
    const ZERO_SUIT_SAMUS = new Character(29, 'Zero Suit Samus', 'Metroid', 'zero-suit-samus.png', '', '', 'metroid');
    const WARIO = new Character(30, 'Wario', 'WarioWare', 'wario.png', '', '', 'warioware');
    const SNAKE = new Character(31, 'Snake', 'Metal Gear Solid', 'snake.png', '', '', 'mgs');
    const IKE = new Character(32, 'Ike', 'Fire Emblem', 'ike.png', '', '', 'fire-emblem');
    const POKEMON_TRAINER = new Character(33, 'Pokemon Trainer', 'Pokemon', 'pokemon-trainer.png', '', '', 'pokemon');
    const DIDDY_KONG = new Character(36, 'Diddy Kong', 'Donkey Kong', 'diddy-kong.png', '', '', 'donkey-kong');
    const LUCAS = new Character(37, 'Lucas', 'Earthbound', 'lucas.png', '', '', 'earthbound');
    const SONIC = new Character(38, 'Sonic', 'Sonic', 'sonic.png', '', '', 'sonic');
    const DDD = new Character(39, 'King DeDeDe', 'Kirby', 'ddd.png', '', '', 'kirby');
    const OLIMAR = new Character(40, 'Olimar', 'Pikmin', 'olimar.png', '', '', 'pikmin');
    const LUCARIO = new Character(41, 'Lucario', 'Pokemon', 'lucario.png', '', '', 'pokemon');
    const ROB = new Character(42, 'R.O.B.', 'R.O.B.', 'rob.png', '', '', 'rob');
    const TOON_LINK = new Character(43, 'Toon Link', 'The Legend of Zelda', 'toon-link.png', '', '', 'tloz');
    const WOLF = new Character(44, 'Wolf', 'Star Fox', 'wolf.png', '', '', 'star-fox');
    const VILLAGER = new Character(45, 'Villager', 'Animal Crossing', 'villager.png', '', '', 'animal-crossing');
    const MEGA_MAN = new Character(46, 'Mega Man', 'Mega Man', 'megaman.png', '', '', 'megaman');
    const WII_FIT_TRAINER = new Character(47, 'Wii Fit Trainer', 'Wii Fit', 'wii-fit-trainer.png', '', '', 'wii-fit');
    const ROSALINA_AND_LUMA = new Character(48, 'Rosalina & Luna', 'Super Mario Bros.', 'rosalina.png', '', '', 'mario');
    const LITTLE_MAC = new Character(49, 'Little Mac', 'Punch-out', 'little-mac.png', '', '', 'punch-out');
    const GRENINJA = new Character(50, 'Greninja', 'Pokemon', 'greninja.png', '', '', 'pokemon');
    const MII_BRAWLER = new Character(51, 'Mii Brawler', 'Mii', 'mii-brawler.png', '', '', 'mii');
    const MII_SWORDFIGHTER = new Character(52, 'Mii Swordfighter', 'Mii', 'mii-swordfighter.png', '', '', 'mii');
    const MII_GUNNER = new Character(53, 'Mii Gunner', 'Mii', 'mii-gunner.png', '', '', 'mii');
    const PALUTENA = new Character(54, 'Palutena', 'Kid Icarus', 'palutena.png', '', '', 'kid-icarus');
    const PAC_MAN = new Character(55, 'Pac-Man', 'Pac-Man', 'pacman.png', '', '', 'pac-man');
    const ROBIN = new Character(56, 'Robin', 'Fire Emblem', 'robin.png', '', '', 'fire-emblem');
    const SHULK = new Character(57, 'Shulk', 'Xenoblade Chronicles', 'shulk.png', '', '', 'xenoblade-chronicles');
    const BOWSER_JR = new Character(58, 'Bowser Jr.', 'Super Mario Bros.', 'bowser-jr.png', '', '', 'mario');
    const DUCK_HUNT = new Character(59, 'Duck Hunt', 'Duck Hunt', 'duck-hunt.png', '', '', 'duck-hunt');
    const RYU = new Character(60, 'Ryu', 'Street Fighter', 'ryu.png', '', '', 'street-fighter');
    const KEN = new Character(60.1, 'Ken', 'Street Fighter', 'ken.png', '', '', 'street-fighter');
    const CLOUD = new Character(61, 'Cloud', 'Final Fantasy', 'cloud.png', '', '', 'final-fantasy');
    const CORRIN = new Character(62, 'Corrin', 'Fire Emblem', 'corrin.png', '', '', 'fire-emblem');
    const BAYONETTA = new Character(63, 'Bayonetta', 'Bayonetta', 'bayonetta.png', '', '', 'bayonetta');
    const INKLING = new Character(64, 'Inkling', 'Splatoon', 'inkling.png', '', '', 'splatoon');
    const RIDLEY = new Character(65, 'Ridley', 'Metroid', 'ridley.png', '', '', 'metroid');
    const SIMON = new Character(66, 'Simon', 'Castlevania', 'simon.png', '', '', 'castlevania');
    const RICHTER = new Character(66.1, 'Richter', 'Castlevania', 'richter.png', '', '', 'castlevania');
    const K_ROOL = new Character(67, 'King K. Rool', 'Donkey Kong', 'k-rool.png', '', '', 'donkey-kong');
    const ISABELLE = new Character(68, 'Isabelle', 'Animal Crossing', 'isabelle.png', '', '', 'animal-crossing');
    const INCINEROAR = new Character(69, 'Incineroar', 'Pokemon', 'incineroar.png', '', '', 'pokemon');
    const PIRAHNA_PLANT = new Character(70, 'Pirahna Plant', 'Super Mario Bros.', 'pirahna-plant.png', '', '', 'mario');

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