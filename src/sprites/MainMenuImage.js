/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class MainMenuImage extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'mainMenuTitle')
    this.key = 'mM'
    this.name = 'mM'
  }
}

// Expose the MainMenuImage class to other files
export default MainMenuImage
