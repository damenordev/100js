import { ArkanoidUIBase } from './ArkanoidUIBase'

export class ArkanoidUICountdown extends ArkanoidUIBase {
  draw({ countdownValue }: { countdownValue: number }) {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.font = '48px "Press Start 2P", monospace'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(countdownValue.toString(), this.canvas.width / 2, this.canvas.height / 2)
  }
}
