var nbelt, i, m, jsonResto, lat, lon, mapOptions, map, address, end, distance, myMarker, nomRestaurant, jour, month, input, autocomplete, listAttribute,
	typePage = '', a=3, counter = 0,
	day = new Array([]),
	latitude = new Array([]),
	longitude = new Array([]);
	today = new Date(),
	numero = today.getDate();


/************************************************/
/* RESTAURANT									*/
/************************************************/
/**
 * initialize_menu
 */
function initialize_menu() {
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
		set_date_menu();
		menu_restaurant(m);
	} );

	$(document).on('swiperight','#btnLast', function() {
		numero = numero - 1;
		jour = jour - 1;
		if(jour<1){
			alert('Aucun accés au menu les week-end.');
			numero = numero - 2;
			jour = 5;
		}
		set_date_menu();
		menu_restaurant(m);
	});
	
	typePage = 'restaurant';
	initialize_menu_alpha();
	jour = today.getDay();
	numero = today.getDate();
	set_date_menu();
}

/**
 * initMenuAlpha
 */
function initialize_menu_alpha() {
	$.ajax({
		url: 'http://udamobile.u-clermont1.fr/v2/restaurant/',
		type: 'GET',
		cache: true,
		success: function(feedback) {
			makelist_restaurant(feedback);
		},
	});
}

/**
 * makelist_restaurant
 * @param json
 */
