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

    // To check if Woolhemina is moving up and down
    let movingVertical = false
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
      this.movingUp = true
    }
    if (this.cursors.down.isDown || this.downKey.isDown) {
      velocity.y += 160
      velocity.x = 0
      this.movingUp = false
    }
    if (this.cursors.right.isDown || this.rightKey.isDown) {
      velocity.x += 160
      velocity.y = 0
      this.movingUp = false
    }
    if (this.cursors.left.isDown || this.leftKey.isDown) {
      velocity.x -= 160
      velocity.y = 0
      this.movingUp = false
    }

    this.player.body.velocity.set(velocity.x, velocity.y)
    this.player.depth = this.player.y + this.player.height / 2

    this.depthCheck(this.testTree)

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

    //   this.yawnBlast.body.setSize(this.player.x, this.player.y + 40, true)
    //   this.yawnBlast = this.physics.add.staticGroup()
    //   this.yawnBlast.body.setImmovable(true)
    //   this.yawnBlast.body.allowGravity = false

    // Set up physics and collider
    this.physics.add.existing(this.yawnBlast)
    // this.yawnBlast.setCircle(100)
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

  depthCheck (myTree) {
    if (myTree.depth > this.player.depth) {
    // remember to make this different with other plants
      this.player.depth = myTree.depth - 1
      // Might be behind or to the side of the tree
      // console.log('1) is it behind?')
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
      this.sheepFootPos = this.player.body.position.y + this.PlayerHeight
      this.testTreeTopCollide = myTree.body.position.y - this.halfTreeBodyHeight
      this.testTreeBottomCollide = myTree.body.position.y + this.TreeBodyHeight
      // console.log('sheepFootPos' + this.sheepFootPos)
      // console.log('bottom' + this.testTreeBottomCollide)
      // console.log('top' + this.testTreeTopCollide)
      if ((this.sheepFootPos < this.testTreeBottomCollide) && (this.sheepFootPos > this.testTreeTopCollide) && this.movingUp === false) {
        // console.log('5 can collide with tree stump')
        // allow the player to collide with the tree stump
        myTree.body.enable = true
        this.physics.add.collider(this.player, myTree)
      } else {
        // console.log('6 can walk through tree stump')
        myTree.body.enable = false
      }
    }
  }

  render () { }
}

// Expose the class TestSheepMove to other files
export default TestSheepMove
