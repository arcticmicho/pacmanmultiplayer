var app = require('express.io')()
app.http().io()
app.listen(80);

var maxPlayers = 3;
var index = 0;
var fullOfPlayers = -1;

var playerArray= [];
                        
//playerArray[player1.id]=(player1);
//playerArray[player2.id]=(player2);
//playerArray[player3.id]=(player3);

var serverStage=new StageObject();
var stageObject;
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
        playerArray[parsedJSON.id] = serverStage.animatePlayer(playerArray[parsedJSON.id]);   
	}
	
	sockets.emit('sendDataToClient',sendDataToClient());
  });
});


              
function sendDataToClient(){
    var objArray = new Array(serverStage,playerArray);
    stageObject= JSON.stringify(objArray);
console.log(stageObject);	
	return stageObject;
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

//STAGE OBJECT -----------------------------------------------------------------------------------------------------------------
    function StageObject(){
        console.log("Game Object Created");
		this.stageDimension=31;
		this.stageArray= new Array(this.stageDimension);

		this.actionLeft=false;
		this.actionRigth=false;
		this.actionUp=false;
		this.actionDown=false;
		this.action="";
		this.player;
    }
	
    StageObject.prototype.createStage = function(){
			console.log("Stage created");
            for(var i=0;i<this.stageDimension;i++){
                    this.stageArray[i]=new Array(this.stageDimension);
                for(var ii=0;ii<this.stageDimension;ii++){
                    if(i%2==0 || ii>this.stageDimension-2 || ii==0 || (ii>=Math.round(this.stageDimension/2)-1 && ii<=Math.round(this.stageDimension/2)-1) || (ii>=Math.round(this.stageDimension/4)-1 && ii<=Math.round(this.stageDimension/4)-1) ||
                      (ii>=Math.round(this.stageDimension/1.3)-1 && ii<=Math.round(this.stageDimension/1.3)-1)){
                    this.stageArray[i][ii]=new Block(true);
                    }else{
                      this.stageArray[i][ii]=new Block(false);  
                    }
                }
            }
    }
    
    StageObject.prototype.movePlayerById=function(id){
          this.animatePlayer(this.playersArray[id]);
    }
    
    StageObject.prototype.animatePlayer=function (playerToMove){
         this.player=playerToMove;
         var posx = this.player.xPos;
         var posy = this.player.yPos;
		if(posx < this.stageDimension-1 ){
			if(this.player.action == "arrowright" && this.checkForBlockStage(1,0,this.player)){
				this.player.actionsToFalse();
				this.player.actionRigth=true;
			}
		}else{
		   this.player.actionRigth=false;  
		}

		if(posx>0){
			if(this.player.action == "arrowleft" && this.checkForBlockStage(-1,0,this.player)){
				this.player.actionsToFalse();
				this.player.actionLeft=true;
			}
		}else{
		   this.player.actionLeft=false;   
		}

		if(posy-1>=0){
			if(this.player.action == "arrowup" &&  posy-1>=0 && this.checkForBlockStage(0,-1,this.player)){
				this.player.actionsToFalse();
				this.player.actionUp=true;
			}
		}else{
			this.player.actionUp=false;  
		}

		if(posy<this.stageDimension-1){
			if(this.player.action == "arrowdown" && this.checkForBlockStage(0,1,this.player)){
				this.player.actionsToFalse();
				this.player.actionDown=true;
			}
		}else{
		   this.player.actionDown=false;   
		}

		if(this.player.actionRigth){this.player.xPos++;}
		if(this.player.actionLeft){this.player.xPos--;}
		if(this.player.actionUp){this.player.yPos--;}
		if(this.player.actionDown){this.player.yPos++;}
        
         return this.player;
    }
        
    StageObject.prototype.checkForBlockStage=function (x,y,player){
        return this.stageArray[player.xPos+x][player.yPos+y].state;
    }
      
    function Block(state){
        this.id;
        this.state=state;
        this.point=state;
    }

    function Player(posx,posy,id){
        this.xPos=posx;
        this.yPos=posy;
        this.id=id;
        this.color="#000000";
        this.action="";
        this.actionUp=false;
        this.actionDown=false;
        this.actionLeft=false;
        this.actionRigth=false;
        this.points=0;
    }
    
    Player.prototype.actionsToFalse=function(){
        this.actionUp=false;
        this.actionDown=false;
        this.actionLeft=false;
        this.actionRigth=false;
    }
    
    Player.prototype.getColor=function(id){
		var colors = ["#FF0000", "#FFFF00", "#00FF00", "#FA58D0"];
        var color = colors[id];
        return color;  
    }
//END STAGE OBJECT -------------------------------------------------------------------------------
