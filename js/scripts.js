mapboxgl.accessToken = 'pk.eyJ1IjoibWNob3dkaHVyeSIsImEiOiJjazZzdHJta2swNzN2M2tyeHBmZTcycTI4In0.StlNQAWNUjcDoPBeZyIvGw';

$(document).ready(function(){
  
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
    
   var currentMarkers = [];
   arrProgsNYC.forEach((item) => { 
    oneMarker = new mapboxgl.Marker({
        color: "#008000"
    })
        .setLngLat([item.long, item.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(`<b>${item.facName}</b><br>
                                ${item.phone}<br>
                                Infant Capacity: ${item.infCap}<br>
                                Toddler Capacity: ${item.toddCap}<br>
                                Pre-School Capacity: ${item.preCap}<br>
                                School-Age Capacity: ${item.schCap}`))
        .addTo(map);
    currentMarkers.push(oneMarker);
     
     //close arrProgsNYC.forEach
    });
 
      // create an object containing features object from geojson file
    var geodata = {}
    $.getJSON('data/school_points.geojson', function (results) {
        geodata = results;

    
    var schNames = geodata.features.map(function (el) {
        return el.properties.SCHOOLNAME;
    });
     
  // converted shapefile to GeoJSON from: https://data.cityofnewyork.us/Education/School-Point-Locations/jfju-ynrr
  // add GeoJSON source to the map
  map.addSource('school-source', {
    type: 'geojson',
    data: './data/school_points.geojson',
  });
      
      
    var inputSchool = ''            
      var options = {
        data: schNames,
        list: {
          match: {
            enabled: true
          },
          
          onClickEvent: function() {
            inputSchool=$("#schoolList").val();
            console.log(inputSchool)
            
  
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
    
 map.setFilter('school-points', ['==', 'SCHOOLNAME', inputSchool]);
 map.setLayoutProperty('school-points', 'visibility', 'visible'); 

 
 // fly to the school
         
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
     
      // create and map markers for childcare centers
      var currentMarkers = [];
           
      var inputBoro = pickedSchool[0].properties.BORO; 
      console.log(inputBoro)
      
      if (inputBoro='K') {
        inputBoro = "Brooklyn"
      } else if (inputBoro='Q') {
        inputBoro = "Queens"
      } else if (inputBoro='X') {
        inputBoro = "Bronx"
      } else if (inputBoro='M') {
        inputBoro = "Manhattan"
      } else if (inputBoro='R') {
        inputBoro = "Staten Island"
      }
      console.log(inputBoro)
      
      arrZIP = [];
      arrZIP = arrProgsNYC.filter(obj=> {
        return obj.county === inputBoro;
      });
      
    
    arrZIP.forEach((item) => { 
    oneMarker = new mapboxgl.Marker({
        color: "#008000"
    })
        .setLngLat([item.long, item.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(`<b>${item.facName}</b><br>
                                ${item.phone}<br>
                                Infant Capacity: ${item.infCap}<br>
                                Toddler Capacity: ${item.toddCap}<br>
                                Pre-School Capacity: ${item.preCap}<br>
                                School-Age Capacity: ${item.schCap}`))
        .addTo(map);
    currentMarkers.push(oneMarker);       
    
    //close arrZIP.forEach
    });
  
         
             
            
          //close onclick event  
          }
          
         //close list 
        }
        
      //close var options
      };

$("#schoolList").easyAutocomplete(options);
  
    

      
      
  //close $.getJSON
  });    

  
  
//close map.on *(* 'style.load', function() *{*
});
  
//close documentready
});
