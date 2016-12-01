//Variables globales
var juego = new Phaser.Game("100%","100%", Phaser.CANVAS, 'primerJuego',{ preload:preload, create:create, update:update, resize:resize });

//Variables de escenario
var fondo, piso, bola, boton, puntuacion, poder, contador=0, Estado;

//Variables personaje
var controles;

//Variables de barras
var barra1, barra2, barra3, barra4, barra5;

//Variable score
var score = 0, tiempo = 6000;

//Variable de escala
var escala=1;

//Variables para control de juego
var Inicio = false;
var width = document.body.offsetWidth;
var height = document.body.offsetHeight;


function preload()
{
	juego.load.image("fondo","assets/fondo9.jpg",800,600);
	juego.load.image("piso","assets/mante2.png",64,16);
	juego.load.image("boton","assets/start-button.png",104,58);
	juego.load.spritesheet("bola", "assets/almendra.png",30,17);
	juego.load.image("barra","assets/aceite.png",100,20);
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
	//fondiqui.scale.setTo(0,0);

	piso = juego.add.sprite(juego.width/2, juego.height-80, "piso");
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

	//barras grupo 1
	barra1 = juego.add.group();
	barra1.enableBody = true;
	barra1.physicsBodyType = Phaser.Physics.ARCADE;

		//barras grupo 2
	barra2 = juego.add.group();
	barra2.enableBody = true;
	barra2.physicsBodyType = Phaser.Physics.ARCADE;

		//barras grupo 3
	barra3 = juego.add.group();
	barra3.enableBody = true;
	barra3.physicsBodyType = Phaser.Physics.ARCADE;

		//barras grupo 4
	barra4 = juego.add.group();
	barra4.enableBody = true;
	barra4.physicsBodyType = Phaser.Physics.ARCADE;

		//barras grupo 5
	barra5 = juego.add.group();
	barra5.enableBody = true;
	barra5.physicsBodyType = Phaser.Physics.ARCADE;



//	poder = juego.add.group();
//	barrap = juego.add.group();
	for(var i=0;i<5; i++)
	{
		for(j=0;j<10;j++)
		{
			if(i==0){
				contador++;
				var barras1 = barra1.create(100+(j*110), 100+(i*30),"barra");
				barras1.body.bounce.set(1);
				barras1.body.immovable = true;
				juego.physics.arcade.enable(barras1);					
			}
			else if(i==1){
				var barras2 = barra2.create(50+(j*110), 100+(i*30),"barra");
				if(j==4 || j==5)
				{
					barras2.visible = false;
					barras2.exists = false;
				}
				else
				{

				contador++;
				barras2.body.bounce.set(1);
				barras2.body.immovable = true;
				juego.physics.arcade.enable(barras2);
				}
			}
			else if(i==2){
				contador++;
				var barras3 = barra3.create(100+(j*110), 100+(i*30),"barra");
				barras3.body.bounce.set(1);
				barras3.body.immovable = true;
				juego.physics.arcade.enable(barras3);
			}
			else if(i==3){
				var barras4 = barra4.create(50+(j*110), 100+(i*30),"barra");
				if(j==4 || j==5)
				{
					barras4.visible = false;
					barras4.exists = false;
				}
				else
				{
				contador++;
				barras4.body.bounce.set(1);
				barras4.body.immovable = true;
				juego.physics.arcade.enable(barras4);
				}
			}
			else{
				contador++;
				var barras5 = barra5.create(100+(j*110), 100+(i*30),"barra");
				barras5.body.bounce.set(1);
				barras5.body.immovable = true;
				juego.physics.arcade.enable(barras5);	
			}
		}
	}


	//Puntaje
	puntuacion = juego.add.text(10, 50,"Score: 0\nTimer: 0",{fontSize: "32px", fill: "#fff"});
	puntuacion.anchor.y = 1;
	//puntuacion.anchor.x = 1;
	timer = juego.time.create(false);
	timer.add(1000, separar,this);
	timer.start();
	resize;
}

