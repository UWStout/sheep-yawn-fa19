/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class Enemy extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y, imageKey, health }) {
    // Grabs items needed from Phaser.GameObjects.Sprite
    super(scene, x, y, imageKey)

    // Initialize enemy's characteristics
    this.genHealth = health

    // Event check for when health is equal to zero
    this.on('die', this.die, this)
  }

  // Decreases health by a value determined later
  takeDamage (value) {
    this.genHealth -= value
    // console.log('loss of life')
    // console.log(this.genHealth)
    // Calls event check when health is equal or less to zero
    if (this.genHealth <= 0) {
      this.emit('die')
    }
  }

  // Destroies enemy
  die () {
    this.destroy()
  }
}

// Expose the MainPlayer class to other files
export default Enemy
