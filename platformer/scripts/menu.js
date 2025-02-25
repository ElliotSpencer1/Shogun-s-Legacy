let titlebar, playbutton, loadbutton, settings;
// images for the above objects
let titlebari, bluebari, bluebarpressedi;


function preload(){

    titlebari = loadImage("assets/buttonLong_grey.png");
    bluebari = loadImage("assets/buttonLong_blue.png");
    bluebarpressedi = loadImage("assets/buttonLong_blue_pressed.png");



}

function setup(){
  createCanvas(windowWidth, windowHeight);


  titlebar = new Sprite(windowWidth/2, windowHeight/10, 200, 50);
  titlebar.image = (titlebari);
  titlebar.scale = (2);
  titlebar.text = "Unit 15 Game";
  titlebar.textSize = 40;
  titlebar.collider = "s";

  playbutton = new Sprite(windowWidth/2, windowHeight/2 - 100, 200, 50);
  playbutton.image = (bluebari);
  playbutton.scale = (1.5);
  playbutton.text = "Play!";
  playbutton.textSize = 40;
  playbutton.collider = "s";

  loadbutton = new Sprite(windowWidth/2, windowHeight/2, 200, 50);
  loadbutton.image = (bluebari);
  loadbutton.scale = (1.5);
  loadbutton.text = "Continue!";
  loadbutton.textSize = 40;
  loadbutton.collider = "s";

  settings = new Sprite(windowWidth/2, windowHeight/2 + 100, 200, 50);
  settings.image = (bluebari);
  settings.scale = (1.5);
  settings.text = "Settings!";
  settings.textSize = 40;
  settings.collider = "s";

}

function draw() {
	background("black");

  buttoninteractions()

}

function buttoninteractions(){
  if(playbutton.mouse.pressing()){
    playbutton.image = bluebarpressedi;
  }
  else if(loadbutton.mouse.pressing()){
    loadbutton.image = bluebarpressedi;
  }
  else if(settings.mouse.pressing()){
    settings.image = bluebarpressedi;
  }
  else{
    playbutton.image = bluebari;
    loadbutton.image = bluebari;
    settings.image = bluebari;
  }

  if(playbutton.mouse.pressed()){
      window.location.href = "hub.html";
  }
  if(loadbutton.mouse.pressed()){
      window.location.href = "";
      // localstorage stuff
  }
  if(settings.mouse.pressed()){
      // popup settings menu
  }

}