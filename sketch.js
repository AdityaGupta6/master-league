const Play = 1;
const End = 0;
var serve
var gameState = serve
var enemy
var cammandoImg;
var cammandoImg2;
var hero
var enemyImg1, enemyImg2, enemyImg3;
var enemyGroup;
var bulletGroup;
var bulletImg;
var gameOverImg
var restartImg
var over
var restart
var coinImg
var coin1, coin2, coin3, coin4, coin5, coin6;
var coinGroup1, coinGroup2, coinGroup3, coinGroup4, coinGroup5, coinGroup6
var score = 0;
var sound, sound2, sound3, sound4;
var startImg;
var start
var highScore = 0;
var invisibleSprite;


function preload() {
  bg = loadImage("forest.jpg")
  enemyImg1 = loadAnimation("zombie1.png", "zombie2.png", "zombie3.png", "zombie4.png", "zombie5.png", "zombie6.png")
  enemyImg2 = loadAnimation("zombi1.png", "zombi2.png", "zombi3.png", "zombi4.png")
  enemyImg3 = loadAnimation("zombieblue1.png", "zombieblue2.png", "zombieblue3.png", "zombieblue4.png", "zombieblue5.png", "zombieblue6.png",)

  cammandoImg = loadAnimation("cammando1.png", "cammondo2.png", "cammando3.png", "cammando4.png", "cammando5.png")

  bulletImg = loadImage("bullet.png")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
  coinImg = loadImage("coin.png")
  sound = loadSound("point.wav")
  sound2 = loadSound("Zombie.mp3")
  sound3 = loadSound("shooting.mp3")
  sound4 = loadSound("man.mp3")
  startImg = loadImage("start.png")
}


function setup() {

  createCanvas(800, 400);
  ground = createSprite(400, 200, 800, 400)
  ground.addImage(bg);
  ground.scale = 1.2;
  hero = createSprite(40, 50, 20, 20);
  hero.addAnimation("hero1", cammandoImg);
  
  hero.scale = 0.3
  over = createSprite(400, 190, 10, 10)
  over.addImage(gameOverImg)
  restart = createSprite(400, 290, 10, 10)
  restart.addImage(restartImg)

  enemyGroup = new Group()
  bulletGroup = new Group()
  coinGroup1 = new Group()
  coinGroup2 = new Group()
  coinGroup3 = new Group()
  coinGroup4 = new Group()
  coinGroup5 = new Group()
  coinGroup6 = new Group()
  
  start = createSprite(400, 300, 10, 10)
  start.addImage(startImg);
  start.scale = 0.5;

  invisibleSprite=createSprite(400,370,800,10)
  invisibleSprite.visible=false
}

function draw() {
  background("white")
  if (gameState == serve) {
    over.visible = false
    restart.visible = false
    hero.visible = false
    start.visible = true
    if (mousePressedOver(start)) {
      gameState = Play
    }
    
  }
  else if (gameState === Play) {
    over.visible = false
    restart.visible = false
    hero.visible = true
    start.visible = false
    ground.velocityX = -(4+1*score/1000);
    hero.velocityY=20
    
    hero.collide(invisibleSprite)

    if (ground.x < 350) {
      ground.x = ground.width / 2
    }
    drawCoins()
    drawEnemy()

    if (bulletGroup.isTouching(enemyGroup)) {
      enemyGroup.destroyEach()
      bulletGroup.destroyEach()
      sound2.play()
    }
    if (hero.isTouching(enemyGroup)) {

      
        hero.destroy()
      sound4.play()
      gameState = End;

    }
    if (coinGroup1.isTouching(hero)) {
      coinGroup1.destroyEach()
      score++
      sound.play()
    }
    if (coinGroup2.isTouching(hero)) {
      coinGroup2.destroyEach()
      score++
      sound.play()
    }
    if (coinGroup3.isTouching(hero)) {
      coinGroup3.destroyEach()
      score++
      sound.play()
    }
    if (coinGroup4.isTouching(hero)) {
      coinGroup4.destroyEach()
      score++
      sound.play()
    }
    if (coinGroup5.isTouching(hero)) {
      coinGroup5.destroyEach()
      score++
      sound.play()
    }
    if (coinGroup6.isTouching(hero)) {
      coinGroup6.destroyEach()
      score++
      sound.play()
    }
  }
  else if (gameState === End) {
    score=0
    coinGroup1.setVelocityXEach(0)
    hero.collide(invisibleSprite)

    coinGroup2.setVelocityXEach(0)
    coinGroup3.setVelocityXEach(0)
    coinGroup4.setVelocityXEach(0)
    coinGroup5.setVelocityXEach(0)
    coinGroup6.setVelocityXEach(0)
    ground.velocityX = 0;
    enemyGroup.setVelocityXEach(0)

    enemyGroup.setLifetimeEach(-1);
    gameOver()



  }


  drawSprites();
  textSize(20);
  stroke("red");
  fill("red");
  text("Score : " + score, 50, 50)
}


