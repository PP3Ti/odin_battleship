import Ship from '../scripts/Ship.js'

test('Ship hit counter increases upon getting hit', () => {
  const ship = new Ship(3)
  expect(ship.hits).toEqual(0)
  ship.hit()
  expect(ship.hits).toEqual(1)
})
test('Ship is sunk when gets hit enough times', () => {
  const ship = new Ship(1)
  ship.hit()
  expect(ship.sunk).toBeTruthy()
})

test('Ship can be placed at coordinates', () => {
  const ship = new Ship(3, true)
  ship.place([1, 2])
  expect(ship.coords).toEqual([[1, 2], [2, 2], [3, 2]])
})
test('Ship can be placed vertically', () => {
  const ship = new Ship(3, true)
  ship.swapToVertical()
  ship.place([4, 4])
  expect(ship.coords).toEqual([[4, 4], [4, 3], [4, 2]])
})
test('Ship can be swapped to vertical and back to horizontal', () => {
  const ship = new Ship(2, true)
  ship.swapToVertical()
  expect(ship.horizontal).toBe(false)
  ship.swapToHorizontal()
  expect(ship.horizontal).toBe(true)
})

test('getShip function returns ship object', () => {
  const ship = new Ship(2, true)
  ship.place([1, 1])
  expect(ship.getShipObjFromCoord([1, 1])).toBe(ship)
})

