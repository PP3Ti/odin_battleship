import './styles.sass'
import AI from './scripts/AI'
import Gameboard from './scripts/Gameboard'
import Player from './scripts/Player'
import { Pregame, Aftergame, turn } from './scripts/GameController'

const dialog = document.querySelector('dialog')

dialog.showModal()
dialog.addEventListener('click', () => {
  dialog.close()
})