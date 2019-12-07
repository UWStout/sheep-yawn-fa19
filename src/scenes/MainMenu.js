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
    this.load.image('playPressed', 'assets/images/Play_pressed.png')
    this.load.image('playUnpressed', 'assets/images/Play_unpressed.png')
    // this.load.image('optionsPressed', 'assets/images/Options_pressed.png')
    // this.load.image('optionsUnpressed', 'assets/images/Options_unpressed.png')
    this.load.image('creditsPressed', 'assets/images/Credits_pressed.png')
    this.load.image('creditsUnpressed', 'assets/images/Credits_unpressed.png')
  }

  // Creates objects and other items used within the scene
  create () {
    // Creation of MainMenu title
    this.mainMenuTitleImage = new MainMenuImage({
      scene: this,
      x: this.sys.game.config.width / 2,
      y: this.sys.game.config.height / 2
    })

    // Creation of Play Unpressed button
    this.unPlay = new PlayUnpressed({
      scene: this,
      x: 1610,
      y: 130
    })

    // Creation of Play pressed button
    this.play = new PlayPressed({
      scene: this,
      x: 1610,
      y: 130
    })

    // Creation of credits button
    this.unCredits = new CreditsUnpressed({
      scene: this,
      x: 1610,
      y: 240
    })

    // Set up for button interaction
    this.unPlay.setInteractive()

    // Add items to scene
    this.add.existing(this.mainMenuTitleImage)
    this.mainMenuTitleImage.setOrigin(0.5, 0.5)
    this.add.existing(this.unPlay)
    this.add.existing(this.play)
    this.play.setActive = false
    this.play.setVisible = false
    this.add.existing(this.unCredits)
    console.log(this.mainMenuTitleImage)

    // Set up of what button will do
    // this.unPlay.on('pointerover', this.pointerHover() {
    //   this.unPlay.setActive = false
    //   this.unPlay.setVisible = false
    //   this.play.setActive = true
    //   this.play.setVisible = true }, this)
  }
}

// Expose the class MainMenu to other files
export default MainMenu
