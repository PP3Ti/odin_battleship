class Gameboard {
  constructor(size) {
    this.size = size
    this.coords = []
    this.takenCoords = []
    this.attackedCoords = []
    this.finished = false
  }
  generateCoords = () => {
    for (let i = 1; i < this.size + 1; i++) {
      for (let j = 1; j < this.size + 1; j++) {
        this.coords.push([i, j])
      }
    }
  }
  receiveAttack = ([x, y]) => {
    this.attackedCoords.push([x, y])
    return this.attackHit([x, y]) ? true : false
  }
  attackHit = ([x, y]) => {
    let returnValue = false
    for (let i = 0; i < this.takenCoords.length; i++) {
      if (this.takenCoords[i][0] === x && this.takenCoords[i][1] === y) {
        returnValue = true
        this.takenCoords.splice(i, 1)
      }
    }
    this.allShipsSunk()
    return returnValue
  }
  allShipsSunk = () => {
    this.takenCoords.length === 0 ? this.finished = true : this.finished = false
  }
}

export default Gameboard