mapboxgl.accessToken = 'pk.eyJ1IjoibWNob3dkaHVyeSIsImEiOiJjazZzdHJta2swNzN2M2tyeHBmZTcycTI4In0.StlNQAWNUjcDoPBeZyIvGw';

var initialCenterPoint = [-75.1652, 39.975]
var initialZoom = 11

var map = new mapboxgl.Map({
  container: 'map-container',
  style: 'mapbox://styles/mapbox/light-v10',
  center: initialCenterPoint,
  zoom: initialZoom
});

// add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// wait for the initial style to Load
map.on('style.load', function() {

  // add a geojson source to the map using our external geojson file
  // https://www.opendataphilly.org/dataset/bike-network
  // https://www.opendataphilly.org/dataset/bike-network/resource/8f30d7e4-127a-4cc0-9df3-6db7bcca41be
  // http://data.phl.opendata.arcgis.com/datasets/b5f660b9f0f44ced915995b6d49f6385_0.geojson
  map.addSource('philly-bike', {
    type: 'geojson',
    data: './data/philly-bike-data.geojson',
  });

  // let's make sure the source got added by logging the current map state to the console
  console.log(map.getStyle().sources)

  map.addLayer({
    id: 'bike-lanes',
    type: 'line',
    source:'philly-bike',
    paint: {
      'line-color': {
        type: 'categorical',
        property: 'TYPE',
        stops: [
          [
            'Paint Buffered', 
            #27d683,
          ],
          [
            'Paint Buffered w Conventional', 
            #27d683,
          ],
          [
            'Conventional',
            #ff7f50,
          ],
          [
            'Conventional w Sharrows',
            #ff7f50,],
          [
            'Contraflow w Conventional, same',
            #ff7f50,
          ],
          [
            'Bus Bike Lane',
            #4ca3dd,
          ],
          [
            'Sharrow',
            #ee5c42,
          ],
        ]
       },
      'line-width': 1.5,
      'line-opacity': 1,
    }
  });

})
