var ground,iground;
var edges;
var Corona,coronaimg;
var doc1img,doc2img,doc
var syr1img,syr2img,syr
var life = 3,score = 0;
var play = 1;
var end = 0;
var gamestate = play;

function preload(){
   doc1img = loadImage("images/doc1.png");
   doc2img = loadImage("images/doc2.png");
   coronaimg = loadImage("images/corona.png");
   syr1img = loadImage("images/syringe1.png")
   syr2img = loadImage("images/syringe2.png")
}

function setup() {
  createCanvas(1200,400);
  ground = createSprite(600,390,width,20);
  iground = createSprite(600,370,width,20);
  

  edges = createEdgeSprites();
  syr = createSprite(600,300,50,50)
  syr.addImage("syrin",syr2img)
  syr.scale=0.5
  doc = createSprite(600,390,50,50);

  doc.addImage("doctor",doc1img)

  doc.scale = 0.42

  iground.visible = false;

  coronaGroup = new Group()

}

function draw() {
  background(236,152,237); 
  fill('red')
  strokeWeight(10);
  text(" your  score " + score,1000,50)
  text(" your remaining life " + life,100,50)
  syr.depth = doc.depth;
  syr.depth = syr.depth+1; 
  if(gamestate === play){
if (keyDown(RIGHT_ARROW)) {
  doc.x = doc.x + 5;
  doc.addImage("doctor",doc1img)
  syr.setCollider("rectangle",168,0,110,80)
  syr.x = syr.x + 5;
  syr.addImage("syrin",syr2img)
  doc.setCollider("rectangle",-100,-160,165,200)
}

if (keyDown(LEFT_ARROW)) {
  doc.x = doc.x - 5;
  doc.addImage("doctor",doc2img)
  syr.setCollider("rectangle",-168,0,-110,-80)
  syr.x = syr.x - 5;
  syr.addImage("syrin",syr1img)
  doc.setCollider("rectangle",100,-160,165,200)

}
doc.bounceOff(edges);
spawncorona();
doc.debug = true;
syr.debug = true;

if(coronaGroup.isTouching(syr)){
  Corona.destroy();
  score = score + 2;
  //score = score + Math.round(getFrameRate()/160);
}
if(coronaGroup.isTouching(doc)){
  life = life - 1;
}
  if(life === 0){
    gamestate = end;
  }

  }
 if(gamestate === end){
   coronaGroup.setVelocityYEach(0);
   doc.velocityX = 0;
   syr.velocityX = 0;
 }
  drawSprites();

}

function spawncorona(){
  if(frameCount % 60 == 0){
    Corona = createSprite(600,100,10,10);
    Corona.addImage("corona",coronaimg)
    Corona.velocityY = 3;
    Corona.x = Math.round(random(20,1000));
    Corona.scale = 0.15
    Corona.depth = doc.depth;
    doc.depth = doc.depth+1
    //Corona.lifetime = 350;
    coronaGroup.add(Corona);
    coronaGroup.setLifetimeEach(80);
  }
}