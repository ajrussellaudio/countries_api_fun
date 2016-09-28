var map;
var countries;

var findCountryByName = function( name ){
  for( var i = 0; i < countries.length; i++ ){
    if(countries[i].name === name){
      return countries[i]
    }
  }
}

var makeInfoContent = function( country ) {

  var container = document.createElement("div");

  var header = document.createElement("h1");
  header.innerText = country.name;

  var pCapital = document.createElement("p");
  pCapital.innerText = "Capital: " + country.capital

  var pJapanese = document.createElement("p");
  pJapanese.innerText = "Japanese: " + country.translations.ja;

  var pTime = document.createElement("p");
  pTime.innerText = "Time: " + Date.now();

  container.appendChild(header);
  container.appendChild(pCapital);
  container.appendChild(pJapanese);
  container.appendChild(pTime);


  return container
}

var handleSelectChange = function() {
  var country = findCountryByName( this.value )
  console.log( country.latlng )
  var latLng = {
    lat: country.latlng[0],
    lng: country.latlng[1]
  }
  map.moveMarker( latLng );
  var content = makeInfoContent( country );
  map.updateInfo( content );
  // window.alert(country.capital);
}

var createSelect = function() {
  var select = document.createElement( "select" );
  return select;
}

var createListItems = function( countries ) {
  var options = [];
  for(var i = 0; i < countries.length; i++ ){
    var country = countries[i];
    var option = document.createElement( "option" );
    option.value = country.name;
    option.innerText = country.name;
    options.push( option );
  }
  return options;
}

var createMenu = function( select, options ) {
  for( var i = 0; i < options.length; i++ ){
    var option = options[i];
    select.add( option )
  }
  return select;
}

var appendNode = function( query, item ) {
  var target = document.querySelector( query );
  target.appendChild( item );
}

var addMenu = function( countries ) {
  var menuBox = createSelect();
  var listItems = createListItems( countries );
  var menu = createMenu( menuBox, listItems );
  appendNode( "#country-menu", menu );
}

var requestComplete = function() {
  if( this.status !== 200 ) return;
  var jsonString = this.responseText;
  countries = JSON.parse( jsonString );
  addMenu( countries );
  var menu = document.querySelector("select");
  menu.onchange = handleSelectChange;
}

var makeRequest = function( url, callback ) {
  var request = new XMLHttpRequest();
  request.open( "GET", url );
  request.onload = callback;
  request.send();
}

var app = function(){
  var container = document.getElementById("map");
  var centre = { lat:0, lng:0};
  var zoom = 5;
  map = new Map( container, centre, zoom );
  var url = "http://localhost:5000";
  console.log("before request");
  makeRequest( url, requestComplete );
  console.log("after request");
}

window.onload = app;