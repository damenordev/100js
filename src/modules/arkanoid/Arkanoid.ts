import { ArkanoidGame } from './ArkanoidGame'
import { ArkanoidEventHandler } from './ArkanoidEventHandler'
import { ArkanoidRenderer } from './ArkanoidRenderer'
import { ArkanoidFontLoader } from './ArkanoidFontLoader'

export class Arkanoid {
  private game: ArkanoidGame
  private eventHandler: ArkanoidEventHandler
  private renderer: ArkanoidRenderer
  private fontLoader: ArkanoidFontLoader

  constructor(canvas: HTMLCanvasElement, sprite: HTMLImageElement, bricksImage: HTMLImageElement) {
    this.game = new ArkanoidGame(canvas, sprite, bricksImage)
    this.eventHandler = new ArkanoidEventHandler(this.game)
    this.renderer = new ArkanoidRenderer(this.game)
    this.fontLoader = new ArkanoidFontLoader()

    this.init()
  }

  private async init() {
    await this.fontLoader.load()
    this.eventHandler.initEvents()
    this.renderer.draw()
    this.loop()
  }

  private loop(currentTime: number = performance.now()) {
    const deltaTime = (currentTime - this.game.lastTime) / 1000
    this.game.lastTime = currentTime

    this.game.update(deltaTime)
    this.renderer.draw()

    this.game.animationFrameId = requestAnimationFrame(this.loop.bind(this))
  }
}
