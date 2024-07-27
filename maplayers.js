var basemaps = {
    OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.</a>.'
    }),
    Satellit: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })
};

var groups = {
    campfirering: new L.LayerGroup(),
    campfirerock: new L.LayerGroup(),
    firehouse: new L.LayerGroup(),
    campfireother: new L.LayerGroup(),
    windshelterfire: new L.LayerGroup(),
    windshelter: new L.LayerGroup(),
    coopsite: new L.LayerGroup(),
    obstaclecourse: new L.LayerGroup(),
    bstt: new L.LayerGroup(),
    vassarorunt: new L.LayerGroup(),
    naturetrail: new L.LayerGroup(),
    trapper: new L.LayerGroup(),
    yellowtrail: new L.LayerGroup(),
    pinktrail: new L.LayerGroup(),
    bunkertrail: new L.LayerGroup(),
    moorings: new L.LayerGroup(),
    wildernesstrail: new L.LayerGroup(),
};

var sources = [
    "data/trapper.geojson",
    "data/trails.geojson",
    "data/activitySites.geojson",
    "data/moorings.geojson",
    "data/campfireSites.geojson"
];

sources.forEach(source => {
    fetch(source)
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                if (feature.geometry.type !== "Polygon") {
                    layer.bindPopup("<b>" + feature.properties.title + "</b><br>" + feature.properties.desc);
                }
                if (feature.properties.skip !== true) { // || true) { // för att visa andra stigar
                    eval("groups." + feature.properties.group).addLayer(layer);
                }
            },
            pointToLayer: function (feature, latlng) {
                if (feature.properties.icon) {
                    thisMarker = L.marker(latlng, {
                        icon: eval("icons." + feature.properties.icon),
                    });
                } else {
                    thisMarker = L.marker(latlng, {
                    });
                }
                return thisMarker;
            },
            style: function (feature) {
                return {
                    color: feature.properties.color,
                    weight: 7,
                    opacity: 1,
                };
            }
        });
    })
    .catch(error => {
        console.error('Error loading GeoJSON:', error);
    });
})

window.MapLayers = {
    LayerGroups: groups,
    Basemaps: basemaps,
}