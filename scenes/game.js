import { player, cursors, target, setGlobals } from '../globals.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    handleCollision(player, object) {
        setGlobals({ target: null });
        player.body.setVelocity(0);
    }

    create() {
        if (!this.sys.game.globals) {
        this.sys.game.globals = {};
         }

        this.player = this.physics.add.sprite(100, 100, 'player');
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            arrowUp: Phaser.Input.Keyboard.KeyCodes.UP,
            arrowDown: Phaser.Input.Keyboard.KeyCodes.DOWN,
            arrowLeft: Phaser.Input.Keyboard.KeyCodes.LEFT,
            arrowRight: Phaser.Input.Keyboard.KeyCodes.RIGHT
            });

        this.sys.game.globals.player = this.player;
        this.sys.game.globals.cursors = this.cursors;
        this.sys.game.globals.target = null;


        const map = this.add.image(0, 0, 'mapImage').setOrigin(0, 0);
        const mapWidth = map.width;
        const mapHeight = map.height;

        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            arrowUp: Phaser.Input.Keyboard.KeyCodes.UP,
            arrowDown: Phaser.Input.Keyboard.KeyCodes.DOWN,
            arrowLeft: Phaser.Input.Keyboard.KeyCodes.LEFT,
            arrowRight: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        setGlobals({ player: this.player, cursors: this.cursors, target: null });

        this.input.on('pointerdown', pointer => {
            const newTarget = {
                x: pointer.x + this.cameras.main.scrollX,
                y: pointer.y + this.cameras.main.scrollY
            };
            setGlobals({ target: newTarget });
            this.physics.moveTo(this.player, newTarget.x, newTarget.y, 200);
        });

        // Make sure 'rockImage' is loaded in preload, replace 'rockImage' with your actual texture key
        const rock = this.physics.add.staticImage(400, 300, 'rockImage');
        this.physics.add.collider(this.player, rock, this.handleCollision, null, this);
    }

    update() {
        const { player, cursors, target } = this.sys.game.globals;

        if (!player || !cursors) return;

        let movingWithKeyboard = false;

        // Reset velocity before input handling
        player.body.setVelocity(0);

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

        if (movingWithKeyboard && target) {
            setGlobals({ target: null });
            player.body.setVelocity(0);
        }

        if (!movingWithKeyboard && target) {
            const distance = Phaser.Math.Distance.Between(player.x, player.y, target.x, target.y);
            if (distance < 4) {
                player.body.setVelocity(0);
                setGlobals({ target: null });
            }
        }
    }
}
