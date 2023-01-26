// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// Import the global config file
import config from '../config'

/**
 * Textbox class for Dynamic Text implementation in DOORS THROUGH TIME
 * Written by: Brendan PS Larson
 */
class Textbox extends Phaser.GameObjects.Sprite {
  /**
   * @param {Phaser.Scene} scene The game scene, passed through GameObject Factory
   * @param {*} x The x position on the screen (offset), default to zero
   * @param {*} y The y position on the screen (offset), defaults to zero
   * @param {Phaser.Input.Keyboard.Key} interactKey The Interact Key
   */
  constructor (scene, x, y, interactKey, image) {
    super(scene, x, y)
    this.boxWidth = config.gameWidth
    this.boxBuffer = 16 // How much space is inbetween the walls of the box and the text, and the name from the left-hand side
    this.boxHeight = 180
    this.interactKey = interactKey
    this.isFastSpeed = false // Is the box in its 'fast' state? ( text scrolls faster )

    // The visuals of the textbox are defined here:
    this.style = {
      fontSize: 24,
      fontFamily: 'Arial',
      align: 'left',
      color: '#000000', // black
      wordWrap: {
        width: this.boxWidth - (this.boxBuffer * 4),
        height: this.boxHeight - (this.boxBuffer * 2),
        useAdvancedWrap: true
      }
    }

    // Speed of the text appearing (how many FRAMES before a new letter is added)
    this.textboxSpeed = 2
    this.time = 0 // .. Keeps track of current frame in 'animation' of the letters

    // Setup the default textbox stuff (start as an array)
    this.text = []
    this.name = []
    this.textPage = 0 // Which page are we on?
    this.textIndex = 0 // Which letter in this string (index) should be the last one displayed?
    this.drawText = this.text[0]

    // .. Temp X Value, use for origin of virtual box
    const _x = x + this.boxBuffer
    const _y = y + config.gameHeight - this.boxHeight - this.boxBuffer

    // Create the box backdrop from image asset
    this.backdrop = scene.add.image(0, _y - this.boxBuffer * 2, image)
    this.backdrop.setOrigin(0, 0)

    // Create the text object that will hold the text
    this.textObject = scene.add.text(_x + this.boxBuffer, _y + this.boxBuffer, this.drawText)
    this.textObject.setStyle(this.style)

    // Create the name text field that shows the name of who's talking
    this.nameTextObject = scene.add.text(_x + this.boxBuffer * 2, _y - this.boxBuffer, this.name[0])
    this.nameTextObject.setStyle(this.style)
  }

  // Show more text and check for interaction
  update () {
    if (this.textIndex < this.text[this.textPage].length) {
      // Gradually type out the text
      this.time++
      if (this.interactKey.isDown && this.textIndex + 2 < this.text[this.textPage].length) {
        this.isFastSpeed = true
      }

      // SPEED up the text if you hold the Interact key
      if (this.isFastSpeed) { this.textIndex++ }
      if (this.time > this.textboxSpeed) {
        this.time = 0
        this.textIndex++
      }
    } else {
      // At end of text, interact key will now go to next message.
      if (!this.isFastSpeed && this.interactKey.isDown) { // Make sure the player has to re-press the key to continue
        this.incrementPage()
        this.interactKey.isDown = false
      } else if (!this.interactKey.isDown) {
        this.isFastSpeed = false
      }
    }

    // Update what's currently being drawn
    this.drawText = this.text[this.textPage].substring(0, this.textIndex)
    this.textObject.text = this.drawText
  }

  // .. Use this to initialize the box
  /**
   * Sets the TEXT values for the box
   * @param {string[]} dialogueArray Can be any size, as long as the NAME ARRAY is the same size
   * @param {string[]} nameArray Must be the same size as the dialogue Array.  Corresponds to the names at the top of the box
   */
  setText (dialogueArray, nameArray) {
    this.text = dialogueArray
    this.name = nameArray

    // RESET all other values
    this.time = 0
    this.textIndex = 0
    this.textPage = 0
    this.drawText = ''
    this.isFastSpeed = false
    this.nameTextObject.text = this.name[this.textPage]
  }

  // Move to the next text page
  incrementPage () {
    if (this.textPage >= this.text.length - 1) { // .. Destroy!
      this.destroyTextBox()
    } else {
      // Go to next page, reset the time and the index
      this.textPage++
      this.textIndex = 0
      this.isFastSpeed = false
      this.nameTextObject.text = this.name[this.textPage] // update the name
      this.time = 0
    }
  }

  // Destroy the text box object
  destroyTextBox () {
    this.backdrop.destroy()
    this.textObject.destroy()
    this.nameTextObject.destroy()
    this.destroy()
  }
}

export default Textbox
