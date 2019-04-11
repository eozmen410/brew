function initMap() {
    var manhattan = { lat: 40.75, lng: -73.98 }
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: manhattan
    });
    var geocoder = new google.maps.Geocoder();
    $.each(data, function (key, value) {
      console.log(value['address'])
      geocodeAddress(value['address'], key, geocoder, map);
    })

  }

  function geocodeAddress(address, name, geocoder, resultsMap) {
    console.log(address)
    console.log(geocoder)
    console.log(resultsMap)
    // var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === 'OK') {
        // resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
          label : name
        });
        console.log(marker)
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
