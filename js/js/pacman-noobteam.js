window.onload = function(){
     console.log("Pacman-Multiplayer");
    var stageDimension=10;
    var stageBlockWidth=30;
    var stageBlockMargin=5;
    var stageArray= new Array(stageDimension);
    var playersArray=new Array();
    
    var actionLeft=false;
    var actionRigth=false;
    var actionUp=false;
    var actionDown=false;
    
    for(var i=0;i<3;i++){
        playersArray.push(new Player(Math.round(Math.random()*(stageDimension-1)),Math.round(Math.random()*(stageDimension-1)),"player1"+i));
    }
    
    createStage();
    
    $(window).keyup(function(e){
        setActions(e);
    });

    function createStage(){
        for(var i=0;i<stageDimension;i++){
                stageArray[i]=new Array(stageDimension);
            for(var ii=0;ii<stageDimension;ii++){
                if( i<5 || i>5  || ii<1 || ii>stageDimension-2){
                    stageArray[i][ii]=new Block(true);
                }else{
                    stageArray[i][ii]=new Block(false);
                }
            }
        }
        
        drawStage();
    }
    
    function drawStage(){
        console.log("DrawingStage");
        for(var i=0;i<stageDimension;i++){
            for(var ii=0;ii<stageDimension;ii++){
                if(stageArray[i][ii].state){
                $("#stage-container").append('<div class="stage-block" style="position: absolute; top:'+stageBlockWidth*i+'px; left:'+stageBlockWidth*ii+'px; width:'+stageBlockWidth+'px; height:'+stageBlockWidth+'px; background-color: grey;"></div>');
                }else{
                $("#stage-container").append('<div class="stage-block" style="position: absolute; top:'+stageBlockWidth*i+'px; left:'+stageBlockWidth*ii+'px; width:'+stageBlockWidth+'px; height:'+stageBlockWidth+'px; background-color: black;"></div>');}
            }
        }
        drawPlayers();
       
    }
    
    function drawPlayers(){
        for(var i=0;i<playersArray.length;i++){
              $("#stage-container").append('<div id="'+playersArray[i].id+'" style="position: absolute; top:'+stageBlockWidth*playersArray[i].posy+'px; left:'+stageBlockWidth*playersArray[i].posx+'px; width:'+stageBlockWidth+'px; height:'+stageBlockWidth+'px; background-color: red;"></div>');
        }
    }
    
    function setActions(e){
        actionsFalse();
        console.log("movement");
        key=e; 
        if(key=="arrowup"){
            actionUp=true;   
        }
        if(key=="arrowdown"){
            actionDown=true;   
        }
        if(key=="arrowleft"){
            actionLeft=true;   
        }
        if(key=="arrowright"){
            actionRigth=true;   
        }
        movePlayer();
    }
    
    function movePlayer(){
        
    }
    
    function actionsFalse(){
        actionDown=false;
        actionLeft=false;
        actionRigth=false;
        actionUp=false;
    }
    
    setInterval(animatePlayer,100);
    
    
    var posx;
    var posy;
    function animatePlayer(){
         for(var i=0;i<playersArray.length;i++){
             $("#"+playersArray[i].id).css('left',playersArray[i].posx*stageBlockWidth);
             $("#"+playersArray[i].id).css('top',playersArray[i].posy*stageBlockWidth);
             
             posx=playersArray[i].posx;
             posy=playersArray[i].posy;
             
             if(actionRigth && playersArray[i].posx<stageDimension-1){
             playersArray[i].posx++;}
             
             if(actionLeft && playersArray[i].posx>=1){          
             playersArray[i].posx--;}
             
             if(actionUp && playersArray[i].posy>0 && posy-1>=0 && stageArray[posx][posy-1].state ){
                 playersArray[i].posy--;
             }
             
             if(actionDown && playersArray[i].posy<stageDimension-1 ){          
             playersArray[i].posy++;}
             

         }
    }

}

function Block(state){
    this.state=state;   
}


function Player(posx,posy,id){
    this.posx=posx;
    this.posy=posy;
    this.id=id;
}