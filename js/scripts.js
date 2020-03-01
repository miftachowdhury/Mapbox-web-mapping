mapboxgl.accessToken = 'pk.eyJ1IjoibWNob3dkaHVyeSIsImEiOiJjazZzdHJta2swNzN2M2tyeHBmZTcycTI4In0.StlNQAWNUjcDoPBeZyIvGw';

var initialCenterPoint = [-75.1652, 39.955]
var initialZoom = 12.5

var defaultText = '<p>Move the mouse over the map to get more info on a bike lane</p>'
$('#feature-info').html(defaultText)

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
  
  map.addSource('highlight-feature', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  })

  // let's make sure the source got added by logging the current map state to the console
  console.log(map.getStyle().sources)

  var laneList = {
    protected: ['One Way Protected Bicycle Lane', 'Two Way Protected Bicycle Lane'],
    paintBuff: ['Paint Buffered', 'Paint Buffered w Conventional'],
    conventional: ['Conventional', 'Conventional w Sharrows', 'Contraflow w Conventional, same'],
    busLane: ['Bus Bike Lane'],
    sharrow: ['Sharrows'],
    unprotected: ['Two Way Unprotected Bicycle Lane'],
  }
    
  map.addLayer({
    id: 'bike-lanes',
    type: 'line',
    source:'philly-bike',
    paint: {
      'line-color': {
        type: 'categorical',
        property: 'TYPE',
        stops: [
          ['One Way Protected Bicycle Lane', '#39FF14',],
          ['Two Way Protected Bicycle Lane', '#39FF14',],
          ['Paint Buffered', '#27d683',],
          ['Paint Buffered w Conventional', '#27d683',],
          ['Conventional', '#ee5c42',],
          ['Conventional w Sharrows', '#ee5c42',],
          ['Contraflow w Conventional, same', '#ee5c42',],
          ['Bus Bike Lane', '#4ca3dd',],
          ['Sharrow', '#C4321F',],
          ['Two Way Unprotected Bicycle Lane', '#8B0000',],
        ]
       },
      'line-width': 2.75,
      'line-opacity': 1,
    },
    
  });
  
    
  $(":checkbox").on("click", (function(){    
    
    laneTypes = [];
    $.each($("input[name='laneType']:checked"), function(){
      var value = $(this).val()
      laneTypes = laneTypes.concat(laneList[value])
    });
    
    console.log(laneTypes)
    
    map.setFilter('bike-lanes', ['match', ['get', 'TYPE'], laneTypes, true, false]);
  
  }));
    


  // add a layer for the highlighted lane
  map.addLayer({
    id: 'highlight-line',
    type: 'line',
    source: 'highlight-feature',
    paint: {
      'line-width': 3.5,
      'line-opacity': 1,
      'line-color': 'yellow',
    }
  });
  
  map.on('mousemove', function (e) {

    var features = map.queryRenderedFeatures(e.point, {
        layers: ['bike-lanes'],
    });

    // if the mouse pointer is over a feature on our layer of interest
    // take the data for that feature and display it in the sidebar
    if (features.length > 0) {
      map.getCanvas().style.cursor = 'pointer';  // make the cursor a pointer

      var hoveredFeature = features[0]
      var featureInfo = `
        <p><strong>${hoveredFeature.properties.STREETNAME}</strong></p>
        <p><strong>Lane Type:</strong> ${hoveredFeature.properties.TYPE}</p>
      `
      $('#feature-info').html(featureInfo)

      // set the moused over lane as the data for the highlight source
      map.getSource('highlight-feature').setData(hoveredFeature.geometry);
    } else {
      // if there is no feature under the mouse, reset things:
      map.getCanvas().style.cursor = 'default'; // make the cursor default

      // reset the highlight source to an empty featurecollection
      map.getSource('highlight-feature').setData({
        type: 'FeatureCollection',
        features: []
      });

      // reset the default message
      $('#feature-info').html(defaultText)
    }
  })
  
})
