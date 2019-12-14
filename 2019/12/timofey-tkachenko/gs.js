$(document).ready(function(){
var left;
var top;	
$(document).keydown(function(e){
	switch(e.keyCode) {
		case 68:				
		left = $(".ratadyй").position().left;		
		if (left >= -40 && left < 1305) $('.ratadyй').animate({"left":"+=38px"},);
		break;
		case 65:				
		if (left >= -40 && left < 1305) $('.ratadyй').animate({"left":"-=38px"},);
		left = $(".ratadyй").position().left;						
		break;
		case 83:
		if (top >= 0 && top < 670) $('.ratadyй').animate({"top":"+=38px"},);
		top = $(".ratadyй").position().top;		
		break;
		case 87:				
		top = $(".ratadyй").position().top;		
		if (top >= 0 && top < 680) $('.ratadyй').animate({"top":"-=38px"},);
		break;
    }		
});
});


















