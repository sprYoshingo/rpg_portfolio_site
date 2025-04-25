const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: {
      preload,
      create,
      update
    }
  };
  
  let player;
  let cursors;
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.image('tiles', 'assets/tileset.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 16,
      frameHeight: 16
    });
  }
  
  function create() {
    //const map = this.make.tilemap({ key: 'map' });
    //const tileset = map.addTilesetImage('tileset', 'tiles');
    //const layer = map.createLayer('Tile Layer 1', tileset);
    this.cameras.main.setBackgroundColor(0x87CEEB); // Light blue background

    // Create a player at the center of the screen
    player = this.physics.add.sprite(400, 300, 'player');
    //player = this.physics.add.sprite(100, 100, 'player', 0);
  
    cursors = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D
      });  }
  
  function update() {
    player.setVelocity(0);
  
    if (cursors.left.isDown) player.setVelocityX(-100);
    else if (cursors.right.isDown) player.setVelocityX(100);
  
    if (cursors.up.isDown) player.setVelocityY(-100);
    else if (cursors.down.isDown) player.setVelocityY(100);
  }
  