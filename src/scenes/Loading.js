// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// Import needed functions from utils and config settings
import { centerGameObjects, centerX, centerY } from '../utils'

/**
 * The Loading game state. This game state displays a dynamic splash screen used
 * to communicate the progress of asset loading. It should ensure it is always
 * displayed some mimimum amount of time (in case the assets are already cached
 * locally) and it should have pre-loaded any assets it needs to display in main
 * before it is run. Generally only runs once, after main, and cannot be re-entered.
 *
 * See Phaser.State for more about game states.
 */
class Loading extends Phaser.Scene {
  // Initialize some local settings for this state
  init () {
  }

  preload () {
    // Add the logo to the screen and center it
    // this.load.sprite
    this.logo = this.add.sprite(centerX(this), centerY(this) - 100, 'logo')
    this.logo.setScale(0.5, 0.5)
    centerGameObjects([this.logo])

    this.setupProgressBar(200)

    // Load all the assets needed for next state

    this.load.image('timerImage', 'assets/images/UntilDawnLabel.png')
    this.load.image('CursorImage', 'assets/images/MouseCursor.png')
    this.load.image('MenuButton', 'assets/images/MenuButton.png')
    this.load.image('MenuPressedButton', 'assets/images/MenuPressed.png')
    // this.load.image('BackButton', 'assets/images/BackButton.png')
    // this.load.image('BackPressedButton', 'assets/images/BackPressed.png')
    this.load.image('ContinueButton', 'assets/images/Continue.png')
    this.load.image('ContinuePressedButton', 'assets/images/ContinuePressed.png')
    // this.load.image('CreditsButton', 'assets/images/CreditsButton.png')
    // this.load.image('CreditsPressedButton', 'assets/images/CreditsPressedButton.png')
    this.load.image('ExitButton', 'assets/images/ExitButton.png')
    this.load.image('ExitPressedButton', 'assets/images/ExitPressedButton.png')
    // this.load.image('PlayButton', 'assets/images/PlayButton.png')
    // this.load.image('PlayPressedButton', 'assets/images/PlayPressedButton.png')
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

    // Load a bunch of junk to slow down the preloader
    // for (let i = 0; i < 500; i++) {
    this.load.image('logo', 'assets/images/LoadingWoolhemina.png')
    // }
  }

  setupProgressBar (yOffset) {
    // Local variables for accessing width and height
    let width = this.cameras.main.width
    let height = this.cameras.main.height

    // Create graphics assets for progress bar
    let progressBar = this.add.graphics()
    let progressBkg = this.add.graphics()
    progressBkg.fillStyle(0x222222, 0.8)
    progressBkg.fillRect(width / 2 - 160, height / 2 - 25 + yOffset, 320, 50)

    // Create loading text
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50 + yOffset,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 + yOffset,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50 + yOffset,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })

    centerGameObjects([percentText, loadingText, assetText])

    // Display the progress bar
    this.load.on('progress', (percent) => {
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(width / 2 - 150, height / 2 - 15 + yOffset, 300 * percent, 30)
      percentText.setText(`${parseInt(percent * 100)}%`)
    })

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`)
    })

    this.load.on('complete', () => {
      loadingText.destroy()
      percentText.destroy()
      assetText.destroy()
      progressBar.destroy()
      progressBkg.destroy()
    })
  }

  // Pre-load is done
  create () {
  }

  // Called repeatedly after pre-load finishes and after 'create' has run
  update () {
    // this.scene.start('SheepMove')
  }
}

// Expose the Splash class for use in other modules
export default Loading
