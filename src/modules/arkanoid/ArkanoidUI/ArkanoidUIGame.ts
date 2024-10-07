import { ArkanoidUIBase } from './ArkanoidUIBase'

export class ArkanoidUIGame extends ArkanoidUIBase {
  private score: number = 0

  draw({ formattedTime }: { formattedTime: string }) {
    this.ctx.font = '16px "Press Start 2P", monospace'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'left'
    this.ctx.fillText(`Score: ${this.score}`, 10, 25)

    this.ctx.textAlign = 'right'
    this.ctx.fillText(formattedTime, this.canvas.width - 10, 25)
  }

  updateScore(newScore: number) {
    this.score = newScore
  }
}
