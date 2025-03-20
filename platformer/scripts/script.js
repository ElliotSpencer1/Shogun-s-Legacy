if(localStorage.getItem("dash") != null){
	console.log(localStorage.getItem("dash"))
	var dashmove = localStorage.getItem("dash");
	dashmove = JSON.parse(dashmove);
	console.log(dashmove)
  }
if(localStorage.getItem("walljump") != null){
	var walljump = localStorage.getItem("walljump");
	walljump = JSON.parse(walljump);
	console.log(walljump)
}
if(localStorage.getItem("stars") != null){
	var stars = localStorage.getItem("stars");
	stars = parseInt(stars);
	console.log(stars)
}
else{
	var walljump = false;
	var dash = false;
	var stars = 0;
}
if(localStorage.getItem("superJump") != null){
	var superJump = localStorage.getItem("superJump");
	superJump = JSON.parse(superJump);
  } 
  else{
	var superJump = false;
  }

let player;
// tilemap properties;
let levelselect, outermap, spikesr, spikesl, outermapcornerTR, outermapcornerTL, outermapcornerBL, outermapcornerBR, placeholder, entry, spawntile, parallax, base, backgroundoverlay, stone;
// preload variables
let outermapimage, spikesimage, outermapcornerimage, parallaximg, bgoverlay, ssheet, grassblocki, mudblocki, stoneblocki, ssheet2;
// assigning booleans
let horizontalmove, verticalmove, idle, dashcooldown, shiftmove;
dashcooldown = false;
shiftmove = false;
let bean;
let spritesheet01i, spritesheet01;
let wallcooldown = false;
let generalcd = false, attack1cd = false, attack2cd = false, attack3cd = false, attack1timeout = false, attack2timeout = false, attack3timeout = false, ran = false, attacking = false;
let maxHearts = 10;
let heartSprites = []; // Array to store heart sprites
let heartsToShow = 10;
let healthcoverer;
let enemy, enemyi, enemyspawntile, enemyattacking = false, move = true, superjumpcooldown = false;;
let attacktimeout = false, attackcd = false;
let star, stari;
let beavo;



function preload(){

	stari = loadImage("spriteassets/star.png")
	mudblocki = loadImage("level1assets/grasstopmudbottom.png");
	grassblocki = loadImage("level1assets/dirt.png");
	parallaximg = loadImage("assets/parallax image.png");
	outermapcornerimage = loadImage("assets/outermapcorner(2).png");
	outermapimage = loadImage("assets/outermap.png");
	spikesimage = loadImage("assets/spikes.png");
	bgoverlay = loadImage("assets/backgroundoverlay.png");
	// ssheet = loadImage("assets/alienBeige.png");
	stoneblocki = loadImage("assets/stoneimage.png");
	ssheet2 = loadImage("assets/knight.png");
	spritesheet01i = loadImage("spriteassets/samurai.png");
	sli = loadImage("level1assets/stoneleft.png");
	rsi = loadImage("level1assets/rightstone.png");

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

}

