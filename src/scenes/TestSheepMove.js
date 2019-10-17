/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// Import the sprites
import Woolhemina from '..//sprites/Woolhemina'
import Woolf from '..//sprites/Woolf'
import Tree from '..//sprites/Tree'

class TestSheepMove extends Phaser.Scene {
  init (data) { }

  // Grabs images and other material needed for the scene before any functions are ran
  preload () {
    this.load.image('sheepImage', 'assets/images/woolhemina_testSprite_128.png')
    this.load.image('treeImage', 'assets/images/testTreeAsset1.png')
    this.load.image('woolfImage', 'assets/Test Art/testAsset_wolfEnemy (3).png')

    // Default health for enemies
    this._default_woolf_health = 90
    this._default_boar_health = 60
    this._default_bat_health = 30

    // Default yawn circumferance increase size
    this._yawn_scale = 1.0

    // Sets amount that the yawn circle can increase
    this._yawn_size_check = 1.5
  }

  // Creates objects and other items used within the scene
  // Not immediately added to scene
  create () {
    // Creation of sheep character (Main Character)
    this.player = new Woolhemina({
      scene: this,
      x: 400,
      y: 350
    })
    // Creation of test tree
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
    // Adds woolf enemy to scene and set up physics
    this.add.existing(this.testWoolf)
    this.physics.add.existing(this.testWoolf)
    this.testWoolf.body.setSize(250, 180, true)
    // this.testWoolf = this.physics.add.staticGroup()
    this.testWoolf.body.setImmovable(true)
    this.testWoolf.body.allowGravity = false

    // add Woolhemina to scene and set physics
    this.add.existing(this.player)
    this.physics.add.existing(this.player)
    this.player.body.collideWorldBounds = true
    this.PlayerHeight = 105
    this.player.body.setSize(50, this.PlayerHeight, 20, 20)
    this.halfPlayerHeight = this.PlayerHeight / 2
    // set Woolhemina's depth
    this.player.depth = this.player.y

    // add test tree to scene and set physics
    this.add.existing(this.testTree)
    this.physics.add.existing(this.testTree)
    // tree is 256 by 256
    this.TreeBodyHeight = 20
    this.testTree.body.setSize(85, this.TreeBodyHeight, 0, 0)
    this.halfTreeBodyHeight = this.TreeBodyHeight / 2
    this.testTree.body.setOffset(85, 236)
    this.testTree.body.setImmovable(true)
    this.testTree.body.allowGravity = false
    this.testTree.body.enable = true
    // set tree depth
    this.testTree.depth = this.testTree.y + this.testTree.height / 2

    // set collision
    this.physics.add.collider(this.player, this.testTree)
    this.physics.add.collider(this.player, this.testWoolf)
    // this.game.physics.arcade.collide(this.player, this.testTree, this.testWoolf)

    this.woolfHealth = this._default_woolf_health

    // Setup the key objects
    this.setupKeyboard()

    // old version before scenes were merged
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
    this.player.depth = this.player.y + this.player.height / 2

    this.depthCheck(this.testTree)

    // Moves sheep yawn circle with player when
    // Arrowkeys/wasd keys are pressed
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
    // To indicate the max circumferance has been achieved
    if (this.yawnBlast && this.yawnBlast.scale >= this._yawn_size_check) {
      // console.log('point has been found')
      this.yawnBlast.setStrokeStyle(4.7)
    }
  }

  // Creates sheep yawn circle, add physics and setup collider
  createYawnBlast () {
  // Destroys previous sheep yawn circles if they exist
    if (this.yawnBlast) { this.yawnBlast.destroy() }
    // console.log('Space key is being pressed')
    this.yawnBlast = this.add.ellipse(this.player.x, this.player.y + 40, 100, 100, 0xff0000, 0.3)
    this.yawnBlast.setStrokeStyle(2)
    this._yawn_scale = 1.0

    // Set up physics, collider, and overlap collider
    // with enemies
    this.physics.add.existing(this.yawnBlast)
    this.yawnBlast.body.setCircle(50, 0.5)
    this.physics.add.collider(this.yawnBlast)
  }

