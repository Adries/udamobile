var html="";
var a=3;

function listbuildings(list){
	$('#listbuildings').hide();
	$('#newlist').show();
	var places;

	switch(list){
	
	case 'universite':{
		places={
				'université': [45.770584,3.087909],
				'Faculté de Droit et de Science Politique':[45.771022,3.089612],
				'Faculté des Sciences Economiques et de Gestion':[45.771089,3.089397],
				'Faculté de Médecine':[45.760029,3.088859],
				'Faculté de Pharmacie':[45.760078,3.089143],
				'Faculté de Chirurgie Dentaire':[45.773413,3.083392],
				'Institut Universitaire Professionnalisé Management et Gestion des Entreprises':[45.769074,3.093491],
				'Institut de Préparation à Administration Générale':[45.768792,3.093351],
				'Institut de formation en soins infirmiers du CHU':[45.761464,3.092008],
				'Institut Universitaire de Technologie':[45.761861,3.108643],
				'IUT GEA Clermont':[45.768919,3.093582],
				'IUT Aurillac':[44.933528,2.441924],
				'IUT Le Puy':[45.0397634,3.881373],
				'Pôle Lardy - Vichy':[46.119973,3.424997],
				'IFSI Le Puy':[45.04999,3.877684],
				'IFSI Vichy':[46.123273,3.432956],
				'IFSI Moulins':[46.567334,3.328008],
				'IFSI Montluçon':[46.342456,2.610415],
				'IFSI Aurillac':[44.926644,2.435539],
				'CERDI':[45.77061,3.085839],
		};
		break;
	}
	

	case 'sante':{	
		places = {
				'SSU  SITE DE DOLET':[45.76444,3.087686],
				'SSU   U.F.R. SCIENCES':[45.759799,3.113036],
				'SSU  U.F.R. LETTRES':[45.771619,3.091046],
				'SSU  I.U.T. Cézeaux':[45.76182,3.108552],
				'SSU UFR-STAPS-INFIRMERIE':[45.760441,3.10776],
				'SSU DENTISTERIE PREVENTIVE UNIVERSITAIRE':[45.773413,3.083392],
		};
		break;
	}
	
	
	case 'loisir':{
		places = {
				'Service Université Culture':[45.771678,3.09095],
				'SUAPS Clermont-Ferrand':[45.763674,3.084635],
				'Stade P. Marcombes':[45.760618,3.084365],
				'Complexe sportif des Cézeaux':[45.758751,3.108058],
				'Stade nautique Pierre de Coubertin':[45.768601,3.084841],
				'Piscine municipale de Chamalières':[45.769285,3.066201],
				'Patinoire':[45.7624536,3.126646899999969],
		};
		break;
	}
	
	
	
	case 'BU':{
		places = {
				'Bibliothèque de Droit et de Sciences Economiques':[45.770992,3.089],
				'Bibliothèque de droit et sciences économiques-BU Rotonde':[45.769503,3.093699],
				'Bibliothèque du réseau Lettres-Bibliothèque Gergovia':[45.7720014,3.0903408000000354],
				'Bibliothèque Lafayette':[45.773798,3.087931],
				'Maison des sciences de l’homme':[45.7702883,3.0886350000000675],
				'Bibliothèque UFR LACC':[45.775542,3.091854],
				'Bibliothèques de UFR LLSH':[45.7720014,3.0903408000000354],
				'Bibliothèque de UFR PSSE':[45.7762787,3.0923298999999815],
				'Bibliothèque des Staps':[45.76027,3.107814],
				'Bibliothèque de lIFMA':[45.757665,3.112843],
				'Bibliothèque de géologie':[45.7701291,3.0873719999999594],
				'BU Sciences':[45.760244,3.113846],
				'Bibliothèque de Santé':[45.759761,3.089669],
				'Bibliothèque Odontologie':[45.77342,3.084197],
				'Bibliothèque de IUT':[45.762007,3.108466],
				'Bibliothèque de IUFM Auvergne':[45.770921,3.0727600000000166],
		};
		break;
	}
	
	case 'resto':{
		places = {
				'Kiosque la Ronde des Saveurs':[45.764354,3.087001],
				'RU Le Clos Saint-Jacques':[45.764129,3.087155],
				'RU Le Cratère':[45.768927,3.093009],
				'Brasserie Le Manège':[45.775195,3.092509],
				'RU Philippe-Lebon':[45.771567,3.092524],
				'Sandwicherie Chez Lily':[45.77156,3.092374],
				'Brasserie La Terrasse':[45.764523,3.087001],
				'RU Odontologie':[45.773461,3.084205],
				'RU Rest’Océzo':[45.758433,3.11372],
				'RU Plat’Océzo':[45.758521,3.113911],
				'RU Rapid’Océzo':[45.758457,3.113497],
				'Brasserie La Véranda':[45.758556,3.113964],
				'Brasserie Le Saxo':[45.759944,3.113288],
				'Cafétaria de l’IUT':[45.762205,3.108407],
				'Le Nota Bene':[45.759876,3.112779],
				'Les Hauts De L’Artière':[45.758573,3.113809],
				'Cafétéria Le Dunant':[45.759791,3.089363],
				'RU Montlucon et Brasserie':[46.330615,2.589780],
				'RU IUT Montlucon':[46.328493,2.589528],
		};
		break;
	}

	case 'heberg':{
		places = {
				'Maison Internationale Universitaire':[45.769675,3.087607],
				'Résidence Amboise':[45.774733,3.092651],
				'Résidence du Clos Saint-jacques':[45.764395,3.086879],
				'Résidence du Clos Saint-jacques Dolet A':[45.764385,3.087121],
				'Résidence du Clos Saint-jacques Dolet B':[45.764454,3.087762],
				'Résidence du Clos Saint-jacques Dolet C':[45.764086,3.088110],
				'Résidence du Clos Saint-jacques Dolet E':[45.764988,3.087172],
				'Résidence du Clos Saint-jacques Dolet F':[45.765439,3.086911],
				'Studios des Cézeaux Bat 20':[45.757078,3.110703],
				'Studios des Cézeaux Bat 21':[45.756589,3.111151],
				'Studios des Cézeaux Bat 22':[45.756299,3.111690],
				'Résidence des Cézeaux Cite 1':[45.759726,3.118057],
				'Résidence des Cézeaux Cite 2':[45.755845,3.110056],
				'Résidence Amboise':[45.774733,3.092651],
				'Résidence Philippe-Lebon A':[45.771352,3.092564],
				'Résidence Philippe-Lebon B':[45.771332,3.092173],
				'Résidence Philippe-Lebon C':[45.77169,3.09258],
				'Résidence Anatole-France':[45.77855,3.109856],
				'Résidence Les Jardins'	:[45.77348,3.102232],
				'Résidence La Gare':[45.780183,3.102734],
				'Résidence La Poterne':[45.780285,3.08978],
				'Résidence Le Port':[45.780285,3.08978],
				'Résidence Paul-Collomp':[45.773864,3.091697],
				'Résidence Poncillon':[45.76311,3.083912],
				'Résidence Les Hauts de Lafayette':[45.76928,3.104708],
				'Cité U - Montlucon':[46.330615,2.589780],
			
		 };
		break;
	 }	

	case 'divers':{
		places = {
			 	'Service Université Handicap':[45.759799,3.113036],
			 	'ESPACE INFO JEUNES':[45.7770271,3.085534300000063],
			 	'Mission des Relations Internationales':[45.7795502,3.090145],	
		};
		break;
	}
	}
	
	for(var i in places){
		 html += "<li class=\"ui-btn ui-btn-up-a ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child\" data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" onclick=\"showPosition(" + places[i][0]+ ","+ places[i][1] + ")\" data-wrapperels=\"div\" data-icon=\"arrow-r\" data-iconpos=\"right\" data-theme=\"a\"><div class=\"ui-btn-inner ui-li\"><div class=\"ui-btn-text\"><a class=\"ui-link-inherit\" data-transition=\"slide\" onclick=\"showPosition(" + places[i][0]+ ","+ places[i][1] + ")\">"+ i +"</a></div><span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"> </span></div></li>";
	}
	$('#newlist').html(html);
	$('#listbuildings').hide();
	a=1;
	$('#backButton').attr('onclick', 'back_to_category('+a+')');

}
function back_to_category(a){
	html="";
	if(a==1){
	$('#listbuildings').show();
	$('#newlist').hide();
	//$('#mapholder').hide();	
	$("#mapholder").css({ opacity: 0, zoom: 0 });
	$('#backButton').attr('onclick', 'window.location=\'map.html\'\;');
	}

	else{
		a=1;
		$('#newlist').show();
		$('#listbuildings').hide();
		//$('#mapholder').hide();
		$("#mapholder").css({ opacity: 0, zoom: 0 });
		$('#backButton').attr('onclick', 'back_to_category('+a+')');
	}
	
	
}

function showPosition(lat,lon)
{
	a=2;
	$('#backButton').attr('onclick', 'back_to_category('+a+')');
	var map;
	var myMarker;		
	var address ;			
	var mapOptions;
	address = new google.maps.LatLng(45.769,3.09);			
	mapOptions = {
		zoom: 17,
		center: address,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};	
	map = new google.maps.Map(document.getElementById('mapholder'),mapOptions);

	address = new google.maps.LatLng(lat,lon);
	mapOptions = {
		zoom: 17,
		center: address,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('mapholder'),mapOptions);
	google.maps.event.trigger(map,'resize');
	myMarker = new google.maps.Marker({
		map: map,
		position: address,
		title: "TEST"
	});	
	$("#listbuildings").hide();
	$("#newlist").hide();
	$("#header2").hide();
	//$("#mapholder").show();
	$("#mapholder").css({ opacity: 1, zoom: 1 });
}
