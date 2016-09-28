var Map = function(container, coords, zoom){

 this.googleMap = new google.maps.Map( container, {
   center: coords,
   zoom: zoom
 });

 var marker = new google.maps.Marker({
   map: this.googleMap,
   position: { lat:0, lng:0},
   animation: google.maps.Animation.BOUNCE
 })

 marker.addListener('click', function(){
   infowindow.open(this.googleMap, marker);
 })

 var infowindow = new google.maps.InfoWindow({

 })

 this.moveMarker = function( coords ){
   marker.setPosition(coords);
   infowindow.close();
   infowindow.setPosition(coords);
   this.googleMap.panTo(coords);
   marker.setAnimation(google.maps.Animation.BOUNCE);
   window.setTimeout(function(){
     marker.setAnimation(null);
   }, 3000);
 }

 this.updateInfo = function(content){
   infowindow.setContent(content);
 }
}