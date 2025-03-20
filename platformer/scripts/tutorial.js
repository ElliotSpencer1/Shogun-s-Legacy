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

 
let player, base;
let horizontalmove = false, verticalmove = false, idle = true, dashcooldown = false, shiftmove = false;
let bg1, bg2, bg3, cbs, cts, gm, gs, gsb, mpp, mbl, mbr, mtl, mtr, ogre, rs, slgr, srgl, ogle, sl, exittile, spawntile, acidpool, sidejump, dash, d, gtmb, mesbr, sltb, sltlb, sbmt, slc, acid, acidblock;
// images for the above objects
let bg1i, bg2i, bg3i, cbsi, ctsi, gmi, gsi, gsbi, mppi, mbli, mbri, mtli, mtri, ogrei, rsi, slgri, srgli, oglei, sli, di, gtmbi,mesbri, sltbi, sltlbi, sbmti, slci, acidtilemap, acidblocki, headeri, sidejumpi;
// values
let soundval;
let spritesheet01i, spritesheet01, skillspritei, skillspritetile;
let storytimeout, storybean, storybean2, storybean3, healthbar, healthi, healthinit = false;
let wallcooldown = false;
let superjumpcooldown = false;
let generalcd = false, attack1cd = false, attack2cd = false, attack3cd = false, attack1timeout = false, attack2timeout = false, attack3timeout = false, ran = false, attacking = false;
let maxHearts = 10;
let heartSprites = []; // Array to store heart sprites
let heartsToShow = 10;
let healthcoverer;
let enemy, enemyi, enemyspawntile, enemyattacking = false, moveleft = true, moveright = false;
let coin, coini, coinspawntile;
let coins = 0;
let coinCounter;
let superjumpobject
let star, stari;
let beavo;	
let b;
let doublejumpcooldown = false;
let doublejumpobject;
let bbottom;

function preload(){
  stari = loadImage("spriteassets/star.png"); // Make sure to add this image or use an existing one
  enemyi = loadImage("spriteassets/enemy.png");
  healthi = loadImage("spriteassets/healthbar.png");
  skillspritei = loadImage("spriteassets/skill.png");
  spritesheet01i = loadImage("spriteassets/samurai.png");
  bg1i = loadImage("level1assets/background_layer_1.png");
  bg2i = loadImage("level1assets/background_layer_2.png");
  bg3i = loadImage("level1assets/background_layer_3.png");
  cbsi = loadImage("level1assets/concretebottomsingle.png");
  ctsi = loadImage("level1assets/concretetopsingle.png");
  gsi = loadImage("level1assets/grasssingle.png");
  gmi = loadImage("level1assets/grassmid.png");
  gsbi = loadImage("level1assets/grasssinglebottom.png");
  mppi = loadImage("level1assets/midpillarpart.png");
  mbli = loadImage("level1assets/mudbl.png");
  mbri = loadImage("level1assets/mudbr.png");
  mtli = loadImage("level1assets/mudtl.png");
  mtri = loadImage("level1assets/mudtr.png");
  ogrei = loadImage("level1assets/orangegrassrightedge.png");
  rsi = loadImage("level1assets/rightstone.png");
  slgri = loadImage("level1assets/stoneleftgrassright.png");
  srgli = loadImage("level1assets/stonerightgrassleft.png");
  oglei = loadImage("level1assets/ogle.png");
  sli = loadImage("level1assets/stoneleft.png");
  ssheet2 = loadImage("assets/knight.png");
  di = loadImage("level1assets/dirt.png");
  gtmbi = loadImage("level1assets/grasstopmudbottom.png");
  mesbri = loadImage("level1assets/mudendstonebr.png");
  sltbi = loadImage("level1assets/stonelefttopbottom.png");
  sltlbi = loadImage("level1assets/stonelefttopleftbottom.png")
  sbmti = loadImage("level1assets/stonebottommudtop.png");
  slci = loadImage("level1assets/slc.png");
  acidtilemap = loadImage("level1assets/acidtilemap.png")
  acidblocki = loadImage("level1assets/acidblocki.png");
  headeri = loadImage("level1assets/header.png");
  sidejumpi = loadImage("level1assets/SideJump.png");
}

