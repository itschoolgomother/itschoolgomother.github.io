let click = 0;


let button = $("#click")
let counter = $("#count")

let rejouer = $(".new")

let tree = $("#tree")

let candy = $("#candy")
let priceCandy = $("#priceCandy")
let priceCandyCane = 200
let NombreCandy = 0	

let ball = $("#ball")
let priceBall = $("#priceBall")
let priceXmasBall = 310
let NombreBall = 0

let star = $("#star")
let guirland = $("#guirland")

let cadeaux	= $("#cadeaux")
let priceCadeau = $("#priceCadeau")
let priceCadeaux = 3500
let NombreCadeau = 0


let monSapin = $(".image2")
let candyCane1 = $("#cane1")
let candyCane2 = $("#cane2")
let candyCane3 = $("#cane3")
let candyCane4 = $("#cane4")
let ball1 = $("#ball1")
let ball2 = $("#ball2")
let ball3 = $("#ball3")
let ball4 = $("#ball4")
let ball5 = $("#ball5")
let guirlandMur = $("#guirlandMur")
let maStar = $("#Star")
let monCadeau1 = $("#cadeau1")
let monCadeau2 = $("#cadeau2")
let monCadeau3 = $("#cadeau3")

let incPrice = 0.5;

priceCandy.html(priceCandyCane);
priceBall.html(priceXmasBall);
priceCadeau.html(priceCadeaux);

let upgrade1 = $(".up1")
let priceUpgrade1 = $("#price1")
let price1 = 40;
priceUpgrade1.html(price1);
let nombreUpgrade1 = 0

let circle1 = $("#circle1")			
let circle2 = $("#circle2")
let circle3 = $("#circle3")
let circle4 = $("#circle4")
let circle5 = $("#circle5")


let upgrade2 = $(".up2")
let nombreUpgrade2 = 1
let priceUpgrade2 = $("#price2")
let price2 = 100
priceUpgrade2.html(price2);

let cursor1 = $("#cursor1")
let cursor2 = $("#cursor2")
let cursor3 = $("#cursor3")
let cursor4 = $("#cursor4")
let cursor5 = $("#cursor5")

counter.html(click + " Cookies");

rejouer.on('click',function() {
    location.reload();
})

button.on('click',function() {
    click ++;
    counter.html(click + " Cookies");
})


upgrade1.on('click', function() {
	if(click >= price1)
	{
		click -= price1;
		counter.html(click + " Cookies");
		nombreUpgrade1 ++;	
		price1 = price1 / incPrice;
		priceUpgrade1.html(price1);
	}

	button.on('click',function() {
    	click += (price1 * incPrice) * 0.1;
    	counter.html(click + " Cookies");
	})


	if(nombreUpgrade1 ==1){
		circle1.css("visibility", "visible"); 
	}
	
	if(nombreUpgrade1 ==2){
		circle2.css("visibility", "visible"); 
	}

	if(nombreUpgrade1 ==3){
		circle3.css("visibility", "visible"); 
	}

	if(nombreUpgrade1 ==4){
		circle4.css("visibility", "visible"); 
	}

	if(nombreUpgrade1 ==5){
		circle5.css("visibility", "visible"); 
	}
})



upgrade2.on('click', function() {
	if(click >= price2)
	{

		click -= price2;
		counter.html(click + " Cookies");
		nombreUpgrade2 ++;
		price2 = price2 / incPrice;
		priceUpgrade2.html(price2);


		if(nombreUpgrade2 == 1){
			cursor1.css("visibility", "visible");		
		}

		if(nombreUpgrade2 == 2){
			cursor2.css("visibility", "visible"); 
		}

		if(nombreUpgrade2 == 3){
			cursor3.css("visibility", "visible");
		}

		if(nombreUpgrade2 == 4){
			cursor4.css("visibility", "visible");		
		}

		if(nombreUpgrade2 == 5){
			cursor5.css("visibility", "visible");
		}


		setInterval(function()
		{
			click = click + 4 * nombreUpgrade2;
			counter.html(click + " Cookies");
		}, 1200);
	}
})



tree.on('click', function() {
	if(click >= 150)
	{
		click -= 90;
		counter.html(click + " Cookies");
		monSapin.css("visibility", "visible");
		tree.attr("disabled", true);
	}
})

star.on('click', function() {
	if(click >= 2000)
	{
		click -= 2000;
		counter.html(click + " Cookies");
		maStar.css("visibility", "visible");
		star.attr("disabled", true);
	}
})

guirland.on('click', function() {
	if(click >= 1800)
	{
		click -= 1800;
		counter.html(click + " Cookies");
		guirlandMur.css("visibility", "visible");
		guirland.attr("disabled", true);
	}
})

candy.on('click', function() {
	if(click >= priceCandyCane)
	{
		click -= priceCandyCane	;
		counter.html(click + " Cookies");
		NombreCandy	++;
		priceCandyCane = priceCandyCane/ incPrice;
		priceCandy.html(priceCandyCane)

		if (NombreCandy == 1){
				candyCane1.css("visibility", "visible");
		}

		if (NombreCandy == 2){
				candyCane2.css("visibility", "visible");
		}

		if (NombreCandy == 3){
				candyCane3.css("visibility", "visible");
		}

		if (NombreCandy == 4){
				candyCane4.css("visibility", "visible");
				candy.attr("disabled", true);
		}
	}
})

ball.on('click', function() {
	if(click >= priceXmasBall)
	{
		click -= priceXmasBall;
		counter.html(click + "Cookies");
		NombreBall	++;
		priceXmasBall = priceXmasBall/ incPrice;
		priceBall.html(priceXmasBall);

		if (NombreBall == 1){
			ball1.css("visibility", "visible");
		}

		if (NombreBall == 2){
			ball2.css("visibility", "visible");
		}

		if (NombreBall == 3){
			ball3.css("visibility", "visible");
		}

		if (NombreBall == 4){
			ball4.css("visibility", "visible");
		}

		if (NombreBall == 5){
			ball5.css("visibility", "visible");
			ball.attr("disabled", true);
		}
	}
})

cadeaux.on('click', function() {
	if(click >= priceCadeaux)
	{
		click -= priceCadeaux	;
		counter.html(click + " Cookies");
		NombreCadeau++;
		priceCadeaux = priceCadeaux/ incPrice;
		priceCadeau.html(priceCadeaux);

		if (NombreCadeau == 1){
			monCadeau1.css("visibility", "visible");
		}

		if (NombreCadeau == 2){
			monCadeau2.css("visibility", "visible");
		}

		if (NombreCadeau == 3){
			monCadeau3.css("visibility", "visible");
			cadeaux.attr("disabled", true);
		}
	}
})


$( function() {
  $(".image2").draggable();
  $(".candycane").draggable();
  $(".cadeau").draggable();
  $(".ball").draggable();
  $(".star").draggable();
  $(".guirland").draggable();
});