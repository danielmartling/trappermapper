// icons.js
var icons = {
    firehouseIcon: new L.Icon({
        iconUrl: 'mapIcons/firehouse.svg',
        iconSize:     [24, 24],
        iconAnchor:   [12, 60], 
        popupAnchor:  [0,-20],
        shadowUrl: 'mapIcons/pinWhite.png',
        shadowSize:   [80, 80],
        shadowAnchor: [40,75]
    }),
    windshelterIcon: new L.Icon({
        iconUrl: 'mapIcons/windshelter.svg',
        iconSize:     [30,30],
        iconAnchor:   [15,55], 
        popupAnchor:  [0,-15],
        shadowUrl: 'mapIcons/pinWhite.png',
        shadowSize:   [80, 80],
        shadowAnchor: [40,70]
    }),
    campfireringIcon: new L.Icon({
        iconUrl: 'mapIcons/campfirering.svg',
        iconSize:     [40,40],
        iconAnchor:   [20, 60], 
        popupAnchor:  [0,-20],
        shadowUrl: 'mapIcons/pinWhite.png',
        shadowSize:   [80, 80],
        shadowAnchor: [40, 70]
    }),
    windshelterfireIcon: new L.Icon({
        iconUrl: 'mapIcons/windshelterfire.svg',
        iconSize:     [30,30],
        iconAnchor:   [15,55], 
        popupAnchor:  [0,-15],
        shadowUrl: 'mapIcons/pinWhite.png',
        shadowSize:   [80, 80],
        shadowAnchor: [40,70]
    }),
    campfirerockIcon: new L.Icon({
        iconUrl: 'mapIcons/newcampfire.png',
        iconSize: [60,60],
        iconAnchor: [30,60],
        popupAnchor: [0,-60]
    }),
    campfireotherIcon: new L.Icon({
        iconUrl: 'mapIcons/otherPin.svg',
        iconSize: [80, 80],
        iconAnchor: [40, 80],
        popupAnchor: [0, -40]
    }),
    startIcon: new L.Icon({
        iconUrl: 'mapIcons/flagStart.svg',
        iconSize: [60, 60],
        iconAnchor: [15, 50],
        popupAnchor: [-30, -30]
    }),
    finishIcon: new L.Icon({
        iconUrl: 'mapIcons/flagFinish.svg',
        iconSize: [60, 60],
        iconAnchor: [15, 50],
        popupAnchor: [0, -30]
    }),
    activityIcon: new L.Icon({
        iconUrl: 'mapIcons/flagHollyrosa.svg',
        iconSize: [60, 60],
        iconAnchor: [15, 50],
        popupAnchor: [0, -30]
    }),
    tempIcon: new L.icon({
        iconUrl: 'mapIcons/flagTemp.svg',
        iconSize: [60, 60],
        iconAnchor: [0, 30],
        popupAnchor: [0, -30]
    })
};