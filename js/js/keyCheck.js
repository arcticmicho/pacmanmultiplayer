// JavaScript Document//Return key presedd in the keyboard


function checkKey(e){
	var key=0;
		key=String.fromCharCode(e.keyCode);
		if(key=="&"){key="arrowup"}
		if(key=="%"){key="arrowleft"}
		if(key=="("){key="arrowdown"}
		if(key=="'"){key="arrowright"}
		if(key==" "){key="space"}
		if(key==""){key="ctrl"}
		if(key==""){key="alt"}
		if(key==""){key="capLocks"}
		if(key==""){key="shift"}
		return(key);
}

