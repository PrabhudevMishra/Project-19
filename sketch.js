var bananaImage, bananaGroup;
var obstacleImage, obstacleGroup;
var scene;
var survivalTime;
var invisibleGround;

function preload() {
  backImage = loadImage("jungle.jpg");

  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);

  scene = createSprite(200, 200, 400, 20);
  scene.addImage("background", backImage);
  scene.x = scene.width / 2;
  scene.velocityX = -4;

  monkey = createSprite(50, 350, 20, 20);
  monkey.addAnimation("monkey", player_running);
  monkey.scale = 0.12;

  invisibleGround = createSprite(200, 380, 400, 5);
  invisibleGround.visible = false;

  bananaGroup = new Group();
  obstacleGroup = new Group();

  survivalTime = 0;
  stroke("black");
  textSize(20);
  fill("black");
}

function draw() {
  background(220);

  //survivalTime = Math.ceil(frameCount / getFrameRate());

  if (scene.x < 0) {
    scene.x = scene.width / 2;
    food();
    obstacles();
  }

  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.6;
  monkey.collide(invisibleGround);

  if (obstacleGroup.isTouching(monkey)) {
    obstacleGroup.destroyEach();
    monkey.scale = 0.1;
  }
  
   if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    survivalTime = survivalTime + 2;
  }
  
  switch(survivalTime){
    case 10: monkey.scale = 0.125;
      break;
    case 20: monkey.scale = 0.13;
      break;
    case 30: monkey.scale = 0.135;
      break;
    case 40: monkey.scale = 0.14;
      break;
      default: break;  
      
  }
  
  drawSprites();
  text("Survival Time: " + survivalTime, 100, 50);
}

  function obstacles(){
  if(frameCount % 300 === 0);
  var obstacle = createSprite(400,325,20,20);
  obstacle.y = random(350,370);
  obstacle.addImage("Stone",obstacleImage);
  obstacle.scale = 0.08;
  obstacle.velocityX = -4;
  obstacleGroup.add(obstacle);
}

function food(){
  if(frameCount % 80 === 0);
  var banana = createSprite(400,325,20,20);
  banana.y = random(250,280);
  banana.addImage("Banana",bananaImage);
  banana.scale = 0.04;
  banana.velocityX = -4;
  bananaGroup.add(banana);
}