function drawEnemy() {
  if (frameCount % 100== 0) {
    enemy = createSprite(800, 330, 20, 20);
    rand = Math.round(random(1, 3))
    switch (rand) {
      case 1: enemy.addAnimation("enemy1", enemyImg1);
        break;
      case 2: enemy.addAnimation("enemy2", enemyImg2);
        break;
      case 3: enemy.addAnimation("enemy3", enemyImg3);
        break;

    }
    enemy.scale = 0.7
    enemy.velocityX = -(7+1*score/1000);
   
    enemy.lifetime = 133;
    enemyGroup.add(enemy)
    
  }
}

function keyPressed() {
  if (keyCode == 32) {
    bullet = createSprite(80, 313, 10, 3)
    bullet.addImage(bulletImg)
    bullet.scale = 0.09
    bullet.velocityX = (8+1*score/1000) 
    console.log(bullet.velocityX )
    sound3.play()
    bulletGroup.add(bullet)
  }
  

}

function gameOver() {
  over.visible = true
  restart.visible = true
  if (mousePressedOver(restart)) {
    gameState = Play

    enemyGroup.destroyEach()
    hero = createSprite(40, 300, 20, 20);
    hero.addAnimation("hero1", cammandoImg);
    hero.scale = 0.3
  }


}


function drawCoins() {
  if (frameCount % 140 == 0) {
    coin1 = createSprite(800, 300, 20, 20);
    coin2 = createSprite(820, 300, 20, 20);
    coin3 = createSprite(840, 300, 20, 20);
    coin4 = createSprite(860, 300, 20, 20);
    coin5 = createSprite(880, 300, 20, 20);
    coin6 = createSprite(900, 300, 20, 20);



    coin1.addImage(coinImg)
    coin1.scale = 0.05
    coin1.velocityX = -8;
    coin1.lifetime = 100;
    coin2.addImage(coinImg)
    coin2.scale = 0.05
    coin2.velocityX = -8
    coin2.lifetime = 100;
    coin3.addImage(coinImg)
    coin3.scale = 0.05
    coin3.velocityX = -8;
    coin3.lifetime = 100;
    coin4.addImage(coinImg)
    coin4.scale = 0.05
    coin4.velocityX = -8;
    coin4.lifetime = 100;
    coin5.addImage(coinImg)
    coin5.scale = 0.05
    coin5.velocityX = -8;
    coin5.lifetime = 100;
    coin6.addImage(coinImg)
    coin6.scale = 0.05
    coin6.velocityX = -8;
    coin6.lifetime = 100;


    coinGroup1.add(coin1)
    coinGroup2.add(coin2)
    coinGroup3.add(coin3)
    coinGroup4.add(coin4)
    coinGroup5.add(coin5)
    coinGroup6.add(coin6)
  }


}
