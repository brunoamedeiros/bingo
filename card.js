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

document.getElementById('start-game').addEventListener('click', () => {
  const playerName = document.getElementById('player-name').value;
  if (playerName.trim() !== '') {
    document.getElementById(
      'welcome-message'
    ).textContent = `Bem-vindo, ${playerName}!`;
    document.getElementById('welcome-container').style.display = 'none';
    document.getElementById('card-container').style.display = 'block';
    createCard();
  } else {
    alert('Por favor, insira seu nome.');
  }
});

function createCard() {
  const cardContainer = document.getElementById('cards');
  cardContainer.innerHTML = ''; // Limpar qualquer card existente

  const card = document.createElement('div');
  card.className = 'card';

  const header = document.createElement('div');
  header.className = 'card-header';
  header.textContent = 'Ace Bingo';
  card.appendChild(header);

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const shuffledWords = words.slice().sort(() => Math.random() - 0.5);
  shuffledWords.splice(12, 0, 'ACE! Espaço Livre'); // Adiciona o espaço livre no centro da cartela

  for (let i = 0; i < 5; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement('td');
      const word = shuffledWords[i * 5 + j];
      cell.textContent = word;
      if (word === 'ACE! Espaço Livre') {
        cell.classList.add('freespace');
      }
      cell.addEventListener('click', () => {
        cell.classList.toggle('selected');
      });
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  card.appendChild(table);
  cardContainer.appendChild(card);
}

document.addEventListener('DOMContentLoaded', createCard);
