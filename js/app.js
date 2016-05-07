 'use strict';
 // some of the canvas properties to work with
 var gameProps = {
     columns: 5,
     rows: 6,
     width: 505,
     height: 606,
     colWidth: 101,
     rowHeight: 83,

 };

//create a random value to be used for various purposes
 function randomI() {
     return Math.round(Math.random() * 100) / 100;
 }

 // Enemies our player must avoid
 var Enemy = function() {

     this.x = 0;
     this.leveller = 0;
     this.speed = Math.random() * (300 - 100) + 50 + this.leveller;

     // row picker randomly assigns the enemies a row to travel along
     this.rowPicker = function() {
         this.randomiser = randomI();
         this.x = -80;
         if (this.randomiser <= 0.33) {
             this.y = (gameProps.rowHeight * 1) - 25;
         } else if (this.randomiser >= 0.34 && this.randomiser <= 0.66) {
             this.y = (gameProps.rowHeight * 2) - 25;
         } else {
             this.y = (gameProps.rowHeight * 3) - 25;
         }
     };

     this.rowPicker();

     this.sprite = 'images/enemy-bug.png';

 };

 // Update the enemy's position, required method for game
 // Parameter: dt, a time delta between ticks
 Enemy.prototype.update = function(dt) {
     if (this.x >= 500) {
         this.rowPicker();
     }

     this.leftLimit = this.x + 30;
     this.rightLimit = this.x + (gameProps.colWidth - 30);

     this.x += this.speed * dt;

     // You should multiply any movement by the dt parameter
     // which will ensure the game runs at the same speed for
     // all computers.

 };

 // Draw the enemy on the screen, required method for game
 Enemy.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

 };

//reset the enemies with relative values based on whether you won or lost the previous game.
// the leveller property increases or decreases based on winning or losing.
// The more you win, the more potential speed of the enemy increases, if you lose, it decreases
 Enemy.prototype.init = function(level) {
     if (level === 'win') {
         this.leveller += 50;
     } else if (level === 'lose') {
         if (this.leveller <= 0) {

         } else {
             this.leveller -= 50;
         }
     }

     this.speed = Math.random() * (300 - 100) + 50 + this.leveller;

     this.rowPicker();
 };

// player class is created here
 var Player = function() {

     this.sprite = 'images/char-boy.png';
     this.x = gameProps.colWidth * 2;
     this.y = (gameProps.rowHeight * 5) - 25;
 };

 Player.prototype.update = function(dt) {
     this.leftLimit = this.x;
     this.rightLimit = this.x + gameProps.colWidth;
 };

 Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };

// based on keyboard movements, player moves around, until it reaches the canvas border then the movements are disabled
 Player.prototype.handleInput = function(direction) {
     switch (direction) {
         case 'left':
             if (this.x <= 0) {
                /*do nothing*/
             } else {
                 this.x -= gameProps.colWidth;
             }
             break;

         case 'up':
             if (this.y >= gameProps.height) {
                /*do nothing*/
             } else {
                 this.y -= gameProps.rowHeight;
             }

             break;

         case 'right':
             if (this.x >= gameProps.colWidth * 4) {
                /*do nothing*/
             } else {
                 this.x += gameProps.colWidth;
             }
             break;

         case 'down':
             if (this.y >= (gameProps.rowHeight * 5) - 40) {
                /*do nothing*/
             } else {
                 this.y += gameProps.rowHeight;
             }

        break;

    }
 };

//reset player position after win or lose
 Player.prototype.init = function() {
     this.x = gameProps.colWidth * 2;
     this.y = (gameProps.rowHeight * 5) - 25;
 };


 // instantiate your objects.
 // Place all enemy objects in an array called allEnemies
 // Place the player object in a variable called player
 var bug1 = new Enemy();
 var bug2 = new Enemy();
 var bug3 = new Enemy();


 var allEnemies = [bug1, bug2, bug3];
 var player = new Player();



 // This listens for key presses and sends the keys to your
 // Player.handleInput() method.
 document.addEventListener('keyup', function(e) {
     var allowedKeys = {
         37: 'left',
         38: 'up',
         39: 'right',
         40: 'down'
     };

     player.handleInput(allowedKeys[e.keyCode]);
 });

//create a score class
 var Score = function() {
     this.tally = 0;
 };

// create prototype that, when called will update and render the score
//(called after the ctx variable is made global in engine.js)
 Score.prototype.render = function() {
     ctx.clearRect(0, 0, ctx.canvas.width, 100);
     ctx.font = 'bold 36px sans-serif';
     ctx.textAlign = 'right';
     ctx.fillStyle = 'red';
     var scoreString = 'Score: ' + this.tally;
     ctx.fillText(scoreString, 500, 40);
 };
// initialise score
 var score = new Score();