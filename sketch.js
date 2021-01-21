//Create variables here
var dog,dogImg,lastFed,fedTime;
var happyDog,database,foodS,foodStock;
var schedule;
var readState,currentTime,gameState;
var bedroom,lazy,garden,deadDog,washroom;
function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bottleImage = loadImage("images/Milk.png");
  bedroom = loadImage("images/bedRoom.png");
  lazy = loadImage("images/lazy.png");
  garden = loadImage("images/Garden.png");
  deadDog = loadImage("images/deadDog.png");
  washroom = loadImage("images/WashRoom.png");
}

function setup() {
  database=firebase.database();
  createCanvas(displayWidth,displayHeight);
  food = new Food();
  

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);


  fedTime  =database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  readState = database.ref('gameStates');
  readState.on("value",function(data){
    gameState=data.val()
  })

  


  dog = createSprite(725,225,20,20);
  dog.addImage(deadDog);
  dog.scale = 0.2;

  
  add  = createButton("Add Food");
  add.position(700,95);
  add.mousePressed(addFood)

  feed=createButton("Feed the dog");
  feed.position(800,95);
  feed.mousePressed(feedDog);
  
  

 
  //console.log(foodStock);
}


function draw() {  
  background(49,138,87)
  currentTime = hour();
  if(currentTime==(lastFed+1)) {
    update("Playing");
    food.garden();
  }
   else if (currentTime==(lastFed+2) ) {
     update("Sleeping");
     food.bedroom();
   }
    else if(currentTime>(lastFed+2)&& currentTime< (lastFed+4)) {
      update("Bathing");
      food.washroom();
    }
    else{
      update("Hungry");
      food.display();
    }
    if(gameState!= "Hungry"){
      
      
      
    }
    else{
      feed.show();
      add.show();
      dog.addImage(lazy)
    }
  
  

  
 
  
  
  //if(foodS>0){
   // updateFoodStock();
    //}

    drawSprites();

}



function readStock(data){
 
  foodS = data.val();
  food.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
    
  })
  
}
function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  
  
} 
function update(state){
  database.ref('/').update({
    gameState:state
  })
}

