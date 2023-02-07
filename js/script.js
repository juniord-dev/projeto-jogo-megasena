var state = { board: [], currentGame: [], savedGame: [] };

function start() {
  /*  teste do código abaixo:

addNumberToGame(1);
  addNumberToGame(5);
  addNumberToGame(12);
  addNumberToGame(17);
  addNumberToGame(24);
  addNumberToGame(40);
  removeFromGame(1);
  saveGame();
  addNumberToGame(2);
  saveGame();

  console.log(state.currentGame);
  console.log(state.savedGame);

  resetGame();
  console.log(state.currentGame); */
  createBoard();
  newGame();
}
function createBoard() {
  state.board = [];
  for (var i = 1; i <= 60; i++) {
    state.board.push(i);
  }
}

function newGame() {
  resetGame();
  render();

  console.log(state.currentGame);
}

function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

function renderBoard() {
  var divBoard = document.querySelector('#megasena-board');
  divBoard.innerHTML = '';

  var ulNumbers = document.createElement('ul');

  for (var i = 0; i < state.board.length; i++) {
    var currentNumber = state.board[i];
    var liNumber = document.createElement('li');
    liNumber.textContent = currentNumber;
    liNumber.addEventListener('click', handleNumberClick);
    ulNumbers.appendChild(liNumber);
  }
  divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
  var value = Number(event.currentTarget.textContent);

  if (isNumberInGame(value)) {
    removeFromGame(value);
  } else {
    addNumberToGame(value);
  }
  console.log(state.currentGame);
}

function renderButtons() {
  var divButtons = document.querySelector('#megasena-buttons');
  divButtons.innerHTML = '';
  var buttonNewGame = createNewGameButton();
  var buttonRandomGame = createRandomGameButton();
  var buttonSaveGame = createSaveGameButton();

  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSaveGame);
}

function createNewGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Novo Jogo';
  button.addEventListener('click', newGame);

  return button;
}

function createRandomGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Jogo aleatório';
  button.addEventListener('click', randomGame);

  return button;
}

function createSaveGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Salvar Jogo';
  button.addEventListener('click', saveGame);

  return button;
}

function renderSavedGames() {
  var divSavedGames = document.querySelector('#megasena-saved-games');
}

function addNumberToGame(numberToAdd) {
  if (numberToAdd < 1 || numberToAdd > 60) {
    console.error('Número inválido', numberToAdd);
    return;
  }
  if (state.currentGame.length >= 6) {
    console.error('O jogo já está completo');
    return;
  }
  if (isNumberInGame(numberToAdd)) {
    console.error('O número já foi escolhido', numberToAdd);
    return;
  }

  state.currentGame.push(numberToAdd);
}

function removeFromGame(numberToRemove) {
  if (numberToRemove < 1 || numberToRemove > 60) {
    console.error('Número inválido', numberToRemove);
    return;
  }
  var newGame = [];
  for (var i = 0; i < state.currentGame.length; i++) {
    var currentNumber = state.currentGame[i];

    if (currentNumber === numberToRemove) {
      continue;
    }
    newGame.push(currentNumber);
  }
  state.currentGame = newGame;
}

function isNumberInGame(numberToCheck) {
  //  if (state.currentGame.includes(numberToCheck)) {
  //   return true;
  // }
  // return false;
  return state.currentGame.includes(numberToCheck);
}

function isGameComplete() {
  return state.currentGame.length === 6;
}

function saveGame() {
  if (!isGameComplete()) {
    console.error('O jogo não está completo!');
    return;
  }
  state.savedGame.push(state.currentGame);
  newGame();
  console.log(state.savedGame);
}

function resetGame() {
  state.currentGame = [];
}

function randomGame() {
  resetGame();

  while (!isGameComplete()) {
    var randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);
  }
  console.log(state.currentGame);
}

start();
