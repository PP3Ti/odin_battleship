import _ from 'lodash'

class AI {
  constructor(ships, board, enemyBoard) {
    this.ships = ships
    this.board = board
    this.enemyBoard = enemyBoard
  }

  getValidPositions = (ship) => {
    let validPositions = []
    this.board.coords.forEach(coord => {
      ship.place(coord)
      if ((_.intersectionWith(ship.coords, this.board.coords, _.isEqual).length === ship.length) 
          && (_.intersectionWith(ship.coords, this.board.takenCoords, _.isEqual).length === 0)) {
        validPositions.push(coord)
      }
      ship.coords = []
    })
    return validPositions
  }

  getRandomValidCoord = (ship) => {
    const validCoords = this.getValidPositions(ship, this.board)
    let index = Math.floor(Math.random() * validCoords.length)
    return validCoords[index]
  }

  placeShips = () => {
    this.ships.forEach(ship => {
      ship.place(this.getRandomValidCoord(ship, this.board))
      this.board.takenCoords.push(...ship.coords)
    })
  }

  shipAlignmentRandomizer = () => {
    this.ships.forEach(ship => {
      Math.floor(Math.random() * 2) === 0 ? ship.swapToVertical() : ship.swapToHorizontal()
    })
  }

  attack = () => {
    let validCoords = _.differenceWith(this.enemyBoard.coords, this.enemyBoard.attackedCoords, _.isEqual)
    const index = Math.floor(Math.random() * validCoords.length)
    this.enemyBoard.receiveAttack(validCoords[index])
  }
}


export default AI