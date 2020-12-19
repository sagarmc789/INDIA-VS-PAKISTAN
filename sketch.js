var PLAY=1

var END=0

var gamestate=1

var back,backgroundImage
var player,playerImage

var bulletImage,bulletGroup

var terroristImage,terroristGroup

var gameover,gameoverImage
   
var edge1,edge2,edge3,edge4

var rip,ripImage

var pistolSound

var victory,victoryImage

var score=0

function preload(){
  playerImage=loadImage("mili.jpeg")

bulletImage=loadImage("bull.jpeg")
bulletGroup=new Group();
  
  terroristImage=loadImage("terr.jpeg")
  terroristGroup=new Group();
  
  backgroundImage=loadImage("road.jpg")
  
  gameoverImage=loadImage("back.jpeg")
  
  ripImage=loadImage("rip.jpeg")
  
  victoryImage=loadImage("vic.png")
  
  pistolSound=loadSound("Pistol Sound Effect.mp3")
}




function setup(){
  createCanvas(600,600)
  
  back=createSprite(300,300,600,600)
  back.addImage(backgroundImage)
  
  player=createSprite(100,300,10,10)
  player.addImage(playerImage)
  player.scale=0.4

  player.setCollider("rectangle",0,0,100,140);
  
  gameover=createSprite(300,300,600,600)
  gameover.visible=false
  
  edge1=createSprite(2,300,2,520)
  edge2=createSprite(300,40,600,2)
  edge3=createSprite(598,300,2,520)
  edge4=createSprite(300,560,600,2)

rip=createSprite(300,300,600,600)
  rip.visible=false
  
  victory=createSprite(300,300,600,600)
  victory.visible=false
}

function draw(){
  
  background("white")
  
  if(gamestate===1){
  
 
    
    if(keyWentDown("space"))
       {
         
        createBullet();

      }
  
    
    if(keyDown("left_arrow")){
      
      player.x=player.x-5
    }
    if(keyDown("right_arrow")){
      
      player.x=player.x+5
    }
    if(keyDown("up_arrow")){
      
      player.y=player.y-5
    }
    if(keyDown("down_arrow")){
      
      player.y=player.y+5
    }
    
    if(score===20){
      back.visible=false
       player.destroy();
    terroristGroup.destroyEach();
    bulletGroup.destroyEach();
      
      background("black")
      
      victory.addImage(victoryImage)
      victory.visible=true
      victory.scale=0.5
    }
    
    player.bounceOff(edge1)
    player.bounceOff(edge2)
    player.bounceOff(edge3)
    player.bounceOff(edge4)
  spawnTerrorist();
  
  if(terroristGroup.isTouching(bulletGroup)){
    terroristGroup.destroyEach();
    bulletGroup.destroyEach();
    score=score+1
  }
  
    if(terroristGroup.isTouching(player)){
    
      player.x=300
      player.y=550
    player.destroy();
    terroristGroup.destroyEach();
    bulletGroup.destroyEach();
      
      rip.addImage(ripImage)
    rip.visible=true
      rip.scale=2.9
    }
  if(terroristGroup.isTouching(edge1)){
    
    player.x=300
    player.y=550
    player.destroy();
    terroristGroup.destroyEach();
    bulletGroup.destroyEach();
    
    gamestate=0
  }
  
  }
  
  if(gamestate===0){
    
    gameover.visible=true
    gameover.addImage(gameoverImage)
    gameover.scale=3.5
  }
  drawSprites();
  
  stroke("cyan")
    fill("cyan")
    textSize(10)
    text("TERRORIST KILLED  =   "+score,player.x-60,player.y-50)
}

function createBullet()
        {
          var bullet=createSprite(480,200,100,100)
          bullet.addImage(bulletImage)
          pistolSound.play();
          bullet.velocityX=10
          bullet.scale=0.1
          bullet.lifetime=300
          bullet.y=player.y+10
          bullet.x=player.x+30
         bulletGroup.add(bullet);
          bullet.depth=player.depth+1
        }
function spawnTerrorist(){
  
  if(frameCount%110===0){
    
    var terrorist = createSprite(600,120,40,10);
    terrorist.y = Math.round(random(50,550));
    terrorist.addImage(terroristImage);
    terrorist.scale = 0.2;
    terrorist.velocityX = -8;
    terrorist.lifetime = 200;
    
    terroristGroup.add(terrorist);
    
    terrorist.depth=rip.depth-1
    
    
    
  }
}