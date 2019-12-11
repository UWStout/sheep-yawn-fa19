// Import the entire 'phaser' namespace
import Phaser from 'phaser'

import { centerX, centerY } from '../utils'

class StudioSplashScene extends Phaser.Scene {
  init (data) {
    this.cameras.main.setBackgroundColor('#000000')
    this.allowNextScene = false
    this.nextScene = 'MainMenuScene'
  }

  preload () {
    // Show the studio splash logo
    this.showLogo()

    // Main menu assets
    this.load.image('logoPic', 'assets/images/LoadingPinkWoolhemina.png')
    this.load.image('mainMenuTitle', 'assets/images/MainMenu_SplashScreen.png')
    this.load.image('playPressed', 'assets/images/PlayPressedButton.png')
    this.load.image('playUnpressed', 'assets/images/PlayButton.png')
    this.load.image('creditsPressed', 'assets/images/CreditsPressedButton.png')
    this.load.image('creditsUnpressed', 'assets/images/CreditsButton.png')
    this.load.image('creditsPanel', 'assets/images/CreditsPanel.png')
    this.load.image('backPressed', 'assets/images/BackPressedButton.png')
    this.load.image('backUnpressed', 'assets/images/BackButton.png')

    // Load all the assets needed for next state
    // The audiosprite with all music and SFX (keep this for sounds only need to load once) // can load this in the splash screen
    this.load.image('tutorial1', 'assets/images/tutorialCard_1.png')
    this.load.image('tutorial2', 'assets/images/tutorialCard_2.png')
    this.load.image('tutorial3', 'assets/images/tutorialCard_3.png')
    this.load.image('tutorial4', 'assets/images/tutorialCard_4.png')
    this.load.image('tutorial5', 'assets/images/tutorialCard_5.png')
    this.load.image('tutorial6', 'assets/images/tutorialCard_6.png')
    this.load.image('timerImage', 'assets/images/UntilDawnLabel.png')
    this.load.image('CursorImage', 'assets/images/MouseCursor.png')
    this.load.image('MenuButton', 'assets/images/MenuButton.png')
    this.load.image('MenuPressedButton', 'assets/images/MenuPressed.png')
    this.load.image('BackButton', 'assets/images/BackButton.png')
    this.load.image('BackPressedButton', 'assets/images/BackPressedButton.png')
    this.load.image('SkipButton', 'assets/images/Skip.png')
    this.load.image('SkipPressedButton', 'assets/images/SkipPressed.png')
    this.load.image('NextButton', 'assets/images/Next.png')
    this.load.image('NextPressedButton', 'assets/images/NextPressed.png')
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
    this.load.image('woolfImageBig', 'assets/images/Big.png')
    this.load.image('woolfImageSmall', 'assets/images/Small.png')
    this.load.image('woolfImageMed', 'assets/images/Med.png')
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
  }

  showLogo () {
    // Create an instance of the audiosprite to play the engine SFX
    this.bkgSfx = this.sound.addAudioSprite('sounds')
    this.bkgSfx.play('EngineStartAndRev')

    const carImage = this.add.image(centerX(this), centerY(this), 'safariCar')
    carImage.setScale(0.55)
    carImage.setAlpha(0.0)

    const logoImage = this.add.image(centerX(this), centerY(this), 'safariLogo')
    logoImage.setScale(0.6)
    logoImage.setAlpha(0.0)

    const studioImage = this.add.image(centerX(this), centerY(this), 'SpoonImage')
    studioImage.setScale(0.8)
    studioImage.setAlpha(0.0)

    const carTween = this.add.tween({
      targets: carImage,
      alpha: 1.0,
      duration: 1000,
      paused: true
    })

    const logoTween = this.add.tween({
      targets: logoImage,
      alpha: 1.0,
      duration: 1000,
      paused: true
    })

    const studioTween = this.add.tween({
      targets: studioImage,
      alpha: 1.0,
      duration: 1000,
      paused: true
    })

    // Fade in car image
    setTimeout(() => {
      carTween.play()
    }, 2000)

    // Fade in logo image
    setTimeout(() => {
      logoTween.play()
    }, 6000)

    const sceneCamera = this.cameras.main

    // Fade in spoon image
    setTimeout(() => {
      carImage.visible = false
      logoImage.visible = false
      studioTween.play()
    }, 12000)

    // Fade out entire scene
    setTimeout(() => {
      sceneCamera.fadeOut(2000)
    }, 25000)

    const myScene = this
    setTimeout(() => {
      const loadingText = myScene.add.text(centerX(myScene), centerY(myScene),
        '', { font: '16px Arial', fill: '#FFFFFF', align: 'center' })
      loadingText.setOrigin(0.5, 0.5)
      this.bkgSfx.destroy()
      myScene.allowNextScene = true
    }, 15000)
  }

  update () {
    if (this.allowNextScene) {
      this.scene.start(this.nextScene)
    }
  }
}

// Expose the class TestScene to other files
export default StudioSplashScene
