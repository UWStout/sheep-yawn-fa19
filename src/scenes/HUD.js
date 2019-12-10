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
    this.HasWon = false
    this.happenOnce = false
    this.timeCheck = 0
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
    this.NightsCompleteAmount = 0
    // Holds count down's inital time 2:30 min in secs
    this._default_time = 150 // 150
    this.load.image('textboxBackground', 'assets/images/textbox.png')
    this.SmallWoolfHUD = this.add.image((1800 - 100), (210), 'SmallWoolfHUD').setAlpha(1)
    this.MedWoolfHUD = this.add.image((1800 - 100), (130), 'MedWoolfHUD').setAlpha(1)
    this.BigWoolfHUD = this.add.image((1800 - 100), (50), 'BigWoolfHUD').setAlpha(1)
    this.WinHUD = this.add.image((1800 / 2), (900 / 2), 'win').setAlpha(1)
    this.WinHUD.setOrigin(0.5, 0.5)
    this.LoseHUD = this.add.image((1800 / 2), (900 / 2), 'lose').setAlpha(1)
    this.LoseHUD.setOrigin(0.5, 0.5)
    this.WinHUD.visible = false
    this.LoseHUD.visible = false

    this.SmallWolfCountText = this.add.text((1800 - 70), (215), ' / ',
      { font: '40px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.SmallWolfCountText.setOrigin(0.5, 0.5)

    this.MedWolfCountText = this.add.text((1800 - 70), (135), ' / ',
      { font: '40px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.MedWolfCountText.setOrigin(0.5, 0.5)

    this.BigWolfCountText = this.add.text((1800 - 70), (55), ' / ',
      { font: '40px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.BigWolfCountText.setOrigin(0.5, 0.5)

    this.NightsCompleteTextWon = this.add.text(1280, 450, '' + this.NightsCompleteAmount,
      { font: '100px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.NightsCompleteTextWon.setOrigin(0.5, 0.5)
    this.NightsCompleteTextWon.visible = false

    this.NightsCompleteTextLost = this.add.text(1265, 300, '' + this.NightsCompleteAmount,
      { font: '100px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.NightsCompleteTextLost.setOrigin(0.5, 0.5)
    this.NightsCompleteTextLost.visible = false

    this.BabyWolfAsleepTotalText = this.add.text(1500, 700, '' + this.BabyWolfAsleepTotalAmount,
      { font: '100px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.BabyWolfAsleepTotalText.setOrigin(0.5, 0.5)
    this.BabyWolfAsleepTotalText.visible = false

    this.MedWolfAsleepTotalText = this.add.text(930, 705, '' + this.MedWolfAsleepTotalAmount,
      { font: '100px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.MedWolfAsleepTotalText.setOrigin(0.5, 0.5)
    this.MedWolfAsleepTotalText.visible = false

    this.BigWolfAsleepTotalText = this.add.text(350, 710, '' + this.BigWolfAsleepTotalAmount,
      { font: '100px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.BigWolfAsleepTotalText.setOrigin(0.5, 0.5)
    this.BigWolfAsleepTotalText.visible = false

    this.timeText = this.add.text(610, 50, '' + this.formatTime(this._default_time),
      { font: '70px comic sans', fontStyle: 'bold', fill: '#FFFFFF', align: 'center' })
    this.timeText.setOrigin(0.5, 0.5)

    this.timeImage = this.add.image(270, 50, 'timerImage').setAlpha(1)
    this.timeImage.setScale(0.8)

    // Each 1000 ms calls countDown
    this.time.addEvent({ delay: 900, callback: this.countDown, callbackScope: this, loop: true })
  }

  create () {
    this.ContinueButton = this.add.sprite(900, 700, 'ContinueButton').setInteractive()
    this.ContinueButton.setScale(0.8)
    this.ContinueButton.on('pointerdown', function (pointer) {
      this.resetLevel()
    }.bind(this))
    this.ContinueButton.on('pointerover', function () {
      this.ContinueButton.setTexture('ContinuePressedButton')
    }, this)
    this.ContinueButton.on('pointerout', function () {
      this.ContinueButton.setTexture('ContinueButton')
    }, this)

    this.MenuButton = this.add.sprite(1600, 400, 'MenuButton').setInteractive()
    this.MenuButton.setScale(0.8)
    this.MenuButton.on('pointerdown', function (pointer) {
      this.GoToMenu()
    }.bind(this))
    this.MenuButton.on('pointerover', function () {
      this.MenuButton.setTexture('MenuPressedButton')
    }, this)
    this.MenuButton.on('pointerout', function () {
      this.MenuButton.setTexture('MenuButton')
    }, this)

    this.ContinueButton.visible = false
    this.MenuButton.visible = false

    this.dark = this.add.image((1800 / 2), (900 / 2), 'darkBackground').setAlpha(1)
    this.timeImage.depth = this.timeText.depth - 1
    this.dark.depth = this.timeImage.depth - 1
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
    this.NightsCompleteAmount = this.mySheepScene.getNightsComplete()
    if ((this.BabyWolfAwakeCurrentAmount === this.SmallWolfCount) && (this.MedWolfAwakeCurrentAmount === this.MedWolfCount) && (this.BigWolfAwakeCurrentAmount === this.BigWolfCount)) {
      this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.DecideWinLose, callbackScope: this, loop: false })
    }
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
      this.timeText.text = ('' + this.formatTime(this._default_time))
      this.NightsCompleteTextLost.text = ('' + this.NightsCompleteAmount)
      this.NightsCompleteTextWon.text = ('' + this.NightsCompleteAmount)
      this.BigWolfAsleepTotalText.text = ('' + this.BigWolfAsleepTotalAmount)
      this.MedWolfAsleepTotalText.text = ('' + this.MedWolfAsleepTotalAmount)
      this.BabyWolfAsleepTotalText.text = ('' + this.BabyWolfAsleepTotalAmount)
      this.SmallWolfCountText.text = (this.BabyWolfAwakeCurrentAmount + ' / ' + this.SmallWolfCount)
      this.MedWolfCountText.text = (this.MedWolfAwakeCurrentAmount + ' / ' + this.MedWolfCount)
      this.BigWolfCountText.text = (this.BigWolfAwakeCurrentAmount + ' / ' + this.BigWolfCount)
    } else { // Deletes countdown timer, creates, and shows game over text in the center of the screen
      this.DecideWinLose()
    }
  }

  GoToMenu () {
    console.log('go to menu')
  }

  DecideWinLose () {
    if (this._default_time <= 0) {
      if (this.happenOnce === false) {
        this.happenOnce = true
        this.timeText.visible = false
        this.timeImage.visible = false
        this.SmallWolfCountText.visible = false
        this.MedWolfCountText.visible = false
        this.BigWolfCountText.visible = false
        this.SmallWoolfHUD.visible = false
        this.MedWoolfHUD.visible = false
        this.BigWoolfHUD.visible = false
        this.dark.visible = false
        this.RoosterSFX.play('RoosterCrow', { volume: this.RoosterSFX.volume }) // change this volume later so it can be adjusted
        this.HasWon = false
        this.mySheepScene.changeWinLoseMusic(this.HasWon)
        this.LoseHUD.visible = true
        this.mySheepScene.turnSFXOff()
        this.NightsCompleteTextLost.visible = true
        this.BabyWolfAsleepTotalText.visible = true
        this.MedWolfAsleepTotalText.visible = true
        this.BigWolfAsleepTotalText.visible = true
        this.MenuButton.visible = true
      }
    } else if ((this.BabyWolfAwakeCurrentAmount === this.SmallWolfCount) && (this.MedWolfAwakeCurrentAmount === this.MedWolfCount) && (this.BigWolfAwakeCurrentAmount === this.BigWolfCount)) {
      if (this.happenOnce === false) {
        this.happenOnce = true
        this.timeText.visible = false
        this.timeImage.visible = false
        this.SmallWolfCountText.visible = false
        this.MedWolfCountText.visible = false
        this.BigWolfCountText.visible = false
        this.SmallWoolfHUD.visible = false
        this.MedWoolfHUD.visible = false
        this.BigWoolfHUD.visible = false
        this.dark.visible = false
        this.HasWon = true
        this.mySheepScene.changeWinLoseMusic(this.HasWon)
        this.WinHUD.visible = true
        this.BabyWolfAwakeCurrentAmount = 0
        this.mySheepScene.turnSFXOff()
        this.NightsCompleteTextWon.visible = true
        this.ContinueButton.visible = true
      }
    }
  }

  resetLevel () {
    this.BabyWolfAwakeCurrentAmount = 0
    this.MedWolfAwakeCurrentAmount = 0
    this.BigWolfAwakeCurrentAmount = 0
    this.TimeOver = false
    this._default_time = 150 // 150
    this.LoseHUD.visible = false
    this.WinHUD.visible = false
    this.NightsCompleteTextLost.visible = false
    this.NightsCompleteTextWon.visible = false
    this.BabyWolfAsleepTotalText.visible = false
    this.MedWolfAsleepTotalText.visible = false
    this.BigWolfAsleepTotalText.visible = false
    this.ContinueButton.visible = false
    this.MenuButton.visible = false
    this.dark = this.add.image((1800 / 2), (900 / 2), 'darkBackground').setAlpha(1)
    this.timeImage.depth = this.timeText.depth - 1
    this.dark.depth = this.timeImage.depth - 1
    this.tweens.add({
      targets: this.dark,
      alpha: { value: 0, duration: 150000, ease: 'Power1' },
      yoyo: true,
      loop: -1
    })
    this.timeText.visible = true
    this.timeImage.visible = true
    this.SmallWolfCountText.visible = true
    this.MedWolfCountText.visible = true
    this.BigWolfCountText.visible = true
    this.SmallWoolfHUD.visible = true
    this.MedWoolfHUD.visible = true
    this.BigWoolfHUD.visible = true
    this.mySheepScene.resetAfterWin()
    this.happenOnce = false
  }
}
// Expose the class HUD to other files
export default HUD
