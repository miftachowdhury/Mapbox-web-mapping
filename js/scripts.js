mapboxgl.accessToken = 'pk.eyJ1IjoibWNob3dkaHVyeSIsImEiOiJjazZzdHJta2swNzN2M2tyeHBmZTcycTI4In0.StlNQAWNUjcDoPBeZyIvGw';

var initialCenterPoint = [-73.975, 40.735]
var initialZoom = 10

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
  
    
  // let's make sure the sources got added by logging the current map state to the console
  console.log(map.getStyle().sources)
    
  var inputSchool = "M.S. 002";
 
  // add the school points layer to the map
  map.addLayer({
    id: 'school-points',
    type: 'circle',
    source:'school-source',
    layout: {
      visibility: 'visible'
    },
    
  //close map.addLayer({
  });
    
 map.setFilter('school-points', ['==', 'SCHOOLNAME', inputSchool]);
 map.setLayoutProperty('school-points', 'visibility', 'visible'); 

 
 // fly to the school
    
    // create an object containing features object from geojson file
    var geodata = {}
    $.getJSON('data/school_points.geojson', function (results) {
        geodata = results;
        console.log(geodata.features);
    
    var schNames = geodata.features.map(function (el) {
        return el.properties.SCHOOLNAME;
    });
    console.log(schNames);
      
        var pickedSchool = geodata.features.filter(obj => {
          return obj.properties.SCHOOLNAME === inputSchool
         })
        console.log(pickedSchool);
      
      var schLngLat = pickedSchool[0].geometry.coordinates
      console.log(schLngLat)
      map.flyTo({
        center: schLngLat,
        zoom: 15
      })
     
    //close $.getJSON
    });
   

    
    // create and map markers for childcare centers
    var currentMarkers = [];
    var inputZIP = pickedSchool[0].properties.ZIP;  
  
    arrZIP = [];
    arrZIP = arrProgsNYC.filter(obj=> {
      return obj.zip === inputZIP;
    });
    
    arrZIP.forEach((item) => { 
    oneMarker = new mapboxgl.Marker({
        color: "#008000"
    })
        .setLngLat([item.long, item.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(`<b>${item.facName}</b><br>${item.phone}`))
        .addTo(map);
    currentMarkers.push(oneMarker);       
    
    //close arrZIP.forEach
    });
    

  
  
//close map.on *(* 'style.load', function() *{*
})
