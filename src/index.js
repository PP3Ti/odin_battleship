import './styles.sass'
import { Pregame, turn } from './scripts/GameController'
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
  const body = document.querySelector('body')
  const startDialog = document.querySelector('.start')
  const carrier = document.getElementById('carrier')
  const battleship = document.getElementById('battleship')
  const cruiser = document.getElementById('cruiser')
  const submarine = document.getElementById('submarine')
  const destroyer = document.getElementById('destroyer')
  const startScreenShips = document.querySelectorAll('.ship')
  const currentShipDisplay = document.querySelector('.currentShip')
  const resetShipsButton = document.getElementById('resetShipsButton')
  const startGameButton = document.getElementById('startGameButton')
  const startBoard = document.querySelector('.playerBoardStart')
  const startBoardSquares = startBoard.querySelectorAll('td')

  const playerBoard = document.querySelector('.playerBoard')
  const playerBoardSquares = playerBoard.querySelectorAll('td')
  const computerBoard = document.querySelector('.AIboard')
  const computerBoardSquares = computerBoard.querySelectorAll('td')

  const announcer = document.querySelector('.announcer')
  const playAgainButton = document.createElement('button')
  playAgainButton.classList.add('playAgainButton')
  playAgainButton.textContent = 'Play Again!'

  return {
    body,
    startDialog,
    carrier, 
    battleship,
    cruiser,
    submarine,
    destroyer,
    startBoardSquares,
    startScreenShips,
    currentShipDisplay,
    resetShipsButton,
    startGameButton,
    playerBoard,
    playerBoardSquares,
    computerBoard,
    computerBoardSquares,
    announcer,
    playAgainButton
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
  DOMelements.currentShipDisplay.addEventListener('contextmenu', event => event.preventDefault())
  DOMelements.currentShipDisplay.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      switch (currentShip) {
        case null:
          return
        case 'carrier':
          if (setup.player.ships[0].horizontal) {
            setup.player.ships[0].swapToVertical()
            displayCurrentShip(currentShip)
          } else {
            setup.player.ships[0].swapToHorizontal()
            displayCurrentShip(currentShip)
          }
          break
        case 'battleship':
          if (setup.player.ships[1].horizontal) {
            setup.player.ships[1].swapToVertical()
            displayCurrentShip(currentShip)
          } else {
            setup.player.ships[1].swapToHorizontal()
            displayCurrentShip(currentShip)
          }
          break
        case 'cruiser':
          if (setup.player.ships[2].horizontal) {
            setup.player.ships[2].swapToVertical()
            displayCurrentShip(currentShip)
          } else {
            setup.player.ships[2].swapToHorizontal()
            displayCurrentShip(currentShip)
          }
          break
        case 'submarine':
          if (setup.player.ships[3].horizontal) {
            setup.player.ships[3].swapToVertical()
            displayCurrentShip(currentShip)
          } else {
            setup.player.ships[3].swapToHorizontal()
            displayCurrentShip(currentShip)
          }
          break
        case 'destroyer':
          if (setup.player.ships[4].horizontal) {
            setup.player.ships[4].swapToVertical()
            displayCurrentShip(currentShip)
          } else {
            setup.player.ships[4].swapToHorizontal()
            displayCurrentShip(currentShip)
          }
          break
      }
    }
  })

  const displayPlacedShips = () => {
    const takenCoords = setup.player.board.takenCoords
    let squareIDlist = []
    let indexesToColor = []
    DOMelements.startBoardSquares.forEach(e => {
      const input = e.id.split(',')
      for (let i = 0; i < input.length; i++) {
        input[i] = Number(input[i])
      }
      squareIDlist.push(input)
    })
    takenCoords.forEach(coord => {
      squareIDlist.forEach(id => {
        if (_.isEqual(coord, id)) {
          indexesToColor.push(squareIDlist.indexOf(id))
        }
      })
    })
    for (const index of indexesToColor) {
      DOMelements.startBoardSquares[index].classList.add('takenPosition')
    }
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
          DOMelements.carrier.classList.add('placedShip')
        }
        break
      case 'battleship':
        if (setup.player.ships[1].isPlaced) {
          console.log('ship already placed')
        } else {
          setup.player.placeShip(setup.player.ships[1], input)
          DOMelements.battleship.classList.add('placedShip')
        }
        break
      case 'cruiser':
        if (setup.player.ships[2].isPlaced) {
          console.log('ship already placed')
        } else {
          setup.player.placeShip(setup.player.ships[2], input)
          DOMelements.cruiser.classList.add('placedShip')
        }
        break
      case 'submarine':
        if (setup.player.ships[3].isPlaced) {
          console.log('ship already placed')
        } else {
          setup.player.placeShip(setup.player.ships[3], input)
          DOMelements.submarine.classList.add('placedShip')
        }
        break
      case 'destroyer':
        if (setup.player.ships[4].isPlaced) {
          console.log('ship already placed')
        } else {
          setup.player.placeShip(setup.player.ships[4], input)
          DOMelements.destroyer.classList.add('placedShip')
        }
        break
      default:
        console.log('Select a ship')
    }
    displayPlacedShips()
  }
  
  for (const square of startBoardSquaresArray) {
    square.addEventListener('click', startBoardSquareClickEventListener)
  }
  DOMelements.resetShipsButton.addEventListener('click', () => {
    setup.player.ships.forEach(ship => {
      ship.coords = []
      ship.isPlaced = false
    })
    setup.player.board.takenCoords = []
    DOMelements.startBoardSquares.forEach(square => {
      square.classList.remove('takenPosition')
    })
    DOMelements.carrier.classList.remove('placedShip')
    DOMelements.battleship.classList.remove('placedShip')
    DOMelements.cruiser.classList.remove('placedShip')
    DOMelements.submarine.classList.remove('placedShip')
    DOMelements.destroyer.classList.remove('placedShip')
  })
  DOMelements.startGameButton.addEventListener('click', () => {
    let allShipsPlaced = true
    setup.player.ships.forEach(ship => {
      if (!ship.isPlaced) {
        allShipsPlaced = false
      }
    })
    if (allShipsPlaced) {
      DOMelements.startDialog.close()
      DOMmethodsForGame.displayPlacedShipsPlayer()
      DOMmethodsForGame.displayPlacedShipsComputer()
    } else {
      DOMelements.currentShipDisplay.replaceChildren()
      DOMelements.currentShipDisplay.textContent = 'Place all ships before starting'
    }
  })
})()

