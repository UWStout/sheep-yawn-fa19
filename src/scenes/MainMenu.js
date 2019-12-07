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
    this.load.image('mainMenuTitle', 'assets/images/MainMenu.png')
    this.load.image('playPressed', 'assets/images/Play_pressed.png')
    this.load.image('playUnpressed', 'assets/images/Play_unpressed.png')
    this.load.image('optionsPressed', 'assets/images/Options_pressed.png')
    this.load.image('optionsUnpressed', 'assets/images/Options_unpressed.png')
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

    this.add.existing(this.mainMenuTitleImage)
    this.mainMenuTitleImage.setOrigin(0.5, 0.5)
    // this.mainMenuTitleImage.depth = 1000
    console.log(this.mainMenuTitleImage)
  }
}

// Expose the class MainMenu to other files
export default MainMenu
