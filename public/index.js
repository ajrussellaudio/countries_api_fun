var createSelect = function() {
  var select = document.createElement( "select" );
  return select;
}

var createListItems = function( countries ) {
  var options = [];
  for(var i = 0; i < countries.length; i++ ){
    var country = countries[i];
    var option = document.createElement( "option" );
    option.value = country.latlng;
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
  return menu;
}

var requestComplete = function() {
  if( this.status !== 200 ) return;
  var jsonString = this.responseText;
  var countries = JSON.parse( jsonString );
  var menu = addMenu( countries );
  // menu.onchange = updateMap( latLng );
}

var makeRequest = function( url, callback ) {
  var request = new XMLHttpRequest();
  request.open( "GET", url );
  request.onload = callback;
  request.send();
}

var app = function(){
  var url = "http://localhost:5000";
  console.log("before request");
  makeRequest( url, requestComplete );
  console.log("after request");
}

window.onload = app;