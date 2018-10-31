
// Store our API endpoint inside queryUrl
var queryUrl = "maps.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  //createFeatures(data.features);
  createFeatures1(data.features);
  });



function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.name +
      "</h3><hr><p>" + feature.properties.food_insecurity_rate + "</p>");

      
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {      
    onEachFeature: onEachFeature,
    style: style
   

  });
  
  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}


function getColor(d) {
    return d > 100 ? '#800026' :
           d > 30  ? '#BD0026' :
           d > 20  ? '#E31A1C' :
           d > 15  ? '#FC4E2A' :
           d > 10   ? '#FD8D3C' :
           d > 5   ? '#FEB24C' :
           d > 0   ? '#FED976' :
                      '#FFEDA0';
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
  
  
  function highlightFeature(e) {
    var layer = e.target;
  
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
  }




  function createFeatures1(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.name +
        "</h3><hr><p>" + feature.properties.food_insecure_individuals + "</p>");
  
        
    }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
      var earthquakes1 =L.geoJSON(earthquakeData, {      
      onEachFeature: onEachFeature,
      style: style1
     
  
    });
    
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes1);
  }

  


  function getColor1(d) {
    return d > 5000000 ? '#800026' :
           d > 2000000  ? '#BD0026' :
           d > 1000000  ? '#E31A1C' :
           d > 500000  ? '#FC4E2A' :
           d > 300000   ? '#FD8D3C' :
           d > 200000   ? '#FEB24C' :
           d > 100000   ? '#FED976' :
                      '#FFEDA0';
  }
  
  function style1(feature) {
    return {
        fillColor: getColor1(feature.properties.food_insecure_individuals),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }
  
  
  function highlightFeature(e) {
    var layer = e.target;
  
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
  

  }



function createMap(earthquakes1) {
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY


  });

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY

    
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Light Map": streetmap,
    "Dark Map": darkmap
};
  
  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Food_Insecurity_Rate: earthquakes1,
    Another_Layer:earthquakes1
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes1]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps , overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
