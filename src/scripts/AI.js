import _ from 'lodash'

class AI {
  constructor(ships, board) {
    this.ships = ships
    this.board = board
  }

  getValidPositions = (ship, board) => {
    let validPositions = []
    board.coords.forEach(coord => {
      ship.place(coord)
      if ((_.intersectionWith(ship.coords, board.coords, _.isEqual).length === ship.length) 
          && (_.intersectionWith(ship.coords, board.takenCoords, _.isEqual).length === 0)) {
        validPositions.push(coord)
      }
      ship.coords = []
    })
    return validPositions
  }

  getRandomValidCoord = (ship, board) => {
    const validCoords = this.getValidPositions(ship, board)
    let index = Math.floor(Math.random() * validCoords.length)
    return validCoords[index]
  }

  placeShips = (ships, board) => {
    ships.forEach(ship => {
      ship.place(this.getRandomValidCoord(ship, board))
      board.takenCoords.push(...ship.coords)
    })
  }

  shipAlignmentRandomizer = (ships) => {
    ships.forEach(ship => {
      const flip = Math.floor(Math.random() * 2) 
      flip === 0 ? ship.swapToVertical() : ship.swapToHorizontal()
    })
  }
}


export default AI