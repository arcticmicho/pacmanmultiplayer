var app = require('express.io')()
app.http().io()
app.listen(80);

var maxPlayers = 3;
var players = new Array();
var index = 0;
var fullOfPlayers = -1;

var indexPage = '/index.html'
var noSlot = '/noSlot.html'
var client = '/pacman-noobteam.html'
var gamePage = '/pacman-noobteam.html'

app.get('/', function (req, res) {

  if(index > maxPlayers){
	res.sendfile(__dirname + noSlot);
  }else { 
	res.sendfile(__dirname + gamePage);

  }
});

app.get('/client', function (req, res) {
  res.sendfile(__dirname + client);
 });
 
app.io.sockets.on('connection', function (socket) {
  console.log('Someone has connected \n');
  console.log('Number of players: '+index+ '\n');
  socket.on('my other event', function (data) {
    console.log(data);
	socket.broadcast.emit('doSomething');
  });
  
  socket.on('requestID',function (data) {
	console.log('server - request ID received');
    if(index < maxPlayers){
		var newPlayer = new Player(index);
		players[index] = newPlayer;
		socket.emit('requestedID',index);
		console.log('Request ID required');
		index++;
	}else{
		socket.emit('requestedID',fullOfPlayers);
	}
  });
  
  socket.on('moveClientToServer', function(inputJSON) {
	//TODO des-serializar JSON y actualizar jugadores luego mandar broadcast

	var parsedJSON = JSON.parse(inputJSON);
	var id = parsedJSON.id;
	var posX = parsedJSON.posx;
	var posY = parsedJSON.posy;
	
	console.log('server - players array ' + players);
	//Almacenando players
	players[id].xPos = posX;
	players[id].yPos = posY;
	
	//Reenviando position JSON del player a todos los demas
	console.log('server - init Broadcasting ' + JSON.stringify(players));
	socket.broadcast.emit('moveServerToClient',JSON.stringify(players));
	
  });
  
});

function Player(playerId){
 this.id = playerId;
 this.xPos = 0;
 this.yPos = 0;
}