/* global __NWJS__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// import { centerX, centerY } from '../utils'

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
    this.timeText = this.add.text(80, 32, 'Till Dawn: ' + this._default_time,
      { font: '16px Roboto Condensed', fontStyle: 'bold', fill: '#0xff0000', align: 'center' })
    this.timeText.setOrigin(0.5, 0.5)

    // Each 1000 ms calls countDown
    this.time.addEvent({ delay: 1000, callback: this.countDown, callbackScope: this, loop: true })
  }

  formatTime (seconds) {

  }

  // Decreases time 1 sec at a time
  countDown () {
    this._default_time -= 1
    this.timeText.text = ('Till Dawn: ' + this._default_time)
  }

  // Calls once per frame
  update () {
    // if (this.text) {
    //   console.log('were in.')
    //   this.countDown()
    // }

    this.countDown()

    // this.text.text = 'Event.progress: ' +
  }
}

// Expose the class HUD to other files
export default HUD