function enemysetup(){
  enemy = new Group();
  enemy.rotationLock = true;
  enemy.layer = 2;
  enemy.w = 50;
  enemy.h = 50;
  enemy.spriteSheet = enemyi;
  enemy.anis.frameDelay = 6;
  enemy.addAnis({
    idle:{row:0, frames:7},
    stun:{row:1, frames:5},
    attack:{row:2, frames:10},
    death:{row:3, frames:15},
    stun:{row:4, frames: 18},
    walk:{row:5, frames: 8}
  })
  enemy.scale = 0.64;
  enemy.width = 20;
  enemy.height = 30;
  enemy.anis.offset.y = -11.5;
  enemy.bounciness = 0;
  enemy.friction = 5;
  enemy.health = 100;
  // enemy.debug = true;
  enemy.anis.offset.y = 0
}

function playersetup(){
  player = new Sprite(0,0, 68, 68, "d")
  // player.debug = true;
  player.rotationLock = true;
  player.layer = 2
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
  player.scale = 0.5;
  player.width = 14;
  player.height = 20;
  player.anis.offset.y = -11.5;
  player.bounciness = 0;
  player.friction = 5;
  player.health = 100;
}

function setup(){
  createCanvas(windowWidth, windowHeight); 
  
  if(!doublejump){
		doublejump = false;
	}
	else{
		doublejump = true;
	}

  // Setup groups and game objects
  enemysetup();

  setInterval(() => {
    if(!enemyattacking){
      if(moveleft){
        moveright = true;
        moveleft = false;
      }
      else{
        moveright = false;
        moveleft = true;
      }
    }
  }, 3000);

  base = 2;
  world.gravity.y = 9.80665;

  let enemies = new Group();

  beavo = new Group();

  bg1 = new Sprite();
  bg1.img = bg1i;
  bg1.rotationLock = true;
  bg1.collider = "s";
  bg1.scale = 2;
  bg1.w = 1;
  bg1.h = windowHeight;
  bg1.debug = false;
  
  bg2 = new Sprite();
  bg2.img = bg2i;
  bg2.rotationLock = true;
  bg2.collider = "s";
  bg2.scale = 2;
  bg2.w = 1;
  bg2.h = windowHeight;
  bg2.debug = false;

  bg3 = new Sprite();
  bg3.img = bg3i;
  bg3.rotationLock = true;
  bg3.collider = "s";
  bg3.scale = 2;
  bg3.w = 1;
  bg3.h = windowHeight;
  bg3.debug = false;
  bg3.offset.x = -50;

  cbs = new Group();
  cbs.w = 24;
  cbs.h = 24;
  cbs.img = cbsi;
  cbs.tile = 'Z';
  cbs.rotationLock = true;
  cbs.collider = "s";

  cts = new Group();
  cts.w = 24;
  cts.h = 24;
  cts.img = ctsi;
  cts.tile = 'z';
  cts.rotationLock = true;
  cts.collider = "s";

  gm = new Group();
  gm.w = 24;
  gm.h = 24;
  gm.img = gmi;
  gm.tile = 'k';
  gm.rotationLock = true;
  gm.collider = "s";

  acid = new Group();
  acid.w = 24;
  acid.h = 24;
  acid.spriteSheet = acidtilemap;
  acid.addAnis({
    acids: {row:0, frames:4},
  })
  acid.tile = 'a';
  acid.friction = 0;
  acid.rotationLock = true;
  acid.collider = "s";
  acid.layer = 3;

  acidblock = new Group();
  acidblock.w = 24;
  acidblock.h = 24;
  acidblock.collider = "s";
  acidblock.color = "#34AD00";
  acidblock.tile = "I";
  acidblock.img = acidblocki;

  gs = new Group();
  gs.w = 24;
  gs.h = 24;
  gs.img = gsi;
  gs.tile = 'p';
  gs.rotationLock = true;
  gs.collider = "s";

  skillspritetile = new Group();
  skillspritetile.w = 200;
  skillspritetile.h = 200;
  skillspritetile.spriteSheet = skillspritei;
  skillspritetile.addAnis({
    skillthing: {row:0, frames:15},
  })
  skillspritetile.tile = 'S';
  skillspritetile.friction = 0;
  skillspritetile.rotationLock = true;
  skillspritetile.collider = "S";
  skillspritetile.layer = 7;
  skillspritetile.scale = 0.1;
  skillspritetile.w = 20;
  skillspritetile.h = 20;
  // skillspritetile.debug = true;

  // New super jump power-up
  superjumptile = new Group();
  superjumptile.w = 200;
  superjumptile.h = 200;
  superjumptile.spriteSheet = skillspritei;
  superjumptile.addAnis({
    superjumpani: {row:0, frames:15},
  })
  superjumptile.tile = 'J';
  superjumptile.friction = 0;
  superjumptile.rotationLock = true;
  superjumptile.collider = "S";
  superjumptile.layer = 7;
  superjumptile.scale = 0.1;
  superjumptile.w = 20;
  superjumptile.h = 20;

  gsb = new Group();
  gsb.w = 24;
  gsb.h = 24;
  gsb.img = gsbi;
  gsb.tile = 't';
  gsb.rotationLock = true;
  gsb.collider = "s";

  mpp = new Group();
  mpp.w = 24;
  mpp.h = 24;
  mpp.img = gtmbi;
  mpp.tile = 'f';
  mpp.rotationLock = true;
  mpp.collider = "s";

  mbl = new Group();
  mbl.w = 24;
  mbl.h = 24;
  mbl.img = di;
  mbl.tile = 'H';
  mbl.rotationLock = true;
  mbl.collider = "s";

  mbr = new Group();
  mbr.w = 24;
  mbr.h = 24;
  mbr.img = di;
  mbr.tile = 'h';
  mbr.rotationLock = true;
  mbr.collider = "s";

  mtr = new Group();
  mtr.w = 24;
  mtr.h = 24;
  mtr.img = di;
  mtr.tile = 'K';
  mtr.rotationLock = true;
  mtr.collider = "s";

  d = new Group();
  d.w = 24;
  d.h = 24;
  d.img = di;
  d.tile = 't';
  d.rotationLock = true;
  d.collider = "s";

  mtl = new Group();
  mtl.w = 24;
  mtl.h = 24;
  mtl.img = di;
  mtl.tile = 'l';
  mtl.rotationLock = true;
  mtl.collider = "s";	
  
  ogre = new Group();
  ogre.w = 24;
  ogre.h = 24;
  ogre.img = ogrei;
  ogre.tile = 'u';
  ogre.rotationLock = true;
  ogre.collider = "s";	

  ogle = new Group();
  ogle.w = 24;
  ogle.h = 24;
  ogle.img = oglei;
  ogle.tile = 'm';
  ogle.rotationLock = true;
  ogle.collider = "s";

  sl = new Group();
  sl.w = 24;
  sl.h = 24;
  sl.img = sli;
  sl.tile = 'M';
  sl.rotationLock = true;
  sl.collider = "s";

  rs = new Group();
  rs.w = 24;
  rs.h = 24;
  rs.img = rsi;
  rs.tile = 'r';
  rs.rotationLock = true;
  rs.collider = "s";

  slgr = new Group();
  slgr.w = 24;
  slgr.h = 24;
  slgr.img = slgri;
  slgr.tile = 'b';
  slgr.rotationLock = true;
  slgr.collider = "s";

  srgl = new Group();
  srgl.w = 24;
  srgl.h = 24;
  srgl.img = srgli;
  srgl.tile = 'n';
  srgl.rotationLock = true;
  srgl.collider = "s";

  mesbr = new Group();
  mesbr.w = 24;
  mesbr.h = 24;
  mesbr.img = mesbri;
  mesbr.tile = 'O';
  mesbr.rotationLock = true;
  mesbr.collider = "s";

  sltb = new Group();
  sltb.w = 24;
  sltb.h = 24;
  sltb.img = sltbi;
  sltb.tile = 'P';
  sltb.rotationLock = true;
  sltb.collider = "s";

  sltlb = new Group();
  sltlb.w = 24;
  sltlb.h = 24;
  sltlb.img = sltlbi;
  sltlb.tile = 'X';
  sltlb.rotationLock = true;
  sltlb.collider = "s";

  sbmt = new Group();
  sbmt.w = 24;
  sbmt.h = 24;
  sbmt.img = sbmti;
  sbmt.tile = 'T';
  sbmt.rotationLock = true;
  sbmt.collider = "s";

  slc = new Group();
  slc.w = 24;
  slc.h = 24;
  slc.img = slci;
  slc.tile = 'U';
  slc.rotationLock = true;
  slc.collider = "s";

  spawntile = new Group();
  spawntile.w = 24;
  spawntile.h = 24;
  spawntile.tile = 'Y';
  spawntile.rotationLock = true;
  spawntile.visible = false;
  spawntile.collider = "n";

  exittile = new Group();
  exittile.w = 24;
  exittile.h = 24;
  exittile.tile = 'w';
  exittile.rotationLock = true;
  exittile.visible = true;
  exittile.collider = "s";

  sidejump = new Group();
  sidejump.w = 24;
  sidejump.h = 24;
  sidejump.image = sidejumpi;
  sidejump.tile = 'L';
  sidejump.rotationLock = true;
  sidejump.collider = "S";

  superjumpobject = new Group();
  superjumpobject.w = 24;
  superjumpobject.h = 24;
  superjumpobject.tile = 'c';
  superjumpobject.w = 200;
  superjumpobject.h = 200;
  superjumpobject.spriteSheet = skillspritei;
  superjumpobject.addAnis({
    skillthings: {row:0, frames:15},
  })
  superjumpobject.friction = 0;
  superjumpobject.rotationLock = true;
  superjumpobject.collider = "S";
  superjumpobject.layer = 7;
  superjumpobject.scale = 0.1;
  superjumpobject.w = 20;
  superjumpobject.h = 20;

  doublejumpobject = new Group();
  doublejumpobject.w = 24;
  doublejumpobject.h = 24;
  doublejumpobject.tile = "9";
  doublejumpobject.w = 200;
  doublejumpobject.h = 200;
  doublejumpobject.spriteSheet = skillspritei;
  doublejumpobject.addAnis({
    skillthings: {row:0, frames:15},
  })
  doublejumpobject.friction = 0;
  doublejumpobject.rotationLock = true;
  doublejumpobject.collider = "S";
  doublejumpobject.layer = 7;
  doublejumpobject.scale = 0.1;
  doublejumpobject.w = 20;
  doublejumpobject.h = 20;

  enemyspawntile = new Group();
  enemyspawntile.w = 24;
  enemyspawntile.h = 24;
  enemyspawntile.image = sidejumpi;
  enemyspawntile.tile = '/';
  enemyspawntile.rotationLock = false;
  enemyspawntile.collider = "n";
  enemyspawntile.visible = false;

  star = new Group();
  star.w = 240;
  star.h = 240;
  star.img = stari;
  star.scale = 0.05;
  star.tile = '0';
  star.rotationLock = true;
  star.collider = "s";
  star.layer = 3;

  // Extended level with more tactical jumps and challenges
  levelselect = new Tiles(
    [   "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
        "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
        "hhhTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTThhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhr............................................Mhh",
        "hhrY............................/.............wMhh",
        "hhhffffffffffffaaafffffaaafffffffffffffffffffffhhh",
        "hhhhhhhhhhhhhhhIIIhhhhhIIIhhhhhhhhhhhhhhhhhhhhhhhh",
        "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
        "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
        "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
        "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    ],
    0, 0,
    23.9, 23.9
  );  

  playersetup();

  healthbar = new Sprite();
  healthbar.w = 335;
  healthbar.h = 56;
  healthbar.img = healthi;
  healthbar.scale = 0.20;
  healthbar.color = "green";
  healthbar.rotationLock = true;
  healthbar.collider = "s";
  healthbar.layer = "HUD";

  healthcoverer = new Sprite();
  healthcoverer.w = 2;
  healthcoverer.h = 5.5;
  healthcoverer.color = "gray"
  healthcoverer.layer = "HUD";
  healthcoverer.collider = "s";
  healthcoverer.stroke = "gray";
  healthcoverer.visible = false;

  b = new Sprite(-100, -100, 75, 50, "s");
	b.text = "Respawn!"
	b.color = "gray";
	b.textSize = 3;
	b.visible = false;

  for(s of spawntile){
    player.x = s.x;
    player.y = s.y;
  }

  player.overlaps(bg1);
  player.overlaps(bg2);
  player.overlaps(bg3);

  for(a of acid){
    if(a.friction == 0){
      a.changeAni("acids")
      a.friction = 10;
      a.height = 20;
      a.anis.offset.y = -7;
    }
  }

  for (s of skillspritetile) {
    s.changeAni("skillthing"); 
  }

  for (s of superjumpobject) {
    s.changeAni("skillthings"); 
  }

  for (d of doublejumpobject) {
    d.changeAni("skillthings"); 
  }


  for(e of enemyspawntile){
    if(!e.rotationLock){
      let b = new enemy.Sprite();
      b.x = e.x;
      b.y = e.y;
      b.changeAni("idle");
      e.rotationLock = true;
    }
  }
}

function draw() {
  background("black");
  story();
  pausefeature();
  camerastuff();
  movements();
  spritesheetset();
  updateHealthBar();
  enemyfunctionality();
  checkCollisions();
}

function checkCollisions() {
  // Check if player collects coins
  for(let s of star) {
    if(player.overlaps(s)) {
      stars++;
      s.remove();
    }
  }
  
  // Check enemy collisions
  for(let e of enemy) {
    // Player attacking enemy
    if(attacking && player.overlaps(e)) {
      e.health -= 20;
      if(e.health <= 0) {
        e.changeAni("death");
        setTimeout(() => {
          e.remove();
        }, 1000);
      } else {
        e.changeAni("stun");
        setTimeout(() => {
          if(e.alive) e.changeAni("walk");
        }, 500);
      }
    }
    
    // Enemy damages player
    if(player.overlaps(e) && !attacking) {
      player.health -= 5;
      player.changeAni("hit");
    }
  }
}

function enemyfunctionality(){
  for(let e of enemy) {
    // Basic enemy AI
    if(dist(e.x, e.y, player.x, player.y) < 150) {
      // Move toward player if close
      if(e.x < player.x) {
        e.vel.x = 2;
        e.mirror.x = true;
      } else {
        e.vel.x = -2;
        e.mirror.x = false;
      }
      e.changeAni("walk");

      // Attack if very close
      if(dist(e.x, e.y, player.x, player.y) < 40 && !e.attacking) {
        e.changeAni("attack");
        e.attacking = true;
        setTimeout(() => {
          e.attacking = false;
        }, 1000);
      }
    } else {
      // Default patrol behavior
      if(moveleft){
        e.vel.x = -1.5;
        e.mirror.x = false;
      } else if(moveright){
        e.vel.x = 1.5;
        e.mirror.x = true;
      }
      
      if(e.vel.x !== 0) {
        e.changeAni("walk");
      } else {
        e.changeAni("idle");
      }
    }
  }
}

function movements(){
    if(doublejump){
        if((kb.presses("c")) && (!doublejumpcooldown)){
            player.vel.y -= 5;
            doublejumpcooldown = true;
        }
        if(doublejumpcooldown){
            if((player.colliding(mpp)) || (player.colliding(ogle)) || (player.colliding(ogre)) || (player.colliding(cbs)) || (player.colliding(gs)) || (player.colliding(cts)) || (player.colliding(sltb))){
                doublejumpcooldown = false;
            }
        }
    
    }

	if((kb.presses("w")) && ((player.colliding(mpp)) || (player.colliding(ogle)) || (player.colliding(ogre)) || (player.colliding(cbs)) || (player.colliding(gs)) || (player.colliding(cts)) || (player.colliding(sltb)))){
		player.vel.y -= 5;
	}
	if(!wallcooldown){
		if(player.vel.x <= base){
			if(player.vel.x >= base *-1){
				if((kb.pressing("a"))){
					player.vel.x = base * -1;
				}
				if((kb.pressing("d"))){
					player.vel.x = base;
				}
			}
		}
	}

	if(walljump){
		if(!wallcooldown){
			if(kb.pressing("w")){
				if(player.colliding(sidejump) && (player.vel.x < 0)){
					player.vel.x = 4;
					player.vel.y -= 6;
					wallcooldown = true;
					player.mirror = false;
					setTimeout(() => {
						wallcooldown = false;
					}, 200)
				}
				if(player.colliding(sidejump) && (player.vel.x > 0)){
					player.vel.x = -4;
					player.vel.y -= 6;
					wallcooldown = true;
					player.mirror = true;
					setTimeout(() => {
						wallcooldown = false;
					}, 200)
				}
			}
		}
	}

	if((dashmove) && (!dashcooldown)){
		if(kb.presses("e")){
			if(kb.pressing("a")){
				player.vel.x -= 7;
				dashcooldown = true;
				setTimeout(() => {
					dashcooldown = false;
				}, 1000)
			}
			if(kb.pressing("d")){
				player.vel.x += 7;
				dashcooldown = true;
				setTimeout(() => {
					dashcooldown = false;
				}, 1000)
			}
		}
	}

  if((superJump) && (!superjumpcooldown)){
		if(kb.presses("q")){
				player.vel.y -= 10;
				superjumpcooldown = true;
				setTimeout(() => {
					superjumpcooldown = false;
				}, 1000)
		}
	}
}

function spritesheetset(){
	if((!kb.pressing("a")) && (!kb.pressing("w")) && (!kb.pressing("d")) && (!kb.pressing("s")) && !verticalmove){
		idle = true;
	}
	else{
		
	}

	if((kb.pressing("a")) || (kb.pressing("d"))){
		horizontalmove = true;
	}
	else{
		horizontalmove = false;
	}

	if(kb.pressing("w") || (!player.colliding(mpp)) && (!player.colliding(ogle)) && (!player.colliding(ogre)) && (!player.colliding(cbs)) && (!player.colliding(gs)) && (!player.colliding(cts)) && (!player.colliding(sltb))){
		verticalmove = true;
	}
	if((player.colliding(mpp)) || (player.colliding(ogle)) || (player.colliding(ogre)) || (player.colliding(cbs)) || (player.colliding(gs) || (player.colliding(cts)) || (player.colliding(sltb)))){
		verticalmove = false;
	}

	if(mouse.presses()){
		if((!attack1cd) && (!attack2cd) && (!attack3cd) && (!generalcd)){
			attack1cd = true;
			attack1timeout = true;
			generalcd = true;

			setTimeout(() => {
				attack1timeout = false;
			}, 1000)

			setTimeout(() => {
				attack1cd  = false;
			}, 750);

			setTimeout(() => {
				generalcd = false;
			}, 250);
		}
		else if((attack1cd) && (!attack3cd) && (!generalcd)){
			attack2cd = true;
			attack2cd = true;

			attack2timeout = true;
			attack1timeout = true;

			generalcd = true;

			setTimeout(() => {
				generalcd = false;
			}, 250);

			setTimeout(() => {
				attack1cd = false;
			}, 750);

			setTimeout(() => {
				attack2cd = false;
			}, 750);

			setTimeout(() => {
				attack1timeout = false;
			}, 1000)

			setTimeout(() => {
				attack2timeout = false;
			}, 1000)
			

		}
		else if((attack1cd) && (attack2cd) && (!attack3cd) && (!generalcd)){
			generalcd = true;

			attack3cd = true
			attack2cd = true;
			attack1cd = true;

			attack3timeout = true;
			attack2timeout = true;
			attack1timeout = true;

			setTimeout(() => {
				generalcd = false;
			}, 250);

			setTimeout(() => {
				attack3cd = false;
			}, 750);

			setTimeout(() => {
				attack2cd = false;
			}, 750)

			setTimeout(() => {
				attack1cd = false;
			}, 750)

			setTimeout(() => {
				attack3timeout = false;
			}, 1000);

			setTimeout(() => {
				attack2timeout = false;
			}, 1000)

			setTimeout(() => {
				attack1timeout = false;
			}, 1000);
		}
	}

	if(attack1cd && generalcd){
		player.changeAni("attack1");
		console.log("i1")
		attacking = true;
	}
	else if(attack2cd && generalcd){
		player.changeAni("attack2");
		console.log("i2")
		attacking = true;
	}
	else if(attack3cd && generalcd){
		player.changeAni("attack3");
		attacking = true;
		console.log("i3")
	}
	else{
		attacking = false;
	}

	if(!generalcd){
		if(idle){
			player.changeAni("idle");
		}
		if(horizontalmove && !shiftmove){
			if(kb.pressing("d")){
				player.changeAni("moveRight");
				player.mirror.x = false;
			}
			if(kb.pressing("a")){
				player.changeAni("moveRight")
				player.mirror.x = true;
			}
		}
		if(verticalmove){
			if(kb.pressing("d")){
				player.changeAni("jumpright")
				player.mirror.x = false;
			}
			if(kb.pressing("a")){
				player.changeAni("jumpright")
				player.mirror.x = true;
			}
			else{
				player.changeAni("jumpright")
			}
		}
	}
}

function camerastuff(){
    camera.zoom = 5;

	camera.x = player.x;
	camera.y = player.y;

	bg1.x = player.x;
	bg1.y = player.y;

	bg2.x = bg1.x;
	bg2.y = bg1.y;

	bg3.x = bg1.x;
	bg3.y = bg1.y;


}

function story(){
    if(player.y > 3000){
		player.health = 0;
	}
	if(player.overlaps(exittile)){
		// this is the area for assigning local Storage

        localStorage.setItem("tutorialcomplete", true);

		setTimeout(() => {
			window.location.href = "index.html";
		}, 1000)
	}
	for(s of superjumpobject){
		if(!superJump){
			if(player.overlaps(s)){
				storytimeout = true;
				setTimeout(() => {
					storybean2 = new Sprite(player.x, player.y - 60, 80, 40, "s");
					storybean2.image = headeri;
					storybean2.scale = 0.1;
					storybean2.layer = 1;
					storybean2.text = "Ability superjump unlocked! \n  above you are able to superjump,\n (using 'Q').";
					storybean2.textSize = 3;
					superJump = true;
					setTimeout(() => {
						storybean2.remove();
						storytimeout = false;
					}, 10000)
				}, 1000)
				s.remove();
			}
		}
	}
    for(d of doublejumpobject){
		if(!doublejump){
			if(player.overlaps(d)){
				storytimeout = true;
				setTimeout(() => {
					storybean2 = new Sprite(player.x, player.y - 60, 80, 40, "s");
					storybean2.image = headeri;
					storybean2.scale = 0.1;
					storybean2.layer = 1;
					storybean2.text = "Ability doublejump unlocked! \n  you are now able to superjump,\n (using 'C' after jumping).";
					storybean2.textSize = 3;
					doublejump = true;
					setTimeout(() => {
						storybean2.remove();
						storytimeout = false;
					}, 10000)
				}, 1000)
				d.remove();
			}
		}
	}
	for(s of skillspritetile){
		if(player.overlaps(s)){
			storytimeout = true;
			setTimeout(() => {
				storybean = new Sprite(player.x, player.y - 60, 80, 40, "s");
				storybean.image = headeri;
				storybean.scale = 0.1;
				storybean.layer = 1;
				storybean.text = "Ability walljump unlocked! \n On these walls ahead you are,\n now able to walljump (using 'W').";
				storybean.textSize = 3;
				walljump = true;
				setTimeout(() => {
					storybean.remove();
					storytimeout = false; 
				}, 7500)
			}, 1000)
			s.remove();
		}
	}
	for(s of star){
		if(player.overlaps(s)){
			s.remove();
			stars++;
		}
	}
	if(storybean){
		storybean.x = player.x;
		storybean.y = player.y - 40;
	}

	if(storybean2){
		storybean2.x = player.x;
		storybean2.y = player.y - 40;
	}

	for(a of acid){
		if(player.overlapping(a)){
			player.health -= 10;
			player.changeAni("hit")
		}
	}

  if(player.health <= 0){
		player.changeAni("death")
		if(!ran){
			world.timeScale = 0;

			let bean = new Sprite(player.x, player.y, windowWidth/2, windowHeight/2, "s");
			bean.color = "red";
			bean.opacity = 0.5;
			bean.layer = 20000;

			// window.location.href = "level1.html"
			ran = true;

			b.x = player.x;
			b.y = player.y;

			b.layer = 20001;

			b.visible = true;
		}
		if(ran){
			if(b){
				if(b.mouse.hovering()){
					b.color = "red";
					b.textColor = "white";
					mouse.cursor = "pointer";
				}
				if(!b.mouse.hovering()){
					b.color = "gray";
					b.textColor = "black";
					mouse.cursor = "default";
				}

				if(b.mouse.pressed()){
					b.color = "red";
					b.textColor = "white";
					mouse.cursor = "pointer";

					window.location.href = window.location.href;
				}
			}
		}
	}
}

function updateHealthBar() {
    if (!healthbar || !healthcoverer || !player) return; // Prevent undefined errors

    healthbar.x = camera.x - 100;
    healthbar.y = camera.y - 85;

    // Ensure health stays between 0 and 100

    // Calculate the width for the healthcoverer based on missing health
    // This should represent the portion of the bar that is empty
	if((player.health < 100) && (player.health > 0)){
    	healthcoverer.w = 100 - player.health;
	}
    
    // Position the coverer at the right portion of the health bar
    // Starting from where the remaining health ends
    healthcoverer.x = healthbar.x + (player.health / 2) - 17.5;
    healthcoverer.y = healthbar.y;

    // Only show the coverer if health is less than 100%
	if(player.health < 100){
		healthcoverer.visible = true;
	}
}

function pausefeature(){
  // skibiid sigma

let btop;
let bmiddle;

if(bbottom){
  if(bbottom.mouse.hovering()){
    bbottom.color = "green";
    bbottom.textColor = "white";
  }
  else{
    bbottom.color = "yellow";
    bbottom.textColor = "black";
  }

  if(bbottom.mouse.pressed()){
    window.location.href = "hub.html";
  }
}

  if(kb.presses("p")){
      if(world.timeScale == 0){
          // Remove all sprites from the beavo group when paused
          beavo.removeAll();
          world.timeScale = 1;
          console.log("skibidi 1 fired");
      }
      else{
          // Pause the game
          world.timeScale = 0;
          console.log("skibidi 2 fired");

          // Create and add sprites to the beavo group
          b = new beavo.Sprite(player.x, player.y, 50, 50, "s");
          b.color = "beige";
          b.textSize = 3;
          beavo.add(b); // Add to group

          btop = new beavo.Sprite(b.x, b.y - b.h/2, 22.5, 11, "s");
          btop.color = "yellow";
          btop.text = "Stars: " + stars;
          btop.textSize = 3;
          beavo.add(btop); // Add to group

          bmiddle = new beavo.Sprite(b.x, b.y, 40, 25, "s");
          bmiddle.text = "P to unpause";
          bmiddle.color = "yellow";
          bmiddle.textSize = 3;
          beavo.add(bmiddle); // Add to group

          bbottom = new beavo.Sprite(b.x, b.y + b.h/2, 22.5, 11, "s");
          bbottom.color = "yellow";
          bbottom.textSize = 3;
          bbottom.text = "Menu!";
          beavo.add(bbottom); // Add to group
      }
  }
}

