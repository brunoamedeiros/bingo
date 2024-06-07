import { words } from './config.js';

document
  .getElementById('generate-cards')
  .addEventListener('click', generateCards);
document.getElementById('print-cards').addEventListener('click', printCards);

function generateCards() {
  const cardCount = parseInt(document.getElementById('card-count').value, 10);
  const cardSize = document.getElementById('card-size').value;
  const [rows, cols] = cardSize.split('x').map(Number);
  const cardsContainer = document.getElementById('cards-container');

  cardsContainer.innerHTML = ''; // Clear previous cards

  for (let i = 0; i < cardCount; i++) {
    const card = document.createElement('div');
    card.className = 'card';

    const header = document.createElement('div');
    header.className = 'card-header';
    header.textContent = 'Ace Bingo';
    card.appendChild(header);

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    const shuffledWords = words.slice().sort(() => Math.random() - 0.5);
    if (rows === 5 && cols === 5) {
      shuffledWords.splice(12, 0, 'ACE! Espaço Livre'); // Add free space in the center for 5x5 grid
    }

    for (let r = 0; r < rows; r++) {
      const row = document.createElement('tr');
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('td');
        const wordIndex = r * cols + c;
        cell.textContent = shuffledWords[wordIndex];
        if (shuffledWords[wordIndex] === 'ACE! Espaço Livre') {
          cell.classList.add('freespace');
        }
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }
    table.appendChild(tbody);
    card.appendChild(table);
    cardsContainer.appendChild(card);
  }
}

function printCards() {
  window.print();
}
