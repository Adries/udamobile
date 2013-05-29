            function search_er() {
                map = new google.maps.Map(document.getElementById('mapholder'),mapOptions);
                autocomplete.bindTo('bounds', map);
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    // Inform the user that the place was not found and return.
                    input.className = 'notfound';
                    return;
                }
                    // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17); 
                    }
				//alert(place.geometry.location);
				var infowindow = new google.maps.InfoWindow({
					map: map,
					position: place.geometry.location,
					content: input.value
				});
				/*
                myMarker = new google.maps.Marker({
                    map: map,
					position: place.geometry.location
                });
				*/
                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                    infowindow.close();
                    marker.setVisible(false);
                    input.className = '';
                    var place = autocomplete.getPlace();
                    if (!place.geometry) {
                        // Inform the user that the place was not found and return.
                        input.className = 'notfound';
                        return;
                    }

                    // If the place has a geometry, then present it on a map.
                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
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
		