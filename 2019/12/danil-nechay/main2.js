var j = 0;
var m = function(){
	for(var b = 0;b<100;b++){
	$("#k").slideUp(3000);
	$("#k").slideDown(3000);
	$("#l").fadeOut(3000);
	$("#l").fadeIn(3000);
	$("#g").slideUp(3000);
	$("#g").slideDown(3000);
}
	$("#h").offset({left:j});
	j++;
if(j>700){
	j=0;
}
};
setInterval(m,30);
var r  = function(){
	var sound = document.createElement('audio');
    sound.src = 'http://download-sounds.ru/wp-content/uploads3/2012/11/BoneyM-JingleBells.mp3';
    sound.play();

}

function v(){
  document.getElementById("d").style.display = "block";
};