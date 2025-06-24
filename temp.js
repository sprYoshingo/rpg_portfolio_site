class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene');
    }

    preload() {
        //preload game assets here
        this.load.image('player', 'assets/fishstick.jpg');
        this.load.image('mapImage', 'assets/map.jpg');


        const { width, height } = this.sys.game.config;

        // loading screen
        this.add.text(width / 2, height / 2 - 100, 'Loading... but not really', {
            fontSize: '32px',
            fontFamily: 'Comic Sans MS',
            fill: '#fff'
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 - 50, 'Use WASD or Arrow Keys to Move\nClick to Move with Mouse', {
            fontSize: '32px',
            fontFamily: 'Comic Sans MS',
            fill: '#ccc',
            align: 'center'
        }).setOrigin(0.5);
    }

    create() {
        const { width, height } = this.sys.game.config;

        const startText = this.add.text(width / 2, height / 2 + 50, 'Click to Start', {
            fontSize: '48px',
            fontFamily: 'Comic Sans MS', 
            fill: '#94b9e0',
            backgroundColor: '#000',
            padding: { x: 10, y: 5 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        startText.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        

    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    //for when the player collides with on object
    handleCollision(player, object) {
        // Stop movement when colliding
        target = null;
        player.body.setVelocity(0);
    }
    
    create() {
        // create map
        const map = this.add.image(0, 0, 'mapImage').setOrigin(0, 0);
        const mapWidth = map.width;
        const mapHeight = map.height;

        //bounds
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

        //create player
        player = this.physics.add.sprite(100, 100, 'player');
        player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(player, true, 0.08, 0.08);


        //inputs
        cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            arrowUp: Phaser.Input.Keyboard.KeyCodes.UP,
            arrowDown: Phaser.Input.Keyboard.KeyCodes.DOWN,
            arrowLeft: Phaser.Input.Keyboard.KeyCodes.LEFT,
            arrowRight: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });



        this.input.on('pointerdown', pointer => {
            target = {
                x: pointer.x + this.cameras.main.scrollX,
                y: pointer.y + this.cameras.main.scrollY
            };
            this.physics.moveTo(player, target.x, target.y, 200);
        });
        

        // for objects with collision
        const rock = this.physics.add.staticImage(400, 300, null);        //rock.setAlpha(0); this makes the object invisible 
        //rock.setAlpha(0); this makes the object invisible 
        this.physics.add.collider(player, rock, this.handleCollision, null, this);


    }

    update() {
        let movingWithKeyboard = false;
    
        // keyboard input
        if (cursors.left.isDown || cursors.arrowLeft.isDown) {
            player.setVelocityX(-200);
            movingWithKeyboard = true;
        } else if (cursors.right.isDown || cursors.arrowRight.isDown) {
            player.setVelocityX(200);
            movingWithKeyboard = true;
        }
    
        if (cursors.up.isDown || cursors.arrowUp.isDown) {
            player.setVelocityY(-200);
            movingWithKeyboard = true;
        } else if (cursors.down.isDown || cursors.arrowDown.isDown) {
            player.setVelocityY(200);
            movingWithKeyboard = true;
        }
    
        // animation cancel
        if (movingWithKeyboard && target) {
            target = null;
            player.body.setVelocity(0); 
        }
    
        //allow continued mouse movement if no keyboard input
        if (!movingWithKeyboard && target) {
            const distance = Phaser.Math.Distance.Between(player.x, player.y, target.x, target.y);
            if (distance < 4) {
                player.body.setVelocity(0);
                target = null;
            }
        }
    
        //stop if neither mouse nor keyboard is active
        if (!movingWithKeyboard && !target) {
            player.setVelocity(0);
        }
    }
    
    
}

let player;
let cursors;
let wasd;
let target = null;

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: [LoadingScene, GameScene]
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});