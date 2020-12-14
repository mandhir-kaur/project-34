var dog,happyDog,foodS,foodStock,database;

function preload(){
dogImg=loadImage("images/dog.png");
happyDogImg=loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500,500);
    dog = createSprite(250,350,10,60);
    dog.addImage(dogImg);
    dog.scale=0.2;
    database=firebase.database();
    foodStock = database.ref("food");
    foodStock.on("value", readStock);
    foodStock.set(20);
}


function draw() {  
background("green");
if (foodS!==undefined){
textSize(20);
fill(255);
text("Note:Press UP arrow to feed the Drago milk",50,50);
text("Food remaining:"+foodS,150,150);

if(keyWentDown(UP_ARROW)){
  writeStock(foodStock);
  dog.addImage(happydogImg);
}

if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg)
}

if(foodS===0){
  foodS=200;
}
  drawSprites();
  
}
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
foodS=data.val();
}


