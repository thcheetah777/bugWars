// Bug Invaders
// Game obj
const game = {
  // High score
  high: localStorage.getItem("high"),

  // Level
  level: 1,

  // Velocity
  enemyVelocity: 1,

  // Enemy speed
  enemyDownSpeed: 10,

  // Pellet generator speed
  pelletGenSpeed: 600,

  // Multiplayer
  multiplayer: false
};

// Player1 obj
const player1 = {
  // Player speed
  playerSpeed: 160,

  // Rocket powerup
  rocket: false,

  // Jump powerup
  jump: false,

  // Bubble powerup
  protection: false,

  // Hit to bubble
  bubbleHits: 3,

  // Reload function
  blasterReload: false
};

// Player2 obj
const player2 = {
  // Player speed
  playerSpeed: 160,

  // Rocket powerup
  rocket: false,

  // Jump powerup
  jump: false,

  // Bubble powerup
  protection: false,

  // Hit to bubble
  bubbleHits: 3,

  // Reload function
  blasterReload: false
};

// StartScene scene class
class StartScene extends Phaser.Scene {
  // Constructor
  constructor() {
    super({
      // Scene key
      key: "StartScene"
    });
  }

  // Create
  create() {
    // Text
    this.add.text(135, 230, `High Score: ${game.high} \n\n\nClick to Start`, {
      fontSize: "20px",
      fill: "#000000"
    });

    // Mouse input
    this.input.on("pointerup", () => {
      // Stop StartScene
      this.scene.stop("StartScene");

      // Start ChooseScene
      this.scene.start("ChooseScene");
    });
  }
}

// ChooseScene scene class
class ChooseScene extends Phaser.Scene {
  // Constructor
  constructor() {
    super({
      // Scene key
      key: "ChooseScene"
    });
  }

  // Preload
  preload() {
    // UI
    // White
    this.load.image("singleWhite", "assets/imgs/singleplayerWhite.png");
    this.load.image("multiWhite", "assets/imgs/multiplayerWhite.png");

    // Black
    this.load.image("singleBlack", "assets/imgs/singleplayerBlack.png");
    this.load.image("multiBlack", "assets/imgs/multiplayerBlack.png");
  }

  // Create
  create() {
    // Create UIs
    game.singleUI = this.add.sprite(150, 260, "singleBlack").setScale(1.5).setInteractive();
    game.multiUI = this.add.sprite(280, 260, "multiBlack").setScale(1.8).setInteractive();

    // Text
    // SingleUI
    this.add.text(100, 210, "1 Player", {
      fontSize: "20px",
      fill: "#000000"
    });

    // MultiUI
    this.add.text(230, 210, "2 Player", {
      fontSize: "20px",
      fill: "#000000"
    });

    // Add hover events
    // MultiUI
    game.multiUI.on("pointerover", () => {
      // Set texture
      game.multiUI.setTexture("multiWhite");
    });

    // SingleUI
    game.singleUI.on("pointerover", () => {
      // Set texture
      game.singleUI.setTexture("singleWhite");
    });

    // MultiUI
    game.multiUI.on("pointerout", () => {
      // Set texture
      game.multiUI.setTexture("multiBlack");
    });

    // SingleUI
    game.singleUI.on("pointerout", () => {
      // Set texture
      game.singleUI.setTexture("singleBlack");
    });

    // Add click events
    // MultiUI
    game.multiUI.on("pointerup", () => {
      // Set multiplayer
      game.multiplayer = true;

      // Stop ChooseScene
      this.scene.stop("ChooseScene");

      // Start game
      this.scene.start("GameScene");
    });

    // SingleUI
    game.singleUI.on("pointerup", () => {
      // Stop ChooseScene
      this.scene.stop("ChooseScene");

      // Start game
      this.scene.start("GameScene");
    });
  }
}

// GameScene scene class
class GameScene extends Phaser.Scene {
  // Constructor
  constructor() {
    super({
      // Scene key
      key: "GameScene"
    });

    // Set high score
    if (!localStorage.getItem("high")) {
      localStorage.setItem("high", 1);
    }
  }