function setup(){
  createCanvas(windowWidth, windowHeight);

	base = 2;
	world.gravity.y = 9.80665;

	parallax = new Sprite();
	parallax.img = parallaximg;
	parallax.rotationLock = true;
	parallax.collider = "s";
	parallax.scale = 2;
	parallax.w = 1;
	parallax.h = windowHeight;
	parallax.debug = false;

	backgroundoverlay = new Sprite();
	backgroundoverlay.img = bgoverlay;
	backgroundoverlay.rotationLock = true;
	backgroundoverlay.collider = "s";
	backgroundoverlay.scale = 4;
	backgroundoverlay.w = 1;
	backgroundoverlay.h = windowHeight/2;
	backgroundoverlay.debug = false;

	sl = new Group();
	sl.w = 24;
	sl.h = 24;
	sl.img = sli;
	sl.tile = '/';
	sl.scale = 0.6666666666666666667
	sl.rotationLock = true;
	sl.collider = "s";

	rs = new Group();
	rs.w = 24;
	rs.h = 24;
	rs.img = rsi;
	rs.tile = 'M';
	rs.scale = 0.6666666666666666667
	rs.rotationLock = true;
	rs.collider = "s";

  	outermap = new Group();
	outermap.img = outermapimage;
	outermap.w = 16;
	outermap.h = 16;
	outermap.tile = 'b';
	outermap.rotationLock = true;
	outermap.collider = "s";

	grass = new Group();
	grass.w = 24;
	grass.h = 24;
	grass.img = mudblocki;
	grass.scale = 0.66666666666666667;
	grass.tile = 'g';
	grass.rotationLock = true;
	grass.collider = "s";

	stone = new Group();
	stone.w = 24;
	stone.h = 24;
	stone.img = grassblocki;
	stone.scale = 0.66666666666666666666666667;
	stone.tile = 'a';
	stone.rotationLock = true;
	stone.collider = "s";

	mudblock = new Group();
	mudblock.w = 24;
	mudblock.h = 24;
	mudblock.img = grassblocki;
	mudblock.scale = 0.66666666666666667;
	mudblock.tile = 'm';
	mudblock.rotationLock = true;
	mudblock.collider = "s";

	spikesr = new Group();
	spikesr.w = 16;
	spikesr.h = 16;
	spikesr.img = spikesimage;
	spikesr.scale = 0.1;
	spikesr.tile = 'J';
	spikesr.rotation = 90;
	spikesr.rotationLock = true;
	spikesr.collider = "s";

	spikesl = new Group();
	spikesl.w = 16;
	spikesl.h = 16;
	spikesl.img = spikesimage;
	spikesl.scale = 0.1;
	spikesl.tile = 'j';
	spikesl.rotation = 270;
	spikesl.rotationLock = true;
	spikesl.collider = "s";

	outermapcornerTR = new Group();
	outermapcornerTR.w = 16;
	outermapcornerTR.h = 16;
	outermapcornerTR.img = outermapcornerimage;
	outermapcornerTR.scale = 0.5;
	outermapcornerTR.tile = 'Z';
	outermapcornerTR.offset.x = -100
	outermapcornerTR.rotation = 180;
	outermapcornerTR.rotationLock = true;
	outermapcornerTR.collider = "s";

	outermapcornerBL = new Group();
	outermapcornerBL.diameter = 26;
	outermapcornerBL.img = outermapcornerimage;
	outermapcornerBL.scale = 0.5;
	outermapcornerBL.tile = 'c';
	outermapcornerBL.rotation = 90;
	outermapcornerBL.rotationLock = true;
	outermapcornerBL.collider = "s";

	outermapcornerTL = new Group();
	outermapcornerTL.diameter = 26;
	outermapcornerTL.img = outermapcornerimage;
	outermapcornerTL.scale = 0.5;
	outermapcornerTL.tile = 'z';
	outermapcornerTL.rotation = 270;
	outermapcornerTL.rotationLock = true;
	outermapcornerTL.collider = "s";

	outermapcornerBR = new Group();
	outermapcornerBR.diameter = 26;
	outermapcornerBR.img = outermapcornerimage;
	outermapcornerBR.scale = 0.5;
	outermapcornerBR.tile = 'x';
	outermapcornerBR.rotationLock = true;
	outermapcornerBR.collider = "s";

	placeholder = new Group();
	placeholder.w = 16;
	placeholder.h = 16;
	placeholder.scale = 0.1;
	placeholder.tile = 't';
	placeholder.rotationLock = true;
	placeholder.collider = "s";
	placeholder.visible = false;

	infrontofentry = new Group();
	infrontofentry.w = 16;
	infrontofentry.h = 16;
	infrontofentry.scale = 1;
	infrontofentry.color = "cyan"
	infrontofentry.tile = 'U';
	infrontofentry.rotationLock = true;
	infrontofentry.collider = "n";

	entry = new Group();
	entry.w = 16;
	entry.h = 16;
	entry.scale = 1;
	entry.color = "cyan"
	entry.tile = 'E';
	entry.rotationLock = true;
	entry.collider = "s";

	entry1 = new Group();
	entry1.w = 16;
	entry1.h = 16;
	entry1.scale = 1;
	entry1.color = "yellow"
	entry1.tile = 'p';
	entry1.rotationLock = true;
	entry1.collider = "n";

	actualentry = new Group();
	actualentry.w = 16;
	actualentry.h = 16;
	actualentry.scale = 1;
	actualentry.color = "yellow"
	actualentry.tile = 'r';
	actualentry.rotationLock = true;
	actualentry.collider = "s";

	entry2 = new Group();
	entry2.w = 16;
	entry2.h = 16;
	entry2.scale = 1;
	entry2.color = "orange"
	entry2.tile = 'l';
	entry2.rotationLock = true;
	entry2.collider = "s";

	entry3 = new Group();
	entry3.w = 16;
	entry3.h = 16;
	entry3.scale = 1;
	entry3.color = "red"
	entry3.tile = 'o';
	entry3.rotationLock = true;
	entry3.collider = "s";

	spawntile = new Group();
	spawntile.w = 16;
	spawntile.h = 16;
	spawntile.scale = 0.1;
	spawntile.tile = 's';
	spawntile.rotationLock = true;
	spawntile.visible = false;
	spawntile.collider = "n";

	star = new Group();
	star.w = 240;
	star.h = 240;
	star.img = stari;
	star.scale = 0.05;
	star.tile = '0';
	star.rotationLock = true;
	star.collider = "s";
	star.layer = 3;

	beavo = new Group();

	levelselect = new Tiles(
		[	"aM............................................../a",
			"aM............................................../a",
			"aM............................................../a",
			"aM............................................../a",
			"aM............................................../aa",
			"aaM............................................./aa",
			"aaM............................................./aa",
			"aaM............................................./aa",
			"aaM............................................./aa",
			"aaM..........0............................s...../aa",
			"aaM...ggggggggggggggggggggggggggggggggggggggggggaaa",
			"aaM...mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmaaa",
			"aaM...mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmaaa",
			"aaM...mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmaaa",
			"aaM...mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmaaa",
			"bbbJ..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
			"bbbJ..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
			"bbbJ..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
			"bbbJ..bbbbbbbbbbz.................xbbbbbbb",
			"bbbJ..bbbbbbbbbz...................xbbbbbbb",
			"bbbb...bbbbbbbbz.....................xbbbbbbbb",
			"bbbb...bbbbbbbz.......................bbbbbb",
			"bbbb....bbbbbE.........................EEEEEE",
			"bbbb...cbbbbbE.........................EEEEEE",
			"bbbb...bbbbbbE.........................bbbbbb",
			"bbbb...bbbbbbE.........................bbbbbb",
			"bbbb...bbbbbbE.......0.................bbbbbb",
			"bbbb..cbbbbbbbbbbbbbbbbbbb..............bbbbb",
			"bbbbz..bbbbbbbbbbbbbbbbbbz..........cb..ooooo",
			"bbbb...bbbbbbbbz....................bb..ooooo",
			"bbbb...bbbbbbbz...........t.........bb..ooooo",
			"bbbb...bbbbbbb......................bbbbbbbbb",
			"bbbb...bbbbbbb...............0......xbbbbbbbb",
			"bbb...jbbbbbbb..............cbbZ..........bbbbb",
			"bbz...jbbbbbbb..............bbbb..........bbbbb",
			"bb....jbbbbbbb..............bbbb..........bbbbb",
			"bb..........................bbbb..........bbbbb",
			"bb..........................bbbb..........bbbbb",
			"bb..........................bbbb..........bbbbb",
			"bb.................0........bbbbZ.........bbbbb",
			"bb.......cbbZ....bbbbbZ....cbbbbbbbbbbbbbbbbb",
			"bbbbb....bbbbppppbbbbbb....bbbbbbbbbbbbbbbbbb",
			"bbbbbUUUUbbbbppppbbbbbbUUUUbbbbbbbbbbbbbbbbbb",
			"bbbbbUUUUbbbbppppbbbbbbUUUUbbbbbbbbbbbbbbbbbb",
			"bbbbbUUUUbbbbppppbbbbbbUUUUbbbbbbbbbbbbbbbbbb",
			"bbbbbUUUUbbbbppppbbbbbbUUUUbbbbbbbbbbbbbbbbbb",
			"bbbbbUUUUbbbbppppbbbbbbUUUUbbbbbbbbbbbbbbbbbb",
			"bbbbbEEEEbbbbrrrrbbbbbbllllbbbbbbbbbbbbbbbbbb",
			"bbbbbEEEEbbbbrrrrbbbbbbllllbbbbbbbbbbbbbbbbbb",
		],
		0, 0,
		16, 16
	);  

	playersetup();
	player.overlaps(parallax)
	player.overlaps(backgroundoverlay)

	for(s of spawntile){
		player.x = s.x;
		player.y = s.y;
	}

	for(p of placeholder){
		backgroundoverlay.x = p.x;
		backgroundoverlay.y = 500;
	}


	outermap.debug = false;
	outermapcornerTR.debug = false;
	outermapcornerTL.debug = false;
	outermapcornerBL.debug = false;
	outermapcornerBR.debug = false;

}

