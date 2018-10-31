
// Perform a GET request to the query URL
d3.json("static/maps.geojson", function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
var mapboxAccessToken = API_KEY;
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    //attribution: ...
}).addTo(map);

L.geoJson(data).addTo(map);

function getColor(d) {
  return d > 5000000 ? '#800026' :
         d > 1000000  ? '#BD0026' :
         d > 700000  ? '#E31A1C' :
         d > 500000  ? '#FC4E2A' :
         d > 300000   ? '#FD8D3C' :
         d > 200000   ? '#FEB24C' :
         d > 100000   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties.food_insecure_individuals),
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

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); 
    this.update();
    return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>food_insecure_individuals</h4>' +  (props ?
      '<b>' + props.name + '</b><br />' + props.food_insecure_individuals + ' people / mi<sup>2</sup>'
      : 'Hover over a state');
};

info.addTo(map);

function onEachFeature(feature, layer) {
  layer.bindPopup("<h3>" + feature.properties.name +
    "</h3><hr><p>" + feature.properties.food_insecure_individuals + "</p>");
}


info.addTo(map);
})