const DOMmethodsForGame = (() => {
  let coords = []
  for (let y = 10; y > 0; y--) {
    for (let x = 1; x < 11; x++) {
      coords.push([x, y])
    }
  }
  let playerBoardSquaresArr = Array.from(DOMelements.playerBoardSquares)
  for (let i = 0; i < playerBoardSquaresArr.length; i++) {
    playerBoardSquaresArr[i].setAttribute('class', coords[0])
    coords.splice(0, 1)
  }

  const displayPlacedShipsPlayer = () => {
    const takenCoords = setup.player.board.takenCoords
    let squareIDlist = []
    let indexesToColor = []
    DOMelements.playerBoardSquares.forEach(e => {
      const input = e.classList[0].split(',')
      for (let i = 0; i < input.length; i++) {
        input[i] = Number(input[i])
      }
      squareIDlist.push(input)
    })
    takenCoords.forEach(coord => {
      squareIDlist.forEach(id => {
        if (_.isEqual(coord, id)) {
          indexesToColor.push(squareIDlist.indexOf(id))
        }
      })
    })
    for (const index of indexesToColor) {
      DOMelements.playerBoardSquares[index].classList.add('takenPosition')
    }
  }
  const displayPlacedShipsComputer = () => {
    const takenCoords = setup.ai.board.takenCoords
    let squareIDlist = []
    let indexesToColor = []
    DOMelements.computerBoardSquares.forEach(e => {
      const input = e.classList[0].split(',')
      for (let i = 0; i < input.length; i++) {
        input[i] = Number(input[i])
      }
      squareIDlist.push(input)
    })
    takenCoords.forEach(coord => {
      squareIDlist.forEach(id => {
        if (_.isEqual(coord, id)) {
          indexesToColor.push(squareIDlist.indexOf(id))
        }
      })
    })
    for (const index of indexesToColor) {
      DOMelements.computerBoardSquares[index].classList.add('takenPosition')
    }
  }

  for (let y = 10; y > 0; y--) {
    for (let x = 1; x < 11; x++) {
      coords.push([x, y])
    }
  }
  const computerBoardSquaresArr = Array.from(DOMelements.computerBoardSquares)
  for (let i = 0; i < computerBoardSquaresArr.length; i++) {
    computerBoardSquaresArr[i].setAttribute('class', coords[0])
    coords.splice(0, 1)
  }

  const displayAttackedCoordsComputer = () => {
    const attackedCoords = setup.ai.board.attackedCoords
    let squareIDlist = []
    let attackedIndexes = []
    DOMelements.computerBoardSquares.forEach(e => {
      const input = e.classList[0].split(',')
      for (let i = 0; i < input.length; i++) {
        input[i] = Number(input[i])
      }
      squareIDlist.push(input)
    })
    attackedCoords.forEach(coord => {
      squareIDlist.forEach(id => {
        if (_.isEqual(coord, id)) {
          attackedIndexes.push(squareIDlist.indexOf(id))
        }
      })
    })
    for (const index of attackedIndexes) {
      if (DOMelements.computerBoardSquares[index].classList.contains('takenPosition')) {
        DOMelements.computerBoardSquares[index].classList.remove('takenPosition')
        DOMelements.computerBoardSquares[index].classList.add('posHit')
        DOMelements.computerBoardSquares[index].textContent = 'x'
      } else {
        DOMelements.computerBoardSquares[index].classList.add('posAttacked')
      }
    }

  }
  const displayAttackedCoordsPlayer = () => {
    const attackedCoords = setup.player.board.attackedCoords
    let squareIDlist = []
    let attackedIndexes = []
    DOMelements.playerBoardSquares.forEach(e => {
      const input = e.classList[0].split(',')
      for (let i = 0; i < input.length; i++) {
        input[i] = Number(input[i])
      }
      squareIDlist.push(input)
    })
    attackedCoords.forEach(coord => {
      squareIDlist.forEach(id => {
        if (_.isEqual(coord, id)) {
          attackedIndexes.push(squareIDlist.indexOf(id))
        }
      })
    })
    for (const index of attackedIndexes) {
      if (DOMelements.playerBoardSquares[index].classList.contains('takenPosition')) {
        DOMelements.playerBoardSquares[index].classList.remove('takenPosition')
        DOMelements.playerBoardSquares[index].textContent = 'x'
        DOMelements.playerBoardSquares[index].classList.add('posHit')
      } else {
        DOMelements.playerBoardSquares[index].classList.add('posAttacked')
      }
    }

  }
  computerBoardSquaresArr.forEach(square => {
    square.addEventListener('click', (e) => {
      const targetCoord = e.target.classList[0].split(',')
      for (let i = 0; i < targetCoord.length; i++) {
        targetCoord[i] = Number(targetCoord[i])
      }
      turn(setup.player, setup.ai, targetCoord)
      displayAttackedCoordsComputer()
      displayAttackedCoordsPlayer()
      if (setup.player.board.finished) {
        DOMelements.announcer.textContent = 'The computer won!'
        DOMelements.announcer.appendChild(DOMelements.playAgainButton)
        DOMelements.body.replaceWith(DOMelements.body.cloneNode(true))
        const playAgainButton = document.querySelector('.playAgainButton')
        playAgainButton.addEventListener('click', () => {
          location.reload()
        })
        console.log('computer won')
        return
      } else if (setup.ai.board.finished) {
        DOMelements.announcer.textContent = 'The player won!'
        DOMelements.announcer.appendChild(DOMelements.playAgainButton)
        DOMelements.body.replaceWith(DOMelements.body.cloneNode(true))
        const playAgainButton = document.querySelector('.playAgainButton')
        playAgainButton.addEventListener('click', () => {
          location.reload()
        })
        console.log('player won')
        return
      }
    })
  })

  return {
    displayPlacedShipsPlayer,
    displayPlacedShipsComputer
  }
})()

