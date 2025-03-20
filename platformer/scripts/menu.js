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
let walljump = false;
let dashmove = false;
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

function preload(){

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

  instructions = new Sprite(windowWidth/2 + windowWidth/4, windowHeight/2, 400, 400, "s");
  instructions.text = "W to jump \n  \nA to go left \n \nD to go right \n \nIf these moves have been unlocked these are the keybinds: \n \nE & a movement direction to dash \n \nQ to SuperJump \n \n C to double jump or to jump mid air \n \n Left Click to attack"
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
  playbutton.text = "Play!";
  playbutton.textSize = 40;
  playbutton.collider = "s";

  loadbutton = new Sprite(windowWidth/2, windowHeight/2, 200, 50);
  loadbutton.image = (bluebari);
  loadbutton.scale = (1.5);
  loadbutton.text = "Continue!";
  loadbutton.textSize = 40;
  loadbutton.collider = "s";

  scores = new Sprite(windowWidth/2 - windowWidth/2, windowHeight/2, 200, 50); 
  scores.scale = (1.5);
  scores.text = " ";
  scores.textSize = 40;
  scores.collider = "s";

  settings = new Sprite(windowWidth/2, windowHeight/2 + 100, 200, 50);
  settings.image = (bluebari);
  settings.scale = (1.5);
  settings.text = "Settings!";
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
  }

}

function draw() {
	background("black");

  buttoninteractions();
  playeranimations();
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
