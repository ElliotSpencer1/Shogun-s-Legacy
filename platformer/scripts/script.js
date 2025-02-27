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



function preload(){

	mudblocki = loadImage("assets/mudblock.png")
	grassblocki = loadImage("assets/grassblock.png")
	parallaximg = loadImage("assets/parallax image.png");
	outermapcornerimage = loadImage("assets/outermapcorner(2).png");
	outermapimage = loadImage("assets/outermap.png");
	spikesimage = loadImage("assets/spikes.png");
	bgoverlay = loadImage("assets/backgroundoverlay.png");
	// ssheet = loadImage("assets/alienBeige.png");
	stoneblocki = loadImage("assets/stoneimage.png");
	ssheet2 = loadImage("assets/knight.png");

}

function playersetup(){
	player = new Sprite(0,0, 15, 20, "d")
	// player.debug = true;
	player.rotationLock = true;
	// player.scale = 1; \\
	player.layer = 2
	// player.offset.x = 20
	player.spriteSheet = ssheet2;
	player.anis.frameDelay = 6;
	player.addAnis({
    	Rollleft: {row:3, frames:7},
    	Rollright: {row:4, frames:7},
    	moveLeft: {row:1, frames:7},
    	moveRight: {row:2, frames:7},
    	idle:{row:0, frames:4}
  	})
	player.changeAni("idle")
  	// player.scale = 0.7;
	// player.w = 16;
	// player.h = 20;
	// bean = player.addCollider(0, 6,16,20);
	player.bounciness = 0;

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

  	outermap = new Group();
	outermap.img = outermapimage;
	outermap.w = 16;
	outermap.h = 16;
	outermap.tile = 'b';
	outermap.rotationLock = true;
	outermap.collider = "s";

	grass = new Group();
	grass.w = 160;
	grass.h = 160;
	grass.img = grassblocki;
	grass.scale = 0.1;
	grass.tile = 'g';
	grass.rotationLock = true;
	grass.collider = "s";

	stone = new Group();
	stone.w = 160;
	stone.h = 160;
	stone.img = stoneblocki;
	stone.scale = 0.1;
	stone.tile = 'a';
	stone.rotationLock = true;
	stone.collider = "s";

	mudblock = new Group();
	mudblock.w = 160;
	mudblock.h = 160;
	mudblock.img = mudblocki;
	mudblock.scale = 0.1;
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
	outermapcornerTR.diameter = 26;
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
	entry1.collider = "s";

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

	levelselect = new Tiles(
		[	"aa...................................................................aa",
			"aa...................................................................aa",
			"aa...................................................................aa",
			"aa...................................................................aa",
			"aa..................................................................aaa",
			"aaa.................................................................aaa",
			"aaa.................................................................aaa",
			"aaa.................................................................aaa",
			"aaa.................................................................aaa",
			"aaa...........................................................s.....aaa",
			"aaagggggggggggggggggggg...ggggggggggggggggggggggggggggggggggggggggggaaa",
			"aaammmmmmmmmmmmmmmmmmmm...mmmmmmmmammmmmmmmmmmmmmmmmammmmmmmmmmmmmmmaaa",
			"aaammmmmmmmmmammmmmmmmm...mmmmmmmmmmmmmmmmammmmmmmmmmmmmmmmmmammmmmmaaa",
			"aaammmmmmmmmmmmmmmmammm...mmmmmmmmmmmammmmmmmmmmmmmmammmmmmmmmmmmmmmaaa",
			"aaammmmmmmmmmmmmmmmmmmm...mmmmmmmmmmmmmmmmammmmmmmmmmmmmmmmmmmmammmmaaa",
			"bbbbbbbbbbbbbbbbbbbbbbbJ..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbJ..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbJ..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbJ..bbbbbbbbbbz.................xbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbJ..bbbbbbbbbz...................xbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbb...bbbbbbbbz.....................xbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbb...bbbbbbbz.......................bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbb....bbbbbE.........................EEEEEEEEEEEEEE",
			"bbbbbbbbbbbbbbbbbbbbbb...cbbbbbE.........................EEEEEEEEEEEEEE",
			"bbbbbbbbbbbbbbbbbbbbbb...bbbbbbE.........................bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbb...bbbbbbE.........................bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbb...bbbbbbE.........................bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbb..cbbbbbbbbbbbbbbbbbb..............bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbz..bbbbbbbbbbbbbbbbbbz..........cb..oooooooooooooo",
			"bbbbbbbbbbbbbbbbbbbbb...bbbbbbbbz....................bb..oooooooooooooo",
			"bbbbbbbbbbbbbbbbbbbbb...bbbbbbbz...........t.........bb..oooooooooooooo",
			"bbbbbbbbbbbbbbbbbbbbb...bbbbbbb......................bbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbb...bbbbbbb......................xbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbb..jbbbbbbb............cbbZ..........bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbb..jbbbbbbb............bbbb..........bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbb..jbbbbbbb............bbbb..........bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbb......................bbbb..........bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbb......................bbbb..........bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbb......................bbbb..........bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbZ.....................bbbbZ.........bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbZ....cbbZ....bbbbbZ....cbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb....bbbbppppbbbbbb....bbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbUUUUbbbbppppbbbbbbUUUUbbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbUUUUbbbbppppbbbbbbUUUUbbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbUUUUbbbbppppbbbbbbUUUUbbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbUUUUbbbbppppbbbbbbUUUUbbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbUUUUbbbbppppbbbbbbUUUUbbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbEEEEbbbbppppbbbbbbllllbbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbEEEEbbbbppppbbbbbbllllbbbbbbbbbbbbbbbbbb",
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
	if((kb.pressing("a"))){
		player.vel.x = base * -1;
	}
	if((kb.pressing("d"))){
		player.vel.x = base;
	}
	if(kb.pressing("shift")){
		if((kb.pressing("a")) && (!dashcooldown)){
			base = 4;
			dashcooldown = true;
			setTimeout(() => {
				base = 2;
				setTimeout(() => {
					dashcooldown = false;
				}, 500)
			}, 1000)
		}
		if((kb.pressing("d")) && (!dashcooldown)){
			base = 4;
			dashcooldown = true;
			setTimeout(() => {
				base = 2;
				setTimeout(() => {
					dashcooldown = false;
				}, 500)
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
	if(kb.presses("shift")){
		shiftmove = true;
	}
	else{
		setTimeout(() => {
			shiftmove = false;
		}, 1500)
	}


	if(idle){
		player.changeAni("idle");
		console.log("bean7")
	}
	if(horizontalmove && !shiftmove){
		if(kb.pressing("d")){
			player.changeAni("moveRight");
			console.log("bean6")
		}
		if(kb.pressing("a")){
			player.changeAni("moveLeft")
			console.log("bean5")
		}
	}
	if(shiftmove && horizontalmove){
		if(kb.pressing("a")){
			player.changeAni("Rollleft");
		}
		if(kb.pressing("d")){
			player.changeAni("Rollright")
		}
	}
	if(kb.pressing("shift") && kb.pressing("a")){
		player.changeAni("Rollleft")
	}
	if(kb.pressing("d") && kb.pressing("shift")){
		player.changeAni("Rollright")
	}
}

function levelloader(){
	if(player.colliding(entry)){
		window.location.href = "level1.html"
		console.log("fire")
	}
}