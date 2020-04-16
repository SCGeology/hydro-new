// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Leaflet interaction ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var map = L.map('map', {
    zoomControl: false,
    gestureHandling:true
}).setView([33.3, -81.2], 7);

L.esri.basemapLayer("Topographic").addTo(map);

L.control.zoom({
    position: 'topright'
}).addTo(map);

var data = "https://services.arcgis.com/acgZYxoN5Oj8pDLa/ArcGIS/rest/services/scdnr_gwmn/FeatureServer/0"

var clusterPoly = L.esri.Cluster.featureLayer({
    url: "https://services.arcgis.com/acgZYxoN5Oj8pDLa/ArcGIS/rest/services/scdnr_gwmn/FeatureServer/1",
    onEachFeature: function(feature, layer) {
        layer.bindTooltip("Cluster Site: " + feature.properties.cluster_name, {
            direction: 'right',
            offset: [40, 0]
        });
    }
}).addTo(map);

var wellID

function aqColor(a) {
    return a == "Shallow Aquifer System (alluvium)" ? "#007200" :
        a == "Shallow Aquifer System (saprolite)" ? "#007200" :
        a == "Shallow Aquifer System" ? "#007200" :
        a == "Gordon" ? "#00007d" :
        a == "Crouch Branch" ? "#c20000" :
        a == "Upper Floridan" ? "#ff69c8" :
        a == "Middle Floridan" ? "#a00096" :
        a == "McQueen Branch" ? "#ff7a00" :
        a == "Charleston" ? "#01de2a" :
        a == "Gramling" ? "#fff300" :
        a == "Gramling confining unit" ? "#a4a475" :
        a == "Crystalline Rock" ? "#00b6fe" :
        "#ffffff";
}

function style(feature) {
    return {
        color: aqColor(feature.properties.aquifer2),
        radius: 5,
        fillColor: aqColor(feature.properties.aquifer2),
        fillOpacity: 0.7,
        opacity: 1
    }
}

//start the highlight marker at 0,0 so it's out of sight. Then when a marker is clicked, all you have to do is setLatLng... def a workaround.
var highlight = L.circleMarker([0, 0], {
    color: "#ff1d00",
    radius: 9,
    fillOpacity: 0,
    weight: 5,
    pane:'tooltipPane'
}).addTo(map);

//Custom radius and icon create function
function oef(feature, layer) {
    layer.bindTooltip(feature.properties.well_id)

    layer.on('click', function() {
        $('#id').text(feature.properties.well_id);
        $('#aq').text(feature.properties.aquifer2);
        $('#wd').text(feature.properties.well_depth);
        $('#sd').text(feature.properties.screen_depth);
        $('#elev').text(feature.properties.elevation1);
        ll = layer.getLatLng();
        highlight.setLatLng(ll);

        wellID = feature.properties.well_id
        $('#getdata').prop('disabled', false);
    });
};

var wellsC = L.esri.Cluster.featureLayer({
    url: data,
    where: "cluster = 'yes'",
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, style(feature))
    },
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: false,
    zoomToBoundsOnClick: true,
    maxClusterRadius: 5,
    iconCreateFunction: function() {
        return L.divIcon({
            className: 'cluster',
            iconSize: L.point(12, 12)
        });
    },
    onEachFeature: oef
}).addTo(map);

var wellsInd = L.esri.featureLayer({
    url: data,
    where: "cluster <> 'yes'",
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, style(feature))
    },
    onEachFeature: oef
}).addTo(map);

var searchResults = L.layerGroup().addTo(map);

//search for wells by well ID
var wellSearch = L.esri.Geocoding.featureLayerProvider({
    url: data,
    searchFields: ['well_id'],
    label: 'Well IDs',
    maxResults:5
});

var agol = L.esri.Geocoding.arcgisOnlineProvider({
    maxResults:2
});

var searchControl = L.esri.Geocoding.geosearch({
    position: 'topleft',
    providers: [wellSearch, agol],
	expanded:true,
	collapseAfterResult:false,
    title: "Well or Place Search",
    placeholder: "Search Well ID or location.",
    searchBounds: [[35.42,-83.87],[31.33,-77.7]]
}).addTo(map);

