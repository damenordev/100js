export class ArkanoidPaddle {
  x: number;
  y: number;
  width: number;
  height: number;
  sensitivity: number;
  ctx: CanvasRenderingContext2D;
  sprite: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, sprite: HTMLImageElement, x: number, y: number, width: number, height: number, sensitivity: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sensitivity = sensitivity;
    this.ctx = ctx;
    this.sprite = sprite;
  }

  draw() {
    this.ctx.drawImage(this.sprite, 29, 174, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  move(leftPressed: boolean, rightPressed: boolean, canvasWidth: number) {
    if (rightPressed && this.x < canvasWidth - this.width) {
      this.x += this.sensitivity;
    } else if (leftPressed && this.x > 0) {
      this.x -= this.sensitivity;
    }
  }
}
