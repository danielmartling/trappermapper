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
    trapper: new L.LayerGroup(),
};

var campfireData;
fetchCampfireSites().then(data => {
    campfireData = data;
    }
);

// Placerar 'campfiresites' på kartan.
async function fetchCampfireSites() {
    try {
        const response = await fetch("data/campfiresites.json");
        const data = await response.json();

        data.forEach(place => {
            var marker = L.marker([place.lat, place.lng], {
                title: place.name,
                icon: eval("icons." + place.type + "Icon"),
            }).addTo(eval("groups." + place.type));
            marker.bindPopup("<b>" + place.name + "</b><br>" + place.description);
        });
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
    };
};

var activityData;
fetchActivitySites().then(data => {
    activityData = data;
    }
);

async function fetchActivitySites() {
    try {
        const response = await fetch("data/activitySites.json");
        const data = await response.json();

        

        data.forEach(place => {
            var grouplabel = "groups." + place.activityGroup;

            if (place.pathStart) {
                var pathStartMarker = L.marker([place.pathStart.lat, place.pathStart.lng], {
                    title: place.activityName,
                    icon: icons.startIcon
                }).addTo(eval(grouplabel));
                pathStartMarker.bindPopup("<b>" + place.activityName + "</b><br>" + place.pathStart.pathStartDescription);
            }

            if (place.pathEnd) {
                var pathEndMarker = L.marker([place.pathEnd.lat, place.pathEnd.lng], {
                    title: place.activityName,
                    icon: icons.activityIcon
                }).addTo(eval(grouplabel));
                pathEndMarker.bindPopup("<b>" + place.activityName + "</b><br>" + place.pathEnd.pathEndDescription);    
            }

            if (place.paths) {
                var path = L.polyline.antPath(place.paths.path, {
                    color: 'yellow',
                    "delay": 400,
                    "dashArray": [
                        100,
                        100
                    ],
                    "weight": 5,
                    "pulseColor": "#FFFFFF",
                    "paused": false,
                    "reverse": false,
                    "hardwareAccelerated": true
                }).addTo(eval(grouplabel));
            }
            
            if (place.activityMarker.circleRadius) {
                var circle = L.circle([place.activityMarker.lat, place.activityMarker.lng], {
                    radius: place.activityMarker.circleRadius
                }).addTo(eval(grouplabel));
            }
        });
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
    };
};

fetch("data/trapper.geojson")
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.title) {
                    layer.bindPopup("<b>" + feature.properties.title + "</b>");
                }
            },
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: eval("icons." + feature.properties.icon),
                });
            },
            style: function (feature) {
                return {
                    color: feature.properties.color || "blue",
                    weight: 7,
                    opacity: 1,
                };
            }
        }).addTo(groups.trapper);
    })
    .catch(error => {
        console.error('Error loading GeoJSON:', error);
    });

    fetch("data/vassarorunt.geojson")
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<b>Vässarö runt</b><br>Vandringsspår runt hela ön. Cirka 7.5km långt. Stigen är markerad med orangea markörer och pilar.");
            },
            style: function (feature) {
                return {
                    color: "orange",
                    weight: 7,
                    opacity: 1,
                };
            }
        }).addTo(groups.vassarorunt);
    })
    .catch(error => {
        console.error('Error loading GeoJSON:', error);
    });


window.MapLayers = {
    LayerGroups: groups,
    Basemaps: basemaps,
}