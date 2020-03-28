mapboxgl.accessToken = 'pk.eyJ1IjoibWNob3dkaHVyeSIsImEiOiJjazZzdHJta2swNzN2M2tyeHBmZTcycTI4In0.StlNQAWNUjcDoPBeZyIvGw';

var initialCenterPoint = [-73.975, 40.735]
var initialZoom = 10
var geodata

$.getJSON('.data/school_points.gejson', function (results) {
    // Assign the results to the geojsonData variable
    geodata = results;
});

console.log(geodata.length);

var map = new mapboxgl.Map({
  container: 'map-container',
  style: 'mapbox://styles/mapbox/light-v10',
  center: initialCenterPoint,
  zoom: initialZoom
});

// add zoom and rotation controls to the map
map.addControl(new mapboxgl.NavigationControl());

// wait for the initial style to Load
map.on('style.load', function() {
  
  // converted shapefile to GeoJSON from: https://data.cityofnewyork.us/Education/School-Point-Locations/jfju-ynrr
  // add GeoJSON source to the map
  map.addSource('school-source', {
    type: 'geojson',
    data: './data/school_points.geojson',
  });
  
  // add empty source for highlight feature later
  map.addSource('highlight-feature', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  }) 
  
  // let's make sure the sources got added by logging the current map state to the console
  console.log(map.getStyle().sources)
 
  // add the school points layer to the map
  map.addLayer({
    id: 'school-points',
    type: 'circle',
    source:'school-source',
    layout: {
      visibility: 'none'
    },
    
  //close map.addLayer({
  });
  
  
  

  
  
  
//close map.on *(* 'style.load', function() *{*
})
