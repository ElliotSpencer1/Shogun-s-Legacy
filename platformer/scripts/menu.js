if(localStorage.getItem("tutorialcomplete") != null){
	console.log(localStorage.getItem("tutorialcomplete"))
	var tutorialcomplete = localStorage.getItem("tutorialcomplete");
	tutorialcomplete = JSON.parse(tutorialcomplete);
}
else{
  var tutorialcomplete = false;
}
if(localStorage.getItem("dash") != null){
	console.log(localStorage.getItem("dash"))
	var dashmove = localStorage.getItem("dash");
	dashmove = JSON.parse(dashmove);
	console.log(dashmove)
}
else{
  var dashmove = false;
}
if(localStorage.getItem("walljump") != null){
	var walljump = localStorage.getItem("walljump");
	walljump = JSON.parse(walljump);
	console.log(walljump)
}
else{
  var walljump = false;
}
if(localStorage.getItem("stars") != null){
	var stars = localStorage.getItem("stars");
	stars = parseInt(stars);
	console.log(stars)
}
else{
	var stars = 0;
}
if(localStorage.getItem("superJump") != null){
  var superJump = localStorage.getItem("superJump");
  superJump = JSON.parse(superJump);
} 
else{
  var superJump = false;
}
if(localStorage.getItem("doublejump") != null){
  var doublejump = localStorage.getItem("doublejump");
  doublejump = JSON.parse(doublejump);
} 
else{
  var doublejump = false;
}

let titlebar, playbutton, loadbutton, settings, bgoverlay, settingsback, soundplus, soundminus, sounddisplay, cracktexture, sounddisplayclose, instructions;
// images for the above objects
let titlebari, bluebari, bluebarpressedi, backgroundi, settingsbacki, cracktexturei, arli, arri;
// values
let soundval;
let bg1i, bg2i, bg3i, bg1, bg2, bg3;
let di, gtmbi, rsi, sli, levelselect;
let player, base;
let horizontalmove = false, verticalmove = false, idle = true, dashcooldown = false, shiftmove = false;
let spritesheet01i, spritesheet01, skillspritei, skillspritetile;
let storytimeout, storybean, storybean2, healthbar, healthi, healthinit = false;
let wallcooldown = false;
let generalcd = false, attack1cd = false, attack2cd = false, attack3cd = false, attack1timeout = false, attack2timeout = false, attack3timeout = false, ran = false, attacking = false;
let maxHearts = 10;
let heartSprites = []; // Array to store heart sprites
let heartsToShow = 10;
let healthcoverer;
let enemy, enemyi, enemyspawntile, enemyattacking = false, move = true;
let attacktimeout = false, attackcd = false;
let notstarted = true;
let scores;
let settingsopen = false;
let bbottom;
let titlehover, playhover, loadhover, settingshover;
let tilehoveri;


function preload(){

    tilehoveri = loadImage("assets/greenborder.png");
    sli = loadImage("level1assets/stoneleft.png");
    rsi = loadImage("level1assets/rightstone.png");
    spritesheet01i = loadImage("spriteassets/samurai.png");
    gtmbi = loadImage("level1assets/grasstopmudbottom.png");
    di = loadImage("level1assets/dirt.png");
    titlebari = loadImage("assets/buttonLong_grey.png");
    bluebari = loadImage("assets/buttonLong_blue.png");
    bluebarpressedi = loadImage("assets/buttonLong_blue_pressed.png");
    backgroundi = loadImage("assets/panelInset_brown.png")
    settingsbacki = loadImage("assets/panelInset_blue.png");
    cracktexturei = loadImage("assets/cracktexture.png");
    crossi = loadImage("assets/iconCross_beige.png");
    arli = loadImage("assets/arrowBeige_left.png");
    arri = loadImage("assets/arrowBeige_right.png")
    bg1i = loadImage("level1assets/background_layer_1.png")
    bg2i = loadImage("level1assets/background_layer_2.png")
    bg3i = loadImage("level1assets/background_layer_3.png")
    spritesheet01i = loadImage("spriteassets/samurai.png");

}

