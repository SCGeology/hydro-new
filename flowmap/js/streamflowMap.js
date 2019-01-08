var map = L.map('map', {
    center: [33.6, -80],
    zoom: 7,
    minZoom: 6,
    maxZoom: 16,
    fullscreenControl: true
});

L.Control.Fullscreen;

var legend = L.control({
    position: 'bottomright'
});

legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info legend');

    div.innerHTML = '<img class="legendpng" src="./flowmap/markers/legend.png">';

    return div;
};

legend.addTo(map);

map.attributionControl.addAttribution('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a>');

var proposedSites = new L.featureGroup([]);
var proposedReaches = new L.featureGroup([]);
var activeSites = new L.featureGroup([]);

/*var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; <a href="https://www.arcgis.com/home/item.html?id=30e5fe3149c34df1ba922e6f5bbf808f" target="_blank"> ESRI Basemap sources here. </a>'
}).addTo(map);*/

var bm = L.tileLayer('https://api.mapbox.com/styles/v1/scearthsci/ciuspxf3e00b22io4qq4xg7vu/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NlYXJ0aHNjaSIsImEiOiI3NTg0NGM0ZTMzNjI5N2Q5ZDRmMWQ0YjI5MjczNTlhYSJ9.36fX8a8aHxH7ZouF3KqMqQ', {
    attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function doStyleMajorRiverBasins0(feature) {
    return {
        weight: 1.5,
        color: '#478566',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        opacity: 1.0,
    };
}
var json_MajorRiverBasins0JSON = new L.geoJson(json_MajorRiverBasins0, {
    style: doStyleMajorRiverBasins0
}).addTo(map);

function pop_reactCon5(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Map ID</th><td>' + (feature.properties['Map_ID'] !== null ? Autolinker.link(String(feature.properties['Map_ID'])) : '') + '</td></tr><tr><th scope="row">Site Number</th><td>' + (feature.properties['Site No.'] !== null ? Autolinker.link(String(feature.properties['Site No.'])) : '') + '</td></tr><tr><th scope="row">Site Name</th><td>' + (feature.properties['Site Name'] !== null ? Autolinker.link(String(feature.properties['Site Name'])) : '') + '</td></tr><tr><th scope="row">Basin</th><td>' + (feature.properties['Basin'] !== null ? Autolinker.link(String(feature.properties['Basin'])) : '') + '</td></tr><tr><th scope="row">DA (sq mi)</th><td>' + (feature.properties['DA'] !== null ? Autolinker.link(String(feature.properties['DA'])) : '') + '</td></tr><tr><th scope="row">Start Date</th><td>' + (feature.properties['Start'] !== null ? Autolinker.link(String(feature.properties['Start'])) : '') + '</td></tr><tr><th scope="row">End Date</th><td>' + (feature.properties['End'] !== null ? Autolinker.link(String(feature.properties['End'])) : '') + '</td></tr><tr><th scope="row">Years</th><td>' + (feature.properties['Years'] !== null ? Autolinker.link(String(feature.properties['Years'])) : '') + '</td></tr><tr><th scope="row">Designation</th><td>' + (feature.properties['Designatio'] !== null ? Autolinker.link(String(feature.properties['Designatio'])) : '') + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

var svgreactCon5_a = L.icon({
    iconUrl: './flowmap/markers/reactCon.svg',
    iconSize: [14, 14], // size of the icon
});

function doStylereactCon5_a() {
    return {
        icon: svgreactCon5_a
    }
}

function doPointToLayerreactCon5_a(feature, latlng) {
    return L.marker(latlng, doStylereactCon5_a())
}
var json_reactCon5JSON_a = new L.geoJson(json_reactCon5, {
    onEachFeature: pop_reactCon5,
    pointToLayer: doPointToLayerreactCon5_a,
    filter: function(feature, layer) {
        return feature.properties['Site No.'] != "2176720"
    }
});

proposedSites.addLayer(json_reactCon5JSON_a);

//FILTERED OUT THE REACT CON DATASET TO SEPARATE THE MAY RIVER SITE. DIVIDED INTO _a (ABOVE) and _b (BELOW) WITH GEOJSON FILTER. USED SAME TABLE SETUP, JUST CHANGED ICON AND STYLE REFERENCE, AND THE NAME OF THE GEOJSON LAYER. 
var svgreactCon5_b = L.icon({
    iconUrl: './flowmap/markers/newCon2.svg',
    iconSize: [14, 14], // size of the icon
});

function doStylereactCon5_b() {
    return {
        icon: svgreactCon5_b
    }
}

function doPointToLayerreactCon5_b(feature, latlng) {
    return L.marker(latlng, doStylereactCon5_b())
}
var json_reactCon5JSON_b = new L.geoJson(json_reactCon5, {
    onEachFeature: pop_reactCon5,
    pointToLayer: doPointToLayerreactCon5_b,
    filter: function(feature, layer) {
        return feature.properties['Site No.'] == "2176720"
    }
});

proposedSites.addLayer(json_reactCon5JSON_b);

function pop_react6(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Map ID</th><td>' + (feature.properties['Map_ID'] !== null ? Autolinker.link(String(feature.properties['Map_ID'])) : '') + '</td></tr><tr><th scope="row">Site Number</th><td>' + (feature.properties['Site No.'] !== null ? Autolinker.link(String(feature.properties['Site No.'])) : '') + '</td></tr><tr><th scope="row">Site Name</th><td>' + (feature.properties['Site Name'] !== null ? Autolinker.link(String(feature.properties['Site Name'])) : '') + '</td></tr><tr><th scope="row">Basin</th><td>' + (feature.properties['Basin'] !== null ? Autolinker.link(String(feature.properties['Basin'])) : '') + '</td></tr><tr><th scope="row">DA (sq mi)</th><td>' + (feature.properties['DA'] !== null ? Autolinker.link(String(feature.properties['DA'])) : '') + '</td></tr><tr><th scope="row">Start Date</th><td>' + (feature.properties['Start'] !== null ? Autolinker.link(String(feature.properties['Start'])) : '') + '</td></tr><tr><th scope="row">End Date</th><td>' + (feature.properties['End'] !== null ? Autolinker.link(String(feature.properties['End'])) : '') + '</td></tr><tr><th scope="row">Years</th><td>' + (feature.properties['Years'] !== null ? Autolinker.link(String(feature.properties['Years'])) : '') + '</td></tr><tr><th scope="row">Designation</th><td>' + (feature.properties['Designatio'] !== null ? Autolinker.link(String(feature.properties['Designatio'])) : '') + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

var svgreact6 = L.icon({
    iconUrl: './flowmap/markers/react.svg',
    iconSize: [14, 14], // size of the icon
});

function doStylereact6() {
    return {
        icon: svgreact6
    }
}

function doPointToLayerreact6(feature, latlng) {
    return L.marker(latlng, doStylereact6())
}
var json_react6JSON = new L.geoJson(json_react6, {
    onEachFeature: pop_react6,
    pointToLayer: doPointToLayerreact6
});

proposedSites.addLayer(json_react6JSON);

function pop_newCon7(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Map ID</th><td>' + (feature.properties['Map_ID'] !== null ? Autolinker.link(String(feature.properties['Map_ID'])) : '') + '</td></tr><tr><th scope="row">Site Name</th><td>' + (feature.properties['new_Stream'] !== null ? Autolinker.link(String(feature.properties['new_Stream'])) : '') + '</td></tr><tr><th scope="row">Basin</th><td>' + (feature.properties['new_Basin'] !== null ? Autolinker.link(String(feature.properties['new_Basin'])) : '') + '</td></tr><tr><th scope="row">Description</th><td>' + (feature.properties['new_Descri'] !== null ? Autolinker.link(String(feature.properties['new_Descri'])) : '') + '</td></tr><tr><th scope="row">Designation</th><td>' + (feature.properties['new_Design'] !== null ? Autolinker.link(String(feature.properties['new_Design'])) : '') + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

var svgnewCon7 = L.icon({
    iconUrl: './flowmap/markers/newCon.svg',
    iconSize: [14, 14], // size of the icon
});

function doStylenewCon7() {
    return {
        icon: svgnewCon7
    }
}

function doPointToLayernewCon7(feature, latlng) {
    return L.marker(latlng, doStylenewCon7())
}
var json_newCon7JSON = new L.geoJson(json_newCon7, {
    onEachFeature: pop_newCon7,
    pointToLayer: doPointToLayernewCon7
});

proposedSites.addLayer(json_newCon7JSON);

function pop_new8(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Map ID</th><td>' + (feature.properties['Map_ID'] !== null ? Autolinker.link(String(feature.properties['Map_ID'])) : '') + '</td></tr><tr><th scope="row">Site Name</th><td>' + (feature.properties['new_Stream'] !== null ? Autolinker.link(String(feature.properties['new_Stream'])) : '') + '</td></tr><tr><th scope="row">Basin</th><td>' + (feature.properties['new_Basin'] !== null ? Autolinker.link(String(feature.properties['new_Basin'])) : '') + '</td></tr><tr><th scope="row">Description</th><td>' + (feature.properties['new_Descri'] !== null ? Autolinker.link(String(feature.properties['new_Descri'])) : '') + '</td></tr><tr><th scope="row">Designation</th><td>' + (feature.properties['new_Design'] !== null ? Autolinker.link(String(feature.properties['new_Design'])) : '') + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

var svgnew8 = L.icon({
    iconUrl: './flowmap/markers/new.svg',
    iconSize: [14, 14], // size of the icon
});

function doStylenew8() {
    return {
        icon: svgnew8
    }
}

function doPointToLayernew8(feature, latlng) {
    return L.marker(latlng, doStylenew8())
}
var json_new8JSON = new L.geoJson(json_new8, {
    onEachFeature: pop_new8,
    pointToLayer: doPointToLayernew8
});

proposedSites.addLayer(json_new8JSON);

function pop_newReachZoom1(feature, layer) {
    var popupContent = '<table><tr><th scope="row">MapID</th><td>' + (feature.properties['Map_ID'] !== null ? Autolinker.link(String(feature.properties['Map_ID'])) : '') + '</td></tr><tr><th scope="row">Reach Name</th><td>' + (feature.properties['Stream Rea'] !== null ? Autolinker.link(String(feature.properties['Stream Rea'])) : '') + '</td></tr><tr><th scope="row">Basin</th><td>' + (feature.properties['Basin'] !== null ? Autolinker.link(String(feature.properties['Basin'])) : '') + '</td></tr><tr><th scope="row">Description</th><td>' + (feature.properties['Descriptio'] !== null ? Autolinker.link(String(feature.properties['Descriptio'])) : '') + '</td></tr><tr><th scope="row">Designation</th><td>' + (feature.properties['Designatio'] !== null ? Autolinker.link(String(feature.properties['Designatio'])) : '') + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStylenewReachZoom1(feature) {
    switch (feature.properties.class) {
        case 'Cond':
            return {
                weight: '1.84',
                fillColor: '#000000',
                color: '#d4a928',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                opacity: '1.0',
                fillOpacity: '0.0',
            };
            break;

        case 'Discharge':
            return {
                weight: '1.84',
                fillColor: '#000000',
                color: '#e33518',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                opacity: '1.0',
                fillOpacity: '0.0',
            };
            break;

        case 'Discharge/WQ':
            return {
                weight: '1.84',
                fillColor: '#000000',
                color: '#4d4d4d',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                opacity: '1.0',
                fillOpacity: '0.0',
            };
            break;

    }
}
var json_newReachZoom1JSON = new L.geoJson(json_newReachZoom1, {
    onEachFeature: pop_newReachZoom1,
    style: doStylenewReachZoom1
});
proposedReaches.addLayer(json_newReachZoom1JSON);


function pop_newReach2(feature, layer) {
    var popupContent = '<table><tr><th scope="row">MapID</th><td>' + (feature.properties['Map_ID'] !== null ? Autolinker.link(String(feature.properties['Map_ID'])) : '') + '</td></tr><tr><th scope="row">Reach Name</th><td>' + (feature.properties['Stream Rea'] !== null ? Autolinker.link(String(feature.properties['Stream Rea'])) : '') + '</td></tr><tr><th scope="row">Basin</th><td>' + (feature.properties['Basin'] !== null ? Autolinker.link(String(feature.properties['Basin'])) : '') + '</td></tr><tr><th scope="row">Description</th><td>' + (feature.properties['Descriptio'] !== null ? Autolinker.link(String(feature.properties['Descriptio'])) : '') + '</td></tr><tr><th scope="row">Designation</th><td>' + (feature.properties['Designatio'] !== null ? Autolinker.link(String(feature.properties['Designatio'])) : '') + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStylenewReach2(feature) {
    switch (feature.properties.class) {
        case 'Cond':
            return {
                weight: '1.04',
                fillColor: '#d4a928',
                color: 'none',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                opacity: '1.0',
                fillOpacity: '0.9',
            };
            break;

        case 'Discharge':
            return {
                weight: '1.04',
                fillColor: '#e33518',
                color: 'none',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                opacity: '1.0',
                fillOpacity: '0.9',
            };
            break;

        case 'Discharge/WQ':
            return {
                weight: '1.04',
                fillColor: '#4d4d4d',
                color: 'none',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                opacity: '1.0',
                fillOpacity: '0.9',
            };
            break;

    }
}
var json_newReach2JSON = new L.geoJson(json_newReach2, {
    onEachFeature: pop_newReach2,
    style: doStylenewReach2
});
proposedReaches.addLayer(json_newReach2JSON);

function pop_activeUSGS3(feature, layer) {
    var popupContent = '<table><tr><th scope="row">MapID</th><td>' + (feature.properties['MapID'] !== null ? Autolinker.link(String(feature.properties['MapID'])) : '') + '</td></tr><tr><th scope="row">Site Name</th><td>' + (feature.properties['SiteName'] !== null ? Autolinker.link(String(feature.properties['SiteName'])) : '') + '</td></tr><tr><th scope="row">Site Number</th><td>' + (feature.properties['SiteNO'] !== null ? Autolinker.link(String(feature.properties['SiteNO'])) : '') + '</td></tr><tr><th scope="row">Basin</th><td>' + (feature.properties['Basin'] !== null ? Autolinker.link(String(feature.properties['Basin'])) : '') + '</td></tr><tr><th scope="row">DA (sq mi)</th><td>' + (feature.properties['DA'] !== null ? Autolinker.link(String(feature.properties['DA'])) : '') + '</td></tr><tr><th scope="row">Start Date</th><td>' + (feature.properties['Start'] !== null ? Autolinker.link(String(feature.properties['Start'])) : '') + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

var svgactiveUSGS3 = L.icon({
    iconUrl: './flowmap/markers/act.svg',
    iconSize: [11, 11], // size of the icon
});

function doStyleactiveUSGS3() {
    return {
        icon: svgactiveUSGS3
    }
}

function doPointToLayeractiveUSGS3(feature, latlng) {
    return L.marker(latlng, doStyleactiveUSGS3())
}
var json_activeUSGS3JSON = new L.geoJson(json_activeUSGS3, {
    onEachFeature: pop_activeUSGS3,
    pointToLayer: doPointToLayeractiveUSGS3
});

activeSites.addLayer(json_activeUSGS3JSON);

function pop_DNRfunded4(feature, layer) {
    var popupContent = '<table><tr><th scope="row">MapID</th><td>' + (feature.properties['MapID'] !== null ? Autolinker.link(String(feature.properties['MapID'])) : '') + '</td></tr><tr><th scope="row">Site Name</th><td>' + (feature.properties['SiteName'] !== null ? Autolinker.link(String(feature.properties['SiteName'])) : '') + '</td></tr><tr><th scope="row">Site Number</th><td>' + (feature.properties['SiteNo'] !== null ? Autolinker.link(String(feature.properties['SiteNo'])) : '') + '</td></tr><tr><th scope="row">Basin</th><td>' + (feature.properties['Basin'] !== null ? Autolinker.link(String(feature.properties['Basin'])) : '') + '</td></tr><tr><th scope="row">DA (sq mi)</th><td>' + (feature.properties['DA'] !== null ? Autolinker.link(String(feature.properties['DA'])) : '') + '</td></tr><tr><th scope="row">Start Date</th><td>' + (feature.properties['Start'] !== null ? Autolinker.link(String(feature.properties['Start'])) : '') + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

var svgDNRfunded4 = L.icon({
    iconUrl: './flowmap/markers/dnr.svg',
    iconSize: [11, 11], // size of the icon
});

function doStyleDNRfunded4() {
    return {
        icon: svgDNRfunded4
    }
}

function doPointToLayerDNRfunded4(feature, latlng) {
    return L.marker(latlng, doStyleDNRfunded4())
}
var json_DNRfunded4JSON = new L.geoJson(json_DNRfunded4, {
    onEachFeature: pop_DNRfunded4,
    pointToLayer: doPointToLayerDNRfunded4
});

activeSites.addLayer(json_DNRfunded4JSON);

proposedReaches.addTo(map);
proposedSites.addTo(map);

map.on("zoomend", function(e) {
    if (map.getZoom() <= 19 && map.getZoom() >= 9) {
        proposedReaches.addLayer(json_newReachZoom1JSON);
    } else if (map.getZoom() > 19 || map.getZoom() < 9) {
        proposedReaches.removeLayer(json_newReachZoom1JSON);
    }
    if (map.getZoom() <= 8 && map.getZoom() >= 2) {
        proposedReaches.addLayer(json_newReach2JSON);
    } else if (map.getZoom() > 8 || map.getZoom() < 2) {
        proposedReaches.removeLayer(json_newReach2JSON);
    }
});

var sites = {
    "Proposed Sites": proposedSites,
    "Proposed Reaches": proposedReaches,
    "Active USGS Sites": activeSites
};

L.control.layers(null, sites, {
    collapsed: false
}).addTo(map);