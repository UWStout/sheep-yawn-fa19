/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// Import the sprites
import Woolhemina from '..//sprites/Woolhemina'
import WoolfEnemy from '..//sprites/WoolfEnemy'
import Tree from '..//sprites/Tree'
// import HUD from './HUD'

class TestSheepMove extends Phaser.Scene {
  init (data) { }

  // Grabs images and other material needed for the scene before any functions run
  preload () {
    this.load.image('sheepImage', 'assets/images/woolhemina_testSprite_128.png')
    this.load.image('treeImage', 'assets/images/asset_oakTree.png')
    this.load.image('pineImage', 'assets/images/pineTree_256.png')
    this.load.image('woolfImage', 'assets/Test Art/testAsset_wolfEnemy (3).png')
    this.load.image('tile1', 'assets/images/Tile_01.png')

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
  // Not immediately added to scene, unless add/addExisting
  // Is stated
  create () {
    // tile sprite
    this.tileOne = this.add.tileSprite(400, 300, 3000, 1000, 'tile1')
    // Creation of sheep character (Main Character)
    this.player = new Woolhemina({
      scene: this,
      x: 400,
      y: 350
    })
    // Creation of oak tree
    this.oakTree = new Tree({
      scene: this,
      x: 200,
      y: 300
    })
    /*
    // Creation of pine tree
    this.pineTree = new Tree({
      scene: this,
      x: 500,
      y: 600
    })
    */
    // Creation of enemy, Woolf
    this.testWoolf2 = new WoolfEnemy({
      scene: this,
      x: 900,
      y: 500,
      health: 90
    })

    // Adds woolf enemy to scene and set up physics
    this.add.existing(this.testWoolf2)
    this.physics.add.existing(this.testWoolf2)
    this.testWoolf2.body.setSize(250, 180, true)
    this.testWoolf2.body.setImmovable(true)
    this.testWoolf2.body.allowGravity = false

    // add Woolhemina to scene and set physics
    this.add.existing(this.player)
    this.physics.add.existing(this.player)
    this.player.body.collideWorldBounds = true
    this.PlayerHeight = 105
    this.player.body.setSize(50, this.PlayerHeight, 20, 20)
    this.halfPlayerHeight = this.PlayerHeight / 2
    // set Woolhemina's depth
    this.player.depth = this.player.y

    // this.testWolfEnemy = new Enemy({
    //   imageKey: 'wolfImage'
    // })

    // add oak tree to scene and set physics
    this.add.existing(this.oakTree)
    this.physics.add.existing(this.oakTree)
    this.oakTree.setTexture('treeImage')
    this.oakTree.treeHeight = 20
    this.oakTree.treeWidth = 85
    this.oakTree.body.setSize(this.oakTree.treeWidth, this.oakTree.treeHeight, 0)
    this.oakTree.body.setOffset(120, 300)
    this.oakTree.body.setImmovable(true)
    this.oakTree.body.allowGravity = false
    this.oakTree.body.enable = true
    // set tree depth
    this.oakTree.depth = this.oakTree.y + this.oakTree.height / 2

    /*
    // add pine tree to scene and set physics
    //working on this
    this.add.existing(this.pineTree)
    this.physics.add.existing(this.pineTree)
    this.pineTree.setTexture('pineImage')
    // pine tree
    this.pineTree.treeHeight = 20
    this.pineTree.treeWidth = 85
    this.pineTree.body.setSize(this.pineTree.treeWidth, this.pineTree.treeHeight, 0)
    this.pineTree.body.setOffset(120, 300)
    this.pineTree.body.setImmovable(true)
    this.pineTree.body.allowGravity = false
    this.pineTree.body.enable = true
    // set tree depth
    this.pineTree.depth = this.pineTree.y + this.pineTree.height / 2
*/
    // set collision
    this.physics.add.collider(this.player, this.oakTree)
    // this.physics.add.collider(this.player, this.pineTree)
    this.physics.add.collider(this.player, this.testWoolf2)
    // this.game.physics.arcade.collide(this.player, this.testTree, this.testWoolf2)

    // Setup the key objects
    this.setupKeyboard()

    // old version before scenes were merged
    // this.scene.run('SheepYawn', { player: this.player })
    // this.scene.moveAbove('SheepYawn', 'SheepMove')
    this.scene.run('HUDScene')
    // this.scene.moveAbove('HUDScene', 'SheepMove')

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

    this.depthCheck(this.oakTree)
    // this.depthCheck(this.pineTree)

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
      if (this.testWoolf2) {
        // Damage if overlapping
        this.physics.world.overlap(
          this.yawnBlast, this.testWoolf2,
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
    if (this.yawnBlast.scale < this._yawn_size_check) {
      this.testWoolf2.takeDamage(5)
    } else { // Calls reduceHealthBy10 function
      this.testWoolf2.takeDamage(10)
    }
  }

  depthCheck (myTree) {
    if (myTree.depth > this.player.depth) {
    // remember to make this different with other plants
      this.player.depth = myTree.depth - 1
      // Might be behind or to the side of the tree
      // console.log('1) is it behind?')
      if (this.player.body.position.y < (myTree.y + 114)) {
        myTree.body.setOffset(120, 300)
      }
      if (((this.player.x > (myTree.x + myTree.width / 2)) || (this.player.x < (myTree.x - myTree.width / 2))) || (this.player.y + (this.player.height / 2)) < (myTree.y - (myTree.height / 2))) {
      // not behind tree
      // top left, top right, bottom left, bottom right
        // console.log('2 not behind tree')
        myTree.setAlpha(1, 1, 1, 1)
      } else {
        // behind tree
        console.log('Look ' + this.player.y)
        myTree.setAlpha(0.2, 0.2, 1, 1)
      }
    } else {
      // console.log('4 below or collide with tree?')
      this.player.depth = myTree.depth + 1
      myTree.setAlpha(1, 1, 1, 1)
      this.sheepFootPosY = this.player.body.position.y + this.PlayerHeight
      this.sheepFootPosX = this.player.body.position.x
      this.testTreeTopCollide = myTree.body.position.y - (myTree.treeHeight / 2)
      this.testTreeBottomCollide = myTree.body.position.y + (myTree.treeHeight)
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
          myTree.body.setOffset(120, 215)
        }
        if (this.sheepFootPosY < myTree.body.position.x) {
          // console.log('collision at tree base')
          myTree.body.setOffset(120, 300)
        }
        myTree.body.enable = true
      } else {
        // console.log('7 above tree trunk')
        // console.log('7 sheepFootPos x' + this.sheepFootPosX)
        myTree.body.enable = true
        myTree.body.setOffset(120, 300)
      }
    }
  }

  render () { }
}

// Expose the class TestSheepMove to other files
export default TestSheepMove