function playersetup(){
	player = new Sprite(0,0, 68, 68, "d")
	player.rotationLock = true;
	player.layer = 200
	player.spriteSheet = spritesheet01i;
	player.anis.frameDelay = 6;
	player.addAnis({
		attack1:{row:6, frames:6},
		attack2:{row:7, frames:5},
		attack3:{row:8, frames:5},
		hit:{row:1, frames: 4},
    	Rollleft: {row:3, frames:7},
    	Rollright: {row:4, frames:7},
    	moveLeft: {row:1, frames:7},
    	moveRight: {row:4, frames:8},
		jumpright:{row:3, frames:3},
    	death:{row:0, frames:10},
		idle:{row:2, frames:5}
  	})
	player.changeAni("idle")
	// player.scale 
	player.width = 30;
	player.height = 40;
	player.anis.offset.y = -11.5;
	player.bounciness = 0;
	player.friction = 5;
	player.health = 100;

}

function backgroundsetup(){
  bg1 = new Sprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight, "s");
  bg1.img = bg1i;
  bg1.layer = 0;

  bg2 = new Sprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight, "s");
  bg2.img = bg2i;
  bg2.layer = 0;

  bg3 = new Sprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight, "s");
  bg3.img = bg3i;
  bg3.layer = 0;

  let scaleval = windowHeight / 140;

  bg1.scale = scaleval;
  bg2.scale = scaleval;
  bg3.scale = scaleval;

  console.log("ran")
}

