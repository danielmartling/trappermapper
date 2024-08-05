//Definera länkar till basemaps (grundkartor) OpenStreetMap & satellit
var basemaps = {
    OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.</a>.'
    }),
    Satellit: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })
};

//Definerar grupper
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
    treetrail: new L.LayerGroup(),
    pooptrail: new L.LayerGroup(),
    knottrail: new L.LayerGroup(),
    startrail: new L.LayerGroup(),
    woodcrafttrail: new L.LayerGroup(),
    naturegame: new L.LayerGroup(),
    chargebox: new L.LayerGroup(),
    // bookablerooms: new L.LayerGroup(),
    beachtrail: new L.LayerGroup(),
    // areas: new L.LayerGroup(),
};

//Grupperar och kategoriserar Overlays
var groupedOverlays = {
    "Lägerbålsplatser": {
        "Stockringar": groups.campfirering,
        "Klipphällar": groups.campfirerock,
        "Eldstad med tak": groups.firehouse,
        "Andra": groups.campfireother,
    },
    "Vindskydd": {
        "Med eldstad": groups.windshelterfire,
        "Utan eldstad": groups.windshelter,
    },
    "Programaktiviteter": {
        "Trapperspåret": groups.trapper,
        "Vildmarksspåret": groups.wildernesstrail,
        "Samarbetsgläntan": groups.coopsite,
        "Hinderbanan": groups.obstaclecourse,
        "Blood, sweat, tears and teamwork": groups.bstt,
        "Naturleken": groups.naturegame,
        "Trädtränan": groups.treetrail,
        "Ovan molnen": groups.startrail,
        "Knopspåret": groups.knottrail,
        "Träck track": groups.pooptrail,
        "Woodcraftspåret": groups.woodcrafttrail,
    },
    "Vandringsstigar": {
        "Vässarö runt": groups.vassarorunt,
        "Naturnäran": groups.naturetrail,
        "Berättelsen": groups.beachtrail,
        "Bunkerspåret": groups.bunkertrail,
        "Rosa spåret": groups.pinktrail,
        "Gula spåret": groups.yellowtrail,
    },
    "Fladan": {
        "Naturhamnar": groups.moorings,
    },
    "Annat": {
        "Laddlådor": groups.chargebox,
        // "Lokaler": groups.bookablerooms,
        // "Områden": groups.areas,
    }
};

//Skapa en lista med källor för geojson-data
var sources = [
    "data/trapper.geojson",
    "data/trails.geojson",
    "data/activitySites.geojson",
    "data/moorings.geojson",
    "data/campfireSites.geojson",
    "data/chargeboxes.geojson",
    // "data/areas.geojson"
];

// Hämta geoJSON-objekt från varje fil
sources.forEach(source => {
    fetch(source)
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                if (feature.properties.title) {
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

// groupCheckboxes = Man kan markera alla objekt i samma grupp
var options = {
    groupCheckboxes: true
};

//Definera olika lager i applikationen
window.MapLayers = {
    LayerGroups: groups,
    Basemaps: basemaps,
    Overlays: groupedOverlays,
    Options: options,
}