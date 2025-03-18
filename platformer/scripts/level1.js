let player, base;
let horizontalmove = false, verticalmove = false, idle = true, dashcooldown = false, shiftmove = false;
let bg1, bg2, bg3, cbs, cts, gm, gs, gsb, mpp, mbl, mbr, mtl, mtr, ogre, rs, slgr, srgl, ogle, sl, exittile, spawntile, acidpool, sidejump, dash, d, gtmb, mesbr, sltb, sltlb, sbmt, slc, acid, acidblock;
// images for the above objects
let bg1i, bg2i, bg3i, cbsi, ctsi, gmi, gsi, gsbi, mppi, mbli, mbri, mtli, mtri, ogrei, rsi, slgri, srgli, oglei, sli, di, gtmbi,mesbri, sltbi, sltlbi, sbmti, slci, acidtilemap, acidblocki, headeri, sidejumpi;
// values
let soundval;
let spritesheet01i, spritesheet01, skillspritei, skillspritetile;
let storytimeout, storybean, storybean2, healthbar, healthi, healthinit = false;
let walljump = false;
let dashmove = false;
let wallcooldown = false;
let generalcd = false, attack1cd = false, attack2cd = false, attack3cd = false, attack1timeout = false, attack2timeout = false, attack3timeout = false, ran = false, attacking = false;
let maxHearts = 10;
let heartSprites = []; // Array to store heart sprites
let heartsToShow = 10;

function preload(){

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
  healthi = loadImage("spriteassets/heart.png");

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

	healthbar = new Group();
	healthbar.w = 200;
	healthbar.h = 200;
	healthbar.img = healthi;
	healthbar.scale = 0.025;
	healthbar.w = 5;
	healthbar.h = 5;
	healthbar.rotationLock = true;
	healthbar.collider = "s";

	acid = new Group();
	acid.w = 24;
	acid.h = 24;
	acid.debug = true;
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
	acidblock.img = acidblocki

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
	slgr.tile = 'a';
	slgr.rotationLock = true;
	slgr.collider = "s";

	srgl = new Group();
	srgl.w = 24;
	srgl.h = 24;
	srgl.img = srgli;
	srgl.tile = 'a';
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

	dash = new Group();
	dash.w = 24;
	dash.h = 24;
	dash.tile = 'c';
	dash.w = 200;
	dash.h = 200;
	dash.spriteSheet = skillspritei;
	dash.addAnis({
    	skillthings: {row:0, frames:15},
  	})
	dash.friction = 0;
	dash.rotationLock = true;
	dash.collider = "S";
	dash.layer = 7;
	dash.scale = 0.1;
	dash.w = 20;
	dash.h = 20;

	levelselect = new Tiles(
		[	"........................................",
			"r........................................",
			"r........................................",
			"rw.........................p............c",
			"hffffffffffu....L.......paataff...p...mff",
			"hhHhHhHhHhHr....L....faaKKTTTTO...t...MKl",
			"hKlKlKlKlKlr....L..L.UTTTO........t...MhH",
			"rhHhHhHhHhHr....L..L..............t...MKl",
			"hKlKlKlKlKlr....L..L..............t...MhH",
			"hTTTTTTTTTTO....L..L..............t...MKl",
			"r...............L..L..............t...MhH",
			"r...............L.................MaaaKKl",
			"r...................S.............UTTTKhH",
			"r..................fffaaap...p........MKl",
			"r..................UTTTTTX...t........MhH",
			"r........................Maaataafff...MKl",
			"r........................UTTTTTTTTO..PXhH",
			"r.....................................MKl",
			"r...................................z.MhH",
			"r.......................ffffffffffu.Z.MKl",
			"r......................ffHhHhHhHhHr.Z.MhH",
			"r...................ffffKlKlKlKlKlr.Z.MKl",
			"rY...ffu..mfff...fffhHhHhHhHhHhHhHr.Z.MhH",
			"Kffffflr..MlKfffffKlKlKlKlKlKlKlKlr.Z.MKl",
			"KlKlKllr..MlKlKlKlKlKlKlKlKlKlKlKlr.Z.MKl",
			"KlKlKllr..MlKlKlKlKlKlKlKlKlKlKlKlr.Z.MKl",
			"KlKlKllr..MlKlKlKlKlKlKlKlKlKlKlKlr.Z.MKl",
			"KlKlKllr..MlKlKlKlKlKlKlKlKlKlKlKlr.Z.MKl",
			"KlKlKlllaallKlKlKlKlKlKlKlKlKlKlKlr.Z.MKl",
			"KlKlKlllIIllKlKlKlKlKlKlKlKlKlKlKlr.Z.MKl",
		],
		0, 0,
		23.9, 23.9
	);  

	playersetup();


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

	for (d of dash) {
		d.changeAni("skillthings"); 
	}

}

