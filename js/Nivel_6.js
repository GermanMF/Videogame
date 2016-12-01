//Variables globales
var juego = new Phaser.Game("100%","100%", Phaser.CANVAS, 'primerJuego',{ preload:preload, create:create, update:update, resize:resize });

//Variables de escenario
var fondo, piso, bola, boton, puntuacion, poder, contador=0, Estado, sucio;

//Variables personaje
var barra, controles, sucio1,sucio2,sucio3,sucio4,sucio5,sucio6;

//Variables enemigos
var S1=true,S2=true,S3=true,S4=true,S5=true,S6=true;
var ataque1,ataque2,ataque3,ataque4,ataque5,ataque6;
var c1=30;c2=30;c3=30;c4=30;c5=30;c6=30;

//Variable score
var score = 0;

//Variable de escala
var escala=1;

//Variables para control de juego
var Inicio = false;
var width = document.body.offsetWidth;
var height = document.body.offsetHeight;


function preload()
{
	juego.load.image("fondo","assets/fondo10.jpg",800,600);
	juego.load.image("piso","assets/barq2.png",190,29);
	juego.load.image("boton","assets/start-button.png",104,58);
	juego.load.spritesheet("bola", "assets/pastel.png",30,20);
	juego.load.image("barra","assets/heladoh.png",100,20);
	juego.load.image("poder","assets/diamond.png",32,28);
	juego.load.spritesheet("sucio","assets/sucio.png",80,80);
	juego.load.image("bs","assets/cuack.png",32,32);
	juego.load.image("bs1","assets/cuack2.png",32,32);
}

function FullScreen () {
	//juego.stage.backgroundColor = "#000000"
	juego.scale.pageAlignHorizontally = true;
	juego.scale.pageAlignVertically = true;
	juego.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	juego.scale.setScreenSize(true);
}

function create()
{
	juego.physics.startSystem(Phaser.Physics.ARCADE);
	juego.physics.arcade.checkCollision.down = false;
	juego.add.sprite("0","0","fondo");

	//Full Screen Yeah lml from hell 666
	FullScreen();

	//Fondo
	fondo = juego.add.group();
	fondo.enableBody = true;
	var fondiqui = fondo.create(1775,0,"fondo");
	fondiqui.scale.setTo(2,2);

	piso = juego.add.sprite(juego.width/2, juego.height-50, "piso");
	bola = juego.add.sprite(juego.width/2, juego.height-150,"bola");

	controles = juego.input.keyboard.createCursorKeys();

	//Fisicas del piso
	juego.physics.arcade.enable(piso);
	piso.body.collideWorldBounds = true;
	piso.body.immovable = true;
	piso.body.bounce.set(1);

	//Fisicas de la bola
	bola.checkWorldBounds = true;
	juego.physics.arcade.enable(bola);
	bola.body.collideWorldBounds = true;

	//Gravedad bola
	bola.body.bounce.set(1);
	bola.body.velocity.y = 300;
	bola.body.velocity.x = 200;
	bola.events.onOutOfBounds.add(bola_perdida, this);

	barra = juego.add.group();
	barra.enableBody = true;
	barra.physicsBodyType = Phaser.Physics.ARCADE;
//	poder = juego.add.group();
//	barrap = juego.add.group();
		//
		var barras = barra.create(30, 100 ,"barra");		
		contador++ ;
		barras.body.bounce.set(1);
		barras.body.immovable = true;
		juego.physics.arcade.enable(barras);

		//*
		var barras = barra.create(width-130, height/2,"barra");		
		contador++ ;
		barras.body.bounce.set(1);
		barras.body.immovable = true;
		juego.physics.arcade.enable(barras);

		//-
		var barras = barra.create(30, height/2,"barra");		
		contador++ ;
		barras.body.bounce.set(1);
		barras.body.immovable = true;
		juego.physics.arcade.enable(barras);

		//*-
		var barras = barra.create(width-130, 100,"barra");		
		contador++ ;
		barras.body.bounce.set(1);
		barras.body.immovable = true;
		juego.physics.arcade.enable(barras);

		//**
		var barras = barra.create(2*width/3-100, height/2-100,"barra");		
		contador++ ;
		barras.body.bounce.set(1);
		barras.body.immovable = true;
		juego.physics.arcade.enable(barras);

		//
		var barras = barra.create(width/3, height/2-100,"barra");		
		contador++ ;
		barras.body.bounce.set(1);
		barras.body.immovable = true;
		juego.physics.arcade.enable(barras);


		//Sucio #1
		sucio = juego.add.sprite(50,10,"sucio");
		sucio.animations.add("normal",[0],10,false);
		sucio.animations.play("normal");
		juego.physics.arcade.enable(sucio);
		sucio.body.gravity.y = 500;
		sucio.body.bounce.y=.5;

		//Sucio #2
		sucio1 = juego.add.sprite(width-120,10,"sucio");
		sucio1.animations.add("normal",[1],10,false);
		sucio1.animations.play("normal");
		juego.physics.arcade.enable(sucio1);
		sucio1.body.gravity.y = 500;
		sucio1.body.bounce.y=.5;

		//Sucio #3
		sucio2 = juego.add.sprite(50,230,"sucio");
		sucio2.animations.add("normal",[0],10,false);
		sucio2.animations.play("normal");
		juego.physics.arcade.enable(sucio2);
		sucio2.body.gravity.y = 500;
		sucio2.body.bounce.y=.5;

		//Sucio #4
		sucio3 = juego.add.sprite(width-120,230,"sucio");
		sucio3.animations.add("normal",[1],10,false);
		sucio3.animations.play("normal");
		juego.physics.arcade.enable(sucio3);
		sucio3.body.gravity.y = 500;
		sucio3.body.bounce.y=.5;

		//Sucio #5
		sucio4 = juego.add.sprite(2*width/3-80,110,"sucio");
		sucio4.animations.add("normal",[1],10,false);
		sucio4.animations.play("normal");
		juego.physics.arcade.enable(sucio4);
		sucio4.body.gravity.y = 500;
		sucio4.body.bounce.y=.5;

		//Sucio #6
		sucio5 = juego.add.sprite(width/3+20,120,"sucio");
		sucio5.animations.add("normal",[0],10,false);
		sucio5.animations.play("normal");
		juego.physics.arcade.enable(sucio5);
		sucio5.body.gravity.y = 500;
		sucio5.body.bounce.y=.5;


	//Puntaje
	puntuacion = juego.add.text(10, 50,"Score: 0",{fontSize: "32px", fill: "#000"});
	puntuacion.anchor.y = 1;
	//puntuacion.anchor.x = 1;

	resize;
}

