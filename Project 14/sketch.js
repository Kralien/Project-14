//Gamestates.
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Score.
var score = 0;

//Sound.
var sound;
var sound2;
var PLAYSOUND = 1;
var STOPSOUND = 0;
var gameoversoundstate = STOPSOUND;

//Game objects.
var sword, swordImage;
var fruit, fruit1, fruit2, fruit3, fruit4, fruitGroup;
var enemy, alien1, alien2, alienAnimation, enemyGroup;
var gameOver, Gameover;

function preload(){
  
  //Sword/knife assets.
  swordImage = loadAnimation("sword.png");
  gameOver = loadAnimation("gameover.png");
  
  //Other game assets.
  //Fruits.
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  //Enemy.
  alienAnimation = loadAnimation("alien1.png", "alien2.png");
 
}

function setup() {
  //Canvas.
  createCanvas(400, 400);
  
  //Sword/knife.
  sword = createSprite(40, 200, 20, 20);
  sword.addAnimation("sword", swordImage);
  sword.scale = 0.7;
  
  //Gameover.
  Gameover = createSprite(200,200,200,200);
  Gameover.addAnimation("over", gameOver);
  Gameover.scale = 0.7;
  
  sword.setCollider("circle", 0, -10, 40);
  
  //Groups.
  fruitGroup = new Group();
  enemyGroup = new Group();
  
  //Sound.
  sound = loadSound("knifeSwooshSound.mp3");
  sound2 = loadSound("gameover.mp3");
  
}

function draw(){
  
  //Setting up game.
  background("lightblue");
  
  fill("black");
  text("Score: " + score, 310, 30);
  
  if(gameState === PLAY){
    
  //Visibility set.
  sword.visible = true;
  Gameover.visible = false;
    
  //Moving sword with mouse.
  sword.x = World.mouseX;
  sword.y = World.mouseY;
    
  //Spawning game assets.
  spawnFruit();
  spawnEnemy();
    
  //Destroying fruits.
  if(sword.isTouching(fruitGroup)){
    fruitGroup.destroyEach();
    sound.play();
    score = score + 1;
  }
    
  //Losing.
  if(enemyGroup.isTouching(sword)){
    gameState = END;
    gameoversoundstate = PLAYSOUND;
    sound2.play();
    //Gameover.
    sword.visible = false;
    Gameover.visible = true;
  }
     }
  else if(gameState === END){
    //Losing text.
    if(keyDown("r")){
      gameState = PLAY;
      score = 0;
    }
    Losingtext();
    
    //Destroy Groups.
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    
    //Sword location.
    Gameover.x = 200;
    Gameover.y = 200;
  }

  drawSprites();
}

function spawnFruit(){
  
  if(frameCount%80 === 0){
    
  //Create Fruit.
  fruit = createSprite(400, 200, 20, 20);
  fruit.scale = 0.2;
  
  //Fruit type generator.
  r = Math.round(random(1, 4));
  
  switch(r){
    case 1: fruit.addImage(fruit1);
    break;
    case 2: fruit.addImage(fruit2);
    break;
    case 3: fruit.addImage(fruit3);
    break;
    case 4: fruit.addImage(fruit4);
    break;
  }
 
  //Fruit location and speed.
  fruit.y = Math.round(random(50, 350));
    
  fruit.velocityX = -7;
    
  //Fruit lifetime.
  fruit.setLifetime = 100;
    
  //Add fruit to group.
  fruitGroup.add(fruit);
    
  } 
}

function spawnEnemy(){
  if(frameCount%200 === 0){
  
  //Enemy create.
  enemy = createSprite(400, 200, 20, 20);
  enemy.addAnimation("alien", alienAnimation);
    
  //Enemy collider.
  enemy.setCollider("circle", 0, 0, 20);
  
  //Enemy location and speed.
  enemy.y = Math.round(random(100, 300));
    
  enemy.velocityX = -8;
    
  //Enemy lifetime.
  enemy.setLifetime = 50;
    
  //Add enemy to group.
  enemyGroup.add(enemy);
    
  }  
}

function Losingtext(){
    stroke("black");
    fill("black");
    textSize(20);
    text("Press R to restart.", 120, 250);
}
