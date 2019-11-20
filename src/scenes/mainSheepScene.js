/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// Import the global config file
import config from '../config'

// Import the sprites
import Woolhemina from '..//sprites/Woolhemina'
import WoolfEnemy from '..//sprites/WoolfEnemy'
import Tree from '..//sprites/Tree'
import Oak from '..//sprites/Oak'
import Pine from '..//sprites/Pine'
import FirePit from '..//sprites/FirePit'
import MapTile from '..//sprites/MapTile'
import Zzz from '..//sprites/Zzz'
import Enemy from '../sprites/Enemy'
// import HUD from './HUD'

class mainSheepScene extends Phaser.Scene {
  init (data) { }

  // ==================================================
  // Preload

  // Grabs images and other material needed for the scene before any functions run
  preload () {
    this.load.image('sheepImage', 'assets/images/woolhemina_testSprite_128.png')
    this.load.image('treeImage', 'assets/images/asset_oakTree.png')
    this.load.image('FirePitImage', 'assets/images/asset_firePit.png')
    this.load.image('pineImage', 'assets/images/asset_pineTree.png')
    this.load.image('woolfImage', 'assets/Test Art/testAsset_wolfEnemy (3).png')
    this.load.image('tile1', 'assets/images/Tile_01.png')
    this.load.image('zzzImage', 'assets/Test Art/dummyAsset_Z.png')
    this.load.image('mapTile', 'assets/images/DummyBoundary.png')
    this.load.spritesheet('runleftFront', 'assets/images/painted_woolhemina_runCycle_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 13 })
    this.load.spritesheet('runUp', 'assets/images/painted_woolhemina_runCycle_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 13 })
    this.load.spritesheet('idleFront', 'assets/images/painted_woolhemina_idle_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 10 })
    this.load.spritesheet('idleBack', 'assets/images/painted_woolhemina_idle_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 10 })
    this.load.spritesheet('initalYawnFront', 'assets/images/woolhemina_yawnBlast_initial_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 6 })
    this.load.spritesheet('initalYawnBack', 'assets/images/woolhemina_yawnBlast_initial_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 6 })
    this.load.spritesheet('YawnLoopFront', 'assets/images/woolhemina_yawnBlast_loop_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 5 })
    this.load.spritesheet('YawnLoopBack', 'assets/images/woolhemina_yawnBlast_loop_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 5 })
    this.load.spritesheet('YawnReleaseFront', 'assets/images/woolhemina_yawnBlast_release_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 15 })
    this.load.spritesheet('YawnReleaseBack', 'assets/images/woolhemina_yawnBlast_release_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 15 })

    // The audiosprite with all music and SFX (keep this for sounds only need to load once) // can load this in the splash screen
    this.load.audioSprite('sounds', 'assets/audio/sounds.json', [
      'assets/audio/sounds.ogg', 'assets/audio/sounds.mp3',
      'assets/audio/sounds.m4a', 'assets/audio/sounds.ac3'
    ])

    // No longer needed
    // Used in reference of what was set for each health amount
    // Default health for enemies
    this._default_woolf_health = 90 // Zzzs 15
    this._default_boar_health = 60 // Zzzs 10
    this._default_bat_health = 30 // Zzzs 5

    this._woolf_Velocity = 100
    this._sheep_Velocity = 300

    // Default yawn circumferance increase size
    this._yawn_scale = 1.0

    // Sets amount that the yawn circle can increase to
    // Increased when Zzz objects are picked up
    this._yawn_size_check = 1.5

    // Defaulted to false
    // Checks if sprites need to be flixed by the x-axis
    this._invert = false

    // Scene's dimensions
    this._scene_width = 820 * 7
    this._scene_height = 820 * 7
  }

  // ==================================================
  // Create

  // Creates objects and other items used within the scene
  // Not immediately added to scene, unless add/addExisting Is stated
  create () {
    // Start playing the background music
    this.music = this.sound.addAudioSprite('sounds')
    this.music.play('backgroundMusic', { volume: config.MUSIC_VOLUME })

    // Create sound sprite for game sound effects
    this.gameSFX = this.sound.addAudioSprite('sounds')

    // tile sprite
    this.tileOne = this.add.tileSprite(0, 0, this._scene_width, this._scene_height, 'tile1')
    this.tileOne.setTileScale(0.5, 0.5)

    // Creation of sheep character (Main Character)
    this.player = new Woolhemina({
      scene: this,
      x: 1185,
      y: 1170
    })

    this.LeftBoundaryArray = []
    this.RightBoundaryArray = []
    this.TopBoundaryArray = []
    this.BottomBoundaryArray = []

    for (let i = 0; i < 11; i++) {
      this['TopTile' + i] = new MapTile({ scene: this, x: (145 + (255 * i)), y: 140 })
      this.TopBoundaryArray.push(this['TopTile' + i])
      this['TopTile' + i].setTexture('mapTile')
      this['TopTile' + i].setScale(0.5)
    }

    for (let i = 0; i < 9; i++) {
      this['BottomTile' + i] = new MapTile({ scene: this, x: 255 + (145 + (255 * i)), y: 2692 })
      this.BottomBoundaryArray.push(this['BottomTile' + i])
      this['BottomTile' + i].setTexture('mapTile')
      this['BottomTile' + i].setScale(0.5)
    }

    for (let i = 0; i < 10; i++) {
      this['RightTile' + i] = new MapTile({ scene: this, x: 2695, y: 145 + (255 * i) + 252 })
      this.RightBoundaryArray.push(this['RightTile' + i])
      this['RightTile' + i].setTexture('mapTile')
      this['RightTile' + i].setScale(0.5)
    }

    for (let i = 0; i < 10; i++) {
      this['LeftTile' + i] = new MapTile({ scene: this, x: 145, y: 145 + (255 * i) + 252 })
      this.LeftBoundaryArray.push(this['LeftTile' + i])
      this['LeftTile' + i].setTexture('mapTile')
      this['LeftTile' + i].setScale(0.5)
    }

    this.OakArray = []
    // Creation of oak trees
    for (let i = 0; i < (Math.floor(Math.random() * (10 - 5 + 1)) + 5); i++) {
      this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this['OakTree' + i] = new Oak({ scene: this, x: this.xpos, y: this.ypos })
      this.OakArray.push(this['OakTree' + i])
      // if ((this.xpos > 1100 && this.xpos < 1748) || (this.ypos > 1100 && this.ypos)) // TODO Kendra will use this to create clearing in center
    }
    this.OakArrayLength = this.OakArray.length

    this.PineArray = []
    // Creation of pine trees
    for (let i = 0; i < (Math.floor(Math.random() * (10 - 5 + 1)) + 5); i++) {
      this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this['PineTree' + i] = new Pine({ scene: this, x: this.xpos, y: this.ypos })
      this.PineArray.push(this['PineTree' + i])
    }
    this.PineArrayLength = this.PineArray.length

    this.firePit = new FirePit({
      scene: this,
      x: 1185,
      y: 1500
    })

    // Creation of enemy, Woolf
    this.WoolfArray = []
    for (let i = 0; i < 5; i++) {
      this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this['Woolf' + i] = new WoolfEnemy({ scene: this, x: this.xpos, y: this.ypos, health: 10, zzzAmount: 15 }) // health is set to 10 for testing (change later)
      this.WoolfArray.push(this['Woolf' + i])
    }
    this.WoolfArrayLength = this.WoolfArray.length

    console.log('wolf array' + this.WoolfArrayLength)

    // add Woolhemina to scene and set physics
    this.add.existing(this.player)
    this.physics.add.existing(this.player)
    this.player.body.collideWorldBounds = true
    this.PlayerHeight = 105
    this.player.body.setSize(50, this.PlayerHeight, 20, 20)
    this.halfPlayerHeight = this.PlayerHeight / 2
    // set Woolhemina's depth
    this.player.depth = this.player.y

    // camera to follow Woolhemina
    this.cameras.main.setBounds(0, 0, 710 * 4, 710 * 4)
    this.physics.world.setBounds(0, 0, 800 * 7, 800 * 7)

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05)

    // border map tiles
    for (let i = 0; i < this.TopBoundaryArray.length; i++) {
      this.add.existing(this.TopBoundaryArray[i])
      this.physics.add.existing(this.TopBoundaryArray[i])
      this.TopBoundaryArray[i].body.setImmovable(true)
      this.TopBoundaryArray[i].body.allowGravity = false
      this.TopBoundaryArray[i].body.enable = true
      this['TopTile' + i].body.setSize(0, 0, 20, 20)
      this.physics.add.collider(this.player, this.TopBoundaryArray[i])
    }
    for (let i = 0; i < this.BottomBoundaryArray.length; i++) {
      this.add.existing(this.BottomBoundaryArray[i])
      this.physics.add.existing(this.BottomBoundaryArray[i])
      this.BottomBoundaryArray[i].body.setImmovable(true)
      this.BottomBoundaryArray[i].body.allowGravity = false
      this.BottomBoundaryArray[i].body.enable = true
      this['BottomTile' + i].body.setSize(0, 0, 20, 20)
      this.physics.add.collider(this.player, this.BottomBoundaryArray[i])
    }
    for (let i = 0; i < this.RightBoundaryArray.length; i++) {
      this.add.existing(this.RightBoundaryArray[i])
      this.physics.add.existing(this.RightBoundaryArray[i])
      this.RightBoundaryArray[i].body.setImmovable(true)
      this.RightBoundaryArray[i].body.allowGravity = false
      this.RightBoundaryArray[i].body.enable = true
      this['RightTile' + i].body.setSize(0, 0, 20, 20)
      this.physics.add.collider(this.player, this.RightBoundaryArray[i])
    }
    for (let i = 0; i < this.LeftBoundaryArray.length; i++) {
      this.add.existing(this.LeftBoundaryArray[i])
      this.physics.add.existing(this.LeftBoundaryArray[i])
      this.LeftBoundaryArray[i].body.setImmovable(true)
      this.LeftBoundaryArray[i].body.allowGravity = false
      this.LeftBoundaryArray[i].body.enable = true
      this['LeftTile' + i].body.setSize(0, 0, 20, 20)
      this.physics.add.collider(this.player, this.LeftBoundaryArray[i])
    }

    for (let i = 0; i < this.OakArrayLength; i++) {
      // add oak trees to scene and set physics
      this.add.existing(this.OakArray[i])
      this.physics.add.existing(this.OakArray[i])
      this.OakArray[i].body.setSize(this.OakArray[i].treeWidth, this.OakArray[i].treeHeight, 0)
      this.OakArray[i].body.setOffset(this.OakArray[i].offsetX, this.OakArray[i].offsetY)
      this.OakArray[i].body.setImmovable(true)
      this.OakArray[i].body.allowGravity = false
      this.OakArray[i].body.enable = true
      // set tree depth
      this.OakArray[i].depth = this.OakArray[i].y + this.OakArray[i].height / 2
      this.physics.add.collider(this.player, this.OakArray[i])
    }

    for (let i = 0; i < this.PineArrayLength; i++) {
      // add pine trees to scene and set physics
      this.add.existing(this.PineArray[i])
      this.physics.add.existing(this.PineArray[i])
      this.PineArray[i].body.setSize(this.PineArray[i].treeWidth, this.PineArray[i].treeHeight, 0)
      this.PineArray[i].body.setOffset(this.PineArray[i].offsetX, this.PineArray[i].offsetY)
      this.PineArray[i].body.setImmovable(true)
      this.PineArray[i].body.allowGravity = false
      this.PineArray[i].body.enable = true
      // set tree depth
      this.PineArray[i].depth = this.PineArray[i].y + this.PineArray[i].height / 2
      this.physics.add.collider(this.player, this.PineArray[i])
    }

    // add fire pit to scene and set physics
    this.add.existing(this.firePit)
    this.physics.add.existing(this.firePit)
    this.firePit.setTexture('FirePitImage')
    this.firePit.objectHeight = 20
    this.firePit.objectWidth = 85
    this.firePit.offsetX = 180
    this.firePit.offsetY = 70
    this.firePit.offsetChange = 215
    this.firePit.body.setSize(410, 70, 0)
    this.firePit.body.setOffset(0, 95)
    this.firePitTop = this.physics.add.image()
    this.firePitTop.body.setSize(230, 80, 0)
    this.firePitTop2 = this.physics.add.image()
    this.firePitTop2.body.setSize(335, 80, 0)
    this.firePit.body.setImmovable(true)
    this.firePit.body.allowGravity = false
    this.firePit.body.enable = true
    this.firePitTop.body.setImmovable(true)
    this.firePitTop.body.allowGravity = false
    this.firePitTop.body.enable = true
    this.firePitTop.body.setOffset(this.firePit.x - 100, this.firePit.y - 75)
    this.firePitTop2.body.setImmovable(true)
    this.firePitTop2.body.allowGravity = false
    this.firePitTop2.body.enable = true
    this.firePitTop2.body.setOffset(this.firePit.x - 145, this.firePit.y - 50)
    // set fire pit depth
    this.firePit.depth = this.firePit.y + this.firePit.height / 2

    // set collision
    this.physics.add.collider(this.player, this.firePit)
    this.physics.add.collider(this.player, this.firePitTop)
    this.physics.add.collider(this.player, this.firePitTop2)

    for (let i = 0; i < this.WoolfArrayLength; i++) {
      // Adds woolf enemy to scene and set up physics
      this.add.existing(this.WoolfArray[i])
      this.physics.add.existing(this.WoolfArray[i])
      this.WoolfArray[i].body.setSize(250, 180, true)
      this.WoolfArray[i].body.setImmovable(true)
      this.WoolfArray[i].body.allowGravity = false
      this.physics.add.collider(this.player, this.WoolfArray[i]) // ToDo: Kendra will test this later so wolf doesn't push sheep
    }

    // TODO: find a quick way to make all objects collide with all other objects (except trees with trees)? make sure Woolhemina can't be pushed off scene by wolf

    // Inital animation running of Woolhemina
    this.player.anims.play('idleFrontAnim')

    // timed event to make enemy AI move
    for (let i = 0; i < this.WoolfArrayLength; i++) {
      this.timedEvent = this.time.addEvent({ delay: 500, callback: this.moveEnemy(this.WoolfArray[i]), callbackScope: this, loop: true })
    }

    // Setup the key objects
    this.setupKeyboard()

    // Runs HUD scene above MainSheepScene
    this.scene.run('HUDScene')

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

  // ==================================================
  // Update

  update (time, delta) {
    const velocity = { x: 0.0, y: 0.0 }

    // Is up key/keyboard key being pressed?
    if (this.cursors.up.isDown || this.upKey.isDown) {
      velocity.y -= this._sheep_Velocity
      velocity.x = 0

      if (!this.gameSFX.isPlaying) {
        this.gameSFX.play('running', { volume: this.gameSFX.volume })
      }

      // Is the sprite inverted?
      // Turn off if so
      if (this._invert !== false) {
        this.player.flipX = false
      } else { // Turn on
        this.player.flipX = true
      }

      // Are we looking at right animation?
      // Play runUp animation if so
      if (this.player.anims.getCurrentKey() !== 'runUpAnim') {
        this.player.anims.play('runUpAnim')
      }
    } else if (this.cursors.down.isDown || this.downKey.isDown) { // Is down key/keyboard key being pressed?
      velocity.y += this._sheep_Velocity
      velocity.x = 0

      if (!this.gameSFX.isPlaying) {
        this.gameSFX.play('running', { volume: this.gameSFX.volume })
      }

      // Is the sprite inverted?
      // Turn off if so
      if (this._invert !== false) {
        this.player.flipX = true
      } else { // Turn on
        this.player.flipX = false
      }

      // Are we looking at right animation?
      // Play runLeft animation if so
      if (this.player.anims.getCurrentKey() !== 'runLeft') {
        this.player.anims.play('runLeft')
      }
    } else if (this.cursors.right.isDown || this.rightKey.isDown) { // Is right key/keyboard key being pressed?
      velocity.x += this._sheep_Velocity
      velocity.y = 0

      if (!this.gameSFX.isPlaying) {
        this.gameSFX.play('running', { volume: this.gameSFX.volume })
      }

      // Flips player character along the x-axis
      this.player.flipX = true

      // Flip of x-axis of sprite is turned off
      this._invert = true

      // Are we looking at right animation
      // Play runLeft animation if so
      if (this.player.anims.getCurrentKey() !== 'runLeft') {
        this.player.anims.play('runLeft')
      }
    } else if (this.cursors.left.isDown || this.leftKey.isDown) { // Is left key/keyboard key being pressed?
      velocity.x -= this._sheep_Velocity
      velocity.y = 0

      if (!this.gameSFX.isPlaying) {
        this.gameSFX.play('running', { volume: this.gameSFX.volume })
      }

      // Flips player character along the x-axis
      this.player.flipX = false

      // Flip of x-axis of sprite is turned off
      this._invert = false

      // Are we looking at right animation
      // Play runLeft animation if so
      if (this.player.anims.getCurrentKey() !== 'runLeft') {
        this.player.anims.play('runLeft')
      }
    } else { // no key is being pressed
      this.gameSFX.stop()
      // Was the last animation the left/right animation?
      // Run front idle if so
      if (this.player.anims.getCurrentKey() === 'runLeft') {
        this.player.anims.play('idleFrontAnim')
      }

      // Was the last animation the up animation?
      // Run back idle if so
      if (this.player.anims.getCurrentKey() === 'runUpAnim') {
        this.player.anims.play('idleBackAnim')
      }
    }

    this.player.body.velocity.set(velocity.x, velocity.y)
    this.player.depth = this.player.y + this.player.height / 2

    // depth check
    for (let i = 0; i < this.OakArrayLength; i++) {
      this.depthCheck(this.OakArray[i])
    }
    for (let i = 0; i < this.PineArrayLength; i++) {
      this.depthCheck(this.PineArray[i])
    }

    // Moves sheep yawn circle with player when
    // Arrow keys/wasd keys are pressed
    if (this.yawnBlast) {
      this.yawnBlast.setPosition(this.player.x, this.player.y)
    }

    // Increases circumferance of circle
    if (this.yawnBlast && this.yawnBlast.scale < this._yawn_size_check) {
      // this.player.anims.play('YawnLoopFrontAnim')

      // Was the last animation the inital front yawn animation?
      // Run front loop yawn if so
      if (this.player.anims.getCurrentKey() === 'initalYawnFrontAnim' && this.player.anims.currentFrame.index === 6) {
        this.player.anims.play('YawnLoopFrontAnim')
      }

      // Was the last animation the up animation?
      // Run back yawn if so
      if (this.player.anims.getCurrentKey() === 'initalYawnBackAnim' && this.player.anims.currentFrame.index === 6) {
        this.player.anims.play('YawnLoopBackAnim')
      }

      this.yawnBlast.setScale(this._yawn_scale)
      this._yawn_scale += 0.01
    }

    // Increases thickness of stroke for the circle
    // To indicate the max circumferance has been achieved
    if (this.yawnBlast && this.yawnBlast.scale >= this._yawn_size_check) {
      this.yawnBlast.setStrokeStyle(4.7)
    }

    // working on this if wolf collides change direction
    for (let i = 0; this.i < this.WoolfArrayLength; i++) {
      for (let k = 0; k < this.WoolfArrayLength; k++) {
        this.physics.world.overlap(this.WoolfArray[i], this.WoolfArray[k], this.moveEnemy(this.WoolfArray[i]), null, this)
      }
      for (let k = 0; k < this.PineArrayLength; k++) {
        this.physics.world.overlap(this.PineArray[k], this.WoolfArray[i], this.moveEnemy(this.WoolfArray[i]), null, this)
      }
      for (let k = 0; k < this.WoolfArrayLength; k++) {
        this.physics.world.overlap(this.WoolfArray[i], this.OakArray[k], this.moveEnemy(this.WoolfArray[i]), null, this)
      }
      for (let k = 0; k < this.BottomBoundaryArrayLength; k++) {
        this.physics.world.overlap(this.WoolfArray[i], this.BottomBoundaryArray[k], this.moveEnemy(this.WoolfArray[i]), null, this)
      }
      for (let k = 0; k < this.TopBoundaryArrayLength; k++) {
        this.physics.world.overlap(this.WoolfArray[i], this.TopBoundaryArray[k], this.moveEnemy(this.WoolfArray[i]), null, this)
      }
      for (let k = 0; k < this.RightBoundaryArrayLength; k++) {
        this.physics.world.overlap(this.WoolfArray[i], this.RightoundaryArray[k], this.moveEnemy(this.WoolfArray[i]), null, this)
      }
      for (let k = 0; k < this.LeftBoundaryArrayLength; k++) {
        this.physics.world.overlap(this.WoolfArray[i], this.LeftBoundaryArray[k], this.moveEnemy(this.WoolfArray[i]), null, this)
      }
      this.physics.world.overlap(this.WoolfArray[i], this.firePit, this.moveEnemy(this.WoolfArray[i]), null, this)
      this.physics.world.overlap(this.WoolfArray[i], this.firePitTop, this.moveEnemy(this.WoolfArray[i]), null, this)
      this.physics.world.overlap(this.WoolfArray[i], this.firePitTop2, this.moveEnemy(this.WoolfArray[i]), null, this)
    }
    /* //collision isn't working
    this.physics.add.collider(this.WoolfArray[i], this.firePit) // find out if order matters...
      this.physics.add.collider(this.WoolfArray[i], this.firePitTop)
      this.physics.add.collider(this.WoolfArray[i], this.firePitTop2)
      for (let k = 0; k < this.PineArrayLength; k++) {
        this.physics.add.collider(this.WoolfArray[i], this.PineArray[k])
      }
      for (let k = 0; k < this.OakArrayLength; k++) {
        this.physics.add.collider(this.WoolfArray[i], this.OakArray[k])
      }
      for (let k = 0; k < this.BottomBoundaryArrayLength; k++) {
        this.physics.add.collider(this.WoolfArray[i], this.BottomBoundaryArray[k])
      }
      for (let k = 0; k < this.TopBoundaryArrayLength; k++) {
        this.physics.add.collider(this.WoolfArray[i], this.BottomBoundaryArray[k])
      }
      for (let k = 0; k < this.LeftBoundaryArrayLength; k++) {
        this.physics.add.collider(this.WoolfArray[i], this.BottomBoundaryArray[k])
      }
      for (let k = 0; k < this.RightBoundaryArrayLength; k++) {
        this.physics.add.collider(this.WoolfArray[i], this.BottomBoundaryArray[k])
      }
    }
    */
  }

  // Creates sheep yawn circle, add physics and setup collider
  createYawnBlast () {
    // Destroys previous sheep yawn circles if they exist
    if (this.yawnBlast) { this.yawnBlast.destroy() }

    // Was the last animation the left/right animation?
    // Run front yawn if so
    if (this.player.anims.getCurrentKey() === 'idleFrontAnim') {
      this.player.anims.play('initalYawnFrontAnim')
    }

    // Was the last animation the up animation?
    // Run back yawn if so
    if (this.player.anims.getCurrentKey() === 'idleBackAnim') {
      this.player.anims.play('initalYawnBackAnim')
    }

    this.yawnBlast = this.add.ellipse(this.player.x, this.player.y, 100, 100, 0xff0000, 0.3)
    this.yawnBlast.setStrokeStyle(2)
    this._yawn_scale = 1.0

    this.gameSFX.stop()
    this.gameSFX.play('YawnBlast', { volume: this.gameSFX.volume })
    console.log('yawning')

    // Set up physics, collider
    this.physics.add.existing(this.yawnBlast)
    this.yawnBlast.body.setCircle(50, 0.5)
    this.physics.add.collider(this.yawnBlast)
  }

  // Destroys sheep yawn circle if space key is not being pressed and
  // Yawn blast circle already exists
  destroyYawnBlast () {
    // Does yawn blast exist?
    if (this.yawnBlast) {
      // Was the last animation the inital front yawn animation?
      // Run front loop yawn if so
      if (this.player.anims.getCurrentKey() === 'YawnLoopFrontAnim') {
        this.player.anims.play('YawnReleaseFrontAnim')
        // if (this.player.anims.currentFrame.index === 15) {
        //   console.log('u have reached the end')
        //   this.player.anims.play('idleFrontAnim')
        // }
        // console.log('Frame: ' + this.anims.currentFrame.index)
      }

      // Was the last animation the up animation?
      // Run back yawn if so
      if (this.player.anims.getCurrentKey() === 'YawnLoopBackAnim') {
        this.player.anims.play('YawnReleaseBackAnim')
        // if (this.player.anims.currentFrame.index === 15) {
        //   console.log('u have reached the back end')
        //   this.player.anims.play('idleBackAnim')
        // }
      }

      // Does Woolf enemy exist?
      for (let i = 0; i < this.WoolfArrayLength; i++) {
        if (this.WoolfArray[i]) {
          // check to see if the woolf is already asleep
          if (this.WoolfArray[i].isAwake === true) {
            console.log('wolf is awake')
          } else if (this.WoolfArray[i].isAwake === false) {
            console.log('wolf is asleep') // delete from array
            delete this.WoolfArray[i]
          }
          // Check for overlap with enemy and yawnBlast
          // Call loseHealth if so
          this.physics.world.overlap(this.yawnBlast, this.WoolfArray[i], this.loseHealth, null, this)
        }
      }
    }
    // Destroy
    this.yawnBlast.destroy()
    this.yawnBlast = null
  }

  // Reduces health of enemy when caught in yawn blast circle
  loseHealth (yawnCircle, woolfy) {
    if (this.yawnBlast.scale < this._yawn_size_check) {
      woolfy.takeDamage(5)
    } else { // Calls reduceHealthBy10 function
      woolfy.takeDamage(10)
    }
  }

  // Creates circle around enemy
  // Adds Zzzs to circle's path
  zzzDrop (enemyX, enemyY, amountOfZs) {
    // Creation of Zzz sprite
    this.Zzz = new Zzz({
      scene: this,
      x: enemyX,
      y: enemyY
    })

    // Adjusts circle to scene
    this.enemyEllipse = this.add.ellipse(enemyX, enemyY + 15, 260, 150)

    // Sets up holder for zzz sprites
    this.zzzGroup = this.physics.add.group({ key: 'zzzImage', frameQuantity: amountOfZs })

    // Places Zzz's on ellipse path
    Phaser.Actions.PlaceOnEllipse(this.zzzGroup.getChildren(), this.enemyEllipse)

    // Checks for overlap with player character and Zzzs
    // Calls increaseYawnRadiusByZzz when true
    this.physics.add.overlap(this.player, this.zzzGroup, this.increaseYawnRadiusByZzz, null, this)
  }

  // Increases YawnBlast radius
  increaseYawnRadiusByZzz (obj1, obj2) {
    // Checks for Zzzs to exist
    if (this.zzzGroup) {
      // Delete Zzz based on which object its hiding in
      if (obj1 === this.player) {
        console.log('a')
        obj2.destroy()
        this._yawn_size_check += 0.02
      } else {
        console.log('b')
        obj1.destroy()
      }
    }
  }

  moveEnemy (myEnemy) {
    myEnemy.body.velocity.set(Phaser.Math.Between(-60, 60), Phaser.Math.Between(-60, 60))
    // console.log('does this happen!!')
  }

  setSFXVolume (newVolume) {
    this.gameSFX.volume = newVolume
  }

  depthCheck (myTree) {
    if (myTree.depth > this.player.depth) {
      // Might be behind or to the side of the tree
      // console.log('1) is it behind?')
      if (this.player.body.position.y < (myTree.y + 114)) {
        myTree.body.setOffset(myTree.offsetX, myTree.offsetY)
      }
      if (((this.player.x > (myTree.x + myTree.width / 2)) || (this.player.x < (myTree.x - myTree.width / 2))) || (this.player.y + (this.player.height / 2)) < (myTree.y - (myTree.height / 2))) {
      // not behind tree
      // top left, top right, bottom left, bottom right
        // console.log('2 not behind tree')
        myTree.setAlpha(1, 1, 1, 1)
      } else {
        // behind tree
        myTree.setAlpha(0.2, 0.2, 1, 1)
      }
    } else {
      // console.log('4 below or collide with tree?')
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
        if (this.sheepFootPosX > myTree.body.position.x + myTree.inFrontValue || this.sheepFootPosX < myTree.body.position.x - myTree.inFrontValue) {
          // console.log('to the side of the tree')
          myTree.body.setOffset(myTree.offsetX, myTree.offsetChange)
        }
        if (this.sheepFootPosY < myTree.body.position.y) {
          // console.log('collision at tree base')
          myTree.body.setOffset(myTree.offsetX, myTree.offsetY)
        }
        myTree.body.enable = true
      } else {
        myTree.body.enable = true
      }
    }
  }

  render () { }
}

// Expose the class TestSheepMove to other files
export default mainSheepScene
