
class Card{
    constructor(picture) {
        this.picture = picture;
        this.turned = false;
        this.taken = false
    }

}

class Player{
    constructor(name) {
        this.name = name;
        this.score = 0
    }
}

class MemoryCard extends HTMLElement {
    constructor(picture, turned=false, taken=false) {
        super();
        this.attachShadow({ mode: 'closed' });
        this.taken = taken;
        this.turned = turned;
        let container = document.createElement('div');
        container.innerHTML = `<img src="img/${picture}.jpg">
        <div class="cover"></div>
        ` 
        this.shadowRoot.append(this.container);
        this.shadowRoot.styleSheets
        this.render();
    }

    connectedCallback() {
        this.addEventListener('click', this.flipCard);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.flipCard);
    }

    setTaken(taken) {
        this.taken = taken;
        this.render();
    }

    setTurned(turned) {
        this.turned = turned;
        this.render();
    }

    flipCard() {
        if (this.taken || this.turned) return;
        this.turned = true;
        this.render();
        this.dispatchEvent(new CustomEvent('cardflipped', {
            detail: { card: this }
        }));
    }

    render() {
        const name = this.getAttribute('name');
        if (this.taken) {
            this.imgElement.setAttribute('src', 'img/white.png');
        } else if (this.turned) {
            this.imgElement.setAttribute('src', `img/${name}.jpg`);
        } else {
            this.imgElement.setAttribute('src', 'img/cover.png');
        }
    }
}

gameBoard = document.getElementById('game-board');
gameboard.addEventListener('click', onClickCard());


gameState = {
    step: ['init', 'firstMove', 'secondMove', 'evaluateMatch', 'evaluateCardsLeft',],
    players: [],
    single: true,
    sound: true,
    cards:[]
    
    
}

function initGame() {
    if (sessionStorage.gameState) {
        // get gameState from sessionstorage
    } else {
        fetch('https://my-json-server.typicode.com/cmmnct/memorycards/cards')
        .then(data => data.json())
        .then(cards => gameState.cards = cards.concat(cards))
        .then(() => gameState.cards.sort(() => 0.5 - Math.random()))
        .then(() => console.log(gameState.cards))
        .then(()=> placeCards())
    }
    
}

initGame()

function placeCards() {
    
}

function onClickCard() {
    
}
