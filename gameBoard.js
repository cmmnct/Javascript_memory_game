// gameBoard.js

class GameBoard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.state = {
            cards: [],
            cardsChosen: [],
            moves: 0
        };

        this.renderBoard();
    }

    connectedCallback() {
        document.addEventListener('card-flip', this.handleCardFlip.bind(this));
        // Note: The event listener is now on the document to capture bubbling events from shadow DOM
    }

    disconnectedCallback() {
        document.removeEventListener('card-flip', this.handleCardFlip.bind(this));
    }

    handleCardFlip(event) {
        const card = event.detail;
        console.log('Card flipped:', card._name);
        this.state.cardsChosen.push(card);
        card.setAttribute('data-flipped', 'true');

        if (this.state.cardsChosen.length === 2) {
            setTimeout(() => this.checkMatch(), 500);
        }
    }

    checkMatch() {
        const [cardOne, cardTwo] = this.state.cardsChosen;
        if (cardOne.getAttribute('set') === cardTwo.getAttribute('set')) {
            cardOne.setAttribute('data-matched', 'true');
            cardTwo.setAttribute('data-matched', 'true');
        } else {
            cardOne.setAttribute('data-flipped', 'false');
            cardTwo.setAttribute('data-flipped', 'false');
        }
        this.state.cardsChosen = [];
        this.state.moves++;
    }

    async loadGameData() {
        try {
            const response = await fetch('https://my-json-server.typicode.com/cmmnct/cards/cards');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error loading game data:', error);
            return [];
        }
    }

    async initializeGame() {
        const cardData = await this.loadGameData();
        const doubledCards = cardData.flatMap(card => [
            { id: `1-${card.name1}`, set: card.set, name: card.name1 },
            { id: `2-${card.name2}`, set: card.set, name: card.name2 }
        ]);

        this.state.cards = this.shuffle(doubledCards);
        this.renderBoard();
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    renderBoard() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    width: 400px;
                }
            </style>
        `;

        this.state.cards.forEach(card => {
            const cardElement = document.createElement('memory-card');
            cardElement.setAttribute('id', card.id);
            cardElement.setAttribute('set', card.set);
            cardElement.setAttribute('name', card.name);
            this.shadowRoot.appendChild(cardElement);
        });
    }
}

customElements.define('game-board', GameBoard);
