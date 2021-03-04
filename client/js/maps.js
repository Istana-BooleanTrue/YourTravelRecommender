let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: new google.maps.LatLng(-6.1753924,106.8249641),
    zoom: 13
  });
  
  let latLng = new google.maps.LatLng(-6.1753924,106.8249641);    
  new google.maps.Marker({
  position: latLng,
  map: map
  });  

  const trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);  

}