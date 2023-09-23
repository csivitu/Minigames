//need to work on retry
//polishing
//leaderboard
//high score
//npcs spawning more often
let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
canvas.width = 1000; // needs to be the same as defined in the CSS stylesheet
canvas.height = 800;


//tracks
let soundtrack = document.getElementById('soundtrack');
let playButton = document.getElementById('playButton');

let track1playing = false;//checking which track is being played 
let track2playing = false;
playButton.addEventListener('click', () => {//when first playbutton is pressed
	if (track2playing == true){
	}
	soundtrack.play();
	track1playing= false;

});
let soundtrack1= document.getElementById('soundtrack1');
let playButton1 = document.getElementById('playButton1');

playButton1.addEventListener('click', () => {//when second play button is pressed
	if (track1playing == true){
		
	}
	soundtrack1.play();
	track2playing = false;
});

let stop = document.getElementById('stopButton');
stop.addEventListener('click',() => {
	soundtrack.currentTime = 0;
	soundtrack1.currentTime = 0;
	track1playing = false;
	track2playing = false;
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let animationId;
let level = 0;
let score = 0;
localStorage.setItem('highscore','0')
let highscore = parseInt(localStorage.highscore)
let first = false;
let gameFrame = 0;
ctx.font = '40px Georgia';
let gameSpeed = 1;
let gameOver = false;
// mouse interactivity

let canvasPosition = canvas.getBoundingClientRect(); // will measure the current size and position of the canvas element

let mouse = {
	x: canvas.width / 3,
  	y: canvas.height / 2,
  	click: false
};
canvas.addEventListener('mousedown', function(event) {
  	mouse.click = true;
  	mouse.x = event.x - canvasPosition.left;//to get the position with respect to the canvas
 	mouse.y = event.y - canvasPosition.top;
});

canvas.addEventListener('mouseup', function(event) {
  	mouse.click = false;
});
 
// player

let playerLeft = new Image();
playerLeft.src = 'fish_swim_left.png';
let playerRight = new Image();
playerRight.src = 'fish_swim_right.png';
class Player {
  	constructor() {
    		this.x = 0;
    		this.y = canvas.height / 2;
    		this.radius = 50;
    		this.angle = 0; // will later use to point the fish in the given mouse direction
    		this.frameX = 0;
    		this.frameY = 0;
    		this.frame = 0;
    		this.spriteWidth = 498;//obtained from the sprite image that is being used for the player game asset
    		this.spriteHeight = 327; 
  	}
	reset() {
		this.x = 0;
		this.y = canvas.height/2;
		this.frameX = 0;
		this.frameY = 0;
		this.frame = 0;
	}
  	update() {
    		let dx = this.x - mouse.x;
    		let dy = this.y - mouse.y;
			let theta = Math.atan2(dy,dx);//theta = tan(dy/dx)
			this.angle = theta;
    		if (mouse.x !== this.x) {//speed = distance/time; here 30 represents the time taken to travel dx distance, as time decreases -> speed increases
      			this.x -= dx / 30; // to slow down the animation of the movement of the player
    		}
    		if (mouse.y !== this.y) {
      			this.y -= dy / 30;
    		}
  	}
  	draw() {
    		if (mouse.click !== true) {
      			ctx.lineWidth = 0.2;
      			ctx.beginPath();
      			ctx.moveTo(this.x, this.y);
      			ctx.lineTo(mouse.x, mouse.y);
      			ctx.stroke();
    		}
			ctx.save();
			ctx.translate(this.x,this.y);
			ctx.rotate(this.angle);
			if (this.x >= mouse.x){//player has to travel towards the left side since the player position is ahead of the mouse position determined by the user playing
				ctx.drawImage(playerLeft,this.frameX * this.spriteWidth,this.frameY*this.spriteHeight,this.spriteWidth,this.spriteHeight,0-60,0-45,this.spriteWidth/4,this.spriteHeight/4);
			}
			else {//player has to travel towards the right side since the player position is behind the mouse position determined by the user playing
				ctx.drawImage(playerRight,this.frameX * this.spriteWidth,this.frameY*this.spriteHeight,this.spriteWidth,this.spriteHeight,0-60,0-45,this.spriteWidth/4,this.spriteHeight/4);
			}
			ctx.restore();
  	}		
}
//initiating the player -> pc
let player = new Player(); // Added parentheses to instantiate the Player class

// bubbles

let bubblesArray = [];
let bubbleImage = new Image();
bubbleImage.src = 'bubble_pop_frame_01.png';//bubble image that is being used as npc 

class Bubble {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = canvas.height + 100;
		this.radius = 50;
		this.speed = Math.random()*5+1 + 2.5 * level;//range [1,6]
		this.distance; 
		this.counted = false;
		this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
	}
	update() {
		this.y -= this.speed;
		let dx = this.x - player.x;
		let dy = this.y - player.y;
		this.distance = Math.sqrt(dx*dx + dy*dy);
	}
	draw() {
	// 	ctx.fillStyle='blue';
	// 	ctx.beginPath();
	// 	ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
	// 	ctx.fill();
	// 	ctx.closePath();
	// 	ctx.stroke();
		ctx.drawImage(bubbleImage,this.x-65,this.y-65,this.radius*2.6,this.radius*2.6);
	}
}

let bubblePop1 = document.createElement('audio');
bubblePop1.src = 'Plop.ogg';
let bubblePop2 = document.createElement('audio');
bubblePop2.src = 'bubbles-single2.wav';
function handleBubble() {
	if (gameFrame % 50 == 0){
		bubblesArray.push(new Bubble());		
	}
	for (let i = 0; i < bubblesArray.length;i++) {
		
		bubblesArray[i].update();
		bubblesArray[i].draw();
		if (bubblesArray[i].y < 0 - bubblesArray[i].radius* 2) {
			bubblesArray.splice(i,1);
			i--;
		}
		else if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius){
			if (!bubblesArray[i].counted){
				if (bubblesArray[i].sound == 'sound1'){
					if (track1playing == true) {
						soundtrack.pause();
						bubblePop1.play();
						soundtrack.play();
					}
					else if (track2playing == true) {
						soundtrack1.pause();
						bubblePop1.play();
						soundtrack1.play();
			
					}
					else {
						bubblePop1.play();
					}
				}
				else {
					if (track1playing == true) {
						soundtrack.pause();
						bubblePop2.play();
						soundtrack.play();
					}
					else if (track2playing == true) {
						soundtrack1.pause();
						bubblePop2.play();
						soundtrack1.play();
			
					}
					else {
						bubblePop2.play();
					}
				}
	
				score++;
				level = Math.floor(score / 10);
				bubblesArray[i].counted = true;
				bubblesArray.splice(i,1);
				i--;
			}
		}
	} 
}

