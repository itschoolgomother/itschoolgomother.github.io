window.addEventListener("keydown",function(){
  keyPresses["key"+event.keyCode] = true
})

window.addEventListener("keyup",function(){
  keyPresses["key"+event.keyCode] = false
})

const right = 0;
const left = 1;
const maxShots = 35;
const w_sh = 20;
const h_sh = 20;
const w_sn = 116;
const h_sn = 179;
const w_b = 407;
const h_b = 629;

var y = 0;
var sy = 0;
var x_bg = 0;
var direction = right;
var stay = true;
var go = false;
var keyPresses = {};
var frame = 0;
var fly = false;
var shot = {
  s:false,
  x:4000,
  y:10000,
  sx:5
};
var snowman = {
  x:3000,
  y:750
}
var sx_snowman = 0;
var hp = 100;
var snowman2 = {
  x:5000,
  y:750
}
var snowman3 = {
  x:7000,
  y:750
}
var boss = {
  x:9000,
  y:400,
  hp:100
}
function hero(){
  if (stay) {if(direction==right){document.getElementById("hero").innerHTML = "<img src='../img/stay-right.png'>"}
            if (direction==left) {document.getElementById("hero").innerHTML = "<img src='../img/stay-left.png'>"}
          }
  if (go) {if(direction==right){document.getElementById("hero").innerHTML = "<img src='../gifs/go-right.gif'>"}
            if (direction==left) {document.getElementById("hero").innerHTML = "<img src='../gifs/go-left.gif'>"}
          }
  if (shot.x>=innerWidth) {shot.y=10000}
  if(shot.x<=innerWidth){shot.x+=shot.sx;}
              
  if (fly){
    if(direction==right){document.getElementById("hero").innerHTML = "<img src='../img/fly-right.png'>"}
    if (direction==left) {document.getElementById("hero").innerHTML = "<img src='../img/fly-left.png'>"}
    // if (sy==0) {
    sy= 8
    // }
  }
  y-=sy
  y*=0.991
  sy/=2
  document.getElementById("hero").style.top = 800+y+"px"
  document.getElementById("shot").style.left = shot.x*1.4+"px"
  document.getElementById("shot").style.top = shot.y+"px"
  document.getElementById("shot").style.backgroundImage = "url(../img/snowball.png)"
  requestAnimationFrame(hero)
}
hero()

function snowmans(){
  snowman.x+=sx_snowman
  snowman2.x+=sx_snowman
  snowman3.x+=sx_snowman
  boss.x+=sx_snowman
  if (shot.x+w_sh>snowman.x&&shot.y+h_sh>snowman.y&&shot.x<snowman.x+w_sn&&shot.y<snowman.y+h_sn) {
    // alert()
    shot.y=10000
    document.getElementById("snowman1").style.display = "none"
  }
  if (shot.x+w_sh>snowman2.x&&shot.y+h_sh>snowman2.y&&shot.x<snowman2.x+w_sn&&shot.y<snowman2.y+h_sn) {
    // alert()
    shot.y=10000
    document.getElementById("snowman2").style.display = "none"
  }
  if (shot.x+w_sh>snowman3.x&&shot.y+h_sh>snowman3.y&&shot.x<snowman3.x+w_sn&&shot.y<snowman3.y+h_sn) {
    // alert()
    shot.y=10000
    shot.x=4000
    document.getElementById("snowman3").style.display = "none"
  }
  if (shot.x+w_sh>boss.x&&shot.y+h_sh>boss.y&&shot.x<boss.x+w_b&&shot.y<boss.y+h_b) {
    // alert()
    shot.y=10000
    boss.hp-=20
  }
  if (boss.hp==0) {document.getElementById("boss").style.display = "none";
                  document.getElementById("win").style.display = "block"}
  document.getElementById("snowman1").style.left = snowman.x*1.4+"px"
  document.getElementById("snowman2").style.left = snowman2.x*1.4+"px"
  document.getElementById("snowman3").style.left = snowman3.x*1.4+"px"
  document.getElementById("boss").style.left = boss.x*1.4+"px"
  document.getElementById("hp-boss").style.width = boss.hp*10+"px"
  requestAnimationFrame(snowmans)
}
snowmans()

function bg(){
  document.getElementById("sky").style.backgroundPosition = x_bg+"px 0px"
  document.getElementById("mountains").style.backgroundPosition = x_bg*1.2+"px 0px"     
  document.getElementById("ground").style.backgroundPosition = x_bg*1.4+"px 0px" 
  requestAnimationFrame(bg)
}
bg()

function information(){
  document.getElementById("hp").style.width = hp*5+"px"
  document.getElementById("hp2").style.width = hp*5+"px"
  if (shot.x>=innerWidth) {
  document.getElementById("shooting").innerHTML = "Shooting: ready"
}
else if (shot.x<=innerWidth) {
  document.getElementById("shooting").innerHTML = "Shooting: not ready"
}
  
  requestAnimationFrame(information)
}
information()

function move(){
  //enter
  if (keyPresses.key13) {
    shot.s=true
    if (shot.x>=innerWidth) {
      shot.y=y+870;
      shot.x=100
    }
    
  }
  // else if (keyPresses.key13==false) {
  //   shot.s=false
  // }
  //up
  if (keyPresses.key87) {
    fly=true
  }
  else if(keyPresses.key87==false){
    fly=false
  }
  //right
  if (keyPresses.key68) {
    x_bg-=3
    direction = right
    stay=false
    go=true
    shot.sx=2
    sx=0.1 
    sx_snowman=-3
  }
  //left
  if(keyPresses.key65){
    x_bg+=3
    direction = left
    stay=false
    go=true
    shot.sx=7
    sx=-0.1
    sx_snowman=3 
  }
  if(keyPresses.key65==false&&keyPresses.key68==false){
    stay=true
    go=false
    shot.sx=5
    sx_snowman=0
  }

  
  requestAnimationFrame(move)
}
move()