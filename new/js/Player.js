var Player = function (posx,posy,id){
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
    
    module.exports = Player;