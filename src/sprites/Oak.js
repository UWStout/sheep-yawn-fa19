/* globals __DEV__ */

// Import the entire 'Tree' namespace
import Tree from './Tree'

class Oak extends Tree {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'treeImage')
    this.setTexture('treeImage')
    this.treeHeight = 20
    this.treeWidth = 85
    this.offsetX = 120
    this.offsetY = 300
    this.offsetChange = 215
    this.inFrontValue = 50
    this.name = 'oak'
  }
}

// Expose the Oak class to other files
export default Oak
