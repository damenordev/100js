export interface IArkanoidDrawArgs {
  gameState: 'start' | 'countdown' | 'playing' | 'gameover'
  score: number
  formattedTime: string
  isSoundOn: boolean
  countdownValue?: number
}

export interface IArkanoidBallMoveArgs {
  deltaTime: number
  canvasWidth: number
  canvasHeight: number
  paddleX: number
  paddleY: number
  paddleWidth: number
  paddleHeight: number
}

export interface IArkanoidPaddleArgs {
  ctx: CanvasRenderingContext2D
  sprite: HTMLImageElement
  x: number
  y: number
  scaleX: number
  scaleY: number
}

export interface IArkanoidPaddleMoveArgs {
  leftPressed: boolean
  rightPressed: boolean
  canvasWidth: number
  deltaTime: number
}
