
var url = "maps.geojson";  

d3.json("maps.geojson", function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
  var mapboxAccessToken = API_KEY;
  var map = L.map('map').setView([37.8, -96], 4);
  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
      id: 'mapbox.light',
      //attribution: ...
  }).addTo(map);
  
  L.geoJson(data).addTo(map);	

})
  


//Initial Setup  with layer Verified No



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
  
  //L.geoJson(data, {style: style}).addTo(map);
  
  function highlightFeature(e) {
    var layer = e.target;
  
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });



 var fir_data = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
  

	
/// END Initial Setup

	//Using a Layer Group to add/ remove data from the map.
	var myData =  L.layerGroup([]);
		myData.addLayer(fir_data);
		myData.addTo(map); 
}	
		
	//If Radio Button one is clicked.  
	document.getElementById("radioOne").addEventListener('click', function(event) {
	theExpression = 'feature.properties.density !== " " ';
	console.log(theExpression);	
		
		myData.clearLayers();
		map.removeLayer(myData);
		
        fir_data = L.geoJson(data, {
            style: style,
            onEachFeature: onEachFeature
          }).addTo(map);
		
		
		$.getJSON(url, function(data) {
			   fir_data.addData(data);
		});

	    myData.addLayer(fir_data);
  		myData.addTo(map);;
    });
	
	
	
  //If Radio button two is clicked.
	document.getElementById("radioTwo").addEventListener('click', function(event) {
	theExpression = 'feature.properties.Verified == "Y" ';	
	console.log(theExpression);
		map.removeLayer(myData);
		myData.clearLayers();
		
		fir_data = L.geoJson(null, {

			pointToLayer: function(feature, latlng) {

				return L.circleMarker(latlng, {
					color:'black',
					fillColor:  'green',
					fillOpacity: 1,
					radius: 8
				})
			},  
			onEachFeature: function (feature, layer) {
				layer.bindPopup(feature.properties.Verified);
			},
			filter: function(feature, layer) {   
				 return (feature.properties.Verified == "Y" );
			},

		});
		
		$.getJSON(url, function(data) {
			   ci_data.addData(data);
		});

	    myData.addLayer(fir_data);
		myData.addTo(map);
    });
	 
