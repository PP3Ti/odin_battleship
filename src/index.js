import './styles.sass'
import AI from './scripts/AI'
import Gameboard from './scripts/Gameboard'
import Player from './scripts/Player'
import { Pregame, Aftergame, turn } from './scripts/GameController'

const setup = (() => {
  const pregame = Pregame
  const ai = pregame.ai
  const player = pregame.player

  return {
    ai, 
    player
  }
})()

const DOMelements = (() => {
  
  const startDialog = document.querySelector('.start')

  const carrier = document.getElementById('carrier')
  const battleship = document.getElementById('battlehip')
  const cruiser = document.getElementById('cruiser')
  const submarine = document.getElementById('submarine')
  const destroyer = document.getElementById('destroyer')
  const startScreenShips = document.querySelectorAll('.ship')

  const startBoard = document.querySelector('.playerBoardStart')
  const startBoardSquares = startBoard.querySelectorAll('td')

  return {
    startDialog,
    carrier, 
    battleship,
    cruiser,
    submarine,
    destroyer,
    startBoardSquares,
    startScreenShips
  }
})()

DOMelements.startDialog.showModal()

const DOMmethodsForStartScreen = (() => {
  let currentShip = null

  const ships = Array.from(DOMelements.startScreenShips)
  ships.forEach(ship => {
    ship.addEventListener('click', (e) => {
      currentShip = e.target.parentElement.parentElement.parentElement.id
      console.log(currentShip)
    })
  })


  let coords = []
  for (let y = 10; y > 0; y--) {
    for (let x = 1; x < 11; x++) {
      coords.push([x, y])
    }
  }
  let startBoardSquaresArray = Array.from(DOMelements.startBoardSquares)
  for (let i = 0; i < startBoardSquaresArray.length; i++) {
    startBoardSquaresArray[i].setAttribute('id', coords[0])
    coords.splice(0, 1)
  }
  const startBoardSquareEventListener = (e) => {
    const input = e.target.id.split(',')
    for (let i = 0; i < input.length; i++) {
      input[i] = Number(input[i])
    }
    switch (currentShip) {
      case 'carrier': 
        console.log(input)
        setup.player.placeShip(setup.player.ships[0], input)
        console.log(setup.player.placeShip(setup.player.ships[0], input))
        break
    }
  }
  for (let i = 0; i < startBoardSquaresArray.length; i++) {
    startBoardSquaresArray[i].addEventListener('click', startBoardSquareEventListener)
  }


})()

