var nbelt, i, m, jsonResto, lat, lon, mapOptions, requeteItineraire, map, address, end, nomRestaurant, jour, month,
	directionsService = new google.maps.DirectionsService(),
	day = new Array(),
	today = new Date(),
	numero = today.getDate();


/**
 * init_itineraire
 * @param lat
 * @param lan
 */
function init_itineraire(lat,lan) {
	end = new google.maps.LatLng(lat,lan);
	getLocation();
}

/**
 * getLocation
 */
function getLocation() {
	$('#restaurantMapHolder').css({ opacity: 0, zoom: 0 });
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition,showError);
	}
	else {
		x.innerHTML = 'La géolocalisation n\'est pas supporté par le navigateur.';
	}
}

/**
 * showPosition
 * @param position
 */
function showPosition(position) {
	address = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);		
	initialize();
	$('#restaurantMapHolder').show();
	$('#restaurantMapHolder').css({ opacity: 1, zoom: 1 });
}

/**
 * showError
 * @param error
 */
function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			x.innerHTML = 'Géolocalisation non authorisée.';
			break;
		case error.POSITION_UNAVAILABLE:
			x.innerHTML = 'Localisation non disponible.';
			break;
		case error.TIMEOUT:
			x.innerHTML = 'Echec de la localisation.';
			break;
		case error.UNKNOWN_ERROR:
			x.innerHTML = 'Erreur inconnue.';
			break;
	}
}

/**
 * initialize
 */
function initialize() {
	var optionsCarte;
	
	directionsDisplay = new google.maps.DirectionsRenderer();
    optionsCarte = {
    	zoom: 7,
    	mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: address,
        mapTypeControlOptions: {
        	style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        	position: google.maps.ControlPosition.TOP_LEFT
        }
	};
    map = new google.maps.Map(document.getElementById('restaurantMapHolder'), optionsCarte);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('restaurantAddressText'));
    requeteItineraire = {
    	origin: address,
        destination: end,
        region: 'fr',
		ravelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(requeteItineraire, function(response, status) {
    	if (status == google.maps.DirectionsStatus.OK) {
    		directionsDisplay.setDirections(response);
    	}
    });
}

/**
 * initMenuAlpha
 */
function initMenuAlpha() {
	$.ajax({
		url: 'http://udamobile.u-clermont1.fr/v2/restaurant/',
		type: 'GET',
		cache: true,
		success: function(feedback) {
			makeList(feedback);
		},
	});
}

/**
 * makeList
 * @param json
 */
function makeList(json) {
	var html = '';
	
	jsonResto = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);
	
	if(jsonResto.code_retour == "ok") {
		nbelt=jsonResto.count;
		if( nbelt > 0 ) {		
			for(i=0; i<nbelt;i++) {
				html += '<li class=\"ui-btn ui-btn-up-a ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child\"'
						+ 'onclick=\"makeFicheMenu(\'' + escape(jsonResto[i].nom) + '\',\'' + escape(jsonResto[i].adresse) + '\',\'' + jsonResto[i].code_postal + '\',\'' + jsonResto[i].description + '\',\'' + jsonResto[i].latitude + '\',\'' + jsonResto[i].longitude + '\');menu(' + i + ')\">'
						+ '<div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a href=\"#menupage\" class=\"ui-link-inherit\" data-transition=\"slide\">'
						+ '<img src=\"http://udamobile.u-clermont1.fr/v2/restaurant/img/' + jsonResto[i].id + '.jpg\"/>'
						+ jsonResto[i].nom + '(' + jsonResto[i].etat + ')'
						+ '</a></div><span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"></span></div></li>';
			}
			$('#listeRestaurant').html(html);
		}
		else {
			html += "<li>Pas de service.</li>";
		}
	}
	else {
		html += "<li>Service temporairement indisponible</li>";
	}
}

/**
 * makeFicheMenu
 * @param nom
 * @param address
 * @param code
 * @param desc
 * @param lat
 * @param lon
 */
function makeFicheMenu(nom,address,code,desc,lat,lon) {
	setdate();
	makeaddress(nom,address,code,desc,lat,lon);
	init_itineraire(lat,lon);
}

/**
 * setdate
 */
function setdate() {
	month= today.getMonth();	
	TabJour = new Array('Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi');
	TabMois = new Array('janvier','février','mars','avril','mai','juin','juillet','aout','septembre','octobre','novembre','décembre');
	messageDate = TabJour[jour] + " " + numero + " " + TabMois[month];
	$('#pdate').html(messageDate);
	month=month+1;
	if (month>9){
		day = today.getFullYear() + '-' + month + '-' + numero;
	}
	else{
		day = today.getFullYear() + '-0' + month + '-' + numero;
	}
}

/**
 * makeaddress
 * @param nom
 * @param address
 * @param code
 * @param desc
 * @param lat
 * @param lon
 */
