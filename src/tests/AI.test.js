import Ship from "../scripts/Ship"
import Gameboard from "../scripts/Gameboard"
import AI from "../scripts/AI"
import _ from 'lodash'


test('Gets valid places for a ship', () => {
  const board = new Gameboard(3)
  board.generateCoords()
  const ship1 = new Ship(2, true)
  const ship2 = new Ship(3, true)
  const ships = [ship1, ship2]
  const Ai =  new AI(ships, board)

  expect(Ai.getValidPositions(ship2)).toEqual([[1, 1], [1, 2], [1, 3]])
})

test('Chooses a random valid spot on the board for a ship', () => {
  const board = new Gameboard(3)
  board.generateCoords()
  const ship1 = new Ship(2, true)
  const ship2 = new Ship(3, true)
  const ships = [ship1, ship2]
  const Ai =  new AI(ships, board)

  expect(_.intersectionWith(Ai.getRandomValidCoord(ship1), board.coords.flat(1), _.isEqual).length).toBeGreaterThan(0)
})

test('Places all ships on the board correctly', () => {
  const board = new Gameboard(10)
  board.generateCoords()
  const ship1 = new Ship(2)
  const ship2 = new Ship(3)
  const ship3 = new Ship(5)
  const ships = [ship1, ship2, ship3]
  const Ai = new AI(ships, board)

  Ai.shipAlignmentRandomizer()
  Ai.placeShips()
  const shipsTotalLength = ship1.coords.length + ship2.coords.length + ship3.coords.length

  expect(board.takenCoords.length).toEqual(shipsTotalLength)
})

test('Attacks a random spot that has not been attacked yet', () => {
  const board = new Gameboard(3)
  const enemyBoard = new Gameboard(3)
  board.generateCoords()
  enemyBoard.generateCoords()
  const ai = new AI([], board, enemyBoard)

  expect(enemyBoard.attackedCoords.length).toBe(0)
  ai.attack()
  expect(enemyBoard.attackedCoords.length).toBe(1)
})

