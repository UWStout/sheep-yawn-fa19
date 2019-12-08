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
    this.mySheepScene = this.scene.get('SheepMove')
  }

  // Load all data needed for this game state
  preload () {
    this.SmallWolfCount = 0
    this.MedWolfCount = 0
    this.BigWolfCount = 0
    this.BabyWolfAsleepTotalAmount = 0
    this.MedWolfAsleepTotalAmount = 0
    this.BigWolfAsleepTotalAmount = 0
    this.BabyWolfAwakeCurrentAmount = 0
    this.MedWolfAwakeCurrentAmount = 0
    this.BigWolfAwakeCurrentAmount = 0
    // Holds count down's inital time 2:30 min in secs
    this._default_time = 150 // 150
    this.load.image('textboxBackground', 'assets/images/textbox.png')
    this.add.image((1800 - 100), (50), 'SmallWoolfHUD').setAlpha(1)
    this.add.image((1800 - 100), (130), 'MedWoolfHUD').setAlpha(1)
    this.add.image((1800 - 100), (210), 'BigWoolfHUD').setAlpha(1)
    // Show message that fonts are loading
    this.SmallWolfCountText = this.add.text((1800 - 70), (55), ' / ',
      { font: '40px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.SmallWolfCountText.setOrigin(0.5, 0.5)

    this.MedWolfCountText = this.add.text((1800 - 70), (135), ' / ',
      { font: '40px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.MedWolfCountText.setOrigin(0.5, 0.5)

    this.BigWolfCountText = this.add.text((1800 - 70), (215), ' / ',
      { font: '40px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.BigWolfCountText.setOrigin(0.5, 0.5)

    this.timeText = this.add.text(150, 32, 'Until Dawn: ' + this.formatTime(this._default_time),
      { font: '30px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.timeText.setOrigin(0.5, 0.5)

    // Each 1000 ms calls countDown
    this.time.addEvent({ delay: 900, callback: this.countDown, callbackScope: this, loop: true })
  }

  create () {
    this.dark = this.add.image((1800 / 2), (900 / 2), 'darkBackground').setAlpha(0.9)
    this.dark.depth = this.timeText.depth + 1
    this.tweens.add({
      targets: this.dark,
      alpha: { value: 0, duration: 150000, ease: 'Power1' },
      yoyo: true,
      loop: -1
    })

    // Interaction
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    // Test Textbox
    // const textBox = new Textbox(this, 0, 0, this.interactKey, 'textboxBackground')
    // textBox.setText([
    //   'What is this crazy thing?!?',
    //   '[presses play button]',
    //   'Wow what a crazy beat! Let\'s have a dance party!',
    //   'What is all that racket!?',
    //   'How am I supposed to sleep with all this partying going on.',
    //   'I have a final in my woolen knitting class tomorrow and if I don\'t get to sleep I\'ll fail it for sure!',
    //   'Guess it\'s time to round-up these rowdy wolves.'
    // ], [
    //   'Party Wolf',
    //   'Party Wolf',
    //   'Party Wolf',
    //   'Woolhemina',
    //   'Woolhemina',
    //   'Woolhemina',
    //   'Woolhemina'
    // ])
    // this.add.existing(textBox)
    // this.updates.add(textBox)
  }

  update (time, delta) {
    this.SmallWolfCount = this.mySheepScene.getBabyWoolfCount()
    this.MedWolfCount = this.mySheepScene.getMedWoolfCount()
    this.BigWolfCount = this.mySheepScene.getBigWoolfCount()
    this.BabyWolfAsleepTotalAmount = this.mySheepScene.getBabyWoolfsAsleepTotal()
    this.MedWolfAsleepTotalAmount = this.mySheepScene.getMedWoolfsAsleepTotal()
    this.BigWolfAsleepTotalAmount = this.mySheepScene.getBigWoolfsAsleepTotal()
    this.BabyWolfAwakeCurrentAmount = this.mySheepScene.getBabyWoolfsAwakeCurrent()
    this.MedWolfAwakeCurrentAmount = this.mySheepScene.getMedWoolfsAwakeCurrent()
    this.BigWolfAwakeCurrentAmount = this.mySheepScene.getBigWoolfsAwakeCurrent()
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
      this.SmallWolfCountText.text = (this.BabyWolfAwakeCurrentAmount + ' / ' + this.SmallWolfCount)
      this.MedWolfCountText.text = (this.MedWolfAwakeCurrentAmount + ' / ' + this.MedWolfCount)
      this.BigWolfCountText.text = (this.BigWolfAwakeCurrentAmount + ' / ' + this.BigWolfCount)
    } else { // Deletes countdown timer, creates, and shows game over text in the center of the screen
      if (this.TimeOver === false) {
        this.TimeOver = true
        this.timeText.destroy()
        this.gameOverText = this.add.text(
          centerX(this),
          centerY(this),
          'Game Over',
          {
            font: '110px comic sans', // doesn't seeem to actually be Comic Sans
            fontStyle: 'bold',
            fill: '#0xff0000',
            align: 'center'
          }
        )
        this.RoosterSFX.play('RoosterCrow', { volume: this.RoosterSFX.volume }) // change this volume later so it can be adjusted
        this.gameOverText.setOrigin(0.5, 0.5)
      }
    }
  }
}

// Expose the class HUD to other files
export default HUD
