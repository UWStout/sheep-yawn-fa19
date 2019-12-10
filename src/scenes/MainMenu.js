/* global __NWJS__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

import { centerX, centerY } from '../utils'

import MainMenuImage from '..//sprites/MainMenuImage'
import PlayPressed from '..//sprites/PlayPressed'
import PlayUnpressed from '..//sprites/PlayUnpressed'
import OptionsPressed from '..//sprites/OptionsPressed'
import OptionsUnpressed from '..//sprites/OptionsUnpressed'
import CreditsPressed from '..//sprites/CreditsPressed'
import CreditsUnpressed from '..//sprites/CreditsUnpressed'
import CreditsPanel from '..//sprites/CreditsPanel'

class MainMenu extends Phaser.Scene {
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

    // Create sound here
    // this.RoosterSFX = this.sound.addAudioSprite('sounds')
  }

  // Load all data needed for this scene
  preload () {
    this.load.image('mainMenuTitle', 'assets/images/MainMenu_SplashScreen.png')
    this.load.image('playPressed', 'assets/images/PlayPressedButton.png')
    this.load.image('playUnpressed', 'assets/images/PlayButton.png')
    this.load.image('creditsPressed', 'assets/images/CreditsPressedButton.png')
    this.load.image('creditsUnpressed', 'assets/images/CreditsButton.png')
    this.load.image('creditsPanel', 'assets/images/CreditsPanel.png')
    this.load.image('backPressed', 'assets/images/BackPressedButton.png')
    this.load.image('backUnpressed', 'assets/images/BackButton.png')
  }

  // Creates objects and other items used within the scene
  create () {
    // Creation of MainMenu title
    this.mainMenuTitleImage = new MainMenuImage({
      scene: this,
      x: this.sys.game.config.width / 2,
      y: this.sys.game.config.height / 2
    })

    // Creation of credits panel
    this.credPanel = new CreditsPanel({
      scene: this,
      x: this.sys.game.config.width / 2,
      y: this.sys.game.config.height / 2
    })

    // Add items to scene
    this.add.existing(this.mainMenuTitleImage)
    this.mainMenuTitleImage.setOrigin(0.5, 0.5)

    // Set up for button interaction
    // Play Button
    this.PlayButton = this.add.sprite(1610, 250, 'playUnpressed').setInteractive()
    this.PlayButton.setScale(0.7)

    // Credits Button
    this.CreditsButton = this.add.sprite(1610, 450, 'creditsUnpressed').setInteractive()
    this.CreditsButton.setScale(0.7)

    // Add credits panel to scene
    this.add.existing(this.credPanel)
    this.credPanel.setVisible(false)

    // Back Button
    this.BackButton = this.add.sprite(1310, 598, 'backUnpressed').setInteractive()
    this.BackButton.setScale(0.9)
    this.BackButton.setVisible(false)
    this.BackButton.setActive(false)

    // Switch image to play onPress button
    this.PlayButton.on('pointerover', function () {
      this.PlayButton.setTexture('playPressed')
    }, this)
    // Switch image to play offPress button
    this.PlayButton.on('pointerout', function () {
      this.PlayButton.setTexture('playUnpressed')
    }, this)

    // Switch image to credits onPress button
    this.CreditsButton.on('pointerover', function () {
      this.CreditsButton.setTexture('creditsPressed')
    }, this)
    // Switch image to credits offPress button
    this.CreditsButton.on('pointerout', function () {
      this.CreditsButton.setTexture('creditsUnpressed')
    }, this)
    // Call bringUpCredits function when CreditsButton is pressed
    this.CreditsButton.on('pointerdown', function (pointer) {
      this.bringUpCredits()
    }.bind(this))
  }

  toPlay () {
    this.scene.start('SheepMove')
  }

  bringUpCredits () {
    this.PlayButton.setVisible(false)
    this.PlayButton.setActive(false)
    this.CreditsButton.setVisible(false)
    this.CreditsButton.setActive(false)
    this.credPanel.setVisible(true)
    this.BackButton.setVisible(true)
    this.BackButton.setActive(true)
  }
}

// Expose the class MainMenu to other files
export default MainMenu
