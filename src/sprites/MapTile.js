/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class MapTile extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'mapTileImage')
    this.key = 'mapTile'
    this.name = 'mapTile'
  }
}

// Expose the MapTime class to other files
export default MapTile
