var map;
var myMarker;		
var input ;
var autocomplete ;
var address ;			
var mapOptions;
var directionDisplay;
var directionsService;
var end;


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

		