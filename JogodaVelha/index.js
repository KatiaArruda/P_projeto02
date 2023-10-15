const boardRegions = document.querySelectorAll('#containerB span')
let vBoard = []
let turnPlayer = ''

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer)
  document.getElementById('turnPlayer').inderText = playerInput.value
}

function initializeGame() {
  vBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
  turnPlayer = 'player1'
  document.querySelector('h2').innerHTML = 'Jogar:<span id="turnPlayer"></span>'
  updateTitle()
  boardRegions.forEach(function (element) {
    element.classList.remove('win')
    element.innerText = ''
    element.addEventListener('click', handleBoardClick)
    element.classList.add('cursor-hand')
  })
}

function disableRegion(element) {
  element.classList.remove('cursor-hand')
  element.removeEventListener('click', handleBoardClick)
}

function getWinRegions() {
  const WinRegions = []
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    WinRegions.push('0.0', '0.1', '0.2')
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    WinRegions.push('1.0', '1.1', '1.2')
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    WinRegions.push('2.0', '2.1', '2.2')
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    WinRegions.push('0.0', '1.0', '2.0')
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    WinRegions.push('0.1', '1.1', '2.1')
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    WinRegions.push('0.2', '1.2', '2.2')
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    WinRegions.push('0.0', '1.1', '2.2')
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    WinRegions.push('0.2', '1.1', '2.0')
  return WinRegions
}

function handleWin(regions) {
  regions.forEach(function (region) {
    document
      .querySelector('[data-region = "' + region + '"]')
      .classList.add('win')
  })
  const playerName = document.getElementById(turnPlayer).value
  document.querySelector('h2').innerHTML =
    playerName + ', você' + ' ' + 'venceu!' + '... Parabéns :)'
}

function handleBoardClick(ev) {
  const span = ev.currentTarget
  const region = span.dataset.region
  const rowColumnPair = region.split('.')
  const row = rowColumnPair[0]
  const column = rowColumnPair[1]
  if (turnPlayer === 'player1') {
    span.innerText = 'X'
    vBoard[row][column] = 'X'
  } else {
    span.innerText = 'O'
    vBoard[row][column] = 'O'
  }

  console.clear()
  console.table(vBoard)
  disableRegion(span)
  const winRegions = getWinRegions()
  if (winRegions.length > 0) {
    handleWin(winRegions)
  } else if (vBoard.flat().includes('')) {
    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
    updateTitle()
  } else {
    document.querySelector('h2').innerHTML = 'Empate!'
  }
}

document.getElementById('start').addEventListener('click', initializeGame)
