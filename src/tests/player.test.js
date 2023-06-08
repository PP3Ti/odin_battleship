import Ship from "../scripts/Ship"
import Gameboard from "../scripts/Gameboard"
import Player from "../scripts/Player"
import _ from 'lodash'

test('Can place a ship at a valid position', () => {
  const board = new Gameboard(3)
  board.generateCoords()
  const ship1 = new Ship(2, true)
  const ships = [ship1]
  const player = new Player(ships, board)

  expect(player.placeShip(ship1, [1, 1])).toBe('Ship placed')
  expect(board.takenCoords.length).toBe(2)
})
test('Ship cannot be placed at invalid location', () => {
  const board = new Gameboard(3)
  board.generateCoords()
  const ship1 = new Ship(2, true)
  const ships = [ship1]
  const player = new Player(ships, board)

  expect(player.placeShip(ship1, [0, 0])).toBe('Ship cannot be placed here')
  expect(board.takenCoords.length).toBe(0)
})

test('Can attack enemy board if a position has not been attacked yet', () => {
  const board = new Gameboard(3)
  const enemyBoard = new Gameboard(3)
  board.generateCoords()
  enemyBoard.generateCoords()
  const ship1 = new Ship(2, true)
  const ships = [ship1]
  const player = new Player(ships, board, enemyBoard)

  expect(player.attack([1, 1])).toBe('Position attacked')
  expect(enemyBoard.attackedCoords.length).toBe(1)
  expect(player.attack([4, 4])).toBe('Position cannot be attacked')
  expect(enemyBoard.attackedCoords.length).toBe(1)
})