function draw() {
	background("black");
	story();
  	camerastuff();
  	movements();
  	spritesheetset();
	updateHealthBar();
}

function movements(){

	if((kb.presses("w")) && ((player.colliding(mpp)) || (player.colliding(ogle)) || (player.colliding(ogre)) || (player.colliding(cbs)) || (player.colliding(gs)) || (player.colliding(cts)) || (player.colliding(sltb)))){
		player.vel.y -= 5;
	}
	if(!wallcooldown){
		if(!dashcooldown){
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
				dashcooldown = false;
				setTimeout(() => {
					dashcooldown = true;
				}, 1000)
			}
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

	heartsToShow = Math.floor(player.health / 10); // 1 heart per 10 HP


    // Fix HUD position relative to camera
    // for (h of healthbar) {
	// 	h.x = player.x - 100
	// 	h.y = player.y - 80
	// }

	for (let i = 0; i < heartsToShow - 1; i++) {
		if(healthbar[i]){
			if(i == 0){
				healthbar[i].x = player.x - 150
				healthbar[i].y = player.y - 80
				console.log("bean1")
			}
			else if(healthbar[i]){
				healthbar[i].x = player.x - i * 10;
				healthbar[i].y = player.y - 80;
				console.log("bean")
			}
			console.log(healthbar.length)
		}
    }

}

function story(){
	if(player.overlaps(exittile)){
		// save to local storage
		// maybe play animation
		setTimeout(() => {
			window.location.href = "hub.html"
		}, 1000)
	}
	for(d of dash){
		if(player.overlaps(d)){
			storytimeout = true;
			setTimeout(() => {
				storybean2 = new Sprite(player.x, player.y - 60, 80, 40, "s");
				storybean2.image = headeri;
				storybean2.scale = 0.1;
				storybean2.layer = 1;
				storybean2.text = "Ability dash unlocked! \n  ahead you are able to dash,\n (using 'E').";
				storybean2.textSize = 3;
				dashmove = true;
				setTimeout(() => {
					storybean2.remove();
					storytimeout = false;
				}, 10000)
			}, 1000)
			s.remove();
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
	if(storybean){
		storybean.x = player.x;
		storybean.y = player.y - 40;
	}

	if(storybean2){
		storybean2.x = player.x;
		storybean2.y = player.y - 40;
	}

	for(d of dash){
		if(player.overlaps(d)){
			dashmove = true;
			d.remove();
		}
	}

	for(a of acid){
		if(player.overlapping(a)){
			player.health -= 10;
			player.changeAni("hit")
		}
	}

	if(player.health <= 0){
		if(!ran){
			player.changeAni("death")
			window.location.href = "level1.html"
			ran = true;
		}
	}
}

function updateHealthBar() {
    // Clear all existing heart sprites
    for (let h of healthbar) {
        h.remove();
    }	
    
    // Determine how many hearts should be displayed
    heartsToShow = Math.floor(player.health / 10); // 1 heart per 10 HP

    for (let i = 0; i < heartsToShow - 1; i++) {
        let xOffset = 30 + (i * 25); // Position hearts in a row
        let heart = new healthbar.Sprite();
        heart.x = xOffset;
        heart.y = 30; // Always near the top
        heart.layer = 10; // Ensures HUD is rendered on top
		// console.log(i);
    }
}