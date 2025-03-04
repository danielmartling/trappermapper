// Skapar kartan med restriktioner på zoom -->
var lfmap = L.map('map', {
    center: [60.25542, 18.69360],
    zoom: 14,
    minZoom: 12,
    zoomControl: false,
    layers: [MapLayers.Basemaps.OpenStreetMap],
});

// Definera kartans gränser (en bit utanför VÖ, Garpen, Bodskären)-->
var southWest = L.latLng(60.0, 18.0);
var northEast = L.latLng(60.4, 19.0);
var bounds = L.latLngBounds(southWest, northEast);
lfmap.setMaxBounds(bounds);
lfmap.on('drag', function () {
    lfmap.panInsideBounds(bounds, { animate: lfmap.clearLayers() });
});

// Lägg till lager och kontroller till kartan.
var layerControl = L.control.layers.tree(null, MapLayers.OverlaysTree, MapLayers.Options).addTo(lfmap);

// Lägg till sidomeny till kartan.
var sidebar = L.control.sidebar('sidebar').addTo(lfmap);

// Inställningar och aktivering av lokaliseringsfunktion - https://github.com/domoritz/leaflet-locatecontrol - För inställningar och instruktioner för locate.
var lc = L.control
    .locate({
        strings: {
            title: "Visar din nuvarande position!"
        }
    }).addTo(lfmap);

// Lägg till zoom-kontroll
var zoom = L.control.zoom().addTo(lfmap)

var scale = L.control.scale({
    position: "bottomright",
    metric: true,
}).addTo(lfmap)

// Flytta knappar till sidomenyn eller filtermenyn.
var objects = [lc, zoom]
var buttonbox = document.getElementById('button-box')
var filterbox = document.getElementById('filter-box')
function setParent(child, newParent) {
    newParent.appendChild(child.getContainer());
};
objects.forEach(element => {
    setParent(element, buttonbox);
});
setParent(layerControl, filterbox)

// Switch lägerskole view
document.getElementById("lagerskola").addEventListener('click', e => {
    if (lfmap.hasLayer(groups.ls)) {
        lfmap.removeLayer(groups.ls)
    } else { // Remove every layer and add lägerskole layer
        lfmap.eachLayer(function (layer) {
            if (!!layer.toGeoJSON) {
                lfmap.removeLayer(layer);
            }
        });
        lfmap.addLayer(groups.ls);
    }
});

// Switch basemap
if (document.querySelector('input[name="selectBackground"]')) {
    document.querySelectorAll('input[name="selectBackground"]').forEach((elem) => {
        elem.addEventListener("change", function (event) {
            var item = event.target.value;
            for (let key in MapLayers.Basemaps) {
                eval("MapLayers.Basemaps." + key).remove();
            };
            eval("MapLayers.Basemaps." + item).addTo(lfmap);
        });
    });
}