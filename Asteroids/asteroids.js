let canvas;
let ctx;
let canvasWidth = 900;
let canvasHeight = 500;
let scale = 0.5;
let keys = [];
let ship;
let bullets = [];
let asteroids = [];
let score = 0;
let lives = 3;
let gameover = false;
let musicToggle = false;

document.addEventListener('DOMContentLoaded', SetupCanvas);

// Set Canvas Function
function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ship = new Ship();

    for(let i=0; i<5; i++){
        asteroids.push(new Asteroid());
    }  

    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
    });

    document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
        if(e.keyCode == 32){
            const bulletSpeed = Math.sqrt(ship.velX + ship.velY ** 2) + 4;
            bullets.push(new Bullet(ship.angle, bulletSpeed));
        }
    });

    Start();
}

class Ship {
    constructor(){
        this.visible = true;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.movingForward = false;
        this.movingBackward = false;
        this.gear = 1;
        this.speed = 0.1*scale;
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 25 * scale;
        this.angle = -90;
        this.strokeColor = '#39ff0d';
        this.fillColor = '#39ff0d';
        this.tipX = canvasWidth / 2 + 15*scale;
        this.tipY = canvasHeight / 2;
    }

    getShipX(){
        return this.x;
    }

    getShipY(){
        return this.y;
    }

    getVelX(){
        return this.velX;
    }

    getVelY(){
        return this.velY;
    }

    getShipSpeed(){
        return this.speed;
    }

    Rotate(dir){
        this.angle += dir*this.rotateSpeed;
    }


    Update(){
        let radians = this.angle/Math.PI * 180;

        if(this.movingForward || this.movingBackward){
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }

        if(this.x < this.radius){
            this.x = canvas.width;
        }

        if(this.x > canvas.width){
            this.x = this.radius;
        }

        if(this.y < this.radius){
            this.y = canvas.height;
        }

        if(this.y > canvas.height){
            this.y = this.radius;
        }

        this.velX *= 0.99;
        this.velY *= 0.99;

        if(ship.movingBackward){
            if(this.gear != 0){
                this.gear = 0;
                this.velX = 0;
                this.velY = 0;
            }
            this.x += this.velX;
            this.y += this.velY;
        }

        else if(ship.movingForward){
            if(this.gear != 1){
                this.gear = 1;
                this.velX = 0;
                this.velY = 0;
            }    
            this.x -= this.velX;
            this.y -= this.velY;
        }

        else{
            if(this.gear == 1){
                this.x -= this.velX;
                this.y -= this.velY;  
            }
            else{
                this.x += this.velX;
                this.y += this.velY;
            }       
        }
    }

Draw() {
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.fillColor;


    let vertAngle = (Math.PI * 2) / 3;
    let radians = this.angle / Math.PI * 180;
    this.tipX = this.x - this.radius * Math.cos(radians);
    this.tipY = this.y - this.radius * Math.sin(radians);

    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
        ctx.lineTo(
            this.x - this.radius * Math.cos(vertAngle * i + radians),
            this.y - this.radius * Math.sin(vertAngle * i + radians)
        );
    }

    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();

    ctx.lineTo(
        this.x - this.radius * Math.cos(radians),
        this.y - this.radius * Math.sin(radians)
    );

    for (let j = 1; j <= 2; j++) {
        ctx.lineTo(
            this.x - this.radius * 0.5 * Math.cos(vertAngle * j + radians + Math.PI),
            this.y - this.radius * 0.5 * Math.sin(vertAngle * j + radians + Math.PI)
        );
    }


    ctx.closePath();
    ctx.stroke();
}

}


class Bullet{
    constructor(angle,speed){
        this.visible = true;
        this.x = ship.tipX;
        this.y = ship.tipY;
        this.angle = angle;
        this.height = 4*scale;
        this.width = 4*scale;
        this.speed = speed;
        this.velX = 0;
        this.velY = 0;
    }

    Update(){
        var radians = this.angle / Math.PI * 180;
        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
    }

