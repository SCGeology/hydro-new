    var map = L.map('map', {
        scrollWheelZoom: false,
        zoomControl: false
    }).setView([33.6, -81.0], 7);

    var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
        maxZoom: 16
    }).addTo(map);

    var natural = L.icon({
            iconUrl: 'images/leaf.png',
            iconSize: [30, 30]
        }),
        cultural = L.icon({
            iconUrl: 'images/arrowhead.png',
            iconSize: [30, 30]
        });

    var dataurl = "https://services.arcgis.com/acgZYxoN5Oj8pDLa/arcgis/rest/services/scdnr_hp_singlepoint/FeatureServer/0"

    var nhp = L.esri.featureLayer({
        url: dataurl,
        where: "hp_type = 'natural'",
        pointToLayer: function(geojson, latlng) {
            return L.marker(latlng, {
                icon: natural,
                alt: "natural heritage preserve map icon"
            });
        }
    }).addTo(map);

    var chp = L.esri.featureLayer({
        url: dataurl,
        where: "hp_type = 'cultural'",
        pointToLayer: function(geojson, latlng) {
            return L.marker(latlng, {
                icon: cultural,
                zIndexOffset: 500,
                alt: "cultural heritage preserve map icon"
            });
        }
    }).addTo(map);

    var popupTemplate = '<div class="popup"><h6 class="red-header">{NAME}</h6><a href="https://www2.dnr.sc.gov/ManagedLands/ManagedLand/ManagedLand/{MANPROPID_1}" target="_blank">Property Details</a></div>'

    nhp.bindPopup(function(layer) {
        return L.Util.template(popupTemplate, layer.feature.properties);
    });

    chp.bindPopup(function(layer) {
        return L.Util.template(popupTemplate, layer.feature.properties);
    });

    //combine these into one function
    $('#cul').click(function() {
        if (map.hasLayer(chp)) {
            map.removeLayer(chp);
        } else {
            map.addLayer(chp)
        }
        $("i", this).toggleClass('fa-square-o fa-square-check-o');
    });

    $('#nat').click(function() {
        if (map.hasLayer(nhp)) {
            map.removeLayer(nhp);
        } else {
            map.addLayer(nhp)
        }
        $("i", this).toggleClass('fa-square-o fa-square-check-o');
    });

    //search search the map for a preserve or addresses
    var propSearch = L.esri.Geocoding.featureLayerProvider({
        url: dataurl,
        searchFields: ['NAME'],
        label: 'Heritage Preserves',
        maxResults: 4
    });

    var agol = L.esri.Geocoding.arcgisOnlineProvider({
        maxResults: 2
    });

    var searchControl = L.esri.Geocoding.geosearch({
        position: 'topright',
        expanded: true,
        collapseAfterResult: false,
        providers: [propSearch, agol],
        title: "Preserve Name or Place Search",
        placeholder: "Preserve name or address...",
        searchBounds: [
            [35.42, -83.87],
            [31.33, -77.7]
        ]
    }).addTo(map);

    L.control.zoom({
        position: 'topright'
    }).addTo(map);