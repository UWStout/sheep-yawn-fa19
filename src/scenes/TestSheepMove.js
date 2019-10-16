/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// Import the sprites
import Woolhemina from '..//sprites/Woolhemina'
import Woolf from '..//sprites/Woolf'
import Tree from '..//sprites/Tree'

class TestSheepMove extends Phaser.Scene {
  init (data) { }

  // Grabs images and other material needed for
  // The scene before any functions are runned
  preload () {
    this.load.image('sheepImage', 'assets/images/woolhemina_testSprite_128.png')
    this.load.image('treeImage', 'assets/images/testTreeAsset1.png')
    this.load.image('woolfImage', 'assets/Test Art/testAsset_wolfEnemy (3).png')

    // Default health for enemies
    this._default_woolf_health = 90
    this._default_boar_health = 60
    this._default_bat_health = 30

    // Default yawn circumfrance increase size
    this._yawn_scale = 1.0

    // Sets amount that the yawn circle can increase
    // To
    this._yawn_size_check = 1.5
  }

  // Creates objects and other items used within the scene
  // Not immeditally added to scene
  create () {
    // Creation of sheep character (Main Character)
    this.player = new Woolhemina({
      scene: this,
      x: 400,
      y: 350
    })
    // Creation of obstical, tree
    this.testTree = new Tree({
      scene: this,
      x: 200,
      y: 300
    })
    // Creation of enemy, Woolf
    this.testWoolf = new Woolf({
      scene: this,
      x: 600,
      y: 300
    })

    // add Woolhemina to scene and set physics
    this.add.existing(this.player)
    this.physics.add.existing(this.player)
    this.player.body.collideWorldBounds = true
    this.player.body.setSize(50, 105, 20, 20)

    // add test tree to scene and set physics
    this.add.existing(this.testTree)
    this.physics.add.existing(this.testTree)
    this.testTree.body.setSize(256, 256, 0, 0)
    // this.testTree = this.physics.add.staticGroup()
    this.testTree.body.setImmovable(true)
    this.testTree.body.allowGravity = false

    // Adds woolf enemy to scene and set up physics
    this.add.existing(this.testWoolf)
    this.physics.add.existing(this.testWoolf)
    this.testWoolf.body.setSize(250, 180, true)
    // this.testWoolf = this.physics.add.staticGroup()
    this.testWoolf.body.setImmovable(true)
    this.testWoolf.body.allowGravity = false

    this.physics.add.collider(this.player, this.testTree)
    this.physics.add.collider(this.player, this.testWoolf)
    // this.game.physics.arcade.collide(this.player, this.testTree, this.testWoolf)

    // Setup the key objects
    this.setupKeyboard()

    // this.scene.run('SheepYawn', { player: this.player })
    // this.scene.moveAbove('SheepYawn', 'SheepMove')

    if (__DEV__) {
      this.debugDraw.bringToTop()
    }
  }

  setupKeyboard () {
    // Setup WASD and arrow keys
    this.cursors = this.input.keyboard.createCursorKeys()
    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.upKey.oldDown = false
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.leftKey.oldDown = false
    this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.downKey.oldDown = false
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.rightKey.oldDown = false

    // Setup 'space' key for interaction
    this.yawnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.yawnKey.on('down', this.createYawnBlast, this)
    this.yawnKey.on('up', this.destroyYawnBlast, this)
    this.yawnKey.oldDown = false
  }

  // Creates sheep yawn circle, add physics and setup collider
  createYawnBlast () {
    // Destroys previous sheep yawn circles if they exist
    if (this.yawnBlast) { this.yawnBlast.destroy() }
    // console.log('Space key is being pressed')
    this.yawnBlast = this.add.ellipse(this.player.x, this.player.y + 40, 100, 100, 0xff0000, 0.3)
    this.yawnBlast.setStrokeStyle(2)
    this._yawn_scale = 1.0

    //   this.yawnBlast.body.setSize(this.player.x, this.player.y + 40, true)
    //   // this.yawnBlast = this.physics.add.staticGroup()
    //   this.yawnBlast.body.setImmovable(true)
    //   this.yawnBlast.body.allowGravity = false

    // Set up physics and collider
    this.physics.add.existing(this.yawnBlast)
    this.yawnBlast.setCircle(100)
    this.physics.add.collider(this.yawnBlast)
  }

  // Destroys sheep yawn circle if space key is not being pressed and
  // Yawn blast circle already exists
  destroyYawnBlast () {
    // console.log('Space key released')
    if (this.yawnBlast) {
      this.yawnBlast.destroy()
    }
  }

  update (time, delta) {
    const velocity = { x: 0.0, y: 0.0 }
    if (this.cursors.up.isDown || this.upKey.isDown) {
      velocity.y -= 160
      velocity.x = 0
    }
    if (this.cursors.down.isDown || this.downKey.isDown) {
      velocity.y += 160
      velocity.x = 0
    }
    if (this.cursors.right.isDown || this.rightKey.isDown) {
      velocity.x += 160
      velocity.y = 0
    }
    if (this.cursors.left.isDown || this.leftKey.isDown) {
      velocity.x -= 160
      velocity.y = 0
    }

    this.player.body.velocity.set(velocity.x, velocity.y)

    // Moves sheep yawn circle with player when
    // Arrowkeys/wsad keys are pressed
    if (this.yawnBlast) {
      this.yawnBlast.setPosition(this.player.x, this.player.y + 40)
    }

    // Increases circumferance of circle
    if (this.yawnBlast && this.yawnBlast.scale < this._yawn_size_check) {
      this.yawnBlast.setScale(this._yawn_scale)
      this._yawn_scale += 0.01
      // console.log(this.yawnBlast.scale)
    }

    // Increases thickness of stroke for the circle
    // To indicate the max circumferance has been
    // achieved
    if (this.yawnBlast && this.yawnBlast.scale >= this._yawn_size_check) {
      // console.log('point has been found')
      this.yawnBlast.setStrokeStyle(4.7)
    }
  }

  render () { }
}

// Expose the class TestSheepMove to other files
export default TestSheepMove