//Repeating backgrounds
let background = new Image();
background.src = 'background1.png';
let BG = {
	x1:0,
	x2:canvas.width,
	y:0,
	width: canvas.width,
	height: canvas.height
}
function handleBackground() {
	BG.x1-= gameSpeed;
	if (BG.x1 < -BG.width) BG.x1 = BG.width;
	BG.x2-= gameSpeed;
	if (BG.x2 < -BG.width) BG.x2 = BG.width;
	ctx.drawImage(background,BG.x1,BG.y,BG.width,BG.height);
	ctx.drawImage(background,BG.x2,BG.y,BG.width,BG.height);
}


//level

////////////////////////////////////////////////////////////////////
let boat = new Image();
boat.src = 'boat.png';
let boatPosition = {
	x: 90, // Set the initial x-position of the boat
	y: 70, // Set the initial y-position of the boat
	width: 200, // Set the width of the boat image
	height: 150, // Set the height of the boat image4
	targetx: canvas.width,
	targety: 70
  };
function drawBoat() {
	ctx.drawImage(boat,boatPosition.x/7,boatPosition.y-76,boatPosition.width,boatPosition.height);
	boatPosition.x++;
}
let fish = new Image();
fish.src = 'icon.png';
let fish2 = new Image();
fish2.src = 'left.png';

let fishPosition = {
	x:canvas.width,
	y1:Math.random()*(canvas.height-250),
	y2:Math.random()*(canvas.height-250 -10) 	 	
}

