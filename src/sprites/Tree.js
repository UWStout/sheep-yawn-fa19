/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class Tree extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, imageKey) {
    // Initialize object basics
    super(scene, x, y, imageKey)
    this.key = 'tree'
    this.name = 'tree'
    this.treeHeight = 0
    this.treeWidth = 0
    this.offsetX = 0
    this.offsetY = 0
    this.offsetChange = 0
    this.inFrontValue = 0
    this.enemyBehindTree = false
  }
}

// Expose the Tree class to other files
export default Tree
