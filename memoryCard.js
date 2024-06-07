// memoryCard.js

class MemoryCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this._id = '';
        this._set = '';
        this._name = '';
        this._turned = false;
        this._taken = false;

        this.renderCard();
    }

    static get observedAttributes() {
        return ['id', 'set', 'name', 'data-flipped', 'data-matched'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'id':
                    this._id = newValue;
                    break;
                case 'set':
                    this._set = newValue;
                    break;
                case 'name':
                    this._name = newValue;
                    break;
                case 'data-flipped':
                    this._turned = newValue === 'true';
                    break;
                case 'data-matched':
                    this._taken = newValue === 'true';
                    break;
            }
            this.renderCard();
        }
    }

    connectedCallback() {
        this.addEventListener('click', this.handleClick.bind(this));
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick.bind(this));
    }

    handleClick() {
        if (!this._taken && !this._turned) {
            console.log('Card clicked:', this._name);
            this.dispatchEvent(new CustomEvent('card-flip', {
                detail: this,
                bubbles: true,  // Enable bubbling
                composed: true  // Allow the event to escape the shadow DOM
            }));
        }
    }

    renderCard() {
        const imageName = this._turned ? `img/${this._name}.jpg` : 'img/blank.png';
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                    border: 2px solid #ccc;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
            </style>
            <img src="${this._taken ? 'img/white.png' : imageName}" alt="Memory Card">
        `;
    }
}

customElements.define('memory-card', MemoryCard);
