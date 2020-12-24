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
const w_h = 100;
const h_h = 137;

var number_shot = 0;
var x = 25;
var y = 0;
var sy = 0;
var x_bg = 0;
var direction = right;
var timer = 0;
var stay = true;
var go = false;
var keyPresses = {};
var fly = false;
var fly_delay = 2000;
var shot_boss = [{x:4000,y:10000,sx:-10},{x:4000,y:10000,sx:-10},{x:4000,y:10000,sx:-10},{x:4000,y:10000,sx:-10}]
var shot_snowman1 = {
  x:4000,
  y:10000,
  sx:-5
}
var shot_snowman2 = {
  x:4000,
  y:10000,
  sx:-5
}
var shot_snowman3 = {
  x:4000,
  y:10000,
  sx:-5
}
var shot = {
  x:4000,
  y:10000,
  sx:5
};
var snowman1 = {
  x:3000,
  y:750,
  sy:-2,
  dx:0,
  dy:0
}
var sx_snowman = 0;
var hp = 100;
var snowman2 = {
  x:5000,
  y:750,
  sy:-2,
  dx:0,
  dy:0
}
var snowman3 = {
  x:7000,
  y:750,
  sy:-2,
  dx:0,
  dy:0
}
var boss = {
  x:9000,
  y:400,
  hp:100,
  dx:0,
  dy:0
}
function hero(){
  if (hp<=0) {
    document.getElementById("defeat").style.display = "block"
    requestAnimationFrame(hero)
    return;
  }
  if (x+w_h>snowman1.x&&y+800+h_h>snowman1.y&&x<snowman1.x+w_sn&&y+800<snowman1.y+h_sn) {
    hp=0
  }
  if (x+w_h>snowman2.x&&y+800+h_h>snowman2.y&&x<snowman2.x+w_sn&&y+800<snowman2.y+h_sn) {
    hp=0
  }
  if (x+w_h>snowman3.x&&y+800+h_h>snowman3.y&&x<snowman3.x+w_sn&&y+800<snowman3.y+h_sn) {
    hp=0
  }
  if (x+w_h>boss.x&&y+800+h_h>boss.y&&x<boss.x+w_b&&y+800<boss.y+h_b) {
    hp=0
  }

  if (shot_snowman1.x+w_sh>x&&shot_snowman1.y+h_sh>y+800&&shot_snowman1.x<x+w_h&&shot_snowman1.y<y+h_h+800) {
    hp-=25
    shot_snowman1.y=4000
  }
  if (shot_snowman2.x+w_sh>x&&shot_snowman2.y+h_sh>y+800&&shot_snowman2.x<x+w_h&&shot_snowman2.y<y+h_h+800) {
    hp-=25
    shot_snowman2.y=4000
  }
  if (shot_snowman3.x+w_sh>x&&shot_snowman3.y+h_sh>y+800&&shot_snowman3.x<x+w_h&&shot_snowman3.y<y+h_h+800) {
    hp-=25
    shot_snowman3.y=4000
  }
  if (shot_boss[0].x+w_sh>x&&shot_boss[0].y+h_sh>y+800&&shot_boss[0].x<x+w_h&&shot_boss[0].y<y+h_h+800) {
    hp-=25
    shot_boss[0].y=4000
  }
  if (shot_boss[1].x+w_sh>x&&shot_boss[1].y+h_sh>y+800&&shot_boss[1].x<x+w_h&&shot_boss[1].y<y+h_h+800) {
    hp-=25
    shot_boss[1].y=4000
  }
  if (shot_boss[2].x+w_sh>x&&shot_boss[2].y+h_sh>y+800&&shot_boss[2].x<x+w_h&&shot_boss[2].y<y+h_h+800) {
    hp-=25
    shot_boss[2].y=4000
  }
  if (shot_boss[3].x+w_sh>x&&shot_boss[3].y+h_sh>y+800&&shot_boss[3].x<x+w_h&&shot_boss[3].y<y+h_h+800) {
    hp-=25
    shot_boss[3].y=4000
  }
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
    sy= 8
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

function Boss(){
  if (shot.x+w_sh>boss.x&&shot.y+h_sh>boss.y&&shot.x<boss.x+w_b&&shot.y<boss.y+h_b) {
    shot.y=10000
    boss.hp-=20
  }
  if (boss.hp==0) {
    document.getElementById("boss").style.display = "none";
    document.getElementById("win").style.display = "block"
  }
  shot_boss[0].x+=shot_boss[0].sx
  shot_boss[1].x+=shot_boss[1].sx
  shot_boss[2].x+=shot_boss[2].sx
  shot_boss[3].x+=shot_boss[3].sx
  document.getElementById("shot1-boss").style.left = shot_boss[0].x*1.4+"px"
  document.getElementById("shot1-boss").style.top = shot_boss[0].y+"px"
  document.getElementById("shot2-boss").style.left = shot_boss[1].x*1.4+"px"
  document.getElementById("shot2-boss").style.top = shot_boss[1].y+"px"
  document.getElementById("shot3-boss").style.left = shot_boss[2].x*1.4+"px"
  document.getElementById("shot3-boss").style.top = shot_boss[2].y+"px"
  document.getElementById("shot4-boss").style.left = shot_boss[3].x*1.4+"px"
  document.getElementById("shot4-boss").style.top = shot_boss[3].y+"px"
  document.getElementById("boss").style.left = boss.x*1.4+"px"
  document.getElementById("hp-boss").style.width = boss.hp*5+"px"
  document.getElementById("hp-boss2").style.width = boss.hp*5+"px"
  requestAnimationFrame(Boss)
}
Boss()

function snowmans(){
  snowman1.x+=sx_snowman
  snowman2.x+=sx_snowman
  snowman3.x+=sx_snowman
  boss.x+=sx_snowman
  if (shot.x+w_sh>snowman1.x&&shot.y+h_sh>snowman1.y&&shot.x<snowman1.x+w_sn&&shot.y<snowman1.y+h_sn) {
    snowman1.y=4000
    shot.y=10000
    document.getElementById("snowman1").style.display = "none"
  }
  if (shot.x+w_sh>snowman2.x&&shot.y+h_sh>snowman2.y&&shot.x<snowman2.x+w_sn&&shot.y<snowman2.y+h_sn) {
    snowman2.y=4000
    shot.y=10000
    document.getElementById("snowman2").style.display = "none"
  }
  if (shot.x+w_sh>snowman3.x&&shot.y+h_sh>snowman3.y&&shot.x<snowman3.x+w_sn&&shot.y<snowman3.y+h_sn) {
    snowman3.y=4000
    shot.y=10000
    shot.x=4000
    document.getElementById("snowman3").style.display = "none"
  }
  
  if (snowman1.y>=innerHeight-500||snowman1.y<=1) {
    snowman1.sy=-snowman1.sy
  }
  if (snowman2.y>=innerHeight-500||snowman2.y<=1) {
    snowman2.sy=-snowman2.sy
  }
  if (snowman3.y>=innerHeight-500||snowman3.y<=1) {
    snowman3.sy=-snowman3.sy
  }
  shot_snowman1.x+=shot_snowman1.sx
  shot_snowman2.x+=shot_snowman2.sx
  shot_snowman3.x+=shot_snowman3.sx
  snowman1.y+=snowman1.sy
  snowman2.y+=snowman2.sy
  snowman3.y+=snowman3.sy
  document.getElementById("snowman1").style.left = snowman1.x*1.4+"px"
  document.getElementById("snowman2").style.left = snowman2.x*1.4+"px"
  document.getElementById("snowman3").style.left = snowman3.x*1.4+"px"
  document.getElementById("snowman1").style.top = snowman1.y+"px"
  document.getElementById("snowman2").style.top = snowman2.y+"px"
  document.getElementById("snowman3").style.top = snowman3.y+"px"
  document.getElementById("shot-snowman1").style.left = shot_snowman1.x*1.4+"px"
  document.getElementById("shot-snowman1").style.top = shot_snowman1.y+"px"
  document.getElementById("shot-snowman2").style.left = shot_snowman2.x*1.4+"px"
  document.getElementById("shot-snowman2").style.top = shot_snowman2.y+"px"
  document.getElementById("shot-snowman3").style.left = shot_snowman3.x*1.4+"px"
  document.getElementById("shot-snowman3").style.top = shot_snowman3.y+"px"
  requestAnimationFrame(snowmans)
}
snowmans()

function shot_snomans(){
  if (snowman1.x<=innerWidth-50) {
  shot_snowman1.x = snowman1.x
  shot_snowman1.y = snowman1.y+50
}
  if (snowman2.x<=innerWidth-50) {
  shot_snowman2.x = snowman2.x
  shot_snowman2.y = snowman2.y+50
}
  if (snowman3.x<=innerWidth-50) {
  shot_snowman3.x = snowman3.x
  shot_snowman3.y = snowman3.y+50
} 
}
setInterval(shot_snomans,2500)

function fly_snomans(){
  snowman1.sy = -snowman1.sy
  snowman2.sy = -snowman2.sy
  snowman3.sy = -snowman3.sy
  fly_delay = -2000*Math.random()+4000
  setTimeout(fly_snomans,fly_delay) 
}
fly_snomans()

function shot_Boss(){
  number_shot++
  if (number_shot>=3) {
    number_shot=0
  }
  if (boss.x<=innerWidth) {
  shot_boss[number_shot].x=boss.x
  shot_boss[number_shot].y=-520*Math.random()+600+400
  }
}
setInterval(shot_Boss,300)
function bg(){
  if (hp<=0) {
    requestAnimationFrame(hero)
    return;
  }
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
  if (hp==0) {
    requestAnimationFrame(move)
    return;
  }
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