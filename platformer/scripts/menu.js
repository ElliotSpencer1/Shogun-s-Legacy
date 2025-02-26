let titlebar, playbutton, loadbutton, settings, bgoverlay, settingsback, soundplus, soundminus, sounddisplay, cracktexture, sounddisplayclose;
// images for the above objects
let titlebari, bluebari, bluebarpressedi, backgroundi, settingsbacki, cracktexturei, arli, arri;
// values
let soundval;

function preload(){

    titlebari = loadImage("assets/buttonLong_grey.png");
    bluebari = loadImage("assets/buttonLong_blue.png");
    bluebarpressedi = loadImage("assets/buttonLong_blue_pressed.png");
    backgroundi = loadImage("assets/panelInset_brown.png")
    settingsbacki = loadImage("assets/panelInset_blue.png");
    cracktexturei = loadImage("assets/cracktexture.png");
    crossi = loadImage("assets/iconCross_beige.png");
    arli = loadImage("assets/arrowBeige_left.png");
    arri = loadImage("assets/arrowBeige_right.png")

}

function setup(){
  createCanvas(windowWidth, windowHeight);

  if(!localStorage.getItem("soundval")){
    soundval = 100;
  }
  else{
    soundval = localStorage.getItem("soundval");
  }

  bgoverlay = new Sprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight, "s");
  // bgoverlay.image = backgroundi;
  // bgoverlay.scale = 
  bgoverlay.color = "#b5c6e0";

  cracktexture = new Sprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight, "s");
  cracktexture.image = cracktexturei;
  cracktexture.scale = (windowHeight/200)

  titlebar = new Sprite(windowWidth/2, windowHeight/10, 200, 50);
  titlebar.image = (bluebari);
  titlebar.scale = (2);
  titlebar.text = "Unit 15 Game";
  titlebar.textSize = 40;
  titlebar.collider = "s";

  settingsback = new Sprite(windowWidth/2, windowHeight/2, 93, 93);
  settingsback.collider = "n";
  settingsback.image = settingsbacki;
  settingsback.scale = 6;
  settingsback.visible = false;

  soundplus = new Sprite(((windowWidth/2) + settingsback.w/4), windowHeight/2, 25, 25, "n");
  // soundplus.text = "+";
  soundplus.textSize = 40;
  // soundplus.color = "#838796";
  soundplus.image = arri;
  soundplus.scale = 2;
  soundplus.visible = false;

  soundminus = new Sprite(((windowWidth/2) - settingsback.w/4), windowHeight/2, 25, 25, "n");
  // soundminus.text = "-";
  soundminus.textSize = 40;
  // soundminus.color = "#838796";
  soundminus.image = arli;
  soundminus.scale = 2;
  // soundminus.debug = true;
  soundminus.visible = false;

  sounddisplay = new Sprite(windowWidth/2, windowHeight/2, 125, 50, "n");
  sounddisplay.text = "100%";
  sounddisplay.textSize = 40;
  sounddisplay.color = "#838796";
  sounddisplay.visible = false;

  sounddisplayclose = new Sprite(windowWidth/2 + (settingsback.w/2 - 50), windowHeight/2 - (settingsback.h/2 - 50), 16, 15);
  sounddisplayclose.image = crossi;
  sounddisplayclose.collider = "n"
  sounddisplayclose.scale = 2;
  sounddisplayclose.visible = false;

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
      localStorage.setItem("soundval", soundval);
  }
  if(loadbutton.mouse.pressed()){
      window.location.href = "";
      localStorage.setItem("soundval", soundval);
      // localstorage stuff
  }
  if(settings.mouse.pressed()){
      // popup settings menu
      playbutton.visible = false;
      loadbutton.visible = false;
      settings.visible = false;
      playbutton.collider = "n";
      loadbutton.collider = "n";
      settings.collider = "n";

      sounddisplay.visible = true;
      sounddisplay.collider = "s";
      soundplus.visible = true;
      soundplus.collider = "s";
      soundminus.visible = true;
      soundminus.collider = "s";
      settingsback.visible = true;
      settingsback.collider = "s";
      sounddisplayclose.visible = true;
      sounddisplayclose.collider = "s";
  }

  if((soundplus.mouse.pressed()) && (soundval < 200)){
    soundval += 20;
    sounddisplay.text = soundval  + "%";
  }

  if((soundminus.mouse.pressed()) && (soundval > 0)){
    soundval -= 20;
    sounddisplay.text = soundval + "%";
  }

  if(sounddisplayclose.mouse.pressed()){
    sounddisplay.visible = false;
    sounddisplay.collider = "n";
    soundplus.visible = false;
    soundplus.collider = "n";
    soundminus.visible = false;
    soundminus.collider = "n";
    settingsback.visible = false;
    settingsback.collider = "n";
    sounddisplayclose.visible = false;
    sounddisplay.collider = "n";

    playbutton.visible = true;
    loadbutton.visible = true;
    settings.visible = true;
    playbutton.collider = "s";
    loadbutton.collider = "s";
    settings.collider = "s";
  }

}