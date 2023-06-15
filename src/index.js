import './styles.sass'
import AI from './scripts/AI'
import Gameboard from './scripts/Gameboard'
import Player from './scripts/Player'
import { Pregame, Aftergame, turn } from './scripts/GameController'
import _ from 'lodash'

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
  const currentShipDisplay = document.querySelector('.currentShip')

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
    startScreenShips,
    currentShipDisplay
  }
})()

DOMelements.startDialog.showModal()

const DOMmethodsForStartScreen = (() => {
  let currentShip = null

  const ships = Array.from(DOMelements.startScreenShips)
  ships.forEach(ship => {
    ship.addEventListener('click', (e) => {
      currentShip = e.target.parentElement.parentElement.parentElement.id
      displayCurrentShip(currentShip)
    })
  })
  const displayCurrentShip = (currentShip) => {
    let shipTodisplay
    switch (currentShip) {
      case 'carrier':
        DOMelements.currentShipDisplay.replaceChildren()
        shipTodisplay = document.createElement('table')
        shipTodisplay.classList.add('ship')
        if (setup.player.ships[0].horizontal === true) {
          const row = document.createElement('tr')
          for (let i = 0; i < setup.player.ships[0].length; i++) {
            const td = document.createElement('td')
            row.appendChild(td)
          }
          shipTodisplay.appendChild(row)
        } else {
          for (let i = 0; i < setup.player.ships[0].length; i++) {
            const row = document.createElement('tr')
            const td = document.createElement('td')
            row.appendChild(td)
            shipTodisplay.appendChild(row)
          }
        }
        break
      case 'battleship':
        DOMelements.currentShipDisplay.replaceChildren()
        shipTodisplay = document.createElement('table')
        shipTodisplay.classList.add('ship')
        if (setup.player.ships[1].horizontal === true) {
          const row = document.createElement('tr')
          for (let i = 0; i < setup.player.ships[1].length; i++) {
            const td = document.createElement('td')
            row.appendChild(td)
          }
          shipTodisplay.appendChild(row)
        } else {
          for (let i = 0; i < setup.player.ships[1].length; i++) {
            const row = document.createElement('tr')
            const td = document.createElement('td')
            row.appendChild(td)
            shipTodisplay.appendChild(row)
          }
        }
        break
      case 'cruiser':
        DOMelements.currentShipDisplay.replaceChildren()
        shipTodisplay = document.createElement('table')
        shipTodisplay.classList.add('ship')
        if (setup.player.ships[2].horizontal === true) {
          const row = document.createElement('tr')
          for (let i = 0; i < setup.player.ships[2].length; i++) {
            const td = document.createElement('td')
            row.appendChild(td)
          }
          shipTodisplay.appendChild(row)
        } else {
          for (let i = 0; i < setup.player.ships[2].length; i++) {
            const row = document.createElement('tr')
            const td = document.createElement('td')
            row.appendChild(td)
            shipTodisplay.appendChild(row)
          }
        }
        break
      case 'submarine':
      DOMelements.currentShipDisplay.replaceChildren()
      shipTodisplay = document.createElement('table')
      shipTodisplay.classList.add('ship')
      if (setup.player.ships[3].horizontal === true) {
        const row = document.createElement('tr')
        for (let i = 0; i < setup.player.ships[3].length; i++) {
          const td = document.createElement('td')
          row.appendChild(td)
        }
        shipTodisplay.appendChild(row)
      } else {
        for (let i = 0; i < setup.player.ships[3].length; i++) {
          const row = document.createElement('tr')
          const td = document.createElement('td')
          row.appendChild(td)
          shipTodisplay.appendChild(row)
        }
      }
      break
      case 'destroyer':
        DOMelements.currentShipDisplay.replaceChildren()
        shipTodisplay = document.createElement('table')
        shipTodisplay.classList.add('ship')
        if (setup.player.ships[4].horizontal === true) {
          const row = document.createElement('tr')
          for (let i = 0; i < setup.player.ships[4].length; i++) {
            const td = document.createElement('td')
            row.appendChild(td)
          }
          shipTodisplay.appendChild(row)
        } else {
          for (let i = 0; i < setup.player.ships[4].length; i++) {
            const row = document.createElement('tr')
            const td = document.createElement('td')
            row.appendChild(td)
            shipTodisplay.appendChild(row)
          }
        }
        break
    }
    DOMelements.currentShipDisplay.appendChild(shipTodisplay)
  }

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
  const startBoardSquareClickEventListener = (e) => {
    const input = e.target.id.split(',')
    for (let i = 0; i < input.length; i++) {
      input[i] = Number(input[i])
    }
    switch (currentShip) {
      case 'carrier': 
        if (setup.player.ships[0].isPlaced) {
          console.log('ship already placed')
        } else {
          setup.player.placeShip(setup.player.ships[0], input)
        }
        break
      case 'battleship':
        if (setup.player.ships[1].isPlaced) {
          console.log('ship already placed')
        } else {
          setup.player.placeShip(setup.player.ships[1], input)
        }
        break
      case 'cruiser':
        if (setup.player.ships[2].isPlaced) {
          console.log('ship already placed')
        } else {
          setup.player.placeShip(setup.player.ships[2], input)
        }
        break
      case 'submarine':
        if (setup.player.ships[3].isPlaced) {
          console.log('ship already placed')
        } else {
          setup.player.placeShip(setup.player.ships[3], input)
        }
        break
      case 'destroyer':
        if (setup.player.ships[4].isPlaced) {
          console.log('ship already placed')
        } else {
          setup.player.placeShip(setup.player.ships[4], input)
        }
        break
      default:
        console.log('Select a ship')
  }
  }
  
  for (const square of startBoardSquaresArray) {
    square.addEventListener('click', startBoardSquareClickEventListener)
  }
})()

