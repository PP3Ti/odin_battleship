import Gameboard from '../scripts/Gameboard.js'

test('Generates coordinates of a gameboard', () => {
  const board = new Gameboard(2)
  board.generateCoords()
  expect(board.coords).toEqual([[1, 1], [1, 2], [2, 1], [2, 2]])
})
test('Receives attack at given coordinates', () => {
  const board = new Gameboard(2)
  board.generateCoords()
  board.receiveAttack([1, 1])
  expect(board.attackedCoords).toEqual([[1, 1]])
})

test('Checks if an attack is a hit or a miss', () => {
  const board = new Gameboard(2)
  board.generateCoords()
  board.takenCoords.push([1, 1])
  expect(board.receiveAttack([1, 1])).toEqual(true)
})

test('Removes position from taken coordinates when a ship is hit', () => {
  const board = new Gameboard(2)
  board.generateCoords()
  board.takenCoords.push([1, 1])
  board.receiveAttack([1, 1])
  expect(board.takenCoords.length).toBe(0)
})

test('Board is finished when all ships are sunk', () => {
  const board = new Gameboard(2)
  board.generateCoords()
  board.takenCoords.push([1, 1])
  board.receiveAttack([1, 1])
  expect(board.finished).toBe(true)
})
