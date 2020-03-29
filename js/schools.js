var geodata = {}
    $.getJSON('data/school_points.geojson', function (results) {
        geodata = results;
        console.log(geodata.features);
    
    var schNames = geodata.features.map(function (el) {
        return el.properties.SCHOOLNAME;
    });
    console.log(schNames);

var inputSchools = ''
	    
var options = {
	data: schNames,
	list: {

		match: {
			enabled: true
		},
		
		onClickEvent: function() {
			inputSchools=$(this).val();
		}
	}
	
};

$("#schoolList").easyAutocomplete(options);

});
