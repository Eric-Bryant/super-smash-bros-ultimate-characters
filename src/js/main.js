window.onload = () => {
    const menu = document.querySelector('.menu-wrapper');
    const MARIO = new Character(1, 'Mario', 'Super Mario Bros.', 'mario.png');
    const DK = new Character(2, 'Donkey Kong', 'Donkey Kong', 'dk.png');
    const LINK = new Character(3, 'Link', 'The Legend of Zelda', 'link.png');
    const FIGHTERS = [MARIO, DK, LINK];
    menu.innerHTML = FIGHTERS.map(fighter => {
        return fighter.thumbnailHTML();
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
        return `
        <div class="fighter">
            <img src="${this.thumbnail}"/>
            <p>${this.name}</p>
        </div>
        `;
    }
}