function separar () {
	//Separación primer grupo
	for(var i = 0; i<barra1.length ; i++)
	{
		if(i<barra1.length/2){
			barra1.getAt(i).body.velocity.x = -35+(i+1)*5;
			barra1.getAt(i).body.velocity.y = -10;
		}
		else{
			//barra1.getAt(i).body.velocity.x = 10+((barra1.length - i)/2)*5;
			barra1.getAt(i).body.velocity.x = 10-((barra1.length/2)-i)*5;
			barra1.getAt(i).body.velocity.y = -10;
		}

	}

	for(var i = 0; i<barra2.length ; i++)
	{
		if(i<barra1.length/2){
			barra2.getAt(i).body.velocity.x = -12+(i+1)*5;
			barra2.getAt(i).body.velocity.y = -5;
		}
		else{
			barra2.getAt(i).body.velocity.x = 5-((barra2.length/2)-i)*5;
			barra2.getAt(i).body.velocity.y = -5;
		}
	}

	for(var i = 0; i<barra2.length ; i++)
	{
		if(i<barra1.length/2){
			barra3.getAt(i).body.velocity.x = -35+(i+1)*5;
		}
		else{
			barra3.getAt(i).body.velocity.x = 10-((barra2.length/2)-i)*5;
		}
	}

	for(var i = 0; i<barra2.length ; i++)
	{
		if(i<barra1.length/2){
			barra4.getAt(i).body.velocity.x = -12+(i+1)*5;
			barra4.getAt(i).body.velocity.y = 5;
		}
		else{
			barra4.getAt(i).body.velocity.x = 5-((barra4.length/2)-i)*5;
			barra4.getAt(i).body.velocity.y = 5;
		}
	}

	for(var i = 0; i<barra1.length ; i++)
	{
		if(i<barra1.length/2){
			barra5.getAt(i).body.velocity.x = -35+(i+1)*5;
			barra5.getAt(i).body.velocity.y = 10;
		}
		else{
			barra5.getAt(i).body.velocity.x = 10-((barra1.length/2)-i)*5;
			barra5.getAt(i).body.velocity.y = 10;
		}

	}

	timer.add(3000,junta,this);
}

function junta () {
	for(var i = 0; i<barra1.length ; i++)
	{
		if(i<barra1.length/2){
			barra1.getAt(i).body.velocity.x = 0;
			barra1.getAt(i).body.velocity.y = 100;
		}
		else{
			barra1.getAt(i).body.velocity.x = 0;
			barra1.getAt(i).body.velocity.y = 100;
		}

	}

	for(var i = 0; i<barra2.length ; i++)
	{
		if(i<barra1.length/2){
			barra2.getAt(i).body.velocity.x = 0;
			barra2.getAt(i).body.velocity.y = 50;
		}
		else{
			barra2.getAt(i).body.velocity.x =0;
			barra2.getAt(i).body.velocity.y = 50;
		}
	}

	for(var i = 0; i<barra2.length ; i++)
	{
		if(i<barra1.length/2){
			barra3.getAt(i).body.velocity.x = 0;
		}
		else{
			barra3.getAt(i).body.velocity.x = 0;
		}
	}

	for(var i = 0; i<barra2.length ; i++)
	{
		if(i<barra1.length/2){
			barra4.getAt(i).body.velocity.x =0;
			barra4.getAt(i).body.velocity.y = -50;
		}
		else{
			barra4.getAt(i).body.velocity.x = 0;
			barra4.getAt(i).body.velocity.y = -50;
		}
	}

	for(var i = 0; i<barra1.length ; i++)
	{
		if(i<barra1.length/2){
			barra5.getAt(i).body.velocity.x = 0;
			barra5.getAt(i).body.velocity.y = -100;
		}
		else{
			barra5.getAt(i).body.velocity.x = 0;
			barra5.getAt(i).body.velocity.y = -100;
		}

	}

	timer.add(2000,junta2,this);
}

