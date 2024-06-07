const words = [
  'É minha',
  '3 toques',
  'deixa',
  'saaai!',
  'comunicação!!',
  'foraaa',
  'Na rede é peixe',
  'errrou',
  'cade a cobertura',
  'bom saque',
  'de graça',
  'fundoo',
  'era minha?',
  'era tua!',
  'saque trenó',
  'calma a bola',
  'Duas mãos',
  'Que paraleluda!',
  'Bora time',
  'A boa!',
  'Vai a dois',
  'Pula',
  'Recepção',
  'Vamo tirar',
  'bloqueioo',
  'não gira',
  'quebra a mão',
  'marca lá',
  'tem jogo',
  'repeteee',
];
let drawnWords = [];

const drawWordButton = document.getElementById('draw-word');
const currentWordDiv = document.getElementById('current-word');
const cardsDiv = document.getElementById('cards');

drawWordButton.addEventListener('click', () => {
  if (drawnWords.length < words.length) {
    let word;
    do {
      word = words[Math.floor(Math.random() * words.length)];
    } while (drawnWords.includes(word));
    drawnWords.push(word);
    currentWordDiv.textContent = word;
  } else {
    currentWordDiv.textContent = 'Todas as palavras foram sorteadas!';
  }
});

function createCard() {
  const card = document.createElement('div');
  card.className = 'card';
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const shuffledWords = words
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 25);

  for (let i = 0; i < 5; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement('td');
      cell.textContent = shuffledWords[i * 5 + j];
      cell.addEventListener('click', () => {
        cell.classList.toggle('selected');
      });
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  card.appendChild(table);
  cardsDiv.appendChild(card);
}

// Create a card for each guest (you can adjust the number of cards)
for (let i = 0; i < 15; i++) {
  createCard();
}
