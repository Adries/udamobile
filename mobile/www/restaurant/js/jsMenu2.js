var nbelt, i, html="", jsonResto, lat, lon, mapOptions, requeteItineraire, directionsService = new google.maps.DirectionsService(), map, address, end, Radresse, Rcode_postal; 
var Rdescription, nomResto, day = new Array(), today = new Date(), m, numero=today.getDate(), jour, month;

window.applicationCache.update();
alert(window.applicationCache.status);	

function init_itineraire(lat,lan) {
	end = new google.maps.LatLng(lat,lan);
	getLocation();
}

function getLocation() {
	$("#mapholder").css({ opacity: 0, zoom: 0 });
	if (navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(showPosition,showError);
		}
	else{x.innerHTML="Geolocation is not supported by this browser.";}
}

function showPosition(position) {
	address = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);		
	initialize();
	$('#mapholder').show();
	$("#mapholder").css({ opacity: 1, zoom: 1 });
}

function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			x.innerHTML = 'User denied the request for Geolocation.';
			break;
		case error.POSITION_UNAVAILABLE:
			x.innerHTML = 'Location information is unavailable.';
			break;
		case error.TIMEOUT:
			x.innerHTML = 'The request to get user location timed out.';
			break;
		case error.UNKNOWN_ERROR:
			x.innerHTML = 'An unknown error occurred.';
			break;
	}
}

function initialize() {
     directionsDisplay = new google.maps.DirectionsRenderer();
     var optionsCarte = {
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: address,
				mapTypeControlOptions: 
				{
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position: google.maps.ControlPosition.TOP_LEFT
				}
	};
     map = new google.maps.Map(document.getElementById("mapholder"), optionsCarte);
     directionsDisplay.setMap(map);
     directionsDisplay.setPanel(document.getElementById("addressText"));
     var requeteItineraire = {
          origin: address,
          destination: end,
          region: "fr",
			travelMode: google.maps.DirectionsTravelMode.DRIVING
     };
     directionsService.route(requeteItineraire, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
               directionsDisplay.setDirections(response);
          }
	});
}

//fonction qui met en place la liste des restaurants
function makeList(json) {
	html="";
	jsonResto = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);
	if(jsonResto.code_retour == "ok") {
		nbelt=jsonResto.count;
		if( nbelt > 0 ) {		
			for(i=0; i<nbelt;i++) {
				html +="<li class=\"ui-btn ui-btn-up-a ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child\" data-corners=\"false\" data-shadow=\"false\" " +
							"data-iconshadow=\"true\" onclick=\"setdate();makeaddress('"+escape(jsonResto[i].nom)+"','"+escape(jsonResto[i].adresse)+"','"+jsonResto[i].code_postal+"','"+jsonResto[i].description+"','"+jsonResto[i].latitude+"','"+jsonResto[i].longitude+"');" +
							"init_itineraire("+jsonResto[i].latitude+","+jsonResto[i].longitude+");menu("+i+");\"data-wrapperels=\"div\" data-icon=\"arrow-r\" data-iconpos=\"right\"><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a href=\"#menupage\" class=\"ui-link-inherit\" data-transition=\"slide\">" + "<img src=\"http://udamobile.u-clermont1.fr/v2/restaurant/img/"+jsonResto[i].id+".jpg\">"+ jsonResto[i].nom +"("+ jsonResto[i].etat +")"+"</a></div>" +
							"<span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"></span></div></li>";
			}
			$('#listeAlpha').html(html);
		}
		else {
			html+="<li><p>Pas de service</p></li>";
		}
	}
	else {
		html+="<li><p>Service temporairement indisponible</p></li>";
	}

}
function makeaddress(nom,address,code,desc,lat,lon) {
	$.msgBox({
		title:"loading...",
		content:"chargement de l'itineraire...",
		type:"info",
		opacity:0.9,
		showButtons:false,
		autoClose:true
	});
	nomResto=unescape(nom);
	Radresse=unescape(address);
	Rcode_postal=code;
	Rdescription=desc;
	lat=lat;
	lon=lon;
	$('#address').html("<h4>adresse:"+Radresse+","+Rcode_postal+","+Rdescription+"</h4>");
}
// init la liste des resto par ordre alpha
function initMenuAlpha() {
	//recuperation du tableau des resto
	$.ajax({
		url:"http://udamobile.u-clermont1.fr/v2/restaurant/",
		type: "GET",
		success: function(feedback) {
			makeList(feedback);
		},
	});
}
function setdate() {
	month= today.getMonth();	
	TabJour = new Array("Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi");
	TabMois = new Array("janvier","février","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","décembre");
	messageDate = TabJour[jour] + " " + numero + " " + TabMois[month];
	$('#pdate').html(messageDate);
	month=month+1;
	if (month>9){
		day = today.getFullYear()+"-"+month+"-"+numero;
	}
	else{
		day = today.getFullYear()+"-0"+month+"-"+numero;
	}
}

