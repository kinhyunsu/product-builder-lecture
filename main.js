class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="numbers"></div>
            <button class="generate-btn">Generate</button>
        `;

        shadow.appendChild(wrapper);

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
            }

            .numbers {
                display: flex;
                justify-content: center;
                margin-bottom: 1.5rem;
                flex-wrap: wrap;
                gap: 10px;
            }

            .number {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                background-color: var(--number-bg);
                color: var(--text-color);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.1rem;
                font-weight: bold;
                border: 2px solid var(--button-bg);
                transition: background-color 0.3s, color 0.3s, border-color 0.3s;
            }

            button.generate-btn {
                padding: 0.8rem 1.8rem;
                font-size: 1.1rem;
                background-color: var(--button-bg);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.1s;
                font-weight: bold;
            }

            button.generate-btn:hover {
                background-color: var(--button-hover);
                transform: scale(1.05);
            }

            button.generate-btn:active {
                transform: scale(0.95);
            }
        `;
        shadow.appendChild(style);

        this.shadowRoot.querySelector('button.generate-btn').addEventListener('click', () => {
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
        return Array.from(numbers).sort((a, b) => a - b);
    }
}

customElements.define('lotto-generator', LottoGenerator);

// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️ Light Mode';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            let theme = 'light';
            if (body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeToggleBtn.textContent = '☀️ Light Mode';
            } else {
                themeToggleBtn.textContent = '🌙 Dark Mode';
            }
            localStorage.setItem('theme', theme);
        });
    }
});
