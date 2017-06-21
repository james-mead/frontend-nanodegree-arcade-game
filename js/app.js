// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // x and y coordinates and speed
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Reset enemy position if it wonders off canvas, otherwise continue
    if (this.x < 505) {
        this.x += this.speed * dt
    } else {
        this.x = 0
    }


    // Check for collision with enemies or barrier-walls
    checkCollision(this);
};

Enemy.prototype.reset = function () {
    this.x = 0
    this.y = 58
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
    this.sprite = 'images/char-boy.png'
}

Player.prototype.update = function () {
    // declare the function
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
}

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101
            }
            break
        case 'right':
            if (this.x < 401) {
                this.x += 101
            }
            break
        case 'up':
            if (this.y > 0) {
                this.y -= 83
            }
            break
        case 'down':
            if (this.y < 400) {
                this.y += 83
            }
            break
    }
}

var checkCollision = function (anEnemy) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
        console.log('collided');
        player.reset()
    }

    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function
    if (player.y <= 63) {        
        console.log('you made it!');
        score += 1;
        console.log('current score: ' + score);
        player.reset()
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 400, 50)
var score = 0
for (var i = 0; i < 5; i++) {
    allEnemies.push(new Enemy(0, Math.floor(Math.random() * 3) * 83 + 58, Math.floor(Math.random() * 100) + 100));
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
