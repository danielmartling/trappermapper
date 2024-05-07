// icons.js
var icons = {
    fireHouseIcon: new L.Icon({
        iconUrl: 'icons/firehouse.png',
        iconSize:     [40,40],
        iconAnchor:   [20, 40], 
        popupAnchor:  [0,-20]
    }),
    windshelterIcon: new L.Icon({
        iconUrl: 'icons/windshelter.png',
        iconSize:     [40,40],
        iconAnchor:   [20, 20], 
        popupAnchor:  [0,-20]
    }),
    campfireRingIcon: new L.Icon({
        iconUrl: 'icons/firering.png',
        iconSize:     [40,40],
        iconAnchor:   [20, 20], 
        popupAnchor:  [0,-20]
    }),
    windshelterFireIcon: new L.Icon({
        iconUrl: 'icons/firewindshelter.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    }),
    defaultFireIcon: new L.Icon({
        iconUrl: 'icons/fire1.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    }),
    campfireRockIcon: new L.Icon({
        iconUrl: 'icons/fire1.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    }),
    otherIcon: new L.Icon({
        iconUrl: 'icons/other.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    }),
    startIcon: new L.Icon({
        iconUrl: 'icons/start.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    }),
    finishIcon: new L.Icon({
        iconUrl: 'icons/finish.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    }),
};
function getIcon(type) {
    if (type === "campfirering") {
        return icons.campfireRingIcon;
    } else if (type === "windshelterfire") {
        return icons.windshelterFireIcon;
    } else if (type === "campfirerock") {
        return icons.campfireRockIcon;
    } else if (type === "firehouse") {
        return icons.fireHouseIcon;
    } else if (type === "windshelter") {
        return icons.windshelterIcon;
    } else {
        return icons.otherIcon;
    }  
}