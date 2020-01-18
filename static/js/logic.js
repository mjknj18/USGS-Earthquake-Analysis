// Define URL for USGS Earthquake Data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Import Geo JSON Data & Call Function to Create Map Features
d3.json(queryUrl, function(data) {
    createFeatures(data.features);
});

// Define Function for Creating Map Features
function createFeatures(earthquakeData) {
    
    // Define Function for Generating Individual Features
    function onEachFeature(feature, layer) {

        // Generate Informational Pop Up for Each Earthquake
        layer.bindPopup("<h3>" + feature.properties.mag + " - " + feature.properties.place + "</h3><hr><p>" + 
            new Date(feature.properties.time) + "</p>")}
    
        // Define Variable for Earthquake Marker
        var earthquakes = L.geoJSON(earthquakeData, {
        
            // Define Function to Generate a Circle Marker as the Earthquake Marker
            pointToLayer: function(earthquakeData) {

                // Set Condition for Earthquake Magnitude of 5+
                if (earthquakeData.properties.mag >= 5){

                    // Generate a Red Circle Marker
                    return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
                        radius: earthquakeData.properties.mag * 10,
                        color: "#EA2C2C",
                        fillcolor: "#EA2C2C", 
                        fillOpacity: 1})}

                // Set Condition for Earthquake Magnitude of 4+
                else if (earthquakeData.properties.mag >= 4){

                    // Generate a Orange Circle Marker
                    return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
                        radius: earthquakeData.properties.mag * 8,
                        color: "#EA822C", 
                        fillcolor: "#EA822C",
                        fillOpacity: 0.8})}
                
                // Set Condition for Earthquake Magnitude of 3+
                else if (earthquakeData.properties.mag >= 3){

                    // Generate a Yellow Circle Marker
                    return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
                        radius: earthquakeData.properties.mag * 6,
                        color: "#EE9C00", 
                        fillcolor: "#EE9C00",
                        fillOpacity: 0.6})}

                // Set Condition for Earthquake Magnitude of 2+
                else if (earthquakeData.properties.mag >= 2){

                    // Generate a Green Circle Marker
                    return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
                        radius: earthquakeData.properties.mag * 4,
                        color: "#EECC00", 
                        fillcolor: "#EECC00",
                        fillOpacity: 0.4})}

                // Set Condition for Earthquake Magnitude of 1+
                else if (earthquakeData.properties.mag >= 1){

                    // Generate a Blue Circle Marker
                    return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
                        radius: earthquakeData.properties.mag * 2,
                        color: "#D4EE00", 
                        fillcolor: "#D4EE00",
                        fillOpacity: 1})}
                else {

                    // Generate a Gray Circle Marker
                    return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
                        radius: earthquakeData.properties.mag,
                        color: "#98EE00", 
                        fillcolor: "#98EE00",
                        fillOpacity: 0.2})}},
    
    // Call Function to Generate Individual Features
    onEachFeature: onEachFeature});

    // Call Function to Create Earthquake Map
    createMap(earthquakes)}

// Define Function to Create Earthquake Map
function createMap(earthquakes) {

    // Define Satellite Map Layer
    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: "API-KEY"});

    // Define Outdoors Map Layer
    var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: "API-KEY"});

    // Define Dark Map Layer
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: "API-KEY"});

    // Define Light Map Layer
    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: "API-KEY"});

    // Define Array of Available Maps
    var baseMaps = {
        "Outdoors Map": outdoorsmap,
        "Satellite Map": satellitemap,
        "Dark Map": darkmap,
        "Light Map" : lightmap};

    // Define Data Layer
    var overlayMaps = {Earthquakes: earthquakes};

    // Define Map Object
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [outdoorsmap, earthquakes]});

    // Add Map Layers & Data Layer to Map Object
    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);

    // Define Variable for Map Legend
    var legend = L.control({position: 'bottomright'});

    // Define Legend Content & Add to Legend
    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create('div', 'info legend'),
        magnitude = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"],
        color = ['#98EE00', '#D4EE00', '#EECC00', '#EE9C00', '#EA822C', '#EA2C2C'];

        for (var i = 0; i < magnitude.length; i++) {
            div.innerHTML += '<i style="background:' + color[i] + '"></i> ' + magnitude[i] + '<br>'}

        return div};

    // Add Legend to Map Object
    legend.addTo(myMap)}