function junta2 () {
for(var i = 0; i<barra1.length ; i++)
	{
		if(i<barra1.length/2){
			barra1.getAt(i).body.velocity.x = 0;
			barra1.getAt(i).body.velocity.y = -100;
		}
		else{
			barra1.getAt(i).body.velocity.x = 0;
			barra1.getAt(i).body.velocity.y = -100;
		}

	}

	for(var i = 0; i<barra2.length ; i++)
	{
		if(i<barra1.length/2){
			barra2.getAt(i).body.velocity.x = 0;
			barra2.getAt(i).body.velocity.y = -50;
		}
		else{
			barra2.getAt(i).body.velocity.x =0;
			barra2.getAt(i).body.velocity.y = -50;
		}
	}

	for(var i = 0; i<barra2.length ; i++)
	{
		if(i<barra1.length/2){
			barra3.getAt(i).body.velocity.x = 0;
		}
		else{
			barra3.getAt(i).body.velocity.x = 0;
		}
	}

	for(var i = 0; i<barra2.length ; i++)
	{
		if(i<barra1.length/2){
			barra4.getAt(i).body.velocity.x =0;
			barra4.getAt(i).body.velocity.y = 50;
		}
		else{
			barra4.getAt(i).body.velocity.x = 0;
			barra4.getAt(i).body.velocity.y = 50;
		}
	}

	for(var i = 0; i<barra1.length ; i++)
	{
		if(i<barra1.length/2){
			barra5.getAt(i).body.velocity.x = 0;
			barra5.getAt(i).body.velocity.y = 100;
		}
		else{
			barra5.getAt(i).body.velocity.x = 0;
			barra5.getAt(i).body.velocity.y = 100;
		}

	}

	timer.add(2000,junta,this);
}
function resize () {
	if(juego.width <= width/3){
		escala = (1/3);
		barra1.scale.x = .35;
		barra1.scale.y = .35;
		piso.scale.x=.35;
		piso.scale.y=.35;
		bola.scale.x=.35;
		bola.scale.y=.35;
	}
	else if(juego.width <= (2*width)/5){
		escala = (2/5);
		barra1.scale.x = .4;
		barra1.scale.y = .4;
		piso.scale.x=.4;
		piso.scale.y=.4;
		bola.scale.x=.4;
		bola.scale.y=.4;	
	}
	else if(juego.width <= (width)/2){
		escala = .5;
		barra1.scale.x = .5;
		barra1.scale.y = .5;
		piso.scale.x=.5;
		piso.scale.y=.5;
		bola.scale.x=.5;
		bola.scale.y=.5;
	}	
	else if(juego.width <= (3*width)/4){
		escala = (3/4);
		barra1.scale.x = .75;
		barra1.scale.y = .75;
		piso.scale.x=.75;
		piso.scale.y=.75;
		bola.scale.x=.75;
		bola.scale.y=.75;
	}
	else
	{
		escala = 1;
		barra1.scale.x = 1;
		barra1.scale.y = 1;
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
	/*if(bola.x < piso.x + 32*escala)
	{
			diferencia = piso.x + 32 - bola.x;
			bola.body.velocity.x =-(4*diferencia)*escala;	
	}
	else if(bola.x > piso.x+32*escala)
	{
			diferencia = bola.x - piso.x + 32;
			bola.body.velocity.x= (4*diferencia)*escala;
	}*/
	if(bola.x < piso.x + (juego.cache.getImage("piso").width/2)*escala)
	{
			diferencia = piso.x+((juego.cache.getImage("piso").width/2)*escala) - bola.x;
			bola.body.velocity.x =-(10*diferencia*escala);	
	}
	else if(bola.x > piso.x+ (juego.cache.getImage("piso").width/2)*escala)
	{
			diferencia = bola.x - piso.x+(juego.cache.getImage("piso").width/2)*escala;
			bola.body.velocity.x= (4*diferencia*escala);
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
	juego.physics.arcade.collide(bola,piso,inverso,null,this);
	juego.physics.arcade.collide(bola,barra1,rebote,null,this);
	juego.physics.arcade.collide(bola,barra2,rebote,null,this);
	juego.physics.arcade.collide(bola,barra3,rebote,null,this);
	juego.physics.arcade.collide(bola,barra4,rebote,null,this);
	juego.physics.arcade.collide(bola,barra5,rebote,null,this);

		if((controles.left.isDown || controles.right.isDown) && contador ==0 )
	{
		window.open("Nivel_6.html","_self");
	}
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

		//	jugador.body.velocity.y= 0 ;
		//	jugador.animations.play("normal");
	if(tiempo != 0){
		puntuacion.text = 'Score: '+score+'\nTimer: '+tiempo;
		tiempo--;
	}
	else{
		puntuacion.text = 'Score: '+score+'\nTimer: 0';
		gameover();
	}


}

function gameover () {
	Estado = juego.add.text(juego.world.centerX-200, 300,'Se acabó tu tiempo',  { font: "40px Arial", fill: "#fff", align: "center" });
	piso.kill();
	bola.kill();
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

function rebote (bola,barra) {
	barra.kill();
	score += 10;
	puntuacion.text = 'Score: '+score;
	contador--;
	if(contador == 0)
	{
		//Ganaste
		Estado = juego.add.text(juego.world.centerX, 400, '¡Ganaste!', { font: "40px Arial", fill: "#fff", align: "center" })
		Estado.anchor.setTo(0.5, 0.5);
		bola.kill();
	}
}