  // Destroys sheep yawn circle if space key is not being pressed and
  // Yawn blast circle already exists
  destroyYawnBlast () {
    if (this.yawnBlast) {
      if (this.testWoolf) {
        // Damage if overlapping
        this.physics.world.overlap(
          this.yawnBlast, this.testWoolf,
          this.loseHealth, null, this)
      }

      // Destroy
      this.yawnBlast.destroy()
      this.yawnBlast = null
    }
  }

  // Reduces health of enemy when caught in yawn
  // Blast circle
  loseHealth (yawnCircle, woolfy) {
    console.log('Losing health')
    this.holderHealth = 0
    // Reduces health when space key is released
    if (this.yawnBlast.scale < this._yawn_size_check) {
      this.woolfHealth -= 5
      console.log('Before max:')
      console.log(this.woolfHealth)
    } else { // Takes off 10 points for full power
      this.woolfHealth -= 10
      console.log('After max:')
      console.log(this.woolfHealth)
    }

    // Destroy enemy when zero health is left
    if (this.woolfHealth <= 0) {
      this.testWoolf.destroy()
      this.testWoolf = null
    }
  }

  depthCheck (myTree) {
    if (myTree.depth > this.player.depth) {
    // remember to make this different with other plants
      this.player.depth = myTree.depth - 1
      // Might be behind or to the side of the tree
      // console.log('1) is it behind?')
      // console.log('Look sheep y' + (this.player.body.position.y + this.PlayerHeight))
      // console.log('Looky height' + myTree.y + 114)
      if (this.player.body.position.y < (myTree.y + 114)) {
        this.testTree.body.setOffset(85, 236)
      }
      if ((this.player.x > (myTree.x + myTree.height / 2)) || (this.player.x > (myTree.x + myTree.height / 2))) {
      // not behind tree
      // top left, top right, bottom left, bottom right
        // console.log('2 not behind tree')
        this.testTree.setAlpha(1, 1, 1, 1)
      } else {
        // behind tree
        // console.log('3 behind tree')
        // top left, top right, bottom left, bottom right
        myTree.setAlpha(0, 0, 1, 1)
      }
    } else {
      // console.log('4 below or collide with tree?')
      this.player.depth = myTree.depth + 1
      myTree.setAlpha(1, 1, 1, 1)
      this.sheepFootPosY = this.player.body.position.y + this.PlayerHeight
      this.sheepFootPosX = this.player.body.position.x
      this.testTreeTopCollide = myTree.body.position.y - this.halfTreeBodyHeight
      this.testTreeBottomCollide = myTree.body.position.y + this.TreeBodyHeight
      // console.log('sheepFootPos' + this.sheepFootPosY)
      // console.log('bottom' + this.testTreeBottomCollide)
      // console.log('top' + this.testTreeTopCollide)
      if ((this.sheepFootPosY < this.testTreeBottomCollide) && (this.sheepFootPosY > this.testTreeTopCollide)) {
        // console.log('5 can collide with tree stump')
        // allow the player to collide with the tree stump
        myTree.body.enable = true
        this.physics.add.collider(this.player, myTree)
      }
      if (this.sheepFootPosY > this.testTreeBottomCollide) {
        if (this.sheepFootPosX > myTree.body.position.x + 50 || this.sheepFootPosX < myTree.body.position.x - 50) {
          // console.log('to the side of the tree')
          this.testTree.body.setOffset(85, 150)
        }
        // console.log('Look! y ' + this.sheepFootPosY)
        if (this.sheepFootPosY < myTree.body.position.x) {
          // console.log('collision at tree base')
          this.testTree.body.setOffset(85, 236)
        }
        myTree.body.enable = true
      } else {
        // console.log('7 above tree trunk')
        // console.log('7 sheepFootPos x' + this.sheepFootPosX)
        myTree.body.enable = true
        this.testTree.body.setOffset(85, 236)
      }
    }
  }

  render () { }
}

// Expose the class TestSheepMove to other files
export default TestSheepMove
