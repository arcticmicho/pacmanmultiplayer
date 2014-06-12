
function DrawGame(id){
          this.canvas = window.document.getElementById(id);
          this.ctx= this.canvas.getContext("2d");
          
          this.blockDimension=10;
          
          this.setCanvasSize();
}

DrawGame.prototype.drawStageArray = function(a){
          this.blockDimension=window.innerHeight/(a.length*1.3);
          var obj="";
          for(var colum=0;colum<a.length;colum++){
                    for(var row=0;row<a.length;row++){
                              obj=a[colum][row];
                              this.drawBlock(obj,colum,row);
                    }
          }
}

DrawGame.prototype.drawBlock = function(obj,colum,row){
          this.ctx.fillStyle=this.setBlockColor(obj.point);
          this.ctx.fillRect(this.blockDimension*colum,this.blockDimension*row,this.blockDimension,this.blockDimension);                  
}

DrawGame.prototype.drawPlayer = function(obj,colum,row){
          this.ctx.fillStyle=obj.color;
          this.ctx.fillRect(this.blockDimension*colum,this.blockDimension*row,this.blockDimension,this.blockDimension);                  
}

DrawGame.prototype.drawPlayersFromArray= function(playerArray){
          var player;
          for(var playerNum=0;playerNum<playerArray.length;playerNum++){
                    player=playerArray[playerNum];
                    this.drawPlayer(player,player.xPos,player.yPos);
          }
}

DrawGame.prototype.setBlockColor=function(a){
          if(a){
                    return "#FF00FF";          
          }else{
                    return "#0000FF"
          }
}

DrawGame.prototype.setCanvasSize = function(a){
          this.canvas.width=window.innerWidth/1.2;
          this.canvas.height=window.innerHeight/1.2;
}