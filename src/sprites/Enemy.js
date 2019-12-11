
// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class Enemy extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y, imageKey, health, zzzAmount }) {
    // Grabs items needed from Phaser.GameObjects.Sprite
    super(scene, x, y, imageKey)

    // Initialize enemy's characteristics
    this.genHealth = health
    this.zzzCount = zzzAmount
    this.isAwake = true
    this.hasMoved = false

    // Event check for when health is equal to zero
    this.on('die', this.die, this)
  }

  // Decreases health by a value determined later
  takeDamage (value) {
    this.genHealth -= value
    // console.log('loss of life')
    // console.log(this.health)
    // Calls event check when health is equal or less to zero
    if (this.genHealth <= 0) {
      this.emit('die')
      this.isAwake = false
    } else {
      this.isAwake = true
    }
  }

  // Gets Enemy's current health
  getHealth () {
    return this.genHealth
  }

  // Gets Enemy's name
  getEnemyName () {
    return this.name
  }

  // Calls zzzDrop function when health is zero
  // Destroies enemy
  die () {
    if (this.scene.zzzDrop) {
      // console.log(this.zCount)
      this.scene.zzzDrop(this.x, this.y, this.zzzCount)
    }

    // this.destroy()
  }
}

// Expose the Enemy class to other files
export default Enemy
