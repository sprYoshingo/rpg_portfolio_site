export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super('loading_screen');
    }

    preload() {
        this.load.image('player', 'assets/fishstick.jpg');
        this.load.image('mapImage', 'assets/map.jpg');

        const { width, height } = this.sys.game.config;

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
