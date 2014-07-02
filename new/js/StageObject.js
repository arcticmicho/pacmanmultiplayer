var StageObject =    function (){
        console.log("Game Object Created");
		this.stageDimension=41;
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
                    this.stageArray[i][ii].state=true;
                    }else{
                      this.stageArray[i][ii]=new Block(false);  
                      this.stageArray[i][ii].state=false;
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
              
         this.changeBlockState(this.player);
              
         return this.player;
    }
    
    StageObject.prototype.changeBlockState=function(player){
              if(this.stageArray[player.xPos][player.yPos].point){
                 this.stageArray[player.xPos][player.yPos].point=false;       
              }
    }
        
    StageObject.prototype.checkForBlockStage=function (x,y,player){
        return this.stageArray[player.xPos+x][player.yPos+y].state;
    }
      
   function Block(state){
        this.id;
        this.state=state;
        this.point=state;
    }
    
module.exports = StageObject;