import { ARKANOID_COUNTDOWN_START } from './Arkanoid.constants'

export class ArkanoidGameState {
  gameState: 'start' | 'countdown' | 'playing' | 'gameover'
  score: number
  gameTime: number
  countdownValue: number
  isSoundOn: boolean
  isPaused: boolean
  leftPressed: boolean
  rightPressed: boolean
  private countdownInterval: number | null

  constructor() {
    this.gameState = 'start'
    this.score = 0
    this.gameTime = 0
    this.countdownValue = ARKANOID_COUNTDOWN_START
    this.isSoundOn = true
    this.isPaused = false
    this.leftPressed = false
    this.rightPressed = false
    this.countdownInterval = null
  }

  isPlaying(): boolean {
    return this.gameState === 'playing'
  }

  isStartOrGameOver(): boolean {
    return this.gameState === 'start' || this.gameState === 'gameover'
  }

  startCountdown() {
    this.gameState = 'countdown'
    this.countdownValue = ARKANOID_COUNTDOWN_START
    this.countdownInterval = window.setInterval(() => {
      this.countdownValue--
      if (this.countdownValue === 0) {
        this.gameState = 'playing'
        window.clearInterval(this.countdownInterval!)
        this.countdownInterval = null
      }
    }, 1000)
  }

  setGameOver() {
    this.gameState = 'gameover'
    if (this.countdownInterval) {
      window.clearInterval(this.countdownInterval)
      this.countdownInterval = null
    }
  }

  increaseScore(points: number) {
    this.score += points
  }

  updateTime(deltaTime: number) {
    if (this.gameState === 'playing' && !this.isPaused) {
      this.gameTime += deltaTime
    }
  }

  toggleSound() {
    this.isSoundOn = !this.isSoundOn
  }

  togglePause() {
    if (this.gameState === 'playing') {
      this.isPaused = !this.isPaused
    }
  }

  reset() {
    this.score = 0
    this.gameTime = 0
    this.countdownValue = ARKANOID_COUNTDOWN_START
    this.isPaused = false
    this.leftPressed = false
    this.rightPressed = false
    if (this.countdownInterval) {
      window.clearInterval(this.countdownInterval)
      this.countdownInterval = null
    }
  }
}
