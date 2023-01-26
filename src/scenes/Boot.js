/* global __NWJS__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

import { centerX, centerY } from '../utils'

class Boot extends Phaser.Scene {
  // Initialize the stage and any simple settings
  init () {
    // Set the background color
    this.cameras.main.setBackgroundColor('#000000')

    // If running as a packaged app, go to full screen right away
    if (__NWJS__ && this.scale && !this.scale.isFullscreen) {
      this.scale.startFullscreen()
    }
  }

  // Load all data needed for this game state
  preload () {
    // Show message that fonts are loading
    const text = this.add.text(centerX(this), centerY(this),
      'loading', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.setOrigin(0.5, 0.5)

    // Read the assets for the splash screen (used in next stage)
    this.load.image('SpoonImage', 'assets/images/SpeakingSpoonStudioCenter.png')
    this.load.image('logo', './assets/images/icon.png')
    this.load.image('safariCar', 'assets/images/safariCar-reduced.png')
    this.load.image('safariLogo', 'assets/images/safariLogo.png')
    this.load.audioSprite('sounds', 'assets/audio/sounds.json', [
      'assets/audio/sounds.ogg', 'assets/audio/sounds.mp3',
      'assets/audio/sounds.m4a', 'assets/audio/sounds.ac3'
    ])
  }

  // Called repeatedly after pre-load to draw the stage
  update () {
    this.scene.start('StudioSplash')
  }
}

// Expose the Boot class for use in other modules
export default Boot
