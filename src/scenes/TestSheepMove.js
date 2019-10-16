/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// Import the sprites
import Woolhemina from '..//sprites/Woolhemina'
import Tree from '..//sprites/Tree'

class TestSheepMove extends Phaser.Scene {
  init (data) { }

  preload () {
    this.load.image('sheepImage', 'assets/images/woolhemina_testSprite_128.png')
    this.load.image('treeImage', 'assets/images/testTreeAsset1.png')
  }

  create () {
    /** 
    var graphics = this.add.graphics({ fillStyle: { color: 0x2266aa } })
    const point3 = new Phaser.Geom.Point(400, 428)// bottom
    graphics.fillPointShape(point3, 3)
    const point2 = new Phaser.Geom.Point(400, 398)// top
    graphics.fillPointShape(point2, 3)
    const point1 = new Phaser.Geom.Point(500, 419)// foot
    graphics.fillPointShape(point1, 3)
    */
    this.player = new Woolhemina({
      scene: this,
      x: 400,
      y: 350
    })
    this.testTree = new Tree({
      scene: this,
      x: 200,
      y: 300
    })
    
    let movingVertical = false

    // add Woolhemina and set physics
    this.add.existing(this.player)
    this.physics.add.existing(this.player)
    this.player.body.collideWorldBounds = true
    this.PlayerHeight = 105
    this.player.body.setSize(50, this.PlayerHeight, 20, 20)
    this.halfPlayerHeight = this.PlayerHeight / 2
    // set Woolhemina's depth
    this.player.depth = this.player.y

    // add test tree and set physics
    this.add.existing(this.testTree)
    this.physics.add.existing(this.testTree)
    // tree is 256 by 256
    this.TreeBodyHeight = 20
    this.testTree.body.setSize(85, this.TreeBodyHeight, 0, 0)
    this.halfTreeBodyHeight = this.TreeBodyHeight / 2
    this.testTree.body.setOffset(85, 236)
    this.testTree.body.setImmovable(true)
    this.testTree.body.allowGravity = false
    // set tree depth
    this.testTree.depth = this.testTree.y + this.testTree.height / 2

    this.physics.add.collider(this.player, this.testTree)

    // Setup the key objects
    this.setupKeyboard()

    this.scene.run('SheepYawn', { player: this.player })
    this.scene.moveAbove('SheepYawn', 'SheepMove')

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
  }

  update (time, delta) {
    const velocity = { x: 0.0, y: 0.0 }
    if (this.cursors.up.isDown || this.upKey.isDown)
    {
      velocity.y -= 160
      velocity.x = 0
      this.movingVertical = true
    }
    if (this.cursors.down.isDown || this.downKey.isDown)
    {
      velocity.y += 160
      velocity.x = 0
      this.movingVertical = true
    }
    if (this.cursors.right.isDown || this.rightKey.isDown)
    {
      velocity.x += 160
      velocity.y = 0
      this.movingVertical = false
    }
    if (this.cursors.left.isDown || this.leftKey.isDown)
    {
      velocity.x -= 160
      velocity.y = 0
      this.movingVertical = false
    }

    this.player.body.velocity.set(velocity.x, velocity.y)
    this.player.depth = this.player.y + this.player.height / 2

    this.depthCheck(this.testTree)
  }

  depthCheck (myTree) {
    if (myTree.depth > this.player.depth)
    {
    // remember to make this different with other plants
      this.player.depth = myTree.depth - 1
      // Might be behind or to the side of the tree
      if ((this.player.x > (myTree.x + myTree.height / 2)) || (this.player.x > (myTree.x + myTree.height / 2)))
      {
      // not behind tree
      // top left, top right, bottom left, bottom right
        console.log('not behind tree' + this.player.x)
        this.testTree.setAlpha(1, 1, 1, 1)
      }
      else
      { 
        // behind tree
        console.log('behind tree' + this.player.x)
        // top left, top right, bottom left, bottom right
        myTree.setAlpha(0, 0, 1, 1)
      }
    }
    else 
    {
      this.player.depth = myTree.depth + 1
      myTree.setAlpha(1, 1, 1, 1)
      this.sheepFootPos = this.player.body.position.y + this.PlayerHeight
      this.testTreeTopCollide = myTree.body.position.y - this.halfTreeBodyHeight
      this.testTreeBottomCollide = myTree.body.position.y + this.TreeBodyHeight
      console.log('sheepFootPos' + this.sheepFootPos)
      console.log('bottom' + this.testTreeBottomCollide)
      console.log('top' + this.testTreeTopCollide)
      if ((this.sheepFootPos < this.testTreeBottomCollide) && (this.sheepFootPos > this.testTreeTopCollide) && this.movingVertical === false)
      {
        // allow the player to collide with the tree stump
        myTree.body.enable = true
        this.physics.add.collider(this.player, myTree)
      }
      else
      {
        myTree.body.enable = false
      }      
    }  
  }

  render () {
  }
}

// Expose the class TestSheepMove to other files
export default TestSheepMove
