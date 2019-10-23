/* global __NWJS__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

import { centerX, centerY } from '../utils'

class HUD extends Phaser.Scene {
  // Initialize the stage and any simple settings
  init () {
    // If running as a packaged app, go to full screen right away
    if (__NWJS__) {
      let canvas = this.sys.game.canvas
      let fullscreen = this.sys.game.device.fullscreen
      if (fullscreen.available) {
        canvas[fullscreen.request]()
      }
    }
  }

  // Load all data needed for this game state
  preload () {
    // Holds count down's inital time 2:30 min in secs
    this._default_time = 150

    // Show message that fonts are loading
    this.timeText = this.add.text(80, 32, 'Till Dawn: ' + this.formatTime(this._default_time),
      { font: '16px Roboto Condensed', fontStyle: 'bold', fill: '#0xff0000', align: 'center' })
    this.timeText.setOrigin(0.5, 0.5)

    // Each 1000 ms calls countDown
    this.time.addEvent({ delay: 900, callback: this.countDown, callbackScope: this, loop: true })
  }

  // Converts seconds to mins and secs
  // Formats conversion into digital time
  formatTime (seconds) {
    // Calculation of Minutes
    this.minutes = Math.floor(seconds / 60)

    // Calculation of Seconds
    this.partInSeconds = seconds % 60

    // Adds left zeros to seconds
    this.partInSeconds = this.partInSeconds.toString().padStart(2, '0')

    // Returns formated time
    return `${this.minutes}:${this.partInSeconds}`
  }

  // Decreases time 1 sec at a time
  countDown () {
    if (this._default_time > 0) {
      this._default_time -= 1
      this.timeText.text = ('Till Dawn: ' + this.formatTime(this._default_time))
    } else { // Deletes countdown timer, creates, and shows game over text in the center of the screen
      this.timeText.destroy()
      this.gameOverText = this.add.text(
        centerX(this),
        centerY(this),
        'Game Over',
        {
          font: '110px Roboto Condensed',
          fontStyle: 'bold',
          fill: '#0xff0000',
          align: 'center'
        }
      )
      this.gameOverText.setOrigin(0.5, 0.5)
    }
  }

  // Creates text to indicate you are out of time
  outOfTime () {
    if (this._default_time <= 0.01) {
      console.log('We have reached zero')
      console.log(this._default_time)
      this.cameras.main.backgroundColor = '#7f7f7f'
      this.cameras.main.alpha(0.7)
    }
  }

  // Calls once per frame
  update () {
    // this.countDown()
    // this.outOfTime()
  }
}

// Expose the class HUD to other files
export default HUD