function draw() {
	background("black");
	movements();
	pausefeature();
	cameradefiner()
	spiketouch();
	parallaxchanger();
	spritesheetset()
	levelloader()

}


function spiketouch(){
	if((player.colliding(spikesl)) || (player.colliding(spikesr))){
		player.vel.x = 0;
		player.vel.y = 0;
		for(s of spawntile){
			player.x = s.x;
			player.y = s.y;
		}
	}
}

function parallaxchanger(){
	parallax.x = player.x;
	parallax.moveTo(player.x, 500 + (player.y - player.y/2), 1)
}

function cameradefiner(){
	camera.x = player.x;
	camera.y = player.y;

	camera.zoom = 6; // maybe change camera to be in the area like box? make it slide but only to an extent so the camera cannot go past walls.

}

function movements(){

	if((kb.presses("w")) && ((player.colliding(outermap)) || ((player.colliding(outermapcornerBL)) || ((player.colliding(entry)) || (player.colliding(outermapcornerBR)) || (player.colliding(outermapcornerTL)) || (player.colliding(outermapcornerTR)) || (player.colliding(grass)))))){
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
	for(s of star){
		if(player.overlaps(s)){
			s.remove();
			stars++;
		}
	}

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
 
	if((kb.pressing("w")) || (((!player.colliding(outermap)) && ((!player.colliding(outermapcornerBL)) && ((!player.colliding(entry)) && (!player.colliding(outermapcornerBR)) && (!player.colliding(outermapcornerTL)) && (!player.colliding(outermapcornerTR)) && (!player.colliding(grass))))))){
		verticalmove = true;
	}
	if(((player.colliding(outermap)) || ((player.colliding(outermapcornerBL)) || ((player.colliding(entry)) || (player.colliding(outermapcornerBR)) || (player.colliding(outermapcornerTL)) || (player.colliding(outermapcornerTR)) || (player.colliding(grass)))))){
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

function levelloader(){
	if(player.colliding(entry)){
		window.location.href = "level1.html";
		console.log("fire");

		// set coin count
		localStorage.setItem("stars", stars);
	}

	if(player.colliding(actualentry)){
		window.location.href = "level2.html";

		// set coin count
		localStorage.setItem("stars", stars);
	}
}

function pausefeature(){
	// skibiid sigma
  
  let btop;
  let bmiddle;
  let bbottom;

  
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
		}
	}
  }