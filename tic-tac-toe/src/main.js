import './style.css'

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

let board = Array(9).fill('')
let currentPlayer = 'X'
let gameActive = false

document.querySelector('#app').innerHTML = `
  <main class="game-shell">
    <section class="game-card" aria-labelledby="game-title">
      <div class="game-heading">
        <p class="eyebrow">Two player game</p>
        <h1 id="game-title">Tic Tac Toe</h1>
        <p class="intro">Take turns, choose a square, and make three in a row.</p>
      </div>

      <div class="scoreboard" aria-label="Player markers">
        <div class="player player-x active" data-player="X">
          <span class="marker">X</span>
          <span>Player 1</span>
        </div>
        <div class="turn-divider" aria-hidden="true">vs</div>
        <div class="player player-o" data-player="O">
          <span class="marker">O</span>
          <span>Player 2</span>
        </div>
      </div>

      <p class="status" id="status" aria-live="polite">Press start to play.</p>

      <div class="board" id="board" role="grid" aria-label="Tic Tac Toe board">
        ${Array.from({ length: 9 }, (_, index) => `
          <div class="square" id="square-${index}" role="gridcell" aria-label="Square ${index + 1}"></div>
        `).join('')}
      </div>

      <button class="game-button" id="game-button" type="button">Start game</button>
      <p class="hint">Enter a number from 1–9 in the move prompt.</p>
    </section>
  </main>
`

const status = document.querySelector('#status')
const gameButton = document.querySelector('#game-button')
const boardElement = document.querySelector('#board')
const playerCards = document.querySelectorAll('.player')

function renderBoard() {
  board.forEach((mark, index) => {
    const square = document.querySelector(`#square-${index}`)
    square.textContent = mark
    square.className = `square ${mark ? `mark-${mark.toLowerCase()}` : ''}`
  })
}

function updateTurn() {
  playerCards.forEach((card) => {
    card.classList.toggle('active', card.dataset.player === currentPlayer)
  })
}

function getWinner() {
  return winningLines.find(([a, b, c]) => (
    board[a] && board[a] === board[b] && board[a] === board[c]
  ))
}

function endGame(message, winningLine = []) {
  gameActive = false
  status.textContent = message
  gameButton.textContent = 'Play again'
  gameButton.disabled = false
  boardElement.classList.toggle('complete', Boolean(winningLine.length))

  winningLine.forEach((index) => {
    document.querySelector(`#square-${index}`).classList.add('winner')
  })
}

function playMove(squareNumber) {
  const index = Number(squareNumber) - 1

  if (!Number.isInteger(Number(squareNumber)) || index < 0 || index > 8) {
    return 'Please enter a whole number from 1 to 9.'
  }

  if (board[index]) {
    return `Square ${squareNumber} is already taken. Choose another square.`
  }

  board[index] = currentPlayer
  renderBoard()

  const winningLine = getWinner()
  if (winningLine) {
    endGame(`Player ${currentPlayer} wins!`, winningLine)
    return null
  }

  if (board.every(Boolean)) {
    endGame("It's a draw — great game!")
    return null
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  updateTurn()
  status.textContent = `Player ${currentPlayer}'s turn`
  return null
}

function requestMove() {
  if (!gameActive) return

  const response = window.prompt(
    `Player ${currentPlayer}, choose a square (1–9):`,
  )

  if (response === null) {
    gameActive = false
    status.textContent = `Game paused. Player ${currentPlayer} is up next.`
    gameButton.textContent = 'Resume game'
    gameButton.disabled = false
    return
  }

  const error = playMove(response.trim())
  if (error) {
    window.alert(error)
    requestMove()
    return
  }

  if (gameActive) {
    window.setTimeout(requestMove, 80)
  }
}

function startGame() {
  const shouldReset = gameButton.textContent === 'Start game' || gameButton.textContent === 'Play again'

  if (shouldReset) {
    board = Array(9).fill('')
    currentPlayer = 'X'
    renderBoard()
    boardElement.classList.remove('complete')
    updateTurn()
  }

  gameActive = true
  status.textContent = `Player ${currentPlayer}'s turn`
  gameButton.textContent = 'Game in progress'
  gameButton.disabled = true
  requestMove()
}

gameButton.addEventListener('click', startGame)
renderBoard()
