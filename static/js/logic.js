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
        layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")}
    
        // Define Variable for Earthquake Marker
        var earthquakes = L.geoJSON(earthquakeData, {
        
            // Define Function to Generate a Circle Marker as the Earthquake Marker
            pointToLayer: function(earthquakeData) {

                // Set Condition for Earthquake Magnitude of 5+
                if (earthquakeData.properties.mag >= 5){

                    // Generate a Red Circle Marker
                    return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
                        radius: earthquakeData.properties.mag * 10,
                        color: "red",
                        fillcolor: "red", 
                        fillOpacity: 1})}

                // Set Condition for Earthquake Magnitude of 4+
                else if (earthquakeData.properties.mag >= 4){

                    // Generate a Orange Circle Marker
                    return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
                        radius: earthquakeData.properties.mag * 8,
                        color: "orange", 
                        fillcolor: "orange",
                        fillOpacity: 0.8})}
                
                // Set Condition for Earthquake Magnitude of 3+
                else if (earthquakeData.properties.mag >= 3){

                    // Generate a Yellow Circle Marker
                    return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
                        radius: earthquakeData.properties.mag * 6,
                        color: "yellow", 
                        fillcolor: "yellow",
                        fillOpacity: 0.6})}

                // Set Condition for Earthquake Magnitude of 2+
                else if (earthquakeData.properties.mag >= 2){

                    // Generate a Green Circle Marker
                    return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
                        radius: earthquakeData.properties.mag * 4,
                        color: "green", 
                        fillcolor: "green",
                        fillOpacity: 0.4})}

                // Set Condition for Earthquake Magnitude of 1+
                else if (earthquakeData.properties.mag >= 1){

                    // Generate a Blue Circle Marker
                    return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
                        radius: earthquakeData.properties.mag * 2,
                        color: "blue", 
                        fillcolor: "blue",
                        fillOpacity: 1})}
                else {

                    // Generate a Gray Circle Marker
                    return new L.CircleMarker([earthquakeData.geometry.coordinates[1], earthquakeData.geometry.coordinates[0]], {
                        radius: earthquakeData.properties.mag,
                        color: "gray", 
                        fillcolor: "gray",
                        fillOpacity: 0.2})}},
    
    // Call Function to Generate Individual Features
    onEachFeature: onEachFeature});

    // Call Function to Create Earthquake Map
    createMap(earthquakes)}

// Define Function to Create Earthquake Map
function createMap(earthquakes) {
    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: ""});

    var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: ""});

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: ""});

    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: ""});

    var baseMaps = {
        "Satellite Map": satellitemap,
        "Outdoors Map": outdoorsmap,
        "Dark Map": darkmap,
        "Light Map" : lightmap};

    var overlayMaps = {Earthquakes: earthquakes};

    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [satellitemap, earthquakes]});

    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);

    function getColor(d) {
        return d >= 5 ? 'red' :
            d >= 4 ? 'orange' :
            d >= 3 ? 'yellow' :
            d >= 2 ? 'green' :
            d >= 1 ? 'blue' :
                     'gray';}

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create('div', 'info legend'),
        magnitude = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"],
        labels = [];

        for (var i = 0; i < magnitude.length; i++) {
        div.innerHTML += '<i style="background:' + getColor(magnitude[i] + 1) + '"></i> ' +
            magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+')}

        return div};

    legend.addTo(myMap)}