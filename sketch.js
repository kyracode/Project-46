var bg, bgImg;
var ship1, ship1Img;
var ship2, ship2Img;
var satellite;
var star, starImg, star2Img;
var score1 = 0;
var score2 = 0;
var stars, stars2;
var obstacle, obstacles;
var life = 3;
var life2 = 3;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var asteroid, satellite;
var laserImg, laser, laser2;
var gameoverImg, restartImg, winImg;
var gameover, restart, win;

function preload(){
  bgImg = loadImage("space.jpeg");
  ship1Img = loadImage("red spaceship.png");
  ship2Img = loadImage("green.png");
  starImg = loadImage("star2.png");
  star2Img = loadImage("star1.png");
  satellite = loadImage("satellite.png");
  asteroid = loadImage("asteroid.png");
  laserImg = loadImage("laser.png");
  gameoverImg = loadImage("Game_Over.png")
  restartImg = loadImage("restart.png")
  winImg = loadImage("youwin.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(300, 100);
  bg.addImage(bgImg);
  bg.scale = 4.5;
  bg.velocityY = 2.5;

  ship1 = createSprite(windowWidth / 3 - 75, windowHeight - 100)
  ship1.addImage(ship1Img);
  ship1.scale = 0.25;

  ship2 = createSprite(windowWidth / 2 + 250, windowHeight - 100)
  ship2.addImage(ship2Img);
  ship2.scale = 0.22;

  gameover = createSprite(windowWidth / 2, windowHeight / 2);
  gameover.addImage(gameoverImg);
  gameover.visible = false;

  restart = createSprite(windowWidth / 2, 125);
  restart.addImage(restartImg);
  restart.visible = false;

  laser = createSprite(ship1.x, ship1.y);
  laser.visible = false;
  
  laser2 = createSprite(ship2.x, ship2.y);
  laser2.visible = false;

  stars = createGroup();
  stars2 = createGroup();
  obstacles = createGroup();
  obstacles2 = createGroup();
  
  
}

function draw() {
  //trex.debug = true;
  background("lightblue");
  
  if (gameState == PLAY){
    if (bg.y > windowHeight){
      bg.y = windowHeight / 2;
    }
    
    if(keyDown("RIGHT_ARROW")){
    ship2.x = ship2.x + 5;
    }
    
    if(keyDown("LEFT_ARROW")){
      ship2.x = ship2.x - 5;
    }
  
    if(keyDown("UP_ARROW")){
      ship2.y = ship2.y - 5;
    }
  
    if(keyDown("DOWN_ARROW")){
      ship2.y = ship2.y + 5;
    }
  
    if(keyDown("a")){
      ship1.x = ship1.x - 5;
    }
  
    if(keyDown("d")){
      ship1.x = ship1.x + 5;
    }
  
    if(keyDown("w")){
      ship1.y = ship1.y - 5;
    }
  
    if(keyDown("s")){
      ship1.y = ship1.y + 5;
    }

    spawnObstacles();
    spawnObstacles2();
    spawnStar();
    spawnStar2();
    spawnBullets();
    spawnBullets2();
    
    if (ship1.isTouching(stars)){
      score1 = score1 + 50;
      stars.destroyEach();
    }
    
    if (ship2.isTouching(stars)){
      score2 = score2 + 50;
      stars.destroyEach();
    }
  
    if (ship1.isTouching(stars2)){
      score1 = score1 + 50;
      stars2.destroyEach();
    }
    
    if (ship2.isTouching(stars2)){
      score2 = score2 + 50;
      stars2.destroyEach();
    }
  
    if (ship1.isTouching(obstacles)){
      life = life - 1;
      obstacles.destroyEach();
    }
  
    if (ship2.isTouching(obstacles)){
      life2 = life2 - 1;
      obstacles.destroyEach();
    } 

    if (ship1.isTouching(obstacles2)){
      life = life - 1;
      obstacles2.destroyEach();
    }
  
    if (ship2.isTouching(obstacles2)){
      life2 = life2 - 1;
      obstacles2.destroyEach();
    } 

    if (laser.isTouching(obstacles)){
      score1 = score1 + 100;
      obstacles.destroyEach();
    } 

    if (laser.isTouching(obstacles2)){
      score1 = score1 + 100;
      obstacles2.destroyEach();
    } 

    if (laser2.isTouching(obstacles)){
      score2 = score2 + 100;
      obstacles.destroyEach();
    } 

    if (laser2.isTouching(obstacles2)){
      score2 = score2 + 100;
      obstacles2.destroyEach();
    } 

    if (life <= 0 || life2<= 0){
      gameState = END;
    }
  }

  else if (gameState == END){
      bg.velocityY = 0;
      obstacles.setVelocityYEach(0);
      obstacles2.setVelocityYEach(0);
      stars.setVelocityYEach(0);
      stars2.setVelocityYEach(0);
      
      obstacles.setLifetimeEach(-1);
      obstacles2.setLifetimeEach(-1);
      stars.setLifetimeEach(-1);
      stars2.setLifetimeEach(-1);
      
      gameover.visible = true;
      restart.visible = true;

      if (mousePressedOver(restart)){
        gameState = PLAY;
        restart.visible = false;
        gameover.visible = false;
        score1 = 0;
        score2 = 0;
        obstacles.destroyEach();
        obstacles2.destroyEach();
        stars.destroyEach();
        stars2.destroyEach();
      }
  }

  drawSprites();
  textSize(30);
  fill("#dd7efc");
  text("Red Score: " + score1, windowWidth - 280, 100);
  text("Green Score: " + score2, windowWidth - 280, 150);
  text("Red Life: " + life, 30, 100);
  text("Green Life: " + life2, 30, 150);
  
  textSize(13);
  fill("white");
  text("If you hit an obstacle with a laser get 100", 30, 180);
  text("points and if you collect a star you get 50 points.", 30, 200);
}

function spawnStar(){
  if (frameCount % 120 == 0){
    star1 = createSprite(Math.round(random(50, windowWidth - 50)), 0);
    star1.scale = 0.08;
    star1.velocityY = 4;
    var ran = Math.round(random(1, 2));
    console.log(ran);
    if (ran == 1){
      star1.addImage(starImg);
    }
    else{
      star1.addImage(star2Img);
    }
    star1.lifetime = windowHeight / 3;
    stars.add(star1);
  }
}

function spawnStar2(){
  if (frameCount % 120 == 50){
    star2 = createSprite(Math.round(random(50, windowWidth - 50)), 0);
    star2.scale = 0.08;
    star2.velocityY = 4;
    var ran = Math.round(random(1, 2));
    console.log(ran);
    if (ran == 1){
      star2.addImage(starImg);
    }
    else{
      star2.addImage(star2Img);
    }
    star2.lifetime = windowHeight / 3;
    stars2.add(star2);
  }
}

function spawnObstacles(){
  if (frameCount % 120 == 0){
    obstacle = createSprite(Math.round(random(50, windowWidth - 50)), 0);
    obstacle.scale = 0.4;
    obstacle.velocityY = 4.5;
    var ran = Math.round(random(1, 2));
    console.log(ran);
    if (ran == 1){
      obstacle.addImage(asteroid);
    } 
    else{
      obstacle.addImage(satellite);
    }
    obstacle.lifetime = windowHeight / 3;
    obstacles.add(obstacle);
  }
}
function spawnObstacles2(){
  if (frameCount % 130 == 60){
    obstacle = createSprite(Math.round(random(50, windowWidth - 50)), 0);
    obstacle.scale = 0.4;
    obstacle.velocityY = 4.5;
    var ran = Math.round(random(1, 2));
    console.log(ran);
    if (ran == 1){
      obstacle.addImage(asteroid);
    } 
    else{
      obstacle.addImage(satellite);
    }
    obstacle.lifetime = windowHeight / 3;
    obstacles2.add(obstacle);
  }
}

function spawnBullets(){
  if (keyDown("space")){
    laser = createSprite(ship1.x, ship1.y);
    laser.visible = true;
    laser.addImage(laserImg);
    laser.scale = 0.6;
    laser.velocityY = -4;
  }
}

function spawnBullets2(){
  if (keyDown("enter")){
    laser2 = createSprite(ship2.x, ship2.y);
    laser2.visible = true;
    laser2.addImage(laserImg);
    laser2.scale = 0.6;
    laser2.velocityY = -4;
  }
}