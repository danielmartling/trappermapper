//Definera länkar till basemaps (grundkartor) OpenStreetMap & satellit
var basemaps = {
    OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.</a>.'
    }),
    Satellit: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">Esri, Maxar, Earthstar Geographics, and the GIS User Community</a>.'
    })
};

//Definerar grupper
var groups = {
    
};

//Grupperar kartlager
var overlaysTree = {
    label: "Visa / dölj alla",
    selectAllCheckbox: 'Visa/dölj alla',
    children: [
    ]
}

//Skapa en lista med källor för geojson-data
var sources = [
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
                    if (!feature.properties.skip) { // för att dölja vissa stigar
                        if (typeof (feature.properties.group) === 'string') {
                            eval("groups." + feature.properties.group).addLayer(layer);
                        } else {
                            feature.properties.group.forEach(element => {
                                eval("groups." + element).addLayer(layer);
                            })
                        }
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
});

// Inställningar till lagerkontrollen
var options = {
    closedSymbol: '<i class="fa fa-solid fa-chevron-right"></i>',
    openedSymbol: '<i class="fa fa-solid fa-chevron-down"></i>',
    selectorBack: false,
    namedToggle: false,
    // collapseAll: "Kollapsa alla",
    // expandAll: "Expandera alla",
    labelIsSelector: "both",
    collapsed: false,
};

// Fönster ut ur filen
window.MapLayers = {
    OverlaysTree: overlaysTree,
    Basemaps: basemaps,
    Options: options
}
