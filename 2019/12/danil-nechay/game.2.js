var start = function(){
var words = [
"подарки",
"елка",
"рождество",
"новыйгод"
];
var word = words[Math.floor(Math.random()*words.length)];
var answerArray=[];
for(var j =0;j<word.length;j++){
	answerArray[j] = "_";
}
var rl = word.length;
while(rl >0){
	alert(answerArray.join(" "));
	var g = prompt("Напиши любую букву(рускую) или нажми cancel,чтобы выйти из игры"); 
	if(g ===null){
		break;
	}else if(g.length !==1){
		alert("Please enter a single letter");
	}else{
		for(var j =0;j<word.length;j++){
			if(word[j]===g){
				answerArray[j] = g;
				rl--;
			}
		}

	}
	}
alert(answerArray.join(" "));
alert("Молодец!Ответ был"+" "+word);
}