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

let player;
// tilemap properties;
let levelselect, outermap, spikesr, spikesl, outermapcornerTR, outermapcornerTL, outermapcornerBL, outermapcornerBR, placeholder, entry, spawntile, parallax, base, backgroundoverlay, stone;
// preload variables
let outermapimage, spikesimage, outermapcornerimage, parallaximg, bgoverlay, ssheet, grassblocki, mudblocki, stoneblocki, ssheet2, acidblocki;
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
let doublejumpcooldown = false;
let doublejumpobject;
let bbottom;
let acid, acidi;
let healthbar, healthbarcoverer, healthi, healthinit = false;
let b;


function preload(){

	healthi = loadImage("spriteassets/healthbar.png");
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
	acidtilemap = loadImage("level1assets/acidtilemap.png")
	acidblocki = loadImage("level1assets/acidblocki.png");

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
	parallax.layer = 0;

	backgroundoverlay = new Sprite();
	backgroundoverlay.img = bgoverlay;
	backgroundoverlay.rotationLock = true;
	backgroundoverlay.collider = "s";
	backgroundoverlay.scale = 4;
	backgroundoverlay.w = 1;
	backgroundoverlay.h = windowHeight/2;
	backgroundoverlay.debug = false;
	backgroundoverlay.layer = 0;

	sl = new Group();
	sl.w = 24;
	sl.h = 24;
	sl.img = sli;
	sl.tile = '/';
	sl.scale = 1 
	sl.rotationLock = true;
	sl.collider = "s";

	rs = new Group();
	rs.w = 24;
	rs.h = 24;
	rs.img = rsi;
	rs.tile = 'M';
	rs.scale = 1
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
	grass.scale = 1;
	grass.tile = 'g';
	grass.rotationLock = true;
	grass.collider = "s";

	stone = new Group();
	stone.w = 24;
	stone.h = 24;
	stone.img = grassblocki;
	stone.scale = 1;
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

	infrontofentry3 = new Group();
	infrontofentry3.w = 16;
	infrontofentry3.h = 16;
	infrontofentry3.scale = 1;
	infrontofentry3.color = "orange";
	infrontofentry3.tile = '7';
	infrontofentry3.rotationLock = true;
	infrontofentry3.collider = "n";

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

	acidblock = new Group();
	acidblock.w = 24;
	acidblock.h = 24;
	acidblock.collider = "s";
	acidblock.color = "#34AD00";
	acidblock.tile = "I";
	acidblock.img = acidblocki
	acidblock.layer = 2;

	acid = new Group();
	acid.w = 24;
	acid.h = 24;
	acid.spriteSheet = acidtilemap;
	acid.addAnis({
    	acids: {row:0, frames:4},
  	})
	acid.tile = '9';
	acid.friction = 0;
	acid.rotationLock = true;
	acid.collider = "s";
	acid.layer = 3;

	beavo = new Group();

	levelselect = new Tiles(
		[	"aaM............................................./aa",
			"aaM............................................./aa",
			"aaM............................................./aa",
			"aaM............................................./aa",
			"aaM............................................./aa",
			"aaM............................................./aa",
			"aaM............................................./aa",
			"aaM............................................./aa",
			"aaM..........0................................../aa",
			"aaM.......................................s...../aa",
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
			"bbb....bbbbbbbbz.....................xbbbbbbbb",
			"bbb....bbbbbbbz.......................bbbbbb",
			"bbb....bbbbbbz.........................bbbbbb",
			"bbb....bbbbbo..........................bbbbbb",
			"bbb....bbbbbo..........................bbbbbb",
			"bbb....bbbbbo..........................bbbbbb",
			"bbbZ...bbbbbo..........................bbbbbb",
			"bbbb...bbbbbbbbbbbbbbbbbbb..............bbbbb",
			"bbbz...bbbbbbbbbbbbbbbbbbz..........cb..bbbbb",
			"bbb....bbbbbbbbz....................bb..bbbbb",
			"bbb....bbbbbbbz..........t..........bb..bbbbb",
			"bbb....bbbbbbb......................bbbbbbbbb",
			"bbb....bbbbbbb...............0......xbbbbbbbb",
			"bbb...jbbbbbbb..............cbbZ..........bbb",
			"bbz...jbbbbbbb..............bbbb..........bbb",
			"bb....jbbbbbbb..............bbbb..........bbb",
			"bb..........................bbbb..........bbb",
			"bb..........................bbbb..........bbb",
			"bb..........................bbbb..........bbb",
			"bb.................0........bbbbZ.........bbb",
			"bb.......bb......bbbbbZ....bbbbbbbbb7777bbbbb",
			"bbbbb....bb999999bbbbbbppppbbbbbbbbb7777bbbbb",
			"bbbbbUUUUbbIIIIIIbbbbbbppppbbbbbbbbb7777bbbbb",
			"bbbbbUUUUbbIIIIIIbbbbbbppppbbbbbbbbb7777bbbbb",
			"bbbbbUUUUbbIIIIIIbbbbbbppppbbbbbbbbb7777bbbbb",
			"bbbbbUUUUbbIIIIIIbbbbbbppppbbbbbbbbb7777bbbbb",
			"bbbbbUUUUbbIIIIIIbbbbbbppppbbbbbbbbb7777bbbbb",
			"bbbbbEEEEbbbbbbbbbbbbbbrrrrbbbbbbbbbllllbbbbb",
			"bbbbbEEEEbbbbbbbbbbbbbbrrrrbbbbbbbbbllllbbbbb",
		],
		0, 0,
		16, 16
	);  

	playersetup();
	player.overlaps(parallax)
	player.overlaps(backgroundoverlay)

	healthbar = new Sprite();
	healthbar.w = 335;
	healthbar.h = 56;
	healthbar.img = healthi;
	healthbar.scale = 0.20;
	healthbar.color = "green";
	healthbar.rotationLock = true;
	healthbar.collider = "s";
	// healthbar.textSize = 4;
	healthbar.layer = "HUD";
	healthbar.layer = 200;

	for(s of spawntile){
		player.x = s.x;
		player.y = s.y;
	}

	for(p of placeholder){
		backgroundoverlay.x = p.x;
		backgroundoverlay.y = 500;
	}

	for(a of acid){
		if(a.friction == 0){
			a.changeAni("acids")
			a.friction = 10;
			a.height = 20;
			a.anis.offset.y = -7;
		}
	}

	b = new Sprite(-100, -100, 75, 50, "s");
	b.text = "Respawn!"
	b.color = "gray";
	b.textSize = 3;
	b.visible = false;


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
	updateHealthBar();

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

	if(doublejump){
		if((kb.presses("c")) && (!doublejumpcooldown)){
			player.vel.y -= 5;
			doublejumpcooldown = true;
		}
		if(doublejumpcooldown){
			if(((player.colliding(outermap)) || ((player.colliding(outermapcornerBL)) || ((player.colliding(entry)) || (player.colliding(outermapcornerBR)) || (player.colliding(outermapcornerTL)) || (player.colliding(outermapcornerTR)) || (player.colliding(grass)))))){
				doublejumpcooldown = false;
			}
		}
	}

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
	if(player.y > 3000){
		player.health = 0;
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
	if(player.colliding(entry2)){
		window.location.href = "level3.html";

		localStorage.setItem("stars", stars);
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
	  window.location.href = "index.html";
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