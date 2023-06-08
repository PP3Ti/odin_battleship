import _ from "lodash"

export default class Player {
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

  placeShip = (ship, [x, y]) => {
    const validCoords = this.getValidPositions(ship, this.board)
    let invalid = true
    for (const coord of validCoords) {
      if (_.isEqual(coord, [x, y])) {
        ship.place([x, y])
        this.board.takenCoords.push(...ship.coords)
        invalid = false
        break
      } else {
        invalid = true
      }
    }
    return invalid ? 'Ship cannot be placed here' : 'Ship placed'
  }

  attack = ([x, y]) => {
    const validCoords = _.differenceWith(this.enemyBoard.coords, this.enemyBoard.attackedCoords, _.isEqual)
    let invalid = true
    for (const coord of validCoords) {
      if (_.isEqual(coord, [x, y])) {
        this.enemyBoard.receiveAttack([x, y])
        invalid = false
        break
      } else {
        invalid = true
      }
    }
    return invalid ? 'Position cannot be attacked' : 'Position attacked'
  }
}