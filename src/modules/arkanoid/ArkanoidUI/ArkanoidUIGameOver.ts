import { ArkanoidUIBase } from './ArkanoidUIBase'

export class ArkanoidUIGameOver extends ArkanoidUIBase {
  draw({ score, isSoundOn }: { score: number; isSoundOn: boolean }) {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.font = '32px "Press Start 2P", monospace'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 3)

    this.ctx.font = '16px "Press Start 2P", monospace'
    this.ctx.fillText(`Score: ${score}`, this.canvas.width / 2, this.canvas.height / 2 - 30)

    this.drawPixelButton('Play Again', this.canvas.width / 2, (this.canvas.height * 2) / 3 - 50)
    this.drawPixelSoundToggle(isSoundOn, (this.canvas.height * 2) / 3 + 40)
  }
}
