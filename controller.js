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