  // Preload
  preload() {
    // Images
    // Bugs
    this.load.image("bug1", "https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bug_1.png");
    this.load.image("bug2", "https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bug_2.png");
    this.load.image("bug3", "https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bug_3.png");

    // Platform
    this.load.image("platform", "https://content.codecademy.com/courses/learn-phaser/physics/platform.png");

    // Players
    this.load.image("player1", "assets/imgs/player1.png");
    this.load.image("player2", "assets/imgs/player2.png");
    this.load.image("player", "assets/imgs/player.png");

    // Shoots
    this.load.image("bugPellet", "https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bugPellet.png");
    this.load.image("bugRepellent", "https://content.codecademy.com/courses/learn-phaser/Bug%20Invaders/bugRepellent.png");

    // Powerups
    this.load.image("speedPowerup", "assets/imgs/speedPowerup.png");
    this.load.image("rocketPowerup", "assets/imgs/rocketPowerup.png");
    this.load.image("jumpPowerup", "assets/imgs/jumpPowerup.png");
    this.load.image("bubblePowerup", "assets/imgs/bubblePowerup.png");

    // Powerup sprites
    this.load.image("rocketBlaster", "assets/imgs/rocket.png");
    this.load.image("bubble", "assets/imgs/bubble.png");

    // Audio
    this.load.audio("pew", "assets/audio/pew.wav");
    this.load.audio("explosion", "assets/audio/explosion.wav");

    // Music
    this.load.audio("theme1", "assets/audio/theme1.ogg");
    this.load.audio("theme2", "assets/audio/theme2.ogg");
    this.load.audio("theme3", "assets/audio/theme3.mp3");

    this.load.audio("death", "assets/audio/death.wav");
    this.load.audio("win", "assets/audio/win.ogg");
    this.load.audio("powerup", "assets/audio/powerup.ogg");
    this.load.audio("rocket", "assets/audio/rocket.mp3");
    this.load.audio("jump", "assets/audio/jump.ogg");

    // BugRepellent hits bubble
    this.load.audio("bubbleHit", "assets/audio/bubbleHit.ogg");

    // Reload
    this.load.audio("click", "assets/audio/click.mp3");
  }

  // Sorts enemies
  sortedEnemies() {
    return game.enemies.getChildren().sort((a, b) => a.x - b.x);
  }

  // Returns number of enemies
  enemyNum() {
    return game.enemies.getChildren().length;
  }

