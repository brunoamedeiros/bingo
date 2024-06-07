import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  remove,
  push,
  get,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';
import { firebaseConfig, words } from './config.js';

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById('draw-word').addEventListener('click', () => {
  drawWord();
});

document.getElementById('reset-game').addEventListener('click', () => {
  resetGame();
});

function drawWord() {
  const drawnWordsRef = ref(database, 'drawnWords');
  get(drawnWordsRef).then((snapshot) => {
    const drawnWordsObj = snapshot.val() || {};
    const drawnWords = Object.values(drawnWordsObj);
    const remainingWords = words.filter((word) => !drawnWords.includes(word));
    if (remainingWords.length === 0) {
      alert('Todas as palavras já foram sorteadas.');
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const word = remainingWords[randomIndex];
    push(drawnWordsRef, word);
    set(ref(database, 'currentWord'), word);
    const currentWordElement = document.getElementById('current-word');
    currentWordElement.textContent = word;
    currentWordElement.classList.add('fadeIn');
    setTimeout(() => currentWordElement.classList.remove('fadeIn'), 1000);
  });
}

function resetGame() {
  remove(ref(database, 'players'));
  remove(ref(database, 'drawnWords'));
  set(ref(database, 'playersCount'), 0);
  document.getElementById('current-word').textContent = '';
  alert('Jogo resetado com sucesso!');
}
