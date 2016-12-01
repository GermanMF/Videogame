//Variables globales
var juego = new Phaser.Game("100%","100%", Phaser.CANVAS, 'primerJuego',{ preload:preload, create:create, update:update, resize:resize });

//Variables de escenario
var fondo, piso, bola, boton, puntuacion, poder, contador=0, contador2=0, Estado;

//Variables personaje
var barra, barra2, controles;

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
	juego.load.image("fondo","assets/fondo6.jpg",800,600);
	juego.load.image("piso","assets/zana3.png");
	juego.load.image("boton","assets/start-button.png",104,58);
	juego.load.spritesheet("bola", "assets/bola_1.png",37,17);
	juego.load.image("barra","assets/alcachofa.png",100,20);
	juego.load.image("barra2","assets/hijed.png",100,20);
	juego.load.image("poder","assets/diamond.png",32,28);
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
	//fondiqui.scale.setTo(2,2);

	piso = juego.add.sprite(juego.width/2, juego.height, "piso");
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

	barra2 = juego.add.group();
	barra2.enableBody = true;
	barra2.physicsBodyType = Phaser.Physics.ARCADE;


//	poder = juego.add.group();
//	barrap = juego.add.group();
	for(var i=0;i<6; i++)
	{
		for(j=0;j<12;j++)
		{
			if(i==0 && (j==2 || j==9 || j==5 || j == 6)){}
			else if((i==1||i==3) && (j==0 || j==4 || j==7 || j==11 || j==5 || j == 6)){}
			else if((i==2||i==4) && (j==5 || j == 6)){}
			else if(i!=5){
					contador++;
					var barras = barra.create(10+(j*110), 100+(i*30),"barra");
					barras.body.bounce.set(1);
					barras.body.immovable = true;
					juego.physics.arcade.enable(barras);	
			}
			if(i==5 && (j==2 || j==9)){
					contador++;
					var barras2 = barra2.create(10+(j*110), 100+(i*30),"barra2");
					barras2.body.bounce.set(1);
					barras2.body.immovable = true;
					juego.physics.arcade.enable(barras2);			
			}
			
			//juego.physics.arcade.enable(poderes);
			//uego.physics.arcade.enable(barraps);
		}
	}


	//Puntaje
	puntuacion = juego.add.text(10, 50,"Score: 0",{fontSize: "32px", fill: "#000"});
	puntuacion.anchor.y = 1;
	//puntuacion.anchor.x = 1;

	resize;
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
	if(bola.x < piso.x + (juego.cache.getImage("piso").width/2)*escala)
	{
			diferencia = piso.x+((juego.cache.getImage("piso").width/2)*escala) - bola.x;
			bola.body.velocity.x =-(10*diferencia*escala);	
	}
	else if(bola.x > piso.x+ (juego.cache.getImage("piso").width/2)*escala)
	{
			diferencia = bola.x - piso.x+(juego.cache.getImage("piso").width/2)*escala;
			bola.body.velocity.x= (10*diferencia*escala);
	}
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

function update () 
{	
	juego.physics.arcade.collide(bola,barra2,rebote2,null,this);
	juego.physics.arcade.collide(bola,piso,inverso,null,this);
	juego.physics.arcade.collide(bola,barra,rebote,null,this);
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
		if((controles.left.isDown || controles.right.isDown) && contador ==0 )
	{
		window.open("Nivel_3.html","_self");
	}

		//	jugador.body.velocity.y= 0 ;
		//	jugador.animations.play("normal");
}

function bola_perdida () {
	if(contador != 0 ){
		bola.reset(juego.width/2, juego.height-150);
		piso.reset(juego.width/2, juego.height-80);
		bola.body.velocity.set(0);
	}
	else{
		bola.kill();	
	}

}

function rebote2 (bola,barra2) {

	if(contador2 >= 6)
		barra2.kill();
	score += 10;
	puntuacion.text = 'Score: '+score;
	contador2++;
	contador--;
	if(contador == 0)
	{
		//Ganaste
		Estado = juego.add.text(juego.world.centerX, 400, '¡Ganaste!', { font: "40px Arial", fill: "#ffffff", align: "center" })
		Estado.anchor.setTo(0.5, 0.5);
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
		Estado = juego.add.text(juego.world.centerX, 400, '¡Ganaste!', { font: "40px Arial", fill: "#ffffff", align: "center" })
		Estado.anchor.setTo(0.5, 0.5);
		bola.kill();
	}
}

