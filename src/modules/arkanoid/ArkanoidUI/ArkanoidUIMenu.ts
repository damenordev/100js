import { ArkanoidUIBase } from './ArkanoidUIBase'

export class ArkanoidUIMenu extends ArkanoidUIBase {
  draw({ isSoundOn }: { isSoundOn: boolean }) {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.font = '32px "Press Start 2P", monospace'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('ARKANOID', this.canvas.width / 2, this.canvas.height / 3)

    this.drawPixelButton('Play', this.canvas.width / 2, (this.canvas.height * 2) / 3 - 50)
    this.drawPixelSoundToggle(isSoundOn, (this.canvas.height * 2) / 3 + 40)

    this.ctx.font = '10px "Press Start 2P", monospace'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('Press SPACE in game to pause', this.canvas.width / 2, (this.canvas.height * 2) / 3 + 100)
  }
}