function friendlyfish() {
	ctx.drawImage(fish,fishPosition.x,fishPosition.y1,100,75);
	ctx.drawImage(fish2,fishPosition.x/4,fishPosition.y2,100,75);
	fishPosition.x--;

}

// Enemies

let enemyImage = new Image();
enemyImage.src = 'enemy1.png';
class Enemy {
	constructor() {
		this.x = canvas.width ;
		this.y = Math.random() * (canvas.height - 150) + 105;
		if (this.y < 90 ) {
			this.y = 120;
		}
		this.radius = 60;
		this.speed = Math.random() * 2 + 2;
		this.frame = 0;
		this.frameX = 0;
		this.frameY = 0;
		this.spriteWidth = 418;
		this.spriteHeight = 397;
	}
	reset() {
		this.x = canvas.width - 200;
		this.y = Math.random() * (canvas.height - 150) + 150;
		this.speed = Math.random() * 2 + 2 + 2 * level;
		this.frame = 0;
		this.frameX = 0;
		this.frameY = 0;

	}
	draw() {
		// ctx.fillStyle='red';
		// ctx.beginPath();
		// ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
		// ctx.fill();
		ctx.drawImage(enemyImage,this.frameX*this.spriteWidth,this.frameY*this.spriteHeight,this.spriteWidth,this.spriteHeight,this.x-60,this.y-70,this.spriteWidth/3,this.spriteHeight/3);
	}
	update() {
		this.x  -= this.speed;
		if (this.x < 0 - this.radius * 2) {
			this.x = canvas.width + 200;
			this.y = Math.random() * (canvas.height - 150) + 90;
			this.speed = Math.random() * 2 + 2;
		}
		if (gameFrame % 5 == 0){
			this.frame++;
			if (this.frame >= 12) this.frame = 0;
			if (this.frame == 3 || this.frame == 7 || this.frame == 11){
				this.frameX = 0;
			}
			else {
				this.frameX++;
			}
			if (this.frame < 3) this.frameY = 0;
			else if (this.frame < 7) this.frameY = 1;
			else if (this.frame < 11) this.frameY = 2;
			else this.frameY = 0;
		}
		//collision with player
		let dx = this.x - player.x;//checking the distance between the two
		let dy = this.y - player.y;
		let distance = Math.sqrt(dx*dx + dy*dy);
		if (distance < this.radius + player.radius) {
			handleGameOver();

		}
	}
}
let enemyArray = []
enemy1 = new Enemy();

//let spawnedEnemy = false;

let spawn = 1;
function handleEnemies() {
	enemy1.draw();
	enemy1.update();
	if (score % 10 == 0 && score != 0 && spawn == level) {//!spawnedEnemy
		enemyArray.push(new Enemy());
		spawn++;
		console.log(enemyArray.length);
		//spawnedEnemy = true;
	}

	for (let i = 0; i < enemyArray.length; i++) {
		enemyArray[i].draw();
		enemyArray[i].update();
	}
}

function handleGameOver() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = 'white';
	ctx.fillText('GAME OVER, you reached score ' + score,110,250);
	if (score > highscore) {
		localStorage.removeItem('highscore')
		localStorage.setItem('highscore',score)
		highscore = parseInt(localStorage.highscore)
	}
	ctx.fillText('High score:' + highscore,110,300);
	gameOver = true;
	retry();
	
}
function retry() {
	if (gameOver == true) {
	  let retryButton = document.getElementById('retryButton');
	  //console.log(retryButton,score,gameFrame,level,mouse.x,bubl);
	  retryButton.style.display = 'block';
	  retryButton.addEventListener('click', function() {
		// Reset game variables
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		score = 0;
		level = Math.floor(score/10);
		gameFrame = 0;
		gameOver = false;
		gameSpeed = 1;
		// bubblesArray.length = 0;
		mouse.x= canvas.width / 3;
  		mouse.y= canvas.height / 2;
		// // Hide retry button
		// retryButton.style.display = 'none';
		// // Restart animation
		player.reset();
		// enemy1.reset();
		bubblesArray = [];
		enemyArray = [];
		// animate();
		cancelAnimationFrame(animationId);
		//location.reload();
		highscore = parseInt(localStorage.highscore)
		animate();
	  });
	}
  }
  

