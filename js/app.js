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

    // check for collisions between player and enemy
    if (player.x >= this.x - 30 && player.x <= this.x - 30 && this.y >= player.y - 10 && this.y <= player.y + 10) {
        console.log('You Loose!')
        player.reset()
    } else if (player.x <= 50) {
        console.log('You won!')
        player.reset()
    }
};

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
                this.y += 83
            }
            break
        case 'down':
            if (this.y < 400) {
                this.y -= 83
            }
            break
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202.5, 383, 50)
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256)


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
