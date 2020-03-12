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

// check the number of programs in the list of NYS childcare programs
console.log(arrProgs.length);

arrProgsNYC = [];
    arrBoro = arrFac.filter(obj=> {
      return boroList.includes(obj.borough);
    });
