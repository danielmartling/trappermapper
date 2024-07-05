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
};

function getGroup(type) {
    if (type === "campfirering") {
        return groups.campfirering;
    } else if (type === "windshelterfire") {
        return groups.windshelterfire;
    } else if (type === "campfirerock") {
        return groups.campfirerock;
    } else if (type === "firehouse") { 
        return groups.firehouse;
    } else if (type === "windshelter") {
        return groups.windshelter;
    } else {
        return groups.campfireother;
    }  
};

var scoutData;
            fetchData().then(data => {
                scoutData = data;
            });

// Placerar 'campfiresites' på kartan.
async function fetchData() {
    try {
        const response = await fetch("data/campfiresites.json");
        const data = await response.json();

        data.forEach(place => {
            var marker = L.marker([place.lat, place.lng], {
                title: place.name,
                icon: getIcon(place.type)
            }).addTo(getGroup(place.type));
            marker.bindPopup("<b>" + place.name + "</b><br>" + place.description);
        });
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
    };
};

  window.MapLayers = {
    LayerGroups: groups,
    Basemaps: basemaps,
}