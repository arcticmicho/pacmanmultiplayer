var app = require('express.io')()
app.http().io()
app.listen(80);

var maxPlayers = 4;
//var players = [new Player(0,0,0),new Player(30,0,1),new Player(0,30,2),new Player(30,30,3)];
var players = {};
var index = 0;
var fullOfPlayers = -1;

var indexPage = '/index.html'
var noSlot = '/noSlot.html'
var client = '/pacman-noobteam.html'
var gamePage = '/pacman-noobteam.html'
var welcome = '/welcome.html'





app.get('/', function (req, res) {
  if(index > maxPlayers){
	res.sendfile(__dirname + noSlot);
  }else { 
	res.sendfile(__dirname + gamePage);

  }
});
 
app.io.sockets.on('connection', function (socket) {
  console.log('Someone has connected \n');
  console.log('Number of players: '+index+ '\n');
  
  socket.on('requestID',function (data) {
	console.log('server - request ID received');
    if(index < maxPlayers){
		players[index] = new Player(0,0,index);
		console.log(players[index]);
		socket.emit('requestedID',index);
		//TODO change players[index] for the GameObject
		//app.io.sockets.emit('stageState',players[index]);
		index++;
		console.log('Request ID required');
		
	}else{
		socket.emit('requestedID',fullOfPlayers);
	}
  });
  
});



function Player(x,y,playerId){
	this.id = playerId;
	this.xPos = x;
	this.yPos = y;
	this.color="#000000";
	this.action="";
	this.actionUp=false;
	this.actionDown=false;
	this.actionLeft=false;
	this.actionRigth=false;
	this.points=0;
}