function makeaddress(nom,address,code,description,latitude,longitude) {
	$.msgBox({
		title: 'Chargement...',
		content: 'Chargement de l\'itineraire...',
		type: 'info',
		opacity:0.9,
		showButtons:false,
		autoClose:true
	});
	nomRestaurant = unescape(nom);
	lat = latitude;
	lon = longitude;
	$('#restaurantAddress').html('<h4>Adresse : ' + unescape(address) + ', ' + code + ', ' + description + '</h4>');
}

/**
 * menu
 * @param iter
 */
function menu(iter) {
	m = iter;
	$.ajax({
		url: 'http://udamobile.u-clermont1.fr/v2/restaurant/?menu=' + m + '&token=2a2a504c2d&date=' + day,
		type: 'GET',
		cache: true,
		success: function(feedback) {
			makemenu(feedback);		
		}
	});
}

/**
 * 
 * @param json
 * @returns
 */
function makemenu(json) {
	var html = '',
		jsonMenu, MenuResto, MidiSize, SoirSize, serveur;
	
	$('#Rname').html('<h3>' + nomRestaurant + '</h3>');
	
	if(json != '') {
		jsonMenu = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);
		MenuResto = jQuery.isPlainObject(jsonMenu) ? json: jQuery.parseJSON(jsonMenu);	
		MidiSize = Object.keys(jsonMenu.midi).length;
		SoirSize = Object.keys(jsonMenu.soir).length;
		serveur = jsonMenu.date;
		
		if(day == serveur) {
			if(MidiSize > 0) {
				html += "<li><img src=\"css/1371832864_applications-science.png\" class=\"icons\"></img><p>Midi : </p></li>" +
				"<li id=\"EntréesM\"><img src=\"css/1371832359_toast.png\" class=\"icons\"></img><p>Entrées : " + jsonMenu.midi.Entrées + "</p></li>" +
				"<li id=\"PlatsM\"><img src=\"css/1371831932_Space Food.png\" class=\"icons\"></img><p>Plats : " + jsonMenu.midi.Plats + "</p></li>" +
				"<li id=\"LégumesM\"><img src=\"css/1371831994_pepper.png\" class=\"icons\"></img><p>Légumes : " + jsonMenu.midi.Légumes + "</p></li>" +
				"<li id=\"DessertsM\"><img src=\"css/1371831883_strawberry_ice_cream.png\" class=\"icons\"></img><p>Desserts : " + jsonMenu.midi.Desserts + "</p></li>";
			}
			else {
				html += "<li><span class=\"underline\">Midi</span> : Aucun service.</li>";
			}
			if(SoirSize>0) {
				html += "<li><img src=\"css/1371832845_weather-few-clouds-night.png\" class=\"icons\"></img><p>Soir : </p></li>"+
				"<li id=\"EntréesSoir\"><img src=\"css/1371832359_toast.png\" class=\"icons\"></img><p>Entrées : " + jsonMenu.soir.Entrées + "</p></li>" +
				"<li id=\"Plats\"><img src=\"css/1371831932_Space Food.png\" class=\"icons\"></img><p>Plats : " + jsonMenu.soir.Plats + "</p></li>" +
				"<li id=\"Légumes\"><img src=\"css/1371831994_pepper.png\" class=\"icons\"></img><p>Légumes : " + jsonMenu.soir.Légumes + "</p></li>" +
				"<li id=\"Desserts\"><img src=\"css/1371831883_strawberry_ice_cream.png\" class=\"icons\"></img><p>Desserts : " + jsonMenu.soir.Desserts + "</p></li>";
			}
			else {
				html += "<li><span class=\"underline\">Soir</span> : Aucun service.</li>";
			}
		}
		else {
			html += "<li class=\"noneResultMenu\">Le menu n\'a pas été envoyé.</li>";		
		}
	}
	else {
		html += "<li class=\"noneResultMenu\">Le menu n\'a pas été envoyé.</li>";
	}
	$('#listMenu').html(html);	
}


$(document).on('click','#btnBack', function(){ 
	$('#restaurantAddressText').html('');	
	jour = today.getDay();
	numero = today.getDate();
});

$(document).on('swipeleft','#btnNext', function() {
	numero = numero + 1;
	jour = jour + 1;
	if(jour > 5) {
		alert('Aucun accés au menu les week-end.');
		jour = 1;
		numero = numero + 2;
	}
	setdate();
	menu(m);
} );

$(document).on('swiperight','#btnLast', function() {
	numero = numero - 1;
	jour = jour - 1;
	if(jour<1){
		alert('Aucun accés au menu les week-end.');
		numero = numero - 2;
		jour = 5;
	}
	setdate();
	menu(m);
});

$(document).ready(function() {
	initMenuAlpha();
	jour = today.getDay();
	numero = today.getDate();
	setdate();
});