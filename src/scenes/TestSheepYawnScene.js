/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// Import MainCharacter's sprite
// import MainCharacter from '..//sprites/Player'

class TestSheepYawnScene extends Phaser.scene {
  init (data) {}

  // Queue up assets to load
  // Note: these are loaded asyncronously after preload() completes
  // and before 'create()' is run.
  preload () {
    this.load.image('sheepy', 'assets/Test Art/woolhemina_testSprite_128.png')
  }

  // Build the scene by adding GameObjects and configuring specific
  // entities (runs after all queued assets are loaded)
  create () {
    // Adds sheep image to scene
    // eslint-disable-next-line prefer-const
    let sheep = this.add.image(0, 0, 'sheepy')
    sheep.setOrigin(0, 0)

    // Set up the key objects
    this.setupKeyboard()

    if (__DEV__) {
      this.debugDraw.bringToTop()
    }
  }

  setupKeyboard () {
    // Handy way to setup cursor keys (and spacebar and shift)
    this.cursors = this.input.keyboard.createCursorKeys()

    // Setup 'e' key for interaction
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.interactKey.oldDown = false
  }
}

// Expose the class TestSheepYawnScene to other files
export default TestSheepYawnScene
