export class ArkanoidAudioManager {
  paddleHitSound: HTMLAudioElement
  brickHitSound: HTMLAudioElement
  gameOverSound: HTMLAudioElement

  constructor() {
    this.paddleHitSound = new Audio('/sounds/arkanoid/paddle.wav')
    this.brickHitSound = new Audio('/sounds/arkanoid/block.wav')
    this.gameOverSound = new Audio('/sounds/arkanoid/gameover.wav')
  }

  playPaddleHit() {
    this.paddleHitSound.play()
  }

  playBrickHit() {
    this.brickHitSound.play()
  }

  playGameOver() {
    this.gameOverSound.play()
  }

  toggleMute(muted: boolean) {
    this.paddleHitSound.muted = muted
    this.brickHitSound.muted = muted
    this.gameOverSound.muted = muted
  }
}
