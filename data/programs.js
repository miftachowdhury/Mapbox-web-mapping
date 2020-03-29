// create an array of objects where each element is a NYS childcare program
var arrProgs = [];
data.forEach((item) => {
  var obj = Object.assign({}, item);
  var objProg = {
    facID:obj[8],
    type: obj[9],
    region:obj[10],
    county: obj[11],
    facName: obj[13],
    stNumber: obj[18],
    stName: obj[19],
    addtlAdd: obj[20],
    aptNumber: obj[22],
    city: obj[23],
    state: obj[24],
    zip: obj[25],
    phone: obj[27],
    contact: obj[29],
    infCap: obj[32],
    toddCap: obj[33],
    preCap: obj[34],
    schCap: obj[35],
    totCap: obj[36],
    link: obj[37],
    lat:Number(obj[38]),
    long:Number(obj[39]),
  }
  arrProgs.push(objProg);
});

// check the number of childcare programs NYS
console.log(arrProgs.length);
// 13,399 programs in NYS

// create an array that is a subset of the NYS programs array, filtering for only NYC Day Care Centers
arrProgsNYC = [];
arrProgsNYC = arrProgs.filter(obj=> {
      return obj.region==='NYCDOH' && obj.type==='DCC';
    });

// check the number of childcare programs in NYC
console.log(arrProgsNYC.length);
// 7,045 programs in NYC - don't map all of them

$(document).ready(function() {
  
    // create and map markers
    var currentProgMarkers = [];
    var currentSchMarkers = [];  
  
    
    //arrProgsNYC.forEach((item) => { 
    //   oneMarker = new mapboxgl.Marker({
    //      color: "#008000"
    //    })
    //    .setLngLat([item.long, item.lat])
    //    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    //              .setHTML(`<b>${item.facName}</b><br>${item.phone}`))
    //    .addTo(map);
    //   currentProgMarkers.push(oneMarker);       
    //});
       
});
