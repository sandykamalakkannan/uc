
    // Once we get a response, send the data.features object to the createFeatures function
  var mapboxAccessToken = API_KEY;
  d3.json("static/maps.geojson", function(data) {
  var map = L.map('map').setView([37.8, -96], 4);
 
    
 L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
        id: 'mapbox.light',
        //attribution: ...
    }).addTo(map);
    
    var geojson = L.geoJson(data).addTo(map);
  
  
  var sortData = data.features.sort(function(a, b) { return (b.properties.food_insecurity_rate - a.properties.food_insecurity_rate); });
  console.log(data.feature);
  
  var i =0 ;
  function getColor(feature) {
    i++;
    if (i<7) 
    {
    
    return '#006400' }
    else
    return '#FFFFE0';
  }
  
  function style(feature) {
  
    return {
        fillColor: getColor(feature.properties.food_insecurity_rate),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }
  
  
  L.geoJson(data, {style: style}).addTo(map);
  
  function highlightFeature(e) {
    var layer = e.target;
  
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
  
  
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }
  }
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }
  
  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }
  
  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
  }
  
  
  geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
  
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.name +
        "</h3><hr><p>" + feature.properties.food_insecurity_rate + "</p>");
    };
});



 