function backgroundanimation(){

  sl = new Group();
	sl.w = 24;
	sl.h = 24;
	sl.img = sli;
	sl.tile = 'M';
	sl.rotationLock = true;
	sl.collider = "s";
  sl.scale = 1.5;

	rs = new Group();
	rs.w = 24;
	rs.h = 24;
	rs.img = rsi;
	rs.tile = 'r';
	rs.rotationLock = true;
	rs.collider = "s";
  rs.scale = 1.5;

	mpp = new Group();
	mpp.w = 24;
	mpp.h = 24;
	mpp.img = gtmbi;
	mpp.tile = 'f';
	mpp.rotationLock = true;
	mpp.collider = "s";
  mpp.scale = 1.5;

  mbr = new Group();
	mbr.w = 24;
	mbr.h = 24;
	mbr.img = di;
	mbr.tile = 'h';
	mbr.rotationLock = true;
	mbr.collider = "s";
  mbr.scale = 1.5;

  spawntile = new Group();
	spawntile.w = 24;
	spawntile.h = 24;
	spawntile.tile = 'Y';
	spawntile.rotationLock = true;
	spawntile.visible = false;
	spawntile.collider = "n";
  spawntile.scale = 1.5;

  levelselect = new Tiles(
		[	"........................................................",
			"........................................................",
			"........................................................",
			"........................................................",
			"........................................................",
			"........................................................",
			"........................................................",
			"Y.......................................................",
			"ffffffffffffffffff......................................",
			"hhhhhhhhhhhhhhhhhr......................................",
			"hhhhhhhhhhhhhhhhhr......................................",
			"hhhhhhhhhhhhhhhhhr......................................",
			"hhhhhhhhhhhhhhhhhr......................................",
			"hhhhhhhhhhhhhhhhhr......................................",
			"hhhhhhhhhhhhhhhhhr......................................",
			"hhhhhhhhhhhhhhhhhr......................................",
			"hhhhhhhhhhhhhhhhhr......................................",
			"hhhhhhhhhhhhhhhhhr......................................",
			"hhhhhhhhhhhhhhhhhr......................................",
			"hhhhhhhhhhhhhhhhhr......................................",
			"hhhhhhhhhhhhhhhhhr......................................",
			"hhhhhhhhhhhhhhhhhr...fffffffffffffffffffffffffffffffffff",
			"hhhhhhhhhhhhhhhhhr...Mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
			"hhhhhhhhhhhhhhhhhr...Mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
			"hhhhhhhhhhhhhhhhhr...Mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
			"hhhhhhhhhhhhhhhhhr...Mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      "hhhhhhhhhhhhhhhhhr...Mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      "hhhhhhhhhhhhhhhhhr...Mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      "hhhhhhhhhhhhhhhhhr...Mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      "hhhhhhhhhhhhhhhhhr...Mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      "hhhhhhhhhhhhhhhhhr...Mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      "hhhhhhhhhhhhhhhhhr...Mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      "hhhhhhhhhhhhhhhhhr...Mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
		],
		0, 0,
		35, 35

    
	);  

  for(s of spawntile){
    player.x = s.x;
    player.y = s.y;
}
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  world.gravity.y = 9.812;

  if(!localStorage.getItem("soundval")){
    soundval = 100;
  }
  else{
    soundval = localStorage.getItem("soundval");
  }

  // bgoverlay = new Sprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight, "s");
  // bgoverlay.image = backgroundi;
  // bgoverlay.scale = 
  // bgoverlay.color = "#141414";

  playersetup();
  backgroundsetup();
  backgroundanimation();

  // cracktexture = new Sprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight, "s");
  // cracktexture.image = cracktexturei;
  // cracktexture.scale = (windowHeight/200)

  titlehover = new Sprite(windowWidth/2, windowHeight/10, 200, 50, "s");
  titlehover.color = "lightgreen";
  titlehover.opacity = 1;
  titlehover.image = tilehoveri;
  titlehover.visible = false;
  titlehover.scale = 1.25;

  playhover = new Sprite(windowWidth/2, windowHeight/2 - 100, 200, 50, "s");
  playhover.color = "lightgreen";
  playhover.opacity = 1;
  playhover.image = tilehoveri;
  playhover.visible = false;
  playhover.scale = 1;

  loadhover = new Sprite(windowWidth/2, windowHeight/2, 200, 50, "s");
  loadhover.color = "lightgreen";
  loadhover.opacity = 1;
  loadhover.image = tilehoveri;
  loadhover.visible = false;
  loadhover.scale = 1;
  
  settingshover = new Sprite(windowWidth/2, windowHeight/2 + 100, 200, 50);
  settingshover.color = "lightgreen";
  settingshover.opacity = 1;
  settingshover.image = tilehoveri;
  settingshover.visible = false;
  settingshover.scale = 1;

  titlebar = new Sprite(windowWidth/2, windowHeight/10, 200, 50);
  titlebar.image = (bluebari);
  titlebar.scale = (2);
  titlebar.textFont = "fonts/Marimpa.ttf";
  titlebar.text = "Shogun's Legacy";
  titlebar.textSize = 40;
  titlebar.collider = "s";

  settingsback = new Sprite(windowWidth/2, windowHeight/2, 93, 93);
  settingsback.collider = "n";
  settingsback.image = settingsbacki;
  settingsback.scale = 6;
  settingsback.visible = false;

  instructions = new Sprite(windowWidth/2 + windowWidth/4, windowHeight/2, 400, 400, "s");
  instructions.text = "W to jump \n  \nA to go left \n \nD to go right \n \nIf these moves have been unlocked these are the keybinds: \n \nE & a movement direction to dash \n \nQ to SuperJump \n \n C to double jump or to jump mid air \n \n Left Click to attack \n \n Press P to pause "
  instructions.textSize = 15; 
  instructions.color = "grey";


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
  playbutton.text = "New Game!";
  playbutton.textSize = 40;
  playbutton.collider = "s";

  loadbutton = new Sprite(windowWidth/2, windowHeight/2, 200, 50);
  loadbutton.image = (bluebari);
  loadbutton.scale = (1.5);
  loadbutton.text = "Continue!";
  loadbutton.textSize = 40;
  loadbutton.collider = "s";

  let b1,b2,b3,b4,b5;
  if(dashmove){
    b1 = "unlocked";
  }
  else{
    b1 = "locked";
  }

  if(walljump){
    b2 = "unlocked";
  }
  else{
    b2 = "locked";
  }

  if(superJump){
    b3 = "unlocked";
  }
  else{
    b3 = "locked";
  }

  if(doublejump){
    b4 = "unlocked";
  }
  else{
    b4 = "locked";
  }

  if(tutorialcomplete){
    b5 = "unlocked";
  }
  else{
    b5 = "locked";
  }
  

  scores = new Sprite(windowWidth/2 - windowWidth/3, windowHeight/2 + windowHeight/8, 400, 400, "s"); 
  scores.color = "gray";
  scores.text = "Stars Collected: " + stars + "! \n \n Dash: " + b1 + "! \n \n WallJump: " + b2 + "! \n \n SuperJump: " + b3 + "! \n \n DoubleJump: " + b4 + "! \n \n Tutorial Complete: " + b5 + "!";
  scores.textSize = 17;

  settings = new Sprite(windowWidth/2, windowHeight/2 + 100, 200, 50);
  settings.image = (bluebari);
  settings.scale = (1.5);
  settings.text = "Tutorial!";
  settings.textSize = 40;

  settings.collider = "s";

  console.log("Player:", player);
  console.log("bg1:", bg1);
  console.log("bg2:", bg2);
  console.log("bg3:", bg3);
  console.log("Play Button:", playbutton);
  console.log("Settings:", settings);
  console.log("Load Button:", loadbutton);
  console.log("Sound Display Close:", sounddisplayclose);
  console.log("Sound Minus:", soundminus);
  console.log("Sound Plus:", soundplus);
  console.log("Title Bar:", titlebar);


  if(player){
    player.overlaps(bg1);
    player.overlaps(bg2);
    player.overlaps(bg3);
    player.overlaps(playbutton);
    player.overlaps(settings);
    player.overlaps(loadbutton);
    player.overlaps(sounddisplayclose);
    player.overlaps(soundminus);
    player.overlaps(soundplus);
    player.overlaps(titlebar);
    player.overlaps(instructions);
    player.overlaps(settingsback);
    player.overlaps(scores);
    player.overlaps(settingshover);
    player.overlaps(titlehover);
    player.overlaps(playhover);
    player.overlaps(loadhover);

    settingshover.overlaps(bg1);
    settingshover.overlaps(bg2);
    settingshover.overlaps(bg3);
    settingshover.overlaps(playbutton);
    settingshover.overlaps(settings);
    settingshover.overlaps(loadbutton);
    settingshover.overlaps(sounddisplayclose);
    settingshover.overlaps(soundminus);
    settingshover.overlaps(soundplus);
    settingshover.overlaps(titlebar);
    settingshover.overlaps(instructions);
    settingshover.overlaps(settingsback);
    settingshover.overlaps(scores);
    settingshover.overlaps(titlehover);
    settingshover.overlaps(playhover);
    settingshover.overlaps(loadhover);
    
  }

}

