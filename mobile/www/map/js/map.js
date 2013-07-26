var map, myMarker, input, autocomplete, address, mapOptions, directionDisplay, end, html="", a=3, counter=0, nbelt, i, lat, lon, requeteItineraire, directionsService;
/**
 * initialize
 */
function initialize() {		
	$('#Loading').hide();
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	input = document.getElementById('searchTextField');
	autocomplete = new google.maps.places.Autocomplete(input);
	address = new google.maps.LatLng(45.769,3.09);		
	end= new google.maps.LatLng(45.764892,3.086801);
	mapOptions = {
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: address,
		mapTypeControlOptions:
		{
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			mapition: google.maps.ControlPosition.TOP_LEFT
		}
	};	
	map = new google.maps.Map(document.getElementById('mapholder'),mapOptions);
	google.maps.event.trigger(map,'resize');
}

/**
 * getLocation
 */
function getLocation() {
	$.msgBox({
		title: 'loading...',
		content: 'chargement...',
		type: 'info',
		opacity: 0.9,
		showButtons: false,
		autoClose: true
	});
	$('#Loading').show();
	$('#mapholder').css({ opacity: 0, zoom: 0 });
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition,showError);
	}
	else {
		x.innerHTML = 'Geolocation is not supported by this browser.';
	}
}

/**
 * showPosition
 * @param position
 */
function showPosition(position) {
	address = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	mapOptions = {
		zoom: 17,
		center: address,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('mapholder'),mapOptions);	
	google.maps.event.trigger(map,'resize');
	myMarker = new google.maps.Marker({
		map: map,
		position: address
	});	
	$('#mapholder').show();
	$('#liste_class').hide();
	$('#mapholder').css({ opacity: 1, zoom: 1 });
	$('#Loading').hide();
}

/**
 * showError
 * @param error
 */
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

/**
 * calcRoute
 * @param position
 * @param end
 */
function calcRoute(position,end) {
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('mapplacetext'));
	requeteItineraire = {
		origin: address,
		destination: end,
		region: 'fr',
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(requeteItineraire, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
	address = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	var selectedMode = document.getElementById('searchTextField').value;
	requeteItineraire = {
		origin: address,
		destination: end,
		region: "fr",
		travelMode: google.maps.TravelMode[selectedMode]
	};
	directionsService.route(requeteItineraire, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
}

/**
 * search_er
 */
function search_er() {
	map = new google.maps.Map(document.getElementById('mapholder'),mapOptions);
	autocomplete.bindTo('bounds', map);
	var place = autocomplete.getPlace();
	if (!place.geometry) {
		//Inform the user that the place was not found and return.
		input.className = 'notfound';
		return;
	}
	//If the place has a geometry, then present it on a map.
	if (place.geometry.viewport) {
		map.fitBounds(place.geometry.viewport);
	} 
	else {
		map.setCenter(place.geometry.location);
		map.setZoom(17); 
	}
	
	var infowindow = new google.maps.InfoWindow({
		map: map,
		position: place.geometry.location,
		content: input.value
	});
	
	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		infowindow.close();
		marker.setVisible(false);
		input.className = '';
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			//Inform the user that the place was not found and return.
			input.className = 'notfound';
			return;
		}
		//If the place has a geometry, then present it on a map.
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} 
		else {
			map.setCenter(place.geometry.location);
			map.setZoom(15);  // between 15-17 Because it looks good.
		}
		myMarker = new google.maps.Marker({
			map: map,
			position: place.geometry.location
		});
		address = '';
		if (place.address_components) {
			address = [
			(place.address_components[0] && place.address_components[0].short_name || ''),
			(place.address_components[1] && place.address_components[1].short_name || ''),
			(place.address_components[2] && place.address_components[2].short_name || '')
			].join(' ');
		}
		getLatLng( address );
	});
}