var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0,SurvivalTime = 0
var ground
var STOP
function preload(){
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
createCanvas(700,250)
  monkey = createSprite(100,185,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.12;
 // monkey.debug=true
 //monkey.setCollider("rectangle",0,0,10,monkey.hieght)
  ground = createSprite(350,230,700,20)
  
  obstaclesGroup = new Group();
  bananaGroup = new Group();
  
}


function draw() {
background("white")
  
  monkey.collide(ground);
 stroke("black")
  textSize(20)
  fill("orange")
  text("Score: "+score ,604,50)
  
  stroke("brown")
  textSize(20)
  fill("red")
  SurvivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+SurvivalTime ,100,50)
  
  
  console.log(Math.round(getFrameRate()))
  ground.velocityX = -444
  if (ground.x < 0) {
  ground.x = ground.width / 2;
  }
  
  if(obstaclesGroup.isTouching(monkey)){                                                       
    //Banana.visible=false
    bananaGroup.setVelocityEach(0,0)                    
    obstaclesGroup.setVelocityEach(0,0)
    //obstacle.x=-50 
    stroke("green")
  textSize(20)
  fill("blue")   
    text("You Lose",300,100)
   text("if you restart the game then press 'R'",250,130)
    ground.velocityX = 0                                    
  }
     
  if(keyDown("R")){
    bananaGroup.setVelocityEach(-3,0)
    obstaclesGroup.setVelocityEach(-6,0)
    obstacle.x=-50
    ground.velocityX = -444
    Obstacles()
    Banana()
  }
  
  if(bananaGroup.isTouching(monkey)){
    //bananaGroup.destroyEach()
    score = score+0.2
    stroke("black")
    textSize(15)
    fill("orange")
    text("Yammy banana!!",100,145)
  }
  
  if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -17;
      
    }
  //score = score + Math.round(getFrameRate()/60);
  monkey.velocityY = monkey.velocityY + 0.8
  
  Banana();
 Obstacles(); 
 drawSprites(); 
}

function Obstacles() {
  if(frameCount % 300 === 0) {
     obstacle = createSprite(600,195,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6+ 3*score/100);
   // obstacle.debug=true
    //obstaclesGroup.setColliderEach("circle",0,0,40)
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      case 2: obstacle.addImage(obstacleImage);
              break;
      case 3: obstacle.addImage(obstacleImage);
              break;
      case 4: obstacle.addImage(obstacleImage);
              break;
      case 5: obstacle.addImage(obstacleImage);
              break;
      case 6: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
   
  
  }
}

function Banana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
     banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.10;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}




