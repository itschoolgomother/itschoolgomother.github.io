var canvas = document.getElementById("1_canvas");
var ctx = canvas.getContext("2d");


var leftPressed = false;
var rightPressed = false;
var jumpPressed = false;
var jumpCount = 0;
var jumpLength = 50;
var jumpHeight = 0;

var x = canvas.width/2;
var y = canvas.height-35;
var playerHeight = 100;
var playerWidth = 100;
var playerx = (canvas.width-playerWidth)/2;

var GameTimer = 0;

var CatchedPresents = 0 ;
var BossSpawn = false ;


var sy = 130;
var sx = 0;
var anim_count = 1;
var anim_return = false;

var menu_allow = true;
var shot_clicked = false;
var mage_clicked = false;
var shot_direction = '';

var catch_stops = false;
var win = false;

var hps = 0;
var bossHpBar = 100;

var text = "Catch as many present's as possible";

var presents = [];
var arrows = [];
var penguins = [];
var snowballs = [];
var snowfalls = [];
var ArrowBoss = [];
var hp = [];
var Boss = [];

var background = new Image();
background.src = 'images/background1.png';

var player = new Image();
player.src = 'images/character.png';

var presentImg = new Image();
presentImg.src = 'images/gift_1.png';

var arrowrightimg = new Image();
arrowrightimg.src = 'images/arrow-right.png';

var penguinimg = new Image();
penguinimg.src = 'images/sprPenguinP.png';

var snowballimg = new Image();
snowballimg.src = 'images/Snowball.png';

var snowfallballimg = new Image();
snowfallballimg.src = 'images/Snowballfall.png';

var Bossimg = new Image();
Bossimg.src = 'images/Boss.png';

var hpimg = new Image();
hpimg.src = 'images/present-hp.png';

var ArrowBossImage = new Image();
ArrowBossImage.src = 'images/Arrow_down.png';

var audio1 = new Audio('audio/snow_about_a_castle.mp3');
var audio2 = new Audio('audio/Archers-shooting.flac');
var audio3 = new Audio('audio/hit.mp3');
var audio4 = new Audio('audio/spell_cast.flac');


document.addEventListener("keydown", keyRightHandler, false);
document.addEventListener("keyup", keyLeftHandler, false);

function keyRightHandler(e){
    if(e.keyCode == 39){
        shot_direction = 'right';
        rightPressed = true;
        shot_clicked = false;
        mage_clicked = false;
    }
    if(e.keyCode == 37){
        shot_direction = 'left';
        leftPressed = true;
        shot_clicked = false;
        mage_clicked = false;

    }
    if(e.keyCode == 38){
        jumpPressed = true;
    }

    if(e.keyCode == 83){
        shot_clicked = true;
        mage_clicked = false;

    }
    if(e.keyCode == 87){
        mage_clicked = true;
        shot_clicked = false;

    }

}

function keyLeftHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }
    if(e.keyCode == 37){
        leftPressed = false;
    }

}

