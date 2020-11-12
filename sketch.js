var monkey, monkey_running, monkey_collided;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_collided = loadAnimation("sprite_1.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 400);

  var survivalTime = 0;

  //creating the monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.1;
  //creating the ground
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background("lightgreen");


  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  if (FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score = score + 1;
  }
  switch(score){
    case 10: monkey.scale=0.12;
            break;
    case 20: monkey.scale= 0.14;
            break;
    case 30: monkey.sclae= 0.16;
            break;
    case 40: monkey.sclae= 0.18;
            break;
            default: break;
 }

  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  obstacles();
  Food();

  drawSprites();


  stroke("white");
  textSize(20);
  fill("white");
  text("Score :" + score, 260, 53);



  if (obstaclesGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.changeAnimation("collided", monkey_collided);
  }


  stroke("black");
  textSize(20);
  survivalTime = Math.ceil(frameCount / frameRate())
  text("survival Time:" + survivalTime, 100, 50);



}

function Food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.velocityX = -5;
    banana.lifetime = 300;
    banana.depth = banana.depth + 1;
    banana.addImage(bananaImage);
    banana.scale = 0.05;

    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 320, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;

    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);


  }
}