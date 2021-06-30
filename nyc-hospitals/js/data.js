var arrFac = [];
data.forEach((item) => {
  var obj = Object.assign({}, item);
  var objFac = {
    type:obj[8],
    borough: obj[9],
    name:obj[10],
    phone: obj[12],
    lat:Number(obj[13][1]),
    long:Number(obj[13][2]),
    //zip: obj[13][0],
  }
  arrFac.push(objFac);
});


$(document).ready(function() {
  // Counter
  var counter=0;
  
  // Display array
  var arrDisp = [];
  
  // Facility type arrays
  var typeList = [];
  var arrType = []; 
  
  // Borough arrays
  var boroList = [];
  var arrBoro = [];
  
  // Current markers
  var currentMarkers = [];
  
  // Set default checks to Hospital and Bronx
  $( window ).on( "load", function() {
    $("#X").click()
    $("#hosp").click()    
  });
 
  // Checkbox click event
  $(":checkbox").on("click", (function(){
    
    // Clear/reset markers
    if (currentMarkers!==null) {
      for (var i = currentMarkers.length - 1; i >= 0; i--) {
        currentMarkers[i].remove();
      }
    }
       
    // Facility type
    typeList = [];
    $.each($("input[name='hc-type']:checked"), function(){
      typeList.push($(this).val());
    });
    
    arrType = [];
    arrType = arrFac.filter(obj=> {
      return typeList.includes(obj.type);
    });
    
    
    // Boroughs  
    boroList = [];
    $.each($("input[name='boro']:checked"), function(){
      boroList.push($(this).val());
    });
    
    arrBoro = [];
    arrBoro = arrFac.filter(obj=> {
      return boroList.includes(obj.borough);
    });
    
    
    //ZIP
    // $("#zipBtn").click(function(){
    //  var inZIP = $("#inZIP").val();
    // });
    
    // arrZIP = [];
    // arrHosp = arrFac.filter(obj => {
    //  return obj.zip === inZIP;
    // });
    
    
        
    // Display
    arrDisp = [];
    arrDisp = arrBoro.filter(obj=> {
      return arrType.includes(obj);
    });
    
    // Create and map markers
    arrDisp.forEach((item) => {
     
      if (item.name === "Jacobi Medical Center") {
        oneMarker = new mapboxgl.Marker({
          color: "#FF4500"
        })
        .setLngLat([item.long, item.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(`<b>${item.name}</b><br>${item.phone}<br><br><u>1991</u><br>An aspiring web mapping star is born`))
        .addTo(map);
       currentMarkers.push(oneMarker); 
      } else {
        oneMarker = new mapboxgl.Marker()
        .setLngLat([item.long, item.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML(`<b>${item.name}</b><br>${item.phone}`))
        .addTo(map);
       currentMarkers.push(oneMarker);
      }
          
      // Fit bounds after load (i.e. after two clicks 1) Bronx and 2) Hospital)
      if (counter>2) {
        var bounds = new mapboxgl.LngLatBounds();
        arrDisp.forEach(function(item) {
          bounds.extend([item.long, item.lat]);
        });
        map.fitBounds(bounds, {padding: {top: 50, bottom: 50, left: 50, right: 50}});
      }
      counter += 1;
      
      // For early epxloration           
      // console.log(oneMarker);
      // console.log(oneMarker["_lngLat"]);
    });
    
    
    console.log(arrDisp);
  }));
  
  

});
