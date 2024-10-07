import { ArkanoidGame } from './ArkanoidGame'
import type { IArkanoidDrawArgs } from './Arkanoid.types'

export class ArkanoidEventHandler {
  private game: ArkanoidGame

  constructor(game: ArkanoidGame) {
    this.game = game
  }

  initEvents() {
    this.game.canvas.addEventListener('click', this.handleClick.bind(this))
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this))
  }

  private handleClick(e: MouseEvent) {
    const rect = this.game.canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (this.game.gameState.isStartOrGameOver()) {
      if (this.game.ui.isClickOnButton(x, y)) {
        this.game.startGame()
      } else if (this.game.ui.isClickOnSoundToggle(x, y)) {
        this.game.toggleSound()
      }
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.code === 'ArrowRight') {
      this.game.gameState.rightPressed = true
    } else if (e.code === 'ArrowLeft') {
      this.game.gameState.leftPressed = true
    } else if (e.code === 'Space') {
      this.game.togglePause()
      this.updateUI()
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (e.code === 'ArrowRight') {
      this.game.gameState.rightPressed = false
    } else if (e.code === 'ArrowLeft') {
      this.game.gameState.leftPressed = false
    }
  }

  private updateUI() {
    const drawArgs: IArkanoidDrawArgs = {
      formattedTime: this.formatTime(this.game.gameState.gameTime),
      gameState: this.game.gameState.gameState,
      countdownValue: this.game.gameState.countdownValue,
      score: this.game.gameState.score,
      isSoundOn: this.game.gameState.isSoundOn,
    }
    this.game.ui.draw(drawArgs)
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
}