searchControl.on("results", function(data) {
    searchResults.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
        searchResults.addLayer(L.marker(data.results[i].latlng));
    }
});

//for clearing map with clearMap or clear hydrograph. 
 var clearTheMap = function(){
	searchResults.clearLayers();
	highlight.setLatLng([0,0]);
	
	//this clears the table on the side
	$("#well-info p").empty();
	
	//disable get data button until anoather well is clicked
	$('#getdata').prop('disabled', true);
	//$("#getdata").addClass("disabled");
	
	//zoom map to orignal extent. 
	map.setView([33.3, -81.2], 7)
}

// custom control to clear the map search and well selection
L.Control.ClearMap = L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function(map){
        var clearDiv = L.DomUtil.create("a", "leaflet-clear-control leaflet-touch leaflet-bar");
        var icon = L.DomUtil.create("i", "fas fa-home fa-2x");
        clearDiv.title = "Reset Map."
        clearDiv.appendChild(icon);
        
        L.DomEvent.on(clearDiv,'click',clearTheMap);
        
        return clearDiv;
    },
    onRemove: function(map){  
    },
});

L.control.clearMap = function(opts) {
    return new L.Control.ClearMap(opts);
}

L.control.clearMap().addTo(map);

var tabStatus = 0

$("#close-tab").click(function(){
	if (tabStatus == 0) {
		$("#well-info").fadeOut(200, function(){
			$("#table").animate({
			bottom:"-80px"
		}, 400 );
		});
		$("#arrow-down").fadeOut(200, function() {
			$("#arrow-up").fadeIn(200)
		});
		tabStatus = 1
	} else {
		$("#table").animate({
			bottom:"0px"
			}, 400, function() {
				$("#well-info").fadeIn(200)	
			}
		);
		
		$("#arrow-up").fadeOut(200, function() {
			$("#arrow-down").fadeIn(200)
		});
		tabStatus = 0
	}
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Hydrograph and other non map related stuff below ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//pass a date object
function formatDate(d) {
    var y = d.getFullYear(),
        m = ('0' + (d.getMonth() + 1)).slice(-2),
        dy = ('0' + d.getDate()).slice(-2);

    return [y, m, dy].join('-');
}

//turn back into a date object
function unformatDate(datestr) {
    var y = parseInt(datestr.slice(0, 4)),
        m = parseInt(datestr.slice(5, 7)) - 1,
        dy = parseInt(datestr.slice(8));

    return (new Date(y, m, dy));
}

/* THIS CODE FOR PARSIN THE XML WEB SERVICE 

function getData(wellID) {
    var url = "http://usgswells.dnr.sc.gov/api/WaterLevel/GetWaterLevel?WellId="+wellID
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        success: wellParse
    });
}

*/

// CODE BELOW FOR PARSING WEB SERVICE FROM ARCGIS PORTAL

var dataQuery = L.esri.query({
        url: 'https://services.arcgis.com/acgZYxoN5Oj8pDLa/arcgis/rest/services/scdnr_gwmn/FeatureServer/2'
    });

dataQuery.orderBy("Time_Stamp","DESC")

function getData(wellID) {
    
    //for some reason had to orderBy (sort) descending on the date to get it to work correctly. was coming in the opposite.
    dataQuery.where("Well_ID = '"+wellID+"'")
    
    dataQuery.run(function (error, featureCollection, response) {
        if (error) {
            console.log(error);
            return;
        }
        
        wellParse(featureCollection);
    });
}

var dataArray = []

//create an empty dy graph that will be updated when data is fetched
var initGraph = function(){
    hg = new Dygraph(document.getElementById("chart"), [
        [0]
        ], {
            valueRange: [0, 0],
            ylabel: "ft below land surface"
        });
};

initGraph()

//when the get data button is clicked, get data from server by calling well ID... 

var pushData = function(l,dt,m){
    //For the row, keep increasing/decrease valmin/max as necessary to show the data well
    //instead of padding by some constant, would be better to pad based on the range in the data
        if (parseFloat(l) < valmin) {
            valmin = parseFloat(l)
        }
        if (parseFloat(l) > valmax) {
            valmax = parseFloat(l)
        }
    //puts the data in the right order in the arrays so ADR and MANUAL data are independent series
        if (m === "Automatic Data Recorder") {
            var insert = [dt, l, null]
            dataArray.push(insert);            
        } else if (m === "MANUAL") {
            var insert = [dt, null, l]
            dataArray.push(insert);
        }
}

//THIS ONE PARSES JSON PROVIDED BY ESRI QUERY

function wellParse(fc) {
    
    var lastDate
    
    for (var i = 0; i < fc.features.length; i++){
        
        var level = fc.features[i].properties.Water_Level
        var dateText = fc.features[i].properties.Time_Stamp
        var msmt = fc.features[i].properties.Msmnt_Type
        //make date object from text date
        var dateN = new Date(dateText);
        
        if (msmt !== "UNKNOWN" && level !== "0"){
            
            //first row, lastDate will be undefined, so go ahead and push to DataArray
            if (typeof lastDate === 'undefined') {
            
                pushData(level,dateN,msmt)
                
                if (msmt === "Automatic Data Recorder"){
                    lastDate = dateN
                }
            
            } else if (msmt === "Automatic Data Recorder") {
                
                //make a date object that is the lastDate, plus an additional day. will compare to date
                //why the heck is this now date minus 1 instead of plus one?
                var nextDay = new Date(lastDate)
                nextDay.setDate(lastDate.getDate()-1)
                
                while (formatDate(dateN) !== formatDate(nextDay)){
                    
                    //push a NaN value with date to the array
                    pushData(NaN,new Date(nextDay),"Automatic Data Recorder")              
                    //increase the nextDay, will compare again until it breaks the while loop when nextDay matches current date
                    nextDay.setDate(nextDay.getDate()-1)
                }
            
                //push the actual XML row after filled missing dates with above while loop
                pushData(level,dateN,msmt)
                lastDate = dateN    
            
            } else {
                //will take care of adding in the manual measurements, but don't have to worry about filling these missing dates
                pushData(level,dateN,msmt) 
            }
        }
        
    }
	setTimeout(drawGraph,1000)
}

var roundToDec = function(num){
	var newNum = Math.round(num*10)/10
	return newNum
}

function drawGraph() {
	
	//padding based on percentage of range
	var padding = (valmax - valmin)*.1
	
    hg.updateOptions({
    file: dataArray.sort(function(a,b){return a[0]-b[0]}),
    labels: ["Date", "Avg Daily Level", "Manual Level"],
    rollPeriod: 0,
    valueRange: [roundToDec(valmax+padding), roundToDec(valmin-padding)],
    ylabel: "ft below land surface",
    xRangePad: 10,
    zoomCallback: function(minDate, maxDate) {
        //This happens when you do a zoom action on the hydrograph
        var min = new Date(minDate);
        var max = new Date(maxDate);
        $("#startdate").val(formatDate(min));
        $("#enddate").val(formatDate(max));
		$("#upper").val(roundToDec(hg.yAxisRange()[1]))
		$("#lower").val(roundToDec(hg.yAxisRange()[0]))
        
    },
    series: {
        'Manual Level': {
            strokeWidth: 0.0,
            drawPoints: true,
            pointSize: 3,
            color: "rgba(0, 43, 163, 0.78)",
            fillAlpha: 0.2
        },
        'Avg Daily Level': {
            strokeWidth: 1.5,
            color: "#279ff4",
            connectSeparatedPoints:true
        }
    },
	axes: {
        x: {
            valueFormatter: function (d) {
                return new Date(d).toLocaleDateString();
            }
        }
    },
    visibility: [true, true]
    });
    
    hg.resetZoom();
    
    //sets the input date boxes to the dates when you first load the data into the hydrograph
    var start = new Date(hg.xAxisRange()[0])
    $("#startdate").val(formatDate(start))
    var end = new Date(hg.xAxisRange()[1])
    $("#enddate").val(formatDate(end));
	
	$("#upper").val(hg.yAxisRange()[1])
	$("#lower").val(hg.yAxisRange()[0])
	
	$("#loading").hide();

};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// END PARSING DATA AND DRAWING GRAPH
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//for filtering date axis
$("#filter").click(function() {
    var st = unformatDate($('#startdate').val()),
        end = unformatDate($('#enddate').val());
    hg.updateOptions({
        dateWindow: [st, end]
    });
    $("#select").prop("checked", true);
});

$("#reset").click(function() {
    hg.resetZoom();
    $("#fullrecord").prop("checked", true);
});

//for filtering value (y) axis

$("#y-set").on('click', function(){
	var upperVal = $("#upper").val();
	var lowerVal = $("#lower").val();
	hg.updateOptions({
		valueRange:[lowerVal, upperVal]
	});
});

$("#y-clear").on('click', function(){
	var padding = (valmax - valmin)*.1
	hg.updateOptions({
		valueRange: [roundToDec(valmax+padding), roundToDec(valmin-padding)]
	});
	$("#upper").val(roundToDec(valmin-padding))
	$("#lower").val(roundToDec(valmax+padding))
});

$("#clear-data").click(function(){
    hg.destroy();
    initGraph()
    $("#dailydl").prop("disabled",true)
        .attr("title", "Select a well from the map to download data.")
    $("#filter, #reset, #manualview, #clear-data, #y-set, #y-clear, #enddate, #startdate, #upper, #lower").prop("disabled", true);
    $("#wellTitle").text("Select a well from the map.")
	$("#startdate").val("");
    $("#enddate").val("");
	$("#upper").val("");
	$("#lower").val("");
	clearTheMap();
});

//NEED TO PARSE OUT THE DATA ARRAY BASED ON THE SELECTION, CHANGE DATE STYLE
var headers = [
    ["DATE", "ADR LEVEL", "MANUAL LEVEL"]
]

//unparse the data array to download to csv
var makecsv = function(indata, filename) {
    var betterdata = []

	//making a new array with more friendly dates for download to csv - doesn't print time. is that ok?  
    $.each(indata, function(i,v){
        betterdata.push([v[0].toLocaleDateString(),v[1],v[2]])
    });
    
    var dldata = headers.concat(betterdata),
        daily = Papa.unparse(dldata);

    //this first part takes care of issue with downloading CSV on EDGE browser
    if (navigator.msSaveBlob) { // IE 10+
        var expFileName = wellID + "_" + filename + '_water_levels.csv';
        var blob = new Blob([daily], { type: 'text/csv;charset=utf-8;' });
        navigator.msSaveBlob(blob, expFileName);
        
    } else {
    
        var a = document.createElement('a')
        a.href = 'data:attachment/csv,' + encodeURIComponent(daily);
        a.target = '_blank';
        a.download = wellID + "_" + filename + '_water_levels.csv';

        document.body.appendChild(a);
        a.click();
        
    }
}
    
var downloaddata = function() {

    if ($("#select").is(':checked')) {
        var startrecord = unformatDate($('#startdate').val()),
            endrecord = unformatDate($('#enddate').val());
        function filterdate(record) {
            return record[0] >= startrecord && record[0] <= endrecord;
        }
        var filtered = dataArray.filter(filterdate);
        makecsv(filtered, "filtered");
    } else {
        makecsv(dataArray, "fullrecord");
    }
};

$("#dailydl").bind("click", downloaddata)

$("#getdata").click(function() {
    //clear data array
    dataArray = []
	//seems opposite, but setting the values this way ensures that the actual values do indeed adjust the valmin and valmax.
    valmin = 1000
    valmax = -1000
        //reset button colors
    $(this).prop("disabled", true);
    //write well name to the screen
    $('#wellTitle').text(wellID);
	$('#wellAq').text(" --- "+$("#aq").text());
	$('#loading').show();
    //initiate the get data function 
    getData(wellID);
    //enable the download button
    $("#dailydl").prop("disabled",false)
        .attr("title", "Download daily data.")
    $("#filter, #reset, #manualview, #clear-data, #y-set, #y-clear, #enddate, #startdate, #upper, #lower").prop("disabled", false);
});

$('#manualview').click(function() {
    if (hg.visibility()[1] == false) {
        hg.setVisibility(1, true);
        $('#manual-show').text('Hide')
    } else {
        hg.setVisibility(1, false);
        $('#manual-show').text('View')
    }
    var upperVal = $("#upper").val();
	var lowerVal = $("#lower").val();
    console.log(lowerVal,upperVal)
    console.log(hg.yAxisRange()[0],hg.yAxisRange()[1])
    hg.updateOptions({
        valueRange:[lowerVal,upperVal]
    });
});
