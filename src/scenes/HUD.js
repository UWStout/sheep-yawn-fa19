/* global __NWJS__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// import { centerX, centerY } from '../utils'

class HUD extends Phaser.Scene {
  // Initialize the stage and any simple settings
  init () {
    // // Set the background color
    // this.cameras.main.backgroundColor = '#7f7f7f'

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
    let text = this.add.text(80, 32, 'Countdown: ' + this._default_time,
      { font: '16px Arial', fill: '#0xff0000', align: 'center' })
    text.setOrigin(0.5, 0.5)
  }

  // Each 1000 ms call onEvent
  // this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

  formatTime (seconds) {

  }
}

// Expose the class HUD to other files
export default HUD