/**** BUBBLE TEXT ***/
let bubbleTextArray = [];
let adjustX = -3;
let adjustY = -3;
ctx.fillStyle = "white";
ctx.font = "17px Verdana";
ctx.fillText("black", 20, 42);

let textCoordinates = ctx.getImageData(0, 0, 100, 100);

class Particle2 {
  constructor(x, y) {
	this.x = x;
	this.y = y;
	this.size = 7;
	this.baseX = this.x;
	this.baseY = this.y;
	this.density = Math.random() * 15 + 1;
	this.distance;
  }
  draw() {
	ctx.lineWidth = 3;
	ctx.strokeStyle = "rgba(34,147,214,1)";
	ctx.fillStyle = "rgba(255,255,255,1)";
	ctx.beginPath();
	if (this.distance < 50) {
	  this.size = 14;
	  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
	  ctx.stroke();
	  ctx.closePath();
	  ctx.beginPath();
	  ctx.arc(this.x + 4, this.y - 4, this.size / 3, 0, Math.PI * 2);
	  ctx.arc(this.x - 6, this.y - 6, this.size / 5, 0, Math.PI * 2);
	} else if (this.distance <= 80) {
	  this.size = 8;
	  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
	  ctx.stroke();
	  ctx.closePath();
	  ctx.beginPath();
	  ctx.arc(this.x + 3, this.y - 3, this.size / 2.5, 0, Math.PI * 2);
	  ctx.arc(this.x - 4, this.y - 4, this.size / 4.5, 0, Math.PI * 2);
	} else {
	  this.size = 5;
	  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
	  ctx.stroke();
	  ctx.closePath();
	  ctx.beginPath();
	  ctx.arc(this.x + 1, this.y - 1, this.size / 3, 0, Math.PI * 2);
	}
	ctx.closePath();
	ctx.fill();
  }
  update() {
	let dx = player.x - this.x;
	let dy = player.y - this.y;
	let distance = Math.sqrt(dx * dx + dy * dy);
	this.distance = distance;
	let forceDirectionX = dx / distance;
	let forceDirectionY = dy / distance;
	let maxDistance = 100;
	let force = (maxDistance - distance) / maxDistance;
	let directionX = forceDirectionX * force * this.density;
	let directionY = forceDirectionY * force * this.density;

	if (distance < 100) {
	  this.x -= directionX;
	  this.y -= directionY;
	} else {
	  if (this.x !== this.baseX) {
		let dx = this.x - this.baseX;
		this.x -= dx / 20;
	  }
	  if (this.y !== this.baseY) {
		let dy = this.y - this.baseY;
		this.y -= dy / 20;
	  }
	}
  }
}

function init2() {
  bubbleTextArray = [];
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
	for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
	  if (
		textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
	  ) {
		let positionX = x + adjustX;
		let positionY = y + adjustY;
		bubbleTextArray.push(new Particle2(positionX * 8, positionY * 8));
	  }
	}
  }
}
init2();
console.log(bubbleTextArray);
/** bubble text end **/

// animation
 
function animate() {
	//console.log()
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	handleBackground();
	drawBoat();
	friendlyfish();
	handleBubble();
	player.update();
	player.draw();
	handleEnemies();
	ctx.fillStyle = "black";
	ctx.fillText('score: ' + score,canvas.width/2,50);
	ctx.fillText('Highscore:' + highscore,200,50);
	ctx.fillStyle = "rgba(34,147,214,1)";
  	ctx.font = "20px Georgia";
  	// ctx.fillStyle = "rgba(255,255,255,0.8)";
  	// ctx.fillText("score: " + score, 141, 336);
  	// ctx.fillStyle = "rgba(34,147,214,1)";
  	// ctx.fillText("score: " + score, 140, 335);
	gameFrame++;
	if (!gameOver) {
		animationId = requestAnimationFrame(animate);//recurrsion
	}
	else {
		//handleGameOver();


		soundtrack.pause();
		soundtrack.currentTime = 0;
		soundtrack1.pause();
		soundtrack1.currentTime = 0;
	}
}
var gamebeginning = false;
if (gamebeginning == false){
	animate();
	gamebeginning = true;
}


window.addEventListener('resize',function(){
	canvasPosition=canvas.getBoundingClientRect();
});