function barras_fisicas (barras) {
	var barras = barra.create(100+(j*110), 100+(i*30),"barra");		
	contador++ ;
	barras.body.bounce.set(1);
	barras.body.immovable = true;
	juego.physics.arcade.enable(barras);
}

function resize () {
	if(juego.width <= width/3){
		escala = (1/3);
		barra.scale.x = .35;
		barra.scale.y = .35;
		piso.scale.x=.35;
		piso.scale.y=.35;
		bola.scale.x=.35;
		bola.scale.y=.35;
	}
	else if(juego.width <= (2*width)/5){
		escala = (2/5);
		barra.scale.x = .4;
		barra.scale.y = .4;
		piso.scale.x=.4;
		piso.scale.y=.4;
		bola.scale.x=.4;
		bola.scale.y=.4;	
	}
	else if(juego.width <= (width)/2){
		escala = .5;
		barra.scale.x = .5;
		barra.scale.y = .5;
		piso.scale.x=.5;
		piso.scale.y=.5;
		bola.scale.x=.5;
		bola.scale.y=.5;
	}	
	else if(juego.width <= (3*width)/4){
		escala = (3/4);
		barra.scale.x = .75;
		barra.scale.y = .75;
		piso.scale.x=.75;
		piso.scale.y=.75;
		bola.scale.x=.75;
		bola.scale.y=.75;
	}
	else
	{
		escala = 1;
		barra.scale.x = 1;
		barra.scale.y = 1;
		piso.scale.x=1;
		piso.scale.y=1;
		bola.scale.x=1;
		bola.scale.y=1;
	}
	puntuacion.x = juego.width/2;
	puntuacion.y = juego.height;

	piso.x = Math.round((juego.width)/2);
	piso.y = Math.round((juego.height)-50);
	bola.x = Math.round((juego.width)/2);
	bola.y = Math.round((juego.height)-150);

}

//Modificar si se mete una nueva imagen de piso
function inverso (bola,piso) {
	var diferencia = 0;
//	alert("Posición del piso: "+(piso.x+167.5)+"\n Posición de la bola: "+bola.x);
	if(bola.x < piso.x + 71)
	{
			diferencia = piso.x + 71 - bola.x;
			bola.body.velocity.x =-(5*diferencia);	
	}
	else if(bola.x > piso.x+71)
	{
			diferencia = bola.x - piso.x + 71;
			bola.body.velocity.x= (2*diferencia);
	}
	/*if(bola.x < piso.x + (juego.cache.getImage("piso").width/2)*escala)
	{
			diferencia = piso.x+((juego.cache.getImage("piso").width/2)*escala) - bola.x;
			bola.body.velocity.x =-(10*diferencia*escala);	
	}
	else if(bola.x > piso.x+ (juego.cache.getImage("piso").width/2)*escala)
	{
			diferencia = bola.x - piso.x+(juego.cache.getImage("piso").width/2)*escala;
			bola.body.velocity.x= (10*diferencia*escala);
	}*/
	else
	{
			bola.body.velocity.x = 2 + Math.random() * 8;
	}
}

