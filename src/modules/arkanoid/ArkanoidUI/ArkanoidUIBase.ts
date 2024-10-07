export abstract class ArkanoidUIBase {
  protected ctx: CanvasRenderingContext2D
  protected canvas: HTMLCanvasElement

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx
    this.canvas = canvas
  }

  abstract draw(args: any): void

  protected drawPixelButton(text: string, x: number, y: number) {
    const width = 200
    const height = 50

    this.ctx.fillStyle = '#fff'
    this.ctx.fillRect(x - width / 2 - 2, y - 10, width + 4, height + 4)

    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(x - width / 2, y - 8, width, height)

    this.ctx.font = '16px "Press Start 2P", monospace'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(text, x, (y - 8) + height / 2)
  }

  protected drawPixelSoundToggle(isSoundOn: boolean, y: number) {
    const x = this.canvas.width / 2
    const width = 100
    const height = 30

    this.ctx.font = '16px "Press Start 2P", monospace'
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('SOUND', x, y - 20)

    this.ctx.fillStyle = '#fff'
    this.ctx.fillRect(x - width / 2 - 2, y - 2, width + 4, height + 4)

    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(x - width / 2, y, width, height)

    this.ctx.fillStyle = isSoundOn ? '#4ade80' : '#ef4444'
    const switchPosition = isSoundOn ? x : x - width / 2
    this.ctx.fillRect(switchPosition, y, width / 2, height)

    this.ctx.fillStyle = '#fff'
    this.ctx.font = '16px "Press Start 2P", monospace'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(isSoundOn ? 'ON' : 'OFF', x, y + height / 2)
  }
}