  // Create
  create() {
    // Set active
    game.active = true;

    // Play again click
    this.input.on("pointerup", () => {
      if (!game.active) {
        // Change level
        if (!this.enemyNum()) {
          // Win
          game.level += 1;
        } else {
          // Lose
          game.level = 1;
        }

        // Restart game
        this.scene.restart();
      }
    });

    // Creating platforms
    game.platforms = this.physics.add.staticGroup();
    game.platforms.create(225, 490, "platform").setScale(1, 0.3).refreshBody();

    // Print text
    game.scoreText = this.add.text(105, 482, `Level: ${game.level}    High: ${game.high}`, {
      fontSize: "15px",
      fill: "#000000"
    });

    // Create player sprites
    // Multiplayer
    if (game.multiplayer) {
      game.player1 = this.physics.add.sprite(205, 450, "player1").setScale(0.5).setCollideWorldBounds(true);
      game.player2 = this.physics.add.sprite(245, 450, "player2").setScale(0.5).setCollideWorldBounds(true);
    } else {
      game.player1 = this.physics.add.sprite(225, 450, "player").setScale(0.5).setCollideWorldBounds(true);
    }

    // Player2 move input
    if (game.multiplayer) {
      // Left
      this.input.keyboard.on("keydown_A", function() {
        game.player2.setVelocityX(-player2.playerSpeed);
      });

      // Right
      this.input.keyboard.on("keydown_D", function() {
        game.player2.setVelocityX(player2.playerSpeed);
      });

      // None
      this.input.keyboard.on("keyup", function() {
        game.player2.setVelocityX(0);
      });
    }

    // Rocket blaster
    // Player1
    game.rocketBlaster1 = this.add.sprite(game.player1.x, game.player1.y, "rocketBlaster").setScale(0.2);
    game.bubble1 = this.add.sprite(game.player1.x, game.player1.y, "bubble").setScale(0.2);

    if (game.multiplayer) {
      // Player2
      game.rocketBlaster2 = this.add.sprite(game.player2.x, game.player2.y, "rocketBlaster").setScale(0.2);
      game.bubble2 = this.add.sprite(game.player2.x, game.player2.y, "bubble").setScale(0.2);
    }

    // Player1
    // Hide or show rocket
    if (!player1.rocket) {
      game.rocketBlaster1.visible = false;
    }

    // Hide or show bubble
    if (!player1.protection) {
      game.bubble1.visible = false;
    }

    if (game.multiplayer) {
      // Player2
      // Hide or show rocket
      if (!player2.rocket) {
        game.rocketBlaster2.visible = false;
      }

      // Hide or show bubble
      if (!player2.protection) {
        game.bubble2.visible = false;
      }
    }

    // Bring player to top
    // Player1
    this.children.bringToTop(game.player1);

    // Player2
    if (game.multiplayer) {
      this.children.bringToTop(game.player2);
    }

    // Input
    game.cursors = this.input.keyboard.createCursorKeys();

    // Audio
    game.pew = this.sound.add("pew");
    game.explosion = this.sound.add("explosion");

    // Theme music
    if (game.level > 10) {
      game.theme = this.sound.add("theme1");
    } else if (game.level > 5) {
      game.theme = this.sound.add("theme3");
    } else {
      game.theme = this.sound.add("theme2");
    }

    game.death = this.sound.add("death");
    game.win = this.sound.add("win");
    game.powerup = this.sound.add("powerup");
    game.rocketBlast = this.sound.add("rocket");
    game.bounce = this.sound.add("jump");
    game.bubbleHit = this.sound.add("bubbleHit");
    game.click = this.sound.add("click");
    game.jump = this.sound.add("jump");

    // Play music
    game.theme.play();

    // Groups
    // Shots
    game.pellets = this.physics.add.group();
    game.bugRepellent = this.physics.add.group();

    // Enemy
    game.enemies = this.physics.add.group();

    // Powerups
    game.speedPowerup = this.physics.add.group();
    game.rocketPowerup = this.physics.add.group();
    game.jumpPowerup = this.physics.add.group();
    game.bubblePowerup = this.physics.add.group();

    // Enemy formations
    // Formation1
    game.formation1 = [
      [false, false, true, true, false, false],
      [true, true, true, true, true, true],
      [false, false, true, true, false, false]
    ];

    // Formation2
    game.formation2 = [
      [true, true, true, true, true, true, true],
      [true, false, false, false, false, false, true],
      [true, true, true, true, true, true, true]
    ];

    // Formation3
    game.formation3 = [
      [true, false, true, false, true, false, true],
      [false, true, false, true, false, true, false],
      [true, false, true, false, true, false, true]
    ];

    // Formation4
    game.formation4 = [
      [true, false, true, false, true, false, true],
      [true, false, true, false, true, false, true],
      [true, false, true, false, true, false, true]
    ];

    // Formation5
    game.formation5 = [
      [true, true, false, true, false, true, true],
      [true, true, true, false, true, true, true],
      [true, true, false, true, false, true, true]
    ];

    // Chooses random formation
    const randFormation = () => {
      switch (Math.floor(Math.random() * 5)) {
        case 0:
          return game.formation1;
          break;
        case 1:
          return game.formation2;
          break;
        case 2:
          return game.formation3;
          break;
        case 3:
          return game.formation4;
          break;
        case 4:
          return game.formation5;
          break;
      }
    }

    // Create enemies
    const formation = randFormation();
    for (var i = 0; i < formation.length; i++) {
      for (var x = 0; x < formation[i].length; x++) {
        if (formation[i][x]) {
          game.enemies.create(50 * (x + 1), 50 * (i + 1), `bug${Math.floor(Math.random() * 3) + 1}`).setScale(0.6).setGravityY(-700);
        }
      }
    }

    // Generate pellet
    const createPellet = () => {
      if (game.active) {
        // Choose random enemy
        let randomBug = Phaser.Utils.Array.GetRandom(game.enemies.getChildren());

        // Create pellets
        game.pellets.create(randomBug.x, randomBug.y, "bugPellet");
      }
    }

    // Generate speedPowerup
    const createSpeedPowerup = () => {
      if (game.active) {
        // Create powerup
        if (player1.playerSpeed <= 160 && game.level > 2 && Math.floor(Math.random() * 3) < 1) {
          game.speedPowerup.create(Math.random() * config.width, 0, "speedPowerup").setScale(0.3);
        }

        // Multiplayer
        if (game.multiplayer) {
          if (player2.playerSpeed <= 160 && game.level > 2 && Math.floor(Math.random() * 3) < 1) {
            game.speedPowerup.create(Math.random() * config.width, 0, "speedPowerup").setScale(0.3);
          }
        }
      }
    }

    // Generate rocketPowerup
    const createRocketPowerup = () => {
      if (game.active) {
        // Create powerup
        if (game.level > 5 && !player1.rocket && Math.floor(Math.random() * 5) < 1 && !player1.protection) {
          game.rocketPowerup.create(Math.random() * config.width, 0, "rocketPowerup").setScale(0.3);
        }

        // Multiplayer
        if (game.multiplayer) {
          if (game.level > 5 && !player2.rocket && Math.floor(Math.random() * 5) < 1 && !player2.protection) {
            game.rocketPowerup.create(Math.random() * config.width, 0, "rocketPowerup").setScale(0.3);
          }
        }
      }
    }

    // Generate jumpPowerup
    const createJumpPowerup = () => {
      if (game.active) {
        // Create powerup
        if (game.level > 4 && !player1.jump && Math.floor(Math.random() * 3) < 1) {
          game.jumpPowerup.create(Math.random() * config.width, 0, "jumpPowerup").setScale(0.3);
        }

        // Multiplayer
        if (game.multiplayer) {
          if (game.level > 4 && !player2.jump && Math.floor(Math.random() * 3) < 1) {
            game.jumpPowerup.create(Math.random() * config.width, 0, "jumpPowerup").setScale(0.3);
          }
        }
      }
    }

    // Generate bubblePowerup
    const createBubblePowerup = () => {
      if (game.active) {
        // Create powerup
        if (game.level > 5 && !player1.protection && Math.floor(Math.random() * 4) < 1 && !player1.rocket) {
          game.bubblePowerup.create(Math.random() * config.width, 0, "bubblePowerup").setScale(0.3);
        }

        // Multiplayer
        if (game.multiplayer) {
          if (game.level > 5 && !player2.protection && Math.floor(Math.random() * 4) < 1 && !player2.rocket) {
            game.bubblePowerup.create(Math.random() * config.width, 0, "bubblePowerup").setScale(0.3);
          }
        }
      }
    }

    // Loop pellets
    game.pelletsLoop = this.time.addEvent({
      // Time
      delay: game.pelletGenSpeed,

      // Callback
      callback: createPellet,
      callbackScope: this,

      // Loop
      loop: true
    });

    // Loop speedPowerups
    game.speedPowerupLoop = this.time.addEvent({
      // Time
      delay: 5000,

      // Callback
      callback: createSpeedPowerup,
      callbackScope: this,

      // Loop
      loop: false
    });

    // Loop jumpPowerups
    game.jumpPowerupLoop = this.time.addEvent({
      // Time
      delay: 5000,

      // Callback
      callback: createJumpPowerup,
      callbackScope: this,

      // Loop
      loop: false
    });

    // Loop rocketPowerups
    game.rocketPowerupLoop = this.time.addEvent({
      // Time
      delay: 5000,

      // Callback
      callback: createRocketPowerup,
      callbackScope: this,

      // Loop
      loop: false
    });

    // Loop bubblePowerups
    game.bubblePowerupLoop = this.time.addEvent({
      // Time
      delay: 5000,

      // Callback
      callback: createBubblePowerup,
      callbackScope: this,

      // Loop
      loop: false
    });

    // Colliders
    // Player, platforms
    this.physics.add.collider(game.player1, game.platforms);

    // Multiplayer
    if (game.multiplayer) {
      this.physics.add.collider(game.player2, game.platforms);
    }

    // Pellets, platforms
    this.physics.add.collider(game.pellets, game.platforms, (pellet) => {
      // Destroy pellet
      pellet.destroy();
    });

    // Enemy, bugRepellent
    this.physics.add.collider(game.enemies, game.bugRepellent, (bug, repellent) => {
      // Audio
      game.explosion.play();

      // Destroy sprites
      bug.destroy();
      repellent.destroy();

      // Shake
      this.cameras.main.shake(240, 0.005, false);

      // Set stats
      game.scoreText.setText(`Level: ${game.level}    High: ${game.high}`);
    });

    // Pellets, player1
    this.physics.add.overlap(game.pellets, game.player1, (player, pellet) => {
      // Extra life
      if (!player1.rocket && !player1.protection) {
        // Destroy loop
        game.pelletsLoop.destroy();

        // Set active
        game.active = false;

        // Set velocity
        game.enemyVelocity = 1;

        // Set downSpeed
        game.enemyDownSpeed = 10;

        // Pause physics
        this.physics.pause();

        // Audio
        game.theme.stop();
        game.death.play();

        // Shake
        this.cameras.main.shake(240, 0.05, false);

        // Reset speed
        player1.playerSpeed = 160;

        // Reset rocket powerup
        player1.rocket = false;

        // Reset jump powerup
        player1.jump = false;

        // Reset pellet speed
        game.pelletGenSpeed = 600;

        // Message
        this.add.text(130, 250, "Game Over | Restart?", {
          // Size
          fontSize: "16px",

          // Color
          fill: "#000000"
        });
      } else if (player1.rocket) {
        // Audio
        game.explosion.play();

        // Destroy rocket blaster
        game.rocketBlaster1.visible = false;

        // Reset rocket powerup
        player1.rocket = false;

        // Destroy pellet
        pellet.destroy();
      } else if (player1.protection) {
        // Audio
        game.bubbleHit.play();

        // Minus bubble hits
        player1.bubbleHits--;

        // Destroy bubble
        if (player1.bubbleHits === 0) {
          game.bubble1.visible = false;
          player1.protection = false;
        }

        // Destroy pellet
        pellet.destroy();
      }
    });

    // Multiplayer
    if (game.multiplayer) {
      // Pellets, player2
      this.physics.add.overlap(game.pellets, game.player2, (player, pellet) => {
        // Extra life
        if (!player2.rocket && !player2.protection) {
          // Destroy loop
          game.pelletsLoop.destroy();

          // Set active
          game.active = false;

          // Set velocity
          game.enemyVelocity = 1;

          // Set downSpeed
          game.enemyDownSpeed = 10;

          // Pause physics
          this.physics.pause();

          // Audio
          game.theme.stop();
          game.death.play();

          // Shake
          this.cameras.main.shake(240, 0.05, false);

          // Reset speed
          player2.playerSpeed = 160;

          // Reset rocket powerup
          player2.rocket = false;

          // Reset jump powerup
          player2.jump = false;

          // Reset pellet speed
          game.pelletGenSpeed = 600;

          // Message
          this.add.text(130, 250, "Game Over | Restart?", {
            // Size
            fontSize: "16px",

            // Color
            fill: "#000000"
          });
        } else if (player2.rocket) {
          // Audio
          game.explosion.play();

          // Destroy rocket blaster
          game.rocketBlaster2.visible = false;

          // Reset rocket powerup
          player2.rocket = false;

          // Destroy pellet
          pellet.destroy();
        } else if (player2.protection) {
          // Audio
          game.bubbleHit.play();

          // Minus bubble hits
          player2.bubbleHits--;

          // Destroy bubble
          if (player2.bubbleHits === 0) {
            game.bubble2.visible = false;
            player2.protection = false;
          }

          // Destroy pellet
          pellet.destroy();
        }
      });
    }

    // Enemy, platforms
    this.physics.add.collider(game.enemies, game.platforms, () => {
      // Set active
      game.active = false;

      // Set velocity
      game.enemyVelocity = 1;

      // Set downSpeed
      game.enemyDownSpeed = 10;

      // Pause physics
      this.physics.pause();

      // Audio
      game.theme.stop();
      game.death.play();

      // Shake
      this.cameras.main.shake(240, 0.05, false);

      // Reset speeds
      player1.playerSpeed = 160;

      // Multiplayer
      if (game.multiplayer) {
        player2.playerSpeed = 160;
      }

      // Reset rocket powerups
      player1.rocket = false;

      // Multiplayer
      if (game.multiplayer) {
        player2.rocket = false;
      }

      // Reset jump powerups
      player1.jump = false;

      // Multiplayer
      if (game.multiplayer) {
        player2.jump = false;
      }

      // Reset pellet speed
      game.pelletGenSpeed = 600;

      // Message
      this.add.text(130, 250, "Game Over | Restart?", {
        // Size
        fontSize: "16px",

        // Color
        fill: "#000000"
      });
    });

    // SpeedPowerup, platform
    this.physics.add.collider(game.speedPowerup, game.platforms);

    // SpeedPowerup, player1
    this.physics.add.overlap(game.speedPowerup, game.player1, function(player, powerup) {
      // Audio
      game.powerup.play();

      // Destroy powerup
      powerup.destroy();

      // Faster
      player1.playerSpeed += 150;
    });

    // Multiplayer
    if (game.multiplayer) {
      // SpeedPowerup, player2
      this.physics.add.overlap(game.speedPowerup, game.player2, function(player, powerup) {
        // Audio
        game.powerup.play();

        // Destroy powerup
        powerup.destroy();

        // Faster
        player2.playerSpeed += 150;
      });
    }

    // RocketPowerup, platform
    this.physics.add.collider(game.rocketPowerup, game.platforms);

    // RocketPowerup, player1
    this.physics.add.overlap(game.rocketPowerup, game.player1, function(player, powerup) {
      // Audio
      game.powerup.play();

      // Destroy powerup
      powerup.destroy();

      // Set vars
      player1.rocket = true;
      game.rocketBlaster1.visible = true;
    });

    // Multiplayer
    if (game.multiplayer) {
      // RocketPowerup, player2
      this.physics.add.overlap(game.rocketPowerup, game.player2, function(player, powerup) {
        // Audio
        game.powerup.play();

        // Destroy powerup
        powerup.destroy();

        // Set vars
        player2.rocket = true;
        game.rocketBlaster2.visible = true;
      });
    }

    // JumpPowerup, platform
    this.physics.add.collider(game.jumpPowerup, game.platforms);

    // JumpPowerup, player1
    this.physics.add.overlap(game.jumpPowerup, game.player1, function(player, powerup) {
      // Audio
      game.powerup.play();

      // Destroy powerup
      powerup.destroy();

      // Set vars
      player1.jump = true;
    });

    // Multiplayer
    if (game.multiplayer) {
      // JumpPowerup, player2
      this.physics.add.overlap(game.jumpPowerup, game.player, function(player, powerup) {
        // Audio
        game.powerup.play();

        // Destroy powerup
        powerup.destroy();

        // Set vars
        player2.jump = true;
      });
    }

    // BubblePowerup, platform
    this.physics.add.collider(game.bubblePowerup, game.platforms);

    // BubblePowerup, player1
    this.physics.add.overlap(game.bubblePowerup, game.player1, function(player, powerup) {
      // Audio
      game.powerup.play();

      // Destroy powerup
      powerup.destroy();

      // Set vars
      player1.protection = true;
      game.bubble1.visible = true;
    });

    // Multiplayer
    if (game.multiplayer) {
      // BubblePowerup, player2
      this.physics.add.overlap(game.bubblePowerup, game.player2, function(player, powerup) {
        // Audio
        game.powerup.play();

        // Destroy powerup
        powerup.destroy();

        // Set vars
        player2.protection = true;
        game.bubble2.visible = true;
      });
    }
  }