function draw() {
    if (menu_allow){
        audio1.play();
    }
    if (!menu_allow) {

        audio1.src = "";

        GameTimer++;

        if (CatchedPresents % 10 === 0){
            CatchedPresents++;
            hp.push({
                    x: 80 * hps + 10,
                    y: 10,
                    del: hps
                });
            hps++;
        }

        if (GameTimer % 3000 === 0 && !catch_stops) {
            catch_stops = true;
        }
        if (rightPressed && playerx < canvas.width - playerWidth) {
            playerx += 7;
            sy = 710;
            if (GameTimer % 2 === 0) {
                anim_count++;
            }
            sx = 63 * anim_count;
            if (anim_count >= 8) {
                anim_count = 1;
            }
        } else if (leftPressed && playerx > 0) {
            playerx -= 7;
            sy = 580;
            if (GameTimer % 2 === 0) {
                anim_count++;
            }
            sx = 63 * anim_count;
            if (anim_count >= 8) {
                anim_count = 1;
            }
        }
        if (!leftPressed && !rightPressed && !shot_clicked && !mage_clicked) {
            sy = 900;
            if (GameTimer % 15 === 0 && !anim_return) {
                anim_count++;
            }
            if (GameTimer % 15 === 0 && anim_return) {
                anim_count--;
            }
            if (anim_count <= 1) {
                anim_return = false;
            }
            if (anim_count >= 5) {
                anim_return = true;
            }
            sx = 63 * anim_count;
        }
        if (jumpPressed) {
            jumpCount++;
            jumpHeight = 4 * jumpLength * Math.sin(Math.PI * jumpCount / jumpLength);
        }
        if (jumpCount > jumpLength) {
            jumpCount = 0;
            jumpPressed = false;
            jumpHeight = 0;
        }
        if (shot_clicked) {
            if (GameTimer % 15 === 0) {
                anim_count++;
            }
            if (anim_count >= 10 && !win) {
                audio2.play();
                if (shot_direction === "right") {
                    arrows.push({
                        x: playerx + 45,
                        y: canvas.height - playerHeight - jumpHeight + 37,
                        dx: 10,
                        dy: 0,
                        damage: 2
                    });
                }
                if (shot_direction === "left") {
                    arrowrightimg.src = 'images/arrow-left.png';
                    arrows.push({
                        x: playerx + 45,
                        y: canvas.height - playerHeight - jumpHeight + 37,
                        dx: -10,
                        dy: 0,
                        damage: 2
                    });
                }
                anim_count = 0;
            }
            sx = 64 * anim_count;
            if (shot_direction === 'left') {
                sy = 1090;

            }
            if (shot_direction === 'right') {
                sy = 1220;

            }
        }
        for (j in arrows) {
            arrows[j].x = arrows[j].x + arrows[j].dx;
            arrows[j].y = arrows[j].y + arrows[j].dy;
            if (arrows[j].x < -30 && arrows[j].x > canvas.width + 50) {
                arrows.splice(j, 1);
            }
        }
        if (mage_clicked) {
            sy = 130;
            if (GameTimer % 15 === 0) {
                anim_count++;
            }
            if (anim_count >= 7) {
                anim_count = 0;
            }
            sx = 64 * anim_count;
        }

        //                                          Спавн подарков
        function spawn_present() {
            presents.push({
                del: 0,
                x: Math.random() * canvas.width,
                y: -80,
                dx: Math.random() * +-2,
                dy: Math.random() * 2 + 1
            });
        }

        if (GameTimer % 30 === 0 && !catch_stops) {
            spawn_present();
        }
        //                                          Движение подарков
        for (i in presents) {
            presents[i].x = presents[i].x + presents[i].dx;
            presents[i].y = presents[i].y + presents[i].dy;
            //                                     Удаление не собраных подарков
            if (presents[i].x >= canvas.width || presents[i].x < 0) presents[i].dx = -presents[i].dx;
            if (presents[i].y >= canvas.height + 100) presents.splice(i, 1);

        }
        //                                    столкновение подарка и игрока

        for (let h in presents) {
            if (playerx < presents[h].x + (30) &&
                playerx + (80) > presents[h].x &&
                canvas.height - playerHeight - jumpHeight < presents[h].y + (40) &&
                canvas.height - playerHeight - jumpHeight + (80) > presents[h].y) {
                presents.splice(h, 1);
                CatchedPresents++;
            }
        }
    }
    if (catch_stops) {
        function spawn_penguin() {
            penguins.push({
                    sxx: 70,
                    syy: 5,
                    x: Math.random() * canvas.width,
                    y: 0,
                    hp: Math.floor(Math.random() * 2),
                    w: 65,
                    h: 100,
                    snowy: Math.floor(canvas.height - 100 - Math.random() * 60),
                    shot_coldown: 0,
                    shot_started: false,
                    shot_anim_count: 1,
                    penguin_placed: false,
                    dx: Math.floor(Math.random() * 10)
                }
            )
        }

        if (GameTimer % 300 === 0 && penguins.length <= 5 && !BossSpawn) {
            spawn_penguin();
        }
        for (let g in penguins) {
            if (penguins[g].y < penguins[g].snowy) {
                penguins[g].y += 10;
            }
            if (penguins[g].y === penguins[g].snowy) {
                if (penguins[g].penguin_placed === false) {
                    penguins[g].syy = 40;
                    penguins[g].sxx = 40;
                    penguins[g].penguin_placed = true
                }
                penguins[g].shot_coldown++;
                if (penguins[g].shot_coldown % 200 === 0) {
                    penguins[g].shot_started = true;
                    penguins[g].syy = 5;
                    penguins[g].sxx = 100;
                }

                if (penguins[g].shot_started && penguins[g].dx <= 5) {
                    if (GameTimer % 15 === 0) {
                        penguins[g].shot_anim_count++;
                    }
                    penguins[g].sxx = 100 + 30 * penguins[g].shot_anim_count;
                    if (penguins[g].shot_anim_count >= 5) {
                        snowballs.push({x: penguins[g].x + 10, y: penguins[g].y + 7, dx: 5, dy: 0})
                    }
                }
                if (penguins[g].dx > 5 && penguins[g].shot_started) {
                    if (GameTimer % 15 === 0) {
                        penguins[g].shot_anim_count++;
                    }
                    penguins[g].syy = 100;

                    penguins[g].sxx = 225 - 30 * penguins[g].shot_anim_count;
                    if (penguins[g].shot_anim_count >= 5) {
                        snowballs.push({x: penguins[g].x - 10, y: penguins[g].y + 7, dx: -5, dy: 0})
                    }
                }
                if (penguins[g].shot_anim_count >= 5) {
                    penguins[g].shot_anim_count = 0;
                    penguins[g].syy = 40;
                    penguins[g].sxx = 38;
                    penguins[g].shot_started = false;
                    penguins[g].dx = Math.floor(Math.random() * 10);
                }
            }
            if (penguins[g].y < penguins[g].snowy) {
                penguins[g].y++;
            }
            if (penguins[g].y > penguins[g].snowy) {
                penguins[g].y--;
            }

            for (a in arrows) {
                if (penguins[g].x - 10 < arrows[a].x + (penguins[g].w - 20) &&
                    penguins[g].x + (penguins[g].w - 15) > arrows[a].x &&
                    penguins[g].y < arrows[a].y + (penguins[g].h - 5) &&
                    penguins[g].y + (penguins[g].h - 5) > arrows[a].y) {
                    penguins[g].hp -= arrows[a].damage;
                    arrows.splice(a, 1);
                }
            }
            if (penguins[g].hp <= 0) {
                penguins.splice(g, 1);
            }
        }
        // Движение снежков
        for (s in snowballs) {
            snowballs[s].x = snowballs[s].x + snowballs[s].dx;
            snowballs[s].y = snowballs[s].y + snowballs[s].dy;

            if (snowballs[s].x >= canvas.width || snowballs[s].x < 0) snowballs.splice(s, 1)

            if (playerx < snowballs[s].x + (30) &&
                playerx + (80) > snowballs[s].x &&
                canvas.height - playerHeight - jumpHeight < snowballs[s].y + (5) &&
                canvas.height - playerHeight - jumpHeight + (80) > snowballs[s].y) {
                snowballs.splice(s, 1);
                for (let h in hp) {
                    if (hp[h].del + 1 === hps) {
                        console.log('a');
                        hp.splice(h, 1);
                        hps--;
                        CatchedPresents-= 10;
                        audio3.play();
                    }
                }
            }
        }

        if (hp.length <= 0) {
            menu_allow = true;
            document.getElementById('background_deny').setAttribute('id', 'background');
            document.getElementById('1_canvas').setAttribute('class', 'can_deny');
            audio1.src = 'audio/snow_about_a_castle.mp3';
            GameTimer = 0;
            catch_stops = false;
            for (g in penguins) {
                penguins.splice(g, penguins.length);
            }
            for (s in snowballs) {
                snowballs.splice(s, snowballs.length);
            }
            for (sf in snowfalls) {
                snowfalls.splice(sf, snowfalls.length);
            }
            for (b in Boss) {
                Boss.splice(b, 1);
            }
            for (ab in ArrowBoss) {
                ArrowBoss.splice(ab, ArrowBoss.length);
            }
            BossSpawn = false;
            bossHpBar = 100;
            Location.reload();

        }
        if (GameTimer % 60 === 0 && !BossSpawn) {
            snowfalls.push({
                del: 0,
                x: Math.random() * canvas.width - 80,
                y: -100,
                dx: Math.random() * +-2,
                dy: Math.random() * 5 + 3,
            });
        }
        for (sf in snowfalls) {
            snowfalls[sf].x = snowfalls[sf].x + snowfalls[sf].dx;
            snowfalls[sf].y = snowfalls[sf].y + snowfalls[sf].dy;

            if (playerx < snowfalls[sf].x + (30) &&
                playerx + (80) > snowfalls[sf].x &&
                canvas.height - playerHeight - jumpHeight < snowfalls[sf].y + (40) &&
                canvas.height - playerHeight - jumpHeight + (80) > snowfalls[sf].y) {
                snowfalls.splice(sf, 1);
                for (let h in hp) {
                    if (hp[h].del + 1 === hps) {
                        console.log('a');
                        hp.splice(h, 1);
                        hps--;
                        audio3.play();
                        CatchedPresents -= 10;
                    }
                }
            }
            if (snowfalls[sf].y > canvas.height + 100){
                snowfalls.splice(sf, 1)
            }
        }
        if (GameTimer % 6000 === 0 && !BossSpawn){
            Boss.push({
                    sx: 320,
                    sy: 130,
                    x: canvas.width/2,
                    y: 0,
                    hp: 200,
                    w: 150,
                    h: 200,
                    shot_coldown: 0,
                    anim_count: 1,
                    Boss_placed: false,
                    Boss_placedx: canvas.height-200,
                    dx: Math.floor(Math.random() * 11),
                    boss_cast_spell: false,
                    speed:5,
                    boss_atack_type:Math.floor(Math.random() * 2)
                }
            );
            BossSpawn = true
        }
    }
    if (BossSpawn){
        for (b in Boss){
            if (Boss[b].y < Boss[b].Boss_placedx) {
                Boss[b].y += 5;
            }
            if (Boss[b].y === Boss[b].Boss_placedx) {
                if (Boss[b].Boss_placed === false) {
                    Boss[b].sy = 390;
                    Boss[b].sx = 200;
                    Boss[b].Boss_placed = true
                }
            }
            if (Boss[b].Boss_placed && Boss[b].hp > 0){
                if (Boss[b].dx <= 5){
                    Boss[b].move_l_r = 'left';
                }
                if (Boss[b].dx >= 6){
                    Boss[b].move_l_r = 'right';
                }
                if (GameTimer % 400 === 0 && Boss[b].hp > 0){
                    Boss[b].boss_cast_spell = true;
                    Boss[b].anim_count = 1;
                }
                if (GameTimer % 10 === 0) {
                    Boss[b].anim_count++;
                }
            }
            if (Boss[b].move_l_r === 'left' && !Boss[b].boss_cast_spell && Boss[b].hp > 0){
                Boss[b].x -= Boss[b].speed;
                Boss[b].sy = 580;
                Boss[b].sx = 0;
                Boss[b].sx = 63 * Boss[b].anim_count;
                if (Boss[b].anim_count >= 8) {
                    Boss[b].anim_count = 0;
                }
            }
            if (Boss[b].move_l_r === 'right' && !Boss[b].boss_cast_spell && Boss[b].hp > 0){
                Boss[b].x += Boss[b].speed;
                Boss[b].sy = 710;
                Boss[b].sx = 0;
                Boss[b].sx = 63 * Boss[b].anim_count;
                if (Boss[b].anim_count >= 8) {
                    Boss[b].anim_count = 0;
                }
            }
            if (Boss[b].x >= canvas.width){
                Boss[b].dx = Math.floor(Math.random() * 5);
            }
            if (Boss[b].x < 0){
                Boss[b].dx = Math.floor(Math.random() * 10 + 5);
            }
            if (Boss[b].boss_cast_spell){
                Boss[b].speed = 0 ;
                Boss[b].sy = 130;
                audio4.play();
                if (Boss[b].anim_count >= 7) {
                    Boss[b].boss_cast_spell = false;
                    Boss[b].speed = 5;
                    Boss[b].dx= Math.floor(Math.random() * 11);
                    Boss[b].boss_atack_type = Math.floor(Math.random() * 3);
                    if (Boss[b].boss_atack_type === 1){
                        spawn_penguin();
                        spawn_penguin();
                        spawn_penguin();
                    }
                    Boss[b].anim_count = 1;
                    if (Boss[b].dx <= 5){
                        Boss[b].move_l_r = 'left';
                    }
                    if (Boss[b].dx >= 6){
                        Boss[b].move_l_r = 'right';
                    }
                }
                Boss[b].sx = 64 * Boss[b].anim_count;
            }
            if (Boss[b].boss_atack_type === 0){
                if (GameTimer % 30 === 0) {
                    snowfalls.push({
                        del: 0,
                        x: Math.random() * canvas.width - 80,
                        y: -100,
                        dx: Math.random() * +-2,
                        dy: Math.random() * 5 + 3,
                    });
                }
            }
            if (Boss[b].boss_atack_type === 2){
                if (GameTimer % 30 === 0) {
                    ArrowBoss.push({
                        x: playerx + playerWidth / 2,
                        y: -100,
                        dy:8,
                    });
                }
            }
            for (ab in ArrowBoss){
                ArrowBoss[ab].y += ArrowBoss[ab].dy

                if (playerx < ArrowBoss[ab].x + (7) &&
                    playerx + (80) > ArrowBoss[ab].x &&
                    canvas.height - playerHeight - jumpHeight < ArrowBoss[ab].y + (5) &&
                    canvas.height - playerHeight - jumpHeight + (80) > ArrowBoss[ab].y) {
                    ArrowBoss.splice(ab, 1);
                    for (let h in hp) {
                        if (hp[h].del + 1 === hps) {
                            console.log('a');
                            hp.splice(h, 1);
                            hps--;
                            CatchedPresents -= 10;
                            audio3.play();
                        }
                    }
                }
            }
            for (a in arrows) {
                if (Boss[b].x - 40 < arrows[a].x + (Boss[b].w - 20) &&
                    Boss[b].x- 40 + (Boss[b].w - 20) > arrows[a].x - 15 &&
                    Boss[b].y < arrows[a].y + (Boss[b].h) &&
                    Boss[b].y + 30 + (Boss[b].h) > arrows[a].y) {
                    Boss[b].hp -= 10;
                    bossHpBar -= 5;
                    arrows.splice(a, 1);
                }
            }
            if (Boss[b].hp === 0){
                Boss[b].hp --;
                Boss[b].anim_count = 0;
            }
            if (Boss[b].hp <= 0){
                if (GameTimer % 15 === 0){
                    Boss[b].anim_count++;
                }
                Boss[b].sy = 1290;
                if (Boss[b].anim_count <= 5) {
                    Boss[b].sx += 63 * Boss[b].anim_count;
                }
                if (Boss[b].anim_count >= 6){
                    Boss[b].sx = 325;
                }
                if (Boss[b].anim_count >= 15){
                    win = true;
                    Boss[b].anim_count = "";
                }
            }
        }
        if (win){
            document.getElementById('can').setAttribute('class', 'can_hidden');
            document.getElementById('win_menu').setAttribute('class', 'win_allow')
        }
        document.getElementById('bossbar').style.width = bossHpBar + "%";
    }
    buttons();
    render();
}


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    ctx.font = 'bold 30px Brush Script MT, Brush Script Std, cursive';
    for (i in presents) ctx.drawImage(presentImg, presents[i].x, presents[i].y, 80, 80);
    for (j in arrows) ctx.drawImage(arrowrightimg, arrows[j].x, arrows[j].y, 45, 15);
    for (s in snowballs) ctx.drawImage(snowballimg, snowballs[s].x, snowballs[s].y, 30, 30);
    for (sf in snowfalls) ctx.drawImage(snowfallballimg, snowfalls[sf].x, snowfalls[sf].y, 80, 80);
    if (penguins.length >= 1) {
        for (g in penguins) ctx.drawImage(penguinimg, penguins[g].sxx, penguins[g].syy, 30, 25, penguins[g].x, penguins[g].y, penguins[g].w, penguins[g].h);
    }
    for (ab in ArrowBoss) ctx.drawImage(ArrowBossImage, ArrowBoss[ab].x, ArrowBoss[ab].y, 15, 45);
    if (Boss.length >= 1) {
        for (b in Boss) ctx.drawImage(Bossimg, Boss[b].sx, Boss[b].sy, 60, 60,Boss[b].x,Boss[b].y, Boss[b].w, Boss[b].h);
    }
    ctx.drawImage(player,sx,sy,60,60, playerx, canvas.height-playerHeight-jumpHeight,  playerWidth, playerHeight);
    ctx.fillText(`${CatchedPresents}`, canvas.width - 100, canvas.height - 40);
    for (h in hp) ctx.drawImage(hpimg, hp[h].x, hp[h].y, 80, 80);
}
function buttons() {
    document.getElementById('click').onclick = function() {
        document.getElementById('background').setAttribute('id', 'background_deny');
        document.getElementById('can').setAttribute('class', 'can_allow');
        CatchedPresents = 0;
        menu_allow = false;
    };
    document.getElementById('Gui_button').onclick = function() {
        document.getElementById('background').setAttribute('id', 'background_deny');
        document.getElementById('Gui').setAttribute('class', 'gui_allow')
    };
    document.getElementById('back_gui_menu').onclick = function() {
        document.getElementById('background_deny').setAttribute('id', 'background');
        document.getElementById('Gui').setAttribute('class', 'gui_deny')
    }
}
setInterval(draw, 10);