function power (bola,barrap) {
	barrap.kill();
}

function recojer (poder,piso) {
	poder.kill();
}

function matar (sucio,barra) {
	sucio.kill();
	S1=false;
	ataque1.kill();
}
function matar2 (sucio1,barra) {
	sucio.kill();
	S2=false;
	ataque2.kill();
}
function matar3 (sucio2,barra) {
	sucio.kill();
	S3=false;
	ataque3.kill();
}
function matar4 (sucio3,barra) {
	sucio.kill();
	S4=false;
	ataque4.kill();
}
function matar5 (sucio4,barra) {
	sucio.kill();
	S5=false;
	ataque5.kill();
}
function matar6 (sucio5,barra) {
	sucio.kill();
	S6=false;
	ataque6.kill();
}


function update () 
{	
	juego.physics.arcade.collide(barra,sucio5);
	juego.physics.arcade.collide(barra,sucio4);
	juego.physics.arcade.collide(barra,sucio3);
	juego.physics.arcade.collide(barra,sucio2);
	juego.physics.arcade.collide(barra,sucio);
	juego.physics.arcade.collide(barra,sucio1);
	juego.physics.arcade.collide(sucio,bola,matar2,null,this);
	juego.physics.arcade.collide(sucio1,bola,matar,null,this);
	juego.physics.arcade.collide(sucio2,bola,matar3,null,this);
	juego.physics.arcade.collide(sucio3,bola,matar4,null,this);
	juego.physics.arcade.collide(sucio4,bola,matar5,null,this);
	juego.physics.arcade.collide(sucio5,bola,matar6,null,this);
	juego.physics.arcade.collide(bola,piso,inverso,null,this);
	juego.physics.arcade.collide(bola,barra,rebote,null,this);
	juego.physics.arcade.collide(ataque1,bola,daño,null,this);
	juego.physics.arcade.collide(ataque2,bola,daño,null,this);
	juego.physics.arcade.collide(ataque1,piso,daño,null,this);
	juego.physics.arcade.collide(ataque2,piso,daño,null,this);
	juego.physics.arcade.collide(ataque3,bola,daño,null,this);
	juego.physics.arcade.collide(ataque4,bola,daño,null,this);
	juego.physics.arcade.collide(ataque3,piso,daño,null,this);
	juego.physics.arcade.collide(ataque4,piso,daño,null,this);
	juego.physics.arcade.collide(ataque5,bola,daño,null,this);
	juego.physics.arcade.collide(ataque6,bola,daño,null,this);
	juego.physics.arcade.collide(ataque5,piso,daño,null,this);
	juego.physics.arcade.collide(ataque6,piso,daño,null,this);
	if(controles.right.isDown)
	{
		piso.body.velocity.x = 500*escala;
	}
	else if(controles.left.isDown)
	{
		piso.body.velocity.x= -500*escala ;
	}
	else
	{
		piso.body.velocity.x= 0 ;
	}

	if(bola.body.velocity.x == 0 && (controles.left.isDown || controles.right.isDown))
	{
		bola.body.velocity.x= 300*escala;
		bola.body.velocity.y= 200*escala;
	}
	if(S1){
		if(c1!=0){
			c1--;
		}else{
			if(ataque1!=null){ataque1.kill();}
			c1=juego.rnd.integerInRange(1,15)*10;
			ataque1= juego.add.sprite(sucio1.x, sucio1.y,"bs");
			juego.physics.arcade.enable(ataque1);
			ataque1.body.collideWorldBounds=true;
			ataque1.body.bounce.set(1);
			ataque1.checkWorldBounds = true;
			ataque1.body.velocity.y = juego.rnd.integerInRange(-10,10)*100;
			ataque1.body.velocity.x = juego.rnd.integerInRange(-10,10)*100;
			ataque1.events.onOutOfBounds.add(fallo1, this);
		}
	}
	if(S2){
		if(c2!=0){
			c2--;
		}else{
			if(ataque2!=null){ataque2.kill();}
			c2=juego.rnd.integerInRange(1,15)*10;
			ataque2= juego.add.sprite(sucio.x, sucio.y,"bs1");
			juego.physics.arcade.enable(ataque2);
			ataque2.body.collideWorldBounds=true;
			ataque2.body.bounce.set(1);
			ataque2.checkWorldBounds = true;
			ataque2.body.velocity.y = juego.rnd.integerInRange(-10,10)*100;
			ataque2.body.velocity.x = juego.rnd.integerInRange(-10,10)*100;
			ataque2.events.onOutOfBounds.add(fallo2, this);			
		}
	}
	if(S3){
		if(c3!=0){
			c3--;
		}else{
			if(ataque3!=null){ataque3.kill();}
			c3=juego.rnd.integerInRange(1,15)*10;
			ataque3= juego.add.sprite(sucio2.x, sucio2.y,"bs");
			juego.physics.arcade.enable(ataque3);
			ataque3.body.collideWorldBounds=true;
			ataque3.body.bounce.set(1);
			ataque3.checkWorldBounds = true;
			ataque3.body.velocity.y = juego.rnd.integerInRange(-10,10)*100;
			ataque3.body.velocity.x = juego.rnd.integerInRange(-10,10)*100;
			ataque3.events.onOutOfBounds.add(fallo3, this);			
		}
	}
	if(S4){
		if(c4!=0){
			c4--;
		}else{
			if(ataque4!=null){ataque4.kill();}
			c4=juego.rnd.integerInRange(1,15)*10;
			ataque4= juego.add.sprite(sucio3.x, sucio3.y,"bs1");
			juego.physics.arcade.enable(ataque4);
			ataque4.body.collideWorldBounds=true;
			ataque4.body.bounce.set(1);
			ataque4.checkWorldBounds = true;
			ataque4.body.velocity.y = juego.rnd.integerInRange(-10,10)*100;
			ataque4.body.velocity.x = juego.rnd.integerInRange(-10,10)*100;
			ataque4.events.onOutOfBounds.add(fallo4, this);			
		}
	}
	if(S5){
		if(c5!=0){
			c5--;
		}else{
			if(ataque5!=null){ataque5.kill();}
			c5=juego.rnd.integerInRange(1,15)*10;
			ataque5= juego.add.sprite(sucio4.x, sucio4.y,"bs");
			juego.physics.arcade.enable(ataque5);
			ataque5.body.collideWorldBounds=true;
			ataque5.body.bounce.set(1);
			ataque5.checkWorldBounds = true;
			ataque5.body.velocity.y = juego.rnd.integerInRange(-10,10)*100;
			ataque5.body.velocity.x = juego.rnd.integerInRange(-10,10)*100;
			ataque5.events.onOutOfBounds.add(fallo5, this);			
		}
	}
	if(S6){
		if(c6!=0){
			c6--;
		}else{
			if(ataque6!=null){ataque6.kill();}
			c6=juego.rnd.integerInRange(1,15)*10;
			ataque6= juego.add.sprite(sucio5.x, sucio5.y,"bs1");
			juego.physics.arcade.enable(ataque6);
			ataque6.body.collideWorldBounds=true;
			ataque6.body.bounce.set(1);
			ataque6.checkWorldBounds = true;
			ataque6.body.velocity.y = juego.rnd.integerInRange(-10,10)*100;
			ataque6.body.velocity.x = juego.rnd.integerInRange(-10,10)*100;
			ataque6.events.onOutOfBounds.add(fallo6, this);			
		}
	}
	
}
function daño(atk,bola){
	score -=10;
	puntuacion.text = 'Score: '+score;
	atk.kill();
}
function fallo1(){
	ataque1.kill();
}
function fallo2(){
	ataque2.kill();
}
function fallo3(){
	ataque3.kill();
}
function fallo4(){
	ataque4.kill();
}
function fallo5(){
	ataque5.kill();
}
function fallo6(){
	ataque6.kill();
}

function bola_perdida () {
	if(contador != 0 ){
		bola.reset(juego.width/2, juego.height-150);
		piso.reset(juego.width/2, juego.height-50);
		bola.body.velocity.set(0);
	}
	else{
		bola.kill();	
	}

}

function rebote (bola,barra) {
	barra.kill();
	score += 10;
	puntuacion.text = 'Score: '+score;
	contador--;
	if(contador == 0)
	{
		//Ganaste
		Estado = juego.add.text(juego.world.centerX, 400, '¡Ganaste!\n ¡Enhorabuena!, has acabado el juego', { font: "40px Arial", fill: "#ffffff", align: "center" })
		Estado.anchor.setTo(0.5, 0.5);
		bola.kill();
	}
}

	