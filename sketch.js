var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var gameover
var restart
var fimDeJogo
var reiniciar

var cactus1, cactus2, cactus3, cactus4, cactus5, cactus6, cactus
var score = 0;
var newImage;
var clouds
var obstacles
var PLAY = 1
var END = 0
var gamestate = PLAY
var die
var checkpoint
var jump
var canvas

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameover = loadImage("gameOver.png")
  restart = loadImage("restart.png")
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  die = loadSound("die.mp3")
  checkpoint = loadSound("checkpoint.mp3")
  jump = loadSound("jump.mp3")

}

function setup() {
  //createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(windowWidth, windowHeight);

  fimDeJogo = createSprite(300,50)
  reiniciar = createSprite(280, 100)
fimDeJogo.scale = 0.5
reiniciar.scale = 0.5

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  trex.setCollider("circle", 0, 0, 50)
  
  reiniciar.addImage(restart)
  fimDeJogo.addImage(gameover)

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  obstacles = new Group()
  clouds = new Group()
  
}

function draw() {
  background("white");
  text("pontuação: " + score,500,37)

  trex.collide(invisibleGround);
  if(gamestate == PLAY){
    fimDeJogo.visible = false
    reiniciar.visible = false
    ground.velocityX = -(4 + 3*score / 100);
    score = score + Math.round(getFrameRate() / 30);
    if(keyDown("space") && trex.y>=100||touches.lenght > 0) {
      trex.velocityY = -10;
      jump.play()
    touches = []
    }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds();
    spawnCactus();
    if(obstacles.isTouching(trex)){
      gamestate = END
      die.play()
      //trex.velocityY = -10;
      //jump.play()
      
    }
  if(score % 1000 == 0 && score > 0){
    checkpoint.play()
  }
  }
else if(gamestate == END){
  fimDeJogo.visible = true
  reiniciar.visible = true
  trex.changeAnimation("collided")
  ground.velocityX = 0;
  clouds.setVelocityXEach(0)
  obstacles.setVelocityXEach(0)
  trex.velocityY = 0
  clouds.setLifetimeEach(-1)
  obstacles.setLifetimeEach(-1)
  if(mousePressedOver(reiniciar)||touches.lenght > 0){
    reset()
    touches = []
  }
}
  //gerar as nuvens
  

  drawSprites();
}

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(width,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -(3 + score / 1000);
    cloud.lifetime = cloud.x/cloud.velocityX;

    //ajuste a profundidade
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    clouds.add(cloud)


    }
}
function spawnCactus(){
if (frameCount % 60 == 0){
  cactus = createSprite(width,158);
  cactus.velocityX = -(3 + score / 1000);
  var ramdom = Math.round (random (1,5))
  cactus.scale = 0.7
  cactus.lifetime = cactus.x/cactus.velocityX;
  switch(ramdom){
    case 1: cactus.addImage (cactus1)
    break
    
    case 2: cactus.addImage (cactus2)
    break 
    
    case 3: cactus.addImage (cactus3)
    break
    
    case 4: cactus.addImage (cactus4)
    break
    
    case 5: cactus.addImage (cactus5)
    break
    
    
    default: break

  }
obstacles.add(cactus)
}

}
function reset(){
  gamestate = PLAY
  obstacles.destroyEach()
  clouds.destroyEach()
  score = 0
  trex.changeAnimation("running")
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}