class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="numbers"></div>
            <button>Generate</button>
        `;

        shadow.appendChild(wrapper);

        const style = document.createElement('style');
        style.textContent = `
            .numbers {
                display: flex;
                justify-content: center;
                margin-bottom: 1rem;
            }

            .number {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: #eee;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 5px;
                font-size: 1.2rem;
                font-weight: bold;
            }

            button {
                padding: 0.8rem 1.5rem;
                font-size: 1rem;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            button:hover {
                background-color: #45a049;
            }
        `;
        shadow.appendChild(style);

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            const numbersDiv = this.shadowRoot.querySelector('.numbers');
            numbersDiv.innerHTML = '';
            const numbers = this.generateNumbers();
            numbers.forEach(number => {
                const numberDiv = document.createElement('div');
                numberDiv.classList.add('number');
                numberDiv.textContent = number;
                numbersDiv.appendChild(numberDiv);
            });
        });
    }

    generateNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers);
    }
}

customElements.define('lotto-generator', LottoGenerator);
