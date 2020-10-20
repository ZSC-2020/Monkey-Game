var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var obstacle;
var food;
var survivalTime = 0;
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //make Monkey 
  Monkey=createSprite(50,300,20,20)
  Monkey.addAnimation("monkey", monkey_running)
  Monkey.scale = 0.09
  
  Monkey.debug=true

  //Make ground
 ground=createSprite(200,350,400,20)

ground.x = ground.width /2;
   FoodGroup = new Group();
  obstacleGroup = new Group();
  drawSprites();
}


function draw() {
createCanvas(400,400);

   
  //Making monkey jump
  if(gameState === PLAY){
     fill("black")
  textSize(20)
text("Survival Time:"+  survivalTime, 50,100);
  textSize(10)
  text("Bananas: "+  score, 240,100);
   survivalTime=Math.ceil(frameCount/frameRate())
   
   
if(FoodGroup.isTouching(Monkey)){
      FoodGroup.destroyEach();
      score = score + 1
    }
  //Monkey jump
  if(keyDown("space")&&Monkey.y >= 300){
    Monkey.velocityY=-13;
    
  }
    //Gravity
   Monkey.velocityY = Monkey.velocityY + 0.8
    
    if(obstacleGroup.isTouching(Monkey)){
      gameState=END
    }
    ground.velocityX=-10
    if (ground.x < 10){
      ground.x = ground.width/2;
    }
  else 
    if (gameState === END) {
    Monkey.velocityY=0
      backround(250)
      text("GameOver")
      obstacles();
  spawnFood();
    
   
 } 
  
  Monkey.collide(ground);
 
  
  obstacles();
  spawnFood();
  drawSprites();
}
}


function obstacles(){
    if(frameCount % 80 === 0) {
obstacle = createSprite(300,325,70,80);
    obstacle.debug = true;
    obstacle.velocityX = -14
    
     obstacle.addImage("oi",obstacleImage)
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.09;
    obstacle.lifetime = 1000;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function spawnFood() {
  //write code here to spawn the clouds
  
  if (frameCount % 60 === 0) {
    food = createSprite(200,50,40,10);
    food.y = Math.round(random(200,250));
    console.log(food.y);
    //food.addImage(cloudImage);
    food.scale = 0.08;
    food.velocityX = -3;
    food.addImage(bananaImage)
     //assign lifetime to the variable
    food.lifetime = 200;
 
    
    //add each cloud to the group
    FoodGroup.add(food);
  }
}
  
  