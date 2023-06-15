import Gameboard from "./Gameboard"
import AI from "./AI"
import Player from "./Player"
import Ship from "./Ship"
import  _  from "lodash"

const Pregame = (() => {
  const AIboard = new Gameboard(10)
  const playerBoard = new Gameboard(10)
  AIboard.generateCoords()
  playerBoard.generateCoords()

  const ships = []
  ships.push(new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2))
  
  const ai = new AI(ships, AIboard, playerBoard)
  ai.shipAlignmentRandomizer()
  ai.placeShips()

  const playerShips = []
  playerShips.push(new Ship(5, true), new Ship(4, true), new Ship(3, true), new Ship(3, true), new Ship(2, true))
  const player = new Player(playerShips, playerBoard, AIboard)

  return {
    ai,
    player 
  }
})()

const Aftergame = (() => {

})()

const turn = ([x, y]) => {
  
}

export { Pregame, Aftergame, turn }