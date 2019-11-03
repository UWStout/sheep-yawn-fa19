/* globals __DEV__ */

// Import the entire 'Tree' namespace
import Tree from './Tree'

class Pine extends Tree {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'pineImage')
    this.setTexture('pineImage')
    this.treeHeight = 30
    this.treeWidth = 105
    this.offsetX = 110
    this.offsetY = 300
    this.offsetChange = 215
    this.inFrontValue = 60
    this.name = 'pine'
  }
}

// Expose the MainPlayer class to other files
export default Pine
