var sprite
var Background
var rocket
var missile_image

var missileGroup
var invisibleWall1
var invisibleWall2

var space_img
var rocket_img
var enemy_img
var enemyGroup
var score 
var gameEnded

var PLAY
var END
var gameState=PLAY


function preload()
{
	space_img=loadImage("space.jpg");
  rocket_img=loadImage("rocket.png");
  enemy_img=loadImage("spaceshuttel.png");
  missile_image=loadImage("missile2.png")
  gameEnded=loadImage("gameOver.png")
}

function setup() {
	createCanvas(1000, 600);


	//Create the Bodies Here.

var canvas =createCanvas(1000,549)
   Background=createSprite(500,340,2500,2200)
   Background.scale=0.3;
   Background.shapeColor="red";
   Background.velocityY=-2
   Background.addImage(space_img)
   Background.scale=1.2

   rocket=createSprite(500,485,20,20)
   rocket.shapeColor="orange";
   rocket.addImage(rocket_img);
   rocket.scale=0.1
   
   missileGroup=new Group();
   enemyGroup=new Group();

   invisibleWall1=createSprite(120,275,10,548)
   invisibleWall1.shapeColor="black";
   invisibleWall1.visible=false;
   invisibleWall2=createSprite(880,275,10,548)
   invisibleWall2.shapeColor="black"
   invisibleWall2.visible=false;

   score=0

  
}


function draw() {

  background(0);

if(gameState===PLAY){
  if(Background.y<220){
    Background.y=300;

}

if(keyDown("LEFT_ARROW")){
  rocket.velocityX=-3;
  }
  
if(keyDown("RIGHT_ARROW")){
  rocket.velocityX=3;
  }
 
  if(keyDown("UP_ARROW")){
    spawnMissile();
    }

    if(rocket.isTouching(invisibleWall1)){
      rocket.velocityX=3
    }
    
    if(rocket.isTouching(invisibleWall2)){
      rocket.velocityX=-3
    }
   if(enemyGroup.isTouching(missileGroup)){
     console.log("helooooo")
     enemyGroup.destroyEach();
     missileGroup.destroyEach();
     score=score+1;
    }
    spawnEnemies()
  }


     if(enemyGroup.isTouching(rocket))
    {
     gameState===END
     rocket.destroy();
  enemyGroup.destroyEach();
    }
if(gameState===END){
  
  fill("red") 
  text("GAME OVER",400,400)
}
  
   


  
  drawSprites();

  fill("red");
  textSize(20)
  text("Score ="+score,100,150)
 
}

function spawnEnemies(){
  if(frameCount % 100===0){
   var enemy = createSprite(Math.round(random(150,800)),150,30,30);
   enemy.velocityY=2;
   enemy.addImage(enemy_img)
   enemy.scale=0.2;  
   enemy.debug=false
   enemy.setCollider("rectangle",0,0,enemy.width,enemy.height)
   enemyGroup.add(enemy)

  }
 }

 function spawnMissile()
 {
  var missile=createSprite(100,450,20,20)
  missile.x=rocket.x
  missile.velocityY=-4;
  missile.lifetime=220;
  missile.addImage(missile_image)
  missile.scale=0.1
  missileGroup.add(missile);
  return missile;
 }



 