function draw() {
	background("black");

  buttoninteractions();
  playeranimations();
}

function buttoninteractions(){
  if(!settingsopen){

    if(titlebar.mouse.hovering()){
      titlehover.visible = true;
      titlehover.x = titlebar.x;
      titlehover.y = titlebar.y;
      console.log("skibidi fired")
    }
    else{
      titlehover.visible = false;
      console.log("skibidi unfired")
    }

    if(playbutton.mouse.hovering()){
      playhover.visible = true;
      console.log("skibidi fired")
    }
    else{
      playhover.visible = false;
      console.log("skibidi unfired")
    }

    if(loadbutton.mouse.hovering()){
      loadhover.visible = true;
      console.log("skibidi fired")
    }
    else{
      loadhover.visible = false;
      console.log("skibidi unfired")
    }

    if(settings.mouse.hovering()){
      settingshover.visible = true;
      settingshover.x = settings.x;
      settingshover.y = settings.y;
      console.log("skibidi fired")
    }
    else{
      settingshover.visible = false;
      console.log("skibidi unfired")
    }

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
        localStorage.clear();
    }
    if(loadbutton.mouse.pressed()){
        window.location.href = "hub.html";
        localStorage.setItem("soundval", soundval);
    }
    if(settings.mouse.pressed()){
      window.location.href = "tutorial.html";

      localStorage.setItem("soundval", soundval);
        
    }
  }
  else{
    

  }




}

function playeranimations(){
  if (player) {
      if (player.y > windowHeight + 100) {  // If player falls off the map
          for (s of spawntile) {  // Reset position using spawn tile
              player.x = s.x;
              player.y = s.y;
          }
      }
      
      // Move player to the right
      player.vel.x = 4;
      player.changeAni("moveRight");

      // Update camera to follow player
      // camera.x = player.x;
      // camera.y = player.y;
  }
}
