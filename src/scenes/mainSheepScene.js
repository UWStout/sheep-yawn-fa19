// Coded By Kendra Aumann-Weyenberg and Abigail Smith
/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// Import the global config file
import config from '../config'

// Import the sprites
import Woolhemina from '..//sprites/Woolhemina'
import WoolfEnemyMedium from '..//sprites/WoolfEnemyMedium'
import WoolfEnemyBig from '..//sprites/WoolfEnemyBig'
import WoolfEnemyBaby from '..//sprites/WoolfEnemyBaby'
import Tree from '..//sprites/Tree'
import Oak from '..//sprites/Oak'
import Pine from '..//sprites/Pine'
import FirePit from '..//sprites/FirePit'
import House from '..//sprites/House'
import MapTile from '..//sprites/MapTile'
import Zzz from '..//sprites/Zzz'
import Enemy from '../sprites/Enemy'
import YawnCircle from '../sprites/YawnCircle'
// import HUD from './HUD'

class mainSheepScene extends Phaser.Scene {
  init (data) { }
  // ==================================================
  // Preload

  // Grabs images and other material needed for the scene before any functions run
  preload () {
    this.load.image('BackButton', 'assets/images/BackButton.png')
    this.load.image('BackPressedButton', 'assets/images/BackPressedButton.png')
    this.load.image('ContinueButton', 'assets/images/Continue.png')
    this.load.image('ContinuePressedButton', 'assets/images/ContinuePressed.png')
    this.load.image('CreditsButton', 'assets/images/CreditsButton.png')
    this.load.image('CreditsPressedButton', 'assets/images/CreditsPressedButton.png')
    this.load.image('ExitButton', 'assets/images/ExitButton.png')
    this.load.image('ExitPressedButton', 'assets/images/ExitPressedButton.png')
    this.load.image('PlayButton', 'assets/images/PlayButton.png')
    this.load.image('PlayPressedButton', 'assets/images/PlayPressedButton.png')
    this.load.image('darkBackground', 'assets/images/DarkBackground.png')
    this.load.image('win', 'assets/images/WinScreen.png')
    this.load.image('lose', 'assets/images/LoseScreen.png')
    this.load.image('SmallWoolfHUD', 'assets/images/WoolfPupCounter.png')
    this.load.image('MedWoolfHUD', 'assets/images/WoolfCounter.png')
    this.load.image('BigWoolfHUD', 'assets/images/AlphaCounter.png')
    this.load.image('HouseClosedOnImage', 'assets/images/HouseClosedOn.png')
    this.load.image('HouseClosedOffImage', 'assets/images/HouseClosedOff.png')
    this.load.image('sheepImage', 'assets/images/woolhemina_testSprite_128.png')
    this.load.image('treeImage', 'assets/images/asset_oakTree.png')
    this.load.image('FirePitImage', 'assets/images/asset_firePit.png')
    this.load.image('pineImage', 'assets/images/asset_pineTree.png')
    this.load.image('woolfImage', 'assets/Test Art/testAsset_wolfEnemy (3).png')
    this.load.image('tile1', 'assets/images/Tile_01.png')
    this.load.image('zzzImage', 'assets/Test Art/dummyAsset_Z.png')
    this.load.image('mapTile', 'assets/images/DummyBoundary.png')
    this.load.image('grass1Tile', 'assets/images/Tile_01.png')
    this.load.image('grass2Tile', 'assets/images/Tile_02.png')
    this.load.image('grass3Tile', 'assets/images/Tile_03.png')
    this.load.image('waterTile', 'assets/images/WaterTile.png')
    this.load.image('topWaterTile', 'assets/images/WaterTile2.png')
    this.load.image('sideFenceTile', 'assets/images/FenceTile_02.png')
    this.load.image('bottomFenceTile', 'assets/images/FenceTile_01.png')
    this.load.image('TopMountainMapTile', 'assets/images/MountainTile_03.png')
    this.load.image('CornerMountainMapTile', 'assets/images/MountainTile_02.png')
    this.load.image('BelowCornerMountainMapTile', 'assets/images/MountainTile_01.png')
    this.load.image('yawnBlastCircleImage', 'assets/images/yawnBlast_hemisphereShape.png')
    this.load.spritesheet('runleftFront', 'assets/images/painted_woolhemina_runCycle_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 13 })
    this.load.spritesheet('runUp', 'assets/images/painted_woolhemina_runCycle_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 13 })
    this.load.spritesheet('idleFront', 'assets/images/painted_resized_woolhemina_idle_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 10 })
    this.load.spritesheet('idleBack', 'assets/images/painted_resized_woolhemina_idle_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 6 })
    this.load.spritesheet('initalYawnFront', 'assets/images/painted_woolhemina_yawnBlast_initial_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 6 })
    this.load.spritesheet('initalYawnBack', 'assets/images/painted_woolhemina_yawnBlast_initial_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 6 })
    this.load.spritesheet('YawnLoopFront', 'assets/images/painted_woolhemina_yawnBlast_loop_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 5 })
    this.load.spritesheet('YawnLoopBack', 'assets/images/painted_woolhemina_yawnBlast_loop_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 5 })
    this.load.spritesheet('YawnReleaseFront', 'assets/images/painted_woolhemina_yawnBlast_release_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 14 })
    this.load.spritesheet('YawnReleaseBack', 'assets/images/painted_woolhemina_yawnBlast_release_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 14 })
    this.load.spritesheet('KnockbackLeftFront', 'assets/images/painted_woolhemina_surprised_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 24 })
    this.load.spritesheet('KnockbackRightBack', 'assets/images/painted_woolhemina_surprised_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 24 })
    this.load.spritesheet('breakGlass', 'assets/images/yawnBlast_shatter_spritesheet.png', { frameWidth: 256, frameHeight: 256, endFrame: 3 })
    this.load.spritesheet('babyWoolfLeftRun', 'assets/images/painted_babyWoolf_runCycle_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 11 })
    this.load.spritesheet('babyWoolfRightRun', 'assets/images/painted_babyWoolf_runCycle_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 11 })
    this.load.spritesheet('babyWoolfLeftIdle', 'assets/images/painted_babyWoolf_idle_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 7 })
    this.load.spritesheet('babyWoolfRightIdle', 'assets/images/painted_babyWoolf_idle_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 7 })
    this.load.spritesheet('babyWoolfAsleepFront', 'assets/images/painted_babyWoolf_fallAsleep_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 14 })
    this.load.spritesheet('babyWoolfAsleepBack', 'assets/images/painted_babyWoolf_fallAsleep_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 14 })
    this.load.spritesheet('babyWoolfSleepLoopFront', 'assets/images/painted_babyWoolf_fallAsleep_loop_leftFront.png', { frameWidth: 128, frameHeight: 128, endFrame: 8 })
    this.load.spritesheet('babyWoolfSleepLoopBack', 'assets/images/painted_babyWoolf_fallAsleep_loop_rightBack.png', { frameWidth: 128, frameHeight: 128, endFrame: 8 })
    this.load.spritesheet('woolfLeftRun', 'assets/images/painted_woolf_runCycle_leftFront.png', { frameWidth: 256, frameHeight: 256, endFrame: 11 })
    this.load.spritesheet('woolfRightRun', 'assets/images/painted_woolf_runCycle_rightBack.png', { frameWidth: 256, frameHeight: 256, endFrame: 11 })
    this.load.spritesheet('woolfLeftIdle', 'assets/images/painted_woolf_idle_leftFront.png', { frameWidth: 256, frameHeight: 256, endFrame: 7 })
    this.load.spritesheet('woolfRightIdle', 'assets/images/painted_woolf_idle_rightBack.png', { frameWidth: 256, frameHeight: 256, endFrame: 7 })
    this.load.spritesheet('woolfAsleepFront', 'assets/images/painted_woolf_fallAsleep_leftFront.png', { frameWidth: 256, frameHeight: 256, endFrame: 14 })
    this.load.spritesheet('woolfAsleepBack', 'assets/images/painted_woolf_fallAsleep_rightBack.png', { frameWidth: 256, frameHeight: 256, endFrame: 14 })
    this.load.spritesheet('woolfSleepLoopFront', 'assets/images/painted_woolf_fallAsleep_loop_leftFront.png', { frameWidth: 256, frameHeight: 256, endFrame: 8 })
    this.load.spritesheet('woolfSleepLoopBack', 'assets/images/painted_woolf_fallAsleep_loop_rightBack.png', { frameWidth: 256, frameHeight: 256, endFrame: 8 })
    this.load.spritesheet('woolfAttackFront', 'assets/images/painted_woolf_armSlam_leftFront.png', { frameWidth: 256, frameHeight: 256, endFrame: 15 })
    this.load.spritesheet('woolfAttackBack', 'assets/images/painted_woolf_armSlam_rightBack.png', { frameWidth: 256, frameHeight: 256, endFrame: 15 })
    this.load.spritesheet('alphaWoolfLeftRun', 'assets/images/painted_altWoolf_runCycle_leftFront.png', { frameWidth: 256, frameHeight: 256, endFrame: 11 })
    this.load.spritesheet('alphaWoolfRightRun', 'assets/images/painted_altWoolf_runCycle_rightBack.png', { frameWidth: 256, frameHeight: 256, endFrame: 11 })
    this.load.spritesheet('alphaWoolfLeftIdle', 'assets/images/painted_altWoolf_idle_leftFront.png', { frameWidth: 256, frameHeight: 256, endFrame: 7 })
    this.load.spritesheet('alphaWoolfRightIdle', 'assets/images/painted_altWoolf_idle_rightBack.png', { frameWidth: 256, frameHeight: 256, endFrame: 7 })
    this.load.spritesheet('alphaWoolfAsleepFront', 'assets/images/painted_altWoolf_fallAsleep_leftFront.png', { frameWidth: 256, frameHeight: 256, endFrame: 14 })
    this.load.spritesheet('alphaWoolfAsleepBack', 'assets/images/painted_altWoolf_fallAsleep_rightBack.png', { frameWidth: 256, frameHeight: 256, endFrame: 14 })
    this.load.spritesheet('alphaWoolfSleepLoopFront', 'assets/images/painted_altWoolf_fallAsleep_loop_leftFront.png', { frameWidth: 256, frameHeight: 256, endFrame: 8 })
    this.load.spritesheet('alphaWoolfSleepLoopBack', 'assets/images/painted_altWoolf_fallAsleep_loop_rightBack.png', { frameWidth: 256, frameHeight: 256, endFrame: 8 })
    this.load.spritesheet('alphaWoolfAttackFront', 'assets/images/painted_altWoolf_partyHowl_leftFront.png', { frameWidth: 256, frameHeight: 256, endFrame: 15 })
    this.load.spritesheet('alphaWoolfAttackBack', 'assets/images/painted_altWoolf_partyHowl_rightBack.png', { frameWidth: 256, frameHeight: 256, endFrame: 15 })
    this.load.spritesheet('flames', 'assets/images/firePit_flames_spritesheet.png', { frameWidth: 512, frameHeight: 512, endFrame: 3 })

    // The audiosprite with all music and SFX (keep this for sounds only need to load once) // can load this in the splash screen
    this.load.audioSprite('sounds', 'assets/audio/sounds.json', [
      'assets/audio/sounds.ogg', 'assets/audio/sounds.mp3',
      'assets/audio/sounds.m4a', 'assets/audio/sounds.ac3'
    ])

    // No longer needed
    // Used in reference of what was set for each health amount
    // Default health for enemies

    this._woolf_Velocity = 30
    this._sheep_Velocity = 300

    this.sfxOn = true

    this.levelNumber = 1

    // Default yawn circumferance increase size
    this._yawn_scale = 1.0

    // Sets amount that the yawn circle can increase to
    // Increased when Zzz objects are picked up
    this._yawn_size_check = 1.5

    // Defaulted to false
    // Checks if sprites need to be fixed by the x-axis
    this._invert = false

    this.enemyBehindTree = false

    this.BabyWolfAsleepTotalAmount = 0
    this.MediumWolfAsleepTotalAmount = 0
    this.BigWolfAsleepTotalAmount = 0
    this.BigWolfsAwakeCurrentAmount = 0
    this.BabyWolfsAwakeCurrentAmount = 0
    this.MediumWolfAwakeCurrentAmount = 0
  }

  // ==================================================
  // Create

  // Creates objects and other items used within the scene
  // Not immediately added to scene, unless add/addExisting Is stated
  create () {
    // Start playing the background music
    this.music = this.sound.addAudioSprite('sounds')
    // this.music.play('backgroundMusic', { volume: config.MUSIC_VOLUME })

    // Create sound sprite for game sound effects
    this.footstepsSFX = this.sound.addAudioSprite('sounds')
    this.yawnSFX = this.sound.addAudioSprite('sounds')
    this.snoreSFX = this.sound.addAudioSprite('sounds')

    // Creation of sheep character (Main Character)
    this.player = new Woolhemina({
      scene: this,
      x: 1441,
      y: 1300
    })

    this.AllBorderTilesArray = []

    // row 1
    for (let i = 0; i < 11; i++) {
      this['Tile' + i] = new MapTile({ scene: this, x: (145 + (256 * i)), y: 140 })
      this.add.existing(this['Tile' + i])
      if (i === 0) {
        this['Tile' + i].setTexture('CornerMountainMapTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else {
        this['Tile' + i].setTexture('TopMountainMapTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      }
    }

    // row 2
    for (let i = 0; i < 11; i++) {
      this['Tile' + i] = new MapTile({ scene: this, x: (145 + (256 * i)), y: (140 + 256) })
      this.add.existing(this['Tile' + i])
      if (i === 0) {
        this['Tile' + i].setTexture('BelowCornerMountainMapTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else if (i === 10) { // make this river tile
        this['Tile' + i].setTexture('topWaterTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else {
        this.GrassNumber = (Math.floor(Math.random() * (3 - 0)) + 0)
        if (this.GrassNumber === 0) {
          this['Tile' + i].setTexture('grass1Tile')
        } else if (this.GrassNumber === 1) {
          this['Tile' + i].setTexture('grass2Tile')
        } else if (this.GrassNumber === 2) {
          this['Tile' + i].setTexture('grass3Tile')
        }
      }
    }

    // row 3
    for (let i = 0; i < 11; i++) {
      this['Tile' + i] = new MapTile({ scene: this, x: (145 + (256 * i)), y: (140 + ((2) * 256)) })
      this.add.existing(this['Tile' + i])
      if (i === 0) { // make this a fence
        this['Tile' + i].setTexture('sideFenceTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else if (i === 10) { // make this river tile
        this['Tile' + i].setTexture('waterTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else {
        this.GrassNumber = (Math.floor(Math.random() * (3 - 0)) + 0)
        if (this.GrassNumber === 0) {
          this['Tile' + i].setTexture('grass1Tile')
        } else if (this.GrassNumber === 1) {
          this['Tile' + i].setTexture('grass2Tile')
        } else if (this.GrassNumber === 2) {
          this['Tile' + i].setTexture('grass3Tile')
        }
      }
    }

    // row 4
    for (let i = 0; i < 11; i++) {
      this['Tile' + i] = new MapTile({ scene: this, x: (145 + (256 * i)), y: (140 + ((3) * 256)) })
      this.add.existing(this['Tile' + i])
      if (i === 0) { // make this a fence
        this['Tile' + i].setTexture('sideFenceTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else if (i === 10) { // make this river tile
        this['Tile' + i].setTexture('waterTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else {
        this.GrassNumber = (Math.floor(Math.random() * (3 - 0)) + 0)
        if (this.GrassNumber === 0) {
          this['Tile' + i].setTexture('grass1Tile')
        } else if (this.GrassNumber === 1) {
          this['Tile' + i].setTexture('grass2Tile')
        } else if (this.GrassNumber === 2) {
          this['Tile' + i].setTexture('grass3Tile')
        }
      }
    }

    // row 5
    for (let i = 0; i < 11; i++) {
      this['Tile' + i] = new MapTile({ scene: this, x: (145 + (256 * i)), y: (140 + ((4) * 256)) })
      this.add.existing(this['Tile' + i])
      if (i === 0) { // make this a fence
        this['Tile' + i].setTexture('sideFenceTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else if (i === 10) { // make this river tile
        this['Tile' + i].setTexture('waterTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else {
        this.GrassNumber = (Math.floor(Math.random() * (3 - 0)) + 0)
        if (this.GrassNumber === 0) {
          this['Tile' + i].setTexture('grass1Tile')
        } else if (this.GrassNumber === 1) {
          this['Tile' + i].setTexture('grass2Tile')
        } else if (this.GrassNumber === 2) {
          this['Tile' + i].setTexture('grass3Tile')
        }
      }
    }

    // row 6
    for (let i = 0; i < 11; i++) {
      this['Tile' + i] = new MapTile({ scene: this, x: (145 + (256 * i)), y: (140 + ((5) * 256)) })
      this.add.existing(this['Tile' + i])
      if (i === 0) { // make this a fence
        this['Tile' + i].setTexture('sideFenceTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else if (i === 10) { // make this river tile
        this['Tile' + i].setTexture('waterTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else {
        this.GrassNumber = (Math.floor(Math.random() * (3 - 0)) + 0)
        if (this.GrassNumber === 0) {
          this['Tile' + i].setTexture('grass1Tile')
        } else if (this.GrassNumber === 1) {
          this['Tile' + i].setTexture('grass2Tile')
        } else if (this.GrassNumber === 2) {
          this['Tile' + i].setTexture('grass3Tile')
        }
      }
    }

    // row 7
    for (let i = 0; i < 11; i++) {
      this['Tile' + i] = new MapTile({ scene: this, x: (145 + (256 * i)), y: (140 + ((6) * 256)) })
      this.add.existing(this['Tile' + i])
      if (i === 0) { // make this a fence
        this['Tile' + i].setTexture('sideFenceTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else if (i === 10) { // make this river tile
        this['Tile' + i].setTexture('waterTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else {
        this.GrassNumber = (Math.floor(Math.random() * (3 - 0)) + 0)
        if (this.GrassNumber === 0) {
          this['Tile' + i].setTexture('grass1Tile')
        } else if (this.GrassNumber === 1) {
          this['Tile' + i].setTexture('grass2Tile')
        } else if (this.GrassNumber === 2) {
          this['Tile' + i].setTexture('grass3Tile')
        }
      }
    }

    // row 8
    for (let i = 0; i < 11; i++) {
      this['Tile' + i] = new MapTile({ scene: this, x: (145 + (256 * i)), y: (140 + ((7) * 256)) })
      this.add.existing(this['Tile' + i])
      if (i === 0) { // make this a fence
        this['Tile' + i].setTexture('sideFenceTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else if (i === 10) { // make this river tile
        this['Tile' + i].setTexture('waterTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else {
        this.GrassNumber = (Math.floor(Math.random() * (3 - 0)) + 0)
        if (this.GrassNumber === 0) {
          this['Tile' + i].setTexture('grass1Tile')
        } else if (this.GrassNumber === 1) {
          this['Tile' + i].setTexture('grass2Tile')
        } else if (this.GrassNumber === 2) {
          this['Tile' + i].setTexture('grass3Tile')
        }
      }
    }

    // row 9
    for (let i = 0; i < 11; i++) {
      this['Tile' + i] = new MapTile({ scene: this, x: (145 + (256 * i)), y: (140 + ((8) * 256)) })
      this.add.existing(this['Tile' + i])
      if (i === 0) { // make this a fence
        this['Tile' + i].setTexture('sideFenceTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else if (i === 10) { // make this river tile
        this['Tile' + i].setTexture('waterTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else {
        this.GrassNumber = (Math.floor(Math.random() * (3 - 0)) + 0)
        if (this.GrassNumber === 0) {
          this['Tile' + i].setTexture('grass1Tile')
        } else if (this.GrassNumber === 1) {
          this['Tile' + i].setTexture('grass2Tile')
        } else if (this.GrassNumber === 2) {
          this['Tile' + i].setTexture('grass3Tile')
        }
      }
    }

    // row 10
    for (let i = 0; i < 11; i++) {
      this['Tile' + i] = new MapTile({ scene: this, x: (145 + (256 * i)), y: (140 + ((9) * 256)) })
      this.add.existing(this['Tile' + i])
      if (i === 0) { // make this a fence
        this['Tile' + i].setTexture('sideFenceTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else if (i === 10) { // make this river tile
        this['Tile' + i].setTexture('waterTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else {
        this.GrassNumber = (Math.floor(Math.random() * (3 - 0)) + 0)
        if (this.GrassNumber === 0) {
          this['Tile' + i].setTexture('grass1Tile')
        } else if (this.GrassNumber === 1) {
          this['Tile' + i].setTexture('grass2Tile')
        } else if (this.GrassNumber === 2) {
          this['Tile' + i].setTexture('grass3Tile')
        }
      }
    }

    // row 11
    for (let i = 0; i < 11; i++) {
      this['Tile' + i] = new MapTile({ scene: this, x: (145 + (256 * i)), y: (140 + ((10) * 256)) })
      this.add.existing(this['Tile' + i])
      if (i === 10) { // make this a river
        this['Tile' + i].setTexture('waterTile')
        this.AllBorderTilesArray.push(this['Tile' + i])
      } else {
        this['Tile' + i].setTexture('bottomFenceTile')
        this.AllBorderTilesArray.push(this['Tile' + i]) // fence
      }
    }

    this.OakArray = []
    // Creation of oak trees
    for (let i = 0; i < (Math.floor(Math.random() * (15 - 10)) + 10); i++) {
      this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this['OakTree' + i] = new Oak({ scene: this, x: this.xpos, y: this.ypos })
      if (((this.xpos > 1024 && this.xpos < 1792) && (this.ypos > 256 && this.ypos < 1536)) || ((this.xpos > 256 && this.xpos < 1280) && (this.ypos > 1792 && this.ypos < 2560))) {
        // leave clearing free
      } else {
        this.OakArray.push(this['OakTree' + i])
      }
    }
    this.OakArrayLength = this.OakArray.length

    this.PineArray = []
    // Creation of pine trees
    for (let i = 0; i < (Math.floor(Math.random() * (15 - 10)) + 10); i++) {
      this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this['PineTree' + i] = new Pine({ scene: this, x: this.xpos, y: this.ypos })
      if (((this.xpos > 1024 && this.xpos < 1792) && (this.ypos > 256 && this.ypos < 1536)) || ((this.xpos > 256 && this.xpos < 1280) && (this.ypos > 1792 && this.ypos < 2560))) {
        // leave clearing free
      } else {
        this.PineArray.push(this['PineTree' + i])
      }
    }
    this.PineArrayLength = this.PineArray.length

    // Creation of firepit
    this.firePit = new FirePit({
      scene: this,
      x: 768,
      y: 2175
    })

    // Creation of house
    this.house = new House({
      scene: this,
      x: 1408,
      y: 1024
    })

    // Creation of house2
    this.house2 = new House({
      scene: this,
      x: 1408,
      y: 1024
    })

    this.BabyWoolfArray = []
    this.WoolfArray = []
    this.BabyWolfAmount = 0
    this.MediumWolfAmount = 0
    this.BigWolfAmount = 0

    // set level 1 enemies
    if (this.levelNumber === 1) {
      this.music.stop()
      this.music.play('backgroundMusic', { volume: config.MUSIC_VOLUME })
      this.BabyWolfAmount = 1 // 3
      this.MediumWolfAmount = 1 // 1
      this.BigWolfAmount = 1
      for (let i = 0; i < (this.BabyWolfAmount); i++) {
        this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
        this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
        while (((this.xpos > 1024 && this.xpos < 1792) && (this.ypos > 256 && this.ypos < 1536)) || ((this.xpos > 256 && this.xpos < 1280) && (this.ypos > 1792 && this.ypos < 2560))) {
          this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
          this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
        }
        this['WoolfBaby' + i] = new WoolfEnemyBaby({ scene: this, x: this.xpos, y: this.ypos, health: 1, zzzAmount: 5 })
        this.WoolfArray.push(this['WoolfBaby' + i])
        this.BabyWoolfArray.push(this['WoolfBaby' + i]) // in case they move differently
      }
      for (let i = 0; i < (this.MediumWolfAmount); i++) {
        this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
        this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
        while (((this.xpos > 1024 && this.xpos < 1792) && (this.ypos > 256 && this.ypos < 1536)) || ((this.xpos > 256 && this.xpos < 1280) && (this.ypos > 1792 && this.ypos < 2560))) {
          this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
          this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
        }
        this['WoolfMedium' + i] = new WoolfEnemyMedium({ scene: this, x: this.xpos, y: this.ypos, health: 3, zzzAmount: 10 })
        this.WoolfArray.push(this['WoolfMedium' + i])
      }
      for (let i = 0; i < (this.BigWolfAmount); i++) {
        this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
        this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
        while (((this.xpos > 1024 && this.xpos < 1792) && (this.ypos > 256 && this.ypos < 1536)) || ((this.xpos > 256 && this.xpos < 1280) && (this.ypos > 1792 && this.ypos < 2560))) {
          this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
          this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
        }
        this['WoolfBig' + i] = new WoolfEnemyBig({ scene: this, x: this.xpos, y: this.ypos, health: 5, zzzAmount: 15 })
        this.WoolfArray.push(this['WoolfBig' + i])
      }
      this.WoolfArrayLength = this.WoolfArray.length
      this.BabyWoolfArrayLength = this.BabyWoolfArray.length
    }

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

    // collision for map tiles
    for (let i = 0; i < this.AllBorderTilesArray.length; i++) {
      this.physics.add.existing(this.AllBorderTilesArray[i])
      this.AllBorderTilesArray[i].body.setImmovable(true)
      this.AllBorderTilesArray[i].body.allowGravity = false
      this.AllBorderTilesArray[i].body.setSize(256, 256, 0, 0)
      this.physics.add.collider(this.player, this.AllBorderTilesArray[i])
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

    // add house to scene and set physics
    this.add.existing(this.house)
    this.physics.add.existing(this.house)
    this.house.setTexture('HouseClosedOffImage')
    this.house.body.setSize(370, 100, 0)
    this.house.body.setOffset(140, 300)
    this.house.body.setImmovable(true)
    this.house.body.allowGravity = false
    this.house.body.enable = true
    // set house depth
    this.house.depth = this.house.y + this.house.height / 2
    this.physics.add.collider(this.player, this.house)

    // add house2 to scene and set physics
    this.add.existing(this.house2)
    this.physics.add.existing(this.house2)
    this.house2.setTexture('HouseClosedOnImage')
    this.house2.setAlpha(1)
    // this.house2.body.setSize(370, 100, 0)
    this.house2.body.setOffset(140, 300)
    this.house2.body.setImmovable(true)
    this.house2.body.allowGravity = false
    this.house2.body.enable = true
    // set house2 depth
    this.house2.depth = this.house.depth - 1
    this.physics.add.collider(this.player, this.house)
    this.house2.setAlpha(0.7)

    // add fire pit to scene and set physics
    this.add.existing(this.firePit)
    this.physics.add.existing(this.firePit)
    this.firePit.setTexture('FirePitImage')
    this.firePit.objectHeight = 20
    this.firePit.objectWidth = 85
    this.firePit.offsetX = 180
    this.firePit.offsetY = 70
    this.firePit.offsetChange = 215
    this.firePit.body.setSize(1, 1, 1)
    this.firePit.body.setOffset(0, 0)
    this.firePitTop = this.physics.add.image()
    this.firePitTop.body.setSize(230, 100, 0)
    this.firePitTop2 = this.physics.add.image()
    this.firePitTop2.body.setSize(335, 100, 0)
    this.firePit.body.setImmovable(true)
    this.firePit.body.allowGravity = false
    this.firePit.body.enable = false
    this.firePitTop.body.setImmovable(true)
    this.firePitTop.body.allowGravity = false
    this.firePitTop.body.enable = true
    this.firePitTop.body.setOffset(this.firePit.x - 100, this.firePit.y - 110)
    this.firePitTop2.body.setImmovable(true)
    this.firePitTop2.body.allowGravity = false
    this.firePitTop2.body.enable = true
    this.firePitTop2.body.setOffset(this.firePit.x - 145, this.firePit.y - 50)
    // set fire pit depth
    this.firePit.depth = this.player.depth - 1
    this.firePit.anims.play('flames')

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
    // for (let i = 0; i < this.WoolfArrayLength; i++) {
    //   this.timedEvent = this.time.addEvent({ delay: 500, callback: this.moveEnemy(this.WoolfArray[i]), callbackScope: this, loop: true })
    // }

    // Setup the key objects
    this.setupKeyboard()

    // Runs HUD scene above MainSheepScene
    this.scene.run('HUDScene')

    // if (this.scene.isActive('MainMenu') {
    //   this.scene.setActive(false)
    //   this.scene.setVisible(false)
    // }
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

    this.yawnKey.on('down', () => {
      if (!this.yawnSFX.isPlaying) {
        this.yawnSFX.play('YawnBlast')
      }
    }, this)

    this.yawnKey.on('up', () => {
      if (this.yawnSFX.isPlaying) {
        this.yawnSFX.stop()
      }
    }, this)
  }

  // ==================================================
  // Update

  update (time, delta) {
    const velocity = { x: 0.0, y: 0.0 }

    // Is up key/keyboard key being pressed?
    if (this.cursors.up.isDown || this.upKey.isDown) {
      velocity.y -= this._sheep_Velocity
      velocity.x = 0

      if (!this.footstepsSFX.isPlaying) {
        if (this.sfxOn === true) {
          this.footstepsSFX.play('running', { volume: this.footstepsSFX.volume })
        }
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

      if (!this.footstepsSFX.isPlaying) {
        if (this.sfxOn === true) {
          this.footstepsSFX.play('running', { volume: this.footstepsSFX.volume })
        }
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

      if (!this.footstepsSFX.isPlaying) {
        if (this.sfxOn === true) {
          this.footstepsSFX.play('running', { volume: this.footstepsSFX.volume })
        }
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

      if (!this.footstepsSFX.isPlaying) {
        if (this.sfxOn === true) {
          this.footstepsSFX.play('running', { volume: this.footstepsSFX.volume })
        }
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
      this.footstepsSFX.stop()
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

    // Player Character's velocity and depth set here
    this.player.body.velocity.set(velocity.x, velocity.y)
    this.player.depth = this.player.y + this.player.height / 2

    // depth check
    for (let i = 0; i < this.OakArrayLength; i++) {
      this.depthCheck(this.OakArray[i])
    }
    for (let i = 0; i < this.PineArrayLength; i++) {
      this.depthCheck(this.PineArray[i])
    }
    this.depthCheckHouse(this.house)

    // Moves sheep yawn circle with player when
    // Arrow keys/wasd keys are pressed
    if (this.yawnBlastCircle) {
      this.yawnBlastCircle.setPosition(this.player.x, this.player.y)
    }

    // Increases circumferance of circle
    if (this.yawnBlastCircle && this.yawnBlastCircle.scale < this._yawn_size_check) {
      this.yawnBlastCircle.setScale(this._yawn_scale)
      this._yawn_scale += 0.01
    }

    // working on this if wolf collides change direction
    // for (let i = 0; this.i < this.WoolfArrayLength; i++) {
    //   for (let k = 0; k < this.WoolfArrayLength; k++) {
    //     this.physics.world.overlap(this.WoolfArray[i], this.WoolfArray[k], this.moveEnemy(this.WoolfArray[i]), null, this)
    //   }
    //   for (let k = 0; k < this.PineArrayLength; k++) {
    //     this.physics.world.overlap(this.PineArray[k], this.WoolfArray[i], this.moveEnemy(this.WoolfArray[i]), null, this)
    //   }
    //   for (let k = 0; k < this.WoolfArrayLength; k++) {
    //     this.physics.world.overlap(this.WoolfArray[i], this.OakArray[k], this.moveEnemy(this.WoolfArray[i]), null, this)
    //   }
    //   for (let k = 0; k < this.BottomBoundaryArrayLength; k++) {
    //     this.physics.world.overlap(this.WoolfArray[i], this.BottomBoundaryArray[k], this.moveEnemy(this.WoolfArray[i]), null, this)
    //   }
    //   for (let k = 0; k < this.TopBoundaryArrayLength; k++) {
    //     this.physics.world.overlap(this.WoolfArray[i], this.AllTilesArray[k], this.moveEnemy(this.WoolfArray[i]), null, this)
    //   }
    //   for (let k = 0; k < this.RightBoundaryArrayLength; k++) {
    //     this.physics.world.overlap(this.WoolfArray[i], this.RightoundaryArray[k], this.moveEnemy(this.WoolfArray[i]), null, this)
    //   }
    //   for (let k = 0; k < this.LeftBoundaryArrayLength; k++) {
    //     this.physics.world.overlap(this.WoolfArray[i], this.LeftBoundaryArray[k], this.moveEnemy(this.WoolfArray[i]), null, this)
    //   }
    //   this.physics.world.overlap(this.WoolfArray[i], this.firePit, this.moveEnemy(this.WoolfArray[i]), null, this)
    //   this.physics.world.overlap(this.WoolfArray[i], this.firePitTop, this.moveEnemy(this.WoolfArray[i]), null, this)
    //   this.physics.world.overlap(this.WoolfArray[i], this.firePitTop2, this.moveEnemy(this.WoolfArray[i]), null, this)
    // }
  }

  // Creates sheep yawnBlast circle, add physics
  // Setup collider, sound, and animations
  createYawnBlast () {
    // Destroys previous sheep yawn circles if they exist
    if (this.yawnBlastCircle) { this.yawnBlastCircle.destroy() }

    // ReSets yawn scale for each yawn
    this._yawn_scale = 1.0

    // Creation of yawnBlastCircle
    this.yawnBlastCircle = new YawnCircle({
      scene: this,
      x: this.player.x,
      y: this.player.y
    })

    // Was the last animation the left/right animation?
    // Run inital front yawn animation if so
    if (this.player.anims.getCurrentKey() === 'idleFrontAnim') {
      this.player.anims.play('initalYawnFrontAnim')
    }

    // Was the last animation the up animation?
    // Run inital back yawn animation if so
    if (this.player.anims.getCurrentKey() === 'idleBackAnim') {
      this.player.anims.play('initalYawnBackAnim')
    }

    this.yawnSFX.stop()
    if (this.sfxOn === true) {
      this.yawnSFX.play('YawnBlast', { volume: this.yawnSFX.volume })
    }

    // Add yawnblast image to scene
    this.add.existing(this.yawnBlastCircle)

    // Set depth of yawnBlast image, so its behind Woolhemina
    this.yawnBlastCircle.depth = this.yawnBlastCircle.y + this.yawnBlastCircle.height / 2

    // Set up physics, collider
    this.physics.add.existing(this.yawnBlastCircle)
    // this.yawnBlastCircle.body.setCircle(63, 70, 60)
    // this.yawnBlastCircle.body.setCircle(68, 60, 57)
    this.yawnBlastCircle.body.setCircle(75, 54, 48.5)
    this.physics.add.collider(this.yawnBlastCircle)

    // console.log('Does the yawnCircleImage exist? ' + this.yawnBlastCircle)
  }

  // Destroys sheep yawn circle if space key is not being pressed and
  // Yawn blast circle already exists
  destroyYawnBlast () {
    // Does yawn blast exist?
    if (this.yawnBlastCircle) {
      // Was the last animation the loop front yawn animation?
      // Run front release yawn if so
      if (this.player.anims.getCurrentKey() === 'YawnLoopFrontAnim') {
        this.player.anims.play('YawnReleaseFrontAnim')
      }

      // Was the last animation the loop back yawn animation?
      // Run back release yawn if so
      if (this.player.anims.getCurrentKey() === 'YawnLoopBackAnim') {
        this.player.anims.play('YawnReleaseBackAnim')
      }

      this.yawnBlastCircle.anims.play('shatteringAnim')
      this.yawnBlastCircle.on('animationcomplete-shatteringAnim', () => {
        // Destroy
        this.yawnBlastCircle.destroy()
        this.yawnBlastCircle = null
      }, this)

      // Does Woolf enemy exist?
      for (let i = 0; i < this.WoolfArrayLength; i++) {
        if (this.WoolfArray[i]) {
          // check to see if the woolf is already asleep
          if (this.WoolfArray[i].isAwake === true) {
            console.log('wolf is awake')
            console.log(this.WoolfArrayLength)
          } else if (this.WoolfArray[i].isAwake === false) {
            console.log('wolf is asleep')
            // this.WoolfArray.splice((i - 1), (i - 1))
          }
          // Check for overlap with enemy and yawnBlast
          // Call loseHealth if so
          this.physics.world.overlap(this.yawnBlastCircle, this.WoolfArray[i], this.loseHealth, null, this)
        }
      }
    }
  }

  // Reduces health of enemy when caught in yawn blast circle
  loseHealth (yawnCircle, woolfy) {
    // Is the YawnCircle less than full?
    // reduce health by 1 if so
    if (this.yawnBlastCircle && this.yawnBlastCircle.scale < this._yawn_size_check) {
      woolfy.takeDamage(1)
    } else { // YawnCircle full? Reduce health by 1 if so
      woolfy.takeDamage(1)
    }
    // Has the Enemy lost all their health?
    // Play death anim.s if so
    if (woolfy.getHealth() === 0) {
      console.log('Name: ' + woolfy.getEnemyName())
      console.log('No more health')
      this.updateScore(woolfy)
      woolfy.body.enable = false
      if (this._invert === true) {
        console.log('anim of back')
        woolfy.anims.play('babyWoolfAsleepBackAnim')
      }

      if (this._invert === false) {
        console.log('anim of front')
        woolfy.anims.play('babyWoolfAsleepFrontAnim')
      }
    }
  }

  // Creates circle around enemy
  // Adds Zzzs to circle's path
  zzzDrop (enemyX, enemyY, amountOfZs) {
    // Creation of Zzz sprite
    // this.Zzz = new Zzz({
    //   scene: this,
    //   x: enemyX,
    //   y: enemyY
    // })

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
        obj2.destroy()
        this._yawn_size_check += 0.02 // test size
      } else {
        obj1.destroy()
      }
    }
  }

  // Moves Enemy around the scene
  moveEnemy (myEnemy) {
    if (myEnemy.isAwake === true) {
      console.log('Type of Woolf: ' + myEnemy.getEnemyName())
      console.log('This is a test')
      myEnemy.body.velocity.set(Phaser.Math.Between(-60, 60), Phaser.Math.Between(-60, 60)) // hey
      console.log('How fast we going: ' + myEnemy.body.velocity.x + ' ' + myEnemy.body.velocity.y)
      for (let i = 0; i < this.WoolfArrayLength; i++) {
        console.log('Are we assigning anims? in movement?')
        // Is enemy moving in negative (left) direction
        if (myEnemy.body.velocity.x < 0) {
          console.log('going left')
          this.WoolfArray[i].flipX = false

          // Is the Enemy a baby woolf?
          if (myEnemy.getEnemyName() === 'woolfBaby') {
            // Is Enemy left run running
            // Play anim if not so
            console.log('testing right')
            if (this.WoolfArray[i].anims.getCurrentKey() !== 'babyWoolfLeftRunAnim') {
              this.WoolfArray[i].anims.play('babyWoolfLeftRunAnim')
            }
          }

          // Is the Enemy a regular woolf?
          if (myEnemy.getEnemyName() === 'woolfMedium') {
            // Is Enemy left run running
            // Play anim if not so
            if (this.WoolfArray[i].anims.getCurrentKey() !== 'woolfLeftRunAnim') {
              this.WoolfArray[i].anims.play('woolfLeftRunAnim')
            }
          }

          // Is the Enemy an alpha woolf?
          if (myEnemy.getEnemyName() === 'woolfBig') {
            // Is Enemy left run running
            // Play anim if not so
            if (this.WoolfArray[i].anims.getCurrentKey() !== 'alphaWoolfLeftRunAnim') {
              this.WoolfArray[i].anims.play('alphaWoolfLeftRunAnim')
            }
          }
        } else {
          console.log('going right')
          this.WoolfArray[i].flipX = true

          // Is the Enemy a baby woolf?
          if (myEnemy.getEnemyName() === 'woolfBaby') {
            // Is Enemy left run running
            // Play anim if not so
            console.log('testing right')
            if (this.WoolfArray[i].anims.getCurrentKey() !== 'babyWoolfLeftRunAnim') {
              this.WoolfArray[i].anims.play('babyWoolfLeftRunAnim')
            }
          }

          // Is the Enemy a regular woolf?
          if (myEnemy.getEnemyName() === 'woolfMedium') {
            // Is Enemy left run running
            // Play anim if not so
            if (this.WoolfArray[i].anims.getCurrentKey() !== 'woolfLeftRunAnim') {
              this.WoolfArray[i].anims.play('woolfLeftRunAnim')
            }
          }

          // Is the Enemy an alpha woolf?
          if (myEnemy.getEnemyName() === 'woolfBig') {
            // Is Enemy left run running
            // Play anim if not so
            if (this.WoolfArray[i].anims.getCurrentKey() !== 'alphaWoolfLeftRunAnim') {
              this.WoolfArray[i].anims.play('alphaWoolfLeftRunAnim')
            }
          }

          if (myEnemy.body.velocity.y < 0) {
            console.log('going down')

            // Is the Enemy a baby woolf?
            if (myEnemy.getEnemyName() === 'woolfBaby') {
              console.log('testing down')
              // Is Enemy left run running
              // Play anim if not so
              if (this.WoolfArray[i].anims.getCurrentKey() !== 'babyWoolfLeftRunAnim') {
                this.WoolfArray[i].anims.play('babyWoolfLeftRunAnim')
              }
            }

            // Is the Enemy a regular woolf?
            if (myEnemy.getEnemyName() === 'woolfMedium') {
              // Is Enemy left run running
              // Play anim if not so
              if (this.WoolfArray[i].anims.getCurrentKey() !== 'woolfLeftRunAnim') {
                this.WoolfArray[i].anims.play('woolfLeftRunAnim')
              }
            }

            // Is the Enemy an alpha woolf?
            if (myEnemy.getEnemyName() === 'woolfBig') {
              // Is Enemy left run running
              // Play anim if not so
              if (this.WoolfArray[i].anims.getCurrentKey() !== 'alphaWoolfLeftRunAnim') {
                this.WoolfArray[i].anims.play('alphaWoolfLeftRunAnim')
              }
            }

            if (myEnemy.body.velocity.y > 0) {
              console.log('going up')

              // Is the Enemy a baby woolf?
              if (myEnemy.getEnemyName() === 'woolfBaby') {
                // Is Enemy left run running
                // Play anim if not so
                console.log('testing up')
                if (this.WoolfArray[i].anims.getCurrentKey() !== 'babyWoolfRightRunAnim') {
                  this.WoolfArray[i].anims.play('babyWoolfRightRunAnim')
                }
              }

              // Is the Enemy a regular woolf?
              if (myEnemy.getEnemyName() === 'woolfMedium') {
                // Is Enemy left run running
                // Play anim if not so
                if (this.WoolfArray[i].anims.getCurrentKey() !== 'woolfRightRunAnim') {
                  this.WoolfArray[i].anims.play('woolfRightRunAnim')
                }
              }

              // Is the Enemy an alpha woolf?
              if (myEnemy.getEnemyName() === 'woolfBig') {
                // Is Enemy left run running
                // Play anim if not so
                if (this.WoolfArray[i].anims.getCurrentKey() !== 'alphaWoolfRightRunAnim') {
                  this.WoolfArray[i].anims.play('alphaWoolfRightRunAnim')
                }
              }
            }
          }
        }
      }
    }
  }

  newLevel () {
    for (let i = 0; i < (this.WoolfArray.length); i++) {
      this.WoolfArray[i].setActive(false).setVisible(false)
      this.WoolfArray[i].body.enable = false
    }
    this.house2.setAlpha(1)
    this.tweens.add({
      targets: this.house2,
      alpha: { value: 0, duration: 150000, ease: 'Power1' },
      yoyo: true,
      loop: -1
    })
    this._sheep_Velocity = 300
    this.player.x = 1441
    this.player.y = 1300
    this.levelNumber += 1
    this.sfxOn = true
    this.music.stop()
    this.music.play('backgroundMusic', { volume: config.MUSIC_VOLUME })
    this.RandomWolfChoice = (Math.floor(Math.random() * (3 - 0)) + 0)
    if (this.RandomWolfChoice === 0) {
      this.BabyWolfAmount += 3
    } else if (this.RandomWolfChoice === 1) {
      this.MediumWolfAmount += 2
    } else if (this.RandomWolfChoice === 2) {
      this.BigWolfAmount += 1
    }
    for (let i = 0; i < (this.BabyWolfAmount); i++) {
      this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      while (((this.xpos > 1024 && this.xpos < 1792) && (this.ypos > 256 && this.ypos < 1536)) || ((this.xpos > 256 && this.xpos < 1280) && (this.ypos > 1792 && this.ypos < 2560))) {
        this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
        this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      }
      this['WoolfBaby' + i] = new WoolfEnemyBaby({ scene: this, x: this.xpos, y: this.ypos, health: 1, zzzAmount: 5 })
      this.WoolfArray.push(this['WoolfBaby' + i])
      this.BabyWoolfArray.push(this['WoolfBaby' + i])
    }
    for (let i = 0; i < (this.MediumWolfAmount); i++) {
      this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      while (((this.xpos > 1024 && this.xpos < 1792) && (this.ypos > 256 && this.ypos < 1536)) || ((this.xpos > 256 && this.xpos < 1280) && (this.ypos > 1792 && this.ypos < 2560))) {
        this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
        this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      }
      this['WoolfMedium' + i] = new WoolfEnemyMedium({ scene: this, x: this.xpos, y: this.ypos, health: 3, zzzAmount: 10 })
      this.WoolfArray.push(this['WoolfMedium' + i])
    }
    for (let i = 0; i < (this.BigWolfAmount); i++) {
      this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      while (((this.xpos > 1024 && this.xpos < 1792) && (this.ypos > 256 && this.ypos < 1536)) || ((this.xpos > 256 && this.xpos < 1280) && (this.ypos > 1792 && this.ypos < 2560))) {
        this.xpos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
        this.ypos = (Math.floor(Math.random() * (2400 - 450 + 1)) + 450)
      }
      this['WoolfBig' + i] = new WoolfEnemyBig({ scene: this, x: this.xpos, y: this.ypos, health: 5, zzzAmount: 15 })
      this.WoolfArray.push(this['WoolfBig' + i])
    }
    this.WoolfArrayLength = this.WoolfArray.length
    this.BabyWoolfArrayLength = this.BabyWoolfArray.length

    for (let i = 0; i < this.WoolfArrayLength; i++) {
      // Adds woolf enemy to scene and set up physics
      if (this.WoolfArray[i].isAwake === true) {
        this.add.existing(this.WoolfArray[i])
        this.physics.add.existing(this.WoolfArray[i])
        this.WoolfArray[i].body.setSize(250, 180, true)
        this.WoolfArray[i].body.setImmovable(true)
        this.WoolfArray[i].body.allowGravity = false
        this.physics.add.collider(this.player, this.WoolfArray[i]) // ToDo: Kendra will test this later so wolf doesn't push sheep
      }
    }

    for (let i = 0; i < this.WoolfArrayLength; i++) {
      this.timedEvent = this.time.addEvent({ delay: 500, callback: this.moveEnemy(this.WoolfArray[i]), callbackScope: this, loop: true })
    }
  }

  setSFXVolume (newVolume) {
    this.footstepsSFX.volume = newVolume
  }

  getBabyWoolfCount () {
    return this.BabyWolfAmount
  }

  getMedWoolfCount () {
    return this.MediumWolfAmount
  }

  getBigWoolfCount () {
    return this.BigWolfAmount
  }

  getBabyWoolfsAsleepTotal () {
    return this.BabyWolfAsleepTotalAmount
  }

  getMedWoolfsAsleepTotal () {
    return this.MediumWolfAsleepTotalAmount
  }

  getBigWoolfsAsleepTotal () {
    return this.BigWolfAsleepTotalAmount
  }

  getBigWoolfsAwakeCurrent () {
    return this.BigWolfsAwakeCurrentAmount
  }

  getBabyWoolfsAwakeCurrent () {
    return this.BabyWolfsAwakeCurrentAmount
  }

  getMedWoolfsAwakeCurrent () {
    return this.MediumWolfAwakeCurrentAmount
  }

  getNightsComplete () {
    return this.levelNumber
  }

  updateScore (wolfenemy) {
    if (wolfenemy.name === 'woolfBaby') {
      this.BabyWolfAsleepTotalAmount += 1
      this.BabyWolfsAwakeCurrentAmount += 1
    }
    if (wolfenemy.name === 'woolfMedium') {
      this.MediumWolfAwakeCurrentAmount += 1
      this.MediumWolfAsleepTotalAmount += 1
    }
    if (wolfenemy.name === 'woolfBig') {
      this.BigWolfAsleepTotalAmount += 1
      this.BigWolfsAwakeCurrentAmount += 1
    }
  }

  changeWinLoseMusic (winLose) {
    if (winLose === true) { // has won
      this.music.stop()
      this.music.play('WinScreen', { volume: config.MUSIC_VOLUME })
    } else { // has lost
      this.music.stop()
      this.music.play('LoseScreen', { volume: config.MUSIC_VOLUME }) // make this lose screen music
    }
  }

  turnSFXOff () {
    this.sfxOn = false
  }

  resetAfterWin () {
    this._sheep_Velocity = 0
    this.sfxOn = false
    this.newLevel()
  }

  depthCheckEnemyTree (myTree) { // doesn't work, find a reliable way to see if enemy is actually behind the tree
    myTree.enemyBehindTree = true
  }

  depthCheckHouse (house) {
    this.sheepFootPosYForHouse = this.player.body.position.y + this.PlayerHeight
    this.sheepFootPosXForHouse = this.player.body.position.x
    // if (this.sheepFootPosXForHouse > 1024)
    // {
    //   this.house.depth = this.player.depth - 1
    // } else {
    //   this.house.depth = this.player.depth + 1
    // }
    if (((this.sheepFootPosXForHouse > (house.x + 298)) || (this.sheepFootPosXForHouse < (house.x - 223))) || ((this.sheepFootPosYForHouse > (house.y + 80)) || (this.sheepFootPosYForHouse < (house.y - 279)))) {
      // not behind house
      house.depth = this.player.depth - 2
      this.house2.depth = this.house.depth + 1
      house.setAlpha(1, 1, 1, 1)
    } else {
      // behind house
      house.depth = this.player.depth + 2
      this.house2.depth = this.house.depth + 1
      house.setAlpha(0.2, 0.2, 1, 1)
    }
  }

  depthCheck (myTree) {
    // for (let k = 0; k < this.WoolfArrayLength; k++) {
    //   this.physics.add.overlap(myTree, this.WoolfArray[k], this.depthCheckEnemyTree(myTree), null, this)
    //   if (myTree.enemyBehindTree === true)
    //   {
    //     //myTree.setAlpha(0.2, 0.2, 1, 1)
    //   }
    // }

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
        if (myTree.enemyBehindTree === false) {
          myTree.setAlpha(1, 1, 1, 1)
        }
      } else {
        // behind tree
        myTree.setAlpha(0.2, 0.2, 1, 1)
      }
    } else {
      // console.log('4 below or collide with tree?')
      if (myTree.enemyBehindTree === false) {
        myTree.setAlpha(1, 1, 1, 1)
      }
      this.sheepFootPosY = this.player.body.position.y + this.PlayerHeight
      this.sheepFootPosX = this.player.body.position.x
      this.testTreeTopCollide = myTree.body.position.y - (myTree.treeHeight / 2)
      this.testTreeBottomCollide = myTree.body.position.y + (myTree.treeHeight)
      if ((this.sheepFootPosY < this.testTreeBottomCollide) && (this.sheepFootPosY > this.testTreeTopCollide)) {
        // console.log('can collide with tree stump')
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

// Expose the class mainSheepScene to other files
export default mainSheepScene
