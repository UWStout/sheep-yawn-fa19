/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// IMport the update plugin
import PhaserUpdatePlugin from 'phaser-plugin-update'
import PhaserDebugDrawPlugin from 'phaser-plugin-debug-draw'
import UIPlugin from '../plugins/rexrainbow/rexuiplugin.min'

// Import the scenes used in our game
import BootScene from './scenes/Boot' // A bootstraping loader that loads the assets need by ... the loader!
// import SplashScene from './scenes/Splash' // A fancy loading splash screen for loading more assets
// import TestScene from './scenes/TestScene' // The main game level for testing
import StudioSplashScene from './scenes/StudioSplashScene' // Seth's Safari studio splash scene
import mainSheepScene from './scenes/mainSheepScene' // main scene
import HUD from './scenes/HUD'
import MainMenu from './scenes/MainMenu'
import Loading from './scenes/Loading'
import Tutorial from './scenes/Tutorial'
// import InfoScene from './scenes/InfoScene' // Some static info locked to the camera (like a HUD)
// import PauseMenuScene from './scenes/PauseMenuScene' // A menu displayed while the game is paused

// Import our general configuration file
import config from './config'

// Setup the plugins
const scenePlugins = [{
  key: 'updatePlugin',
  plugin: PhaserUpdatePlugin,
  mapping: 'updates'
}, {
  key: 'rexUI',
  plugin: UIPlugin,
  mapping: 'rexUI'
}]

if (__DEV__) {
  scenePlugins.push({
    key: 'DebugDrawPlugin',
    plugin: PhaserDebugDrawPlugin,
    mapping: 'debugDraw'
  })
}

/**
 * The main class that encapsulates the entirity of our game including all the game states,
 * all the loaded and cached assets, and any reusable logic needed in any state.
 * NOTE: See the parent class, Phaser.Game, for more details.
 */
class Game extends Phaser.Game {
  // Function automatically called upon class creation
  constructor () {
    // Pass configuration details to Phaser.Game
    super({
      pixelArt: false, // TODO: Turn this off if you aren't doing pixel art!!
      type: Phaser.WEBGL,
      title: 'Sheep Yawn',
      backgroundColor: '#9999cc',
      scale: {
        parent: 'content',
        width: config.gameWidth,
        height: config.gameHeight,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      plugins: {
        scene: scenePlugins
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0.0 },
          debug: __DEV__
        }
      }
    })

    // Name and load ALL needed game scenes (add more scenes here as you make them)
    this.scene.add('Boot', BootScene, false)
    // this.scene.add('Splash', SplashScene, false)
    // this.scene.add('Test', TestScene, false)
    this.scene.add('StudioSplash', StudioSplashScene, false)
    this.scene.add('SheepMove', mainSheepScene, false)
    this.scene.add('TutorialScene', Tutorial, false)
    this.scene.add('HUDScene', HUD, false)
    this.scene.add('LoadingScene', Loading, false)
    this.scene.add('MainMenuScene', MainMenu, false)
    // Extra scenes showing how you can layer scenes together
    // this.scene.add('Info', InfoScene, false)
    // this.scene.add('PauseMenu', PauseMenuScene, false)

    // Start with the bootstrap scene that will load assets needed for the splash scene
    // this.scene.start('SheepMove')
    this.scene.start('Boot')
  }
}

// This code executes once every time the containing webpage (index.html) is loaded.
// It creates a single instace of the Game class (defined above) and attaches it to
// the global object 'window.' It also causes Game's constructor to run, kicking
// off the logic of the ENTIRE game.
window.game = new Game()
