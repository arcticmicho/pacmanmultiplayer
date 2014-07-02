var app = require('express.io')()
var StageObject= require ('./StageObject.js');
var Player= require ('./Player.js');

app.http().io()
app.listen(80);

var maxPlayers = 50;
var index = 0;
var fullOfPlayers = -1;

var playerArray= [];

var serverStage= new StageObject();
serverStage.createStage();
var serverSideClientData;
var indexPage = '/index.html'
var noSlot = '/noSlot.html'
var client = '/pacman-cliente.html'
var gamePage = '/pacman-cliente.html'

	   app.get('/', function (req, res) {
			      console.log("Enter");
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
		var player= new Player(0,0,index);
		playerArray[player.id] = (player);
		socket.emit('requestedID',index);
		console.log('Request ID required');
		app.io.sockets.emit('sendDataToClient',sendDataToClient());
		index++;
	}else{
		socket.emit('requestedID',fullOfPlayers);
	}
  });
  
  socket.on('receiveDataFromClient',function (unparsedJSON) {
	if(unparsedJSON != null){
		parsedJSON = JSON.parse(unparsedJSON);
		playerArray[parsedJSON.id].action = parsedJSON.action; 
	}
	  
	app.io.sockets.emit('sendDataToClient',sendDataToClient());
  });
});

setInterval(animatePlayer,90);

function animatePlayer(){
          if(playerArray!=null){
                    for(var numPlayer=0;numPlayer<playerArray.length;numPlayer++){
                          if(playerArray[numPlayer]!=null){
                              serverStage.animatePlayer(playerArray[numPlayer]);
                          }
                    }
                    app.io.sockets.emit('sendDataToClient',sendDataToClient());
          }         
}
              
function sendDataToClient(){
    var objArray = new Array(serverStage,playerArray);
    var data= JSON.stringify(objArray);
    data= JSON.parse(data);
	return data;
}
              
function animatePlayersInServer(){
    var player;
    for(var playerNum=0;playerNum<playerArray.length;playerNum++){
        player=playerArray[playerNum];
        serverStage.animatePlayer(player);
         }
        sendDataToClient();
     }
              
function receiveDataFromClient(a){
    console.log(a);
    if(a!=null){    
        serverSideClientData=JSON.parse(a);
        playerArray[serverSideClientData.id].action=serverSideClientData.action;
        playerArray[serverSideClientData.id]=serverStage.animatePlayer(playerArray[serverSideClientData.id]);   
    }
}
