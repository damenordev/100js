import type { IArkanoidDrawArgs } from '../Arkanoid.types'

import { ArkanoidUIGame } from './ArkanoidUIGame'
import { ArkanoidUIMenu } from './ArkanoidUIMenu'
import { ArkanoidUIGameOver } from './ArkanoidUIGameOver'
import { ArkanoidUICountdown } from './ArkanoidUICountdown'

export class ArkanoidUI {
  private ctx: CanvasRenderingContext2D
  private canvas: HTMLCanvasElement
  private uiGame: ArkanoidUIGame
  private uiMenu: ArkanoidUIMenu
  private uiGameOver: ArkanoidUIGameOver
  private uiCountdown: ArkanoidUICountdown

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx
    this.canvas = canvas
    this.uiGame = new ArkanoidUIGame(ctx, canvas)
    this.uiMenu = new ArkanoidUIMenu(ctx, canvas)
    this.uiGameOver = new ArkanoidUIGameOver(ctx, canvas)
    this.uiCountdown = new ArkanoidUICountdown(ctx, canvas)
  }

  draw(args: IArkanoidDrawArgs) {
    const { gameState, score, formattedTime, isSoundOn, countdownValue } = args
    if (gameState === 'start') return this.uiMenu.draw({ isSoundOn })
    if (gameState === 'countdown') return this.uiCountdown.draw({ countdownValue: countdownValue! })
    if (gameState === 'playing') return this.uiGame.draw({ formattedTime })
    if (gameState === 'gameover') return this.uiGameOver.draw({ score, isSoundOn })
  }

  updateScore(newScore: number) {
    this.uiGame.updateScore(newScore)
  }

  isClickOnButton(x: number, y: number): boolean {
    const buttonX = this.canvas.width / 2
    const buttonY = (this.canvas.height * 2) / 3 - 50
    const buttonWidth = 200
    const buttonHeight = 50

    return x >= buttonX - buttonWidth / 2 && x <= buttonX + buttonWidth / 2 && y >= buttonY && y <= buttonY + buttonHeight
  }

  isClickOnSoundToggle(x: number, y: number): boolean {
    const toggleX = this.canvas.width / 2
    const toggleY = (this.canvas.height * 2) / 3 + 40
    const toggleWidth = 100
    const toggleHeight = 30

    return x >= toggleX - toggleWidth / 2 && x <= toggleX + toggleWidth / 2 && y >= toggleY && y <= toggleY + toggleHeight
  }

  drawPauseOverlay() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.font = '24px "Press Start 2P", monospace'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2 - 20)

    this.ctx.font = '10px "Press Start 2P", monospace'
    this.ctx.fillText('Press SPACE to continue', this.canvas.width / 2, this.canvas.height / 2 + 20)
  }
}
