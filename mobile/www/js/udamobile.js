function initialize_menu() {
	$(document).on("click", "#btnBack", function () {
		$("#restaurantAddressText").empty();
	});
	$(document).on("swipeleft", "#btnNext", function () {
		day.setDate(day.getDate() + 1);
		set_date_menu();
		menu_restaurant(m);
	});
	$(document).on("swiperight", "#btnLast", function () {
		day.setDate(day.getDate() - 1);
		set_date_menu();
		menu_restaurant(m);
	});
	typePage = "restaurant";
	day = new Date();
	initialize_menu_alpha();
}
function initialize_menu_alpha() {
	$.ajax({
		url: "http://udamobile.u-clermont1.fr/v2/restaurant/",
		type: "GET",
		cache: true,
		success: function (e) {
			makelist_restaurant(e)
		}
	})
}
function makelist_restaurant(e) {
	var t = "";
	jsonResto = jQuery.isPlainObject(e) ? e : jQuery.parseJSON(e);
	if (jsonResto.code_retour == "ok") {
		nbelt = jsonResto.count;
		if (nbelt > 0) {
			for (i = 0; i < nbelt; i++) {
				t += '<li class="ui-btn ui-btn-up-a ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child"' + "onclick=\"make_fiche_Menu('" + escape(jsonResto[i].nom) + "','" + escape(jsonResto[i].adresse) + "','" + jsonResto[i].code_postal + "','" + jsonResto[i].description + "','" + jsonResto[i].latitude + "','" + jsonResto[i].longitude + "');menu_restaurant(" + i + ')">' + '<div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#menuPage" class="ui-link-inherit" data-transition="slide" data-ajax="false">' + '<img src="http://udamobile.u-clermont1.fr/v2/restaurant/img/' + jsonResto[i].id + '.jpg"/>' + jsonResto[i].nom + "(" + jsonResto[i].etat + ")" + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>'
			}
			$("#listeRestaurant").html(t)
		} else {
			t += "<li>Pas de service.</li>"
		}
	} else {
		t += "<li>Service temporairement indisponible</li>"
	}
}
function make_fiche_Menu(e, t, n, r, i, s) {
	set_date_menu();
	make_address_restaurant(e, t, n, r, i, s);
	initialize_googlemap(i, s)
}
function menu_restaurant(e) {
	m = e;
	$.ajax({
		url: "http://udamobile.u-clermont1.fr/v2/restaurant/?menu=" + m + "&token=2a2a504c2d&date=" + dateCROUS,
		type: "GET",
		cache: true,
		success: function (e) {
			make_menu_restaurant(e)
		}
	})
}
function set_date_menu() {
	TabJour = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
	TabMois = new Array("janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre");
	
	messageDate = TabJour[day.getDay()] + " " + day.getDate() + " " + TabMois[day.getMonth()];
	$("#pdate").html(messageDate);
	if (day.getMonth() > 9) {
		dateCROUS = day.getFullYear() + "-" + day.getMonth() + "-" + day.getDate();
	} 
	else {
		dateCROUS = day.getFullYear() + "-0" + day.getMonth() + "-" + day.getDate()
	}
}
function make_address_restaurant(e, t, n, r, i, s) {
	nomRestaurant = unescape(e);
	lat = i;
	lon = s;
	$("#restaurantAddress").html("<h4>Adresse : " + unescape(t) + ", " + n + ", " + r + "</h4>")
}
function show_itineraire_restaurant() {
	if($("#restaurantAddressText").is(':visible')) {
		$('#restaurantAddressText').hide();
	}
	else {
		$('#restaurantAddressText').show();
	}
}
function make_menu_restaurant(e) {
	var t = "",
		n, r, i, s, o;
	$("#Rname").html('<h3 style="background: url(media/images/blackboard.jpg) no-repeat center center !important;">' + nomRestaurant + "</h3>");
	if (e != "") {
		n = jQuery.isPlainObject(e) ? e : jQuery.parseJSON(e);
		r = jQuery.isPlainObject(n) ? e : jQuery.parseJSON(n);
		i = Object.keys(n.midi).length;
		s = Object.keys(n.soir).length;
		o = n.date;
		if (day == o) {
			if (i > 0) {
				t += '<li><img src="media/images/applications_science.png" class="icons"></img><p>Midi : </p></li>' + '<li id="EntréesM"><img src="media/images/toast.png" class="icons"></img><p>Entrées : ' + n.midi.Entrées + "</p></li>" + '<li id="PlatsM"><img src="media/images/space_food.png" class="icons"></img><p>Plats : ' + n.midi.Plats + "</p></li>" + '<li id="LégumesM"><img src="media/images/pepper.png" class="icons"></img><p>Légumes : ' + n.midi.Légumes + "</p></li>" + '<li id="DessertsM"><img src="media/images/strawberry_ice_cream.png" class="icons"></img><p>Desserts : ' + n.midi.Desserts + "</p></li>"
			} else {
				t += '<li><span class="underline">Midi</span> : Aucun service.</li>'
			}
			if (s > 0) {
				t += '<li><img src="media/images/weather_few_clouds_night.png" class="icons"></img><p>Soir : </p></li>' + '<li id="EntréesSoir"><img src="media/images/toast.png" class="icons"></img><p>Entrées : ' + n.soir.Entrées + "</p></li>" + '<li id="Plats"><img src="media/images/space_food.png" class="icons"></img><p>Plats : ' + n.soir.Plats + "</p></li>" + '<li id="Légumes"><img src="media/images/pepper.png" class="icons"></img><p>Légumes : ' + n.soir.Légumes + "</p></li>" + '<li id="Desserts"><img src="media/images/strawberry_ice_cream.png" class="icons"></img><p>Desserts : ' + n.soir.Desserts + "</p></li>"
			} else {
				t += '<li><span class="underline">Soir</span> : Aucun service.</li>'
			}
		} else {
			t += '<li class="noneResultMenu">Le menu n\'a pas été envoyé.</li>'
		}
	} else {
		t += '<li class="noneResultMenu">Le menu n\'a pas été envoyé.</li>'
	}
	$("#listMenu").html(t)
}
function initialize_actualite() {
	var e, t;
	typePage = "actualite";
	$("#uda").hide();
	$("#info").hide();
	$("#breves").hide();
	$("#evenements").hide();
	$("#uda").rssfeed("http://www.u-clermont1.fr/feed", {
		limit: 10
	});
	$("#info").rssfeed("http://www.t2c.fr/infos-trafic.xml", {
		limit: 10
	});
	$("#breves").rssfeed("http://www.t2c.fr/breves.xml", {
		limit: 10
	});
	$("#evenements").rssfeed("http://www.t2c.fr/evenements.xml", {
		limit: 10
	});
	if (localStorage.getItem("actuRememberMe") != "checked") {
		$.msgBox({
			type: "prompt",
			title: "Abonnement",
			inputs: [{
				header: "UdA",
				type: "checkbox",
				name: "UdA",
				value: "uda"
			},
			{
				header: "info T2C",
				type: "checkbox",
				name: "infoT2C",
				value: "info"
			},
			{
				header: "brèves T2C",
				type: "checkbox",
				name: "brevesT2C",
				value: "breves"
			},
			{
				header: "evenements T2C",
				type: "checkbox",
				name: "evenementsT2C",
				value: "evenements"
			},
			{
				header: "Enregistrer mes modifications",
				type: "checkbox",
				name: "rememberMe",
				value: "theValue"
			}],
			buttons: [{
				value: "Enregistrer"
			},
			{
				value: "Annuler"
			}],
			success: function (e, t) {
				if (e == "Enregistrer") {
					saveList = false, listChecked = new Array;
					$(t).each(function (e, t) {
						if (t.name == "rememberMe") {
							if (t.checked == "checked") {
								localStorage.setItem("actuRememberMe", "checked");
								saveList = true
							} else {
								saveList = false
							}
						}
						if (t.name != "rememberMe" && t.checked == "checked") {
							listChecked.push(t.value);
							$("#" + t.value).show()
						}
					});
					if (saveList) {
						localStorage.setItem("actuListChecked", listChecked)
					}
				}
			}
		})
	} else {
		e = localStorage.getItem("actuListChecked").split(",");
		for (t = 0; t < e.length; t++) {
			$("#" + e[t]).show()
		}
	}
}
function reload_actualite() {
	localStorage.clear();
	saveList = false;
	initialize_actualite()
}
function initialize_annuaire() {
	var e = $("#searchAnnuaire").val();
	typePage = "annuaire";
	$.ajax({
		url: "http://udamobile.u-clermont1.fr/v2/annuaire/searchpage.php",
		type: "POST",
		data: {
			name: e
		},
		cache: true,
		success: function (e) {
			makelist_annuaire(e)
		}
	})
}
function makelist_annuaire(e) {
	var t = "",
		n, r, s;
	if (e != "") {
		n = jQuery.isPlainObject(e) ? e : jQuery.parseJSON(e);
		r = n.count;
		if (r == 0) {
			t += '<li class="noneResultAnnuaire">Aucun résultat pour la recherche demandée.</li>'
		} else {
			s = n.exact;
			for (i = 0; i < r; i++) {
				t += '<li class="resultAnnuaire"><h3>' + s[i].nom + " " + s[i].prenom + '</h3><img src="media/images/mail_green.png"><span>Courriel : </span><p><a href="mailto:' + s[i].mail + '">' + s[i].mail + "</a></p>";
				if (s[i].tel) {
					t += '<img src="media/images/phone.png"><span>TEL : </span><a href="tel:' + s[i].tel + '">' + s[i].tel + "</a>"
				}
				t += "</li>"
			}
		}
	} else {
		t += '<li class="noneResultAnnuaire">Aucune résultat pour la recherche demandée.</li>'
	}
	$("#listAnnuaire").html(t)
}
function initialize_map() {
	typePage = "map";
	initialize_googlemap(null, null)
}
function search_position_map() {
	var e, t;
	map = new google.maps.Map(document.getElementById("geolocalMapHolder"), mapOptions);
	autocomplete.bindTo("bounds", map);
	e = autocomplete.getPlace();
	if (typeof e === "undefined" || !e.geometry) {
		return
	}
	if (e.geometry.viewport) {
		map.fitBounds(e.geometry.viewport)
	} else {
		map.setCenter(e.geometry.location);
		map.setZoom(17)
	}
	t = new google.maps.InfoWindow({
		map: map,
		position: e.geometry.location,
		content: input.value
	})
}
function initialize_listemap() {
	typePage = "listemap";
	a = 3;
	counter = 0;
	$("#listmapHeader").show();
	$("#listBuilding").show();
	$("#listIntoBuilding").hide();
	$("#itineraireText").hide();
	$("#listMapHolder").hide();
	$(document).on("click", "#backButton", function () {
		html = "";
		$("#itineraireText").text("")
	})
}
function listBuildings_listemap(e) {
	var t = "",
		n;
	switch (e) {
	case "universite":
		n = {
			"université": [45.770584, 3.087909],
			"Faculté de Droit et de Science Politique": [45.771022, 3.089612],
			"Faculté des Sciences Economiques et de Gestion": [45.771089, 3.089397],
			"Faculté de Médecine": [45.760029, 3.088859],
			"Faculté de Pharmacie": [45.760078, 3.089143],
			"Faculté de Chirurgie Dentaire": [45.773413, 3.083392],
			"Institut Universitaire Professionnalisé Management et Gestion des Entreprises": [45.769074, 3.093491],
			"Institut de Préparation à Administration Générale": [45.768792, 3.093351],
			"Institut de formation en soins infirmiers du CHU": [45.761464, 3.092008],
			"Institut Universitaire de Technologie": [45.761861, 3.108643],
			"IUT GEA Clermont": [45.768919, 3.093582],
			"IUT Aurillac": [44.933528, 2.441924],
			"IUT Le Puy": [45.0397634, 3.881373],
			"Pôle Lardy - Vichy": [46.119973, 3.424997],
			"IFSI Le Puy": [45.04999, 3.877684],
			"IFSI Vichy": [46.123273, 3.432956],
			"IFSI Moulins": [46.567334, 3.328008],
			"IFSI Montluçon": [46.342456, 2.610415],
			"IFSI Aurillac": [44.926644, 2.435539],
			CERDI: [45.77061, 3.085839]
		};
		break;
	case "sante":
		n = {
			"SSU SITE DE DOLET": [45.76444, 3.087686],
			"SSU U.F.R. SCIENCES": [45.759799, 3.113036],
			"SSU U.F.R. LETTRES": [45.771619, 3.091046],
			"SSU I.U.T. Cézeaux": [45.76182, 3.108552],
			"SSU UFR-STAPS-INFIRMERIE": [45.760441, 3.10776],
			"SSU DENTISTERIE PREVENTIVE UNIVERSITAIRE": [45.773413, 3.083392]
		};
		break;
	case "loisir":
		n = {
			"Service Université Culture": [45.771678, 3.09095],
			"SUAPS Clermont-Ferrand": [45.763674, 3.084635],
			"Stade P. Marcombes": [45.760618, 3.084365],
			"Complexe sportif des Cézeaux": [45.758751, 3.108058],
			"Stade nautique Pierre de Coubertin": [45.768601, 3.084841],
			"Piscine municipale de Chamalières": [45.769285, 3.066201],
			Patinoire: [45.7624536, 3.126646899999969]
		};
		break;
	case "BU":
		n = {
			"Bibliothèque de Droit et de Sciences Economiques": [45.770992, 3.089],
			"Bibliothèque de droit et sciences économiques-BU Rotonde": [45.769503, 3.093699],
			"Bibliothèque du réseau Lettres-Bibliothèque Gergovia": [45.7720014, 3.0903408000000354],
			"Bibliothèque Lafayette": [45.773798, 3.087931],
			"Maison des sciences de l’homme": [45.7702883, 3.0886350000000675],
			"Bibliothèque UFR LACC": [45.775542, 3.091854],
			"Bibliothèques de UFR LLSH": [45.7720014, 3.0903408000000354],
			"Bibliothèque de UFR PSSE": [45.7762787, 3.0923298999999815],
			"Bibliothèque des Staps": [45.76027, 3.107814],
			"Bibliothèque de lIFMA": [45.757665, 3.112843],
			"Bibliothèque de géologie": [45.7701291, 3.0873719999999594],
			"BU Sciences": [45.760244, 3.113846],
			"Bibliothèque de Santé": [45.759761, 3.089669],
			"Bibliothèque Odontologie": [45.77342, 3.084197],
			"Bibliothèque de IUT": [45.762007, 3.108466],
			"Bibliothèque de IUFM Auvergne": [45.770921, 3.0727600000000166]
		};
		break;
	case "resto":
		n = {
			"Kiosque la Ronde des Saveurs": [45.764354, 3.087001],
			"RU Le Clos Saint-Jacques": [45.764129, 3.087155],
			"RU Le Cratère": [45.768927, 3.093009],
			"Brasserie Le Manège": [45.775195, 3.092509],
			"RU Philippe-Lebon": [45.771567, 3.092524],
			"Sandwicherie Chez Lily": [45.77156, 3.092374],
			"Brasserie La Terrasse": [45.764523, 3.087001],
			"RU Odontologie": [45.773461, 3.084205],
			"RU Rest’Océzo": [45.758433, 3.11372],
			"RU Plat’Océzo": [45.758521, 3.113911],
			"RU Rapid’Océzo": [45.758457, 3.113497],
			"Brasserie La Véranda": [45.758556, 3.113964],
			"Brasserie Le Saxo": [45.759944, 3.113288],
			"Cafétaria de l’IUT": [45.762205, 3.108407],
			"Le Nota Bene": [45.759876, 3.112779],
			"Les Hauts De L’Artière": [45.758573, 3.113809],
			"Cafétéria Le Dunant": [45.759791, 3.089363],
			"RU Montlucon et Brasserie": [46.330615, 2.58978],
			"RU IUT Montlucon": [46.328493, 2.589528]
		};
		break;
	case "heberg":
		n = {
			"Maison Internationale Universitaire": [45.769675, 3.087607],
			"Résidence Amboise": [45.774733, 3.092651],
			"Résidence du Clos Saint-jacques": [45.764395, 3.086879],
			"Résidence du Clos Saint-jacques Dolet A": [45.764385, 3.087121],
			"Résidence du Clos Saint-jacques Dolet B": [45.764454, 3.087762],
			"Résidence du Clos Saint-jacques Dolet C": [45.764086, 3.08811],
			"Résidence du Clos Saint-jacques Dolet E": [45.764988, 3.087172],
			"Résidence du Clos Saint-jacques Dolet F": [45.765439, 3.086911],
			"Studios des Cézeaux Bat 20": [45.757078, 3.110703],
			"Studios des Cézeaux Bat 21": [45.756589, 3.111151],
			"Studios des Cézeaux Bat 22": [45.756299, 3.11169],
			"Résidence des Cézeaux Cite 1": [45.759726, 3.118057],
			"Résidence des Cézeaux Cite 2": [45.755845, 3.110056],
			"Résidence Philippe-Lebon A": [45.771352, 3.092564],
			"Résidence Philippe-Lebon B": [45.771332, 3.092173],
			"Résidence Philippe-Lebon C": [45.77169, 3.09258],
			"Résidence Anatole-France": [45.77855, 3.109856],
			"Résidence Les Jardins": [45.77348, 3.102232],
			"Résidence La Gare": [45.780183, 3.102734],
			"Résidence La Poterne": [45.780285, 3.08978],
			"Résidence Le Port": [45.780285, 3.08978],
			"Résidence Paul-Collomp": [45.773864, 3.091697],
			"Résidence Poncillon": [45.76311, 3.083912],
			"Résidence Les Hauts de Lafayette": [45.76928, 3.104708],
			"Cité U - Montlucon": [46.330615, 2.58978]
		};
		break;
	case "divers":
		n = {
			"Service Université Handicap": [45.759799, 3.113036],
			"ESPACE INFO JEUNES": [45.7770271, 3.085534300000063],
			"Mission des Relations Internationales": [45.7795502, 3.090145]
		};
		break
	}
	t += '<li class="ui-btn ui-btn-up-a ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child" onclick="showAll_listemap();"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#menupage" class="ui-link-inherit" data-transition="slide">Affichez tout</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';
	for (var r in n) {
		t += '<li class="ui-btn ui-btn-up-a ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child"' + 'onclick="initialize_googlemap(' + n[r][0] + "," + n[r][1] + ');">' + '<div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a class="ui-link-inherit" data-transition="slide">' + r + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span></div></li>';
		counter++
	}
	$("#listIntoBuilding").html(t);
	$("#listBuilding").hide();
	$("#listIntoBuilding").show();
	$("#itineraireText").hide();
	$("#listMapHolder").hide();
	a = 1;
	$("#backButton").attr("onclick", "back_to_category_listemap(" + a + ")")
}
function set_attribute_listemap(e) {
	switch (e) {
	case "universite":
		listAttribute = "universite";
		break;
	case "sante":
		listAttribute = "sante";
		break;
	case "loisir":
		listAttribute = "loisir";
		break;
	case "BU":
		listAttribute = "BU";
		break;
	case "resto":
		listAttribute = "resto";
		break;
	case "heberg":
		listAttribute = "heberg";
		break;
	case "divers":
		listAttribute = "divers";
		break
	}
}
function showAll_listemap() {
	var e;
	
	$("#listmapHeader").hide();
	$("#listBuilding").hide();
	$("#listIntoBuilding").hide();
	$("#itineraireText").show();
	$("#listMapHolder").show();
	
	address = new google.maps.LatLng(45.770584, 3.087909);
	mapOptions = {
		zoom: 9,
		center: address,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("listMapHolder"), mapOptions);
	
	switch (listAttribute) {
	case "universite":
		e = new google.maps.KmlLayer({
			url: "https://sites.google.com/site/udamobilev2/kml/universite.kml?attredirects=0&d=1"
		});
		e.setMap(map);
		break;
	case "sante":
		e = new google.maps.KmlLayer({
			url: "https://sites.google.com/site/udamobilev2/kml/sante.kml?attredirects=0&d=1"
		});
		e.setMap(map);
		break;
	case "loisir":
		e = new google.maps.KmlLayer({
			url: "https://sites.google.com/site/udamobilev2/kml/loisir.kml?attredirects=0&d=1"
		});
		e.setMap(map);
		break;
	case "BU":
		e = new google.maps.KmlLayer({
			url: "https://sites.google.com/site/udamobilev2/kml/BU.kml?attredirects=0&d=1"
		});
		e.setMap(map);
		break;
	case "resto":
		e = new google.maps.KmlLayer({
			url: "https://sites.google.com/site/udamobilev2/kml/RU.kml?attredirects=0&d=1"
		});
		e.setMap(map);
		break;
	case "heberg":
		e = new google.maps.KmlLayer({
			url: "https://sites.google.com/site/udamobilev2/kml/HU.kml?attredirects=0&d=1"
		});
		e.setMap(map);
		break;
	case "divers":
		e = new google.maps.KmlLayer({
			url: "https://sites.google.com/site/udamobilev2/kml/divers.kml?attredirects=0&d=1"
		});
		e.setMap(map);
		break
	}
}
function back_to_category_listemap(e) {
	if (e == 1) {
		$("#listmapHeader").show();
		$("#listIntoBuilding").hide();
		$("#listBuilding").show();
		$("#listMapHolder").hide();
		$("#backButton").attr("onclick", "window.location='#mapPage';")
	} else {
		e = 1;
		$("#listmapHeader").show();
		$("#listIntoBuilding").show();
		$("#listBuilding").hide();
		$("#listMapHolder").hide();
		$("#backButton").attr("onclick", "back_to_category_listemap(" + e + ")")
	}
}
function initialize_googlemap(e, t) {
	switch (typePage) {
	case "restaurant":
		end = new google.maps.LatLng(e, t);
		break;
	case "map":
		input = document.getElementById("geolocalSearchTextField");
		autocomplete = new google.maps.places.Autocomplete(input);
		address = new google.maps.LatLng(45.769, 3.09);
		mapOptions = {
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: address,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
				mapition: google.maps.ControlPosition.TOP_LEFT
			}
		};
		map = new google.maps.Map(document.getElementById("geolocalMapHolder"), mapOptions);
		google.maps.event.trigger(map, "resize");
		break;
	case "listemap":
		e[0] = e;
		t[0] = t;
		end = new google.maps.LatLng(e, t);
		break
	}
	getLocation()
}
function getLocation() {
	$.msgBox({
		title: "Chargement...",
		content: "Chargement de l'itinéraire...",
		type: "info",
		opacity: .9,
		showButtons: false,
		autoClose: true
	});
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError)
	} else {
		alert("La géolocalisation n'est pas supporté par le navigateur.")
	}
}
function showPosition(e) {
	var t, n, r;
	address = new google.maps.LatLng(e.coords.latitude, e.coords.longitude);
	switch (typePage) {
	case "restaurant":
		$("#restaurantAddressText").empty();
		t = new google.maps.DirectionsRenderer;
		n = new google.maps.DirectionsService;
		r = {
			origin: address,
			destination: end,
			region: "fr",
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		mapOptions = {
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: address,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
				position: google.maps.ControlPosition.TOP_LEFT
			}
		};
		map = new google.maps.Map(document.getElementById("restaurantMapHolder"), mapOptions);
		t.setMap(map);
		t.setPanel(document.getElementById("restaurantAddressText"));
		n.route(r, function (e, n) {
			if (n == google.maps.DirectionsStatus.OK) {
				t.setDirections(e)
			}
		});
		distance = google.maps.geometry.spherical.computeDistanceBetween(address, end);
		
		$("#restaurantAddressText").hide();
		break;
	case "map":
		mapOptions = {
			zoom: 17,
			center: address,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("geolocalMapHolder"), mapOptions);
		google.maps.event.trigger(map, "resize");
		myMarker = new google.maps.Marker({
			map: map,
			position: address
		});
		break;
	case "listemap":
		a = 2;
		$("#listmapHeader").hide();
		$("#listBuilding").hide();
		$("#listIntoBuilding").hide();
		$("#itineraireText").empty();
		$("#itineraireText").show();
		$("#listMapHolder").show();
		$("#backButton").attr("onclick", "back_to_category_listemap(" + a + ")");
		latitude[1] = new google.maps.LatLng(e.coords.latitude);
		longitude[1] = new google.maps.LatLng(e.coords.longitude);
		t = new google.maps.DirectionsRenderer, n = new google.maps.DirectionsService, r = {
			origin: address,
			destination: end,
			region: "fr",
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		mapOptions = {
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: address,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
				position: google.maps.ControlPosition.TOP_LEFT
			}
		};
		map = new google.maps.Map(document.getElementById("listMapHolder"), mapOptions);
		t.setMap(map);
		t.setPanel(document.getElementById("itineraireText"));
		n.route(r, function (e, n) {
			if (n == google.maps.DirectionsStatus.OK) {
				t.setDirections(e)
			}
		});
		distance = google.maps.geometry.spherical.computeDistanceBetween(address, end);
		break
	}
}
function showError(e) {
	switch (e.code) {
	case e.PERMISSION_DENIED:
		alert("Géolocalisation non authorisée.");
		break;
	case e.POSITION_UNAVAILABLE:
		alert("Localisation non disponible.");
		break;
	case e.TIMEOUT:
		alert("Echec de la localisation.");
		break;
	case e.UNKNOWN_ERROR:
		alert("Erreur inconnue.");
		break
	}
}
var nbelt, i, m, jsonResto, lat, lon, mapOptions, map, address, end, distance, myMarker, nomRestaurant, jour, month, input, autocomplete, listAttribute, typePage, a, counter, saveList, dateCROUS,
	latitude = new Array([]),
	longitude = new Array([]);