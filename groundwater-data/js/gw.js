// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Leaflet interaction ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var map = L.map('map', {
    zoomControl: false
}).setView([33.6, -81.4], 7);

L.esri.basemapLayer("Topographic").addTo(map);

L.control.zoom({
    position: 'topright'
}).addTo(map);

var data = "https://services.arcgis.com/acgZYxoN5Oj8pDLa/ArcGIS/rest/services/scdnr_gwmn/FeatureServer/0"

var clusterPoly = L.esri.Cluster.featureLayer({
    url: "https://services.arcgis.com/acgZYxoN5Oj8pDLa/ArcGIS/rest/services/scdnr_gwmn/FeatureServer/1",
    onEachFeature: function(feature, layer) {
        layer.bindTooltip("Cluster Site: " + feature.properties.cluster_na, {
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
        color: aqColor(feature.properties.Aquifer2),
        radius: 5,
        fillColor: aqColor(feature.properties.Aquifer2),
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
    layer.bindTooltip(feature.properties.Well_ID)

    layer.on('click', function() {
        $('#id').text(feature.properties.Well_ID);
        $('#aq').text(feature.properties.Aquifer2);
        $('#wd').text(feature.properties.Well_depth);
        $('#sd').text(feature.properties.Screen_or_);
        $('#type').text(feature.properties.msmnt_type);
        ll = layer.getLatLng();
        highlight.setLatLng(ll);

        wellID = feature.properties.Well_ID
        $("#getdata").removeClass("disabled");
    });
};

var wellsC = L.esri.Cluster.featureLayer({
    url: data,
    where: "Cluster = 'yes'",
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
    where: "Cluster <> 'yes'",
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, style(feature))
    },
    onEachFeature: oef
}).addTo(map);

var searchResults = L.layerGroup().addTo(map);

//search for wells by well ID
var wellSearch = L.esri.Geocoding.featureLayerProvider({
    url: data,
    searchFields: ['Well_ID'],
    label: 'Well IDs',
    maxResults:10
});

var agol = L.esri.Geocoding.arcgisOnlineProvider({
    maxResults:2
});

var searchControl = L.esri.Geocoding.geosearch({
    position: 'topright',
    providers: [wellSearch, agol],
    title: "Well or Place Search",
    placeholder: "Well ID (ex. HOR-0290) or places.",
    searchBounds: [[35.42,-83.87],[31.33,-77.7]]
}).addTo(map);

searchControl.on("results", function(data) {
    searchResults.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
        searchResults.addLayer(L.marker(data.results[i].latlng));
    }
});

// custom control to clear the map search and well selection
L.Control.ClearMap = L.Control.extend({
    options: {
        position: 'bottomright'
    },
    onAdd: function(map){
        var clearDiv = L.DomUtil.create("a", "leaflet-clear-control leaflet-touch leaflet-bar");
        var icon = L.DomUtil.create("i", "fa fa-times-circle-o fa-2x");
        clearDiv.title = "Clear Map Search and Selection"
        clearDiv.appendChild(icon);
        
        L.DomEvent.on(clearDiv,'click', function(){
            searchResults.clearLayers();
            highlight.setLatLng([0,0]);
            
            //this clears the table on the size
            $("#table td").empty();
            
            //disable get data button until anoather well is clicked
            $("#getdata").addClass("disabled");
            
            //zoom map to orignal extent. 
            map.setView([33.6, -81.4], 7)
        });
        
        return clearDiv;
    },
    
    onRemove: function(map){  
    },
    
});

L.control.clearMap = function(opts) {
    return new L.Control.ClearMap(opts);
}

L.control.clearMap().addTo(map);

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

function getData(wellID) {
    var url = "data/wl" + wellID + ".xml"
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        success: wellParse
    });
}

var dataArray = []
var valmin = 1000
var valmax = -1000
    //use the values to start min and max, when iterating will compare to these values and replace if higher or lower.

//create an empty dy graph that will be updated when data is fetched
hg = new Dygraph(document.getElementById("chart"), [
    [0]
], {
    valueRange: [0, 0],
    ylabel: "ft below land surface"
});

//when the get data button is clicked, get data from server by calling well ID... 

function wellParse(xml) {
    var data = $.parseXML(xml),
        $xml = $(xml),
        $record = $xml.find("WATER_LEVEL");
    $($record).each(function() {
        var level = $(this).find("WATER_DEPTH").text();
        var date = $(this).find("DATE_TIME").text();
        var msmt = $(this).find("MEASUREMENT_METHOD").text();
        
        //you could pad the min and max with some percent of the range    
        if (parseFloat(level) < valmin) {
            valmin = parseFloat(level) - (parseFloat(level) * 0.1)
        }
        if (parseFloat(level) > valmax) {
            valmax = parseFloat(level) + (parseFloat(level) * 0.1)
        }

        if (msmt == "Automatic Data Recorder") { 
            var insert = [new Date(date), level, null]
            dataArray.push(insert);            
        } else {
            var insert = [new Date(date), null, level]
            dataArray.push(insert);
        }
    });
    
    hg.updateOptions({
        file: dataArray,
        labels: ["Date", "ADR Level", "Manual Level"],
        rollPeriod: 0,
        valueRange: [valmax, valmin],
        ylabel: "ft below land surface",
        xRangePad: 10,
        zoomCallback: function(minDate, maxDate) {
            //This happens when you do a zoom action on the hydrograph
            var min = new Date(minDate);
            var max = new Date(maxDate);
            $("#startdate").val(formatDate(min));
            $("#enddate").val(formatDate(max));
        },
        series: {
            'Manual Level': {
                strokeWidth: 0.0,
                drawPoints: true,
                pointSize: 3,
                color: "rgba(0, 43, 163, 0.78)",
                fillAlpha: 0.2
            },
            'ADR Level': {
                strokeWidth: 1.5,
                color: "#279ff4"
            }
        },
        visibility: [true, false]
    });
    
    hg.resetZoom();
    
    //sets the input date boxes to the dates when you first load the data into the hydrograph
    var start = new Date(hg.xAxisRange()[0])
    $("#startdate").val(formatDate(start))
    var end = new Date(hg.xAxisRange()[1])
    $("#enddate").val(formatDate(end));
};

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

    var a = document.createElement('a')
    a.href = 'data:attachment/csv,' + encodeURIComponent(daily);
    a.target = '_blank';
    a.download = wellID + "_" + filename + '_daily.csv';

    document.body.appendChild(a);
    a.click();
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
    valmin = 1000
    valmax = -1000
        //reset button colors
    $(this).addClass("disabled");
    //write well name to the screen
    $('#wellTitle').text(wellID);
    //initiate the get data function 
    getData(wellID);
    //enable the download button
    $("#dailydl").removeClass("disabled")
        .attr("title", "Download daily data.")
    $("#filter, #reset, #manualview").removeClass("disabled");
});

$('#manualview').click(function() {
    if (hg.visibility()[1] == false) {
        hg.setVisibility(1, true);
        $(this).removeClass("btn-primary");
    } else {
        hg.setVisibility(1, false);
        $(this).addClass("btn-primary");
    }
});

//toggle dropdown stuff
$('.question').click(function() {
    $(this).next('.answer').slideToggle();
    $(this).toggleClass("closed open");
});