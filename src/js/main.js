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
    const YOSHI = new Character(5, 'Yoshi', 'Yoshi', 'yoshi.png', 'Yoshi is all about egg-related moves, like throwing eggs, swallowing opponents and turning them into eggs, or turning into an egg and charging toward an opponent. With a high jump, recovery is a piece of cake for Yoshi! And for his Final Smash, a Yoshi army stampedes through the stage.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/bQsMQankmEs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'yoshi');
    const KIRBY = new Character(6, 'Kirby', 'Kirby', 'kirby.png', 'Kirby\'s ability to copy other fighters is totally unique! While he is light and can be launched easily, he can also jump up to five times in the air, so he has great recovery. Look for his new Stone transformation, too.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/1FPJs_c3qY4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'kirby');
    const FOX = new Character(7, 'Fox', 'Star Fox', 'fox.png', 'He made his first appearance in Star Fox, released in 1993. Fox is the leader of the mercenary group Star Fox. He cares about his team and has a strong sense of justice. Fun fact: Star Fox was the first game for the Super Nintendo Entertainment System™ that featured 3D graphics.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/Arw6c0dJHAE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'star-fox');
    const PIKACHU = new Character(8, 'Pikachu', 'Pokemon', 'pikachu.png', 'This fierce fighter uses electric moves like Thunder Jolt and Thunder. Pikachu Libre is one of the alternate costumes and you can tell she\'s female by the shape of her tail.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/7LfEvnLc3mI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'pokemon');
    const LUIGI = new Character(9, 'Luigi', 'Super Mario Bros.', 'luigi.png', 'He can jump higher than his brother, Mario. His Up Special, Super Jump Punch, will gain maximum damage and launching power when hitting the opponent right at the start. It truly is a "Special" move. He also uses his new Poltergust for his throw!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/LlNXKM3sHWU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mario');
    const NESS = new Character(10, 'Ness', 'Earthbound', 'ness.png', 'Ness has a variety of moves, from long-range attacks using psychic powers known as "PSI," to short-range attacks with his bat and yo-yo.  Ness can also unleash PK Thunder, a guided attack that can launch him like a rocket or help him recover!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/jtlUHmonMGQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'earthbound');
    const CAPTAIN_FALCON = new Character(11, 'Captain Falcon', 'F-Zero', 'captain-falcon.png', 'A fighter that possesses both speed and power! But in exchange, he is frequently left open. Being able to successfully land his neutral special, Falcon Punch, can greatly influence the battle in multiplayer matches.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/ayUTQsO6d1E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'f-zero');
    const JIGGLYPUFF = new Character(12, 'Jigglypuff', 'Pokemon', 'jigglypuff.png', 'Jigglypuff can jump 5 times in the air and can move faster in the air than on the ground. Use Jigglypuff\'s great aerial ability to overwhelm your opponent! If you manage to land the down special Rest, you can powerfully launch your opponent.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/IlojAAwCfoA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'pokemon');
    const PEACH = new Character(13, 'Peach', 'Super Mario Bros.', 'peach.png', 'THE super princess. Watch out for her powerful kicks while she\'s airborne. Using her down special, she picks vegetables and throws them at her opponents. Sometimes she even gets items...like a Bob-omb!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/ETVQLZV7J8g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mario');
    const DAISY = new Character(13.1, 'Daisy', 'Super Mario Bros.', 'daisy.png', 'Her basic move set is the same as Peach\'s, but this princess has her own unique personality. She\'s known for being upbeat, energetic, and a bit of a tomboy.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/YyzJnpX2ZcY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mario');
    const BOWSER = new Character(14, 'Bowser', 'Super Mario Bros.', 'bowser.png', 'Who\'s the greatest nemesis of all!? It\'s King Bowser! In Super Smash Bros. his power and weight make him a reliable fighter. Use his Fire Breath to keep opponents at bay, then use his damaging attacks to launch them off the stage! He transforms into Giga Bowser for his Final Smash and delivers a super powerful punch!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/liuwszyDhXM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mario');
    const ICE_CLIMBERS = new Character(15, 'Ice Climbers', 'Ice Climber', 'ice-climbers.png', 'Back in the battle after a ten-year absence! There are two of them, so does that make them twice as strong as other fighters?', '<iframe width="560" height="315" src="https://www.youtube.com/embed/FUzcsIjn4LY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'ice-climbers');
    const SHEIK = new Character(16, 'Sheik', 'The Legend of Zelda', 'sheik.png', 'Now Sheik joins the battle wearing the Sheikah costume from The Legend of Zelda: Breath of the Wild. Keep the pressure on your opponent by using his speedy dash to quickly close in on (or get away from) your opponent!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/cCQXBEiARns" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'tloz');
    const ZELDA = new Character(17, 'Zelda', 'The Legend of Zelda', 'zelda.png', 'You might recognize Zelda\'s look from The Legend of Zelda: A Link Between Worlds game. In battle she uses magical moves to reflect and teleport, and for her Final Smash, she seals her opponents away in the Triforce of Wisdom. If an opponent has 100% damage or more, they will be instantly KO\'d!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/fMDgFn3qQ_c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'tloz');
    const DR_MARIO = new Character(18, 'Dr. Mario', 'Super Mario Bros.', 'dr-mario.png', 'He has more attack and launch power than Mario, but his jump and recovery is not as good. Pro tip: You can repeatedly press the B button when using his down special, Dr. Tornado, to float a bit!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/w0qVpaEtEF4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mario');
    const PICHU = new Character(19, 'Pichu', 'Pokemon', 'pichu.png', 'Pichu is back after 17 years! Pichu\'s electric attacks have greater range and do more damage than its other attack types—but they also damage Pichu.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/9ZD89yfBCyE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'pokemon');
    const FALCO = new Character(20, 'Falco', 'Star Fox', 'falco.png', 'He\'s a talented aerial fighter with amazing jumping ability, but Falco is a bit slower on the ground. His final smash is an all-out attack using an unorthodox formation of Arwings!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/rJj9J5MW8xg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'star-fox');
    const MARTH = new Character(21, 'Marth', 'Fire Emblem', 'marth.png', 'Marth is an exceptional swordfighter with a long reach. He\'ll do the most damage with attacks using the tip of his sword, so spacing is an important factor.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/icuBIlBPYj0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'fire-emblem');
    const LUCINA = new Character(21.1, 'Lucina', 'Fire Emblem', 'lucina.png', 'Lucina is Marth\'s echo fighter, so she shares most of her standard and special attacks with Marth. However, while Marth\'s attacks are more powerful when made with the tip of his blade, Lucina\'s attacks just as powerful whether you use the tip or the base of the sword.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/vQqvKaCne4k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'fire-emblem');
    const YOUNG_LINK = new Character(22, 'Young Link', 'The Legend of Zelda', 'young-link.png', 'He\'s back after 17 years! Young Link is faster than Link but he\'s also lighter, making him easier to launch.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/qpzDPfCzB7g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'tloz');
    const GANONDORF = new Character(23, 'Ganondorf', 'The Legend of Zelda', 'ganondorf.png', 'His new design matches his appearance in The Legend of Zelda: Ocarina of Time! Now he uses his sword for all his smash attacks. He\'s a bit slimmer then he was before, but his Warlock Punch is devastating! For his final smash he transforms into Ganon, The Demon King and quickly charges forward.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/Q7pzoLQlrsM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'tloz');
    const MEWTWO = new Character(24, 'Mewtwo', 'Pokemon', 'mewtwo.png', 'A Legendary Pokémon known for its technical moves. Use Confusion or Disable as a diversion, then land a Shadow Ball! For its Final Smash, Mewtwo transforms into Mega Mewtwo Y and fires a projectile that freezes and launches the opponent!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/BcCpZHVIv9Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'pokemon');
    const ROY = new Character(25, 'Roy', 'Fire Emblem', 'roy.png', 'Get up close and personal for major damage! Unlike Marth, Roy\'s attacks are more powerful the closer you get to the base of his blade. For his Final Smash, his sword bursts into flame and sends anyone caught in the blast flying.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/FtDn6HBn_Qk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'fire-emblem');
    const CHROM = new Character(25.1, 'Chrom', 'Fire Emblem', 'chrom.png', 'The protagonist of Fire Emblem Awakening joins the battle as Roy\'s echo fighter. His Final Smash is Awakening Aether. Like Aether in the original game, this move has Chrom charge toward his opponent, slashing with his sword.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/733o521fbdE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'fire-emblem');
    const GAME_AND_WATCH = new Character(26, 'Mr. Game & Watch', 'Game & Watch', 'game-and-watch.png', 'When using his side special, Judge, this fighter pulls out a hammer and the numbers 1-9 are displayed. If you pull off a 9 attack, it will really knock the opponent back. His Final Smash turns him into an octopus that can pull opponents off the stage!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ic0xR07DhSY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'game-and-watch');
    const META_KNIGHT = new Character(27, 'Meta Knight', 'Kirby', 'meta-knight.png', 'This fighter not only has tons of quick moves, he can perform a midair jump five times! All his special moves have a recovery aspect, so use them at the right time. His Final Smash is Darkness Illusion, which unleashes a fast series of aerial attacks.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/A99IYmm50RY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'kirby');
    const PIT = new Character(28, 'Pit', 'Kid Icarus', 'pit.png', 'Pit is a well-balanced, well-rounded character with a defensive special that nullifies long distance attacks and excellent recovery. And did we mention he rides a chariot of light in his Final Smash? He\'s a great choice for new players!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/M_Pszs9I7S4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'kid-icarus');
    const DARK_PIT = new Character(28.1, 'Dark Pit', 'Kid Icarus', 'dark-pit.png', 'Dark Pit is Pit\'s echo fighter. His abilities are mostly the same as Pit\'s, but his hair and clothes are different colors, he summons different weapons, and celebrates victory to a different tune.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/q2hJjyP8FGA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'kid-icarus');
    const ZERO_SUIT_SAMUS = new Character(29, 'Zero Suit Samus', 'Metroid', 'zero-suit-samus.png', 'Although not as powerful as Samus, her speed is exceptional! Her Paralyzer not only has the ability to stun opponents, but it can also turn into a whip. For her Final Smash, she dons her suit and fires a powerful laser!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/Y4PTxiq11Fk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'metroid');
    const WARIO = new Character(30, 'Wario', 'WarioWare', 'wario.png', 'Wario has unique attacks, like using his Wario Bike and releasing noxious gas. He can jump higher than normal by leaping from his bike, which comes in handy when recovering. For his Final Smash, he turns into Wario-Man and creates copies of himself for an all-out attack!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/4lK7zkTInNA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'warioware');
    const SNAKE = new Character(31, 'Snake', 'Metal Gear Solid', 'snake.png', 'Back by popular demand, Snake brings a ranged fighting style unlike any other fighter in the game. His Final Smash locks onto an opponent and fires five homing missiles.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/7NLKrPYYQt0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mgs');
    const IKE = new Character(32, 'Ike', 'Fire Emblem', 'ike.png', 'Ike\'s side smash attack is extremely powerful, but it leaves him open, so you\'ll need to read your opponent\'s moves carefully. You can choose between his Path of Radiance and Radiant Dawn costumes.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/-aV6h3jWO6c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'fire-emblem');
    const POKEMON_TRAINER = new Character(33, 'Pokemon Trainer', 'Pokemon', 'pokemon-trainer.png', 'The trainer returns with Squirtle, Ivysaur, and Charizard. You can choose to play as a male or female trainer!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/dYpf9FoPN_M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'pokemon');
    const DIDDY_KONG = new Character(36, 'Diddy Kong', 'Donkey Kong', 'diddy-kong.png', 'Donkey Kong\'s trusty partner Diddy Kong uses his light weight and agility to get around quickly! For his Final Smash, Diddy takes to the air with his Rocketbarrel while firing his popguns. The final hit is seriously powerful!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/AjywYr-fuqY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'donkey-kong');
    const LUCAS = new Character(37, 'Lucas', 'Earthbound', 'lucas.png', 'Like Ness, Lucas is a young boy who uses PSI powers. Some of their PSI moves share the same names, but since Lucas has different abilities, the moves may work differently. Be sure to try them out! For his Final Smash, he calls down a shower of meteors along with Kumatora and Boney.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/GWjfyyGNL8c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'earthbound');
    const SONIC = new Character(38, 'Sonic', 'Sonic', 'sonic.png', 'This speedy fighter has a lot of rush-type attacks. His final smash, Super Sonic, lets him fly around the stage at an incredible speed!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/138MW7zOw0M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'sonic');
    const DDD = new Character(39, 'King DeDeDe', 'Kirby', 'ddd.png', 'He\'s not very fast, but he\'s one of few heavyweight fighters with great recovery.  Apparently, a defeat by Kirby inspired him to train hard to learn a move called Hovering, which allows him to float after taking a deep breath.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/bikxqlRPN64" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'kirby');
    const OLIMAR = new Character(40, 'Olimar', 'Pikmin', 'olimar.png', 'Captain Olimar battles by issuing commands to various types of Pikmin under his control. Pikmin come in different colors that correspond to different abilities. Olimar\'s alternate appearance lets you play as Alph!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/AFHgO8rMzcg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'pikmin');
    const LUCARIO = new Character(41, 'Lucario', 'Pokemon', 'lucario.png', 'Lucario is the only fighter whose attack power increases as it takes damage. A fighter that truly shines when in a pinch, choose Lucario for a thrilling battle.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/7gfpUgrLEwo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'pokemon');
    const ROB = new Character(42, 'R.O.B.', 'R.O.B.', 'rob.png', 'He has two powerful projectiles: Robo Beam and Gyro, along with a very effective recovery. The 1P color in the North American version of the game is a light gray, and the 2P is red and white, but this is reversed in the Japanese version.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/NqL7m9CuGD0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'rob');
    const TOON_LINK = new Character(43, 'Toon Link', 'The Legend of Zelda', 'toon-link.png', 'He\'s smaller and faster than Link. His bombs explode with a unique anime-style. For his Final Smash, he emits light from his left hand and any opponents hit by it are trapped in the Triforce, subject to a punishing gauntlet of attacks.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/62uBiZfw9w0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'tloz');
    const WOLF = new Character(44, 'Wolf', 'Star Fox', 'wolf.png', 'The leader of the Star Wolf mercenary team makes his grand return after 10 years! He puts his sharp claws to good use in wild attacks, and his Final Smash is an all-out attack by Team Star Wolf! If Fox or Falco is in the battle, you may hear a unique line of dialog.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/YLG2LGY95f4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'star-fox');
    const VILLAGER = new Character(45, 'Villager', 'Animal Crossing', 'villager.png', 'This fighter attacks using skills from daily life in the village, such as planting, growing, and cutting down trees. They can also use items like nets, slingshots, and turnips. The Villager can also put items or incoming projectiles in a pocket to use later.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/wY_wCijU1Pk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'animal-crossing');
    const MEGA_MAN = new Character(46, 'Mega Man', 'Mega Man', 'megaman.png', 'Mega Man\'s standard and special moves use weapons copied from the bosses he\'s fought throughout the Mega Man series, so he has more projectiles than any other fighter. His Final Smash now features Proto Man and Bass!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/m4632ulEnNc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'megaman');
    const WII_FIT_TRAINER = new Character(47, 'Wii Fit Trainer', 'Wii Fit', 'wii-fit-trainer.png', 'A fighter that attacks with healthy moves like stretching and yoga poses. You can pick between male and female versions. Charging up Sun Salutation all the way recovers a bit of health!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/kJbHRv4nCBw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'wii-fit');
    const ROSALINA_AND_LUMA = new Character(48, 'Rosalina & Luna', 'Super Mario Bros.', 'rosalina.png', 'Luma mimicks Rosalina\'s attacks. Luma also increases Rosalina\'s reach and can even take a hit for her! If Rosalina gets hit, Luma gets very flustered and flutters both hands.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/JX2mySkglVU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mario');
    const LITTLE_MAC = new Character(49, 'Little Mac', 'Punch-out', 'little-mac.png', 'As a boxer, Little Mac fights with his fists alone—no kicks! When his Power Meter fills up, he can use a special KO Uppercut, which can really turn a battle around. For his Final Smash, he turns into Giga Mac and pummels the opponent with a furious rush of punches!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/vBM09wj8xwE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'punch-out');
    const GRENINJA = new Character(50, 'Greninja', 'Pokemon', 'greninja.png', 'A ninja-like fighter that battles with moves like the Water Shuriken. Greninja can use a log for clever counterattacks, and this Pokémon can even stick to walls. During its Final Smash, it turns into Ash-Greninja...!?', '<iframe width="560" height="315" src="https://www.youtube.com/embed/rMCn8NuATaE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'pokemon');
    const MII_BRAWLER = new Character(51, 'Mii Brawler', 'Mii', 'mii-brawler.png', 'You can choose from the three types of Mii Fighter and select from a set of three specials for each type. You can also choose one of 12 voice options!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/qdSKO-mc2n8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mii');
    const MII_SWORDFIGHTER = new Character(52, 'Mii Swordfighter', 'Mii', 'mii-swordfighter.png', 'You can choose from the three types of Mii Fighter and select from a set of three specials for each type. You can also choose one of 12 voice options!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/qdSKO-mc2n8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mii');
    const MII_GUNNER = new Character(53, 'Mii Gunner', 'Mii', 'mii-gunner.png', 'You can choose from the three types of Mii Fighter and select from a set of three specials for each type. You can also choose one of 12 voice options!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/qdSKO-mc2n8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mii');
    const PALUTENA = new Character(54, 'Palutena', 'Kid Icarus', 'palutena.png', 'With her wings and staff, this goddess\'s attacks cover a wide range. With her up smash, neutral special, and side special, she can create a ranged attack in almost every direction except for directly beneath her! Keep the pressure on your opponents from a distance with ranged attacks!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/0yD_B4ZkdME" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'kid-icarus');
    const PAC_MAN = new Character(55, 'Pac-Man', 'Pac-Man', 'pacman.png', 'This fighter appears in both his classic form and his form with hands and legs. He has many unique special moves, such as using a trampoline or a fire hydrant. For his Final Smash, he grows into a giant Super PAC-MAN, chomping and launching his opponents!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/NPzo-TuH0C0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'pac-man');
    const ROBIN = new Character(56, 'Robin', 'Fire Emblem', 'robin.png', 'A fighter that wields the Levin Sword and four different Tomes! Like in the original game, these weapons can only be used a certain number of times, so keep a close eye on the battle situation. Both the male and female versions of Robin are available, so you can choose your favorite.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/QBxtnTgUwcM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'fire-emblem');
    const SHULK = new Character(57, 'Shulk', 'Xenoblade Chronicles', 'shulk.png', 'He is the only fighter that can change his status during battle. His sword, the Monado, allows him to switch between five modes—Jump, Speed, Shield, Buster and Smash—which change his abilities for a short time. Fun fact: Shulk\'s eighth color variation puts him in a pair of swimming trunks!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/XWeR6XmzZyI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'xenoblade-chronicles');
    const BOWSER_JR = new Character(58, 'Bowser Jr.', 'Super Mario Bros.', 'bowser-jr.png', 'The Jr. Clown Car this little fella rides in takes less damage when attacked than Bowser Jr. himself—so try to stay in the car when taking damage. The different color variations are the Koopalings!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/fZ2dm9EoJfE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mario');
    const DUCK_HUNT = new Character(59, 'Duck Hunt', 'Duck Hunt', 'duck-hunt.png', 'This duo excels at long-range attacks, like kicking exploding cans and throwing clay pigeons. For their Final Smash, three games from the Light Gun Series team up: Duck Hunt, Hogan\'s Alley, and Wild Gunman!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/anhjSVXYL6E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'duck-hunt');
    const RYU = new Character(60, 'Ryu', 'Street Fighter', 'ryu.png', 'Ryu is a special character—you can use directional command inputs to trigger his special moves. Executing moves like his Hadoken and Shoryuken using the command inputs from the original game will raise their power. You can even use a Shakunetsu Hadoken by inputting ←↙↓↘→ then tapping the attack button while facing right!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/9LAjpoI-ap8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'street-fighter');
    const KEN = new Character(60.1, 'Ken', 'Street Fighter', 'ken.png', 'Ken joins the battle as Ryu\'s Echo Fighter! Their differences are carried over from the original game: Ken\'s Hadoken is shaped differently, his strong Shoryuken has flames, and he moves a bit faster. He has two final smashes: Shinryuken and Shippu Jinraikyaku.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/9_tQRugeXik" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'street-fighter');
    const CLOUD = new Character(61, 'Cloud', 'Final Fantasy', 'cloud.png', 'He\'s the protagonist of Final Fantasy VII. You can also select his Advent Children outfit. Charging up his Limit Gauge increases his special move abilities! Land a powerful hit!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/hccjmuujoD4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'final-fantasy');
    const CORRIN = new Character(62, 'Corrin', 'Fire Emblem', 'corrin.png', 'Corrin was available as a downloadable fighter in the previous version of Super Smash Bros. This fighter uses all kinds of attacks, like Torrential Roar and Dragon Fang Shot. Players can choose male or female versions!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/7B4w2Tsy9PE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'fire-emblem');
    const BAYONETTA = new Character(63, 'Bayonetta', 'Bayonetta', 'bayonetta.png', 'An Umbra Witch who equips guns on her arms and legs, Bayonetta has mastered the beautiful but brutal Bullet Arts fighting style. She can even slow down her opponents with Witch Time!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/oYe8HpzYebg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'bayonetta');
    const INKLING = new Character(64, 'Inkling', 'Splatoon', 'inkling.png', 'Attacks with a variety of weapons. Covering opponents with ink leads to more and more damage—plus these Inklings are really fashionable!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/O4-7-bJWUsc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'splatoon');
    const RIDLEY = new Character(65, 'Ridley', 'Metroid', 'ridley.png', 'Joining the battle from the storied Metroid series, Ridley\'s long tail and sharp claws let him unleash a torrent of devastating attacks. His Final Smash is a powerful stream of plasma breath intense enough to bring down Samus\'s starship.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/EDi1Zf_vJsY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'metroid');
    const SIMON = new Character(66, 'Simon', 'Castlevania', 'simon.png', 'The protagonist of Castlevania. He uses his holy whip, Vampire Killer, to perform a smash attack with long reach. He also uses projectiles like an axe, holy water, and cross.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/RY7WL-n1atg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'castlevania');
    const RICHTER = new Character(66.1, 'Richter', 'Castlevania', 'richter.png', 'Richter from the Castlevania series joins the battle as Simon\'s echo fighter! His basic attacks are the same as Simon\'s, but with subtle variations. In addition to that, his holy water is a different color.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/ELrWbGScgwU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'castlevania');
    const K_ROOL = new Character(67, 'King K. Rool', 'Donkey Kong', 'k-rool.png', 'With long-distance special moves like the Blunderbuss, and counter moves like Stomach Attack, he is a versatile fighter. His Final Smash, Blast-O-Matic, was apparently a weapon created to destroy DK Island...', '<iframe width="560" height="315" src="https://www.youtube.com/embed/pKcXgSV8PTE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'donkey-kong');
    const ISABELLE = new Character(68, 'Isabelle', 'Animal Crossing', 'isabelle.png', 'Isabelle joins the battle from Animal Crossing: New Leaf! She uses various trinkets from around the village to battle. Her side special, "Fishing Rod," not only allows her to snag and bring opponents closer, it can also be used as a recovery move.', '<iframe width="560" height="315" src="https://www.youtube.com/embed/ML8fn3eInnc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'animal-crossing');
    const INCINEROAR = new Character(69, 'Incineroar', 'Pokemon', 'incineroar.png', 'A fighter with many special moves that appear to come from the world of pro wrestling. Incineroar has many moves from its original game, like Darkest Lariat, Cross Chop, and Revenge. Its Final Smash is Max Malicious Moonsault. Let the Z-Power explode and deliver a powerful blow!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/eE6Agn9d89U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'pokemon');
    const PIRAHNA_PLANT = new Character(70, 'Pirahna Plant', 'Super Mario Bros.', 'pirahna-plant.png', 'Piranha Plant Pipes Up!', '<iframe width="560" height="315" src="https://www.youtube.com/embed/3sZsk8VHY2g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'mario');
    const JOKER = new Character(71, 'Joker', 'Persona 5', 'joker.png', '', '<iframe width="560" height="315" src="https://www.youtube.com/embed/W4PG9qx9x2s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'persona');

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
        ISABELLE, INCINEROAR, PIRAHNA_PLANT, JOKER,
        MII_BRAWLER, MII_SWORDFIGHTER, MII_GUNNER
    ];

    return FIGHTERS;
}