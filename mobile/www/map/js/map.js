var input, autocomplete, address, mapOptions, map, myMarker;

/**
 * initialize
 */
function initialize() {
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
}

/**
 * getLocation
 */
function getLocation() {
	$.msgBox({
		title: 'Chargement...',
		content: 'Chargement...',
		type: 'info',
		opacity: 0.9,
		showButtons: false,
		autoClose: true
	});
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError, {maximumAge: Infinity, timeout: 5000});
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
	alert('showPosition MAP : ici');
	address = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
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
 * search_er
 */
function search_er() {
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

$(document).ready(function() {
	initialize();
	getLocation();
});