    Draw(){
        ctx.fillStyle = 'yellow';
        if(!gameover){
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}


class Asteroid{
    constructor(x, y, radius, level, collisionRadius){
        this.visible = true;
        this.level = level || 1;
        this.shipX = ship.getShipX();
        this.shipY = ship.getShipY();
        this.fieldRadius = 300*scale;

        this.x = x || ((Math.random() < 0.5)? Math.floor(Math.random() * (this.shipX - this.fieldRadius)) : Math.floor(Math.random() * (canvasWidth - this.shipX - this.fieldRadius)));
        this.y = y || ((Math.random() < 0.5)? Math.floor(Math.random() * (this.shipY - this.fieldRadius)) : Math.floor(Math.random() * (canvasHeight - this.shipY - this.fieldRadius)));

        this.speed = (1 + 0.5 * Math.floor(Math.random() * 3))*scale;
        this.rotateSpeed = 0.0001;
        this.angle = Math.floor(Math.random() * 359);        
        this.spin = Math.floor(Math.random() * 3) - 1;
        this.offset = Math.floor(Math.random() * 30) * scale;
        this.radius = radius || (50 + this.offset);
        this.collisionRadius = collisionRadius || (this.radius - 4*scale);
        this.strokeColor = 'white';

    }

    Rotate(dir){
        this.angle += this.rotateSpeed * dir;
    }

    Update(){

        var radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;

        if(this.x < this.radius){
            this.x = canvas.width;
        }

        if(this.x > canvas.width){
            this.x = this.radius;
        }

        if(this.y < this.radius){
            this.y = canvas.height;
        }

        if(this.y > canvas.height){
            this.y = this.radius;
        }
    }

    Draw(){

        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 6);
        var radians = this.angle / Math.PI * 180;
        for(let i=0; i<6; i++){
            ctx.lineTo(
                this.x - this.radius * Math.cos(vertAngle * i + radians),
                this.y - this.radius * Math.sin(vertAngle * i + radians)
            );
        }
        ctx.closePath();
        ctx.stroke();
    }
}

function CircleCollision(x1, y1, r1, x2, y2, r2){
    let rTotal;
    let xDiff;
    let yDiff;
    rTotal = r1 + r2;
    xDiff = x1 - x2;
    yDiff = y1 - y2;

    if(rTotal > Math.sqrt((xDiff*xDiff) + (yDiff * yDiff))){
        return true;
    }
    else {
        return false;
    }
}

function DrawLives(){
    let startX = Math.floor(canvasWidth - canvasWidth/9);
    let startY = 25;
    let points = [[9,12], [-9,12]];
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';
    for(let i = 0; i < lives; i++){
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        for(let k=0; k<points.length; k++){
            ctx.lineTo(
                startX + points[k][0],
                startY + points[k][1]
            );
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        startX += 30;
    }
}


function Start(){
    ctx.clearRect(0,0,canvasWidth, canvasHeight);
    ctx.fillStyle = 'white';
    ctx.fillText('ASTEROIDS ', canvasWidth / 2 - 120, canvasWidth / 2 - 250);

    ctx.fillText("Controls: WASD or Cursor Keys to Move Ship. ", canvasWidth / 2 - 200, canvasWidth / 2 - 200);
    ctx.fillText("Press Spacebar to Shoot Bullets at Asteroids. ", canvasWidth / 2 - 200, canvasWidth / 2 - 170);
    ctx.fillText("Press R to Restart the Game Window. ", canvasWidth / 2 - 200, canvasWidth / 2 - 140);
    ctx.fillText("~ ~ ~ Hit the ENTER key to Start. ~ ~ ~", canvasWidth / 2 - 160, canvasWidth / 2 - 90);


    if(asteroids.length != 0){
        for(let j=0; j<asteroids.length; j++){
            asteroids[j].Update();
            asteroids[j].Rotate(asteroids[j].spin);
            asteroids[j].Draw(j);
        }
    }

    if(keys[13]){
        Render();
    }
    else{
        requestAnimationFrame(Start); 
    }
   
}

function Render(){

    // Keyboard Controls
    ship.movingForward = (keys[87] || keys[38]); 
    ship.movingBackward = (keys[83] || keys[40]); 

    if(keys[68] || keys[39]){ 
        ship.Rotate(1);
    }

    if(keys[65] || keys[37]){ 
        ship.Rotate(-1);
    }

    if(keys[82]){
        location.reload();
    }

    // Canvas Reset
    ctx.clearRect(0,0,canvasWidth, canvasHeight);
    ctx.fillStyle = 'white';
    ctx.font = '21px Arial';
    if(!gameover && lives > 0){
        ctx.fillText('SCORE: ' + score.toString(), 20, 35);
        ctx.fillText('LIVES: ', canvasWidth-200, 35);
    }
    if(lives <= 0){
        ship.visible = false;
        ctx.fillStyle = 'white';
        ctx.fillText('GAME OVER ', canvasWidth / 2 - 120, canvasWidth / 2 - 250);
        ctx.fillText('SCORE: ' + score.toString(), canvasWidth / 2 - 120, canvasWidth / 2 - 175); 

        ctx.fillText("~ ~ ~ Hit the R key to Restart. ~ ~ ~", canvasWidth / 2 - 160, canvasWidth / 2 - 110);
     
        gameover = true;  
        musicToggle = false;
    }

    DrawLives();

    // Collision between ship and asteroids
    if(asteroids.length !== 0){
        for(let k=0; k<asteroids.length; k++){
            if(!gameover && CircleCollision(ship.x, ship.y, ship.radius - 4,
            asteroids[k].x, asteroids[k].y, asteroids[k].collisionRadius)){

                ship.x = canvasWidth / 2;
                ship.y = canvasHeight / 2;
                ship.velX = 0;
                ship.velY = 0;
                if(lives > 0){
                    lives -= 1;
                }
            }
        }
    }

    // Collision between bullets and asteroids
    if(asteroids.length !== 0 && bullets.length !== 0){

    loop1:
        for(let l=0; l<asteroids.length; l++){
            for(let m=0; m<bullets.length; m++){
                if(!gameover && CircleCollision(bullets[m].x, bullets[m].y, 3,
                asteroids[l].x, asteroids[l].y, asteroids[l].collisionRadius)){

                    bullets[m].visible = false;

                    if(asteroids[l].level === 1){
                        score += 5;
                        asteroids.push(new Asteroid(
                            asteroids[l].x - 5,
                            asteroids[l].y - 5,
                            Math.floor(asteroids[l].radius * 0.6),
                            2,
                            Math.floor(asteroids[l].radius * 0.6) - 4)
                        );


                        asteroids.push(new Asteroid(
                            asteroids[l].x + 5,
                            asteroids[l].y + 5,
                            Math.floor(asteroids[l].radius * 0.6),
                            2,
                            Math.floor(asteroids[l].radius * 0.6) - 4)
                        );                        
                    }

                    else if(asteroids[l].level === 2){
                        score += 10;
                        asteroids.push(new Asteroid(
                            asteroids[l].x - 5,
                            asteroids[l].y - 5,
                            Math.floor(asteroids[l].radius * 0.6),
                            3,
                            Math.floor(asteroids[l].radius * 0.6) - 2)
                        );


                        asteroids.push(new Asteroid(
                            asteroids[l].x + 5,
                            asteroids[l].y + 5,
                            Math.floor(asteroids[l].radius * 0.6),
                            3,
                            Math.floor(asteroids[l].radius * 0.6) - 2)
                        );                          
                    }
                    if(asteroids[l].level === 3){
                        score += 20;
                    }
                    asteroids.splice(l,1);
                    bullets.splice(m,1);
                    break loop1;
                }
            }
        }
    }

    if(ship.visible){
        ship.Update();
        ship.Draw();
    }


    if(bullets.length !== 0){
        for(let i=0; i<bullets.length; i++){
            bullets[i].Update();
            bullets[i].Draw();
        }
    }

    if(asteroids.length !== 0){

        let count = 0;
        for(let s=0; s<asteroids.length; s++){
            if((asteroids[s].level == 1) || (asteroids[s].level == 2)){
                count = count + 1;
            }
        }

        if(count < Math.floor(3 + score / 1000)){
            asteroids.push(new Asteroid());
        }

        for(let j=0; j<asteroids.length; j++){
            asteroids[j].Update();
            asteroids[j].Rotate(asteroids[j].spin);
            asteroids[j].Draw(j);
        }
    }

    if(!musicToggle && !gameover){
        musicToggle = true;
    }

    requestAnimationFrame(Render);
}