function menu(iter) {
	//recuperation du tableau des resto
	m=iter;
	$.ajax({
		url:"http://udamobile.u-clermont1.fr/v2/restaurant/?menu="+m+"&token=2a2a504c2d&date="+day,
		type: "GET",
		success: function(feedback) {
			makemenu(feedback);		
		},
	});
}

function makemenu(json){
	html="";
	$('#Rname').html("<h3>"+nomResto+"</h3>");
	if(json!=="") {
		var jsonMenu = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);
		var MenuResto = jQuery.isPlainObject(jsonMenu) ? json: jQuery.parseJSON(jsonMenu);	
		var MidiSize = Object.keys(jsonMenu.midi).length;
		var SoirSize = Object.keys(jsonMenu.soir).length;
		var serveur= jsonMenu.date;
			if(day == serveur)
			{
				if(MidiSize>0)
					html +="<li><img src=\"css/1371832864_applications-science.png\" class=\"icons\"></img><p>Midi:</p></li>"+
							"<li id=\"EntréesM\"><img src=\"css/1371832359_toast.png\" class=\"icons\"></img><p>Entrées:" + jsonMenu.midi.Entrées + "</p></li>" +
							"<li id=\"PlatsM\"><img src=\"css/1371831932_Space Food.png\" class=\"icons\"></img><p>Plats:" + jsonMenu.midi.Plats + "</p></li>" +
							"<li id=\"LégumesM\"><img src=\"css/1371831994_pepper.png\" class=\"icons\"></img><p>Légumes:" + jsonMenu.midi.Légumes + "</p></li>" +
							"<li id=\"DessertsM\"><img src=\"css/1371831883_strawberry_ice_cream.png\" class=\"icons\"></img><p>Desserts:" + jsonMenu.midi.Desserts + "</p></li>";
				else 
					html += "<li><p><span style='text-decoration:underline' >Midi</span> : Pas de service</p></li>";
				if(SoirSize>0)
					html+="<li><img src=\"css/1371832845_weather-few-clouds-night.png\" class=\"icons\"></img><p>Soir:</p></li>"+
							"<li id=\"EntréesSoir\"><img src=\"css/1371832359_toast.png\" class=\"icons\"></img><p>Entrées:" + jsonMenu.soir.Entrées + "</p></li>" +
							"<li id=\"Plats\"><img src=\"css/1371831932_Space Food.png\" class=\"icons\"></img><p>Plats:" + jsonMenu.soir.Plats + "</p></li>" +
							"<li id=\"Légumes\"><img src=\"css/1371831994_pepper.png\" class=\"icons\"></img><p>Légumes:" + jsonMenu.soir.Légumes + "</p></li>" +
							"<li id=\"Desserts\"><img src=\"css/1371831883_strawberry_ice_cream.png\" class=\"icons\"></img><p>Desserts:" + jsonMenu.soir.Desserts + "</p></li>";
		
				else 
					html += "<li><p class=\"soir\"><span style='text-decoration:underline' ><h4>Soir</span> : Pas de service</h4></p></li>";
			}
			else {
				alert("le menu n'a pas été envoyer!!!");		
			}

	}
	else {
		alert("le menu n'a pas été envoyer!!!");
	}
	$('#page_menu').html("");	
	$('#page_menu').html(html);	
}

//btn retour sur la liste des resto qd on est ds le menu
$(document).on('click','#btnBack', function(){ 
	$('#addressText').html("");	
	jour = today.getDay();
	numero = today.getDate();
	html="";
});

$(document).ready(function() {
	initMenuAlpha();
	jour = today.getDay();
	numero = today.getDate();
	setdate();
});

$(document).on('swipeleft','#btnnext', function() {
	numero=numero+1;
	jour=jour+1;
	if(jour>5){
		alert("pas acess au menu des week-end");
		jour=1;
		numero=numero+2;
	}
	setdate();
	menu(m);
} );

$(document).on('swiperight','#btnlast', function() {
	numero=numero-1;
	jour=jour-1;
	if(jour<1){
		alert("pas acess au menu des week-end");
		numero=numero-2;
		jour=5;
	}
	setdate();
	menu(m);
});

window.addEventListener('load', function(e) {
	alert('ICI');
	window.applicationCache.addEventListener('updateready', function(e) {
	if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
		window.applicationCache.swapCache();
		if (confirm('A new version of this site is available. Load it?')) {
			window.location.reload();
		}
	}}, false);
	alert(window.applicationCache.status);	
}, false);