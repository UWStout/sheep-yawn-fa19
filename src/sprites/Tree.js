/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class Tree extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'treeImage')
    this.key = 'tree'
    this.name = 'tree'
  }
}

// Expose the MainPlayer class to other files
export default Tree
