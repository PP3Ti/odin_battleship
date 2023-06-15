export default class Ship { 
  constructor(length, horizontal) {
    this.length = length
    this.hits = 0
    this.sunk = false
    this.horizontal = horizontal
    this.coords = []
    this.isPlaced = false
  }
  isSunk = () => {
    this.hits >= this.length ? this.sunk = true : this.sunk = false
  }
  hit = () => {
    this.hits++
    this.isSunk()
  }
  place = ([x, y]) => {
    this.coords.push([x, y])
    this.isPlaced = true
    if (this.horizontal) {
      for (let i = 0; i < this.length -1; i++) {
        this.coords.push([x + i + 1, y])
      }
    } else {
      for (let i = 0; i < this.length -1; i++) {
        this.coords.push([x, y - i - 1])
      }
    }
  }
  swapToVertical = () => {
    this.horizontal = false
  }
  swapToHorizontal = () => {
    this.horizontal = true
  }
  getCoords = () => {
    return this.coords
  }
  getShipObjFromCoord = ([x, y]) => {
    let ship = null
    this.coords.forEach(coord => {
      if (coord[0] === x && coord[1] === y) {
        ship = this
      }
    })
    return ship
  }
}
