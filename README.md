# USGS-Earthquake-Analysis

The goal of this project was to use JavaScript to present an interactive map visualization of USGS earthquake data within a web page. Since the baseline data was provided in GeoJSON format, Leaflet was used to import and process the data, as well as generate the required visualization.

## Questions

1. What are the locations and magnitudes of all earthquake events in the last twenty-four hours?

## Datasets

1. https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

## Tasks

1. Import the GeoJSON data.
2. Extract the location, magnitude, and timestamp of each earthquake data point.
3. Create a popup box with that information for each earthquake data point.
4. Create a circle marker to represent each earthquake data point whose size is proportional to that earthquake's magnitude.
5. Import four map layers (satellite, outdoors, dark, light) from the Mapbox API.
6. Link the map layers, circle markers, and popup boxes together to create the interactive map.
7. Create a legend for the circle markers and add it to the map.

## Results

1. https://github.com/mjknj18/USGS-Earthquake-Analysis/blob/master/index.html (Run this file in a browser.)