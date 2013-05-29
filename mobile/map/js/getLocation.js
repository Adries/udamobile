function getLocation() {
				//window.location='map.html';
				alert("Loading, please wait...");
				$('#Loading').show();
				$("#mapholder").css({ opacity: 0, zoom: 0 });
				if (navigator.geolocation)
				{
					navigator.geolocation.getCurrentPosition(showPosition,showError);
				}
				else{x.innerHTML="Geolocation is not supported by this browser.";}
			}

			function showPosition(position)
			{
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
					position: address,
					title: "TEST"
				});	
				$('#mapholder').show();
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

			function calcRoute(position,end) {
				directionsDisplay.setMap(map);
				directionsDisplay.setPanel(document.getElementById("mapplacetext"));
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
				address = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
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
			}
		