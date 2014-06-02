var app = require('express.io')()
app.http().io()
app.listen(80);

var maxPlayers = 3;
var players = [new Player(0,0,0),new Player(30,0,1),new Player(0,30,2)];
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
		socket.emit('requestedID',index);
		console.log('Request ID required');
		index++;
	}else{
		socket.emit('requestedID',fullOfPlayers);
	}
  });
  
  socket.on('sendNewPlayer',function (newPlayer) {
	players[newPlayer.id] = newPlayer;
	console.log('server - receiving new Player' + JSON.stringify(newPlayer));
	console.log('server - updated list of players' + JSON.stringify(players));
    var playersAsJSON = {"players":
        players
	};
   // socket.broadcast.emit('newPlayerOnGame',playersAsJSON);
      app.io.sockets.emit('newPlayerOnGame',playersAsJSON);
  });
  
  socket.on('moveClientToServer', function(jsonAsString) {
	var parsedJSON = JSON.parse(jsonAsString);
	var id = parsedJSON.id;
	
	//actualizando posicion del player
	players[id].xPos = parsedJSON.posx;
	players[id].yPos = parsedJSON.posy;
	
	var playersAsJSON = {"players":
        players
	};
	
	//Reenviando position JSON del player a todos los demas
	//console.log('server - init Broadcasting ' + JSON.stringify(playersAsJSON));
	//socket.broadcast.emit('moveServerToClient',playersAsJSON);
      app.io.sockets.emit('moveServerToClient',playersAsJSON);
	
  });
  
});

function Player(x,y,playerId){
	this.id = playerId;
	this.xPos = x;
	this.yPos = y;
	this.color="#000000";
	this.actionUp=false;
	this.actionDown=false;
	this.actionLeft=false;
	this.actionRigth=false;
}
