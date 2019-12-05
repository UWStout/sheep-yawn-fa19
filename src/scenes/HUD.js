/* global __NWJS__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'
import Textbox from '../objects/Textbox'

import { centerX, centerY } from '../utils'

class HUD extends Phaser.Scene {
  // Initialize the stage and any simple settings
  init () {
    // If running as a packaged app, go to full screen right away
    // if (__NWJS__) {
    //   let canvas = this.sys.game.canvas
    //   let fullscreen = this.sys.game.device.fullscreen
    //   if (fullscreen.available) {
    //     canvas[fullscreen.request]()
    //   }
    // }

    // Create sound sprite for running SFX
    this.RoosterSFX = this.sound.addAudioSprite('sounds')
    this.TimeOver = false
  }

  // Load all data needed for this game state
  preload () {
    // Holds count down's inital time 2:30 min in secs
    this._default_time = 150 // 150

    this.load.image('textboxBackground', 'assets/images/textbox.png')

    // Show message that fonts are loading
    this.timeText = this.add.text(150, 32, 'Until Dawn: ' + this.formatTime(this._default_time),
      { font: '30px Roboto Condensed', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.timeText.setOrigin(0.5, 0.5)

    // Each 1000 ms calls countDown
    this.time.addEvent({ delay: 900, callback: this.countDown, callbackScope: this, loop: true })
  }

  create () {
    const dark = this.add.image((1800 / 2), (900 / 2), 'darkBackground').setAlpha(0.3)
    // Phaser.Display.Align.In.Center(dark)
    this.tweens.add({
      targets: dark,
      alpha: { value: 0, duration: 150000, ease: 'Power1' },
      yoyo: true,
      loop: -1
    })

    // Interaction
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    // Test Textbox
    const textBox = new Textbox(this, 0, 0, this.interactKey, 'textboxBackground')
    textBox.setText([
      'What is this crazy thing?!?',
      '[presses play button]',
      'Wow what a crazy beat! Let\'s have a dance party!',
      'What is all that racket!?',
      'How am I supposed to sleep with all this partying going on.',
      'I have a final in my woolen knitting class tomorrow and if I don\'t get to sleep I\'ll fail it for sure!',
      'Guess it\'s time to round-up these rowdy wolves.'
    ], [
      'Party Wolf',
      'Party Wolf',
      'Party Wolf',
      'Woolhemina',
      'Woolhemina',
      'Woolhemina',
      'Woolhemina'
    ])
    this.add.existing(textBox)
    this.updates.add(textBox)
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
    // Is there time left on the clock?
    // Subtract one second
    if (this._default_time > 0) {
      this._default_time -= 1
      this.timeText.text = ('Until Dawn: ' + this.formatTime(this._default_time))
    } else { // Deletes countdown timer, creates, and shows game over text in the center of the screen
      if (this.TimeOver === false) {
        this.TimeOver = true
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
        this.RoosterSFX.play('RoosterCrow', { volume: this.RoosterSFX.volume }) //change this volume later so it can be adjusted
        this.gameOverText.setOrigin(0.5, 0.5)
      }
    }
  }
}

// Expose the class HUD to other files
export default HUD
