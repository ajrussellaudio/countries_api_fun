var Map = function(container, coords, zoom){

 this.googleMap = new google.maps.Map( container, {
   center: coords,
   zoom: zoom,
   mapTypeId: 'hybrid'
 });

 var marker = new google.maps.Marker({
   map: null,
   position: { lat:0, lng:0},
   animation: google.maps.Animation.BOUNCE
 })

 // marker.addListener('click', function(){
 //   infowindow.open(this.googleMap, marker);
 // })

 var infowindow = new google.maps.InfoWindow({

 })

 this.moveMarker = function( coords ){
   marker.setPosition(coords);
   marker.setMap(this.googleMap);
   infowindow.close();
   infowindow.setPosition(coords);
   this.googleMap.panTo(coords);
   this.googleMap.setZoom(5);
   marker.setAnimation(google.maps.Animation.BOUNCE);
   window.setTimeout(function(){
     marker.setAnimation(null);
   }, 3000);
   infowindow.open(this.googleMap, marker);
 }

 this.updateInfo = function(content){
   infowindow.setContent(content);
 }
}