function makelist_restaurant(json) {
	var html = '';
	
	jsonResto = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);
	
	if(jsonResto.code_retour == "ok") {
		nbelt=jsonResto.count;
		if( nbelt > 0 ) {		
			for(i=0; i<nbelt;i++) {
				html += '<li class=\"ui-btn ui-btn-up-a ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child\"'
						+ 'onclick=\"make_fiche_Menu(\'' + escape(jsonResto[i].nom) + '\',\'' + escape(jsonResto[i].adresse) + '\',\'' + jsonResto[i].code_postal + '\',\'' + jsonResto[i].description + '\',\'' + jsonResto[i].latitude + '\',\'' + jsonResto[i].longitude + '\');menu_restaurant(' + i + ')\">'
						+ '<div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a href=\"#menuPage\" class=\"ui-link-inherit\" data-transition=\"slide\" data-ajax=\"false\">'
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
 * make_fiche_Menu
 * @param nom
 * @param address
 * @param code
 * @param desc
 * @param lat
 * @param lon
 */
function make_fiche_Menu(nom,address,code,desc,lat,lon) {
	set_date_menu();
	make_address_restaurant(nom,address,code,desc,lat,lon);
	initialize_googlemap(lat, lon);
}

/**
 * menu
 * @param iter
 */
function menu_restaurant(iter) {
	m = iter;
	$.ajax({
		url: 'http://udamobile.u-clermont1.fr/v2/restaurant/?menu=' + m + '&token=2a2a504c2d&date=' + day,
		type: 'GET',
		cache: true,
		success: function(feedback) {
			make_menu_restaurant(feedback);
		}
	});
}

/**
 * set_date_menu
 */
function set_date_menu() {
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
 * make_address_restaurant
 * @param nom
 * @param address
 * @param code
 * @param desc
 * @param lat
 * @param lon
 */
function make_address_restaurant(nom,address,code,description,latitude,longitude) {
	nomRestaurant = unescape(nom);
	lat = latitude;
	lon = longitude;
	$('#restaurantAddress').html('<h4>Adresse : ' + unescape(address) + ', ' + code + ', ' + description + '</h4>');
}

/**
 * 
 * @param json
 * @returns
 */
function make_menu_restaurant(json) {
	var html = '',
		jsonMenu, MenuResto, MidiSize, SoirSize, serveur;
	
	$('#Rname').html('<h3 style=\"background: url(media/images/blackboard.jpg) no-repeat center center !important;\">' + nomRestaurant + '</h3>');
	
	if(json != '') {
		jsonMenu = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);
		MenuResto = jQuery.isPlainObject(jsonMenu) ? json: jQuery.parseJSON(jsonMenu);	
		MidiSize = Object.keys(jsonMenu.midi).length;
		SoirSize = Object.keys(jsonMenu.soir).length;
		serveur = jsonMenu.date;
		
		if(day == serveur) {
			if(MidiSize > 0) {
				html += "<li><img src=\"media/images/applications_science.png\" class=\"icons\"></img><p>Midi : </p></li>" +
				"<li id=\"EntréesM\"><img src=\"media/images/toast.png\" class=\"icons\"></img><p>Entrées : " + jsonMenu.midi.Entrées + "</p></li>" +
				"<li id=\"PlatsM\"><img src=\"media/images/space_food.png\" class=\"icons\"></img><p>Plats : " + jsonMenu.midi.Plats + "</p></li>" +
				"<li id=\"LégumesM\"><img src=\"media/images/pepper.png\" class=\"icons\"></img><p>Légumes : " + jsonMenu.midi.Légumes + "</p></li>" +
				"<li id=\"DessertsM\"><img src=\"media/images/strawberry_ice_cream.png\" class=\"icons\"></img><p>Desserts : " + jsonMenu.midi.Desserts + "</p></li>";
			}
			else {
				html += "<li><span class=\"underline\">Midi</span> : Aucun service.</li>";
			}
			if(SoirSize>0) {
				html += "<li><img src=\"media/images/weather_few_clouds_night.png\" class=\"icons\"></img><p>Soir : </p></li>"+
				"<li id=\"EntréesSoir\"><img src=\"media/images/toast.png\" class=\"icons\"></img><p>Entrées : " + jsonMenu.soir.Entrées + "</p></li>" +
				"<li id=\"Plats\"><img src=\"media/images/space_food.png\" class=\"icons\"></img><p>Plats : " + jsonMenu.soir.Plats + "</p></li>" +
				"<li id=\"Légumes\"><img src=\"media/images/pepper.png\" class=\"icons\"></img><p>Légumes : " + jsonMenu.soir.Légumes + "</p></li>" +
				"<li id=\"Desserts\"><img src=\"media/images/strawberry_ice_cream.png\" class=\"icons\"></img><p>Desserts : " + jsonMenu.soir.Desserts + "</p></li>";
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


/************************************************/
/* ACTUALITES									*/
/************************************************/
/**
 * initialize_actualite
 */
function initialize_actualite() {
	var saveList, listAffi, i;
	
	typePage = 'actualite';
	
	$('#uda').hide();
	$('#info').hide();
	$('#breves').hide();    
	$('#evenements').hide();
	
	$('#uda').rssfeed('http://www.u-clermont1.fr/feed', {
		limit: 10
	});
	$('#info').rssfeed('http://www.t2c.fr/infos-trafic.xml', {
		limit: 10
	});
	$('#breves').rssfeed('http://www.t2c.fr/breves.xml', {
		limit: 10
	});
	$('#evenements').rssfeed('http://www.t2c.fr/evenements.xml', {
		limit: 10
	});
					
	if(localStorage.getItem('actuRememberMe') != 'checked') {
		$.msgBox({ 
			type: 'prompt',
			title: "Abonnement",
			inputs: [
			         { header: 'UdA', type: 'checkbox', name: 'UdA', value: 'uda' },
			         { header: 'info T2C', type: 'checkbox', name: 'infoT2C', value: 'info' },
			         { header: 'brèves T2C', type: 'checkbox', name: 'brevesT2C', value: 'breves' },
			         { header: 'evenements T2C', type: 'checkbox', name: 'evenementsT2C', value: 'evenements' },
			         { header: 'Enregistrer mes modifications', type: 'checkbox', name: 'rememberMe', value: 'theValue'}
			        ],
			buttons: [{ value: 'Enregistrer' }, {value: 'Annuler'}],
			success: function (result, values) {
				if(result == 'Enregistrer') {
					saveList = false, listChecked = new Array();  		
					$(values).each(function (index, input) {
						if(input.name == 'rememberMe') {
							if(input.checked == 'checked') {
								localStorage.setItem('actuRememberMe', 'checked');
								saveList = true;
							}
							else {
								saveList = false;
							}
						}
						if(input.name != 'rememberMe' && input.checked == 'checked') {
							listChecked.push(input.value);
							$('#' + input.value).show();
						}
					});
					if(saveList) {
						localStorage.setItem('actuListChecked', listChecked);	
					}
				}
			}
		});
	}
	else {
		listAffi = localStorage.getItem('actuListChecked').split(',');
		for(i= 0; i < listAffi.length; i++) {
			$('#' + listAffi[i]).show();
		}
	}
}


/************************************************/
/* ANNUAIRE										*/
/************************************************/
/**
 * initialize_annuaire
 */
function initialize_annuaire() {
	var name = $('#searchAnnuaire').val();
	
	typePage = 'annuaire';
	
	$.ajax({
		url: 'http://udamobile.u-clermont1.fr/v2/annuaire/searchpage.php',
		type: 'POST',
		data: ({name: name}),
		cache: true,
		success: function(feedback){
			makelist_annuaire(feedback);	
		}
    });
}		              

/**
 * makelist_annuaire
 * @param json
 */
function makelist_annuaire(json) {
	var html = '',
		makelist, n, listelement;
	
	if(json != '') {
		makelist = jQuery.isPlainObject(json) ? json: jQuery.parseJSON(json);
		n = makelist.count;
		if(n==0) {
			html+='<li class=\"noneResultAnnuaire\">Aucun résultat pour la recherche demandée.</li>';
		}
		else {
			listelement = makelist.exact;			
			for(i=0; i<n; i++) {
				html+= '<li class=\"resultAnnuaire\"><h3>' + listelement[i].nom + ' ' + listelement[i].prenom + '</h3><img src=\"media/images/mail_green.png\">Courriel : <p><a href=\"mailto:' + listelement[i].mail + '\">' + listelement[i].mail + '</a></p>';
				if(listelement[i].tel) {
					html+= '<img src=\"media/images/phone.png\">TEL :<a href=\"tel:' + listelement[i].tel + '\">' + listelement[i].tel + '</a>';
				}
				html+='</li>';
			}
		}
	}
	else {
		html+='<li class=\"noneResultAnnuaire\">Aucune résultat pour la recherche demandée.</li>';
	}
	$("#listAnnuaire").html(html);
}


/************************************************/
/* MAP											*/
/************************************************/
/**
 * initialize_map
 */
function initialize_map() {
	typePage = 'map';
	initialize_googlemap(null, null);
}

/**
 * search_position_map
 */
function search_position_map() {
	var place, infowindow;
	
	map = new google.maps.Map(document.getElementById('geolocalMapHolder'), mapOptions);
	autocomplete.bindTo('bounds', map);
	
	place = autocomplete.getPlace();

	if (typeof(place) === 'undefined' || !place.geometry) {
		return;
	}

	if (place.geometry.viewport) {
		map.fitBounds(place.geometry.viewport);
	} 
	else {
		map.setCenter(place.geometry.location);
		map.setZoom(17); 
	}
	
	infowindow = new google.maps.InfoWindow({
		map: map,
		position: place.geometry.location,
		content: input.value
	});
}


/************************************************/
/* LISTEMAP										*/
/************************************************/
/**
 * initialize_listemap
 */
function initialize_listemap() {
	typePage = 'listemap';
	$('#itineraireText').hide();
	$('#listMapHolder').hide();
	
	$(document).on('click','#backButton', function() {
		html="";
		$('#itineraireText').text('');
	});
}

/**
 * listBuildings_listemap
 * @param list
 */
function listBuildings_listemap(list){
	var html = '', places;

	switch(list) {
		case 'universite':
			places={
				'université': [45.770584,3.087909],
				'Faculté de Droit et de Science Politique': [45.771022,3.089612],
				'Faculté des Sciences Economiques et de Gestion': [45.771089,3.089397],
				'Faculté de Médecine': [45.760029,3.088859],
				'Faculté de Pharmacie': [45.760078,3.089143],
				'Faculté de Chirurgie Dentaire': [45.773413,3.083392],
				'Institut Universitaire Professionnalisé Management et Gestion des Entreprises': [45.769074,3.093491],
				'Institut de Préparation à Administration Générale': [45.768792,3.093351],
				'Institut de formation en soins infirmiers du CHU': [45.761464,3.092008],
				'Institut Universitaire de Technologie': [45.761861,3.108643],
				'IUT GEA Clermont': [45.768919,3.093582],
				'IUT Aurillac': [44.933528,2.441924],
				'IUT Le Puy': [45.0397634,3.881373],
				'Pôle Lardy - Vichy': [46.119973,3.424997],
				'IFSI Le Puy': [45.04999,3.877684],
				'IFSI Vichy': [46.123273,3.432956],
				'IFSI Moulins': [46.567334,3.328008],
				'IFSI Montluçon': [46.342456,2.610415],
				'IFSI Aurillac': [44.926644,2.435539],
				'CERDI': [45.77061,3.085839]
			};
			break;
		case 'sante':	
			places = {
				'SSU SITE DE DOLET': [45.76444,3.087686],
				'SSU U.F.R. SCIENCES': [45.759799,3.113036],
				'SSU U.F.R. LETTRES': [45.771619,3.091046],
				'SSU I.U.T. Cézeaux': [45.76182,3.108552],
				'SSU UFR-STAPS-INFIRMERIE': [45.760441,3.10776],
				'SSU DENTISTERIE PREVENTIVE UNIVERSITAIRE': [45.773413,3.083392]
			};
			break;
		case 'loisir':
			places = {
				'Service Université Culture': [45.771678,3.09095],
				'SUAPS Clermont-Ferrand': [45.763674,3.084635],
				'Stade P. Marcombes': [45.760618,3.084365],
				'Complexe sportif des Cézeaux':[45.758751,3.108058],
				'Stade nautique Pierre de Coubertin': [45.768601,3.084841],
				'Piscine municipale de Chamalières': [45.769285,3.066201],
				'Patinoire': [45.7624536,3.126646899999969]
			};
			break;
		case 'BU':
			places = {
				'Bibliothèque de Droit et de Sciences Economiques': [45.770992,3.089],
				'Bibliothèque de droit et sciences économiques-BU Rotonde': [45.769503,3.093699],
				'Bibliothèque du réseau Lettres-Bibliothèque Gergovia': [45.7720014,3.0903408000000354],
				'Bibliothèque Lafayette': [45.773798,3.087931],
				'Maison des sciences de l’homme': [45.7702883,3.0886350000000675],
				'Bibliothèque UFR LACC': [45.775542,3.091854],
				'Bibliothèques de UFR LLSH': [45.7720014,3.0903408000000354],
				'Bibliothèque de UFR PSSE': [45.7762787,3.0923298999999815],
				'Bibliothèque des Staps': [45.76027,3.107814],
				'Bibliothèque de lIFMA': [45.757665,3.112843],
				'Bibliothèque de géologie': [45.7701291,3.0873719999999594],
				'BU Sciences': [45.760244,3.113846],
				'Bibliothèque de Santé': [45.759761,3.089669],
				'Bibliothèque Odontologie': [45.77342,3.084197],
				'Bibliothèque de IUT': [45.762007,3.108466],
				'Bibliothèque de IUFM Auvergne': [45.770921,3.0727600000000166]
			};
			break;
		case 'resto':
			places = {
				'Kiosque la Ronde des Saveurs': [45.764354,3.087001],
				'RU Le Clos Saint-Jacques': [45.764129,3.087155],
				'RU Le Cratère': [45.768927,3.093009],
				'Brasserie Le Manège': [45.775195,3.092509],
				'RU Philippe-Lebon': [45.771567,3.092524],
				'Sandwicherie Chez Lily': [45.77156,3.092374],
				'Brasserie La Terrasse': [45.764523,3.087001],
				'RU Odontologie': [45.773461,3.084205],
				'RU Rest’Océzo': [45.758433,3.11372],
				'RU Plat’Océzo': [45.758521,3.113911],
				'RU Rapid’Océzo': [45.758457,3.113497],
				'Brasserie La Véranda': [45.758556,3.113964],
				'Brasserie Le Saxo': [45.759944,3.113288],
				'Cafétaria de l’IUT': [45.762205,3.108407],
				'Le Nota Bene': [45.759876,3.112779],
				'Les Hauts De L’Artière': [45.758573,3.113809],
				'Cafétéria Le Dunant': [45.759791,3.089363],
				'RU Montlucon et Brasserie': [46.330615,2.589780],
				'RU IUT Montlucon': [46.328493,2.589528]
			};
			break;
		case 'heberg':
			places = {
				'Maison Internationale Universitaire': [45.769675,3.087607],
				'Résidence Amboise': [45.774733,3.092651],
				'Résidence du Clos Saint-jacques': [45.764395,3.086879],
				'Résidence du Clos Saint-jacques Dolet A': [45.764385,3.087121],
				'Résidence du Clos Saint-jacques Dolet B': [45.764454,3.087762],
				'Résidence du Clos Saint-jacques Dolet C': [45.764086,3.088110],
				'Résidence du Clos Saint-jacques Dolet E': [45.764988,3.087172],
				'Résidence du Clos Saint-jacques Dolet F': [45.765439,3.086911],
				'Studios des Cézeaux Bat 20': [45.757078,3.110703],
				'Studios des Cézeaux Bat 21': [45.756589,3.111151],
				'Studios des Cézeaux Bat 22': [45.756299,3.111690],
				'Résidence des Cézeaux Cite 1': [45.759726,3.118057],
				'Résidence des Cézeaux Cite 2': [45.755845,3.110056],
				'Résidence Philippe-Lebon A': [45.771352,3.092564],
				'Résidence Philippe-Lebon B': [45.771332,3.092173],
				'Résidence Philippe-Lebon C': [45.77169,3.09258],
				'Résidence Anatole-France': [45.77855,3.109856],
				'Résidence Les Jardins': [45.77348,3.102232],
				'Résidence La Gare': [45.780183,3.102734],
				'Résidence La Poterne': [45.780285,3.08978],
				'Résidence Le Port': [45.780285,3.08978],
				'Résidence Paul-Collomp': [45.773864,3.091697],
				'Résidence Poncillon': [45.76311,3.083912],
				'Résidence Les Hauts de Lafayette': [45.76928,3.104708],
				'Cité U - Montlucon': [46.330615,2.589780]
			};
			break;
		case 'divers':
			places = {
				'Service Université Handicap': [45.759799,3.113036],
				'ESPACE INFO JEUNES': [45.7770271,3.085534300000063],
				'Mission des Relations Internationales': [45.7795502,3.090145]
			};
		break;
	}
	
	html += '<li class=\"ui-btn ui-btn-up-a ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child\" onclick=\"showAll_listemap();\"><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a href=\"#menupage\" class=\"ui-link-inherit\" data-transition=\"slide\">Affichez tout</a></div><span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"></span></div></li>';
	for(var i in places){
		html += '<li class=\"ui-btn ui-btn-up-a ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child\"' + 'onclick=\"initialize_googlemap(' + places[i][0]+ ','+ places[i][1] + ');\">' + '<div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" data-transition=\"slide\">' + i + '</a></div><span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"></span></div></li>';
		counter++;
	}
	$('#listIntoBuilding').html(html);
	
	$('#listBuilding').hide();
	$('#listIntoBuilding').show();
	$('#listMapHolder').hide();
	
	a = 1;
	$('#backButton').attr('onclick', 'back_to_category_listemap(' + a + ')');
}

/**
 * set_attribute_listemap
 * @param list
 */
function set_attribute_listemap(list){
	switch(list) {
		case 'universite':
			listAttribute='universite';
			break;
		case 'sante':	
			listAttribute='sante';
			break;
		case 'loisir':
			listAttribute='loisir';
			break;
		case 'BU':
			listAttribute='BU';
			break;
		case 'resto':
			listAttribute='resto';
			break;
		case 'heberg':
			listAttribute='heberg';
			break;
		case 'divers':
			listAttribute='divers';
			break;
	}
}

/**
 * showAll_listemap
 */
function showAll_listemap() {
	var ctaLayer;
	
	address = new google.maps.LatLng(45.770584,3.087909);
	mapOptions = {
		zoom: 9,
		center: address,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('listMapHolder'), mapOptions);
	
	$('#listmapHeader').hide();
	$('#listBuilding').hide();
	$('#listIntoBuilding').hide();
	$('#itineraireText').show();
	$('#listMapHolder').show();
	
	switch(listAttribute){
		case 'universite':
			ctaLayer = new google.maps.KmlLayer({
				url: 'https://sites.google.com/site/udamobilev2/kml/universite.kml?attredirects=0&d=1'
			});
			ctaLayer.setMap(map);
			break;
		case 'sante':
			ctaLayer = new google.maps.KmlLayer({
				url: 'https://sites.google.com/site/udamobilev2/kml/sante.kml?attredirects=0&d=1'
			});
			ctaLayer.setMap(map);
			break;
		case 'loisir':
			ctaLayer = new google.maps.KmlLayer({
				url: 'https://sites.google.com/site/udamobilev2/kml/loisir.kml?attredirects=0&d=1'
			});
			ctaLayer.setMap(map);
			break;
		case 'BU':
			ctaLayer = new google.maps.KmlLayer({
				url: 'https://sites.google.com/site/udamobilev2/kml/BU.kml?attredirects=0&d=1'
			});
			ctaLayer.setMap(map);
			break;
		case 'resto':
			ctaLayer = new google.maps.KmlLayer({
				url: 'https://sites.google.com/site/udamobilev2/kml/RU.kml?attredirects=0&d=1'
			});
			ctaLayer.setMap(map);
			break;
		case 'heberg':
			ctaLayer = new google.maps.KmlLayer({
				url: 'https://sites.google.com/site/udamobilev2/kml/HU.kml?attredirects=0&d=1'
			});
			ctaLayer.setMap(map);
			break;
		case 'divers':
			ctaLayer = new google.maps.KmlLayer({
				url: 'https://sites.google.com/site/udamobilev2/kml/divers.kml?attredirects=0&d=1'
			});
			ctaLayer.setMap(map);
			break;	
	}
}

/**
 * back_to_category_listemap
 * @param a
 */
function back_to_category_listemap(a){
	if(a == 1){
		$('#listmapHeader').show();
		$('#listIntoBuilding').hide();
		$('#listBuilding').show();
		$('#listMapHolder').hide();
		$('#backButton').attr('onclick', 'window.location=\'#mapPage\';');
	}
	else {
		a=1;
		$('#listmapHeader').show();
		$('#listIntoBuilding').show();
		$('#listBuilding').hide();
		$('#listMapHolder').hide();
		$('#backButton').attr('onclick', 'back_to_category_listemap(' + a + ')');
	}
}


/************************************************/
/* GOOGLE MAP									*/
/************************************************/
/**
 * initialize_googlemap
 * @param latitude
 * @param longitude
 */
function initialize_googlemap(latitude, longitude) {
	switch(typePage) {
		case 'restaurant':
			end = new google.maps.LatLng(latitude,longitude);
			break;
		case 'map':
			input = document.getElementById('geolocalSearchTextField');
			autocomplete = new google.maps.places.Autocomplete(input);
			address = new google.maps.LatLng(45.769,3.09);
			mapOptions = {
				zoom: 17,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: address,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					mapition: google.maps.ControlPosition.TOP_LEFT
				}
			};
			map = new google.maps.Map(document.getElementById('geolocalMapHolder'), mapOptions);
			google.maps.event.trigger(map,'resize');
			break;
		case 'listemap':
			latitude[0]=latitude;
			longitude[0]=longitude;
			end = new google.maps.LatLng(latitude,longitude);
			break;
	}
	getLocation();
}

/**
 * getLocation
 */
function getLocation() {
	$.msgBox({
		title: 'Chargement...',
		content: 'Chargement de l\'itinéraire...',
		type: 'info',
		opacity: 0.9,
		showButtons: false,
		autoClose: true
	});
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	}
	else {
		alert('La géolocalisation n\'est pas supporté par le navigateur.');
	}
}

/**
 * showPosition
 * @param position
 */
function showPosition(position) {
	var directionsDisplay, directionsService, requeteItineraire;
	
	address = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	switch(typePage) {
		case 'restaurant':
			directionsDisplay = new google.maps.DirectionsRenderer();
			directionsService = new google.maps.DirectionsService();
			
			requeteItineraire = {
				origin: address,
				destination: end,
				region: 'fr',
				travelMode: google.maps.DirectionsTravelMode.DRIVING
			};
			
			mapOptions = {
				zoom: 7,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: address,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position: google.maps.ControlPosition.TOP_LEFT
				}
			};
			
			map = new google.maps.Map(document.getElementById('restaurantMapHolder'), mapOptions);
			directionsDisplay.setMap(map);
			directionsDisplay.setPanel(document.getElementById('restaurantAddressText'));
			directionsService.route(requeteItineraire, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
			});
			distance = google.maps.geometry.spherical.computeDistanceBetween (address, end);
			break;
		case 'map':
			mapOptions = {
				zoom: 17,
				center: address,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			map = new google.maps.Map(document.getElementById('geolocalMapHolder'), mapOptions);	
			google.maps.event.trigger(map,'resize');
			myMarker = new google.maps.Marker({
				map: map,
				position: address
			});
			break;
		case 'listemap':
			a=2;
			$('#backButton').attr('onclick', 'back_to_category_listemap(' + a + ')');

			latitude[1] = new google.maps.LatLng(position.coords.latitude);
			longitude[1] = new google.maps.LatLng(position.coords.longitude);
			
			directionsDisplay = new google.maps.DirectionsRenderer(),
			directionsService = new google.maps.DirectionsService(),
			
			requeteItineraire = {
				origin: address,
				destination: end,
				region: 'fr',
				travelMode: google.maps.DirectionsTravelMode.DRIVING
			};
		
			mapOptions = {
				zoom: 7,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: address,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position: google.maps.ControlPosition.TOP_LEFT
				}
			};
		
			map = new google.maps.Map(document.getElementById('listMapHolder'), mapOptions);
			directionsDisplay.setMap(map);
			directionsDisplay.setPanel(document.getElementById('itineraireText'));
			directionsService.route(requeteItineraire, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
			});
			distance = google.maps.geometry.spherical.computeDistanceBetween (address, end); 
			
			$('#listmapHeader').hide();
			$('#listBuilding').hide();
			$('#listIntoBuilding').hide();
			$('#itineraireText').show();
			$('#listMapHolder').show();
			break;
	}
}

/**
 * showError
 * @param error
 */
function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			alert('Géolocalisation non authorisée.');
			break;
		case error.POSITION_UNAVAILABLE:
			alert('Localisation non disponible.');
			break;
		case error.TIMEOUT:
			alert('Echec de la localisation.');
			break;
		case error.UNKNOWN_ERROR:
			alert('Erreur inconnue.');
			break;
	}
}