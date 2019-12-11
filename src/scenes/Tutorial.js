/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class Tutorial extends Phaser.Scene {
  init (data) { }

  preload () {
  }

  create () {
    this.tutorial1Image = this.add.image(900, 450, 'tutorial1').setAlpha(1)
    this.tutorial1Image.setScale(0.3)
    this.tutorial1Image.visible = true

    this.tutorial2Image = this.add.image(900, 450, 'tutorial2').setAlpha(1)
    this.tutorial2Image.setScale(0.3)
    this.tutorial2Image.visible = false

    this.tutorial3Image = this.add.image(900, 450, 'tutorial3').setAlpha(1)
    this.tutorial3Image.setScale(0.3)
    this.tutorial3Image.visible = false

    this.tutorial4Image = this.add.image(900, 450, 'tutorial4').setAlpha(1)
    this.tutorial4Image.setScale(0.3)
    this.tutorial4Image.visible = false

    this.tutorial5Image = this.add.image(905, 455, 'tutorial5').setAlpha(1)
    this.tutorial5Image.setScale(0.3)
    this.tutorial5Image.visible = false

    this.tutorial6Image = this.add.image(905, 455, 'tutorial6').setAlpha(1)
    this.tutorial6Image.setScale(0.3)
    this.tutorial6Image.visible = false

    this.SkipButton = this.add.sprite(1670, 100, 'SkipButton').setInteractive()
    this.SkipButton.setScale(0.8)
    this.SkipButton.on('pointerdown', function (pointer) {
      this.SkipFunction(this.getCurrentNumber())
    }.bind(this))
    this.SkipButton.on('pointerover', function () {
      this.SkipButton.setTexture('SkipPressedButton')
    }, this)
    this.SkipButton.on('pointerout', function () {
      this.SkipButton.setTexture('SkipButton')
    }, this)

    this.BackButton = this.add.sprite(135, 800, 'BackButton').setInteractive()
    this.BackButton.setScale(0.68)
    this.BackButton.on('pointerdown', function (pointer) {
      this.BackFunction(this.getCurrentNumber())
    }.bind(this))
    this.BackButton.on('pointerover', function () {
      this.BackButton.setTexture('BackPressedButton')
    }, this)
    this.BackButton.on('pointerout', function () {
      this.BackButton.setTexture('BackButton')
    }, this)
    this.BackButton.visible = false

    this.NextButton = this.add.sprite(1670, 790, 'NextButton').setInteractive()
    this.NextButton.setScale(0.8)
    this.NextButton.on('pointerdown', function (pointer) {
      this.NextFunction(this.getCurrentNumber())
    }.bind(this))
    this.NextButton.on('pointerover', function () {
      this.NextButton.setTexture('NextPressedButton')
    }, this)
    this.NextButton.on('pointerout', function () {
      this.NextButton.setTexture('NextButton')
    }, this)
  }

  getCurrentNumber () {
    if (this.tutorial1Image.visible === true) {
      return 1
    } else if (this.tutorial2Image.visible === true) {
      return 2
    } else if (this.tutorial3Image.visible === true) {
      return 3
    } else if (this.tutorial4Image.visible === true) {
      return 4
    } else if (this.tutorial5Image.visible === true) {
      return 5
    } else if (this.tutorial6Image.visible === true) {
      return 6
    }
  }

  NextFunction (current) {
    this.BackButton.visible = true
    this.tutorial1Image.visible = false
    this.tutorial2Image.visible = false
    this.tutorial3Image.visible = false
    this.tutorial4Image.visible = false
    this.tutorial5Image.visible = false
    this.tutorial6Image.visible = false
    if (__DEV__) console.log(current)
    if (current === 6) {
      this.scene.start('SheepMove')
    } else if (current === 1) {
      this.tutorial2Image.visible = true
    } else if (current === 2) {
      this.tutorial3Image.visible = true
    } else if (current === 3) {
      this.tutorial4Image.visible = true
    } else if (current === 4) {
      this.tutorial5Image.visible = true
    } else if (current === 5) {
      this.tutorial6Image.visible = true
    }
  }

  BackFunction (current) {
    this.BackButton.visible = true
    this.tutorial1Image.visible = false
    this.tutorial2Image.visible = false
    this.tutorial3Image.visible = false
    this.tutorial4Image.visible = false
    this.tutorial5Image.visible = false
    this.tutorial6Image.visible = false
    if (__DEV__) console.log(current)
    if (current === 1) {
      this.BackButton.visible = false
    } else if (current === 2) {
      this.BackButton.visible = false
      this.tutorial1Image.visible = true
    } else if (current === 3) {
      this.tutorial2Image.visible = true
    } else if (current === 4) {
      this.tutorial3Image.visible = true
    } else if (current === 5) {
      this.tutorial4Image.visible = true
    } else if (current === 6) {
      this.tutorial5Image.visible = true
    }
  }

  SkipFunction (current) {
    this.scene.start('SheepMove')
  }
}

// Expose the class for use in other modules
export default Tutorial
