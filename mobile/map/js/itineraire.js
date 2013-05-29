var map;
var myMarker;		
var autocomplete ;
var address ;			
var mapOptions;
var directionDisplay;
var directionsService;
var end;
var requeteItineraire;


function initialize() {	
	
	$('#vehicule').hide();
	$('#Loading').hide();
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	address = new google.maps.LatLng(45.769,6);		
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
	directionsDisplay.setMap(map);
	
				
				alert("Loading, please wait...");
				$('#Loading').show();
				
				$("#mapholder").css({ opacity: 0, zoom: 0 });
				if (navigator.geolocation)
				{
					navigator.geolocation.getCurrentPosition(showPosition,showError);
				}
				else{x.innerHTML="Geolocation is not supported by this browser.";}
				google.maps.event.trigger(map,'resize');
				directionsDisplay.setPanel(document.getElementById("mapplacetext"));
			
}

function showPosition(position)
{
				address = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
				alert(position.coords.latitude+position.coords.longitude);
				requeteItineraire = {
						origin: address,
						destination: end,
						//region: "fr",
						travelMode: google.maps.DirectionsTravelMode.DRIVING
						};
				
						directionsService.route(requeteItineraire, function(response, status) {
						if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
						}
						});
						/*
						var selectedMode = document.getElementById("searchTextField").value;
						var requeteItineraire = {
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

				*/
					$('#liste_class').hide();
					$("#mapholder").css({ opacity: 1, zoom: 1 });
					$('#Loading').hide();
}

			function showError(error)
			{
				switch(error.code) 
				{
					case error.PERMISSION_DENIED:
					x.innerHTML="User denied the request for Geolocation."
					break;
					case error.POSITION_UNAVAILABLE:
					x.innerHTML="Location information is unavailable."
					break;
					case error.TIMEOUT:
					x.innerHTML="The request to get user location timed out."
					break;
					case error.UNKNOWN_ERROR:
					x.innerHTML="An unknown error occurred."
					break;
				}
			}
