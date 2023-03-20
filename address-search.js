// Get the value of 'task' from the script URL
scriptUrl = new URL(document.currentScript.src);
taskType = scriptUrl.searchParams.get('task');

$(document).ready(function(taskType) {
  var map;
  var marker;
  var dubaiBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(25.0080, 51.2400),
    new google.maps.LatLng(25.3880, 55.4300)
  );

  var latLng = new google.maps.LatLng(25.2048, 55.2708);
  map = new google.maps.Map(document.getElementById(taskType + "Map"), {
    center: latLng,
    zoom: 8,
    restriction: {
      latLngBounds: dubaiBounds,
      strictBounds: true
    }
  });

  var input = document.getElementById(taskType + "Address");
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setBounds(dubaiBounds);

  marker = new google.maps.Marker({
    map: map,
    position: latLng,
    draggable: true
  });

  google.maps.event.addListener(autocomplete, "place_changed", function() {
    var place = autocomplete.getPlace();
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    updateCoordinates(place.geometry.location);
  });

  google.maps.event.addListener(marker, "dragend", function() {
    if (dubaiBounds.contains(marker.getPosition())) {
      updateCoordinates(marker.getPosition());
    } else {
      alert("Pin must be dropped within Dubai boundaries");
      marker.setPosition(map.getCenter());
    }
  });
});

function updateCoordinates(latLng) {
  document.getElementById(taskType + "Latitude").value = latLng.lat();
  document.getElementById(taskType + "Longitude").value = latLng.lng();
}
