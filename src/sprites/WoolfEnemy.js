/* globals __DEV__ */

// Import the entire 'Enemy' namespace
import Enemy from './Enemy'

class WoolfEnemy extends Enemy {
  // Initalization
  constructor ({ scene, x, y, health, zzzAmount }) {
    // Grabs items needed from Enemy class
    super({ scene, x, y, imageKey: 'woolfImage', health, zzzAmount })
    this.key = 'woolf'
    this.name = 'woolf'
  }
}

// Expose the MainPlayer class to other files
export default WoolfEnemy