  // Update
  update() {
    if (game.active) {
      // Rocket blaster pos
      if (player1.rocket) {
        game.rocketBlaster1.x = game.player1.x;
        game.rocketBlaster1.y = game.player1.y;
      }

      // bubble pos
      if (player1.protection) {
        game.bubble1.x = game.player1.x;
        game.bubble1.y = game.player1.y;
      }

      // Multiplayer
      if (game.multiplayer) {
        // Rocket blaster pos
        if (player2.rocket) {
          game.rocketBlaster2.x = game.player2.x;
          game.rocketBlaster2.y = game.player2.y;
        }

        // bubble pos
        if (player2.protection) {
          game.bubble2.x = game.player2.x;
          game.bubble2.y = game.player2.y;
        }
      }

      // Control movement
      // Player1
      if (game.cursors.left.isDown) {
        // Left
        game.player1.setVelocityX(-player1.playerSpeed);
      } else if (game.cursors.right.isDown) {
        // Right
        game.player1.setVelocityX(player1.playerSpeed);
      } else {
        // None
        game.player1.setVelocityX(0);
      }

      // Jump powerup
      if (player1.jump) {
        if (game.cursors.up.isDown && game.player.body.touching.down) {
          // Audio
          game.bounce.play();

          // Set velocity
          game.player1.setVelocityY(-200);
        }
      }

      // Multiplayer
      if (game.multiplayer) {
        if (player2.jump) {
          if (game.cursors.up.isDown && game.player.body.touching.down) {
            // Audio
            game.bounce.play();

            // Set velocity
            game.player2.setVelocityY(-200);
          }
        }
      }

      // Bubble powerup
      if (player1.protection && player1.bubbleHits === 0) {
        game.bubble1.visible = false;
      }

      // Multiplayer
      if (game.multiplayer) {
        if (player2.protection && player2.bubbleHits === 0) {
          game.bubble2.visible = false;
        }
      }

      // Shoot bugRepellent spacebar
      if (Phaser.Input.Keyboard.JustDown(game.cursors.space)) {
        // Rocket powerup
        if (player1.rocket && !player1.blasterReload) {
          // Create bugRepellent sprite
          // Left
          game.bugRepellent.create(game.player1.x - 10, game.player1.y - 10, "bugRepellent").setGravityY(-1600).setScale(1.5).setVelocityX(-10);

          // Right
          game.bugRepellent.create(game.player1.x + 10, game.player1.y - 10, "bugRepellent").setGravityY(-1600).setScale(1.5).setVelocityX(10);

          // Center
          game.bugRepellent.create(game.player1.x, game.player1.y - 10, "bugRepellent").setGravityY(-1600).setScale(1.5);

          // Play sound
          game.rocketBlast.play();

          // Set reload
          player1.blasterReload = true;
        } else if (player1.rocket && player1.blasterReload) {
          // Audio
          game.click.play();

          // Set reload
          player1.blasterReload = false;
        } else if (!player1.rocket) {
          // Create bugRepellent sprite
          game.bugRepellent.create(game.player1.x, game.player1.y, "bugRepellent").setGravityY(-1600).setScale(1);

          // Play sound
          game.pew.play();
        }
      }

      // Shoot bugRepellent shift
      if (Phaser.Input.Keyboard.JustDown(game.cursors.shift)) {
        // Rocket powerup
        if (player2.rocket && !player2.blasterReload) {
          // Create bugRepellent sprite
          // Left
          game.bugRepellent.create(game.player2.x - 10, game.player2.y - 10, "bugRepellent").setGravityY(-1600).setScale(1.5).setVelocityX(-10);

          // Right
          game.bugRepellent.create(game.player2.x + 10, game.player2.y - 10, "bugRepellent").setGravityY(-1600).setScale(1.5).setVelocityX(10);

          // Center
          game.bugRepellent.create(game.player2.x, game.player2.y - 10, "bugRepellent").setGravityY(-1600).setScale(1.5);

          // Play sound
          game.rocketBlast.play();

          // Set reload
          player2.blasterReload = true;
        } else if (player2.rocket && player2.blasterReload) {
          // Audio
          game.click.play();

          // Set reload
          player2.blasterReload = false;
        } else if (!player2.rocket) {
          // Create bugRepellent sprite
          game.bugRepellent.create(game.player2.x, game.player2.y, "bugRepellent").setGravityY(-1600).setScale(1);

          // Play sound
          game.pew.play();
        }
      }

      // Win condition
      if (!this.enemyNum()) {
        // Set active
        game.active = false;

        // Pause physics
        this.physics.pause();

        // Velocity
        game.enemyVelocity = game.level * 0.3 + 1;

        // Audio
        game.theme.stop();
        game.win.play();

        // More pellets
        game.pelletGenSpeed -= 20;

        // Set high score
        if (game.level > game.high) {
          game.high = game.level;
          localStorage.setItem("high", game.high);
        }

        // Message
        this.add.text(150, 250, `Level ${game.level} cleared! ${game.level % 5 === 0 ? "\nUnlocked new Stage!" : ""}`, {
          fontSize: "16px",
          fill: "#000000"
        });
      } else {
        // Move enemies
        game.enemies.getChildren().forEach(i => {
          i.x += game.enemyVelocity;
        });

        // Left and right enemies
        game.leftBug = this.sortedEnemies()[0];
        game.rightBug = this.sortedEnemies()[this.sortedEnemies().length - 1];

        // Touching bounds
        if (game.leftBug.x < 10 || game.rightBug.x > 440) {
          // Change direction
          game.enemyVelocity *= -1;

          // Move down
          game.enemies.getChildren().forEach(i => {
            i.y += game.enemyDownSpeed;
          });
        }
      }
    }
  }
}

// Config
const config = {
  // Type
	type: Phaser.AUTO,

  // Porportions
	width: 450,
	height: 500,

  // Color
	backgroundColor: "b9eaff",

  // Physics
	physics: {
		default: "arcade",
		arcade: {
      // Gravity
			gravity: {
        y: 700
      },

      // Options
			enableBody: true,
		}
	},

  // Scene
	scene: [StartScene, ChooseScene, GameScene]
};

// Create Phaser game
const phaserGame = new Phaser.Game(config);
