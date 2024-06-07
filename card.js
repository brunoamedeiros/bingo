import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  runTransaction,
  push,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';
import { firebaseConfig, words } from './config.js';

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let playerName = '';
let cardMatrix = [];

document.getElementById('start-game').addEventListener('click', () => {
  playerName = document
    .getElementById('player-name')
    .value.trim()
    .toLowerCase();
  if (playerName !== '') {
    checkPlayerExists(playerName);
  } else {
    alert('Por favor, insira seu nome.');
  }
});

function checkPlayerExists(name) {
  const playerRef = ref(database, 'players/' + name);
  get(playerRef).then((snapshot) => {
    if (snapshot.exists()) {
      // Jogador já existe, recuperar o estado do jogo
      const playerData = snapshot.val();
      cardMatrix = playerData.card;
      startGame(playerData.name, true);
    } else {
      // Jogador não existe, criar novo estado do jogo
      startGame(name, false);
    }
  });
}

function startGame(name, exists) {
  document.getElementById(
    'welcome-message'
  ).textContent = `Bem-vindo, ${name}!`;
  document.getElementById('welcome-container').style.display = 'none';
  document.getElementById('card-container').style.display = 'block';
  if (exists) {
    renderCard();
  } else {
    createCard();
  }
}

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

  cardMatrix = [];
  for (let i = 0; i < 5; i++) {
    const row = document.createElement('tr');
    const rowArray = [];
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement('td');
      const word = shuffledWords[i * 5 + j];
      cell.textContent = word;
      rowArray.push({ word, selected: false });
      if (word === 'ACE! Espaço Livre') {
        cell.classList.add('freespace');
      }
      cell.addEventListener('click', () => {
        cell.classList.toggle('selected');
        rowArray[j].selected = !rowArray[j].selected;
        cell.classList.add('pulse');
        setTimeout(() => cell.classList.remove('pulse'), 500);
        saveCardState(cardMatrix);
      });
      row.appendChild(cell);
    }
    tbody.appendChild(row);
    cardMatrix.push(rowArray);
  }
  table.appendChild(tbody);
  card.appendChild(table);
  cardContainer.appendChild(card);

  saveCardState(cardMatrix);
}

function renderCard() {
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

  for (let i = 0; i < 5; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement('td');
      const wordObj = cardMatrix[i][j];
      cell.textContent = wordObj.word;
      if (wordObj.selected) {
        cell.classList.add('selected');
      }
      if (wordObj.word === 'ACE! Espaço Livre') {
        cell.classList.add('freespace');
      }
      cell.addEventListener('click', () => {
        cell.classList.toggle('selected');
        wordObj.selected = !wordObj.selected;
        cell.classList.add('pulse');
        setTimeout(() => cell.classList.remove('pulse'), 500);
        saveCardState(cardMatrix);
      });
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  card.appendChild(table);
  cardContainer.appendChild(card);
}

function saveCardState(cardMatrix) {
  set(ref(database, 'players/' + playerName), {
    name: playerName,
    card: cardMatrix,
  });
}

function updateDrawnWords() {
  const drawnWordsRef = ref(database, 'drawnWords');
  onValue(drawnWordsRef, (snapshot) => {
    const words = snapshot.val();
    const wordsList = document.getElementById('words-list');
    wordsList.innerHTML = ''; // Limpar a lista
    for (const key in words) {
      const word = words[key];
      const listItem = document.createElement('li');
      listItem.textContent = word;
      wordsList.appendChild(listItem);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateDrawnWords();
});
