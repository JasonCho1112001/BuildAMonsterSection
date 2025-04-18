class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        //Keyboard input
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.

        //Body
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");
        my.sprite.body.setScale(1,  5);

        //Arms
        my.sprite.leftArm = this.add.sprite(this.bodyX + 140, this.bodyY, "monsterParts", "arm_greenA.png");
        my.sprite.leftArm.angle = 90;
        my.sprite.leftArm.flipY = true;

        my.sprite.rightArm = this.add.sprite(this.bodyX - 140, this.bodyY, "monsterParts", "arm_greenA.png");
        my.sprite.rightArm.angle = 90;
        my.sprite.rightArm.flipY = false;

        //Legs
        my.sprite.leftLeg = this.add.sprite(this.bodyX + 130, this.bodyY + 120, "monsterParts", "leg_greenB.png");
        my.sprite.leftLeg.angle = -45;

        my.sprite.rightLeg = this.add.sprite(this.bodyX - 130, this.bodyY + 120, "monsterParts", "leg_greenB.png");
        my.sprite.rightLeg.angle = 45;
        my.sprite.rightLeg.flipX = true;

        //Eyes
        my.sprite.eye1 = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "eye_cute_light.png");

        //Accessories   
        my.sprite.accessory1 = this.add.sprite(this.bodyX + 70, this.bodyY - 150, "monsterParts", "detail_green_horn_large.png");
        my.sprite.accessory2 = this.add.sprite(this.bodyX - 70, this.bodyY - 150, "monsterParts", "detail_green_horn_large.png");
        my.sprite.accessory2.flipX = true;  

        //Mouth
        my.sprite.mouth1 = this.add.sprite(this.bodyX, this.bodyY + 60, "monsterParts", "mouthA.png");

        //Fangs
        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY + 60, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.fangs.visible = false;
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        //Event inputs: smile
        this.sKey.on('down', () => {
            my.sprite.mouth1.visible = true;
            my.sprite.fangs.visible = false;
        })

        this.fKey.on('down', () => {
            my.sprite.mouth1.visible = false;
            my.sprite.fangs.visible = true;
        })

        //Polling input: Movement
        if (this.aKey.isDown) {
            //Iterate over every body part
            for (let partName in my.sprite) {
                let part = my.sprite[partName];
                part.x -= 3.5;
            }
        }
        if (this.dKey.isDown) {
            //Iterate over every body part
            for (let partName in my.sprite) {
                let part = my.sprite[partName];
                part.x += 3.5;
            }
        }

        if (this.rKey.isDown) {
            //Iterate over every body part
            for (let partName in my.sprite) {
                let part = my.sprite[partName];
                part.angle += 3.5;
            }
        }
    }

}