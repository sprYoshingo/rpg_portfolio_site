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
    // load player
    this.load.image('player', 'assets/player.png');
    
    // load map
    this.load.image('mapImage', 'assets/map.png');
   
}

function create() {
    // map
    const mapImage = this.add.image(0, 0, 'mapImage').setOrigin(0, 0);
    const mapWidth = mapImage.width;
    const mapHeight = mapImage.height;

    // world and camera bounds
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

    //player
    player = this.physics.add.sprite(100, 100, 'player');
    player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(player, true, 0.08, 0.08);

    //controls
    cursors = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D

        
    });

    // test for an obsticle 
    const rock = this.physics.add.staticImage(300, 200, null) // change null to a sprite is it exists somewhere
        .setDisplaySize(64, 64)
        .setTint(0x999999) // no texture
        .refreshBody();

    //a dd collision between player and the obstacle
    this.physics.add.collider(player, rock);
}


function update() {
    player.setVelocity(0);

    if (cursors.left.isDown) player.setVelocityX(-100);
    else if (cursors.right.isDown) player.setVelocityX(100);

    if (cursors.up.isDown) player.setVelocityY(-100);
    else if (cursors.down.isDown) player.setVelocityY(100);
}
