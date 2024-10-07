import type { ArkanoidBall } from './ArkanoidBall'

export class ArkanoidBrick {
  ctx: CanvasRenderingContext2D
  bricksImage: HTMLImageElement
  x: number
  y: number
  width: number
  height: number
  color: number // Usamos un índice para el color, que luego se usa como clip en la imagen
  status: number // Activo o destruido
  static BRICK_STATUS = {
    ACTIVE: 1,
    DESTROYED: 0,
  }

  constructor(ctx: CanvasRenderingContext2D, bricksImage: HTMLImageElement, x: number, y: number, width: number, height: number, color: number) {
    this.ctx = ctx
    this.bricksImage = bricksImage
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.status = ArkanoidBrick.BRICK_STATUS.ACTIVE
  }

  // Método para dibujar el ladrillo
  draw() {
    if (this.status === ArkanoidBrick.BRICK_STATUS.DESTROYED) return // No dibujar si está destruido

    const clipX = this.color * this.width // Se utiliza para seleccionar la parte de la imagen que corresponde a este color

    this.ctx.drawImage(
      this.bricksImage, // Imagen
      clipX, // Coordenada X en la imagen de sprites
      0, // Coordenada Y en la imagen de sprites (asumimos que es fija)
      this.width, // Ancho del recorte
      this.height, // Alto del recorte
      this.x, // Posición X en el canvas
      this.y, // Posición Y en el canvas
      this.width, // Ancho de destino en el canvas
      this.height // Alto de destino en el canvas
    )
  }

  // Detectar colisiones con la pelota
  detectCollision(ball: ArkanoidBall): boolean {
    if (this.status === ArkanoidBrick.BRICK_STATUS.DESTROYED) return false

    const isBallSameXAsBrick = ball.x > this.x && ball.x < this.x + this.width
    const isBallSameYAsBrick = ball.y > this.y && ball.y < this.y + this.height

    if (isBallSameXAsBrick && isBallSameYAsBrick) {
      ball.dy = -ball.dy // Cambiar la dirección de la pelota
      this.status = ArkanoidBrick.BRICK_STATUS.DESTROYED // Marcar el ladrillo como destruido
      return true // Colisión detectada
    }

    return false // No hay colisión
  }
}
